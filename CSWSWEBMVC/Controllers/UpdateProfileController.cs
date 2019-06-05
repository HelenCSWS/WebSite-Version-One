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
    public class UpdateProfileController : ApiController
    {
        public HttpResponseMessage Post(FormDataCollection submitForm)
        {
            //try
            //{
            SignAccountBAL saBAL = new SignAccountBAL();

            int index_id = Int32.Parse(submitForm.Get("index_id"));
            string userid =submitForm.Get("user_id");

            
            int result =1;
            if (index_id == 1)//email
                result = saBAL.updateEmailByUserId(userid, submitForm.Get("email"), submitForm.Get("password"));
                

            else if (index_id == 2)
                result = saBAL.updatePasswordByUserId(userid, submitForm.Get("old_password"), submitForm.Get("new_password"));
          
            return Request.CreateResponse(HttpStatusCode.OK, result);

          }

        public string GetEmailByUserId(string id)
        {
            SignAccountBAL saBAL = new SignAccountBAL();

            // int result = saBAL.getProfil(guid);
            return saBAL.getEmailByUserid(id);
        }


     }
    
}
