using BoaIdeia.Api.Models;
using BoaIdeia.Api.ValueObject;
using BoaIdeia.Api.ViewModel;
using BoaIdeia.Api.ViewModel.Received;
using BoaIdeia.Test.Util;
using System.IO;
using System.Threading.Tasks;
using Xunit;

namespace DeliverIT.Test.Cenarios
{
    public class UserTest
    {

        [Theory]
        [InlineData("Vinicius", "password", "vinicius65", null, 5, 1)]

        public async Task Cadastrar(string name, string password, string github, string stackoverflow, decimal rankExpeted, long numberExcepeted)
        {
            string email = $"{Path.GetRandomFileName()}@{Path.GetRandomFileName()}.com";

            var user = new CadstroUserVMR()
            {
                Name = name,
                Email = email,
                Password = password,
                Github = github,
                Stackoverflow = stackoverflow,
            };

            var newUser = await RequestTest.SendAndReceived<UserVM>("api/users/cadastrar", user);
            Assert.Equal(newUser.Rank, rankExpeted);
            Assert.Equal(newUser.NumberOfVotation, numberExcepeted);
            Assert.Matches("Bearer .*", newUser.Token);
        }


        [Theory]
        [InlineData("Vinicius", "viniciusbss124@gmail.com", "password", "vinicius65", null, 3, 4)]

        public void Votar(string name, string email, string password, string github, string stackoverflow, decimal vote, long expeted)
        {
            var user = new User() { Name = name, Email = new EmailVO(email), Password = password, Github = github, Stackoverflow = stackoverflow, SocialRank = new RankVO() };

            user.SocialRank.Vote(vote);
            user.SocialRank.Vote(vote);
            user.SocialRank.Vote(vote);

            Assert.Equal(user.SocialRank.NumberOfVotation, expeted);
        }

        [Theory]
        [InlineData("Vinicius", "viniciusbss124@gmail.com", "password", "vinicius65", null, 3, 4)]
        [InlineData("Vinicius", "viniciusbss124@gmail.com", "password", "vinicius65", null, 2, 3.5)]
        [InlineData("Vinicius", "viniciusbss124@gmail.com", "password", "vinicius65", null, 4, 4.5)]
        [InlineData("Vinicius", "viniciusbss124@gmail.com", "password", "vinicius65", null, 5, 5)]
        [InlineData("Vinicius", "viniciusbss124@gmail.com", "password", "vinicius65", null, 4.5, 4.75)]
        public void TestarRank(string name, string email, string password, string github, string stackoverflow, decimal vote, decimal expeted)
        {
            var user = new User() { Name = name, Email = new EmailVO(email), Password = password, Github = github, Stackoverflow = stackoverflow, SocialRank = new RankVO() };
            user.SocialRank.Vote(vote);
            Assert.Equal(user.SocialRank.Rank, expeted);
        }


    }
}
