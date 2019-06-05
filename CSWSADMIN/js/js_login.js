 



+function ($) {
    'use strict';


    $(document).on('ready', function () {

       
          // alert(getHtmlFileName());

        if (getHtmlFileName() == "index") {

            var username = readCookie("admin_user");
            var password = readCookie("admin_pass");


            if (username != null)
                $("#input_username").val(username);
            if (password != null)
                $("#input_userpass").val(password);

            //alert("load");
        }
        else
        {
            checkUserSession();
        }
       
    });

   

    var checkUserSession = function()
    {
        var adminSession = readCookie("admin_session");

        if(adminSession==null)
        {
          //  alert("check session");
            location.href = "index.html";
            return false;
        }
    }

   
    $("#frm_admin_login").submit(function (e) {
       // alert("post");
        var uri = "api/adminuser";
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
              alert("Error on posting the page.");
          });

        return false;
    }

    var reSetForm = function (data, submitForm) {
        if (submitForm == "frm_admin_login") {
         
            if (data == 0) {
               
                startLogin();
            }
            else if (data == 1) {
                alert("User name is not valid.");
                $("input_username").focus();
                return false;
            }
            else if (data == 2) {
                alert("Password is not correct.");
                $("input_userpass").focus();
                return false;
            }
          
        }
    }

    var startLogin = function () {

      //  alert("login");
        //create log in cookie
        eraseCookie("admin_session");
        createCookie("admin_session", getGuid(), 0.2);

        if ($(".rememberCheckbox").is(':checked')) {

        //    alert("remember");
            //save email and password
            createCookie("admin_user", $("#input_username").val(), 15);

            createCookie("admin_pass", $("#input_userpass").val(), 15);

            //erase cookie
        }
        else {
            eraseCookie("admin_user");
            eraseCookie("admin_pass");
        }

        location.href = "entry.html";
        return false;

        //    e.preventDefault();
        //    return false;
    }


}(jQuery);