using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class AppUser : IdentityUser<long> // it is for Authorization from AspNetCore
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime DateLastActive { get; set; } = DateTime.Now;
        public long? AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Announcement> Announcements { get; set; }
        public ICollection<Comment> Comments { get; set; }

    }
}
