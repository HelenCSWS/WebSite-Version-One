/* Global definition*/
var SHARE_YEAR_BASE = 1574;
var SHARE_INDEX_BASE = 1777;

var province_id = 1;
var provinceID_base_number = 1239580;

var provincesInfo = {
    1: { pro_init: "BC", pro_name: "British Columbia", heroImgs: 5 },
    2: { pro_init: "AB", pro_name: "Alberta", heroImgs: 3 },
    3: { pro_init: "MB", pro_name: "Manitoba", heroImgs: 1 },
    4: { pro_init: "ON", pro_name: "Ontario", heroImgs: 1 },
    5: { pro_init: "QB", pro_name: "Quebec", heroImgs: 1 },
    6: { pro_init: "SK", pro_name: "Saskatchewan", heroImgs: 1 },
    7: { pro_init: "NB", pro_name: "New Brunswick", heroImgs: 1 },
    8: { pro_init: "NS", pro_name: "Nova Scotia", heroImgs: 1 },
    9: { pro_init: "HK", pro_name: "Hong Kong", heroImgs: 1 },
};


function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}


(function ($) {

    //console.log("test");
    'use strict';

    // Page onload 
    $(function () {

      //  alert(getHtmlFileName());
        // google analytic 
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })
        (window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-62414402-1', 'auto');
        ga('send', 'pageview');

        var pro_id = getProID();

        $(".province_id").val(pro_id);

        if (getHtmlFileName() != "AddingPop") {
         //   setProvinceName(pro_id);

            //setMenuHyperlink(pro_id);
        }

    });

    var setMenuHyperlink = function (province_id) {
        var link = "index.html?province_id=" + province_id;
        $(".menuHome").attr("href", link);
        link = "gallery.html?province_id=" + province_id;
        $(".menuGallery").attr("href", link);
        //quote is set in index.js
        link = "quote.html?quote_id=0&province_id=" + province_id;
        $(".menuQuote").attr("href", link);

        link = "newsletter.html?province_id=" + province_id;
        $(".menuNewsLetter").attr("href", link);

        link = "newsletter.html?province_id=" + province_id;
        $(".menuNewsLetter").attr("href", link);

        link = "signin.html?province_id=" + province_id;
        $(".menuSignIn").attr("href", link);

        link = "aboutus.html?province_id=" + province_id;
        $(".b_menuAboutUs").attr("href", link);

        link = "contactus.html?province_id=" + province_id;
        $(".b_menuContactUs").attr("href", link);

        link = "feedback.html?province_id=" + province_id;
        $(".b_menuFeedback").attr("href", link);
    }
    var getProID = function () {

        var proid = GetURLParameter("province_id");
        if (proid == "" || proid == null) {
            proid = $(".province_id").val();
        }
        if (proid == "") {
            proid = 1;
        }
        else if (proid != 1) {
            //proid = (parseInt(proid)-provinceID_base_number).toString();
        }
        return proid;
    }

    var setProvinceName = function (proid) {
        proid = parseInt(proid);
        //$(".imgbanner").attr("src",imageLink).promise().done(function(){loadPannelImages();	});
        $(".regionText").text(provincesInfo[proid].pro_name).promise().done(function () { setCopyRight(); });
    }

    var loadPannelImages = function () {
        $("#div_portfolio").css("background-image", 'url("images/welcome/portfolio_panel_1.jpg")');
        $("#div_gallery").css("background-image", 'url("images/welcome/gallery_panel_1.jpg")');
    }

    var setCopyRight = function () {
        var copyrightText = "Copyright &#169; " + (new Date).getFullYear() + " Christopher Stewart Wine & Spirits. All rights reserved";
        $(".copyright").html(copyrightText).promise().done(function () {
            savedMsg();
        });
    };

    var savedMsg = function () {
        var saveID = $(".isSaved").val();
        if (saveID == 1)
            alert("Thank You. You are now signed up for our Newsletter.");
        if (saveID == 2)
            alert("Thank You. Your feedback has been sent to us.");
        if (saveID == 3) {
            var msg = $(".message").val();
            msg = msg.replace(/\\n/g, "\n");
            alert(msg);
        }
        $(".isSaved").val(0);
    };


})(jQuery);

/*=== bottome hyperlinks actions ===*/
(function ($) {

    $(".provincemap,.regionText").bind({ "click": function () { clickRegion(); }, "mouseover": function () { regionOn(1); }, "mouseleave": function () { regionOn(0); } });

    var clickRegion = function () {

        var proid = $(".province_id").val();
        location.href = "region.html?province_id=" + proid;
        return false;
    };

    /*
		isOnHover: 1 hover; 0: off
	*/
    var regionOn = function (isOnHover) {
        var styleDetails = {
            0: { img_src: "url(images/btn_map_light.png)", color_code: "#696969" },
            1: { img_src: "url(images/btn_map_dark.png)", color_code: "#555555" } /*blue 6892D0*/
        };
        $('.map a').css('background-image', styleDetails[isOnHover].img_src);
        $('.regionText').css({ "color": styleDetails[isOnHover].color_code });
    };



})(jQuery);

/*=== Menu actions ===*/
(function ($) {

    $(".portfoliolink, .menuPortfolio").on("click", function () { getProvincePortfolio(); });
    $(".menuUL li").on("click", function (e) {
        var menuItem = $(this).find('a').attr('class');
        openPage(menuItem);
    });

    var openPage = function (linkName) {
        var proid = parseInt($(".province_id").val());

        switch (linkName) {
            case "menuHome":
                link = "index.html?province_id=" + proid;
                break;
            case "menuGallery":
                link = "gallery.html?province_id=" + proid;

                break;
            case "menuQuote":// may need quote id in future
                link = "quote.html?quote_id=" + $("#quote_id").val() + "&province_id=" + proid;
                break;
            case "menuNewsLetter":// may need quote id in future
                link = "newsletter.html?province_id=" + proid;
                break;
        }

        location.href = link;

        return false;

    }

    var getProvincePortfolio = function () {
        var proid = $(".province_id").val();
        var filename = "http://www.christopherstewart.com/portfolios/" + provincesInfo[proid].pro_init + "/Christopher Stewart Portfolio.pdf";
        alert(filename);
        //window.open(filename, "Christophert");
    }
})(jQuery);
/*=== submit action ===*/
//(function($) {

//		$(".btn_submit1").on("click", function(e){
//            $("#ischanged").val("1");
//			return true;
//       });   

//})(jQuery);



/*
  /*[{"RowError":"",
               "RowState":2,
               "Table":[{"quote_id":2,"first_name":"\nAlexis","middle_name":null,"last_name":" Lichine",
                        "sufix":null,"prefix":null,"career":"Wine Proprietor and Author","notable_works":null,
                        "birth_date":"1913","birth_country":null,"birth_city":null,"death_date":"1989","death_country":null,
                        "death_city":null,"quote":"There are four factors in good wine production, the soil, the grape variety, the microclimate, 
                        and the man behind the bottle.","publication":null,"pub_date":null,"pub_country":null,"pub_city":null,"quote_type":"wine",
                        "genre":"Literature","when_entered":null,"when_modify":"2015-10-13T13:42:11","enter_id":1,"modify_id":1,
                        "large_image_link":null,"small_image_link":null}],"ItemArray":[2,"\nAlexis",null," Lichine",null,null,
                        "Wine Proprietor and Author",null,"1913",null,null,"1989",null,null,"There are four factors in good
                        wine production, the soil, the grape variety, the microclimate, and the man behind the bottle.",
                        null,null,null,null,"wine","Literature",null,"2015-10-13T13:42:11",1,1,null,null],"HasErrors":false}]
               
               */
//   alert("get");

function isValidData(data) {
    
    var errorMsg = data[0]["RowError"];
    if (errorMsg.length != "") {
        console.log(errorMsg);
        return false;
    }
    else
        return true;

}

function getFieldVal(data, fieldName) {
    var tableData = data[0]["Table"][0];

    var fieldVal = data[0]["Table"][0][fieldName];


    fieldVal = (fieldVal == null) ? "" : fieldVal;

  
    return fieldVal;


}


function getAuthorName(firstname, middlename, lastname) {
    var author = firstname + ' ' + middlename + ' ' + lastname;
    // author = author.trim;

   
    return author;


}

function getHtmlFileName() {
    var index = window.location.href.lastIndexOf("/") + 1,
       filenameWithExtension = window.location.href.substr(index),
       filename = filenameWithExtension.split(".")[0];

    return filename;
}


var getGuid = function () {
    var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    return guid;
}
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}



function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}