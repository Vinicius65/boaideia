using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.ValueObject
{
    public class RankVO
    {
        public decimal Rank { get; private set; }
        public long NumberOfVotation { get; private set; }

        public RankVO()
        {
            Rank = 5;
            NumberOfVotation = 1;
        }

        public RankVO Vote(decimal value)
        {
            if (value >= 0 && value <= 5)
            {
                var newValue = ((Rank * NumberOfVotation) + value) / (NumberOfVotation + 1);
                Rank = newValue;
                NumberOfVotation += 1;
            }
            else
            {
                throw new ArgumentOutOfRangeException("O número informado deve estar entre 0 e 5");
            }
            return this;
        }
    }
}
