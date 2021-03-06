using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static  async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {   //checking if database is create if is not then it must be created
                var context = services.GetRequiredService<DataContext>(); 
                await context.Database.MigrateAsync();
                await Seed.SeedData(context);
            }
            catch(Exception ex)
            {   //hendel the exepction of creating database
                var logger = services.GetRequiredService < ILogger<Program>>();
                logger.LogError(ex, "An error occured during migration ");
            }
            //this is running our aplication 
           await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
