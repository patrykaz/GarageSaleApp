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
    [Route("api/announcements")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public CommentsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }


        [AllowAnonymous]
        [HttpGet("{id}/get-comments")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetCommentsForAnnouncement(long id)
        {
            var comments = await unitOfWork.CommentRepository.GetCommentsForAnnouncement(id);

            return Ok(comments);
        }

        [HttpPost("{id}/add-comment")]
        public async Task<ActionResult<CommentDto>> CreateComment(long id, [FromBody] CreateCommentDto createCommentDto)
        {
            if (createCommentDto.Content is null)
                return BadRequest("Komentarz nie może być pusty");
            var sender = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var announcement = await unitOfWork.AnnouncementRepository.GetAnnouncementByIdAsync(id);

            if (announcement == null) return NotFound();

            var comment = new Comment
            {
                Sender = sender,
                Announcement = announcement,
                Content = createCommentDto.Content
            };

            unitOfWork.CommentRepository.AddComment(comment);

            // maping Comment on CommentDto
            if (await unitOfWork.Complete()) return Ok(mapper.Map<CommentDto>(comment));

            return BadRequest("Błąd podczas dodawania komentarza");
        }

        [HttpDelete("delete-comment/{id}")]
        public async Task<ActionResult> DeleteComment(long id)
        {
            var userId = User.GetUserId();
            var comment = await unitOfWork.CommentRepository.GetComment(id);

            if (comment.SenderId == userId || comment.Announcement.AppUserId == userId || User.IsInRole("Moderator") || User.IsInRole("Admin"))
            {
                comment.IsDeleted = true;

                if (await unitOfWork.Complete()) return Ok();

                return BadRequest("Problem z usunięciem komentarza");
            }
             
            return Unauthorized("Nie możesz usunąć tego komentarza");
        }
    }
}
