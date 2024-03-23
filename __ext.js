/* ==== INCLUDE: /js/blocks.js ==== */

LazyLoad = function(a) {
    function h(b, c) {
        var e, d = a.createElement(b);
        for (e in c) c.hasOwnProperty(e) && d.setAttribute(e, c[e]);
        return d
    }

    function i(a) {
        var c, g, b = d[a];
        b && (c = b.callback, g = b.urls, g.shift(), e = 0, g.length || (c && c.call(b.context, b.obj), d[a] = null, f[a].length && k(a)))
    }

    function j() {
        var c = navigator.userAgent;
        b = {
            async: a.createElement("script").async === !0
        }, (b.webkit = /AppleWebKit\//.test(c)) || (b.ie = /MSIE|Trident/.test(c)) || (b.opera = /Opera/.test(c)) || (b.gecko = /Gecko\//.test(c)) || (b.unknown = !0)
    }

    function k(e, g, k, n, o) {
        var s, t, u, v, w, x, p = function() {
                i(e)
            },
            q = "css" === e,
            r = [];
        if (b || j(), g)
            if (g = "string" == typeof g ? [g] : g.concat(), q || b.async || b.gecko || b.opera) f[e].push({
                urls: g,
                callback: k,
                obj: n,
                context: o
            });
            else
                for (s = 0, t = g.length; s < t; ++s) f[e].push({
                    urls: [g[s]],
                    callback: s === t - 1 ? k : null,
                    obj: n,
                    context: o
                });
        if (!d[e] && (v = d[e] = f[e].shift())) {
            for (c || (c = a.head || a.getElementsByTagName("head")[0]), w = v.urls.concat(), s = 0, t = w.length; s < t; ++s) x = w[s], q ? u = b.gecko ? h("style") : h("link", {
                href: x,
                rel: "stylesheet"
            }) : (u = h("script", {
                src: x
            }), u.async = !1), u.className = "lazyload", u.setAttribute("charset", "utf-8"), b.ie && !q && "onreadystatechange" in u && !("draggable" in u) ? u.onreadystatechange = function() {
                /loaded|complete/.test(u.readyState) && (u.onreadystatechange = null, p())
            } : q && (b.gecko || b.webkit) ? b.webkit ? (v.urls[s] = u.href, m()) : (u.innerHTML = '@import "' + x + '";', l(u)) : u.onload = u.onerror = p, r.push(u);
            for (s = 0, t = r.length; s < t; ++s) c.appendChild(r[s])
        }
    }

    function l(a) {
        var b;
        try {
            b = !!a.sheet.cssRules
        } catch (c) {
            return e += 1, void(e < 200 ? setTimeout(function() {
                l(a)
            }, 50) : b && i("css"))
        }
        i("css")
    }

    function m() {
        var b, a = d.css;
        if (a) {
            for (b = g.length; --b >= 0;)
                if (g[b].href === a.urls[0]) {
                    i("css");
                    break
                }
            e += 1, a && (e < 200 ? setTimeout(m, 50) : i("css"))
        }
    }
    var b, c, d = {},
        e = 0,
        f = {
            css: [],
            js: []
        },
        g = a.styleSheets;
    return {
        css: function(a, b, c, d) {
            k("css", a, b, c, d)
        },
        js: function(a, b, c, d) {
            k("js", a, b, c, d)
        }
    }
}(this.document);

window.nanoid = (t = 21) => {
    let e = "",
        r = crypto.getRandomValues(new Uint8Array(t));
    for (; t--;) {
        let n = 63 & r[t];
        e += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? "_" : "-"
    }
    return e
};

! function(n, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (n = n || self).TypeIt = t()
}(this, (function() {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        } : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        })(t)
    }
    var t = {
            strings: [],
            speed: 100,
            cursor: !0,
            cursorChar: "|",
            cursorSpeed: 1e3,
            deleteSpeed: null,
            lifeLike: !0,
            breakLines: !0,
            startDelay: 250,
            startDelete: !1,
            nextStringDelay: 750,
            loop: !1,
            loopDelay: 750,
            html: !0,
            waitUntilVisible: !1,
            beforeString: function() {},
            afterString: function() {},
            beforeStep: function() {},
            afterStep: function() {},
            afterComplete: function() {}
        },
        e = function(n) {
            return n.map((function(n) {
                return void 0 === n[1] && n.push(null), void 0 === n[2] && n.push({}), n
            }))
        },
        r = function(n, t) {
            return Object.assign({}, n, t)
        },
        i = function(n) {
            return Array.isArray(n)
        },
        o = function(n, t) {
            return n[2] = r(n[2], t) || t, n
        },
        u = function(n, t) {
            return i(n[0]) ? n.map((function(n) {
                return o(n, t)
            })) : o(n, t)
        },
        c = function(n, t, e, r) {
            r = r || !1, e = e || {};
            var o = !i(n),
                c = n.length;
            return (n = o ? new Array(n).fill(0) : n).map((function(n, i) {
                if (o) return t;
                var a = [t, n, e];
                return r && (0 === i && (a = u(a, {
                    isFirst: !0
                })), i + 1 === c && (a = u(a, {
                    isLast: !0
                }))), a
            }))
        };

    function a(n) {
        this.insert = function(n, e) {
            t.splice(n, 0, e)
        }, this.add = function(n, u, a) {
            return n = i(n) ? n : [n, null], a = a || !1, u = u || 1, i(n[0]) || (n = c(u, n)), n = e(n).map((function(n) {
                return n[2] = r(n[2], {
                    id: o
                }), o++, n
            })), t = a ? n.concat(t) : t.concat(n), this
        }, this.set = function(n, e) {
            t[n] = e
        }, this.reset = function() {
            t = t.map((function(n) {
                return n[2].executed = !1, n
            }))
        }, this.getItems = function() {
            return (t = e(t)).filter((function(n) {
                return !n[2].executed
            }))
        }, this.setMeta = function(n, e) {
            var i = t.findIndex((function(t) {
                return t[2].id === n
            }));
            t[i][2] = r(t[i][2], e)
        };
        var t = [],
            o = 0;
        this.add(n)
    }
    var f = function(n) {
            return Array.from(n)
        },
        s = function(n) {
            var t = [];
            return t.concat.apply(t, n)
        },
        l = function(n) {
            var t = document.implementation.createHTMLDocument("");
            return t.body.innerHTML = n, t.body
        },
        d = function n(t, e, r) {
            e = e || null, r = void 0 !== r && r;
            var i = f(t.childNodes).map((function(t) {
                return 3 === (e = t).nodeType || "BR" === e.tagName ? t : n(t);
                var e
            }));
            return i = s(i), e && (i = i.filter((function(n) {
                return !e.contains(n)
            }))), r ? i.reverse() : i
        },
        p = function(n) {
            return "BODY" === n.tagName
        },
        h = function(n, t) {
            t = t || null;
            var e = n instanceof HTMLElement;
            return {
                node: t,
                isTopLevelText: (!t || p(t.parentNode)) && !e,
                isHTMLElement: e,
                content: n
            }
        };

    function v(n) {
        var t, e = l(n);
        return t = d(e).map((function(n) {
            return n.nodeValue ? f(n.nodeValue).map((function(t) {
                return h(t, n)
            })) : h(n)
        })), s(t)
    }

    function y(n, t) {
        return (t = void 0 === t || t) ? v(n) : f(n).map((function(n) {
            return h(n)
        }))
    }
    var m = function(n) {
            return document.createElement(n)
        },
        g = function(n, t) {
            var e = m("style");
            e.id = t || "", e.appendChild(document.createTextNode(n)), document.head.appendChild(e)
        },
        b = function(n) {
            return i(n) || (n = [n / 2, n / 2]), {
                before: n[0],
                after: n[1],
                total: n[0] + n[1]
            }
        },
        S = function(n, t) {
            return Math.abs(Math.random() * (n + t - (n - t)) + (n - t))
        };
    var N = function(n) {
            return ["textarea", "input"].indexOf(n.tagName.toLowerCase()) > -1
        },
        T = function(n, t) {
            var e = t.querySelectorAll("*");
            return [t].concat(f(e).reverse()).find((function(t) {
                return t.cloneNode().outerHTML === n.outerHTML
            }))
        },
        L = function(n, t, e, r) {
            e = e || null;
            var i = t.isHTMLElement,
                o = i ? t.content : document.createTextNode(t.content);
            if (N(n)) n.value = "".concat(n.value).concat(t.content);
            else {
                if (!t.isTopLevelText && !i) {
                    var u = t.node.parentNode,
                        c = T(u.cloneNode(), n);
                    if (function(n, t) {
                            if (!n) return !1;
                            var e = n.nextSibling;
                            return !e || e.isEqualNode(t)
                        }(c, e)) n = c;
                    else if ((o = u.cloneNode()).innerText = t.content, !p(u.parentNode)) {
                        for (var a = u.parentNode, f = a.cloneNode(), s = T(f, n); !s && !p(a);) f.innerHTML = o.outerHTML, o = f, f = a.parentNode.cloneNode(), a = a.parentNode, s = T(f, n);
                        n = s || n
                    }
                }
                var l = d(n, e, !0)[r - 1],
                    h = l ? l.parentNode : n;
                h.insertBefore(o, h.contains(e) ? e : null)
            }
        },
        M = function(n) {
            var t;
            return null == n || null === (t = n.parentNode) || void 0 === t ? void 0 : t.removeChild(n)
        };
    var x = function(n, t, e) {
            var r, i = "string" == typeof n,
                o = !1,
                u = -1 * n;
            return i && (u = (r = "END" === n.toUpperCase()) ? -1 : 1, o = r ? t + u > 0 : t + u < e.length), {
                isString: i,
                numberOfSteps: u,
                canKeepMoving: o
            }
        },
        w = function(n) {
            var t, e = ["font", "lineHeight", "color"],
                r = m("SPAN"),
                i = (t = n, window.getComputedStyle(t, null));
            for (var o in i) e.indexOf(o) > -1 && i[o] && (r.style[o] = i[o]);
            return r.style.cssText
        };

    function D(n, t, e) {
        return e ? t ? t(n) : n : (n && n.then || (n = Promise.resolve(n)), t ? n.then(t) : n)
    }

    function H(n) {
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            try {
                return Promise.resolve(n.apply(this, t))
            } catch (n) {
                return Promise.reject(n)
            }
        }
    }

    function E() {}

    function C(n, t) {
        if (!t) return n && n.then ? n.then(E) : Promise.resolve()
    }

    function A(n, t) {
        var e = n();
        return e && e.then ? e.then(t) : t(e)
    }

    function k(n, t, e) {
        if (!n.s) {
            if (e instanceof O) {
                if (!e.s) return void(e.o = k.bind(null, n, t));
                1 & t && (t = e.s), e = e.v
            }
            if (e && e.then) return void e.then(k.bind(null, n, t), k.bind(null, n, 2));
            n.s = t, n.v = e;
            var r = n.o;
            r && r(n)
        }
    }
    var O = function() {
        function n() {}
        return n.prototype.then = function(t, e) {
            var r = new n,
                i = this.s;
            if (i) {
                var o = 1 & i ? t : e;
                if (o) {
                    try {
                        k(r, 1, o(this.v))
                    } catch (n) {
                        k(r, 2, n)
                    }
                    return r
                }
                return this
            }
            return this.o = function(n) {
                try {
                    var i = n.v;
                    1 & n.s ? k(r, 1, t ? t(i) : i) : e ? k(r, 1, e(i)) : k(r, 2, i)
                } catch (n) {
                    k(r, 2, n)
                }
            }, r
        }, n
    }();

    function P(n, t) {
        return n && n.then ? n.then(t) : t(n)
    }
    return function(e, o) {
        var u = this,
            s = this;
        o = o || {};
        var p = function(n, t, e) {
                return n = i(n[0]) ? n : [n], an.add(n, t),
                    function(n) {
                        var t = (n = n || {}).delay;
                        t && an.add([U, t])
                    }(e), s
            },
            T = function(t) {
                return t = "object" === n(t) ? t : {}, [
                    [Q, t, {
                        force: !0
                    }],
                    [Q, en, {
                        force: !0
                    }]
                ]
            },
            z = function() {
                return X ? f(W.value) : d(W, fn, !0)
            },
            B = function(n, t) {
                t = t || 1;
                var e = en.nextStringDelay;
                an.insert(n, [U, e.before]), an.insert(n + t + 1, [U, e.after])
            },
            I = H((function() {
                if (fn) {
                    var n = "[data-typeit-id='".concat(cn, "'] .ti-cursor");
                    g("@keyframes blink-".concat(cn, " { 0% {opacity: 0} 49% {opacity: 0} 50% {opacity: 1} } ").concat(n, " { animation: blink-").concat(cn, " ").concat(en.cursorSpeed / 1e3, "s infinite; } ").concat(n, ".with-delay { animation-delay: 500ms; } ").concat(n, ".disabled { animation: none; }"), cn), W.appendChild(fn);
                    var t = "loaded" === document.fonts.status;
                    return D(t || document.fonts.ready, (function(n) {
                        var t = fn.getBoundingClientRect().width / 2;
                        fn.style.margin = "0 -".concat(t + 2, "px 0 -").concat(t - 2, "px")
                    }), t)
                }
            })),
            R = function(n) {
                fn && (fn.classList.toggle("disabled", n), fn.classList.toggle("with-delay", !n))
            },
            q = H((function(n, t) {
                return $.push(setTimeout(n, t)), D()
            })),
            j = H((function(n) {
                var t = _;
                return D(t && F(_), (function(t) {
                    return an.reset(), an.set(0, [U, n.before]), C(G(!0))
                }), !t)
            })),
            V = H((function() {
                tn.started = !0;
                var n, t = an.getItems();
                return P(function(n, t) {
                    try {
                        var e = n()
                    } catch (n) {
                        return t(n)
                    }
                    return e && e.then ? e.then(void 0, t) : e
                }((function() {
                    return P(function(n, t, e) {
                        var r, i, o = -1;
                        return function u(c) {
                            try {
                                for (; ++o < n.length && (!e || !e());)
                                    if ((c = t(o)) && c.then) {
                                        if (!((a = c) instanceof O && 1 & a.s)) return void c.then(u, i || (i = k.bind(null, r = new O, 2)));
                                        c = c.v
                                    }
                                r ? k(r, 1, c) : r = c
                            } catch (n) {
                                k(r || (r = new O), 2, n)
                            }
                            var a
                        }(), r
                    }(t, (function(e) {
                        if (tn.frozen || tn.destroyed) throw "";
                        var r, i, o, c, a = t[e],
                            f = a[2];
                        return n = [a, u], f.freezeCursor && R(!0), r = en.speed, i = en.deleteSpeed, o = en.lifeLike, c = (i = null !== i ? i : r / 3) / 2, Z = o ? [S(r, r / 2), S(i, c)] : [r, i], A((function() {
                            var t;
                            if (null == f ? void 0 : f.isFirst) return C((t = en).beforeString.apply(t, n))
                        }), (function() {
                            var t;
                            return D((t = en).beforeStep.apply(t, n), (function() {
                                return D(a[0].call(u, a[1], f), (function() {
                                    return A((function() {
                                        var t, e;
                                        if (null === (t = a[2]) || void 0 === t ? void 0 : t.isLast) return C((e = en).afterString.apply(e, n))
                                    }), (function() {
                                        var t;
                                        return D((t = en).afterStep.apply(t, n), (function() {
                                            an.setMeta(f.id, {
                                                executed: !0
                                            }), R(!1)
                                        }))
                                    }))
                                }))
                            }))
                        }))
                    }), (function() {
                        return !1
                    })), (function(t) {
                        var e;
                        return tn.completed = !0, D((e = en).afterComplete.apply(e, n), (function() {
                            if (!en.loop) throw "";
                            var n = en.loopDelay;
                            q((function() {
                                return D(j(n), (function() {
                                    V()
                                }))
                            }), n.after)
                        }))
                    }))
                }), E), (function(n) {
                    return u
                }))
            })),
            U = function(n) {
                return new Promise((function(t) {
                    q((function() {
                        return t()
                    }), n || 0)
                }))
            },
            F = function n(t) {
                var e = z(),
                    r = x(t, _, e);
                return _ += r.numberOfSteps, new Promise((function(t) {
                    q(H((function() {
                        return function(n, t, e, r) {
                            if (e) {
                                var i = r,
                                    o = t[(i = i > t.length ? t.length : i) - 1];
                                (n = o ? o.parentNode : n).insertBefore(e, o || null)
                            }
                        }(W, z(), fn, _), A((function() {
                            if (r.isString && r.canKeepMoving) return C(n(r.numberOfSteps > 0 ? "START" : "END"))
                        }), (function() {
                            return t()
                        }))
                    })), Z[0])
                }))
            },
            K = function(n) {
                return new Promise((function(t) {
                    q((function() {
                        return L(W, n, fn, _), t()
                    }), Z[0])
                }))
            },
            Q = H((function(n) {
                en = r(en, n)
            })),
            Y = H((function() {
                X ? W.value = "" : z().forEach((function(n) {
                    M(n)
                }))
            })),
            G = function n(t) {
                return t = !0 === t, new Promise((function(e) {
                    q(H((function() {
                        var r = !1,
                            i = z();
                        return i.length && (X ? W.value = W.value.slice(0, -1) : M(i[_])), f(W.querySelectorAll("*")).forEach((function(n) {
                            if (!n.innerHTML && "BR" !== n.tagName) {
                                for (var t = n; 1 === t.parentNode.childNodes.length && t.parentNode.childNodes[0].isEqualNode(t);) t = t.parentNode;
                                M(t)
                            }
                        })), A((function() {
                            if (t && i.length - 1 > 0) return D(n(!0), (function() {
                                return r = !0, e()
                            }))
                        }), (function(n) {
                            return r ? n : e()
                        }))
                    })), Z[1])
                }))
            };
        this.break = function(n) {
            return p([K, h(m("BR"))], 1, n)
        }, this.delete = function(n, t) {
            var e = T(t);
            return p([e[0]].concat([].concat(Array(Math.abs(n) || 1)).fill().map((function() {
                return [G, !n, nn]
            })), [e[1]]), 1, t)
        }, this.empty = function() {
            return p(Y, 1, arguments)
        }, this.exec = function(n, t) {
            var e = T(t);
            return p([e[0],
                [n, null], e[1]
            ], 1, t)
        }, this.move = function(n, t) {
            var e = x(n, _, z()),
                r = T(t),
                i = e.isString ? n : Math.sign(n);
            return p([r[0]].concat([].concat(Array(Math.abs(n) || 1)).fill().map((function() {
                return [F, i, nn]
            })), [r[1]]), 1, t)
        }, this.options = function(n) {
            return p([Q, n], 1, n)
        }, this.pause = function(n, t) {
            return p([U, n], 1, t)
        }, this.type = function(n, t) {
            var e = T(t),
                r = y(n, en.html),
                i = [e[0]].concat(c(r, K, nn, !0), [e[1]]);
            return p(i, 1, t)
        }, this.is = function(n) {
            return tn[n]
        }, this.destroy = function(n) {
            n = void 0 === n || n, $.forEach((function(n) {
                clearTimeout(n)
            })), $ = [], n && M(fn), tn.destroyed = !0
        }, this.freeze = function() {
            tn.frozen = !0
        }, this.unfreeze = function() {
            tn.frozen = !1, V()
        }, this.reset = function() {
            for (var n in !this.is("destroyed") && this.destroy(), an.reset(), _ = 0, tn) tn[n] = !1;
            return X ? W.value = "" : W.innerHTML = "", this
        }, this.go = function() {
            return tn.started ? this : (I(), en.waitUntilVisible ? (function(n, t) {
                new IntersectionObserver((function(e, r) {
                    e.forEach((function(e) {
                        e.isIntersecting && (t(), r.unobserve(n))
                    }))
                }), {
                    threshold: 1
                }).observe(n)
            }(W, V.bind(this)), this) : (V(), this))
        }, this.getQueue = function() {
            return an
        }, this.getOptions = function() {
            return en
        }, this.getElement = function() {
            return W
        };
        var J, W = "string" == typeof(J = e) ? document.querySelector(J) : J,
            X = N(W),
            Z = [],
            $ = [],
            _ = 0,
            nn = {
                freezeCursor: !0
            },
            tn = {
                started: !1,
                completed: !1,
                frozen: !1,
                destroyed: !1
            },
            en = r(t, o);
        en = r(en, {
            html: !X && en.html,
            nextStringDelay: b(en.nextStringDelay),
            loopDelay: b(en.loopDelay)
        });
        var rn, on, un, cn = Math.random().toString().substring(2, 9),
            an = new a([U, en.startDelay]);
        W.setAttribute("data-typeit-id", cn), g("[data-typeit-id]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}[data-typeit-id]"), en.strings = (un = en.strings, rn = i(un) ? un : [un], (on = function(n) {
            return n.innerHTML.replace(/<\!--.*?-->/g, "").trim()
        }(W)) ? (W.innerHTML = "", en.startDelete ? (v(on).forEach((function(n) {
            L(W, n, fn, _)
        })), an.add([G, !0]), B(1), rn) : [on.trim()].concat(rn)) : rn);
        var fn = function() {
            if (X || !en.cursor) return null;
            var n = m("span");
            return n.innerHTML = l(en.cursorChar).innerHTML, n.className = "ti-cursor", n.style.cssText = "display:inline;".concat(w(W)), n
        }();
        en.strings.length && function() {
            var n = en.strings.filter((function(n) {
                return !!n
            }));
            n.forEach((function(t, e) {
                var r = y(t, en.html);
                an.add(c(r, K, nn, !0));
                var i = an.getItems().length;
                if (e + 1 !== n.length) {
                    if (en.breakLines) {
                        var o = h(m("BR"));
                        return an.add([K, o, nn]), void B(i)
                    }
                    an.add(c(r, G, nn)), B(i, t.length)
                }
            }))
        }()
    }
}));

! function() {
    "use strict";

    function o() {
        var o = window,
            t = document;
        if (!("scrollBehavior" in t.documentElement.style && !0 !== o.__forceSmoothScrollPolyfill__)) {
            var l, e = o.HTMLElement || o.Element,
                r = 468,
                i = {
                    scroll: o.scroll || o.scrollTo,
                    scrollBy: o.scrollBy,
                    elementScroll: e.prototype.scroll || n,
                    scrollIntoView: e.prototype.scrollIntoView
                },
                s = o.performance && o.performance.now ? o.performance.now.bind(o.performance) : Date.now,
                c = (l = o.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(l) ? 1 : 0);
            o.scroll = o.scrollTo = function() {
                void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? h.call(o, t.body, void 0 !== arguments[0].left ? ~~arguments[0].left : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : o.scrollY || o.pageYOffset) : i.scroll.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : o.scrollY || o.pageYOffset))
            }, o.scrollBy = function() {
                void 0 !== arguments[0] && (f(arguments[0]) ? i.scrollBy.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(o, t.body, ~~arguments[0].left + (o.scrollX || o.pageXOffset), ~~arguments[0].top + (o.scrollY || o.pageYOffset)))
            }, e.prototype.scroll = e.prototype.scrollTo = function() {
                if (void 0 !== arguments[0])
                    if (!0 !== f(arguments[0])) {
                        var o = arguments[0].left,
                            t = arguments[0].top;
                        h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t)
                    } else {
                        if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                        i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                    }
            }, e.prototype.scrollBy = function() {
                void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? this.scroll({
                    left: ~~arguments[0].left + this.scrollLeft,
                    top: ~~arguments[0].top + this.scrollTop,
                    behavior: arguments[0].behavior
                }) : i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
            }, e.prototype.scrollIntoView = function() {
                if (!0 !== f(arguments[0])) {
                    var l = function(o) {
                            for (; o !== t.body && !1 === (e = p(l = o, "Y") && a(l, "Y"), r = p(l, "X") && a(l, "X"), e || r);) o = o.parentNode || o.host;
                            var l, e, r;
                            return o
                        }(this),
                        e = l.getBoundingClientRect(),
                        r = this.getBoundingClientRect();
                    l !== t.body ? (h.call(this, l, l.scrollLeft + r.left - e.left, l.scrollTop + r.top - e.top), "fixed" !== o.getComputedStyle(l).position && o.scrollBy({
                        left: e.left,
                        top: e.top,
                        behavior: "smooth"
                    })) : o.scrollBy({
                        left: r.left,
                        top: r.top,
                        behavior: "smooth"
                    })
                } else i.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
            }
        }

        function n(o, t) {
            this.scrollLeft = o, this.scrollTop = t
        }

        function f(o) {
            if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0;
            if ("object" == typeof o && "smooth" === o.behavior) return !1;
            throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.")
        }

        function p(o, t) {
            return "Y" === t ? o.clientHeight + c < o.scrollHeight : "X" === t ? o.clientWidth + c < o.scrollWidth : void 0
        }

        function a(t, l) {
            var e = o.getComputedStyle(t, null)["overflow" + l];
            return "auto" === e || "scroll" === e
        }

        function d(t) {
            var l, e, i, c, n = (s() - t.startTime) / r;
            c = n = n > 1 ? 1 : n, l = .5 * (1 - Math.cos(Math.PI * c)), e = t.startX + (t.x - t.startX) * l, i = t.startY + (t.y - t.startY) * l, t.method.call(t.scrollable, e, i), e === t.x && i === t.y || o.requestAnimationFrame(d.bind(o, t))
        }

        function h(l, e, r) {
            var c, f, p, a, h = s();
            l === t.body ? (c = o, f = o.scrollX || o.pageXOffset, p = o.scrollY || o.pageYOffset, a = i.scroll) : (c = l, f = l.scrollLeft, p = l.scrollTop, a = n), d({
                scrollable: c,
                method: a,
                startTime: h,
                startX: f,
                startY: p,
                x: e,
                y: r
            })
        }
    }
    "object" == typeof exports && "undefined" != typeof module ? module.exports = {
        polyfill: o
    } : o()
}();
/**
 * @popperjs/core v2.4.4 - MIT License
 */

"use strict";
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).Popper = {})
}(this, (function(e) {
    function t(e) {
        return {
            width: (e = e.getBoundingClientRect()).width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top
        }
    }

    function n(e) {
        return "[object Window]" !== e.toString() ? (e = e.ownerDocument) ? e.defaultView : window : e
    }

    function r(e) {
        return {
            scrollLeft: (e = n(e)).pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function o(e) {
        return e instanceof n(e).Element || e instanceof Element
    }

    function i(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement
    }

    function a(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function s(e) {
        return (o(e) ? e.ownerDocument : e.document).documentElement
    }

    function f(e) {
        return t(s(e)).left + r(e).scrollLeft
    }

    function c(e) {
        return n(e).getComputedStyle(e)
    }

    function p(e) {
        return e = c(e), /auto|scroll|overlay|hidden/.test(e.overflow + e.overflowY + e.overflowX)
    }

    function l(e, o, c) {
        void 0 === c && (c = !1);
        var l = s(o);
        e = t(e);
        var u = i(o),
            d = {
                scrollLeft: 0,
                scrollTop: 0
            },
            m = {
                x: 0,
                y: 0
            };
        return (u || !u && !c) && (("body" !== a(o) || p(l)) && (d = o !== n(o) && i(o) ? {
            scrollLeft: o.scrollLeft,
            scrollTop: o.scrollTop
        } : r(o)), i(o) ? ((m = t(o)).x += o.clientLeft, m.y += o.clientTop) : l && (m.x = f(l))), {
            x: e.left + d.scrollLeft - m.x,
            y: e.top + d.scrollTop - m.y,
            width: e.width,
            height: e.height
        }
    }

    function u(e) {
        return {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    }

    function d(e) {
        return "html" === a(e) ? e : e.assignedSlot || e.parentNode || e.host || s(e)
    }

    function m(e, t) {
        void 0 === t && (t = []);
        var r = function e(t) {
            return 0 <= ["html", "body", "#document"].indexOf(a(t)) ? t.ownerDocument.body : i(t) && p(t) ? t : e(d(t))
        }(e);
        e = "body" === a(r);
        var o = n(r);
        return r = e ? [o].concat(o.visualViewport || [], p(r) ? r : []) : r, t = t.concat(r), e ? t : t.concat(m(d(r)))
    }

    function h(e) {
        if (!i(e) || "fixed" === c(e).position) return null;
        if (e = e.offsetParent) {
            var t = s(e);
            if ("body" === a(e) && "static" === c(e).position && "static" !== c(t).position) return t
        }
        return e
    }

    function g(e) {
        for (var t = n(e), r = h(e); r && 0 <= ["table", "td", "th"].indexOf(a(r)) && "static" === c(r).position;) r = h(r);
        if (r && "body" === a(r) && "static" === c(r).position) return t;
        if (!r) e: {
            for (e = d(e); i(e) && 0 > ["html", "body"].indexOf(a(e));) {
                if ("none" !== (r = c(e)).transform || "none" !== r.perspective || r.willChange && "auto" !== r.willChange) {
                    r = e;
                    break e
                }
                e = e.parentNode
            }
            r = null
        }
        return r || t
    }

    function b(e) {
        var t = new Map,
            n = new Set,
            r = [];
        return e.forEach((function(e) {
            t.set(e.name, e)
        })), e.forEach((function(e) {
            n.has(e.name) || function e(o) {
                n.add(o.name), [].concat(o.requires || [], o.requiresIfExists || []).forEach((function(r) {
                    n.has(r) || (r = t.get(r)) && e(r)
                })), r.push(o)
            }(e)
        })), r
    }

    function v(e) {
        var t;
        return function() {
            return t || (t = new Promise((function(n) {
                Promise.resolve().then((function() {
                    t = void 0, n(e())
                }))
            }))), t
        }
    }

    function y(e) {
        return e.split("-")[0]
    }

    function O(e, t) {
        var n = !(!t.getRootNode || !t.getRootNode().host);
        if (e.contains(t)) return !0;
        if (n)
            do {
                if (t && e.isSameNode(t)) return !0;
                t = t.parentNode || t.host
            } while (t);
        return !1
    }

    function x(e) {
        return Object.assign(Object.assign({}, e), {}, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function w(e, o) {
        if ("viewport" === o) {
            o = n(e);
            var a = s(e);
            o = o.visualViewport;
            var p = a.clientWidth;
            a = a.clientHeight;
            var l = 0,
                u = 0;
            o && (p = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = o.offsetLeft, u = o.offsetTop)), e = x(e = {
                width: p,
                height: a,
                x: l + f(e),
                y: u
            })
        } else i(o) ? ((e = t(o)).top += o.clientTop, e.left += o.clientLeft, e.bottom = e.top + o.clientHeight, e.right = e.left + o.clientWidth, e.width = o.clientWidth, e.height = o.clientHeight, e.x = e.left, e.y = e.top) : (u = s(e), e = s(u), l = r(u), o = u.ownerDocument.body, p = Math.max(e.scrollWidth, e.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = Math.max(e.scrollHeight, e.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), u = -l.scrollLeft + f(u), l = -l.scrollTop, "rtl" === c(o || e).direction && (u += Math.max(e.clientWidth, o ? o.clientWidth : 0) - p), e = x({
            width: p,
            height: a,
            x: u,
            y: l
        }));
        return e
    }

    function j(e, t, n) {
        return t = "clippingParents" === t ? function(e) {
            var t = m(d(e)),
                n = 0 <= ["absolute", "fixed"].indexOf(c(e).position) && i(e) ? g(e) : e;
            return o(n) ? t.filter((function(e) {
                return o(e) && O(e, n) && "body" !== a(e)
            })) : []
        }(e) : [].concat(t), (n = (n = [].concat(t, [n])).reduce((function(t, n) {
            return n = w(e, n), t.top = Math.max(n.top, t.top), t.right = Math.min(n.right, t.right), t.bottom = Math.min(n.bottom, t.bottom), t.left = Math.max(n.left, t.left), t
        }), w(e, n[0]))).width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n
    }

    function M(e) {
        return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
    }

    function E(e) {
        var t = e.reference,
            n = e.element,
            r = (e = e.placement) ? y(e) : null;
        e = e ? e.split("-")[1] : null;
        var o = t.x + t.width / 2 - n.width / 2,
            i = t.y + t.height / 2 - n.height / 2;
        switch (r) {
            case "top":
                o = {
                    x: o,
                    y: t.y - n.height
                };
                break;
            case "bottom":
                o = {
                    x: o,
                    y: t.y + t.height
                };
                break;
            case "right":
                o = {
                    x: t.x + t.width,
                    y: i
                };
                break;
            case "left":
                o = {
                    x: t.x - n.width,
                    y: i
                };
                break;
            default:
                o = {
                    x: t.x,
                    y: t.y
                }
        }
        if (null != (r = r ? M(r) : null)) switch (i = "y" === r ? "height" : "width", e) {
            case "start":
                o[r] = Math.floor(o[r]) - Math.floor(t[i] / 2 - n[i] / 2);
                break;
            case "end":
                o[r] = Math.floor(o[r]) + Math.ceil(t[i] / 2 - n[i] / 2)
        }
        return o
    }

    function D(e) {
        return Object.assign(Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }), e)
    }

    function P(e, t) {
        return t.reduce((function(t, n) {
            return t[n] = e, t
        }), {})
    }

    function k(e, n) {
        void 0 === n && (n = {});
        var r = n;
        n = void 0 === (n = r.placement) ? e.placement : n;
        var i = r.boundary,
            a = void 0 === i ? "clippingParents" : i,
            f = void 0 === (i = r.rootBoundary) ? "viewport" : i;
        i = void 0 === (i = r.elementContext) ? "popper" : i;
        var c = r.altBoundary,
            p = void 0 !== c && c;
        r = D("number" != typeof(r = void 0 === (r = r.padding) ? 0 : r) ? r : P(r, q));
        var l = e.elements.reference;
        c = e.rects.popper, a = j(o(p = e.elements[p ? "popper" === i ? "reference" : "popper" : i]) ? p : p.contextElement || s(e.elements.popper), a, f), p = E({
            reference: f = t(l),
            element: c,
            strategy: "absolute",
            placement: n
        }), c = x(Object.assign(Object.assign({}, c), p)), f = "popper" === i ? c : f;
        var u = {
            top: a.top - f.top + r.top,
            bottom: f.bottom - a.bottom + r.bottom,
            left: a.left - f.left + r.left,
            right: f.right - a.right + r.right
        };
        if (e = e.modifiersData.offset, "popper" === i && e) {
            var d = e[n];
            Object.keys(u).forEach((function(e) {
                var t = 0 <= ["right", "bottom"].indexOf(e) ? 1 : -1,
                    n = 0 <= ["top", "bottom"].indexOf(e) ? "y" : "x";
                u[e] += d[n] * t
            }))
        }
        return u
    }

    function L() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }))
    }

    function B(e) {
        void 0 === e && (e = {});
        var t = e.defaultModifiers,
            n = void 0 === t ? [] : t,
            r = void 0 === (e = e.defaultOptions) ? V : e;
        return function(e, t, i) {
            function a() {
                f.forEach((function(e) {
                    return e()
                })), f = []
            }
            void 0 === i && (i = r);
            var s = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign(Object.assign({}, V), r),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                },
                f = [],
                c = !1,
                p = {
                    state: s,
                    setOptions: function(i) {
                        return a(), s.options = Object.assign(Object.assign(Object.assign({}, r), s.options), i), s.scrollParents = {
                            reference: o(e) ? m(e) : e.contextElement ? m(e.contextElement) : [],
                            popper: m(t)
                        }, i = function(e) {
                            var t = b(e);
                            return N.reduce((function(e, n) {
                                return e.concat(t.filter((function(e) {
                                    return e.phase === n
                                })))
                            }), [])
                        }(function(e) {
                            var t = e.reduce((function(e, t) {
                                var n = e[t.name];
                                return e[t.name] = n ? Object.assign(Object.assign(Object.assign({}, n), t), {}, {
                                    options: Object.assign(Object.assign({}, n.options), t.options),
                                    data: Object.assign(Object.assign({}, n.data), t.data)
                                }) : t, e
                            }), {});
                            return Object.keys(t).map((function(e) {
                                return t[e]
                            }))
                        }([].concat(n, s.options.modifiers))), s.orderedModifiers = i.filter((function(e) {
                            return e.enabled
                        })), s.orderedModifiers.forEach((function(e) {
                            var t = e.name,
                                n = e.options;
                            n = void 0 === n ? {} : n, "function" == typeof(e = e.effect) && (t = e({
                                state: s,
                                name: t,
                                instance: p,
                                options: n
                            }), f.push(t || function() {}))
                        })), p.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var e = s.elements,
                                t = e.reference;
                            if (L(t, e = e.popper))
                                for (s.rects = {
                                        reference: l(t, g(e), "fixed" === s.options.strategy),
                                        popper: u(e)
                                    }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                                        return s.modifiersData[e.name] = Object.assign({}, e.data)
                                    })), t = 0; t < s.orderedModifiers.length; t++)
                                    if (!0 === s.reset) s.reset = !1, t = -1;
                                    else {
                                        var n = s.orderedModifiers[t];
                                        e = n.fn;
                                        var r = n.options;
                                        r = void 0 === r ? {} : r, n = n.name, "function" == typeof e && (s = e({
                                            state: s,
                                            options: r,
                                            name: n,
                                            instance: p
                                        }) || s)
                                    }
                        }
                    },
                    update: v((function() {
                        return new Promise((function(e) {
                            p.forceUpdate(), e(s)
                        }))
                    })),
                    destroy: function() {
                        a(), c = !0
                    }
                };
            return L(e, t) ? (p.setOptions(i).then((function(e) {
                !c && i.onFirstUpdate && i.onFirstUpdate(e)
            })), p) : p
        }
    }

    function W(e) {
        var t, r = e.popper,
            o = e.popperRect,
            i = e.placement,
            a = e.offsets,
            f = e.position,
            c = e.gpuAcceleration,
            p = e.adaptive,
            l = window.devicePixelRatio || 1;
        e = Math.round(a.x * l) / l || 0, l = Math.round(a.y * l) / l || 0;
        var u = a.hasOwnProperty("x");
        a = a.hasOwnProperty("y");
        var d, m = "left",
            h = "top",
            b = window;
        if (p) {
            var v = g(r);
            v === n(r) && (v = s(r)), "top" === i && (h = "bottom", l -= v.clientHeight - o.height, l *= c ? 1 : -1), "left" === i && (m = "right", e -= v.clientWidth - o.width, e *= c ? 1 : -1)
        }
        return r = Object.assign({
            position: f
        }, p && _), c ? Object.assign(Object.assign({}, r), {}, ((d = {})[h] = a ? "0" : "", d[m] = u ? "0" : "", d.transform = 2 > (b.devicePixelRatio || 1) ? "translate(" + e + "px, " + l + "px)" : "translate3d(" + e + "px, " + l + "px, 0)", d)) : Object.assign(Object.assign({}, r), {}, ((t = {})[h] = a ? l + "px" : "", t[m] = u ? e + "px" : "", t.transform = "", t))
    }

    function A(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return U[e]
        }))
    }

    function H(e) {
        return e.replace(/start|end/g, (function(e) {
            return z[e]
        }))
    }

    function T(e, t, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        }
    }

    function R(e) {
        return ["top", "right", "bottom", "left"].some((function(t) {
            return 0 <= e[t]
        }))
    }
    var q = ["top", "bottom", "right", "left"],
        C = q.reduce((function(e, t) {
            return e.concat([t + "-start", t + "-end"])
        }), []),
        S = [].concat(q, ["auto"]).reduce((function(e, t) {
            return e.concat([t, t + "-start", t + "-end"])
        }), []),
        N = "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(" "),
        V = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        },
        I = {
            passive: !0
        },
        _ = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        },
        U = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        },
        z = {
            start: "end",
            end: "start"
        },
        F = [{
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var t = e.state,
                    r = e.instance,
                    o = (e = e.options).scroll,
                    i = void 0 === o || o,
                    a = void 0 === (e = e.resize) || e,
                    s = n(t.elements.popper),
                    f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return i && f.forEach((function(e) {
                        e.addEventListener("scroll", r.update, I)
                    })), a && s.addEventListener("resize", r.update, I),
                    function() {
                        i && f.forEach((function(e) {
                            e.removeEventListener("scroll", r.update, I)
                        })), a && s.removeEventListener("resize", r.update, I)
                    }
            },
            data: {}
        }, {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state;
                t.modifiersData[e.name] = E({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            },
            data: {}
        }, {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                e = void 0 === (e = n.gpuAcceleration) || e, n = void 0 === (n = n.adaptive) || n, e = {
                    placement: y(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: e
                }, null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign(Object.assign({}, t.styles.popper), W(Object.assign(Object.assign({}, e), {}, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: n
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign(Object.assign({}, t.styles.arrow), W(Object.assign(Object.assign({}, e), {}, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1
                })))), t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
                    "data-popper-placement": t.placement
                })
            },
            data: {}
        }, {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function(e) {
                    var n = t.styles[e] || {},
                        r = t.attributes[e] || {},
                        o = t.elements[e];
                    i(o) && a(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function(e) {
                        var t = r[e];
                        !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                    })))
                }))
            },
            effect: function(e) {
                var t = e.state,
                    n = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0"
                        },
                        arrow: {
                            position: "absolute"
                        },
                        reference: {}
                    };
                return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                    function() {
                        Object.keys(t.elements).forEach((function(e) {
                            var r = t.elements[e],
                                o = t.attributes[e] || {};
                            e = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                                return e[t] = "", e
                            }), {}), i(r) && a(r) && (Object.assign(r.style, e), Object.keys(o).forEach((function(e) {
                                r.removeAttribute(e)
                            })))
                        }))
                    }
            },
            requires: ["computeStyles"]
        }, {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var t = e.state,
                    n = e.name,
                    r = void 0 === (e = e.options.offset) ? [0, 0] : e,
                    o = (e = S.reduce((function(e, n) {
                        var o = t.rects,
                            i = y(n),
                            a = 0 <= ["left", "top"].indexOf(i) ? -1 : 1,
                            s = "function" == typeof r ? r(Object.assign(Object.assign({}, o), {}, {
                                placement: n
                            })) : r;
                        return o = (o = s[0]) || 0, s = ((s = s[1]) || 0) * a, i = 0 <= ["left", "right"].indexOf(i) ? {
                            x: s,
                            y: o
                        } : {
                            x: o,
                            y: s
                        }, e[n] = i, e
                    }), {}))[t.placement],
                    i = o.x;
                o = o.y, null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += o), t.modifiersData[n] = e
            }
        }, {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                if (e = e.name, !t.modifiersData[e]._skip) {
                    var r = n.mainAxis;
                    r = void 0 === r || r;
                    var o = n.altAxis;
                    o = void 0 === o || o;
                    var i = n.fallbackPlacements,
                        a = n.padding,
                        s = n.boundary,
                        f = n.rootBoundary,
                        c = n.altBoundary,
                        p = n.flipVariations,
                        l = void 0 === p || p,
                        u = n.allowedAutoPlacements;
                    p = y(n = t.options.placement), i = i || (p !== n && l ? function(e) {
                        if ("auto" === y(e)) return [];
                        var t = A(e);
                        return [H(e), t, H(t)]
                    }(n) : [A(n)]);
                    var d = [n].concat(i).reduce((function(e, n) {
                        return e.concat("auto" === y(n) ? function(e, t) {
                            void 0 === t && (t = {});
                            var n = t.boundary,
                                r = t.rootBoundary,
                                o = t.padding,
                                i = t.flipVariations,
                                a = t.allowedAutoPlacements,
                                s = void 0 === a ? S : a,
                                f = t.placement.split("-")[1];
                            0 === (i = (t = f ? i ? C : C.filter((function(e) {
                                return e.split("-")[1] === f
                            })) : q).filter((function(e) {
                                return 0 <= s.indexOf(e)
                            }))).length && (i = t);
                            var c = i.reduce((function(t, i) {
                                return t[i] = k(e, {
                                    placement: i,
                                    boundary: n,
                                    rootBoundary: r,
                                    padding: o
                                })[y(i)], t
                            }), {});
                            return Object.keys(c).sort((function(e, t) {
                                return c[e] - c[t]
                            }))
                        }(t, {
                            placement: n,
                            boundary: s,
                            rootBoundary: f,
                            padding: a,
                            flipVariations: l,
                            allowedAutoPlacements: u
                        }) : n)
                    }), []);
                    n = t.rects.reference, i = t.rects.popper;
                    var m = new Map;
                    p = !0;
                    for (var h = d[0], g = 0; g < d.length; g++) {
                        var b = d[g],
                            v = y(b),
                            O = "start" === b.split("-")[1],
                            x = 0 <= ["top", "bottom"].indexOf(v),
                            w = x ? "width" : "height",
                            j = k(t, {
                                placement: b,
                                boundary: s,
                                rootBoundary: f,
                                altBoundary: c,
                                padding: a
                            });
                        if (O = x ? O ? "right" : "left" : O ? "bottom" : "top", n[w] > i[w] && (O = A(O)), w = A(O), x = [], r && x.push(0 >= j[v]), o && x.push(0 >= j[O], 0 >= j[w]), x.every((function(e) {
                                return e
                            }))) {
                            h = b, p = !1;
                            break
                        }
                        m.set(b, x)
                    }
                    if (p)
                        for (r = function(e) {
                                var t = d.find((function(t) {
                                    if (t = m.get(t)) return t.slice(0, e).every((function(e) {
                                        return e
                                    }))
                                }));
                                if (t) return h = t, "break"
                            }, o = l ? 3 : 1; 0 < o && "break" !== r(o); o--);
                    t.placement !== h && (t.modifiersData[e]._skip = !0, t.placement = h, t.reset = !0)
                }
            },
            requiresIfExists: ["offset"],
            data: {
                _skip: !1
            }
        }, {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.mainAxis,
                    o = void 0 === r || r;
                r = void 0 !== (r = n.altAxis) && r;
                var i = n.tether;
                i = void 0 === i || i;
                var a = n.tetherOffset,
                    s = void 0 === a ? 0 : a;
                n = k(t, {
                    boundary: n.boundary,
                    rootBoundary: n.rootBoundary,
                    padding: n.padding,
                    altBoundary: n.altBoundary
                }), a = y(t.placement);
                var f = t.placement.split("-")[1],
                    c = !f,
                    p = M(a);
                a = "x" === p ? "y" : "x";
                var l = t.modifiersData.popperOffsets,
                    d = t.rects.reference,
                    m = t.rects.popper,
                    h = "function" == typeof s ? s(Object.assign(Object.assign({}, t.rects), {}, {
                        placement: t.placement
                    })) : s;
                if (s = {
                        x: 0,
                        y: 0
                    }, l) {
                    if (o) {
                        var b = "y" === p ? "top" : "left",
                            v = "y" === p ? "bottom" : "right",
                            O = "y" === p ? "height" : "width";
                        o = l[p];
                        var x = l[p] + n[b],
                            w = l[p] - n[v],
                            j = i ? -m[O] / 2 : 0,
                            E = "start" === f ? d[O] : m[O];
                        f = "start" === f ? -m[O] : -d[O], m = t.elements.arrow, m = i && m ? u(m) : {
                            width: 0,
                            height: 0
                        };
                        var D = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        };
                        b = D[b], v = D[v], m = Math.max(0, Math.min(d[O], m[O])), E = c ? d[O] / 2 - j - m - b - h : E - m - b - h, c = c ? -d[O] / 2 + j + m + v + h : f + m + v + h, h = t.elements.arrow && g(t.elements.arrow), d = t.modifiersData.offset ? t.modifiersData.offset[t.placement][p] : 0, h = l[p] + E - d - (h ? "y" === p ? h.clientTop || 0 : h.clientLeft || 0 : 0), c = l[p] + c - d, i = Math.max(i ? Math.min(x, h) : x, Math.min(o, i ? Math.max(w, c) : w)), l[p] = i, s[p] = i - o
                    }
                    r && (r = l[a], i = Math.max(r + n["x" === p ? "top" : "left"], Math.min(r, r - n["x" === p ? "bottom" : "right"])), l[a] = i, s[a] = i - r), t.modifiersData[e] = s
                }
            },
            requiresIfExists: ["offset"]
        }, {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, n = e.state;
                e = e.name;
                var r = n.elements.arrow,
                    o = n.modifiersData.popperOffsets,
                    i = y(n.placement),
                    a = M(i);
                if (i = 0 <= ["left", "right"].indexOf(i) ? "height" : "width", r && o) {
                    var s = n.modifiersData[e + "#persistent"].padding,
                        f = u(r),
                        c = "y" === a ? "top" : "left",
                        p = "y" === a ? "bottom" : "right",
                        l = n.rects.reference[i] + n.rects.reference[a] - o[a] - n.rects.popper[i];
                    o = o[a] - n.rects.reference[a], l = (r = (r = g(r)) ? "y" === a ? r.clientHeight || 0 : r.clientWidth || 0 : 0) / 2 - f[i] / 2 + (l / 2 - o / 2), i = Math.max(s[c], Math.min(l, r - f[i] - s[p])), n.modifiersData[e] = ((t = {})[a] = i, t.centerOffset = i - l, t)
                }
            },
            effect: function(e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.element;
                if (r = void 0 === r ? "[data-popper-arrow]" : r, n = void 0 === (n = n.padding) ? 0 : n, null != r) {
                    if ("string" == typeof r && !(r = t.elements.popper.querySelector(r))) return;
                    O(t.elements.popper, r) && (t.elements.arrow = r, t.modifiersData[e + "#persistent"] = {
                        padding: D("number" != typeof n ? n : P(n, q))
                    })
                }
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        }, {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state;
                e = e.name;
                var n = t.rects.reference,
                    r = t.rects.popper,
                    o = t.modifiersData.preventOverflow,
                    i = k(t, {
                        elementContext: "reference"
                    }),
                    a = k(t, {
                        altBoundary: !0
                    });
                n = T(i, n), r = T(a, r, o), o = R(n), a = R(r), t.modifiersData[e] = {
                    referenceClippingOffsets: n,
                    popperEscapeOffsets: r,
                    isReferenceHidden: o,
                    hasPopperEscaped: a
                }, t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
                    "data-popper-reference-hidden": o,
                    "data-popper-escaped": a
                })
            }
        }],
        X = B({
            defaultModifiers: F
        });
    e.createPopper = X, e.defaultModifiers = F, e.detectOverflow = k, e.popperGenerator = B, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}));;

window.mrp_open_new_window = function(url, width, height, name) {

    function optimalWindowHeight(desired) {
        if (desired && desired < screen.availHeight) {
            return desired;
        }

        var h = 500;
        if (screen.availHeight > 600) {
            h = 700;
        }
        if (screen.availHeight > 800) {
            h = 800;
        }
        return h;
    }

    if (!height) {
        height = optimalWindowHeight();
    }

    var left = parseInt((screen.availWidth / 2) - (width / 2));
    var top = parseInt((screen.availHeight / 2) - (height / 2));

    if (!name) {
        name = "" + parseInt((Math.random() * 100000));
    }
    var w = window.open(url, name, "width=" + width + ",height=" + height +
        ",scrollbars=1,location=1,left=" + left + ",top=" + top + ",screenX=" + left + ",screenY=" + top);

    if (w == null) {
        alert("Please enable popups in your browser");
    } else {
        w.focus();
    }

    return w;
};

// DOMParser patch for IOS Safari
(function(DOMParser) {
    "use strict";

    var proto = DOMParser.prototype,
        nativeParse = proto.parseFromString;

    // Firefox/Opera/IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        if ((new DOMParser()).parseFromString("", "text/html")) {
            // text/html parsing is natively supported
            return;
        }
    } catch (ex) {}

    proto.parseFromString = function(markup, type) {
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
            var doc = document.implementation.createHTMLDocument("");
            if (markup.toLowerCase().indexOf('<!doctype') > -1) {
                doc.documentElement.innerHTML = markup;
            } else {
                doc.body.innerHTML = markup;
            }
            return doc;
        } else {
            return nativeParse.apply(this, arguments);
        }
    };
}(DOMParser));

function get_if_exist(obj) {
    if (!obj) {
        return undefined;
    }
    return arguments.length == 1 || (obj[arguments[1]] && get_if_exist.apply(this, [obj[arguments[1]]].concat([].slice.call(arguments, 2))));
}

const _G = {
    reinitHandlers: [],
    isMobile: () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
}

;
(function() {
    _G.visibilityService = (function() {

        const options = {
            threshold: [0, 0.1, 0.2, 0.4, 0.6, 0.8]
        }

        const observer = new IntersectionObserver(entries => {
            (entries || []).forEach(entry => {
                if (typeof entry.target.__visibility === 'function') {

                    const isLikelyMobile = window.innerWidth < window.innerHeight
                    const defaultVisibilityRatio = isLikelyMobile ? 0.01 : 0.2;

                    const ratio = getComputedStyle(entry.target)
                        .getPropertyValue('--visibility-ratio') || defaultVisibilityRatio;

                    if (entry.intersectionRatio >= ratio /* && !document.querySelector('html').classList.contains('editing') */ ) {
                        entry.target.__visibility(entry)
                    }
                }
            })
        }, options)

        const observe = (el, callback) => {
            el.__visibility = callback
            observer.observe(el)
        }

        const unobserve = (el) => {
            observer.unobserve(el)
        }

        return {
            observe,
            unobserve,
        }
    })()
})()


function _initBlocks() {
    for (let m of (window.block_code_modules || [])) {
        try {
            m && m.init && m.init(m.id, m)
        } catch (err) {
            console.log('Error initing module', m.id, err)
        }
    }
}

function _destroyBlocks() {
    for (let m of (window.block_code_modules || [])) {
        try {
            m && m.destroy && m.destroy()
        } catch (err) {
            console.log('Error destroying module', m.id, err)
        }
    }
}

_G.parallaxService = (function() {

    const BASE_SPEED = 0.7

    let stopped = false
    const elements = []
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target._parallaxVisible = entry.isIntersecting
            recalc(entry.target)
        })
    }, {
        // blank options
    })

    window.addEventListener('scroll', (ev) => {
        requestAnimationFrame(() => {
            recalcAll()
        })

    }, {
        passive: true
    })

    const calcShift = (elem) => {
        /*
         * calculates a number -1..0..1 where 0 is dead center of the element in viewport
         * -1 is when the element touches with its top the top edge of the viewport
         * 1 is when the element touches with its bottom the bottom edge of the viewport
         *
         * */
        const rect = elem.parentElement.getBoundingClientRect()
        const bgRect = elem.getBoundingClientRect()
        const elemFreeHeight = window.innerHeight - rect.height
        const bgFreeHeight = window.innerHeight - bgRect.height
        const shapeCenterY = rect.top + (rect.height / 2)
        const viewportCenterY = window.innerHeight / 2
        const delta = viewportCenterY - shapeCenterY

        // adjusting speed is necessary for containers that are shorter than
        // viewport height and have bg element with some spare space top and
        // bottom to allow for differential scroll speeds. If these conditions
        // are not met, we fall back to the base speed. Otherwise, we calculate the
        // ideal speed based on the amount of spare image space and size of
        // container. The idea is that the top of bg image reach the top
        // of the viewport at exactly the same time as the container to avoid exposing
        // any areas uncovered by the image.
        const shouldAdjustSpeed = bgRect.height < window.innerHeight &&
            rect.height < window.innerHeight &&
            bgRect.height >= rect.height

        const baseSpeed = shouldAdjustSpeed ?
            bgFreeHeight / elemFreeHeight :
            BASE_SPEED

        const translateValue = (1 - baseSpeed) * delta

        // console.log( delta, acceleration, adjustedRatio,  translateValue )

        return translateValue.toFixed(4)
    }

    const recalcAll = () => {
        if (stopped) {
            return
        }
        elements.forEach(elem => {
            recalc(elem)
        })
    }

    const recalc = (elem) => {
        if (stopped) {
            return
        }
        if (elem._parallaxVisible) {
            elem.style.transform = 'translate(0,' + calcShift(elem) + 'px)' +
                (elem.classList.contains('blur') ? ' scale(1.1)' : '')
        }
    }

    const add = (elem) => {
        if (!elem) {
            return
        }
        elem._parallaxVisible = false
        elements.push(elem)
        observer.observe(elem)
        recalc(elem)
    }

    const remove = (elem) => {
        const index = elements.indexOf(elem)
        if (index !== -1) {
            elements.splice(index, 1)
        }
        observer.unobserve(elem)
    }

    const setStopped = (flag) => {
        stopped = flag
    }

    const refresh = () => {
        recalcAll()
    }

    const cleanup = () => {
        // cleanup potentially stale elements, i.e. detached from DOM
        // may happen after a block was re-inserted in the editor
        elements.slice().filter(elem => {
            if (!document.body.contains(elem)) {
                remove(elem)
            }
        })
    }

    return {
        setStopped,
        refresh,
        add,
        remove,
        cleanup,
    }
})()

_G.fxService = (function() {

    let queue = []
    let revealLaunched = null

    function cleanupFastScrolled() {
        // const snapshot = queue.map( el => {
        //     let rect = el.getBoundingClientRect()
        //     let top = rect.top
        //     let bottom = rect.bottom
        //     return {
        //         el,
        //         top,
        //         bottom,
        //         scrolledOutOfView: bottom < 0,
        //     }
        // })
        // console.log( 'REVEAL', snapshot )
        while (queue.length > 0) {
            let el = queue.at(0)
            if (!el) {
                break;
            }
            let rect = el.getBoundingClientRect()
            if (rect.bottom < 0) {
                queue.shift().classList.remove('fx')
            } else {
                break;
            }
        }
    }

    function revealStaggered() {
        if (revealLaunched !== null) {
            return
        }
        if (queue.length === 0) {
            return
        }
        revealLaunched = setInterval(() => {
            if (queue.length === 0) {
                clearInterval(revealLaunched)
                revealLaunched = null
                return
            }
            cleanupFastScrolled()
            queue.shift().classList.remove('fx')
        }, 100)
    }

    function initElem(el) {
        if (!el || el.__fx_inited) {
            return
        }

        if (el.closest('.managed-fx')) {
            return
        }

        el.__fx_inited = true
        _G.visibilityService.observe(el, result => {

            if (!el.classList.contains('fx')) {
                return // probably already revealed
            }
            queue.push(el)
            revealStaggered()
            _G.visibilityService.unobserve(el)
        })
    }

    function init() {
        document.querySelectorAll('.fx').forEach(initElem)
    }

    return {
        init,
        initElem
    }
})()


document.addEventListener('DOMContentLoaded', () => {

    if (window.customOnLoads) {
        window.customOnLoads.forEach(f => {
            try {
                if (typeof f === 'function') {
                    f()
                }
            } catch (ex) {
                console.error('ERROR: failed to run customOnLoad: ', ex);
            }
        })
    }

    function initVideo(v) {
        if (v.__videoInited) {
            return
        }
        v.__videoInited = true
        v.addEventListener('pause', () => {
            v.__paused = true
        })
        _G.visibilityService.observe(v, result => {
            if (result.isIntersecting) {
                if (v.__paused) {
                    return
                }
                v.muted = true
                v.play()
                if (v.getAttribute("data-speed")) {
                    v.playbackRate = parseFloat(v.getAttribute("data-speed"))
                }
                // if( document.querySelector('html').classList.contains('editing') ) {
                //v.pause()
                // }
            }
        })
    }

    _G.fxService.init()
    _G.reinitHandlers.push(id => {
        document.getElementById(id).querySelectorAll('.fx').forEach(el => {
            _G.fxService.initElem(el)
        })
        document.querySelectorAll('video[data-autoplay="true"]').forEach(initVideo)
    })


    document.querySelectorAll('.with-scroll-parallax').forEach(elem => {
        _G.parallaxService.add(elem)
    })
    document.querySelectorAll('.with-smart-bg.with-bg-video video').forEach((v => {
        v.muted = true
        v.play()
    }))

    document.querySelectorAll('video.video[data-autoplay="true"]').forEach(initVideo)

    document.addEventListener('editor.on', () => {})

    _G.quickMessage = (msg, options = {}) => {
        const m = document.createElement('div')
        m.classList.add('quick-message')
        if (options.error) {
            m.classList.add('error')
        }
        m.style.opacity = '0'
        m.innerText = msg
        document.body.appendChild(m)
        setTimeout(() => {
            m.style.opacity = '1'
        }, 10)
        setTimeout(() => {
            m.style.opacity = '0'
            m.addEventListener('transitionend', () => {
                m.remove()
            }, {
                once: true
            })
        }, 3000)
        m.addEventListener('click', ev => {
            m.style.opacity = '0'
            m.addEventListener('transitionend', () => {
                m.remove()
            }, {
                once: true
            })
        }, {
            once: true
        })
    }

    _G.applyRipple = function(event, button) {

        const circle = document.createElement("span")
        const diameter = Math.max(button.clientWidth, button.clientHeight)
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`
        const rect = button.getBoundingClientRect()
        circle.style.left = `${event.clientX - (rect.left + radius)}px`
        circle.style.top = `${event.clientY - (rect.top + radius)}px`
        circle.classList.add("ripple")

        const ripple = button.getElementsByClassName("ripple")[0]
        if (ripple) {
            ripple.remove()
        }

        button.appendChild(circle)

        circle.addEventListener('animationend', () => {
            circle.remove()
        }, {
            once: true
        })
    }

    _G.createFragment = htmlStr => {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }

    function scrollToBlock(id) {
        console.log('will scroll to ', id)
        const elem = document.querySelector(id)
        if (elem) {
            elem.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            })
            history.pushState({}, '', id)
            // window.location.hash = id
        }
    }

    document.addEventListener('click', event => {
        if (event.target && (event.target.matches('.block-layout .button') || event.target.matches('.block-layout .button *'))) {
            const button = event.target.closest('.button')
            if (button) {
                _G.applyRipple(event, button)
                if (button.tagName === 'BUTTON') {
                    const form = button.closest('form')
                    if (form && form.getAttribute('action') &&
                        form.getAttribute('action').indexOf('#bid_') === 0) {
                        event.stopPropagation()
                        event.preventDefault()
                        scrollToBlock(form.getAttribute('action'))
                    }
                }
            }
        }
        if (event.target && (event.target.matches('.block-layout a') || event.target.matches('.block-layout a *'))) {
            const link = event.target.closest('a')
            if (link && link.getAttribute('href') && link.getAttribute('href').indexOf('#bid_') === 0) {
                event.stopPropagation()
                event.preventDefault()
                scrollToBlock(link.getAttribute('href'))
            }
        }
    })
})

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function openTranslate(toLang) {
    toLang = toLang || "en";
    window.open("https://" + window.location.hostname.replaceAll("-", "--")
        .replaceAll(".", "-") + ".translate.goog" + window.location.pathname +
        "?_x_tr_sl=auto&_x_tr_tl=" + toLang + "&_x_tr_hl=en&_x_tr_pto=wapp' target='_blank'>Translate Page")
}

function mrp_basic_auth_logout(safelocation) {
    const c = '';
    var a, b = "You should be logged out now.";
    try {
        a = document.execCommand("ClearAuthenticationCache", 'false')
    } catch (d) {}
    a || ((a = window.XMLHttpRequest ? new window.XMLHttpRequest : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : void 0) ?
        (a.open("HEAD", c || location.href, !0, "logout", (new Date).getTime().toString()), a.send(""), a = 1) : a = void 0);
    a || (b = "Your browser is too old or too weird to support log out functionality. Close all windows and restart the browser.");
    // alert(b)
    document.body.innerHTML = '';
    setTimeout(() => {
        const url = window.location.href;
        const fake = btoa('logout:logout')
        // history.replaceState({}, '', url + '?t' + Date.now() );
        window.location = safelocation || 'https://private-office.myrealpage.com'
        // fetch( url, {
        //     headers: {
        //         'Authorization': 'Basic fake'
        //     }
        // })
        // .finally( () => {
        //
        // });
    }, 1000)
}

/* ==== INCLUDE: /js/responsive-containers-mod.js ==== */

/*
MIT Licensed.
Copyright (c) 2011 Andy Hume (http://andyhume.net, andyhume@gmail.com).
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function(win) {

    if (window.responsiveContainersLoaded) {
        return;
    }

    window.responsiveContainersLoaded = true;

    var doc = win.document,
        els = [],
        check_data_attributes = true,
        loaded = false;


    if (window.mrp_v2_ready) {
        window.mrp_v2_ready(function() {
            _gmrp.$(document).on("mrp.responsify.containers mrp.popup.close",
                function(e) {
                    //console.log( "mrp.ajax-idx.show" );
                    for (var i = 0; i < els.length; ++i) {
                        delete els[i].cq_rules;
                    }
                    els = [];
                    //var b = new Date().getTime();
                    findContainerQueries();
                    applyRules();
                    //console.log( ( new Date().getTime() - b  ) + "ms" );
                }
            );
        });
    }

    function add(elements, query, value, class_name) {
        var split_value = /([0-9]*)(px|em)/.exec(value);
        for (var i = 0, j = elements.length; i < j; ++i) {
            var el = elements[i];
            el.cq_rules = el.cq_rules || [];
            el.cq_rules.push([null, query, split_value[1], split_value[2], class_name]);
            els.push(el);
        }
        if (loaded) { // if we're not 'loaded' yet, domLoaded will run applyRules() for us.
            applyRules();
        }
    }

    function ignoreDataAttributes() {
        check_data_attributes = false;
    }

    function findContainerQueries() {
        if (check_data_attributes) {
            // Find data-squery attributes.
            var nodes = [];
            if (doc.querySelectorAll) {
                var nodes = doc.querySelectorAll("[data-squery]");
            } else {
                // If no query selectors.
                var e = doc.getElementsByTagName("*");
                for (var i = 0, j = e.length; i < j; ++i) {
                    if (e[i].getAttribute("data-squery")) {
                        nodes.push(e[i]);
                    }
                }
            }
            // Parse the data-squery attribute and store resulting rules on the element.
            for (var i = 0, j = nodes.length; i < j; ++i) {
                var el = nodes[i];
                if (el.cq_rules && el.cq_rules.length > 0) {
                    continue;
                }
                var cq_rules = [];
                var raw_rules = el.getAttribute("data-squery").split(" ");
                for (var k = 0, l = raw_rules.length; k < l; ++k) {
                    var rule = /(.*):([0-9]*)(px|em)=(.*)/.exec(raw_rules[k]);
                    if (rule) {
                        cq_rules.push(rule);
                    }
                }
                el.cq_rules = el.cq_rules || [];
                el.cq_rules = el.cq_rules.concat(cq_rules);
                els.push(el);
            }
        }
    }

    function applyRules() {
        // For each element, apply the rules to the class name.
        console.log("els:", els.length);
        for (var i = 0, j = els.length; i < j; ++i) {
            el = els[i];
            console.log("els.cq_rules:", el.cq_rules.length);
            for (var k = 0, l = el.cq_rules.length; k < l; ++k) {
                var rule = el.cq_rules[k];

                // Get a target width value in pixels.
                var width = parseInt(rule[2]);
                if (rule[3] === "em") {
                    width = emsToPixels(parseFloat(rule[2]), el);
                }

                // Calculate the width of the target without the class added.
                var defaultWidth = getDefaultWidth(el, rule[4]);
                // Test current width against target width and add/remove class values.
                if (compareFunction[rule[1]](defaultWidth, width)) {
                    window._gmrp && _gmrp.$ && _gmrp.$(document).trigger("mrp.resp.container.change", "+" + rule[4]);
                    if (el.className.indexOf(rule[4]) < 0) {
                        el.className += " " + rule[4];
                    }
                } else {
                    window._gmrp && _gmrp.$ && _gmrp.$(document).trigger("mrp.resp.container.change", "-" + rule[4]);
                    var class_name = el.className.replace(new RegExp('(^| )' + rule[4] + '( |$)'), '$1');
                    class_name = class_name.replace(/ $/, '');
                    el.className = class_name;
                }
            }
        }
    }

    var compareFunction = {
        "min-width": function(a, b) {
            return a > b;
        },
        "max-width": function(a, b) {
            return a < b;
        }
    }

    function contentReady() {
        if (loaded) {
            return;
        }
        loaded = true;
        findContainerQueries();
        applyRules();
        if (win.addEventListener) {
            win.addEventListener("resize", applyRules, false);

        }
        // Allow for resizing text after the page has loaded.
        var current_em = emsToPixels(1, doc.body);
        win.setInterval(function() {
            var new_em = emsToPixels(1, doc.body);
            if (new_em !== current_em) {
                applyRules();
                current_em = new_em;
            }
        }, 2000);
    }

    function memoize(f) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            f.memoize = f.memoize || {};
            return (args in f.memoize) ? f.memoize[args] : f.memoize[args] = f.apply(this, args);
        };
    }

    var emsToPixels = memoize(function(em, scope) {
        var test = doc.createElement("div");
        test.style.fontSize = "1em";
        test.style.margin = "0";
        test.style.padding = "0";
        test.style.border = "none";
        test.style.width = "1em";
        scope.appendChild(test);
        var val = test.offsetWidth;
        scope.removeChild(test);
        return Math.round(val * em);
    });

    var getDefaultWidth = function(el, class_name) {
        if (true) {
            // we don't need to be fancy, simple width is ok, all the resp containers are flexible
            return el.offsetWidth;
        }
        //console.log( "hit width", el );
        var test = el.cloneNode(true);
        test.className = (" " + test.className + " ").replace(" " + class_name + " ", " ");
        test.style.height = 0;
        test.style.visibility = "hidden";
        test.style.overflow = "hidden";
        test.style.clear = "both";
        var parent = el.parentNode;
        parent.insertBefore(test, el);
        var val = test.offsetWidth;
        parent.removeChild(test);
        return val;
    }

    if (window.addEventListener) {
        console.log("installing mrpRescanResponsifyContainers listener");
        window.addEventListener("mrpRescanResponsifyContainers", function() {
            console.log("mrpRescanResponsifyContainers");
            findContainerQueries();
            applyRules();
        }, false);
    } else if (window.attachEvent) {
        window.attachEvent("mrpRescanResponsifyContainers", function() {
            findContainerQueries();
            applyRules();
        });
    }

    if (/loaded|complete|interactive/.test(doc.readyState)) {
        contentReady();
    } else if (doc.addEventListener) {
        doc.addEventListener("DOMContentLoaded", contentReady, false);
        // or
        win.addEventListener("load", contentReady, false);
    }
    // If old IE
    else if (doc.attachEvent) {
        doc.attachEvent("onreadystatechange", contentReady);
        // or
        win.attachEvent("onload", contentReady);
    }


    win["SelectorQueries"] = {
        "add": add,
        "ignoreDataAttributes": ignoreDataAttributes
    }

})(this);



/* ==== INCLUDE: /js/blocks/sticky-menu.js ==== */


document.addEventListener('DOMContentLoaded', function() {

    function initBlock(id) {
        const block = document.getElementById(id)
        if (block.querySelector('.sticky-menu')) {
            init(block.querySelector('.sticky-menu'))
        }
    }

    function isMenuVisible(el) {
        var rect = el.getBoundingClientRect();

        if (rect.top < 0) {
            return false;
        } else {
            return true;
        }
    }

    function floatMenu(el) {
        if (el.querySelector('.sticky').classList.contains('floated')) {
            return
        }
        if (document.querySelector('html').classList.contains('editing')) {
            return unfloatMenu(el)
        }
        el.querySelector('.sticky').style.opacity = '1'
        el.querySelector('.sticky').classList.add('floating', 'floated', 'elevation3')
        el.classList.add('sticky-on')
    }

    function unfloatMenu(el) {
        if (!el.querySelector('.sticky').classList.contains('floated')) {
            return
        }
        el.querySelector('.sticky').classList.remove('floating', 'floated', 'elevation3')
        el.classList.remove('sticky-on')
    }

    function init(el) {
        if (!el || !el.querySelector('.sticky')) {
            return
        }

        window.addEventListener('scroll', function() {
            isMenuVisible(el) ? unfloatMenu(el) : floatMenu(el)
        }, {
            passive: true
        })


        if (!isMenuVisible(el)) {
            floatMenu(el)
        }

        document.addEventListener('editor.on', function() {
            unfloatMenu(el)
        })
        document.addEventListener('editor.off', function() {
            if (!isMenuVisible(el)) {
                floatMenu(el)
            }
        })
    }

    document.querySelectorAll('.sticky-menu').forEach(function(el) {
        init(el)
    })

    _G.reinitHandlers.push(initBlock)
})


/* ==== INCLUDE: /js/blocks/hmenu.js ==== */

document.addEventListener('DOMContentLoaded', ev => {

        document.body.addEventListener('click', ev => {

            if (document.querySelector('html').classList.contains('editing')) {
                return
            }
            if (!ev.target.matches('.hmenu li.has-submenu, .hmenu li.has-submenu > *')) {
                return
            }
            const el = ev.target.closest('li')
            ev.preventDefault()
            ev.stopPropagation()

            document.querySelectorAll('.hmenu li.open').forEach(open => {
                if (open.contains(el)) {
                    return
                }
                open.classList.remove('open')
                open.classList.remove('visible')
            })
            if (el.classList.contains('open')) {
                // toggle
                el.classList.remove('open');
                el.classList.remove('visible');
                return;
            }
            // open -> does display: block which acquires dimension for popper
            el.classList.add('open')
            setTimeout(() => {
                // then we fade it in
                el.classList.add('visible')
            }, 100)

            if (el.__popper) {
                el.__popper.update()
                return
            }

            console.log('placement', el.closest('ul').classList.contains('mrp-menu-level-0') ? 'bottom-start' : 'right-start')

            el.__popper = Popper.createPopper(el, el.querySelector('ul'), {
                placement: el.closest('ul').classList.contains('mrp-menu-level-0') ? 'bottom-start' : 'right-start',
            })
        })

        document.body.addEventListener('keydown', ev => {
            if (ev.key === 'Enter') {
                if (!ev.target.closest('li.has-submenu')) {
                    return
                }
                ev.stopPropagation()
                ev.preventDefault()
                ev.target.closest('li.has-submenu').click()
            } else if (ev.key === 'Escape') {
                document.querySelectorAll('.hmenu li.open').forEach(el => {
                    el.classList.remove('open')
                    el.classList.remove('visible')
                })
            }
        })

        document.body.addEventListener('click', ev => {
            if (ev.target.closest('li.has-submenu')) {
                return
            }
            document.querySelectorAll('.hmenu li.open').forEach(el => {
                el.classList.remove('open')
                el.classList.remove('visible')
            })
        })

        document.querySelectorAll('.hmenu').forEach(menu => {
            menu.querySelectorAll('.hmenu li.has-submenu').forEach(item => {
                item.addEventListener('click', ev => {

                })

            })
        })
    })


    /* ==== INCLUDE: /js/blocks/vmenu.js ==== */

    /*!
     * Mmenu Light
     * mmenujs.com/mmenu-light
     *
     * Copyright (c) Fred Heusschen
     * www.frebsite.nl
     *
     * License: CC-BY-4.0
     * http://creativecommons.org/licenses/by/4.0/
     */

    ! function(t) {
        var e = {};

        function n(i) {
            if (e[i]) return e[i].exports;
            var s = e[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(s.exports, s, s.exports, n), s.l = !0, s.exports
        }
        n.m = t, n.c = e, n.d = function(t, e, i) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: i
            })
        }, n.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function(t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var s in t) n.d(i, s, function(e) {
                    return t[e]
                }.bind(null, s));
            return i
        }, n.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "", n(n.s = 0)
    }([function(t, e, n) {
        "use strict";
        n.r(e);
        var i = function() {
                function t(t) {
                    var e = this;
                    this.listener = function(t) {
                        (t.matches ? e.matchFns : e.unmatchFns).forEach((function(t) {
                            t()
                        }))
                    }, this.toggler = window.matchMedia(t), this.toggler.addListener(this.listener), this.matchFns = [], this.unmatchFns = []
                }
                return t.prototype.add = function(t, e) {
                    this.matchFns.push(t), this.unmatchFns.push(e), (this.toggler.matches ? t : e)()
                }, t
            }(),
            s = function(t) {
                return Array.prototype.slice.call(t)
            },
            o = function(t, e) {
                return s((e || document).querySelectorAll(t))
            },
            r = ("ontouchstart" in window || navigator.msMaxTouchPoints, navigator.userAgent.indexOf("MSIE") > -1 || navigator.appVersion.indexOf("Trident/") > -1),
            a = "mm-spn",
            c = function() {
                function t(t, e, n, i, s) {
                    this.node = t, this.title = e, this.slidingSubmenus = i, this.selectedClass = n, this.node.classList.add(a), r && (this.slidingSubmenus = !1), this.node.classList.add(a + "--" + s), this.node.classList.add(a + "--" + (this.slidingSubmenus ? "navbar" : "vertical")), this._setSelectedl(), this._initAnchors()
                }
                return Object.defineProperty(t.prototype, "prefix", {
                    get: function() {
                        return a
                    },
                    enumerable: !1,
                    configurable: !0
                }), t.prototype.openPanel = function(t) {
                    var e = t.parentElement;
                    if (this.slidingSubmenus) {
                        var n = t.dataset.mmSpnTitle;
                        e === this.node ? this.node.classList.add(a + "--main") : (this.node.classList.remove(a + "--main"), n || s(e.children).forEach((function(t) {
                            t.matches("a, span") && (n = t.textContent)
                        }))), n || (n = this.title), this.node.dataset.mmSpnTitle = n, o(".mm-spn--open", this.node).forEach((function(t) {
                            t.classList.remove(a + "--open"), t.classList.remove(a + "--parent")
                        })), t.classList.add(a + "--open"), t.classList.remove(a + "--parent");
                        for (var i = t.parentElement.closest("ul"); i;) i.classList.add(a + "--open"), i.classList.add(a + "--parent"), i = i.parentElement.closest("ul")
                    } else {
                        var r = t.matches(".mm-spn--open");
                        r ? e.classList.remove(a + "--open-parent") : e.classList.add(a + "--open-parent"), t.classList[r ? "remove" : "add"](a + "--open");
                        for (var c = t.parentElement.closest("ul"); c;) c.classList.add(a + "--open"), c = c.parentElement.closest("ul")
                    }
                }, t.prototype._setSelectedl = function() {
                    var t = o("." + this.selectedClass, this.node),
                        e = t[t.length - 1],
                        n = null;
                    e && (n = e.closest("ul")), n || (n = this.node.querySelector("ul")), this.openPanel(n)
                }, t.prototype._initAnchors = function() {
                    var t = this;
                    this.node.addEventListener("click", (function(e) {
                        var n = e.target,
                            i = !1;
                        (i = (i = (i = i || function(t) {
                            return !!t.matches("a")
                        }(n)) || function(e) {
                            var n;
                            return !!(n = e.closest("span") ? e.parentElement : !!e.closest("li") && e) && (s(n.children).forEach((function(e) {
                                e.matches("ul") && t.openPanel(e)
                            })), !0)
                        }(n)) || function(e) {
                            var n = o(".mm-spn--open", e),
                                i = n[n.length - 1];
                            if (i) {
                                var s = i.parentElement.closest("ul");
                                if (s) return t.openPanel(s), !0
                            }
                            return !1
                        }(n)) && e.stopImmediatePropagation()
                    }))
                }, t
            }(),
            d = function() {
                function t(t, e) {
                    var n = this;
                    void 0 === t && (t = null), this.wrapper = document.createElement("div"), this.wrapper.classList.add("mm-ocd"), this.wrapper.classList.add("mm-ocd--" + e), this.content = document.createElement("div"), this.content.classList.add("mm-ocd__content"), this.wrapper.append(this.content), this.backdrop = document.createElement("div"), this.backdrop.classList.add("mm-ocd__backdrop"), this.wrapper.append(this.backdrop), document.body.append(this.wrapper), t && this.content.append(t);
                    var i = function(t) {
                        n.close(), t.stopImmediatePropagation()
                    };
                    this.backdrop.addEventListener("touchstart", i, {
                        passive: !0
                    }), this.backdrop.addEventListener("mousedown", i, {
                        passive: !0
                    })
                }
                return Object.defineProperty(t.prototype, "prefix", {
                    get: function() {
                        return "mm-ocd"
                    },
                    enumerable: !1,
                    configurable: !0
                }), t.prototype.open = function() {
                    this.wrapper.classList.add("mm-ocd--open"), document.querySelector('html').classList.add("mm-ocd-opened")
                }, t.prototype.close = function() {
                    this.wrapper.classList.remove("mm-ocd--open"), document.querySelector('html').classList.remove("mm-ocd-opened")
                }, t
            }(),
            l = function() {
                function t(t, e) {
                    void 0 === e && (e = "all"), this.menu = t, this.toggler = new i(e)
                }
                return t.prototype.navigation = function(t) {
                    var e = this;
                    if (!this.navigator) {
                        var n = (t = t || {}).title,
                            i = void 0 === n ? "Menu" : n,
                            s = t.selectedClass,
                            o = void 0 === s ? "Selected" : s,
                            r = t.slidingSubmenus,
                            a = void 0 === r || r,
                            d = t.theme,
                            l = void 0 === d ? "light" : d;
                        this.navigator = new c(this.menu, i, o, a, l), this.toggler.add((function() {
                            return e.menu.classList.add(e.navigator.prefix)
                        }), (function() {
                            return e.menu.classList.remove(e.navigator.prefix)
                        }))
                    }
                    return this.navigator
                }, t.prototype.offcanvas = function(t) {
                    var e = this;
                    if (!this.drawer) {
                        var n = (t = t || {}).position,
                            i = void 0 === n ? "left" : n;
                        this.drawer = new d(null, i);
                        var s = document.createComment("original menu location");
                        this.menu.after(s), this.toggler.add((function() {
                            e.drawer.content.append(e.menu)
                        }), (function() {
                            e.drawer.close(), s.after(e.menu)
                        }))
                    }
                    return this.drawer
                }, t
            }();
        e.default = l;
        window.MmenuLight = l
    }]);

;
(function() {

    const menus = {}

    const init = (id) => {
        // re-entrant

        if (id) {
            // re-init
            // first destroy all existing (after apply in-place changes) constructs
            document.querySelectorAll('[data-rel="' + id + '"]').forEach(existing => {
                existing.remove()
            })
        }

        document.querySelectorAll('.vmenu').forEach((el, index) => {
            if (el.classList.contains('inited')) {
                return
            }
            el.classList.add('inited')

            const blockId = el.closest('.block-layout').getAttribute('id')



            const menu = new MmenuLight(el, 'all')
            const navigation = menu.navigation({
                selected: 'selected',
                slidingSubmenus: 'true' === el.getAttribute('data-slide'),
                theme: 'true' === el.getAttribute('data-dark') ? 'dark' : 'light',
                title: ''
            })

            const drawer = menu.offcanvas({
                position: 'right' === el.getAttribute('data-position') ? 'right' : 'left',
            })

            drawer.wrapper.setAttribute('data-rel', blockId)

            el.classList.remove('initial')

            // if id was given to us in init(id), then we are reiniting
            if (id && index === 0) {
                menus[blockId] = []
            }
            if (!menus[blockId]) {
                // array for potentially multiple per block
                menus[blockId] = []
            }
            menus[blockId].push({
                navigation,
                drawer
            })
        })
    }

    document.addEventListener('DOMContentLoaded', () => {
        init()

        document.addEventListener('editor.on', () => {
            Reflect.ownKeys(menus).forEach(m => {
                const handlers = menus[m]
                handlers.forEach(h => {
                    try {
                        h.drawer.close()
                    } catch (e) {}
                })
            })
        })

        document.addEventListener('keydown', ev => {
            if (ev.key === 'Escape') {
                Reflect.ownKeys(menus).forEach(m => {
                    const handlers = menus[m]
                    handlers.forEach(h => {
                        try {
                            h.drawer.close()
                        } catch (e) {}
                    })
                })
            }
        })

        document.addEventListener('click', ev => {
            if (ev.target && ev.target &&
                ev.target.closest('.vmenu-opener')) {

                if (document.querySelector('html').classList.contains('editing')) {
                    return
                }
                const blockId = ev.target.closest('.block-layout').getAttribute('id')
                const index = parseInt(ev.target.closest('.vmenu-opener').getAttribute('data-index')) || 0
                const handlers = menus[blockId]
                if (Array.isArray(handlers) && handlers[index]) {
                    handlers[index].drawer.open()
                    if (handlers[index].navigation.slidingSubmenus) {
                        handlers[index].navigation.openPanel(handlers[index].navigation.node.querySelector('ul'))
                    }
                    handlers[index].drawer.content.querySelector('.vmenu').focus()
                }
            }
        })
    })

    _G.reinitHandlers.push(init)

})()


/* ==== INCLUDE: /js/blocks/omnibox-v2_1.js ==== */

;
(function() {

    function Typeahead(el, accountId) {

        if (el.__typeahead) {
            // already inited
            return
        }

        el.__typeahead = true

        const MIN_CHARS_MSG = 'Enter at least 3 characters...'

        // const typeaheadURL = el.getAttribute('data-typeahead')
        const typeaheadURL = '/wps/rest/api/' + accountId + '/typeahead?'

        el.getAttribute('data-with-ticker') === 'true' && (function() {

            const text = el.getAttribute('placeholder') || ''
            if (!text) {
                return
            }

            const ticker = document.createElement('div')
            ticker.style.position = 'absolute'
            ticker.style.width = ticker.style.height = '0'
            ticker.style.overflow = 'hidden'
            ticker.setAttribute('data-ticker', text)
            ticker.innerText = ''
            el.setAttribute('placeholder', '')
            const typing = window.TypeIt && new window.TypeIt(ticker, {
                //waitUntilVisible: true,
                cursor: '',
                speed: 50,
                afterStep: (step, queue, instance) => {
                    el.setAttribute('placeholder', ticker.textContent)
                }
            })
            _G.visibilityService.observe(el, result => {
                if (result.isIntersecting && !document.querySelector('html').classList.contains('editing')) {
                    typing.pause(1000).type(text).go()
                    _G.visibilityService.unobserve(el)
                }
            })

        })()

        const popup = document.createElement("div")
        popup.setAttribute("class", "typeahead elevation8")
        el.parentElement.appendChild(popup)

        const popper = Popper.createPopper(el, popup, {
            placement: 'bottom-start',
            modifiers: [{
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            }, ],
        })

        const doFetch = debounce((val, onData, onError) => {

            const soldCheckbox = el.form.querySelector('input[name=solds]')
            const isForSolds = soldCheckbox && soldCheckbox.checked || false
            const listingType = isForSolds ? 'AUTO_SOLD' :
                (el.form.querySelector('input[name=listingType]').value || 'AUTO')


            fetch(typeaheadURL + 'listingType' + encodeURIComponent(listingType) +
                    '&q=' + encodeURIComponent(val))
                .then(response => response.json())
                .then(json => {
                    onData(json)
                })
                .catch(err => {
                    onError(err)
                })
        }, 300)

        const createTypeaheadMessage = msg => {
            popup.innerHTML = ''
            const out = document.createElement('div')
            out.setAttribute('class', 'message')
            out.innerText = msg
            popup.appendChild(out)
            showTypeahead()
        }

        const createTypeaheadEntry = row => {
            const out = document.createElement('div')
            out.setAttribute('class', 'entry')
            out.setAttribute('data-value', row[0])
            out.setAttribute('data-label', row[1])

            out.addEventListener('mouseenter', () => {
                focusEntry(out)
            })
            out.innerText = row[1]
            return out
        }

        const createTypeahead = data => {
            popup.innerHTML = ''
            if (data.length === 0) {
                return createTypeaheadMessage('Hm, nothing found...')
            }
            data.forEach(record => {
                popup.appendChild(createTypeaheadEntry(record))
            })
            if (!popup.classList.contains('visible')) {
                showTypeahead()
            }
            focusFirst()
        }

        const showTypeahead = () => {
            popup.classList.add('visible')
            popper.forceUpdate()
        }

        const hideTypeahead = () => {
            popup.classList.remove('visible')
        }

        const currentSelection = () => {
            return popup.querySelector('.focused')
        }

        const focusFirst = () => {
            const first = popup.firstElementChild
            if (first && first.classList.contains('entry')) {
                return first.classList.add('focused')
            }
        }

        const focusNext = () => {
            const current = currentSelection()
            if (!current) {
                focusFirst()
            } else {
                current.classList.remove('focused')
                const next = current.nextElementSibling
                if (!next) {
                    focusFirst()
                } else if (next.classList.contains('entry')) {
                    next.classList.add('focused')
                }
            }
        }

        const focusPrev = () => {
            const current = currentSelection()
            if (!current) {
                return
            }
            current.classList.remove('focused')
            const prev = current.previousElementSibling
            if (!prev) {
                const last = popup.lastElementChild
                if (last && last.classList.contains('entry')) {
                    last.classList.add('focused')
                }
            } else if (prev.classList.contains('entry')) {
                prev.classList.add('focused')
            }
        }

        const focusEntry = entry => {
            const current = currentSelection()
            current && current.classList.remove('focused')
            entry.classList.add('focused')
        }

        const isValueAddressOrMlsNum = value => {
            return value && (value.startsWith('addr:') || value.startsWith('mls:'))
        }

        const selectItem = item => {
            if (!item || !item.classList.contains('entry')) {
                return
            }

            el.value = ''

            const label = item.getAttribute('data-label')
            const value = item.getAttribute('data-value')
            const isAddressOrMlsNum = isValueAddressOrMlsNum(value)

            const data = {
                label,
                value,
                isAddressOrMlsNum,
            }
            listeners.forEach(l => {
                try {
                    l(data)
                } catch (e) {
                    console.warn('WARNING: error in listener', e)
                }
            })

            item.remove()
        }

        // event handling

        popup.addEventListener('click', ev => {
            if (ev.target && ev.target.classList.contains('entry')) {
                selectItem(ev.target)
                hideTypeahead()
                // setTimeout(() => {
                el.focus()
                // }, 100)
            }
        })

        const processKey = ev => {
            if (ev.key === 'Escape') {
                el.value = ''
                return hideTypeahead()
            } else if (ev.key === 'ArrowDown') {
                ev.preventDefault()
                if (popup.classList.contains('visible')) {
                    focusNext()
                } else {
                    if (popup.querySelectorAll('.entry').length === 0) {
                        return createTypeaheadMessage(MIN_CHARS_MSG)
                    }
                    showTypeahead()
                }
            } else if (ev.key === 'ArrowUp') {
                ev.preventDefault()
                focusPrev()
            } else if (ev.key === 'Enter') {
                ev.preventDefault()
                ev.stopPropagation()
                if (!popup.classList.contains('visible')) {
                    // popup is not visible, submit the form
                    return ev.target.form.submit()
                }
                const sel = currentSelection()
                if (sel) {
                    selectItem(sel)
                    hideTypeahead()
                } else {
                    return ev.target.form.submit()
                }
            }
        }
        el.addEventListener('keydown', processKey)

        const submitButton = el.closest('form').querySelector('[type=submit]')
        if (submitButton) {
            submitButton.addEventListener('click', ev => {
                ev.preventDefault();
                ev.stopPropagation();
                if (!popup.classList.contains('visible') && el.value) {
                    // popup is not visible, submit the form
                    // if no suggestion was found (perhaps, due to latency)
                    // but the text was entered, assume it was an MLS number
                    const mlsNum = document.createElement('div')
                    mlsNum.setAttribute('data-value', 'mls:' + el.value)
                    mlsNum.setAttribute('data-label', el.value)
                    mlsNum.classList.add('entry')
                    selectItem(mlsNum)
                    hideTypeahead()
                    return ev.target.closest('[type=submit]').form.submit()
                }
                const sel = currentSelection()
                if (sel) {
                    selectItem(sel)
                    hideTypeahead()
                } else if (el.value) {
                    // if no suggestion was found (perhaps, due to latency)
                    // but the text was entered, assume it was an MLS number
                    const mlsNum = document.createElement('div')
                    mlsNum.setAttribute('data-value', 'mls:' + el.value)
                    mlsNum.setAttribute('data-label', el.value)
                    mlsNum.classList.add('entry')
                    selectItem(mlsNum)
                    hideTypeahead()
                }
                return ev.target.closest('[type=submit]').form.submit()
            })
        }

        const processInput = ev => {

            const val = ev.target.value
            if (val && val.length > 2) {
                doFetch(val, data => {
                    createTypeahead(data)
                }, err => {
                    console.log('err', err)
                })
            } else {
                createTypeaheadMessage(MIN_CHARS_MSG)
                //hideTypeahead()
            }
        }

        el.addEventListener('input', processInput)

        const click = ev => {
            if (!popup.classList.contains('visible') && popup.children.length > 0) {
                popup.classList.add('visible')
                popper.forceUpdate()
            }
        }
        el.addEventListener('mousedown', click)


        const clickAway = ev => {
            if (ev.target && ev.target.contains(el)) {
                return
            }
            if (ev.target && ev.target.contains(popup)) {
                return
            }
            if (ev.target && ev.target.closest('.typeahead')) {
                return
            }
            if (ev.target && ev.target.closest('[type=submit]')) {
                return
            }
            hideTypeahead()
        }
        document.querySelector('html').addEventListener('mousedown', clickAway)


        // exported

        const listeners = []

        function onSelect(callback) {
            callback && (typeof callback === 'function') && listeners.push(callback)
        }

        function destroy() {
            el.__typeahead = false
            popper.destroy()
            el.removeEventListener('keydown', processKey)
            el.removeEventListener('input', processInput)
            el.removeEventListener('mousedown', click)
            document.removeEventListener('mousedown', clickAway)
        }

        return {
            destroy,
            onSelect,
        }
    }

    function Selections(el) {

        let selections = []

        el.querySelectorAll('input[type=hidden]').forEach(preset => {
            const name = preset.getAttribute('name')
            const value = preset.getAttribute('value')
            const label = preset.getAttribute('data-label')

            selections.push({
                name,
                value,
                label
            })

            preset.remove()
        })

        const render = () => {
            el.innerHTML = ''
            selections.forEach(s => {
                const pill = document.createElement('span')
                pill.classList.add('selection-pill')
                const cancel = document.createElement('img')
                cancel.src = 'data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3e%3cpath d=\'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z\'/%3e%3c/svg%3e'
                cancel.setAttribute('aria-role', 'button')
                cancel.classList.add('cancel')
                cancel.innerText = '×'
                pill.appendChild(cancel)

                cancel.addEventListener('click', ev => {
                    ev.preventDefault()
                    remove(s.name, s.value)
                })
                const label = document.createElement('span')
                label.classList.add('label')
                label.innerText = s.label
                pill.appendChild(label)

                const hidden = document.createElement('input')
                hidden.setAttribute('type', 'hidden')
                hidden.setAttribute('name', s.name)
                hidden.setAttribute('value', s.value)
                el.appendChild(hidden)
                el.appendChild(pill)
            })

            if (selections.length > 3) {
                const pill = document.createElement('span')
                pill.classList.add('selection-pill', 'clear-all')
                const cancel = document.createElement('img')
                cancel.src = 'data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3e%3cpath d=\'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z\'/%3e%3c/svg%3e'
                cancel.setAttribute('aria-role', 'button')
                cancel.classList.add('cancel')
                cancel.innerText = '×'
                pill.appendChild(cancel)

                pill.addEventListener('click', ev => {
                    ev.preventDefault()
                    clear()
                })
                const label = document.createElement('span')
                label.classList.add('label')
                label.innerText = 'Clear all'
                pill.appendChild(label)

                el.appendChild(pill)
            }
        }

        const clear = () => {
            selections = []
            render()
        }

        const clearNonMlsOrAddress = () => {
            selections = selections.filter(s => {
                return s.name === 'omni' && s.isAddressOrMlsNum === true
            })
        }

        const find = (name, value) => {
            return selections.find(s => (
                s.name === name && s.value === value
            ))
        }

        const add = (name, data) => {
            if (find(name, data.value)) {
                return
            }
            let label = data.label
            if (data.isAddressOrMlsNum === true) {
                label = label.replace(/,.+$/, '')
            }
            selections.push({
                name,
                ...data,
                label,
            })
            render()
        }

        const remove = (name, value = null) => {
            selections = selections.filter(s => {
                return !(s.name === name && (value === null ? true : s.value === value))
            })
            render()
        }

        const change = (data, multipleOk = false) => {

            if (data.value === null) {
                selections = selections.filter(s => {
                    return s.name !== data.name
                })
                return render()
            }

            const found = selections.find(s => (s.name === data.name && (multipleOk ? s.value === data.value : true)))
            if (found) {
                found.value = data.value
                found.label = data.label
                render()
            } else {
                add(data.name, data)
            }
        }

        const unset = (name, value) => {

        }

        const values = () => {
            return JSON.parse(JSON.stringify(selections))
        }

        render()

        return {
            clear,
            clearNonMlsOrAddress,
            add,
            remove,
            change,
            values,
        }
    }

    let meta
    let metaPromise

    function Metadata(accountId, listingType, context) {
        if (metaPromise) {
            return metaPromise
        }
        if (meta) {
            return Promise.resolve(meta)
        }
        return new Promise((resolve, reject) => {
            const url = '/wps/-/noframe~true/' + context + '/' + accountId + '/idx.browse?ibf_json=true&'

            setTimeout(() => {

                fetch(url + '&listingType=' + encodeURIComponent(listingType))
                    .then(response => response.json())
                    .then(json => {
                        meta = json
                        metaPromise = null
                        resolve(json)
                    })
                    .catch(err => {
                        metaPromise = null
                        reject(err)
                    })

            }, 0)
        })
    }

    function BaseControl(meta) {
        const out = document.createElement('div')
        out.classList.add('control')
        const heading = document.createElement('div')
        heading.classList.add('heading')
        const title = document.createElement('div')
        title.classList.add('title')
        const expandToggle = document.createElement('div')
        expandToggle.classList.add('toggle')
        const icon = document.createElement('img')
        icon.src = 'data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 512 512\'%3e %3cpolygon fill=\'var(--ci-primary-color%2c currentColor)\' points=\'440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240\' class=\'ci-primary\'/%3e %3c/svg%3e'
        icon.setAttribute('aria-label', 'Show/Hide control')
        icon.setAttribute('aria-role', 'button')
        icon.setAttribute('alt', 'Show/Hide control')
        expandToggle.appendChild(icon)

        heading.appendChild(title)
        heading.appendChild(expandToggle)

        const contentOuter = document.createElement('div')
        contentOuter.classList.add('content-outer')
        const contentInner = document.createElement('div')
        contentInner.classList.add('content-inner')

        contentOuter.appendChild(contentInner)

        out.appendChild(heading)
        out.appendChild(contentOuter)

        out.querySelector('.title').innerText = meta.label

        heading.addEventListener('click', () => {
            if (heading.classList.contains('fixed')) {
                return
            }
            if (icon.classList.contains('expanded')) {
                icon.classList.remove('expanded')
                contentOuter.style.height = '0px'
            } else {
                icon.classList.add('expanded')
                const h = contentInner.getBoundingClientRect().height
                contentOuter.style.height = h + 'px'
            }
            // setTimeout(() => {
            //     contentOuter.closest('.control-panel').popper.update()
            // }, 100 )
        })

        return out
    }

    function nFormatter(num, digits) {
        var si = [{
                value: 1,
                symbol: ""
            },
            {
                value: 1E3,
                symbol: "K"
            },
            {
                value: 1E6,
                symbol: "M"
            },
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }

    function PriceControl(meta, values, onChange, onClear) {

        const out = BaseControl(meta)

        const min = 0
        const max = 10000000
        let initialFrom = min
        let initialTo = max

        if (values) {
            const found = values.find(s => s.name === 'ibf_price')
            if (found) {
                const v = found.value
                if (v) {
                    const parsed = v.split("|")
                    initialFrom = parseInt(parsed[0]) || initialFrom
                    initialTo = parseInt(parsed[1]) || initialTo
                }
            }
        }

        const content = out.querySelector('.content-inner')

        const bar = document.createElement('div')
        bar.classList.add('slider')

        const formatter = {
            to: val => {
                return '$' + new Intl.NumberFormat().format(val.toFixed(0))
            },
            from: str => {
                return parseInt(val)
            }
        }


        noUiSlider.create(bar, {
            start: [initialFrom, initialTo],
            connect: true,
            range: {
                'min': [0, 1000],
                // '5%': [1000,1000],
                '5%': [100000, 10000],
                '70%': [1000000, 100000],
                '80%': [2000000, 500000],
                'max': [(initialTo || 10000000)],
            },
            ariaFormat: formatter,
        })

        const labels = document.createElement('div')
        labels.classList.add('labels')

        const from = document.createElement('div')
        from.classList.add('value')
        labels.appendChild(from)

        const to = document.createElement('div')
        to.classList.add('value')
        labels.appendChild(to)

        bar.noUiSlider.on('update', values => {
            const fromVal = parseInt(values[0])
            const toVal = parseInt(values[1])
            if (fromVal === min) {
                from.innerText = 'Any'
            } else {
                from.innerText = formatter.to(fromVal)
            }
            if (toVal === max) {
                to.innerText = 'Any'
            } else {
                to.innerText = formatter.to(toVal)
            }

            if (fromVal === min && toVal === max) {
                // console.log( 'onChange null' )
                onClear('ibf_price')
            } else {
                // console.log( 'onChange', fromVal + '-' + toVal )
                onChange({
                    name: 'ibf_price',
                    value: fromVal + '|' + toVal,
                    // label: 'Price: ' + nFormatter(fromVal,2) + '-' + nFormatter(toVal, 1)
                    label: formatter.to(fromVal) + ' - ' + formatter.to(toVal)
                }, false) // multipleOk=false
            }

        })

        content.appendChild(bar)
        content.appendChild(labels)

        return out
    }

    function MixedOptionsControl(meta, values, onChange, onClear) {
        const out = BaseControl(meta)
        const content = out.querySelector('.content-inner')

        const name = 'ibf_' + meta.name.toLowerCase()

        for (let i = 0; i < meta.groups.length; ++i) {

            const group = meta.groups[i]

            if (i > 0) {
                const subhead = document.createElement('div')
                subhead.classList.add('subhead')
                subhead.innerText = group.label
                content.appendChild(subhead)
            }

            const pane = document.createElement('div')
            pane.classList.add('checkbox-pane')
            content.appendChild(pane)

            for (const option of group.options) {
                const label = document.createElement('label')
                const checkbox = document.createElement('input')
                checkbox.setAttribute('type', 'checkbox')
                checkbox.setAttribute('value', option[0])
                const text = document.createElement('span')
                text.innerText = option[1]
                label.appendChild(checkbox)
                label.appendChild(text)
                pane.appendChild(label)

                const found = values.find(v => {
                    return v.name === name && v.value === option[0]
                })
                found && (checkbox.checked = true)

                checkbox.addEventListener('change', ev => {
                    if (ev.target.checked) {
                        onChange({
                            name,
                            label: option[1],
                            value: option[0],
                        }, true)
                    }
                })
            }
        }

        return out
    }

    function SingleOptionControl(meta, values, onChange, onClear) {
        const out = BaseControl(meta)
        const content = out.querySelector('.content-inner')

        const name = 'ibf_' + meta.name.toLowerCase()

        const pane = document.createElement('div')
        pane.classList.add('checkbox-pane')
        content.appendChild(pane)

        for (const option of meta.options) {

            if (!option[0]) {
                continue;
            }
            const label = document.createElement('label')
            const checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'radio')
            checkbox.setAttribute('value', option[0])
            const text = document.createElement('span')
            text.innerText = option[1]
            label.appendChild(checkbox)
            label.appendChild(text)
            pane.appendChild(label)

            const found = values.find(v => {
                return v.name === name && v.value === option[0]
            })
            found && (checkbox.checked = true)

            checkbox.addEventListener('change', ev => {

                pane.querySelectorAll('input[type=radio]').forEach(r => {
                    if (r.getAttribute('value') !== ev.target.value) {
                        r.checked = false
                    }
                })

                if (ev.target.checked) {
                    onChange({
                        name,
                        label: meta.label + ': ' + option[1],
                        value: option[0],
                    }, false)
                }
            })
        }

        return out
    }

    function Control(meta, values, onChange, onClear) {

        if (meta.type === 'PriceControl') {
            return PriceControl(meta, values, onChange, onClear)
        } else if (meta.type === 'MixedOptionsControl') {
            return MixedOptionsControl(meta, values, onChange, onClear)
        } else if (meta.type === 'SingleOptionControl') {
            return SingleOptionControl(meta, values, onChange, onClear)
        }

        return null
    }

    function ControlPanel(el, metadataFetcher, selections) {
        const what = el.getAttribute('data-omni-trigger');
        if (!what) {
            return
        }

        const popup = document.createElement("div")
        popup.setAttribute("class", "control-panel elevation8")
        el.parentElement.appendChild(popup)

        // popup.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor ultricies interdum. Suspendisse potenti. Sed consectetur, odio eget mattis commodo, metus massa tincidunt sapien, quis tincidunt sapien mi sed ipsum. Suspendisse eleifend sodales nulla, sit amet vehicula mauris bibendum vitae. Integer condimentum suscipit libero ac pharetra. In eget viverra felis. Cras odio nisi, lacinia eget semper ut, dictum vitae odio. Pellentesque at suscipit justo, id sagittis nisl.'

        const popper = Popper.createPopper(el, popup, {
            placement: 'bottom',
            modifiers: [{
                    name: 'offset',
                    options: {
                        offset: [0, 0],
                    },
                },
                {
                    name: 'flip',
                    options: {
                        // flipVariations: false, // true by default
                        // allowedAutoPlacements: ['bottom'],
                        fallbackPlacements: ['bottom'],
                    },
                },
            ],
        })

        popup.popper = popper

        window.addEventListener('resize', () => {
            if (!_G.isMobile()) {
                hidePopup()
            }
        }, {
            passive: true
        })

        const showPopup = () => {
            popup.classList.add('visible')
            popup.classList.add('becoming')
            popper.forceUpdate()
            setTimeout(() => {
                popup.classList.remove('becoming')
            }, 10)
        }

        const hidePopup = () => {
            if (!isVisible()) {
                return
            }
            popup.addEventListener('transitionend', () => {
                popup.classList.remove('visible')
                popup.classList.remove('becoming')
            }, {
                once: true
            })
            popup.classList.add('becoming')
        }

        const isVisible = () => {
            return popup.classList.contains('visible')
        }

        const renderProgress = () => {
            const loading = document.createElement('div')
            loading.classList.add('progress')
            const ind = document.createElement('img')
            ind.setAttribute('src', 'data:image/svg+xml,%3c%3fxml version=\'1.0\' encoding=\'UTF-8\'%3f%3e%3c!DOCTYPE svg PUBLIC \'-//W3C//DTD SVG 1.1//EN\' \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'%3e%3csvg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\' id=\'mdi-refresh-circle\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3e%3cpath d=\'M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2M18 11H13L14.81 9.19A3.94 3.94 0 0 0 12 8A4 4 0 1 0 15.86 13H17.91A6 6 0 1 1 12 6A5.91 5.91 0 0 1 16.22 7.78L18 6Z\' /%3e%3c/svg%3e')
            ind.classList.add('indicator')
            loading.appendChild(ind)
            popup.innerHTML = ''
            popup.appendChild(loading)
        }

        const renderError = err => {
            const error = document.createElement('div')
            error.classList.add('error')

            const msg = document.createElement('div')
            msg.classList.add('message')
            msg.innerText = 'Sorry, an unexpected error occurred: '

            const details = document.createElement('div')
            details.classList.add('message')
            details.innerText = err.toString()

            error.appendChild(msg)
            error.appendChild(details)

            const reload = document.createElement('button')
            reload.classList.add('button')
            reload.classList.add('small')
            reload.innerText = 'Try again'

            reload.addEventListener('click', ev => {
                ev.preventDefault()
                hidePopup()
                setTimeout(() => {
                    render()
                }, 200)
            })

            error.appendChild(reload)

            popup.innerHTML = ''
            popup.appendChild(error)
        }

        const renderControls = meta => {

            const filterProp = getComputedStyle(el).getPropertyValue('--OMNI-CONTROLS')
            let filters = []
            if (filterProp) {
                filters = filterProp.split(',')
                filters = filters.map(f => f.trim())
            }
            if (filters.length == 1 && (filters[0] === '' || filters[0] === 'all')) {
                filters = []
            }

            popup.innerHTML = ''
            let numControls = 0
            meta.controls.forEach(c => {
                const skip = filters.length > 0 && filters.find(f => {
                    if (!f) return false
                    if (f.startsWith('-') && f.substring(1) === c.name) {
                        return true // skip
                    } else if (f === c.name) {
                        return false
                    } else {
                        if (filters[0].startsWith('-')) {
                            return false
                        } else {
                            return true
                        }
                    }
                })

                if (skip) {
                    return
                }

                const control = Control(c, selections.values(), selections.change, selections.remove)
                if (control) {
                    popup.appendChild(control)
                    numControls++
                }
            })
            if (numControls === 1) {
                popup.querySelector('.content-outer').style.height = 'auto'
                popup.querySelector('.heading').classList.add('fixed');
            }
        }

        const render = () => {

            let timer = setTimeout(() => {
                renderProgress()
                showPopup()
                popper.forceUpdate()
                timer = null
            }, 300)

            metadataFetcher().then(meta => {
                renderControls(meta)
            }).catch(err => {
                console.error(err)
                renderError(err)
            }).finally(() => {
                if (timer) {
                    clearTimeout(timer)
                    timer = null
                    showPopup()
                } else {
                    popper.forceUpdate()
                }
            })
        }


        el.addEventListener('click', () => {
            isVisible() ? hidePopup() : render()
        })

        const clickAway = ev => {
            // const html = document.querySelector('html')
            console.log('clickaway', ev.target)
            if (popup.contains(ev.target)) {
                return
            }
            // if (ev.target && ev.target.closest('.control-panel')) {
            //     return
            // }
            hidePopup()
        }
        document.querySelector('html').addEventListener('mousedown', clickAway)

        const debug = (event) => {
            console.log('fired', event)
        }
        document.addEventListener('touchstart', debug)
        document.addEventListener('touchmove', debug)
        document.addEventListener('touchend', debug)
        document.addEventListener('touchcancel', debug)
    }

    function OmniboxForm(el) {

        if (el.__omniInited) {
            return
        }

        el.__omniInited = true
        el.classList.add('inited')

        const accountId = parseInt(el.getAttribute('data-account')) || 0
        const context = el.getAttribute('data-context') || 'recip'
        const listingType = el.querySelector('input[name=listingType]').value || 'AUTO'

        const isImmediateSearch = el.getAttribute('data-immediate') === 'true'

        const metadataFetcher = () => {
            return Metadata(accountId, listingType, context)
        }
        // prime the meta
        metadataFetcher()

        const selections = Selections(el.querySelector('[data-rel=selections]'))

        const omniElem = el.querySelector('[data-rel=omni]')
        if (omniElem) {
            const typeahead = Typeahead(omniElem, accountId)
            typeahead.onSelect(data => {
                const toadd = {
                    ...data,
                    label: data.label,
                    value: data.value + '[' + data.label + ']',
                }
                if (data.isAddressOrMlsNum) {
                    selections.clearNonMlsOrAddress()
                    selections.add('omni', toadd)
                } else {
                    selections.add('omni', toadd)
                }

                if (isImmediateSearch) {
                    const submitButton = el.closest('form').querySelector('[type=submit]')
                    if (submitButton) {
                        submitButton.click()
                    }
                }
            })
        }

        const triggers = el.querySelectorAll('[data-omni-trigger]:not([data-omni-trigger=\"\"])').forEach(t => {
            ControlPanel(t, metadataFetcher, selections)
        })

        return {}
    }

    function init() {
        document.querySelectorAll('.omnibox-form').forEach(el => {
            OmniboxForm(el)
        })
    }

    document.addEventListener('DOMContentLoaded', init)

    _G.reinitHandlers.push(init)
})();

/* ==== INCLUDE: /js/blocks/nouislider.14.6.2.min.js ==== */

/*! nouislider - 14.6.2 - 9/16/2020 */
! function(t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.noUiSlider = t()
}(function() {
    "use strict";
    var lt = "14.6.2";

    function ut(t) {
        t.parentElement.removeChild(t)
    }

    function a(t) {
        return null != t
    }

    function ct(t) {
        t.preventDefault()
    }

    function o(t) {
        return "number" == typeof t && !isNaN(t) && isFinite(t)
    }

    function pt(t, e, r) {
        0 < r && (ht(t, e), setTimeout(function() {
            mt(t, e)
        }, r))
    }

    function ft(t) {
        return Math.max(Math.min(t, 100), 0)
    }

    function dt(t) {
        return Array.isArray(t) ? t : [t]
    }

    function e(t) {
        var e = (t = String(t)).split(".");
        return 1 < e.length ? e[1].length : 0
    }

    function ht(t, e) {
        t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e
    }

    function mt(t, e) {
        t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
    }

    function gt(t) {
        var e = void 0 !== window.pageXOffset,
            r = "CSS1Compat" === (t.compatMode || "");
        return {
            x: e ? window.pageXOffset : r ? t.documentElement.scrollLeft : t.body.scrollLeft,
            y: e ? window.pageYOffset : r ? t.documentElement.scrollTop : t.body.scrollTop
        }
    }

    function c(t, e) {
        return 100 / (e - t)
    }

    function p(t, e, r) {
        return 100 * e / (t[r + 1] - t[r])
    }

    function f(t, e) {
        for (var r = 1; t >= e[r];) r += 1;
        return r
    }

    function r(t, e, r) {
        if (r >= t.slice(-1)[0]) return 100;
        var n, i, o = f(r, t),
            s = t[o - 1],
            a = t[o],
            l = e[o - 1],
            u = e[o];
        return l + (i = r, p(n = [s, a], n[0] < 0 ? i + Math.abs(n[0]) : i - n[0], 0) / c(l, u))
    }

    function n(t, e, r, n) {
        if (100 === n) return n;
        var i, o, s = f(n, t),
            a = t[s - 1],
            l = t[s];
        return r ? (l - a) / 2 < n - a ? l : a : e[s - 1] ? t[s - 1] + (i = n - t[s - 1], o = e[s - 1], Math.round(i / o) * o) : n
    }

    function s(t, e, r) {
        var n;
        if ("number" == typeof e && (e = [e]), !Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'range' contains invalid value.");
        if (!o(n = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !o(e[0])) throw new Error("noUiSlider (" + lt + "): 'range' value isn't numeric.");
        r.xPct.push(n), r.xVal.push(e[0]), n ? r.xSteps.push(!isNaN(e[1]) && e[1]) : isNaN(e[1]) || (r.xSteps[0] = e[1]), r.xHighestCompleteStep.push(0)
    }

    function l(t, e, r) {
        if (e)
            if (r.xVal[t] !== r.xVal[t + 1]) {
                r.xSteps[t] = p([r.xVal[t], r.xVal[t + 1]], e, 0) / c(r.xPct[t], r.xPct[t + 1]);
                var n = (r.xVal[t + 1] - r.xVal[t]) / r.xNumSteps[t],
                    i = Math.ceil(Number(n.toFixed(3)) - 1),
                    o = r.xVal[t] + r.xNumSteps[t] * i;
                r.xHighestCompleteStep[t] = o
            } else r.xSteps[t] = r.xHighestCompleteStep[t] = r.xVal[t]
    }

    function i(t, e, r) {
        var n;
        this.xPct = [], this.xVal = [], this.xSteps = [r || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = e;
        var i = [];
        for (n in t) t.hasOwnProperty(n) && i.push([t[n], n]);
        for (i.length && "object" == typeof i[0][0] ? i.sort(function(t, e) {
                return t[0][0] - e[0][0]
            }) : i.sort(function(t, e) {
                return t[0] - e[0]
            }), n = 0; n < i.length; n++) s(i[n][1], i[n][0], this);
        for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) l(n, this.xNumSteps[n], this)
    }
    i.prototype.getDistance = function(t) {
        var e, r = [];
        for (e = 0; e < this.xNumSteps.length - 1; e++) {
            var n = this.xNumSteps[e];
            if (n && t / n % 1 != 0) throw new Error("noUiSlider (" + lt + "): 'limit', 'margin' and 'padding' of " + this.xPct[e] + "% range must be divisible by step.");
            r[e] = p(this.xVal, t, e)
        }
        return r
    }, i.prototype.getAbsoluteDistance = function(t, e, r) {
        var n, i = 0;
        if (t < this.xPct[this.xPct.length - 1])
            for (; t > this.xPct[i + 1];) i++;
        else t === this.xPct[this.xPct.length - 1] && (i = this.xPct.length - 2);
        r || t !== this.xPct[i + 1] || i++;
        var o = 1,
            s = e[i],
            a = 0,
            l = 0,
            u = 0,
            c = 0;
        for (n = r ? (t - this.xPct[i]) / (this.xPct[i + 1] - this.xPct[i]) : (this.xPct[i + 1] - t) / (this.xPct[i + 1] - this.xPct[i]); 0 < s;) a = this.xPct[i + 1 + c] - this.xPct[i + c], 100 < e[i + c] * o + 100 - 100 * n ? (l = a * n, o = (s - 100 * n) / e[i + c], n = 1) : (l = e[i + c] * a / 100 * o, o = 0), r ? (u -= l, 1 <= this.xPct.length + c && c--) : (u += l, 1 <= this.xPct.length - c && c++), s = e[i + c] * o;
        return t + u
    }, i.prototype.toStepping = function(t) {
        return t = r(this.xVal, this.xPct, t)
    }, i.prototype.fromStepping = function(t) {
        return function(t, e, r) {
            if (100 <= r) return t.slice(-1)[0];
            var n, i = f(r, e),
                o = t[i - 1],
                s = t[i],
                a = e[i - 1],
                l = e[i];
            return n = [o, s], (r - a) * c(a, l) * (n[1] - n[0]) / 100 + n[0]
        }(this.xVal, this.xPct, t)
    }, i.prototype.getStep = function(t) {
        return t = n(this.xPct, this.xSteps, this.snap, t)
    }, i.prototype.getDefaultStep = function(t, e, r) {
        var n = f(t, this.xPct);
        return (100 === t || e && t === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / r
    }, i.prototype.getNearbySteps = function(t) {
        var e = f(t, this.xPct);
        return {
            stepBefore: {
                startValue: this.xVal[e - 2],
                step: this.xNumSteps[e - 2],
                highestStep: this.xHighestCompleteStep[e - 2]
            },
            thisStep: {
                startValue: this.xVal[e - 1],
                step: this.xNumSteps[e - 1],
                highestStep: this.xHighestCompleteStep[e - 1]
            },
            stepAfter: {
                startValue: this.xVal[e],
                step: this.xNumSteps[e],
                highestStep: this.xHighestCompleteStep[e]
            }
        }
    }, i.prototype.countStepDecimals = function() {
        var t = this.xNumSteps.map(e);
        return Math.max.apply(null, t)
    }, i.prototype.convert = function(t) {
        return this.getStep(this.toStepping(t))
    };
    var u = {
            to: function(t) {
                return void 0 !== t && t.toFixed(2)
            },
            from: Number
        },
        d = {
            target: "target",
            base: "base",
            origin: "origin",
            handle: "handle",
            handleLower: "handle-lower",
            handleUpper: "handle-upper",
            touchArea: "touch-area",
            horizontal: "horizontal",
            vertical: "vertical",
            background: "background",
            connect: "connect",
            connects: "connects",
            ltr: "ltr",
            rtl: "rtl",
            textDirectionLtr: "txt-dir-ltr",
            textDirectionRtl: "txt-dir-rtl",
            draggable: "draggable",
            drag: "state-drag",
            tap: "state-tap",
            active: "active",
            tooltip: "tooltip",
            pips: "pips",
            pipsHorizontal: "pips-horizontal",
            pipsVertical: "pips-vertical",
            marker: "marker",
            markerHorizontal: "marker-horizontal",
            markerVertical: "marker-vertical",
            markerNormal: "marker-normal",
            markerLarge: "marker-large",
            markerSub: "marker-sub",
            value: "value",
            valueHorizontal: "value-horizontal",
            valueVertical: "value-vertical",
            valueNormal: "value-normal",
            valueLarge: "value-large",
            valueSub: "value-sub"
        };

    function h(t) {
        if ("object" == typeof(e = t) && "function" == typeof e.to && "function" == typeof e.from) return !0;
        var e;
        throw new Error("noUiSlider (" + lt + "): 'format' requires 'to' and 'from' methods.")
    }

    function m(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'step' is not numeric.");
        t.singleStep = e
    }

    function g(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'keyboardPageMultiplier' is not numeric.");
        t.keyboardPageMultiplier = e
    }

    function v(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'keyboardDefaultStep' is not numeric.");
        t.keyboardDefaultStep = e
    }

    function b(t, e) {
        if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'range' is not an object.");
        if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider (" + lt + "): Missing 'min' or 'max' in 'range'.");
        if (e.min === e.max) throw new Error("noUiSlider (" + lt + "): 'range' 'min' and 'max' cannot be equal.");
        t.spectrum = new i(e, t.snap, t.singleStep)
    }

    function x(t, e) {
        if (e = dt(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider (" + lt + "): 'start' option is incorrect.");
        t.handles = e.length, t.start = e
    }

    function S(t, e) {
        if ("boolean" != typeof(t.snap = e)) throw new Error("noUiSlider (" + lt + "): 'snap' option must be a boolean.")
    }

    function w(t, e) {
        if ("boolean" != typeof(t.animate = e)) throw new Error("noUiSlider (" + lt + "): 'animate' option must be a boolean.")
    }

    function y(t, e) {
        if ("number" != typeof(t.animationDuration = e)) throw new Error("noUiSlider (" + lt + "): 'animationDuration' option must be a number.")
    }

    function E(t, e) {
        var r, n = [!1];
        if ("lower" === e ? e = [!0, !1] : "upper" === e && (e = [!1, !0]), !0 === e || !1 === e) {
            for (r = 1; r < t.handles; r++) n.push(e);
            n.push(!1)
        } else {
            if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider (" + lt + "): 'connect' option doesn't match handle count.");
            n = e
        }
        t.connect = n
    }

    function C(t, e) {
        switch (e) {
            case "horizontal":
                t.ort = 0;
                break;
            case "vertical":
                t.ort = 1;
                break;
            default:
                throw new Error("noUiSlider (" + lt + "): 'orientation' option is invalid.")
        }
    }

    function P(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'margin' option must be numeric.");
        0 !== e && (t.margin = t.spectrum.getDistance(e))
    }

    function N(t, e) {
        if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'limit' option must be numeric.");
        if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2) throw new Error("noUiSlider (" + lt + "): 'limit' option is only supported on linear sliders with 2 or more handles.")
    }

    function k(t, e) {
        var r;
        if (!o(e) && !Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (Array.isArray(e) && 2 !== e.length && !o(e[0]) && !o(e[1])) throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (0 !== e) {
            for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], r = 0; r < t.spectrum.xNumSteps.length - 1; r++)
                if (t.padding[0][r] < 0 || t.padding[1][r] < 0) throw new Error("noUiSlider (" + lt + "): 'padding' option must be a positive number(s).");
            var n = e[0] + e[1],
                i = t.spectrum.xVal[0];
            if (1 < n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - i)) throw new Error("noUiSlider (" + lt + "): 'padding' option must not exceed 100% of the range.")
        }
    }

    function U(t, e) {
        switch (e) {
            case "ltr":
                t.dir = 0;
                break;
            case "rtl":
                t.dir = 1;
                break;
            default:
                throw new Error("noUiSlider (" + lt + "): 'direction' option was not recognized.")
        }
    }

    function A(t, e) {
        if ("string" != typeof e) throw new Error("noUiSlider (" + lt + "): 'behaviour' must be a string containing options.");
        var r = 0 <= e.indexOf("tap"),
            n = 0 <= e.indexOf("drag"),
            i = 0 <= e.indexOf("fixed"),
            o = 0 <= e.indexOf("snap"),
            s = 0 <= e.indexOf("hover"),
            a = 0 <= e.indexOf("unconstrained");
        if (i) {
            if (2 !== t.handles) throw new Error("noUiSlider (" + lt + "): 'fixed' behaviour must be used with 2 handles");
            P(t, t.start[1] - t.start[0])
        }
        if (a && (t.margin || t.limit)) throw new Error("noUiSlider (" + lt + "): 'unconstrained' behaviour cannot be used with margin or limit");
        t.events = {
            tap: r || o,
            drag: n,
            fixed: i,
            snap: o,
            hover: s,
            unconstrained: a
        }
    }

    function V(t, e) {
        if (!1 !== e)
            if (!0 === e) {
                t.tooltips = [];
                for (var r = 0; r < t.handles; r++) t.tooltips.push(!0)
            } else {
                if (t.tooltips = dt(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider (" + lt + "): must pass a formatter for all handles.");
                t.tooltips.forEach(function(t) {
                    if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider (" + lt + "): 'tooltips' must be passed a formatter or 'false'.")
                })
            }
    }

    function D(t, e) {
        h(t.ariaFormat = e)
    }

    function M(t, e) {
        h(t.format = e)
    }

    function O(t, e) {
        if ("boolean" != typeof(t.keyboardSupport = e)) throw new Error("noUiSlider (" + lt + "): 'keyboardSupport' option must be a boolean.")
    }

    function L(t, e) {
        t.documentElement = e
    }

    function z(t, e) {
        if ("string" != typeof e && !1 !== e) throw new Error("noUiSlider (" + lt + "): 'cssPrefix' must be a string or `false`.");
        t.cssPrefix = e
    }

    function H(t, e) {
        if ("object" != typeof e) throw new Error("noUiSlider (" + lt + "): 'cssClasses' must be an object.");
        if ("string" == typeof t.cssPrefix)
            for (var r in t.cssClasses = {}, e) e.hasOwnProperty(r) && (t.cssClasses[r] = t.cssPrefix + e[r]);
        else t.cssClasses = e
    }

    function vt(e) {
        var r = {
                margin: 0,
                limit: 0,
                padding: 0,
                animate: !0,
                animationDuration: 300,
                ariaFormat: u,
                format: u
            },
            n = {
                step: {
                    r: !1,
                    t: m
                },
                keyboardPageMultiplier: {
                    r: !1,
                    t: g
                },
                keyboardDefaultStep: {
                    r: !1,
                    t: v
                },
                start: {
                    r: !0,
                    t: x
                },
                connect: {
                    r: !0,
                    t: E
                },
                direction: {
                    r: !0,
                    t: U
                },
                snap: {
                    r: !1,
                    t: S
                },
                animate: {
                    r: !1,
                    t: w
                },
                animationDuration: {
                    r: !1,
                    t: y
                },
                range: {
                    r: !0,
                    t: b
                },
                orientation: {
                    r: !1,
                    t: C
                },
                margin: {
                    r: !1,
                    t: P
                },
                limit: {
                    r: !1,
                    t: N
                },
                padding: {
                    r: !1,
                    t: k
                },
                behaviour: {
                    r: !0,
                    t: A
                },
                ariaFormat: {
                    r: !1,
                    t: D
                },
                format: {
                    r: !1,
                    t: M
                },
                tooltips: {
                    r: !1,
                    t: V
                },
                keyboardSupport: {
                    r: !0,
                    t: O
                },
                documentElement: {
                    r: !1,
                    t: L
                },
                cssPrefix: {
                    r: !0,
                    t: z
                },
                cssClasses: {
                    r: !0,
                    t: H
                }
            },
            i = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                keyboardSupport: !0,
                cssPrefix: "noUi-",
                cssClasses: d,
                keyboardPageMultiplier: 5,
                keyboardDefaultStep: 10
            };
        e.format && !e.ariaFormat && (e.ariaFormat = e.format), Object.keys(n).forEach(function(t) {
            if (!a(e[t]) && void 0 === i[t]) {
                if (n[t].r) throw new Error("noUiSlider (" + lt + "): '" + t + "' is required.");
                return !0
            }
            n[t].t(r, a(e[t]) ? e[t] : i[t])
        }), r.pips = e.pips;
        var t = document.createElement("div"),
            o = void 0 !== t.style.msTransform,
            s = void 0 !== t.style.transform;
        r.transformRule = s ? "transform" : o ? "msTransform" : "webkitTransform";
        return r.style = [
            ["left", "top"],
            ["right", "bottom"]
        ][r.dir][r.ort], r
    }

    function j(t, b, o) {
        var l, u, s, c, i, a, e, p, f = window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : {
                start: "mousedown touchstart",
                move: "mousemove touchmove",
                end: "mouseup touchend"
            },
            d = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function() {
                var t = !1;
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: function() {
                            t = !0
                        }
                    });
                    window.addEventListener("test", null, e)
                } catch (t) {}
                return t
            }(),
            h = t,
            y = b.spectrum,
            x = [],
            S = [],
            m = [],
            g = 0,
            v = {},
            w = t.ownerDocument,
            E = b.documentElement || w.documentElement,
            C = w.body,
            P = -1,
            N = 0,
            k = 1,
            U = 2,
            A = "rtl" === w.dir || 1 === b.ort ? 0 : 100;

        function V(t, e) {
            var r = w.createElement("div");
            return e && ht(r, e), t.appendChild(r), r
        }

        function D(t, e) {
            var r = V(t, b.cssClasses.origin),
                n = V(r, b.cssClasses.handle);
            return V(n, b.cssClasses.touchArea), n.setAttribute("data-handle", e), b.keyboardSupport && (n.setAttribute("tabindex", "0"), n.addEventListener("keydown", function(t) {
                return function(t, e) {
                    if (O() || L(e)) return !1;
                    var r = ["Left", "Right"],
                        n = ["Down", "Up"],
                        i = ["PageDown", "PageUp"],
                        o = ["Home", "End"];
                    b.dir && !b.ort ? r.reverse() : b.ort && !b.dir && (n.reverse(), i.reverse());
                    var s, a = t.key.replace("Arrow", ""),
                        l = a === i[0],
                        u = a === i[1],
                        c = a === n[0] || a === r[0] || l,
                        p = a === n[1] || a === r[1] || u,
                        f = a === o[0],
                        d = a === o[1];
                    if (!(c || p || f || d)) return !0;
                    if (t.preventDefault(), p || c) {
                        var h = b.keyboardPageMultiplier,
                            m = c ? 0 : 1,
                            g = at(e),
                            v = g[m];
                        if (null === v) return !1;
                        !1 === v && (v = y.getDefaultStep(S[e], c, b.keyboardDefaultStep)), (u || l) && (v *= h), v = Math.max(v, 1e-7), v *= c ? -1 : 1, s = x[e] + v
                    } else s = d ? b.spectrum.xVal[b.spectrum.xVal.length - 1] : b.spectrum.xVal[0];
                    return rt(e, y.toStepping(s), !0, !0), J("slide", e), J("update", e), J("change", e), J("set", e), !1
                }(t, e)
            })), n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", b.ort ? "vertical" : "horizontal"), 0 === e ? ht(n, b.cssClasses.handleLower) : e === b.handles - 1 && ht(n, b.cssClasses.handleUpper), r
        }

        function M(t, e) {
            return !!e && V(t, b.cssClasses.connect)
        }

        function r(t, e) {
            return !!b.tooltips[e] && V(t.firstChild, b.cssClasses.tooltip)
        }

        function O() {
            return h.hasAttribute("disabled")
        }

        function L(t) {
            return u[t].hasAttribute("disabled")
        }

        function z() {
            i && (G("update.tooltips"), i.forEach(function(t) {
                t && ut(t)
            }), i = null)
        }

        function H() {
            z(), i = u.map(r), $("update.tooltips", function(t, e, r) {
                if (i[e]) {
                    var n = t[e];
                    !0 !== b.tooltips[e] && (n = b.tooltips[e].to(r[e])), i[e].innerHTML = n
                }
            })
        }

        function j(e, i, o) {
            var s = w.createElement("div"),
                a = [];
            a[N] = b.cssClasses.valueNormal, a[k] = b.cssClasses.valueLarge, a[U] = b.cssClasses.valueSub;
            var l = [];
            l[N] = b.cssClasses.markerNormal, l[k] = b.cssClasses.markerLarge, l[U] = b.cssClasses.markerSub;
            var u = [b.cssClasses.valueHorizontal, b.cssClasses.valueVertical],
                c = [b.cssClasses.markerHorizontal, b.cssClasses.markerVertical];

            function p(t, e) {
                var r = e === b.cssClasses.value,
                    n = r ? a : l;
                return e + " " + (r ? u : c)[b.ort] + " " + n[t]
            }
            return ht(s, b.cssClasses.pips), ht(s, 0 === b.ort ? b.cssClasses.pipsHorizontal : b.cssClasses.pipsVertical), Object.keys(e).forEach(function(t) {
                ! function(t, e, r) {
                    if ((r = i ? i(e, r) : r) !== P) {
                        var n = V(s, !1);
                        n.className = p(r, b.cssClasses.marker), n.style[b.style] = t + "%", N < r && ((n = V(s, !1)).className = p(r, b.cssClasses.value), n.setAttribute("data-value", e), n.style[b.style] = t + "%", n.innerHTML = o.to(e))
                    }
                }(t, e[t][0], e[t][1])
            }), s
        }

        function F() {
            c && (ut(c), c = null)
        }

        function R(t) {
            F();
            var m, g, v, b, e, r, x, S, w, n = t.mode,
                i = t.density || 1,
                o = t.filter || !1,
                s = function(t, e, r) {
                    if ("range" === t || "steps" === t) return y.xVal;
                    if ("count" === t) {
                        if (e < 2) throw new Error("noUiSlider (" + lt + "): 'values' (>= 2) required for mode 'count'.");
                        var n = e - 1,
                            i = 100 / n;
                        for (e = []; n--;) e[n] = n * i;
                        e.push(100), t = "positions"
                    }
                    return "positions" === t ? e.map(function(t) {
                        return y.fromStepping(r ? y.getStep(t) : t)
                    }) : "values" === t ? r ? e.map(function(t) {
                        return y.fromStepping(y.getStep(y.toStepping(t)))
                    }) : e : void 0
                }(n, t.values || !1, t.stepped || !1),
                a = (m = i, g = n, v = s, b = {}, e = y.xVal[0], r = y.xVal[y.xVal.length - 1], S = x = !1, w = 0, (v = v.slice().sort(function(t, e) {
                    return t - e
                }).filter(function(t) {
                    return !this[t] && (this[t] = !0)
                }, {}))[0] !== e && (v.unshift(e), x = !0), v[v.length - 1] !== r && (v.push(r), S = !0), v.forEach(function(t, e) {
                    var r, n, i, o, s, a, l, u, c, p, f = t,
                        d = v[e + 1],
                        h = "steps" === g;
                    if (h && (r = y.xNumSteps[e]), r || (r = d - f), !1 !== f)
                        for (void 0 === d && (d = f), r = Math.max(r, 1e-7), n = f; n <= d; n = (n + r).toFixed(7) / 1) {
                            for (u = (s = (o = y.toStepping(n)) - w) / m, p = s / (c = Math.round(u)), i = 1; i <= c; i += 1) b[(a = w + i * p).toFixed(5)] = [y.fromStepping(a), 0];
                            l = -1 < v.indexOf(n) ? k : h ? U : N, !e && x && n !== d && (l = 0), n === d && S || (b[o.toFixed(5)] = [n, l]), w = o
                        }
                }), b),
                l = t.format || {
                    to: Math.round
                };
            return c = h.appendChild(j(a, o, l))
        }

        function T() {
            var t = l.getBoundingClientRect(),
                e = "offset" + ["Width", "Height"][b.ort];
            return 0 === b.ort ? t.width || l[e] : t.height || l[e]
        }

        function B(n, i, o, s) {
            var e = function(t) {
                    return !!(t = function(t, e, r) {
                        var n, i, o = 0 === t.type.indexOf("touch"),
                            s = 0 === t.type.indexOf("mouse"),
                            a = 0 === t.type.indexOf("pointer");
                        0 === t.type.indexOf("MSPointer") && (a = !0);
                        if ("mousedown" === t.type && !t.buttons && !t.touches) return !1;
                        if (o) {
                            var l = function(t) {
                                return t.target === r || r.contains(t.target) || t.target.shadowRoot && t.target.shadowRoot.contains(r)
                            };
                            if ("touchstart" === t.type) {
                                var u = Array.prototype.filter.call(t.touches, l);
                                if (1 < u.length) return !1;
                                n = u[0].pageX, i = u[0].pageY
                            } else {
                                var c = Array.prototype.find.call(t.changedTouches, l);
                                if (!c) return !1;
                                n = c.pageX, i = c.pageY
                            }
                        }
                        e = e || gt(w), (s || a) && (n = t.clientX + e.x, i = t.clientY + e.y);
                        return t.pageOffset = e, t.points = [n, i], t.cursor = s || a, t
                    }(t, s.pageOffset, s.target || i)) && (!(O() && !s.doNotReject) && (e = h, r = b.cssClasses.tap, !((e.classList ? e.classList.contains(r) : new RegExp("\\b" + r + "\\b").test(e.className)) && !s.doNotReject) && (!(n === f.start && void 0 !== t.buttons && 1 < t.buttons) && ((!s.hover || !t.buttons) && (d || t.preventDefault(), t.calcPoint = t.points[b.ort], void o(t, s))))));
                    var e, r
                },
                r = [];
            return n.split(" ").forEach(function(t) {
                i.addEventListener(t, e, !!d && {
                    passive: !0
                }), r.push([t, e])
            }), r
        }

        function q(t) {
            var e, r, n, i, o, s, a = 100 * (t - (e = l, r = b.ort, n = e.getBoundingClientRect(), i = e.ownerDocument, o = i.documentElement, s = gt(i), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (s.x = 0), r ? n.top + s.y - o.clientTop : n.left + s.x - o.clientLeft)) / T();
            return a = ft(a), b.dir ? 100 - a : a
        }

        function X(t, e) {
            "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && _(t, e)
        }

        function Y(t, e) {
            if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return _(t, e);
            var r = (b.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
            Z(0 < r, 100 * r / e.baseSize, e.locations, e.handleNumbers)
        }

        function _(t, e) {
            e.handle && (mt(e.handle, b.cssClasses.active), g -= 1), e.listeners.forEach(function(t) {
                E.removeEventListener(t[0], t[1])
            }), 0 === g && (mt(h, b.cssClasses.drag), et(), t.cursor && (C.style.cursor = "", C.removeEventListener("selectstart", ct))), e.handleNumbers.forEach(function(t) {
                J("change", t), J("set", t), J("end", t)
            })
        }

        function I(t, e) {
            if (e.handleNumbers.some(L)) return !1;
            var r;
            1 === e.handleNumbers.length && (r = u[e.handleNumbers[0]].children[0], g += 1, ht(r, b.cssClasses.active));
            t.stopPropagation();
            var n = [],
                i = B(f.move, E, Y, {
                    target: t.target,
                    handle: r,
                    listeners: n,
                    startCalcPoint: t.calcPoint,
                    baseSize: T(),
                    pageOffset: t.pageOffset,
                    handleNumbers: e.handleNumbers,
                    buttonsProperty: t.buttons,
                    locations: S.slice()
                }),
                o = B(f.end, E, _, {
                    target: t.target,
                    handle: r,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers
                }),
                s = B("mouseout", E, X, {
                    target: t.target,
                    handle: r,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers
                });
            n.push.apply(n, i.concat(o, s)), t.cursor && (C.style.cursor = getComputedStyle(t.target).cursor, 1 < u.length && ht(h, b.cssClasses.drag), C.addEventListener("selectstart", ct, !1)), e.handleNumbers.forEach(function(t) {
                J("start", t)
            })
        }

        function n(t) {
            t.stopPropagation();
            var i, o, s, e = q(t.calcPoint),
                r = (i = e, s = !(o = 100), u.forEach(function(t, e) {
                    if (!L(e)) {
                        var r = S[e],
                            n = Math.abs(r - i);
                        (n < o || n <= o && r < i || 100 === n && 100 === o) && (s = e, o = n)
                    }
                }), s);
            if (!1 === r) return !1;
            b.events.snap || pt(h, b.cssClasses.tap, b.animationDuration), rt(r, e, !0, !0), et(), J("slide", r, !0), J("update", r, !0), J("change", r, !0), J("set", r, !0), b.events.snap && I(t, {
                handleNumbers: [r]
            })
        }

        function W(t) {
            var e = q(t.calcPoint),
                r = y.getStep(e),
                n = y.fromStepping(r);
            Object.keys(v).forEach(function(t) {
                "hover" === t.split(".")[0] && v[t].forEach(function(t) {
                    t.call(a, n)
                })
            })
        }

        function $(t, e) {
            v[t] = v[t] || [], v[t].push(e), "update" === t.split(".")[0] && u.forEach(function(t, e) {
                J("update", e)
            })
        }

        function G(t) {
            var n = t && t.split(".")[0],
                i = n && t.substring(n.length);
            Object.keys(v).forEach(function(t) {
                var e = t.split(".")[0],
                    r = t.substring(e.length);
                n && n !== e || i && i !== r || delete v[t]
            })
        }

        function J(r, n, i) {
            Object.keys(v).forEach(function(t) {
                var e = t.split(".")[0];
                r === e && v[t].forEach(function(t) {
                    t.call(a, x.map(b.format.to), n, x.slice(), i || !1, S.slice(), a)
                })
            })
        }

        function K(t, e, r, n, i, o) {
            var s;
            return 1 < u.length && !b.events.unconstrained && (n && 0 < e && (s = y.getAbsoluteDistance(t[e - 1], b.margin, 0), r = Math.max(r, s)), i && e < u.length - 1 && (s = y.getAbsoluteDistance(t[e + 1], b.margin, 1), r = Math.min(r, s))), 1 < u.length && b.limit && (n && 0 < e && (s = y.getAbsoluteDistance(t[e - 1], b.limit, 0), r = Math.min(r, s)), i && e < u.length - 1 && (s = y.getAbsoluteDistance(t[e + 1], b.limit, 1), r = Math.max(r, s))), b.padding && (0 === e && (s = y.getAbsoluteDistance(0, b.padding[0], 0), r = Math.max(r, s)), e === u.length - 1 && (s = y.getAbsoluteDistance(100, b.padding[1], 1), r = Math.min(r, s))), !((r = ft(r = y.getStep(r))) === t[e] && !o) && r
        }

        function Q(t, e) {
            var r = b.ort;
            return (r ? e : t) + ", " + (r ? t : e)
        }

        function Z(t, n, r, e) {
            var i = r.slice(),
                o = [!t, t],
                s = [t, !t];
            e = e.slice(), t && e.reverse(), 1 < e.length ? e.forEach(function(t, e) {
                var r = K(i, t, i[t] + n, o[e], s[e], !1);
                !1 === r ? n = 0 : (n = r - i[t], i[t] = r)
            }) : o = s = [!0];
            var a = !1;
            e.forEach(function(t, e) {
                a = rt(t, r[t] + n, o[e], s[e]) || a
            }), a && e.forEach(function(t) {
                J("update", t), J("slide", t)
            })
        }

        function tt(t, e) {
            return b.dir ? 100 - t - e : t
        }

        function et() {
            m.forEach(function(t) {
                var e = 50 < S[t] ? -1 : 1,
                    r = 3 + (u.length + e * t);
                u[t].style.zIndex = r
            })
        }

        function rt(t, e, r, n, i) {
            return i || (e = K(S, t, e, r, n, !1)), !1 !== e && (function(t, e) {
                S[t] = e, x[t] = y.fromStepping(e);
                var r = "translate(" + Q(10 * (tt(e, 0) - A) + "%", "0") + ")";
                u[t].style[b.transformRule] = r, nt(t), nt(t + 1)
            }(t, e), !0)
        }

        function nt(t) {
            if (s[t]) {
                var e = 0,
                    r = 100;
                0 !== t && (e = S[t - 1]), t !== s.length - 1 && (r = S[t]);
                var n = r - e,
                    i = "translate(" + Q(tt(e, n) + "%", "0") + ")",
                    o = "scale(" + Q(n / 100, "1") + ")";
                s[t].style[b.transformRule] = i + " " + o
            }
        }

        function it(t, e) {
            return null === t || !1 === t || void 0 === t ? S[e] : ("number" == typeof t && (t = String(t)), t = b.format.from(t), !1 === (t = y.toStepping(t)) || isNaN(t) ? S[e] : t)
        }

        function ot(t, e, r) {
            var n = dt(t),
                i = void 0 === S[0];
            e = void 0 === e || !!e, b.animate && !i && pt(h, b.cssClasses.tap, b.animationDuration), m.forEach(function(t) {
                rt(t, it(n[t], t), !0, !1, r)
            });
            for (var o = 1 === m.length ? 0 : 1; o < m.length; ++o) m.forEach(function(t) {
                rt(t, S[t], !0, !0, r)
            });
            et(), m.forEach(function(t) {
                J("update", t), null !== n[t] && e && J("set", t)
            })
        }

        function st() {
            var t = x.map(b.format.to);
            return 1 === t.length ? t[0] : t
        }

        function at(t) {
            var e = S[t],
                r = y.getNearbySteps(e),
                n = x[t],
                i = r.thisStep.step,
                o = null;
            if (b.snap) return [n - r.stepBefore.startValue || null, r.stepAfter.startValue - n || null];
            !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n), o = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep, 100 === e ? i = null : 0 === e && (o = null);
            var s = y.countStepDecimals();
            return null !== i && !1 !== i && (i = Number(i.toFixed(s))), null !== o && !1 !== o && (o = Number(o.toFixed(s))), [o, i]
        }
        return ht(e = h, b.cssClasses.target), 0 === b.dir ? ht(e, b.cssClasses.ltr) : ht(e, b.cssClasses.rtl), 0 === b.ort ? ht(e, b.cssClasses.horizontal) : ht(e, b.cssClasses.vertical), ht(e, "rtl" === getComputedStyle(e).direction ? b.cssClasses.textDirectionRtl : b.cssClasses.textDirectionLtr), l = V(e, b.cssClasses.base),
            function(t, e) {
                var r = V(e, b.cssClasses.connects);
                u = [], (s = []).push(M(r, t[0]));
                for (var n = 0; n < b.handles; n++) u.push(D(e, n)), m[n] = n, s.push(M(r, t[n + 1]))
            }(b.connect, l), (p = b.events).fixed || u.forEach(function(t, e) {
                B(f.start, t.children[0], I, {
                    handleNumbers: [e]
                })
            }), p.tap && B(f.start, l, n, {}), p.hover && B(f.move, l, W, {
                hover: !0
            }), p.drag && s.forEach(function(t, e) {
                if (!1 !== t && 0 !== e && e !== s.length - 1) {
                    var r = u[e - 1],
                        n = u[e],
                        i = [t];
                    ht(t, b.cssClasses.draggable), p.fixed && (i.push(r.children[0]), i.push(n.children[0])), i.forEach(function(t) {
                        B(f.start, t, I, {
                            handles: [r, n],
                            handleNumbers: [e - 1, e]
                        })
                    })
                }
            }), ot(b.start), b.pips && R(b.pips), b.tooltips && H(), $("update", function(t, e, s, r, a) {
                m.forEach(function(t) {
                    var e = u[t],
                        r = K(S, t, 0, !0, !0, !0),
                        n = K(S, t, 100, !0, !0, !0),
                        i = a[t],
                        o = b.ariaFormat.to(s[t]);
                    r = y.fromStepping(r).toFixed(1), n = y.fromStepping(n).toFixed(1), i = y.fromStepping(i).toFixed(1), e.children[0].setAttribute("aria-valuemin", r), e.children[0].setAttribute("aria-valuemax", n), e.children[0].setAttribute("aria-valuenow", i), e.children[0].setAttribute("aria-valuetext", o)
                })
            }), a = {
                destroy: function() {
                    for (var t in b.cssClasses) b.cssClasses.hasOwnProperty(t) && mt(h, b.cssClasses[t]);
                    for (; h.firstChild;) h.removeChild(h.firstChild);
                    delete h.noUiSlider
                },
                steps: function() {
                    return m.map(at)
                },
                on: $,
                off: G,
                get: st,
                set: ot,
                setHandle: function(t, e, r, n) {
                    if (!(0 <= (t = Number(t)) && t < m.length)) throw new Error("noUiSlider (" + lt + "): invalid handle number, got: " + t);
                    rt(t, it(e, t), !0, !0, n), J("update", t), r && J("set", t)
                },
                reset: function(t) {
                    ot(b.start, t)
                },
                __moveHandles: function(t, e, r) {
                    Z(t, e, S, r)
                },
                options: o,
                updateOptions: function(e, t) {
                    var r = st(),
                        n = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
                    n.forEach(function(t) {
                        void 0 !== e[t] && (o[t] = e[t])
                    });
                    var i = vt(o);
                    n.forEach(function(t) {
                        void 0 !== e[t] && (b[t] = i[t])
                    }), y = i.spectrum, b.margin = i.margin, b.limit = i.limit, b.padding = i.padding, b.pips ? R(b.pips) : F(), b.tooltips ? H() : z(), S = [], ot(e.start || r, t)
                },
                target: h,
                removePips: F,
                removeTooltips: z,
                getTooltips: function() {
                    return i
                },
                getOrigins: function() {
                    return u
                },
                pips: R
            }
    }
    return {
        __spectrum: i,
        version: lt,
        cssClasses: d,
        create: function(t, e) {
            if (!t || !t.nodeName) throw new Error("noUiSlider (" + lt + "): create requires a single element, got: " + t);
            if (t.noUiSlider) throw new Error("noUiSlider (" + lt + "): Slider was already initialized.");
            var r = j(t, vt(e), e);
            return t.noUiSlider = r
        }
    }
});

/* ==== INCLUDE: /js/blocks/forms.js ==== */

;
(function() {


    function processSubmitResponse(origForm, html) {

        const targetFormEl = origForm.querySelector('[name=__targetForm]')
        if (!targetFormEl) {
            console.error("Failed to find __targetForm")
            return
        }

        const targetForm = targetFormEl.getAttribute('value')

        const htmlFragment = _G.createFragment(html)

        const newTargetFormEl = htmlFragment.querySelector('[name=__targetForm][value="' + targetForm + '"]')

        if (!newTargetFormEl) {
            console.error("Failed to find targetForm in the returned response")
            return
        }
        const newForm = newTargetFormEl.closest('form')
        // const newForm = _G.createFragment( html ).querySelector('form')
        newForm.querySelectorAll('.form-error').forEach(el => {
            el.remove()
        })
        origForm.parentElement.replaceChild(newForm, origForm)

        setTimeout(function() {
            const firstError = newForm.querySelector('.control-error')
            if (firstError) {
                const top = firstError.getBoundingClientRect().top
                if (top < 0) {
                    window.scrollTo({
                        top: window.scrollY + top - 100,
                        behavior: 'smooth'
                    })
                }
            }
        }, 50)
    }

    _G.onSubmitForm = (form, customCallback) => {

        let submitting = true

        function submitFeedback(form) {
            setTimeout(() => {

                if (!submitting) {
                    return
                }
                const submit = form.querySelector('[type=submit]')
                if (submit) {
                    // const submitText = submit.innerText;
                    // submit.setAttribute('data-submit-text', submitText )
                    // submit.innerText = 'Sending'
                    submit.classList.add('submitting')
                    submit.setAttribute('disabled', 'disabled')
                }
            }, 100)
        }

        function undoSubmitFeedback(form) {
            // note that we are passing our original form, not the new replaced form
            // so this will only fire if there was a network issue and no form
            // arrived back; otherwise, the new form would have had reset submit anyways
            const submit = form.querySelector('[type=submit]')
            if (submit) {
                // submit.innerText = submit.getAttribute('data-submit-text')
                submit.classList.remove('submitting')
                submit.removeAttribute('disabled')
            }
        }

        let authTk = form.getAttribute('data-tk')
        if (!authTk) {
            // try hidden
            const hidden = form.querySelector('input[name=__sh]')
            if (hidden) {
                authTk = hidden.getAttribute('value')
            }
            if (!authTk) {
                // bail
                console.error('auth token missing')
                return
            }
        }

        const data = new URLSearchParams()
        for (const pair of new FormData(form)) {
            data.append(pair[0], pair[1].toString())
        }
        data.append('__src_url', window.location.href)
        data.append('__sh', authTk)

        submitFeedback(form)

        setTimeout(() => {
            fetch(window.location.href, {
                method: 'post',
                body: data,
                headers: {
                    'X-Requested-With': 'fetch',
                    'X-Form-Submit': 'true',
                    'X-Form-Submit-From': window.location.href,
                }
            }).then(response => {
                if (customCallback) {
                    return customCallback(response)
                }
                const redir = response.headers.get('Location')
                if (redir) {
                    return window.location = redir
                }
                response.text().then(html => {
                    // console.log( 'form html', html )

                    const error = response.headers.get('X-Form-Error')
                    const successURL = response.headers.get('X-Success-URL')
                    const success = response.headers.get('X-Success-Message')

                    if (!error && success && successURL) {
                        window.location = successURL
                        return
                    }

                    processSubmitResponse(form, html)

                    if (error) {
                        _G.quickMessage(error, {
                            error: true
                        });
                    } else if (success) {
                        _G.quickMessage(success)

                        if (window.dataLayer) {
                            window.dataLayer.push({
                                event: 'formSubmitted',
                                formURL: window.location.href,
                                title: document.title,
                                formName: data.get('__formName') || ''
                            })
                        }
                    }
                })
            }).catch(err => {
                console.error("error occurred during form submission", err)
                _G.quickMessage('Error occurred during form submission', {
                    error: true
                });
            }).finally(() => {
                submitting = false
                undoSubmitFeedback(form)
            })
        }, 1000)


        return false;
    }


    function processBlogCommentSubmitResponse(origForm, html) {

        const formID = origForm.getAttribute("id");

        const htmlFragment = _G.createFragment(html)

        const newForm = htmlFragment.querySelector('#' + formID)

        // const successEl = newForm.querySelector(".form-success");
        // if( successEl && successEl.innerText ) {
        //     const message = successEl.innerText;
        //     setTimeout(() => {
        //         _G.quickMessage( message, {
        //
        //         });
        //     }, 100 );
        //     successEl.remove();
        // }

        // const newForm = _G.createFragment( html ).querySelector('form')
        newForm.querySelectorAll('.form-error').forEach(el => {
            el.remove()
        })
        const authTk = newForm.getAttribute("data-tk");
        if (authTk) {
            const authTkEl = document.createElement("input");
            authTkEl.setAttribute("type", "hidden");
            authTkEl.setAttribute("value", authTk);
            newForm.appendChild(authTkEl);
        }
        const srcUrlEl = document.createElement("input");
        srcUrlEl.setAttribute("type", "hidden");
        srcUrlEl.setAttribute("value", window.location.href);
        newForm.appendChild(srcUrlEl);
        origForm.parentElement.replaceChild(newForm, origForm);


        setTimeout(function() {
            const firstError = newForm.querySelector('.control-error')
            if (firstError) {
                const top = firstError.getBoundingClientRect().top
                if (top < 0) {
                    window.scrollTo({
                        top: window.scrollY + top - 100,
                        behavior: 'smooth'
                    })
                }
            }
        }, 50)
    }

    _G.onBlogCommentSubmitForm = (form, customCallback) => {

        let submitting = true

        function submitFeedback(form) {
            setTimeout(() => {

                if (!submitting) {
                    return
                }
                const submit = form.querySelector('[type=submit]')
                if (submit) {
                    // const submitText = submit.innerText;
                    // submit.setAttribute('data-submit-text', submitText )
                    // submit.innerText = 'Sending'
                    submit.classList.add('submitting')
                    submit.setAttribute('disabled', 'disabled')
                }
            }, 100)
        }

        function undoSubmitFeedback(form) {
            // note that we are passing our original form, not the new replaced form
            // so this will only fire if there was a network issue and no form
            // arrived back; otherwise, the new form would have had reset submit anyways
            const submit = form.querySelector('[type=submit]')
            if (submit) {
                // submit.innerText = submit.getAttribute('data-submit-text')
                submit.classList.remove('submitting')
                submit.removeAttribute('disabled')
            }
        }

        let authTk = form.getAttribute('data-tk')
        if (!authTk) {
            // try hidden
            const hidden = form.querySelector('input[name=__sh]')
            if (hidden) {
                authTk = hidden.getAttribute('value')
            }
            if (!authTk) {
                // bail
                console.error('auth token missing')
                return
            }
        }

        const data = new URLSearchParams()
        for (const pair of new FormData(form)) {
            data.append(pair[0], pair[1].toString())
        }
        data.append('__src_url', window.location.href)
        data.append('__sh', authTk)

        submitFeedback(form)

        setTimeout(() => {
            fetch(window.location.href, {
                method: 'post',
                body: data,
                headers: {
                    'X-Requested-With': 'fetch',
                    'X-Form-Submit': 'true',
                    'X-Form-Submit-From': window.location.href,
                }
            }).then(response => {
                if (customCallback) {
                    return customCallback(response)
                }
                const redir = response.headers.get('Location')
                if (redir) {
                    return window.location = redir
                }
                response.text().then(html => {
                    // console.log( 'form html', html )

                    const error = response.headers.get('X-Form-Error')
                    const successURL = response.headers.get('X-Success-URL')
                    const success = true;
                    // const success = "Comment submitted. It will be reviewed and published shortly."

                    if (!error && success && successURL) {
                        window.location = successURL
                        return
                    }

                    processBlogCommentSubmitResponse(form, html)

                    if (error) {
                        _G.quickMessage(error, {
                            error: true
                        });
                    } else {
                        // _G.quickMessage(success)

                        if (window.dataLayer) {
                            window.dataLayer.push({
                                event: 'formSubmitted',
                                formURL: window.location.href,
                                title: document.title,
                                formName: data.get('__formName') || ''
                            })
                        }
                    }
                })
            }).catch(err => {
                console.error("error occurred during form submission", err)
                _G.quickMessage('Error occurred during form submission', {
                    error: true
                });
            }).finally(() => {
                submitting = false
                undoSubmitFeedback(form)
            })
        }, 1000)


        return false;
    }
})()