

(function ($) {

  
    $(document).on('ready', function () {
     
        var quote_id = 0; //today quote

        $("#quote_id").val(quote_id);

           var isSearchQuote = true;
        if ($("#isSearchQuote").val() == 1)
            isSearchQuote = false;
   

        var controllerName = getURLPara(1);
        if (!isSearchQuote )//qupte page
        {   
            if (getURLParaNumbers() > 3)// localhost:65077/en-ca/Quote/type/author/394
                quote_id = getURLPara(5);

            if (quote_id == 0)//today quote
                $("#today_quote_id").val("-1"); // display today quote on title

            $("#quote_id").val(quote_id);
            displayQuote();
            /*

            */

        }
        else //search quote
        {
            var guid = GetURLParameter("id");
        
            if (guid != null) {
                initQuoteResultPage(guid);
            }
            else
            {
                if (getURLParaNumbers() > 3)// localhost:65077/QuoteSearch/type/author/394
                    quote_id = getURLPara(5);
                
                if(quote_id!=0)
                    quote_id = quote_id.replace("#", "");
             
                setSelectedQuoteIDsInfo(quote_id);
            }
        }
    });

   
    var initQuoteResultPage = function (guid)
    {
        
        var uri = baseURL + "api/quotes?guid=" + guid;
      
        $.getJSON(uri).done(function (data) {
            setSelectedQuoteIDsInfo(data);
        });
    }

    var setSelectedQuoteIDsInfo = function (data)
    {
        $("#quote_ids").val(data);
        var quoteIds = $("#quote_ids").val();
        var arrayIds = quoteIds.split("|");
        var totalQuotes = arrayIds.length - 1;
        if(totalQuotes>1)
        {
            $("#current_qoute").html(1);
            $("#total_quotes").html(totalQuotes);
        }
        else
        {
            $("#qt_numbers").html(MSG_TOTAL_1_QUOTE);
        }

        var index = 0;
               
        if ($("#quote_id").val() == 0) {
            
            var qtId = getQuoteIdByIndex(0);
            $("#quote_id").val(qtId);
        }

        $("#total_qts").val(totalQuotes);      
        $("#current_index").val(index);

        $("#cursor_id").val(0);

        displayQuote();
    }

    var getQuoteIdByIndex = function(index)
    {
        var quoteIds = $("#quote_ids").val();
        if (quoteIds != 0) // 3|23|234|324|
        {
            var arrayIds = quoteIds.split("|");
            return arrayIds[index]; 
         }                 
    }

    $(".btnRotateQT").on('click', function (e) {
         //var isNext = ($(this).attr("direction") == "next") ? true : false;
        rotateQuote(($(this).attr("direction") == "next"));

    });
    //isNext=true: next, false: prev
    var rotateQuote=function(isNext)
    {
        if ($("#isSearchQuote").val() == "0") {

             $("#cursor_id").val(0);
           
            if ($("#total_qts").val() > 1) {
                var totalQts = $("#total_qts").val();
                var current_index = parseInt($("#current_index").val());
                if (isNext)
                {
                    if (current_index == (totalQts - 1))
                        current_index = 0;
                    else
                        current_index = current_index + 1;
                }
                else
                {
                    if (current_index == 0)
                        current_index = totalQts - 1;
                    else
                        current_index = current_index - 1;
                }
                
                var quote_id = getQuoteIdByIndex(current_index);

                $("#quote_id").val(quote_id);
                $("#current_index").val(current_index);
                var displayIndex = current_index + 1;
                $("#current_qoute").html(displayIndex);
             
                displayQuote();
            }
        }
        else {
        
            $("#cursor_id").val(100);
            
            displayQuote();
        }
     }
 
    $(".btn_search_quote").on('click', function (e) {
         
        var quote_id = $("#quote_id").val();
        var qtype = $("#s_qType").val();
        var author = $("#s_author").val();

        var career = $("#s_career").val();
        var publication = $("#s_source").val();

        var genre = $("#s_genre").val();
        var pCountry = $("#s_pCountry").val();      

        var isAll = false;
        if (qtype != "-1" || author != "-1" || career != "-1" || publication != "-1" || genre != "-1" || pCountry != "-1")
            quote_id = 0;
     
        var uri = baseURL + "api/quotes?quote_id=0&search_index=0&quote_type=" + qtype + "&author=" + author + "&career=" + career + "&publication=" + publication + "&genre=" + genre + "&pub_country=" + pCountry;

        var culture = getCurrentCulture();
        $.getJSON(uri).done(function (data) {
            if (data.length == 0)
                alert(MSG_NO_RECORD_FOUND);
            else
                location.href = baseURL+culture+"/QuoteSearch?id=" +data;
            return false;

        });
   
        // location.href = "quotesresult.html?quote_id=" + quote_id;
         return false;
     });

    var displayQuote = function ()
    {
        var quote_id = $("#quote_id").val();
        var cursor_id = $("#cursor_id").val();
        //    var uri = baseURL + "api/quotedetails/?indexid=1&culture="+getCurrentCulture(); //1 as get web page search selectors

        // var uri = baseURL+"api/quotes/" + quote_id + "?cursor_id=" + cursor_id;

        var uri = baseURL + "api/quotes/?id=" + quote_id + "&cursor_id=" + cursor_id + "&culture=" + getCurrentCulture();

        $.getJSON(uri).done(function (data) {
            displayQuoteDetails(data);
        });

        return false;
    }

    /*[{"RowError":"",
          "RowState":2,
          "Table":[{"quote_id":2,"first_name":"\nAlexis","middle_name":null,"last_name":" Lichine","sufix":null,"prefix":null,
          "career":"Wine Proprietor and Author","notable_works":null,"birth_date":"1913","birth_country":null,"birth_city":null,
          "death_date":"1989","death_country":null,"death_city":null,"quote":"There are four factors in good wine production, the soil, 
          the grape variety, the microclimate, and the man behind the bottle.",
          "publication":null,"pub_date":null,"pub_country":null,"pub_city":null,"quote_type":"wine",
          "genre":"Literature","when_entered":null,"when_modify":"2015-10-13T13:42:11","enter_id":1,"modify_id":1,
          "large_image_link":null,"small_image_link":null}],"ItemArray":[2,"\nAlexis",null," Lichine",null,null,"Wine Proprietor and Author",null,"1913",null,null,"1989",null,null,"There are four factors in good wine production, the soil, the grape variety, the microclimate, and the man behind the bottle.",null,null,null,null,"wine","Literature",null,"2015-10-13T13:42:11",1,1,null,null],"HasErrors":false}]*/
    //   alert("get");$.each(data, function (key, item) {

    var displayQuoteDetails=function(data)
    {
           
        if (isValidData(data))
        {
          
            var fname = getFieldVal(data, "first_name");
            var mname = getFieldVal(data, "middle_name");
            var lname = getFieldVal(data, "last_name");

            var author = getAuthorName(fname, mname, lname);

            if (fname == "" && mname == "" && lname == "")
                author = MSG_UNKNOW;

            var ptImg = getFieldVal(data, "portrait_link");

            ptImg = (ptImg == "") ? "portrait_blank.jpg" : ptImg;
            var imgLink = "https://admin.christopherstewart.com/Images/quote/" + ptImg;
           
            var quote = '"' + getFieldVal(data, "quote") + '"';
            var publication = getFieldVal(data, "publication");         
      
            quote.replace('" "', '"');
            quote.replace('""', '"');

            if (publication != "" && publication != null) {
                publication = "- " + publication;
              
                $("#publication").text(publication);
            }
            else {
                $("#publication").text("");
            }
           
          $("#quote_text").text(quote);
          
            if ($("#isSearchQuote").val() ==1) {
                $("#img_small_portrait").attr('src', imgLink);
            }
            else
            {
                $("#img_large_portrait").attr('src', imgLink);
            }

            $("#quote_author").text(author);

            var career = getFieldVal(data, "career");

            if (career == "")
                career = "     ";
            
            career = career.replace(/\,/g, ", ");

            $("#career").text(career);

            var bDate = getFieldVal(data, "birth_date");
            var bCity = getFieldVal(data, "birth_city");
            var bCountry = getFieldVal(data, "birth_country");
            var cultureCountry = "";
            cultureCountry = bCountry;
          
            if (bCountry != "")
            {
                if (getCurrentCulture() != "en-ca")
                {
                    cultureCountry = getCountryCulture(bCountry)
                }
       
                bCountry = ", " + cultureCountry;
            }

            if (bCity != "")
                bCity = " " + $.trim(bCity);

            var txtBirthInfo = MSG_Born+": " + $.trim(bDate) + bCity + $.trim(bCountry);
            var dDate = getFieldVal(data, "death_date");
            var dCity = getFieldVal(data, "death_city");
            var dCountry = getFieldVal(data, "death_country");
            if (dCountry != "") {

                cultureCountry = dCountry;
                if (getCurrentCulture() != "en-ca") {
                    cultureCountry = getCountryCulture(dCountry)
                }
                dCountry = ", " + cultureCountry;
                
            }

            if (dCity != "")
                dCity = " " + $.trim(dCity);

            var tDeathInfo = MSG_Died+": " + $.trim(dDate) + dCity + $.trim(dCountry);
            var noBirth = false;
            var noDeath = false;

            if ($.trim(bDate) == "" && $.trim(bCity) == "" && $.trim(bCountry) == "") {
                noBirth = true;
            }

            if ($.trim(dDate) == "" && $.trim(dCity) == "" && $.trim(dCountry) == "") {
                noDeath = true;
            }

            if (noBirth && noDeath)
            {
                $(".life_info_all").hide();
                $(".life_info_1").show();
                $("#life_info").text("");
            }
            else if (!noBirth && !noDeath)
            {
                $(".life_info_all").show();
                $(".life_info_1").hide();
            }
            else 
            {
                $(".life_info_all").hide();
                $(".life_info_1").show();

                if(!noBirth)
                    $("#life_info").text(txtBirthInfo);
                else
                    $("#life_info").text(tDeathInfo);
            }

             $("#birth_info").text(txtBirthInfo);
            $("#death_info").text(tDeathInfo);

            var nWork = getFieldVal(data, "notable_works");
            if ($.trim(nWork) != "")
                nWork = MSG_Notable_Work+": " + nWork;
            else
                nWork = " ";

            $("#notable_work").text(nWork);


            var qType = translateQuoteType(getFieldVal(data, "quote_type"));

     
            $("#quote_type").text(qType);

            author = author.trim();
            
            var culture = getCurrentCulture();
            var sController ="/Quote";

            if ($("#isSearchQuote").val() == "0")// Quote Search
                sController = "/QuoteSearch";

            sController = culture + sController;

       //     alert(getFieldVal(data, "quote_id"));
            
            var fakeLink = baseURL + sController + "/" + qType + "/" + author + "/" + getFieldVal(data, "quote_id");

            $("#quote_id").val(getFieldVal(data, "quote_id"));
            //alert(fakeLink);
            var stateObj = { foo: "CSWS" };
            window.history.pushState(stateObj, "Quote", fakeLink);
      

           $("#quote_id").val(getFieldVal(data, "quote_id"));

           if ($("#today_quote_id").val() == "-1") {
               $("#today_quote_id").val($("#quote_id").val());
               $("#quote_title").text(MSG_QUOTE_OF_DAY);
           }
           else if ($("#today_quote_id").val() == $("#quote_id").val())
           {
               $("#quote_title").text(MSG_QUOTE_OF_DAY);
           }
           else
           $("#quote_title").text(MSG_QUOTE);

           if ($("#isSearchQuote").val() =="1")
                displaySearchSelectors();
        }
    }

    window.addEventListener('popstate', function (e) {
        // e.state is equal to the data-attribute of the last image we clicked
    });

   
    var translateQuoteType=function(qt_type)
    {
        var  tranType="";
        if (qt_type == "Wine")
            tranType = MSG_WINE;
        if (qt_type == "Beer")
            tranType = MSG_BEER;
        if (qt_type == "Business")
            tranType = MSG_Business;
        if (qt_type == "Positive Attitude")
            tranType = MSG_Positive_Attitude;
        if (qt_type == "Spirits")
            tranType = MSG_Spirits;
        if (qt_type == "Sake")
            tranType = MSG_Sake;
        if (qt_type == "" || qt_type == "null")
            tranType = MSG_WINE;
        
        return tranType;
    }
   
    //var displaySearchSelectors =function()
  
    //    var uri = baseURL+"api/quotedetails/1"; //1 as get web page search selectors
    
    //    /*{"prefix":["III","Jr. ","Sr.","XXIII"],"suffix":["Baron","Dr.","Lord ","Saint ","Sir"]}*/

    //    alert(getCurrentCulture());
    //    $.getJSON(uri).done(function (data) {
    //        setTypeSelector(data.qType, "qType", MSG_QT_TYPES);
    //        setSelector(data.author, "author", MSG_NAMES);
    //        setSelector(data.career, "career", MSG_CAREERS);
    //        setSelector(data.publication, "source", MSG_SOURCES);
    //        setSelector(data.genre, "genre", MSG_GENRES, "");
    //        setSelector(data.pCountry, "pCountry", MSG_COUNTRIES, "");
           
    //    });
    //}

    var displaySearchSelectors = function () {

        var uri = baseURL + "api/quotedetails/?indexid=1&culture="+getCurrentCulture(); //1 as get web page search selectors

        /*{"prefix":["III","Jr. ","Sr.","XXIII"],"suffix":["Baron","Dr.","Lord ","Saint ","Sir"]}*/
        $.getJSON(uri).done(function (data) {
            setTypeSelector(data.qType, "qType", MSG_QT_TYPES);
            setSelector(data.author, "author", MSG_NAMES);
            setSelector(data.career, "career", MSG_CAREERS);
            setSelector(data.publication, "source", MSG_SOURCES);
            setGenreSelector(data.genre, "genre", MSG_GENRES, "");
            setCountrySelector(data.dCultureCountries, "pCountry", MSG_COUNTRIES, "");
    //      setCountrySelector(data.pCountry, "pCountry", MSG_COUNTRIES, ""); 

        });
    }

    var setGenreSelector = function (arrayVals, selectorName, allTitle) {

        var selectCtl = "#s_" + selectorName;
        var displaySupplierType = false;

        // eraseCookie("user_type");
        var session_id = readCookie("user_session");
        if (session_id != null) {
            displaySupplierType = true;
        }
        $(selectCtl)[0].options.length = 0;

        var htmlSelect = "<option value='-1'>" + allTitle + "</option>";

        $(selectCtl).append(htmlSelect);

        var i = 0;
        var genre="";
        if (arrayVals != null) {
            $.each(arrayVals, function (key, item) {
                                
                genre = item;
                if (getCurrentCulture() != "en-ca") {
                    genre = genre.replace(" ", "_");
                    genre = jGenre[genre];
                }
                htmlSelect = "<option value='" + item + "'>" + genre + "</option>";                
                $(selectCtl).append(htmlSelect); //'<option value="option6">option6</option>'
            });
            i++;
        }
    }

    var setTypeSelector = function (arrayVals, selectorName, allTitle) {

        var selectCtl = "#s_" + selectorName;
        var displaySupplierType = false;
        
       // eraseCookie("user_type");
        var session_id = readCookie("user_session");
       if (session_id != null) {
                displaySupplierType = true;
        }
        $(selectCtl)[0].options.length = 0;

        var htmlSelect = "<option value='-1'>" + allTitle + "</option>";

        $(selectCtl).append(htmlSelect);

        var i = 0;

        if (arrayVals != null) {
            $.each(arrayVals, function (key, item) {
                
                if (item == "Business" && displaySupplierType == false)
                    htmlSelect = "";
                else if (item == "Positive Attitude" && displaySupplierType == false)
                    htmlSelect = "";
                else {
                    var type = translateQuoteType(item);
                    htmlSelect = "<option value='" + item + "'>" + type + "</option>";
                }

                $(selectCtl).append(htmlSelect); //'<option value="option6">option6</option>'
            });
            i++;
        }
    }

    var setCountrySelector = function (arrayVals, selectorName, allTitle) {

        if (selectorName == "pCountry")
            allTitle = allTitle;
        var selectCtl = "#s_" + selectorName;
        var displaySupplierType = false;

        $(selectCtl)[0].options.length = 0;

        var htmlSelect = "<option value='-1'>" + allTitle + "</option>";

        $(selectCtl).append(htmlSelect);

        var i = 0;

        var countryName = "";

        var countryCultureName = "";
        if (arrayVals != null) {

            for (var key in arrayVals) {
                // skip loop if the property is from prototype
                if (!arrayVals.hasOwnProperty(key)) continue;

                coutnryName = key;

                countryCultureName = arrayVals[key];

                htmlSelect = "<option value='" + coutnryName + "'>" + countryCultureName + "</option>";
                 $(selectCtl).append(htmlSelect); //'<option value="option6">option6</option>' 
            } 
        }
    }

    var setSelector = function (arrayVals, selectorName, allTitle) {
       
        if (selectorName == "pCountry")
            allTitle = allTitle;
        var selectCtl = "#s_" + selectorName;
        var displaySupplierType=false;
       
        $(selectCtl)[0].options.length = 0;

        var htmlSelect = "<option value='-1'>" +allTitle + "</option>";
       
        $(selectCtl).append(htmlSelect);
       
        var i = 0;

        if (arrayVals != null) {

            $.each(arrayVals, function (key, item) {
                htmlSelect = "<option value='" + item + "'>" + item + "</option>";
                $(selectCtl).append(htmlSelect); //'<option value="option6">option6</option>'
            });
            i++;
        }
    }

})(jQuery);


function processAjaxData(response, urlPath) {
    document.getElementById("content").innerHTML = response.html;
    document.title = response.pageTitle;
    window.history.pushState({ "html": response.html, "pageTitle": response.pageTitle }, "", urlPath);
}