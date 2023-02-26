jQuery( function( $ ) {
	const config = require( './config.js' );

	// ハンバーガーボタンのクリック処理
    $('.p-header__button').click(function () {
        $(this).children('span').toggleClass('open');
		$('#menu-header-menu').toggleClass('open');
    });

    // 親メニューのクリック処理
    $('.menu-item-has-children').on('click', function() {
        $(this).children('a').toggleClass('open');
        $(this).children('.sub-menu').toggleClass('open');
        $('#menu-header-menu').toggleClass('is-long');
    });

    $(document).click(function(event) {
        // 親メニューの外側をクリックしたとき、クラス名を削除
        if(!$(event.target).closest('.menu-item-has-children').length) {
            $('.menu-item-has-children').children('a').removeClass('open');
            $('.menu-item-has-children').children('.sub-menu').removeClass('open');
            $('#menu-header-menu').removeClass('is-long');
        }
    });

    // 画面がリサイズされたとき、全てのクラス名を削除
    $(window).resize(function(){
        $('.p-header__button').children('span').removeClass('open');
		$('#menu-header-menu').removeClass('open');
        $('.menu-item-has-children').children('a').removeClass('open');
        $('.menu-item-has-children').children('.sub-menu').removeClass('open');
        $('#menu-header-menu').removeClass('is-long');
    });

    // Go to Topボタンのクリック処理
    var pagetop = $('.p-go-to-top');   
    pagetop.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {  // 100pxスクロールしたら表示
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });
    pagetop.click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 300);  // 0.3秒かけてトップへ移動
        return false;
    });
} );
