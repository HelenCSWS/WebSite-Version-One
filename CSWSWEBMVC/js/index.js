
(function($) {
		
    /*================================= Events handlers ======================================================================================*/

    // loading page
    $(document).on('ready', function () {
     // eraseCookie("csws_pro");
   
    //    alert("index.js");
     //   alert(newtest["France"]);
  //      alert(getCurrentProvinceID());

        
        var proInit = provincesInfo[getCurrentProvinceID()].pro_init;
   
    //    alert(proInit);
        var fakeLink = baseURL + getCurrentCulture() + "/" + proInit;
   
        window.history.pushState("object or string", "Christopher Stewart Wine & Spirits", fakeLink);


        setDefaultProvince();
        // build carosal
        province_id = readCookie(CSWS_COOKIE_CURRENT_PROID);//not permanent on

        if (province_id == "null" || province_id == null) 
        {
            province_id = readCookie(CSWS_COOKIE_PROID);
            createCookie(CSWS_COOKIE_CURRENT_PROID, province_id, 1);
        }    
        buildHeroCarosal(province_id);

        setPortfolioMonthText();
        
    });

    // windows resizing
    $(window).resize(function () {
        province_id = readCookie(CSWS_COOKIE_CURRENT_PROID);
        setHeroCarosalImgs(province_id);
    });


    /*================================= functions ======================================================================================*/

    var setPortfolioMonthText = function ()
    {
        $(".ptfInfoHolder").html(TEXT_PORTFOLIO_MONTH);
    }
    var setDefaultProvince = function () {
    
        //get province_id
        var province_id = readCookie(CSWS_COOKIE_PROID);
       
        if (province_id == null|| province_id == "-1") // no default province yet
        {
            province_id = CSWS_PRO_IDS["BC"];
            $(".province_id").val(province_id);
            selectRegion();
        }

    }

    var selectRegion=function()
    {
        
        var dContent = MSG_SELECT_COUNTRY_DIALOG;
 
        var jc = $.confirm({
            title: MSG_SELECT_REGION,
            content: dContent,
            confirmButton: false,
            cancelButton: false,
            animation: 'scale',
            columnClass: 'col-md-6 col-md-offset-3',
            onOpen: function () {
                getCountries();
                eraseCookie(CSWS_COOKIE_PROID);
                this.$content.find('.rdo_select_proc').click(function ()
                {
                    var pro_id = $(this).attr("pro_id");
               
                    if (pro_id > 0) {
                        createCookie(CSWS_COOKIE_PROID, pro_id, 365);
                        createCookie(CSWS_COOKIE_CURRENT_PROID, pro_id, 365);
                        setLangcodeByProvince(pro_id);
                        $("#select_country").attr("disabled", "true");
                    }
                    else {
                        createCookie(CSWS_COOKIE_PROID, "1", 0.5); // force to select the default province BC, but leave the time as 0.2 day
                        createCookie(CSWS_COOKIE_CURRENT_PROID, "1", 365); // force to select the default province BC, but leave the time as 0.2 day
                        $("#select_country").removeAttr("disabled");
                    }
                })

                this.$content.find('#btn_cnt').click(function () {
                    jc.close();
                })

                this.$content.find('#select_country').change(function () {

                    if ($('#select_country option:selected').text() == "China") {
                        createCookie(CSWS_COOKIE_PROID, CSWS_PRO_IDS["HK"], 365);
                    }
                    else
                        createCookie(CSWS_COOKIE_PROID, CSWS_PRO_IDS["BC"], 365);

                   var langcode = $(this).val();

                   setCurrentCulture(langcode);
                    loadPageByCookie();
                })
            },
            onClose: function () {

                if (readCookie(CSWS_COOKIE_PROID) == null) {
                    createCookie(CSWS_COOKIE_PROID, CSWS_PRO_IDS["BC"], 0.5); // force to select the default province BC,but leave the time as 0.5 day
                }
                loadPageByCookie();

            }
        });
    }

    var setLangcodeByProvince=function(proId)
    {
        var langcode = CULTURE_CODE_EN_CA;
        if (proId == CSWS_PRO_IDS["QC"])// fr-ca QB
        {
            langcode = CULTURE_CODE_FR_CA;
        }
        else if (proId == CSWS_PRO_IDS["HK"]) //HK zh-cn
            langcode = CULTURE_CODE_ZH_HK;
        
        setCurrentCulture(langcode);

    }

    var setLangcodeByCountry = function (langcode)
    {
        setCurrentCulture(langcode);
    }
    
        var loadPageByCookie=function()
        {
            
            location.href = "/"+getCurrentCulture();
            return false;
        }

    /*arrayVals = country|langcode*/
        var setSelector = function (arrayVals, selectorName, selectTitle)
        {
	        var selectCtl = "#" + selectorName;
		    $(selectCtl)[0].options.length = 0;
		    var htmlSelect = "<option value=''>" + selectTitle + "</option>";
		    $(selectCtl).append(htmlSelect);

		    var i = 0;
		    var vals = "";
		    var country = "";
		    var langcode = "";
		    if (arrayVals != null) {

		        $(selectCtl).show();
		        $.each(arrayVals, function (key, item) {

		            vals = item.split("|");
                     
		            country = vals[0];
		            
		            langcode=vals[1];
		            if(country!="Canada")
		                htmlSelect = "<option data-langcode='" + langcode + "' value='" + langcode + "'>" + country + "</option>";

		            $(selectCtl).append(htmlSelect);
		        });
		        i++;
		    }
		    $(selectCtl).attr("disabled", "true");
		}
		
		var getCountries = function () {
		   // get country and langcode
		    var uri = baseURL+ "api/cswscomm/3" + "?selectorName=country";
		    $.getJSON(uri).done(function (data) {

		        setSelector(data, "select_country", "Select country");
		    });
		}
		
		var setHeroCarosalImgs=function(province_id)
		{
		    var imgNs = provincesInfo[province_id].heroImgs;
	
		    for (i = 1; i <= imgNs; i++)
			{
				var imgHolderClsName=".carosal_img_"+i.toString();
				var imageSrc = getHeroCarosalImg(province_id,i);
				$(imgHolderClsName).css("background-image",imageSrc);
			}
		}

		
		var getHeroCarosalImg=function(province_id,itemIndex)
		{
		    var culture = getCurrentCulture();
		    var image_culture = "";

		
		    if ((culture == CULTURE_CODE_FR_CA && province_id == CSWS_PRO_IDS["QC"]) || (culture == CULTURE_CODE_FR_CA && province_id == CSWS_PRO_IDS["NB"])) // fr-ca and NB,QC
		        image_culture = "/" + CULTURE_CODE_FR_CA;
		    if (culture == CULTURE_CODE_ZH_HK && province_id == CSWS_PRO_IDS.HK) // zh-hk and HK
		        image_culture = "/"+CULTURE_CODE_ZH_HK;

		    var imageSrc = 'url("../images/welcome/' + provincesInfo[province_id].pro_init + image_culture + '/hero_banner_' + itemIndex.toString() + '.jpg")';

			if($( window ).width()<510)
				imageSrc = 'url("../images/welcome/' + provincesInfo[province_id].pro_init +image_culture+ '/small_hero_banner_' + itemIndex.toString() + '.jpg")';
			return imageSrc;
				
		}
		
		var buildHeroCarosal = function (province_id)
		{
		    var carosalItemClass = "";
		    var carosalHeroIndicator_li = "";
		    var imgHolderClsName = "";
		    var carolink = "<a hyperlink='google.com' class=></a>";
		    for (i = 1; i <= provincesInfo[province_id].heroImgs; i++) {
		        if (i == 1) {
		            carosalItemClass = 'item active carosal_img_1';
		            if (provincesInfo[province_id].heroImgs > 1)
		                carosalHeroIndicator_li = '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
		        }
		        else {
		            carosalItemClass = 'item carosal_img_' + i.toString();
		            carosalHeroIndicator_li = '<li data-target="#myCarousel" data-slide-to="' + (i - 1).toString() + '"></li>';
		        }
		
	           $("<div>", { class: carosalItemClass, }).appendTo('.carousel-inner');
	           $(".carousel-inner a").attr("target", "_blank");
	

		        imgHolderClsName = ".carosal_img_" + i.toString();
		        var imageSrc = getHeroCarosalImg(province_id, i);

		        $(imgHolderClsName).css("background-image", imageSrc);
		        $(".carousel-indicators").append(carosalHeroIndicator_li);
		    }
		   
		    i = 1;
		    var hLink = "";
		    $('.carousel-inner a').each(function () {               
		        hLink = provincesInfo[province_id].carolinks[i];
                if(hLink!="")s
		            $(this).attr("href", hLink);
		        i++;
		    });
		}		
})(jQuery);

/*
	======================================== load quote ==================================================
*/
(function($) {

		$(function () {
		    displayQuote();
		});
		
		var displayQuote=function()
		{
		    var url = baseURL + "api/quotes/0?cursor_id=0";
		    $.getJSON(url).done(function (data)
            {
                if (isValidData(data))
                {                 
	                var fname= getFieldVal(data, "first_name");
	                var mname = getFieldVal(data, "middle_name");
	                var lname = getFieldVal(data, "last_name");

	                var author = getAuthorName(fname, mname, lname);
	                author = author.trim();
	                if (author == '')
	                    author = MSG_UNKNOW;

	                var quote = '"' + getFieldVal(data, "quote") + '"';
	                $(".quote_text").text(quote);                 
	                $(".quote_author").text(author);
	                $("#quote_id").val(getFieldVal(data, "quote_id"));

	                var rootlink = CSWS_DOMAIN;
                    
	                if(readCookie(COOKIE_CSWS_USER_SESSION)!=null)
	                    rootlink=CSWS_DOMAIN_INDUSTRY_HTTPS;

	                var link = rootlink+"/"+getCurrentCulture()+"/Quote?quote_id=" + getFieldVal(data, "quote_id");
	                $(".quote_img_link").attr("href", link);
	                $("#quote_link").attr("href", link);
	                $(".quote_center_holder").show();
	                $(".quote_clickview").show();
                }		    
            });
		}
	 
})(jQuery);