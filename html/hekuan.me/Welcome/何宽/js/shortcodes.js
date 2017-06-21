$(document).ready(function(){
	$('.accordion').each(function(){
		var acc=$(this).attr("rel")*2;$(this).find('.accordion-inner:nth-child('+ acc+')').show();
		$(this).find('.accordion-inner:nth-child('+ acc+')').prev().addClass("active");});
		$('.accordion .accordion-title').click(
		function(){
		if(
		$(this).next().is(':hidden')){
			$(this).parent().find('.accordion-title').removeClass('active').next().slideUp(200);
			$(this).toggleClass('active').next().slideDown(200);
		}
		return false;
	});
	if($(".toggle .toggle-title").hasClass('active')){
		$(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();}
		
	$(".toggle .toggle-title").click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200);
		}
		else{
			$(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200);
			}
		});
	$('.tabs div').hide();
	$('.tabs div:first').show();
	$('.tabs ul li:first').addClass('active');
	$('.tabs ul li a').click(function(){
		$('.tabs ul li').removeClass('active');
		$(this).parent().addClass('active');
		var currentTab=$(this).attr('href');
		$('.tabs div').hide();$(currentTab).show();
		return false;
	});
	
	$('.image-popup').magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          mainClass: 'mfp-img-mobile',
          image: {
            verticalFit: true
          }         
     });

     $('.popup-youtube, .popup-vimeo').magnificPopup({
		disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });
	  
	  
		var targets = $( '[name~=tooltip]' ),
			target	= false,
			tooltip = false,
			title	= false;

		targets.bind( 'mouseenter', function()
		{
			target	= $( this );
			tip		= target.attr( 'title' );
			tooltip	= $( '<div id="tooltip"></div>' );

			if( !tip || tip == '' )
				return false;

			target.removeAttr( 'title' );
			tooltip.css( 'opacity', 0 )
				   .html( tip )
				   .appendTo( 'body' );

			var init_tooltip = function()
			{
				if( $( window ).width() < tooltip.outerWidth() * 1.5 )
					tooltip.css( 'max-width', $( window ).width() / 2 );
				else
					tooltip.css( 'max-width', 340 );

				var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
					pos_top	 = target.offset().top - tooltip.outerHeight() - 20;

				if( pos_left < 0 )
				{
					pos_left = target.offset().left + target.outerWidth() / 2 - 20;
					tooltip.addClass( 'left' );
				}
				else
					tooltip.removeClass( 'left' );

				if( pos_left + tooltip.outerWidth() > $( window ).width() )
				{
					pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
					tooltip.addClass( 'right' );
				}
				else
					tooltip.removeClass( 'right' );

				if( pos_top < 0 )
				{
					var pos_top	 = target.offset().top + target.outerHeight();
					tooltip.addClass( 'top' );
				}
				else
					tooltip.removeClass( 'top' );

				tooltip.css( { left: pos_left, top: pos_top } )
					   .animate( { top: '+=10', opacity: 1 }, 50 );
			};

			init_tooltip();
			$( window ).resize( init_tooltip );

			var remove_tooltip = function()
			{
				tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
				{
					$( this ).remove();
				});

				target.attr( 'title', tip );
			};

			target.bind( 'mouseleave', remove_tooltip );
			tooltip.bind( 'click', remove_tooltip );
		});
});