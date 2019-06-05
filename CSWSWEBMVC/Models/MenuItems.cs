using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSWSWEBMVC.Models
{
    public class MenuItems
    {
        /*
           <li class="dropdown menuli changelan">
                                            <a href="" class="entry_dropdown_toggle dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Langauge<span class="caret"></span></a>
                                            <ul class="dropdown-menu cs_dropdow_menu" role="menu">
                                                <li>@Html.ActionLink("English", "SwitchLanguage", "Home", new { culture = "en-ca" }, null)</li>
                                                <li>@Html.ActionLink("中文", "SwitchLanguage", "Home", new { culture = "zh-hk" }, null)</li>
                                            </ul>
                                        </li>
         */

        public  MenuItems(string lanCode)
        {
            Dictionary<string, string> Menu_LanItems = new Dictionary<string, string>()
                {
           
                    { "en-ca", "English"},
                    { "fr-ca", "Français"},
                     { "zh-hk", "中文"}
                };     

            string culture = lanCode;

            MenuItemParent = Menu_LanItems[culture];
            MenuItemParent_lanCode = culture;

            if (culture == Menu_LanItems.Keys.ElementAt(0)) // English
            {
          
                MenuItemSub_1 = Menu_LanItems[Menu_LanItems.Keys.ElementAt(1)];
                MenuItemSub_1_lanCode = Menu_LanItems.Keys.ElementAt(1);

                MenuItemSub_2 = Menu_LanItems[Menu_LanItems.Keys.ElementAt(2).ToString()];
                MenuItemSub_2_lanCode = Menu_LanItems.Keys.ElementAt(2).ToString();

            }
            if (culture == Menu_LanItems.Keys.ElementAt(1)) // France
            {

                MenuItemSub_1 = Menu_LanItems[Menu_LanItems.Keys.ElementAt(0).ToString()];
                MenuItemSub_1_lanCode = Menu_LanItems.Keys.ElementAt(0).ToString();

                MenuItemSub_2 = Menu_LanItems[Menu_LanItems.Keys.ElementAt(2).ToString()];
                MenuItemSub_2_lanCode = Menu_LanItems.Keys.ElementAt(2).ToString();

            }
            if (culture == Menu_LanItems.Keys.ElementAt(2)) // Janpanese
            {

                MenuItemSub_1 = Menu_LanItems[Menu_LanItems.Keys.ElementAt(0).ToString()];
                MenuItemSub_1_lanCode = Menu_LanItems.Keys.ElementAt(0).ToString();

                MenuItemSub_2 = Menu_LanItems[Menu_LanItems.Keys.ElementAt(1).ToString()];
                MenuItemSub_2_lanCode = Menu_LanItems.Keys.ElementAt(1).ToString();

            }

        }

    
        public string MenuItemParent { get; set; }
        public string MenuItemSub_1 { get; set; }
        public string MenuItemSub_2 { get; set; }

        public string MenuItemParent_lanCode { get; set; }
        public string MenuItemSub_1_lanCode { get; set; }
        public string MenuItemSub_2_lanCode { get; set; }

        public string RootHref { get; set; }

        public string RootHrefCulture { get; set; }
        public string CSWSDomainHref { get; set; }
        public string CSWSIndsutryHref { get; set; }


    }
}