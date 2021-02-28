using System;
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

namespace BoaIdeia.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BoaIdeiaContext _context;

        public UsersController(BoaIdeiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        [Route("logar")]
        [AllowAnonymous]
        public async Task<ActionResult<object>> Login(LoginVMR user)
        {
            user.Password =  TokenService.GetHash(user.Password);
            var searchUser = await _context.Users.Where(u => u.Email.Value == user.Email && u.Password == user.Password).FirstOrDefaultAsync();
            if (searchUser != null)
            {
                var token = TokenService.GenerateToken(searchUser);
                return new UserVM()
                {
                    Email = searchUser.Email.Value,
                    Github = searchUser.Github,
                    Id = searchUser.Id,
                    Name = searchUser.Name,
                    NumberOfVotation = searchUser.SocialRank.NumberOfVotation,
                    Rank = searchUser.SocialRank.Rank,
                    Stackoverflow = searchUser.Stackoverflow,
                    Token = token
                };
            }
            return Unauthorized();
        }



        [HttpPost]
        [Route("cadastrar")]
        [AllowAnonymous]
        public async Task<ActionResult<UserVM>> PostUser(CadstroUserVMR cadastroUserVM)
        {
            if (_context.Users.Where(u => u.Email.Value == cadastroUserVM.Email).FirstOrDefault() != null)
                return BadRequest(new { Error = "Email já cadastro no sistema, informe outro email" });

            var user = new User()
            {
                Name = cadastroUserVM.Name,
                Email = new EmailVO(cadastroUserVM.Email),
                Password = TokenService.GetHash(cadastroUserVM.Password),
                Github = cadastroUserVM.Github,
                Stackoverflow = cadastroUserVM.Stackoverflow,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = TokenService.GenerateToken(user);


            var userVM = new UserVM()
            {
                Email = user.Email.Value,
                Github = user.Github,
                Id = user.Id,
                Name = user.Name,
                NumberOfVotation = user.SocialRank.NumberOfVotation,
                Rank = user.SocialRank.Rank,
                Stackoverflow = user.Stackoverflow,
                Token = token,
            };
            return CreatedAtAction("GetUser", new { id = userVM.Id }, userVM);
        }
    }
}
