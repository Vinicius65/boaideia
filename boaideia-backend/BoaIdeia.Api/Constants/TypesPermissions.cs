using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Constants
{
    public static class TypesOfPermissions
    {
        public const string Owner = "owner";
        public const string Contributor = "contributor";
        public const string Subscriber = "subscriber";
        public const string Visitors = "visitors";

        public static string[] List { get; } = { Owner, Contributor, Subscriber, Visitors };
    }
}
