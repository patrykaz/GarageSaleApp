using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entity
{
    public class Address
    {
        public long Id { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Street { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string City { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Province { get; set; }
        public virtual ICollection<Announcement> Announcement { get; set; }
        public virtual ICollection<AppUser> AppUser { get; set; }
    }
}