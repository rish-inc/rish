(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

jQuery(function ($) {});

},{}],2:[function(require,module,exports){
"use strict";

jQuery(function ($) {
  var config = require('./config.js');

  // ハンバーガーボタンのクリック処理
  $(".p-header__button").click(function () {
    $(this).children("span").toggleClass('open');
    $("#menu-header-menu").toggleClass('open');
  });

  // 親メニューのクリック処理
  $(".menu-item-has-children").on('click', function () {
    $(this).toggleClass('active');
    $(this).children("a").toggleClass('open');
    $(this).children(".sub-menu").toggleClass('open');
    // $(this).children(".sub-menu").slideToggle('fast');
  });

  // function mediaQueriesWin(){
  //     var width = $(window).width();
  //     if(width <= 768) {//横幅が768px以下の場合 $(".has-child>a").off('click');	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
  //         $(".menu-item-has-children>a").on('click', function() {//has-childクラスがついたaタグをクリックしたら
  //             var parentElem =  $(this).parent();// aタグから見た親要素のliを取得し
  //             $(parentElem).toggleClass('active');//矢印方向を変えるためのクラス名を付与して
  //             $(parentElem).children('ul').toggleClass('open');
  //             $(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
  //             return false;//リンクの無効化
  //         });
  //     }
  //     else{//横幅が768px以上の場合
  //         $(".menu-item-has-children>a").off('click');//has-childクラスがついたaタグのonイベントをoff(無効)にし
  //         $(".menu-item-has-children").removeClass('active');//activeクラスを削除
  //         $(".menu-item-has-children").children('ul').removeClass('open');
  //         $('.menu-item-has-children').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする
  //     }
  // }

  // // ページがリサイズされたら動かしたい場合の記述
  // $(window).resize(function() {
  //     mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
  // });

  // // ページが読み込まれたらすぐに動かしたい場合の記述
  // $(window).on('load',function(){
  //     mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
  // });
});

},{"./config.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxNQUFNLENBQUUsVUFBVSxDQUFDLEVBQUcsQ0FDdEIsQ0FBQyxDQUFFOzs7OztBQ0RILE1BQU0sQ0FBRSxVQUFVLENBQUMsRUFBRztFQUNyQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUUsYUFBYSxDQUFFOztFQUV2QztFQUNHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO0lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0VBQ3hDLENBQUMsQ0FBQzs7RUFFRjtFQUNBLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2pEO0VBQ0osQ0FBQyxDQUFDOztFQUVGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtBQUNKLENBQUMsQ0FBRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImpRdWVyeSggZnVuY3Rpb24oICQgKSB7XG59ICk7XG4iLCJqUXVlcnkoIGZ1bmN0aW9uKCAkICkge1xuXHRjb25zdCBjb25maWcgPSByZXF1aXJlKCAnLi9jb25maWcuanMnICk7XG5cblx0Ly8g44OP44Oz44OQ44O844Ks44O844Oc44K/44Oz44Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgJChcIi5wLWhlYWRlcl9fYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcInNwYW5cIikudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblx0XHQkKFwiI21lbnUtaGVhZGVyLW1lbnVcIikudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICB9KTtcblxuICAgIC8vIOimquODoeODi+ODpeODvOOBruOCr+ODquODg+OCr+WHpueQhlxuICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oXCJhXCIpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oXCIuc3ViLW1lbnVcIikudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgLy8gJCh0aGlzKS5jaGlsZHJlbihcIi5zdWItbWVudVwiKS5zbGlkZVRvZ2dsZSgnZmFzdCcpO1xuICAgIH0pO1xuXG4gICAgLy8gZnVuY3Rpb24gbWVkaWFRdWVyaWVzV2luKCl7XG4gICAgLy8gICAgIHZhciB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgIC8vICAgICBpZih3aWR0aCA8PSA3NjgpIHsvL+aoquW5heOBjDc2OHB45Lul5LiL44Gu5aC05ZCIICQoXCIuaGFzLWNoaWxkPmFcIikub2ZmKCdjbGljaycpO1x0Ly9oYXMtY2hpbGTjgq/jg6njgrnjgYzjgaTjgYTjgZ9h44K/44Kw44Gub27jgqTjg5njg7Pjg4jjgpLopIfmlbDnmbvpjLLjgpLpgb/jgZHjgovngrpvZmbjgavjgZfjgabkuIDml6bliJ3mnJ/nirbmhYvjgbhcbiAgICAvLyAgICAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlbj5hXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgey8vaGFzLWNoaWxk44Kv44Op44K544GM44Gk44GE44GfYeOCv+OCsOOCkuOCr+ODquODg+OCr+OBl+OBn+OCiVxuICAgIC8vICAgICAgICAgICAgIHZhciBwYXJlbnRFbGVtID0gICQodGhpcykucGFyZW50KCk7Ly8gYeOCv+OCsOOBi+OCieimi+OBn+imquimgee0oOOBrmxp44KS5Y+W5b6X44GXXG4gICAgLy8gICAgICAgICAgICAgJChwYXJlbnRFbGVtKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7Ly/nn6LljbDmlrnlkJHjgpLlpInjgYjjgovjgZ/jgoHjga7jgq/jg6njgrnlkI3jgpLku5jkuI7jgZfjgaZcbiAgICAvLyAgICAgICAgICAgICAkKHBhcmVudEVsZW0pLmNoaWxkcmVuKCd1bCcpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgLy8gICAgICAgICAgICAgJChwYXJlbnRFbGVtKS5jaGlsZHJlbigndWwnKS5zdG9wKCkuc2xpZGVUb2dnbGUoNTAwKTsvL2xp44Gu5a2Q6KaB57Sg44Gu44K544Op44Kk44OJ44KS6ZaL6ZaJ44GV44Gb44KL4oC75pWw5a2X44GM5aSn44GN44GP44Gq44KL44G744Gp44KG44Gj44GP44KK6ZaL44GPXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlOy8v44Oq44Oz44Kv44Gu54Sh5Yq55YyWXG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNley8v5qiq5bmF44GMNzY4cHjku6XkuIrjga7loLTlkIhcbiAgICAvLyAgICAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlbj5hXCIpLm9mZignY2xpY2snKTsvL2hhcy1jaGlsZOOCr+ODqeOCueOBjOOBpOOBhOOBn2Hjgr/jgrDjga5vbuOCpOODmeODs+ODiOOCkm9mZijnhKHlirkp44Gr44GXXG4gICAgLy8gICAgICAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpOy8vYWN0aXZl44Kv44Op44K544KS5YmK6ZmkXG4gICAgLy8gICAgICAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oJ3VsJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAvLyAgICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJ3VsJykuY3NzKFwiZGlzcGxheVwiLFwiXCIpOy8v44K544Op44Kk44OJ44OI44Kw44Or44Gn5YuV5L2c44GX44GfZGlzcGxheeOCgueEoeWKueWMluOBq+OBmeOCi1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIFxuICAgIC8vIC8vIOODmuODvOOCuOOBjOODquOCteOCpOOCuuOBleOCjOOBn+OCieWLleOBi+OBl+OBn+OBhOWgtOWQiOOBruiomOi/sFxuICAgIC8vICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIG1lZGlhUXVlcmllc1dpbigpOy8qIOODieODreODg+ODl+ODgOOCpuODs+OBrumWouaVsOOCkuWRvOOBtiovXG4gICAgLy8gfSk7XG4gICAgXG4gICAgLy8gLy8g44Oa44O844K444GM6Kqt44G/6L6844G+44KM44Gf44KJ44GZ44GQ44Gr5YuV44GL44GX44Gf44GE5aC05ZCI44Gu6KiY6L+wXG4gICAgLy8gJCh3aW5kb3cpLm9uKCdsb2FkJyxmdW5jdGlvbigpe1xuICAgIC8vICAgICBtZWRpYVF1ZXJpZXNXaW4oKTsvKiDjg4njg63jg4Pjg5fjg4Djgqbjg7Pjga7plqLmlbDjgpLlkbzjgbYqL1xuICAgIC8vIH0pO1xufSApO1xuIl19
