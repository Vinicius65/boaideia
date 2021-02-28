using BoaIdeia.Test.Fixtures;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.Text.Json;


namespace BoaIdeia.Test.Util
{
    public static class RequestTest
    {
        private static readonly TestContext _testContext = new TestContext();

        public async static Task<T1> SendAndReceived<T1>(string endpoint, object payload)
        {
            var contentSend = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var response = await _testContext.HttpClient.PostAsync(endpoint, contentSend);
            response.EnsureSuccessStatusCode();

            var contentReceive = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<T1>(contentReceive, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
        }
    }
}
