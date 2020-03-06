
/*--------------------------------------------------
Template Name: Picaboo - Responsive Bootstrap 4 eCommerce Template;
Description: This is html5 template;
Version: 1.0;
-----------------------------------------------------*/

(function ($) {
	"use Strict";
/*---------------------------------
    1. Mean Menu Active
-----------------------------------*/
jQuery('.header-menu-area nav').meanmenu({
    meanMenuContainer: '.mobile-menu',
    meanScreenWidth: "991"
})
/*---------------------------------
    Sticky Menu Active
-----------------------------------*/
$(window).on('scroll',function() {
if ($(this).scrollTop() >50){  
    $('.header-sticky').addClass("is-sticky");
  }
  else{
    $('.header-sticky').removeClass("is-sticky");
  }
});
/*---------------------------------
	2. Header Top Dropdown Menu 
-----------------------------------*/
$( '.drodown-show > a' ).on('click', function(e) {
    e.preventDefault();
    if($(this).hasClass('active')) {
        $( '.drodown-show > a' ).removeClass('active').siblings('.ht-dropdown').slideUp()
        $(this).removeClass('active').siblings('.ht-dropdown').slideUp();
    } else {
        $( '.drodown-show > a' ).removeClass('active').siblings('.ht-dropdown').slideUp()
        $(this).addClass('active').siblings('.ht-dropdown').slideDown();
    }
});
/*--------------------------
	 Category Menu Active
---------------------------- */
 $('.rx-parent').on('click', function(){
    $('.rx-child').slideToggle();
    $(this).toggleClass('rx-change');
});
//    category heading
$('.category-heading').on('click', function(){
    $('.category-menu-list').slideToggle(300);
});	
/*-- Category Menu Toggles --*/
function categorySubMenuToggle() {
    var screenSize = $(window).width();
    if ( screenSize <= 991) {
        $('#cate-toggle .right-menu > a').prepend('<i class="expand menu-expand"></i>');
        $('.category-menu .right-menu ul').slideUp();
//        $('.category-menu .menu-item-has-children i').on('click', function(e){
//            e.preventDefault();
//            $(this).toggleClass('expand');
//            $(this).siblings('ul').css('transition', 'none').slideToggle();
//        })
    } else {
        $('.category-menu .right-menu > a i').remove();
        $('.category-menu .right-menu ul').slideDown();
    }
}
categorySubMenuToggle();
$(window).resize(categorySubMenuToggle);

/*-- Category Sub Menu --*/
function categoryMenuHide(){
    var screenSize = $(window).width();
    if ( screenSize <= 991) {
        $('.category-menu-list').hide();
    } else {
        $('.category-menu-list').show();
    }
}
categoryMenuHide();
$(window).resize(categoryMenuHide);
$('.category-menu-hidden').find('.category-menu-list').hide();
$('.category-menu-list').on('click', 'li a, li a .menu-expand', function(e) {
    var $a = $(this).hasClass('menu-expand') ? $(this).parent() : $(this);
    if ($a.parent().hasClass('right-menu')) {
        if ($a.attr('href') === '#' || $(this).hasClass('menu-expand')) {
            if ($a.siblings('ul:visible').length > 0) $a.siblings('ul').slideUp();
            else {
                $(this).parents('li').siblings('li').find('ul:visible').slideUp();
                $a.siblings('ul').slideDown();
            }
        }
    }
    if ($(this).hasClass('menu-expand') || $a.attr('href') === '#') {
        e.preventDefault();
        return false;
    }
});
/*---------------------------
    Nice Select
------------------------------- */	
$('.nice-select').niceSelect(); 
/*---------------------------
    Mini Cart Hover Active
----------------------------*/
$('.header-cart').hide();
    $('.mini-cart').hover(
      function() {
        if( $(this).children('div').size() > 0 && $(this).children().hasClass('header-cart') ) {
            $(this).children().stop().slideDown(400);
        }
      }, function() {
        $(this).children('.header-cart').stop().slideUp(300);
      }
    );
/*------------------------------
    12. Shop Category Active
------------------------------*/
$('#cate-toggle li.has-sub>a,#cate-mobile-toggle li.has-sub>a,#shop-cate-toggle li.has-sub>a').on('click', function () {
    $(this).removeAttr('href');
    var element = $(this).parent('li');
    if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp();
    } else {
        element.addClass('open');
        element.children('ul').slideDown();
        element.siblings('li').children('ul').slideUp();
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp();
    }
});
$('#cate-toggle>ul>li.has-sub>a').append('<span class="holder"></span>');
/*------------------------------ 
10. Cart Plus Minus Button
---------------------------------*/
 $(".cart-plus-minus").append('<div class="dec qtybutton"><i class="ion-ios-arrow-down"></i></div><div class="inc qtybutton"><i class="ion-ios-arrow-up"></i></div>');
  $(".qtybutton").on("click", function() {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.hasClass('inc')) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
       // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
        } else {
        newVal = 0;
      }
      }
    $button.parent().find("input").val(newVal);
  });
/*----------------------------
    ** Owl Active **
------------------------------ */
/*----------
     Hero Slider Active
------------------------------*/
$('.hero-slider').owlCarousel({
    smartSpeed: 1000,
    nav: false,
    loop: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: false,
    navText: ['prev', 'next'],
    responsive: {
        0: {
            items: 1,
            autoplay: true
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
/*-------- 
     Testimonial Active 
----------------------------------*/
 $('.testimonial-slider').owlCarousel({
        smartSpeed: 1000,
        nav: false,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
}) 
/*---------------------------------------
     Sidebar Product Categorie Active
----------------------------------------*/
$('.categori-block-content').owlCarousel({
    nav: false,
    loop: false,
    navText: ['prev', 'next'],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
/*---------------------------------------
     Sidebar Product Categorie Active
----------------------------------------*/
$('.our-categorie-block-content').owlCarousel({
    nav: false,
    loop: false,
    navText: ['prev', 'next'],
    responsive: {
        0: {
            items: 2,
        },
        768: {
            items: 4
        },
        991: {
            items: 2
        }
    }
})
/*---------------------------------------
     Sidebar Product Categorie Active
----------------------------------------*/
$('.feature-product-items').owlCarousel({
    nav: false,
    loop: false,
    navText: ['prev', 'next'],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
/*---------------------------------------
     testimonial Active
----------------------------------------*/
$('.testimonial-active').owlCarousel({
    nav: false,
    loop: false,
    navText: ['prev', 'next'],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
/*------- 
     Product Slider Active 
----------------------------------*/
 $('.bestsellerSlide').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 3
            },
            1000: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
    })
/*------- 
    Latest Product Slider Active 
----------------------------------*/
 $('.latest-product-active').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 2
            },
            1000: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    })
/*------- 
     featured-new-product 
----------------------------------*/
 $('.featured-new-product').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 3
            },
            1000: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
    })
/*------- 
    Bestseller Slider 2 Active
----------------------------------*/
 $('.bestsellerSlide-2').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    })
/*------- 
    Bestseller Slider 3 Active 
----------------------------------*/
 $('.bestsellerSlide-3').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 4
            },
            1000: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    })
/*------- 
    Deal Product Active 
----------------------------------*/
 $('.deal-product-active').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    })
/*------- 
    Deal Product Active 4  
----------------------------------*/
 $('.deal-product-active4').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 2
            },
            1000: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
    })
/*------- 
    Categorie Product Slider Active 
----------------------------------*/
 $('.cate-product-slide').each(function(){
    $(this).owlCarousel({
        smartSpeed: 1000,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 3
            },
            1000: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    })
});

$('.cate-slider-nav .nav-prev').on('click', function(){
    $(this).parents('.row').next('.cate-product-wrapper').find('.cate-product-slide').trigger('prev.owl.carousel');
})
$('.cate-slider-nav .nav-next').on('click', function(){
    $(this).parents('.row').next('.cate-product-wrapper').find('.cate-product-slide').trigger('next.owl.carousel');
})
    

    
/*--------
    Brand Active
----------------------------------*/
 $('.brand-active').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 2
            },
            450: {
                items: 3
            },
            600: {
                items: 4
            },
            1000: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
}) 
/*------- 
    Blog Gallery Post Active 
----------------------------------*/
 $('.post-gallery').owlCarousel({
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })   
/*----------------------------------
	 Instafeed active 
------------------------------------*/
if($('#Instafeed').length) {
    var feed = new Instafeed({
        get: 'user',
        userId: 6665768655,
        accessToken: '6665768655.1677ed0.313e6c96807c45d8900b4f680650dee5',
        target: 'Instafeed',
        resolution: 'thumbnail',
        limit: 8,
        template: '<li><a href="{{link}}" target="_new"><img src="{{image}}" /></a></li>',
    });
    feed.run(); 
}
/*----------------------------------
    ScrollUp Active
-----------------------------------*/
$.scrollUp({
    scrollText: '<i class="fa fa-angle-double-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
});
/*----------------------------------- 
    Count Down Active 
----------------------------------*/ 
$('[data-countdown]').each(function() {
	var $this = $(this), finalDate = $(this).data('countdown');
	$this.countdown(finalDate, function(event) {
		$this.html(event.strftime('<div class="single-countdown"><span class="count">%D</span><span class="text">Days</span></div><div class="single-countdown"><span class="count">%H</span><span class="text">Hours</span></div><div class="single-countdown"><span class="count">%M</span><span class="text">Minutes</span></div><div class="single-countdown"><span class="count">%S</span><span class="text">Seconds</span></div>'));
	});
}); 
/*--
    Product Tab Filter Select Style For Mobile
--------------------------------------------*/
var windows = $(window);
function productTabFilterInit() {
    var productTabFilter = $('.product-categorie');
    
    productTabFilter.each(function(){
        var filterToggle = $(this).find('.product-tab-filter-toggle');
        var filterToggleCatElement = $(this).find('.product-tab-filter-toggle span');
        var filterList = $(this).find('.cate-filter');
        var filterListItem = $(this).find('.cate-filter li a');
        
        var filterCatText =  filterList.find('.active').text();
        
        filterToggleCatElement.text(filterCatText);
        
        /*-- Open Filter Tab List --*/
        filterToggle.on('click', function(){
            $(this).siblings('.cate-filter').slideToggle();
        });
        
        /*-- Close Filter Tab List On Select a Category --*/
        filterListItem.on('click', function(){
            var screenSize = windows.width();
            var filterCatText= $(this).text();
            filterToggleCatElement.text(filterCatText);
            
            if ( screenSize < 991) {
                filterList.slideToggle();
            }
            
        });
        
    });
    
}
productTabFilterInit();
    
/*-- Product Tab Filter Show Hide For Mobile & Desktop --*/
function productTabFilterScreen() {
    var screenSize = windows.width();
    var filterList = $('.cate-filter');
    
    if ( screenSize < 991) {
        filterList.slideUp();
    } else {
        filterList.slideDown();
    }
}
productTabFilterScreen();
windows.resize(productTabFilterScreen); 
/*----------------------------------- 
    Single Product Side Menu Active 
--------------------------------------*/  
$('.single-slide-menu').slick({
		prevArrow: '<i class="fa fa-angle-left"></i>',
		nextArrow: '<i class="fa fa-angle-right slick-next-btn"></i>',
        slidesToShow: 3,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
	});
$('.modal').on('shown.bs.modal', function (e) {
    $('.single-slide-menu').resize();
})
    
$('.single-slide-menu a').on('click',function(e){
      e.preventDefault();
     
      var $href = $(this).attr('href');
     
      $('.single-slide-menu a').removeClass('active');
      $(this).addClass('active');
     
      $('.product-details-large .tab-pane').removeClass('active show');
      $('.product-details-large '+ $href ).addClass('active show');
     
  })
/*------------------------------ 
    Toggle Function Active
---------------------------------*/   
/*--- showlogin toggle function ----*/
$('#showlogin').on('click', function() {
    $('#checkout-login').slideToggle(900);
});

/*--- showlogin toggle function ----*/
$('#showcoupon').on('click', function() {
    $('#checkout_coupon').slideToggle(900);
});
/*--- showlogin toggle function ----*/
$('#cbox').on('click', function() {
    $('#cbox-info').slideToggle(900);
});

/*--- showlogin toggle function ----*/
$('#ship-box').on('click', function() {
    $('#ship-box-info').slideToggle(1000);
});
/* --------------------------------------------------------
	FAQ-accordion
* -------------------------------------------------------*/ 
  $('.card-header a').on('click', function() {
    $('.card').removeClass('actives');
    $(this).parents('.card').addClass('actives');
  });
/* --------------------------------------------------------
	 Venobox Active
* -------------------------------------------------------*/  
  $('.venobox').venobox({
        border: '10px',
        titleattr: 'data-title',
        numeratio: true,
        infinigall: true
    }); 
    
    
    
})(jQuery);