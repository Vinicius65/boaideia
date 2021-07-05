using System;
using System.Collections.Generic;

namespace BoaIdeia.Api.Models
{
    public class PoliticalVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BirthDate { get; set; }
        public int Party { get; set; }
        public int Office { get; set; }
        public int City { get; set; }
        public int State { get; set; }
        public bool Active { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }
}

