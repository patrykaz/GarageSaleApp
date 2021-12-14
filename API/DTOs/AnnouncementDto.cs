using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AnnouncementDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public float Duration { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsAccepted { get; set; } = false;
        public DateTime? Created { get; set; }
        public int AppUserId { get; set; }
    }
}
