using API.DTOs;
using API.Entity;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class AdminRespository : IAdminRespository
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public AdminRespository(UserManager<AppUser> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
        }

        public async Task<PagedList<MemberDto>> GetUsers([FromQuery] MemberParams memberParams)
        {
            var query = userManager.Users.AsQueryable();

            query = query.Where(u => u.UserName != "admin");

            if (memberParams.userName != null)
            {
                query = query.Where(u => u.UserName.Contains(memberParams.userName));
            }

            if (memberParams.firstName != null)
            {
                query = query.Where(u => u.FirstName.Contains(memberParams.firstName));
            }

            if (memberParams.lastName != null)
            {
                query = query.Where(u => u.LastName.Contains(memberParams.lastName));
            }

            if (memberParams.gender != null)
            {
                query = query.Where(u => u.Gender.Contains(memberParams.gender));
            }

            if (memberParams.gender != null)
            {
                query = query.Where(u => u.Gender.Contains(memberParams.gender));
            }

            if (memberParams.Role != null)
            {
                if (memberParams.Role.Equals("Member"))
                    query = query.Where(u => u.UserRoles.Any(r => r.Role.Name != "Moderator"));

                if (memberParams.Role.Equals("Moderator"))
                    query = query.Where(u => u.UserRoles.Any(r => r.Role.Name == memberParams.Role));
            }


            // switch wybiera wartość, a jeśli jej nie ma wybiera domyślną _=>
            query = memberParams.OrderBy switch
            {
                "dateCreatedNew" => query.OrderByDescending(u => u.DateCreated),
                "dateLastActive" => query.OrderByDescending(u => u.DateLastActive),
                _ => query.OrderByDescending(u => u.DateCreated)
            };

            query.Select(u => new
            {
                u.Id,
                Username = u.UserName,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Gender = u.Gender,
                DateOfBirth = u.DateOfBirth,
                DateCreated = u.DateCreated,
                DateLastActive = u.DateLastActive,
                Address = u.Address,
                Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
            });


            return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(mapper.ConfigurationProvider).AsNoTracking(),
             memberParams.PageNumber, memberParams.PageSize);
        }
    }
}
