
if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery') }

var PORTRAIL_IMAGE_PATH = "/images/quote/";
var PORTRAIL_BLANK_IMAGE = "portrait_blank.jpg";
var PORTRAIL_BLANK_IMAGE_FULL_LINK = PORTRAIL_IMAGE_PATH + PORTRAIL_BLANK_IMAGE;

callBackReload = null;

(function ($) {

 

    $(window).on('load', function () {


        if ( getHtmlFileName()== "search_quote")
        {
            setSelectorsToSearchQuote();

        }
        else if(getHtmlFileName() == "entry_quote")
        {
            
   
            var guid = GetURLParameter("id");

 
            var isAdd = false;

            if (guid == null)
                isAdd = true;


         
            $("#input_career").val("");
            if (isAdd) {
                
                $(".quote_counter").hide();
                initAddQTPage();
            }
            else {

                $("#page_title").html("Update Quote");
                $("#btn_panel_add").hide();
                $("#btn_panel_update").show();
                $(".quote_counter").show();
        
                initUpdateQTPage(guid);
            }
        }
       /* else if(getHtmlFileName() == "AddingPop")
        {
            var fieldIndex = GetURLParameter("id");
            $("#fieldIndex").val(fieldIndex);
            if (parseInt(fieldIndex) == 1)
                document.title = "Add Career";
            if (parseInt(fieldIndex) == 2)
                document.title = "Add Prefix";
        }*/
    });

    var initAddQTPage =function()
    {
        $("#page_title").html("Add Quote");
        $("#btn_panel_add").show();
        $("#btn_panel_update").hide();
        $("#img_portrait_big").attr('src', PORTRAIL_BLANK_IMAGE_FULL_LINK);
        //$("#img_portrait_sm").attr('src', "../images/quote/portrait_blank_small.png");
        $("#del_big_image").hide();
        //$("#del_sm_image").hide();
        quote_id = 0;

        setSelectorsToLoadQuote(quote_id, 0);
    }

    var setSelectorsToSearchQuote = function () {
        var uri = "api/quotedetails/0";
        /*{"prefix":["III","Jr. ","Sr.","XXIII"],"suffix":["Baron","Dr.","Lord ","Saint ","Sir"]}*/
        $.getJSON(uri).done(function (data) {
           
            setSelector(data.qType, "qType", "Type", "");
           
            setSelector(data.pCountry, "pCountry", "Country", "");

            setSelector(data.career, "Career", "Career", "");

          
        });

    }

    var setSelectorsToLoadQuote = function (quote_id, cursor) {
        var uri = "api/quotedetails/0";
        /*{"prefix":["III","Jr. ","Sr.","XXIII"],"suffix":["Baron","Dr.","Lord ","Saint ","Sir"]}*/
        $.getJSON(uri).done(function (data) {
            setSelector(data.prefix, "prefix", "Prefix", "");
            setSelector(data.suffix, "suffix", "Suffix", "");
            setSelector(data.bCountry, "bCountry", "Country", "");
            setSelector(data.dCountry, "dCountry", "Country", "");
            setSelector(data.qType, "qType", "", "");
            setSelector(data.genre, "genre", "Genre", "");
            setSelector(data.pCountry, "pCountry", "Country", "");

            if (quote_id != 0)
                loadQuote(quote_id, cursor);
            else
            {
                setSelector(data.career, "career", "", "");
                initCareerMsSelect(false);

                setVal2DropDownlist("Wine","qType");

            }
        });

    }

    var initCareerMsSelect = function (isCheckBox) {
        //initialize the pqSelect widget.
        $("#s_career").pqSelect({
            multiplePlaceholder: 'No Career',
            checkbox: false //adds checkbox to options
        }).on("change", function (evt) {
            var val = $(this).val();
           // console.log(val);
        });

        $("#s_career").pqSelect({ maxDisplay: 3 });
        $("#s_career").pqSelect({ width: '100%' });


        $("#input_career").hide();
    }

    var setSelector = function (arrayVals, selectorName, noneTitle, cityName) {

        var selectCtl = "#s_" + selectorName;
        var inputCtl = "#input_" + selectorName;

       

        $(selectCtl)[0].options.length = 0;

        var htmlSelect = "<option value=''></option>";
        if (noneTitle.length != 0) {
            $(selectCtl).append(htmlSelect);
        }

        var i = 0;

        if (arrayVals != null) {
            $(inputCtl).hide();
            $(selectCtl).show();
            $.each(arrayVals, function (key, item) {

                if (cityName != "" && cityName == item) {
                    htmlSelect = "<option selected value='" + item + "'>" + item + "</option>";
                }
                else
                    htmlSelect = "<option value='" + item + "'>" + item + "</option>";

                $(selectCtl).append(htmlSelect);
            });
            i++;
        }
        else {

            $(inputCtl).show();
            $(selectCtl).hide();

        }
    }

    var loadQuote = function (quote_id, cursor) {
        var uri = "api/quotes/" + quote_id + "?cursor_id=" + cursor;
       $.getJSON(uri).done(function (data) {           
            displayQuote(data);
        });
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


    var displayQuote = function (data) {
        if (isValidData(data)) {

            setVal2DropDownlist(getFieldVal(data, "prefix"), "prefix");
            setVal2DropDownlist(getFieldVal(data, "suffix"), "suffix");

            $("#first_name").val(getFieldVal(data, "first_name"));
            $("#middle_name").val(getFieldVal(data, "middle_name"));
            $("#last_name").val(getFieldVal(data, "last_name"));

            $("#birth_date").val(getFieldVal(data, "birth_date"));

            var country = getFieldVal(data, "birth_country");

            setVal2DropDownlist(country, "bCountry");
            $("#input_bCity").val(getFieldVal(data, "birth_city"));

            if (country != "") {
                displayCities(country, 1);
            }
            $("#input_bCity").val(getFieldVal(data, "birth_city"));
            setVal2DropDownlist(country, "bCountry");


            $("#death_date").val(getFieldVal(data, "death_date"));

            var country = getFieldVal(data, "death_country");

            setVal2DropDownlist(country, "dCountry");
            $("#input_dCity").val(getFieldVal(data, "death_city"));

            if (country != "") {
                displayCities(country, 2);
            }
            $("#input_dCity").val(getFieldVal(data, "death_city"));
            setVal2DropDownlist(country, "dCountry");

            //var country = getFieldVal(data, "death_country");
            //$("#input_dCity").val(getFieldVal(data, "death_city"));
            //setVal2DropDownlist(country, "dCountry");
            //country = getFieldVal(data, "death_country");
            
            //if (country != "")
            //    displayCities(country, 2);

       

            var ptImg = getFieldVal(data, "portrait_link");
            if (ptImg == "") {
            
                $("#del_big_image").hide();
                $("#lg_pt_fname").val('');
                $("#org_lg_pt_fname").val('');
            }
            else {
                $("#del_big_image").show();
                $("#lg_pt_fname").val(ptImg);
                $("#org_lg_pt_fname").val(ptImg);
            }
            ptImg = (ptImg == "") ? PORTRAIL_BLANK_IMAGE : ptImg;

            imgLink = PORTRAIL_IMAGE_PATH + ptImg;

         
          //  $("#img_portrait_big").attr('src', "");
            $("#img_portrait_big").attr('src', imgLink);
            

            $("#nt_work").val(getFieldVal(data, "notable_works"));

            $("#quote").val(getFieldVal(data, "quote"));

            $("#publication").val(getFieldVal(data, "publication"));
            $("#dt_Publication").val(getFieldVal(data, "pub_date"));

            setVal2DropDownlist(getFieldVal(data, "pub_country"), "pCountry");
            setVal2DropDownlist(getFieldVal(data, "quote_type"), "qType");

            setVal2DropDownlist(getFieldVal(data, "genre"), "genre");

            $("#quote_id").val(getFieldVal(data, "quote_id"));
            
            $("#ischanged").val("0");
    
            $("#lg_imageChanged").val("0");

            $("#upload_large_portrait").val("");
     
            careers = getFieldVal(data, "career");
           
            displayCareer(careers);

        }
    }

    $(document).keypress(function (e) {
        if (e.which == 13) {
            // enter pressed
            searchQuote();
        }
    });

    $(".btn_search_quote").on('click', function (e) {
      
        searchQuote();
    });

    var searchQuote=function()
    {
        var searchIndex = 2; //search by quote

        if ($('#search_by_name').is(':checked'))
        { searchIndex = 1 }

        var qtype = $("#s_qType").val();
        var career = $("#s_Career").val();

        var pCountry = $("#s_pCountry").val();
        var keyword = $("#keyword").val();

        if (qtype == "")
            qtype = "-1";
        if (career == "")
            career = "-1";
        if (pCountry == "")
            pCountry = "-1";

        var uri = "api/quotes?quote_id=0&quote_type=" + qtype + "&keyword=" + keyword + "&career=" + career + "&search_index=" + searchIndex + "&pub_country=" + pCountry;

        $.getJSON(uri).done(function (data) {
            if (data.length == 0)
                alert("No record found");
            else {
                location.href = "entry_quote.html?id=" + data;
                return false;
            }
        });

    }
   
    $(".btn_del").on("click", function (e) {

        var actionid = $(this).attr("actionid");
     
            $.confirm({
                title: "Confirm",
                text: "Do you want to delete current quote?",
                confirm: function (button) {
                    deleteQuote();
                },
                cancel: function (button) {
                   return;
                },
                confirmButton: "Yes",
                cancelButton: "No"
            });
      
      
    });

    var deleteQuote = function () {

        var quote_id = $("#quote_id").val();
        var uri = "api/quotes/" + quote_id + "?cursor_id=10";


        $.ajax({
            url: uri,
            type: "DELETE", // <- Change here
          
            success: function () {
                reloadAfterDelete();
            },
            error: function () {
                
            }

        });


        //$.getJSON(uri).done(function (data) {
        //    // displayQuote(data);
        //    reloadAfterDelete();
        //});

    }

    var reloadAfterDelete=function()
    {
        alert("Quote has been deleted.");
        var totalQuotes = parseInt($("#total_qts").val());

        var deleted_quote_id = $("#quote_id").val();
        if (totalQuotes == 1)
        {
            //load add quote page
            location.href = "search_quote.html"
            return false;
        }
        else
        {
            totalQuotes = totalQuotes - 1;
            $("#total_qts").val(totalQuotes);

           
            var quoteIds = $("#quote_ids").val();
            var arrayIds = quoteIds.split("|");

            var currentIndex = parseInt($("#current_index").val());
           
            //if(currentIndex!=0)
                currentIndex = currentIndex - 1;
            //else

            $("#current_index").val(currentIndex);

            var newQtIds = "";
            $.each(arrayIds, function (index,quoteId) {
                if(quoteId!="" && quoteId!=deleted_quote_id )
                {
                    newQtIds =newQtIds+ quoteId.toString() + "|";
                }
            });

            $("#quote_ids").val(newQtIds);
            setCurrentQuoteInfoByIndex(4);//get next quote
        }
    }

    $(".btn_finish").on("click", function (e) {

        var actionid = $(this).attr("actionid");

        if ($("#ischanged").val() == "1")
        {
            $.confirm({        
                title: "Confirm",
                text: "Do you want to save and quit?",
                confirm: function (button) {
                    submitForm(true, actionid);
                },
                cancel: function (button) {
                    loadEntry();
                },
                confirmButton: "Yes",
                cancelButton: "No"
            });
        }
        else
        {
            if (actionid == "5")
                loadEntry();
        }
    });

   
    var loadEntry = function () {   
       location.href = "search_quote.html"
        return false;
    }


    $(".submit_button").on("click", function (e) {

        var actionid = $(this).attr("actionid");
        if (actionid <= 2) // apply button, update current and stay
        {          
            if ($("#ischanged").val() == "0") {
                alert("Nothing is changed for current quote.")
                return false;
            }
            else
                submitForm(false, actionid);
        }
        if (actionid == 3 || actionid == 4)
        {
            if ($("#ischanged").val() == "1") {
                $.confirm({
                    title: "Confirm",
                    text: "Do you want to save the current quote?",
                    confirm: function (button) {
                        submitForm(false, actionid);
                    },
                    cancel: function (button) {
                        loadQuoteByIndex(actionid);
                    },
                    confirmButton: "Yes",
                    cancelButton: "No"
                });
            }
            else
                loadQuoteByIndex(actionid);
        }
      
    });

    var loadQuoteByIndex=function(actionid)
    {
        setCurrentQuoteInfoByIndex(actionid);
     }
    var setCurrentQuoteInfoByIndex=function(actionid)
    {
       
        var currentIndex = parseInt($("#current_index").val());
        var totalQts = $("#total_qts").val();
        if (actionid == 3)//previous
        {
            if (currentIndex == 0)
                currentIndex = (totalQts - 1);
            else
                currentIndex = currentIndex - 1;
        }
        else if (actionid == 4)//next
        {
            if (currentIndex == (totalQts - 1))
                currentIndex = 0;
            else
                currentIndex = currentIndex + 1;
        }
    
        $("#sp_total_quotes").html(totalQts);
       
        $("#sp_current_qoute").html(currentIndex + 1);
        $("#current_index").val(currentIndex);
        var quote_id = getQuoteIdByIndex(currentIndex);
   
       // $("#s_career").pqSelect("refreshData"); // need it or not?????
        setSelectorsToLoadQuote(quote_id, 0);
      
    }
  
    /*
    1: Add and add next (Add button)
    2: post and leave (finish button)
    3: post current ( show message box)
    4: post and go next ( no message)
    5: post and go previous ( no message)
    
    */
    var submitForm = function (isLoadEntry,actionid) {
        
        if ($("#quote").val() == "")
        {
            alert("Please enter the quote.");
            $("#quote").focus();
            return false;
        }
        var uri = "api/quotes";
        var jqFormID = "#quote_entry";
      
        var formElement = document.querySelector("form");
        var formData = new FormData(formElement);

        $.ajax({
            url: 'api/quotes/',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                if (!isLoadEntry) {
                    if (actionid == 3 || actionid == 4)
                        setCurrentQuoteInfoByIndex(actionid);
                    else
                        responseSubmit(actionid);
                }
                else
                    loadEntry();
            },
            error: function (returndata) {
                //alert("Error on posting the update.");
                alert(returndata);
            }
        });

        return false;
        
    }



    //function for callback function from webapi
    var responseSubmit = function (actionid) {
        if (actionid == 1) {
            alert("Adding is successful");
            $("#img_portrait_big").attr('src', PORTRAIL_BLANK_IMAGE_FULL_LINK);
          //  $("#img_portrait_sm").attr('src', "../images/quote/portrait_blank_small.jpg");
            $("#del_big_image").hide();
          //  $("#del_sm_image").hide();
            resetForm();
            // initCareerMsSelect(false);
        }
        else {         
            alert("Update is successful");
            loadQuote($("#quote_id").val(), 0);
        }
    }

    //reset all controls 
    var resetForm = function () {
        document.getElementById("quote_entry").reset();
    
        $("#s_career").pqSelect("refreshData");
        $("#input_career").val("");
        $("#ischanged").val("0");
    //    $("#sm_imageChanged").val("0");
        $("#lg_imageChanged").val("0");

    }

  

    var initUpdateQTPage = function (guid) {
      
        var uri = "api/quotes?guid=" + guid;
       
        $.getJSON(uri).done(function (data) {
            if (data == "") {
                alert("No quote is found, please go back to search page.");
                location.href = "search_quote.html"
                return false;
            }
            else
                initSelectedQuoteIDsInfo(data);
        }).fail(function () {
            alert("Get data failed!");
        });
     }

    var initSelectedQuoteIDsInfo = function (data) {

       $("#quote_ids").val(data); 
        var quoteIds = $("#quote_ids").val();
        var arrayIds = quoteIds.split("|");
        var totalQuotes = arrayIds.length - 1; 
        var index = 0;

        var quote_id = getQuoteIdByIndex(0);
        $("#quote_id").val(quote_id);
    
        $("#total_qts").val(totalQuotes);      
        $("#current_index").val(index);

        $("#cursor_id").val(0);

        $("#sp_current_qoute").html(index+1);
        $("#sp_total_quotes").html(totalQuotes);
        
        if (totalQuotes == 1)
        {
            $("#button_pre").disabled = true;
            $("#button_next").disabled = true;
            document.getElementById("button_pre").disabled = true;
            document.getElementById("button_next").disabled = true;
        }
        

        loadQuoteByIndex(0);
    }

    var getQuoteIdByIndex = function (index) {
        var quoteIds = $("#quote_ids").val();
        if (quoteIds != 0)
        {
            var arrayIds = quoteIds.split("|");
            return arrayIds[index];
        }
    }


   
    var setVal2DropDownlist = function (value, ctlName) {
       
        var jInput = "#input_" + ctlName;
        var jDropDownList = "#s_" + ctlName;
        $(jInput).val(value);

        if (value != "") {
            var jSelectorName = jDropDownList + " option[value='" + value + "']";
            $(jSelectorName).attr("selected", "selected");
        }
    }

    var displayCareer=function(currentCareers)
    {

        var uri = "api/quotedetails?selectorName=career";
        $.getJSON(uri).done(function (data) {
            setCareer(currentCareers, data.career);
            
        });
    }

    var setCareer = function (careers, arrayVals, isrefresh) {
     
     
        if (careers == null)
            careers = "";
        else
            careers = careers.toString();
        
        var arrarCurrentCareers = careers.split(",");

        var selectCtl = "#s_career";
        var inputCtl = "#input_career" ;
        $(inputCtl).val(careers);
        
        $(selectCtl)[0].options.length = 0;
       
        var i = 0;
       
        var isSameCareer=false;

        if (arrayVals != null) {
            $(inputCtl).hide();
            $(selectCtl).show();
           
            $.each(arrayVals, function (key, gCareer) {

                 $.each(arrarCurrentCareers, function (ckey, currentCareer) {
  
                     if (gCareer.toUpperCase() == currentCareer.toUpperCase())
                        isSameCareer=true;
                });

                if (!isSameCareer) {
                    htmlSelect = "<option value='" + gCareer + "'>" + gCareer + "</option>";
                    isSameCareer = false;
                }
                else {
                    htmlSelect = "<option selected='selected' value='" + gCareer + "'>" + gCareer + "</option>";
                    isSameCareer = false;
                }

                $(selectCtl).append(htmlSelect);

            });
            i++;

            $(inputCtl).hide();
            
        }
        else {
            $(selectCtl).hide();
            
        }

        //initialize the pqSelect widget.
        initCareerMsSelect(false);
        $("#s_career").pqSelect("refreshData");
 
    }
   

   
    $(".entry_inputs").on("change", function (e) {
        $("#ischanged").val("1");
    });
    $(".entry_dropdown_list").on("change", function (e) {
        
        $("#ischanged").val("1");
        
        var jInputCtl = "#input_" + $(this).attr("nameholder");

        var ctlName = $(this).attr("nameholder");

        $(jInputCtl).val($(this).val());


        if ($(this).attr("contentname") == "country") {

            var countryIndex = $(this).attr("countryindex")
        
            if ($(this).val() == "")
            {              
                var selectorName = "bCity";
                if (countryIndex == 2)
                    selectorName = "dCity";

                var selectCtl = "#s_" + selectorName;
                var inputCtl = "#input_" + selectorName;

                $(selectCtl)[0].options.length = 0;

                var htmlSelect = "<option value=''></option>";
               
                $(selectCtl).append(htmlSelect);
                $(inputCtl).val("");
            }
            else
            {
                var cityInput = "#input_bCity";
                if (countryIndex == 2)
                    cityInput = "#input_dCity";

                $(cityInput).val("");
                var country = $(this).val();
                displayCities(country, countryIndex)
            }
           
        }
    });

    var displayCities = function (country, countryIndex)
    {
        var cityname = $("#input_bCity").val();
        var ctlName = "bCity";
        
        if (countryIndex == "2")
        {
            ctlName = "dCity";
            cityname = $("#input_dCity").val();
        }

        var uri = "api/quotedetails/0" + "?country=" + country;

        $.getJSON(uri).done(function (data) {
            setSelector(data.cities, ctlName, "City", cityname);
        });
    }

  

  
    
    $("#s_career").on("change", function () {
        
        var sCareer=""
        if ($(this).val() != null)
            sCareer = $(this).val();

        $("#input_career").val(sCareer);
        $("#ischanged").val("1");
    });


     




    'use strict';
    // Starting point
    $(function () {

        /*--------- hyperlink to display the uploading image 
		*/
        $("#upload_large_portrait").change(function () {
            readImage(this, "#img_portrait_big");
        });
        //$("#upload_small_portrait").change(function () {
        //    readImage(this, "#img_portrait_sm", "#del_sm_image");
        //});

        $("#upload_large_ptImg_link").on('click', function (e) {
            e.preventDefault();
            $("#upload_large_portrait").trigger('click');
        });

        //$("#upload_small_ptImg_link").on('click', function (e) {
        //    e.preventDefault();
        //    $("#upload_small_portrait").trigger('click');
        //});
        /*------ hyperlink to display the uploading image ends  -----*/
    });// end point


    //function readImage(input, imgID, deleteID) {
    
    //    if (input.files && input.files[0]) {
    //        if (input.files[0] == $("#sm_pt_fname").val() || input.files[0] == $("#lg_pt_fname").val())
    //        {
    //            alert("Images can't use same file")
    //        }

    //        var reader = new FileReader();

    //        reader.onload = function (e) {

    //            $(imgID).attr('src', e.target.result);
              
    //        }
    //        reader.readAsDataURL(input.files[0]);
    //        if (deleteID.length != 0) {
    //            $(deleteID).show();
    //        }
    //    }

       
    //    if (deleteID == "#del_big_image") {
    //        $("#lg_pt_fname").val(input.files[0].name);

    //        $("#lg_imageChanged").val("1");
    //    }
    //    else {
    //        $("#sm_pt_fname").val(input.files[0].name);
    //        $("#sm_imageChanged").val("1");
    //    }

       
    //    $("#ischanged").val("1");
    //}

    function readImage(input, imgID) {

      

            var reader = new FileReader();

            reader.onload = function (e) {
               $(imgID).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
          
            $("#del_big_image").show();
            
       
   
            $("#lg_pt_fname").val(input.files[0].name);

            $("#lg_imageChanged").val("1");
     
        $("#ischanged").val("1");
    }

    $("#del_big_image").on('click', function (e) {
        $("#img_portrait_big").attr('src', PORTRAIL_BLANK_IMAGE_FULL_LINK);
        $("#lg_pt_fname").val("");
        $("#del_big_image").hide();
        $("#ischanged").val("1");
        $("#lg_imageChanged").val("1");
        $("#upload_large_portrait").attr('src', "");
       
    });

   
    //$("#hyper_addCareer").on('click', function (e) {
    //    $("#fieldIndex").val(1);
    //    popupwindow("AddingPop.html?id=1", "Add Career", 400, 400);
    //});

    $(".adding_hyper_link").on("click", function (e) {

        var jSelectBox = "#s_" + this.id;
        var jInputBox = "#input_" + this.id;

        var fieldIndex = $(this).attr("field_id");
        if (fieldIndex == 1)
        {
            $("#fieldIndex").val(fieldIndex);
            var url = "AddingPop.html?id=" + fieldIndex;
            popupwindow(url, "", 400, 400);
        }
        else
        {
            $(jInputBox).val("");
            if ($(jInputBox).is(":visible")) {
                $(jInputBox).hide();
                $(jSelectBox).show();
            }
            else {
                $(jInputBox).show();
                $(jSelectBox).hide();
            }
        }
     

    });

    function popupwindow(url, title, w, h)
    {
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }

    /*

    $("#btn_Save").on('click', function (e)
    {
        var uri = "../api/AddingFieldValue/";
        var fdid = $("#fieldIndex").val();
        var frmPost = $.post(uri, $("#fm_addFeildValue").serialize())
                .success(function (data) {
                    $("#fieldIndex").val(fdid);
                    $("#fieldValue").val("");
                    if (data == 1)

                        alert("Duplicate value!");
                    else
                    
                        alert("Added!");

                    $("#fieldValue").focus();
                    
                    
                })
                .error(function () {

                    $("#fieldIndex").val(fdid);
                    $("#fieldValue").val("");
                    alert("Error on posting the update.");
                });
        return false;
    });

    $("#btn_Close").on('click', function (e) {
        window.close();
        window.opener.AddingDone($("#fieldIndex").val());

    });

   
   
    }*/
    var refreshSelectors = function () {
 
        var fdId = $("#fieldIndex").val();
   
        if(fdId=="1")
        {
            var currentCareer = $("#s_career").val();     
            displayCareer(currentCareer);
        }
    }

    callBackReload = refreshSelectors;

})(jQuery);

function AddingDone(fieldIndex) {
    callBackReload();
    }



