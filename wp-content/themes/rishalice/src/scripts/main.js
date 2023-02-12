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
        $(this).children(".sub-menu").toggleClass('open');
        $("#menu-header-menu").toggleClass('is-long');
    });

    $(document).click(function(event) {
        // 親メニューの外側をクリックしたとき、クラス名を削除
        if(!$(event.target).closest('.menu-item-has-children').length) {
            $('.menu-item-has-children').children("a").removeClass('open');
            $('.menu-item-has-children').children(".sub-menu").removeClass('open');
            $("#menu-header-menu").removeClass('is-long');
        }
    });
} );
