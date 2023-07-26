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

  var config = require('./config.js'); // ハンバーガーボタンのクリック処理


  $('.p-header__button').click(function () {
    $(this).children('span').toggleClass('open');
    $('#menu-header-menu').toggleClass('open');
  }); // 親メニューのクリック処理

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
  }); // 画面がリサイズされたとき、全てのクラス名を削除

  $(window).resize(function () {
    $('.p-header__button').children('span').removeClass('open');
    $('#menu-header-menu').removeClass('open');
    $('.menu-item-has-children').children('a').removeClass('open');
    $('.menu-item-has-children').children('.sub-menu').removeClass('open');
    $('#menu-header-menu').removeClass('is-long');
  }); // Go to Topボタン / 背景パララックス処理

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
      } // PCサイズ以上：背景パララックスの処理


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
  }); // Go to Topボタンのクリック処理

  pagetop.click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 300); // 0.3秒かけてトップへ移動

    return false;
  }); // Go to Topボタンのhover処理

  $('.p-go-to-top__icon').hover(function () {
    $(this).addClass('is-hover');
    $(this).removeClass('is-out');
  }, function () {
    $(this).addClass('is-out');
    $(this).removeClass('is-hover');
  }); // トップのコンテンツ部分にスクロールした瞬間、背景画像が横からスライドする動き

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb25maWcuanMiLCJzcmMvc2NyaXB0cy9lZmZlY3QuanMiLCJzcmMvc2NyaXB0cy9pbmZpbml0ZXNsaWRldjIuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvbW9kYWFsL2pzL21vZGFhbC5taW4uanMiLCJzcmMvc2NyaXB0cy9wYWdlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsTUFBTSxDQUFFLFVBQVUsQ0FBVixFQUFjO0FBQ3JCO0FBQ0Q7QUFDQTtBQUNDLEVBQUEsQ0FBQyxDQUFFLHlCQUFGLENBQUQsQ0FBK0IsYUFBL0IsQ0FBOEM7QUFDN0MsaUJBQWdCLE1BRDZCO0FBRTdDLGFBQWdCLEVBRjZCO0FBRzdDLG9CQUFnQixJQUg2QjtBQUk3QyxhQUFnQixDQUo2QjtBQUs3QyxrQkFBZ0I7QUFMNkIsR0FBOUM7QUFPQSxFQUFBLENBQUMsQ0FBRSwwQkFBRixDQUFELENBQWdDLGFBQWhDLENBQStDO0FBQzlDLGlCQUFnQixPQUQ4QjtBQUU5QyxhQUFnQixFQUY4QjtBQUc5QyxvQkFBZ0IsSUFIOEI7QUFJOUMsYUFBZ0IsQ0FKOEI7QUFLOUMsa0JBQWdCO0FBTDhCLEdBQS9DO0FBUUE7QUFDRDtBQUNBOztBQUNDLEVBQUEsQ0FBQyxDQUFFLFVBQUYsQ0FBRCxDQUFnQixNQUFoQixDQUF5QjtBQUN4QixJQUFBLElBQUksRUFBRSxPQURrQjtBQUV4QixJQUFBLFVBQVUsRUFBRSxNQUZZO0FBR3hCLElBQUEsZUFBZSxFQUFFLEtBSE87QUFJeEIsSUFBQSxVQUFVLEVBQUU7QUFKWSxHQUF6QjtBQU1BLENBNUJLLENBQU47Ozs7O0FDQUE7QUFDQTtBQUdBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFlBQVc7QUFDMUIsRUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMkIsS0FBM0IsRUFBbUMsT0FBbkMsQ0FBNEMsVUFB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ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImpRdWVyeSggZnVuY3Rpb24oICQgKSB7XG5cdC8qXG5cdCAqIGluZmluaXRlc2xpZGVcblx0ICovXG5cdCQoICcuanMtaW5maW5pdGVzbGlkZS0tbGVmdCcgKS5pbmZpbml0ZXNsaWRlKCB7XG5cdFx0J2RpcmVjdGlvbicgICA6ICdsZWZ0Jyxcblx0XHQnc3BlZWQnICAgICAgIDogMjAsXG5cdFx0J3BhdXNlb25ob3Zlcic6IHRydWUsXG5cdFx0J2Nsb25lJyAgICAgICA6IDIsXG5cdFx0J3Jlc3BvbnNpdmUnICA6IHRydWUsXG5cdH0gKTtcblx0JCggJy5qcy1pbmZpbml0ZXNsaWRlLS1yaWdodCcgKS5pbmZpbml0ZXNsaWRlKCB7XG5cdFx0J2RpcmVjdGlvbicgICA6ICdyaWdodCcsXG5cdFx0J3NwZWVkJyAgICAgICA6IDIwLFxuXHRcdCdwYXVzZW9uaG92ZXInOiB0cnVlLFxuXHRcdCdjbG9uZScgICAgICAgOiAyLFxuXHRcdCdyZXNwb25zaXZlJyAgOiB0cnVlLFxuXHR9ICk7XG5cblx0Lypcblx0ICogTW9kYWFsXG5cdCAqL1xuXHQkKCAnLmdhbGxlcnknICkubW9kYWFsICgge1xuXHRcdHR5cGU6ICdpbWFnZScsXG5cdFx0YmFja2dyb3VuZDogJyNmZmYnLFxuXHRcdG92ZXJsYXlfb3BhY2l0eTogJzAuNScsXG5cdFx0ZnVsbHNjcmVlbjogdHJ1ZVxuXHR9ICk7XG59ICk7XG4iLCIvLyBjb25zdCBtdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcubXYnICk7XG4vLyBtdi5jbGFzc0xpc3QuYWRkKCAnaXMtZmFkZS1pbicgKTtcblxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcubXYnICkuZm9yRWFjaCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmNsYXNzTGlzdC5hZGQoICdpcy1mYWRlLWluJyApO1xuXHR9ICk7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcucC1sb2dvLS1oZWFkZXInICkuZm9yRWFjaCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmNsYXNzTGlzdC5hZGQoICdpcy1mYWRlLWluJyApO1xuXHR9ICk7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdib2R5JyApLmNsYXNzTGlzdC5hZGQoICdpcy1mYWRlLWluJyApO1xuXHRzY3JvbGxFZmZlY3QoKTtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCBmdW5jdGlvbigpIHtcblx0XHRzY3JvbGxFZmZlY3QoKTtcblx0fSApO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxFZmZlY3QoKSB7XG5cdGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5pcy1mYWRlJyApO1xuXG5cdGZvciAoIGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrICkge1xuXHRcdGxldCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG5cdFx0bGV0IHBvc2l0aW9uRnJvbVRvcCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuXHRcdGxldCBzY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblx0XHRsZXQgd2luZG93SCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuXHRcdGlmICggc2Nyb2xsID4gcG9zaXRpb25Gcm9tVG9wIC0gd2luZG93SCApIHtcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2lzLXNjcm9sbCcgKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8qXG5pbmZpbml0ZXNsaWRlLmpzIHYyXG52ZXJzaW9uOiAyLjAuMVxuQXV0aG9yOiBULk1vcmltb3RvXG5cbkNvcHlyaWdodCAyMDE3LCBULk1vcmltb3RvXG4qIEZyZWUgdG8gdXNlIGFuZCBhYnVzZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4qIC8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4vL2dpdGh1Yi5jb20vd29vZHJvb3RzL2luZmluaXRlc2xpZGV2MlxuKi9cblxuKGZ1bmN0aW9uKCQpe1xuXHQkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcblx0ICAgIHdpbmRvdy5sb2FkZWQgPSB0cnVlO1xuXHR9KTtcblx0JChmdW5jdGlvbigpe1xuXHRcdCQuZm4uaW5maW5pdGVzbGlkZSA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRcdFx0Ly9vcHRpb25cblx0XHRcdHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0J3NwZWVkJzogMTAwLCAvL+mAn+OBleOAgOWNmOS9jeOBr3B4L+enkuOBp+OBmeOAglxuXHRcdFx0XHQnZGlyZWN0aW9uJzogJ2xlZnQnLCAvL3VwL2Rvd24vbGVmdC9yaWdodOOBi+OCiemBuOaKnlxuXHRcdFx0XHQncGF1c2VvbmhvdmVyJzogdHJ1ZSwgLy/jg57jgqbjgrnjgqrjg7zjg5Djg7zjgafjgrnjg4jjg4Pjg5dcblx0XHRcdFx0J3Jlc3BvbnNpdmUnOiBmYWxzZSwgLy/lrZDopoHntKDjga7luYXjgpIl44Gn5oyH5a6a44GX44Gm44GE44KL44Go44GNXG5cdFx0XHRcdCdjbG9uZSc6IDFcblx0XHRcdH0sb3B0aW9ucyk7XG5cblx0XHRcdHZhciBzZXRDc3MgPSBmdW5jdGlvbihvYmosZGlyZWN0aW9uKXtcblx0XHRcdFx0JChvYmopLndyYXAoJzxkaXYgY2xhc3M9XCJpbmZpbml0ZXNsaWRlX3dyYXBcIj48L2Rpdj4nKS5wYXJlbnQoKS5jc3Moe1xuXHRcdFx0XHRcdG92ZXJmbG93OiAnaGlkZGVuJ1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZihkaXJlY3Rpb24gPT0gJ3VwJyB8fCBkaXJlY3Rpb24gPT0gJ2Rvd24nKXtcblx0XHRcdFx0XHR2YXIgZCA9ICdjb2x1bW4nO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBkID0gJ3Jvdyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKG9iaikuY3NzKHtcblx0XHRcdFx0XHRkaXNwbGF5OiAnZmxleCcsXG5cdFx0XHRcdFx0ZmxleFdyYXA6ICdub3dyYXAnLFxuXHRcdFx0XHRcdGFsaWduSXRlbXM6ICdjZW50ZXInLFxuXHRcdFx0XHRcdCctbXMtZmxleC1hbGlnbic6ICdjZW50ZXInLFxuXHRcdFx0XHRcdGZsZXhEaXJlY3Rpb246IGRcblx0XHRcdFx0fSkuY2hpbGRyZW4oKS5jc3Moe1xuXHRcdFx0XHRcdFx0ZmxleDogJ25vbmUnLFxuXHRcdFx0XHRcdFx0ZGlzcGxheTogJ2Jsb2NrJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc2V0Q2xvbmUgPSBmdW5jdGlvbihvYmosY2xvbmUpe1xuXHRcdFx0XHR2YXIgJGNsb25lID0gJChvYmopLmNoaWxkcmVuKCkuY2xvbmUodHJ1ZSkuYWRkQ2xhc3MoJ2luZmluaXRlc2xpZGVfY2xvbmUnKTtcblx0XHRcdFx0dmFyIGkgPSAxO1xuXHRcdFx0XHR3aGlsZShpIDw9IGNsb25lKXtcblx0XHRcdFx0XHQkY2xvbmUuY2xvbmUodHJ1ZSkuYXBwZW5kVG8oJChvYmopKTtcblx0XHRcdFx0XHRpKys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIGdldFdpZHRoID0gZnVuY3Rpb24ob2JqKXtcblx0XHRcdFx0dmFyIHcgPSAwO1xuXHRcdFx0XHQkKG9iaikuY2hpbGRyZW4oJzpub3QoLmluZmluaXRlc2xpZGVfY2xvbmUpJykuZWFjaChmdW5jdGlvbihrZXksdmFsdWUpe1xuXHRcdFx0XHRcdHcgPSB3ICsgJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHc7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZ2V0SGVpZ2h0ID0gZnVuY3Rpb24ob2JqKXtcblx0XHRcdFx0dmFyIGggPSAwO1xuXHRcdFx0XHQkKG9iaikuY2hpbGRyZW4oJzpub3QoLmluZmluaXRlc2xpZGVfY2xvbmUpJykuZWFjaChmdW5jdGlvbihrZXksdmFsdWUpe1xuXHRcdFx0XHRcdGggPSBoICsgJCh0aGlzKS5vdXRlckhlaWdodCh0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBoO1xuXHRcdFx0fVxuXG5cblx0XHRcdHZhciBnZXRTcGVlZCA9IGZ1bmN0aW9uKGwscyl7XG5cdFx0XHRcdHJldHVybiBsIC8gcztcblx0XHRcdH1cblx0XHRcdHZhciBnZXROdW0gPSBmdW5jdGlvbihvYmosZGlyZWN0aW9uKXtcblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICd1cCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0dmFyIG51bSA9IGdldEhlaWdodChvYmopO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBudW0gPSBnZXRXaWR0aChvYmopO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudW07XG5cdFx0XHR9XG5cblx0XHRcdHZhciBnZXRUcmFuc2xhdGUgPSBmdW5jdGlvbihudW0sZGlyZWN0aW9uKXtcblx0XHRcdFx0aWYoZGlyZWN0aW9uID09ICd1cCcgfHwgZGlyZWN0aW9uID09ICdkb3duJyl7XG5cdFx0XHRcdFx0dmFyIGkgPSAnMCwtJyArIG51bSArICdweCwwJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgaSA9ICctJyArIG51bSArICdweCwwLDAnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc2V0QW5pbSA9IGZ1bmN0aW9uKG9iaixpZCxkaXJlY3Rpb24sc3BlZWQpe1xuXHRcdFx0XHR2YXIgbnVtID0gZ2V0TnVtKG9iaixkaXJlY3Rpb24pO1xuXHRcdFx0XHRpZihkaXJlY3Rpb24gPT0gJ3VwJyB8fCBkaXJlY3Rpb24gPT0gJ2Rvd24nKXtcblx0XHRcdFx0XHQkKG9iaikucGFyZW50KCcuaW5maW5pdGVzbGlkZV93cmFwJykuY3NzKHtcblx0XHRcdFx0XHRcdGhlaWdodDogbnVtICsgJ3B4J1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBpID0gZ2V0VHJhbnNsYXRlKG51bSxkaXJlY3Rpb24pO1xuXG5cdFx0XHRcdCQob2JqKS5hdHRyKCdkYXRhLXN0eWxlJywnaW5maW5pdGVzbGlkZScgKyBpZCk7XG5cblx0XHRcdFx0dmFyIGNzcyA9ICdAa2V5ZnJhbWVzIGluZmluaXRlc2xpZGUnICsgaWQgKyAneycgK1xuXHRcdFx0XHRcdFx0XHRcdCdmcm9tIHt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO30nICtcblx0XHRcdFx0XHRcdFx0XHQndG8ge3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgnICsgaSArICcpO30nICtcblx0XHRcdFx0XHRcdFx0J30nO1xuXHRcdFx0XHQkKCc8c3R5bGUgLz4nKS5hdHRyKCdpZCcsJ2luZmluaXRlc2xpZGUnICsgaWQgKyAnX3N0eWxlJylcblx0XHRcdFx0Lmh0bWwoY3NzKVxuXHRcdFx0XHQuYXBwZW5kVG8oJ2hlYWQnKTtcblxuXHRcdFx0XHRpZihkaXJlY3Rpb24gPT0gJ3JpZ2h0JyB8fCBkaXJlY3Rpb24gPT0gJ2Rvd24nKXtcblx0XHRcdFx0XHR2YXIgcmV2ZXJzZSA9ICcgcmV2ZXJzZSc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIHJldmVyc2UgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCQob2JqKS5jc3Moe1xuXHRcdFx0XHRcdGFuaW1hdGlvbjogJ2luZmluaXRlc2xpZGUnICsgaWQgKyAnICcgKyBnZXRTcGVlZChudW0sc3BlZWQpICsgJ3MgbGluZWFyIDBzIGluZmluaXRlJyArIHJldmVyc2Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgc2V0U3RvcCA9IGZ1bmN0aW9uKG9iail7XG5cdFx0XHRcdCQob2JqKS5vbignbW91c2VlbnRlcicsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKHRoaXMpLmNzcyh7XG5cdFx0XHRcdFx0XHRhbmltYXRpb25QbGF5U3RhdGU6ICdwYXVzZWQnXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pLm9uKCdtb3VzZWxlYXZlJyxmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCQodGhpcykuY3NzKHtcblx0XHRcdFx0XHRcdGFuaW1hdGlvblBsYXlTdGF0ZTogJ3J1bm5pbmcnXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc2V0UmVzcG9uc2l2ZSA9IGZ1bmN0aW9uKG9iaixkaXJlY3Rpb24pe1xuXHRcdFx0XHRcdHZhciBudW0gPSBnZXROdW0ob2JqLGRpcmVjdGlvbik7XG5cdFx0XHRcdFx0dmFyIGkgPSBnZXRUcmFuc2xhdGUobnVtLGRpcmVjdGlvbik7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH07XG5cblxuXG5cblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oa2V5LHZhbHVlKXtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIG51bSA9IERhdGUubm93KCkgKyBNYXRoLmZsb29yKDEwMDAwKk1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKDE2KTtcblx0XHRcdFx0aWYoc2V0dGluZ3MucGF1c2VvbmhvdmVyID09IHRydWUpe1xuXHRcdFx0XHRcdHNldFN0b3AoJHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBfb25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRzZXRDc3MoJHRoaXMsc2V0dGluZ3MuZGlyZWN0aW9uKTtcblx0XHRcdFx0XHRzZXRDbG9uZSgkdGhpcyxzZXR0aW5ncy5jbG9uZSk7XG5cdFx0XHRcdFx0c2V0QW5pbSgkdGhpcyxudW0sc2V0dGluZ3MuZGlyZWN0aW9uLHNldHRpbmdzLnNwZWVkKTtcblxuXHRcdFx0XHRcdGlmKHNldHRpbmdzLnJlc3BvbnNpdmUpe1xuXHRcdFx0XHRcdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdHZhciBpID0gc2V0UmVzcG9uc2l2ZSgkdGhpcyxzZXR0aW5ncy5kaXJlY3Rpb24pO1xuXHRcdFx0XHRcdFx0XHR2YXIgc3R5bGVpZCA9ICR0aGlzLmF0dHIoJ2RhdGEtc3R5bGUnKTtcblx0XHRcdFx0XHRcdFx0dmFyIHN0eWxlaHRtbCA9ICQoJyMnICsgc3R5bGVpZCArICdfc3R5bGUnKS5odG1sKCk7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHN0eWxlaHRtbF9uZXcgPSBzdHlsZWh0bWwucmVwbGFjZSgvdG8ge3RyYW5zZm9ybTp0cmFuc2xhdGUzZFxcKCguKj8pXFwpLywndG8ge3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgnICsgaSArICcpJyk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnICsgc3R5bGVpZCArICdfc3R5bGUnKS5odG1sKHN0eWxlaHRtbF9uZXcpO1xuXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0aWYgKHdpbmRvdy5sb2FkZWQpIHtcblx0XHRcdFx0XHRfb25sb2FkKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uKCdsb2FkJywgX29ubG9hZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0fVxuXHR9KTtcbn0pKGpRdWVyeSk7XG4iLCIvKlxuICogTG90dGllXG4gKi9cbi8vIChmdW5jdGlvbiAoKSB7XG4vLyBcdGNvbnN0IGFuaW0gPSBsb3R0aWUubG9hZEFuaW1hdGlvbih7XG4vLyBcdFx0Y29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2pzLXdhdmUnICksXG4vLyBcdFx0cmVuZGVyZXI6ICdzdmcnLFxuLy8gXHRcdGxvb3A6IHRydWUsXG4vLyBcdFx0YXV0b3BsYXk6IHRydWUsXG4vLyBcdFx0cGF0aDogJy4vZm9vdGVyX3dhdmUuanNvbidcbi8vIFx0fSk7XG4vLyB9KCkpO1xuXG5qUXVlcnkoIGZ1bmN0aW9uKCAkICkge1xuXHRjb25zdCBwYWdlbG9hZCAgICA9IHJlcXVpcmUoICcuL3BhZ2Vsb2FkLmpzJyApO1xuICAgIGNvbnN0IGVmZmVjdCAgICAgID0gcmVxdWlyZSggJy4vZWZmZWN0LmpzJyApO1xuICAgIGNvbnN0IHNsaWRlICAgICAgID0gcmVxdWlyZSggJy4vaW5maW5pdGVzbGlkZXYyLmpzJyApO1xuICAgIGNvbnN0IG1vZGFhbG1pbmpzID0gcmVxdWlyZSggJy4vbW9kYWFsL2pzL21vZGFhbC5taW4uanMnICk7XG5cdGNvbnN0IGNvbmZpZyAgICAgID0gcmVxdWlyZSggJy4vY29uZmlnLmpzJyApO1xuXG5cdC8vIOODj+ODs+ODkOODvOOCrOODvOODnOOCv+ODs+OBruOCr+ODquODg+OCr+WHpueQhlxuICAgICQoJy5wLWhlYWRlcl9fYnV0dG9uJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCdzcGFuJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblx0XHQkKCcjbWVudS1oZWFkZXItbWVudScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgfSk7XG5cbiAgICAvLyDopqrjg6Hjg4vjg6Xjg7zjga7jgq/jg6rjg4Pjgq/lh6bnkIZcbiAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCdhJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignLnN1Yi1tZW51JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJCgnI21lbnUtaGVhZGVyLW1lbnUnKS50b2dnbGVDbGFzcygnaXMtbG9uZycpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8g6Kaq44Oh44OL44Ol44O844Gu5aSW5YG044KS44Kv44Oq44OD44Kv44GX44Gf44Go44GN44CB44Kv44Op44K55ZCN44KS5YmK6ZmkXG4gICAgICAgIGlmKCEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJ2EnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgJCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKS5jaGlsZHJlbignLnN1Yi1tZW51JykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICQoJyNtZW51LWhlYWRlci1tZW51JykucmVtb3ZlQ2xhc3MoJ2lzLWxvbmcnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g55S76Z2i44GM44Oq44K144Kk44K644GV44KM44Gf44Go44GN44CB5YWo44Gm44Gu44Kv44Op44K55ZCN44KS5YmK6ZmkXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgICAgICAkKCcucC1oZWFkZXJfX2J1dHRvbicpLmNoaWxkcmVuKCdzcGFuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcblx0XHQkKCcjbWVudS1oZWFkZXItbWVudScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykuY2hpbGRyZW4oJ2EnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmNoaWxkcmVuKCcuc3ViLW1lbnUnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcjbWVudS1oZWFkZXItbWVudScpLnJlbW92ZUNsYXNzKCdpcy1sb25nJyk7XG4gICAgfSk7XG5cbiAgICAvLyBHbyB0byBUb3Djg5zjgr/jg7MgLyDog4zmma/jg5Hjg6njg6njg4Pjgq/jgrnlh6bnkIZcbiAgICB2YXIgcGFnZXRvcCA9ICQoJy5wLWdvLXRvLXRvcCcpO1xuICAgIHBhZ2V0b3AuaGlkZSgpO1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2Nyb2xsZWQgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIHZhciBiZzEgPSAkKCcuYy1iZy0tcGFyYWxsYXgxJyk7XG4gICAgICAgIHZhciBiZzIgPSAkKCcuYy1iZy0tcGFyYWxsYXgyJyk7XG4gICAgICAgIHZhciB3ZWlnaHQxID0gMC41O1xuICAgICAgICB2YXIgd2VpZ2h0MiA9IDAuMjtcbiAgICAgICAgdmFyIHdpbmRvd1NpemUgPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgaWYgKHdpbmRvd1NpemUgPj0gNzUxKSB7IC8vIOOCueOCr+ODreODvOODq+ODkOODvOOBruW5heOCkuWKoOWRs+OBl+OBpig3NjgtMTcpcHjjgafmjIflrppcbiAgICAgICAgICAgIC8vIFBD44K144Kk44K65Lul5LiK77yaR28gdG8gVG9w44Oc44K/44Oz44Gu5Yem55CGXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPiAxMDApIHsgLy8gMTAwcHjjgrnjgq/jg63jg7zjg6vjgZfjgZ/jgonjg5zjgr/jg7PooajnpLpcbiAgICAgICAgICAgICAgICBwYWdldG9wLmZhZGVJbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWdldG9wLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICAgICAkKCcucC1nby10by10b3BfX2ljb24nKS5yZW1vdmVDbGFzcygnaXMtb3V0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBD44K144Kk44K65Lul5LiK77ya6IOM5pmv44OR44Op44Op44OD44Kv44K544Gu5Yem55CGXG4gICAgICAgICAgICBpZiAod2luZG93U2l6ZSA+PSAxMTgzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWwgPSAyMTY7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd1NpemUgPj0gMTAwNykge1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsID0gMTQwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbCA9IDEwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJnMS5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24nLCAnbGVmdCB0b3AgLScrIHNjcm9sbGVkICogd2VpZ2h0MSArICdweCcpO1xuICAgICAgICAgICAgYmcyLmNzcygnYmFja2dyb3VuZC1wb3NpdGlvbi15JywgaW5pdGlhbCAtIHNjcm9sbGVkICogd2VpZ2h0MiArICdweCcpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBQQ+OCteOCpOOCuuacqua6gO+8muODkeODqeODqeODg+OCr+OCueOBruOCueODlOODvOODieOCkumBheOCieOBm+OCi1xuICAgICAgICAgICAgdmFyIGluaXRpYWwgPSA1MDtcbiAgICAgICAgICAgIGJnMS5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24nLCAnbGVmdCB0b3AgLScrIHNjcm9sbGVkICogd2VpZ2h0MSAqIDAuNSArICdweCcpO1xuICAgICAgICAgICAgYmcyLmNzcygnYmFja2dyb3VuZC1wb3NpdGlvbi15JywgaW5pdGlhbCAtIHNjcm9sbGVkICogd2VpZ2h0MiAqIDAuMiArICdweCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBHbyB0byBUb3Djg5zjgr/jg7Pjga7jgq/jg6rjg4Pjgq/lh6bnkIZcbiAgICBwYWdldG9wLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sIDMwMCk7ICAvLyAwLjPnp5LjgYvjgZHjgabjg4jjg4Pjg5fjgbjnp7vli5VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLy8gR28gdG8gVG9w44Oc44K/44Oz44GuaG92ZXLlh6bnkIZcbiAgICAkKCcucC1nby10by10b3BfX2ljb24nKS5ob3ZlcihmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1ob3ZlcicpO1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1vdXQnKTtcbiAgICB9LCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1vdXQnKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtaG92ZXInKTtcbiAgICB9KTtcblxuICAgIC8vIOODiOODg+ODl+OBruOCs+ODs+ODhuODs+ODhOmDqOWIhuOBq+OCueOCr+ODreODvOODq+OBl+OBn+eerOmWk+OAgeiDjOaZr+eUu+WDj+OBjOaoquOBi+OCieOCueODqeOCpOODieOBmeOCi+WLleOBjVxuICAgICQoJy5wLXRvcC1hcnRpY2xlLS13b3JrcywgLnAtdG9wLWFydGljbGUtLXNlcnZpY2UsIC5wLXRvcC1hcnRpY2xlLS1hYm91dC11cycpLmVhY2goZnVuY3Rpb24oaSwgZWxlbSl7XG4gICAgICAgIHZhciBjb250ZW50c1BPUyA9ICQoZWxlbSkub2Zmc2V0KCkudG9wO1xuICAgICAgICAkKHdpbmRvdykub24oJ2xvYWQgc2Nyb2xsIHJlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgd2luSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgIHZhciBzaG93Q2xhc3MgPSAnc2hvdyc7XG4gICAgICAgICAgICB2YXIgdGltaW5nID0gMjAwOyAvLyAyMDBweOOCs+ODs+ODhuODs+ODhOOBjOimi+OBiOOBn+OCieasoeOBrmlm5paH44GMdHJ1ZVxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA+PSBjb250ZW50c1BPUyAtIHdpbkhlaWdodCArIHRpbWluZyl7XG4gICAgICAgICAgICAgICAgJChlbGVtKS5hZGRDbGFzcyhzaG93Q2xhc3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsZW0pLnJlbW92ZUNsYXNzKHNob3dDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSApO1xuIiwiLyohXG5cdE1vZGFhbCAtIGFjY2Vzc2libGUgbW9kYWxzIC0gdjAuNC40XG5cdGJ5IEh1bWFhbiwgZm9yIGFsbCBodW1hbnMuXG5cdC8vaHVtYWFuLmNvbVxuICovXG4hZnVuY3Rpb24oYSl7ZnVuY3Rpb24gdChhKXt2YXIgdD17fSxvPSExO2EuYXR0cihcImRhdGEtbW9kYWFsLXR5cGVcIikmJihvPSEwLHQudHlwZT1hLmF0dHIoXCJkYXRhLW1vZGFhbC10eXBlXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZVwiKSYmKG89ITAsdC5jb250ZW50X3NvdXJjZT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZVwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtYW5pbWF0aW9uXCIpJiYobz0hMCx0LmFuaW1hdGlvbj1hLmF0dHIoXCJkYXRhLW1vZGFhbC1hbmltYXRpb25cIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWFuaW1hdGlvbi1zcGVlZFwiKSYmKG89ITAsdC5hbmltYXRpb25fc3BlZWQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtYW5pbWF0aW9uLXNwZWVkXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1hZnRlci1jYWxsYmFjay1kZWxheVwiKSYmKG89ITAsdC5hZnRlcl9jYWxsYmFja19kZWxheT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1hZnRlci1jYWxsYmFjay1kZWxheVwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtaXMtbG9ja2VkXCIpJiYobz0hMCx0LmlzX2xvY2tlZD1cInRydWVcIj09PWEuYXR0cihcImRhdGEtbW9kYWFsLWlzLWxvY2tlZFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtaGlkZS1jbG9zZVwiKSYmKG89ITAsdC5oaWRlX2Nsb3NlPVwidHJ1ZVwiPT09YS5hdHRyKFwiZGF0YS1tb2RhYWwtaGlkZS1jbG9zZVwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtYmFja2dyb3VuZFwiKSYmKG89ITAsdC5iYWNrZ3JvdW5kPWEuYXR0cihcImRhdGEtbW9kYWFsLWJhY2tncm91bmRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLW92ZXJsYXktb3BhY2l0eVwiKSYmKG89ITAsdC5vdmVybGF5X29wYWNpdHk9YS5hdHRyKFwiZGF0YS1tb2RhYWwtb3ZlcmxheS1vcGFjaXR5XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1vdmVybGF5LWNsb3NlXCIpJiYobz0hMCx0Lm92ZXJsYXlfY2xvc2U9XCJmYWxzZVwiIT09YS5hdHRyKFwiZGF0YS1tb2RhYWwtb3ZlcmxheS1jbG9zZVwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtYWNjZXNzaWJsZS10aXRsZVwiKSYmKG89ITAsdC5hY2Nlc3NpYmxlX3RpdGxlPWEuYXR0cihcImRhdGEtbW9kYWFsLWFjY2Vzc2libGUtdGl0bGVcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLXN0YXJ0LW9wZW5cIikmJihvPSEwLHQuc3RhcnRfb3Blbj1cInRydWVcIj09PWEuYXR0cihcImRhdGEtbW9kYWFsLXN0YXJ0LW9wZW5cIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWZ1bGxzY3JlZW5cIikmJihvPSEwLHQuZnVsbHNjcmVlbj1cInRydWVcIj09PWEuYXR0cihcImRhdGEtbW9kYWFsLWZ1bGxzY3JlZW5cIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWN1c3RvbS1jbGFzc1wiKSYmKG89ITAsdC5jdXN0b21fY2xhc3M9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY3VzdG9tLWNsYXNzXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jbG9zZS10ZXh0XCIpJiYobz0hMCx0LmNsb3NlX3RleHQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY2xvc2UtdGV4dFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY2xvc2UtYXJpYS1sYWJlbFwiKSYmKG89ITAsdC5jbG9zZV9hcmlhX2xhYmVsPWEuYXR0cihcImRhdGEtbW9kYWFsLWNsb3NlLWFyaWEtbGFiZWxcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWJhY2tncm91bmQtc2Nyb2xsXCIpJiYobz0hMCx0LmJhY2tncm91bmRfc2Nyb2xsPVwidHJ1ZVwiPT09YS5hdHRyKFwiZGF0YS1tb2RhYWwtYmFja2dyb3VuZC1zY3JvbGxcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLXdpZHRoXCIpJiYobz0hMCx0LndpZHRoPXBhcnNlSW50KGEuYXR0cihcImRhdGEtbW9kYWFsLXdpZHRoXCIpKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtaGVpZ2h0XCIpJiYobz0hMCx0LmhlaWdodD1wYXJzZUludChhLmF0dHIoXCJkYXRhLW1vZGFhbC1oZWlnaHRcIikpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLWJ1dHRvbi10ZXh0XCIpJiYobz0hMCx0LmNvbmZpcm1fYnV0dG9uX3RleHQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS1idXR0b24tdGV4dFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS1jYW5jZWwtYnV0dG9uLXRleHRcIikmJihvPSEwLHQuY29uZmlybV9jYW5jZWxfYnV0dG9uX3RleHQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtY29uZmlybS1jYW5jZWwtYnV0dG9uLXRleHRcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tdGl0bGVcIikmJihvPSEwLHQuY29uZmlybV90aXRsZT1hLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLXRpdGxlXCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1jb25maXJtLWNvbnRlbnRcIikmJihvPSEwLHQuY29uZmlybV9jb250ZW50PWEuYXR0cihcImRhdGEtbW9kYWFsLWNvbmZpcm0tY29udGVudFwiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtZ2FsbGVyeS1hY3RpdmUtY2xhc3NcIikmJihvPSEwLHQuZ2FsbGVyeV9hY3RpdmVfY2xhc3M9YS5hdHRyKFwiZGF0YS1tb2RhYWwtZ2FsbGVyeS1hY3RpdmUtY2xhc3NcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWxvYWRpbmctY29udGVudFwiKSYmKG89ITAsdC5sb2FkaW5nX2NvbnRlbnQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtbG9hZGluZy1jb250ZW50XCIpKSxhLmF0dHIoXCJkYXRhLW1vZGFhbC1sb2FkaW5nLWNsYXNzXCIpJiYobz0hMCx0LmxvYWRpbmdfY2xhc3M9YS5hdHRyKFwiZGF0YS1tb2RhYWwtbG9hZGluZy1jbGFzc1wiKSksYS5hdHRyKFwiZGF0YS1tb2RhYWwtYWpheC1lcnJvci1jbGFzc1wiKSYmKG89ITAsdC5hamF4X2Vycm9yX2NsYXNzPWEuYXR0cihcImRhdGEtbW9kYWFsLWFqYXgtZXJyb3ItY2xhc3NcIikpLGEuYXR0cihcImRhdGEtbW9kYWFsLWluc3RhZ3JhbS1pZFwiKSYmKG89ITAsdC5pbnN0YWdyYW1faWQ9YS5hdHRyKFwiZGF0YS1tb2RhYWwtaW5zdGFncmFtLWlkXCIpKSxvJiZhLm1vZGFhbCh0KX12YXIgbz17aW5pdDpmdW5jdGlvbih0LG8pe3ZhciBlPXRoaXM7aWYoZS5kb209YShcImJvZHlcIiksZS4kZWxlbT1hKG8pLGUub3B0aW9ucz1hLmV4dGVuZCh7fSxhLmZuLm1vZGFhbC5vcHRpb25zLGUuJGVsZW0uZGF0YSgpLHQpLGUueGhyPW51bGwsZS5zY29wZT17aXNfb3BlbjohMSxpZDpcIm1vZGFhbF9cIisobmV3IERhdGUpLmdldFRpbWUoKStNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMiksc291cmNlOmUub3B0aW9ucy5jb250ZW50X3NvdXJjZT9lLm9wdGlvbnMuY29udGVudF9zb3VyY2U6ZS4kZWxlbS5hdHRyKFwiaHJlZlwiKX0sZS4kZWxlbS5hdHRyKFwiZGF0YS1tb2RhYWwtc2NvcGVcIixlLnNjb3BlLmlkKSxlLnByaXZhdGVfb3B0aW9ucz17YWN0aXZlX2NsYXNzOlwiaXNfYWN0aXZlXCJ9LGUubGFzdEZvY3VzPW51bGwsZS5vcHRpb25zLmlzX2xvY2tlZHx8XCJjb25maXJtXCI9PWUub3B0aW9ucy50eXBlfHxlLm9wdGlvbnMuaGlkZV9jbG9zZT9lLnNjb3BlLmNsb3NlX2J0bj1cIlwiOmUuc2NvcGUuY2xvc2VfYnRuPSc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1vZGFhbC1jbG9zZVwiIGlkPVwibW9kYWFsLWNsb3NlXCIgYXJpYS1sYWJlbD1cIicrZS5vcHRpb25zLmNsb3NlX2FyaWFfbGFiZWwrJ1wiPjxzcGFuPicrZS5vcHRpb25zLmNsb3NlX3RleHQrXCI8L3NwYW4+PC9idXR0b24+XCIsXCJub25lXCI9PT1lLm9wdGlvbnMuYW5pbWF0aW9uJiYoZS5vcHRpb25zLmFuaW1hdGlvbl9zcGVlZD0wLGUub3B0aW9ucy5hZnRlcl9jYWxsYmFja19kZWxheT0wKSxhKG8pLm9uKFwiY2xpY2suTW9kYWFsXCIsZnVuY3Rpb24oYSl7YS5wcmV2ZW50RGVmYXVsdCgpLGUuY3JlYXRlX21vZGFhbChlLGEpfSksITA9PT1lLm9wdGlvbnMub3V0ZXJfY29udHJvbHMpdmFyIGk9XCJvdXRlclwiO2Vsc2UgdmFyIGk9XCJpbm5lclwiO2Uuc2NvcGUucHJldl9idG49JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibW9kYWFsLWdhbGxlcnktY29udHJvbCBtb2RhYWwtZ2FsbGVyeS1wcmV2IG1vZGFhbC1nYWxsZXJ5LXByZXYtJytpKydcIiBpZD1cIm1vZGFhbC1nYWxsZXJ5LXByZXZcIiBhcmlhLWxhYmVsPVwiUHJldmlvdXMgaW1hZ2UgKHVzZSBsZWZ0IGFycm93IHRvIGNoYW5nZSlcIj48c3Bhbj5QcmV2aW91cyBJbWFnZTwvc3Bhbj48L2J1dHRvbj4nLGUuc2NvcGUubmV4dF9idG49JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibW9kYWFsLWdhbGxlcnktY29udHJvbCBtb2RhYWwtZ2FsbGVyeS1uZXh0IG1vZGFhbC1nYWxsZXJ5LW5leHQtJytpKydcIiBpZD1cIm1vZGFhbC1nYWxsZXJ5LW5leHRcIiBhcmlhLWxhYmVsPVwiTmV4dCBpbWFnZSAodXNlIHJpZ2h0IGFycm93IHRvIGNoYW5nZSlcIj48c3Bhbj5OZXh0IEltYWdlPC9zcGFuPjwvYnV0dG9uPicsITA9PT1lLm9wdGlvbnMuc3RhcnRfb3BlbiYmZS5jcmVhdGVfbW9kYWFsKGUpfSxjcmVhdGVfbW9kYWFsOmZ1bmN0aW9uKGEsdCl7dmFyIG8sYT10aGlzO2lmKGEubGFzdEZvY3VzPWEuJGVsZW0sITEhPT1hLm9wdGlvbnMuc2hvdWxkX29wZW4mJihcImZ1bmN0aW9uXCIhPXR5cGVvZiBhLm9wdGlvbnMuc2hvdWxkX29wZW58fCExIT09YS5vcHRpb25zLnNob3VsZF9vcGVuKCkpKXtzd2l0Y2goYS5vcHRpb25zLmJlZm9yZV9vcGVuLmNhbGwoYSx0KSxhLm9wdGlvbnMudHlwZSl7Y2FzZVwiaW5saW5lXCI6YS5jcmVhdGVfYmFzaWMoKTticmVhaztjYXNlXCJhamF4XCI6bz1hLm9wdGlvbnMuc291cmNlKGEuJGVsZW0sYS5zY29wZS5zb3VyY2UpLGEuZmV0Y2hfYWpheChvKTticmVhaztjYXNlXCJjb25maXJtXCI6YS5vcHRpb25zLmlzX2xvY2tlZD0hMCxhLmNyZWF0ZV9jb25maXJtKCk7YnJlYWs7Y2FzZVwiaW1hZ2VcIjphLmNyZWF0ZV9pbWFnZSgpO2JyZWFrO2Nhc2VcImlmcmFtZVwiOm89YS5vcHRpb25zLnNvdXJjZShhLiRlbGVtLGEuc2NvcGUuc291cmNlKSxhLmNyZWF0ZV9pZnJhbWUobyk7YnJlYWs7Y2FzZVwidmlkZW9cIjphLmNyZWF0ZV92aWRlbyhhLnNjb3BlLnNvdXJjZSk7YnJlYWs7Y2FzZVwiaW5zdGFncmFtXCI6YS5jcmVhdGVfaW5zdGFncmFtKCl9YS53YXRjaF9ldmVudHMoKX19LHdhdGNoX2V2ZW50czpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dC5kb20ub2ZmKFwiY2xpY2suTW9kYWFsIGtleXVwLk1vZGFhbCBrZXlkb3duLk1vZGFhbFwiKSx0LmRvbS5vbihcImtleWRvd24uTW9kYWFsXCIsZnVuY3Rpb24obyl7dmFyIGU9by5rZXlDb2RlLGk9by50YXJnZXQ7OT09ZSYmdC5zY29wZS5pc19vcGVuJiYoYS5jb250YWlucyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LnNjb3BlLmlkKSxpKXx8YShcIiNcIit0LnNjb3BlLmlkKS5maW5kKCcqW3RhYmluZGV4PVwiMFwiXScpLmZvY3VzKCkpfSksdC5kb20ub24oXCJrZXl1cC5Nb2RhYWxcIixmdW5jdGlvbihvKXt2YXIgZT1vLmtleUNvZGUsaT1vLnRhcmdldDtyZXR1cm4gby5zaGlmdEtleSYmOT09by5rZXlDb2RlJiZ0LnNjb3BlLmlzX29wZW4mJihhLmNvbnRhaW5zKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQuc2NvcGUuaWQpLGkpfHxhKFwiI1wiK3Quc2NvcGUuaWQpLmZpbmQoXCIubW9kYWFsLWNsb3NlXCIpLmZvY3VzKCkpLCF0Lm9wdGlvbnMuaXNfbG9ja2VkJiYyNz09ZSYmdC5zY29wZS5pc19vcGVuPyFhKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmlzKFwiaW5wdXQ6bm90KDpjaGVja2JveCk6bm90KDpyYWRpbylcIikmJnZvaWQgdC5tb2RhYWxfY2xvc2UoKTpcImltYWdlXCI9PXQub3B0aW9ucy50eXBlPygzNz09ZSYmdC5zY29wZS5pc19vcGVuJiYhYShcIiNcIit0LnNjb3BlLmlkK1wiIC5tb2RhYWwtZ2FsbGVyeS1wcmV2XCIpLmhhc0NsYXNzKFwiaXNfaGlkZGVuXCIpJiZ0LmdhbGxlcnlfdXBkYXRlKFwicHJldlwiKSx2b2lkKDM5PT1lJiZ0LnNjb3BlLmlzX29wZW4mJiFhKFwiI1wiK3Quc2NvcGUuaWQrXCIgLm1vZGFhbC1nYWxsZXJ5LW5leHRcIikuaGFzQ2xhc3MoXCJpc19oaWRkZW5cIikmJnQuZ2FsbGVyeV91cGRhdGUoXCJuZXh0XCIpKSk6dm9pZCAwfSksdC5kb20ub24oXCJjbGljay5Nb2RhYWxcIixmdW5jdGlvbihvKXt2YXIgZT1hKG8udGFyZ2V0KTtpZighdC5vcHRpb25zLmlzX2xvY2tlZCYmKHQub3B0aW9ucy5vdmVybGF5X2Nsb3NlJiZlLmlzKFwiLm1vZGFhbC1pbm5lci13cmFwcGVyXCIpfHxlLmlzKFwiLm1vZGFhbC1jbG9zZVwiKXx8ZS5jbG9zZXN0KFwiLm1vZGFhbC1jbG9zZVwiKS5sZW5ndGgpKXJldHVybiB2b2lkIHQubW9kYWFsX2Nsb3NlKCk7aWYoZS5pcyhcIi5tb2RhYWwtY29uZmlybS1idG5cIikpcmV0dXJuIGUuaXMoXCIubW9kYWFsLW9rXCIpJiZ0Lm9wdGlvbnMuY29uZmlybV9jYWxsYmFjay5jYWxsKHQsdC5sYXN0Rm9jdXMpLGUuaXMoXCIubW9kYWFsLWNhbmNlbFwiKSYmdC5vcHRpb25zLmNvbmZpcm1fY2FuY2VsX2NhbGxiYWNrLmNhbGwodCx0Lmxhc3RGb2N1cyksdm9pZCB0Lm1vZGFhbF9jbG9zZSgpO2lmKGUuaXMoXCIubW9kYWFsLWdhbGxlcnktY29udHJvbFwiKSl7aWYoZS5oYXNDbGFzcyhcImlzX2hpZGRlblwiKSlyZXR1cm47cmV0dXJuIGUuaXMoXCIubW9kYWFsLWdhbGxlcnktcHJldlwiKSYmdC5nYWxsZXJ5X3VwZGF0ZShcInByZXZcIiksdm9pZChlLmlzKFwiLm1vZGFhbC1nYWxsZXJ5LW5leHRcIikmJnQuZ2FsbGVyeV91cGRhdGUoXCJuZXh0XCIpKX19KX0sYnVpbGRfbW9kYWw6ZnVuY3Rpb24odCl7dmFyIG89dGhpcyxlPVwiXCI7XCJpbnN0YWdyYW1cIj09by5vcHRpb25zLnR5cGUmJihlPVwiIG1vZGFhbC1pbnN0YWdyYW1cIik7dmFyIGksbD1cInZpZGVvXCI9PW8ub3B0aW9ucy50eXBlP1wibW9kYWFsLXZpZGVvLXdyYXBcIjpcIm1vZGFhbC1jb250ZW50XCI7c3dpdGNoKG8ub3B0aW9ucy5hbmltYXRpb24pe2Nhc2VcImZhZGVcIjppPVwiIG1vZGFhbC1zdGFydF9mYWRlXCI7YnJlYWs7Y2FzZVwic2xpZGUtZG93blwiOmk9XCIgbW9kYWFsLXN0YXJ0X3NsaWRlZG93blwiO2JyZWFrO2RlZmF1bHQ6aT1cIiBtb2RhYWwtc3RhcnRfbm9uZVwifXZhciBuPVwiXCI7by5vcHRpb25zLmZ1bGxzY3JlZW4mJihuPVwiIG1vZGFhbC1mdWxsc2NyZWVuXCIpLFwiXCI9PT1vLm9wdGlvbnMuY3VzdG9tX2NsYXNzJiZ2b2lkIDA9PT1vLm9wdGlvbnMuY3VzdG9tX2NsYXNzfHwoby5vcHRpb25zLmN1c3RvbV9jbGFzcz1cIiBcIitvLm9wdGlvbnMuY3VzdG9tX2NsYXNzKTt2YXIgcz1cIlwiO28ub3B0aW9ucy53aWR0aCYmby5vcHRpb25zLmhlaWdodCYmXCJudW1iZXJcIj09dHlwZW9mIG8ub3B0aW9ucy53aWR0aCYmXCJudW1iZXJcIj09dHlwZW9mIG8ub3B0aW9ucy5oZWlnaHQ/cz0nIHN0eWxlPVwibWF4LXdpZHRoOicrby5vcHRpb25zLndpZHRoK1wicHg7aGVpZ2h0OlwiK28ub3B0aW9ucy5oZWlnaHQrJ3B4O292ZXJmbG93OmF1dG87XCInOm8ub3B0aW9ucy53aWR0aCYmXCJudW1iZXJcIj09dHlwZW9mIG8ub3B0aW9ucy53aWR0aD9zPScgc3R5bGU9XCJtYXgtd2lkdGg6JytvLm9wdGlvbnMud2lkdGgrJ3B4O1wiJzpvLm9wdGlvbnMuaGVpZ2h0JiZcIm51bWJlclwiPT10eXBlb2Ygby5vcHRpb25zLmhlaWdodCYmKHM9JyBzdHlsZT1cImhlaWdodDonK28ub3B0aW9ucy5oZWlnaHQrJ3B4O292ZXJmbG93OmF1dG87XCInKSwoXCJpbWFnZVwiPT1vLm9wdGlvbnMudHlwZXx8XCJ2aWRlb1wiPT1vLm9wdGlvbnMudHlwZXx8XCJpbnN0YWdyYW1cIj09by5vcHRpb25zLnR5cGV8fG8ub3B0aW9ucy5mdWxsc2NyZWVuKSYmKHM9XCJcIik7dmFyIGQ9XCJcIjtvLmlzX3RvdWNoKCkmJihkPScgc3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtcIicpO3ZhciByPSc8ZGl2IGNsYXNzPVwibW9kYWFsLXdyYXBwZXIgbW9kYWFsLScrby5vcHRpb25zLnR5cGUraStlK24rby5vcHRpb25zLmN1c3RvbV9jbGFzcysnXCIgaWQ9XCInK28uc2NvcGUuaWQrJ1wiPjxkaXYgY2xhc3M9XCJtb2RhYWwtb3V0ZXItd3JhcHBlclwiPjxkaXYgY2xhc3M9XCJtb2RhYWwtaW5uZXItd3JhcHBlclwiJytkK1wiPlwiO1widmlkZW9cIiE9by5vcHRpb25zLnR5cGUmJihyKz0nPGRpdiBjbGFzcz1cIm1vZGFhbC1jb250YWluZXJcIicrcytcIj5cIikscis9JzxkaXYgY2xhc3M9XCInK2wrJyBtb2RhYWwtZm9jdXNcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgYXJpYS1sYWJlbD1cIicrby5vcHRpb25zLmFjY2Vzc2libGVfdGl0bGUrXCIgLSBcIitvLm9wdGlvbnMuY2xvc2VfYXJpYV9sYWJlbCsnXCIgcm9sZT1cImRpYWxvZ1wiPicsXCJpbmxpbmVcIj09by5vcHRpb25zLnR5cGU/cis9JzxkaXYgY2xhc3M9XCJtb2RhYWwtY29udGVudC1jb250YWluZXJcIiByb2xlPVwiZG9jdW1lbnRcIj48L2Rpdj4nOnIrPXQscis9XCI8L2Rpdj5cIitvLnNjb3BlLmNsb3NlX2J0bixcInZpZGVvXCIhPW8ub3B0aW9ucy50eXBlJiYocis9XCI8L2Rpdj5cIikscis9XCI8L2Rpdj5cIixcImltYWdlXCI9PW8ub3B0aW9ucy50eXBlJiYhMD09PW8ub3B0aW9ucy5vdXRlcl9jb250cm9scyYmKHIrPW8uc2NvcGUucHJldl9idG4rby5zY29wZS5uZXh0X2J0bikscis9XCI8L2Rpdj48L2Rpdj5cIixhKFwiI1wiK28uc2NvcGUuaWQrXCJfb3ZlcmxheVwiKS5sZW5ndGg8MSYmby5kb20uYXBwZW5kKHIpLFwiaW5saW5lXCI9PW8ub3B0aW9ucy50eXBlJiZ0LmFwcGVuZFRvKFwiI1wiK28uc2NvcGUuaWQrXCIgLm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiKSxvLm1vZGFhbF9vdmVybGF5KFwic2hvd1wiKX0sY3JlYXRlX2Jhc2ljOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxvPWEodC5zY29wZS5zb3VyY2UpLGU9XCJcIjtvLmxlbmd0aD8oZT1vLmNvbnRlbnRzKCkuZGV0YWNoKCksby5lbXB0eSgpKTplPVwiQ29udGVudCBjb3VsZCBub3QgYmUgbG9hZGVkLiBQbGVhc2UgY2hlY2sgdGhlIHNvdXJjZSBhbmQgdHJ5IGFnYWluLlwiLHQuYnVpbGRfbW9kYWwoZSl9LGNyZWF0ZV9pbnN0YWdyYW06ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG89dC5vcHRpb25zLmluc3RhZ3JhbV9pZCxlPVwiXCIsaT1cIkluc3RhZ3JhbSBwaG90byBjb3VsZG4ndCBiZSBsb2FkZWQsIHBsZWFzZSBjaGVjayB0aGUgZW1iZWQgY29kZSBhbmQgdHJ5IGFnYWluLlwiO2lmKHQuYnVpbGRfbW9kYWwoJzxkaXYgY2xhc3M9XCJtb2RhYWwtY29udGVudC1jb250YWluZXInKyhcIlwiIT10Lm9wdGlvbnMubG9hZGluZ19jbGFzcz9cIiBcIit0Lm9wdGlvbnMubG9hZGluZ19jbGFzczpcIlwiKSsnXCI+Jyt0Lm9wdGlvbnMubG9hZGluZ19jb250ZW50K1wiPC9kaXY+XCIpLFwiXCIhPW8mJm51bGwhPT1vJiZ2b2lkIDAhPT1vKXt2YXIgbD1cIi8vYXBpLmluc3RhZ3JhbS5jb20vb2VtYmVkP3VybD0vL2luc3RhZ3IuYW0vcC9cIitvK1wiL1wiO2EuYWpheCh7dXJsOmwsZGF0YVR5cGU6XCJqc29ucFwiLGNhY2hlOiExLHN1Y2Nlc3M6ZnVuY3Rpb24obyl7dC5kb20uYXBwZW5kKCc8ZGl2IGlkPVwidGVtcC1pZ1wiIHN0eWxlPVwid2lkdGg6MDtoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47XCI+JytvLmh0bWwrXCI8L2Rpdj5cIiksdC5kb20uYXR0cihcImRhdGEtaWdsb2FkZWRcIik/d2luZG93Lmluc3Rncm0uRW1iZWRzLnByb2Nlc3MoKTp0LmRvbS5hdHRyKFwiZGF0YS1pZ2xvYWRlZFwiLFwidHJ1ZVwiKTt2YXIgZT1cIiNcIit0LnNjb3BlLmlkK1wiIC5tb2RhYWwtY29udGVudC1jb250YWluZXJcIjthKGUpLmxlbmd0aD4wJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YShcIiN0ZW1wLWlnXCIpLmNvbnRlbnRzKCkuY2xvbmUoKS5hcHBlbmRUbyhlKSxhKFwiI3RlbXAtaWdcIikucmVtb3ZlKCl9LDFlMyl9LGVycm9yOmZ1bmN0aW9uKCl7ZT1pO3ZhciBvPWEoXCIjXCIrdC5zY29wZS5pZCtcIiAubW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCIpO28ubGVuZ3RoPjAmJihvLnJlbW92ZUNsYXNzKHQub3B0aW9ucy5sb2FkaW5nX2NsYXNzKS5hZGRDbGFzcyh0Lm9wdGlvbnMuYWpheF9lcnJvcl9jbGFzcyksby5odG1sKGUpKX19KX1lbHNlIGU9aTtyZXR1cm4hMX0sZmV0Y2hfYWpheDpmdW5jdGlvbih0KXt2YXIgbz10aGlzO251bGw9PW8ub3B0aW9ucy5hY2Nlc3NpYmxlX3RpdGxlJiYoby5vcHRpb25zLmFjY2Vzc2libGVfdGl0bGU9XCJEaWFsb2cgV2luZG93XCIpLG51bGwhPT1vLnhociYmKG8ueGhyLmFib3J0KCksby54aHI9bnVsbCksby5idWlsZF9tb2RhbCgnPGRpdiBjbGFzcz1cIm1vZGFhbC1jb250ZW50LWNvbnRhaW5lcicrKFwiXCIhPW8ub3B0aW9ucy5sb2FkaW5nX2NsYXNzP1wiIFwiK28ub3B0aW9ucy5sb2FkaW5nX2NsYXNzOlwiXCIpKydcIj4nK28ub3B0aW9ucy5sb2FkaW5nX2NvbnRlbnQrXCI8L2Rpdj5cIiksby54aHI9YS5hamF4KHQse3N1Y2Nlc3M6ZnVuY3Rpb24odCl7dmFyIGU9YShcIiNcIitvLnNjb3BlLmlkKS5maW5kKFwiLm1vZGFhbC1jb250ZW50LWNvbnRhaW5lclwiKTtlLmxlbmd0aD4wJiYoZS5yZW1vdmVDbGFzcyhvLm9wdGlvbnMubG9hZGluZ19jbGFzcyksZS5odG1sKHQpLG8ub3B0aW9ucy5hamF4X3N1Y2Nlc3MuY2FsbChvLGUpKX0sZXJyb3I6ZnVuY3Rpb24odCl7aWYoXCJhYm9ydFwiIT10LnN0YXR1c1RleHQpe3ZhciBlPWEoXCIjXCIrby5zY29wZS5pZCtcIiAubW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCIpO2UubGVuZ3RoPjAmJihlLnJlbW92ZUNsYXNzKG8ub3B0aW9ucy5sb2FkaW5nX2NsYXNzKS5hZGRDbGFzcyhvLm9wdGlvbnMuYWpheF9lcnJvcl9jbGFzcyksZS5odG1sKFwiQ29udGVudCBjb3VsZCBub3QgYmUgbG9hZGVkLiBQbGVhc2UgY2hlY2sgdGhlIHNvdXJjZSBhbmQgdHJ5IGFnYWluLlwiKSl9fX0pfSxjcmVhdGVfY29uZmlybTpmdW5jdGlvbigpe3ZhciBhLHQ9dGhpczthPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCI+PGgxIGlkPVwibW9kYWFsLXRpdGxlXCI+Jyt0Lm9wdGlvbnMuY29uZmlybV90aXRsZSsnPC9oMT48ZGl2IGNsYXNzPVwibW9kYWFsLWNvbmZpcm0tY29udGVudFwiPicrdC5vcHRpb25zLmNvbmZpcm1fY29udGVudCsnPC9kaXY+PGRpdiBjbGFzcz1cIm1vZGFhbC1jb25maXJtLXdyYXBcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1vZGFhbC1jb25maXJtLWJ0biBtb2RhYWwtb2tcIiBhcmlhLWxhYmVsPVwiQ29uZmlybVwiPicrdC5vcHRpb25zLmNvbmZpcm1fYnV0dG9uX3RleHQrJzwvYnV0dG9uPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibW9kYWFsLWNvbmZpcm0tYnRuIG1vZGFhbC1jYW5jZWxcIiBhcmlhLWxhYmVsPVwiQ2FuY2VsXCI+Jyt0Lm9wdGlvbnMuY29uZmlybV9jYW5jZWxfYnV0dG9uX3RleHQrXCI8L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj5cIix0LmJ1aWxkX21vZGFsKGEpfSxjcmVhdGVfaW1hZ2U6ZnVuY3Rpb24oKXt2YXIgdCxvLGU9dGhpcyxpPVwiXCI7aWYoZS4kZWxlbS5pcyhcIltkYXRhLWdyb3VwXVwiKXx8ZS4kZWxlbS5pcyhcIltyZWxdXCIpKXt2YXIgbD1lLiRlbGVtLmlzKFwiW2RhdGEtZ3JvdXBdXCIpLG49bD9lLiRlbGVtLmF0dHIoXCJkYXRhLWdyb3VwXCIpOmUuJGVsZW0uYXR0cihcInJlbFwiKSxzPWEobD8nW2RhdGEtZ3JvdXA9XCInK24rJ1wiXSc6J1tyZWw9XCInK24rJ1wiXScpO3MucmVtb3ZlQXR0cihcImRhdGEtZ2FsbGVyeS1hY3RpdmVcIixcImlzX2FjdGl2ZVwiKSxlLiRlbGVtLmF0dHIoXCJkYXRhLWdhbGxlcnktYWN0aXZlXCIsXCJpc19hY3RpdmVcIiksbz1zLmxlbmd0aC0xO3ZhciBkPVtdO2k9JzxkaXYgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1pdGVtLXdyYXBcIj4nLHMuZWFjaChmdW5jdGlvbih0LG8pe3ZhciBlPVwiXCIsaT1cIlwiLGw9XCJcIixuPSExLHM9ITEscj1vLmdldEF0dHJpYnV0ZShcImRhdGEtbW9kYWFsLWRlc2NcIiksYz1vLmdldEF0dHJpYnV0ZShcImRhdGEtZ2FsbGVyeS1hY3RpdmVcIik7YShvKS5hdHRyKFwiZGF0YS1tb2RhYWwtY29udGVudC1zb3VyY2VcIik/ZT1hKG8pLmF0dHIoXCJkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZVwiKTphKG8pLmF0dHIoXCJocmVmXCIpP2U9YShvKS5hdHRyKFwiaHJlZlwiKTphKG8pLmF0dHIoXCJzcmNcIik/ZT1hKG8pLmF0dHIoXCJzcmNcIik6KGU9XCJ0cmlnZ2VyIHJlcXVpcmVzIGhyZWYgb3IgZGF0YS1tb2RhYWwtY29udGVudC1zb3VyY2UgYXR0cmlidXRlXCIscz0hMCksXCJcIiE9ciYmbnVsbCE9PXImJnZvaWQgMCE9PXI/KGk9cixsPSc8ZGl2IGNsYXNzPVwibW9kYWFsLWdhbGxlcnktbGFiZWxcIj48c3BhbiBjbGFzcz1cIm1vZGFhbC1hY2Nlc3NpYmxlLWhpZGVcIj5JbWFnZSAnKyh0KzEpK1wiIC0gPC9zcGFuPlwiK3IucmVwbGFjZSgvPC9nLFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csXCImZ3Q7XCIpK1wiPC9kaXY+XCIpOmw9JzxkaXYgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1sYWJlbFwiPjxzcGFuIGNsYXNzPVwibW9kYWFsLWFjY2Vzc2libGUtaGlkZVwiPkltYWdlICcrKHQrMSkrXCI8L3NwYW4+PC9kaXY+XCIsYyYmKG49ITApO3ZhciBtPXt1cmw6ZSxhbHQ6aSxyYXdkZXNjOnIsZGVzYzpsLGFjdGl2ZTpuLHNyY19lcnJvcjpzfTtkLnB1c2gobSl9KTtmb3IodmFyIHI9MDtyPGQubGVuZ3RoO3IrKyl7dmFyIGM9XCJcIixtPWRbcl0ucmF3ZGVzYz9cIkltYWdlOiBcIitkW3JdLnJhd2Rlc2M6XCJJbWFnZSBcIityK1wiIG5vIGRlc2NyaXB0aW9uXCI7ZFtyXS5hY3RpdmUmJihjPVwiIFwiK2UucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcyk7dmFyIHA9ZFtyXS5zcmNfZXJyb3I/ZFtyXS51cmw6JzxpbWcgc3JjPVwiJytkW3JdLnVybCsnXCIgYWx0PVwiIFwiIHN0eWxlPVwid2lkdGg6MTAwJVwiPic7aSs9JzxkaXYgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1pdGVtIGdhbGxlcnktaXRlbS0nK3IrYysnXCIgYXJpYS1sYWJlbD1cIicrbSsnXCI+JytwK2Rbcl0uZGVzYytcIjwvZGl2PlwifWkrPVwiPC9kaXY+XCIsMSE9ZS5vcHRpb25zLm91dGVyX2NvbnRyb2xzJiYoaSs9ZS5zY29wZS5wcmV2X2J0bitlLnNjb3BlLm5leHRfYnRuKX1lbHNle3ZhciB1LF89ITE7ZS4kZWxlbS5hdHRyKFwiZGF0YS1tb2RhYWwtY29udGVudC1zb3VyY2VcIik/dT1lLiRlbGVtLmF0dHIoXCJkYXRhLW1vZGFhbC1jb250ZW50LXNvdXJjZVwiKTplLiRlbGVtLmF0dHIoXCJocmVmXCIpP3U9ZS4kZWxlbS5hdHRyKFwiaHJlZlwiKTplLiRlbGVtLmF0dHIoXCJzcmNcIik/dT1lLiRlbGVtLmF0dHIoXCJzcmNcIik6KHU9XCJ0cmlnZ2VyIHJlcXVpcmVzIGhyZWYgb3IgZGF0YS1tb2RhYWwtY29udGVudC1zb3VyY2UgYXR0cmlidXRlXCIsXz0hMCk7dmFyIHY9XCJcIixmPVwiXCIsbT1cIlwiO2UuJGVsZW0uYXR0cihcImRhdGEtbW9kYWFsLWRlc2NcIik/KG09ZS4kZWxlbS5hdHRyKFwiZGF0YS1tb2RhYWwtZGVzY1wiKSx2PWUuJGVsZW0uYXR0cihcImRhdGEtbW9kYWFsLWRlc2NcIiksZj0nPGRpdiBjbGFzcz1cIm1vZGFhbC1nYWxsZXJ5LWxhYmVsXCI+PHNwYW4gY2xhc3M9XCJtb2RhYWwtYWNjZXNzaWJsZS1oaWRlXCI+SW1hZ2UgLSA8L3NwYW4+Jyt2LnJlcGxhY2UoLzwvZyxcIiZsdDtcIikucmVwbGFjZSgvPi9nLFwiJmd0O1wiKStcIjwvZGl2PlwiKTptPVwiSW1hZ2Ugd2l0aCBubyBkZXNjcmlwdGlvblwiO3ZhciBwPV8/dTonPGltZyBzcmM9XCInK3UrJ1wiIGFsdD1cIiBcIiBzdHlsZT1cIndpZHRoOjEwMCVcIj4nO2k9JzxkaXYgY2xhc3M9XCJtb2RhYWwtZ2FsbGVyeS1pdGVtIGlzX2FjdGl2ZVwiIGFyaWEtbGFiZWw9XCInK20rJ1wiPicrcCtmK1wiPC9kaXY+XCJ9dD1pLGUuYnVpbGRfbW9kYWwodCksYShcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX2FjdGl2ZVwiKS5pcyhcIi5nYWxsZXJ5LWl0ZW0tMFwiKSYmYShcIi5tb2RhYWwtZ2FsbGVyeS1wcmV2XCIpLmhpZGUoKSxhKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfYWN0aXZlXCIpLmlzKFwiLmdhbGxlcnktaXRlbS1cIitvKSYmYShcIi5tb2RhYWwtZ2FsbGVyeS1uZXh0XCIpLmhpZGUoKX0sZ2FsbGVyeV91cGRhdGU6ZnVuY3Rpb24odCl7dmFyIG89dGhpcyxlPWEoXCIjXCIrby5zY29wZS5pZCksaT1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbVwiKSxsPWkubGVuZ3RoLTE7aWYoMD09bClyZXR1cm4hMTt2YXIgbj1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktcHJldlwiKSxzPWUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1uZXh0XCIpLGQ9MCxyPTAsYz1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5cIitvLnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MpLG09XCJuZXh0XCI9PXQ/Yy5uZXh0KFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW1cIik6Yy5wcmV2KFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW1cIik7cmV0dXJuIG8ub3B0aW9ucy5iZWZvcmVfaW1hZ2VfY2hhbmdlLmNhbGwobyxjLG0pLChcInByZXZcIiE9dHx8IWUuZmluZChcIi5nYWxsZXJ5LWl0ZW0tMFwiKS5oYXNDbGFzcyhcImlzX2FjdGl2ZVwiKSkmJigoXCJuZXh0XCIhPXR8fCFlLmZpbmQoXCIuZ2FsbGVyeS1pdGVtLVwiK2wpLmhhc0NsYXNzKFwiaXNfYWN0aXZlXCIpKSYmdm9pZCBjLnN0b3AoKS5hbmltYXRlKHtvcGFjaXR5OjB9LDI1MCxmdW5jdGlvbigpe20uYWRkQ2xhc3MoXCJpc19uZXh0XCIpLmNzcyh7cG9zaXRpb246XCJhYnNvbHV0ZVwiLGRpc3BsYXk6XCJibG9ja1wiLG9wYWNpdHk6MH0pO3ZhciB0PWEoZG9jdW1lbnQpLndpZHRoKCksaT10PjExNDA/MjgwOjUwO2Q9ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfbmV4dFwiKS53aWR0aCgpLHI9ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfbmV4dFwiKS5oZWlnaHQoKTt2YXIgcD1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0IGltZ1wiKS5wcm9wKFwibmF0dXJhbFdpZHRoXCIpLHU9ZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfbmV4dCBpbWdcIikucHJvcChcIm5hdHVyYWxIZWlnaHRcIik7cD50LWk/KGQ9dC1pLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLmlzX25leHRcIikuY3NzKHt3aWR0aDpkfSksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uaXNfbmV4dCBpbWdcIikuY3NzKHt3aWR0aDpkfSkscj1lLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5pc19uZXh0XCIpLmZpbmQoXCJpbWdcIikuaGVpZ2h0KCkpOihkPXAscj11KSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS13cmFwXCIpLnN0b3AoKS5hbmltYXRlKHt3aWR0aDpkLGhlaWdodDpyfSwyNTAsZnVuY3Rpb24oKXtjLnJlbW92ZUNsYXNzKG8ucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcytcIiBcIitvLm9wdGlvbnMuZ2FsbGVyeV9hY3RpdmVfY2xhc3MpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKSxjLmZpbmQoXCJpbWdcIikucmVtb3ZlQXR0cihcInN0eWxlXCIpLG0uYWRkQ2xhc3Moby5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzK1wiIFwiK28ub3B0aW9ucy5nYWxsZXJ5X2FjdGl2ZV9jbGFzcykucmVtb3ZlQ2xhc3MoXCJpc19uZXh0XCIpLmNzcyhcInBvc2l0aW9uXCIsXCJcIiksbS5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eToxfSwyNTAsZnVuY3Rpb24oKXthKHRoaXMpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKS5jc3Moe3dpZHRoOlwiMTAwJVwifSksYSh0aGlzKS5maW5kKFwiaW1nXCIpLmNzcyhcIndpZHRoXCIsXCIxMDAlXCIpLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLXdyYXBcIikucmVtb3ZlQXR0cihcInN0eWxlXCIpLG8ub3B0aW9ucy5hZnRlcl9pbWFnZV9jaGFuZ2UuY2FsbChvLG0pfSksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW1cIikucmVtb3ZlQXR0cihcInRhYmluZGV4XCIpLGUuZmluZChcIi5tb2RhYWwtZ2FsbGVyeS1pdGVtLlwiK28ucHJpdmF0ZV9vcHRpb25zLmFjdGl2ZV9jbGFzcykuYXR0cihcInRhYmluZGV4XCIsXCIwXCIpLmZvY3VzKCksZS5maW5kKFwiLm1vZGFhbC1nYWxsZXJ5LWl0ZW0uXCIrby5wcml2YXRlX29wdGlvbnMuYWN0aXZlX2NsYXNzKS5pcyhcIi5nYWxsZXJ5LWl0ZW0tMFwiKT9uLnN0b3AoKS5hbmltYXRlKHtvcGFjaXR5OjB9LDE1MCxmdW5jdGlvbigpe2EodGhpcykuaGlkZSgpfSk6bi5zdG9wKCkuY3NzKHtkaXNwbGF5OlwiYmxvY2tcIixvcGFjaXR5Om4uY3NzKFwib3BhY2l0eVwiKX0pLmFuaW1hdGUoe29wYWNpdHk6MX0sMTUwKSxlLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5cIitvLnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MpLmlzKFwiLmdhbGxlcnktaXRlbS1cIitsKT9zLnN0b3AoKS5hbmltYXRlKHtvcGFjaXR5OjB9LDE1MCxmdW5jdGlvbigpe2EodGhpcykuaGlkZSgpfSk6cy5zdG9wKCkuY3NzKHtkaXNwbGF5OlwiYmxvY2tcIixvcGFjaXR5Om4uY3NzKFwib3BhY2l0eVwiKX0pLmFuaW1hdGUoe29wYWNpdHk6MX0sMTUwKX0pfSkpfSxjcmVhdGVfdmlkZW86ZnVuY3Rpb24oYSl7dmFyIHQsbz10aGlzO3Q9JzxpZnJhbWUgc3JjPVwiJythKydcIiBjbGFzcz1cIm1vZGFhbC12aWRlby1mcmFtZVwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nLG8uYnVpbGRfbW9kYWwoJzxkaXYgY2xhc3M9XCJtb2RhYWwtdmlkZW8tY29udGFpbmVyXCI+Jyt0K1wiPC9kaXY+XCIpfSxjcmVhdGVfaWZyYW1lOmZ1bmN0aW9uKGEpe3ZhciB0LG89dGhpczt0PW51bGwhPT1vLm9wdGlvbnMud2lkdGh8fHZvaWQgMCE9PW8ub3B0aW9ucy53aWR0aHx8bnVsbCE9PW8ub3B0aW9ucy5oZWlnaHR8fHZvaWQgMCE9PW8ub3B0aW9ucy5oZWlnaHQ/JzxpZnJhbWUgc3JjPVwiJythKydcIiBjbGFzcz1cIm1vZGFhbC1pZnJhbWUtZWxlbVwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nOic8ZGl2IGNsYXNzPVwibW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCI+UGxlYXNlIHNwZWNpZnkgYSB3aWR0aCBhbmQgaGVpZ2h0IGZvciB5b3VyIGlmcmFtZTwvZGl2Picsby5idWlsZF9tb2RhbCh0KX0sbW9kYWFsX29wZW46ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG89YShcIiNcIit0LnNjb3BlLmlkKSxlPXQub3B0aW9ucy5hbmltYXRpb247XCJub25lXCI9PT1lJiYoby5yZW1vdmVDbGFzcyhcIm1vZGFhbC1zdGFydF9ub25lXCIpLHQub3B0aW9ucy5hZnRlcl9vcGVuLmNhbGwodCxvKSksXCJmYWRlXCI9PT1lJiZvLnJlbW92ZUNsYXNzKFwibW9kYWFsLXN0YXJ0X2ZhZGVcIiksXCJzbGlkZS1kb3duXCI9PT1lJiZvLnJlbW92ZUNsYXNzKFwibW9kYWFsLXN0YXJ0X3NsaWRlX2Rvd25cIik7dmFyIGk9bzthKFwiLm1vZGFhbC13cmFwcGVyICpbdGFiaW5kZXg9MF1cIikucmVtb3ZlQXR0cihcInRhYmluZGV4XCIpLGk9XCJpbWFnZVwiPT10Lm9wdGlvbnMudHlwZT9hKFwiI1wiK3Quc2NvcGUuaWQpLmZpbmQoXCIubW9kYWFsLWdhbGxlcnktaXRlbS5cIit0LnByaXZhdGVfb3B0aW9ucy5hY3RpdmVfY2xhc3MpOm8uZmluZChcIi5tb2RhYWwtaWZyYW1lLWVsZW1cIikubGVuZ3RoP28uZmluZChcIi5tb2RhYWwtaWZyYW1lLWVsZW1cIik6by5maW5kKFwiLm1vZGFhbC12aWRlby13cmFwXCIpLmxlbmd0aD9vLmZpbmQoXCIubW9kYWFsLXZpZGVvLXdyYXBcIik6by5maW5kKFwiLm1vZGFhbC1mb2N1c1wiKSxpLmF0dHIoXCJ0YWJpbmRleFwiLFwiMFwiKS5mb2N1cygpLFwibm9uZVwiIT09ZSYmc2V0VGltZW91dChmdW5jdGlvbigpe3Qub3B0aW9ucy5hZnRlcl9vcGVuLmNhbGwodCxvKX0sdC5vcHRpb25zLmFmdGVyX2NhbGxiYWNrX2RlbGF5KX0sbW9kYWFsX2Nsb3NlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxvPWEoXCIjXCIrdC5zY29wZS5pZCk7dC5vcHRpb25zLmJlZm9yZV9jbG9zZS5jYWxsKHQsbyksbnVsbCE9PXQueGhyJiYodC54aHIuYWJvcnQoKSx0Lnhocj1udWxsKSxcIm5vbmVcIj09PXQub3B0aW9ucy5hbmltYXRpb24mJm8uYWRkQ2xhc3MoXCJtb2RhYWwtc3RhcnRfbm9uZVwiKSxcImZhZGVcIj09PXQub3B0aW9ucy5hbmltYXRpb24mJm8uYWRkQ2xhc3MoXCJtb2RhYWwtc3RhcnRfZmFkZVwiKSxcInNsaWRlLWRvd25cIj09PXQub3B0aW9ucy5hbmltYXRpb24mJm8uYWRkQ2xhc3MoXCJtb2RhYWwtc3RhcnRfc2xpZGVfZG93blwiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XCJpbmxpbmVcIj09dC5vcHRpb25zLnR5cGUmJmEoXCIjXCIrdC5zY29wZS5pZCtcIiAubW9kYWFsLWNvbnRlbnQtY29udGFpbmVyXCIpLmNvbnRlbnRzKCkuZGV0YWNoKCkuYXBwZW5kVG8odC5zY29wZS5zb3VyY2UpLG8ucmVtb3ZlKCksdC5vcHRpb25zLmFmdGVyX2Nsb3NlLmNhbGwodCksdC5zY29wZS5pc19vcGVuPSExfSx0Lm9wdGlvbnMuYWZ0ZXJfY2FsbGJhY2tfZGVsYXkpLHQubW9kYWFsX292ZXJsYXkoXCJoaWRlXCIpLG51bGwhPXQubGFzdEZvY3VzJiZ0Lmxhc3RGb2N1cy5mb2N1cygpfSxtb2RhYWxfb3ZlcmxheTpmdW5jdGlvbih0KXt2YXIgbz10aGlzO1wic2hvd1wiPT10PyhvLnNjb3BlLmlzX29wZW49ITAsby5vcHRpb25zLmJhY2tncm91bmRfc2Nyb2xsfHxvLmRvbS5hZGRDbGFzcyhcIm1vZGFhbC1ub3Njcm9sbFwiKSxhKFwiI1wiK28uc2NvcGUuaWQrXCJfb3ZlcmxheVwiKS5sZW5ndGg8MSYmby5kb20uYXBwZW5kKCc8ZGl2IGNsYXNzPVwibW9kYWFsLW92ZXJsYXlcIiBpZD1cIicrby5zY29wZS5pZCsnX292ZXJsYXlcIj48L2Rpdj4nKSxhKFwiI1wiK28uc2NvcGUuaWQrXCJfb3ZlcmxheVwiKS5jc3MoXCJiYWNrZ3JvdW5kXCIsby5vcHRpb25zLmJhY2tncm91bmQpLnN0b3AoKS5hbmltYXRlKHtvcGFjaXR5Om8ub3B0aW9ucy5vdmVybGF5X29wYWNpdHl9LG8ub3B0aW9ucy5hbmltYXRpb25fc3BlZWQsZnVuY3Rpb24oKXtvLm1vZGFhbF9vcGVuKCl9KSk6XCJoaWRlXCI9PXQmJmEoXCIjXCIrby5zY29wZS5pZCtcIl9vdmVybGF5XCIpLnN0b3AoKS5hbmltYXRlKHtvcGFjaXR5OjB9LG8ub3B0aW9ucy5hbmltYXRpb25fc3BlZWQsZnVuY3Rpb24oKXthKHRoaXMpLnJlbW92ZSgpLG8uZG9tLnJlbW92ZUNsYXNzKFwibW9kYWFsLW5vc2Nyb2xsXCIpfSl9LGlzX3RvdWNoOmZ1bmN0aW9uKCl7cmV0dXJuXCJvbnRvdWNoc3RhcnRcImluIHdpbmRvd3x8bmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzfX0sZT1bXTthLmZuLm1vZGFhbD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpe3ZhciBsPWEodGhpcykuZGF0YShcIm1vZGFhbFwiKTtpZihsKXtpZihcInN0cmluZ1wiPT10eXBlb2YgdClzd2l0Y2godCl7Y2FzZVwib3BlblwiOmwuY3JlYXRlX21vZGFhbChsKTticmVhaztjYXNlXCJjbG9zZVwiOmwubW9kYWFsX2Nsb3NlKCl9fWVsc2V7dmFyIG49T2JqZWN0LmNyZWF0ZShvKTtuLmluaXQodCx0aGlzKSxhLmRhdGEodGhpcyxcIm1vZGFhbFwiLG4pLGUucHVzaCh7ZWxlbWVudDphKHRoaXMpLmF0dHIoXCJjbGFzc1wiKSxvcHRpb25zOnR9KX19KX0sYS5mbi5tb2RhYWwub3B0aW9ucz17dHlwZTpcImlubGluZVwiLGNvbnRlbnRfc291cmNlOm51bGwsYW5pbWF0aW9uOlwiZmFkZVwiLGFuaW1hdGlvbl9zcGVlZDozMDAsYWZ0ZXJfY2FsbGJhY2tfZGVsYXk6MzUwLGlzX2xvY2tlZDohMSxoaWRlX2Nsb3NlOiExLGJhY2tncm91bmQ6XCIjMDAwXCIsb3ZlcmxheV9vcGFjaXR5OlwiMC44XCIsb3ZlcmxheV9jbG9zZTohMCxhY2Nlc3NpYmxlX3RpdGxlOlwiRGlhbG9nIFdpbmRvd1wiLHN0YXJ0X29wZW46ITEsZnVsbHNjcmVlbjohMSxjdXN0b21fY2xhc3M6XCJcIixiYWNrZ3JvdW5kX3Njcm9sbDohMSxzaG91bGRfb3BlbjohMCxjbG9zZV90ZXh0OlwiQ2xvc2VcIixjbG9zZV9hcmlhX2xhYmVsOlwiQ2xvc2UgKFByZXNzIGVzY2FwZSB0byBjbG9zZSlcIix3aWR0aDpudWxsLGhlaWdodDpudWxsLGJlZm9yZV9vcGVuOmZ1bmN0aW9uKCl7fSxhZnRlcl9vcGVuOmZ1bmN0aW9uKCl7fSxiZWZvcmVfY2xvc2U6ZnVuY3Rpb24oKXt9LGFmdGVyX2Nsb3NlOmZ1bmN0aW9uKCl7fSxzb3VyY2U6ZnVuY3Rpb24oYSx0KXtyZXR1cm4gdH0sY29uZmlybV9idXR0b25fdGV4dDpcIkNvbmZpcm1cIixjb25maXJtX2NhbmNlbF9idXR0b25fdGV4dDpcIkNhbmNlbFwiLGNvbmZpcm1fdGl0bGU6XCJDb25maXJtIFRpdGxlXCIsY29uZmlybV9jb250ZW50OlwiPHA+VGhpcyBpcyB0aGUgZGVmYXVsdCBjb25maXJtIGRpYWxvZyBjb250ZW50LiBSZXBsYWNlIG1lIHRocm91Z2ggdGhlIG9wdGlvbnM8L3A+XCIsY29uZmlybV9jYWxsYmFjazpmdW5jdGlvbigpe30sY29uZmlybV9jYW5jZWxfY2FsbGJhY2s6ZnVuY3Rpb24oKXt9LGdhbGxlcnlfYWN0aXZlX2NsYXNzOlwiZ2FsbGVyeV9hY3RpdmVfaXRlbVwiLG91dGVyX2NvbnRyb2xzOiExLGJlZm9yZV9pbWFnZV9jaGFuZ2U6ZnVuY3Rpb24oYSx0KXt9LGFmdGVyX2ltYWdlX2NoYW5nZTpmdW5jdGlvbihhKXt9LGxvYWRpbmdfY29udGVudDonPGRpdiBjbGFzcz1cIm1vZGFhbC1sb2FkaW5nLXNwaW5uZXJcIj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjxkaXY+PGRpdj48L2Rpdj48L2Rpdj48ZGl2PjxkaXY+PC9kaXY+PC9kaXY+PGRpdj48ZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicsbG9hZGluZ19jbGFzczpcImlzX2xvYWRpbmdcIixhamF4X2Vycm9yX2NsYXNzOlwibW9kYWFsLWVycm9yXCIsYWpheF9zdWNjZXNzOmZ1bmN0aW9uKCl7fSxpbnN0YWdyYW1faWQ6bnVsbH0sYShmdW5jdGlvbigpe3ZhciBvPWEoXCIubW9kYWFsXCIpO28ubGVuZ3RoJiZvLmVhY2goZnVuY3Rpb24oKXt0KGEodGhpcykpfSk7dmFyIGk9bmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obyl7by5mb3JFYWNoKGZ1bmN0aW9uKG8pe2lmKG8uYWRkZWROb2RlcyYmby5hZGRlZE5vZGVzLmxlbmd0aD4wKXtbXS5zb21lLmNhbGwoby5hZGRlZE5vZGVzLGZ1bmN0aW9uKG8pe3ZhciBpPWEobyk7KGkuaXMoXCJhXCIpfHxpLmlzKFwiYnV0dG9uXCIpKSYmKGkuaGFzQ2xhc3MoXCJtb2RhYWxcIik/dChpKTplLmZvckVhY2goZnVuY3Rpb24odCl7aWYodC5lbGVtZW50PT1pLmF0dHIoXCJjbGFzc1wiKSlyZXR1cm4gYShpKS5tb2RhYWwodC5vcHRpb25zKSwhMX0pKX0pfX0pfSksbD17c3VidHJlZTohMCxhdHRyaWJ1dGVzOiEwLGNoaWxkTGlzdDohMCxjaGFyYWN0ZXJEYXRhOiEwfTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5vYnNlcnZlKGRvY3VtZW50LmJvZHksbCl9LDUwMCl9KX0oalF1ZXJ5LHdpbmRvdyxkb2N1bWVudCk7XG4iLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCBmdW5jdGlvbigpIHtcblx0ZG9jdW1lbnQuYm9keS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xufSApO1xuIl19
