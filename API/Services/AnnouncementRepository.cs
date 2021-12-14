using API.Data;
using API.Entity;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly GarageSaleDbContext context;
        private readonly IMapper mapper;

        public AnnouncementRepository(GarageSaleDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public void Update(Announcement announcement)
        {
            context.Entry(announcement).State = EntityState.Modified;
        }

        public void AddAnnouncement(Announcement announcement)
        {
            context.Announcements.Add(announcement);
        }


        public async Task<Announcement> GetAnnouncementByIdAsync(int id)
        {
            return await context.Announcements.FindAsync(id);
        }
    }
}
