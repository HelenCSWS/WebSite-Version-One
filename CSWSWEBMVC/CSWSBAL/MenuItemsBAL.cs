using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CSWSWEB.Models;
using CSWSWEBMVC.Models;
using System.Web.Routing;
using CSWS_Conponent;

namespace CSWSWEBMVC.CSWSBAL
{
    public class MenuItemsBAL
    {
        public MenuItems creatMenu(string culture, bool isLogin)
        {
           
            MenuItems menuItems = new MenuItems(culture);

            
            menuItems.RootHref = CSWS_Conponent.CSWSConstants.CSWS_DOMAIN;

            if (isLogin)
            {
                 menuItems.RootHref = CSWS_Conponent.CSWSConstants.CSWS_INDUSTRY_DOMAIN_HTTPS;
            }

            menuItems.CSWSIndsutryHref = CSWSConstants.CSWS_INDUSTRY_DOMAIN_HTTPS + "/" + menuItems.MenuItemParent_lanCode;
            menuItems.CSWSDomainHref = CSWSConstants.CSWS_DOMAIN + "/" + menuItems.MenuItemParent_lanCode;

            bool isRelease = CSWSConstants.IS_RELEASE;
            if (!isRelease)
            {
                menuItems.RootHref = "";
                menuItems.CSWSIndsutryHref = "/" + menuItems.MenuItemParent_lanCode;
                menuItems.CSWSDomainHref = "/";
            }

            bool isTest = false;

            if (isTest)
            {
                menuItems.CSWSIndsutryHref = "/" + menuItems.MenuItemParent_lanCode;
                menuItems.CSWSDomainHref = "/";
            }

            menuItems.RootHrefCulture = menuItems.RootHref + "/" + menuItems.MenuItemParent_lanCode;

            return menuItems;
        }
    }
}