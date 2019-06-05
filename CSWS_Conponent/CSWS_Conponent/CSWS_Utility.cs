using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Threading;
using System.Web;
using System.Web.Security;

namespace CSWS_Conponent
{
    public class CSWS_Utility
    {
        
        public string getFileNameSuffix(string filename)
        {
            string suffix = "";

            if (filename != "")
            {
                string[] fnames = filename.Split('.');
                suffix = fnames[1].ToString();
            }

            return suffix;
        }

        public string CapitalizeFirstLetter(string s)
        {
            if (String.IsNullOrEmpty(s))
                return s;
            if (s.Length == 1)
                return s.ToUpper();
            return s.Remove(1).ToUpper() + s.Substring(1);
        }

        public string CreateSalt(int size=9)
        {

            //Generate a cryptographic random number.
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buff = new byte[size];
            rng.GetBytes(buff);

            // Return a Base64 string representation of the random number.
            return Convert.ToBase64String(buff);
        }

        public string CreatePasswordHash(string pwd, string salt)
        {
            string saltAndPwd = String.Concat(pwd, salt);
            string hashedPwd =
                FormsAuthentication.HashPasswordForStoringInConfigFile( saltAndPwd, "sha1");
            return hashedPwd;
        }

        public string getSplitValue(string orgText,char[] spChar, int sIndex)
        {
            string retVal = "";

            string[] words = orgText.Split(spChar);

            if (words.Length - 1 < sIndex)
                return "";

            retVal = words[sIndex];
     

            return retVal;
        }

        public void CreateCookies(string CookyName, string CookieVal, double CookieExpiresd)
        {   
            var response = HttpContext.Current.Response;
            HttpCookie myCookie = new HttpCookie(CookyName);
            myCookie.Value = CookieVal;
            myCookie.Expires = DateTime.Now.AddDays(CookieExpiresd);
            response.Cookies.Add(myCookie);

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
                return request.Cookies[CookyName].Value.ToString();
            }
            else
                return "";
        }

        public void SetCulture(string lang)
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo(lang);
            Thread.CurrentThread.CurrentUICulture = new CultureInfo(lang);
        }

        public string getCurrentCulture()
        {
            return Thread.CurrentThread.CurrentCulture.Name;
        }

        public string getCountryCultureCode(string culture)
        {

            Dictionary<string, string> CountryCultureNames = new Dictionary<string, string>()
            {
                { "en-ca","en_ca" },{ "fr-ca","fr_ca" },{ "zh-hk","zh_hk" }
            };

            string cultureCode = CountryCultureNames[culture];

            return cultureCode;
        }
    }
}