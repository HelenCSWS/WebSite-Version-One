using CSWSWEB.CSWSBAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class ReSetAccountController : ApiController
    {
        /// <summary>
        /// Check if Account expired
        /// </summary>
        /// <param name="guid"></param>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        public HttpResponseMessage getAccountInfo(string guid)
        {
            SignAccountBAL saBAL = new SignAccountBAL();

            int result = saBAL.getAccountExpiration(guid);
            return Request.CreateResponse(HttpStatusCode.OK, result); ;
        }

        
        /// <summary>
        /// Reset password
        /// </summary>
        /// <param name="submitForm"></param>
        /// <returns></returns>
        
        public HttpResponseMessage Post(FormDataCollection submitForm)
        {
            //try
            //{
            SignAccountBAL saBAL = new SignAccountBAL();

            saBAL.resetUserPassword(submitForm.Get("password"), submitForm.Get("reset_id"));


            return Request.CreateResponse(HttpStatusCode.OK, 1);

            //}
            //catch (System.Exception e)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            //}

        }
    }
}
