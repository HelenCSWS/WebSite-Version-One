(function($) {

    var pageName = getURLPara(2).toLowerCase();

    //only image page
    if (pageName == "image") {
        
        var province_id = 1;
        //var encodeTxt = decodeURIComponent(window.location.search.substring(1));
        var encodeTxt = getURLPara(3);
        var SHARE_YEAR_BASE = 1574;
        var SHARE_INDEX_BASE = 1777;

        if (encodeTxt == "" || encodeTxt == null) {
            year = new Date().getFullYear();
            idx = new Date().getMonth() - 1;
        }
        else {

            year = parseInt(encodeTxt.substring(0, 4)) - SHARE_YEAR_BASE;
            idx = parseInt(encodeTxt.substring(4, 8)) - SHARE_INDEX_BASE;
        }

        var indx = idx - years[year].from;  // years defined in jcarousel.connected-carousels.js
        var text = years[year].aroma[indx];

        //images/HighResolution/2015/01.jpg
        var imagelink = baseURL + "images/HighResolution/" + year + "/" + idx + ".jpg";
        var highreslink = baseURL + "images/HighResolution/" + year + "/" + idx + ".jpg";
        var downloadlink = baseURL + "imagedownload.asp?year=" + year + "&idx=" + idx;
        $(".img_hResImage").attr("src", imagelink);
        $(".a_hResImage").attr("href", downloadlink);
        $(".a_hResImage").attr("download", highreslink);
        $(".image_title").text(text);
   }
})(jQuery);