using CSWS_Conponent;
using CSWSWEB.CSWSBAL;
using CSWSWEB.Helpers;
using CSWSWEBMVC.CSWSBAL;
using CSWSWEBMVC.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSWSWEBMVC.Controllers
{

    public class HomeController :  BaseController
    {
     
        public ActionResult Index()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        public ActionResult Newsletter()
        {

            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        public ActionResult AboutUs()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
 
         }

        public ActionResult ContactUs()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
 
        }

        public ActionResult FeedBack()
        {

            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        public ActionResult Gallery()
        {
 
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        public ActionResult Share(string baseInfo, string artInfo)
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        public ActionResult Image()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        public ActionResult Region()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        public ActionResult Quote(string qt_type, string qt_author, string qt_id)
        {

            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }


        public ActionResult QuoteSearch(string qt_type, string qt_author, string qt_id)
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        public ActionResult Portfolio()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

      

        public ActionResult SwitchLanguage(string culture)
        {
             // Validate input
            culture = CultureHelper.GetImplementedCulture(culture);

            // Validate input
            culture = CultureHelper.GetImplementedCulture(culture);
            RouteData.Values["culture"] = culture;  // set culture

            CSWS_Utility bllUtil = new CSWS_Utility();

              //return View();
            var url = Request.UrlReferrer.ToString();

            char[] splitChar = {'/'};
            string preCulture= bllUtil.getSplitValue(url, splitChar, 3);
            string preController = bllUtil.getSplitValue(url, splitChar, 4);
            if (preController == "")
                preController= ("Index");

            // work around for adding province init to URL for index page  localhost:66057/zh-hk/HK
            TerritoriesInfo troInfo = new TerritoriesInfo();
            if (troInfo.TerritoryIDInfo.ContainsKey(preController))
            {
                preController = ("Index");
            }
            bllUtil.DeleteCookies(CSWSConstants.CSWS_COOKIE_CSWS_DEF_CULTURE);
            bllUtil.CreateCookies(CSWSConstants.CSWS_COOKIE_CSWS_DEF_CULTURE, culture, 365d);

            preController = preController.ToLower();

            if (preController == "quote" || preController == "quotesearch" || preController == "share" || preController == "image")
            {
                if (culture != preCulture)
                   url= url.Replace(preCulture, culture);

                return Redirect(url);
            }
            else if(preController=="account")
            {
                if (culture != preCulture)
                    url= url.Replace(preCulture, culture);
                return Redirect(url);
            }          
             return RedirectToAction(preController);
        }

        private MenuItems creatMenu()
        {
            MenuItemsBAL menuBal = new MenuItemsBAL();
            string culture = RouteData.Values["culture"].ToString().ToLower();

            bool isLogin = false;
            if (Request.Cookies[CSWSConstants.COOKIE_CSWS_USER_SESSION] != null)
            {
                isLogin = true; //dummy para
            }
            MenuItems menuItems = menuBal.creatMenu(culture, isLogin);
            return menuItems;
        }

    }
}