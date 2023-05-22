const tailwind_config = "";
const modaal_min = "";
const main = "";
window.addEventListener("load", function() {
  document.body.style.visibility = "visible";
});
window.onload = function() {
  document.querySelectorAll(".mv").forEach(function(el) {
    el.classList.add("is-fade-in");
  });
  document.querySelectorAll(".p-logo--header").forEach(function(el) {
    el.classList.add("is-fade-in");
  });
  document.querySelector("body").classList.add("is-fade-in");
  scrollEffect();
  window.addEventListener("scroll", function() {
    scrollEffect();
  });
};
function scrollEffect() {
  const elements = document.querySelectorAll(".is-fade");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let positionFromTop = element.getBoundingClientRect().top + window.pageYOffset;
    let scroll = window.pageYOffset || document.documentElement.scrollTop;
    let windowH = window.innerHeight;
    if (scroll > positionFromTop - windowH) {
      element.classList.add("is-scroll");
    }
  }
}
(function($) {
  $(window).on("load", function() {
    window.loaded = true;
  });
  $(function() {
    $.fn.infiniteslide = function(options) {
      var settings = $.extend({
        "speed": 100,
        //速さ　単位はpx/秒です。
        "direction": "left",
        //up/down/left/rightから選択
        "pauseonhover": true,
        //マウスオーバーでストップ
        "responsive": false,
        //子要素の幅を%で指定しているとき
        "clone": 1
      }, options);
      var setCss = function(obj, direction) {
        $(obj).wrap('<div class="infiniteslide_wrap"></div>').parent().css({
          overflow: "hidden"
        });
        if (direction == "up" || direction == "down") {
          var d = "column";
        } else {
          var d = "row";
        }
        $(obj).css({
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          "-ms-flex-align": "center",
          flexDirection: d
        }).children().css({
          flex: "none",
          display: "block"
        });
      };
      var setClone = function(obj, clone) {
        var $clone = $(obj).children().clone(true).addClass("infiniteslide_clone");
        var i = 1;
        while (i <= clone) {
          $clone.clone(true).appendTo($(obj));
          i++;
        }
      };
      var getWidth = function(obj) {
        var w = 0;
        $(obj).children(":not(.infiniteslide_clone)").each(function(key, value) {
          w = w + $(this).outerWidth(true);
        });
        return w;
      };
      var getHeight = function(obj) {
        var h = 0;
        $(obj).children(":not(.infiniteslide_clone)").each(function(key, value) {
          h = h + $(this).outerHeight(true);
        });
        return h;
      };
      var getSpeed = function(l, s) {
        return l / s;
      };
      var getNum = function(obj, direction) {
        if (direction == "up" || direction == "down") {
          var num = getHeight(obj);
        } else {
          var num = getWidth(obj);
        }
        return num;
      };
      var getTranslate = function(num, direction) {
        if (direction == "up" || direction == "down") {
          var i = "0,-" + num + "px,0";
        } else {
          var i = "-" + num + "px,0,0";
        }
        return i;
      };
      var setAnim = function(obj, id, direction, speed) {
        var num = getNum(obj, direction);
        if (direction == "up" || direction == "down") {
          $(obj).parent(".infiniteslide_wrap").css({
            height: num + "px"
          });
        }
        var i = getTranslate(num, direction);
        $(obj).attr("data-style", "infiniteslide" + id);
        var css = "@keyframes infiniteslide" + id + "{from {transform:translate3d(0,0,0);}to {transform:translate3d(" + i + ");}}";
        $("<style />").attr("id", "infiniteslide" + id + "_style").html(css).appendTo("head");
        if (direction == "right" || direction == "down") {
          var reverse = " reverse";
        } else {
          var reverse = "";
        }
        $(obj).css({
          animation: "infiniteslide" + id + " " + getSpeed(num, speed) + "s linear 0s infinite" + reverse
        });
      };
      var setStop = function(obj) {
        $(obj).on("mouseenter", function() {
          $(this).css({
            animationPlayState: "paused"
          });
        }).on("mouseleave", function() {
          $(this).css({
            animationPlayState: "running"
          });
        });
      };
      var setResponsive = function(obj, direction) {
        var num = getNum(obj, direction);
        var i = getTranslate(num, direction);
        return i;
      };
      return this.each(function(key, value) {
        var $this = $(this);
        var num = Date.now() + Math.floor(1e4 * Math.random()).toString(16);
        if (settings.pauseonhover == true) {
          setStop($this);
        }
        var _onload = function() {
          setCss($this, settings.direction);
          setClone($this, settings.clone);
          setAnim($this, num, settings.direction, settings.speed);
          if (settings.responsive) {
            $(window).on("resize", function() {
              var i = setResponsive($this, settings.direction);
              var styleid = $this.attr("data-style");
              var stylehtml = $("#" + styleid + "_style").html();
              var stylehtml_new = stylehtml.replace(/to {transform:translate3d\((.*?)\)/, "to {transform:translate3d(" + i + ")");
              $("#" + styleid + "_style").html(stylehtml_new);
            });
          }
        };
        if (window.loaded) {
          _onload();
        } else {
          $(window).on("load", _onload);
        }
      });
    };
  });
})(jQuery);
/*!
	Modaal - accessible modals - v0.4.4
	by Humaan, for all humans.
	//humaan.com
 */
!function(a) {
  function t(a2) {
    var t2 = {}, o2 = false;
    a2.attr("data-modaal-type") && (o2 = true, t2.type = a2.attr("data-modaal-type")), a2.attr("data-modaal-content-source") && (o2 = true, t2.content_source = a2.attr("data-modaal-content-source")), a2.attr("data-modaal-animation") && (o2 = true, t2.animation = a2.attr("data-modaal-animation")), a2.attr("data-modaal-animation-speed") && (o2 = true, t2.animation_speed = a2.attr("data-modaal-animation-speed")), a2.attr("data-modaal-after-callback-delay") && (o2 = true, t2.after_callback_delay = a2.attr("data-modaal-after-callback-delay")), a2.attr("data-modaal-is-locked") && (o2 = true, t2.is_locked = "true" === a2.attr("data-modaal-is-locked")), a2.attr("data-modaal-hide-close") && (o2 = true, t2.hide_close = "true" === a2.attr("data-modaal-hide-close")), a2.attr("data-modaal-background") && (o2 = true, t2.background = a2.attr("data-modaal-background")), a2.attr("data-modaal-overlay-opacity") && (o2 = true, t2.overlay_opacity = a2.attr("data-modaal-overlay-opacity")), a2.attr("data-modaal-overlay-close") && (o2 = true, t2.overlay_close = "false" !== a2.attr("data-modaal-overlay-close")), a2.attr("data-modaal-accessible-title") && (o2 = true, t2.accessible_title = a2.attr("data-modaal-accessible-title")), a2.attr("data-modaal-start-open") && (o2 = true, t2.start_open = "true" === a2.attr("data-modaal-start-open")), a2.attr("data-modaal-fullscreen") && (o2 = true, t2.fullscreen = "true" === a2.attr("data-modaal-fullscreen")), a2.attr("data-modaal-custom-class") && (o2 = true, t2.custom_class = a2.attr("data-modaal-custom-class")), a2.attr("data-modaal-close-text") && (o2 = true, t2.close_text = a2.attr("data-modaal-close-text")), a2.attr("data-modaal-close-aria-label") && (o2 = true, t2.close_aria_label = a2.attr("data-modaal-close-aria-label")), a2.attr("data-modaal-background-scroll") && (o2 = true, t2.background_scroll = "true" === a2.attr("data-modaal-background-scroll")), a2.attr("data-modaal-width") && (o2 = true, t2.width = parseInt(a2.attr("data-modaal-width"))), a2.attr("data-modaal-height") && (o2 = true, t2.height = parseInt(a2.attr("data-modaal-height"))), a2.attr("data-modaal-confirm-button-text") && (o2 = true, t2.confirm_button_text = a2.attr("data-modaal-confirm-button-text")), a2.attr("data-modaal-confirm-cancel-button-text") && (o2 = true, t2.confirm_cancel_button_text = a2.attr("data-modaal-confirm-cancel-button-text")), a2.attr("data-modaal-confirm-title") && (o2 = true, t2.confirm_title = a2.attr("data-modaal-confirm-title")), a2.attr("data-modaal-confirm-content") && (o2 = true, t2.confirm_content = a2.attr("data-modaal-confirm-content")), a2.attr("data-modaal-gallery-active-class") && (o2 = true, t2.gallery_active_class = a2.attr("data-modaal-gallery-active-class")), a2.attr("data-modaal-loading-content") && (o2 = true, t2.loading_content = a2.attr("data-modaal-loading-content")), a2.attr("data-modaal-loading-class") && (o2 = true, t2.loading_class = a2.attr("data-modaal-loading-class")), a2.attr("data-modaal-ajax-error-class") && (o2 = true, t2.ajax_error_class = a2.attr("data-modaal-ajax-error-class")), a2.attr("data-modaal-instagram-id") && (o2 = true, t2.instagram_id = a2.attr("data-modaal-instagram-id")), o2 && a2.modaal(t2);
  }
  var o = { init: function(t2, o2) {
    var e2 = this;
    if (e2.dom = a("body"), e2.$elem = a(o2), e2.options = a.extend({}, a.fn.modaal.options, e2.$elem.data(), t2), e2.xhr = null, e2.scope = { is_open: false, id: "modaal_" + (/* @__PURE__ */ new Date()).getTime() + Math.random().toString(16).substring(2), source: e2.options.content_source ? e2.options.content_source : e2.$elem.attr("href") }, e2.$elem.attr("data-modaal-scope", e2.scope.id), e2.private_options = { active_class: "is_active" }, e2.lastFocus = null, e2.options.is_locked || "confirm" == e2.options.type || e2.options.hide_close ? e2.scope.close_btn = "" : e2.scope.close_btn = '<button type="button" class="modaal-close" id="modaal-close" aria-label="' + e2.options.close_aria_label + '"><span>' + e2.options.close_text + "</span></button>", "none" === e2.options.animation && (e2.options.animation_speed = 0, e2.options.after_callback_delay = 0), a(o2).on("click.Modaal", function(a2) {
      a2.preventDefault(), e2.create_modaal(e2, a2);
    }), true === e2.options.outer_controls)
      var i = "outer";
    else
      var i = "inner";
    e2.scope.prev_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-prev modaal-gallery-prev-' + i + '" id="modaal-gallery-prev" aria-label="Previous image (use left arrow to change)"><span>Previous Image</span></button>', e2.scope.next_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-next modaal-gallery-next-' + i + '" id="modaal-gallery-next" aria-label="Next image (use right arrow to change)"><span>Next Image</span></button>', true === e2.options.start_open && e2.create_modaal(e2);
  }, create_modaal: function(a2, t2) {
    var o2, a2 = this;
    if (a2.lastFocus = a2.$elem, false !== a2.options.should_open && ("function" != typeof a2.options.should_open || false !== a2.options.should_open())) {
      switch (a2.options.before_open.call(a2, t2), a2.options.type) {
        case "inline":
          a2.create_basic();
          break;
        case "ajax":
          o2 = a2.options.source(a2.$elem, a2.scope.source), a2.fetch_ajax(o2);
          break;
        case "confirm":
          a2.options.is_locked = true, a2.create_confirm();
          break;
        case "image":
          a2.create_image();
          break;
        case "iframe":
          o2 = a2.options.source(a2.$elem, a2.scope.source), a2.create_iframe(o2);
          break;
        case "video":
          a2.create_video(a2.scope.source);
          break;
        case "instagram":
          a2.create_instagram();
      }
      a2.watch_events();
    }
  }, watch_events: function() {
    var t2 = this;
    t2.dom.off("click.Modaal keyup.Modaal keydown.Modaal"), t2.dom.on("keydown.Modaal", function(o2) {
      var e2 = o2.keyCode, i = o2.target;
      9 == e2 && t2.scope.is_open && (a.contains(document.getElementById(t2.scope.id), i) || a("#" + t2.scope.id).find('*[tabindex="0"]').focus());
    }), t2.dom.on("keyup.Modaal", function(o2) {
      var e2 = o2.keyCode, i = o2.target;
      return o2.shiftKey && 9 == o2.keyCode && t2.scope.is_open && (a.contains(document.getElementById(t2.scope.id), i) || a("#" + t2.scope.id).find(".modaal-close").focus()), !t2.options.is_locked && 27 == e2 && t2.scope.is_open ? !a(document.activeElement).is("input:not(:checkbox):not(:radio)") && void t2.modaal_close() : "image" == t2.options.type ? (37 == e2 && t2.scope.is_open && !a("#" + t2.scope.id + " .modaal-gallery-prev").hasClass("is_hidden") && t2.gallery_update("prev"), void (39 == e2 && t2.scope.is_open && !a("#" + t2.scope.id + " .modaal-gallery-next").hasClass("is_hidden") && t2.gallery_update("next"))) : void 0;
    }), t2.dom.on("click.Modaal", function(o2) {
      var e2 = a(o2.target);
      if (!t2.options.is_locked && (t2.options.overlay_close && e2.is(".modaal-inner-wrapper") || e2.is(".modaal-close") || e2.closest(".modaal-close").length))
        return void t2.modaal_close();
      if (e2.is(".modaal-confirm-btn"))
        return e2.is(".modaal-ok") && t2.options.confirm_callback.call(t2, t2.lastFocus), e2.is(".modaal-cancel") && t2.options.confirm_cancel_callback.call(t2, t2.lastFocus), void t2.modaal_close();
      if (e2.is(".modaal-gallery-control")) {
        if (e2.hasClass("is_hidden"))
          return;
        return e2.is(".modaal-gallery-prev") && t2.gallery_update("prev"), void (e2.is(".modaal-gallery-next") && t2.gallery_update("next"));
      }
    });
  }, build_modal: function(t2) {
    var o2 = this, e2 = "";
    "instagram" == o2.options.type && (e2 = " modaal-instagram");
    var i, l = "video" == o2.options.type ? "modaal-video-wrap" : "modaal-content";
    switch (o2.options.animation) {
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
    o2.options.fullscreen && (n = " modaal-fullscreen"), "" === o2.options.custom_class && void 0 === o2.options.custom_class || (o2.options.custom_class = " " + o2.options.custom_class);
    var s = "";
    o2.options.width && o2.options.height && "number" == typeof o2.options.width && "number" == typeof o2.options.height ? s = ' style="max-width:' + o2.options.width + "px;height:" + o2.options.height + 'px;overflow:auto;"' : o2.options.width && "number" == typeof o2.options.width ? s = ' style="max-width:' + o2.options.width + 'px;"' : o2.options.height && "number" == typeof o2.options.height && (s = ' style="height:' + o2.options.height + 'px;overflow:auto;"'), ("image" == o2.options.type || "video" == o2.options.type || "instagram" == o2.options.type || o2.options.fullscreen) && (s = "");
    var d = "";
    o2.is_touch() && (d = ' style="cursor:pointer;"');
    var r = '<div class="modaal-wrapper modaal-' + o2.options.type + i + e2 + n + o2.options.custom_class + '" id="' + o2.scope.id + '"><div class="modaal-outer-wrapper"><div class="modaal-inner-wrapper"' + d + ">";
    "video" != o2.options.type && (r += '<div class="modaal-container"' + s + ">"), r += '<div class="' + l + ' modaal-focus" aria-hidden="false" aria-label="' + o2.options.accessible_title + " - " + o2.options.close_aria_label + '" role="dialog">', "inline" == o2.options.type ? r += '<div class="modaal-content-container" role="document"></div>' : r += t2, r += "</div>" + o2.scope.close_btn, "video" != o2.options.type && (r += "</div>"), r += "</div>", "image" == o2.options.type && true === o2.options.outer_controls && (r += o2.scope.prev_btn + o2.scope.next_btn), r += "</div></div>", a("#" + o2.scope.id + "_overlay").length < 1 && o2.dom.append(r), "inline" == o2.options.type && t2.appendTo("#" + o2.scope.id + " .modaal-content-container"), o2.modaal_overlay("show");
  }, create_basic: function() {
    var t2 = this, o2 = a(t2.scope.source), e2 = "";
    o2.length ? (e2 = o2.contents().detach(), o2.empty()) : e2 = "Content could not be loaded. Please check the source and try again.", t2.build_modal(e2);
  }, create_instagram: function() {
    var t2 = this, o2 = t2.options.instagram_id, e2 = "", i = "Instagram photo couldn't be loaded, please check the embed code and try again.";
    if (t2.build_modal('<div class="modaal-content-container' + ("" != t2.options.loading_class ? " " + t2.options.loading_class : "") + '">' + t2.options.loading_content + "</div>"), "" != o2 && null !== o2 && void 0 !== o2) {
      var l = "//api.instagram.com/oembed?url=//instagr.am/p/" + o2 + "/";
      a.ajax({ url: l, dataType: "jsonp", cache: false, success: function(o3) {
        t2.dom.append('<div id="temp-ig" style="width:0;height:0;overflow:hidden;">' + o3.html + "</div>"), t2.dom.attr("data-igloaded") ? window.instgrm.Embeds.process() : t2.dom.attr("data-igloaded", "true");
        var e3 = "#" + t2.scope.id + " .modaal-content-container";
        a(e3).length > 0 && setTimeout(function() {
          a("#temp-ig").contents().clone().appendTo(e3), a("#temp-ig").remove();
        }, 1e3);
      }, error: function() {
        e2 = i;
        var o3 = a("#" + t2.scope.id + " .modaal-content-container");
        o3.length > 0 && (o3.removeClass(t2.options.loading_class).addClass(t2.options.ajax_error_class), o3.html(e2));
      } });
    } else
      e2 = i;
    return false;
  }, fetch_ajax: function(t2) {
    var o2 = this;
    null == o2.options.accessible_title && (o2.options.accessible_title = "Dialog Window"), null !== o2.xhr && (o2.xhr.abort(), o2.xhr = null), o2.build_modal('<div class="modaal-content-container' + ("" != o2.options.loading_class ? " " + o2.options.loading_class : "") + '">' + o2.options.loading_content + "</div>"), o2.xhr = a.ajax(t2, { success: function(t3) {
      var e2 = a("#" + o2.scope.id).find(".modaal-content-container");
      e2.length > 0 && (e2.removeClass(o2.options.loading_class), e2.html(t3), o2.options.ajax_success.call(o2, e2));
    }, error: function(t3) {
      if ("abort" != t3.statusText) {
        var e2 = a("#" + o2.scope.id + " .modaal-content-container");
        e2.length > 0 && (e2.removeClass(o2.options.loading_class).addClass(o2.options.ajax_error_class), e2.html("Content could not be loaded. Please check the source and try again."));
      }
    } });
  }, create_confirm: function() {
    var a2, t2 = this;
    a2 = '<div class="modaal-content-container"><h1 id="modaal-title">' + t2.options.confirm_title + '</h1><div class="modaal-confirm-content">' + t2.options.confirm_content + '</div><div class="modaal-confirm-wrap"><button type="button" class="modaal-confirm-btn modaal-ok" aria-label="Confirm">' + t2.options.confirm_button_text + '</button><button type="button" class="modaal-confirm-btn modaal-cancel" aria-label="Cancel">' + t2.options.confirm_cancel_button_text + "</button></div></div></div>", t2.build_modal(a2);
  }, create_image: function() {
    var t2, o2, e2 = this, i = "";
    if (e2.$elem.is("[data-group]") || e2.$elem.is("[rel]")) {
      var l = e2.$elem.is("[data-group]"), n = l ? e2.$elem.attr("data-group") : e2.$elem.attr("rel"), s = a(l ? '[data-group="' + n + '"]' : '[rel="' + n + '"]');
      s.removeAttr("data-gallery-active", "is_active"), e2.$elem.attr("data-gallery-active", "is_active"), o2 = s.length - 1;
      var d = [];
      i = '<div class="modaal-gallery-item-wrap">', s.each(function(t3, o3) {
        var e3 = "", i2 = "", l2 = "", n2 = false, s2 = false, r2 = o3.getAttribute("data-modaal-desc"), c2 = o3.getAttribute("data-gallery-active");
        a(o3).attr("data-modaal-content-source") ? e3 = a(o3).attr("data-modaal-content-source") : a(o3).attr("href") ? e3 = a(o3).attr("href") : a(o3).attr("src") ? e3 = a(o3).attr("src") : (e3 = "trigger requires href or data-modaal-content-source attribute", s2 = true), "" != r2 && null !== r2 && void 0 !== r2 ? (i2 = r2, l2 = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (t3 + 1) + " - </span>" + r2.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>") : l2 = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (t3 + 1) + "</span></div>", c2 && (n2 = true);
        var m2 = { url: e3, alt: i2, rawdesc: r2, desc: l2, active: n2, src_error: s2 };
        d.push(m2);
      });
      for (var r = 0; r < d.length; r++) {
        var c = "", m = d[r].rawdesc ? "Image: " + d[r].rawdesc : "Image " + r + " no description";
        d[r].active && (c = " " + e2.private_options.active_class);
        var p = d[r].src_error ? d[r].url : '<img src="' + d[r].url + '" alt=" " style="width:100%">';
        i += '<div class="modaal-gallery-item gallery-item-' + r + c + '" aria-label="' + m + '">' + p + d[r].desc + "</div>";
      }
      i += "</div>", 1 != e2.options.outer_controls && (i += e2.scope.prev_btn + e2.scope.next_btn);
    } else {
      var u, _ = false;
      e2.$elem.attr("data-modaal-content-source") ? u = e2.$elem.attr("data-modaal-content-source") : e2.$elem.attr("href") ? u = e2.$elem.attr("href") : e2.$elem.attr("src") ? u = e2.$elem.attr("src") : (u = "trigger requires href or data-modaal-content-source attribute", _ = true);
      var v = "", f = "", m = "";
      e2.$elem.attr("data-modaal-desc") ? (m = e2.$elem.attr("data-modaal-desc"), v = e2.$elem.attr("data-modaal-desc"), f = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image - </span>' + v.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>") : m = "Image with no description";
      var p = _ ? u : '<img src="' + u + '" alt=" " style="width:100%">';
      i = '<div class="modaal-gallery-item is_active" aria-label="' + m + '">' + p + f + "</div>";
    }
    t2 = i, e2.build_modal(t2), a(".modaal-gallery-item.is_active").is(".gallery-item-0") && a(".modaal-gallery-prev").hide(), a(".modaal-gallery-item.is_active").is(".gallery-item-" + o2) && a(".modaal-gallery-next").hide();
  }, gallery_update: function(t2) {
    var o2 = this, e2 = a("#" + o2.scope.id), i = e2.find(".modaal-gallery-item"), l = i.length - 1;
    if (0 == l)
      return false;
    var n = e2.find(".modaal-gallery-prev"), s = e2.find(".modaal-gallery-next"), d = 0, r = 0, c = e2.find(".modaal-gallery-item." + o2.private_options.active_class), m = "next" == t2 ? c.next(".modaal-gallery-item") : c.prev(".modaal-gallery-item");
    return o2.options.before_image_change.call(o2, c, m), ("prev" != t2 || !e2.find(".gallery-item-0").hasClass("is_active")) && (("next" != t2 || !e2.find(".gallery-item-" + l).hasClass("is_active")) && void c.stop().animate({ opacity: 0 }, 250, function() {
      m.addClass("is_next").css({ position: "absolute", display: "block", opacity: 0 });
      var t3 = a(document).width(), i2 = t3 > 1140 ? 280 : 50;
      d = e2.find(".modaal-gallery-item.is_next").width(), r = e2.find(".modaal-gallery-item.is_next").height();
      var p = e2.find(".modaal-gallery-item.is_next img").prop("naturalWidth"), u = e2.find(".modaal-gallery-item.is_next img").prop("naturalHeight");
      p > t3 - i2 ? (d = t3 - i2, e2.find(".modaal-gallery-item.is_next").css({ width: d }), e2.find(".modaal-gallery-item.is_next img").css({ width: d }), r = e2.find(".modaal-gallery-item.is_next").find("img").height()) : (d = p, r = u), e2.find(".modaal-gallery-item-wrap").stop().animate({ width: d, height: r }, 250, function() {
        c.removeClass(o2.private_options.active_class + " " + o2.options.gallery_active_class).removeAttr("style"), c.find("img").removeAttr("style"), m.addClass(o2.private_options.active_class + " " + o2.options.gallery_active_class).removeClass("is_next").css("position", ""), m.stop().animate({ opacity: 1 }, 250, function() {
          a(this).removeAttr("style").css({ width: "100%" }), a(this).find("img").css("width", "100%"), e2.find(".modaal-gallery-item-wrap").removeAttr("style"), o2.options.after_image_change.call(o2, m);
        }), e2.find(".modaal-gallery-item").removeAttr("tabindex"), e2.find(".modaal-gallery-item." + o2.private_options.active_class).attr("tabindex", "0").focus(), e2.find(".modaal-gallery-item." + o2.private_options.active_class).is(".gallery-item-0") ? n.stop().animate({ opacity: 0 }, 150, function() {
          a(this).hide();
        }) : n.stop().css({ display: "block", opacity: n.css("opacity") }).animate({ opacity: 1 }, 150), e2.find(".modaal-gallery-item." + o2.private_options.active_class).is(".gallery-item-" + l) ? s.stop().animate({ opacity: 0 }, 150, function() {
          a(this).hide();
        }) : s.stop().css({ display: "block", opacity: n.css("opacity") }).animate({ opacity: 1 }, 150);
      });
    }));
  }, create_video: function(a2) {
    var t2, o2 = this;
    t2 = '<iframe src="' + a2 + '" class="modaal-video-frame" frameborder="0" allowfullscreen></iframe>', o2.build_modal('<div class="modaal-video-container">' + t2 + "</div>");
  }, create_iframe: function(a2) {
    var t2, o2 = this;
    t2 = null !== o2.options.width || void 0 !== o2.options.width || null !== o2.options.height || void 0 !== o2.options.height ? '<iframe src="' + a2 + '" class="modaal-iframe-elem" frameborder="0" allowfullscreen></iframe>' : '<div class="modaal-content-container">Please specify a width and height for your iframe</div>', o2.build_modal(t2);
  }, modaal_open: function() {
    var t2 = this, o2 = a("#" + t2.scope.id), e2 = t2.options.animation;
    "none" === e2 && (o2.removeClass("modaal-start_none"), t2.options.after_open.call(t2, o2)), "fade" === e2 && o2.removeClass("modaal-start_fade"), "slide-down" === e2 && o2.removeClass("modaal-start_slide_down");
    var i = o2;
    a(".modaal-wrapper *[tabindex=0]").removeAttr("tabindex"), i = "image" == t2.options.type ? a("#" + t2.scope.id).find(".modaal-gallery-item." + t2.private_options.active_class) : o2.find(".modaal-iframe-elem").length ? o2.find(".modaal-iframe-elem") : o2.find(".modaal-video-wrap").length ? o2.find(".modaal-video-wrap") : o2.find(".modaal-focus"), i.attr("tabindex", "0").focus(), "none" !== e2 && setTimeout(function() {
      t2.options.after_open.call(t2, o2);
    }, t2.options.after_callback_delay);
  }, modaal_close: function() {
    var t2 = this, o2 = a("#" + t2.scope.id);
    t2.options.before_close.call(t2, o2), null !== t2.xhr && (t2.xhr.abort(), t2.xhr = null), "none" === t2.options.animation && o2.addClass("modaal-start_none"), "fade" === t2.options.animation && o2.addClass("modaal-start_fade"), "slide-down" === t2.options.animation && o2.addClass("modaal-start_slide_down"), setTimeout(function() {
      "inline" == t2.options.type && a("#" + t2.scope.id + " .modaal-content-container").contents().detach().appendTo(t2.scope.source), o2.remove(), t2.options.after_close.call(t2), t2.scope.is_open = false;
    }, t2.options.after_callback_delay), t2.modaal_overlay("hide"), null != t2.lastFocus && t2.lastFocus.focus();
  }, modaal_overlay: function(t2) {
    var o2 = this;
    "show" == t2 ? (o2.scope.is_open = true, o2.options.background_scroll || o2.dom.addClass("modaal-noscroll"), a("#" + o2.scope.id + "_overlay").length < 1 && o2.dom.append('<div class="modaal-overlay" id="' + o2.scope.id + '_overlay"></div>'), a("#" + o2.scope.id + "_overlay").css("background", o2.options.background).stop().animate({ opacity: o2.options.overlay_opacity }, o2.options.animation_speed, function() {
      o2.modaal_open();
    })) : "hide" == t2 && a("#" + o2.scope.id + "_overlay").stop().animate({ opacity: 0 }, o2.options.animation_speed, function() {
      a(this).remove(), o2.dom.removeClass("modaal-noscroll");
    });
  }, is_touch: function() {
    return "ontouchstart" in window || navigator.maxTouchPoints;
  } }, e = [];
  a.fn.modaal = function(t2) {
    return this.each(function(i) {
      var l = a(this).data("modaal");
      if (l) {
        if ("string" == typeof t2)
          switch (t2) {
            case "open":
              l.create_modaal(l);
              break;
            case "close":
              l.modaal_close();
          }
      } else {
        var n = Object.create(o);
        n.init(t2, this), a.data(this, "modaal", n), e.push({ element: a(this).attr("class"), options: t2 });
      }
    });
  }, a.fn.modaal.options = { type: "inline", content_source: null, animation: "fade", animation_speed: 300, after_callback_delay: 350, is_locked: false, hide_close: false, background: "#000", overlay_opacity: "0.8", overlay_close: true, accessible_title: "Dialog Window", start_open: false, fullscreen: false, custom_class: "", background_scroll: false, should_open: true, close_text: "Close", close_aria_label: "Close (Press escape to close)", width: null, height: null, before_open: function() {
  }, after_open: function() {
  }, before_close: function() {
  }, after_close: function() {
  }, source: function(a2, t2) {
    return t2;
  }, confirm_button_text: "Confirm", confirm_cancel_button_text: "Cancel", confirm_title: "Confirm Title", confirm_content: "<p>This is the default confirm dialog content. Replace me through the options</p>", confirm_callback: function() {
  }, confirm_cancel_callback: function() {
  }, gallery_active_class: "gallery_active_item", outer_controls: false, before_image_change: function(a2, t2) {
  }, after_image_change: function(a2) {
  }, loading_content: '<div class="modaal-loading-spinner"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>', loading_class: "is_loading", ajax_error_class: "modaal-error", ajax_success: function() {
  }, instagram_id: null }, a(function() {
    var o2 = a(".modaal");
    o2.length && o2.each(function() {
      t(a(this));
    });
    var i = new MutationObserver(function(o3) {
      o3.forEach(function(o4) {
        if (o4.addedNodes && o4.addedNodes.length > 0) {
          [].some.call(o4.addedNodes, function(o5) {
            var i2 = a(o5);
            (i2.is("a") || i2.is("button")) && (i2.hasClass("modaal") ? t(i2) : e.forEach(function(t2) {
              if (t2.element == i2.attr("class"))
                return a(i2).modaal(t2.options), false;
            }));
          });
        }
      });
    }), l = { subtree: true, attributes: true, childList: true, characterData: true };
    setTimeout(function() {
      i.observe(document.body, l);
    }, 500);
  });
}(jQuery);
jQuery(function($) {
  $(".js-infiniteslide--left").infiniteslide({
    "direction": "left",
    "speed": 20,
    "pauseonhover": true,
    "clone": 2,
    "responsive": true
  });
  $(".js-infiniteslide--right").infiniteslide({
    "direction": "right",
    "speed": 20,
    "pauseonhover": true,
    "clone": 2,
    "responsive": true
  });
  $(".gallery").modaal({
    type: "image",
    background: "#fff",
    overlay_opacity: "0.5",
    fullscreen: true
  });
  const elem = document.querySelector(".js-masonry");
  new Masonry(elem, {
    itemSelector: ".js-masonry__item",
    // isFitWidth: true,
    gutter: 40,
    horizontalOrder: true
  });
});
