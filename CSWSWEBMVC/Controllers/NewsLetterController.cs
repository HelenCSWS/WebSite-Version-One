using CSWSWEB.CSWSBAL;
using CSWSWEB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CSWS_Conponent;

namespace CSWSWEB.Controllers
{
    public class NewsLetterController : ApiController
    {
       
        public HttpResponseMessage Post([FromBody]NewsLetter newsletter)
        {
            try
            {
               
                CSWS_Utility cswsConp = new CSWS_Utility();
                cswsConp.SetCulture(newsletter.culture_code);

                NewsLetterBAL nlBAL = new NewsLetterBAL();
                int result = nlBAL.saveNewsLetter(newsletter.visitorName, newsletter.emailAddress, newsletter.culture_code);
                
             
                return Request.CreateResponse(HttpStatusCode.OK, result);

            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

       
    }
}
