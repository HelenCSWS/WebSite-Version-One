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


        public IEnumerable GetQuoteIdGuid([FromUri]Quote quote)
        {
            QuoteBAL qtBal = new QuoteBAL();

            if (quote.search_index >0)
                return qtBal.getEntrySelectQuotesGuid(quote.quote_type, quote.career, quote.pub_country, quote.keyword, quote.search_index);
            else
                return qtBal.getWebSelectQuotesGuid(quote.quote_type, quote.author, quote.career, quote.publication, quote.genre, quote.pub_country);   
        }

        [HttpPost]
        //    public async Task<IHttpActionResult> Post()
        public HttpResponseMessage Post()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            try
            {
                //postedContext.Request.Form["hidServiceType"];
                var httpRequest = HttpContext.Current.Request;
                //var httpRequest = System.Web.HttpContext.Current.Request; 
                var qtid = httpRequest.Form["quote_id"];
                Quote qtData = new Quote();
      
                qtData.prefix = httpRequest.Form["s_prefix"];
                qtData.suffix = httpRequest.Form["s_suffix"];          
                qtData.fist_name =httpRequest.Form["first_name"];
                qtData.middle_name = httpRequest.Form["middle_name"];
                qtData.last_name = httpRequest.Form["last_name"];
                qtData.birth_date = httpRequest.Form["birth_date"];
                qtData.birth_city = httpRequest.Form["s_bCity"];
                qtData.birth_country = httpRequest.Form["s_bCountry"];
                qtData.death_city = httpRequest.Form["s_dCity"];
                qtData.death_country = httpRequest.Form["s_dCountry"];
                qtData.death_date = httpRequest.Form["death_date"];
                qtData.career = httpRequest.Form["input_career"];
                qtData.notable_work = httpRequest.Form["nt_work"];
                qtData.pub_country = httpRequest.Form["s_pCountry"];
                qtData.publication = httpRequest.Form["publication"];
                qtData.pub_date = httpRequest.Form["dt_Publication"];
                qtData.quote_type = httpRequest.Form["s_qType"];
                qtData.genre = httpRequest.Form["s_genre"];
                qtData.quote = httpRequest.Form["quote"];
                qtData.portrail_img = httpRequest.Form["lg_pt_fname"];
                string old_lg_img = httpRequest.Form["org_lg_pt_fname"];
                string lg_imgChanged = httpRequest.Form["lg_imageChanged"];

                string tempVal = httpRequest.Form["quote_id"];
                if (tempVal == "")
                    tempVal = "0";
                qtData.quote_id =  Int32.Parse(tempVal);
                tempVal = httpRequest.Form["cursor"];
                if (tempVal == "")
                    tempVal = "0";
                qtData.cursor_id = Int32.Parse(tempVal);

                string StoragePath = HttpContext.Current.Server.MapPath("~/images/quote/");        
           
                QuoteBAL qtBal = new QuoteBAL();

                string file_quote_id = qtData.quote_id.ToString();

                string saved_qtid = qtBal.SaveQuote(qtData).ToString();
                if (file_quote_id == "0")
                    file_quote_id = saved_qtid.ToString();
                    
                string fileName = "";
                string org_lg_img = qtData.large_img;

                string imgFileLink = "";

                var fileLocation = "";
                if (httpRequest.Files.Count > 0)
                {
                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];

                        fileName = postedFile.FileName;
                        if (fileName != "")
                        {
                            imgFileLink = file_quote_id + "_" + qtData.portrail_img;
                            if (old_lg_img != "")// if old_lg_img is not empty, update status and have old image,need to be deleted first
                            {
                                File.Delete(Path.Combine(StoragePath, old_lg_img));
                            }

                            //delete the same file name
                            File.Delete(Path.Combine(StoragePath, imgFileLink));

                            fileLocation = StoragePath + imgFileLink;
                            postedFile.SaveAs(fileLocation);

                        }
                        else //empty file control
                        {
                            if (qtData.quote_id > 0)//update
                            {
                                if (lg_imgChanged == "1")// old image has been deleted from client side
                                {
                                    if (old_lg_img != "")//get old image file and deleted
                                    {
                                        File.Delete(Path.Combine(StoragePath, old_lg_img));
                                        imgFileLink = "";
                                    }
                                }
                                else
                                {
                                    imgFileLink = qtData.portrail_img;
                                }
                            }
                        }
                    }//foreach (string file in httpRequest.Files)
                }

                qtBal.updateQtImg(Int32.Parse(file_quote_id), imgFileLink);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
              //  return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
                return Request.CreateResponse(HttpStatusCode.OK,20);
            }
        }
     
    }
}
