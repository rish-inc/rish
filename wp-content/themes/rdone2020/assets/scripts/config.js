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

	/*
	 * Masonry
	 */
	const elem = document.querySelector( '.js-masonry' );
	let msnry = new Masonry( elem, {
		itemSelector: '.js-masonry__item',
		// isFitWidth: true,
		gutter: 40,
		horizontalOrder: true
	} );
} );
