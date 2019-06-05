// using CSWSWEB.BLLUtility;
using CSWSWEB.CSWSDataAccesse;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using CSWS_Conponent;
using System.Threading;

namespace CSWSWEB.CSWSBAL
{
    public class SignAccountBAL
    {
        public int saveAccount(string first_name, string last_name, string company_name, string city, string country, string email, string password, string user_type)
        {

            string user_id = getUserByEmail(email);

            if(user_id=="-1")
            {
                return -1;
            }
            else
            {
                SignAccountDAL SADAL = new SignAccountDAL();
                string active_id = Guid.NewGuid().ToString();
                if (SADAL.saveAccount(active_id, user_id, first_name, last_name, company_name, city, country, email, password, user_type) == 1)
                {
                    SendingAccountActiveEmail(active_id, email, first_name); //realease
                     
                    return 1;
                }  
                else
                {
                    return 100;
                }
            }
            
        }

        public string getUserByEmail(string email)
        {
            SignAccountDAL saDAL = new SignAccountDAL();
            string user_id = saDAL.getUserByEmail(email).ToString();

            return user_id;
        }


        // active account email
        public void SendingAccountActiveEmail(string active_id, string email, string first_name)
        {
            string emailSubject = CSWSWEBResources.Resource.ACTIVE_ACCOUNT_EMAIL_SUBJECT;
            string emailHtmlBody = CSWSConstants.EMAIL_HTML_BODY;

            string culture = Thread.CurrentThread.CurrentCulture.Name.ToLower();

            //0: first_name, 1: culture;  2: active_id
            string htmlContent = String.Format(CSWSWEBResources.Resource.ACCOUNT_ACTIVE_EMAIL_CONTENT, first_name,culture, active_id);

            emailHtmlBody = String.Format(emailHtmlBody, htmlContent);
            CSWSEmail objEmail = new CSWSEmail(emailSubject,first_name,email,emailHtmlBody);
            objEmail.SendEmail();

        }


        public void SendingReset(string active_id, string email)
        {
            string emailSubject = CSWSWEBResources.Resource.RESET_PSWD_EMAIL_SUBJECT;
            string emailHtmlBody = CSWSConstants.EMAIL_HTML_BODY;

            string culture = Thread.CurrentThread.CurrentCulture.Name.ToLower();

            //0:culture; 1: active_id; 2: current year
            string htmlContent = String.Format(CSWSWEBResources.Resource.RESET_PSWD_EMAIL_CONTENT,culture,active_id, DateTime.Now.Year.ToString());

            emailHtmlBody = String.Format(emailHtmlBody, htmlContent);
            CSWSEmail objEmail = new CSWSEmail(emailSubject, "", email, emailHtmlBody);
            objEmail.SendEmail();
         
        }

        public int SendingEmailToCSWS(DataTable userDT)
        {
            string vstName = userDT.Rows[0]["fname"].ToString();
            string emailAddress = userDT.Rows[0]["email"].ToString();
            string company = userDT.Rows[0]["company"].ToString();
            string city = userDT.Rows[0]["city"].ToString();
            string country = userDT.Rows[0]["country"].ToString();
            string industry_type = userDT.Rows[0]["industry_type"].ToString();
          

            string emailSubject = CSWSConstants.EMAIL_SUBJECT_SIGNUP_USER;

            string emailHtmlBody = CSWSConstants.EMAIL_HTML_BODY;

            string txtRow1 = "Information of new sign up user: " + "\r\n\r\n";
            string txtSubName = "Name:          " + vstName + "\r\n\r\n";
            string txtEmail =   "Email:         " + emailAddress + "\r\n\r\n";
            string txtCompany = "Company:       " + company + "\r\n\r\n";
            string txtIndType = "Industry Type: " + industry_type + "\r\n\r\n";
            string txtCity =    "City:          " + city + "\r\n\r\n";
            string txtCountry = "Country:       " + country + "\r\n\r\n";          
            string txtDate =    "Active Date:   " + DateTime.Now + "\r\n\r\n\r\n"; //.ToString("MM-dd-yyyy")

            string htmlContent = txtRow1 + txtSubName + txtEmail + txtCompany + txtIndType + txtCity + txtCountry + txtDate + CSWSConstants.CSWS_NAME;

            htmlContent = htmlContent.Replace("\r\n", "<BR>");

            emailHtmlBody = String.Format(emailHtmlBody, htmlContent);
            CSWSEmail objEmail = new CSWSEmail();

            objEmail.receptionName = CSWSConstants.CSWS_NAME;
            objEmail.to_emailAddresses = CSWSConstants.EMAIL_ADDRESS_HELEN;

            objEmail.fromName = CSWSConstants.CSWS_NAME;
            objEmail.from_emailAddress = CSWSConstants.CSWS_EMAIL_SENDER;// only csws sender is authrized 

            objEmail.emailSubject = emailSubject;
            objEmail.emailContent = emailHtmlBody;

            return objEmail.SendEmail();
        }

        public string activeAccount(string active_id)
        {
            SignAccountDAL SADAL = new SignAccountDAL();
            string user_id = SADAL.activeAccount(active_id);
            int ret = 0;
            string fname="";
            if (user_id == "0")
                return "-1";
            else
            {
                DataTable userDT = SADAL.getUserInfoByUserId(user_id);
               if (CSWSConstants.IS_RELEASE)
                {
                    ret = SendingEmailToCSWS(userDT);
                }
                fname = SADAL.getFullNameByUserId(user_id);
                return fname;
            }
        }

        public string checkUser(string email, string userpass="")
        {
            SignAccountDAL SADAL = new SignAccountDAL();
            if (userpass == null)
                userpass = "";

            string result= SADAL.checkUser(email, userpass);

            if(result=="3" && userpass=="")
            {
                string guid = Guid.NewGuid().ToString();
                SADAL.getResetId(email, guid);

                SendingReset(guid, email);   //release
            }

            if(result=="3" && userpass!="")//signed in
            {
                string session_id = Guid.NewGuid().ToString();
                SADAL.setSessionToUser(email, session_id);
                result = session_id;
            }
            return result;
        }

        public void resetUserPassword(string password,string reset_id)
        {
            SignAccountDAL SADAL = new SignAccountDAL();

             SADAL.resetUserPassword(password, reset_id);
        }


        public int getAccountExpiration(string active_id)
        {
            SignAccountDAL SADAL = new SignAccountDAL();
            return SADAL.getAccountExpiration(active_id);
        }


        public int getSessionStatus(string session_id)
        {
            SignAccountDAL SADAL = new SignAccountDAL();
            return SADAL.getSessionStatus(session_id);
        }

        public IEnumerable getProfil(string session_id)
        {
            SignAccountDAL SADAL = new SignAccountDAL();

            IEnumerable<DataRow> dtList = null;

            DataTable profileTable = SADAL.getProfile(session_id);
            dtList = profileTable.AsEnumerable();

            return dtList;
        }

        public void updateProfile(string first_name, string last_name, string username, string country, string city, string phone, string postalcode, string aboutme, string pImg, string user_id)
        {
            SignAccountDAL SADAL = new SignAccountDAL();
            SADAL.updateProfile(first_name, last_name, username, country, city,phone, postalcode, aboutme,pImg, user_id);
        }

        public int checkUsername(string userid, string username)
        {
            SignAccountDAL saDAL = new SignAccountDAL();
            return saDAL.checkUsername(userid,username);
        }

        public int checkPasswordByUserId(string user_id, string password)
        {
            SignAccountDAL saDAL = new SignAccountDAL();
            return saDAL.checkPasswordByUserid(user_id, password);
           
        }

        public int checkDuplicateEmailByUser(string user_id, string email)
        {
            SignAccountDAL saDAL = new SignAccountDAL();
            return saDAL.checkDuplicateEmailByUser(user_id, email);

        }

        public int checkDuplicateEmail(string email)
        {
            SignAccountDAL saDAL = new SignAccountDAL();
            return saDAL.checkDuplicateEmail(email);

        }

        public int updatePasswordByUserId(string user_id, string old_password, string new_password)
        {
             SignAccountDAL saDAL = new SignAccountDAL();
             if (this.checkPasswordByUserId(user_id, old_password) == 1)// password correct
             {
                 saDAL.resetPasswordByUserid(user_id, new_password);
                 return 1;
             }
             else//password wrong
                 return 0;
        }
        public int updateEmailByUserId(string user_id, string email, string password)
        {
            SignAccountDAL saDAL = new SignAccountDAL();
            if (this.checkDuplicateEmailByUser(user_id, email) == 0)// no duplicate
            {
                if (this.checkPasswordByUserId(user_id, password) == 1) //password correct
                {
                    saDAL.resetEmailByUserid(user_id, email);
                    return 0;
                }
                else
                    return 2; // wrong password;

            }
            else //duplicate
                return 1; //.duplicate email
        }

        public string getEmailByUserid(string userid)
        {
            SignAccountDAL saDAL = new SignAccountDAL();
            return saDAL.getEmailByUserId(userid);
        }
    }
}