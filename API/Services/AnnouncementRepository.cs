﻿using API.Data;
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
            context.Entry(announcement).State = EntityState.Modified;
        }

        public void AddAnnouncement(Announcement announcement)
        {
            context.Announcements.Add(announcement);
        }


        public async Task<Announcement> GetAnnouncementByIdAsync(long id)
        {
            return await context.Announcements
                .Include(p => p.Photos)
                .Include(x => x.Address)
                .Include(z => z.AppUser)
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<PagedList<AnnouncementDto>> GetAnnouncementsAsync(AnnouncementParams announcementParams)
        {
            var query = context.Announcements.AsQueryable();

            query = query.Where(u => u.IsDeleted == false);

            if (announcementParams.Name != null)
            {
                query = query.Where(u => u.Name.Contains(announcementParams.Name));
            }

            if (announcementParams.Description != null)
            {
                query = query.Where(u => u.Description.Contains(announcementParams.Description));
            }

            if (announcementParams.City != null)
            {
                query = query.Where(u => u.Address.City.Contains(announcementParams.City));
            }

            if (announcementParams.Province != null)
            {
                query = query.Where(u => u.Address.Province.Contains(announcementParams.Province));
            }

            // switch wybiera wartość, a jeśli jej nie ma wybiera domyślną _=>
            query = announcementParams.OrderBy switch
            {
                "dateCreatedOld" => query.OrderBy(u => u.DateCreated),
                "dateCreatedNew" => query.OrderByDescending(u => u.DateCreated),
                "startDate" => query.OrderByDescending(u => u.StartDate),
                _ => query.OrderBy(u => u.DateCreated)
            };

            // AsNotTracking nie wysyła zapytania do serwera
            return await PagedList<AnnouncementDto>.CreateAsync(query.ProjectTo<AnnouncementDto>(mapper.ConfigurationProvider).AsNoTracking(),
                announcementParams.PageNumber, announcementParams.PageSize);
        }

        public async Task<IEnumerable<AnnouncementDto>> GetUserAnnouncementsAsync(long userId)
        {
            var userAnnouncements = await context.Announcements
                .Where(u => u.AppUserId == userId && u.IsDeleted == false)
                .OrderBy(u => u.DateCreated)
                .ProjectTo<AnnouncementDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return userAnnouncements;
        }
    }
}
