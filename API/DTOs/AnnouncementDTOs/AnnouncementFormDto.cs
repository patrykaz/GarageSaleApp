using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AnnouncementFormDto
    {
        [Required]
        [MinLength(6)]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MinLength(10)]
        [MaxLength(1000)]
        public string Description { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public float Duration { get; set; }
        [Required]
        public AddressDto Address { get; set; }
    }
}
