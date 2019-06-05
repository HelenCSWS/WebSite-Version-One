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
    public class AdminUserController : ApiController
    {
        public HttpResponseMessage Post(FormDataCollection submitForm)
        {
            //try
            //{
            AdminUserBAL adminBAL = new AdminUserBAL();

            string result = adminBAL.checkUser(submitForm.Get("username"), submitForm.Get("password"));

            return Request.CreateResponse(HttpStatusCode.OK, result);


            //}
            //catch (System.Exception e)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            //}

        }

        public IEnumerable GetUsers(int statusId)
        {
            /*
             statusId = 0 all; 1 actived; 2 not actived
             
             */
            AdminUserBAL userBal = new AdminUserBAL();
            ArrayList users = userBal.getUsers(statusId);

         //   IEnumerable<DataRow> dtList = null;

         //   dtList = users.AsEnumerable();

            return users;

        }
    }
}
