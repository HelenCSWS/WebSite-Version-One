using CSWS_Conponent;
using CSWSWEB.CSWSDataAccesse;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CSWSWEB.CSWSBAL
{
    public class AdminUserBAL
    {
        public string checkUser(string username, string userpass = "")
        {
            AdminUserDAL SADAL = new AdminUserDAL();


            string result = SADAL.checkUser(username, userpass);
            return result;
        }


        public ArrayList getUsers(int statusid)
        {
            AdminUserDAL userDAL = new AdminUserDAL();
            DataTable result = userDAL.getUsers(statusid);


            ArrayList list = new ArrayList();
            foreach (DataRow dr in result.Rows) // dt- DataTable
            {
                list.Add(dr.ItemArray);
            }

             return list;
        }

        public bool activeUsers(string userids, bool isRevoke)
        {
            List<string> ids = userids.Split(',').ToList<string>();
            
            AdminUserDAL userDAL = new AdminUserDAL();

             string userid="";

             string retVal = "";

            foreach (string activeid in ids)
            {
                userid = activeid;

                if(isRevoke)
                    retVal = userDAL.RevokeUser(userid);
                else 
                {
                    retVal = userDAL.activeUser(userid);

                    if(retVal!="")
                    {
                        List<string>  infors = retVal.Split('|').ToList<string>();
                        string name = infors[0];
                        string email = infors[1];
                       SendingConfirm(name, email, "");
                        //sendout email
                    }
                }
            }
            return true;
        }


        // active account email
        public int SendingConfirm( string first_name,string email,string active_id)
        {

            string emailAddressTo = email;
            string emailSubject = "Your ChristopherStewart.com Industry Account Access has been Approved";

            string emailHtmlBody = "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml'><head><meta charset='utf-8' /><title></title></head><body style='font-family:verdana; font-size:13px;'>emailcontent</body></html>";
         //   string hyperlinkText = "http://www.christopherstewart.com/signin.html";   //realase
            /* string hyperlinkText = "https://industry.christopherstewart.com/activeaccount.html?key=" + active_id;   //realase*/


            /* string hyperlinkText = "http://40.124.47.161:8080/activeaccount.html?key=" + active_id; //debug*/
            CSWS_Utility Utility = new CSWS_Utility();

            string fristName = Utility.CapitalizeFirstLetter(first_name);

            string txtRCPName = "Hi " + fristName + ",";

            string txtcontent = "\r\n\r\nWe are pleased to let you know that access to your industry account on ChristopherStewart.com has been approved." +

                                 "\r\n\r\nThe all-new Industry features of ChristopherStewart.com are just beginning to be launched, and as of now you have access to  the Christopher Stewart Portfolio with wholesale prices available to you." +

                                 "\r\n\r\nAs we continue our development of the industry access you will find more features, content, and applications to support you and your business. As these enhancements are released you will be notified by email of their availability." +

                                 "\r\n\r\nYou can now sign into your account on the link below." +

                                 "\r\n\r\nhttp://www.christopherstewart.com/signin.html" +

                                 "\r\n\r\nIf the link is not clickable, you can copy and paste the address into your Web browser's Address window.";


            string txtSender = "\r\n\r\n\r\nThanks,\r\n\r\nThe Christopher Stewart Team\r\n********************";

            string emailcontent = txtRCPName + txtcontent + txtSender;

            //string copyright = "\r\n\r\n\r\nCopyright Notice - The attached image is the sole property of Christopher Stewart Wine & Spirits. The attached image may be used for personal use only and may not be used for a commercial purpose.";
          //  string copyright = "\r\n\r\nIf you did not request to register for a ChristopherStewart.com account, someone has mistakenly entered your email address when registering. Please ignore this message. To protect your privacy, we will only send this information to the email address on file for this account.";

            string textbody = emailcontent;// +copyright;

            // string htmlcopyright = "<font size='2'>" + copyright + "</font>";
        //    string htmlcopyright = copyright;

            string htmlContent = emailcontent;// +htmlcopyright;
            htmlContent = htmlContent.Replace("\r\n", "<BR>");

            emailHtmlBody = emailHtmlBody.Replace("emailcontent", htmlContent);


            CSWSEmail objEmail = new CSWSEmail();

            objEmail.receptionName = first_name;
            objEmail.to_emailAddresses = email;

            objEmail.fromName = "Christopher Stewart Wine And Spirits";
            objEmail.from_emailAddress = "christopherstewart@christopherstewart.com";// only sender is authrized 

            objEmail.emailSubject = emailSubject;
            objEmail.emailContent = emailHtmlBody;

            return objEmail.SendEmail();
        }

    }
}