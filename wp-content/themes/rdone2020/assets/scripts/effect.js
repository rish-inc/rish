jQuery( function( $ ) {
	$( '.mv' ).addClass( 'is-fade-in' );
	window.onload = function() {
		scrollEffect();
		$( window ).on( 'scroll', function() {
			scrollEffect();
		} );
		function scrollEffect() {
			$( '.is-fade' ).each( function() {
				let elm = $( this ).offset().top;
				let scroll = $( window ).scrollTop();
				let windowH = $( window ).height();
				if( scroll > elm - windowH ) {
					$( this ).addClass( 'is-scroll' );
				}
			} );
		}
	}
} );
