using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class AppUserRole : IdentityUserRole<int> // it class belongs to AspNetCore
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}
