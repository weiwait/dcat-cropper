(()=>{
        var qe = !1
            , Ue = !1
            , F = [];
        function kt(e) {
            tn(e)
        }
        function tn(e) {
            F.includes(e) || F.push(e),
                rn()
        }
        function he(e) {
            let t = F.indexOf(e);
            t !== -1 && F.splice(t, 1)
        }
        function rn() {
            !Ue && !qe && (qe = !0,
                queueMicrotask(nn))
        }
        function nn() {
            qe = !1,
                Ue = !0;
            for (let e = 0; e < F.length; e++)
                F[e]();
            F.length = 0,
                Ue = !1
        }
        var A, K, Y, We, Ge = !0;
        function It(e) {
            Ge = !1,
                e(),
                Ge = !0
        }
        function Pt(e) {
            A = e.reactive,
                Y = e.release,
                K = t=>e.effect(t, {
                    scheduler: r=>{
                        Ge ? kt(r) : r()
                    }
                }),
                We = e.raw
        }
        function Ye(e) {
            K = e
        }
        function Dt(e) {
            let t = ()=>{}
            ;
            return [n=>{
                let i = K(n);
                e._x_effects || (e._x_effects = new Set,
                        e._x_runEffects = ()=>{
                            e._x_effects.forEach(o=>o())
                        }
                ),
                    e._x_effects.add(i),
                    t = ()=>{
                        i !== void 0 && (e._x_effects.delete(i),
                            Y(i))
                    }
            }
                , ()=>{
                    t()
                }
            ]
        }
        var $t = []
            , Lt = []
            , jt = [];
        function Ft(e) {
            jt.push(e)
        }
        function _e(e, t) {
            typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []),
                e._x_cleanups.push(t)) : (t = e,
                Lt.push(t))
        }
        function Kt(e) {
            $t.push(e)
        }
        function Bt(e, t, r) {
            e._x_attributeCleanups || (e._x_attributeCleanups = {}),
            e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
                e._x_attributeCleanups[t].push(r)
        }
        function Je(e, t) {
            !e._x_attributeCleanups || Object.entries(e._x_attributeCleanups).forEach(([r,n])=>{
                    (t === void 0 || t.includes(r)) && (n.forEach(i=>i()),
                        delete e._x_attributeCleanups[r])
                }
            )
        }
        var Qe = new MutationObserver(Ze)
            , Xe = !1;
        function et() {
            Qe.observe(document, {
                subtree: !0,
                childList: !0,
                attributes: !0,
                attributeOldValue: !0
            }),
                Xe = !0
        }
        function sn() {
            on(),
                Qe.disconnect(),
                Xe = !1
        }
        var te = []
            , tt = !1;
        function on() {
            te = te.concat(Qe.takeRecords()),
            te.length && !tt && (tt = !0,
                queueMicrotask(()=>{
                        an(),
                            tt = !1
                    }
                ))
        }
        function an() {
            Ze(te),
                te.length = 0
        }
        function m(e) {
            if (!Xe)
                return e();
            sn();
            let t = e();
            return et(),
                t
        }
        var rt = !1
            , ge = [];
        function zt() {
            rt = !0
        }
        function Vt() {
            rt = !1,
                Ze(ge),
                ge = []
        }
        function Ze(e) {
            if (rt) {
                ge = ge.concat(e);
                return
            }
            let t = []
                , r = []
                , n = new Map
                , i = new Map;
            for (let o = 0; o < e.length; o++)
                if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].addedNodes.forEach(s=>s.nodeType === 1 && t.push(s)),
                    e[o].removedNodes.forEach(s=>s.nodeType === 1 && r.push(s))),
                e[o].type === "attributes")) {
                    let s = e[o].target
                        , a = e[o].attributeName
                        , c = e[o].oldValue
                        , l = ()=>{
                            n.has(s) || n.set(s, []),
                                n.get(s).push({
                                    name: a,
                                    value: s.getAttribute(a)
                                })
                        }
                        , u = ()=>{
                            i.has(s) || i.set(s, []),
                                i.get(s).push(a)
                        }
                    ;
                    s.hasAttribute(a) && c === null ? l() : s.hasAttribute(a) ? (u(),
                        l()) : u()
                }
            i.forEach((o,s)=>{
                    Je(s, o)
                }
            ),
                n.forEach((o,s)=>{
                        $t.forEach(a=>a(s, o))
                    }
                );
            for (let o of r)
                if (!t.includes(o) && (Lt.forEach(s=>s(o)),
                    o._x_cleanups))
                    for (; o._x_cleanups.length; )
                        o._x_cleanups.pop()();
            t.forEach(o=>{
                    o._x_ignoreSelf = !0,
                        o._x_ignore = !0
                }
            );
            for (let o of t)
                r.includes(o) || !o.isConnected || (delete o._x_ignoreSelf,
                    delete o._x_ignore,
                    jt.forEach(s=>s(o)),
                    o._x_ignore = !0,
                    o._x_ignoreSelf = !0);
            t.forEach(o=>{
                    delete o._x_ignoreSelf,
                        delete o._x_ignore
                }
            ),
                t = null,
                r = null,
                n = null,
                i = null
        }
        function xe(e) {
            return I(k(e))
        }
        function T(e, t, r) {
            return e._x_dataStack = [t, ...k(r || e)],
                ()=>{
                    e._x_dataStack = e._x_dataStack.filter(n=>n !== t)
                }
        }
        function nt(e, t) {
            let r = e._x_dataStack[0];
            Object.entries(t).forEach(([n,i])=>{
                    r[n] = i
                }
            )
        }
        function k(e) {
            return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? k(e.host) : e.parentNode ? k(e.parentNode) : []
        }
        function I(e) {
            let t = new Proxy({},{
                ownKeys: ()=>Array.from(new Set(e.flatMap(r=>Object.keys(r)))),
                has: (r,n)=>e.some(i=>i.hasOwnProperty(n)),
                get: (r,n)=>(e.find(i=>{
                        if (i.hasOwnProperty(n)) {
                            let o = Object.getOwnPropertyDescriptor(i, n);
                            if (o.get && o.get._x_alreadyBound || o.set && o.set._x_alreadyBound)
                                return !0;
                            if ((o.get || o.set) && o.enumerable) {
                                let s = o.get
                                    , a = o.set
                                    , c = o;
                                s = s && s.bind(t),
                                    a = a && a.bind(t),
                                s && (s._x_alreadyBound = !0),
                                a && (a._x_alreadyBound = !0),
                                    Object.defineProperty(i, n, {
                                        ...c,
                                        get: s,
                                        set: a
                                    })
                            }
                            return !0
                        }
                        return !1
                    }
                ) || {})[n],
                set: (r,n,i)=>{
                    let o = e.find(s=>s.hasOwnProperty(n));
                    return o ? o[n] = i : e[e.length - 1][n] = i,
                        !0
                }
            });
            return t
        }
        function ye(e) {
            let t = n=>typeof n == "object" && !Array.isArray(n) && n !== null
                , r = (n,i="")=>{
                    Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([o,{value: s, enumerable: a}])=>{
                            if (a === !1 || s === void 0)
                                return;
                            let c = i === "" ? o : `${i}.${o}`;
                            typeof s == "object" && s !== null && s._x_interceptor ? n[o] = s.initialize(e, c, o) : t(s) && s !== n && !(s instanceof Element) && r(s, c)
                        }
                    )
                }
            ;
            return r(e)
        }
        function be(e, t=()=>{}
        ) {
            let r = {
                initialValue: void 0,
                _x_interceptor: !0,
                initialize(n, i, o) {
                    return e(this.initialValue, ()=>cn(n, i), s=>it(n, i, s), i, o)
                }
            };
            return t(r),
                n=>{
                    if (typeof n == "object" && n !== null && n._x_interceptor) {
                        let i = r.initialize.bind(r);
                        r.initialize = (o,s,a)=>{
                            let c = n.initialize(o, s, a);
                            return r.initialValue = c,
                                i(o, s, a)
                        }
                    } else
                        r.initialValue = n;
                    return r
                }
        }
        function cn(e, t) {
            return t.split(".").reduce((r,n)=>r[n], e)
        }
        function it(e, t, r) {
            if (typeof t == "string" && (t = t.split(".")),
            t.length === 1)
                e[t[0]] = r;
            else {
                if (t.length === 0)
                    throw error;
                return e[t[0]] || (e[t[0]] = {}),
                    it(e[t[0]], t.slice(1), r)
            }
        }
        var Ht = {};
        function y(e, t) {
            Ht[e] = t
        }
        function re(e, t) {
            return Object.entries(Ht).forEach(([r,n])=>{
                    Object.defineProperty(e, `$${r}`, {
                        get() {
                            let[i,o] = ot(t);
                            return i = {
                                interceptor: be,
                                ...i
                            },
                                _e(t, o),
                                n(t, i)
                        },
                        enumerable: !1
                    })
                }
            ),
                e
        }
        function qt(e, t, r, ...n) {
            try {
                return r(...n)
            } catch (i) {
                J(i, e, t)
            }
        }
        function J(e, t, r=void 0) {
            Object.assign(e, {
                el: t,
                expression: r
            }),
                console.warn(`Weiwait Alpine Expression Error: ${e.message}

${r ? 'Expression: "' + r + `"

` : ""}`, t),
                setTimeout(()=>{
                        throw e
                    }
                    , 0)
        }
        function N(e, t, r={}) {
            let n;
            return g(e, t)(i=>n = i, r),
                n
        }
        function g(...e) {
            return Ut(...e)
        }
        var Ut = st;
        function Wt(e) {
            Ut = e
        }
        function st(e, t) {
            let r = {};
            re(r, e);
            let n = [r, ...k(e)];
            if (typeof t == "function")
                return ln(n, t);
            let i = un(n, t, e);
            return qt.bind(null, e, t, i)
        }
        function ln(e, t) {
            return (r=()=>{}
                ,{scope: n={}, params: i=[]}={})=>{
                let o = t.apply(I([n, ...e]), i);
                ve(r, o)
            }
        }
        var at = {};
        function fn(e, t) {
            if (at[e])
                return at[e];
            let r = Object.getPrototypeOf(async function() {}).constructor
                , n = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e
                , o = (()=>{
                    try {
                        return new r(["__self", "scope"],`with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`)
                    } catch (s) {
                        return J(s, t, e),
                            Promise.resolve()
                    }
                }
            )();
            return at[e] = o,
                o
        }
        function un(e, t, r) {
            let n = fn(t, r);
            return (i=()=>{}
                ,{scope: o={}, params: s=[]}={})=>{
                n.result = void 0,
                    n.finished = !1;
                let a = I([o, ...e]);
                if (typeof n == "function") {
                    let c = n(n, a).catch(l=>J(l, r, t));
                    n.finished ? (ve(i, n.result, a, s, r),
                        n.result = void 0) : c.then(l=>{
                            ve(i, l, a, s, r)
                        }
                    ).catch(l=>J(l, r, t)).finally(()=>n.result = void 0)
                }
            }
        }
        function ve(e, t, r, n, i) {
            if (typeof t == "function") {
                let o = t.apply(r, n);
                o instanceof Promise ? o.then(s=>ve(e, s, r, n)).catch(s=>J(s, i, t)) : e(o)
            } else
                e(t)
        }
        var ct = "x-";
        function w(e="") {
            return ct + e
        }
        function Gt(e) {
            ct = e
        }
        var Yt = {};
        function p(e, t) {
            Yt[e] = t
        }
        function ne(e, t, r) {
            let n = {};
            return Array.from(t).map(Jt((o,s)=>n[o] = s)).filter(Zt).map(pn(n, r)).sort(mn).map(o=>dn(e, o))
        }
        function Qt(e) {
            return Array.from(e).map(Jt()).filter(t=>!Zt(t))
        }
        var lt = !1
            , ie = new Map
            , Xt = Symbol();
        function er(e) {
            lt = !0;
            let t = Symbol();
            Xt = t,
                ie.set(t, []);
            let r = ()=>{
                    for (; ie.get(t).length; )
                        ie.get(t).shift()();
                    ie.delete(t)
                }
                , n = ()=>{
                    lt = !1,
                        r()
                }
            ;
            e(r),
                n()
        }
        function ot(e) {
            let t = []
                , r = a=>t.push(a)
                , [n,i] = Dt(e);
            return t.push(i),
                [{
                    WeiwaitAlpine: P,
                    effect: n,
                    cleanup: r,
                    evaluateLater: g.bind(g, e),
                    evaluate: N.bind(N, e)
                }, ()=>t.forEach(a=>a())]
        }
        function dn(e, t) {
            let r = ()=>{}
                , n = Yt[t.type] || r
                , [i,o] = ot(e);
            Bt(e, t.original, o);
            let s = ()=>{
                    e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, i),
                        n = n.bind(n, e, t, i),
                        lt ? ie.get(Xt).push(n) : n())
                }
            ;
            return s.runCleanups = o,
                s
        }
        var we = (e,t)=>({name: r, value: n})=>(r.startsWith(e) && (r = r.replace(e, t)),
            {
                name: r,
                value: n
            })
            , Ee = e=>e;
        function Jt(e=()=>{}
        ) {
            return ({name: t, value: r})=>{
                let {name: n, value: i} = tr.reduce((o,s)=>s(o), {
                    name: t,
                    value: r
                });
                return n !== t && e(n, t),
                    {
                        name: n,
                        value: i
                    }
            }
        }
        var tr = [];
        function Z(e) {
            tr.push(e)
        }
        function Zt({name: e}) {
            return rr().test(e)
        }
        var rr = ()=>new RegExp(`^${ct}([^:^.]+)\\b`);
        function pn(e, t) {
            return ({name: r, value: n})=>{
                let i = r.match(rr())
                    , o = r.match(/:([a-zA-Z0-9\-:]+)/)
                    , s = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || []
                    , a = t || e[r] || r;
                return {
                    type: i ? i[1] : null,
                    value: o ? o[1] : null,
                    modifiers: s.map(c=>c.replace(".", "")),
                    expression: n,
                    original: a
                }
            }
        }
        var ut = "DEFAULT"
            , Se = ["ignore", "ref", "data2", "id", "bind", "init2", "for", "model", "modelable", "transition", "show", "if", ut, "teleport", "element"];
        function mn(e, t) {
            let r = Se.indexOf(e.type) === -1 ? ut : e.type
                , n = Se.indexOf(t.type) === -1 ? ut : t.type;
            return Se.indexOf(r) - Se.indexOf(n)
        }
        function B(e, t, r={}) {
            e.dispatchEvent(new CustomEvent(t,{
                detail: r,
                bubbles: !0,
                composed: !0,
                cancelable: !0
            }))
        }
        var ft = []
            , dt = !1;
        function Oe(e) {
            ft.push(e),
                queueMicrotask(()=>{
                        dt || setTimeout(()=>{
                                Ae()
                            }
                        )
                    }
                )
        }
        function Ae() {
            for (dt = !1; ft.length; )
                ft.shift()()
        }
        function nr() {
            dt = !0
        }
        function C(e, t) {
            if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
                Array.from(e.children).forEach(i=>C(i, t));
                return
            }
            let r = !1;
            if (t(e, ()=>r = !0),
                r)
                return;
            let n = e.firstElementChild;
            for (; n; )
                C(n, t, !1),
                    n = n.nextElementSibling
        }
        function z(e, ...t) {
            console.warn(`Weiwait Alpine Warning: ${e}`, ...t)
        }
        function or() {
            document.body || z("Unable to initialize. Trying to load Weiwait Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),
                B(document, "weiwait.alpine:init"),
                B(document, "weiwait.alpine:initializing"),
                et(),
                Ft(t=>E(t, C)),
                _e(t=>hn(t)),
                Kt((t,r)=>{
                        ne(t, r).forEach(n=>n())
                    }
                );
            let e = t=>!V(t.parentElement, !0);
            Array.from(document.querySelectorAll(ir())).filter(e).forEach(t=>{
                    E(t)
                }
            ),
                B(document, "weiwait.alpine:initialized")
        }
        var pt = []
            , sr = [];
        function ar() {
            return pt.map(e=>e())
        }
        function ir() {
            return pt.concat(sr).map(e=>e())
        }
        function Te(e) {
            pt.push(e)
        }
        function Ce(e) {
            sr.push(e)
        }
        function V(e, t=!1) {
            return Q(e, r=>{
                    if ((t ? ir() : ar()).some(i=>r.matches(i)))
                        return !0
                }
            )
        }
        function Q(e, t) {
            if (!!e) {
                if (t(e))
                    return e;
                if (e._x_teleportBack && (e = e._x_teleportBack),
                    !!e.parentElement)
                    return Q(e.parentElement, t)
            }
        }
        function cr(e) {
            return ar().some(t=>e.matches(t))
        }
        function E(e, t=C) {
            er(()=>{
                    t(e, (r,n)=>{
                            ne(r, r.attributes).forEach(i=>i()),
                            r._x_ignore && n()
                        }
                    )
                }
            )
        }
        function hn(e) {
            C(e, t=>Je(t))
        }
        function oe(e, t) {
            return Array.isArray(t) ? lr(e, t.join(" ")) : typeof t == "object" && t !== null ? _n(e, t) : typeof t == "function" ? oe(e, t()) : lr(e, t)
        }
        function lr(e, t) {
            let r = o=>o.split(" ").filter(Boolean)
                , n = o=>o.split(" ").filter(s=>!e.classList.contains(s)).filter(Boolean)
                , i = o=>(e.classList.add(...o),
                    ()=>{
                        e.classList.remove(...o)
                    }
            );
            return t = t === !0 ? t = "" : t || "",
                i(n(t))
        }
        function _n(e, t) {
            let r = a=>a.split(" ").filter(Boolean)
                , n = Object.entries(t).flatMap(([a,c])=>c ? r(a) : !1).filter(Boolean)
                , i = Object.entries(t).flatMap(([a,c])=>c ? !1 : r(a)).filter(Boolean)
                , o = []
                , s = [];
            return i.forEach(a=>{
                    e.classList.contains(a) && (e.classList.remove(a),
                        s.push(a))
                }
            ),
                n.forEach(a=>{
                        e.classList.contains(a) || (e.classList.add(a),
                            o.push(a))
                    }
                ),
                ()=>{
                    s.forEach(a=>e.classList.add(a)),
                        o.forEach(a=>e.classList.remove(a))
                }
        }
        function H(e, t) {
            return typeof t == "object" && t !== null ? gn(e, t) : xn(e, t)
        }
        function gn(e, t) {
            let r = {};
            return Object.entries(t).forEach(([n,i])=>{
                    r[n] = e.style[n],
                    n.startsWith("--") || (n = yn(n)),
                        e.style.setProperty(n, i)
                }
            ),
                setTimeout(()=>{
                        e.style.length === 0 && e.removeAttribute("style")
                    }
                ),
                ()=>{
                    H(e, r)
                }
        }
        function xn(e, t) {
            let r = e.getAttribute("style", t);
            return e.setAttribute("style", t),
                ()=>{
                    e.setAttribute("style", r || "")
                }
        }
        function yn(e) {
            return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
        }
        function se(e, t=()=>{}
        ) {
            let r = !1;
            return function() {
                r ? t.apply(this, arguments) : (r = !0,
                    e.apply(this, arguments))
            }
        }
        p("transition", (e,{value: t, modifiers: r, expression: n},{evaluate: i})=>{
                typeof n == "function" && (n = i(n)),
                    n ? bn(e, n, t) : vn(e, r, t)
            }
        );
        function bn(e, t, r) {
            ur(e, oe, ""),
                {
                    enter: i=>{
                        e._x_transition.enter.during = i
                    }
                    ,
                    "enter-start": i=>{
                        e._x_transition.enter.start = i
                    }
                    ,
                    "enter-end": i=>{
                        e._x_transition.enter.end = i
                    }
                    ,
                    leave: i=>{
                        e._x_transition.leave.during = i
                    }
                    ,
                    "leave-start": i=>{
                        e._x_transition.leave.start = i
                    }
                    ,
                    "leave-end": i=>{
                        e._x_transition.leave.end = i
                    }
                }[r](t)
        }
        function vn(e, t, r) {
            ur(e, H);
            let n = !t.includes("in") && !t.includes("out") && !r
                , i = n || t.includes("in") || ["enter"].includes(r)
                , o = n || t.includes("out") || ["leave"].includes(r);
            t.includes("in") && !n && (t = t.filter((h,b)=>b < t.indexOf("out"))),
            t.includes("out") && !n && (t = t.filter((h,b)=>b > t.indexOf("out")));
            let s = !t.includes("opacity") && !t.includes("scale")
                , a = s || t.includes("opacity")
                , c = s || t.includes("scale")
                , l = a ? 0 : 1
                , u = c ? ae(t, "scale", 95) / 100 : 1
                , d = ae(t, "delay", 0)
                , x = ae(t, "origin", "center")
                , M = "opacity, transform"
                , W = ae(t, "duration", 150) / 1e3
                , pe = ae(t, "duration", 75) / 1e3
                , f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
            i && (e._x_transition.enter.during = {
                transformOrigin: x,
                transitionDelay: d,
                transitionProperty: M,
                transitionDuration: `${W}s`,
                transitionTimingFunction: f
            },
                e._x_transition.enter.start = {
                    opacity: l,
                    transform: `scale(${u})`
                },
                e._x_transition.enter.end = {
                    opacity: 1,
                    transform: "scale(1)"
                }),
            o && (e._x_transition.leave.during = {
                transformOrigin: x,
                transitionDelay: d,
                transitionProperty: M,
                transitionDuration: `${pe}s`,
                transitionTimingFunction: f
            },
                e._x_transition.leave.start = {
                    opacity: 1,
                    transform: "scale(1)"
                },
                e._x_transition.leave.end = {
                    opacity: l,
                    transform: `scale(${u})`
                })
        }
        function ur(e, t, r={}) {
            e._x_transition || (e._x_transition = {
                enter: {
                    during: r,
                    start: r,
                    end: r
                },
                leave: {
                    during: r,
                    start: r,
                    end: r
                },
                in(n=()=>{}
                    , i=()=>{}
                ) {
                    Re(e, t, {
                        during: this.enter.during,
                        start: this.enter.start,
                        end: this.enter.end
                    }, n, i)
                },
                out(n=()=>{}
                    , i=()=>{}
                ) {
                    Re(e, t, {
                        during: this.leave.during,
                        start: this.leave.start,
                        end: this.leave.end
                    }, n, i)
                }
            })
        }
        window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, r, n) {
            let i = ()=>{
                    document.visibilityState === "visible" ? requestAnimationFrame(r) : setTimeout(r)
                }
            ;
            if (t) {
                e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(r) : i() : e._x_transition ? e._x_transition.in(r) : i();
                return
            }
            e._x_hidePromise = e._x_transition ? new Promise((o,s)=>{
                    e._x_transition.out(()=>{}
                        , ()=>o(n)),
                        e._x_transitioning.beforeCancel(()=>s({
                            isFromCancelledTransition: !0
                        }))
                }
            ) : Promise.resolve(n),
                queueMicrotask(()=>{
                        let o = fr(e);
                        o ? (o._x_hideChildren || (o._x_hideChildren = []),
                            o._x_hideChildren.push(e)) : queueMicrotask(()=>{
                                let s = a=>{
                                        let c = Promise.all([a._x_hidePromise, ...(a._x_hideChildren || []).map(s)]).then(([l])=>l());
                                        return delete a._x_hidePromise,
                                            delete a._x_hideChildren,
                                            c
                                    }
                                ;
                                s(e).catch(a=>{
                                        if (!a.isFromCancelledTransition)
                                            throw a
                                    }
                                )
                            }
                        )
                    }
                )
        }
        ;
        function fr(e) {
            let t = e.parentNode;
            if (!!t)
                return t._x_hidePromise ? t : fr(t)
        }
        function Re(e, t, {during: r, start: n, end: i}={}, o=()=>{}
            , s=()=>{}
        ) {
            if (e._x_transitioning && e._x_transitioning.cancel(),
            Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0) {
                o(),
                    s();
                return
            }
            let a, c, l;
            wn(e, {
                start() {
                    a = t(e, n)
                },
                during() {
                    c = t(e, r)
                },
                before: o,
                end() {
                    a(),
                        l = t(e, i)
                },
                after: s,
                cleanup() {
                    c(),
                        l()
                }
            })
        }
        function wn(e, t) {
            let r, n, i, o = se(()=>{
                    m(()=>{
                            r = !0,
                            n || t.before(),
                            i || (t.end(),
                                Ae()),
                                t.after(),
                            e.isConnected && t.cleanup(),
                                delete e._x_transitioning
                        }
                    )
                }
            );
            e._x_transitioning = {
                beforeCancels: [],
                beforeCancel(s) {
                    this.beforeCancels.push(s)
                },
                cancel: se(function() {
                    for (; this.beforeCancels.length; )
                        this.beforeCancels.shift()();
                    o()
                }),
                finish: o
            },
                m(()=>{
                        t.start(),
                            t.during()
                    }
                ),
                nr(),
                requestAnimationFrame(()=>{
                        if (r)
                            return;
                        let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3
                            , a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
                        s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3),
                            m(()=>{
                                    t.before()
                                }
                            ),
                            n = !0,
                            requestAnimationFrame(()=>{
                                    r || (m(()=>{
                                            t.end()
                                        }
                                    ),
                                        Ae(),
                                        setTimeout(e._x_transitioning.finish, s + a),
                                        i = !0)
                                }
                            )
                    }
                )
        }
        function ae(e, t, r) {
            if (e.indexOf(t) === -1)
                return r;
            let n = e[e.indexOf(t) + 1];
            if (!n || t === "scale" && isNaN(n))
                return r;
            if (t === "duration") {
                let i = n.match(/([0-9]+)ms/);
                if (i)
                    return i[1]
            }
            return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n
        }
        var mt = !1;
        function D(e, t=()=>{}
        ) {
            return (...r)=>mt ? t(...r) : e(...r)
        }
        function dr(e, t) {
            t._x_dataStack || (t._x_dataStack = e._x_dataStack),
                mt = !0,
                Sn(()=>{
                        En(t)
                    }
                ),
                mt = !1
        }
        function En(e) {
            let t = !1;
            E(e, (n,i)=>{
                    C(n, (o,s)=>{
                            if (t && cr(o))
                                return s();
                            t = !0,
                                i(o, s)
                        }
                    )
                }
            )
        }
        function Sn(e) {
            let t = K;
            Ye((r,n)=>{
                    let i = t(r);
                    return Y(i),
                        ()=>{}
                }
            ),
                e(),
                Ye(t)
        }
        function ce(e, t, r, n=[]) {
            switch (e._x_bindings || (e._x_bindings = A({})),
                e._x_bindings[t] = r,
                t = n.includes("camel") ? Rn(t) : t,
                t) {
                case "value":
                    An(e, r);
                    break;
                case "style":
                    Tn(e, r);
                    break;
                case "class":
                    On(e, r);
                    break;
                default:
                    Cn(e, t, r);
                    break
            }
        }
        function An(e, t) {
            if (e.type === "radio")
                e.attributes.value === void 0 && (e.value = t),
                window.fromModel && (e.checked = pr(e.value, t));
            else if (e.type === "checkbox")
                Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some(r=>pr(r, e.value)) : e.checked = !!t;
            else if (e.tagName === "SELECT")
                Mn(e, t);
            else {
                if (e.value === t)
                    return;
                e.value = t
            }
        }
        function On(e, t) {
            e._x_undoAddedClasses && e._x_undoAddedClasses(),
                e._x_undoAddedClasses = oe(e, t)
        }
        function Tn(e, t) {
            e._x_undoAddedStyles && e._x_undoAddedStyles(),
                e._x_undoAddedStyles = H(e, t)
        }
        function Cn(e, t, r) {
            [null, void 0, !1].includes(r) && kn(t) ? e.removeAttribute(t) : (mr(t) && (r = t),
                Nn(e, t, r))
        }
        function Nn(e, t, r) {
            e.getAttribute(t) != r && e.setAttribute(t, r)
        }
        function Mn(e, t) {
            let r = [].concat(t).map(n=>n + "");
            Array.from(e.options).forEach(n=>{
                    n.selected = r.includes(n.value)
                }
            )
        }
        function Rn(e) {
            return e.toLowerCase().replace(/-(\w)/g, (t,r)=>r.toUpperCase())
        }
        function pr(e, t) {
            return e == t
        }
        function mr(e) {
            return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e)
        }
        function kn(e) {
            return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e)
        }
        function hr(e, t, r) {
            if (e._x_bindings && e._x_bindings[t] !== void 0)
                return e._x_bindings[t];
            let n = e.getAttribute(t);
            return n === null ? typeof r == "function" ? r() : r : mr(t) ? !![t, "true"].includes(n) : n === "" ? !0 : n
        }
        function Me(e, t) {
            var r;
            return function() {
                var n = this
                    , i = arguments
                    , o = function() {
                    r = null,
                        e.apply(n, i)
                };
                clearTimeout(r),
                    r = setTimeout(o, t)
            }
        }
        function Ne(e, t) {
            let r;
            return function() {
                let n = this
                    , i = arguments;
                r || (e.apply(n, i),
                    r = !0,
                    setTimeout(()=>r = !1, t))
            }
        }
        function _r(e) {
            e(P)
        }
        var q = {}
            , gr = !1;
        function xr(e, t) {
            if (gr || (q = A(q),
                gr = !0),
            t === void 0)
                return q[e];
            q[e] = t,
            typeof t == "object" && t !== null && t.hasOwnProperty("init2") && typeof t.init == "function" && q[e].init(),
                ye(q[e])
        }
        function yr() {
            return q
        }
        var br = {};
        function vr(e, t) {
            br[e] = typeof t != "function" ? ()=>t : t
        }
        function wr(e) {
            return Object.entries(br).forEach(([t,r])=>{
                    Object.defineProperty(e, t, {
                        get() {
                            return (...n)=>r(...n)
                        }
                    })
                }
            ),
                e
        }
        var Er = {};
        function Sr(e, t) {
            Er[e] = t
        }
        function Ar(e, t) {
            return Object.entries(Er).forEach(([r,n])=>{
                    Object.defineProperty(e, r, {
                        get() {
                            return (...i)=>n.bind(t)(...i)
                        },
                        enumerable: !1
                    })
                }
            ),
                e
        }
        var In = {
            get reactive() {
                return A
            },
            get release() {
                return Y
            },
            get effect() {
                return K
            },
            get raw() {
                return We
            },
            version: "3.9.1",
            flushAndStopDeferringMutations: Vt,
            disableEffectScheduling: It,
            setReactivityEngine: Pt,
            closestDataStack: k,
            skipDuringClone: D,
            addRootSelector: Te,
            addInitSelector: Ce,
            addScopeToNode: T,
            deferMutations: zt,
            mapAttributes: Z,
            evaluateLater: g,
            setEvaluator: Wt,
            mergeProxies: I,
            findClosest: Q,
            closestRoot: V,
            interceptor: be,
            transition: Re,
            setStyles: H,
            mutateDom: m,
            directive: p,
            throttle: Ne,
            debounce: Me,
            evaluate: N,
            initTree: E,
            nextTick: Oe,
            prefixed: w,
            prefix: Gt,
            plugin: _r,
            magic: y,
            store: xr,
            start: or,
            clone: dr,
            bound: hr,
            $data: xe,
            data: Sr,
            bind: vr
        }
            , P = In;
        function ht(e, t) {
            let r = Object.create(null)
                , n = e.split(",");
            for (let i = 0; i < n.length; i++)
                r[n[i]] = !0;
            return t ? i=>!!r[i.toLowerCase()] : i=>!!r[i]
        }
        var Qo = {
            [1]: "TEXT",
            [2]: "CLASS",
            [4]: "STYLE",
            [8]: "PROPS",
            [16]: "FULL_PROPS",
            [32]: "HYDRATE_EVENTS",
            [64]: "STABLE_FRAGMENT",
            [128]: "KEYED_FRAGMENT",
            [256]: "UNKEYED_FRAGMENT",
            [512]: "NEED_PATCH",
            [1024]: "DYNAMIC_SLOTS",
            [2048]: "DEV_ROOT_FRAGMENT",
            [-1]: "HOISTED",
            [-2]: "BAIL"
        }
            , Xo = {
            [1]: "STABLE",
            [2]: "DYNAMIC",
            [3]: "FORWARDED"
        };
        var Pn = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
        var es = ht(Pn + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
        var Or = Object.freeze({})
            , ts = Object.freeze([]);
        var _t = Object.assign;
        var Dn = Object.prototype.hasOwnProperty
            , le = (e,t)=>Dn.call(e, t)
            , $ = Array.isArray
            , X = e=>Tr(e) === "[object Map]";
        var $n = e=>typeof e == "string"
            , ke = e=>typeof e == "symbol"
            , ue = e=>e !== null && typeof e == "object";
        var Ln = Object.prototype.toString
            , Tr = e=>Ln.call(e)
            , gt = e=>Tr(e).slice(8, -1);
        var Ie = e=>$n(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
        var Pe = e=>{
            let t = Object.create(null);
            return r=>t[r] || (t[r] = e(r))
        }
            , jn = /-(\w)/g
            , rs = Pe(e=>e.replace(jn, (t,r)=>r ? r.toUpperCase() : ""))
            , Fn = /\B([A-Z])/g
            , ns = Pe(e=>e.replace(Fn, "-$1").toLowerCase())
            , xt = Pe(e=>e.charAt(0).toUpperCase() + e.slice(1))
            , is = Pe(e=>e ? `on${xt(e)}` : "")
            , yt = (e,t)=>e !== t && (e === e || t === t);
        var bt = new WeakMap, fe = [], R, U = Symbol("iterate"), vt = Symbol("Map key iterate");
        function Kn(e) {
            return e && e._isEffect === !0
        }
        function Cr(e, t=Or) {
            Kn(e) && (e = e.raw);
            let r = Bn(e, t);
            return t.lazy || r(),
                r
        }
        function Mr(e) {
            e.active && (Rr(e),
            e.options.onStop && e.options.onStop(),
                e.active = !1)
        }
        var zn = 0;
        function Bn(e, t) {
            let r = function() {
                if (!r.active)
                    return e();
                if (!fe.includes(r)) {
                    Rr(r);
                    try {
                        return Vn(),
                            fe.push(r),
                            R = r,
                            e()
                    } finally {
                        fe.pop(),
                            Nr(),
                            R = fe[fe.length - 1]
                    }
                }
            };
            return r.id = zn++,
                r.allowRecurse = !!t.allowRecurse,
                r._isEffect = !0,
                r.active = !0,
                r.raw = e,
                r.deps = [],
                r.options = t,
                r
        }
        function Rr(e) {
            let {deps: t} = e;
            if (t.length) {
                for (let r = 0; r < t.length; r++)
                    t[r].delete(e);
                t.length = 0
            }
        }
        var ee = !0
            , wt = [];
        function Hn() {
            wt.push(ee),
                ee = !1
        }
        function Vn() {
            wt.push(ee),
                ee = !0
        }
        function Nr() {
            let e = wt.pop();
            ee = e === void 0 ? !0 : e
        }
        function O(e, t, r) {
            if (!ee || R === void 0)
                return;
            let n = bt.get(e);
            n || bt.set(e, n = new Map);
            let i = n.get(r);
            i || n.set(r, i = new Set),
            i.has(R) || (i.add(R),
                R.deps.push(i),
            R.options.onTrack && R.options.onTrack({
                effect: R,
                target: e,
                type: t,
                key: r
            }))
        }
        function L(e, t, r, n, i, o) {
            let s = bt.get(e);
            if (!s)
                return;
            let a = new Set
                , c = u=>{
                    u && u.forEach(d=>{
                            (d !== R || d.allowRecurse) && a.add(d)
                        }
                    )
                }
            ;
            if (t === "clear")
                s.forEach(c);
            else if (r === "length" && $(e))
                s.forEach((u,d)=>{
                        (d === "length" || d >= n) && c(u)
                    }
                );
            else
                switch (r !== void 0 && c(s.get(r)),
                    t) {
                    case "add":
                        $(e) ? Ie(r) && c(s.get("length")) : (c(s.get(U)),
                        X(e) && c(s.get(vt)));
                        break;
                    case "delete":
                        $(e) || (c(s.get(U)),
                        X(e) && c(s.get(vt)));
                        break;
                    case "set":
                        X(e) && c(s.get(U));
                        break
                }
            let l = u=>{
                    u.options.onTrigger && u.options.onTrigger({
                        effect: u,
                        target: e,
                        key: r,
                        type: t,
                        newValue: n,
                        oldValue: i,
                        oldTarget: o
                    }),
                        u.options.scheduler ? u.options.scheduler(u) : u()
                }
            ;
            a.forEach(l)
        }
        var qn = ht("__proto__,__v_isRef,__isVue")
            , kr = new Set(Object.getOwnPropertyNames(Symbol).map(e=>Symbol[e]).filter(ke))
            , Un = De()
            , Wn = De(!1, !0)
            , Gn = De(!0)
            , Yn = De(!0, !0)
            , $e = {};
        ["includes", "indexOf", "lastIndexOf"].forEach(e=>{
                let t = Array.prototype[e];
                $e[e] = function(...r) {
                    let n = _(this);
                    for (let o = 0, s = this.length; o < s; o++)
                        O(n, "get", o + "");
                    let i = t.apply(n, r);
                    return i === -1 || i === !1 ? t.apply(n, r.map(_)) : i
                }
            }
        );
        ["push", "pop", "shift", "unshift", "splice"].forEach(e=>{
                let t = Array.prototype[e];
                $e[e] = function(...r) {
                    Hn();
                    let n = t.apply(this, r);
                    return Nr(),
                        n
                }
            }
        );
        function De(e=!1, t=!1) {
            return function(n, i, o) {
                if (i === "__v_isReactive")
                    return !e;
                if (i === "__v_isReadonly")
                    return e;
                if (i === "__v_raw" && o === (e ? t ? Zn : Pr : t ? Jn : Ir).get(n))
                    return n;
                let s = $(n);
                if (!e && s && le($e, i))
                    return Reflect.get($e, i, o);
                let a = Reflect.get(n, i, o);
                return (ke(i) ? kr.has(i) : qn(i)) || (e || O(n, "get", i),
                    t) ? a : Et(a) ? !s || !Ie(i) ? a.value : a : ue(a) ? e ? Dr(a) : Le(a) : a
            }
        }
        var Qn = $r()
            , Xn = $r(!0);
        function $r(e=!1) {
            return function(r, n, i, o) {
                let s = r[n];
                if (!e && (i = _(i),
                    s = _(s),
                !$(r) && Et(s) && !Et(i)))
                    return s.value = i,
                        !0;
                let a = $(r) && Ie(n) ? Number(n) < r.length : le(r, n)
                    , c = Reflect.set(r, n, i, o);
                return r === _(o) && (a ? yt(i, s) && L(r, "set", n, i, s) : L(r, "add", n, i)),
                    c
            }
        }
        function ei(e, t) {
            let r = le(e, t)
                , n = e[t]
                , i = Reflect.deleteProperty(e, t);
            return i && r && L(e, "delete", t, void 0, n),
                i
        }
        function ti(e, t) {
            let r = Reflect.has(e, t);
            return (!ke(t) || !kr.has(t)) && O(e, "has", t),
                r
        }
        function ri(e) {
            return O(e, "iterate", $(e) ? "length" : U),
                Reflect.ownKeys(e)
        }
        var Lr = {
            get: Un,
            set: Qn,
            deleteProperty: ei,
            has: ti,
            ownKeys: ri
        }
            , jr = {
            get: Gn,
            set(e, t) {
                return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e),
                    !0
            },
            deleteProperty(e, t) {
                return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e),
                    !0
            }
        }
            , us = _t({}, Lr, {
            get: Wn,
            set: Xn
        })
            , fs = _t({}, jr, {
            get: Yn
        })
            , St = e=>ue(e) ? Le(e) : e
            , At = e=>ue(e) ? Dr(e) : e
            , Ot = e=>e
            , je = e=>Reflect.getPrototypeOf(e);
        function Fe(e, t, r=!1, n=!1) {
            e = e.__v_raw;
            let i = _(e)
                , o = _(t);
            t !== o && !r && O(i, "get", t),
            !r && O(i, "get", o);
            let {has: s} = je(i)
                , a = n ? Ot : r ? At : St;
            if (s.call(i, t))
                return a(e.get(t));
            if (s.call(i, o))
                return a(e.get(o));
            e !== i && e.get(t)
        }
        function Ke(e, t=!1) {
            let r = this.__v_raw
                , n = _(r)
                , i = _(e);
            return e !== i && !t && O(n, "has", e),
            !t && O(n, "has", i),
                e === i ? r.has(e) : r.has(e) || r.has(i)
        }
        function Be(e, t=!1) {
            return e = e.__v_raw,
            !t && O(_(e), "iterate", U),
                Reflect.get(e, "size", e)
        }
        function Fr(e) {
            e = _(e);
            let t = _(this);
            return je(t).has.call(t, e) || (t.add(e),
                L(t, "add", e, e)),
                this
        }
        function Br(e, t) {
            t = _(t);
            let r = _(this)
                , {has: n, get: i} = je(r)
                , o = n.call(r, e);
            o ? Kr(r, n, e) : (e = _(e),
                o = n.call(r, e));
            let s = i.call(r, e);
            return r.set(e, t),
                o ? yt(t, s) && L(r, "set", e, t, s) : L(r, "add", e, t),
                this
        }
        function zr(e) {
            let t = _(this)
                , {has: r, get: n} = je(t)
                , i = r.call(t, e);
            i ? Kr(t, r, e) : (e = _(e),
                i = r.call(t, e));
            let o = n ? n.call(t, e) : void 0
                , s = t.delete(e);
            return i && L(t, "delete", e, void 0, o),
                s
        }
        function Vr() {
            let e = _(this)
                , t = e.size !== 0
                , r = X(e) ? new Map(e) : new Set(e)
                , n = e.clear();
            return t && L(e, "clear", void 0, void 0, r),
                n
        }
        function ze(e, t) {
            return function(n, i) {
                let o = this
                    , s = o.__v_raw
                    , a = _(s)
                    , c = t ? Ot : e ? At : St;
                return !e && O(a, "iterate", U),
                    s.forEach((l,u)=>n.call(i, c(l), c(u), o))
            }
        }
        function Ve(e, t, r) {
            return function(...n) {
                let i = this.__v_raw
                    , o = _(i)
                    , s = X(o)
                    , a = e === "entries" || e === Symbol.iterator && s
                    , c = e === "keys" && s
                    , l = i[e](...n)
                    , u = r ? Ot : t ? At : St;
                return !t && O(o, "iterate", c ? vt : U),
                    {
                        next() {
                            let {value: d, done: x} = l.next();
                            return x ? {
                                value: d,
                                done: x
                            } : {
                                value: a ? [u(d[0]), u(d[1])] : u(d),
                                done: x
                            }
                        },
                        [Symbol.iterator]() {
                            return this
                        }
                    }
            }
        }
        function j(e) {
            return function(...t) {
                {
                    let r = t[0] ? `on key "${t[0]}" ` : "";
                    console.warn(`${xt(e)} operation ${r}failed: target is readonly.`, _(this))
                }
                return e === "delete" ? !1 : this
            }
        }
        var Hr = {
            get(e) {
                return Fe(this, e)
            },
            get size() {
                return Be(this)
            },
            has: Ke,
            add: Fr,
            set: Br,
            delete: zr,
            clear: Vr,
            forEach: ze(!1, !1)
        }
            , qr = {
            get(e) {
                return Fe(this, e, !1, !0)
            },
            get size() {
                return Be(this)
            },
            has: Ke,
            add: Fr,
            set: Br,
            delete: zr,
            clear: Vr,
            forEach: ze(!1, !0)
        }
            , Ur = {
            get(e) {
                return Fe(this, e, !0)
            },
            get size() {
                return Be(this, !0)
            },
            has(e) {
                return Ke.call(this, e, !0)
            },
            add: j("add"),
            set: j("set"),
            delete: j("delete"),
            clear: j("clear"),
            forEach: ze(!0, !1)
        }
            , Wr = {
            get(e) {
                return Fe(this, e, !0, !0)
            },
            get size() {
                return Be(this, !0)
            },
            has(e) {
                return Ke.call(this, e, !0)
            },
            add: j("add"),
            set: j("set"),
            delete: j("delete"),
            clear: j("clear"),
            forEach: ze(!0, !0)
        }
            , ni = ["keys", "values", "entries", Symbol.iterator];
        ni.forEach(e=>{
                Hr[e] = Ve(e, !1, !1),
                    Ur[e] = Ve(e, !0, !1),
                    qr[e] = Ve(e, !1, !0),
                    Wr[e] = Ve(e, !0, !0)
            }
        );
        function He(e, t) {
            let r = t ? e ? Wr : qr : e ? Ur : Hr;
            return (n,i,o)=>i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(le(r, i) && i in n ? r : n, i, o)
        }
        var ii = {
            get: He(!1, !1)
        }
            , ds = {
            get: He(!1, !0)
        }
            , oi = {
            get: He(!0, !1)
        }
            , ps = {
            get: He(!0, !0)
        };
        function Kr(e, t, r) {
            let n = _(r);
            if (n !== r && t.call(e, n)) {
                let i = gt(e);
                console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
            }
        }
        var Ir = new WeakMap
            , Jn = new WeakMap
            , Pr = new WeakMap
            , Zn = new WeakMap;
        function si(e) {
            switch (e) {
                case "Object":
                case "Array":
                    return 1;
                case "Map":
                case "Set":
                case "WeakMap":
                case "WeakSet":
                    return 2;
                default:
                    return 0
            }
        }
        function ai(e) {
            return e.__v_skip || !Object.isExtensible(e) ? 0 : si(gt(e))
        }
        function Le(e) {
            return e && e.__v_isReadonly ? e : Gr(e, !1, Lr, ii, Ir)
        }
        function Dr(e) {
            return Gr(e, !0, jr, oi, Pr)
        }
        function Gr(e, t, r, n, i) {
            if (!ue(e))
                return console.warn(`value cannot be made reactive: ${String(e)}`),
                    e;
            if (e.__v_raw && !(t && e.__v_isReactive))
                return e;
            let o = i.get(e);
            if (o)
                return o;
            let s = ai(e);
            if (s === 0)
                return e;
            let a = new Proxy(e,s === 2 ? n : r);
            return i.set(e, a),
                a
        }
        function _(e) {
            return e && _(e.__v_raw) || e
        }
        function Et(e) {
            return Boolean(e && e.__v_isRef === !0)
        }
        y("nextTick", ()=>Oe);
        y("dispatch", e=>B.bind(B, e));
        y("watch", (e,{evaluateLater: t, effect: r})=>(n,i)=>{
                let o = t(n), s = !0, a;
                r(()=>o(c=>{
                        JSON.stringify(c),
                            s ? a = c : queueMicrotask(()=>{
                                    i(c, a),
                                        a = c
                                }
                            ),
                            s = !1
                    }
                ))
            }
        );
        y("store", yr);
        y("data2", e=>xe(e));
        y("root", e=>V(e));
        y("refs", e=>(e._x_refs_proxy || (e._x_refs_proxy = I(ci(e))),
            e._x_refs_proxy));
        function ci(e) {
            let t = []
                , r = e;
            for (; r; )
                r._x_refs && t.push(r._x_refs),
                    r = r.parentNode;
            return t
        }
        var Tt = {};
        function Ct(e) {
            return Tt[e] || (Tt[e] = 0),
                ++Tt[e]
        }
        function Yr(e, t) {
            return Q(e, r=>{
                    if (r._x_ids && r._x_ids[t])
                        return !0
                }
            )
        }
        function Jr(e, t) {
            e._x_ids || (e._x_ids = {}),
            e._x_ids[t] || (e._x_ids[t] = Ct(t))
        }
        y("id", e=>(t,r=null)=>{
                let n = Yr(e, t)
                    , i = n ? n._x_ids[t] : Ct(t);
                return r ? `${t}-${i}-${r}` : `${t}-${i}`
            }
        );
        y("el", e=>e);
        p("modelable", (e,{expression: t},{effect: r, evaluate: n, evaluateLater: i})=>{
                let o = i(t)
                    , s = ()=>{
                    let u;
                    return o(d=>u = d),
                        u
                }
                    , a = i(`${t} = __placeholder`)
                    , c = u=>a(()=>{}
                    , {
                        scope: {
                            __placeholder: u
                        }
                    })
                    , l = s();
                e._x_modelable_hook && (l = e._x_modelable_hook(l)),
                    c(l),
                    queueMicrotask(()=>{
                            if (!e._x_model)
                                return;
                            let u = e._x_model.get
                                , d = e._x_model.set;
                            r(()=>c(u())),
                                r(()=>d(s()))
                        }
                    )
            }
        );
        p("teleport", (e,{expression: t},{cleanup: r})=>{
                e.tagName.toLowerCase() !== "template" && z("x-teleport can only be used on a <template> tag", e);
                let n = document.querySelector(t);
                n || z(`Cannot find x-teleport element for selector: "${t}"`);
                let i = e.content.cloneNode(!0).firstElementChild;
                e._x_teleport = i,
                    i._x_teleportBack = e,
                e._x_forwardEvents && e._x_forwardEvents.forEach(o=>{
                        i.addEventListener(o, s=>{
                                s.stopPropagation(),
                                    e.dispatchEvent(new s.constructor(s.type,s))
                            }
                        )
                    }
                ),
                    T(i, {}, e),
                    m(()=>{
                            n.appendChild(i),
                                E(i),
                                i._x_ignore = !0
                        }
                    ),
                    r(()=>i.remove())
            }
        );
        var Zr = ()=>{}
        ;
        Zr.inline = (e,{modifiers: t},{cleanup: r})=>{
            t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0,
                r(()=>{
                        t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore
                    }
                )
        }
        ;
        p("ignore", Zr);
        p("effect", (e,{expression: t},{effect: r})=>r(g(e, t)));
        function de(e, t, r, n) {
            let i = e
                , o = c=>n(c)
                , s = {}
                , a = (c,l)=>u=>l(c, u);
            if (r.includes("dot") && (t = li(t)),
            r.includes("camel") && (t = ui(t)),
            r.includes("passive") && (s.passive = !0),
            r.includes("capture") && (s.capture = !0),
            r.includes("window") && (i = window),
            r.includes("document") && (i = document),
            r.includes("prevent") && (o = a(o, (c,l)=>{
                    l.preventDefault(),
                        c(l)
                }
            )),
            r.includes("stop") && (o = a(o, (c,l)=>{
                    l.stopPropagation(),
                        c(l)
                }
            )),
            r.includes("self") && (o = a(o, (c,l)=>{
                    l.target === e && c(l)
                }
            )),
            (r.includes("away") || r.includes("outside")) && (i = document,
                o = a(o, (c,l)=>{
                        e.contains(l.target) || e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && c(l)
                    }
                )),
                o = a(o, (c,l)=>{
                        fi(t) && di(l, r) || c(l)
                    }
                ),
                r.includes("debounce")) {
                let c = r[r.indexOf("debounce") + 1] || "invalid-wait"
                    , l = Rt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
                o = Me(o, l)
            }
            if (r.includes("throttle")) {
                let c = r[r.indexOf("throttle") + 1] || "invalid-wait"
                    , l = Rt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
                o = Ne(o, l)
            }
            return r.includes("once") && (o = a(o, (c,l)=>{
                    c(l),
                        i.removeEventListener(t, o, s)
                }
            )),
                i.addEventListener(t, o, s),
                ()=>{
                    i.removeEventListener(t, o, s)
                }
        }
        function li(e) {
            return e.replace(/-/g, ".")
        }
        function ui(e) {
            return e.toLowerCase().replace(/-(\w)/g, (t,r)=>r.toUpperCase())
        }
        function Rt(e) {
            return !Array.isArray(e) && !isNaN(e)
        }
        function pi(e) {
            return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase()
        }
        function fi(e) {
            return ["keydown", "keyup"].includes(e)
        }
        function di(e, t) {
            let r = t.filter(o=>!["window", "document", "prevent", "stop", "once"].includes(o));
            if (r.includes("debounce")) {
                let o = r.indexOf("debounce");
                r.splice(o, Rt((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
            }
            if (r.length === 0 || r.length === 1 && Qr(e.key).includes(r[0]))
                return !1;
            let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter(o=>r.includes(o));
            return r = r.filter(o=>!i.includes(o)),
                !(i.length > 0 && i.filter(s=>((s === "cmd" || s === "super") && (s = "meta"),
                    e[`${s}Key`])).length === i.length && Qr(e.key).includes(r[0]))
        }
        function Qr(e) {
            if (!e)
                return [];
            e = pi(e);
            let t = {
                ctrl: "control",
                slash: "/",
                space: "-",
                spacebar: "-",
                cmd: "meta",
                esc: "escape",
                up: "arrow-up",
                down: "arrow-down",
                left: "arrow-left",
                right: "arrow-right",
                period: ".",
                equal: "="
            };
            return t[e] = e,
                Object.keys(t).map(r=>{
                        if (t[r] === e)
                            return r
                    }
                ).filter(r=>r)
        }
        p("model", (e,{modifiers: t, expression: r},{effect: n, cleanup: i})=>{
                let o = g(e, r)
                    , s = `${r} = rightSideOfExpression($event, ${r})`
                    , a = g(e, s);
                var c = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
                let l = mi(e, t, r)
                    , u = de(e, c, t, x=>{
                        a(()=>{}
                            , {
                                scope: {
                                    $event: x,
                                    rightSideOfExpression: l
                                }
                            })
                    }
                );
                i(()=>u());
                let d = g(e, `${r} = __placeholder`);
                e._x_model = {
                    get() {
                        let x;
                        return o(M=>x = M),
                            x
                    },
                    set(x) {
                        d(()=>{}
                            , {
                                scope: {
                                    __placeholder: x
                                }
                            })
                    }
                },
                    e._x_forceModelUpdate = ()=>{
                        o(x=>{
                                x === void 0 && r.match(/\./) && (x = ""),
                                    window.fromModel = !0,
                                    m(()=>ce(e, "value", x)),
                                    delete window.fromModel
                            }
                        )
                    }
                    ,
                    n(()=>{
                            t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate()
                        }
                    )
            }
        );
        function mi(e, t, r) {
            return e.type === "radio" && m(()=>{
                    e.hasAttribute("name") || e.setAttribute("name", r)
                }
            ),
                (n,i)=>m(()=>{
                        if (n instanceof CustomEvent && n.detail !== void 0)
                            return n.detail || n.target.value;
                        if (e.type === "checkbox")
                            if (Array.isArray(i)) {
                                let o = t.includes("number") ? Mt(n.target.value) : n.target.value;
                                return n.target.checked ? i.concat([o]) : i.filter(s=>!hi(s, o))
                            } else
                                return n.target.checked;
                        else {
                            if (e.tagName.toLowerCase() === "select" && e.multiple)
                                return t.includes("number") ? Array.from(n.target.selectedOptions).map(o=>{
                                        let s = o.value || o.text;
                                        return Mt(s)
                                    }
                                ) : Array.from(n.target.selectedOptions).map(o=>o.value || o.text);
                            {
                                let o = n.target.value;
                                return t.includes("number") ? Mt(o) : t.includes("trim") ? o.trim() : o
                            }
                        }
                    }
                )
        }
        function Mt(e) {
            let t = e ? parseFloat(e) : null;
            return _i(t) ? t : e
        }
        function hi(e, t) {
            return e == t
        }
        function _i(e) {
            return !Array.isArray(e) && !isNaN(e)
        }
        p("cloak", e=>queueMicrotask(()=>m(()=>e.removeAttribute(w("cloak")))));
        Ce(()=>`[${w("init2")}]`);
        p("init2", D((e,{expression: t},{evaluate: r})=>typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)));
        p("text", (e,{expression: t},{effect: r, evaluateLater: n})=>{
                let i = n(t);
                r(()=>{
                        i(o=>{
                                m(()=>{
                                        e.textContent = o
                                    }
                                )
                            }
                        )
                    }
                )
            }
        );
        p("html", (e,{expression: t},{effect: r, evaluateLater: n})=>{
                let i = n(t);
                r(()=>{
                        i(o=>{
                                e.innerHTML = o
                            }
                        )
                    }
                )
            }
        );
        Z(we(":", Ee(w("bind:"))));
        p("bind", (e,{value: t, modifiers: r, expression: n, original: i},{effect: o})=>{
                if (!t)
                    return gi(e, n, i, o);
                if (t === "key")
                    return xi(e, n);
                let s = g(e, n);
                o(()=>s(a=>{
                        a === void 0 && n.match(/\./) && (a = ""),
                            m(()=>ce(e, t, a, r))
                    }
                ))
            }
        );
        function gi(e, t, r, n) {
            let i = {};
            wr(i);
            let o = g(e, t)
                , s = [];
            for (; s.length; )
                s.pop()();
            o(a=>{
                    let c = Object.entries(a).map(([u,d])=>({
                        name: u,
                        value: d
                    }))
                        , l = Qt(c);
                    c = c.map(u=>l.find(d=>d.name === u.name) ? {
                        name: `x-bind:${u.name}`,
                        value: `"${u.value}"`
                    } : u),
                        ne(e, c, r).map(u=>{
                                s.push(u.runCleanups),
                                    u()
                            }
                        )
                }
                , {
                    scope: i
                })
        }
        function xi(e, t) {
            e._x_keyExpression = t
        }
        Te(()=>`[${w("data2")}]`);
        p("data2", D((e,{expression: t},{cleanup: r})=>{
                t = t === "" ? "{}" : t;
                let n = {};
                re(n, e);
                let i = {};
                Ar(i, n);
                let o = N(e, t, {
                    scope: i
                });
                o === void 0 && (o = {}),
                    re(o, e);
                let s = A(o);
                ye(s);
                let a = T(e, s);
                s.init && N(e, s.init),
                    r(()=>{
                            a(),
                            s.destroy && N(e, s.destroy)
                        }
                    )
            }
        ));
        p("show", (e,{modifiers: t, expression: r},{effect: n})=>{
                let i = g(e, r), o = ()=>m(()=>{
                        e.style.display = "none",
                            e._x_isShown = !1
                    }
                ), s = ()=>m(()=>{
                        e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display"),
                            e._x_isShown = !0
                    }
                ), a = ()=>setTimeout(s), c = se(d=>d ? s() : o(), d=>{
                        typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, d, s, o) : d ? a() : o()
                    }
                ), l, u = !0;
                n(()=>i(d=>{
                        !u && d === l || (t.includes("immediate") && (d ? a() : o()),
                            c(d),
                            l = d,
                            u = !1)
                    }
                ))
            }
        );
        p("for", (e,{expression: t},{effect: r, cleanup: n})=>{
                let i = bi(t)
                    , o = g(e, i.items)
                    , s = g(e, e._x_keyExpression || "index");
                e._x_prevKeys = [],
                    e._x_lookup = {},
                    r(()=>yi(e, i, o, s)),
                    n(()=>{
                            Object.values(e._x_lookup).forEach(a=>a.remove()),
                                delete e._x_prevKeys,
                                delete e._x_lookup
                        }
                    )
            }
        );
        function yi(e, t, r, n) {
            let i = s=>typeof s == "object" && !Array.isArray(s)
                , o = e;
            r(s=>{
                    vi(s) && s >= 0 && (s = Array.from(Array(s).keys(), f=>f + 1)),
                    s === void 0 && (s = []);
                    let a = e._x_lookup
                        , c = e._x_prevKeys
                        , l = []
                        , u = [];
                    if (i(s))
                        s = Object.entries(s).map(([f,h])=>{
                                let b = Xr(t, h, f, s);
                                n(v=>u.push(v), {
                                    scope: {
                                        index: f,
                                        ...b
                                    }
                                }),
                                    l.push(b)
                            }
                        );
                    else
                        for (let f = 0; f < s.length; f++) {
                            let h = Xr(t, s[f], f, s);
                            n(b=>u.push(b), {
                                scope: {
                                    index: f,
                                    ...h
                                }
                            }),
                                l.push(h)
                        }
                    let d = []
                        , x = []
                        , M = []
                        , W = [];
                    for (let f = 0; f < c.length; f++) {
                        let h = c[f];
                        u.indexOf(h) === -1 && M.push(h)
                    }
                    c = c.filter(f=>!M.includes(f));
                    let pe = "template";
                    for (let f = 0; f < u.length; f++) {
                        let h = u[f]
                            , b = c.indexOf(h);
                        if (b === -1)
                            c.splice(f, 0, h),
                                d.push([pe, f]);
                        else if (b !== f) {
                            let v = c.splice(f, 1)[0]
                                , S = c.splice(b - 1, 1)[0];
                            c.splice(f, 0, S),
                                c.splice(b, 0, v),
                                x.push([v, S])
                        } else
                            W.push(h);
                        pe = h
                    }
                    for (let f = 0; f < M.length; f++) {
                        let h = M[f];
                        a[h]._x_effects && a[h]._x_effects.forEach(he),
                            a[h].remove(),
                            a[h] = null,
                            delete a[h]
                    }
                    for (let f = 0; f < x.length; f++) {
                        let[h,b] = x[f]
                            , v = a[h]
                            , S = a[b]
                            , G = document.createElement("div");
                        m(()=>{
                                S.after(G),
                                    v.after(S),
                                S._x_currentIfEl && S.after(S._x_currentIfEl),
                                    G.before(v),
                                v._x_currentIfEl && v.after(v._x_currentIfEl),
                                    G.remove()
                            }
                        ),
                            nt(S, l[u.indexOf(b)])
                    }
                    for (let f = 0; f < d.length; f++) {
                        let[h,b] = d[f]
                            , v = h === "template" ? o : a[h];
                        v._x_currentIfEl && (v = v._x_currentIfEl);
                        let S = l[b]
                            , G = u[b]
                            , me = document.importNode(o.content, !0).firstElementChild;
                        T(me, A(S), o),
                            m(()=>{
                                    v.after(me),
                                        E(me)
                                }
                            ),
                        typeof G == "object" && z("x-for key cannot be an object, it must be a string or an integer", o),
                            a[G] = me
                    }
                    for (let f = 0; f < W.length; f++)
                        nt(a[W[f]], l[u.indexOf(W[f])]);
                    o._x_prevKeys = u
                }
            )
        }
        function bi(e) {
            let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
                , r = /^\s*\(|\)\s*$/g
                , n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
                , i = e.match(n);
            if (!i)
                return;
            let o = {};
            o.items = i[2].trim();
            let s = i[1].replace(r, "").trim()
                , a = s.match(t);
            return a ? (o.item = s.replace(t, "").trim(),
                o.index = a[1].trim(),
            a[2] && (o.collection = a[2].trim())) : o.item = s,
                o
        }
        function Xr(e, t, r, n) {
            let i = {};
            return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map(s=>s.trim()).forEach((s,a)=>{
                    i[s] = t[a]
                }
            ) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map(s=>s.trim()).forEach(s=>{
                    i[s] = t[s]
                }
            ) : i[e.item] = t,
            e.index && (i[e.index] = r),
            e.collection && (i[e.collection] = n),
                i
        }
        function vi(e) {
            return !Array.isArray(e) && !isNaN(e)
        }
        function en() {}
        en.inline = (e,{expression: t},{cleanup: r})=>{
            let n = V(e);
            n._x_refs || (n._x_refs = {}),
                n._x_refs[t] = e,
                r(()=>delete n._x_refs[t])
        }
        ;
        p("ref", en);
        p("if", (e,{expression: t},{effect: r, cleanup: n})=>{
                let i = g(e, t)
                    , o = ()=>{
                        if (e._x_currentIfEl)
                            return e._x_currentIfEl;
                        let a = e.content.cloneNode(!0).firstElementChild;
                        return T(a, {}, e),
                            m(()=>{
                                    e.after(a),
                                        E(a)
                                }
                            ),
                            e._x_currentIfEl = a,
                            e._x_undoIf = ()=>{
                                C(a, c=>{
                                        c._x_effects && c._x_effects.forEach(he)
                                    }
                                ),
                                    a.remove(),
                                    delete e._x_currentIfEl
                            }
                            ,
                            a
                    }
                    , s = ()=>{
                        !e._x_undoIf || (e._x_undoIf(),
                            delete e._x_undoIf)
                    }
                ;
                r(()=>i(a=>{
                        a ? o() : s()
                    }
                )),
                    n(()=>e._x_undoIf && e._x_undoIf())
            }
        );
        p("id", (e,{expression: t},{evaluate: r})=>{
                r(t).forEach(i=>Jr(e, i))
            }
        );
        Z(we("@", Ee(w("on:"))));
        p("on", D((e,{value: t, modifiers: r, expression: n},{cleanup: i})=>{
                let o = n ? g(e, n) : ()=>{}
                ;
                e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []),
                e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
                let s = de(e, t, r, a=>{
                        o(()=>{}
                            , {
                                scope: {
                                    $event: a
                                },
                                params: [a]
                            })
                    }
                );
                i(()=>s())
            }
        ));
        P.setEvaluator(st);
        P.setReactivityEngine({
            reactive: Le,
            effect: Cr,
            release: Mr,
            raw: _
        });
        var Nt = P;
        window.WeiwaitAlpine = Nt;
        queueMicrotask(()=>{
                Nt.start()
            }
        );
    }
)();
