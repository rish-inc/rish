const mv = document.querySelector( '.mv' );

mv.classList.add( 'is-fade' );

window.onload = function() {
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
