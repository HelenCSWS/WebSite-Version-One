using CSWS_Conponent;
using CSWSWEB.DataAccesse;
using System;

namespace CSWSWEB.CSWSBAL
{
    public class NewsLetterBAL
    {
        public int saveNewsLetter(string vstName, string emailAddress, string culture )
        {
            NewsLetterDAL nlDal = new NewsLetterDAL();

            int retVal = nlDal.AddNewsLetter(vstName, emailAddress, culture);

            if (retVal == 1)
                SendingEmailToCSWS(vstName, emailAddress);

            return retVal;
        }

        public int saveFeedBack(string visitorName, string emailAddress, string comments, int isSubscribe,string culture)
        {
            NewsLetterDAL nlDal = new NewsLetterDAL();

            int retVal = nlDal.AddFeedBack(visitorName, emailAddress, comments, isSubscribe,culture);

            if (retVal == 1)
                retVal = SendingEmailToCSWS(visitorName, emailAddress, true,comments,isSubscribe);

            retVal = 1; // need to remove when release
            return retVal;
        }

        public int SendingEmailToCSWS(string vstName, string emailAddress,bool isFeedBack=false, string comments ="", int isSubscriber=0)
        {

            string emailSubject = CSWSConstants.EMAIL_SUBJECT_NEWSLETERR_SUBSCRIBER;

            string emailHtmlBody = CSWSConstants.EMAIL_HTML_BODY;

            string txtRow1 = "Information of Newsletter subscriber: " + "<BR><BR>";

            string txtSubName = "Name:  " + vstName + "<BR><BR>";

            string txtEmail = "Email:   " + emailAddress + "<BR><BR>";

            string txtDate = "Date:   " + DateTime.Now + "<BR><BR><BR>"; //.ToString("MM-dd-yyyy")

            string txtComment = "";
            
            string txtSubscriber = "";

            string htmlContent = txtRow1 + txtSubName + txtEmail + txtDate + CSWSConstants.CSWS_NAME; 

             if(isFeedBack)
             {
                 emailSubject = CSWSConstants.EMAIL_SUBJECT_FEEDBACK_SUBSCRIBER;
                 txtRow1 ="Information of the Feedback subscriber: " + "<BR><BR>";
                 txtComment = "Comments:   " + comments + "<BR><BR>";

                 txtSubscriber ="Not a Newsletter subscriber."+ "<BR><BR>";
                 
                 if(isSubscriber==1)
                     txtSubscriber = "Newsletter subscriber." + "<BR><BR>";

                 htmlContent = txtRow1 + txtSubName + txtEmail + txtComment + txtSubscriber + txtDate + CSWSConstants.CSWS_NAME; 
             }

      //       emailHtmlBody = emailHtmlBody.Replace("emailcontent", htmlContent);

            emailHtmlBody = String.Format(emailHtmlBody, htmlContent);
            CSWSEmail objEmail = new CSWSEmail();

            objEmail.receptionName = CSWSConstants.CSWS_NAME;
            objEmail.to_emailAddresses =CSWSConstants.EMAIL_ADDRESS_HELEN;
            objEmail.to_emailAddressCCs =CSWSConstants.EMAIL_ADDRESS_CHRIS+";"+CSWSConstants.EMAIL_ADDRESS_GARRY;
       //     objEmail.to_emailAddressBCCs = "";

            objEmail.fromName = CSWSConstants.CSWS_NAME;
            objEmail.from_emailAddress = CSWSConstants.CSWS_EMAIL_SENDER;// only csws sender is authrized 

            objEmail.emailSubject = emailSubject;
            objEmail.emailContent = emailHtmlBody;

            return objEmail.SendEmail();

        }
    }
}