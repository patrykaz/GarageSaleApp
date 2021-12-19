using API.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CommentDto
    {
        public long Id { get; set; }
        public long SenderId { get; set; }
        public string SenderUsername { get; set; }
        public long AnnouncementId { get; set; }
        public string Content { get; set; }
        public DateTime DateSend { get; set; }
        [JsonIgnore]
        public bool IsDeleted { get; set; }
    }
}
