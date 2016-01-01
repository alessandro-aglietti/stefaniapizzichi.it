//console.log('\'Allo \'Allo!');

function imagesAreLoaded() {
    $("#loader-wrapper").animate({
        //opacity: 0,
        //top: "+=50",
        top: "-" + ($(window).height() + 100)
    }, 1000, $.bez([.25, .1, .25, 1]), function() {
        $("#loader-wrapper").remove();
    });

    registerFancyboxe();
}

$(window).ready(function() {
    'use strict';
    // $('#contact').scrollTo($("#footer"));

    miscResLoaded();


    $.ajax({
        url: "/index-partial",
        dataType: "html"
    }).done(function(data) {

        miscResLoaded();

        var imagesToLoad = $("body").append(data).find(".img-responsive").slice(0, 10);

        imagesToLoad.on("load", function() {
            _IMGS++;
        });
        doTheRestOf();
    });

    //$(".ip-loader svg path.ip-loader-circle").css("stroke", "black");
});









function doTheRestOf() {

    $('.menu0 a').on('click', function(event) {
        var target = this.href.split('#');

        if (target.length > 1 && target[1] !== '') {
            //event.preventDefault();
            $('html, body').animate({
                scrollTop: $('#' + target[1]).offset().top,
                duration: 1000,
                easing: 'swing'
            });
        }
    });

    $('.typed').typed({
        strings: ['have fun!^500', 'see all my works!^500', 'have a nice day!^500', 'see you soon!^500', 'enjoy it!^500', 'contact me!^500', 'hire me!^500'],
        typeSpeed: 0,
        loop: true,
    });

    $('.typed-hobby').typed({
        strings: ['Google.^500', 'Stieg Larsson.^500', 'walking.^500', 'Wired magazine.^500', 'The Pirate Bay.^500', 'my mountain-bike.^500', 'a glass of wine!^500'],
        typeSpeed: 0,
        loop: true,
    });
    /*
	$('#footer').bind('inview',
			function (event, isInView, visiblePartX, visiblePartY) {
					var elem = $(this);

					if (isInView) {
							// element is now visible in the viewport
							if (visiblePartY === 'top') {
									// top part of element is visible
									$.scrollTo('max');
							} else if (visiblePartY === 'bottom') {
									elem.data('seenBottom', true);
							} else {
									elem.data('seenTop', true);
									elem.data('seenBottom', true);
							}

							if (elem.data('seenTop') && elem.data('seenBottom')) {
									elem.unbind('inview');
									// here we will do WHAT WHE NEED (for ex. Call Ajax stats collector)

							}
					} else {
							// element has gone out of viewport
					}
			});
*/
    $('#showsubmenu').mouseover(function() {
        $('.menu1').css('position', 'fixed').css('width', '100%').css('z-index', '98').css('background-color', 'white');
        $('#aftermenu').css('margin-top', '135px');
    });

    $(window).scroll(function() {
        $('.menu1').css('position', 'static').css('width', 'auto');
        $('#aftermenu').css('margin-top', '0px');
    });


    $('#babbocounts').bind('inview',
        function(event, isInView) {


            if (isInView) {
                // element is now visible in the viewport
                $('.round .n-work').animateNumber({
                    number: 3
                });
                $('.round .n-school').animateNumber({
                    number: 6
                });
                $('.round .n-scolarship').animateNumber({
                    number: 12
                });
                $('.round .n-book').animateNumber({
                    number: 47
                });
            } else {
                // element has gone out of viewport
            }
        });

    // #work #resume #footer quando entrano attivare il corrispettivo h1 selected
    $('#work, #main_works').bind('inview',
        function(event, isInView) {
            if (isInView) {
                // element is now visible in the viewport
                $('h1.otherpage').removeClass('selected');
                $('[href="#work"] h1.otherpage').addClass('selected');
            } else {
                // element has gone out of viewport
                $('[href="#work"] h1.otherpage').removeClass('selected');
            }
        });

    $('#resume, #resume2').bind('inview',
        function(event, isInView) {
            if (isInView) {
                // element is now visible in the viewport
                $('h1.otherpage').removeClass('selected');
                $('[href="#resume"] h1.otherpage').addClass('selected');
            } else {
                // element has gone out of viewport
                $('[href="#resume"] h1.otherpage').removeClass('selected');
            }
        });

    $('#footer').bind('inview',
        function(event, isInView) {
            if (isInView) {
                // element is now visible in the viewport
                $('h1.otherpage').removeClass('selected');
                $('[href="#footer"] h1.otherpage').addClass('selected');
            } else {
                // element has gone out of viewport
                $('[href="#footer"] h1.otherpage').removeClass('selected');
            }
        });

    $('h1.otherpage').click(function() {
        $('h1.otherpage').removeClass('selected');
        $(this).addClass('selected');
    });


    $('.filterstaturation a').click(function(event) {
        //event.preventDefault();
        $('.filterstaturation a').removeClass('selected');
        $(this).addClass('selected');
        $('#main_works a').removeClass('saturation');
        var target = this.href.split('#');

        if (target.length > 1 && target[1] !== '') {
            var filter = '.' + target[1];

            $('#main_works a:not(' + filter + ')').addClass('saturation');
        }
    });
}




function registerFancyboxe() {
    console.log("document.ready");

    $('#main_works a').on('click', function() {
        if (!$(this).hasClass("saturation")) {

            var fancyboxes = $('#main_works a:not(.saturation)');

            var thiss = this;
            var startFromThisIndex = 0;
            fancyboxes = $.map(fancyboxes, function(elementOfArray, indexInArray) {
                startFromThisIndex = ($(elementOfArray).attr("sp-href") === $(thiss).attr("sp-href")) ? indexInArray : startFromThisIndex;
                return {
                    "href": $(elementOfArray).attr("sp-href"),
                    "sp-class" : $(elementOfArray).attr("sp-class")
                   // "title" : $(elementOfArray).find("div.text-image h1").html()
                };


            });
            // var startFromThisIndex = $.inArray($(this), fancyboxes);

            if (startFromThisIndex > 0) {
                var fancyboxes_sorted = [];
                fancyboxes_sorted = fancyboxes_sorted.concat(fancyboxes.slice(startFromThisIndex));
                fancyboxes_sorted = fancyboxes_sorted.concat(fancyboxes.slice(0, startFromThisIndex));
                fancyboxes = fancyboxes_sorted;
            }

            $.fancybox.open(fancyboxes, {
                type: 'ajax',
                closeBtn: false,
                scrolling: 'hide',
                padding: 0,
                margin: [20, 0, 0, 0], // TODO settare questo in base a mobile(20)
                width: "70%", // TODO settare questo in base a mobile(100%)
                height: "100%",
                autoSize : false,
                arrows: false,
                mouseWheel: false,
                afterShow: function(current, previous) {
                    setTimeout(function() {
                        /*var fbtop = Number($(".fancybox-wrap").css("top").replace("px", ""));
                        var fbwrap = $(".fancybox-wrap").height();
                        var growH = $(window).height() - fbwrap - fbtop;
                        
                        var newH = fbwrap + growH;
                        var newH = '' + newH + "px";
                        
                        $(".fancybox-wrap").height(newH);
                        $(".fancybox-skin").height(newH);
                        $(".fancybox-outer").height(newH);
                        $(".fancybox-inner").height(newH);*/
                    
                        var sticaHeight = $('.fancybox-inner').height() - $('.menulight').height();
                        $('#slimscrollthis').height("" + sticaHeight + "px");
                        $('#slimscrollthis').slimScroll({
                            height: $('#scroll-inner').height + 'px'
                        });
                        //$('#slimscrollthis').width("100%");
                        $("#slimscrollthis").trigger("mouseover");
                    }, 500);

                    return true;
                }
            });

        } // se sono grigetto non faccio nulla

        return false;
    });
}