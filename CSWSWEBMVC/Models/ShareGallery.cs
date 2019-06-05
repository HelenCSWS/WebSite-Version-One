using CSWS_Conponent;
using CSWSWEB.CSWSBAL;
using CSWSWEB.DataAccesse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSWSWEB.Models
{
    public class ShareGallery: CSWSWEB.CSWSBAL.ShareGalleryBAL.ShareGalleryData
    {
        public int AddShareGallery()
        {
            ShareGalleryBAL shareBal = new ShareGalleryBAL();

            return shareBal.AddShareGallery(this);
        }
   }
}