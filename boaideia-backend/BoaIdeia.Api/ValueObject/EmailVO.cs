using Microsoft.CodeAnalysis.Emit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.ValueObject
{
    public class EmailVO
    {
        public string Value { get; private set; }
        public EmailVO(string email)
        {
            Value = email.ToLower();
        }
        protected EmailVO() { }

        // override object.Equals
        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            var email = obj as EmailVO;
            return Value == email.Value;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Value);
        }
    }
}
