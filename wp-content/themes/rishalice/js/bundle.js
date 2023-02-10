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
    $(this).children(".sub-menu").slideToggle('fast');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxNQUFNLENBQUUsVUFBVSxDQUFDLEVBQUcsQ0FDdEIsQ0FBQyxDQUFFOzs7OztBQ0RILE1BQU0sQ0FBRSxVQUFVLENBQUMsRUFBRztFQUNyQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUUsYUFBYSxDQUFFOztFQUV2QztFQUNHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO0lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0VBQ3hDLENBQUMsQ0FBQzs7RUFFRjtFQUNBLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztFQUNyRCxDQUFDLENBQUM7O0VBRUY7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0FBQ0osQ0FBQyxDQUFFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwialF1ZXJ5KCBmdW5jdGlvbiggJCApIHtcbn0gKTtcbiIsImpRdWVyeSggZnVuY3Rpb24oICQgKSB7XG5cdGNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoICcuL2NvbmZpZy5qcycgKTtcblxuXHQvLyDjg4/jg7Pjg5Djg7zjgqzjg7zjg5zjgr/jg7Pjga7jgq/jg6rjg4Pjgq/lh6bnkIZcbiAgICAkKFwiLnAtaGVhZGVyX19idXR0b25cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKFwic3BhblwiKS50b2dnbGVDbGFzcygnb3BlbicpO1xuXHRcdCQoXCIjbWVudS1oZWFkZXItbWVudVwiKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIH0pO1xuXG4gICAgLy8g6Kaq44Oh44OL44Ol44O844Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImFcIikudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcIi5zdWItbWVudVwiKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKFwiLnN1Yi1tZW51XCIpLnNsaWRlVG9nZ2xlKCdmYXN0Jyk7XG4gICAgfSk7XG5cbiAgICAvLyBmdW5jdGlvbiBtZWRpYVF1ZXJpZXNXaW4oKXtcbiAgICAvLyAgICAgdmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgLy8gICAgIGlmKHdpZHRoIDw9IDc2OCkgey8v5qiq5bmF44GMNzY4cHjku6XkuIvjga7loLTlkIggJChcIi5oYXMtY2hpbGQ+YVwiKS5vZmYoJ2NsaWNrJyk7XHQvL2hhcy1jaGlsZOOCr+ODqeOCueOBjOOBpOOBhOOBn2Hjgr/jgrDjga5vbuOCpOODmeODs+ODiOOCkuikh+aVsOeZu+mMsuOCkumBv+OBkeOCi+eCum9mZuOBq+OBl+OBpuS4gOaXpuWIneacn+eKtuaFi+OBuFxuICAgIC8vICAgICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuPmFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7Ly9oYXMtY2hpbGTjgq/jg6njgrnjgYzjgaTjgYTjgZ9h44K/44Kw44KS44Kv44Oq44OD44Kv44GX44Gf44KJXG4gICAgLy8gICAgICAgICAgICAgdmFyIHBhcmVudEVsZW0gPSAgJCh0aGlzKS5wYXJlbnQoKTsvLyBh44K/44Kw44GL44KJ6KaL44Gf6Kaq6KaB57Sg44GubGnjgpLlj5blvpfjgZdcbiAgICAvLyAgICAgICAgICAgICAkKHBhcmVudEVsZW0pLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTsvL+efouWNsOaWueWQkeOCkuWkieOBiOOCi+OBn+OCgeOBruOCr+ODqeOCueWQjeOCkuS7mOS4juOBl+OBplxuICAgIC8vICAgICAgICAgICAgICQocGFyZW50RWxlbSkuY2hpbGRyZW4oJ3VsJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAvLyAgICAgICAgICAgICAkKHBhcmVudEVsZW0pLmNoaWxkcmVuKCd1bCcpLnN0b3AoKS5zbGlkZVRvZ2dsZSg1MDApOy8vbGnjga7lrZDopoHntKDjga7jgrnjg6njgqTjg4njgpLplovplonjgZXjgZvjgovigLvmlbDlrZfjgYzlpKfjgY3jgY/jgarjgovjgbvjganjgobjgaPjgY/jgorplovjgY9cbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7Ly/jg6rjg7Pjgq/jga7nhKHlirnljJZcbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2V7Ly/mqKrluYXjgYw3NjhweOS7peS4iuOBruWgtOWQiFxuICAgIC8vICAgICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuPmFcIikub2ZmKCdjbGljaycpOy8vaGFzLWNoaWxk44Kv44Op44K544GM44Gk44GE44GfYeOCv+OCsOOBrm9u44Kk44OZ44Oz44OI44KSb2ZmKOeEoeWKuSnjgavjgZdcbiAgICAvLyAgICAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7Ly9hY3RpdmXjgq/jg6njgrnjgpLliYrpmaRcbiAgICAvLyAgICAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5jaGlsZHJlbigndWwnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgIC8vICAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbigndWwnKS5jc3MoXCJkaXNwbGF5XCIsXCJcIik7Ly/jgrnjg6njgqTjg4njg4jjgrDjg6vjgafli5XkvZzjgZfjgZ9kaXNwbGF544KC54Sh5Yq55YyW44Gr44GZ44KLXG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgXG4gICAgLy8gLy8g44Oa44O844K444GM44Oq44K144Kk44K644GV44KM44Gf44KJ5YuV44GL44GX44Gf44GE5aC05ZCI44Gu6KiY6L+wXG4gICAgLy8gJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgbWVkaWFRdWVyaWVzV2luKCk7Lyog44OJ44Ot44OD44OX44OA44Km44Oz44Gu6Zai5pWw44KS5ZG844G2Ki9cbiAgICAvLyB9KTtcbiAgICBcbiAgICAvLyAvLyDjg5rjg7zjgrjjgYzoqq3jgb/ovrzjgb7jgozjgZ/jgonjgZnjgZDjgavli5XjgYvjgZfjgZ/jgYTloLTlkIjjga7oqJjov7BcbiAgICAvLyAkKHdpbmRvdykub24oJ2xvYWQnLGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgIG1lZGlhUXVlcmllc1dpbigpOy8qIOODieODreODg+ODl+ODgOOCpuODs+OBrumWouaVsOOCkuWRvOOBtiovXG4gICAgLy8gfSk7XG59ICk7XG4iXX0=
