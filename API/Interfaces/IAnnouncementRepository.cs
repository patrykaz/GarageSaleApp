using API.DTOs;
using API.Entity;
using API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IAnnouncementRepository
    {
        void Update(Announcement announcement);
        void AddAnnouncement(Announcement announcement);
        Task<Announcement> GetAnnouncementByIdAsync(long id);
        Task<PagedList<AnnouncementCardDto>> GetAnnouncementsAsync(AnnouncementParams announcementParams);
        Task<PagedList<AnnouncementEditCardDto>> GetUserAnnouncementsAsync(UserAnnouncementParams userAnnouncementParams, long userId);
    }
}
