using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Services.Interfaces
{
    public interface IGoogleProvider
    {
        public Task<bool> Auth(string token, string email);
    }
}
