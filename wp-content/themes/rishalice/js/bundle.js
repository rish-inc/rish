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
    $(this).children("a").toggleClass('open');
    $(this).children(".sub-menu").toggleClass('open');
    $(this).children(".sub-menu").slideToggle('fast');
  });

  // $("#menu-header-left-menu .menu-item-has-children").on('click', function() {
  //     $(this).children(".sub-menu").slideToggle('fast');
  // });

  function mediaQueriesWin() {
    var width = $(window).width();
    if (width <= 768) {
      //横幅が768px以下の場合 $(".has-child>a").off('click');	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
      $(".menu-item-has-children>a").on('click', function () {
        //has-childクラスがついたaタグをクリックしたら
        var parentElem = $(this).parent(); // aタグから見た親要素のliを取得し
        $(parentElem).toggleClass('active'); //矢印方向を変えるためのクラス名を付与して
        $(parentElem).children('ul').stop().slideToggle(500); //liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
        return false; //リンクの無効化
      });
    } else {
      //横幅が768px以上の場合
      $(".menu-item-has-children>a").off('click'); //has-childクラスがついたaタグのonイベントをoff(無効)にし
      $(".menu-item-has-children").removeClass('active'); //activeクラスを削除
      $('.menu-item-has-children').children('ul').css("display", ""); //スライドトグルで動作したdisplayも無効化にする
    }
  }

  // ページがリサイズされたら動かしたい場合の記述
  $(window).resize(function () {
    mediaQueriesWin(); /* ドロップダウンの関数を呼ぶ*/
  });

  // ページが読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function () {
    mediaQueriesWin(); /* ドロップダウンの関数を呼ぶ*/
  });
});

},{"./config.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxNQUFNLENBQUUsVUFBVSxDQUFDLEVBQUcsQ0FDdEIsQ0FBQyxDQUFFOzs7OztBQ0RILE1BQU0sQ0FBRSxVQUFVLENBQUMsRUFBRztFQUNyQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUUsYUFBYSxDQUFFOztFQUV2QztFQUNHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO0lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0VBQ3hDLENBQUMsQ0FBQzs7RUFFRjtFQUNBLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztFQUNyRCxDQUFDLENBQUM7O0VBRUY7RUFDQTtFQUNBOztFQUVBLFNBQVMsZUFBZSxHQUFFO0lBQ3RCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUU7SUFDN0IsSUFBRyxLQUFLLElBQUksR0FBRyxFQUFFO01BQUM7TUFDZCxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVc7UUFBQztRQUNuRCxJQUFJLFVBQVUsR0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxPQUFPLEtBQUssQ0FBQztNQUNqQixDQUFDLENBQUM7SUFDTixDQUFDLE1BQ0c7TUFBQztNQUNELENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztNQUM1QyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7TUFDbkQsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEU7RUFDSjs7RUFFQTtFQUNBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBVztJQUN4QixlQUFlLEVBQUUsQ0FBQztFQUN0QixDQUFDLENBQUM7O0VBRUY7RUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxZQUFVO0lBQzFCLGVBQWUsRUFBRSxDQUFDO0VBQ3RCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImpRdWVyeSggZnVuY3Rpb24oICQgKSB7XG59ICk7XG4iLCJqUXVlcnkoIGZ1bmN0aW9uKCAkICkge1xuXHRjb25zdCBjb25maWcgPSByZXF1aXJlKCAnLi9jb25maWcuanMnICk7XG5cblx0Ly8g44OP44Oz44OQ44O844Ks44O844Oc44K/44Oz44Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgJChcIi5wLWhlYWRlcl9fYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcInNwYW5cIikudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblx0XHQkKFwiI21lbnUtaGVhZGVyLW1lbnVcIikudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICB9KTtcblxuICAgIC8vIOimquODoeODi+ODpeODvOOBruOCr+ODquODg+OCr+WHpueQhlxuICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImFcIikudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcIi5zdWItbWVudVwiKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKFwiLnN1Yi1tZW51XCIpLnNsaWRlVG9nZ2xlKCdmYXN0Jyk7XG4gICAgfSk7XG5cbiAgICAvLyAkKFwiI21lbnUtaGVhZGVyLWxlZnQtbWVudSAubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgJCh0aGlzKS5jaGlsZHJlbihcIi5zdWItbWVudVwiKS5zbGlkZVRvZ2dsZSgnZmFzdCcpO1xuICAgIC8vIH0pO1xuXG4gICAgZnVuY3Rpb24gbWVkaWFRdWVyaWVzV2luKCl7XG4gICAgICAgIHZhciB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICBpZih3aWR0aCA8PSA3NjgpIHsvL+aoquW5heOBjDc2OHB45Lul5LiL44Gu5aC05ZCIICQoXCIuaGFzLWNoaWxkPmFcIikub2ZmKCdjbGljaycpO1x0Ly9oYXMtY2hpbGTjgq/jg6njgrnjgYzjgaTjgYTjgZ9h44K/44Kw44Gub27jgqTjg5njg7Pjg4jjgpLopIfmlbDnmbvpjLLjgpLpgb/jgZHjgovngrpvZmbjgavjgZfjgabkuIDml6bliJ3mnJ/nirbmhYvjgbhcbiAgICAgICAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlbj5hXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgey8vaGFzLWNoaWxk44Kv44Op44K544GM44Gk44GE44GfYeOCv+OCsOOCkuOCr+ODquODg+OCr+OBl+OBn+OCiVxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRFbGVtID0gICQodGhpcykucGFyZW50KCk7Ly8gYeOCv+OCsOOBi+OCieimi+OBn+imquimgee0oOOBrmxp44KS5Y+W5b6X44GXXG4gICAgICAgICAgICAgICAgJChwYXJlbnRFbGVtKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7Ly/nn6LljbDmlrnlkJHjgpLlpInjgYjjgovjgZ/jgoHjga7jgq/jg6njgrnlkI3jgpLku5jkuI7jgZfjgaZcbiAgICAgICAgICAgICAgICAkKHBhcmVudEVsZW0pLmNoaWxkcmVuKCd1bCcpLnN0b3AoKS5zbGlkZVRvZ2dsZSg1MDApOy8vbGnjga7lrZDopoHntKDjga7jgrnjg6njgqTjg4njgpLplovplonjgZXjgZvjgovigLvmlbDlrZfjgYzlpKfjgY3jgY/jgarjgovjgbvjganjgobjgaPjgY/jgorplovjgY9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7Ly/jg6rjg7Pjgq/jga7nhKHlirnljJZcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7Ly/mqKrluYXjgYw3NjhweOS7peS4iuOBruWgtOWQiFxuICAgICAgICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuPmFcIikub2ZmKCdjbGljaycpOy8vaGFzLWNoaWxk44Kv44Op44K544GM44Gk44GE44GfYeOCv+OCsOOBrm9u44Kk44OZ44Oz44OI44KSb2ZmKOeEoeWKuSnjgavjgZdcbiAgICAgICAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7Ly9hY3RpdmXjgq/jg6njgrnjgpLliYrpmaRcbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJ3VsJykuY3NzKFwiZGlzcGxheVwiLFwiXCIpOy8v44K544Op44Kk44OJ44OI44Kw44Or44Gn5YuV5L2c44GX44GfZGlzcGxheeOCgueEoeWKueWMluOBq+OBmeOCi1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIOODmuODvOOCuOOBjOODquOCteOCpOOCuuOBleOCjOOBn+OCieWLleOBi+OBl+OBn+OBhOWgtOWQiOOBruiomOi/sFxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgIG1lZGlhUXVlcmllc1dpbigpOy8qIOODieODreODg+ODl+ODgOOCpuODs+OBrumWouaVsOOCkuWRvOOBtiovXG4gICAgfSk7XG4gICAgXG4gICAgLy8g44Oa44O844K444GM6Kqt44G/6L6844G+44KM44Gf44KJ44GZ44GQ44Gr5YuV44GL44GX44Gf44GE5aC05ZCI44Gu6KiY6L+wXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJyxmdW5jdGlvbigpe1xuICAgICAgICBtZWRpYVF1ZXJpZXNXaW4oKTsvKiDjg4njg63jg4Pjg5fjg4Djgqbjg7Pjga7plqLmlbDjgpLlkbzjgbYqL1xuICAgIH0pO1xufSApO1xuIl19
