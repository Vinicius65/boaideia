using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BoaIdeia.Api.Models;
using BoaIdeia.Api.Services;
using BoaIdeia.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace BoaIdeia.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            SecretString = Configuration.GetValue<string>("SecretString");
        }

        public IConfiguration Configuration { get; }
        public static string SecretString;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<BoaIdeiaContext>(op =>
            {
                op.UseNpgsql(Configuration.GetConnectionString("db"));
            });
            services.AddSwaggerGen();


            //services.AddAuthentication(auth =>
            //{
            //    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(x =>
            //{
            //    x.RequireHttpsMetadata = false;
            //    x.SaveToken = true;
            //    x.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretString)),
            //        ValidateIssuer = false,
            //        ValidateAudience = false
            //    };
            //});


            // MY SERVICES
            AddMyServices(services);



            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddHttpContextAccessor();

            services.AddMvc(option =>
            {
                option.EnableEndpointRouting = false;
                //option.Filters.Add(new AuthorizeFilter(new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build()));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
        }


        public void AddMyServices(IServiceCollection services)
        {
            services.AddScoped<IGoogleProvider, GoogleProvider>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, BoaIdeiaContext context)
        {
            Console.WriteLine($"-------------------------------IsDebug: {env.IsDevelopment()}-------------------------------");
            context.Database.Migrate();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger(c => c.RouteTemplate = "/api/swagger/{documentName}/swagger.json");
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = "api/swagger";
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
            });

            //app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
