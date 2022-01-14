using API.DTOs;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IAdminRespository
    {
        public Task<PagedList<MemberDto>> GetUsers([FromQuery] MemberParams memberParams);
    }
}
