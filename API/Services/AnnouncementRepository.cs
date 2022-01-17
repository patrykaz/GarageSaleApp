using API.Data;
using API.DTOs;
using API.Entity;
using API.Helpers;
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
            announcement.IsAccepted = false;
            context.Entry(announcement).State = EntityState.Modified;
        }

        public void AddAnnouncement(Announcement announcement)
        {
            context.Announcements.Add(announcement);
        }

        public void DeleteAnnouncement(Announcement announcement)
        {
            context.Announcements.Remove(announcement);
        }

        public async Task<Announcement> GetAnnouncementByIdAsync(long id)
        {
            return await context.Announcements
                .Include(p => p.Photos)
                .Include(x => x.Address)
                .Include(z => z.AppUser)
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<PagedList<AnnouncementCardDto>> GetAnnouncementsAsync(AnnouncementParams announcementParams)
        {
            var query = context.Announcements.AsQueryable();

            query = query.Where(u => u.IsAccepted == true);
            query = query.Where(u => u.IsActive == true);


            if (announcementParams.Name != null)
            {
                query = query.Where(u => u.Name.ToLower().Contains(announcementParams.Name.ToLower()));
            }

            if (announcementParams.Description != null)
            {
                query = query.Where(u => u.Description.ToLower().Contains(announcementParams.Description.ToLower()));
            }

            if (announcementParams.City != null)
            {
                query = query.Where(u => u.Address.City.ToLower().Contains(announcementParams.City.ToLower()));
            }

            if (announcementParams.Province != null)
            {
                query = query.Where(u => u.Address.Province.ToLower().Contains(announcementParams.Province.ToLower()));
            }

            // switch wybiera wartość, a jeśli jej nie ma wybiera domyślną _=>
            query = announcementParams.OrderBy switch
            {
                "dateCreatedOld" => query.OrderBy(u => u.DateCreated),
                "dateCreatedNew" => query.OrderByDescending(u => u.DateCreated),
                "startDate" => query.OrderBy(u => u.StartDate),
                _ => query.OrderByDescending(u => u.DateCreated)
            };

            // AsNotTracking nie wysyła zapytania do serwera
            return await PagedList<AnnouncementCardDto>.CreateAsync(query.ProjectTo<AnnouncementCardDto>(mapper.ConfigurationProvider).AsNoTracking(),
                announcementParams.PageNumber, announcementParams.PageSize);
        }

        public async Task<PagedList<AnnouncementEditCardDto>> GetUserAnnouncementsAsync(UserAnnouncementParams userAnnouncementParams, long userId)
        {
            var query = context.Announcements.AsQueryable();

            query = query.Where(u => u.AppUserId == userId);

        
            query = query.Where(u => u.IsActive == (userAnnouncementParams.IsActive));
            query = query.Where(u => u.IsAccepted == (userAnnouncementParams.IsAccepted));
         
            // switch wybiera wartość, a jeśli jej nie ma wybiera domyślną _=>
            query = userAnnouncementParams.OrderBy switch
            {
                _ => query.OrderByDescending(u => u.DateCreated)
            };

            return await PagedList<AnnouncementEditCardDto>.CreateAsync(query.ProjectTo<AnnouncementEditCardDto>(mapper.ConfigurationProvider).AsNoTracking(),
             userAnnouncementParams.PageNumber, userAnnouncementParams.PageSize);
        }

        public async Task<PagedList<AnnouncementEditCardDto>> GetAnnouncementsForApprovalAsync(AdminAnnouncementParams adminAnnouncementParams)
        {
            var query = context.Announcements.AsQueryable();

            query = query.Where(u => u.IsAccepted == false && u.IsActive == true);
                       
            // switch wybiera wartość, a jeśli jej nie ma wybiera domyślną _=>
            query = adminAnnouncementParams.OrderBy switch
            {
                _ => query.OrderBy(u => u.DateCreated)
            };

            return await PagedList<AnnouncementEditCardDto>.CreateAsync(query.ProjectTo<AnnouncementEditCardDto>(mapper.ConfigurationProvider).AsNoTracking(),
             adminAnnouncementParams.PageNumber, adminAnnouncementParams.PageSize);

        }

    }
}
