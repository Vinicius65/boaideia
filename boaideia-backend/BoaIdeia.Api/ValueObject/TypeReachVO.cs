using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BoaIdeia.Api.ValueObject
{
    public class TypeReachVO
    {
        public string Value { get; private set; }

        protected TypeReachVO(){}
        public TypeReachVO(string value)
        {
            if (Enum.TryParse(value, out TypeReachEnum result))
            {
                Value = result.ToString();
            }
            else
            {
                throw new ArgumentOutOfRangeException("Informe como tipo: { neighborhood | city | state | country }");
            }
            
        }
        public TypeReachVO(TypeReachEnum typeReachEnum)
        {
            Value = typeReachEnum.ToString();
        }
    }

    public enum TypeReachEnum
    {
        neighborhood,
        city,
        state,
        country
    }
}
