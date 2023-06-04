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

    // PCサイズ(※)以上のとき、100pxスクロールしたらGo to Topボタンを表示
    // ※スクロールバーの幅を加味して(768-17)pxで指定
    var pagetop = $('.p-go-to-top');
    pagetop.hide();
    $(window).scroll(function () {
        var windowSize = $(window).width();
        if (windowSize >= 751) {
            if ($(this).scrollTop() > 100) {
                pagetop.fadeIn();
            } else {
                pagetop.fadeOut();
                $('.p-go-to-top__icon').removeClass('is-out');
            }
        }
    });
    // Go to Topボタンのクリック処理
    pagetop.click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 300);  // 0.3秒かけてトップへ移動
        return false;
    });

    // Go to Topボタンのhover処理
    $('.p-go-to-top__icon').hover(function(){
        $(this).addClass('is-hover');
        $(this).removeClass('is-out');
    }, function(){
        $(this).addClass('is-out');
        $(this).removeClass('is-hover');
    });

    // トップのコンテンツ部分にスクロールした瞬間、背景画像が横からスライドする動き
    $('.p-top-article--service, .p-top-article--about-us').each(function(i, elem){
        var contentsPOS = $(elem).offset().top;
        $(window).on('load scroll resize', function(){
            var winHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            var showClass = 'show';
            var timing = 100; // 100pxコンテンツが見えたら次のif文がtrue
            if (scrollTop >= contentsPOS - winHeight + timing){
                $(elem).addClass(showClass);
            } else {
                $(elem).removeClass(showClass);
            }
        });
    });
} );