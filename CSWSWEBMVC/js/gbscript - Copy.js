/* Global definition*/

var baseURL = get_host(location.href);

var SHARE_YEAR_BASE = 1574;
var SHARE_INDEX_BASE = 1777;

var CSWS_DOMAIN = "http://www.christopherstewart.com";
var CSWS_DOMAIN_HTTPS = "http://www.christopherstewart.com";

var CSWS_DOMAIN_INDUSTRY = "http://industry.christopherstewart.com";
var CSWS_DOMAIN_INDUSTRY_HTTPS = "https://industry.christopherstewart.com";

var CSWS_COOKIE_PROID = "csws_pro";
var CSWS_COOKIE_CURRENT_PROID = "csws_current_pro";

var CSWS_COOKIE_CSWS_DEF_CULTURE = "CSWS_culture";
var COOKIE_CSWS_USER_SESSION = "user_session";
var COOKIE_CSWS_SIGN_IN_EMAIL = "sign_email";
var COOKIE_CSWS_SIGN_IN_PASS = "sign_pass";

var CULTURE_CODE_EN_CA = "en-ca";
var CULTURE_CODE_FR_CA = "fr-ca";
var CULTURE_CODE_ZH_HK = "zh-hk";



var province_id = 1;

var CSWS_PRO_IDS = { BC: "1", AB: "2", MB: "3", ON: "4", QC: "5", SK: "6", NB: 7, NS: "8", HK: "9" };

var provincesInfo = {
    1: {
        pro_init: "BC",
        pro_name: MSG_PRO_BC,
        pro_facebook: "www.facebook.com/pages/Christopher-Stewart-Wine-and-Spirits/49793071898",
        pro_twitter: "www.twitter.com/CSWS_BC",
        pro_instagram: "www.instagram.com/christopherstewart",
        heroImgs: 5,
        carolinks: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: ""
        },
        pro_map: baseURL+"/images/maps/bc.png",

    },
    2: {
        pro_init: "AB", pro_name: MSG_PRO_AB,
        pro_facebook:"www.facebook.com/pages/Christopher-Stewart-Wine-and-Spirits/49793071898",
        pro_twitter: "www.twitter.com/CSWS_AB",
        pro_instagram: "www.instagram.com/christopherstewart",
        heroImgs: 5,
        carolinks: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: ""
        },
        pro_map: "../images/maps/ab.png",
    },
    3: {
        pro_init: "MB", pro_name: MSG_PRO_MB,
        pro_facebook: "www.facebook.com/pages/Christopher-Stewart-Wine-and-Spirits/49793071898",
        pro_twitter: "www.twitter.com/CSWS_MB",
        pro_instagram: "www.instagram.com/christopherstewart",
        heroImgs: 5,
        carolinks: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: ""
        },
        pro_map: "../images/maps/mb.png",
    },
    4: {
        pro_init: "ON", pro_name: MSG_PRO_ON,
        pro_facebook: "www.facebook.com/pages/Christopher-Stewart-Wine-and-Spirits/49793071898",
        pro_twitter: "www.twitter.com/CSWS_ON",
        pro_instagram: "www.instagram.com/christopherstewart",
        heroImgs: 5,
        carolinks: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: ""
        },
        pro_map: "../images/maps/on.png",
    },
    5: {
        pro_init: "QC", pro_name: MSG_PRO_QB,
        pro_facebook: "www.facebook.com/ChristopherStewartVinsetSpiritueux/",
        pro_twitter: "www.twitter.com/CSVS_QC",
        pro_instagram: "www.instagram.com/christopherstewartquebec",
        heroImgs: 5,
        carolinks: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: ""
        },
        pro_map: "../images/maps/qb.png",
    },
    6: {
        pro_init: "SK", pro_name: MSG_PRO_SK,
        pro_facebook: "www.facebook.com/pages/Christopher-Stewart-Wine-and-Spirits/49793071898",
        pro_twitter: "www.twitter.com/CSWS_SK",
        pro_instagram: "www.instagram.com/christopherstewart",
        heroImgs: 5,
        carolinks: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: ""
        },
        pro_map: "../images/maps/sk.png",
    },
    7: {
        pro_init: "NB", pro_name: MSG_PRO_NB,
        pro_facebook: "www.facebook.com/pages/Christopher-Stewart-Wine-and-Spirits/49793071898",
        pro_twitter: "www.twitter.com/CSWS_AtlCan",
        pro_instagram: "www.instagram.com/christopherstewart",
        heroImgs: 5,
        carolinks: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: ""
        },
        pro_map: "../images/maps/nb.png",
    },
    8: {
        pro_init: "NS", pro_name: MSG_PRO_NS,
        pro_facebook: "www.facebook.com/pages/Christopher-Stewart-Wine-and-Spirits/49793071898",
        pro_twitter: "www.twitter.com/CSWS_AtlCan",
        pro_instagram: "www.instagram.com/christopherstewart",
        heroImgs:5,
        carolinks: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: ""
        },
        pro_map: "../images/maps/ns.png",
    },
    9: {
        pro_init: "HK", pro_name: MSG_PRO_HK,
        pro_facebook: "www.facebook.com/CSWSAsia/",
        pro_twitter: "www.twitter.com/CSWSAsia",
        pro_instagram: "www.instagram.com/christopherstewartasia/",
        heroImgs: 5,
        carolinks: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: ""
        },
        pro_map: "../images/maps/hongkong.png",
    },
};

/* ========================= global layout actions ============================*/

(function ($) {

    //console.log("test");
    'use strict';

    // Page onload 
    $(function () {

    // fix the dropdown menu not working problem, need to look into it later
        $(document).ready(function () {
           //checkSignInLoad(window.location.href);

        //  var link = baseURL + getCurrentCulture() + "/aboutus";
            //   location.href = link;
 
          $('.dropdown-toggle').dropdown();

           
    });  

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

  
        $(".province_id").val(pro_id);//just for debug
       
        setFooterIcons(pro_id)

        //var obj = JSON.parse(provincesInfo);
        //var length = Object.keys(obj).length;
       // alert(_.size(provincesInfo));
        // console.log(readCookie("user_session"));

    //    objectCount(provincesInfo);

    });

    function objectCount(obj) {

        //objectcount = 0;
        //$.each(obj, function(index, item) {
        //    objectcount = objectcount + item.length;
        //});
        //return objectcount;
    }


    var setFooterIcons=function(pro_id) 
    {
        setProvinceName(pro_id);
        setProvinceTwiter(pro_id);
        setProvinceInstagram(pro_id);

    }

    var setMenuBySession = function (session_id) {

        var uri = baseURL + "api/AccountSession?guid=" + session_id;
        
        $.getJSON(uri).done(function (data) {
            if (data == 0) {
                //dead session
                $(".signin_menu").show();
                $(".profile_menu").hide();
                eraseCookie(COOKIE_CSWS_USER_SESSION);
            }
            else if (data == 1) {
                //live session
                $(".signin_menu").hide();
                $(".profile_menu").show();

            }
        });

    }

 
    $(window).resize(function () {
        //   alert("reset");
        var proid = getProID();
        resizeFooter(proid);
    });

    var setProvinceName = function (proid) {
        if (proid == null)
            proid = CSWS_PRO_IDS["BC"];  //default province: BC
        proid = parseInt(proid);
       
        resizeFooter(proid);


        $(".regionText").text(provincesInfo[proid].pro_name).promise().done(function () { setCopyRight(); });
    }
     var resizeFooter = function (proid) { 
        if ($(window).width() >= 400) {
            if (getCurrentCulture() == CULTURE_CODE_EN_CA) {
                //BC SK NB 1,6, 7
                if (proid == CSWS_PRO_IDS["BC"] || proid == CSWS_PRO_IDS["SK"] || proid == CSWS_PRO_IDS["NB"]) {
                    $(".footer_menu_holder").width(320);
                    //$(".footer_row_1_left").width(124.8);
                    $(".footer_row_1_left").width(120);
                    $(".footer_row_1_right").width(195.2);
                }
                //AB,  ON, QB 2, 4 ,5
                if (proid == CSWS_PRO_IDS["AB"] || proid == CSWS_PRO_IDS["ON"] || proid == CSWS_PRO_IDS["QC"]) {

                    $(".footer_menu_holder").width(290);
                    $(".footer_row_1_left").width(79);
                    $(".footer_row_1_right").width(211);
                }
                // MB 3
                if (proid == CSWS_PRO_IDS["MB"]) {
                    $(".footer_menu_holder").width(300);
                    $(".footer_row_1_left").width(90);
                    $(".footer_row_1_right").width(210);
                }
                //NS HK 8,9
                if (proid == CSWS_PRO_IDS["NS"] || proid == CSWS_PRO_IDS["HK"]) {
                    $(".footer_menu_holder").width(310);
                    $(".footer_row_1_left").width(102.3);
                    $(".footer_row_1_right").width(207.7);
                }
            }
   
            else if (getCurrentCulture() == CULTURE_CODE_FR_CA) {
                //BC NB 
                if (proid == CSWS_PRO_IDS["BC"] || proid == CSWS_PRO_IDS["NB"]) {
                    $(".footer_menu_holder").width(420);
                    $(".footer_row_1_left").width(150);
                    $(".footer_row_1_right").width(270);
                }
                    //Short pro
                else if (proid == CSWS_PRO_IDS["AB"] || proid == CSWS_PRO_IDS["NB"] || proid == CSWS_PRO_IDS["ON"] || proid == CSWS_PRO_IDS["QC"]) {
                    $(".footer_menu_holder").width(360);
                    $(".footer_row_1_left").width(85);
                    $(".footer_row_1_right").width(275);
                }
                    //NS SK
                else if (proid == CSWS_PRO_IDS["NS"] || proid == CSWS_PRO_IDS["SK"]|| proid == CSWS_PRO_IDS["MB"]) {
                    $(".footer_menu_holder").width(400);
                    $(".footer_row_1_left").width(125);
                    $(".footer_row_1_right").width(275);
                }
                    //HK
                else if (proid == CSWS_PRO_IDS["HK"]) {
                    $(".footer_menu_holder").width(390);
                    $(".footer_row_1_left").width(105);
                    $(".footer_row_1_right").width(275);
                }           
                $(".td_contact").css({ "padding-left": "0px" });
            }
            //var CSWS_PRO_IDS={BC:1, AB:2, MB:3, ON:4, QB:5, SK:6, NB:7, NS:8, HK:9}

            if (getCurrentCulture() == CULTURE_CODE_ZH_HK) {
                //BC SK NB
                if (proid == CSWS_PRO_IDS["BC"]) {
                    $(".footer_menu_holder").width(340);
                    $(".footer_row_1_left").width(140);
                    $(".footer_row_1_right").width(200);
                }
                //AB, , ON, QB
                if (proid == CSWS_PRO_IDS["AB"] || proid == CSWS_PRO_IDS["ON"] || proid == CSWS_PRO_IDS["QC"]) {
                    $(".footer_menu_holder").width(295);
                    $(".footer_row_1_left").width(94);
                    $(".footer_row_1_right").width(201);
                }
                if (proid == CSWS_PRO_IDS["MB"] || proid == CSWS_PRO_IDS["NS"]) {
                    $(".footer_menu_holder").width(310);
                    $(".footer_row_1_left").width(110);
                    $(".footer_row_1_right").width(200);
                }
                //
                if (proid == CSWS_PRO_IDS["SK"] || proid == CSWS_PRO_IDS["NB"]) {
                    $(".footer_menu_holder").width(333);
                    $(".footer_row_1_left").width(118);
                    $(".footer_row_1_right").width(215);
                }
                if (proid == CSWS_PRO_IDS["HK"]) {
                    $(".footer_menu_holder").width(260);
                    $(".footer_row_1_left").width(70);
                    $(".footer_row_1_right").width(190);
                }
            }
        }

        else{
            // $(".footer_row_1_left").width( $(".footer_menu_holder").width()); 
            var windowWidth=0;
            
            if($(window).width()<230)
                windowWidth = 230;
            else
                windowWidth = $(window).width();

            $(".footer_menu_holder").width(windowWidth);
            $(".footer_row_1_left").width(windowWidth);
            $(".footer_row_1_right").width(windowWidth * 0.95);
            
            if (getCurrentCulture() == CULTURE_CODE_FR_CA) {
                $(".td_contact").css({ "padding-left": "30px" });
            }

        }


      
    }



    var setCopyRight = function () {
        //var copyrightText = "Copyright &#169; " + (new Date).getFullYear() + " Christopher Stewart Wine & Spirits. "+"All rights reserved";
        //$(".copyright").html(copyrightText);
    };
    var setProvinceTwiter = function (proid) {
        var twitterlink = "https://" + provincesInfo[proid].pro_twitter;
        var facebooklink = "https://" + provincesInfo[proid].pro_facebook;
        $(".facebook a").attr("href", facebooklink);
        $(".twitter a").attr("href", twitterlink);
    }
    var setProvinceInstagram = function (proid) {
        var link = "https://" + provincesInfo[proid].pro_instagram;
         $(".instagram a").attr("href", link);
    }
  


/*=== Menu actions ===*/

    $(".portfoliolink").on("click", function () { openPage("menuPortfolio"); });
    $(".openPortfolio").on("click", function () { getProvincePortfolio(true); });

    $(".menuUL li").on("click", function (e) {
        var menuItem = $(this).find('a').attr('class');
       
        openPage(menuItem);
    });

    var openPage = function (linkName) {
        var proid = getProID();
        var isOpenPage = true;
        var link = "/Index";
        switch (linkName) {
          
            case "menuPortfolio":// may need quote id in future
                {                  
                    var session_id = readCookie(COOKIE_CSWS_USER_SESSION);
                    
                    if (session_id == null)// customer
                    {
                        $(".menuPortfolio").attr("href", "");
                        getProvincePortfolio(false);
                        isOpenPage = false;
                    }
                    else {

                        link = baseURL+getCurrentCulture()+"/Portfolio";

                        $(".menuPortfolio").attr("href", link);
                        break;
                    }
                }
            case "menuLogout":// may need quote id in future
                {
                    link = CSWS_DOMAIN;
                    eraseCookie(COOKIE_CSWS_USER_SESSION);
                    break;
                }
            default:
                isOpenPage =false;
        }

        if (isOpenPage) {
            location.href = link;
        }

        return false;
    }

    var getProvincePortfolio = function (isIndustry) {

        var proid = getProID();
        var filename =CSWS_DOMAIN+"/portfolios/" + provincesInfo[proid].pro_init + "/Christopher Stewart Portfolio.pdf";
        if (isIndustry) {
            if (proid == 1 || proid == 2 || proid == 4 || proid == 9)// only BC, AB, On and HK has industry version.
                filename = CSWS_DOMAIN_INDUSTRY_HTTPS+"/portfolios/" + provincesInfo[proid].pro_init + "/Christopher Stewart Portfolio Industry.pdf";
       }
        //QB no portfolio;
      //  if (proid == CSWS_PRO_IDS["QB"])
      //      alert(MSG_COMING_SOON);
      //  else
            window.open(filename, MSG_CSWS_PORTFOLIO);
    }
})(jQuery);





/*============== Global functions=====================*/

function getSubControllerNameWithPara(isId) {

    var hreflink = window.location.href;
    var link = hreflink.replace("http://", "");
    link = link.replace("https://", "");
    var sURLVariables = link.split('/');

    var returnVal = sURLVariables[2];

    if (isId == 1)
        returnVal = sURLVariables[3];


    return returnVal;
}

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

function GetParameterFromURL(sParam) {
    var sPageURL = window.location.search.substring(1);
   
 
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
   
        if (sParameterName[0] == sParam) {
            return sParameterName[1]; 
        }
    }
}


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
    return author;
}

function getControllerName() {

 
    var sURLVariables = window.location.href.split('/');
    var sURLParas = sURLVariables[3].split('?');

    var sContollerName = sURLParas[0];
    
    return sContollerName;
}


function getURLParaNumbers() {

    var hreflink = window.location.href;
    var link = hreflink.replace("http://", "");
    link = link.replace("https://", "");
    var sURLVariables = link.split('/');
    var returnVal = sURLVariables.length;
    return returnVal;
}


function getURLPara(index) {

    var hreflink = window.location.href;
    var link = hreflink.replace("http://", "");
    link = link.replace("https://", "");
    var sURLVariables = link.split('/');
    var returnVal = sURLVariables[index];
    return returnVal;
}


function getHtmlFileName() {
  
    var index = window.location.href.lastIndexOf("/") + 1;
    filenameWithExtension = window.location.href.substr(index);
    filename = filenameWithExtension.split(".")[0];

    return filename;
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

var getProID = function () {

    var proid = readCookie(CSWS_COOKIE_CURRENT_PROID);

    if (proid == "null" || proid == null)
    {      
        proid = readCookie(CSWS_COOKIE_PROID);
        if (proid == null || proid == "null" || proid == -1)
            proid = 1;
    }
    return proid;
}

function get_host(url) {
    return url.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/, '$1');
}

function getCurrentCulture()
{
    var currentCulture=CULTURE_CODE_EN_CA;
  
    if (readCookie(CSWS_COOKIE_CSWS_DEF_CULTURE) != null)
        currentCulture = readCookie(CSWS_COOKIE_CSWS_DEF_CULTURE);

    return currentCulture;
}

function setCurrentCulture(langcode) {
    
    if (langcode == "");
    landcode = CULTURE_CODE_EN_CA;

    eraseCookie(CSWS_COOKIE_CSWS_DEF_CULTURE);
    createCookie(CSWS_COOKIE_CSWS_DEF_CULTURE, langcode, 300);
  //  return currentCulture;
}

function getCurrentProvinceID() {
    var currentProID = "1";
    if (readCookie(CSWS_COOKIE_CURRENT_PROID) == "null" || readCookie(CSWS_COOKIE_CURRENT_PROID) == null) {
 
        currentProID = "1";
    }
    else
        currentProID = readCookie(CSWS_COOKIE_CURRENT_PROID);

    return currentProID;
}





var getCountryCulture = function (country) {

    country = country.split(" ").join("_");
    country = country.split("-").join("_");
    country = country.split(".").join("");

    country = country.replace(",", "");
    country = country.replace("(", "");
    country = country.replace(")", "");

    return jCountryCulture[country];
}

var checkSignInLoad = function (href)
{
    var urls = href.split('//');

    var nakeUrl = urls[1];
    console.log(nakeUrl);
    var urlPara = nakeUrl.split["/"];

}