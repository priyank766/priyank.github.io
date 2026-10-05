/* Calico: block prints, running stitches, a woven graph and a dye-vat theme switch. */
(function () {
  'use strict';
  var root = document.documentElement;
  if (root.getAttribute('data-look') !== 'calico') return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tok(n) { return getComputedStyle(root).getPropertyValue(n).trim(); }
  /* one scroll-driven ticker: layers ease toward the scroll position instead of snapping to it,
     and the loop sleeps as soon as everything has settled */
  var followers = [], ticking = false;
  function follow(apply, rate) { var f = { cur: window.scrollY, apply: apply, rate: rate || .12 }; followers.push(f); f.apply(f.cur); wake(); }
  function tick() {
    var y = window.scrollY, busy = false;
    followers.forEach(function (f) { var d = y - f.cur; if (Math.abs(d) > .1) { f.cur += d * f.rate; busy = true; } else f.cur = y; f.apply(f.cur); });
    if (busy) requestAnimationFrame(tick); else ticking = false;
  }
  function wake() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
  addEventListener('scroll', wake, { passive: true });
  function h(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  /* ---------- theme switch: a dip in the indigo vat ----------
     Going dark, the dye rises from the bottom with a moving surface; going light, it drains away.
     The base wipe asks for a view transition; this look answers it with its own animation. */
  var origVT = document.startViewTransition && document.startViewTransition.bind(document);
  if (origVT && !reduce) {
    document.startViewTransition = function (cb) {
      var toDark = root.getAttribute('data-theme') === 'light';
      root.classList.add('cal-drain');  // the old page always sits on top and is the one that moves
      var vt = origVT(cb);
      vt.ready.then(function () { dip(toDark); }).catch(function () {});
      vt.finished.then(done, done);
      function done() { root.classList.remove('cal-drain'); }
      return { ready: new Promise(function () {}), finished: vt.finished, updateCallbackDone: vt.updateCallbackDone, skipTransition: function () { vt.skipTransition(); } };
    };
  }
  // waves are sized in pixels (long swell + small ripple), so a phone gets the same gentle surface as a desktop
  function wave(x, level, ph, amp) { return level + Math.sin(ph + x * 6.2832 / 280) * amp + Math.sin(ph * 1.7 + x * 6.2832 / 170) * amp * .3; }
  function wavePts(W, level, ph, amp) { var d = '', n = Math.max(24, Math.ceil(W / 10)); for (var i = 1; i <= n; i++) { var x = W * i / n; d += ' L' + x.toFixed(1) + ' ' + wave(x, level, ph, amp).toFixed(1); } return d; }
  function surface(W, H, level, ph, amp) {
    var d = 'M0 ' + (H + 400) + ' L0 ' + wave(0, level, ph, amp).toFixed(1);
    d += wavePts(W, level, ph, amp);
    return "path('" + d + ' L' + W + ' ' + (H + 400) + " Z')";
  }
  // the area ABOVE a wavy surface (used to keep the light page above the rising dye)
  function surfaceTop(W, H, level, ph, amp) {
    var d = 'M0 -400 L0 ' + wave(0, level, ph, amp).toFixed(1);
    d += wavePts(W, level, ph, amp);
    return "path('" + d + ' L' + W + " -400 Z')";
  }
  function dip(toDark) {
    var W = innerWidth, H = innerHeight, amp = Math.min(20, H * .022, W * .035), frames = [], N = 48;
    for (var k = 0; k <= N; k++) {
      var t = k / N, e = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      var a = amp * Math.sin(Math.PI * t);
      // dark rises from below; light: the dark (old) layer's surface falls away
      var level = toDark ? (H + amp * 2) - e * (H + amp * 4) : (-amp * 2) + e * (H + amp * 4);
      frames.push({ clipPath: toDark ? surfaceTop(W, H, level, t * 6, a) : surface(W, H, level, t * 6, a) });
    }
    var o = { duration: 1500, easing: 'linear', fill: 'both' };
    try {
      root.animate(frames, Object.assign({ pseudoElement: '::view-transition-old(root)' }, o));
    } catch (err) {}
  }

  function init() {
    var hero = document.querySelector('.hero'), heroIn = document.querySelector('.hero-in'), h1 = document.getElementById('hello');

    /* kicker above the name and a seal in the corner */
    if (heroIn && h1 && !document.querySelector('.cal-kicker')) {
      var k = h('p', 'cal-kicker', '<span>AI product engineer</span><i></i><span>Ahmedabad</span><i></i><span>Block 2026</span>');
      k.setAttribute('aria-hidden', 'true');
      heroIn.insertBefore(k, h1);
      var seal = h('div', 'cal-seal');
      seal.setAttribute('aria-hidden', 'true');
      seal.innerHTML = '<svg viewBox="0 0 124 124"><defs><path id="cal-sp" d="M62 62m-48 0a48 48 0 1 1 96 0a48 48 0 1 1-96 0"/></defs>' +
        '<circle cx="62" cy="62" r="60" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="62" cy="62" r="36" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>' +
        '<text><textPath href="#cal-sp">Hand built in Ahmedabad ♦ agents that ship ♦ </textPath></text>' +
        '<g transform="translate(44 44) scale(.9)"><path fill="currentColor" fill-rule="evenodd" d="M20 2L38 20L20 38L2 20Z M20 6.5L6.5 20L20 33.5L33.5 20Z M20 11.5L28.5 20L20 28.5L11.5 20Z M20 17.4a2.6 2.6 0 1 0 0 5.2a2.6 2.6 0 1 0 0-5.2Z"/></g></svg>';
      hero.appendChild(seal);
      if (!reduce) {
        var sg = seal.querySelector('svg');
        follow(function (y) { if (y < innerHeight * 1.6) sg.style.transform = 'rotate(' + (y * .22).toFixed(2) + 'deg)'; }, .09);
      }
    }

    /* section borders and numbered stamps */
    var secs = [].slice.call(document.querySelectorAll('main > .slope, main > .sec'));
    secs.forEach(function (s, i) {
      if (s.querySelector(':scope > .cal-band')) return;
      var b = h('div', 'cal-band', '<i></i><b><span>' + pad(i + 1) + '</span><span>of ' + pad(secs.length) + '</span></b>');
      b.setAttribute('aria-hidden', 'true');
      s.insertBefore(b, s.firstChild);
      var h2 = s.querySelector('h2');
      if (h2) { var m = h('span', 'cal-mark cal-st', '<b></b><i></i>'); m.setAttribute('aria-hidden', 'true'); h2.insertBefore(m, h2.firstChild); }
    });
    var foot = document.querySelector('footer');
    if (foot && !foot.querySelector('.cal-band')) {
      var fb = h('div', 'cal-band', '<i></i>'); fb.setAttribute('aria-hidden', 'true'); foot.insertBefore(fb, foot.firstChild);
    }

    /* projects: catalogue numbers and a swatch for each */
    [].forEach.call(document.querySelectorAll('.proj'), function (p, i) {
      var head = p.firstElementChild; if (!head || head.querySelector('.cal-cat')) return;
      var sw = h('span', 'cal-sw cal-st'); sw.setAttribute('data-k', String(i % 5)); sw.setAttribute('aria-hidden', 'true');
      var cat = h('span', 'cal-cat', '<span>Cat.</span><em>' + pad(i + 1) + '</em>'); cat.setAttribute('aria-hidden', 'true');
      head.insertBefore(cat, head.firstChild);
      head.insertBefore(sw, cat);
    });

    /* selvedge along the left edge */
    if (!document.querySelector('.cal-selv')) {
      var line = 'Priyank Patel ♦ AI product engineer ♦ Ahmedabad, India ♦ 23.02°N 72.57°E ♦ woven on the Anthropic SDK ♦ ';
      var sv = h('div', 'cal-selv', '<div>' + new Array(8).join(line) + '</div>'); sv.setAttribute('aria-hidden', 'true');
      document.body.appendChild(sv);
      if (!reduce) {
        var svIn = sv.firstChild;
        follow(function (y) { svIn.style.transform = 'rotate(180deg) translate3d(0,' + ((y * .35) % 2400).toFixed(2) + 'px,0)'; }, .1);
      }
    }

    /* stamps press in when they come into view */
    var marks = [].slice.call(document.querySelectorAll('.cal-band, .cal-st'));
    if (reduce || !('IntersectionObserver' in window)) { root.classList.add('cal-static'); }
    else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('cal-in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px' });
      var arm = function () { marks.forEach(function (m) { io.observe(m); }); };
      if (root.classList.contains('loading') || root.classList.contains('quick')) {
        var wait = setInterval(function () { if (!root.classList.contains('loading') && !root.classList.contains('quick')) { clearInterval(wait); arm(); } }, 120);
        setTimeout(function () { clearInterval(wait); arm(); }, 9500);
      } else arm();
    }

    /* every click leaves a block impression */
    if (!reduce) document.addEventListener('click', function (e) {
      if (!e.detail || e.clientX == null) return;
      var t = e.target;
      if (t.closest && t.closest('input, textarea, #graph, .band, .sheet, .cmdk')) return;
      var p = h('span', 'cal-press', '<b></b><i></i>');
      p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
      document.body.appendChild(p);
      var rot = (Math.random() * 30 - 15).toFixed(1);
      p.querySelector('i').animate([
        { transform: 'scale(1.8) rotate(' + rot + 'deg)', opacity: 0 },
        { transform: 'scale(.92) rotate(0deg)', opacity: .95, offset: .18 },
        { transform: 'scale(1)', opacity: .9, offset: .3 },
        { transform: 'scale(1.04)', opacity: 0 }
      ], { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)' });
      p.querySelector('b').animate({ transform: ['scale(.3)', 'scale(2.4)'], opacity: [.8, 0] }, { duration: 800, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = function () { p.remove(); };
    }, true);

    /* the loader: a border printed block by block while the page loads, and a slow watermark */
    var L = document.getElementById('loader');
    if (L && root.classList.contains('loading') && !L.querySelector('.cal-print')) {
      var wm = h('div', 'cal-wm'); L.insertBefore(wm, L.querySelector('.ld-top'));
      var N = innerWidth < 600 ? 10 : 18, row = h('div', 'cal-print'), tiles = [];
      for (var i = 0; i < N; i++) { var t = h('i'); row.appendChild(t); tiles.push(t); }
      L.appendChild(row);
      var ln = document.getElementById('loader-line'), shown = 0;
      var poll = function () {
        if (!L.isConnected) return;
        var m = /scaleX\(([\d.]+)\)/.exec(ln && ln.style.transform || ''), v = m ? +m[1] : 0, want = Math.min(N, Math.floor(v * N + .001));
        while (shown < want) { if (shown) tiles[shown - 1].classList.remove('hot'); tiles[shown].classList.add('on', 'hot'); shown++; }
        if (shown >= N && tiles[N - 1]) setTimeout(function () { tiles[N - 1].classList.remove('hot'); }, 300);
        requestAnimationFrame(poll);
      };
      requestAnimationFrame(poll);
    }

    /* theme: browser chrome colour and the no-view-transition fallback overlay */
    var meta = document.querySelector('meta[name="theme-color"]');
    function syncMeta() { if (meta) meta.setAttribute('content', tok('--bg')); readG(); }
    new MutationObserver(syncMeta).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        [].forEach.call(m.addedNodes, function (n) {
          if (n.nodeType === 1 && n.tagName === 'DIV' && !n.className && n.style.zIndex === '9999' && n.style.position === 'fixed') {
            n.style.background = root.getAttribute('data-theme') === 'light' ? '#0a1130' : '#f4f1e8';
          }
        });
      });
    }).observe(document.body, { childList: true });

    /* ---------- the graph, re-woven ----------
       Edges become running stitches, projects become lozenge knots, and every project
       hangs a warp and a weft thread across the loom, so the map reads as a check. */
    var cv = document.getElementById('graph'), G = {};
    function readG() { G = { tick: tok('--tick'), acc: tok('--accent'), rule: tok('--rule') }; }
    readG(); syncMeta();
    if (cv && cv.getContext) {
      var g = cv.getContext('2d'), P = CanvasRenderingContext2D.prototype, kind = null, lastR = 0, cur = [], knots = [], hotK = null, born = 0;
      var fd = Object.getOwnPropertyDescriptor(P, 'font');
      if (fd && fd.set) Object.defineProperty(g, 'font', { configurable: true, get: function () { return fd.get.call(this); }, set: function (v) { fd.set.call(this, String(v).replace(/"Geist Mono"/, '"IBM Plex Mono"')); } });
      g.beginPath = function () { kind = null; return P.beginPath.call(this); };
      g.lineTo = function (x, y) { kind = 'line'; return P.lineTo.call(this, x, y); };
      g.arc = function (x, y, r, a, b, c) { kind = 'arc'; lastR = r; return P.arc.call(this, x, y, r, a, b, c); };
      g.stroke = function () {
        var dash = null;
        if (kind === 'line' && this.lineWidth < 1.5) dash = [5, 3];
        else if (kind === 'arc' && lastR > 7) dash = [2, 3];
        if (!dash) return P.stroke.call(this);
        this.setLineDash(dash); P.stroke.call(this); this.setLineDash([]);
      };
      function diamond(ctx, cx, cy, r) { P.beginPath.call(ctx); P.moveTo.call(ctx, cx, cy - r); P.lineTo.call(ctx, cx + r, cy); P.lineTo.call(ctx, cx, cy + r); P.lineTo.call(ctx, cx - r, cy); P.closePath.call(ctx); kind = null; }
      g.fillRect = function (x, y, w, hh) {
        if (w > 0 && w <= 10 && Math.abs(w - hh) < .01) {
          var cx = x + w / 2, cy = y + hh / 2; cur.push({ x: cx, y: cy });
          diamond(this, cx, cy, w * .78); P.fill.call(this);
          return;
        }
        return P.fillRect.call(this, x, y, w, hh);
      };
      g.strokeRect = function (x, y, w, hh) {
        if (w === 16 && hh === 16) { hotK = { x: x + 8, y: y + 8 }; diamond(this, x + 8, y + 8, 12); P.stroke.call(this); return; }
        return P.strokeRect.call(this, x, y, w, hh);
      };
      g.clearRect = function (x, y, w, hh) {
        P.clearRect.call(this, x, y, w, hh);
        if (cur.length) { knots = cur; if (!born) born = performance.now(); }
        var hk = hotK; cur = []; hotK = null;
        if (!knots.length) return;
        var W = cv.clientWidth, H = cv.clientHeight, a = reduce ? 1 : Math.min(1, (performance.now() - born) / 2200); a = 1 - Math.pow(1 - a, 3);
        this.save();
        this.setTransform(this.getTransform());
        this.lineWidth = 1;
        knots.forEach(function (k, i) {
          var hot = hk && Math.abs(hk.x - k.x) < 1 && Math.abs(hk.y - k.y) < 1;
          g.strokeStyle = hot ? G.acc : G.tick; g.globalAlpha = (hot ? .7 : .26) * a;
          // weft
          g.setLineDash([7, 5]); g.lineDashOffset = -k.x;
          P.beginPath.call(g); P.moveTo.call(g, 0, Math.round(k.y) + .5); P.lineTo.call(g, W * a, Math.round(k.y) + .5); P.stroke.call(g);
          // warp, offset so it passes over where the weft passes under
          g.lineDashOffset = -k.y + 6;
          P.beginPath.call(g); P.moveTo.call(g, Math.round(k.x) + .5, 0); P.lineTo.call(g, Math.round(k.x) + .5, H * a); P.stroke.call(g);
        });
        this.setLineDash([]); this.restore(); kind = null;
      };
    }
  }

  var ran = false;
  function go() { if (ran) return; ran = true; try { init(); } catch (e) { console.error(e); } }
  if (document.readyState === 'complete') go(); else { document.addEventListener('DOMContentLoaded', go); window.addEventListener('load', go); }
})();
