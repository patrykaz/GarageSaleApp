using API.DTOs;
using API.Entity;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRespository adminRespository;
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public AdminController(IAdminRespository adminRespository, UserManager<AppUser> userManager, IMapper mapper)
        {
            this.adminRespository = adminRespository;
            this.userManager = userManager;
            this.mapper = mapper;
        }


        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] MemberParams memberParams) // FromQuery jest potrzebne ponieważ musimy wskazać, skąd ma pobrać nasze parametry, czyli z ciagu zapytania
        {
            var users = await adminRespository.GetUsers(memberParams);
            // dodajemy do odpowiedzi paginacje uzytkownika, którą wysłał z rządaniem get
            Response.AddPaginationHeader(users.CurrentPage, users.PagesSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }

        [HttpPut("users/{username}/edit-roles")]
        public async Task<ActionResult> EditRoles(string username)
        {
            var moderator = "Moderator";

            var user = await userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Nie ma takiego użytkownika");

            var userRoles = await userManager.GetRolesAsync(user);

            if(userRoles.Any(x => x.Equals("Moderator"))){
                var result = await userManager.RemoveFromRoleAsync(user, moderator);
                if (!result.Succeeded) return BadRequest("Błąd podczas usuwania roli");
            }
            else
            {
                var result = await userManager.AddToRoleAsync(user, moderator);
                if (!result.Succeeded) return BadRequest("Błąd podczas dodawania roli");
            }

            return Ok(await userManager.GetRolesAsync(user));
        }
    }
}
