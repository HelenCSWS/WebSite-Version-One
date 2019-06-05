
if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery') }


(function ($) {

    $(".btn_finish").confirm({
        title: "Confirm",
        text: "Do you want to save and quit?",
        confirm: function (button) {
            submitForm();
        },
        cancel: function (button) {
            ;
        },
        confirmButton: "Yes",
        cancelButton: "No"
    });


    $(".submit_button").on("click", function (e) {
        submitForm();
    });


    $(".submit_button_update").on("click", function (e) {
        submitForm();
    });

 



    var submitForm = function () {
        if ($("#quote").val() == "")
        {
            $("#quote").focus();
            return false;
        }
        var uri = "../api/quotes";
        
        var jqFormID = "#quote_entry";
        //var jqxhr = $.post(uri, "")
        //    .success(function (data) {
        //        // responseSubmit(data, submitForm);
        //    })
        //    .error(function () {
        //        alert("Error on posting the update.");
        //    });

        alert("post");
        var frmPost = $.post(uri, $(jqFormID).serialize()).success(function (data) {
                responseSubmit("quote_entry");
            })
            .error(function () {
                alert("Error on posting the update.");
            });
        return false;

    }



    //function for callback function from webapi
    var responseSubmit = function (submitForm) {

        var quote_id = $("#quote_id").val();
        var msg = "Add is successful";
        if (quote_id == 0) {
            alert(msg);
            $("#img_portrait_big").attr('src', "../images/quote/portrait_blank_big.png");
            $("#img_portrait_sm").attr('src', "../images/quote/portrait_blank_small.png");
            $("#del_big_image").hide();
            $("#del_sm_image").hide();
            resetForm(submitForm);
        }
        else {

            msg = "Update is successful";
            alert(msg);
            setSelectors($("#quote_id").val(), 0);
          

        }




    }

    //reset all controls 
    var resetForm = function (submitForm) {
        document.getElementById(submitForm).reset();
    }



    $(".adding_hyper_link").on("click", function (e) {

        var jSelectBox = "#s_" + this.id;
        var jInputBox = "#input_" + this.id;

        $(jInputBox).val("");
        if ($(jInputBox).is(":visible")) {
            $(jInputBox).hide();
            $(jSelectBox).show();
        }
        else {
            $(jInputBox).show();
            $(jSelectBox).hide();
        }

    });



    $(window).on('load', function () {

        //var quote_id = GetURLParameter("quote_id");
        //if (quote_id == null)
        //    quote_id = 0;
        //$("#quote_id").val(quote_id);


        

        var quote_id = 2;

        if (quote_id == 0) {
            $("#btn_panel_add").show();
            $("#btn_panel_update").hide();
            $("#img_portrait_big").attr('src', "../images/quote/portrait_blank_big.png");
            $("#img_portrait_sm").attr('src', "../images/quote/portrait_blank_small.png");
            $("#del_big_image").hide();
            $("#del_sm_image").hide();
            setSelectors(quote_id,0);
        }
        else {
            $("#btn_panel_add").hide();
            $("#btn_panel_update").show();
            setSelectors(quote_id,0);
            
        }


    });

    var loadQuote = function (quote_id, cursor) {
        var uri = "../api/quotes?cursor_id=" + cursor + "&quote_id=" + quote_id; //current quote

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

    var setVal2DropDownlist = function (value, ctlName) {
        // alert(value);
        //  console.log(value);
        var jInput = "#input_" + ctlName;
        var jDropDownList = "#s_" + ctlName;
        $(jInput).val(value);

        if (value != "") {
            var jSelectorName = jDropDownList + " option[value='" + value + "']";
            $(jSelectorName).attr("selected", "selected");
        }
    }

    var displayQuote = function (data) {
        if (isValidData(data)){
           
            setVal2DropDownlist(getFieldVal(data, "prefix"), "prefix");
            setVal2DropDownlist(getFieldVal(data, "suffix"), "suffix");

            $("#first_name").val(getFieldVal(data, "first_name"));
            $("#middle_name").val(getFieldVal(data, "middle_name"));
            $("#last_name").val(getFieldVal(data, "last_name"));

            $("#birth_date").val(getFieldVal(data, "birth_date"));

            var country = getFieldVal(data, "birth_country");

            setVal2DropDownlist(country, "bCountry");
            $("#input_bCity").val(getFieldVal(data, "birth_city"));

            if (country != "")
             {
                displayCities(country, 1);
             }
                
           // alert(getFieldVal(data, "birth_city"));

           // $("#input_bCountry").val(country);
           $("#input_bCity").val(getFieldVal(data, "birth_city"));
            //$("#s_bCity").val(getFieldVal(data, "birth_city"));

             // setVal2DropDownlist(getFieldVal(data, "birth_city"), "bCity");
             setVal2DropDownlist(country, "bCountry");

            $("#death_date").val(getFieldVal(data, "death_date"));

           // setVal2DropDownlist(getFieldVal(data, "death_city"), "dCity");
            $("#input_dCity").val(getFieldVal(data, "death_city"));
            setVal2DropDownlist(country, "dCountry");
            country = getFieldVal(data, "death_country");
            if (country != "")
                displayCities(country, 2);

            var sImg = getFieldVal(data, "small_image_link");
            if (sImg == "")
                $("#del_sm_image").hide();
            sImg = (sImg == "") ? "portrait_blank_small.png" : sImg;

            var imgLink = "../images/quote/" + sImg;
            $("#img_portrait_sm").attr('src', imgLink);

            var bImg = getFieldVal(data, "large_image_link");
            if (bImg == "")
                $("#del_big_image").hide();

            bImg = (bImg == "") ? "portrait_blank_big.png" : bImg;


            imgLink = "../images/quote/" + bImg;
            $("#img_portrait_big").attr('src', imgLink);


            $("#career").val(getFieldVal(data, "career"));
            $("#nt_work").val(getFieldVal(data, "notable_works"));

            $("#quote").text(getFieldVal(data, "quote"));


            $("#publication").val(getFieldVal(data, "publication"));
            $("#dt_Publication").val(getFieldVal(data, "pub_date"));

            setVal2DropDownlist(getFieldVal(data, "pub_country"), "pCountry");
            setVal2DropDownlist(getFieldVal(data, "quote_type"), "qType");

            setVal2DropDownlist(getFieldVal(data, "genre"), "genre");

            $("#quote_id").val(getFieldVal(data, "quote_id"));
        }
    }


    $(".entry_dropdown_list").on("change", function (e) {
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

                var htmlSelect = "<option value=''>No City</option>";
               
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

        var displayCities = function (country, countryIndex) {   
        var cityname = $("#input_bCity").val();
        var ctlName = "bCity";
        
        if (countryIndex == "2")
        {
            ctlName = "dCity";
            cityname = $("#input_dCity").val();
        }

        var uri = "../api/quotedetails/0" + "?country=" + country;

        $.getJSON(uri).done(function (data) {
            setSelector(data.cities, ctlName, "City", cityname);
        });
    }

    var setSelectors = function (quote_id, cursor) {
        var uri = "../api/quotedetails/0";
        /*{"prefix":["III","Jr. ","Sr.","XXIII"],"suffix":["Baron","Dr.","Lord ","Saint ","Sir"]}*/
        $.getJSON(uri).done(function (data) {
            setSelector(data.prefix, "prefix", "Prefix","");
            setSelector(data.suffix, "suffix", "Suffix", "");
            setSelector(data.bCountry, "bCountry", "Country", "");
            setSelector(data.dCountry, "dCountry", "Country", "");
            setSelector(data.qType, "qType", "", "");
            setSelector(data.genre, "genre", "Genre", "");
            setSelector(data.pCountry, "pCountry", "Country", "");
            if(quote_id!=0)
                loadQuote(quote_id, cursor);
        });

    }

    var setSelector = function (arrayVals, selectorName, noneTitle,cityName) {

        var selectCtl = "#s_" + selectorName;
        var inputCtl = "#input_" + selectorName;

        $(selectCtl)[0].options.length = 0;

        var htmlSelect = "<option value=''> No " + noneTitle + "</option>";
        if (noneTitle.length != 0) {
            $(selectCtl).append(htmlSelect);
        }

        var i = 0;

        if (arrayVals != null) {
            $.each(arrayVals, function (key, item) {

                if (cityName != ""&& cityName==item)
                {
                    htmlSelect = "<option selected value='" + item + "'>" + item + "</option>";
                }
                else
                    htmlSelect = "<option value='" + item + "'>" + item + "</option>";

                $(selectCtl).append(htmlSelect); //'<option value="option6">option6</option>'
            });
            i++;
        }
        else {
            //  if ($("quote_id").val() == 0) {
            $(inputCtl).show();
            $(selectCtl).hide();
            //  }
        }
    }

})(jQuery);

+function ($) {
    'use strict';
    // Starting point
    $(function () {

        /*--------- hyperlink to display the uploading image 
		*/
        $("#upload_large_portrait").change(function () {
            readImage(this, "#img_portrait_big", "#del_big_image");
        });
        $("#upload_small_portrait").change(function () {
            readImage(this, "#img_portrait_sm", "#del_sm_image");
        });

        $("#upload_large_ptImg_link").on('click', function (e) {
            e.preventDefault();
            $("#upload_large_portrait").trigger('click');
        });

        $("#upload_small_ptImg_link").on('click', function (e) {
            e.preventDefault();
            $("#upload_small_portrait").trigger('click');
        });
        /*------ hyperlink to display the uploading image ends  -----*/
    });// end point


    function readImage(input, imgID, deleteID) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                $(imgID).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
            if (deleteID.length != 0) {
                $(deleteID).show();
            }
        }
    }

    $("#del_big_image").on('click', function (e) {
        $("#img_portrait_big").attr('src', "../images/quote/portrait_blank_big.png");
        $("#del_big_image").hide();
    });

    $("#del_sm_image").on('click', function (e) {
        $("#img_portrait_sm").attr('src', "../images/quote/portrait_blank_small.png");
        $("#del_sm_image").hide();
    });


}(jQuery);
