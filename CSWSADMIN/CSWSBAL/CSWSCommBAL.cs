using CSWSWEB.CSWSDataAccesse;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CSWSWEB.CSWSBAL
{
    public class CSWSCommBAL
    {

        public ArrayList getSelectorValues(int fdIndex, string fdValue)
        {
            CSWSCommDAL cmBal = new CSWSCommDAL();

            DataTable dtReturns=null;

            string selectorName = "";

            if (fdIndex == 1)//countries
            {
                dtReturns = cmBal.getCountry();
                selectorName = "country";
               
            }
            if (fdIndex == 2)//countries
            {
                dtReturns = cmBal.getCity(fdValue);
                selectorName = "city";

            }
           
          
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
    }
}