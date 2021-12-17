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

        public AnnouncementsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }


        [HttpGet("{id}")]
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
            if (createAnnouncementDto.AddressId == 0 && createAnnouncementDto.Address is null)
                return BadRequest("Adres jest wymagany");

            var announcementCreater = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            Announcement announcement = new Announcement();

            if (createAnnouncementDto.AddressId == 0)
            {
                var addressExist = unitOfWork.AddressRepository.FindAddresByProperties(createAnnouncementDto.Address.Street, createAnnouncementDto.Address.City, createAnnouncementDto.Address.PostalCode);
                if (addressExist is null)
                {
                    mapper.Map(createAnnouncementDto, announcement);
                }
                else
                {
                    createAnnouncementDto.AddressId = addressExist.Id;
                    createAnnouncementDto.Address = null;
                    mapper.Map(createAnnouncementDto, announcement);
                }
            }
            else
            {
                var address = unitOfWork.AddressRepository.GetAddressByIdAsync(createAnnouncementDto.AddressId);
                if (address is null)
                    return BadRequest("Podany adres nie istnieje w bazie danych");
                mapper.Map(createAnnouncementDto, announcement);
            }

            announcement.AppUser = announcementCreater;
        
            unitOfWork.AnnouncementRepository.AddAnnouncement(announcement);
            if (await unitOfWork.Complete())
            {
                var entity = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(announcement.Id);
                if (entity == null)
                    return NotFound();

                return Ok(mapper.Map<AnnouncementDto>(entity));
            }

            return BadRequest("Błąd w dodawaniu nowego ogłoszenia");

        }

        private ActionResult<AnnouncementDto> Json(string v)
        {
            throw new NotImplementedException();
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

            if (updateAnnouncementByUserDto.AddressId == 0 && updateAnnouncementByUserDto.Address is null)
                return BadRequest("Adres jest wymagany");


            if (updateAnnouncementByUserDto.AddressId == 0)
            {
                var addressExist = unitOfWork.AddressRepository.FindAddresByProperties(updateAnnouncementByUserDto.Address.Street, updateAnnouncementByUserDto.Address.City, updateAnnouncementByUserDto.Address.PostalCode);
                if (addressExist is null)
                {
                    announcement.AddressId = 0;
                    announcement.Address = null;
                    mapper.Map(updateAnnouncementByUserDto, announcement);
                }
                else
                {
                    updateAnnouncementByUserDto.AddressId = addressExist.Id;
                    mapper.Map(updateAnnouncementByUserDto, announcement);
                }
            }
            else
            {
                var address = unitOfWork.AddressRepository.GetAddressByIdAsync(updateAnnouncementByUserDto.AddressId);
                if (address is null)
                    return BadRequest("Podany adres nie istnieje w bazie danych");
               
                mapper.Map(updateAnnouncementByUserDto, announcement);
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

    }
}
