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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9lZmZlY3QuanMiLCJzcmMvc2NyaXB0cy9pbmZpbml0ZXNsaWRldjIuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvbW9kYWFsL2pzL21vZGFhbC5taW4uanMiLCJzcmMvc2NyaXB0cy9wYWdlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsTUFBTSxDQUFFLFVBQVUsQ0FBQyxFQUFHO0VBQ3JCO0FBQ0Q7QUFDQTtFQUNDLENBQUMsQ0FBRSx5QkFBeUIsQ0FBRSxDQUFDLGFBQWEsQ0FBRTtJQUM3QyxXQUFXLEVBQUssTUFBTTtJQUN0QixPQUFPLEVBQVMsRUFBRTtJQUNsQixjQUFjLEVBQUUsSUFBSTtJQUNwQixPQUFPLEVBQVMsQ0FBQztJQUNqQixZQUFZLEVBQUk7RUFDakIsQ0FBQyxDQUFFO0VBQ0gsQ0FBQyxDQUFFLDBCQUEwQixDQUFFLENBQUMsYUFBYSxDQUFFO0lBQzlDLFdBQVcsRUFBSyxPQUFPO0lBQ3ZCLE9BQU8sRUFBUyxFQUFFO0lBQ2xCLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLE9BQU8sRUFBUyxDQUFDO0lBQ2pCLFlBQVksRUFBSTtFQUNqQixDQUFDLENBQUU7O0VBRUg7QUFDRDtBQUNBO0VBQ0MsQ0FBQyxDQUFFLFVBQVUsQ0FBRSxDQUFDLE1BQU0sQ0FBRztJQUN4QixJQUFJLEVBQUUsT0FBTztJQUNiLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFVBQVUsRUFBRTtFQUNiLENBQUMsQ0FBRTtBQUNKLENBQUMsQ0FBRTs7Ozs7QUM1Qkg7QUFDQTs7QUFHQSxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVc7RUFDMUIsUUFBUSxDQUFDLGdCQUFnQixDQUFFLEtBQUssQ0FBRSxDQUFDLE9BQU8sQ0FBRSxVQUFVLEVBQUUsRUFB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LENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxlQUFlLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsb0JBQW9CLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLE1BQU0sS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUMsTUFBTSxLQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxlQUFlLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsYUFBYSxHQUFDLE9BQU8sS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUMsTUFBTSxLQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxNQUFNLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxpQkFBaUIsR0FBQyxNQUFNLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxtQkFBbUIsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQywwQkFBMEIsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsZUFBZSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLG9CQUFvQixHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsZ0JBQWdCLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztFQUFBO0VBQUMsSUFBSSxDQUFDLEdBQUM7TUFBQyxJQUFJLEVBQUMsY0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSTtRQUFDLElBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUM7VUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1VBQUMsRUFBRSxFQUFDLFNBQVMsR0FBRSxJQUFJLElBQUksR0FBRSxPQUFPLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7VUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxlQUFlLEdBQUM7VUFBQyxZQUFZLEVBQUM7UUFBVyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUUsU0FBUyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQywyRUFBMkUsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBQyxrQkFBa0IsRUFBQyxNQUFNLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUMsVUFBUyxDQUFDLEVBQUM7VUFBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLEdBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUMsT0FBTztRQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFDLDhGQUE4RixHQUFDLENBQUMsR0FBQyx3SEFBd0gsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBQyw4RkFBOEYsR0FBQyxDQUFDLEdBQUMsaUhBQWlILEVBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7TUFBQSxDQUFDO01BQUMsYUFBYSxFQUFDLHVCQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7UUFBQyxJQUFJLENBQUM7VUFBQyxDQUFDLEdBQUMsSUFBSTtRQUFDLElBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFHLFVBQVUsSUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFFLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBQztVQUFDLFFBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7WUFBRSxLQUFJLFFBQVE7Y0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFO2NBQUM7WUFBTSxLQUFJLE1BQU07Y0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2NBQUM7WUFBTSxLQUFJLFNBQVM7Y0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsY0FBYyxFQUFFO2NBQUM7WUFBTSxLQUFJLE9BQU87Y0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFO2NBQUM7WUFBTSxLQUFJLFFBQVE7Y0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2NBQUM7WUFBTSxLQUFJLE9BQU87Y0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2NBQUM7WUFBTSxLQUFJLFdBQVc7Y0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUU7VUFBQTtVQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUU7UUFBQTtNQUFDLENBQUM7TUFBQyxZQUFZLEVBQUMsd0JBQVU7UUFBQyxJQUFJLENBQUMsR0FBQyxJQUFJO1FBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBQyxVQUFTLENBQUMsRUFBQztVQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPO1lBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNO1VBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFBQSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUMsVUFBUyxDQUFDLEVBQUM7VUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTTtVQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBRSxFQUFFLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsa0NBQWtDLENBQUMsSUFBRSxLQUFLLENBQUMsQ0FBQyxZQUFZLEVBQUUsR0FBQyxPQUFPLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUUsRUFBRSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBQyxNQUFLLEVBQUUsSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBRSxLQUFLLENBQUM7UUFBQSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUMsVUFBUyxDQUFDLEVBQUM7VUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztVQUFDLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsWUFBWSxFQUFFO1VBQUMsSUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxFQUFFO1VBQUMsSUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLHlCQUF5QixDQUFDLEVBQUM7WUFBQyxJQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUM7WUFBTyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsSUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE1BQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7VUFBQTtRQUFDLENBQUMsQ0FBQztNQUFBLENBQUM7TUFBQyxXQUFXLEVBQUMscUJBQVMsQ0FBQyxFQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSTtVQUFDLENBQUMsR0FBQyxFQUFFO1FBQUMsV0FBVyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFHLENBQUMsR0FBQyxtQkFBbUIsQ0FBQztRQUFDLElBQUksQ0FBQztVQUFDLENBQUMsR0FBQyxPQUFPLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUMsbUJBQW1CLEdBQUMsZ0JBQWdCO1FBQUMsUUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVM7VUFBRSxLQUFJLE1BQU07WUFBQyxDQUFDLEdBQUMsb0JBQW9CO1lBQUM7VUFBTSxLQUFJLFlBQVk7WUFBQyxDQUFDLEdBQUMseUJBQXlCO1lBQUM7VUFBTTtZQUFRLENBQUMsR0FBQyxvQkFBb0I7UUFBQTtRQUFDLElBQUksQ0FBQyxHQUFDLEVBQUU7UUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBRyxDQUFDLEdBQUMsb0JBQW9CLENBQUMsRUFBQyxFQUFFLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRTtRQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFFLFFBQVEsSUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFFLFFBQVEsSUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxvQkFBb0IsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsb0JBQW9CLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUUsUUFBUSxJQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLG9CQUFvQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBRSxRQUFRLElBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBRyxDQUFDLEdBQUMsaUJBQWlCLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsb0JBQW9CLENBQUMsRUFBQyxDQUFDLE9BQU8sSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBRSxPQUFPLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUUsV0FBVyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxNQUFJLENBQUMsR0FBQyxFQUFFLENBQUM7UUFBQyxJQUFJLENB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QUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxFQUFDO1VBQUMsSUFBSSxDQUFDLEdBQUMsZ0RBQWdELEdBQUMsQ0FBQyxHQUFDLEdBQUc7VUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQUMsR0FBRyxFQUFDLENBQUM7WUFBQyxRQUFRLEVBQUMsT0FBTztZQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7WUFBQyxPQUFPLEVBQUMsaUJBQVMsQ0FBQyxFQUFDO2NBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsOERBQThELEdBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxRQUFRLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUMsTUFBTSxDQUFDO2NBQUMsSUFBSSxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLDRCQUE0QjtjQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFFLFVBQVUsQ0FBQyxZQUFVO2dCQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtjQUFBLENBQUMsRUFBQyxHQUFHLENBQUM7WUFBQSxDQUFDO1lBQUMsS0FBSyxFQUFDLGlCQUFVO2NBQUMsQ0FBQyxHQUFDLENBQUM7Y0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLDRCQUE0QixDQUFDO2NBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxD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QyxNQUFNLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFFLENBQUMsR0FBQywrREFBK0QsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLElBQUUsQ0FBQyxJQUFFLElBQUksS0FBRyxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLCtFQUErRSxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsR0FBQyxRQUFRLElBQUUsQ0FBQyxHQUFDLCtFQUErRSxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxlQUFlLEVBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFDO2NBQUMsR0FBRyxFQUFDLENBQUM7Y0FBQyxHQUFHLEVBQUMsQ0FBQztjQUFDLE9BQU8sRUFBQyxDQUFDO2NBQUMsSUFBSSxFQUFDLENBQUM7Y0FBQyxNQUFNLEVBQUMsQ0FBQztjQUFDLFNBQVMsRUFBQztZQUFDLENBQUM7WUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztVQUFBLENBQUMsQ0FBQztVQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRTtjQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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QUFDLElBQUksQ0FBQyxHQUFDLElBQUk7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQztRQUFDLElBQUcsQ0FBQyxJQUFFLENBQUMsRUFBQyxPQUFNLENBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztVQUFDLENBQUMsR0FBQyxNQUFNLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsTUFBTSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxNQUFNLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO1VBQUMsT0FBTyxFQUFDO1FBQUMsQ0FBQyxFQUFDLEdBQUcsRUFB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QUFDLE9BQU8sRUFBQztZQUFDLENBQUMsRUFBQyxHQUFHLENBQUM7VUFBQSxDQUFDLENBQUM7UUFBQSxDQUFDLENBQUU7TUFBQSxDQUFDO01BQUMsWUFBWSxFQUFDLHNCQUFTLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQztVQUFDLENBQUMsR0FBQyxJQUFJO1FBQUMsQ0FBQyxHQUFDLGVBQWUsR0FBQyxDQUFDLEdBQUMsd0VBQXdFLEVBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxzQ0FBc0MsR0FBQyxDQUFDLEdBQUMsUUFBUSxDQUFDO01BQUEsQ0FBQztNQUFDLGFBQWEsRUFBQyx1QkFBUyxDQUFDLEVBQUM7UUFBQyxJQUFJLENBQUM7VUFBQyxDQUFDLEdBQUMsSUFBSTtRQUFDLENBQUMsR0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUUsSUFBSSxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLGVBQWUsR0FBQyxDQUFDLEdBQUMsd0VBQXdFLEdBQUMsK0ZBQStGLEVBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7TUFBQSxDQUFDO01BQUMsV0FBVyxFQUFDLHVCQUFVO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSTtVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUztRQUFDLE1BQU0sS0FBRyxDQUFDLEtBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FB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TSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixJQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGtDQUFrQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLGtCQUFrQixDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO1VBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFBZSxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUMsWUFBVTtVQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7UUFBQSxDQUFDLENBQUMsSUFBRSxNQUFNLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO1VBQUMsT0FBTyxFQUFDO1FBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFDLFlBQVU7VUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUM7UUFBQSxDQUFDLENBQUM7TUFBQSxDQUFDO01BQUMsUUFBUSxFQUFDLG9CQUFVO1FBQUMsT0FBTSxjQUFjLElBQUcsTUFBTSxJQUFFLFNBQVMsQ0FBQyxjQUFjO01BQUE7SUFBQyxDQUFDO0lBQUMsQ0FBQyxHQUFDLEVBQUU7RUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQztJQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUMsRUFBQztNQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO01BQUMsSUFBRyxDQUFDLEVBQUM7UUFBQyxJQUFHLFFBQVEsSUFBRSxPQUFPLENBQUMsRUFBQyxRQUFPLENBQUM7VUFBRSxLQUFJLE1BQU07WUFBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUFDO1VBQU0sS0FBSSxPQUFPO1lBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRTtRQUFBO01BQUMsQ0FBQyxNQUFJO1FBQUMsSUFBSSxDQUFDLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztVQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztVQUFDLE9BQU8sRUFBQztRQUFDLENBQUMsQ0FBQztNQUFBO0lBQUMsQ0FBQyxDQUFDO0VBQUEsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBQztJQUFDLElBQUksRUFBQyxRQUFRO0lBQUMsY0FBYyxFQUFDLElBQUk7SUFBQyxTQUFTLEVBQUMsTUFBTTtJQUFDLGVBQWUsRUFBQyxHQUFHO0lBQUMsb0JBQW9CLEVBQUMsR0FBRztJQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQUMsVUFBVSxFQUFDLE1BQU07SUFBQyxlQUFlLEVBQUMsS0FBSztJQUFDLGFBQWEsRUFBQyxDQUFDLENBQUM7SUFBQyxnQkFBZ0IsRUFBQyxlQUFlO0lBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFBQyxZQUFZLEVBQUMsRUFBRTtJQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQztJQUFDLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFBQyxVQUFVLEVBQUMsT0FBTztJQUFDLGdCQUFnQixFQUFDLCtCQUErQjtJQUFDLEtBQUssRUFBQyxJQUFJO0lBQUMsTUFBTSxFQUFDLElBQUk7SUFBQyxXQUFXLEVBQUMsdUJBQVUsQ0FBQyxDQUFDO0lBQUMsVUFBVSxFQUFDLHNCQUFVLENBQUMsQ0FBQztJQUFDLFlBQVksRUFBQyx3QkFBVSxDQUFDLENBQUM7SUFBQyxXQUFXLEVBQUMsdUJBQVUsQ0FBQyxDQUFDO0lBQUMsTUFBTSxFQUFDLGdCQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7TUFBQyxPQUFPLENBQUM7SUFBQSxDQUFDO0lBQUMsbUJBQW1CLEVBQUMsU0FBUztJQUFDLDBCQUEwQixFQUFDLFFBQVE7SUFBQyxhQUFhLEVBQUMsZUFBZTtJQUFDLGVBQWUsRUFBQyxtRkFBbUY7SUFBQyxnQkFBZ0IsRUFBQyw0QkFBVSxDQUFDLENBQUM7SUFBQyx1QkFBdUIsRUFBQyxtQ0FBVSxDQUFDLENBQUM7SUFBQyxvQkFBb0IsRUFBQyxxQkFBcUI7SUFBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO0lBQUMsbUJBQW1CLEVBQUMsNkJBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7SUFBQyxrQkFBa0IsRUFBQyw0QkFBUyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQUMsZUFBZSxFQUFDLDROQUE0TjtJQUFDLGFBQWEsRUFBQyxZQUFZO0lBQUMsZ0JBQWdCLEVBQUMsY0FBYztJQUFDLFlBQVksRUFBQyx3QkFBVSxDQUFDLENBQUM7SUFBQyxZQUFZLEVBQUM7RUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLFlBQVU7SUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVU7TUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDO0lBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFTLENBQUMsRUFBQztRQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxDQUFDLEVBQUM7VUFBQyxJQUFHLENBQUMsQ0FBQyxVQUFVLElBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDO1lBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBQyxVQUFTLENBQUMsRUFBQztjQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsQ0FBQyxFQUFDO2dCQUFDLElBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2NBQUEsQ0FBQyxDQUFDLENBQUM7WUFBQSxDQUFDLENBQUM7VUFBQTtRQUFDLENBQUMsQ0FBQztNQUFBLENBQUMsQ0FBQztNQUFDLENBQUMsR0FBQztRQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUFDLGFBQWEsRUFBQyxDQUFDO01BQUMsQ0FBQztJQUFDLFVBQVUsQ0FBQyxZQUFVO01BQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUFBLENBQUMsRUFBQyxHQUFHLENBQUM7RUFBQSxDQUFDLENBQUM7QUFBQSxDQUFDLENBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUM7Ozs7O0FDTHJ1bkIsTUFBTSxDQUFDLGdCQUFnQixDQUFFLE1BQU0sRUFBRSxZQUFXO0VBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTO0FBQzNDLENBQUMsQ0FBRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImpRdWVyeSggZnVuY3Rpb24oICQgKSB7XG5cdC8qXG5cdCAqIGluZmluaXRlc2xpZGVcblx0ICovXG5cdCQoICcuanMtaW5maW5pdGVzbGlkZS0tbGVmdCcgKS5pbmZpbml0ZXNsaWRlKCB7XG5cdFx0J2RpcmVjdGlvbicgICA6ICdsZWZ0Jyxcblx0XHQnc3BlZWQnICAgICAgIDogMjAsXG5cdFx0J3BhdXNlb25ob3Zlcic6IHRydWUsXG5cdFx0J2Nsb25lJyAgICAgICA6IDIsXG5cdFx0J3Jlc3BvbnNpdmUnICA6IHRydWUsXG5cdH0gKTtcblx0JCggJy5qcy1pbmZpbml0ZXNsaWRlLS1yaWdodCcgKS5pbmZpbml0ZXNsaWRlKCB7XG5cdFx0J2RpcmVjdGlvbicgICA6ICdyaWdodCcsXG5cdFx0J3NwZWVkJyAgICAgICA6IDIwLFxuXHRcdCdwYXVzZW9uaG92ZXInOiB0cnVlLFxuXHRcdCdjbG9uZScgICAgICAgOiAyLFxuXHRcdCdyZXNwb25zaXZlJyAgOiB0cnVlLFxuXHR9ICk7XG5cblx0Lypcblx0ICogTW9kYWFsXG5cdCAqL1xuXHQkKCAnLmdhbGxlcnknICkubW9kYWFsICgge1xuXHRcdHR5cGU6ICdpbWFnZScsXG5cdFx0YmFja2dyb3VuZDogJyNmZmYnLFxuXHRcdG92ZXJsYXlfb3BhY2l0eTogJzAuNScsXG5cdFx0ZnVsbHNjcmVlbjogdHJ1ZVxuXHR9ICk7XG59ICk7IiwiLy8gY29uc3QgbXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLm12JyApO1xuLy8gbXYuY2xhc3NMaXN0LmFkZCggJ2lzLWZhZGUtaW4nICk7XG5cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLm12JyApLmZvckVhY2goIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5jbGFzc0xpc3QuYWRkKCAnaXMtZmFkZS1pbicgKTtcblx0fSApO1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLnAtbG9nby0taGVhZGVyJyApLmZvckVhY2goIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5jbGFzc0xpc3QuYWRkKCAnaXMtZmFkZS1pbicgKTtcblx0fSApO1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnYm9keScgKS5jbGFzc0xpc3QuYWRkKCAnaXMtZmFkZS1pbicgKTtcblx0c2Nyb2xsRWZmZWN0KCk7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG5cdFx0c2Nyb2xsRWZmZWN0KCk7XG5cdH0gKTtcbn1cblxuZnVuY3Rpb24gc2Nyb2xsRWZmZWN0KCkge1xuXHRjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuaXMtZmFkZScgKTtcblxuXHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRsZXQgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuXHRcdGxldCBwb3NpdGlvbkZyb21Ub3AgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcblx0XHRsZXQgc2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cdFx0bGV0IHdpbmRvd0ggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cblx0XHRpZiAoIHNjcm9sbCA+IHBvc2l0aW9uRnJvbVRvcCAtIHdpbmRvd0ggKSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoICdpcy1zY3JvbGwnICk7XG5cdFx0fVxuXHR9XG59XG4iLCIvKlxuaW5maW5pdGVzbGlkZS5qcyB2MlxudmVyc2lvbjogMi4wLjFcbkF1dGhvcjogVC5Nb3JpbW90b1xuXG5Db3B5cmlnaHQgMjAxNywgVC5Nb3JpbW90b1xuKiBGcmVlIHRvIHVzZSBhbmQgYWJ1c2UgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuKiAvL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblxuLy9naXRodWIuY29tL3dvb2Ryb290cy9pbmZpbml0ZXNsaWRldjJcbiovXG5cbihmdW5jdGlvbigkKXtcblx0JCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdCAgICB3aW5kb3cubG9hZGVkID0gdHJ1ZTtcblx0fSk7XG5cdCQoZnVuY3Rpb24oKXtcblx0XHQkLmZuLmluZmluaXRlc2xpZGUgPSBmdW5jdGlvbihvcHRpb25zKXtcblx0XHRcdC8vb3B0aW9uXG5cdFx0XHR2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG5cdFx0XHRcdCdzcGVlZCc6IDEwMCwgLy/pgJ/jgZXjgIDljZjkvY3jga9weC/np5LjgafjgZnjgIJcblx0XHRcdFx0J2RpcmVjdGlvbic6ICdsZWZ0JywgLy91cC9kb3duL2xlZnQvcmlnaHTjgYvjgonpgbjmip5cblx0XHRcdFx0J3BhdXNlb25ob3Zlcic6IHRydWUsIC8v44Oe44Km44K544Kq44O844OQ44O844Gn44K544OI44OD44OXXG5cdFx0XHRcdCdyZXNwb25zaXZlJzogZmFsc2UsIC8v5a2Q6KaB57Sg44Gu5bmF44KSJeOBp+aMh+WumuOBl+OBpuOBhOOCi+OBqOOBjVxuXHRcdFx0XHQnY2xvbmUnOiAxXG5cdFx0XHR9LG9wdGlvbnMpO1xuXG5cdFx0XHR2YXIgc2V0Q3NzID0gZnVuY3Rpb24ob2JqLGRpcmVjdGlvbil7XG5cdFx0XHRcdCQob2JqKS53cmFwKCc8ZGl2IGNsYXNzPVwiaW5maW5pdGVzbGlkZV93cmFwXCI+PC9kaXY+JykucGFyZW50KCkuY3NzKHtcblx0XHRcdFx0XHRvdmVyZmxvdzogJ2hpZGRlbidcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICd1cCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0dmFyIGQgPSAnY29sdW1uJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgZCA9ICdyb3cnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JChvYmopLmNzcyh7XG5cdFx0XHRcdFx0ZGlzcGxheTogJ2ZsZXgnLFxuXHRcdFx0XHRcdGZsZXhXcmFwOiAnbm93cmFwJyxcblx0XHRcdFx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcblx0XHRcdFx0XHQnLW1zLWZsZXgtYWxpZ24nOiAnY2VudGVyJyxcblx0XHRcdFx0XHRmbGV4RGlyZWN0aW9uOiBkXG5cdFx0XHRcdH0pLmNoaWxkcmVuKCkuY3NzKHtcblx0XHRcdFx0XHRcdGZsZXg6ICdub25lJyxcblx0XHRcdFx0XHRcdGRpc3BsYXk6ICdibG9jaydcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHNldENsb25lID0gZnVuY3Rpb24ob2JqLGNsb25lKXtcblx0XHRcdFx0dmFyICRjbG9uZSA9ICQob2JqKS5jaGlsZHJlbigpLmNsb25lKHRydWUpLmFkZENsYXNzKCdpbmZpbml0ZXNsaWRlX2Nsb25lJyk7XG5cdFx0XHRcdHZhciBpID0gMTtcblx0XHRcdFx0d2hpbGUoaSA8PSBjbG9uZSl7XG5cdFx0XHRcdFx0JGNsb25lLmNsb25lKHRydWUpLmFwcGVuZFRvKCQob2JqKSk7XG5cdFx0XHRcdFx0aSsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciBnZXRXaWR0aCA9IGZ1bmN0aW9uKG9iail7XG5cdFx0XHRcdHZhciB3ID0gMDtcblx0XHRcdFx0JChvYmopLmNoaWxkcmVuKCc6bm90KC5pbmZpbml0ZXNsaWRlX2Nsb25lKScpLmVhY2goZnVuY3Rpb24oa2V5LHZhbHVlKXtcblx0XHRcdFx0XHR3ID0gdyArICQodGhpcykub3V0ZXJXaWR0aCh0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiB3O1xuXHRcdFx0fVxuXHRcdFx0dmFyIGdldEhlaWdodCA9IGZ1bmN0aW9uKG9iail7XG5cdFx0XHRcdHZhciBoID0gMDtcblx0XHRcdFx0JChvYmopLmNoaWxkcmVuKCc6bm90KC5pbmZpbml0ZXNsaWRlX2Nsb25lKScpLmVhY2goZnVuY3Rpb24oa2V5LHZhbHVlKXtcblx0XHRcdFx0XHRoID0gaCArICQodGhpcykub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gaDtcblx0XHRcdH1cblxuXG5cdFx0XHR2YXIgZ2V0U3BlZWQgPSBmdW5jdGlvbihsLHMpe1xuXHRcdFx0XHRyZXR1cm4gbCAvIHM7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZ2V0TnVtID0gZnVuY3Rpb24ob2JqLGRpcmVjdGlvbil7XG5cdFx0XHRcdGlmKGRpcmVjdGlvbiA9PSAndXAnIHx8IGRpcmVjdGlvbiA9PSAnZG93bicpe1xuXHRcdFx0XHRcdHZhciBudW0gPSBnZXRIZWlnaHQob2JqKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgbnVtID0gZ2V0V2lkdGgob2JqKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbnVtO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24obnVtLGRpcmVjdGlvbil7XG5cdFx0XHRcdGlmKGRpcmVjdGlvbiA9PSAndXAnIHx8IGRpcmVjdGlvbiA9PSAnZG93bicpe1xuXHRcdFx0XHRcdHZhciBpID0gJzAsLScgKyBudW0gKyAncHgsMCc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGkgPSAnLScgKyBudW0gKyAncHgsMCwwJztcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHNldEFuaW0gPSBmdW5jdGlvbihvYmosaWQsZGlyZWN0aW9uLHNwZWVkKXtcblx0XHRcdFx0dmFyIG51bSA9IGdldE51bShvYmosZGlyZWN0aW9uKTtcblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICd1cCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0JChvYmopLnBhcmVudCgnLmluZmluaXRlc2xpZGVfd3JhcCcpLmNzcyh7XG5cdFx0XHRcdFx0XHRoZWlnaHQ6IG51bSArICdweCdcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgaSA9IGdldFRyYW5zbGF0ZShudW0sZGlyZWN0aW9uKTtcblxuXHRcdFx0XHQkKG9iaikuYXR0cignZGF0YS1zdHlsZScsJ2luZmluaXRlc2xpZGUnICsgaWQpO1xuXG5cdFx0XHRcdHZhciBjc3MgPSAnQGtleWZyYW1lcyBpbmZpbml0ZXNsaWRlJyArIGlkICsgJ3snICtcblx0XHRcdFx0XHRcdFx0XHQnZnJvbSB7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTt9JyArXG5cdFx0XHRcdFx0XHRcdFx0J3RvIHt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoJyArIGkgKyAnKTt9JyArXG5cdFx0XHRcdFx0XHRcdCd9Jztcblx0XHRcdFx0JCgnPHN0eWxlIC8+JykuYXR0cignaWQnLCdpbmZpbml0ZXNsaWRlJyArIGlkICsgJ19zdHlsZScpXG5cdFx0XHRcdC5odG1sKGNzcylcblx0XHRcdFx0LmFwcGVuZFRvKCdoZWFkJyk7XG5cblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICdyaWdodCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0dmFyIHJldmVyc2UgPSAnIHJldmVyc2UnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciByZXZlcnNlID0gJyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKG9iaikuY3NzKHtcblx0XHRcdFx0XHRhbmltYXRpb246ICdpbmZpbml0ZXNsaWRlJyArIGlkICsgJyAnICsgZ2V0U3BlZWQobnVtLHNwZWVkKSArICdzIGxpbmVhciAwcyBpbmZpbml0ZScgKyByZXZlcnNlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHNldFN0b3AgPSBmdW5jdGlvbihvYmope1xuXHRcdFx0XHQkKG9iaikub24oJ21vdXNlZW50ZXInLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1xuXHRcdFx0XHRcdFx0YW5pbWF0aW9uUGxheVN0YXRlOiAncGF1c2VkJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KS5vbignbW91c2VsZWF2ZScsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XG5cdFx0XHRcdFx0XHRhbmltYXRpb25QbGF5U3RhdGU6ICdydW5uaW5nJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHNldFJlc3BvbnNpdmUgPSBmdW5jdGlvbihvYmosZGlyZWN0aW9uKXtcblx0XHRcdFx0XHR2YXIgbnVtID0gZ2V0TnVtKG9iaixkaXJlY3Rpb24pO1xuXHRcdFx0XHRcdHZhciBpID0gZ2V0VHJhbnNsYXRlKG51bSxkaXJlY3Rpb24pO1xuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHR9O1xuXG5cblxuXG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGtleSx2YWx1ZSl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBudW0gPSBEYXRlLm5vdygpICsgTWF0aC5mbG9vcigxMDAwMCpNYXRoLnJhbmRvbSgpKS50b1N0cmluZygxNik7XG5cdFx0XHRcdGlmKHNldHRpbmdzLnBhdXNlb25ob3ZlciA9PSB0cnVlKXtcblx0XHRcdFx0XHRzZXRTdG9wKCR0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgX29ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0c2V0Q3NzKCR0aGlzLHNldHRpbmdzLmRpcmVjdGlvbik7XG5cdFx0XHRcdFx0c2V0Q2xvbmUoJHRoaXMsc2V0dGluZ3MuY2xvbmUpO1xuXHRcdFx0XHRcdHNldEFuaW0oJHRoaXMsbnVtLHNldHRpbmdzLmRpcmVjdGlvbixzZXR0aW5ncy5zcGVlZCk7XG5cblx0XHRcdFx0XHRpZihzZXR0aW5ncy5yZXNwb25zaXZlKXtcblx0XHRcdFx0XHRcdCQod2luZG93KS5vbigncmVzaXplJyxmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHR2YXIgaSA9IHNldFJlc3BvbnNpdmUoJHRoaXMsc2V0dGluZ3MuZGlyZWN0aW9uKTtcblx0XHRcdFx0XHRcdFx0dmFyIHN0eWxlaWQgPSAkdGhpcy5hdHRyKCdkYXRhLXN0eWxlJyk7XG5cdFx0XHRcdFx0XHRcdHZhciBzdHlsZWh0bWwgPSAkKCcjJyArIHN0eWxlaWQgKyAnX3N0eWxlJykuaHRtbCgpO1xuXG5cdFx0XHRcdFx0XHRcdHZhciBzdHlsZWh0bWxfbmV3ID0gc3R5bGVodG1sLnJlcGxhY2UoL3RvIHt0cmFuc2Zvcm06dHJhbnNsYXRlM2RcXCgoLio/KVxcKS8sJ3RvIHt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoJyArIGkgKyAnKScpO1xuXHRcdFx0XHRcdFx0XHQkKCcjJyArIHN0eWxlaWQgKyAnX3N0eWxlJykuaHRtbChzdHlsZWh0bWxfbmV3KTtcblxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICh3aW5kb3cubG9hZGVkKSB7XG5cdFx0XHRcdFx0X29ubG9hZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQod2luZG93KS5vbignbG9hZCcsIF9vbmxvYWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdH1cblx0fSk7XG59KShqUXVlcnkpO1xuIiwialF1ZXJ5KCBmdW5jdGlvbiggJCApIHtcbiAgICBjb25zdCBwYWdlbG9hZCA9IHJlcXVpcmUoICcuL3BhZ2Vsb2FkLmpzJyApO1xuICAgIGNvbnN0IGVmZmVjdCA9IHJlcXVpcmUoICcuL2VmZmVjdC5qcycgKTtcbiAgICBjb25zdCBzbGlkZSA9IHJlcXVpcmUoICcuL2luZmluaXRlc2xpZGV2Mi5qcycgKTtcbiAgICBjb25zdCBtb2RhYWxtaW5qcyA9IHJlcXVpcmUoICcuL21vZGFhbC9qcy9tb2RhYWwubWluLmpzJyApO1xuICAgIGNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoICcuL2NvbmZpZy5qcycgKTtcblxuXHQvLyDjg4/jg7Pjg5Djg7zjgqzjg7zjg5zjgr/jg7Pjga7jgq/jg6rjg4Pjgq/lh6bnkIZcbiAgICAkKCcucC1oZWFkZXJfX2J1dHRvbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignc3BhbicpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cdFx0JCgnI21lbnUtaGVhZGVyLW1lbnUnKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIH0pO1xuXG4gICAgLy8g6Kaq44Oh44OL44Ol44O844Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignYScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5zdWItbWVudScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQoJyNtZW51LWhlYWRlci1tZW51JykudG9nZ2xlQ2xhc3MoJ2lzLWxvbmcnKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIOimquODoeODi+ODpeODvOOBruWkluWBtOOCkuOCr+ODquODg+OCr+OBl+OBn+OBqOOBjeOAgeOCr+ODqeOCueWQjeOCkuWJiumZpFxuICAgICAgICBpZighJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmNoaWxkcmVuKCdhJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJy5zdWItbWVudScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAkKCcjbWVudS1oZWFkZXItbWVudScpLnJlbW92ZUNsYXNzKCdpcy1sb25nJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOeUu+mdouOBjOODquOCteOCpOOCuuOBleOCjOOBn+OBqOOBjeOAgeWFqOOBpuOBruOCr+ODqeOCueWQjeOCkuWJiumZpFxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnLnAtaGVhZGVyX19idXR0b24nKS5jaGlsZHJlbignc3BhbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG5cdFx0JCgnI21lbnUtaGVhZGVyLW1lbnUnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmNoaWxkcmVuKCdhJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbignLnN1Yi1tZW51JykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnI21lbnUtaGVhZGVyLW1lbnUnKS5yZW1vdmVDbGFzcygnaXMtbG9uZycpO1xuICAgIH0pO1xuXG4gICAgLy8gR28gdG8gVG9w44Oc44K/44OzIC8g6IOM5pmv44OR44Op44Op44OD44Kv44K55Yem55CGXG4gICAgdmFyIHBhZ2V0b3AgPSAkKCcucC1nby10by10b3AnKTtcbiAgICBwYWdldG9wLmhpZGUoKTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNjcm9sbGVkID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgYmcxID0gJCgnLmMtYmctLXBhcmFsbGF4MScpO1xuICAgICAgICB2YXIgYmcyID0gJCgnLmMtYmctLXBhcmFsbGF4MicpO1xuICAgICAgICB2YXIgd2VpZ2h0MSA9IDAuNTtcbiAgICAgICAgdmFyIHdlaWdodDIgPSAwLjI7XG4gICAgICAgIHZhciB3aW5kb3dTaXplID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICAgIGlmICh3aW5kb3dTaXplID49IDc1MSkgeyAvLyDjgrnjgq/jg63jg7zjg6vjg5Djg7zjga7luYXjgpLliqDlkbPjgZfjgaYoNzY4LTE3KXB444Gn5oyH5a6aXG4gICAgICAgICAgICAvLyBQQ+OCteOCpOOCuuS7peS4iu+8mkdvIHRvIFRvcOODnOOCv+ODs+OBruWHpueQhlxuICAgICAgICAgICAgaWYgKHNjcm9sbGVkID4gMTAwKSB7IC8vIDEwMHB444K544Kv44Ot44O844Or44GX44Gf44KJ44Oc44K/44Oz6KGo56S6XG4gICAgICAgICAgICAgICAgcGFnZXRvcC5mYWRlSW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFnZXRvcC5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgJCgnLnAtZ28tdG8tdG9wX19pY29uJykucmVtb3ZlQ2xhc3MoJ2lzLW91dCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQQ+OCteOCpOOCuuS7peS4iu+8muiDjOaZr+ODkeODqeODqeODg+OCr+OCueOBruWHpueQhlxuICAgICAgICAgICAgaWYgKHdpbmRvd1NpemUgPj0gMTE4Mykge1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsID0gMjE2O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3dTaXplID49IDEwMDcpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbCA9IDE0MDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWwgPSAxMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiZzEuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgJ2xlZnQgdG9wIC0nKyBzY3JvbGxlZCAqIHdlaWdodDEgKyAncHgnKTtcbiAgICAgICAgICAgIGJnMi5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24teScsIGluaXRpYWwgLSBzY3JvbGxlZCAqIHdlaWdodDIgKyAncHgnKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUEPjgrXjgqTjgrrmnKrmuoDvvJrjg5Hjg6njg6njg4Pjgq/jgrnjga7jgrnjg5Tjg7zjg4njgpLpgYXjgonjgZvjgotcbiAgICAgICAgICAgIHZhciBpbml0aWFsID0gNTA7XG4gICAgICAgICAgICBiZzEuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgJ2xlZnQgdG9wIC0nKyBzY3JvbGxlZCAqIHdlaWdodDEgKiAwLjUgKyAncHgnKTtcbiAgICAgICAgICAgIGJnMi5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24teScsIGluaXRpYWwgLSBzY3JvbGxlZCAqIHdlaWdodDIgKiAwLjIgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gR28gdG8gVG9w44Oc44K/44Oz44Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgcGFnZXRvcC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LCAzMDApOyAgLy8gMC4z56eS44GL44GR44Gm44OI44OD44OX44G456e75YuVXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8vIEdvIHRvIFRvcOODnOOCv+ODs+OBrmhvdmVy5Yem55CGXG4gICAgJCgnLnAtZ28tdG8tdG9wX19pY29uJykuaG92ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtaG92ZXInKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3V0Jyk7XG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3V0Jyk7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWhvdmVyJyk7XG4gICAgfSk7XG5cbiAgICAvLyDjg4jjg4Pjg5fjga7jgrPjg7Pjg4bjg7Pjg4Tpg6jliIbjgavjgrnjgq/jg63jg7zjg6vjgZfjgZ/nnqzplpPjgIHog4zmma/nlLvlg4/jgYzmqKrjgYvjgonjgrnjg6njgqTjg4njgZnjgovli5XjgY1cbiAgICAkKCcucC10b3AtYXJ0aWNsZS0td29ya3MsIC5wLXRvcC1hcnRpY2xlLS1zZXJ2aWNlLCAucC10b3AtYXJ0aWNsZS0tYWJvdXQtdXMnKS5lYWNoKGZ1bmN0aW9uKGksIGVsZW0pe1xuICAgICAgICB2YXIgY29udGVudHNQT1MgPSAkKGVsZW0pLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHNjcm9sbCByZXNpemUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICB2YXIgc2hvd0NsYXNzID0gJ3Nob3cnO1xuICAgICAgICAgICAgdmFyIHRpbWluZyA9IDIwMDsgLy8gMjAwcHjjgrPjg7Pjg4bjg7Pjg4TjgYzopovjgYjjgZ/jgonmrKHjga5pZuaWh+OBjHRydWVcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPj0gY29udGVudHNQT1MgLSB3aW5IZWlnaHQgKyB0aW1pbmcpe1xuICAgICAgICAgICAgICAgICQoZWxlbSkuYWRkQ2xhc3Moc2hvd0NsYXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtKS5yZW1vdmVDbGFzcyhzaG93Q2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0gKTsiLCIvKiFcblx0TW9kYWFsIC0gYWNjZXNzaWJsZSBtb2RhbHMgLSB2MC40LjRcblx0YnkgSHVtYWFuLCBmb3IgYWxsIGh1bWFucy5cblx0Ly9odW1hYW4uY29tXG4gKi9cbiFmdW5jdGlvbihhKXtmdW5jdGlvbiB0KGEpe3ZhciB0PXt9LG89ITE7YS5hdHRyKFwiZGF0YS1tb2RhYWwtdHlwZVwiKSYmKG89ITAsdC50eXBlPWEuYXR0cihcImRhdGEtbW9kYWFsLXR5cGVcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpJiYobz0hMCx0LmNvbnRlbnRfc291cmNlPWEuYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1hbmltYXRpb25cIikmJihvPSEwLHQuYW5pbWF0aW9uPWEuYXR0cihcImRhdGEtbW9kYWFsLWFuaW1hdGlvblwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtYW5pbWF0aW9uLXNwZWVkXCIpJiYobz0hMCx0LmFuaW1hdGlvbl9zcGVlZD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1hbmltYXRpb24tc3BlZWRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWFmdGVyLWNhbGxiYWNrLWRlbGF5XCIpJiYobz0hMCx0LmFmdGVyX2NhbGxiYWNrX2RlbGF5PWEuYXR0cihcImRhdGEtbW9kYWFsLWFmdGVyLWNhbGxiYWNrLWRlbGF5XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1pcy1sb2NrZWRcIikmJihvPSEwLHQuaXNfbG9ja2VkPVwidHJ1ZVwiPT09YS5hdHRyKFwiZGF0YS1tb2RhYWwtaXMtbG9ja2VkXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1oaWRlLWNsb3NlXCIpJiYobz0hMCx0LmhpZGVfY2xvc2U9XCJ0cnVlXCI9PT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1oaWRlLWNsb3NlXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1iYWNrZ3JvdW5kXCIpJiYobz0hMCx0LmJhY2tncm91bmQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtYmFja2dyb3VuZFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtb3ZlcmxheS1vcGFjaXR5XCIpJiYobz0hMCx0Lm92ZXJsYXlfb3BhY2l0eT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1vdmVybGF5LW9wYWNpdHlcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLW92ZXJsYXktY2xvc2VcIikmJihvPSEwLHQub3ZlcmxheV9jbG9zZT1cImZhbHNlXCIhPT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1vdmVybGF5LWNsb3NlXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1hY2Nlc3NpYmxlLXRpdGxlXCIpJiYobz0hMCx0LmFjY2Vzc2libGVfdGl0bGU9YS5hdHRyKFwiZGF0YS1tb2RhYWwtYWNjZXNzaWJsZS10aXRsZVwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtc3RhcnQtb3BlblwiKSYmKG89ITAsdC5zdGFydF9vcGVuPVwidHJ1ZVwiPT09YS5hdHRyKFwiZGF0YS1tb2RhYWwtc3RhcnQtb3BlblwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtZnVsbHNjcmVlblwiKSYmKG89ITAsdC5mdWxsc2NyZWVuPVwidHJ1ZVwiPT09YS5hdHRyKFwiZGF0YS1tb2RhYWwtZnVsbHNjcmVlblwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY3VzdG9tLWNsYXNzXCIpJiYobz0hMCx0LmN1c3RvbV9jbGFzcz1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jdXN0b20tY2xhc3NcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNsb3NlLXRleHRcIikmJihvPSEwLHQuY2xvc2VfdGV4dD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jbG9zZS10ZXh0XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jbG9zZS1hcmlhLWxhYmVsXCIpJiYobz0hMCx0LmNsb3NlX2FyaWFfbGFiZWw9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY2xvc2UtYXJpYS1sYWJlbFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtYmFja2dyb3VuZC1zY3JvbGxcIikmJihvPSEwLHQuYmFja2dyb3VuZF9zY3JvbGw9XCJ0cnVlXCI9PT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1iYWNrZ3JvdW5kLXNjcm9sbFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtd2lkdGhcIikmJihvPSEwLHQud2lkdGg9cGFyc2VJbnQoYS5hdHRyKFwiZGF0YS1tb2RhYWwtd2lkdGhcIikpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1oZWlnaHRcIikmJihvPSEwLHQuaGVpZ2h0PXBhcnNlSW50KGEuYXR0cihcImRhdGEtbW9kYWFsLWhlaWdodFwiKSkpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tYnV0dG9uLXRleHRcIikmJihvPSEwLHQuY29uZmlybV9idXR0b25fdGV4dD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLWJ1dHRvbi10ZXh0XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLWNhbmNlbC1idXR0b24tdGV4dFwiKSYmKG89ITAsdC5jb25maXJtX2NhbmNlbF9idXR0b25fdGV4dD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLWNhbmNlbC1idXR0b24tdGV4dFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS10aXRsZVwiKSYmKG89ITAsdC5jb25maXJtX3RpdGxlPWEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tdGl0bGVcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tY29udGVudFwiKSYmKG89ITAsdC5jb25maXJtX2NvbnRlbnQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS1jb250ZW50XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1nYWxsZXJ5LWFjdGl2ZS1jbGFzc1wiKSYmKG89ITAsdC5nYWxsZXJ5X2FjdGl2ZV9jbGFzcz1hLmF0dHIoXCJkYXRhLW1vZGFhbC1nYWxsZXJ5LWFjdGl2ZS1jbGFzc1wiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtbG9hZGluZy1jb250ZW50XCIpJiYobz0hMCx0LmxvYWRpbmdfY29udGVudD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1sb2FkaW5nLWNvbnRlbnRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWxvYWRpbmctY2xhc3NcIikmJihvPSEwLHQubG9hZGluZ19jbGFzcz1hLmF0dHIoXCJkYXRhLW1vZGFhbC1sb2FkaW5nLWNsYXNzXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1hamF4LWVycm9yLWNsYXNzXCIpJiYobz0hMCx0LmFqYXhfZXJyb3JfY2xhc3M9YS5hdHRyKFwiZGF0YS1tb2RhYWwtYWpheC1lcnJvci1jbGFzc1wiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtaW5zdGFncmFtLWlkXCIpJiYobz0hMCx0Lmluc3RhZ3JhbV9pZD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1pbnN0YWdyYW0taWRcIikpLG8mJmEubW9kYWFsKHQpfXZhciBvPXtpbml0OmZ1bmN0aW9uKHQsbyl7dmFyIGU9dGhpcztpZihlLmRvbT1hKFwiYm9keVwiKSxlLiRlbGVtPWEobyksZS5vcHRpb25zPWEuZXh0ZW5kKHt9LGEuZm4ubW9kYWFsLm9wdGlvbnMsZS4kZWxlbS5kYXRhKCksdCksZS54aHI9bnVsbCxlLnNjb3BlPXtpc19vcGVuOiExLGlkOlwibW9kYWFsX1wiKyhuZXcgRGF0ZSkuZ2V0VGltZSgpK01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygyKSxzb3VyY2U6ZS5vcHRpb25zLmNvbnRlbnRfc291cmNlP2Uub3B0aW9ucy5jb250ZW50X3NvdXJjZTplLiRlbGVtLmF0dHIoXCJocmVmXCIpfSxlLiRlbGVtLmF0dHIoXCJkYXRhLW1vZGFhbC1zY29wZVwiLGUuc2NvcGUuaWQpLGUucHJpdmF0ZV9vcHRpb25zPXthY3RpdmVfY2xhc3M6XCJpc19hY3RpdmVcIn0sZS5sYXN0Rm9jdXM9bnVsbCxlLm9wdGlvbnMuaXNfbG9ja2VkfHxcImNvbmZpcm1cIj09ZS5vcHRpb25zLnR5cGV8fGUub3B0aW9ucy5oaWRlX2Nsb3NlP2Uuc2NvcGUuY2xvc2VfYnRuPVwiXCI6ZS5zY29wZS5jbG9zZV9idG49JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibW9kYWFsLWNsb3NlXCIgaWQ9XCJtb2RhYWwtY2xvc2VcIiBhcmlhLWxhYmVsPVwiJytlLm9wdGlvbnMuY2xvc2VfYXJpYV9sYWJlbCsnXCI+PHNwYW4+JytlLm9wdGlvbnMuY2xvc2VfdGV4dCtcIjwvc3Bhbj48L2J1dHRvbj5cIixcIm5vbmVcIj09PWUub3B0aW9ucy5hbmltYXRpb24mJihlLm9wdGlvbnMuYW5pbWF0aW9uX3NwZWVkPTAsZS5vcHRpb25zLmFmdGVyX2NhbGxiYWNrX2RlbGF5PTApLGEobykub24oXCJjbGljay5Nb2RhYWxcIixmdW5jdGlvbihhKXthLnByZXZlbnREZWZhdWx0KCksZS5jcmVhdGVfbW9kYWFsKGUsYSl9KSwhMD09PWUub3B0aW9ucy5vdXRlcl9jb250cm9scyl2YXIgaT1cIm91dGVyXCI7ZWxzZSB2YXIgaT1cImlubmVyXCI7ZS5zY29wZS5wcmV2X2J0bj0nPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1jb250cm9sIG1vZGFhbC1nYWxsZXJ5LXByZXYgbW9kYWFsLWdhbGxlcnktcHJldi0nK2krJ1wiIGlkPVwibW9kYWFsLWdhbGxlcnktcHJldlwiIGFyaWEtbGFiZWw9XCJQcmV2aW91cyBpbWFnZSAodXNlIGxlZnQgYXJyb3cgdG8gY2hhbmdlKVwiPjxzcGFuPlByZXZpb3VzIEltYWdlPC9zcGFuPjwvYnV0dG9uPicsZS5zY29wZS5uZXh0X2J0bj0nPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1jb250cm9sIG1vZGFhbC1nYWxsZXJ5LW5leHQgbW9kYWFsLWdhbGxlcnktbmV4dC0nK2krJ1wiIGlkPVwibW9kYWFsLWdhbGxlcnktbmV4dFwiIGFyaWEtbGFiZWw9XCJOZXh0IGltYWdlICh1c2UgcmlnaHQgYXJyb3cgdG8gY2hhbmdlKVwiPjxzcGFuPk5leHQgSW1hZ2U8L3NwYW4+PC9idXR0b24+JywhMD09PWUub3B0aW9ucy5zdGFydF9vcGVuJiZlLmNyZWF0ZV9tb2RhYWwoZSl9LGNyZWF0ZV9tb2RhYWw6ZnVuY3Rpb24oYSx0KXt2YXIgbyxhPXRoaXM7aWYoYS5sYXN0Rm9jdXM9YS4kZWxlbSwhMSE9PWEub3B0aW9ucy5zaG91bGRfb3BlbiYmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGEub3B0aW9ucy5zaG91bGRfb3Blbnx8ITEhPT1hLm9wdGlvbnMuc2hvdWxkX29wZW4oKSkpe3N3aXRjaChhLm9wdGlvbnMuYmVmb3JlX29wZW4uY2FsbChhLHQpLGEub3B0aW9ucy50eXBlKXtjYXNlXCJpbmxpbmVcIjphLmNyZWF0ZV9iYXNpYygpO2JyZWFrO2Nhc2VcImFqYXhcIjpvPWEub3B0aW9ucy5zb3VyY2UoYS4kZWxlbSxhLnNjb3BlLnNvdXJjZSksYS5mZXRjaF9hamF4KG8pO2JyZWFrO2Nhc2VcImNvbmZpcm1cIjphLm9wdGlvbnMuaXNfbG9ja2VkPSEwLGEuY3JlYXRlX2NvbmZpcm0oKTticmVhaztjYXNlXCJpbWFnZVwiOmEuY3JlYXRlX2ltYWdlKCk7YnJlYWs7Y2FzZVwiaWZyYW1lXCI6bz1hLm9wdGlvbnMuc291cmNlKGEuJGVsZW0sYS5zY29wZS5zb3VyY2UpLGEuY3JlYXRlX2lmcmFtZShvKTticmVhaztjYXNlXCJ2aWRlb1wiOmEuY3JlYXRlX3ZpZGVvKGEuc2NvcGUuc291cmNlKTticmVhaztjYXNlXCJpbnN0YWdyYW1cIjphLmNyZWF0ZV9pbnN0YWdyYW0oKX1hLndhdGNoX2V2ZW50cygpfX0sd2F0Y2hfZXZlbnRzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0LmRvbS5vZmYoXCJjbGljay5Nb2RhYWwga2V5dXAuTW9kYWFsIGtleWRvd24uTW9kYWFsXCIpLHQuZG9tLm9uKFwia2V5ZG93bi5Nb2RhYWxcIixmdW5jdGlvbihvKXt2YXIgZT1vLmtleUNvZGUsaT1vLnRhcmdldDs5PT1lJiZ0LnNjb3BlLmlzX29wZW4mJihhLmNvbnRhaW5zKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQuc2NvcGUuaWQpLGkpfHxhKFwiI1wiK3Quc2NvcGUuaWQpLmZpbmQoJypbdGFiaW5kZXg9XCIwXCJdJykuZm9jdXMoKSl9KSx0LmRvbS5vbihcImtleXVwLk1vZGFhbFwiLGZ1bmN0aW9uKG8pe3ZhciBlPW8ua2V5Q29kZSxpPW8udGFyZ2V0O3JldHVybiBvLnNoaWZ0S2V5JiY5PT1vLmtleUNvZGUmJnQuc2NvcGUuaXNfb3BlbiYmKGEuY29udGFpbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodC5zY29wZS5pZCksaSl8fGEoXCIjXCIrdC5zY29wZS5pZCkuZmluZChcIi5tb2RhYWwtY2xvc2VcIikuZm9jdXMoKSksIXQub3B0aW9ucy5pc19sb2NrZWQmJjI3PT1lJiZ0LnNjb3BlLmlzX29wZW4/IWEoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkuaXMoXCJpbnB1dDpub3QoOmNoZWNrYm94KTpub3QoOnJhZGlvKVwiKSYmdm9pZCB0Lm1vZGFhbF9jbG9zZSgpOlwiaW1hZ2VcIj09dC5vcHRpb25zLnR5cGU/KDM3PT1lJiZ0LnNjb3BlLmlzX29wZW4mJiFhKFwiI1wiK3Quc2NvcGUuaWQrXCIgLm1vZGFhbC1nYWxsZXJ5LXByZXZcIikuaGFzQ2xhc3MoXCJpc19oaWRkZW5cIikmJnQuZ2FsbGVyeV91cGRhdGUoXCJwcmV2XCIpLHZvaWQoMzk9PWUmJnQuc2NvcGUuaXNfb3BlbiYmIWEoXCIjXCIrdC5zY29wZS5pZCtcIiAubW9kYWFsLWdhbGxlcnktbmV4dFwiKS5oYXNDbGFzcyhcImlzX2hpZGRlblwiKSYmdC5nYWxsZXJ5X3VwZGF0ZShcIm5leHRcIikpKTp2b2lkIDB9KSx0LmRvbS5vbihcImNsaWNrLk1vZGFhbFwiLGZ1bmN0aW9uKG8pe3ZhciBlPWEoby50YXJnZXQpO2lmKCF0Lm9wdGlvbnMuaXNfbG9ja2VkJiYodC5vcHRpb25zLm92ZXJsYXlfY2xvc2UmJmUuaXMoXCIubW9kYWFsLWlubmVyLXdyYXBwZXJcIil8fGUuaXMoXCIubW9kYWFsLWNsb3NlXCIpfHxlLmNsb3Nlc3QoXCIubW9kYWFsLWNsb3NlXCIpLmxlbmd0aCkpcmV0dXJuIHZvaWQgdC5tb2RhYWxfY2xvc2UoKTtpZihlLmlzKFwiLm1vZGFhbC1jb25maXJtLWJ0blwiKSlyZXR1cm4gZS5pcyhcIi5tb2RhYWwtb2tcIikmJnQub3B0aW9ucy5jb25maXJtX2NhbGxiYWNrLmNhbGwodCx0Lmxhc3RGb2N1cyksZS5pcyhcIi5tb2RhYWwtY2FuY2VsXCIpJiZ0Lm9wdGlvbnMuY29uZmlybV9jYW5jZWxfY2FsbGJhY2suY2FsbCh0LHQubGFzdEZvY3VzKSx2b2lkIHQubW9kYWFsX2Nsb3NlKCk7aWYoZS5pcyhcIi5tb2RhYWwtZ2FsbGVyeS1jb250cm9sXCIpKXtpZihlLmhhc0NsYXNzKFwiaXNfaGlkZGVuXCIpKXJldHVybjtyZXR1cm4gZS5pcyhcIi5tb2RhYWwtZ2FsbGVyeS1wcmV2XCIpJiZ0LmdhbGxlcnlfdXBkYXRlKFwicHJldlwiKSx2b2lkKGUuaXMoXCIubW9kYWFsLWdhbGxlcnktbmV4dFwiKSYmdC5nYWxsZXJ5X3VwZGF0ZShcIm5leHRcIikpfX0pfSxidWlsZF9tb2RhbDpmdW5jdGlvbih0KXt2YXIgbz10aGlzLGU9XCJcIjtcImluc3RhZ3JhbVwiPT1vLm9wdGlvbnMudHlwZSYmKGU9XCIgbW9kYWFsLWluc3RhZ3JhbVwiKTt2YXIgaSxsPVwidmlkZW9cIj09by5vcHRpb25zLnR5cGU/XCJtb2RhYWwtdmlkZW8td3JhcFwiOlwibW9kYWFsLWNvbnRlbnRcIjtzd2l0Y2goby5vcHRpb25zLmFuaW1hdGlvbil7Y2FzZVwiZmFkZVwiOmk9XCIgbW9kYWFsLXN0YXJ0X2ZhZGVcIjticmVhaztjYXNlXCJzbGlkZS1kb3duXCI6aT1cIiBtb2RhYWwtc3RhcnRfc2xpZGVkb3duXCI7YnJlYWs7ZGVmYXVsdDppPVwiIG1vZGFhbC1zdGFydF9ub25lXCJ9dmFyIG49XCJcIjtvLm9wdGlvbnMuZnVsbHNjcmVlbiYmKG49XCIgbW9kYWFsLWZ1bGxzY3JlZW5cIiksXCJcIj09PW8ub3B0aW9ucy5jdXN0b21fY2xhc3MmJnZvaWQgMD09PW8ub3B0aW9ucy5jdXN0b21fY2xhc3N8fChvLm9wdGlvbnMuY3VzdG9tX2NsYXNzPVwiIFwiK28ub3B0aW9ucy5jdXN0b21fY2xhc3MpO3ZhciBzPVwiXCI7by5vcHRpb25zLndpZHRoJiZvLm9wdGlvbnMuaGVpZ2h0JiZcIm51bWJlclwiPT10eXBlb2Ygby5vcHRpb25zLndpZHRoJiZcIm51bWJlclwiPT10eXBlb2Ygby5vcHRpb25zLmhlaWdodD9zPScgc3R5bGU9XCJtYXgtd2lkdGg6JytvLm9wdGlvbnMud2lkdGgrXCJweDtoZWlnaHQ6XCIrby5vcHRpb25zLmhlaWdodCsncHg7b3ZlcmZsb3c6YXV0bztcIic6by5vcHRpb25zLndpZHRoJiZcIm51bWJlclwiPT10eXBlb2Ygby5vcHRpb25zLndpZHRoP3M9JyBzdHlsZT1cIm1heC13aWR0aDonK28ub3B0aW9ucy53aWR0aCsncHg7XCInOm8ub3B0aW9ucy5oZWlnaHQmJlwibnVtYmVyXCI9PXR5cGVvZiBvLm9wdGlvbnMuaGVpZ2h0JiYocz0nIHN0eWxlPVwiaGVpZ2h0Oicrby5vcHRpb25zLmhlaWdodCsncHg7b3ZlcmZsb3c6YXV0bztcIicpLChcImltYWdlXCI9PW8ub3B0aW9ucy50eXBlfHxcInZpZGVvXCI9PW8ub3B0aW9ucy50eXBlfHxcImluc3RhZ3JhbVwiPT1vLm9wdGlvbnMudHlwZXx8by5vcHRpb25zLmZ1bGxzY3JlZW4pJiYocz1cIlwiKTt2YXIgZD1cIlwiO28uaXNfdG91Y2goKSYmKGQ9JyBzdHlsZT1cImN1cnNvcjpwb2ludGVyO1wiJyk7dmFyIHI9JzxkaXYgY2xhc3M9XCJtb2RhYWwtd3JhcHBlciBtb2RhYWwtJytvLm9wdGlvbnMudHlwZStpK2UrbitvLm9wdGlvbnMuY3VzdG9tX2NsYXNzKydcIiBpZD1cIicrby5zY29wZS5pZCsnXCI+PGRpdiBjbGFzcz1cIm1vZGFhbC1vdXRlci13cmFwcGVyXCI+PGRpdiBjbGFzcz1cIm1vZGFhbC1pbm5lci13cmFwcGVyXCInK2QrXCI+XCI7XCJ2aWRlb1wiIT1vLm9wdGlvbnMudHlwZSYmKHIrPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWNvbnRhaW5lclwiJytzK1wiPlwiKSxyKz0nPGRpdiBjbGFzcz1cIicrbCsnIG1vZGFhbC1mb2N1c1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBhcmlhLWxhYmVsPVwiJytvLm9wdGlvbnMuYWNjZXNzaWJsZV90aXRsZStcIiAtIFwiK28ub3B0aW9ucy5jbG9zZV9hcmlhX2xhYmVsKydcIiByb2xlPVwiZGlhbG9nXCI+JyxcImlubGluZVwiPT1vLm9wdGlvbnMudHlwZT9yKz0nPGRpdiBjbGFzcz1cIm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiIHJvbGU9XCJkb2N1bWVudFwiPjwvZGl2Pic6cis9dCxyKz1cIjwvZGl2PlwiK28uc2NvcGUuY2xvc2VfYnRuLFwidmlkZW9cIiE9by5vcHRpb25zLnR5cGUmJihyKz1cIjwvZGl2PlwiKSxyKz1cIjwvZGl2PlwiLFwiaW1hZ2VcIj09by5vcHRpb25zLnR5cGUmJiEwPT09by5vcHRpb25zLm91dGVyX2NvbnRyb2xzJiYocis9by5zY29wZS5wcmV2X2J0bitvLnNjb3BlLm5leHRfYnRuKSxyKz1cIjwvZGl2PjwvZGl2PlwiLGEoXCIjXCIrby5zY29wZS5pZCtcIl9vdmVybGF5XCIpLmxlbmd0aDwxJiZvLmRvbS5hcHBlbmQociksXCJpbmxpbmVcIj09by5vcHRpb25zLnR5cGUmJnQuYXBwZW5kVG8oXCIjXCIrby5zY29wZS5pZCtcIiAubW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCIpLG8ubW9kYWFsX292ZXJsYXkoXCJzaG93XCIpfSxjcmVhdGVfYmFzaWM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG89YSh0LnNjb3BlLnNvdXJjZSksZT1cIlwiO28ubGVuZ3RoPyhlPW8uY29udGVudHMoKS5kZXRhY2goKSxvLmVtcHR5KCkpOmU9XCJDb250ZW50IGNvdWxkIG5vdCBiZSBsb2FkZWQuIFBsZWFzZSBjaGVjayB0aGUgc291cmNlIGFuZCB0cnkgYWdhaW4uXCIsdC5idWlsZF9tb2RhbChlKX0sY3JlYXRlX2luc3RhZ3JhbTpmdW5jdGlvbigpe3ZhciB0PXRoaXMsbz10Lm9wdGlvbnMuaW5zdGFncmFtX2lkLGU9XCJcIixpPVwiSW5zdGFncmFtIHBob3RvIGNvdWxkbid0IGJlIGxvYWRlZCwgcGxlYXNlIGNoZWNrIHRoZSBlbWJlZCBjb2RlIGFuZCB0cnkgYWdhaW4uXCI7aWYodC5idWlsZF9tb2RhbCgnPGRpdiBjbGFzcz1cIm1vZGFhbC1jb250ZW50LWNvbnRhaW5lcicrKFwiXCIhPXQub3B0aW9ucy5sb2FkaW5nX2NsYXNzP1wiIFwiK3Qub3B0aW9ucy5sb2FkaW5nX2NsYXNzOlwiXCIpKydcIj4nK3Qub3B0aW9ucy5sb2FkaW5nX2NvbnRlbnQrXCI8L2Rpdj5cIiksXCJcIiE9byYmbnVsbCE9PW8mJnZvaWQgMCE9PW8pe3ZhciBsPVwiLy9hcGkuaW5zdGFncmFtLmNvbS9vZW1iZWQ/dXJsPS8vaW5zdGFnci5hbS9wL1wiK28rXCIvXCI7YS5hamF4KHt1cmw6bCxkYXRhVHlwZTpcImpzb25wXCIsY2FjaGU6ITEsc3VjY2VzczpmdW5jdGlvbihvKXt0LmRvbS5hcHBlbmQoJzxkaXYgaWQ9XCJ0ZW1wLWlnXCIgc3R5bGU9XCJ3aWR0aDowO2hlaWdodDowO292ZXJmbG93OmhpZGRlbjtcIj4nK28uaHRtbCtcIjwvZGl2PlwiKSx0LmRvbS5hdHRyKFwiZGF0YS1pZ2xvYWRlZFwiKT93aW5kb3cuaW5zdGdybS5FbWJlZHMucHJvY2VzcygpOnQuZG9tLmF0dHIoXCJkYXRhLWlnbG9hZGVkXCIsXCJ0cnVlXCIpO3ZhciBlPVwiI1wiK3Quc2NvcGUuaWQrXCIgLm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiO2EoZSkubGVuZ3RoPjAmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXthKFwiI3RlbXAtaWdcIikuY29udGVudHMoKS5jbG9uZSgpLmFwcGVuZFRvKGUpLGEoXCIjdGVtcC1pZ1wiKS5yZW1vdmUoKX0sMWUzKX0sZXJyb3I6ZnVuY3Rpb24oKXtlPWk7dmFyIG89YShcIiNcIit0LnNjb3BlLmlkK1wiIC5tb2RhYWwtY29udGVudC1jb250YWluZXJcIik7by5sZW5ndGg+MCYmKG8ucmVtb3ZlQ2xhc3ModC5vcHRpb25zLmxvYWRpbmdfY2xhc3MpLmFkZENsYXNzKHQub3B0aW9ucy5hamF4X2Vycm9yX2NsYXNzKSxvLmh0bWwoZSkpfX0pfWVsc2UgZT1pO3JldHVybiExfSxmZXRjaF9hamF4OmZ1bmN0aW9uKHQpe3ZhciBvPXRoaXM7bnVsbD09by5vcHRpb25zLmFjY2Vzc2libGVfdGl0bGUmJihvLm9wdGlvbnMuYWNjZXNzaWJsZV90aXRsZT1cIkRpYWxvZyBXaW5kb3dcIiksbnVsbCE9PW8ueGhyJiYoby54aHIuYWJvcnQoKSxvLnhocj1udWxsKSxvLmJ1aWxkX21vZGFsKCc8ZGl2IGNsYXNzPVwibW9kYWFsLWNvbnRlbnQtY29udGFpbmVyJysoXCJcIiE9by5vcHRpb25zLmxvYWRpbmdfY2xhc3M/XCIgXCIrby5vcHRpb25zLmxvYWRpbmdfY2xhc3M6XCJcIikrJ1wiPicrby5vcHRpb25zLmxvYWRpbmdfY29udGVudCtcIjwvZGl2PlwiKSxvLnhocj1hLmFqYXgodCx7c3VjY2VzczpmdW5jdGlvbih0KXt2YXIgZT1hKFwiI1wiK28uc2NvcGUuaWQpLmZpbmQoXCIubW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCIpO2UubGVuZ3RoPjAmJihlLnJlbW92ZUNsYXNzKG8ub3B0aW9ucy5sb2FkaW5nX2NsYXNzKSxlLmh0bWwodCksby5vcHRpb25zLmFqYXhfc3VjY2Vzcy5jYWxsKG8sZSkpfSxlcnJvcjpmdW5jdGlvbih0KXtpZihcImFib3J0XCIhPXQuc3RhdHVzVGV4dCl7dmFyIGU9YShcIiNcIitvLnNjb3BlLmlkK1wiIC5tb2RhYWwtY29udGVudC1jb250YWluZXJcIik7ZS5sZW5ndGg+MCYmKGUucmVtb3ZlQ2xhc3Moby5vcHRpb25zLmxvYWRpbmdfY2xhc3MpLmFkZENsYXNzKG8ub3B0aW9ucy5hamF4X2Vycm9yX2NsYXNzKSxlLmh0bWwoXCJDb250ZW50IGNvdWxkIG5vdCBiZSBsb2FkZWQuIFBsZWFzZSBjaGVjayB0aGUgc291cmNlIGFuZCB0cnkgYWdhaW4uXCIpKX19fSl9LGNyZWF0ZV9jb25maXJtOmZ1bmN0aW9uKCl7dmFyIGEsdD10aGlzO2E9JzxkaXYgY2xhc3M9XCJtb2RhYWwtY29udGVudC1jb250YWluZXJcIj48aDEgaWQ9XCJtb2RhYWwtdGl0bGVcIj4nK3Qub3B0aW9ucy5jb25maXJtX3RpdGxlKyc8L2gxPjxkaXYgY2xhc3M9XCJtb2RhYWwtY29uZmlybS1jb250ZW50XCI+Jyt0Lm9wdGlvbnMuY29uZmlybV9jb250ZW50Kyc8L2Rpdj48ZGl2IGNsYXNzPVwibW9kYWFsLWNvbmZpcm0td3JhcFwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibW9kYWFsLWNvbmZpcm0tYnRuIG1vZGFhbC1va1wiIGFyaWEtbGFiZWw9XCJDb25maXJtXCI+Jyt0Lm9wdGlvbnMuY29uZmlybV9idXR0b25fdGV4dCsnPC9idXR0b24+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtb2RhYWwtY29uZmlybS1idG4gbW9kYWFsLWNhbmNlbFwiIGFyaWEtbGFiZWw9XCJDYW5jZWxcIj4nK3Qub3B0aW9ucy5jb25maXJtX2NhbmNlbF9idXR0b25fdGV4dCtcIjwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PlwiLHQuYnVpbGRfbW9kYWwoYSl9LGNyZWF0ZV9pbWFnZTpmdW5jdGlvbigpe3ZhciB0LG8sZT10aGlzLGk9XCJcIjtpZihlLiRlbGVtLmlzKFwiW2RhdGEtZ3JvdXBdXCIpfHxlLiRlbGVtLmlzKFwiW3JlbF1cIikpe3ZhciBsPWUuJGVsZW0uaXMoXCJbZGF0YS1ncm91cF1cIiksbj1sP2UuJGVsZW0uYXR0cihcImRhdGEtZ3JvdXBcIik6ZS4kZWxlbS5hdHRyKFwicmVsXCIpLHM9YShsPydbZGF0YS1ncm91cD1cIicrbisnXCJdJzonW3JlbD1cIicrbisnXCJdJyk7cy5yZW1vdmVBdHRyKFwiZGF0YS1nYWxsZXJ5LWFjdGl2ZVwiLFwiaXNfYWN0aXZlXCIpLGUuJGVsZW0uYXR0cihcImRhdGEtZ2FsbGVyeS1hY3RpdmVcIixcImlzX2FjdGl2ZVwiKSxvPXMubGVuZ3RoLTE7dmFyIGQ9W107aT0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWl0ZW0td3JhcFwiPicscy5lYWNoKGZ1bmN0aW9uKHQsbyl7dmFyIGU9XCJcIixpPVwiXCIsbD1cIlwiLG49ITEscz0hMSxyPW8uZ2V0QXR0cmlidXRlKFwiZGF0YS1tb2RhYWwtZGVzY1wiKSxjPW8uZ2V0QXR0cmlidXRlKFwiZGF0YS1nYWxsZXJ5LWFjdGl2ZVwiKTthKG8pLmF0dHIoXCJkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZVwiKT9lPWEobykuYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpOmEobykuYXR0cihcImhyZWZcIik/ZT1hKG8pLmF0dHIoXCJocmVmXCIpOmEobykuYXR0cihcInNyY1wiKT9lPWEobykuYXR0cihcInNyY1wiKTooZT1cInRyaWdnZXIgcmVxdWlyZXMgaHJlZiBvciBkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZSBhdHRyaWJ1dGVcIixzPSEwKSxcIlwiIT1yJiZudWxsIT09ciYmdm9pZCAwIT09cj8oaT1yLGw9JzxkaXYgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1sYWJlbFwiPjxzcGFuIGNsYXNzPVwibW9kYWFsLWFjY2Vzc2libGUtaGlkZVwiPkltYWdlICcrKHQrMSkrXCIgLSA8L3NwYW4+XCIrci5yZXBsYWNlKC88L2csXCImbHQ7XCIpLnJlcGxhY2UoLz4vZyxcIiZndDtcIikrXCI8L2Rpdj5cIik6bD0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWxhYmVsXCI+PHNwYW4gY2xhc3M9XCJtb2RhYWwtYWNjZXNzaWJsZS1oaWRlXCI+SW1hZ2UgJysodCsxKStcIjwvc3Bhbj48L2Rpdj5cIixjJiYobj0hMCk7dmFyIG09e3VybDplLGFsdDppLHJhd2Rlc2M6cixkZXNjOmwsYWN0aXZlOm4sc3JjX2Vycm9yOnN9O2QucHVzaChtKX0pO2Zvcih2YXIgcj0wO3I8ZC5sZW5ndGg7cisrKXt2YXIgYz1cIlwiLG09ZFtyXS5yYXdkZXNjP1wiSW1hZ2U6IFwiK2Rbcl0ucmF3ZGVzYzpcIkltYWdlIFwiK3IrXCIgbm8gZGVzY3JpcHRpb25cIjtkW3JdLmFjdGl2ZSYmKGM9XCIgXCIrZS5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzKTt2YXIgcD1kW3JdLnNyY19lcnJvcj9kW3JdLnVybDonPGltZyBzcmM9XCInK2Rbcl0udXJsKydcIiBhbHQ9XCIgXCIgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+JztpKz0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWl0ZW0gZ2FsbGVyeS1pdGVtLScrcitjKydcIiBhcmlhLWxhYmVsPVwiJyttKydcIj4nK3ArZFtyXS5kZXNjK1wiPC9kaXY+XCJ9aSs9XCI8L2Rpdj5cIiwxIT1lLm9wdGlvbnMub3V0ZXJfY29udHJvbHMmJihpKz1lLnNjb3BlLnByZXZfYnRuK2Uuc2NvcGUubmV4dF9idG4pfWVsc2V7dmFyIHUsXz0hMTtlLiRlbGVtLmF0dHIoXCJkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZVwiKT91PWUuJGVsZW0uYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpOmUuJGVsZW0uYXR0cihcImhyZWZcIik/dT1lLiRlbGVtLmF0dHIoXCJocmVmXCIpOmUuJGVsZW0uYXR0cihcInNyY1wiKT91PWUuJGVsZW0uYXR0cihcInNyY1wiKToodT1cInRyaWdnZXIgcmVxdWlyZXMgaHJlZiBvciBkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZSBhdHRyaWJ1dGVcIixfPSEwKTt2YXIgdj1cIlwiLGY9XCJcIixtPVwiXCI7ZS4kZWxlbS5hdHRyKFwiZGF0YS1tb2RhYWwtZGVzY1wiKT8obT1lLiRlbGVtLmF0dHIoXCJkYXRhLW1vZGFhbC1kZXNjXCIpLHY9ZS4kZWxlbS5hdHRyKFwiZGF0YS1tb2RhYWwtZGVzY1wiKSxmPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWdhbGxlcnktbGFiZWxcIj48c3BhbiBjbGFzcz1cIm1vZGFhbC1hY2Nlc3NpYmxlLWhpZGVcIj5JbWFnZSAtIDwvc3Bhbj4nK3YucmVwbGFjZSgvPC9nLFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csXCImZ3Q7XCIpK1wiPC9kaXY+XCIpOm09XCJJbWFnZSB3aXRoIG5vIGRlc2NyaXB0aW9uXCI7dmFyIHA9Xz91Oic8aW1nIHNyYz1cIicrdSsnXCIgYWx0PVwiIFwiIHN0eWxlPVwid2lkdGg6MTAwJVwiPic7aT0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWl0ZW0gaXNfYWN0aXZlXCIgYXJpYS1sYWJlbD1cIicrbSsnXCI+JytwK2YrXCI8L2Rpdj5cIn10PWksZS5idWlsZF9tb2RhbCh0KSxhKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfYWN0aXZlXCIpLmlzKFwiLmdhbGxlcnktaXRlbS0wXCIpJiZhKFwiLm1vZGFhbC1nYWxsZXJ5LXByZXZcIikuaGlkZSgpLGEoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19hY3RpdmVcIikuaXMoXCIuZ2FsbGVyeS1pdGVtLVwiK28pJiZhKFwiLm1vZGFhbC1nYWxsZXJ5LW5leHRcIikuaGlkZSgpfSxnYWxsZXJ5X3VwZGF0ZTpmdW5jdGlvbih0KXt2YXIgbz10aGlzLGU9YShcIiNcIitvLnNjb3BlLmlkKSxpPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtXCIpLGw9aS5sZW5ndGgtMTtpZigwPT1sKXJldHVybiExO3ZhciBuPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1wcmV2XCIpLHM9ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LW5leHRcIiksZD0wLHI9MCxjPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLlwiK28ucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcyksbT1cIm5leHRcIj09dD9jLm5leHQoXCIubW9kYWFsLWdhbGxlcnktaXRlbVwiKTpjLnByZXYoXCIubW9kYWFsLWdhbGxlcnktaXRlbVwiKTtyZXR1cm4gby5vcHRpb25zLmJlZm9yZV9pbWFnZV9jaGFuZ2UuY2FsbChvLGMsbSksKFwicHJldlwiIT10fHwhZS5maW5kKFwiLmdhbGxlcnktaXRlbS0wXCIpLmhhc0NsYXNzKFwiaXNfYWN0aXZlXCIpKSYmKChcIm5leHRcIiE9dHx8IWUuZmluZChcIi5nYWxsZXJ5LWl0ZW0tXCIrbCkuaGFzQ2xhc3MoXCJpc19hY3RpdmVcIikpJiZ2b2lkIGMuc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6MH0sMjUwLGZ1bmN0aW9uKCl7bS5hZGRDbGFzcyhcImlzX25leHRcIikuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCIsZGlzcGxheTpcImJsb2NrXCIsb3BhY2l0eTowfSk7dmFyIHQ9YShkb2N1bWVudCkud2lkdGgoKSxpPXQ+MTE0MD8yODA6NTA7ZD1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0XCIpLndpZHRoKCkscj1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0XCIpLmhlaWdodCgpO3ZhciBwPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX25leHQgaW1nXCIpLnByb3AoXCJuYXR1cmFsV2lkdGhcIiksdT1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0IGltZ1wiKS5wcm9wKFwibmF0dXJhbEhlaWdodFwiKTtwPnQtaT8oZD10LWksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfbmV4dFwiKS5jc3Moe3dpZHRoOmR9KSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0IGltZ1wiKS5jc3Moe3dpZHRoOmR9KSxyPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX25leHRcIikuZmluZChcImltZ1wiKS5oZWlnaHQoKSk6KGQ9cCxyPXUpLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLXdyYXBcIikuc3RvcCgpLmFuaW1hdGUoe3dpZHRoOmQsaGVpZ2h0OnJ9LDI1MCxmdW5jdGlvbigpe2MucmVtb3ZlQ2xhc3Moby5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzK1wiIFwiK28ub3B0aW9ucy5nYWxsZXJ5X2FjdGl2ZV9jbGFzcykucmVtb3ZlQXR0cihcInN0eWxlXCIpLGMuZmluZChcImltZ1wiKS5yZW1vdmVBdHRyKFwic3R5bGVcIiksbS5hZGRDbGFzcyhvLnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MrXCIgXCIrby5vcHRpb25zLmdhbGxlcnlfYWN0aXZlX2NsYXNzKS5yZW1vdmVDbGFzcyhcImlzX25leHRcIikuY3NzKFwicG9zaXRpb25cIixcIlwiKSxtLnN0b3AoKS5hbmltYXRlKHtvcGFjaXR5OjF9LDI1MCxmdW5jdGlvbigpe2EodGhpcykucmVtb3ZlQXR0cihcInN0eWxlXCIpLmNzcyh7d2lkdGg6XCIxMDAlXCJ9KSxhKHRoaXMpLmZpbmQoXCJpbWdcIikuY3NzKFwid2lkdGhcIixcIjEwMCVcIiksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0td3JhcFwiKS5yZW1vdmVBdHRyKFwic3R5bGVcIiksby5vcHRpb25zLmFmdGVyX2ltYWdlX2NoYW5nZS5jYWxsKG8sbSl9KSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbVwiKS5yZW1vdmVBdHRyKFwidGFiaW5kZXhcIiksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uXCIrby5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzKS5hdHRyKFwidGFiaW5kZXhcIixcIjBcIikuZm9jdXMoKSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5cIitvLnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MpLmlzKFwiLmdhbGxlcnktaXRlbS0wXCIpP24uc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6MH0sMTUwLGZ1bmN0aW9uKCl7YSh0aGlzKS5oaWRlKCl9KTpuLnN0b3AoKS5jc3Moe2Rpc3BsYXk6XCJibG9ja1wiLG9wYWNpdHk6bi5jc3MoXCJvcGFjaXR5XCIpfSkuYW5pbWF0ZSh7b3BhY2l0eToxfSwxNTApLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLlwiK28ucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcykuaXMoXCIuZ2FsbGVyeS1pdGVtLVwiK2wpP3Muc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6MH0sMTUwLGZ1bmN0aW9uKCl7YSh0aGlzKS5oaWRlKCl9KTpzLnN0b3AoKS5jc3Moe2Rpc3BsYXk6XCJibG9ja1wiLG9wYWNpdHk6bi5jc3MoXCJvcGFjaXR5XCIpfSkuYW5pbWF0ZSh7b3BhY2l0eToxfSwxNTApfSl9KSl9LGNyZWF0ZV92aWRlbzpmdW5jdGlvbihhKXt2YXIgdCxvPXRoaXM7dD0nPGlmcmFtZSBzcmM9XCInK2ErJ1wiIGNsYXNzPVwibW9kYWFsLXZpZGVvLWZyYW1lXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPicsby5idWlsZF9tb2RhbCgnPGRpdiBjbGFzcz1cIm1vZGFhbC12aWRlby1jb250YWluZXJcIj4nK3QrXCI8L2Rpdj5cIil9LGNyZWF0ZV9pZnJhbWU6ZnVuY3Rpb24oYSl7dmFyIHQsbz10aGlzO3Q9bnVsbCE9PW8ub3B0aW9ucy53aWR0aHx8dm9pZCAwIT09by5vcHRpb25zLndpZHRofHxudWxsIT09by5vcHRpb25zLmhlaWdodHx8dm9pZCAwIT09by5vcHRpb25zLmhlaWdodD8nPGlmcmFtZSBzcmM9XCInK2ErJ1wiIGNsYXNzPVwibW9kYWFsLWlmcmFtZS1lbGVtXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPic6JzxkaXYgY2xhc3M9XCJtb2RhYWwtY29udGVudC1jb250YWluZXJcIj5QbGVhc2Ugc3BlY2lmeSBhIHdpZHRoIGFuZCBoZWlnaHQgZm9yIHlvdXIgaWZyYW1lPC9kaXY+JyxvLmJ1aWxkX21vZGFsKHQpfSxtb2RhYWxfb3BlbjpmdW5jdGlvbigpe3ZhciB0PXRoaXMsbz1hKFwiI1wiK3Quc2NvcGUuaWQpLGU9dC5vcHRpb25zLmFuaW1hdGlvbjtcIm5vbmVcIj09PWUmJihvLnJlbW92ZUNsYXNzKFwibW9kYWFsLXN0YXJ0X25vbmVcIiksdC5vcHRpb25zLmFmdGVyX29wZW4uY2FsbCh0LG8pKSxcImZhZGVcIj09PWUmJm8ucmVtb3ZlQ2xhc3MoXCJtb2RhYWwtc3RhcnRfZmFkZVwiKSxcInNsaWRlLWRvd25cIj09PWUmJm8ucmVtb3ZlQ2xhc3MoXCJtb2RhYWwtc3RhcnRfc2xpZGVfZG93blwiKTt2YXIgaT1vO2EoXCIubW9kYWFsLXdyYXBwZXIgKlt0YWJpbmRleD0wXVwiKS5yZW1vdmVBdHRyKFwidGFiaW5kZXhcIiksaT1cImltYWdlXCI9PXQub3B0aW9ucy50eXBlP2EoXCIjXCIrdC5zY29wZS5pZCkuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLlwiK3QucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcyk6by5maW5kKFwiLm1vZGFhbC1pZnJhbWUtZWxlbVwiKS5sZW5ndGg/by5maW5kKFwiLm1vZGFhbC1pZnJhbWUtZWxlbVwiKTpvLmZpbmQoXCIubW9kYWFsLXZpZGVvLXdyYXBcIikubGVuZ3RoP28uZmluZChcIi5tb2RhYWwtdmlkZW8td3JhcFwiKTpvLmZpbmQoXCIubW9kYWFsLWZvY3VzXCIpLGkuYXR0cihcInRhYmluZGV4XCIsXCIwXCIpLmZvY3VzKCksXCJub25lXCIhPT1lJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5vcHRpb25zLmFmdGVyX29wZW4uY2FsbCh0LG8pfSx0Lm9wdGlvbnMuYWZ0ZXJfY2FsbGJhY2tfZGVsYXkpfSxtb2RhYWxfY2xvc2U6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG89YShcIiNcIit0LnNjb3BlLmlkKTt0Lm9wdGlvbnMuYmVmb3JlX2Nsb3NlLmNhbGwodCxvKSxudWxsIT09dC54aHImJih0Lnhoci5hYm9ydCgpLHQueGhyPW51bGwpLFwibm9uZVwiPT09dC5vcHRpb25zLmFuaW1hdGlvbiYmby5hZGRDbGFzcyhcIm1vZGFhbC1zdGFydF9ub25lXCIpLFwiZmFkZVwiPT09dC5vcHRpb25zLmFuaW1hdGlvbiYmby5hZGRDbGFzcyhcIm1vZGFhbC1zdGFydF9mYWRlXCIpLFwic2xpZGUtZG93blwiPT09dC5vcHRpb25zLmFuaW1hdGlvbiYmby5hZGRDbGFzcyhcIm1vZGFhbC1zdGFydF9zbGlkZV9kb3duXCIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcImlubGluZVwiPT10Lm9wdGlvbnMudHlwZSYmYShcIiNcIit0LnNjb3BlLmlkK1wiIC5tb2RhYWwtY29udGVudC1jb250YWluZXJcIikuY29udGVudHMoKS5kZXRhY2goKS5hcHBlbmRUbyh0LnNjb3BlLnNvdXJjZSksby5yZW1vdmUoKSx0Lm9wdGlvbnMuYWZ0ZXJfY2xvc2UuY2FsbCh0KSx0LnNjb3BlLmlzX29wZW49ITF9LHQub3B0aW9ucy5hZnRlcl9jYWxsYmFja19kZWxheSksdC5tb2RhYWxfb3ZlcmxheShcImhpZGVcIiksbnVsbCE9dC5sYXN0Rm9jdXMmJnQubGFzdEZvY3VzLmZvY3VzKCl9LG1vZGFhbF9vdmVybGF5OmZ1bmN0aW9uKHQpe3ZhciBvPXRoaXM7XCJzaG93XCI9PXQ/KG8uc2NvcGUuaXNfb3Blbj0hMCxvLm9wdGlvbnMuYmFja2dyb3VuZF9zY3JvbGx8fG8uZG9tLmFkZENsYXNzKFwibW9kYWFsLW5vc2Nyb2xsXCIpLGEoXCIjXCIrby5zY29wZS5pZCtcIl9vdmVybGF5XCIpLmxlbmd0aDwxJiZvLmRvbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtb2RhYWwtb3ZlcmxheVwiIGlkPVwiJytvLnNjb3BlLmlkKydfb3ZlcmxheVwiPjwvZGl2PicpLGEoXCIjXCIrby5zY29wZS5pZCtcIl9vdmVybGF5XCIpLmNzcyhcImJhY2tncm91bmRcIixvLm9wdGlvbnMuYmFja2dyb3VuZCkuc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6by5vcHRpb25zLm92ZXJsYXlfb3BhY2l0eX0sby5vcHRpb25zLmFuaW1hdGlvbl9zcGVlZCxmdW5jdGlvbigpe28ubW9kYWFsX29wZW4oKX0pKTpcImhpZGVcIj09dCYmYShcIiNcIitvLnNjb3BlLmlkK1wiX292ZXJsYXlcIikuc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6MH0sby5vcHRpb25zLmFuaW1hdGlvbl9zcGVlZCxmdW5jdGlvbigpe2EodGhpcykucmVtb3ZlKCksby5kb20ucmVtb3ZlQ2xhc3MoXCJtb2RhYWwtbm9zY3JvbGxcIil9KX0saXNfdG91Y2g6ZnVuY3Rpb24oKXtyZXR1cm5cIm9udG91Y2hzdGFydFwiaW4gd2luZG93fHxuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHN9fSxlPVtdO2EuZm4ubW9kYWFsPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSl7dmFyIGw9YSh0aGlzKS5kYXRhKFwibW9kYWFsXCIpO2lmKGwpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXN3aXRjaCh0KXtjYXNlXCJvcGVuXCI6bC5jcmVhdGVfbW9kYWFsKGwpO2JyZWFrO2Nhc2VcImNsb3NlXCI6bC5tb2RhYWxfY2xvc2UoKX19ZWxzZXt2YXIgbj1PYmplY3QuY3JlYXRlKG8pO24uaW5pdCh0LHRoaXMpLGEuZGF0YSh0aGlzLFwibW9kYWFsXCIsbiksZS5wdXNoKHtlbGVtZW50OmEodGhpcykuYXR0cihcImNsYXNzXCIpLG9wdGlvbnM6dH0pfX0pfSxhLmZuLm1vZGFhbC5vcHRpb25zPXt0eXBlOlwiaW5saW5lXCIsY29udGVudF9zb3VyY2U6bnVsbCxhbmltYXRpb246XCJmYWRlXCIsYW5pbWF0aW9uX3NwZWVkOjMwMCxhZnRlcl9jYWxsYmFja19kZWxheTozNTAsaXNfbG9ja2VkOiExLGhpZGVfY2xvc2U6ITEsYmFja2dyb3VuZDpcIiMwMDBcIixvdmVybGF5X29wYWNpdHk6XCIwLjhcIixvdmVybGF5X2Nsb3NlOiEwLGFjY2Vzc2libGVfdGl0bGU6XCJEaWFsb2cgV2luZG93XCIsc3RhcnRfb3BlbjohMSxmdWxsc2NyZWVuOiExLGN1c3RvbV9jbGFzczpcIlwiLGJhY2tncm91bmRfc2Nyb2xsOiExLHNob3VsZF9vcGVuOiEwLGNsb3NlX3RleHQ6XCJDbG9zZVwiLGNsb3NlX2FyaWFfbGFiZWw6XCJDbG9zZSAoUHJlc3MgZXNjYXBlIHRvIGNsb3NlKVwiLHdpZHRoOm51bGwsaGVpZ2h0Om51bGwsYmVmb3JlX29wZW46ZnVuY3Rpb24oKXt9LGFmdGVyX29wZW46ZnVuY3Rpb24oKXt9LGJlZm9yZV9jbG9zZTpmdW5jdGlvbigpe30sYWZ0ZXJfY2xvc2U6ZnVuY3Rpb24oKXt9LHNvdXJjZTpmdW5jdGlvbihhLHQpe3JldHVybiB0fSxjb25maXJtX2J1dHRvbl90ZXh0OlwiQ29uZmlybVwiLGNvbmZpcm1fY2FuY2VsX2J1dHRvbl90ZXh0OlwiQ2FuY2VsXCIsY29uZmlybV90aXRsZTpcIkNvbmZpcm0gVGl0bGVcIixjb25maXJtX2NvbnRlbnQ6XCI8cD5UaGlzIGlzIHRoZSBkZWZhdWx0IGNvbmZpcm0gZGlhbG9nIGNvbnRlbnQuIFJlcGxhY2UgbWUgdGhyb3VnaCB0aGUgb3B0aW9uczwvcD5cIixjb25maXJtX2NhbGxiYWNrOmZ1bmN0aW9uKCl7fSxjb25maXJtX2NhbmNlbF9jYWxsYmFjazpmdW5jdGlvbigpe30sZ2FsbGVyeV9hY3RpdmVfY2xhc3M6XCJnYWxsZXJ5X2FjdGl2ZV9pdGVtXCIsb3V0ZXJfY29udHJvbHM6ITEsYmVmb3JlX2ltYWdlX2NoYW5nZTpmdW5jdGlvbihhLHQpe30sYWZ0ZXJfaW1hZ2VfY2hhbmdlOmZ1bmN0aW9uKGEpe30sbG9hZGluZ19jb250ZW50Oic8ZGl2IGNsYXNzPVwibW9kYWFsLWxvYWRpbmctc3Bpbm5lclwiPjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PC9kaXY+Jyxsb2FkaW5nX2NsYXNzOlwiaXNfbG9hZGluZ1wiLGFqYXhfZXJyb3JfY2xhc3M6XCJtb2RhYWwtZXJyb3JcIixhamF4X3N1Y2Nlc3M6ZnVuY3Rpb24oKXt9LGluc3RhZ3JhbV9pZDpudWxsfSxhKGZ1bmN0aW9uKCl7dmFyIG89YShcIi5tb2RhYWxcIik7by5sZW5ndGgmJm8uZWFjaChmdW5jdGlvbigpe3QoYSh0aGlzKSl9KTt2YXIgaT1uZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihvKXtvLmZvckVhY2goZnVuY3Rpb24obyl7aWYoby5hZGRlZE5vZGVzJiZvLmFkZGVkTm9kZXMubGVuZ3RoPjApe1tdLnNvbWUuY2FsbChvLmFkZGVkTm9kZXMsZnVuY3Rpb24obyl7dmFyIGk9YShvKTsoaS5pcyhcImFcIil8fGkuaXMoXCJidXR0b25cIikpJiYoaS5oYXNDbGFzcyhcIm1vZGFhbFwiKT90KGkpOmUuZm9yRWFjaChmdW5jdGlvbih0KXtpZih0LmVsZW1lbnQ9PWkuYXR0cihcImNsYXNzXCIpKXJldHVybiBhKGkpLm1vZGFhbCh0Lm9wdGlvbnMpLCExfSkpfSl9fSl9KSxsPXtzdWJ0cmVlOiEwLGF0dHJpYnV0ZXM6ITAsY2hpbGRMaXN0OiEwLGNoYXJhY3RlckRhdGE6ITB9O3NldFRpbWVvdXQoZnVuY3Rpb24oKXtpLm9ic2VydmUoZG9jdW1lbnQuYm9keSxsKX0sNTAwKX0pfShqUXVlcnksd2luZG93LGRvY3VtZW50KTtcbiIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRkb2N1bWVudC5ib2R5LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG59ICk7XG4iXX0=
