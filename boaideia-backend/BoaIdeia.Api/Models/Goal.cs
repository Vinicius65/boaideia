using System;

namespace BoaIdeia.Api.Models
{
    public class Goal
    {
        public long Id { get; set;  }
        public long IdProject { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime ExpectedEndDate { get; set; } = DateTime.Now;
        public DateTime? EndDate { get; set; }
        public Project Project { get; set; }
    }
}