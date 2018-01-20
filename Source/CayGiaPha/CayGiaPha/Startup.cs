using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CayGiaPha.Startup))]
namespace CayGiaPha
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
