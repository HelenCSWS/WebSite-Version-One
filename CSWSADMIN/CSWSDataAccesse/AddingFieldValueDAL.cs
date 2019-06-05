using CSWSWEB.DataAccesse;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CSWSWEB.CSWSDataAccesse
{
    public class AddingFieldValueDAL
    {
        public int AddValueToField(int fIndex, string sValue)
        {
            string sp_procedure_name = "sp_add_feild_value";

            int returnVal = 0;

          
            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sp_procedure_name, mysqlConnection))
                {
                    mysqlCmd.CommandType = CommandType.StoredProcedure;

                    mysqlCmd.Parameters.AddWithValue("@in_field_index", fIndex);
                    mysqlCmd.Parameters.AddWithValue("@in_field_value", sValue);

                    mysqlConnection.Open();

                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();

                    if (myReader.HasRows)
                    {
                        while (myReader.Read())
                        {
                            returnVal = myReader.GetInt32(0);
                         
                        }
                    }

                    return returnVal;
                }
            }
        }
    }
}