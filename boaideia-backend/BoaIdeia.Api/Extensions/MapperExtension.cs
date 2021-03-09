using BoaIdeia.Api.Models;
using BoaIdeia.Api.ValueObject;
using BoaIdeia.Api.ViewModel;
using BoaIdeia.Api.ViewModel.Received;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Extensions
{
    public static class MapperExtension
    {
        public static UserVM To_UserVM(this User user, string token = null)
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
                Token = token
            };
        }

        public static User To_User(this CadastroUserVMR userVMR)
        {
            if (userVMR is null)
                return null;

            return new User()
            {
                Name = userVMR.Name,
                Email = new EmailVO(userVMR.Email),
                Password = userVMR.Password,
                Github = userVMR.Github,
                Stackoverflow = userVMR.Stackoverflow,
            };
        }
    }
}
