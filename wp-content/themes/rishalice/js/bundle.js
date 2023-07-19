(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

jQuery(function ($) {
  /*
   * infiniteslide
   */
  $('.js-infiniteslide--left').infiniteslide({
    'direction': 'left',
    'speed': 20,
    'pauseonhover': true,
    'clone': 2,
    'responsive': true
  });
  $('.js-infiniteslide--right').infiniteslide({
    'direction': 'right',
    'speed': 20,
    'pauseonhover': true,
    'clone': 2,
    'responsive': true
  });

  /*
   * Modaal
   */
  $('.gallery').modaal({
    type: 'image',
    background: '#fff',
    overlay_opacity: '0.5',
    fullscreen: true
  });
});

},{}],2:[function(require,module,exports){
"use strict";

// const mv = document.querySelector( '.mv' );
// mv.classList.add( 'is-fade-in' );

window.onload = function () {
  document.querySelectorAll('.mv').forEach(function (el) {
    el.classList.add('is-fade-in');
  });
  document.querySelectorAll('.p-logo--header').forEach(function (el) {
    el.classList.add('is-fade-in');
  });
  document.querySelector('body').classList.add('is-fade-in');
  scrollEffect();
  window.addEventListener('scroll', function () {
    scrollEffect();
  });
};
function scrollEffect() {
  var elements = document.querySelectorAll('.is-fade');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var positionFromTop = element.getBoundingClientRect().top + window.pageYOffset;
    var scroll = window.pageYOffset || document.documentElement.scrollTop;
    var windowH = window.innerHeight;
    if (scroll > positionFromTop - windowH) {
      element.classList.add('is-scroll');
    }
  }
}

},{}],3:[function(require,module,exports){
"use strict";

/*
infiniteslide.js v2
version: 2.0.1
Author: T.Morimoto

Copyright 2017, T.Morimoto
* Free to use and abuse under the MIT license.
* //www.opensource.org/licenses/mit-license.php

//github.com/woodroots/infiniteslidev2
*/

(function ($) {
  $(window).on('load', function () {
    window.loaded = true;
  });
  $(function () {
    $.fn.infiniteslide = function (options) {
      //option
      var settings = $.extend({
        'speed': 100,
        //速さ　単位はpx/秒です。
        'direction': 'left',
        //up/down/left/rightから選択
        'pauseonhover': true,
        //マウスオーバーでストップ
        'responsive': false,
        //子要素の幅を%で指定しているとき
        'clone': 1
      }, options);
      var setCss = function setCss(obj, direction) {
        $(obj).wrap('<div class="infiniteslide_wrap"></div>').parent().css({
          overflow: 'hidden'
        });
        if (direction == 'up' || direction == 'down') {
          var d = 'column';
        } else {
          var d = 'row';
        }
        $(obj).css({
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          '-ms-flex-align': 'center',
          flexDirection: d
        }).children().css({
          flex: 'none',
          display: 'block'
        });
      };
      var setClone = function setClone(obj, clone) {
        var $clone = $(obj).children().clone(true).addClass('infiniteslide_clone');
        var i = 1;
        while (i <= clone) {
          $clone.clone(true).appendTo($(obj));
          i++;
        }
      };
      var getWidth = function getWidth(obj) {
        var w = 0;
        $(obj).children(':not(.infiniteslide_clone)').each(function (key, value) {
          w = w + $(this).outerWidth(true);
        });
        return w;
      };
      var getHeight = function getHeight(obj) {
        var h = 0;
        $(obj).children(':not(.infiniteslide_clone)').each(function (key, value) {
          h = h + $(this).outerHeight(true);
        });
        return h;
      };
      var getSpeed = function getSpeed(l, s) {
        return l / s;
      };
      var getNum = function getNum(obj, direction) {
        if (direction == 'up' || direction == 'down') {
          var num = getHeight(obj);
        } else {
          var num = getWidth(obj);
        }
        return num;
      };
      var getTranslate = function getTranslate(num, direction) {
        if (direction == 'up' || direction == 'down') {
          var i = '0,-' + num + 'px,0';
        } else {
          var i = '-' + num + 'px,0,0';
        }
        return i;
      };
      var setAnim = function setAnim(obj, id, direction, speed) {
        var num = getNum(obj, direction);
        if (direction == 'up' || direction == 'down') {
          $(obj).parent('.infiniteslide_wrap').css({
            height: num + 'px'
          });
        }
        var i = getTranslate(num, direction);
        $(obj).attr('data-style', 'infiniteslide' + id);
        var css = '@keyframes infiniteslide' + id + '{' + 'from {transform:translate3d(0,0,0);}' + 'to {transform:translate3d(' + i + ');}' + '}';
        $('<style />').attr('id', 'infiniteslide' + id + '_style').html(css).appendTo('head');
        if (direction == 'right' || direction == 'down') {
          var reverse = ' reverse';
        } else {
          var reverse = '';
        }
        $(obj).css({
          animation: 'infiniteslide' + id + ' ' + getSpeed(num, speed) + 's linear 0s infinite' + reverse
        });
      };
      var setStop = function setStop(obj) {
        $(obj).on('mouseenter', function () {
          $(this).css({
            animationPlayState: 'paused'
          });
        }).on('mouseleave', function () {
          $(this).css({
            animationPlayState: 'running'
          });
        });
      };
      var setResponsive = function setResponsive(obj, direction) {
        var num = getNum(obj, direction);
        var i = getTranslate(num, direction);
        return i;
      };
      return this.each(function (key, value) {
        var $this = $(this);
        var num = Date.now() + Math.floor(10000 * Math.random()).toString(16);
        if (settings.pauseonhover == true) {
          setStop($this);
        }
        var _onload = function _onload() {
          setCss($this, settings.direction);
          setClone($this, settings.clone);
          setAnim($this, num, settings.direction, settings.speed);
          if (settings.responsive) {
            $(window).on('resize', function () {
              var i = setResponsive($this, settings.direction);
              var styleid = $this.attr('data-style');
              var stylehtml = $('#' + styleid + '_style').html();
              var stylehtml_new = stylehtml.replace(/to {transform:translate3d\((.*?)\)/, 'to {transform:translate3d(' + i + ')');
              $('#' + styleid + '_style').html(stylehtml_new);
            });
          }
        };
        if (window.loaded) {
          _onload();
        } else {
          $(window).on('load', _onload);
        }
      });
    };
  });
})(jQuery);

},{}],4:[function(require,module,exports){
"use strict";

/*
 * Lottie
 */
// (function () {
// 	const anim = lottie.loadAnimation({
// 		container: document.getElementById( 'js-wave' ),
// 		renderer: 'svg',
// 		loop: true,
// 		autoplay: true,
// 		path: './footer_wave.json'
// 	});
// }());

jQuery(function ($) {
  var pageload = require('./pageload.js');
  var effect = require('./effect.js');
  var slide = require('./infiniteslidev2.js');
  var modaalminjs = require('./modaal/js/modaal.min.js');
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
    if (windowSize >= 751) {
      // スクロールバーの幅を加味して(768-17)pxで指定
      // PCサイズ以上：Go to Topボタンの処理
      if (scrolled > 100) {
        // 100pxスクロールしたらボタン表示
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
      bg1.css('background-position', 'left top -' + scrolled * weight1 + 'px');
      bg2.css('background-position-y', initial - scrolled * weight2 + 'px');
    } else {
      // PCサイズ未満：パララックスのスピードを遅らせる
      var initial = 50;
      bg1.css('background-position', 'left top -' + scrolled * weight1 * 0.5 + 'px');
      bg2.css('background-position-y', initial - scrolled * weight2 * 0.2 + 'px');
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
  $('.p-top-article--works, .p-top-article--service, .p-top-article--about-us').each(function (i, elem) {
    var contentsPOS = $(elem).offset().top;
    $(window).on('load scroll resize', function () {
      var winHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var showClass = 'show';
      var timing = 200; // 200pxコンテンツが見えたら次のif文がtrue
      if (scrollTop >= contentsPOS - winHeight + timing) {
        $(elem).addClass(showClass);
      } else {
        $(elem).removeClass(showClass);
      }
    });
  });
});

},{"./config.js":1,"./effect.js":2,"./infiniteslidev2.js":3,"./modaal/js/modaal.min.js":5,"./pageload.js":6}],5:[function(require,module,exports){
"use strict";

/*!
	Modaal - accessible modals - v0.4.4
	by Humaan, for all humans.
	//humaan.com
 */
!function (a) {
  function t(a) {
    var t = {},
      o = !1;
    a.attr("data-modaal-type") && (o = !0, t.type = a.attr("data-modaal-type")), a.attr("data-modaal-content-source") && (o = !0, t.content_source = a.attr("data-modaal-content-source")), a.attr("data-modaal-animation") && (o = !0, t.animation = a.attr("data-modaal-animation")), a.attr("data-modaal-animation-speed") && (o = !0, t.animation_speed = a.attr("data-modaal-animation-speed")), a.attr("data-modaal-after-callback-delay") && (o = !0, t.after_callback_delay = a.attr("data-modaal-after-callback-delay")), a.attr("data-modaal-is-locked") && (o = !0, t.is_locked = "true" === a.attr("data-modaal-is-locked")), a.attr("data-modaal-hide-close") && (o = !0, t.hide_close = "true" === a.attr("data-modaal-hide-close")), a.attr("data-modaal-background") && (o = !0, t.background = a.attr("data-modaal-background")), a.attr("data-modaal-overlay-opacity") && (o = !0, t.overlay_opacity = a.attr("data-modaal-overlay-opacity")), a.attr("data-modaal-overlay-close") && (o = !0, t.overlay_close = "false" !== a.attr("data-modaal-overlay-close")), a.attr("data-modaal-accessible-title") && (o = !0, t.accessible_title = a.attr("data-modaal-accessible-title")), a.attr("data-modaal-start-open") && (o = !0, t.start_open = "true" === a.attr("data-modaal-start-open")), a.attr("data-modaal-fullscreen") && (o = !0, t.fullscreen = "true" === a.attr("data-modaal-fullscreen")), a.attr("data-modaal-custom-class") && (o = !0, t.custom_class = a.attr("data-modaal-custom-class")), a.attr("data-modaal-close-text") && (o = !0, t.close_text = a.attr("data-modaal-close-text")), a.attr("data-modaal-close-aria-label") && (o = !0, t.close_aria_label = a.attr("data-modaal-close-aria-label")), a.attr("data-modaal-background-scroll") && (o = !0, t.background_scroll = "true" === a.attr("data-modaal-background-scroll")), a.attr("data-modaal-width") && (o = !0, t.width = parseInt(a.attr("data-modaal-width"))), a.attr("data-modaal-height") && (o = !0, t.height = parseInt(a.attr("data-modaal-height"))), a.attr("data-modaal-confirm-button-text") && (o = !0, t.confirm_button_text = a.attr("data-modaal-confirm-button-text")), a.attr("data-modaal-confirm-cancel-button-text") && (o = !0, t.confirm_cancel_button_text = a.attr("data-modaal-confirm-cancel-button-text")), a.attr("data-modaal-confirm-title") && (o = !0, t.confirm_title = a.attr("data-modaal-confirm-title")), a.attr("data-modaal-confirm-content") && (o = !0, t.confirm_content = a.attr("data-modaal-confirm-content")), a.attr("data-modaal-gallery-active-class") && (o = !0, t.gallery_active_class = a.attr("data-modaal-gallery-active-class")), a.attr("data-modaal-loading-content") && (o = !0, t.loading_content = a.attr("data-modaal-loading-content")), a.attr("data-modaal-loading-class") && (o = !0, t.loading_class = a.attr("data-modaal-loading-class")), a.attr("data-modaal-ajax-error-class") && (o = !0, t.ajax_error_class = a.attr("data-modaal-ajax-error-class")), a.attr("data-modaal-instagram-id") && (o = !0, t.instagram_id = a.attr("data-modaal-instagram-id")), o && a.modaal(t);
  }
  var o = {
      init: function init(t, o) {
        var e = this;
        if (e.dom = a("body"), e.$elem = a(o), e.options = a.extend({}, a.fn.modaal.options, e.$elem.data(), t), e.xhr = null, e.scope = {
          is_open: !1,
          id: "modaal_" + new Date().getTime() + Math.random().toString(16).substring(2),
          source: e.options.content_source ? e.options.content_source : e.$elem.attr("href")
        }, e.$elem.attr("data-modaal-scope", e.scope.id), e.private_options = {
          active_class: "is_active"
        }, e.lastFocus = null, e.options.is_locked || "confirm" == e.options.type || e.options.hide_close ? e.scope.close_btn = "" : e.scope.close_btn = '<button type="button" class="modaal-close" id="modaal-close" aria-label="' + e.options.close_aria_label + '"><span>' + e.options.close_text + "</span></button>", "none" === e.options.animation && (e.options.animation_speed = 0, e.options.after_callback_delay = 0), a(o).on("click.Modaal", function (a) {
          a.preventDefault(), e.create_modaal(e, a);
        }), !0 === e.options.outer_controls) var i = "outer";else var i = "inner";
        e.scope.prev_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-prev modaal-gallery-prev-' + i + '" id="modaal-gallery-prev" aria-label="Previous image (use left arrow to change)"><span>Previous Image</span></button>', e.scope.next_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-next modaal-gallery-next-' + i + '" id="modaal-gallery-next" aria-label="Next image (use right arrow to change)"><span>Next Image</span></button>', !0 === e.options.start_open && e.create_modaal(e);
      },
      create_modaal: function create_modaal(a, t) {
        var o,
          a = this;
        if (a.lastFocus = a.$elem, !1 !== a.options.should_open && ("function" != typeof a.options.should_open || !1 !== a.options.should_open())) {
          switch (a.options.before_open.call(a, t), a.options.type) {
            case "inline":
              a.create_basic();
              break;
            case "ajax":
              o = a.options.source(a.$elem, a.scope.source), a.fetch_ajax(o);
              break;
            case "confirm":
              a.options.is_locked = !0, a.create_confirm();
              break;
            case "image":
              a.create_image();
              break;
            case "iframe":
              o = a.options.source(a.$elem, a.scope.source), a.create_iframe(o);
              break;
            case "video":
              a.create_video(a.scope.source);
              break;
            case "instagram":
              a.create_instagram();
          }
          a.watch_events();
        }
      },
      watch_events: function watch_events() {
        var t = this;
        t.dom.off("click.Modaal keyup.Modaal keydown.Modaal"), t.dom.on("keydown.Modaal", function (o) {
          var e = o.keyCode,
            i = o.target;
          9 == e && t.scope.is_open && (a.contains(document.getElementById(t.scope.id), i) || a("#" + t.scope.id).find('*[tabindex="0"]').focus());
        }), t.dom.on("keyup.Modaal", function (o) {
          var e = o.keyCode,
            i = o.target;
          return o.shiftKey && 9 == o.keyCode && t.scope.is_open && (a.contains(document.getElementById(t.scope.id), i) || a("#" + t.scope.id).find(".modaal-close").focus()), !t.options.is_locked && 27 == e && t.scope.is_open ? !a(document.activeElement).is("input:not(:checkbox):not(:radio)") && void t.modaal_close() : "image" == t.options.type ? (37 == e && t.scope.is_open && !a("#" + t.scope.id + " .modaal-gallery-prev").hasClass("is_hidden") && t.gallery_update("prev"), void (39 == e && t.scope.is_open && !a("#" + t.scope.id + " .modaal-gallery-next").hasClass("is_hidden") && t.gallery_update("next"))) : void 0;
        }), t.dom.on("click.Modaal", function (o) {
          var e = a(o.target);
          if (!t.options.is_locked && (t.options.overlay_close && e.is(".modaal-inner-wrapper") || e.is(".modaal-close") || e.closest(".modaal-close").length)) return void t.modaal_close();
          if (e.is(".modaal-confirm-btn")) return e.is(".modaal-ok") && t.options.confirm_callback.call(t, t.lastFocus), e.is(".modaal-cancel") && t.options.confirm_cancel_callback.call(t, t.lastFocus), void t.modaal_close();
          if (e.is(".modaal-gallery-control")) {
            if (e.hasClass("is_hidden")) return;
            return e.is(".modaal-gallery-prev") && t.gallery_update("prev"), void (e.is(".modaal-gallery-next") && t.gallery_update("next"));
          }
        });
      },
      build_modal: function build_modal(t) {
        var o = this,
          e = "";
        "instagram" == o.options.type && (e = " modaal-instagram");
        var i,
          l = "video" == o.options.type ? "modaal-video-wrap" : "modaal-content";
        switch (o.options.animation) {
          case "fade":
            i = " modaal-start_fade";
            break;
          case "slide-down":
            i = " modaal-start_slidedown";
            break;
          default:
            i = " modaal-start_none";
        }
        var n = "";
        o.options.fullscreen && (n = " modaal-fullscreen"), "" === o.options.custom_class && void 0 === o.options.custom_class || (o.options.custom_class = " " + o.options.custom_class);
        var s = "";
        o.options.width && o.options.height && "number" == typeof o.options.width && "number" == typeof o.options.height ? s = ' style="max-width:' + o.options.width + "px;height:" + o.options.height + 'px;overflow:auto;"' : o.options.width && "number" == typeof o.options.width ? s = ' style="max-width:' + o.options.width + 'px;"' : o.options.height && "number" == typeof o.options.height && (s = ' style="height:' + o.options.height + 'px;overflow:auto;"'), ("image" == o.options.type || "video" == o.options.type || "instagram" == o.options.type || o.options.fullscreen) && (s = "");
        var d = "";
        o.is_touch() && (d = ' style="cursor:pointer;"');
        var r = '<div class="modaal-wrapper modaal-' + o.options.type + i + e + n + o.options.custom_class + '" id="' + o.scope.id + '"><div class="modaal-outer-wrapper"><div class="modaal-inner-wrapper"' + d + ">";
        "video" != o.options.type && (r += '<div class="modaal-container"' + s + ">"), r += '<div class="' + l + ' modaal-focus" aria-hidden="false" aria-label="' + o.options.accessible_title + " - " + o.options.close_aria_label + '" role="dialog">', "inline" == o.options.type ? r += '<div class="modaal-content-container" role="document"></div>' : r += t, r += "</div>" + o.scope.close_btn, "video" != o.options.type && (r += "</div>"), r += "</div>", "image" == o.options.type && !0 === o.options.outer_controls && (r += o.scope.prev_btn + o.scope.next_btn), r += "</div></div>", a("#" + o.scope.id + "_overlay").length < 1 && o.dom.append(r), "inline" == o.options.type && t.appendTo("#" + o.scope.id + " .modaal-content-container"), o.modaal_overlay("show");
      },
      create_basic: function create_basic() {
        var t = this,
          o = a(t.scope.source),
          e = "";
        o.length ? (e = o.contents().detach(), o.empty()) : e = "Content could not be loaded. Please check the source and try again.", t.build_modal(e);
      },
      create_instagram: function create_instagram() {
        var t = this,
          o = t.options.instagram_id,
          e = "",
          i = "Instagram photo couldn't be loaded, please check the embed code and try again.";
        if (t.build_modal('<div class="modaal-content-container' + ("" != t.options.loading_class ? " " + t.options.loading_class : "") + '">' + t.options.loading_content + "</div>"), "" != o && null !== o && void 0 !== o) {
          var l = "//api.instagram.com/oembed?url=//instagr.am/p/" + o + "/";
          a.ajax({
            url: l,
            dataType: "jsonp",
            cache: !1,
            success: function success(o) {
              t.dom.append('<div id="temp-ig" style="width:0;height:0;overflow:hidden;">' + o.html + "</div>"), t.dom.attr("data-igloaded") ? window.instgrm.Embeds.process() : t.dom.attr("data-igloaded", "true");
              var e = "#" + t.scope.id + " .modaal-content-container";
              a(e).length > 0 && setTimeout(function () {
                a("#temp-ig").contents().clone().appendTo(e), a("#temp-ig").remove();
              }, 1e3);
            },
            error: function error() {
              e = i;
              var o = a("#" + t.scope.id + " .modaal-content-container");
              o.length > 0 && (o.removeClass(t.options.loading_class).addClass(t.options.ajax_error_class), o.html(e));
            }
          });
        } else e = i;
        return !1;
      },
      fetch_ajax: function fetch_ajax(t) {
        var o = this;
        null == o.options.accessible_title && (o.options.accessible_title = "Dialog Window"), null !== o.xhr && (o.xhr.abort(), o.xhr = null), o.build_modal('<div class="modaal-content-container' + ("" != o.options.loading_class ? " " + o.options.loading_class : "") + '">' + o.options.loading_content + "</div>"), o.xhr = a.ajax(t, {
          success: function success(t) {
            var e = a("#" + o.scope.id).find(".modaal-content-container");
            e.length > 0 && (e.removeClass(o.options.loading_class), e.html(t), o.options.ajax_success.call(o, e));
          },
          error: function error(t) {
            if ("abort" != t.statusText) {
              var e = a("#" + o.scope.id + " .modaal-content-container");
              e.length > 0 && (e.removeClass(o.options.loading_class).addClass(o.options.ajax_error_class), e.html("Content could not be loaded. Please check the source and try again."));
            }
          }
        });
      },
      create_confirm: function create_confirm() {
        var a,
          t = this;
        a = '<div class="modaal-content-container"><h1 id="modaal-title">' + t.options.confirm_title + '</h1><div class="modaal-confirm-content">' + t.options.confirm_content + '</div><div class="modaal-confirm-wrap"><button type="button" class="modaal-confirm-btn modaal-ok" aria-label="Confirm">' + t.options.confirm_button_text + '</button><button type="button" class="modaal-confirm-btn modaal-cancel" aria-label="Cancel">' + t.options.confirm_cancel_button_text + "</button></div></div></div>", t.build_modal(a);
      },
      create_image: function create_image() {
        var t,
          o,
          e = this,
          i = "";
        if (e.$elem.is("[data-group]") || e.$elem.is("[rel]")) {
          var l = e.$elem.is("[data-group]"),
            n = l ? e.$elem.attr("data-group") : e.$elem.attr("rel"),
            s = a(l ? '[data-group="' + n + '"]' : '[rel="' + n + '"]');
          s.removeAttr("data-gallery-active", "is_active"), e.$elem.attr("data-gallery-active", "is_active"), o = s.length - 1;
          var d = [];
          i = '<div class="modaal-gallery-item-wrap">', s.each(function (t, o) {
            var e = "",
              i = "",
              l = "",
              n = !1,
              s = !1,
              r = o.getAttribute("data-modaal-desc"),
              c = o.getAttribute("data-gallery-active");
            a(o).attr("data-modaal-content-source") ? e = a(o).attr("data-modaal-content-source") : a(o).attr("href") ? e = a(o).attr("href") : a(o).attr("src") ? e = a(o).attr("src") : (e = "trigger requires href or data-modaal-content-source attribute", s = !0), "" != r && null !== r && void 0 !== r ? (i = r, l = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (t + 1) + " - </span>" + r.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>") : l = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (t + 1) + "</span></div>", c && (n = !0);
            var m = {
              url: e,
              alt: i,
              rawdesc: r,
              desc: l,
              active: n,
              src_error: s
            };
            d.push(m);
          });
          for (var r = 0; r < d.length; r++) {
            var c = "",
              m = d[r].rawdesc ? "Image: " + d[r].rawdesc : "Image " + r + " no description";
            d[r].active && (c = " " + e.private_options.active_class);
            var p = d[r].src_error ? d[r].url : '<img src="' + d[r].url + '" alt=" " style="width:100%">';
            i += '<div class="modaal-gallery-item gallery-item-' + r + c + '" aria-label="' + m + '">' + p + d[r].desc + "</div>";
          }
          i += "</div>", 1 != e.options.outer_controls && (i += e.scope.prev_btn + e.scope.next_btn);
        } else {
          var u,
            _ = !1;
          e.$elem.attr("data-modaal-content-source") ? u = e.$elem.attr("data-modaal-content-source") : e.$elem.attr("href") ? u = e.$elem.attr("href") : e.$elem.attr("src") ? u = e.$elem.attr("src") : (u = "trigger requires href or data-modaal-content-source attribute", _ = !0);
          var v = "",
            f = "",
            m = "";
          e.$elem.attr("data-modaal-desc") ? (m = e.$elem.attr("data-modaal-desc"), v = e.$elem.attr("data-modaal-desc"), f = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image - </span>' + v.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>") : m = "Image with no description";
          var p = _ ? u : '<img src="' + u + '" alt=" " style="width:100%">';
          i = '<div class="modaal-gallery-item is_active" aria-label="' + m + '">' + p + f + "</div>";
        }
        t = i, e.build_modal(t), a(".modaal-gallery-item.is_active").is(".gallery-item-0") && a(".modaal-gallery-prev").hide(), a(".modaal-gallery-item.is_active").is(".gallery-item-" + o) && a(".modaal-gallery-next").hide();
      },
      gallery_update: function gallery_update(t) {
        var o = this,
          e = a("#" + o.scope.id),
          i = e.find(".modaal-gallery-item"),
          l = i.length - 1;
        if (0 == l) return !1;
        var n = e.find(".modaal-gallery-prev"),
          s = e.find(".modaal-gallery-next"),
          d = 0,
          r = 0,
          c = e.find(".modaal-gallery-item." + o.private_options.active_class),
          m = "next" == t ? c.next(".modaal-gallery-item") : c.prev(".modaal-gallery-item");
        return o.options.before_image_change.call(o, c, m), ("prev" != t || !e.find(".gallery-item-0").hasClass("is_active")) && ("next" != t || !e.find(".gallery-item-" + l).hasClass("is_active")) && void c.stop().animate({
          opacity: 0
        }, 250, function () {
          m.addClass("is_next").css({
            position: "absolute",
            display: "block",
            opacity: 0
          });
          var t = a(document).width(),
            i = t > 1140 ? 280 : 50;
          d = e.find(".modaal-gallery-item.is_next").width(), r = e.find(".modaal-gallery-item.is_next").height();
          var p = e.find(".modaal-gallery-item.is_next img").prop("naturalWidth"),
            u = e.find(".modaal-gallery-item.is_next img").prop("naturalHeight");
          p > t - i ? (d = t - i, e.find(".modaal-gallery-item.is_next").css({
            width: d
          }), e.find(".modaal-gallery-item.is_next img").css({
            width: d
          }), r = e.find(".modaal-gallery-item.is_next").find("img").height()) : (d = p, r = u), e.find(".modaal-gallery-item-wrap").stop().animate({
            width: d,
            height: r
          }, 250, function () {
            c.removeClass(o.private_options.active_class + " " + o.options.gallery_active_class).removeAttr("style"), c.find("img").removeAttr("style"), m.addClass(o.private_options.active_class + " " + o.options.gallery_active_class).removeClass("is_next").css("position", ""), m.stop().animate({
              opacity: 1
            }, 250, function () {
              a(this).removeAttr("style").css({
                width: "100%"
              }), a(this).find("img").css("width", "100%"), e.find(".modaal-gallery-item-wrap").removeAttr("style"), o.options.after_image_change.call(o, m);
            }), e.find(".modaal-gallery-item").removeAttr("tabindex"), e.find(".modaal-gallery-item." + o.private_options.active_class).attr("tabindex", "0").focus(), e.find(".modaal-gallery-item." + o.private_options.active_class).is(".gallery-item-0") ? n.stop().animate({
              opacity: 0
            }, 150, function () {
              a(this).hide();
            }) : n.stop().css({
              display: "block",
              opacity: n.css("opacity")
            }).animate({
              opacity: 1
            }, 150), e.find(".modaal-gallery-item." + o.private_options.active_class).is(".gallery-item-" + l) ? s.stop().animate({
              opacity: 0
            }, 150, function () {
              a(this).hide();
            }) : s.stop().css({
              display: "block",
              opacity: n.css("opacity")
            }).animate({
              opacity: 1
            }, 150);
          });
        });
      },
      create_video: function create_video(a) {
        var t,
          o = this;
        t = '<iframe src="' + a + '" class="modaal-video-frame" frameborder="0" allowfullscreen></iframe>', o.build_modal('<div class="modaal-video-container">' + t + "</div>");
      },
      create_iframe: function create_iframe(a) {
        var t,
          o = this;
        t = null !== o.options.width || void 0 !== o.options.width || null !== o.options.height || void 0 !== o.options.height ? '<iframe src="' + a + '" class="modaal-iframe-elem" frameborder="0" allowfullscreen></iframe>' : '<div class="modaal-content-container">Please specify a width and height for your iframe</div>', o.build_modal(t);
      },
      modaal_open: function modaal_open() {
        var t = this,
          o = a("#" + t.scope.id),
          e = t.options.animation;
        "none" === e && (o.removeClass("modaal-start_none"), t.options.after_open.call(t, o)), "fade" === e && o.removeClass("modaal-start_fade"), "slide-down" === e && o.removeClass("modaal-start_slide_down");
        var i = o;
        a(".modaal-wrapper *[tabindex=0]").removeAttr("tabindex"), i = "image" == t.options.type ? a("#" + t.scope.id).find(".modaal-gallery-item." + t.private_options.active_class) : o.find(".modaal-iframe-elem").length ? o.find(".modaal-iframe-elem") : o.find(".modaal-video-wrap").length ? o.find(".modaal-video-wrap") : o.find(".modaal-focus"), i.attr("tabindex", "0").focus(), "none" !== e && setTimeout(function () {
          t.options.after_open.call(t, o);
        }, t.options.after_callback_delay);
      },
      modaal_close: function modaal_close() {
        var t = this,
          o = a("#" + t.scope.id);
        t.options.before_close.call(t, o), null !== t.xhr && (t.xhr.abort(), t.xhr = null), "none" === t.options.animation && o.addClass("modaal-start_none"), "fade" === t.options.animation && o.addClass("modaal-start_fade"), "slide-down" === t.options.animation && o.addClass("modaal-start_slide_down"), setTimeout(function () {
          "inline" == t.options.type && a("#" + t.scope.id + " .modaal-content-container").contents().detach().appendTo(t.scope.source), o.remove(), t.options.after_close.call(t), t.scope.is_open = !1;
        }, t.options.after_callback_delay), t.modaal_overlay("hide"), null != t.lastFocus && t.lastFocus.focus();
      },
      modaal_overlay: function modaal_overlay(t) {
        var o = this;
        "show" == t ? (o.scope.is_open = !0, o.options.background_scroll || o.dom.addClass("modaal-noscroll"), a("#" + o.scope.id + "_overlay").length < 1 && o.dom.append('<div class="modaal-overlay" id="' + o.scope.id + '_overlay"></div>'), a("#" + o.scope.id + "_overlay").css("background", o.options.background).stop().animate({
          opacity: o.options.overlay_opacity
        }, o.options.animation_speed, function () {
          o.modaal_open();
        })) : "hide" == t && a("#" + o.scope.id + "_overlay").stop().animate({
          opacity: 0
        }, o.options.animation_speed, function () {
          a(this).remove(), o.dom.removeClass("modaal-noscroll");
        });
      },
      is_touch: function is_touch() {
        return "ontouchstart" in window || navigator.maxTouchPoints;
      }
    },
    e = [];
  a.fn.modaal = function (t) {
    return this.each(function (i) {
      var l = a(this).data("modaal");
      if (l) {
        if ("string" == typeof t) switch (t) {
          case "open":
            l.create_modaal(l);
            break;
          case "close":
            l.modaal_close();
        }
      } else {
        var n = Object.create(o);
        n.init(t, this), a.data(this, "modaal", n), e.push({
          element: a(this).attr("class"),
          options: t
        });
      }
    });
  }, a.fn.modaal.options = {
    type: "inline",
    content_source: null,
    animation: "fade",
    animation_speed: 300,
    after_callback_delay: 350,
    is_locked: !1,
    hide_close: !1,
    background: "#000",
    overlay_opacity: "0.8",
    overlay_close: !0,
    accessible_title: "Dialog Window",
    start_open: !1,
    fullscreen: !1,
    custom_class: "",
    background_scroll: !1,
    should_open: !0,
    close_text: "Close",
    close_aria_label: "Close (Press escape to close)",
    width: null,
    height: null,
    before_open: function before_open() {},
    after_open: function after_open() {},
    before_close: function before_close() {},
    after_close: function after_close() {},
    source: function source(a, t) {
      return t;
    },
    confirm_button_text: "Confirm",
    confirm_cancel_button_text: "Cancel",
    confirm_title: "Confirm Title",
    confirm_content: "<p>This is the default confirm dialog content. Replace me through the options</p>",
    confirm_callback: function confirm_callback() {},
    confirm_cancel_callback: function confirm_cancel_callback() {},
    gallery_active_class: "gallery_active_item",
    outer_controls: !1,
    before_image_change: function before_image_change(a, t) {},
    after_image_change: function after_image_change(a) {},
    loading_content: '<div class="modaal-loading-spinner"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>',
    loading_class: "is_loading",
    ajax_error_class: "modaal-error",
    ajax_success: function ajax_success() {},
    instagram_id: null
  }, a(function () {
    var o = a(".modaal");
    o.length && o.each(function () {
      t(a(this));
    });
    var i = new MutationObserver(function (o) {
        o.forEach(function (o) {
          if (o.addedNodes && o.addedNodes.length > 0) {
            [].some.call(o.addedNodes, function (o) {
              var i = a(o);
              (i.is("a") || i.is("button")) && (i.hasClass("modaal") ? t(i) : e.forEach(function (t) {
                if (t.element == i.attr("class")) return a(i).modaal(t.options), !1;
              }));
            });
          }
        });
      }),
      l = {
        subtree: !0,
        attributes: !0,
        childList: !0,
        characterData: !0
      };
    setTimeout(function () {
      i.observe(document.body, l);
    }, 500);
  });
}(jQuery, window, document);

},{}],6:[function(require,module,exports){
"use strict";

window.addEventListener('load', function () {
  document.body.style.visibility = 'visible';
});

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9lZmZlY3QuanMiLCJzcmMvc2NyaXB0cy9pbmZpbml0ZXNsaWRldjIuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvbW9kYWFsL2pzL21vZGFhbC5taW4uanMiLCJzcmMvc2NyaXB0cy9wYWdlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsTUFBTSxDQUFFLFVBQVUsQ0FBQyxFQUFHO0VBQ3JCO0FBQ0Q7QUFDQTtFQUNDLENBQUMsQ0FBRSx5QkFBeUIsQ0FBRSxDQUFDLGFBQWEsQ0FBRTtJQUM3QyxXQUFXLEVBQUssTUFBTTtJQUN0QixPQUFPLEVBQVMsRUFBRTtJQUNsQixjQUFjLEVBQUUsSUFBSTtJQUNwQixPQUFPLEVBQVMsQ0FBQztJQUNqQixZQUFZLEVBQUk7RUFDakIsQ0FBQyxDQUFFO0VBQ0gsQ0FBQyxDQUFFLDBCQUEwQixDQUFFLENBQUMsYUFBYSxDQUFFO0lBQzlDLFdBQVcsRUFBSyxPQUFPO0lBQ3ZCLE9BQU8sRUFBUyxFQUFFO0lBQ2xCLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLE9BQU8sRUFBUyxDQUFDO0lBQ2pCLFlBQVksRUFBSTtFQUNqQixDQUFDLENBQUU7O0VBRUg7QUFDRDtBQUNBO0VBQ0MsQ0FBQyxDQUFFLFVBQVUsQ0FBRSxDQUFDLE1BQU0sQ0FBRztJQUN4QixJQUFJLEVBQUUsT0FBTztJQUNiLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFVBQVUsRUFBRTtFQUNiLENBQUMsQ0FBRTtBQUNKLENBQUMsQ0FBRTs7Ozs7QUM1Qkg7QUFDQTs7QUFHQSxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVc7RUFDMUIsUUFBUSxDQUFDLGdCQUFnQixDQUFFLEtBQUssQ0FBRSxDQUFDLE9BQU8sQ0FBRSxVQUFVLEVBQUUsRUFB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NEJBQTRCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsZUFBZSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLG9CQUFvQixHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxNQUFNLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsVUFBVSxHQUFDLE1BQU0sS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsZUFBZSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBQyxPQUFPLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsZ0JBQWdCLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsVUFBVSxHQUFDLE1BQU0sS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUMsTUFBTSxLQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FB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QUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLElBQUksRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDO1VBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztVQUFDLEVBQUUsRUFBQyxTQUFTLEdBQUUsSUFBSSxJQUFJLEdBQUUsT0FBTyxFQUFFLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1VBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU07UUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsZUFBZSxHQUFDO1VBQUMsWUFBWSxFQUFDO1FBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFFLFNBQVMsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUMsMkVBQTJFLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0Is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VUFBUyxDQUFDLEVBQUM7VUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTTtVQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQUEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFDLFVBQVMsQ0FBQyxFQUFDO1VBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU87WUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU07VUFBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxPQUFPLElBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUUsRUFBRSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDLElBQUUsS0FBSyxDQUFDLENBQUMsWUFBWSxFQUFFLEdBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFFLEVBQUUsSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUMsTUFBSyxFQUFFLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUUsS0FBSyxDQUFDO1FBQUEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFDLFVBQVMsQ0FBQyxFQUFDO1VBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7VUFBQyxJQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLFlBQVksRUFBRTtVQUFDLElBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksRUFBRTtVQUFDLElBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFDO1lBQUMsSUFBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFDO1lBQU8sT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLHNCQUFzQixDQUFDLElBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBQyxNQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsSUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1VBQUE7UUFBQyxDQUFDLENBQUM7TUFBQSxDQUFDO01BQUMsV0FBVyxFQUFDLHFCQUFTLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxHQUFDLElBQUk7VUFBQyxDQUFDLEdBQUMsRUFBRTtRQUFDLFdBQVcsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBRyxDQUFDLEdBQUMsbUJBQW1CLENBQUM7UUFBQyxJQUFJLENBQUM7VUFBQyxDQUFDLEdBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFDLG1CQUFtQixHQUFDLGdCQUFnQjtRQUFDLFFBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTO1VBQUUsS0FBSSxNQUFNO1lBQUMsQ0FBQyxHQUFDLG9CQUFvQjtZQUFDO1VBQU0sS0FBSSxZQUFZO1lBQUMsQ0FBQyxHQUFDLHlCQUF5QjtZQUFDO1VBQU07WUFBUSxDQUFDLEdBQUMsb0JBQW9CO1FBQUE7UUFBQyxJQUFJLENBQUMsR0FBQyxFQUFFO1FBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUcsQ0FBQyxHQUFDLG9CQUFvQixDQUFDLEVBQUMsRUFBRSxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUFDLElBQUksQ0FBQyxHQUFDLEVBQUU7UUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBRSxRQUFRLElBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBRSxRQUFRLElBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsb0JBQW9CLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLG9CQUFvQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFFLFFBQVEsSUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBQyxvQkFBb0IsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUUsUUFBUSxJQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUcsQ0FBQyxHQUFDLGlCQUFpQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLG9CQUFvQixDQUFDLEVBQUMsQ0FBQyxPQUFPLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUUsT0FBTyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFFLFdBQVcsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsTUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRTtRQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBRyxDQUFDLEdBQUMsMEJBQTBCLENBQUM7UUFBQyxJQUFJLENBQUMsR0FBQyxvQ0FBb0MsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsdUVBQXVFLEdBQUMsQ0FBQyxHQUFDLEdBQUc7UUFBQyxPQUFPLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUcsQ0FBQyxJQUFFLCtCQUErQixHQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUUsY0FBYyxHQUFDLENBQUMsR0FBQyxpREFBaUQsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFDLGtCQUFrQixFQUFDLFFBQVEsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksR0FBQyxDQUFDLElBQUUsOERBQThELEdBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLElBQUUsUUFBUSxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFDLE9BQU8sSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBRyxDQUFDLElBQUUsUUFBUSxDQUFDLEVBQUMsQ0FBQyxJQUFFLFFBQVEsRUFBQyxPQUFPLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxJQUFFLGNBQWMsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLDRCQUE0QixDQUFDLEVBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7TUFBQSxDQUFDO01BQUMsWUFBWSxFQUFDLHdCQUFVO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSTtVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRTtRQUFDLENBQUMsQ0FBQyxNQUFNLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUUsQ0FBQyxHQUFDLHFFQUFxRSxFQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO01BQUEsQ0FBQztNQUFDLGdCQUFnQixFQUFDLDRCQUFVO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSTtVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVk7VUFBQyxDQUFDLEdBQUMsRUFBRTtVQUFDLENBQUMsR0FBQyxnRkFBZ0Y7UUFBQyxJQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsc0NBQXNDLElBQUUsRUFBRSxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxl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QUksRUFBRSxDQUFDLE9BQU8sQ0FBQztVQUFDLE9BQU8sRUFBQztRQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsWUFBVTtVQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsUUFBUSxFQUFDLFVBQVU7WUFBQyxPQUFPLEVBQUMsT0FBTztZQUFDLE9BQU8sRUFBQztVQUFDLENBQUMsQ0FBQztVQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsRUFBRTtVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxNQUFNLEVBQUU7VUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxLQUFLLEVBQUM7VUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsS0FBSyxFQUFDO1VBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUFDLEtBQUssRUFBQyxDQUFDO1lBQUMsTUFBTSxFQUFDO1VBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxZQUFVO1lBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztjQUFDLE9BQU8sRUFBQztZQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsWUFBVTtjQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUFDLEtBQUssRUFBQztjQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEdBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEdBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO2NBQUMsT0FBTyxFQUFDO1lBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxZQUFVO2NBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtZQUFBLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7Y0FBQyxPQUFPLEVBQUMsT0FBTztjQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVM7WUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Y0FBQyxPQUFPLEVBQUM7WUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO2NBQUMsT0FBTyxFQUFDO1lBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxZQUFVO2NBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtZQUFBLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7Y0FBQyxPQUFPLEVBQUMsT0FBTztjQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVM7WUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Y0FBQyxPQUFPLEVBQUM7WUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDO1VBQUEsQ0FBQyxDQUFDO1FBQUEsQ0FBQyxDQUFFO01BQUEsQ0FBQztNQUFDLFlBQVksRUFBQyxzQkFBUyxDQUFDLEVBQUM7UUFBQyxJQUFJLENBQUM7VUFBQyxDQUFDLEdBQUMsSUFBSTtRQUFDLENBQUMsR0FBQyxlQUFlLEdBQUMsQ0FBQyxHQUFDLHdFQUF3RSxFQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsc0NBQXNDLEdBQUMsQ0FBQyxHQUFDLFFBQVEsQ0FBQztNQUFBLENBQUM7TUFBQyxhQUFhLEVBQUMsdUJBQVMsQ0FBQyxFQUFDO1FBQUMsSUFBSSxDQUFDO1VBQUMsQ0FBQyxHQUFDLElBQUk7UUFBQyxDQUFDLEdBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFFLElBQUksS0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxlQUFlLEdBQUMsQ0FBQyxHQUFDLHdFQUF3RSxHQUFDLCtGQUErRixFQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO01BQUEsQ0FBQztNQUFDLFdBQVcsRUFBQyx1QkFBVTtRQUFDLElBQUksQ0FBQyxHQUFDLElBQUk7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVM7UUFBQyxNQUFNLEtBQUcsQ0FBQyxLQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENB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QyxjQUFjLEVBQUMsd0JBQVMsQ0FBQyxFQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSTtRQUFDLE1BQU0sSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsSUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxrQ0FBa0MsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyxrQkFBa0IsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztVQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQWUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFDLFlBQVU7VUFBQyxDQUFDLENBQUMsV0FBVyxFQUFFO1FBQUEsQ0FBQyxDQUFDLElBQUUsTUFBTSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztVQUFDLE9BQU8sRUFBQztRQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBQyxZQUFVO1VBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBQUEsQ0FBQyxDQUFDO01BQUEsQ0FBQztNQUFDLFFBQVEsRUFBQyxvQkFBVTtRQUFDLE9BQU0sY0FBYyxJQUFHLE1BQU0sSUFBRSxTQUFTLENBQUMsY0FBYztNQUFBO0lBQUMsQ0FBQztJQUFDLENBQUMsR0FBQyxFQUFFO0VBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUM7SUFBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUM7TUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztNQUFDLElBQUcsQ0FBQyxFQUFDO1FBQUMsSUFBRyxRQUFRLElBQUUsT0FBTyxDQUFDLEVBQUMsUUFBTyxDQUFDO1VBQUUsS0FBSSxNQUFNO1lBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFBQztVQUFNLEtBQUksT0FBTztZQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUU7UUFBQTtNQUFDLENBQUMsTUFBSTtRQUFDLElBQUksQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7VUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7VUFBQyxPQUFPLEVBQUM7UUFBQyxDQUFDLENBQUM7TUFBQTtJQUFDLENBQUMsQ0FBQztFQUFBLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUM7SUFBQyxJQUFJLEVBQUMsUUFBUTtJQUFDLGNBQWMsRUFBQyxJQUFJO0lBQUMsU0FBUyxFQUFDLE1BQU07SUFBQyxlQUFlLEVBQUMsR0FBRztJ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QUFDLEdBQUM7UUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztRQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFBQyxhQUFhLEVBQUMsQ0FBQztNQUFDLENBQUM7SUFBQyxVQUFVLENBQUMsWUFBVTtNQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFBQSxDQUFDLEVBQUMsR0FBRyxDQUFDO0VBQUEsQ0FBQyxDQUFDO0FBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDOzs7OztBQ0xydW5CLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxNQUFNLEVBQUUsWUFBVztFQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUztBQUMzQyxDQUFDLENBQUUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJqUXVlcnkoIGZ1bmN0aW9uKCAkICkge1xuXHQvKlxuXHQgKiBpbmZpbml0ZXNsaWRlXG5cdCAqL1xuXHQkKCAnLmpzLWluZmluaXRlc2xpZGUtLWxlZnQnICkuaW5maW5pdGVzbGlkZSgge1xuXHRcdCdkaXJlY3Rpb24nICAgOiAnbGVmdCcsXG5cdFx0J3NwZWVkJyAgICAgICA6IDIwLFxuXHRcdCdwYXVzZW9uaG92ZXInOiB0cnVlLFxuXHRcdCdjbG9uZScgICAgICAgOiAyLFxuXHRcdCdyZXNwb25zaXZlJyAgOiB0cnVlLFxuXHR9ICk7XG5cdCQoICcuanMtaW5maW5pdGVzbGlkZS0tcmlnaHQnICkuaW5maW5pdGVzbGlkZSgge1xuXHRcdCdkaXJlY3Rpb24nICAgOiAncmlnaHQnLFxuXHRcdCdzcGVlZCcgICAgICAgOiAyMCxcblx0XHQncGF1c2VvbmhvdmVyJzogdHJ1ZSxcblx0XHQnY2xvbmUnICAgICAgIDogMixcblx0XHQncmVzcG9uc2l2ZScgIDogdHJ1ZSxcblx0fSApO1xuXG5cdC8qXG5cdCAqIE1vZGFhbFxuXHQgKi9cblx0JCggJy5nYWxsZXJ5JyApLm1vZGFhbCAoIHtcblx0XHR0eXBlOiAnaW1hZ2UnLFxuXHRcdGJhY2tncm91bmQ6ICcjZmZmJyxcblx0XHRvdmVybGF5X29wYWNpdHk6ICcwLjUnLFxuXHRcdGZ1bGxzY3JlZW46IHRydWVcblx0fSApO1xufSApO1xuIiwiLy8gY29uc3QgbXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLm12JyApO1xuLy8gbXYuY2xhc3NMaXN0LmFkZCggJ2lzLWZhZGUtaW4nICk7XG5cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLm12JyApLmZvckVhY2goIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5jbGFzc0xpc3QuYWRkKCAnaXMtZmFkZS1pbicgKTtcblx0fSApO1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLnAtbG9nby0taGVhZGVyJyApLmZvckVhY2goIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5jbGFzc0xpc3QuYWRkKCAnaXMtZmFkZS1pbicgKTtcblx0fSApO1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnYm9keScgKS5jbGFzc0xpc3QuYWRkKCAnaXMtZmFkZS1pbicgKTtcblx0c2Nyb2xsRWZmZWN0KCk7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG5cdFx0c2Nyb2xsRWZmZWN0KCk7XG5cdH0gKTtcbn1cblxuZnVuY3Rpb24gc2Nyb2xsRWZmZWN0KCkge1xuXHRjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuaXMtZmFkZScgKTtcblxuXHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRsZXQgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuXHRcdGxldCBwb3NpdGlvbkZyb21Ub3AgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcblx0XHRsZXQgc2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cdFx0bGV0IHdpbmRvd0ggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cblx0XHRpZiAoIHNjcm9sbCA+IHBvc2l0aW9uRnJvbVRvcCAtIHdpbmRvd0ggKSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoICdpcy1zY3JvbGwnICk7XG5cdFx0fVxuXHR9XG59XG4iLCIvKlxuaW5maW5pdGVzbGlkZS5qcyB2MlxudmVyc2lvbjogMi4wLjFcbkF1dGhvcjogVC5Nb3JpbW90b1xuXG5Db3B5cmlnaHQgMjAxNywgVC5Nb3JpbW90b1xuKiBGcmVlIHRvIHVzZSBhbmQgYWJ1c2UgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuKiAvL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblxuLy9naXRodWIuY29tL3dvb2Ryb290cy9pbmZpbml0ZXNsaWRldjJcbiovXG5cbihmdW5jdGlvbigkKXtcblx0JCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdCAgICB3aW5kb3cubG9hZGVkID0gdHJ1ZTtcblx0fSk7XG5cdCQoZnVuY3Rpb24oKXtcblx0XHQkLmZuLmluZmluaXRlc2xpZGUgPSBmdW5jdGlvbihvcHRpb25zKXtcblx0XHRcdC8vb3B0aW9uXG5cdFx0XHR2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG5cdFx0XHRcdCdzcGVlZCc6IDEwMCwgLy/pgJ/jgZXjgIDljZjkvY3jga9weC/np5LjgafjgZnjgIJcblx0XHRcdFx0J2RpcmVjdGlvbic6ICdsZWZ0JywgLy91cC9kb3duL2xlZnQvcmlnaHTjgYvjgonpgbjmip5cblx0XHRcdFx0J3BhdXNlb25ob3Zlcic6IHRydWUsIC8v44Oe44Km44K544Kq44O844OQ44O844Gn44K544OI44OD44OXXG5cdFx0XHRcdCdyZXNwb25zaXZlJzogZmFsc2UsIC8v5a2Q6KaB57Sg44Gu5bmF44KSJeOBp+aMh+WumuOBl+OBpuOBhOOCi+OBqOOBjVxuXHRcdFx0XHQnY2xvbmUnOiAxXG5cdFx0XHR9LG9wdGlvbnMpO1xuXG5cdFx0XHR2YXIgc2V0Q3NzID0gZnVuY3Rpb24ob2JqLGRpcmVjdGlvbil7XG5cdFx0XHRcdCQob2JqKS53cmFwKCc8ZGl2IGNsYXNzPVwiaW5maW5pdGVzbGlkZV93cmFwXCI+PC9kaXY+JykucGFyZW50KCkuY3NzKHtcblx0XHRcdFx0XHRvdmVyZmxvdzogJ2hpZGRlbidcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICd1cCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0dmFyIGQgPSAnY29sdW1uJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgZCA9ICdyb3cnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JChvYmopLmNzcyh7XG5cdFx0XHRcdFx0ZGlzcGxheTogJ2ZsZXgnLFxuXHRcdFx0XHRcdGZsZXhXcmFwOiAnbm93cmFwJyxcblx0XHRcdFx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcblx0XHRcdFx0XHQnLW1zLWZsZXgtYWxpZ24nOiAnY2VudGVyJyxcblx0XHRcdFx0XHRmbGV4RGlyZWN0aW9uOiBkXG5cdFx0XHRcdH0pLmNoaWxkcmVuKCkuY3NzKHtcblx0XHRcdFx0XHRcdGZsZXg6ICdub25lJyxcblx0XHRcdFx0XHRcdGRpc3BsYXk6ICdibG9jaydcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHNldENsb25lID0gZnVuY3Rpb24ob2JqLGNsb25lKXtcblx0XHRcdFx0dmFyICRjbG9uZSA9ICQob2JqKS5jaGlsZHJlbigpLmNsb25lKHRydWUpLmFkZENsYXNzKCdpbmZpbml0ZXNsaWRlX2Nsb25lJyk7XG5cdFx0XHRcdHZhciBpID0gMTtcblx0XHRcdFx0d2hpbGUoaSA8PSBjbG9uZSl7XG5cdFx0XHRcdFx0JGNsb25lLmNsb25lKHRydWUpLmFwcGVuZFRvKCQob2JqKSk7XG5cdFx0XHRcdFx0aSsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciBnZXRXaWR0aCA9IGZ1bmN0aW9uKG9iail7XG5cdFx0XHRcdHZhciB3ID0gMDtcblx0XHRcdFx0JChvYmopLmNoaWxkcmVuKCc6bm90KC5pbmZpbml0ZXNsaWRlX2Nsb25lKScpLmVhY2goZnVuY3Rpb24oa2V5LHZhbHVlKXtcblx0XHRcdFx0XHR3ID0gdyArICQodGhpcykub3V0ZXJXaWR0aCh0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiB3O1xuXHRcdFx0fVxuXHRcdFx0dmFyIGdldEhlaWdodCA9IGZ1bmN0aW9uKG9iail7XG5cdFx0XHRcdHZhciBoID0gMDtcblx0XHRcdFx0JChvYmopLmNoaWxkcmVuKCc6bm90KC5pbmZpbml0ZXNsaWRlX2Nsb25lKScpLmVhY2goZnVuY3Rpb24oa2V5LHZhbHVlKXtcblx0XHRcdFx0XHRoID0gaCArICQodGhpcykub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gaDtcblx0XHRcdH1cblxuXG5cdFx0XHR2YXIgZ2V0U3BlZWQgPSBmdW5jdGlvbihsLHMpe1xuXHRcdFx0XHRyZXR1cm4gbCAvIHM7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZ2V0TnVtID0gZnVuY3Rpb24ob2JqLGRpcmVjdGlvbil7XG5cdFx0XHRcdGlmKGRpcmVjdGlvbiA9PSAndXAnIHx8IGRpcmVjdGlvbiA9PSAnZG93bicpe1xuXHRcdFx0XHRcdHZhciBudW0gPSBnZXRIZWlnaHQob2JqKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgbnVtID0gZ2V0V2lkdGgob2JqKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbnVtO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24obnVtLGRpcmVjdGlvbil7XG5cdFx0XHRcdGlmKGRpcmVjdGlvbiA9PSAndXAnIHx8IGRpcmVjdGlvbiA9PSAnZG93bicpe1xuXHRcdFx0XHRcdHZhciBpID0gJzAsLScgKyBudW0gKyAncHgsMCc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGkgPSAnLScgKyBudW0gKyAncHgsMCwwJztcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHNldEFuaW0gPSBmdW5jdGlvbihvYmosaWQsZGlyZWN0aW9uLHNwZWVkKXtcblx0XHRcdFx0dmFyIG51bSA9IGdldE51bShvYmosZGlyZWN0aW9uKTtcblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICd1cCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0JChvYmopLnBhcmVudCgnLmluZmluaXRlc2xpZGVfd3JhcCcpLmNzcyh7XG5cdFx0XHRcdFx0XHRoZWlnaHQ6IG51bSArICdweCdcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgaSA9IGdldFRyYW5zbGF0ZShudW0sZGlyZWN0aW9uKTtcblxuXHRcdFx0XHQkKG9iaikuYXR0cignZGF0YS1zdHlsZScsJ2luZmluaXRlc2xpZGUnICsgaWQpO1xuXG5cdFx0XHRcdHZhciBjc3MgPSAnQGtleWZyYW1lcyBpbmZpbml0ZXNsaWRlJyArIGlkICsgJ3snICtcblx0XHRcdFx0XHRcdFx0XHQnZnJvbSB7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTt9JyArXG5cdFx0XHRcdFx0XHRcdFx0J3RvIHt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoJyArIGkgKyAnKTt9JyArXG5cdFx0XHRcdFx0XHRcdCd9Jztcblx0XHRcdFx0JCgnPHN0eWxlIC8+JykuYXR0cignaWQnLCdpbmZpbml0ZXNsaWRlJyArIGlkICsgJ19zdHlsZScpXG5cdFx0XHRcdC5odG1sKGNzcylcblx0XHRcdFx0LmFwcGVuZFRvKCdoZWFkJyk7XG5cblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICdyaWdodCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0dmFyIHJldmVyc2UgPSAnIHJldmVyc2UnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciByZXZlcnNlID0gJyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKG9iaikuY3NzKHtcblx0XHRcdFx0XHRhbmltYXRpb246ICdpbmZpbml0ZXNsaWRlJyArIGlkICsgJyAnICsgZ2V0U3BlZWQobnVtLHNwZWVkKSArICdzIGxpbmVhciAwcyBpbmZpbml0ZScgKyByZXZlcnNlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHNldFN0b3AgPSBmdW5jdGlvbihvYmope1xuXHRcdFx0XHQkKG9iaikub24oJ21vdXNlZW50ZXInLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1xuXHRcdFx0XHRcdFx0YW5pbWF0aW9uUGxheVN0YXRlOiAncGF1c2VkJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KS5vbignbW91c2VsZWF2ZScsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XG5cdFx0XHRcdFx0XHRhbmltYXRpb25QbGF5U3RhdGU6ICdydW5uaW5nJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHNldFJlc3BvbnNpdmUgPSBmdW5jdGlvbihvYmosZGlyZWN0aW9uKXtcblx0XHRcdFx0XHR2YXIgbnVtID0gZ2V0TnVtKG9iaixkaXJlY3Rpb24pO1xuXHRcdFx0XHRcdHZhciBpID0gZ2V0VHJhbnNsYXRlKG51bSxkaXJlY3Rpb24pO1xuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHR9O1xuXG5cblxuXG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGtleSx2YWx1ZSl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBudW0gPSBEYXRlLm5vdygpICsgTWF0aC5mbG9vcigxMDAwMCpNYXRoLnJhbmRvbSgpKS50b1N0cmluZygxNik7XG5cdFx0XHRcdGlmKHNldHRpbmdzLnBhdXNlb25ob3ZlciA9PSB0cnVlKXtcblx0XHRcdFx0XHRzZXRTdG9wKCR0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgX29ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0c2V0Q3NzKCR0aGlzLHNldHRpbmdzLmRpcmVjdGlvbik7XG5cdFx0XHRcdFx0c2V0Q2xvbmUoJHRoaXMsc2V0dGluZ3MuY2xvbmUpO1xuXHRcdFx0XHRcdHNldEFuaW0oJHRoaXMsbnVtLHNldHRpbmdzLmRpcmVjdGlvbixzZXR0aW5ncy5zcGVlZCk7XG5cblx0XHRcdFx0XHRpZihzZXR0aW5ncy5yZXNwb25zaXZlKXtcblx0XHRcdFx0XHRcdCQod2luZG93KS5vbigncmVzaXplJyxmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHR2YXIgaSA9IHNldFJlc3BvbnNpdmUoJHRoaXMsc2V0dGluZ3MuZGlyZWN0aW9uKTtcblx0XHRcdFx0XHRcdFx0dmFyIHN0eWxlaWQgPSAkdGhpcy5hdHRyKCdkYXRhLXN0eWxlJyk7XG5cdFx0XHRcdFx0XHRcdHZhciBzdHlsZWh0bWwgPSAkKCcjJyArIHN0eWxlaWQgKyAnX3N0eWxlJykuaHRtbCgpO1xuXG5cdFx0XHRcdFx0XHRcdHZhciBzdHlsZWh0bWxfbmV3ID0gc3R5bGVodG1sLnJlcGxhY2UoL3RvIHt0cmFuc2Zvcm06dHJhbnNsYXRlM2RcXCgoLio/KVxcKS8sJ3RvIHt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoJyArIGkgKyAnKScpO1xuXHRcdFx0XHRcdFx0XHQkKCcjJyArIHN0eWxlaWQgKyAnX3N0eWxlJykuaHRtbChzdHlsZWh0bWxfbmV3KTtcblxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICh3aW5kb3cubG9hZGVkKSB7XG5cdFx0XHRcdFx0X29ubG9hZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQod2luZG93KS5vbignbG9hZCcsIF9vbmxvYWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdH1cblx0fSk7XG59KShqUXVlcnkpO1xuIiwiLypcbiAqIExvdHRpZVxuICovXG4vLyAoZnVuY3Rpb24gKCkge1xuLy8gXHRjb25zdCBhbmltID0gbG90dGllLmxvYWRBbmltYXRpb24oe1xuLy8gXHRcdGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdqcy13YXZlJyApLFxuLy8gXHRcdHJlbmRlcmVyOiAnc3ZnJyxcbi8vIFx0XHRsb29wOiB0cnVlLFxuLy8gXHRcdGF1dG9wbGF5OiB0cnVlLFxuLy8gXHRcdHBhdGg6ICcuL2Zvb3Rlcl93YXZlLmpzb24nXG4vLyBcdH0pO1xuLy8gfSgpKTtcblxualF1ZXJ5KCBmdW5jdGlvbiggJCApIHtcblx0Y29uc3QgcGFnZWxvYWQgICAgPSByZXF1aXJlKCAnLi9wYWdlbG9hZC5qcycgKTtcbiAgICBjb25zdCBlZmZlY3QgICAgICA9IHJlcXVpcmUoICcuL2VmZmVjdC5qcycgKTtcbiAgICBjb25zdCBzbGlkZSAgICAgICA9IHJlcXVpcmUoICcuL2luZmluaXRlc2xpZGV2Mi5qcycgKTtcbiAgICBjb25zdCBtb2RhYWxtaW5qcyA9IHJlcXVpcmUoICcuL21vZGFhbC9qcy9tb2RhYWwubWluLmpzJyApO1xuXHRjb25zdCBjb25maWcgICAgICA9IHJlcXVpcmUoICcuL2NvbmZpZy5qcycgKTtcblxuXHQvLyDjg4/jg7Pjg5Djg7zjgqzjg7zjg5zjgr/jg7Pjga7jgq/jg6rjg4Pjgq/lh6bnkIZcbiAgICAkKCcucC1oZWFkZXJfX2J1dHRvbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignc3BhbicpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cdFx0JCgnI21lbnUtaGVhZGVyLW1lbnUnKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIH0pO1xuXG4gICAgLy8g6Kaq44Oh44OL44Ol44O844Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignYScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5zdWItbWVudScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQoJyNtZW51LWhlYWRlci1tZW51JykudG9nZ2xlQ2xhc3MoJ2lzLWxvbmcnKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIOimquODoeODi+ODpeODvOOBruWkluWBtOOCkuOCr+ODquODg+OCr+OBl+OBn+OBqOOBjeOAgeOCr+ODqeOCueWQjeOCkuWJiumZpFxuICAgICAgICBpZighJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmNoaWxkcmVuKCdhJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJy5zdWItbWVudScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAkKCcjbWVudS1oZWFkZXItbWVudScpLnJlbW92ZUNsYXNzKCdpcy1sb25nJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOeUu+mdouOBjOODquOCteOCpOOCuuOBleOCjOOBn+OBqOOBjeOAgeWFqOOBpuOBruOCr+ODqeOCueWQjeOCkuWJiumZpFxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnLnAtaGVhZGVyX19idXR0b24nKS5jaGlsZHJlbignc3BhbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG5cdFx0JCgnI21lbnUtaGVhZGVyLW1lbnUnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmNoaWxkcmVuKCdhJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbignLnN1Yi1tZW51JykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnI21lbnUtaGVhZGVyLW1lbnUnKS5yZW1vdmVDbGFzcygnaXMtbG9uZycpO1xuICAgIH0pO1xuXG4gICAgLy8gR28gdG8gVG9w44Oc44K/44OzIC8g6IOM5pmv44OR44Op44Op44OD44Kv44K55Yem55CGXG4gICAgdmFyIHBhZ2V0b3AgPSAkKCcucC1nby10by10b3AnKTtcbiAgICBwYWdldG9wLmhpZGUoKTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNjcm9sbGVkID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgYmcxID0gJCgnLmMtYmctLXBhcmFsbGF4MScpO1xuICAgICAgICB2YXIgYmcyID0gJCgnLmMtYmctLXBhcmFsbGF4MicpO1xuICAgICAgICB2YXIgd2VpZ2h0MSA9IDAuNTtcbiAgICAgICAgdmFyIHdlaWdodDIgPSAwLjI7XG4gICAgICAgIHZhciB3aW5kb3dTaXplID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICAgIGlmICh3aW5kb3dTaXplID49IDc1MSkgeyAvLyDjgrnjgq/jg63jg7zjg6vjg5Djg7zjga7luYXjgpLliqDlkbPjgZfjgaYoNzY4LTE3KXB444Gn5oyH5a6aXG4gICAgICAgICAgICAvLyBQQ+OCteOCpOOCuuS7peS4iu+8mkdvIHRvIFRvcOODnOOCv+ODs+OBruWHpueQhlxuICAgICAgICAgICAgaWYgKHNjcm9sbGVkID4gMTAwKSB7IC8vIDEwMHB444K544Kv44Ot44O844Or44GX44Gf44KJ44Oc44K/44Oz6KGo56S6XG4gICAgICAgICAgICAgICAgcGFnZXRvcC5mYWRlSW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFnZXRvcC5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgJCgnLnAtZ28tdG8tdG9wX19pY29uJykucmVtb3ZlQ2xhc3MoJ2lzLW91dCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQQ+OCteOCpOOCuuS7peS4iu+8muiDjOaZr+ODkeODqeODqeODg+OCr+OCueOBruWHpueQhlxuICAgICAgICAgICAgaWYgKHdpbmRvd1NpemUgPj0gMTE4Mykge1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsID0gMjE2O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3dTaXplID49IDEwMDcpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbCA9IDE0MDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWwgPSAxMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiZzEuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgJ2xlZnQgdG9wIC0nKyBzY3JvbGxlZCAqIHdlaWdodDEgKyAncHgnKTtcbiAgICAgICAgICAgIGJnMi5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24teScsIGluaXRpYWwgLSBzY3JvbGxlZCAqIHdlaWdodDIgKyAncHgnKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUEPjgrXjgqTjgrrmnKrmuoDvvJrjg5Hjg6njg6njg4Pjgq/jgrnjga7jgrnjg5Tjg7zjg4njgpLpgYXjgonjgZvjgotcbiAgICAgICAgICAgIHZhciBpbml0aWFsID0gNTA7XG4gICAgICAgICAgICBiZzEuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgJ2xlZnQgdG9wIC0nKyBzY3JvbGxlZCAqIHdlaWdodDEgKiAwLjUgKyAncHgnKTtcbiAgICAgICAgICAgIGJnMi5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24teScsIGluaXRpYWwgLSBzY3JvbGxlZCAqIHdlaWdodDIgKiAwLjIgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gR28gdG8gVG9w44Oc44K/44Oz44Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgcGFnZXRvcC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LCAzMDApOyAgLy8gMC4z56eS44GL44GR44Gm44OI44OD44OX44G456e75YuVXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8vIEdvIHRvIFRvcOODnOOCv+ODs+OBrmhvdmVy5Yem55CGXG4gICAgJCgnLnAtZ28tdG8tdG9wX19pY29uJykuaG92ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtaG92ZXInKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3V0Jyk7XG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3V0Jyk7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWhvdmVyJyk7XG4gICAgfSk7XG5cbiAgICAvLyDjg4jjg4Pjg5fjga7jgrPjg7Pjg4bjg7Pjg4Tpg6jliIbjgavjgrnjgq/jg63jg7zjg6vjgZfjgZ/nnqzplpPjgIHog4zmma/nlLvlg4/jgYzmqKrjgYvjgonjgrnjg6njgqTjg4njgZnjgovli5XjgY1cbiAgICAkKCcucC10b3AtYXJ0aWNsZS0td29ya3MsIC5wLXRvcC1hcnRpY2xlLS1zZXJ2aWNlLCAucC10b3AtYXJ0aWNsZS0tYWJvdXQtdXMnKS5lYWNoKGZ1bmN0aW9uKGksIGVsZW0pe1xuICAgICAgICB2YXIgY29udGVudHNQT1MgPSAkKGVsZW0pLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHNjcm9sbCByZXNpemUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICB2YXIgc2hvd0NsYXNzID0gJ3Nob3cnO1xuICAgICAgICAgICAgdmFyIHRpbWluZyA9IDIwMDsgLy8gMjAwcHjjgrPjg7Pjg4bjg7Pjg4TjgYzopovjgYjjgZ/jgonmrKHjga5pZuaWh+OBjHRydWVcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPj0gY29udGVudHNQT1MgLSB3aW5IZWlnaHQgKyB0aW1pbmcpe1xuICAgICAgICAgICAgICAgICQoZWxlbSkuYWRkQ2xhc3Moc2hvd0NsYXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtKS5yZW1vdmVDbGFzcyhzaG93Q2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0gKTtcbiIsIi8qIVxuXHRNb2RhYWwgLSBhY2Nlc3NpYmxlIG1vZGFscyAtIHYwLjQuNFxuXHRieSBIdW1hYW4sIGZvciBhbGwgaHVtYW5zLlxuXHQvL2h1bWFhbi5jb21cbiAqL1xuIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIHQoYSl7dmFyIHQ9e30sbz0hMTthLmF0dHIoXCJkYXRhLW1vZGFhbC10eXBlXCIpJiYobz0hMCx0LnR5cGU9YS5hdHRyKFwiZGF0YS1tb2RhYWwtdHlwZVwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY29udGVudC1zb3VyY2VcIikmJihvPSEwLHQuY29udGVudF9zb3VyY2U9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY29udGVudC1zb3VyY2VcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWFuaW1hdGlvblwiKSYmKG89ITAsdC5hbmltYXRpb249YS5hdHRyKFwiZGF0YS1tb2RhYWwtYW5pbWF0aW9uXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1hbmltYXRpb24tc3BlZWRcIikmJihvPSEwLHQuYW5pbWF0aW9uX3NwZWVkPWEuYXR0cihcImRhdGEtbW9kYWFsLWFuaW1hdGlvbi1zcGVlZFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtYWZ0ZXItY2FsbGJhY2stZGVsYXlcIikmJihvPSEwLHQuYWZ0ZXJfY2FsbGJhY2tfZGVsYXk9YS5hdHRyKFwiZGF0YS1tb2RhYWwtYWZ0ZXItY2FsbGJhY2stZGVsYXlcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWlzLWxvY2tlZFwiKSYmKG89ITAsdC5pc19sb2NrZWQ9XCJ0cnVlXCI9PT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1pcy1sb2NrZWRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWhpZGUtY2xvc2VcIikmJihvPSEwLHQuaGlkZV9jbG9zZT1cInRydWVcIj09PWEuYXR0cihcImRhdGEtbW9kYWFsLWhpZGUtY2xvc2VcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWJhY2tncm91bmRcIikmJihvPSEwLHQuYmFja2dyb3VuZD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1iYWNrZ3JvdW5kXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1vdmVybGF5LW9wYWNpdHlcIikmJihvPSEwLHQub3ZlcmxheV9vcGFjaXR5PWEuYXR0cihcImRhdGEtbW9kYWFsLW92ZXJsYXktb3BhY2l0eVwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtb3ZlcmxheS1jbG9zZVwiKSYmKG89ITAsdC5vdmVybGF5X2Nsb3NlPVwiZmFsc2VcIiE9PWEuYXR0cihcImRhdGEtbW9kYWFsLW92ZXJsYXktY2xvc2VcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWFjY2Vzc2libGUtdGl0bGVcIikmJihvPSEwLHQuYWNjZXNzaWJsZV90aXRsZT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1hY2Nlc3NpYmxlLXRpdGxlXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1zdGFydC1vcGVuXCIpJiYobz0hMCx0LnN0YXJ0X29wZW49XCJ0cnVlXCI9PT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1zdGFydC1vcGVuXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1mdWxsc2NyZWVuXCIpJiYobz0hMCx0LmZ1bGxzY3JlZW49XCJ0cnVlXCI9PT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1mdWxsc2NyZWVuXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jdXN0b20tY2xhc3NcIikmJihvPSEwLHQuY3VzdG9tX2NsYXNzPWEuYXR0cihcImRhdGEtbW9kYWFsLWN1c3RvbS1jbGFzc1wiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY2xvc2UtdGV4dFwiKSYmKG89ITAsdC5jbG9zZV90ZXh0PWEuYXR0cihcImRhdGEtbW9kYWFsLWNsb3NlLXRleHRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNsb3NlLWFyaWEtbGFiZWxcIikmJihvPSEwLHQuY2xvc2VfYXJpYV9sYWJlbD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jbG9zZS1hcmlhLWxhYmVsXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1iYWNrZ3JvdW5kLXNjcm9sbFwiKSYmKG89ITAsdC5iYWNrZ3JvdW5kX3Njcm9sbD1cInRydWVcIj09PWEuYXR0cihcImRhdGEtbW9kYWFsLWJhY2tncm91bmQtc2Nyb2xsXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC13aWR0aFwiKSYmKG89ITAsdC53aWR0aD1wYXJzZUludChhLmF0dHIoXCJkYXRhLW1vZGFhbC13aWR0aFwiKSkpLGEuYXR0cihcImRhdGEtbW9kYWFsLWhlaWdodFwiKSYmKG89ITAsdC5oZWlnaHQ9cGFyc2VJbnQoYS5hdHRyKFwiZGF0YS1tb2RhYWwtaGVpZ2h0XCIpKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS1idXR0b24tdGV4dFwiKSYmKG89ITAsdC5jb25maXJtX2J1dHRvbl90ZXh0PWEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tYnV0dG9uLXRleHRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tY2FuY2VsLWJ1dHRvbi10ZXh0XCIpJiYobz0hMCx0LmNvbmZpcm1fY2FuY2VsX2J1dHRvbl90ZXh0PWEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tY2FuY2VsLWJ1dHRvbi10ZXh0XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLXRpdGxlXCIpJiYobz0hMCx0LmNvbmZpcm1fdGl0bGU9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS10aXRsZVwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS1jb250ZW50XCIpJiYobz0hMCx0LmNvbmZpcm1fY29udGVudD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLWNvbnRlbnRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWdhbGxlcnktYWN0aXZlLWNsYXNzXCIpJiYobz0hMCx0LmdhbGxlcnlfYWN0aXZlX2NsYXNzPWEuYXR0cihcImRhdGEtbW9kYWFsLWdhbGxlcnktYWN0aXZlLWNsYXNzXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1sb2FkaW5nLWNvbnRlbnRcIikmJihvPSEwLHQubG9hZGluZ19jb250ZW50PWEuYXR0cihcImRhdGEtbW9kYWFsLWxvYWRpbmctY29udGVudFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtbG9hZGluZy1jbGFzc1wiKSYmKG89ITAsdC5sb2FkaW5nX2NsYXNzPWEuYXR0cihcImRhdGEtbW9kYWFsLWxvYWRpbmctY2xhc3NcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWFqYXgtZXJyb3ItY2xhc3NcIikmJihvPSEwLHQuYWpheF9lcnJvcl9jbGFzcz1hLmF0dHIoXCJkYXRhLW1vZGFhbC1hamF4LWVycm9yLWNsYXNzXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1pbnN0YWdyYW0taWRcIikmJihvPSEwLHQuaW5zdGFncmFtX2lkPWEuYXR0cihcImRhdGEtbW9kYWFsLWluc3RhZ3JhbS1pZFwiKSksbyYmYS5tb2RhYWwodCl9dmFyIG89e2luaXQ6ZnVuY3Rpb24odCxvKXt2YXIgZT10aGlzO2lmKGUuZG9tPWEoXCJib2R5XCIpLGUuJGVsZW09YShvKSxlLm9wdGlvbnM9YS5leHRlbmQoe30sYS5mbi5tb2RhYWwub3B0aW9ucyxlLiRlbGVtLmRhdGEoKSx0KSxlLnhocj1udWxsLGUuc2NvcGU9e2lzX29wZW46ITEsaWQ6XCJtb2RhYWxfXCIrKG5ldyBEYXRlKS5nZXRUaW1lKCkrTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDIpLHNvdXJjZTplLm9wdGlvbnMuY29udGVudF9zb3VyY2U/ZS5vcHRpb25zLmNvbnRlbnRfc291cmNlOmUuJGVsZW0uYXR0cihcImhyZWZcIil9LGUuJGVsZW0uYXR0cihcImRhdGEtbW9kYWFsLXNjb3BlXCIsZS5zY29wZS5pZCksZS5wcml2YXRlX29wdGlvbnM9e2FjdGl2ZV9jbGFzczpcImlzX2FjdGl2ZVwifSxlLmxhc3RGb2N1cz1udWxsLGUub3B0aW9ucy5pc19sb2NrZWR8fFwiY29uZmlybVwiPT1lLm9wdGlvbnMudHlwZXx8ZS5vcHRpb25zLmhpZGVfY2xvc2U/ZS5zY29wZS5jbG9zZV9idG49XCJcIjplLnNjb3BlLmNsb3NlX2J0bj0nPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtb2RhYWwtY2xvc2VcIiBpZD1cIm1vZGFhbC1jbG9zZVwiIGFyaWEtbGFiZWw9XCInK2Uub3B0aW9ucy5jbG9zZV9hcmlhX2xhYmVsKydcIj48c3Bhbj4nK2Uub3B0aW9ucy5jbG9zZV90ZXh0K1wiPC9zcGFuPjwvYnV0dG9uPlwiLFwibm9uZVwiPT09ZS5vcHRpb25zLmFuaW1hdGlvbiYmKGUub3B0aW9ucy5hbmltYXRpb25fc3BlZWQ9MCxlLm9wdGlvbnMuYWZ0ZXJfY2FsbGJhY2tfZGVsYXk9MCksYShvKS5vbihcImNsaWNrLk1vZGFhbFwiLGZ1bmN0aW9uKGEpe2EucHJldmVudERlZmF1bHQoKSxlLmNyZWF0ZV9tb2RhYWwoZSxhKX0pLCEwPT09ZS5vcHRpb25zLm91dGVyX2NvbnRyb2xzKXZhciBpPVwib3V0ZXJcIjtlbHNlIHZhciBpPVwiaW5uZXJcIjtlLnNjb3BlLnByZXZfYnRuPSc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWNvbnRyb2wgbW9kYWFsLWdhbGxlcnktcHJldiBtb2RhYWwtZ2FsbGVyeS1wcmV2LScraSsnXCIgaWQ9XCJtb2RhYWwtZ2FsbGVyeS1wcmV2XCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIGltYWdlICh1c2UgbGVmdCBhcnJvdyB0byBjaGFuZ2UpXCI+PHNwYW4+UHJldmlvdXMgSW1hZ2U8L3NwYW4+PC9idXR0b24+JyxlLnNjb3BlLm5leHRfYnRuPSc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWNvbnRyb2wgbW9kYWFsLWdhbGxlcnktbmV4dCBtb2RhYWwtZ2FsbGVyeS1uZXh0LScraSsnXCIgaWQ9XCJtb2RhYWwtZ2FsbGVyeS1uZXh0XCIgYXJpYS1sYWJlbD1cIk5leHQgaW1hZ2UgKHVzZSByaWdodCBhcnJvdyB0byBjaGFuZ2UpXCI+PHNwYW4+TmV4dCBJbWFnZTwvc3Bhbj48L2J1dHRvbj4nLCEwPT09ZS5vcHRpb25zLnN0YXJ0X29wZW4mJmUuY3JlYXRlX21vZGFhbChlKX0sY3JlYXRlX21vZGFhbDpmdW5jdGlvbihhLHQpe3ZhciBvLGE9dGhpcztpZihhLmxhc3RGb2N1cz1hLiRlbGVtLCExIT09YS5vcHRpb25zLnNob3VsZF9vcGVuJiYoXCJmdW5jdGlvblwiIT10eXBlb2YgYS5vcHRpb25zLnNob3VsZF9vcGVufHwhMSE9PWEub3B0aW9ucy5zaG91bGRfb3BlbigpKSl7c3dpdGNoKGEub3B0aW9ucy5iZWZvcmVfb3Blbi5jYWxsKGEsdCksYS5vcHRpb25zLnR5cGUpe2Nhc2VcImlubGluZVwiOmEuY3JlYXRlX2Jhc2ljKCk7YnJlYWs7Y2FzZVwiYWpheFwiOm89YS5vcHRpb25zLnNvdXJjZShhLiRlbGVtLGEuc2NvcGUuc291cmNlKSxhLmZldGNoX2FqYXgobyk7YnJlYWs7Y2FzZVwiY29uZmlybVwiOmEub3B0aW9ucy5pc19sb2NrZWQ9ITAsYS5jcmVhdGVfY29uZmlybSgpO2JyZWFrO2Nhc2VcImltYWdlXCI6YS5jcmVhdGVfaW1hZ2UoKTticmVhaztjYXNlXCJpZnJhbWVcIjpvPWEub3B0aW9ucy5zb3VyY2UoYS4kZWxlbSxhLnNjb3BlLnNvdXJjZSksYS5jcmVhdGVfaWZyYW1lKG8pO2JyZWFrO2Nhc2VcInZpZGVvXCI6YS5jcmVhdGVfdmlkZW8oYS5zY29wZS5zb3VyY2UpO2JyZWFrO2Nhc2VcImluc3RhZ3JhbVwiOmEuY3JlYXRlX2luc3RhZ3JhbSgpfWEud2F0Y2hfZXZlbnRzKCl9fSx3YXRjaF9ldmVudHM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3QuZG9tLm9mZihcImNsaWNrLk1vZGFhbCBrZXl1cC5Nb2RhYWwga2V5ZG93bi5Nb2RhYWxcIiksdC5kb20ub24oXCJrZXlkb3duLk1vZGFhbFwiLGZ1bmN0aW9uKG8pe3ZhciBlPW8ua2V5Q29kZSxpPW8udGFyZ2V0Ozk9PWUmJnQuc2NvcGUuaXNfb3BlbiYmKGEuY29udGFpbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodC5zY29wZS5pZCksaSl8fGEoXCIjXCIrdC5zY29wZS5pZCkuZmluZCgnKlt0YWJpbmRleD1cIjBcIl0nKS5mb2N1cygpKX0pLHQuZG9tLm9uKFwia2V5dXAuTW9kYWFsXCIsZnVuY3Rpb24obyl7dmFyIGU9by5rZXlDb2RlLGk9by50YXJnZXQ7cmV0dXJuIG8uc2hpZnRLZXkmJjk9PW8ua2V5Q29kZSYmdC5zY29wZS5pc19vcGVuJiYoYS5jb250YWlucyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LnNjb3BlLmlkKSxpKXx8YShcIiNcIit0LnNjb3BlLmlkKS5maW5kKFwiLm1vZGFhbC1jbG9zZVwiKS5mb2N1cygpKSwhdC5vcHRpb25zLmlzX2xvY2tlZCYmMjc9PWUmJnQuc2NvcGUuaXNfb3Blbj8hYShkb2N1bWVudC5hY3RpdmVFbGVtZW50KS5pcyhcImlucHV0Om5vdCg6Y2hlY2tib3gpOm5vdCg6cmFkaW8pXCIpJiZ2b2lkIHQubW9kYWFsX2Nsb3NlKCk6XCJpbWFnZVwiPT10Lm9wdGlvbnMudHlwZT8oMzc9PWUmJnQuc2NvcGUuaXNfb3BlbiYmIWEoXCIjXCIrdC5zY29wZS5pZCtcIiAubW9kYWFsLWdhbGxlcnktcHJldlwiKS5oYXNDbGFzcyhcImlzX2hpZGRlblwiKSYmdC5nYWxsZXJ5X3VwZGF0ZShcInByZXZcIiksdm9pZCgzOT09ZSYmdC5zY29wZS5pc19vcGVuJiYhYShcIiNcIit0LnNjb3BlLmlkK1wiIC5tb2RhYWwtZ2FsbGVyeS1uZXh0XCIpLmhhc0NsYXNzKFwiaXNfaGlkZGVuXCIpJiZ0LmdhbGxlcnlfdXBkYXRlKFwibmV4dFwiKSkpOnZvaWQgMH0pLHQuZG9tLm9uKFwiY2xpY2suTW9kYWFsXCIsZnVuY3Rpb24obyl7dmFyIGU9YShvLnRhcmdldCk7aWYoIXQub3B0aW9ucy5pc19sb2NrZWQmJih0Lm9wdGlvbnMub3ZlcmxheV9jbG9zZSYmZS5pcyhcIi5tb2RhYWwtaW5uZXItd3JhcHBlclwiKXx8ZS5pcyhcIi5tb2RhYWwtY2xvc2VcIil8fGUuY2xvc2VzdChcIi5tb2RhYWwtY2xvc2VcIikubGVuZ3RoKSlyZXR1cm4gdm9pZCB0Lm1vZGFhbF9jbG9zZSgpO2lmKGUuaXMoXCIubW9kYWFsLWNvbmZpcm0tYnRuXCIpKXJldHVybiBlLmlzKFwiLm1vZGFhbC1va1wiKSYmdC5vcHRpb25zLmNvbmZpcm1fY2FsbGJhY2suY2FsbCh0LHQubGFzdEZvY3VzKSxlLmlzKFwiLm1vZGFhbC1jYW5jZWxcIikmJnQub3B0aW9ucy5jb25maXJtX2NhbmNlbF9jYWxsYmFjay5jYWxsKHQsdC5sYXN0Rm9jdXMpLHZvaWQgdC5tb2RhYWxfY2xvc2UoKTtpZihlLmlzKFwiLm1vZGFhbC1nYWxsZXJ5LWNvbnRyb2xcIikpe2lmKGUuaGFzQ2xhc3MoXCJpc19oaWRkZW5cIikpcmV0dXJuO3JldHVybiBlLmlzKFwiLm1vZGFhbC1nYWxsZXJ5LXByZXZcIikmJnQuZ2FsbGVyeV91cGRhdGUoXCJwcmV2XCIpLHZvaWQoZS5pcyhcIi5tb2RhYWwtZ2FsbGVyeS1uZXh0XCIpJiZ0LmdhbGxlcnlfdXBkYXRlKFwibmV4dFwiKSl9fSl9LGJ1aWxkX21vZGFsOmZ1bmN0aW9uKHQpe3ZhciBvPXRoaXMsZT1cIlwiO1wiaW5zdGFncmFtXCI9PW8ub3B0aW9ucy50eXBlJiYoZT1cIiBtb2RhYWwtaW5zdGFncmFtXCIpO3ZhciBpLGw9XCJ2aWRlb1wiPT1vLm9wdGlvbnMudHlwZT9cIm1vZGFhbC12aWRlby13cmFwXCI6XCJtb2RhYWwtY29udGVudFwiO3N3aXRjaChvLm9wdGlvbnMuYW5pbWF0aW9uKXtjYXNlXCJmYWRlXCI6aT1cIiBtb2RhYWwtc3RhcnRfZmFkZVwiO2JyZWFrO2Nhc2VcInNsaWRlLWRvd25cIjppPVwiIG1vZGFhbC1zdGFydF9zbGlkZWRvd25cIjticmVhaztkZWZhdWx0Omk9XCIgbW9kYWFsLXN0YXJ0X25vbmVcIn12YXIgbj1cIlwiO28ub3B0aW9ucy5mdWxsc2NyZWVuJiYobj1cIiBtb2RhYWwtZnVsbHNjcmVlblwiKSxcIlwiPT09by5vcHRpb25zLmN1c3RvbV9jbGFzcyYmdm9pZCAwPT09by5vcHRpb25zLmN1c3RvbV9jbGFzc3x8KG8ub3B0aW9ucy5jdXN0b21fY2xhc3M9XCIgXCIrby5vcHRpb25zLmN1c3RvbV9jbGFzcyk7dmFyIHM9XCJcIjtvLm9wdGlvbnMud2lkdGgmJm8ub3B0aW9ucy5oZWlnaHQmJlwibnVtYmVyXCI9PXR5cGVvZiBvLm9wdGlvbnMud2lkdGgmJlwibnVtYmVyXCI9PXR5cGVvZiBvLm9wdGlvbnMuaGVpZ2h0P3M9JyBzdHlsZT1cIm1heC13aWR0aDonK28ub3B0aW9ucy53aWR0aCtcInB4O2hlaWdodDpcIitvLm9wdGlvbnMuaGVpZ2h0KydweDtvdmVyZmxvdzphdXRvO1wiJzpvLm9wdGlvbnMud2lkdGgmJlwibnVtYmVyXCI9PXR5cGVvZiBvLm9wdGlvbnMud2lkdGg/cz0nIHN0eWxlPVwibWF4LXdpZHRoOicrby5vcHRpb25zLndpZHRoKydweDtcIic6by5vcHRpb25zLmhlaWdodCYmXCJudW1iZXJcIj09dHlwZW9mIG8ub3B0aW9ucy5oZWlnaHQmJihzPScgc3R5bGU9XCJoZWlnaHQ6JytvLm9wdGlvbnMuaGVpZ2h0KydweDtvdmVyZmxvdzphdXRvO1wiJyksKFwiaW1hZ2VcIj09by5vcHRpb25zLnR5cGV8fFwidmlkZW9cIj09by5vcHRpb25zLnR5cGV8fFwiaW5zdGFncmFtXCI9PW8ub3B0aW9ucy50eXBlfHxvLm9wdGlvbnMuZnVsbHNjcmVlbikmJihzPVwiXCIpO3ZhciBkPVwiXCI7by5pc190b3VjaCgpJiYoZD0nIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7XCInKTt2YXIgcj0nPGRpdiBjbGFzcz1cIm1vZGFhbC13cmFwcGVyIG1vZGFhbC0nK28ub3B0aW9ucy50eXBlK2krZStuK28ub3B0aW9ucy5jdXN0b21fY2xhc3MrJ1wiIGlkPVwiJytvLnNjb3BlLmlkKydcIj48ZGl2IGNsYXNzPVwibW9kYWFsLW91dGVyLXdyYXBwZXJcIj48ZGl2IGNsYXNzPVwibW9kYWFsLWlubmVyLXdyYXBwZXJcIicrZCtcIj5cIjtcInZpZGVvXCIhPW8ub3B0aW9ucy50eXBlJiYocis9JzxkaXYgY2xhc3M9XCJtb2RhYWwtY29udGFpbmVyXCInK3MrXCI+XCIpLHIrPSc8ZGl2IGNsYXNzPVwiJytsKycgbW9kYWFsLWZvY3VzXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiIGFyaWEtbGFiZWw9XCInK28ub3B0aW9ucy5hY2Nlc3NpYmxlX3RpdGxlK1wiIC0gXCIrby5vcHRpb25zLmNsb3NlX2FyaWFfbGFiZWwrJ1wiIHJvbGU9XCJkaWFsb2dcIj4nLFwiaW5saW5lXCI9PW8ub3B0aW9ucy50eXBlP3IrPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCIgcm9sZT1cImRvY3VtZW50XCI+PC9kaXY+JzpyKz10LHIrPVwiPC9kaXY+XCIrby5zY29wZS5jbG9zZV9idG4sXCJ2aWRlb1wiIT1vLm9wdGlvbnMudHlwZSYmKHIrPVwiPC9kaXY+XCIpLHIrPVwiPC9kaXY+XCIsXCJpbWFnZVwiPT1vLm9wdGlvbnMudHlwZSYmITA9PT1vLm9wdGlvbnMub3V0ZXJfY29udHJvbHMmJihyKz1vLnNjb3BlLnByZXZfYnRuK28uc2NvcGUubmV4dF9idG4pLHIrPVwiPC9kaXY+PC9kaXY+XCIsYShcIiNcIitvLnNjb3BlLmlkK1wiX292ZXJsYXlcIikubGVuZ3RoPDEmJm8uZG9tLmFwcGVuZChyKSxcImlubGluZVwiPT1vLm9wdGlvbnMudHlwZSYmdC5hcHBlbmRUbyhcIiNcIitvLnNjb3BlLmlkK1wiIC5tb2RhYWwtY29udGVudC1jb250YWluZXJcIiksby5tb2RhYWxfb3ZlcmxheShcInNob3dcIil9LGNyZWF0ZV9iYXNpYzpmdW5jdGlvbigpe3ZhciB0PXRoaXMsbz1hKHQuc2NvcGUuc291cmNlKSxlPVwiXCI7by5sZW5ndGg/KGU9by5jb250ZW50cygpLmRldGFjaCgpLG8uZW1wdHkoKSk6ZT1cIkNvbnRlbnQgY291bGQgbm90IGJlIGxvYWRlZC4gUGxlYXNlIGNoZWNrIHRoZSBzb3VyY2UgYW5kIHRyeSBhZ2Fpbi5cIix0LmJ1aWxkX21vZGFsKGUpfSxjcmVhdGVfaW5zdGFncmFtOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxvPXQub3B0aW9ucy5pbnN0YWdyYW1faWQsZT1cIlwiLGk9XCJJbnN0YWdyYW0gcGhvdG8gY291bGRuJ3QgYmUgbG9hZGVkLCBwbGVhc2UgY2hlY2sgdGhlIGVtYmVkIGNvZGUgYW5kIHRyeSBhZ2Fpbi5cIjtpZih0LmJ1aWxkX21vZGFsKCc8ZGl2IGNsYXNzPVwibW9kYWFsLWNvbnRlbnQtY29udGFpbmVyJysoXCJcIiE9dC5vcHRpb25zLmxvYWRpbmdfY2xhc3M/XCIgXCIrdC5vcHRpb25zLmxvYWRpbmdfY2xhc3M6XCJcIikrJ1wiPicrdC5vcHRpb25zLmxvYWRpbmdfY29udGVudCtcIjwvZGl2PlwiKSxcIlwiIT1vJiZudWxsIT09byYmdm9pZCAwIT09byl7dmFyIGw9XCIvL2FwaS5pbnN0YWdyYW0uY29tL29lbWJlZD91cmw9Ly9pbnN0YWdyLmFtL3AvXCIrbytcIi9cIjthLmFqYXgoe3VybDpsLGRhdGFUeXBlOlwianNvbnBcIixjYWNoZTohMSxzdWNjZXNzOmZ1bmN0aW9uKG8pe3QuZG9tLmFwcGVuZCgnPGRpdiBpZD1cInRlbXAtaWdcIiBzdHlsZT1cIndpZHRoOjA7aGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuO1wiPicrby5odG1sK1wiPC9kaXY+XCIpLHQuZG9tLmF0dHIoXCJkYXRhLWlnbG9hZGVkXCIpP3dpbmRvdy5pbnN0Z3JtLkVtYmVkcy5wcm9jZXNzKCk6dC5kb20uYXR0cihcImRhdGEtaWdsb2FkZWRcIixcInRydWVcIik7dmFyIGU9XCIjXCIrdC5zY29wZS5pZCtcIiAubW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCI7YShlKS5sZW5ndGg+MCYmc2V0VGltZW91dChmdW5jdGlvbigpe2EoXCIjdGVtcC1pZ1wiKS5jb250ZW50cygpLmNsb25lKCkuYXBwZW5kVG8oZSksYShcIiN0ZW1wLWlnXCIpLnJlbW92ZSgpfSwxZTMpfSxlcnJvcjpmdW5jdGlvbigpe2U9aTt2YXIgbz1hKFwiI1wiK3Quc2NvcGUuaWQrXCIgLm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiKTtvLmxlbmd0aD4wJiYoby5yZW1vdmVDbGFzcyh0Lm9wdGlvbnMubG9hZGluZ19jbGFzcykuYWRkQ2xhc3ModC5vcHRpb25zLmFqYXhfZXJyb3JfY2xhc3MpLG8uaHRtbChlKSl9fSl9ZWxzZSBlPWk7cmV0dXJuITF9LGZldGNoX2FqYXg6ZnVuY3Rpb24odCl7dmFyIG89dGhpcztudWxsPT1vLm9wdGlvbnMuYWNjZXNzaWJsZV90aXRsZSYmKG8ub3B0aW9ucy5hY2Nlc3NpYmxlX3RpdGxlPVwiRGlhbG9nIFdpbmRvd1wiKSxudWxsIT09by54aHImJihvLnhoci5hYm9ydCgpLG8ueGhyPW51bGwpLG8uYnVpbGRfbW9kYWwoJzxkaXYgY2xhc3M9XCJtb2RhYWwtY29udGVudC1jb250YWluZXInKyhcIlwiIT1vLm9wdGlvbnMubG9hZGluZ19jbGFzcz9cIiBcIitvLm9wdGlvbnMubG9hZGluZ19jbGFzczpcIlwiKSsnXCI+JytvLm9wdGlvbnMubG9hZGluZ19jb250ZW50K1wiPC9kaXY+XCIpLG8ueGhyPWEuYWpheCh0LHtzdWNjZXNzOmZ1bmN0aW9uKHQpe3ZhciBlPWEoXCIjXCIrby5zY29wZS5pZCkuZmluZChcIi5tb2RhYWwtY29udGVudC1jb250YWluZXJcIik7ZS5sZW5ndGg+MCYmKGUucmVtb3ZlQ2xhc3Moby5vcHRpb25zLmxvYWRpbmdfY2xhc3MpLGUuaHRtbCh0KSxvLm9wdGlvbnMuYWpheF9zdWNjZXNzLmNhbGwobyxlKSl9LGVycm9yOmZ1bmN0aW9uKHQpe2lmKFwiYWJvcnRcIiE9dC5zdGF0dXNUZXh0KXt2YXIgZT1hKFwiI1wiK28uc2NvcGUuaWQrXCIgLm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiKTtlLmxlbmd0aD4wJiYoZS5yZW1vdmVDbGFzcyhvLm9wdGlvbnMubG9hZGluZ19jbGFzcykuYWRkQ2xhc3Moby5vcHRpb25zLmFqYXhfZXJyb3JfY2xhc3MpLGUuaHRtbChcIkNvbnRlbnQgY291bGQgbm90IGJlIGxvYWRlZC4gUGxlYXNlIGNoZWNrIHRoZSBzb3VyY2UgYW5kIHRyeSBhZ2Fpbi5cIikpfX19KX0sY3JlYXRlX2NvbmZpcm06ZnVuY3Rpb24oKXt2YXIgYSx0PXRoaXM7YT0nPGRpdiBjbGFzcz1cIm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiPjxoMSBpZD1cIm1vZGFhbC10aXRsZVwiPicrdC5vcHRpb25zLmNvbmZpcm1fdGl0bGUrJzwvaDE+PGRpdiBjbGFzcz1cIm1vZGFhbC1jb25maXJtLWNvbnRlbnRcIj4nK3Qub3B0aW9ucy5jb25maXJtX2NvbnRlbnQrJzwvZGl2PjxkaXYgY2xhc3M9XCJtb2RhYWwtY29uZmlybS13cmFwXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtb2RhYWwtY29uZmlybS1idG4gbW9kYWFsLW9rXCIgYXJpYS1sYWJlbD1cIkNvbmZpcm1cIj4nK3Qub3B0aW9ucy5jb25maXJtX2J1dHRvbl90ZXh0Kyc8L2J1dHRvbj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1vZGFhbC1jb25maXJtLWJ0biBtb2RhYWwtY2FuY2VsXCIgYXJpYS1sYWJlbD1cIkNhbmNlbFwiPicrdC5vcHRpb25zLmNvbmZpcm1fY2FuY2VsX2J1dHRvbl90ZXh0K1wiPC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+XCIsdC5idWlsZF9tb2RhbChhKX0sY3JlYXRlX2ltYWdlOmZ1bmN0aW9uKCl7dmFyIHQsbyxlPXRoaXMsaT1cIlwiO2lmKGUuJGVsZW0uaXMoXCJbZGF0YS1ncm91cF1cIil8fGUuJGVsZW0uaXMoXCJbcmVsXVwiKSl7dmFyIGw9ZS4kZWxlbS5pcyhcIltkYXRhLWdyb3VwXVwiKSxuPWw/ZS4kZWxlbS5hdHRyKFwiZGF0YS1ncm91cFwiKTplLiRlbGVtLmF0dHIoXCJyZWxcIikscz1hKGw/J1tkYXRhLWdyb3VwPVwiJytuKydcIl0nOidbcmVsPVwiJytuKydcIl0nKTtzLnJlbW92ZUF0dHIoXCJkYXRhLWdhbGxlcnktYWN0aXZlXCIsXCJpc19hY3RpdmVcIiksZS4kZWxlbS5hdHRyKFwiZGF0YS1nYWxsZXJ5LWFjdGl2ZVwiLFwiaXNfYWN0aXZlXCIpLG89cy5sZW5ndGgtMTt2YXIgZD1bXTtpPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWdhbGxlcnktaXRlbS13cmFwXCI+JyxzLmVhY2goZnVuY3Rpb24odCxvKXt2YXIgZT1cIlwiLGk9XCJcIixsPVwiXCIsbj0hMSxzPSExLHI9by5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1vZGFhbC1kZXNjXCIpLGM9by5nZXRBdHRyaWJ1dGUoXCJkYXRhLWdhbGxlcnktYWN0aXZlXCIpO2EobykuYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpP2U9YShvKS5hdHRyKFwiZGF0YS1tb2RhYWwtY29udGVudC1zb3VyY2VcIik6YShvKS5hdHRyKFwiaHJlZlwiKT9lPWEobykuYXR0cihcImhyZWZcIik6YShvKS5hdHRyKFwic3JjXCIpP2U9YShvKS5hdHRyKFwic3JjXCIpOihlPVwidHJpZ2dlciByZXF1aXJlcyBocmVmIG9yIGRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlIGF0dHJpYnV0ZVwiLHM9ITApLFwiXCIhPXImJm51bGwhPT1yJiZ2b2lkIDAhPT1yPyhpPXIsbD0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWxhYmVsXCI+PHNwYW4gY2xhc3M9XCJtb2RhYWwtYWNjZXNzaWJsZS1oaWRlXCI+SW1hZ2UgJysodCsxKStcIiAtIDwvc3Bhbj5cIityLnJlcGxhY2UoLzwvZyxcIiZsdDtcIikucmVwbGFjZSgvPi9nLFwiJmd0O1wiKStcIjwvZGl2PlwiKTpsPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWdhbGxlcnktbGFiZWxcIj48c3BhbiBjbGFzcz1cIm1vZGFhbC1hY2Nlc3NpYmxlLWhpZGVcIj5JbWFnZSAnKyh0KzEpK1wiPC9zcGFuPjwvZGl2PlwiLGMmJihuPSEwKTt2YXIgbT17dXJsOmUsYWx0OmkscmF3ZGVzYzpyLGRlc2M6bCxhY3RpdmU6bixzcmNfZXJyb3I6c307ZC5wdXNoKG0pfSk7Zm9yKHZhciByPTA7cjxkLmxlbmd0aDtyKyspe3ZhciBjPVwiXCIsbT1kW3JdLnJhd2Rlc2M/XCJJbWFnZTogXCIrZFtyXS5yYXdkZXNjOlwiSW1hZ2UgXCIrcitcIiBubyBkZXNjcmlwdGlvblwiO2Rbcl0uYWN0aXZlJiYoYz1cIiBcIitlLnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MpO3ZhciBwPWRbcl0uc3JjX2Vycm9yP2Rbcl0udXJsOic8aW1nIHNyYz1cIicrZFtyXS51cmwrJ1wiIGFsdD1cIiBcIiBzdHlsZT1cIndpZHRoOjEwMCVcIj4nO2krPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWdhbGxlcnktaXRlbSBnYWxsZXJ5LWl0ZW0tJytyK2MrJ1wiIGFyaWEtbGFiZWw9XCInK20rJ1wiPicrcCtkW3JdLmRlc2MrXCI8L2Rpdj5cIn1pKz1cIjwvZGl2PlwiLDEhPWUub3B0aW9ucy5vdXRlcl9jb250cm9scyYmKGkrPWUuc2NvcGUucHJldl9idG4rZS5zY29wZS5uZXh0X2J0bil9ZWxzZXt2YXIgdSxfPSExO2UuJGVsZW0uYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpP3U9ZS4kZWxlbS5hdHRyKFwiZGF0YS1tb2RhYWwtY29udGVudC1zb3VyY2VcIik6ZS4kZWxlbS5hdHRyKFwiaHJlZlwiKT91PWUuJGVsZW0uYXR0cihcImhyZWZcIik6ZS4kZWxlbS5hdHRyKFwic3JjXCIpP3U9ZS4kZWxlbS5hdHRyKFwic3JjXCIpOih1PVwidHJpZ2dlciByZXF1aXJlcyBocmVmIG9yIGRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlIGF0dHJpYnV0ZVwiLF89ITApO3ZhciB2PVwiXCIsZj1cIlwiLG09XCJcIjtlLiRlbGVtLmF0dHIoXCJkYXRhLW1vZGFhbC1kZXNjXCIpPyhtPWUuJGVsZW0uYXR0cihcImRhdGEtbW9kYWFsLWRlc2NcIiksdj1lLiRlbGVtLmF0dHIoXCJkYXRhLW1vZGFhbC1kZXNjXCIpLGY9JzxkaXYgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1sYWJlbFwiPjxzcGFuIGNsYXNzPVwibW9kYWFsLWFjY2Vzc2libGUtaGlkZVwiPkltYWdlIC0gPC9zcGFuPicrdi5yZXBsYWNlKC88L2csXCImbHQ7XCIpLnJlcGxhY2UoLz4vZyxcIiZndDtcIikrXCI8L2Rpdj5cIik6bT1cIkltYWdlIHdpdGggbm8gZGVzY3JpcHRpb25cIjt2YXIgcD1fP3U6JzxpbWcgc3JjPVwiJyt1KydcIiBhbHQ9XCIgXCIgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+JztpPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWdhbGxlcnktaXRlbSBpc19hY3RpdmVcIiBhcmlhLWxhYmVsPVwiJyttKydcIj4nK3ArZitcIjwvZGl2PlwifXQ9aSxlLmJ1aWxkX21vZGFsKHQpLGEoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19hY3RpdmVcIikuaXMoXCIuZ2FsbGVyeS1pdGVtLTBcIikmJmEoXCIubW9kYWFsLWdhbGxlcnktcHJldlwiKS5oaWRlKCksYShcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX2FjdGl2ZVwiKS5pcyhcIi5nYWxsZXJ5LWl0ZW0tXCIrbykmJmEoXCIubW9kYWFsLWdhbGxlcnktbmV4dFwiKS5oaWRlKCl9LGdhbGxlcnlfdXBkYXRlOmZ1bmN0aW9uKHQpe3ZhciBvPXRoaXMsZT1hKFwiI1wiK28uc2NvcGUuaWQpLGk9ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW1cIiksbD1pLmxlbmd0aC0xO2lmKDA9PWwpcmV0dXJuITE7dmFyIG49ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LXByZXZcIikscz1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktbmV4dFwiKSxkPTAscj0wLGM9ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uXCIrby5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzKSxtPVwibmV4dFwiPT10P2MubmV4dChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtXCIpOmMucHJldihcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtXCIpO3JldHVybiBvLm9wdGlvbnMuYmVmb3JlX2ltYWdlX2NoYW5nZS5jYWxsKG8sYyxtKSwoXCJwcmV2XCIhPXR8fCFlLmZpbmQoXCIuZ2FsbGVyeS1pdGVtLTBcIikuaGFzQ2xhc3MoXCJpc19hY3RpdmVcIikpJiYoKFwibmV4dFwiIT10fHwhZS5maW5kKFwiLmdhbGxlcnktaXRlbS1cIitsKS5oYXNDbGFzcyhcImlzX2FjdGl2ZVwiKSkmJnZvaWQgYy5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTowfSwyNTAsZnVuY3Rpb24oKXttLmFkZENsYXNzKFwiaXNfbmV4dFwiKS5jc3Moe3Bvc2l0aW9uOlwiYWJzb2x1dGVcIixkaXNwbGF5OlwiYmxvY2tcIixvcGFjaXR5OjB9KTt2YXIgdD1hKGRvY3VtZW50KS53aWR0aCgpLGk9dD4xMTQwPzI4MDo1MDtkPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX25leHRcIikud2lkdGgoKSxyPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX25leHRcIikuaGVpZ2h0KCk7dmFyIHA9ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfbmV4dCBpbWdcIikucHJvcChcIm5hdHVyYWxXaWR0aFwiKSx1PWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX25leHQgaW1nXCIpLnByb3AoXCJuYXR1cmFsSGVpZ2h0XCIpO3A+dC1pPyhkPXQtaSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0XCIpLmNzcyh7d2lkdGg6ZH0pLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX25leHQgaW1nXCIpLmNzcyh7d2lkdGg6ZH0pLHI9ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfbmV4dFwiKS5maW5kKFwiaW1nXCIpLmhlaWdodCgpKTooZD1wLHI9dSksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0td3JhcFwiKS5zdG9wKCkuYW5pbWF0ZSh7d2lkdGg6ZCxoZWlnaHQ6cn0sMjUwLGZ1bmN0aW9uKCl7Yy5yZW1vdmVDbGFzcyhvLnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MrXCIgXCIrby5vcHRpb25zLmdhbGxlcnlfYWN0aXZlX2NsYXNzKS5yZW1vdmVBdHRyKFwic3R5bGVcIiksYy5maW5kKFwiaW1nXCIpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKSxtLmFkZENsYXNzKG8ucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcytcIiBcIitvLm9wdGlvbnMuZ2FsbGVyeV9hY3RpdmVfY2xhc3MpLnJlbW92ZUNsYXNzKFwiaXNfbmV4dFwiKS5jc3MoXCJwb3NpdGlvblwiLFwiXCIpLG0uc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6MX0sMjUwLGZ1bmN0aW9uKCl7YSh0aGlzKS5yZW1vdmVBdHRyKFwic3R5bGVcIikuY3NzKHt3aWR0aDpcIjEwMCVcIn0pLGEodGhpcykuZmluZChcImltZ1wiKS5jc3MoXCJ3aWR0aFwiLFwiMTAwJVwiKSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS13cmFwXCIpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKSxvLm9wdGlvbnMuYWZ0ZXJfaW1hZ2VfY2hhbmdlLmNhbGwobyxtKX0pLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtXCIpLnJlbW92ZUF0dHIoXCJ0YWJpbmRleFwiKSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5cIitvLnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MpLmF0dHIoXCJ0YWJpbmRleFwiLFwiMFwiKS5mb2N1cygpLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLlwiK28ucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcykuaXMoXCIuZ2FsbGVyeS1pdGVtLTBcIik/bi5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTowfSwxNTAsZnVuY3Rpb24oKXthKHRoaXMpLmhpZGUoKX0pOm4uc3RvcCgpLmNzcyh7ZGlzcGxheTpcImJsb2NrXCIsb3BhY2l0eTpuLmNzcyhcIm9wYWNpdHlcIil9KS5hbmltYXRlKHtvcGFjaXR5OjF9LDE1MCksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uXCIrby5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzKS5pcyhcIi5nYWxsZXJ5LWl0ZW0tXCIrbCk/cy5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTowfSwxNTAsZnVuY3Rpb24oKXthKHRoaXMpLmhpZGUoKX0pOnMuc3RvcCgpLmNzcyh7ZGlzcGxheTpcImJsb2NrXCIsb3BhY2l0eTpuLmNzcyhcIm9wYWNpdHlcIil9KS5hbmltYXRlKHtvcGFjaXR5OjF9LDE1MCl9KX0pKX0sY3JlYXRlX3ZpZGVvOmZ1bmN0aW9uKGEpe3ZhciB0LG89dGhpczt0PSc8aWZyYW1lIHNyYz1cIicrYSsnXCIgY2xhc3M9XCJtb2RhYWwtdmlkZW8tZnJhbWVcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JyxvLmJ1aWxkX21vZGFsKCc8ZGl2IGNsYXNzPVwibW9kYWFsLXZpZGVvLWNvbnRhaW5lclwiPicrdCtcIjwvZGl2PlwiKX0sY3JlYXRlX2lmcmFtZTpmdW5jdGlvbihhKXt2YXIgdCxvPXRoaXM7dD1udWxsIT09by5vcHRpb25zLndpZHRofHx2b2lkIDAhPT1vLm9wdGlvbnMud2lkdGh8fG51bGwhPT1vLm9wdGlvbnMuaGVpZ2h0fHx2b2lkIDAhPT1vLm9wdGlvbnMuaGVpZ2h0Pyc8aWZyYW1lIHNyYz1cIicrYSsnXCIgY2xhc3M9XCJtb2RhYWwtaWZyYW1lLWVsZW1cIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JzonPGRpdiBjbGFzcz1cIm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiPlBsZWFzZSBzcGVjaWZ5IGEgd2lkdGggYW5kIGhlaWdodCBmb3IgeW91ciBpZnJhbWU8L2Rpdj4nLG8uYnVpbGRfbW9kYWwodCl9LG1vZGFhbF9vcGVuOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxvPWEoXCIjXCIrdC5zY29wZS5pZCksZT10Lm9wdGlvbnMuYW5pbWF0aW9uO1wibm9uZVwiPT09ZSYmKG8ucmVtb3ZlQ2xhc3MoXCJtb2RhYWwtc3RhcnRfbm9uZVwiKSx0Lm9wdGlvbnMuYWZ0ZXJfb3Blbi5jYWxsKHQsbykpLFwiZmFkZVwiPT09ZSYmby5yZW1vdmVDbGFzcyhcIm1vZGFhbC1zdGFydF9mYWRlXCIpLFwic2xpZGUtZG93blwiPT09ZSYmby5yZW1vdmVDbGFzcyhcIm1vZGFhbC1zdGFydF9zbGlkZV9kb3duXCIpO3ZhciBpPW87YShcIi5tb2RhYWwtd3JhcHBlciAqW3RhYmluZGV4PTBdXCIpLnJlbW92ZUF0dHIoXCJ0YWJpbmRleFwiKSxpPVwiaW1hZ2VcIj09dC5vcHRpb25zLnR5cGU/YShcIiNcIit0LnNjb3BlLmlkKS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uXCIrdC5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzKTpvLmZpbmQoXCIubW9kYWFsLWlmcmFtZS1lbGVtXCIpLmxlbmd0aD9vLmZpbmQoXCIubW9kYWFsLWlmcmFtZS1lbGVtXCIpOm8uZmluZChcIi5tb2RhYWwtdmlkZW8td3JhcFwiKS5sZW5ndGg/by5maW5kKFwiLm1vZGFhbC12aWRlby13cmFwXCIpOm8uZmluZChcIi5tb2RhYWwtZm9jdXNcIiksaS5hdHRyKFwidGFiaW5kZXhcIixcIjBcIikuZm9jdXMoKSxcIm5vbmVcIiE9PWUmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0Lm9wdGlvbnMuYWZ0ZXJfb3Blbi5jYWxsKHQsbyl9LHQub3B0aW9ucy5hZnRlcl9jYWxsYmFja19kZWxheSl9LG1vZGFhbF9jbG9zZTpmdW5jdGlvbigpe3ZhciB0PXRoaXMsbz1hKFwiI1wiK3Quc2NvcGUuaWQpO3Qub3B0aW9ucy5iZWZvcmVfY2xvc2UuY2FsbCh0LG8pLG51bGwhPT10LnhociYmKHQueGhyLmFib3J0KCksdC54aHI9bnVsbCksXCJub25lXCI9PT10Lm9wdGlvbnMuYW5pbWF0aW9uJiZvLmFkZENsYXNzKFwibW9kYWFsLXN0YXJ0X25vbmVcIiksXCJmYWRlXCI9PT10Lm9wdGlvbnMuYW5pbWF0aW9uJiZvLmFkZENsYXNzKFwibW9kYWFsLXN0YXJ0X2ZhZGVcIiksXCJzbGlkZS1kb3duXCI9PT10Lm9wdGlvbnMuYW5pbWF0aW9uJiZvLmFkZENsYXNzKFwibW9kYWFsLXN0YXJ0X3NsaWRlX2Rvd25cIiksc2V0VGltZW91dChmdW5jdGlvbigpe1wiaW5saW5lXCI9PXQub3B0aW9ucy50eXBlJiZhKFwiI1wiK3Quc2NvcGUuaWQrXCIgLm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiKS5jb250ZW50cygpLmRldGFjaCgpLmFwcGVuZFRvKHQuc2NvcGUuc291cmNlKSxvLnJlbW92ZSgpLHQub3B0aW9ucy5hZnRlcl9jbG9zZS5jYWxsKHQpLHQuc2NvcGUuaXNfb3Blbj0hMX0sdC5vcHRpb25zLmFmdGVyX2NhbGxiYWNrX2RlbGF5KSx0Lm1vZGFhbF9vdmVybGF5KFwiaGlkZVwiKSxudWxsIT10Lmxhc3RGb2N1cyYmdC5sYXN0Rm9jdXMuZm9jdXMoKX0sbW9kYWFsX292ZXJsYXk6ZnVuY3Rpb24odCl7dmFyIG89dGhpcztcInNob3dcIj09dD8oby5zY29wZS5pc19vcGVuPSEwLG8ub3B0aW9ucy5iYWNrZ3JvdW5kX3Njcm9sbHx8by5kb20uYWRkQ2xhc3MoXCJtb2RhYWwtbm9zY3JvbGxcIiksYShcIiNcIitvLnNjb3BlLmlkK1wiX292ZXJsYXlcIikubGVuZ3RoPDEmJm8uZG9tLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1vZGFhbC1vdmVybGF5XCIgaWQ9XCInK28uc2NvcGUuaWQrJ19vdmVybGF5XCI+PC9kaXY+JyksYShcIiNcIitvLnNjb3BlLmlkK1wiX292ZXJsYXlcIikuY3NzKFwiYmFja2dyb3VuZFwiLG8ub3B0aW9ucy5iYWNrZ3JvdW5kKS5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTpvLm9wdGlvbnMub3ZlcmxheV9vcGFjaXR5fSxvLm9wdGlvbnMuYW5pbWF0aW9uX3NwZWVkLGZ1bmN0aW9uKCl7by5tb2RhYWxfb3BlbigpfSkpOlwiaGlkZVwiPT10JiZhKFwiI1wiK28uc2NvcGUuaWQrXCJfb3ZlcmxheVwiKS5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTowfSxvLm9wdGlvbnMuYW5pbWF0aW9uX3NwZWVkLGZ1bmN0aW9uKCl7YSh0aGlzKS5yZW1vdmUoKSxvLmRvbS5yZW1vdmVDbGFzcyhcIm1vZGFhbC1ub3Njcm9sbFwiKX0pfSxpc190b3VjaDpmdW5jdGlvbigpe3JldHVyblwib250b3VjaHN0YXJ0XCJpbiB3aW5kb3d8fG5hdmlnYXRvci5tYXhUb3VjaFBvaW50c319LGU9W107YS5mbi5tb2RhYWw9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKXt2YXIgbD1hKHRoaXMpLmRhdGEoXCJtb2RhYWxcIik7aWYobCl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQpc3dpdGNoKHQpe2Nhc2VcIm9wZW5cIjpsLmNyZWF0ZV9tb2RhYWwobCk7YnJlYWs7Y2FzZVwiY2xvc2VcIjpsLm1vZGFhbF9jbG9zZSgpfX1lbHNle3ZhciBuPU9iamVjdC5jcmVhdGUobyk7bi5pbml0KHQsdGhpcyksYS5kYXRhKHRoaXMsXCJtb2RhYWxcIixuKSxlLnB1c2goe2VsZW1lbnQ6YSh0aGlzKS5hdHRyKFwiY2xhc3NcIiksb3B0aW9uczp0fSl9fSl9LGEuZm4ubW9kYWFsLm9wdGlvbnM9e3R5cGU6XCJpbmxpbmVcIixjb250ZW50X3NvdXJjZTpudWxsLGFuaW1hdGlvbjpcImZhZGVcIixhbmltYXRpb25fc3BlZWQ6MzAwLGFmdGVyX2NhbGxiYWNrX2RlbGF5OjM1MCxpc19sb2NrZWQ6ITEsaGlkZV9jbG9zZTohMSxiYWNrZ3JvdW5kOlwiIzAwMFwiLG92ZXJsYXlfb3BhY2l0eTpcIjAuOFwiLG92ZXJsYXlfY2xvc2U6ITAsYWNjZXNzaWJsZV90aXRsZTpcIkRpYWxvZyBXaW5kb3dcIixzdGFydF9vcGVuOiExLGZ1bGxzY3JlZW46ITEsY3VzdG9tX2NsYXNzOlwiXCIsYmFja2dyb3VuZF9zY3JvbGw6ITEsc2hvdWxkX29wZW46ITAsY2xvc2VfdGV4dDpcIkNsb3NlXCIsY2xvc2VfYXJpYV9sYWJlbDpcIkNsb3NlIChQcmVzcyBlc2NhcGUgdG8gY2xvc2UpXCIsd2lkdGg6bnVsbCxoZWlnaHQ6bnVsbCxiZWZvcmVfb3BlbjpmdW5jdGlvbigpe30sYWZ0ZXJfb3BlbjpmdW5jdGlvbigpe30sYmVmb3JlX2Nsb3NlOmZ1bmN0aW9uKCl7fSxhZnRlcl9jbG9zZTpmdW5jdGlvbigpe30sc291cmNlOmZ1bmN0aW9uKGEsdCl7cmV0dXJuIHR9LGNvbmZpcm1fYnV0dG9uX3RleHQ6XCJDb25maXJtXCIsY29uZmlybV9jYW5jZWxfYnV0dG9uX3RleHQ6XCJDYW5jZWxcIixjb25maXJtX3RpdGxlOlwiQ29uZmlybSBUaXRsZVwiLGNvbmZpcm1fY29udGVudDpcIjxwPlRoaXMgaXMgdGhlIGRlZmF1bHQgY29uZmlybSBkaWFsb2cgY29udGVudC4gUmVwbGFjZSBtZSB0aHJvdWdoIHRoZSBvcHRpb25zPC9wPlwiLGNvbmZpcm1fY2FsbGJhY2s6ZnVuY3Rpb24oKXt9LGNvbmZpcm1fY2FuY2VsX2NhbGxiYWNrOmZ1bmN0aW9uKCl7fSxnYWxsZXJ5X2FjdGl2ZV9jbGFzczpcImdhbGxlcnlfYWN0aXZlX2l0ZW1cIixvdXRlcl9jb250cm9sczohMSxiZWZvcmVfaW1hZ2VfY2hhbmdlOmZ1bmN0aW9uKGEsdCl7fSxhZnRlcl9pbWFnZV9jaGFuZ2U6ZnVuY3Rpb24oYSl7fSxsb2FkaW5nX2NvbnRlbnQ6JzxkaXYgY2xhc3M9XCJtb2RhYWwtbG9hZGluZy1zcGlubmVyXCI+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48L2Rpdj4nLGxvYWRpbmdfY2xhc3M6XCJpc19sb2FkaW5nXCIsYWpheF9lcnJvcl9jbGFzczpcIm1vZGFhbC1lcnJvclwiLGFqYXhfc3VjY2VzczpmdW5jdGlvbigpe30saW5zdGFncmFtX2lkOm51bGx9LGEoZnVuY3Rpb24oKXt2YXIgbz1hKFwiLm1vZGFhbFwiKTtvLmxlbmd0aCYmby5lYWNoKGZ1bmN0aW9uKCl7dChhKHRoaXMpKX0pO3ZhciBpPW5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG8pe28uZm9yRWFjaChmdW5jdGlvbihvKXtpZihvLmFkZGVkTm9kZXMmJm8uYWRkZWROb2Rlcy5sZW5ndGg+MCl7W10uc29tZS5jYWxsKG8uYWRkZWROb2RlcyxmdW5jdGlvbihvKXt2YXIgaT1hKG8pOyhpLmlzKFwiYVwiKXx8aS5pcyhcImJ1dHRvblwiKSkmJihpLmhhc0NsYXNzKFwibW9kYWFsXCIpP3QoaSk6ZS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2lmKHQuZWxlbWVudD09aS5hdHRyKFwiY2xhc3NcIikpcmV0dXJuIGEoaSkubW9kYWFsKHQub3B0aW9ucyksITF9KSl9KX19KX0pLGw9e3N1YnRyZWU6ITAsYXR0cmlidXRlczohMCxjaGlsZExpc3Q6ITAsY2hhcmFjdGVyRGF0YTohMH07c2V0VGltZW91dChmdW5jdGlvbigpe2kub2JzZXJ2ZShkb2N1bWVudC5ib2R5LGwpfSw1MDApfSl9KGpRdWVyeSx3aW5kb3csZG9jdW1lbnQpO1xuIiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdGRvY3VtZW50LmJvZHkuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbn0gKTtcbiJdfQ==
