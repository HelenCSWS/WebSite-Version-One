using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CSWS_Conponent
{
    class CSWS_Cookies
    {
        public void CreateCookies(string CookyName, string CookieVal, double CookieExpiresd)
        {
            HttpCookie myCookie = new HttpCookie(CookyName);
            myCookie.Value = CookieVal;         
            myCookie.Expires = DateTime.Now.AddDays(CookieExpiresd);
         
        }

        public void DeleteCookies(string CookyName)
        {
            var request = HttpContext.Current.Request;
            var response = HttpContext.Current.Response;

            if (request.Cookies[CookyName] != null)
            {
                HttpCookie myCookie = new HttpCookie(CookyName);
                myCookie.Expires = DateTime.Now.AddDays(-1d);
                response.Cookies.Add(myCookie);
            }
        }

        public string readCookies(string CookyName)
        {
            var request = HttpContext.Current.Request;
            //  var response = HttpContext.Current.Response;


            if (request.Cookies[CookyName] != null)
            {
                return request.Cookies[CookyName].ToString();
            }
            else
                return "";
        }
    }
}
