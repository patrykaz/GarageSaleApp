using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class AppUser : IdentityUser<long> // it is for Authorization from AspNetCore
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public DateTime DateCreated { get; set; } = DateTime.Now;
        [Required]
        public DateTime DateLastActive { get; set; } = DateTime.Now;
        public long? AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Announcement> Announcements { get; set; }
        public ICollection<Comment> Comments { get; set; }

    }
}
