using BoaIdeia.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.ViewModel
{
    public class UserVM
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Google { get; set; }
        public long NumberOfVotation { get; set; }
        public decimal Rank { get; set; }
        public virtual List<Project> Projects { get; set; }
        public string Token { get; set; }

        public UserVM()
        {
            Projects = new List<Project>();
        }
    }
}
