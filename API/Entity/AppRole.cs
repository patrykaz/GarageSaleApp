using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class AppRole : IdentityRole<long> // it class belongs to AspNetCore
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
