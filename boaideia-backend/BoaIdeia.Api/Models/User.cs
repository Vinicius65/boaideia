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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
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
        public bool IsPolitical  { get; set;}

        public string Google { get; set; }
        public string GoogleId { get; set; }
        public int IdOragon {get; set;}


        public RankVO SocialRank { get; set; }
        public List<ProjectUser> Projects { get; set; }

        public User()
        {
            SocialRank = new RankVO();
        }
    }
}
