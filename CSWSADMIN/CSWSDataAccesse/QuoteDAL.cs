using CSWS_Conponent;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CSWSWEB.DataAccesse
{
    public class QuoteDAL
    {

        public int SaveQuote(int quote_id, string prefix, string suffix, string fName, string mName, string lName, string bDate, string bCity, string bCountry, string dDate, string dCountry, string dCity, string career, string nWorks, string quote, string publication, string pDate, string pCountry, string qType, string genre)
        {
          
            string author = fName.Trim() + " " + mName.Trim() + " " + lName.Trim();

            author = author.Trim();
            string sp_procedure_name = "sp_save_quote";

            int qtId = 0;
            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sp_procedure_name, mysqlConnection))
                {
                    mysqlCmd.CommandType = CommandType.StoredProcedure;

                    mysqlCmd.Parameters.AddWithValue("@in_quote_id", quote_id);
                    mysqlCmd.Parameters.AddWithValue("@in_prefix", prefix);
                    mysqlCmd.Parameters.AddWithValue("@in_suffix", suffix);
                    mysqlCmd.Parameters.AddWithValue("@in_first_name", fName);
                    mysqlCmd.Parameters.AddWithValue("@in_middle_name", mName);
                    mysqlCmd.Parameters.AddWithValue("@in_last_name", lName);

                    mysqlCmd.Parameters.AddWithValue("@in_author", author);

                    mysqlCmd.Parameters.AddWithValue("@in_birth_date", bDate);
                    mysqlCmd.Parameters.AddWithValue("@in_birth_country", bCountry);
                    mysqlCmd.Parameters.AddWithValue("@in_birth_city", bCity);
                    mysqlCmd.Parameters.AddWithValue("@in_death_date", dDate);
                    mysqlCmd.Parameters.AddWithValue("@in_death_country", dCountry);
                    mysqlCmd.Parameters.AddWithValue("@in_death_city", dCity);
                    mysqlCmd.Parameters.AddWithValue("@in_career", career);
                    mysqlCmd.Parameters.AddWithValue("@in_notable_works", nWorks);
                    mysqlCmd.Parameters.AddWithValue("@in_quote", quote);
                    mysqlCmd.Parameters.AddWithValue("@in_publication", publication);
                    mysqlCmd.Parameters.AddWithValue("@in_pub_date", pDate);
                    mysqlCmd.Parameters.AddWithValue("@in_pub_country", pCountry);
                    mysqlCmd.Parameters.AddWithValue("@in_quote_type", qType);
                    mysqlCmd.Parameters.AddWithValue("@in_genre", genre);
                   
                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                  
                    qtId = Convert.ToInt32(mysqlCmd.LastInsertedId);
                }
            }
             return qtId;
        }

        public int updateQuotePtImages(int quote_id,   string imgfile)
        {

            string sp_procedure_name = "sp_update_portraitlink";
            
            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sp_procedure_name, mysqlConnection))
                {
                    mysqlCmd.CommandType = CommandType.StoredProcedure;
                    mysqlCmd.Parameters.AddWithValue("@img_link", imgfile);

                    mysqlCmd.Parameters.AddWithValue("@in_quote_id", quote_id);
                   
                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                    return 1;
                }
            }
           
        }
      


        /// <summary>
        /// get quote details from quotes table
        /// </summary>
        /// <param name="qtCursor">0:current quote of the quote_id
        ///                        1:next quote of the quote_id
        ///                        2:previous quote of the quote_id
        /// </param>
        /// <param name="quote_id">0:get today's quote</param>
        /// <returns>Datatable of the select results: only return one quote</returns>
        public DataTable getQuote( int qtCursor, int quote_id)
        {
            string sp_procedure_name= "sp_select_quote";

            if (quote_id==0)
                sp_procedure_name = "sp_select_today_quote";

            DataTable dataTable = new DataTable();
            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sp_procedure_name, mysqlConnection))
                {
                    mysqlCmd.CommandType = CommandType.StoredProcedure;
                    if (quote_id >0)
                    {
                        mysqlCmd.Parameters.AddWithValue("@qt_currsor", qtCursor);
                        mysqlCmd.Parameters.AddWithValue("@current_quote_id", quote_id);
                    }
                    mysqlConnection.Open();

                    MySqlDataReader myReader = mysqlCmd.ExecuteReader();
                    dataTable.Load(myReader);
                    return dataTable;
                }
            }
        }

        public DataTable getQuoteSelector(string sFieldName, int countryIndex=0)
        {
            string sqlCommand = "SELECT distinct " + sFieldName + " FROM quotes WHERE " + sFieldName + "!=''" + " and deleted=0 ORDER BY " + sFieldName + " ASC";

            if(sFieldName=="career")
                sqlCommand = "SELECT distinct " + sFieldName + " FROM careers WHERE career!='' ORDER BY career ASC";

            if (sFieldName == "publication")
                sqlCommand = "SELECT distinct trim(publication) publication FROM quotes WHERE publication!='' ORDER BY publication ASC";

            if (sFieldName == "quote_type")
                sqlCommand = "SELECT distinct " + sFieldName + " FROM quote_types WHERE " + sFieldName + "!=''" + "ORDER BY " + sFieldName + " ASC";

            if (countryIndex==1)
                sqlCommand = "SELECT name "+sFieldName+" FROM country ORDER BY name ASC";
            else if (countryIndex == 2)
                sqlCommand = "SELECT DISTINCT pub_country FROM quotes WHERE pub_country!='' and deleted=0 ORDER BY pub_country ASC";

            if (sFieldName=="author")
                sqlCommand = "SELECT  DISTINCT author" +
                           " FROM quotes  WHERE author!='' and deleted=0 ORDER BY author ASC";
   
  
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

        /*
         countryIndex: 1: birth, 2 death
         */
        public DataTable getCity(string sCountry)
        {
            string sqlCommand = "SELECT ct.name city_name FROM city ct, country c WHERE ct.CountryCode=c.code AND c.name='" + sCountry + "' ORDER BY city_name ASC";
           
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

        public bool deleteQuoteById(int qtid)
        {
            bool retval = false;
            string sqlCommand = "UPDATE quotes SET deleted=1 WHERE quote_id=@quote_id";

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                    mysqlCmd.Parameters.AddWithValue("@quote_id", qtid);
                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                    retval = true;
                }
            }
            return retval;
        }

        /*
            IN guid 		VARCHAR(225),
			IN qtype 		VARCHAR(225),
			IN author 		VARCHAR(225),
			IN career 		VARCHAR(225),
			IN publication 	VARCHAR(225),
			IN genre 		VARCHAR(225),
			IN pcountry 	VARCHAR(225)
       */

        public bool generateQuoteIdsBySelect(string guid, string qtype, string author, string career, string publication, string genre, string pcountry)
        {         
            DBConnection dbconnection = new DBConnection();
           // author = author.Replace(" ",string.Empty);
            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand("sp_set_select_quoteids_web", mysqlConnection))
                {
                    mysqlCmd.CommandType = CommandType.StoredProcedure;
                    mysqlCmd.Parameters.AddWithValue("@guid", guid);
                    mysqlCmd.Parameters.AddWithValue("@qtype", qtype);
                    mysqlCmd.Parameters.AddWithValue("@author", author);
                    mysqlCmd.Parameters.AddWithValue("@career", career);
                    mysqlCmd.Parameters.AddWithValue("@publication", publication);
                    mysqlCmd.Parameters.AddWithValue("@genre", genre);
                    mysqlCmd.Parameters.AddWithValue("@pcountry", pcountry);

                    mysqlConnection.Open();

                    try
                    {
                         mysqlCmd.ExecuteNonQuery();
                         return true;
                      
                    }
                    catch (MySqlException e)
                    {
                        return false;
                    }
                }
            }
        }

        /*
           	IN guid 		VARCHAR(225),
			IN qtype 		VARCHAR(225),
			IN pcountry 	VARCHAR(225),
			IN career 		VARCHAR(225),						
            IN keyword 		VARCHAR(225),
            IN fieldindex 		INT(2)
      */

        public bool generateQuoteIdsByEntrySelect(string guid, string qtype, string career, string pcountry,string keyword, int fieldIndex)
        {
            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand("sp_set_search_quoteids_entry", mysqlConnection))
                {
                    mysqlCmd.CommandType = CommandType.StoredProcedure;
                    mysqlCmd.Parameters.AddWithValue("@guid", guid);
                    mysqlCmd.Parameters.AddWithValue("@qtype", qtype);
                 
                    mysqlCmd.Parameters.AddWithValue("@career", career);
                  
                    mysqlCmd.Parameters.AddWithValue("@pcountry", pcountry);
                    mysqlCmd.Parameters.AddWithValue("@keyword", keyword);
                    mysqlCmd.Parameters.AddWithValue("@fieldindex", fieldIndex);

                    mysqlConnection.Open();

                    try
                    {
                        mysqlCmd.ExecuteNonQuery();
                        return true;

                    }
                    catch (MySqlException e)
                    {
                        return false;
                    }
                }
            }
        }


        public DataTable getSelectedQuoteIdsByGuid(string guid)
        {
                    
                string sqlCommand = "SELECT q.quote_id FROM select_quotes sq, quotes q WHERE search_guid='" + guid + "' and q.quote_id=sq.quote_id and q.deleted=0 ORDER BY quote_id ASC";

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

        public void deleteSelectedQuoteIdsByGuid(string guid)
        {

            string sqlCommand = "DELETE select_quotes WHERE search_guid='" + guid;

            DataTable dataTable = new DataTable();

            DBConnection dbconnection = new DBConnection();

            using (MySqlConnection mysqlConnection = dbconnection.CSWSWEB_MySqlConnectIon())
            {
                using (MySqlCommand mysqlCmd = new MySqlCommand(sqlCommand, mysqlConnection))
                {
                 
                    mysqlConnection.Open();
                    mysqlCmd.ExecuteNonQuery();
                  
                }
            }
        }


       
       
    }
        
}