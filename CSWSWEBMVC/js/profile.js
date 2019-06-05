
callBackReload = null;

+function ($) {
    'use strict';


    $(window).on('load', function () {
        //http://localhost:65077/en-ca/Account/ChangeProfile/1/3
        if (getURLPara(3).toLowerCase() == "profile")
        {
            var session_id = readCookie("user_session");
            if (session_id != null) {
   
                getcountry(session_id);
            }
        }
        else if (getURLPara(3).toLowerCase() == "changeprofile") {
      
            var index_id = getURLPara(4);
            $("#index_id").val(index_id);
           

            var userid = getURLPara(5);
          
            $("#user_id").val(userid);

          
            $("#sub_title_holder").hide();
            

            if (index_id == 1)//email
            {               
                $(".div_change_email_holder").show();
                $(".div_change_password_holder").hide();
                $("#old_password").removeAttr('required');
                $("#new_password").removeAttr('required');
                $("#cfm_password").removeAttr('required');
                getEmailByUserid(userid);
            }
            else {
                $(".div_change_email_holder").hide();
                $("#email").removeAttr('required');
                $("#password").removeAttr('required');
                $("#cfm_email").removeAttr('required');
                $(".div_change_password_holder").show();
                $("#old_password").focus();
               
            }
            $(".btn_reset").show();
            $("#sub_title_holder").show();
           
        }
    });

    var getcountry = function (session_id)
    {     
        var uri = baseURL+"api/cswscomm/1" + "?selectorName=country";
        $.getJSON(uri).done(function (data) {
            setCountrySelector(data, "select_country", MSG_SELECT_COUNTRY);
            getProfileInfo(session_id);
        });
    }

    var getEmailByUserid = function (userid) {       
        var uri = baseURL + "api/updateprofile/" + userid;
        $.getJSON(uri).done(function (data) {         
            $("#email_address").text(data);          
        });
    }

    //get city
    var getcity=function(country,currentcity)
    {
        
        var uri = baseURL + "api/cswscomm/2" + "?selectorName=" + country;

        $.getJSON(uri).done(function (data) {

            setSelector(data, "select_city", MSG_SELECT_City);

            if (currentcity != "") {
                $("#select_city").val(currentcity);
            }
        });

         
       
    }

    $("#select_country").on("change", function (e) {
        if ($("#select_country").val() != "") {

            getcity($("#select_country").val(),"");
        }

    });


    var setCountrySelector = function (arrayVals, selectorName, selectTitle) {

        var selectCtl = "#" + selectorName;

        $(selectCtl)[0].options.length = 0;

        var htmlSelect = "<option value=''>" + selectTitle + "</option>";

        $(selectCtl).append(htmlSelect);

        var i = 0;

        if (arrayVals != null) {

            var countryCulture = "";

            $(selectCtl).show();
            $.each(arrayVals, function (key, item) {

                countryCulture = item;
             
                if (getCurrentCulture() != "en-ca") {
                    countryCulture = getCountryCulture(item);
                }
             
                if (countryCulture != "undefined")
                    htmlSelect = "<option value='" + item + "'>" + countryCulture + "</option>";

                $(selectCtl).append(htmlSelect);
            });
            i++;
        }

    }
    var setSelector = function (arrayVals, selectorName, selectTitle) {

        var selectCtl = "#" + selectorName;

        $(selectCtl)[0].options.length = 0;

        var htmlSelect = "<option value=''>" + selectTitle + "</option>";

        $(selectCtl).append(htmlSelect);

        var i = 0;

        if (arrayVals != null) {

            $(selectCtl).show();
            $.each(arrayVals, function (key, item) {

                htmlSelect = "<option value='" + item + "'>" + item + "</option>";

                $(selectCtl).append(htmlSelect);
            });
            i++;
        }
    }


    var getProfileInfo = function (session_id) {

        var uri = baseURL + "api/AccountProfile?guid=" + session_id;

        //          var uri = "api/SignAccount?guid=" + active_id;
        $.getJSON(uri).done(function (data) {

            if (isValidData(data)) {              
                displayProfile(data);             
            }
            else
            {
                alert(MSG_TRY_LATER);
            }
        });
        ;
    }

    var displayProfile=function(data)
    {
        var fname = getFieldVal(data, "first_name");

        var lname = getFieldVal(data, "last_name");
        var email = getFieldVal(data, "email");
        var username = getFieldVal(data, "username");
        var user_id = getFieldVal(data, "user_id");
       
        var country = getFieldVal(data, "country");
        var city = getFieldVal(data, "city");
        var zipcode = getFieldVal(data, "postalcode");
        var phone = getFieldVal(data, "phone");
        var aboutme = getFieldVal(data, "about_me");
        var image = getFieldVal(data, "profile_image");

        var imgLink = baseURL+"/images/profile/profile_blank.jpg";
      
        if (image == "") {
            $("#profile_img").attr('src', imgLink);
            $("#org_img").val('');
        }
        else
        {
            imgLink = baseURL + "/images/profile/" + image;
            $("#profile_img").attr('src', imgLink);
            $("#org_img").val(image);
            //$("#profile_image").val(image);
        }

        $("#email_address").text(email);
        $("#first_name").val(fname);
        $("#last_name").val(lname);
        $("#username").val(username);
        $("#phone").val(phone);

        $("#user_id").val(user_id);        

        $("#postal_code").val(zipcode);
        $("#aboutme").val(aboutme);
        
        if (country != "") {
            $("#select_country").val(country);
        
            getcity(country, city);
        }

        
    }
 

    var checkNickName = function (isSubmit)
    {
       
        if ($("#username").val() != "") {

            var username = $("#username").val();
            var user_id = $("#user_id").val();
            var uri = baseURL + "api/AccountProfile?userid=" + user_id + "&username=" + username;

            //          var uri = "api/SignAccount?guid=" + active_id;
            $.getJSON(uri).done(function (data) {
                if (data == 1) {
                   
                    $("#nickname_error").text(MSG_DISPLAY_NAME_TAKEN);
                    $("#username").focus();
                    return false;
                }
                else {
                    if (isSubmit) {
                        submitForm();

                    }
                    else
                        $("#nickname_error").text("");
                    return true;
                }
            });
            ;
        }
        else
        {
            if (isSubmit) {
                submitForm();

            }
            $("#nickname_error").text("");
        }
    }
    $("#username").on("focusout", function (e) {
        
        checkNickName(false);
    });


    $("#frm_profile").submit(function (e) {
      
       
        checkNickName(true);
           

     //   postForm(uri, formID);
        e.preventDefault();
        return false;

    });

    var submitForm = function () {
 
        var uri = baseURL + "api/accountprofile";
        var jqFormID = "#frm_profile";

        var formElement = document.querySelector("form");
        var formData = new FormData(formElement);

        $.ajax({
            url: baseURL + 'api/accountprofile',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                alert(MSG_SUCCESS_PROFILE_UPDATE);
            },
            error: function (returndata) {
                alert(MSG_ERROR_POSTING);
                //alert(returndata);
            }
        });

        return false;

    }
   

    /*--------- hyperlink to display the uploading image 
  */
    $("#upload_image").change(function () {
        readImage(this, "#profile_img");
    });
    //$("#upload_small_portrait").change(function () {
    //    readImage(this, "#img_portrait_sm", "#del_sm_image");
    //});

    $("#edit_image").on('click', function (e) {
        e.preventDefault();
        $("#upload_image").trigger('click');
    });


    function readImage(input, imgID) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $(imgID).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);

     //   $("#del_big_image").show();

        $("#profile_image").val(input.files[0].name);

        $("#imageChanged").val("1");

//        $("#ischanged").val("1");
    }

    $("#del_big_image").on('click', function (e) {
        $("#img_portrait_big").attr('src', PORTRAIL_BLANK_IMAGE_FULL_LINK);
        $("#lg_pt_fname").val("");
        $("#del_big_image").hide();
        $("#ischanged").val("1");
        $("#lg_imageChanged").val("1");
        $("#upload_large_portrait").attr('src', "");

    });


    $("#link_change_email").on('click', function (e) {
        openChangeProfilePopWindows(1);
        //var userid = $("#user_id").val();
        //$("#index_id").val(1);
      

        //var url = baseURL +getCurrentCulture()+ "/Account/ChangeProfile/1/"+userid;
        //popupwindow(url, "", 600, 400);
    });

    $("#link_change_password").on('click', function (e) {
       
        var userid = $("#user_id").val();
        $("#index_id").val(2);
        //var url = baseURL + "changeprofileinfo.html?index_id=2&user_id=" + userid;

        var url = baseURL + getCurrentCulture() + "/Account/ChangeProfile/2/" + userid;

        popupwindow(url, "", 600, 400);
    });

    var openChangeProfilePopWindows = function(indexid)
    {

        var userid = $("#user_id").val();
        $("#index_id").val(indexid);

        //var url = baseURL + "changeprofileinfo.html?index_id=1&user_id=" + userid;

        var url = baseURL + getCurrentCulture() + "/Account/ChangeProfile/" + indexid + "/" + userid;
        popupwindow(url, "", 600, 400);
    }

    $("#frm_update_profile").submit(function (e) {
      
     

        var indexid = $("#index_id").val();
        var submit = true;
        if (indexid == 1)
         {
            //check email march if ($("#cfm_email").val() != "" && $("#email").val() != "") 
            if ($("#cfm_email").val() != $("#email").val()) {
                $("#email_error").text(MSG_EMAIL_NOT_MATCH);
                $("#cfm_email").focus();
                submit= false;
            }
            else {
                $("#email_error").text("");
                submit= true;
            }
        
        }
        else if(indexid==2)
        {
            //check password;
            if ($("#new_password").val() != $("#cfm_password").val()) {
                $("#email_error").text(MSG_PASSWORD_NOT_MATCH);
                $("#new_password").focus();
                return false;
            }

        }
        if (submit)
            {
            var uri = baseURL + "api/updateprofile";
            var formID = this.id;
            postForm(uri, formID,indexid);

        }
        else {
         
        }

        e.preventDefault();
        return false;

    });
    var postForm = function (uri, submitForm, indexid) {
        var jqFormID = "#" + submitForm;

        var frmPost = $.post(uri, $(jqFormID).serialize())
          .success(function (data) {
              if (indexid == 1)//email
                  {
                  if (data == 2) { // wrong password
                                           
                      $("#email_error").text(MSG_WRONG_PASSWORD);
                      $("#password").focus();
                  }
                  else if (data == 1) { //email taken
                      $("#email_error").text(MSG_EMAIL_TAKEN);
                      $("#email").focus();
                  }
                  else if (data == 0)// sucessed
                  {
                      window.close();
                      window.opener.pageClose();
                  }
                          //  reSetForm(data, submitForm)
              }
              else {
                  if (data == 0) {
                      $("#email_error").text(MSG_WRONG_PASSWORD);
                      $("#old_password").focus();
                  }
                  else {
                      window.close();
                      window.opener.pageClose();
                  }
              }

          })
          .error(function () {
              alert(MSG_ERROR_POSTING);
          });


        return false;
    };


    function popupwindow(url, title, w, h) {
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }

    var refreshPage = function () {

      
        var indexid = $("#index_id").val();
        var userid = $("#user_id").val();
  
        if (indexid == 1) {
            alert(MSG_SUCCESS_EMAIL_UPDATE)
            getEmailByUserid(userid);
        }
        if (indexid == 2) {
            alert(MSG_SUCCESS_PASSWORD_UPDATE)
          
        }
    }
    callBackReload = refreshPage;



    //validation


}(jQuery);


function pageClose(fieldIndex) {
  
    callBackReload();
}