using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using BoaIdeia.Api.Constants;
using BoaIdeia.Api.Models;
using BoaIdeia.Api.ValueObject;
using BoaIdeia.Api.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BoaIdeia.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OragonController : ControllerBase
    {
         private readonly BoaIdeiaContext _context;

        public OragonController(BoaIdeiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<UserVM[]> GetPoliticals() => await _context.Users
            .Where(u => u.IsPolitical)
            .Include(u => u.Projects)
            .Select(u => new UserVM{
                Email = u.Email.Value,
                FirstName = u.FirstName,
                LastName = u.LastName,
                NumberOfVotation = u.SocialRank.NumberOfVotation,
                Rank = u.SocialRank.Rank,
                Projects = u.Projects.Select(p => p.Project).ToList(),
                Username = u.Username,
                Id = u.IdOragon
            })
            .ToArrayAsync();

        [HttpGet("integration")]
        [AllowAnonymous]
        public async Task IntegrationPoliticals()
        {
            
            using var client = new HttpClient();
            var jsonStream = await client.GetStreamAsync("https://portal.oragon.inf.br/api/political");

            var usersPoliticals = await _context.Users.Where(u => u.IsPolitical).Select(u => u.IdOragon).ToArrayAsync();
            var politicalList = (await JsonSerializer.DeserializeAsync<PoliticalVM[]>(jsonStream,
                options: new JsonSerializerOptions{
                    PropertyNameCaseInsensitive = true
                }
            )).Where(p => !usersPoliticals.Contains(p.Id));

            var userList = politicalList
                .Select(p => new User{
                    Username = p.Name.Replace(" ", "").ToLower(),
                    FirstName = p.Name.Split(" ").FirstOrDefault(),
                    LastName = p.Name.Split(" ").LastOrDefault(),
                    Email = new EmailVO($"{p.Name.Replace(" ", "").ToLower()}@emailtest.com"),
                    Password = p.Name.Replace(" ", "").ToLower(),
                    IsPolitical = true,
                    IdOragon = p.Id,
                })
                .Select(u => {
                    u.Projects = MockProjects().ToList().Select(proj => new ProjectUser(TypesOfPermissions.Owner){Project = proj, User = u}).ToList();
                    return u;
                });


            var teste  = userList.ToList();
            await _context.AddRangeAsync(userList);
            await _context.SaveChangesAsync();
        }

        private Project[] MockProjects()
        {
            return new[] {
                new Project {
                    Description = "Projeto de lei para tirar patos da água",
                    ExpectedEndDate = DateTime.Now.AddYears(10),
                    IsPrivate = false,
                    Name = "Projeto Pato",
                },
                new Project {
                    Description = "Projeto de lei para adicionar o esporte 'jogar pedrinha na água' como esporte olímpico",
                    ExpectedEndDate = DateTime.Now.AddYears(5),
                    IsPrivate = false,
                    Name = "Pedrinha na água",
                },
                new Project {
                    Description = "Projeto de lei para promover boas ideias",
                    ExpectedEndDate = DateTime.Now.AddYears(3),
                    IsPrivate = false,
                    Name = "BoaIdeia",
                },
            };
        }
    }
}
