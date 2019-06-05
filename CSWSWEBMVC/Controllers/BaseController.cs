using CSWS_Conponent;
using CSWSWEB.Helpers;
using CSWSWEBMVC.Models;
using System;
using System.Threading;
using System.Web.Mvc;

namespace CSWSWEBMVC.Controllers
{
    public class BaseController : Controller
    {
        
        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {
            string cultureName = RouteData.Values["culture"] as string;

            setCulture(cultureName);

            setTerrietoryIDFromURL(RouteData.Values["territory"] as string);

          
         

            return base.BeginExecuteCore(callback, state);
        }

        private void  setCulture(string cultureName)
        {
            string URLCulture = cultureName;

            CSWS_Utility bllUtil = new CSWS_Utility();
            if (cultureName == "") // start with naked url
            {
                cultureName = bllUtil.readCookies(CSWSConstants.CSWS_COOKIE_CSWS_DEF_CULTURE);
                if (cultureName == null)
                    cultureName = "en-ca";
            }
            else // if URL culture is not same as cookies, use URL's culture to replace cookies culture
            {
                bllUtil.DeleteCookies(CSWSConstants.CSWS_COOKIE_CSWS_DEF_CULTURE);
                bllUtil.CreateCookies(CSWSConstants.CSWS_COOKIE_CSWS_DEF_CULTURE, cultureName, 365d);
            }

            // Attempt to read the culture cookie from Request
             if (cultureName == null)
                cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ? Request.UserLanguages[0] : null; // obtain it from HTTP header AcceptLanguages

            // Validate culture name
            cultureName = CultureHelper.GetImplementedCulture(cultureName); // This is safe
                                                                            //  URLCulture = "fr";
            if (URLCulture != cultureName && URLCulture != "")
            {
                // Force a valid culture in the URL
                RouteData.Values["culture"] = cultureName.ToLowerInvariant(); // lower case too

                // Redirect user
                Response.RedirectToRoute(RouteData.Values);
            }
            else
            {
                RouteData.Values["culture"] = cultureName.ToLowerInvariant();  // lower case the culture
            }

            // Modify current thread's cultures            
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureName);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
        }

        private void setTerrietoryIDFromURL(string proInit)
        {
            // if no provinceInit, just ignore
            if (proInit != "" && proInit != null)
            {
                CSWS_Utility bllUtil = new CSWS_Utility();
                TerritoriesInfo troInfo = new TerritoriesInfo();
                string territoryId = "";
                
                // over ride current provinceid( 100d) and permanent(365d) provinceid in cooie
                if(troInfo.TerritoryIDInfo.TryGetValue(proInit.ToUpper(), out territoryId))
                {
                    bllUtil.DeleteCookies(CSWSConstants.COOKIE_TERRITORY_ID);
                    bllUtil.CreateCookies(CSWSConstants.COOKIE_TERRITORY_ID, territoryId, 365d);

                    bllUtil.DeleteCookies(CSWSConstants.COOKIE_CURRENT_TERRITORY_ID);
                    bllUtil.CreateCookies(CSWSConstants.COOKIE_CURRENT_TERRITORY_ID, territoryId, 365d);
                }
            }
        }
        
    }
}