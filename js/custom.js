(function($) {
  "use strict";
  
  /**
   * Table of Contents:
   *
   * 01 - Preloader
   * 02 - OwlCarousel
   * 03 - Wow initialize
   * 04 - Sticky
   * 05 - One Page Nav
   * 06 - ScrollToTop
   * 07 - Smart Resize Home
   * 08 - Nivo Lightbox
   * 09 - Funfact Number Counter
   * 10 - Fit Vids
   * 11 - YT Player for Video
   * 12 - Contact Form
   * 13 - Mailchimp
   * -----------------------------------------------
   */
  
  //windows load event
  $(window).load(function() {
	
	/* ---------------------------------------------------------------------- */
	/* -------------------------- 01 - Preloader ---------------------------- */
	/* ---------------------------------------------------------------------- */
    $('#preloader').delay(200).fadeOut('slow');
	
	/* ---------------------------------------------------------------------- */
	/* ---------------------------- 02 - OwlCarousel  ----------------------- */
	/* ---------------------------------------------------------------------- */	
	/* testimonial */
	$(".testimonial-carousel").owlCarousel({
	  autoPlay: false, 
	  singleItem : true,
	  pagination : true,
	  responsive : true,
	  itemsDesktop : [1199,3],
	  itemsDesktopSmall : [979,3]
	});
	
	/* app-screenshots Logos */
	$(".app-screenshots").owlCarousel({
		autoPlay: 2000,
		items : 4,
		pagination : true,
		itemsDesktop : [1199, 4],
		itemsDesktopSmall : [979, 3],
		itemsTablet : [768, 3],
		itemsTabletSmall : [600, 2],
		itemsMobile : [479, 1]
	}); 
    
	/* ---------------------------------------------------------------------- */
	/* ------------------------- 03 - Wow initialize  ----------------------- */
	/* ---------------------------------------------------------------------- */
	new WOW().init(
		{
			offset: 10	
		}
	);
	
  });
  
  /*------------------------------------------------------------------------*/
  /* -------------------------- 04 - Sticky ---------------------------- */
  /*------------------------------------------------------------------------*/
  $(".sticky").sticky({topSpacing:0});
  
  
  /* ---------------------------------------------------------------------- */
  /* --------------------------- 05 - One Page Nav ------------------------ */
  /* ---------------------------------------------------------------------- */
  $('.header-nav .nav').onePageNav({
	  currentClass: 'current',
	  scrollSpeed: 750,
	  scrollThreshold: 0.5,
	  filter: ':not(.external)',
	  begin: function () {
	  },
	  end: function () {
	  }
  });
  
  /* ---------------------------------------------------------------------- */
  /* -------------------------- 06 - scrollToTop  ------------------------- */
  /* ---------------------------------------------------------------------- */
  $(window).scroll(function(){
	  if ($(this).scrollTop() > 600) {
		  $('.scrollToTop').fadeIn();
	  } else {
		  $('.scrollToTop').fadeOut();
	  }
  });
  
  $('.scrollToTop').click(function(){
	  $('html, body').animate({scrollTop : 0},800);
	  return false;
  });
  
  /* ---------------------------------------------------------------------- */
  /* ------------------------ 07 - Smart Resize Home ---------------------- */
  /* ---------------------------------------------------------------------- */  
  var windowHeight = $(window).height();		
  $('#home').height( windowHeight );		
  $(window).resize(function() {			
	  var windowHeight = $(window).height();
	  $('#home').height( windowHeight );			
  });
  
  
  
  /* ---------------------------------------------------------------------- */
  /* -------------------------- 08 - Nivo Lightbox ------------------------ */
  /* ---------------------------------------------------------------------- */ 
  $('#screenshots a').nivoLightbox({
	  effect: 'fadeScale'
  });
  
  /* ---------------------------------------------------------------------- */
  /* --------------------- 09 - Funfact Number Counter -------------------- */
  /* ---------------------------------------------------------------------- */  
  $('.animate-number').appear();
  $(document.body).on('appear', '.animate-number', function() {
	   $('.animate-number').each(function() {
		   if( ! $(this).hasClass('appeared')){
				$(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration")));
				$(this).addClass('appeared');
		   }
		});
  });
  
  /* ---------------------------------------------------------------------- */
  /* -------------------------- 10 - Fit Vids ----------------------------- */
  /* ---------------------------------------------------------------------- */
  $('#wrapper').fitVids();
  
  /* ---------------------------------------------------------------------- */
  /* ------------------------- 11 - YT Player for Video ------------------- */
  /* ---------------------------------------------------------------------- */
  $(".player").mb_YTPlayer();
  
  /* ---------------------------------------------------------------------- */
  /* -------------------------- 12 - Contact Form ------------------------- */
  /* ---------------------------------------------------------------------- */
  // Needed variables
  var $contactform = $('#contact-form'),
      $response = '';
	  
  // After contact form submit
  $contactform.submit(function() {
    // Hide any previous response text
    $contactform.children(".alert").remove();

    // Are all the fields filled in? 
    if (!$('#contact_name').val()) {
      $response = '<div class="alert alert-danger">Please enter your name.</div>';
	  $('#contact_name').focus();
      $contactform.prepend($response);

    } else if (!$('#contact_message').val()) {
      $response = '<div class="alert alert-danger">Please enter your message.</div>';
	  $('#contact_message').focus();
      $contactform.prepend($response);

    } else if (!$('#contact_email').val()) {
      $response = '<div class="alert alert-danger">Please enter valid e-mail.</div>';
	  $('#contact_email').focus();
      $contactform.prepend($response);

    } else {
      // Yes, submit the form to the PHP script via Ajax 
	  $contactform.children('button[type="submit"]').button('loading');
      $.ajax({
        type: "POST",
        url: "php/contact-form.php",
        data: $(this).serialize(),
        success: function(msg) {
          if (msg == 'sent') {
            $response = '<div class="alert alert-success">Your message has been sent. Thank you!</div>';
			$contactform[0].reset();
          } else {
            $response = '<div class="alert alert-danger">' + msg + '</div>';
          }
          // Show response message
          $contactform.prepend($response);
		  $contactform.children('button[type="submit"]').button('reset');
        }
      });
    }
    return false;
  });
  
  
  /* ---------------------------------------------------------------------- */
  /* -------------------------- 13 - Mailchimp ------------------------- */
  /* ---------------------------------------------------------------------- */
  $('#mailchimp-subscription-form').ajaxChimp({
	  callback: mailChimpCallBack,
	  url: '//thememascot.us9.list-manage.com/subscribe/post?u=a01f440178e35febc8cf4e51f&amp;id=49d6d30e1e'
  });
  
  function mailChimpCallBack (resp) {
	  // Hide any previous response text
	  var $mailchimpform = $('#mailchimp-subscription-form'),
		  $response = '';
	  $mailchimpform.children(".alert").remove();
	  console.log(resp);
	  if (resp.result === 'success') {
		  $response = '<div class="alert alert-success">' + resp.msg + '</div>';
	  } else if (resp.result === 'error') {
		  $response = '<div class="alert alert-danger">' + resp.msg + '</div>';
	  }
	 $mailchimpform.prepend($response);
  }
  
})(jQuery);
