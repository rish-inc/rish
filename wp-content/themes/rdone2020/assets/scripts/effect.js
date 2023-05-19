// const mv = document.querySelector( '.mv' );
// mv.classList.add( 'is-fade-in' );


window.onload = function() {
	// document.querySelector( 'body' ).style.display = 'flex';
	document.querySelectorAll( '.mv' ).forEach( function( el ) {
		el.classList.add( 'is-fade-in' );
	} );
	document.querySelectorAll( '.p-logo--header' ).forEach( function( el ) {
		el.classList.add( 'is-fade-in' );
	} );
	document.querySelector( 'body' ).classList.add( 'is-fade-in' );
	scrollEffect();
	window.addEventListener( 'scroll', function() {
		scrollEffect();
	} );
}

function scrollEffect() {
	const elements = document.querySelectorAll( '.is-fade' );

	for ( let i = 0; i < elements.length; i++ ) {
		let element = elements[i];
		let positionFromTop = element.getBoundingClientRect().top + window.pageYOffset;
		let scroll = window.pageYOffset || document.documentElement.scrollTop;
		let windowH = window.innerHeight;

		if ( scroll > positionFromTop - windowH ) {
			element.classList.add( 'is-scroll' );
		}
	}
}
