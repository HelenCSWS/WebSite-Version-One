using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSWS_Conponent
{
    public static class CSWSConstants
    {
        public const bool IS_RELEASE = true;

        public const string COOKIE_TERRITORY_ID = "csws_pro"; // last 365
        public const string COOKIE_CURRENT_TERRITORY_ID = "csws_current_pro";  // last 1 days

        public const string CSWS_COOKIE_CSWS_DEF_CULTURE = "CSWS_culture";

        public const string COOKIE_CSWS_USER_SESSION = "user_session";

        public const int SHARE_YEAR_BASE = 1574;
        public const int SHARE_MONTH_BASE = 1777;

        public const string CSWS_DOMAIN = "http://www.christopherstewart.com";
        public const string CSWS_DOMAIN_HTTPS = "https://www.christopherstewart.com";
        public const string CSWS_INDUSTRY_DOMAIN = "http://industry.christopherstewart.com";

        public const string CSWS_INDUSTRY_DOMAIN_HTTPS = "https://industry.christopherstewart.com";


        public const string EMAIL_ADDRESS_HELEN = "helen@christopherstewart.com";
        public const string EMAIL_ADDRESS_CHRIS = "chris@christopherstewart.com";
        public const string EMAIL_ADDRESS_GARRY = "garry@christopherstewart.com";
        public const string EMAIL_HTML_BODY = "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml'><head><meta charset='utf-8' /><title></title></head><body style='font-family:verdana; font-size:13px;'>{0}</body></html>";


        public const string CSWS_EMAIL_SENDER = "christopherstewart@christopherstewart.com";


        //Multi language
        public const string CSWS_NAME = "Christopher Stewart Wine & Spirits"; 
        public const string CSWS_NAME_INC = "Christopher Stewart Wine & Spirits Inc."; 

        public const string EMAIL_SUBJECT_NEWSLETERR_SUBSCRIBER = "Newsletter subscriber";
        public const string EMAIL_SUBJECT_FEEDBACK_SUBSCRIBER = "Feedback subscriber";
        public const string EMAIL_SUBJECT_SIGNUP_USER = "Sign Up User";
        public const string RESET_PSWD_EMAIL_SUBJECT = "ChristopherStewart.com Account Request";
        public const string RESET_PSWD_EMAIL_CONTENT = @"Dear member,
                                                            <BR><BR>
                                                            Per your request, please follow these steps to regain access to ChristopherStewart.com.
                                                            <BR><BR>
                                                            1. Click the link below to choose a new password.
                                                            <BR><BR>
                                                            <a href=""http://www.christopherstewart.com/{0}/resetpassword/{1}"">http://www.christopherstewart.com/{0}/resetpassword/{1}</a>
                                                             <BR><BR>
                                                            If the link is not clickable, you can copy and paste the address into your Web browser's Address bar.
                                                            <BR><BR>
                                                            2. Follow the instructions on the screen to choose a new password. After you have chosen a password you will automatically enter ChristopherStewart.com.
                                                            <BR><BR>
                                                            3. In the future you can log in to ChristopherStewart.com by entering your email address and this password.
                                                            <BR><BR>
                                                            If you have any questions, write to <a href=""info@ChristopherStewart.com"" target=""_top"">info@ChristopherStewart.com</a>; do not reply to this message.
                                                            <BR><BR>
                                                            <BR><BR>
                                                            Christopher Stewart Customer Service
                                                            info@ChristopherStewart.com
                                                            <BR><BR>
                                                            ***************************
                                                            <BR><BR>
                                                            If you did not request your ID and password for ChristopherStewart.com, someone has mistakenly entered your email address when requesting their password. 
                                                            <BR>
                                                            Please ignore this message, or, if you wish, you may go to the address above to select a new password for your account. To protect your privacy, we will only send this information to the email address on file for this account.
                                                            <BR><BR>
                                                            <font size='1'>Copyright 2016 Christopher Stewart Wine & Spirits Inc.</font>
                                                            ";

 
    }
}