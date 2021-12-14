using API.Entity;
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
        Task<Announcement> GetAnnouncementByIdAsync(int id);
    }
}
