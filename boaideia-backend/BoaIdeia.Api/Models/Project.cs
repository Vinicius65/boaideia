using BoaIdeia.Api.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Models
{
    public class Project
    {
        public long Id { get; private set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; } 
        public DateTime? EndDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }
        public RankVO RelevanceRank { get; private set; }
        public bool IsPrivate { get; set; }
        public List<Goal> Timeline { get; private set; }
        public List<Address> Addresses { get; private set; }
        public List<ProjectUser> Users { get; set; }

        public Project(ProjectUser users)
        {
            Users = new List<ProjectUser>() { users };
            RelevanceRank = new RankVO();
        }
        public Project(){}
    }
}
