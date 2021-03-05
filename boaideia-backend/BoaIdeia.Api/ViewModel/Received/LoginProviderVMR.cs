using BoaIdeia.Api.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.ViewModel
{
    public class LoginProviderVMR
    {
        public string Name { get; set; }
        public string SecretProvider { get; set; }
        public string Github { get; set; }
        public string GithubId { get; set; }

        public string Stackoverflow { get; set; }
        public string StackoverflowId { get; set; }

        public string Google { get; set; }
        public string GoogleId { get; set; }

    }
}
