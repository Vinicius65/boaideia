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
using BoaIdeia.Api.ViewModel.Received;

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
        public async Task<ActionResult<IEnumerable<ProjectVM>>> GetProjects()
        {
            return(await GetGenericRecords())
                .Where(p => !p.IsPrivate)    // projetos públicos
                .Select(SelectRecords)
                .ToList();
        }

        [HttpGet]
        [Route("meusProjetos")]
        public async Task<ActionResult<IEnumerable<ProjectVM>>> GetMyProjects()
        {
            return(await GetGenericRecords())
                .Where(p => p.Users.Any(u => u.IdUser == User.Id()))    // projetos que faço parte
                .Where(p => p.Users.Any(u => u.IsOwner()))              // aonde eu sou owner
                .Select(SelectRecords)
                .ToList();
            
        }

        [HttpGet]
        [Route("minhasContribuicoes")]
        public async Task<ActionResult<IEnumerable<ProjectVM>>> GetMyContributions()
        {
            return(await GetGenericRecords())
                .Where(p => p.Users.Any(u => u.IdUser == User.Id()))    // projetos que faço parte
                .Select(SelectRecords)
                .ToList();
            
        }

        public ProjectVM SelectRecords(Project p)
            => new ProjectVM
            { 
                Description = p.Description,
                EndDate = p.EndDate,
                ExpectedEndDate = p.ExpectedEndDate,
                IsPrivate = p.IsPrivate,
                Name = p.Name,
                NumberOfVotation = p.RelevanceRank.NumberOfVotation,
                Rank = p.RelevanceRank.Rank,
                Id = p.Id,
                StartDate = p.StartDate,
                UserInfo = new ProjectUserVM() 
                {
                    Username = p.Users.First(u => u.IsOwner()).User.Username,
                    DepartureDate = p.Users.First(u => u.IsOwner()).DepartureDate,
                    EntryDate = p.Users.First(u => u.IsOwner()).EntryDate,
                    TypePermission = p.Users.First(u => u.IsOwner()).TypePermission,
                    IdProject = p.Id,
                    IdUser = p.Users.First(u => u.IsOwner()).User.Id
                },
                Timeline = p.Timeline
            };

        public async Task<List<Project>> GetGenericRecords()
            => (await _context.Projects
                .Include(p => p.Users)
                .ThenInclude(p => p.User)
                .Include(p => p.Timeline)
                .ToListAsync());

        [HttpGet]
        [Route("meusProjetosFullStack/{username}")]
        public async Task<ActionResult<IEnumerable<ProjectVM>>> GetMyProjectsFullstack(string username)
        {
            var projectUser = (await _context.ProjectUser
                .Where(pu => pu.User.Username == username)
                .Include(pu => pu.Project).ToListAsync());
              

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

        [HttpPut("editandoProjeto/{id}")]
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

        [HttpPost]
        [Route("cadastrarProjetoFullStack")]
        public async Task<ActionResult<Project>> PostProjectFullStack(ProjectFullStackVM projectVM)
        {
            var userExist = await _context.Users
                                  .Where(p=>p.Email.Value==projectVM.User.Email || p.Username ==projectVM.User.Username)
                                  .Select(p => p.Username).FirstOrDefaultAsync();

            if (string.IsNullOrWhiteSpace(userExist))
            {
                CadastroUserVMR cadastroUserVM = new CadastroUserVMR();

                cadastroUserVM.FirstName = projectVM.User.FirstName;
                cadastroUserVM.LastName = projectVM.User.LastName;
                cadastroUserVM.Username = projectVM.User.Username;
                cadastroUserVM.Email = projectVM.User.Email;
                cadastroUserVM.Password = projectVM.User.password;
                
                var user = cadastroUserVM.To_User();
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var userVM = user.To_UserVM();

                projectVM.UserInfo.IdUser = userVM.Id;
                projectVM.User.Id = userVM.Id;
                projectVM.User.password = user.Password;
            }

            var userOld = await _context.Users.Where(u => u.Email.Value == projectVM.User.Email || u.Username == projectVM.User.Username)
                                           .Select(p => p.Id).FirstOrDefaultAsync();

            if (projectVM.UserInfo == null)
                return BadRequest(new { Error = "Projeto deve conter o usuário que o criou" });

            projectVM.UserInfo.IdUser = userOld;
            projectVM.User.Id = userOld;

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
            var project = (await _context.ProjectUser
                                 .Include(p=>p.Project)
                                 .Where(p => p.IdProject == id && p.IdUser == User.Id())
                                 .ToListAsync());

            var proj = project.Where(p => p.IsOwner())
                              .Select(p=>p.Project).FirstOrDefault();

            if (proj is null)
                return Unauthorized();

            _context.Projects.Remove(proj);
            await _context.SaveChangesAsync();

            return proj;
        }
    }
}
