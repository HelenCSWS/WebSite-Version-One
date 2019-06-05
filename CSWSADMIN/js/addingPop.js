(function ($) {

    $(window).on('load', function () {

            var fieldIndex = GetURLParameter("id");
            $("#fieldIndex").val(fieldIndex);
            if ($("#fieldIndex").val == "0")
                alert("PageLoading is wrong, contact admin!");
            if (parseInt(fieldIndex) == 1)
                document.title = "Add Career";
            if (parseInt(fieldIndex) == 2)
                document.title = "Add Prefix";
      
    });

    $("#btn_Save").on('click', function (e) {
        var uri = "../api/AddingFieldValue/";
        var fdid = $("#fieldIndex").val();

        if (fdid.val == "0")
            alert("PageLoading is wrong, contact admin!");

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
                    $("#fieldValue").focus();
                });
        return false;
    });

    $("#btn_Close").on('click', function (e) {
        window.close();
        window.opener.AddingDone($("#fieldIndex").val());

    });
    
    
})(jQuery);