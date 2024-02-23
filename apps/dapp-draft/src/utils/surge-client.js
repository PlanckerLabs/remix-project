/* eslint-disable no-case-declarations */
/* eslint-disable no-redeclare */
/* eslint-disable no-fallthrough */
/* eslint-disable getter-return */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable indent */
var _t = {}, Ie = {};
Ie.byteLength = mr;
Ie.toByteArray = vr;
Ie.fromByteArray = Ir;
var ot = [], et = [], br = typeof Uint8Array < "u" ? Uint8Array : Array, Ne = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Ft = 0, Er = Ne.length; Ft < Er; ++Ft)
  ot[Ft] = Ne[Ft], et[Ne.charCodeAt(Ft)] = Ft;
et["-".charCodeAt(0)] = 62;
et["_".charCodeAt(0)] = 63;
function yn(t) {
  var i = t.length;
  if (i % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var e = t.indexOf("=");
  e === -1 && (e = i);
  var a = e === i ? 0 : 4 - e % 4;
  return [e, a];
}
function mr(t) {
  var i = yn(t), e = i[0], a = i[1];
  return (e + a) * 3 / 4 - a;
}
function kr(t, i, e) {
  return (i + e) * 3 / 4 - e;
}
function vr(t) {
  var i, e = yn(t), a = e[0], o = e[1], f = new br(kr(t, a, o)), u = 0, l = o > 0 ? a - 4 : a, x;
  for (x = 0; x < l; x += 4)
    i = et[t.charCodeAt(x)] << 18 | et[t.charCodeAt(x + 1)] << 12 | et[t.charCodeAt(x + 2)] << 6 | et[t.charCodeAt(x + 3)], f[u++] = i >> 16 & 255, f[u++] = i >> 8 & 255, f[u++] = i & 255;
  return o === 2 && (i = et[t.charCodeAt(x)] << 2 | et[t.charCodeAt(x + 1)] >> 4, f[u++] = i & 255), o === 1 && (i = et[t.charCodeAt(x)] << 10 | et[t.charCodeAt(x + 1)] << 4 | et[t.charCodeAt(x + 2)] >> 2, f[u++] = i >> 8 & 255, f[u++] = i & 255), f;
}
function Ar(t) {
  return ot[t >> 18 & 63] + ot[t >> 12 & 63] + ot[t >> 6 & 63] + ot[t & 63];
}
function Br(t, i, e) {
  for (var a, o = [], f = i; f < e; f += 3)
    a = (t[f] << 16 & 16711680) + (t[f + 1] << 8 & 65280) + (t[f + 2] & 255), o.push(Ar(a));
  return o.join("");
}
function Ir(t) {
  for (var i, e = t.length, a = e % 3, o = [], f = 16383, u = 0, l = e - a; u < l; u += f)
    o.push(Br(t, u, u + f > l ? l : u + f));
  return a === 1 ? (i = t[e - 1], o.push(
    ot[i >> 2] + ot[i << 4 & 63] + "=="
  )) : a === 2 && (i = (t[e - 2] << 8) + t[e - 1], o.push(
    ot[i >> 10] + ot[i >> 4 & 63] + ot[i << 2 & 63] + "="
  )), o.join("");
}
var hi = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
hi.read = function(t, i, e, a, o) {
  var f, u, l = o * 8 - a - 1, x = (1 << l) - 1, s = x >> 1, _ = -7, E = e ? o - 1 : 0, y = e ? -1 : 1, w = t[i + E];
  for (E += y, f = w & (1 << -_) - 1, w >>= -_, _ += l; _ > 0; f = f * 256 + t[i + E], E += y, _ -= 8)
    ;
  for (u = f & (1 << -_) - 1, f >>= -_, _ += a; _ > 0; u = u * 256 + t[i + E], E += y, _ -= 8)
    ;
  if (f === 0)
    f = 1 - s;
  else {
    if (f === x)
      return u ? NaN : (w ? -1 : 1) * (1 / 0);
    u = u + Math.pow(2, a), f = f - s;
  }
  return (w ? -1 : 1) * u * Math.pow(2, f - a);
};
hi.write = function(t, i, e, a, o, f) {
  var u, l, x, s = f * 8 - o - 1, _ = (1 << s) - 1, E = _ >> 1, y = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, w = a ? 0 : f - 1, m = a ? 1 : -1, z = i < 0 || i === 0 && 1 / i < 0 ? 1 : 0;
  for (i = Math.abs(i), isNaN(i) || i === 1 / 0 ? (l = isNaN(i) ? 1 : 0, u = _) : (u = Math.floor(Math.log(i) / Math.LN2), i * (x = Math.pow(2, -u)) < 1 && (u--, x *= 2), u + E >= 1 ? i += y / x : i += y * Math.pow(2, 1 - E), i * x >= 2 && (u++, x /= 2), u + E >= _ ? (l = 0, u = _) : u + E >= 1 ? (l = (i * x - 1) * Math.pow(2, o), u = u + E) : (l = i * Math.pow(2, E - 1) * Math.pow(2, o), u = 0)); o >= 8; t[e + w] = l & 255, w += m, l /= 256, o -= 8)
    ;
  for (u = u << o | l, s += o; s > 0; t[e + w] = u & 255, w += m, u /= 256, s -= 8)
    ;
  t[e + w - m] |= z * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(t) {
  const i = Ie, e = hi, a = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  t.Buffer = l, t.SlowBuffer = I, t.INSPECT_MAX_BYTES = 50;
  const o = 2147483647;
  t.kMaxLength = o, l.TYPED_ARRAY_SUPPORT = f(), !l.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function f() {
    try {
      const h = new Uint8Array(1), n = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(n, Uint8Array.prototype), Object.setPrototypeOf(h, n), h.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(l.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(l.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.byteOffset;
    }
  });
  function u(h) {
    if (h > o)
      throw new RangeError('The value "' + h + '" is invalid for option "size"');
    const n = new Uint8Array(h);
    return Object.setPrototypeOf(n, l.prototype), n;
  }
  function l(h, n, r) {
    if (typeof h == "number") {
      if (typeof n == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return E(h);
    }
    return x(h, n, r);
  }
  l.poolSize = 8192;
  function x(h, n, r) {
    if (typeof h == "string")
      return y(h, n);
    if (ArrayBuffer.isView(h))
      return m(h);
    if (h == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof h
      );
    if (rt(h, ArrayBuffer) || h && rt(h.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (rt(h, SharedArrayBuffer) || h && rt(h.buffer, SharedArrayBuffer)))
      return z(h, n, r);
    if (typeof h == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const c = h.valueOf && h.valueOf();
    if (c != null && c !== h)
      return l.from(c, n, r);
    const d = T(h);
    if (d)
      return d;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof h[Symbol.toPrimitive] == "function")
      return l.from(h[Symbol.toPrimitive]("string"), n, r);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof h
    );
  }
  l.from = function(h, n, r) {
    return x(h, n, r);
  }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
  function s(h) {
    if (typeof h != "number")
      throw new TypeError('"size" argument must be of type number');
    if (h < 0)
      throw new RangeError('The value "' + h + '" is invalid for option "size"');
  }
  function _(h, n, r) {
    return s(h), h <= 0 ? u(h) : n !== void 0 ? typeof r == "string" ? u(h).fill(n, r) : u(h).fill(n) : u(h);
  }
  l.alloc = function(h, n, r) {
    return _(h, n, r);
  };
  function E(h) {
    return s(h), u(h < 0 ? 0 : A(h) | 0);
  }
  l.allocUnsafe = function(h) {
    return E(h);
  }, l.allocUnsafeSlow = function(h) {
    return E(h);
  };
  function y(h, n) {
    if ((typeof n != "string" || n === "") && (n = "utf8"), !l.isEncoding(n))
      throw new TypeError("Unknown encoding: " + n);
    const r = v(h, n) | 0;
    let c = u(r);
    const d = c.write(h, n);
    return d !== r && (c = c.slice(0, d)), c;
  }
  function w(h) {
    const n = h.length < 0 ? 0 : A(h.length) | 0, r = u(n);
    for (let c = 0; c < n; c += 1)
      r[c] = h[c] & 255;
    return r;
  }
  function m(h) {
    if (rt(h, Uint8Array)) {
      const n = new Uint8Array(h);
      return z(n.buffer, n.byteOffset, n.byteLength);
    }
    return w(h);
  }
  function z(h, n, r) {
    if (n < 0 || h.byteLength < n)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (h.byteLength < n + (r || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let c;
    return n === void 0 && r === void 0 ? c = new Uint8Array(h) : r === void 0 ? c = new Uint8Array(h, n) : c = new Uint8Array(h, n, r), Object.setPrototypeOf(c, l.prototype), c;
  }
  function T(h) {
    if (l.isBuffer(h)) {
      const n = A(h.length) | 0, r = u(n);
      return r.length === 0 || h.copy(r, 0, 0, n), r;
    }
    if (h.length !== void 0)
      return typeof h.length != "number" || Oe(h.length) ? u(0) : w(h);
    if (h.type === "Buffer" && Array.isArray(h.data))
      return w(h.data);
  }
  function A(h) {
    if (h >= o)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
    return h | 0;
  }
  function I(h) {
    return +h != h && (h = 0), l.alloc(+h);
  }
  l.isBuffer = function(n) {
    return n != null && n._isBuffer === !0 && n !== l.prototype;
  }, l.compare = function(n, r) {
    if (rt(n, Uint8Array) && (n = l.from(n, n.offset, n.byteLength)), rt(r, Uint8Array) && (r = l.from(r, r.offset, r.byteLength)), !l.isBuffer(n) || !l.isBuffer(r))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (n === r)
      return 0;
    let c = n.length, d = r.length;
    for (let p = 0, g = Math.min(c, d); p < g; ++p)
      if (n[p] !== r[p]) {
        c = n[p], d = r[p];
        break;
      }
    return c < d ? -1 : d < c ? 1 : 0;
  }, l.isEncoding = function(n) {
    switch (String(n).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, l.concat = function(n, r) {
    if (!Array.isArray(n))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (n.length === 0)
      return l.alloc(0);
    let c;
    if (r === void 0)
      for (r = 0, c = 0; c < n.length; ++c)
        r += n[c].length;
    const d = l.allocUnsafe(r);
    let p = 0;
    for (c = 0; c < n.length; ++c) {
      let g = n[c];
      if (rt(g, Uint8Array))
        p + g.length > d.length ? (l.isBuffer(g) || (g = l.from(g)), g.copy(d, p)) : Uint8Array.prototype.set.call(
          d,
          g,
          p
        );
      else if (l.isBuffer(g))
        g.copy(d, p);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      p += g.length;
    }
    return d;
  };
  function v(h, n) {
    if (l.isBuffer(h))
      return h.length;
    if (ArrayBuffer.isView(h) || rt(h, ArrayBuffer))
      return h.byteLength;
    if (typeof h != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof h
      );
    const r = h.length, c = arguments.length > 2 && arguments[2] === !0;
    if (!c && r === 0)
      return 0;
    let d = !1;
    for (; ; )
      switch (n) {
        case "ascii":
        case "latin1":
        case "binary":
          return r;
        case "utf8":
        case "utf-8":
          return ze(h).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return r * 2;
        case "hex":
          return r >>> 1;
        case "base64":
          return Ai(h).length;
        default:
          if (d)
            return c ? -1 : ze(h).length;
          n = ("" + n).toLowerCase(), d = !0;
      }
  }
  l.byteLength = v;
  function b(h, n, r) {
    let c = !1;
    if ((n === void 0 || n < 0) && (n = 0), n > this.length || ((r === void 0 || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, n >>>= 0, r <= n))
      return "";
    for (h || (h = "utf8"); ; )
      switch (h) {
        case "hex":
          return sr(this, n, r);
        case "utf8":
        case "utf-8":
          return Et(this, n, r);
        case "ascii":
          return hr(this, n, r);
        case "latin1":
        case "binary":
          return cr(this, n, r);
        case "base64":
          return we(this, n, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ur(this, n, r);
        default:
          if (c)
            throw new TypeError("Unknown encoding: " + h);
          h = (h + "").toLowerCase(), c = !0;
      }
  }
  l.prototype._isBuffer = !0;
  function S(h, n, r) {
    const c = h[n];
    h[n] = h[r], h[r] = c;
  }
  l.prototype.swap16 = function() {
    const n = this.length;
    if (n % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let r = 0; r < n; r += 2)
      S(this, r, r + 1);
    return this;
  }, l.prototype.swap32 = function() {
    const n = this.length;
    if (n % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let r = 0; r < n; r += 4)
      S(this, r, r + 3), S(this, r + 1, r + 2);
    return this;
  }, l.prototype.swap64 = function() {
    const n = this.length;
    if (n % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let r = 0; r < n; r += 8)
      S(this, r, r + 7), S(this, r + 1, r + 6), S(this, r + 2, r + 5), S(this, r + 3, r + 4);
    return this;
  }, l.prototype.toString = function() {
    const n = this.length;
    return n === 0 ? "" : arguments.length === 0 ? Et(this, 0, n) : b.apply(this, arguments);
  }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(n) {
    if (!l.isBuffer(n))
      throw new TypeError("Argument must be a Buffer");
    return this === n ? !0 : l.compare(this, n) === 0;
  }, l.prototype.inspect = function() {
    let n = "";
    const r = t.INSPECT_MAX_BYTES;
    return n = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (n += " ... "), "<Buffer " + n + ">";
  }, a && (l.prototype[a] = l.prototype.inspect), l.prototype.compare = function(n, r, c, d, p) {
    if (rt(n, Uint8Array) && (n = l.from(n, n.offset, n.byteLength)), !l.isBuffer(n))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof n
      );
    if (r === void 0 && (r = 0), c === void 0 && (c = n ? n.length : 0), d === void 0 && (d = 0), p === void 0 && (p = this.length), r < 0 || c > n.length || d < 0 || p > this.length)
      throw new RangeError("out of range index");
    if (d >= p && r >= c)
      return 0;
    if (d >= p)
      return -1;
    if (r >= c)
      return 1;
    if (r >>>= 0, c >>>= 0, d >>>= 0, p >>>= 0, this === n)
      return 0;
    let g = p - d, R = c - r;
    const $ = Math.min(g, R), L = this.slice(d, p), H = n.slice(r, c);
    for (let C = 0; C < $; ++C)
      if (L[C] !== H[C]) {
        g = L[C], R = H[C];
        break;
      }
    return g < R ? -1 : R < g ? 1 : 0;
  };
  function P(h, n, r, c, d) {
    if (h.length === 0)
      return -1;
    if (typeof r == "string" ? (c = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, Oe(r) && (r = d ? 0 : h.length - 1), r < 0 && (r = h.length + r), r >= h.length) {
      if (d)
        return -1;
      r = h.length - 1;
    } else if (r < 0)
      if (d)
        r = 0;
      else
        return -1;
    if (typeof n == "string" && (n = l.from(n, c)), l.isBuffer(n))
      return n.length === 0 ? -1 : k(h, n, r, c, d);
    if (typeof n == "number")
      return n = n & 255, typeof Uint8Array.prototype.indexOf == "function" ? d ? Uint8Array.prototype.indexOf.call(h, n, r) : Uint8Array.prototype.lastIndexOf.call(h, n, r) : k(h, [n], r, c, d);
    throw new TypeError("val must be string, number or Buffer");
  }
  function k(h, n, r, c, d) {
    let p = 1, g = h.length, R = n.length;
    if (c !== void 0 && (c = String(c).toLowerCase(), c === "ucs2" || c === "ucs-2" || c === "utf16le" || c === "utf-16le")) {
      if (h.length < 2 || n.length < 2)
        return -1;
      p = 2, g /= 2, R /= 2, r /= 2;
    }
    function $(H, C) {
      return p === 1 ? H[C] : H.readUInt16BE(C * p);
    }
    let L;
    if (d) {
      let H = -1;
      for (L = r; L < g; L++)
        if ($(h, L) === $(n, H === -1 ? 0 : L - H)) {
          if (H === -1 && (H = L), L - H + 1 === R)
            return H * p;
        } else
          H !== -1 && (L -= L - H), H = -1;
    } else
      for (r + R > g && (r = g - R), L = r; L >= 0; L--) {
        let H = !0;
        for (let C = 0; C < R; C++)
          if ($(h, L + C) !== $(n, C)) {
            H = !1;
            break;
          }
        if (H)
          return L;
      }
    return -1;
  }
  l.prototype.includes = function(n, r, c) {
    return this.indexOf(n, r, c) !== -1;
  }, l.prototype.indexOf = function(n, r, c) {
    return P(this, n, r, c, !0);
  }, l.prototype.lastIndexOf = function(n, r, c) {
    return P(this, n, r, c, !1);
  };
  function N(h, n, r, c) {
    r = Number(r) || 0;
    const d = h.length - r;
    c ? (c = Number(c), c > d && (c = d)) : c = d;
    const p = n.length;
    c > p / 2 && (c = p / 2);
    let g;
    for (g = 0; g < c; ++g) {
      const R = parseInt(n.substr(g * 2, 2), 16);
      if (Oe(R))
        return g;
      h[r + g] = R;
    }
    return g;
  }
  function U(h, n, r, c) {
    return ge(ze(n, h.length - r), h, r, c);
  }
  function B(h, n, r, c) {
    return ge(wr(n), h, r, c);
  }
  function F(h, n, r, c) {
    return ge(Ai(n), h, r, c);
  }
  function ct(h, n, r, c) {
    return ge(gr(n, h.length - r), h, r, c);
  }
  l.prototype.write = function(n, r, c, d) {
    if (r === void 0)
      d = "utf8", c = this.length, r = 0;
    else if (c === void 0 && typeof r == "string")
      d = r, c = this.length, r = 0;
    else if (isFinite(r))
      r = r >>> 0, isFinite(c) ? (c = c >>> 0, d === void 0 && (d = "utf8")) : (d = c, c = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const p = this.length - r;
    if ((c === void 0 || c > p) && (c = p), n.length > 0 && (c < 0 || r < 0) || r > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    d || (d = "utf8");
    let g = !1;
    for (; ; )
      switch (d) {
        case "hex":
          return N(this, n, r, c);
        case "utf8":
        case "utf-8":
          return U(this, n, r, c);
        case "ascii":
        case "latin1":
        case "binary":
          return B(this, n, r, c);
        case "base64":
          return F(this, n, r, c);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ct(this, n, r, c);
        default:
          if (g)
            throw new TypeError("Unknown encoding: " + d);
          d = ("" + d).toLowerCase(), g = !0;
      }
  }, l.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function we(h, n, r) {
    return n === 0 && r === h.length ? i.fromByteArray(h) : i.fromByteArray(h.slice(n, r));
  }
  function Et(h, n, r) {
    r = Math.min(h.length, r);
    const c = [];
    let d = n;
    for (; d < r; ) {
      const p = h[d];
      let g = null, R = p > 239 ? 4 : p > 223 ? 3 : p > 191 ? 2 : 1;
      if (d + R <= r) {
        let $, L, H, C;
        switch (R) {
          case 1:
            p < 128 && (g = p);
            break;
          case 2:
            $ = h[d + 1], ($ & 192) === 128 && (C = (p & 31) << 6 | $ & 63, C > 127 && (g = C));
            break;
          case 3:
            $ = h[d + 1], L = h[d + 2], ($ & 192) === 128 && (L & 192) === 128 && (C = (p & 15) << 12 | ($ & 63) << 6 | L & 63, C > 2047 && (C < 55296 || C > 57343) && (g = C));
            break;
          case 4:
            $ = h[d + 1], L = h[d + 2], H = h[d + 3], ($ & 192) === 128 && (L & 192) === 128 && (H & 192) === 128 && (C = (p & 15) << 18 | ($ & 63) << 12 | (L & 63) << 6 | H & 63, C > 65535 && C < 1114112 && (g = C));
        }
      }
      g === null ? (g = 65533, R = 1) : g > 65535 && (g -= 65536, c.push(g >>> 10 & 1023 | 55296), g = 56320 | g & 1023), c.push(g), d += R;
    }
    return fr(c);
  }
  const mt = 4096;
  function fr(h) {
    const n = h.length;
    if (n <= mt)
      return String.fromCharCode.apply(String, h);
    let r = "", c = 0;
    for (; c < n; )
      r += String.fromCharCode.apply(
        String,
        h.slice(c, c += mt)
      );
    return r;
  }
  function hr(h, n, r) {
    let c = "";
    r = Math.min(h.length, r);
    for (let d = n; d < r; ++d)
      c += String.fromCharCode(h[d] & 127);
    return c;
  }
  function cr(h, n, r) {
    let c = "";
    r = Math.min(h.length, r);
    for (let d = n; d < r; ++d)
      c += String.fromCharCode(h[d]);
    return c;
  }
  function sr(h, n, r) {
    const c = h.length;
    (!n || n < 0) && (n = 0), (!r || r < 0 || r > c) && (r = c);
    let d = "";
    for (let p = n; p < r; ++p)
      d += xr[h[p]];
    return d;
  }
  function ur(h, n, r) {
    const c = h.slice(n, r);
    let d = "";
    for (let p = 0; p < c.length - 1; p += 2)
      d += String.fromCharCode(c[p] + c[p + 1] * 256);
    return d;
  }
  l.prototype.slice = function(n, r) {
    const c = this.length;
    n = ~~n, r = r === void 0 ? c : ~~r, n < 0 ? (n += c, n < 0 && (n = 0)) : n > c && (n = c), r < 0 ? (r += c, r < 0 && (r = 0)) : r > c && (r = c), r < n && (r = n);
    const d = this.subarray(n, r);
    return Object.setPrototypeOf(d, l.prototype), d;
  };
  function j(h, n, r) {
    if (h % 1 !== 0 || h < 0)
      throw new RangeError("offset is not uint");
    if (h + n > r)
      throw new RangeError("Trying to access beyond buffer length");
  }
  l.prototype.readUintLE = l.prototype.readUIntLE = function(n, r, c) {
    n = n >>> 0, r = r >>> 0, c || j(n, r, this.length);
    let d = this[n], p = 1, g = 0;
    for (; ++g < r && (p *= 256); )
      d += this[n + g] * p;
    return d;
  }, l.prototype.readUintBE = l.prototype.readUIntBE = function(n, r, c) {
    n = n >>> 0, r = r >>> 0, c || j(n, r, this.length);
    let d = this[n + --r], p = 1;
    for (; r > 0 && (p *= 256); )
      d += this[n + --r] * p;
    return d;
  }, l.prototype.readUint8 = l.prototype.readUInt8 = function(n, r) {
    return n = n >>> 0, r || j(n, 1, this.length), this[n];
  }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(n, r) {
    return n = n >>> 0, r || j(n, 2, this.length), this[n] | this[n + 1] << 8;
  }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(n, r) {
    return n = n >>> 0, r || j(n, 2, this.length), this[n] << 8 | this[n + 1];
  }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(n, r) {
    return n = n >>> 0, r || j(n, 4, this.length), (this[n] | this[n + 1] << 8 | this[n + 2] << 16) + this[n + 3] * 16777216;
  }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(n, r) {
    return n = n >>> 0, r || j(n, 4, this.length), this[n] * 16777216 + (this[n + 1] << 16 | this[n + 2] << 8 | this[n + 3]);
  }, l.prototype.readBigUInt64LE = pt(function(n) {
    n = n >>> 0, Rt(n, "offset");
    const r = this[n], c = this[n + 7];
    (r === void 0 || c === void 0) && Xt(n, this.length - 8);
    const d = r + this[++n] * 2 ** 8 + this[++n] * 2 ** 16 + this[++n] * 2 ** 24, p = this[++n] + this[++n] * 2 ** 8 + this[++n] * 2 ** 16 + c * 2 ** 24;
    return BigInt(d) + (BigInt(p) << BigInt(32));
  }), l.prototype.readBigUInt64BE = pt(function(n) {
    n = n >>> 0, Rt(n, "offset");
    const r = this[n], c = this[n + 7];
    (r === void 0 || c === void 0) && Xt(n, this.length - 8);
    const d = r * 2 ** 24 + this[++n] * 2 ** 16 + this[++n] * 2 ** 8 + this[++n], p = this[++n] * 2 ** 24 + this[++n] * 2 ** 16 + this[++n] * 2 ** 8 + c;
    return (BigInt(d) << BigInt(32)) + BigInt(p);
  }), l.prototype.readIntLE = function(n, r, c) {
    n = n >>> 0, r = r >>> 0, c || j(n, r, this.length);
    let d = this[n], p = 1, g = 0;
    for (; ++g < r && (p *= 256); )
      d += this[n + g] * p;
    return p *= 128, d >= p && (d -= Math.pow(2, 8 * r)), d;
  }, l.prototype.readIntBE = function(n, r, c) {
    n = n >>> 0, r = r >>> 0, c || j(n, r, this.length);
    let d = r, p = 1, g = this[n + --d];
    for (; d > 0 && (p *= 256); )
      g += this[n + --d] * p;
    return p *= 128, g >= p && (g -= Math.pow(2, 8 * r)), g;
  }, l.prototype.readInt8 = function(n, r) {
    return n = n >>> 0, r || j(n, 1, this.length), this[n] & 128 ? (255 - this[n] + 1) * -1 : this[n];
  }, l.prototype.readInt16LE = function(n, r) {
    n = n >>> 0, r || j(n, 2, this.length);
    const c = this[n] | this[n + 1] << 8;
    return c & 32768 ? c | 4294901760 : c;
  }, l.prototype.readInt16BE = function(n, r) {
    n = n >>> 0, r || j(n, 2, this.length);
    const c = this[n + 1] | this[n] << 8;
    return c & 32768 ? c | 4294901760 : c;
  }, l.prototype.readInt32LE = function(n, r) {
    return n = n >>> 0, r || j(n, 4, this.length), this[n] | this[n + 1] << 8 | this[n + 2] << 16 | this[n + 3] << 24;
  }, l.prototype.readInt32BE = function(n, r) {
    return n = n >>> 0, r || j(n, 4, this.length), this[n] << 24 | this[n + 1] << 16 | this[n + 2] << 8 | this[n + 3];
  }, l.prototype.readBigInt64LE = pt(function(n) {
    n = n >>> 0, Rt(n, "offset");
    const r = this[n], c = this[n + 7];
    (r === void 0 || c === void 0) && Xt(n, this.length - 8);
    const d = this[n + 4] + this[n + 5] * 2 ** 8 + this[n + 6] * 2 ** 16 + (c << 24);
    return (BigInt(d) << BigInt(32)) + BigInt(r + this[++n] * 2 ** 8 + this[++n] * 2 ** 16 + this[++n] * 2 ** 24);
  }), l.prototype.readBigInt64BE = pt(function(n) {
    n = n >>> 0, Rt(n, "offset");
    const r = this[n], c = this[n + 7];
    (r === void 0 || c === void 0) && Xt(n, this.length - 8);
    const d = (r << 24) + // Overflow
    this[++n] * 2 ** 16 + this[++n] * 2 ** 8 + this[++n];
    return (BigInt(d) << BigInt(32)) + BigInt(this[++n] * 2 ** 24 + this[++n] * 2 ** 16 + this[++n] * 2 ** 8 + c);
  }), l.prototype.readFloatLE = function(n, r) {
    return n = n >>> 0, r || j(n, 4, this.length), e.read(this, n, !0, 23, 4);
  }, l.prototype.readFloatBE = function(n, r) {
    return n = n >>> 0, r || j(n, 4, this.length), e.read(this, n, !1, 23, 4);
  }, l.prototype.readDoubleLE = function(n, r) {
    return n = n >>> 0, r || j(n, 8, this.length), e.read(this, n, !0, 52, 8);
  }, l.prototype.readDoubleBE = function(n, r) {
    return n = n >>> 0, r || j(n, 8, this.length), e.read(this, n, !1, 52, 8);
  };
  function J(h, n, r, c, d, p) {
    if (!l.isBuffer(h))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (n > d || n < p)
      throw new RangeError('"value" argument is out of bounds');
    if (r + c > h.length)
      throw new RangeError("Index out of range");
  }
  l.prototype.writeUintLE = l.prototype.writeUIntLE = function(n, r, c, d) {
    if (n = +n, r = r >>> 0, c = c >>> 0, !d) {
      const R = Math.pow(2, 8 * c) - 1;
      J(this, n, r, c, R, 0);
    }
    let p = 1, g = 0;
    for (this[r] = n & 255; ++g < c && (p *= 256); )
      this[r + g] = n / p & 255;
    return r + c;
  }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(n, r, c, d) {
    if (n = +n, r = r >>> 0, c = c >>> 0, !d) {
      const R = Math.pow(2, 8 * c) - 1;
      J(this, n, r, c, R, 0);
    }
    let p = c - 1, g = 1;
    for (this[r + p] = n & 255; --p >= 0 && (g *= 256); )
      this[r + p] = n / g & 255;
    return r + c;
  }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 1, 255, 0), this[r] = n & 255, r + 1;
  }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 2, 65535, 0), this[r] = n & 255, this[r + 1] = n >>> 8, r + 2;
  }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 2, 65535, 0), this[r] = n >>> 8, this[r + 1] = n & 255, r + 2;
  }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 4, 4294967295, 0), this[r + 3] = n >>> 24, this[r + 2] = n >>> 16, this[r + 1] = n >>> 8, this[r] = n & 255, r + 4;
  }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 4, 4294967295, 0), this[r] = n >>> 24, this[r + 1] = n >>> 16, this[r + 2] = n >>> 8, this[r + 3] = n & 255, r + 4;
  };
  function xi(h, n, r, c, d) {
    vi(n, c, d, h, r, 7);
    let p = Number(n & BigInt(4294967295));
    h[r++] = p, p = p >> 8, h[r++] = p, p = p >> 8, h[r++] = p, p = p >> 8, h[r++] = p;
    let g = Number(n >> BigInt(32) & BigInt(4294967295));
    return h[r++] = g, g = g >> 8, h[r++] = g, g = g >> 8, h[r++] = g, g = g >> 8, h[r++] = g, r;
  }
  function yi(h, n, r, c, d) {
    vi(n, c, d, h, r, 7);
    let p = Number(n & BigInt(4294967295));
    h[r + 7] = p, p = p >> 8, h[r + 6] = p, p = p >> 8, h[r + 5] = p, p = p >> 8, h[r + 4] = p;
    let g = Number(n >> BigInt(32) & BigInt(4294967295));
    return h[r + 3] = g, g = g >> 8, h[r + 2] = g, g = g >> 8, h[r + 1] = g, g = g >> 8, h[r] = g, r + 8;
  }
  l.prototype.writeBigUInt64LE = pt(function(n, r = 0) {
    return xi(this, n, r, BigInt(0), BigInt("0xffffffffffffffff"));
  }), l.prototype.writeBigUInt64BE = pt(function(n, r = 0) {
    return yi(this, n, r, BigInt(0), BigInt("0xffffffffffffffff"));
  }), l.prototype.writeIntLE = function(n, r, c, d) {
    if (n = +n, r = r >>> 0, !d) {
      const $ = Math.pow(2, 8 * c - 1);
      J(this, n, r, c, $ - 1, -$);
    }
    let p = 0, g = 1, R = 0;
    for (this[r] = n & 255; ++p < c && (g *= 256); )
      n < 0 && R === 0 && this[r + p - 1] !== 0 && (R = 1), this[r + p] = (n / g >> 0) - R & 255;
    return r + c;
  }, l.prototype.writeIntBE = function(n, r, c, d) {
    if (n = +n, r = r >>> 0, !d) {
      const $ = Math.pow(2, 8 * c - 1);
      J(this, n, r, c, $ - 1, -$);
    }
    let p = c - 1, g = 1, R = 0;
    for (this[r + p] = n & 255; --p >= 0 && (g *= 256); )
      n < 0 && R === 0 && this[r + p + 1] !== 0 && (R = 1), this[r + p] = (n / g >> 0) - R & 255;
    return r + c;
  }, l.prototype.writeInt8 = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 1, 127, -128), n < 0 && (n = 255 + n + 1), this[r] = n & 255, r + 1;
  }, l.prototype.writeInt16LE = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 2, 32767, -32768), this[r] = n & 255, this[r + 1] = n >>> 8, r + 2;
  }, l.prototype.writeInt16BE = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 2, 32767, -32768), this[r] = n >>> 8, this[r + 1] = n & 255, r + 2;
  }, l.prototype.writeInt32LE = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 4, 2147483647, -2147483648), this[r] = n & 255, this[r + 1] = n >>> 8, this[r + 2] = n >>> 16, this[r + 3] = n >>> 24, r + 4;
  }, l.prototype.writeInt32BE = function(n, r, c) {
    return n = +n, r = r >>> 0, c || J(this, n, r, 4, 2147483647, -2147483648), n < 0 && (n = 4294967295 + n + 1), this[r] = n >>> 24, this[r + 1] = n >>> 16, this[r + 2] = n >>> 8, this[r + 3] = n & 255, r + 4;
  }, l.prototype.writeBigInt64LE = pt(function(n, r = 0) {
    return xi(this, n, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), l.prototype.writeBigInt64BE = pt(function(n, r = 0) {
    return yi(this, n, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function bi(h, n, r, c, d, p) {
    if (r + c > h.length)
      throw new RangeError("Index out of range");
    if (r < 0)
      throw new RangeError("Index out of range");
  }
  function Ei(h, n, r, c, d) {
    return n = +n, r = r >>> 0, d || bi(h, n, r, 4), e.write(h, n, r, c, 23, 4), r + 4;
  }
  l.prototype.writeFloatLE = function(n, r, c) {
    return Ei(this, n, r, !0, c);
  }, l.prototype.writeFloatBE = function(n, r, c) {
    return Ei(this, n, r, !1, c);
  };
  function mi(h, n, r, c, d) {
    return n = +n, r = r >>> 0, d || bi(h, n, r, 8), e.write(h, n, r, c, 52, 8), r + 8;
  }
  l.prototype.writeDoubleLE = function(n, r, c) {
    return mi(this, n, r, !0, c);
  }, l.prototype.writeDoubleBE = function(n, r, c) {
    return mi(this, n, r, !1, c);
  }, l.prototype.copy = function(n, r, c, d) {
    if (!l.isBuffer(n))
      throw new TypeError("argument should be a Buffer");
    if (c || (c = 0), !d && d !== 0 && (d = this.length), r >= n.length && (r = n.length), r || (r = 0), d > 0 && d < c && (d = c), d === c || n.length === 0 || this.length === 0)
      return 0;
    if (r < 0)
      throw new RangeError("targetStart out of bounds");
    if (c < 0 || c >= this.length)
      throw new RangeError("Index out of range");
    if (d < 0)
      throw new RangeError("sourceEnd out of bounds");
    d > this.length && (d = this.length), n.length - r < d - c && (d = n.length - r + c);
    const p = d - c;
    return this === n && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(r, c, d) : Uint8Array.prototype.set.call(
      n,
      this.subarray(c, d),
      r
    ), p;
  }, l.prototype.fill = function(n, r, c, d) {
    if (typeof n == "string") {
      if (typeof r == "string" ? (d = r, r = 0, c = this.length) : typeof c == "string" && (d = c, c = this.length), d !== void 0 && typeof d != "string")
        throw new TypeError("encoding must be a string");
      if (typeof d == "string" && !l.isEncoding(d))
        throw new TypeError("Unknown encoding: " + d);
      if (n.length === 1) {
        const g = n.charCodeAt(0);
        (d === "utf8" && g < 128 || d === "latin1") && (n = g);
      }
    } else
      typeof n == "number" ? n = n & 255 : typeof n == "boolean" && (n = Number(n));
    if (r < 0 || this.length < r || this.length < c)
      throw new RangeError("Out of range index");
    if (c <= r)
      return this;
    r = r >>> 0, c = c === void 0 ? this.length : c >>> 0, n || (n = 0);
    let p;
    if (typeof n == "number")
      for (p = r; p < c; ++p)
        this[p] = n;
    else {
      const g = l.isBuffer(n) ? n : l.from(n, d), R = g.length;
      if (R === 0)
        throw new TypeError('The value "' + n + '" is invalid for argument "value"');
      for (p = 0; p < c - r; ++p)
        this[p + r] = g[p % R];
    }
    return this;
  };
  const Tt = {};
  function De(h, n, r) {
    Tt[h] = class extends r {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: n.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${h}]`, this.stack, delete this.name;
      }
      get code() {
        return h;
      }
      set code(d) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: d,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${h}]: ${this.message}`;
      }
    };
  }
  De(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(h) {
      return h ? `${h} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), De(
    "ERR_INVALID_ARG_TYPE",
    function(h, n) {
      return `The "${h}" argument must be of type number. Received type ${typeof n}`;
    },
    TypeError
  ), De(
    "ERR_OUT_OF_RANGE",
    function(h, n, r) {
      let c = `The value of "${h}" is out of range.`, d = r;
      return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? d = ki(String(r)) : typeof r == "bigint" && (d = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (d = ki(d)), d += "n"), c += ` It must be ${n}. Received ${d}`, c;
    },
    RangeError
  );
  function ki(h) {
    let n = "", r = h.length;
    const c = h[0] === "-" ? 1 : 0;
    for (; r >= c + 4; r -= 3)
      n = `_${h.slice(r - 3, r)}${n}`;
    return `${h.slice(0, r)}${n}`;
  }
  function dr(h, n, r) {
    Rt(n, "offset"), (h[n] === void 0 || h[n + r] === void 0) && Xt(n, h.length - (r + 1));
  }
  function vi(h, n, r, c, d, p) {
    if (h > r || h < n) {
      const g = typeof n == "bigint" ? "n" : "";
      let R;
      throw p > 3 ? n === 0 || n === BigInt(0) ? R = `>= 0${g} and < 2${g} ** ${(p + 1) * 8}${g}` : R = `>= -(2${g} ** ${(p + 1) * 8 - 1}${g}) and < 2 ** ${(p + 1) * 8 - 1}${g}` : R = `>= ${n}${g} and <= ${r}${g}`, new Tt.ERR_OUT_OF_RANGE("value", R, h);
    }
    dr(c, d, p);
  }
  function Rt(h, n) {
    if (typeof h != "number")
      throw new Tt.ERR_INVALID_ARG_TYPE(n, "number", h);
  }
  function Xt(h, n, r) {
    throw Math.floor(h) !== h ? (Rt(h, r), new Tt.ERR_OUT_OF_RANGE(r || "offset", "an integer", h)) : n < 0 ? new Tt.ERR_BUFFER_OUT_OF_BOUNDS() : new Tt.ERR_OUT_OF_RANGE(
      r || "offset",
      `>= ${r ? 1 : 0} and <= ${n}`,
      h
    );
  }
  const _r = /[^+/0-9A-Za-z-_]/g;
  function pr(h) {
    if (h = h.split("=")[0], h = h.trim().replace(_r, ""), h.length < 2)
      return "";
    for (; h.length % 4 !== 0; )
      h = h + "=";
    return h;
  }
  function ze(h, n) {
    n = n || 1 / 0;
    let r;
    const c = h.length;
    let d = null;
    const p = [];
    for (let g = 0; g < c; ++g) {
      if (r = h.charCodeAt(g), r > 55295 && r < 57344) {
        if (!d) {
          if (r > 56319) {
            (n -= 3) > -1 && p.push(239, 191, 189);
            continue;
          } else if (g + 1 === c) {
            (n -= 3) > -1 && p.push(239, 191, 189);
            continue;
          }
          d = r;
          continue;
        }
        if (r < 56320) {
          (n -= 3) > -1 && p.push(239, 191, 189), d = r;
          continue;
        }
        r = (d - 55296 << 10 | r - 56320) + 65536;
      } else
        d && (n -= 3) > -1 && p.push(239, 191, 189);
      if (d = null, r < 128) {
        if ((n -= 1) < 0)
          break;
        p.push(r);
      } else if (r < 2048) {
        if ((n -= 2) < 0)
          break;
        p.push(
          r >> 6 | 192,
          r & 63 | 128
        );
      } else if (r < 65536) {
        if ((n -= 3) < 0)
          break;
        p.push(
          r >> 12 | 224,
          r >> 6 & 63 | 128,
          r & 63 | 128
        );
      } else if (r < 1114112) {
        if ((n -= 4) < 0)
          break;
        p.push(
          r >> 18 | 240,
          r >> 12 & 63 | 128,
          r >> 6 & 63 | 128,
          r & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return p;
  }
  function wr(h) {
    const n = [];
    for (let r = 0; r < h.length; ++r)
      n.push(h.charCodeAt(r) & 255);
    return n;
  }
  function gr(h, n) {
    let r, c, d;
    const p = [];
    for (let g = 0; g < h.length && !((n -= 2) < 0); ++g)
      r = h.charCodeAt(g), c = r >> 8, d = r % 256, p.push(d), p.push(c);
    return p;
  }
  function Ai(h) {
    return i.toByteArray(pr(h));
  }
  function ge(h, n, r, c) {
    let d;
    for (d = 0; d < c && !(d + r >= n.length || d >= h.length); ++d)
      n[d + r] = h[d];
    return d;
  }
  function rt(h, n) {
    return h instanceof n || h != null && h.constructor != null && h.constructor.name != null && h.constructor.name === n.name;
  }
  function Oe(h) {
    return h !== h;
  }
  const xr = function() {
    const h = "0123456789abcdef", n = new Array(256);
    for (let r = 0; r < 16; ++r) {
      const c = r * 16;
      for (let d = 0; d < 16; ++d)
        n[c + d] = h[r] + h[d];
    }
    return n;
  }();
  function pt(h) {
    return typeof BigInt > "u" ? yr : h;
  }
  function yr() {
    throw new Error("BigInt not supported");
  }
})(_t);
function Sr(t) {
  return _t.Buffer.from(t || "", "utf8").toString("base64");
}
function ci(t, i) {
  var e = t + ":" + (i || "");
  return "Basic " + Sr(e);
}
const Ve = "__SURGE_TOKEN", Bi = (t) => {
  t === null ? localStorage.removeItem(Ve) : localStorage.setItem(Ve, t);
}, Tr = () => !!Se(), Se = () => localStorage.getItem(Ve) ?? "", bn = "0.23.1", En = "https://surge.surge.sh", mn = "Not Login", Rr = async (t) => {
  var e;
  const i = t.status;
  if (i >= 400) {
    const a = ((e = await (t == null ? void 0 : t.json())) == null ? void 0 : e.messages) ?? await (t == null ? void 0 : t.text()) ?? `Network Error: ${i}`;
    throw new Error(a);
  }
  return t;
};
function Fr(t, i) {
  return fetch(this.proxy + t, {
    ...i,
    headers: {
      authorization: ci("token", Se()),
      ...(i == null ? void 0 : i.headers) || {},
      proxy: En
    }
  }).then(Rr).then((a) => (a == null ? void 0 : a.text()) || (a == null ? void 0 : a.json()));
}
function Ur() {
  const t = this, i = Fr.bind(t);
  return {
    login: async ({
      user: e,
      password: a
    }) => i("/token", {
      method: "POST",
      headers: {
        authorization: ci(e, a)
      }
    }).then((o) => JSON.parse(o)),
    whoami: async () => i("/account", {
      headers: { version: bn }
    }).then((e) => JSON.parse(e)),
    list: async () => i("/list").then((e) => JSON.parse(e)),
    teardown: async (e) => i(`/${e}`, {
      method: "DELETE"
    }).then((a) => JSON.parse(a))
  };
}
const Te = (t, i, e) => {
  const a = e.value;
  return e.value = async function(...o) {
    if (!Tr())
      throw new Error(mn);
    return await a.apply(this, o);
  }, e;
}, $t = (t, i, e) => {
  const a = e.value;
  return e.value = async function(...o) {
    return await a.apply(this, o).catch((f) => {
      throw this.onError && this.onError(f), f;
    });
  }, e;
};
/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
const Dr = 4, Ii = 0, Si = 1, zr = 2;
function Ht(t) {
  let i = t.length;
  for (; --i >= 0; )
    t[i] = 0;
}
const Or = 0, kn = 1, Nr = 2, Cr = 3, Lr = 258, si = 29, ue = 256, re = ue + 1 + si, Ct = 30, ui = 19, vn = 2 * re + 1, kt = 15, Ce = 16, Zr = 7, di = 256, An = 16, Bn = 17, In = 18, qe = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
), ke = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
), Mr = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
), Sn = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), $r = 512, ut = new Array((re + 2) * 2);
Ht(ut);
const ee = new Array(Ct * 2);
Ht(ee);
const ae = new Array($r);
Ht(ae);
const oe = new Array(Lr - Cr + 1);
Ht(oe);
const _i = new Array(si);
Ht(_i);
const ve = new Array(Ct);
Ht(ve);
function Le(t, i, e, a, o) {
  this.static_tree = t, this.extra_bits = i, this.extra_base = e, this.elems = a, this.max_length = o, this.has_stree = t && t.length;
}
let Tn, Rn, Fn;
function Ze(t, i) {
  this.dyn_tree = t, this.max_code = 0, this.stat_desc = i;
}
const Un = (t) => t < 256 ? ae[t] : ae[256 + (t >>> 7)], le = (t, i) => {
  t.pending_buf[t.pending++] = i & 255, t.pending_buf[t.pending++] = i >>> 8 & 255;
}, V = (t, i, e) => {
  t.bi_valid > Ce - e ? (t.bi_buf |= i << t.bi_valid & 65535, le(t, t.bi_buf), t.bi_buf = i >> Ce - t.bi_valid, t.bi_valid += e - Ce) : (t.bi_buf |= i << t.bi_valid & 65535, t.bi_valid += e);
}, lt = (t, i, e) => {
  V(
    t,
    e[i * 2],
    e[i * 2 + 1]
    /*.Len*/
  );
}, Dn = (t, i) => {
  let e = 0;
  do
    e |= t & 1, t >>>= 1, e <<= 1;
  while (--i > 0);
  return e >>> 1;
}, Hr = (t) => {
  t.bi_valid === 16 ? (le(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = t.bi_buf & 255, t.bi_buf >>= 8, t.bi_valid -= 8);
}, Pr = (t, i) => {
  const e = i.dyn_tree, a = i.max_code, o = i.stat_desc.static_tree, f = i.stat_desc.has_stree, u = i.stat_desc.extra_bits, l = i.stat_desc.extra_base, x = i.stat_desc.max_length;
  let s, _, E, y, w, m, z = 0;
  for (y = 0; y <= kt; y++)
    t.bl_count[y] = 0;
  for (e[t.heap[t.heap_max] * 2 + 1] = 0, s = t.heap_max + 1; s < vn; s++)
    _ = t.heap[s], y = e[e[_ * 2 + 1] * 2 + 1] + 1, y > x && (y = x, z++), e[_ * 2 + 1] = y, !(_ > a) && (t.bl_count[y]++, w = 0, _ >= l && (w = u[_ - l]), m = e[_ * 2], t.opt_len += m * (y + w), f && (t.static_len += m * (o[_ * 2 + 1] + w)));
  if (z !== 0) {
    do {
      for (y = x - 1; t.bl_count[y] === 0; )
        y--;
      t.bl_count[y]--, t.bl_count[y + 1] += 2, t.bl_count[x]--, z -= 2;
    } while (z > 0);
    for (y = x; y !== 0; y--)
      for (_ = t.bl_count[y]; _ !== 0; )
        E = t.heap[--s], !(E > a) && (e[E * 2 + 1] !== y && (t.opt_len += (y - e[E * 2 + 1]) * e[E * 2], e[E * 2 + 1] = y), _--);
  }
}, zn = (t, i, e) => {
  const a = new Array(kt + 1);
  let o = 0, f, u;
  for (f = 1; f <= kt; f++)
    o = o + e[f - 1] << 1, a[f] = o;
  for (u = 0; u <= i; u++) {
    let l = t[u * 2 + 1];
    l !== 0 && (t[u * 2] = Dn(a[l]++, l));
  }
}, Gr = () => {
  let t, i, e, a, o;
  const f = new Array(kt + 1);
  for (e = 0, a = 0; a < si - 1; a++)
    for (_i[a] = e, t = 0; t < 1 << qe[a]; t++)
      oe[e++] = a;
  for (oe[e - 1] = a, o = 0, a = 0; a < 16; a++)
    for (ve[a] = o, t = 0; t < 1 << ke[a]; t++)
      ae[o++] = a;
  for (o >>= 7; a < Ct; a++)
    for (ve[a] = o << 7, t = 0; t < 1 << ke[a] - 7; t++)
      ae[256 + o++] = a;
  for (i = 0; i <= kt; i++)
    f[i] = 0;
  for (t = 0; t <= 143; )
    ut[t * 2 + 1] = 8, t++, f[8]++;
  for (; t <= 255; )
    ut[t * 2 + 1] = 9, t++, f[9]++;
  for (; t <= 279; )
    ut[t * 2 + 1] = 7, t++, f[7]++;
  for (; t <= 287; )
    ut[t * 2 + 1] = 8, t++, f[8]++;
  for (zn(ut, re + 1, f), t = 0; t < Ct; t++)
    ee[t * 2 + 1] = 5, ee[t * 2] = Dn(t, 5);
  Tn = new Le(ut, qe, ue + 1, re, kt), Rn = new Le(ee, ke, 0, Ct, kt), Fn = new Le(new Array(0), Mr, 0, ui, Zr);
}, On = (t) => {
  let i;
  for (i = 0; i < re; i++)
    t.dyn_ltree[i * 2] = 0;
  for (i = 0; i < Ct; i++)
    t.dyn_dtree[i * 2] = 0;
  for (i = 0; i < ui; i++)
    t.bl_tree[i * 2] = 0;
  t.dyn_ltree[di * 2] = 1, t.opt_len = t.static_len = 0, t.sym_next = t.matches = 0;
}, Nn = (t) => {
  t.bi_valid > 8 ? le(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0;
}, Ti = (t, i, e, a) => {
  const o = i * 2, f = e * 2;
  return t[o] < t[f] || t[o] === t[f] && a[i] <= a[e];
}, Me = (t, i, e) => {
  const a = t.heap[e];
  let o = e << 1;
  for (; o <= t.heap_len && (o < t.heap_len && Ti(i, t.heap[o + 1], t.heap[o], t.depth) && o++, !Ti(i, a, t.heap[o], t.depth)); )
    t.heap[e] = t.heap[o], e = o, o <<= 1;
  t.heap[e] = a;
}, Ri = (t, i, e) => {
  let a, o, f = 0, u, l;
  if (t.sym_next !== 0)
    do
      a = t.pending_buf[t.sym_buf + f++] & 255, a += (t.pending_buf[t.sym_buf + f++] & 255) << 8, o = t.pending_buf[t.sym_buf + f++], a === 0 ? lt(t, o, i) : (u = oe[o], lt(t, u + ue + 1, i), l = qe[u], l !== 0 && (o -= _i[u], V(t, o, l)), a--, u = Un(a), lt(t, u, e), l = ke[u], l !== 0 && (a -= ve[u], V(t, a, l)));
    while (f < t.sym_next);
  lt(t, di, i);
}, Qe = (t, i) => {
  const e = i.dyn_tree, a = i.stat_desc.static_tree, o = i.stat_desc.has_stree, f = i.stat_desc.elems;
  let u, l, x = -1, s;
  for (t.heap_len = 0, t.heap_max = vn, u = 0; u < f; u++)
    e[u * 2] !== 0 ? (t.heap[++t.heap_len] = x = u, t.depth[u] = 0) : e[u * 2 + 1] = 0;
  for (; t.heap_len < 2; )
    s = t.heap[++t.heap_len] = x < 2 ? ++x : 0, e[s * 2] = 1, t.depth[s] = 0, t.opt_len--, o && (t.static_len -= a[s * 2 + 1]);
  for (i.max_code = x, u = t.heap_len >> 1; u >= 1; u--)
    Me(t, e, u);
  s = f;
  do
    u = t.heap[
      1
      /*SMALLEST*/
    ], t.heap[
      1
      /*SMALLEST*/
    ] = t.heap[t.heap_len--], Me(
      t,
      e,
      1
      /*SMALLEST*/
    ), l = t.heap[
      1
      /*SMALLEST*/
    ], t.heap[--t.heap_max] = u, t.heap[--t.heap_max] = l, e[s * 2] = e[u * 2] + e[l * 2], t.depth[s] = (t.depth[u] >= t.depth[l] ? t.depth[u] : t.depth[l]) + 1, e[u * 2 + 1] = e[l * 2 + 1] = s, t.heap[
      1
      /*SMALLEST*/
    ] = s++, Me(
      t,
      e,
      1
      /*SMALLEST*/
    );
  while (t.heap_len >= 2);
  t.heap[--t.heap_max] = t.heap[
    1
    /*SMALLEST*/
  ], Pr(t, i), zn(e, x, t.bl_count);
}, Fi = (t, i, e) => {
  let a, o = -1, f, u = i[0 * 2 + 1], l = 0, x = 7, s = 4;
  for (u === 0 && (x = 138, s = 3), i[(e + 1) * 2 + 1] = 65535, a = 0; a <= e; a++)
    f = u, u = i[(a + 1) * 2 + 1], !(++l < x && f === u) && (l < s ? t.bl_tree[f * 2] += l : f !== 0 ? (f !== o && t.bl_tree[f * 2]++, t.bl_tree[An * 2]++) : l <= 10 ? t.bl_tree[Bn * 2]++ : t.bl_tree[In * 2]++, l = 0, o = f, u === 0 ? (x = 138, s = 3) : f === u ? (x = 6, s = 3) : (x = 7, s = 4));
}, Ui = (t, i, e) => {
  let a, o = -1, f, u = i[0 * 2 + 1], l = 0, x = 7, s = 4;
  for (u === 0 && (x = 138, s = 3), a = 0; a <= e; a++)
    if (f = u, u = i[(a + 1) * 2 + 1], !(++l < x && f === u)) {
      if (l < s)
        do
          lt(t, f, t.bl_tree);
        while (--l !== 0);
      else
        f !== 0 ? (f !== o && (lt(t, f, t.bl_tree), l--), lt(t, An, t.bl_tree), V(t, l - 3, 2)) : l <= 10 ? (lt(t, Bn, t.bl_tree), V(t, l - 3, 3)) : (lt(t, In, t.bl_tree), V(t, l - 11, 7));
      l = 0, o = f, u === 0 ? (x = 138, s = 3) : f === u ? (x = 6, s = 3) : (x = 7, s = 4);
    }
}, Kr = (t) => {
  let i;
  for (Fi(t, t.dyn_ltree, t.l_desc.max_code), Fi(t, t.dyn_dtree, t.d_desc.max_code), Qe(t, t.bl_desc), i = ui - 1; i >= 3 && t.bl_tree[Sn[i] * 2 + 1] === 0; i--)
    ;
  return t.opt_len += 3 * (i + 1) + 5 + 5 + 4, i;
}, jr = (t, i, e, a) => {
  let o;
  for (V(t, i - 257, 5), V(t, e - 1, 5), V(t, a - 4, 4), o = 0; o < a; o++)
    V(t, t.bl_tree[Sn[o] * 2 + 1], 3);
  Ui(t, t.dyn_ltree, i - 1), Ui(t, t.dyn_dtree, e - 1);
}, Yr = (t) => {
  let i = 4093624447, e;
  for (e = 0; e <= 31; e++, i >>>= 1)
    if (i & 1 && t.dyn_ltree[e * 2] !== 0)
      return Ii;
  if (t.dyn_ltree[9 * 2] !== 0 || t.dyn_ltree[10 * 2] !== 0 || t.dyn_ltree[13 * 2] !== 0)
    return Si;
  for (e = 32; e < ue; e++)
    if (t.dyn_ltree[e * 2] !== 0)
      return Si;
  return Ii;
};
let Di = !1;
const Xr = (t) => {
  Di || (Gr(), Di = !0), t.l_desc = new Ze(t.dyn_ltree, Tn), t.d_desc = new Ze(t.dyn_dtree, Rn), t.bl_desc = new Ze(t.bl_tree, Fn), t.bi_buf = 0, t.bi_valid = 0, On(t);
}, Cn = (t, i, e, a) => {
  V(t, (Or << 1) + (a ? 1 : 0), 3), Nn(t), le(t, e), le(t, ~e), e && t.pending_buf.set(t.window.subarray(i, i + e), t.pending), t.pending += e;
}, Wr = (t) => {
  V(t, kn << 1, 3), lt(t, di, ut), Hr(t);
}, Jr = (t, i, e, a) => {
  let o, f, u = 0;
  t.level > 0 ? (t.strm.data_type === zr && (t.strm.data_type = Yr(t)), Qe(t, t.l_desc), Qe(t, t.d_desc), u = Kr(t), o = t.opt_len + 3 + 7 >>> 3, f = t.static_len + 3 + 7 >>> 3, f <= o && (o = f)) : o = f = e + 5, e + 4 <= o && i !== -1 ? Cn(t, i, e, a) : t.strategy === Dr || f === o ? (V(t, (kn << 1) + (a ? 1 : 0), 3), Ri(t, ut, ee)) : (V(t, (Nr << 1) + (a ? 1 : 0), 3), jr(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, u + 1), Ri(t, t.dyn_ltree, t.dyn_dtree)), On(t), a && Nn(t);
}, Vr = (t, i, e) => (t.pending_buf[t.sym_buf + t.sym_next++] = i, t.pending_buf[t.sym_buf + t.sym_next++] = i >> 8, t.pending_buf[t.sym_buf + t.sym_next++] = e, i === 0 ? t.dyn_ltree[e * 2]++ : (t.matches++, i--, t.dyn_ltree[(oe[e] + ue + 1) * 2]++, t.dyn_dtree[Un(i) * 2]++), t.sym_next === t.sym_end);
var qr = Xr, Qr = Cn, ta = Jr, ea = Vr, ia = Wr, na = {
  _tr_init: qr,
  _tr_stored_block: Qr,
  _tr_flush_block: ta,
  _tr_tally: ea,
  _tr_align: ia
};
const ra = (t, i, e, a) => {
  let o = t & 65535 | 0, f = t >>> 16 & 65535 | 0, u = 0;
  for (; e !== 0; ) {
    u = e > 2e3 ? 2e3 : e, e -= u;
    do
      o = o + i[a++] | 0, f = f + o | 0;
    while (--u);
    o %= 65521, f %= 65521;
  }
  return o | f << 16 | 0;
};
var fe = ra;
const aa = () => {
  let t, i = [];
  for (var e = 0; e < 256; e++) {
    t = e;
    for (var a = 0; a < 8; a++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    i[e] = t;
  }
  return i;
}, oa = new Uint32Array(aa()), la = (t, i, e, a) => {
  const o = oa, f = a + e;
  t ^= -1;
  for (let u = a; u < f; u++)
    t = t >>> 8 ^ o[(t ^ i[u]) & 255];
  return t ^ -1;
};
var Y = la, Lt = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, de = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const { _tr_init: fa, _tr_stored_block: ti, _tr_flush_block: ha, _tr_tally: xt, _tr_align: ca } = na, {
  Z_NO_FLUSH: yt,
  Z_PARTIAL_FLUSH: sa,
  Z_FULL_FLUSH: ua,
  Z_FINISH: it,
  Z_BLOCK: zi,
  Z_OK: X,
  Z_STREAM_END: Oi,
  Z_STREAM_ERROR: ft,
  Z_DATA_ERROR: da,
  Z_BUF_ERROR: $e,
  Z_DEFAULT_COMPRESSION: _a,
  Z_FILTERED: pa,
  Z_HUFFMAN_ONLY: xe,
  Z_RLE: wa,
  Z_FIXED: ga,
  Z_DEFAULT_STRATEGY: xa,
  Z_UNKNOWN: ya,
  Z_DEFLATED: Re
} = de, ba = 9, Ea = 15, ma = 8, ka = 29, va = 256, ei = va + 1 + ka, Aa = 30, Ba = 19, Ia = 2 * ei + 1, Sa = 15, D = 3, gt = 258, ht = gt + D + 1, Ta = 32, Zt = 42, pi = 57, ii = 69, ni = 73, ri = 91, ai = 103, vt = 113, qt = 666, W = 1, Pt = 2, Bt = 3, Gt = 4, Ra = 3, At = (t, i) => (t.msg = Lt[i], i), Ni = (t) => t * 2 - (t > 4 ? 9 : 0), wt = (t) => {
  let i = t.length;
  for (; --i >= 0; )
    t[i] = 0;
}, Fa = (t) => {
  let i, e, a, o = t.w_size;
  i = t.hash_size, a = i;
  do
    e = t.head[--a], t.head[a] = e >= o ? e - o : 0;
  while (--i);
  i = o, a = i;
  do
    e = t.prev[--a], t.prev[a] = e >= o ? e - o : 0;
  while (--i);
};
let Ua = (t, i, e) => (i << t.hash_shift ^ e) & t.hash_mask, bt = Ua;
const q = (t) => {
  const i = t.state;
  let e = i.pending;
  e > t.avail_out && (e = t.avail_out), e !== 0 && (t.output.set(i.pending_buf.subarray(i.pending_out, i.pending_out + e), t.next_out), t.next_out += e, i.pending_out += e, t.total_out += e, t.avail_out -= e, i.pending -= e, i.pending === 0 && (i.pending_out = 0));
}, tt = (t, i) => {
  ha(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, i), t.block_start = t.strstart, q(t.strm);
}, O = (t, i) => {
  t.pending_buf[t.pending++] = i;
}, Wt = (t, i) => {
  t.pending_buf[t.pending++] = i >>> 8 & 255, t.pending_buf[t.pending++] = i & 255;
}, oi = (t, i, e, a) => {
  let o = t.avail_in;
  return o > a && (o = a), o === 0 ? 0 : (t.avail_in -= o, i.set(t.input.subarray(t.next_in, t.next_in + o), e), t.state.wrap === 1 ? t.adler = fe(t.adler, i, o, e) : t.state.wrap === 2 && (t.adler = Y(t.adler, i, o, e)), t.next_in += o, t.total_in += o, o);
}, Ln = (t, i) => {
  let e = t.max_chain_length, a = t.strstart, o, f, u = t.prev_length, l = t.nice_match;
  const x = t.strstart > t.w_size - ht ? t.strstart - (t.w_size - ht) : 0, s = t.window, _ = t.w_mask, E = t.prev, y = t.strstart + gt;
  let w = s[a + u - 1], m = s[a + u];
  t.prev_length >= t.good_match && (e >>= 2), l > t.lookahead && (l = t.lookahead);
  do
    if (o = i, !(s[o + u] !== m || s[o + u - 1] !== w || s[o] !== s[a] || s[++o] !== s[a + 1])) {
      a += 2, o++;
      do
        ;
      while (s[++a] === s[++o] && s[++a] === s[++o] && s[++a] === s[++o] && s[++a] === s[++o] && s[++a] === s[++o] && s[++a] === s[++o] && s[++a] === s[++o] && s[++a] === s[++o] && a < y);
      if (f = gt - (y - a), a = y - gt, f > u) {
        if (t.match_start = i, u = f, f >= l)
          break;
        w = s[a + u - 1], m = s[a + u];
      }
    }
  while ((i = E[i & _]) > x && --e !== 0);
  return u <= t.lookahead ? u : t.lookahead;
}, Mt = (t) => {
  const i = t.w_size;
  let e, a, o;
  do {
    if (a = t.window_size - t.lookahead - t.strstart, t.strstart >= i + (i - ht) && (t.window.set(t.window.subarray(i, i + i - a), 0), t.match_start -= i, t.strstart -= i, t.block_start -= i, t.insert > t.strstart && (t.insert = t.strstart), Fa(t), a += i), t.strm.avail_in === 0)
      break;
    if (e = oi(t.strm, t.window, t.strstart + t.lookahead, a), t.lookahead += e, t.lookahead + t.insert >= D)
      for (o = t.strstart - t.insert, t.ins_h = t.window[o], t.ins_h = bt(t, t.ins_h, t.window[o + 1]); t.insert && (t.ins_h = bt(t, t.ins_h, t.window[o + D - 1]), t.prev[o & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = o, o++, t.insert--, !(t.lookahead + t.insert < D)); )
        ;
  } while (t.lookahead < ht && t.strm.avail_in !== 0);
}, Zn = (t, i) => {
  let e = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5, a, o, f, u = 0, l = t.strm.avail_in;
  do {
    if (a = 65535, f = t.bi_valid + 42 >> 3, t.strm.avail_out < f || (f = t.strm.avail_out - f, o = t.strstart - t.block_start, a > o + t.strm.avail_in && (a = o + t.strm.avail_in), a > f && (a = f), a < e && (a === 0 && i !== it || i === yt || a !== o + t.strm.avail_in)))
      break;
    u = i === it && a === o + t.strm.avail_in ? 1 : 0, ti(t, 0, 0, u), t.pending_buf[t.pending - 4] = a, t.pending_buf[t.pending - 3] = a >> 8, t.pending_buf[t.pending - 2] = ~a, t.pending_buf[t.pending - 1] = ~a >> 8, q(t.strm), o && (o > a && (o = a), t.strm.output.set(t.window.subarray(t.block_start, t.block_start + o), t.strm.next_out), t.strm.next_out += o, t.strm.avail_out -= o, t.strm.total_out += o, t.block_start += o, a -= o), a && (oi(t.strm, t.strm.output, t.strm.next_out, a), t.strm.next_out += a, t.strm.avail_out -= a, t.strm.total_out += a);
  } while (u === 0);
  return l -= t.strm.avail_in, l && (l >= t.w_size ? (t.matches = 2, t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0), t.strstart = t.w_size, t.insert = t.strstart) : (t.window_size - t.strstart <= l && (t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, t.insert > t.strstart && (t.insert = t.strstart)), t.window.set(t.strm.input.subarray(t.strm.next_in - l, t.strm.next_in), t.strstart), t.strstart += l, t.insert += l > t.w_size - t.insert ? t.w_size - t.insert : l), t.block_start = t.strstart), t.high_water < t.strstart && (t.high_water = t.strstart), u ? Gt : i !== yt && i !== it && t.strm.avail_in === 0 && t.strstart === t.block_start ? Pt : (f = t.window_size - t.strstart, t.strm.avail_in > f && t.block_start >= t.w_size && (t.block_start -= t.w_size, t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, f += t.w_size, t.insert > t.strstart && (t.insert = t.strstart)), f > t.strm.avail_in && (f = t.strm.avail_in), f && (oi(t.strm, t.window, t.strstart, f), t.strstart += f, t.insert += f > t.w_size - t.insert ? t.w_size - t.insert : f), t.high_water < t.strstart && (t.high_water = t.strstart), f = t.bi_valid + 42 >> 3, f = t.pending_buf_size - f > 65535 ? 65535 : t.pending_buf_size - f, e = f > t.w_size ? t.w_size : f, o = t.strstart - t.block_start, (o >= e || (o || i === it) && i !== yt && t.strm.avail_in === 0 && o <= f) && (a = o > f ? f : o, u = i === it && t.strm.avail_in === 0 && a === o ? 1 : 0, ti(t, t.block_start, a, u), t.block_start += a, q(t.strm)), u ? Bt : W);
}, He = (t, i) => {
  let e, a;
  for (; ; ) {
    if (t.lookahead < ht) {
      if (Mt(t), t.lookahead < ht && i === yt)
        return W;
      if (t.lookahead === 0)
        break;
    }
    if (e = 0, t.lookahead >= D && (t.ins_h = bt(t, t.ins_h, t.window[t.strstart + D - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), e !== 0 && t.strstart - e <= t.w_size - ht && (t.match_length = Ln(t, e)), t.match_length >= D)
      if (a = xt(t, t.strstart - t.match_start, t.match_length - D), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= D) {
        t.match_length--;
        do
          t.strstart++, t.ins_h = bt(t, t.ins_h, t.window[t.strstart + D - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
        while (--t.match_length !== 0);
        t.strstart++;
      } else
        t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = bt(t, t.ins_h, t.window[t.strstart + 1]);
    else
      a = xt(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
    if (a && (tt(t, !1), t.strm.avail_out === 0))
      return W;
  }
  return t.insert = t.strstart < D - 1 ? t.strstart : D - 1, i === it ? (tt(t, !0), t.strm.avail_out === 0 ? Bt : Gt) : t.sym_next && (tt(t, !1), t.strm.avail_out === 0) ? W : Pt;
}, Ut = (t, i) => {
  let e, a, o;
  for (; ; ) {
    if (t.lookahead < ht) {
      if (Mt(t), t.lookahead < ht && i === yt)
        return W;
      if (t.lookahead === 0)
        break;
    }
    if (e = 0, t.lookahead >= D && (t.ins_h = bt(t, t.ins_h, t.window[t.strstart + D - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = D - 1, e !== 0 && t.prev_length < t.max_lazy_match && t.strstart - e <= t.w_size - ht && (t.match_length = Ln(t, e), t.match_length <= 5 && (t.strategy === pa || t.match_length === D && t.strstart - t.match_start > 4096) && (t.match_length = D - 1)), t.prev_length >= D && t.match_length <= t.prev_length) {
      o = t.strstart + t.lookahead - D, a = xt(t, t.strstart - 1 - t.prev_match, t.prev_length - D), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
      do
        ++t.strstart <= o && (t.ins_h = bt(t, t.ins_h, t.window[t.strstart + D - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
      while (--t.prev_length !== 0);
      if (t.match_available = 0, t.match_length = D - 1, t.strstart++, a && (tt(t, !1), t.strm.avail_out === 0))
        return W;
    } else if (t.match_available) {
      if (a = xt(t, 0, t.window[t.strstart - 1]), a && tt(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0)
        return W;
    } else
      t.match_available = 1, t.strstart++, t.lookahead--;
  }
  return t.match_available && (a = xt(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < D - 1 ? t.strstart : D - 1, i === it ? (tt(t, !0), t.strm.avail_out === 0 ? Bt : Gt) : t.sym_next && (tt(t, !1), t.strm.avail_out === 0) ? W : Pt;
}, Da = (t, i) => {
  let e, a, o, f;
  const u = t.window;
  for (; ; ) {
    if (t.lookahead <= gt) {
      if (Mt(t), t.lookahead <= gt && i === yt)
        return W;
      if (t.lookahead === 0)
        break;
    }
    if (t.match_length = 0, t.lookahead >= D && t.strstart > 0 && (o = t.strstart - 1, a = u[o], a === u[++o] && a === u[++o] && a === u[++o])) {
      f = t.strstart + gt;
      do
        ;
      while (a === u[++o] && a === u[++o] && a === u[++o] && a === u[++o] && a === u[++o] && a === u[++o] && a === u[++o] && a === u[++o] && o < f);
      t.match_length = gt - (f - o), t.match_length > t.lookahead && (t.match_length = t.lookahead);
    }
    if (t.match_length >= D ? (e = xt(t, 1, t.match_length - D), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (e = xt(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), e && (tt(t, !1), t.strm.avail_out === 0))
      return W;
  }
  return t.insert = 0, i === it ? (tt(t, !0), t.strm.avail_out === 0 ? Bt : Gt) : t.sym_next && (tt(t, !1), t.strm.avail_out === 0) ? W : Pt;
}, za = (t, i) => {
  let e;
  for (; ; ) {
    if (t.lookahead === 0 && (Mt(t), t.lookahead === 0)) {
      if (i === yt)
        return W;
      break;
    }
    if (t.match_length = 0, e = xt(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, e && (tt(t, !1), t.strm.avail_out === 0))
      return W;
  }
  return t.insert = 0, i === it ? (tt(t, !0), t.strm.avail_out === 0 ? Bt : Gt) : t.sym_next && (tt(t, !1), t.strm.avail_out === 0) ? W : Pt;
};
function at(t, i, e, a, o) {
  this.good_length = t, this.max_lazy = i, this.nice_length = e, this.max_chain = a, this.func = o;
}
const Qt = [
  /*      good lazy nice chain */
  new at(0, 0, 0, 0, Zn),
  /* 0 store only */
  new at(4, 4, 8, 4, He),
  /* 1 max speed, no lazy matches */
  new at(4, 5, 16, 8, He),
  /* 2 */
  new at(4, 6, 32, 32, He),
  /* 3 */
  new at(4, 4, 16, 16, Ut),
  /* 4 lazy matches */
  new at(8, 16, 32, 32, Ut),
  /* 5 */
  new at(8, 16, 128, 128, Ut),
  /* 6 */
  new at(8, 32, 128, 256, Ut),
  /* 7 */
  new at(32, 128, 258, 1024, Ut),
  /* 8 */
  new at(32, 258, 258, 4096, Ut)
  /* 9 max compression */
], Oa = (t) => {
  t.window_size = 2 * t.w_size, wt(t.head), t.max_lazy_match = Qt[t.level].max_lazy, t.good_match = Qt[t.level].good_length, t.nice_match = Qt[t.level].nice_length, t.max_chain_length = Qt[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = D - 1, t.match_available = 0, t.ins_h = 0;
};
function Na() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Re, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(Ia * 2), this.dyn_dtree = new Uint16Array((2 * Aa + 1) * 2), this.bl_tree = new Uint16Array((2 * Ba + 1) * 2), wt(this.dyn_ltree), wt(this.dyn_dtree), wt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(Sa + 1), this.heap = new Uint16Array(2 * ei + 1), wt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * ei + 1), wt(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
const _e = (t) => {
  if (!t)
    return 1;
  const i = t.state;
  return !i || i.strm !== t || i.status !== Zt && //#ifdef GZIP
  i.status !== pi && //#endif
  i.status !== ii && i.status !== ni && i.status !== ri && i.status !== ai && i.status !== vt && i.status !== qt ? 1 : 0;
}, Mn = (t) => {
  if (_e(t))
    return At(t, ft);
  t.total_in = t.total_out = 0, t.data_type = ya;
  const i = t.state;
  return i.pending = 0, i.pending_out = 0, i.wrap < 0 && (i.wrap = -i.wrap), i.status = //#ifdef GZIP
  i.wrap === 2 ? pi : (
    //#endif
    i.wrap ? Zt : vt
  ), t.adler = i.wrap === 2 ? 0 : 1, i.last_flush = -2, fa(i), X;
}, $n = (t) => {
  const i = Mn(t);
  return i === X && Oa(t.state), i;
}, Ca = (t, i) => _e(t) || t.state.wrap !== 2 ? ft : (t.state.gzhead = i, X), Hn = (t, i, e, a, o, f) => {
  if (!t)
    return ft;
  let u = 1;
  if (i === _a && (i = 6), a < 0 ? (u = 0, a = -a) : a > 15 && (u = 2, a -= 16), o < 1 || o > ba || e !== Re || a < 8 || a > 15 || i < 0 || i > 9 || f < 0 || f > ga || a === 8 && u !== 1)
    return At(t, ft);
  a === 8 && (a = 9);
  const l = new Na();
  return t.state = l, l.strm = t, l.status = Zt, l.wrap = u, l.gzhead = null, l.w_bits = a, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = o + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + D - 1) / D), l.window = new Uint8Array(l.w_size * 2), l.head = new Uint16Array(l.hash_size), l.prev = new Uint16Array(l.w_size), l.lit_bufsize = 1 << o + 6, l.pending_buf_size = l.lit_bufsize * 4, l.pending_buf = new Uint8Array(l.pending_buf_size), l.sym_buf = l.lit_bufsize, l.sym_end = (l.lit_bufsize - 1) * 3, l.level = i, l.strategy = f, l.method = e, $n(t);
}, La = (t, i) => Hn(t, i, Re, Ea, ma, xa), Za = (t, i) => {
  if (_e(t) || i > zi || i < 0)
    return t ? At(t, ft) : ft;
  const e = t.state;
  if (!t.output || t.avail_in !== 0 && !t.input || e.status === qt && i !== it)
    return At(t, t.avail_out === 0 ? $e : ft);
  const a = e.last_flush;
  if (e.last_flush = i, e.pending !== 0) {
    if (q(t), t.avail_out === 0)
      return e.last_flush = -1, X;
  } else if (t.avail_in === 0 && Ni(i) <= Ni(a) && i !== it)
    return At(t, $e);
  if (e.status === qt && t.avail_in !== 0)
    return At(t, $e);
  if (e.status === Zt && e.wrap === 0 && (e.status = vt), e.status === Zt) {
    let o = Re + (e.w_bits - 8 << 4) << 8, f = -1;
    if (e.strategy >= xe || e.level < 2 ? f = 0 : e.level < 6 ? f = 1 : e.level === 6 ? f = 2 : f = 3, o |= f << 6, e.strstart !== 0 && (o |= Ta), o += 31 - o % 31, Wt(e, o), e.strstart !== 0 && (Wt(e, t.adler >>> 16), Wt(e, t.adler & 65535)), t.adler = 1, e.status = vt, q(t), e.pending !== 0)
      return e.last_flush = -1, X;
  }
  if (e.status === pi) {
    if (t.adler = 0, O(e, 31), O(e, 139), O(e, 8), e.gzhead)
      O(
        e,
        (e.gzhead.text ? 1 : 0) + (e.gzhead.hcrc ? 2 : 0) + (e.gzhead.extra ? 4 : 0) + (e.gzhead.name ? 8 : 0) + (e.gzhead.comment ? 16 : 0)
      ), O(e, e.gzhead.time & 255), O(e, e.gzhead.time >> 8 & 255), O(e, e.gzhead.time >> 16 & 255), O(e, e.gzhead.time >> 24 & 255), O(e, e.level === 9 ? 2 : e.strategy >= xe || e.level < 2 ? 4 : 0), O(e, e.gzhead.os & 255), e.gzhead.extra && e.gzhead.extra.length && (O(e, e.gzhead.extra.length & 255), O(e, e.gzhead.extra.length >> 8 & 255)), e.gzhead.hcrc && (t.adler = Y(t.adler, e.pending_buf, e.pending, 0)), e.gzindex = 0, e.status = ii;
    else if (O(e, 0), O(e, 0), O(e, 0), O(e, 0), O(e, 0), O(e, e.level === 9 ? 2 : e.strategy >= xe || e.level < 2 ? 4 : 0), O(e, Ra), e.status = vt, q(t), e.pending !== 0)
      return e.last_flush = -1, X;
  }
  if (e.status === ii) {
    if (e.gzhead.extra) {
      let o = e.pending, f = (e.gzhead.extra.length & 65535) - e.gzindex;
      for (; e.pending + f > e.pending_buf_size; ) {
        let l = e.pending_buf_size - e.pending;
        if (e.pending_buf.set(e.gzhead.extra.subarray(e.gzindex, e.gzindex + l), e.pending), e.pending = e.pending_buf_size, e.gzhead.hcrc && e.pending > o && (t.adler = Y(t.adler, e.pending_buf, e.pending - o, o)), e.gzindex += l, q(t), e.pending !== 0)
          return e.last_flush = -1, X;
        o = 0, f -= l;
      }
      let u = new Uint8Array(e.gzhead.extra);
      e.pending_buf.set(u.subarray(e.gzindex, e.gzindex + f), e.pending), e.pending += f, e.gzhead.hcrc && e.pending > o && (t.adler = Y(t.adler, e.pending_buf, e.pending - o, o)), e.gzindex = 0;
    }
    e.status = ni;
  }
  if (e.status === ni) {
    if (e.gzhead.name) {
      let o = e.pending, f;
      do {
        if (e.pending === e.pending_buf_size) {
          if (e.gzhead.hcrc && e.pending > o && (t.adler = Y(t.adler, e.pending_buf, e.pending - o, o)), q(t), e.pending !== 0)
            return e.last_flush = -1, X;
          o = 0;
        }
        e.gzindex < e.gzhead.name.length ? f = e.gzhead.name.charCodeAt(e.gzindex++) & 255 : f = 0, O(e, f);
      } while (f !== 0);
      e.gzhead.hcrc && e.pending > o && (t.adler = Y(t.adler, e.pending_buf, e.pending - o, o)), e.gzindex = 0;
    }
    e.status = ri;
  }
  if (e.status === ri) {
    if (e.gzhead.comment) {
      let o = e.pending, f;
      do {
        if (e.pending === e.pending_buf_size) {
          if (e.gzhead.hcrc && e.pending > o && (t.adler = Y(t.adler, e.pending_buf, e.pending - o, o)), q(t), e.pending !== 0)
            return e.last_flush = -1, X;
          o = 0;
        }
        e.gzindex < e.gzhead.comment.length ? f = e.gzhead.comment.charCodeAt(e.gzindex++) & 255 : f = 0, O(e, f);
      } while (f !== 0);
      e.gzhead.hcrc && e.pending > o && (t.adler = Y(t.adler, e.pending_buf, e.pending - o, o));
    }
    e.status = ai;
  }
  if (e.status === ai) {
    if (e.gzhead.hcrc) {
      if (e.pending + 2 > e.pending_buf_size && (q(t), e.pending !== 0))
        return e.last_flush = -1, X;
      O(e, t.adler & 255), O(e, t.adler >> 8 & 255), t.adler = 0;
    }
    if (e.status = vt, q(t), e.pending !== 0)
      return e.last_flush = -1, X;
  }
  if (t.avail_in !== 0 || e.lookahead !== 0 || i !== yt && e.status !== qt) {
    let o = e.level === 0 ? Zn(e, i) : e.strategy === xe ? za(e, i) : e.strategy === wa ? Da(e, i) : Qt[e.level].func(e, i);
    if ((o === Bt || o === Gt) && (e.status = qt), o === W || o === Bt)
      return t.avail_out === 0 && (e.last_flush = -1), X;
    if (o === Pt && (i === sa ? ca(e) : i !== zi && (ti(e, 0, 0, !1), i === ua && (wt(e.head), e.lookahead === 0 && (e.strstart = 0, e.block_start = 0, e.insert = 0))), q(t), t.avail_out === 0))
      return e.last_flush = -1, X;
  }
  return i !== it ? X : e.wrap <= 0 ? Oi : (e.wrap === 2 ? (O(e, t.adler & 255), O(e, t.adler >> 8 & 255), O(e, t.adler >> 16 & 255), O(e, t.adler >> 24 & 255), O(e, t.total_in & 255), O(e, t.total_in >> 8 & 255), O(e, t.total_in >> 16 & 255), O(e, t.total_in >> 24 & 255)) : (Wt(e, t.adler >>> 16), Wt(e, t.adler & 65535)), q(t), e.wrap > 0 && (e.wrap = -e.wrap), e.pending !== 0 ? X : Oi);
}, Ma = (t) => {
  if (_e(t))
    return ft;
  const i = t.state.status;
  return t.state = null, i === vt ? At(t, da) : X;
}, $a = (t, i) => {
  let e = i.length;
  if (_e(t))
    return ft;
  const a = t.state, o = a.wrap;
  if (o === 2 || o === 1 && a.status !== Zt || a.lookahead)
    return ft;
  if (o === 1 && (t.adler = fe(t.adler, i, e, 0)), a.wrap = 0, e >= a.w_size) {
    o === 0 && (wt(a.head), a.strstart = 0, a.block_start = 0, a.insert = 0);
    let x = new Uint8Array(a.w_size);
    x.set(i.subarray(e - a.w_size, e), 0), i = x, e = a.w_size;
  }
  const f = t.avail_in, u = t.next_in, l = t.input;
  for (t.avail_in = e, t.next_in = 0, t.input = i, Mt(a); a.lookahead >= D; ) {
    let x = a.strstart, s = a.lookahead - (D - 1);
    do
      a.ins_h = bt(a, a.ins_h, a.window[x + D - 1]), a.prev[x & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = x, x++;
    while (--s);
    a.strstart = x, a.lookahead = D - 1, Mt(a);
  }
  return a.strstart += a.lookahead, a.block_start = a.strstart, a.insert = a.lookahead, a.lookahead = 0, a.match_length = a.prev_length = D - 1, a.match_available = 0, t.next_in = u, t.input = l, t.avail_in = f, a.wrap = o, X;
};
var Ha = La, Pa = Hn, Ga = $n, Ka = Mn, ja = Ca, Ya = Za, Xa = Ma, Wa = $a, Ja = "pako deflate (from Nodeca project)", ie = {
  deflateInit: Ha,
  deflateInit2: Pa,
  deflateReset: Ga,
  deflateResetKeep: Ka,
  deflateSetHeader: ja,
  deflate: Ya,
  deflateEnd: Xa,
  deflateSetDictionary: Wa,
  deflateInfo: Ja
};
const Va = (t, i) => Object.prototype.hasOwnProperty.call(t, i);
var qa = function(t) {
  const i = Array.prototype.slice.call(arguments, 1);
  for (; i.length; ) {
    const e = i.shift();
    if (e) {
      if (typeof e != "object")
        throw new TypeError(e + "must be non-object");
      for (const a in e)
        Va(e, a) && (t[a] = e[a]);
    }
  }
  return t;
}, Qa = (t) => {
  let i = 0;
  for (let a = 0, o = t.length; a < o; a++)
    i += t[a].length;
  const e = new Uint8Array(i);
  for (let a = 0, o = 0, f = t.length; a < f; a++) {
    let u = t[a];
    e.set(u, o), o += u.length;
  }
  return e;
}, Fe = {
  assign: qa,
  flattenChunks: Qa
};
let Pn = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Pn = !1;
}
const he = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  he[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
he[254] = he[254] = 1;
var to = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let i, e, a, o, f, u = t.length, l = 0;
  for (o = 0; o < u; o++)
    e = t.charCodeAt(o), (e & 64512) === 55296 && o + 1 < u && (a = t.charCodeAt(o + 1), (a & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (a - 56320), o++)), l += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
  for (i = new Uint8Array(l), f = 0, o = 0; f < l; o++)
    e = t.charCodeAt(o), (e & 64512) === 55296 && o + 1 < u && (a = t.charCodeAt(o + 1), (a & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (a - 56320), o++)), e < 128 ? i[f++] = e : e < 2048 ? (i[f++] = 192 | e >>> 6, i[f++] = 128 | e & 63) : e < 65536 ? (i[f++] = 224 | e >>> 12, i[f++] = 128 | e >>> 6 & 63, i[f++] = 128 | e & 63) : (i[f++] = 240 | e >>> 18, i[f++] = 128 | e >>> 12 & 63, i[f++] = 128 | e >>> 6 & 63, i[f++] = 128 | e & 63);
  return i;
};
const eo = (t, i) => {
  if (i < 65534 && t.subarray && Pn)
    return String.fromCharCode.apply(null, t.length === i ? t : t.subarray(0, i));
  let e = "";
  for (let a = 0; a < i; a++)
    e += String.fromCharCode(t[a]);
  return e;
};
var io = (t, i) => {
  const e = i || t.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(t.subarray(0, i));
  let a, o;
  const f = new Array(e * 2);
  for (o = 0, a = 0; a < e; ) {
    let u = t[a++];
    if (u < 128) {
      f[o++] = u;
      continue;
    }
    let l = he[u];
    if (l > 4) {
      f[o++] = 65533, a += l - 1;
      continue;
    }
    for (u &= l === 2 ? 31 : l === 3 ? 15 : 7; l > 1 && a < e; )
      u = u << 6 | t[a++] & 63, l--;
    if (l > 1) {
      f[o++] = 65533;
      continue;
    }
    u < 65536 ? f[o++] = u : (u -= 65536, f[o++] = 55296 | u >> 10 & 1023, f[o++] = 56320 | u & 1023);
  }
  return eo(f, o);
}, no = (t, i) => {
  i = i || t.length, i > t.length && (i = t.length);
  let e = i - 1;
  for (; e >= 0 && (t[e] & 192) === 128; )
    e--;
  return e < 0 || e === 0 ? i : e + he[t[e]] > i ? e : i;
}, ce = {
  string2buf: to,
  buf2string: io,
  utf8border: no
};
function ro() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var Gn = ro;
const Kn = Object.prototype.toString, {
  Z_NO_FLUSH: ao,
  Z_SYNC_FLUSH: oo,
  Z_FULL_FLUSH: lo,
  Z_FINISH: fo,
  Z_OK: Ae,
  Z_STREAM_END: ho,
  Z_DEFAULT_COMPRESSION: co,
  Z_DEFAULT_STRATEGY: so,
  Z_DEFLATED: uo
} = de;
function pe(t) {
  this.options = Fe.assign({
    level: co,
    method: uo,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: so
  }, t || {});
  let i = this.options;
  i.raw && i.windowBits > 0 ? i.windowBits = -i.windowBits : i.gzip && i.windowBits > 0 && i.windowBits < 16 && (i.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Gn(), this.strm.avail_out = 0;
  let e = ie.deflateInit2(
    this.strm,
    i.level,
    i.method,
    i.windowBits,
    i.memLevel,
    i.strategy
  );
  if (e !== Ae)
    throw new Error(Lt[e]);
  if (i.header && ie.deflateSetHeader(this.strm, i.header), i.dictionary) {
    let a;
    if (typeof i.dictionary == "string" ? a = ce.string2buf(i.dictionary) : Kn.call(i.dictionary) === "[object ArrayBuffer]" ? a = new Uint8Array(i.dictionary) : a = i.dictionary, e = ie.deflateSetDictionary(this.strm, a), e !== Ae)
      throw new Error(Lt[e]);
    this._dict_set = !0;
  }
}
pe.prototype.push = function(t, i) {
  const e = this.strm, a = this.options.chunkSize;
  let o, f;
  if (this.ended)
    return !1;
  for (i === ~~i ? f = i : f = i === !0 ? fo : ao, typeof t == "string" ? e.input = ce.string2buf(t) : Kn.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length; ; ) {
    if (e.avail_out === 0 && (e.output = new Uint8Array(a), e.next_out = 0, e.avail_out = a), (f === oo || f === lo) && e.avail_out <= 6) {
      this.onData(e.output.subarray(0, e.next_out)), e.avail_out = 0;
      continue;
    }
    if (o = ie.deflate(e, f), o === ho)
      return e.next_out > 0 && this.onData(e.output.subarray(0, e.next_out)), o = ie.deflateEnd(this.strm), this.onEnd(o), this.ended = !0, o === Ae;
    if (e.avail_out === 0) {
      this.onData(e.output);
      continue;
    }
    if (f > 0 && e.next_out > 0) {
      this.onData(e.output.subarray(0, e.next_out)), e.avail_out = 0;
      continue;
    }
    if (e.avail_in === 0)
      break;
  }
  return !0;
};
pe.prototype.onData = function(t) {
  this.chunks.push(t);
};
pe.prototype.onEnd = function(t) {
  t === Ae && (this.result = Fe.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function wi(t, i) {
  const e = new pe(i);
  if (e.push(t, !0), e.err)
    throw e.msg || Lt[e.err];
  return e.result;
}
function _o(t, i) {
  return i = i || {}, i.raw = !0, wi(t, i);
}
function po(t, i) {
  return i = i || {}, i.gzip = !0, wi(t, i);
}
var wo = pe, go = wi, xo = _o, yo = po, bo = de, Eo = {
  Deflate: wo,
  deflate: go,
  deflateRaw: xo,
  gzip: yo,
  constants: bo
};
const ye = 16209, mo = 16191;
var ko = function(i, e) {
  let a, o, f, u, l, x, s, _, E, y, w, m, z, T, A, I, v, b, S, P, k, N, U, B;
  const F = i.state;
  a = i.next_in, U = i.input, o = a + (i.avail_in - 5), f = i.next_out, B = i.output, u = f - (e - i.avail_out), l = f + (i.avail_out - 257), x = F.dmax, s = F.wsize, _ = F.whave, E = F.wnext, y = F.window, w = F.hold, m = F.bits, z = F.lencode, T = F.distcode, A = (1 << F.lenbits) - 1, I = (1 << F.distbits) - 1;
  t:
    do {
      m < 15 && (w += U[a++] << m, m += 8, w += U[a++] << m, m += 8), v = z[w & A];
      e:
        for (; ; ) {
          if (b = v >>> 24, w >>>= b, m -= b, b = v >>> 16 & 255, b === 0)
            B[f++] = v & 65535;
          else if (b & 16) {
            S = v & 65535, b &= 15, b && (m < b && (w += U[a++] << m, m += 8), S += w & (1 << b) - 1, w >>>= b, m -= b), m < 15 && (w += U[a++] << m, m += 8, w += U[a++] << m, m += 8), v = T[w & I];
            i:
              for (; ; ) {
                if (b = v >>> 24, w >>>= b, m -= b, b = v >>> 16 & 255, b & 16) {
                  if (P = v & 65535, b &= 15, m < b && (w += U[a++] << m, m += 8, m < b && (w += U[a++] << m, m += 8)), P += w & (1 << b) - 1, P > x) {
                    i.msg = "invalid distance too far back", F.mode = ye;
                    break t;
                  }
                  if (w >>>= b, m -= b, b = f - u, P > b) {
                    if (b = P - b, b > _ && F.sane) {
                      i.msg = "invalid distance too far back", F.mode = ye;
                      break t;
                    }
                    if (k = 0, N = y, E === 0) {
                      if (k += s - b, b < S) {
                        S -= b;
                        do
                          B[f++] = y[k++];
                        while (--b);
                        k = f - P, N = B;
                      }
                    } else if (E < b) {
                      if (k += s + E - b, b -= E, b < S) {
                        S -= b;
                        do
                          B[f++] = y[k++];
                        while (--b);
                        if (k = 0, E < S) {
                          b = E, S -= b;
                          do
                            B[f++] = y[k++];
                          while (--b);
                          k = f - P, N = B;
                        }
                      }
                    } else if (k += E - b, b < S) {
                      S -= b;
                      do
                        B[f++] = y[k++];
                      while (--b);
                      k = f - P, N = B;
                    }
                    for (; S > 2; )
                      B[f++] = N[k++], B[f++] = N[k++], B[f++] = N[k++], S -= 3;
                    S && (B[f++] = N[k++], S > 1 && (B[f++] = N[k++]));
                  } else {
                    k = f - P;
                    do
                      B[f++] = B[k++], B[f++] = B[k++], B[f++] = B[k++], S -= 3;
                    while (S > 2);
                    S && (B[f++] = B[k++], S > 1 && (B[f++] = B[k++]));
                  }
                } else if (b & 64) {
                  i.msg = "invalid distance code", F.mode = ye;
                  break t;
                } else {
                  v = T[(v & 65535) + (w & (1 << b) - 1)];
                  continue i;
                }
                break;
              }
          } else if (b & 64)
            if (b & 32) {
              F.mode = mo;
              break t;
            } else {
              i.msg = "invalid literal/length code", F.mode = ye;
              break t;
            }
          else {
            v = z[(v & 65535) + (w & (1 << b) - 1)];
            continue e;
          }
          break;
        }
    } while (a < o && f < l);
  S = m >> 3, a -= S, m -= S << 3, w &= (1 << m) - 1, i.next_in = a, i.next_out = f, i.avail_in = a < o ? 5 + (o - a) : 5 - (a - o), i.avail_out = f < l ? 257 + (l - f) : 257 - (f - l), F.hold = w, F.bits = m;
};
const Dt = 15, Ci = 852, Li = 592, Zi = 0, Pe = 1, Mi = 2, vo = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), Ao = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]), Bo = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), Io = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), So = (t, i, e, a, o, f, u, l) => {
  const x = l.bits;
  let s = 0, _ = 0, E = 0, y = 0, w = 0, m = 0, z = 0, T = 0, A = 0, I = 0, v, b, S, P, k, N = null, U;
  const B = new Uint16Array(Dt + 1), F = new Uint16Array(Dt + 1);
  let ct = null, we, Et, mt;
  for (s = 0; s <= Dt; s++)
    B[s] = 0;
  for (_ = 0; _ < a; _++)
    B[i[e + _]]++;
  for (w = x, y = Dt; y >= 1 && B[y] === 0; y--)
    ;
  if (w > y && (w = y), y === 0)
    return o[f++] = 1 << 24 | 64 << 16 | 0, o[f++] = 1 << 24 | 64 << 16 | 0, l.bits = 1, 0;
  for (E = 1; E < y && B[E] === 0; E++)
    ;
  for (w < E && (w = E), T = 1, s = 1; s <= Dt; s++)
    if (T <<= 1, T -= B[s], T < 0)
      return -1;
  if (T > 0 && (t === Zi || y !== 1))
    return -1;
  for (F[1] = 0, s = 1; s < Dt; s++)
    F[s + 1] = F[s] + B[s];
  for (_ = 0; _ < a; _++)
    i[e + _] !== 0 && (u[F[i[e + _]]++] = _);
  if (t === Zi ? (N = ct = u, U = 20) : t === Pe ? (N = vo, ct = Ao, U = 257) : (N = Bo, ct = Io, U = 0), I = 0, _ = 0, s = E, k = f, m = w, z = 0, S = -1, A = 1 << w, P = A - 1, t === Pe && A > Ci || t === Mi && A > Li)
    return 1;
  for (; ; ) {
    we = s - z, u[_] + 1 < U ? (Et = 0, mt = u[_]) : u[_] >= U ? (Et = ct[u[_] - U], mt = N[u[_] - U]) : (Et = 32 + 64, mt = 0), v = 1 << s - z, b = 1 << m, E = b;
    do
      b -= v, o[k + (I >> z) + b] = we << 24 | Et << 16 | mt | 0;
    while (b !== 0);
    for (v = 1 << s - 1; I & v; )
      v >>= 1;
    if (v !== 0 ? (I &= v - 1, I += v) : I = 0, _++, --B[s] === 0) {
      if (s === y)
        break;
      s = i[e + u[_]];
    }
    if (s > w && (I & P) !== S) {
      for (z === 0 && (z = w), k += E, m = s - z, T = 1 << m; m + z < y && (T -= B[m + z], !(T <= 0)); )
        m++, T <<= 1;
      if (A += 1 << m, t === Pe && A > Ci || t === Mi && A > Li)
        return 1;
      S = I & P, o[S] = w << 24 | m << 16 | k - f | 0;
    }
  }
  return I !== 0 && (o[k + I] = s - z << 24 | 64 << 16 | 0), l.bits = w, 0;
};
var ne = So;
const To = 0, jn = 1, Yn = 2, {
  Z_FINISH: $i,
  Z_BLOCK: Ro,
  Z_TREES: be,
  Z_OK: It,
  Z_STREAM_END: Fo,
  Z_NEED_DICT: Uo,
  Z_STREAM_ERROR: nt,
  Z_DATA_ERROR: Xn,
  Z_MEM_ERROR: Wn,
  Z_BUF_ERROR: Do,
  Z_DEFLATED: Hi
} = de, Ue = 16180, Pi = 16181, Gi = 16182, Ki = 16183, ji = 16184, Yi = 16185, Xi = 16186, Wi = 16187, Ji = 16188, Vi = 16189, Be = 16190, st = 16191, Ge = 16192, qi = 16193, Ke = 16194, Qi = 16195, tn = 16196, en = 16197, nn = 16198, Ee = 16199, me = 16200, rn = 16201, an = 16202, on = 16203, ln = 16204, fn = 16205, je = 16206, hn = 16207, cn = 16208, Z = 16209, Jn = 16210, Vn = 16211, zo = 852, Oo = 592, No = 15, Co = No, sn = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function Lo() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const St = (t) => {
  if (!t)
    return 1;
  const i = t.state;
  return !i || i.strm !== t || i.mode < Ue || i.mode > Vn ? 1 : 0;
}, qn = (t) => {
  if (St(t))
    return nt;
  const i = t.state;
  return t.total_in = t.total_out = i.total = 0, t.msg = "", i.wrap && (t.adler = i.wrap & 1), i.mode = Ue, i.last = 0, i.havedict = 0, i.flags = -1, i.dmax = 32768, i.head = null, i.hold = 0, i.bits = 0, i.lencode = i.lendyn = new Int32Array(zo), i.distcode = i.distdyn = new Int32Array(Oo), i.sane = 1, i.back = -1, It;
}, Qn = (t) => {
  if (St(t))
    return nt;
  const i = t.state;
  return i.wsize = 0, i.whave = 0, i.wnext = 0, qn(t);
}, tr = (t, i) => {
  let e;
  if (St(t))
    return nt;
  const a = t.state;
  return i < 0 ? (e = 0, i = -i) : (e = (i >> 4) + 5, i < 48 && (i &= 15)), i && (i < 8 || i > 15) ? nt : (a.window !== null && a.wbits !== i && (a.window = null), a.wrap = e, a.wbits = i, Qn(t));
}, er = (t, i) => {
  if (!t)
    return nt;
  const e = new Lo();
  t.state = e, e.strm = t, e.window = null, e.mode = Ue;
  const a = tr(t, i);
  return a !== It && (t.state = null), a;
}, Zo = (t) => er(t, Co);
let un = !0, Ye, Xe;
const Mo = (t) => {
  if (un) {
    Ye = new Int32Array(512), Xe = new Int32Array(32);
    let i = 0;
    for (; i < 144; )
      t.lens[i++] = 8;
    for (; i < 256; )
      t.lens[i++] = 9;
    for (; i < 280; )
      t.lens[i++] = 7;
    for (; i < 288; )
      t.lens[i++] = 8;
    for (ne(jn, t.lens, 0, 288, Ye, 0, t.work, { bits: 9 }), i = 0; i < 32; )
      t.lens[i++] = 5;
    ne(Yn, t.lens, 0, 32, Xe, 0, t.work, { bits: 5 }), un = !1;
  }
  t.lencode = Ye, t.lenbits = 9, t.distcode = Xe, t.distbits = 5;
}, ir = (t, i, e, a) => {
  let o;
  const f = t.state;
  return f.window === null && (f.wsize = 1 << f.wbits, f.wnext = 0, f.whave = 0, f.window = new Uint8Array(f.wsize)), a >= f.wsize ? (f.window.set(i.subarray(e - f.wsize, e), 0), f.wnext = 0, f.whave = f.wsize) : (o = f.wsize - f.wnext, o > a && (o = a), f.window.set(i.subarray(e - a, e - a + o), f.wnext), a -= o, a ? (f.window.set(i.subarray(e - a, e), 0), f.wnext = a, f.whave = f.wsize) : (f.wnext += o, f.wnext === f.wsize && (f.wnext = 0), f.whave < f.wsize && (f.whave += o))), 0;
}, $o = (t, i) => {
  let e, a, o, f, u, l, x, s, _, E, y, w, m, z, T = 0, A, I, v, b, S, P, k, N;
  const U = new Uint8Array(4);
  let B, F;
  const ct = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (St(t) || !t.output || !t.input && t.avail_in !== 0)
    return nt;
  e = t.state, e.mode === st && (e.mode = Ge), u = t.next_out, o = t.output, x = t.avail_out, f = t.next_in, a = t.input, l = t.avail_in, s = e.hold, _ = e.bits, E = l, y = x, N = It;
  t:
    for (; ; )
      switch (e.mode) {
        case Ue:
          if (e.wrap === 0) {
            e.mode = Ge;
            break;
          }
          for (; _ < 16; ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          if (e.wrap & 2 && s === 35615) {
            e.wbits === 0 && (e.wbits = 15), e.check = 0, U[0] = s & 255, U[1] = s >>> 8 & 255, e.check = Y(e.check, U, 2, 0), s = 0, _ = 0, e.mode = Pi;
            break;
          }
          if (e.head && (e.head.done = !1), !(e.wrap & 1) || /* check if zlib header allowed */
          (((s & 255) << 8) + (s >> 8)) % 31) {
            t.msg = "incorrect header check", e.mode = Z;
            break;
          }
          if ((s & 15) !== Hi) {
            t.msg = "unknown compression method", e.mode = Z;
            break;
          }
          if (s >>>= 4, _ -= 4, k = (s & 15) + 8, e.wbits === 0 && (e.wbits = k), k > 15 || k > e.wbits) {
            t.msg = "invalid window size", e.mode = Z;
            break;
          }
          e.dmax = 1 << e.wbits, e.flags = 0, t.adler = e.check = 1, e.mode = s & 512 ? Vi : st, s = 0, _ = 0;
          break;
        case Pi:
          for (; _ < 16; ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          if (e.flags = s, (e.flags & 255) !== Hi) {
            t.msg = "unknown compression method", e.mode = Z;
            break;
          }
          if (e.flags & 57344) {
            t.msg = "unknown header flags set", e.mode = Z;
            break;
          }
          e.head && (e.head.text = s >> 8 & 1), e.flags & 512 && e.wrap & 4 && (U[0] = s & 255, U[1] = s >>> 8 & 255, e.check = Y(e.check, U, 2, 0)), s = 0, _ = 0, e.mode = Gi;
        case Gi:
          for (; _ < 32; ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          e.head && (e.head.time = s), e.flags & 512 && e.wrap & 4 && (U[0] = s & 255, U[1] = s >>> 8 & 255, U[2] = s >>> 16 & 255, U[3] = s >>> 24 & 255, e.check = Y(e.check, U, 4, 0)), s = 0, _ = 0, e.mode = Ki;
        case Ki:
          for (; _ < 16; ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          e.head && (e.head.xflags = s & 255, e.head.os = s >> 8), e.flags & 512 && e.wrap & 4 && (U[0] = s & 255, U[1] = s >>> 8 & 255, e.check = Y(e.check, U, 2, 0)), s = 0, _ = 0, e.mode = ji;
        case ji:
          if (e.flags & 1024) {
            for (; _ < 16; ) {
              if (l === 0)
                break t;
              l--, s += a[f++] << _, _ += 8;
            }
            e.length = s, e.head && (e.head.extra_len = s), e.flags & 512 && e.wrap & 4 && (U[0] = s & 255, U[1] = s >>> 8 & 255, e.check = Y(e.check, U, 2, 0)), s = 0, _ = 0;
          } else
            e.head && (e.head.extra = null);
          e.mode = Yi;
        case Yi:
          if (e.flags & 1024 && (w = e.length, w > l && (w = l), w && (e.head && (k = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Uint8Array(e.head.extra_len)), e.head.extra.set(
            a.subarray(
              f,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              f + w
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            k
          )), e.flags & 512 && e.wrap & 4 && (e.check = Y(e.check, a, w, f)), l -= w, f += w, e.length -= w), e.length))
            break t;
          e.length = 0, e.mode = Xi;
        case Xi:
          if (e.flags & 2048) {
            if (l === 0)
              break t;
            w = 0;
            do
              k = a[f + w++], e.head && k && e.length < 65536 && (e.head.name += String.fromCharCode(k));
            while (k && w < l);
            if (e.flags & 512 && e.wrap & 4 && (e.check = Y(e.check, a, w, f)), l -= w, f += w, k)
              break t;
          } else
            e.head && (e.head.name = null);
          e.length = 0, e.mode = Wi;
        case Wi:
          if (e.flags & 4096) {
            if (l === 0)
              break t;
            w = 0;
            do
              k = a[f + w++], e.head && k && e.length < 65536 && (e.head.comment += String.fromCharCode(k));
            while (k && w < l);
            if (e.flags & 512 && e.wrap & 4 && (e.check = Y(e.check, a, w, f)), l -= w, f += w, k)
              break t;
          } else
            e.head && (e.head.comment = null);
          e.mode = Ji;
        case Ji:
          if (e.flags & 512) {
            for (; _ < 16; ) {
              if (l === 0)
                break t;
              l--, s += a[f++] << _, _ += 8;
            }
            if (e.wrap & 4 && s !== (e.check & 65535)) {
              t.msg = "header crc mismatch", e.mode = Z;
              break;
            }
            s = 0, _ = 0;
          }
          e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), t.adler = e.check = 0, e.mode = st;
          break;
        case Vi:
          for (; _ < 32; ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          t.adler = e.check = sn(s), s = 0, _ = 0, e.mode = Be;
        case Be:
          if (e.havedict === 0)
            return t.next_out = u, t.avail_out = x, t.next_in = f, t.avail_in = l, e.hold = s, e.bits = _, Uo;
          t.adler = e.check = 1, e.mode = st;
        case st:
          if (i === Ro || i === be)
            break t;
        case Ge:
          if (e.last) {
            s >>>= _ & 7, _ -= _ & 7, e.mode = je;
            break;
          }
          for (; _ < 3; ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          switch (e.last = s & 1, s >>>= 1, _ -= 1, s & 3) {
            case 0:
              e.mode = qi;
              break;
            case 1:
              if (Mo(e), e.mode = Ee, i === be) {
                s >>>= 2, _ -= 2;
                break t;
              }
              break;
            case 2:
              e.mode = tn;
              break;
            case 3:
              t.msg = "invalid block type", e.mode = Z;
          }
          s >>>= 2, _ -= 2;
          break;
        case qi:
          for (s >>>= _ & 7, _ -= _ & 7; _ < 32; ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          if ((s & 65535) !== (s >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", e.mode = Z;
            break;
          }
          if (e.length = s & 65535, s = 0, _ = 0, e.mode = Ke, i === be)
            break t;
        case Ke:
          e.mode = Qi;
        case Qi:
          if (w = e.length, w) {
            if (w > l && (w = l), w > x && (w = x), w === 0)
              break t;
            o.set(a.subarray(f, f + w), u), l -= w, f += w, x -= w, u += w, e.length -= w;
            break;
          }
          e.mode = st;
          break;
        case tn:
          for (; _ < 14; ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          if (e.nlen = (s & 31) + 257, s >>>= 5, _ -= 5, e.ndist = (s & 31) + 1, s >>>= 5, _ -= 5, e.ncode = (s & 15) + 4, s >>>= 4, _ -= 4, e.nlen > 286 || e.ndist > 30) {
            t.msg = "too many length or distance symbols", e.mode = Z;
            break;
          }
          e.have = 0, e.mode = en;
        case en:
          for (; e.have < e.ncode; ) {
            for (; _ < 3; ) {
              if (l === 0)
                break t;
              l--, s += a[f++] << _, _ += 8;
            }
            e.lens[ct[e.have++]] = s & 7, s >>>= 3, _ -= 3;
          }
          for (; e.have < 19; )
            e.lens[ct[e.have++]] = 0;
          if (e.lencode = e.lendyn, e.lenbits = 7, B = { bits: e.lenbits }, N = ne(To, e.lens, 0, 19, e.lencode, 0, e.work, B), e.lenbits = B.bits, N) {
            t.msg = "invalid code lengths set", e.mode = Z;
            break;
          }
          e.have = 0, e.mode = nn;
        case nn:
          for (; e.have < e.nlen + e.ndist; ) {
            for (; T = e.lencode[s & (1 << e.lenbits) - 1], A = T >>> 24, I = T >>> 16 & 255, v = T & 65535, !(A <= _); ) {
              if (l === 0)
                break t;
              l--, s += a[f++] << _, _ += 8;
            }
            if (v < 16)
              s >>>= A, _ -= A, e.lens[e.have++] = v;
            else {
              if (v === 16) {
                for (F = A + 2; _ < F; ) {
                  if (l === 0)
                    break t;
                  l--, s += a[f++] << _, _ += 8;
                }
                if (s >>>= A, _ -= A, e.have === 0) {
                  t.msg = "invalid bit length repeat", e.mode = Z;
                  break;
                }
                k = e.lens[e.have - 1], w = 3 + (s & 3), s >>>= 2, _ -= 2;
              } else if (v === 17) {
                for (F = A + 3; _ < F; ) {
                  if (l === 0)
                    break t;
                  l--, s += a[f++] << _, _ += 8;
                }
                s >>>= A, _ -= A, k = 0, w = 3 + (s & 7), s >>>= 3, _ -= 3;
              } else {
                for (F = A + 7; _ < F; ) {
                  if (l === 0)
                    break t;
                  l--, s += a[f++] << _, _ += 8;
                }
                s >>>= A, _ -= A, k = 0, w = 11 + (s & 127), s >>>= 7, _ -= 7;
              }
              if (e.have + w > e.nlen + e.ndist) {
                t.msg = "invalid bit length repeat", e.mode = Z;
                break;
              }
              for (; w--; )
                e.lens[e.have++] = k;
            }
          }
          if (e.mode === Z)
            break;
          if (e.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", e.mode = Z;
            break;
          }
          if (e.lenbits = 9, B = { bits: e.lenbits }, N = ne(jn, e.lens, 0, e.nlen, e.lencode, 0, e.work, B), e.lenbits = B.bits, N) {
            t.msg = "invalid literal/lengths set", e.mode = Z;
            break;
          }
          if (e.distbits = 6, e.distcode = e.distdyn, B = { bits: e.distbits }, N = ne(Yn, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, B), e.distbits = B.bits, N) {
            t.msg = "invalid distances set", e.mode = Z;
            break;
          }
          if (e.mode = Ee, i === be)
            break t;
        case Ee:
          e.mode = me;
        case me:
          if (l >= 6 && x >= 258) {
            t.next_out = u, t.avail_out = x, t.next_in = f, t.avail_in = l, e.hold = s, e.bits = _, ko(t, y), u = t.next_out, o = t.output, x = t.avail_out, f = t.next_in, a = t.input, l = t.avail_in, s = e.hold, _ = e.bits, e.mode === st && (e.back = -1);
            break;
          }
          for (e.back = 0; T = e.lencode[s & (1 << e.lenbits) - 1], A = T >>> 24, I = T >>> 16 & 255, v = T & 65535, !(A <= _); ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          if (I && !(I & 240)) {
            for (b = A, S = I, P = v; T = e.lencode[P + ((s & (1 << b + S) - 1) >> b)], A = T >>> 24, I = T >>> 16 & 255, v = T & 65535, !(b + A <= _); ) {
              if (l === 0)
                break t;
              l--, s += a[f++] << _, _ += 8;
            }
            s >>>= b, _ -= b, e.back += b;
          }
          if (s >>>= A, _ -= A, e.back += A, e.length = v, I === 0) {
            e.mode = fn;
            break;
          }
          if (I & 32) {
            e.back = -1, e.mode = st;
            break;
          }
          if (I & 64) {
            t.msg = "invalid literal/length code", e.mode = Z;
            break;
          }
          e.extra = I & 15, e.mode = rn;
        case rn:
          if (e.extra) {
            for (F = e.extra; _ < F; ) {
              if (l === 0)
                break t;
              l--, s += a[f++] << _, _ += 8;
            }
            e.length += s & (1 << e.extra) - 1, s >>>= e.extra, _ -= e.extra, e.back += e.extra;
          }
          e.was = e.length, e.mode = an;
        case an:
          for (; T = e.distcode[s & (1 << e.distbits) - 1], A = T >>> 24, I = T >>> 16 & 255, v = T & 65535, !(A <= _); ) {
            if (l === 0)
              break t;
            l--, s += a[f++] << _, _ += 8;
          }
          if (!(I & 240)) {
            for (b = A, S = I, P = v; T = e.distcode[P + ((s & (1 << b + S) - 1) >> b)], A = T >>> 24, I = T >>> 16 & 255, v = T & 65535, !(b + A <= _); ) {
              if (l === 0)
                break t;
              l--, s += a[f++] << _, _ += 8;
            }
            s >>>= b, _ -= b, e.back += b;
          }
          if (s >>>= A, _ -= A, e.back += A, I & 64) {
            t.msg = "invalid distance code", e.mode = Z;
            break;
          }
          e.offset = v, e.extra = I & 15, e.mode = on;
        case on:
          if (e.extra) {
            for (F = e.extra; _ < F; ) {
              if (l === 0)
                break t;
              l--, s += a[f++] << _, _ += 8;
            }
            e.offset += s & (1 << e.extra) - 1, s >>>= e.extra, _ -= e.extra, e.back += e.extra;
          }
          if (e.offset > e.dmax) {
            t.msg = "invalid distance too far back", e.mode = Z;
            break;
          }
          e.mode = ln;
        case ln:
          if (x === 0)
            break t;
          if (w = y - x, e.offset > w) {
            if (w = e.offset - w, w > e.whave && e.sane) {
              t.msg = "invalid distance too far back", e.mode = Z;
              break;
            }
            w > e.wnext ? (w -= e.wnext, m = e.wsize - w) : m = e.wnext - w, w > e.length && (w = e.length), z = e.window;
          } else
            z = o, m = u - e.offset, w = e.length;
          w > x && (w = x), x -= w, e.length -= w;
          do
            o[u++] = z[m++];
          while (--w);
          e.length === 0 && (e.mode = me);
          break;
        case fn:
          if (x === 0)
            break t;
          o[u++] = e.length, x--, e.mode = me;
          break;
        case je:
          if (e.wrap) {
            for (; _ < 32; ) {
              if (l === 0)
                break t;
              l--, s |= a[f++] << _, _ += 8;
            }
            if (y -= x, t.total_out += y, e.total += y, e.wrap & 4 && y && (t.adler = e.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            e.flags ? Y(e.check, o, y, u - y) : fe(e.check, o, y, u - y)), y = x, e.wrap & 4 && (e.flags ? s : sn(s)) !== e.check) {
              t.msg = "incorrect data check", e.mode = Z;
              break;
            }
            s = 0, _ = 0;
          }
          e.mode = hn;
        case hn:
          if (e.wrap && e.flags) {
            for (; _ < 32; ) {
              if (l === 0)
                break t;
              l--, s += a[f++] << _, _ += 8;
            }
            if (e.wrap & 4 && s !== (e.total & 4294967295)) {
              t.msg = "incorrect length check", e.mode = Z;
              break;
            }
            s = 0, _ = 0;
          }
          e.mode = cn;
        case cn:
          N = Fo;
          break t;
        case Z:
          N = Xn;
          break t;
        case Jn:
          return Wn;
        case Vn:
        default:
          return nt;
      }
  return t.next_out = u, t.avail_out = x, t.next_in = f, t.avail_in = l, e.hold = s, e.bits = _, (e.wsize || y !== t.avail_out && e.mode < Z && (e.mode < je || i !== $i)) && ir(t, t.output, t.next_out, y - t.avail_out), E -= t.avail_in, y -= t.avail_out, t.total_in += E, t.total_out += y, e.total += y, e.wrap & 4 && y && (t.adler = e.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  e.flags ? Y(e.check, o, y, t.next_out - y) : fe(e.check, o, y, t.next_out - y)), t.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === st ? 128 : 0) + (e.mode === Ee || e.mode === Ke ? 256 : 0), (E === 0 && y === 0 || i === $i) && N === It && (N = Do), N;
}, Ho = (t) => {
  if (St(t))
    return nt;
  let i = t.state;
  return i.window && (i.window = null), t.state = null, It;
}, Po = (t, i) => {
  if (St(t))
    return nt;
  const e = t.state;
  return e.wrap & 2 ? (e.head = i, i.done = !1, It) : nt;
}, Go = (t, i) => {
  const e = i.length;
  let a, o, f;
  return St(t) || (a = t.state, a.wrap !== 0 && a.mode !== Be) ? nt : a.mode === Be && (o = 1, o = fe(o, i, e, 0), o !== a.check) ? Xn : (f = ir(t, i, e, e), f ? (a.mode = Jn, Wn) : (a.havedict = 1, It));
};
var Ko = Qn, jo = tr, Yo = qn, Xo = Zo, Wo = er, Jo = $o, Vo = Ho, qo = Po, Qo = Go, tl = "pako inflate (from Nodeca project)", dt = {
  inflateReset: Ko,
  inflateReset2: jo,
  inflateResetKeep: Yo,
  inflateInit: Xo,
  inflateInit2: Wo,
  inflate: Jo,
  inflateEnd: Vo,
  inflateGetHeader: qo,
  inflateSetDictionary: Qo,
  inflateInfo: tl
};
function el() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var il = el;
const nr = Object.prototype.toString, {
  Z_NO_FLUSH: nl,
  Z_FINISH: rl,
  Z_OK: se,
  Z_STREAM_END: We,
  Z_NEED_DICT: Je,
  Z_STREAM_ERROR: al,
  Z_DATA_ERROR: dn,
  Z_MEM_ERROR: ol
} = de;
function gi(t) {
  this.options = Fe.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const i = this.options;
  i.raw && i.windowBits >= 0 && i.windowBits < 16 && (i.windowBits = -i.windowBits, i.windowBits === 0 && (i.windowBits = -15)), i.windowBits >= 0 && i.windowBits < 16 && !(t && t.windowBits) && (i.windowBits += 32), i.windowBits > 15 && i.windowBits < 48 && (i.windowBits & 15 || (i.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Gn(), this.strm.avail_out = 0;
  let e = dt.inflateInit2(
    this.strm,
    i.windowBits
  );
  if (e !== se)
    throw new Error(Lt[e]);
  if (this.header = new il(), dt.inflateGetHeader(this.strm, this.header), i.dictionary && (typeof i.dictionary == "string" ? i.dictionary = ce.string2buf(i.dictionary) : nr.call(i.dictionary) === "[object ArrayBuffer]" && (i.dictionary = new Uint8Array(i.dictionary)), i.raw && (e = dt.inflateSetDictionary(this.strm, i.dictionary), e !== se)))
    throw new Error(Lt[e]);
}
gi.prototype.push = function(t, i) {
  const e = this.strm, a = this.options.chunkSize, o = this.options.dictionary;
  let f, u, l;
  if (this.ended)
    return !1;
  for (i === ~~i ? u = i : u = i === !0 ? rl : nl, nr.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length; ; ) {
    for (e.avail_out === 0 && (e.output = new Uint8Array(a), e.next_out = 0, e.avail_out = a), f = dt.inflate(e, u), f === Je && o && (f = dt.inflateSetDictionary(e, o), f === se ? f = dt.inflate(e, u) : f === dn && (f = Je)); e.avail_in > 0 && f === We && e.state.wrap > 0 && t[e.next_in] !== 0; )
      dt.inflateReset(e), f = dt.inflate(e, u);
    switch (f) {
      case al:
      case dn:
      case Je:
      case ol:
        return this.onEnd(f), this.ended = !0, !1;
    }
    if (l = e.avail_out, e.next_out && (e.avail_out === 0 || f === We))
      if (this.options.to === "string") {
        let x = ce.utf8border(e.output, e.next_out), s = e.next_out - x, _ = ce.buf2string(e.output, x);
        e.next_out = s, e.avail_out = a - s, s && e.output.set(e.output.subarray(x, x + s), 0), this.onData(_);
      } else
        this.onData(e.output.length === e.next_out ? e.output : e.output.subarray(0, e.next_out));
    if (!(f === se && l === 0)) {
      if (f === We)
        return f = dt.inflateEnd(this.strm), this.onEnd(f), this.ended = !0, !0;
      if (e.avail_in === 0)
        break;
    }
  }
  return !0;
};
gi.prototype.onData = function(t) {
  this.chunks.push(t);
};
gi.prototype.onEnd = function(t) {
  t === se && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Fe.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
const { Deflate: Vl, deflate: ql, deflateRaw: Ql, gzip: ll } = Eo;
var fl = ll, G = 0, M = {}, hl = M.path = G++, cl = M.mode = G++, sl = M.uid = G++, ul = M.gid = G++, dl = M.size = G++, _l = M.mtime = G++, pl = M.cksum = G++, wl = M.type = G++, gl = M.linkpath = G++, xl = 512, yl = 512, K = [];
K[hl] = 100;
K[cl] = 8;
K[sl] = 8;
K[ul] = 8;
K[dl] = 12;
K[_l] = 12;
K[pl] = 8;
K[wl] = 1;
K[gl] = 100;
var bl = M.ustar = G++, El = M.ustarver = G++, ml = M.uname = G++, kl = M.gname = G++, vl = M.devmaj = G++, Al = M.devmin = G++, Bl = M.prefix = G++, Il = M.fill = G++;
M[G] = null;
K[bl] = 6;
K[El] = 2;
K[ml] = 32;
K[kl] = 32;
K[vl] = 8;
K[Al] = 8;
K[Bl] = 155;
K[Il] = 12;
var rr = {}, ar = {}, _n = 0;
for (var Jt = 0; Jt < G; Jt++)
  ar[Jt] = _n, rr[Jt] = _n += K[Jt];
Object.keys(M).forEach(function(t) {
  M[t] !== null && (M[M[t]] = t);
});
var zt = {
  0: "File",
  "\0": "OldFile",
  // like 0
  "": "OldFile",
  1: "Link",
  2: "SymbolicLink",
  3: "CharacterDevice",
  4: "BlockDevice",
  5: "Directory",
  6: "FIFO",
  7: "ContiguousFile",
  // like 0
  // posix headers
  g: "GlobalExtendedHeader",
  // k=v for the rest of the archive
  x: "ExtendedHeader",
  // k=v for the next file
  // vendor-specific stuff
  A: "SolarisACL",
  // skip
  D: "GNUDumpDir",
  // like 5, but with data, which should be skipped
  I: "Inode",
  // metadata only, skip
  K: "NextFileHasLongLinkpath",
  // data = link path of next file
  L: "NextFileHasLongPath",
  // data = path of next file
  M: "ContinuationFile",
  // skip
  N: "OldGnuLongPath",
  // like L
  S: "SparseFile",
  // skip
  V: "TapeVolumeHeader",
  // skip
  X: "OldExtendedHeader"
  // like x
};
Object.keys(zt).forEach(function(t) {
  zt[zt[t]] = zt[zt[t]] || t;
});
var Ot = {
  suid: 2048,
  // set uid on extraction
  sgid: 1024,
  // set gid on extraction
  svtx: 512,
  // set restricted deletion flag on dirs on extraction
  uread: 256,
  uwrite: 128,
  uexec: 64,
  gread: 32,
  gwrite: 16,
  gexec: 8,
  oread: 4,
  owrite: 2,
  oexec: 1,
  all: 4095
}, Sl = {
  mode: !0,
  uid: !0,
  gid: !0,
  size: !0,
  mtime: !0,
  devmaj: !0,
  devmin: !0,
  cksum: !0,
  atime: !0,
  ctime: !0,
  dev: !0,
  ino: !0,
  nlink: !0
};
Object.keys(Ot).forEach(function(t) {
  Ot[Ot[t]] = Ot[Ot[t]] || t;
});
var Tl = {
  atime: !0,
  charset: !0,
  comment: !0,
  ctime: !0,
  gid: !0,
  gname: !0,
  linkpath: !0,
  mtime: !0,
  path: !0,
  realtime: !0,
  security: !0,
  size: !0,
  uid: !0,
  uname: !0
};
const Kt = {
  fields: M,
  fieldSize: K,
  fieldOffs: ar,
  fieldEnds: rr,
  types: zt,
  modes: Ot,
  numeric: Sl,
  headerSize: xl,
  blockSize: yl,
  knownExtended: Tl
};
var Q = Kt.fields, Nt = Kt.fieldOffs, te = Kt.fieldEnds, pn = Kt.fieldSize, Rl = Kt.numeric, Fl = " ".charCodeAt(0), Ul = "/".charCodeAt(0), Dl = null;
function zl(t) {
  if (t = t || this.block, !t)
    throw new Error("Need block to checksum");
  for (var i = 0, e = Nt[Q.cksum], a = te[Q.cksum], o = 0; o < Nt[Q.cksum]; o++)
    i += t[o];
  for (var o = e; o < a; o++)
    i += Fl;
  for (var o = a; o < 512; o++)
    i += t[o];
  return i;
}
function Ol(t, i, e, a) {
  var o = t.slice(i, e), f = a >= 0;
  o[0] = f ? 128 : 255, f || (a *= -1);
  var u = [];
  do {
    var l = a % 256;
    u.push(l), a = (a - l) / 256;
  } while (a);
  for (var x = u.length, s = o.length - x, _ = 1; _ < s; _++)
    o[_] = f ? 0 : 255;
  var E = !0;
  for (_ = x; _ > 0; _--) {
    var y = u[x - _];
    f ? o[s + _] = y : E && y === 0 ? o[s + _] = 0 : E ? (E = !1, o[s + _] = 256 - y) : o[s + _] = 255 - y;
  }
}
function Vt(t, i, e, a) {
  var o = _t.Buffer.byteLength(a), f = Math.min(o, e - i), u = o !== a.length || o > f;
  f > 0 && t.write(a, i, f, "utf8");
  for (var l = i + f; l < e; l++)
    t[l] = 0;
  return u;
}
function wn(t, i, e, a) {
  var o = {
    12: 8589934591,
    11: 1073741823,
    8: 2097151,
    7: 262143
  }, f = e - i, u = o[f] || 0;
  if (a = a || 0, (a instanceof Date || Object.prototype.toString.call(a) === "[object Date]") && (a = a.getTime() / 1e3), a > u || a < 0)
    return Ol(t, i, e, a), !0;
  var l = Math.floor(a).toString(8);
  if (a < o[f - 1] && (l += " "), l.length < f && (l = new Array(f - l.length).join("0") + l), l.length !== f - 1)
    throw new Error(
      "invalid length: " + JSON.stringify(l) + `
expected: ` + f
    );
  t.write(l, i, f, "utf8"), t[e - 1] = 0;
}
function or(t) {
  var i = _t.Buffer.alloc(512);
  t.needExtended = !1;
  for (var e = 0; Q[e] !== null; e++) {
    var a = Q[e], I = Nt[e], v = te[e], o;
    switch (a) {
      case "cksum":
        break;
      case "prefix":
        break;
      case "type":
        var f = t.type || "0";
        f.length > 1 && (f = Kt.types[t.type], f || (f = "0")), Vt(i, I, v, f);
        break;
      case "path":
        var u = _t.Buffer.byteLength(t.path), l = pn[Q.path], x = pn[Q.prefix];
        if (u > l && u <= l + x) {
          for (var s = u - 1 - l, _ = x, E = !1, y = new _t.Buffer(t.path), w = s; w <= _; w++)
            if (y[w] === Ul || y[w] === Dl) {
              E = w;
              break;
            }
          if (E !== !1) {
            var m = y.slice(0, E).toString("utf8"), z = y.slice(E + 1).toString("utf8");
            o = Vt(i, I, v, z), I = Nt[Q.prefix], v = te[Q.prefix], o = Vt(i, I, v, m) || o;
            break;
          }
        }
        var T = Nt[Q.prefix], A = te[Q.prefix];
        Vt(i, T, A, "");
      default:
        o = Rl[a] ? wn(i, I, v, t[a]) : Vt(i, I, v, t[a] || "");
        break;
    }
    t.needExtended = t.needExtended || o;
  }
  var I = Nt[Q.cksum], v = te[Q.cksum];
  return wn(i, I, v, zl.call(this, i)), i;
}
const Nl = (t) => {
  const i = t.split("/"), e = [];
  for (let a = 0; a < i.length; a++) {
    const o = a < i.length - 1;
    e.push(
      i.slice(0, a + 1).join("/") + (o ? "/" : "")
    );
  }
  return e;
}, Cl = (t) => {
  const i = /* @__PURE__ */ new Set();
  return t.sort().forEach((e) => {
    Nl(e).forEach((a) => i.add(a));
  }), Array.from(i);
}, gn = _t.Buffer.alloc(512), Ll = ({ path: t, size: i = 0 }) => or({
  mode: 420,
  uid: 501,
  gid: 20,
  mtime: /* @__PURE__ */ new Date(),
  ustar: "ustar\0",
  ustarver: "00",
  size: i,
  path: t
}), Zl = ({ path: t }) => or({
  type: "Directory",
  mode: 493,
  uid: 501,
  gid: 20,
  mtime: /* @__PURE__ */ new Date(),
  ustar: "ustar\0",
  ustarver: "00",
  path: t
}), Ml = (t, i = 512) => {
  const e = [];
  for (let a = 0; a < t.length; a += i)
    e.push(t.slice(a, a + i));
  return e;
}, $l = (t) => {
  const i = _t.Buffer.alloc(512);
  return i.write(t), i;
}, Hl = (t, i) => {
  Ml(t).forEach((e) => {
    i($l(e));
  });
};
async function Pl(t) {
  const i = [];
  return Cl(Object.keys(t)).forEach((e) => {
    if (e === "dir/")
      return;
    e.endsWith("/") ? i.push(Zl({ path: e })) : (i.push(Ll({ path: e, size: t[e].length })), Hl(t[e], i.push.bind(i)));
  }), i.push(gn), i.push(gn), _t.Buffer.concat(i);
}
async function Gl(t) {
  const i = await Pl(t);
  return fl(i);
}
const Kl = (t, { onTick: i, onProgress: e }) => {
  switch (i == null || i(t), t.type) {
    case "progress":
      const {
        id: a,
        written: o = 0,
        total: f,
        // end,
        file: u
      } = t, l = (typeof o == "string" ? parseInt(o, 10) : o) / f * 100;
      e == null || e({
        id: a,
        progress: parseInt(l + "", 10),
        file: u
      });
      break;
  }
}, lr = 4;
let li = "", fi = lr;
const xn = () => {
  li = "", fi = lr;
}, jl = (t, i) => {
  t == null || t.split(`
`).filter((e) => !!e).forEach((e) => {
    let a;
    try {
      li += e, a = JSON.parse(li), xn();
    } catch (o) {
      fi--, fi == 0 && (xn(), console.error(o, `

`, t, `

`, e));
    }
    a && Kl(a, i);
  });
};
async function Yl(t, { onTick: i, onProgress: e, target: a, fileCount: o = 0, projectSize: f = 0 }) {
  const u = async (x) => {
    if (x.status >= 400) {
      const a = (await x.json()) || (await x.text())
      throw new Error(a);
    }
    const s = x.body.getReader(), _ = new TextDecoder("utf-8"), E = ({ value: y, done: w }) => {
      if (!w)
        return jl(_.decode(y, { stream: !0 }), { onTick: i, onProgress: e }), s.read().then(E);
    };
    return s.read().then(E);
  }, l = this.proxy;
  return fetch(`${l}/${a}`, {
    method: "PUT",
    body: t,
    headers: {
      version: bn,
      "file-count": o + "",
      "project-size": f + "",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      authorization: ci("token", Se()),
      proxy: En
    }
  }).then(u).catch((x) => {
    throw console.error(x), x;
  });
}
var Xl = Object.defineProperty, Wl = Object.getOwnPropertyDescriptor, jt = (t, i, e, a) => {
  for (var o = a > 1 ? void 0 : a ? Wl(i, e) : i, f = t.length - 1, u; f >= 0; f--)
    (u = t[f]) && (o = (a ? u(i, e, o) : u(o)) || o);
  return a && o && Xl(i, e, o), o;
};
const tf = mn;
class Yt {
  constructor({
    proxy: i,
    onError: e
  }) {
    this.proxy = "", this.services = Ur.call(this), this.proxy = i, this.onError = e;
  }
  get token() {
    return Se();
  }
  async login({ user: i, password: e }) {
    const { token: a } = await this.services.login({ user: i, password: e });
    Bi(a);
  }
  async whoami() {
    return await this.services.whoami();
  }
  async logout() {
    Bi(null);
  }
  async publish({ files: i, domain: e, onProgress: a, onTick: o }) {
    return await Gl(i).then(
      (f) => Yl.bind(this)(f, {
        target: e,
        fileCount: Object.keys(i).length,
        projectSize: f.length,
        onProgress: a,
        onTick: o
      })
    );
  }
  async list() {
    return await this.services.list();
  }
  async teardown(i) {
    return await this.services.teardown(i);
  }
}
jt([
  $t
], Yt.prototype, "login", 1);
jt([
  $t,
  Te
], Yt.prototype, "whoami", 1);
jt([
  $t
], Yt.prototype, "logout", 1);
jt([
  $t,
  Te
], Yt.prototype, "publish", 1);
jt([
  $t,
  Te
], Yt.prototype, "list", 1);
jt([
  $t,
  Te
], Yt.prototype, "teardown", 1);
export {
  Yt as default,
  tf as notLoginEnum
};
