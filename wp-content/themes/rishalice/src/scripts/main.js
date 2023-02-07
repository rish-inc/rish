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
        $(this).children(".sub-menu").slideToggle('fast');
    });

    // $("#menu-header-left-menu .menu-item-has-children").on('click', function() {
    //     $(this).children(".sub-menu").slideToggle('fast');
    // });

    function mediaQueriesWin(){
        var width = $(window).width();
        if(width <= 768) {//横幅が768px以下の場合 $(".has-child>a").off('click');	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
            $(".menu-item-has-children>a").on('click', function() {//has-childクラスがついたaタグをクリックしたら
                var parentElem =  $(this).parent();// aタグから見た親要素のliを取得し
                $(parentElem).toggleClass('active');//矢印方向を変えるためのクラス名を付与して
                $(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
                return false;//リンクの無効化
            });
        }
        else{//横幅が768px以上の場合
            $(".menu-item-has-children>a").off('click');//has-childクラスがついたaタグのonイベントをoff(無効)にし
            $(".menu-item-has-children").removeClass('active');//activeクラスを削除
            $('.menu-item-has-children').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする
        }
    }
    
    // ページがリサイズされたら動かしたい場合の記述
    $(window).resize(function() {
        mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
    });
    
    // ページが読み込まれたらすぐに動かしたい場合の記述
    $(window).on('load',function(){
        mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
    });
} );
