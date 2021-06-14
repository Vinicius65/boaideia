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
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.Username,
                NumberOfVotation = user.SocialRank.NumberOfVotation,
                Rank = user.SocialRank.Rank,
                Token = token
            };
        }

        public static User To_User(this CadastroUserVMR userVMR)
        {
            if (userVMR is null)
                return null;

            return new User()
            {
                FirstName = userVMR.FirstName,
                LastName = userVMR.LastName,
                Username = userVMR.Username,
                Email = new EmailVO(userVMR.Email),
                Password = userVMR.Password,
            };
        }
    }
}
