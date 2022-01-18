using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AnnouncementEditCardDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public float Duration { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime? DateCreated { get; set; }
        public bool IsActive { get; set; }
        public bool IsAccepted { get; set; }
        public AddressDto Address { get; set; }
    }
}
