using API.Data;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class CommentRepository : ICommentRepository
    {
        private readonly GarageSaleDbContext context;
        private readonly IMapper mapper;

        public CommentRepository(GarageSaleDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public void AddComment(Comment comment)
        {
            context.Comments.Add(comment);
        }

        public void DeleteComment(Comment comment)
        {
            context.Comments.Remove(comment);
        }

        public async Task<Comment> GetComment(long id)
        {
            return await context.Comments
                .Include(u => u.Announcement)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<CommentDto>> GetCommentsForAnnouncement(long AnnouncementId)
        {
            var comments = await context.Comments
                .Where(c => c.AnnouncementId == AnnouncementId && c.IsDeleted == false)
                .OrderBy(c => c.DateSend)
                .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return comments;
        }
    }
}
