using BoaIdeia.Api.Models;
using BoaIdeia.Api.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Extensions
{
    public static class MapperExtension
    {
        public static UserVM To_UserVM(this User user)
        {
            if (user is null)
                return null;

            return new UserVM()
            {
                Email = user.Email.Value,
                Github = user.Github,
                Id = user.Id,
                Name = user.Name,
                NumberOfVotation = user.SocialRank.NumberOfVotation,
                Rank = user.SocialRank.Rank,
                Stackoverflow = user.Stackoverflow,
            };
        }
    }
}
