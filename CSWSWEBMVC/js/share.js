(function ($) {

   

    //http://localhost:65077/zh-hk/share/baseinfo/Title

    $(window).on('load', function () {
     
        var shinfo = decodeURIComponent(getURLPara(4));

        $("#share_base").val(getURLPara(3));
        $("#share_info").val(shinfo);

    });


})(jQuery);

