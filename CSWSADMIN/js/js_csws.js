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

