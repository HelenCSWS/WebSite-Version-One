using CSWSWEB.DataAccesse;
using MySql.Data.MySqlClient;
using System.Data;

namespace CSWSWEB.CSWSDataAccesse
{
    public class CSWSCommDAL
    {
        public DataTable getCountry()
        {
            string sqlCommand = "SELECT Name country FROM country ORDER BY country ASC";

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();
                    dataTable.Load(myReader);

                    return dataTable;
                }
            }
        }

        public DataTable getCountryAndLangCode()
        {
            string sqlCommand = "SELECT  concat(Name,'|',langcode) country FROM country ORDER BY country ASC";

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();
                    dataTable.Load(myReader);

                    return dataTable;
                }
            }
        }

        public DataTable getCity(string sCountry)
        {
            string sqlCommand = "SELECT ct.name city FROM city ct, country c WHERE ct.CountryCode=c.code AND c.name='" + sCountry + "' ORDER BY city ASC";

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlConnection.Open();
                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();
                    dataTable.Load(myReader);

                    return dataTable;
                }
            }
        }

    }
}