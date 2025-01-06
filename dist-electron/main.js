import Tt, { app as lr, BrowserWindow as wl, ipcMain as xr } from "electron";
import be from "path";
import Ft, { fileURLToPath as Xu } from "url";
import _l from "events";
import ur from "crypto";
import Sl from "tty";
import Yi from "util";
import Lr from "os";
import dt from "fs";
import cr from "stream";
import Ku from "string_decoder";
import Ju from "constants";
import Al from "assert";
import Ur from "child_process";
import Tl from "zlib";
import Qu from "http";
var Qe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Vr = {}, Yr = {}, wt = {}, wa;
function zi() {
  if (wa) return wt;
  wa = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.CancellationError = wt.CancellationToken = void 0;
  const n = _l;
  let f = class extends n.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(u) {
      this.removeParentCancelHandler(), this._parent = u, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(u) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, u != null && (this.parent = u);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(u) {
      this.cancelled ? u() : this.once("cancel", u);
    }
    createPromise(u) {
      if (this.cancelled)
        return Promise.reject(new h());
      const s = () => {
        if (a != null)
          try {
            this.removeListener("cancel", a), a = null;
          } catch {
          }
      };
      let a = null;
      return new Promise((c, i) => {
        let t = null;
        if (a = () => {
          try {
            t != null && (t(), t = null);
          } finally {
            i(new h());
          }
        }, this.cancelled) {
          a();
          return;
        }
        this.onCancel(a), u(c, i, (l) => {
          t = l;
        });
      }).then((c) => (s(), c)).catch((c) => {
        throw s(), c;
      });
    }
    removeParentCancelHandler() {
      const u = this._parent;
      u != null && this.parentCancelHandler != null && (u.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  wt.CancellationToken = f;
  class h extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return wt.CancellationError = h, wt;
}
var Me = {}, _r = { exports: {} }, Sr = { exports: {} }, zr, _a;
function Zu() {
  if (_a) return zr;
  _a = 1;
  var n = 1e3, f = n * 60, h = f * 60, d = h * 24, u = d * 7, s = d * 365.25;
  zr = function(l, o) {
    o = o || {};
    var r = typeof l;
    if (r === "string" && l.length > 0)
      return a(l);
    if (r === "number" && isFinite(l))
      return o.long ? i(l) : c(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function a(l) {
    if (l = String(l), !(l.length > 100)) {
      var o = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (o) {
        var r = parseFloat(o[1]), p = (o[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * s;
          case "weeks":
          case "week":
          case "w":
            return r * u;
          case "days":
          case "day":
          case "d":
            return r * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * f;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
          default:
            return;
        }
      }
    }
  }
  function c(l) {
    var o = Math.abs(l);
    return o >= d ? Math.round(l / d) + "d" : o >= h ? Math.round(l / h) + "h" : o >= f ? Math.round(l / f) + "m" : o >= n ? Math.round(l / n) + "s" : l + "ms";
  }
  function i(l) {
    var o = Math.abs(l);
    return o >= d ? t(l, o, d, "day") : o >= h ? t(l, o, h, "hour") : o >= f ? t(l, o, f, "minute") : o >= n ? t(l, o, n, "second") : l + " ms";
  }
  function t(l, o, r, p) {
    var g = o >= r * 1.5;
    return Math.round(l / r) + " " + p + (g ? "s" : "");
  }
  return zr;
}
var Xr, Sa;
function Rl() {
  if (Sa) return Xr;
  Sa = 1;
  function n(f) {
    d.debug = d, d.default = d, d.coerce = t, d.disable = c, d.enable = s, d.enabled = i, d.humanize = Zu(), d.destroy = l, Object.keys(f).forEach((o) => {
      d[o] = f[o];
    }), d.names = [], d.skips = [], d.formatters = {};
    function h(o) {
      let r = 0;
      for (let p = 0; p < o.length; p++)
        r = (r << 5) - r + o.charCodeAt(p), r |= 0;
      return d.colors[Math.abs(r) % d.colors.length];
    }
    d.selectColor = h;
    function d(o) {
      let r, p = null, g, _;
      function m(...w) {
        if (!m.enabled)
          return;
        const R = m, O = Number(/* @__PURE__ */ new Date()), I = O - (r || O);
        R.diff = I, R.prev = r, R.curr = O, r = O, w[0] = d.coerce(w[0]), typeof w[0] != "string" && w.unshift("%O");
        let M = 0;
        w[0] = w[0].replace(/%([a-zA-Z%])/g, (A, T) => {
          if (A === "%%")
            return "%";
          M++;
          const E = d.formatters[T];
          if (typeof E == "function") {
            const q = w[M];
            A = E.call(R, q), w.splice(M, 1), M--;
          }
          return A;
        }), d.formatArgs.call(R, w), (R.log || d.log).apply(R, w);
      }
      return m.namespace = o, m.useColors = d.useColors(), m.color = d.selectColor(o), m.extend = u, m.destroy = d.destroy, Object.defineProperty(m, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (g !== d.namespaces && (g = d.namespaces, _ = d.enabled(o)), _),
        set: (w) => {
          p = w;
        }
      }), typeof d.init == "function" && d.init(m), m;
    }
    function u(o, r) {
      const p = d(this.namespace + (typeof r > "u" ? ":" : r) + o);
      return p.log = this.log, p;
    }
    function s(o) {
      d.save(o), d.namespaces = o, d.names = [], d.skips = [];
      const r = (typeof o == "string" ? o : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const p of r)
        p[0] === "-" ? d.skips.push(p.slice(1)) : d.names.push(p);
    }
    function a(o, r) {
      let p = 0, g = 0, _ = -1, m = 0;
      for (; p < o.length; )
        if (g < r.length && (r[g] === o[p] || r[g] === "*"))
          r[g] === "*" ? (_ = g, m = p, g++) : (p++, g++);
        else if (_ !== -1)
          g = _ + 1, m++, p = m;
        else
          return !1;
      for (; g < r.length && r[g] === "*"; )
        g++;
      return g === r.length;
    }
    function c() {
      const o = [
        ...d.names,
        ...d.skips.map((r) => "-" + r)
      ].join(",");
      return d.enable(""), o;
    }
    function i(o) {
      for (const r of d.skips)
        if (a(o, r))
          return !1;
      for (const r of d.names)
        if (a(o, r))
          return !0;
      return !1;
    }
    function t(o) {
      return o instanceof Error ? o.stack || o.message : o;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return d.enable(d.load()), d;
  }
  return Xr = n, Xr;
}
var Aa;
function ec() {
  return Aa || (Aa = 1, function(n, f) {
    f.formatArgs = d, f.save = u, f.load = s, f.useColors = h, f.storage = a(), f.destroy = /* @__PURE__ */ (() => {
      let i = !1;
      return () => {
        i || (i = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), f.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function h() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let i;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (i = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(i[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function d(i) {
      if (i[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + i[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
        return;
      const t = "color: " + this.color;
      i.splice(1, 0, t, "color: inherit");
      let l = 0, o = 0;
      i[0].replace(/%[a-zA-Z%]/g, (r) => {
        r !== "%%" && (l++, r === "%c" && (o = l));
      }), i.splice(o, 0, t);
    }
    f.log = console.debug || console.log || (() => {
    });
    function u(i) {
      try {
        i ? f.storage.setItem("debug", i) : f.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let i;
      try {
        i = f.storage.getItem("debug");
      } catch {
      }
      return !i && typeof process < "u" && "env" in process && (i = process.env.DEBUG), i;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    n.exports = Rl()(f);
    const { formatters: c } = n.exports;
    c.j = function(i) {
      try {
        return JSON.stringify(i);
      } catch (t) {
        return "[UnexpectedJSONParseError]: " + t.message;
      }
    };
  }(Sr, Sr.exports)), Sr.exports;
}
var Ar = { exports: {} }, Kr, Ta;
function tc() {
  return Ta || (Ta = 1, Kr = (n, f = process.argv) => {
    const h = n.startsWith("-") ? "" : n.length === 1 ? "-" : "--", d = f.indexOf(h + n), u = f.indexOf("--");
    return d !== -1 && (u === -1 || d < u);
  }), Kr;
}
var Jr, Ra;
function rc() {
  if (Ra) return Jr;
  Ra = 1;
  const n = Lr, f = Sl, h = tc(), { env: d } = process;
  let u;
  h("no-color") || h("no-colors") || h("color=false") || h("color=never") ? u = 0 : (h("color") || h("colors") || h("color=true") || h("color=always")) && (u = 1), "FORCE_COLOR" in d && (d.FORCE_COLOR === "true" ? u = 1 : d.FORCE_COLOR === "false" ? u = 0 : u = d.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(d.FORCE_COLOR, 10), 3));
  function s(i) {
    return i === 0 ? !1 : {
      level: i,
      hasBasic: !0,
      has256: i >= 2,
      has16m: i >= 3
    };
  }
  function a(i, t) {
    if (u === 0)
      return 0;
    if (h("color=16m") || h("color=full") || h("color=truecolor"))
      return 3;
    if (h("color=256"))
      return 2;
    if (i && !t && u === void 0)
      return 0;
    const l = u || 0;
    if (d.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const o = n.release().split(".");
      return Number(o[0]) >= 10 && Number(o[2]) >= 10586 ? Number(o[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in d)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((o) => o in d) || d.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in d)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(d.TEAMCITY_VERSION) ? 1 : 0;
    if (d.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in d) {
      const o = parseInt((d.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (d.TERM_PROGRAM) {
        case "iTerm.app":
          return o >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(d.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(d.TERM) || "COLORTERM" in d ? 1 : l;
  }
  function c(i) {
    const t = a(i, i && i.isTTY);
    return s(t);
  }
  return Jr = {
    supportsColor: c,
    stdout: s(a(!0, f.isatty(1))),
    stderr: s(a(!0, f.isatty(2)))
  }, Jr;
}
var Ca;
function nc() {
  return Ca || (Ca = 1, function(n, f) {
    const h = Sl, d = Yi;
    f.init = l, f.log = c, f.formatArgs = s, f.save = i, f.load = t, f.useColors = u, f.destroy = d.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), f.colors = [6, 2, 3, 4, 5, 1];
    try {
      const r = rc();
      r && (r.stderr || r).level >= 2 && (f.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    f.inspectOpts = Object.keys(process.env).filter((r) => /^debug_/i.test(r)).reduce((r, p) => {
      const g = p.substring(6).toLowerCase().replace(/_([a-z])/g, (m, w) => w.toUpperCase());
      let _ = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(_) ? _ = !0 : /^(no|off|false|disabled)$/i.test(_) ? _ = !1 : _ === "null" ? _ = null : _ = Number(_), r[g] = _, r;
    }, {});
    function u() {
      return "colors" in f.inspectOpts ? !!f.inspectOpts.colors : h.isatty(process.stderr.fd);
    }
    function s(r) {
      const { namespace: p, useColors: g } = this;
      if (g) {
        const _ = this.color, m = "\x1B[3" + (_ < 8 ? _ : "8;5;" + _), w = `  ${m};1m${p} \x1B[0m`;
        r[0] = w + r[0].split(`
`).join(`
` + w), r.push(m + "m+" + n.exports.humanize(this.diff) + "\x1B[0m");
      } else
        r[0] = a() + p + " " + r[0];
    }
    function a() {
      return f.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function c(...r) {
      return process.stderr.write(d.formatWithOptions(f.inspectOpts, ...r) + `
`);
    }
    function i(r) {
      r ? process.env.DEBUG = r : delete process.env.DEBUG;
    }
    function t() {
      return process.env.DEBUG;
    }
    function l(r) {
      r.inspectOpts = {};
      const p = Object.keys(f.inspectOpts);
      for (let g = 0; g < p.length; g++)
        r.inspectOpts[p[g]] = f.inspectOpts[p[g]];
    }
    n.exports = Rl()(f);
    const { formatters: o } = n.exports;
    o.o = function(r) {
      return this.inspectOpts.colors = this.useColors, d.inspect(r, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, o.O = function(r) {
      return this.inspectOpts.colors = this.useColors, d.inspect(r, this.inspectOpts);
    };
  }(Ar, Ar.exports)), Ar.exports;
}
var ba;
function ic() {
  return ba || (ba = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? _r.exports = ec() : _r.exports = nc()), _r.exports;
}
var Tr = {}, Oa;
function $r() {
  if (Oa) return Tr;
  Oa = 1, Object.defineProperty(Tr, "__esModule", { value: !0 }), Tr.newError = n;
  function n(f, h) {
    const d = new Error(f);
    return d.code = h, d;
  }
  return Tr;
}
var Mt = {}, Ia;
function Cl() {
  if (Ia) return Mt;
  Ia = 1, Object.defineProperty(Mt, "__esModule", { value: !0 }), Mt.ProgressCallbackTransform = void 0;
  const n = cr;
  let f = class extends n.Transform {
    constructor(d, u, s) {
      super(), this.total = d, this.cancellationToken = u, this.onProgress = s, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(d, u, s) {
      if (this.cancellationToken.cancelled) {
        s(new Error("cancelled"), null);
        return;
      }
      this.transferred += d.length, this.delta += d.length;
      const a = Date.now();
      a >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = a + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((a - this.start) / 1e3))
      }), this.delta = 0), s(null, d);
    }
    _flush(d) {
      if (this.cancellationToken.cancelled) {
        d(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, d(null);
    }
  };
  return Mt.ProgressCallbackTransform = f, Mt;
}
var Pa;
function ac() {
  if (Pa) return Me;
  Pa = 1, Object.defineProperty(Me, "__esModule", { value: !0 }), Me.DigestTransform = Me.HttpExecutor = Me.HttpError = void 0, Me.createHttpError = t, Me.parseJson = r, Me.configureRequestOptionsFromUrl = g, Me.configureRequestUrl = _, Me.safeGetHeader = R, Me.configureRequestOptions = I, Me.safeStringifyJson = M;
  const n = ur, f = ic(), h = dt, d = cr, u = Ft, s = zi(), a = $r(), c = Cl(), i = (0, f.default)("electron-builder");
  function t(C, A = null) {
    return new o(C.statusCode || -1, `${C.statusCode} ${C.statusMessage}` + (A == null ? "" : `
` + JSON.stringify(A, null, "  ")) + `
Headers: ` + M(C.headers), A);
  }
  const l = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class o extends Error {
    constructor(A, T = `HTTP error: ${l.get(A) || A}`, E = null) {
      super(T), this.statusCode = A, this.description = E, this.name = "HttpError", this.code = `HTTP_ERROR_${A}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  Me.HttpError = o;
  function r(C) {
    return C.then((A) => A == null || A.length === 0 ? null : JSON.parse(A));
  }
  class p {
    constructor() {
      this.maxRedirects = 10;
    }
    request(A, T = new s.CancellationToken(), E) {
      I(A);
      const q = E == null ? void 0 : JSON.stringify(E), U = q ? Buffer.from(q) : void 0;
      if (U != null) {
        i(q);
        const { headers: L, ...k } = A;
        A = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": U.length,
            ...L
          },
          ...k
        };
      }
      return this.doApiRequest(A, T, (L) => L.end(U));
    }
    doApiRequest(A, T, E, q = 0) {
      return i.enabled && i(`Request: ${M(A)}`), T.createPromise((U, L, k) => {
        const D = this.createRequest(A, (P) => {
          try {
            this.handleResponse(P, A, T, U, L, q, E);
          } catch (F) {
            L(F);
          }
        });
        this.addErrorAndTimeoutHandlers(D, L, A.timeout), this.addRedirectHandlers(D, A, L, q, (P) => {
          this.doApiRequest(P, T, E, q).then(U).catch(L);
        }), E(D, L), k(() => D.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(A, T, E, q, U) {
    }
    addErrorAndTimeoutHandlers(A, T, E = 60 * 1e3) {
      this.addTimeOutHandler(A, T, E), A.on("error", T), A.on("aborted", () => {
        T(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(A, T, E, q, U, L, k) {
      var D;
      if (i.enabled && i(`Response: ${A.statusCode} ${A.statusMessage}, request options: ${M(T)}`), A.statusCode === 404) {
        U(t(A, `method: ${T.method || "GET"} url: ${T.protocol || "https:"}//${T.hostname}${T.port ? `:${T.port}` : ""}${T.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (A.statusCode === 204) {
        q();
        return;
      }
      const P = (D = A.statusCode) !== null && D !== void 0 ? D : 0, F = P >= 300 && P < 400, $ = R(A, "location");
      if (F && $ != null) {
        if (L > this.maxRedirects) {
          U(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(p.prepareRedirectUrlOptions($, T), E, k, L).then(q).catch(U);
        return;
      }
      A.setEncoding("utf8");
      let J = "";
      A.on("error", U), A.on("data", (W) => J += W), A.on("end", () => {
        try {
          if (A.statusCode != null && A.statusCode >= 400) {
            const W = R(A, "content-type"), ne = W != null && (Array.isArray(W) ? W.find((ce) => ce.includes("json")) != null : W.includes("json"));
            U(t(A, `method: ${T.method || "GET"} url: ${T.protocol || "https:"}//${T.hostname}${T.port ? `:${T.port}` : ""}${T.path}

          Data:
          ${ne ? JSON.stringify(JSON.parse(J)) : J}
          `));
          } else
            q(J.length === 0 ? null : J);
        } catch (W) {
          U(W);
        }
      });
    }
    async downloadToBuffer(A, T) {
      return await T.cancellationToken.createPromise((E, q, U) => {
        const L = [], k = {
          headers: T.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        _(A, k), I(k), this.doDownload(k, {
          destination: null,
          options: T,
          onCancel: U,
          callback: (D) => {
            D == null ? E(Buffer.concat(L)) : q(D);
          },
          responseHandler: (D, P) => {
            let F = 0;
            D.on("data", ($) => {
              if (F += $.length, F > 524288e3) {
                P(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              L.push($);
            }), D.on("end", () => {
              P(null);
            });
          }
        }, 0);
      });
    }
    doDownload(A, T, E) {
      const q = this.createRequest(A, (U) => {
        if (U.statusCode >= 400) {
          T.callback(new Error(`Cannot download "${A.protocol || "https:"}//${A.hostname}${A.path}", status ${U.statusCode}: ${U.statusMessage}`));
          return;
        }
        U.on("error", T.callback);
        const L = R(U, "location");
        if (L != null) {
          E < this.maxRedirects ? this.doDownload(p.prepareRedirectUrlOptions(L, A), T, E++) : T.callback(this.createMaxRedirectError());
          return;
        }
        T.responseHandler == null ? O(T, U) : T.responseHandler(U, T.callback);
      });
      this.addErrorAndTimeoutHandlers(q, T.callback, A.timeout), this.addRedirectHandlers(q, A, T.callback, E, (U) => {
        this.doDownload(U, T, E++);
      }), q.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(A, T, E) {
      A.on("socket", (q) => {
        q.setTimeout(E, () => {
          A.abort(), T(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(A, T) {
      const E = g(A, { ...T }), q = E.headers;
      if (q != null && q.authorization) {
        const U = new u.URL(A);
        (U.hostname.endsWith(".amazonaws.com") || U.searchParams.has("X-Amz-Credential")) && delete q.authorization;
      }
      return E;
    }
    static retryOnServerError(A, T = 3) {
      for (let E = 0; ; E++)
        try {
          return A();
        } catch (q) {
          if (E < T && (q instanceof o && q.isServerError() || q.code === "EPIPE"))
            continue;
          throw q;
        }
    }
  }
  Me.HttpExecutor = p;
  function g(C, A) {
    const T = I(A);
    return _(new u.URL(C), T), T;
  }
  function _(C, A) {
    A.protocol = C.protocol, A.hostname = C.hostname, C.port ? A.port = C.port : A.port && delete A.port, A.path = C.pathname + C.search;
  }
  class m extends d.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(A, T = "sha512", E = "base64") {
      super(), this.expected = A, this.algorithm = T, this.encoding = E, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, n.createHash)(T);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(A, T, E) {
      this.digester.update(A), E(null, A);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(A) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (T) {
          A(T);
          return;
        }
      A(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, a.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, a.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  Me.DigestTransform = m;
  function w(C, A, T) {
    return C != null && A != null && C !== A ? (T(new Error(`checksum mismatch: expected ${A} but got ${C} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function R(C, A) {
    const T = C.headers[A];
    return T == null ? null : Array.isArray(T) ? T.length === 0 ? null : T[T.length - 1] : T;
  }
  function O(C, A) {
    if (!w(R(A, "X-Checksum-Sha2"), C.options.sha2, C.callback))
      return;
    const T = [];
    if (C.options.onProgress != null) {
      const L = R(A, "content-length");
      L != null && T.push(new c.ProgressCallbackTransform(parseInt(L, 10), C.options.cancellationToken, C.options.onProgress));
    }
    const E = C.options.sha512;
    E != null ? T.push(new m(E, "sha512", E.length === 128 && !E.includes("+") && !E.includes("Z") && !E.includes("=") ? "hex" : "base64")) : C.options.sha2 != null && T.push(new m(C.options.sha2, "sha256", "hex"));
    const q = (0, h.createWriteStream)(C.destination);
    T.push(q);
    let U = A;
    for (const L of T)
      L.on("error", (k) => {
        q.close(), C.options.cancellationToken.cancelled || C.callback(k);
      }), U = U.pipe(L);
    q.on("finish", () => {
      q.close(C.callback);
    });
  }
  function I(C, A, T) {
    T != null && (C.method = T), C.headers = { ...C.headers };
    const E = C.headers;
    return A != null && (E.authorization = A.startsWith("Basic") || A.startsWith("Bearer") ? A : `token ${A}`), E["User-Agent"] == null && (E["User-Agent"] = "electron-builder"), (T == null || T === "GET" || E["Cache-Control"] == null) && (E["Cache-Control"] = "no-cache"), C.protocol == null && process.versions.electron != null && (C.protocol = "https:"), C;
  }
  function M(C, A) {
    return JSON.stringify(C, (T, E) => T.endsWith("Authorization") || T.endsWith("authorization") || T.endsWith("Password") || T.endsWith("PASSWORD") || T.endsWith("Token") || T.includes("password") || T.includes("token") || A != null && A.has(T) ? "<stripped sensitive data>" : E, 2);
  }
  return Me;
}
var Bt = {}, Da;
function oc() {
  if (Da) return Bt;
  Da = 1, Object.defineProperty(Bt, "__esModule", { value: !0 }), Bt.githubUrl = n, Bt.getS3LikeProviderBaseUrl = f;
  function n(s, a = "github.com") {
    return `${s.protocol || "https"}://${s.host || a}`;
  }
  function f(s) {
    const a = s.provider;
    if (a === "s3")
      return h(s);
    if (a === "spaces")
      return u(s);
    throw new Error(`Not supported provider: ${a}`);
  }
  function h(s) {
    let a;
    if (s.accelerate == !0)
      a = `https://${s.bucket}.s3-accelerate.amazonaws.com`;
    else if (s.endpoint != null)
      a = `${s.endpoint}/${s.bucket}`;
    else if (s.bucket.includes(".")) {
      if (s.region == null)
        throw new Error(`Bucket name "${s.bucket}" includes a dot, but S3 region is missing`);
      s.region === "us-east-1" ? a = `https://s3.amazonaws.com/${s.bucket}` : a = `https://s3-${s.region}.amazonaws.com/${s.bucket}`;
    } else s.region === "cn-north-1" ? a = `https://${s.bucket}.s3.${s.region}.amazonaws.com.cn` : a = `https://${s.bucket}.s3.amazonaws.com`;
    return d(a, s.path);
  }
  function d(s, a) {
    return a != null && a.length > 0 && (a.startsWith("/") || (s += "/"), s += a), s;
  }
  function u(s) {
    if (s.name == null)
      throw new Error("name is missing");
    if (s.region == null)
      throw new Error("region is missing");
    return d(`https://${s.name}.${s.region}.digitaloceanspaces.com`, s.path);
  }
  return Bt;
}
var Rr = {}, Na;
function sc() {
  if (Na) return Rr;
  Na = 1, Object.defineProperty(Rr, "__esModule", { value: !0 }), Rr.parseDn = n;
  function n(f) {
    let h = !1, d = null, u = "", s = 0;
    f = f.trim();
    const a = /* @__PURE__ */ new Map();
    for (let c = 0; c <= f.length; c++) {
      if (c === f.length) {
        d !== null && a.set(d, u);
        break;
      }
      const i = f[c];
      if (h) {
        if (i === '"') {
          h = !1;
          continue;
        }
      } else {
        if (i === '"') {
          h = !0;
          continue;
        }
        if (i === "\\") {
          c++;
          const t = parseInt(f.slice(c, c + 2), 16);
          Number.isNaN(t) ? u += f[c] : (c++, u += String.fromCharCode(t));
          continue;
        }
        if (d === null && i === "=") {
          d = u, u = "";
          continue;
        }
        if (i === "," || i === ";" || i === "+") {
          d !== null && a.set(d, u), d = null, u = "";
          continue;
        }
      }
      if (i === " " && !h) {
        if (u.length === 0)
          continue;
        if (c > s) {
          let t = c;
          for (; f[t] === " "; )
            t++;
          s = t;
        }
        if (s >= f.length || f[s] === "," || f[s] === ";" || d === null && f[s] === "=" || d !== null && f[s] === "+") {
          c = s - 1;
          continue;
        }
      }
      u += i;
    }
    return a;
  }
  return Rr;
}
var _t = {}, Fa;
function lc() {
  if (Fa) return _t;
  Fa = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.nil = _t.UUID = void 0;
  const n = ur, f = $r(), h = "options.name must be either a string or a Buffer", d = (0, n.randomBytes)(16);
  d[0] = d[0] | 1;
  const u = {}, s = [];
  for (let o = 0; o < 256; o++) {
    const r = (o + 256).toString(16).substr(1);
    u[r] = o, s[o] = r;
  }
  class a {
    constructor(r) {
      this.ascii = null, this.binary = null;
      const p = a.check(r);
      if (!p)
        throw new Error("not a UUID");
      this.version = p.version, p.format === "ascii" ? this.ascii = r : this.binary = r;
    }
    static v5(r, p) {
      return t(r, "sha1", 80, p);
    }
    toString() {
      return this.ascii == null && (this.ascii = l(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(r, p = 0) {
      if (typeof r == "string")
        return r = r.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(r) ? r === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (u[r[14] + r[15]] & 240) >> 4,
          variant: c((u[r[19] + r[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(r)) {
        if (r.length < p + 16)
          return !1;
        let g = 0;
        for (; g < 16 && r[p + g] === 0; g++)
          ;
        return g === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (r[p + 6] & 240) >> 4,
          variant: c((r[p + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, f.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(r) {
      const p = Buffer.allocUnsafe(16);
      let g = 0;
      for (let _ = 0; _ < 16; _++)
        p[_] = u[r[g++] + r[g++]], (_ === 3 || _ === 5 || _ === 7 || _ === 9) && (g += 1);
      return p;
    }
  }
  _t.UUID = a, a.OID = a.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function c(o) {
    switch (o) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var i;
  (function(o) {
    o[o.ASCII = 0] = "ASCII", o[o.BINARY = 1] = "BINARY", o[o.OBJECT = 2] = "OBJECT";
  })(i || (i = {}));
  function t(o, r, p, g, _ = i.ASCII) {
    const m = (0, n.createHash)(r);
    if (typeof o != "string" && !Buffer.isBuffer(o))
      throw (0, f.newError)(h, "ERR_INVALID_UUID_NAME");
    m.update(g), m.update(o);
    const R = m.digest();
    let O;
    switch (_) {
      case i.BINARY:
        R[6] = R[6] & 15 | p, R[8] = R[8] & 63 | 128, O = R;
        break;
      case i.OBJECT:
        R[6] = R[6] & 15 | p, R[8] = R[8] & 63 | 128, O = new a(R);
        break;
      default:
        O = s[R[0]] + s[R[1]] + s[R[2]] + s[R[3]] + "-" + s[R[4]] + s[R[5]] + "-" + s[R[6] & 15 | p] + s[R[7]] + "-" + s[R[8] & 63 | 128] + s[R[9]] + "-" + s[R[10]] + s[R[11]] + s[R[12]] + s[R[13]] + s[R[14]] + s[R[15]];
        break;
    }
    return O;
  }
  function l(o) {
    return s[o[0]] + s[o[1]] + s[o[2]] + s[o[3]] + "-" + s[o[4]] + s[o[5]] + "-" + s[o[6]] + s[o[7]] + "-" + s[o[8]] + s[o[9]] + "-" + s[o[10]] + s[o[11]] + s[o[12]] + s[o[13]] + s[o[14]] + s[o[15]];
  }
  return _t.nil = new a("00000000-0000-0000-0000-000000000000"), _t;
}
var It = {}, Qr = {}, xa;
function uc() {
  return xa || (xa = 1, function(n) {
    (function(f) {
      f.parser = function(S, v) {
        return new d(S, v);
      }, f.SAXParser = d, f.SAXStream = l, f.createStream = t, f.MAX_BUFFER_LENGTH = 64 * 1024;
      var h = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      f.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function d(S, v) {
        if (!(this instanceof d))
          return new d(S, v);
        var H = this;
        s(H), H.q = H.c = "", H.bufferCheckPosition = f.MAX_BUFFER_LENGTH, H.opt = v || {}, H.opt.lowercase = H.opt.lowercase || H.opt.lowercasetags, H.looseCase = H.opt.lowercase ? "toLowerCase" : "toUpperCase", H.tags = [], H.closed = H.closedRoot = H.sawRoot = !1, H.tag = H.error = null, H.strict = !!S, H.noscript = !!(S || H.opt.noscript), H.state = E.BEGIN, H.strictEntities = H.opt.strictEntities, H.ENTITIES = H.strictEntities ? Object.create(f.XML_ENTITIES) : Object.create(f.ENTITIES), H.attribList = [], H.opt.xmlns && (H.ns = Object.create(_)), H.opt.unquotedAttributeValues === void 0 && (H.opt.unquotedAttributeValues = !S), H.trackPosition = H.opt.position !== !1, H.trackPosition && (H.position = H.line = H.column = 0), U(H, "onready");
      }
      Object.create || (Object.create = function(S) {
        function v() {
        }
        v.prototype = S;
        var H = new v();
        return H;
      }), Object.keys || (Object.keys = function(S) {
        var v = [];
        for (var H in S) S.hasOwnProperty(H) && v.push(H);
        return v;
      });
      function u(S) {
        for (var v = Math.max(f.MAX_BUFFER_LENGTH, 10), H = 0, N = 0, le = h.length; N < le; N++) {
          var me = S[h[N]].length;
          if (me > v)
            switch (h[N]) {
              case "textNode":
                k(S);
                break;
              case "cdata":
                L(S, "oncdata", S.cdata), S.cdata = "";
                break;
              case "script":
                L(S, "onscript", S.script), S.script = "";
                break;
              default:
                P(S, "Max buffer length exceeded: " + h[N]);
            }
          H = Math.max(H, me);
        }
        var pe = f.MAX_BUFFER_LENGTH - H;
        S.bufferCheckPosition = pe + S.position;
      }
      function s(S) {
        for (var v = 0, H = h.length; v < H; v++)
          S[h[v]] = "";
      }
      function a(S) {
        k(S), S.cdata !== "" && (L(S, "oncdata", S.cdata), S.cdata = ""), S.script !== "" && (L(S, "onscript", S.script), S.script = "");
      }
      d.prototype = {
        end: function() {
          F(this);
        },
        write: Ee,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          a(this);
        }
      };
      var c;
      try {
        c = require("stream").Stream;
      } catch {
        c = function() {
        };
      }
      c || (c = function() {
      });
      var i = f.EVENTS.filter(function(S) {
        return S !== "error" && S !== "end";
      });
      function t(S, v) {
        return new l(S, v);
      }
      function l(S, v) {
        if (!(this instanceof l))
          return new l(S, v);
        c.apply(this), this._parser = new d(S, v), this.writable = !0, this.readable = !0;
        var H = this;
        this._parser.onend = function() {
          H.emit("end");
        }, this._parser.onerror = function(N) {
          H.emit("error", N), H._parser.error = null;
        }, this._decoder = null, i.forEach(function(N) {
          Object.defineProperty(H, "on" + N, {
            get: function() {
              return H._parser["on" + N];
            },
            set: function(le) {
              if (!le)
                return H.removeAllListeners(N), H._parser["on" + N] = le, le;
              H.on(N, le);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      l.prototype = Object.create(c.prototype, {
        constructor: {
          value: l
        }
      }), l.prototype.write = function(S) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(S)) {
          if (!this._decoder) {
            var v = Ku.StringDecoder;
            this._decoder = new v("utf8");
          }
          S = this._decoder.write(S);
        }
        return this._parser.write(S.toString()), this.emit("data", S), !0;
      }, l.prototype.end = function(S) {
        return S && S.length && this.write(S), this._parser.end(), !0;
      }, l.prototype.on = function(S, v) {
        var H = this;
        return !H._parser["on" + S] && i.indexOf(S) !== -1 && (H._parser["on" + S] = function() {
          var N = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          N.splice(0, 0, S), H.emit.apply(H, N);
        }), c.prototype.on.call(H, S, v);
      };
      var o = "[CDATA[", r = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", g = "http://www.w3.org/2000/xmlns/", _ = { xml: p, xmlns: g }, m = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, w = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, R = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, O = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function I(S) {
        return S === " " || S === `
` || S === "\r" || S === "	";
      }
      function M(S) {
        return S === '"' || S === "'";
      }
      function C(S) {
        return S === ">" || I(S);
      }
      function A(S, v) {
        return S.test(v);
      }
      function T(S, v) {
        return !A(S, v);
      }
      var E = 0;
      f.STATE = {
        BEGIN: E++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: E++,
        // leading whitespace
        TEXT: E++,
        // general stuff
        TEXT_ENTITY: E++,
        // &amp and such.
        OPEN_WAKA: E++,
        // <
        SGML_DECL: E++,
        // <!BLARG
        SGML_DECL_QUOTED: E++,
        // <!BLARG foo "bar
        DOCTYPE: E++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: E++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: E++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: E++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: E++,
        // <!-
        COMMENT: E++,
        // <!--
        COMMENT_ENDING: E++,
        // <!-- blah -
        COMMENT_ENDED: E++,
        // <!-- blah --
        CDATA: E++,
        // <![CDATA[ something
        CDATA_ENDING: E++,
        // ]
        CDATA_ENDING_2: E++,
        // ]]
        PROC_INST: E++,
        // <?hi
        PROC_INST_BODY: E++,
        // <?hi there
        PROC_INST_ENDING: E++,
        // <?hi "there" ?
        OPEN_TAG: E++,
        // <strong
        OPEN_TAG_SLASH: E++,
        // <strong /
        ATTRIB: E++,
        // <a
        ATTRIB_NAME: E++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: E++,
        // <a foo _
        ATTRIB_VALUE: E++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: E++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: E++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: E++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: E++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: E++,
        // <foo bar=&quot
        CLOSE_TAG: E++,
        // </a
        CLOSE_TAG_SAW_WHITE: E++,
        // </a   >
        SCRIPT: E++,
        // <script> ...
        SCRIPT_ENDING: E++
        // <script> ... <
      }, f.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, f.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(f.ENTITIES).forEach(function(S) {
        var v = f.ENTITIES[S], H = typeof v == "number" ? String.fromCharCode(v) : v;
        f.ENTITIES[S] = H;
      });
      for (var q in f.STATE)
        f.STATE[f.STATE[q]] = q;
      E = f.STATE;
      function U(S, v, H) {
        S[v] && S[v](H);
      }
      function L(S, v, H) {
        S.textNode && k(S), U(S, v, H);
      }
      function k(S) {
        S.textNode = D(S.opt, S.textNode), S.textNode && U(S, "ontext", S.textNode), S.textNode = "";
      }
      function D(S, v) {
        return S.trim && (v = v.trim()), S.normalize && (v = v.replace(/\s+/g, " ")), v;
      }
      function P(S, v) {
        return k(S), S.trackPosition && (v += `
Line: ` + S.line + `
Column: ` + S.column + `
Char: ` + S.c), v = new Error(v), S.error = v, U(S, "onerror", v), S;
      }
      function F(S) {
        return S.sawRoot && !S.closedRoot && $(S, "Unclosed root tag"), S.state !== E.BEGIN && S.state !== E.BEGIN_WHITESPACE && S.state !== E.TEXT && P(S, "Unexpected end"), k(S), S.c = "", S.closed = !0, U(S, "onend"), d.call(S, S.strict, S.opt), S;
      }
      function $(S, v) {
        if (typeof S != "object" || !(S instanceof d))
          throw new Error("bad call to strictFail");
        S.strict && P(S, v);
      }
      function J(S) {
        S.strict || (S.tagName = S.tagName[S.looseCase]());
        var v = S.tags[S.tags.length - 1] || S, H = S.tag = { name: S.tagName, attributes: {} };
        S.opt.xmlns && (H.ns = v.ns), S.attribList.length = 0, L(S, "onopentagstart", H);
      }
      function W(S, v) {
        var H = S.indexOf(":"), N = H < 0 ? ["", S] : S.split(":"), le = N[0], me = N[1];
        return v && S === "xmlns" && (le = "xmlns", me = ""), { prefix: le, local: me };
      }
      function ne(S) {
        if (S.strict || (S.attribName = S.attribName[S.looseCase]()), S.attribList.indexOf(S.attribName) !== -1 || S.tag.attributes.hasOwnProperty(S.attribName)) {
          S.attribName = S.attribValue = "";
          return;
        }
        if (S.opt.xmlns) {
          var v = W(S.attribName, !0), H = v.prefix, N = v.local;
          if (H === "xmlns")
            if (N === "xml" && S.attribValue !== p)
              $(
                S,
                "xml: prefix must be bound to " + p + `
Actual: ` + S.attribValue
              );
            else if (N === "xmlns" && S.attribValue !== g)
              $(
                S,
                "xmlns: prefix must be bound to " + g + `
Actual: ` + S.attribValue
              );
            else {
              var le = S.tag, me = S.tags[S.tags.length - 1] || S;
              le.ns === me.ns && (le.ns = Object.create(me.ns)), le.ns[N] = S.attribValue;
            }
          S.attribList.push([S.attribName, S.attribValue]);
        } else
          S.tag.attributes[S.attribName] = S.attribValue, L(S, "onattribute", {
            name: S.attribName,
            value: S.attribValue
          });
        S.attribName = S.attribValue = "";
      }
      function ce(S, v) {
        if (S.opt.xmlns) {
          var H = S.tag, N = W(S.tagName);
          H.prefix = N.prefix, H.local = N.local, H.uri = H.ns[N.prefix] || "", H.prefix && !H.uri && ($(S, "Unbound namespace prefix: " + JSON.stringify(S.tagName)), H.uri = N.prefix);
          var le = S.tags[S.tags.length - 1] || S;
          H.ns && le.ns !== H.ns && Object.keys(H.ns).forEach(function(B) {
            L(S, "onopennamespace", {
              prefix: B,
              uri: H.ns[B]
            });
          });
          for (var me = 0, pe = S.attribList.length; me < pe; me++) {
            var _e = S.attribList[me], ye = _e[0], Fe = _e[1], Ce = W(ye, !0), ke = Ce.prefix, pt = Ce.local, nt = ke === "" ? "" : H.ns[ke] || "", e = {
              name: ye,
              value: Fe,
              prefix: ke,
              local: pt,
              uri: nt
            };
            ke && ke !== "xmlns" && !nt && ($(S, "Unbound namespace prefix: " + JSON.stringify(ke)), e.uri = ke), S.tag.attributes[ye] = e, L(S, "onattribute", e);
          }
          S.attribList.length = 0;
        }
        S.tag.isSelfClosing = !!v, S.sawRoot = !0, S.tags.push(S.tag), L(S, "onopentag", S.tag), v || (!S.noscript && S.tagName.toLowerCase() === "script" ? S.state = E.SCRIPT : S.state = E.TEXT, S.tag = null, S.tagName = ""), S.attribName = S.attribValue = "", S.attribList.length = 0;
      }
      function ue(S) {
        if (!S.tagName) {
          $(S, "Weird empty close tag."), S.textNode += "</>", S.state = E.TEXT;
          return;
        }
        if (S.script) {
          if (S.tagName !== "script") {
            S.script += "</" + S.tagName + ">", S.tagName = "", S.state = E.SCRIPT;
            return;
          }
          L(S, "onscript", S.script), S.script = "";
        }
        var v = S.tags.length, H = S.tagName;
        S.strict || (H = H[S.looseCase]());
        for (var N = H; v--; ) {
          var le = S.tags[v];
          if (le.name !== N)
            $(S, "Unexpected close tag");
          else
            break;
        }
        if (v < 0) {
          $(S, "Unmatched closing tag: " + S.tagName), S.textNode += "</" + S.tagName + ">", S.state = E.TEXT;
          return;
        }
        S.tagName = H;
        for (var me = S.tags.length; me-- > v; ) {
          var pe = S.tag = S.tags.pop();
          S.tagName = S.tag.name, L(S, "onclosetag", S.tagName);
          var _e = {};
          for (var ye in pe.ns)
            _e[ye] = pe.ns[ye];
          var Fe = S.tags[S.tags.length - 1] || S;
          S.opt.xmlns && pe.ns !== Fe.ns && Object.keys(pe.ns).forEach(function(Ce) {
            var ke = pe.ns[Ce];
            L(S, "onclosenamespace", { prefix: Ce, uri: ke });
          });
        }
        v === 0 && (S.closedRoot = !0), S.tagName = S.attribValue = S.attribName = "", S.attribList.length = 0, S.state = E.TEXT;
      }
      function ie(S) {
        var v = S.entity, H = v.toLowerCase(), N, le = "";
        return S.ENTITIES[v] ? S.ENTITIES[v] : S.ENTITIES[H] ? S.ENTITIES[H] : (v = H, v.charAt(0) === "#" && (v.charAt(1) === "x" ? (v = v.slice(2), N = parseInt(v, 16), le = N.toString(16)) : (v = v.slice(1), N = parseInt(v, 10), le = N.toString(10))), v = v.replace(/^0+/, ""), isNaN(N) || le.toLowerCase() !== v ? ($(S, "Invalid character entity"), "&" + S.entity + ";") : String.fromCodePoint(N));
      }
      function Ae(S, v) {
        v === "<" ? (S.state = E.OPEN_WAKA, S.startTagPosition = S.position) : I(v) || ($(S, "Non-whitespace before first tag."), S.textNode = v, S.state = E.TEXT);
      }
      function K(S, v) {
        var H = "";
        return v < S.length && (H = S.charAt(v)), H;
      }
      function Ee(S) {
        var v = this;
        if (this.error)
          throw this.error;
        if (v.closed)
          return P(
            v,
            "Cannot write after close. Assign an onready handler."
          );
        if (S === null)
          return F(v);
        typeof S == "object" && (S = S.toString());
        for (var H = 0, N = ""; N = K(S, H++), v.c = N, !!N; )
          switch (v.trackPosition && (v.position++, N === `
` ? (v.line++, v.column = 0) : v.column++), v.state) {
            case E.BEGIN:
              if (v.state = E.BEGIN_WHITESPACE, N === "\uFEFF")
                continue;
              Ae(v, N);
              continue;
            case E.BEGIN_WHITESPACE:
              Ae(v, N);
              continue;
            case E.TEXT:
              if (v.sawRoot && !v.closedRoot) {
                for (var le = H - 1; N && N !== "<" && N !== "&"; )
                  N = K(S, H++), N && v.trackPosition && (v.position++, N === `
` ? (v.line++, v.column = 0) : v.column++);
                v.textNode += S.substring(le, H - 1);
              }
              N === "<" && !(v.sawRoot && v.closedRoot && !v.strict) ? (v.state = E.OPEN_WAKA, v.startTagPosition = v.position) : (!I(N) && (!v.sawRoot || v.closedRoot) && $(v, "Text data outside of root node."), N === "&" ? v.state = E.TEXT_ENTITY : v.textNode += N);
              continue;
            case E.SCRIPT:
              N === "<" ? v.state = E.SCRIPT_ENDING : v.script += N;
              continue;
            case E.SCRIPT_ENDING:
              N === "/" ? v.state = E.CLOSE_TAG : (v.script += "<" + N, v.state = E.SCRIPT);
              continue;
            case E.OPEN_WAKA:
              if (N === "!")
                v.state = E.SGML_DECL, v.sgmlDecl = "";
              else if (!I(N)) if (A(m, N))
                v.state = E.OPEN_TAG, v.tagName = N;
              else if (N === "/")
                v.state = E.CLOSE_TAG, v.tagName = "";
              else if (N === "?")
                v.state = E.PROC_INST, v.procInstName = v.procInstBody = "";
              else {
                if ($(v, "Unencoded <"), v.startTagPosition + 1 < v.position) {
                  var me = v.position - v.startTagPosition;
                  N = new Array(me).join(" ") + N;
                }
                v.textNode += "<" + N, v.state = E.TEXT;
              }
              continue;
            case E.SGML_DECL:
              if (v.sgmlDecl + N === "--") {
                v.state = E.COMMENT, v.comment = "", v.sgmlDecl = "";
                continue;
              }
              v.doctype && v.doctype !== !0 && v.sgmlDecl ? (v.state = E.DOCTYPE_DTD, v.doctype += "<!" + v.sgmlDecl + N, v.sgmlDecl = "") : (v.sgmlDecl + N).toUpperCase() === o ? (L(v, "onopencdata"), v.state = E.CDATA, v.sgmlDecl = "", v.cdata = "") : (v.sgmlDecl + N).toUpperCase() === r ? (v.state = E.DOCTYPE, (v.doctype || v.sawRoot) && $(
                v,
                "Inappropriately located doctype declaration"
              ), v.doctype = "", v.sgmlDecl = "") : N === ">" ? (L(v, "onsgmldeclaration", v.sgmlDecl), v.sgmlDecl = "", v.state = E.TEXT) : (M(N) && (v.state = E.SGML_DECL_QUOTED), v.sgmlDecl += N);
              continue;
            case E.SGML_DECL_QUOTED:
              N === v.q && (v.state = E.SGML_DECL, v.q = ""), v.sgmlDecl += N;
              continue;
            case E.DOCTYPE:
              N === ">" ? (v.state = E.TEXT, L(v, "ondoctype", v.doctype), v.doctype = !0) : (v.doctype += N, N === "[" ? v.state = E.DOCTYPE_DTD : M(N) && (v.state = E.DOCTYPE_QUOTED, v.q = N));
              continue;
            case E.DOCTYPE_QUOTED:
              v.doctype += N, N === v.q && (v.q = "", v.state = E.DOCTYPE);
              continue;
            case E.DOCTYPE_DTD:
              N === "]" ? (v.doctype += N, v.state = E.DOCTYPE) : N === "<" ? (v.state = E.OPEN_WAKA, v.startTagPosition = v.position) : M(N) ? (v.doctype += N, v.state = E.DOCTYPE_DTD_QUOTED, v.q = N) : v.doctype += N;
              continue;
            case E.DOCTYPE_DTD_QUOTED:
              v.doctype += N, N === v.q && (v.state = E.DOCTYPE_DTD, v.q = "");
              continue;
            case E.COMMENT:
              N === "-" ? v.state = E.COMMENT_ENDING : v.comment += N;
              continue;
            case E.COMMENT_ENDING:
              N === "-" ? (v.state = E.COMMENT_ENDED, v.comment = D(v.opt, v.comment), v.comment && L(v, "oncomment", v.comment), v.comment = "") : (v.comment += "-" + N, v.state = E.COMMENT);
              continue;
            case E.COMMENT_ENDED:
              N !== ">" ? ($(v, "Malformed comment"), v.comment += "--" + N, v.state = E.COMMENT) : v.doctype && v.doctype !== !0 ? v.state = E.DOCTYPE_DTD : v.state = E.TEXT;
              continue;
            case E.CDATA:
              N === "]" ? v.state = E.CDATA_ENDING : v.cdata += N;
              continue;
            case E.CDATA_ENDING:
              N === "]" ? v.state = E.CDATA_ENDING_2 : (v.cdata += "]" + N, v.state = E.CDATA);
              continue;
            case E.CDATA_ENDING_2:
              N === ">" ? (v.cdata && L(v, "oncdata", v.cdata), L(v, "onclosecdata"), v.cdata = "", v.state = E.TEXT) : N === "]" ? v.cdata += "]" : (v.cdata += "]]" + N, v.state = E.CDATA);
              continue;
            case E.PROC_INST:
              N === "?" ? v.state = E.PROC_INST_ENDING : I(N) ? v.state = E.PROC_INST_BODY : v.procInstName += N;
              continue;
            case E.PROC_INST_BODY:
              if (!v.procInstBody && I(N))
                continue;
              N === "?" ? v.state = E.PROC_INST_ENDING : v.procInstBody += N;
              continue;
            case E.PROC_INST_ENDING:
              N === ">" ? (L(v, "onprocessinginstruction", {
                name: v.procInstName,
                body: v.procInstBody
              }), v.procInstName = v.procInstBody = "", v.state = E.TEXT) : (v.procInstBody += "?" + N, v.state = E.PROC_INST_BODY);
              continue;
            case E.OPEN_TAG:
              A(w, N) ? v.tagName += N : (J(v), N === ">" ? ce(v) : N === "/" ? v.state = E.OPEN_TAG_SLASH : (I(N) || $(v, "Invalid character in tag name"), v.state = E.ATTRIB));
              continue;
            case E.OPEN_TAG_SLASH:
              N === ">" ? (ce(v, !0), ue(v)) : ($(v, "Forward-slash in opening tag not followed by >"), v.state = E.ATTRIB);
              continue;
            case E.ATTRIB:
              if (I(N))
                continue;
              N === ">" ? ce(v) : N === "/" ? v.state = E.OPEN_TAG_SLASH : A(m, N) ? (v.attribName = N, v.attribValue = "", v.state = E.ATTRIB_NAME) : $(v, "Invalid attribute name");
              continue;
            case E.ATTRIB_NAME:
              N === "=" ? v.state = E.ATTRIB_VALUE : N === ">" ? ($(v, "Attribute without value"), v.attribValue = v.attribName, ne(v), ce(v)) : I(N) ? v.state = E.ATTRIB_NAME_SAW_WHITE : A(w, N) ? v.attribName += N : $(v, "Invalid attribute name");
              continue;
            case E.ATTRIB_NAME_SAW_WHITE:
              if (N === "=")
                v.state = E.ATTRIB_VALUE;
              else {
                if (I(N))
                  continue;
                $(v, "Attribute without value"), v.tag.attributes[v.attribName] = "", v.attribValue = "", L(v, "onattribute", {
                  name: v.attribName,
                  value: ""
                }), v.attribName = "", N === ">" ? ce(v) : A(m, N) ? (v.attribName = N, v.state = E.ATTRIB_NAME) : ($(v, "Invalid attribute name"), v.state = E.ATTRIB);
              }
              continue;
            case E.ATTRIB_VALUE:
              if (I(N))
                continue;
              M(N) ? (v.q = N, v.state = E.ATTRIB_VALUE_QUOTED) : (v.opt.unquotedAttributeValues || P(v, "Unquoted attribute value"), v.state = E.ATTRIB_VALUE_UNQUOTED, v.attribValue = N);
              continue;
            case E.ATTRIB_VALUE_QUOTED:
              if (N !== v.q) {
                N === "&" ? v.state = E.ATTRIB_VALUE_ENTITY_Q : v.attribValue += N;
                continue;
              }
              ne(v), v.q = "", v.state = E.ATTRIB_VALUE_CLOSED;
              continue;
            case E.ATTRIB_VALUE_CLOSED:
              I(N) ? v.state = E.ATTRIB : N === ">" ? ce(v) : N === "/" ? v.state = E.OPEN_TAG_SLASH : A(m, N) ? ($(v, "No whitespace between attributes"), v.attribName = N, v.attribValue = "", v.state = E.ATTRIB_NAME) : $(v, "Invalid attribute name");
              continue;
            case E.ATTRIB_VALUE_UNQUOTED:
              if (!C(N)) {
                N === "&" ? v.state = E.ATTRIB_VALUE_ENTITY_U : v.attribValue += N;
                continue;
              }
              ne(v), N === ">" ? ce(v) : v.state = E.ATTRIB;
              continue;
            case E.CLOSE_TAG:
              if (v.tagName)
                N === ">" ? ue(v) : A(w, N) ? v.tagName += N : v.script ? (v.script += "</" + v.tagName, v.tagName = "", v.state = E.SCRIPT) : (I(N) || $(v, "Invalid tagname in closing tag"), v.state = E.CLOSE_TAG_SAW_WHITE);
              else {
                if (I(N))
                  continue;
                T(m, N) ? v.script ? (v.script += "</" + N, v.state = E.SCRIPT) : $(v, "Invalid tagname in closing tag.") : v.tagName = N;
              }
              continue;
            case E.CLOSE_TAG_SAW_WHITE:
              if (I(N))
                continue;
              N === ">" ? ue(v) : $(v, "Invalid characters in closing tag");
              continue;
            case E.TEXT_ENTITY:
            case E.ATTRIB_VALUE_ENTITY_Q:
            case E.ATTRIB_VALUE_ENTITY_U:
              var pe, _e;
              switch (v.state) {
                case E.TEXT_ENTITY:
                  pe = E.TEXT, _e = "textNode";
                  break;
                case E.ATTRIB_VALUE_ENTITY_Q:
                  pe = E.ATTRIB_VALUE_QUOTED, _e = "attribValue";
                  break;
                case E.ATTRIB_VALUE_ENTITY_U:
                  pe = E.ATTRIB_VALUE_UNQUOTED, _e = "attribValue";
                  break;
              }
              if (N === ";") {
                var ye = ie(v);
                v.opt.unparsedEntities && !Object.values(f.XML_ENTITIES).includes(ye) ? (v.entity = "", v.state = pe, v.write(ye)) : (v[_e] += ye, v.entity = "", v.state = pe);
              } else A(v.entity.length ? O : R, N) ? v.entity += N : ($(v, "Invalid character in entity name"), v[_e] += "&" + v.entity + N, v.entity = "", v.state = pe);
              continue;
            default:
              throw new Error(v, "Unknown state: " + v.state);
          }
        return v.position >= v.bufferCheckPosition && u(v), v;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || function() {
        var S = String.fromCharCode, v = Math.floor, H = function() {
          var N = 16384, le = [], me, pe, _e = -1, ye = arguments.length;
          if (!ye)
            return "";
          for (var Fe = ""; ++_e < ye; ) {
            var Ce = Number(arguments[_e]);
            if (!isFinite(Ce) || // `NaN`, `+Infinity`, or `-Infinity`
            Ce < 0 || // not a valid Unicode code point
            Ce > 1114111 || // not a valid Unicode code point
            v(Ce) !== Ce)
              throw RangeError("Invalid code point: " + Ce);
            Ce <= 65535 ? le.push(Ce) : (Ce -= 65536, me = (Ce >> 10) + 55296, pe = Ce % 1024 + 56320, le.push(me, pe)), (_e + 1 === ye || le.length > N) && (Fe += S.apply(null, le), le.length = 0);
          }
          return Fe;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: H,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = H;
      }();
    })(n);
  }(Qr)), Qr;
}
var La;
function cc() {
  if (La) return It;
  La = 1, Object.defineProperty(It, "__esModule", { value: !0 }), It.XElement = void 0, It.parseXml = a;
  const n = uc(), f = $r();
  class h {
    constructor(i) {
      if (this.name = i, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !i)
        throw (0, f.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!u(i))
        throw (0, f.newError)(`Invalid element name: ${i}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(i) {
      const t = this.attributes === null ? null : this.attributes[i];
      if (t == null)
        throw (0, f.newError)(`No attribute "${i}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return t;
    }
    removeAttribute(i) {
      this.attributes !== null && delete this.attributes[i];
    }
    element(i, t = !1, l = null) {
      const o = this.elementOrNull(i, t);
      if (o === null)
        throw (0, f.newError)(l || `No element "${i}"`, "ERR_XML_MISSED_ELEMENT");
      return o;
    }
    elementOrNull(i, t = !1) {
      if (this.elements === null)
        return null;
      for (const l of this.elements)
        if (s(l, i, t))
          return l;
      return null;
    }
    getElements(i, t = !1) {
      return this.elements === null ? [] : this.elements.filter((l) => s(l, i, t));
    }
    elementValueOrEmpty(i, t = !1) {
      const l = this.elementOrNull(i, t);
      return l === null ? "" : l.value;
    }
  }
  It.XElement = h;
  const d = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function u(c) {
    return d.test(c);
  }
  function s(c, i, t) {
    const l = c.name;
    return l === i || t === !0 && l.length === i.length && l.toLowerCase() === i.toLowerCase();
  }
  function a(c) {
    let i = null;
    const t = n.parser(!0, {}), l = [];
    return t.onopentag = (o) => {
      const r = new h(o.name);
      if (r.attributes = o.attributes, i === null)
        i = r;
      else {
        const p = l[l.length - 1];
        p.elements == null && (p.elements = []), p.elements.push(r);
      }
      l.push(r);
    }, t.onclosetag = () => {
      l.pop();
    }, t.ontext = (o) => {
      l.length > 0 && (l[l.length - 1].value = o);
    }, t.oncdata = (o) => {
      const r = l[l.length - 1];
      r.value = o, r.isCData = !0;
    }, t.onerror = (o) => {
      throw o;
    }, t.write(c), i;
  }
  return It;
}
var Ht = {}, Ua;
function fc() {
  if (Ua) return Ht;
  Ua = 1, Object.defineProperty(Ht, "__esModule", { value: !0 }), Ht.MemoLazy = void 0;
  let n = class {
    constructor(d, u) {
      this.selector = d, this.creator = u, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const d = this.selector();
      if (this._value !== void 0 && f(this.selected, d))
        return this._value;
      this.selected = d;
      const u = this.creator(d);
      return this.value = u, u;
    }
    set value(d) {
      this._value = d;
    }
  };
  Ht.MemoLazy = n;
  function f(h, d) {
    if (typeof h == "object" && h !== null && (typeof d == "object" && d !== null)) {
      const a = Object.keys(h), c = Object.keys(d);
      return a.length === c.length && a.every((i) => f(h[i], d[i]));
    }
    return h === d;
  }
  return Ht;
}
var Cr = {}, $a;
function dc() {
  if ($a) return Cr;
  $a = 1, Object.defineProperty(Cr, "__esModule", { value: !0 }), Cr.retry = f;
  const n = zi();
  async function f(h, d, u, s = 0, a = 0, c) {
    var i;
    const t = new n.CancellationToken();
    try {
      return await h();
    } catch (l) {
      if ((!((i = c == null ? void 0 : c(l)) !== null && i !== void 0) || i) && d > 0 && !t.cancelled)
        return await new Promise((o) => setTimeout(o, u + s * a)), await f(h, d - 1, u, s, a + 1, c);
      throw l;
    }
  }
  return Cr;
}
var ka;
function $e() {
  return ka || (ka = 1, function(n) {
    Object.defineProperty(n, "__esModule", { value: !0 }), n.CURRENT_APP_PACKAGE_FILE_NAME = n.CURRENT_APP_INSTALLER_FILE_NAME = n.retry = n.MemoLazy = n.newError = n.XElement = n.parseXml = n.ProgressCallbackTransform = n.UUID = n.parseDn = n.githubUrl = n.getS3LikeProviderBaseUrl = n.configureRequestUrl = n.parseJson = n.safeStringifyJson = n.configureRequestOptionsFromUrl = n.configureRequestOptions = n.safeGetHeader = n.DigestTransform = n.HttpExecutor = n.createHttpError = n.HttpError = n.CancellationError = n.CancellationToken = void 0, n.asArray = o;
    var f = zi();
    Object.defineProperty(n, "CancellationToken", { enumerable: !0, get: function() {
      return f.CancellationToken;
    } }), Object.defineProperty(n, "CancellationError", { enumerable: !0, get: function() {
      return f.CancellationError;
    } });
    var h = ac();
    Object.defineProperty(n, "HttpError", { enumerable: !0, get: function() {
      return h.HttpError;
    } }), Object.defineProperty(n, "createHttpError", { enumerable: !0, get: function() {
      return h.createHttpError;
    } }), Object.defineProperty(n, "HttpExecutor", { enumerable: !0, get: function() {
      return h.HttpExecutor;
    } }), Object.defineProperty(n, "DigestTransform", { enumerable: !0, get: function() {
      return h.DigestTransform;
    } }), Object.defineProperty(n, "safeGetHeader", { enumerable: !0, get: function() {
      return h.safeGetHeader;
    } }), Object.defineProperty(n, "configureRequestOptions", { enumerable: !0, get: function() {
      return h.configureRequestOptions;
    } }), Object.defineProperty(n, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return h.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(n, "safeStringifyJson", { enumerable: !0, get: function() {
      return h.safeStringifyJson;
    } }), Object.defineProperty(n, "parseJson", { enumerable: !0, get: function() {
      return h.parseJson;
    } }), Object.defineProperty(n, "configureRequestUrl", { enumerable: !0, get: function() {
      return h.configureRequestUrl;
    } });
    var d = oc();
    Object.defineProperty(n, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return d.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(n, "githubUrl", { enumerable: !0, get: function() {
      return d.githubUrl;
    } });
    var u = sc();
    Object.defineProperty(n, "parseDn", { enumerable: !0, get: function() {
      return u.parseDn;
    } });
    var s = lc();
    Object.defineProperty(n, "UUID", { enumerable: !0, get: function() {
      return s.UUID;
    } });
    var a = Cl();
    Object.defineProperty(n, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return a.ProgressCallbackTransform;
    } });
    var c = cc();
    Object.defineProperty(n, "parseXml", { enumerable: !0, get: function() {
      return c.parseXml;
    } }), Object.defineProperty(n, "XElement", { enumerable: !0, get: function() {
      return c.XElement;
    } });
    var i = $r();
    Object.defineProperty(n, "newError", { enumerable: !0, get: function() {
      return i.newError;
    } });
    var t = fc();
    Object.defineProperty(n, "MemoLazy", { enumerable: !0, get: function() {
      return t.MemoLazy;
    } });
    var l = dc();
    Object.defineProperty(n, "retry", { enumerable: !0, get: function() {
      return l.retry;
    } }), n.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", n.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function o(r) {
      return r == null ? [] : Array.isArray(r) ? r : [r];
    }
  }(Yr)), Yr;
}
var Zr = {}, br = {}, qa;
function Ve() {
  return qa || (qa = 1, br.fromCallback = function(n) {
    return Object.defineProperty(function(...f) {
      if (typeof f[f.length - 1] == "function") n.apply(this, f);
      else
        return new Promise((h, d) => {
          f.push((u, s) => u != null ? d(u) : h(s)), n.apply(this, f);
        });
    }, "name", { value: n.name });
  }, br.fromPromise = function(n) {
    return Object.defineProperty(function(...f) {
      const h = f[f.length - 1];
      if (typeof h != "function") return n.apply(this, f);
      f.pop(), n.apply(this, f).then((d) => h(null, d), h);
    }, "name", { value: n.name });
  }), br;
}
var en, Ma;
function hc() {
  if (Ma) return en;
  Ma = 1;
  var n = Ju, f = process.cwd, h = null, d = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return h || (h = f.call(process)), h;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var u = process.chdir;
    process.chdir = function(a) {
      h = null, u.call(process, a);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, u);
  }
  en = s;
  function s(a) {
    n.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && c(a), a.lutimes || i(a), a.chown = o(a.chown), a.fchown = o(a.fchown), a.lchown = o(a.lchown), a.chmod = t(a.chmod), a.fchmod = t(a.fchmod), a.lchmod = t(a.lchmod), a.chownSync = r(a.chownSync), a.fchownSync = r(a.fchownSync), a.lchownSync = r(a.lchownSync), a.chmodSync = l(a.chmodSync), a.fchmodSync = l(a.fchmodSync), a.lchmodSync = l(a.lchmodSync), a.stat = p(a.stat), a.fstat = p(a.fstat), a.lstat = p(a.lstat), a.statSync = g(a.statSync), a.fstatSync = g(a.fstatSync), a.lstatSync = g(a.lstatSync), a.chmod && !a.lchmod && (a.lchmod = function(m, w, R) {
      R && process.nextTick(R);
    }, a.lchmodSync = function() {
    }), a.chown && !a.lchown && (a.lchown = function(m, w, R, O) {
      O && process.nextTick(O);
    }, a.lchownSync = function() {
    }), d === "win32" && (a.rename = typeof a.rename != "function" ? a.rename : function(m) {
      function w(R, O, I) {
        var M = Date.now(), C = 0;
        m(R, O, function A(T) {
          if (T && (T.code === "EACCES" || T.code === "EPERM" || T.code === "EBUSY") && Date.now() - M < 6e4) {
            setTimeout(function() {
              a.stat(O, function(E, q) {
                E && E.code === "ENOENT" ? m(R, O, A) : I(T);
              });
            }, C), C < 100 && (C += 10);
            return;
          }
          I && I(T);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(w, m), w;
    }(a.rename)), a.read = typeof a.read != "function" ? a.read : function(m) {
      function w(R, O, I, M, C, A) {
        var T;
        if (A && typeof A == "function") {
          var E = 0;
          T = function(q, U, L) {
            if (q && q.code === "EAGAIN" && E < 10)
              return E++, m.call(a, R, O, I, M, C, T);
            A.apply(this, arguments);
          };
        }
        return m.call(a, R, O, I, M, C, T);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(w, m), w;
    }(a.read), a.readSync = typeof a.readSync != "function" ? a.readSync : /* @__PURE__ */ function(m) {
      return function(w, R, O, I, M) {
        for (var C = 0; ; )
          try {
            return m.call(a, w, R, O, I, M);
          } catch (A) {
            if (A.code === "EAGAIN" && C < 10) {
              C++;
              continue;
            }
            throw A;
          }
      };
    }(a.readSync);
    function c(m) {
      m.lchmod = function(w, R, O) {
        m.open(
          w,
          n.O_WRONLY | n.O_SYMLINK,
          R,
          function(I, M) {
            if (I) {
              O && O(I);
              return;
            }
            m.fchmod(M, R, function(C) {
              m.close(M, function(A) {
                O && O(C || A);
              });
            });
          }
        );
      }, m.lchmodSync = function(w, R) {
        var O = m.openSync(w, n.O_WRONLY | n.O_SYMLINK, R), I = !0, M;
        try {
          M = m.fchmodSync(O, R), I = !1;
        } finally {
          if (I)
            try {
              m.closeSync(O);
            } catch {
            }
          else
            m.closeSync(O);
        }
        return M;
      };
    }
    function i(m) {
      n.hasOwnProperty("O_SYMLINK") && m.futimes ? (m.lutimes = function(w, R, O, I) {
        m.open(w, n.O_SYMLINK, function(M, C) {
          if (M) {
            I && I(M);
            return;
          }
          m.futimes(C, R, O, function(A) {
            m.close(C, function(T) {
              I && I(A || T);
            });
          });
        });
      }, m.lutimesSync = function(w, R, O) {
        var I = m.openSync(w, n.O_SYMLINK), M, C = !0;
        try {
          M = m.futimesSync(I, R, O), C = !1;
        } finally {
          if (C)
            try {
              m.closeSync(I);
            } catch {
            }
          else
            m.closeSync(I);
        }
        return M;
      }) : m.futimes && (m.lutimes = function(w, R, O, I) {
        I && process.nextTick(I);
      }, m.lutimesSync = function() {
      });
    }
    function t(m) {
      return m && function(w, R, O) {
        return m.call(a, w, R, function(I) {
          _(I) && (I = null), O && O.apply(this, arguments);
        });
      };
    }
    function l(m) {
      return m && function(w, R) {
        try {
          return m.call(a, w, R);
        } catch (O) {
          if (!_(O)) throw O;
        }
      };
    }
    function o(m) {
      return m && function(w, R, O, I) {
        return m.call(a, w, R, O, function(M) {
          _(M) && (M = null), I && I.apply(this, arguments);
        });
      };
    }
    function r(m) {
      return m && function(w, R, O) {
        try {
          return m.call(a, w, R, O);
        } catch (I) {
          if (!_(I)) throw I;
        }
      };
    }
    function p(m) {
      return m && function(w, R, O) {
        typeof R == "function" && (O = R, R = null);
        function I(M, C) {
          C && (C.uid < 0 && (C.uid += 4294967296), C.gid < 0 && (C.gid += 4294967296)), O && O.apply(this, arguments);
        }
        return R ? m.call(a, w, R, I) : m.call(a, w, I);
      };
    }
    function g(m) {
      return m && function(w, R) {
        var O = R ? m.call(a, w, R) : m.call(a, w);
        return O && (O.uid < 0 && (O.uid += 4294967296), O.gid < 0 && (O.gid += 4294967296)), O;
      };
    }
    function _(m) {
      if (!m || m.code === "ENOSYS")
        return !0;
      var w = !process.getuid || process.getuid() !== 0;
      return !!(w && (m.code === "EINVAL" || m.code === "EPERM"));
    }
  }
  return en;
}
var tn, Ba;
function pc() {
  if (Ba) return tn;
  Ba = 1;
  var n = cr.Stream;
  tn = f;
  function f(h) {
    return {
      ReadStream: d,
      WriteStream: u
    };
    function d(s, a) {
      if (!(this instanceof d)) return new d(s, a);
      n.call(this);
      var c = this;
      this.path = s, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, a = a || {};
      for (var i = Object.keys(a), t = 0, l = i.length; t < l; t++) {
        var o = i[t];
        this[o] = a[o];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          c._read();
        });
        return;
      }
      h.open(this.path, this.flags, this.mode, function(r, p) {
        if (r) {
          c.emit("error", r), c.readable = !1;
          return;
        }
        c.fd = p, c.emit("open", p), c._read();
      });
    }
    function u(s, a) {
      if (!(this instanceof u)) return new u(s, a);
      n.call(this), this.path = s, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, a = a || {};
      for (var c = Object.keys(a), i = 0, t = c.length; i < t; i++) {
        var l = c[i];
        this[l] = a[l];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = h.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return tn;
}
var rn, Ha;
function mc() {
  if (Ha) return rn;
  Ha = 1, rn = f;
  var n = Object.getPrototypeOf || function(h) {
    return h.__proto__;
  };
  function f(h) {
    if (h === null || typeof h != "object")
      return h;
    if (h instanceof Object)
      var d = { __proto__: n(h) };
    else
      var d = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(h).forEach(function(u) {
      Object.defineProperty(d, u, Object.getOwnPropertyDescriptor(h, u));
    }), d;
  }
  return rn;
}
var Or, ja;
function Ge() {
  if (ja) return Or;
  ja = 1;
  var n = dt, f = hc(), h = pc(), d = mc(), u = Yi, s, a;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (s = Symbol.for("graceful-fs.queue"), a = Symbol.for("graceful-fs.previous")) : (s = "___graceful-fs.queue", a = "___graceful-fs.previous");
  function c() {
  }
  function i(m, w) {
    Object.defineProperty(m, s, {
      get: function() {
        return w;
      }
    });
  }
  var t = c;
  if (u.debuglog ? t = u.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (t = function() {
    var m = u.format.apply(u, arguments);
    m = "GFS4: " + m.split(/\n/).join(`
GFS4: `), console.error(m);
  }), !n[s]) {
    var l = Qe[s] || [];
    i(n, l), n.close = function(m) {
      function w(R, O) {
        return m.call(n, R, function(I) {
          I || g(), typeof O == "function" && O.apply(this, arguments);
        });
      }
      return Object.defineProperty(w, a, {
        value: m
      }), w;
    }(n.close), n.closeSync = function(m) {
      function w(R) {
        m.apply(n, arguments), g();
      }
      return Object.defineProperty(w, a, {
        value: m
      }), w;
    }(n.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      t(n[s]), Al.equal(n[s].length, 0);
    });
  }
  Qe[s] || i(Qe, n[s]), Or = o(d(n)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !n.__patched && (Or = o(n), n.__patched = !0);
  function o(m) {
    f(m), m.gracefulify = o, m.createReadStream = ce, m.createWriteStream = ue;
    var w = m.readFile;
    m.readFile = R;
    function R(K, Ee, S) {
      return typeof Ee == "function" && (S = Ee, Ee = null), v(K, Ee, S);
      function v(H, N, le, me) {
        return w(H, N, function(pe) {
          pe && (pe.code === "EMFILE" || pe.code === "ENFILE") ? r([v, [H, N, le], pe, me || Date.now(), Date.now()]) : typeof le == "function" && le.apply(this, arguments);
        });
      }
    }
    var O = m.writeFile;
    m.writeFile = I;
    function I(K, Ee, S, v) {
      return typeof S == "function" && (v = S, S = null), H(K, Ee, S, v);
      function H(N, le, me, pe, _e) {
        return O(N, le, me, function(ye) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? r([H, [N, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var M = m.appendFile;
    M && (m.appendFile = C);
    function C(K, Ee, S, v) {
      return typeof S == "function" && (v = S, S = null), H(K, Ee, S, v);
      function H(N, le, me, pe, _e) {
        return M(N, le, me, function(ye) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? r([H, [N, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var A = m.copyFile;
    A && (m.copyFile = T);
    function T(K, Ee, S, v) {
      return typeof S == "function" && (v = S, S = 0), H(K, Ee, S, v);
      function H(N, le, me, pe, _e) {
        return A(N, le, me, function(ye) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? r([H, [N, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var E = m.readdir;
    m.readdir = U;
    var q = /^v[0-5]\./;
    function U(K, Ee, S) {
      typeof Ee == "function" && (S = Ee, Ee = null);
      var v = q.test(process.version) ? function(le, me, pe, _e) {
        return E(le, H(
          le,
          me,
          pe,
          _e
        ));
      } : function(le, me, pe, _e) {
        return E(le, me, H(
          le,
          me,
          pe,
          _e
        ));
      };
      return v(K, Ee, S);
      function H(N, le, me, pe) {
        return function(_e, ye) {
          _e && (_e.code === "EMFILE" || _e.code === "ENFILE") ? r([
            v,
            [N, le, me],
            _e,
            pe || Date.now(),
            Date.now()
          ]) : (ye && ye.sort && ye.sort(), typeof me == "function" && me.call(this, _e, ye));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var L = h(m);
      $ = L.ReadStream, W = L.WriteStream;
    }
    var k = m.ReadStream;
    k && ($.prototype = Object.create(k.prototype), $.prototype.open = J);
    var D = m.WriteStream;
    D && (W.prototype = Object.create(D.prototype), W.prototype.open = ne), Object.defineProperty(m, "ReadStream", {
      get: function() {
        return $;
      },
      set: function(K) {
        $ = K;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(m, "WriteStream", {
      get: function() {
        return W;
      },
      set: function(K) {
        W = K;
      },
      enumerable: !0,
      configurable: !0
    });
    var P = $;
    Object.defineProperty(m, "FileReadStream", {
      get: function() {
        return P;
      },
      set: function(K) {
        P = K;
      },
      enumerable: !0,
      configurable: !0
    });
    var F = W;
    Object.defineProperty(m, "FileWriteStream", {
      get: function() {
        return F;
      },
      set: function(K) {
        F = K;
      },
      enumerable: !0,
      configurable: !0
    });
    function $(K, Ee) {
      return this instanceof $ ? (k.apply(this, arguments), this) : $.apply(Object.create($.prototype), arguments);
    }
    function J() {
      var K = this;
      Ae(K.path, K.flags, K.mode, function(Ee, S) {
        Ee ? (K.autoClose && K.destroy(), K.emit("error", Ee)) : (K.fd = S, K.emit("open", S), K.read());
      });
    }
    function W(K, Ee) {
      return this instanceof W ? (D.apply(this, arguments), this) : W.apply(Object.create(W.prototype), arguments);
    }
    function ne() {
      var K = this;
      Ae(K.path, K.flags, K.mode, function(Ee, S) {
        Ee ? (K.destroy(), K.emit("error", Ee)) : (K.fd = S, K.emit("open", S));
      });
    }
    function ce(K, Ee) {
      return new m.ReadStream(K, Ee);
    }
    function ue(K, Ee) {
      return new m.WriteStream(K, Ee);
    }
    var ie = m.open;
    m.open = Ae;
    function Ae(K, Ee, S, v) {
      return typeof S == "function" && (v = S, S = null), H(K, Ee, S, v);
      function H(N, le, me, pe, _e) {
        return ie(N, le, me, function(ye, Fe) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? r([H, [N, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    return m;
  }
  function r(m) {
    t("ENQUEUE", m[0].name, m[1]), n[s].push(m), _();
  }
  var p;
  function g() {
    for (var m = Date.now(), w = 0; w < n[s].length; ++w)
      n[s][w].length > 2 && (n[s][w][3] = m, n[s][w][4] = m);
    _();
  }
  function _() {
    if (clearTimeout(p), p = void 0, n[s].length !== 0) {
      var m = n[s].shift(), w = m[0], R = m[1], O = m[2], I = m[3], M = m[4];
      if (I === void 0)
        t("RETRY", w.name, R), w.apply(null, R);
      else if (Date.now() - I >= 6e4) {
        t("TIMEOUT", w.name, R);
        var C = R.pop();
        typeof C == "function" && C.call(null, O);
      } else {
        var A = Date.now() - M, T = Math.max(M - I, 1), E = Math.min(T * 1.2, 100);
        A >= E ? (t("RETRY", w.name, R), w.apply(null, R.concat([I]))) : n[s].push(m);
      }
      p === void 0 && (p = setTimeout(_, 0));
    }
  }
  return Or;
}
var Ga;
function xt() {
  return Ga || (Ga = 1, function(n) {
    const f = Ve().fromCallback, h = Ge(), d = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((u) => typeof h[u] == "function");
    Object.assign(n, h), d.forEach((u) => {
      n[u] = f(h[u]);
    }), n.exists = function(u, s) {
      return typeof s == "function" ? h.exists(u, s) : new Promise((a) => h.exists(u, a));
    }, n.read = function(u, s, a, c, i, t) {
      return typeof t == "function" ? h.read(u, s, a, c, i, t) : new Promise((l, o) => {
        h.read(u, s, a, c, i, (r, p, g) => {
          if (r) return o(r);
          l({ bytesRead: p, buffer: g });
        });
      });
    }, n.write = function(u, s, ...a) {
      return typeof a[a.length - 1] == "function" ? h.write(u, s, ...a) : new Promise((c, i) => {
        h.write(u, s, ...a, (t, l, o) => {
          if (t) return i(t);
          c({ bytesWritten: l, buffer: o });
        });
      });
    }, typeof h.writev == "function" && (n.writev = function(u, s, ...a) {
      return typeof a[a.length - 1] == "function" ? h.writev(u, s, ...a) : new Promise((c, i) => {
        h.writev(u, s, ...a, (t, l, o) => {
          if (t) return i(t);
          c({ bytesWritten: l, buffers: o });
        });
      });
    }), typeof h.realpath.native == "function" ? n.realpath.native = f(h.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(Zr)), Zr;
}
var Ir = {}, nn = {}, Wa;
function gc() {
  if (Wa) return nn;
  Wa = 1;
  const n = be;
  return nn.checkPath = function(h) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(h.replace(n.parse(h).root, ""))) {
      const u = new Error(`Path contains invalid characters: ${h}`);
      throw u.code = "EINVAL", u;
    }
  }, nn;
}
var Va;
function vc() {
  if (Va) return Ir;
  Va = 1;
  const n = /* @__PURE__ */ xt(), { checkPath: f } = /* @__PURE__ */ gc(), h = (d) => {
    const u = { mode: 511 };
    return typeof d == "number" ? d : { ...u, ...d }.mode;
  };
  return Ir.makeDir = async (d, u) => (f(d), n.mkdir(d, {
    mode: h(u),
    recursive: !0
  })), Ir.makeDirSync = (d, u) => (f(d), n.mkdirSync(d, {
    mode: h(u),
    recursive: !0
  })), Ir;
}
var an, Ya;
function rt() {
  if (Ya) return an;
  Ya = 1;
  const n = Ve().fromPromise, { makeDir: f, makeDirSync: h } = /* @__PURE__ */ vc(), d = n(f);
  return an = {
    mkdirs: d,
    mkdirsSync: h,
    // alias
    mkdirp: d,
    mkdirpSync: h,
    ensureDir: d,
    ensureDirSync: h
  }, an;
}
var on, za;
function Rt() {
  if (za) return on;
  za = 1;
  const n = Ve().fromPromise, f = /* @__PURE__ */ xt();
  function h(d) {
    return f.access(d).then(() => !0).catch(() => !1);
  }
  return on = {
    pathExists: n(h),
    pathExistsSync: f.existsSync
  }, on;
}
var sn, Xa;
function bl() {
  if (Xa) return sn;
  Xa = 1;
  const n = Ge();
  function f(d, u, s, a) {
    n.open(d, "r+", (c, i) => {
      if (c) return a(c);
      n.futimes(i, u, s, (t) => {
        n.close(i, (l) => {
          a && a(t || l);
        });
      });
    });
  }
  function h(d, u, s) {
    const a = n.openSync(d, "r+");
    return n.futimesSync(a, u, s), n.closeSync(a);
  }
  return sn = {
    utimesMillis: f,
    utimesMillisSync: h
  }, sn;
}
var ln, Ka;
function Lt() {
  if (Ka) return ln;
  Ka = 1;
  const n = /* @__PURE__ */ xt(), f = be, h = Yi;
  function d(r, p, g) {
    const _ = g.dereference ? (m) => n.stat(m, { bigint: !0 }) : (m) => n.lstat(m, { bigint: !0 });
    return Promise.all([
      _(r),
      _(p).catch((m) => {
        if (m.code === "ENOENT") return null;
        throw m;
      })
    ]).then(([m, w]) => ({ srcStat: m, destStat: w }));
  }
  function u(r, p, g) {
    let _;
    const m = g.dereference ? (R) => n.statSync(R, { bigint: !0 }) : (R) => n.lstatSync(R, { bigint: !0 }), w = m(r);
    try {
      _ = m(p);
    } catch (R) {
      if (R.code === "ENOENT") return { srcStat: w, destStat: null };
      throw R;
    }
    return { srcStat: w, destStat: _ };
  }
  function s(r, p, g, _, m) {
    h.callbackify(d)(r, p, _, (w, R) => {
      if (w) return m(w);
      const { srcStat: O, destStat: I } = R;
      if (I) {
        if (t(O, I)) {
          const M = f.basename(r), C = f.basename(p);
          return g === "move" && M !== C && M.toLowerCase() === C.toLowerCase() ? m(null, { srcStat: O, destStat: I, isChangingCase: !0 }) : m(new Error("Source and destination must not be the same."));
        }
        if (O.isDirectory() && !I.isDirectory())
          return m(new Error(`Cannot overwrite non-directory '${p}' with directory '${r}'.`));
        if (!O.isDirectory() && I.isDirectory())
          return m(new Error(`Cannot overwrite directory '${p}' with non-directory '${r}'.`));
      }
      return O.isDirectory() && l(r, p) ? m(new Error(o(r, p, g))) : m(null, { srcStat: O, destStat: I });
    });
  }
  function a(r, p, g, _) {
    const { srcStat: m, destStat: w } = u(r, p, _);
    if (w) {
      if (t(m, w)) {
        const R = f.basename(r), O = f.basename(p);
        if (g === "move" && R !== O && R.toLowerCase() === O.toLowerCase())
          return { srcStat: m, destStat: w, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (m.isDirectory() && !w.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${r}'.`);
      if (!m.isDirectory() && w.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${r}'.`);
    }
    if (m.isDirectory() && l(r, p))
      throw new Error(o(r, p, g));
    return { srcStat: m, destStat: w };
  }
  function c(r, p, g, _, m) {
    const w = f.resolve(f.dirname(r)), R = f.resolve(f.dirname(g));
    if (R === w || R === f.parse(R).root) return m();
    n.stat(R, { bigint: !0 }, (O, I) => O ? O.code === "ENOENT" ? m() : m(O) : t(p, I) ? m(new Error(o(r, g, _))) : c(r, p, R, _, m));
  }
  function i(r, p, g, _) {
    const m = f.resolve(f.dirname(r)), w = f.resolve(f.dirname(g));
    if (w === m || w === f.parse(w).root) return;
    let R;
    try {
      R = n.statSync(w, { bigint: !0 });
    } catch (O) {
      if (O.code === "ENOENT") return;
      throw O;
    }
    if (t(p, R))
      throw new Error(o(r, g, _));
    return i(r, p, w, _);
  }
  function t(r, p) {
    return p.ino && p.dev && p.ino === r.ino && p.dev === r.dev;
  }
  function l(r, p) {
    const g = f.resolve(r).split(f.sep).filter((m) => m), _ = f.resolve(p).split(f.sep).filter((m) => m);
    return g.reduce((m, w, R) => m && _[R] === w, !0);
  }
  function o(r, p, g) {
    return `Cannot ${g} '${r}' to a subdirectory of itself, '${p}'.`;
  }
  return ln = {
    checkPaths: s,
    checkPathsSync: a,
    checkParentPaths: c,
    checkParentPathsSync: i,
    isSrcSubdir: l,
    areIdentical: t
  }, ln;
}
var un, Ja;
function Ec() {
  if (Ja) return un;
  Ja = 1;
  const n = Ge(), f = be, h = rt().mkdirs, d = Rt().pathExists, u = bl().utimesMillis, s = /* @__PURE__ */ Lt();
  function a(U, L, k, D) {
    typeof k == "function" && !D ? (D = k, k = {}) : typeof k == "function" && (k = { filter: k }), D = D || function() {
    }, k = k || {}, k.clobber = "clobber" in k ? !!k.clobber : !0, k.overwrite = "overwrite" in k ? !!k.overwrite : k.clobber, k.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), s.checkPaths(U, L, "copy", k, (P, F) => {
      if (P) return D(P);
      const { srcStat: $, destStat: J } = F;
      s.checkParentPaths(U, $, L, "copy", (W) => W ? D(W) : k.filter ? i(c, J, U, L, k, D) : c(J, U, L, k, D));
    });
  }
  function c(U, L, k, D, P) {
    const F = f.dirname(k);
    d(F, ($, J) => {
      if ($) return P($);
      if (J) return l(U, L, k, D, P);
      h(F, (W) => W ? P(W) : l(U, L, k, D, P));
    });
  }
  function i(U, L, k, D, P, F) {
    Promise.resolve(P.filter(k, D)).then(($) => $ ? U(L, k, D, P, F) : F(), ($) => F($));
  }
  function t(U, L, k, D, P) {
    return D.filter ? i(l, U, L, k, D, P) : l(U, L, k, D, P);
  }
  function l(U, L, k, D, P) {
    (D.dereference ? n.stat : n.lstat)(L, ($, J) => $ ? P($) : J.isDirectory() ? I(J, U, L, k, D, P) : J.isFile() || J.isCharacterDevice() || J.isBlockDevice() ? o(J, U, L, k, D, P) : J.isSymbolicLink() ? E(U, L, k, D, P) : J.isSocket() ? P(new Error(`Cannot copy a socket file: ${L}`)) : J.isFIFO() ? P(new Error(`Cannot copy a FIFO pipe: ${L}`)) : P(new Error(`Unknown file: ${L}`)));
  }
  function o(U, L, k, D, P, F) {
    return L ? r(U, k, D, P, F) : p(U, k, D, P, F);
  }
  function r(U, L, k, D, P) {
    if (D.overwrite)
      n.unlink(k, (F) => F ? P(F) : p(U, L, k, D, P));
    else return D.errorOnExist ? P(new Error(`'${k}' already exists`)) : P();
  }
  function p(U, L, k, D, P) {
    n.copyFile(L, k, (F) => F ? P(F) : D.preserveTimestamps ? g(U.mode, L, k, P) : R(k, U.mode, P));
  }
  function g(U, L, k, D) {
    return _(U) ? m(k, U, (P) => P ? D(P) : w(U, L, k, D)) : w(U, L, k, D);
  }
  function _(U) {
    return (U & 128) === 0;
  }
  function m(U, L, k) {
    return R(U, L | 128, k);
  }
  function w(U, L, k, D) {
    O(L, k, (P) => P ? D(P) : R(k, U, D));
  }
  function R(U, L, k) {
    return n.chmod(U, L, k);
  }
  function O(U, L, k) {
    n.stat(U, (D, P) => D ? k(D) : u(L, P.atime, P.mtime, k));
  }
  function I(U, L, k, D, P, F) {
    return L ? C(k, D, P, F) : M(U.mode, k, D, P, F);
  }
  function M(U, L, k, D, P) {
    n.mkdir(k, (F) => {
      if (F) return P(F);
      C(L, k, D, ($) => $ ? P($) : R(k, U, P));
    });
  }
  function C(U, L, k, D) {
    n.readdir(U, (P, F) => P ? D(P) : A(F, U, L, k, D));
  }
  function A(U, L, k, D, P) {
    const F = U.pop();
    return F ? T(U, F, L, k, D, P) : P();
  }
  function T(U, L, k, D, P, F) {
    const $ = f.join(k, L), J = f.join(D, L);
    s.checkPaths($, J, "copy", P, (W, ne) => {
      if (W) return F(W);
      const { destStat: ce } = ne;
      t(ce, $, J, P, (ue) => ue ? F(ue) : A(U, k, D, P, F));
    });
  }
  function E(U, L, k, D, P) {
    n.readlink(L, (F, $) => {
      if (F) return P(F);
      if (D.dereference && ($ = f.resolve(process.cwd(), $)), U)
        n.readlink(k, (J, W) => J ? J.code === "EINVAL" || J.code === "UNKNOWN" ? n.symlink($, k, P) : P(J) : (D.dereference && (W = f.resolve(process.cwd(), W)), s.isSrcSubdir($, W) ? P(new Error(`Cannot copy '${$}' to a subdirectory of itself, '${W}'.`)) : U.isDirectory() && s.isSrcSubdir(W, $) ? P(new Error(`Cannot overwrite '${W}' with '${$}'.`)) : q($, k, P)));
      else
        return n.symlink($, k, P);
    });
  }
  function q(U, L, k) {
    n.unlink(L, (D) => D ? k(D) : n.symlink(U, L, k));
  }
  return un = a, un;
}
var cn, Qa;
function yc() {
  if (Qa) return cn;
  Qa = 1;
  const n = Ge(), f = be, h = rt().mkdirsSync, d = bl().utimesMillisSync, u = /* @__PURE__ */ Lt();
  function s(A, T, E) {
    typeof E == "function" && (E = { filter: E }), E = E || {}, E.clobber = "clobber" in E ? !!E.clobber : !0, E.overwrite = "overwrite" in E ? !!E.overwrite : E.clobber, E.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: q, destStat: U } = u.checkPathsSync(A, T, "copy", E);
    return u.checkParentPathsSync(A, q, T, "copy"), a(U, A, T, E);
  }
  function a(A, T, E, q) {
    if (q.filter && !q.filter(T, E)) return;
    const U = f.dirname(E);
    return n.existsSync(U) || h(U), i(A, T, E, q);
  }
  function c(A, T, E, q) {
    if (!(q.filter && !q.filter(T, E)))
      return i(A, T, E, q);
  }
  function i(A, T, E, q) {
    const L = (q.dereference ? n.statSync : n.lstatSync)(T);
    if (L.isDirectory()) return w(L, A, T, E, q);
    if (L.isFile() || L.isCharacterDevice() || L.isBlockDevice()) return t(L, A, T, E, q);
    if (L.isSymbolicLink()) return M(A, T, E, q);
    throw L.isSocket() ? new Error(`Cannot copy a socket file: ${T}`) : L.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${T}`) : new Error(`Unknown file: ${T}`);
  }
  function t(A, T, E, q, U) {
    return T ? l(A, E, q, U) : o(A, E, q, U);
  }
  function l(A, T, E, q) {
    if (q.overwrite)
      return n.unlinkSync(E), o(A, T, E, q);
    if (q.errorOnExist)
      throw new Error(`'${E}' already exists`);
  }
  function o(A, T, E, q) {
    return n.copyFileSync(T, E), q.preserveTimestamps && r(A.mode, T, E), _(E, A.mode);
  }
  function r(A, T, E) {
    return p(A) && g(E, A), m(T, E);
  }
  function p(A) {
    return (A & 128) === 0;
  }
  function g(A, T) {
    return _(A, T | 128);
  }
  function _(A, T) {
    return n.chmodSync(A, T);
  }
  function m(A, T) {
    const E = n.statSync(A);
    return d(T, E.atime, E.mtime);
  }
  function w(A, T, E, q, U) {
    return T ? O(E, q, U) : R(A.mode, E, q, U);
  }
  function R(A, T, E, q) {
    return n.mkdirSync(E), O(T, E, q), _(E, A);
  }
  function O(A, T, E) {
    n.readdirSync(A).forEach((q) => I(q, A, T, E));
  }
  function I(A, T, E, q) {
    const U = f.join(T, A), L = f.join(E, A), { destStat: k } = u.checkPathsSync(U, L, "copy", q);
    return c(k, U, L, q);
  }
  function M(A, T, E, q) {
    let U = n.readlinkSync(T);
    if (q.dereference && (U = f.resolve(process.cwd(), U)), A) {
      let L;
      try {
        L = n.readlinkSync(E);
      } catch (k) {
        if (k.code === "EINVAL" || k.code === "UNKNOWN") return n.symlinkSync(U, E);
        throw k;
      }
      if (q.dereference && (L = f.resolve(process.cwd(), L)), u.isSrcSubdir(U, L))
        throw new Error(`Cannot copy '${U}' to a subdirectory of itself, '${L}'.`);
      if (n.statSync(E).isDirectory() && u.isSrcSubdir(L, U))
        throw new Error(`Cannot overwrite '${L}' with '${U}'.`);
      return C(U, E);
    } else
      return n.symlinkSync(U, E);
  }
  function C(A, T) {
    return n.unlinkSync(T), n.symlinkSync(A, T);
  }
  return cn = s, cn;
}
var fn, Za;
function Xi() {
  if (Za) return fn;
  Za = 1;
  const n = Ve().fromCallback;
  return fn = {
    copy: n(/* @__PURE__ */ Ec()),
    copySync: /* @__PURE__ */ yc()
  }, fn;
}
var dn, eo;
function wc() {
  if (eo) return dn;
  eo = 1;
  const n = Ge(), f = be, h = Al, d = process.platform === "win32";
  function u(g) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((m) => {
      g[m] = g[m] || n[m], m = m + "Sync", g[m] = g[m] || n[m];
    }), g.maxBusyTries = g.maxBusyTries || 3;
  }
  function s(g, _, m) {
    let w = 0;
    typeof _ == "function" && (m = _, _ = {}), h(g, "rimraf: missing path"), h.strictEqual(typeof g, "string", "rimraf: path should be a string"), h.strictEqual(typeof m, "function", "rimraf: callback function required"), h(_, "rimraf: invalid options argument provided"), h.strictEqual(typeof _, "object", "rimraf: options should be object"), u(_), a(g, _, function R(O) {
      if (O) {
        if ((O.code === "EBUSY" || O.code === "ENOTEMPTY" || O.code === "EPERM") && w < _.maxBusyTries) {
          w++;
          const I = w * 100;
          return setTimeout(() => a(g, _, R), I);
        }
        O.code === "ENOENT" && (O = null);
      }
      m(O);
    });
  }
  function a(g, _, m) {
    h(g), h(_), h(typeof m == "function"), _.lstat(g, (w, R) => {
      if (w && w.code === "ENOENT")
        return m(null);
      if (w && w.code === "EPERM" && d)
        return c(g, _, w, m);
      if (R && R.isDirectory())
        return t(g, _, w, m);
      _.unlink(g, (O) => {
        if (O) {
          if (O.code === "ENOENT")
            return m(null);
          if (O.code === "EPERM")
            return d ? c(g, _, O, m) : t(g, _, O, m);
          if (O.code === "EISDIR")
            return t(g, _, O, m);
        }
        return m(O);
      });
    });
  }
  function c(g, _, m, w) {
    h(g), h(_), h(typeof w == "function"), _.chmod(g, 438, (R) => {
      R ? w(R.code === "ENOENT" ? null : m) : _.stat(g, (O, I) => {
        O ? w(O.code === "ENOENT" ? null : m) : I.isDirectory() ? t(g, _, m, w) : _.unlink(g, w);
      });
    });
  }
  function i(g, _, m) {
    let w;
    h(g), h(_);
    try {
      _.chmodSync(g, 438);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw m;
    }
    try {
      w = _.statSync(g);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw m;
    }
    w.isDirectory() ? r(g, _, m) : _.unlinkSync(g);
  }
  function t(g, _, m, w) {
    h(g), h(_), h(typeof w == "function"), _.rmdir(g, (R) => {
      R && (R.code === "ENOTEMPTY" || R.code === "EEXIST" || R.code === "EPERM") ? l(g, _, w) : R && R.code === "ENOTDIR" ? w(m) : w(R);
    });
  }
  function l(g, _, m) {
    h(g), h(_), h(typeof m == "function"), _.readdir(g, (w, R) => {
      if (w) return m(w);
      let O = R.length, I;
      if (O === 0) return _.rmdir(g, m);
      R.forEach((M) => {
        s(f.join(g, M), _, (C) => {
          if (!I) {
            if (C) return m(I = C);
            --O === 0 && _.rmdir(g, m);
          }
        });
      });
    });
  }
  function o(g, _) {
    let m;
    _ = _ || {}, u(_), h(g, "rimraf: missing path"), h.strictEqual(typeof g, "string", "rimraf: path should be a string"), h(_, "rimraf: missing options"), h.strictEqual(typeof _, "object", "rimraf: options should be object");
    try {
      m = _.lstatSync(g);
    } catch (w) {
      if (w.code === "ENOENT")
        return;
      w.code === "EPERM" && d && i(g, _, w);
    }
    try {
      m && m.isDirectory() ? r(g, _, null) : _.unlinkSync(g);
    } catch (w) {
      if (w.code === "ENOENT")
        return;
      if (w.code === "EPERM")
        return d ? i(g, _, w) : r(g, _, w);
      if (w.code !== "EISDIR")
        throw w;
      r(g, _, w);
    }
  }
  function r(g, _, m) {
    h(g), h(_);
    try {
      _.rmdirSync(g);
    } catch (w) {
      if (w.code === "ENOTDIR")
        throw m;
      if (w.code === "ENOTEMPTY" || w.code === "EEXIST" || w.code === "EPERM")
        p(g, _);
      else if (w.code !== "ENOENT")
        throw w;
    }
  }
  function p(g, _) {
    if (h(g), h(_), _.readdirSync(g).forEach((m) => o(f.join(g, m), _)), d) {
      const m = Date.now();
      do
        try {
          return _.rmdirSync(g, _);
        } catch {
        }
      while (Date.now() - m < 500);
    } else
      return _.rmdirSync(g, _);
  }
  return dn = s, s.sync = o, dn;
}
var hn, to;
function kr() {
  if (to) return hn;
  to = 1;
  const n = Ge(), f = Ve().fromCallback, h = /* @__PURE__ */ wc();
  function d(s, a) {
    if (n.rm) return n.rm(s, { recursive: !0, force: !0 }, a);
    h(s, a);
  }
  function u(s) {
    if (n.rmSync) return n.rmSync(s, { recursive: !0, force: !0 });
    h.sync(s);
  }
  return hn = {
    remove: f(d),
    removeSync: u
  }, hn;
}
var pn, ro;
function _c() {
  if (ro) return pn;
  ro = 1;
  const n = Ve().fromPromise, f = /* @__PURE__ */ xt(), h = be, d = /* @__PURE__ */ rt(), u = /* @__PURE__ */ kr(), s = n(async function(i) {
    let t;
    try {
      t = await f.readdir(i);
    } catch {
      return d.mkdirs(i);
    }
    return Promise.all(t.map((l) => u.remove(h.join(i, l))));
  });
  function a(c) {
    let i;
    try {
      i = f.readdirSync(c);
    } catch {
      return d.mkdirsSync(c);
    }
    i.forEach((t) => {
      t = h.join(c, t), u.removeSync(t);
    });
  }
  return pn = {
    emptyDirSync: a,
    emptydirSync: a,
    emptyDir: s,
    emptydir: s
  }, pn;
}
var mn, no;
function Sc() {
  if (no) return mn;
  no = 1;
  const n = Ve().fromCallback, f = be, h = Ge(), d = /* @__PURE__ */ rt();
  function u(a, c) {
    function i() {
      h.writeFile(a, "", (t) => {
        if (t) return c(t);
        c();
      });
    }
    h.stat(a, (t, l) => {
      if (!t && l.isFile()) return c();
      const o = f.dirname(a);
      h.stat(o, (r, p) => {
        if (r)
          return r.code === "ENOENT" ? d.mkdirs(o, (g) => {
            if (g) return c(g);
            i();
          }) : c(r);
        p.isDirectory() ? i() : h.readdir(o, (g) => {
          if (g) return c(g);
        });
      });
    });
  }
  function s(a) {
    let c;
    try {
      c = h.statSync(a);
    } catch {
    }
    if (c && c.isFile()) return;
    const i = f.dirname(a);
    try {
      h.statSync(i).isDirectory() || h.readdirSync(i);
    } catch (t) {
      if (t && t.code === "ENOENT") d.mkdirsSync(i);
      else throw t;
    }
    h.writeFileSync(a, "");
  }
  return mn = {
    createFile: n(u),
    createFileSync: s
  }, mn;
}
var gn, io;
function Ac() {
  if (io) return gn;
  io = 1;
  const n = Ve().fromCallback, f = be, h = Ge(), d = /* @__PURE__ */ rt(), u = Rt().pathExists, { areIdentical: s } = /* @__PURE__ */ Lt();
  function a(i, t, l) {
    function o(r, p) {
      h.link(r, p, (g) => {
        if (g) return l(g);
        l(null);
      });
    }
    h.lstat(t, (r, p) => {
      h.lstat(i, (g, _) => {
        if (g)
          return g.message = g.message.replace("lstat", "ensureLink"), l(g);
        if (p && s(_, p)) return l(null);
        const m = f.dirname(t);
        u(m, (w, R) => {
          if (w) return l(w);
          if (R) return o(i, t);
          d.mkdirs(m, (O) => {
            if (O) return l(O);
            o(i, t);
          });
        });
      });
    });
  }
  function c(i, t) {
    let l;
    try {
      l = h.lstatSync(t);
    } catch {
    }
    try {
      const p = h.lstatSync(i);
      if (l && s(p, l)) return;
    } catch (p) {
      throw p.message = p.message.replace("lstat", "ensureLink"), p;
    }
    const o = f.dirname(t);
    return h.existsSync(o) || d.mkdirsSync(o), h.linkSync(i, t);
  }
  return gn = {
    createLink: n(a),
    createLinkSync: c
  }, gn;
}
var vn, ao;
function Tc() {
  if (ao) return vn;
  ao = 1;
  const n = be, f = Ge(), h = Rt().pathExists;
  function d(s, a, c) {
    if (n.isAbsolute(s))
      return f.lstat(s, (i) => i ? (i.message = i.message.replace("lstat", "ensureSymlink"), c(i)) : c(null, {
        toCwd: s,
        toDst: s
      }));
    {
      const i = n.dirname(a), t = n.join(i, s);
      return h(t, (l, o) => l ? c(l) : o ? c(null, {
        toCwd: t,
        toDst: s
      }) : f.lstat(s, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), c(r)) : c(null, {
        toCwd: s,
        toDst: n.relative(i, s)
      })));
    }
  }
  function u(s, a) {
    let c;
    if (n.isAbsolute(s)) {
      if (c = f.existsSync(s), !c) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: s,
        toDst: s
      };
    } else {
      const i = n.dirname(a), t = n.join(i, s);
      if (c = f.existsSync(t), c)
        return {
          toCwd: t,
          toDst: s
        };
      if (c = f.existsSync(s), !c) throw new Error("relative srcpath does not exist");
      return {
        toCwd: s,
        toDst: n.relative(i, s)
      };
    }
  }
  return vn = {
    symlinkPaths: d,
    symlinkPathsSync: u
  }, vn;
}
var En, oo;
function Rc() {
  if (oo) return En;
  oo = 1;
  const n = Ge();
  function f(d, u, s) {
    if (s = typeof u == "function" ? u : s, u = typeof u == "function" ? !1 : u, u) return s(null, u);
    n.lstat(d, (a, c) => {
      if (a) return s(null, "file");
      u = c && c.isDirectory() ? "dir" : "file", s(null, u);
    });
  }
  function h(d, u) {
    let s;
    if (u) return u;
    try {
      s = n.lstatSync(d);
    } catch {
      return "file";
    }
    return s && s.isDirectory() ? "dir" : "file";
  }
  return En = {
    symlinkType: f,
    symlinkTypeSync: h
  }, En;
}
var yn, so;
function Cc() {
  if (so) return yn;
  so = 1;
  const n = Ve().fromCallback, f = be, h = /* @__PURE__ */ xt(), d = /* @__PURE__ */ rt(), u = d.mkdirs, s = d.mkdirsSync, a = /* @__PURE__ */ Tc(), c = a.symlinkPaths, i = a.symlinkPathsSync, t = /* @__PURE__ */ Rc(), l = t.symlinkType, o = t.symlinkTypeSync, r = Rt().pathExists, { areIdentical: p } = /* @__PURE__ */ Lt();
  function g(w, R, O, I) {
    I = typeof O == "function" ? O : I, O = typeof O == "function" ? !1 : O, h.lstat(R, (M, C) => {
      !M && C.isSymbolicLink() ? Promise.all([
        h.stat(w),
        h.stat(R)
      ]).then(([A, T]) => {
        if (p(A, T)) return I(null);
        _(w, R, O, I);
      }) : _(w, R, O, I);
    });
  }
  function _(w, R, O, I) {
    c(w, R, (M, C) => {
      if (M) return I(M);
      w = C.toDst, l(C.toCwd, O, (A, T) => {
        if (A) return I(A);
        const E = f.dirname(R);
        r(E, (q, U) => {
          if (q) return I(q);
          if (U) return h.symlink(w, R, T, I);
          u(E, (L) => {
            if (L) return I(L);
            h.symlink(w, R, T, I);
          });
        });
      });
    });
  }
  function m(w, R, O) {
    let I;
    try {
      I = h.lstatSync(R);
    } catch {
    }
    if (I && I.isSymbolicLink()) {
      const T = h.statSync(w), E = h.statSync(R);
      if (p(T, E)) return;
    }
    const M = i(w, R);
    w = M.toDst, O = o(M.toCwd, O);
    const C = f.dirname(R);
    return h.existsSync(C) || s(C), h.symlinkSync(w, R, O);
  }
  return yn = {
    createSymlink: n(g),
    createSymlinkSync: m
  }, yn;
}
var wn, lo;
function bc() {
  if (lo) return wn;
  lo = 1;
  const { createFile: n, createFileSync: f } = /* @__PURE__ */ Sc(), { createLink: h, createLinkSync: d } = /* @__PURE__ */ Ac(), { createSymlink: u, createSymlinkSync: s } = /* @__PURE__ */ Cc();
  return wn = {
    // file
    createFile: n,
    createFileSync: f,
    ensureFile: n,
    ensureFileSync: f,
    // link
    createLink: h,
    createLinkSync: d,
    ensureLink: h,
    ensureLinkSync: d,
    // symlink
    createSymlink: u,
    createSymlinkSync: s,
    ensureSymlink: u,
    ensureSymlinkSync: s
  }, wn;
}
var _n, uo;
function Ki() {
  if (uo) return _n;
  uo = 1;
  function n(h, { EOL: d = `
`, finalEOL: u = !0, replacer: s = null, spaces: a } = {}) {
    const c = u ? d : "";
    return JSON.stringify(h, s, a).replace(/\n/g, d) + c;
  }
  function f(h) {
    return Buffer.isBuffer(h) && (h = h.toString("utf8")), h.replace(/^\uFEFF/, "");
  }
  return _n = { stringify: n, stripBom: f }, _n;
}
var Sn, co;
function Oc() {
  if (co) return Sn;
  co = 1;
  let n;
  try {
    n = Ge();
  } catch {
    n = dt;
  }
  const f = Ve(), { stringify: h, stripBom: d } = Ki();
  async function u(o, r = {}) {
    typeof r == "string" && (r = { encoding: r });
    const p = r.fs || n, g = "throws" in r ? r.throws : !0;
    let _ = await f.fromCallback(p.readFile)(o, r);
    _ = d(_);
    let m;
    try {
      m = JSON.parse(_, r ? r.reviver : null);
    } catch (w) {
      if (g)
        throw w.message = `${o}: ${w.message}`, w;
      return null;
    }
    return m;
  }
  const s = f.fromPromise(u);
  function a(o, r = {}) {
    typeof r == "string" && (r = { encoding: r });
    const p = r.fs || n, g = "throws" in r ? r.throws : !0;
    try {
      let _ = p.readFileSync(o, r);
      return _ = d(_), JSON.parse(_, r.reviver);
    } catch (_) {
      if (g)
        throw _.message = `${o}: ${_.message}`, _;
      return null;
    }
  }
  async function c(o, r, p = {}) {
    const g = p.fs || n, _ = h(r, p);
    await f.fromCallback(g.writeFile)(o, _, p);
  }
  const i = f.fromPromise(c);
  function t(o, r, p = {}) {
    const g = p.fs || n, _ = h(r, p);
    return g.writeFileSync(o, _, p);
  }
  return Sn = {
    readFile: s,
    readFileSync: a,
    writeFile: i,
    writeFileSync: t
  }, Sn;
}
var An, fo;
function Ic() {
  if (fo) return An;
  fo = 1;
  const n = Oc();
  return An = {
    // jsonfile exports
    readJson: n.readFile,
    readJsonSync: n.readFileSync,
    writeJson: n.writeFile,
    writeJsonSync: n.writeFileSync
  }, An;
}
var Tn, ho;
function Ji() {
  if (ho) return Tn;
  ho = 1;
  const n = Ve().fromCallback, f = Ge(), h = be, d = /* @__PURE__ */ rt(), u = Rt().pathExists;
  function s(c, i, t, l) {
    typeof t == "function" && (l = t, t = "utf8");
    const o = h.dirname(c);
    u(o, (r, p) => {
      if (r) return l(r);
      if (p) return f.writeFile(c, i, t, l);
      d.mkdirs(o, (g) => {
        if (g) return l(g);
        f.writeFile(c, i, t, l);
      });
    });
  }
  function a(c, ...i) {
    const t = h.dirname(c);
    if (f.existsSync(t))
      return f.writeFileSync(c, ...i);
    d.mkdirsSync(t), f.writeFileSync(c, ...i);
  }
  return Tn = {
    outputFile: n(s),
    outputFileSync: a
  }, Tn;
}
var Rn, po;
function Pc() {
  if (po) return Rn;
  po = 1;
  const { stringify: n } = Ki(), { outputFile: f } = /* @__PURE__ */ Ji();
  async function h(d, u, s = {}) {
    const a = n(u, s);
    await f(d, a, s);
  }
  return Rn = h, Rn;
}
var Cn, mo;
function Dc() {
  if (mo) return Cn;
  mo = 1;
  const { stringify: n } = Ki(), { outputFileSync: f } = /* @__PURE__ */ Ji();
  function h(d, u, s) {
    const a = n(u, s);
    f(d, a, s);
  }
  return Cn = h, Cn;
}
var bn, go;
function Nc() {
  if (go) return bn;
  go = 1;
  const n = Ve().fromPromise, f = /* @__PURE__ */ Ic();
  return f.outputJson = n(/* @__PURE__ */ Pc()), f.outputJsonSync = /* @__PURE__ */ Dc(), f.outputJSON = f.outputJson, f.outputJSONSync = f.outputJsonSync, f.writeJSON = f.writeJson, f.writeJSONSync = f.writeJsonSync, f.readJSON = f.readJson, f.readJSONSync = f.readJsonSync, bn = f, bn;
}
var On, vo;
function Fc() {
  if (vo) return On;
  vo = 1;
  const n = Ge(), f = be, h = Xi().copy, d = kr().remove, u = rt().mkdirp, s = Rt().pathExists, a = /* @__PURE__ */ Lt();
  function c(r, p, g, _) {
    typeof g == "function" && (_ = g, g = {}), g = g || {};
    const m = g.overwrite || g.clobber || !1;
    a.checkPaths(r, p, "move", g, (w, R) => {
      if (w) return _(w);
      const { srcStat: O, isChangingCase: I = !1 } = R;
      a.checkParentPaths(r, O, p, "move", (M) => {
        if (M) return _(M);
        if (i(p)) return t(r, p, m, I, _);
        u(f.dirname(p), (C) => C ? _(C) : t(r, p, m, I, _));
      });
    });
  }
  function i(r) {
    const p = f.dirname(r);
    return f.parse(p).root === p;
  }
  function t(r, p, g, _, m) {
    if (_) return l(r, p, g, m);
    if (g)
      return d(p, (w) => w ? m(w) : l(r, p, g, m));
    s(p, (w, R) => w ? m(w) : R ? m(new Error("dest already exists.")) : l(r, p, g, m));
  }
  function l(r, p, g, _) {
    n.rename(r, p, (m) => m ? m.code !== "EXDEV" ? _(m) : o(r, p, g, _) : _());
  }
  function o(r, p, g, _) {
    h(r, p, {
      overwrite: g,
      errorOnExist: !0
    }, (w) => w ? _(w) : d(r, _));
  }
  return On = c, On;
}
var In, Eo;
function xc() {
  if (Eo) return In;
  Eo = 1;
  const n = Ge(), f = be, h = Xi().copySync, d = kr().removeSync, u = rt().mkdirpSync, s = /* @__PURE__ */ Lt();
  function a(o, r, p) {
    p = p || {};
    const g = p.overwrite || p.clobber || !1, { srcStat: _, isChangingCase: m = !1 } = s.checkPathsSync(o, r, "move", p);
    return s.checkParentPathsSync(o, _, r, "move"), c(r) || u(f.dirname(r)), i(o, r, g, m);
  }
  function c(o) {
    const r = f.dirname(o);
    return f.parse(r).root === r;
  }
  function i(o, r, p, g) {
    if (g) return t(o, r, p);
    if (p)
      return d(r), t(o, r, p);
    if (n.existsSync(r)) throw new Error("dest already exists.");
    return t(o, r, p);
  }
  function t(o, r, p) {
    try {
      n.renameSync(o, r);
    } catch (g) {
      if (g.code !== "EXDEV") throw g;
      return l(o, r, p);
    }
  }
  function l(o, r, p) {
    return h(o, r, {
      overwrite: p,
      errorOnExist: !0
    }), d(o);
  }
  return In = a, In;
}
var Pn, yo;
function Lc() {
  if (yo) return Pn;
  yo = 1;
  const n = Ve().fromCallback;
  return Pn = {
    move: n(/* @__PURE__ */ Fc()),
    moveSync: /* @__PURE__ */ xc()
  }, Pn;
}
var Dn, wo;
function ht() {
  return wo || (wo = 1, Dn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ xt(),
    // Export extra methods:
    .../* @__PURE__ */ Xi(),
    .../* @__PURE__ */ _c(),
    .../* @__PURE__ */ bc(),
    .../* @__PURE__ */ Nc(),
    .../* @__PURE__ */ rt(),
    .../* @__PURE__ */ Lc(),
    .../* @__PURE__ */ Ji(),
    .../* @__PURE__ */ Rt(),
    .../* @__PURE__ */ kr()
  }), Dn;
}
var jt = {}, St = {}, Be = {}, Pr = {}, ct = {}, _o;
function fr() {
  if (_o) return ct;
  _o = 1;
  function n(a) {
    return typeof a > "u" || a === null;
  }
  function f(a) {
    return typeof a == "object" && a !== null;
  }
  function h(a) {
    return Array.isArray(a) ? a : n(a) ? [] : [a];
  }
  function d(a, c) {
    var i, t, l, o;
    if (c)
      for (o = Object.keys(c), i = 0, t = o.length; i < t; i += 1)
        l = o[i], a[l] = c[l];
    return a;
  }
  function u(a, c) {
    var i = "", t;
    for (t = 0; t < c; t += 1)
      i += a;
    return i;
  }
  function s(a) {
    return a === 0 && Number.NEGATIVE_INFINITY === 1 / a;
  }
  return ct.isNothing = n, ct.isObject = f, ct.toArray = h, ct.repeat = u, ct.isNegativeZero = s, ct.extend = d, ct;
}
var Nn, So;
function dr() {
  if (So) return Nn;
  So = 1;
  function n(h, d) {
    var u = "", s = h.reason || "(unknown reason)";
    return h.mark ? (h.mark.name && (u += 'in "' + h.mark.name + '" '), u += "(" + (h.mark.line + 1) + ":" + (h.mark.column + 1) + ")", !d && h.mark.snippet && (u += `

` + h.mark.snippet), s + " " + u) : s;
  }
  function f(h, d) {
    Error.call(this), this.name = "YAMLException", this.reason = h, this.mark = d, this.message = n(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return f.prototype = Object.create(Error.prototype), f.prototype.constructor = f, f.prototype.toString = function(d) {
    return this.name + ": " + n(this, d);
  }, Nn = f, Nn;
}
var Fn, Ao;
function Uc() {
  if (Ao) return Fn;
  Ao = 1;
  var n = fr();
  function f(u, s, a, c, i) {
    var t = "", l = "", o = Math.floor(i / 2) - 1;
    return c - s > o && (t = " ... ", s = c - o + t.length), a - c > o && (l = " ...", a = c + o - l.length), {
      str: t + u.slice(s, a).replace(/\t/g, "→") + l,
      pos: c - s + t.length
      // relative position
    };
  }
  function h(u, s) {
    return n.repeat(" ", s - u.length) + u;
  }
  function d(u, s) {
    if (s = Object.create(s || null), !u.buffer) return null;
    s.maxLength || (s.maxLength = 79), typeof s.indent != "number" && (s.indent = 1), typeof s.linesBefore != "number" && (s.linesBefore = 3), typeof s.linesAfter != "number" && (s.linesAfter = 2);
    for (var a = /\r?\n|\r|\0/g, c = [0], i = [], t, l = -1; t = a.exec(u.buffer); )
      i.push(t.index), c.push(t.index + t[0].length), u.position <= t.index && l < 0 && (l = c.length - 2);
    l < 0 && (l = c.length - 1);
    var o = "", r, p, g = Math.min(u.line + s.linesAfter, i.length).toString().length, _ = s.maxLength - (s.indent + g + 3);
    for (r = 1; r <= s.linesBefore && !(l - r < 0); r++)
      p = f(
        u.buffer,
        c[l - r],
        i[l - r],
        u.position - (c[l] - c[l - r]),
        _
      ), o = n.repeat(" ", s.indent) + h((u.line - r + 1).toString(), g) + " | " + p.str + `
` + o;
    for (p = f(u.buffer, c[l], i[l], u.position, _), o += n.repeat(" ", s.indent) + h((u.line + 1).toString(), g) + " | " + p.str + `
`, o += n.repeat("-", s.indent + g + 3 + p.pos) + `^
`, r = 1; r <= s.linesAfter && !(l + r >= i.length); r++)
      p = f(
        u.buffer,
        c[l + r],
        i[l + r],
        u.position - (c[l] - c[l + r]),
        _
      ), o += n.repeat(" ", s.indent) + h((u.line + r + 1).toString(), g) + " | " + p.str + `
`;
    return o.replace(/\n$/, "");
  }
  return Fn = d, Fn;
}
var xn, To;
function He() {
  if (To) return xn;
  To = 1;
  var n = dr(), f = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], h = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function d(s) {
    var a = {};
    return s !== null && Object.keys(s).forEach(function(c) {
      s[c].forEach(function(i) {
        a[String(i)] = c;
      });
    }), a;
  }
  function u(s, a) {
    if (a = a || {}, Object.keys(a).forEach(function(c) {
      if (f.indexOf(c) === -1)
        throw new n('Unknown option "' + c + '" is met in definition of "' + s + '" YAML type.');
    }), this.options = a, this.tag = s, this.kind = a.kind || null, this.resolve = a.resolve || function() {
      return !0;
    }, this.construct = a.construct || function(c) {
      return c;
    }, this.instanceOf = a.instanceOf || null, this.predicate = a.predicate || null, this.represent = a.represent || null, this.representName = a.representName || null, this.defaultStyle = a.defaultStyle || null, this.multi = a.multi || !1, this.styleAliases = d(a.styleAliases || null), h.indexOf(this.kind) === -1)
      throw new n('Unknown kind "' + this.kind + '" is specified for "' + s + '" YAML type.');
  }
  return xn = u, xn;
}
var Ln, Ro;
function Ol() {
  if (Ro) return Ln;
  Ro = 1;
  var n = dr(), f = He();
  function h(s, a) {
    var c = [];
    return s[a].forEach(function(i) {
      var t = c.length;
      c.forEach(function(l, o) {
        l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (t = o);
      }), c[t] = i;
    }), c;
  }
  function d() {
    var s = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, a, c;
    function i(t) {
      t.multi ? (s.multi[t.kind].push(t), s.multi.fallback.push(t)) : s[t.kind][t.tag] = s.fallback[t.tag] = t;
    }
    for (a = 0, c = arguments.length; a < c; a += 1)
      arguments[a].forEach(i);
    return s;
  }
  function u(s) {
    return this.extend(s);
  }
  return u.prototype.extend = function(a) {
    var c = [], i = [];
    if (a instanceof f)
      i.push(a);
    else if (Array.isArray(a))
      i = i.concat(a);
    else if (a && (Array.isArray(a.implicit) || Array.isArray(a.explicit)))
      a.implicit && (c = c.concat(a.implicit)), a.explicit && (i = i.concat(a.explicit));
    else
      throw new n("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    c.forEach(function(l) {
      if (!(l instanceof f))
        throw new n("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (l.loadKind && l.loadKind !== "scalar")
        throw new n("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (l.multi)
        throw new n("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), i.forEach(function(l) {
      if (!(l instanceof f))
        throw new n("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var t = Object.create(u.prototype);
    return t.implicit = (this.implicit || []).concat(c), t.explicit = (this.explicit || []).concat(i), t.compiledImplicit = h(t, "implicit"), t.compiledExplicit = h(t, "explicit"), t.compiledTypeMap = d(t.compiledImplicit, t.compiledExplicit), t;
  }, Ln = u, Ln;
}
var Un, Co;
function Il() {
  if (Co) return Un;
  Co = 1;
  var n = He();
  return Un = new n("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(f) {
      return f !== null ? f : "";
    }
  }), Un;
}
var $n, bo;
function Pl() {
  if (bo) return $n;
  bo = 1;
  var n = He();
  return $n = new n("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(f) {
      return f !== null ? f : [];
    }
  }), $n;
}
var kn, Oo;
function Dl() {
  if (Oo) return kn;
  Oo = 1;
  var n = He();
  return kn = new n("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(f) {
      return f !== null ? f : {};
    }
  }), kn;
}
var qn, Io;
function Nl() {
  if (Io) return qn;
  Io = 1;
  var n = Ol();
  return qn = new n({
    explicit: [
      Il(),
      Pl(),
      Dl()
    ]
  }), qn;
}
var Mn, Po;
function Fl() {
  if (Po) return Mn;
  Po = 1;
  var n = He();
  function f(u) {
    if (u === null) return !0;
    var s = u.length;
    return s === 1 && u === "~" || s === 4 && (u === "null" || u === "Null" || u === "NULL");
  }
  function h() {
    return null;
  }
  function d(u) {
    return u === null;
  }
  return Mn = new n("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: f,
    construct: h,
    predicate: d,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  }), Mn;
}
var Bn, Do;
function xl() {
  if (Do) return Bn;
  Do = 1;
  var n = He();
  function f(u) {
    if (u === null) return !1;
    var s = u.length;
    return s === 4 && (u === "true" || u === "True" || u === "TRUE") || s === 5 && (u === "false" || u === "False" || u === "FALSE");
  }
  function h(u) {
    return u === "true" || u === "True" || u === "TRUE";
  }
  function d(u) {
    return Object.prototype.toString.call(u) === "[object Boolean]";
  }
  return Bn = new n("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: f,
    construct: h,
    predicate: d,
    represent: {
      lowercase: function(u) {
        return u ? "true" : "false";
      },
      uppercase: function(u) {
        return u ? "TRUE" : "FALSE";
      },
      camelcase: function(u) {
        return u ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), Bn;
}
var Hn, No;
function Ll() {
  if (No) return Hn;
  No = 1;
  var n = fr(), f = He();
  function h(i) {
    return 48 <= i && i <= 57 || 65 <= i && i <= 70 || 97 <= i && i <= 102;
  }
  function d(i) {
    return 48 <= i && i <= 55;
  }
  function u(i) {
    return 48 <= i && i <= 57;
  }
  function s(i) {
    if (i === null) return !1;
    var t = i.length, l = 0, o = !1, r;
    if (!t) return !1;
    if (r = i[l], (r === "-" || r === "+") && (r = i[++l]), r === "0") {
      if (l + 1 === t) return !0;
      if (r = i[++l], r === "b") {
        for (l++; l < t; l++)
          if (r = i[l], r !== "_") {
            if (r !== "0" && r !== "1") return !1;
            o = !0;
          }
        return o && r !== "_";
      }
      if (r === "x") {
        for (l++; l < t; l++)
          if (r = i[l], r !== "_") {
            if (!h(i.charCodeAt(l))) return !1;
            o = !0;
          }
        return o && r !== "_";
      }
      if (r === "o") {
        for (l++; l < t; l++)
          if (r = i[l], r !== "_") {
            if (!d(i.charCodeAt(l))) return !1;
            o = !0;
          }
        return o && r !== "_";
      }
    }
    if (r === "_") return !1;
    for (; l < t; l++)
      if (r = i[l], r !== "_") {
        if (!u(i.charCodeAt(l)))
          return !1;
        o = !0;
      }
    return !(!o || r === "_");
  }
  function a(i) {
    var t = i, l = 1, o;
    if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), o = t[0], (o === "-" || o === "+") && (o === "-" && (l = -1), t = t.slice(1), o = t[0]), t === "0") return 0;
    if (o === "0") {
      if (t[1] === "b") return l * parseInt(t.slice(2), 2);
      if (t[1] === "x") return l * parseInt(t.slice(2), 16);
      if (t[1] === "o") return l * parseInt(t.slice(2), 8);
    }
    return l * parseInt(t, 10);
  }
  function c(i) {
    return Object.prototype.toString.call(i) === "[object Number]" && i % 1 === 0 && !n.isNegativeZero(i);
  }
  return Hn = new f("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: s,
    construct: a,
    predicate: c,
    represent: {
      binary: function(i) {
        return i >= 0 ? "0b" + i.toString(2) : "-0b" + i.toString(2).slice(1);
      },
      octal: function(i) {
        return i >= 0 ? "0o" + i.toString(8) : "-0o" + i.toString(8).slice(1);
      },
      decimal: function(i) {
        return i.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(i) {
        return i >= 0 ? "0x" + i.toString(16).toUpperCase() : "-0x" + i.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), Hn;
}
var jn, Fo;
function Ul() {
  if (Fo) return jn;
  Fo = 1;
  var n = fr(), f = He(), h = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function d(i) {
    return !(i === null || !h.test(i) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    i[i.length - 1] === "_");
  }
  function u(i) {
    var t, l;
    return t = i.replace(/_/g, "").toLowerCase(), l = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? l === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : l * parseFloat(t, 10);
  }
  var s = /^[-+]?[0-9]+e/;
  function a(i, t) {
    var l;
    if (isNaN(i))
      switch (t) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === i)
      switch (t) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === i)
      switch (t) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (n.isNegativeZero(i))
      return "-0.0";
    return l = i.toString(10), s.test(l) ? l.replace("e", ".e") : l;
  }
  function c(i) {
    return Object.prototype.toString.call(i) === "[object Number]" && (i % 1 !== 0 || n.isNegativeZero(i));
  }
  return jn = new f("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: d,
    construct: u,
    predicate: c,
    represent: a,
    defaultStyle: "lowercase"
  }), jn;
}
var Gn, xo;
function $l() {
  return xo || (xo = 1, Gn = Nl().extend({
    implicit: [
      Fl(),
      xl(),
      Ll(),
      Ul()
    ]
  })), Gn;
}
var Wn, Lo;
function kl() {
  return Lo || (Lo = 1, Wn = $l()), Wn;
}
var Vn, Uo;
function ql() {
  if (Uo) return Vn;
  Uo = 1;
  var n = He(), f = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), h = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function d(a) {
    return a === null ? !1 : f.exec(a) !== null || h.exec(a) !== null;
  }
  function u(a) {
    var c, i, t, l, o, r, p, g = 0, _ = null, m, w, R;
    if (c = f.exec(a), c === null && (c = h.exec(a)), c === null) throw new Error("Date resolve error");
    if (i = +c[1], t = +c[2] - 1, l = +c[3], !c[4])
      return new Date(Date.UTC(i, t, l));
    if (o = +c[4], r = +c[5], p = +c[6], c[7]) {
      for (g = c[7].slice(0, 3); g.length < 3; )
        g += "0";
      g = +g;
    }
    return c[9] && (m = +c[10], w = +(c[11] || 0), _ = (m * 60 + w) * 6e4, c[9] === "-" && (_ = -_)), R = new Date(Date.UTC(i, t, l, o, r, p, g)), _ && R.setTime(R.getTime() - _), R;
  }
  function s(a) {
    return a.toISOString();
  }
  return Vn = new n("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: d,
    construct: u,
    instanceOf: Date,
    represent: s
  }), Vn;
}
var Yn, $o;
function Ml() {
  if ($o) return Yn;
  $o = 1;
  var n = He();
  function f(h) {
    return h === "<<" || h === null;
  }
  return Yn = new n("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: f
  }), Yn;
}
var zn, ko;
function Bl() {
  if (ko) return zn;
  ko = 1;
  var n = He(), f = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function h(a) {
    if (a === null) return !1;
    var c, i, t = 0, l = a.length, o = f;
    for (i = 0; i < l; i++)
      if (c = o.indexOf(a.charAt(i)), !(c > 64)) {
        if (c < 0) return !1;
        t += 6;
      }
    return t % 8 === 0;
  }
  function d(a) {
    var c, i, t = a.replace(/[\r\n=]/g, ""), l = t.length, o = f, r = 0, p = [];
    for (c = 0; c < l; c++)
      c % 4 === 0 && c && (p.push(r >> 16 & 255), p.push(r >> 8 & 255), p.push(r & 255)), r = r << 6 | o.indexOf(t.charAt(c));
    return i = l % 4 * 6, i === 0 ? (p.push(r >> 16 & 255), p.push(r >> 8 & 255), p.push(r & 255)) : i === 18 ? (p.push(r >> 10 & 255), p.push(r >> 2 & 255)) : i === 12 && p.push(r >> 4 & 255), new Uint8Array(p);
  }
  function u(a) {
    var c = "", i = 0, t, l, o = a.length, r = f;
    for (t = 0; t < o; t++)
      t % 3 === 0 && t && (c += r[i >> 18 & 63], c += r[i >> 12 & 63], c += r[i >> 6 & 63], c += r[i & 63]), i = (i << 8) + a[t];
    return l = o % 3, l === 0 ? (c += r[i >> 18 & 63], c += r[i >> 12 & 63], c += r[i >> 6 & 63], c += r[i & 63]) : l === 2 ? (c += r[i >> 10 & 63], c += r[i >> 4 & 63], c += r[i << 2 & 63], c += r[64]) : l === 1 && (c += r[i >> 2 & 63], c += r[i << 4 & 63], c += r[64], c += r[64]), c;
  }
  function s(a) {
    return Object.prototype.toString.call(a) === "[object Uint8Array]";
  }
  return zn = new n("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: h,
    construct: d,
    predicate: s,
    represent: u
  }), zn;
}
var Xn, qo;
function Hl() {
  if (qo) return Xn;
  qo = 1;
  var n = He(), f = Object.prototype.hasOwnProperty, h = Object.prototype.toString;
  function d(s) {
    if (s === null) return !0;
    var a = [], c, i, t, l, o, r = s;
    for (c = 0, i = r.length; c < i; c += 1) {
      if (t = r[c], o = !1, h.call(t) !== "[object Object]") return !1;
      for (l in t)
        if (f.call(t, l))
          if (!o) o = !0;
          else return !1;
      if (!o) return !1;
      if (a.indexOf(l) === -1) a.push(l);
      else return !1;
    }
    return !0;
  }
  function u(s) {
    return s !== null ? s : [];
  }
  return Xn = new n("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: d,
    construct: u
  }), Xn;
}
var Kn, Mo;
function jl() {
  if (Mo) return Kn;
  Mo = 1;
  var n = He(), f = Object.prototype.toString;
  function h(u) {
    if (u === null) return !0;
    var s, a, c, i, t, l = u;
    for (t = new Array(l.length), s = 0, a = l.length; s < a; s += 1) {
      if (c = l[s], f.call(c) !== "[object Object]" || (i = Object.keys(c), i.length !== 1)) return !1;
      t[s] = [i[0], c[i[0]]];
    }
    return !0;
  }
  function d(u) {
    if (u === null) return [];
    var s, a, c, i, t, l = u;
    for (t = new Array(l.length), s = 0, a = l.length; s < a; s += 1)
      c = l[s], i = Object.keys(c), t[s] = [i[0], c[i[0]]];
    return t;
  }
  return Kn = new n("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: h,
    construct: d
  }), Kn;
}
var Jn, Bo;
function Gl() {
  if (Bo) return Jn;
  Bo = 1;
  var n = He(), f = Object.prototype.hasOwnProperty;
  function h(u) {
    if (u === null) return !0;
    var s, a = u;
    for (s in a)
      if (f.call(a, s) && a[s] !== null)
        return !1;
    return !0;
  }
  function d(u) {
    return u !== null ? u : {};
  }
  return Jn = new n("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: h,
    construct: d
  }), Jn;
}
var Qn, Ho;
function Qi() {
  return Ho || (Ho = 1, Qn = kl().extend({
    implicit: [
      ql(),
      Ml()
    ],
    explicit: [
      Bl(),
      Hl(),
      jl(),
      Gl()
    ]
  })), Qn;
}
var jo;
function $c() {
  if (jo) return Pr;
  jo = 1;
  var n = fr(), f = dr(), h = Uc(), d = Qi(), u = Object.prototype.hasOwnProperty, s = 1, a = 2, c = 3, i = 4, t = 1, l = 2, o = 3, r = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, p = /[\x85\u2028\u2029]/, g = /[,\[\]\{\}]/, _ = /^(?:!|!!|![a-z\-]+!)$/i, m = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function w(e) {
    return Object.prototype.toString.call(e);
  }
  function R(e) {
    return e === 10 || e === 13;
  }
  function O(e) {
    return e === 9 || e === 32;
  }
  function I(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function M(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function C(e) {
    var B;
    return 48 <= e && e <= 57 ? e - 48 : (B = e | 32, 97 <= B && B <= 102 ? B - 97 + 10 : -1);
  }
  function A(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function T(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function E(e) {
    return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
  }
  function q(e) {
    return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
      (e - 65536 >> 10) + 55296,
      (e - 65536 & 1023) + 56320
    );
  }
  for (var U = new Array(256), L = new Array(256), k = 0; k < 256; k++)
    U[k] = E(k) ? 1 : 0, L[k] = E(k);
  function D(e, B) {
    this.input = e, this.filename = B.filename || null, this.schema = B.schema || d, this.onWarning = B.onWarning || null, this.legacy = B.legacy || !1, this.json = B.json || !1, this.listener = B.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function P(e, B) {
    var G = {
      name: e.filename,
      buffer: e.input.slice(0, -1),
      // omit trailing \0
      position: e.position,
      line: e.line,
      column: e.position - e.lineStart
    };
    return G.snippet = h(G), new f(B, G);
  }
  function F(e, B) {
    throw P(e, B);
  }
  function $(e, B) {
    e.onWarning && e.onWarning.call(null, P(e, B));
  }
  var J = {
    YAML: function(B, G, re) {
      var V, te, Z;
      B.version !== null && F(B, "duplication of %YAML directive"), re.length !== 1 && F(B, "YAML directive accepts exactly one argument"), V = /^([0-9]+)\.([0-9]+)$/.exec(re[0]), V === null && F(B, "ill-formed argument of the YAML directive"), te = parseInt(V[1], 10), Z = parseInt(V[2], 10), te !== 1 && F(B, "unacceptable YAML version of the document"), B.version = re[0], B.checkLineBreaks = Z < 2, Z !== 1 && Z !== 2 && $(B, "unsupported YAML version of the document");
    },
    TAG: function(B, G, re) {
      var V, te;
      re.length !== 2 && F(B, "TAG directive accepts exactly two arguments"), V = re[0], te = re[1], _.test(V) || F(B, "ill-formed tag handle (first argument) of the TAG directive"), u.call(B.tagMap, V) && F(B, 'there is a previously declared suffix for "' + V + '" tag handle'), m.test(te) || F(B, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        te = decodeURIComponent(te);
      } catch {
        F(B, "tag prefix is malformed: " + te);
      }
      B.tagMap[V] = te;
    }
  };
  function W(e, B, G, re) {
    var V, te, Z, ae;
    if (B < G) {
      if (ae = e.input.slice(B, G), re)
        for (V = 0, te = ae.length; V < te; V += 1)
          Z = ae.charCodeAt(V), Z === 9 || 32 <= Z && Z <= 1114111 || F(e, "expected valid JSON character");
      else r.test(ae) && F(e, "the stream contains non-printable characters");
      e.result += ae;
    }
  }
  function ne(e, B, G, re) {
    var V, te, Z, ae;
    for (n.isObject(G) || F(e, "cannot merge mappings; the provided source object is unacceptable"), V = Object.keys(G), Z = 0, ae = V.length; Z < ae; Z += 1)
      te = V[Z], u.call(B, te) || (B[te] = G[te], re[te] = !0);
  }
  function ce(e, B, G, re, V, te, Z, ae, ge) {
    var ve, Te;
    if (Array.isArray(V))
      for (V = Array.prototype.slice.call(V), ve = 0, Te = V.length; ve < Te; ve += 1)
        Array.isArray(V[ve]) && F(e, "nested arrays are not supported inside keys"), typeof V == "object" && w(V[ve]) === "[object Object]" && (V[ve] = "[object Object]");
    if (typeof V == "object" && w(V) === "[object Object]" && (V = "[object Object]"), V = String(V), B === null && (B = {}), re === "tag:yaml.org,2002:merge")
      if (Array.isArray(te))
        for (ve = 0, Te = te.length; ve < Te; ve += 1)
          ne(e, B, te[ve], G);
      else
        ne(e, B, te, G);
    else
      !e.json && !u.call(G, V) && u.call(B, V) && (e.line = Z || e.line, e.lineStart = ae || e.lineStart, e.position = ge || e.position, F(e, "duplicated mapping key")), V === "__proto__" ? Object.defineProperty(B, V, {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: te
      }) : B[V] = te, delete G[V];
    return B;
  }
  function ue(e) {
    var B;
    B = e.input.charCodeAt(e.position), B === 10 ? e.position++ : B === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : F(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
  }
  function ie(e, B, G) {
    for (var re = 0, V = e.input.charCodeAt(e.position); V !== 0; ) {
      for (; O(V); )
        V === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), V = e.input.charCodeAt(++e.position);
      if (B && V === 35)
        do
          V = e.input.charCodeAt(++e.position);
        while (V !== 10 && V !== 13 && V !== 0);
      if (R(V))
        for (ue(e), V = e.input.charCodeAt(e.position), re++, e.lineIndent = 0; V === 32; )
          e.lineIndent++, V = e.input.charCodeAt(++e.position);
      else
        break;
    }
    return G !== -1 && re !== 0 && e.lineIndent < G && $(e, "deficient indentation"), re;
  }
  function Ae(e) {
    var B = e.position, G;
    return G = e.input.charCodeAt(B), !!((G === 45 || G === 46) && G === e.input.charCodeAt(B + 1) && G === e.input.charCodeAt(B + 2) && (B += 3, G = e.input.charCodeAt(B), G === 0 || I(G)));
  }
  function K(e, B) {
    B === 1 ? e.result += " " : B > 1 && (e.result += n.repeat(`
`, B - 1));
  }
  function Ee(e, B, G) {
    var re, V, te, Z, ae, ge, ve, Te, de = e.kind, xe = e.result, y;
    if (y = e.input.charCodeAt(e.position), I(y) || M(y) || y === 35 || y === 38 || y === 42 || y === 33 || y === 124 || y === 62 || y === 39 || y === 34 || y === 37 || y === 64 || y === 96 || (y === 63 || y === 45) && (V = e.input.charCodeAt(e.position + 1), I(V) || G && M(V)))
      return !1;
    for (e.kind = "scalar", e.result = "", te = Z = e.position, ae = !1; y !== 0; ) {
      if (y === 58) {
        if (V = e.input.charCodeAt(e.position + 1), I(V) || G && M(V))
          break;
      } else if (y === 35) {
        if (re = e.input.charCodeAt(e.position - 1), I(re))
          break;
      } else {
        if (e.position === e.lineStart && Ae(e) || G && M(y))
          break;
        if (R(y))
          if (ge = e.line, ve = e.lineStart, Te = e.lineIndent, ie(e, !1, -1), e.lineIndent >= B) {
            ae = !0, y = e.input.charCodeAt(e.position);
            continue;
          } else {
            e.position = Z, e.line = ge, e.lineStart = ve, e.lineIndent = Te;
            break;
          }
      }
      ae && (W(e, te, Z, !1), K(e, e.line - ge), te = Z = e.position, ae = !1), O(y) || (Z = e.position + 1), y = e.input.charCodeAt(++e.position);
    }
    return W(e, te, Z, !1), e.result ? !0 : (e.kind = de, e.result = xe, !1);
  }
  function S(e, B) {
    var G, re, V;
    if (G = e.input.charCodeAt(e.position), G !== 39)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, re = V = e.position; (G = e.input.charCodeAt(e.position)) !== 0; )
      if (G === 39)
        if (W(e, re, e.position, !0), G = e.input.charCodeAt(++e.position), G === 39)
          re = e.position, e.position++, V = e.position;
        else
          return !0;
      else R(G) ? (W(e, re, V, !0), K(e, ie(e, !1, B)), re = V = e.position) : e.position === e.lineStart && Ae(e) ? F(e, "unexpected end of the document within a single quoted scalar") : (e.position++, V = e.position);
    F(e, "unexpected end of the stream within a single quoted scalar");
  }
  function v(e, B) {
    var G, re, V, te, Z, ae;
    if (ae = e.input.charCodeAt(e.position), ae !== 34)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, G = re = e.position; (ae = e.input.charCodeAt(e.position)) !== 0; ) {
      if (ae === 34)
        return W(e, G, e.position, !0), e.position++, !0;
      if (ae === 92) {
        if (W(e, G, e.position, !0), ae = e.input.charCodeAt(++e.position), R(ae))
          ie(e, !1, B);
        else if (ae < 256 && U[ae])
          e.result += L[ae], e.position++;
        else if ((Z = A(ae)) > 0) {
          for (V = Z, te = 0; V > 0; V--)
            ae = e.input.charCodeAt(++e.position), (Z = C(ae)) >= 0 ? te = (te << 4) + Z : F(e, "expected hexadecimal character");
          e.result += q(te), e.position++;
        } else
          F(e, "unknown escape sequence");
        G = re = e.position;
      } else R(ae) ? (W(e, G, re, !0), K(e, ie(e, !1, B)), G = re = e.position) : e.position === e.lineStart && Ae(e) ? F(e, "unexpected end of the document within a double quoted scalar") : (e.position++, re = e.position);
    }
    F(e, "unexpected end of the stream within a double quoted scalar");
  }
  function H(e, B) {
    var G = !0, re, V, te, Z = e.tag, ae, ge = e.anchor, ve, Te, de, xe, y, j = /* @__PURE__ */ Object.create(null), X, Y, Q, ee;
    if (ee = e.input.charCodeAt(e.position), ee === 91)
      Te = 93, y = !1, ae = [];
    else if (ee === 123)
      Te = 125, y = !0, ae = {};
    else
      return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = ae), ee = e.input.charCodeAt(++e.position); ee !== 0; ) {
      if (ie(e, !0, B), ee = e.input.charCodeAt(e.position), ee === Te)
        return e.position++, e.tag = Z, e.anchor = ge, e.kind = y ? "mapping" : "sequence", e.result = ae, !0;
      G ? ee === 44 && F(e, "expected the node content, but found ','") : F(e, "missed comma between flow collection entries"), Y = X = Q = null, de = xe = !1, ee === 63 && (ve = e.input.charCodeAt(e.position + 1), I(ve) && (de = xe = !0, e.position++, ie(e, !0, B))), re = e.line, V = e.lineStart, te = e.position, Fe(e, B, s, !1, !0), Y = e.tag, X = e.result, ie(e, !0, B), ee = e.input.charCodeAt(e.position), (xe || e.line === re) && ee === 58 && (de = !0, ee = e.input.charCodeAt(++e.position), ie(e, !0, B), Fe(e, B, s, !1, !0), Q = e.result), y ? ce(e, ae, j, Y, X, Q, re, V, te) : de ? ae.push(ce(e, null, j, Y, X, Q, re, V, te)) : ae.push(X), ie(e, !0, B), ee = e.input.charCodeAt(e.position), ee === 44 ? (G = !0, ee = e.input.charCodeAt(++e.position)) : G = !1;
    }
    F(e, "unexpected end of the stream within a flow collection");
  }
  function N(e, B) {
    var G, re, V = t, te = !1, Z = !1, ae = B, ge = 0, ve = !1, Te, de;
    if (de = e.input.charCodeAt(e.position), de === 124)
      re = !1;
    else if (de === 62)
      re = !0;
    else
      return !1;
    for (e.kind = "scalar", e.result = ""; de !== 0; )
      if (de = e.input.charCodeAt(++e.position), de === 43 || de === 45)
        t === V ? V = de === 43 ? o : l : F(e, "repeat of a chomping mode identifier");
      else if ((Te = T(de)) >= 0)
        Te === 0 ? F(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : Z ? F(e, "repeat of an indentation width identifier") : (ae = B + Te - 1, Z = !0);
      else
        break;
    if (O(de)) {
      do
        de = e.input.charCodeAt(++e.position);
      while (O(de));
      if (de === 35)
        do
          de = e.input.charCodeAt(++e.position);
        while (!R(de) && de !== 0);
    }
    for (; de !== 0; ) {
      for (ue(e), e.lineIndent = 0, de = e.input.charCodeAt(e.position); (!Z || e.lineIndent < ae) && de === 32; )
        e.lineIndent++, de = e.input.charCodeAt(++e.position);
      if (!Z && e.lineIndent > ae && (ae = e.lineIndent), R(de)) {
        ge++;
        continue;
      }
      if (e.lineIndent < ae) {
        V === o ? e.result += n.repeat(`
`, te ? 1 + ge : ge) : V === t && te && (e.result += `
`);
        break;
      }
      for (re ? O(de) ? (ve = !0, e.result += n.repeat(`
`, te ? 1 + ge : ge)) : ve ? (ve = !1, e.result += n.repeat(`
`, ge + 1)) : ge === 0 ? te && (e.result += " ") : e.result += n.repeat(`
`, ge) : e.result += n.repeat(`
`, te ? 1 + ge : ge), te = !0, Z = !0, ge = 0, G = e.position; !R(de) && de !== 0; )
        de = e.input.charCodeAt(++e.position);
      W(e, G, e.position, !1);
    }
    return !0;
  }
  function le(e, B) {
    var G, re = e.tag, V = e.anchor, te = [], Z, ae = !1, ge;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = te), ge = e.input.charCodeAt(e.position); ge !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, F(e, "tab characters must not be used in indentation")), !(ge !== 45 || (Z = e.input.charCodeAt(e.position + 1), !I(Z)))); ) {
      if (ae = !0, e.position++, ie(e, !0, -1) && e.lineIndent <= B) {
        te.push(null), ge = e.input.charCodeAt(e.position);
        continue;
      }
      if (G = e.line, Fe(e, B, c, !1, !0), te.push(e.result), ie(e, !0, -1), ge = e.input.charCodeAt(e.position), (e.line === G || e.lineIndent > B) && ge !== 0)
        F(e, "bad indentation of a sequence entry");
      else if (e.lineIndent < B)
        break;
    }
    return ae ? (e.tag = re, e.anchor = V, e.kind = "sequence", e.result = te, !0) : !1;
  }
  function me(e, B, G) {
    var re, V, te, Z, ae, ge, ve = e.tag, Te = e.anchor, de = {}, xe = /* @__PURE__ */ Object.create(null), y = null, j = null, X = null, Y = !1, Q = !1, ee;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = de), ee = e.input.charCodeAt(e.position); ee !== 0; ) {
      if (!Y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, F(e, "tab characters must not be used in indentation")), re = e.input.charCodeAt(e.position + 1), te = e.line, (ee === 63 || ee === 58) && I(re))
        ee === 63 ? (Y && (ce(e, de, xe, y, j, null, Z, ae, ge), y = j = X = null), Q = !0, Y = !0, V = !0) : Y ? (Y = !1, V = !0) : F(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, ee = re;
      else {
        if (Z = e.line, ae = e.lineStart, ge = e.position, !Fe(e, G, a, !1, !0))
          break;
        if (e.line === te) {
          for (ee = e.input.charCodeAt(e.position); O(ee); )
            ee = e.input.charCodeAt(++e.position);
          if (ee === 58)
            ee = e.input.charCodeAt(++e.position), I(ee) || F(e, "a whitespace character is expected after the key-value separator within a block mapping"), Y && (ce(e, de, xe, y, j, null, Z, ae, ge), y = j = X = null), Q = !0, Y = !1, V = !1, y = e.tag, j = e.result;
          else if (Q)
            F(e, "can not read an implicit mapping pair; a colon is missed");
          else
            return e.tag = ve, e.anchor = Te, !0;
        } else if (Q)
          F(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return e.tag = ve, e.anchor = Te, !0;
      }
      if ((e.line === te || e.lineIndent > B) && (Y && (Z = e.line, ae = e.lineStart, ge = e.position), Fe(e, B, i, !0, V) && (Y ? j = e.result : X = e.result), Y || (ce(e, de, xe, y, j, X, Z, ae, ge), y = j = X = null), ie(e, !0, -1), ee = e.input.charCodeAt(e.position)), (e.line === te || e.lineIndent > B) && ee !== 0)
        F(e, "bad indentation of a mapping entry");
      else if (e.lineIndent < B)
        break;
    }
    return Y && ce(e, de, xe, y, j, null, Z, ae, ge), Q && (e.tag = ve, e.anchor = Te, e.kind = "mapping", e.result = de), Q;
  }
  function pe(e) {
    var B, G = !1, re = !1, V, te, Z;
    if (Z = e.input.charCodeAt(e.position), Z !== 33) return !1;
    if (e.tag !== null && F(e, "duplication of a tag property"), Z = e.input.charCodeAt(++e.position), Z === 60 ? (G = !0, Z = e.input.charCodeAt(++e.position)) : Z === 33 ? (re = !0, V = "!!", Z = e.input.charCodeAt(++e.position)) : V = "!", B = e.position, G) {
      do
        Z = e.input.charCodeAt(++e.position);
      while (Z !== 0 && Z !== 62);
      e.position < e.length ? (te = e.input.slice(B, e.position), Z = e.input.charCodeAt(++e.position)) : F(e, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Z !== 0 && !I(Z); )
        Z === 33 && (re ? F(e, "tag suffix cannot contain exclamation marks") : (V = e.input.slice(B - 1, e.position + 1), _.test(V) || F(e, "named tag handle cannot contain such characters"), re = !0, B = e.position + 1)), Z = e.input.charCodeAt(++e.position);
      te = e.input.slice(B, e.position), g.test(te) && F(e, "tag suffix cannot contain flow indicator characters");
    }
    te && !m.test(te) && F(e, "tag name cannot contain such characters: " + te);
    try {
      te = decodeURIComponent(te);
    } catch {
      F(e, "tag name is malformed: " + te);
    }
    return G ? e.tag = te : u.call(e.tagMap, V) ? e.tag = e.tagMap[V] + te : V === "!" ? e.tag = "!" + te : V === "!!" ? e.tag = "tag:yaml.org,2002:" + te : F(e, 'undeclared tag handle "' + V + '"'), !0;
  }
  function _e(e) {
    var B, G;
    if (G = e.input.charCodeAt(e.position), G !== 38) return !1;
    for (e.anchor !== null && F(e, "duplication of an anchor property"), G = e.input.charCodeAt(++e.position), B = e.position; G !== 0 && !I(G) && !M(G); )
      G = e.input.charCodeAt(++e.position);
    return e.position === B && F(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(B, e.position), !0;
  }
  function ye(e) {
    var B, G, re;
    if (re = e.input.charCodeAt(e.position), re !== 42) return !1;
    for (re = e.input.charCodeAt(++e.position), B = e.position; re !== 0 && !I(re) && !M(re); )
      re = e.input.charCodeAt(++e.position);
    return e.position === B && F(e, "name of an alias node must contain at least one character"), G = e.input.slice(B, e.position), u.call(e.anchorMap, G) || F(e, 'unidentified alias "' + G + '"'), e.result = e.anchorMap[G], ie(e, !0, -1), !0;
  }
  function Fe(e, B, G, re, V) {
    var te, Z, ae, ge = 1, ve = !1, Te = !1, de, xe, y, j, X, Y;
    if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, te = Z = ae = i === G || c === G, re && ie(e, !0, -1) && (ve = !0, e.lineIndent > B ? ge = 1 : e.lineIndent === B ? ge = 0 : e.lineIndent < B && (ge = -1)), ge === 1)
      for (; pe(e) || _e(e); )
        ie(e, !0, -1) ? (ve = !0, ae = te, e.lineIndent > B ? ge = 1 : e.lineIndent === B ? ge = 0 : e.lineIndent < B && (ge = -1)) : ae = !1;
    if (ae && (ae = ve || V), (ge === 1 || i === G) && (s === G || a === G ? X = B : X = B + 1, Y = e.position - e.lineStart, ge === 1 ? ae && (le(e, Y) || me(e, Y, X)) || H(e, X) ? Te = !0 : (Z && N(e, X) || S(e, X) || v(e, X) ? Te = !0 : ye(e) ? (Te = !0, (e.tag !== null || e.anchor !== null) && F(e, "alias node should not have any properties")) : Ee(e, X, s === G) && (Te = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : ge === 0 && (Te = ae && le(e, Y))), e.tag === null)
      e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
    else if (e.tag === "?") {
      for (e.result !== null && e.kind !== "scalar" && F(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), de = 0, xe = e.implicitTypes.length; de < xe; de += 1)
        if (j = e.implicitTypes[de], j.resolve(e.result)) {
          e.result = j.construct(e.result), e.tag = j.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else if (e.tag !== "!") {
      if (u.call(e.typeMap[e.kind || "fallback"], e.tag))
        j = e.typeMap[e.kind || "fallback"][e.tag];
      else
        for (j = null, y = e.typeMap.multi[e.kind || "fallback"], de = 0, xe = y.length; de < xe; de += 1)
          if (e.tag.slice(0, y[de].tag.length) === y[de].tag) {
            j = y[de];
            break;
          }
      j || F(e, "unknown tag !<" + e.tag + ">"), e.result !== null && j.kind !== e.kind && F(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + j.kind + '", not "' + e.kind + '"'), j.resolve(e.result, e.tag) ? (e.result = j.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : F(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
    }
    return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || Te;
  }
  function Ce(e) {
    var B = e.position, G, re, V, te = !1, Z;
    for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (Z = e.input.charCodeAt(e.position)) !== 0 && (ie(e, !0, -1), Z = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || Z !== 37)); ) {
      for (te = !0, Z = e.input.charCodeAt(++e.position), G = e.position; Z !== 0 && !I(Z); )
        Z = e.input.charCodeAt(++e.position);
      for (re = e.input.slice(G, e.position), V = [], re.length < 1 && F(e, "directive name must not be less than one character in length"); Z !== 0; ) {
        for (; O(Z); )
          Z = e.input.charCodeAt(++e.position);
        if (Z === 35) {
          do
            Z = e.input.charCodeAt(++e.position);
          while (Z !== 0 && !R(Z));
          break;
        }
        if (R(Z)) break;
        for (G = e.position; Z !== 0 && !I(Z); )
          Z = e.input.charCodeAt(++e.position);
        V.push(e.input.slice(G, e.position));
      }
      Z !== 0 && ue(e), u.call(J, re) ? J[re](e, re, V) : $(e, 'unknown document directive "' + re + '"');
    }
    if (ie(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ie(e, !0, -1)) : te && F(e, "directives end mark is expected"), Fe(e, e.lineIndent - 1, i, !1, !0), ie(e, !0, -1), e.checkLineBreaks && p.test(e.input.slice(B, e.position)) && $(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Ae(e)) {
      e.input.charCodeAt(e.position) === 46 && (e.position += 3, ie(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1)
      F(e, "end of the stream or a document separator is expected");
    else
      return;
  }
  function ke(e, B) {
    e = String(e), B = B || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
    var G = new D(e, B), re = e.indexOf("\0");
    for (re !== -1 && (G.position = re, F(G, "null byte is not allowed in input")), G.input += "\0"; G.input.charCodeAt(G.position) === 32; )
      G.lineIndent += 1, G.position += 1;
    for (; G.position < G.length - 1; )
      Ce(G);
    return G.documents;
  }
  function pt(e, B, G) {
    B !== null && typeof B == "object" && typeof G > "u" && (G = B, B = null);
    var re = ke(e, G);
    if (typeof B != "function")
      return re;
    for (var V = 0, te = re.length; V < te; V += 1)
      B(re[V]);
  }
  function nt(e, B) {
    var G = ke(e, B);
    if (G.length !== 0) {
      if (G.length === 1)
        return G[0];
      throw new f("expected a single document in the stream, but found more");
    }
  }
  return Pr.loadAll = pt, Pr.load = nt, Pr;
}
var Zn = {}, Go;
function kc() {
  if (Go) return Zn;
  Go = 1;
  var n = fr(), f = dr(), h = Qi(), d = Object.prototype.toString, u = Object.prototype.hasOwnProperty, s = 65279, a = 9, c = 10, i = 13, t = 32, l = 33, o = 34, r = 35, p = 37, g = 38, _ = 39, m = 42, w = 44, R = 45, O = 58, I = 61, M = 62, C = 63, A = 64, T = 91, E = 93, q = 96, U = 123, L = 124, k = 125, D = {};
  D[0] = "\\0", D[7] = "\\a", D[8] = "\\b", D[9] = "\\t", D[10] = "\\n", D[11] = "\\v", D[12] = "\\f", D[13] = "\\r", D[27] = "\\e", D[34] = '\\"', D[92] = "\\\\", D[133] = "\\N", D[160] = "\\_", D[8232] = "\\L", D[8233] = "\\P";
  var P = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], F = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function $(y, j) {
    var X, Y, Q, ee, fe, oe, he;
    if (j === null) return {};
    for (X = {}, Y = Object.keys(j), Q = 0, ee = Y.length; Q < ee; Q += 1)
      fe = Y[Q], oe = String(j[fe]), fe.slice(0, 2) === "!!" && (fe = "tag:yaml.org,2002:" + fe.slice(2)), he = y.compiledTypeMap.fallback[fe], he && u.call(he.styleAliases, oe) && (oe = he.styleAliases[oe]), X[fe] = oe;
    return X;
  }
  function J(y) {
    var j, X, Y;
    if (j = y.toString(16).toUpperCase(), y <= 255)
      X = "x", Y = 2;
    else if (y <= 65535)
      X = "u", Y = 4;
    else if (y <= 4294967295)
      X = "U", Y = 8;
    else
      throw new f("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + X + n.repeat("0", Y - j.length) + j;
  }
  var W = 1, ne = 2;
  function ce(y) {
    this.schema = y.schema || h, this.indent = Math.max(1, y.indent || 2), this.noArrayIndent = y.noArrayIndent || !1, this.skipInvalid = y.skipInvalid || !1, this.flowLevel = n.isNothing(y.flowLevel) ? -1 : y.flowLevel, this.styleMap = $(this.schema, y.styles || null), this.sortKeys = y.sortKeys || !1, this.lineWidth = y.lineWidth || 80, this.noRefs = y.noRefs || !1, this.noCompatMode = y.noCompatMode || !1, this.condenseFlow = y.condenseFlow || !1, this.quotingType = y.quotingType === '"' ? ne : W, this.forceQuotes = y.forceQuotes || !1, this.replacer = typeof y.replacer == "function" ? y.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ue(y, j) {
    for (var X = n.repeat(" ", j), Y = 0, Q = -1, ee = "", fe, oe = y.length; Y < oe; )
      Q = y.indexOf(`
`, Y), Q === -1 ? (fe = y.slice(Y), Y = oe) : (fe = y.slice(Y, Q + 1), Y = Q + 1), fe.length && fe !== `
` && (ee += X), ee += fe;
    return ee;
  }
  function ie(y, j) {
    return `
` + n.repeat(" ", y.indent * j);
  }
  function Ae(y, j) {
    var X, Y, Q;
    for (X = 0, Y = y.implicitTypes.length; X < Y; X += 1)
      if (Q = y.implicitTypes[X], Q.resolve(j))
        return !0;
    return !1;
  }
  function K(y) {
    return y === t || y === a;
  }
  function Ee(y) {
    return 32 <= y && y <= 126 || 161 <= y && y <= 55295 && y !== 8232 && y !== 8233 || 57344 <= y && y <= 65533 && y !== s || 65536 <= y && y <= 1114111;
  }
  function S(y) {
    return Ee(y) && y !== s && y !== i && y !== c;
  }
  function v(y, j, X) {
    var Y = S(y), Q = Y && !K(y);
    return (
      // ns-plain-safe
      (X ? (
        // c = flow-in
        Y
      ) : Y && y !== w && y !== T && y !== E && y !== U && y !== k) && y !== r && !(j === O && !Q) || S(j) && !K(j) && y === r || j === O && Q
    );
  }
  function H(y) {
    return Ee(y) && y !== s && !K(y) && y !== R && y !== C && y !== O && y !== w && y !== T && y !== E && y !== U && y !== k && y !== r && y !== g && y !== m && y !== l && y !== L && y !== I && y !== M && y !== _ && y !== o && y !== p && y !== A && y !== q;
  }
  function N(y) {
    return !K(y) && y !== O;
  }
  function le(y, j) {
    var X = y.charCodeAt(j), Y;
    return X >= 55296 && X <= 56319 && j + 1 < y.length && (Y = y.charCodeAt(j + 1), Y >= 56320 && Y <= 57343) ? (X - 55296) * 1024 + Y - 56320 + 65536 : X;
  }
  function me(y) {
    var j = /^\n* /;
    return j.test(y);
  }
  var pe = 1, _e = 2, ye = 3, Fe = 4, Ce = 5;
  function ke(y, j, X, Y, Q, ee, fe, oe) {
    var he, we = 0, Oe = null, De = !1, Re = !1, bt = Y !== -1, Ke = -1, mt = H(le(y, 0)) && N(le(y, y.length - 1));
    if (j || fe)
      for (he = 0; he < y.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(y, he), !Ee(we))
          return Ce;
        mt = mt && v(we, Oe, oe), Oe = we;
      }
    else {
      for (he = 0; he < y.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(y, he), we === c)
          De = !0, bt && (Re = Re || // Foldable line = too long, and not more-indented.
          he - Ke - 1 > Y && y[Ke + 1] !== " ", Ke = he);
        else if (!Ee(we))
          return Ce;
        mt = mt && v(we, Oe, oe), Oe = we;
      }
      Re = Re || bt && he - Ke - 1 > Y && y[Ke + 1] !== " ";
    }
    return !De && !Re ? mt && !fe && !Q(y) ? pe : ee === ne ? Ce : _e : X > 9 && me(y) ? Ce : fe ? ee === ne ? Ce : _e : Re ? Fe : ye;
  }
  function pt(y, j, X, Y, Q) {
    y.dump = function() {
      if (j.length === 0)
        return y.quotingType === ne ? '""' : "''";
      if (!y.noCompatMode && (P.indexOf(j) !== -1 || F.test(j)))
        return y.quotingType === ne ? '"' + j + '"' : "'" + j + "'";
      var ee = y.indent * Math.max(1, X), fe = y.lineWidth === -1 ? -1 : Math.max(Math.min(y.lineWidth, 40), y.lineWidth - ee), oe = Y || y.flowLevel > -1 && X >= y.flowLevel;
      function he(we) {
        return Ae(y, we);
      }
      switch (ke(
        j,
        oe,
        y.indent,
        fe,
        he,
        y.quotingType,
        y.forceQuotes && !Y,
        Q
      )) {
        case pe:
          return j;
        case _e:
          return "'" + j.replace(/'/g, "''") + "'";
        case ye:
          return "|" + nt(j, y.indent) + e(ue(j, ee));
        case Fe:
          return ">" + nt(j, y.indent) + e(ue(B(j, fe), ee));
        case Ce:
          return '"' + re(j) + '"';
        default:
          throw new f("impossible error: invalid scalar style");
      }
    }();
  }
  function nt(y, j) {
    var X = me(y) ? String(j) : "", Y = y[y.length - 1] === `
`, Q = Y && (y[y.length - 2] === `
` || y === `
`), ee = Q ? "+" : Y ? "" : "-";
    return X + ee + `
`;
  }
  function e(y) {
    return y[y.length - 1] === `
` ? y.slice(0, -1) : y;
  }
  function B(y, j) {
    for (var X = /(\n+)([^\n]*)/g, Y = function() {
      var we = y.indexOf(`
`);
      return we = we !== -1 ? we : y.length, X.lastIndex = we, G(y.slice(0, we), j);
    }(), Q = y[0] === `
` || y[0] === " ", ee, fe; fe = X.exec(y); ) {
      var oe = fe[1], he = fe[2];
      ee = he[0] === " ", Y += oe + (!Q && !ee && he !== "" ? `
` : "") + G(he, j), Q = ee;
    }
    return Y;
  }
  function G(y, j) {
    if (y === "" || y[0] === " ") return y;
    for (var X = / [^ ]/g, Y, Q = 0, ee, fe = 0, oe = 0, he = ""; Y = X.exec(y); )
      oe = Y.index, oe - Q > j && (ee = fe > Q ? fe : oe, he += `
` + y.slice(Q, ee), Q = ee + 1), fe = oe;
    return he += `
`, y.length - Q > j && fe > Q ? he += y.slice(Q, fe) + `
` + y.slice(fe + 1) : he += y.slice(Q), he.slice(1);
  }
  function re(y) {
    for (var j = "", X = 0, Y, Q = 0; Q < y.length; X >= 65536 ? Q += 2 : Q++)
      X = le(y, Q), Y = D[X], !Y && Ee(X) ? (j += y[Q], X >= 65536 && (j += y[Q + 1])) : j += Y || J(X);
    return j;
  }
  function V(y, j, X) {
    var Y = "", Q = y.tag, ee, fe, oe;
    for (ee = 0, fe = X.length; ee < fe; ee += 1)
      oe = X[ee], y.replacer && (oe = y.replacer.call(X, String(ee), oe)), (ve(y, j, oe, !1, !1) || typeof oe > "u" && ve(y, j, null, !1, !1)) && (Y !== "" && (Y += "," + (y.condenseFlow ? "" : " ")), Y += y.dump);
    y.tag = Q, y.dump = "[" + Y + "]";
  }
  function te(y, j, X, Y) {
    var Q = "", ee = y.tag, fe, oe, he;
    for (fe = 0, oe = X.length; fe < oe; fe += 1)
      he = X[fe], y.replacer && (he = y.replacer.call(X, String(fe), he)), (ve(y, j + 1, he, !0, !0, !1, !0) || typeof he > "u" && ve(y, j + 1, null, !0, !0, !1, !0)) && ((!Y || Q !== "") && (Q += ie(y, j)), y.dump && c === y.dump.charCodeAt(0) ? Q += "-" : Q += "- ", Q += y.dump);
    y.tag = ee, y.dump = Q || "[]";
  }
  function Z(y, j, X) {
    var Y = "", Q = y.tag, ee = Object.keys(X), fe, oe, he, we, Oe;
    for (fe = 0, oe = ee.length; fe < oe; fe += 1)
      Oe = "", Y !== "" && (Oe += ", "), y.condenseFlow && (Oe += '"'), he = ee[fe], we = X[he], y.replacer && (we = y.replacer.call(X, he, we)), ve(y, j, he, !1, !1) && (y.dump.length > 1024 && (Oe += "? "), Oe += y.dump + (y.condenseFlow ? '"' : "") + ":" + (y.condenseFlow ? "" : " "), ve(y, j, we, !1, !1) && (Oe += y.dump, Y += Oe));
    y.tag = Q, y.dump = "{" + Y + "}";
  }
  function ae(y, j, X, Y) {
    var Q = "", ee = y.tag, fe = Object.keys(X), oe, he, we, Oe, De, Re;
    if (y.sortKeys === !0)
      fe.sort();
    else if (typeof y.sortKeys == "function")
      fe.sort(y.sortKeys);
    else if (y.sortKeys)
      throw new f("sortKeys must be a boolean or a function");
    for (oe = 0, he = fe.length; oe < he; oe += 1)
      Re = "", (!Y || Q !== "") && (Re += ie(y, j)), we = fe[oe], Oe = X[we], y.replacer && (Oe = y.replacer.call(X, we, Oe)), ve(y, j + 1, we, !0, !0, !0) && (De = y.tag !== null && y.tag !== "?" || y.dump && y.dump.length > 1024, De && (y.dump && c === y.dump.charCodeAt(0) ? Re += "?" : Re += "? "), Re += y.dump, De && (Re += ie(y, j)), ve(y, j + 1, Oe, !0, De) && (y.dump && c === y.dump.charCodeAt(0) ? Re += ":" : Re += ": ", Re += y.dump, Q += Re));
    y.tag = ee, y.dump = Q || "{}";
  }
  function ge(y, j, X) {
    var Y, Q, ee, fe, oe, he;
    for (Q = X ? y.explicitTypes : y.implicitTypes, ee = 0, fe = Q.length; ee < fe; ee += 1)
      if (oe = Q[ee], (oe.instanceOf || oe.predicate) && (!oe.instanceOf || typeof j == "object" && j instanceof oe.instanceOf) && (!oe.predicate || oe.predicate(j))) {
        if (X ? oe.multi && oe.representName ? y.tag = oe.representName(j) : y.tag = oe.tag : y.tag = "?", oe.represent) {
          if (he = y.styleMap[oe.tag] || oe.defaultStyle, d.call(oe.represent) === "[object Function]")
            Y = oe.represent(j, he);
          else if (u.call(oe.represent, he))
            Y = oe.represent[he](j, he);
          else
            throw new f("!<" + oe.tag + '> tag resolver accepts not "' + he + '" style');
          y.dump = Y;
        }
        return !0;
      }
    return !1;
  }
  function ve(y, j, X, Y, Q, ee, fe) {
    y.tag = null, y.dump = X, ge(y, X, !1) || ge(y, X, !0);
    var oe = d.call(y.dump), he = Y, we;
    Y && (Y = y.flowLevel < 0 || y.flowLevel > j);
    var Oe = oe === "[object Object]" || oe === "[object Array]", De, Re;
    if (Oe && (De = y.duplicates.indexOf(X), Re = De !== -1), (y.tag !== null && y.tag !== "?" || Re || y.indent !== 2 && j > 0) && (Q = !1), Re && y.usedDuplicates[De])
      y.dump = "*ref_" + De;
    else {
      if (Oe && Re && !y.usedDuplicates[De] && (y.usedDuplicates[De] = !0), oe === "[object Object]")
        Y && Object.keys(y.dump).length !== 0 ? (ae(y, j, y.dump, Q), Re && (y.dump = "&ref_" + De + y.dump)) : (Z(y, j, y.dump), Re && (y.dump = "&ref_" + De + " " + y.dump));
      else if (oe === "[object Array]")
        Y && y.dump.length !== 0 ? (y.noArrayIndent && !fe && j > 0 ? te(y, j - 1, y.dump, Q) : te(y, j, y.dump, Q), Re && (y.dump = "&ref_" + De + y.dump)) : (V(y, j, y.dump), Re && (y.dump = "&ref_" + De + " " + y.dump));
      else if (oe === "[object String]")
        y.tag !== "?" && pt(y, y.dump, j, ee, he);
      else {
        if (oe === "[object Undefined]")
          return !1;
        if (y.skipInvalid) return !1;
        throw new f("unacceptable kind of an object to dump " + oe);
      }
      y.tag !== null && y.tag !== "?" && (we = encodeURI(
        y.tag[0] === "!" ? y.tag.slice(1) : y.tag
      ).replace(/!/g, "%21"), y.tag[0] === "!" ? we = "!" + we : we.slice(0, 18) === "tag:yaml.org,2002:" ? we = "!!" + we.slice(18) : we = "!<" + we + ">", y.dump = we + " " + y.dump);
    }
    return !0;
  }
  function Te(y, j) {
    var X = [], Y = [], Q, ee;
    for (de(y, X, Y), Q = 0, ee = Y.length; Q < ee; Q += 1)
      j.duplicates.push(X[Y[Q]]);
    j.usedDuplicates = new Array(ee);
  }
  function de(y, j, X) {
    var Y, Q, ee;
    if (y !== null && typeof y == "object")
      if (Q = j.indexOf(y), Q !== -1)
        X.indexOf(Q) === -1 && X.push(Q);
      else if (j.push(y), Array.isArray(y))
        for (Q = 0, ee = y.length; Q < ee; Q += 1)
          de(y[Q], j, X);
      else
        for (Y = Object.keys(y), Q = 0, ee = Y.length; Q < ee; Q += 1)
          de(y[Y[Q]], j, X);
  }
  function xe(y, j) {
    j = j || {};
    var X = new ce(j);
    X.noRefs || Te(y, X);
    var Y = y;
    return X.replacer && (Y = X.replacer.call({ "": Y }, "", Y)), ve(X, 0, Y, !0, !0) ? X.dump + `
` : "";
  }
  return Zn.dump = xe, Zn;
}
var Wo;
function Zi() {
  if (Wo) return Be;
  Wo = 1;
  var n = $c(), f = kc();
  function h(d, u) {
    return function() {
      throw new Error("Function yaml." + d + " is removed in js-yaml 4. Use yaml." + u + " instead, which is now safe by default.");
    };
  }
  return Be.Type = He(), Be.Schema = Ol(), Be.FAILSAFE_SCHEMA = Nl(), Be.JSON_SCHEMA = $l(), Be.CORE_SCHEMA = kl(), Be.DEFAULT_SCHEMA = Qi(), Be.load = n.load, Be.loadAll = n.loadAll, Be.dump = f.dump, Be.YAMLException = dr(), Be.types = {
    binary: Bl(),
    float: Ul(),
    map: Dl(),
    null: Fl(),
    pairs: jl(),
    set: Gl(),
    timestamp: ql(),
    bool: xl(),
    int: Ll(),
    merge: Ml(),
    omap: Hl(),
    seq: Pl(),
    str: Il()
  }, Be.safeLoad = h("safeLoad", "load"), Be.safeLoadAll = h("safeLoadAll", "loadAll"), Be.safeDump = h("safeDump", "dump"), Be;
}
var Gt = {}, Vo;
function qc() {
  if (Vo) return Gt;
  Vo = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.Lazy = void 0;
  class n {
    constructor(h) {
      this._value = null, this.creator = h;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const h = this.creator();
      return this.value = h, h;
    }
    set value(h) {
      this._value = h, this.creator = null;
    }
  }
  return Gt.Lazy = n, Gt;
}
var Dr = { exports: {} }, ei, Yo;
function qr() {
  if (Yo) return ei;
  Yo = 1;
  const n = "2.0.0", f = 256, h = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, d = 16, u = f - 6;
  return ei = {
    MAX_LENGTH: f,
    MAX_SAFE_COMPONENT_LENGTH: d,
    MAX_SAFE_BUILD_LENGTH: u,
    MAX_SAFE_INTEGER: h,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: n,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, ei;
}
var ti, zo;
function Mr() {
  return zo || (zo = 1, ti = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...f) => console.error("SEMVER", ...f) : () => {
  }), ti;
}
var Xo;
function hr() {
  return Xo || (Xo = 1, function(n, f) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: h,
      MAX_SAFE_BUILD_LENGTH: d,
      MAX_LENGTH: u
    } = qr(), s = Mr();
    f = n.exports = {};
    const a = f.re = [], c = f.safeRe = [], i = f.src = [], t = f.t = {};
    let l = 0;
    const o = "[a-zA-Z0-9-]", r = [
      ["\\s", 1],
      ["\\d", u],
      [o, d]
    ], p = (_) => {
      for (const [m, w] of r)
        _ = _.split(`${m}*`).join(`${m}{0,${w}}`).split(`${m}+`).join(`${m}{1,${w}}`);
      return _;
    }, g = (_, m, w) => {
      const R = p(m), O = l++;
      s(_, O, m), t[_] = O, i[O] = m, a[O] = new RegExp(m, w ? "g" : void 0), c[O] = new RegExp(R, w ? "g" : void 0);
    };
    g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${o}*`), g("MAINVERSION", `(${i[t.NUMERICIDENTIFIER]})\\.(${i[t.NUMERICIDENTIFIER]})\\.(${i[t.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${i[t.NUMERICIDENTIFIERLOOSE]})\\.(${i[t.NUMERICIDENTIFIERLOOSE]})\\.(${i[t.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${i[t.NUMERICIDENTIFIER]}|${i[t.NONNUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${i[t.NUMERICIDENTIFIERLOOSE]}|${i[t.NONNUMERICIDENTIFIER]})`), g("PRERELEASE", `(?:-(${i[t.PRERELEASEIDENTIFIER]}(?:\\.${i[t.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${i[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[t.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${o}+`), g("BUILD", `(?:\\+(${i[t.BUILDIDENTIFIER]}(?:\\.${i[t.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${i[t.MAINVERSION]}${i[t.PRERELEASE]}?${i[t.BUILD]}?`), g("FULL", `^${i[t.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${i[t.MAINVERSIONLOOSE]}${i[t.PRERELEASELOOSE]}?${i[t.BUILD]}?`), g("LOOSE", `^${i[t.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${i[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${i[t.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${i[t.XRANGEIDENTIFIER]})(?:\\.(${i[t.XRANGEIDENTIFIER]})(?:\\.(${i[t.XRANGEIDENTIFIER]})(?:${i[t.PRERELEASE]})?${i[t.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${i[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[t.XRANGEIDENTIFIERLOOSE]})(?:${i[t.PRERELEASELOOSE]})?${i[t.BUILD]}?)?)?`), g("XRANGE", `^${i[t.GTLT]}\\s*${i[t.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${i[t.GTLT]}\\s*${i[t.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${h}})(?:\\.(\\d{1,${h}}))?(?:\\.(\\d{1,${h}}))?`), g("COERCE", `${i[t.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", i[t.COERCEPLAIN] + `(?:${i[t.PRERELEASE]})?(?:${i[t.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", i[t.COERCE], !0), g("COERCERTLFULL", i[t.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${i[t.LONETILDE]}\\s+`, !0), f.tildeTrimReplace = "$1~", g("TILDE", `^${i[t.LONETILDE]}${i[t.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${i[t.LONETILDE]}${i[t.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${i[t.LONECARET]}\\s+`, !0), f.caretTrimReplace = "$1^", g("CARET", `^${i[t.LONECARET]}${i[t.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${i[t.LONECARET]}${i[t.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${i[t.GTLT]}\\s*(${i[t.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${i[t.GTLT]}\\s*(${i[t.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${i[t.GTLT]}\\s*(${i[t.LOOSEPLAIN]}|${i[t.XRANGEPLAIN]})`, !0), f.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${i[t.XRANGEPLAIN]})\\s+-\\s+(${i[t.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${i[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[t.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(Dr, Dr.exports)), Dr.exports;
}
var ri, Ko;
function ea() {
  if (Ko) return ri;
  Ko = 1;
  const n = Object.freeze({ loose: !0 }), f = Object.freeze({});
  return ri = (d) => d ? typeof d != "object" ? n : d : f, ri;
}
var ni, Jo;
function Wl() {
  if (Jo) return ni;
  Jo = 1;
  const n = /^[0-9]+$/, f = (d, u) => {
    const s = n.test(d), a = n.test(u);
    return s && a && (d = +d, u = +u), d === u ? 0 : s && !a ? -1 : a && !s ? 1 : d < u ? -1 : 1;
  };
  return ni = {
    compareIdentifiers: f,
    rcompareIdentifiers: (d, u) => f(u, d)
  }, ni;
}
var ii, Qo;
function je() {
  if (Qo) return ii;
  Qo = 1;
  const n = Mr(), { MAX_LENGTH: f, MAX_SAFE_INTEGER: h } = qr(), { safeRe: d, t: u } = hr(), s = ea(), { compareIdentifiers: a } = Wl();
  class c {
    constructor(t, l) {
      if (l = s(l), t instanceof c) {
        if (t.loose === !!l.loose && t.includePrerelease === !!l.includePrerelease)
          return t;
        t = t.version;
      } else if (typeof t != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
      if (t.length > f)
        throw new TypeError(
          `version is longer than ${f} characters`
        );
      n("SemVer", t, l), this.options = l, this.loose = !!l.loose, this.includePrerelease = !!l.includePrerelease;
      const o = t.trim().match(l.loose ? d[u.LOOSE] : d[u.FULL]);
      if (!o)
        throw new TypeError(`Invalid Version: ${t}`);
      if (this.raw = t, this.major = +o[1], this.minor = +o[2], this.patch = +o[3], this.major > h || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > h || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > h || this.patch < 0)
        throw new TypeError("Invalid patch version");
      o[4] ? this.prerelease = o[4].split(".").map((r) => {
        if (/^[0-9]+$/.test(r)) {
          const p = +r;
          if (p >= 0 && p < h)
            return p;
        }
        return r;
      }) : this.prerelease = [], this.build = o[5] ? o[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(t) {
      if (n("SemVer.compare", this.version, this.options, t), !(t instanceof c)) {
        if (typeof t == "string" && t === this.version)
          return 0;
        t = new c(t, this.options);
      }
      return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
    }
    compareMain(t) {
      return t instanceof c || (t = new c(t, this.options)), a(this.major, t.major) || a(this.minor, t.minor) || a(this.patch, t.patch);
    }
    comparePre(t) {
      if (t instanceof c || (t = new c(t, this.options)), this.prerelease.length && !t.prerelease.length)
        return -1;
      if (!this.prerelease.length && t.prerelease.length)
        return 1;
      if (!this.prerelease.length && !t.prerelease.length)
        return 0;
      let l = 0;
      do {
        const o = this.prerelease[l], r = t.prerelease[l];
        if (n("prerelease compare", l, o, r), o === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (o === void 0)
          return -1;
        if (o === r)
          continue;
        return a(o, r);
      } while (++l);
    }
    compareBuild(t) {
      t instanceof c || (t = new c(t, this.options));
      let l = 0;
      do {
        const o = this.build[l], r = t.build[l];
        if (n("build compare", l, o, r), o === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (o === void 0)
          return -1;
        if (o === r)
          continue;
        return a(o, r);
      } while (++l);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(t, l, o) {
      switch (t) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", l, o);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", l, o);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", l, o), this.inc("pre", l, o);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", l, o), this.inc("pre", l, o);
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const r = Number(o) ? 1 : 0;
          if (!l && o === !1)
            throw new Error("invalid increment argument: identifier is empty");
          if (this.prerelease.length === 0)
            this.prerelease = [r];
          else {
            let p = this.prerelease.length;
            for (; --p >= 0; )
              typeof this.prerelease[p] == "number" && (this.prerelease[p]++, p = -2);
            if (p === -1) {
              if (l === this.prerelease.join(".") && o === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(r);
            }
          }
          if (l) {
            let p = [l, r];
            o === !1 && (p = [l]), a(this.prerelease[0], l) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = p) : this.prerelease = p;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${t}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return ii = c, ii;
}
var ai, Zo;
function Ut() {
  if (Zo) return ai;
  Zo = 1;
  const n = je();
  return ai = (h, d, u = !1) => {
    if (h instanceof n)
      return h;
    try {
      return new n(h, d);
    } catch (s) {
      if (!u)
        return null;
      throw s;
    }
  }, ai;
}
var oi, es;
function Mc() {
  if (es) return oi;
  es = 1;
  const n = Ut();
  return oi = (h, d) => {
    const u = n(h, d);
    return u ? u.version : null;
  }, oi;
}
var si, ts;
function Bc() {
  if (ts) return si;
  ts = 1;
  const n = Ut();
  return si = (h, d) => {
    const u = n(h.trim().replace(/^[=v]+/, ""), d);
    return u ? u.version : null;
  }, si;
}
var li, rs;
function Hc() {
  if (rs) return li;
  rs = 1;
  const n = je();
  return li = (h, d, u, s, a) => {
    typeof u == "string" && (a = s, s = u, u = void 0);
    try {
      return new n(
        h instanceof n ? h.version : h,
        u
      ).inc(d, s, a).version;
    } catch {
      return null;
    }
  }, li;
}
var ui, ns;
function jc() {
  if (ns) return ui;
  ns = 1;
  const n = Ut();
  return ui = (h, d) => {
    const u = n(h, null, !0), s = n(d, null, !0), a = u.compare(s);
    if (a === 0)
      return null;
    const c = a > 0, i = c ? u : s, t = c ? s : u, l = !!i.prerelease.length;
    if (!!t.prerelease.length && !l)
      return !t.patch && !t.minor ? "major" : i.patch ? "patch" : i.minor ? "minor" : "major";
    const r = l ? "pre" : "";
    return u.major !== s.major ? r + "major" : u.minor !== s.minor ? r + "minor" : u.patch !== s.patch ? r + "patch" : "prerelease";
  }, ui;
}
var ci, is;
function Gc() {
  if (is) return ci;
  is = 1;
  const n = je();
  return ci = (h, d) => new n(h, d).major, ci;
}
var fi, as;
function Wc() {
  if (as) return fi;
  as = 1;
  const n = je();
  return fi = (h, d) => new n(h, d).minor, fi;
}
var di, os;
function Vc() {
  if (os) return di;
  os = 1;
  const n = je();
  return di = (h, d) => new n(h, d).patch, di;
}
var hi, ss;
function Yc() {
  if (ss) return hi;
  ss = 1;
  const n = Ut();
  return hi = (h, d) => {
    const u = n(h, d);
    return u && u.prerelease.length ? u.prerelease : null;
  }, hi;
}
var pi, ls;
function Ze() {
  if (ls) return pi;
  ls = 1;
  const n = je();
  return pi = (h, d, u) => new n(h, u).compare(new n(d, u)), pi;
}
var mi, us;
function zc() {
  if (us) return mi;
  us = 1;
  const n = Ze();
  return mi = (h, d, u) => n(d, h, u), mi;
}
var gi, cs;
function Xc() {
  if (cs) return gi;
  cs = 1;
  const n = Ze();
  return gi = (h, d) => n(h, d, !0), gi;
}
var vi, fs;
function ta() {
  if (fs) return vi;
  fs = 1;
  const n = je();
  return vi = (h, d, u) => {
    const s = new n(h, u), a = new n(d, u);
    return s.compare(a) || s.compareBuild(a);
  }, vi;
}
var Ei, ds;
function Kc() {
  if (ds) return Ei;
  ds = 1;
  const n = ta();
  return Ei = (h, d) => h.sort((u, s) => n(u, s, d)), Ei;
}
var yi, hs;
function Jc() {
  if (hs) return yi;
  hs = 1;
  const n = ta();
  return yi = (h, d) => h.sort((u, s) => n(s, u, d)), yi;
}
var wi, ps;
function Br() {
  if (ps) return wi;
  ps = 1;
  const n = Ze();
  return wi = (h, d, u) => n(h, d, u) > 0, wi;
}
var _i, ms;
function ra() {
  if (ms) return _i;
  ms = 1;
  const n = Ze();
  return _i = (h, d, u) => n(h, d, u) < 0, _i;
}
var Si, gs;
function Vl() {
  if (gs) return Si;
  gs = 1;
  const n = Ze();
  return Si = (h, d, u) => n(h, d, u) === 0, Si;
}
var Ai, vs;
function Yl() {
  if (vs) return Ai;
  vs = 1;
  const n = Ze();
  return Ai = (h, d, u) => n(h, d, u) !== 0, Ai;
}
var Ti, Es;
function na() {
  if (Es) return Ti;
  Es = 1;
  const n = Ze();
  return Ti = (h, d, u) => n(h, d, u) >= 0, Ti;
}
var Ri, ys;
function ia() {
  if (ys) return Ri;
  ys = 1;
  const n = Ze();
  return Ri = (h, d, u) => n(h, d, u) <= 0, Ri;
}
var Ci, ws;
function zl() {
  if (ws) return Ci;
  ws = 1;
  const n = Vl(), f = Yl(), h = Br(), d = na(), u = ra(), s = ia();
  return Ci = (c, i, t, l) => {
    switch (i) {
      case "===":
        return typeof c == "object" && (c = c.version), typeof t == "object" && (t = t.version), c === t;
      case "!==":
        return typeof c == "object" && (c = c.version), typeof t == "object" && (t = t.version), c !== t;
      case "":
      case "=":
      case "==":
        return n(c, t, l);
      case "!=":
        return f(c, t, l);
      case ">":
        return h(c, t, l);
      case ">=":
        return d(c, t, l);
      case "<":
        return u(c, t, l);
      case "<=":
        return s(c, t, l);
      default:
        throw new TypeError(`Invalid operator: ${i}`);
    }
  }, Ci;
}
var bi, _s;
function Qc() {
  if (_s) return bi;
  _s = 1;
  const n = je(), f = Ut(), { safeRe: h, t: d } = hr();
  return bi = (s, a) => {
    if (s instanceof n)
      return s;
    if (typeof s == "number" && (s = String(s)), typeof s != "string")
      return null;
    a = a || {};
    let c = null;
    if (!a.rtl)
      c = s.match(a.includePrerelease ? h[d.COERCEFULL] : h[d.COERCE]);
    else {
      const p = a.includePrerelease ? h[d.COERCERTLFULL] : h[d.COERCERTL];
      let g;
      for (; (g = p.exec(s)) && (!c || c.index + c[0].length !== s.length); )
        (!c || g.index + g[0].length !== c.index + c[0].length) && (c = g), p.lastIndex = g.index + g[1].length + g[2].length;
      p.lastIndex = -1;
    }
    if (c === null)
      return null;
    const i = c[2], t = c[3] || "0", l = c[4] || "0", o = a.includePrerelease && c[5] ? `-${c[5]}` : "", r = a.includePrerelease && c[6] ? `+${c[6]}` : "";
    return f(`${i}.${t}.${l}${o}${r}`, a);
  }, bi;
}
var Oi, Ss;
function Zc() {
  if (Ss) return Oi;
  Ss = 1;
  class n {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(h) {
      const d = this.map.get(h);
      if (d !== void 0)
        return this.map.delete(h), this.map.set(h, d), d;
    }
    delete(h) {
      return this.map.delete(h);
    }
    set(h, d) {
      if (!this.delete(h) && d !== void 0) {
        if (this.map.size >= this.max) {
          const s = this.map.keys().next().value;
          this.delete(s);
        }
        this.map.set(h, d);
      }
      return this;
    }
  }
  return Oi = n, Oi;
}
var Ii, As;
function et() {
  if (As) return Ii;
  As = 1;
  const n = /\s+/g;
  class f {
    constructor(P, F) {
      if (F = u(F), P instanceof f)
        return P.loose === !!F.loose && P.includePrerelease === !!F.includePrerelease ? P : new f(P.raw, F);
      if (P instanceof s)
        return this.raw = P.value, this.set = [[P]], this.formatted = void 0, this;
      if (this.options = F, this.loose = !!F.loose, this.includePrerelease = !!F.includePrerelease, this.raw = P.trim().replace(n, " "), this.set = this.raw.split("||").map(($) => this.parseRange($.trim())).filter(($) => $.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const $ = this.set[0];
        if (this.set = this.set.filter((J) => !_(J[0])), this.set.length === 0)
          this.set = [$];
        else if (this.set.length > 1) {
          for (const J of this.set)
            if (J.length === 1 && m(J[0])) {
              this.set = [J];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let P = 0; P < this.set.length; P++) {
          P > 0 && (this.formatted += "||");
          const F = this.set[P];
          for (let $ = 0; $ < F.length; $++)
            $ > 0 && (this.formatted += " "), this.formatted += F[$].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(P) {
      const $ = ((this.options.includePrerelease && p) | (this.options.loose && g)) + ":" + P, J = d.get($);
      if (J)
        return J;
      const W = this.options.loose, ne = W ? i[t.HYPHENRANGELOOSE] : i[t.HYPHENRANGE];
      P = P.replace(ne, L(this.options.includePrerelease)), a("hyphen replace", P), P = P.replace(i[t.COMPARATORTRIM], l), a("comparator trim", P), P = P.replace(i[t.TILDETRIM], o), a("tilde trim", P), P = P.replace(i[t.CARETTRIM], r), a("caret trim", P);
      let ce = P.split(" ").map((K) => R(K, this.options)).join(" ").split(/\s+/).map((K) => U(K, this.options));
      W && (ce = ce.filter((K) => (a("loose invalid filter", K, this.options), !!K.match(i[t.COMPARATORLOOSE])))), a("range list", ce);
      const ue = /* @__PURE__ */ new Map(), ie = ce.map((K) => new s(K, this.options));
      for (const K of ie) {
        if (_(K))
          return [K];
        ue.set(K.value, K);
      }
      ue.size > 1 && ue.has("") && ue.delete("");
      const Ae = [...ue.values()];
      return d.set($, Ae), Ae;
    }
    intersects(P, F) {
      if (!(P instanceof f))
        throw new TypeError("a Range is required");
      return this.set.some(($) => w($, F) && P.set.some((J) => w(J, F) && $.every((W) => J.every((ne) => W.intersects(ne, F)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(P) {
      if (!P)
        return !1;
      if (typeof P == "string")
        try {
          P = new c(P, this.options);
        } catch {
          return !1;
        }
      for (let F = 0; F < this.set.length; F++)
        if (k(this.set[F], P, this.options))
          return !0;
      return !1;
    }
  }
  Ii = f;
  const h = Zc(), d = new h(), u = ea(), s = Hr(), a = Mr(), c = je(), {
    safeRe: i,
    t,
    comparatorTrimReplace: l,
    tildeTrimReplace: o,
    caretTrimReplace: r
  } = hr(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: g } = qr(), _ = (D) => D.value === "<0.0.0-0", m = (D) => D.value === "", w = (D, P) => {
    let F = !0;
    const $ = D.slice();
    let J = $.pop();
    for (; F && $.length; )
      F = $.every((W) => J.intersects(W, P)), J = $.pop();
    return F;
  }, R = (D, P) => (a("comp", D, P), D = C(D, P), a("caret", D), D = I(D, P), a("tildes", D), D = T(D, P), a("xrange", D), D = q(D, P), a("stars", D), D), O = (D) => !D || D.toLowerCase() === "x" || D === "*", I = (D, P) => D.trim().split(/\s+/).map((F) => M(F, P)).join(" "), M = (D, P) => {
    const F = P.loose ? i[t.TILDELOOSE] : i[t.TILDE];
    return D.replace(F, ($, J, W, ne, ce) => {
      a("tilde", D, $, J, W, ne, ce);
      let ue;
      return O(J) ? ue = "" : O(W) ? ue = `>=${J}.0.0 <${+J + 1}.0.0-0` : O(ne) ? ue = `>=${J}.${W}.0 <${J}.${+W + 1}.0-0` : ce ? (a("replaceTilde pr", ce), ue = `>=${J}.${W}.${ne}-${ce} <${J}.${+W + 1}.0-0`) : ue = `>=${J}.${W}.${ne} <${J}.${+W + 1}.0-0`, a("tilde return", ue), ue;
    });
  }, C = (D, P) => D.trim().split(/\s+/).map((F) => A(F, P)).join(" "), A = (D, P) => {
    a("caret", D, P);
    const F = P.loose ? i[t.CARETLOOSE] : i[t.CARET], $ = P.includePrerelease ? "-0" : "";
    return D.replace(F, (J, W, ne, ce, ue) => {
      a("caret", D, J, W, ne, ce, ue);
      let ie;
      return O(W) ? ie = "" : O(ne) ? ie = `>=${W}.0.0${$} <${+W + 1}.0.0-0` : O(ce) ? W === "0" ? ie = `>=${W}.${ne}.0${$} <${W}.${+ne + 1}.0-0` : ie = `>=${W}.${ne}.0${$} <${+W + 1}.0.0-0` : ue ? (a("replaceCaret pr", ue), W === "0" ? ne === "0" ? ie = `>=${W}.${ne}.${ce}-${ue} <${W}.${ne}.${+ce + 1}-0` : ie = `>=${W}.${ne}.${ce}-${ue} <${W}.${+ne + 1}.0-0` : ie = `>=${W}.${ne}.${ce}-${ue} <${+W + 1}.0.0-0`) : (a("no pr"), W === "0" ? ne === "0" ? ie = `>=${W}.${ne}.${ce}${$} <${W}.${ne}.${+ce + 1}-0` : ie = `>=${W}.${ne}.${ce}${$} <${W}.${+ne + 1}.0-0` : ie = `>=${W}.${ne}.${ce} <${+W + 1}.0.0-0`), a("caret return", ie), ie;
    });
  }, T = (D, P) => (a("replaceXRanges", D, P), D.split(/\s+/).map((F) => E(F, P)).join(" ")), E = (D, P) => {
    D = D.trim();
    const F = P.loose ? i[t.XRANGELOOSE] : i[t.XRANGE];
    return D.replace(F, ($, J, W, ne, ce, ue) => {
      a("xRange", D, $, J, W, ne, ce, ue);
      const ie = O(W), Ae = ie || O(ne), K = Ae || O(ce), Ee = K;
      return J === "=" && Ee && (J = ""), ue = P.includePrerelease ? "-0" : "", ie ? J === ">" || J === "<" ? $ = "<0.0.0-0" : $ = "*" : J && Ee ? (Ae && (ne = 0), ce = 0, J === ">" ? (J = ">=", Ae ? (W = +W + 1, ne = 0, ce = 0) : (ne = +ne + 1, ce = 0)) : J === "<=" && (J = "<", Ae ? W = +W + 1 : ne = +ne + 1), J === "<" && (ue = "-0"), $ = `${J + W}.${ne}.${ce}${ue}`) : Ae ? $ = `>=${W}.0.0${ue} <${+W + 1}.0.0-0` : K && ($ = `>=${W}.${ne}.0${ue} <${W}.${+ne + 1}.0-0`), a("xRange return", $), $;
    });
  }, q = (D, P) => (a("replaceStars", D, P), D.trim().replace(i[t.STAR], "")), U = (D, P) => (a("replaceGTE0", D, P), D.trim().replace(i[P.includePrerelease ? t.GTE0PRE : t.GTE0], "")), L = (D) => (P, F, $, J, W, ne, ce, ue, ie, Ae, K, Ee) => (O($) ? F = "" : O(J) ? F = `>=${$}.0.0${D ? "-0" : ""}` : O(W) ? F = `>=${$}.${J}.0${D ? "-0" : ""}` : ne ? F = `>=${F}` : F = `>=${F}${D ? "-0" : ""}`, O(ie) ? ue = "" : O(Ae) ? ue = `<${+ie + 1}.0.0-0` : O(K) ? ue = `<${ie}.${+Ae + 1}.0-0` : Ee ? ue = `<=${ie}.${Ae}.${K}-${Ee}` : D ? ue = `<${ie}.${Ae}.${+K + 1}-0` : ue = `<=${ue}`, `${F} ${ue}`.trim()), k = (D, P, F) => {
    for (let $ = 0; $ < D.length; $++)
      if (!D[$].test(P))
        return !1;
    if (P.prerelease.length && !F.includePrerelease) {
      for (let $ = 0; $ < D.length; $++)
        if (a(D[$].semver), D[$].semver !== s.ANY && D[$].semver.prerelease.length > 0) {
          const J = D[$].semver;
          if (J.major === P.major && J.minor === P.minor && J.patch === P.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ii;
}
var Pi, Ts;
function Hr() {
  if (Ts) return Pi;
  Ts = 1;
  const n = Symbol("SemVer ANY");
  class f {
    static get ANY() {
      return n;
    }
    constructor(l, o) {
      if (o = h(o), l instanceof f) {
        if (l.loose === !!o.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), a("comparator", l, o), this.options = o, this.loose = !!o.loose, this.parse(l), this.semver === n ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(l) {
      const o = this.options.loose ? d[u.COMPARATORLOOSE] : d[u.COMPARATOR], r = l.match(o);
      if (!r)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = r[1] !== void 0 ? r[1] : "", this.operator === "=" && (this.operator = ""), r[2] ? this.semver = new c(r[2], this.options.loose) : this.semver = n;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (a("Comparator.test", l, this.options.loose), this.semver === n || l === n)
        return !0;
      if (typeof l == "string")
        try {
          l = new c(l, this.options);
        } catch {
          return !1;
        }
      return s(l, this.operator, this.semver, this.options);
    }
    intersects(l, o) {
      if (!(l instanceof f))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new i(l.value, o).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new i(this.value, o).test(l.semver) : (o = h(o), o.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !o.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || s(this.semver, "<", l.semver, o) && this.operator.startsWith(">") && l.operator.startsWith("<") || s(this.semver, ">", l.semver, o) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Pi = f;
  const h = ea(), { safeRe: d, t: u } = hr(), s = zl(), a = Mr(), c = je(), i = et();
  return Pi;
}
var Di, Rs;
function jr() {
  if (Rs) return Di;
  Rs = 1;
  const n = et();
  return Di = (h, d, u) => {
    try {
      d = new n(d, u);
    } catch {
      return !1;
    }
    return d.test(h);
  }, Di;
}
var Ni, Cs;
function ef() {
  if (Cs) return Ni;
  Cs = 1;
  const n = et();
  return Ni = (h, d) => new n(h, d).set.map((u) => u.map((s) => s.value).join(" ").trim().split(" ")), Ni;
}
var Fi, bs;
function tf() {
  if (bs) return Fi;
  bs = 1;
  const n = je(), f = et();
  return Fi = (d, u, s) => {
    let a = null, c = null, i = null;
    try {
      i = new f(u, s);
    } catch {
      return null;
    }
    return d.forEach((t) => {
      i.test(t) && (!a || c.compare(t) === -1) && (a = t, c = new n(a, s));
    }), a;
  }, Fi;
}
var xi, Os;
function rf() {
  if (Os) return xi;
  Os = 1;
  const n = je(), f = et();
  return xi = (d, u, s) => {
    let a = null, c = null, i = null;
    try {
      i = new f(u, s);
    } catch {
      return null;
    }
    return d.forEach((t) => {
      i.test(t) && (!a || c.compare(t) === 1) && (a = t, c = new n(a, s));
    }), a;
  }, xi;
}
var Li, Is;
function nf() {
  if (Is) return Li;
  Is = 1;
  const n = je(), f = et(), h = Br();
  return Li = (u, s) => {
    u = new f(u, s);
    let a = new n("0.0.0");
    if (u.test(a) || (a = new n("0.0.0-0"), u.test(a)))
      return a;
    a = null;
    for (let c = 0; c < u.set.length; ++c) {
      const i = u.set[c];
      let t = null;
      i.forEach((l) => {
        const o = new n(l.semver.version);
        switch (l.operator) {
          case ">":
            o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
          /* fallthrough */
          case "":
          case ">=":
            (!t || h(o, t)) && (t = o);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${l.operator}`);
        }
      }), t && (!a || h(a, t)) && (a = t);
    }
    return a && u.test(a) ? a : null;
  }, Li;
}
var Ui, Ps;
function af() {
  if (Ps) return Ui;
  Ps = 1;
  const n = et();
  return Ui = (h, d) => {
    try {
      return new n(h, d).range || "*";
    } catch {
      return null;
    }
  }, Ui;
}
var $i, Ds;
function aa() {
  if (Ds) return $i;
  Ds = 1;
  const n = je(), f = Hr(), { ANY: h } = f, d = et(), u = jr(), s = Br(), a = ra(), c = ia(), i = na();
  return $i = (l, o, r, p) => {
    l = new n(l, p), o = new d(o, p);
    let g, _, m, w, R;
    switch (r) {
      case ">":
        g = s, _ = c, m = a, w = ">", R = ">=";
        break;
      case "<":
        g = a, _ = i, m = s, w = "<", R = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (u(l, o, p))
      return !1;
    for (let O = 0; O < o.set.length; ++O) {
      const I = o.set[O];
      let M = null, C = null;
      if (I.forEach((A) => {
        A.semver === h && (A = new f(">=0.0.0")), M = M || A, C = C || A, g(A.semver, M.semver, p) ? M = A : m(A.semver, C.semver, p) && (C = A);
      }), M.operator === w || M.operator === R || (!C.operator || C.operator === w) && _(l, C.semver))
        return !1;
      if (C.operator === R && m(l, C.semver))
        return !1;
    }
    return !0;
  }, $i;
}
var ki, Ns;
function of() {
  if (Ns) return ki;
  Ns = 1;
  const n = aa();
  return ki = (h, d, u) => n(h, d, ">", u), ki;
}
var qi, Fs;
function sf() {
  if (Fs) return qi;
  Fs = 1;
  const n = aa();
  return qi = (h, d, u) => n(h, d, "<", u), qi;
}
var Mi, xs;
function lf() {
  if (xs) return Mi;
  xs = 1;
  const n = et();
  return Mi = (h, d, u) => (h = new n(h, u), d = new n(d, u), h.intersects(d, u)), Mi;
}
var Bi, Ls;
function uf() {
  if (Ls) return Bi;
  Ls = 1;
  const n = jr(), f = Ze();
  return Bi = (h, d, u) => {
    const s = [];
    let a = null, c = null;
    const i = h.sort((r, p) => f(r, p, u));
    for (const r of i)
      n(r, d, u) ? (c = r, a || (a = r)) : (c && s.push([a, c]), c = null, a = null);
    a && s.push([a, null]);
    const t = [];
    for (const [r, p] of s)
      r === p ? t.push(r) : !p && r === i[0] ? t.push("*") : p ? r === i[0] ? t.push(`<=${p}`) : t.push(`${r} - ${p}`) : t.push(`>=${r}`);
    const l = t.join(" || "), o = typeof d.raw == "string" ? d.raw : String(d);
    return l.length < o.length ? l : d;
  }, Bi;
}
var Hi, Us;
function cf() {
  if (Us) return Hi;
  Us = 1;
  const n = et(), f = Hr(), { ANY: h } = f, d = jr(), u = Ze(), s = (o, r, p = {}) => {
    if (o === r)
      return !0;
    o = new n(o, p), r = new n(r, p);
    let g = !1;
    e: for (const _ of o.set) {
      for (const m of r.set) {
        const w = i(_, m, p);
        if (g = g || w !== null, w)
          continue e;
      }
      if (g)
        return !1;
    }
    return !0;
  }, a = [new f(">=0.0.0-0")], c = [new f(">=0.0.0")], i = (o, r, p) => {
    if (o === r)
      return !0;
    if (o.length === 1 && o[0].semver === h) {
      if (r.length === 1 && r[0].semver === h)
        return !0;
      p.includePrerelease ? o = a : o = c;
    }
    if (r.length === 1 && r[0].semver === h) {
      if (p.includePrerelease)
        return !0;
      r = c;
    }
    const g = /* @__PURE__ */ new Set();
    let _, m;
    for (const T of o)
      T.operator === ">" || T.operator === ">=" ? _ = t(_, T, p) : T.operator === "<" || T.operator === "<=" ? m = l(m, T, p) : g.add(T.semver);
    if (g.size > 1)
      return null;
    let w;
    if (_ && m) {
      if (w = u(_.semver, m.semver, p), w > 0)
        return null;
      if (w === 0 && (_.operator !== ">=" || m.operator !== "<="))
        return null;
    }
    for (const T of g) {
      if (_ && !d(T, String(_), p) || m && !d(T, String(m), p))
        return null;
      for (const E of r)
        if (!d(T, String(E), p))
          return !1;
      return !0;
    }
    let R, O, I, M, C = m && !p.includePrerelease && m.semver.prerelease.length ? m.semver : !1, A = _ && !p.includePrerelease && _.semver.prerelease.length ? _.semver : !1;
    C && C.prerelease.length === 1 && m.operator === "<" && C.prerelease[0] === 0 && (C = !1);
    for (const T of r) {
      if (M = M || T.operator === ">" || T.operator === ">=", I = I || T.operator === "<" || T.operator === "<=", _) {
        if (A && T.semver.prerelease && T.semver.prerelease.length && T.semver.major === A.major && T.semver.minor === A.minor && T.semver.patch === A.patch && (A = !1), T.operator === ">" || T.operator === ">=") {
          if (R = t(_, T, p), R === T && R !== _)
            return !1;
        } else if (_.operator === ">=" && !d(_.semver, String(T), p))
          return !1;
      }
      if (m) {
        if (C && T.semver.prerelease && T.semver.prerelease.length && T.semver.major === C.major && T.semver.minor === C.minor && T.semver.patch === C.patch && (C = !1), T.operator === "<" || T.operator === "<=") {
          if (O = l(m, T, p), O === T && O !== m)
            return !1;
        } else if (m.operator === "<=" && !d(m.semver, String(T), p))
          return !1;
      }
      if (!T.operator && (m || _) && w !== 0)
        return !1;
    }
    return !(_ && I && !m && w !== 0 || m && M && !_ && w !== 0 || A || C);
  }, t = (o, r, p) => {
    if (!o)
      return r;
    const g = u(o.semver, r.semver, p);
    return g > 0 ? o : g < 0 || r.operator === ">" && o.operator === ">=" ? r : o;
  }, l = (o, r, p) => {
    if (!o)
      return r;
    const g = u(o.semver, r.semver, p);
    return g < 0 ? o : g > 0 || r.operator === "<" && o.operator === "<=" ? r : o;
  };
  return Hi = s, Hi;
}
var ji, $s;
function Xl() {
  if ($s) return ji;
  $s = 1;
  const n = hr(), f = qr(), h = je(), d = Wl(), u = Ut(), s = Mc(), a = Bc(), c = Hc(), i = jc(), t = Gc(), l = Wc(), o = Vc(), r = Yc(), p = Ze(), g = zc(), _ = Xc(), m = ta(), w = Kc(), R = Jc(), O = Br(), I = ra(), M = Vl(), C = Yl(), A = na(), T = ia(), E = zl(), q = Qc(), U = Hr(), L = et(), k = jr(), D = ef(), P = tf(), F = rf(), $ = nf(), J = af(), W = aa(), ne = of(), ce = sf(), ue = lf(), ie = uf(), Ae = cf();
  return ji = {
    parse: u,
    valid: s,
    clean: a,
    inc: c,
    diff: i,
    major: t,
    minor: l,
    patch: o,
    prerelease: r,
    compare: p,
    rcompare: g,
    compareLoose: _,
    compareBuild: m,
    sort: w,
    rsort: R,
    gt: O,
    lt: I,
    eq: M,
    neq: C,
    gte: A,
    lte: T,
    cmp: E,
    coerce: q,
    Comparator: U,
    Range: L,
    satisfies: k,
    toComparators: D,
    maxSatisfying: P,
    minSatisfying: F,
    minVersion: $,
    validRange: J,
    outside: W,
    gtr: ne,
    ltr: ce,
    intersects: ue,
    simplifyRange: ie,
    subset: Ae,
    SemVer: h,
    re: n.re,
    src: n.src,
    tokens: n.t,
    SEMVER_SPEC_VERSION: f.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: f.RELEASE_TYPES,
    compareIdentifiers: d.compareIdentifiers,
    rcompareIdentifiers: d.rcompareIdentifiers
  }, ji;
}
var Pt = {}, sr = { exports: {} };
sr.exports;
var ks;
function ff() {
  return ks || (ks = 1, function(n, f) {
    var h = 200, d = "__lodash_hash_undefined__", u = 1, s = 2, a = 9007199254740991, c = "[object Arguments]", i = "[object Array]", t = "[object AsyncFunction]", l = "[object Boolean]", o = "[object Date]", r = "[object Error]", p = "[object Function]", g = "[object GeneratorFunction]", _ = "[object Map]", m = "[object Number]", w = "[object Null]", R = "[object Object]", O = "[object Promise]", I = "[object Proxy]", M = "[object RegExp]", C = "[object Set]", A = "[object String]", T = "[object Symbol]", E = "[object Undefined]", q = "[object WeakMap]", U = "[object ArrayBuffer]", L = "[object DataView]", k = "[object Float32Array]", D = "[object Float64Array]", P = "[object Int8Array]", F = "[object Int16Array]", $ = "[object Int32Array]", J = "[object Uint8Array]", W = "[object Uint8ClampedArray]", ne = "[object Uint16Array]", ce = "[object Uint32Array]", ue = /[\\^$.*+?()[\]{}|]/g, ie = /^\[object .+?Constructor\]$/, Ae = /^(?:0|[1-9]\d*)$/, K = {};
    K[k] = K[D] = K[P] = K[F] = K[$] = K[J] = K[W] = K[ne] = K[ce] = !0, K[c] = K[i] = K[U] = K[l] = K[L] = K[o] = K[r] = K[p] = K[_] = K[m] = K[R] = K[M] = K[C] = K[A] = K[q] = !1;
    var Ee = typeof Qe == "object" && Qe && Qe.Object === Object && Qe, S = typeof self == "object" && self && self.Object === Object && self, v = Ee || S || Function("return this")(), H = f && !f.nodeType && f, N = H && !0 && n && !n.nodeType && n, le = N && N.exports === H, me = le && Ee.process, pe = function() {
      try {
        return me && me.binding && me.binding("util");
      } catch {
      }
    }(), _e = pe && pe.isTypedArray;
    function ye(b, x) {
      for (var z = -1, se = b == null ? 0 : b.length, Ie = 0, Se = []; ++z < se; ) {
        var Ne = b[z];
        x(Ne, z, b) && (Se[Ie++] = Ne);
      }
      return Se;
    }
    function Fe(b, x) {
      for (var z = -1, se = x.length, Ie = b.length; ++z < se; )
        b[Ie + z] = x[z];
      return b;
    }
    function Ce(b, x) {
      for (var z = -1, se = b == null ? 0 : b.length; ++z < se; )
        if (x(b[z], z, b))
          return !0;
      return !1;
    }
    function ke(b, x) {
      for (var z = -1, se = Array(b); ++z < b; )
        se[z] = x(z);
      return se;
    }
    function pt(b) {
      return function(x) {
        return b(x);
      };
    }
    function nt(b, x) {
      return b.has(x);
    }
    function e(b, x) {
      return b == null ? void 0 : b[x];
    }
    function B(b) {
      var x = -1, z = Array(b.size);
      return b.forEach(function(se, Ie) {
        z[++x] = [Ie, se];
      }), z;
    }
    function G(b, x) {
      return function(z) {
        return b(x(z));
      };
    }
    function re(b) {
      var x = -1, z = Array(b.size);
      return b.forEach(function(se) {
        z[++x] = se;
      }), z;
    }
    var V = Array.prototype, te = Function.prototype, Z = Object.prototype, ae = v["__core-js_shared__"], ge = te.toString, ve = Z.hasOwnProperty, Te = function() {
      var b = /[^.]+$/.exec(ae && ae.keys && ae.keys.IE_PROTO || "");
      return b ? "Symbol(src)_1." + b : "";
    }(), de = Z.toString, xe = RegExp(
      "^" + ge.call(ve).replace(ue, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), y = le ? v.Buffer : void 0, j = v.Symbol, X = v.Uint8Array, Y = Z.propertyIsEnumerable, Q = V.splice, ee = j ? j.toStringTag : void 0, fe = Object.getOwnPropertySymbols, oe = y ? y.isBuffer : void 0, he = G(Object.keys, Object), we = Ot(v, "DataView"), Oe = Ot(v, "Map"), De = Ot(v, "Promise"), Re = Ot(v, "Set"), bt = Ot(v, "WeakMap"), Ke = Ot(Object, "create"), mt = Et(we), ru = Et(Oe), nu = Et(De), iu = Et(Re), au = Et(bt), ua = j ? j.prototype : void 0, Gr = ua ? ua.valueOf : void 0;
    function gt(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++x < z; ) {
        var se = b[x];
        this.set(se[0], se[1]);
      }
    }
    function ou() {
      this.__data__ = Ke ? Ke(null) : {}, this.size = 0;
    }
    function su(b) {
      var x = this.has(b) && delete this.__data__[b];
      return this.size -= x ? 1 : 0, x;
    }
    function lu(b) {
      var x = this.__data__;
      if (Ke) {
        var z = x[b];
        return z === d ? void 0 : z;
      }
      return ve.call(x, b) ? x[b] : void 0;
    }
    function uu(b) {
      var x = this.__data__;
      return Ke ? x[b] !== void 0 : ve.call(x, b);
    }
    function cu(b, x) {
      var z = this.__data__;
      return this.size += this.has(b) ? 0 : 1, z[b] = Ke && x === void 0 ? d : x, this;
    }
    gt.prototype.clear = ou, gt.prototype.delete = su, gt.prototype.get = lu, gt.prototype.has = uu, gt.prototype.set = cu;
    function it(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++x < z; ) {
        var se = b[x];
        this.set(se[0], se[1]);
      }
    }
    function fu() {
      this.__data__ = [], this.size = 0;
    }
    function du(b) {
      var x = this.__data__, z = gr(x, b);
      if (z < 0)
        return !1;
      var se = x.length - 1;
      return z == se ? x.pop() : Q.call(x, z, 1), --this.size, !0;
    }
    function hu(b) {
      var x = this.__data__, z = gr(x, b);
      return z < 0 ? void 0 : x[z][1];
    }
    function pu(b) {
      return gr(this.__data__, b) > -1;
    }
    function mu(b, x) {
      var z = this.__data__, se = gr(z, b);
      return se < 0 ? (++this.size, z.push([b, x])) : z[se][1] = x, this;
    }
    it.prototype.clear = fu, it.prototype.delete = du, it.prototype.get = hu, it.prototype.has = pu, it.prototype.set = mu;
    function vt(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++x < z; ) {
        var se = b[x];
        this.set(se[0], se[1]);
      }
    }
    function gu() {
      this.size = 0, this.__data__ = {
        hash: new gt(),
        map: new (Oe || it)(),
        string: new gt()
      };
    }
    function vu(b) {
      var x = vr(this, b).delete(b);
      return this.size -= x ? 1 : 0, x;
    }
    function Eu(b) {
      return vr(this, b).get(b);
    }
    function yu(b) {
      return vr(this, b).has(b);
    }
    function wu(b, x) {
      var z = vr(this, b), se = z.size;
      return z.set(b, x), this.size += z.size == se ? 0 : 1, this;
    }
    vt.prototype.clear = gu, vt.prototype.delete = vu, vt.prototype.get = Eu, vt.prototype.has = yu, vt.prototype.set = wu;
    function mr(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.__data__ = new vt(); ++x < z; )
        this.add(b[x]);
    }
    function _u(b) {
      return this.__data__.set(b, d), this;
    }
    function Su(b) {
      return this.__data__.has(b);
    }
    mr.prototype.add = mr.prototype.push = _u, mr.prototype.has = Su;
    function st(b) {
      var x = this.__data__ = new it(b);
      this.size = x.size;
    }
    function Au() {
      this.__data__ = new it(), this.size = 0;
    }
    function Tu(b) {
      var x = this.__data__, z = x.delete(b);
      return this.size = x.size, z;
    }
    function Ru(b) {
      return this.__data__.get(b);
    }
    function Cu(b) {
      return this.__data__.has(b);
    }
    function bu(b, x) {
      var z = this.__data__;
      if (z instanceof it) {
        var se = z.__data__;
        if (!Oe || se.length < h - 1)
          return se.push([b, x]), this.size = ++z.size, this;
        z = this.__data__ = new vt(se);
      }
      return z.set(b, x), this.size = z.size, this;
    }
    st.prototype.clear = Au, st.prototype.delete = Tu, st.prototype.get = Ru, st.prototype.has = Cu, st.prototype.set = bu;
    function Ou(b, x) {
      var z = Er(b), se = !z && ju(b), Ie = !z && !se && Wr(b), Se = !z && !se && !Ie && Ea(b), Ne = z || se || Ie || Se, Le = Ne ? ke(b.length, String) : [], Ue = Le.length;
      for (var Pe in b)
        ve.call(b, Pe) && !(Ne && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Pe == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Ie && (Pe == "offset" || Pe == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Se && (Pe == "buffer" || Pe == "byteLength" || Pe == "byteOffset") || // Skip index properties.
        ku(Pe, Ue))) && Le.push(Pe);
      return Le;
    }
    function gr(b, x) {
      for (var z = b.length; z--; )
        if (pa(b[z][0], x))
          return z;
      return -1;
    }
    function Iu(b, x, z) {
      var se = x(b);
      return Er(b) ? se : Fe(se, z(b));
    }
    function kt(b) {
      return b == null ? b === void 0 ? E : w : ee && ee in Object(b) ? Uu(b) : Hu(b);
    }
    function ca(b) {
      return qt(b) && kt(b) == c;
    }
    function fa(b, x, z, se, Ie) {
      return b === x ? !0 : b == null || x == null || !qt(b) && !qt(x) ? b !== b && x !== x : Pu(b, x, z, se, fa, Ie);
    }
    function Pu(b, x, z, se, Ie, Se) {
      var Ne = Er(b), Le = Er(x), Ue = Ne ? i : lt(b), Pe = Le ? i : lt(x);
      Ue = Ue == c ? R : Ue, Pe = Pe == c ? R : Pe;
      var We = Ue == R, Je = Pe == R, qe = Ue == Pe;
      if (qe && Wr(b)) {
        if (!Wr(x))
          return !1;
        Ne = !0, We = !1;
      }
      if (qe && !We)
        return Se || (Se = new st()), Ne || Ea(b) ? da(b, x, z, se, Ie, Se) : xu(b, x, Ue, z, se, Ie, Se);
      if (!(z & u)) {
        var Ye = We && ve.call(b, "__wrapped__"), ze = Je && ve.call(x, "__wrapped__");
        if (Ye || ze) {
          var ut = Ye ? b.value() : b, at = ze ? x.value() : x;
          return Se || (Se = new st()), Ie(ut, at, z, se, Se);
        }
      }
      return qe ? (Se || (Se = new st()), Lu(b, x, z, se, Ie, Se)) : !1;
    }
    function Du(b) {
      if (!va(b) || Mu(b))
        return !1;
      var x = ma(b) ? xe : ie;
      return x.test(Et(b));
    }
    function Nu(b) {
      return qt(b) && ga(b.length) && !!K[kt(b)];
    }
    function Fu(b) {
      if (!Bu(b))
        return he(b);
      var x = [];
      for (var z in Object(b))
        ve.call(b, z) && z != "constructor" && x.push(z);
      return x;
    }
    function da(b, x, z, se, Ie, Se) {
      var Ne = z & u, Le = b.length, Ue = x.length;
      if (Le != Ue && !(Ne && Ue > Le))
        return !1;
      var Pe = Se.get(b);
      if (Pe && Se.get(x))
        return Pe == x;
      var We = -1, Je = !0, qe = z & s ? new mr() : void 0;
      for (Se.set(b, x), Se.set(x, b); ++We < Le; ) {
        var Ye = b[We], ze = x[We];
        if (se)
          var ut = Ne ? se(ze, Ye, We, x, b, Se) : se(Ye, ze, We, b, x, Se);
        if (ut !== void 0) {
          if (ut)
            continue;
          Je = !1;
          break;
        }
        if (qe) {
          if (!Ce(x, function(at, yt) {
            if (!nt(qe, yt) && (Ye === at || Ie(Ye, at, z, se, Se)))
              return qe.push(yt);
          })) {
            Je = !1;
            break;
          }
        } else if (!(Ye === ze || Ie(Ye, ze, z, se, Se))) {
          Je = !1;
          break;
        }
      }
      return Se.delete(b), Se.delete(x), Je;
    }
    function xu(b, x, z, se, Ie, Se, Ne) {
      switch (z) {
        case L:
          if (b.byteLength != x.byteLength || b.byteOffset != x.byteOffset)
            return !1;
          b = b.buffer, x = x.buffer;
        case U:
          return !(b.byteLength != x.byteLength || !Se(new X(b), new X(x)));
        case l:
        case o:
        case m:
          return pa(+b, +x);
        case r:
          return b.name == x.name && b.message == x.message;
        case M:
        case A:
          return b == x + "";
        case _:
          var Le = B;
        case C:
          var Ue = se & u;
          if (Le || (Le = re), b.size != x.size && !Ue)
            return !1;
          var Pe = Ne.get(b);
          if (Pe)
            return Pe == x;
          se |= s, Ne.set(b, x);
          var We = da(Le(b), Le(x), se, Ie, Se, Ne);
          return Ne.delete(b), We;
        case T:
          if (Gr)
            return Gr.call(b) == Gr.call(x);
      }
      return !1;
    }
    function Lu(b, x, z, se, Ie, Se) {
      var Ne = z & u, Le = ha(b), Ue = Le.length, Pe = ha(x), We = Pe.length;
      if (Ue != We && !Ne)
        return !1;
      for (var Je = Ue; Je--; ) {
        var qe = Le[Je];
        if (!(Ne ? qe in x : ve.call(x, qe)))
          return !1;
      }
      var Ye = Se.get(b);
      if (Ye && Se.get(x))
        return Ye == x;
      var ze = !0;
      Se.set(b, x), Se.set(x, b);
      for (var ut = Ne; ++Je < Ue; ) {
        qe = Le[Je];
        var at = b[qe], yt = x[qe];
        if (se)
          var ya = Ne ? se(yt, at, qe, x, b, Se) : se(at, yt, qe, b, x, Se);
        if (!(ya === void 0 ? at === yt || Ie(at, yt, z, se, Se) : ya)) {
          ze = !1;
          break;
        }
        ut || (ut = qe == "constructor");
      }
      if (ze && !ut) {
        var yr = b.constructor, wr = x.constructor;
        yr != wr && "constructor" in b && "constructor" in x && !(typeof yr == "function" && yr instanceof yr && typeof wr == "function" && wr instanceof wr) && (ze = !1);
      }
      return Se.delete(b), Se.delete(x), ze;
    }
    function ha(b) {
      return Iu(b, Vu, $u);
    }
    function vr(b, x) {
      var z = b.__data__;
      return qu(x) ? z[typeof x == "string" ? "string" : "hash"] : z.map;
    }
    function Ot(b, x) {
      var z = e(b, x);
      return Du(z) ? z : void 0;
    }
    function Uu(b) {
      var x = ve.call(b, ee), z = b[ee];
      try {
        b[ee] = void 0;
        var se = !0;
      } catch {
      }
      var Ie = de.call(b);
      return se && (x ? b[ee] = z : delete b[ee]), Ie;
    }
    var $u = fe ? function(b) {
      return b == null ? [] : (b = Object(b), ye(fe(b), function(x) {
        return Y.call(b, x);
      }));
    } : Yu, lt = kt;
    (we && lt(new we(new ArrayBuffer(1))) != L || Oe && lt(new Oe()) != _ || De && lt(De.resolve()) != O || Re && lt(new Re()) != C || bt && lt(new bt()) != q) && (lt = function(b) {
      var x = kt(b), z = x == R ? b.constructor : void 0, se = z ? Et(z) : "";
      if (se)
        switch (se) {
          case mt:
            return L;
          case ru:
            return _;
          case nu:
            return O;
          case iu:
            return C;
          case au:
            return q;
        }
      return x;
    });
    function ku(b, x) {
      return x = x ?? a, !!x && (typeof b == "number" || Ae.test(b)) && b > -1 && b % 1 == 0 && b < x;
    }
    function qu(b) {
      var x = typeof b;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? b !== "__proto__" : b === null;
    }
    function Mu(b) {
      return !!Te && Te in b;
    }
    function Bu(b) {
      var x = b && b.constructor, z = typeof x == "function" && x.prototype || Z;
      return b === z;
    }
    function Hu(b) {
      return de.call(b);
    }
    function Et(b) {
      if (b != null) {
        try {
          return ge.call(b);
        } catch {
        }
        try {
          return b + "";
        } catch {
        }
      }
      return "";
    }
    function pa(b, x) {
      return b === x || b !== b && x !== x;
    }
    var ju = ca(/* @__PURE__ */ function() {
      return arguments;
    }()) ? ca : function(b) {
      return qt(b) && ve.call(b, "callee") && !Y.call(b, "callee");
    }, Er = Array.isArray;
    function Gu(b) {
      return b != null && ga(b.length) && !ma(b);
    }
    var Wr = oe || zu;
    function Wu(b, x) {
      return fa(b, x);
    }
    function ma(b) {
      if (!va(b))
        return !1;
      var x = kt(b);
      return x == p || x == g || x == t || x == I;
    }
    function ga(b) {
      return typeof b == "number" && b > -1 && b % 1 == 0 && b <= a;
    }
    function va(b) {
      var x = typeof b;
      return b != null && (x == "object" || x == "function");
    }
    function qt(b) {
      return b != null && typeof b == "object";
    }
    var Ea = _e ? pt(_e) : Nu;
    function Vu(b) {
      return Gu(b) ? Ou(b) : Fu(b);
    }
    function Yu() {
      return [];
    }
    function zu() {
      return !1;
    }
    n.exports = Wu;
  }(sr, sr.exports)), sr.exports;
}
var qs;
function df() {
  if (qs) return Pt;
  qs = 1, Object.defineProperty(Pt, "__esModule", { value: !0 }), Pt.DownloadedUpdateHelper = void 0, Pt.createTempUpdateFile = c;
  const n = ur, f = dt, h = ff(), d = /* @__PURE__ */ ht(), u = be;
  let s = class {
    constructor(t) {
      this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
    }
    get downloadedFileInfo() {
      return this._downloadedFileInfo;
    }
    get file() {
      return this._file;
    }
    get packageFile() {
      return this._packageFile;
    }
    get cacheDirForPendingUpdate() {
      return u.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(t, l, o, r) {
      if (this.versionInfo != null && this.file === t && this.fileInfo != null)
        return h(this.versionInfo, l) && h(this.fileInfo.info, o.info) && await (0, d.pathExists)(t) ? t : null;
      const p = await this.getValidCachedUpdateFile(o, r);
      return p === null ? null : (r.info(`Update has already been downloaded to ${t}).`), this._file = p, p);
    }
    async setDownloadedFile(t, l, o, r, p, g) {
      this._file = t, this._packageFile = l, this.versionInfo = o, this.fileInfo = r, this._downloadedFileInfo = {
        fileName: p,
        sha512: r.info.sha512,
        isAdminRightsRequired: r.info.isAdminRightsRequired === !0
      }, g && await (0, d.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, d.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(t, l) {
      const o = this.getUpdateInfoFile();
      if (!await (0, d.pathExists)(o))
        return null;
      let p;
      try {
        p = await (0, d.readJson)(o);
      } catch (w) {
        let R = "No cached update info available";
        return w.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), R += ` (error on read: ${w.message})`), l.info(R), null;
      }
      if (!((p == null ? void 0 : p.fileName) !== null))
        return l.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (t.info.sha512 !== p.sha512)
        return l.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const _ = u.join(this.cacheDirForPendingUpdate, p.fileName);
      if (!await (0, d.pathExists)(_))
        return l.info("Cached update file doesn't exist"), null;
      const m = await a(_);
      return t.info.sha512 !== m ? (l.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = p, _);
    }
    getUpdateInfoFile() {
      return u.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  Pt.DownloadedUpdateHelper = s;
  function a(i, t = "sha512", l = "base64", o) {
    return new Promise((r, p) => {
      const g = (0, n.createHash)(t);
      g.on("error", p).setEncoding(l), (0, f.createReadStream)(i, {
        ...o,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", p).on("end", () => {
        g.end(), r(g.read());
      }).pipe(g, { end: !1 });
    });
  }
  async function c(i, t, l) {
    let o = 0, r = u.join(t, i);
    for (let p = 0; p < 3; p++)
      try {
        return await (0, d.unlink)(r), r;
      } catch (g) {
        if (g.code === "ENOENT")
          return r;
        l.warn(`Error on remove temp update file: ${g}`), r = u.join(t, `${o++}-${i}`);
      }
    return r;
  }
  return Pt;
}
var Wt = {}, Nr = {}, Ms;
function hf() {
  if (Ms) return Nr;
  Ms = 1, Object.defineProperty(Nr, "__esModule", { value: !0 }), Nr.getAppCacheDir = h;
  const n = be, f = Lr;
  function h() {
    const d = (0, f.homedir)();
    let u;
    return process.platform === "win32" ? u = process.env.LOCALAPPDATA || n.join(d, "AppData", "Local") : process.platform === "darwin" ? u = n.join(d, "Library", "Caches") : u = process.env.XDG_CACHE_HOME || n.join(d, ".cache"), u;
  }
  return Nr;
}
var Bs;
function pf() {
  if (Bs) return Wt;
  Bs = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.ElectronAppAdapter = void 0;
  const n = be, f = hf();
  let h = class {
    constructor(u = Tt.app) {
      this.app = u;
    }
    whenReady() {
      return this.app.whenReady();
    }
    get version() {
      return this.app.getVersion();
    }
    get name() {
      return this.app.getName();
    }
    get isPackaged() {
      return this.app.isPackaged === !0;
    }
    get appUpdateConfigPath() {
      return this.isPackaged ? n.join(process.resourcesPath, "app-update.yml") : n.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, f.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(u) {
      this.app.once("quit", (s, a) => u(a));
    }
  };
  return Wt.ElectronAppAdapter = h, Wt;
}
var Gi = {}, Hs;
function mf() {
  return Hs || (Hs = 1, function(n) {
    Object.defineProperty(n, "__esModule", { value: !0 }), n.ElectronHttpExecutor = n.NET_SESSION_NAME = void 0, n.getNetSession = h;
    const f = $e();
    n.NET_SESSION_NAME = "electron-updater";
    function h() {
      return Tt.session.fromPartition(n.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class d extends f.HttpExecutor {
      constructor(s) {
        super(), this.proxyLoginCallback = s, this.cachedSession = null;
      }
      async download(s, a, c) {
        return await c.cancellationToken.createPromise((i, t, l) => {
          const o = {
            headers: c.headers || void 0,
            redirect: "manual"
          };
          (0, f.configureRequestUrl)(s, o), (0, f.configureRequestOptions)(o), this.doDownload(o, {
            destination: a,
            options: c,
            onCancel: l,
            callback: (r) => {
              r == null ? i(a) : t(r);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(s, a) {
        s.headers && s.headers.Host && (s.host = s.headers.Host, delete s.headers.Host), this.cachedSession == null && (this.cachedSession = h());
        const c = Tt.net.request({
          ...s,
          session: this.cachedSession
        });
        return c.on("response", a), this.proxyLoginCallback != null && c.on("login", this.proxyLoginCallback), c;
      }
      addRedirectHandlers(s, a, c, i, t) {
        s.on("redirect", (l, o, r) => {
          s.abort(), i > this.maxRedirects ? c(this.createMaxRedirectError()) : t(f.HttpExecutor.prepareRedirectUrlOptions(r, a));
        });
      }
    }
    n.ElectronHttpExecutor = d;
  }(Gi)), Gi;
}
var Vt = {}, At = {}, Wi, js;
function gf() {
  if (js) return Wi;
  js = 1;
  var n = 1 / 0, f = "[object Symbol]", h = /[\\^$.*+?()[\]{}|]/g, d = RegExp(h.source), u = typeof Qe == "object" && Qe && Qe.Object === Object && Qe, s = typeof self == "object" && self && self.Object === Object && self, a = u || s || Function("return this")(), c = Object.prototype, i = c.toString, t = a.Symbol, l = t ? t.prototype : void 0, o = l ? l.toString : void 0;
  function r(w) {
    if (typeof w == "string")
      return w;
    if (g(w))
      return o ? o.call(w) : "";
    var R = w + "";
    return R == "0" && 1 / w == -n ? "-0" : R;
  }
  function p(w) {
    return !!w && typeof w == "object";
  }
  function g(w) {
    return typeof w == "symbol" || p(w) && i.call(w) == f;
  }
  function _(w) {
    return w == null ? "" : r(w);
  }
  function m(w) {
    return w = _(w), w && d.test(w) ? w.replace(h, "\\$&") : w;
  }
  return Wi = m, Wi;
}
var Gs;
function Ct() {
  if (Gs) return At;
  Gs = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.newBaseUrl = h, At.newUrlFromBase = d, At.getChannelFilename = u, At.blockmapFiles = s;
  const n = Ft, f = gf();
  function h(a) {
    const c = new n.URL(a);
    return c.pathname.endsWith("/") || (c.pathname += "/"), c;
  }
  function d(a, c, i = !1) {
    const t = new n.URL(a, c), l = c.search;
    return l != null && l.length !== 0 ? t.search = l : i && (t.search = `noCache=${Date.now().toString(32)}`), t;
  }
  function u(a) {
    return `${a}.yml`;
  }
  function s(a, c, i) {
    const t = d(`${a.pathname}.blockmap`, a);
    return [d(`${a.pathname.replace(new RegExp(f(i), "g"), c)}.blockmap`, a), t];
  }
  return At;
}
var ot = {}, Ws;
function tt() {
  if (Ws) return ot;
  Ws = 1, Object.defineProperty(ot, "__esModule", { value: !0 }), ot.Provider = void 0, ot.findFile = u, ot.parseUpdateInfo = s, ot.getFileList = a, ot.resolveFiles = c;
  const n = $e(), f = Zi(), h = Ct();
  let d = class {
    constructor(t) {
      this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const t = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (t === "x64" ? "" : `-${t}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(t) {
      return `${t}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(t) {
      this.requestHeaders = t;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(t, l, o) {
      return this.executor.request(this.createRequestOptions(t, l), o);
    }
    createRequestOptions(t, l) {
      const o = {};
      return this.requestHeaders == null ? l != null && (o.headers = l) : o.headers = l == null ? this.requestHeaders : { ...this.requestHeaders, ...l }, (0, n.configureRequestUrl)(t, o), o;
    }
  };
  ot.Provider = d;
  function u(i, t, l) {
    if (i.length === 0)
      throw (0, n.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const o = i.find((r) => r.url.pathname.toLowerCase().endsWith(`.${t}`));
    return o ?? (l == null ? i[0] : i.find((r) => !l.some((p) => r.url.pathname.toLowerCase().endsWith(`.${p}`))));
  }
  function s(i, t, l) {
    if (i == null)
      throw (0, n.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${l}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let o;
    try {
      o = (0, f.load)(i);
    } catch (r) {
      throw (0, n.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${l}): ${r.stack || r.message}, rawData: ${i}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return o;
  }
  function a(i) {
    const t = i.files;
    if (t != null && t.length > 0)
      return t;
    if (i.path != null)
      return [
        {
          url: i.path,
          sha2: i.sha2,
          sha512: i.sha512
        }
      ];
    throw (0, n.newError)(`No files provided: ${(0, n.safeStringifyJson)(i)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function c(i, t, l = (o) => o) {
    const r = a(i).map((_) => {
      if (_.sha2 == null && _.sha512 == null)
        throw (0, n.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, n.safeStringifyJson)(_)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, h.newUrlFromBase)(l(_.url), t),
        info: _
      };
    }), p = i.packages, g = p == null ? null : p[process.arch] || p.ia32;
    return g != null && (r[0].packageInfo = {
      ...g,
      path: (0, h.newUrlFromBase)(l(g.path), t).href
    }), r;
  }
  return ot;
}
var Vs;
function Kl() {
  if (Vs) return Vt;
  Vs = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.GenericProvider = void 0;
  const n = $e(), f = Ct(), h = tt();
  let d = class extends h.Provider {
    constructor(s, a, c) {
      super(c), this.configuration = s, this.updater = a, this.baseUrl = (0, f.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const s = this.updater.channel || this.configuration.channel;
      return s == null ? this.getDefaultChannelName() : this.getCustomChannelName(s);
    }
    async getLatestVersion() {
      const s = (0, f.getChannelFilename)(this.channel), a = (0, f.newUrlFromBase)(s, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let c = 0; ; c++)
        try {
          return (0, h.parseUpdateInfo)(await this.httpRequest(a), s, a);
        } catch (i) {
          if (i instanceof n.HttpError && i.statusCode === 404)
            throw (0, n.newError)(`Cannot find channel "${s}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (i.code === "ECONNREFUSED" && c < 3) {
            await new Promise((t, l) => {
              try {
                setTimeout(t, 1e3 * c);
              } catch (o) {
                l(o);
              }
            });
            continue;
          }
          throw i;
        }
    }
    resolveFiles(s) {
      return (0, h.resolveFiles)(s, this.baseUrl);
    }
  };
  return Vt.GenericProvider = d, Vt;
}
var Yt = {}, zt = {}, Ys;
function vf() {
  if (Ys) return zt;
  Ys = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.BitbucketProvider = void 0;
  const n = $e(), f = Ct(), h = tt();
  let d = class extends h.Provider {
    constructor(s, a, c) {
      super({
        ...c,
        isUseMultipleRangeRequest: !1
      }), this.configuration = s, this.updater = a;
      const { owner: i, slug: t } = s;
      this.baseUrl = (0, f.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${t}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const s = new n.CancellationToken(), a = (0, f.getChannelFilename)(this.getCustomChannelName(this.channel)), c = (0, f.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const i = await this.httpRequest(c, void 0, s);
        return (0, h.parseUpdateInfo)(i, a, c);
      } catch (i) {
        throw (0, n.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(s) {
      return (0, h.resolveFiles)(s, this.baseUrl);
    }
    toString() {
      const { owner: s, slug: a } = this.configuration;
      return `Bitbucket (owner: ${s}, slug: ${a}, channel: ${this.channel})`;
    }
  };
  return zt.BitbucketProvider = d, zt;
}
var ft = {}, zs;
function Jl() {
  if (zs) return ft;
  zs = 1, Object.defineProperty(ft, "__esModule", { value: !0 }), ft.GitHubProvider = ft.BaseGitHubProvider = void 0, ft.computeReleaseNotes = t;
  const n = $e(), f = Xl(), h = Ft, d = Ct(), u = tt(), s = /\/tag\/([^/]+)$/;
  class a extends u.Provider {
    constructor(o, r, p) {
      super({
        ...p,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = o, this.baseUrl = (0, d.newBaseUrl)((0, n.githubUrl)(o, r));
      const g = r === "github.com" ? "api.github.com" : r;
      this.baseApiUrl = (0, d.newBaseUrl)((0, n.githubUrl)(o, g));
    }
    computeGithubBasePath(o) {
      const r = this.options.host;
      return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${o}` : o;
    }
  }
  ft.BaseGitHubProvider = a;
  let c = class extends a {
    constructor(o, r, p) {
      super(o, "github.com", p), this.options = o, this.updater = r;
    }
    get channel() {
      const o = this.updater.channel || this.options.channel;
      return o == null ? this.getDefaultChannelName() : this.getCustomChannelName(o);
    }
    async getLatestVersion() {
      var o, r, p, g, _;
      const m = new n.CancellationToken(), w = await this.httpRequest((0, d.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, m), R = (0, n.parseXml)(w);
      let O = R.element("entry", !1, "No published versions on GitHub"), I = null;
      try {
        if (this.updater.allowPrerelease) {
          const q = ((o = this.updater) === null || o === void 0 ? void 0 : o.channel) || ((r = f.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
          if (q === null)
            I = s.exec(O.element("link").attribute("href"))[1];
          else
            for (const U of R.getElements("entry")) {
              const L = s.exec(U.element("link").attribute("href"));
              if (L === null)
                continue;
              const k = L[1], D = ((p = f.prerelease(k)) === null || p === void 0 ? void 0 : p[0]) || null, P = !q || ["alpha", "beta"].includes(q), F = D !== null && !["alpha", "beta"].includes(String(D));
              if (P && !F && !(q === "beta" && D === "alpha")) {
                I = k;
                break;
              }
              if (D && D === q) {
                I = k;
                break;
              }
            }
        } else {
          I = await this.getLatestTagName(m);
          for (const q of R.getElements("entry"))
            if (s.exec(q.element("link").attribute("href"))[1] === I) {
              O = q;
              break;
            }
        }
      } catch (q) {
        throw (0, n.newError)(`Cannot parse releases feed: ${q.stack || q.message},
XML:
${w}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (I == null)
        throw (0, n.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let M, C = "", A = "";
      const T = async (q) => {
        C = (0, d.getChannelFilename)(q), A = (0, d.newUrlFromBase)(this.getBaseDownloadPath(String(I), C), this.baseUrl);
        const U = this.createRequestOptions(A);
        try {
          return await this.executor.request(U, m);
        } catch (L) {
          throw L instanceof n.HttpError && L.statusCode === 404 ? (0, n.newError)(`Cannot find ${C} in the latest release artifacts (${A}): ${L.stack || L.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : L;
        }
      };
      try {
        let q = this.channel;
        this.updater.allowPrerelease && (!((g = f.prerelease(I)) === null || g === void 0) && g[0]) && (q = this.getCustomChannelName(String((_ = f.prerelease(I)) === null || _ === void 0 ? void 0 : _[0]))), M = await T(q);
      } catch (q) {
        if (this.updater.allowPrerelease)
          M = await T(this.getDefaultChannelName());
        else
          throw q;
      }
      const E = (0, u.parseUpdateInfo)(M, C, A);
      return E.releaseName == null && (E.releaseName = O.elementValueOrEmpty("title")), E.releaseNotes == null && (E.releaseNotes = t(this.updater.currentVersion, this.updater.fullChangelog, R, O)), {
        tag: I,
        ...E
      };
    }
    async getLatestTagName(o) {
      const r = this.options, p = r.host == null || r.host === "github.com" ? (0, d.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new h.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const g = await this.httpRequest(p, { Accept: "application/json" }, o);
        return g == null ? null : JSON.parse(g).tag_name;
      } catch (g) {
        throw (0, n.newError)(`Unable to find latest version on GitHub (${p}), please ensure a production release exists: ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(o) {
      return (0, u.resolveFiles)(o, this.baseUrl, (r) => this.getBaseDownloadPath(o.tag, r.replace(/ /g, "-")));
    }
    getBaseDownloadPath(o, r) {
      return `${this.basePath}/download/${o}/${r}`;
    }
  };
  ft.GitHubProvider = c;
  function i(l) {
    const o = l.elementValueOrEmpty("content");
    return o === "No content." ? "" : o;
  }
  function t(l, o, r, p) {
    if (!o)
      return i(p);
    const g = [];
    for (const _ of r.getElements("entry")) {
      const m = /\/tag\/v?([^/]+)$/.exec(_.element("link").attribute("href"))[1];
      f.lt(l, m) && g.push({
        version: m,
        note: i(_)
      });
    }
    return g.sort((_, m) => f.rcompare(_.version, m.version));
  }
  return ft;
}
var Xt = {}, Xs;
function Ef() {
  if (Xs) return Xt;
  Xs = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.KeygenProvider = void 0;
  const n = $e(), f = Ct(), h = tt();
  let d = class extends h.Provider {
    constructor(s, a, c) {
      super({
        ...c,
        isUseMultipleRangeRequest: !1
      }), this.configuration = s, this.updater = a, this.baseUrl = (0, f.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const s = new n.CancellationToken(), a = (0, f.getChannelFilename)(this.getCustomChannelName(this.channel)), c = (0, f.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const i = await this.httpRequest(c, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, s);
        return (0, h.parseUpdateInfo)(i, a, c);
      } catch (i) {
        throw (0, n.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(s) {
      return (0, h.resolveFiles)(s, this.baseUrl);
    }
    toString() {
      const { account: s, product: a, platform: c } = this.configuration;
      return `Keygen (account: ${s}, product: ${a}, platform: ${c}, channel: ${this.channel})`;
    }
  };
  return Xt.KeygenProvider = d, Xt;
}
var Kt = {}, Ks;
function yf() {
  if (Ks) return Kt;
  Ks = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.PrivateGitHubProvider = void 0;
  const n = $e(), f = Zi(), h = be, d = Ft, u = Ct(), s = Jl(), a = tt();
  let c = class extends s.BaseGitHubProvider {
    constructor(t, l, o, r) {
      super(t, "api.github.com", r), this.updater = l, this.token = o;
    }
    createRequestOptions(t, l) {
      const o = super.createRequestOptions(t, l);
      return o.redirect = "manual", o;
    }
    async getLatestVersion() {
      const t = new n.CancellationToken(), l = (0, u.getChannelFilename)(this.getDefaultChannelName()), o = await this.getLatestVersionInfo(t), r = o.assets.find((_) => _.name === l);
      if (r == null)
        throw (0, n.newError)(`Cannot find ${l} in the release ${o.html_url || o.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const p = new d.URL(r.url);
      let g;
      try {
        g = (0, f.load)(await this.httpRequest(p, this.configureHeaders("application/octet-stream"), t));
      } catch (_) {
        throw _ instanceof n.HttpError && _.statusCode === 404 ? (0, n.newError)(`Cannot find ${l} in the latest release artifacts (${p}): ${_.stack || _.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : _;
      }
      return g.assets = o.assets, g;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(t) {
      return {
        accept: t,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(t) {
      const l = this.updater.allowPrerelease;
      let o = this.basePath;
      l || (o = `${o}/latest`);
      const r = (0, u.newUrlFromBase)(o, this.baseUrl);
      try {
        const p = JSON.parse(await this.httpRequest(r, this.configureHeaders("application/vnd.github.v3+json"), t));
        return l ? p.find((g) => g.prerelease) || p[0] : p;
      } catch (p) {
        throw (0, n.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${p.stack || p.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(t) {
      return (0, a.getFileList)(t).map((l) => {
        const o = h.posix.basename(l.url).replace(/ /g, "-"), r = t.assets.find((p) => p != null && p.name === o);
        if (r == null)
          throw (0, n.newError)(`Cannot find asset "${o}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new d.URL(r.url),
          info: l
        };
      });
    }
  };
  return Kt.PrivateGitHubProvider = c, Kt;
}
var Js;
function wf() {
  if (Js) return Yt;
  Js = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.isUrlProbablySupportMultiRangeRequests = a, Yt.createClient = c;
  const n = $e(), f = vf(), h = Kl(), d = Jl(), u = Ef(), s = yf();
  function a(i) {
    return !i.includes("s3.amazonaws.com");
  }
  function c(i, t, l) {
    if (typeof i == "string")
      throw (0, n.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const o = i.provider;
    switch (o) {
      case "github": {
        const r = i, p = (r.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || r.token;
        return p == null ? new d.GitHubProvider(r, t, l) : new s.PrivateGitHubProvider(r, t, p, l);
      }
      case "bitbucket":
        return new f.BitbucketProvider(i, t, l);
      case "keygen":
        return new u.KeygenProvider(i, t, l);
      case "s3":
      case "spaces":
        return new h.GenericProvider({
          provider: "generic",
          url: (0, n.getS3LikeProviderBaseUrl)(i),
          channel: i.channel || null
        }, t, {
          ...l,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const r = i;
        return new h.GenericProvider(r, t, {
          ...l,
          isUseMultipleRangeRequest: r.useMultipleRangeRequest !== !1 && a(r.url)
        });
      }
      case "custom": {
        const r = i, p = r.updateProvider;
        if (!p)
          throw (0, n.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new p(r, t, l);
      }
      default:
        throw (0, n.newError)(`Unsupported provider: ${o}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return Yt;
}
var Jt = {}, Qt = {}, Dt = {}, Nt = {}, Qs;
function oa() {
  if (Qs) return Nt;
  Qs = 1, Object.defineProperty(Nt, "__esModule", { value: !0 }), Nt.OperationKind = void 0, Nt.computeOperations = f;
  var n;
  (function(a) {
    a[a.COPY = 0] = "COPY", a[a.DOWNLOAD = 1] = "DOWNLOAD";
  })(n || (Nt.OperationKind = n = {}));
  function f(a, c, i) {
    const t = s(a.files), l = s(c.files);
    let o = null;
    const r = c.files[0], p = [], g = r.name, _ = t.get(g);
    if (_ == null)
      throw new Error(`no file ${g} in old blockmap`);
    const m = l.get(g);
    let w = 0;
    const { checksumToOffset: R, checksumToOldSize: O } = u(t.get(g), _.offset, i);
    let I = r.offset;
    for (let M = 0; M < m.checksums.length; I += m.sizes[M], M++) {
      const C = m.sizes[M], A = m.checksums[M];
      let T = R.get(A);
      T != null && O.get(A) !== C && (i.warn(`Checksum ("${A}") matches, but size differs (old: ${O.get(A)}, new: ${C})`), T = void 0), T === void 0 ? (w++, o != null && o.kind === n.DOWNLOAD && o.end === I ? o.end += C : (o = {
        kind: n.DOWNLOAD,
        start: I,
        end: I + C
        // oldBlocks: null,
      }, d(o, p, A, M))) : o != null && o.kind === n.COPY && o.end === T ? o.end += C : (o = {
        kind: n.COPY,
        start: T,
        end: T + C
        // oldBlocks: [checksum]
      }, d(o, p, A, M));
    }
    return w > 0 && i.info(`File${r.name === "file" ? "" : " " + r.name} has ${w} changed blocks`), p;
  }
  const h = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function d(a, c, i, t) {
    if (h && c.length !== 0) {
      const l = c[c.length - 1];
      if (l.kind === a.kind && a.start < l.end && a.start > l.start) {
        const o = [l.start, l.end, a.start, a.end].reduce((r, p) => r < p ? r : p);
        throw new Error(`operation (block index: ${t}, checksum: ${i}, kind: ${n[a.kind]}) overlaps previous operation (checksum: ${i}):
abs: ${l.start} until ${l.end} and ${a.start} until ${a.end}
rel: ${l.start - o} until ${l.end - o} and ${a.start - o} until ${a.end - o}`);
      }
    }
    c.push(a);
  }
  function u(a, c, i) {
    const t = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
    let o = c;
    for (let r = 0; r < a.checksums.length; r++) {
      const p = a.checksums[r], g = a.sizes[r], _ = l.get(p);
      if (_ === void 0)
        t.set(p, o), l.set(p, g);
      else if (i.debug != null) {
        const m = _ === g ? "(same size)" : `(size: ${_}, this size: ${g})`;
        i.debug(`${p} duplicated in blockmap ${m}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      o += g;
    }
    return { checksumToOffset: t, checksumToOldSize: l };
  }
  function s(a) {
    const c = /* @__PURE__ */ new Map();
    for (const i of a)
      c.set(i.name, i);
    return c;
  }
  return Nt;
}
var Zs;
function Ql() {
  if (Zs) return Dt;
  Zs = 1, Object.defineProperty(Dt, "__esModule", { value: !0 }), Dt.DataSplitter = void 0, Dt.copyData = a;
  const n = $e(), f = dt, h = cr, d = oa(), u = Buffer.from(`\r
\r
`);
  var s;
  (function(i) {
    i[i.INIT = 0] = "INIT", i[i.HEADER = 1] = "HEADER", i[i.BODY = 2] = "BODY";
  })(s || (s = {}));
  function a(i, t, l, o, r) {
    const p = (0, f.createReadStream)("", {
      fd: l,
      autoClose: !1,
      start: i.start,
      // end is inclusive
      end: i.end - 1
    });
    p.on("error", o), p.once("end", r), p.pipe(t, {
      end: !1
    });
  }
  let c = class extends h.Writable {
    constructor(t, l, o, r, p, g) {
      super(), this.out = t, this.options = l, this.partIndexToTaskIndex = o, this.partIndexToLength = p, this.finishHandler = g, this.partIndex = -1, this.headerListBuffer = null, this.readState = s.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = r.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(t, l, o) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${t.length} bytes`);
        return;
      }
      this.handleData(t).then(o).catch(o);
    }
    async handleData(t) {
      let l = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, n.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const o = Math.min(this.ignoreByteCount, t.length);
        this.ignoreByteCount -= o, l = o;
      } else if (this.remainingPartDataCount > 0) {
        const o = Math.min(this.remainingPartDataCount, t.length);
        this.remainingPartDataCount -= o, await this.processPartData(t, 0, o), l = o;
      }
      if (l !== t.length) {
        if (this.readState === s.HEADER) {
          const o = this.searchHeaderListEnd(t, l);
          if (o === -1)
            return;
          l = o, this.readState = s.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === s.BODY)
            this.readState = s.INIT;
          else {
            this.partIndex++;
            let g = this.partIndexToTaskIndex.get(this.partIndex);
            if (g == null)
              if (this.isFinished)
                g = this.options.end;
              else
                throw (0, n.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const _ = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (_ < g)
              await this.copyExistingData(_, g);
            else if (_ > g)
              throw (0, n.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (l = this.searchHeaderListEnd(t, l), l === -1) {
              this.readState = s.HEADER;
              return;
            }
          }
          const o = this.partIndexToLength[this.partIndex], r = l + o, p = Math.min(r, t.length);
          if (await this.processPartStarted(t, l, p), this.remainingPartDataCount = o - (p - l), this.remainingPartDataCount > 0)
            return;
          if (l = r + this.boundaryLength, l >= t.length) {
            this.ignoreByteCount = this.boundaryLength - (t.length - r);
            return;
          }
        }
      }
    }
    copyExistingData(t, l) {
      return new Promise((o, r) => {
        const p = () => {
          if (t === l) {
            o();
            return;
          }
          const g = this.options.tasks[t];
          if (g.kind !== d.OperationKind.COPY) {
            r(new Error("Task kind must be COPY"));
            return;
          }
          a(g, this.out, this.options.oldFileFd, r, () => {
            t++, p();
          });
        };
        p();
      });
    }
    searchHeaderListEnd(t, l) {
      const o = t.indexOf(u, l);
      if (o !== -1)
        return o + u.length;
      const r = l === 0 ? t : t.slice(l);
      return this.headerListBuffer == null ? this.headerListBuffer = r : this.headerListBuffer = Buffer.concat([this.headerListBuffer, r]), -1;
    }
    onPartEnd() {
      const t = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== t)
        throw (0, n.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(t, l, o) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, l, o);
    }
    processPartData(t, l, o) {
      this.actualPartLength += o - l;
      const r = this.out;
      return r.write(l === 0 && t.length === o ? t : t.slice(l, o)) ? Promise.resolve() : new Promise((p, g) => {
        r.on("error", g), r.once("drain", () => {
          r.removeListener("error", g), p();
        });
      });
    }
  };
  return Dt.DataSplitter = c, Dt;
}
var Zt = {}, el;
function _f() {
  if (el) return Zt;
  el = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.executeTasksUsingMultipleRangeRequests = d, Zt.checkIsRangesSupported = s;
  const n = $e(), f = Ql(), h = oa();
  function d(a, c, i, t, l) {
    const o = (r) => {
      if (r >= c.length) {
        a.fileMetadataBuffer != null && i.write(a.fileMetadataBuffer), i.end();
        return;
      }
      const p = r + 1e3;
      u(a, {
        tasks: c,
        start: r,
        end: Math.min(c.length, p),
        oldFileFd: t
      }, i, () => o(p), l);
    };
    return o;
  }
  function u(a, c, i, t, l) {
    let o = "bytes=", r = 0;
    const p = /* @__PURE__ */ new Map(), g = [];
    for (let w = c.start; w < c.end; w++) {
      const R = c.tasks[w];
      R.kind === h.OperationKind.DOWNLOAD && (o += `${R.start}-${R.end - 1}, `, p.set(r, w), r++, g.push(R.end - R.start));
    }
    if (r <= 1) {
      const w = (R) => {
        if (R >= c.end) {
          t();
          return;
        }
        const O = c.tasks[R++];
        if (O.kind === h.OperationKind.COPY)
          (0, f.copyData)(O, i, c.oldFileFd, l, () => w(R));
        else {
          const I = a.createRequestOptions();
          I.headers.Range = `bytes=${O.start}-${O.end - 1}`;
          const M = a.httpExecutor.createRequest(I, (C) => {
            s(C, l) && (C.pipe(i, {
              end: !1
            }), C.once("end", () => w(R)));
          });
          a.httpExecutor.addErrorAndTimeoutHandlers(M, l), M.end();
        }
      };
      w(c.start);
      return;
    }
    const _ = a.createRequestOptions();
    _.headers.Range = o.substring(0, o.length - 2);
    const m = a.httpExecutor.createRequest(_, (w) => {
      if (!s(w, l))
        return;
      const R = (0, n.safeGetHeader)(w, "content-type"), O = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(R);
      if (O == null) {
        l(new Error(`Content-Type "multipart/byteranges" is expected, but got "${R}"`));
        return;
      }
      const I = new f.DataSplitter(i, c, p, O[1] || O[2], g, t);
      I.on("error", l), w.pipe(I), w.on("end", () => {
        setTimeout(() => {
          m.abort(), l(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    a.httpExecutor.addErrorAndTimeoutHandlers(m, l), m.end();
  }
  function s(a, c) {
    if (a.statusCode >= 400)
      return c((0, n.createHttpError)(a)), !1;
    if (a.statusCode !== 206) {
      const i = (0, n.safeGetHeader)(a, "accept-ranges");
      if (i == null || i === "none")
        return c(new Error(`Server doesn't support Accept-Ranges (response code ${a.statusCode})`)), !1;
    }
    return !0;
  }
  return Zt;
}
var er = {}, tl;
function Sf() {
  if (tl) return er;
  tl = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.ProgressDifferentialDownloadCallbackTransform = void 0;
  const n = cr;
  var f;
  (function(d) {
    d[d.COPY = 0] = "COPY", d[d.DOWNLOAD = 1] = "DOWNLOAD";
  })(f || (f = {}));
  let h = class extends n.Transform {
    constructor(u, s, a) {
      super(), this.progressDifferentialDownloadInfo = u, this.cancellationToken = s, this.onProgress = a, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = f.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(u, s, a) {
      if (this.cancellationToken.cancelled) {
        a(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == f.COPY) {
        a(null, u);
        return;
      }
      this.transferred += u.length, this.delta += u.length;
      const c = Date.now();
      c >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = c + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((c - this.start) / 1e3))
      }), this.delta = 0), a(null, u);
    }
    beginFileCopy() {
      this.operationType = f.COPY;
    }
    beginRangeDownload() {
      this.operationType = f.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
    }
    endRangeDownload() {
      this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
    // Called when we are 100% done with the connection/download
    _flush(u) {
      if (this.cancellationToken.cancelled) {
        u(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, u(null);
    }
  };
  return er.ProgressDifferentialDownloadCallbackTransform = h, er;
}
var rl;
function Zl() {
  if (rl) return Qt;
  rl = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.DifferentialDownloader = void 0;
  const n = $e(), f = /* @__PURE__ */ ht(), h = dt, d = Ql(), u = Ft, s = oa(), a = _f(), c = Sf();
  let i = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(r, p, g) {
      this.blockAwareFileInfo = r, this.httpExecutor = p, this.options = g, this.fileMetadataBuffer = null, this.logger = g.logger;
    }
    createRequestOptions() {
      const r = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, n.configureRequestUrl)(this.options.newUrl, r), (0, n.configureRequestOptions)(r), r;
    }
    doDownload(r, p) {
      if (r.version !== p.version)
        throw new Error(`version is different (${r.version} - ${p.version}), full download is required`);
      const g = this.logger, _ = (0, s.computeOperations)(r, p, g);
      g.debug != null && g.debug(JSON.stringify(_, null, 2));
      let m = 0, w = 0;
      for (const O of _) {
        const I = O.end - O.start;
        O.kind === s.OperationKind.DOWNLOAD ? m += I : w += I;
      }
      const R = this.blockAwareFileInfo.size;
      if (m + w + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== R)
        throw new Error(`Internal error, size mismatch: downloadSize: ${m}, copySize: ${w}, newSize: ${R}`);
      return g.info(`Full: ${t(R)}, To download: ${t(m)} (${Math.round(m / (R / 100))}%)`), this.downloadFile(_);
    }
    downloadFile(r) {
      const p = [], g = () => Promise.all(p.map((_) => (0, f.close)(_.descriptor).catch((m) => {
        this.logger.error(`cannot close file "${_.path}": ${m}`);
      })));
      return this.doDownloadFile(r, p).then(g).catch((_) => g().catch((m) => {
        try {
          this.logger.error(`cannot close files: ${m}`);
        } catch (w) {
          try {
            console.error(w);
          } catch {
          }
        }
        throw _;
      }).then(() => {
        throw _;
      }));
    }
    async doDownloadFile(r, p) {
      const g = await (0, f.open)(this.options.oldFile, "r");
      p.push({ descriptor: g, path: this.options.oldFile });
      const _ = await (0, f.open)(this.options.newFile, "w");
      p.push({ descriptor: _, path: this.options.newFile });
      const m = (0, h.createWriteStream)(this.options.newFile, { fd: _ });
      await new Promise((w, R) => {
        const O = [];
        let I;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const L = [];
          let k = 0;
          for (const P of r)
            P.kind === s.OperationKind.DOWNLOAD && (L.push(P.end - P.start), k += P.end - P.start);
          const D = {
            expectedByteCounts: L,
            grandTotal: k
          };
          I = new c.ProgressDifferentialDownloadCallbackTransform(D, this.options.cancellationToken, this.options.onProgress), O.push(I);
        }
        const M = new n.DigestTransform(this.blockAwareFileInfo.sha512);
        M.isValidateOnEnd = !1, O.push(M), m.on("finish", () => {
          m.close(() => {
            p.splice(1, 1);
            try {
              M.validate();
            } catch (L) {
              R(L);
              return;
            }
            w(void 0);
          });
        }), O.push(m);
        let C = null;
        for (const L of O)
          L.on("error", R), C == null ? C = L : C = C.pipe(L);
        const A = O[0];
        let T;
        if (this.options.isUseMultipleRangeRequest) {
          T = (0, a.executeTasksUsingMultipleRangeRequests)(this, r, A, g, R), T(0);
          return;
        }
        let E = 0, q = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const U = this.createRequestOptions();
        U.redirect = "manual", T = (L) => {
          var k, D;
          if (L >= r.length) {
            this.fileMetadataBuffer != null && A.write(this.fileMetadataBuffer), A.end();
            return;
          }
          const P = r[L++];
          if (P.kind === s.OperationKind.COPY) {
            I && I.beginFileCopy(), (0, d.copyData)(P, A, g, R, () => T(L));
            return;
          }
          const F = `bytes=${P.start}-${P.end - 1}`;
          U.headers.range = F, (D = (k = this.logger) === null || k === void 0 ? void 0 : k.debug) === null || D === void 0 || D.call(k, `download range: ${F}`), I && I.beginRangeDownload();
          const $ = this.httpExecutor.createRequest(U, (J) => {
            J.on("error", R), J.on("aborted", () => {
              R(new Error("response has been aborted by the server"));
            }), J.statusCode >= 400 && R((0, n.createHttpError)(J)), J.pipe(A, {
              end: !1
            }), J.once("end", () => {
              I && I.endRangeDownload(), ++E === 100 ? (E = 0, setTimeout(() => T(L), 1e3)) : T(L);
            });
          });
          $.on("redirect", (J, W, ne) => {
            this.logger.info(`Redirect to ${l(ne)}`), q = ne, (0, n.configureRequestUrl)(new u.URL(q), U), $.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers($, R), $.end();
        }, T(0);
      });
    }
    async readRemoteBytes(r, p) {
      const g = Buffer.allocUnsafe(p + 1 - r), _ = this.createRequestOptions();
      _.headers.range = `bytes=${r}-${p}`;
      let m = 0;
      if (await this.request(_, (w) => {
        w.copy(g, m), m += w.length;
      }), m !== g.length)
        throw new Error(`Received data length ${m} is not equal to expected ${g.length}`);
      return g;
    }
    request(r, p) {
      return new Promise((g, _) => {
        const m = this.httpExecutor.createRequest(r, (w) => {
          (0, a.checkIsRangesSupported)(w, _) && (w.on("error", _), w.on("aborted", () => {
            _(new Error("response has been aborted by the server"));
          }), w.on("data", p), w.on("end", () => g()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(m, _), m.end();
      });
    }
  };
  Qt.DifferentialDownloader = i;
  function t(o, r = " KB") {
    return new Intl.NumberFormat("en").format((o / 1024).toFixed(2)) + r;
  }
  function l(o) {
    const r = o.indexOf("?");
    return r < 0 ? o : o.substring(0, r);
  }
  return Qt;
}
var nl;
function Af() {
  if (nl) return Jt;
  nl = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.GenericDifferentialDownloader = void 0;
  const n = Zl();
  let f = class extends n.DifferentialDownloader {
    download(d, u) {
      return this.doDownload(d, u);
    }
  };
  return Jt.GenericDifferentialDownloader = f, Jt;
}
var il;
function sa() {
  if (il) return St;
  il = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.NoOpLogger = St.AppUpdater = void 0;
  const n = $e(), f = ur, h = Lr, d = _l, u = /* @__PURE__ */ ht(), s = Zi(), a = qc(), c = be, i = Xl(), t = df(), l = pf(), o = mf(), r = Kl(), p = $t(), g = wf(), _ = Tl, m = Ct(), w = Af();
  let R = class eu extends d.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(C) {
      if (this._channel != null) {
        if (typeof C != "string")
          throw (0, n.newError)(`Channel must be a string, but got: ${C}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (C.length === 0)
          throw (0, n.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = C, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(C) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: C
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, o.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(C) {
      this._logger = C ?? new I();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(C) {
      this.clientPromise = null, this._appUpdateConfigPath = C, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    constructor(C, A) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new p.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (q) => {
        this._logger.error(`Error: ${q.stack || q.message}`);
      }), A == null ? (this.app = new l.ElectronAppAdapter(), this.httpExecutor = new o.ElectronHttpExecutor((q, U) => this.emit("login", q, U))) : (this.app = A, this.httpExecutor = null);
      const T = this.app.version, E = (0, i.parse)(T);
      if (E == null)
        throw (0, n.newError)(`App version is not a valid semver version: "${T}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = E, this.allowPrerelease = O(E), C != null && (this.setFeedURL(C), typeof C != "string" && C.requestHeaders && (this.requestHeaders = C.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(C) {
      const A = this.createProviderRuntimeOptions();
      let T;
      typeof C == "string" ? T = new r.GenericProvider({ provider: "generic", url: C }, this, {
        ...A,
        isUseMultipleRangeRequest: (0, g.isUrlProbablySupportMultiRangeRequests)(C)
      }) : T = (0, g.createClient)(C, this, A), this.clientPromise = Promise.resolve(T);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let C = this.checkForUpdatesPromise;
      if (C != null)
        return this._logger.info("Checking for update (already in progress)"), C;
      const A = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), C = this.doCheckForUpdates().then((T) => (A(), T)).catch((T) => {
        throw A(), this.emit("error", T, `Cannot check for updates: ${(T.stack || T).toString()}`), T;
      }), this.checkForUpdatesPromise = C, C;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(C) {
      return this.checkForUpdates().then((A) => A != null && A.downloadPromise ? (A.downloadPromise.then(() => {
        const T = eu.formatDownloadNotification(A.updateInfo.version, this.app.name, C);
        new Tt.Notification(T).show();
      }), A) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), A));
    }
    static formatDownloadNotification(C, A, T) {
      return T == null && (T = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), T = {
        title: T.title.replace("{appName}", A).replace("{version}", C),
        body: T.body.replace("{appName}", A).replace("{version}", C)
      }, T;
    }
    async isStagingMatch(C) {
      const A = C.stagingPercentage;
      let T = A;
      if (T == null)
        return !0;
      if (T = parseInt(T, 10), isNaN(T))
        return this._logger.warn(`Staging percentage is NaN: ${A}`), !0;
      T = T / 100;
      const E = await this.stagingUserIdPromise.value, U = n.UUID.parse(E).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${T}, percentage: ${U}, user id: ${E}`), U < T;
    }
    computeFinalHeaders(C) {
      return this.requestHeaders != null && Object.assign(C, this.requestHeaders), C;
    }
    async isUpdateAvailable(C) {
      const A = (0, i.parse)(C.version);
      if (A == null)
        throw (0, n.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${C.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const T = this.currentVersion;
      if ((0, i.eq)(A, T))
        return !1;
      const E = C == null ? void 0 : C.minimumSystemVersion, q = (0, h.release)();
      if (E)
        try {
          if ((0, i.lt)(q, E))
            return this._logger.info(`Current OS version ${q} is less than the minimum OS version required ${E} for version ${q}`), !1;
        } catch (D) {
          this._logger.warn(`Failed to compare current OS version(${q}) with minimum OS version(${E}): ${(D.message || D).toString()}`);
        }
      if (!await this.isStagingMatch(C))
        return !1;
      const L = (0, i.gt)(A, T), k = (0, i.lt)(A, T);
      return L ? !0 : this.allowDowngrade && k;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((T) => (0, g.createClient)(T, this, this.createProviderRuntimeOptions())));
      const C = await this.clientPromise, A = await this.stagingUserIdPromise.value;
      return C.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": A })), {
        info: await C.getLatestVersion(),
        provider: C
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const C = await this.getUpdateInfoAndProvider(), A = C.info;
      if (!await this.isUpdateAvailable(A))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${A.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", A), {
          versionInfo: A,
          updateInfo: A
        };
      this.updateInfoAndProvider = C, this.onUpdateAvailable(A);
      const T = new n.CancellationToken();
      return {
        versionInfo: A,
        updateInfo: A,
        cancellationToken: T,
        downloadPromise: this.autoDownload ? this.downloadUpdate(T) : null
      };
    }
    onUpdateAvailable(C) {
      this._logger.info(`Found version ${C.version} (url: ${(0, n.asArray)(C.files).map((A) => A.url).join(", ")})`), this.emit("update-available", C);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(C = new n.CancellationToken()) {
      const A = this.updateInfoAndProvider;
      if (A == null) {
        const E = new Error("Please check update first");
        return this.dispatchError(E), Promise.reject(E);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, n.asArray)(A.info.files).map((E) => E.url).join(", ")}`);
      const T = (E) => {
        if (!(E instanceof n.CancellationError))
          try {
            this.dispatchError(E);
          } catch (q) {
            this._logger.warn(`Cannot dispatch error event: ${q.stack || q}`);
          }
        return E;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: A,
        requestHeaders: this.computeRequestHeaders(A.provider),
        cancellationToken: C,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((E) => {
        throw T(E);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(C) {
      this.emit("error", C, (C.stack || C).toString());
    }
    dispatchUpdateDownloaded(C) {
      this.emit(p.UPDATE_DOWNLOADED, C);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, s.load)(await (0, u.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(C) {
      const A = C.fileExtraDownloadHeaders;
      if (A != null) {
        const T = this.requestHeaders;
        return T == null ? A : {
          ...A,
          ...T
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const C = c.join(this.app.userDataPath, ".updaterId");
      try {
        const T = await (0, u.readFile)(C, "utf-8");
        if (n.UUID.check(T))
          return T;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${T}`);
      } catch (T) {
        T.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${T}`);
      }
      const A = n.UUID.v5((0, f.randomBytes)(4096), n.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${A}`);
      try {
        await (0, u.outputFile)(C, A);
      } catch (T) {
        this._logger.warn(`Couldn't write out staging user ID: ${T}`);
      }
      return A;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const C = this.requestHeaders;
      if (C == null)
        return !0;
      for (const A of Object.keys(C)) {
        const T = A.toLowerCase();
        if (T === "authorization" || T === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let C = this.downloadedUpdateHelper;
      if (C == null) {
        const A = (await this.configOnDisk.value).updaterCacheDirName, T = this._logger;
        A == null && T.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const E = c.join(this.app.baseCachePath, A || this.app.name);
        T.debug != null && T.debug(`updater cache dir: ${E}`), C = new t.DownloadedUpdateHelper(E), this.downloadedUpdateHelper = C;
      }
      return C;
    }
    async executeDownload(C) {
      const A = C.fileInfo, T = {
        headers: C.downloadUpdateOptions.requestHeaders,
        cancellationToken: C.downloadUpdateOptions.cancellationToken,
        sha2: A.info.sha2,
        sha512: A.info.sha512
      };
      this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (T.onProgress = (ie) => this.emit(p.DOWNLOAD_PROGRESS, ie));
      const E = C.downloadUpdateOptions.updateInfoAndProvider.info, q = E.version, U = A.packageInfo;
      function L() {
        const ie = decodeURIComponent(C.fileInfo.url.pathname);
        return ie.endsWith(`.${C.fileExtension}`) ? c.basename(ie) : C.fileInfo.info.url;
      }
      const k = await this.getOrCreateDownloadHelper(), D = k.cacheDirForPendingUpdate;
      await (0, u.mkdir)(D, { recursive: !0 });
      const P = L();
      let F = c.join(D, P);
      const $ = U == null ? null : c.join(D, `package-${q}${c.extname(U.path) || ".7z"}`), J = async (ie) => (await k.setDownloadedFile(F, $, E, A, P, ie), await C.done({
        ...E,
        downloadedFile: F
      }), $ == null ? [F] : [F, $]), W = this._logger, ne = await k.validateDownloadedPath(F, E, A, W);
      if (ne != null)
        return F = ne, await J(!1);
      const ce = async () => (await k.clear().catch(() => {
      }), await (0, u.unlink)(F).catch(() => {
      })), ue = await (0, t.createTempUpdateFile)(`temp-${P}`, D, W);
      try {
        await C.task(ue, T, $, ce), await (0, n.retry)(() => (0, u.rename)(ue, F), 60, 500, 0, 0, (ie) => ie instanceof Error && /^EBUSY:/.test(ie.message));
      } catch (ie) {
        throw await ce(), ie instanceof n.CancellationError && (W.info("cancelled"), this.emit("update-cancelled", E)), ie;
      }
      return W.info(`New version ${q} has been downloaded to ${F}`), await J(!0);
    }
    async differentialDownloadInstaller(C, A, T, E, q) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const U = (0, m.blockmapFiles)(C.url, this.app.version, A.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${U[0]}", new: ${U[1]})`);
        const L = async (P) => {
          const F = await this.httpExecutor.downloadToBuffer(P, {
            headers: A.requestHeaders,
            cancellationToken: A.cancellationToken
          });
          if (F == null || F.length === 0)
            throw new Error(`Blockmap "${P.href}" is empty`);
          try {
            return JSON.parse((0, _.gunzipSync)(F).toString());
          } catch ($) {
            throw new Error(`Cannot parse blockmap "${P.href}", error: ${$}`);
          }
        }, k = {
          newUrl: C.url,
          oldFile: c.join(this.downloadedUpdateHelper.cacheDir, q),
          logger: this._logger,
          newFile: T,
          isUseMultipleRangeRequest: E.isUseMultipleRangeRequest,
          requestHeaders: A.requestHeaders,
          cancellationToken: A.cancellationToken
        };
        this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (k.onProgress = (P) => this.emit(p.DOWNLOAD_PROGRESS, P));
        const D = await Promise.all(U.map((P) => L(P)));
        return await new w.GenericDifferentialDownloader(C.info, this.httpExecutor, k).download(D[0], D[1]), !1;
      } catch (U) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${U.stack || U}`), this._testOnlyOptions != null)
          throw U;
        return !0;
      }
    }
  };
  St.AppUpdater = R;
  function O(M) {
    const C = (0, i.prerelease)(M);
    return C != null && C.length > 0;
  }
  class I {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(C) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(C) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(C) {
    }
  }
  return St.NoOpLogger = I, St;
}
var al;
function pr() {
  if (al) return jt;
  al = 1, Object.defineProperty(jt, "__esModule", { value: !0 }), jt.BaseUpdater = void 0;
  const n = Ur, f = sa();
  let h = class extends f.AppUpdater {
    constructor(u, s) {
      super(u, s), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(u = !1, s = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(u, u ? s : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Tt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(u) {
      return super.executeDownload({
        ...u,
        done: (s) => (this.dispatchUpdateDownloaded(s), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(u = !1, s = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, c = a && a.file ? process.platform === "linux" ? a.file.replace(/ /g, "\\ ") : a.file : null, i = a == null ? null : a.downloadedFileInfo;
      if (c == null || i == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${u}, isForceRunAfter: ${s}`), this.doInstall({
          installerPath: c,
          isSilent: u,
          isForceRunAfter: s,
          isAdminRightsRequired: i.isAdminRightsRequired
        });
      } catch (t) {
        return this.dispatchError(t), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((u) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (u !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${u}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: u } = this.app, s = `"${u} would like to update"`, a = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), c = [a];
      return /kdesudo/i.test(a) ? (c.push("--comment", s), c.push("-c")) : /gksudo/i.test(a) ? c.push("--message", s) : /pkexec/i.test(a) && c.push("--disable-internal-agent"), c.join(" ");
    }
    spawnSyncLog(u, s = [], a = {}) {
      return this._logger.info(`Executing: ${u} with args: ${s}`), (0, n.spawnSync)(u, s, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }).stdout.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(u, s = [], a = void 0, c = "ignore") {
      return this._logger.info(`Executing: ${u} with args: ${s}`), new Promise((i, t) => {
        try {
          const l = { stdio: c, env: a, detached: !0 }, o = (0, n.spawn)(u, s, l);
          o.on("error", (r) => {
            t(r);
          }), o.unref(), o.pid !== void 0 && i(!0);
        } catch (l) {
          t(l);
        }
      });
    }
  };
  return jt.BaseUpdater = h, jt;
}
var tr = {}, rr = {}, ol;
function tu() {
  if (ol) return rr;
  ol = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const n = /* @__PURE__ */ ht(), f = Zl(), h = Tl;
  let d = class extends f.DifferentialDownloader {
    async download() {
      const c = this.blockAwareFileInfo, i = c.size, t = i - (c.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(t, i - 1);
      const l = u(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await s(this.options.oldFile), l);
    }
  };
  rr.FileWithEmbeddedBlockMapDifferentialDownloader = d;
  function u(a) {
    return JSON.parse((0, h.inflateRawSync)(a).toString());
  }
  async function s(a) {
    const c = await (0, n.open)(a, "r");
    try {
      const i = (await (0, n.fstat)(c)).size, t = Buffer.allocUnsafe(4);
      await (0, n.read)(c, t, 0, t.length, i - t.length);
      const l = Buffer.allocUnsafe(t.readUInt32BE(0));
      return await (0, n.read)(c, l, 0, l.length, i - t.length - l.length), await (0, n.close)(c), u(l);
    } catch (i) {
      throw await (0, n.close)(c), i;
    }
  }
  return rr;
}
var sl;
function ll() {
  if (sl) return tr;
  sl = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.AppImageUpdater = void 0;
  const n = $e(), f = Ur, h = /* @__PURE__ */ ht(), d = dt, u = be, s = pr(), a = tu(), c = $t(), i = tt();
  let t = class extends s.BaseUpdater {
    constructor(o, r) {
      super(o, r);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(o) {
      const r = o.updateInfoAndProvider.provider, p = (0, i.findFile)(r.resolveFiles(o.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: p,
        downloadUpdateOptions: o,
        task: async (g, _) => {
          const m = process.env.APPIMAGE;
          if (m == null)
            throw (0, n.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let w = !1;
          try {
            const R = {
              newUrl: p.url,
              oldFile: m,
              logger: this._logger,
              newFile: g,
              isUseMultipleRangeRequest: r.isUseMultipleRangeRequest,
              requestHeaders: o.requestHeaders,
              cancellationToken: o.cancellationToken
            };
            this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (R.onProgress = (O) => this.emit(c.DOWNLOAD_PROGRESS, O)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(p.info, this.httpExecutor, R).download();
          } catch (R) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${R.stack || R}`), w = process.platform === "linux";
          }
          w && await this.httpExecutor.download(p.url, g, _), await (0, h.chmod)(g, 493);
        }
      });
    }
    doInstall(o) {
      const r = process.env.APPIMAGE;
      if (r == null)
        throw (0, n.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, d.unlinkSync)(r);
      let p;
      const g = u.basename(r);
      u.basename(o.installerPath) === g || !/\d+\.\d+\.\d+/.test(g) ? p = r : p = u.join(u.dirname(r), u.basename(o.installerPath)), (0, f.execFileSync)("mv", ["-f", o.installerPath, p]), p !== r && this.emit("appimage-filename-updated", p);
      const _ = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return o.isForceRunAfter ? this.spawnLog(p, [], _) : (_.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, f.execFileSync)(p, [], { env: _ })), !0;
    }
  };
  return tr.AppImageUpdater = t, tr;
}
var nr = {}, ul;
function cl() {
  if (ul) return nr;
  ul = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.DebUpdater = void 0;
  const n = pr(), f = $t(), h = tt();
  let d = class extends n.BaseUpdater {
    constructor(s, a) {
      super(s, a);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const a = s.updateInfoAndProvider.provider, c = (0, h.findFile)(a.resolveFiles(s.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: c,
        downloadUpdateOptions: s,
        task: async (i, t) => {
          this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (t.onProgress = (l) => this.emit(f.DOWNLOAD_PROGRESS, l)), await this.httpExecutor.download(c.url, i, t);
        }
      });
    }
    doInstall(s) {
      const a = this.wrapSudo(), c = /pkexec/i.test(a) ? "" : '"', i = ["dpkg", "-i", s.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${c}/bin/bash`, "-c", `'${i.join(" ")}'${c}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return nr.DebUpdater = d, nr;
}
var ir = {}, fl;
function dl() {
  if (fl) return ir;
  fl = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.RpmUpdater = void 0;
  const n = pr(), f = $t(), h = tt();
  let d = class extends n.BaseUpdater {
    constructor(s, a) {
      super(s, a);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const a = s.updateInfoAndProvider.provider, c = (0, h.findFile)(a.resolveFiles(s.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: c,
        downloadUpdateOptions: s,
        task: async (i, t) => {
          this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (t.onProgress = (l) => this.emit(f.DOWNLOAD_PROGRESS, l)), await this.httpExecutor.download(c.url, i, t);
        }
      });
    }
    doInstall(s) {
      const a = s.installerPath, c = this.wrapSudo(), i = /pkexec/i.test(c) ? "" : '"', t = this.spawnSyncLog("which zypper");
      let l;
      return t ? l = [t, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", a] : l = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", a], this.spawnSyncLog(c, [`${i}/bin/bash`, "-c", `'${l.join(" ")}'${i}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return ir.RpmUpdater = d, ir;
}
var ar = {}, hl;
function pl() {
  if (hl) return ar;
  hl = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.MacUpdater = void 0;
  const n = $e(), f = /* @__PURE__ */ ht(), h = dt, d = be, u = Qu, s = sa(), a = tt(), c = Ur, i = ur;
  let t = class extends s.AppUpdater {
    constructor(o, r) {
      super(o, r), this.nativeUpdater = Tt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (p) => {
        this._logger.warn(p), this.emit("error", p);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(o) {
      this._logger.debug != null && this._logger.debug(o);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((o) => {
        o && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(o) {
      let r = o.updateInfoAndProvider.provider.resolveFiles(o.updateInfoAndProvider.info);
      const p = this._logger, g = "sysctl.proc_translated";
      let _ = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), _ = (0, c.execFileSync)("sysctl", [g], { encoding: "utf8" }).includes(`${g}: 1`), p.info(`Checked for macOS Rosetta environment (isRosetta=${_})`);
      } catch (M) {
        p.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${M}`);
      }
      let m = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const C = (0, c.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        p.info(`Checked 'uname -a': arm64=${C}`), m = m || C;
      } catch (M) {
        p.warn(`uname shell command to check for arm64 failed: ${M}`);
      }
      m = m || process.arch === "arm64" || _;
      const w = (M) => {
        var C;
        return M.url.pathname.includes("arm64") || ((C = M.info.url) === null || C === void 0 ? void 0 : C.includes("arm64"));
      };
      m && r.some(w) ? r = r.filter((M) => m === w(M)) : r = r.filter((M) => !w(M));
      const R = (0, a.findFile)(r, "zip", ["pkg", "dmg"]);
      if (R == null)
        throw (0, n.newError)(`ZIP file not provided: ${(0, n.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const O = o.updateInfoAndProvider.provider, I = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: R,
        downloadUpdateOptions: o,
        task: async (M, C) => {
          const A = d.join(this.downloadedUpdateHelper.cacheDir, I), T = () => (0, f.pathExistsSync)(A) ? !o.disableDifferentialDownload : (p.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let E = !0;
          T() && (E = await this.differentialDownloadInstaller(R, o, M, O, I)), E && await this.httpExecutor.download(R.url, M, C);
        },
        done: (M) => {
          if (!o.disableDifferentialDownload)
            try {
              const C = d.join(this.downloadedUpdateHelper.cacheDir, I);
              (0, h.copyFileSync)(M.downloadedFile, C);
            } catch (C) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${C.message}`);
            }
          return this.updateDownloaded(R, M);
        }
      });
    }
    async updateDownloaded(o, r) {
      var p;
      const g = r.downloadedFile, _ = (p = o.info.size) !== null && p !== void 0 ? p : (await (0, f.stat)(g)).size, m = this._logger, w = `fileToProxy=${o.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${w})`), this.server = (0, u.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${w})`), this.server.on("close", () => {
        m.info(`Proxy server for native Squirrel.Mac is closed (${w})`);
      });
      const R = (O) => {
        const I = O.address();
        return typeof I == "string" ? I : `http://127.0.0.1:${I == null ? void 0 : I.port}`;
      };
      return await new Promise((O, I) => {
        const M = (0, i.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), C = Buffer.from(`autoupdater:${M}`, "ascii"), A = `/${(0, i.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (T, E) => {
          const q = T.url;
          if (m.info(`${q} requested`), q === "/") {
            if (!T.headers.authorization || T.headers.authorization.indexOf("Basic ") === -1) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), m.warn("No authenthication info");
              return;
            }
            const k = T.headers.authorization.split(" ")[1], D = Buffer.from(k, "base64").toString("ascii"), [P, F] = D.split(":");
            if (P !== "autoupdater" || F !== M) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), m.warn("Invalid authenthication credentials");
              return;
            }
            const $ = Buffer.from(`{ "url": "${R(this.server)}${A}" }`);
            E.writeHead(200, { "Content-Type": "application/json", "Content-Length": $.length }), E.end($);
            return;
          }
          if (!q.startsWith(A)) {
            m.warn(`${q} requested, but not supported`), E.writeHead(404), E.end();
            return;
          }
          m.info(`${A} requested by Squirrel.Mac, pipe ${g}`);
          let U = !1;
          E.on("finish", () => {
            U || (this.nativeUpdater.removeListener("error", I), O([]));
          });
          const L = (0, h.createReadStream)(g);
          L.on("error", (k) => {
            try {
              E.end();
            } catch (D) {
              m.warn(`cannot end response: ${D}`);
            }
            U = !0, this.nativeUpdater.removeListener("error", I), I(new Error(`Cannot pipe "${g}": ${k}`));
          }), E.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": _
          }), L.pipe(E);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${w})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${R(this.server)}, ${w})`), this.nativeUpdater.setFeedURL({
            url: R(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${C.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", I), this.nativeUpdater.checkForUpdates()) : O([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return ar.MacUpdater = t, ar;
}
var or = {}, Fr = {}, ml;
function Tf() {
  if (ml) return Fr;
  ml = 1, Object.defineProperty(Fr, "__esModule", { value: !0 }), Fr.verifySignature = u;
  const n = $e(), f = Ur, h = Lr, d = be;
  function u(i, t, l) {
    return new Promise((o, r) => {
      const p = t.replace(/'/g, "''");
      l.info(`Verifying signature ${p}`), (0, f.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${p}' | ConvertTo-Json -Compress"`], {
        shell: !0,
        timeout: 20 * 1e3
      }, (g, _, m) => {
        var w;
        try {
          if (g != null || m) {
            a(l, g, m, r), o(null);
            return;
          }
          const R = s(_);
          if (R.Status === 0) {
            try {
              const C = d.normalize(R.Path), A = d.normalize(t);
              if (l.info(`LiteralPath: ${C}. Update Path: ${A}`), C !== A) {
                a(l, new Error(`LiteralPath of ${C} is different than ${A}`), m, r), o(null);
                return;
              }
            } catch (C) {
              l.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(w = C.message) !== null && w !== void 0 ? w : C.stack}`);
            }
            const I = (0, n.parseDn)(R.SignerCertificate.Subject);
            let M = !1;
            for (const C of i) {
              const A = (0, n.parseDn)(C);
              if (A.size ? M = Array.from(A.keys()).every((E) => A.get(E) === I.get(E)) : C === I.get("CN") && (l.warn(`Signature validated using only CN ${C}. Please add your full Distinguished Name (DN) to publisherNames configuration`), M = !0), M) {
                o(null);
                return;
              }
            }
          }
          const O = `publisherNames: ${i.join(" | ")}, raw info: ` + JSON.stringify(R, (I, M) => I === "RawData" ? void 0 : M, 2);
          l.warn(`Sign verification failed, installer signed with incorrect certificate: ${O}`), o(O);
        } catch (R) {
          a(l, R, null, r), o(null);
          return;
        }
      });
    });
  }
  function s(i) {
    const t = JSON.parse(i);
    delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
    const l = t.SignerCertificate;
    return l != null && (delete l.Archived, delete l.Extensions, delete l.Handle, delete l.HasPrivateKey, delete l.SubjectName), t;
  }
  function a(i, t, l, o) {
    if (c()) {
      i.warn(`Cannot execute Get-AuthenticodeSignature: ${t || l}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, f.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
    } catch (r) {
      i.warn(`Cannot execute ConvertTo-Json: ${r.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    t != null && o(t), l && o(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${l}. Failing signature validation due to unknown stderr.`));
  }
  function c() {
    const i = h.release();
    return i.startsWith("6.") && !i.startsWith("6.3");
  }
  return Fr;
}
var gl;
function vl() {
  if (gl) return or;
  gl = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.NsisUpdater = void 0;
  const n = $e(), f = be, h = pr(), d = tu(), u = $t(), s = tt(), a = /* @__PURE__ */ ht(), c = Tf(), i = Ft;
  let t = class extends h.BaseUpdater {
    constructor(o, r) {
      super(o, r), this._verifyUpdateCodeSignature = (p, g) => (0, c.verifySignature)(p, g, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(o) {
      o && (this._verifyUpdateCodeSignature = o);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const r = o.updateInfoAndProvider.provider, p = (0, s.findFile)(r.resolveFiles(o.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: o,
        fileInfo: p,
        task: async (g, _, m, w) => {
          const R = p.packageInfo, O = R != null && m != null;
          if (O && o.disableWebInstaller)
            throw (0, n.newError)(`Unable to download new version ${o.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !O && !o.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (O || o.disableDifferentialDownload || await this.differentialDownloadInstaller(p, o, g, r, n.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(p.url, g, _);
          const I = await this.verifySignature(g);
          if (I != null)
            throw await w(), (0, n.newError)(`New version ${o.updateInfoAndProvider.info.version} is not signed by the application owner: ${I}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (O && await this.differentialDownloadWebPackage(o, R, m, r))
            try {
              await this.httpExecutor.download(new i.URL(R.path), m, {
                headers: o.requestHeaders,
                cancellationToken: o.cancellationToken,
                sha512: R.sha512
              });
            } catch (M) {
              try {
                await (0, a.unlink)(m);
              } catch {
              }
              throw M;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(o) {
      let r;
      try {
        if (r = (await this.configOnDisk.value).publisherName, r == null)
          return null;
      } catch (p) {
        if (p.code === "ENOENT")
          return null;
        throw p;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], o);
    }
    doInstall(o) {
      const r = ["--updated"];
      o.isSilent && r.push("/S"), o.isForceRunAfter && r.push("--force-run"), this.installDirectory && r.push(`/D=${this.installDirectory}`);
      const p = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      p != null && r.push(`--package-file=${p}`);
      const g = () => {
        this.spawnLog(f.join(process.resourcesPath, "elevate.exe"), [o.installerPath].concat(r)).catch((_) => this.dispatchError(_));
      };
      return o.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), g(), !0) : (this.spawnLog(o.installerPath, r).catch((_) => {
        const m = _.code;
        this._logger.info(`Cannot run installer: error code: ${m}, error message: "${_.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), m === "UNKNOWN" || m === "EACCES" ? g() : m === "ENOENT" ? Tt.shell.openPath(o.installerPath).catch((w) => this.dispatchError(w)) : this.dispatchError(_);
      }), !0);
    }
    async differentialDownloadWebPackage(o, r, p, g) {
      if (r.blockMapSize == null)
        return !0;
      try {
        const _ = {
          newUrl: new i.URL(r.path),
          oldFile: f.join(this.downloadedUpdateHelper.cacheDir, n.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: p,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          cancellationToken: o.cancellationToken
        };
        this.listenerCount(u.DOWNLOAD_PROGRESS) > 0 && (_.onProgress = (m) => this.emit(u.DOWNLOAD_PROGRESS, m)), await new d.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, _).download();
      } catch (_) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${_.stack || _}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return or.NsisUpdater = t, or;
}
var El;
function $t() {
  return El || (El = 1, function(n) {
    Object.defineProperty(n, "__esModule", { value: !0 }), n.UpdaterSignal = n.UPDATE_DOWNLOADED = n.DOWNLOAD_PROGRESS = n.NsisUpdater = n.MacUpdater = n.RpmUpdater = n.DebUpdater = n.AppImageUpdater = n.Provider = n.CancellationToken = n.NoOpLogger = n.AppUpdater = n.BaseUpdater = void 0;
    const f = $e();
    Object.defineProperty(n, "CancellationToken", { enumerable: !0, get: function() {
      return f.CancellationToken;
    } });
    const h = /* @__PURE__ */ ht(), d = be;
    var u = pr();
    Object.defineProperty(n, "BaseUpdater", { enumerable: !0, get: function() {
      return u.BaseUpdater;
    } });
    var s = sa();
    Object.defineProperty(n, "AppUpdater", { enumerable: !0, get: function() {
      return s.AppUpdater;
    } }), Object.defineProperty(n, "NoOpLogger", { enumerable: !0, get: function() {
      return s.NoOpLogger;
    } });
    var a = tt();
    Object.defineProperty(n, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var c = ll();
    Object.defineProperty(n, "AppImageUpdater", { enumerable: !0, get: function() {
      return c.AppImageUpdater;
    } });
    var i = cl();
    Object.defineProperty(n, "DebUpdater", { enumerable: !0, get: function() {
      return i.DebUpdater;
    } });
    var t = dl();
    Object.defineProperty(n, "RpmUpdater", { enumerable: !0, get: function() {
      return t.RpmUpdater;
    } });
    var l = pl();
    Object.defineProperty(n, "MacUpdater", { enumerable: !0, get: function() {
      return l.MacUpdater;
    } });
    var o = vl();
    Object.defineProperty(n, "NsisUpdater", { enumerable: !0, get: function() {
      return o.NsisUpdater;
    } });
    let r;
    function p() {
      if (process.platform === "win32")
        r = new (vl()).NsisUpdater();
      else if (process.platform === "darwin")
        r = new (pl()).MacUpdater();
      else {
        r = new (ll()).AppImageUpdater();
        try {
          const m = d.join(process.resourcesPath, "package-type");
          if (!(0, h.existsSync)(m))
            return r;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const w = (0, h.readFileSync)(m).toString().trim();
          switch (console.info("Found package-type:", w), w) {
            case "deb":
              r = new (cl()).DebUpdater();
              break;
            case "rpm":
              r = new (dl()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (m) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", m.message);
        }
      }
      return r;
    }
    Object.defineProperty(n, "autoUpdater", {
      enumerable: !0,
      get: () => r || p()
    }), n.DOWNLOAD_PROGRESS = "download-progress", n.UPDATE_DOWNLOADED = "update-downloaded";
    class g {
      constructor(w) {
        this.emitter = w;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(w) {
        _(this.emitter, "login", w);
      }
      progress(w) {
        _(this.emitter, n.DOWNLOAD_PROGRESS, w);
      }
      updateDownloaded(w) {
        _(this.emitter, n.UPDATE_DOWNLOADED, w);
      }
      updateCancelled(w) {
        _(this.emitter, "update-cancelled", w);
      }
    }
    n.UpdaterSignal = g;
    function _(m, w, R) {
      m.on(w, R);
    }
  }(Vr)), Vr;
}
var la = $t();
const Rf = Xu(import.meta.url), Vi = be.dirname(Rf);
let Xe;
const yl = () => {
  Xe = new wl({
    width: 1920,
    height: 1080,
    icon: be.join(Vi, "../src/assets/icons/waypoint_logo.ico"),
    webPreferences: {
      preload: be.join(Vi, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !0,
      webviewTag: !0,
      sandbox: !1,
      webSecurity: !1
    },
    frame: !1,
    backgroundColor: "#1f1f28"
  });
  const f = process.env.VITE_DEV_SERVER_URL !== void 0 ? process.env.VITE_DEV_SERVER_URL : `file://${be.join(Vi, "../dist-electron/index.html")}`;
  Xe.loadURL(f);
};
lr.whenReady().then(() => {
  yl(), lr.on("activate", () => {
    wl.getAllWindows().length === 0 && yl();
  });
});
xr.on("minimize-window", () => {
  Xe && Xe.minimize();
});
xr.on("maximize-window", () => {
  Xe && (Xe.isMaximized() ? Xe.unmaximize() : Xe.maximize());
});
xr.on("close-window", () => {
  Xe && Xe.close();
});
lr.on("window-all-closed", () => {
  process.platform !== "darwin" && lr.quit();
});
la.autoUpdater.on("update-available", () => {
  Xe.webContents.send("update_available");
});
la.autoUpdater.on("update-downloaded", () => {
  Xe.webContents.send("update_downloaded");
});
la.autoUpdater.checkForUpdatesAndNotify();
xr.on("app_version", (n) => {
  n.sender.send("app_version", { version: lr.getVersion() });
});
