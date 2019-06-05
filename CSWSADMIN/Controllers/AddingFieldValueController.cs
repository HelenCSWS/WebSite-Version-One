using CSWSWEB.CSWSDataAccesse;
using CSWSWEB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class AddingFieldValueController : ApiController
    {
        public HttpResponseMessage Post([FromBody]AddingFieldValue addingField)
        {
            try
            {
                AddingFieldValueDAL addValDAL = new AddingFieldValueDAL();

                string result = addValDAL.AddValueToField(addingField.fieldIndex, addingField.fieldValue).ToString();

                
                return Request.CreateResponse(HttpStatusCode.OK, result);

            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

        }
    }
}
