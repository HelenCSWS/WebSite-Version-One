using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace CSWSWEBMVC
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
            name: "StringIDsApi",
            routeTemplate: "api/{controller}/{guid}",
            defaults: new { guid = "" }
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

            config.Routes.MapHttpRoute(
            name: "getFieldsByCulture",
            routeTemplate: "api/{controller}/{indexid}/{culture}",
            defaults: new { id = RouteParameter.Optional, culture = "" }
        );

            config.Routes.MapHttpRoute(
           name: "getQuoteByCulture",
           routeTemplate: "api/{controller}/{id}/{cursor}/{culture}",
           defaults: new { id = RouteParameter.Optional,cursor=0, culture = "" }
       );


            //  config.Routes.MapHttpRoute(
            //    name: "QuoteIDsApi",
            //    routeTemplate: "api/{controller}/{quote_id}}",
            //    defaults: new { quote_id = "" }
            //);


            //config.Routes.MapHttpRoute(
            //    name: "CityApi",
            //    routeTemplate: "api/{controller}/{countryindex}/{country}"

            //);



            // Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
            // To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
            // For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
            //config.EnableQuerySupport();

            // To disable tracing in your application, please comment out or remove the following line of code
            // For more information, refer to: http://www.asp.net/web-api
          //  config.EnableSystemDiagnosticsTracing();
        }
    }
}
