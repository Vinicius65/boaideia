using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Extensions
{
    public static class UserIdentityExtension
    {
        public static long Id(this ClaimsPrincipal principal)
        {
            return long.Parse(principal.FindFirst(principal.Claims.FirstOrDefault().Type).Value);
        }
    }
}
