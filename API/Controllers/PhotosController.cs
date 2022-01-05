using API.DTOs;
using API.Entity;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/announcements")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoService photoService;

        public PhotosController(IMapper mapper, IUnitOfWork unitOfWork, IPhotoService photoService)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.photoService = photoService;
        }

        [HttpPost("{id}/add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto([FromForm(Name = "file")] IFormFile file, long id)
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
        public async Task<ActionResult> DeletePhoto(long id, int photoId)
        {
            var user = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);
            if (announcement == null)
                return NotFound();

            if (announcement.AppUserId != user.Id)
                return Unauthorized();

            var photo = announcement.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain)
            {
                var newMainPhoto = announcement.Photos.FirstOrDefault(x => x.IsMain != true);
                if(newMainPhoto != null)
                {
                    newMainPhoto.IsMain = true;
                }
            }

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
        public async Task<ActionResult> SetMainPhoto(long id, int photoId)
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
