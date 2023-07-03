jQuery( function( $ ) {
	/*
	 * infiniteslide
	 */
	$( '.js-infiniteslide--left' ).infiniteslide( {
		'direction'   : 'left',
		'speed'       : 20,
		'pauseonhover': true,
		'clone'       : 2,
		'responsive'  : true,
	} );
	$( '.js-infiniteslide--right' ).infiniteslide( {
		'direction'   : 'right',
		'speed'       : 20,
		'pauseonhover': true,
		'clone'       : 2,
		'responsive'  : true,
	} );

	/*
	 * Modaal
	 */
	$( '.gallery' ).modaal ( {
		type: 'image',
		background: '#fff',
		overlay_opacity: '0.5',
		fullscreen: true
	} );
} );