



+function ($) {
  'use strict';


  //$(window).on('load', function () {
  $(document).ready(function () {
    
      //http://localhost:65077/en-ca/Account/Signup

      if (getURLPara(3).toLowerCase() == "activeaccount")
      {
          var active_id = getURLPara(4);
    
          activeAccount(active_id);

      }
      else if (getURLPara(3).toLowerCase() == "resetpassword") {
          //http://localhost:65077/zh-hk/Account/resetpassword/1f3ac09b-e6a8-41a0-b6f0-7dd51c392400
         // var rstid = GetURLParameter("key");
          var rstid = getURLPara(4);
          $("#input_reset_id").val(rstid);
          
          if (rstid == null)
          {
              $(".retrive").hide();
              $(".sExpired").show();
              return false;
          }
          var uri = baseURL+"api/ReSetAccount?guid=" + rstid;
          $.getJSON(uri).done(function (data) {
              if(data==0)
              {
                  $(".retrive").hide();
                  $(".sExpired").show();
              }
              else if (data == 1) {
                  $(".retrive").show();
                  $(".sExpired").hide();
              }
          });
      }
      else if (getURLPara(3).toLowerCase() == "signup")
      {
        
          //get country
          var uri = baseURL + "api/cswscomm/1" + "?selectorName=country";
   
         $.getJSON(uri).done(function (data) {
     
             setCountrySelector(data, "select_country", MSG_SELECT_COUNTRY);
           //  setSelector(data, "select_country", MSG_SELECT_COUNTRY);
          });
       
      }
      else if (getURLPara(3).toLowerCase() == "signin")
      {
        var email = readCookie(COOKIE_CSWS_SIGN_IN_EMAIL);
        var password = readCookie(COOKIE_CSWS_SIGN_IN_PASS);
        if (email != null)
            $("#input_email").val(email);
        if (password != null)
            $("#input_pass").val(password);
      }
  });



    //get city
  $("#select_country").on("change", function (e) 
  {
      if($("#select_country").val()!="")
      {
          
          var uri = baseURL+"api/cswscomm/2" + "?selectorName=" + $("#select_country").val();

          $.getJSON(uri).done(function (data) {

              setSelector(data, "select_city", MSG_SELECT_City);
          });
      }
      
  });
      
 
  $(".btn_active").on("click", function () {
      location.href = "/";
      return false;
  });
 
      
  var setCountrySelector = function (arrayVals, selectorName, allTitle) {

      var selectCtl = "#" + selectorName;

      $(selectCtl)[0].options.length = 0;

      var htmlSelect = "<option value=''>" + allTitle + "</option>";

      $(selectCtl).append(htmlSelect);

      var i = 0;
      var countryName = "";

      var countryCulture = "";

      if (arrayVals != null) {

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
  var setCountrySelector1 = function (arrayVals, selectorName, allTitle) {

      var selectCtl = "#" + selectorName;
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

              countryCulture = item;

              if (getCurrentCulture() != "en-ca") {
                  countryCulture = getCountryCulture(item);
              }

              if (countryCulture != "undefined")
                  htmlSelect = "<option value='" + item + "'>" + countryCulture + "</option>";

            //  htmlSelect = "<option value='" + coutnryName + "'>" + countryCultureName + "</option>";
              $(selectCtl).append(htmlSelect); //'<option value="option6">option6</option>' 
          }
      }
  }

  var setSelector = function (arrayVals, selectorName,selectTitle) {

     
      var selectCtl = "#" + selectorName;
    

      $(selectCtl)[0].options.length = 0;

      

      var htmlSelect = "<option value=''>"+selectTitle+"</option>";
    
          $(selectCtl).append(htmlSelect);
    

      var i = 0;

      if (arrayVals != null) {
        
          $(selectCtl).show();
          $.each(arrayVals, function (key, item) {

             /* if (cityName != "" && cityName == item) {
                  htmlSelect = "<option selected value='" + item + "'>" + item + "</option>";
              }
              else*/
                  htmlSelect = "<option value='" + item + "'>" + item + "</option>";

              $(selectCtl).append(htmlSelect);
          });
          i++;
      }
      
  }


  var activeAccount=function(active_id)
  {
   
      var uri = baseURL + "api/SignAccount?guid=" + active_id;
      
      $.getJSON(uri).done(function (data) {
        

          if (data == "-1")//expired
          {
              var fname = MSG_DEAR_MEMBER;
              $("#fname").text(fname);
              $(".act_failed").show();
              $(".act_actived").hide();
          }
         else
          {
              $(".act_failed").hide();
              $(".act_actived").show();
              var fname = MSG_Member;
              if (data != "")
                  fname= data;
              fname = MSG_Dear + fname + ","
              $("#fname").text(fname);
          }
              

      });
 
  }


  $(".btn_signup").on("click", function () {
     
 			location.href = "Signup";          
			return false;      
		});   


  //$(".btn_signup_submit").on("click", function () {

  //    alert("sub");
  //    return false;
  //});

  //$(".pageForm").submit(function (e) {

  //    var formID = this.id;

  //    postForm(formInfo[formID].URI, formID);
  //    e.preventDefault();
  //    return false;
    //});

  
  $("#frm_signup").submit(function (e) {
   
      if (isValidForm(1))
      {
          $(".culture_code").val(getCurrentCulture());
          var uri =baseURL+ "api/signAccount";
          var formID = this.id;
          postForm(uri, formID);  
      }
          
          e.preventDefault();
          return false;
     
  });

  $("#user_type_id").on('change', function (e) {
      if($(this).val()!="0")
          $("#industry_error").text("");
  });

  $(".email").on('change', function (e) {

      var ctlname = ($(this).attr("name"));   
      if (getURLPara(3).toLowerCase() == "signup") {
          if (ctlname == "email") {

              if ($("#email").val() != "") {
                  isDuplicateEmail($("#email").val());
              }
          }
          else {
              isEmailsSame();
          }
      }
      else if (getURLPara(3).toLowerCase()  == "changeprofile")
      {
         
            if (ctlname == "email") {
                if ($("#email").val() != "") {
                    var user_id = $("#user_id").val();
                    var uri = baseURL+"api/AccountProfile?userid=" + user_id + "&email=" + $("#email").val();
                    $.getJSON(uri).done(function (data) {
                        if (data == 1)//duplicate
                        {
                            $("#email_error").text(MSG_EMAIL_TAKEN);
                            $("#email").focus();
                            return false;
                        }
                        else {
                           
                            $("#email_error").text("");
                            isEmailsSame();
                        }
                    });
                }
                else
                {
                    $("#email_error").text("");
                }
            }
            else {
                isEmailsSame();
            }
      }
  });

  var isEmailsSame=function()
  {
      
      if ($("#cfm_email").val() != "" && $("#email").val() != "") {
          if ($("#cfm_email").val() != $("#email").val()) {
              $("#email_error").text(MSG_EMAIL_NOT_MATCH);
              $("#cfm_email").focus();
              return false;
          }
          else {
              $("#email_error").text("");
              return true;
          }
      }
  }
  var isDuplicateEmail=function(email)
  {
     
      var uri = baseURL+"api/SignAccount?email=" + email;

      $.getJSON(uri).done(function (data) {

        
          if (data == 1)//duplicate
          {
              
              $("#email_error").text(MSG_EMAIL_TAKEN);
              $("#email").focus();
              return false;

          }
          else {
              $("#email_error").text("");
              isEmailsSame();
          }

      });
  
  }

  var isValidForm=function(form_id)
  {
   
      if(form_id==1)//signup
      {
         
          if($("#user_type_id").val()==0)
          {
            //  document.getElementById("user_type_id").setCustomValidity("Please select industry type.");
            //  alert(MSG_SELECT_INDUSTRY_TYPE);
              $("#industry_error").text(MSG_SELECT_INDUSTRY_TYPE);
              $("#user_type_id").focus;
              return false;
          }
          else{
              document.getElementById("user_type_id").setCustomValidity("");
              $("#industry_error").text("");
          }
 
          if ($("#email").val() != $("#cfm_email").val()) {
              //alert("Email address not matched.");
              
              $("#email_error").text(MSG_EMAIL_NOT_MATCH);
              return false;
          }
          if ($("#password").val().length<6)
          {
            
              $("#signup_password_error").text(MSG_PASSWORD_LENGTH);
              return false;
          }
          if ($("#password").val() != $("#cfm_password").val())
          {
              $("#signup_password_error").text(MSG_PASSWORD_NOT_MATCH);
              $("#password").focus();
              return false;
          }

          return true;
      }
      if (form_id ==2)//reset password
      {
          if ($("#password").val().length < 6) {
              alert(MSG_PASSWORD_LENGTH);
              $("#input_pass").focus();
              return false;
          }

          if ($("#password").val() != $("#cfm_password").val()) {
              alert(MSG_PASSWORD_NOT_MATCH);
              $("#password").focus();
              return false;
          }
      

          return true;
      }
  }

  $("#frm_resetp").submit(function (e) {
      if (isValidForm(2)) {
          var uri = baseURL+"api/resetaccount";
          var formID = this.id;
          postForm(uri, formID);
          
      }

      e.preventDefault();
      return false;

  });
  $("#frm_signin").submit(function (e) {

      $(".culture_code").val(getCurrentCulture());
      var uri = baseURL + "api/checkuser";
      var formID = this.id;
      postForm(uri, formID);
      e.preventDefault();
      return false;

  });
  $("#frm_forgetpass").submit(function (e) {
      $(".culture_code").val(getCurrentCulture());
      var uri = baseURL + "api/checkuser";
      var formID = this.id;
      postForm(uri, formID);
      e.preventDefault();
      return false;

  });
  var postForm = function (uri, submitForm) {
     
      var jqFormID = "#" + submitForm;
      var frmPost = $.post(uri, $(jqFormID).serialize())
        .success(function (data) {
            
            reSetForm(data, submitForm)
        })
        .error(function () {
            alert(MSG_ERROR_POSTING);
        });
      return false;
  };

  var reSetForm=function(data,submitForm)
  {
      if(submitForm=="frm_signup")
      {
          if (data == 1) {
              alert(MSG_SUCCESS_SIGNUP);
              document.getElementById(submitForm).reset();
          }
          else if (data == -1) {
              alert(MSG_EMAIL_TAKEN);
          }
      }
      else if (submitForm=="frm_signin")
      {          
          if (data == 0) {
              $("#email").focus();
              alert(MSG_EMAIL_NOT_EXIST);

          }
          else if (data == 1) {
              alert(MSG_ACCOUNT_NOT_APPROVED);
          }
          else if (data == 2) {
              alert(MSG_WRONG_PASSWORD);
          }
          else {
              startSignIn(data);
          }
      }
      else if (submitForm == "frm_forgetpass") {
   
          if (data == 0) {
              alert(MSG_EMAIL_NOT_EXIST);

          }
          else if (data == 1) {
              alert(MSG_ACCOUNT_NOT_APPROVED);
          }
         
          else if (data == 3) {
              alert(MSG_SENT_RESET_EMAIL);
              location.href = CSWS_DOMAIN;
              return false;
          }
      }
      else if (submitForm == "frm_resetp") {
          alert(MSG_SUCCESS_PASSWORD_UPDATE);
          location.href = "../Signin";

          return false;
         
      }
  }

  var startSignIn = function (data)
  {
      
        //create loged in cookie
        createCookie(COOKIE_CSWS_USER_SESSION, data, 0.2);
 
        createCookie(COOKIE_CSWS_USER_SESSION, data, 0.2, CSWS_DOMAIN_INDUSTRY_HTTPS);

        if ($(".sendCheckbox").is(':checked')) {
            //save email and password
            createCookie(COOKIE_CSWS_SIGN_IN_EMAIL, $("#input_email").val(), 15);
            createCookie(COOKIE_CSWS_SIGN_IN_PASS, $("#input_pass").val(), 15);

            createCookie(COOKIE_CSWS_SIGN_IN_EMAIL, $("#input_email").val(), 15, CSWS_DOMAIN_INDUSTRY_HTTPS);
            createCookie(COOKIE_CSWS_SIGN_IN_PASS, $("#input_pass").val(), 15, CSWS_DOMAIN_INDUSTRY_HTTPS);


        } else {
            eraseCookie(COOKIE_CSWS_SIGN_IN_EMAIL);
            eraseCookie(COOKIE_CSWS_SIGN_IN_PASS);
        }
     
      //  location.href = CSWS_DOMAIN_INDUSTRY_HTTPS;
        location.href = "/";  //industry domain
        return false;
            
        //    e.preventDefault();
        //    return false;
  }


}(jQuery);