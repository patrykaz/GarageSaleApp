using API.DTOs;
using API.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);
        void DeleteComment(Comment comment);
        Task<Comment> GetComment(long id);
        Task<IEnumerable<CommentDto>> GetCommentsForAnnouncement(long id);
    }
}
