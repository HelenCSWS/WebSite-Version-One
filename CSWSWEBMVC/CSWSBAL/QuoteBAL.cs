using CSWSWEB.DataAccesse;
using CSWSWEB.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Web;

namespace CSWSWEB.CSWSBAL
{   
    
    
    public class QuoteSelector
    {
            public ArrayList prefix = new ArrayList();
            public ArrayList suffix = new ArrayList();
            public ArrayList bCountry = new ArrayList();
            public ArrayList bCity = new ArrayList();
            public ArrayList dCountry = new ArrayList();
            public ArrayList dCity = new ArrayList();
            public ArrayList qType = new ArrayList();
            public ArrayList genre = new ArrayList();
            public ArrayList pCountry = new ArrayList();
            public ArrayList cities = new ArrayList();
            public ArrayList author = new ArrayList();
            public ArrayList career = new ArrayList();
            public ArrayList publication = new ArrayList();

            public Dictionary<string, string> dCultureCountries = new Dictionary<string, string>();
    }
    /*
     
            //qtBal.getQuoteSelector("birth_country");
            //var country = "";
            //if(country!="")//citry 
            //    qtBal.getQuoteCity(country,true);

            //qtBal.getQuoteSelector("death_country");
            //if (country != "")//citry 
            //    qtBal.getQuoteCity(country, false);

            //qtBal.getQuoteSelector("quote_type");
            //qtBal.getQuoteSelector("genre");

            //qtBal.getQuoteSelector("pub_country");
     
     */

    public class QuoteBAL
    {
        public int SaveQuote(Quote qtData)
        {
            QuoteDAL qtDal = new QuoteDAL();

            return qtDal.SaveQuote(qtData.quote_id, qtData.prefix, qtData.suffix, qtData.fist_name, qtData.middle_name, qtData.last_name, qtData.birth_date, qtData.birth_city, qtData.birth_country, qtData.death_date, qtData.death_country, qtData.death_city, qtData.career, qtData.notable_work,qtData.quote, qtData.publication, qtData.pub_date, qtData.pub_country, qtData.quote_type, qtData.genre);          
        }

        public int DeleteQuote(int qtid)
        {
            QuoteDAL qtDal = new QuoteDAL();
            if (qtDal.deleteQuoteById(qtid))
                return 0;
            else
                return 1;
        }


        public int updateQtImg(int quote_id,string imgfile)
        {
            QuoteDAL qtDal = new QuoteDAL();

            return qtDal.updateQuotePtImages(quote_id, imgfile);

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
        public IEnumerable getQuote(int cursorid, int quoteid)
        {
            if (cursorid == 100)
            {
                return getRandomQuote();
            }
            else if(quoteid==0)
            {
                return geTodayQuote();
            }
            else
            {
                QuoteDAL qtDal = new QuoteDAL();

                IEnumerable<DataRow> dtList = null;

                DataTable qtDataTable = qtDal.getQuote(cursorid, quoteid);
                dtList = qtDataTable.AsEnumerable();
                return dtList;
            }
          
        }

        public DataTable getTodayQuote()
        {
            QuoteDAL qtDal = new QuoteDAL();

           
            DataTable qtDataTable = qtDal.getTodayQuote();


            return qtDataTable;
        }

        public IEnumerable geTodayQuote()
        {
            QuoteDAL qtDal = new QuoteDAL();

            IEnumerable<DataRow> dtList = null;

            DataTable qtDataTable = qtDal.getTodayQuote();
            dtList = qtDataTable.AsEnumerable();

            return dtList;
        }

        public IEnumerable getRandomQuote()
        {
            QuoteDAL qtDal = new QuoteDAL();

            IEnumerable<DataRow> dtList = null;

            DataTable qtDataTable = qtDal.getRandomQuote();
            dtList = qtDataTable.AsEnumerable();

            return dtList;
        }

        public QuoteSelector getQuoteCities(string scountry)
        {
            QuoteSelector mySelector = new QuoteSelector();

            QuoteDAL qtBal = new QuoteDAL();

            mySelector.cities = this.getSelectoList("city_name", 0, scountry);

            return mySelector;
        }


        private ArrayList getSelectoList(string selectorName,int countryIndex=0, string sCountry="")
        {
            QuoteDAL qtBal = new QuoteDAL();

            DataTable dtReturns=null;

            if (sCountry=="")
                dtReturns = qtBal.getQuoteSelector(selectorName, countryIndex);
            else
               dtReturns = qtBal.getCity(sCountry);

            if (sCountry != "")// city
                selectorName = "city_name";

            ArrayList sList= new ArrayList();
            if (dtReturns != null)
            {
                if (dtReturns.Rows.Count > 0)
                {
                    foreach (DataRow row in dtReturns.Rows)
                    {
                        sList.Add(row[selectorName].ToString());
                    }
                }
                else
                    sList = null;
            }
            else
                sList = null; 

            return sList;

        }

        private Dictionary <string, string> getCountrySelectorListByCulture(string selectorName, int countryIndex = 0, string sCountry = "")
        {
            Dictionary<string, string> dCultureCountry =  new Dictionary<string, string>();

       
            QuoteDAL qtBal = new QuoteDAL();

            DataTable dtReturns = null;

          
            dtReturns = qtBal.getQuoteSelectorByCulture(selectorName, countryIndex);
          
    

            string cultureCountryName = "";
            string coutnryName = "";

            if (dtReturns != null)
            {
                if (dtReturns.Rows.Count > 0)
                {
                    foreach (DataRow row in dtReturns.Rows)
                    {
                        cultureCountryName = row["country_culture"].ToString();
                        coutnryName = row["pub_country"].ToString();
                        dCultureCountry.Add(coutnryName,cultureCountryName);
                    }
                }
                else
                    dCultureCountry = null;
            }
            else
                dCultureCountry = null;

            return dCultureCountry;

        }

    
        public QuoteSelector getQuoteSelectors()
        {
            QuoteSelector mySelector = new QuoteSelector();
        
            mySelector.suffix = this.getSelectoList( "suffix");
            mySelector.prefix = this.getSelectoList( "prefix");
            mySelector.bCountry = this.getSelectoList("birth_country",1);
            //if (mySelector.bCountry != null)
            //     mySelector.bCity =null;
            //    //mySelector.bCity = this.getSelectoList("birth_city", mySelector.bCountry[0].ToString());
            //else
            //    mySelector.bCity = null;

            mySelector.bCity = null;

            mySelector.dCountry = this.getSelectoList("death_country",1);
            //if (mySelector.dCountry != null)
            //    //mySelector.dCity = this.getSelectoList("death_city", mySelector.dCountry[0].ToString());
            //       mySelector.dCity =null;
            //else
            //    mySelector.dCity = null;

            mySelector.dCity = null;

            mySelector.career = this.getSelectoList("career");

            mySelector.qType = this.getSelectoList("quote_type");
            mySelector.genre = this.getSelectoList("genre");
            mySelector.pCountry = this.getSelectoList("pub_country",1);

            return mySelector;
           
        }

        
        public QuoteSelector getSingleSelector(string selector)
        {

            QuoteSelector mySelector = new QuoteSelector();
            mySelector.career = this.getSelectoList(selector);
            return mySelector;
        }


        public QuoteSelector getSearchSelectors()
        {
            QuoteSelector mySelector = new QuoteSelector();
            mySelector.qType = this.getSelectoList("quote_type");
            mySelector.author = this.getSelectoList("author");
            mySelector.career = this.getSelectoList("career");
            mySelector.publication = this.getSelectoList("publication");
            mySelector.genre = this.getSelectoList("genre");
            mySelector.pCountry = this.getSelectoList("pub_country", 2);

            return mySelector;
        }

        public QuoteSelector getSearchSelectorsByCulture()
        {
            QuoteSelector mySelector = new QuoteSelector();
            mySelector.qType = this.getSelectoList("quote_type");
            mySelector.author = this.getSelectoList("author");
            mySelector.career = this.getSelectoList("career");
            mySelector.publication = this.getSelectoList("publication");
            mySelector.genre = this.getSelectoList("genre");
            mySelector.dCultureCountries = this.getCountrySelectorListByCulture("pub_country", 2);

            return mySelector;
        }

    




        public string getEntrySelectQuotesGuid(string qtype, string career, string pcountry,string keyword, int fieldIndex )
        {
            QuoteDAL qtDal = new QuoteDAL();

            string guid = Guid.NewGuid().ToString();

            if (qtDal.generateQuoteIdsByEntrySelect(guid, qtype, career, pcountry,keyword,fieldIndex))
            {
                DataTable dataTable = qtDal.getSelectedQuoteIdsByGuid(guid);

                if (dataTable.Rows.Count == 0)
                    guid = "";
            }
            else
                guid = "";

            return guid;
        }

        public string getWebSelectQuotesGuid(string qtype, string author, string career, string publication, string genre, string pcountry)
        {
            QuoteDAL qtDal = new QuoteDAL();

            string guid = Guid.NewGuid().ToString();

            if(qtDal.generateQuoteIdsBySelect(guid,qtype,  author,  career,  publication,  genre,  pcountry))
            {
                DataTable dataTable = qtDal.getSelectedQuoteIdsByGuid(guid);

                if (dataTable.Rows.Count == 0)
                    guid = "";
            }
            else
                 guid = "";

            return guid;
        }


        public void deleteSelectedQuoteIdsByGuid(string guid)
        {
            QuoteDAL qtDal = new QuoteDAL();
            qtDal.deleteSelectedQuoteIdsByGuid(guid);
        }

        public string getSelectedQuoteIdsByGuid(string guid)
        {
            string ids = "";

            QuoteDAL qtDal = new QuoteDAL();
            DataTable dataTable = qtDal.getSelectedQuoteIdsByGuid(guid);
            string id = "0";
            foreach (DataRow row in dataTable.Rows)
            {
                 id = row["quote_id"].ToString();

                 ids = ids + id + "|";
            }

            //this.deleteSelectedQuoteIdsByGuid(guid);
            return ids;
        }
       
      
    }
}