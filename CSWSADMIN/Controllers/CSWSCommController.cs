using CSWSWEB.CSWSBAL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class CSWSCommController : ApiController
    {
        public ArrayList GetSingleSelector(int id, string selectorName)
        {
           CSWSCommBAL cmBAL = new CSWSCommBAL();
           return cmBAL.getSelectorValues(id,selectorName);
        }


    }
}
