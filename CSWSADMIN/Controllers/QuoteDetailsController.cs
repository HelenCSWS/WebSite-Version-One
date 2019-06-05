using CSWSWEB.CSWSBAL;
using CSWSWEB.DataAccesse;
using CSWSWEB.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class QuoteDetailsController : ApiController
    {
        public QuoteSelector GetSelectors(int id =0)
        {
            QuoteBAL qtBal = new QuoteBAL();
            if (id == 0)//for entry
                return qtBal.getQuoteSelectors();
            else// for website
                return qtBal.getSearchSelectors();
        }

        public QuoteSelector GetSingleSelector(string selectorName)
        {
            QuoteBAL qtBal = new QuoteBAL();
            return qtBal.getSingleSelector(selectorName);
        }


        /*id*/
        public QuoteSelector GetCities(int id, string country)
        {
            QuoteBAL qtBal = new QuoteBAL();
            return qtBal.getQuoteCities(country);
        }
     }

}
