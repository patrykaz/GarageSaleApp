using API.DTOs;
using API.Entity;
using API.Extensions;
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

        [HttpPost]
        public async Task<ActionResult<AnnouncementDto>> CreateAnnouncement(CreateAnnouncementDto createAnnouncementDto)
        {
            var username = User.GetUsername();
            var AnnouncementCreater = await unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var announcement = new Announcement
            {
                AppUser = AnnouncementCreater,
                Name = createAnnouncementDto.Name,
                Description = createAnnouncementDto.Description,
                StartDate = createAnnouncementDto.StartDate,
                Duration = createAnnouncementDto.Duration
            };

            unitOfWork.AnnouncementRepository.AddAnnouncement(announcement);
            if (await unitOfWork.Complete()) return Ok(mapper.Map<AnnouncementDto>(announcement));

            return BadRequest("Błąd w dodawaniu nowego ogłoszenia");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAnnouncement(UpdateAnnouncementByUserDto updateAnnouncementByUserDto, int id)
        {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (announcement.AppUserId != user.Id)
                return Unauthorized();

            // mapuje automatycznie dane które wróciły od klienta z updateAnnouncementByUserDto do announcement
            mapper.Map(updateAnnouncementByUserDto, announcement);

            unitOfWork.AnnouncementRepository.Update(announcement);

            AnnouncementDto announcementDto = new AnnouncementDto();

            mapper.Map(announcement, announcementDto);

            if (await unitOfWork.Complete()) return Ok(announcementDto);

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
