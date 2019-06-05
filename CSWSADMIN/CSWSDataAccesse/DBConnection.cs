using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;

namespace CSWSWEB.DataAccesse
{
    public class DBConnection
    {
        public MySqlConnection CSWSWEB_MySqlConnectIon() 
        {
            string conStr = System.Configuration.ConfigurationManager.ConnectionStrings["LocalMySql"].ConnectionString;
            using (MySqlConnection mysqlConnection = new MySqlConnection(conStr))
            {
                return mysqlConnection;
            }
        }
    }
}