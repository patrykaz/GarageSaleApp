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
    [Route("api/[controller]")]
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


        [HttpGet("{id}", Name = "Fetch")]
        public async Task<ActionResult<AnnouncementDto>> Fetch(int id)
        {
            var entity = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);

            if (entity == null)
                return NotFound();

            return mapper.Map<AnnouncementDto>(entity);
        }

    
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AnnouncementDto>>> GetAnnouncements([FromQuery] AnnouncementParams announcementParams) // FromQuery jest potrzebne ponieważ musimy wskazać, skąd ma pobrać nasze parametry, czyli z ciagu zapytania
        {
            var announcements = await unitOfWork.AnnouncementRepository.GetAnnouncementsAsync(announcementParams);
            // dodajemy do odpowiedzi paginacje uzytkownika, którą wysłał z rządaniem get
            Response.AddPaginationHeader(announcements.CurrentPage, announcements.PagesSize, announcements.TotalCount, announcements.TotalPages);
            return Ok(announcements);
        }

        [HttpPost]
        public async Task<ActionResult<AnnouncementDto>> CreateAnnouncement([FromBody] CreateAnnouncementDto createAnnouncementDto)
        {
            var announcementCreater = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            Announcement newAnnouncement = new();

            var addressExist = unitOfWork.AddressRepository.FindAddresByProperties(createAnnouncementDto.Address.Street, createAnnouncementDto.Address.City, createAnnouncementDto.Address.PostalCode);
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

                return Ok(mapper.Map<AnnouncementDto>(entity));
            }

            return BadRequest("Błąd w dodawaniu nowego ogłoszenia");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AnnouncementDto>> UpdateAnnouncement(UpdateAnnouncementByUserDto updateAnnouncementByUserDto, int id)
        {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (announcement.AppUserId != user.Id)
                return Unauthorized();

            var addressExist = unitOfWork.AddressRepository.FindAddresByProperties(updateAnnouncementByUserDto.Address.Street, updateAnnouncementByUserDto.Address.City, updateAnnouncementByUserDto.Address.PostalCode);
            
            if (addressExist is null)
            {
                announcement.Address = null;
                mapper.Map(updateAnnouncementByUserDto, announcement);
            }
            else
            {
                if(announcement.AddressId != addressExist.Id)
                {
                    updateAnnouncementByUserDto.Address = null;
                    mapper.Map(updateAnnouncementByUserDto, announcement);
                    announcement.Address = addressExist;
                }
                else
                {
                    mapper.Map(updateAnnouncementByUserDto, announcement);
                }
            }

            unitOfWork.AnnouncementRepository.Update(announcement);

            if (await unitOfWork.Complete())
            {
                var entity = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(announcement.Id);
                if (entity == null)
                    return NotFound();

                return Ok(mapper.Map<AnnouncementDto>(entity));
            }

            return BadRequest("Błąd w aktualizacji ogłoszenia");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAnnouncement(int id)
        {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (announcement.AppUserId != user.Id)
                return Unauthorized();

            announcement.IsActive = false;
            announcement.IsDeleted = true;

            if (await unitOfWork.Complete()) return Ok();

            return BadRequest("Wystąpił problem z usunięciem ogłoszenia");
        }

        [HttpPost("{id}/add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto([FromForm(Name = "file")] IFormFile file, int id)
         {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (announcement.AppUserId != user.Id)
                return Unauthorized();

            var result = await photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (announcement.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            announcement.Photos.Add(photo);

            if (await unitOfWork.Complete())
            {
                return CreatedAtRoute("Fetch", new { id = announcement.Id }, mapper.Map<AnnouncementDto>(announcement));
            }


            return BadRequest("Problem z dodaniem zdjęcia");
        }

        [HttpDelete("{id}/delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int id, int photoId)
        {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (announcement.AppUserId != user.Id)
                return Unauthorized();

            var photo = announcement.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo == null) return NotFound();
            if (photo.IsMain) return BadRequest("Nie możesz usunąć głównego zdjęcia");
            if (photo.PublicId != null)
            {
                var result = await photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }
            announcement.Photos.Remove(photo);

            if (await unitOfWork.Complete()) return Ok();

            return BadRequest("Błąd podczas usuwania zdjęcia");
        }

        [HttpPut("{id}/set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int id, int photoId)
        {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (announcement.AppUserId != user.Id)
                return Unauthorized();

            var photo = announcement.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("To zdjęcie jest już głównym zdjęciem");

            var currentMain = announcement.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await unitOfWork.Complete()) return NoContent();

            return BadRequest("Błąd w ustawnieniu głównego zdjęcia");
        }

    }
}
