using CSWS_Conponent;
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
    public class CheckUserController : ApiController
    {

    
        public HttpResponseMessage Post(FormDataCollection submitForm)
        {
            //try
            //{

            CSWS_Utility cswsConp = new CSWS_Utility();
            cswsConp.SetCulture(submitForm.Get("culture_code"));

            SignAccountBAL saBAL = new SignAccountBAL();

            string result = saBAL.checkUser(submitForm.Get("email"), submitForm.Get("password"));

            return Request.CreateResponse(HttpStatusCode.OK, result);


            //}
            //catch (System.Exception e)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            //}

        }

    }
}
