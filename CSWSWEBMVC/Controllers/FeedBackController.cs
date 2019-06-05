using CSWS_Conponent;
using CSWSWEB.CSWSBAL;
using CSWSWEB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class FeedBackController : ApiController
    {
        public HttpResponseMessage Post([FromBody]FeedBack feedback)
        {
           try
           {

               CSWS_Utility cswsConp = new CSWS_Utility();
               cswsConp.SetCulture(feedback.culture_code);

               NewsLetterBAL nlBAL = new NewsLetterBAL();

               int result = nlBAL.saveFeedBack(feedback.visitorName, feedback.emailAddress, feedback.comments, feedback.isSubscribe, feedback.culture_code);
              // int result=feedback.AddFeedBack();
               return Request.CreateResponse(HttpStatusCode.OK, result);
           
           }
           catch (System.Exception e)
           {
               return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
           }

        }

    }
}
