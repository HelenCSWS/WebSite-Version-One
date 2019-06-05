using CSWSWEBMVC.CSWSBAL;
using CSWSWEBMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSWSWEBMVC.Controllers
{
    public class AccountController : BaseController
    {
        // GET: SignIn
        public ActionResult SignIn()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
            
        }

        // GET: SignUp
        public ActionResult SignUp()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
 
        }


        // GET: Profile
        public ActionResult Profile()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        public ActionResult ChangeProfile()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }


        // GET: ForgetPassword
        public ActionResult ForgetPassword()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        // GET: ResetPassword
        public ActionResult ResetPassword()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        // GET: AcctiveAccount
        public ActionResult ActiveAccount()
        {
            MenuItems menuItems = creatMenu();
            return View(menuItems);
        }

        private MenuItems creatMenu()
        {
            MenuItemsBAL menuBal = new MenuItemsBAL();
            string culture = RouteData.Values["culture"].ToString().ToLower();

            bool isLogin = false;
            if (Request.Cookies["user_session"] != null)
            {
                isLogin = true; //dummy para
            }
            MenuItems menuItems = menuBal.creatMenu(culture, isLogin);


            return menuItems;
        }
    }
}