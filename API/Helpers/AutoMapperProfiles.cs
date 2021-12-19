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

            CreateMap<AppUser, AnnouncementCreatorDto>();

            CreateMap<UpdateUserByUserDto, AppUser>()
                .ForMember(a => a.Address, b => b.MapFrom(c => c.Address));


            // Announcement
            CreateMap<CreateAnnouncementDto, Announcement>()
                .ForMember(a => a.Address, b => b.MapFrom(c => c.Address));

            CreateMap<UpdateAnnouncementByUserDto, Announcement>()
                .ForMember(a => a.Address, b => b.MapFrom(c => c.Address));

            CreateMap<Announcement, AnnouncementDto>()
                .ForMember(a => a.Address, b => b.MapFrom(c => c.Address))
                .ForMember(a => a.User, b => b.MapFrom(c => c.AppUser))
                .ForMember(a => a.PhotoUrl, b => b.MapFrom(c => c.Photos.FirstOrDefault(x => x.IsMain).Url));

            // Address
            CreateMap<AddressDto, Address>()
                .ReverseMap();

            // Photo
            CreateMap<Photo, PhotoDto>();

            // Comment
            CreateMap<Comment, CommentDto>()
                .ForMember(a => a.SenderUsername, b => b.MapFrom(c => c.Sender.UserName));
        }
    }
}
