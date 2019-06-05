using CSWS_Conponent;
using CSWSWEB.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class ShareGalleryController : ApiController
    {
        public HttpResponseMessage Post(FormDataCollection shareForm)
        {
            try
            {
                CSWS_Utility cswsConp = new CSWS_Utility();
                cswsConp.SetCulture(shareForm.Get("culture_code"));

                ShareGallery sharegallery = new ShareGallery();

                sharegallery.rcpName = shareForm.Get("rcpName");
                sharegallery.rcpemailAddress = shareForm.Get("rcpemailAddress");
                sharegallery.visitorName = shareForm.Get("visitorName");
                sharegallery.emailAddress = shareForm.Get("emailAddress");

                sharegallery.comments = shareForm.Get("comments");
                sharegallery.isSubscribe = Convert.ToInt32(shareForm.Get("isSubscribe"));
                sharegallery.gRecaptchaResponse = shareForm.Get("g-Recaptcha-Response");
                sharegallery.share_base = shareForm.Get("share_base");
                sharegallery.share_info = shareForm.Get("share_info");
                sharegallery.lang_id = Convert.ToInt32(shareForm.Get("lang_id"));
                sharegallery.culture = shareForm.Get("culture_code");

                int result = sharegallery.AddShareGallery();
                return Request.CreateResponse(HttpStatusCode.OK, result);

            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
            

        }
    }
}
