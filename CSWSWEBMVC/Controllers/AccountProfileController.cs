using CSWSWEB.CSWSBAL;
using System.Collections;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CSWSWEB.Controllers
{
    public class AccountProfileController : ApiController
    {
        [System.Web.Http.AcceptVerbs("GET", "POST")]

       // [System.Web.Http.HttpPost]
        //public HttpResponseMessage Post(FormDataCollection submitForm)
        //{
        //    try
        //    {
        //        SignAccountBAL saBAL = new SignAccountBAL();

        //        string aboutme = submitForm.Get("abounme");

        //        saBAL.updateProfile(submitForm.Get("first_name"), submitForm.Get("last_name"), submitForm.Get("username"), submitForm.Get("country"),
        //submitForm.Get("city"), submitForm.Get("phone"), submitForm.Get("postal_code"), submitForm.Get("aboutme"), submitForm.Get("user_id"));

        //        return Request.CreateResponse(HttpStatusCode.OK, 1);

        //    }
        //    catch (System.Exception e)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
        //    }

        //}

         public IEnumerable GetProfileInfo(string guid)
        {
            SignAccountBAL saBAL = new SignAccountBAL();

           // int result = saBAL.getProfil(guid);
            return  saBAL.getProfil(guid);
        }

         [System.Web.Http.HttpGet]
         public HttpResponseMessage checkUeserName(string userid,string username)
         {
             SignAccountBAL saBAL = new SignAccountBAL();

             int result = saBAL.checkUsername(userid,username);
             return Request.CreateResponse(HttpStatusCode.OK, result);
         }

         [System.Web.Http.HttpGet]
         public HttpResponseMessage checkUeserEmail(string userid, string email)
         {
             SignAccountBAL saBAL = new SignAccountBAL();

             int result = saBAL.checkDuplicateEmailByUser(userid, email);
             return Request.CreateResponse(HttpStatusCode.OK, result);
         }


         [HttpPost]
         //    public async Task<IHttpActionResult> Post()
         public HttpResponseMessage Post()
         {
             if (!Request.Content.IsMimeMultipartContent())
             {
                 throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
             }
             try
             {
                 //postedContext.Request.Form["hidServiceType"];
                 var httpRequest = HttpContext.Current.Request;
                 //var httpRequest = System.Web.HttpContext.Current.Request; 



                 var first_name = httpRequest.Form["first_name"];
                 var last_name = httpRequest.Form["last_name"];
                 var username = httpRequest.Form["username"];
                 var phone = httpRequest.Form["phone"];
                 var country = httpRequest.Form["country"];
                 var city = httpRequest.Form["city"];
                 var postal_code = httpRequest.Form["postal_code"];
                 var aboutme = httpRequest.Form["aboutme"];
                 var userid = httpRequest.Form["user_id"];
                 

                 var profile_img = httpRequest.Form["profile_image"];
                 string org_img = httpRequest.Form["org_img"];
                 string old_img = httpRequest.Form["old_image"];
                 if (old_img == null)
                     old_img = "";

                 string lg_imgChanged = httpRequest.Form["imageChanged"];

            

                 string StoragePath = HttpContext.Current.Server.MapPath("~/images/profile/");

              
                               
                 string fileName = "";
               

                 string imgFileLink = "";

                 var fileLocation = "";
                 int isImg = 0;
                 if (httpRequest.Files.Count > 0)
                 {
                     foreach (string file in httpRequest.Files)
                     {
                         var postedFile = httpRequest.Files[file];

                         fileName = postedFile.FileName;
                         if (fileName != "")
                         {
                             imgFileLink = userid + "_" + profile_img;
                             if (old_img != "")// if old_lg_img is not empty, update status and have old image,need to be deleted first
                             {
                                 File.Delete(Path.Combine(StoragePath, old_img));
                             }

                             //delete the same file name
                             File.Delete(Path.Combine(StoragePath, imgFileLink));

                             fileLocation = StoragePath + imgFileLink;
                             postedFile.SaveAs(fileLocation);
                             isImg = 1;

                       
                         }
                     }//foreach (string file in httpRequest.Files)
                 }

                 SignAccountBAL saBAL = new SignAccountBAL();
                 if (isImg == 0)
                     imgFileLink = org_img;
                 saBAL.updateProfile(first_name, last_name, username, country, city, phone, postal_code, aboutme, imgFileLink, userid);
                return Request.CreateResponse(HttpStatusCode.OK);
             }
             catch (System.Exception e)
             {
                 return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
             }
         }


    }

    
}
