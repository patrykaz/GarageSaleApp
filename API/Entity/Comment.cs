using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class Comment
    {
        public long Id { get; set; }
        [Required]
        public long SenderId { get; set; }
        public AppUser Sender { get; set; }
        [Required]
        public long AnnouncementId { get; set; }
        public Announcement Announcement { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(200)]
        public string Content { get; set; }
        [Required]
        public DateTime DateSend{ get; set; } = DateTime.Now;
    }
}
