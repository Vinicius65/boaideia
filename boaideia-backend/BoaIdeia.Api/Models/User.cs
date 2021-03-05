using BoaIdeia.Api.Services;
using BoaIdeia.Api.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public EmailVO Email { get; set; }

        private string _password;
        public string Password { 
            get {
                return _password;
            } 
            set {
                _password = TokenService.GetHash(value);
            } 
        }

        public string Github { get; set; }
        public string GithubId { get; set; }

        public string Stackoverflow { get; set; }
        public string StackoverflowId { get; set; }

        public string Google { get; set; }
        public string GoogleId { get; set; }


        public RankVO SocialRank { get; set; }
        public virtual List<ProjectUser> Projects { get; private set; }

        public User()
        {
            SocialRank = new RankVO();
        }
    }
}
