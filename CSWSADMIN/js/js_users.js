
if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery') }


(function ($) {

    $(document).on('ready', function () {

      
        var status = GetURLParameter("status");

        if (status == null)
            status = -1;

        $("#select_status").val(status);
        displayUsers(status);
       


     
    });

 var displayUsers = function(statusid)
        {
     // alert("test002");

     /*statusid: 0 all; 1 not actived; 2 actived*/
     var uri = "api/users/" + statusid;
     /* u.user_id,trim(concat(trim(first_name), ' ', trim(last_name))) user, u.company, ind.industry_type,u.city,u.country, u.email,"+
                                "cast(ac.is_actived as char) status" +*/
   //  alert(uri);
     var rows = 0;
     var i = 0;
     var row = 0;
     var user_id = 0;
     //var username = "";
     //var company = "";
     //var country = "";
     //var city = "";
     //var email = "";
     //var industry_type = "";
     //var status = "";

     var tdHtml = "";
     var tdHtmls = "";
     var trHtml = "";
     var trHtmls = "";
     var htVal = "";
     $.getJSON(uri).done(function (data) {

         rows = data.length;
         if (rows == 0)
             alert("No record found.");
         else {
             $("#grid > tbody").html("");

             for (i = 0; i < rows; i++) {
                 tdHtmls = "";
                 trHtmls == "";

                 user_id = data[i][0];
                 //username = data[i][1];
                 //company = data[i][2];
                 //country = data[i][3];
                 //city = data[i][4];
                 //email = data[i][5];
                 industry_type = data[i][6];
                 status = data[i][7];
                 for (j = 0; j < 8; j++) {

                     htVal = data[i][j];
                    
                    
                     if (j == 7)
                     {
                       //  alert(htVal);
                         if (htVal == "0")
                             htVal = "Not Actived";
                         if (htVal == "1")
                             htVal = "Actived";
                         if (htVal == "2")
                             htVal = "Approved";

                         var idname = "status_" + user_id;
                 //        alert(idname);
                         tdHtml = "<td id='"+idname+"'>" + htVal + "</td>";
                     }
                     else {
                         tdHtml = "<td>" + htVal + "</td>";
                     }

                     
                     tdHtmls = tdHtmls + tdHtml;

                 }

                 trHtml = "<tr>" + tdHtmls + "</tr>";
                 trHtmls = trHtmls + trHtml;

             }

             //    console.log(trHtmls);

             $("#grid >tbody").append(trHtmls);
             initGrid();

            
             //  alert("done");

         }
     });

     var initGrid = function () {
        // $("#grid").bootgrid()
        //.on("load.rs.jquery.bootgrid", function (e) {
        //    alert("load");
        //    /* your code goes here */
         //});

         //$('[data-toggle="tooltip"]').tooltip();

         $("#grid").bootgrid({
             //formatters: {
             //    "link": function (column, row) {
             //        return "<a href=\"#\">" + column.id + ": " + row.id + "</a>";
             //    }
             //},
             //formatters: {
             //    "tooltip": function (column, row) {
             //        return "<span title=\"" + row.id.trim() + "\">" + row.id + "</span>";
             //    },
             //},

             rowCount: [-1, 10, 50, 75]
         });
         
         //$("#grid").bootgrid().on("loaded.rs.jquery.bootgrid", function () {
         //    rowCount: [-1, 10, 50, 75];
            
            
         //});

     //    $("#grid").bootgrid({ rowCount: [-1, 10, 50, 75] });

         $("table").tooltip({
             selector: "[data-toggle='tooltip']"
         });


         $(".search").hide();
     }
 
     $("#activeBtn").on("click", function () {
         UpdateUserStatus(0);
     });

     $("#revokeBtn").on("click", function () {
   
         UpdateUserStatus(1);

     });

     var UpdateUserStatus = function(isRevoke)
     {
         $("#activeTag").val(isRevoke);

         $("#activeids").val($("#grid").bootgrid("getSelectedRows"));
          if ($("#activeids").val() != "")
             postForm();
     }

     //var test = function () {
      
     //    var i = 0;
     //    $("#grid tr").each(function (index) {
           
     //        if (i > 0)
     //        {
     //            alert(i);
     //           var ctlName = $(this).attr("data-row-id");
     //            alert(ctlName);
     //            var status = $(this).find('td:last').html();
     //            alert(status);
     //        }
     //        i++;
     //    }); 
     //}
     var postForm = function () {
         var uri = "api/users/";
         var jqFormID = "#activeuser";
         var frmPost = $.post(uri, $(jqFormID).serialize())
           .success(function (data) {
               
            if( $("#activeTag").val()==0)
                alert("Selected users has been approved!");
            else
                alert("Selected users has been revoke!");
               
            var status = $("#select_status").val();
            if (status == -1)
                location.href = "signupdetails.html";
            else
                location.href = "signupdetails.html?status=" + status;
              // displayUsers();

           })
           .error(function () {
               alert("Error on posting the page.");
           });


         return false;
     };

     $("#select_status").on("change", function () {
         //  alert($("#grid").bootgrid("getSelectedRows"));
      
       //  alert($(this).val());
         var status = $(this).val();

         var link = "signupdetails.html";
         if(status!="-1")
             link = "signupdetails.html?status=" + status;

         location.href = link;

     });

  


  

}
})(jQuery);



