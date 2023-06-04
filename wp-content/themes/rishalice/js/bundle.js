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
  $('.p-top-article--service, .p-top-article--about-us').each(function (i, elem) {
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

// サービスの項目をフワフワ動かす
// jQuery(function fuwafuwa() {
//     jQuery('#fuwa').animate({
//         marginTop: '-=15px'
//     }, 1000).animate({
//         marginTop: '+=15px'
//     }, 1000);
//     setTimeout(fuwafuwa, 2000); //アニメーションを繰り返す間隔
// });

},{"./config.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxNQUFNLENBQUUsVUFBVSxDQUFDLEVBQUcsQ0FDdEIsQ0FBQyxDQUFFOzs7OztBQ0RILE1BQU0sQ0FBRSxVQUFVLENBQUMsRUFBRztFQUNyQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUUsYUFBYSxDQUFFOztFQUV2QztFQUNHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO0lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0VBQ3hDLENBQUMsQ0FBQzs7RUFFRjtFQUNBLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2pELENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7RUFDakQsQ0FBQyxDQUFDO0VBRUYsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEtBQUssRUFBRTtJQUM5QjtJQUNBLElBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sRUFBRTtNQUMzRCxD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LEVBQUU7TUFDckMsSUFBSSxTQUFTLEdBQUcsTUFBTTtNQUN0QixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztNQUNsQixJQUFJLFNBQVMsSUFBSSxXQUFXLEdBQUcsU0FBUyxHQUFHLE1BQU0sRUFBQztRQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztNQUMvQixDQUFDLE1BQU07UUFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztNQUNsQztJQUNKLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBRTs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJqUXVlcnkoIGZ1bmN0aW9uKCAkICkge1xufSApO1xuIiwialF1ZXJ5KCBmdW5jdGlvbiggJCApIHtcblx0Y29uc3QgY29uZmlnID0gcmVxdWlyZSggJy4vY29uZmlnLmpzJyApO1xuXG5cdC8vIOODj+ODs+ODkOODvOOCrOODvOODnOOCv+ODs+OBruOCr+ODquODg+OCr+WHpueQhlxuICAgICQoJy5wLWhlYWRlcl9fYnV0dG9uJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCdzcGFuJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblx0XHQkKCcjbWVudS1oZWFkZXItbWVudScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgfSk7XG5cbiAgICAvLyDopqrjg6Hjg4vjg6Xjg7zjga7jgq/jg6rjg4Pjgq/lh6bnkIZcbiAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCdhJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignLnN1Yi1tZW51JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnI21lbnUtaGVhZGVyLW1lbnUnKS50b2dnbGVDbGFzcygnaXMtbG9uZycpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8g6Kaq44Oh44OL44Ol44O844Gu5aSW5YG044KS44Kv44Oq44OD44Kv44GX44Gf44Go44GN44CB44Kv44Op44K55ZCN44KS5YmK6ZmkXG4gICAgICAgIGlmKCEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJ2EnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbignLnN1Yi1tZW51JykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICQoJyNtZW51LWhlYWRlci1tZW51JykucmVtb3ZlQ2xhc3MoJ2lzLWxvbmcnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g55S76Z2i44GM44Oq44K144Kk44K644GV44KM44Gf44Go44GN44CB5YWo44Gm44Gu44Kv44Op44K55ZCN44KS5YmK6ZmkXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgICAgICAkKCcucC1oZWFkZXJfX2J1dHRvbicpLmNoaWxkcmVuKCdzcGFuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcblx0XHQkKCcjbWVudS1oZWFkZXItbWVudScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJ2EnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmNoaWxkcmVuKCcuc3ViLW1lbnUnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcjbWVudS1oZWFkZXItbWVudScpLnJlbW92ZUNsYXNzKCdpcy1sb25nJyk7XG4gICAgfSk7XG5cbiAgICAvLyBQQ+OCteOCpOOCuijigLsp5Lul5LiK44Gu44Go44GN44CBMTAwcHjjgrnjgq/jg63jg7zjg6vjgZfjgZ/jgolHbyB0byBUb3Djg5zjgr/jg7PjgpLooajnpLpcbiAgICAvLyDigLvjgrnjgq/jg63jg7zjg6vjg5Djg7zjga7luYXjgpLliqDlkbPjgZfjgaYoNzY4LTE3KXB444Gn5oyH5a6aXG4gICAgdmFyIHBhZ2V0b3AgPSAkKCcucC1nby10by10b3AnKTtcbiAgICBwYWdldG9wLmhpZGUoKTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdpbmRvd1NpemUgPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgaWYgKHdpbmRvd1NpemUgPj0gNzUxKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDEwMCkge1xuICAgICAgICAgICAgICAgIHBhZ2V0b3AuZmFkZUluKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhZ2V0b3AuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgICQoJy5wLWdvLXRvLXRvcF9faWNvbicpLnJlbW92ZUNsYXNzKCdpcy1vdXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEdvIHRvIFRvcOODnOOCv+ODs+OBruOCr+ODquODg+OCr+WHpueQhlxuICAgIHBhZ2V0b3AuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSwgMzAwKTsgIC8vIDAuM+enkuOBi+OBkeOBpuODiOODg+ODl+OBuOenu+WLlVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvLyBHbyB0byBUb3Djg5zjgr/jg7Pjga5ob3ZlcuWHpueQhlxuICAgICQoJy5wLWdvLXRvLXRvcF9faWNvbicpLmhvdmVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWhvdmVyJyk7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLW91dCcpO1xuICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLW91dCcpO1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1ob3ZlcicpO1xuICAgIH0pO1xuXG4gICAgLy8g44OI44OD44OX44Gu44Kz44Oz44OG44Oz44OE6YOo5YiG44Gr44K544Kv44Ot44O844Or44GX44Gf556s6ZaT44CB6IOM5pmv55S75YOP44GM5qiq44GL44KJ44K544Op44Kk44OJ44GZ44KL5YuV44GNXG4gICAgJCgnLnAtdG9wLWFydGljbGUtLXNlcnZpY2UsIC5wLXRvcC1hcnRpY2xlLS1hYm91dC11cycpLmVhY2goZnVuY3Rpb24oaSwgZWxlbSl7XG4gICAgICAgIHZhciBjb250ZW50c1BPUyA9ICQoZWxlbSkub2Zmc2V0KCkudG9wO1xuICAgICAgICAkKHdpbmRvdykub24oJ2xvYWQgc2Nyb2xsIHJlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgd2luSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgIHZhciBzaG93Q2xhc3MgPSAnc2hvdyc7XG4gICAgICAgICAgICB2YXIgdGltaW5nID0gMTAwOyAvLyAxMDBweOOCs+ODs+ODhuODs+ODhOOBjOimi+OBiOOBn+OCieasoeOBrmlm5paH44GMdHJ1ZVxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA+PSBjb250ZW50c1BPUyAtIHdpbkhlaWdodCArIHRpbWluZyl7XG4gICAgICAgICAgICAgICAgJChlbGVtKS5hZGRDbGFzcyhzaG93Q2xhc3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsZW0pLnJlbW92ZUNsYXNzKHNob3dDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSApO1xuXG4vLyDjgrXjg7zjg5Pjgrnjga7poIXnm67jgpLjg5Xjg6/jg5Xjg6/li5XjgYvjgZlcbi8vIGpRdWVyeShmdW5jdGlvbiBmdXdhZnV3YSgpIHtcbi8vICAgICBqUXVlcnkoJyNmdXdhJykuYW5pbWF0ZSh7XG4vLyAgICAgICAgIG1hcmdpblRvcDogJy09MTVweCdcbi8vICAgICB9LCAxMDAwKS5hbmltYXRlKHtcbi8vICAgICAgICAgbWFyZ2luVG9wOiAnKz0xNXB4J1xuLy8gICAgIH0sIDEwMDApO1xuLy8gICAgIHNldFRpbWVvdXQoZnV3YWZ1d2EsIDIwMDApOyAvL+OCouODi+ODoeODvOOCt+ODp+ODs+OCkue5sOOCiui/lOOBmemWk+malFxuLy8gfSk7Il19
