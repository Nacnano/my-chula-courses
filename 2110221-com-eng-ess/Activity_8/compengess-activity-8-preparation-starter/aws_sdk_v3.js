/*! For license information please see main.js.LICENSE.txt */
;(() => {
  var e = {
      914: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.RawSha256 = void 0)
        var n = r(945),
          i = (function () {
            function e () {
              ;(this.state = Int32Array.from(n.INIT)),
                (this.temp = new Int32Array(64)),
                (this.buffer = new Uint8Array(64)),
                (this.bufferLength = 0),
                (this.bytesHashed = 0),
                (this.finished = !1)
            }
            return (
              (e.prototype.update = function (e) {
                if (this.finished)
                  throw new Error(
                    'Attempted to update an already finished hash.'
                  )
                var t = 0,
                  r = e.byteLength
                if (
                  ((this.bytesHashed += r),
                  8 * this.bytesHashed > n.MAX_HASHABLE_LENGTH)
                )
                  throw new Error('Cannot hash more than 2^53 - 1 bits')
                for (; r > 0; )
                  (this.buffer[this.bufferLength++] = e[t++]),
                    r--,
                    this.bufferLength === n.BLOCK_SIZE &&
                      (this.hashBuffer(), (this.bufferLength = 0))
              }),
              (e.prototype.digest = function () {
                if (!this.finished) {
                  var e = 8 * this.bytesHashed,
                    t = new DataView(
                      this.buffer.buffer,
                      this.buffer.byteOffset,
                      this.buffer.byteLength
                    ),
                    r = this.bufferLength
                  if (
                    (t.setUint8(this.bufferLength++, 128),
                    r % n.BLOCK_SIZE >= n.BLOCK_SIZE - 8)
                  ) {
                    for (var i = this.bufferLength; i < n.BLOCK_SIZE; i++)
                      t.setUint8(i, 0)
                    this.hashBuffer(), (this.bufferLength = 0)
                  }
                  for (i = this.bufferLength; i < n.BLOCK_SIZE - 8; i++)
                    t.setUint8(i, 0)
                  t.setUint32(n.BLOCK_SIZE - 8, Math.floor(e / 4294967296), !0),
                    t.setUint32(n.BLOCK_SIZE - 4, e),
                    this.hashBuffer(),
                    (this.finished = !0)
                }
                var o = new Uint8Array(n.DIGEST_LENGTH)
                for (i = 0; i < 8; i++)
                  (o[4 * i] = (this.state[i] >>> 24) & 255),
                    (o[4 * i + 1] = (this.state[i] >>> 16) & 255),
                    (o[4 * i + 2] = (this.state[i] >>> 8) & 255),
                    (o[4 * i + 3] = (this.state[i] >>> 0) & 255)
                return o
              }),
              (e.prototype.hashBuffer = function () {
                for (
                  var e = this.buffer,
                    t = this.state,
                    r = t[0],
                    i = t[1],
                    o = t[2],
                    a = t[3],
                    s = t[4],
                    u = t[5],
                    c = t[6],
                    l = t[7],
                    d = 0;
                  d < n.BLOCK_SIZE;
                  d++
                ) {
                  if (d < 16)
                    this.temp[d] =
                      ((255 & e[4 * d]) << 24) |
                      ((255 & e[4 * d + 1]) << 16) |
                      ((255 & e[4 * d + 2]) << 8) |
                      (255 & e[4 * d + 3])
                  else {
                    var f = this.temp[d - 2],
                      p =
                        ((f >>> 17) | (f << 15)) ^
                        ((f >>> 19) | (f << 13)) ^
                        (f >>> 10),
                      h =
                        (((f = this.temp[d - 15]) >>> 7) | (f << 25)) ^
                        ((f >>> 18) | (f << 14)) ^
                        (f >>> 3)
                    this.temp[d] =
                      ((p + this.temp[d - 7]) | 0) +
                      ((h + this.temp[d - 16]) | 0)
                  }
                  var y =
                      ((((((s >>> 6) | (s << 26)) ^
                        ((s >>> 11) | (s << 21)) ^
                        ((s >>> 25) | (s << 7))) +
                        ((s & u) ^ (~s & c))) |
                        0) +
                        ((l + ((n.KEY[d] + this.temp[d]) | 0)) | 0)) |
                      0,
                    m =
                      ((((r >>> 2) | (r << 30)) ^
                        ((r >>> 13) | (r << 19)) ^
                        ((r >>> 22) | (r << 10))) +
                        ((r & i) ^ (r & o) ^ (i & o))) |
                      0
                  ;(l = c),
                    (c = u),
                    (u = s),
                    (s = (a + y) | 0),
                    (a = o),
                    (o = i),
                    (i = r),
                    (r = (y + m) | 0)
                }
                ;(t[0] += r),
                  (t[1] += i),
                  (t[2] += o),
                  (t[3] += a),
                  (t[4] += s),
                  (t[5] += u),
                  (t[6] += c),
                  (t[7] += l)
              }),
              e
            )
          })()
        t.RawSha256 = i
      },
      945: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.MAX_HASHABLE_LENGTH =
            t.INIT =
            t.KEY =
            t.DIGEST_LENGTH =
            t.BLOCK_SIZE =
              void 0),
          (t.BLOCK_SIZE = 64),
          (t.DIGEST_LENGTH = 32),
          (t.KEY = new Uint32Array([
            1116352408, 1899447441, 3049323471, 3921009573, 961987163,
            1508970993, 2453635748, 2870763221, 3624381080, 310598401,
            607225278, 1426881987, 1925078388, 2162078206, 2614888103,
            3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
            1249150122, 1555081692, 1996064986, 2554220882, 2821834349,
            2952996808, 3210313671, 3336571891, 3584528711, 113926993,
            338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700,
            1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
            3259730800, 3345764771, 3516065817, 3600352804, 4094571909,
            275423344, 430227734, 506948616, 659060556, 883997877, 958139571,
            1322822218, 1537002063, 1747873779, 1955562222, 2024104815,
            2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
            3329325298
          ])),
          (t.INIT = [
            1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
            2600822924, 528734635, 1541459225
          ]),
          (t.MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1)
      },
      938: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          r(541).__exportStar(r(430), t)
      },
      430: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.Sha256 = void 0)
        var n = r(541),
          i = r(945),
          o = r(914),
          a = r(658),
          s = (function () {
            function e (e) {
              ;(this.secret = e), (this.hash = new o.RawSha256()), this.reset()
            }
            return (
              (e.prototype.update = function (e) {
                if (!(0, a.isEmptyData)(e) && !this.error)
                  try {
                    this.hash.update((0, a.convertToBuffer)(e))
                  } catch (e) {
                    this.error = e
                  }
              }),
              (e.prototype.digestSync = function () {
                if (this.error) throw this.error
                return this.outer
                  ? (this.outer.finished ||
                      this.outer.update(this.hash.digest()),
                    this.outer.digest())
                  : this.hash.digest()
              }),
              (e.prototype.digest = function () {
                return n.__awaiter(this, void 0, void 0, function () {
                  return n.__generator(this, function (e) {
                    return [2, this.digestSync()]
                  })
                })
              }),
              (e.prototype.reset = function () {
                if (((this.hash = new o.RawSha256()), this.secret)) {
                  this.outer = new o.RawSha256()
                  var e = (function (e) {
                      var t = (0, a.convertToBuffer)(e)
                      if (t.byteLength > i.BLOCK_SIZE) {
                        var r = new o.RawSha256()
                        r.update(t), (t = r.digest())
                      }
                      var n = new Uint8Array(i.BLOCK_SIZE)
                      return n.set(t), n
                    })(this.secret),
                    t = new Uint8Array(i.BLOCK_SIZE)
                  t.set(e)
                  for (var r = 0; r < i.BLOCK_SIZE; r++)
                    (e[r] ^= 54), (t[r] ^= 92)
                  for (
                    this.hash.update(e), this.outer.update(t), r = 0;
                    r < e.byteLength;
                    r++
                  )
                    e[r] = 0
                }
              }),
              e
            )
          })()
        t.Sha256 = s
      },
      541: (e, t, r) => {
        'use strict'
        r.r(t),
          r.d(t, {
            __assign: () => o,
            __asyncDelegator: () => v,
            __asyncGenerator: () => w,
            __asyncValues: () => S,
            __await: () => b,
            __awaiter: () => l,
            __classPrivateFieldGet: () => O,
            __classPrivateFieldSet: () => I,
            __createBinding: () => f,
            __decorate: () => s,
            __exportStar: () => p,
            __extends: () => i,
            __generator: () => d,
            __importDefault: () => _,
            __importStar: () => A,
            __makeTemplateObject: () => E,
            __metadata: () => c,
            __param: () => u,
            __read: () => y,
            __rest: () => a,
            __spread: () => m,
            __spreadArrays: () => g,
            __values: () => h
          })
        var n = function (e, t) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t
                }) ||
              function (e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
              }),
            n(e, t)
          )
        }
        function i (e, t) {
          function r () {
            this.constructor = e
          }
          n(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r()))
        }
        var o = function () {
          return (
            (o =
              Object.assign ||
              function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                  for (var i in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                return e
              }),
            o.apply(this, arguments)
          )
        }
        function a (e, t) {
          var r = {}
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (r[n] = e[n])
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var i = 0
            for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
              t.indexOf(n[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
                (r[n[i]] = e[n[i]])
          }
          return r
        }
        function s (e, t, r, n) {
          var i,
            o = arguments.length,
            a =
              o < 3
                ? t
                : null === n
                ? (n = Object.getOwnPropertyDescriptor(t, r))
                : n
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.decorate
          )
            a = Reflect.decorate(e, t, r, n)
          else
            for (var s = e.length - 1; s >= 0; s--)
              (i = e[s]) &&
                (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a)
          return o > 3 && a && Object.defineProperty(t, r, a), a
        }
        function u (e, t) {
          return function (r, n) {
            t(r, n, e)
          }
        }
        function c (e, t) {
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.metadata
          )
            return Reflect.metadata(e, t)
        }
        function l (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function a (e) {
              try {
                u(n.next(e))
              } catch (e) {
                o(e)
              }
            }
            function s (e) {
              try {
                u(n.throw(e))
              } catch (e) {
                o(e)
              }
            }
            function u (e) {
              var t
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t)
                      })).then(a, s)
            }
            u((n = n.apply(e, t || [])).next())
          })
        }
        function d (e, t) {
          var r,
            n,
            i,
            o,
            a = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1]
                return i[1]
              },
              trys: [],
              ops: []
            }
          return (
            (o = { next: s(0), throw: s(1), return: s(2) }),
            'function' == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this
              }),
            o
          )
          function s (o) {
            return function (s) {
              return (function (o) {
                if (r) throw new TypeError('Generator is already executing.')
                for (; a; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (i =
                          2 & o[0]
                            ? n.return
                            : o[0]
                            ? n.throw || ((i = n.return) && i.call(n), 0)
                            : n.next) &&
                        !(i = i.call(n, o[1])).done)
                    )
                      return i
                    switch (((n = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o
                        break
                      case 4:
                        return a.label++, { value: o[1], done: !1 }
                      case 5:
                        a.label++, (n = o[1]), (o = [0])
                        continue
                      case 7:
                        ;(o = a.ops.pop()), a.trys.pop()
                        continue
                      default:
                        if (
                          !(
                            (i = (i = a.trys).length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0])
                          )
                        ) {
                          a = 0
                          continue
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          a.label = o[1]
                          break
                        }
                        if (6 === o[0] && a.label < i[1]) {
                          ;(a.label = i[1]), (i = o)
                          break
                        }
                        if (i && a.label < i[2]) {
                          ;(a.label = i[2]), a.ops.push(o)
                          break
                        }
                        i[2] && a.ops.pop(), a.trys.pop()
                        continue
                    }
                    o = t.call(e, a)
                  } catch (e) {
                    ;(o = [6, e]), (n = 0)
                  } finally {
                    r = i = 0
                  }
                if (5 & o[0]) throw o[1]
                return { value: o[0] ? o[1] : void 0, done: !0 }
              })([o, s])
            }
          }
        }
        function f (e, t, r, n) {
          void 0 === n && (n = r), (e[n] = t[r])
        }
        function p (e, t) {
          for (var r in e)
            'default' === r || t.hasOwnProperty(r) || (t[r] = e[r])
        }
        function h (e) {
          var t = 'function' == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0
          if (r) return r.call(e)
          if (e && 'number' == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                )
              }
            }
          throw new TypeError(
            t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
          )
        }
        function y (e, t) {
          var r = 'function' == typeof Symbol && e[Symbol.iterator]
          if (!r) return e
          var n,
            i,
            o = r.call(e),
            a = []
          try {
            for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
              a.push(n.value)
          } catch (e) {
            i = { error: e }
          } finally {
            try {
              n && !n.done && (r = o.return) && r.call(o)
            } finally {
              if (i) throw i.error
            }
          }
          return a
        }
        function m () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(y(arguments[t]))
          return e
        }
        function g () {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++)
            e += arguments[t].length
          var n = Array(e),
            i = 0
          for (t = 0; t < r; t++)
            for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++)
              n[i] = o[a]
          return n
        }
        function b (e) {
          return this instanceof b ? ((this.v = e), this) : new b(e)
        }
        function w (e, t, r) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var n,
            i = r.apply(e, t || []),
            o = []
          return (
            (n = {}),
            a('next'),
            a('throw'),
            a('return'),
            (n[Symbol.asyncIterator] = function () {
              return this
            }),
            n
          )
          function a (e) {
            i[e] &&
              (n[e] = function (t) {
                return new Promise(function (r, n) {
                  o.push([e, t, r, n]) > 1 || s(e, t)
                })
              })
          }
          function s (e, t) {
            try {
              ;(r = i[e](t)).value instanceof b
                ? Promise.resolve(r.value.v).then(u, c)
                : l(o[0][2], r)
            } catch (e) {
              l(o[0][3], e)
            }
            var r
          }
          function u (e) {
            s('next', e)
          }
          function c (e) {
            s('throw', e)
          }
          function l (e, t) {
            e(t), o.shift(), o.length && s(o[0][0], o[0][1])
          }
        }
        function v (e) {
          var t, r
          return (
            (t = {}),
            n('next'),
            n('throw', function (e) {
              throw e
            }),
            n('return'),
            (t[Symbol.iterator] = function () {
              return this
            }),
            t
          )
          function n (n, i) {
            t[n] = e[n]
              ? function (t) {
                  return (r = !r)
                    ? { value: b(e[n](t)), done: 'return' === n }
                    : i
                    ? i(t)
                    : t
                }
              : i
          }
        }
        function S (e) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var t,
            r = e[Symbol.asyncIterator]
          return r
            ? r.call(e)
            : ((e = h(e)),
              (t = {}),
              n('next'),
              n('throw'),
              n('return'),
              (t[Symbol.asyncIterator] = function () {
                return this
              }),
              t)
          function n (r) {
            t[r] =
              e[r] &&
              function (t) {
                return new Promise(function (n, i) {
                  !(function (e, t, r, n) {
                    Promise.resolve(n).then(function (t) {
                      e({ value: t, done: r })
                    }, t)
                  })(n, i, (t = e[r](t)).done, t.value)
                })
              }
          }
        }
        function E (e, t) {
          return (
            Object.defineProperty
              ? Object.defineProperty(e, 'raw', { value: t })
              : (e.raw = t),
            e
          )
        }
        function A (e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r])
          return (t.default = e), t
        }
        function _ (e) {
          return e && e.__esModule ? e : { default: e }
        }
        function O (e, t) {
          if (!t.has(e))
            throw new TypeError(
              'attempted to get private field on non-instance'
            )
          return t.get(e)
        }
        function I (e, t, r) {
          if (!t.has(e))
            throw new TypeError(
              'attempted to set private field on non-instance'
            )
          return t.set(e, r), r
        }
      },
      106: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.convertToBuffer = void 0)
        var n = r(84),
          i =
            'undefined' != typeof Buffer && Buffer.from
              ? function (e) {
                  return Buffer.from(e, 'utf8')
                }
              : n.fromUtf8
        t.convertToBuffer = function (e) {
          return e instanceof Uint8Array
            ? e
            : 'string' == typeof e
            ? i(e)
            : ArrayBuffer.isView(e)
            ? new Uint8Array(
                e.buffer,
                e.byteOffset,
                e.byteLength / Uint8Array.BYTES_PER_ELEMENT
              )
            : new Uint8Array(e)
        }
      },
      658: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.uint32ArrayFrom =
            t.numToUint8 =
            t.isEmptyData =
            t.convertToBuffer =
              void 0)
        var n = r(106)
        Object.defineProperty(t, 'convertToBuffer', {
          enumerable: !0,
          get: function () {
            return n.convertToBuffer
          }
        })
        var i = r(304)
        Object.defineProperty(t, 'isEmptyData', {
          enumerable: !0,
          get: function () {
            return i.isEmptyData
          }
        })
        var o = r(174)
        Object.defineProperty(t, 'numToUint8', {
          enumerable: !0,
          get: function () {
            return o.numToUint8
          }
        })
        var a = r(558)
        Object.defineProperty(t, 'uint32ArrayFrom', {
          enumerable: !0,
          get: function () {
            return a.uint32ArrayFrom
          }
        })
      },
      304: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.isEmptyData = void 0),
          (t.isEmptyData = function (e) {
            return 'string' == typeof e ? 0 === e.length : 0 === e.byteLength
          })
      },
      174: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.numToUint8 = void 0),
          (t.numToUint8 = function (e) {
            return new Uint8Array([
              (4278190080 & e) >> 24,
              (16711680 & e) >> 16,
              (65280 & e) >> 8,
              255 & e
            ])
          })
      },
      558: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.uint32ArrayFrom = void 0),
          (t.uint32ArrayFrom = function (e) {
            if (!Uint32Array.from) {
              for (var t = new Uint32Array(e.length), r = 0; r < e.length; )
                (t[r] = e[r]), (r += 1)
              return t
            }
            return Uint32Array.from(e)
          })
      },
      229: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
      },
      947: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
      },
      946: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
      },
      314: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
      },
      835: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.isMsWindow = void 0)
        var r = [
          'decrypt',
          'digest',
          'encrypt',
          'exportKey',
          'generateKey',
          'importKey',
          'sign',
          'verify'
        ]
        t.isMsWindow = function (e) {
          if (
            (function (e) {
              return 'MSInputMethodContext' in e && 'msCrypto' in e
            })(e) &&
            void 0 !== e.msCrypto.subtle
          ) {
            var t = e.msCrypto,
              n = t.getRandomValues,
              i = t.subtle
            return r
              .map(function (e) {
                return i[e]
              })
              .concat(n)
              .every(function (e) {
                return 'function' == typeof e
              })
          }
          return !1
        }
      },
      123: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
        var n = r(209)
        n.__exportStar(r(229), t),
          n.__exportStar(r(947), t),
          n.__exportStar(r(946), t),
          n.__exportStar(r(314), t),
          n.__exportStar(r(835), t)
      },
      209: (e, t, r) => {
        'use strict'
        r.r(t),
          r.d(t, {
            __assign: () => o,
            __asyncDelegator: () => v,
            __asyncGenerator: () => w,
            __asyncValues: () => S,
            __await: () => b,
            __awaiter: () => l,
            __classPrivateFieldGet: () => O,
            __classPrivateFieldSet: () => I,
            __createBinding: () => f,
            __decorate: () => s,
            __exportStar: () => p,
            __extends: () => i,
            __generator: () => d,
            __importDefault: () => _,
            __importStar: () => A,
            __makeTemplateObject: () => E,
            __metadata: () => c,
            __param: () => u,
            __read: () => y,
            __rest: () => a,
            __spread: () => m,
            __spreadArrays: () => g,
            __values: () => h
          })
        var n = function (e, t) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t
                }) ||
              function (e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
              }),
            n(e, t)
          )
        }
        function i (e, t) {
          function r () {
            this.constructor = e
          }
          n(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r()))
        }
        var o = function () {
          return (
            (o =
              Object.assign ||
              function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                  for (var i in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                return e
              }),
            o.apply(this, arguments)
          )
        }
        function a (e, t) {
          var r = {}
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (r[n] = e[n])
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var i = 0
            for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
              t.indexOf(n[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
                (r[n[i]] = e[n[i]])
          }
          return r
        }
        function s (e, t, r, n) {
          var i,
            o = arguments.length,
            a =
              o < 3
                ? t
                : null === n
                ? (n = Object.getOwnPropertyDescriptor(t, r))
                : n
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.decorate
          )
            a = Reflect.decorate(e, t, r, n)
          else
            for (var s = e.length - 1; s >= 0; s--)
              (i = e[s]) &&
                (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a)
          return o > 3 && a && Object.defineProperty(t, r, a), a
        }
        function u (e, t) {
          return function (r, n) {
            t(r, n, e)
          }
        }
        function c (e, t) {
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.metadata
          )
            return Reflect.metadata(e, t)
        }
        function l (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function a (e) {
              try {
                u(n.next(e))
              } catch (e) {
                o(e)
              }
            }
            function s (e) {
              try {
                u(n.throw(e))
              } catch (e) {
                o(e)
              }
            }
            function u (e) {
              var t
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t)
                      })).then(a, s)
            }
            u((n = n.apply(e, t || [])).next())
          })
        }
        function d (e, t) {
          var r,
            n,
            i,
            o,
            a = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1]
                return i[1]
              },
              trys: [],
              ops: []
            }
          return (
            (o = { next: s(0), throw: s(1), return: s(2) }),
            'function' == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this
              }),
            o
          )
          function s (o) {
            return function (s) {
              return (function (o) {
                if (r) throw new TypeError('Generator is already executing.')
                for (; a; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (i =
                          2 & o[0]
                            ? n.return
                            : o[0]
                            ? n.throw || ((i = n.return) && i.call(n), 0)
                            : n.next) &&
                        !(i = i.call(n, o[1])).done)
                    )
                      return i
                    switch (((n = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o
                        break
                      case 4:
                        return a.label++, { value: o[1], done: !1 }
                      case 5:
                        a.label++, (n = o[1]), (o = [0])
                        continue
                      case 7:
                        ;(o = a.ops.pop()), a.trys.pop()
                        continue
                      default:
                        if (
                          !(
                            (i = (i = a.trys).length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0])
                          )
                        ) {
                          a = 0
                          continue
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          a.label = o[1]
                          break
                        }
                        if (6 === o[0] && a.label < i[1]) {
                          ;(a.label = i[1]), (i = o)
                          break
                        }
                        if (i && a.label < i[2]) {
                          ;(a.label = i[2]), a.ops.push(o)
                          break
                        }
                        i[2] && a.ops.pop(), a.trys.pop()
                        continue
                    }
                    o = t.call(e, a)
                  } catch (e) {
                    ;(o = [6, e]), (n = 0)
                  } finally {
                    r = i = 0
                  }
                if (5 & o[0]) throw o[1]
                return { value: o[0] ? o[1] : void 0, done: !0 }
              })([o, s])
            }
          }
        }
        function f (e, t, r, n) {
          void 0 === n && (n = r), (e[n] = t[r])
        }
        function p (e, t) {
          for (var r in e)
            'default' === r || t.hasOwnProperty(r) || (t[r] = e[r])
        }
        function h (e) {
          var t = 'function' == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0
          if (r) return r.call(e)
          if (e && 'number' == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                )
              }
            }
          throw new TypeError(
            t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
          )
        }
        function y (e, t) {
          var r = 'function' == typeof Symbol && e[Symbol.iterator]
          if (!r) return e
          var n,
            i,
            o = r.call(e),
            a = []
          try {
            for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
              a.push(n.value)
          } catch (e) {
            i = { error: e }
          } finally {
            try {
              n && !n.done && (r = o.return) && r.call(o)
            } finally {
              if (i) throw i.error
            }
          }
          return a
        }
        function m () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(y(arguments[t]))
          return e
        }
        function g () {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++)
            e += arguments[t].length
          var n = Array(e),
            i = 0
          for (t = 0; t < r; t++)
            for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++)
              n[i] = o[a]
          return n
        }
        function b (e) {
          return this instanceof b ? ((this.v = e), this) : new b(e)
        }
        function w (e, t, r) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var n,
            i = r.apply(e, t || []),
            o = []
          return (
            (n = {}),
            a('next'),
            a('throw'),
            a('return'),
            (n[Symbol.asyncIterator] = function () {
              return this
            }),
            n
          )
          function a (e) {
            i[e] &&
              (n[e] = function (t) {
                return new Promise(function (r, n) {
                  o.push([e, t, r, n]) > 1 || s(e, t)
                })
              })
          }
          function s (e, t) {
            try {
              ;(r = i[e](t)).value instanceof b
                ? Promise.resolve(r.value.v).then(u, c)
                : l(o[0][2], r)
            } catch (e) {
              l(o[0][3], e)
            }
            var r
          }
          function u (e) {
            s('next', e)
          }
          function c (e) {
            s('throw', e)
          }
          function l (e, t) {
            e(t), o.shift(), o.length && s(o[0][0], o[0][1])
          }
        }
        function v (e) {
          var t, r
          return (
            (t = {}),
            n('next'),
            n('throw', function (e) {
              throw e
            }),
            n('return'),
            (t[Symbol.iterator] = function () {
              return this
            }),
            t
          )
          function n (n, i) {
            t[n] = e[n]
              ? function (t) {
                  return (r = !r)
                    ? { value: b(e[n](t)), done: 'return' === n }
                    : i
                    ? i(t)
                    : t
                }
              : i
          }
        }
        function S (e) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var t,
            r = e[Symbol.asyncIterator]
          return r
            ? r.call(e)
            : ((e = h(e)),
              (t = {}),
              n('next'),
              n('throw'),
              n('return'),
              (t[Symbol.asyncIterator] = function () {
                return this
              }),
              t)
          function n (r) {
            t[r] =
              e[r] &&
              function (t) {
                return new Promise(function (n, i) {
                  !(function (e, t, r, n) {
                    Promise.resolve(n).then(function (t) {
                      e({ value: t, done: r })
                    }, t)
                  })(n, i, (t = e[r](t)).done, t.value)
                })
              }
          }
        }
        function E (e, t) {
          return (
            Object.defineProperty
              ? Object.defineProperty(e, 'raw', { value: t })
              : (e.raw = t),
            e
          )
        }
        function A (e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r])
          return (t.default = e), t
        }
        function _ (e) {
          return e && e.__esModule ? e : { default: e }
        }
        function O (e, t) {
          if (!t.has(e))
            throw new TypeError(
              'attempted to get private field on non-instance'
            )
          return t.get(e)
        }
        function I (e, t, r) {
          if (!t.has(e))
            throw new TypeError(
              'attempted to set private field on non-instance'
            )
          return t.set(e, r), r
        }
      },
      370: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.EMPTY_DATA_SHA_256 =
            t.SHA_256_HMAC_ALGO =
            t.SHA_256_HASH =
              void 0),
          (t.SHA_256_HASH = { name: 'SHA-256' }),
          (t.SHA_256_HMAC_ALGO = { name: 'HMAC', hash: t.SHA_256_HASH }),
          (t.EMPTY_DATA_SHA_256 = new Uint8Array([
            227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111,
            185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27,
            120, 82, 184, 85
          ]))
      },
      297: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.Sha256 = void 0)
        var n = r(751),
          i = r(242),
          o = r(938),
          a = r(171),
          s = r(123),
          u = r(495),
          c = r(658),
          l = (function () {
            function e (e) {
              ;(0, a.supportsWebCrypto)((0, u.locateWindow)())
                ? (this.hash = new i.Sha256(e))
                : (0, s.isMsWindow)((0, u.locateWindow)())
                ? (this.hash = new n.Sha256(e))
                : (this.hash = new o.Sha256(e))
            }
            return (
              (e.prototype.update = function (e, t) {
                this.hash.update((0, c.convertToBuffer)(e))
              }),
              (e.prototype.digest = function () {
                return this.hash.digest()
              }),
              (e.prototype.reset = function () {
                this.hash.reset()
              }),
              e
            )
          })()
        t.Sha256 = l
      },
      751: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.Sha256 = void 0)
        var n = r(863),
          i = r(370),
          o = r(84),
          a = r(495),
          s = (function () {
            function e (e) {
              ;(this.secret = e), this.reset()
            }
            return (
              (e.prototype.update = function (e) {
                var t = this
                ;(0, n.isEmptyData)(e) ||
                  ((this.operation = this.operation.then(function (r) {
                    return (
                      (r.onerror = function () {
                        t.operation = Promise.reject(
                          new Error('Error encountered updating hash')
                        )
                      }),
                      r.process(u(e)),
                      r
                    )
                  })),
                  this.operation.catch(function () {}))
              }),
              (e.prototype.digest = function () {
                return this.operation.then(function (e) {
                  return new Promise(function (t, r) {
                    ;(e.onerror = function () {
                      r(new Error('Error encountered finalizing hash'))
                    }),
                      (e.oncomplete = function () {
                        e.result && t(new Uint8Array(e.result)),
                          r(new Error('Error encountered finalizing hash'))
                      }),
                      e.finish()
                  })
                })
              }),
              (e.prototype.reset = function () {
                var e
                this.secret
                  ? ((this.operation = ((e = this.secret),
                    new Promise(function (t, r) {
                      var n = (0, a.locateWindow)().msCrypto.subtle.importKey(
                        'raw',
                        u(e),
                        i.SHA_256_HMAC_ALGO,
                        !1,
                        ['sign']
                      )
                      ;(n.oncomplete = function () {
                        n.result && t(n.result),
                          r(
                            new Error(
                              'ImportKey completed without importing key.'
                            )
                          )
                      }),
                        (n.onerror = function () {
                          r(new Error('ImportKey failed to import key.'))
                        })
                    })).then(function (e) {
                      return (0, a.locateWindow)().msCrypto.subtle.sign(
                        i.SHA_256_HMAC_ALGO,
                        e
                      )
                    })),
                    this.operation.catch(function () {}))
                  : (this.operation = Promise.resolve(
                      (0, a.locateWindow)().msCrypto.subtle.digest('SHA-256')
                    ))
              }),
              e
            )
          })()
        function u (e) {
          return 'string' == typeof e
            ? (0, o.fromUtf8)(e)
            : ArrayBuffer.isView(e)
            ? new Uint8Array(
                e.buffer,
                e.byteOffset,
                e.byteLength / Uint8Array.BYTES_PER_ELEMENT
              )
            : new Uint8Array(e)
        }
        t.Sha256 = s
      },
      898: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.WebCryptoSha256 = t.Ie11Sha256 = void 0),
          r(605).__exportStar(r(297), t)
        var n = r(751)
        Object.defineProperty(t, 'Ie11Sha256', {
          enumerable: !0,
          get: function () {
            return n.Sha256
          }
        })
        var i = r(242)
        Object.defineProperty(t, 'WebCryptoSha256', {
          enumerable: !0,
          get: function () {
            return i.Sha256
          }
        })
      },
      863: (e, t) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.isEmptyData = void 0),
          (t.isEmptyData = function (e) {
            return 'string' == typeof e ? 0 === e.length : 0 === e.byteLength
          })
      },
      242: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.Sha256 = void 0)
        var n = r(658),
          i = r(370),
          o = r(495),
          a = (function () {
            function e (e) {
              ;(this.toHash = new Uint8Array(0)),
                (this.secret = e),
                this.reset()
            }
            return (
              (e.prototype.update = function (e) {
                if (!(0, n.isEmptyData)(e)) {
                  var t = (0, n.convertToBuffer)(e),
                    r = new Uint8Array(this.toHash.byteLength + t.byteLength)
                  r.set(this.toHash, 0),
                    r.set(t, this.toHash.byteLength),
                    (this.toHash = r)
                }
              }),
              (e.prototype.digest = function () {
                var e = this
                return this.key
                  ? this.key.then(function (t) {
                      return (0, o.locateWindow)()
                        .crypto.subtle.sign(i.SHA_256_HMAC_ALGO, t, e.toHash)
                        .then(function (e) {
                          return new Uint8Array(e)
                        })
                    })
                  : (0, n.isEmptyData)(this.toHash)
                  ? Promise.resolve(i.EMPTY_DATA_SHA_256)
                  : Promise.resolve()
                      .then(function () {
                        return (0, o.locateWindow)().crypto.subtle.digest(
                          i.SHA_256_HASH,
                          e.toHash
                        )
                      })
                      .then(function (e) {
                        return Promise.resolve(new Uint8Array(e))
                      })
              }),
              (e.prototype.reset = function () {
                var e = this
                ;(this.toHash = new Uint8Array(0)),
                  this.secret &&
                    void 0 !== this.secret &&
                    ((this.key = new Promise(function (t, r) {
                      ;(0, o.locateWindow)()
                        .crypto.subtle.importKey(
                          'raw',
                          (0, n.convertToBuffer)(e.secret),
                          i.SHA_256_HMAC_ALGO,
                          !1,
                          ['sign']
                        )
                        .then(t, r)
                    })),
                    this.key.catch(function () {}))
              }),
              e
            )
          })()
        t.Sha256 = a
      },
      605: (e, t, r) => {
        'use strict'
        r.r(t),
          r.d(t, {
            __assign: () => o,
            __asyncDelegator: () => v,
            __asyncGenerator: () => w,
            __asyncValues: () => S,
            __await: () => b,
            __awaiter: () => l,
            __classPrivateFieldGet: () => O,
            __classPrivateFieldSet: () => I,
            __createBinding: () => f,
            __decorate: () => s,
            __exportStar: () => p,
            __extends: () => i,
            __generator: () => d,
            __importDefault: () => _,
            __importStar: () => A,
            __makeTemplateObject: () => E,
            __metadata: () => c,
            __param: () => u,
            __read: () => y,
            __rest: () => a,
            __spread: () => m,
            __spreadArrays: () => g,
            __values: () => h
          })
        var n = function (e, t) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t
                }) ||
              function (e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
              }),
            n(e, t)
          )
        }
        function i (e, t) {
          function r () {
            this.constructor = e
          }
          n(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r()))
        }
        var o = function () {
          return (
            (o =
              Object.assign ||
              function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                  for (var i in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                return e
              }),
            o.apply(this, arguments)
          )
        }
        function a (e, t) {
          var r = {}
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (r[n] = e[n])
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var i = 0
            for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
              t.indexOf(n[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
                (r[n[i]] = e[n[i]])
          }
          return r
        }
        function s (e, t, r, n) {
          var i,
            o = arguments.length,
            a =
              o < 3
                ? t
                : null === n
                ? (n = Object.getOwnPropertyDescriptor(t, r))
                : n
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.decorate
          )
            a = Reflect.decorate(e, t, r, n)
          else
            for (var s = e.length - 1; s >= 0; s--)
              (i = e[s]) &&
                (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a)
          return o > 3 && a && Object.defineProperty(t, r, a), a
        }
        function u (e, t) {
          return function (r, n) {
            t(r, n, e)
          }
        }
        function c (e, t) {
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.metadata
          )
            return Reflect.metadata(e, t)
        }
        function l (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function a (e) {
              try {
                u(n.next(e))
              } catch (e) {
                o(e)
              }
            }
            function s (e) {
              try {
                u(n.throw(e))
              } catch (e) {
                o(e)
              }
            }
            function u (e) {
              var t
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t)
                      })).then(a, s)
            }
            u((n = n.apply(e, t || [])).next())
          })
        }
        function d (e, t) {
          var r,
            n,
            i,
            o,
            a = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1]
                return i[1]
              },
              trys: [],
              ops: []
            }
          return (
            (o = { next: s(0), throw: s(1), return: s(2) }),
            'function' == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this
              }),
            o
          )
          function s (o) {
            return function (s) {
              return (function (o) {
                if (r) throw new TypeError('Generator is already executing.')
                for (; a; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (i =
                          2 & o[0]
                            ? n.return
                            : o[0]
                            ? n.throw || ((i = n.return) && i.call(n), 0)
                            : n.next) &&
                        !(i = i.call(n, o[1])).done)
                    )
                      return i
                    switch (((n = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o
                        break
                      case 4:
                        return a.label++, { value: o[1], done: !1 }
                      case 5:
                        a.label++, (n = o[1]), (o = [0])
                        continue
                      case 7:
                        ;(o = a.ops.pop()), a.trys.pop()
                        continue
                      default:
                        if (
                          !(
                            (i = (i = a.trys).length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0])
                          )
                        ) {
                          a = 0
                          continue
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          a.label = o[1]
                          break
                        }
                        if (6 === o[0] && a.label < i[1]) {
                          ;(a.label = i[1]), (i = o)
                          break
                        }
                        if (i && a.label < i[2]) {
                          ;(a.label = i[2]), a.ops.push(o)
                          break
                        }
                        i[2] && a.ops.pop(), a.trys.pop()
                        continue
                    }
                    o = t.call(e, a)
                  } catch (e) {
                    ;(o = [6, e]), (n = 0)
                  } finally {
                    r = i = 0
                  }
                if (5 & o[0]) throw o[1]
                return { value: o[0] ? o[1] : void 0, done: !0 }
              })([o, s])
            }
          }
        }
        function f (e, t, r, n) {
          void 0 === n && (n = r), (e[n] = t[r])
        }
        function p (e, t) {
          for (var r in e)
            'default' === r || t.hasOwnProperty(r) || (t[r] = e[r])
        }
        function h (e) {
          var t = 'function' == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0
          if (r) return r.call(e)
          if (e && 'number' == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                )
              }
            }
          throw new TypeError(
            t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
          )
        }
        function y (e, t) {
          var r = 'function' == typeof Symbol && e[Symbol.iterator]
          if (!r) return e
          var n,
            i,
            o = r.call(e),
            a = []
          try {
            for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
              a.push(n.value)
          } catch (e) {
            i = { error: e }
          } finally {
            try {
              n && !n.done && (r = o.return) && r.call(o)
            } finally {
              if (i) throw i.error
            }
          }
          return a
        }
        function m () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(y(arguments[t]))
          return e
        }
        function g () {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++)
            e += arguments[t].length
          var n = Array(e),
            i = 0
          for (t = 0; t < r; t++)
            for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++)
              n[i] = o[a]
          return n
        }
        function b (e) {
          return this instanceof b ? ((this.v = e), this) : new b(e)
        }
        function w (e, t, r) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var n,
            i = r.apply(e, t || []),
            o = []
          return (
            (n = {}),
            a('next'),
            a('throw'),
            a('return'),
            (n[Symbol.asyncIterator] = function () {
              return this
            }),
            n
          )
          function a (e) {
            i[e] &&
              (n[e] = function (t) {
                return new Promise(function (r, n) {
                  o.push([e, t, r, n]) > 1 || s(e, t)
                })
              })
          }
          function s (e, t) {
            try {
              ;(r = i[e](t)).value instanceof b
                ? Promise.resolve(r.value.v).then(u, c)
                : l(o[0][2], r)
            } catch (e) {
              l(o[0][3], e)
            }
            var r
          }
          function u (e) {
            s('next', e)
          }
          function c (e) {
            s('throw', e)
          }
          function l (e, t) {
            e(t), o.shift(), o.length && s(o[0][0], o[0][1])
          }
        }
        function v (e) {
          var t, r
          return (
            (t = {}),
            n('next'),
            n('throw', function (e) {
              throw e
            }),
            n('return'),
            (t[Symbol.iterator] = function () {
              return this
            }),
            t
          )
          function n (n, i) {
            t[n] = e[n]
              ? function (t) {
                  return (r = !r)
                    ? { value: b(e[n](t)), done: 'return' === n }
                    : i
                    ? i(t)
                    : t
                }
              : i
          }
        }
        function S (e) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var t,
            r = e[Symbol.asyncIterator]
          return r
            ? r.call(e)
            : ((e = h(e)),
              (t = {}),
              n('next'),
              n('throw'),
              n('return'),
              (t[Symbol.asyncIterator] = function () {
                return this
              }),
              t)
          function n (r) {
            t[r] =
              e[r] &&
              function (t) {
                return new Promise(function (n, i) {
                  !(function (e, t, r, n) {
                    Promise.resolve(n).then(function (t) {
                      e({ value: t, done: r })
                    }, t)
                  })(n, i, (t = e[r](t)).done, t.value)
                })
              }
          }
        }
        function E (e, t) {
          return (
            Object.defineProperty
              ? Object.defineProperty(e, 'raw', { value: t })
              : (e.raw = t),
            e
          )
        }
        function A (e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r])
          return (t.default = e), t
        }
        function _ (e) {
          return e && e.__esModule ? e : { default: e }
        }
        function O (e, t) {
          if (!t.has(e))
            throw new TypeError(
              'attempted to get private field on non-instance'
            )
          return t.get(e)
        }
        function I (e, t, r) {
          if (!t.has(e))
            throw new TypeError(
              'attempted to set private field on non-instance'
            )
          return t.set(e, r), r
        }
      },
      171: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          r(216).__exportStar(r(966), t)
      },
      966: (e, t, r) => {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.supportsZeroByteGCM =
            t.supportsSubtleCrypto =
            t.supportsSecureRandom =
            t.supportsWebCrypto =
              void 0)
        var n = r(216),
          i = [
            'decrypt',
            'digest',
            'encrypt',
            'exportKey',
            'generateKey',
            'importKey',
            'sign',
            'verify'
          ]
        function o (e) {
          return (
            'object' == typeof e &&
            'object' == typeof e.crypto &&
            'function' == typeof e.crypto.getRandomValues
          )
        }
        function a (e) {
          return (
            e &&
            i.every(function (t) {
              return 'function' == typeof e[t]
            })
          )
        }
        ;(t.supportsWebCrypto = function (e) {
          return (
            !(!o(e) || 'object' != typeof e.crypto.subtle) && a(e.crypto.subtle)
          )
        }),
          (t.supportsSecureRandom = o),
          (t.supportsSubtleCrypto = a),
          (t.supportsZeroByteGCM = function (e) {
            return n.__awaiter(this, void 0, void 0, function () {
              var t
              return n.__generator(this, function (r) {
                switch (r.label) {
                  case 0:
                    if (!a(e)) return [2, !1]
                    r.label = 1
                  case 1:
                    return (
                      r.trys.push([1, 4, , 5]),
                      [
                        4,
                        e.generateKey({ name: 'AES-GCM', length: 128 }, !1, [
                          'encrypt'
                        ])
                      ]
                    )
                  case 2:
                    return (
                      (t = r.sent()),
                      [
                        4,
                        e.encrypt(
                          {
                            name: 'AES-GCM',
                            iv: new Uint8Array(Array(12)),
                            additionalData: new Uint8Array(Array(16)),
                            tagLength: 128
                          },
                          t,
                          new Uint8Array(0)
                        )
                      ]
                    )
                  case 3:
                    return [2, 16 === r.sent().byteLength]
                  case 4:
                    return r.sent(), [2, !1]
                  case 5:
                    return [2]
                }
              })
            })
          })
      },
      216: (e, t, r) => {
        'use strict'
        r.r(t),
          r.d(t, {
            __assign: () => o,
            __asyncDelegator: () => v,
            __asyncGenerator: () => w,
            __asyncValues: () => S,
            __await: () => b,
            __awaiter: () => l,
            __classPrivateFieldGet: () => O,
            __classPrivateFieldSet: () => I,
            __createBinding: () => f,
            __decorate: () => s,
            __exportStar: () => p,
            __extends: () => i,
            __generator: () => d,
            __importDefault: () => _,
            __importStar: () => A,
            __makeTemplateObject: () => E,
            __metadata: () => c,
            __param: () => u,
            __read: () => y,
            __rest: () => a,
            __spread: () => m,
            __spreadArrays: () => g,
            __values: () => h
          })
        var n = function (e, t) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t
                }) ||
              function (e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
              }),
            n(e, t)
          )
        }
        function i (e, t) {
          function r () {
            this.constructor = e
          }
          n(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r()))
        }
        var o = function () {
          return (
            (o =
              Object.assign ||
              function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                  for (var i in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                return e
              }),
            o.apply(this, arguments)
          )
        }
        function a (e, t) {
          var r = {}
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (r[n] = e[n])
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var i = 0
            for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
              t.indexOf(n[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
                (r[n[i]] = e[n[i]])
          }
          return r
        }
        function s (e, t, r, n) {
          var i,
            o = arguments.length,
            a =
              o < 3
                ? t
                : null === n
                ? (n = Object.getOwnPropertyDescriptor(t, r))
                : n
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.decorate
          )
            a = Reflect.decorate(e, t, r, n)
          else
            for (var s = e.length - 1; s >= 0; s--)
              (i = e[s]) &&
                (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a)
          return o > 3 && a && Object.defineProperty(t, r, a), a
        }
        function u (e, t) {
          return function (r, n) {
            t(r, n, e)
          }
        }
        function c (e, t) {
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.metadata
          )
            return Reflect.metadata(e, t)
        }
        function l (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function a (e) {
              try {
                u(n.next(e))
              } catch (e) {
                o(e)
              }
            }
            function s (e) {
              try {
                u(n.throw(e))
              } catch (e) {
                o(e)
              }
            }
            function u (e) {
              var t
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t)
                      })).then(a, s)
            }
            u((n = n.apply(e, t || [])).next())
          })
        }
        function d (e, t) {
          var r,
            n,
            i,
            o,
            a = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1]
                return i[1]
              },
              trys: [],
              ops: []
            }
          return (
            (o = { next: s(0), throw: s(1), return: s(2) }),
            'function' == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this
              }),
            o
          )
          function s (o) {
            return function (s) {
              return (function (o) {
                if (r) throw new TypeError('Generator is already executing.')
                for (; a; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (i =
                          2 & o[0]
                            ? n.return
                            : o[0]
                            ? n.throw || ((i = n.return) && i.call(n), 0)
                            : n.next) &&
                        !(i = i.call(n, o[1])).done)
                    )
                      return i
                    switch (((n = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o
                        break
                      case 4:
                        return a.label++, { value: o[1], done: !1 }
                      case 5:
                        a.label++, (n = o[1]), (o = [0])
                        continue
                      case 7:
                        ;(o = a.ops.pop()), a.trys.pop()
                        continue
                      default:
                        if (
                          !(
                            (i = (i = a.trys).length > 0 && i[i.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0])
                          )
                        ) {
                          a = 0
                          continue
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          a.label = o[1]
                          break
                        }
                        if (6 === o[0] && a.label < i[1]) {
                          ;(a.label = i[1]), (i = o)
                          break
                        }
                        if (i && a.label < i[2]) {
                          ;(a.label = i[2]), a.ops.push(o)
                          break
                        }
                        i[2] && a.ops.pop(), a.trys.pop()
                        continue
                    }
                    o = t.call(e, a)
                  } catch (e) {
                    ;(o = [6, e]), (n = 0)
                  } finally {
                    r = i = 0
                  }
                if (5 & o[0]) throw o[1]
                return { value: o[0] ? o[1] : void 0, done: !0 }
              })([o, s])
            }
          }
        }
        function f (e, t, r, n) {
          void 0 === n && (n = r), (e[n] = t[r])
        }
        function p (e, t) {
          for (var r in e)
            'default' === r || t.hasOwnProperty(r) || (t[r] = e[r])
        }
        function h (e) {
          var t = 'function' == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0
          if (r) return r.call(e)
          if (e && 'number' == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                )
              }
            }
          throw new TypeError(
            t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
          )
        }
        function y (e, t) {
          var r = 'function' == typeof Symbol && e[Symbol.iterator]
          if (!r) return e
          var n,
            i,
            o = r.call(e),
            a = []
          try {
            for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
              a.push(n.value)
          } catch (e) {
            i = { error: e }
          } finally {
            try {
              n && !n.done && (r = o.return) && r.call(o)
            } finally {
              if (i) throw i.error
            }
          }
          return a
        }
        function m () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(y(arguments[t]))
          return e
        }
        function g () {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++)
            e += arguments[t].length
          var n = Array(e),
            i = 0
          for (t = 0; t < r; t++)
            for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++)
              n[i] = o[a]
          return n
        }
        function b (e) {
          return this instanceof b ? ((this.v = e), this) : new b(e)
        }
        function w (e, t, r) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var n,
            i = r.apply(e, t || []),
            o = []
          return (
            (n = {}),
            a('next'),
            a('throw'),
            a('return'),
            (n[Symbol.asyncIterator] = function () {
              return this
            }),
            n
          )
          function a (e) {
            i[e] &&
              (n[e] = function (t) {
                return new Promise(function (r, n) {
                  o.push([e, t, r, n]) > 1 || s(e, t)
                })
              })
          }
          function s (e, t) {
            try {
              ;(r = i[e](t)).value instanceof b
                ? Promise.resolve(r.value.v).then(u, c)
                : l(o[0][2], r)
            } catch (e) {
              l(o[0][3], e)
            }
            var r
          }
          function u (e) {
            s('next', e)
          }
          function c (e) {
            s('throw', e)
          }
          function l (e, t) {
            e(t), o.shift(), o.length && s(o[0][0], o[0][1])
          }
        }
        function v (e) {
          var t, r
          return (
            (t = {}),
            n('next'),
            n('throw', function (e) {
              throw e
            }),
            n('return'),
            (t[Symbol.iterator] = function () {
              return this
            }),
            t
          )
          function n (n, i) {
            t[n] = e[n]
              ? function (t) {
                  return (r = !r)
                    ? { value: b(e[n](t)), done: 'return' === n }
                    : i
                    ? i(t)
                    : t
                }
              : i
          }
        }
        function S (e) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var t,
            r = e[Symbol.asyncIterator]
          return r
            ? r.call(e)
            : ((e = h(e)),
              (t = {}),
              n('next'),
              n('throw'),
              n('return'),
              (t[Symbol.asyncIterator] = function () {
                return this
              }),
              t)
          function n (r) {
            t[r] =
              e[r] &&
              function (t) {
                return new Promise(function (n, i) {
                  !(function (e, t, r, n) {
                    Promise.resolve(n).then(function (t) {
                      e({ value: t, done: r })
                    }, t)
                  })(n, i, (t = e[r](t)).done, t.value)
                })
              }
          }
        }
        function E (e, t) {
          return (
            Object.defineProperty
              ? Object.defineProperty(e, 'raw', { value: t })
              : (e.raw = t),
            e
          )
        }
        function A (e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r])
          return (t.default = e), t
        }
        function _ (e) {
          return e && e.__esModule ? e : { default: e }
        }
        function O (e, t) {
          if (!t.has(e))
            throw new TypeError(
              'attempted to get private field on non-instance'
            )
          return t.get(e)
        }
        function I (e, t, r) {
          if (!t.has(e))
            throw new TypeError(
              'attempted to set private field on non-instance'
            )
          return t.set(e, r), r
        }
      },
      495: (e, t, r) => {
        'use strict'
        r.r(t), r.d(t, { locateWindow: () => i })
        const n = {}
        function i () {
          return 'undefined' != typeof window
            ? window
            : 'undefined' != typeof self
            ? self
            : n
        }
      },
      84: (e, t, r) => {
        'use strict'
        r.r(t), r.d(t, { fromUtf8: () => n, toUtf8: () => i })
        const n = e =>
            'function' == typeof TextEncoder
              ? (function (e) {
                  return new TextEncoder().encode(e)
                })(e)
              : (e => {
                  const t = []
                  for (let r = 0, n = e.length; r < n; r++) {
                    const n = e.charCodeAt(r)
                    if (n < 128) t.push(n)
                    else if (n < 2048) t.push((n >> 6) | 192, (63 & n) | 128)
                    else if (
                      r + 1 < e.length &&
                      55296 == (64512 & n) &&
                      56320 == (64512 & e.charCodeAt(r + 1))
                    ) {
                      const i =
                        65536 + ((1023 & n) << 10) + (1023 & e.charCodeAt(++r))
                      t.push(
                        (i >> 18) | 240,
                        ((i >> 12) & 63) | 128,
                        ((i >> 6) & 63) | 128,
                        (63 & i) | 128
                      )
                    } else
                      t.push(
                        (n >> 12) | 224,
                        ((n >> 6) & 63) | 128,
                        (63 & n) | 128
                      )
                  }
                  return Uint8Array.from(t)
                })(e),
          i = e =>
            'function' == typeof TextDecoder
              ? (function (e) {
                  return new TextDecoder('utf-8').decode(e)
                })(e)
              : (e => {
                  let t = ''
                  for (let r = 0, n = e.length; r < n; r++) {
                    const n = e[r]
                    if (n < 128) t += String.fromCharCode(n)
                    else if (192 <= n && n < 224) {
                      const i = e[++r]
                      t += String.fromCharCode(((31 & n) << 6) | (63 & i))
                    } else if (240 <= n && n < 365) {
                      const i =
                        '%' +
                        [n, e[++r], e[++r], e[++r]]
                          .map(e => e.toString(16))
                          .join('%')
                      t += decodeURIComponent(i)
                    } else
                      t += String.fromCharCode(
                        ((15 & n) << 12) | ((63 & e[++r]) << 6) | (63 & e[++r])
                      )
                  }
                  return t
                })(e)
      },
      206: function (e) {
        e.exports = (function (e) {
          var t = {}
          function r (n) {
            if (t[n]) return t[n].exports
            var i = (t[n] = { i: n, l: !1, exports: {} })
            return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports
          }
          return (
            (r.m = e),
            (r.c = t),
            (r.d = function (e, t, n) {
              r.o(e, t) ||
                Object.defineProperty(e, t, { enumerable: !0, get: n })
            }),
            (r.r = function (e) {
              'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                  value: 'Module'
                }),
                Object.defineProperty(e, '__esModule', { value: !0 })
            }),
            (r.t = function (e, t) {
              if ((1 & t && (e = r(e)), 8 & t)) return e
              if (4 & t && 'object' == typeof e && e && e.__esModule) return e
              var n = Object.create(null)
              if (
                (r.r(n),
                Object.defineProperty(n, 'default', {
                  enumerable: !0,
                  value: e
                }),
                2 & t && 'string' != typeof e)
              )
                for (var i in e)
                  r.d(
                    n,
                    i,
                    function (t) {
                      return e[t]
                    }.bind(null, i)
                  )
              return n
            }),
            (r.n = function (e) {
              var t =
                e && e.__esModule
                  ? function () {
                      return e.default
                    }
                  : function () {
                      return e
                    }
              return r.d(t, 'a', t), t
            }),
            (r.o = function (e, t) {
              return Object.prototype.hasOwnProperty.call(e, t)
            }),
            (r.p = ''),
            r((r.s = 90))
          )
        })({
          17: function (e, t, r) {
            'use strict'
            ;(t.__esModule = !0), (t.default = void 0)
            var n = r(18),
              i = (function () {
                function e () {}
                return (
                  (e.getFirstMatch = function (e, t) {
                    var r = t.match(e)
                    return (r && r.length > 0 && r[1]) || ''
                  }),
                  (e.getSecondMatch = function (e, t) {
                    var r = t.match(e)
                    return (r && r.length > 1 && r[2]) || ''
                  }),
                  (e.matchAndReturnConst = function (e, t, r) {
                    if (e.test(t)) return r
                  }),
                  (e.getWindowsVersionName = function (e) {
                    switch (e) {
                      case 'NT':
                        return 'NT'
                      case 'XP':
                      case 'NT 5.1':
                        return 'XP'
                      case 'NT 5.0':
                        return '2000'
                      case 'NT 5.2':
                        return '2003'
                      case 'NT 6.0':
                        return 'Vista'
                      case 'NT 6.1':
                        return '7'
                      case 'NT 6.2':
                        return '8'
                      case 'NT 6.3':
                        return '8.1'
                      case 'NT 10.0':
                        return '10'
                      default:
                        return
                    }
                  }),
                  (e.getMacOSVersionName = function (e) {
                    var t = e
                      .split('.')
                      .splice(0, 2)
                      .map(function (e) {
                        return parseInt(e, 10) || 0
                      })
                    if ((t.push(0), 10 === t[0]))
                      switch (t[1]) {
                        case 5:
                          return 'Leopard'
                        case 6:
                          return 'Snow Leopard'
                        case 7:
                          return 'Lion'
                        case 8:
                          return 'Mountain Lion'
                        case 9:
                          return 'Mavericks'
                        case 10:
                          return 'Yosemite'
                        case 11:
                          return 'El Capitan'
                        case 12:
                          return 'Sierra'
                        case 13:
                          return 'High Sierra'
                        case 14:
                          return 'Mojave'
                        case 15:
                          return 'Catalina'
                        default:
                          return
                      }
                  }),
                  (e.getAndroidVersionName = function (e) {
                    var t = e
                      .split('.')
                      .splice(0, 2)
                      .map(function (e) {
                        return parseInt(e, 10) || 0
                      })
                    if ((t.push(0), !(1 === t[0] && t[1] < 5)))
                      return 1 === t[0] && t[1] < 6
                        ? 'Cupcake'
                        : 1 === t[0] && t[1] >= 6
                        ? 'Donut'
                        : 2 === t[0] && t[1] < 2
                        ? 'Eclair'
                        : 2 === t[0] && 2 === t[1]
                        ? 'Froyo'
                        : 2 === t[0] && t[1] > 2
                        ? 'Gingerbread'
                        : 3 === t[0]
                        ? 'Honeycomb'
                        : 4 === t[0] && t[1] < 1
                        ? 'Ice Cream Sandwich'
                        : 4 === t[0] && t[1] < 4
                        ? 'Jelly Bean'
                        : 4 === t[0] && t[1] >= 4
                        ? 'KitKat'
                        : 5 === t[0]
                        ? 'Lollipop'
                        : 6 === t[0]
                        ? 'Marshmallow'
                        : 7 === t[0]
                        ? 'Nougat'
                        : 8 === t[0]
                        ? 'Oreo'
                        : 9 === t[0]
                        ? 'Pie'
                        : void 0
                  }),
                  (e.getVersionPrecision = function (e) {
                    return e.split('.').length
                  }),
                  (e.compareVersions = function (t, r, n) {
                    void 0 === n && (n = !1)
                    var i = e.getVersionPrecision(t),
                      o = e.getVersionPrecision(r),
                      a = Math.max(i, o),
                      s = 0,
                      u = e.map([t, r], function (t) {
                        var r = a - e.getVersionPrecision(t),
                          n = t + new Array(r + 1).join('.0')
                        return e
                          .map(n.split('.'), function (e) {
                            return new Array(20 - e.length).join('0') + e
                          })
                          .reverse()
                      })
                    for (n && (s = a - Math.min(i, o)), a -= 1; a >= s; ) {
                      if (u[0][a] > u[1][a]) return 1
                      if (u[0][a] === u[1][a]) {
                        if (a === s) return 0
                        a -= 1
                      } else if (u[0][a] < u[1][a]) return -1
                    }
                  }),
                  (e.map = function (e, t) {
                    var r,
                      n = []
                    if (Array.prototype.map)
                      return Array.prototype.map.call(e, t)
                    for (r = 0; r < e.length; r += 1) n.push(t(e[r]))
                    return n
                  }),
                  (e.find = function (e, t) {
                    var r, n
                    if (Array.prototype.find)
                      return Array.prototype.find.call(e, t)
                    for (r = 0, n = e.length; r < n; r += 1) {
                      var i = e[r]
                      if (t(i, r)) return i
                    }
                  }),
                  (e.assign = function (e) {
                    for (
                      var t,
                        r,
                        n = e,
                        i = arguments.length,
                        o = new Array(i > 1 ? i - 1 : 0),
                        a = 1;
                      a < i;
                      a++
                    )
                      o[a - 1] = arguments[a]
                    if (Object.assign)
                      return Object.assign.apply(Object, [e].concat(o))
                    var s = function () {
                      var e = o[t]
                      'object' == typeof e &&
                        null !== e &&
                        Object.keys(e).forEach(function (t) {
                          n[t] = e[t]
                        })
                    }
                    for (t = 0, r = o.length; t < r; t += 1) s()
                    return e
                  }),
                  (e.getBrowserAlias = function (e) {
                    return n.BROWSER_ALIASES_MAP[e]
                  }),
                  (e.getBrowserTypeByAlias = function (e) {
                    return n.BROWSER_MAP[e] || ''
                  }),
                  e
                )
              })()
            ;(t.default = i), (e.exports = t.default)
          },
          18: function (e, t, r) {
            'use strict'
            ;(t.__esModule = !0),
              (t.ENGINE_MAP =
                t.OS_MAP =
                t.PLATFORMS_MAP =
                t.BROWSER_MAP =
                t.BROWSER_ALIASES_MAP =
                  void 0),
              (t.BROWSER_ALIASES_MAP = {
                'Amazon Silk': 'amazon_silk',
                'Android Browser': 'android',
                Bada: 'bada',
                BlackBerry: 'blackberry',
                Chrome: 'chrome',
                Chromium: 'chromium',
                Electron: 'electron',
                Epiphany: 'epiphany',
                Firefox: 'firefox',
                Focus: 'focus',
                Generic: 'generic',
                'Google Search': 'google_search',
                Googlebot: 'googlebot',
                'Internet Explorer': 'ie',
                'K-Meleon': 'k_meleon',
                Maxthon: 'maxthon',
                'Microsoft Edge': 'edge',
                'MZ Browser': 'mz',
                'NAVER Whale Browser': 'naver',
                Opera: 'opera',
                'Opera Coast': 'opera_coast',
                PhantomJS: 'phantomjs',
                Puffin: 'puffin',
                QupZilla: 'qupzilla',
                QQ: 'qq',
                QQLite: 'qqlite',
                Safari: 'safari',
                Sailfish: 'sailfish',
                'Samsung Internet for Android': 'samsung_internet',
                SeaMonkey: 'seamonkey',
                Sleipnir: 'sleipnir',
                Swing: 'swing',
                Tizen: 'tizen',
                'UC Browser': 'uc',
                Vivaldi: 'vivaldi',
                'WebOS Browser': 'webos',
                WeChat: 'wechat',
                'Yandex Browser': 'yandex',
                Roku: 'roku'
              }),
              (t.BROWSER_MAP = {
                amazon_silk: 'Amazon Silk',
                android: 'Android Browser',
                bada: 'Bada',
                blackberry: 'BlackBerry',
                chrome: 'Chrome',
                chromium: 'Chromium',
                electron: 'Electron',
                epiphany: 'Epiphany',
                firefox: 'Firefox',
                focus: 'Focus',
                generic: 'Generic',
                googlebot: 'Googlebot',
                google_search: 'Google Search',
                ie: 'Internet Explorer',
                k_meleon: 'K-Meleon',
                maxthon: 'Maxthon',
                edge: 'Microsoft Edge',
                mz: 'MZ Browser',
                naver: 'NAVER Whale Browser',
                opera: 'Opera',
                opera_coast: 'Opera Coast',
                phantomjs: 'PhantomJS',
                puffin: 'Puffin',
                qupzilla: 'QupZilla',
                qq: 'QQ Browser',
                qqlite: 'QQ Browser Lite',
                safari: 'Safari',
                sailfish: 'Sailfish',
                samsung_internet: 'Samsung Internet for Android',
                seamonkey: 'SeaMonkey',
                sleipnir: 'Sleipnir',
                swing: 'Swing',
                tizen: 'Tizen',
                uc: 'UC Browser',
                vivaldi: 'Vivaldi',
                webos: 'WebOS Browser',
                wechat: 'WeChat',
                yandex: 'Yandex Browser'
              }),
              (t.PLATFORMS_MAP = {
                tablet: 'tablet',
                mobile: 'mobile',
                desktop: 'desktop',
                tv: 'tv'
              }),
              (t.OS_MAP = {
                WindowsPhone: 'Windows Phone',
                Windows: 'Windows',
                MacOS: 'macOS',
                iOS: 'iOS',
                Android: 'Android',
                WebOS: 'WebOS',
                BlackBerry: 'BlackBerry',
                Bada: 'Bada',
                Tizen: 'Tizen',
                Linux: 'Linux',
                ChromeOS: 'Chrome OS',
                PlayStation4: 'PlayStation 4',
                Roku: 'Roku'
              }),
              (t.ENGINE_MAP = {
                EdgeHTML: 'EdgeHTML',
                Blink: 'Blink',
                Trident: 'Trident',
                Presto: 'Presto',
                Gecko: 'Gecko',
                WebKit: 'WebKit'
              })
          },
          90: function (e, t, r) {
            'use strict'
            ;(t.__esModule = !0), (t.default = void 0)
            var n,
              i = (n = r(91)) && n.__esModule ? n : { default: n },
              o = r(18)
            function a (e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r]
                ;(n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n)
              }
            }
            var s = (function () {
              function e () {}
              var t, r
              return (
                (e.getParser = function (e, t) {
                  if ((void 0 === t && (t = !1), 'string' != typeof e))
                    throw new Error('UserAgent should be a string')
                  return new i.default(e, t)
                }),
                (e.parse = function (e) {
                  return new i.default(e).getResult()
                }),
                (t = e),
                (r = [
                  {
                    key: 'BROWSER_MAP',
                    get: function () {
                      return o.BROWSER_MAP
                    }
                  },
                  {
                    key: 'ENGINE_MAP',
                    get: function () {
                      return o.ENGINE_MAP
                    }
                  },
                  {
                    key: 'OS_MAP',
                    get: function () {
                      return o.OS_MAP
                    }
                  },
                  {
                    key: 'PLATFORMS_MAP',
                    get: function () {
                      return o.PLATFORMS_MAP
                    }
                  }
                ]),
                null && a(t.prototype, null),
                r && a(t, r),
                e
              )
            })()
            ;(t.default = s), (e.exports = t.default)
          },
          91: function (e, t, r) {
            'use strict'
            ;(t.__esModule = !0), (t.default = void 0)
            var n = u(r(92)),
              i = u(r(93)),
              o = u(r(94)),
              a = u(r(95)),
              s = u(r(17))
            function u (e) {
              return e && e.__esModule ? e : { default: e }
            }
            var c = (function () {
              function e (e, t) {
                if ((void 0 === t && (t = !1), null == e || '' === e))
                  throw new Error("UserAgent parameter can't be empty")
                ;(this._ua = e),
                  (this.parsedResult = {}),
                  !0 !== t && this.parse()
              }
              var t = e.prototype
              return (
                (t.getUA = function () {
                  return this._ua
                }),
                (t.test = function (e) {
                  return e.test(this._ua)
                }),
                (t.parseBrowser = function () {
                  var e = this
                  this.parsedResult.browser = {}
                  var t = s.default.find(n.default, function (t) {
                    if ('function' == typeof t.test) return t.test(e)
                    if (t.test instanceof Array)
                      return t.test.some(function (t) {
                        return e.test(t)
                      })
                    throw new Error("Browser's test function is not valid")
                  })
                  return (
                    t && (this.parsedResult.browser = t.describe(this.getUA())),
                    this.parsedResult.browser
                  )
                }),
                (t.getBrowser = function () {
                  return this.parsedResult.browser
                    ? this.parsedResult.browser
                    : this.parseBrowser()
                }),
                (t.getBrowserName = function (e) {
                  return e
                    ? String(this.getBrowser().name).toLowerCase() || ''
                    : this.getBrowser().name || ''
                }),
                (t.getBrowserVersion = function () {
                  return this.getBrowser().version
                }),
                (t.getOS = function () {
                  return this.parsedResult.os
                    ? this.parsedResult.os
                    : this.parseOS()
                }),
                (t.parseOS = function () {
                  var e = this
                  this.parsedResult.os = {}
                  var t = s.default.find(i.default, function (t) {
                    if ('function' == typeof t.test) return t.test(e)
                    if (t.test instanceof Array)
                      return t.test.some(function (t) {
                        return e.test(t)
                      })
                    throw new Error("Browser's test function is not valid")
                  })
                  return (
                    t && (this.parsedResult.os = t.describe(this.getUA())),
                    this.parsedResult.os
                  )
                }),
                (t.getOSName = function (e) {
                  var t = this.getOS().name
                  return e ? String(t).toLowerCase() || '' : t || ''
                }),
                (t.getOSVersion = function () {
                  return this.getOS().version
                }),
                (t.getPlatform = function () {
                  return this.parsedResult.platform
                    ? this.parsedResult.platform
                    : this.parsePlatform()
                }),
                (t.getPlatformType = function (e) {
                  void 0 === e && (e = !1)
                  var t = this.getPlatform().type
                  return e ? String(t).toLowerCase() || '' : t || ''
                }),
                (t.parsePlatform = function () {
                  var e = this
                  this.parsedResult.platform = {}
                  var t = s.default.find(o.default, function (t) {
                    if ('function' == typeof t.test) return t.test(e)
                    if (t.test instanceof Array)
                      return t.test.some(function (t) {
                        return e.test(t)
                      })
                    throw new Error("Browser's test function is not valid")
                  })
                  return (
                    t &&
                      (this.parsedResult.platform = t.describe(this.getUA())),
                    this.parsedResult.platform
                  )
                }),
                (t.getEngine = function () {
                  return this.parsedResult.engine
                    ? this.parsedResult.engine
                    : this.parseEngine()
                }),
                (t.getEngineName = function (e) {
                  return e
                    ? String(this.getEngine().name).toLowerCase() || ''
                    : this.getEngine().name || ''
                }),
                (t.parseEngine = function () {
                  var e = this
                  this.parsedResult.engine = {}
                  var t = s.default.find(a.default, function (t) {
                    if ('function' == typeof t.test) return t.test(e)
                    if (t.test instanceof Array)
                      return t.test.some(function (t) {
                        return e.test(t)
                      })
                    throw new Error("Browser's test function is not valid")
                  })
                  return (
                    t && (this.parsedResult.engine = t.describe(this.getUA())),
                    this.parsedResult.engine
                  )
                }),
                (t.parse = function () {
                  return (
                    this.parseBrowser(),
                    this.parseOS(),
                    this.parsePlatform(),
                    this.parseEngine(),
                    this
                  )
                }),
                (t.getResult = function () {
                  return s.default.assign({}, this.parsedResult)
                }),
                (t.satisfies = function (e) {
                  var t = this,
                    r = {},
                    n = 0,
                    i = {},
                    o = 0
                  if (
                    (Object.keys(e).forEach(function (t) {
                      var a = e[t]
                      'string' == typeof a
                        ? ((i[t] = a), (o += 1))
                        : 'object' == typeof a && ((r[t] = a), (n += 1))
                    }),
                    n > 0)
                  ) {
                    var a = Object.keys(r),
                      u = s.default.find(a, function (e) {
                        return t.isOS(e)
                      })
                    if (u) {
                      var c = this.satisfies(r[u])
                      if (void 0 !== c) return c
                    }
                    var l = s.default.find(a, function (e) {
                      return t.isPlatform(e)
                    })
                    if (l) {
                      var d = this.satisfies(r[l])
                      if (void 0 !== d) return d
                    }
                  }
                  if (o > 0) {
                    var f = Object.keys(i),
                      p = s.default.find(f, function (e) {
                        return t.isBrowser(e, !0)
                      })
                    if (void 0 !== p) return this.compareVersion(i[p])
                  }
                }),
                (t.isBrowser = function (e, t) {
                  void 0 === t && (t = !1)
                  var r = this.getBrowserName().toLowerCase(),
                    n = e.toLowerCase(),
                    i = s.default.getBrowserTypeByAlias(n)
                  return t && i && (n = i.toLowerCase()), n === r
                }),
                (t.compareVersion = function (e) {
                  var t = [0],
                    r = e,
                    n = !1,
                    i = this.getBrowserVersion()
                  if ('string' == typeof i)
                    return (
                      '>' === e[0] || '<' === e[0]
                        ? ((r = e.substr(1)),
                          '=' === e[1]
                            ? ((n = !0), (r = e.substr(2)))
                            : (t = []),
                          '>' === e[0] ? t.push(1) : t.push(-1))
                        : '=' === e[0]
                        ? (r = e.substr(1))
                        : '~' === e[0] && ((n = !0), (r = e.substr(1))),
                      t.indexOf(s.default.compareVersions(i, r, n)) > -1
                    )
                }),
                (t.isOS = function (e) {
                  return this.getOSName(!0) === String(e).toLowerCase()
                }),
                (t.isPlatform = function (e) {
                  return this.getPlatformType(!0) === String(e).toLowerCase()
                }),
                (t.isEngine = function (e) {
                  return this.getEngineName(!0) === String(e).toLowerCase()
                }),
                (t.is = function (e, t) {
                  return (
                    void 0 === t && (t = !1),
                    this.isBrowser(e, t) || this.isOS(e) || this.isPlatform(e)
                  )
                }),
                (t.some = function (e) {
                  var t = this
                  return (
                    void 0 === e && (e = []),
                    e.some(function (e) {
                      return t.is(e)
                    })
                  )
                }),
                e
              )
            })()
            ;(t.default = c), (e.exports = t.default)
          },
          92: function (e, t, r) {
            'use strict'
            ;(t.__esModule = !0), (t.default = void 0)
            var n,
              i = (n = r(17)) && n.__esModule ? n : { default: n },
              o = /version\/(\d+(\.?_?\d+)+)/i,
              a = [
                {
                  test: [/googlebot/i],
                  describe: function (e) {
                    var t = { name: 'Googlebot' },
                      r =
                        i.default.getFirstMatch(
                          /googlebot\/(\d+(\.\d+))/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/opera/i],
                  describe: function (e) {
                    var t = { name: 'Opera' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:opera)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/opr\/|opios/i],
                  describe: function (e) {
                    var t = { name: 'Opera' },
                      r =
                        i.default.getFirstMatch(
                          /(?:opr|opios)[\s/](\S+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/SamsungBrowser/i],
                  describe: function (e) {
                    var t = { name: 'Samsung Internet for Android' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/Whale/i],
                  describe: function (e) {
                    var t = { name: 'NAVER Whale Browser' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:whale)[\s/](\d+(?:\.\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/MZBrowser/i],
                  describe: function (e) {
                    var t = { name: 'MZ Browser' },
                      r =
                        i.default.getFirstMatch(
                          /(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/focus/i],
                  describe: function (e) {
                    var t = { name: 'Focus' },
                      r =
                        i.default.getFirstMatch(
                          /(?:focus)[\s/](\d+(?:\.\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/swing/i],
                  describe: function (e) {
                    var t = { name: 'Swing' },
                      r =
                        i.default.getFirstMatch(
                          /(?:swing)[\s/](\d+(?:\.\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/coast/i],
                  describe: function (e) {
                    var t = { name: 'Opera Coast' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:coast)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/opt\/\d+(?:.?_?\d+)+/i],
                  describe: function (e) {
                    var t = { name: 'Opera Touch' },
                      r =
                        i.default.getFirstMatch(
                          /(?:opt)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/yabrowser/i],
                  describe: function (e) {
                    var t = { name: 'Yandex Browser' },
                      r =
                        i.default.getFirstMatch(
                          /(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/ucbrowser/i],
                  describe: function (e) {
                    var t = { name: 'UC Browser' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/Maxthon|mxios/i],
                  describe: function (e) {
                    var t = { name: 'Maxthon' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/epiphany/i],
                  describe: function (e) {
                    var t = { name: 'Epiphany' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/puffin/i],
                  describe: function (e) {
                    var t = { name: 'Puffin' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/sleipnir/i],
                  describe: function (e) {
                    var t = { name: 'Sleipnir' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/k-meleon/i],
                  describe: function (e) {
                    var t = { name: 'K-Meleon' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/micromessenger/i],
                  describe: function (e) {
                    var t = { name: 'WeChat' },
                      r =
                        i.default.getFirstMatch(
                          /(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/qqbrowser/i],
                  describe: function (e) {
                    var t = {
                        name: /qqbrowserlite/i.test(e)
                          ? 'QQ Browser Lite'
                          : 'QQ Browser'
                      },
                      r =
                        i.default.getFirstMatch(
                          /(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/msie|trident/i],
                  describe: function (e) {
                    var t = { name: 'Internet Explorer' },
                      r = i.default.getFirstMatch(
                        /(?:msie |rv:)(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/\sedg\//i],
                  describe: function (e) {
                    var t = { name: 'Microsoft Edge' },
                      r = i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/edg([ea]|ios)/i],
                  describe: function (e) {
                    var t = { name: 'Microsoft Edge' },
                      r = i.default.getSecondMatch(
                        /edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/vivaldi/i],
                  describe: function (e) {
                    var t = { name: 'Vivaldi' },
                      r = i.default.getFirstMatch(
                        /vivaldi\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/seamonkey/i],
                  describe: function (e) {
                    var t = { name: 'SeaMonkey' },
                      r = i.default.getFirstMatch(
                        /seamonkey\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/sailfish/i],
                  describe: function (e) {
                    var t = { name: 'Sailfish' },
                      r = i.default.getFirstMatch(
                        /sailfish\s?browser\/(\d+(\.\d+)?)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/silk/i],
                  describe: function (e) {
                    var t = { name: 'Amazon Silk' },
                      r = i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/phantom/i],
                  describe: function (e) {
                    var t = { name: 'PhantomJS' },
                      r = i.default.getFirstMatch(
                        /phantomjs\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/slimerjs/i],
                  describe: function (e) {
                    var t = { name: 'SlimerJS' },
                      r = i.default.getFirstMatch(
                        /slimerjs\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                  describe: function (e) {
                    var t = { name: 'BlackBerry' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/(web|hpw)[o0]s/i],
                  describe: function (e) {
                    var t = { name: 'WebOS Browser' },
                      r =
                        i.default.getFirstMatch(o, e) ||
                        i.default.getFirstMatch(
                          /w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,
                          e
                        )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/bada/i],
                  describe: function (e) {
                    var t = { name: 'Bada' },
                      r = i.default.getFirstMatch(
                        /dolfin\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/tizen/i],
                  describe: function (e) {
                    var t = { name: 'Tizen' },
                      r =
                        i.default.getFirstMatch(
                          /(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/qupzilla/i],
                  describe: function (e) {
                    var t = { name: 'QupZilla' },
                      r =
                        i.default.getFirstMatch(
                          /(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/firefox|iceweasel|fxios/i],
                  describe: function (e) {
                    var t = { name: 'Firefox' },
                      r = i.default.getFirstMatch(
                        /(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/electron/i],
                  describe: function (e) {
                    var t = { name: 'Electron' },
                      r = i.default.getFirstMatch(
                        /(?:electron)\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/MiuiBrowser/i],
                  describe: function (e) {
                    var t = { name: 'Miui' },
                      r = i.default.getFirstMatch(
                        /(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/chromium/i],
                  describe: function (e) {
                    var t = { name: 'Chromium' },
                      r =
                        i.default.getFirstMatch(
                          /(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,
                          e
                        ) || i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/chrome|crios|crmo/i],
                  describe: function (e) {
                    var t = { name: 'Chrome' },
                      r = i.default.getFirstMatch(
                        /(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/GSA/i],
                  describe: function (e) {
                    var t = { name: 'Google Search' },
                      r = i.default.getFirstMatch(
                        /(?:GSA)\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: function (e) {
                    var t = !e.test(/like android/i),
                      r = e.test(/android/i)
                    return t && r
                  },
                  describe: function (e) {
                    var t = { name: 'Android Browser' },
                      r = i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/playstation 4/i],
                  describe: function (e) {
                    var t = { name: 'PlayStation 4' },
                      r = i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/safari|applewebkit/i],
                  describe: function (e) {
                    var t = { name: 'Safari' },
                      r = i.default.getFirstMatch(o, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/.*/i],
                  describe: function (e) {
                    var t =
                      -1 !== e.search('\\(')
                        ? /^(.*)\/(.*)[ \t]\((.*)/
                        : /^(.*)\/(.*) /
                    return {
                      name: i.default.getFirstMatch(t, e),
                      version: i.default.getSecondMatch(t, e)
                    }
                  }
                }
              ]
            ;(t.default = a), (e.exports = t.default)
          },
          93: function (e, t, r) {
            'use strict'
            ;(t.__esModule = !0), (t.default = void 0)
            var n,
              i = (n = r(17)) && n.__esModule ? n : { default: n },
              o = r(18),
              a = [
                {
                  test: [/Roku\/DVP/],
                  describe: function (e) {
                    var t = i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e)
                    return { name: o.OS_MAP.Roku, version: t }
                  }
                },
                {
                  test: [/windows phone/i],
                  describe: function (e) {
                    var t = i.default.getFirstMatch(
                      /windows phone (?:os)?\s?(\d+(\.\d+)*)/i,
                      e
                    )
                    return { name: o.OS_MAP.WindowsPhone, version: t }
                  }
                },
                {
                  test: [/windows /i],
                  describe: function (e) {
                    var t = i.default.getFirstMatch(
                        /Windows ((NT|XP)( \d\d?.\d)?)/i,
                        e
                      ),
                      r = i.default.getWindowsVersionName(t)
                    return {
                      name: o.OS_MAP.Windows,
                      version: t,
                      versionName: r
                    }
                  }
                },
                {
                  test: [/Macintosh(.*?) FxiOS(.*?)\//],
                  describe: function (e) {
                    var t = { name: o.OS_MAP.iOS },
                      r = i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/macintosh/i],
                  describe: function (e) {
                    var t = i.default
                        .getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e)
                        .replace(/[_\s]/g, '.'),
                      r = i.default.getMacOSVersionName(t),
                      n = { name: o.OS_MAP.MacOS, version: t }
                    return r && (n.versionName = r), n
                  }
                },
                {
                  test: [/(ipod|iphone|ipad)/i],
                  describe: function (e) {
                    var t = i.default
                      .getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e)
                      .replace(/[_\s]/g, '.')
                    return { name: o.OS_MAP.iOS, version: t }
                  }
                },
                {
                  test: function (e) {
                    var t = !e.test(/like android/i),
                      r = e.test(/android/i)
                    return t && r
                  },
                  describe: function (e) {
                    var t = i.default.getFirstMatch(
                        /android[\s/-](\d+(\.\d+)*)/i,
                        e
                      ),
                      r = i.default.getAndroidVersionName(t),
                      n = { name: o.OS_MAP.Android, version: t }
                    return r && (n.versionName = r), n
                  }
                },
                {
                  test: [/(web|hpw)[o0]s/i],
                  describe: function (e) {
                    var t = i.default.getFirstMatch(
                        /(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,
                        e
                      ),
                      r = { name: o.OS_MAP.WebOS }
                    return t && t.length && (r.version = t), r
                  }
                },
                {
                  test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                  describe: function (e) {
                    var t =
                      i.default.getFirstMatch(
                        /rim\stablet\sos\s(\d+(\.\d+)*)/i,
                        e
                      ) ||
                      i.default.getFirstMatch(
                        /blackberry\d+\/(\d+([_\s]\d+)*)/i,
                        e
                      ) ||
                      i.default.getFirstMatch(/\bbb(\d+)/i, e)
                    return { name: o.OS_MAP.BlackBerry, version: t }
                  }
                },
                {
                  test: [/bada/i],
                  describe: function (e) {
                    var t = i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e)
                    return { name: o.OS_MAP.Bada, version: t }
                  }
                },
                {
                  test: [/tizen/i],
                  describe: function (e) {
                    var t = i.default.getFirstMatch(
                      /tizen[/\s](\d+(\.\d+)*)/i,
                      e
                    )
                    return { name: o.OS_MAP.Tizen, version: t }
                  }
                },
                {
                  test: [/linux/i],
                  describe: function () {
                    return { name: o.OS_MAP.Linux }
                  }
                },
                {
                  test: [/CrOS/],
                  describe: function () {
                    return { name: o.OS_MAP.ChromeOS }
                  }
                },
                {
                  test: [/PlayStation 4/],
                  describe: function (e) {
                    var t = i.default.getFirstMatch(
                      /PlayStation 4[/\s](\d+(\.\d+)*)/i,
                      e
                    )
                    return { name: o.OS_MAP.PlayStation4, version: t }
                  }
                }
              ]
            ;(t.default = a), (e.exports = t.default)
          },
          94: function (e, t, r) {
            'use strict'
            ;(t.__esModule = !0), (t.default = void 0)
            var n,
              i = (n = r(17)) && n.__esModule ? n : { default: n },
              o = r(18),
              a = [
                {
                  test: [/googlebot/i],
                  describe: function () {
                    return { type: 'bot', vendor: 'Google' }
                  }
                },
                {
                  test: [/huawei/i],
                  describe: function (e) {
                    var t = i.default.getFirstMatch(/(can-l01)/i, e) && 'Nova',
                      r = { type: o.PLATFORMS_MAP.mobile, vendor: 'Huawei' }
                    return t && (r.model = t), r
                  }
                },
                {
                  test: [/nexus\s*(?:7|8|9|10).*/i],
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.tablet, vendor: 'Nexus' }
                  }
                },
                {
                  test: [/ipad/i],
                  describe: function () {
                    return {
                      type: o.PLATFORMS_MAP.tablet,
                      vendor: 'Apple',
                      model: 'iPad'
                    }
                  }
                },
                {
                  test: [/Macintosh(.*?) FxiOS(.*?)\//],
                  describe: function () {
                    return {
                      type: o.PLATFORMS_MAP.tablet,
                      vendor: 'Apple',
                      model: 'iPad'
                    }
                  }
                },
                {
                  test: [/kftt build/i],
                  describe: function () {
                    return {
                      type: o.PLATFORMS_MAP.tablet,
                      vendor: 'Amazon',
                      model: 'Kindle Fire HD 7'
                    }
                  }
                },
                {
                  test: [/silk/i],
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.tablet, vendor: 'Amazon' }
                  }
                },
                {
                  test: [/tablet(?! pc)/i],
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.tablet }
                  }
                },
                {
                  test: function (e) {
                    var t = e.test(/ipod|iphone/i),
                      r = e.test(/like (ipod|iphone)/i)
                    return t && !r
                  },
                  describe: function (e) {
                    var t = i.default.getFirstMatch(/(ipod|iphone)/i, e)
                    return {
                      type: o.PLATFORMS_MAP.mobile,
                      vendor: 'Apple',
                      model: t
                    }
                  }
                },
                {
                  test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.mobile, vendor: 'Nexus' }
                  }
                },
                {
                  test: [/[^-]mobi/i],
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.mobile }
                  }
                },
                {
                  test: function (e) {
                    return 'blackberry' === e.getBrowserName(!0)
                  },
                  describe: function () {
                    return {
                      type: o.PLATFORMS_MAP.mobile,
                      vendor: 'BlackBerry'
                    }
                  }
                },
                {
                  test: function (e) {
                    return 'bada' === e.getBrowserName(!0)
                  },
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.mobile }
                  }
                },
                {
                  test: function (e) {
                    return 'windows phone' === e.getBrowserName()
                  },
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.mobile, vendor: 'Microsoft' }
                  }
                },
                {
                  test: function (e) {
                    var t = Number(String(e.getOSVersion()).split('.')[0])
                    return 'android' === e.getOSName(!0) && t >= 3
                  },
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.tablet }
                  }
                },
                {
                  test: function (e) {
                    return 'android' === e.getOSName(!0)
                  },
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.mobile }
                  }
                },
                {
                  test: function (e) {
                    return 'macos' === e.getOSName(!0)
                  },
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.desktop, vendor: 'Apple' }
                  }
                },
                {
                  test: function (e) {
                    return 'windows' === e.getOSName(!0)
                  },
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.desktop }
                  }
                },
                {
                  test: function (e) {
                    return 'linux' === e.getOSName(!0)
                  },
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.desktop }
                  }
                },
                {
                  test: function (e) {
                    return 'playstation 4' === e.getOSName(!0)
                  },
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.tv }
                  }
                },
                {
                  test: function (e) {
                    return 'roku' === e.getOSName(!0)
                  },
                  describe: function () {
                    return { type: o.PLATFORMS_MAP.tv }
                  }
                }
              ]
            ;(t.default = a), (e.exports = t.default)
          },
          95: function (e, t, r) {
            'use strict'
            ;(t.__esModule = !0), (t.default = void 0)
            var n,
              i = (n = r(17)) && n.__esModule ? n : { default: n },
              o = r(18),
              a = [
                {
                  test: function (e) {
                    return 'microsoft edge' === e.getBrowserName(!0)
                  },
                  describe: function (e) {
                    if (/\sedg\//i.test(e)) return { name: o.ENGINE_MAP.Blink }
                    var t = i.default.getFirstMatch(
                      /edge\/(\d+(\.?_?\d+)+)/i,
                      e
                    )
                    return { name: o.ENGINE_MAP.EdgeHTML, version: t }
                  }
                },
                {
                  test: [/trident/i],
                  describe: function (e) {
                    var t = { name: o.ENGINE_MAP.Trident },
                      r = i.default.getFirstMatch(
                        /trident\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: function (e) {
                    return e.test(/presto/i)
                  },
                  describe: function (e) {
                    var t = { name: o.ENGINE_MAP.Presto },
                      r = i.default.getFirstMatch(
                        /presto\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                },
                {
                  test: function (e) {
                    var t = e.test(/gecko/i),
                      r = e.test(/like gecko/i)
                    return t && !r
                  },
                  describe: function (e) {
                    var t = { name: o.ENGINE_MAP.Gecko },
                      r = i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e)
                    return r && (t.version = r), t
                  }
                },
                {
                  test: [/(apple)?webkit\/537\.36/i],
                  describe: function () {
                    return { name: o.ENGINE_MAP.Blink }
                  }
                },
                {
                  test: [/(apple)?webkit/i],
                  describe: function (e) {
                    var t = { name: o.ENGINE_MAP.WebKit },
                      r = i.default.getFirstMatch(
                        /webkit\/(\d+(\.?_?\d+)+)/i,
                        e
                      )
                    return r && (t.version = r), t
                  }
                }
              ]
            ;(t.default = a), (e.exports = t.default)
          }
        })
      },
      675: (e, t, r) => {
        var n = r(993),
          i = r(113),
          o = r(801),
          a = r(650)
        function s (e, t, r) {
          if (
            (arguments.length < 2 && ((r = e), (e = null), (t = null)),
            (this.capacity = r),
            'number' != typeof this.capacity || this.capacity <= 0)
          )
            throw new Error(
              'mnemonist/lru-cache: capacity should be positive number.'
            )
          var n = o.getPointerArray(r)
          ;(this.forward = new n(r)),
            (this.backward = new n(r)),
            (this.K = 'function' == typeof e ? new e(r) : new Array(r)),
            (this.V = 'function' == typeof t ? new t(r) : new Array(r)),
            (this.size = 0),
            (this.head = 0),
            (this.tail = 0),
            (this.items = {})
        }
        ;(s.prototype.clear = function () {
          ;(this.size = 0), (this.head = 0), (this.tail = 0), (this.items = {})
        }),
          (s.prototype.splayOnTop = function (e) {
            var t = this.head
            if (this.head === e) return this
            var r = this.backward[e],
              n = this.forward[e]
            return (
              this.tail === e ? (this.tail = r) : (this.backward[n] = r),
              (this.forward[r] = n),
              (this.backward[t] = e),
              (this.head = e),
              (this.forward[e] = t),
              this
            )
          }),
          (s.prototype.set = function (e, t) {
            var r = this.items[e]
            if (void 0 !== r) return this.splayOnTop(r), void (this.V[r] = t)
            this.size < this.capacity
              ? (r = this.size++)
              : ((r = this.tail),
                (this.tail = this.backward[r]),
                delete this.items[this.K[r]]),
              (this.items[e] = r),
              (this.K[r] = e),
              (this.V[r] = t),
              (this.forward[r] = this.head),
              (this.backward[this.head] = r),
              (this.head = r)
          }),
          (s.prototype.setpop = function (e, t) {
            var r = null,
              n = null,
              i = this.items[e]
            return void 0 !== i
              ? (this.splayOnTop(i),
                (r = this.V[i]),
                (this.V[i] = t),
                { evicted: !1, key: e, value: r })
              : (this.size < this.capacity
                  ? (i = this.size++)
                  : ((i = this.tail),
                    (this.tail = this.backward[i]),
                    (r = this.V[i]),
                    (n = this.K[i]),
                    delete this.items[this.K[i]]),
                (this.items[e] = i),
                (this.K[i] = e),
                (this.V[i] = t),
                (this.forward[i] = this.head),
                (this.backward[this.head] = i),
                (this.head = i),
                n ? { evicted: !0, key: n, value: r } : null)
          }),
          (s.prototype.has = function (e) {
            return e in this.items
          }),
          (s.prototype.get = function (e) {
            var t = this.items[e]
            if (void 0 !== t) return this.splayOnTop(t), this.V[t]
          }),
          (s.prototype.peek = function (e) {
            var t = this.items[e]
            if (void 0 !== t) return this.V[t]
          }),
          (s.prototype.forEach = function (e, t) {
            t = arguments.length > 1 ? t : this
            for (
              var r = 0,
                n = this.size,
                i = this.head,
                o = this.K,
                a = this.V,
                s = this.forward;
              r < n;

            )
              e.call(t, a[i], o[i], this), (i = s[i]), r++
          }),
          (s.prototype.keys = function () {
            var e = 0,
              t = this.size,
              r = this.head,
              i = this.K,
              o = this.forward
            return new n(function () {
              if (e >= t) return { done: !0 }
              var n = i[r]
              return ++e < t && (r = o[r]), { done: !1, value: n }
            })
          }),
          (s.prototype.values = function () {
            var e = 0,
              t = this.size,
              r = this.head,
              i = this.V,
              o = this.forward
            return new n(function () {
              if (e >= t) return { done: !0 }
              var n = i[r]
              return ++e < t && (r = o[r]), { done: !1, value: n }
            })
          }),
          (s.prototype.entries = function () {
            var e = 0,
              t = this.size,
              r = this.head,
              i = this.K,
              o = this.V,
              a = this.forward
            return new n(function () {
              if (e >= t) return { done: !0 }
              var n = i[r],
                s = o[r]
              return ++e < t && (r = a[r]), { done: !1, value: [n, s] }
            })
          }),
          'undefined' != typeof Symbol &&
            (s.prototype[Symbol.iterator] = s.prototype.entries),
          (s.prototype.inspect = function () {
            for (
              var e, t = new Map(), r = this.entries();
              !(e = r.next()).done;

            )
              t.set(e.value[0], e.value[1])
            return (
              Object.defineProperty(t, 'constructor', {
                value: s,
                enumerable: !1
              }),
              t
            )
          }),
          'undefined' != typeof Symbol &&
            (s.prototype[Symbol.for('nodejs.util.inspect.custom')] =
              s.prototype.inspect),
          (s.from = function (e, t, r, n) {
            if (arguments.length < 2) {
              if ('number' != typeof (n = a.guessLength(e)))
                throw new Error(
                  'mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.'
                )
            } else 2 === arguments.length && ((n = t), (t = null), (r = null))
            var o = new s(t, r, n)
            return (
              i(e, function (e, t) {
                o.set(t, e)
              }),
              o
            )
          }),
          (e.exports = s)
      },
      650: (e, t, r) => {
        var n = r(113),
          i = r(801)
        function o (e) {
          return 'number' == typeof e.length
            ? e.length
            : 'number' == typeof e.size
            ? e.size
            : void 0
        }
        ;(t.isArrayLike = function (e) {
          return Array.isArray(e) || i.isTypedArray(e)
        }),
          (t.guessLength = o),
          (t.toArray = function (e) {
            var t = o(e),
              r = 'number' == typeof t ? new Array(t) : [],
              i = 0
            return (
              n(e, function (e) {
                r[i++] = e
              }),
              r
            )
          }),
          (t.toArrayWithIndices = function (e) {
            var t = o(e),
              r = 'number' == typeof t ? i.getPointerArray(t) : Array,
              a = 'number' == typeof t ? new Array(t) : [],
              s = 'number' == typeof t ? new r(t) : [],
              u = 0
            return (
              n(e, function (e) {
                ;(a[u] = e), (s[u] = u++)
              }),
              [a, s]
            )
          })
      },
      801: (e, t) => {
        var r = Math.pow(2, 8) - 1,
          n = Math.pow(2, 16) - 1,
          i = Math.pow(2, 32) - 1,
          o = Math.pow(2, 7) - 1,
          a = Math.pow(2, 15) - 1,
          s = Math.pow(2, 31) - 1
        ;(t.getPointerArray = function (e) {
          var t = e - 1
          return t <= r
            ? Uint8Array
            : t <= n
            ? Uint16Array
            : t <= i
            ? Uint32Array
            : Float64Array
        }),
          (t.getSignedPointerArray = function (e) {
            var t = e - 1
            return t <= o
              ? Int8Array
              : t <= a
              ? Int16Array
              : t <= s
              ? Int32Array
              : Float64Array
          }),
          (t.getNumberType = function (e) {
            return e === (0 | e)
              ? -1 === Math.sign(e)
                ? e <= 127 && e >= -128
                  ? Int8Array
                  : e <= 32767 && e >= -32768
                  ? Int16Array
                  : Int32Array
                : e <= 255
                ? Uint8Array
                : e <= 65535
                ? Uint16Array
                : Uint32Array
              : Float64Array
          })
        var u = {
          Uint8Array: 1,
          Int8Array: 2,
          Uint16Array: 3,
          Int16Array: 4,
          Uint32Array: 5,
          Int32Array: 6,
          Float32Array: 7,
          Float64Array: 8
        }
        ;(t.getMinimalRepresentation = function (e, r) {
          var n,
            i,
            o,
            a,
            s,
            c = null,
            l = 0
          for (a = 0, s = e.length; a < s; a++)
            (o = r ? r(e[a]) : e[a]),
              (i = t.getNumberType(o)),
              (n = u[i.name]) > l && ((l = n), (c = i))
          return c
        }),
          (t.isTypedArray = function (e) {
            return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView(e)
          }),
          (t.concat = function () {
            var e,
              t,
              r,
              n = 0
            for (e = 0, r = arguments.length; e < r; e++)
              n += arguments[e].length
            var i = new arguments[0].constructor(n)
            for (e = 0, t = 0; e < r; e++)
              i.set(arguments[e], t), (t += arguments[e].length)
            return i
          }),
          (t.indices = function (e) {
            for (var r = new (t.getPointerArray(e))(e), n = 0; n < e; n++)
              r[n] = n
            return r
          })
      },
      113: e => {
        var t = 'undefined' != typeof ArrayBuffer,
          r = 'undefined' != typeof Symbol
        function n (e, n) {
          var i, o, a, s, u
          if (!e) throw new Error('obliterator/forEach: invalid iterable.')
          if ('function' != typeof n)
            throw new Error('obliterator/forEach: expecting a callback.')
          if (
            Array.isArray(e) ||
            (t && ArrayBuffer.isView(e)) ||
            'string' == typeof e ||
            '[object Arguments]' === e.toString()
          )
            for (a = 0, s = e.length; a < s; a++) n(e[a], a)
          else if ('function' != typeof e.forEach)
            if (
              (r &&
                Symbol.iterator in e &&
                'function' != typeof e.next &&
                (e = e[Symbol.iterator]()),
              'function' != typeof e.next)
            )
              for (o in e) e.hasOwnProperty(o) && n(e[o], o)
            else
              for (i = e, a = 0; !0 !== (u = i.next()).done; )
                n(u.value, a), a++
          else e.forEach(n)
        }
        ;(n.forEachWithNullKeys = function (e, n) {
          var i, o, a, s, u
          if (!e)
            throw new Error(
              'obliterator/forEachWithNullKeys: invalid iterable.'
            )
          if ('function' != typeof n)
            throw new Error(
              'obliterator/forEachWithNullKeys: expecting a callback.'
            )
          if (
            Array.isArray(e) ||
            (t && ArrayBuffer.isView(e)) ||
            'string' == typeof e ||
            '[object Arguments]' === e.toString()
          )
            for (a = 0, s = e.length; a < s; a++) n(e[a], null)
          else if (e instanceof Set)
            e.forEach(function (e) {
              n(e, null)
            })
          else if ('function' != typeof e.forEach)
            if (
              (r &&
                Symbol.iterator in e &&
                'function' != typeof e.next &&
                (e = e[Symbol.iterator]()),
              'function' != typeof e.next)
            )
              for (o in e) e.hasOwnProperty(o) && n(e[o], o)
            else
              for (i = e, a = 0; !0 !== (u = i.next()).done; )
                n(u.value, null), a++
          else e.forEach(n)
        }),
          (e.exports = n)
      },
      993: e => {
        function t (e) {
          Object.defineProperty(this, '_next', {
            writable: !1,
            enumerable: !1,
            value: e
          }),
            (this.done = !1)
        }
        ;(t.prototype.next = function () {
          if (this.done) return { done: !0 }
          var e = this._next()
          return e.done && (this.done = !0), e
        }),
          'undefined' != typeof Symbol &&
            (t.prototype[Symbol.iterator] = function () {
              return this
            }),
          (t.of = function () {
            var e = arguments,
              r = e.length,
              n = 0
            return new t(function () {
              return n >= r ? { done: !0 } : { done: !1, value: e[n++] }
            })
          }),
          (t.empty = function () {
            var e = new t(null)
            return (e.done = !0), e
          }),
          (t.is = function (e) {
            return (
              e instanceof t ||
              ('object' == typeof e &&
                null !== e &&
                'function' == typeof e.next)
            )
          }),
          (e.exports = t)
      }
    },
    t = {}
  function r (n) {
    var i = t[n]
    if (void 0 !== i) return i.exports
    var o = (t[n] = { exports: {} })
    return e[n].call(o.exports, o, o.exports, r), o.exports
  }
  ;(r.n = e => {
    var t = e && e.__esModule ? () => e.default : () => e
    return r.d(t, { a: t }), t
  }),
    (r.d = (e, t) => {
      for (var n in t)
        r.o(t, n) &&
          !r.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] })
    }),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r.r = e => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (() => {
      'use strict'
      var e = {}
      r.r(e),
        r.d(e, {
          isVirtualHostableS3Bucket: () => Xn,
          parseArn: () => ei,
          partition: () => qn
        })
      var t,
        n = {}
      r.r(n),
        r.d(n, {
          aws: () => e,
          booleanEquals: () => ti,
          getAttr: () => ri,
          isSet: () => ni,
          isValidHostLabel: () => Qn,
          not: () => ii,
          parseURL: () => ci,
          stringEquals: () => li,
          substring: () => di,
          uriEncode: () => fi
        }),
        (function (e) {
          ;(e.ENV = 'env'), (e.CONFIG = 'shared config entry')
        })(t || (t = {}))
      const i = e =>
          'string' == typeof e &&
          (e.startsWith('fips-') || e.endsWith('-fips')),
        o = e =>
          i(e)
            ? ['fips-aws-global', 'aws-fips'].includes(e)
              ? 'us-east-1'
              : e.replace(/fips-(dkr-|prod-)?|-fips/, '')
            : e
      var a, s
      ;((s = a || (a = {}))[(s.HEADER = 0)] = 'HEADER'),
        (s[(s.TRAILER = 1)] = 'TRAILER')
      class u {
        constructor (e) {
          ;(this.method = e.method || 'GET'),
            (this.hostname = e.hostname || 'localhost'),
            (this.port = e.port),
            (this.query = e.query || {}),
            (this.headers = e.headers || {}),
            (this.body = e.body),
            (this.protocol = e.protocol
              ? ':' !== e.protocol.slice(-1)
                ? `${e.protocol}:`
                : e.protocol
              : 'https:'),
            (this.path = e.path
              ? '/' !== e.path.charAt(0)
                ? `/${e.path}`
                : e.path
              : '/')
        }
        static isInstance (e) {
          if (!e) return !1
          const t = e
          return (
            'method' in t &&
            'protocol' in t &&
            'hostname' in t &&
            'path' in t &&
            'object' == typeof t.query &&
            'object' == typeof t.headers
          )
        }
        clone () {
          const e = new u({ ...this, headers: { ...this.headers } })
          var t
          return (
            e.query &&
              (e.query =
                ((t = e.query),
                Object.keys(t).reduce((e, r) => {
                  const n = t[r]
                  return { ...e, [r]: Array.isArray(n) ? [...n] : n }
                }, {}))),
            e
          )
        }
      }
      class c {
        constructor (e) {
          ;(this.statusCode = e.statusCode),
            (this.headers = e.headers || {}),
            (this.body = e.body)
        }
        static isInstance (e) {
          if (!e) return !1
          const t = e
          return 'number' == typeof t.statusCode && 'object' == typeof t.headers
        }
      }
      const l = 'content-length',
        d = {
          step: 'build',
          tags: ['SET_CONTENT_LENGTH', 'CONTENT_LENGTH'],
          name: 'contentLengthMiddleware',
          override: !0
        },
        f = (e, t) => (r, n) => async n => {
          const { response: i } = await r(n)
          try {
            return { response: i, output: await t(i, e) }
          } catch (e) {
            throw (Object.defineProperty(e, '$response', { value: i }), e)
          }
        },
        p = (e, t) => (r, n) => async i => {
          const o =
            n.endpointV2?.url && e.urlParser
              ? async () => e.urlParser(n.endpointV2.url)
              : e.endpoint
          if (!o) throw new Error('No valid endpoint provider available.')
          const a = await t(i.input, { ...e, endpoint: o })
          return r({ ...i, request: a })
        },
        h = {
          name: 'deserializerMiddleware',
          step: 'deserialize',
          tags: ['DESERIALIZER'],
          override: !0
        },
        y = {
          name: 'serializerMiddleware',
          step: 'serialize',
          tags: ['SERIALIZER'],
          override: !0
        }
      function m (e, t, r) {
        return {
          applyToStack: n => {
            n.add(f(e, r), h), n.add(p(e, t), y)
          }
        }
      }
      const g = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/,
        b = /(\d+\.){3}\d+/,
        w = /\.\./,
        v = (e, t, r) => {
          const n = async () => {
            const n = r[e] ?? r[t]
            return 'function' == typeof n ? n() : n
          }
          return 'endpoint' === e || 'endpoint' === t
            ? async () => {
                const e = await n()
                if (e && 'object' == typeof e) {
                  if ('url' in e) return e.url.href
                  if ('hostname' in e) {
                    const { protocol: t, hostname: r, port: n, path: i } = e
                    return `${t}//${r}${n ? ':' + n : ''}${i}`
                  }
                }
                return e
              }
            : n
        },
        S = async (e, t, r) => {
          const n = {},
            i = t?.getEndpointParameterInstructions?.() || {}
          for (const [t, o] of Object.entries(i))
            switch (o.type) {
              case 'staticContextParams':
                n[t] = o.value
                break
              case 'contextParams':
                n[t] = e[o.name]
                break
              case 'clientContextParams':
              case 'builtInParams':
                n[t] = await v(o.name, t, r)()
                break
              default:
                throw new Error(
                  'Unrecognized endpoint parameter instruction: ' +
                    JSON.stringify(o)
                )
            }
          return (
            0 === Object.keys(i).length && Object.assign(n, r),
            's3' === String(r.serviceId).toLowerCase() &&
              (await (async e => {
                const t = e?.Bucket || ''
                if (
                  ('string' == typeof e.Bucket &&
                    (e.Bucket = t
                      .replace(/#/g, encodeURIComponent('#'))
                      .replace(/\?/g, encodeURIComponent('?'))),
                  (e => {
                    const [t, r, n, i, o, a] = e.split(':'),
                      s = 'arn' === t && e.split(':').length >= 6,
                      u = 5 === [t, r, n, o, a].filter(Boolean).length
                    if (s && !u)
                      throw new Error(`Invalid ARN: ${e} was an invalid ARN.`)
                    return !!('arn' === t && r && n && o && a)
                  })(t))
                ) {
                  if (!0 === e.ForcePathStyle)
                    throw new Error(
                      'Path-style addressing cannot be used with ARN buckets'
                    )
                } else
                  (r = t),
                    (!g.test(r) ||
                      b.test(r) ||
                      w.test(r) ||
                      (-1 !== t.indexOf('.') &&
                        !String(e.Endpoint).startsWith('http:')) ||
                      t.toLowerCase() !== t ||
                      t.length < 3) &&
                      (e.ForcePathStyle = !0)
                var r
                return (
                  e.DisableMultiRegionAccessPoints &&
                    ((e.disableMultiRegionAccessPoints = !0),
                    (e.DisableMRAP = !0)),
                  e
                )
              })(n)),
            n
          )
        },
        E = {
          step: 'serialize',
          tags: ['ENDPOINT_PARAMETERS', 'ENDPOINT_V2', 'ENDPOINT'],
          name: 'endpointV2Middleware',
          override: !0,
          relation: 'before',
          toMiddleware: y.name
        },
        A = (e, t) => ({
          applyToStack: r => {
            r.addRelativeTo(
              (
                ({ config: e, instructions: t }) =>
                (r, n) =>
                async i => {
                  const o = await (async (e, t, r, n) => {
                    const i = await S(e, t, r)
                    if ('function' != typeof r.endpointProvider)
                      throw new Error('config.endpointProvider is not set.')
                    return r.endpointProvider(i, n)
                  })(
                    i.input,
                    { getEndpointParameterInstructions: () => t },
                    { ...e },
                    n
                  )
                  ;(n.endpointV2 = o),
                    (n.authSchemes = o.properties?.authSchemes)
                  const a = n.authSchemes?.[0]
                  return (
                    a &&
                      ((n.signing_region = a.signingRegion),
                      (n.signing_service = a.signingName)),
                    r({ ...i })
                  )
                }
              )({ config: e, instructions: t }),
              E
            )
          }
        }),
        _ = e => {
          if ('function' == typeof e) return e
          const t = Promise.resolve(e)
          return () => t
        },
        O = e => {
          if ('string' == typeof e) return O(new URL(e))
          const {
            hostname: t,
            pathname: r,
            port: n,
            protocol: i,
            search: o
          } = e
          let a
          return (
            o &&
              (a = (function (e) {
                const t = {}
                if ((e = e.replace(/^\?/, '')))
                  for (const r of e.split('&')) {
                    let [e, n = null] = r.split('=')
                    ;(e = decodeURIComponent(e)),
                      n && (n = decodeURIComponent(n)),
                      e in t
                        ? Array.isArray(t[e])
                          ? t[e].push(n)
                          : (t[e] = [t[e], n])
                        : (t[e] = n)
                  }
                return t
              })(o)),
            {
              hostname: t,
              port: n ? parseInt(n) : void 0,
              protocol: i,
              path: r,
              query: a
            }
          )
        }
      var I = r(675),
        C = r.n(I)
      class P {
        constructor (e) {
          this.cache = new (C())(e)
        }
        getEndpoint (e) {
          const t = this.get(e)
          if (!t || 0 === t.length) return
          const r = t.map(e => e.Address)
          return r[Math.floor(Math.random() * r.length)]
        }
        get (e) {
          if (!this.has(e)) return
          const t = this.cache.get(e)
          if (!t) return
          const r = Date.now(),
            n = t.filter(e => r < e.Expires)
          if (0 !== n.length) return n
          this.delete(e)
        }
        set (e, t) {
          const r = Date.now()
          this.cache.set(
            e,
            t.map(({ Address: e, CachePeriodInMinutes: t }) => ({
              Address: e,
              Expires: r + 60 * t * 1e3
            }))
          )
        }
        delete (e) {
          this.cache.set(e, [])
        }
        has (e) {
          if (!this.cache.has(e)) return !1
          const t = this.cache.peek(e)
          return !!t && t.length > 0
        }
        clear () {
          this.cache.clear()
        }
      }
      const N = {
          name: 'hostHeaderMiddleware',
          step: 'build',
          priority: 'low',
          tags: ['HOST'],
          override: !0
        },
        T = {
          name: 'loggerMiddleware',
          tags: ['LOGGER'],
          step: 'initialize',
          override: !0
        },
        R = 'X-Amzn-Trace-Id',
        M = {
          step: 'build',
          tags: ['RECURSION_DETECTION'],
          name: 'recursionDetectionMiddleware',
          override: !0,
          priority: 'low'
        }
      var x, L
      ;((L = x || (x = {})).STANDARD = 'standard'), (L.ADAPTIVE = 'adaptive')
      const D = [
          'BandwidthLimitExceeded',
          'EC2ThrottledException',
          'LimitExceededException',
          'PriorRequestNotComplete',
          'ProvisionedThroughputExceededException',
          'RequestLimitExceeded',
          'RequestThrottled',
          'RequestThrottledException',
          'SlowDown',
          'ThrottledException',
          'Throttling',
          'ThrottlingException',
          'TooManyRequestsException',
          'TransactionInProgressException'
        ],
        k = [
          'AbortError',
          'TimeoutError',
          'RequestTimeout',
          'RequestTimeoutException'
        ],
        B = [500, 502, 503, 504],
        F = ['ECONNRESET', 'EPIPE', 'ETIMEDOUT'],
        j = e =>
          429 === e.$metadata?.httpStatusCode ||
          D.includes(e.name) ||
          1 == e.$retryable?.throttling,
        U = e =>
          k.includes(e.name) ||
          F.includes(e?.code || '') ||
          B.includes(e.$metadata?.httpStatusCode || 0)
      class $ {
        constructor (e) {
          ;(this.currentCapacity = 0),
            (this.enabled = !1),
            (this.lastMaxRate = 0),
            (this.measuredTxRate = 0),
            (this.requestCount = 0),
            (this.lastTimestamp = 0),
            (this.timeWindow = 0),
            (this.beta = e?.beta ?? 0.7),
            (this.minCapacity = e?.minCapacity ?? 1),
            (this.minFillRate = e?.minFillRate ?? 0.5),
            (this.scaleConstant = e?.scaleConstant ?? 0.4),
            (this.smooth = e?.smooth ?? 0.8)
          const t = this.getCurrentTimeInSeconds()
          ;(this.lastThrottleTime = t),
            (this.lastTxRateBucket = Math.floor(
              this.getCurrentTimeInSeconds()
            )),
            (this.fillRate = this.minFillRate),
            (this.maxCapacity = this.minCapacity)
        }
        getCurrentTimeInSeconds () {
          return Date.now() / 1e3
        }
        async getSendToken () {
          return this.acquireTokenBucket(1)
        }
        async acquireTokenBucket (e) {
          if (this.enabled) {
            if ((this.refillTokenBucket(), e > this.currentCapacity)) {
              const t = ((e - this.currentCapacity) / this.fillRate) * 1e3
              await new Promise(e => setTimeout(e, t))
            }
            this.currentCapacity = this.currentCapacity - e
          }
        }
        refillTokenBucket () {
          const e = this.getCurrentTimeInSeconds()
          if (!this.lastTimestamp) return void (this.lastTimestamp = e)
          const t = (e - this.lastTimestamp) * this.fillRate
          ;(this.currentCapacity = Math.min(
            this.maxCapacity,
            this.currentCapacity + t
          )),
            (this.lastTimestamp = e)
        }
        updateClientSendingRate (e) {
          let t
          if ((this.updateMeasuredRate(), j(e))) {
            const e = this.enabled
              ? Math.min(this.measuredTxRate, this.fillRate)
              : this.measuredTxRate
            ;(this.lastMaxRate = e),
              this.calculateTimeWindow(),
              (this.lastThrottleTime = this.getCurrentTimeInSeconds()),
              (t = this.cubicThrottle(e)),
              this.enableTokenBucket()
          } else
            this.calculateTimeWindow(),
              (t = this.cubicSuccess(this.getCurrentTimeInSeconds()))
          const r = Math.min(t, 2 * this.measuredTxRate)
          this.updateTokenBucketRate(r)
        }
        calculateTimeWindow () {
          this.timeWindow = this.getPrecise(
            Math.pow(
              (this.lastMaxRate * (1 - this.beta)) / this.scaleConstant,
              1 / 3
            )
          )
        }
        cubicThrottle (e) {
          return this.getPrecise(e * this.beta)
        }
        cubicSuccess (e) {
          return this.getPrecise(
            this.scaleConstant *
              Math.pow(e - this.lastThrottleTime - this.timeWindow, 3) +
              this.lastMaxRate
          )
        }
        enableTokenBucket () {
          this.enabled = !0
        }
        updateTokenBucketRate (e) {
          this.refillTokenBucket(),
            (this.fillRate = Math.max(e, this.minFillRate)),
            (this.maxCapacity = Math.max(e, this.minCapacity)),
            (this.currentCapacity = Math.min(
              this.currentCapacity,
              this.maxCapacity
            ))
        }
        updateMeasuredRate () {
          const e = this.getCurrentTimeInSeconds(),
            t = Math.floor(2 * e) / 2
          if ((this.requestCount++, t > this.lastTxRateBucket)) {
            const e = this.requestCount / (t - this.lastTxRateBucket)
            ;(this.measuredTxRate = this.getPrecise(
              e * this.smooth + this.measuredTxRate * (1 - this.smooth)
            )),
              (this.requestCount = 0),
              (this.lastTxRateBucket = t)
          }
        }
        getPrecise (e) {
          return parseFloat(e.toFixed(8))
        }
      }
      class V {
        constructor (e) {
          ;(this.maxAttemptsProvider = e),
            (this.mode = x.STANDARD),
            (this.retryToken = ((e, t, r, n) => {
              const i = e,
                o = n?.retryCost ?? 5,
                a = n?.timeoutRetryCost ?? 10,
                s =
                  n?.retryBackoffStrategy ??
                  (() => {
                    let e = 100
                    return {
                      computeNextBackoffDelay: t =>
                        Math.floor(Math.min(2e4, Math.random() * 2 ** t * e)),
                      setDelayBase: t => {
                        e = t
                      }
                    }
                  })()
              let u,
                c = e,
                l = Math.min(2e4, t),
                d = r ?? 0
              const f = e => ('TRANSIENT' === e ? a : o),
                p = e => f(e) <= c
              return {
                getRetryCount: () => d,
                getRetryDelay: () => l,
                getLastRetryCost: () => u,
                hasRetryTokens: p,
                getRetryTokenCount: e => {
                  const t = e.errorType
                  if (!p(t)) throw new Error('No retry token available')
                  const r = f(t),
                    n = 'THROTTLING' === t ? 500 : 100
                  s.setDelayBase(n)
                  const i = s.computeNextBackoffDelay(d)
                  if (e.retryAfterHint) {
                    const t = e.retryAfterHint.getTime() - Date.now()
                    l = Math.max(t || 0, i)
                  } else l = i
                  return d++, (u = r), (c -= r), r
                },
                releaseRetryTokens: e => {
                  ;(c += e ?? 1), (c = Math.min(c, i))
                }
              }
            })(500, 100)),
            (this.maxAttemptsProvider = e)
        }
        async acquireInitialRetryToken (e) {
          return this.retryToken
        }
        async refreshRetryTokenForRetry (e, t) {
          const r = await this.getMaxAttempts()
          if (this.shouldRetry(e, t, r)) return e.getRetryTokenCount(t), e
          throw new Error('No retry token available')
        }
        recordSuccess (e) {
          this.retryToken.releaseRetryTokens(e.getLastRetryCost())
        }
        async getMaxAttempts () {
          try {
            return await this.maxAttemptsProvider()
          } catch (e) {
            return (
              console.warn(
                'Max attempts provider could not resolve. Using default of 3'
              ),
              3
            )
          }
        }
        shouldRetry (e, t, r) {
          return (
            e.getRetryCount() < r &&
            e.hasRetryTokens(t.errorType) &&
            this.isRetryableError(t.errorType)
          )
        }
        isRetryableError (e) {
          return 'THROTTLING' === e || 'TRANSIENT' === e
        }
      }
      class G {
        constructor (e, t) {
          ;(this.maxAttemptsProvider = e), (this.mode = x.ADAPTIVE)
          const { rateLimiter: r } = t ?? {}
          ;(this.rateLimiter = r ?? new $()),
            (this.standardRetryStrategy = new V(e))
        }
        async acquireInitialRetryToken (e) {
          return (
            await this.rateLimiter.getSendToken(),
            this.standardRetryStrategy.acquireInitialRetryToken(e)
          )
        }
        async refreshRetryTokenForRetry (e, t) {
          return (
            this.rateLimiter.updateClientSendingRate(t),
            this.standardRetryStrategy.refreshRetryTokenForRetry(e, t)
          )
        }
        recordSuccess (e) {
          this.rateLimiter.updateClientSendingRate({}),
            this.standardRetryStrategy.recordSuccess(e)
        }
      }
      var z,
        q = new Uint8Array(16)
      function H () {
        if (
          !z &&
          !(z =
            ('undefined' != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)) ||
            ('undefined' != typeof msCrypto &&
              'function' == typeof msCrypto.getRandomValues &&
              msCrypto.getRandomValues.bind(msCrypto)))
        )
          throw new Error(
            'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
          )
        return z(q)
      }
      const K =
        /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
      for (var W = [], Y = 0; Y < 256; ++Y)
        W.push((Y + 256).toString(16).substr(1))
      const Z = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            r = (
              W[e[t + 0]] +
              W[e[t + 1]] +
              W[e[t + 2]] +
              W[e[t + 3]] +
              '-' +
              W[e[t + 4]] +
              W[e[t + 5]] +
              '-' +
              W[e[t + 6]] +
              W[e[t + 7]] +
              '-' +
              W[e[t + 8]] +
              W[e[t + 9]] +
              '-' +
              W[e[t + 10]] +
              W[e[t + 11]] +
              W[e[t + 12]] +
              W[e[t + 13]] +
              W[e[t + 14]] +
              W[e[t + 15]]
            ).toLowerCase()
          if (
            !(function (e) {
              return 'string' == typeof e && K.test(e)
            })(r)
          )
            throw TypeError('Stringified UUID is invalid')
          return r
        },
        J = function (e, t, r) {
          var n = (e = e || {}).random || (e.rng || H)()
          if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), t)) {
            r = r || 0
            for (var i = 0; i < 16; ++i) t[r + i] = n[i]
            return t
          }
          return Z(n)
        },
        Q = e => {
          const t = { errorType: X(e) },
            r = te(e.$response)
          return r && (t.retryAfterHint = r), t
        },
        X = e =>
          j(e)
            ? 'THROTTLING'
            : U(e)
            ? 'TRANSIENT'
            : (e => {
                if (void 0 !== e.$metadata?.httpStatusCode) {
                  const t = e.$metadata.httpStatusCode
                  return 500 <= t && t <= 599 && !U(e)
                }
                return !1
              })(e)
            ? 'SERVER_ERROR'
            : 'CLIENT_ERROR',
        ee = {
          name: 'retryMiddleware',
          tags: ['RETRY'],
          step: 'finalizeRequest',
          priority: 'high',
          override: !0
        },
        te = e => {
          if (!c.isInstance(e)) return
          const t = Object.keys(e.headers).find(
            e => 'retry-after' === e.toLowerCase()
          )
          if (!t) return
          const r = e.headers[t],
            n = Number(r)
          return Number.isNaN(n) ? new Date(r) : new Date(1e3 * n)
        }
      class re extends Error {
        constructor (e, t = !0) {
          super(e),
            (this.tryNextLink = t),
            (this.name = 'ProviderError'),
            Object.setPrototypeOf(this, re.prototype)
        }
        static from (e, t = !0) {
          return Object.assign(new this(e.message, t), e)
        }
      }
      const ne = (e, t, r) => {
          let n,
            i,
            o,
            a = !1
          const s = async () => {
            i || (i = e())
            try {
              ;(n = await i), (o = !0), (a = !1)
            } finally {
              i = void 0
            }
            return n
          }
          return void 0 === t
            ? async e => ((o && !e?.forceRefresh) || (n = await s()), n)
            : async e => (
                (o && !e?.forceRefresh) || (n = await s()),
                a ? n : r && !r(n) ? ((a = !0), n) : t(n) ? (await s(), n) : n
              )
        },
        ie = {},
        oe = {}
      for (let e = 0; e < 256; e++) {
        let t = e.toString(16).toLowerCase()
        1 === t.length && (t = `0${t}`), (ie[e] = t), (oe[t] = e)
      }
      function ae (e) {
        let t = ''
        for (let r = 0; r < e.byteLength; r++) t += ie[e[r]]
        return t
      }
      const se = e => new TextEncoder().encode(e),
        ue = e =>
          'string' == typeof e
            ? se(e)
            : ArrayBuffer.isView(e)
            ? new Uint8Array(
                e.buffer,
                e.byteOffset,
                e.byteLength / Uint8Array.BYTES_PER_ELEMENT
              )
            : new Uint8Array(e),
        ce = 'X-Amz-Date',
        le = 'X-Amz-Signature',
        de = 'X-Amz-Security-Token',
        fe = 'authorization',
        pe = ce.toLowerCase(),
        he = [fe, pe, 'date'],
        ye = le.toLowerCase(),
        me = 'x-amz-content-sha256',
        ge = de.toLowerCase(),
        be = {
          authorization: !0,
          'cache-control': !0,
          connection: !0,
          expect: !0,
          from: !0,
          'keep-alive': !0,
          'max-forwards': !0,
          pragma: !0,
          referer: !0,
          te: !0,
          trailer: !0,
          'transfer-encoding': !0,
          upgrade: !0,
          'user-agent': !0,
          'x-amzn-trace-id': !0
        },
        we = /^proxy-/,
        ve = /^sec-/,
        Se = 'AWS4-HMAC-SHA256',
        Ee = 'AWS4-HMAC-SHA256-PAYLOAD',
        Ae = 'aws4_request',
        _e = {},
        Oe = [],
        Ie = (e, t, r) => `${e}/${t}/${r}/${Ae}`,
        Ce = (e, t, r) => {
          const n = new e(t)
          return n.update(ue(r)), n.digest()
        },
        Pe = ({ headers: e }, t, r) => {
          const n = {}
          for (const i of Object.keys(e).sort()) {
            if (null == e[i]) continue
            const o = i.toLowerCase()
            ;((o in be || t?.has(o) || we.test(o) || ve.test(o)) &&
              (!r || (r && !r.has(o)))) ||
              (n[o] = e[i].trim().replace(/\s+/g, ' '))
          }
          return n
        },
        Ne = e => encodeURIComponent(e).replace(/[!'()*]/g, Te),
        Te = e => `%${e.charCodeAt(0).toString(16).toUpperCase()}`,
        Re = async ({ headers: e, body: t }, r) => {
          for (const t of Object.keys(e))
            if (t.toLowerCase() === me) return e[t]
          if (null == t)
            return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
          if (
            'string' == typeof t ||
            ArrayBuffer.isView(t) ||
            ((n = t),
            ('function' == typeof ArrayBuffer && n instanceof ArrayBuffer) ||
              '[object ArrayBuffer]' === Object.prototype.toString.call(n))
          ) {
            const e = new r()
            return e.update(ue(t)), ae(await e.digest())
          }
          var n
          return 'UNSIGNED-PAYLOAD'
        },
        Me = ({ headers: e, query: t, ...r }) => ({
          ...r,
          headers: { ...e },
          query: t ? xe(t) : void 0
        }),
        xe = e =>
          Object.keys(e).reduce((t, r) => {
            const n = e[r]
            return { ...t, [r]: Array.isArray(n) ? [...n] : n }
          }, {}),
        Le = e => {
          e = 'function' == typeof e.clone ? e.clone() : Me(e)
          for (const t of Object.keys(e.headers))
            he.indexOf(t.toLowerCase()) > -1 && delete e.headers[t]
          return e
        }
      class De {
        constructor ({
          applyChecksum: e,
          credentials: t,
          region: r,
          service: n,
          sha256: i,
          uriEscapePath: o = !0
        }) {
          ;(this.service = n),
            (this.sha256 = i),
            (this.uriEscapePath = o),
            (this.applyChecksum = 'boolean' != typeof e || e),
            (this.regionProvider = _(r)),
            (this.credentialProvider = _(t))
        }
        async presign (e, t = {}) {
          const {
              signingDate: r = new Date(),
              expiresIn: n = 3600,
              unsignableHeaders: i,
              unhoistableHeaders: o,
              signableHeaders: a,
              signingRegion: s,
              signingService: u
            } = t,
            c = await this.credentialProvider()
          this.validateResolvedCredentials(c)
          const l = s ?? (await this.regionProvider()),
            { longDate: d, shortDate: f } = ke(r)
          if (n > 604800)
            return Promise.reject(
              'Signature version 4 presigned URLs must have an expiration date less than one week in the future'
            )
          const p = Ie(f, l, u ?? this.service),
            h = ((e, t = {}) => {
              const { headers: r, query: n = {} } =
                'function' == typeof e.clone ? e.clone() : Me(e)
              for (const e of Object.keys(r)) {
                const i = e.toLowerCase()
                'x-amz-' !== i.slice(0, 6) ||
                  t.unhoistableHeaders?.has(i) ||
                  ((n[e] = r[e]), delete r[e])
              }
              return { ...e, headers: r, query: n }
            })(Le(e), { unhoistableHeaders: o })
          c.sessionToken && (h.query[de] = c.sessionToken),
            (h.query['X-Amz-Algorithm'] = Se),
            (h.query['X-Amz-Credential'] = `${c.accessKeyId}/${p}`),
            (h.query[ce] = d),
            (h.query['X-Amz-Expires'] = n.toString(10))
          const y = Pe(h, i, a)
          return (
            (h.query['X-Amz-SignedHeaders'] = Be(y)),
            (h.query[le] = await this.getSignature(
              d,
              p,
              this.getSigningKey(c, l, f, u),
              this.createCanonicalRequest(h, y, await Re(e, this.sha256))
            )),
            h
          )
        }
        async sign (e, t) {
          return 'string' == typeof e
            ? this.signString(e, t)
            : e.headers && e.payload
            ? this.signEvent(e, t)
            : this.signRequest(e, t)
        }
        async signEvent (
          { headers: e, payload: t },
          {
            signingDate: r = new Date(),
            priorSignature: n,
            signingRegion: i,
            signingService: o
          }
        ) {
          const a = i ?? (await this.regionProvider()),
            { shortDate: s, longDate: u } = ke(r),
            c = Ie(s, a, o ?? this.service),
            l = await Re({ headers: {}, body: t }, this.sha256),
            d = new this.sha256()
          d.update(e)
          const f = ae(await d.digest()),
            p = [Ee, u, c, n, f, l].join('\n')
          return this.signString(p, {
            signingDate: r,
            signingRegion: a,
            signingService: o
          })
        }
        async signString (
          e,
          {
            signingDate: t = new Date(),
            signingRegion: r,
            signingService: n
          } = {}
        ) {
          const i = await this.credentialProvider()
          this.validateResolvedCredentials(i)
          const o = r ?? (await this.regionProvider()),
            { shortDate: a } = ke(t),
            s = new this.sha256(await this.getSigningKey(i, o, a, n))
          return s.update(ue(e)), ae(await s.digest())
        }
        async signRequest (
          e,
          {
            signingDate: t = new Date(),
            signableHeaders: r,
            unsignableHeaders: n,
            signingRegion: i,
            signingService: o
          } = {}
        ) {
          const a = await this.credentialProvider()
          this.validateResolvedCredentials(a)
          const s = i ?? (await this.regionProvider()),
            u = Le(e),
            { longDate: c, shortDate: l } = ke(t),
            d = Ie(l, s, o ?? this.service)
          ;(u.headers[pe] = c),
            a.sessionToken && (u.headers[ge] = a.sessionToken)
          const f = await Re(u, this.sha256)
          !((e, t) => {
            e = e.toLowerCase()
            for (const r of Object.keys(t)) if (e === r.toLowerCase()) return !0
            return !1
          })(me, u.headers) &&
            this.applyChecksum &&
            (u.headers[me] = f)
          const p = Pe(u, n, r),
            h = await this.getSignature(
              c,
              d,
              this.getSigningKey(a, s, l, o),
              this.createCanonicalRequest(u, p, f)
            )
          return (
            (u.headers[fe] = `${Se} Credential=${
              a.accessKeyId
            }/${d}, SignedHeaders=${Be(p)}, Signature=${h}`),
            u
          )
        }
        createCanonicalRequest (e, t, r) {
          const n = Object.keys(t).sort()
          return `${e.method}\n${this.getCanonicalPath(e)}\n${(({
            query: e = {}
          }) => {
            const t = [],
              r = {}
            for (const n of Object.keys(e).sort()) {
              if (n.toLowerCase() === ye) continue
              t.push(n)
              const i = e[n]
              'string' == typeof i
                ? (r[n] = `${Ne(n)}=${Ne(i)}`)
                : Array.isArray(i) &&
                  (r[n] = i
                    .slice(0)
                    .sort()
                    .reduce((e, t) => e.concat([`${Ne(n)}=${Ne(t)}`]), [])
                    .join('&'))
            }
            return t
              .map(e => r[e])
              .filter(e => e)
              .join('&')
          })(e)}\n${n.map(e => `${e}:${t[e]}`).join('\n')}\n\n${n.join(
            ';'
          )}\n${r}`
        }
        async createStringToSign (e, t, r) {
          const n = new this.sha256()
          n.update(ue(r))
          const i = await n.digest()
          return `${Se}\n${e}\n${t}\n${ae(i)}`
        }
        getCanonicalPath ({ path: e }) {
          if (this.uriEscapePath) {
            const t = []
            for (const r of e.split('/'))
              0 !== r?.length && '.' !== r && ('..' === r ? t.pop() : t.push(r))
            const r = `${e?.startsWith('/') ? '/' : ''}${t.join('/')}${
              t.length > 0 && e?.endsWith('/') ? '/' : ''
            }`
            return encodeURIComponent(r).replace(/%2F/g, '/')
          }
          return e
        }
        async getSignature (e, t, r, n) {
          const i = await this.createStringToSign(e, t, n),
            o = new this.sha256(await r)
          return o.update(ue(i)), ae(await o.digest())
        }
        getSigningKey (e, t, r, n) {
          return (async (e, t, r, n, i) => {
            const o = `${r}:${n}:${i}:${ae(
              await Ce(e, t.secretAccessKey, t.accessKeyId)
            )}:${t.sessionToken}`
            if (o in _e) return _e[o]
            for (Oe.push(o); Oe.length > 50; ) delete _e[Oe.shift()]
            let a = `AWS4${t.secretAccessKey}`
            for (const t of [r, n, i, Ae]) a = await Ce(e, a, t)
            return (_e[o] = a)
          })(this.sha256, e, r, t, n || this.service)
        }
        validateResolvedCredentials (e) {
          if (
            'object' != typeof e ||
            'string' != typeof e.accessKeyId ||
            'string' != typeof e.secretAccessKey
          )
            throw new Error('Resolved credential object is not valid')
        }
      }
      const ke = e => {
          const t = ((r = e),
          (e =>
            'number' == typeof e
              ? new Date(1e3 * e)
              : 'string' == typeof e
              ? Number(e)
                ? new Date(1e3 * Number(e))
                : new Date(e)
              : e)(r)
            .toISOString()
            .replace(/\.\d{3}Z$/, 'Z')).replace(/[\-:]/g, '')
          var r
          return { longDate: t, shortDate: t.slice(0, 8) }
        },
        Be = e => Object.keys(e).sort().join(';'),
        Fe = e => new Date(Date.now() + e),
        je = (e, t) => {
          const r = Date.parse(e)
          return ((e, t) => Math.abs(Fe(t).getTime() - e) >= 3e5)(r, t)
            ? r - Date.now()
            : t
        },
        Ue = e =>
          c.isInstance(e) ? e.headers?.date ?? e.headers?.Date : void 0,
        $e = {
          name: 'awsAuthMiddleware',
          tags: ['SIGNATURE', 'AWSAUTH'],
          relation: 'after',
          toMiddleware: 'retryMiddleware',
          override: !0
        },
        Ve = 'user-agent',
        Ge = 'x-amz-user-agent',
        ze = /[^\!\#\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g,
        qe = ([e, t]) => {
          const r = e.indexOf('/'),
            n = e.substring(0, r)
          let i = e.substring(r + 1)
          return (
            'api' === n && (i = i.toLowerCase()),
            [n, i, t]
              .filter(e => e && e.length > 0)
              .map(e => e?.replace(ze, '_'))
              .join('/')
          )
        },
        He = {
          name: 'getUserAgentMiddleware',
          step: 'build',
          priority: 'low',
          tags: ['SET_USER_AGENT', 'USER_AGENT'],
          override: !0
        }
      class Ke {
        trace () {}
        debug () {}
        info () {}
        warn () {}
        error () {}
      }
      const We = () => {
          let e = [],
            t = []
          const r = new Set(),
            n = r => (
              e.forEach(e => {
                r.add(e.middleware, { ...e })
              }),
              t.forEach(e => {
                r.addRelativeTo(e.middleware, { ...e })
              }),
              r
            ),
            i = e => {
              const t = []
              return (
                e.before.forEach(e => {
                  0 === e.before.length && 0 === e.after.length
                    ? t.push(e)
                    : t.push(...i(e))
                }),
                t.push(e),
                e.after.reverse().forEach(e => {
                  0 === e.before.length && 0 === e.after.length
                    ? t.push(e)
                    : t.push(...i(e))
                }),
                t
              )
            },
            o = (r = !1) => {
              const n = [],
                o = [],
                a = {}
              e.forEach(e => {
                const t = { ...e, before: [], after: [] }
                t.name && (a[t.name] = t), n.push(t)
              }),
                t.forEach(e => {
                  const t = { ...e, before: [], after: [] }
                  t.name && (a[t.name] = t), o.push(t)
                }),
                o.forEach(e => {
                  if (e.toMiddleware) {
                    const t = a[e.toMiddleware]
                    if (void 0 === t) {
                      if (r) return
                      throw new Error(
                        `${e.toMiddleware} is not found when adding ${
                          e.name || 'anonymous'
                        } middleware ${e.relation} ${e.toMiddleware}`
                      )
                    }
                    'after' === e.relation && t.after.push(e),
                      'before' === e.relation && t.before.push(e)
                  }
                })
              const s = ((u = n),
              u.sort(
                (e, t) =>
                  Ye[t.step] - Ye[e.step] ||
                  Ze[t.priority || 'normal'] - Ze[e.priority || 'normal']
              ))
                .map(i)
                .reduce((e, t) => (e.push(...t), e), [])
              var u
              return s
            },
            a = {
              add: (t, n = {}) => {
                const { name: i, override: o } = n,
                  a = {
                    step: 'initialize',
                    priority: 'normal',
                    middleware: t,
                    ...n
                  }
                if (i) {
                  if (r.has(i)) {
                    if (!o) throw new Error(`Duplicate middleware name '${i}'`)
                    const t = e.findIndex(e => e.name === i),
                      r = e[t]
                    if (r.step !== a.step || r.priority !== a.priority)
                      throw new Error(
                        `"${i}" middleware with ${r.priority} priority in ${r.step} step cannot be overridden by same-name middleware with ${a.priority} priority in ${a.step} step.`
                      )
                    e.splice(t, 1)
                  }
                  r.add(i)
                }
                e.push(a)
              },
              addRelativeTo: (e, n) => {
                const { name: i, override: o } = n,
                  a = { middleware: e, ...n }
                if (i) {
                  if (r.has(i)) {
                    if (!o) throw new Error(`Duplicate middleware name '${i}'`)
                    const e = t.findIndex(e => e.name === i),
                      r = t[e]
                    if (
                      r.toMiddleware !== a.toMiddleware ||
                      r.relation !== a.relation
                    )
                      throw new Error(
                        `"${i}" middleware ${r.relation} "${r.toMiddleware}" middleware cannot be overridden by same-name middleware ${a.relation} "${a.toMiddleware}" middleware.`
                      )
                    t.splice(e, 1)
                  }
                  r.add(i)
                }
                t.push(a)
              },
              clone: () => n(We()),
              use: e => {
                e.applyToStack(a)
              },
              remove: n =>
                'string' == typeof n
                  ? (n => {
                      let i = !1
                      const o = e =>
                        !e.name || e.name !== n || ((i = !0), r.delete(n), !1)
                      return (e = e.filter(o)), (t = t.filter(o)), i
                    })(n)
                  : (n => {
                      let i = !1
                      const o = e =>
                        e.middleware !== n ||
                        ((i = !0), e.name && r.delete(e.name), !1)
                      return (e = e.filter(o)), (t = t.filter(o)), i
                    })(n),
              removeByTag: n => {
                let i = !1
                const o = e => {
                  const { tags: t, name: o } = e
                  return (
                    !t || !t.includes(n) || (o && r.delete(o), (i = !0), !1)
                  )
                }
                return (e = e.filter(o)), (t = t.filter(o)), i
              },
              concat: e => {
                const t = n(We())
                return t.use(e), t
              },
              applyToStack: n,
              identify: () =>
                o(!0).map(e => e.name + ': ' + (e.tags || []).join(',')),
              resolve: (e, t) => {
                for (const r of o()
                  .map(e => e.middleware)
                  .reverse())
                  e = r(e, t)
                return e
              }
            }
          return a
        },
        Ye = {
          initialize: 5,
          serialize: 4,
          build: 3,
          finalizeRequest: 2,
          deserialize: 1
        },
        Ze = { high: 3, normal: 2, low: 1 }
      class Je {
        constructor (e) {
          ;(this.middlewareStack = We()), (this.config = e)
        }
        send (e, t, r) {
          const n = 'function' != typeof t ? t : void 0,
            i = 'function' == typeof t ? t : r,
            o = e.resolveMiddleware(this.middlewareStack, this.config, n)
          if (!i) return o(e).then(e => e.output)
          o(e)
            .then(
              e => i(null, e.output),
              e => i(e)
            )
            .catch(() => {})
        }
        destroy () {
          this.config.requestHandler.destroy &&
            this.config.requestHandler.destroy()
        }
      }
      class Qe {
        constructor () {
          this.middlewareStack = We()
        }
      }
      const Xe = e => {
          if (null != e) {
            if ('number' == typeof e) {
              if (
                ((0 !== e && 1 !== e) ||
                  ct.warn(ut(`Expected boolean, got ${typeof e}: ${e}`)),
                0 === e)
              )
                return !1
              if (1 === e) return !0
            }
            if ('string' == typeof e) {
              const t = e.toLowerCase()
              if (
                (('false' !== t && 'true' !== t) ||
                  ct.warn(ut(`Expected boolean, got ${typeof e}: ${e}`)),
                'false' === t)
              )
                return !1
              if ('true' === t) return !0
            }
            if ('boolean' == typeof e) return e
            throw new TypeError(`Expected boolean, got ${typeof e}: ${e}`)
          }
        },
        et =
          (Math.ceil(2 ** 127 * (2 - 2 ** -23)),
          e => {
            if (null != e) {
              if (Number.isInteger(e) && !Number.isNaN(e)) return e
              throw new TypeError(`Expected integer, got ${typeof e}: ${e}`)
            }
          }),
        tt = e => rt(e, 32),
        rt = (e, t) => {
          const r = et(e)
          if (void 0 !== r && nt(r, t) !== r)
            throw new TypeError(`Expected ${t}-bit integer, got ${e}`)
          return r
        },
        nt = (e, t) => {
          switch (t) {
            case 32:
              return Int32Array.of(e)[0]
            case 16:
              return Int16Array.of(e)[0]
            case 8:
              return Int8Array.of(e)[0]
          }
        },
        it = e => {
          if (null != e) {
            if ('string' == typeof e) return e
            if (['boolean', 'number', 'bigint'].includes(typeof e))
              return (
                ct.warn(ut(`Expected string, got ${typeof e}: ${e}`)), String(e)
              )
            throw new TypeError(`Expected string, got ${typeof e}: ${e}`)
          }
        },
        ot = e => {
          if (null == e) return
          const t = (e => {
              if (null == e) return
              if ('object' == typeof e && !Array.isArray(e)) return e
              const t = Array.isArray(e) ? 'array' : typeof e
              throw new TypeError(`Expected object, got ${t}: ${e}`)
            })(e),
            r = Object.entries(t)
              .filter(([, e]) => null != e)
              .map(([e]) => e)
          if (0 === r.length)
            throw new TypeError(
              'Unions must have exactly one non-null member. None were found.'
            )
          if (r.length > 1)
            throw new TypeError(
              `Unions must have exactly one non-null member. Keys ${r} were not null.`
            )
          return t
        },
        at = e =>
          'string' == typeof e
            ? st(e)
            : (e => {
                if (null != e) {
                  if ('string' == typeof e) {
                    const t = parseFloat(e)
                    if (!Number.isNaN(t))
                      return (
                        String(t) !== String(e) &&
                          ct.warn(
                            ut(`Expected number but observed string: ${e}`)
                          ),
                        t
                      )
                  }
                  if ('number' == typeof e) return e
                  throw new TypeError(`Expected number, got ${typeof e}: ${e}`)
                }
              })(e),
        st = e => {
          switch (e) {
            case 'NaN':
              return NaN
            case 'Infinity':
              return 1 / 0
            case '-Infinity':
              return -1 / 0
            default:
              throw new Error(`Unable to parse float value: ${e}`)
          }
        },
        ut = e =>
          String(new TypeError(e).stack || e)
            .split('\n')
            .slice(0, 5)
            .filter(e => !e.includes('stackTraceWarning'))
            .join('\n'),
        ct = { warn: console.warn }
      class lt extends Error {
        constructor (e) {
          super(e.message),
            Object.setPrototypeOf(this, lt.prototype),
            (this.name = e.name),
            (this.$fault = e.$fault),
            (this.$metadata = e.$metadata)
        }
      }
      const dt = (e, t = {}) => {
          Object.entries(t)
            .filter(([, e]) => void 0 !== e)
            .forEach(([t, r]) => {
              ;(null != e[t] && '' !== e[t]) || (e[t] = r)
            })
          const r = e.message || e.Message || 'UnknownError'
          return (e.message = r), delete e.Message, e
        },
        ft = ({ output: e, parsedBody: t, exceptionCtor: r, errorCode: n }) => {
          const i = pt(e),
            o = i.httpStatusCode ? i.httpStatusCode + '' : void 0,
            a = new r({
              name: t?.code || t?.Code || n || o || 'UnknownError',
              $fault: 'client',
              $metadata: i
            })
          throw dt(a, t)
        },
        pt = e => ({
          httpStatusCode: e.statusCode,
          requestId:
            e.headers['x-amzn-requestid'] ??
            e.headers['x-amzn-request-id'] ??
            e.headers['x-amz-request-id'],
          extendedRequestId: e.headers['x-amz-id-2'],
          cfId: e.headers['x-amz-cf-id']
        }),
        ht = e => {
          switch (e) {
            case 'standard':
            case 'cross-region':
              return { retryMode: 'standard', connectionTimeout: 3100 }
            case 'in-region':
              return { retryMode: 'standard', connectionTimeout: 1100 }
            case 'mobile':
              return { retryMode: 'standard', connectionTimeout: 3e4 }
            default:
              return {}
          }
        },
        yt = function () {
          const e = Object.getPrototypeOf(this).constructor,
            t = new (Function.bind.apply(String, [null, ...arguments]))()
          return Object.setPrototypeOf(t, e.prototype), t
        }
      ;(yt.prototype = Object.create(String.prototype, {
        constructor: {
          value: yt,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        Object.setPrototypeOf(yt, String)
      class mt extends lt {
        constructor (e) {
          super(e), Object.setPrototypeOf(this, mt.prototype)
        }
      }
      var gt,
        bt,
        wt,
        vt,
        St,
        Et,
        At,
        _t,
        Ot,
        It,
        Ct,
        Pt,
        Nt,
        Tt,
        Rt,
        Mt,
        xt,
        Lt,
        Dt,
        kt,
        Bt,
        Ft,
        jt,
        Ut,
        $t,
        Vt,
        Gt,
        zt,
        qt,
        Ht,
        Kt,
        Wt,
        Yt,
        Zt,
        Jt,
        Qt,
        Xt
      !(function (e) {
        ;(e.ADD = 'ADD'), (e.DELETE = 'DELETE'), (e.PUT = 'PUT')
      })(gt || (gt = {})),
        (function (e) {
          ;(e.B = 'B'), (e.N = 'N'), (e.S = 'S')
        })(bt || (bt = {})),
        (function (e) {
          ;(e.AVAILABLE = 'AVAILABLE'),
            (e.CREATING = 'CREATING'),
            (e.DELETED = 'DELETED')
        })(wt || (wt = {})),
        (function (e) {
          ;(e.AWS_BACKUP = 'AWS_BACKUP'),
            (e.SYSTEM = 'SYSTEM'),
            (e.USER = 'USER')
        })(vt || (vt = {})),
        (function (e) {
          ;(e.PAY_PER_REQUEST = 'PAY_PER_REQUEST'),
            (e.PROVISIONED = 'PROVISIONED')
        })(St || (St = {})),
        (function (e) {
          ;(e.HASH = 'HASH'), (e.RANGE = 'RANGE')
        })(Et || (Et = {})),
        (function (e) {
          ;(e.ALL = 'ALL'), (e.INCLUDE = 'INCLUDE'), (e.KEYS_ONLY = 'KEYS_ONLY')
        })(At || (At = {})),
        (function (e) {
          ;(e.AES256 = 'AES256'), (e.KMS = 'KMS')
        })(_t || (_t = {})),
        (function (e) {
          ;(e.DISABLED = 'DISABLED'),
            (e.DISABLING = 'DISABLING'),
            (e.ENABLED = 'ENABLED'),
            (e.ENABLING = 'ENABLING'),
            (e.UPDATING = 'UPDATING')
        })(Ot || (Ot = {})),
        (function (e) {
          ;(e.KEYS_ONLY = 'KEYS_ONLY'),
            (e.NEW_AND_OLD_IMAGES = 'NEW_AND_OLD_IMAGES'),
            (e.NEW_IMAGE = 'NEW_IMAGE'),
            (e.OLD_IMAGE = 'OLD_IMAGE')
        })(It || (It = {})),
        (function (e) {
          ;(e.DISABLED = 'DISABLED'),
            (e.DISABLING = 'DISABLING'),
            (e.ENABLED = 'ENABLED'),
            (e.ENABLING = 'ENABLING')
        })(Ct || (Ct = {})),
        (function (e) {
          ;(e.ALL = 'ALL'),
            (e.AWS_BACKUP = 'AWS_BACKUP'),
            (e.SYSTEM = 'SYSTEM'),
            (e.USER = 'USER')
        })(Pt || (Pt = {})),
        (function (e) {
          ;(e.INDEXES = 'INDEXES'), (e.NONE = 'NONE'), (e.TOTAL = 'TOTAL')
        })(Nt || (Nt = {})),
        (function (e) {
          ;(e.AccessDenied = 'AccessDenied'),
            (e.ConditionalCheckFailed = 'ConditionalCheckFailed'),
            (e.DuplicateItem = 'DuplicateItem'),
            (e.InternalServerError = 'InternalServerError'),
            (e.ItemCollectionSizeLimitExceeded =
              'ItemCollectionSizeLimitExceeded'),
            (e.ProvisionedThroughputExceeded = 'ProvisionedThroughputExceeded'),
            (e.RequestLimitExceeded = 'RequestLimitExceeded'),
            (e.ResourceNotFound = 'ResourceNotFound'),
            (e.ThrottlingError = 'ThrottlingError'),
            (e.TransactionConflict = 'TransactionConflict'),
            (e.ValidationError = 'ValidationError')
        })(Tt || (Tt = {}))
      class er extends mt {
        constructor (e) {
          super({ name: 'InternalServerError', $fault: 'server', ...e }),
            (this.name = 'InternalServerError'),
            (this.$fault = 'server'),
            Object.setPrototypeOf(this, er.prototype)
        }
      }
      class tr extends mt {
        constructor (e) {
          super({ name: 'RequestLimitExceeded', $fault: 'client', ...e }),
            (this.name = 'RequestLimitExceeded'),
            (this.$fault = 'client'),
            Object.setPrototypeOf(this, tr.prototype)
        }
      }
      class rr extends mt {
        constructor (e) {
          super({ name: 'InvalidEndpointException', $fault: 'client', ...e }),
            (this.name = 'InvalidEndpointException'),
            (this.$fault = 'client'),
            Object.setPrototypeOf(this, rr.prototype),
            (this.Message = e.Message)
        }
      }
      class nr extends mt {
        constructor (e) {
          super({
            name: 'ProvisionedThroughputExceededException',
            $fault: 'client',
            ...e
          }),
            (this.name = 'ProvisionedThroughputExceededException'),
            (this.$fault = 'client'),
            Object.setPrototypeOf(this, nr.prototype)
        }
      }
      class ir extends mt {
        constructor (e) {
          super({ name: 'ResourceNotFoundException', $fault: 'client', ...e }),
            (this.name = 'ResourceNotFoundException'),
            (this.$fault = 'client'),
            Object.setPrototypeOf(this, ir.prototype)
        }
      }
      !(function (e) {
        ;(e.NONE = 'NONE'), (e.SIZE = 'SIZE')
      })(Rt || (Rt = {}))
      class or extends mt {
        constructor (e) {
          super({
            name: 'ItemCollectionSizeLimitExceededException',
            $fault: 'client',
            ...e
          }),
            (this.name = 'ItemCollectionSizeLimitExceededException'),
            (this.$fault = 'client'),
            Object.setPrototypeOf(this, or.prototype)
        }
      }
      !(function (e) {
        ;(e.BEGINS_WITH = 'BEGINS_WITH'),
          (e.BETWEEN = 'BETWEEN'),
          (e.CONTAINS = 'CONTAINS'),
          (e.EQ = 'EQ'),
          (e.GE = 'GE'),
          (e.GT = 'GT'),
          (e.IN = 'IN'),
          (e.LE = 'LE'),
          (e.LT = 'LT'),
          (e.NE = 'NE'),
          (e.NOT_CONTAINS = 'NOT_CONTAINS'),
          (e.NOT_NULL = 'NOT_NULL'),
          (e.NULL = 'NULL')
      })(Mt || (Mt = {}))
      class ar extends mt {
        constructor (e) {
          super({
            name: 'ConditionalCheckFailedException',
            $fault: 'client',
            ...e
          }),
            (this.name = 'ConditionalCheckFailedException'),
            (this.$fault = 'client'),
            Object.setPrototypeOf(this, ar.prototype)
        }
      }
      !(function (e) {
        ;(e.AND = 'AND'), (e.OR = 'OR')
      })(xt || (xt = {})),
        (function (e) {
          ;(e.ALL_OLD = 'ALL_OLD'), (e.NONE = 'NONE')
        })(Lt || (Lt = {})),
        (function (e) {
          ;(e.DISABLED = 'DISABLED'), (e.ENABLED = 'ENABLED')
        })(Dt || (Dt = {})),
        (function (e) {
          ;(e.DISABLED = 'DISABLED'), (e.ENABLED = 'ENABLED')
        })(kt || (kt = {})),
        (function (e) {
          ;(e.DISABLE = 'DISABLE'), (e.ENABLE = 'ENABLE')
        })(Bt || (Bt = {})),
        (function (e) {
          ;(e.DISABLED = 'DISABLED'),
            (e.DISABLING = 'DISABLING'),
            (e.ENABLED = 'ENABLED'),
            (e.ENABLING = 'ENABLING'),
            (e.FAILED = 'FAILED')
        })(Ft || (Ft = {})),
        (function (e) {
          ;(e.ACTIVE = 'ACTIVE'),
            (e.CREATING = 'CREATING'),
            (e.DELETING = 'DELETING'),
            (e.UPDATING = 'UPDATING')
        })(jt || (jt = {})),
        (function (e) {
          ;(e.ACTIVE = 'ACTIVE'),
            (e.CREATING = 'CREATING'),
            (e.CREATION_FAILED = 'CREATION_FAILED'),
            (e.DELETING = 'DELETING'),
            (e.INACCESSIBLE_ENCRYPTION_CREDENTIALS =
              'INACCESSIBLE_ENCRYPTION_CREDENTIALS'),
            (e.REGION_DISABLED = 'REGION_DISABLED'),
            (e.UPDATING = 'UPDATING')
        })(Ut || (Ut = {})),
        (function (e) {
          ;(e.STANDARD = 'STANDARD'),
            (e.STANDARD_INFREQUENT_ACCESS = 'STANDARD_INFREQUENT_ACCESS')
        })($t || ($t = {})),
        (function (e) {
          ;(e.ACTIVE = 'ACTIVE'),
            (e.CREATING = 'CREATING'),
            (e.DELETING = 'DELETING'),
            (e.UPDATING = 'UPDATING')
        })(Vt || (Vt = {})),
        (function (e) {
          ;(e.ACTIVE = 'ACTIVE'),
            (e.ARCHIVED = 'ARCHIVED'),
            (e.ARCHIVING = 'ARCHIVING'),
            (e.CREATING = 'CREATING'),
            (e.DELETING = 'DELETING'),
            (e.INACCESSIBLE_ENCRYPTION_CREDENTIALS =
              'INACCESSIBLE_ENCRYPTION_CREDENTIALS'),
            (e.UPDATING = 'UPDATING')
        })(Gt || (Gt = {})),
        (function (e) {
          ;(e.ALL_NEW = 'ALL_NEW'),
            (e.ALL_OLD = 'ALL_OLD'),
            (e.NONE = 'NONE'),
            (e.UPDATED_NEW = 'UPDATED_NEW'),
            (e.UPDATED_OLD = 'UPDATED_OLD')
        })(zt || (zt = {}))
      class sr extends mt {
        constructor (e) {
          super({
            name: 'TransactionConflictException',
            $fault: 'client',
            ...e
          }),
            (this.name = 'TransactionConflictException'),
            (this.$fault = 'client'),
            Object.setPrototypeOf(this, sr.prototype)
        }
      }
      !(function (e) {
        ;(e.DYNAMODB_JSON = 'DYNAMODB_JSON'), (e.ION = 'ION')
      })(qt || (qt = {})),
        (function (e) {
          ;(e.COMPLETED = 'COMPLETED'),
            (e.FAILED = 'FAILED'),
            (e.IN_PROGRESS = 'IN_PROGRESS')
        })(Ht || (Ht = {})),
        (function (e) {
          ;(e.AES256 = 'AES256'), (e.KMS = 'KMS')
        })(Kt || (Kt = {})),
        (function (e) {
          ;(e.CANCELLED = 'CANCELLED'),
            (e.CANCELLING = 'CANCELLING'),
            (e.COMPLETED = 'COMPLETED'),
            (e.FAILED = 'FAILED'),
            (e.IN_PROGRESS = 'IN_PROGRESS')
        })(Wt || (Wt = {})),
        (function (e) {
          ;(e.GZIP = 'GZIP'), (e.NONE = 'NONE'), (e.ZSTD = 'ZSTD')
        })(Yt || (Yt = {})),
        (function (e) {
          ;(e.CSV = 'CSV'), (e.DYNAMODB_JSON = 'DYNAMODB_JSON'), (e.ION = 'ION')
        })(Zt || (Zt = {})),
        (function (e) {
          ;(e.ACTIVE = 'ACTIVE'),
            (e.DISABLED = 'DISABLED'),
            (e.DISABLING = 'DISABLING'),
            (e.ENABLE_FAILED = 'ENABLE_FAILED'),
            (e.ENABLING = 'ENABLING')
        })(Jt || (Jt = {})),
        (function (e) {
          ;(e.ALL_ATTRIBUTES = 'ALL_ATTRIBUTES'),
            (e.ALL_PROJECTED_ATTRIBUTES = 'ALL_PROJECTED_ATTRIBUTES'),
            (e.COUNT = 'COUNT'),
            (e.SPECIFIC_ATTRIBUTES = 'SPECIFIC_ATTRIBUTES')
        })(Qt || (Qt = {})),
        (function (e) {
          e.visit = (e, t) =>
            void 0 !== e.S
              ? t.S(e.S)
              : void 0 !== e.N
              ? t.N(e.N)
              : void 0 !== e.B
              ? t.B(e.B)
              : void 0 !== e.SS
              ? t.SS(e.SS)
              : void 0 !== e.NS
              ? t.NS(e.NS)
              : void 0 !== e.BS
              ? t.BS(e.BS)
              : void 0 !== e.M
              ? t.M(e.M)
              : void 0 !== e.L
              ? t.L(e.L)
              : void 0 !== e.NULL
              ? t.NULL(e.NULL)
              : void 0 !== e.BOOL
              ? t.BOOL(e.BOOL)
              : t._(e.$unknown[0], e.$unknown[1])
        })(Xt || (Xt = {}))
      const ur = e => ({ ...e }),
        cr = e => ({ ...e }),
        lr = e =>
          void 0 !== e.S
            ? { S: e.S }
            : void 0 !== e.N
            ? { N: e.N }
            : void 0 !== e.B
            ? { B: e.B }
            : void 0 !== e.SS
            ? { SS: e.SS }
            : void 0 !== e.NS
            ? { NS: e.NS }
            : void 0 !== e.BS
            ? { BS: e.BS }
            : void 0 !== e.M
            ? {
                M: Object.entries(e.M).reduce(
                  (e, [t, r]) => ((e[t] = lr(r)), e),
                  {}
                )
              }
            : void 0 !== e.L
            ? { L: e.L.map(e => lr(e)) }
            : void 0 !== e.NULL
            ? { NULL: e.NULL }
            : void 0 !== e.BOOL
            ? { BOOL: e.BOOL }
            : void 0 !== e.$unknown
            ? { [e.$unknown[0]]: 'UNKNOWN' }
            : void 0,
        dr = e => ({
          ...e,
          ...(e.ItemCollectionKey && {
            ItemCollectionKey: Object.entries(e.ItemCollectionKey).reduce(
              (e, [t, r]) => ((e[t] = lr(r)), e),
              {}
            )
          })
        }),
        fr = e => ({
          ...e,
          ...(e.Statements && {
            Statements: e.Statements.map(e =>
              (e => ({
                ...e,
                ...(e.Parameters && {
                  Parameters: e.Parameters.map(e => lr(e))
                })
              }))(e)
            )
          })
        }),
        pr = e => ({
          ...e,
          ...(e.Responses && {
            Responses: e.Responses.map(e =>
              (e => ({
                ...e,
                ...(e.Item && {
                  Item: Object.entries(e.Item).reduce(
                    (e, [t, r]) => ((e[t] = lr(r)), e),
                    {}
                  )
                })
              }))(e)
            )
          })
        }),
        hr = e => ({
          ...e,
          ...(e.Value && { Value: lr(e.Value) }),
          ...(e.AttributeValueList && {
            AttributeValueList: e.AttributeValueList.map(e => lr(e))
          })
        }),
        yr = e => ({
          ...e,
          ...(e.Attributes && {
            Attributes: Object.entries(e.Attributes).reduce(
              (e, [t, r]) => ((e[t] = lr(r)), e),
              {}
            )
          }),
          ...(e.ItemCollectionMetrics && {
            ItemCollectionMetrics: dr(e.ItemCollectionMetrics)
          })
        }),
        mr = e => ({
          ...e,
          ...(e.Attributes && {
            Attributes: Object.entries(e.Attributes).reduce(
              (e, [t, r]) => ((e[t] = lr(r)), e),
              {}
            )
          }),
          ...(e.ItemCollectionMetrics && {
            ItemCollectionMetrics: dr(e.ItemCollectionMetrics)
          })
        }),
        gr = e => ({
          ...e,
          ...(e.Items && {
            Items: e.Items.map(e =>
              Object.entries(e).reduce((e, [t, r]) => ((e[t] = lr(r)), e), {})
            )
          }),
          ...(e.LastEvaluatedKey && {
            LastEvaluatedKey: Object.entries(e.LastEvaluatedKey).reduce(
              (e, [t, r]) => ((e[t] = lr(r)), e),
              {}
            )
          })
        }),
        br = e => ({
          ...e,
          ...(e.ScanFilter && {
            ScanFilter: Object.entries(e.ScanFilter).reduce(
              (e, [t, r]) => (
                (e[t] = (e => ({
                  ...e,
                  ...(e.AttributeValueList && {
                    AttributeValueList: e.AttributeValueList.map(e => lr(e))
                  })
                }))(r)),
                e
              ),
              {}
            )
          }),
          ...(e.ExclusiveStartKey && {
            ExclusiveStartKey: Object.entries(e.ExclusiveStartKey).reduce(
              (e, [t, r]) => ((e[t] = lr(r)), e),
              {}
            )
          }),
          ...(e.ExpressionAttributeValues && {
            ExpressionAttributeValues: Object.entries(
              e.ExpressionAttributeValues
            ).reduce((e, [t, r]) => ((e[t] = lr(r)), e), {})
          })
        }),
        wr = e => ({
          ...e,
          ...(e.Key && {
            Key: Object.entries(e.Key).reduce(
              (e, [t, r]) => ((e[t] = lr(r)), e),
              {}
            )
          }),
          ...(e.Expected && {
            Expected: Object.entries(e.Expected).reduce(
              (e, [t, r]) => ((e[t] = hr(r)), e),
              {}
            )
          }),
          ...(e.ExpressionAttributeValues && {
            ExpressionAttributeValues: Object.entries(
              e.ExpressionAttributeValues
            ).reduce((e, [t, r]) => ((e[t] = lr(r)), e), {})
          })
        }),
        vr = e => ({
          ...e,
          ...(e.Item && {
            Item: Object.entries(e.Item).reduce(
              (e, [t, r]) => ((e[t] = lr(r)), e),
              {}
            )
          }),
          ...(e.Expected && {
            Expected: Object.entries(e.Expected).reduce(
              (e, [t, r]) => ((e[t] = hr(r)), e),
              {}
            )
          }),
          ...(e.ExpressionAttributeValues && {
            ExpressionAttributeValues: Object.entries(
              e.ExpressionAttributeValues
            ).reduce((e, [t, r]) => ((e[t] = lr(r)), e), {})
          })
        }),
        Sr = async (e, t) => {
          const r = e.body,
            n = Jr(r, t),
            i = new ar({ $metadata: vn(e), ...n })
          return dt(i, r)
        },
        Er = async (e, t) => {
          const r = e.body,
            n = tn(r, t),
            i = new er({ $metadata: vn(e), ...n })
          return dt(i, r)
        },
        Ar = async (e, t) => {
          const r = e.body,
            n = rn(r, t),
            i = new rr({ $metadata: vn(e), ...n })
          return dt(i, r)
        },
        _r = async (e, t) => {
          const r = e.body,
            n = sn(r, t),
            i = new or({ $metadata: vn(e), ...n })
          return dt(i, r)
        },
        Or = async (e, t) => {
          const r = e.body,
            n = hn(r, t),
            i = new nr({ $metadata: vn(e), ...n })
          return dt(i, r)
        },
        Ir = async (e, t) => {
          const r = e.body,
            n = yn(r, t),
            i = new tr({ $metadata: vn(e), ...n })
          return dt(i, r)
        },
        Cr = async (e, t) => {
          const r = e.body,
            n = mn(r, t),
            i = new ir({ $metadata: vn(e), ...n })
          return dt(i, r)
        },
        Pr = async (e, t) => {
          const r = e.body,
            n = wn(r, t),
            i = new sr({ $metadata: vn(e), ...n })
          return dt(i, r)
        },
        Nr = (e, t) => e.filter(e => null != e).map(e => e),
        Tr = (e, t) =>
          Xt.visit(e, {
            B: e => ({ B: t.base64Encoder(e) }),
            BOOL: e => ({ BOOL: e }),
            BS: e => ({ BS: Mr(e, t) }),
            L: e => ({ L: jr(e, t) }),
            M: e => ({ M: Ur(e, t) }),
            N: e => ({ N: e }),
            NS: e => ({ NS: $r(e, t) }),
            NULL: e => ({ NULL: e }),
            S: e => ({ S: e }),
            SS: e => ({ SS: qr(e, t) }),
            _: (e, t) => ({ name: t })
          }),
        Rr = (e, t) => e.filter(e => null != e).map(e => Tr(e, t)),
        Mr = (e, t) => e.filter(e => null != e).map(e => t.base64Encoder(e)),
        xr = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (null === n || (e[r] = Lr(n, t)), e),
            {}
          ),
        Lr = (e, t) => ({
          ...(null != e.AttributeValueList && {
            AttributeValueList: Rr(e.AttributeValueList, t)
          }),
          ...(null != e.ComparisonOperator && {
            ComparisonOperator: e.ComparisonOperator
          }),
          ...(null != e.Exists && { Exists: e.Exists }),
          ...(null != e.Value && { Value: Tr(e.Value, t) })
        }),
        Dr = (e, t) =>
          Object.entries(e).reduce(
            (e, [t, r]) => (null === r || (e[t] = r), e),
            {}
          ),
        kr = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (null === n || (e[r] = Tr(n, t)), e),
            {}
          ),
        Br = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (
              null === n ||
                (e[r] = ((e, t) => ({
                  ...(null != e.AttributeValueList && {
                    AttributeValueList: Rr(e.AttributeValueList, t)
                  }),
                  ...(null != e.ComparisonOperator && {
                    ComparisonOperator: e.ComparisonOperator
                  })
                }))(n, t)),
              e
            ),
            {}
          ),
        Fr = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (null === n || (e[r] = Tr(n, t)), e),
            {}
          ),
        jr = (e, t) => e.filter(e => null != e).map(e => Tr(e, t)),
        Ur = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (null === n || (e[r] = Tr(n, t)), e),
            {}
          ),
        $r = (e, t) => e.filter(e => null != e).map(e => e),
        Vr = (e, t) =>
          e
            .filter(e => null != e)
            .map(e =>
              ((e, t) => ({
                ...(null != e.ConsistentRead && {
                  ConsistentRead: e.ConsistentRead
                }),
                ...(null != e.Parameters && {
                  Parameters: Gr(e.Parameters, t)
                }),
                ...(null != e.Statement && { Statement: e.Statement })
              }))(e, t)
            ),
        Gr = (e, t) => e.filter(e => null != e).map(e => Tr(e, t)),
        zr = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (null === n || (e[r] = Tr(n, t)), e),
            {}
          ),
        qr = (e, t) => e.filter(e => null != e).map(e => e),
        Hr = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (null === n || (e[r] = Kr(ot(n), t)), e),
            {}
          ),
        Kr = (e, t) =>
          null != e.B
            ? { B: t.base64Decoder(e.B) }
            : void 0 !== Xe(e.BOOL)
            ? { BOOL: Xe(e.BOOL) }
            : null != e.BS
            ? { BS: Yr(e.BS, t) }
            : null != e.L
            ? { L: ln(e.L, t) }
            : null != e.M
            ? { M: dn(e.M, t) }
            : void 0 !== it(e.N)
            ? { N: it(e.N) }
            : null != e.NS
            ? { NS: fn(e.NS, t) }
            : void 0 !== Xe(e.NULL)
            ? { NULL: Xe(e.NULL) }
            : void 0 !== it(e.S)
            ? { S: it(e.S) }
            : null != e.SS
            ? { SS: bn(e.SS, t) }
            : { $unknown: Object.entries(e)[0] },
        Wr = (e, t) => ({ Code: it(e.Code), Message: it(e.Message) }),
        Yr = (e, t) => {
          const r = (e || [])
            .filter(e => null != e)
            .map(e => (null === e ? null : t.base64Decoder(e)))
          return r
        },
        Zr = (e, t) => ({
          CapacityUnits: at(e.CapacityUnits),
          ReadCapacityUnits: at(e.ReadCapacityUnits),
          WriteCapacityUnits: at(e.WriteCapacityUnits)
        }),
        Jr = (e, t) => ({ message: it(e.message) }),
        Qr = (e, t) => ({
          CapacityUnits: at(e.CapacityUnits),
          GlobalSecondaryIndexes:
            null != e.GlobalSecondaryIndexes
              ? gn(e.GlobalSecondaryIndexes, t)
              : void 0,
          LocalSecondaryIndexes:
            null != e.LocalSecondaryIndexes
              ? gn(e.LocalSecondaryIndexes, t)
              : void 0,
          ReadCapacityUnits: at(e.ReadCapacityUnits),
          Table: null != e.Table ? Zr(e.Table) : void 0,
          TableName: it(e.TableName),
          WriteCapacityUnits: at(e.WriteCapacityUnits)
        }),
        Xr = (e, t) => {
          const r = (e || [])
            .filter(e => null != e)
            .map(e => (null === e ? null : Qr(e, t)))
          return r
        },
        en = (e, t) => {
          const r = (e || [])
            .filter(e => null != e)
            .map(e =>
              null === e
                ? null
                : ((e, t) => ({
                    Address: it(e.Address),
                    CachePeriodInMinutes: et(e.CachePeriodInMinutes)
                  }))(e)
            )
          return r
        },
        tn = (e, t) => ({ message: it(e.message) }),
        rn = (e, t) => ({ Message: it(e.Message) }),
        nn = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (null === n || (e[r] = Kr(ot(n), t)), e),
            {}
          ),
        on = (e, t) => ({
          ItemCollectionKey:
            null != e.ItemCollectionKey ? nn(e.ItemCollectionKey, t) : void 0,
          SizeEstimateRangeGB:
            null != e.SizeEstimateRangeGB
              ? an(e.SizeEstimateRangeGB, t)
              : void 0
        }),
        an = (e, t) => {
          const r = (e || [])
            .filter(e => null != e)
            .map(e => (null === e ? null : at(e)))
          return r
        },
        sn = (e, t) => ({ message: it(e.message) }),
        un = (e, t) => {
          const r = (e || [])
            .filter(e => null != e)
            .map(e => (null === e ? null : Hr(e, t)))
          return r
        },
        cn = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (null === n || (e[r] = Kr(ot(n), t)), e),
            {}
          ),
        ln = (e, t) => {
          const r = (e || [])
            .filter(e => null != e)
            .map(e => (null === e ? null : Kr(ot(e), t)))
          return r
        },
        dn = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => (null === n || (e[r] = Kr(ot(n), t)), e),
            {}
          ),
        fn = (e, t) => {
          const r = (e || [])
            .filter(e => null != e)
            .map(e => (null === e ? null : it(e)))
          return r
        },
        pn = (e, t) => {
          const r = (e || [])
            .filter(e => null != e)
            .map(e =>
              null === e
                ? null
                : ((e, t) => ({
                    Error: null != e.Error ? Wr(e.Error) : void 0,
                    Item: null != e.Item ? Hr(e.Item, t) : void 0,
                    TableName: it(e.TableName)
                  }))(e, t)
            )
          return r
        },
        hn = (e, t) => ({ message: it(e.message) }),
        yn = (e, t) => ({ message: it(e.message) }),
        mn = (e, t) => ({ message: it(e.message) }),
        gn = (e, t) =>
          Object.entries(e).reduce(
            (e, [t, r]) => (null === r || (e[t] = Zr(r)), e),
            {}
          ),
        bn = (e, t) => {
          const r = (e || [])
            .filter(e => null != e)
            .map(e => (null === e ? null : it(e)))
          return r
        },
        wn = (e, t) => ({ message: it(e.message) }),
        vn = e => ({
          httpStatusCode: e.statusCode,
          requestId:
            e.headers['x-amzn-requestid'] ??
            e.headers['x-amzn-request-id'] ??
            e.headers['x-amz-request-id'],
          extendedRequestId: e.headers['x-amz-id-2'],
          cfId: e.headers['x-amz-cf-id']
        }),
        Sn = async (e, t, r, n, i) => {
          const {
              hostname: o,
              protocol: a = 'https',
              port: s,
              path: c
            } = await e.endpoint(),
            l = {
              protocol: a,
              hostname: o,
              port: s,
              method: 'POST',
              path: c.endsWith('/') ? c.slice(0, -1) + r : c + r,
              headers: t
            }
          return (
            void 0 !== n && (l.hostname = n),
            void 0 !== i && (l.body = i),
            new u(l)
          )
        },
        En = (e, t) =>
          ((e, t) =>
            ((e = new Uint8Array(), t) =>
              e instanceof Uint8Array
                ? Promise.resolve(e)
                : t.streamCollector(e) || Promise.resolve(new Uint8Array()))(
              e,
              t
            ).then(e => t.utf8Encoder(e)))(e, t).then(e =>
            e.length ? JSON.parse(e) : {}
          ),
        An = async (e, t) => {
          const r = await En(e, t)
          return (r.message = r.message ?? r.Message), r
        },
        _n = (e, t) => {
          const r = e => {
              let t = e
              return (
                'number' == typeof t && (t = t.toString()),
                t.indexOf(',') >= 0 && (t = t.split(',')[0]),
                t.indexOf(':') >= 0 && (t = t.split(':')[0]),
                t.indexOf('#') >= 0 && (t = t.split('#')[1]),
                t
              )
            },
            n =
              ((i = e.headers),
              'x-amzn-errortype',
              Object.keys(i).find(
                e => e.toLowerCase() === 'x-amzn-errortype'.toLowerCase()
              ))
          var i
          return void 0 !== n
            ? r(e.headers[n])
            : void 0 !== t.code
            ? r(t.code)
            : void 0 !== t.__type
            ? r(t.__type)
            : void 0
        }
      class On extends Qe {
        constructor (e) {
          super(), (this.input = e)
        }
        static getEndpointParameterInstructions () {
          return {
            UseFIPS: { type: 'builtInParams', name: 'useFipsEndpoint' },
            Endpoint: { type: 'builtInParams', name: 'endpoint' },
            Region: { type: 'builtInParams', name: 'region' },
            UseDualStack: {
              type: 'builtInParams',
              name: 'useDualstackEndpoint'
            }
          }
        }
        resolveMiddleware (e, t, r) {
          this.middlewareStack.use(m(t, this.serialize, this.deserialize)),
            this.middlewareStack.use(
              A(t, On.getEndpointParameterInstructions())
            )
          const n = e.concat(this.middlewareStack),
            { logger: i } = t,
            o = {
              logger: i,
              clientName: 'DynamoDBClient',
              commandName: 'DescribeEndpointsCommand',
              inputFilterSensitiveLog: ur,
              outputFilterSensitiveLog: cr
            },
            { requestHandler: a } = t
          return n.resolve(e => a.handle(e.request, r || {}), o)
        }
        serialize (e, t) {
          return (async (e, t) => {
            let r
            return (
              (r = JSON.stringify({})),
              Sn(
                t,
                {
                  'content-type': 'application/x-amz-json-1.0',
                  'x-amz-target': 'DynamoDB_20120810.DescribeEndpoints'
                },
                '/',
                void 0,
                r
              )
            )
          })(0, t)
        }
        deserialize (e, t) {
          return (async (e, t) => {
            if (e.statusCode >= 300)
              return (async (e, t) => {
                const r = { ...e, body: await An(e.body, t) },
                  n = _n(e, r.body),
                  i = r.body
                ft({
                  output: e,
                  parsedBody: i,
                  exceptionCtor: mt,
                  errorCode: n
                })
              })(e, t)
            let r = {}
            r = ((e, t) => ({
              Endpoints: null != e.Endpoints ? en(e.Endpoints, t) : void 0
            }))(await En(e.body, t), t)
            const n = { $metadata: vn(e), ...r }
            return Promise.resolve(n)
          })(e, t)
        }
      }
      var In = r(898)
      function Cn (e = 0) {
        return new Promise((t, r) => {
          e &&
            setTimeout(() => {
              const t = new Error(`Request did not complete within ${e} ms`)
              ;(t.name = 'TimeoutError'), r(t)
            }, e)
        })
      }
      class Pn {
        constructor (e) {
          'function' == typeof e
            ? (this.configProvider = e().then(e => e || {}))
            : ((this.config = e ?? {}),
              (this.configProvider = Promise.resolve(this.config)))
        }
        destroy () {}
        async handle (e, { abortSignal: t } = {}) {
          this.config || (this.config = await this.configProvider)
          const r = this.config.requestTimeout
          if (t?.aborted) {
            const e = new Error('Request aborted')
            return (e.name = 'AbortError'), Promise.reject(e)
          }
          let n = e.path
          if (e.query) {
            const t = (function (e) {
              const t = []
              for (let r of Object.keys(e).sort()) {
                const n = e[r]
                if (((r = Ne(r)), Array.isArray(n)))
                  for (let e = 0, i = n.length; e < i; e++)
                    t.push(`${r}=${Ne(n[e])}`)
                else {
                  let e = r
                  ;(n || 'string' == typeof n) && (e += `=${Ne(n)}`), t.push(e)
                }
              }
              return t.join('&')
            })(e.query)
            t && (n += `?${t}`)
          }
          const { port: i, method: o } = e,
            a = `${e.protocol}//${e.hostname}${i ? `:${i}` : ''}${n}`,
            s = {
              body: 'GET' === o || 'HEAD' === o ? void 0 : e.body,
              headers: new Headers(e.headers),
              method: o
            }
          'undefined' != typeof AbortController && (s.signal = t)
          const u = new Request(a, s),
            l = [
              fetch(u).then(e => {
                const t = e.headers,
                  r = {}
                for (const e of t.entries()) r[e[0]] = e[1]
                return void 0 !== e.body
                  ? {
                      response: new c({
                        headers: r,
                        statusCode: e.status,
                        body: e.body
                      })
                    }
                  : e
                      .blob()
                      .then(t => ({
                        response: new c({
                          headers: r,
                          statusCode: e.status,
                          body: t
                        })
                      }))
              }),
              Cn(r)
            ]
          return (
            t &&
              l.push(
                new Promise((e, r) => {
                  t.onabort = () => {
                    const e = new Error('Request aborted')
                    ;(e.name = 'AbortError'), r(e)
                  }
                })
              ),
            Promise.race(l)
          )
        }
      }
      const Nn = {},
        Tn = new Array(64)
      for (
        let e = 0, t = 'A'.charCodeAt(0), r = 'Z'.charCodeAt(0);
        e + t <= r;
        e++
      ) {
        const r = String.fromCharCode(e + t)
        ;(Nn[r] = e), (Tn[e] = r)
      }
      for (
        let e = 0, t = 'a'.charCodeAt(0), r = 'z'.charCodeAt(0);
        e + t <= r;
        e++
      ) {
        const r = String.fromCharCode(e + t),
          n = e + 26
        ;(Nn[r] = n), (Tn[n] = r)
      }
      for (let e = 0; e < 10; e++) {
        Nn[e.toString(10)] = e + 52
        const t = e.toString(10),
          r = e + 52
        ;(Nn[t] = r), (Tn[r] = t)
      }
      ;(Nn['+'] = 62), (Tn[62] = '+'), (Nn['/'] = 63), (Tn[63] = '/')
      const Rn = 6,
        Mn = 8,
        xn = 63,
        Ln = e => {
          let t = (e.length / 4) * 3
          '==' === e.slice(-2) ? (t -= 2) : '=' === e.slice(-1) && t--
          const r = new ArrayBuffer(t),
            n = new DataView(r)
          for (let t = 0; t < e.length; t += 4) {
            let r = 0,
              i = 0
            for (let n = t, o = t + 3; n <= o; n++)
              if ('=' !== e[n]) {
                if (!(e[n] in Nn))
                  throw new TypeError(
                    `Invalid character ${e[n]} in base64 string.`
                  )
                ;(r |= Nn[e[n]] << ((o - n) * Rn)), (i += Rn)
              } else r >>= Rn
            const o = (t / 4) * 3
            r >>= i % Mn
            const a = Math.floor(i / Mn)
            for (let e = 0; e < a; e++) {
              const t = (a - e - 1) * Mn
              n.setUint8(o + e, (r & (255 << t)) >> t)
            }
          }
          return new Uint8Array(r)
        }
      function Dn (e) {
        let t = ''
        for (let r = 0; r < e.length; r += 3) {
          let n = 0,
            i = 0
          for (let t = r, o = Math.min(r + 3, e.length); t < o; t++)
            (n |= e[t] << ((o - t - 1) * Mn)), (i += Mn)
          const o = Math.ceil(i / Rn)
          n <<= o * Rn - i
          for (let e = 1; e <= o; e++) {
            const r = (o - e) * Rn
            t += Tn[(n & (xn << r)) >> r]
          }
          t += '=='.slice(0, 4 - o)
        }
        return t
      }
      const kn = e =>
          'function' == typeof Blob && e instanceof Blob
            ? (async function (e) {
                const t = await (function (e) {
                    return new Promise((t, r) => {
                      const n = new FileReader()
                      ;(n.onloadend = () => {
                        if (2 !== n.readyState)
                          return r(new Error('Reader aborted too early'))
                        const e = n.result ?? '',
                          i = e.indexOf(','),
                          o = i > -1 ? i + 1 : e.length
                        t(e.substring(o))
                      }),
                        (n.onabort = () => r(new Error('Read aborted'))),
                        (n.onerror = () => r(n.error)),
                        n.readAsDataURL(e)
                    })
                  })(e),
                  r = Ln(t)
                return new Uint8Array(r)
              })(e)
            : (async function (e) {
                let t = new Uint8Array(0)
                const r = e.getReader()
                let n = !1
                for (; !n; ) {
                  const { done: e, value: i } = await r.read()
                  if (i) {
                    const e = t
                    ;(t = new Uint8Array(e.length + i.length)),
                      t.set(e),
                      t.set(i, e.length)
                  }
                  n = e
                }
                return t
              })(e),
        Bn = e => {
          if ('string' == typeof e) {
            let t = e.length
            for (let r = t - 1; r >= 0; r--) {
              const n = e.charCodeAt(r)
              n > 127 && n <= 2047 ? t++ : n > 2047 && n <= 65535 && (t += 2),
                n >= 56320 && n <= 57343 && r--
            }
            return t
          }
          if ('number' == typeof e.byteLength) return e.byteLength
          if ('number' == typeof e.size) return e.size
          throw new Error(`Body Length computation failed for ${e}`)
        }
      var Fn = r(206),
        jn = r.n(Fn)
      const Un =
          ({ serviceId: e, clientVersion: t }) =>
          async () => {
            const r =
                'undefined' != typeof window && window?.navigator?.userAgent
                  ? jn().parse(window.navigator.userAgent)
                  : void 0,
              n = [
                ['aws-sdk-js', t],
                [`os/${r?.os?.name || 'other'}`, r?.os?.version],
                ['lang/js'],
                [
                  'md/browser',
                  `${r?.browser?.name ?? 'unknown'}_${
                    r?.browser?.version ?? 'unknown'
                  }`
                ]
              ]
            return e && n.push([`api/${e}`, t]), n
          },
        $n = e => new TextDecoder('utf-8').decode(e),
        Vn = JSON.parse(
          '{"partitions":[{"id":"aws","outputs":{"dnsSuffix":"amazonaws.com","dualStackDnsSuffix":"api.aws","name":"aws","supportsDualStack":true,"supportsFIPS":true},"regionRegex":"^(us|eu|ap|sa|ca|me|af)\\\\-\\\\w+\\\\-\\\\d+$","regions":{"af-south-1":{"description":"Africa (Cape Town)"},"ap-east-1":{"description":"Asia Pacific (Hong Kong)"},"ap-northeast-1":{"description":"Asia Pacific (Tokyo)"},"ap-northeast-2":{"description":"Asia Pacific (Seoul)"},"ap-northeast-3":{"description":"Asia Pacific (Osaka)"},"ap-south-1":{"description":"Asia Pacific (Mumbai)"},"ap-south-2":{"description":"Asia Pacific (Hyderabad)"},"ap-southeast-1":{"description":"Asia Pacific (Singapore)"},"ap-southeast-2":{"description":"Asia Pacific (Sydney)"},"ap-southeast-3":{"description":"Asia Pacific (Jakarta)"},"ap-southeast-4":{"description":"Asia Pacific (Melbourne)"},"aws-global":{"description":"AWS Standard global region"},"ca-central-1":{"description":"Canada (Central)"},"eu-central-1":{"description":"Europe (Frankfurt)"},"eu-central-2":{"description":"Europe (Zurich)"},"eu-north-1":{"description":"Europe (Stockholm)"},"eu-south-1":{"description":"Europe (Milan)"},"eu-south-2":{"description":"Europe (Spain)"},"eu-west-1":{"description":"Europe (Ireland)"},"eu-west-2":{"description":"Europe (London)"},"eu-west-3":{"description":"Europe (Paris)"},"me-central-1":{"description":"Middle East (UAE)"},"me-south-1":{"description":"Middle East (Bahrain)"},"sa-east-1":{"description":"South America (Sao Paulo)"},"us-east-1":{"description":"US East (N. Virginia)"},"us-east-2":{"description":"US East (Ohio)"},"us-west-1":{"description":"US West (N. California)"},"us-west-2":{"description":"US West (Oregon)"}}},{"id":"aws-cn","outputs":{"dnsSuffix":"amazonaws.com.cn","dualStackDnsSuffix":"api.amazonwebservices.com.cn","name":"aws-cn","supportsDualStack":true,"supportsFIPS":true},"regionRegex":"^cn\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-cn-global":{"description":"AWS China global region"},"cn-north-1":{"description":"China (Beijing)"},"cn-northwest-1":{"description":"China (Ningxia)"}}},{"id":"aws-us-gov","outputs":{"dnsSuffix":"amazonaws.com","dualStackDnsSuffix":"api.aws","name":"aws-us-gov","supportsDualStack":true,"supportsFIPS":true},"regionRegex":"^us\\\\-gov\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-us-gov-global":{"description":"AWS GovCloud (US) global region"},"us-gov-east-1":{"description":"AWS GovCloud (US-East)"},"us-gov-west-1":{"description":"AWS GovCloud (US-West)"}}},{"id":"aws-iso","outputs":{"dnsSuffix":"c2s.ic.gov","dualStackDnsSuffix":"c2s.ic.gov","name":"aws-iso","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^us\\\\-iso\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-iso-global":{"description":"AWS ISO (US) global region"},"us-iso-east-1":{"description":"US ISO East"},"us-iso-west-1":{"description":"US ISO WEST"}}},{"id":"aws-iso-b","outputs":{"dnsSuffix":"sc2s.sgov.gov","dualStackDnsSuffix":"sc2s.sgov.gov","name":"aws-iso-b","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^us\\\\-isob\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-iso-b-global":{"description":"AWS ISOB (US) global region"},"us-isob-east-1":{"description":"US ISOB East (Ohio)"}}}],"version":"1.1"}'
        ),
        { partitions: Gn } = Vn,
        zn = Gn.find(e => 'aws' === e.id),
        qn = e => {
          for (const t of Gn) {
            const { regions: r, outputs: n } = t
            for (const [t, i] of Object.entries(r))
              if (t === e) return { ...n, ...i }
          }
          for (const t of Gn) {
            const { regionRegex: r, outputs: n } = t
            if (new RegExp(r).test(e)) return { ...n }
          }
          if (!zn)
            throw new Error(
              "Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist."
            )
          return { ...zn.outputs }
        },
        Hn = 'endpoints'
      function Kn (e) {
        return 'object' != typeof e || null == e
          ? e
          : 'ref' in e
          ? `$${Kn(e.ref)}`
          : 'fn' in e
          ? `${e.fn}(${(e.argv || []).map(Kn).join(', ')})`
          : JSON.stringify(e, null, 2)
      }
      class Wn extends Error {
        constructor (e) {
          super(e), (this.name = 'EndpointError')
        }
      }
      const Yn = new RegExp(
          '^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$'
        ),
        Zn = e => Yn.test(e) || (e.startsWith('[') && e.endsWith(']')),
        Jn = new RegExp('^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$'),
        Qn = (e, t = !1) => {
          if (!t) return Jn.test(e)
          const r = e.split('.')
          for (const e of r) if (!Qn(e)) return !1
          return !0
        },
        Xn = (e, t = !1) => {
          if (t) {
            for (const t of e.split('.')) if (!Xn(t)) return !1
            return !0
          }
          return !(
            !Qn(e) ||
            e.length < 3 ||
            e.length > 63 ||
            e !== e.toLowerCase() ||
            Zn(e)
          )
        },
        ei = e => {
          const t = e.split(':')
          if (t.length < 6) return null
          const [r, n, i, o, a, ...s] = t
          return 'arn' !== r || '' === n || '' === i || '' === s[0]
            ? null
            : {
                partition: n,
                service: i,
                region: o,
                accountId: a,
                resourceId: s[0].includes('/') ? s[0].split('/') : s
              }
        },
        ti = (e, t) => e === t,
        ri = (e, t) =>
          (e => {
            const t = e.split('.'),
              r = []
            for (const n of t) {
              const t = n.indexOf('[')
              if (-1 !== t) {
                if (n.indexOf(']') !== n.length - 1)
                  throw new Wn(`Path: '${e}' does not end with ']'`)
                const i = n.slice(t + 1, -1)
                if (Number.isNaN(parseInt(i)))
                  throw new Wn(`Invalid array index: '${i}' in path: '${e}'`)
                0 !== t && r.push(n.slice(0, t)), r.push(i)
              } else r.push(n)
            }
            return r
          })(t).reduce((r, n) => {
            if ('object' != typeof r)
              throw new Wn(
                `Index '${n}' in '${t}' not found in '${JSON.stringify(e)}'`
              )
            return Array.isArray(r) ? r[parseInt(n)] : r[n]
          }, e),
        ni = e => null != e,
        ii = e => !e
      var oi, ai, si
      !(function (e) {
        ;(e.HEADER = 'header'), (e.QUERY = 'query')
      })(oi || (oi = {})),
        (function (e) {
          ;(e.AAAA = 'AAAA'), (e.A = 'A')
        })(ai || (ai = {})),
        (function (e) {
          ;(e.HTTP = 'http'), (e.HTTPS = 'https')
        })(si || (si = {}))
      const ui = { [si.HTTP]: 80, [si.HTTPS]: 443 },
        ci = e => {
          const t = (() => {
            try {
              if (e instanceof URL) return e
              if ('object' == typeof e && 'hostname' in e) {
                const {
                    hostname: t,
                    port: r,
                    protocol: n = '',
                    path: i = '',
                    query: o = {}
                  } = e,
                  a = new URL(`${n}//${t}${r ? `:${r}` : ''}${i}`)
                return (
                  (a.search = Object.entries(o)
                    .map(([e, t]) => `${e}=${t}`)
                    .join('&')),
                  a
                )
              }
              return new URL(e)
            } catch (e) {
              return null
            }
          })()
          if (!t)
            return (
              console.error(
                `Unable to parse ${JSON.stringify(e)} as a whatwg URL.`
              ),
              null
            )
          const r = t.href,
            { host: n, hostname: i, pathname: o, protocol: a, search: s } = t
          if (s) return null
          const u = a.slice(0, -1)
          if (!Object.values(si).includes(u)) return null
          const c = Zn(i)
          return {
            scheme: u,
            authority: `${n}${
              r.includes(`${n}:${ui[u]}`) ||
              ('string' == typeof e && e.includes(`${n}:${ui[u]}`))
                ? `:${ui[u]}`
                : ''
            }`,
            path: o,
            normalizedPath: o.endsWith('/') ? o : `${o}/`,
            isIp: c
          }
        },
        li = (e, t) => e === t,
        di = (e, t, r, n) =>
          t >= r || e.length < r
            ? null
            : n
            ? e.substring(e.length - r, e.length - t)
            : e.substring(t, r),
        fi = e =>
          encodeURIComponent(e).replace(
            /[!*'()]/g,
            e => `%${e.charCodeAt(0).toString(16).toUpperCase()}`
          ),
        pi = (e, t) => {
          const r = [],
            n = { ...t.endpointParams, ...t.referenceRecord }
          let i = 0
          for (; i < e.length; ) {
            const t = e.indexOf('{', i)
            if (-1 === t) {
              r.push(e.slice(i))
              break
            }
            r.push(e.slice(i, t))
            const o = e.indexOf('}', t)
            if (-1 === o) {
              r.push(e.slice(t))
              break
            }
            '{' === e[t + 1] &&
              '}' === e[o + 1] &&
              (r.push(e.slice(t + 1, o)), (i = o + 2))
            const a = e.substring(t + 1, o)
            if (a.includes('#')) {
              const [e, t] = a.split('#')
              r.push(ri(n[e], t))
            } else r.push(n[a])
            i = o + 1
          }
          return r.join('')
        },
        hi = (e, t, r) => {
          if ('string' == typeof e) return pi(e, r)
          if (e.fn) return yi(e, r)
          if (e.ref)
            return (({ ref: e }, t) =>
              ({ ...t.endpointParams, ...t.referenceRecord }[e]))(e, r)
          throw new Wn(
            `'${t}': ${String(e)} is not a string, function or reference.`
          )
        },
        yi = ({ fn: e, argv: t }, r) => {
          const i = t.map(e =>
            ['boolean', 'number'].includes(typeof e) ? e : hi(e, 'arg', r)
          )
          return e.split('.').reduce((e, t) => e[t], n)(...i)
        },
        mi = ({ assign: e, ...t }, r) => {
          if (e && e in r.referenceRecord)
            throw new Wn(`'${e}' is already defined in Reference Record.`)
          const n = yi(t, r)
          return (
            r.logger?.debug?.(Hn, `evaluateCondition: ${Kn(t)} = ${Kn(n)}`),
            {
              result: '' === n || !!n,
              ...(null != e && { toAssign: { name: e, value: n } })
            }
          )
        },
        gi = (e = [], t) => {
          const r = {}
          for (const n of e) {
            const { result: e, toAssign: i } = mi(n, {
              ...t,
              referenceRecord: { ...t.referenceRecord, ...r }
            })
            if (!e) return { result: e }
            i &&
              ((r[i.name] = i.value),
              t.logger?.debug?.(Hn, `assign: ${i.name} := ${Kn(i.value)}`))
          }
          return { result: !0, referenceRecord: r }
        },
        bi = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => ({
              ...e,
              [r]: n.map(e => {
                const n = hi(e, 'Header value entry', t)
                if ('string' != typeof n)
                  throw new Wn(`Header '${r}' value '${n}' is not a string`)
                return n
              })
            }),
            {}
          ),
        wi = (e, t) => {
          if (Array.isArray(e)) return e.map(e => wi(e, t))
          switch (typeof e) {
            case 'string':
              return pi(e, t)
            case 'object':
              if (null === e) throw new Wn(`Unexpected endpoint property: ${e}`)
              return vi(e, t)
            case 'boolean':
              return e
            default:
              throw new Wn('Unexpected endpoint property type: ' + typeof e)
          }
        },
        vi = (e, t) =>
          Object.entries(e).reduce(
            (e, [r, n]) => ({ ...e, [r]: wi(n, t) }),
            {}
          ),
        Si = (e, t) => {
          const r = hi(e, 'Endpoint URL', t)
          if ('string' == typeof r)
            try {
              return new URL(r)
            } catch (e) {
              throw (console.error(`Failed to construct URL with ${r}`, e), e)
            }
          throw new Wn('Endpoint URL must be a string, got ' + typeof r)
        },
        Ei = (e, t) => {
          const { conditions: r, endpoint: n } = e,
            { result: i, referenceRecord: o } = gi(r, t)
          if (!i) return
          const a = { ...t, referenceRecord: { ...t.referenceRecord, ...o } },
            { url: s, properties: u, headers: c } = n
          return (
            t.logger?.debug?.(Hn, `Resolving endpoint from template: ${Kn(n)}`),
            {
              ...(null != c && { headers: bi(c, a) }),
              ...(null != u && { properties: vi(u, a) }),
              url: Si(s, a)
            }
          )
        },
        Ai = (e, t) => {
          const { conditions: r, error: n } = e,
            { result: i, referenceRecord: o } = gi(r, t)
          if (i)
            throw new Wn(
              hi(n, 'Error', {
                ...t,
                referenceRecord: { ...t.referenceRecord, ...o }
              })
            )
        },
        _i = (e, t) => {
          const { conditions: r, rules: n } = e,
            { result: i, referenceRecord: o } = gi(r, t)
          if (i)
            return Oi(n, {
              ...t,
              referenceRecord: { ...t.referenceRecord, ...o }
            })
        },
        Oi = (e, t) => {
          for (const r of e)
            if ('endpoint' === r.type) {
              const e = Ei(r, t)
              if (e) return e
            } else if ('error' === r.type) Ai(r, t)
            else {
              if ('tree' !== r.type) throw new Wn(`Unknown endpoint rule: ${r}`)
              {
                const e = _i(r, t)
                if (e) return e
              }
            }
          throw new Wn('Rules evaluation failed')
        },
        Ii = 'required',
        Ci = 'fn',
        Pi = 'argv',
        Ni = 'ref',
        Ti = 'isSet',
        Ri = 'tree',
        Mi = 'error',
        xi = 'endpoint',
        Li = 'PartitionResult',
        Di = 'getAttr',
        ki = 'stringEquals',
        Bi = { [Ii]: !1, type: 'String' },
        Fi = { [Ii]: !0, default: !1, type: 'Boolean' },
        ji = { [Ni]: 'Endpoint' },
        Ui = { [Ci]: 'booleanEquals', [Pi]: [{ [Ni]: 'UseFIPS' }, !0] },
        $i = { [Ci]: 'booleanEquals', [Pi]: [{ [Ni]: 'UseDualStack' }, !0] },
        Vi = {},
        Gi = { [Ni]: 'Region' },
        zi = {
          [Ci]: 'booleanEquals',
          [Pi]: [!0, { [Ci]: Di, [Pi]: [{ [Ni]: Li }, 'supportsFIPS'] }]
        },
        qi = { [Ni]: Li },
        Hi = {
          [Ci]: 'booleanEquals',
          [Pi]: [!0, { [Ci]: Di, [Pi]: [qi, 'supportsDualStack'] }]
        },
        Ki = [Ui],
        Wi = [$i],
        Yi = [Gi],
        Zi = {
          version: '1.0',
          parameters: {
            Region: Bi,
            UseDualStack: Fi,
            UseFIPS: Fi,
            Endpoint: Bi
          },
          rules: [
            {
              conditions: [{ [Ci]: Ti, [Pi]: [ji] }],
              type: Ri,
              rules: [
                {
                  conditions: Ki,
                  error:
                    'Invalid Configuration: FIPS and custom endpoint are not supported',
                  type: Mi
                },
                {
                  type: Ri,
                  rules: [
                    {
                      conditions: Wi,
                      error:
                        'Invalid Configuration: Dualstack and custom endpoint are not supported',
                      type: Mi
                    },
                    {
                      endpoint: { url: ji, properties: Vi, headers: Vi },
                      type: xi
                    }
                  ]
                }
              ]
            },
            {
              type: Ri,
              rules: [
                {
                  conditions: [{ [Ci]: Ti, [Pi]: Yi }],
                  type: Ri,
                  rules: [
                    {
                      conditions: [
                        { [Ci]: 'aws.partition', [Pi]: Yi, assign: Li }
                      ],
                      type: Ri,
                      rules: [
                        {
                          conditions: [Ui, $i],
                          type: Ri,
                          rules: [
                            {
                              conditions: [zi, Hi],
                              type: Ri,
                              rules: [
                                {
                                  type: Ri,
                                  rules: [
                                    {
                                      endpoint: {
                                        url: 'https://dynamodb-fips.{Region}.{PartitionResult#dualStackDnsSuffix}',
                                        properties: Vi,
                                        headers: Vi
                                      },
                                      type: xi
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              error:
                                'FIPS and DualStack are enabled, but this partition does not support one or both',
                              type: Mi
                            }
                          ]
                        },
                        {
                          conditions: Ki,
                          type: Ri,
                          rules: [
                            {
                              conditions: [zi],
                              type: Ri,
                              rules: [
                                {
                                  type: Ri,
                                  rules: [
                                    {
                                      conditions: [
                                        {
                                          [Ci]: ki,
                                          [Pi]: [
                                            'aws-us-gov',
                                            { [Ci]: Di, [Pi]: [qi, 'name'] }
                                          ]
                                        }
                                      ],
                                      endpoint: {
                                        url: 'https://dynamodb.{Region}.amazonaws.com',
                                        properties: Vi,
                                        headers: Vi
                                      },
                                      type: xi
                                    },
                                    {
                                      endpoint: {
                                        url: 'https://dynamodb-fips.{Region}.{PartitionResult#dnsSuffix}',
                                        properties: Vi,
                                        headers: Vi
                                      },
                                      type: xi
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              error:
                                'FIPS is enabled but this partition does not support FIPS',
                              type: Mi
                            }
                          ]
                        },
                        {
                          conditions: Wi,
                          type: Ri,
                          rules: [
                            {
                              conditions: [Hi],
                              type: Ri,
                              rules: [
                                {
                                  type: Ri,
                                  rules: [
                                    {
                                      endpoint: {
                                        url: 'https://dynamodb.{Region}.{PartitionResult#dualStackDnsSuffix}',
                                        properties: Vi,
                                        headers: Vi
                                      },
                                      type: xi
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              error:
                                'DualStack is enabled but this partition does not support DualStack',
                              type: Mi
                            }
                          ]
                        },
                        {
                          type: Ri,
                          rules: [
                            {
                              conditions: [{ [Ci]: ki, [Pi]: [Gi, 'local'] }],
                              endpoint: {
                                url: 'http://localhost:8000',
                                properties: {
                                  authSchemes: [
                                    {
                                      name: 'sigv4',
                                      signingName: 'dynamodb',
                                      signingRegion: 'us-east-1'
                                    }
                                  ]
                                },
                                headers: Vi
                              },
                              type: xi
                            },
                            {
                              endpoint: {
                                url: 'https://dynamodb.{Region}.{PartitionResult#dnsSuffix}',
                                properties: Vi,
                                headers: Vi
                              },
                              type: xi
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                { error: 'Invalid Configuration: Missing Region', type: Mi }
              ]
            }
          ]
        },
        Ji = (e, t = {}) =>
          ((e, t) => {
            const { endpointParams: r, logger: n } = t,
              { parameters: i, rules: o } = e
            t.logger?.debug?.(Hn, `Initial EndpointParams: ${Kn(r)}`)
            const a = Object.entries(i)
              .filter(([, e]) => null != e.default)
              .map(([e, t]) => [e, t.default])
            if (a.length > 0) for (const [e, t] of a) r[e] = r[e] ?? t
            const s = Object.entries(i)
              .filter(([, e]) => e.required)
              .map(([e]) => e)
            for (const e of s)
              if (null == r[e])
                throw new Wn(`Missing required parameter: '${e}'`)
            const u = Oi(o, {
              endpointParams: r,
              logger: n,
              referenceRecord: {}
            })
            if (t.endpointParams?.Endpoint)
              try {
                const e = new URL(t.endpointParams.Endpoint),
                  { protocol: r, port: n } = e
                ;(u.url.protocol = r), (u.url.port = n)
              } catch (e) {}
            return t.logger?.debug?.(Hn, `Resolved endpoint: ${Kn(u)}`), u
          })(Zi, { endpointParams: e, logger: t.logger }),
        Qi = ['in-region', 'cross-region', 'mobile', 'standard', 'legacy'],
        Xi = e => {
          const t = (({ defaultsMode: e } = {}) =>
              ne(async () => {
                const t = 'function' == typeof e ? await e() : e
                switch (t?.toLowerCase()) {
                  case 'auto':
                    return Promise.resolve(
                      (() => {
                        const e =
                            'undefined' != typeof window &&
                            window?.navigator?.userAgent
                              ? jn().parse(window.navigator.userAgent)
                              : void 0,
                          t = e?.platform?.type
                        return 'tablet' === t || 'mobile' === t
                      })()
                        ? 'mobile'
                        : 'standard'
                    )
                  case 'mobile':
                  case 'in-region':
                  case 'cross-region':
                  case 'standard':
                  case 'legacy':
                    return Promise.resolve(t?.toLocaleLowerCase())
                  case void 0:
                    return Promise.resolve('legacy')
                  default:
                    throw new Error(
                      `Invalid parameter for "defaultsMode", expect ${Qi.join(
                        ', '
                      )}, got ${t}`
                    )
                }
              }))(e),
            r = () => t().then(ht),
            n = (e => ({
              apiVersion: '2012-08-10',
              base64Decoder: e?.base64Decoder ?? Ln,
              base64Encoder: e?.base64Encoder ?? Dn,
              disableHostPrefix: e?.disableHostPrefix ?? !1,
              endpointProvider: e?.endpointProvider ?? Ji,
              logger: e?.logger ?? new Ke(),
              serviceId: e?.serviceId ?? 'DynamoDB',
              urlParser: e?.urlParser ?? O,
              utf8Decoder: e?.utf8Decoder ?? se,
              utf8Encoder: e?.utf8Encoder ?? $n
            }))(e)
          return {
            ...n,
            ...e,
            runtime: 'browser',
            defaultsMode: t,
            bodyLengthChecker: e?.bodyLengthChecker ?? Bn,
            credentialDefaultProvider:
              e?.credentialDefaultProvider ??
              (e => () => Promise.reject(new Error('Credential is missing'))),
            defaultUserAgentProvider:
              e?.defaultUserAgentProvider ??
              Un({ serviceId: n.serviceId, clientVersion: '3.288.0' }),
            endpointDiscoveryEnabledProvider:
              e?.endpointDiscoveryEnabledProvider ??
              (() => Promise.resolve(void 0)),
            maxAttempts: e?.maxAttempts ?? 3,
            region:
              e?.region ??
              ('Region is missing', () => Promise.reject('Region is missing')),
            requestHandler: e?.requestHandler ?? new Pn(r),
            retryMode:
              e?.retryMode ?? (async () => (await r()).retryMode || 'STANDARD'),
            sha256: e?.sha256 ?? In.Sha256,
            streamCollector: e?.streamCollector ?? kn,
            useDualstackEndpoint:
              e?.useDualstackEndpoint ?? (() => Promise.resolve(!1)),
            useFipsEndpoint: e?.useFipsEndpoint ?? (() => Promise.resolve(!1))
          }
        }
      class eo extends Qe {
        constructor (e) {
          super(), (this.input = e)
        }
        static getEndpointParameterInstructions () {
          return {
            UseFIPS: { type: 'builtInParams', name: 'useFipsEndpoint' },
            Endpoint: { type: 'builtInParams', name: 'endpoint' },
            Region: { type: 'builtInParams', name: 'region' },
            UseDualStack: {
              type: 'builtInParams',
              name: 'useDualstackEndpoint'
            }
          }
        }
        resolveMiddleware (e, t, r) {
          this.middlewareStack.use(m(t, this.serialize, this.deserialize)),
            this.middlewareStack.use(
              A(t, eo.getEndpointParameterInstructions())
            )
          const n = e.concat(this.middlewareStack),
            { logger: i } = t,
            o = {
              logger: i,
              clientName: 'DynamoDBClient',
              commandName: 'BatchExecuteStatementCommand',
              inputFilterSensitiveLog: fr,
              outputFilterSensitiveLog: pr
            },
            { requestHandler: a } = t
          return n.resolve(e => a.handle(e.request, r || {}), o)
        }
        serialize (e, t) {
          return (async (e, t) => {
            let r
            return (
              (r = JSON.stringify(
                ((e, t) => ({
                  ...(null != e.ReturnConsumedCapacity && {
                    ReturnConsumedCapacity: e.ReturnConsumedCapacity
                  }),
                  ...(null != e.Statements && {
                    Statements: Vr(e.Statements, t)
                  })
                }))(e, t)
              )),
              Sn(
                t,
                {
                  'content-type': 'application/x-amz-json-1.0',
                  'x-amz-target': 'DynamoDB_20120810.BatchExecuteStatement'
                },
                '/',
                void 0,
                r
              )
            )
          })(e, t)
        }
        deserialize (e, t) {
          return (async (e, t) => {
            if (e.statusCode >= 300)
              return (async (e, t) => {
                const r = { ...e, body: await An(e.body, t) },
                  n = _n(e, r.body)
                switch (n) {
                  case 'InternalServerError':
                  case 'com.amazonaws.dynamodb#InternalServerError':
                    throw await Er(r, t)
                  case 'RequestLimitExceeded':
                  case 'com.amazonaws.dynamodb#RequestLimitExceeded':
                    throw await Ir(r, t)
                  default:
                    const i = r.body
                    ft({
                      output: e,
                      parsedBody: i,
                      exceptionCtor: mt,
                      errorCode: n
                    })
                }
              })(e, t)
            let r = {}
            r = ((e, t) => ({
              ConsumedCapacity:
                null != e.ConsumedCapacity ? Xr(e.ConsumedCapacity, t) : void 0,
              Responses: null != e.Responses ? pn(e.Responses, t) : void 0
            }))(await En(e.body, t), t)
            const n = { $metadata: vn(e), ...r }
            return Promise.resolve(n)
          })(e, t)
        }
      }
      const to = (e, t) => {
          if (void 0 === e)
            throw new Error(
              'Pass options.removeUndefinedValues=true to remove undefined values from map/array/set.'
            )
          if (null === e && 'object' == typeof e) return ao()
          if (Array.isArray(e)) return ro(e, t)
          if ('Set' === e?.constructor?.name) return no(e, t)
          if ('Map' === e?.constructor?.name) return io(e, t)
          if (
            'Object' === e?.constructor?.name ||
            (!e.constructor && 'object' == typeof e)
          )
            return oo(e, t)
          if (po(e))
            return 0 === e.length && t?.convertEmptyValues ? ao() : so(e)
          if ('boolean' == typeof e || 'Boolean' === e?.constructor?.name)
            return { BOOL: e.valueOf() }
          if ('number' == typeof e || 'Number' === e?.constructor?.name)
            return fo(e)
          if ('bigint' == typeof e) return co(e)
          if ('string' == typeof e || 'String' === e?.constructor?.name)
            return 0 === e.length && t?.convertEmptyValues ? ao() : uo(e)
          if (t?.convertClassInstanceToMap && 'object' == typeof e)
            return oo(e, t)
          throw new Error(
            `Unsupported type passed: ${e}. Pass options.convertClassInstanceToMap=true to marshall typeof object as map attribute.`
          )
        },
        ro = (e, t) => ({
          L: e
            .filter(
              e =>
                !t?.removeUndefinedValues ||
                (t?.removeUndefinedValues && void 0 !== e)
            )
            .map(e => to(e, t))
        }),
        no = (e, t) => {
          const r = t?.removeUndefinedValues
            ? new Set([...e].filter(e => void 0 !== e))
            : e
          if (!t?.removeUndefinedValues && r.has(void 0))
            throw new Error(
              'Pass options.removeUndefinedValues=true to remove undefined values from map/array/set.'
            )
          if (0 === r.size) {
            if (t?.convertEmptyValues) return ao()
            throw new Error(
              'Pass a non-empty set, or options.convertEmptyValues=true.'
            )
          }
          const n = r.values().next().value
          if ('number' == typeof n)
            return {
              NS: Array.from(r)
                .map(fo)
                .map(e => e.N)
            }
          if ('bigint' == typeof n)
            return {
              NS: Array.from(r)
                .map(co)
                .map(e => e.N)
            }
          if ('string' == typeof n)
            return {
              SS: Array.from(r)
                .map(uo)
                .map(e => e.S)
            }
          if (po(n))
            return {
              BS: Array.from(r)
                .map(so)
                .map(e => e.B)
            }
          throw new Error(
            'Only Number Set (NS), Binary Set (BS) or String Set (SS) are allowed.'
          )
        },
        io = (e, t) => ({
          M: (e => {
            const r = {}
            for (const [n, i] of e)
              'function' == typeof i ||
                (void 0 === i && t?.removeUndefinedValues) ||
                (r[n] = to(i, t))
            return r
          })(e)
        }),
        oo = (e, t) => ({
          M: (e => {
            const r = {}
            for (const n in e) {
              const i = e[n]
              'function' == typeof i ||
                (void 0 === i && t?.removeUndefinedValues) ||
                (r[n] = to(i, t))
            }
            return r
          })(e)
        }),
        ao = () => ({ NULL: !0 }),
        so = e => ({ B: e }),
        uo = e => ({ S: e.toString() }),
        co = e => ({ N: e.toString() }),
        lo = e => {
          throw new Error(
            `${e} ${
              'function' == typeof BigInt
                ? 'Use BigInt.'
                : 'Pass string value instead.'
            } `
          )
        },
        fo = e => {
          if (
            [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
              .map(e => e.toString())
              .includes(e.toString())
          )
            throw new Error(
              `Special numeric value ${e.toString()} is not allowed`
            )
          return (
            e > Number.MAX_SAFE_INTEGER
              ? lo(
                  `Number ${e.toString()} is greater than Number.MAX_SAFE_INTEGER.`
                )
              : e < Number.MIN_SAFE_INTEGER &&
                lo(
                  `Number ${e.toString()} is lesser than Number.MIN_SAFE_INTEGER.`
                ),
            { N: e.toString() }
          )
        },
        po = e =>
          !!e?.constructor &&
          [
            'ArrayBuffer',
            'Blob',
            'Buffer',
            'DataView',
            'File',
            'Int8Array',
            'Uint8Array',
            'Uint8ClampedArray',
            'Int16Array',
            'Uint16Array',
            'Int32Array',
            'Uint32Array',
            'Float32Array',
            'Float64Array',
            'BigInt64Array',
            'BigUint64Array'
          ].includes(e.constructor.name),
        ho = (e, t) => {
          for (const [r, n] of Object.entries(e))
            if (void 0 !== n)
              switch (r) {
                case 'NULL':
                  return null
                case 'BOOL':
                  return Boolean(n)
                case 'N':
                  return yo(n, t)
                case 'B':
                  return go(n)
                case 'S':
                  return mo(n)
                case 'L':
                  return bo(n, t)
                case 'M':
                  return wo(n, t)
                case 'NS':
                  return new Set(n.map(e => yo(e, t)))
                case 'BS':
                  return new Set(n.map(go))
                case 'SS':
                  return new Set(n.map(mo))
                default:
                  throw new Error(`Unsupported type passed: ${r}`)
              }
          throw new Error(`No value defined: ${JSON.stringify(e)}`)
        },
        yo = (e, t) => {
          if (t?.wrapNumbers) return { value: e }
          const r = Number(e),
            n = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
          if (
            (r > Number.MAX_SAFE_INTEGER || r < Number.MIN_SAFE_INTEGER) &&
            !n.includes(r)
          ) {
            if ('function' != typeof BigInt)
              throw new Error(
                `${e} is outside SAFE_INTEGER bounds. Set options.wrapNumbers to get string value.`
              )
            try {
              return BigInt(e)
            } catch (t) {
              throw new Error(
                `${e} can't be converted to BigInt. Set options.wrapNumbers to get string value.`
              )
            }
          }
          return r
        },
        mo = e => e,
        go = e => e,
        bo = (e, t) => e.map(e => ho(e, t)),
        wo = (e, t) =>
          Object.entries(e).reduce((e, [r, n]) => ((e[r] = ho(n, t)), e), {}),
        vo = (e, t, r) => {
          if (void 0 !== e)
            return !r || (Array.isArray(r) && 0 === r.length)
              ? t(e)
              : Array.isArray(r)
              ? Eo(e, t, r)
              : Ao(e, t, r.children)
        },
        So = (e, t, r) =>
          Array.isArray(e) ? e.map(e => vo(e, t, r)) : vo(e, t, r),
        Eo = (e, t, r) => {
          const n = { ...e }
          return r.reduce(
            (e, { key: r, children: n }) => ((e[r] = So(e[r], t, n)), e),
            n
          )
        },
        Ao = (e, t, r) =>
          Object.entries(e).reduce((e, [n, i]) => ((e[n] = So(i, t, r)), e), {})
      class _o extends Qe {
        addMarshallingMiddleware (e) {
          const { marshallOptions: t, unmarshallOptions: r } =
            e.translateConfig || {}
          this.clientCommand.middlewareStack.addRelativeTo(
            (e, r) => async n => {
              var i, o, a
              ;(n.input =
                ((i = this.input),
                (o = this.inputKeyNodes),
                (a = t),
                Eo(
                  i,
                  e =>
                    (function (e, t) {
                      const r = to(e, t),
                        [n, i] = Object.entries(r)[0]
                      switch (n) {
                        case 'M':
                        case 'L':
                          return i
                        default:
                          return r
                      }
                    })(e, a),
                  o
                ))),
                (r.dynamoDbDocumentClientOptions =
                  r.dynamoDbDocumentClientOptions ||
                  _o.defaultLogFilterOverrides)
              const s = n.input
              return (
                (r.dynamoDbDocumentClientOptions.overrideInputFilterSensitiveLog =
                  () => r.inputFilterSensitiveLog?.(s)),
                e(n)
              )
            },
            {
              name: 'DocumentMarshall',
              relation: 'before',
              toMiddleware: 'serializerMiddleware',
              override: !0
            }
          ),
            this.clientCommand.middlewareStack.addRelativeTo(
              (e, t) => async n => {
                const i = await e(n),
                  o = i.output
                return (
                  (t.dynamoDbDocumentClientOptions =
                    t.dynamoDbDocumentClientOptions ||
                    _o.defaultLogFilterOverrides),
                  (t.dynamoDbDocumentClientOptions.overrideOutputFilterSensitiveLog =
                    () => t.outputFilterSensitiveLog?.(o)),
                  (i.output =
                    ((a = i.output),
                    (s = this.outputKeyNodes),
                    (u = r),
                    Eo(a, e => ((e, t) => ho({ M: e }, t))(e, u), s))),
                  i
                )
                var a, s, u
              },
              {
                name: 'DocumentUnmarshall',
                relation: 'before',
                toMiddleware: 'deserializerMiddleware',
                override: !0
              }
            )
        }
      }
      _o.defaultLogFilterOverrides = {
        overrideInputFilterSensitiveLog (...e) {},
        overrideOutputFilterSensitiveLog (...e) {}
      }
      class Oo extends Qe {
        constructor (e) {
          super(), (this.input = e)
        }
        static getEndpointParameterInstructions () {
          return {
            UseFIPS: { type: 'builtInParams', name: 'useFipsEndpoint' },
            Endpoint: { type: 'builtInParams', name: 'endpoint' },
            Region: { type: 'builtInParams', name: 'region' },
            UseDualStack: {
              type: 'builtInParams',
              name: 'useDualstackEndpoint'
            }
          }
        }
        resolveMiddleware (e, t, r) {
          this.middlewareStack.use(m(t, this.serialize, this.deserialize)),
            this.middlewareStack.use(
              A(t, Oo.getEndpointParameterInstructions())
            )
          const n = e.concat(this.middlewareStack),
            { logger: i } = t,
            o = {
              logger: i,
              clientName: 'DynamoDBClient',
              commandName: 'DeleteItemCommand',
              inputFilterSensitiveLog: wr,
              outputFilterSensitiveLog: yr
            },
            { requestHandler: a } = t
          return n.resolve(e => a.handle(e.request, r || {}), o)
        }
        serialize (e, t) {
          return (async (e, t) => {
            let r
            return (
              (r = JSON.stringify(
                ((e, t) => ({
                  ...(null != e.ConditionExpression && {
                    ConditionExpression: e.ConditionExpression
                  }),
                  ...(null != e.ConditionalOperator && {
                    ConditionalOperator: e.ConditionalOperator
                  }),
                  ...(null != e.Expected && { Expected: xr(e.Expected, t) }),
                  ...(null != e.ExpressionAttributeNames && {
                    ExpressionAttributeNames: Dr(e.ExpressionAttributeNames, t)
                  }),
                  ...(null != e.ExpressionAttributeValues && {
                    ExpressionAttributeValues: kr(
                      e.ExpressionAttributeValues,
                      t
                    )
                  }),
                  ...(null != e.Key && { Key: Fr(e.Key, t) }),
                  ...(null != e.ReturnConsumedCapacity && {
                    ReturnConsumedCapacity: e.ReturnConsumedCapacity
                  }),
                  ...(null != e.ReturnItemCollectionMetrics && {
                    ReturnItemCollectionMetrics: e.ReturnItemCollectionMetrics
                  }),
                  ...(null != e.ReturnValues && {
                    ReturnValues: e.ReturnValues
                  }),
                  ...(null != e.TableName && { TableName: e.TableName })
                }))(e, t)
              )),
              Sn(
                t,
                {
                  'content-type': 'application/x-amz-json-1.0',
                  'x-amz-target': 'DynamoDB_20120810.DeleteItem'
                },
                '/',
                void 0,
                r
              )
            )
          })(e, t)
        }
        deserialize (e, t) {
          return (async (e, t) => {
            if (e.statusCode >= 300)
              return (async (e, t) => {
                const r = { ...e, body: await An(e.body, t) },
                  n = _n(e, r.body)
                switch (n) {
                  case 'ConditionalCheckFailedException':
                  case 'com.amazonaws.dynamodb#ConditionalCheckFailedException':
                    throw await Sr(r, t)
                  case 'InternalServerError':
                  case 'com.amazonaws.dynamodb#InternalServerError':
                    throw await Er(r, t)
                  case 'InvalidEndpointException':
                  case 'com.amazonaws.dynamodb#InvalidEndpointException':
                    throw await Ar(r, t)
                  case 'ItemCollectionSizeLimitExceededException':
                  case 'com.amazonaws.dynamodb#ItemCollectionSizeLimitExceededException':
                    throw await _r(r, t)
                  case 'ProvisionedThroughputExceededException':
                  case 'com.amazonaws.dynamodb#ProvisionedThroughputExceededException':
                    throw await Or(r, t)
                  case 'RequestLimitExceeded':
                  case 'com.amazonaws.dynamodb#RequestLimitExceeded':
                    throw await Ir(r, t)
                  case 'ResourceNotFoundException':
                  case 'com.amazonaws.dynamodb#ResourceNotFoundException':
                    throw await Cr(r, t)
                  case 'TransactionConflictException':
                  case 'com.amazonaws.dynamodb#TransactionConflictException':
                    throw await Pr(r, t)
                  default:
                    const i = r.body
                    ft({
                      output: e,
                      parsedBody: i,
                      exceptionCtor: mt,
                      errorCode: n
                    })
                }
              })(e, t)
            let r = {}
            r = ((e, t) => ({
              Attributes: null != e.Attributes ? Hr(e.Attributes, t) : void 0,
              ConsumedCapacity:
                null != e.ConsumedCapacity ? Qr(e.ConsumedCapacity, t) : void 0,
              ItemCollectionMetrics:
                null != e.ItemCollectionMetrics
                  ? on(e.ItemCollectionMetrics, t)
                  : void 0
            }))(await En(e.body, t), t)
            const n = { $metadata: vn(e), ...r }
            return Promise.resolve(n)
          })(e, t)
        }
      }
      class Io extends Qe {
        constructor (e) {
          super(), (this.input = e)
        }
        static getEndpointParameterInstructions () {
          return {
            UseFIPS: { type: 'builtInParams', name: 'useFipsEndpoint' },
            Endpoint: { type: 'builtInParams', name: 'endpoint' },
            Region: { type: 'builtInParams', name: 'region' },
            UseDualStack: {
              type: 'builtInParams',
              name: 'useDualstackEndpoint'
            }
          }
        }
        resolveMiddleware (e, t, r) {
          this.middlewareStack.use(m(t, this.serialize, this.deserialize)),
            this.middlewareStack.use(
              A(t, Io.getEndpointParameterInstructions())
            )
          const n = e.concat(this.middlewareStack),
            { logger: i } = t,
            o = {
              logger: i,
              clientName: 'DynamoDBClient',
              commandName: 'PutItemCommand',
              inputFilterSensitiveLog: vr,
              outputFilterSensitiveLog: mr
            },
            { requestHandler: a } = t
          return n.resolve(e => a.handle(e.request, r || {}), o)
        }
        serialize (e, t) {
          return (async (e, t) => {
            let r
            return (
              (r = JSON.stringify(
                ((e, t) => ({
                  ...(null != e.ConditionExpression && {
                    ConditionExpression: e.ConditionExpression
                  }),
                  ...(null != e.ConditionalOperator && {
                    ConditionalOperator: e.ConditionalOperator
                  }),
                  ...(null != e.Expected && { Expected: xr(e.Expected, t) }),
                  ...(null != e.ExpressionAttributeNames && {
                    ExpressionAttributeNames: Dr(e.ExpressionAttributeNames, t)
                  }),
                  ...(null != e.ExpressionAttributeValues && {
                    ExpressionAttributeValues: kr(
                      e.ExpressionAttributeValues,
                      t
                    )
                  }),
                  ...(null != e.Item && { Item: zr(e.Item, t) }),
                  ...(null != e.ReturnConsumedCapacity && {
                    ReturnConsumedCapacity: e.ReturnConsumedCapacity
                  }),
                  ...(null != e.ReturnItemCollectionMetrics && {
                    ReturnItemCollectionMetrics: e.ReturnItemCollectionMetrics
                  }),
                  ...(null != e.ReturnValues && {
                    ReturnValues: e.ReturnValues
                  }),
                  ...(null != e.TableName && { TableName: e.TableName })
                }))(e, t)
              )),
              Sn(
                t,
                {
                  'content-type': 'application/x-amz-json-1.0',
                  'x-amz-target': 'DynamoDB_20120810.PutItem'
                },
                '/',
                void 0,
                r
              )
            )
          })(e, t)
        }
        deserialize (e, t) {
          return (async (e, t) => {
            if (e.statusCode >= 300)
              return (async (e, t) => {
                const r = { ...e, body: await An(e.body, t) },
                  n = _n(e, r.body)
                switch (n) {
                  case 'ConditionalCheckFailedException':
                  case 'com.amazonaws.dynamodb#ConditionalCheckFailedException':
                    throw await Sr(r, t)
                  case 'InternalServerError':
                  case 'com.amazonaws.dynamodb#InternalServerError':
                    throw await Er(r, t)
                  case 'InvalidEndpointException':
                  case 'com.amazonaws.dynamodb#InvalidEndpointException':
                    throw await Ar(r, t)
                  case 'ItemCollectionSizeLimitExceededException':
                  case 'com.amazonaws.dynamodb#ItemCollectionSizeLimitExceededException':
                    throw await _r(r, t)
                  case 'ProvisionedThroughputExceededException':
                  case 'com.amazonaws.dynamodb#ProvisionedThroughputExceededException':
                    throw await Or(r, t)
                  case 'RequestLimitExceeded':
                  case 'com.amazonaws.dynamodb#RequestLimitExceeded':
                    throw await Ir(r, t)
                  case 'ResourceNotFoundException':
                  case 'com.amazonaws.dynamodb#ResourceNotFoundException':
                    throw await Cr(r, t)
                  case 'TransactionConflictException':
                  case 'com.amazonaws.dynamodb#TransactionConflictException':
                    throw await Pr(r, t)
                  default:
                    const i = r.body
                    ft({
                      output: e,
                      parsedBody: i,
                      exceptionCtor: mt,
                      errorCode: n
                    })
                }
              })(e, t)
            let r = {}
            r = ((e, t) => ({
              Attributes: null != e.Attributes ? Hr(e.Attributes, t) : void 0,
              ConsumedCapacity:
                null != e.ConsumedCapacity ? Qr(e.ConsumedCapacity, t) : void 0,
              ItemCollectionMetrics:
                null != e.ItemCollectionMetrics
                  ? on(e.ItemCollectionMetrics, t)
                  : void 0
            }))(await En(e.body, t), t)
            const n = { $metadata: vn(e), ...r }
            return Promise.resolve(n)
          })(e, t)
        }
      }
      class Co extends Qe {
        constructor (e) {
          super(), (this.input = e)
        }
        static getEndpointParameterInstructions () {
          return {
            UseFIPS: { type: 'builtInParams', name: 'useFipsEndpoint' },
            Endpoint: { type: 'builtInParams', name: 'endpoint' },
            Region: { type: 'builtInParams', name: 'region' },
            UseDualStack: {
              type: 'builtInParams',
              name: 'useDualstackEndpoint'
            }
          }
        }
        resolveMiddleware (e, t, r) {
          this.middlewareStack.use(m(t, this.serialize, this.deserialize)),
            this.middlewareStack.use(
              A(t, Co.getEndpointParameterInstructions())
            )
          const n = e.concat(this.middlewareStack),
            { logger: i } = t,
            o = {
              logger: i,
              clientName: 'DynamoDBClient',
              commandName: 'ScanCommand',
              inputFilterSensitiveLog: br,
              outputFilterSensitiveLog: gr
            },
            { requestHandler: a } = t
          return n.resolve(e => a.handle(e.request, r || {}), o)
        }
        serialize (e, t) {
          return (async (e, t) => {
            let r
            return (
              (r = JSON.stringify(
                ((e, t) => ({
                  ...(null != e.AttributesToGet && {
                    AttributesToGet: Nr(e.AttributesToGet)
                  }),
                  ...(null != e.ConditionalOperator && {
                    ConditionalOperator: e.ConditionalOperator
                  }),
                  ...(null != e.ConsistentRead && {
                    ConsistentRead: e.ConsistentRead
                  }),
                  ...(null != e.ExclusiveStartKey && {
                    ExclusiveStartKey: Fr(e.ExclusiveStartKey, t)
                  }),
                  ...(null != e.ExpressionAttributeNames && {
                    ExpressionAttributeNames: Dr(e.ExpressionAttributeNames, t)
                  }),
                  ...(null != e.ExpressionAttributeValues && {
                    ExpressionAttributeValues: kr(
                      e.ExpressionAttributeValues,
                      t
                    )
                  }),
                  ...(null != e.FilterExpression && {
                    FilterExpression: e.FilterExpression
                  }),
                  ...(null != e.IndexName && { IndexName: e.IndexName }),
                  ...(null != e.Limit && { Limit: e.Limit }),
                  ...(null != e.ProjectionExpression && {
                    ProjectionExpression: e.ProjectionExpression
                  }),
                  ...(null != e.ReturnConsumedCapacity && {
                    ReturnConsumedCapacity: e.ReturnConsumedCapacity
                  }),
                  ...(null != e.ScanFilter && {
                    ScanFilter: Br(e.ScanFilter, t)
                  }),
                  ...(null != e.Segment && { Segment: e.Segment }),
                  ...(null != e.Select && { Select: e.Select }),
                  ...(null != e.TableName && { TableName: e.TableName }),
                  ...(null != e.TotalSegments && {
                    TotalSegments: e.TotalSegments
                  })
                }))(e, t)
              )),
              Sn(
                t,
                {
                  'content-type': 'application/x-amz-json-1.0',
                  'x-amz-target': 'DynamoDB_20120810.Scan'
                },
                '/',
                void 0,
                r
              )
            )
          })(e, t)
        }
        deserialize (e, t) {
          return (async (e, t) => {
            if (e.statusCode >= 300)
              return (async (e, t) => {
                const r = { ...e, body: await An(e.body, t) },
                  n = _n(e, r.body)
                switch (n) {
                  case 'InternalServerError':
                  case 'com.amazonaws.dynamodb#InternalServerError':
                    throw await Er(r, t)
                  case 'InvalidEndpointException':
                  case 'com.amazonaws.dynamodb#InvalidEndpointException':
                    throw await Ar(r, t)
                  case 'ProvisionedThroughputExceededException':
                  case 'com.amazonaws.dynamodb#ProvisionedThroughputExceededException':
                    throw await Or(r, t)
                  case 'RequestLimitExceeded':
                  case 'com.amazonaws.dynamodb#RequestLimitExceeded':
                    throw await Ir(r, t)
                  case 'ResourceNotFoundException':
                  case 'com.amazonaws.dynamodb#ResourceNotFoundException':
                    throw await Cr(r, t)
                  default:
                    const i = r.body
                    ft({
                      output: e,
                      parsedBody: i,
                      exceptionCtor: mt,
                      errorCode: n
                    })
                }
              })(e, t)
            let r = {}
            r = ((e, t) => ({
              ConsumedCapacity:
                null != e.ConsumedCapacity ? Qr(e.ConsumedCapacity, t) : void 0,
              Count: tt(e.Count),
              Items: null != e.Items ? un(e.Items, t) : void 0,
              LastEvaluatedKey:
                null != e.LastEvaluatedKey ? cn(e.LastEvaluatedKey, t) : void 0,
              ScannedCount: tt(e.ScannedCount)
            }))(await En(e.body, t), t)
            const n = { $metadata: vn(e), ...r }
            return Promise.resolve(n)
          })(e, t)
        }
      }
      ;(window.DynamoDBClient = class extends Je {
        constructor (e) {
          var t
          const r = (e => {
              const { region: t, useFipsEndpoint: r } = e
              if (!t) throw new Error('Region is missing')
              return {
                ...e,
                region: async () => {
                  if ('string' == typeof t) return o(t)
                  const e = await t()
                  return o(e)
                },
                useFipsEndpoint: async () => {
                  const e = 'string' == typeof t ? t : await t()
                  return (
                    !!i(e) ||
                    ('function' != typeof r ? Promise.resolve(!!r) : r())
                  )
                }
              }
            })(
              ((t = Xi(e)),
              {
                ...t,
                useDualstackEndpoint: t.useDualstackEndpoint ?? !1,
                useFipsEndpoint: t.useFipsEndpoint ?? !1,
                defaultSigningName: 'dynamodb'
              })
            ),
            n = (e => {
              const { retryStrategy: t } = e,
                r = _(e.maxAttempts ?? 3)
              return {
                ...e,
                maxAttempts: r,
                retryStrategy: async () =>
                  t ||
                  ((await _(e.retryMode)()) === x.ADAPTIVE
                    ? new G(r)
                    : new V(r))
              }
            })(
              (e => {
                const t = e.tls ?? !0,
                  { endpoint: r } = e,
                  n =
                    null != r
                      ? async () =>
                          (e =>
                            'object' == typeof e
                              ? 'url' in e
                                ? O(e.url)
                                : e
                              : O(e))(await _(r)())
                      : void 0,
                  i = !!r
                return {
                  ...e,
                  endpoint: n,
                  tls: t,
                  isCustomEndpoint: i,
                  useDualstackEndpoint: _(e.useDualstackEndpoint ?? !1),
                  useFipsEndpoint: _(e.useFipsEndpoint ?? !1)
                }
              })(r)
            ),
            a = (e => {
              const t = e.credentials
                  ? 'function' == typeof (o = e.credentials)
                    ? ne(
                        o,
                        e =>
                          void 0 !== e.expiration &&
                          e.expiration.getTime() - Date.now() < 3e5,
                        e => void 0 !== e.expiration
                      )
                    : _(o)
                  : e.credentialDefaultProvider(e),
                {
                  signingEscapePath: r = !0,
                  systemClockOffset: n = e.systemClockOffset || 0,
                  sha256: i
                } = e
              var o
              let a
              return (
                (a = e.signer
                  ? _(e.signer)
                  : e.regionInfoProvider
                  ? () =>
                      _(e.region)()
                        .then(async t => [
                          (await e.regionInfoProvider(t, {
                            useFipsEndpoint: await e.useFipsEndpoint(),
                            useDualstackEndpoint: await e.useDualstackEndpoint()
                          })) || {},
                          t
                        ])
                        .then(([n, o]) => {
                          const { signingRegion: a, signingService: s } = n
                          ;(e.signingRegion = e.signingRegion || a || o),
                            (e.signingName = e.signingName || s || e.serviceId)
                          const u = {
                            ...e,
                            credentials: t,
                            region: e.signingRegion,
                            service: e.signingName,
                            sha256: i,
                            uriEscapePath: r
                          }
                          return new (e.signerConstructor || De)(u)
                        })
                  : async n => {
                      const o = (n = Object.assign(
                          {},
                          {
                            name: 'sigv4',
                            signingName: e.signingName || e.defaultSigningName,
                            signingRegion: await _(e.region)(),
                            properties: {}
                          },
                          n
                        )).signingRegion,
                        a = n.signingName
                      ;(e.signingRegion = e.signingRegion || o),
                        (e.signingName = e.signingName || a || e.serviceId)
                      const s = {
                        ...e,
                        credentials: t,
                        region: e.signingRegion,
                        service: e.signingName,
                        sha256: i,
                        uriEscapePath: r
                      }
                      return new (e.signerConstructor || De)(s)
                    }),
                {
                  ...e,
                  systemClockOffset: n,
                  signingEscapePath: r,
                  credentials: t,
                  signer: a
                }
              )
            })(n)
          var s
          const c = ((e, { endpointDiscoveryCommandCtor: t }) => ({
            ...e,
            endpointDiscoveryCommandCtor: t,
            endpointCache: new P(e.endpointCacheSize ?? 1e3),
            endpointDiscoveryEnabled:
              void 0 !== e.endpointDiscoveryEnabled
                ? () => Promise.resolve(e.endpointDiscoveryEnabled)
                : e.endpointDiscoveryEnabledProvider,
            isClientEndpointDiscoveryEnabled:
              void 0 !== e.endpointDiscoveryEnabled
          }))(
            ((s = a),
            {
              ...s,
              customUserAgent:
                'string' == typeof s.customUserAgent
                  ? [[s.customUserAgent]]
                  : s.customUserAgent
            }),
            { endpointDiscoveryCommandCtor: On }
          )
          var f
          super(c),
            (this.config = c),
            this.middlewareStack.use(
              (e => ({
                applyToStack: t => {
                  t.add(
                    (e => (t, r) => async n => {
                      let i = await e.retryStrategy()
                      const o = await e.maxAttempts()
                      if (
                        !(e =>
                          void 0 !== e.acquireInitialRetryToken &&
                          void 0 !== e.refreshRetryTokenForRetry &&
                          void 0 !== e.recordSuccess)(i)
                      )
                        return (
                          i?.mode &&
                            (r.userAgent = [
                              ...(r.userAgent || []),
                              ['cfg/retry-mode', i.mode]
                            ]),
                          i.retry(t, n)
                        )
                      {
                        let e = await i.acquireInitialRetryToken(
                            r.partition_id
                          ),
                          s = new Error(),
                          c = 0,
                          l = 0
                        const { request: d } = n
                        for (
                          u.isInstance(d) &&
                          (d.headers['amz-sdk-invocation-id'] = J());
                          ;

                        )
                          try {
                            u.isInstance(d) &&
                              (d.headers['amz-sdk-request'] = `attempt=${
                                c + 1
                              }; max=${o}`)
                            const { response: r, output: a } = await t(n)
                            return (
                              i.recordSuccess(e),
                              (a.$metadata.attempts = c + 1),
                              (a.$metadata.totalRetryDelay = l),
                              { response: r, output: a }
                            )
                          } catch (t) {
                            const r = Q(t)
                            s =
                              (a = t) instanceof Error
                                ? a
                                : a instanceof Object
                                ? Object.assign(new Error(), a)
                                : 'string' == typeof a
                                ? new Error(a)
                                : new Error(`AWS SDK error wrapper for ${a}`)
                            try {
                              e = await i.refreshRetryTokenForRetry(e, r)
                            } catch (e) {
                              throw (
                                (s.$metadata || (s.$metadata = {}),
                                (s.$metadata.attempts = c + 1),
                                (s.$metadata.totalRetryDelay = l),
                                s)
                              )
                            }
                            c = e.getRetryCount()
                            const n = e.getRetryDelay()
                            ;(l += n), await new Promise(e => setTimeout(e, n))
                          }
                      }
                      var a
                    })(e),
                    ee
                  )
                }
              }))(this.config)
            ),
            this.middlewareStack.use(
              (e => ({
                applyToStack: t => {
                  var r
                  t.add(
                    ((r = e.bodyLengthChecker),
                    e => async t => {
                      const n = t.request
                      if (u.isInstance(n)) {
                        const { body: e, headers: t } = n
                        if (
                          e &&
                          -1 ===
                            Object.keys(t)
                              .map(e => e.toLowerCase())
                              .indexOf(l)
                        )
                          try {
                            const t = r(e)
                            n.headers = { ...n.headers, [l]: String(t) }
                          } catch (e) {}
                      }
                      return e({ ...t, request: n })
                    }),
                    d
                  )
                }
              }))(this.config)
            ),
            this.middlewareStack.use(
              (e => ({
                applyToStack: t => {
                  t.add(
                    (e => t => async r => {
                      if (!u.isInstance(r.request)) return t(r)
                      const { request: n } = r,
                        { handlerProtocol: i = '' } =
                          e.requestHandler.metadata || {}
                      if (i.indexOf('h2') >= 0 && !n.headers[':authority'])
                        delete n.headers.host, (n.headers[':authority'] = '')
                      else if (!n.headers.host) {
                        let e = n.hostname
                        null != n.port && (e += `:${n.port}`),
                          (n.headers.host = e)
                      }
                      return t(r)
                    })(e),
                    N
                  )
                }
              }))(this.config)
            ),
            this.middlewareStack.use(
              (this.config,
              {
                applyToStack: e => {
                  e.add(
                    (e, t) => async r => {
                      try {
                        const n = await e(r),
                          {
                            clientName: i,
                            commandName: o,
                            logger: a,
                            dynamoDbDocumentClientOptions: s = {}
                          } = t,
                          {
                            overrideInputFilterSensitiveLog: u,
                            overrideOutputFilterSensitiveLog: c
                          } = s,
                          l = u ?? t.inputFilterSensitiveLog,
                          d = c ?? t.outputFilterSensitiveLog,
                          { $metadata: f, ...p } = n.output
                        return (
                          a?.info?.({
                            clientName: i,
                            commandName: o,
                            input: l(r.input),
                            output: d(p),
                            metadata: f
                          }),
                          n
                        )
                      } catch (e) {
                        const {
                            clientName: n,
                            commandName: i,
                            logger: o,
                            dynamoDbDocumentClientOptions: a = {}
                          } = t,
                          { overrideInputFilterSensitiveLog: s } = a,
                          u = s ?? t.inputFilterSensitiveLog
                        throw (
                          (o?.error?.({
                            clientName: n,
                            commandName: i,
                            input: u(r.input),
                            error: e,
                            metadata: e.$metadata
                          }),
                          e)
                        )
                      }
                    },
                    T
                  )
                }
              })
            ),
            this.middlewareStack.use(
              (e => ({
                applyToStack: t => {
                  t.add(
                    (e => t => async r => {
                      const { request: n } = r
                      if (
                        !u.isInstance(n) ||
                        'node' !== e.runtime ||
                        n.headers.hasOwnProperty(R)
                      )
                        return t(r)
                      const i = process.env.AWS_LAMBDA_FUNCTION_NAME,
                        o = process.env._X_AMZN_TRACE_ID,
                        a = e => 'string' == typeof e && e.length > 0
                      return (
                        a(i) && a(o) && (n.headers[R] = o),
                        t({ ...r, request: n })
                      )
                    })(e),
                    M
                  )
                }
              }))(this.config)
            ),
            this.middlewareStack.use(
              (e => ({
                applyToStack: t => {
                  t.addRelativeTo(
                    (
                      e => (t, r) =>
                        async function (n) {
                          if (!u.isInstance(n.request)) return t(n)
                          const i = r.endpointV2?.properties?.authSchemes?.[0],
                            o =
                              'sigv4a' === i?.name
                                ? i?.signingRegionSet?.join(',')
                                : void 0,
                            a = await e.signer(i),
                            s = await t({
                              ...n,
                              request: await a.sign(n.request, {
                                signingDate: Fe(e.systemClockOffset),
                                signingRegion: o || r.signing_region,
                                signingService: r.signing_service
                              })
                            }).catch(t => {
                              const r = t.ServerTime ?? Ue(t.$response)
                              throw (
                                (r &&
                                  (e.systemClockOffset = je(
                                    r,
                                    e.systemClockOffset
                                  )),
                                t)
                              )
                            }),
                            c = Ue(s.response)
                          return (
                            c &&
                              (e.systemClockOffset = je(
                                c,
                                e.systemClockOffset
                              )),
                            s
                          )
                        }
                    )(e),
                    $e
                  )
                }
              }))(this.config)
            ),
            this.middlewareStack.use(
              ((f = this.config),
              {
                applyToStack: e => {
                  var t
                  e.add(
                    ((t = f),
                    (e, r) => async n => {
                      const { request: i } = n
                      if (!u.isInstance(i)) return e(n)
                      const { headers: o } = i,
                        a = r?.userAgent?.map(qe) || [],
                        s = (await t.defaultUserAgentProvider()).map(qe),
                        c = t?.customUserAgent?.map(qe) || [],
                        l = [...s, ...a, ...c].join(' '),
                        d = [
                          ...s.filter(e => e.startsWith('aws-sdk-')),
                          ...c
                        ].join(' ')
                      return (
                        'browser' !== t.runtime
                          ? (d && (o[Ge] = o[Ge] ? `${o[Ve]} ${d}` : d),
                            (o[Ve] = l))
                          : (o[Ge] = l),
                        e({ ...n, request: i })
                      )
                    }),
                    He
                  )
                }
              })
            )
        }
        destroy () {
          super.destroy()
        }
      }),
        (window.BatchExecuteStatementCommand = eo),
        (window.PutCommand = class extends _o {
          constructor (e) {
            super(),
              (this.input = e),
              (this.inputKeyNodes = [
                { key: 'Item' },
                {
                  key: 'Expected',
                  children: {
                    children: [{ key: 'Value' }, { key: 'AttributeValueList' }]
                  }
                },
                { key: 'ExpressionAttributeValues' }
              ]),
              (this.outputKeyNodes = [
                { key: 'Attributes' },
                {
                  key: 'ItemCollectionMetrics',
                  children: [{ key: 'ItemCollectionKey' }]
                }
              ]),
              (this.clientCommand = new Io(this.input)),
              (this.middlewareStack = this.clientCommand.middlewareStack)
          }
          resolveMiddleware (e, t, r) {
            this.addMarshallingMiddleware(t)
            const n = e.concat(this.middlewareStack),
              i = this.clientCommand.resolveMiddleware(n, t, r)
            return async () => i(this.clientCommand)
          }
        }),
        (window.DeleteCommand = class extends _o {
          constructor (e) {
            super(),
              (this.input = e),
              (this.inputKeyNodes = [
                { key: 'Key' },
                {
                  key: 'Expected',
                  children: {
                    children: [{ key: 'Value' }, { key: 'AttributeValueList' }]
                  }
                },
                { key: 'ExpressionAttributeValues' }
              ]),
              (this.outputKeyNodes = [
                { key: 'Attributes' },
                {
                  key: 'ItemCollectionMetrics',
                  children: [{ key: 'ItemCollectionKey' }]
                }
              ]),
              (this.clientCommand = new Oo(this.input)),
              (this.middlewareStack = this.clientCommand.middlewareStack)
          }
          resolveMiddleware (e, t, r) {
            this.addMarshallingMiddleware(t)
            const n = e.concat(this.middlewareStack),
              i = this.clientCommand.resolveMiddleware(n, t, r)
            return async () => i(this.clientCommand)
          }
        }),
        (window.ScanCommand = class extends _o {
          constructor (e) {
            super(),
              (this.input = e),
              (this.inputKeyNodes = [
                {
                  key: 'ScanFilter',
                  children: { children: [{ key: 'AttributeValueList' }] }
                },
                { key: 'ExclusiveStartKey' },
                { key: 'ExpressionAttributeValues' }
              ]),
              (this.outputKeyNodes = [
                { key: 'Items' },
                { key: 'LastEvaluatedKey' }
              ]),
              (this.clientCommand = new Co(this.input)),
              (this.middlewareStack = this.clientCommand.middlewareStack)
          }
          resolveMiddleware (e, t, r) {
            this.addMarshallingMiddleware(t)
            const n = e.concat(this.middlewareStack),
              i = this.clientCommand.resolveMiddleware(n, t, r)
            return async () => i(this.clientCommand)
          }
        })
    })()
})()
