/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

//  js Document

// Created on : 14/10/2017.
// Theme Name : Faster .
// Description: Faster - App Landing Page.
// Version    : 1.1.
// Author     : @creativeGigs.

"use strict";

// placeholder remove
function removePlaceholder() {
  if ($("input,textarea").length) {
    $("input,textarea").each(function() {
      $(this).data("holder", $(this).attr("placeholder"));
      $(this).on("focusin", function() {
        $(this).attr("placeholder", "");
      });
      $(this).on("focusout", function() {
        $(this).attr("placeholder", $(this).data("holder"));
      });
    });
  }
}

// Scroll to top
function scrollToTop() {
  if ($(".scroll-top").length) {
    //Check to see if the window is top if not then display button
    $(window).on("scroll", function() {
      if ($(this).scrollTop() > 200) {
        $(".scroll-top").fadeIn();
      } else {
        $(".scroll-top").fadeOut();
      }
    });

    //Click event to scroll to top
    $(".scroll-top").on("click", function() {
      $("html, body").animate({ scrollTop: 0 }, 1500);
      return false;
    });
  }
}

// JS tilt Effect
function hoverTilt() {
  var tiltBlock = $(".js-tilt");
  if (tiltBlock.length) {
    $(".js-tilt").tilt({
      glare: true,
      maxGlare: 0.3
    });
  }
}

// Testimonial Slider
function testimonialSlider() {
  var tSlider = $(".testimonial-slider");
  if (tSlider.length) {
    tSlider.owlCarousel({
      loop: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplaySpeed: 1000,
      lazyLoad: true,
      items: 1
    });
  }
}

// Apps Screenshot Slider
function screenshotSlider() {
  var cSlider = $(".screenshoot-slider");
  if (cSlider.length) {
    cSlider.owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      smartSpeed: 1200,
      lazyLoad: true,
      responsive: {
        0: {
          items: 1
        },
        551: {
          items: 2
        },
        768: {
          items: 3
        },
        1200: {
          items: 5
        }
      }
    });
  }
}

//Contact Form Validation
function contactFormValidation(formID) {
  var activeForm = $(formID);
  if (activeForm.length) {
    activeForm.validate({
      // initialize the plugin
      rules: {
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        email: {
          required: "Please, provide your business email",
          email: "Your email address must be in the format of name@domain.com"
        }
      },

      submitHandler: function(form) {
        $(form).ajaxSubmit({
          url: "/m/signup/",
          method: "POST",
          data: { url: window.location.pathname },

          success: function() {
            window.location = "/resend/";
          },
          error: function() {
            activeForm.fadeTo("slow", 1, function() {
              $("#alert-error").fadeIn();
            });
          }
        });
      }
    });
  }
}



// Close suddess Alret
function goalButton() {
  var goalButton = $(".goal-button");
  if (goalButton.length) {
    goalButton.on("click", function(e) {
      // e.currentTarget.preventDefault();
      console.log(e);

      e.originalEvent.preventDefault();
      var goal = $(e.currentTarget).data("goal");
      $.ajax({
        url: "/m/goal/",
        method: "POST",
        data: { goal, url: window.location.pathname }
      });
    });
  }
}

function getStartedButton() {
  var getStartedButton = $(".get-started-button");
  if (getStartedButton.length) {
    getStartedButton.on("click", function(e) {
      e.preventDefault();
      $('#myModal').appendTo("body").modal('show');
    })
  }
}

// DOM ready function
jQuery(document).on("ready", function() {
  (function($) {
    removePlaceholder();
    scrollToTop();
    goalButton();
    getStartedButton();
    hoverTilt();
    testimonialSlider();
    screenshotSlider();
    contactFormValidation('#top-form');
    contactFormValidation('#bottom-form');
    contactFormValidation('#modal-form');
  })(jQuery);
});

