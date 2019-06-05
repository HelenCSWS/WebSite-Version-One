var NEWSLETTER_URI = baseURL+'api/newsletter';
var NEWSLETTER_FORM_ID = "fm_newsletter";

var FEEDBACK_URI = baseURL + 'api/feedback';
var FEEDBACK_FORM_ID = "fm_feedback";

var SHAREGALLERY_URI = baseURL + 'api/sharegallery';
var SHAREGALLERY_FORM_ID = "fm_sharegallery";

var formInfo = { "fm_newsletter": { URI: baseURL+"api/newsletter" }, "fm_feedback": { URI: baseURL+"api/feedback" }, "fm_sharegallery": { URI: baseURL+"api/sharegallery" } };

(function ($) {

    $(".pageForm").submit(function (e) {
       
        var formID = this.id;

  //      console.log("submit");
   
        postForm(formInfo[formID].URI, formID);
        e.preventDefault();
        return false;
    });

    
    var postForm = function (uri, submitForm)
    {
        $(".culture_code").val(getCurrentCulture());

         var jqFormID = "#" + submitForm;
         var frmPost = $.post(uri, $(jqFormID).serialize())
          .success(function (data) {
              responseSubmit(data, submitForm);
          })
          .error(function () {
              alert(MSG_ERROR_POSTING);
          });    
         return false;
    };

    //function for callback function from webapi
    var responseSubmit = function (data, submitForm)
    {
        if (data == 1) {
            if (submitForm == NEWSLETTER_FORM_ID)
                alert(MSG_SUCCESS_NEWSLETTER);
            if (submitForm == FEEDBACK_FORM_ID)
                alert(MSG_SUCCESS_FEEDBACK);
            if (submitForm == SHAREGALLERY_FORM_ID) {
                var msg = MSG_COVER_ART + "\n" + $("#share_info").val() + "\n" + MSG_HAS_SENT;
                alert(msg);
                grecaptcha.reset();
            }

            resetForm(submitForm);
        }
        else if(data==100)//gRechaptcha failed
            alert(MSG_RECAPTCH_CONFIRM);
        else
            alert(MSG_ERROR_POSTING);

    }

    //reset all inputs 
    var resetForm = function (submitForm) {        
        document.getElementById(submitForm).reset();
    }


})(jQuery);

//subscribr checkbox
(function ($) {
    $("#isSend").on("click", function (e) {
        $("#isSubscribe").val(($("#isSend").is(':checked')) ? 1 : 0);
    });

})(jQuery);
