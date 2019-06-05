using CSWS_Conponent;
using CSWSWEB.DataAccesse;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CSWSWEB.CSWSDataAccesse
{
    public class AdminUserDAL
    {
        public string checkUser(string username, string userpass )
        {
            CSWS_Utility util = new CSWS_Utility();

            string salt = getSaltByUser(username);
            string hashpswd = util.CreatePasswordHash(userpass, salt);
            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            int status_id = 0;
            string session_id = Guid.NewGuid().ToString();
            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand("sp_check_adminUser", mysqlConnection))
                {
                    //mysqlCmd.Parameters.AddWithValue("@active_id", guid);
                    //mysqlCmd.Parameters.AddWithValue("@user_type_id", 1);
                    //mysqlCmd.Parameters.AddWithValue("@first_name", "'first_name'");
                    //mysqlCmd.Parameters.AddWithValue("@last_name", "'last_name'");
                    //mysqlCmd.Parameters.AddWithValue("@company_name", "'company_name'");
                    //mysqlCmd.Parameters.AddWithValue("@city", "'city'");
                    //mysqlCmd.Parameters.AddWithValue("@country", "'country'");
                    //mysqlCmd.Parameters.AddWithValue("@email", "'email'");
                    //mysqlCmd.Parameters.AddWithValue("@password", "'password'");

                    mysqlCmd.CommandType = CommandType.StoredProcedure;

                    mysqlCmd.Parameters.AddWithValue("@in_user", username);
                    mysqlCmd.Parameters.AddWithValue("@in_pass", hashpswd);
                  //  mysqlCmd.Parameters.AddWithValue("@in_session_id", session_id);

                    mysqlCmd.Parameters.Add("@status_id", MySqlDbType.VarChar, 225);
                    mysqlCmd.Parameters["@status_id"].Direction = ParameterDirection.Output;

                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                    status_id = Convert.ToInt32(mysqlCmd.Parameters["@status_id"].Value);

                    return status_id.ToString();
                }
            }

        }

        public string getSaltByUser(string username)
        {
            string sqlCommand = "SELECT salt FROM users where username=@username";

         

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            string salt = "";

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@username", username);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();


                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults == 1)
                    {
                        salt = dt.Rows[0]["salt"].ToString();

                        return salt;
                    }
                    else
                    {
                        return "";//no salt
                    }
                }
            }
        }
        
        /*statusid: -1 all; 0 not actived; 1 actived; 2 approved*/
        public DataTable getUsers(int statusid)
        {
            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            string statusFilter="";
            if (statusid != -1)
                statusFilter = "and ac.is_actived = @statusid";

            string sqlCommand = "Select u.user_id,trim(concat(trim(first_name), ' ', trim(last_name))) user, u.company, ind.industry_type,u.city,u.country, u.email," +
                                "cast(ac.is_actived as char) status" +
                                " from users u, active_users ac, industry_types ind" +
                                " where u.user_id = ac.user_id and u.user_type_id=ind.industry_types_id and u.deleted=0 " +
                                " and u.user_level_id=2 " + statusFilter +
                                " order by ac.is_actived  asc";

           
            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    if (statusid != -1)
                        mysqlCmd.Parameters.AddWithValue("@statusid", statusid);

                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();
                    dataTable.Load(myReader);

                    return dataTable;
                }
            }

        }

         public string RevokeUser(string user_id)
        {
            string retval = "";
    
            string sqlCommand = "UPDATE users u, active_users ac SET ac.is_actived=1 where u.user_id =ac.user_id and u.user_id= @user_id"; // only update not actived by csws but actived by email users
                    
            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@user_id", user_id);
                    mysqlConnection.Open();
        
                    mysqlCmd.ExecuteNonQuery();
                            return retval;
                }
            }
        
        }


        public string activeUser(string user_id)
        {
            string retval = "";

            string sqlCheckUser = "Select ac.is_actived, first_name,email from users u, active_users ac where u.user_id =ac.user_id and  u.user_id= @user_id";

            string sqlCommand = "UPDATE users u, active_users ac SET ac.is_actived=2 where u.user_id =ac.user_id and ac.is_actived=1 and u.user_id= @user_id"; // only update not actived by csws but actived by email users

            
                    
            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCheckUser, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@user_id", user_id);
                    mysqlConnection.Open();

                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();
                    dataTable.Load(myReader);

                    int active_id = Convert.ToInt32(dataTable.Rows[0]["is_actived"]);
                    if (active_id == 1)
                    {
                        retval = dataTable.Rows[0]["first_name"].ToString() + "|" + dataTable.Rows[0]["email"].ToString();
                        using (MySqlCommand mysqlCmdUpdate = new MySqlCommand(sqlCommand, mysqlConnection))
                        {
                            mysqlCmdUpdate.Parameters.AddWithValue("@user_id", user_id);
                            //mysqlConnection.Open();
                            mysqlCmdUpdate.ExecuteNonQuery();
                            return retval;
                        }

                    }
                    else
                    {
                        return "";
                    }
                }

            }
           
        }
    }
}