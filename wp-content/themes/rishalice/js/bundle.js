(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

jQuery(function ($) {});

},{}],2:[function(require,module,exports){
"use strict";

jQuery(function ($) {
  var config = require('./config.js');

  // ハンバーガーボタンのクリック処理
  $('.p-header__button').click(function () {
    $(this).children('span').toggleClass('open');
    $('#menu-header-menu').toggleClass('open');
  });

  // 親メニューのクリック処理
  $('.menu-item-has-children').on('click', function () {
    $(this).children('a').toggleClass('open');
    $(this).children('.sub-menu').toggleClass('open');
    $('#menu-header-menu').toggleClass('is-long');
  });
  $(document).click(function (event) {
    // 親メニューの外側をクリックしたとき、クラス名を削除
    if (!$(event.target).closest('.menu-item-has-children').length) {
      $('.menu-item-has-children').children('a').removeClass('open');
      $('.menu-item-has-children').children('.sub-menu').removeClass('open');
      $('#menu-header-menu').removeClass('is-long');
    }
  });

  // 画面がリサイズされたとき、全てのクラス名を削除
  $(window).resize(function () {
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
    }, 300); // 0.3秒かけてトップへ移動
    return false;
  });

  // Go to Topボタンのhover処理
  $('.p-go-to-top__icon').hover(function () {
    $(this).addClass('is-hover');
    $(this).removeClass('is-out');
  }, function () {
    $(this).addClass('is-out');
    $(this).removeClass('is-hover');
  });

  // トップのコンテンツ部分にスクロールした瞬間、背景画像が横からスライドする動き
  $('.p-top-article--about-us').each(function (i, elem) {
    var contentsPOS = $(elem).offset().top;
    $(window).on('load scroll resize', function () {
      var winHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var showClass = 'show';
      var timing = 100; // 100pxコンテンツが見えたら次のif文がtrue
      if (scrollTop >= contentsPOS - winHeight + timing) {
        $(elem).addClass(showClass);
      } else {
        $(elem).removeClass(showClass);
      }
    });
  });
});

},{"./config.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxNQUFNLENBQUUsVUFBVSxDQUFDLEVBQUcsQ0FDdEIsQ0FBQyxDQUFFOzs7OztBQ0RILE1BQU0sQ0FBRSxVQUFVLENBQUMsRUFBRztFQUNyQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUUsYUFBYSxDQUFFOztFQUV2QztFQUNHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO0lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0VBQ3hDLENBQUMsQ0FBQzs7RUFFRjtFQUNBLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2pELENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7RUFDakQsQ0FBQyxDQUFDO0VBRUYsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEtBQUssRUFBRTtJQUM5QjtJQUNBLElBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sRUFBRTtNQUMzRCxD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LEVBQUU7TUFDckMsSUFBSSxTQUFTLEdBQUcsTUFBTTtNQUN0QixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztNQUNsQixJQUFJLFNBQVMsSUFBSSxXQUFXLEdBQUcsU0FBUyxHQUFHLE1BQU0sRUFBQztRQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztNQUMvQixDQUFDLE1BQU07UUFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztNQUNsQztJQUNKLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImpRdWVyeSggZnVuY3Rpb24oICQgKSB7XG59ICk7XG4iLCJqUXVlcnkoIGZ1bmN0aW9uKCAkICkge1xuXHRjb25zdCBjb25maWcgPSByZXF1aXJlKCAnLi9jb25maWcuanMnICk7XG5cblx0Ly8g44OP44Oz44OQ44O844Ks44O844Oc44K/44Oz44Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgJCgnLnAtaGVhZGVyX19idXR0b24nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oJ3NwYW4nKS50b2dnbGVDbGFzcygnb3BlbicpO1xuXHRcdCQoJyNtZW51LWhlYWRlci1tZW51JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICB9KTtcblxuICAgIC8vIOimquODoeODi+ODpeODvOOBruOCr+ODquODg+OCr+WHpueQhlxuICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oJ2EnKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCcuc3ViLW1lbnUnKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcjbWVudS1oZWFkZXItbWVudScpLnRvZ2dsZUNsYXNzKCdpcy1sb25nJyk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyDopqrjg6Hjg4vjg6Xjg7zjga7lpJblgbTjgpLjgq/jg6rjg4Pjgq/jgZfjgZ/jgajjgY3jgIHjgq/jg6njgrnlkI3jgpLliYrpmaRcbiAgICAgICAgaWYoISQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbignYScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmNoaWxkcmVuKCcuc3ViLW1lbnUnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgJCgnI21lbnUtaGVhZGVyLW1lbnUnKS5yZW1vdmVDbGFzcygnaXMtbG9uZycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDnlLvpnaLjgYzjg6rjgrXjgqTjgrrjgZXjgozjgZ/jgajjgY3jgIHlhajjgabjga7jgq/jg6njgrnlkI3jgpLliYrpmaRcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJy5wLWhlYWRlcl9fYnV0dG9uJykuY2hpbGRyZW4oJ3NwYW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdCQoJyNtZW51LWhlYWRlci1tZW51JykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbignYScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJy5zdWItbWVudScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQoJyNtZW51LWhlYWRlci1tZW51JykucmVtb3ZlQ2xhc3MoJ2lzLWxvbmcnKTtcbiAgICB9KTtcblxuICAgIC8vIFBD44K144Kk44K6KOKAuynku6XkuIrjga7jgajjgY3jgIExMDBweOOCueOCr+ODreODvOODq+OBl+OBn+OCiUdvIHRvIFRvcOODnOOCv+ODs+OCkuihqOekulxuICAgIC8vIOKAu+OCueOCr+ODreODvOODq+ODkOODvOOBruW5heOCkuWKoOWRs+OBl+OBpig3NjgtMTcpcHjjgafmjIflrppcbiAgICB2YXIgcGFnZXRvcCA9ICQoJy5wLWdvLXRvLXRvcCcpO1xuICAgIHBhZ2V0b3AuaGlkZSgpO1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd2luZG93U2l6ZSA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICBpZiAod2luZG93U2l6ZSA+PSA3NTEpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgcGFnZXRvcC5mYWRlSW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFnZXRvcC5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgJCgnLnAtZ28tdG8tdG9wX19pY29uJykucmVtb3ZlQ2xhc3MoJ2lzLW91dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gR28gdG8gVG9w44Oc44K/44Oz44Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgcGFnZXRvcC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LCAzMDApOyAgLy8gMC4z56eS44GL44GR44Gm44OI44OD44OX44G456e75YuVXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8vIEdvIHRvIFRvcOODnOOCv+ODs+OBrmhvdmVy5Yem55CGXG4gICAgJCgnLnAtZ28tdG8tdG9wX19pY29uJykuaG92ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtaG92ZXInKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3V0Jyk7XG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3V0Jyk7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWhvdmVyJyk7XG4gICAgfSk7XG5cbiAgICAvLyDjg4jjg4Pjg5fjga7jgrPjg7Pjg4bjg7Pjg4Tpg6jliIbjgavjgrnjgq/jg63jg7zjg6vjgZfjgZ/nnqzplpPjgIHog4zmma/nlLvlg4/jgYzmqKrjgYvjgonjgrnjg6njgqTjg4njgZnjgovli5XjgY1cbiAgICAkKCcucC10b3AtYXJ0aWNsZS0tYWJvdXQtdXMnKS5lYWNoKGZ1bmN0aW9uKGksIGVsZW0pe1xuICAgICAgICB2YXIgY29udGVudHNQT1MgPSAkKGVsZW0pLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHNjcm9sbCByZXNpemUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICB2YXIgc2hvd0NsYXNzID0gJ3Nob3cnO1xuICAgICAgICAgICAgdmFyIHRpbWluZyA9IDEwMDsgLy8gMTAwcHjjgrPjg7Pjg4bjg7Pjg4TjgYzopovjgYjjgZ/jgonmrKHjga5pZuaWh+OBjHRydWVcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPj0gY29udGVudHNQT1MgLSB3aW5IZWlnaHQgKyB0aW1pbmcpe1xuICAgICAgICAgICAgICAgICQoZWxlbSkuYWRkQ2xhc3Moc2hvd0NsYXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtKS5yZW1vdmVDbGFzcyhzaG93Q2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0gKTtcbiJdfQ==
