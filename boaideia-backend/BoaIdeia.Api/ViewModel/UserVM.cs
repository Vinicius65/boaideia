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
        public string Name { get; set; }
        public string Email { get; set; }
        public string Github { get; set; }
        public string Stackoverflow { get; set; }
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
