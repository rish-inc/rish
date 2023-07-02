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
  // const modaalmincss = require( './modaal/css/modaal.min.css' );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9lZmZlY3QuanMiLCJzcmMvc2NyaXB0cy9pbmZpbml0ZXNsaWRldjIuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvbW9kYWFsL2pzL21vZGFhbC5taW4uanMiLCJzcmMvc2NyaXB0cy9wYWdlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsTUFBTSxDQUFFLFVBQVUsQ0FBQyxFQUFHO0VBQ3JCO0FBQ0Q7QUFDQTtFQUNDLENBQUMsQ0FBRSx5QkFBeUIsQ0FBRSxDQUFDLGFBQWEsQ0FBRTtJQUM3QyxXQUFXLEVBQUssTUFBTTtJQUN0QixPQUFPLEVBQVMsRUFBRTtJQUNsQixjQUFjLEVBQUUsSUFBSTtJQUNwQixPQUFPLEVBQVMsQ0FBQztJQUNqQixZQUFZLEVBQUk7RUFDakIsQ0FBQyxDQUFFO0VBQ0gsQ0FBQyxDQUFFLDBCQUEwQixDQUFFLENBQUMsYUFBYSxDQUFFO0lBQzlDLFdBQVcsRUFBSyxPQUFPO0lBQ3ZCLE9BQU8sRUFBUyxFQUFFO0lBQ2xCLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLE9BQU8sRUFBUyxDQUFDO0lBQ2pCLFlBQVksRUFBSTtFQUNqQixDQUFDLENBQUU7O0VBRUg7QUFDRDtBQUNBO0VBQ0MsQ0FBQyxDQUFFLFVBQVUsQ0FBRSxDQUFDLE1BQU0sQ0FBRztJQUN4QixJQUFJLEVBQUUsT0FBTztJQUNiLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFVBQVUsRUFBRTtFQUNiLENBQUMsQ0FBRTtBQUNKLENBQUMsQ0FBRTs7Ozs7QUM1Qkg7QUFDQTs7QUFHQSxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVc7RUFDMUIsUUFBUSxDQUFDLGdCQUFnQixDQUFFLEtBQUssQ0FBRSxDQUFDLE9BQU8sQ0FBRSxVQUFVLEVBQUUsRUFB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QUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxvQkFBb0IsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsTUFBTSxLQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxNQUFNLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsVUFBVSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUMsT0FBTyxLQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLGdCQUFnQixHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxNQUFNLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsVUFBVSxHQUFDLE1BQU0sS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFHLENB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QUFJLENBQUMsR0FBQztNQUFDLElBQUksRUFBQyxjQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7UUFBQyxJQUFJLENBQUMsR0FBQyxJQUFJO1FBQUMsSUFBRyxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQztVQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7VUFBQyxFQUFFLEVBQUMsU0FBUyxHQUFFLElBQUksSUFBSSxHQUFFLE9BQU8sRUFBRSxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztVQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBQztVQUFDLFlBQVksRUFBQztRQUFXLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLElBQUksRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBRSxTQUFTLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFV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LElBQUksQ0FBQyxHQUFDLElBQUk7UUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFDLFVBQVMsQ0FBQyxFQUFDO1VBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU87WUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU07VUFBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUFBLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBQyxVQUFTLENBQUMsRUFBQztVQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPO1lBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNO1VBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFFLEVBQUUsSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQyxJQUFFLEtBQUssQ0FBQyxDQUFDLFlBQVksRUFBRSxHQUFDLE9BQU8sSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBRSxFQUFFLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE1BQUssRUFBRSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFFLEtBQUssQ0FBQztRQUFBLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBQyxVQUFTLENBQUMsRUFBQztVQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1VBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsSUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxZQUFZLEVBQUU7VUFBQyxJQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEVBQUU7VUFBQyxJQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMseUJBQXlCLENBQUMsRUFBQztZQUFDLElBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQztZQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUMsTUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLHNCQUFzQixDQUFDLElBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztVQUFBO1FBQUMsQ0FBQyxDQUFDO01BQUEsQ0FBQztNQUFDLFdBQVcsRUFBQyxxQkFBUyxDQUFDLEVBQUM7UUFBQyxJQUFJLENBQUMsR0FBQyxJQUFJO1VBQUMsQ0FBQyxHQUFDLEVBQUU7UUFBQyxXQUFXLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUcsQ0FBQyxHQUFDLG1CQUFtQixDQUFDO1FBQUMsSUFBSSxDQUFDO1VBQUMsQ0FBQyxHQUFDLE9BQU8sSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksR0FBQyxtQkFBbUIsR0FBQyxnQkFBZ0I7UUFBQyxRQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUztVQUFFLEtBQUksTUFBTTtZQUFDLENBQUMsR0FBQyxvQkFBb0I7WUFBQztVQUFNLEtBQUksWUFBWTtZQUFDLENBQUMsR0FBQyx5QkFBeUI7WUFBQztVQUFNO1lBQVEsQ0FBQyxHQUFDLG9CQUFvQjtRQUFBO1FBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRTtRQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFHLENBQUMsR0FBQyxvQkFBb0IsQ0FBQyxFQUFDLEVBQUUsS0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFBQyxJQUFJLENBQUMsR0FBQyxFQUFFO1FBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUUsUUFBUSxJQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUUsUUFBUSxJQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLG9CQUFvQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLFlBQVksR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxvQkFBb0IsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBRSxRQUFRLElBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUMsb0JBQW9CLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFFLFFBQVEsSUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFHLENBQUMsR0FBQyxpQkFBaUIsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxvQkFBb0IsQ0FBQyxFQUFDLENBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFFLE9BQU8sSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBRSxXQUFXLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLE1BQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQztRQUFDLElBQUksQ0FBQyxHQUFDLEVBQUU7UUFBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUcsQ0FBQyxHQUFDLDBCQUEwQixDQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsb0NBQW9DLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLHVFQUF1RSxHQUFDLENBQUMsR0FBQyxHQUFHO1FBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFHLENBQUMsSUFBRSwrQkFBK0IsR0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxJQUFFLGNBQWMsR0FBQyxDQUFDLEdBQUMsaURBQWlELEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBQyxrQkFBa0IsRUFBQyxRQUFRLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUMsQ0FBQyxJQUFFLDhEQUE4RCxHQUFDLENBQUMsSUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBQyxPQUFPLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUcsQ0FBQyxJQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUMsSUFBRSxRQUFRLEVBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsSUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLFFBQVEsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyw0QkFBNEIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO01BQUEsQ0FBQztNQUFDLFlBQVksRUFBQyx3QkFBVTtRQUFDLElBQUksQ0FBQyxHQUFDLElBQUk7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUU7UUFBQyxDQUFDLENBQUMsTUFBTSxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFFLENBQUMsR0FBQyxxRUFBcUUsRUFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztNQUFBLENBQUM7TUFBQyxnQkFBZ0IsRUFBQyw0QkFBVTtRQUFDLElBQUksQ0FBQyxHQUFDLElBQUk7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZO1VBQUMsQ0FBQyxHQUFDLEVBQUU7VUFBQyxDQUFDLEdBQUMsZ0ZBQWdGO1FBQUMsSUFBRyxDQUFDLENBQUMsV0FBVyxDQUFDLHNDQUFzQyxJQUFFLEVBQUUsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFDLFFBQVEsQ0FBQyxFQUFDLEVBQUUsSUFBRSxDQUFDLElBQUUsSUFBSSxLQUFHLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLEVBQUM7VUFBQyxJQUFJLENBQUMsR0FBQyxnREFBZ0QsR0FBQyxDQUFDLEdBQUMsR0FBRztVQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFBQyxHQUFHLEVBQUMsQ0FBQztZQUFDLFFBQVEsRUFBQyxPQUFPO1lBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUFDLE9BQU8sRUFBQyxpQkFBUyxDQUFDLEVBQUM7Y0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyw4REFBOEQsR0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBQyxNQUFNLENBQUM7Y0FBQyxJQUFJLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsNEJBQTRCO2NBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLElBQUUsVUFBVSxDQUFDLFlBQVU7Z0JBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFO2NBQUEsQ0FBQyxFQUFDLEdBQUcsQ0FBQztZQUFBLENBQUM7WUFBQyxLQUFLLEVBQUMsaUJBQVU7Y0FBQyxDQUFDLEdBQUMsQ0FBQztjQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsNEJBQTRCLENBQUM7Y0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUE7VUFBQyxDQUFDLENBQUM7UUFBQSxDQUFDLE1BQUssQ0FBQyxHQUFDLENBQUM7UUFBQyxPQUFNLENBQUMsQ0FBQztNQUFBLENBQUM7TUFBQyxVQUFVLEVBQUMsb0JBQVMsQ0FBQyxFQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSTtRQUFDLElBQUksSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixLQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEdBQUMsZUFBZSxDQUFDLEVBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsc0NBQXNDLElBQUUsRUFBRSxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQztVQUFDLE9BQU8sRUFBQyxpQkFBUyxDQUFDLEVBQUM7WUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDO1lBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztVQUFBLENBQUM7VUFBQyxLQUFLLEVBQUMsZUFBUyxDQUFDLEVBQUM7WUFBQyxJQUFHLE9BQU8sSUFBRSxDQUFDLENBQUMsVUFBVSxFQUFDO2NBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyw0QkFBNEIsQ0FBQztjQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscUVBQXFFLENBQUMsQ0FBQztZQUFBO1VBQUM7UUFBQyxDQUFDLENBQUM7TUFBQSxDQUFDO01BQUMsY0FBYyxFQUFDLDBCQUFVO1FBQUMsSUFBSSxDQUFDO1VBQUMsQ0FBQyxHQUFDLElBQUk7UUFBQyxDQUFDLEdBQUMsOERBQThELEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUMsMkNBQTJDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUMseUhBQXlILEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBQyw4RkFBOEYsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLDBCQUEwQixHQUFDLDZCQUE2QixFQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO01BQUEsQ0FBQztNQUFDLFlBQVksRUFBQyx3QkFBVTtRQUFDLElBQUksQ0FBQztVQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsSUFBSTtVQUFDLENBQUMsR0FBQyxFQUFFO1FBQUMsSUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBQztVQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsZUFBZSxHQUFDLENBQUMsR0FBQyxJQUFJLEdBQUMsUUFBUSxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUM7VUFBQyxDQUFDLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUM7VUFBQyxJQUFJLENBQUMsR0FBQyxFQUFFO1VBQUMsQ0FBQyxHQUFDLHdDQUF3QyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRTtjQUFDLENBQUMsR0FBQyxFQUFFO2NBQUMsQ0FBQyxHQUFDLEVBQUU7Y0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2NBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztjQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDO2NBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUM7WUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUUsQ0FBQyxHQUFDLCtEQUErRCxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsSUFBRSxDQUFDLElBQUUsSUFBSSxLQUFHLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsK0VBQStFLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLFlBQVksR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxHQUFDLFFBQVEsSUFBRSxDQUFDLEdBQUMsK0VBQStFLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLGVBQWUsRUFBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUM7Y0FBQyxHQUFHLEVBQUMsQ0FBQztjQUFDLEdBQUcsRUFBQyxDQUFDO2NBQUMsT0FBTyxFQUFDLENBQUM7Y0FBQyxJQUFJLEVBQUMsQ0FBQztjQUFDLE1BQU0sRUFBQyxDQUFDO2NBQUMsU0FBUyxFQUFDO1lBQUMsQ0FBQztZQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1VBQUEsQ0FBQyxDQUFDO1VBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFBQyxJQUFJLENBQUMsR0FBQyxFQUFFO2NBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsUUFBUSxHQUFDLENBQUMsR0FBQyxpQkFBaUI7WUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFHLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsK0JBQStCO1lBQUMsQ0FBQyxJQUFFLCtDQUErQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsZ0JBQWdCLEdBQUMsQ0FBQyxHQUFDLElBQUksR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxRQUFRO1VBQUE7VUFBQyxDQUFDLElBQUUsUUFBUSxFQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFBQSxDQUFDLE1BQUk7VUFBQyxJQUFJLENBQUM7WUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJ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QyxFQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxTQUFTLElBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7TUFBQSxDQUFDO01BQUMsY0FBYyxFQUFDLHdCQUFTLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxHQUFDLElBQUk7UUFBQyxNQUFNLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0NBQWtDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsa0JBQWtCLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7VUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUFlLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBQyxZQUFVO1VBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtRQUFBLENBQUMsQ0FBQyxJQUFFLE1BQU0sSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7VUFBQyxPQUFPLEVBQUM7UUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUMsWUFBVTtVQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztRQUFBLENBQUMsQ0FBQztNQUFBLENBQUM7TUFBQyxRQUFRLEVBQUMsb0JBQVU7UUFBQyxPQUFNLGNBQWMsSUFBRyxNQUFNLElBQUUsU0FBUyxDQUFDLGNBQWM7TUFBQTtJQUFDLENBQUM7SUFBQyxDQUFDLEdBQUMsRUFBRTtFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0lBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBQyxFQUFDO01BQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7TUFBQyxJQUFHLENBQUMsRUFBQztRQUFDLElBQUcsUUFBUSxJQUFFLE9BQU8sQ0FBQyxFQUFDLFFBQU8sQ0FBQztVQUFFLEtBQUksTUFBTTtZQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQUM7VUFBTSxLQUFJLE9BQU87WUFBQyxDQUFDLENBQUMsWUFBWSxFQUFFO1FBQUE7TUFBQyxDQUFDLE1BQUk7UUFBQyxJQUFJLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1VBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1VBQUMsT0FBTyxFQUFDO1FBQUMsQ0FBQyxDQUFDO01BQUE7SUFBQyxDQUFDLENBQUM7RUFBQSxDQUFDLEVBQUMsQ0FBQyxD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QUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUM7Y0FBQSxDQUFDLENBQUMsQ0FBQztZQUFBLENBQUMsQ0FBQztVQUFBO1FBQUMsQ0FBQyxDQUFDO01BQUEsQ0FBQyxDQUFDO01BQUMsQ0FBQyxHQUFDO1FBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7UUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO1FBQUMsYUFBYSxFQUFDLENBQUM7TUFBQyxDQUFDO0lBQUMsVUFBVSxDQUFDLFlBQVU7TUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQyxFQUFDLEdBQUcsQ0FBQztFQUFBLENBQUMsQ0FBQztBQUFBLENBQUMsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQzs7Ozs7QUNMcnVuQixNQUFNLENBQUMsZ0JBQWdCLENBQUUsTUFBTSxFQUFFLFlBQVc7RUFDM0MsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVM7QUFDM0MsQ0FBQyxDQUFFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwialF1ZXJ5KCBmdW5jdGlvbiggJCApIHtcblx0Lypcblx0ICogaW5maW5pdGVzbGlkZVxuXHQgKi9cblx0JCggJy5qcy1pbmZpbml0ZXNsaWRlLS1sZWZ0JyApLmluZmluaXRlc2xpZGUoIHtcblx0XHQnZGlyZWN0aW9uJyAgIDogJ2xlZnQnLFxuXHRcdCdzcGVlZCcgICAgICAgOiAyMCxcblx0XHQncGF1c2VvbmhvdmVyJzogdHJ1ZSxcblx0XHQnY2xvbmUnICAgICAgIDogMixcblx0XHQncmVzcG9uc2l2ZScgIDogdHJ1ZSxcblx0fSApO1xuXHQkKCAnLmpzLWluZmluaXRlc2xpZGUtLXJpZ2h0JyApLmluZmluaXRlc2xpZGUoIHtcblx0XHQnZGlyZWN0aW9uJyAgIDogJ3JpZ2h0Jyxcblx0XHQnc3BlZWQnICAgICAgIDogMjAsXG5cdFx0J3BhdXNlb25ob3Zlcic6IHRydWUsXG5cdFx0J2Nsb25lJyAgICAgICA6IDIsXG5cdFx0J3Jlc3BvbnNpdmUnICA6IHRydWUsXG5cdH0gKTtcblxuXHQvKlxuXHQgKiBNb2RhYWxcblx0ICovXG5cdCQoICcuZ2FsbGVyeScgKS5tb2RhYWwgKCB7XG5cdFx0dHlwZTogJ2ltYWdlJyxcblx0XHRiYWNrZ3JvdW5kOiAnI2ZmZicsXG5cdFx0b3ZlcmxheV9vcGFjaXR5OiAnMC41Jyxcblx0XHRmdWxsc2NyZWVuOiB0cnVlXG5cdH0gKTtcbn0gKTsiLCIvLyBjb25zdCBtdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcubXYnICk7XG4vLyBtdi5jbGFzc0xpc3QuYWRkKCAnaXMtZmFkZS1pbicgKTtcblxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcubXYnICkuZm9yRWFjaCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmNsYXNzTGlzdC5hZGQoICdpcy1mYWRlLWluJyApO1xuXHR9ICk7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcucC1sb2dvLS1oZWFkZXInICkuZm9yRWFjaCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmNsYXNzTGlzdC5hZGQoICdpcy1mYWRlLWluJyApO1xuXHR9ICk7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdib2R5JyApLmNsYXNzTGlzdC5hZGQoICdpcy1mYWRlLWluJyApO1xuXHRzY3JvbGxFZmZlY3QoKTtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCBmdW5jdGlvbigpIHtcblx0XHRzY3JvbGxFZmZlY3QoKTtcblx0fSApO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxFZmZlY3QoKSB7XG5cdGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5pcy1mYWRlJyApO1xuXG5cdGZvciAoIGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrICkge1xuXHRcdGxldCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG5cdFx0bGV0IHBvc2l0aW9uRnJvbVRvcCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuXHRcdGxldCBzY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblx0XHRsZXQgd2luZG93SCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuXHRcdGlmICggc2Nyb2xsID4gcG9zaXRpb25Gcm9tVG9wIC0gd2luZG93SCApIHtcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2lzLXNjcm9sbCcgKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8qXG5pbmZpbml0ZXNsaWRlLmpzIHYyXG52ZXJzaW9uOiAyLjAuMVxuQXV0aG9yOiBULk1vcmltb3RvXG5cbkNvcHlyaWdodCAyMDE3LCBULk1vcmltb3RvXG4qIEZyZWUgdG8gdXNlIGFuZCBhYnVzZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4qIC8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4vL2dpdGh1Yi5jb20vd29vZHJvb3RzL2luZmluaXRlc2xpZGV2MlxuKi9cblxuKGZ1bmN0aW9uKCQpe1xuXHQkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcblx0ICAgIHdpbmRvdy5sb2FkZWQgPSB0cnVlO1xuXHR9KTtcblx0JChmdW5jdGlvbigpe1xuXHRcdCQuZm4uaW5maW5pdGVzbGlkZSA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRcdFx0Ly9vcHRpb25cblx0XHRcdHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0J3NwZWVkJzogMTAwLCAvL+mAn+OBleOAgOWNmOS9jeOBr3B4L+enkuOBp+OBmeOAglxuXHRcdFx0XHQnZGlyZWN0aW9uJzogJ2xlZnQnLCAvL3VwL2Rvd24vbGVmdC9yaWdodOOBi+OCiemBuOaKnlxuXHRcdFx0XHQncGF1c2VvbmhvdmVyJzogdHJ1ZSwgLy/jg57jgqbjgrnjgqrjg7zjg5Djg7zjgafjgrnjg4jjg4Pjg5dcblx0XHRcdFx0J3Jlc3BvbnNpdmUnOiBmYWxzZSwgLy/lrZDopoHntKDjga7luYXjgpIl44Gn5oyH5a6a44GX44Gm44GE44KL44Go44GNXG5cdFx0XHRcdCdjbG9uZSc6IDFcblx0XHRcdH0sb3B0aW9ucyk7XG5cblx0XHRcdHZhciBzZXRDc3MgPSBmdW5jdGlvbihvYmosZGlyZWN0aW9uKXtcblx0XHRcdFx0JChvYmopLndyYXAoJzxkaXYgY2xhc3M9XCJpbmZpbml0ZXNsaWRlX3dyYXBcIj48L2Rpdj4nKS5wYXJlbnQoKS5jc3Moe1xuXHRcdFx0XHRcdG92ZXJmbG93OiAnaGlkZGVuJ1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZihkaXJlY3Rpb24gPT0gJ3VwJyB8fCBkaXJlY3Rpb24gPT0gJ2Rvd24nKXtcblx0XHRcdFx0XHR2YXIgZCA9ICdjb2x1bW4nO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBkID0gJ3Jvdyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKG9iaikuY3NzKHtcblx0XHRcdFx0XHRkaXNwbGF5OiAnZmxleCcsXG5cdFx0XHRcdFx0ZmxleFdyYXA6ICdub3dyYXAnLFxuXHRcdFx0XHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxuXHRcdFx0XHRcdCctbXMtZmxleC1hbGlnbic6ICdjZW50ZXInLFxuXHRcdFx0XHRcdGZsZXhEaXJlY3Rpb246IGRcblx0XHRcdFx0fSkuY2hpbGRyZW4oKS5jc3Moe1xuXHRcdFx0XHRcdFx0ZmxleDogJ25vbmUnLFxuXHRcdFx0XHRcdFx0ZGlzcGxheTogJ2Jsb2NrJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc2V0Q2xvbmUgPSBmdW5jdGlvbihvYmosY2xvbmUpe1xuXHRcdFx0XHR2YXIgJGNsb25lID0gJChvYmopLmNoaWxkcmVuKCkuY2xvbmUodHJ1ZSkuYWRkQ2xhc3MoJ2luZmluaXRlc2xpZGVfY2xvbmUnKTtcblx0XHRcdFx0dmFyIGkgPSAxO1xuXHRcdFx0XHR3aGlsZShpIDw9IGNsb25lKXtcblx0XHRcdFx0XHQkY2xvbmUuY2xvbmUodHJ1ZSkuYXBwZW5kVG8oJChvYmopKTtcblx0XHRcdFx0XHRpKys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIGdldFdpZHRoID0gZnVuY3Rpb24ob2JqKXtcblx0XHRcdFx0dmFyIHcgPSAwO1xuXHRcdFx0XHQkKG9iaikuY2hpbGRyZW4oJzpub3QoLmluZmluaXRlc2xpZGVfY2xvbmUpJykuZWFjaChmdW5jdGlvbihrZXksdmFsdWUpe1xuXHRcdFx0XHRcdHcgPSB3ICsgJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHc7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZ2V0SGVpZ2h0ID0gZnVuY3Rpb24ob2JqKXtcblx0XHRcdFx0dmFyIGggPSAwO1xuXHRcdFx0XHQkKG9iaikuY2hpbGRyZW4oJzpub3QoLmluZmluaXRlc2xpZGVfY2xvbmUpJykuZWFjaChmdW5jdGlvbihrZXksdmFsdWUpe1xuXHRcdFx0XHRcdGggPSBoICsgJCh0aGlzKS5vdXRlckhlaWdodCh0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBoO1xuXHRcdFx0fVxuXG5cblx0XHRcdHZhciBnZXRTcGVlZCA9IGZ1bmN0aW9uKGwscyl7XG5cdFx0XHRcdHJldHVybiBsIC8gcztcblx0XHRcdH1cblx0XHRcdHZhciBnZXROdW0gPSBmdW5jdGlvbihvYmosZGlyZWN0aW9uKXtcblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICd1cCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0dmFyIG51bSA9IGdldEhlaWdodChvYmopO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBudW0gPSBnZXRXaWR0aChvYmopO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudW07XG5cdFx0XHR9XG5cblx0XHRcdHZhciBnZXRUcmFuc2xhdGUgPSBmdW5jdGlvbihudW0sZGlyZWN0aW9uKXtcblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICd1cCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0dmFyIGkgPSAnMCwtJyArIG51bSArICdweCwwJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgaSA9ICctJyArIG51bSArICdweCwwLDAnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc2V0QW5pbSA9IGZ1bmN0aW9uKG9iaixpZCxkaXJlY3Rpb24sc3BlZWQpe1xuXHRcdFx0XHR2YXIgbnVtID0gZ2V0TnVtKG9iaixkaXJlY3Rpb24pO1xuXHRcdFx0XHRpZihkaXJlY3Rpb24gPT0gJ3VwJyB8fCBkaXJlY3Rpb24gPT0gJ2Rvd24nKXtcblx0XHRcdFx0XHQkKG9iaikucGFyZW50KCcuaW5maW5pdGVzbGlkZV93cmFwJykuY3NzKHtcblx0XHRcdFx0XHRcdGhlaWdodDogbnVtICsgJ3B4J1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBpID0gZ2V0VHJhbnNsYXRlKG51bSxkaXJlY3Rpb24pO1xuXG5cdFx0XHRcdCQob2JqKS5hdHRyKCdkYXRhLXN0eWxlJywnaW5maW5pdGVzbGlkZScgKyBpZCk7XG5cblx0XHRcdFx0dmFyIGNzcyA9ICdAa2V5ZnJhbWVzIGluZmluaXRlc2xpZGUnICsgaWQgKyAneycgK1xuXHRcdFx0XHRcdFx0XHRcdCdmcm9tIHt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO30nICtcblx0XHRcdFx0XHRcdFx0XHQndG8ge3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgnICsgaSArICcpO30nICtcblx0XHRcdFx0XHRcdFx0J30nO1xuXHRcdFx0XHQkKCc8c3R5bGUgLz4nKS5hdHRyKCdpZCcsJ2luZmluaXRlc2xpZGUnICsgaWQgKyAnX3N0eWxlJylcblx0XHRcdFx0Lmh0bWwoY3NzKVxuXHRcdFx0XHQuYXBwZW5kVG8oJ2hlYWQnKTtcblxuXHRcdFx0XHRpZihkaXJlY3Rpb24gPT0gJ3JpZ2h0JyB8fCBkaXJlY3Rpb24gPT0gJ2Rvd24nKXtcblx0XHRcdFx0XHR2YXIgcmV2ZXJzZSA9ICcgcmV2ZXJzZSc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIHJldmVyc2UgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCQob2JqKS5jc3Moe1xuXHRcdFx0XHRcdGFuaW1hdGlvbjogJ2luZmluaXRlc2xpZGUnICsgaWQgKyAnICcgKyBnZXRTcGVlZChudW0sc3BlZWQpICsgJ3MgbGluZWFyIDBzIGluZmluaXRlJyArIHJldmVyc2Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgc2V0U3RvcCA9IGZ1bmN0aW9uKG9iail7XG5cdFx0XHRcdCQob2JqKS5vbignbW91c2VlbnRlcicsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XG5cdFx0XHRcdFx0XHRhbmltYXRpb25QbGF5U3RhdGU6ICdwYXVzZWQnXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pLm9uKCdtb3VzZWxlYXZlJyxmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCQodGhpcykuY3NzKHtcblx0XHRcdFx0XHRcdGFuaW1hdGlvblBsYXlTdGF0ZTogJ3J1bm5pbmcnXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc2V0UmVzcG9uc2l2ZSA9IGZ1bmN0aW9uKG9iaixkaXJlY3Rpb24pe1xuXHRcdFx0XHRcdHZhciBudW0gPSBnZXROdW0ob2JqLGRpcmVjdGlvbik7XG5cdFx0XHRcdFx0dmFyIGkgPSBnZXRUcmFuc2xhdGUobnVtLGRpcmVjdGlvbik7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH07XG5cblxuXG5cblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oa2V5LHZhbHVlKXtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIG51bSA9IERhdGUubm93KCkgKyBNYXRoLmZsb29yKDEwMDAwKk1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKDE2KTtcblx0XHRcdFx0aWYoc2V0dGluZ3MucGF1c2VvbmhvdmVyID09IHRydWUpe1xuXHRcdFx0XHRcdHNldFN0b3AoJHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBfb25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRzZXRDc3MoJHRoaXMsc2V0dGluZ3MuZGlyZWN0aW9uKTtcblx0XHRcdFx0XHRzZXRDbG9uZSgkdGhpcyxzZXR0aW5ncy5jbG9uZSk7XG5cdFx0XHRcdFx0c2V0QW5pbSgkdGhpcyxudW0sc2V0dGluZ3MuZGlyZWN0aW9uLHNldHRpbmdzLnNwZWVkKTtcblxuXHRcdFx0XHRcdGlmKHNldHRpbmdzLnJlc3BvbnNpdmUpe1xuXHRcdFx0XHRcdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdHZhciBpID0gc2V0UmVzcG9uc2l2ZSgkdGhpcyxzZXR0aW5ncy5kaXJlY3Rpb24pO1xuXHRcdFx0XHRcdFx0XHR2YXIgc3R5bGVpZCA9ICR0aGlzLmF0dHIoJ2RhdGEtc3R5bGUnKTtcblx0XHRcdFx0XHRcdFx0dmFyIHN0eWxlaHRtbCA9ICQoJyMnICsgc3R5bGVpZCArICdfc3R5bGUnKS5odG1sKCk7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHN0eWxlaHRtbF9uZXcgPSBzdHlsZWh0bWwucmVwbGFjZSgvdG8ge3RyYW5zZm9ybTp0cmFuc2xhdGUzZFxcKCguKj8pXFwpLywndG8ge3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgnICsgaSArICcpJyk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnICsgc3R5bGVpZCArICdfc3R5bGUnKS5odG1sKHN0eWxlaHRtbF9uZXcpO1xuXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0aWYgKHdpbmRvdy5sb2FkZWQpIHtcblx0XHRcdFx0XHRfb25sb2FkKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uKCdsb2FkJywgX29ubG9hZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0fVxuXHR9KTtcbn0pKGpRdWVyeSk7XG4iLCJqUXVlcnkoIGZ1bmN0aW9uKCAkICkge1xuICAgIC8vIGNvbnN0IG1vZGFhbG1pbmNzcyA9IHJlcXVpcmUoICcuL21vZGFhbC9jc3MvbW9kYWFsLm1pbi5jc3MnICk7XG4gICAgY29uc3QgcGFnZWxvYWQgPSByZXF1aXJlKCAnLi9wYWdlbG9hZC5qcycgKTtcbiAgICBjb25zdCBlZmZlY3QgPSByZXF1aXJlKCAnLi9lZmZlY3QuanMnICk7XG4gICAgY29uc3Qgc2xpZGUgPSByZXF1aXJlKCAnLi9pbmZpbml0ZXNsaWRldjIuanMnICk7XG4gICAgY29uc3QgbW9kYWFsbWluanMgPSByZXF1aXJlKCAnLi9tb2RhYWwvanMvbW9kYWFsLm1pbi5qcycgKTtcbiAgICBjb25zdCBjb25maWcgPSByZXF1aXJlKCAnLi9jb25maWcuanMnICk7XG5cblx0Ly8g44OP44Oz44OQ44O844Ks44O844Oc44K/44Oz44Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgJCgnLnAtaGVhZGVyX19idXR0b24nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oJ3NwYW4nKS50b2dnbGVDbGFzcygnb3BlbicpO1xuXHRcdCQoJyNtZW51LWhlYWRlci1tZW51JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICB9KTtcblxuICAgIC8vIOimquODoeODi+ODpeODvOOBruOCr+ODquODg+OCr+WHpueQhlxuICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oJ2EnKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCcuc3ViLW1lbnUnKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcjbWVudS1oZWFkZXItbWVudScpLnRvZ2dsZUNsYXNzKCdpcy1sb25nJyk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyDopqrjg6Hjg4vjg6Xjg7zjga7lpJblgbTjgpLjgq/jg6rjg4Pjgq/jgZfjgZ/jgajjgY3jgIHjgq/jg6njgrnlkI3jgpLliYrpmaRcbiAgICAgICAgaWYoISQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbignYScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmNoaWxkcmVuKCcuc3ViLW1lbnUnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgJCgnI21lbnUtaGVhZGVyLW1lbnUnKS5yZW1vdmVDbGFzcygnaXMtbG9uZycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDnlLvpnaLjgYzjg6rjgrXjgqTjgrrjgZXjgozjgZ/jgajjgY3jgIHlhajjgabjga7jgq/jg6njgrnlkI3jgpLliYrpmaRcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJy5wLWhlYWRlcl9fYnV0dG9uJykuY2hpbGRyZW4oJ3NwYW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdCQoJyNtZW51LWhlYWRlci1tZW51JykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbignYScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJy5zdWItbWVudScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQoJyNtZW51LWhlYWRlci1tZW51JykucmVtb3ZlQ2xhc3MoJ2lzLWxvbmcnKTtcbiAgICB9KTtcblxuICAgIC8vIFBD44K144Kk44K6KOKAuynku6XkuIrjga7jgajjgY3jgIExMDBweOOCueOCr+ODreODvOODq+OBl+OBn+OCiUdvIHRvIFRvcOODnOOCv+ODs+OCkuihqOekulxuICAgIC8vIOKAu+OCueOCr+ODreODvOODq+ODkOODvOOBruW5heOCkuWKoOWRs+OBl+OBpig3NjgtMTcpcHjjgafmjIflrppcbiAgICB2YXIgcGFnZXRvcCA9ICQoJy5wLWdvLXRvLXRvcCcpO1xuICAgIHBhZ2V0b3AuaGlkZSgpO1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd2luZG93U2l6ZSA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICBpZiAod2luZG93U2l6ZSA+PSA3NTEpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgcGFnZXRvcC5mYWRlSW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFnZXRvcC5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgJCgnLnAtZ28tdG8tdG9wX19pY29uJykucmVtb3ZlQ2xhc3MoJ2lzLW91dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gR28gdG8gVG9w44Oc44K/44Oz44Gu44Kv44Oq44OD44Kv5Yem55CGXG4gICAgcGFnZXRvcC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LCAzMDApOyAgLy8gMC4z56eS44GL44GR44Gm44OI44OD44OX44G456e75YuVXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8vIEdvIHRvIFRvcOODnOOCv+ODs+OBrmhvdmVy5Yem55CGXG4gICAgJCgnLnAtZ28tdG8tdG9wX19pY29uJykuaG92ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtaG92ZXInKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3V0Jyk7XG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3V0Jyk7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWhvdmVyJyk7XG4gICAgfSk7XG5cbiAgICAvLyDjg4jjg4Pjg5fjga7jgrPjg7Pjg4bjg7Pjg4Tpg6jliIbjgavjgrnjgq/jg63jg7zjg6vjgZfjgZ/nnqzplpPjgIHog4zmma/nlLvlg4/jgYzmqKrjgYvjgonjgrnjg6njgqTjg4njgZnjgovli5XjgY1cbiAgICAkKCcucC10b3AtYXJ0aWNsZS0td29ya3MsIC5wLXRvcC1hcnRpY2xlLS1zZXJ2aWNlLCAucC10b3AtYXJ0aWNsZS0tYWJvdXQtdXMnKS5lYWNoKGZ1bmN0aW9uKGksIGVsZW0pe1xuICAgICAgICB2YXIgY29udGVudHNQT1MgPSAkKGVsZW0pLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHNjcm9sbCByZXNpemUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICB2YXIgc2hvd0NsYXNzID0gJ3Nob3cnO1xuICAgICAgICAgICAgdmFyIHRpbWluZyA9IDIwMDsgLy8gMjAwcHjjgrPjg7Pjg4bjg7Pjg4TjgYzopovjgYjjgZ/jgonmrKHjga5pZuaWh+OBjHRydWVcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPj0gY29udGVudHNQT1MgLSB3aW5IZWlnaHQgKyB0aW1pbmcpe1xuICAgICAgICAgICAgICAgICQoZWxlbSkuYWRkQ2xhc3Moc2hvd0NsYXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtKS5yZW1vdmVDbGFzcyhzaG93Q2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0gKTsiLCIvKiFcblx0TW9kYWFsIC0gYWNjZXNzaWJsZSBtb2RhbHMgLSB2MC40LjRcblx0YnkgSHVtYWFuLCBmb3IgYWxsIGh1bWFucy5cblx0Ly9odW1hYW4uY29tXG4gKi9cbiFmdW5jdGlvbihhKXtmdW5jdGlvbiB0KGEpe3ZhciB0PXt9LG89ITE7YS5hdHRyKFwiZGF0YS1tb2RhYWwtdHlwZVwiKSYmKG89ITAsdC50eXBlPWEuYXR0cihcImRhdGEtbW9kYWFsLXR5cGVcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpJiYobz0hMCx0LmNvbnRlbnRfc291cmNlPWEuYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1hbmltYXRpb25cIikmJihvPSEwLHQuYW5pbWF0aW9uPWEuYXR0cihcImRhdGEtbW9kYWFsLWFuaW1hdGlvblwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtYW5pbWF0aW9uLXNwZWVkXCIpJiYobz0hMCx0LmFuaW1hdGlvbl9zcGVlZD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1hbmltYXRpb24tc3BlZWRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWFmdGVyLWNhbGxiYWNrLWRlbGF5XCIpJiYobz0hMCx0LmFmdGVyX2NhbGxiYWNrX2RlbGF5PWEuYXR0cihcImRhdGEtbW9kYWFsLWFmdGVyLWNhbGxiYWNrLWRlbGF5XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1pcy1sb2NrZWRcIikmJihvPSEwLHQuaXNfbG9ja2VkPVwidHJ1ZVwiPT09YS5hdHRyKFwiZGF0YS1tb2RhYWwtaXMtbG9ja2VkXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1oaWRlLWNsb3NlXCIpJiYobz0hMCx0LmhpZGVfY2xvc2U9XCJ0cnVlXCI9PT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1oaWRlLWNsb3NlXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1iYWNrZ3JvdW5kXCIpJiYobz0hMCx0LmJhY2tncm91bmQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtYmFja2dyb3VuZFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtb3ZlcmxheS1vcGFjaXR5XCIpJiYobz0hMCx0Lm92ZXJsYXlfb3BhY2l0eT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1vdmVybGF5LW9wYWNpdHlcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLW92ZXJsYXktY2xvc2VcIikmJihvPSEwLHQub3ZlcmxheV9jbG9zZT1cImZhbHNlXCIhPT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1vdmVybGF5LWNsb3NlXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1hY2Nlc3NpYmxlLXRpdGxlXCIpJiYobz0hMCx0LmFjY2Vzc2libGVfdGl0bGU9YS5hdHRyKFwiZGF0YS1tb2RhYWwtYWNjZXNzaWJsZS10aXRsZVwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtc3RhcnQtb3BlblwiKSYmKG89ITAsdC5zdGFydF9vcGVuPVwidHJ1ZVwiPT09YS5hdHRyKFwiZGF0YS1tb2RhYWwtc3RhcnQtb3BlblwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtZnVsbHNjcmVlblwiKSYmKG89ITAsdC5mdWxsc2NyZWVuPVwidHJ1ZVwiPT09YS5hdHRyKFwiZGF0YS1tb2RhYWwtZnVsbHNjcmVlblwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY3VzdG9tLWNsYXNzXCIpJiYobz0hMCx0LmN1c3RvbV9jbGFzcz1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jdXN0b20tY2xhc3NcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNsb3NlLXRleHRcIikmJihvPSEwLHQuY2xvc2VfdGV4dD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jbG9zZS10ZXh0XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jbG9zZS1hcmlhLWxhYmVsXCIpJiYobz0hMCx0LmNsb3NlX2FyaWFfbGFiZWw9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY2xvc2UtYXJpYS1sYWJlbFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtYmFja2dyb3VuZC1zY3JvbGxcIikmJihvPSEwLHQuYmFja2dyb3VuZF9zY3JvbGw9XCJ0cnVlXCI9PT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1iYWNrZ3JvdW5kLXNjcm9sbFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtd2lkdGhcIikmJihvPSEwLHQud2lkdGg9cGFyc2VJbnQoYS5hdHRyKFwiZGF0YS1tb2RhYWwtd2lkdGhcIikpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1oZWlnaHRcIikmJihvPSEwLHQuaGVpZ2h0PXBhcnNlSW50KGEuYXR0cihcImRhdGEtbW9kYWFsLWhlaWdodFwiKSkpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tYnV0dG9uLXRleHRcIikmJihvPSEwLHQuY29uZmlybV9idXR0b25fdGV4dD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLWJ1dHRvbi10ZXh0XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLWNhbmNlbC1idXR0b24tdGV4dFwiKSYmKG89ITAsdC5jb25maXJtX2NhbmNlbF9idXR0b25fdGV4dD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLWNhbmNlbC1idXR0b24tdGV4dFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS10aXRsZVwiKSYmKG89ITAsdC5jb25maXJtX3RpdGxlPWEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tdGl0bGVcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tY29udGVudFwiKSYmKG89ITAsdC5jb25maXJtX2NvbnRlbnQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS1jb250ZW50XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1nYWxsZXJ5LWFjdGl2ZS1jbGFzc1wiKSYmKG89ITAsdC5nYWxsZXJ5X2FjdGl2ZV9jbGFzcz1hLmF0dHIoXCJkYXRhLW1vZGFhbC1nYWxsZXJ5LWFjdGl2ZS1jbGFzc1wiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtbG9hZGluZy1jb250ZW50XCIpJiYobz0hMCx0LmxvYWRpbmdfY29udGVudD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1sb2FkaW5nLWNvbnRlbnRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWxvYWRpbmctY2xhc3NcIikmJihvPSEwLHQubG9hZGluZ19jbGFzcz1hLmF0dHIoXCJkYXRhLW1vZGFhbC1sb2FkaW5nLWNsYXNzXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1hamF4LWVycm9yLWNsYXNzXCIpJiYobz0hMCx0LmFqYXhfZXJyb3JfY2xhc3M9YS5hdHRyKFwiZGF0YS1tb2RhYWwtYWpheC1lcnJvci1jbGFzc1wiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtaW5zdGFncmFtLWlkXCIpJiYobz0hMCx0Lmluc3RhZ3JhbV9pZD1hLmF0dHIoXCJkYXRhLW1vZGFhbC1pbnN0YWdyYW0taWRcIikpLG8mJmEubW9kYWFsKHQpfXZhciBvPXtpbml0OmZ1bmN0aW9uKHQsbyl7dmFyIGU9dGhpcztpZihlLmRvbT1hKFwiYm9keVwiKSxlLiRlbGVtPWEobyksZS5vcHRpb25zPWEuZXh0ZW5kKHt9LGEuZm4ubW9kYWFsLm9wdGlvbnMsZS4kZWxlbS5kYXRhKCksdCksZS54aHI9bnVsbCxlLnNjb3BlPXtpc19vcGVuOiExLGlkOlwibW9kYWFsX1wiKyhuZXcgRGF0ZSkuZ2V0VGltZSgpK01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygyKSxzb3VyY2U6ZS5vcHRpb25zLmNvbnRlbnRfc291cmNlP2Uub3B0aW9ucy5jb250ZW50X3NvdXJjZTplLiRlbGVtLmF0dHIoXCJocmVmXCIpfSxlLiRlbGVtLmF0dHIoXCJkYXRhLW1vZGFhbC1zY29wZVwiLGUuc2NvcGUuaWQpLGUucHJpdmF0ZV9vcHRpb25zPXthY3RpdmVfY2xhc3M6XCJpc19hY3RpdmVcIn0sZS5sYXN0Rm9jdXM9bnVsbCxlLm9wdGlvbnMuaXNfbG9ja2VkfHxcImNvbmZpcm1cIj09ZS5vcHRpb25zLnR5cGV8fGUub3B0aW9ucy5oaWRlX2Nsb3NlP2Uuc2NvcGUuY2xvc2VfYnRuPVwiXCI6ZS5zY29wZS5jbG9zZV9idG49JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibW9kYWFsLWNsb3NlXCIgaWQ9XCJtb2RhYWwtY2xvc2VcIiBhcmlhLWxhYmVsPVwiJytlLm9wdGlvbnMuY2xvc2VfYXJpYV9sYWJlbCsnXCI+PHNwYW4+JytlLm9wdGlvbnMuY2xvc2VfdGV4dCtcIjwvc3Bhbj48L2J1dHRvbj5cIixcIm5vbmVcIj09PWUub3B0aW9ucy5hbmltYXRpb24mJihlLm9wdGlvbnMuYW5pbWF0aW9uX3NwZWVkPTAsZS5vcHRpb25zLmFmdGVyX2NhbGxiYWNrX2RlbGF5PTApLGEobykub24oXCJjbGljay5Nb2RhYWxcIixmdW5jdGlvbihhKXthLnByZXZlbnREZWZhdWx0KCksZS5jcmVhdGVfbW9kYWFsKGUsYSl9KSwhMD09PWUub3B0aW9ucy5vdXRlcl9jb250cm9scyl2YXIgaT1cIm91dGVyXCI7ZWxzZSB2YXIgaT1cImlubmVyXCI7ZS5zY29wZS5wcmV2X2J0bj0nPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1jb250cm9sIG1vZGFhbC1nYWxsZXJ5LXByZXYgbW9kYWFsLWdhbGxlcnktcHJldi0nK2krJ1wiIGlkPVwibW9kYWFsLWdhbGxlcnktcHJldlwiIGFyaWEtbGFiZWw9XCJQcmV2aW91cyBpbWFnZSAodXNlIGxlZnQgYXJyb3cgdG8gY2hhbmdlKVwiPjxzcGFuPlByZXZpb3VzIEltYWdlPC9zcGFuPjwvYnV0dG9uPicsZS5zY29wZS5uZXh0X2J0bj0nPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1jb250cm9sIG1vZGFhbC1nYWxsZXJ5LW5leHQgbW9kYWFsLWdhbGxlcnktbmV4dC0nK2krJ1wiIGlkPVwibW9kYWFsLWdhbGxlcnktbmV4dFwiIGFyaWEtbGFiZWw9XCJOZXh0IGltYWdlICh1c2UgcmlnaHQgYXJyb3cgdG8gY2hhbmdlKVwiPjxzcGFuPk5leHQgSW1hZ2U8L3NwYW4+PC9idXR0b24+JywhMD09PWUub3B0aW9ucy5zdGFydF9vcGVuJiZlLmNyZWF0ZV9tb2RhYWwoZSl9LGNyZWF0ZV9tb2RhYWw6ZnVuY3Rpb24oYSx0KXt2YXIgbyxhPXRoaXM7aWYoYS5sYXN0Rm9jdXM9YS4kZWxlbSwhMSE9PWEub3B0aW9ucy5zaG91bGRfb3BlbiYmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGEub3B0aW9ucy5zaG91bGRfb3Blbnx8ITEhPT1hLm9wdGlvbnMuc2hvdWxkX29wZW4oKSkpe3N3aXRjaChhLm9wdGlvbnMuYmVmb3JlX29wZW4uY2FsbChhLHQpLGEub3B0aW9ucy50eXBlKXtjYXNlXCJpbmxpbmVcIjphLmNyZWF0ZV9iYXNpYygpO2JyZWFrO2Nhc2VcImFqYXhcIjpvPWEub3B0aW9ucy5zb3VyY2UoYS4kZWxlbSxhLnNjb3BlLnNvdXJjZSksYS5mZXRjaF9hamF4KG8pO2JyZWFrO2Nhc2VcImNvbmZpcm1cIjphLm9wdGlvbnMuaXNfbG9ja2VkPSEwLGEuY3JlYXRlX2NvbmZpcm0oKTticmVhaztjYXNlXCJpbWFnZVwiOmEuY3JlYXRlX2ltYWdlKCk7YnJlYWs7Y2FzZVwiaWZyYW1lXCI6bz1hLm9wdGlvbnMuc291cmNlKGEuJGVsZW0sYS5zY29wZS5zb3VyY2UpLGEuY3JlYXRlX2lmcmFtZShvKTticmVhaztjYXNlXCJ2aWRlb1wiOmEuY3JlYXRlX3ZpZGVvKGEuc2NvcGUuc291cmNlKTticmVhaztjYXNlXCJpbnN0YWdyYW1cIjphLmNyZWF0ZV9pbnN0YWdyYW0oKX1hLndhdGNoX2V2ZW50cygpfX0sd2F0Y2hfZXZlbnRzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0LmRvbS5vZmYoXCJjbGljay5Nb2RhYWwga2V5dXAuTW9kYWFsIGtleWRvd24uTW9kYWFsXCIpLHQuZG9tLm9uKFwia2V5ZG93bi5Nb2RhYWxcIixmdW5jdGlvbihvKXt2YXIgZT1vLmtleUNvZGUsaT1vLnRhcmdldDs5PT1lJiZ0LnNjb3BlLmlzX29wZW4mJihhLmNvbnRhaW5zKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQuc2NvcGUuaWQpLGkpfHxhKFwiI1wiK3Quc2NvcGUuaWQpLmZpbmQoJypbdGFiaW5kZXg9XCIwXCJdJykuZm9jdXMoKSl9KSx0LmRvbS5vbihcImtleXVwLk1vZGFhbFwiLGZ1bmN0aW9uKG8pe3ZhciBlPW8ua2V5Q29kZSxpPW8udGFyZ2V0O3JldHVybiBvLnNoaWZ0S2V5JiY5PT1vLmtleUNvZGUmJnQuc2NvcGUuaXNfb3BlbiYmKGEuY29udGFpbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodC5zY29wZS5pZCksaSl8fGEoXCIjXCIrdC5zY29wZS5pZCkuZmluZChcIi5tb2RhYWwtY2xvc2VcIikuZm9jdXMoKSksIXQub3B0aW9ucy5pc19sb2NrZWQmJjI3PT1lJiZ0LnNjb3BlLmlzX29wZW4/IWEoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkuaXMoXCJpbnB1dDpub3QoOmNoZWNrYm94KTpub3QoOnJhZGlvKVwiKSYmdm9pZCB0Lm1vZGFhbF9jbG9zZSgpOlwiaW1hZ2VcIj09dC5vcHRpb25zLnR5cGU/KDM3PT1lJiZ0LnNjb3BlLmlzX29wZW4mJiFhKFwiI1wiK3Quc2NvcGUuaWQrXCIgLm1vZGFhbC1nYWxsZXJ5LXByZXZcIikuaGFzQ2xhc3MoXCJpc19oaWRkZW5cIikmJnQuZ2FsbGVyeV91cGRhdGUoXCJwcmV2XCIpLHZvaWQoMzk9PWUmJnQuc2NvcGUuaXNfb3BlbiYmIWEoXCIjXCIrdC5zY29wZS5pZCtcIiAubW9kYWFsLWdhbGxlcnktbmV4dFwiKS5oYXNDbGFzcyhcImlzX2hpZGRlblwiKSYmdC5nYWxsZXJ5X3VwZGF0ZShcIm5leHRcIikpKTp2b2lkIDB9KSx0LmRvbS5vbihcImNsaWNrLk1vZGFhbFwiLGZ1bmN0aW9uKG8pe3ZhciBlPWEoby50YXJnZXQpO2lmKCF0Lm9wdGlvbnMuaXNfbG9ja2VkJiYodC5vcHRpb25zLm92ZXJsYXlfY2xvc2UmJmUuaXMoXCIubW9kYWFsLWlubmVyLXdyYXBwZXJcIil8fGUuaXMoXCIubW9kYWFsLWNsb3NlXCIpfHxlLmNsb3Nlc3QoXCIubW9kYWFsLWNsb3NlXCIpLmxlbmd0aCkpcmV0dXJuIHZvaWQgdC5tb2RhYWxfY2xvc2UoKTtpZihlLmlzKFwiLm1vZGFhbC1jb25maXJtLWJ0blwiKSlyZXR1cm4gZS5pcyhcIi5tb2RhYWwtb2tcIikmJnQub3B0aW9ucy5jb25maXJtX2NhbGxiYWNrLmNhbGwodCx0Lmxhc3RGb2N1cyksZS5pcyhcIi5tb2RhYWwtY2FuY2VsXCIpJiZ0Lm9wdGlvbnMuY29uZmlybV9jYW5jZWxfY2FsbGJhY2suY2FsbCh0LHQubGFzdEZvY3VzKSx2b2lkIHQubW9kYWFsX2Nsb3NlKCk7aWYoZS5pcyhcIi5tb2RhYWwtZ2FsbGVyeS1jb250cm9sXCIpKXtpZihlLmhhc0NsYXNzKFwiaXNfaGlkZGVuXCIpKXJldHVybjtyZXR1cm4gZS5pcyhcIi5tb2RhYWwtZ2FsbGVyeS1wcmV2XCIpJiZ0LmdhbGxlcnlfdXBkYXRlKFwicHJldlwiKSx2b2lkKGUuaXMoXCIubW9kYWFsLWdhbGxlcnktbmV4dFwiKSYmdC5nYWxsZXJ5X3VwZGF0ZShcIm5leHRcIikpfX0pfSxidWlsZF9tb2RhbDpmdW5jdGlvbih0KXt2YXIgbz10aGlzLGU9XCJcIjtcImluc3RhZ3JhbVwiPT1vLm9wdGlvbnMudHlwZSYmKGU9XCIgbW9kYWFsLWluc3RhZ3JhbVwiKTt2YXIgaSxsPVwidmlkZW9cIj09by5vcHRpb25zLnR5cGU/XCJtb2RhYWwtdmlkZW8td3JhcFwiOlwibW9kYWFsLWNvbnRlbnRcIjtzd2l0Y2goby5vcHRpb25zLmFuaW1hdGlvbil7Y2FzZVwiZmFkZVwiOmk9XCIgbW9kYWFsLXN0YXJ0X2ZhZGVcIjticmVhaztjYXNlXCJzbGlkZS1kb3duXCI6aT1cIiBtb2RhYWwtc3RhcnRfc2xpZGVkb3duXCI7YnJlYWs7ZGVmYXVsdDppPVwiIG1vZGFhbC1zdGFydF9ub25lXCJ9dmFyIG49XCJcIjtvLm9wdGlvbnMuZnVsbHNjcmVlbiYmKG49XCIgbW9kYWFsLWZ1bGxzY3JlZW5cIiksXCJcIj09PW8ub3B0aW9ucy5jdXN0b21fY2xhc3MmJnZvaWQgMD09PW8ub3B0aW9ucy5jdXN0b21fY2xhc3N8fChvLm9wdGlvbnMuY3VzdG9tX2NsYXNzPVwiIFwiK28ub3B0aW9ucy5jdXN0b21fY2xhc3MpO3ZhciBzPVwiXCI7by5vcHRpb25zLndpZHRoJiZvLm9wdGlvbnMuaGVpZ2h0JiZcIm51bWJlclwiPT10eXBlb2Ygby5vcHRpb25zLndpZHRoJiZcIm51bWJlclwiPT10eXBlb2Ygby5vcHRpb25zLmhlaWdodD9zPScgc3R5bGU9XCJtYXgtd2lkdGg6JytvLm9wdGlvbnMud2lkdGgrXCJweDtoZWlnaHQ6XCIrby5vcHRpb25zLmhlaWdodCsncHg7b3ZlcmZsb3c6YXV0bztcIic6by5vcHRpb25zLndpZHRoJiZcIm51bWJlclwiPT10eXBlb2Ygby5vcHRpb25zLndpZHRoP3M9JyBzdHlsZT1cIm1heC13aWR0aDonK28ub3B0aW9ucy53aWR0aCsncHg7XCInOm8ub3B0aW9ucy5oZWlnaHQmJlwibnVtYmVyXCI9PXR5cGVvZiBvLm9wdGlvbnMuaGVpZ2h0JiYocz0nIHN0eWxlPVwiaGVpZ2h0Oicrby5vcHRpb25zLmhlaWdodCsncHg7b3ZlcmZsb3c6YXV0bztcIicpLChcImltYWdlXCI9PW8ub3B0aW9ucy50eXBlfHxcInZpZGVvXCI9PW8ub3B0aW9ucy50eXBlfHxcImluc3RhZ3JhbVwiPT1vLm9wdGlvbnMudHlwZXx8by5vcHRpb25zLmZ1bGxzY3JlZW4pJiYocz1cIlwiKTt2YXIgZD1cIlwiO28uaXNfdG91Y2goKSYmKGQ9JyBzdHlsZT1cImN1cnNvcjpwb2ludGVyO1wiJyk7dmFyIHI9JzxkaXYgY2xhc3M9XCJtb2RhYWwtd3JhcHBlciBtb2RhYWwtJytvLm9wdGlvbnMudHlwZStpK2UrbitvLm9wdGlvbnMuY3VzdG9tX2NsYXNzKydcIiBpZD1cIicrby5zY29wZS5pZCsnXCI+PGRpdiBjbGFzcz1cIm1vZGFhbC1vdXRlci13cmFwcGVyXCI+PGRpdiBjbGFzcz1cIm1vZGFhbC1pbm5lci13cmFwcGVyXCInK2QrXCI+XCI7XCJ2aWRlb1wiIT1vLm9wdGlvbnMudHlwZSYmKHIrPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWNvbnRhaW5lclwiJytzK1wiPlwiKSxyKz0nPGRpdiBjbGFzcz1cIicrbCsnIG1vZGFhbC1mb2N1c1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBhcmlhLWxhYmVsPVwiJytvLm9wdGlvbnMuYWNjZXNzaWJsZV90aXRsZStcIiAtIFwiK28ub3B0aW9ucy5jbG9zZV9hcmlhX2xhYmVsKydcIiByb2xlPVwiZGlhbG9nXCI+JyxcImlubGluZVwiPT1vLm9wdGlvbnMudHlwZT9yKz0nPGRpdiBjbGFzcz1cIm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiIHJvbGU9XCJkb2N1bWVudFwiPjwvZGl2Pic6cis9dCxyKz1cIjwvZGl2PlwiK28uc2NvcGUuY2xvc2VfYnRuLFwidmlkZW9cIiE9by5vcHRpb25zLnR5cGUmJihyKz1cIjwvZGl2PlwiKSxyKz1cIjwvZGl2PlwiLFwiaW1hZ2VcIj09by5vcHRpb25zLnR5cGUmJiEwPT09by5vcHRpb25zLm91dGVyX2NvbnRyb2xzJiYocis9by5zY29wZS5wcmV2X2J0bitvLnNjb3BlLm5leHRfYnRuKSxyKz1cIjwvZGl2PjwvZGl2PlwiLGEoXCIjXCIrby5zY29wZS5pZCtcIl9vdmVybGF5XCIpLmxlbmd0aDwxJiZvLmRvbS5hcHBlbmQociksXCJpbmxpbmVcIj09by5vcHRpb25zLnR5cGUmJnQuYXBwZW5kVG8oXCIjXCIrby5zY29wZS5pZCtcIiAubW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCIpLG8ubW9kYWFsX292ZXJsYXkoXCJzaG93XCIpfSxjcmVhdGVfYmFzaWM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG89YSh0LnNjb3BlLnNvdXJjZSksZT1cIlwiO28ubGVuZ3RoPyhlPW8uY29udGVudHMoKS5kZXRhY2goKSxvLmVtcHR5KCkpOmU9XCJDb250ZW50IGNvdWxkIG5vdCBiZSBsb2FkZWQuIFBsZWFzZSBjaGVjayB0aGUgc291cmNlIGFuZCB0cnkgYWdhaW4uXCIsdC5idWlsZF9tb2RhbChlKX0sY3JlYXRlX2luc3RhZ3JhbTpmdW5jdGlvbigpe3ZhciB0PXRoaXMsbz10Lm9wdGlvbnMuaW5zdGFncmFtX2lkLGU9XCJcIixpPVwiSW5zdGFncmFtIHBob3RvIGNvdWxkbid0IGJlIGxvYWRlZCwgcGxlYXNlIGNoZWNrIHRoZSBlbWJlZCBjb2RlIGFuZCB0cnkgYWdhaW4uXCI7aWYodC5idWlsZF9tb2RhbCgnPGRpdiBjbGFzcz1cIm1vZGFhbC1jb250ZW50LWNvbnRhaW5lcicrKFwiXCIhPXQub3B0aW9ucy5sb2FkaW5nX2NsYXNzP1wiIFwiK3Qub3B0aW9ucy5sb2FkaW5nX2NsYXNzOlwiXCIpKydcIj4nK3Qub3B0aW9ucy5sb2FkaW5nX2NvbnRlbnQrXCI8L2Rpdj5cIiksXCJcIiE9byYmbnVsbCE9PW8mJnZvaWQgMCE9PW8pe3ZhciBsPVwiLy9hcGkuaW5zdGFncmFtLmNvbS9vZW1iZWQ/dXJsPS8vaW5zdGFnci5hbS9wL1wiK28rXCIvXCI7YS5hamF4KHt1cmw6bCxkYXRhVHlwZTpcImpzb25wXCIsY2FjaGU6ITEsc3VjY2VzczpmdW5jdGlvbihvKXt0LmRvbS5hcHBlbmQoJzxkaXYgaWQ9XCJ0ZW1wLWlnXCIgc3R5bGU9XCJ3aWR0aDowO2hlaWdodDowO292ZXJmbG93OmhpZGRlbjtcIj4nK28uaHRtbCtcIjwvZGl2PlwiKSx0LmRvbS5hdHRyKFwiZGF0YS1pZ2xvYWRlZFwiKT93aW5kb3cuaW5zdGdybS5FbWJlZHMucHJvY2VzcygpOnQuZG9tLmF0dHIoXCJkYXRhLWlnbG9hZGVkXCIsXCJ0cnVlXCIpO3ZhciBlPVwiI1wiK3Quc2NvcGUuaWQrXCIgLm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiO2EoZSkubGVuZ3RoPjAmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXthKFwiI3RlbXAtaWdcIikuY29udGVudHMoKS5jbG9uZSgpLmFwcGVuZFRvKGUpLGEoXCIjdGVtcC1pZ1wiKS5yZW1vdmUoKX0sMWUzKX0sZXJyb3I6ZnVuY3Rpb24oKXtlPWk7dmFyIG89YShcIiNcIit0LnNjb3BlLmlkK1wiIC5tb2RhYWwtY29udGVudC1jb250YWluZXJcIik7by5sZW5ndGg+MCYmKG8ucmVtb3ZlQ2xhc3ModC5vcHRpb25zLmxvYWRpbmdfY2xhc3MpLmFkZENsYXNzKHQub3B0aW9ucy5hamF4X2Vycm9yX2NsYXNzKSxvLmh0bWwoZSkpfX0pfWVsc2UgZT1pO3JldHVybiExfSxmZXRjaF9hamF4OmZ1bmN0aW9uKHQpe3ZhciBvPXRoaXM7bnVsbD09by5vcHRpb25zLmFjY2Vzc2libGVfdGl0bGUmJihvLm9wdGlvbnMuYWNjZXNzaWJsZV90aXRsZT1cIkRpYWxvZyBXaW5kb3dcIiksbnVsbCE9PW8ueGhyJiYoby54aHIuYWJvcnQoKSxvLnhocj1udWxsKSxvLmJ1aWxkX21vZGFsKCc8ZGl2IGNsYXNzPVwibW9kYWFsLWNvbnRlbnQtY29udGFpbmVyJysoXCJcIiE9by5vcHRpb25zLmxvYWRpbmdfY2xhc3M/XCIgXCIrby5vcHRpb25zLmxvYWRpbmdfY2xhc3M6XCJcIikrJ1wiPicrby5vcHRpb25zLmxvYWRpbmdfY29udGVudCtcIjwvZGl2PlwiKSxvLnhocj1hLmFqYXgodCx7c3VjY2VzczpmdW5jdGlvbih0KXt2YXIgZT1hKFwiI1wiK28uc2NvcGUuaWQpLmZpbmQoXCIubW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCIpO2UubGVuZ3RoPjAmJihlLnJlbW92ZUNsYXNzKG8ub3B0aW9ucy5sb2FkaW5nX2NsYXNzKSxlLmh0bWwodCksby5vcHRpb25zLmFqYXhfc3VjY2Vzcy5jYWxsKG8sZSkpfSxlcnJvcjpmdW5jdGlvbih0KXtpZihcImFib3J0XCIhPXQuc3RhdHVzVGV4dCl7dmFyIGU9YShcIiNcIitvLnNjb3BlLmlkK1wiIC5tb2RhYWwtY29udGVudC1jb250YWluZXJcIik7ZS5sZW5ndGg+MCYmKGUucmVtb3ZlQ2xhc3Moby5vcHRpb25zLmxvYWRpbmdfY2xhc3MpLmFkZENsYXNzKG8ub3B0aW9ucy5hamF4X2Vycm9yX2NsYXNzKSxlLmh0bWwoXCJDb250ZW50IGNvdWxkIG5vdCBiZSBsb2FkZWQuIFBsZWFzZSBjaGVjayB0aGUgc291cmNlIGFuZCB0cnkgYWdhaW4uXCIpKX19fSl9LGNyZWF0ZV9jb25maXJtOmZ1bmN0aW9uKCl7dmFyIGEsdD10aGlzO2E9JzxkaXYgY2xhc3M9XCJtb2RhYWwtY29udGVudC1jb250YWluZXJcIj48aDEgaWQ9XCJtb2RhYWwtdGl0bGVcIj4nK3Qub3B0aW9ucy5jb25maXJtX3RpdGxlKyc8L2gxPjxkaXYgY2xhc3M9XCJtb2RhYWwtY29uZmlybS1jb250ZW50XCI+Jyt0Lm9wdGlvbnMuY29uZmlybV9jb250ZW50Kyc8L2Rpdj48ZGl2IGNsYXNzPVwibW9kYWFsLWNvbmZpcm0td3JhcFwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibW9kYWFsLWNvbmZpcm0tYnRuIG1vZGFhbC1va1wiIGFyaWEtbGFiZWw9XCJDb25maXJtXCI+Jyt0Lm9wdGlvbnMuY29uZmlybV9idXR0b25fdGV4dCsnPC9idXR0b24+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtb2RhYWwtY29uZmlybS1idG4gbW9kYWFsLWNhbmNlbFwiIGFyaWEtbGFiZWw9XCJDYW5jZWxcIj4nK3Qub3B0aW9ucy5jb25maXJtX2NhbmNlbF9idXR0b25fdGV4dCtcIjwvYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PlwiLHQuYnVpbGRfbW9kYWwoYSl9LGNyZWF0ZV9pbWFnZTpmdW5jdGlvbigpe3ZhciB0LG8sZT10aGlzLGk9XCJcIjtpZihlLiRlbGVtLmlzKFwiW2RhdGEtZ3JvdXBdXCIpfHxlLiRlbGVtLmlzKFwiW3JlbF1cIikpe3ZhciBsPWUuJGVsZW0uaXMoXCJbZGF0YS1ncm91cF1cIiksbj1sP2UuJGVsZW0uYXR0cihcImRhdGEtZ3JvdXBcIik6ZS4kZWxlbS5hdHRyKFwicmVsXCIpLHM9YShsPydbZGF0YS1ncm91cD1cIicrbisnXCJdJzonW3JlbD1cIicrbisnXCJdJyk7cy5yZW1vdmVBdHRyKFwiZGF0YS1nYWxsZXJ5LWFjdGl2ZVwiLFwiaXNfYWN0aXZlXCIpLGUuJGVsZW0uYXR0cihcImRhdGEtZ2FsbGVyeS1hY3RpdmVcIixcImlzX2FjdGl2ZVwiKSxvPXMubGVuZ3RoLTE7dmFyIGQ9W107aT0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWl0ZW0td3JhcFwiPicscy5lYWNoKGZ1bmN0aW9uKHQsbyl7dmFyIGU9XCJcIixpPVwiXCIsbD1cIlwiLG49ITEscz0hMSxyPW8uZ2V0QXR0cmlidXRlKFwiZGF0YS1tb2RhYWwtZGVzY1wiKSxjPW8uZ2V0QXR0cmlidXRlKFwiZGF0YS1nYWxsZXJ5LWFjdGl2ZVwiKTthKG8pLmF0dHIoXCJkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZVwiKT9lPWEobykuYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpOmEobykuYXR0cihcImhyZWZcIik/ZT1hKG8pLmF0dHIoXCJocmVmXCIpOmEobykuYXR0cihcInNyY1wiKT9lPWEobykuYXR0cihcInNyY1wiKTooZT1cInRyaWdnZXIgcmVxdWlyZXMgaHJlZiBvciBkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZSBhdHRyaWJ1dGVcIixzPSEwKSxcIlwiIT1yJiZudWxsIT09ciYmdm9pZCAwIT09cj8oaT1yLGw9JzxkaXYgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1sYWJlbFwiPjxzcGFuIGNsYXNzPVwibW9kYWFsLWFjY2Vzc2libGUtaGlkZVwiPkltYWdlICcrKHQrMSkrXCIgLSA8L3NwYW4+XCIrci5yZXBsYWNlKC88L2csXCImbHQ7XCIpLnJlcGxhY2UoLz4vZyxcIiZndDtcIikrXCI8L2Rpdj5cIik6bD0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWxhYmVsXCI+PHNwYW4gY2xhc3M9XCJtb2RhYWwtYWNjZXNzaWJsZS1oaWRlXCI+SW1hZ2UgJysodCsxKStcIjwvc3Bhbj48L2Rpdj5cIixjJiYobj0hMCk7dmFyIG09e3VybDplLGFsdDppLHJhd2Rlc2M6cixkZXNjOmwsYWN0aXZlOm4sc3JjX2Vycm9yOnN9O2QucHVzaChtKX0pO2Zvcih2YXIgcj0wO3I8ZC5sZW5ndGg7cisrKXt2YXIgYz1cIlwiLG09ZFtyXS5yYXdkZXNjP1wiSW1hZ2U6IFwiK2Rbcl0ucmF3ZGVzYzpcIkltYWdlIFwiK3IrXCIgbm8gZGVzY3JpcHRpb25cIjtkW3JdLmFjdGl2ZSYmKGM9XCIgXCIrZS5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzKTt2YXIgcD1kW3JdLnNyY19lcnJvcj9kW3JdLnVybDonPGltZyBzcmM9XCInK2Rbcl0udXJsKydcIiBhbHQ9XCIgXCIgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+JztpKz0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWl0ZW0gZ2FsbGVyeS1pdGVtLScrcitjKydcIiBhcmlhLWxhYmVsPVwiJyttKydcIj4nK3ArZFtyXS5kZXNjK1wiPC9kaXY+XCJ9aSs9XCI8L2Rpdj5cIiwxIT1lLm9wdGlvbnMub3V0ZXJfY29udHJvbHMmJihpKz1lLnNjb3BlLnByZXZfYnRuK2Uuc2NvcGUubmV4dF9idG4pfWVsc2V7dmFyIHUsXz0hMTtlLiRlbGVtLmF0dHIoXCJkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZVwiKT91PWUuJGVsZW0uYXR0cihcImRhdGEtbW9kYWFsLWNvbnRlbnQtc291cmNlXCIpOmUuJGVsZW0uYXR0cihcImhyZWZcIik/dT1lLiRlbGVtLmF0dHIoXCJocmVmXCIpOmUuJGVsZW0uYXR0cihcInNyY1wiKT91PWUuJGVsZW0uYXR0cihcInNyY1wiKToodT1cInRyaWdnZXIgcmVxdWlyZXMgaHJlZiBvciBkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZSBhdHRyaWJ1dGVcIixfPSEwKTt2YXIgdj1cIlwiLGY9XCJcIixtPVwiXCI7ZS4kZWxlbS5hdHRyKFwiZGF0YS1tb2RhYWwtZGVzY1wiKT8obT1lLiRlbGVtLmF0dHIoXCJkYXRhLW1vZGFhbC1kZXNjXCIpLHY9ZS4kZWxlbS5hdHRyKFwiZGF0YS1tb2RhYWwtZGVzY1wiKSxmPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWdhbGxlcnktbGFiZWxcIj48c3BhbiBjbGFzcz1cIm1vZGFhbC1hY2Nlc3NpYmxlLWhpZGVcIj5JbWFnZSAtIDwvc3Bhbj4nK3YucmVwbGFjZSgvPC9nLFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csXCImZ3Q7XCIpK1wiPC9kaXY+XCIpOm09XCJJbWFnZSB3aXRoIG5vIGRlc2NyaXB0aW9uXCI7dmFyIHA9Xz91Oic8aW1nIHNyYz1cIicrdSsnXCIgYWx0PVwiIFwiIHN0eWxlPVwid2lkdGg6MTAwJVwiPic7aT0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWl0ZW0gaXNfYWN0aXZlXCIgYXJpYS1sYWJlbD1cIicrbSsnXCI+JytwK2YrXCI8L2Rpdj5cIn10PWksZS5idWlsZF9tb2RhbCh0KSxhKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfYWN0aXZlXCIpLmlzKFwiLmdhbGxlcnktaXRlbS0wXCIpJiZhKFwiLm1vZGFhbC1nYWxsZXJ5LXByZXZcIikuaGlkZSgpLGEoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19hY3RpdmVcIikuaXMoXCIuZ2FsbGVyeS1pdGVtLVwiK28pJiZhKFwiLm1vZGFhbC1nYWxsZXJ5LW5leHRcIikuaGlkZSgpfSxnYWxsZXJ5X3VwZGF0ZTpmdW5jdGlvbih0KXt2YXIgbz10aGlzLGU9YShcIiNcIitvLnNjb3BlLmlkKSxpPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtXCIpLGw9aS5sZW5ndGgtMTtpZigwPT1sKXJldHVybiExO3ZhciBuPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1wcmV2XCIpLHM9ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LW5leHRcIiksZD0wLHI9MCxjPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLlwiK28ucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcyksbT1cIm5leHRcIj09dD9jLm5leHQoXCIubW9kYWFsLWdhbGxlcnktaXRlbVwiKTpjLnByZXYoXCIubW9kYWFsLWdhbGxlcnktaXRlbVwiKTtyZXR1cm4gby5vcHRpb25zLmJlZm9yZV9pbWFnZV9jaGFuZ2UuY2FsbChvLGMsbSksKFwicHJldlwiIT10fHwhZS5maW5kKFwiLmdhbGxlcnktaXRlbS0wXCIpLmhhc0NsYXNzKFwiaXNfYWN0aXZlXCIpKSYmKChcIm5leHRcIiE9dHx8IWUuZmluZChcIi5nYWxsZXJ5LWl0ZW0tXCIrbCkuaGFzQ2xhc3MoXCJpc19hY3RpdmVcIikpJiZ2b2lkIGMuc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6MH0sMjUwLGZ1bmN0aW9uKCl7bS5hZGRDbGFzcyhcImlzX25leHRcIikuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCIsZGlzcGxheTpcImJsb2NrXCIsb3BhY2l0eTowfSk7dmFyIHQ9YShkb2N1bWVudCkud2lkdGgoKSxpPXQ+MTE0MD8yODA6NTA7ZD1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0XCIpLndpZHRoKCkscj1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0XCIpLmhlaWdodCgpO3ZhciBwPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX25leHQgaW1nXCIpLnByb3AoXCJuYXR1cmFsV2lkdGhcIiksdT1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0IGltZ1wiKS5wcm9wKFwibmF0dXJhbEhlaWdodFwiKTtwPnQtaT8oZD10LWksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfbmV4dFwiKS5jc3Moe3dpZHRoOmR9KSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0IGltZ1wiKS5jc3Moe3dpZHRoOmR9KSxyPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX25leHRcIikuZmluZChcImltZ1wiKS5oZWlnaHQoKSk6KGQ9cCxyPXUpLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLXdyYXBcIikuc3RvcCgpLmFuaW1hdGUoe3dpZHRoOmQsaGVpZ2h0OnJ9LDI1MCxmdW5jdGlvbigpe2MucmVtb3ZlQ2xhc3Moby5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzK1wiIFwiK28ub3B0aW9ucy5nYWxsZXJ5X2FjdGl2ZV9jbGFzcykucmVtb3ZlQXR0cihcInN0eWxlXCIpLGMuZmluZChcImltZ1wiKS5yZW1vdmVBdHRyKFwic3R5bGVcIiksbS5hZGRDbGFzcyhvLnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MrXCIgXCIrby5vcHRpb25zLmdhbGxlcnlfYWN0aXZlX2NsYXNzKS5yZW1vdmVDbGFzcyhcImlzX25leHRcIikuY3NzKFwicG9zaXRpb25cIixcIlwiKSxtLnN0b3AoKS5hbmltYXRlKHtvcGFjaXR5OjF9LDI1MCxmdW5jdGlvbigpe2EodGhpcykucmVtb3ZlQXR0cihcInN0eWxlXCIpLmNzcyh7d2lkdGg6XCIxMDAlXCJ9KSxhKHRoaXMpLmZpbmQoXCJpbWdcIikuY3NzKFwid2lkdGhcIixcIjEwMCVcIiksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0td3JhcFwiKS5yZW1vdmVBdHRyKFwic3R5bGVcIiksby5vcHRpb25zLmFmdGVyX2ltYWdlX2NoYW5nZS5jYWxsKG8sbSl9KSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbVwiKS5yZW1vdmVBdHRyKFwidGFiaW5kZXhcIiksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uXCIrby5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzKS5hdHRyKFwidGFiaW5kZXhcIixcIjBcIikuZm9jdXMoKSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5cIitvLnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MpLmlzKFwiLmdhbGxlcnktaXRlbS0wXCIpP24uc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6MH0sMTUwLGZ1bmN0aW9uKCl7YSh0aGlzKS5oaWRlKCl9KTpuLnN0b3AoKS5jc3Moe2Rpc3BsYXk6XCJibG9ja1wiLG9wYWNpdHk6bi5jc3MoXCJvcGFjaXR5XCIpfSkuYW5pbWF0ZSh7b3BhY2l0eToxfSwxNTApLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLlwiK28ucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcykuaXMoXCIuZ2FsbGVyeS1pdGVtLVwiK2wpP3Muc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6MH0sMTUwLGZ1bmN0aW9uKCl7YSh0aGlzKS5oaWRlKCl9KTpzLnN0b3AoKS5jc3Moe2Rpc3BsYXk6XCJibG9ja1wiLG9wYWNpdHk6bi5jc3MoXCJvcGFjaXR5XCIpfSkuYW5pbWF0ZSh7b3BhY2l0eToxfSwxNTApfSl9KSl9LGNyZWF0ZV92aWRlbzpmdW5jdGlvbihhKXt2YXIgdCxvPXRoaXM7dD0nPGlmcmFtZSBzcmM9XCInK2ErJ1wiIGNsYXNzPVwibW9kYWFsLXZpZGVvLWZyYW1lXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPicsby5idWlsZF9tb2RhbCgnPGRpdiBjbGFzcz1cIm1vZGFhbC12aWRlby1jb250YWluZXJcIj4nK3QrXCI8L2Rpdj5cIil9LGNyZWF0ZV9pZnJhbWU6ZnVuY3Rpb24oYSl7dmFyIHQsbz10aGlzO3Q9bnVsbCE9PW8ub3B0aW9ucy53aWR0aHx8dm9pZCAwIT09by5vcHRpb25zLndpZHRofHxudWxsIT09by5vcHRpb25zLmhlaWdodHx8dm9pZCAwIT09by5vcHRpb25zLmhlaWdodD8nPGlmcmFtZSBzcmM9XCInK2ErJ1wiIGNsYXNzPVwibW9kYWFsLWlmcmFtZS1lbGVtXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPic6JzxkaXYgY2xhc3M9XCJtb2RhYWwtY29udGVudC1jb250YWluZXJcIj5QbGVhc2Ugc3BlY2lmeSBhIHdpZHRoIGFuZCBoZWlnaHQgZm9yIHlvdXIgaWZyYW1lPC9kaXY+JyxvLmJ1aWxkX21vZGFsKHQpfSxtb2RhYWxfb3BlbjpmdW5jdGlvbigpe3ZhciB0PXRoaXMsbz1hKFwiI1wiK3Quc2NvcGUuaWQpLGU9dC5vcHRpb25zLmFuaW1hdGlvbjtcIm5vbmVcIj09PWUmJihvLnJlbW92ZUNsYXNzKFwibW9kYWFsLXN0YXJ0X25vbmVcIiksdC5vcHRpb25zLmFmdGVyX29wZW4uY2FsbCh0LG8pKSxcImZhZGVcIj09PWUmJm8ucmVtb3ZlQ2xhc3MoXCJtb2RhYWwtc3RhcnRfZmFkZVwiKSxcInNsaWRlLWRvd25cIj09PWUmJm8ucmVtb3ZlQ2xhc3MoXCJtb2RhYWwtc3RhcnRfc2xpZGVfZG93blwiKTt2YXIgaT1vO2EoXCIubW9kYWFsLXdyYXBwZXIgKlt0YWJpbmRleD0wXVwiKS5yZW1vdmVBdHRyKFwidGFiaW5kZXhcIiksaT1cImltYWdlXCI9PXQub3B0aW9ucy50eXBlP2EoXCIjXCIrdC5zY29wZS5pZCkuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLlwiK3QucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcyk6by5maW5kKFwiLm1vZGFhbC1pZnJhbWUtZWxlbVwiKS5sZW5ndGg/by5maW5kKFwiLm1vZGFhbC1pZnJhbWUtZWxlbVwiKTpvLmZpbmQoXCIubW9kYWFsLXZpZGVvLXdyYXBcIikubGVuZ3RoP28uZmluZChcIi5tb2RhYWwtdmlkZW8td3JhcFwiKTpvLmZpbmQoXCIubW9kYWFsLWZvY3VzXCIpLGkuYXR0cihcInRhYmluZGV4XCIsXCIwXCIpLmZvY3VzKCksXCJub25lXCIhPT1lJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5vcHRpb25zLmFmdGVyX29wZW4uY2FsbCh0LG8pfSx0Lm9wdGlvbnMuYWZ0ZXJfY2FsbGJhY2tfZGVsYXkpfSxtb2RhYWxfY2xvc2U6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG89YShcIiNcIit0LnNjb3BlLmlkKTt0Lm9wdGlvbnMuYmVmb3JlX2Nsb3NlLmNhbGwodCxvKSxudWxsIT09dC54aHImJih0Lnhoci5hYm9ydCgpLHQueGhyPW51bGwpLFwibm9uZVwiPT09dC5vcHRpb25zLmFuaW1hdGlvbiYmby5hZGRDbGFzcyhcIm1vZGFhbC1zdGFydF9ub25lXCIpLFwiZmFkZVwiPT09dC5vcHRpb25zLmFuaW1hdGlvbiYmby5hZGRDbGFzcyhcIm1vZGFhbC1zdGFydF9mYWRlXCIpLFwic2xpZGUtZG93blwiPT09dC5vcHRpb25zLmFuaW1hdGlvbiYmby5hZGRDbGFzcyhcIm1vZGFhbC1zdGFydF9zbGlkZV9kb3duXCIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcImlubGluZVwiPT10Lm9wdGlvbnMudHlwZSYmYShcIiNcIit0LnNjb3BlLmlkK1wiIC5tb2RhYWwtY29udGVudC1jb250YWluZXJcIikuY29udGVudHMoKS5kZXRhY2goKS5hcHBlbmRUbyh0LnNjb3BlLnNvdXJjZSksby5yZW1vdmUoKSx0Lm9wdGlvbnMuYWZ0ZXJfY2xvc2UuY2FsbCh0KSx0LnNjb3BlLmlzX29wZW49ITF9LHQub3B0aW9ucy5hZnRlcl9jYWxsYmFja19kZWxheSksdC5tb2RhYWxfb3ZlcmxheShcImhpZGVcIiksbnVsbCE9dC5sYXN0Rm9jdXMmJnQubGFzdEZvY3VzLmZvY3VzKCl9LG1vZGFhbF9vdmVybGF5OmZ1bmN0aW9uKHQpe3ZhciBvPXRoaXM7XCJzaG93XCI9PXQ/KG8uc2NvcGUuaXNfb3Blbj0hMCxvLm9wdGlvbnMuYmFja2dyb3VuZF9zY3JvbGx8fG8uZG9tLmFkZENsYXNzKFwibW9kYWFsLW5vc2Nyb2xsXCIpLGEoXCIjXCIrby5zY29wZS5pZCtcIl9vdmVybGF5XCIpLmxlbmd0aDwxJiZvLmRvbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtb2RhYWwtb3ZlcmxheVwiIGlkPVwiJytvLnNjb3BlLmlkKydfb3ZlcmxheVwiPjwvZGl2PicpLGEoXCIjXCIrby5zY29wZS5pZCtcIl9vdmVybGF5XCIpLmNzcyhcImJhY2tncm91bmRcIixvLm9wdGlvbnMuYmFja2dyb3VuZCkuc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6by5vcHRpb25zLm92ZXJsYXlfb3BhY2l0eX0sby5vcHRpb25zLmFuaW1hdGlvbl9zcGVlZCxmdW5jdGlvbigpe28ubW9kYWFsX29wZW4oKX0pKTpcImhpZGVcIj09dCYmYShcIiNcIitvLnNjb3BlLmlkK1wiX292ZXJsYXlcIikuc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6MH0sby5vcHRpb25zLmFuaW1hdGlvbl9zcGVlZCxmdW5jdGlvbigpe2EodGhpcykucmVtb3ZlKCksby5kb20ucmVtb3ZlQ2xhc3MoXCJtb2RhYWwtbm9zY3JvbGxcIil9KX0saXNfdG91Y2g6ZnVuY3Rpb24oKXtyZXR1cm5cIm9udG91Y2hzdGFydFwiaW4gd2luZG93fHxuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHN9fSxlPVtdO2EuZm4ubW9kYWFsPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSl7dmFyIGw9YSh0aGlzKS5kYXRhKFwibW9kYWFsXCIpO2lmKGwpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXN3aXRjaCh0KXtjYXNlXCJvcGVuXCI6bC5jcmVhdGVfbW9kYWFsKGwpO2JyZWFrO2Nhc2VcImNsb3NlXCI6bC5tb2RhYWxfY2xvc2UoKX19ZWxzZXt2YXIgbj1PYmplY3QuY3JlYXRlKG8pO24uaW5pdCh0LHRoaXMpLGEuZGF0YSh0aGlzLFwibW9kYWFsXCIsbiksZS5wdXNoKHtlbGVtZW50OmEodGhpcykuYXR0cihcImNsYXNzXCIpLG9wdGlvbnM6dH0pfX0pfSxhLmZuLm1vZGFhbC5vcHRpb25zPXt0eXBlOlwiaW5saW5lXCIsY29udGVudF9zb3VyY2U6bnVsbCxhbmltYXRpb246XCJmYWRlXCIsYW5pbWF0aW9uX3NwZWVkOjMwMCxhZnRlcl9jYWxsYmFja19kZWxheTozNTAsaXNfbG9ja2VkOiExLGhpZGVfY2xvc2U6ITEsYmFja2dyb3VuZDpcIiMwMDBcIixvdmVybGF5X29wYWNpdHk6XCIwLjhcIixvdmVybGF5X2Nsb3NlOiEwLGFjY2Vzc2libGVfdGl0bGU6XCJEaWFsb2cgV2luZG93XCIsc3RhcnRfb3BlbjohMSxmdWxsc2NyZWVuOiExLGN1c3RvbV9jbGFzczpcIlwiLGJhY2tncm91bmRfc2Nyb2xsOiExLHNob3VsZF9vcGVuOiEwLGNsb3NlX3RleHQ6XCJDbG9zZVwiLGNsb3NlX2FyaWFfbGFiZWw6XCJDbG9zZSAoUHJlc3MgZXNjYXBlIHRvIGNsb3NlKVwiLHdpZHRoOm51bGwsaGVpZ2h0Om51bGwsYmVmb3JlX29wZW46ZnVuY3Rpb24oKXt9LGFmdGVyX29wZW46ZnVuY3Rpb24oKXt9LGJlZm9yZV9jbG9zZTpmdW5jdGlvbigpe30sYWZ0ZXJfY2xvc2U6ZnVuY3Rpb24oKXt9LHNvdXJjZTpmdW5jdGlvbihhLHQpe3JldHVybiB0fSxjb25maXJtX2J1dHRvbl90ZXh0OlwiQ29uZmlybVwiLGNvbmZpcm1fY2FuY2VsX2J1dHRvbl90ZXh0OlwiQ2FuY2VsXCIsY29uZmlybV90aXRsZTpcIkNvbmZpcm0gVGl0bGVcIixjb25maXJtX2NvbnRlbnQ6XCI8cD5UaGlzIGlzIHRoZSBkZWZhdWx0IGNvbmZpcm0gZGlhbG9nIGNvbnRlbnQuIFJlcGxhY2UgbWUgdGhyb3VnaCB0aGUgb3B0aW9uczwvcD5cIixjb25maXJtX2NhbGxiYWNrOmZ1bmN0aW9uKCl7fSxjb25maXJtX2NhbmNlbF9jYWxsYmFjazpmdW5jdGlvbigpe30sZ2FsbGVyeV9hY3RpdmVfY2xhc3M6XCJnYWxsZXJ5X2FjdGl2ZV9pdGVtXCIsb3V0ZXJfY29udHJvbHM6ITEsYmVmb3JlX2ltYWdlX2NoYW5nZTpmdW5jdGlvbihhLHQpe30sYWZ0ZXJfaW1hZ2VfY2hhbmdlOmZ1bmN0aW9uKGEpe30sbG9hZGluZ19jb250ZW50Oic8ZGl2IGNsYXNzPVwibW9kYWFsLWxvYWRpbmctc3Bpbm5lclwiPjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PC9kaXY+Jyxsb2FkaW5nX2NsYXNzOlwiaXNfbG9hZGluZ1wiLGFqYXhfZXJyb3JfY2xhc3M6XCJtb2RhYWwtZXJyb3JcIixhamF4X3N1Y2Nlc3M6ZnVuY3Rpb24oKXt9LGluc3RhZ3JhbV9pZDpudWxsfSxhKGZ1bmN0aW9uKCl7dmFyIG89YShcIi5tb2RhYWxcIik7by5sZW5ndGgmJm8uZWFjaChmdW5jdGlvbigpe3QoYSh0aGlzKSl9KTt2YXIgaT1uZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihvKXtvLmZvckVhY2goZnVuY3Rpb24obyl7aWYoby5hZGRlZE5vZGVzJiZvLmFkZGVkTm9kZXMubGVuZ3RoPjApe1tdLnNvbWUuY2FsbChvLmFkZGVkTm9kZXMsZnVuY3Rpb24obyl7dmFyIGk9YShvKTsoaS5pcyhcImFcIil8fGkuaXMoXCJidXR0b25cIikpJiYoaS5oYXNDbGFzcyhcIm1vZGFhbFwiKT90KGkpOmUuZm9yRWFjaChmdW5jdGlvbih0KXtpZih0LmVsZW1lbnQ9PWkuYXR0cihcImNsYXNzXCIpKXJldHVybiBhKGkpLm1vZGFhbCh0Lm9wdGlvbnMpLCExfSkpfSl9fSl9KSxsPXtzdWJ0cmVlOiEwLGF0dHJpYnV0ZXM6ITAsY2hpbGRMaXN0OiEwLGNoYXJhY3RlckRhdGE6ITB9O3NldFRpbWVvdXQoZnVuY3Rpb24oKXtpLm9ic2VydmUoZG9jdW1lbnQuYm9keSxsKX0sNTAwKX0pfShqUXVlcnksd2luZG93LGRvY3VtZW50KTtcbiIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRkb2N1bWVudC5ib2R5LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG59ICk7XG4iXX0=
