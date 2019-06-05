using CSWSWEB.Helpers;
using CSWSWEBMVC.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CSWSWEBMVC
{
    public class RouteConfig
    {
        public class RootRouteConstraint<T> : IRouteConstraint
        {
            public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
            {
                var rootMethodNames = typeof(T).GetMethods().Select(x => x.Name.ToLower());
                return rootMethodNames.Contains(values["action"].ToString().ToLower());
            }
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


            routes.MapRoute(
                name: "Quote",
                url: "{culture}/Quote/{type}/{author}/{id}",
                defaults: new { controller = "Home", action = "Quote" }
            );



            routes.MapRoute(
               name: "QuoteSearch",
               url: "{culture}/QuoteSearch/{type}/{author}/{id}",
               defaults: new { controller = "Home", action = "QuoteSearch" }
           );

            routes.MapRoute(
                  name: "Share",
                  url: "{culture}/Share/{baseInfo}/{artInfo}",
                  defaults: new { controller = "Home", baseInfo = "", artInfo = "", action = "Share" }
            );



            routes.MapRoute(
             name: "Image",
             url: "{culture}/image/{imid}",
             defaults: new { controller = "Home", baseInfo = "", artInfo = "", action = "Image" }
            );

            routes.MapRoute(
               name: "ChangeProfile",
               url: "{culture}/Account/ChangeProfile/{indexid}/{userid}",
               defaults: new { controller = "Account", indexid = "", userid = "", action = "ChangeProfile" }
         );

   
           
            //  remove Home from URL for menu item and footer item, add culture, add province initital after culture
            routes.MapRoute(
                 "ROOTWithCultureP",
                 "{culture}/{action}/{territory}",
                 new { culture = "", controller = "Home", action = "Index" , territory = ""},
                 new { isMethodInHomeController = new RootRouteConstraint<HomeController>() });

            //  remove Home from URL for menu item and footer item, add culture, add province initital after culture
            routes.MapRoute(
                 "ROOTWithCulture",
                 "{culture}/{territory}",
                 new { culture = "", controller = "Home", action = "Index", territory = "" },
                 new { isMethodInHomeController = new RootRouteConstraint<HomeController>() });


            routes.MapRoute(
                               "DefaultCulture",
                               "{culture}/{controller}/{action}/{id}",
                               new { culture = CultureHelper.GetDefaultCulture(), action = "Index", id = UrlParameter.Optional }
                               );


        }
    }
}
