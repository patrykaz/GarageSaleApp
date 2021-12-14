using API.DTOs;
using API.Entity;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //User
            CreateMap<RegisterDto, AppUser>();

            CreateMap<AppUser, MemberDto>();

            // Announcement
            CreateMap<CreateAnnouncementDto, Announcement>();

            CreateMap<UpdateAnnouncementByUserDto, Announcement>();

            CreateMap<Announcement, AnnouncementDto>();
            
        }
    }
}
