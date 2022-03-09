/*
 * Copyright (c) 2015 TeamIdea
 * Author: TeamIdea 
 * This file is made for CURRENT TEMPLATES
*/


// -----------------------------------------------------  PAGE SCROLL	
	jQuery(function() {
		jQuery('.scroll').bind('click', function(event) {
			var $anchor = jQuery(this);
			var headerH = jQuery('.topbar').outerHeight();
			jQuery('html, body').stop().animate({
				scrollTop : jQuery($anchor.attr('href')).offset().top - headerH
			}, 1200, 'easeInOutExpo');
			event.preventDefault();
		});
	});
	
	jQuery(function() {
		jQuery('.scroll-mobile').bind('click', function(event) {
			var anchora = jQuery(this);
			var headerH = jQuery('.topbar').outerHeight();
			jQuery('html, body').stop().animate({
				scrollTop : jQuery(anchora.attr('href')).offset().top - 0
			}, 1200, 'easeInOutExpo');
			event.preventDefault();
		});
	});
	
	

// ----------------------------------------------------- Contact us form validation
	$('#contact-form').on('submit', function(e) {
		e.preventDefault();
		// we clear error messages
		$(this).find('.error').removeClass('error');
		$(this).find('.err_msg').fadeOut(200);
		
		// validate form
		var validation = validate_contact(e);
		
		for (var i = 0; i < validation.length; i++) 
		{
			$(validation[i]).addClass('error');
		}
		
		if ( validation.length ) 
		{
			$('body, html').animate( { 'scrollTop': $(validation[0]).offset().top - 100 }, 'easeInCube', function() {
				$(this).select();
			});
			return false;
		}
		else
		{
			submit_form(e);
			return true;
		}
	});
	
	function validate_contact(e) {
		var $form = $(e.target);
		var rule, val, bad_fields = new Array();
		$form.find('input, textarea').each(function() {
			rule = $(this).data('validate');
			if ( ! rule ) return;
			
			val = $(this).val();
			if ( ! val.match(rule) )
			{
				bad_fields.push(this);
			}
		});
		return bad_fields;
	}
	
	
	
// ----------------------------------------------------- Contact us form submit
	function submit_form(e) {
		var $form = $(e.target),
			$btn = $form.find('button'),
			btn_text = $btn.text();
		$.ajax({
			url: 'includes/phpmailer/contact.php',
			data: $form.serialize(),
			dataType: 'json',
			type: 'POST',
			beforeSend: function() {
				$('#contact_fail .alert-inner').empty();
				$('#contact_fail').hide();
				$btn.attr('disabled', 'disabled').addClass('btn-disabled').css('cursor', 'not-allowed').text('Sending...');
			},
			success: function(result) {
				if ( typeof result.success == 'undefined' )
				{
					// form is not valid, display errors
					for ( var x in result )
					{
						$('#contact_fail .alert-inner').append('<p>' + result[x] + '</p>');
					}
					$('#contact_fail').fadeIn();
				}
				else
				{
					// form sent successfully and without errors
					$('#contact_success').fadeIn(700, function() {
						var $this = $(this);
						setTimeout(function() {
							$this.fadeOut();
						}, 5000);
					});
				}
			},
			complete: function() {
				$btn.removeAttr('disabled', 'disabled').removeClass('btn-disabled').css('cursor', 'pointer').html(btn_text);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				switch (jqXHR.status)
				{
					case 404:
						alert("We're Sorry... The file you are looking for is not found :(");
						break;
					case 500,200:
						$('#contact_fail .alert-inner').append("<p>Oops, something went wrong and we couldn't send your message :(</p>");
						$('#contact_fail').fadeIn();
						break;
					default:
						console.log(jqXHR, textStatus, errorThrown);
				}
			}
		});
	}



$(window).load(function() {	
	
	
	
// ----------------------------------------------------- PARALLAX BACKGROUNDS
	if(jQuery().parallax){
		if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {	
			$('#quote').parallax("50%", 0.4)
			$('#services').parallax("50%", 0.4);
		}
	}
	
	  
	
// ----------------------------------------------------- PARALLAX FIX FOR MOBILE DEVICES
	if(jQuery().parallax){
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('.parallax-section').css({'background-attachment': 'scroll'});
		}
	}
	
	
	
// ----------------------------------------------------- TAKE CARE OF INTRO LOADER
	$("#spinner").delay(400).fadeOut(); 
	$(".whitebg").delay(800).fadeOut("slow");
	
	
	
});



jQuery(document).ready(function($){
		
	"use strict";	
	
	

// -----------------------------------------------------  MENU
	if(jQuery().superfish){
		jQuery('ul.sf-menu').superfish({
			delay:       100,                            // one second delay on mouseout
			speed:       'fast',                          // faster animation speed
			autoArrows:  true                            // disable generation of arrow mark-up	
		});	
	}
	
	
	// Nav Sticky
	var winWidth = jQuery(window).width();
	
	if(jQuery().sticky){
		if( winWidth > 992 ){
			jQuery(".topbar").sticky({ topSpacing: 0});	
		}
	}
	
	
	// Add class has-child to each menu item that has child
	$('.sf-menu li').each(function() {
		if ( $(this).find('ul').length ) 
			$(this).addClass('has-child');
	});
	
	
	$('.mobile-menu .menu li').each(function() {
		if ( $(this).find('ul').length ) 
			$(this).addClass('has-child');
	});
	
	
	// Mobile Menu Toggle
	jQuery('.nav-toggle a').click(function(){
		jQuery('.mobile-menu').stop(true,true).slideToggle(500);
		return false;
	});
		
	
	// Menu Animate
	var logoHeight = parseInt(jQuery('.logo img').attr('height'));
	
	jQuery(window).bind('scroll',smallNav);
	
	function smallNav(){
		var $offset = $(window).scrollTop();
		var $windowWidth = $(window).width();
		var shrinkNum = 6;
		
		if($offset > 20 && $windowWidth >= 1000) {
			
			jQuery('.topbar .logo img').stop(true,true).animate({
				'height' : logoHeight*2/3
			},{queue:false, duration:250, easing: 'easeOutCubic'});
			
			jQuery('.topbar .logo').stop(true,true).animate({
				'margin-top' : '20px',
				'margin-bottom' : '20px'
			},{queue:false, duration:250, easing: 'easeOutCubic'});
			
			jQuery('.topbar #nav>ul').stop(true,true).animate({
				'margin-top' : '7px',
				'margin-bottom' : '7px'
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			
			jQuery(window).unbind('scroll',smallNav);
			jQuery(window).bind('scroll',bigNav);
		}
	}
	
	function bigNav(){
		var $offset = $(window).scrollTop();
		var $windowWidth = $(window).width();
		var shrinkNum = 6;
		
		if($offset < 20 && $windowWidth >= 1000) {
			
			jQuery('.topbar .logo img').stop(true,true).animate({
				'height' : logoHeight
			},{queue:false, duration:250, easing: 'easeOutCubic'});
			
			jQuery('.topbar .logo').stop(true,true).animate({
				'margin-top' : '30px',
				'margin-bottom' : '30px'
			},{queue:false, duration:250, easing: 'easeOutCubic'});
			
			jQuery('.topbar #nav>ul').stop(true,true).animate({
				'margin-top' : '20px',
				'margin-bottom' : '20px'
			},{queue:false, duration:250, easing: 'easeOutCubic'});
			
			
			jQuery(window).bind('scroll',smallNav);
			jQuery(window).unbind('scroll',bigNav);
		}
	}
	
	

// -----------------------------------------------------  DROPDOWN
	$(function() {
        $('.dropdown').hover(function() {
            $(this).addClass('open');
        }, function() {
            $(this).removeClass('open');
        });
    });


	
// -----------------------------------------------------  CBPQTROTATOR		
	if(jQuery().cbpQTRotator){
		jQuery( '#cbp-qtrotator' ).cbpQTRotator({
		/*
		- how to call the plugin:
		$( selector ).cbpQTRotator( [options] );
		- options:
		{
			// default transition speed (ms)
			speed : 700,
			// default transition easing
			easing : 'ease',
			// rotator interval (ms)
			interval : 8000
		}
		- destroy:
		$( selector ).cbpQTRotator( 'destroy' );
		*/

		});
	}	
	
		

// ---------------------------------------------------- SKILLS
	/* Inview */
	function loadInview(){
		/* Skills Animation */
		var value;
		$('.skill-in').bind('inview', function (event, visible) {
			if (visible === true) {
			// element is now visible in the viewport
			$(this).each(function(){
				value = $(this).attr('title');
				$(this).animate({ "width": value+'%' }, 2000);
			});
			}
		});
	}
	
	
	loadInview();




// -----------------------------------------------------  JPAGES	
	// jPages paginated blocks
	if(jQuery().jPages) {
		var $holder = $("body").find(".holder");
		if (!$holder.length) {
			$("body").append("<div class='holder'></div>");
		}
		
		
		$("div.holder").jPages({
			containerID: "featured-products",
			previous: ".feature-product a[data-role='prev']",
			next: ".feature-product a[data-role='next']",
			animation: "fadeInRight",
			perPage: 4
		});
		
		$("div.holder").jPages({
			containerID: "recent-posts",
			previous: ".blog-recent a[data-role='prev']",
			next: ".blog-recent a[data-role='next']",
			animation: "fadeInRight",
			perPage: 3
		});
		
	}

	
// ----------------------------------------------------	IFRAME TRANSPARENT
	jQuery("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
	
	
	
// -----------------------------------------------------  FITVIDS
	if(jQuery().fitVids) {
		jQuery('.videos').fitVids();
	}
	
	
	
// -----------------------------------------------------  PRETTY checkboxs and radio buttons
	if(jQuery().prettyCheckable) {
		$('.checkable').prettyCheckable();
	}
	


// ----------------------------------------------------- QUANTITY increment/decrement button set
	$('.qty-btngroup').each(function() {
		var $this = $(this),
			$input = $this.children('input[type="text"]'),
			val = $input.val();
		$this.children('.plus').on('click', function() {
			$input.val( ++val );
		});
		$this.children('.minus').on('click', function() {
			if ( val == 0 ) return;
			$input.val( --val );
		});
	});
	
	/*$('.remove-cart').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.item').fadeOut(400, function() {
			$(this).remove();
		});
	});*/




// ----------------------------------------------------- PRODUCT ZOOM
    if(jQuery().elevateZoom) {
		$('#product-zoom').elevateZoom({
			zoomType: "inner",
			cursor: "crosshair",
			zoomWindowFadeIn: 500,
			zoomWindowFadeOut: 750
		});
	
		var gallery = $('#gal1');
		gallery.find('a').hover(function() {
	
			var smallImage = $(this).attr("data-image");
			var largeImage = $(this).attr("data-zoom-image");
			var ez = $('#product-zoom').data('elevateZoom');
	
			ez.swaptheimage(smallImage, largeImage);
		});
	}


// ----------------------------------------------------- RANGE SLIDER
	$('.range-slider').each(function() {
		var $this = $(this),
			configs = new Array();
		
		configs['min'] = ( $this.data('min') === undefined ) ? 0 : $this.data('min');
		configs['max'] = ( $this.data('max') === undefined ) ? 100 : $this.data('max');
		configs['start'] = ( $this.data('start') === undefined ) ? [20, 80] : $this.data('start');
		configs['step'] = ( $this.data('step') === undefined ) ? 1 : $this.data('step');
		
		var percentage = {
			to : function (range, value) {
				value = range[0] < 0 ? value + Math.abs(range[0]) : value - range[0];
				return (value * 100) / this._length(range);
			},
			_length : function (range) {
				return (range[0] > range[1] ? range[0] - range[1] : range[1] - range[0]);
			}
		}
		
		$this.noUiSlider({
			range: [configs['min'], configs['max']],
			start: configs['start'],
			step: configs['step'],
			slide: function() {
				var values = $(this).val(),
					range = $this.data('setup').settings.range;
					
				$this.siblings('.range-slider-value').find('> .min').text( '$' + values[0] ).css({ 'left': percentage.to(range, values[0]) + '%', 'visibility': 'visible', 'margin-left': (-0.5) * $this.siblings('.range-slider-value').find('> .min').outerWidth() });
				$this.siblings('.range-slider-value').find('> .max').text( '$' + values[1] ).css({ 'left': percentage.to(range, values[1]) + '%', 'visibility': 'visible', 'margin-left': (-0.5) * $this.siblings('.range-slider-value').find('> .max').outerWidth() });
			}
		});
		
		var settings = $this.data('setup').settings;
		$this.siblings('.range-slider-value').find('> .min').text( '$' + settings.start[0] ).css({ 'left': percentage.to(settings.range, settings.start[0]) + '%', 'visibility': 'visible', 'margin-left': (-0.5) * $this.siblings('.range-slider-value').find('> .min').outerWidth() });
		$this.siblings('.range-slider-value').find('> .max').text( '$' + settings.start[1] ).css({ 'left': percentage.to(settings.range, settings.start[1]) + '%', 'visibility': 'visible', 'margin-left': (-0.5) * $this.siblings('.range-slider-value').find('> .max').outerWidth() });
	});
	
	
	
	
// -----------------------------------------------------  TWITTER FEED	
	if(jQuery().tweet) {
		$('.twitterfeed').tweet({
			modpath: 'twitter/index.php',
			username: 'envato',
			page: 1,
			count: 3,
			loading_text: 'Loading Tweets...'
		});
		$('.tweet_time').each(function() {
			$(this).insertAfter( $(this).siblings('.tweet_text') );
		});
	}
	
	
	
// ----------------------------------------------------- WORK
	/* Portfolio
	-------------------------*/
	var portfolio = $('#portfolio-grid');
	var portfolioItem = portfolio.find('li');
	var projectLength = portfolioItem.length;
	var prevButton = $('#project-container .prev');
	var nextButton = $('#project-container .next');
	
	// Direction Aware Hover Effect
	/*portfolio.find('li').each(function() { 
		$(this).hoverdir({
			speed : 			200,
			hoverDelay : 	100
		});
	});*/
	
	function projectFunctions() {
			
		/* FitVids v1.0 - Fluid Width Video Embeds
			https://github.com/davatron5000/FitVids.js/
			-------------------------*/
			$('.video-full-width').fitVids();
			$('.fluid-width-video-wrapper').css('padding-top','56.25%'); // Always display videos 16:9 (100/16*9=56.25)
			
			$('#project-container .spinner').fadeOut(1000);
	};
	
	// Opening a Project
	portfolioItem.find('a').click(function(e) {
		e.preventDefault();
		
		// Show Loading Spinner
		$('#project-container .spinner').show(0);
		
		// Disable browser scrollbar
		$('body').addClass('overflow-hidden');
		
		var projectLink = $(this).attr('href');
		var projectOpen = portfolio.find(this).attr('href',projectLink).closest('li');
		
		// Add class "open" to opened project
		projectOpen.addClass('open');
		
		// Disable prev link, when first project is open
		if (projectOpen.index() == 0) {	prevButton.addClass('disabled'); }
		else { prevButton.attr('href', projectOpen.prev('li').find('.project-link').attr('href')); }
		
		// Disable next link, when last project is open
		if (projectOpen.index()+1 == projectLength) { nextButton.addClass('disabled'); }
		else { nextButton.attr('href', projectOpen.next('li').find('.project-link').attr('href')); }
		
		// Show project popup and load project content
		$('#project-container').addClass('show');
		
		$('.project-content').load('index.html '+projectLink, function() {				
			projectFunctions();			
		});
		
	});
	
	// Button: Previous Project
	$('.prev').click(function() {
	
		$('#project-container .spinner').show(200);
	
		var currentProject = portfolio.find('.open');
		var currentIndex = currentProject.index()+1;
		
		// Enable next button when going to the previous project
		$('.next').removeClass('disabled');
		
		// Disable prev button when reaching first project
		if (currentIndex <= 2) { $('.prev').addClass('disabled'); }		
		var prevProjectLink = currentProject.prev('li').find('a').attr('href');
		
		currentProject.removeClass('open').prev('li').addClass('open');
		
		$('.project-content').load('index.html '+prevProjectLink, function() {			
			projectFunctions();		
		});
		
	});
	
	// Button: Next Project
	$('.next').click(function() {
	
		$('#project-container .spinner').show(200);
		
		var currentProject = portfolio.find('.open');
		var currentIndex = currentProject.index()+1;
		
		// Enable prev button when going to the next project
		$('.prev').removeClass('disabled'); 
		
		// Disable next button when reaching the last project
		if ( currentIndex+1 >= projectLength ) { $('.next').addClass('disabled'); }		
		var nextProjectLink = currentProject.next('li').find('a').attr('href');		
		currentProject.removeClass('open').next('li').addClass('open');

		$('.project-content').load('index.html '+nextProjectLink, function() {		
			projectFunctions();
		});
		
	});
	
	// Close button
	$('.close').click(function() {
		// Enable browser scrollbar
		$('body').removeClass('overflow-hidden');
		$('#project-container').removeClass('show');
		portfolio.find('.open').removeClass('open');
	});
	
	// Close using "ESC" key
	$(document).keyup(function(e) {
    if (e.keyCode == 27) {
    	// Enable browser scrollbar
			$('body').removeClass('overflow-hidden');
      $('#project-container').removeClass('show');
      portfolio.find('.open').removeClass('open');
    }
	});
	
	// FitVids
	$('.video-full-width').fitVids();
	
	
	

	
	

	
});
