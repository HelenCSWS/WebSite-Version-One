using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using MySql.Data.MySqlClient;
using CSWSWEB.Models;


namespace CSWSWEB.DataAccesse
{
    public class NewsLetterDAL
    {
        //    public int newsletterId { get; set; }
        //    public string visitorName { get; set; }
        //    public string emailAddress { get; set; }
        //    public string enterDate { get; set; }

        //    public NewsLetterData() { }

        //    public NewsLetterData(string vName,string eAddress,string sComments, int isSub)
        //    {
        //        visitorName = vName;
        //        emailAddress = eAddress;  
        //    }
        //}


        public int AddNewsLetter(string visitorName, string emailAddress, string culture)
        {
            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand("sp_add_newsletter", mysqlConnection))
                {
                    mysqlCmd.CommandType = CommandType.StoredProcedure;
                    mysqlCmd.Parameters.AddWithValue("@p_visitorname",visitorName);
                    mysqlCmd.Parameters.AddWithValue("@p_emailaddress", emailAddress);
                    mysqlCmd.Parameters.AddWithValue("@p_culture", culture);

                    mysqlConnection.Open();

                    try
                    {
                        return mysqlCmd.ExecuteNonQuery();

                    }
                    catch (MySqlException e)
                    {
                        return e.Number;
                    }
                }
            }
        }

        public int AddFeedBack(string visitorName, string emailAddress, string comments, int isSubscribe,string culture)
        {
            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand("sp_add_feedback", mysqlConnection))
                {
                    mysqlCmd.CommandType = CommandType.StoredProcedure;
                    mysqlCmd.Parameters.AddWithValue("@p_visitorname", visitorName);
                    mysqlCmd.Parameters.AddWithValue("@p_emailaddress", emailAddress);
                    mysqlCmd.Parameters.AddWithValue("@p_content", comments);
                    mysqlCmd.Parameters.AddWithValue("@p_is_subscriber", isSubscribe);
                    mysqlCmd.Parameters.AddWithValue("@p_culture", culture);

                    mysqlConnection.Open();

                    try
                    {
                        return mysqlCmd.ExecuteNonQuery();

                    }
                    catch (MySqlException e)
                    {
                        return e.Number;
                    }
                }
            }
        }

        //public class NewsLetterDAL
        //{
        //    public int AddNewsLetter(NewsLetterData nld)
        //    {
        //        DBConnection dbconnection = new DBConnection();

        //        using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
        //        {
        //            using (MySqlCommand mysqlCmd = new MySqlCommand("sp_add_newsletter", mysqlConnection))
        //            {
        //                mysqlCmd.CommandType = CommandType.StoredProcedure;
        //                mysqlCmd.Parameters.AddWithValue("@p_visitorname", nld.visitorName);
        //                mysqlCmd.Parameters.AddWithValue("@p_emailaddress", nld.emailAddress);

        //                mysqlConnection.Open();

        //                try
        //                {
        //                    return mysqlCmd.ExecuteNonQuery();

        //                }
        //                catch (MySqlException e)
        //                {
        //                    return e.Number;
        //                }
        //            }
        //        }
        //    }

        //}
    }
}