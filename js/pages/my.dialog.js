/**
 * 弹框插件
 * @param $ jQuery
 */
!function ($) {
    function isMobile() {
        var a = navigator.userAgent.toLowerCase(), b = "ipad" == a.match(/ipad/i), c = "iphone os" == a.match(/iphone os/i), d = "midp" == a.match(/midp/i), e = "rv:1.2.3.4" == a.match(/rv:1.2.3.4/i), f = "ucweb" == a.match(/ucweb/i), g = "android" == a.match(/android/i), h = "windows ce" == a.match(/windows ce/i), i = "windows mobile" == a.match(/windows mobile/i);
        return "webview" == a.match(/webview/i), b || c || d || e || f || g || h || i
    }

    function replaceJson(a) {
        for (var b = 0, c = _dialogHtml; b < a.length; b++)c = c.replaceTagAll(a[b].name, a[b].value);
        return c
    }

    function getRandomString(a) {
        function d(a) {
            for (var b = 0, c = !1; b < _randomStrings.length; b++)if (_randomStrings[b] == a) {
                c = !0;
                break
            }
            return c
        }

        function e(a) {
            return Math.floor(Math.random() * a)
        }

        var b = a || 15, c = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789";
        return function f(a) {
            for (var g = 0, h = 0, i = 0, j = ""; b > g && a > 0; g++)h = function k() {
                return i = e(a), 0 > i || i >= a ? k() : i
            }(), j += c.charAt(h);
            return !isNaN(parseInt(j)) || d(j) ? f(a) : _randomStrings[_randomStrings.length] = j && j
        }(c.length)
    }

    function getZIndex() {
        return function (a, b) {
            return _zIndex++ + "" + b(a.getHours()) + b(a.getMinutes()) + b(a.getSeconds())
        }(new Date, function (a) {
            return 10 > a ? "0" + a : a
        })
    }

    function getSwitchType(a) {
        function b(a) {
            return 2 == a.length && !isNaN(a[0]) && !isNaN(a[1])
        }

        function c(a, b) {
            return {_index: 1, _options: {_html: a, _size: b}}
        }

        function d(a, b, c) {
            return {_index: 1, _options: {_title: a, _html: b, _size: c}}
        }

        return 0 == a.length ? 0 : 1 == a.length && "string" == typeof a[0] ? function (a) {
            return {_index: 1, _options: {_html: a}}
        }(a[0]) : 1 == a.length && "object" == typeof a[0] ? a[0] : 2 == a.length ? function (d, e) {
            return "string" == typeof d && "string" == typeof e ? {
                _index: 1,
                _options: {_title: d, _html: e}
            } : $.isArray(d) && b(d) ? c(e, d) : $.isArray(e) && b(e) ? c(d, e) : a
        }(a[0], a[1]) : 3 == a.length ? function (c, e, f) {
            return $.isArray(c) && b(c) ? d(e, f, c) : $.isArray(e) && b(e) ? d(c, f, e) : $.isArray(f) && b(f) ? d(c, e, f) : a
        }(a[0], a[1], a[2]) : a
    }

    var _dialogHtml = '<div id="{{dialogName}}" class="my-dialog-wrap"><div class="modal-body {{dialogBody}}"><div class="title {{titleName}}"><a href="javascript:;" class="{{close}}"></a><h2 class="icon icon-{{icon}}">{{title}}</h2></div><div class="model-content"><div class="inner-content {{contentName}}">{{content}}</div></div><div class="model-footer {{footerName}}"></div></div><div class="watermark {{watermark}}"></div></div>', _removeFlag = "remove", _zIndex = 1, _randomStrings = [];
    String.prototype.replaceTagAll = function (_regExp, _rText) {
        var _this = this;
        return _regExp = eval("/{{" + _regExp + "}}/ig"), _this = _this.replace(_regExp, _rText)
    }, $.fn.limeDialog = function (a) {
        function k() {
            e.fadeOut("fast", function () {
                "function" == typeof a._cancel && a._cancel(), e.addClass(_removeFlag), e.remove(), a._close(e)
            })
        }

        function l() {
            e.hasClass(_removeFlag) && $(c).append(e), e.fadeIn(200, function () {
                "undefined" != typeof h.niceScroll && h.niceScroll({
                    cursorborder: "",
                    cursorcolor: "#CCC"
                }), "function" == typeof a._start && a._start(e), a._show(e)
            })
        }

        function m() {
            var d, b = $(window).width(), c = $(window).height();
            d = b <= a._size[0] ? b : a._size[0], e.find("." + a._modelBox).css({
                width: d,
                height: a._size[1],
                position: "absolute",
                left: (b - d) / 2,
                top: (c - a._size[1]) / 2
            })
        }

        function n() {
            return e.find("." + a._contentBox)
        }

        function o() {
            return e.find("." + a._titleBox + " h2")
        }

        function p() {
            return e.find("." + a._footerBox)
        }

        function q(b) {
            "undefined" != typeof b && e.find("." + a._contentBox).append(b)
        }

        function r(b) {
            e.find("." + a._contentBox).html(""), q(b)
        }

        var d, e, g, h, i, c, f, j, b = {
            _zIndex: getZIndex(),
            _closeBtn: "btn-close",
            _idBox: "lime_dialog_" + getRandomString(12),
            _modelBox: "model_" + getRandomString(6),
            _titleBox: "title_" + getRandomString(6),
            _contentBox: "content_" + getRandomString(6),
            _footerBox: "footer_" + getRandomString(6),
            _maskBox: "mask_" + getRandomString(6)
        };
        a = $.extend({
            _draggable: !0,
            _mask: !0,
            _maskClose: !1,
            _isShow: !0,
            _title: "提示信息",
            _size: [500, 300],
            _icon: "",
            _html: "",
            _addClass: "",
            _show: function () {
            },
            _close: function () {
            },
            _start: function () {
            },
            _cancel: function () {
            }
        }, a, b), c = this, f = !1, j = {
            start: isMobile() ? "touchstart" : "mousedown",
            move: isMobile() ? "touchmove" : "mousemove",
            end: isMobile() ? "touchend" : "mouseup"
        };
        try {
            d = replaceJson([{name: "dialogName", value: a._idBox}, {
                name: "dialogBody",
                value: a._modelBox
            }, {name: "titleName", value: a._titleBox}, {
                name: "contentName",
                value: a._contentBox
            }, {name: "footerName", value: a._footerBox}, {name: "watermark", value: a._maskBox}, {
                name: "icon",
                value: a._icon
            }, {name: "close", value: a._closeBtn}, {name: "title", value: a._title}, {
                name: "content",
                value: a._html
            }]), e = $(d).css({
                display: "none",
                "z-index": a._zIndex
            }).addClass(a._addClass), g = o(), h = n(), i = p().hide(), h.css({
                width: "100%",
                height: "100%"
            }), e.find("." + a._closeBtn).on("click", k), m(), function (b) {
                a._mask ? b.show() : b.hide()
            }(e.find("." + a._maskBox)), a._draggable && function (a, b, c) {
                function d() {
                    return [$(window).outerWidth() - b.outerWidth(), $(window).outerHeight() - b.outerHeight()]
                }

                a.css({cursor: "move"});
                var f = {left: 0, top: 0, currentX: 0, currentY: 0, flag: !1}, g = [0, 0], h = d();
                a.on(j.start, function (c) {
                    c || (c = window.event, a.onselectstart = function () {
                        return !1
                    }), isMobile() && (c = c.originalEvent.touches[0]), f.flag || (f.left = b.offset().left, f.top = b.offset().top, f.currentX = c.pageX, f.currentY = c.pageY, f.flag = !0)
                }), e.on(j.move, function (a) {
                    return f.flag && (
                        a.preventDefault && a.preventDefault(),
                        a = a ? a : window.event,
                        h = d(),
                        isMobile() && (a = a.originalEvent.touches[0]),
                        c(b, Math.min(Math.max(g[0], f.left + a.clientX - f.currentX), h[0]), Math.min(Math.max(g[1], f.top + a.clientY - f.currentY), h[1]))
                    ), !1
                }), e.on(j.end, function () {
                    f.flag = !1
                }), $(window).on(j.end, function () {
                    f.flag = !1
                })
            }(e.find("." + a._titleBox), e.find("." + a._modelBox), function (a, b, c) {
                a.css({left: b, top: c})
            }), $(window).resize(function () {
                f || (f = !0, f && m(), f = !1)
            }), a._isShow ? ($(c).append(e), l()) : e.addClass(_removeFlag), a._maskClose && e.find("." + a._maskBox).on("click", k), e.showDialog = l, e.closeDialog = k, e.contentElement = h, e.titleElement = g, e.footElement = i, e.appendHtml = q, e.setHtml = r
        } catch (s) {
            console.log("error..." + s.message)
        }
        return e
    }, $.dialog = function () {
        try {
            var c, a = getSwitchType(arguments), b = $("body");
            if (!a)return null;
            switch (a._index) {
                case 1:
                    c = b.limeDialog(a._options);
                    break;
                case 2:
                    break;
                default:
                    c = b.limeDialog(a)
            }
        } catch (d) {
            console.log("error..." + d.message)
        }
        return c
    }, ~function (a) {
        function b(b, c, d, e) {
            e = "function" == typeof e ? e : function () {
            }, c = c || 3e3;
            var f = a.dialog({
                _title: "",
                _html: b || "",
                _maskClose: d,
                _size: [200, 100],
                _addClass: "dialog-hint lime-trans",
                _cancel: e,
                _show: function () {
                }
            });
            setTimeout(function () {
                f.hasClass(_removeFlag) || f.closeDialog()
            }, c)
        }

        function c(b, c, d, e, f) {
            d = d || ["确认", "取消"], e = e || function () {
                }, f = f || function () {
                };
            var h, i, g = a.dialog({
                _title: b || "信息",
                _html: c || "",
                _addClass: "dialog-hint lime-confirm",
                _size: [300, 160]
            });
            h = a("<button />").addClass("confirm okay").text(d[0]).on("click", function () {
                g.closeDialog(), e()
            }), 1 == d.length ? g.footElement.append(h).show() : 2 == d.length && (i = a("<button />").addClass("confirm cancel").text(d[1]).on("click", function () {
                g.closeDialog(), f()
            }), g.footElement.append(h).append(i).show())
        }

        function d(b) {
            return a.isArray(b) && (2 == b.length || 1 == b.length) && function () {
                    for (var a = 0, c = 0; a < b.length; a++)"string" == typeof b[a] && c++;
                    return b.length == c
                }()
        }

        function e(b) {
            return {
                _title: "undefined" != typeof b["_title"] && "string" == typeof b["_title"] && "" != a.trim(b["_title"]) ? b["_title"] : void 0,
                _html: "undefined" != typeof b["_content"] && "string" == typeof b["_content"] && "" != a.trim(b["_content"]) ? b["_content"] : void 0,
                _button: "undefined" != typeof b["_button"] && d(b["_button"]) ? b["_button"] : void 0,
                _okayCallback: "undefined" != typeof b["_okayCallback"] && "function" == typeof b["_okayCallback"] ? b["_okayCallback"] : function () {
                },
                _cancelCallback: "undefined" != typeof b["_cancelCallback"] && "function" == typeof b["_cancelCallback"] ? b["_cancelCallback"] : function () {
                }
            }
        }

        a.alert = function (b, c) {
            c = "undefined" != typeof c && "function" == typeof c ? c : function () {
            }, a.dialog({
                _title: "提示信息",
                _html: b || "",
                _size: [300, 120],
                _addClass: "dialog-hint lime-alert",
                _cancel: c
            })
        }, a.transMsg = function () {
            for (var c, d, e, f, a = 0; a < arguments.length; a++)"string" == typeof arguments[a] ? c = arguments[a] : "number" == typeof arguments[a] ? d = arguments[a] : "boolean" == typeof arguments[a] ? e = arguments[a] : "function" == typeof arguments[a] && (f = arguments[a]);
            "undefined" != typeof c && ("undefined" == typeof d && (d = 3e3), "undefined" == typeof e && (e = !0), "function" != typeof f && (f = function () {
            }), b(c, d, e, f))
        }, a.confirm = function () {
            if (0 != arguments.length) {
                var b;
                1 == arguments.length && "object" == typeof arguments[0] ? (b = e(arguments[0]), c(b._title, b._html, b._button, b._okayCallback, b._cancelCallback)) : 2 == arguments.length && "string" == typeof arguments[0] && "object" == typeof arguments[1] ? (b = e(arguments[1]), c(b._title, arguments[0], b.button, b._okayCallback, b._cancelCallback)) : 2 == arguments.length && "string" == typeof arguments[1] && "object" == typeof arguments[0] ? (b = e(arguments[0]), c(b._title, arguments[1], b.button, b._okayCallback, b._cancelCallback)) : 2 == arguments.length && "string" == typeof arguments[0] && "function" == typeof arguments[1] ? c(void 0, arguments[0], void 0, arguments[1], void 0) : 3 == arguments.length && "string" == typeof arguments[0] && "function" == typeof arguments[1] && "function" == typeof arguments[2] ? c(void 0, arguments[0], void 0, arguments[1], arguments[2]) : 3 == arguments.length && "string" == typeof arguments[0] && d(arguments[1]) && "function" == typeof arguments[2] ? c(void 0, arguments[0], arguments[1], arguments[2], void 0) : 4 == arguments.length && "string" == typeof arguments[0] && a.isArray(arguments[1]) && 2 == arguments[1].length && "function" == typeof arguments[2] && "function" == typeof arguments[3] && c(void 0, arguments[0], "string" == typeof arguments[1][0] && "string" == typeof arguments[1][1] ? arguments[1] : void 0, arguments[2], arguments[3])
            }
        }, a.myDialog = function (c) {
            var e, f, d = {
                _title: "信息",
                _html: "",
                _addClass: "lime-myDialog",
                _buttons: {},
                _size: [600, 450]
            }, g = !1;
            return c = a.extend(d, c), e = a.dialog(c), "object" == typeof c._ftStyle && e.footElement.css(c._ftStyle), "object" == typeof c._buttons && a.each(c._buttons, function (c, d) {
                f = a("<button />"), "string" == typeof d._viewName && f.text(d._viewName).addClass(c), "object" == typeof d._style && f.css(d._style), "function" == typeof d._callback && f.on("click", function () {
                    d._callback(e)
                }), e.footElement.append(f), g || (g = b)
            }), g && e.footElement.show(), e
        }
    }($)
}(jQuery);