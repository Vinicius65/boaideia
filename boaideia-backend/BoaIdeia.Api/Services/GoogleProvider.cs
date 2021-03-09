using BoaIdeia.Api.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using BoaIdeia.Api.DataObjectTransfer;
using BoaIdeia.Api.Extensions;

namespace BoaIdeia.Api.Services
{
    public class GoogleProvider : IGoogleProvider
    {

        public async Task<bool> Auth(string email, string token)
        {

            if (string.IsNullOrWhiteSpace(email))
                return false;

            var url = $"https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}";

            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("upgrade-insecure-requests", "1");
            httpClient.DefaultRequestHeaders.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36");

            var response = await httpClient.GetAsync(url);
            var userGoogle = JsonSerializer.Deserialize<UserGoogleProviderDto>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true});

            if (email.ToLower().Strip() == userGoogle.Email && bool.Parse(userGoogle.Email_verified))
            {
                return true;
            }
            return false;
        }
    }
}
