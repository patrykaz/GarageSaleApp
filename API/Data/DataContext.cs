using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class GarageSaleDbContext : IdentityDbContext
    {
        public GarageSaleDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
