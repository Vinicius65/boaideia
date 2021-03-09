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

        private readonly HttpClient _request;
        public GoogleProvider(HttpClient request)
        {
            _request = request;
        }
        public async Task<bool> Auth(string token, string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            var response = await _request.GetAsync($"https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}");
            var userGoogle = JsonSerializer.Deserialize<UserGoogleProviderDto>(await response.Content.ReadAsStringAsync());

            if (email.ToLower().Strip() == userGoogle.Email && bool.Parse(userGoogle.Email_verified))
            {
                return true;
            }
            return false;
        }
    }
}
