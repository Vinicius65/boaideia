using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.DataObjectTransfer
{
    public class UserGoogleProviderDto
    {
        public string Iss { get; set; }
        public string Azp { get; set; }
        public string Aud { get; set; }
        public string Sub { get; set; }
        public string Email { get; set; }
        public string Email_verified { get; set; }
        public string At_hash { get; set; }
        public string Iat { get; set; }
        public string Exp { get; set; }
        public string Alg { get; set; }
        public string Kid { get; set; }
        public string Typ { get; set; }

    }
}
