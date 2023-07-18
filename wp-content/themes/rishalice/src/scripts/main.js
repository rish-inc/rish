jQuery( function( $ ) {
    const pageload = require( './pageload.js' );
    const effect = require( './effect.js' );
    const slide = require( './infiniteslidev2.js' );
    const modaalminjs = require( './modaal/js/modaal.min.js' );
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

    // Go to Topボタン / 背景パララックス処理
    var pagetop = $('.p-go-to-top');
    pagetop.hide();
    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();
        var bg1 = $('.c-bg--parallax1');
        var bg2 = $('.c-bg--parallax2');
        var weight1 = 0.5;
        var weight2 = 0.2;
        var windowSize = $(window).width();
        if (windowSize >= 751) { // スクロールバーの幅を加味して(768-17)pxで指定
            // PCサイズ以上：Go to Topボタンの処理
            if (scrolled > 100) { // 100pxスクロールしたらボタン表示
                pagetop.fadeIn();
            } else {
                pagetop.fadeOut();
                $('.p-go-to-top__icon').removeClass('is-out');
            }

            // PCサイズ以上：背景パララックスの処理
            if (windowSize >= 1183) {
                var initial = 216;
            } else if (windowSize >= 1007) {
                var initial = 140;
            } else {
                var initial = 100;
            }
            bg1.css('background-position', 'left top -'+ scrolled * weight1 + 'px');
            bg2.css('background-position-y', initial - scrolled * weight2 + 'px');

        } else {
            // PCサイズ未満：パララックスのスピードを遅らせる
            var initial = 50;
            bg1.css('background-position', 'left top -'+ scrolled * weight1 * 0.5 + 'px');
            bg2.css('background-position-y', initial - scrolled * weight2 * 0.2 + 'px');
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
    $('.p-top-article--works, .p-top-article--service, .p-top-article--about-us').each(function(i, elem){
        var contentsPOS = $(elem).offset().top;
        $(window).on('load scroll resize', function(){
            var winHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            var showClass = 'show';
            var timing = 200; // 200pxコンテンツが見えたら次のif文がtrue
            if (scrollTop >= contentsPOS - winHeight + timing){
                $(elem).addClass(showClass);
            } else {
                $(elem).removeClass(showClass);
            }
        });
    });
} );