﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AnnouncementDetailsDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public float Duration { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime? DateCreated { get; set; }
        public bool isAccepted { get; set; }
        public bool isActive { get; set; }
        public AnnouncementCreatorDto User { get; set; }
        public AddressDto Address { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}
