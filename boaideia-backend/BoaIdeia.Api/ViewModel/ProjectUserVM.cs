using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.ViewModel
{
    public class ProjectUserVM
    {
        public string Username { get; set;}
        public long IdProject { get; set; }
        public long IdUser { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime? DepartureDate { get; set; }
        public string TypePermission { get; set; }
    }
}
