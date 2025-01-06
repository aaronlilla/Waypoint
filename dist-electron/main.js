var df = Object.defineProperty;
var hf = (o, h, d) => h in o ? df(o, h, { enumerable: !0, configurable: !0, writable: !0, value: d }) : o[h] = d;
var Ae = (o, h, d) => hf(o, typeof h != "symbol" ? h + "" : h, d);
import mt, { app as Ut, BrowserWindow as Du, ipcMain as Br } from "electron";
import be from "path";
import qt, { fileURLToPath as pf } from "url";
import jr from "events";
import pr from "crypto";
import Iu from "tty";
import Hr from "util";
import gt from "os";
import Ye from "fs";
import mr from "stream";
import mf from "string_decoder";
import gf from "constants";
import Nu from "assert";
import gr from "child_process";
import Fu from "zlib";
import xu from "http";
import vf from "https";
var et = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function yf(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var en = {}, tn = {}, Rt = {}, rs;
function Do() {
  if (rs) return Rt;
  rs = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.CancellationError = Rt.CancellationToken = void 0;
  const o = jr;
  let h = class extends o.EventEmitter {
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
        return Promise.reject(new d());
      const n = () => {
        if (e != null)
          try {
            this.removeListener("cancel", e), e = null;
          } catch {
          }
      };
      let e = null;
      return new Promise((i, t) => {
        let r = null;
        if (e = () => {
          try {
            r != null && (r(), r = null);
          } finally {
            t(new d());
          }
        }, this.cancelled) {
          e();
          return;
        }
        this.onCancel(e), u(i, t, (c) => {
          r = c;
        });
      }).then((i) => (n(), i)).catch((i) => {
        throw n(), i;
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
  Rt.CancellationToken = h;
  class d extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return Rt.CancellationError = d, Rt;
}
var je = {}, Or = { exports: {} }, Pr = { exports: {} }, rn, ns;
function Ef() {
  if (ns) return rn;
  ns = 1;
  var o = 1e3, h = o * 60, d = h * 60, f = d * 24, u = f * 7, n = f * 365.25;
  rn = function(c, l) {
    l = l || {};
    var s = typeof c;
    if (s === "string" && c.length > 0)
      return e(c);
    if (s === "number" && isFinite(c))
      return l.long ? t(c) : i(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function e(c) {
    if (c = String(c), !(c.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (l) {
        var s = parseFloat(l[1]), p = (l[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return s * n;
          case "weeks":
          case "week":
          case "w":
            return s * u;
          case "days":
          case "day":
          case "d":
            return s * f;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return s * d;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return s * h;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return s * o;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return s;
          default:
            return;
        }
      }
    }
  }
  function i(c) {
    var l = Math.abs(c);
    return l >= f ? Math.round(c / f) + "d" : l >= d ? Math.round(c / d) + "h" : l >= h ? Math.round(c / h) + "m" : l >= o ? Math.round(c / o) + "s" : c + "ms";
  }
  function t(c) {
    var l = Math.abs(c);
    return l >= f ? r(c, l, f, "day") : l >= d ? r(c, l, d, "hour") : l >= h ? r(c, l, h, "minute") : l >= o ? r(c, l, o, "second") : c + " ms";
  }
  function r(c, l, s, p) {
    var g = l >= s * 1.5;
    return Math.round(c / s) + " " + p + (g ? "s" : "");
  }
  return rn;
}
var nn, is;
function Lu() {
  if (is) return nn;
  is = 1;
  function o(h) {
    f.debug = f, f.default = f, f.coerce = r, f.disable = i, f.enable = n, f.enabled = t, f.humanize = Ef(), f.destroy = c, Object.keys(h).forEach((l) => {
      f[l] = h[l];
    }), f.names = [], f.skips = [], f.formatters = {};
    function d(l) {
      let s = 0;
      for (let p = 0; p < l.length; p++)
        s = (s << 5) - s + l.charCodeAt(p), s |= 0;
      return f.colors[Math.abs(s) % f.colors.length];
    }
    f.selectColor = d;
    function f(l) {
      let s, p = null, g, E;
      function m(...w) {
        if (!m.enabled)
          return;
        const T = m, O = Number(/* @__PURE__ */ new Date()), P = O - (s || O);
        T.diff = P, T.prev = s, T.curr = O, s = O, w[0] = f.coerce(w[0]), typeof w[0] != "string" && w.unshift("%O");
        let U = 0;
        w[0] = w[0].replace(/%([a-zA-Z%])/g, (S, b) => {
          if (S === "%%")
            return "%";
          U++;
          const y = f.formatters[b];
          if (typeof y == "function") {
            const M = w[U];
            S = y.call(T, M), w.splice(U, 1), U--;
          }
          return S;
        }), f.formatArgs.call(T, w), (T.log || f.log).apply(T, w);
      }
      return m.namespace = l, m.useColors = f.useColors(), m.color = f.selectColor(l), m.extend = u, m.destroy = f.destroy, Object.defineProperty(m, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (g !== f.namespaces && (g = f.namespaces, E = f.enabled(l)), E),
        set: (w) => {
          p = w;
        }
      }), typeof f.init == "function" && f.init(m), m;
    }
    function u(l, s) {
      const p = f(this.namespace + (typeof s > "u" ? ":" : s) + l);
      return p.log = this.log, p;
    }
    function n(l) {
      f.save(l), f.namespaces = l, f.names = [], f.skips = [];
      const s = (typeof l == "string" ? l : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const p of s)
        p[0] === "-" ? f.skips.push(p.slice(1)) : f.names.push(p);
    }
    function e(l, s) {
      let p = 0, g = 0, E = -1, m = 0;
      for (; p < l.length; )
        if (g < s.length && (s[g] === l[p] || s[g] === "*"))
          s[g] === "*" ? (E = g, m = p, g++) : (p++, g++);
        else if (E !== -1)
          g = E + 1, m++, p = m;
        else
          return !1;
      for (; g < s.length && s[g] === "*"; )
        g++;
      return g === s.length;
    }
    function i() {
      const l = [
        ...f.names,
        ...f.skips.map((s) => "-" + s)
      ].join(",");
      return f.enable(""), l;
    }
    function t(l) {
      for (const s of f.skips)
        if (e(l, s))
          return !1;
      for (const s of f.names)
        if (e(l, s))
          return !0;
      return !1;
    }
    function r(l) {
      return l instanceof Error ? l.stack || l.message : l;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return f.enable(f.load()), f;
  }
  return nn = o, nn;
}
var os;
function wf() {
  return os || (os = 1, function(o, h) {
    h.formatArgs = f, h.save = u, h.load = n, h.useColors = d, h.storage = e(), h.destroy = /* @__PURE__ */ (() => {
      let t = !1;
      return () => {
        t || (t = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), h.colors = [
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
    function d() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let t;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (t = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(t[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function f(t) {
      if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + o.exports.humanize(this.diff), !this.useColors)
        return;
      const r = "color: " + this.color;
      t.splice(1, 0, r, "color: inherit");
      let c = 0, l = 0;
      t[0].replace(/%[a-zA-Z%]/g, (s) => {
        s !== "%%" && (c++, s === "%c" && (l = c));
      }), t.splice(l, 0, r);
    }
    h.log = console.debug || console.log || (() => {
    });
    function u(t) {
      try {
        t ? h.storage.setItem("debug", t) : h.storage.removeItem("debug");
      } catch {
      }
    }
    function n() {
      let t;
      try {
        t = h.storage.getItem("debug");
      } catch {
      }
      return !t && typeof process < "u" && "env" in process && (t = process.env.DEBUG), t;
    }
    function e() {
      try {
        return localStorage;
      } catch {
      }
    }
    o.exports = Lu()(h);
    const { formatters: i } = o.exports;
    i.j = function(t) {
      try {
        return JSON.stringify(t);
      } catch (r) {
        return "[UnexpectedJSONParseError]: " + r.message;
      }
    };
  }(Pr, Pr.exports)), Pr.exports;
}
var Dr = { exports: {} }, on, ss;
function _f() {
  return ss || (ss = 1, on = (o, h = process.argv) => {
    const d = o.startsWith("-") ? "" : o.length === 1 ? "-" : "--", f = h.indexOf(d + o), u = h.indexOf("--");
    return f !== -1 && (u === -1 || f < u);
  }), on;
}
var sn, as;
function Sf() {
  if (as) return sn;
  as = 1;
  const o = gt, h = Iu, d = _f(), { env: f } = process;
  let u;
  d("no-color") || d("no-colors") || d("color=false") || d("color=never") ? u = 0 : (d("color") || d("colors") || d("color=true") || d("color=always")) && (u = 1), "FORCE_COLOR" in f && (f.FORCE_COLOR === "true" ? u = 1 : f.FORCE_COLOR === "false" ? u = 0 : u = f.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(f.FORCE_COLOR, 10), 3));
  function n(t) {
    return t === 0 ? !1 : {
      level: t,
      hasBasic: !0,
      has256: t >= 2,
      has16m: t >= 3
    };
  }
  function e(t, r) {
    if (u === 0)
      return 0;
    if (d("color=16m") || d("color=full") || d("color=truecolor"))
      return 3;
    if (d("color=256"))
      return 2;
    if (t && !r && u === void 0)
      return 0;
    const c = u || 0;
    if (f.TERM === "dumb")
      return c;
    if (process.platform === "win32") {
      const l = o.release().split(".");
      return Number(l[0]) >= 10 && Number(l[2]) >= 10586 ? Number(l[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in f)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((l) => l in f) || f.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in f)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(f.TEAMCITY_VERSION) ? 1 : 0;
    if (f.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in f) {
      const l = parseInt((f.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (f.TERM_PROGRAM) {
        case "iTerm.app":
          return l >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(f.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(f.TERM) || "COLORTERM" in f ? 1 : c;
  }
  function i(t) {
    const r = e(t, t && t.isTTY);
    return n(r);
  }
  return sn = {
    supportsColor: i,
    stdout: n(e(!0, h.isatty(1))),
    stderr: n(e(!0, h.isatty(2)))
  }, sn;
}
var ls;
function Af() {
  return ls || (ls = 1, function(o, h) {
    const d = Iu, f = Hr;
    h.init = c, h.log = i, h.formatArgs = n, h.save = t, h.load = r, h.useColors = u, h.destroy = f.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), h.colors = [6, 2, 3, 4, 5, 1];
    try {
      const s = Sf();
      s && (s.stderr || s).level >= 2 && (h.colors = [
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
    h.inspectOpts = Object.keys(process.env).filter((s) => /^debug_/i.test(s)).reduce((s, p) => {
      const g = p.substring(6).toLowerCase().replace(/_([a-z])/g, (m, w) => w.toUpperCase());
      let E = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(E) ? E = !0 : /^(no|off|false|disabled)$/i.test(E) ? E = !1 : E === "null" ? E = null : E = Number(E), s[g] = E, s;
    }, {});
    function u() {
      return "colors" in h.inspectOpts ? !!h.inspectOpts.colors : d.isatty(process.stderr.fd);
    }
    function n(s) {
      const { namespace: p, useColors: g } = this;
      if (g) {
        const E = this.color, m = "\x1B[3" + (E < 8 ? E : "8;5;" + E), w = `  ${m};1m${p} \x1B[0m`;
        s[0] = w + s[0].split(`
`).join(`
` + w), s.push(m + "m+" + o.exports.humanize(this.diff) + "\x1B[0m");
      } else
        s[0] = e() + p + " " + s[0];
    }
    function e() {
      return h.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function i(...s) {
      return process.stderr.write(f.formatWithOptions(h.inspectOpts, ...s) + `
`);
    }
    function t(s) {
      s ? process.env.DEBUG = s : delete process.env.DEBUG;
    }
    function r() {
      return process.env.DEBUG;
    }
    function c(s) {
      s.inspectOpts = {};
      const p = Object.keys(h.inspectOpts);
      for (let g = 0; g < p.length; g++)
        s.inspectOpts[p[g]] = h.inspectOpts[p[g]];
    }
    o.exports = Lu()(h);
    const { formatters: l } = o.exports;
    l.o = function(s) {
      return this.inspectOpts.colors = this.useColors, f.inspect(s, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, l.O = function(s) {
      return this.inspectOpts.colors = this.useColors, f.inspect(s, this.inspectOpts);
    };
  }(Dr, Dr.exports)), Dr.exports;
}
var us;
function bf() {
  return us || (us = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Or.exports = wf() : Or.exports = Af()), Or.exports;
}
var Ir = {}, cs;
function Gr() {
  if (cs) return Ir;
  cs = 1, Object.defineProperty(Ir, "__esModule", { value: !0 }), Ir.newError = o;
  function o(h, d) {
    const f = new Error(h);
    return f.code = d, f;
  }
  return Ir;
}
var Wt = {}, fs;
function $u() {
  if (fs) return Wt;
  fs = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.ProgressCallbackTransform = void 0;
  const o = mr;
  let h = class extends o.Transform {
    constructor(f, u, n) {
      super(), this.total = f, this.cancellationToken = u, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(f, u, n) {
      if (this.cancellationToken.cancelled) {
        n(new Error("cancelled"), null);
        return;
      }
      this.transferred += f.length, this.delta += f.length;
      const e = Date.now();
      e >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = e + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((e - this.start) / 1e3))
      }), this.delta = 0), n(null, f);
    }
    _flush(f) {
      if (this.cancellationToken.cancelled) {
        f(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, f(null);
    }
  };
  return Wt.ProgressCallbackTransform = h, Wt;
}
var ds;
function Rf() {
  if (ds) return je;
  ds = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.DigestTransform = je.HttpExecutor = je.HttpError = void 0, je.createHttpError = r, je.parseJson = s, je.configureRequestOptionsFromUrl = g, je.configureRequestUrl = E, je.safeGetHeader = T, je.configureRequestOptions = P, je.safeStringifyJson = U;
  const o = pr, h = bf(), d = Ye, f = mr, u = qt, n = Do(), e = Gr(), i = $u(), t = (0, h.default)("electron-builder");
  function r(R, S = null) {
    return new l(R.statusCode || -1, `${R.statusCode} ${R.statusMessage}` + (S == null ? "" : `
` + JSON.stringify(S, null, "  ")) + `
Headers: ` + U(R.headers), S);
  }
  const c = /* @__PURE__ */ new Map([
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
  class l extends Error {
    constructor(S, b = `HTTP error: ${c.get(S) || S}`, y = null) {
      super(b), this.statusCode = S, this.description = y, this.name = "HttpError", this.code = `HTTP_ERROR_${S}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  je.HttpError = l;
  function s(R) {
    return R.then((S) => S == null || S.length === 0 ? null : JSON.parse(S));
  }
  class p {
    constructor() {
      this.maxRedirects = 10;
    }
    request(S, b = new n.CancellationToken(), y) {
      P(S);
      const M = y == null ? void 0 : JSON.stringify(y), $ = M ? Buffer.from(M) : void 0;
      if ($ != null) {
        t(M);
        const { headers: L, ...k } = S;
        S = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": $.length,
            ...L
          },
          ...k
        };
      }
      return this.doApiRequest(S, b, (L) => L.end($));
    }
    doApiRequest(S, b, y, M = 0) {
      return t.enabled && t(`Request: ${U(S)}`), b.createPromise(($, L, k) => {
        const I = this.createRequest(S, (D) => {
          try {
            this.handleResponse(D, S, b, $, L, M, y);
          } catch (F) {
            L(F);
          }
        });
        this.addErrorAndTimeoutHandlers(I, L, S.timeout), this.addRedirectHandlers(I, S, L, M, (D) => {
          this.doApiRequest(D, b, y, M).then($).catch(L);
        }), y(I, L), k(() => I.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(S, b, y, M, $) {
    }
    addErrorAndTimeoutHandlers(S, b, y = 60 * 1e3) {
      this.addTimeOutHandler(S, b, y), S.on("error", b), S.on("aborted", () => {
        b(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(S, b, y, M, $, L, k) {
      var I;
      if (t.enabled && t(`Response: ${S.statusCode} ${S.statusMessage}, request options: ${U(b)}`), S.statusCode === 404) {
        $(r(S, `method: ${b.method || "GET"} url: ${b.protocol || "https:"}//${b.hostname}${b.port ? `:${b.port}` : ""}${b.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (S.statusCode === 204) {
        M();
        return;
      }
      const D = (I = S.statusCode) !== null && I !== void 0 ? I : 0, F = D >= 300 && D < 400, q = T(S, "location");
      if (F && q != null) {
        if (L > this.maxRedirects) {
          $(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(p.prepareRedirectUrlOptions(q, b), y, k, L).then(M).catch($);
        return;
      }
      S.setEncoding("utf8");
      let K = "";
      S.on("error", $), S.on("data", (W) => K += W), S.on("end", () => {
        try {
          if (S.statusCode != null && S.statusCode >= 400) {
            const W = T(S, "content-type"), ne = W != null && (Array.isArray(W) ? W.find((ce) => ce.includes("json")) != null : W.includes("json"));
            $(r(S, `method: ${b.method || "GET"} url: ${b.protocol || "https:"}//${b.hostname}${b.port ? `:${b.port}` : ""}${b.path}

          Data:
          ${ne ? JSON.stringify(JSON.parse(K)) : K}
          `));
          } else
            M(K.length === 0 ? null : K);
        } catch (W) {
          $(W);
        }
      });
    }
    async downloadToBuffer(S, b) {
      return await b.cancellationToken.createPromise((y, M, $) => {
        const L = [], k = {
          headers: b.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        E(S, k), P(k), this.doDownload(k, {
          destination: null,
          options: b,
          onCancel: $,
          callback: (I) => {
            I == null ? y(Buffer.concat(L)) : M(I);
          },
          responseHandler: (I, D) => {
            let F = 0;
            I.on("data", (q) => {
              if (F += q.length, F > 524288e3) {
                D(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              L.push(q);
            }), I.on("end", () => {
              D(null);
            });
          }
        }, 0);
      });
    }
    doDownload(S, b, y) {
      const M = this.createRequest(S, ($) => {
        if ($.statusCode >= 400) {
          b.callback(new Error(`Cannot download "${S.protocol || "https:"}//${S.hostname}${S.path}", status ${$.statusCode}: ${$.statusMessage}`));
          return;
        }
        $.on("error", b.callback);
        const L = T($, "location");
        if (L != null) {
          y < this.maxRedirects ? this.doDownload(p.prepareRedirectUrlOptions(L, S), b, y++) : b.callback(this.createMaxRedirectError());
          return;
        }
        b.responseHandler == null ? O(b, $) : b.responseHandler($, b.callback);
      });
      this.addErrorAndTimeoutHandlers(M, b.callback, S.timeout), this.addRedirectHandlers(M, S, b.callback, y, ($) => {
        this.doDownload($, b, y++);
      }), M.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(S, b, y) {
      S.on("socket", (M) => {
        M.setTimeout(y, () => {
          S.abort(), b(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(S, b) {
      const y = g(S, { ...b }), M = y.headers;
      if (M != null && M.authorization) {
        const $ = new u.URL(S);
        ($.hostname.endsWith(".amazonaws.com") || $.searchParams.has("X-Amz-Credential")) && delete M.authorization;
      }
      return y;
    }
    static retryOnServerError(S, b = 3) {
      for (let y = 0; ; y++)
        try {
          return S();
        } catch (M) {
          if (y < b && (M instanceof l && M.isServerError() || M.code === "EPIPE"))
            continue;
          throw M;
        }
    }
  }
  je.HttpExecutor = p;
  function g(R, S) {
    const b = P(S);
    return E(new u.URL(R), b), b;
  }
  function E(R, S) {
    S.protocol = R.protocol, S.hostname = R.hostname, R.port ? S.port = R.port : S.port && delete S.port, S.path = R.pathname + R.search;
  }
  class m extends f.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(S, b = "sha512", y = "base64") {
      super(), this.expected = S, this.algorithm = b, this.encoding = y, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, o.createHash)(b);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(S, b, y) {
      this.digester.update(S), y(null, S);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(S) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (b) {
          S(b);
          return;
        }
      S(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, e.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, e.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  je.DigestTransform = m;
  function w(R, S, b) {
    return R != null && S != null && R !== S ? (b(new Error(`checksum mismatch: expected ${S} but got ${R} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function T(R, S) {
    const b = R.headers[S];
    return b == null ? null : Array.isArray(b) ? b.length === 0 ? null : b[b.length - 1] : b;
  }
  function O(R, S) {
    if (!w(T(S, "X-Checksum-Sha2"), R.options.sha2, R.callback))
      return;
    const b = [];
    if (R.options.onProgress != null) {
      const L = T(S, "content-length");
      L != null && b.push(new i.ProgressCallbackTransform(parseInt(L, 10), R.options.cancellationToken, R.options.onProgress));
    }
    const y = R.options.sha512;
    y != null ? b.push(new m(y, "sha512", y.length === 128 && !y.includes("+") && !y.includes("Z") && !y.includes("=") ? "hex" : "base64")) : R.options.sha2 != null && b.push(new m(R.options.sha2, "sha256", "hex"));
    const M = (0, d.createWriteStream)(R.destination);
    b.push(M);
    let $ = S;
    for (const L of b)
      L.on("error", (k) => {
        M.close(), R.options.cancellationToken.cancelled || R.callback(k);
      }), $ = $.pipe(L);
    M.on("finish", () => {
      M.close(R.callback);
    });
  }
  function P(R, S, b) {
    b != null && (R.method = b), R.headers = { ...R.headers };
    const y = R.headers;
    return S != null && (y.authorization = S.startsWith("Basic") || S.startsWith("Bearer") ? S : `token ${S}`), y["User-Agent"] == null && (y["User-Agent"] = "electron-builder"), (b == null || b === "GET" || y["Cache-Control"] == null) && (y["Cache-Control"] = "no-cache"), R.protocol == null && process.versions.electron != null && (R.protocol = "https:"), R;
  }
  function U(R, S) {
    return JSON.stringify(R, (b, y) => b.endsWith("Authorization") || b.endsWith("authorization") || b.endsWith("Password") || b.endsWith("PASSWORD") || b.endsWith("Token") || b.includes("password") || b.includes("token") || S != null && S.has(b) ? "<stripped sensitive data>" : y, 2);
  }
  return je;
}
var zt = {}, hs;
function Tf() {
  if (hs) return zt;
  hs = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.githubUrl = o, zt.getS3LikeProviderBaseUrl = h;
  function o(n, e = "github.com") {
    return `${n.protocol || "https"}://${n.host || e}`;
  }
  function h(n) {
    const e = n.provider;
    if (e === "s3")
      return d(n);
    if (e === "spaces")
      return u(n);
    throw new Error(`Not supported provider: ${e}`);
  }
  function d(n) {
    let e;
    if (n.accelerate == !0)
      e = `https://${n.bucket}.s3-accelerate.amazonaws.com`;
    else if (n.endpoint != null)
      e = `${n.endpoint}/${n.bucket}`;
    else if (n.bucket.includes(".")) {
      if (n.region == null)
        throw new Error(`Bucket name "${n.bucket}" includes a dot, but S3 region is missing`);
      n.region === "us-east-1" ? e = `https://s3.amazonaws.com/${n.bucket}` : e = `https://s3-${n.region}.amazonaws.com/${n.bucket}`;
    } else n.region === "cn-north-1" ? e = `https://${n.bucket}.s3.${n.region}.amazonaws.com.cn` : e = `https://${n.bucket}.s3.amazonaws.com`;
    return f(e, n.path);
  }
  function f(n, e) {
    return e != null && e.length > 0 && (e.startsWith("/") || (n += "/"), n += e), n;
  }
  function u(n) {
    if (n.name == null)
      throw new Error("name is missing");
    if (n.region == null)
      throw new Error("region is missing");
    return f(`https://${n.name}.${n.region}.digitaloceanspaces.com`, n.path);
  }
  return zt;
}
var Nr = {}, ps;
function Cf() {
  if (ps) return Nr;
  ps = 1, Object.defineProperty(Nr, "__esModule", { value: !0 }), Nr.parseDn = o;
  function o(h) {
    let d = !1, f = null, u = "", n = 0;
    h = h.trim();
    const e = /* @__PURE__ */ new Map();
    for (let i = 0; i <= h.length; i++) {
      if (i === h.length) {
        f !== null && e.set(f, u);
        break;
      }
      const t = h[i];
      if (d) {
        if (t === '"') {
          d = !1;
          continue;
        }
      } else {
        if (t === '"') {
          d = !0;
          continue;
        }
        if (t === "\\") {
          i++;
          const r = parseInt(h.slice(i, i + 2), 16);
          Number.isNaN(r) ? u += h[i] : (i++, u += String.fromCharCode(r));
          continue;
        }
        if (f === null && t === "=") {
          f = u, u = "";
          continue;
        }
        if (t === "," || t === ";" || t === "+") {
          f !== null && e.set(f, u), f = null, u = "";
          continue;
        }
      }
      if (t === " " && !d) {
        if (u.length === 0)
          continue;
        if (i > n) {
          let r = i;
          for (; h[r] === " "; )
            r++;
          n = r;
        }
        if (n >= h.length || h[n] === "," || h[n] === ";" || f === null && h[n] === "=" || f !== null && h[n] === "+") {
          i = n - 1;
          continue;
        }
      }
      u += t;
    }
    return e;
  }
  return Nr;
}
var Tt = {}, ms;
function Of() {
  if (ms) return Tt;
  ms = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.nil = Tt.UUID = void 0;
  const o = pr, h = Gr(), d = "options.name must be either a string or a Buffer", f = (0, o.randomBytes)(16);
  f[0] = f[0] | 1;
  const u = {}, n = [];
  for (let l = 0; l < 256; l++) {
    const s = (l + 256).toString(16).substr(1);
    u[s] = l, n[l] = s;
  }
  class e {
    constructor(s) {
      this.ascii = null, this.binary = null;
      const p = e.check(s);
      if (!p)
        throw new Error("not a UUID");
      this.version = p.version, p.format === "ascii" ? this.ascii = s : this.binary = s;
    }
    static v5(s, p) {
      return r(s, "sha1", 80, p);
    }
    toString() {
      return this.ascii == null && (this.ascii = c(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(s, p = 0) {
      if (typeof s == "string")
        return s = s.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(s) ? s === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (u[s[14] + s[15]] & 240) >> 4,
          variant: i((u[s[19] + s[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(s)) {
        if (s.length < p + 16)
          return !1;
        let g = 0;
        for (; g < 16 && s[p + g] === 0; g++)
          ;
        return g === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (s[p + 6] & 240) >> 4,
          variant: i((s[p + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, h.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(s) {
      const p = Buffer.allocUnsafe(16);
      let g = 0;
      for (let E = 0; E < 16; E++)
        p[E] = u[s[g++] + s[g++]], (E === 3 || E === 5 || E === 7 || E === 9) && (g += 1);
      return p;
    }
  }
  Tt.UUID = e, e.OID = e.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function i(l) {
    switch (l) {
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
  var t;
  (function(l) {
    l[l.ASCII = 0] = "ASCII", l[l.BINARY = 1] = "BINARY", l[l.OBJECT = 2] = "OBJECT";
  })(t || (t = {}));
  function r(l, s, p, g, E = t.ASCII) {
    const m = (0, o.createHash)(s);
    if (typeof l != "string" && !Buffer.isBuffer(l))
      throw (0, h.newError)(d, "ERR_INVALID_UUID_NAME");
    m.update(g), m.update(l);
    const T = m.digest();
    let O;
    switch (E) {
      case t.BINARY:
        T[6] = T[6] & 15 | p, T[8] = T[8] & 63 | 128, O = T;
        break;
      case t.OBJECT:
        T[6] = T[6] & 15 | p, T[8] = T[8] & 63 | 128, O = new e(T);
        break;
      default:
        O = n[T[0]] + n[T[1]] + n[T[2]] + n[T[3]] + "-" + n[T[4]] + n[T[5]] + "-" + n[T[6] & 15 | p] + n[T[7]] + "-" + n[T[8] & 63 | 128] + n[T[9]] + "-" + n[T[10]] + n[T[11]] + n[T[12]] + n[T[13]] + n[T[14]] + n[T[15]];
        break;
    }
    return O;
  }
  function c(l) {
    return n[l[0]] + n[l[1]] + n[l[2]] + n[l[3]] + "-" + n[l[4]] + n[l[5]] + "-" + n[l[6]] + n[l[7]] + "-" + n[l[8]] + n[l[9]] + "-" + n[l[10]] + n[l[11]] + n[l[12]] + n[l[13]] + n[l[14]] + n[l[15]];
  }
  return Tt.nil = new e("00000000-0000-0000-0000-000000000000"), Tt;
}
var Ft = {}, an = {}, gs;
function Pf() {
  return gs || (gs = 1, function(o) {
    (function(h) {
      h.parser = function(A, v) {
        return new f(A, v);
      }, h.SAXParser = f, h.SAXStream = c, h.createStream = r, h.MAX_BUFFER_LENGTH = 64 * 1024;
      var d = [
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
      h.EVENTS = [
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
      function f(A, v) {
        if (!(this instanceof f))
          return new f(A, v);
        var j = this;
        n(j), j.q = j.c = "", j.bufferCheckPosition = h.MAX_BUFFER_LENGTH, j.opt = v || {}, j.opt.lowercase = j.opt.lowercase || j.opt.lowercasetags, j.looseCase = j.opt.lowercase ? "toLowerCase" : "toUpperCase", j.tags = [], j.closed = j.closedRoot = j.sawRoot = !1, j.tag = j.error = null, j.strict = !!A, j.noscript = !!(A || j.opt.noscript), j.state = y.BEGIN, j.strictEntities = j.opt.strictEntities, j.ENTITIES = j.strictEntities ? Object.create(h.XML_ENTITIES) : Object.create(h.ENTITIES), j.attribList = [], j.opt.xmlns && (j.ns = Object.create(E)), j.opt.unquotedAttributeValues === void 0 && (j.opt.unquotedAttributeValues = !A), j.trackPosition = j.opt.position !== !1, j.trackPosition && (j.position = j.line = j.column = 0), $(j, "onready");
      }
      Object.create || (Object.create = function(A) {
        function v() {
        }
        v.prototype = A;
        var j = new v();
        return j;
      }), Object.keys || (Object.keys = function(A) {
        var v = [];
        for (var j in A) A.hasOwnProperty(j) && v.push(j);
        return v;
      });
      function u(A) {
        for (var v = Math.max(h.MAX_BUFFER_LENGTH, 10), j = 0, N = 0, le = d.length; N < le; N++) {
          var me = A[d[N]].length;
          if (me > v)
            switch (d[N]) {
              case "textNode":
                k(A);
                break;
              case "cdata":
                L(A, "oncdata", A.cdata), A.cdata = "";
                break;
              case "script":
                L(A, "onscript", A.script), A.script = "";
                break;
              default:
                D(A, "Max buffer length exceeded: " + d[N]);
            }
          j = Math.max(j, me);
        }
        var pe = h.MAX_BUFFER_LENGTH - j;
        A.bufferCheckPosition = pe + A.position;
      }
      function n(A) {
        for (var v = 0, j = d.length; v < j; v++)
          A[d[v]] = "";
      }
      function e(A) {
        k(A), A.cdata !== "" && (L(A, "oncdata", A.cdata), A.cdata = ""), A.script !== "" && (L(A, "onscript", A.script), A.script = "");
      }
      f.prototype = {
        end: function() {
          F(this);
        },
        write: ye,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          e(this);
        }
      };
      var i;
      try {
        i = require("stream").Stream;
      } catch {
        i = function() {
        };
      }
      i || (i = function() {
      });
      var t = h.EVENTS.filter(function(A) {
        return A !== "error" && A !== "end";
      });
      function r(A, v) {
        return new c(A, v);
      }
      function c(A, v) {
        if (!(this instanceof c))
          return new c(A, v);
        i.apply(this), this._parser = new f(A, v), this.writable = !0, this.readable = !0;
        var j = this;
        this._parser.onend = function() {
          j.emit("end");
        }, this._parser.onerror = function(N) {
          j.emit("error", N), j._parser.error = null;
        }, this._decoder = null, t.forEach(function(N) {
          Object.defineProperty(j, "on" + N, {
            get: function() {
              return j._parser["on" + N];
            },
            set: function(le) {
              if (!le)
                return j.removeAllListeners(N), j._parser["on" + N] = le, le;
              j.on(N, le);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      c.prototype = Object.create(i.prototype, {
        constructor: {
          value: c
        }
      }), c.prototype.write = function(A) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(A)) {
          if (!this._decoder) {
            var v = mf.StringDecoder;
            this._decoder = new v("utf8");
          }
          A = this._decoder.write(A);
        }
        return this._parser.write(A.toString()), this.emit("data", A), !0;
      }, c.prototype.end = function(A) {
        return A && A.length && this.write(A), this._parser.end(), !0;
      }, c.prototype.on = function(A, v) {
        var j = this;
        return !j._parser["on" + A] && t.indexOf(A) !== -1 && (j._parser["on" + A] = function() {
          var N = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          N.splice(0, 0, A), j.emit.apply(j, N);
        }), i.prototype.on.call(j, A, v);
      };
      var l = "[CDATA[", s = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", g = "http://www.w3.org/2000/xmlns/", E = { xml: p, xmlns: g }, m = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, w = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, O = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function P(A) {
        return A === " " || A === `
` || A === "\r" || A === "	";
      }
      function U(A) {
        return A === '"' || A === "'";
      }
      function R(A) {
        return A === ">" || P(A);
      }
      function S(A, v) {
        return A.test(v);
      }
      function b(A, v) {
        return !S(A, v);
      }
      var y = 0;
      h.STATE = {
        BEGIN: y++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: y++,
        // leading whitespace
        TEXT: y++,
        // general stuff
        TEXT_ENTITY: y++,
        // &amp and such.
        OPEN_WAKA: y++,
        // <
        SGML_DECL: y++,
        // <!BLARG
        SGML_DECL_QUOTED: y++,
        // <!BLARG foo "bar
        DOCTYPE: y++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: y++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: y++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: y++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: y++,
        // <!-
        COMMENT: y++,
        // <!--
        COMMENT_ENDING: y++,
        // <!-- blah -
        COMMENT_ENDED: y++,
        // <!-- blah --
        CDATA: y++,
        // <![CDATA[ something
        CDATA_ENDING: y++,
        // ]
        CDATA_ENDING_2: y++,
        // ]]
        PROC_INST: y++,
        // <?hi
        PROC_INST_BODY: y++,
        // <?hi there
        PROC_INST_ENDING: y++,
        // <?hi "there" ?
        OPEN_TAG: y++,
        // <strong
        OPEN_TAG_SLASH: y++,
        // <strong /
        ATTRIB: y++,
        // <a
        ATTRIB_NAME: y++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: y++,
        // <a foo _
        ATTRIB_VALUE: y++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: y++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: y++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: y++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: y++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: y++,
        // <foo bar=&quot
        CLOSE_TAG: y++,
        // </a
        CLOSE_TAG_SAW_WHITE: y++,
        // </a   >
        SCRIPT: y++,
        // <script> ...
        SCRIPT_ENDING: y++
        // <script> ... <
      }, h.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, h.ENTITIES = {
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
      }, Object.keys(h.ENTITIES).forEach(function(A) {
        var v = h.ENTITIES[A], j = typeof v == "number" ? String.fromCharCode(v) : v;
        h.ENTITIES[A] = j;
      });
      for (var M in h.STATE)
        h.STATE[h.STATE[M]] = M;
      y = h.STATE;
      function $(A, v, j) {
        A[v] && A[v](j);
      }
      function L(A, v, j) {
        A.textNode && k(A), $(A, v, j);
      }
      function k(A) {
        A.textNode = I(A.opt, A.textNode), A.textNode && $(A, "ontext", A.textNode), A.textNode = "";
      }
      function I(A, v) {
        return A.trim && (v = v.trim()), A.normalize && (v = v.replace(/\s+/g, " ")), v;
      }
      function D(A, v) {
        return k(A), A.trackPosition && (v += `
Line: ` + A.line + `
Column: ` + A.column + `
Char: ` + A.c), v = new Error(v), A.error = v, $(A, "onerror", v), A;
      }
      function F(A) {
        return A.sawRoot && !A.closedRoot && q(A, "Unclosed root tag"), A.state !== y.BEGIN && A.state !== y.BEGIN_WHITESPACE && A.state !== y.TEXT && D(A, "Unexpected end"), k(A), A.c = "", A.closed = !0, $(A, "onend"), f.call(A, A.strict, A.opt), A;
      }
      function q(A, v) {
        if (typeof A != "object" || !(A instanceof f))
          throw new Error("bad call to strictFail");
        A.strict && D(A, v);
      }
      function K(A) {
        A.strict || (A.tagName = A.tagName[A.looseCase]());
        var v = A.tags[A.tags.length - 1] || A, j = A.tag = { name: A.tagName, attributes: {} };
        A.opt.xmlns && (j.ns = v.ns), A.attribList.length = 0, L(A, "onopentagstart", j);
      }
      function W(A, v) {
        var j = A.indexOf(":"), N = j < 0 ? ["", A] : A.split(":"), le = N[0], me = N[1];
        return v && A === "xmlns" && (le = "xmlns", me = ""), { prefix: le, local: me };
      }
      function ne(A) {
        if (A.strict || (A.attribName = A.attribName[A.looseCase]()), A.attribList.indexOf(A.attribName) !== -1 || A.tag.attributes.hasOwnProperty(A.attribName)) {
          A.attribName = A.attribValue = "";
          return;
        }
        if (A.opt.xmlns) {
          var v = W(A.attribName, !0), j = v.prefix, N = v.local;
          if (j === "xmlns")
            if (N === "xml" && A.attribValue !== p)
              q(
                A,
                "xml: prefix must be bound to " + p + `
Actual: ` + A.attribValue
              );
            else if (N === "xmlns" && A.attribValue !== g)
              q(
                A,
                "xmlns: prefix must be bound to " + g + `
Actual: ` + A.attribValue
              );
            else {
              var le = A.tag, me = A.tags[A.tags.length - 1] || A;
              le.ns === me.ns && (le.ns = Object.create(me.ns)), le.ns[N] = A.attribValue;
            }
          A.attribList.push([A.attribName, A.attribValue]);
        } else
          A.tag.attributes[A.attribName] = A.attribValue, L(A, "onattribute", {
            name: A.attribName,
            value: A.attribValue
          });
        A.attribName = A.attribValue = "";
      }
      function ce(A, v) {
        if (A.opt.xmlns) {
          var j = A.tag, N = W(A.tagName);
          j.prefix = N.prefix, j.local = N.local, j.uri = j.ns[N.prefix] || "", j.prefix && !j.uri && (q(A, "Unbound namespace prefix: " + JSON.stringify(A.tagName)), j.uri = N.prefix);
          var le = A.tags[A.tags.length - 1] || A;
          j.ns && le.ns !== j.ns && Object.keys(j.ns).forEach(function(B) {
            L(A, "onopennamespace", {
              prefix: B,
              uri: j.ns[B]
            });
          });
          for (var me = 0, pe = A.attribList.length; me < pe; me++) {
            var _e = A.attribList[me], Ee = _e[0], Le = _e[1], Oe = W(Ee, !0), Me = Oe.prefix, Et = Oe.local, st = Me === "" ? "" : j.ns[Me] || "", a = {
              name: Ee,
              value: Le,
              prefix: Me,
              local: Et,
              uri: st
            };
            Me && Me !== "xmlns" && !st && (q(A, "Unbound namespace prefix: " + JSON.stringify(Me)), a.uri = Me), A.tag.attributes[Ee] = a, L(A, "onattribute", a);
          }
          A.attribList.length = 0;
        }
        A.tag.isSelfClosing = !!v, A.sawRoot = !0, A.tags.push(A.tag), L(A, "onopentag", A.tag), v || (!A.noscript && A.tagName.toLowerCase() === "script" ? A.state = y.SCRIPT : A.state = y.TEXT, A.tag = null, A.tagName = ""), A.attribName = A.attribValue = "", A.attribList.length = 0;
      }
      function ue(A) {
        if (!A.tagName) {
          q(A, "Weird empty close tag."), A.textNode += "</>", A.state = y.TEXT;
          return;
        }
        if (A.script) {
          if (A.tagName !== "script") {
            A.script += "</" + A.tagName + ">", A.tagName = "", A.state = y.SCRIPT;
            return;
          }
          L(A, "onscript", A.script), A.script = "";
        }
        var v = A.tags.length, j = A.tagName;
        A.strict || (j = j[A.looseCase]());
        for (var N = j; v--; ) {
          var le = A.tags[v];
          if (le.name !== N)
            q(A, "Unexpected close tag");
          else
            break;
        }
        if (v < 0) {
          q(A, "Unmatched closing tag: " + A.tagName), A.textNode += "</" + A.tagName + ">", A.state = y.TEXT;
          return;
        }
        A.tagName = j;
        for (var me = A.tags.length; me-- > v; ) {
          var pe = A.tag = A.tags.pop();
          A.tagName = A.tag.name, L(A, "onclosetag", A.tagName);
          var _e = {};
          for (var Ee in pe.ns)
            _e[Ee] = pe.ns[Ee];
          var Le = A.tags[A.tags.length - 1] || A;
          A.opt.xmlns && pe.ns !== Le.ns && Object.keys(pe.ns).forEach(function(Oe) {
            var Me = pe.ns[Oe];
            L(A, "onclosenamespace", { prefix: Oe, uri: Me });
          });
        }
        v === 0 && (A.closedRoot = !0), A.tagName = A.attribValue = A.attribName = "", A.attribList.length = 0, A.state = y.TEXT;
      }
      function ie(A) {
        var v = A.entity, j = v.toLowerCase(), N, le = "";
        return A.ENTITIES[v] ? A.ENTITIES[v] : A.ENTITIES[j] ? A.ENTITIES[j] : (v = j, v.charAt(0) === "#" && (v.charAt(1) === "x" ? (v = v.slice(2), N = parseInt(v, 16), le = N.toString(16)) : (v = v.slice(1), N = parseInt(v, 10), le = N.toString(10))), v = v.replace(/^0+/, ""), isNaN(N) || le.toLowerCase() !== v ? (q(A, "Invalid character entity"), "&" + A.entity + ";") : String.fromCodePoint(N));
      }
      function Re(A, v) {
        v === "<" ? (A.state = y.OPEN_WAKA, A.startTagPosition = A.position) : P(v) || (q(A, "Non-whitespace before first tag."), A.textNode = v, A.state = y.TEXT);
      }
      function J(A, v) {
        var j = "";
        return v < A.length && (j = A.charAt(v)), j;
      }
      function ye(A) {
        var v = this;
        if (this.error)
          throw this.error;
        if (v.closed)
          return D(
            v,
            "Cannot write after close. Assign an onready handler."
          );
        if (A === null)
          return F(v);
        typeof A == "object" && (A = A.toString());
        for (var j = 0, N = ""; N = J(A, j++), v.c = N, !!N; )
          switch (v.trackPosition && (v.position++, N === `
` ? (v.line++, v.column = 0) : v.column++), v.state) {
            case y.BEGIN:
              if (v.state = y.BEGIN_WHITESPACE, N === "\uFEFF")
                continue;
              Re(v, N);
              continue;
            case y.BEGIN_WHITESPACE:
              Re(v, N);
              continue;
            case y.TEXT:
              if (v.sawRoot && !v.closedRoot) {
                for (var le = j - 1; N && N !== "<" && N !== "&"; )
                  N = J(A, j++), N && v.trackPosition && (v.position++, N === `
` ? (v.line++, v.column = 0) : v.column++);
                v.textNode += A.substring(le, j - 1);
              }
              N === "<" && !(v.sawRoot && v.closedRoot && !v.strict) ? (v.state = y.OPEN_WAKA, v.startTagPosition = v.position) : (!P(N) && (!v.sawRoot || v.closedRoot) && q(v, "Text data outside of root node."), N === "&" ? v.state = y.TEXT_ENTITY : v.textNode += N);
              continue;
            case y.SCRIPT:
              N === "<" ? v.state = y.SCRIPT_ENDING : v.script += N;
              continue;
            case y.SCRIPT_ENDING:
              N === "/" ? v.state = y.CLOSE_TAG : (v.script += "<" + N, v.state = y.SCRIPT);
              continue;
            case y.OPEN_WAKA:
              if (N === "!")
                v.state = y.SGML_DECL, v.sgmlDecl = "";
              else if (!P(N)) if (S(m, N))
                v.state = y.OPEN_TAG, v.tagName = N;
              else if (N === "/")
                v.state = y.CLOSE_TAG, v.tagName = "";
              else if (N === "?")
                v.state = y.PROC_INST, v.procInstName = v.procInstBody = "";
              else {
                if (q(v, "Unencoded <"), v.startTagPosition + 1 < v.position) {
                  var me = v.position - v.startTagPosition;
                  N = new Array(me).join(" ") + N;
                }
                v.textNode += "<" + N, v.state = y.TEXT;
              }
              continue;
            case y.SGML_DECL:
              if (v.sgmlDecl + N === "--") {
                v.state = y.COMMENT, v.comment = "", v.sgmlDecl = "";
                continue;
              }
              v.doctype && v.doctype !== !0 && v.sgmlDecl ? (v.state = y.DOCTYPE_DTD, v.doctype += "<!" + v.sgmlDecl + N, v.sgmlDecl = "") : (v.sgmlDecl + N).toUpperCase() === l ? (L(v, "onopencdata"), v.state = y.CDATA, v.sgmlDecl = "", v.cdata = "") : (v.sgmlDecl + N).toUpperCase() === s ? (v.state = y.DOCTYPE, (v.doctype || v.sawRoot) && q(
                v,
                "Inappropriately located doctype declaration"
              ), v.doctype = "", v.sgmlDecl = "") : N === ">" ? (L(v, "onsgmldeclaration", v.sgmlDecl), v.sgmlDecl = "", v.state = y.TEXT) : (U(N) && (v.state = y.SGML_DECL_QUOTED), v.sgmlDecl += N);
              continue;
            case y.SGML_DECL_QUOTED:
              N === v.q && (v.state = y.SGML_DECL, v.q = ""), v.sgmlDecl += N;
              continue;
            case y.DOCTYPE:
              N === ">" ? (v.state = y.TEXT, L(v, "ondoctype", v.doctype), v.doctype = !0) : (v.doctype += N, N === "[" ? v.state = y.DOCTYPE_DTD : U(N) && (v.state = y.DOCTYPE_QUOTED, v.q = N));
              continue;
            case y.DOCTYPE_QUOTED:
              v.doctype += N, N === v.q && (v.q = "", v.state = y.DOCTYPE);
              continue;
            case y.DOCTYPE_DTD:
              N === "]" ? (v.doctype += N, v.state = y.DOCTYPE) : N === "<" ? (v.state = y.OPEN_WAKA, v.startTagPosition = v.position) : U(N) ? (v.doctype += N, v.state = y.DOCTYPE_DTD_QUOTED, v.q = N) : v.doctype += N;
              continue;
            case y.DOCTYPE_DTD_QUOTED:
              v.doctype += N, N === v.q && (v.state = y.DOCTYPE_DTD, v.q = "");
              continue;
            case y.COMMENT:
              N === "-" ? v.state = y.COMMENT_ENDING : v.comment += N;
              continue;
            case y.COMMENT_ENDING:
              N === "-" ? (v.state = y.COMMENT_ENDED, v.comment = I(v.opt, v.comment), v.comment && L(v, "oncomment", v.comment), v.comment = "") : (v.comment += "-" + N, v.state = y.COMMENT);
              continue;
            case y.COMMENT_ENDED:
              N !== ">" ? (q(v, "Malformed comment"), v.comment += "--" + N, v.state = y.COMMENT) : v.doctype && v.doctype !== !0 ? v.state = y.DOCTYPE_DTD : v.state = y.TEXT;
              continue;
            case y.CDATA:
              N === "]" ? v.state = y.CDATA_ENDING : v.cdata += N;
              continue;
            case y.CDATA_ENDING:
              N === "]" ? v.state = y.CDATA_ENDING_2 : (v.cdata += "]" + N, v.state = y.CDATA);
              continue;
            case y.CDATA_ENDING_2:
              N === ">" ? (v.cdata && L(v, "oncdata", v.cdata), L(v, "onclosecdata"), v.cdata = "", v.state = y.TEXT) : N === "]" ? v.cdata += "]" : (v.cdata += "]]" + N, v.state = y.CDATA);
              continue;
            case y.PROC_INST:
              N === "?" ? v.state = y.PROC_INST_ENDING : P(N) ? v.state = y.PROC_INST_BODY : v.procInstName += N;
              continue;
            case y.PROC_INST_BODY:
              if (!v.procInstBody && P(N))
                continue;
              N === "?" ? v.state = y.PROC_INST_ENDING : v.procInstBody += N;
              continue;
            case y.PROC_INST_ENDING:
              N === ">" ? (L(v, "onprocessinginstruction", {
                name: v.procInstName,
                body: v.procInstBody
              }), v.procInstName = v.procInstBody = "", v.state = y.TEXT) : (v.procInstBody += "?" + N, v.state = y.PROC_INST_BODY);
              continue;
            case y.OPEN_TAG:
              S(w, N) ? v.tagName += N : (K(v), N === ">" ? ce(v) : N === "/" ? v.state = y.OPEN_TAG_SLASH : (P(N) || q(v, "Invalid character in tag name"), v.state = y.ATTRIB));
              continue;
            case y.OPEN_TAG_SLASH:
              N === ">" ? (ce(v, !0), ue(v)) : (q(v, "Forward-slash in opening tag not followed by >"), v.state = y.ATTRIB);
              continue;
            case y.ATTRIB:
              if (P(N))
                continue;
              N === ">" ? ce(v) : N === "/" ? v.state = y.OPEN_TAG_SLASH : S(m, N) ? (v.attribName = N, v.attribValue = "", v.state = y.ATTRIB_NAME) : q(v, "Invalid attribute name");
              continue;
            case y.ATTRIB_NAME:
              N === "=" ? v.state = y.ATTRIB_VALUE : N === ">" ? (q(v, "Attribute without value"), v.attribValue = v.attribName, ne(v), ce(v)) : P(N) ? v.state = y.ATTRIB_NAME_SAW_WHITE : S(w, N) ? v.attribName += N : q(v, "Invalid attribute name");
              continue;
            case y.ATTRIB_NAME_SAW_WHITE:
              if (N === "=")
                v.state = y.ATTRIB_VALUE;
              else {
                if (P(N))
                  continue;
                q(v, "Attribute without value"), v.tag.attributes[v.attribName] = "", v.attribValue = "", L(v, "onattribute", {
                  name: v.attribName,
                  value: ""
                }), v.attribName = "", N === ">" ? ce(v) : S(m, N) ? (v.attribName = N, v.state = y.ATTRIB_NAME) : (q(v, "Invalid attribute name"), v.state = y.ATTRIB);
              }
              continue;
            case y.ATTRIB_VALUE:
              if (P(N))
                continue;
              U(N) ? (v.q = N, v.state = y.ATTRIB_VALUE_QUOTED) : (v.opt.unquotedAttributeValues || D(v, "Unquoted attribute value"), v.state = y.ATTRIB_VALUE_UNQUOTED, v.attribValue = N);
              continue;
            case y.ATTRIB_VALUE_QUOTED:
              if (N !== v.q) {
                N === "&" ? v.state = y.ATTRIB_VALUE_ENTITY_Q : v.attribValue += N;
                continue;
              }
              ne(v), v.q = "", v.state = y.ATTRIB_VALUE_CLOSED;
              continue;
            case y.ATTRIB_VALUE_CLOSED:
              P(N) ? v.state = y.ATTRIB : N === ">" ? ce(v) : N === "/" ? v.state = y.OPEN_TAG_SLASH : S(m, N) ? (q(v, "No whitespace between attributes"), v.attribName = N, v.attribValue = "", v.state = y.ATTRIB_NAME) : q(v, "Invalid attribute name");
              continue;
            case y.ATTRIB_VALUE_UNQUOTED:
              if (!R(N)) {
                N === "&" ? v.state = y.ATTRIB_VALUE_ENTITY_U : v.attribValue += N;
                continue;
              }
              ne(v), N === ">" ? ce(v) : v.state = y.ATTRIB;
              continue;
            case y.CLOSE_TAG:
              if (v.tagName)
                N === ">" ? ue(v) : S(w, N) ? v.tagName += N : v.script ? (v.script += "</" + v.tagName, v.tagName = "", v.state = y.SCRIPT) : (P(N) || q(v, "Invalid tagname in closing tag"), v.state = y.CLOSE_TAG_SAW_WHITE);
              else {
                if (P(N))
                  continue;
                b(m, N) ? v.script ? (v.script += "</" + N, v.state = y.SCRIPT) : q(v, "Invalid tagname in closing tag.") : v.tagName = N;
              }
              continue;
            case y.CLOSE_TAG_SAW_WHITE:
              if (P(N))
                continue;
              N === ">" ? ue(v) : q(v, "Invalid characters in closing tag");
              continue;
            case y.TEXT_ENTITY:
            case y.ATTRIB_VALUE_ENTITY_Q:
            case y.ATTRIB_VALUE_ENTITY_U:
              var pe, _e;
              switch (v.state) {
                case y.TEXT_ENTITY:
                  pe = y.TEXT, _e = "textNode";
                  break;
                case y.ATTRIB_VALUE_ENTITY_Q:
                  pe = y.ATTRIB_VALUE_QUOTED, _e = "attribValue";
                  break;
                case y.ATTRIB_VALUE_ENTITY_U:
                  pe = y.ATTRIB_VALUE_UNQUOTED, _e = "attribValue";
                  break;
              }
              if (N === ";") {
                var Ee = ie(v);
                v.opt.unparsedEntities && !Object.values(h.XML_ENTITIES).includes(Ee) ? (v.entity = "", v.state = pe, v.write(Ee)) : (v[_e] += Ee, v.entity = "", v.state = pe);
              } else S(v.entity.length ? O : T, N) ? v.entity += N : (q(v, "Invalid character in entity name"), v[_e] += "&" + v.entity + N, v.entity = "", v.state = pe);
              continue;
            default:
              throw new Error(v, "Unknown state: " + v.state);
          }
        return v.position >= v.bufferCheckPosition && u(v), v;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || function() {
        var A = String.fromCharCode, v = Math.floor, j = function() {
          var N = 16384, le = [], me, pe, _e = -1, Ee = arguments.length;
          if (!Ee)
            return "";
          for (var Le = ""; ++_e < Ee; ) {
            var Oe = Number(arguments[_e]);
            if (!isFinite(Oe) || // `NaN`, `+Infinity`, or `-Infinity`
            Oe < 0 || // not a valid Unicode code point
            Oe > 1114111 || // not a valid Unicode code point
            v(Oe) !== Oe)
              throw RangeError("Invalid code point: " + Oe);
            Oe <= 65535 ? le.push(Oe) : (Oe -= 65536, me = (Oe >> 10) + 55296, pe = Oe % 1024 + 56320, le.push(me, pe)), (_e + 1 === Ee || le.length > N) && (Le += A.apply(null, le), le.length = 0);
          }
          return Le;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: j,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = j;
      }();
    })(o);
  }(an)), an;
}
var vs;
function Df() {
  if (vs) return Ft;
  vs = 1, Object.defineProperty(Ft, "__esModule", { value: !0 }), Ft.XElement = void 0, Ft.parseXml = e;
  const o = Pf(), h = Gr();
  class d {
    constructor(t) {
      if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
        throw (0, h.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!u(t))
        throw (0, h.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(t) {
      const r = this.attributes === null ? null : this.attributes[t];
      if (r == null)
        throw (0, h.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return r;
    }
    removeAttribute(t) {
      this.attributes !== null && delete this.attributes[t];
    }
    element(t, r = !1, c = null) {
      const l = this.elementOrNull(t, r);
      if (l === null)
        throw (0, h.newError)(c || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
      return l;
    }
    elementOrNull(t, r = !1) {
      if (this.elements === null)
        return null;
      for (const c of this.elements)
        if (n(c, t, r))
          return c;
      return null;
    }
    getElements(t, r = !1) {
      return this.elements === null ? [] : this.elements.filter((c) => n(c, t, r));
    }
    elementValueOrEmpty(t, r = !1) {
      const c = this.elementOrNull(t, r);
      return c === null ? "" : c.value;
    }
  }
  Ft.XElement = d;
  const f = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function u(i) {
    return f.test(i);
  }
  function n(i, t, r) {
    const c = i.name;
    return c === t || r === !0 && c.length === t.length && c.toLowerCase() === t.toLowerCase();
  }
  function e(i) {
    let t = null;
    const r = o.parser(!0, {}), c = [];
    return r.onopentag = (l) => {
      const s = new d(l.name);
      if (s.attributes = l.attributes, t === null)
        t = s;
      else {
        const p = c[c.length - 1];
        p.elements == null && (p.elements = []), p.elements.push(s);
      }
      c.push(s);
    }, r.onclosetag = () => {
      c.pop();
    }, r.ontext = (l) => {
      c.length > 0 && (c[c.length - 1].value = l);
    }, r.oncdata = (l) => {
      const s = c[c.length - 1];
      s.value = l, s.isCData = !0;
    }, r.onerror = (l) => {
      throw l;
    }, r.write(i), t;
  }
  return Ft;
}
var Vt = {}, ys;
function If() {
  if (ys) return Vt;
  ys = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.MemoLazy = void 0;
  let o = class {
    constructor(f, u) {
      this.selector = f, this.creator = u, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const f = this.selector();
      if (this._value !== void 0 && h(this.selected, f))
        return this._value;
      this.selected = f;
      const u = this.creator(f);
      return this.value = u, u;
    }
    set value(f) {
      this._value = f;
    }
  };
  Vt.MemoLazy = o;
  function h(d, f) {
    if (typeof d == "object" && d !== null && (typeof f == "object" && f !== null)) {
      const e = Object.keys(d), i = Object.keys(f);
      return e.length === i.length && e.every((t) => h(d[t], f[t]));
    }
    return d === f;
  }
  return Vt;
}
var Fr = {}, Es;
function Nf() {
  if (Es) return Fr;
  Es = 1, Object.defineProperty(Fr, "__esModule", { value: !0 }), Fr.retry = h;
  const o = Do();
  async function h(d, f, u, n = 0, e = 0, i) {
    var t;
    const r = new o.CancellationToken();
    try {
      return await d();
    } catch (c) {
      if ((!((t = i == null ? void 0 : i(c)) !== null && t !== void 0) || t) && f > 0 && !r.cancelled)
        return await new Promise((l) => setTimeout(l, u + n * e)), await h(d, f - 1, u, n, e + 1, i);
      throw c;
    }
  }
  return Fr;
}
var ws;
function ke() {
  return ws || (ws = 1, function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.CURRENT_APP_PACKAGE_FILE_NAME = o.CURRENT_APP_INSTALLER_FILE_NAME = o.retry = o.MemoLazy = o.newError = o.XElement = o.parseXml = o.ProgressCallbackTransform = o.UUID = o.parseDn = o.githubUrl = o.getS3LikeProviderBaseUrl = o.configureRequestUrl = o.parseJson = o.safeStringifyJson = o.configureRequestOptionsFromUrl = o.configureRequestOptions = o.safeGetHeader = o.DigestTransform = o.HttpExecutor = o.createHttpError = o.HttpError = o.CancellationError = o.CancellationToken = void 0, o.asArray = l;
    var h = Do();
    Object.defineProperty(o, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } }), Object.defineProperty(o, "CancellationError", { enumerable: !0, get: function() {
      return h.CancellationError;
    } });
    var d = Rf();
    Object.defineProperty(o, "HttpError", { enumerable: !0, get: function() {
      return d.HttpError;
    } }), Object.defineProperty(o, "createHttpError", { enumerable: !0, get: function() {
      return d.createHttpError;
    } }), Object.defineProperty(o, "HttpExecutor", { enumerable: !0, get: function() {
      return d.HttpExecutor;
    } }), Object.defineProperty(o, "DigestTransform", { enumerable: !0, get: function() {
      return d.DigestTransform;
    } }), Object.defineProperty(o, "safeGetHeader", { enumerable: !0, get: function() {
      return d.safeGetHeader;
    } }), Object.defineProperty(o, "configureRequestOptions", { enumerable: !0, get: function() {
      return d.configureRequestOptions;
    } }), Object.defineProperty(o, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return d.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(o, "safeStringifyJson", { enumerable: !0, get: function() {
      return d.safeStringifyJson;
    } }), Object.defineProperty(o, "parseJson", { enumerable: !0, get: function() {
      return d.parseJson;
    } }), Object.defineProperty(o, "configureRequestUrl", { enumerable: !0, get: function() {
      return d.configureRequestUrl;
    } });
    var f = Tf();
    Object.defineProperty(o, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return f.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(o, "githubUrl", { enumerable: !0, get: function() {
      return f.githubUrl;
    } });
    var u = Cf();
    Object.defineProperty(o, "parseDn", { enumerable: !0, get: function() {
      return u.parseDn;
    } });
    var n = Of();
    Object.defineProperty(o, "UUID", { enumerable: !0, get: function() {
      return n.UUID;
    } });
    var e = $u();
    Object.defineProperty(o, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return e.ProgressCallbackTransform;
    } });
    var i = Df();
    Object.defineProperty(o, "parseXml", { enumerable: !0, get: function() {
      return i.parseXml;
    } }), Object.defineProperty(o, "XElement", { enumerable: !0, get: function() {
      return i.XElement;
    } });
    var t = Gr();
    Object.defineProperty(o, "newError", { enumerable: !0, get: function() {
      return t.newError;
    } });
    var r = If();
    Object.defineProperty(o, "MemoLazy", { enumerable: !0, get: function() {
      return r.MemoLazy;
    } });
    var c = Nf();
    Object.defineProperty(o, "retry", { enumerable: !0, get: function() {
      return c.retry;
    } }), o.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", o.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function l(s) {
      return s == null ? [] : Array.isArray(s) ? s : [s];
    }
  }(tn)), tn;
}
var ln = {}, xr = {}, _s;
function Xe() {
  return _s || (_s = 1, xr.fromCallback = function(o) {
    return Object.defineProperty(function(...h) {
      if (typeof h[h.length - 1] == "function") o.apply(this, h);
      else
        return new Promise((d, f) => {
          h.push((u, n) => u != null ? f(u) : d(n)), o.apply(this, h);
        });
    }, "name", { value: o.name });
  }, xr.fromPromise = function(o) {
    return Object.defineProperty(function(...h) {
      const d = h[h.length - 1];
      if (typeof d != "function") return o.apply(this, h);
      h.pop(), o.apply(this, h).then((f) => d(null, f), d);
    }, "name", { value: o.name });
  }), xr;
}
var un, Ss;
function Ff() {
  if (Ss) return un;
  Ss = 1;
  var o = gf, h = process.cwd, d = null, f = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return d || (d = h.call(process)), d;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var u = process.chdir;
    process.chdir = function(e) {
      d = null, u.call(process, e);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, u);
  }
  un = n;
  function n(e) {
    o.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && i(e), e.lutimes || t(e), e.chown = l(e.chown), e.fchown = l(e.fchown), e.lchown = l(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = c(e.chmodSync), e.fchmodSync = c(e.fchmodSync), e.lchmodSync = c(e.lchmodSync), e.stat = p(e.stat), e.fstat = p(e.fstat), e.lstat = p(e.lstat), e.statSync = g(e.statSync), e.fstatSync = g(e.fstatSync), e.lstatSync = g(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(m, w, T) {
      T && process.nextTick(T);
    }, e.lchmodSync = function() {
    }), e.chown && !e.lchown && (e.lchown = function(m, w, T, O) {
      O && process.nextTick(O);
    }, e.lchownSync = function() {
    }), f === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(m) {
      function w(T, O, P) {
        var U = Date.now(), R = 0;
        m(T, O, function S(b) {
          if (b && (b.code === "EACCES" || b.code === "EPERM" || b.code === "EBUSY") && Date.now() - U < 6e4) {
            setTimeout(function() {
              e.stat(O, function(y, M) {
                y && y.code === "ENOENT" ? m(T, O, S) : P(b);
              });
            }, R), R < 100 && (R += 10);
            return;
          }
          P && P(b);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(w, m), w;
    }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(m) {
      function w(T, O, P, U, R, S) {
        var b;
        if (S && typeof S == "function") {
          var y = 0;
          b = function(M, $, L) {
            if (M && M.code === "EAGAIN" && y < 10)
              return y++, m.call(e, T, O, P, U, R, b);
            S.apply(this, arguments);
          };
        }
        return m.call(e, T, O, P, U, R, b);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(w, m), w;
    }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(m) {
      return function(w, T, O, P, U) {
        for (var R = 0; ; )
          try {
            return m.call(e, w, T, O, P, U);
          } catch (S) {
            if (S.code === "EAGAIN" && R < 10) {
              R++;
              continue;
            }
            throw S;
          }
      };
    }(e.readSync);
    function i(m) {
      m.lchmod = function(w, T, O) {
        m.open(
          w,
          o.O_WRONLY | o.O_SYMLINK,
          T,
          function(P, U) {
            if (P) {
              O && O(P);
              return;
            }
            m.fchmod(U, T, function(R) {
              m.close(U, function(S) {
                O && O(R || S);
              });
            });
          }
        );
      }, m.lchmodSync = function(w, T) {
        var O = m.openSync(w, o.O_WRONLY | o.O_SYMLINK, T), P = !0, U;
        try {
          U = m.fchmodSync(O, T), P = !1;
        } finally {
          if (P)
            try {
              m.closeSync(O);
            } catch {
            }
          else
            m.closeSync(O);
        }
        return U;
      };
    }
    function t(m) {
      o.hasOwnProperty("O_SYMLINK") && m.futimes ? (m.lutimes = function(w, T, O, P) {
        m.open(w, o.O_SYMLINK, function(U, R) {
          if (U) {
            P && P(U);
            return;
          }
          m.futimes(R, T, O, function(S) {
            m.close(R, function(b) {
              P && P(S || b);
            });
          });
        });
      }, m.lutimesSync = function(w, T, O) {
        var P = m.openSync(w, o.O_SYMLINK), U, R = !0;
        try {
          U = m.futimesSync(P, T, O), R = !1;
        } finally {
          if (R)
            try {
              m.closeSync(P);
            } catch {
            }
          else
            m.closeSync(P);
        }
        return U;
      }) : m.futimes && (m.lutimes = function(w, T, O, P) {
        P && process.nextTick(P);
      }, m.lutimesSync = function() {
      });
    }
    function r(m) {
      return m && function(w, T, O) {
        return m.call(e, w, T, function(P) {
          E(P) && (P = null), O && O.apply(this, arguments);
        });
      };
    }
    function c(m) {
      return m && function(w, T) {
        try {
          return m.call(e, w, T);
        } catch (O) {
          if (!E(O)) throw O;
        }
      };
    }
    function l(m) {
      return m && function(w, T, O, P) {
        return m.call(e, w, T, O, function(U) {
          E(U) && (U = null), P && P.apply(this, arguments);
        });
      };
    }
    function s(m) {
      return m && function(w, T, O) {
        try {
          return m.call(e, w, T, O);
        } catch (P) {
          if (!E(P)) throw P;
        }
      };
    }
    function p(m) {
      return m && function(w, T, O) {
        typeof T == "function" && (O = T, T = null);
        function P(U, R) {
          R && (R.uid < 0 && (R.uid += 4294967296), R.gid < 0 && (R.gid += 4294967296)), O && O.apply(this, arguments);
        }
        return T ? m.call(e, w, T, P) : m.call(e, w, P);
      };
    }
    function g(m) {
      return m && function(w, T) {
        var O = T ? m.call(e, w, T) : m.call(e, w);
        return O && (O.uid < 0 && (O.uid += 4294967296), O.gid < 0 && (O.gid += 4294967296)), O;
      };
    }
    function E(m) {
      if (!m || m.code === "ENOSYS")
        return !0;
      var w = !process.getuid || process.getuid() !== 0;
      return !!(w && (m.code === "EINVAL" || m.code === "EPERM"));
    }
  }
  return un;
}
var cn, As;
function xf() {
  if (As) return cn;
  As = 1;
  var o = mr.Stream;
  cn = h;
  function h(d) {
    return {
      ReadStream: f,
      WriteStream: u
    };
    function f(n, e) {
      if (!(this instanceof f)) return new f(n, e);
      o.call(this);
      var i = this;
      this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, e = e || {};
      for (var t = Object.keys(e), r = 0, c = t.length; r < c; r++) {
        var l = t[r];
        this[l] = e[l];
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
          i._read();
        });
        return;
      }
      d.open(this.path, this.flags, this.mode, function(s, p) {
        if (s) {
          i.emit("error", s), i.readable = !1;
          return;
        }
        i.fd = p, i.emit("open", p), i._read();
      });
    }
    function u(n, e) {
      if (!(this instanceof u)) return new u(n, e);
      o.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, e = e || {};
      for (var i = Object.keys(e), t = 0, r = i.length; t < r; t++) {
        var c = i[t];
        this[c] = e[c];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = d.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return cn;
}
var fn, bs;
function Lf() {
  if (bs) return fn;
  bs = 1, fn = h;
  var o = Object.getPrototypeOf || function(d) {
    return d.__proto__;
  };
  function h(d) {
    if (d === null || typeof d != "object")
      return d;
    if (d instanceof Object)
      var f = { __proto__: o(d) };
    else
      var f = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(d).forEach(function(u) {
      Object.defineProperty(f, u, Object.getOwnPropertyDescriptor(d, u));
    }), f;
  }
  return fn;
}
var Lr, Rs;
function ze() {
  if (Rs) return Lr;
  Rs = 1;
  var o = Ye, h = Ff(), d = xf(), f = Lf(), u = Hr, n, e;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (n = Symbol.for("graceful-fs.queue"), e = Symbol.for("graceful-fs.previous")) : (n = "___graceful-fs.queue", e = "___graceful-fs.previous");
  function i() {
  }
  function t(m, w) {
    Object.defineProperty(m, n, {
      get: function() {
        return w;
      }
    });
  }
  var r = i;
  if (u.debuglog ? r = u.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (r = function() {
    var m = u.format.apply(u, arguments);
    m = "GFS4: " + m.split(/\n/).join(`
GFS4: `), console.error(m);
  }), !o[n]) {
    var c = et[n] || [];
    t(o, c), o.close = function(m) {
      function w(T, O) {
        return m.call(o, T, function(P) {
          P || g(), typeof O == "function" && O.apply(this, arguments);
        });
      }
      return Object.defineProperty(w, e, {
        value: m
      }), w;
    }(o.close), o.closeSync = function(m) {
      function w(T) {
        m.apply(o, arguments), g();
      }
      return Object.defineProperty(w, e, {
        value: m
      }), w;
    }(o.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      r(o[n]), Nu.equal(o[n].length, 0);
    });
  }
  et[n] || t(et, o[n]), Lr = l(f(o)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !o.__patched && (Lr = l(o), o.__patched = !0);
  function l(m) {
    h(m), m.gracefulify = l, m.createReadStream = ce, m.createWriteStream = ue;
    var w = m.readFile;
    m.readFile = T;
    function T(J, ye, A) {
      return typeof ye == "function" && (A = ye, ye = null), v(J, ye, A);
      function v(j, N, le, me) {
        return w(j, N, function(pe) {
          pe && (pe.code === "EMFILE" || pe.code === "ENFILE") ? s([v, [j, N, le], pe, me || Date.now(), Date.now()]) : typeof le == "function" && le.apply(this, arguments);
        });
      }
    }
    var O = m.writeFile;
    m.writeFile = P;
    function P(J, ye, A, v) {
      return typeof A == "function" && (v = A, A = null), j(J, ye, A, v);
      function j(N, le, me, pe, _e) {
        return O(N, le, me, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? s([j, [N, le, me, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var U = m.appendFile;
    U && (m.appendFile = R);
    function R(J, ye, A, v) {
      return typeof A == "function" && (v = A, A = null), j(J, ye, A, v);
      function j(N, le, me, pe, _e) {
        return U(N, le, me, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? s([j, [N, le, me, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var S = m.copyFile;
    S && (m.copyFile = b);
    function b(J, ye, A, v) {
      return typeof A == "function" && (v = A, A = 0), j(J, ye, A, v);
      function j(N, le, me, pe, _e) {
        return S(N, le, me, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? s([j, [N, le, me, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var y = m.readdir;
    m.readdir = $;
    var M = /^v[0-5]\./;
    function $(J, ye, A) {
      typeof ye == "function" && (A = ye, ye = null);
      var v = M.test(process.version) ? function(le, me, pe, _e) {
        return y(le, j(
          le,
          me,
          pe,
          _e
        ));
      } : function(le, me, pe, _e) {
        return y(le, me, j(
          le,
          me,
          pe,
          _e
        ));
      };
      return v(J, ye, A);
      function j(N, le, me, pe) {
        return function(_e, Ee) {
          _e && (_e.code === "EMFILE" || _e.code === "ENFILE") ? s([
            v,
            [N, le, me],
            _e,
            pe || Date.now(),
            Date.now()
          ]) : (Ee && Ee.sort && Ee.sort(), typeof me == "function" && me.call(this, _e, Ee));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var L = d(m);
      q = L.ReadStream, W = L.WriteStream;
    }
    var k = m.ReadStream;
    k && (q.prototype = Object.create(k.prototype), q.prototype.open = K);
    var I = m.WriteStream;
    I && (W.prototype = Object.create(I.prototype), W.prototype.open = ne), Object.defineProperty(m, "ReadStream", {
      get: function() {
        return q;
      },
      set: function(J) {
        q = J;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(m, "WriteStream", {
      get: function() {
        return W;
      },
      set: function(J) {
        W = J;
      },
      enumerable: !0,
      configurable: !0
    });
    var D = q;
    Object.defineProperty(m, "FileReadStream", {
      get: function() {
        return D;
      },
      set: function(J) {
        D = J;
      },
      enumerable: !0,
      configurable: !0
    });
    var F = W;
    Object.defineProperty(m, "FileWriteStream", {
      get: function() {
        return F;
      },
      set: function(J) {
        F = J;
      },
      enumerable: !0,
      configurable: !0
    });
    function q(J, ye) {
      return this instanceof q ? (k.apply(this, arguments), this) : q.apply(Object.create(q.prototype), arguments);
    }
    function K() {
      var J = this;
      Re(J.path, J.flags, J.mode, function(ye, A) {
        ye ? (J.autoClose && J.destroy(), J.emit("error", ye)) : (J.fd = A, J.emit("open", A), J.read());
      });
    }
    function W(J, ye) {
      return this instanceof W ? (I.apply(this, arguments), this) : W.apply(Object.create(W.prototype), arguments);
    }
    function ne() {
      var J = this;
      Re(J.path, J.flags, J.mode, function(ye, A) {
        ye ? (J.destroy(), J.emit("error", ye)) : (J.fd = A, J.emit("open", A));
      });
    }
    function ce(J, ye) {
      return new m.ReadStream(J, ye);
    }
    function ue(J, ye) {
      return new m.WriteStream(J, ye);
    }
    var ie = m.open;
    m.open = Re;
    function Re(J, ye, A, v) {
      return typeof A == "function" && (v = A, A = null), j(J, ye, A, v);
      function j(N, le, me, pe, _e) {
        return ie(N, le, me, function(Ee, Le) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? s([j, [N, le, me, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    return m;
  }
  function s(m) {
    r("ENQUEUE", m[0].name, m[1]), o[n].push(m), E();
  }
  var p;
  function g() {
    for (var m = Date.now(), w = 0; w < o[n].length; ++w)
      o[n][w].length > 2 && (o[n][w][3] = m, o[n][w][4] = m);
    E();
  }
  function E() {
    if (clearTimeout(p), p = void 0, o[n].length !== 0) {
      var m = o[n].shift(), w = m[0], T = m[1], O = m[2], P = m[3], U = m[4];
      if (P === void 0)
        r("RETRY", w.name, T), w.apply(null, T);
      else if (Date.now() - P >= 6e4) {
        r("TIMEOUT", w.name, T);
        var R = T.pop();
        typeof R == "function" && R.call(null, O);
      } else {
        var S = Date.now() - U, b = Math.max(U - P, 1), y = Math.min(b * 1.2, 100);
        S >= y ? (r("RETRY", w.name, T), w.apply(null, T.concat([P]))) : o[n].push(m);
      }
      p === void 0 && (p = setTimeout(E, 0));
    }
  }
  return Lr;
}
var Ts;
function kt() {
  return Ts || (Ts = 1, function(o) {
    const h = Xe().fromCallback, d = ze(), f = [
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
    ].filter((u) => typeof d[u] == "function");
    Object.assign(o, d), f.forEach((u) => {
      o[u] = h(d[u]);
    }), o.exists = function(u, n) {
      return typeof n == "function" ? d.exists(u, n) : new Promise((e) => d.exists(u, e));
    }, o.read = function(u, n, e, i, t, r) {
      return typeof r == "function" ? d.read(u, n, e, i, t, r) : new Promise((c, l) => {
        d.read(u, n, e, i, t, (s, p, g) => {
          if (s) return l(s);
          c({ bytesRead: p, buffer: g });
        });
      });
    }, o.write = function(u, n, ...e) {
      return typeof e[e.length - 1] == "function" ? d.write(u, n, ...e) : new Promise((i, t) => {
        d.write(u, n, ...e, (r, c, l) => {
          if (r) return t(r);
          i({ bytesWritten: c, buffer: l });
        });
      });
    }, typeof d.writev == "function" && (o.writev = function(u, n, ...e) {
      return typeof e[e.length - 1] == "function" ? d.writev(u, n, ...e) : new Promise((i, t) => {
        d.writev(u, n, ...e, (r, c, l) => {
          if (r) return t(r);
          i({ bytesWritten: c, buffers: l });
        });
      });
    }), typeof d.realpath.native == "function" ? o.realpath.native = h(d.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(ln)), ln;
}
var $r = {}, dn = {}, Cs;
function $f() {
  if (Cs) return dn;
  Cs = 1;
  const o = be;
  return dn.checkPath = function(d) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(d.replace(o.parse(d).root, ""))) {
      const u = new Error(`Path contains invalid characters: ${d}`);
      throw u.code = "EINVAL", u;
    }
  }, dn;
}
var Os;
function Uf() {
  if (Os) return $r;
  Os = 1;
  const o = /* @__PURE__ */ kt(), { checkPath: h } = /* @__PURE__ */ $f(), d = (f) => {
    const u = { mode: 511 };
    return typeof f == "number" ? f : { ...u, ...f }.mode;
  };
  return $r.makeDir = async (f, u) => (h(f), o.mkdir(f, {
    mode: d(u),
    recursive: !0
  })), $r.makeDirSync = (f, u) => (h(f), o.mkdirSync(f, {
    mode: d(u),
    recursive: !0
  })), $r;
}
var hn, Ps;
function ot() {
  if (Ps) return hn;
  Ps = 1;
  const o = Xe().fromPromise, { makeDir: h, makeDirSync: d } = /* @__PURE__ */ Uf(), f = o(h);
  return hn = {
    mkdirs: f,
    mkdirsSync: d,
    // alias
    mkdirp: f,
    mkdirpSync: d,
    ensureDir: f,
    ensureDirSync: d
  }, hn;
}
var pn, Ds;
function Pt() {
  if (Ds) return pn;
  Ds = 1;
  const o = Xe().fromPromise, h = /* @__PURE__ */ kt();
  function d(f) {
    return h.access(f).then(() => !0).catch(() => !1);
  }
  return pn = {
    pathExists: o(d),
    pathExistsSync: h.existsSync
  }, pn;
}
var mn, Is;
function Uu() {
  if (Is) return mn;
  Is = 1;
  const o = ze();
  function h(f, u, n, e) {
    o.open(f, "r+", (i, t) => {
      if (i) return e(i);
      o.futimes(t, u, n, (r) => {
        o.close(t, (c) => {
          e && e(r || c);
        });
      });
    });
  }
  function d(f, u, n) {
    const e = o.openSync(f, "r+");
    return o.futimesSync(e, u, n), o.closeSync(e);
  }
  return mn = {
    utimesMillis: h,
    utimesMillisSync: d
  }, mn;
}
var gn, Ns;
function Mt() {
  if (Ns) return gn;
  Ns = 1;
  const o = /* @__PURE__ */ kt(), h = be, d = Hr;
  function f(s, p, g) {
    const E = g.dereference ? (m) => o.stat(m, { bigint: !0 }) : (m) => o.lstat(m, { bigint: !0 });
    return Promise.all([
      E(s),
      E(p).catch((m) => {
        if (m.code === "ENOENT") return null;
        throw m;
      })
    ]).then(([m, w]) => ({ srcStat: m, destStat: w }));
  }
  function u(s, p, g) {
    let E;
    const m = g.dereference ? (T) => o.statSync(T, { bigint: !0 }) : (T) => o.lstatSync(T, { bigint: !0 }), w = m(s);
    try {
      E = m(p);
    } catch (T) {
      if (T.code === "ENOENT") return { srcStat: w, destStat: null };
      throw T;
    }
    return { srcStat: w, destStat: E };
  }
  function n(s, p, g, E, m) {
    d.callbackify(f)(s, p, E, (w, T) => {
      if (w) return m(w);
      const { srcStat: O, destStat: P } = T;
      if (P) {
        if (r(O, P)) {
          const U = h.basename(s), R = h.basename(p);
          return g === "move" && U !== R && U.toLowerCase() === R.toLowerCase() ? m(null, { srcStat: O, destStat: P, isChangingCase: !0 }) : m(new Error("Source and destination must not be the same."));
        }
        if (O.isDirectory() && !P.isDirectory())
          return m(new Error(`Cannot overwrite non-directory '${p}' with directory '${s}'.`));
        if (!O.isDirectory() && P.isDirectory())
          return m(new Error(`Cannot overwrite directory '${p}' with non-directory '${s}'.`));
      }
      return O.isDirectory() && c(s, p) ? m(new Error(l(s, p, g))) : m(null, { srcStat: O, destStat: P });
    });
  }
  function e(s, p, g, E) {
    const { srcStat: m, destStat: w } = u(s, p, E);
    if (w) {
      if (r(m, w)) {
        const T = h.basename(s), O = h.basename(p);
        if (g === "move" && T !== O && T.toLowerCase() === O.toLowerCase())
          return { srcStat: m, destStat: w, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (m.isDirectory() && !w.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${s}'.`);
      if (!m.isDirectory() && w.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${s}'.`);
    }
    if (m.isDirectory() && c(s, p))
      throw new Error(l(s, p, g));
    return { srcStat: m, destStat: w };
  }
  function i(s, p, g, E, m) {
    const w = h.resolve(h.dirname(s)), T = h.resolve(h.dirname(g));
    if (T === w || T === h.parse(T).root) return m();
    o.stat(T, { bigint: !0 }, (O, P) => O ? O.code === "ENOENT" ? m() : m(O) : r(p, P) ? m(new Error(l(s, g, E))) : i(s, p, T, E, m));
  }
  function t(s, p, g, E) {
    const m = h.resolve(h.dirname(s)), w = h.resolve(h.dirname(g));
    if (w === m || w === h.parse(w).root) return;
    let T;
    try {
      T = o.statSync(w, { bigint: !0 });
    } catch (O) {
      if (O.code === "ENOENT") return;
      throw O;
    }
    if (r(p, T))
      throw new Error(l(s, g, E));
    return t(s, p, w, E);
  }
  function r(s, p) {
    return p.ino && p.dev && p.ino === s.ino && p.dev === s.dev;
  }
  function c(s, p) {
    const g = h.resolve(s).split(h.sep).filter((m) => m), E = h.resolve(p).split(h.sep).filter((m) => m);
    return g.reduce((m, w, T) => m && E[T] === w, !0);
  }
  function l(s, p, g) {
    return `Cannot ${g} '${s}' to a subdirectory of itself, '${p}'.`;
  }
  return gn = {
    checkPaths: n,
    checkPathsSync: e,
    checkParentPaths: i,
    checkParentPathsSync: t,
    isSrcSubdir: c,
    areIdentical: r
  }, gn;
}
var vn, Fs;
function qf() {
  if (Fs) return vn;
  Fs = 1;
  const o = ze(), h = be, d = ot().mkdirs, f = Pt().pathExists, u = Uu().utimesMillis, n = /* @__PURE__ */ Mt();
  function e($, L, k, I) {
    typeof k == "function" && !I ? (I = k, k = {}) : typeof k == "function" && (k = { filter: k }), I = I || function() {
    }, k = k || {}, k.clobber = "clobber" in k ? !!k.clobber : !0, k.overwrite = "overwrite" in k ? !!k.overwrite : k.clobber, k.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), n.checkPaths($, L, "copy", k, (D, F) => {
      if (D) return I(D);
      const { srcStat: q, destStat: K } = F;
      n.checkParentPaths($, q, L, "copy", (W) => W ? I(W) : k.filter ? t(i, K, $, L, k, I) : i(K, $, L, k, I));
    });
  }
  function i($, L, k, I, D) {
    const F = h.dirname(k);
    f(F, (q, K) => {
      if (q) return D(q);
      if (K) return c($, L, k, I, D);
      d(F, (W) => W ? D(W) : c($, L, k, I, D));
    });
  }
  function t($, L, k, I, D, F) {
    Promise.resolve(D.filter(k, I)).then((q) => q ? $(L, k, I, D, F) : F(), (q) => F(q));
  }
  function r($, L, k, I, D) {
    return I.filter ? t(c, $, L, k, I, D) : c($, L, k, I, D);
  }
  function c($, L, k, I, D) {
    (I.dereference ? o.stat : o.lstat)(L, (q, K) => q ? D(q) : K.isDirectory() ? P(K, $, L, k, I, D) : K.isFile() || K.isCharacterDevice() || K.isBlockDevice() ? l(K, $, L, k, I, D) : K.isSymbolicLink() ? y($, L, k, I, D) : K.isSocket() ? D(new Error(`Cannot copy a socket file: ${L}`)) : K.isFIFO() ? D(new Error(`Cannot copy a FIFO pipe: ${L}`)) : D(new Error(`Unknown file: ${L}`)));
  }
  function l($, L, k, I, D, F) {
    return L ? s($, k, I, D, F) : p($, k, I, D, F);
  }
  function s($, L, k, I, D) {
    if (I.overwrite)
      o.unlink(k, (F) => F ? D(F) : p($, L, k, I, D));
    else return I.errorOnExist ? D(new Error(`'${k}' already exists`)) : D();
  }
  function p($, L, k, I, D) {
    o.copyFile(L, k, (F) => F ? D(F) : I.preserveTimestamps ? g($.mode, L, k, D) : T(k, $.mode, D));
  }
  function g($, L, k, I) {
    return E($) ? m(k, $, (D) => D ? I(D) : w($, L, k, I)) : w($, L, k, I);
  }
  function E($) {
    return ($ & 128) === 0;
  }
  function m($, L, k) {
    return T($, L | 128, k);
  }
  function w($, L, k, I) {
    O(L, k, (D) => D ? I(D) : T(k, $, I));
  }
  function T($, L, k) {
    return o.chmod($, L, k);
  }
  function O($, L, k) {
    o.stat($, (I, D) => I ? k(I) : u(L, D.atime, D.mtime, k));
  }
  function P($, L, k, I, D, F) {
    return L ? R(k, I, D, F) : U($.mode, k, I, D, F);
  }
  function U($, L, k, I, D) {
    o.mkdir(k, (F) => {
      if (F) return D(F);
      R(L, k, I, (q) => q ? D(q) : T(k, $, D));
    });
  }
  function R($, L, k, I) {
    o.readdir($, (D, F) => D ? I(D) : S(F, $, L, k, I));
  }
  function S($, L, k, I, D) {
    const F = $.pop();
    return F ? b($, F, L, k, I, D) : D();
  }
  function b($, L, k, I, D, F) {
    const q = h.join(k, L), K = h.join(I, L);
    n.checkPaths(q, K, "copy", D, (W, ne) => {
      if (W) return F(W);
      const { destStat: ce } = ne;
      r(ce, q, K, D, (ue) => ue ? F(ue) : S($, k, I, D, F));
    });
  }
  function y($, L, k, I, D) {
    o.readlink(L, (F, q) => {
      if (F) return D(F);
      if (I.dereference && (q = h.resolve(process.cwd(), q)), $)
        o.readlink(k, (K, W) => K ? K.code === "EINVAL" || K.code === "UNKNOWN" ? o.symlink(q, k, D) : D(K) : (I.dereference && (W = h.resolve(process.cwd(), W)), n.isSrcSubdir(q, W) ? D(new Error(`Cannot copy '${q}' to a subdirectory of itself, '${W}'.`)) : $.isDirectory() && n.isSrcSubdir(W, q) ? D(new Error(`Cannot overwrite '${W}' with '${q}'.`)) : M(q, k, D)));
      else
        return o.symlink(q, k, D);
    });
  }
  function M($, L, k) {
    o.unlink(L, (I) => I ? k(I) : o.symlink($, L, k));
  }
  return vn = e, vn;
}
var yn, xs;
function kf() {
  if (xs) return yn;
  xs = 1;
  const o = ze(), h = be, d = ot().mkdirsSync, f = Uu().utimesMillisSync, u = /* @__PURE__ */ Mt();
  function n(S, b, y) {
    typeof y == "function" && (y = { filter: y }), y = y || {}, y.clobber = "clobber" in y ? !!y.clobber : !0, y.overwrite = "overwrite" in y ? !!y.overwrite : y.clobber, y.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: M, destStat: $ } = u.checkPathsSync(S, b, "copy", y);
    return u.checkParentPathsSync(S, M, b, "copy"), e($, S, b, y);
  }
  function e(S, b, y, M) {
    if (M.filter && !M.filter(b, y)) return;
    const $ = h.dirname(y);
    return o.existsSync($) || d($), t(S, b, y, M);
  }
  function i(S, b, y, M) {
    if (!(M.filter && !M.filter(b, y)))
      return t(S, b, y, M);
  }
  function t(S, b, y, M) {
    const L = (M.dereference ? o.statSync : o.lstatSync)(b);
    if (L.isDirectory()) return w(L, S, b, y, M);
    if (L.isFile() || L.isCharacterDevice() || L.isBlockDevice()) return r(L, S, b, y, M);
    if (L.isSymbolicLink()) return U(S, b, y, M);
    throw L.isSocket() ? new Error(`Cannot copy a socket file: ${b}`) : L.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${b}`) : new Error(`Unknown file: ${b}`);
  }
  function r(S, b, y, M, $) {
    return b ? c(S, y, M, $) : l(S, y, M, $);
  }
  function c(S, b, y, M) {
    if (M.overwrite)
      return o.unlinkSync(y), l(S, b, y, M);
    if (M.errorOnExist)
      throw new Error(`'${y}' already exists`);
  }
  function l(S, b, y, M) {
    return o.copyFileSync(b, y), M.preserveTimestamps && s(S.mode, b, y), E(y, S.mode);
  }
  function s(S, b, y) {
    return p(S) && g(y, S), m(b, y);
  }
  function p(S) {
    return (S & 128) === 0;
  }
  function g(S, b) {
    return E(S, b | 128);
  }
  function E(S, b) {
    return o.chmodSync(S, b);
  }
  function m(S, b) {
    const y = o.statSync(S);
    return f(b, y.atime, y.mtime);
  }
  function w(S, b, y, M, $) {
    return b ? O(y, M, $) : T(S.mode, y, M, $);
  }
  function T(S, b, y, M) {
    return o.mkdirSync(y), O(b, y, M), E(y, S);
  }
  function O(S, b, y) {
    o.readdirSync(S).forEach((M) => P(M, S, b, y));
  }
  function P(S, b, y, M) {
    const $ = h.join(b, S), L = h.join(y, S), { destStat: k } = u.checkPathsSync($, L, "copy", M);
    return i(k, $, L, M);
  }
  function U(S, b, y, M) {
    let $ = o.readlinkSync(b);
    if (M.dereference && ($ = h.resolve(process.cwd(), $)), S) {
      let L;
      try {
        L = o.readlinkSync(y);
      } catch (k) {
        if (k.code === "EINVAL" || k.code === "UNKNOWN") return o.symlinkSync($, y);
        throw k;
      }
      if (M.dereference && (L = h.resolve(process.cwd(), L)), u.isSrcSubdir($, L))
        throw new Error(`Cannot copy '${$}' to a subdirectory of itself, '${L}'.`);
      if (o.statSync(y).isDirectory() && u.isSrcSubdir(L, $))
        throw new Error(`Cannot overwrite '${L}' with '${$}'.`);
      return R($, y);
    } else
      return o.symlinkSync($, y);
  }
  function R(S, b) {
    return o.unlinkSync(b), o.symlinkSync(S, b);
  }
  return yn = n, yn;
}
var En, Ls;
function Io() {
  if (Ls) return En;
  Ls = 1;
  const o = Xe().fromCallback;
  return En = {
    copy: o(/* @__PURE__ */ qf()),
    copySync: /* @__PURE__ */ kf()
  }, En;
}
var wn, $s;
function Mf() {
  if ($s) return wn;
  $s = 1;
  const o = ze(), h = be, d = Nu, f = process.platform === "win32";
  function u(g) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((m) => {
      g[m] = g[m] || o[m], m = m + "Sync", g[m] = g[m] || o[m];
    }), g.maxBusyTries = g.maxBusyTries || 3;
  }
  function n(g, E, m) {
    let w = 0;
    typeof E == "function" && (m = E, E = {}), d(g, "rimraf: missing path"), d.strictEqual(typeof g, "string", "rimraf: path should be a string"), d.strictEqual(typeof m, "function", "rimraf: callback function required"), d(E, "rimraf: invalid options argument provided"), d.strictEqual(typeof E, "object", "rimraf: options should be object"), u(E), e(g, E, function T(O) {
      if (O) {
        if ((O.code === "EBUSY" || O.code === "ENOTEMPTY" || O.code === "EPERM") && w < E.maxBusyTries) {
          w++;
          const P = w * 100;
          return setTimeout(() => e(g, E, T), P);
        }
        O.code === "ENOENT" && (O = null);
      }
      m(O);
    });
  }
  function e(g, E, m) {
    d(g), d(E), d(typeof m == "function"), E.lstat(g, (w, T) => {
      if (w && w.code === "ENOENT")
        return m(null);
      if (w && w.code === "EPERM" && f)
        return i(g, E, w, m);
      if (T && T.isDirectory())
        return r(g, E, w, m);
      E.unlink(g, (O) => {
        if (O) {
          if (O.code === "ENOENT")
            return m(null);
          if (O.code === "EPERM")
            return f ? i(g, E, O, m) : r(g, E, O, m);
          if (O.code === "EISDIR")
            return r(g, E, O, m);
        }
        return m(O);
      });
    });
  }
  function i(g, E, m, w) {
    d(g), d(E), d(typeof w == "function"), E.chmod(g, 438, (T) => {
      T ? w(T.code === "ENOENT" ? null : m) : E.stat(g, (O, P) => {
        O ? w(O.code === "ENOENT" ? null : m) : P.isDirectory() ? r(g, E, m, w) : E.unlink(g, w);
      });
    });
  }
  function t(g, E, m) {
    let w;
    d(g), d(E);
    try {
      E.chmodSync(g, 438);
    } catch (T) {
      if (T.code === "ENOENT")
        return;
      throw m;
    }
    try {
      w = E.statSync(g);
    } catch (T) {
      if (T.code === "ENOENT")
        return;
      throw m;
    }
    w.isDirectory() ? s(g, E, m) : E.unlinkSync(g);
  }
  function r(g, E, m, w) {
    d(g), d(E), d(typeof w == "function"), E.rmdir(g, (T) => {
      T && (T.code === "ENOTEMPTY" || T.code === "EEXIST" || T.code === "EPERM") ? c(g, E, w) : T && T.code === "ENOTDIR" ? w(m) : w(T);
    });
  }
  function c(g, E, m) {
    d(g), d(E), d(typeof m == "function"), E.readdir(g, (w, T) => {
      if (w) return m(w);
      let O = T.length, P;
      if (O === 0) return E.rmdir(g, m);
      T.forEach((U) => {
        n(h.join(g, U), E, (R) => {
          if (!P) {
            if (R) return m(P = R);
            --O === 0 && E.rmdir(g, m);
          }
        });
      });
    });
  }
  function l(g, E) {
    let m;
    E = E || {}, u(E), d(g, "rimraf: missing path"), d.strictEqual(typeof g, "string", "rimraf: path should be a string"), d(E, "rimraf: missing options"), d.strictEqual(typeof E, "object", "rimraf: options should be object");
    try {
      m = E.lstatSync(g);
    } catch (w) {
      if (w.code === "ENOENT")
        return;
      w.code === "EPERM" && f && t(g, E, w);
    }
    try {
      m && m.isDirectory() ? s(g, E, null) : E.unlinkSync(g);
    } catch (w) {
      if (w.code === "ENOENT")
        return;
      if (w.code === "EPERM")
        return f ? t(g, E, w) : s(g, E, w);
      if (w.code !== "EISDIR")
        throw w;
      s(g, E, w);
    }
  }
  function s(g, E, m) {
    d(g), d(E);
    try {
      E.rmdirSync(g);
    } catch (w) {
      if (w.code === "ENOTDIR")
        throw m;
      if (w.code === "ENOTEMPTY" || w.code === "EEXIST" || w.code === "EPERM")
        p(g, E);
      else if (w.code !== "ENOENT")
        throw w;
    }
  }
  function p(g, E) {
    if (d(g), d(E), E.readdirSync(g).forEach((m) => l(h.join(g, m), E)), f) {
      const m = Date.now();
      do
        try {
          return E.rmdirSync(g, E);
        } catch {
        }
      while (Date.now() - m < 500);
    } else
      return E.rmdirSync(g, E);
  }
  return wn = n, n.sync = l, wn;
}
var _n, Us;
function Wr() {
  if (Us) return _n;
  Us = 1;
  const o = ze(), h = Xe().fromCallback, d = /* @__PURE__ */ Mf();
  function f(n, e) {
    if (o.rm) return o.rm(n, { recursive: !0, force: !0 }, e);
    d(n, e);
  }
  function u(n) {
    if (o.rmSync) return o.rmSync(n, { recursive: !0, force: !0 });
    d.sync(n);
  }
  return _n = {
    remove: h(f),
    removeSync: u
  }, _n;
}
var Sn, qs;
function Bf() {
  if (qs) return Sn;
  qs = 1;
  const o = Xe().fromPromise, h = /* @__PURE__ */ kt(), d = be, f = /* @__PURE__ */ ot(), u = /* @__PURE__ */ Wr(), n = o(async function(t) {
    let r;
    try {
      r = await h.readdir(t);
    } catch {
      return f.mkdirs(t);
    }
    return Promise.all(r.map((c) => u.remove(d.join(t, c))));
  });
  function e(i) {
    let t;
    try {
      t = h.readdirSync(i);
    } catch {
      return f.mkdirsSync(i);
    }
    t.forEach((r) => {
      r = d.join(i, r), u.removeSync(r);
    });
  }
  return Sn = {
    emptyDirSync: e,
    emptydirSync: e,
    emptyDir: n,
    emptydir: n
  }, Sn;
}
var An, ks;
function jf() {
  if (ks) return An;
  ks = 1;
  const o = Xe().fromCallback, h = be, d = ze(), f = /* @__PURE__ */ ot();
  function u(e, i) {
    function t() {
      d.writeFile(e, "", (r) => {
        if (r) return i(r);
        i();
      });
    }
    d.stat(e, (r, c) => {
      if (!r && c.isFile()) return i();
      const l = h.dirname(e);
      d.stat(l, (s, p) => {
        if (s)
          return s.code === "ENOENT" ? f.mkdirs(l, (g) => {
            if (g) return i(g);
            t();
          }) : i(s);
        p.isDirectory() ? t() : d.readdir(l, (g) => {
          if (g) return i(g);
        });
      });
    });
  }
  function n(e) {
    let i;
    try {
      i = d.statSync(e);
    } catch {
    }
    if (i && i.isFile()) return;
    const t = h.dirname(e);
    try {
      d.statSync(t).isDirectory() || d.readdirSync(t);
    } catch (r) {
      if (r && r.code === "ENOENT") f.mkdirsSync(t);
      else throw r;
    }
    d.writeFileSync(e, "");
  }
  return An = {
    createFile: o(u),
    createFileSync: n
  }, An;
}
var bn, Ms;
function Hf() {
  if (Ms) return bn;
  Ms = 1;
  const o = Xe().fromCallback, h = be, d = ze(), f = /* @__PURE__ */ ot(), u = Pt().pathExists, { areIdentical: n } = /* @__PURE__ */ Mt();
  function e(t, r, c) {
    function l(s, p) {
      d.link(s, p, (g) => {
        if (g) return c(g);
        c(null);
      });
    }
    d.lstat(r, (s, p) => {
      d.lstat(t, (g, E) => {
        if (g)
          return g.message = g.message.replace("lstat", "ensureLink"), c(g);
        if (p && n(E, p)) return c(null);
        const m = h.dirname(r);
        u(m, (w, T) => {
          if (w) return c(w);
          if (T) return l(t, r);
          f.mkdirs(m, (O) => {
            if (O) return c(O);
            l(t, r);
          });
        });
      });
    });
  }
  function i(t, r) {
    let c;
    try {
      c = d.lstatSync(r);
    } catch {
    }
    try {
      const p = d.lstatSync(t);
      if (c && n(p, c)) return;
    } catch (p) {
      throw p.message = p.message.replace("lstat", "ensureLink"), p;
    }
    const l = h.dirname(r);
    return d.existsSync(l) || f.mkdirsSync(l), d.linkSync(t, r);
  }
  return bn = {
    createLink: o(e),
    createLinkSync: i
  }, bn;
}
var Rn, Bs;
function Gf() {
  if (Bs) return Rn;
  Bs = 1;
  const o = be, h = ze(), d = Pt().pathExists;
  function f(n, e, i) {
    if (o.isAbsolute(n))
      return h.lstat(n, (t) => t ? (t.message = t.message.replace("lstat", "ensureSymlink"), i(t)) : i(null, {
        toCwd: n,
        toDst: n
      }));
    {
      const t = o.dirname(e), r = o.join(t, n);
      return d(r, (c, l) => c ? i(c) : l ? i(null, {
        toCwd: r,
        toDst: n
      }) : h.lstat(n, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), i(s)) : i(null, {
        toCwd: n,
        toDst: o.relative(t, n)
      })));
    }
  }
  function u(n, e) {
    let i;
    if (o.isAbsolute(n)) {
      if (i = h.existsSync(n), !i) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: n,
        toDst: n
      };
    } else {
      const t = o.dirname(e), r = o.join(t, n);
      if (i = h.existsSync(r), i)
        return {
          toCwd: r,
          toDst: n
        };
      if (i = h.existsSync(n), !i) throw new Error("relative srcpath does not exist");
      return {
        toCwd: n,
        toDst: o.relative(t, n)
      };
    }
  }
  return Rn = {
    symlinkPaths: f,
    symlinkPathsSync: u
  }, Rn;
}
var Tn, js;
function Wf() {
  if (js) return Tn;
  js = 1;
  const o = ze();
  function h(f, u, n) {
    if (n = typeof u == "function" ? u : n, u = typeof u == "function" ? !1 : u, u) return n(null, u);
    o.lstat(f, (e, i) => {
      if (e) return n(null, "file");
      u = i && i.isDirectory() ? "dir" : "file", n(null, u);
    });
  }
  function d(f, u) {
    let n;
    if (u) return u;
    try {
      n = o.lstatSync(f);
    } catch {
      return "file";
    }
    return n && n.isDirectory() ? "dir" : "file";
  }
  return Tn = {
    symlinkType: h,
    symlinkTypeSync: d
  }, Tn;
}
var Cn, Hs;
function zf() {
  if (Hs) return Cn;
  Hs = 1;
  const o = Xe().fromCallback, h = be, d = /* @__PURE__ */ kt(), f = /* @__PURE__ */ ot(), u = f.mkdirs, n = f.mkdirsSync, e = /* @__PURE__ */ Gf(), i = e.symlinkPaths, t = e.symlinkPathsSync, r = /* @__PURE__ */ Wf(), c = r.symlinkType, l = r.symlinkTypeSync, s = Pt().pathExists, { areIdentical: p } = /* @__PURE__ */ Mt();
  function g(w, T, O, P) {
    P = typeof O == "function" ? O : P, O = typeof O == "function" ? !1 : O, d.lstat(T, (U, R) => {
      !U && R.isSymbolicLink() ? Promise.all([
        d.stat(w),
        d.stat(T)
      ]).then(([S, b]) => {
        if (p(S, b)) return P(null);
        E(w, T, O, P);
      }) : E(w, T, O, P);
    });
  }
  function E(w, T, O, P) {
    i(w, T, (U, R) => {
      if (U) return P(U);
      w = R.toDst, c(R.toCwd, O, (S, b) => {
        if (S) return P(S);
        const y = h.dirname(T);
        s(y, (M, $) => {
          if (M) return P(M);
          if ($) return d.symlink(w, T, b, P);
          u(y, (L) => {
            if (L) return P(L);
            d.symlink(w, T, b, P);
          });
        });
      });
    });
  }
  function m(w, T, O) {
    let P;
    try {
      P = d.lstatSync(T);
    } catch {
    }
    if (P && P.isSymbolicLink()) {
      const b = d.statSync(w), y = d.statSync(T);
      if (p(b, y)) return;
    }
    const U = t(w, T);
    w = U.toDst, O = l(U.toCwd, O);
    const R = h.dirname(T);
    return d.existsSync(R) || n(R), d.symlinkSync(w, T, O);
  }
  return Cn = {
    createSymlink: o(g),
    createSymlinkSync: m
  }, Cn;
}
var On, Gs;
function Vf() {
  if (Gs) return On;
  Gs = 1;
  const { createFile: o, createFileSync: h } = /* @__PURE__ */ jf(), { createLink: d, createLinkSync: f } = /* @__PURE__ */ Hf(), { createSymlink: u, createSymlinkSync: n } = /* @__PURE__ */ zf();
  return On = {
    // file
    createFile: o,
    createFileSync: h,
    ensureFile: o,
    ensureFileSync: h,
    // link
    createLink: d,
    createLinkSync: f,
    ensureLink: d,
    ensureLinkSync: f,
    // symlink
    createSymlink: u,
    createSymlinkSync: n,
    ensureSymlink: u,
    ensureSymlinkSync: n
  }, On;
}
var Pn, Ws;
function No() {
  if (Ws) return Pn;
  Ws = 1;
  function o(d, { EOL: f = `
`, finalEOL: u = !0, replacer: n = null, spaces: e } = {}) {
    const i = u ? f : "";
    return JSON.stringify(d, n, e).replace(/\n/g, f) + i;
  }
  function h(d) {
    return Buffer.isBuffer(d) && (d = d.toString("utf8")), d.replace(/^\uFEFF/, "");
  }
  return Pn = { stringify: o, stripBom: h }, Pn;
}
var Dn, zs;
function Yf() {
  if (zs) return Dn;
  zs = 1;
  let o;
  try {
    o = ze();
  } catch {
    o = Ye;
  }
  const h = Xe(), { stringify: d, stripBom: f } = No();
  async function u(l, s = {}) {
    typeof s == "string" && (s = { encoding: s });
    const p = s.fs || o, g = "throws" in s ? s.throws : !0;
    let E = await h.fromCallback(p.readFile)(l, s);
    E = f(E);
    let m;
    try {
      m = JSON.parse(E, s ? s.reviver : null);
    } catch (w) {
      if (g)
        throw w.message = `${l}: ${w.message}`, w;
      return null;
    }
    return m;
  }
  const n = h.fromPromise(u);
  function e(l, s = {}) {
    typeof s == "string" && (s = { encoding: s });
    const p = s.fs || o, g = "throws" in s ? s.throws : !0;
    try {
      let E = p.readFileSync(l, s);
      return E = f(E), JSON.parse(E, s.reviver);
    } catch (E) {
      if (g)
        throw E.message = `${l}: ${E.message}`, E;
      return null;
    }
  }
  async function i(l, s, p = {}) {
    const g = p.fs || o, E = d(s, p);
    await h.fromCallback(g.writeFile)(l, E, p);
  }
  const t = h.fromPromise(i);
  function r(l, s, p = {}) {
    const g = p.fs || o, E = d(s, p);
    return g.writeFileSync(l, E, p);
  }
  return Dn = {
    readFile: n,
    readFileSync: e,
    writeFile: t,
    writeFileSync: r
  }, Dn;
}
var In, Vs;
function Xf() {
  if (Vs) return In;
  Vs = 1;
  const o = Yf();
  return In = {
    // jsonfile exports
    readJson: o.readFile,
    readJsonSync: o.readFileSync,
    writeJson: o.writeFile,
    writeJsonSync: o.writeFileSync
  }, In;
}
var Nn, Ys;
function Fo() {
  if (Ys) return Nn;
  Ys = 1;
  const o = Xe().fromCallback, h = ze(), d = be, f = /* @__PURE__ */ ot(), u = Pt().pathExists;
  function n(i, t, r, c) {
    typeof r == "function" && (c = r, r = "utf8");
    const l = d.dirname(i);
    u(l, (s, p) => {
      if (s) return c(s);
      if (p) return h.writeFile(i, t, r, c);
      f.mkdirs(l, (g) => {
        if (g) return c(g);
        h.writeFile(i, t, r, c);
      });
    });
  }
  function e(i, ...t) {
    const r = d.dirname(i);
    if (h.existsSync(r))
      return h.writeFileSync(i, ...t);
    f.mkdirsSync(r), h.writeFileSync(i, ...t);
  }
  return Nn = {
    outputFile: o(n),
    outputFileSync: e
  }, Nn;
}
var Fn, Xs;
function Jf() {
  if (Xs) return Fn;
  Xs = 1;
  const { stringify: o } = No(), { outputFile: h } = /* @__PURE__ */ Fo();
  async function d(f, u, n = {}) {
    const e = o(u, n);
    await h(f, e, n);
  }
  return Fn = d, Fn;
}
var xn, Js;
function Kf() {
  if (Js) return xn;
  Js = 1;
  const { stringify: o } = No(), { outputFileSync: h } = /* @__PURE__ */ Fo();
  function d(f, u, n) {
    const e = o(u, n);
    h(f, e, n);
  }
  return xn = d, xn;
}
var Ln, Ks;
function Qf() {
  if (Ks) return Ln;
  Ks = 1;
  const o = Xe().fromPromise, h = /* @__PURE__ */ Xf();
  return h.outputJson = o(/* @__PURE__ */ Jf()), h.outputJsonSync = /* @__PURE__ */ Kf(), h.outputJSON = h.outputJson, h.outputJSONSync = h.outputJsonSync, h.writeJSON = h.writeJson, h.writeJSONSync = h.writeJsonSync, h.readJSON = h.readJson, h.readJSONSync = h.readJsonSync, Ln = h, Ln;
}
var $n, Qs;
function Zf() {
  if (Qs) return $n;
  Qs = 1;
  const o = ze(), h = be, d = Io().copy, f = Wr().remove, u = ot().mkdirp, n = Pt().pathExists, e = /* @__PURE__ */ Mt();
  function i(s, p, g, E) {
    typeof g == "function" && (E = g, g = {}), g = g || {};
    const m = g.overwrite || g.clobber || !1;
    e.checkPaths(s, p, "move", g, (w, T) => {
      if (w) return E(w);
      const { srcStat: O, isChangingCase: P = !1 } = T;
      e.checkParentPaths(s, O, p, "move", (U) => {
        if (U) return E(U);
        if (t(p)) return r(s, p, m, P, E);
        u(h.dirname(p), (R) => R ? E(R) : r(s, p, m, P, E));
      });
    });
  }
  function t(s) {
    const p = h.dirname(s);
    return h.parse(p).root === p;
  }
  function r(s, p, g, E, m) {
    if (E) return c(s, p, g, m);
    if (g)
      return f(p, (w) => w ? m(w) : c(s, p, g, m));
    n(p, (w, T) => w ? m(w) : T ? m(new Error("dest already exists.")) : c(s, p, g, m));
  }
  function c(s, p, g, E) {
    o.rename(s, p, (m) => m ? m.code !== "EXDEV" ? E(m) : l(s, p, g, E) : E());
  }
  function l(s, p, g, E) {
    d(s, p, {
      overwrite: g,
      errorOnExist: !0
    }, (w) => w ? E(w) : f(s, E));
  }
  return $n = i, $n;
}
var Un, Zs;
function ed() {
  if (Zs) return Un;
  Zs = 1;
  const o = ze(), h = be, d = Io().copySync, f = Wr().removeSync, u = ot().mkdirpSync, n = /* @__PURE__ */ Mt();
  function e(l, s, p) {
    p = p || {};
    const g = p.overwrite || p.clobber || !1, { srcStat: E, isChangingCase: m = !1 } = n.checkPathsSync(l, s, "move", p);
    return n.checkParentPathsSync(l, E, s, "move"), i(s) || u(h.dirname(s)), t(l, s, g, m);
  }
  function i(l) {
    const s = h.dirname(l);
    return h.parse(s).root === s;
  }
  function t(l, s, p, g) {
    if (g) return r(l, s, p);
    if (p)
      return f(s), r(l, s, p);
    if (o.existsSync(s)) throw new Error("dest already exists.");
    return r(l, s, p);
  }
  function r(l, s, p) {
    try {
      o.renameSync(l, s);
    } catch (g) {
      if (g.code !== "EXDEV") throw g;
      return c(l, s, p);
    }
  }
  function c(l, s, p) {
    return d(l, s, {
      overwrite: p,
      errorOnExist: !0
    }), f(l);
  }
  return Un = e, Un;
}
var qn, ea;
function td() {
  if (ea) return qn;
  ea = 1;
  const o = Xe().fromCallback;
  return qn = {
    move: o(/* @__PURE__ */ Zf()),
    moveSync: /* @__PURE__ */ ed()
  }, qn;
}
var kn, ta;
function vt() {
  return ta || (ta = 1, kn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ kt(),
    // Export extra methods:
    .../* @__PURE__ */ Io(),
    .../* @__PURE__ */ Bf(),
    .../* @__PURE__ */ Vf(),
    .../* @__PURE__ */ Qf(),
    .../* @__PURE__ */ ot(),
    .../* @__PURE__ */ td(),
    .../* @__PURE__ */ Fo(),
    .../* @__PURE__ */ Pt(),
    .../* @__PURE__ */ Wr()
  }), kn;
}
var Yt = {}, Ct = {}, He = {}, Ur = {}, ht = {}, ra;
function vr() {
  if (ra) return ht;
  ra = 1;
  function o(e) {
    return typeof e > "u" || e === null;
  }
  function h(e) {
    return typeof e == "object" && e !== null;
  }
  function d(e) {
    return Array.isArray(e) ? e : o(e) ? [] : [e];
  }
  function f(e, i) {
    var t, r, c, l;
    if (i)
      for (l = Object.keys(i), t = 0, r = l.length; t < r; t += 1)
        c = l[t], e[c] = i[c];
    return e;
  }
  function u(e, i) {
    var t = "", r;
    for (r = 0; r < i; r += 1)
      t += e;
    return t;
  }
  function n(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  return ht.isNothing = o, ht.isObject = h, ht.toArray = d, ht.repeat = u, ht.isNegativeZero = n, ht.extend = f, ht;
}
var Mn, na;
function yr() {
  if (na) return Mn;
  na = 1;
  function o(d, f) {
    var u = "", n = d.reason || "(unknown reason)";
    return d.mark ? (d.mark.name && (u += 'in "' + d.mark.name + '" '), u += "(" + (d.mark.line + 1) + ":" + (d.mark.column + 1) + ")", !f && d.mark.snippet && (u += `

` + d.mark.snippet), n + " " + u) : n;
  }
  function h(d, f) {
    Error.call(this), this.name = "YAMLException", this.reason = d, this.mark = f, this.message = o(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return h.prototype = Object.create(Error.prototype), h.prototype.constructor = h, h.prototype.toString = function(f) {
    return this.name + ": " + o(this, f);
  }, Mn = h, Mn;
}
var Bn, ia;
function rd() {
  if (ia) return Bn;
  ia = 1;
  var o = vr();
  function h(u, n, e, i, t) {
    var r = "", c = "", l = Math.floor(t / 2) - 1;
    return i - n > l && (r = " ... ", n = i - l + r.length), e - i > l && (c = " ...", e = i + l - c.length), {
      str: r + u.slice(n, e).replace(/\t/g, "→") + c,
      pos: i - n + r.length
      // relative position
    };
  }
  function d(u, n) {
    return o.repeat(" ", n - u.length) + u;
  }
  function f(u, n) {
    if (n = Object.create(n || null), !u.buffer) return null;
    n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
    for (var e = /\r?\n|\r|\0/g, i = [0], t = [], r, c = -1; r = e.exec(u.buffer); )
      t.push(r.index), i.push(r.index + r[0].length), u.position <= r.index && c < 0 && (c = i.length - 2);
    c < 0 && (c = i.length - 1);
    var l = "", s, p, g = Math.min(u.line + n.linesAfter, t.length).toString().length, E = n.maxLength - (n.indent + g + 3);
    for (s = 1; s <= n.linesBefore && !(c - s < 0); s++)
      p = h(
        u.buffer,
        i[c - s],
        t[c - s],
        u.position - (i[c] - i[c - s]),
        E
      ), l = o.repeat(" ", n.indent) + d((u.line - s + 1).toString(), g) + " | " + p.str + `
` + l;
    for (p = h(u.buffer, i[c], t[c], u.position, E), l += o.repeat(" ", n.indent) + d((u.line + 1).toString(), g) + " | " + p.str + `
`, l += o.repeat("-", n.indent + g + 3 + p.pos) + `^
`, s = 1; s <= n.linesAfter && !(c + s >= t.length); s++)
      p = h(
        u.buffer,
        i[c + s],
        t[c + s],
        u.position - (i[c] - i[c + s]),
        E
      ), l += o.repeat(" ", n.indent) + d((u.line + s + 1).toString(), g) + " | " + p.str + `
`;
    return l.replace(/\n$/, "");
  }
  return Bn = f, Bn;
}
var jn, oa;
function Ge() {
  if (oa) return jn;
  oa = 1;
  var o = yr(), h = [
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
  ], d = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function f(n) {
    var e = {};
    return n !== null && Object.keys(n).forEach(function(i) {
      n[i].forEach(function(t) {
        e[String(t)] = i;
      });
    }), e;
  }
  function u(n, e) {
    if (e = e || {}, Object.keys(e).forEach(function(i) {
      if (h.indexOf(i) === -1)
        throw new o('Unknown option "' + i + '" is met in definition of "' + n + '" YAML type.');
    }), this.options = e, this.tag = n, this.kind = e.kind || null, this.resolve = e.resolve || function() {
      return !0;
    }, this.construct = e.construct || function(i) {
      return i;
    }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = f(e.styleAliases || null), d.indexOf(this.kind) === -1)
      throw new o('Unknown kind "' + this.kind + '" is specified for "' + n + '" YAML type.');
  }
  return jn = u, jn;
}
var Hn, sa;
function qu() {
  if (sa) return Hn;
  sa = 1;
  var o = yr(), h = Ge();
  function d(n, e) {
    var i = [];
    return n[e].forEach(function(t) {
      var r = i.length;
      i.forEach(function(c, l) {
        c.tag === t.tag && c.kind === t.kind && c.multi === t.multi && (r = l);
      }), i[r] = t;
    }), i;
  }
  function f() {
    var n = {
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
    }, e, i;
    function t(r) {
      r.multi ? (n.multi[r.kind].push(r), n.multi.fallback.push(r)) : n[r.kind][r.tag] = n.fallback[r.tag] = r;
    }
    for (e = 0, i = arguments.length; e < i; e += 1)
      arguments[e].forEach(t);
    return n;
  }
  function u(n) {
    return this.extend(n);
  }
  return u.prototype.extend = function(e) {
    var i = [], t = [];
    if (e instanceof h)
      t.push(e);
    else if (Array.isArray(e))
      t = t.concat(e);
    else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
      e.implicit && (i = i.concat(e.implicit)), e.explicit && (t = t.concat(e.explicit));
    else
      throw new o("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    i.forEach(function(c) {
      if (!(c instanceof h))
        throw new o("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (c.loadKind && c.loadKind !== "scalar")
        throw new o("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (c.multi)
        throw new o("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), t.forEach(function(c) {
      if (!(c instanceof h))
        throw new o("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var r = Object.create(u.prototype);
    return r.implicit = (this.implicit || []).concat(i), r.explicit = (this.explicit || []).concat(t), r.compiledImplicit = d(r, "implicit"), r.compiledExplicit = d(r, "explicit"), r.compiledTypeMap = f(r.compiledImplicit, r.compiledExplicit), r;
  }, Hn = u, Hn;
}
var Gn, aa;
function ku() {
  if (aa) return Gn;
  aa = 1;
  var o = Ge();
  return Gn = new o("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(h) {
      return h !== null ? h : "";
    }
  }), Gn;
}
var Wn, la;
function Mu() {
  if (la) return Wn;
  la = 1;
  var o = Ge();
  return Wn = new o("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(h) {
      return h !== null ? h : [];
    }
  }), Wn;
}
var zn, ua;
function Bu() {
  if (ua) return zn;
  ua = 1;
  var o = Ge();
  return zn = new o("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(h) {
      return h !== null ? h : {};
    }
  }), zn;
}
var Vn, ca;
function ju() {
  if (ca) return Vn;
  ca = 1;
  var o = qu();
  return Vn = new o({
    explicit: [
      ku(),
      Mu(),
      Bu()
    ]
  }), Vn;
}
var Yn, fa;
function Hu() {
  if (fa) return Yn;
  fa = 1;
  var o = Ge();
  function h(u) {
    if (u === null) return !0;
    var n = u.length;
    return n === 1 && u === "~" || n === 4 && (u === "null" || u === "Null" || u === "NULL");
  }
  function d() {
    return null;
  }
  function f(u) {
    return u === null;
  }
  return Yn = new o("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: h,
    construct: d,
    predicate: f,
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
  }), Yn;
}
var Xn, da;
function Gu() {
  if (da) return Xn;
  da = 1;
  var o = Ge();
  function h(u) {
    if (u === null) return !1;
    var n = u.length;
    return n === 4 && (u === "true" || u === "True" || u === "TRUE") || n === 5 && (u === "false" || u === "False" || u === "FALSE");
  }
  function d(u) {
    return u === "true" || u === "True" || u === "TRUE";
  }
  function f(u) {
    return Object.prototype.toString.call(u) === "[object Boolean]";
  }
  return Xn = new o("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: h,
    construct: d,
    predicate: f,
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
  }), Xn;
}
var Jn, ha;
function Wu() {
  if (ha) return Jn;
  ha = 1;
  var o = vr(), h = Ge();
  function d(t) {
    return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
  }
  function f(t) {
    return 48 <= t && t <= 55;
  }
  function u(t) {
    return 48 <= t && t <= 57;
  }
  function n(t) {
    if (t === null) return !1;
    var r = t.length, c = 0, l = !1, s;
    if (!r) return !1;
    if (s = t[c], (s === "-" || s === "+") && (s = t[++c]), s === "0") {
      if (c + 1 === r) return !0;
      if (s = t[++c], s === "b") {
        for (c++; c < r; c++)
          if (s = t[c], s !== "_") {
            if (s !== "0" && s !== "1") return !1;
            l = !0;
          }
        return l && s !== "_";
      }
      if (s === "x") {
        for (c++; c < r; c++)
          if (s = t[c], s !== "_") {
            if (!d(t.charCodeAt(c))) return !1;
            l = !0;
          }
        return l && s !== "_";
      }
      if (s === "o") {
        for (c++; c < r; c++)
          if (s = t[c], s !== "_") {
            if (!f(t.charCodeAt(c))) return !1;
            l = !0;
          }
        return l && s !== "_";
      }
    }
    if (s === "_") return !1;
    for (; c < r; c++)
      if (s = t[c], s !== "_") {
        if (!u(t.charCodeAt(c)))
          return !1;
        l = !0;
      }
    return !(!l || s === "_");
  }
  function e(t) {
    var r = t, c = 1, l;
    if (r.indexOf("_") !== -1 && (r = r.replace(/_/g, "")), l = r[0], (l === "-" || l === "+") && (l === "-" && (c = -1), r = r.slice(1), l = r[0]), r === "0") return 0;
    if (l === "0") {
      if (r[1] === "b") return c * parseInt(r.slice(2), 2);
      if (r[1] === "x") return c * parseInt(r.slice(2), 16);
      if (r[1] === "o") return c * parseInt(r.slice(2), 8);
    }
    return c * parseInt(r, 10);
  }
  function i(t) {
    return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !o.isNegativeZero(t);
  }
  return Jn = new h("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: n,
    construct: e,
    predicate: i,
    represent: {
      binary: function(t) {
        return t >= 0 ? "0b" + t.toString(2) : "-0b" + t.toString(2).slice(1);
      },
      octal: function(t) {
        return t >= 0 ? "0o" + t.toString(8) : "-0o" + t.toString(8).slice(1);
      },
      decimal: function(t) {
        return t.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(t) {
        return t >= 0 ? "0x" + t.toString(16).toUpperCase() : "-0x" + t.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), Jn;
}
var Kn, pa;
function zu() {
  if (pa) return Kn;
  pa = 1;
  var o = vr(), h = Ge(), d = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function f(t) {
    return !(t === null || !d.test(t) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    t[t.length - 1] === "_");
  }
  function u(t) {
    var r, c;
    return r = t.replace(/_/g, "").toLowerCase(), c = r[0] === "-" ? -1 : 1, "+-".indexOf(r[0]) >= 0 && (r = r.slice(1)), r === ".inf" ? c === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : r === ".nan" ? NaN : c * parseFloat(r, 10);
  }
  var n = /^[-+]?[0-9]+e/;
  function e(t, r) {
    var c;
    if (isNaN(t))
      switch (r) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === t)
      switch (r) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === t)
      switch (r) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (o.isNegativeZero(t))
      return "-0.0";
    return c = t.toString(10), n.test(c) ? c.replace("e", ".e") : c;
  }
  function i(t) {
    return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || o.isNegativeZero(t));
  }
  return Kn = new h("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: f,
    construct: u,
    predicate: i,
    represent: e,
    defaultStyle: "lowercase"
  }), Kn;
}
var Qn, ma;
function Vu() {
  return ma || (ma = 1, Qn = ju().extend({
    implicit: [
      Hu(),
      Gu(),
      Wu(),
      zu()
    ]
  })), Qn;
}
var Zn, ga;
function Yu() {
  return ga || (ga = 1, Zn = Vu()), Zn;
}
var ei, va;
function Xu() {
  if (va) return ei;
  va = 1;
  var o = Ge(), h = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), d = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function f(e) {
    return e === null ? !1 : h.exec(e) !== null || d.exec(e) !== null;
  }
  function u(e) {
    var i, t, r, c, l, s, p, g = 0, E = null, m, w, T;
    if (i = h.exec(e), i === null && (i = d.exec(e)), i === null) throw new Error("Date resolve error");
    if (t = +i[1], r = +i[2] - 1, c = +i[3], !i[4])
      return new Date(Date.UTC(t, r, c));
    if (l = +i[4], s = +i[5], p = +i[6], i[7]) {
      for (g = i[7].slice(0, 3); g.length < 3; )
        g += "0";
      g = +g;
    }
    return i[9] && (m = +i[10], w = +(i[11] || 0), E = (m * 60 + w) * 6e4, i[9] === "-" && (E = -E)), T = new Date(Date.UTC(t, r, c, l, s, p, g)), E && T.setTime(T.getTime() - E), T;
  }
  function n(e) {
    return e.toISOString();
  }
  return ei = new o("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: f,
    construct: u,
    instanceOf: Date,
    represent: n
  }), ei;
}
var ti, ya;
function Ju() {
  if (ya) return ti;
  ya = 1;
  var o = Ge();
  function h(d) {
    return d === "<<" || d === null;
  }
  return ti = new o("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: h
  }), ti;
}
var ri, Ea;
function Ku() {
  if (Ea) return ri;
  Ea = 1;
  var o = Ge(), h = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function d(e) {
    if (e === null) return !1;
    var i, t, r = 0, c = e.length, l = h;
    for (t = 0; t < c; t++)
      if (i = l.indexOf(e.charAt(t)), !(i > 64)) {
        if (i < 0) return !1;
        r += 6;
      }
    return r % 8 === 0;
  }
  function f(e) {
    var i, t, r = e.replace(/[\r\n=]/g, ""), c = r.length, l = h, s = 0, p = [];
    for (i = 0; i < c; i++)
      i % 4 === 0 && i && (p.push(s >> 16 & 255), p.push(s >> 8 & 255), p.push(s & 255)), s = s << 6 | l.indexOf(r.charAt(i));
    return t = c % 4 * 6, t === 0 ? (p.push(s >> 16 & 255), p.push(s >> 8 & 255), p.push(s & 255)) : t === 18 ? (p.push(s >> 10 & 255), p.push(s >> 2 & 255)) : t === 12 && p.push(s >> 4 & 255), new Uint8Array(p);
  }
  function u(e) {
    var i = "", t = 0, r, c, l = e.length, s = h;
    for (r = 0; r < l; r++)
      r % 3 === 0 && r && (i += s[t >> 18 & 63], i += s[t >> 12 & 63], i += s[t >> 6 & 63], i += s[t & 63]), t = (t << 8) + e[r];
    return c = l % 3, c === 0 ? (i += s[t >> 18 & 63], i += s[t >> 12 & 63], i += s[t >> 6 & 63], i += s[t & 63]) : c === 2 ? (i += s[t >> 10 & 63], i += s[t >> 4 & 63], i += s[t << 2 & 63], i += s[64]) : c === 1 && (i += s[t >> 2 & 63], i += s[t << 4 & 63], i += s[64], i += s[64]), i;
  }
  function n(e) {
    return Object.prototype.toString.call(e) === "[object Uint8Array]";
  }
  return ri = new o("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: d,
    construct: f,
    predicate: n,
    represent: u
  }), ri;
}
var ni, wa;
function Qu() {
  if (wa) return ni;
  wa = 1;
  var o = Ge(), h = Object.prototype.hasOwnProperty, d = Object.prototype.toString;
  function f(n) {
    if (n === null) return !0;
    var e = [], i, t, r, c, l, s = n;
    for (i = 0, t = s.length; i < t; i += 1) {
      if (r = s[i], l = !1, d.call(r) !== "[object Object]") return !1;
      for (c in r)
        if (h.call(r, c))
          if (!l) l = !0;
          else return !1;
      if (!l) return !1;
      if (e.indexOf(c) === -1) e.push(c);
      else return !1;
    }
    return !0;
  }
  function u(n) {
    return n !== null ? n : [];
  }
  return ni = new o("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: f,
    construct: u
  }), ni;
}
var ii, _a;
function Zu() {
  if (_a) return ii;
  _a = 1;
  var o = Ge(), h = Object.prototype.toString;
  function d(u) {
    if (u === null) return !0;
    var n, e, i, t, r, c = u;
    for (r = new Array(c.length), n = 0, e = c.length; n < e; n += 1) {
      if (i = c[n], h.call(i) !== "[object Object]" || (t = Object.keys(i), t.length !== 1)) return !1;
      r[n] = [t[0], i[t[0]]];
    }
    return !0;
  }
  function f(u) {
    if (u === null) return [];
    var n, e, i, t, r, c = u;
    for (r = new Array(c.length), n = 0, e = c.length; n < e; n += 1)
      i = c[n], t = Object.keys(i), r[n] = [t[0], i[t[0]]];
    return r;
  }
  return ii = new o("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: d,
    construct: f
  }), ii;
}
var oi, Sa;
function ec() {
  if (Sa) return oi;
  Sa = 1;
  var o = Ge(), h = Object.prototype.hasOwnProperty;
  function d(u) {
    if (u === null) return !0;
    var n, e = u;
    for (n in e)
      if (h.call(e, n) && e[n] !== null)
        return !1;
    return !0;
  }
  function f(u) {
    return u !== null ? u : {};
  }
  return oi = new o("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: d,
    construct: f
  }), oi;
}
var si, Aa;
function xo() {
  return Aa || (Aa = 1, si = Yu().extend({
    implicit: [
      Xu(),
      Ju()
    ],
    explicit: [
      Ku(),
      Qu(),
      Zu(),
      ec()
    ]
  })), si;
}
var ba;
function nd() {
  if (ba) return Ur;
  ba = 1;
  var o = vr(), h = yr(), d = rd(), f = xo(), u = Object.prototype.hasOwnProperty, n = 1, e = 2, i = 3, t = 4, r = 1, c = 2, l = 3, s = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, p = /[\x85\u2028\u2029]/, g = /[,\[\]\{\}]/, E = /^(?:!|!!|![a-z\-]+!)$/i, m = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function w(a) {
    return Object.prototype.toString.call(a);
  }
  function T(a) {
    return a === 10 || a === 13;
  }
  function O(a) {
    return a === 9 || a === 32;
  }
  function P(a) {
    return a === 9 || a === 32 || a === 10 || a === 13;
  }
  function U(a) {
    return a === 44 || a === 91 || a === 93 || a === 123 || a === 125;
  }
  function R(a) {
    var B;
    return 48 <= a && a <= 57 ? a - 48 : (B = a | 32, 97 <= B && B <= 102 ? B - 97 + 10 : -1);
  }
  function S(a) {
    return a === 120 ? 2 : a === 117 ? 4 : a === 85 ? 8 : 0;
  }
  function b(a) {
    return 48 <= a && a <= 57 ? a - 48 : -1;
  }
  function y(a) {
    return a === 48 ? "\0" : a === 97 ? "\x07" : a === 98 ? "\b" : a === 116 || a === 9 ? "	" : a === 110 ? `
` : a === 118 ? "\v" : a === 102 ? "\f" : a === 114 ? "\r" : a === 101 ? "\x1B" : a === 32 ? " " : a === 34 ? '"' : a === 47 ? "/" : a === 92 ? "\\" : a === 78 ? "" : a === 95 ? " " : a === 76 ? "\u2028" : a === 80 ? "\u2029" : "";
  }
  function M(a) {
    return a <= 65535 ? String.fromCharCode(a) : String.fromCharCode(
      (a - 65536 >> 10) + 55296,
      (a - 65536 & 1023) + 56320
    );
  }
  for (var $ = new Array(256), L = new Array(256), k = 0; k < 256; k++)
    $[k] = y(k) ? 1 : 0, L[k] = y(k);
  function I(a, B) {
    this.input = a, this.filename = B.filename || null, this.schema = B.schema || f, this.onWarning = B.onWarning || null, this.legacy = B.legacy || !1, this.json = B.json || !1, this.listener = B.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = a.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function D(a, B) {
    var G = {
      name: a.filename,
      buffer: a.input.slice(0, -1),
      // omit trailing \0
      position: a.position,
      line: a.line,
      column: a.position - a.lineStart
    };
    return G.snippet = d(G), new h(B, G);
  }
  function F(a, B) {
    throw D(a, B);
  }
  function q(a, B) {
    a.onWarning && a.onWarning.call(null, D(a, B));
  }
  var K = {
    YAML: function(B, G, re) {
      var z, te, Z;
      B.version !== null && F(B, "duplication of %YAML directive"), re.length !== 1 && F(B, "YAML directive accepts exactly one argument"), z = /^([0-9]+)\.([0-9]+)$/.exec(re[0]), z === null && F(B, "ill-formed argument of the YAML directive"), te = parseInt(z[1], 10), Z = parseInt(z[2], 10), te !== 1 && F(B, "unacceptable YAML version of the document"), B.version = re[0], B.checkLineBreaks = Z < 2, Z !== 1 && Z !== 2 && q(B, "unsupported YAML version of the document");
    },
    TAG: function(B, G, re) {
      var z, te;
      re.length !== 2 && F(B, "TAG directive accepts exactly two arguments"), z = re[0], te = re[1], E.test(z) || F(B, "ill-formed tag handle (first argument) of the TAG directive"), u.call(B.tagMap, z) && F(B, 'there is a previously declared suffix for "' + z + '" tag handle'), m.test(te) || F(B, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        te = decodeURIComponent(te);
      } catch {
        F(B, "tag prefix is malformed: " + te);
      }
      B.tagMap[z] = te;
    }
  };
  function W(a, B, G, re) {
    var z, te, Z, oe;
    if (B < G) {
      if (oe = a.input.slice(B, G), re)
        for (z = 0, te = oe.length; z < te; z += 1)
          Z = oe.charCodeAt(z), Z === 9 || 32 <= Z && Z <= 1114111 || F(a, "expected valid JSON character");
      else s.test(oe) && F(a, "the stream contains non-printable characters");
      a.result += oe;
    }
  }
  function ne(a, B, G, re) {
    var z, te, Z, oe;
    for (o.isObject(G) || F(a, "cannot merge mappings; the provided source object is unacceptable"), z = Object.keys(G), Z = 0, oe = z.length; Z < oe; Z += 1)
      te = z[Z], u.call(B, te) || (B[te] = G[te], re[te] = !0);
  }
  function ce(a, B, G, re, z, te, Z, oe, ge) {
    var ve, Te;
    if (Array.isArray(z))
      for (z = Array.prototype.slice.call(z), ve = 0, Te = z.length; ve < Te; ve += 1)
        Array.isArray(z[ve]) && F(a, "nested arrays are not supported inside keys"), typeof z == "object" && w(z[ve]) === "[object Object]" && (z[ve] = "[object Object]");
    if (typeof z == "object" && w(z) === "[object Object]" && (z = "[object Object]"), z = String(z), B === null && (B = {}), re === "tag:yaml.org,2002:merge")
      if (Array.isArray(te))
        for (ve = 0, Te = te.length; ve < Te; ve += 1)
          ne(a, B, te[ve], G);
      else
        ne(a, B, te, G);
    else
      !a.json && !u.call(G, z) && u.call(B, z) && (a.line = Z || a.line, a.lineStart = oe || a.lineStart, a.position = ge || a.position, F(a, "duplicated mapping key")), z === "__proto__" ? Object.defineProperty(B, z, {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: te
      }) : B[z] = te, delete G[z];
    return B;
  }
  function ue(a) {
    var B;
    B = a.input.charCodeAt(a.position), B === 10 ? a.position++ : B === 13 ? (a.position++, a.input.charCodeAt(a.position) === 10 && a.position++) : F(a, "a line break is expected"), a.line += 1, a.lineStart = a.position, a.firstTabInLine = -1;
  }
  function ie(a, B, G) {
    for (var re = 0, z = a.input.charCodeAt(a.position); z !== 0; ) {
      for (; O(z); )
        z === 9 && a.firstTabInLine === -1 && (a.firstTabInLine = a.position), z = a.input.charCodeAt(++a.position);
      if (B && z === 35)
        do
          z = a.input.charCodeAt(++a.position);
        while (z !== 10 && z !== 13 && z !== 0);
      if (T(z))
        for (ue(a), z = a.input.charCodeAt(a.position), re++, a.lineIndent = 0; z === 32; )
          a.lineIndent++, z = a.input.charCodeAt(++a.position);
      else
        break;
    }
    return G !== -1 && re !== 0 && a.lineIndent < G && q(a, "deficient indentation"), re;
  }
  function Re(a) {
    var B = a.position, G;
    return G = a.input.charCodeAt(B), !!((G === 45 || G === 46) && G === a.input.charCodeAt(B + 1) && G === a.input.charCodeAt(B + 2) && (B += 3, G = a.input.charCodeAt(B), G === 0 || P(G)));
  }
  function J(a, B) {
    B === 1 ? a.result += " " : B > 1 && (a.result += o.repeat(`
`, B - 1));
  }
  function ye(a, B, G) {
    var re, z, te, Z, oe, ge, ve, Te, de = a.kind, $e = a.result, _;
    if (_ = a.input.charCodeAt(a.position), P(_) || U(_) || _ === 35 || _ === 38 || _ === 42 || _ === 33 || _ === 124 || _ === 62 || _ === 39 || _ === 34 || _ === 37 || _ === 64 || _ === 96 || (_ === 63 || _ === 45) && (z = a.input.charCodeAt(a.position + 1), P(z) || G && U(z)))
      return !1;
    for (a.kind = "scalar", a.result = "", te = Z = a.position, oe = !1; _ !== 0; ) {
      if (_ === 58) {
        if (z = a.input.charCodeAt(a.position + 1), P(z) || G && U(z))
          break;
      } else if (_ === 35) {
        if (re = a.input.charCodeAt(a.position - 1), P(re))
          break;
      } else {
        if (a.position === a.lineStart && Re(a) || G && U(_))
          break;
        if (T(_))
          if (ge = a.line, ve = a.lineStart, Te = a.lineIndent, ie(a, !1, -1), a.lineIndent >= B) {
            oe = !0, _ = a.input.charCodeAt(a.position);
            continue;
          } else {
            a.position = Z, a.line = ge, a.lineStart = ve, a.lineIndent = Te;
            break;
          }
      }
      oe && (W(a, te, Z, !1), J(a, a.line - ge), te = Z = a.position, oe = !1), O(_) || (Z = a.position + 1), _ = a.input.charCodeAt(++a.position);
    }
    return W(a, te, Z, !1), a.result ? !0 : (a.kind = de, a.result = $e, !1);
  }
  function A(a, B) {
    var G, re, z;
    if (G = a.input.charCodeAt(a.position), G !== 39)
      return !1;
    for (a.kind = "scalar", a.result = "", a.position++, re = z = a.position; (G = a.input.charCodeAt(a.position)) !== 0; )
      if (G === 39)
        if (W(a, re, a.position, !0), G = a.input.charCodeAt(++a.position), G === 39)
          re = a.position, a.position++, z = a.position;
        else
          return !0;
      else T(G) ? (W(a, re, z, !0), J(a, ie(a, !1, B)), re = z = a.position) : a.position === a.lineStart && Re(a) ? F(a, "unexpected end of the document within a single quoted scalar") : (a.position++, z = a.position);
    F(a, "unexpected end of the stream within a single quoted scalar");
  }
  function v(a, B) {
    var G, re, z, te, Z, oe;
    if (oe = a.input.charCodeAt(a.position), oe !== 34)
      return !1;
    for (a.kind = "scalar", a.result = "", a.position++, G = re = a.position; (oe = a.input.charCodeAt(a.position)) !== 0; ) {
      if (oe === 34)
        return W(a, G, a.position, !0), a.position++, !0;
      if (oe === 92) {
        if (W(a, G, a.position, !0), oe = a.input.charCodeAt(++a.position), T(oe))
          ie(a, !1, B);
        else if (oe < 256 && $[oe])
          a.result += L[oe], a.position++;
        else if ((Z = S(oe)) > 0) {
          for (z = Z, te = 0; z > 0; z--)
            oe = a.input.charCodeAt(++a.position), (Z = R(oe)) >= 0 ? te = (te << 4) + Z : F(a, "expected hexadecimal character");
          a.result += M(te), a.position++;
        } else
          F(a, "unknown escape sequence");
        G = re = a.position;
      } else T(oe) ? (W(a, G, re, !0), J(a, ie(a, !1, B)), G = re = a.position) : a.position === a.lineStart && Re(a) ? F(a, "unexpected end of the document within a double quoted scalar") : (a.position++, re = a.position);
    }
    F(a, "unexpected end of the stream within a double quoted scalar");
  }
  function j(a, B) {
    var G = !0, re, z, te, Z = a.tag, oe, ge = a.anchor, ve, Te, de, $e, _, H = /* @__PURE__ */ Object.create(null), X, V, Q, ee;
    if (ee = a.input.charCodeAt(a.position), ee === 91)
      Te = 93, _ = !1, oe = [];
    else if (ee === 123)
      Te = 125, _ = !0, oe = {};
    else
      return !1;
    for (a.anchor !== null && (a.anchorMap[a.anchor] = oe), ee = a.input.charCodeAt(++a.position); ee !== 0; ) {
      if (ie(a, !0, B), ee = a.input.charCodeAt(a.position), ee === Te)
        return a.position++, a.tag = Z, a.anchor = ge, a.kind = _ ? "mapping" : "sequence", a.result = oe, !0;
      G ? ee === 44 && F(a, "expected the node content, but found ','") : F(a, "missed comma between flow collection entries"), V = X = Q = null, de = $e = !1, ee === 63 && (ve = a.input.charCodeAt(a.position + 1), P(ve) && (de = $e = !0, a.position++, ie(a, !0, B))), re = a.line, z = a.lineStart, te = a.position, Le(a, B, n, !1, !0), V = a.tag, X = a.result, ie(a, !0, B), ee = a.input.charCodeAt(a.position), ($e || a.line === re) && ee === 58 && (de = !0, ee = a.input.charCodeAt(++a.position), ie(a, !0, B), Le(a, B, n, !1, !0), Q = a.result), _ ? ce(a, oe, H, V, X, Q, re, z, te) : de ? oe.push(ce(a, null, H, V, X, Q, re, z, te)) : oe.push(X), ie(a, !0, B), ee = a.input.charCodeAt(a.position), ee === 44 ? (G = !0, ee = a.input.charCodeAt(++a.position)) : G = !1;
    }
    F(a, "unexpected end of the stream within a flow collection");
  }
  function N(a, B) {
    var G, re, z = r, te = !1, Z = !1, oe = B, ge = 0, ve = !1, Te, de;
    if (de = a.input.charCodeAt(a.position), de === 124)
      re = !1;
    else if (de === 62)
      re = !0;
    else
      return !1;
    for (a.kind = "scalar", a.result = ""; de !== 0; )
      if (de = a.input.charCodeAt(++a.position), de === 43 || de === 45)
        r === z ? z = de === 43 ? l : c : F(a, "repeat of a chomping mode identifier");
      else if ((Te = b(de)) >= 0)
        Te === 0 ? F(a, "bad explicit indentation width of a block scalar; it cannot be less than one") : Z ? F(a, "repeat of an indentation width identifier") : (oe = B + Te - 1, Z = !0);
      else
        break;
    if (O(de)) {
      do
        de = a.input.charCodeAt(++a.position);
      while (O(de));
      if (de === 35)
        do
          de = a.input.charCodeAt(++a.position);
        while (!T(de) && de !== 0);
    }
    for (; de !== 0; ) {
      for (ue(a), a.lineIndent = 0, de = a.input.charCodeAt(a.position); (!Z || a.lineIndent < oe) && de === 32; )
        a.lineIndent++, de = a.input.charCodeAt(++a.position);
      if (!Z && a.lineIndent > oe && (oe = a.lineIndent), T(de)) {
        ge++;
        continue;
      }
      if (a.lineIndent < oe) {
        z === l ? a.result += o.repeat(`
`, te ? 1 + ge : ge) : z === r && te && (a.result += `
`);
        break;
      }
      for (re ? O(de) ? (ve = !0, a.result += o.repeat(`
`, te ? 1 + ge : ge)) : ve ? (ve = !1, a.result += o.repeat(`
`, ge + 1)) : ge === 0 ? te && (a.result += " ") : a.result += o.repeat(`
`, ge) : a.result += o.repeat(`
`, te ? 1 + ge : ge), te = !0, Z = !0, ge = 0, G = a.position; !T(de) && de !== 0; )
        de = a.input.charCodeAt(++a.position);
      W(a, G, a.position, !1);
    }
    return !0;
  }
  function le(a, B) {
    var G, re = a.tag, z = a.anchor, te = [], Z, oe = !1, ge;
    if (a.firstTabInLine !== -1) return !1;
    for (a.anchor !== null && (a.anchorMap[a.anchor] = te), ge = a.input.charCodeAt(a.position); ge !== 0 && (a.firstTabInLine !== -1 && (a.position = a.firstTabInLine, F(a, "tab characters must not be used in indentation")), !(ge !== 45 || (Z = a.input.charCodeAt(a.position + 1), !P(Z)))); ) {
      if (oe = !0, a.position++, ie(a, !0, -1) && a.lineIndent <= B) {
        te.push(null), ge = a.input.charCodeAt(a.position);
        continue;
      }
      if (G = a.line, Le(a, B, i, !1, !0), te.push(a.result), ie(a, !0, -1), ge = a.input.charCodeAt(a.position), (a.line === G || a.lineIndent > B) && ge !== 0)
        F(a, "bad indentation of a sequence entry");
      else if (a.lineIndent < B)
        break;
    }
    return oe ? (a.tag = re, a.anchor = z, a.kind = "sequence", a.result = te, !0) : !1;
  }
  function me(a, B, G) {
    var re, z, te, Z, oe, ge, ve = a.tag, Te = a.anchor, de = {}, $e = /* @__PURE__ */ Object.create(null), _ = null, H = null, X = null, V = !1, Q = !1, ee;
    if (a.firstTabInLine !== -1) return !1;
    for (a.anchor !== null && (a.anchorMap[a.anchor] = de), ee = a.input.charCodeAt(a.position); ee !== 0; ) {
      if (!V && a.firstTabInLine !== -1 && (a.position = a.firstTabInLine, F(a, "tab characters must not be used in indentation")), re = a.input.charCodeAt(a.position + 1), te = a.line, (ee === 63 || ee === 58) && P(re))
        ee === 63 ? (V && (ce(a, de, $e, _, H, null, Z, oe, ge), _ = H = X = null), Q = !0, V = !0, z = !0) : V ? (V = !1, z = !0) : F(a, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), a.position += 1, ee = re;
      else {
        if (Z = a.line, oe = a.lineStart, ge = a.position, !Le(a, G, e, !1, !0))
          break;
        if (a.line === te) {
          for (ee = a.input.charCodeAt(a.position); O(ee); )
            ee = a.input.charCodeAt(++a.position);
          if (ee === 58)
            ee = a.input.charCodeAt(++a.position), P(ee) || F(a, "a whitespace character is expected after the key-value separator within a block mapping"), V && (ce(a, de, $e, _, H, null, Z, oe, ge), _ = H = X = null), Q = !0, V = !1, z = !1, _ = a.tag, H = a.result;
          else if (Q)
            F(a, "can not read an implicit mapping pair; a colon is missed");
          else
            return a.tag = ve, a.anchor = Te, !0;
        } else if (Q)
          F(a, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return a.tag = ve, a.anchor = Te, !0;
      }
      if ((a.line === te || a.lineIndent > B) && (V && (Z = a.line, oe = a.lineStart, ge = a.position), Le(a, B, t, !0, z) && (V ? H = a.result : X = a.result), V || (ce(a, de, $e, _, H, X, Z, oe, ge), _ = H = X = null), ie(a, !0, -1), ee = a.input.charCodeAt(a.position)), (a.line === te || a.lineIndent > B) && ee !== 0)
        F(a, "bad indentation of a mapping entry");
      else if (a.lineIndent < B)
        break;
    }
    return V && ce(a, de, $e, _, H, null, Z, oe, ge), Q && (a.tag = ve, a.anchor = Te, a.kind = "mapping", a.result = de), Q;
  }
  function pe(a) {
    var B, G = !1, re = !1, z, te, Z;
    if (Z = a.input.charCodeAt(a.position), Z !== 33) return !1;
    if (a.tag !== null && F(a, "duplication of a tag property"), Z = a.input.charCodeAt(++a.position), Z === 60 ? (G = !0, Z = a.input.charCodeAt(++a.position)) : Z === 33 ? (re = !0, z = "!!", Z = a.input.charCodeAt(++a.position)) : z = "!", B = a.position, G) {
      do
        Z = a.input.charCodeAt(++a.position);
      while (Z !== 0 && Z !== 62);
      a.position < a.length ? (te = a.input.slice(B, a.position), Z = a.input.charCodeAt(++a.position)) : F(a, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Z !== 0 && !P(Z); )
        Z === 33 && (re ? F(a, "tag suffix cannot contain exclamation marks") : (z = a.input.slice(B - 1, a.position + 1), E.test(z) || F(a, "named tag handle cannot contain such characters"), re = !0, B = a.position + 1)), Z = a.input.charCodeAt(++a.position);
      te = a.input.slice(B, a.position), g.test(te) && F(a, "tag suffix cannot contain flow indicator characters");
    }
    te && !m.test(te) && F(a, "tag name cannot contain such characters: " + te);
    try {
      te = decodeURIComponent(te);
    } catch {
      F(a, "tag name is malformed: " + te);
    }
    return G ? a.tag = te : u.call(a.tagMap, z) ? a.tag = a.tagMap[z] + te : z === "!" ? a.tag = "!" + te : z === "!!" ? a.tag = "tag:yaml.org,2002:" + te : F(a, 'undeclared tag handle "' + z + '"'), !0;
  }
  function _e(a) {
    var B, G;
    if (G = a.input.charCodeAt(a.position), G !== 38) return !1;
    for (a.anchor !== null && F(a, "duplication of an anchor property"), G = a.input.charCodeAt(++a.position), B = a.position; G !== 0 && !P(G) && !U(G); )
      G = a.input.charCodeAt(++a.position);
    return a.position === B && F(a, "name of an anchor node must contain at least one character"), a.anchor = a.input.slice(B, a.position), !0;
  }
  function Ee(a) {
    var B, G, re;
    if (re = a.input.charCodeAt(a.position), re !== 42) return !1;
    for (re = a.input.charCodeAt(++a.position), B = a.position; re !== 0 && !P(re) && !U(re); )
      re = a.input.charCodeAt(++a.position);
    return a.position === B && F(a, "name of an alias node must contain at least one character"), G = a.input.slice(B, a.position), u.call(a.anchorMap, G) || F(a, 'unidentified alias "' + G + '"'), a.result = a.anchorMap[G], ie(a, !0, -1), !0;
  }
  function Le(a, B, G, re, z) {
    var te, Z, oe, ge = 1, ve = !1, Te = !1, de, $e, _, H, X, V;
    if (a.listener !== null && a.listener("open", a), a.tag = null, a.anchor = null, a.kind = null, a.result = null, te = Z = oe = t === G || i === G, re && ie(a, !0, -1) && (ve = !0, a.lineIndent > B ? ge = 1 : a.lineIndent === B ? ge = 0 : a.lineIndent < B && (ge = -1)), ge === 1)
      for (; pe(a) || _e(a); )
        ie(a, !0, -1) ? (ve = !0, oe = te, a.lineIndent > B ? ge = 1 : a.lineIndent === B ? ge = 0 : a.lineIndent < B && (ge = -1)) : oe = !1;
    if (oe && (oe = ve || z), (ge === 1 || t === G) && (n === G || e === G ? X = B : X = B + 1, V = a.position - a.lineStart, ge === 1 ? oe && (le(a, V) || me(a, V, X)) || j(a, X) ? Te = !0 : (Z && N(a, X) || A(a, X) || v(a, X) ? Te = !0 : Ee(a) ? (Te = !0, (a.tag !== null || a.anchor !== null) && F(a, "alias node should not have any properties")) : ye(a, X, n === G) && (Te = !0, a.tag === null && (a.tag = "?")), a.anchor !== null && (a.anchorMap[a.anchor] = a.result)) : ge === 0 && (Te = oe && le(a, V))), a.tag === null)
      a.anchor !== null && (a.anchorMap[a.anchor] = a.result);
    else if (a.tag === "?") {
      for (a.result !== null && a.kind !== "scalar" && F(a, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + a.kind + '"'), de = 0, $e = a.implicitTypes.length; de < $e; de += 1)
        if (H = a.implicitTypes[de], H.resolve(a.result)) {
          a.result = H.construct(a.result), a.tag = H.tag, a.anchor !== null && (a.anchorMap[a.anchor] = a.result);
          break;
        }
    } else if (a.tag !== "!") {
      if (u.call(a.typeMap[a.kind || "fallback"], a.tag))
        H = a.typeMap[a.kind || "fallback"][a.tag];
      else
        for (H = null, _ = a.typeMap.multi[a.kind || "fallback"], de = 0, $e = _.length; de < $e; de += 1)
          if (a.tag.slice(0, _[de].tag.length) === _[de].tag) {
            H = _[de];
            break;
          }
      H || F(a, "unknown tag !<" + a.tag + ">"), a.result !== null && H.kind !== a.kind && F(a, "unacceptable node kind for !<" + a.tag + '> tag; it should be "' + H.kind + '", not "' + a.kind + '"'), H.resolve(a.result, a.tag) ? (a.result = H.construct(a.result, a.tag), a.anchor !== null && (a.anchorMap[a.anchor] = a.result)) : F(a, "cannot resolve a node with !<" + a.tag + "> explicit tag");
    }
    return a.listener !== null && a.listener("close", a), a.tag !== null || a.anchor !== null || Te;
  }
  function Oe(a) {
    var B = a.position, G, re, z, te = !1, Z;
    for (a.version = null, a.checkLineBreaks = a.legacy, a.tagMap = /* @__PURE__ */ Object.create(null), a.anchorMap = /* @__PURE__ */ Object.create(null); (Z = a.input.charCodeAt(a.position)) !== 0 && (ie(a, !0, -1), Z = a.input.charCodeAt(a.position), !(a.lineIndent > 0 || Z !== 37)); ) {
      for (te = !0, Z = a.input.charCodeAt(++a.position), G = a.position; Z !== 0 && !P(Z); )
        Z = a.input.charCodeAt(++a.position);
      for (re = a.input.slice(G, a.position), z = [], re.length < 1 && F(a, "directive name must not be less than one character in length"); Z !== 0; ) {
        for (; O(Z); )
          Z = a.input.charCodeAt(++a.position);
        if (Z === 35) {
          do
            Z = a.input.charCodeAt(++a.position);
          while (Z !== 0 && !T(Z));
          break;
        }
        if (T(Z)) break;
        for (G = a.position; Z !== 0 && !P(Z); )
          Z = a.input.charCodeAt(++a.position);
        z.push(a.input.slice(G, a.position));
      }
      Z !== 0 && ue(a), u.call(K, re) ? K[re](a, re, z) : q(a, 'unknown document directive "' + re + '"');
    }
    if (ie(a, !0, -1), a.lineIndent === 0 && a.input.charCodeAt(a.position) === 45 && a.input.charCodeAt(a.position + 1) === 45 && a.input.charCodeAt(a.position + 2) === 45 ? (a.position += 3, ie(a, !0, -1)) : te && F(a, "directives end mark is expected"), Le(a, a.lineIndent - 1, t, !1, !0), ie(a, !0, -1), a.checkLineBreaks && p.test(a.input.slice(B, a.position)) && q(a, "non-ASCII line breaks are interpreted as content"), a.documents.push(a.result), a.position === a.lineStart && Re(a)) {
      a.input.charCodeAt(a.position) === 46 && (a.position += 3, ie(a, !0, -1));
      return;
    }
    if (a.position < a.length - 1)
      F(a, "end of the stream or a document separator is expected");
    else
      return;
  }
  function Me(a, B) {
    a = String(a), B = B || {}, a.length !== 0 && (a.charCodeAt(a.length - 1) !== 10 && a.charCodeAt(a.length - 1) !== 13 && (a += `
`), a.charCodeAt(0) === 65279 && (a = a.slice(1)));
    var G = new I(a, B), re = a.indexOf("\0");
    for (re !== -1 && (G.position = re, F(G, "null byte is not allowed in input")), G.input += "\0"; G.input.charCodeAt(G.position) === 32; )
      G.lineIndent += 1, G.position += 1;
    for (; G.position < G.length - 1; )
      Oe(G);
    return G.documents;
  }
  function Et(a, B, G) {
    B !== null && typeof B == "object" && typeof G > "u" && (G = B, B = null);
    var re = Me(a, G);
    if (typeof B != "function")
      return re;
    for (var z = 0, te = re.length; z < te; z += 1)
      B(re[z]);
  }
  function st(a, B) {
    var G = Me(a, B);
    if (G.length !== 0) {
      if (G.length === 1)
        return G[0];
      throw new h("expected a single document in the stream, but found more");
    }
  }
  return Ur.loadAll = Et, Ur.load = st, Ur;
}
var ai = {}, Ra;
function id() {
  if (Ra) return ai;
  Ra = 1;
  var o = vr(), h = yr(), d = xo(), f = Object.prototype.toString, u = Object.prototype.hasOwnProperty, n = 65279, e = 9, i = 10, t = 13, r = 32, c = 33, l = 34, s = 35, p = 37, g = 38, E = 39, m = 42, w = 44, T = 45, O = 58, P = 61, U = 62, R = 63, S = 64, b = 91, y = 93, M = 96, $ = 123, L = 124, k = 125, I = {};
  I[0] = "\\0", I[7] = "\\a", I[8] = "\\b", I[9] = "\\t", I[10] = "\\n", I[11] = "\\v", I[12] = "\\f", I[13] = "\\r", I[27] = "\\e", I[34] = '\\"', I[92] = "\\\\", I[133] = "\\N", I[160] = "\\_", I[8232] = "\\L", I[8233] = "\\P";
  var D = [
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
  function q(_, H) {
    var X, V, Q, ee, fe, se, he;
    if (H === null) return {};
    for (X = {}, V = Object.keys(H), Q = 0, ee = V.length; Q < ee; Q += 1)
      fe = V[Q], se = String(H[fe]), fe.slice(0, 2) === "!!" && (fe = "tag:yaml.org,2002:" + fe.slice(2)), he = _.compiledTypeMap.fallback[fe], he && u.call(he.styleAliases, se) && (se = he.styleAliases[se]), X[fe] = se;
    return X;
  }
  function K(_) {
    var H, X, V;
    if (H = _.toString(16).toUpperCase(), _ <= 255)
      X = "x", V = 2;
    else if (_ <= 65535)
      X = "u", V = 4;
    else if (_ <= 4294967295)
      X = "U", V = 8;
    else
      throw new h("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + X + o.repeat("0", V - H.length) + H;
  }
  var W = 1, ne = 2;
  function ce(_) {
    this.schema = _.schema || d, this.indent = Math.max(1, _.indent || 2), this.noArrayIndent = _.noArrayIndent || !1, this.skipInvalid = _.skipInvalid || !1, this.flowLevel = o.isNothing(_.flowLevel) ? -1 : _.flowLevel, this.styleMap = q(this.schema, _.styles || null), this.sortKeys = _.sortKeys || !1, this.lineWidth = _.lineWidth || 80, this.noRefs = _.noRefs || !1, this.noCompatMode = _.noCompatMode || !1, this.condenseFlow = _.condenseFlow || !1, this.quotingType = _.quotingType === '"' ? ne : W, this.forceQuotes = _.forceQuotes || !1, this.replacer = typeof _.replacer == "function" ? _.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ue(_, H) {
    for (var X = o.repeat(" ", H), V = 0, Q = -1, ee = "", fe, se = _.length; V < se; )
      Q = _.indexOf(`
`, V), Q === -1 ? (fe = _.slice(V), V = se) : (fe = _.slice(V, Q + 1), V = Q + 1), fe.length && fe !== `
` && (ee += X), ee += fe;
    return ee;
  }
  function ie(_, H) {
    return `
` + o.repeat(" ", _.indent * H);
  }
  function Re(_, H) {
    var X, V, Q;
    for (X = 0, V = _.implicitTypes.length; X < V; X += 1)
      if (Q = _.implicitTypes[X], Q.resolve(H))
        return !0;
    return !1;
  }
  function J(_) {
    return _ === r || _ === e;
  }
  function ye(_) {
    return 32 <= _ && _ <= 126 || 161 <= _ && _ <= 55295 && _ !== 8232 && _ !== 8233 || 57344 <= _ && _ <= 65533 && _ !== n || 65536 <= _ && _ <= 1114111;
  }
  function A(_) {
    return ye(_) && _ !== n && _ !== t && _ !== i;
  }
  function v(_, H, X) {
    var V = A(_), Q = V && !J(_);
    return (
      // ns-plain-safe
      (X ? (
        // c = flow-in
        V
      ) : V && _ !== w && _ !== b && _ !== y && _ !== $ && _ !== k) && _ !== s && !(H === O && !Q) || A(H) && !J(H) && _ === s || H === O && Q
    );
  }
  function j(_) {
    return ye(_) && _ !== n && !J(_) && _ !== T && _ !== R && _ !== O && _ !== w && _ !== b && _ !== y && _ !== $ && _ !== k && _ !== s && _ !== g && _ !== m && _ !== c && _ !== L && _ !== P && _ !== U && _ !== E && _ !== l && _ !== p && _ !== S && _ !== M;
  }
  function N(_) {
    return !J(_) && _ !== O;
  }
  function le(_, H) {
    var X = _.charCodeAt(H), V;
    return X >= 55296 && X <= 56319 && H + 1 < _.length && (V = _.charCodeAt(H + 1), V >= 56320 && V <= 57343) ? (X - 55296) * 1024 + V - 56320 + 65536 : X;
  }
  function me(_) {
    var H = /^\n* /;
    return H.test(_);
  }
  var pe = 1, _e = 2, Ee = 3, Le = 4, Oe = 5;
  function Me(_, H, X, V, Q, ee, fe, se) {
    var he, we = 0, Pe = null, Ne = !1, Ce = !1, It = V !== -1, Qe = -1, wt = j(le(_, 0)) && N(le(_, _.length - 1));
    if (H || fe)
      for (he = 0; he < _.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(_, he), !ye(we))
          return Oe;
        wt = wt && v(we, Pe, se), Pe = we;
      }
    else {
      for (he = 0; he < _.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(_, he), we === i)
          Ne = !0, It && (Ce = Ce || // Foldable line = too long, and not more-indented.
          he - Qe - 1 > V && _[Qe + 1] !== " ", Qe = he);
        else if (!ye(we))
          return Oe;
        wt = wt && v(we, Pe, se), Pe = we;
      }
      Ce = Ce || It && he - Qe - 1 > V && _[Qe + 1] !== " ";
    }
    return !Ne && !Ce ? wt && !fe && !Q(_) ? pe : ee === ne ? Oe : _e : X > 9 && me(_) ? Oe : fe ? ee === ne ? Oe : _e : Ce ? Le : Ee;
  }
  function Et(_, H, X, V, Q) {
    _.dump = function() {
      if (H.length === 0)
        return _.quotingType === ne ? '""' : "''";
      if (!_.noCompatMode && (D.indexOf(H) !== -1 || F.test(H)))
        return _.quotingType === ne ? '"' + H + '"' : "'" + H + "'";
      var ee = _.indent * Math.max(1, X), fe = _.lineWidth === -1 ? -1 : Math.max(Math.min(_.lineWidth, 40), _.lineWidth - ee), se = V || _.flowLevel > -1 && X >= _.flowLevel;
      function he(we) {
        return Re(_, we);
      }
      switch (Me(
        H,
        se,
        _.indent,
        fe,
        he,
        _.quotingType,
        _.forceQuotes && !V,
        Q
      )) {
        case pe:
          return H;
        case _e:
          return "'" + H.replace(/'/g, "''") + "'";
        case Ee:
          return "|" + st(H, _.indent) + a(ue(H, ee));
        case Le:
          return ">" + st(H, _.indent) + a(ue(B(H, fe), ee));
        case Oe:
          return '"' + re(H) + '"';
        default:
          throw new h("impossible error: invalid scalar style");
      }
    }();
  }
  function st(_, H) {
    var X = me(_) ? String(H) : "", V = _[_.length - 1] === `
`, Q = V && (_[_.length - 2] === `
` || _ === `
`), ee = Q ? "+" : V ? "" : "-";
    return X + ee + `
`;
  }
  function a(_) {
    return _[_.length - 1] === `
` ? _.slice(0, -1) : _;
  }
  function B(_, H) {
    for (var X = /(\n+)([^\n]*)/g, V = function() {
      var we = _.indexOf(`
`);
      return we = we !== -1 ? we : _.length, X.lastIndex = we, G(_.slice(0, we), H);
    }(), Q = _[0] === `
` || _[0] === " ", ee, fe; fe = X.exec(_); ) {
      var se = fe[1], he = fe[2];
      ee = he[0] === " ", V += se + (!Q && !ee && he !== "" ? `
` : "") + G(he, H), Q = ee;
    }
    return V;
  }
  function G(_, H) {
    if (_ === "" || _[0] === " ") return _;
    for (var X = / [^ ]/g, V, Q = 0, ee, fe = 0, se = 0, he = ""; V = X.exec(_); )
      se = V.index, se - Q > H && (ee = fe > Q ? fe : se, he += `
` + _.slice(Q, ee), Q = ee + 1), fe = se;
    return he += `
`, _.length - Q > H && fe > Q ? he += _.slice(Q, fe) + `
` + _.slice(fe + 1) : he += _.slice(Q), he.slice(1);
  }
  function re(_) {
    for (var H = "", X = 0, V, Q = 0; Q < _.length; X >= 65536 ? Q += 2 : Q++)
      X = le(_, Q), V = I[X], !V && ye(X) ? (H += _[Q], X >= 65536 && (H += _[Q + 1])) : H += V || K(X);
    return H;
  }
  function z(_, H, X) {
    var V = "", Q = _.tag, ee, fe, se;
    for (ee = 0, fe = X.length; ee < fe; ee += 1)
      se = X[ee], _.replacer && (se = _.replacer.call(X, String(ee), se)), (ve(_, H, se, !1, !1) || typeof se > "u" && ve(_, H, null, !1, !1)) && (V !== "" && (V += "," + (_.condenseFlow ? "" : " ")), V += _.dump);
    _.tag = Q, _.dump = "[" + V + "]";
  }
  function te(_, H, X, V) {
    var Q = "", ee = _.tag, fe, se, he;
    for (fe = 0, se = X.length; fe < se; fe += 1)
      he = X[fe], _.replacer && (he = _.replacer.call(X, String(fe), he)), (ve(_, H + 1, he, !0, !0, !1, !0) || typeof he > "u" && ve(_, H + 1, null, !0, !0, !1, !0)) && ((!V || Q !== "") && (Q += ie(_, H)), _.dump && i === _.dump.charCodeAt(0) ? Q += "-" : Q += "- ", Q += _.dump);
    _.tag = ee, _.dump = Q || "[]";
  }
  function Z(_, H, X) {
    var V = "", Q = _.tag, ee = Object.keys(X), fe, se, he, we, Pe;
    for (fe = 0, se = ee.length; fe < se; fe += 1)
      Pe = "", V !== "" && (Pe += ", "), _.condenseFlow && (Pe += '"'), he = ee[fe], we = X[he], _.replacer && (we = _.replacer.call(X, he, we)), ve(_, H, he, !1, !1) && (_.dump.length > 1024 && (Pe += "? "), Pe += _.dump + (_.condenseFlow ? '"' : "") + ":" + (_.condenseFlow ? "" : " "), ve(_, H, we, !1, !1) && (Pe += _.dump, V += Pe));
    _.tag = Q, _.dump = "{" + V + "}";
  }
  function oe(_, H, X, V) {
    var Q = "", ee = _.tag, fe = Object.keys(X), se, he, we, Pe, Ne, Ce;
    if (_.sortKeys === !0)
      fe.sort();
    else if (typeof _.sortKeys == "function")
      fe.sort(_.sortKeys);
    else if (_.sortKeys)
      throw new h("sortKeys must be a boolean or a function");
    for (se = 0, he = fe.length; se < he; se += 1)
      Ce = "", (!V || Q !== "") && (Ce += ie(_, H)), we = fe[se], Pe = X[we], _.replacer && (Pe = _.replacer.call(X, we, Pe)), ve(_, H + 1, we, !0, !0, !0) && (Ne = _.tag !== null && _.tag !== "?" || _.dump && _.dump.length > 1024, Ne && (_.dump && i === _.dump.charCodeAt(0) ? Ce += "?" : Ce += "? "), Ce += _.dump, Ne && (Ce += ie(_, H)), ve(_, H + 1, Pe, !0, Ne) && (_.dump && i === _.dump.charCodeAt(0) ? Ce += ":" : Ce += ": ", Ce += _.dump, Q += Ce));
    _.tag = ee, _.dump = Q || "{}";
  }
  function ge(_, H, X) {
    var V, Q, ee, fe, se, he;
    for (Q = X ? _.explicitTypes : _.implicitTypes, ee = 0, fe = Q.length; ee < fe; ee += 1)
      if (se = Q[ee], (se.instanceOf || se.predicate) && (!se.instanceOf || typeof H == "object" && H instanceof se.instanceOf) && (!se.predicate || se.predicate(H))) {
        if (X ? se.multi && se.representName ? _.tag = se.representName(H) : _.tag = se.tag : _.tag = "?", se.represent) {
          if (he = _.styleMap[se.tag] || se.defaultStyle, f.call(se.represent) === "[object Function]")
            V = se.represent(H, he);
          else if (u.call(se.represent, he))
            V = se.represent[he](H, he);
          else
            throw new h("!<" + se.tag + '> tag resolver accepts not "' + he + '" style');
          _.dump = V;
        }
        return !0;
      }
    return !1;
  }
  function ve(_, H, X, V, Q, ee, fe) {
    _.tag = null, _.dump = X, ge(_, X, !1) || ge(_, X, !0);
    var se = f.call(_.dump), he = V, we;
    V && (V = _.flowLevel < 0 || _.flowLevel > H);
    var Pe = se === "[object Object]" || se === "[object Array]", Ne, Ce;
    if (Pe && (Ne = _.duplicates.indexOf(X), Ce = Ne !== -1), (_.tag !== null && _.tag !== "?" || Ce || _.indent !== 2 && H > 0) && (Q = !1), Ce && _.usedDuplicates[Ne])
      _.dump = "*ref_" + Ne;
    else {
      if (Pe && Ce && !_.usedDuplicates[Ne] && (_.usedDuplicates[Ne] = !0), se === "[object Object]")
        V && Object.keys(_.dump).length !== 0 ? (oe(_, H, _.dump, Q), Ce && (_.dump = "&ref_" + Ne + _.dump)) : (Z(_, H, _.dump), Ce && (_.dump = "&ref_" + Ne + " " + _.dump));
      else if (se === "[object Array]")
        V && _.dump.length !== 0 ? (_.noArrayIndent && !fe && H > 0 ? te(_, H - 1, _.dump, Q) : te(_, H, _.dump, Q), Ce && (_.dump = "&ref_" + Ne + _.dump)) : (z(_, H, _.dump), Ce && (_.dump = "&ref_" + Ne + " " + _.dump));
      else if (se === "[object String]")
        _.tag !== "?" && Et(_, _.dump, H, ee, he);
      else {
        if (se === "[object Undefined]")
          return !1;
        if (_.skipInvalid) return !1;
        throw new h("unacceptable kind of an object to dump " + se);
      }
      _.tag !== null && _.tag !== "?" && (we = encodeURI(
        _.tag[0] === "!" ? _.tag.slice(1) : _.tag
      ).replace(/!/g, "%21"), _.tag[0] === "!" ? we = "!" + we : we.slice(0, 18) === "tag:yaml.org,2002:" ? we = "!!" + we.slice(18) : we = "!<" + we + ">", _.dump = we + " " + _.dump);
    }
    return !0;
  }
  function Te(_, H) {
    var X = [], V = [], Q, ee;
    for (de(_, X, V), Q = 0, ee = V.length; Q < ee; Q += 1)
      H.duplicates.push(X[V[Q]]);
    H.usedDuplicates = new Array(ee);
  }
  function de(_, H, X) {
    var V, Q, ee;
    if (_ !== null && typeof _ == "object")
      if (Q = H.indexOf(_), Q !== -1)
        X.indexOf(Q) === -1 && X.push(Q);
      else if (H.push(_), Array.isArray(_))
        for (Q = 0, ee = _.length; Q < ee; Q += 1)
          de(_[Q], H, X);
      else
        for (V = Object.keys(_), Q = 0, ee = V.length; Q < ee; Q += 1)
          de(_[V[Q]], H, X);
  }
  function $e(_, H) {
    H = H || {};
    var X = new ce(H);
    X.noRefs || Te(_, X);
    var V = _;
    return X.replacer && (V = X.replacer.call({ "": V }, "", V)), ve(X, 0, V, !0, !0) ? X.dump + `
` : "";
  }
  return ai.dump = $e, ai;
}
var Ta;
function Lo() {
  if (Ta) return He;
  Ta = 1;
  var o = nd(), h = id();
  function d(f, u) {
    return function() {
      throw new Error("Function yaml." + f + " is removed in js-yaml 4. Use yaml." + u + " instead, which is now safe by default.");
    };
  }
  return He.Type = Ge(), He.Schema = qu(), He.FAILSAFE_SCHEMA = ju(), He.JSON_SCHEMA = Vu(), He.CORE_SCHEMA = Yu(), He.DEFAULT_SCHEMA = xo(), He.load = o.load, He.loadAll = o.loadAll, He.dump = h.dump, He.YAMLException = yr(), He.types = {
    binary: Ku(),
    float: zu(),
    map: Bu(),
    null: Hu(),
    pairs: Zu(),
    set: ec(),
    timestamp: Xu(),
    bool: Gu(),
    int: Wu(),
    merge: Ju(),
    omap: Qu(),
    seq: Mu(),
    str: ku()
  }, He.safeLoad = d("safeLoad", "load"), He.safeLoadAll = d("safeLoadAll", "loadAll"), He.safeDump = d("safeDump", "dump"), He;
}
var Xt = {}, Ca;
function od() {
  if (Ca) return Xt;
  Ca = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.Lazy = void 0;
  class o {
    constructor(d) {
      this._value = null, this.creator = d;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const d = this.creator();
      return this.value = d, d;
    }
    set value(d) {
      this._value = d, this.creator = null;
    }
  }
  return Xt.Lazy = o, Xt;
}
var qr = { exports: {} }, li, Oa;
function zr() {
  if (Oa) return li;
  Oa = 1;
  const o = "2.0.0", h = 256, d = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, f = 16, u = h - 6;
  return li = {
    MAX_LENGTH: h,
    MAX_SAFE_COMPONENT_LENGTH: f,
    MAX_SAFE_BUILD_LENGTH: u,
    MAX_SAFE_INTEGER: d,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: o,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, li;
}
var ui, Pa;
function Vr() {
  return Pa || (Pa = 1, ui = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...h) => console.error("SEMVER", ...h) : () => {
  }), ui;
}
var Da;
function Er() {
  return Da || (Da = 1, function(o, h) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: d,
      MAX_SAFE_BUILD_LENGTH: f,
      MAX_LENGTH: u
    } = zr(), n = Vr();
    h = o.exports = {};
    const e = h.re = [], i = h.safeRe = [], t = h.src = [], r = h.t = {};
    let c = 0;
    const l = "[a-zA-Z0-9-]", s = [
      ["\\s", 1],
      ["\\d", u],
      [l, f]
    ], p = (E) => {
      for (const [m, w] of s)
        E = E.split(`${m}*`).join(`${m}{0,${w}}`).split(`${m}+`).join(`${m}{1,${w}}`);
      return E;
    }, g = (E, m, w) => {
      const T = p(m), O = c++;
      n(E, O, m), r[E] = O, t[O] = m, e[O] = new RegExp(m, w ? "g" : void 0), i[O] = new RegExp(T, w ? "g" : void 0);
    };
    g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${l}*`), g("MAINVERSION", `(${t[r.NUMERICIDENTIFIER]})\\.(${t[r.NUMERICIDENTIFIER]})\\.(${t[r.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${t[r.NUMERICIDENTIFIERLOOSE]})\\.(${t[r.NUMERICIDENTIFIERLOOSE]})\\.(${t[r.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${t[r.NUMERICIDENTIFIER]}|${t[r.NONNUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${t[r.NUMERICIDENTIFIERLOOSE]}|${t[r.NONNUMERICIDENTIFIER]})`), g("PRERELEASE", `(?:-(${t[r.PRERELEASEIDENTIFIER]}(?:\\.${t[r.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${t[r.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${t[r.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${l}+`), g("BUILD", `(?:\\+(${t[r.BUILDIDENTIFIER]}(?:\\.${t[r.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${t[r.MAINVERSION]}${t[r.PRERELEASE]}?${t[r.BUILD]}?`), g("FULL", `^${t[r.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${t[r.MAINVERSIONLOOSE]}${t[r.PRERELEASELOOSE]}?${t[r.BUILD]}?`), g("LOOSE", `^${t[r.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${t[r.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${t[r.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${t[r.XRANGEIDENTIFIER]})(?:\\.(${t[r.XRANGEIDENTIFIER]})(?:\\.(${t[r.XRANGEIDENTIFIER]})(?:${t[r.PRERELEASE]})?${t[r.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${t[r.XRANGEIDENTIFIERLOOSE]})(?:\\.(${t[r.XRANGEIDENTIFIERLOOSE]})(?:\\.(${t[r.XRANGEIDENTIFIERLOOSE]})(?:${t[r.PRERELEASELOOSE]})?${t[r.BUILD]}?)?)?`), g("XRANGE", `^${t[r.GTLT]}\\s*${t[r.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${t[r.GTLT]}\\s*${t[r.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${d}})(?:\\.(\\d{1,${d}}))?(?:\\.(\\d{1,${d}}))?`), g("COERCE", `${t[r.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", t[r.COERCEPLAIN] + `(?:${t[r.PRERELEASE]})?(?:${t[r.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", t[r.COERCE], !0), g("COERCERTLFULL", t[r.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${t[r.LONETILDE]}\\s+`, !0), h.tildeTrimReplace = "$1~", g("TILDE", `^${t[r.LONETILDE]}${t[r.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${t[r.LONETILDE]}${t[r.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${t[r.LONECARET]}\\s+`, !0), h.caretTrimReplace = "$1^", g("CARET", `^${t[r.LONECARET]}${t[r.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${t[r.LONECARET]}${t[r.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${t[r.GTLT]}\\s*(${t[r.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${t[r.GTLT]}\\s*(${t[r.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${t[r.GTLT]}\\s*(${t[r.LOOSEPLAIN]}|${t[r.XRANGEPLAIN]})`, !0), h.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${t[r.XRANGEPLAIN]})\\s+-\\s+(${t[r.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${t[r.XRANGEPLAINLOOSE]})\\s+-\\s+(${t[r.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(qr, qr.exports)), qr.exports;
}
var ci, Ia;
function $o() {
  if (Ia) return ci;
  Ia = 1;
  const o = Object.freeze({ loose: !0 }), h = Object.freeze({});
  return ci = (f) => f ? typeof f != "object" ? o : f : h, ci;
}
var fi, Na;
function tc() {
  if (Na) return fi;
  Na = 1;
  const o = /^[0-9]+$/, h = (f, u) => {
    const n = o.test(f), e = o.test(u);
    return n && e && (f = +f, u = +u), f === u ? 0 : n && !e ? -1 : e && !n ? 1 : f < u ? -1 : 1;
  };
  return fi = {
    compareIdentifiers: h,
    rcompareIdentifiers: (f, u) => h(u, f)
  }, fi;
}
var di, Fa;
function We() {
  if (Fa) return di;
  Fa = 1;
  const o = Vr(), { MAX_LENGTH: h, MAX_SAFE_INTEGER: d } = zr(), { safeRe: f, t: u } = Er(), n = $o(), { compareIdentifiers: e } = tc();
  class i {
    constructor(r, c) {
      if (c = n(c), r instanceof i) {
        if (r.loose === !!c.loose && r.includePrerelease === !!c.includePrerelease)
          return r;
        r = r.version;
      } else if (typeof r != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof r}".`);
      if (r.length > h)
        throw new TypeError(
          `version is longer than ${h} characters`
        );
      o("SemVer", r, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
      const l = r.trim().match(c.loose ? f[u.LOOSE] : f[u.FULL]);
      if (!l)
        throw new TypeError(`Invalid Version: ${r}`);
      if (this.raw = r, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > d || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > d || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > d || this.patch < 0)
        throw new TypeError("Invalid patch version");
      l[4] ? this.prerelease = l[4].split(".").map((s) => {
        if (/^[0-9]+$/.test(s)) {
          const p = +s;
          if (p >= 0 && p < d)
            return p;
        }
        return s;
      }) : this.prerelease = [], this.build = l[5] ? l[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(r) {
      if (o("SemVer.compare", this.version, this.options, r), !(r instanceof i)) {
        if (typeof r == "string" && r === this.version)
          return 0;
        r = new i(r, this.options);
      }
      return r.version === this.version ? 0 : this.compareMain(r) || this.comparePre(r);
    }
    compareMain(r) {
      return r instanceof i || (r = new i(r, this.options)), e(this.major, r.major) || e(this.minor, r.minor) || e(this.patch, r.patch);
    }
    comparePre(r) {
      if (r instanceof i || (r = new i(r, this.options)), this.prerelease.length && !r.prerelease.length)
        return -1;
      if (!this.prerelease.length && r.prerelease.length)
        return 1;
      if (!this.prerelease.length && !r.prerelease.length)
        return 0;
      let c = 0;
      do {
        const l = this.prerelease[c], s = r.prerelease[c];
        if (o("prerelease compare", c, l, s), l === void 0 && s === void 0)
          return 0;
        if (s === void 0)
          return 1;
        if (l === void 0)
          return -1;
        if (l === s)
          continue;
        return e(l, s);
      } while (++c);
    }
    compareBuild(r) {
      r instanceof i || (r = new i(r, this.options));
      let c = 0;
      do {
        const l = this.build[c], s = r.build[c];
        if (o("build compare", c, l, s), l === void 0 && s === void 0)
          return 0;
        if (s === void 0)
          return 1;
        if (l === void 0)
          return -1;
        if (l === s)
          continue;
        return e(l, s);
      } while (++c);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(r, c, l) {
      switch (r) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", c, l);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", c, l);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", c, l), this.inc("pre", c, l);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", c, l), this.inc("pre", c, l);
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
          const s = Number(l) ? 1 : 0;
          if (!c && l === !1)
            throw new Error("invalid increment argument: identifier is empty");
          if (this.prerelease.length === 0)
            this.prerelease = [s];
          else {
            let p = this.prerelease.length;
            for (; --p >= 0; )
              typeof this.prerelease[p] == "number" && (this.prerelease[p]++, p = -2);
            if (p === -1) {
              if (c === this.prerelease.join(".") && l === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(s);
            }
          }
          if (c) {
            let p = [c, s];
            l === !1 && (p = [c]), e(this.prerelease[0], c) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = p) : this.prerelease = p;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${r}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return di = i, di;
}
var hi, xa;
function Bt() {
  if (xa) return hi;
  xa = 1;
  const o = We();
  return hi = (d, f, u = !1) => {
    if (d instanceof o)
      return d;
    try {
      return new o(d, f);
    } catch (n) {
      if (!u)
        return null;
      throw n;
    }
  }, hi;
}
var pi, La;
function sd() {
  if (La) return pi;
  La = 1;
  const o = Bt();
  return pi = (d, f) => {
    const u = o(d, f);
    return u ? u.version : null;
  }, pi;
}
var mi, $a;
function ad() {
  if ($a) return mi;
  $a = 1;
  const o = Bt();
  return mi = (d, f) => {
    const u = o(d.trim().replace(/^[=v]+/, ""), f);
    return u ? u.version : null;
  }, mi;
}
var gi, Ua;
function ld() {
  if (Ua) return gi;
  Ua = 1;
  const o = We();
  return gi = (d, f, u, n, e) => {
    typeof u == "string" && (e = n, n = u, u = void 0);
    try {
      return new o(
        d instanceof o ? d.version : d,
        u
      ).inc(f, n, e).version;
    } catch {
      return null;
    }
  }, gi;
}
var vi, qa;
function ud() {
  if (qa) return vi;
  qa = 1;
  const o = Bt();
  return vi = (d, f) => {
    const u = o(d, null, !0), n = o(f, null, !0), e = u.compare(n);
    if (e === 0)
      return null;
    const i = e > 0, t = i ? u : n, r = i ? n : u, c = !!t.prerelease.length;
    if (!!r.prerelease.length && !c)
      return !r.patch && !r.minor ? "major" : t.patch ? "patch" : t.minor ? "minor" : "major";
    const s = c ? "pre" : "";
    return u.major !== n.major ? s + "major" : u.minor !== n.minor ? s + "minor" : u.patch !== n.patch ? s + "patch" : "prerelease";
  }, vi;
}
var yi, ka;
function cd() {
  if (ka) return yi;
  ka = 1;
  const o = We();
  return yi = (d, f) => new o(d, f).major, yi;
}
var Ei, Ma;
function fd() {
  if (Ma) return Ei;
  Ma = 1;
  const o = We();
  return Ei = (d, f) => new o(d, f).minor, Ei;
}
var wi, Ba;
function dd() {
  if (Ba) return wi;
  Ba = 1;
  const o = We();
  return wi = (d, f) => new o(d, f).patch, wi;
}
var _i, ja;
function hd() {
  if (ja) return _i;
  ja = 1;
  const o = Bt();
  return _i = (d, f) => {
    const u = o(d, f);
    return u && u.prerelease.length ? u.prerelease : null;
  }, _i;
}
var Si, Ha;
function tt() {
  if (Ha) return Si;
  Ha = 1;
  const o = We();
  return Si = (d, f, u) => new o(d, u).compare(new o(f, u)), Si;
}
var Ai, Ga;
function pd() {
  if (Ga) return Ai;
  Ga = 1;
  const o = tt();
  return Ai = (d, f, u) => o(f, d, u), Ai;
}
var bi, Wa;
function md() {
  if (Wa) return bi;
  Wa = 1;
  const o = tt();
  return bi = (d, f) => o(d, f, !0), bi;
}
var Ri, za;
function Uo() {
  if (za) return Ri;
  za = 1;
  const o = We();
  return Ri = (d, f, u) => {
    const n = new o(d, u), e = new o(f, u);
    return n.compare(e) || n.compareBuild(e);
  }, Ri;
}
var Ti, Va;
function gd() {
  if (Va) return Ti;
  Va = 1;
  const o = Uo();
  return Ti = (d, f) => d.sort((u, n) => o(u, n, f)), Ti;
}
var Ci, Ya;
function vd() {
  if (Ya) return Ci;
  Ya = 1;
  const o = Uo();
  return Ci = (d, f) => d.sort((u, n) => o(n, u, f)), Ci;
}
var Oi, Xa;
function Yr() {
  if (Xa) return Oi;
  Xa = 1;
  const o = tt();
  return Oi = (d, f, u) => o(d, f, u) > 0, Oi;
}
var Pi, Ja;
function qo() {
  if (Ja) return Pi;
  Ja = 1;
  const o = tt();
  return Pi = (d, f, u) => o(d, f, u) < 0, Pi;
}
var Di, Ka;
function rc() {
  if (Ka) return Di;
  Ka = 1;
  const o = tt();
  return Di = (d, f, u) => o(d, f, u) === 0, Di;
}
var Ii, Qa;
function nc() {
  if (Qa) return Ii;
  Qa = 1;
  const o = tt();
  return Ii = (d, f, u) => o(d, f, u) !== 0, Ii;
}
var Ni, Za;
function ko() {
  if (Za) return Ni;
  Za = 1;
  const o = tt();
  return Ni = (d, f, u) => o(d, f, u) >= 0, Ni;
}
var Fi, el;
function Mo() {
  if (el) return Fi;
  el = 1;
  const o = tt();
  return Fi = (d, f, u) => o(d, f, u) <= 0, Fi;
}
var xi, tl;
function ic() {
  if (tl) return xi;
  tl = 1;
  const o = rc(), h = nc(), d = Yr(), f = ko(), u = qo(), n = Mo();
  return xi = (i, t, r, c) => {
    switch (t) {
      case "===":
        return typeof i == "object" && (i = i.version), typeof r == "object" && (r = r.version), i === r;
      case "!==":
        return typeof i == "object" && (i = i.version), typeof r == "object" && (r = r.version), i !== r;
      case "":
      case "=":
      case "==":
        return o(i, r, c);
      case "!=":
        return h(i, r, c);
      case ">":
        return d(i, r, c);
      case ">=":
        return f(i, r, c);
      case "<":
        return u(i, r, c);
      case "<=":
        return n(i, r, c);
      default:
        throw new TypeError(`Invalid operator: ${t}`);
    }
  }, xi;
}
var Li, rl;
function yd() {
  if (rl) return Li;
  rl = 1;
  const o = We(), h = Bt(), { safeRe: d, t: f } = Er();
  return Li = (n, e) => {
    if (n instanceof o)
      return n;
    if (typeof n == "number" && (n = String(n)), typeof n != "string")
      return null;
    e = e || {};
    let i = null;
    if (!e.rtl)
      i = n.match(e.includePrerelease ? d[f.COERCEFULL] : d[f.COERCE]);
    else {
      const p = e.includePrerelease ? d[f.COERCERTLFULL] : d[f.COERCERTL];
      let g;
      for (; (g = p.exec(n)) && (!i || i.index + i[0].length !== n.length); )
        (!i || g.index + g[0].length !== i.index + i[0].length) && (i = g), p.lastIndex = g.index + g[1].length + g[2].length;
      p.lastIndex = -1;
    }
    if (i === null)
      return null;
    const t = i[2], r = i[3] || "0", c = i[4] || "0", l = e.includePrerelease && i[5] ? `-${i[5]}` : "", s = e.includePrerelease && i[6] ? `+${i[6]}` : "";
    return h(`${t}.${r}.${c}${l}${s}`, e);
  }, Li;
}
var $i, nl;
function Ed() {
  if (nl) return $i;
  nl = 1;
  class o {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(d) {
      const f = this.map.get(d);
      if (f !== void 0)
        return this.map.delete(d), this.map.set(d, f), f;
    }
    delete(d) {
      return this.map.delete(d);
    }
    set(d, f) {
      if (!this.delete(d) && f !== void 0) {
        if (this.map.size >= this.max) {
          const n = this.map.keys().next().value;
          this.delete(n);
        }
        this.map.set(d, f);
      }
      return this;
    }
  }
  return $i = o, $i;
}
var Ui, il;
function rt() {
  if (il) return Ui;
  il = 1;
  const o = /\s+/g;
  class h {
    constructor(D, F) {
      if (F = u(F), D instanceof h)
        return D.loose === !!F.loose && D.includePrerelease === !!F.includePrerelease ? D : new h(D.raw, F);
      if (D instanceof n)
        return this.raw = D.value, this.set = [[D]], this.formatted = void 0, this;
      if (this.options = F, this.loose = !!F.loose, this.includePrerelease = !!F.includePrerelease, this.raw = D.trim().replace(o, " "), this.set = this.raw.split("||").map((q) => this.parseRange(q.trim())).filter((q) => q.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const q = this.set[0];
        if (this.set = this.set.filter((K) => !E(K[0])), this.set.length === 0)
          this.set = [q];
        else if (this.set.length > 1) {
          for (const K of this.set)
            if (K.length === 1 && m(K[0])) {
              this.set = [K];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let D = 0; D < this.set.length; D++) {
          D > 0 && (this.formatted += "||");
          const F = this.set[D];
          for (let q = 0; q < F.length; q++)
            q > 0 && (this.formatted += " "), this.formatted += F[q].toString().trim();
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
    parseRange(D) {
      const q = ((this.options.includePrerelease && p) | (this.options.loose && g)) + ":" + D, K = f.get(q);
      if (K)
        return K;
      const W = this.options.loose, ne = W ? t[r.HYPHENRANGELOOSE] : t[r.HYPHENRANGE];
      D = D.replace(ne, L(this.options.includePrerelease)), e("hyphen replace", D), D = D.replace(t[r.COMPARATORTRIM], c), e("comparator trim", D), D = D.replace(t[r.TILDETRIM], l), e("tilde trim", D), D = D.replace(t[r.CARETTRIM], s), e("caret trim", D);
      let ce = D.split(" ").map((J) => T(J, this.options)).join(" ").split(/\s+/).map((J) => $(J, this.options));
      W && (ce = ce.filter((J) => (e("loose invalid filter", J, this.options), !!J.match(t[r.COMPARATORLOOSE])))), e("range list", ce);
      const ue = /* @__PURE__ */ new Map(), ie = ce.map((J) => new n(J, this.options));
      for (const J of ie) {
        if (E(J))
          return [J];
        ue.set(J.value, J);
      }
      ue.size > 1 && ue.has("") && ue.delete("");
      const Re = [...ue.values()];
      return f.set(q, Re), Re;
    }
    intersects(D, F) {
      if (!(D instanceof h))
        throw new TypeError("a Range is required");
      return this.set.some((q) => w(q, F) && D.set.some((K) => w(K, F) && q.every((W) => K.every((ne) => W.intersects(ne, F)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(D) {
      if (!D)
        return !1;
      if (typeof D == "string")
        try {
          D = new i(D, this.options);
        } catch {
          return !1;
        }
      for (let F = 0; F < this.set.length; F++)
        if (k(this.set[F], D, this.options))
          return !0;
      return !1;
    }
  }
  Ui = h;
  const d = Ed(), f = new d(), u = $o(), n = Xr(), e = Vr(), i = We(), {
    safeRe: t,
    t: r,
    comparatorTrimReplace: c,
    tildeTrimReplace: l,
    caretTrimReplace: s
  } = Er(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: g } = zr(), E = (I) => I.value === "<0.0.0-0", m = (I) => I.value === "", w = (I, D) => {
    let F = !0;
    const q = I.slice();
    let K = q.pop();
    for (; F && q.length; )
      F = q.every((W) => K.intersects(W, D)), K = q.pop();
    return F;
  }, T = (I, D) => (e("comp", I, D), I = R(I, D), e("caret", I), I = P(I, D), e("tildes", I), I = b(I, D), e("xrange", I), I = M(I, D), e("stars", I), I), O = (I) => !I || I.toLowerCase() === "x" || I === "*", P = (I, D) => I.trim().split(/\s+/).map((F) => U(F, D)).join(" "), U = (I, D) => {
    const F = D.loose ? t[r.TILDELOOSE] : t[r.TILDE];
    return I.replace(F, (q, K, W, ne, ce) => {
      e("tilde", I, q, K, W, ne, ce);
      let ue;
      return O(K) ? ue = "" : O(W) ? ue = `>=${K}.0.0 <${+K + 1}.0.0-0` : O(ne) ? ue = `>=${K}.${W}.0 <${K}.${+W + 1}.0-0` : ce ? (e("replaceTilde pr", ce), ue = `>=${K}.${W}.${ne}-${ce} <${K}.${+W + 1}.0-0`) : ue = `>=${K}.${W}.${ne} <${K}.${+W + 1}.0-0`, e("tilde return", ue), ue;
    });
  }, R = (I, D) => I.trim().split(/\s+/).map((F) => S(F, D)).join(" "), S = (I, D) => {
    e("caret", I, D);
    const F = D.loose ? t[r.CARETLOOSE] : t[r.CARET], q = D.includePrerelease ? "-0" : "";
    return I.replace(F, (K, W, ne, ce, ue) => {
      e("caret", I, K, W, ne, ce, ue);
      let ie;
      return O(W) ? ie = "" : O(ne) ? ie = `>=${W}.0.0${q} <${+W + 1}.0.0-0` : O(ce) ? W === "0" ? ie = `>=${W}.${ne}.0${q} <${W}.${+ne + 1}.0-0` : ie = `>=${W}.${ne}.0${q} <${+W + 1}.0.0-0` : ue ? (e("replaceCaret pr", ue), W === "0" ? ne === "0" ? ie = `>=${W}.${ne}.${ce}-${ue} <${W}.${ne}.${+ce + 1}-0` : ie = `>=${W}.${ne}.${ce}-${ue} <${W}.${+ne + 1}.0-0` : ie = `>=${W}.${ne}.${ce}-${ue} <${+W + 1}.0.0-0`) : (e("no pr"), W === "0" ? ne === "0" ? ie = `>=${W}.${ne}.${ce}${q} <${W}.${ne}.${+ce + 1}-0` : ie = `>=${W}.${ne}.${ce}${q} <${W}.${+ne + 1}.0-0` : ie = `>=${W}.${ne}.${ce} <${+W + 1}.0.0-0`), e("caret return", ie), ie;
    });
  }, b = (I, D) => (e("replaceXRanges", I, D), I.split(/\s+/).map((F) => y(F, D)).join(" ")), y = (I, D) => {
    I = I.trim();
    const F = D.loose ? t[r.XRANGELOOSE] : t[r.XRANGE];
    return I.replace(F, (q, K, W, ne, ce, ue) => {
      e("xRange", I, q, K, W, ne, ce, ue);
      const ie = O(W), Re = ie || O(ne), J = Re || O(ce), ye = J;
      return K === "=" && ye && (K = ""), ue = D.includePrerelease ? "-0" : "", ie ? K === ">" || K === "<" ? q = "<0.0.0-0" : q = "*" : K && ye ? (Re && (ne = 0), ce = 0, K === ">" ? (K = ">=", Re ? (W = +W + 1, ne = 0, ce = 0) : (ne = +ne + 1, ce = 0)) : K === "<=" && (K = "<", Re ? W = +W + 1 : ne = +ne + 1), K === "<" && (ue = "-0"), q = `${K + W}.${ne}.${ce}${ue}`) : Re ? q = `>=${W}.0.0${ue} <${+W + 1}.0.0-0` : J && (q = `>=${W}.${ne}.0${ue} <${W}.${+ne + 1}.0-0`), e("xRange return", q), q;
    });
  }, M = (I, D) => (e("replaceStars", I, D), I.trim().replace(t[r.STAR], "")), $ = (I, D) => (e("replaceGTE0", I, D), I.trim().replace(t[D.includePrerelease ? r.GTE0PRE : r.GTE0], "")), L = (I) => (D, F, q, K, W, ne, ce, ue, ie, Re, J, ye) => (O(q) ? F = "" : O(K) ? F = `>=${q}.0.0${I ? "-0" : ""}` : O(W) ? F = `>=${q}.${K}.0${I ? "-0" : ""}` : ne ? F = `>=${F}` : F = `>=${F}${I ? "-0" : ""}`, O(ie) ? ue = "" : O(Re) ? ue = `<${+ie + 1}.0.0-0` : O(J) ? ue = `<${ie}.${+Re + 1}.0-0` : ye ? ue = `<=${ie}.${Re}.${J}-${ye}` : I ? ue = `<${ie}.${Re}.${+J + 1}-0` : ue = `<=${ue}`, `${F} ${ue}`.trim()), k = (I, D, F) => {
    for (let q = 0; q < I.length; q++)
      if (!I[q].test(D))
        return !1;
    if (D.prerelease.length && !F.includePrerelease) {
      for (let q = 0; q < I.length; q++)
        if (e(I[q].semver), I[q].semver !== n.ANY && I[q].semver.prerelease.length > 0) {
          const K = I[q].semver;
          if (K.major === D.major && K.minor === D.minor && K.patch === D.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ui;
}
var qi, ol;
function Xr() {
  if (ol) return qi;
  ol = 1;
  const o = Symbol("SemVer ANY");
  class h {
    static get ANY() {
      return o;
    }
    constructor(c, l) {
      if (l = d(l), c instanceof h) {
        if (c.loose === !!l.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), e("comparator", c, l), this.options = l, this.loose = !!l.loose, this.parse(c), this.semver === o ? this.value = "" : this.value = this.operator + this.semver.version, e("comp", this);
    }
    parse(c) {
      const l = this.options.loose ? f[u.COMPARATORLOOSE] : f[u.COMPARATOR], s = c.match(l);
      if (!s)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = s[1] !== void 0 ? s[1] : "", this.operator === "=" && (this.operator = ""), s[2] ? this.semver = new i(s[2], this.options.loose) : this.semver = o;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (e("Comparator.test", c, this.options.loose), this.semver === o || c === o)
        return !0;
      if (typeof c == "string")
        try {
          c = new i(c, this.options);
        } catch {
          return !1;
        }
      return n(c, this.operator, this.semver, this.options);
    }
    intersects(c, l) {
      if (!(c instanceof h))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new t(c.value, l).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new t(this.value, l).test(c.semver) : (l = d(l), l.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !l.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || n(this.semver, "<", c.semver, l) && this.operator.startsWith(">") && c.operator.startsWith("<") || n(this.semver, ">", c.semver, l) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  qi = h;
  const d = $o(), { safeRe: f, t: u } = Er(), n = ic(), e = Vr(), i = We(), t = rt();
  return qi;
}
var ki, sl;
function Jr() {
  if (sl) return ki;
  sl = 1;
  const o = rt();
  return ki = (d, f, u) => {
    try {
      f = new o(f, u);
    } catch {
      return !1;
    }
    return f.test(d);
  }, ki;
}
var Mi, al;
function wd() {
  if (al) return Mi;
  al = 1;
  const o = rt();
  return Mi = (d, f) => new o(d, f).set.map((u) => u.map((n) => n.value).join(" ").trim().split(" ")), Mi;
}
var Bi, ll;
function _d() {
  if (ll) return Bi;
  ll = 1;
  const o = We(), h = rt();
  return Bi = (f, u, n) => {
    let e = null, i = null, t = null;
    try {
      t = new h(u, n);
    } catch {
      return null;
    }
    return f.forEach((r) => {
      t.test(r) && (!e || i.compare(r) === -1) && (e = r, i = new o(e, n));
    }), e;
  }, Bi;
}
var ji, ul;
function Sd() {
  if (ul) return ji;
  ul = 1;
  const o = We(), h = rt();
  return ji = (f, u, n) => {
    let e = null, i = null, t = null;
    try {
      t = new h(u, n);
    } catch {
      return null;
    }
    return f.forEach((r) => {
      t.test(r) && (!e || i.compare(r) === 1) && (e = r, i = new o(e, n));
    }), e;
  }, ji;
}
var Hi, cl;
function Ad() {
  if (cl) return Hi;
  cl = 1;
  const o = We(), h = rt(), d = Yr();
  return Hi = (u, n) => {
    u = new h(u, n);
    let e = new o("0.0.0");
    if (u.test(e) || (e = new o("0.0.0-0"), u.test(e)))
      return e;
    e = null;
    for (let i = 0; i < u.set.length; ++i) {
      const t = u.set[i];
      let r = null;
      t.forEach((c) => {
        const l = new o(c.semver.version);
        switch (c.operator) {
          case ">":
            l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
          /* fallthrough */
          case "":
          case ">=":
            (!r || d(l, r)) && (r = l);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${c.operator}`);
        }
      }), r && (!e || d(e, r)) && (e = r);
    }
    return e && u.test(e) ? e : null;
  }, Hi;
}
var Gi, fl;
function bd() {
  if (fl) return Gi;
  fl = 1;
  const o = rt();
  return Gi = (d, f) => {
    try {
      return new o(d, f).range || "*";
    } catch {
      return null;
    }
  }, Gi;
}
var Wi, dl;
function Bo() {
  if (dl) return Wi;
  dl = 1;
  const o = We(), h = Xr(), { ANY: d } = h, f = rt(), u = Jr(), n = Yr(), e = qo(), i = Mo(), t = ko();
  return Wi = (c, l, s, p) => {
    c = new o(c, p), l = new f(l, p);
    let g, E, m, w, T;
    switch (s) {
      case ">":
        g = n, E = i, m = e, w = ">", T = ">=";
        break;
      case "<":
        g = e, E = t, m = n, w = "<", T = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (u(c, l, p))
      return !1;
    for (let O = 0; O < l.set.length; ++O) {
      const P = l.set[O];
      let U = null, R = null;
      if (P.forEach((S) => {
        S.semver === d && (S = new h(">=0.0.0")), U = U || S, R = R || S, g(S.semver, U.semver, p) ? U = S : m(S.semver, R.semver, p) && (R = S);
      }), U.operator === w || U.operator === T || (!R.operator || R.operator === w) && E(c, R.semver))
        return !1;
      if (R.operator === T && m(c, R.semver))
        return !1;
    }
    return !0;
  }, Wi;
}
var zi, hl;
function Rd() {
  if (hl) return zi;
  hl = 1;
  const o = Bo();
  return zi = (d, f, u) => o(d, f, ">", u), zi;
}
var Vi, pl;
function Td() {
  if (pl) return Vi;
  pl = 1;
  const o = Bo();
  return Vi = (d, f, u) => o(d, f, "<", u), Vi;
}
var Yi, ml;
function Cd() {
  if (ml) return Yi;
  ml = 1;
  const o = rt();
  return Yi = (d, f, u) => (d = new o(d, u), f = new o(f, u), d.intersects(f, u)), Yi;
}
var Xi, gl;
function Od() {
  if (gl) return Xi;
  gl = 1;
  const o = Jr(), h = tt();
  return Xi = (d, f, u) => {
    const n = [];
    let e = null, i = null;
    const t = d.sort((s, p) => h(s, p, u));
    for (const s of t)
      o(s, f, u) ? (i = s, e || (e = s)) : (i && n.push([e, i]), i = null, e = null);
    e && n.push([e, null]);
    const r = [];
    for (const [s, p] of n)
      s === p ? r.push(s) : !p && s === t[0] ? r.push("*") : p ? s === t[0] ? r.push(`<=${p}`) : r.push(`${s} - ${p}`) : r.push(`>=${s}`);
    const c = r.join(" || "), l = typeof f.raw == "string" ? f.raw : String(f);
    return c.length < l.length ? c : f;
  }, Xi;
}
var Ji, vl;
function Pd() {
  if (vl) return Ji;
  vl = 1;
  const o = rt(), h = Xr(), { ANY: d } = h, f = Jr(), u = tt(), n = (l, s, p = {}) => {
    if (l === s)
      return !0;
    l = new o(l, p), s = new o(s, p);
    let g = !1;
    e: for (const E of l.set) {
      for (const m of s.set) {
        const w = t(E, m, p);
        if (g = g || w !== null, w)
          continue e;
      }
      if (g)
        return !1;
    }
    return !0;
  }, e = [new h(">=0.0.0-0")], i = [new h(">=0.0.0")], t = (l, s, p) => {
    if (l === s)
      return !0;
    if (l.length === 1 && l[0].semver === d) {
      if (s.length === 1 && s[0].semver === d)
        return !0;
      p.includePrerelease ? l = e : l = i;
    }
    if (s.length === 1 && s[0].semver === d) {
      if (p.includePrerelease)
        return !0;
      s = i;
    }
    const g = /* @__PURE__ */ new Set();
    let E, m;
    for (const b of l)
      b.operator === ">" || b.operator === ">=" ? E = r(E, b, p) : b.operator === "<" || b.operator === "<=" ? m = c(m, b, p) : g.add(b.semver);
    if (g.size > 1)
      return null;
    let w;
    if (E && m) {
      if (w = u(E.semver, m.semver, p), w > 0)
        return null;
      if (w === 0 && (E.operator !== ">=" || m.operator !== "<="))
        return null;
    }
    for (const b of g) {
      if (E && !f(b, String(E), p) || m && !f(b, String(m), p))
        return null;
      for (const y of s)
        if (!f(b, String(y), p))
          return !1;
      return !0;
    }
    let T, O, P, U, R = m && !p.includePrerelease && m.semver.prerelease.length ? m.semver : !1, S = E && !p.includePrerelease && E.semver.prerelease.length ? E.semver : !1;
    R && R.prerelease.length === 1 && m.operator === "<" && R.prerelease[0] === 0 && (R = !1);
    for (const b of s) {
      if (U = U || b.operator === ">" || b.operator === ">=", P = P || b.operator === "<" || b.operator === "<=", E) {
        if (S && b.semver.prerelease && b.semver.prerelease.length && b.semver.major === S.major && b.semver.minor === S.minor && b.semver.patch === S.patch && (S = !1), b.operator === ">" || b.operator === ">=") {
          if (T = r(E, b, p), T === b && T !== E)
            return !1;
        } else if (E.operator === ">=" && !f(E.semver, String(b), p))
          return !1;
      }
      if (m) {
        if (R && b.semver.prerelease && b.semver.prerelease.length && b.semver.major === R.major && b.semver.minor === R.minor && b.semver.patch === R.patch && (R = !1), b.operator === "<" || b.operator === "<=") {
          if (O = c(m, b, p), O === b && O !== m)
            return !1;
        } else if (m.operator === "<=" && !f(m.semver, String(b), p))
          return !1;
      }
      if (!b.operator && (m || E) && w !== 0)
        return !1;
    }
    return !(E && P && !m && w !== 0 || m && U && !E && w !== 0 || S || R);
  }, r = (l, s, p) => {
    if (!l)
      return s;
    const g = u(l.semver, s.semver, p);
    return g > 0 ? l : g < 0 || s.operator === ">" && l.operator === ">=" ? s : l;
  }, c = (l, s, p) => {
    if (!l)
      return s;
    const g = u(l.semver, s.semver, p);
    return g < 0 ? l : g > 0 || s.operator === "<" && l.operator === "<=" ? s : l;
  };
  return Ji = n, Ji;
}
var Ki, yl;
function oc() {
  if (yl) return Ki;
  yl = 1;
  const o = Er(), h = zr(), d = We(), f = tc(), u = Bt(), n = sd(), e = ad(), i = ld(), t = ud(), r = cd(), c = fd(), l = dd(), s = hd(), p = tt(), g = pd(), E = md(), m = Uo(), w = gd(), T = vd(), O = Yr(), P = qo(), U = rc(), R = nc(), S = ko(), b = Mo(), y = ic(), M = yd(), $ = Xr(), L = rt(), k = Jr(), I = wd(), D = _d(), F = Sd(), q = Ad(), K = bd(), W = Bo(), ne = Rd(), ce = Td(), ue = Cd(), ie = Od(), Re = Pd();
  return Ki = {
    parse: u,
    valid: n,
    clean: e,
    inc: i,
    diff: t,
    major: r,
    minor: c,
    patch: l,
    prerelease: s,
    compare: p,
    rcompare: g,
    compareLoose: E,
    compareBuild: m,
    sort: w,
    rsort: T,
    gt: O,
    lt: P,
    eq: U,
    neq: R,
    gte: S,
    lte: b,
    cmp: y,
    coerce: M,
    Comparator: $,
    Range: L,
    satisfies: k,
    toComparators: I,
    maxSatisfying: D,
    minSatisfying: F,
    minVersion: q,
    validRange: K,
    outside: W,
    gtr: ne,
    ltr: ce,
    intersects: ue,
    simplifyRange: ie,
    subset: Re,
    SemVer: d,
    re: o.re,
    src: o.src,
    tokens: o.t,
    SEMVER_SPEC_VERSION: h.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: h.RELEASE_TYPES,
    compareIdentifiers: f.compareIdentifiers,
    rcompareIdentifiers: f.rcompareIdentifiers
  }, Ki;
}
var xt = {}, hr = { exports: {} };
hr.exports;
var El;
function Dd() {
  return El || (El = 1, function(o, h) {
    var d = 200, f = "__lodash_hash_undefined__", u = 1, n = 2, e = 9007199254740991, i = "[object Arguments]", t = "[object Array]", r = "[object AsyncFunction]", c = "[object Boolean]", l = "[object Date]", s = "[object Error]", p = "[object Function]", g = "[object GeneratorFunction]", E = "[object Map]", m = "[object Number]", w = "[object Null]", T = "[object Object]", O = "[object Promise]", P = "[object Proxy]", U = "[object RegExp]", R = "[object Set]", S = "[object String]", b = "[object Symbol]", y = "[object Undefined]", M = "[object WeakMap]", $ = "[object ArrayBuffer]", L = "[object DataView]", k = "[object Float32Array]", I = "[object Float64Array]", D = "[object Int8Array]", F = "[object Int16Array]", q = "[object Int32Array]", K = "[object Uint8Array]", W = "[object Uint8ClampedArray]", ne = "[object Uint16Array]", ce = "[object Uint32Array]", ue = /[\\^$.*+?()[\]{}|]/g, ie = /^\[object .+?Constructor\]$/, Re = /^(?:0|[1-9]\d*)$/, J = {};
    J[k] = J[I] = J[D] = J[F] = J[q] = J[K] = J[W] = J[ne] = J[ce] = !0, J[i] = J[t] = J[$] = J[c] = J[L] = J[l] = J[s] = J[p] = J[E] = J[m] = J[T] = J[U] = J[R] = J[S] = J[M] = !1;
    var ye = typeof et == "object" && et && et.Object === Object && et, A = typeof self == "object" && self && self.Object === Object && self, v = ye || A || Function("return this")(), j = h && !h.nodeType && h, N = j && !0 && o && !o.nodeType && o, le = N && N.exports === j, me = le && ye.process, pe = function() {
      try {
        return me && me.binding && me.binding("util");
      } catch {
      }
    }(), _e = pe && pe.isTypedArray;
    function Ee(C, x) {
      for (var Y = -1, ae = C == null ? 0 : C.length, De = 0, Se = []; ++Y < ae; ) {
        var Fe = C[Y];
        x(Fe, Y, C) && (Se[De++] = Fe);
      }
      return Se;
    }
    function Le(C, x) {
      for (var Y = -1, ae = x.length, De = C.length; ++Y < ae; )
        C[De + Y] = x[Y];
      return C;
    }
    function Oe(C, x) {
      for (var Y = -1, ae = C == null ? 0 : C.length; ++Y < ae; )
        if (x(C[Y], Y, C))
          return !0;
      return !1;
    }
    function Me(C, x) {
      for (var Y = -1, ae = Array(C); ++Y < C; )
        ae[Y] = x(Y);
      return ae;
    }
    function Et(C) {
      return function(x) {
        return C(x);
      };
    }
    function st(C, x) {
      return C.has(x);
    }
    function a(C, x) {
      return C == null ? void 0 : C[x];
    }
    function B(C) {
      var x = -1, Y = Array(C.size);
      return C.forEach(function(ae, De) {
        Y[++x] = [De, ae];
      }), Y;
    }
    function G(C, x) {
      return function(Y) {
        return C(x(Y));
      };
    }
    function re(C) {
      var x = -1, Y = Array(C.size);
      return C.forEach(function(ae) {
        Y[++x] = ae;
      }), Y;
    }
    var z = Array.prototype, te = Function.prototype, Z = Object.prototype, oe = v["__core-js_shared__"], ge = te.toString, ve = Z.hasOwnProperty, Te = function() {
      var C = /[^.]+$/.exec(oe && oe.keys && oe.keys.IE_PROTO || "");
      return C ? "Symbol(src)_1." + C : "";
    }(), de = Z.toString, $e = RegExp(
      "^" + ge.call(ve).replace(ue, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), _ = le ? v.Buffer : void 0, H = v.Symbol, X = v.Uint8Array, V = Z.propertyIsEnumerable, Q = z.splice, ee = H ? H.toStringTag : void 0, fe = Object.getOwnPropertySymbols, se = _ ? _.isBuffer : void 0, he = G(Object.keys, Object), we = Nt(v, "DataView"), Pe = Nt(v, "Map"), Ne = Nt(v, "Promise"), Ce = Nt(v, "Set"), It = Nt(v, "WeakMap"), Qe = Nt(Object, "create"), wt = At(we), yc = At(Pe), Ec = At(Ne), wc = At(Ce), _c = At(It), Wo = H ? H.prototype : void 0, Qr = Wo ? Wo.valueOf : void 0;
    function _t(C) {
      var x = -1, Y = C == null ? 0 : C.length;
      for (this.clear(); ++x < Y; ) {
        var ae = C[x];
        this.set(ae[0], ae[1]);
      }
    }
    function Sc() {
      this.__data__ = Qe ? Qe(null) : {}, this.size = 0;
    }
    function Ac(C) {
      var x = this.has(C) && delete this.__data__[C];
      return this.size -= x ? 1 : 0, x;
    }
    function bc(C) {
      var x = this.__data__;
      if (Qe) {
        var Y = x[C];
        return Y === f ? void 0 : Y;
      }
      return ve.call(x, C) ? x[C] : void 0;
    }
    function Rc(C) {
      var x = this.__data__;
      return Qe ? x[C] !== void 0 : ve.call(x, C);
    }
    function Tc(C, x) {
      var Y = this.__data__;
      return this.size += this.has(C) ? 0 : 1, Y[C] = Qe && x === void 0 ? f : x, this;
    }
    _t.prototype.clear = Sc, _t.prototype.delete = Ac, _t.prototype.get = bc, _t.prototype.has = Rc, _t.prototype.set = Tc;
    function at(C) {
      var x = -1, Y = C == null ? 0 : C.length;
      for (this.clear(); ++x < Y; ) {
        var ae = C[x];
        this.set(ae[0], ae[1]);
      }
    }
    function Cc() {
      this.__data__ = [], this.size = 0;
    }
    function Oc(C) {
      var x = this.__data__, Y = Ar(x, C);
      if (Y < 0)
        return !1;
      var ae = x.length - 1;
      return Y == ae ? x.pop() : Q.call(x, Y, 1), --this.size, !0;
    }
    function Pc(C) {
      var x = this.__data__, Y = Ar(x, C);
      return Y < 0 ? void 0 : x[Y][1];
    }
    function Dc(C) {
      return Ar(this.__data__, C) > -1;
    }
    function Ic(C, x) {
      var Y = this.__data__, ae = Ar(Y, C);
      return ae < 0 ? (++this.size, Y.push([C, x])) : Y[ae][1] = x, this;
    }
    at.prototype.clear = Cc, at.prototype.delete = Oc, at.prototype.get = Pc, at.prototype.has = Dc, at.prototype.set = Ic;
    function St(C) {
      var x = -1, Y = C == null ? 0 : C.length;
      for (this.clear(); ++x < Y; ) {
        var ae = C[x];
        this.set(ae[0], ae[1]);
      }
    }
    function Nc() {
      this.size = 0, this.__data__ = {
        hash: new _t(),
        map: new (Pe || at)(),
        string: new _t()
      };
    }
    function Fc(C) {
      var x = br(this, C).delete(C);
      return this.size -= x ? 1 : 0, x;
    }
    function xc(C) {
      return br(this, C).get(C);
    }
    function Lc(C) {
      return br(this, C).has(C);
    }
    function $c(C, x) {
      var Y = br(this, C), ae = Y.size;
      return Y.set(C, x), this.size += Y.size == ae ? 0 : 1, this;
    }
    St.prototype.clear = Nc, St.prototype.delete = Fc, St.prototype.get = xc, St.prototype.has = Lc, St.prototype.set = $c;
    function Sr(C) {
      var x = -1, Y = C == null ? 0 : C.length;
      for (this.__data__ = new St(); ++x < Y; )
        this.add(C[x]);
    }
    function Uc(C) {
      return this.__data__.set(C, f), this;
    }
    function qc(C) {
      return this.__data__.has(C);
    }
    Sr.prototype.add = Sr.prototype.push = Uc, Sr.prototype.has = qc;
    function ct(C) {
      var x = this.__data__ = new at(C);
      this.size = x.size;
    }
    function kc() {
      this.__data__ = new at(), this.size = 0;
    }
    function Mc(C) {
      var x = this.__data__, Y = x.delete(C);
      return this.size = x.size, Y;
    }
    function Bc(C) {
      return this.__data__.get(C);
    }
    function jc(C) {
      return this.__data__.has(C);
    }
    function Hc(C, x) {
      var Y = this.__data__;
      if (Y instanceof at) {
        var ae = Y.__data__;
        if (!Pe || ae.length < d - 1)
          return ae.push([C, x]), this.size = ++Y.size, this;
        Y = this.__data__ = new St(ae);
      }
      return Y.set(C, x), this.size = Y.size, this;
    }
    ct.prototype.clear = kc, ct.prototype.delete = Mc, ct.prototype.get = Bc, ct.prototype.has = jc, ct.prototype.set = Hc;
    function Gc(C, x) {
      var Y = Rr(C), ae = !Y && sf(C), De = !Y && !ae && Zr(C), Se = !Y && !ae && !De && es(C), Fe = Y || ae || De || Se, Ue = Fe ? Me(C.length, String) : [], qe = Ue.length;
      for (var Ie in C)
        ve.call(C, Ie) && !(Fe && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ie == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        De && (Ie == "offset" || Ie == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Se && (Ie == "buffer" || Ie == "byteLength" || Ie == "byteOffset") || // Skip index properties.
        ef(Ie, qe))) && Ue.push(Ie);
      return Ue;
    }
    function Ar(C, x) {
      for (var Y = C.length; Y--; )
        if (Jo(C[Y][0], x))
          return Y;
      return -1;
    }
    function Wc(C, x, Y) {
      var ae = x(C);
      return Rr(C) ? ae : Le(ae, Y(C));
    }
    function Ht(C) {
      return C == null ? C === void 0 ? y : w : ee && ee in Object(C) ? Qc(C) : of(C);
    }
    function zo(C) {
      return Gt(C) && Ht(C) == i;
    }
    function Vo(C, x, Y, ae, De) {
      return C === x ? !0 : C == null || x == null || !Gt(C) && !Gt(x) ? C !== C && x !== x : zc(C, x, Y, ae, Vo, De);
    }
    function zc(C, x, Y, ae, De, Se) {
      var Fe = Rr(C), Ue = Rr(x), qe = Fe ? t : ft(C), Ie = Ue ? t : ft(x);
      qe = qe == i ? T : qe, Ie = Ie == i ? T : Ie;
      var Ve = qe == T, Ze = Ie == T, Be = qe == Ie;
      if (Be && Zr(C)) {
        if (!Zr(x))
          return !1;
        Fe = !0, Ve = !1;
      }
      if (Be && !Ve)
        return Se || (Se = new ct()), Fe || es(C) ? Yo(C, x, Y, ae, De, Se) : Jc(C, x, qe, Y, ae, De, Se);
      if (!(Y & u)) {
        var Je = Ve && ve.call(C, "__wrapped__"), Ke = Ze && ve.call(x, "__wrapped__");
        if (Je || Ke) {
          var dt = Je ? C.value() : C, lt = Ke ? x.value() : x;
          return Se || (Se = new ct()), De(dt, lt, Y, ae, Se);
        }
      }
      return Be ? (Se || (Se = new ct()), Kc(C, x, Y, ae, De, Se)) : !1;
    }
    function Vc(C) {
      if (!Zo(C) || rf(C))
        return !1;
      var x = Ko(C) ? $e : ie;
      return x.test(At(C));
    }
    function Yc(C) {
      return Gt(C) && Qo(C.length) && !!J[Ht(C)];
    }
    function Xc(C) {
      if (!nf(C))
        return he(C);
      var x = [];
      for (var Y in Object(C))
        ve.call(C, Y) && Y != "constructor" && x.push(Y);
      return x;
    }
    function Yo(C, x, Y, ae, De, Se) {
      var Fe = Y & u, Ue = C.length, qe = x.length;
      if (Ue != qe && !(Fe && qe > Ue))
        return !1;
      var Ie = Se.get(C);
      if (Ie && Se.get(x))
        return Ie == x;
      var Ve = -1, Ze = !0, Be = Y & n ? new Sr() : void 0;
      for (Se.set(C, x), Se.set(x, C); ++Ve < Ue; ) {
        var Je = C[Ve], Ke = x[Ve];
        if (ae)
          var dt = Fe ? ae(Ke, Je, Ve, x, C, Se) : ae(Je, Ke, Ve, C, x, Se);
        if (dt !== void 0) {
          if (dt)
            continue;
          Ze = !1;
          break;
        }
        if (Be) {
          if (!Oe(x, function(lt, bt) {
            if (!st(Be, bt) && (Je === lt || De(Je, lt, Y, ae, Se)))
              return Be.push(bt);
          })) {
            Ze = !1;
            break;
          }
        } else if (!(Je === Ke || De(Je, Ke, Y, ae, Se))) {
          Ze = !1;
          break;
        }
      }
      return Se.delete(C), Se.delete(x), Ze;
    }
    function Jc(C, x, Y, ae, De, Se, Fe) {
      switch (Y) {
        case L:
          if (C.byteLength != x.byteLength || C.byteOffset != x.byteOffset)
            return !1;
          C = C.buffer, x = x.buffer;
        case $:
          return !(C.byteLength != x.byteLength || !Se(new X(C), new X(x)));
        case c:
        case l:
        case m:
          return Jo(+C, +x);
        case s:
          return C.name == x.name && C.message == x.message;
        case U:
        case S:
          return C == x + "";
        case E:
          var Ue = B;
        case R:
          var qe = ae & u;
          if (Ue || (Ue = re), C.size != x.size && !qe)
            return !1;
          var Ie = Fe.get(C);
          if (Ie)
            return Ie == x;
          ae |= n, Fe.set(C, x);
          var Ve = Yo(Ue(C), Ue(x), ae, De, Se, Fe);
          return Fe.delete(C), Ve;
        case b:
          if (Qr)
            return Qr.call(C) == Qr.call(x);
      }
      return !1;
    }
    function Kc(C, x, Y, ae, De, Se) {
      var Fe = Y & u, Ue = Xo(C), qe = Ue.length, Ie = Xo(x), Ve = Ie.length;
      if (qe != Ve && !Fe)
        return !1;
      for (var Ze = qe; Ze--; ) {
        var Be = Ue[Ze];
        if (!(Fe ? Be in x : ve.call(x, Be)))
          return !1;
      }
      var Je = Se.get(C);
      if (Je && Se.get(x))
        return Je == x;
      var Ke = !0;
      Se.set(C, x), Se.set(x, C);
      for (var dt = Fe; ++Ze < qe; ) {
        Be = Ue[Ze];
        var lt = C[Be], bt = x[Be];
        if (ae)
          var ts = Fe ? ae(bt, lt, Be, x, C, Se) : ae(lt, bt, Be, C, x, Se);
        if (!(ts === void 0 ? lt === bt || De(lt, bt, Y, ae, Se) : ts)) {
          Ke = !1;
          break;
        }
        dt || (dt = Be == "constructor");
      }
      if (Ke && !dt) {
        var Tr = C.constructor, Cr = x.constructor;
        Tr != Cr && "constructor" in C && "constructor" in x && !(typeof Tr == "function" && Tr instanceof Tr && typeof Cr == "function" && Cr instanceof Cr) && (Ke = !1);
      }
      return Se.delete(C), Se.delete(x), Ke;
    }
    function Xo(C) {
      return Wc(C, uf, Zc);
    }
    function br(C, x) {
      var Y = C.__data__;
      return tf(x) ? Y[typeof x == "string" ? "string" : "hash"] : Y.map;
    }
    function Nt(C, x) {
      var Y = a(C, x);
      return Vc(Y) ? Y : void 0;
    }
    function Qc(C) {
      var x = ve.call(C, ee), Y = C[ee];
      try {
        C[ee] = void 0;
        var ae = !0;
      } catch {
      }
      var De = de.call(C);
      return ae && (x ? C[ee] = Y : delete C[ee]), De;
    }
    var Zc = fe ? function(C) {
      return C == null ? [] : (C = Object(C), Ee(fe(C), function(x) {
        return V.call(C, x);
      }));
    } : cf, ft = Ht;
    (we && ft(new we(new ArrayBuffer(1))) != L || Pe && ft(new Pe()) != E || Ne && ft(Ne.resolve()) != O || Ce && ft(new Ce()) != R || It && ft(new It()) != M) && (ft = function(C) {
      var x = Ht(C), Y = x == T ? C.constructor : void 0, ae = Y ? At(Y) : "";
      if (ae)
        switch (ae) {
          case wt:
            return L;
          case yc:
            return E;
          case Ec:
            return O;
          case wc:
            return R;
          case _c:
            return M;
        }
      return x;
    });
    function ef(C, x) {
      return x = x ?? e, !!x && (typeof C == "number" || Re.test(C)) && C > -1 && C % 1 == 0 && C < x;
    }
    function tf(C) {
      var x = typeof C;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? C !== "__proto__" : C === null;
    }
    function rf(C) {
      return !!Te && Te in C;
    }
    function nf(C) {
      var x = C && C.constructor, Y = typeof x == "function" && x.prototype || Z;
      return C === Y;
    }
    function of(C) {
      return de.call(C);
    }
    function At(C) {
      if (C != null) {
        try {
          return ge.call(C);
        } catch {
        }
        try {
          return C + "";
        } catch {
        }
      }
      return "";
    }
    function Jo(C, x) {
      return C === x || C !== C && x !== x;
    }
    var sf = zo(/* @__PURE__ */ function() {
      return arguments;
    }()) ? zo : function(C) {
      return Gt(C) && ve.call(C, "callee") && !V.call(C, "callee");
    }, Rr = Array.isArray;
    function af(C) {
      return C != null && Qo(C.length) && !Ko(C);
    }
    var Zr = se || ff;
    function lf(C, x) {
      return Vo(C, x);
    }
    function Ko(C) {
      if (!Zo(C))
        return !1;
      var x = Ht(C);
      return x == p || x == g || x == r || x == P;
    }
    function Qo(C) {
      return typeof C == "number" && C > -1 && C % 1 == 0 && C <= e;
    }
    function Zo(C) {
      var x = typeof C;
      return C != null && (x == "object" || x == "function");
    }
    function Gt(C) {
      return C != null && typeof C == "object";
    }
    var es = _e ? Et(_e) : Yc;
    function uf(C) {
      return af(C) ? Gc(C) : Xc(C);
    }
    function cf() {
      return [];
    }
    function ff() {
      return !1;
    }
    o.exports = lf;
  }(hr, hr.exports)), hr.exports;
}
var wl;
function Id() {
  if (wl) return xt;
  wl = 1, Object.defineProperty(xt, "__esModule", { value: !0 }), xt.DownloadedUpdateHelper = void 0, xt.createTempUpdateFile = i;
  const o = pr, h = Ye, d = Dd(), f = /* @__PURE__ */ vt(), u = be;
  let n = class {
    constructor(r) {
      this.cacheDir = r, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
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
    async validateDownloadedPath(r, c, l, s) {
      if (this.versionInfo != null && this.file === r && this.fileInfo != null)
        return d(this.versionInfo, c) && d(this.fileInfo.info, l.info) && await (0, f.pathExists)(r) ? r : null;
      const p = await this.getValidCachedUpdateFile(l, s);
      return p === null ? null : (s.info(`Update has already been downloaded to ${r}).`), this._file = p, p);
    }
    async setDownloadedFile(r, c, l, s, p, g) {
      this._file = r, this._packageFile = c, this.versionInfo = l, this.fileInfo = s, this._downloadedFileInfo = {
        fileName: p,
        sha512: s.info.sha512,
        isAdminRightsRequired: s.info.isAdminRightsRequired === !0
      }, g && await (0, f.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, f.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(r, c) {
      const l = this.getUpdateInfoFile();
      if (!await (0, f.pathExists)(l))
        return null;
      let p;
      try {
        p = await (0, f.readJson)(l);
      } catch (w) {
        let T = "No cached update info available";
        return w.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), T += ` (error on read: ${w.message})`), c.info(T), null;
      }
      if (!((p == null ? void 0 : p.fileName) !== null))
        return c.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (r.info.sha512 !== p.sha512)
        return c.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p.sha512}, expected: ${r.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const E = u.join(this.cacheDirForPendingUpdate, p.fileName);
      if (!await (0, f.pathExists)(E))
        return c.info("Cached update file doesn't exist"), null;
      const m = await e(E);
      return r.info.sha512 !== m ? (c.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m}, expected: ${r.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = p, E);
    }
    getUpdateInfoFile() {
      return u.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  xt.DownloadedUpdateHelper = n;
  function e(t, r = "sha512", c = "base64", l) {
    return new Promise((s, p) => {
      const g = (0, o.createHash)(r);
      g.on("error", p).setEncoding(c), (0, h.createReadStream)(t, {
        ...l,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", p).on("end", () => {
        g.end(), s(g.read());
      }).pipe(g, { end: !1 });
    });
  }
  async function i(t, r, c) {
    let l = 0, s = u.join(r, t);
    for (let p = 0; p < 3; p++)
      try {
        return await (0, f.unlink)(s), s;
      } catch (g) {
        if (g.code === "ENOENT")
          return s;
        c.warn(`Error on remove temp update file: ${g}`), s = u.join(r, `${l++}-${t}`);
      }
    return s;
  }
  return xt;
}
var Jt = {}, kr = {}, _l;
function Nd() {
  if (_l) return kr;
  _l = 1, Object.defineProperty(kr, "__esModule", { value: !0 }), kr.getAppCacheDir = d;
  const o = be, h = gt;
  function d() {
    const f = (0, h.homedir)();
    let u;
    return process.platform === "win32" ? u = process.env.LOCALAPPDATA || o.join(f, "AppData", "Local") : process.platform === "darwin" ? u = o.join(f, "Library", "Caches") : u = process.env.XDG_CACHE_HOME || o.join(f, ".cache"), u;
  }
  return kr;
}
var Sl;
function Fd() {
  if (Sl) return Jt;
  Sl = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.ElectronAppAdapter = void 0;
  const o = be, h = Nd();
  let d = class {
    constructor(u = mt.app) {
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
      return this.isPackaged ? o.join(process.resourcesPath, "app-update.yml") : o.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, h.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(u) {
      this.app.once("quit", (n, e) => u(e));
    }
  };
  return Jt.ElectronAppAdapter = d, Jt;
}
var Qi = {}, Al;
function xd() {
  return Al || (Al = 1, function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.ElectronHttpExecutor = o.NET_SESSION_NAME = void 0, o.getNetSession = d;
    const h = ke();
    o.NET_SESSION_NAME = "electron-updater";
    function d() {
      return mt.session.fromPartition(o.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class f extends h.HttpExecutor {
      constructor(n) {
        super(), this.proxyLoginCallback = n, this.cachedSession = null;
      }
      async download(n, e, i) {
        return await i.cancellationToken.createPromise((t, r, c) => {
          const l = {
            headers: i.headers || void 0,
            redirect: "manual"
          };
          (0, h.configureRequestUrl)(n, l), (0, h.configureRequestOptions)(l), this.doDownload(l, {
            destination: e,
            options: i,
            onCancel: c,
            callback: (s) => {
              s == null ? t(e) : r(s);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(n, e) {
        n.headers && n.headers.Host && (n.host = n.headers.Host, delete n.headers.Host), this.cachedSession == null && (this.cachedSession = d());
        const i = mt.net.request({
          ...n,
          session: this.cachedSession
        });
        return i.on("response", e), this.proxyLoginCallback != null && i.on("login", this.proxyLoginCallback), i;
      }
      addRedirectHandlers(n, e, i, t, r) {
        n.on("redirect", (c, l, s) => {
          n.abort(), t > this.maxRedirects ? i(this.createMaxRedirectError()) : r(h.HttpExecutor.prepareRedirectUrlOptions(s, e));
        });
      }
    }
    o.ElectronHttpExecutor = f;
  }(Qi)), Qi;
}
var Kt = {}, Ot = {}, Zi, bl;
function Ld() {
  if (bl) return Zi;
  bl = 1;
  var o = 1 / 0, h = "[object Symbol]", d = /[\\^$.*+?()[\]{}|]/g, f = RegExp(d.source), u = typeof et == "object" && et && et.Object === Object && et, n = typeof self == "object" && self && self.Object === Object && self, e = u || n || Function("return this")(), i = Object.prototype, t = i.toString, r = e.Symbol, c = r ? r.prototype : void 0, l = c ? c.toString : void 0;
  function s(w) {
    if (typeof w == "string")
      return w;
    if (g(w))
      return l ? l.call(w) : "";
    var T = w + "";
    return T == "0" && 1 / w == -o ? "-0" : T;
  }
  function p(w) {
    return !!w && typeof w == "object";
  }
  function g(w) {
    return typeof w == "symbol" || p(w) && t.call(w) == h;
  }
  function E(w) {
    return w == null ? "" : s(w);
  }
  function m(w) {
    return w = E(w), w && f.test(w) ? w.replace(d, "\\$&") : w;
  }
  return Zi = m, Zi;
}
var Rl;
function Dt() {
  if (Rl) return Ot;
  Rl = 1, Object.defineProperty(Ot, "__esModule", { value: !0 }), Ot.newBaseUrl = d, Ot.newUrlFromBase = f, Ot.getChannelFilename = u, Ot.blockmapFiles = n;
  const o = qt, h = Ld();
  function d(e) {
    const i = new o.URL(e);
    return i.pathname.endsWith("/") || (i.pathname += "/"), i;
  }
  function f(e, i, t = !1) {
    const r = new o.URL(e, i), c = i.search;
    return c != null && c.length !== 0 ? r.search = c : t && (r.search = `noCache=${Date.now().toString(32)}`), r;
  }
  function u(e) {
    return `${e}.yml`;
  }
  function n(e, i, t) {
    const r = f(`${e.pathname}.blockmap`, e);
    return [f(`${e.pathname.replace(new RegExp(h(t), "g"), i)}.blockmap`, e), r];
  }
  return Ot;
}
var ut = {}, Tl;
function nt() {
  if (Tl) return ut;
  Tl = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.Provider = void 0, ut.findFile = u, ut.parseUpdateInfo = n, ut.getFileList = e, ut.resolveFiles = i;
  const o = ke(), h = Lo(), d = Dt();
  let f = class {
    constructor(r) {
      this.runtimeOptions = r, this.requestHeaders = null, this.executor = r.executor;
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const r = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (r === "x64" ? "" : `-${r}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(r) {
      return `${r}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(r) {
      this.requestHeaders = r;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(r, c, l) {
      return this.executor.request(this.createRequestOptions(r, c), l);
    }
    createRequestOptions(r, c) {
      const l = {};
      return this.requestHeaders == null ? c != null && (l.headers = c) : l.headers = c == null ? this.requestHeaders : { ...this.requestHeaders, ...c }, (0, o.configureRequestUrl)(r, l), l;
    }
  };
  ut.Provider = f;
  function u(t, r, c) {
    if (t.length === 0)
      throw (0, o.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const l = t.find((s) => s.url.pathname.toLowerCase().endsWith(`.${r}`));
    return l ?? (c == null ? t[0] : t.find((s) => !c.some((p) => s.url.pathname.toLowerCase().endsWith(`.${p}`))));
  }
  function n(t, r, c) {
    if (t == null)
      throw (0, o.newError)(`Cannot parse update info from ${r} in the latest release artifacts (${c}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let l;
    try {
      l = (0, h.load)(t);
    } catch (s) {
      throw (0, o.newError)(`Cannot parse update info from ${r} in the latest release artifacts (${c}): ${s.stack || s.message}, rawData: ${t}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return l;
  }
  function e(t) {
    const r = t.files;
    if (r != null && r.length > 0)
      return r;
    if (t.path != null)
      return [
        {
          url: t.path,
          sha2: t.sha2,
          sha512: t.sha512
        }
      ];
    throw (0, o.newError)(`No files provided: ${(0, o.safeStringifyJson)(t)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function i(t, r, c = (l) => l) {
    const s = e(t).map((E) => {
      if (E.sha2 == null && E.sha512 == null)
        throw (0, o.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, o.safeStringifyJson)(E)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, d.newUrlFromBase)(c(E.url), r),
        info: E
      };
    }), p = t.packages, g = p == null ? null : p[process.arch] || p.ia32;
    return g != null && (s[0].packageInfo = {
      ...g,
      path: (0, d.newUrlFromBase)(c(g.path), r).href
    }), s;
  }
  return ut;
}
var Cl;
function sc() {
  if (Cl) return Kt;
  Cl = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.GenericProvider = void 0;
  const o = ke(), h = Dt(), d = nt();
  let f = class extends d.Provider {
    constructor(n, e, i) {
      super(i), this.configuration = n, this.updater = e, this.baseUrl = (0, h.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const n = this.updater.channel || this.configuration.channel;
      return n == null ? this.getDefaultChannelName() : this.getCustomChannelName(n);
    }
    async getLatestVersion() {
      const n = (0, h.getChannelFilename)(this.channel), e = (0, h.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let i = 0; ; i++)
        try {
          return (0, d.parseUpdateInfo)(await this.httpRequest(e), n, e);
        } catch (t) {
          if (t instanceof o.HttpError && t.statusCode === 404)
            throw (0, o.newError)(`Cannot find channel "${n}" update info: ${t.stack || t.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (t.code === "ECONNREFUSED" && i < 3) {
            await new Promise((r, c) => {
              try {
                setTimeout(r, 1e3 * i);
              } catch (l) {
                c(l);
              }
            });
            continue;
          }
          throw t;
        }
    }
    resolveFiles(n) {
      return (0, d.resolveFiles)(n, this.baseUrl);
    }
  };
  return Kt.GenericProvider = f, Kt;
}
var Qt = {}, Zt = {}, Ol;
function $d() {
  if (Ol) return Zt;
  Ol = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.BitbucketProvider = void 0;
  const o = ke(), h = Dt(), d = nt();
  let f = class extends d.Provider {
    constructor(n, e, i) {
      super({
        ...i,
        isUseMultipleRangeRequest: !1
      }), this.configuration = n, this.updater = e;
      const { owner: t, slug: r } = n;
      this.baseUrl = (0, h.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${t}/${r}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const n = new o.CancellationToken(), e = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), i = (0, h.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const t = await this.httpRequest(i, void 0, n);
        return (0, d.parseUpdateInfo)(t, e, i);
      } catch (t) {
        throw (0, o.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${t.stack || t.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(n) {
      return (0, d.resolveFiles)(n, this.baseUrl);
    }
    toString() {
      const { owner: n, slug: e } = this.configuration;
      return `Bitbucket (owner: ${n}, slug: ${e}, channel: ${this.channel})`;
    }
  };
  return Zt.BitbucketProvider = f, Zt;
}
var pt = {}, Pl;
function ac() {
  if (Pl) return pt;
  Pl = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.GitHubProvider = pt.BaseGitHubProvider = void 0, pt.computeReleaseNotes = r;
  const o = ke(), h = oc(), d = qt, f = Dt(), u = nt(), n = /\/tag\/([^/]+)$/;
  class e extends u.Provider {
    constructor(l, s, p) {
      super({
        ...p,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = l, this.baseUrl = (0, f.newBaseUrl)((0, o.githubUrl)(l, s));
      const g = s === "github.com" ? "api.github.com" : s;
      this.baseApiUrl = (0, f.newBaseUrl)((0, o.githubUrl)(l, g));
    }
    computeGithubBasePath(l) {
      const s = this.options.host;
      return s && !["github.com", "api.github.com"].includes(s) ? `/api/v3${l}` : l;
    }
  }
  pt.BaseGitHubProvider = e;
  let i = class extends e {
    constructor(l, s, p) {
      super(l, "github.com", p), this.options = l, this.updater = s;
    }
    get channel() {
      const l = this.updater.channel || this.options.channel;
      return l == null ? this.getDefaultChannelName() : this.getCustomChannelName(l);
    }
    async getLatestVersion() {
      var l, s, p, g, E;
      const m = new o.CancellationToken(), w = await this.httpRequest((0, f.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, m), T = (0, o.parseXml)(w);
      let O = T.element("entry", !1, "No published versions on GitHub"), P = null;
      try {
        if (this.updater.allowPrerelease) {
          const M = ((l = this.updater) === null || l === void 0 ? void 0 : l.channel) || ((s = h.prerelease(this.updater.currentVersion)) === null || s === void 0 ? void 0 : s[0]) || null;
          if (M === null)
            P = n.exec(O.element("link").attribute("href"))[1];
          else
            for (const $ of T.getElements("entry")) {
              const L = n.exec($.element("link").attribute("href"));
              if (L === null)
                continue;
              const k = L[1], I = ((p = h.prerelease(k)) === null || p === void 0 ? void 0 : p[0]) || null, D = !M || ["alpha", "beta"].includes(M), F = I !== null && !["alpha", "beta"].includes(String(I));
              if (D && !F && !(M === "beta" && I === "alpha")) {
                P = k;
                break;
              }
              if (I && I === M) {
                P = k;
                break;
              }
            }
        } else {
          P = await this.getLatestTagName(m);
          for (const M of T.getElements("entry"))
            if (n.exec(M.element("link").attribute("href"))[1] === P) {
              O = M;
              break;
            }
        }
      } catch (M) {
        throw (0, o.newError)(`Cannot parse releases feed: ${M.stack || M.message},
XML:
${w}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (P == null)
        throw (0, o.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let U, R = "", S = "";
      const b = async (M) => {
        R = (0, f.getChannelFilename)(M), S = (0, f.newUrlFromBase)(this.getBaseDownloadPath(String(P), R), this.baseUrl);
        const $ = this.createRequestOptions(S);
        try {
          return await this.executor.request($, m);
        } catch (L) {
          throw L instanceof o.HttpError && L.statusCode === 404 ? (0, o.newError)(`Cannot find ${R} in the latest release artifacts (${S}): ${L.stack || L.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : L;
        }
      };
      try {
        let M = this.channel;
        this.updater.allowPrerelease && (!((g = h.prerelease(P)) === null || g === void 0) && g[0]) && (M = this.getCustomChannelName(String((E = h.prerelease(P)) === null || E === void 0 ? void 0 : E[0]))), U = await b(M);
      } catch (M) {
        if (this.updater.allowPrerelease)
          U = await b(this.getDefaultChannelName());
        else
          throw M;
      }
      const y = (0, u.parseUpdateInfo)(U, R, S);
      return y.releaseName == null && (y.releaseName = O.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = r(this.updater.currentVersion, this.updater.fullChangelog, T, O)), {
        tag: P,
        ...y
      };
    }
    async getLatestTagName(l) {
      const s = this.options, p = s.host == null || s.host === "github.com" ? (0, f.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new d.URL(`${this.computeGithubBasePath(`/repos/${s.owner}/${s.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const g = await this.httpRequest(p, { Accept: "application/json" }, l);
        return g == null ? null : JSON.parse(g).tag_name;
      } catch (g) {
        throw (0, o.newError)(`Unable to find latest version on GitHub (${p}), please ensure a production release exists: ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(l) {
      return (0, u.resolveFiles)(l, this.baseUrl, (s) => this.getBaseDownloadPath(l.tag, s.replace(/ /g, "-")));
    }
    getBaseDownloadPath(l, s) {
      return `${this.basePath}/download/${l}/${s}`;
    }
  };
  pt.GitHubProvider = i;
  function t(c) {
    const l = c.elementValueOrEmpty("content");
    return l === "No content." ? "" : l;
  }
  function r(c, l, s, p) {
    if (!l)
      return t(p);
    const g = [];
    for (const E of s.getElements("entry")) {
      const m = /\/tag\/v?([^/]+)$/.exec(E.element("link").attribute("href"))[1];
      h.lt(c, m) && g.push({
        version: m,
        note: t(E)
      });
    }
    return g.sort((E, m) => h.rcompare(E.version, m.version));
  }
  return pt;
}
var er = {}, Dl;
function Ud() {
  if (Dl) return er;
  Dl = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.KeygenProvider = void 0;
  const o = ke(), h = Dt(), d = nt();
  let f = class extends d.Provider {
    constructor(n, e, i) {
      super({
        ...i,
        isUseMultipleRangeRequest: !1
      }), this.configuration = n, this.updater = e, this.baseUrl = (0, h.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const n = new o.CancellationToken(), e = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), i = (0, h.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const t = await this.httpRequest(i, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, n);
        return (0, d.parseUpdateInfo)(t, e, i);
      } catch (t) {
        throw (0, o.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${t.stack || t.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(n) {
      return (0, d.resolveFiles)(n, this.baseUrl);
    }
    toString() {
      const { account: n, product: e, platform: i } = this.configuration;
      return `Keygen (account: ${n}, product: ${e}, platform: ${i}, channel: ${this.channel})`;
    }
  };
  return er.KeygenProvider = f, er;
}
var tr = {}, Il;
function qd() {
  if (Il) return tr;
  Il = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.PrivateGitHubProvider = void 0;
  const o = ke(), h = Lo(), d = be, f = qt, u = Dt(), n = ac(), e = nt();
  let i = class extends n.BaseGitHubProvider {
    constructor(r, c, l, s) {
      super(r, "api.github.com", s), this.updater = c, this.token = l;
    }
    createRequestOptions(r, c) {
      const l = super.createRequestOptions(r, c);
      return l.redirect = "manual", l;
    }
    async getLatestVersion() {
      const r = new o.CancellationToken(), c = (0, u.getChannelFilename)(this.getDefaultChannelName()), l = await this.getLatestVersionInfo(r), s = l.assets.find((E) => E.name === c);
      if (s == null)
        throw (0, o.newError)(`Cannot find ${c} in the release ${l.html_url || l.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const p = new f.URL(s.url);
      let g;
      try {
        g = (0, h.load)(await this.httpRequest(p, this.configureHeaders("application/octet-stream"), r));
      } catch (E) {
        throw E instanceof o.HttpError && E.statusCode === 404 ? (0, o.newError)(`Cannot find ${c} in the latest release artifacts (${p}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
      return g.assets = l.assets, g;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(r) {
      return {
        accept: r,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(r) {
      const c = this.updater.allowPrerelease;
      let l = this.basePath;
      c || (l = `${l}/latest`);
      const s = (0, u.newUrlFromBase)(l, this.baseUrl);
      try {
        const p = JSON.parse(await this.httpRequest(s, this.configureHeaders("application/vnd.github.v3+json"), r));
        return c ? p.find((g) => g.prerelease) || p[0] : p;
      } catch (p) {
        throw (0, o.newError)(`Unable to find latest version on GitHub (${s}), please ensure a production release exists: ${p.stack || p.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(r) {
      return (0, e.getFileList)(r).map((c) => {
        const l = d.posix.basename(c.url).replace(/ /g, "-"), s = r.assets.find((p) => p != null && p.name === l);
        if (s == null)
          throw (0, o.newError)(`Cannot find asset "${l}" in: ${JSON.stringify(r.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new f.URL(s.url),
          info: c
        };
      });
    }
  };
  return tr.PrivateGitHubProvider = i, tr;
}
var Nl;
function kd() {
  if (Nl) return Qt;
  Nl = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.isUrlProbablySupportMultiRangeRequests = e, Qt.createClient = i;
  const o = ke(), h = $d(), d = sc(), f = ac(), u = Ud(), n = qd();
  function e(t) {
    return !t.includes("s3.amazonaws.com");
  }
  function i(t, r, c) {
    if (typeof t == "string")
      throw (0, o.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const l = t.provider;
    switch (l) {
      case "github": {
        const s = t, p = (s.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || s.token;
        return p == null ? new f.GitHubProvider(s, r, c) : new n.PrivateGitHubProvider(s, r, p, c);
      }
      case "bitbucket":
        return new h.BitbucketProvider(t, r, c);
      case "keygen":
        return new u.KeygenProvider(t, r, c);
      case "s3":
      case "spaces":
        return new d.GenericProvider({
          provider: "generic",
          url: (0, o.getS3LikeProviderBaseUrl)(t),
          channel: t.channel || null
        }, r, {
          ...c,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const s = t;
        return new d.GenericProvider(s, r, {
          ...c,
          isUseMultipleRangeRequest: s.useMultipleRangeRequest !== !1 && e(s.url)
        });
      }
      case "custom": {
        const s = t, p = s.updateProvider;
        if (!p)
          throw (0, o.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new p(s, r, c);
      }
      default:
        throw (0, o.newError)(`Unsupported provider: ${l}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return Qt;
}
var rr = {}, nr = {}, Lt = {}, $t = {}, Fl;
function jo() {
  if (Fl) return $t;
  Fl = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.OperationKind = void 0, $t.computeOperations = h;
  var o;
  (function(e) {
    e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
  })(o || ($t.OperationKind = o = {}));
  function h(e, i, t) {
    const r = n(e.files), c = n(i.files);
    let l = null;
    const s = i.files[0], p = [], g = s.name, E = r.get(g);
    if (E == null)
      throw new Error(`no file ${g} in old blockmap`);
    const m = c.get(g);
    let w = 0;
    const { checksumToOffset: T, checksumToOldSize: O } = u(r.get(g), E.offset, t);
    let P = s.offset;
    for (let U = 0; U < m.checksums.length; P += m.sizes[U], U++) {
      const R = m.sizes[U], S = m.checksums[U];
      let b = T.get(S);
      b != null && O.get(S) !== R && (t.warn(`Checksum ("${S}") matches, but size differs (old: ${O.get(S)}, new: ${R})`), b = void 0), b === void 0 ? (w++, l != null && l.kind === o.DOWNLOAD && l.end === P ? l.end += R : (l = {
        kind: o.DOWNLOAD,
        start: P,
        end: P + R
        // oldBlocks: null,
      }, f(l, p, S, U))) : l != null && l.kind === o.COPY && l.end === b ? l.end += R : (l = {
        kind: o.COPY,
        start: b,
        end: b + R
        // oldBlocks: [checksum]
      }, f(l, p, S, U));
    }
    return w > 0 && t.info(`File${s.name === "file" ? "" : " " + s.name} has ${w} changed blocks`), p;
  }
  const d = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function f(e, i, t, r) {
    if (d && i.length !== 0) {
      const c = i[i.length - 1];
      if (c.kind === e.kind && e.start < c.end && e.start > c.start) {
        const l = [c.start, c.end, e.start, e.end].reduce((s, p) => s < p ? s : p);
        throw new Error(`operation (block index: ${r}, checksum: ${t}, kind: ${o[e.kind]}) overlaps previous operation (checksum: ${t}):
abs: ${c.start} until ${c.end} and ${e.start} until ${e.end}
rel: ${c.start - l} until ${c.end - l} and ${e.start - l} until ${e.end - l}`);
      }
    }
    i.push(e);
  }
  function u(e, i, t) {
    const r = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
    let l = i;
    for (let s = 0; s < e.checksums.length; s++) {
      const p = e.checksums[s], g = e.sizes[s], E = c.get(p);
      if (E === void 0)
        r.set(p, l), c.set(p, g);
      else if (t.debug != null) {
        const m = E === g ? "(same size)" : `(size: ${E}, this size: ${g})`;
        t.debug(`${p} duplicated in blockmap ${m}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      l += g;
    }
    return { checksumToOffset: r, checksumToOldSize: c };
  }
  function n(e) {
    const i = /* @__PURE__ */ new Map();
    for (const t of e)
      i.set(t.name, t);
    return i;
  }
  return $t;
}
var xl;
function lc() {
  if (xl) return Lt;
  xl = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.DataSplitter = void 0, Lt.copyData = e;
  const o = ke(), h = Ye, d = mr, f = jo(), u = Buffer.from(`\r
\r
`);
  var n;
  (function(t) {
    t[t.INIT = 0] = "INIT", t[t.HEADER = 1] = "HEADER", t[t.BODY = 2] = "BODY";
  })(n || (n = {}));
  function e(t, r, c, l, s) {
    const p = (0, h.createReadStream)("", {
      fd: c,
      autoClose: !1,
      start: t.start,
      // end is inclusive
      end: t.end - 1
    });
    p.on("error", l), p.once("end", s), p.pipe(r, {
      end: !1
    });
  }
  let i = class extends d.Writable {
    constructor(r, c, l, s, p, g) {
      super(), this.out = r, this.options = c, this.partIndexToTaskIndex = l, this.partIndexToLength = p, this.finishHandler = g, this.partIndex = -1, this.headerListBuffer = null, this.readState = n.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = s.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(r, c, l) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${r.length} bytes`);
        return;
      }
      this.handleData(r).then(l).catch(l);
    }
    async handleData(r) {
      let c = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, o.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const l = Math.min(this.ignoreByteCount, r.length);
        this.ignoreByteCount -= l, c = l;
      } else if (this.remainingPartDataCount > 0) {
        const l = Math.min(this.remainingPartDataCount, r.length);
        this.remainingPartDataCount -= l, await this.processPartData(r, 0, l), c = l;
      }
      if (c !== r.length) {
        if (this.readState === n.HEADER) {
          const l = this.searchHeaderListEnd(r, c);
          if (l === -1)
            return;
          c = l, this.readState = n.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === n.BODY)
            this.readState = n.INIT;
          else {
            this.partIndex++;
            let g = this.partIndexToTaskIndex.get(this.partIndex);
            if (g == null)
              if (this.isFinished)
                g = this.options.end;
              else
                throw (0, o.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const E = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (E < g)
              await this.copyExistingData(E, g);
            else if (E > g)
              throw (0, o.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (c = this.searchHeaderListEnd(r, c), c === -1) {
              this.readState = n.HEADER;
              return;
            }
          }
          const l = this.partIndexToLength[this.partIndex], s = c + l, p = Math.min(s, r.length);
          if (await this.processPartStarted(r, c, p), this.remainingPartDataCount = l - (p - c), this.remainingPartDataCount > 0)
            return;
          if (c = s + this.boundaryLength, c >= r.length) {
            this.ignoreByteCount = this.boundaryLength - (r.length - s);
            return;
          }
        }
      }
    }
    copyExistingData(r, c) {
      return new Promise((l, s) => {
        const p = () => {
          if (r === c) {
            l();
            return;
          }
          const g = this.options.tasks[r];
          if (g.kind !== f.OperationKind.COPY) {
            s(new Error("Task kind must be COPY"));
            return;
          }
          e(g, this.out, this.options.oldFileFd, s, () => {
            r++, p();
          });
        };
        p();
      });
    }
    searchHeaderListEnd(r, c) {
      const l = r.indexOf(u, c);
      if (l !== -1)
        return l + u.length;
      const s = c === 0 ? r : r.slice(c);
      return this.headerListBuffer == null ? this.headerListBuffer = s : this.headerListBuffer = Buffer.concat([this.headerListBuffer, s]), -1;
    }
    onPartEnd() {
      const r = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== r)
        throw (0, o.newError)(`Expected length: ${r} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(r, c, l) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(r, c, l);
    }
    processPartData(r, c, l) {
      this.actualPartLength += l - c;
      const s = this.out;
      return s.write(c === 0 && r.length === l ? r : r.slice(c, l)) ? Promise.resolve() : new Promise((p, g) => {
        s.on("error", g), s.once("drain", () => {
          s.removeListener("error", g), p();
        });
      });
    }
  };
  return Lt.DataSplitter = i, Lt;
}
var ir = {}, Ll;
function Md() {
  if (Ll) return ir;
  Ll = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.executeTasksUsingMultipleRangeRequests = f, ir.checkIsRangesSupported = n;
  const o = ke(), h = lc(), d = jo();
  function f(e, i, t, r, c) {
    const l = (s) => {
      if (s >= i.length) {
        e.fileMetadataBuffer != null && t.write(e.fileMetadataBuffer), t.end();
        return;
      }
      const p = s + 1e3;
      u(e, {
        tasks: i,
        start: s,
        end: Math.min(i.length, p),
        oldFileFd: r
      }, t, () => l(p), c);
    };
    return l;
  }
  function u(e, i, t, r, c) {
    let l = "bytes=", s = 0;
    const p = /* @__PURE__ */ new Map(), g = [];
    for (let w = i.start; w < i.end; w++) {
      const T = i.tasks[w];
      T.kind === d.OperationKind.DOWNLOAD && (l += `${T.start}-${T.end - 1}, `, p.set(s, w), s++, g.push(T.end - T.start));
    }
    if (s <= 1) {
      const w = (T) => {
        if (T >= i.end) {
          r();
          return;
        }
        const O = i.tasks[T++];
        if (O.kind === d.OperationKind.COPY)
          (0, h.copyData)(O, t, i.oldFileFd, c, () => w(T));
        else {
          const P = e.createRequestOptions();
          P.headers.Range = `bytes=${O.start}-${O.end - 1}`;
          const U = e.httpExecutor.createRequest(P, (R) => {
            n(R, c) && (R.pipe(t, {
              end: !1
            }), R.once("end", () => w(T)));
          });
          e.httpExecutor.addErrorAndTimeoutHandlers(U, c), U.end();
        }
      };
      w(i.start);
      return;
    }
    const E = e.createRequestOptions();
    E.headers.Range = l.substring(0, l.length - 2);
    const m = e.httpExecutor.createRequest(E, (w) => {
      if (!n(w, c))
        return;
      const T = (0, o.safeGetHeader)(w, "content-type"), O = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(T);
      if (O == null) {
        c(new Error(`Content-Type "multipart/byteranges" is expected, but got "${T}"`));
        return;
      }
      const P = new h.DataSplitter(t, i, p, O[1] || O[2], g, r);
      P.on("error", c), w.pipe(P), w.on("end", () => {
        setTimeout(() => {
          m.abort(), c(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    e.httpExecutor.addErrorAndTimeoutHandlers(m, c), m.end();
  }
  function n(e, i) {
    if (e.statusCode >= 400)
      return i((0, o.createHttpError)(e)), !1;
    if (e.statusCode !== 206) {
      const t = (0, o.safeGetHeader)(e, "accept-ranges");
      if (t == null || t === "none")
        return i(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
    }
    return !0;
  }
  return ir;
}
var or = {}, $l;
function Bd() {
  if ($l) return or;
  $l = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.ProgressDifferentialDownloadCallbackTransform = void 0;
  const o = mr;
  var h;
  (function(f) {
    f[f.COPY = 0] = "COPY", f[f.DOWNLOAD = 1] = "DOWNLOAD";
  })(h || (h = {}));
  let d = class extends o.Transform {
    constructor(u, n, e) {
      super(), this.progressDifferentialDownloadInfo = u, this.cancellationToken = n, this.onProgress = e, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = h.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(u, n, e) {
      if (this.cancellationToken.cancelled) {
        e(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == h.COPY) {
        e(null, u);
        return;
      }
      this.transferred += u.length, this.delta += u.length;
      const i = Date.now();
      i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
      }), this.delta = 0), e(null, u);
    }
    beginFileCopy() {
      this.operationType = h.COPY;
    }
    beginRangeDownload() {
      this.operationType = h.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
  return or.ProgressDifferentialDownloadCallbackTransform = d, or;
}
var Ul;
function uc() {
  if (Ul) return nr;
  Ul = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.DifferentialDownloader = void 0;
  const o = ke(), h = /* @__PURE__ */ vt(), d = Ye, f = lc(), u = qt, n = jo(), e = Md(), i = Bd();
  let t = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(s, p, g) {
      this.blockAwareFileInfo = s, this.httpExecutor = p, this.options = g, this.fileMetadataBuffer = null, this.logger = g.logger;
    }
    createRequestOptions() {
      const s = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, o.configureRequestUrl)(this.options.newUrl, s), (0, o.configureRequestOptions)(s), s;
    }
    doDownload(s, p) {
      if (s.version !== p.version)
        throw new Error(`version is different (${s.version} - ${p.version}), full download is required`);
      const g = this.logger, E = (0, n.computeOperations)(s, p, g);
      g.debug != null && g.debug(JSON.stringify(E, null, 2));
      let m = 0, w = 0;
      for (const O of E) {
        const P = O.end - O.start;
        O.kind === n.OperationKind.DOWNLOAD ? m += P : w += P;
      }
      const T = this.blockAwareFileInfo.size;
      if (m + w + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== T)
        throw new Error(`Internal error, size mismatch: downloadSize: ${m}, copySize: ${w}, newSize: ${T}`);
      return g.info(`Full: ${r(T)}, To download: ${r(m)} (${Math.round(m / (T / 100))}%)`), this.downloadFile(E);
    }
    downloadFile(s) {
      const p = [], g = () => Promise.all(p.map((E) => (0, h.close)(E.descriptor).catch((m) => {
        this.logger.error(`cannot close file "${E.path}": ${m}`);
      })));
      return this.doDownloadFile(s, p).then(g).catch((E) => g().catch((m) => {
        try {
          this.logger.error(`cannot close files: ${m}`);
        } catch (w) {
          try {
            console.error(w);
          } catch {
          }
        }
        throw E;
      }).then(() => {
        throw E;
      }));
    }
    async doDownloadFile(s, p) {
      const g = await (0, h.open)(this.options.oldFile, "r");
      p.push({ descriptor: g, path: this.options.oldFile });
      const E = await (0, h.open)(this.options.newFile, "w");
      p.push({ descriptor: E, path: this.options.newFile });
      const m = (0, d.createWriteStream)(this.options.newFile, { fd: E });
      await new Promise((w, T) => {
        const O = [];
        let P;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const L = [];
          let k = 0;
          for (const D of s)
            D.kind === n.OperationKind.DOWNLOAD && (L.push(D.end - D.start), k += D.end - D.start);
          const I = {
            expectedByteCounts: L,
            grandTotal: k
          };
          P = new i.ProgressDifferentialDownloadCallbackTransform(I, this.options.cancellationToken, this.options.onProgress), O.push(P);
        }
        const U = new o.DigestTransform(this.blockAwareFileInfo.sha512);
        U.isValidateOnEnd = !1, O.push(U), m.on("finish", () => {
          m.close(() => {
            p.splice(1, 1);
            try {
              U.validate();
            } catch (L) {
              T(L);
              return;
            }
            w(void 0);
          });
        }), O.push(m);
        let R = null;
        for (const L of O)
          L.on("error", T), R == null ? R = L : R = R.pipe(L);
        const S = O[0];
        let b;
        if (this.options.isUseMultipleRangeRequest) {
          b = (0, e.executeTasksUsingMultipleRangeRequests)(this, s, S, g, T), b(0);
          return;
        }
        let y = 0, M = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const $ = this.createRequestOptions();
        $.redirect = "manual", b = (L) => {
          var k, I;
          if (L >= s.length) {
            this.fileMetadataBuffer != null && S.write(this.fileMetadataBuffer), S.end();
            return;
          }
          const D = s[L++];
          if (D.kind === n.OperationKind.COPY) {
            P && P.beginFileCopy(), (0, f.copyData)(D, S, g, T, () => b(L));
            return;
          }
          const F = `bytes=${D.start}-${D.end - 1}`;
          $.headers.range = F, (I = (k = this.logger) === null || k === void 0 ? void 0 : k.debug) === null || I === void 0 || I.call(k, `download range: ${F}`), P && P.beginRangeDownload();
          const q = this.httpExecutor.createRequest($, (K) => {
            K.on("error", T), K.on("aborted", () => {
              T(new Error("response has been aborted by the server"));
            }), K.statusCode >= 400 && T((0, o.createHttpError)(K)), K.pipe(S, {
              end: !1
            }), K.once("end", () => {
              P && P.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => b(L), 1e3)) : b(L);
            });
          });
          q.on("redirect", (K, W, ne) => {
            this.logger.info(`Redirect to ${c(ne)}`), M = ne, (0, o.configureRequestUrl)(new u.URL(M), $), q.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(q, T), q.end();
        }, b(0);
      });
    }
    async readRemoteBytes(s, p) {
      const g = Buffer.allocUnsafe(p + 1 - s), E = this.createRequestOptions();
      E.headers.range = `bytes=${s}-${p}`;
      let m = 0;
      if (await this.request(E, (w) => {
        w.copy(g, m), m += w.length;
      }), m !== g.length)
        throw new Error(`Received data length ${m} is not equal to expected ${g.length}`);
      return g;
    }
    request(s, p) {
      return new Promise((g, E) => {
        const m = this.httpExecutor.createRequest(s, (w) => {
          (0, e.checkIsRangesSupported)(w, E) && (w.on("error", E), w.on("aborted", () => {
            E(new Error("response has been aborted by the server"));
          }), w.on("data", p), w.on("end", () => g()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(m, E), m.end();
      });
    }
  };
  nr.DifferentialDownloader = t;
  function r(l, s = " KB") {
    return new Intl.NumberFormat("en").format((l / 1024).toFixed(2)) + s;
  }
  function c(l) {
    const s = l.indexOf("?");
    return s < 0 ? l : l.substring(0, s);
  }
  return nr;
}
var ql;
function jd() {
  if (ql) return rr;
  ql = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.GenericDifferentialDownloader = void 0;
  const o = uc();
  let h = class extends o.DifferentialDownloader {
    download(f, u) {
      return this.doDownload(f, u);
    }
  };
  return rr.GenericDifferentialDownloader = h, rr;
}
var kl;
function Ho() {
  if (kl) return Ct;
  kl = 1, Object.defineProperty(Ct, "__esModule", { value: !0 }), Ct.NoOpLogger = Ct.AppUpdater = void 0;
  const o = ke(), h = pr, d = gt, f = jr, u = /* @__PURE__ */ vt(), n = Lo(), e = od(), i = be, t = oc(), r = Id(), c = Fd(), l = xd(), s = sc(), p = jt(), g = kd(), E = Fu, m = Dt(), w = jd();
  let T = class cc extends f.EventEmitter {
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
    set channel(R) {
      if (this._channel != null) {
        if (typeof R != "string")
          throw (0, o.newError)(`Channel must be a string, but got: ${R}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (R.length === 0)
          throw (0, o.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = R, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(R) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: R
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, l.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(R) {
      this._logger = R ?? new P();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(R) {
      this.clientPromise = null, this._appUpdateConfigPath = R, this.configOnDisk = new e.Lazy(() => this.loadUpdateConfig());
    }
    constructor(R, S) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new p.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new e.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new e.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (M) => {
        this._logger.error(`Error: ${M.stack || M.message}`);
      }), S == null ? (this.app = new c.ElectronAppAdapter(), this.httpExecutor = new l.ElectronHttpExecutor((M, $) => this.emit("login", M, $))) : (this.app = S, this.httpExecutor = null);
      const b = this.app.version, y = (0, t.parse)(b);
      if (y == null)
        throw (0, o.newError)(`App version is not a valid semver version: "${b}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = y, this.allowPrerelease = O(y), R != null && (this.setFeedURL(R), typeof R != "string" && R.requestHeaders && (this.requestHeaders = R.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(R) {
      const S = this.createProviderRuntimeOptions();
      let b;
      typeof R == "string" ? b = new s.GenericProvider({ provider: "generic", url: R }, this, {
        ...S,
        isUseMultipleRangeRequest: (0, g.isUrlProbablySupportMultiRangeRequests)(R)
      }) : b = (0, g.createClient)(R, this, S), this.clientPromise = Promise.resolve(b);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let R = this.checkForUpdatesPromise;
      if (R != null)
        return this._logger.info("Checking for update (already in progress)"), R;
      const S = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), R = this.doCheckForUpdates().then((b) => (S(), b)).catch((b) => {
        throw S(), this.emit("error", b, `Cannot check for updates: ${(b.stack || b).toString()}`), b;
      }), this.checkForUpdatesPromise = R, R;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(R) {
      return this.checkForUpdates().then((S) => S != null && S.downloadPromise ? (S.downloadPromise.then(() => {
        const b = cc.formatDownloadNotification(S.updateInfo.version, this.app.name, R);
        new mt.Notification(b).show();
      }), S) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), S));
    }
    static formatDownloadNotification(R, S, b) {
      return b == null && (b = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), b = {
        title: b.title.replace("{appName}", S).replace("{version}", R),
        body: b.body.replace("{appName}", S).replace("{version}", R)
      }, b;
    }
    async isStagingMatch(R) {
      const S = R.stagingPercentage;
      let b = S;
      if (b == null)
        return !0;
      if (b = parseInt(b, 10), isNaN(b))
        return this._logger.warn(`Staging percentage is NaN: ${S}`), !0;
      b = b / 100;
      const y = await this.stagingUserIdPromise.value, $ = o.UUID.parse(y).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${b}, percentage: ${$}, user id: ${y}`), $ < b;
    }
    computeFinalHeaders(R) {
      return this.requestHeaders != null && Object.assign(R, this.requestHeaders), R;
    }
    async isUpdateAvailable(R) {
      const S = (0, t.parse)(R.version);
      if (S == null)
        throw (0, o.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${R.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const b = this.currentVersion;
      if ((0, t.eq)(S, b))
        return !1;
      const y = R == null ? void 0 : R.minimumSystemVersion, M = (0, d.release)();
      if (y)
        try {
          if ((0, t.lt)(M, y))
            return this._logger.info(`Current OS version ${M} is less than the minimum OS version required ${y} for version ${M}`), !1;
        } catch (I) {
          this._logger.warn(`Failed to compare current OS version(${M}) with minimum OS version(${y}): ${(I.message || I).toString()}`);
        }
      if (!await this.isStagingMatch(R))
        return !1;
      const L = (0, t.gt)(S, b), k = (0, t.lt)(S, b);
      return L ? !0 : this.allowDowngrade && k;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((b) => (0, g.createClient)(b, this, this.createProviderRuntimeOptions())));
      const R = await this.clientPromise, S = await this.stagingUserIdPromise.value;
      return R.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": S })), {
        info: await R.getLatestVersion(),
        provider: R
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
      const R = await this.getUpdateInfoAndProvider(), S = R.info;
      if (!await this.isUpdateAvailable(S))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${S.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", S), {
          versionInfo: S,
          updateInfo: S
        };
      this.updateInfoAndProvider = R, this.onUpdateAvailable(S);
      const b = new o.CancellationToken();
      return {
        versionInfo: S,
        updateInfo: S,
        cancellationToken: b,
        downloadPromise: this.autoDownload ? this.downloadUpdate(b) : null
      };
    }
    onUpdateAvailable(R) {
      this._logger.info(`Found version ${R.version} (url: ${(0, o.asArray)(R.files).map((S) => S.url).join(", ")})`), this.emit("update-available", R);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(R = new o.CancellationToken()) {
      const S = this.updateInfoAndProvider;
      if (S == null) {
        const y = new Error("Please check update first");
        return this.dispatchError(y), Promise.reject(y);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, o.asArray)(S.info.files).map((y) => y.url).join(", ")}`);
      const b = (y) => {
        if (!(y instanceof o.CancellationError))
          try {
            this.dispatchError(y);
          } catch (M) {
            this._logger.warn(`Cannot dispatch error event: ${M.stack || M}`);
          }
        return y;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: S,
        requestHeaders: this.computeRequestHeaders(S.provider),
        cancellationToken: R,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((y) => {
        throw b(y);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(R) {
      this.emit("error", R, (R.stack || R).toString());
    }
    dispatchUpdateDownloaded(R) {
      this.emit(p.UPDATE_DOWNLOADED, R);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, n.load)(await (0, u.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(R) {
      const S = R.fileExtraDownloadHeaders;
      if (S != null) {
        const b = this.requestHeaders;
        return b == null ? S : {
          ...S,
          ...b
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const R = i.join(this.app.userDataPath, ".updaterId");
      try {
        const b = await (0, u.readFile)(R, "utf-8");
        if (o.UUID.check(b))
          return b;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${b}`);
      } catch (b) {
        b.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${b}`);
      }
      const S = o.UUID.v5((0, h.randomBytes)(4096), o.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${S}`);
      try {
        await (0, u.outputFile)(R, S);
      } catch (b) {
        this._logger.warn(`Couldn't write out staging user ID: ${b}`);
      }
      return S;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const R = this.requestHeaders;
      if (R == null)
        return !0;
      for (const S of Object.keys(R)) {
        const b = S.toLowerCase();
        if (b === "authorization" || b === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let R = this.downloadedUpdateHelper;
      if (R == null) {
        const S = (await this.configOnDisk.value).updaterCacheDirName, b = this._logger;
        S == null && b.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const y = i.join(this.app.baseCachePath, S || this.app.name);
        b.debug != null && b.debug(`updater cache dir: ${y}`), R = new r.DownloadedUpdateHelper(y), this.downloadedUpdateHelper = R;
      }
      return R;
    }
    async executeDownload(R) {
      const S = R.fileInfo, b = {
        headers: R.downloadUpdateOptions.requestHeaders,
        cancellationToken: R.downloadUpdateOptions.cancellationToken,
        sha2: S.info.sha2,
        sha512: S.info.sha512
      };
      this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (b.onProgress = (ie) => this.emit(p.DOWNLOAD_PROGRESS, ie));
      const y = R.downloadUpdateOptions.updateInfoAndProvider.info, M = y.version, $ = S.packageInfo;
      function L() {
        const ie = decodeURIComponent(R.fileInfo.url.pathname);
        return ie.endsWith(`.${R.fileExtension}`) ? i.basename(ie) : R.fileInfo.info.url;
      }
      const k = await this.getOrCreateDownloadHelper(), I = k.cacheDirForPendingUpdate;
      await (0, u.mkdir)(I, { recursive: !0 });
      const D = L();
      let F = i.join(I, D);
      const q = $ == null ? null : i.join(I, `package-${M}${i.extname($.path) || ".7z"}`), K = async (ie) => (await k.setDownloadedFile(F, q, y, S, D, ie), await R.done({
        ...y,
        downloadedFile: F
      }), q == null ? [F] : [F, q]), W = this._logger, ne = await k.validateDownloadedPath(F, y, S, W);
      if (ne != null)
        return F = ne, await K(!1);
      const ce = async () => (await k.clear().catch(() => {
      }), await (0, u.unlink)(F).catch(() => {
      })), ue = await (0, r.createTempUpdateFile)(`temp-${D}`, I, W);
      try {
        await R.task(ue, b, q, ce), await (0, o.retry)(() => (0, u.rename)(ue, F), 60, 500, 0, 0, (ie) => ie instanceof Error && /^EBUSY:/.test(ie.message));
      } catch (ie) {
        throw await ce(), ie instanceof o.CancellationError && (W.info("cancelled"), this.emit("update-cancelled", y)), ie;
      }
      return W.info(`New version ${M} has been downloaded to ${F}`), await K(!0);
    }
    async differentialDownloadInstaller(R, S, b, y, M) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const $ = (0, m.blockmapFiles)(R.url, this.app.version, S.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${$[0]}", new: ${$[1]})`);
        const L = async (D) => {
          const F = await this.httpExecutor.downloadToBuffer(D, {
            headers: S.requestHeaders,
            cancellationToken: S.cancellationToken
          });
          if (F == null || F.length === 0)
            throw new Error(`Blockmap "${D.href}" is empty`);
          try {
            return JSON.parse((0, E.gunzipSync)(F).toString());
          } catch (q) {
            throw new Error(`Cannot parse blockmap "${D.href}", error: ${q}`);
          }
        }, k = {
          newUrl: R.url,
          oldFile: i.join(this.downloadedUpdateHelper.cacheDir, M),
          logger: this._logger,
          newFile: b,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          requestHeaders: S.requestHeaders,
          cancellationToken: S.cancellationToken
        };
        this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (k.onProgress = (D) => this.emit(p.DOWNLOAD_PROGRESS, D));
        const I = await Promise.all($.map((D) => L(D)));
        return await new w.GenericDifferentialDownloader(R.info, this.httpExecutor, k).download(I[0], I[1]), !1;
      } catch ($) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${$.stack || $}`), this._testOnlyOptions != null)
          throw $;
        return !0;
      }
    }
  };
  Ct.AppUpdater = T;
  function O(U) {
    const R = (0, t.prerelease)(U);
    return R != null && R.length > 0;
  }
  class P {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(R) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(R) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(R) {
    }
  }
  return Ct.NoOpLogger = P, Ct;
}
var Ml;
function wr() {
  if (Ml) return Yt;
  Ml = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.BaseUpdater = void 0;
  const o = gr, h = Ho();
  let d = class extends h.AppUpdater {
    constructor(u, n) {
      super(u, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(u = !1, n = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(u, u ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
        mt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(u) {
      return super.executeDownload({
        ...u,
        done: (n) => (this.dispatchUpdateDownloaded(n), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(u = !1, n = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const e = this.downloadedUpdateHelper, i = e && e.file ? process.platform === "linux" ? e.file.replace(/ /g, "\\ ") : e.file : null, t = e == null ? null : e.downloadedFileInfo;
      if (i == null || t == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${u}, isForceRunAfter: ${n}`), this.doInstall({
          installerPath: i,
          isSilent: u,
          isForceRunAfter: n,
          isAdminRightsRequired: t.isAdminRightsRequired
        });
      } catch (r) {
        return this.dispatchError(r), !1;
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
      const { name: u } = this.app, n = `"${u} would like to update"`, e = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), i = [e];
      return /kdesudo/i.test(e) ? (i.push("--comment", n), i.push("-c")) : /gksudo/i.test(e) ? i.push("--message", n) : /pkexec/i.test(e) && i.push("--disable-internal-agent"), i.join(" ");
    }
    spawnSyncLog(u, n = [], e = {}) {
      return this._logger.info(`Executing: ${u} with args: ${n}`), (0, o.spawnSync)(u, n, {
        env: { ...process.env, ...e },
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
    async spawnLog(u, n = [], e = void 0, i = "ignore") {
      return this._logger.info(`Executing: ${u} with args: ${n}`), new Promise((t, r) => {
        try {
          const c = { stdio: i, env: e, detached: !0 }, l = (0, o.spawn)(u, n, c);
          l.on("error", (s) => {
            r(s);
          }), l.unref(), l.pid !== void 0 && t(!0);
        } catch (c) {
          r(c);
        }
      });
    }
  };
  return Yt.BaseUpdater = d, Yt;
}
var sr = {}, ar = {}, Bl;
function fc() {
  if (Bl) return ar;
  Bl = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const o = /* @__PURE__ */ vt(), h = uc(), d = Fu;
  let f = class extends h.DifferentialDownloader {
    async download() {
      const i = this.blockAwareFileInfo, t = i.size, r = t - (i.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(r, t - 1);
      const c = u(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await n(this.options.oldFile), c);
    }
  };
  ar.FileWithEmbeddedBlockMapDifferentialDownloader = f;
  function u(e) {
    return JSON.parse((0, d.inflateRawSync)(e).toString());
  }
  async function n(e) {
    const i = await (0, o.open)(e, "r");
    try {
      const t = (await (0, o.fstat)(i)).size, r = Buffer.allocUnsafe(4);
      await (0, o.read)(i, r, 0, r.length, t - r.length);
      const c = Buffer.allocUnsafe(r.readUInt32BE(0));
      return await (0, o.read)(i, c, 0, c.length, t - r.length - c.length), await (0, o.close)(i), u(c);
    } catch (t) {
      throw await (0, o.close)(i), t;
    }
  }
  return ar;
}
var jl;
function Hl() {
  if (jl) return sr;
  jl = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.AppImageUpdater = void 0;
  const o = ke(), h = gr, d = /* @__PURE__ */ vt(), f = Ye, u = be, n = wr(), e = fc(), i = jt(), t = nt();
  let r = class extends n.BaseUpdater {
    constructor(l, s) {
      super(l, s);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(l) {
      const s = l.updateInfoAndProvider.provider, p = (0, t.findFile)(s.resolveFiles(l.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: p,
        downloadUpdateOptions: l,
        task: async (g, E) => {
          const m = process.env.APPIMAGE;
          if (m == null)
            throw (0, o.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let w = !1;
          try {
            const T = {
              newUrl: p.url,
              oldFile: m,
              logger: this._logger,
              newFile: g,
              isUseMultipleRangeRequest: s.isUseMultipleRangeRequest,
              requestHeaders: l.requestHeaders,
              cancellationToken: l.cancellationToken
            };
            this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (T.onProgress = (O) => this.emit(i.DOWNLOAD_PROGRESS, O)), await new e.FileWithEmbeddedBlockMapDifferentialDownloader(p.info, this.httpExecutor, T).download();
          } catch (T) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${T.stack || T}`), w = process.platform === "linux";
          }
          w && await this.httpExecutor.download(p.url, g, E), await (0, d.chmod)(g, 493);
        }
      });
    }
    doInstall(l) {
      const s = process.env.APPIMAGE;
      if (s == null)
        throw (0, o.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, f.unlinkSync)(s);
      let p;
      const g = u.basename(s);
      u.basename(l.installerPath) === g || !/\d+\.\d+\.\d+/.test(g) ? p = s : p = u.join(u.dirname(s), u.basename(l.installerPath)), (0, h.execFileSync)("mv", ["-f", l.installerPath, p]), p !== s && this.emit("appimage-filename-updated", p);
      const E = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return l.isForceRunAfter ? this.spawnLog(p, [], E) : (E.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, h.execFileSync)(p, [], { env: E })), !0;
    }
  };
  return sr.AppImageUpdater = r, sr;
}
var lr = {}, Gl;
function Wl() {
  if (Gl) return lr;
  Gl = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.DebUpdater = void 0;
  const o = wr(), h = jt(), d = nt();
  let f = class extends o.BaseUpdater {
    constructor(n, e) {
      super(n, e);
    }
    /*** @private */
    doDownloadUpdate(n) {
      const e = n.updateInfoAndProvider.provider, i = (0, d.findFile)(e.resolveFiles(n.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: i,
        downloadUpdateOptions: n,
        task: async (t, r) => {
          this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (c) => this.emit(h.DOWNLOAD_PROGRESS, c)), await this.httpExecutor.download(i.url, t, r);
        }
      });
    }
    doInstall(n) {
      const e = this.wrapSudo(), i = /pkexec/i.test(e) ? "" : '"', t = ["dpkg", "-i", n.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(e, [`${i}/bin/bash`, "-c", `'${t.join(" ")}'${i}`]), n.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return lr.DebUpdater = f, lr;
}
var ur = {}, zl;
function Vl() {
  if (zl) return ur;
  zl = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.RpmUpdater = void 0;
  const o = wr(), h = jt(), d = nt();
  let f = class extends o.BaseUpdater {
    constructor(n, e) {
      super(n, e);
    }
    /*** @private */
    doDownloadUpdate(n) {
      const e = n.updateInfoAndProvider.provider, i = (0, d.findFile)(e.resolveFiles(n.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: i,
        downloadUpdateOptions: n,
        task: async (t, r) => {
          this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (c) => this.emit(h.DOWNLOAD_PROGRESS, c)), await this.httpExecutor.download(i.url, t, r);
        }
      });
    }
    doInstall(n) {
      const e = n.installerPath, i = this.wrapSudo(), t = /pkexec/i.test(i) ? "" : '"', r = this.spawnSyncLog("which zypper");
      let c;
      return r ? c = [r, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", e] : c = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", e], this.spawnSyncLog(i, [`${t}/bin/bash`, "-c", `'${c.join(" ")}'${t}`]), n.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return ur.RpmUpdater = f, ur;
}
var cr = {}, Yl;
function Xl() {
  if (Yl) return cr;
  Yl = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.MacUpdater = void 0;
  const o = ke(), h = /* @__PURE__ */ vt(), d = Ye, f = be, u = xu, n = Ho(), e = nt(), i = gr, t = pr;
  let r = class extends n.AppUpdater {
    constructor(l, s) {
      super(l, s), this.nativeUpdater = mt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (p) => {
        this._logger.warn(p), this.emit("error", p);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(l) {
      this._logger.debug != null && this._logger.debug(l);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((l) => {
        l && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(l) {
      let s = l.updateInfoAndProvider.provider.resolveFiles(l.updateInfoAndProvider.info);
      const p = this._logger, g = "sysctl.proc_translated";
      let E = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), E = (0, i.execFileSync)("sysctl", [g], { encoding: "utf8" }).includes(`${g}: 1`), p.info(`Checked for macOS Rosetta environment (isRosetta=${E})`);
      } catch (U) {
        p.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${U}`);
      }
      let m = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const R = (0, i.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        p.info(`Checked 'uname -a': arm64=${R}`), m = m || R;
      } catch (U) {
        p.warn(`uname shell command to check for arm64 failed: ${U}`);
      }
      m = m || process.arch === "arm64" || E;
      const w = (U) => {
        var R;
        return U.url.pathname.includes("arm64") || ((R = U.info.url) === null || R === void 0 ? void 0 : R.includes("arm64"));
      };
      m && s.some(w) ? s = s.filter((U) => m === w(U)) : s = s.filter((U) => !w(U));
      const T = (0, e.findFile)(s, "zip", ["pkg", "dmg"]);
      if (T == null)
        throw (0, o.newError)(`ZIP file not provided: ${(0, o.safeStringifyJson)(s)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const O = l.updateInfoAndProvider.provider, P = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: T,
        downloadUpdateOptions: l,
        task: async (U, R) => {
          const S = f.join(this.downloadedUpdateHelper.cacheDir, P), b = () => (0, h.pathExistsSync)(S) ? !l.disableDifferentialDownload : (p.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let y = !0;
          b() && (y = await this.differentialDownloadInstaller(T, l, U, O, P)), y && await this.httpExecutor.download(T.url, U, R);
        },
        done: (U) => {
          if (!l.disableDifferentialDownload)
            try {
              const R = f.join(this.downloadedUpdateHelper.cacheDir, P);
              (0, d.copyFileSync)(U.downloadedFile, R);
            } catch (R) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${R.message}`);
            }
          return this.updateDownloaded(T, U);
        }
      });
    }
    async updateDownloaded(l, s) {
      var p;
      const g = s.downloadedFile, E = (p = l.info.size) !== null && p !== void 0 ? p : (await (0, h.stat)(g)).size, m = this._logger, w = `fileToProxy=${l.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${w})`), this.server = (0, u.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${w})`), this.server.on("close", () => {
        m.info(`Proxy server for native Squirrel.Mac is closed (${w})`);
      });
      const T = (O) => {
        const P = O.address();
        return typeof P == "string" ? P : `http://127.0.0.1:${P == null ? void 0 : P.port}`;
      };
      return await new Promise((O, P) => {
        const U = (0, t.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), R = Buffer.from(`autoupdater:${U}`, "ascii"), S = `/${(0, t.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (b, y) => {
          const M = b.url;
          if (m.info(`${M} requested`), M === "/") {
            if (!b.headers.authorization || b.headers.authorization.indexOf("Basic ") === -1) {
              y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), m.warn("No authenthication info");
              return;
            }
            const k = b.headers.authorization.split(" ")[1], I = Buffer.from(k, "base64").toString("ascii"), [D, F] = I.split(":");
            if (D !== "autoupdater" || F !== U) {
              y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), m.warn("Invalid authenthication credentials");
              return;
            }
            const q = Buffer.from(`{ "url": "${T(this.server)}${S}" }`);
            y.writeHead(200, { "Content-Type": "application/json", "Content-Length": q.length }), y.end(q);
            return;
          }
          if (!M.startsWith(S)) {
            m.warn(`${M} requested, but not supported`), y.writeHead(404), y.end();
            return;
          }
          m.info(`${S} requested by Squirrel.Mac, pipe ${g}`);
          let $ = !1;
          y.on("finish", () => {
            $ || (this.nativeUpdater.removeListener("error", P), O([]));
          });
          const L = (0, d.createReadStream)(g);
          L.on("error", (k) => {
            try {
              y.end();
            } catch (I) {
              m.warn(`cannot end response: ${I}`);
            }
            $ = !0, this.nativeUpdater.removeListener("error", P), P(new Error(`Cannot pipe "${g}": ${k}`));
          }), y.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": E
          }), L.pipe(y);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${w})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${T(this.server)}, ${w})`), this.nativeUpdater.setFeedURL({
            url: T(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${R.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(s), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", P), this.nativeUpdater.checkForUpdates()) : O([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return cr.MacUpdater = r, cr;
}
var fr = {}, Mr = {}, Jl;
function Hd() {
  if (Jl) return Mr;
  Jl = 1, Object.defineProperty(Mr, "__esModule", { value: !0 }), Mr.verifySignature = u;
  const o = ke(), h = gr, d = gt, f = be;
  function u(t, r, c) {
    return new Promise((l, s) => {
      const p = r.replace(/'/g, "''");
      c.info(`Verifying signature ${p}`), (0, h.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${p}' | ConvertTo-Json -Compress"`], {
        shell: !0,
        timeout: 20 * 1e3
      }, (g, E, m) => {
        var w;
        try {
          if (g != null || m) {
            e(c, g, m, s), l(null);
            return;
          }
          const T = n(E);
          if (T.Status === 0) {
            try {
              const R = f.normalize(T.Path), S = f.normalize(r);
              if (c.info(`LiteralPath: ${R}. Update Path: ${S}`), R !== S) {
                e(c, new Error(`LiteralPath of ${R} is different than ${S}`), m, s), l(null);
                return;
              }
            } catch (R) {
              c.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(w = R.message) !== null && w !== void 0 ? w : R.stack}`);
            }
            const P = (0, o.parseDn)(T.SignerCertificate.Subject);
            let U = !1;
            for (const R of t) {
              const S = (0, o.parseDn)(R);
              if (S.size ? U = Array.from(S.keys()).every((y) => S.get(y) === P.get(y)) : R === P.get("CN") && (c.warn(`Signature validated using only CN ${R}. Please add your full Distinguished Name (DN) to publisherNames configuration`), U = !0), U) {
                l(null);
                return;
              }
            }
          }
          const O = `publisherNames: ${t.join(" | ")}, raw info: ` + JSON.stringify(T, (P, U) => P === "RawData" ? void 0 : U, 2);
          c.warn(`Sign verification failed, installer signed with incorrect certificate: ${O}`), l(O);
        } catch (T) {
          e(c, T, null, s), l(null);
          return;
        }
      });
    });
  }
  function n(t) {
    const r = JSON.parse(t);
    delete r.PrivateKey, delete r.IsOSBinary, delete r.SignatureType;
    const c = r.SignerCertificate;
    return c != null && (delete c.Archived, delete c.Extensions, delete c.Handle, delete c.HasPrivateKey, delete c.SubjectName), r;
  }
  function e(t, r, c, l) {
    if (i()) {
      t.warn(`Cannot execute Get-AuthenticodeSignature: ${r || c}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, h.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
    } catch (s) {
      t.warn(`Cannot execute ConvertTo-Json: ${s.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    r != null && l(r), c && l(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${c}. Failing signature validation due to unknown stderr.`));
  }
  function i() {
    const t = d.release();
    return t.startsWith("6.") && !t.startsWith("6.3");
  }
  return Mr;
}
var Kl;
function Ql() {
  if (Kl) return fr;
  Kl = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.NsisUpdater = void 0;
  const o = ke(), h = be, d = wr(), f = fc(), u = jt(), n = nt(), e = /* @__PURE__ */ vt(), i = Hd(), t = qt;
  let r = class extends d.BaseUpdater {
    constructor(l, s) {
      super(l, s), this._verifyUpdateCodeSignature = (p, g) => (0, i.verifySignature)(p, g, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(l) {
      l && (this._verifyUpdateCodeSignature = l);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const s = l.updateInfoAndProvider.provider, p = (0, n.findFile)(s.resolveFiles(l.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: l,
        fileInfo: p,
        task: async (g, E, m, w) => {
          const T = p.packageInfo, O = T != null && m != null;
          if (O && l.disableWebInstaller)
            throw (0, o.newError)(`Unable to download new version ${l.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !O && !l.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (O || l.disableDifferentialDownload || await this.differentialDownloadInstaller(p, l, g, s, o.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(p.url, g, E);
          const P = await this.verifySignature(g);
          if (P != null)
            throw await w(), (0, o.newError)(`New version ${l.updateInfoAndProvider.info.version} is not signed by the application owner: ${P}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (O && await this.differentialDownloadWebPackage(l, T, m, s))
            try {
              await this.httpExecutor.download(new t.URL(T.path), m, {
                headers: l.requestHeaders,
                cancellationToken: l.cancellationToken,
                sha512: T.sha512
              });
            } catch (U) {
              try {
                await (0, e.unlink)(m);
              } catch {
              }
              throw U;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(l) {
      let s;
      try {
        if (s = (await this.configOnDisk.value).publisherName, s == null)
          return null;
      } catch (p) {
        if (p.code === "ENOENT")
          return null;
        throw p;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(s) ? s : [s], l);
    }
    doInstall(l) {
      const s = ["--updated"];
      l.isSilent && s.push("/S"), l.isForceRunAfter && s.push("--force-run"), this.installDirectory && s.push(`/D=${this.installDirectory}`);
      const p = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      p != null && s.push(`--package-file=${p}`);
      const g = () => {
        this.spawnLog(h.join(process.resourcesPath, "elevate.exe"), [l.installerPath].concat(s)).catch((E) => this.dispatchError(E));
      };
      return l.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), g(), !0) : (this.spawnLog(l.installerPath, s).catch((E) => {
        const m = E.code;
        this._logger.info(`Cannot run installer: error code: ${m}, error message: "${E.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), m === "UNKNOWN" || m === "EACCES" ? g() : m === "ENOENT" ? mt.shell.openPath(l.installerPath).catch((w) => this.dispatchError(w)) : this.dispatchError(E);
      }), !0);
    }
    async differentialDownloadWebPackage(l, s, p, g) {
      if (s.blockMapSize == null)
        return !0;
      try {
        const E = {
          newUrl: new t.URL(s.path),
          oldFile: h.join(this.downloadedUpdateHelper.cacheDir, o.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: p,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          cancellationToken: l.cancellationToken
        };
        this.listenerCount(u.DOWNLOAD_PROGRESS) > 0 && (E.onProgress = (m) => this.emit(u.DOWNLOAD_PROGRESS, m)), await new f.FileWithEmbeddedBlockMapDifferentialDownloader(s, this.httpExecutor, E).download();
      } catch (E) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${E.stack || E}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return fr.NsisUpdater = r, fr;
}
var Zl;
function jt() {
  return Zl || (Zl = 1, function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.UpdaterSignal = o.UPDATE_DOWNLOADED = o.DOWNLOAD_PROGRESS = o.NsisUpdater = o.MacUpdater = o.RpmUpdater = o.DebUpdater = o.AppImageUpdater = o.Provider = o.CancellationToken = o.NoOpLogger = o.AppUpdater = o.BaseUpdater = void 0;
    const h = ke();
    Object.defineProperty(o, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } });
    const d = /* @__PURE__ */ vt(), f = be;
    var u = wr();
    Object.defineProperty(o, "BaseUpdater", { enumerable: !0, get: function() {
      return u.BaseUpdater;
    } });
    var n = Ho();
    Object.defineProperty(o, "AppUpdater", { enumerable: !0, get: function() {
      return n.AppUpdater;
    } }), Object.defineProperty(o, "NoOpLogger", { enumerable: !0, get: function() {
      return n.NoOpLogger;
    } });
    var e = nt();
    Object.defineProperty(o, "Provider", { enumerable: !0, get: function() {
      return e.Provider;
    } });
    var i = Hl();
    Object.defineProperty(o, "AppImageUpdater", { enumerable: !0, get: function() {
      return i.AppImageUpdater;
    } });
    var t = Wl();
    Object.defineProperty(o, "DebUpdater", { enumerable: !0, get: function() {
      return t.DebUpdater;
    } });
    var r = Vl();
    Object.defineProperty(o, "RpmUpdater", { enumerable: !0, get: function() {
      return r.RpmUpdater;
    } });
    var c = Xl();
    Object.defineProperty(o, "MacUpdater", { enumerable: !0, get: function() {
      return c.MacUpdater;
    } });
    var l = Ql();
    Object.defineProperty(o, "NsisUpdater", { enumerable: !0, get: function() {
      return l.NsisUpdater;
    } });
    let s;
    function p() {
      if (process.platform === "win32")
        s = new (Ql()).NsisUpdater();
      else if (process.platform === "darwin")
        s = new (Xl()).MacUpdater();
      else {
        s = new (Hl()).AppImageUpdater();
        try {
          const m = f.join(process.resourcesPath, "package-type");
          if (!(0, d.existsSync)(m))
            return s;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const w = (0, d.readFileSync)(m).toString().trim();
          switch (console.info("Found package-type:", w), w) {
            case "deb":
              s = new (Wl()).DebUpdater();
              break;
            case "rpm":
              s = new (Vl()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (m) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", m.message);
        }
      }
      return s;
    }
    Object.defineProperty(o, "autoUpdater", {
      enumerable: !0,
      get: () => s || p()
    }), o.DOWNLOAD_PROGRESS = "download-progress", o.UPDATE_DOWNLOADED = "update-downloaded";
    class g {
      constructor(w) {
        this.emitter = w;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(w) {
        E(this.emitter, "login", w);
      }
      progress(w) {
        E(this.emitter, o.DOWNLOAD_PROGRESS, w);
      }
      updateDownloaded(w) {
        E(this.emitter, o.UPDATE_DOWNLOADED, w);
      }
      updateCancelled(w) {
        E(this.emitter, "update-cancelled", w);
      }
    }
    o.UpdaterSignal = g;
    function E(m, w, T) {
      m.on(w, T);
    }
  }(en)), en;
}
var it = jt(), dr = { exports: {} }, eo = { exports: {} }, eu;
function dc() {
  return eu || (eu = 1, function(o) {
    let h = {};
    try {
      h = require("electron");
    } catch {
    }
    h.ipcRenderer && d(h), o.exports = d;
    function d({ contextBridge: f, ipcRenderer: u }) {
      if (!u)
        return;
      u.on("__ELECTRON_LOG_IPC__", (e, i) => {
        window.postMessage({ cmd: "message", ...i });
      }), u.invoke("__ELECTRON_LOG__", { cmd: "getOptions" }).catch((e) => console.error(new Error(
        `electron-log isn't initialized in the main process. Please call log.initialize() before. ${e.message}`
      )));
      const n = {
        sendToMain(e) {
          try {
            u.send("__ELECTRON_LOG__", e);
          } catch (i) {
            console.error("electronLog.sendToMain ", i, "data:", e), u.send("__ELECTRON_LOG__", {
              cmd: "errorHandler",
              error: { message: i == null ? void 0 : i.message, stack: i == null ? void 0 : i.stack },
              errorName: "sendToMain"
            });
          }
        },
        log(...e) {
          n.sendToMain({ data: e, level: "info" });
        }
      };
      for (const e of ["error", "warn", "info", "verbose", "debug", "silly"])
        n[e] = (...i) => n.sendToMain({
          data: i,
          level: e
        });
      if (f && process.contextIsolated)
        try {
          f.exposeInMainWorld("__electronLog", n);
        } catch {
        }
      typeof window == "object" ? window.__electronLog = n : __electronLog = n;
    }
  }(eo)), eo.exports;
}
var to = { exports: {} }, ro, tu;
function Gd() {
  if (tu) return ro;
  tu = 1, ro = o;
  function o(h) {
    return Object.defineProperties(d, {
      defaultLabel: { value: "", writable: !0 },
      labelPadding: { value: !0, writable: !0 },
      maxLabelLength: { value: 0, writable: !0 },
      labelLength: {
        get() {
          switch (typeof d.labelPadding) {
            case "boolean":
              return d.labelPadding ? d.maxLabelLength : 0;
            case "number":
              return d.labelPadding;
            default:
              return 0;
          }
        }
      }
    });
    function d(f) {
      d.maxLabelLength = Math.max(d.maxLabelLength, f.length);
      const u = {};
      for (const n of h.levels)
        u[n] = (...e) => h.logData(e, { level: n, scope: f });
      return u.log = u.info, u;
    }
  }
  return ro;
}
var no, ru;
function Wd() {
  if (ru) return no;
  ru = 1;
  class o {
    constructor({ processMessage: d }) {
      this.processMessage = d, this.buffer = [], this.enabled = !1, this.begin = this.begin.bind(this), this.commit = this.commit.bind(this), this.reject = this.reject.bind(this);
    }
    addMessage(d) {
      this.buffer.push(d);
    }
    begin() {
      this.enabled = [];
    }
    commit() {
      this.enabled = !1, this.buffer.forEach((d) => this.processMessage(d)), this.buffer = [];
    }
    reject() {
      this.enabled = !1, this.buffer = [];
    }
  }
  return no = o, no;
}
var io, nu;
function hc() {
  if (nu) return io;
  nu = 1;
  const o = Gd(), h = Wd(), f = class f {
    constructor({
      allowUnknownLevel: n = !1,
      dependencies: e = {},
      errorHandler: i,
      eventLogger: t,
      initializeFn: r,
      isDev: c = !1,
      levels: l = ["error", "warn", "info", "verbose", "debug", "silly"],
      logId: s,
      transportFactories: p = {},
      variables: g
    } = {}) {
      Ae(this, "dependencies", {});
      Ae(this, "errorHandler", null);
      Ae(this, "eventLogger", null);
      Ae(this, "functions", {});
      Ae(this, "hooks", []);
      Ae(this, "isDev", !1);
      Ae(this, "levels", null);
      Ae(this, "logId", null);
      Ae(this, "scope", null);
      Ae(this, "transports", {});
      Ae(this, "variables", {});
      this.addLevel = this.addLevel.bind(this), this.create = this.create.bind(this), this.initialize = this.initialize.bind(this), this.logData = this.logData.bind(this), this.processMessage = this.processMessage.bind(this), this.allowUnknownLevel = n, this.buffering = new h(this), this.dependencies = e, this.initializeFn = r, this.isDev = c, this.levels = l, this.logId = s, this.scope = o(this), this.transportFactories = p, this.variables = g || {};
      for (const E of this.levels)
        this.addLevel(E, !1);
      this.log = this.info, this.functions.log = this.log, this.errorHandler = i, i == null || i.setOptions({ ...e, logFn: this.error }), this.eventLogger = t, t == null || t.setOptions({ ...e, logger: this });
      for (const [E, m] of Object.entries(p))
        this.transports[E] = m(this, e);
      f.instances[s] = this;
    }
    static getInstance({ logId: n }) {
      return this.instances[n] || this.instances.default;
    }
    addLevel(n, e = this.levels.length) {
      e !== !1 && this.levels.splice(e, 0, n), this[n] = (...i) => this.logData(i, { level: n }), this.functions[n] = this[n];
    }
    catchErrors(n) {
      return this.processMessage(
        {
          data: ["log.catchErrors is deprecated. Use log.errorHandler instead"],
          level: "warn"
        },
        { transports: ["console"] }
      ), this.errorHandler.startCatching(n);
    }
    create(n) {
      return typeof n == "string" && (n = { logId: n }), new f({
        dependencies: this.dependencies,
        errorHandler: this.errorHandler,
        initializeFn: this.initializeFn,
        isDev: this.isDev,
        transportFactories: this.transportFactories,
        variables: { ...this.variables },
        ...n
      });
    }
    compareLevels(n, e, i = this.levels) {
      const t = i.indexOf(n), r = i.indexOf(e);
      return r === -1 || t === -1 ? !0 : r <= t;
    }
    initialize(n = {}) {
      this.initializeFn({ logger: this, ...this.dependencies, ...n });
    }
    logData(n, e = {}) {
      this.buffering.enabled ? this.buffering.addMessage({ data: n, ...e }) : this.processMessage({ data: n, ...e });
    }
    processMessage(n, { transports: e = this.transports } = {}) {
      if (n.cmd === "errorHandler") {
        this.errorHandler.handle(n.error, {
          errorName: n.errorName,
          processType: "renderer",
          showDialog: !!n.showDialog
        });
        return;
      }
      let i = n.level;
      this.allowUnknownLevel || (i = this.levels.includes(n.level) ? n.level : "info");
      const t = {
        date: /* @__PURE__ */ new Date(),
        logId: this.logId,
        ...n,
        level: i,
        variables: {
          ...this.variables,
          ...n.variables
        }
      };
      for (const [r, c] of this.transportEntries(e))
        if (!(typeof c != "function" || c.level === !1) && this.compareLevels(c.level, n.level))
          try {
            const l = this.hooks.reduce((s, p) => s && p(s, c, r), t);
            l && c({ ...l, data: [...l.data] });
          } catch (l) {
            this.processInternalErrorFn(l);
          }
    }
    processInternalErrorFn(n) {
    }
    transportEntries(n = this.transports) {
      return (Array.isArray(n) ? n : Object.entries(n)).map((i) => {
        switch (typeof i) {
          case "string":
            return this.transports[i] ? [i, this.transports[i]] : null;
          case "function":
            return [i.name, i];
          default:
            return Array.isArray(i) ? i : null;
        }
      }).filter(Boolean);
    }
  };
  Ae(f, "instances", {});
  let d = f;
  return io = d, io;
}
var oo, iu;
function zd() {
  if (iu) return oo;
  iu = 1;
  const o = console.error;
  class h {
    constructor({ logFn: f = null } = {}) {
      Ae(this, "logFn", null);
      Ae(this, "onError", null);
      Ae(this, "showDialog", !1);
      Ae(this, "preventDefault", !0);
      this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.startCatching = this.startCatching.bind(this), this.logFn = f;
    }
    handle(f, {
      logFn: u = this.logFn,
      errorName: n = "",
      onError: e = this.onError,
      showDialog: i = this.showDialog
    } = {}) {
      try {
        (e == null ? void 0 : e({ error: f, errorName: n, processType: "renderer" })) !== !1 && u({ error: f, errorName: n, showDialog: i });
      } catch {
        o(f);
      }
    }
    setOptions({ logFn: f, onError: u, preventDefault: n, showDialog: e }) {
      typeof f == "function" && (this.logFn = f), typeof u == "function" && (this.onError = u), typeof n == "boolean" && (this.preventDefault = n), typeof e == "boolean" && (this.showDialog = e);
    }
    startCatching({ onError: f, showDialog: u } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: f, showDialog: u }), window.addEventListener("error", (n) => {
        var e;
        this.preventDefault && ((e = n.preventDefault) == null || e.call(n)), this.handleError(n.error || n);
      }), window.addEventListener("unhandledrejection", (n) => {
        var e;
        this.preventDefault && ((e = n.preventDefault) == null || e.call(n)), this.handleRejection(n.reason || n);
      }));
    }
    handleError(f) {
      this.handle(f, { errorName: "Unhandled" });
    }
    handleRejection(f) {
      const u = f instanceof Error ? f : new Error(JSON.stringify(f));
      this.handle(u, { errorName: "Unhandled rejection" });
    }
  }
  return oo = h, oo;
}
var so, ou;
function Vd() {
  if (ou) return so;
  ou = 1, so = h;
  const o = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  function h(d) {
    return Object.assign(f, {
      format: "{h}:{i}:{s}.{ms}{scope} › {text}",
      formatDataFn({
        data: u = [],
        date: n = /* @__PURE__ */ new Date(),
        format: e = f.format,
        logId: i = d.logId,
        scope: t = d.scopeName,
        ...r
      }) {
        return typeof e == "function" ? e({ ...r, data: u, date: n, logId: i, scope: t }) : (typeof e != "string" || (u.unshift(e), typeof u[1] == "string" && u[1].match(/%[1cdfiOos]/) && (u = [`${u[0]} ${u[1]}`, ...u.slice(2)]), u[0] = u[0].replace(/\{(\w+)}/g, (c, l) => {
          var s;
          switch (l) {
            case "level":
              return r.level;
            case "logId":
              return i;
            case "scope":
              return t ? ` (${t})` : "";
            case "text":
              return "";
            case "y":
              return n.getFullYear().toString(10);
            case "m":
              return (n.getMonth() + 1).toString(10).padStart(2, "0");
            case "d":
              return n.getDate().toString(10).padStart(2, "0");
            case "h":
              return n.getHours().toString(10).padStart(2, "0");
            case "i":
              return n.getMinutes().toString(10).padStart(2, "0");
            case "s":
              return n.getSeconds().toString(10).padStart(2, "0");
            case "ms":
              return n.getMilliseconds().toString(10).padStart(3, "0");
            case "iso":
              return n.toISOString();
            default:
              return ((s = r.variables) == null ? void 0 : s[l]) || c;
          }
        }).trim()), u);
      },
      writeFn({ message: { level: u, data: n } }) {
        const e = o[u] || o.info;
        setTimeout(() => e(...n));
      }
    });
    function f(u) {
      f.writeFn({
        message: { ...u, data: f.formatDataFn(u) }
      });
    }
  }
  return so;
}
var ao, su;
function Yd() {
  if (su) return ao;
  su = 1, ao = h;
  const o = /* @__PURE__ */ new Set([Promise, WeakMap, WeakSet]);
  function h(f) {
    return Object.assign(u, {
      depth: 5,
      serializeFn(n, { depth: e = 5, seen: i = /* @__PURE__ */ new WeakSet() } = {}) {
        return i.has(n) ? "[Circular]" : e < 1 ? d(n) ? n : Array.isArray(n) ? "[Array]" : `[${typeof n}]` : ["function", "symbol"].includes(typeof n) ? n.toString() : d(n) ? n : o.has(n.constructor) ? `[${n.constructor.name}]` : Array.isArray(n) ? n.map((t) => u.serializeFn(
          t,
          { depth: e - 1, seen: i }
        )) : n instanceof Date ? n.toISOString() : n instanceof Error ? n.stack : n instanceof Map ? new Map(
          Array.from(n).map(([t, r]) => [
            u.serializeFn(t, { depth: e - 1, seen: i }),
            u.serializeFn(r, { depth: e - 1, seen: i })
          ])
        ) : n instanceof Set ? new Set(
          Array.from(n).map(
            (t) => u.serializeFn(t, { depth: e - 1, seen: i })
          )
        ) : (i.add(n), Object.fromEntries(
          Object.entries(n).map(
            ([t, r]) => [
              t,
              u.serializeFn(r, { depth: e - 1, seen: i })
            ]
          )
        ));
      }
    });
    function u(n) {
      if (!window.__electronLog) {
        f.processMessage(
          {
            data: ["electron-log: logger isn't initialized in the main process"],
            level: "error"
          },
          { transports: ["console"] }
        );
        return;
      }
      try {
        __electronLog.sendToMain(u.serializeFn(n, {
          depth: u.depth
        }));
      } catch (e) {
        f.transports.console({
          data: ["electronLog.transports.ipc", e, "data:", n.data],
          level: "error"
        });
      }
    }
  }
  function d(f) {
    return Object(f) !== f;
  }
  return ao;
}
var au;
function Xd() {
  return au || (au = 1, function(o) {
    const h = hc(), d = zd(), f = Vd(), u = Yd();
    o.exports = n(), o.exports.Logger = h, o.exports.default = o.exports;
    function n() {
      const e = new h({
        allowUnknownLevel: !0,
        errorHandler: new d(),
        initializeFn: () => {
        },
        logId: "default",
        transportFactories: {
          console: f,
          ipc: u
        },
        variables: {
          processType: "renderer"
        }
      });
      return e.errorHandler.setOptions({
        logFn({ error: i, errorName: t, showDialog: r }) {
          e.transports.console({
            data: [t, i].filter(Boolean),
            level: "error"
          }), e.transports.ipc({
            cmd: "errorHandler",
            error: {
              cause: i == null ? void 0 : i.cause,
              code: i == null ? void 0 : i.code,
              name: i == null ? void 0 : i.name,
              message: i == null ? void 0 : i.message,
              stack: i == null ? void 0 : i.stack
            },
            errorName: t,
            logId: e.logId,
            showDialog: r
          });
        }
      }), typeof window == "object" && window.addEventListener("message", (i) => {
        const { cmd: t, logId: r, ...c } = i.data || {}, l = h.getInstance({ logId: r });
        t === "message" && l.processMessage(c, { transports: ["console"] });
      }), new Proxy(e, {
        get(i, t) {
          return typeof i[t] < "u" ? i[t] : (...r) => e.logData(r, { level: t });
        }
      });
    }
  }(to)), to.exports;
}
var lo, lu;
function Jd() {
  if (lu) return lo;
  lu = 1;
  const o = Ye, h = be;
  lo = {
    findAndReadPackageJson: d,
    tryReadJsonAt: f
  };
  function d() {
    return f(e()) || f(n()) || f(process.resourcesPath, "app.asar") || f(process.resourcesPath, "app") || f(process.cwd()) || { name: void 0, version: void 0 };
  }
  function f(...i) {
    if (i[0])
      try {
        const t = h.join(...i), r = u("package.json", t);
        if (!r)
          return;
        const c = JSON.parse(o.readFileSync(r, "utf8")), l = (c == null ? void 0 : c.productName) || (c == null ? void 0 : c.name);
        return !l || l.toLowerCase() === "electron" ? void 0 : l ? { name: l, version: c == null ? void 0 : c.version } : void 0;
      } catch {
        return;
      }
  }
  function u(i, t) {
    let r = t;
    for (; ; ) {
      const c = h.parse(r), l = c.root, s = c.dir;
      if (o.existsSync(h.join(r, i)))
        return h.resolve(h.join(r, i));
      if (r === l)
        return null;
      r = s;
    }
  }
  function n() {
    const i = process.argv.filter((r) => r.indexOf("--user-data-dir=") === 0);
    return i.length === 0 || typeof i[0] != "string" ? null : i[0].replace("--user-data-dir=", "");
  }
  function e() {
    var i;
    try {
      return (i = require.main) == null ? void 0 : i.filename;
    } catch {
      return;
    }
  }
  return lo;
}
var uo, uu;
function pc() {
  if (uu) return uo;
  uu = 1;
  const o = gr, h = gt, d = be, f = Jd();
  class u {
    constructor() {
      Ae(this, "appName");
      Ae(this, "appPackageJson");
      Ae(this, "platform", process.platform);
    }
    getAppLogPath(e = this.getAppName()) {
      return this.platform === "darwin" ? d.join(this.getSystemPathHome(), "Library/Logs", e) : d.join(this.getAppUserDataPath(e), "logs");
    }
    getAppName() {
      var i;
      const e = this.appName || ((i = this.getAppPackageJson()) == null ? void 0 : i.name);
      if (!e)
        throw new Error(
          "electron-log can't determine the app name. It tried these methods:\n1. Use `electron.app.name`\n2. Use productName or name from the nearest package.json`\nYou can also set it through log.transports.file.setAppName()"
        );
      return e;
    }
    /**
     * @private
     * @returns {undefined}
     */
    getAppPackageJson() {
      return typeof this.appPackageJson != "object" && (this.appPackageJson = f.findAndReadPackageJson()), this.appPackageJson;
    }
    getAppUserDataPath(e = this.getAppName()) {
      return e ? d.join(this.getSystemPathAppData(), e) : void 0;
    }
    getAppVersion() {
      var e;
      return (e = this.getAppPackageJson()) == null ? void 0 : e.version;
    }
    getElectronLogPath() {
      return this.getAppLogPath();
    }
    getMacOsVersion() {
      const e = Number(h.release().split(".")[0]);
      return e <= 19 ? `10.${e - 4}` : e - 9;
    }
    /**
     * @protected
     * @returns {string}
     */
    getOsVersion() {
      let e = h.type().replace("_", " "), i = h.release();
      return e === "Darwin" && (e = "macOS", i = this.getMacOsVersion()), `${e} ${i}`;
    }
    /**
     * @return {PathVariables}
     */
    getPathVariables() {
      const e = this.getAppName(), i = this.getAppVersion(), t = this;
      return {
        appData: this.getSystemPathAppData(),
        appName: e,
        appVersion: i,
        get electronDefaultDir() {
          return t.getElectronLogPath();
        },
        home: this.getSystemPathHome(),
        libraryDefaultDir: this.getAppLogPath(e),
        libraryTemplate: this.getAppLogPath("{appName}"),
        temp: this.getSystemPathTemp(),
        userData: this.getAppUserDataPath(e)
      };
    }
    getSystemPathAppData() {
      const e = this.getSystemPathHome();
      switch (this.platform) {
        case "darwin":
          return d.join(e, "Library/Application Support");
        case "win32":
          return process.env.APPDATA || d.join(e, "AppData/Roaming");
        default:
          return process.env.XDG_CONFIG_HOME || d.join(e, ".config");
      }
    }
    getSystemPathHome() {
      var e;
      return ((e = h.homedir) == null ? void 0 : e.call(h)) || process.env.HOME;
    }
    getSystemPathTemp() {
      return h.tmpdir();
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: void 0,
        os: this.getOsVersion()
      };
    }
    isDev() {
      return process.env.NODE_ENV === "development" || process.env.ELECTRON_IS_DEV === "1";
    }
    isElectron() {
      return !!process.versions.electron;
    }
    onAppEvent(e, i) {
    }
    onAppReady(e) {
      e();
    }
    onEveryWebContentsEvent(e, i) {
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(e, i) {
    }
    onIpcInvoke(e, i) {
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(e, i = console.error) {
      const r = { darwin: "open", win32: "start", linux: "xdg-open" }[process.platform] || "xdg-open";
      o.exec(`${r} ${e}`, {}, (c) => {
        c && i(c);
      });
    }
    setAppName(e) {
      this.appName = e;
    }
    setPlatform(e) {
      this.platform = e;
    }
    setPreloadFileForSessions({
      filePath: e,
      // eslint-disable-line no-unused-vars
      includeFutureSession: i = !0,
      // eslint-disable-line no-unused-vars
      getSessions: t = () => []
      // eslint-disable-line no-unused-vars
    }) {
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(e, i) {
    }
    showErrorBox(e, i) {
    }
  }
  return uo = u, uo;
}
var co, cu;
function Kd() {
  if (cu) return co;
  cu = 1;
  const o = be, h = pc();
  class d extends h {
    /**
     * @param {object} options
     * @param {typeof Electron} [options.electron]
     */
    constructor({ electron: n } = {}) {
      super();
      /**
       * @type {typeof Electron}
       */
      Ae(this, "electron");
      this.electron = n;
    }
    getAppName() {
      var e, i;
      let n;
      try {
        n = this.appName || ((e = this.electron.app) == null ? void 0 : e.name) || ((i = this.electron.app) == null ? void 0 : i.getName());
      } catch {
      }
      return n || super.getAppName();
    }
    getAppUserDataPath(n) {
      return this.getPath("userData") || super.getAppUserDataPath(n);
    }
    getAppVersion() {
      var e;
      let n;
      try {
        n = (e = this.electron.app) == null ? void 0 : e.getVersion();
      } catch {
      }
      return n || super.getAppVersion();
    }
    getElectronLogPath() {
      return this.getPath("logs") || super.getElectronLogPath();
    }
    /**
     * @private
     * @param {any} name
     * @returns {string|undefined}
     */
    getPath(n) {
      var e;
      try {
        return (e = this.electron.app) == null ? void 0 : e.getPath(n);
      } catch {
        return;
      }
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: `Electron ${process.versions.electron}`,
        os: this.getOsVersion()
      };
    }
    getSystemPathAppData() {
      return this.getPath("appData") || super.getSystemPathAppData();
    }
    isDev() {
      var n;
      return ((n = this.electron.app) == null ? void 0 : n.isPackaged) !== void 0 ? !this.electron.app.isPackaged : typeof process.execPath == "string" ? o.basename(process.execPath).toLowerCase().startsWith("electron") : super.isDev();
    }
    onAppEvent(n, e) {
      var i;
      return (i = this.electron.app) == null || i.on(n, e), () => {
        var t;
        (t = this.electron.app) == null || t.off(n, e);
      };
    }
    onAppReady(n) {
      var e, i, t;
      (e = this.electron.app) != null && e.isReady() ? n() : (i = this.electron.app) != null && i.once ? (t = this.electron.app) == null || t.once("ready", n) : n();
    }
    onEveryWebContentsEvent(n, e) {
      var t, r, c;
      return (r = (t = this.electron.webContents) == null ? void 0 : t.getAllWebContents()) == null || r.forEach((l) => {
        l.on(n, e);
      }), (c = this.electron.app) == null || c.on("web-contents-created", i), () => {
        var l, s;
        (l = this.electron.webContents) == null || l.getAllWebContents().forEach((p) => {
          p.off(n, e);
        }), (s = this.electron.app) == null || s.off("web-contents-created", i);
      };
      function i(l, s) {
        s.on(n, e);
      }
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(n, e) {
      var i;
      (i = this.electron.ipcMain) == null || i.on(n, e);
    }
    onIpcInvoke(n, e) {
      var i, t;
      (t = (i = this.electron.ipcMain) == null ? void 0 : i.handle) == null || t.call(i, n, e);
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(n, e = console.error) {
      var i;
      (i = this.electron.shell) == null || i.openExternal(n).catch(e);
    }
    setPreloadFileForSessions({
      filePath: n,
      includeFutureSession: e = !0,
      getSessions: i = () => {
        var t;
        return [(t = this.electron.session) == null ? void 0 : t.defaultSession];
      }
    }) {
      for (const r of i().filter(Boolean))
        t(r);
      e && this.onAppEvent("session-created", (r) => {
        t(r);
      });
      function t(r) {
        r.setPreloads([...r.getPreloads(), n]);
      }
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(n, e) {
      var i, t;
      (t = (i = this.electron.BrowserWindow) == null ? void 0 : i.getAllWindows()) == null || t.forEach((r) => {
        var c;
        ((c = r.webContents) == null ? void 0 : c.isDestroyed()) === !1 && r.webContents.send(n, e);
      });
    }
    showErrorBox(n, e) {
      var i;
      (i = this.electron.dialog) == null || i.showErrorBox(n, e);
    }
  }
  return co = d, co;
}
var fo, fu;
function Qd() {
  if (fu) return fo;
  fu = 1;
  const o = Ye, h = gt, d = be, f = dc();
  fo = {
    initialize({
      externalApi: e,
      getSessions: i,
      includeFutureSession: t,
      logger: r,
      preload: c = !0,
      spyRendererConsole: l = !1
    }) {
      e.onAppReady(() => {
        try {
          c && u({
            externalApi: e,
            getSessions: i,
            includeFutureSession: t,
            preloadOption: c
          }), l && n({ externalApi: e, logger: r });
        } catch (s) {
          r.warn(s);
        }
      });
    }
  };
  function u({
    externalApi: e,
    getSessions: i,
    includeFutureSession: t,
    preloadOption: r
  }) {
    let c = typeof r == "string" ? r : void 0;
    try {
      c = d.resolve(
        __dirname,
        "../renderer/electron-log-preload.js"
      );
    } catch {
    }
    if (!c || !o.existsSync(c)) {
      c = d.join(
        e.getAppUserDataPath() || h.tmpdir(),
        "electron-log-preload.js"
      );
      const l = `
      try {
        (${f.toString()})(require('electron'));
      } catch(e) {
        console.error(e);
      }
    `;
      o.writeFileSync(c, l, "utf8");
    }
    e.setPreloadFileForSessions({
      filePath: c,
      includeFutureSession: t,
      getSessions: i
    });
  }
  function n({ externalApi: e, logger: i }) {
    const t = ["verbose", "info", "warning", "error"];
    e.onEveryWebContentsEvent(
      "console-message",
      (r, c, l) => {
        i.processMessage({
          data: [l],
          level: t[c],
          variables: { processType: "renderer" }
        });
      }
    );
  }
  return fo;
}
var ho, du;
function Zd() {
  if (du) return ho;
  du = 1;
  class o {
    constructor({
      externalApi: f,
      logFn: u = void 0,
      onError: n = void 0,
      showDialog: e = void 0
    } = {}) {
      Ae(this, "externalApi");
      Ae(this, "isActive", !1);
      Ae(this, "logFn");
      Ae(this, "onError");
      Ae(this, "showDialog", !0);
      this.createIssue = this.createIssue.bind(this), this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.setOptions({ externalApi: f, logFn: u, onError: n, showDialog: e }), this.startCatching = this.startCatching.bind(this), this.stopCatching = this.stopCatching.bind(this);
    }
    handle(f, {
      logFn: u = this.logFn,
      onError: n = this.onError,
      processType: e = "browser",
      showDialog: i = this.showDialog,
      errorName: t = ""
    } = {}) {
      var r;
      f = h(f);
      try {
        if (typeof n == "function") {
          const c = ((r = this.externalApi) == null ? void 0 : r.getVersions()) || {}, l = this.createIssue;
          if (n({
            createIssue: l,
            error: f,
            errorName: t,
            processType: e,
            versions: c
          }) === !1)
            return;
        }
        t ? u(t, f) : u(f), i && !t.includes("rejection") && this.externalApi && this.externalApi.showErrorBox(
          `A JavaScript error occurred in the ${e} process`,
          f.stack
        );
      } catch {
        console.error(f);
      }
    }
    setOptions({ externalApi: f, logFn: u, onError: n, showDialog: e }) {
      typeof f == "object" && (this.externalApi = f), typeof u == "function" && (this.logFn = u), typeof n == "function" && (this.onError = n), typeof e == "boolean" && (this.showDialog = e);
    }
    startCatching({ onError: f, showDialog: u } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: f, showDialog: u }), process.on("uncaughtException", this.handleError), process.on("unhandledRejection", this.handleRejection));
    }
    stopCatching() {
      this.isActive = !1, process.removeListener("uncaughtException", this.handleError), process.removeListener("unhandledRejection", this.handleRejection);
    }
    createIssue(f, u) {
      var n;
      (n = this.externalApi) == null || n.openUrl(
        `${f}?${new URLSearchParams(u).toString()}`
      );
    }
    handleError(f) {
      this.handle(f, { errorName: "Unhandled" });
    }
    handleRejection(f) {
      const u = f instanceof Error ? f : new Error(JSON.stringify(f));
      this.handle(u, { errorName: "Unhandled rejection" });
    }
  }
  function h(d) {
    if (d instanceof Error)
      return d;
    if (d && typeof d == "object") {
      if (d.message)
        return Object.assign(new Error(d.message), d);
      try {
        return new Error(JSON.stringify(d));
      } catch (f) {
        return new Error(`Couldn't normalize error ${String(d)}: ${f}`);
      }
    }
    return new Error(`Can't normalize error ${String(d)}`);
  }
  return ho = o, ho;
}
var po, hu;
function eh() {
  if (hu) return po;
  hu = 1;
  class o {
    constructor(d = {}) {
      Ae(this, "disposers", []);
      Ae(this, "format", "{eventSource}#{eventName}:");
      Ae(this, "formatters", {
        app: {
          "certificate-error": ({ args: d }) => this.arrayToObject(d.slice(1, 4), [
            "url",
            "error",
            "certificate"
          ]),
          "child-process-gone": ({ args: d }) => d.length === 1 ? d[0] : d,
          "render-process-gone": ({ args: [d, f] }) => f && typeof f == "object" ? { ...f, ...this.getWebContentsDetails(d) } : []
        },
        webContents: {
          "console-message": ({ args: [d, f, u, n] }) => {
            if (!(d < 3))
              return { message: f, source: `${n}:${u}` };
          },
          "did-fail-load": ({ args: d }) => this.arrayToObject(d, [
            "errorCode",
            "errorDescription",
            "validatedURL",
            "isMainFrame",
            "frameProcessId",
            "frameRoutingId"
          ]),
          "did-fail-provisional-load": ({ args: d }) => this.arrayToObject(d, [
            "errorCode",
            "errorDescription",
            "validatedURL",
            "isMainFrame",
            "frameProcessId",
            "frameRoutingId"
          ]),
          "plugin-crashed": ({ args: d }) => this.arrayToObject(d, ["name", "version"]),
          "preload-error": ({ args: d }) => this.arrayToObject(d, ["preloadPath", "error"])
        }
      });
      Ae(this, "events", {
        app: {
          "certificate-error": !0,
          "child-process-gone": !0,
          "render-process-gone": !0
        },
        webContents: {
          // 'console-message': true,
          "did-fail-load": !0,
          "did-fail-provisional-load": !0,
          "plugin-crashed": !0,
          "preload-error": !0,
          unresponsive: !0
        }
      });
      Ae(this, "externalApi");
      Ae(this, "level", "error");
      Ae(this, "scope", "");
      this.setOptions(d);
    }
    setOptions({
      events: d,
      externalApi: f,
      level: u,
      logger: n,
      format: e,
      formatters: i,
      scope: t
    }) {
      typeof d == "object" && (this.events = d), typeof f == "object" && (this.externalApi = f), typeof u == "string" && (this.level = u), typeof n == "object" && (this.logger = n), (typeof e == "string" || typeof e == "function") && (this.format = e), typeof i == "object" && (this.formatters = i), typeof t == "string" && (this.scope = t);
    }
    startLogging(d = {}) {
      this.setOptions(d), this.disposeListeners();
      for (const f of this.getEventNames(this.events.app))
        this.disposers.push(
          this.externalApi.onAppEvent(f, (...u) => {
            this.handleEvent({ eventSource: "app", eventName: f, handlerArgs: u });
          })
        );
      for (const f of this.getEventNames(this.events.webContents))
        this.disposers.push(
          this.externalApi.onEveryWebContentsEvent(
            f,
            (...u) => {
              this.handleEvent(
                { eventSource: "webContents", eventName: f, handlerArgs: u }
              );
            }
          )
        );
    }
    stopLogging() {
      this.disposeListeners();
    }
    arrayToObject(d, f) {
      const u = {};
      return f.forEach((n, e) => {
        u[n] = d[e];
      }), d.length > f.length && (u.unknownArgs = d.slice(f.length)), u;
    }
    disposeListeners() {
      this.disposers.forEach((d) => d()), this.disposers = [];
    }
    formatEventLog({ eventName: d, eventSource: f, handlerArgs: u }) {
      var l;
      const [n, ...e] = u;
      if (typeof this.format == "function")
        return this.format({ args: e, event: n, eventName: d, eventSource: f });
      const i = (l = this.formatters[f]) == null ? void 0 : l[d];
      let t = e;
      if (typeof i == "function" && (t = i({ args: e, event: n, eventName: d, eventSource: f })), !t)
        return;
      const r = {};
      return Array.isArray(t) ? r.args = t : typeof t == "object" && Object.assign(r, t), f === "webContents" && Object.assign(r, this.getWebContentsDetails(n == null ? void 0 : n.sender)), [this.format.replace("{eventSource}", f === "app" ? "App" : "WebContents").replace("{eventName}", d), r];
    }
    getEventNames(d) {
      return !d || typeof d != "object" ? [] : Object.entries(d).filter(([f, u]) => u).map(([f]) => f);
    }
    getWebContentsDetails(d) {
      if (!(d != null && d.loadURL))
        return {};
      try {
        return {
          webContents: {
            id: d.id,
            url: d.getURL()
          }
        };
      } catch {
        return {};
      }
    }
    handleEvent({ eventName: d, eventSource: f, handlerArgs: u }) {
      var e;
      const n = this.formatEventLog({ eventName: d, eventSource: f, handlerArgs: u });
      if (n) {
        const i = this.scope ? this.logger.scope(this.scope) : this.logger;
        (e = i == null ? void 0 : i[this.level]) == null || e.call(i, ...n);
      }
    }
  }
  return po = o, po;
}
var mo, pu;
function _r() {
  if (pu) return mo;
  pu = 1, mo = { transform: o };
  function o({
    logger: h,
    message: d,
    transport: f,
    initialData: u = (d == null ? void 0 : d.data) || [],
    transforms: n = f == null ? void 0 : f.transforms
  }) {
    return n.reduce((e, i) => typeof i == "function" ? i({ data: e, logger: h, message: d, transport: f }) : e, u);
  }
  return mo;
}
var go, mu;
function mc() {
  if (mu) return go;
  mu = 1;
  const { transform: o } = _r();
  go = {
    concatFirstStringElements: h,
    formatScope: f,
    formatText: n,
    formatVariables: u,
    timeZoneFromOffset: d,
    format({ message: e, logger: i, transport: t, data: r = e == null ? void 0 : e.data }) {
      switch (typeof t.format) {
        case "string":
          return o({
            message: e,
            logger: i,
            transforms: [u, f, n],
            transport: t,
            initialData: [t.format, ...r]
          });
        case "function":
          return t.format({
            data: r,
            level: (e == null ? void 0 : e.level) || "info",
            logger: i,
            message: e,
            transport: t
          });
        default:
          return r;
      }
    }
  };
  function h({ data: e }) {
    return typeof e[0] != "string" || typeof e[1] != "string" || e[0].match(/%[1cdfiOos]/) ? e : [`${e[0]} ${e[1]}`, ...e.slice(2)];
  }
  function d(e) {
    const i = Math.abs(e), t = e > 0 ? "-" : "+", r = Math.floor(i / 60).toString().padStart(2, "0"), c = (i % 60).toString().padStart(2, "0");
    return `${t}${r}:${c}`;
  }
  function f({ data: e, logger: i, message: t }) {
    const { defaultLabel: r, labelLength: c } = (i == null ? void 0 : i.scope) || {}, l = e[0];
    let s = t.scope;
    s || (s = r);
    let p;
    return s === "" ? p = c > 0 ? "".padEnd(c + 3) : "" : typeof s == "string" ? p = ` (${s})`.padEnd(c + 3) : p = "", e[0] = l.replace("{scope}", p), e;
  }
  function u({ data: e, message: i }) {
    let t = e[0];
    if (typeof t != "string")
      return e;
    t = t.replace("{level}]", `${i.level}]`.padEnd(6, " "));
    const r = i.date || /* @__PURE__ */ new Date();
    return e[0] = t.replace(/\{(\w+)}/g, (c, l) => {
      var s;
      switch (l) {
        case "level":
          return i.level || "info";
        case "logId":
          return i.logId;
        case "y":
          return r.getFullYear().toString(10);
        case "m":
          return (r.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return r.getDate().toString(10).padStart(2, "0");
        case "h":
          return r.getHours().toString(10).padStart(2, "0");
        case "i":
          return r.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return r.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return r.getMilliseconds().toString(10).padStart(3, "0");
        case "z":
          return d(r.getTimezoneOffset());
        case "iso":
          return r.toISOString();
        default:
          return ((s = i.variables) == null ? void 0 : s[l]) || c;
      }
    }).trim(), e;
  }
  function n({ data: e }) {
    const i = e[0];
    if (typeof i != "string")
      return e;
    if (i.lastIndexOf("{text}") === i.length - 6)
      return e[0] = i.replace(/\s?{text}/, ""), e[0] === "" && e.shift(), e;
    const r = i.split("{text}");
    let c = [];
    return r[0] !== "" && c.push(r[0]), c = c.concat(e.slice(1)), r[1] !== "" && c.push(r[1]), c;
  }
  return go;
}
var vo = { exports: {} }, gu;
function Kr() {
  return gu || (gu = 1, function(o) {
    const h = Hr;
    o.exports = {
      serialize: f,
      maxDepth({ data: u, transport: n, depth: e = (n == null ? void 0 : n.depth) ?? 6 }) {
        if (!u)
          return u;
        if (e < 1)
          return Array.isArray(u) ? "[array]" : typeof u == "object" && u ? "[object]" : u;
        if (Array.isArray(u))
          return u.map((t) => o.exports.maxDepth({
            data: t,
            depth: e - 1
          }));
        if (typeof u != "object" || u && typeof u.toISOString == "function")
          return u;
        if (u === null)
          return null;
        if (u instanceof Error)
          return u;
        const i = {};
        for (const t in u)
          Object.prototype.hasOwnProperty.call(u, t) && (i[t] = o.exports.maxDepth({
            data: u[t],
            depth: e - 1
          }));
        return i;
      },
      toJSON({ data: u }) {
        return JSON.parse(JSON.stringify(u, d()));
      },
      toString({ data: u, transport: n }) {
        const e = (n == null ? void 0 : n.inspectOptions) || {}, i = u.map((t) => {
          if (t !== void 0)
            try {
              const r = JSON.stringify(t, d(), "  ");
              return r === void 0 ? void 0 : JSON.parse(r);
            } catch {
              return t;
            }
        });
        return h.formatWithOptions(e, ...i);
      }
    };
    function d(u = {}) {
      const n = /* @__PURE__ */ new WeakSet();
      return function(e, i) {
        if (typeof i == "object" && i !== null) {
          if (n.has(i))
            return;
          n.add(i);
        }
        return f(e, i, u);
      };
    }
    function f(u, n, e = {}) {
      const i = (e == null ? void 0 : e.serializeMapAndSet) !== !1;
      return n instanceof Error ? n.stack : n && (typeof n == "function" ? `[function] ${n.toString()}` : n instanceof Date ? n.toISOString() : i && n instanceof Map && Object.fromEntries ? Object.fromEntries(n) : i && n instanceof Set && Array.from ? Array.from(n) : n);
    }
  }(vo)), vo.exports;
}
var yo, vu;
function Go() {
  if (vu) return yo;
  vu = 1, yo = {
    transformStyles: f,
    applyAnsiStyles({ data: u }) {
      return f(u, h, d);
    },
    removeStyles({ data: u }) {
      return f(u, () => "");
    }
  };
  const o = {
    unset: "\x1B[0m",
    black: "\x1B[30m",
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    white: "\x1B[37m"
  };
  function h(u) {
    const n = u.replace(/color:\s*(\w+).*/, "$1").toLowerCase();
    return o[n] || "";
  }
  function d(u) {
    return u + o.unset;
  }
  function f(u, n, e) {
    const i = {};
    return u.reduce((t, r, c, l) => {
      if (i[c])
        return t;
      if (typeof r == "string") {
        let s = c, p = !1;
        r = r.replace(/%[1cdfiOos]/g, (g) => {
          if (s += 1, g !== "%c")
            return g;
          const E = l[s];
          return typeof E == "string" ? (i[s] = !0, p = !0, n(E, r)) : g;
        }), p && e && (r = e(r));
      }
      return t.push(r), t;
    }, []);
  }
  return yo;
}
var Eo, yu;
function th() {
  if (yu) return Eo;
  yu = 1;
  const { concatFirstStringElements: o, format: h } = mc(), { maxDepth: d, toJSON: f } = Kr(), { applyAnsiStyles: u, removeStyles: n } = Go(), { transform: e } = _r(), i = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  Eo = c;
  const r = `%c{h}:{i}:{s}.{ms}{scope}%c ${process.platform === "win32" ? ">" : "›"} {text}`;
  Object.assign(c, {
    DEFAULT_FORMAT: r
  });
  function c(E) {
    return Object.assign(m, {
      format: r,
      level: "silly",
      transforms: [
        l,
        h,
        p,
        o,
        d,
        f
      ],
      useStyles: process.env.FORCE_STYLES,
      writeFn({ message: w }) {
        (i[w.level] || i.info)(...w.data);
      }
    });
    function m(w) {
      const T = e({ logger: E, message: w, transport: m });
      m.writeFn({
        message: { ...w, data: T }
      });
    }
  }
  function l({ data: E, message: m, transport: w }) {
    return w.format !== r ? E : [`color:${g(m.level)}`, "color:unset", ...E];
  }
  function s(E, m) {
    if (typeof E == "boolean")
      return E;
    const T = m === "error" || m === "warn" ? process.stderr : process.stdout;
    return T && T.isTTY;
  }
  function p(E) {
    const { message: m, transport: w } = E;
    return (s(w.useStyles, m.level) ? u : n)(E);
  }
  function g(E) {
    const m = { error: "red", warn: "yellow", info: "cyan", default: "unset" };
    return m[E] || m.default;
  }
  return Eo;
}
var wo, Eu;
function gc() {
  if (Eu) return wo;
  Eu = 1;
  const o = jr, h = Ye, d = gt;
  class f extends o {
    constructor({
      path: i,
      writeOptions: t = { encoding: "utf8", flag: "a", mode: 438 },
      writeAsync: r = !1
    }) {
      super();
      Ae(this, "asyncWriteQueue", []);
      Ae(this, "bytesWritten", 0);
      Ae(this, "hasActiveAsyncWriting", !1);
      Ae(this, "path", null);
      Ae(this, "initialSize");
      Ae(this, "writeOptions", null);
      Ae(this, "writeAsync", !1);
      this.path = i, this.writeOptions = t, this.writeAsync = r;
    }
    get size() {
      return this.getSize();
    }
    clear() {
      try {
        return h.writeFileSync(this.path, "", {
          mode: this.writeOptions.mode,
          flag: "w"
        }), this.reset(), !0;
      } catch (i) {
        return i.code === "ENOENT" ? !0 : (this.emit("error", i, this), !1);
      }
    }
    crop(i) {
      try {
        const t = u(this.path, i || 4096);
        this.clear(), this.writeLine(`[log cropped]${d.EOL}${t}`);
      } catch (t) {
        this.emit(
          "error",
          new Error(`Couldn't crop file ${this.path}. ${t.message}`),
          this
        );
      }
    }
    getSize() {
      if (this.initialSize === void 0)
        try {
          const i = h.statSync(this.path);
          this.initialSize = i.size;
        } catch {
          this.initialSize = 0;
        }
      return this.initialSize + this.bytesWritten;
    }
    increaseBytesWrittenCounter(i) {
      this.bytesWritten += Buffer.byteLength(i, this.writeOptions.encoding);
    }
    isNull() {
      return !1;
    }
    nextAsyncWrite() {
      const i = this;
      if (this.hasActiveAsyncWriting || this.asyncWriteQueue.length === 0)
        return;
      const t = this.asyncWriteQueue.join("");
      this.asyncWriteQueue = [], this.hasActiveAsyncWriting = !0, h.writeFile(this.path, t, this.writeOptions, (r) => {
        i.hasActiveAsyncWriting = !1, r ? i.emit(
          "error",
          new Error(`Couldn't write to ${i.path}. ${r.message}`),
          this
        ) : i.increaseBytesWrittenCounter(t), i.nextAsyncWrite();
      });
    }
    reset() {
      this.initialSize = void 0, this.bytesWritten = 0;
    }
    toString() {
      return this.path;
    }
    writeLine(i) {
      if (i += d.EOL, this.writeAsync) {
        this.asyncWriteQueue.push(i), this.nextAsyncWrite();
        return;
      }
      try {
        h.writeFileSync(this.path, i, this.writeOptions), this.increaseBytesWrittenCounter(i);
      } catch (t) {
        this.emit(
          "error",
          new Error(`Couldn't write to ${this.path}. ${t.message}`),
          this
        );
      }
    }
  }
  wo = f;
  function u(n, e) {
    const i = Buffer.alloc(e), t = h.statSync(n), r = Math.min(t.size, e), c = Math.max(0, t.size - e), l = h.openSync(n, "r"), s = h.readSync(l, i, 0, r, c);
    return h.closeSync(l), i.toString("utf8", 0, s);
  }
  return wo;
}
var _o, wu;
function rh() {
  if (wu) return _o;
  wu = 1;
  const o = gc();
  class h extends o {
    clear() {
    }
    crop() {
    }
    getSize() {
      return 0;
    }
    isNull() {
      return !0;
    }
    writeLine() {
    }
  }
  return _o = h, _o;
}
var So, _u;
function nh() {
  if (_u) return So;
  _u = 1;
  const o = jr, h = Ye, d = be, f = gc(), u = rh();
  class n extends o {
    constructor() {
      super();
      Ae(this, "store", {});
      this.emitError = this.emitError.bind(this);
    }
    /**
     * Provide a File object corresponding to the filePath
     * @param {string} filePath
     * @param {WriteOptions} [writeOptions]
     * @param {boolean} [writeAsync]
     * @return {File}
     */
    provide({ filePath: t, writeOptions: r = {}, writeAsync: c = !1 }) {
      let l;
      try {
        if (t = d.resolve(t), this.store[t])
          return this.store[t];
        l = this.createFile({ filePath: t, writeOptions: r, writeAsync: c });
      } catch (s) {
        l = new u({ path: t }), this.emitError(s, l);
      }
      return l.on("error", this.emitError), this.store[t] = l, l;
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @param {boolean} async
     * @return {File}
     * @private
     */
    createFile({ filePath: t, writeOptions: r, writeAsync: c }) {
      return this.testFileWriting({ filePath: t, writeOptions: r }), new f({ path: t, writeOptions: r, writeAsync: c });
    }
    /**
     * @param {Error} error
     * @param {File} file
     * @private
     */
    emitError(t, r) {
      this.emit("error", t, r);
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @private
     */
    testFileWriting({ filePath: t, writeOptions: r }) {
      h.mkdirSync(d.dirname(t), { recursive: !0 }), h.writeFileSync(t, "", { flag: "a", mode: r.mode });
    }
  }
  return So = n, So;
}
var Ao, Su;
function ih() {
  if (Su) return Ao;
  Su = 1;
  const o = Ye, h = gt, d = be, f = nh(), { transform: u } = _r(), { removeStyles: n } = Go(), {
    format: e,
    concatFirstStringElements: i
  } = mc(), { toString: t } = Kr();
  Ao = c;
  const r = new f();
  function c(s, { registry: p = r, externalApi: g } = {}) {
    let E;
    return p.listenerCount("error") < 1 && p.on("error", (U, R) => {
      T(`Can't write to ${R}`, U);
    }), Object.assign(m, {
      fileName: l(s.variables.processType),
      format: "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}",
      getFile: O,
      inspectOptions: { depth: 5 },
      level: "silly",
      maxSize: 1024 ** 2,
      readAllLogs: P,
      sync: !0,
      transforms: [n, e, i, t],
      writeOptions: { flag: "a", mode: 438, encoding: "utf8" },
      archiveLogFn(U) {
        const R = U.toString(), S = d.parse(R);
        try {
          o.renameSync(R, d.join(S.dir, `${S.name}.old${S.ext}`));
        } catch (b) {
          T("Could not rotate log", b);
          const y = Math.round(m.maxSize / 4);
          U.crop(Math.min(y, 256 * 1024));
        }
      },
      resolvePathFn(U) {
        return d.join(U.libraryDefaultDir, U.fileName);
      },
      setAppName(U) {
        s.dependencies.externalApi.setAppName(U);
      }
    });
    function m(U) {
      const R = O(U);
      m.maxSize > 0 && R.size > m.maxSize && (m.archiveLogFn(R), R.reset());
      const b = u({ logger: s, message: U, transport: m });
      R.writeLine(b);
    }
    function w() {
      E || (E = Object.create(
        Object.prototype,
        {
          ...Object.getOwnPropertyDescriptors(
            g.getPathVariables()
          ),
          fileName: {
            get() {
              return m.fileName;
            },
            enumerable: !0
          }
        }
      ), typeof m.archiveLog == "function" && (m.archiveLogFn = m.archiveLog, T("archiveLog is deprecated. Use archiveLogFn instead")), typeof m.resolvePath == "function" && (m.resolvePathFn = m.resolvePath, T("resolvePath is deprecated. Use resolvePathFn instead")));
    }
    function T(U, R = null, S = "error") {
      const b = [`electron-log.transports.file: ${U}`];
      R && b.push(R), s.transports.console({ data: b, date: /* @__PURE__ */ new Date(), level: S });
    }
    function O(U) {
      w();
      const R = m.resolvePathFn(E, U);
      return p.provide({
        filePath: R,
        writeAsync: !m.sync,
        writeOptions: m.writeOptions
      });
    }
    function P({ fileFilter: U = (R) => R.endsWith(".log") } = {}) {
      w();
      const R = d.dirname(m.resolvePathFn(E));
      return o.existsSync(R) ? o.readdirSync(R).map((S) => d.join(R, S)).filter(U).map((S) => {
        try {
          return {
            path: S,
            lines: o.readFileSync(S, "utf8").split(h.EOL)
          };
        } catch {
          return null;
        }
      }).filter(Boolean) : [];
    }
  }
  function l(s = process.type) {
    switch (s) {
      case "renderer":
        return "renderer.log";
      case "worker":
        return "worker.log";
      default:
        return "main.log";
    }
  }
  return Ao;
}
var bo, Au;
function oh() {
  if (Au) return bo;
  Au = 1;
  const { maxDepth: o, toJSON: h } = Kr(), { transform: d } = _r();
  bo = f;
  function f(u, { externalApi: n }) {
    return Object.assign(e, {
      depth: 3,
      eventId: "__ELECTRON_LOG_IPC__",
      level: u.isDev ? "silly" : !1,
      transforms: [h, o]
    }), n != null && n.isElectron() ? e : void 0;
    function e(i) {
      var t;
      ((t = i == null ? void 0 : i.variables) == null ? void 0 : t.processType) !== "renderer" && (n == null || n.sendIpc(e.eventId, {
        ...i,
        data: d({ logger: u, message: i, transport: e })
      }));
    }
  }
  return bo;
}
var Ro, bu;
function sh() {
  if (bu) return Ro;
  bu = 1;
  const o = xu, h = vf, { transform: d } = _r(), { removeStyles: f } = Go(), { toJSON: u, maxDepth: n } = Kr();
  Ro = e;
  function e(i) {
    return Object.assign(t, {
      client: { name: "electron-application" },
      depth: 6,
      level: !1,
      requestOptions: {},
      transforms: [f, u, n],
      makeBodyFn({ message: r }) {
        return JSON.stringify({
          client: t.client,
          data: r.data,
          date: r.date.getTime(),
          level: r.level,
          scope: r.scope,
          variables: r.variables
        });
      },
      processErrorFn({ error: r }) {
        i.processMessage(
          {
            data: [`electron-log: can't POST ${t.url}`, r],
            level: "warn"
          },
          { transports: ["console", "file"] }
        );
      },
      sendRequestFn({ serverUrl: r, requestOptions: c, body: l }) {
        const p = (r.startsWith("https:") ? h : o).request(r, {
          method: "POST",
          ...c,
          headers: {
            "Content-Type": "application/json",
            "Content-Length": l.length,
            ...c.headers
          }
        });
        return p.write(l), p.end(), p;
      }
    });
    function t(r) {
      if (!t.url)
        return;
      const c = t.makeBodyFn({
        logger: i,
        message: { ...r, data: d({ logger: i, message: r, transport: t }) },
        transport: t
      }), l = t.sendRequestFn({
        serverUrl: t.url,
        requestOptions: t.requestOptions,
        body: Buffer.from(c, "utf8")
      });
      l.on("error", (s) => t.processErrorFn({
        error: s,
        logger: i,
        message: r,
        request: l,
        transport: t
      }));
    }
  }
  return Ro;
}
var To, Ru;
function vc() {
  if (Ru) return To;
  Ru = 1;
  const o = hc(), h = Zd(), d = eh(), f = th(), u = ih(), n = oh(), e = sh();
  To = i;
  function i({ dependencies: t, initializeFn: r }) {
    var l;
    const c = new o({
      dependencies: t,
      errorHandler: new h(),
      eventLogger: new d(),
      initializeFn: r,
      isDev: (l = t.externalApi) == null ? void 0 : l.isDev(),
      logId: "default",
      transportFactories: {
        console: f,
        file: u,
        ipc: n,
        remote: e
      },
      variables: {
        processType: "main"
      }
    });
    return c.default = c, c.Logger = o, c.processInternalErrorFn = (s) => {
      c.transports.console.writeFn({
        message: {
          data: ["Unhandled electron-log error", s],
          level: "error"
        }
      });
    }, c;
  }
  return To;
}
var Co, Tu;
function ah() {
  if (Tu) return Co;
  Tu = 1;
  const o = mt, h = Kd(), { initialize: d } = Qd(), f = vc(), u = new h({ electron: o }), n = f({
    dependencies: { externalApi: u },
    initializeFn: d
  });
  Co = n, u.onIpc("__ELECTRON_LOG__", (i, t) => {
    t.scope && n.Logger.getInstance(t).scope(t.scope);
    const r = new Date(t.date);
    e({
      ...t,
      date: r.getTime() ? r : /* @__PURE__ */ new Date()
    });
  }), u.onIpcInvoke("__ELECTRON_LOG__", (i, { cmd: t = "", logId: r }) => {
    switch (t) {
      case "getOptions":
        return {
          levels: n.Logger.getInstance({ logId: r }).levels,
          logId: r
        };
      default:
        return e({ data: [`Unknown cmd '${t}'`], level: "error" }), {};
    }
  });
  function e(i) {
    var t;
    (t = n.Logger.getInstance(i)) == null || t.processMessage(i);
  }
  return Co;
}
var Oo, Cu;
function lh() {
  if (Cu) return Oo;
  Cu = 1;
  const o = pc(), h = vc(), d = new o();
  return Oo = h({
    dependencies: { externalApi: d }
  }), Oo;
}
var Ou;
function uh() {
  if (Ou) return dr.exports;
  Ou = 1;
  const o = typeof process > "u" || process.type === "renderer" || process.type === "worker", h = typeof process == "object" && process.type === "browser";
  return o ? (dc(), dr.exports = Xd()) : h ? dr.exports = ah() : dr.exports = lh(), dr.exports;
}
var ch = uh();
const yt = /* @__PURE__ */ yf(ch);
it.autoUpdater.logger = yt;
it.autoUpdater.logger.transports.file.level = "info";
yt.info("App starting...");
console.log("App starting...");
const fh = pf(import.meta.url), Po = be.dirname(fh);
let xe;
const Pu = () => {
  console.log("Creating main window..."), xe = new Du({
    width: 1920,
    height: 1080,
    icon: be.join(Po, "../src/assets/icons/waypoint_logo.ico"),
    webPreferences: {
      preload: be.join(Po, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !0,
      webviewTag: !0,
      sandbox: !1,
      webSecurity: !1
    },
    frame: !1,
    backgroundColor: "#1f1f28"
  });
  const o = process.env.VITE_DEV_SERVER_URL !== void 0, h = o ? process.env.VITE_DEV_SERVER_URL : `file://${be.join(Po, "../dist-electron/index.html")}`;
  console.log(`Loading URL: ${h}`), xe.loadURL(h), o && (console.log("Opening DevTools..."), xe.webContents.openDevTools({
    mode: "detach"
    // Opens DevTools in a separate window
  }));
};
Ut.whenReady().then(() => {
  console.log("App ready. Creating window..."), Pu(), Ut.on("activate", () => {
    Du.getAllWindows().length === 0 && (console.log("Reactivating app, no windows open. Creating a new one..."), Pu());
  });
});
Br.on("minimize-window", () => {
  console.log("Minimizing window..."), xe && xe.minimize();
});
Br.on("maximize-window", () => {
  console.log("Toggling maximize/unmaximize..."), xe && (xe.isMaximized() ? xe.unmaximize() : xe.maximize());
});
Br.on("close-window", () => {
  console.log("Closing window..."), xe && xe.close();
});
Ut.on("window-all-closed", () => {
  console.log("All windows closed."), process.platform !== "darwin" && (console.log("Quitting app..."), Ut.quit());
});
it.autoUpdater.on("checking-for-update", () => {
  yt.info("Checking for updates..."), console.log("Checking for updates...");
});
it.autoUpdater.on("update-available", (o) => {
  yt.info("Update available:", o), console.log("Update available:", o), xe && xe.webContents.send("update_available", o);
});
it.autoUpdater.on("update-not-available", (o) => {
  yt.info("No update available:", o), console.log("No update available:", o), xe && xe.webContents.send("update_not_available", o);
});
it.autoUpdater.on("error", (o) => {
  yt.error("Error during update:", o), console.error("Error during update:", o), xe && xe.webContents.send("update_error", o.message);
});
it.autoUpdater.on("download-progress", (o) => {
  const h = `Download speed: ${o.bytesPerSecond} - Downloaded ${o.percent}% (${o.transferred}/${o.total})`;
  yt.info(h), console.log(h), xe && xe.webContents.send("update_download_progress", o);
});
it.autoUpdater.on("update-downloaded", (o) => {
  yt.info("Update downloaded:", o), console.log("Update downloaded:", o), xe && xe.webContents.send("update_downloaded", o), console.log("Installing update in 5 seconds..."), setTimeout(() => {
    it.autoUpdater.quitAndInstall();
  }, 5e3);
});
Ut.whenReady().then(() => {
  console.log("Triggering auto-updater..."), it.autoUpdater.checkForUpdatesAndNotify();
});
Br.on("app_version", (o) => {
  const h = Ut.getVersion();
  console.log("Sending app version to renderer:", h), o.sender.send("app_version", { version: h });
});
