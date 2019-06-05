

(function ($) {
    'use strict';

    $(document).on('ready', function () {
        
        setProvinceMap();

    });

    var setProvinceMap = function () {

        var proid = getProID();
        proid = parseInt(proid);

      //  alert(proid);
        $(".mapimage").attr("src", (provincesInfo[proid].pro_map));
        setProvinceTextColor(proid, true);

    };

    var setProvinceTextColor = function (currentProid, isHighlight) {

        var proid = getProID();
        proid = parseInt(proid);

        $('.region_row').find('a').each(function (e) {
            var activeProId = $(this).attr('data-proid');

            if (activeProId == currentProid) {
                setElementColor(this, isHighlight);
            }

            if (activeProId == proid) {
                if (proid != currentProid)
                    setElementColor(this, !isHighlight);
            }

        });

    };

    /*0 --- black; 1-- blue*/
    var setElementColor = function (objTextCtl, isHighlight) {

        if (!isHighlight)
            $(objTextCtl).css({ "color": "black" });
        else
            $(objTextCtl).css({ "color": "#6892D0" });

    };
    $(".region_row a").mouseleave(function (e) {
        var current_proid = $(this).attr("data-proid");
        setProvinceTextColor(current_proid, false);
        setProvinceMap();
    });

    $(".region_row a").mouseover(function (e) {
        var current_proid = $(this).attr("data-proid");
        var current_proid = parseInt(current_proid);
        $(".mapimage").attr("src", (provincesInfo[current_proid].pro_map));
        setProvinceTextColor(current_proid, true);

    });

    $(".region_row a").on('click', function (e) {
        var currentpro = $(this).attr("data-proid");
        eraseCookie(CSWS_COOKIE_CURRENT_PROID);
        createCookie(CSWS_COOKIE_CURRENT_PROID, currentpro, 365);
        location.href = "/";
 
        return false;
    });



})(jQuery);
