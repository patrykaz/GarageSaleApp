using API.DTOs;
using API.Entity;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    [Route("api")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoService photoService;

        public AnnouncementsController(IMapper mapper, IUnitOfWork unitOfWork, IPhotoService photoService)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.photoService = photoService;
        }

        [AllowAnonymous]
        [HttpGet("announcements/{id}", Name = "Fetch")]
        public async Task<ActionResult<AnnouncementDetailsDto>> Fetch(long id)
        {
            var entity = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);

            if (entity == null)
                return NotFound();

            if (!entity.IsAccepted)
            {
                var userId = User.GetUserId();
                if (!(User.IsInRole("Moderator") || User.IsInRole("Admin") || userId == entity.AppUserId ))
                    return NotFound();
            }

            return mapper.Map<AnnouncementDetailsDto>(entity);
        }

    
        [HttpGet("announcements")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AnnouncementCardDto>>> GetAnnouncements([FromQuery] AnnouncementParams announcementParams) // FromQuery jest potrzebne ponieważ musimy wskazać, skąd ma pobrać nasze parametry, czyli z ciagu zapytania
        {
            var announcements = await unitOfWork.AnnouncementRepository.GetAnnouncementsAsync(announcementParams);
            // dodajemy do odpowiedzi paginacje uzytkownika, którą wysłał z rządaniem get
            Response.AddPaginationHeader(announcements.CurrentPage, announcements.PagesSize, announcements.TotalCount, announcements.TotalPages);
            return Ok(announcements);
        }


        [HttpGet("user-announcements")]
        public async Task<ActionResult<IEnumerable<AnnouncementEditCardDto>>> GetUserAnnouncements([FromQuery] UserAnnouncementParams userAnnouncementParams)
        {
            var userId = User.GetUserId();
            var announcements = await unitOfWork.AnnouncementRepository.GetUserAnnouncementsAsync(userAnnouncementParams, userId);
            Response.AddPaginationHeader(announcements.CurrentPage, announcements.PagesSize, announcements.TotalCount, announcements.TotalPages);
            return Ok(announcements);
        }


        [HttpPost("announcements")]
        public async Task<ActionResult<AnnouncementDetailsDto>> CreateAnnouncement([FromBody] AnnouncementFormDto createAnnouncementDto)
        {
            var announcementCreater = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            Announcement newAnnouncement = new();

            var addressExist = unitOfWork.AddressRepository.FindAddresByProperties(createAnnouncementDto.Address.Street, createAnnouncementDto.Address.City, createAnnouncementDto.Address.Province);
            if (addressExist is null)
            {
                mapper.Map(createAnnouncementDto, newAnnouncement);
            }
            else
            {
                createAnnouncementDto.Address = null;
                mapper.Map(createAnnouncementDto, newAnnouncement);
                newAnnouncement.Address = addressExist;
            }

            newAnnouncement.AppUser = announcementCreater;
        
            unitOfWork.AnnouncementRepository.AddAnnouncement(newAnnouncement);
            if (await unitOfWork.Complete())
            {
                var entity = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(newAnnouncement.Id);
                if (entity == null)
                    return NotFound();

                return Ok(mapper.Map<AnnouncementDetailsDto>(entity));
            }

            return BadRequest("Błąd w dodawaniu nowego ogłoszenia");
        }

        [HttpPut("announcements/{id}")]
        public async Task<ActionResult<AnnouncementDetailsDto>> UpdateAnnouncement(AnnouncementFormDto announcementFormDto, long id)
        {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (announcement.AppUserId != user.Id)
                return Unauthorized();

            var addressExist = unitOfWork.AddressRepository.FindAddresByProperties(announcementFormDto.Address.Street, announcementFormDto.Address.City, announcementFormDto.Address.Province);
            
            if (addressExist is null)
            {
                announcement.Address = null;
                mapper.Map(announcementFormDto, announcement);
            }
            else
            {
                if(announcement.AddressId != addressExist.Id)
                {
                    announcementFormDto.Address = null;
                    mapper.Map(announcementFormDto, announcement);
                    announcement.Address = addressExist;
                }
                else
                {
                    mapper.Map(announcementFormDto, announcement);
                }
            }

            unitOfWork.AnnouncementRepository.Update(announcement);

            if (await unitOfWork.Complete())
            {
                var entity = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(announcement.Id);
                if (entity == null)
                    return NotFound();

                return Ok(mapper.Map<AnnouncementDetailsDto>(entity));
            }

            return BadRequest("Błąd w aktualizacji ogłoszenia");
        }

        [HttpDelete("announcements/{id}")]
        public async Task<ActionResult> DeleteAnnouncement(long id)
        {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (!User.IsInRole("Admin"))
                if (announcement.AppUserId != user.Id)
                    return Unauthorized();

            var photos = announcement.Photos;
            if (photos != null)
            {
                foreach(var photo in photos)
                {
                    var result = await photoService.DeletePhotoAsync(photo.PublicId);
                    if (result.Error != null) return BadRequest(result.Error.Message);
                    announcement.Photos.Remove(photo);
                }
            }

            unitOfWork.AnnouncementRepository.DeleteAnnouncement(announcement);

            if (await unitOfWork.Complete()) return Ok();

            return BadRequest("Wystąpił problem z usunięciem ogłoszenia");
        }

        [HttpPut("announcements/{id}/change-status-active")]
        public async Task<ActionResult> ChangeStatusActiveOfAnnouncement(long id)
        {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (!(User.IsInRole("Moderator") || User.IsInRole("Admin")))
                if (announcement.AppUserId != user.Id)
                    return Unauthorized();


            announcement.IsActive = !announcement.IsActive;
            announcement.IsAccepted = false;


            if (await unitOfWork.Complete()) return Ok();

            return BadRequest("Wystąpił problem z zmianą statusu ogłoszenia");
        }

    }
}
