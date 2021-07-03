using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.ViewModel
{
    public class ProjectFullStackVM
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
        public long NumberOfVotation { get; set; }
        public decimal Rank { get; set; }
        public bool IsPrivate { get; set; }
        public ProjectUserVM UserInfo { get; set; }
        public UserFullStackVM User { get; set; }
        public ProjectFullStackVM()
        {
            UserInfo = new ProjectUserVM();
            User = new UserFullStackVM();
        }
    }
}
