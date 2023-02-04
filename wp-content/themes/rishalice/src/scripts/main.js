jQuery( function( $ ) {
	const config = require( './config.js' );

	// ハンバーガーボタンをクリックしたとき
    $(".p-header__button").click(function () {
        $(this).children("span").toggleClass('open');
		$("#menu-header-menu").toggleClass('open');
    });
} );
