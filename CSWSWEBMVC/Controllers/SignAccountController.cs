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
    public class SignAccountController : ApiController
    {

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpGet]
        public HttpResponseMessage activeAccount(string guid)
        {
            SignAccountBAL saBAL = new SignAccountBAL();

            string result = saBAL.activeAccount(guid);
          return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        /*
        // 1: user_name
        // 2: email address
        // */
        [System.Web.Http.HttpGet]/*id*/
        public HttpResponseMessage checkDuplicateEmail(string email)
        {
            SignAccountBAL saBAL = new SignAccountBAL();
                    var result = saBAL.checkDuplicateEmail(email);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
      


        public HttpResponseMessage Post(FormDataCollection submitForm)
        {
            //try
            //{
            CSWS_Utility cswsConp = new CSWS_Utility();
            cswsConp.SetCulture(submitForm.Get("culture_code"));

            SignAccountBAL saBAL = new SignAccountBAL();

            int result = saBAL.saveAccount(submitForm.Get("first_name"), submitForm.Get("last_name"), submitForm.Get("company_name"), submitForm.Get("city"), submitForm.Get("country"), submitForm.Get("email"), submitForm.Get("password"), submitForm.Get("user_type_id"));


            return Request.CreateResponse(HttpStatusCode.OK, result);

            //}
            //catch (System.Exception e)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            //}

        }
    }
}
