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
            // User
            CreateMap<RegisterDto, AppUser>();

            CreateMap<AppUser, MemberDto>()
                .ForMember(a => a.Address, b => b.MapFrom(c => c.Address));

            CreateMap<UpdateUserByUserDto, AppUser>()
                .ForMember(a => a.Address, b => b.MapFrom(c => c.Address));

            // Announcement
            CreateMap<CreateAnnouncementDto, Announcement>()
                .ForMember(a => a.Address, b => b.MapFrom(c => c.Address));

            CreateMap<UpdateAnnouncementByUserDto, Announcement>()
                .ForMember(a => a.Address, b => b.MapFrom(c => c.Address));

            CreateMap<UpdateAnnouncementByUserDto, Announcement>();

            CreateMap<Announcement, AnnouncementDto>();

            // Address
            CreateMap<AddressDto, Address>()
                .ReverseMap();
            
        }
    }
}
