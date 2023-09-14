/*
 * Masonry
 */
window.addEventListener( 'load', function() {
	const elem = document.querySelector( '.js-masonry' );
	let msnry = new Masonry( elem, {
		itemSelector: '.js-masonry__item',
		// isFitWidth: true,
		// gutter: 40,
		horizontalOrder: true
	} );
} );