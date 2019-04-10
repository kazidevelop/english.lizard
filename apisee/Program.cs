using apisee;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.HttpSys;

namespace rest
{
    public class Program {
        public static void Main (string[] args) {
            //Access denied error - netsh http add urlacl url=http://+:5000/ user=Everyone
            CreateWebHostBuilder(args).Build ().Run ();
        }

        public static IWebHostBuilder CreateWebHostBuilder (string[] args) =>
            WebHost.CreateDefaultBuilder (args)
            .UseStartup<Startup> ()
            .UseHttpSys (options => {
                // The following options are set to default values.
                options.Authentication.Schemes = AuthenticationSchemes.None;
                options.Authentication.AllowAnonymous = true;
                options.MaxConnections = null;
                options.MaxRequestBodySize = 30000000;
                options.UrlPrefixes.Add("http://+:5000/");

                //   options.UrlPrefixes.Add ("http://localhost:5000");
            });

        // public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        //     WebHost.CreateDefaultBuilder(args)
        //         .UseStartup<Startup>();

    }
}