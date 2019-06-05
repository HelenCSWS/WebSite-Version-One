using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CSWSWEBMVC.Startup))]
namespace CSWSWEBMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
