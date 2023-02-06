jQuery( function( $ ) {
	const config = require( './config.js' );

	// ハンバーガーボタンのクリック処理
    $(".p-header__button").click(function () {
        $(this).children("span").toggleClass('open');
		$("#menu-header-menu").toggleClass('open');
    });

    // 親メニューのクリック処理
    $(".menu-item-has-children").on('click', function() {
        $(this).children("a").toggleClass('open');
        $(this).children(".sub-menu").slideToggle('fast');
    });
} );
