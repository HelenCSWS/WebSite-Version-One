using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;

namespace CSWS_Conponent
{
    public class CSWSEmail
    {
       
        public string receptionName     { get; set; }
        public string to_emailAddresses   { get; set; }

        public string to_emailAddressCCs { get; set; }
        public string to_emailAddressBCCs { get; set; }

        public string fromName          { get; set; }
        public string from_emailAddress { get; set; }

        public string emailSubject      { get; set; }
        public string emailContent      { get; set; }
    
        public CSWSEmail()
        { ; }

        public CSWSEmail(string eSubject, string recpName, string toEmailAddresses, string eContent) 
        {
            to_emailAddresses = toEmailAddresses;
            receptionName = recpName;
            emailSubject = eSubject;
            emailContent = eContent;
        }

        public CSWSEmail(string eSubject, string recpName, string toEmailAddresses, string eContent, string emailCC, string emailBCC)
        {
            to_emailAddresses = toEmailAddresses;
            to_emailAddressCCs = emailCC;
            to_emailAddressBCCs = emailBCC;
            receptionName = recpName;
            emailSubject = eSubject;
            emailContent = eContent;

        }

        public int SendEmail()
        {
            try
            {
                from_emailAddress = CSWSConstants.CSWS_EMAIL_SENDER;

                MailMessage mailMessage = new MailMessage();

                string[] multiEmailAddresses = to_emailAddresses.Split(';');
                foreach (string to_emailAddress in multiEmailAddresses)
                {
                    if(to_emailAddress.Trim()!="")
                        mailMessage.To.Add(to_emailAddress);
                }

                if (to_emailAddressCCs != "" && to_emailAddressCCs != null)
                {
                    multiEmailAddresses = to_emailAddressCCs.Split(';');
                    foreach (string to_emailAddress in multiEmailAddresses)
                    {
                        if (to_emailAddress.Trim() != "")
                            mailMessage.CC.Add(to_emailAddress);
                    }
                }

                if (to_emailAddressBCCs != "" && to_emailAddressBCCs != null)
                {
                    multiEmailAddresses = to_emailAddressBCCs.Split(';');
                    foreach (string to_emailAddress in multiEmailAddresses)
                    {
                        if (to_emailAddress.Trim() != "")
                            mailMessage.Bcc.Add(to_emailAddress);
                    }
                }
                mailMessage.From = new MailAddress(from_emailAddress);
                mailMessage.Subject = emailSubject;
                mailMessage.Body = emailContent;
                mailMessage.IsBodyHtml = true;
                SmtpClient smtpClient = new SmtpClient("localhost");

                smtpClient.UseDefaultCredentials = true;

                smtpClient.Send(mailMessage);
                //SmtpClient smtpClient = new SmtpClient("smtp.hostserver.com");
                //smtpClient.Send(mailMessage);
                 return 1;
            }
            catch (Exception ex)
            {
                string exception = ex.InnerException.ToString();
                return 101;
            }

            
        }
    }
}