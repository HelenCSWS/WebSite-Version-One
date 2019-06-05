

(function ($) {
    $.fn.tactile = function (swipe) {
        return this.each(function () {
            var $this = $('.connected-carousels .stage'),
                isTouching = false,
                startTime,
                debut;                                // means start in french

            $this.on('touchstart', debutGeste);

            function debutGeste() {               // means start of gesture
                if (event.touches.length == 1) {
                    debut = event.touches[0].pageX;
                    startTime = new Date().getTime();
                    isTouching = true;
                    $this.on('touchmove', geste);
                }
            }

            function finGeste() {                 // means end of gesture
                $this.off('touchmove');
                isTouching = false;
                debut = null;
            }

            function geste() {                   // geste means gesture
                if (isTouching) {
                    var actuel = event.touches[0].pageX,
                        delta = debut - actuel,
                        elapsedTime = new Date().getTime() - startTime;

                    if (Math.abs(delta) >= 50 && elapsedTime < 250) {     // this '100' is the length of the swipe
                        if (delta > 0) {
                            swipe.right();
                        } else {
                            swipe.left();
                        }
                        finGeste();
                    }
                    if (elapsedTime >= 250)
                        finGeste();
                    if (Math.abs(delta) > 20)  //vertical swipe as normal
                        event.preventDefault();
                }
            }
        });
    };
})(jQuery);


/* Last updated: Sat 20 Sep 2014
*/
(function ($) {
    'use strict';

    var animationDuration = 800;
    //var NavCarouselAnimationDisabledTimes = 0;

    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var connector = function (itemNavigation, carouselStage) {
        if (itemNavigation.index() == 0) {
            return carouselStage.jcarousel('items').eq(carouselStage.jcarousel('items').length - 1);
        }
        else {
            return carouselStage.jcarousel('items').eq(itemNavigation.index() - 1);
        }
    };

    var bindControls = function () {
        // Setup controls for the stage carousel
        var carouselStage = $('.carousel-stage').jcarousel();

        $('.prev-stage')
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-stage')
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        // Setup controls for the navigation carousel
        $('.prev-navigation')
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1',
                carousel: carouselStage
            });

        $('.next-navigation')
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1',
                carousel: carouselStage
            });


    };

    // Function to load images for a given year
    // image file are stored in sub folders named by year under img folder
    // two image files per month (e.g. January -> img1.jpg and img1_thumb.jpg, September -> img9.jpg and img9_thumb.jpg)
    var loadYear = function (year, firstTime) {

        firstTime = typeof firstTime !== 'undefined' ? firstTime : false;
        // get new images
        //var template = '<li><img src="images/covers/{year}/img{month}.jpg" width="340" height="440" alt=""></li>';
        var template = '<li><img src="../images/covers/{year}/img{month}.jpg" alt=""></li>';
        var template_src = "../images/covers/{year}/img{month}.jpg";
        var template_thumb_src = "../images/covers/{year}/img{month}_thumb.jpg";
        var imagesHTML = "";
        var imgsToLoad = 0;
        var carouselStage;
        var carouselNavigation;

        // only some years are valid and each year may not have all months available

        // construct the HTML
        if (typeof years[year] == 'object') {
            //template = template.replace('{year}', year);
            template_src = template_src.replace('{year}', year);
            template_thumb_src = template_thumb_src.replace('{year}', year);
            var stage_container = $('.carousel-stage ul');
            var thumb_container = $('.carousel-navigation ul');

            //if(!firstTime) {
            // need to move to the first item to ensure proper positioning and mapping for newly loaded carousels
            // hide the carousel when moving to the first item to avoid this strange behavior being visible
            $('.connected-carousels .stage').css('visibility', 'hidden');
            $('.connected-carousels .imageText').css('visibility', 'hidden');
            $('.connected-carousels .imageText-prev').css('visibility', 'hidden');
            $('.connected-carousels .prev-stage').css('visibility', 'hidden');
            $('.connected-carousels .next-stage').css('visibility', 'hidden');
            $('.busy-indicator').css('visibility', 'visible').css('left', ($(window).width() - 250) / 2);   //250 is the width of the text
            carouselStage = $('.carousel-stage').jcarousel();
            carouselStage.jcarousel('scroll', 0, false);
            //}

            stage_container.empty();
            thumb_container.empty();

            imgsToLoad = years[year].to - years[year].from + 1;
            //adjust the width of the container to show all thumbnails
            var width = imgsToLoad * 50;   // 58 = 47 (image width) + 2 (item/image left and right border) + 4 (list item margin)
            // also temporarily hide while images are being loaded and grayscale images being generated
            $('.connected-carousels .navigation').css('width', width + 'px').css('visibility', 'hidden');

            for (var i = years[year].from; i <= years[year].to; i++) {
                //main images are simple
                var image = new Image();
                image.src = template_src.replace('{month}', i);
                stage_container.append($("<li>").append(image));
                //imagesHTML += template.replace('{month}', i);

                //thumbnails is more complicated due to grayscale generation
                var thumb = new Image();
                thumb.width = 47;
                thumb.height = 47;
                // have to generate grayscale when image is fully loaded
                thumb.onload = function () {
                    this.onload = null;
                    var el = $(this);
                    el.css({ "position": "absolute" }, { "opacity": "0.5" }).clone().addClass("fader").css({ "position": "absolute", "z-index": "998", "opacity": "0" }).insertBefore(el).queue(function () {
                        var el = $(this);
                        el.parent().css({ "width": this.width, "height": this.height });
                        el.dequeue();
                        //  $(this).css({"opacity":"0.1"});
                    });
                    //console.log(this.src);
                    this.src = grayscale(this);

                    // wait until all thumbnail images are loaded
                    imgsToLoad--;
                    if (imgsToLoad == 0) {
                        // connect the two carousels
                        carouselNavigation.jcarousel('items').each(function () {
                            var item = $(this);

                            // This is where we actually connect two items.
                            var target = connector(item, carouselStage);

                            var year_base = parseInt(item.find('[data-year]').attr('data-year')) + SHARE_YEAR_BASE;

                            var index_base = parseInt(item.find('[data-idx]').attr('data-idx')) + SHARE_INDEX_BASE;

                            var share_info = year_base.toString() + index_base.toString();

                            item
                                .on('jcarouselcontrol:active', function () {
                                    carouselNavigation.jcarousel('scrollIntoView', this);
                                    item.addClass('active');
                                    $('.imageText').text(item.find('[data-aroma]').attr('data-aroma'));
                                    $('.imageText-prev').text(item.find('[data-aroma-prev]').attr('data-aroma-prev'));
                                    $('.shareData').attr('data-year', item.find('[data-year]').attr('data-year'));
                                    if ($(window).width() > 768) {
                                        $('.shareData').attr('data-idx', item.find('[data-idx]').attr('data-idx'));
                                        $('.shareData').attr('data-text', (item.find('[data-aroma]').attr('data-aroma')));
                                    }
                                    else {
                                        $('.shareData').attr('data-idx', item.find('[data-idx-prev]').attr('data-idx-prev'));
                                        $('.shareData').attr('data-text', (item.find('[data-aroma-prev]').attr('data-aroma-prev')));
                                    }

                                    //alert(encodeURIComponent($('.shareData').attr('data-text')));
                                    var shareText = ($('.shareData').attr('data-text'));
                                    shareText = (shareText.replace('&', ' And '));
                                    var sharelink = ("/" + getCurrentCulture() + '/share/' + share_info + '/' + shareText);

                                    $('.Sharelink').attr('href', sharelink);   //grayscale fade-out

                                    item.find('.fader').stop().animate({ opacity: 1 }, animationDuration);
                                })
                                .on('jcarouselcontrol:inactive', function () {
                                    item.removeClass('active');
                                    //grayscale fade-in
                                    /*if(NavCarouselAnimationDisabledTimes > 0) {
                                        NavCarouselAnimationDisabledTimes--;
                                        item.find('.fader').stop().animate({opacity:0}, 0);
                                    }
                                    else*/
                                    item.find('.fader').stop().animate({ opacity: 0 }, animationDuration);
                                })
                                .jcarouselControl({
                                    target: target,
                                    carousel: carouselStage
                                });
                        });

                        bindControls();
                        // scroll to the last image
                        //console.log("scroll to end");
                        var currenttime = new Date();
                        var curretnYear = currenttime.getFullYear();
                        var imageIndex = -1; //first image
                        if (year == curretnYear)//current year : last image, other year: first image , CURRENT YEAR=2018
                            imageIndex = -2;
                        //if ($(window).width() <= 768) {
                        //    //small screen, only one image (the left most) is shown, we need to move the second to the first position
                        //    imageIndex++;
                        //}

                        //workaround until the root cause is found: do the scroll with a delay, otherwise a random issue occurs
                        //on slow (mobile) devices where the wrong image is shown yet the internal data position is correct
                        carouselStage.jcarousel('scroll', imageIndex, false);
                        //NavCarouselAnimationDisabledTimes = 2;

                        //setTimeout(function() {
                        // show the carousels
                        $('.connected-carousels .stage').css('visibility', 'visible');
                        $('.connected-carousels .imageText').css('visibility', 'visible');
                        $('.connected-carousels .imageText-prev').css('visibility', 'visible');
                        $('.connected-carousels .navigation').css('visibility', 'visible');
                        $('.connected-carousels .prev-stage').css('visibility', 'visible');
                        $('.connected-carousels .next-stage').css('visibility', 'visible');
                        $('.busy-indicator').css('visibility', 'hidden');
                        //}, animationDuration);

                        /*if(years[year].to - years[year].from < 2) { // less than 3 images
                            var carousel_width = (years[year].to - years[year].from + 1) * 340;
                            if($(window).width() <= 768)
                                carousel_width = 340;
                            $('.stage').css('width', carousel_width + 'px');
                            $('.prev-stage').show();
                            $('.next-stage').show();
                            $(".stage").off('mouseout');
                            $('.fade-left, .fade-right').css('visibility', 'hidden');
                        }*/
                    }
                };
                thumb.src = template_thumb_src.replace('{month}', i);
                var idx = i - years[year].from;
                $(thumb).attr('data-aroma', years[year].aroma[idx]);
                $(thumb).attr('data-year', year);
                $(thumb).attr('data-idx', i);
                idx--;
                if (idx < 0)
                    idx = years[year].to - years[year].from;
                $(thumb).attr('data-aroma-prev', years[year].aroma[idx]);
                var j = i - 1;
                if (j < years[year].from)
                    j = years[year].to;
                $(thumb).attr('data-idx-prev', j);
                // add thumbnail to the container
                thumb_container.append($("<li>").append(thumb));
            }

            // remove all the current images and add new ones
            //$('.carousel-stage ul').append(imagesHTML);
            // set new width of the list container, used to calculate scroll direction
            var containerWidth = (years[year].to - years[year].from + 1) * 610;
            $('.carousel-stage ul').css('width', containerWidth);

            if (firstTime) {
                // first time initialization
                //var wrap = (years[year].to - years[year].from < 1) ? '' : 'circular';
                carouselStage = $('.carousel-stage').jcarousel({ wrap: 'circular', animation: { duration: animationDuration, easing: 'swing' }, transitions: true });
                carouselNavigation = $('.carousel-navigation').jcarousel();
            } else {
                // re-load carousels
                carouselStage = $('.carousel-stage').jcarousel('reload');
                carouselNavigation = $('.carousel-navigation').jcarousel('reload');
            }
            carouselStage.on('jcarousel:reload jcarousel:create', function () {
                var element = $(this),
                    width = element.innerWidth();

                //if (width < 768) {
                //    element.jcarousel('items').css('width', width + 'px');
            });
        }

        $(document).tactile({
            left: function () {
                carouselStage.jcarousel('scroll', '-=1');
            },
            right: function () {
                carouselStage.jcarousel('scroll', '+=1');
            }
        });

        //$('.prev-stage').hide();
        //$('.next-stage').hide();
    };

    // Starting point
    $(function () {
        if ($(window).width() < 350) {
            var viewportContent = "width=340, minimum-scale=0.8, maximum-scale=0.8, initial-scale=0.8";
            // document.getElementById('viewport').setAttribute('content', viewportContent);
        }
        if ($(window).width() > 768) {
            $(".stage").on('mouseover', function (e) {
                e.preventDefault();
                $('.prev-stage').show();
                $('.next-stage').show();
            });

            $(".stage").on('mouseout', function (e) {
                e.preventDefault();
                $('.prev-stage').hide();
                $('.next-stage').hide();
            });
        } else {
            $(".stage").off('mouseout');
        }

        //store initial window size
        $(window).data("old-width", $(window).width());

        $(window).resize(function () {
            if ($(window).width() <= 768) {
                $('.prev-stage').show();
                $('.next-stage').show();
                $(".stage").off('mouseout');
                if ($(window).data("old-width") > 768) {
                    //need to move right
                    $('.next-stage').click();
                }
            } else {
                $(".stage").on('mouseout', function (e) {
                    e.preventDefault();
                    $('.prev-stage').hide();
                    $('.next-stage').hide();
                });
                if ($(window).data("old-width") <= 768) {
                    //need to move left
                    $('.prev-stage').click();
                }
            }
            $(window).data("old-width", $(window).width());
        });

        $(".cmbYears").change(function () {
            var year = this.value;
            var idName = "#" + year;
            var oldYearId = "#" + $('.current_year').val();
            $(idName).addClass('active');
            $(oldYearId).removeClass('active');
            $('.current_year').val(year);
            $('.shareContainer').focus();
            loadYear(year);
        });

        //bind events for years
        $('.years a').on('click', function (e) {
            e.preventDefault();
            if (!$(this).hasClass('active')) {
                $('.years a').removeClass('active');
                $(this).addClass('active');
                loadYear(e.target.innerHTML);
                $('.current_year').val(e.target.innerHTML);
                $('.cmbYears').val(e.target.innerHTML);
            }
        });

        $("select").selectBoxIt({ autoWidth: false });
        $('.spCboYear').css('visibility', 'visible');

        // load the default year;
        loadYear(2019, true);

        // alert("2016");
    });
})(jQuery);
