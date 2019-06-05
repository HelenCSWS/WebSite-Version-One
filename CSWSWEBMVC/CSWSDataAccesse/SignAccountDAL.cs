
using CSWSWEB.DataAccesse;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using CSWS_Conponent;


namespace CSWSWEB.CSWSDataAccesse
{
    public class SignAccountDAL
    {
        public int saveAccount(string guid, string user_id, string first_name, string last_name, string company, string city, string country, string email, string password, string user_type)
        {
           

            //string sqlCommand = "insert into active_users (user_id,active_id,user_type_id,first_name,last_name,company,city,country,email,userpass)"+
            //                    "values(@guid,1,@user_type_id,@first_name,@last_name,@company_name,@city,@country,@email,@password)";


            CSWS_Utility bllUtil = new CSWS_Utility();

            string salt= bllUtil.CreateSalt();

            string hashpswd = bllUtil.CreatePasswordHash(password, salt);


            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand("sp_save_user", mysqlConnection))
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
                    mysqlCmd.Parameters.AddWithValue("@in_user_id", user_id);
                    mysqlCmd.Parameters.AddWithValue("@in_active_id", guid);
                  
                    mysqlCmd.Parameters.AddWithValue("@in_first_name", first_name);
                    mysqlCmd.Parameters.AddWithValue("@in_last_name", last_name);
                    mysqlCmd.Parameters.AddWithValue("@in_company", company);
                    mysqlCmd.Parameters.AddWithValue("@in_city", city);
                    mysqlCmd.Parameters.AddWithValue("@in_country", country);
                    mysqlCmd.Parameters.AddWithValue("@in_email", email);
                    mysqlCmd.Parameters.AddWithValue("@in_salt", salt);
                    mysqlCmd.Parameters.AddWithValue("@in_password", hashpswd);
                    mysqlCmd.Parameters.AddWithValue("@in_user_type", user_type);

                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                  
                }
            }
            return 1;
        }

        public string getUserByEmail(string email)
        {   
            string sqlCommand = "SELECT u.user_id, is_actived FROM users u,active_users au where email=@email and u.deleted=0 and au.user_id=u.user_id";
           
            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@email", email);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();
                    

                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults == 1)
                    {
                        int is_actived = Convert.ToInt32(dt.Rows[0]["is_actived"]);
                        string user_id = dt.Rows[0]["user_id"].ToString();

                        if (is_actived > 0)
                            return "-1"; // exist user
                        else
                            return user_id;
                    }
                    else
                    {
                        return "0";//no user
                    }
                }
            }
        }

        public int checkUserExistByUserName(string user_name)
        {
            string sqlCommand = "SELECT u.user_id, is_actived FROM users u,active_users au where username=@username and u.deleted=0 and au.user_id=u.user_id";

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@username", user_name);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();


                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults == 1)
                    {
                        int is_actived = Convert.ToInt32(dt.Rows[0]["is_actived"]);
                        int user_id = Convert.ToInt32(dt.Rows[0]["user_id"]);

                        if (is_actived > 0)
                            return -1; // exist user
                        else
                            return user_id;
                    }
                    else
                    {
                        return 0;//no user
                    }
                }
            }
        }

        public int getAccountExpiration(string guid)
        {
            string sqlCommand = "SELECT user_id FROM users u where reset_id=@guid and u.deleted=0 and when_reset>now()- INTERVAL 120 minute;";
           
            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@guid", guid);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();
                    

                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults == 1)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;//no user
                    }
                }
            }
        }

        public int getSessionStatus(string session_id)
        {
            string sqlCommand = "SELECT user_id FROM users u where session_id=@session_id and u.deleted=0 and session_time>now()- INTERVAL 120 minute;";

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@session_id", session_id);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();


                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults == 1)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;//expired
                    }
                }
            }
        }

        public int checkUsername(string userid, string username)
        {
            string sqlCommand = "SELECT * FROM users u,active_users au where u.username=@username"
                                +" and u.user_id =au.user_id and u.deleted=0  and au.is_actived=2 and u.user_id!=@userid;";


            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@username", username);
                    mysqlCmd.Parameters.AddWithValue("@userid", userid);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();


                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults >0)
                    {
                        return 1; //same username
                    }
                    else
                    {
                        return 0;//no duplicate username
                    }
                }
            }
        }

        public int checkPasswordByUserid(string user_id, string password)
        {
            CSWS_Utility util = new CSWS_Utility();

            string salt = getSalt(1,user_id);
            string hashpswd = util.CreatePasswordHash(password, salt);

            string sqlCommand = "SELECT * FROM users where user_id=@user_id and userpass=@password";                              

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@password", hashpswd);
                    mysqlCmd.Parameters.AddWithValue("@user_id", user_id);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();

                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults > 0)
                    {
                        return 1; //Exist password
                    }
                    else
                    {
                        return 0;//wrong password
                    }
                }
            }
        }

        public void resetPasswordByUserid(string user_id, string password)
        {
            CSWS_Utility util = new CSWS_Utility();

            string salt = util.CreateSalt();
            string hashpswd = util.CreatePasswordHash(password, salt);

            string sqlCommand = "update users set userpass=@password,salt=@salt where user_id=@userid";


            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@salt", salt);
                    mysqlCmd.Parameters.AddWithValue("@password", hashpswd);
                    mysqlCmd.Parameters.AddWithValue("@userid", user_id);
                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                }
            }
        }

        public int checkDuplicateEmail(string email)
        {
            string sqlCommand = "SELECT * FROM users u, active_users au where email=@email and u.user_id=au.user_id and au.is_actived=2 and u.deleted=0";


            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@email", email);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();


                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults > 0)
                    {
                        return 1; //Exist email
                    }
                    else
                    {
                        return 0;//no duplicate
                    }
                }
            }
        }

        public int checkDuplicateEmailByUser(string userid, string email)
        {
            string sqlCommand = "SELECT * FROM users where email=@email and user_id!=@user_id";


            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@email", email);
                    mysqlCmd.Parameters.AddWithValue("@user_id", userid);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();


                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults > 0)
                    {
                        return 1; //Exist email
                    }
                    else
                    {
                        return 0;//no duplicate
                    }
                }
            }
        }

        public void resetEmailByUserid(string userid, string email)
        {

            string sqlCommand = "update users set email=@email where user_id=@userid";


            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@email", email);
                    mysqlCmd.Parameters.AddWithValue("@userid", userid);
                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                }
            }
        }


        public void getResetId(string email,string guid)
        {

            string sqlCommand = "update users set reset_id=@guid,when_reset=now() where email=@email";


            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@email", email);
                    mysqlCmd.Parameters.AddWithValue("@guid", guid);
                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();                 
                }
            }
        }

         public void resetUserPassword(string password,string reset_id)
        {

            CSWS_Utility util = new CSWS_Utility();

            string salt = util.CreateSalt();
            string hashpswd = util.CreatePasswordHash(password, salt);

          

            string sqlCommand = "update users set userpass=@password,salt=@salt,reset_id='',when_reset=now() where reset_id=@reset_id";


            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@password", hashpswd);
                    mysqlCmd.Parameters.AddWithValue("@salt", salt);
                    mysqlCmd.Parameters.AddWithValue("@reset_id", reset_id);
                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();                 
                }
            }
        }

         public void setSessionToUser(string email, string session_id)
         {

             string sqlCommand = "update users set session_id=@session_id,session_time=now() where email=@email and deleted=0";


             DBConnection dbconnection = new DBConnection();

             using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
             {
                 using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                 {
                     mysqlCmd.Parameters.AddWithValue("@email", email);
                     mysqlCmd.Parameters.AddWithValue("@session_id", session_id);
                     mysqlConnection.Open();
                     mysqlCmd.ExecuteNonQuery();
                 }
             }
         }

         public void updateProfile(string first_name, string last_name, string username, string country, string city,string phone, string postalcode, string aboutme,string profile_image, string user_id)
         {

             string sqlCommand = "update users set first_name=@first_name, last_name=@last_name, username=@username,country=@country,city=@city,phone=@phone,postalcode=@postalcode,about_me=@aboutme"+
                                " ,profile_image=@profile_image where user_id=@user_id and deleted=0";


             DBConnection dbconnection = new DBConnection();

             using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
             {
                 using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                 {
                     mysqlCmd.Parameters.AddWithValue("@first_name", first_name);
                     mysqlCmd.Parameters.AddWithValue("@last_name", last_name);
                     mysqlCmd.Parameters.AddWithValue("@username", username);
                     mysqlCmd.Parameters.AddWithValue("@country", country);
                     mysqlCmd.Parameters.AddWithValue("@city", city);
                     mysqlCmd.Parameters.AddWithValue("@phone", phone);
                     mysqlCmd.Parameters.AddWithValue("@postalcode", postalcode);
                     mysqlCmd.Parameters.AddWithValue("@aboutme", aboutme);
                     mysqlCmd.Parameters.AddWithValue("@profile_image", profile_image);
                     mysqlCmd.Parameters.AddWithValue("@user_id", user_id);
                    
                     mysqlConnection.Open();
                     mysqlCmd.ExecuteNonQuery();
                 }
             }
         }

        public string activeAccount(string guid)
        {

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            string isExpired ="0";
            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand("sp_active_account", mysqlConnection))
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
                   
                    mysqlCmd.Parameters.AddWithValue("@in_active_id", guid);

                    mysqlCmd.Parameters.Add("@isExist", MySqlDbType.VarChar, 225);
                    mysqlCmd.Parameters["@isExist"].Direction = ParameterDirection.Output;

                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                    isExpired = mysqlCmd.Parameters["@isExist"].Value.ToString();

                    return isExpired;
                }
            }
         
        }

        public DataTable getUserInfoByUserId(string user_id)
        {
            string sqlCommand = "SELECT trim(concat(trim(first_name), ' ',trim(last_name))) fname,company,email, city,country,ind.industry_type"+
                                " FROM users u, industry_types ind"+
                                " WHERE u.user_type_id = ind.industry_types_id"+
                                " AND user_id=@user_id";

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@user_id", user_id);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();


                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults == 1)
                    {
                      //  fname = dt.Rows[0]["fname"].ToString();

                        return dt;
                    }
                    else
                    {
                        return null;//no user
                    }
                }
            }
        }

        public string getFullNameByUserId(string user_id)
        {
            string sqlCommand = "SELECT trim(concat(first_name,' ',last_name)) fname FROM users where user_id=@user_id";

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            string fname = "";

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@user_id", user_id);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();


                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults == 1)
                    {
                         fname = dt.Rows[0]["fname"].ToString();

                         return fname;
                    }
                    else
                    {
                        return "";//no user
                    }
                }
            }
        }

        public string getEmailByUserId(string user_id)
        {
            string sqlCommand = "SELECT trim(email) email FROM users where user_id=@user_id";

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            string email = "";

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@user_id", user_id);
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();


                    DataTable dt = new DataTable();
                    dt.Load(myReader);
                    int numberOfResults = dt.Rows.Count;

                    if (numberOfResults == 1)
                    {
                        email = dt.Rows[0]["email"].ToString();

                        return email;
                    }
                    else
                    {
                        return "";//no user
                    }
                }
            }
        }

        /*
         
         fieldindex: 1. byUserID
         *           2. byEmail
         */
        public string getSalt(int fieldIndex, string fieldNameValue)
        {
            string sqlCommand = "SELECT salt FROM users where email=@email";

            string fieldName = "@email";

            if(fieldIndex==1)
            {
                sqlCommand = "SELECT salt FROM users where user_id=@user_id";
                fieldName = "@user_id";
            }

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            string salt = "";

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue(fieldName, fieldNameValue);
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
        public string checkUser(string email,string userpass="")
        {
            string hashpswd = "";
            string salt = "";
            if(userpass!="")
            {
                CSWS_Utility util = new CSWS_Utility();
                salt = getSalt(2,email);
                hashpswd = util.CreatePasswordHash(userpass,salt);
            }
            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            int active_id = 0;
            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand("sp_check_user", mysqlConnection))
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

                    mysqlCmd.Parameters.AddWithValue("@in_email", email);
                    mysqlCmd.Parameters.AddWithValue("@in_pass", hashpswd);
                    

                    mysqlCmd.Parameters.Add("@status_id", MySqlDbType.VarChar, 225);
                    mysqlCmd.Parameters["@status_id"].Direction = ParameterDirection.Output;

                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                    active_id = Convert.ToInt32(mysqlCmd.Parameters["@status_id"].Value);

                    return active_id.ToString();
                }
            }

        }




        public DataTable getProfile(string session_id)
        {
            string sqlCommand = "SELECT * from users where session_id=@session_id and deleted=0 and session_time>now()- INTERVAL 120 minute;";

           
            DataTable dataTable = new DataTable();
            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@session_id", session_id);
                    mysqlConnection.Open();
                    

                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();
                    dataTable.Load(myReader);
                    return dataTable;
                }
            }
        }

        //end

 
    }
}