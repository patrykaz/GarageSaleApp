using API.DTOs;
using API.Entity;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public UsersController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }


        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await unitOfWork.UserRepository.GetMemberAsync(username);
            if (user is null)
                return NotFound();

            return Ok(user);
        }

        [HttpPut]
        public async Task<ActionResult<UpdateUserByUserDto>> UpdateUser([FromBody] UpdateUserByUserDto updateUserByUserDto)
        {
            var currentUser = await unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            if(updateUserByUserDto.Address is null)
            {
                currentUser.Address = null;
                currentUser.AddressId = null;
                mapper.Map(updateUserByUserDto, currentUser);
            }
            else
            {
                var addressExist = unitOfWork.AddressRepository.FindAddresByProperties(updateUserByUserDto.Address.Street, updateUserByUserDto.Address.City, updateUserByUserDto.Address.Province);

                if (addressExist is null)
                {
                    currentUser.Address = null;
                    mapper.Map(updateUserByUserDto, currentUser);
                }
                else
                {
                    if (currentUser.AddressId != addressExist.Id)
                    {
                        updateUserByUserDto.Address = null;
                        mapper.Map(updateUserByUserDto, currentUser);
                        currentUser.Address = addressExist;
                    }
                    else
                    {
                        mapper.Map(updateUserByUserDto, currentUser);
                    }
                }
            }

            unitOfWork.UserRepository.Update(currentUser);

            if (await unitOfWork.Complete()) 
                return Ok(mapper.Map<MemberDto>(currentUser));

            return BadRequest("Błąd w aktualizacji użytkownika");
        }


    }
}
