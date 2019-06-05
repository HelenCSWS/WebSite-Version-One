using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using CSWSWEB.Models;
using System.Data;

namespace CSWSWEB.DataAccesse
{
    public class ShareGalleryDAL
    {
        public int AddShareInfo(CSWSWEB.CSWSBAL.ShareGalleryBAL.ShareGalleryData sd)
        {

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand("sp_add_sharegallery", mysqlConnection))
                {
                    mysqlCmd.CommandType = CommandType.StoredProcedure;
                    mysqlCmd.Parameters.AddWithValue("@p_visitorname", sd.visitorName);
                    mysqlCmd.Parameters.AddWithValue("@p_emailaddress", sd.emailAddress);
                    mysqlCmd.Parameters.AddWithValue("@p_rcpname", sd.rcpName);
                    mysqlCmd.Parameters.AddWithValue("@p_rcpemailaddress", sd.rcpemailAddress);
                    mysqlCmd.Parameters.AddWithValue("@p_link", sd.link);
                    mysqlCmd.Parameters.AddWithValue("@p_content", sd.comments);
                    mysqlCmd.Parameters.AddWithValue("@p_culture", sd.culture);
                    mysqlCmd.Parameters.AddWithValue("@p_is_subscriber", sd.isSubscribe);


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

     
    }
}