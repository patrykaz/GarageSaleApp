using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    [Table("Photos")]
    public class Photo
    {
        public long Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public long AnnouncementId { get; set; }
        public Announcement Announcement { get; set; }
    }
}
