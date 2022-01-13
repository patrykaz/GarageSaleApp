using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AnnouncementCardDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public float Duration { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime? DateCreated { get; set; }
        public AnnouncementCreatorDto User { get; set; }
        public AddressDto Address { get; set; }
    }
}
