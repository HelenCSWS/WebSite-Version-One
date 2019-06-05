using CSWS_Conponent;
using CSWSWEB.DataAccesse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CSWSWEBResources;
using System.Threading;

namespace CSWSWEB.CSWSBAL
{
    public class ShareGalleryBAL 
    {
        public class ShareGalleryData
        {
            public int shareid { get; set; }
            public string enterDate { get; set; }

            public string visitorName { get; set; }
            public string emailAddress { get; set; }

            public string rcpName { get; set; }
            public string rcpemailAddress { get; set; }


            public string comments { get; set; }
            public string link { get; set; }

            public string culture { get; set; }

            public int isSubscribe { get; set; }

            public string gRecaptchaResponse { get; set; }

            public string share_base { get; set; }
            public string share_info { get; set; }

            /*
             lang_id: 1 Eng; 2 Fren; 3 T Chin
             */
            public int lang_id { get; set; }

            public ShareGalleryData() { }

            public ShareGalleryData(string vName, string eAddress, string rName, string rcpEmail, string sComments, int isSub, string gResponse,string sBase,string sInfo, string sCulture)
            {
                visitorName = vName;
                emailAddress = eAddress;
                rcpName = rName;
                rcpemailAddress = rcpEmail;
                comments = sComments;
                isSubscribe = isSub;
                gRecaptchaResponse = gResponse;
               
                share_base = sBase;
                share_info = sInfo;
                culture = sCulture;
            }
        }


        /*15741777 yearmonth*/
        private string GetSharLink(string sharebase, string share_info)
        {
            string sharelink = "";
            
            int shareyear = Convert.ToInt32(sharebase.Substring(0, 4)) - CSWSConstants.SHARE_YEAR_BASE;
            int sharemonth = Convert.ToInt32(sharebase.Substring(4, 4)) - CSWSConstants.SHARE_MONTH_BASE;

            sharelink = shareyear.ToString() + "|" + sharemonth.ToString() + "|" + share_info;
            return sharelink;
        }

        public bool isRechaptcahValid(string gRecaptchaResponse)
        {
            reCaptcha objReChaptcha = new reCaptcha();

            return objReChaptcha.Validate(gRecaptchaResponse);
      }

        public int AddShareGallery(ShareGalleryData shd)
        {          
            try
            {
                if (this.isRechaptcahValid(shd.gRecaptchaResponse))
                {
                    ShareGalleryDAL shareDal = new ShareGalleryDAL();

                    shd.link = GetSharLink(shd.share_base, shd.share_info);
                    if (shareDal.AddShareInfo(shd) == 1)
                    {
                        SendingShare(shd);
                        return 1;
                    }
                     
                    
                    else
                        return 0;
                }
                else
                    return 100; //recaptcha not passed
                
            }
            catch
            {
               return 1;
            }
        }
  
        public void SendingShare(ShareGalleryData shd)
        {
            string emailSubject = CSWSWEBResources.Resource.SHARE_EMAIL_SUBJECT;
            string emailHtmlBody = CSWSConstants.EMAIL_HTML_BODY;

            //  // 0: sender message; 1: reciver name; 2: sender name; 3: art title
            string senderMsg = String.Format(CSWSWEBResources.Resource.EMAIL_SHARE_SENDDER_MSG, shd.rcpName, shd.visitorName, shd.share_info);
            if ((shd.comments).Trim().Length != 0)
            {
                senderMsg = shd.comments;
            }

            string culture = Thread.CurrentThread.CurrentCulture.Name.ToLower();
            //  // 0: sender message; 1: Art title; 2: culsture; 3: image id; 4: sender; 5 year
            string htmlContent = String.Format(CSWSWEBResources.Resource.EMAIL_SHARE_CONTENT, senderMsg, shd.share_info, culture, shd.share_base, shd.visitorName,DateTime.Now.Year.ToString());
      
            emailHtmlBody =String.Format(emailHtmlBody,htmlContent);

            CSWSEmail objEmail = new CSWSEmail(emailSubject,shd.rcpName, shd.rcpemailAddress,emailHtmlBody);
            objEmail.SendEmail();
            
        }
     
    }
}