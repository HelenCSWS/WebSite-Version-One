using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSWSWEBMVC.Models
{
    public class TerritoriesInfo
    {
        public readonly Dictionary<string, string> TerritoryIDInfo = new Dictionary<string, string>()
        {
            { "BC", "1" },{ "AB", "2" },{ "MB", "3" },{ "ON", "4" },{ "QC", "5" },{ "SK", "6" },{ "NB", "7" },{ "NS", "8" },{ "HK", "9" }

        };
    }
}