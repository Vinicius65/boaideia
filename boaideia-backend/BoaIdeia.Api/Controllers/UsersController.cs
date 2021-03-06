﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BoaIdeia.Api.Models;
using BoaIdeia.Api.ViewModel;
using Microsoft.AspNetCore.Authorization;
using BoaIdeia.Api.ValueObject;
using BoaIdeia.Api.Services;
using BoaIdeia.Api.ViewModel.Received;
using BoaIdeia.Api.Constants;
using BoaIdeia.Api.Services.Interfaces;
using BoaIdeia.Api.Extensions;

namespace BoaIdeia.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BoaIdeiaContext _context;
        private readonly IGoogleProvider _googleProvider;

        public UsersController(BoaIdeiaContext context, IGoogleProvider googleProvider)
        {
            _context = context;
            _googleProvider = googleProvider;
        }


        [HttpPost]
        [Route("logar")]
        [AllowAnonymous]
        public async Task<ActionResult<UserVM>> Login(LoginVMR user)
        {
            var searchUser = await _context.Users.Where(u => (u.Email.Value == user.Login|| u.Username == user.Login) && u.Password == user.Password).FirstOrDefaultAsync();
            if (searchUser != null)
            {
                
                var token = TokenService.GenerateToken(searchUser);
                return searchUser.To_UserVM(token);
            }
            return Unauthorized();
        }


        [HttpPost]
        [Route("logar/{provider}")]
        [AllowAnonymous]
        public async Task<ActionResult<UserVM>> LoginProvider(string provider, LoginProviderVMR userProvider)
        {
            if (string.IsNullOrWhiteSpace(provider))
                return Unauthorized();

            if (provider.ToUpper() == Providers.GOOGLE)
            {
                if (await _googleProvider.Auth(userProvider.Email, userProvider.Token))
                {
                    var user = await _context.Users.Where(u => u.Email.Value == userProvider.Email).FirstOrDefaultAsync();
                    if (user is null)
                    {
                        user = new User()
                        {
                            FirstName = userProvider.FirstName,
                            LastName = userProvider.LastName,
                            Email = new EmailVO(userProvider.Email),
                        };
                        await _context.Users.AddAsync(user);
                        await _context.SaveChangesAsync();
                    }
                    var token = TokenService.GenerateToken(user);
                    return user.To_UserVM(token);
                }
            }
            return Unauthorized();
        }



        [HttpPost]
        [Route("cadastrar")]
        [AllowAnonymous]
        public async Task<ActionResult<UserVM>> PostUser(CadastroUserVMR cadastroUserVM)
        {
            if (await _context.Users.Where(u => u.Email.Value == cadastroUserVM.Email).AnyAsync())
                return BadRequest(new { Error = "Email já cadastro no sistema, informe outro email" });

            var user = cadastroUserVM.To_User();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var userVM = user.To_UserVM();
            return CreatedAtAction("PostUser", new { id = userVM.Id }, userVM);
        }
    }
}
