﻿using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)  // UserManager is used for menagement users
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Moderator"},
                new AppRole{Name = "Admin"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Haslo123@");
                await userManager.AddToRoleAsync(user, "Member");
                await userManager.SetLockoutEnabledAsync(user, false);
            }

            var admin = new AppUser
            {
                UserName = "admin",
                FirstName = "Admin", 
                LastName = "Admin",
                Gender = "male"
            };

            await userManager.CreateAsync(admin, "Admin123@");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
            await userManager.SetLockoutEnabledAsync(admin, false);

        }
    }
}
