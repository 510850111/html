/* only play video on desktop devices */
trueMobile = isMobile.any();
	if( trueMobile == null ) {
			 $.okvideo({ source: 'ZouARplh7iY', 
			 volume: 0.1, 
			 loop: true,
			 hd:true, 
			 adproof: true,
			 annotations: false,
			 onFinished: function() { console.log('finished') },
			 unstarted: function() { console.log('unstarted') },
			 onReady: function() { console.log('onready') },
			 onPlay: function() { console.log('onplay') },
			 onPause: function() { console.log('pause') },
			 buffering: function() { console.log('buffering') },
			 cued: function() { console.log('cued') },
		});
	}			
	if (trueMobile){
		$('#topSlide').addClass('mob-video');
		$('.sections').removeClass('nobg');
		$('.player').remove();
	}// JavaScript Document