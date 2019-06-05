
using CSWS_Conponent;
using CSWSWEB.CSWSBAL;
using CSWSWEB.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class QuotesController : ApiController
    {
        //public IEnumerable GetTodayQuote(int id)
        //{
        //    QuoteBAL qtBal = new QuoteBAL();
        //    return qtBal.getQuote(0, id);
        //}

        /// <summary>
        /// Get search quotes ids, they are saved in an table by guid
        /// </summary>
        /// <param name="guid"></param>
        /// <returns></returns>
        public IEnumerable GetSelectedQuoteIDs(string guid)
        {
            QuoteBAL qtBal = new QuoteBAL();
            string qtids= qtBal.getSelectedQuoteIdsByGuid(guid);

            return qtids;
          
        }

        /// <summary>
        /// get quote details from quotes table
        /// </summary>
        /// <param name="qtCursor">0:current quote of the quote_id
        ///                        1:next quote of the quote_id
        ///                        2:previous quote of the quote_id
        /// </param>
        /// <param name="quote_id">0:get today's quote</param>
        /// <returns>Datatable of the select results: only return one quote</returns>
        public IEnumerable GetQuote(int id, int cursor_id)
        {
            QuoteBAL qtBal = new QuoteBAL();
            return qtBal.getQuote(cursor_id, id);
        }

    

        public IEnumerable GetQuoteByCulture(int id, int cursor_id,string culture)
        {
            CSWS_Utility cswsConp = new CSWS_Utility();
            cswsConp.SetCulture(culture);

            QuoteBAL qtBal = new QuoteBAL();
            return qtBal.getQuote(cursor_id, id);
        }

        /// <summary>
        /// Delete the quote
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public HttpResponseMessage DeleteQuote(int id)
        {
            try
            {
                QuoteBAL qtBal = new QuoteBAL();
                qtBal.DeleteQuote(id);

                return Request.CreateResponse(HttpStatusCode.OK);
            }

            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
         }


        /// <summary>
        /// saved searched quote ids to an table, unique id is guid id
        /// </summary>
        /// <param name="quote"></param>
        /// <returns></returns>
        public IEnumerable GetQuoteIdGuid([FromUri]Quote quote)
        {
            QuoteBAL qtBal = new QuoteBAL();

            if (quote.search_index >0)
                return qtBal.getEntrySelectQuotesGuid(quote.quote_type, quote.career, quote.pub_country, quote.keyword, quote.search_index);
            else
                return qtBal.getWebSelectQuotesGuid(quote.quote_type, quote.author, quote.career, quote.publication, quote.genre, quote.pub_country);   
        }

        /// <summary>
        ///  
        /// </summary>
        /// <returns></returns>
   
    }
}
