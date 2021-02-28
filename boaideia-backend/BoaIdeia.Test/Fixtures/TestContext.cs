using BoaIdeia.Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net.Http;

namespace BoaIdeia.Test.Fixtures
{
    public class TestContext
    {
        public HttpClient HttpClient { get; set; }
        private  TestServer Server { get; set; }

        public TestContext()
        {
            var appsettingsPath = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            Console.WriteLine(appsettingsPath);
            Server = new TestServer(new WebHostBuilder()
                .UseEnvironment("Development")
                .UseConfiguration(new ConfigurationBuilder()
                    .AddJsonFile(appsettingsPath)
                    .Build()
                )
                .UseStartup<Startup>());

            HttpClient = Server.CreateClient();
        }
    }
}
