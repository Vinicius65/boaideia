using System;

namespace BoaIdeia.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntegrationsController : ControllerBase
    {
         private readonly BoaIdeiaContext _context;

        public IntegrationsController(BoaIdeiaContext context)
        {
            _context = context;
        }


        [HttpGet("Fullstack")]
        public async Task<ActionResult<IEnumerable<Goal>>> GetTimeline(long idProject)
        {
           
        }

        [HttpGet("AjustarNome")]
        public async Task<ActionResult<IEnumerable<Goal>>> GetTimeline(long idProject)
        {
           
        }
    }
}
