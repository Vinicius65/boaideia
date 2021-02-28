using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BoaIdeia.Api.Models;
using BoaIdeia.Api.Extensions;

namespace BoaIdeia.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private readonly BoaIdeiaContext _context;

        public GoalsController(BoaIdeiaContext context)
        {
            _context = context;
        }


        [HttpGet("{idProject}")]
        public async Task<ActionResult<IEnumerable<Goal>>> GetTimeline(long idProject)
        {
            var projectUser = await _context.ProjectUser
                .Include(p => p.Project)
                .Where(p => p.IdProject == idProject && p.IdUser == User.Id()).FirstOrDefaultAsync();


            if (projectUser is null)
                return NotFound();

            if (!projectUser.HasAccess() && projectUser.Project.IsPrivate)
                return Unauthorized();

            _context.Entry(projectUser.Project).State = EntityState.Unchanged;
            return await _context.Timelines.Where(g => g.IdProject == idProject)
                .Select(g => new Goal() { 
                    Project = null,
                    Description = g.Description,
                    EndDate = g.EndDate,
                    ExpectedEndDate = g.ExpectedEndDate,
                    IdProject = g.IdProject,
                    Id = g.Id,
                    Name = g.Name,
                    StartDate = g.StartDate
                }).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Goal>> PostGoal(Goal goal)
        {
            var projectUser = await _context.ProjectUser.Where(p => p.IdUser == User.Id() && p.IdProject == goal.IdProject).FirstOrDefaultAsync();
            if (projectUser is null)
                return NotFound(new { Erro = "Projeto não localizado para esse usuário" });
            
            if (!projectUser.HasAccess())
                return Unauthorized();

            _context.Timelines.Add(goal);
            await _context.SaveChangesAsync();
            return CreatedAtAction("PostGoal", new { id = goal.Id }, goal);
        }
      
    }
}
