using CSWSWEB.DataAccesse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



namespace CSWSWEB.Models
{

   
     public class NewsLetter
    {

        public int newsletterId { get; set; }
        public string visitorName { get; set; }
        public string emailAddress { get; set; }
        public string enterDate { get; set; }
        public string culture_code { get; set; }


    }
}