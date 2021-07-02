using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BoaIdeia.Api.Models;
using Microsoft.AspNetCore.Authorization;
using BoaIdeia.Api.Extensions;
using BoaIdeia.Api.ViewModel;
using BoaIdeia.Api.Constants;

namespace BoaIdeia.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly BoaIdeiaContext _context;


        public ProjectsController(BoaIdeiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.Where(p => !p.IsPrivate).ToListAsync();
        }

        [HttpGet]
        [Route("myprojects")]
        public async Task<ActionResult<IEnumerable<ProjectVM>>> GetMyProjects()
        {
            var projectUser = (await _context.ProjectUser
                .Where(pu => pu.IdUser == User.Id())
                .Include(pu => pu.Project).ToListAsync())
                .Where(pu => pu.HasAccess());


            return projectUser.Select(p => new ProjectVM() 
            { 
                Description = p.Project.Description,
                EndDate = p.Project.EndDate,
                ExpectedEndDate = p.Project.ExpectedEndDate,
                IsPrivate = p.Project.IsPrivate,
                Name = p.Project.Name,
                NumberOfVotation = p.Project.RelevanceRank.NumberOfVotation,
                Rank = p.Project.RelevanceRank.Rank,
                Id = p.Project.Id,
                StartDate = p.Project.StartDate,
                UserInfo = new ProjectUserVM() 
                { 
                    DepartureDate = p.DepartureDate,
                    EntryDate = p.EntryDate,
                    TypePermission = p.TypePermission,
                    IdProject = p.IdProject,
                    IdUser = p.IdUser
                }
            }).ToList();
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(long id, ProjectVM projectVM)
        {

            // verificar validações em memória
            if (id != projectVM.Id)
                return BadRequest();
            if (projectVM.UserInfo.IdUser != User.Id() || projectVM.UserInfo.TypePermission != TypesOfPermissions.Owner)
                return Unauthorized();

            // verificar em banco
            var project = await _context.Projects.Where(p => p.Id == id).Include(p => p.Users).FirstOrDefaultAsync();
            if (project is null)
                return NotFound();
            var isOwner = project.Users.Where(u => u.IdUser == User.Id()).Where(u => u.IsOwner()).Any();
            if (!isOwner)
                return Unauthorized();

            project.Name = projectVM.Name;
            project.Description = projectVM.Description;
            project.StartDate = projectVM.StartDate;
            project.ExpectedEndDate = projectVM.ExpectedEndDate;
            project.IsPrivate = projectVM.IsPrivate;

            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        [Route("cadastrarProjeto")]
        public async Task<ActionResult<Project>> PostProject(ProjectVM projectVM)
        {
            if (projectVM.UserInfo == null)
                return BadRequest(new { Error = "Projeto deve conter o usuário que o criou" });

            var isCurrentUser = projectVM.UserInfo.IdUser == User.Id();
            if (!isCurrentUser)
                return BadRequest(new { Error = "Projeto deve conter o usuário que o criou" });

            var projectUser = new ProjectUser(projectVM.UserInfo.IdUser, TypesOfPermissions.Owner);
            var project = new Project(projectUser)
            { 
                Description = projectVM.Description,
                ExpectedEndDate = projectVM.ExpectedEndDate,
                IsPrivate = projectVM.IsPrivate,
                Name = projectVM.Name,
                StartDate = projectVM.StartDate
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            projectVM.Id = project.Id;
            projectVM.NumberOfVotation = project.RelevanceRank.NumberOfVotation;
            projectVM.Rank = project.RelevanceRank.Rank;
            projectVM.UserInfo.EntryDate = project.Users.First().EntryDate;
            projectVM.UserInfo.IdProject = project.Id;
            projectVM.UserInfo.TypePermission = TypesOfPermissions.Owner;


            return CreatedAtAction("GetProjects", new { id = projectVM.Id }, projectVM);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> DeleteProject(long id)
        {
            var project = await _context.ProjectUser
             .Where(p => p.IdProject == id)
             .Where(p => p.IdUser == User.Id())
             .Where(p => p.IsOwner()).Select(p => p.Project).FirstOrDefaultAsync();

            if (project is null)
                return Unauthorized();

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return project;
        }
    }
}
