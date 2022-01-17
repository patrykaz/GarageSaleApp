using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class Comment
    {
        public long Id { get; set; }
        public long SenderId { get; set; }
        public AppUser Sender { get; set; }
        public long AnnouncementId { get; set; }
        public Announcement Announcement { get; set; }
        public string Content { get; set; }
        public DateTime DateSend{ get; set; } = DateTime.Now;
    }
}
