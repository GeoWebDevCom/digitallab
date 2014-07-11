$(window).load(function() {
  portfolioFilter();
})

$(document).ready(function() {

	// Forms
	
	$("input:text").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
    }
  });

  $("input.phone").mask("+7 (999) 999-99-99");

  validateForms();
	
	$("form").submit(function() {
    if ($(this).valid()) {
      
			$(this).find("input:text").val("");
			$(this).find("textarea").val("");
	  
			$(this).find(".placeholder").show();
		
    }
	});
	
	$("input:text, input:password, textarea").each(function() {
    $(this).addClass("initial");
    
    if ($(this).prop("tagName") == "INPUT" || $(this).prop("tagName") == "TEXTAREA") {
      // if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
      if ($(this).hasClass("phone") || $(this).hasClass("form-date")) {
        $(this).focus(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      } else {
        $(this).focus(function() {
          $(this).parents(".form-item").find(".placeholder").addClass("placeholder-initial");
        });
        $(this).keydown(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      }
      $(this).blur(function() {
        $(this).prev().prev(".placeholder").hide();
        $(this).parents(".form-item").find(".placeholder").removeClass("placeholder-initial");
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    } else {
      $(this).focus(function() {
        $(this).removeClass("initial");
        $(this).parents(".form-item").find(".placeholder").hide();
      });
      $(this).blur(function() {
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    }
      
    $(this).parents(".form-item").find(".placeholder").click(function() {
      $(this).focus();
    });
    
  });

	if ($("#order_file").length) {
    $("#order_file").nicefileinput({ 
      label : '<span>Прикрепить бриф</span>'
    });
  }

	var footerHeight = $(".footer").outerHeight();

	$(".top-main").css({"padding-bottom": footerHeight})
	$(".footer").css({
		"margin-top": -footerHeight,
		"height": footerHeight
	})

	if (!$.support.transition) {
    $.fn.transition = $.fn.animate;
    var easeIn = "linear";
    var easeOut = "lenear";
  } else {
    var easeIn = "ease-in";
    var easeOut = "ease-out";
  }
	
	// Simple slider init
	
	$(".simple-gallery").each(function() {
		$(this).simpleGallery();
	});
	
	$(".simple-slider").each(function() {
		$(this).simpleSlider();
	});
  
	// Main slider init

	mainSlider();
	
	// var extButtons = new Array();
	
	// for (i=0;i<$(".main-slider-lister .lister-item").length;i++) {
		// extButtons.push(".main-slider-lister ." + (i+1))
	// }
	
	
	
	if ($(".main-carousel").length) {
    $(".main-carousel").each(function() {
      $(this).jCarouselLiteCustom({
        btnNext: ".main-carousel .next",
        btnPrev: ".main-carousel .prev",
        visible: 1,
        circular: true,
        scroll: 1,
        speed:1000,
				btnGo:
				[".main-slider-lister .1", ".main-slider-lister .2",
				".main-slider-lister .3", ".main-slider-lister .4",
				".main-slider-lister .5"],
				afterEnd: function(a) {
					$(".main-slider-lister .lister-item").removeClass("act");
					$(".main-slider-lister .lister-item").eq(a.attr("dataindex")).addClass("act");
				}
      });
    });
  }
	
	
	$(".main-slider .arr-prev").click(function() {
		$(".main-slider .prev").click();
	});

	$(".main-slider .arr-next").click(function() {
		$(".main-slider .next").click();
	});
	
});

function mainSlider() {
  
	$(".main-carousel li").each(function() {
		$(this).attr("dataindex",$(this).prevAll().length)
	});
	
	for (i=0;i<$(".main-carousel li").length;i++) {
		$(".main-slider-lister").append("<div class='lister-item "+(i+1)+"' />");
	}
	
	$(".main-slider-lister .lister-item").eq(0).addClass("act");
	
}

function portfolioFilter() {
  var $container = $('.portfolio-container');
	$container.isotope({
			filter: '*',
			animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
			}
	});

	$('.portfolio-filter a').click(function(){
			$('.portfolio-filter .current').removeClass('current');
			$(this).addClass('current');

			var selector = $(this).attr('data-filter');
			$container.isotope({
					filter: selector,
					animationOptions: {
							duration: 750,
							easing: 'linear',
							queue: false
					}
			 });
			 return false;
	}); 
}

(function( jQuery ) {
  jQuery.fn.simpleGallery = function() {
  
  
    var slider = $(this);
    var slides = slider.find("img");
		
		slides.wrapAll("<div class='slides' />")
		
    var sliderSize = slides.size();
    
    slides.hide();
    slides.eq(0).show().addClass("slide-act");
		
    
    if (sliderSize > 1) {
    
      slider.find(".slides").after("<div class='next' />");
      slider.find(".slides").after("<div class='prev' />");
      
      var prevBtn = slider.find(".prev");
      var nextBtn = slider.find(".next");
      
      slides.bind("click",function () {
        nextBtn.click();
      });
      
      nextBtn.click(function() {
        curIndex = parseInt(slider.find(".slide-act").prevAll("img").length)
        if (curIndex < sliderSize-1) {
          curIndex++;
        } else {
          curIndex = 0;
        }
				slides.hide().removeClass("slide-act");
        slides.eq(curIndex).fadeIn(500).addClass("slide-act");
      });
      
      prevBtn.click(function() {
        curIndex = parseInt(slider.find(".slide-act").prevAll("img").length)
        if (curIndex > 0) {
          curIndex--;
        } else {
          curIndex = sliderSize-1
        }
				slides.hide().removeClass("slide-act");
        slides.eq(curIndex).fadeIn(500).addClass("slide-act");
      });
      
    }
		
    
  }
})( jQuery );

(function( jQuery ) {
  jQuery.fn.simpleSlider = function() {
  
  
    var slider = $(this);
    var slides = slider.find(".slide");
		
		slides.wrapAll("<div class='slides' />")
		
    var sliderSize = slides.size();
    
    slides.hide();
    slides.eq(0).show().addClass("slide-act");
		
    
    if (sliderSize > 1) {
    
      slider.find(".slides").after("<div class='next' />");
      slider.find(".slides").after("<div class='prev' />");
      
      var prevBtn = slider.find(".prev");
      var nextBtn = slider.find(".next");
      
      slides.bind("click",function () {
        nextBtn.click();
      });
      
      nextBtn.click(function() {
        curIndex = parseInt(slider.find(".slide-act").prevAll(".slide").length)
        if (curIndex < sliderSize-1) {
          curIndex++;
        } else {
          curIndex = 0;
        }
				slides.hide().removeClass("slide-act");
        slides.eq(curIndex).fadeIn(500).addClass("slide-act");
      });
      
      prevBtn.click(function() {
        curIndex = parseInt(slider.find(".slide-act").prevAll(".slide").length)
        if (curIndex > 0) {
          curIndex--;
        } else {
          curIndex = sliderSize-1
        }
				slides.hide().removeClass("slide-act");
        slides.eq(curIndex).fadeIn(500).addClass("slide-act");
      });
      
    }
		
    
  }
})( jQuery );

function validateForms() {
  
  $(".common-form form").each(function() {
    $(this).validate({
      focusInvalid: false,
      sendForm : false,
      errorPlacement: function(error, element) {
        // element.parents(".input-wrapper").addClass("input-wrapper-error");
        if (element.attr("errortext")) {
          error.html(element.attr("errortext"))
        }
        error.insertAfter(element).wrap("<div class='error-wrapper' />");
        element.prev(".placeholder").addClass("placeholder-error")
        if (element[0].tagName == "SELECT") {
          element.parents(".form-item").find(".param-selector").addClass("param-sel-error")
        }
        
        if (element.parents().hasClass("errors-bottom") || element.parents().hasClass("errors-top")) {
          element.parents(".form-item").find(".error-wrapper").css({
            left: - element.parents(".form-item").find(".error-wrapper").width()/2 + element.outerWidth()/2
          });
        }
      },
      unhighlight: function(element, errorClass, validClass) {
        // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
        $(element).removeClass(errorClass);
        $(element).next(".error-wrapper").remove();
        $(element).prev(".placeholder").removeClass("placeholder-error");
        if ($(element)[0].tagName == "SELECT") {
          $(element).parents(".form-item").find(".param-selector").removeClass("selector-error")
        }
      },
      invalidHandler: function(form, validatorcalc) {
          var errors = validatorcalc.numberOfInvalids();
          if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {                    
              validatorcalc.errorList[0].element.focus();
          }
      }
    });
    
    if ($(this).find(".form-email").length) {
      $(this).find(".form-email").rules('add', {
        email: true,
        messages: {
          required:  "Введите правильный адрес!"
        }
      });
    }
    
    if ($(this).find(".form-date").length) {
      $(this).find(".form-date").rules('add', {
        messages: {
          required:  "Выберите дату!"
        }
      });
    }
    
    if ($(this).find(".form-email").length && $(this).find(".form-phone").length) {
      var thisField = $(this).find(".form-phone");
      var relatedField = $(this).find(".form-email");
      thisField.rules('add', {
        required: function(element) {
          if (relatedField.val() == "") {
            return true;
          } else {
            return false;
          }
        }
      });
      var thisField2 = $(this).find(".form-email");
      var relatedField2 = $(this).find(".form-phone");
      thisField2.rules('add', {
        required: function(element) {
          if (relatedField2.val() == "") {
            return true;
          } else {
            return false;
          }
        }
      });
    }
    
    $(document).mouseup(function (e) {
      var container = $("form");

      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          $(".error-wrapper").remove();
      }
    });
		
		$(document).mouseup(function (e) {
      var container = $(".tooltip");

      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          $(".tooltip").fadeOut(150);
      }
    });
    
  });  
    
}

jQuery.extend(jQuery.validator.messages, {
    required: "Заполните поле!",
    remote: "Please fix this field.",
    email: "Введите правильный e-mail",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});