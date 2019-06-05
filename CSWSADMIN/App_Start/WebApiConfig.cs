using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Routing;

namespace CSWSWEB
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //// Web API routes
            //config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );


            config.Routes.MapHttpRoute(
              name: "StringIDsApi",
              routeTemplate: "api/{controller}/{guid}",
              defaults: new { guid ="" }
          );

           config.Routes.MapHttpRoute(
              name: "QuoteFieldsApi",
              routeTemplate: "api/{controller}/{selectorName}",
              defaults: new { selectorName = "" }
          );

           config.Routes.MapHttpRoute(
           name: "EmailValidate",
           routeTemplate: "api/{controller}/{email}",
           defaults: new { email = "" }
       );

           config.Routes.MapHttpRoute(
            name: "username",
            routeTemplate: "api/{controller}/{userid}/{username}",
            defaults: new { userid = RouteParameter.Optional, username = "" }
        );

           config.Routes.MapHttpRoute(
           name: "checkuseremail",
           routeTemplate: "api/{controller}/{userid}/{email}",
           defaults: new { userid = RouteParameter.Optional, email = "" }
       );


          
            config.EnableSystemDiagnosticsTracing();
        }

      
    }
}
