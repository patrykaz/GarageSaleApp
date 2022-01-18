using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class Announcement
    {
        public long Id { get; set; }
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
        public bool IsActive { get; set; } = true;
        [Required]
        public bool IsAccepted { get; set; } = false;
        [Required]
        public DateTime DateCreated { get; set; } = DateTime.Now;
        [Required]
        public long AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        [Required]
        public long AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Comment> Comments { get; set; }

    }
}
