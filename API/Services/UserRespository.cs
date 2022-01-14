using API.Data;
using API.DTOs;
using API.Entity;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly GarageSaleDbContext context;
        private readonly IMapper mapper;

        public UserRepository(GarageSaleDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await context.Users
                   .Where(x => x.UserName == username)
                   .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                   .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = context.Users.AsQueryable();

            query = query.Where(u => u.UserName != "Admin");

            if (userParams.userName != null)
            {
                query = query.Where(u => u.UserName.Contains(userParams.userName));
            }

            if (userParams.firstName != null)
            {
                query = query.Where(u => u.FirstName.Contains(userParams.firstName));
            }

            if (userParams.gender != null)
            {
                query = query.Where(u => u.Gender == userParams.gender);
            }

            if (userParams.Role != null)
            {
                if (userParams.Role.Equals("Member"))
                    query = query.Where(u => u.UserRoles!.Any(r => r.Role!.Equals("Moderator")));

                if (userParams.Role.Equals("Moderator"))
                    query = query.Where(u => u.UserRoles.Any(r => r.Role.Equals(userParams.Role)));
            }

            // switch wybiera wartość, a jeśli jej nie ma wybiera domyślną _=>
            query = userParams.OrderBy switch
            {
                "dateCreatedOld" => query.OrderBy(u => u.DateCreated),
                "dateCreatedNew" => query.OrderByDescending(u => u.DateCreated),
                "dateLastActive" => query.OrderByDescending(u => u.DateLastActive),
                _ => query.OrderByDescending(u => u.DateCreated)
            };

            // AsNotTracking nie wysyła zapytania do serwera
            return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(mapper.ConfigurationProvider).AsNoTracking(),
                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await context.Users
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public void Update(AppUser user)
        {
            context.Entry(user).State = EntityState.Modified;
        }
    }
}
