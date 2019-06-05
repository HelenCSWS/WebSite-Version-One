using CSWSWEB.CSWSBAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class AccountSessionController : ApiController
    {
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetSessionStatus(string guid)
        {
            SignAccountBAL saBAL = new SignAccountBAL();

            int result = saBAL.getSessionStatus(guid);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}
