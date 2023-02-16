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
    $("#menu-header-menu").toggleClass('is-long');
  });
  $(document).click(function (event) {
    // 親メニューの外側をクリックしたとき、クラス名を削除
    if (!$(event.target).closest('.menu-item-has-children').length) {
      $('.menu-item-has-children').children("a").removeClass('open');
      $('.menu-item-has-children').children(".sub-menu").removeClass('open');
      $("#menu-header-menu").removeClass('is-long');
    }
  });

  // 画面がリサイズされたとき、全てのクラス名を削除
  $(window).resize(function () {
    $(".p-header__button").children("span").removeClass('open');
    $("#menu-header-menu").removeClass('open');
    $('.menu-item-has-children').children("a").removeClass('open');
    $('.menu-item-has-children').children(".sub-menu").removeClass('open');
    $("#menu-header-menu").removeClass('is-long');
  });
});

},{"./config.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxNQUFNLENBQUUsVUFBVSxDQUFDLEVBQUcsQ0FDdEIsQ0FBQyxDQUFFOzs7OztBQ0RILE1BQU0sQ0FBRSxVQUFVLENBQUMsRUFBRztFQUNyQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUUsYUFBYSxDQUFFOztFQUV2QztFQUNHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO0lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0VBQ3hDLENBQUMsQ0FBQzs7RUFFRjtFQUNBLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2pELENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7RUFDakQsQ0FBQyxDQUFDO0VBRUYsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEtBQUssRUFBRTtJQUM5QjtJQUNBLElBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sRUFBRTtNQUMzRCxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztNQUM5RCxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztNQUN0RSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO0lBQ2pEO0VBQ0osQ0FBQyxDQUFDOztFQUVGO0VBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFVO0lBQ3ZCLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2pFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDOUQsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDdEUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztFQUNqRCxDQUFDLENBQUM7QUFDTixDQUFDLENBQUUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJqUXVlcnkoIGZ1bmN0aW9uKCAkICkge1xufSApO1xuIiwialF1ZXJ5KCBmdW5jdGlvbiggJCApIHtcblx0Y29uc3QgY29uZmlnID0gcmVxdWlyZSggJy4vY29uZmlnLmpzJyApO1xuXG5cdC8vIOODj+ODs+ODkOODvOOCrOODvOODnOOCv+ODs+OBruOCr+ODquODg+OCr+WHpueQhlxuICAgICQoXCIucC1oZWFkZXJfX2J1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oXCJzcGFuXCIpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cdFx0JChcIiNtZW51LWhlYWRlci1tZW51XCIpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgfSk7XG5cbiAgICAvLyDopqrjg6Hjg4vjg6Xjg7zjga7jgq/jg6rjg4Pjgq/lh6bnkIZcbiAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oXCJhXCIpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oXCIuc3ViLW1lbnVcIikudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJChcIiNtZW51LWhlYWRlci1tZW51XCIpLnRvZ2dsZUNsYXNzKCdpcy1sb25nJyk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyDopqrjg6Hjg4vjg6Xjg7zjga7lpJblgbTjgpLjgq/jg6rjg4Pjgq/jgZfjgZ/jgajjgY3jgIHjgq/jg6njgrnlkI3jgpLliYrpmaRcbiAgICAgICAgaWYoISQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbihcImFcIikucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oXCIuc3ViLW1lbnVcIikucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICQoXCIjbWVudS1oZWFkZXItbWVudVwiKS5yZW1vdmVDbGFzcygnaXMtbG9uZycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDnlLvpnaLjgYzjg6rjgrXjgqTjgrrjgZXjgozjgZ/jgajjgY3jgIHlhajjgabjga7jgq/jg6njgrnlkI3jgpLliYrpmaRcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICAgICQoXCIucC1oZWFkZXJfX2J1dHRvblwiKS5jaGlsZHJlbihcInNwYW5cIikucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcblx0XHQkKFwiI21lbnUtaGVhZGVyLW1lbnVcIikucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbihcImFcIikucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbihcIi5zdWItbWVudVwiKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKFwiI21lbnUtaGVhZGVyLW1lbnVcIikucmVtb3ZlQ2xhc3MoJ2lzLWxvbmcnKTtcbiAgICB9KTtcbn0gKTtcbiJdfQ==
