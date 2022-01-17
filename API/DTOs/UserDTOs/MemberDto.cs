using API.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberDto
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateLastActive { get; set; }
        public AddressDto Address { get; set; }
        public List<string> Roles { get; set; }
        public bool LockoutEnabled { get; set; }
    }
}
