using CSWSWEB.CSWSBAL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class UsersController : ApiController
    {
        public HttpResponseMessage GetUsers(int id)
        {
        
              /*statusid: -1 all; 0 not actived; 1 actived; 2 approved*/
                     
            AdminUserBAL userBal = new AdminUserBAL();
            ArrayList users = userBal.getUsers(id);

            //IEnumerable<ArrayList> dtList = null;

            //dtList = users.AsEnumerable();

            return Request.CreateResponse(HttpStatusCode.OK, users);

        }

        public HttpResponseMessage Post(FormDataCollection submitForm)
        {
            //try
            //{
            AdminUserBAL adminBAL = new AdminUserBAL();

            //string result = adminBAL.checkUser(submitForm.Get("username"), submitForm.Get("password"));

            string userids = submitForm.Get("activeids");
            string activeTag = submitForm.Get("activeTag");
            bool isRevoke=false;
            if (activeTag == "1")
                isRevoke = true;

            bool retVal = adminBAL.activeUsers(submitForm.Get("activeids"), isRevoke);
            
            int result = 0;
            return Request.CreateResponse(HttpStatusCode.OK, result);
            //}
            //catch (System.Exception e)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            //}
        }

    }
}
