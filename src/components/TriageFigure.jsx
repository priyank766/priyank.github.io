import { useLayoutEffect, useMemo, useRef, useState } from 'react';

// Fig. 1: a schematic of how Right Hand reads an inbox.
//   a. incoming mail
//   b. the 100+ open situations the Interpreter groups it into
//   c. the five the Chief of Staff picks for today
// One of the five is always traced back to its situation and its emails.
// Hovering, tapping, or focusing a number traces that one instead.
//
// The complete, final drawing is the default. The one-time drawing
// sequence is a progressive enhancement that only runs when the figure
// is on screen at load, and it snaps to the final state if anything
// interrupts it (scrolling away, hiding the tab, following a link).

function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLS = 12;
const ROWS = 9; // 108 situations
const PICKS = [14, 33, 51, 76, 94]; // indices into the 12 x 9 grid
const PICK_N = [3, 2, 4, 3, 2]; // emails behind each pick, same in both variants
const PLAY_MS = 4300;
const f1 = (n) => n.toFixed(1);

function layout(kind) {
  const wide = kind === 'wide';
  const r = rng(wide ? 7 : 11);
  const g = wide
    ? {
        w: 960,
        h: 286,
        a: { x: 0, y: 58, w: 350, rows: 18, step: 12.4 },
        b: { x: 410, y: 58, w: 280, h: 222 },
        c: { x: 768, y: 66, step: 44 },
        labels: [
          { x: 0, y: 12, t: 'a · Incoming mail', s: 'pulled from Microsoft Graph' },
          { x: 410, y: 12, t: 'b · 100+ open situations', s: 'grouped by the Interpreter' },
          { x: 768, y: 12, t: 'c · 5 for today', s: 'chosen by the Chief of Staff' },
        ],
      }
    : {
        w: 340,
        h: 492,
        a: { x: 0, y: 50, w: 340, rows: 7, step: 12 },
        b: { x: 0, y: 182, w: 340, h: 160 },
        c: { x: 0, y: 398, step: 22 },
        labels: [
          { x: 0, y: 12, t: 'a · Incoming mail', s: 'pulled from Microsoft Graph' },
          { x: 0, y: 144, t: 'b · 100+ open situations', s: 'grouped by the Interpreter' },
          { x: 0, y: 360, t: 'c · 5 for today', s: 'chosen by the Chief of Staff' },
        ],
      };

  // a: lines of dashes, like subject lines on a page
  const dashes = [];
  for (let row = 0; row < g.a.rows; row++) {
    let x = g.a.x + (row % 3 === 0 ? 0 : r() * 6);
    const y = g.a.y + row * g.a.step;
    for (;;) {
      const len = 6 + r() * 26;
      if (x + len > g.a.x + g.a.w) break;
      dashes.push({ x1: x, x2: x + len, y, row });
      x += len + 4 + r() * 3;
    }
  }

  // b: each situation is a small bundle of 1 to 4 related messages
  const cw = g.b.w / COLS;
  const ch = g.b.h / ROWS;
  const bundles = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    const c = i % COLS;
    const rr = Math.floor(i / COLS);
    const picked = PICKS.includes(i);
    const n = picked ? PICK_N[PICKS.indexOf(i)] : 1 + Math.floor(r() * 4);
    const bw = cw * (0.5 + r() * 0.2);
    const x = g.b.x + c * cw;
    const y = g.b.y + rr * ch + (ch - (n - 1) * 3.6) / 2 - 2;
    const lines = Array.from({ length: n }, (_, j) => ({
      x1: x,
      x2: x + bw * (j === 0 ? 1 : 0.55 + r() * 0.4),
      y: y + j * 3.6,
    }));
    bundles.push({ i, lines, x, y, bw, n, picked });
  }

  // c: five rows, each a situation and its recommended next step
  const today = PICKS.map((p, k) => {
    const y = g.c.y + k * g.c.step;
    const x = g.c.x + 22;
    return {
      k,
      y,
      nx: g.c.x,
      x1: x,
      x2: x + (wide ? 118 + r() * 54 : 150 + r() * 80),
      sx2: x + (wide ? 56 + r() * 60 : 90 + r() * 80),
      d: 2700 + k * 110,
    };
  });

  // For each pick: the emails it came from, and how they connect.
  const used = new Set();
  const traces = PICKS.map((p, k) => {
    const b = bundles[p];
    const t = today[k];
    const emails = [];
    while (emails.length < b.n) {
      const idx = Math.floor(r() * dashes.length);
      if (used.has(idx)) continue;
      used.add(idx);
      emails.push(dashes[idx]);
    }
    const toBundle = emails.map((e, j) => {
      const sx = (e.x1 + e.x2) / 2;
      const ty = b.lines[j].y;
      if (wide) {
        const ex = b.x - 3;
        const mx = e.x2 + (ex - e.x2) * 0.5;
        return `M${f1(e.x2 + 2)},${f1(e.y)} C${f1(mx)},${f1(e.y)} ${f1(mx)},${f1(ty)} ${f1(ex)},${f1(ty)}`;
      }
      const ex = b.x + b.bw / 2;
      const ey = b.y - 3;
      return `M${f1(sx)},${f1(e.y + 2)} C${f1(sx)},${f1(e.y + 40)} ${f1(ex)},${f1(ey - 40)} ${f1(ex)},${f1(ey)}`;
    });
    let leader = null;
    if (wide) {
      const sx = b.x + b.bw + 3;
      const sy = b.y;
      const ex = t.nx - 6;
      const ey = t.y - 4;
      const mx = sx + (ex - sx) * 0.55;
      leader = `M${f1(sx)},${f1(sy)} C${f1(mx)},${f1(sy)} ${f1(mx)},${f1(ey)} ${f1(ex)},${f1(ey)}`;
    }
    return { k, b, t, emails, toBundle, leader, d: 2250 + k * 90 };
  });

  return { g, wide, dashes, bundles, today, traces };
}

const linesPath = (lines) => lines.map((l) => `M${f1(l.x1)},${f1(l.y)}H${f1(l.x2)}`).join('');

function Panel({ kind, active, onPick }) {
  const { g, wide, dashes, bundles, today, traces } = useMemo(() => layout(kind), [kind]);
  const tr = traces[active];
  const key = (k) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPick(k);
    }
  };
  return (
    <svg
      className={`triage triage--${kind}`}
      viewBox={`0 0 ${g.w} ${g.h}`}
      role="group"
      aria-label="Fig. 1, interactive schematic. Choose an item to trace it back to its emails."
    >
      <g className="t-mail">
        <path d={linesPath(dashes)} />
      </g>
      <g className="t-rest">
        <path d={bundles.filter((b) => !b.picked).map((b) => linesPath(b.lines)).join('')} />
      </g>
      <g className="t-picked">
        <path d={bundles.filter((b) => b.picked).map((b) => linesPath(b.lines)).join('')} />
      </g>

      {wide && (
        <g className="t-leaders">
          {traces.map((t) => (
            <path key={t.k} d={t.leader} pathLength="1" style={{ '--d': `${t.d}ms` }} />
          ))}
        </g>
      )}
      {!wide && (
        <g className="t-picknums">
          {traces.map((t) => (
            <text
              key={t.k}
              x={t.b.x + t.b.bw + 4}
              y={t.b.y + 4}
              className={t.k === active ? 't-picknum is-active' : 't-picknum'}
              style={{ '--d': `${t.d}ms` }}
            >
              {t.k + 1}
            </text>
          ))}
        </g>
      )}

      <g className="t-today">
        {today.map((t) => (
          <g key={t.k} className={t.k === active ? 't-row is-active' : 't-row'} style={{ '--d': `${t.d}ms` }}>
            <text x={t.nx} y={t.y + 5} className="t-num">
              {t.k + 1}
            </text>
            <line className="t-item" x1={t.x1} x2={t.x2} y1={t.y} y2={t.y} />
            <line className="t-step" x1={t.x1} x2={t.sx2} y1={t.y + 8} y2={t.y + 8} />
          </g>
        ))}
      </g>

      {/* The traced situation: its emails, the grouping, and the pick. */}
      <g className="t-trace" key={active}>
        <path className="t-trace-links" d={tr.toBundle.join('')} />
        <path className="t-trace-mail" d={linesPath(tr.emails)} />
        <path className="t-trace-bundle" d={linesPath(tr.b.lines)} />
        {tr.leader && <path className="t-trace-leader" d={tr.leader} />}
      </g>

      {/* Labels sit above the trace, with a paper halo so lines pass behind them. */}
      {g.labels.map((l) => (
        <g key={l.t} className="t-label">
          <text x={l.x} y={l.y + 4} className="t-head">
            {l.t}
          </text>
          <text x={l.x} y={l.y + 22} className="t-sub">
            {l.s}
          </text>
        </g>
      ))}

      {/* Hit targets: every pick, in panel b and in panel c. */}
      <g className="t-hits">
        {traces.map((t) => {
          const label = `Trace item ${t.k + 1}: ${t.b.n} related emails grouped into one situation`;
          const common = {
            role: 'button',
            tabIndex: 0,
            'aria-label': label,
            'aria-pressed': t.k === active,
            onMouseEnter: () => onPick(t.k),
            onFocus: () => onPick(t.k),
            onClick: () => onPick(t.k),
            onKeyDown: key(t.k),
          };
          return (
            <g key={t.k}>
              <rect
                className="t-hit"
                x={t.t.nx - 6}
                y={t.t.y - (wide ? 18 : 12)}
                width={g.w - t.t.nx + 6}
                height={wide ? 36 : 21}
                {...common}
              />
              <rect
                className="t-hit"
                x={t.b.x - 4}
                y={t.b.y - 6}
                width={t.b.bw + (wide ? 8 : 18)}
                height={(t.b.n - 1) * 3.6 + 12}
                {...common}
                tabIndex={-1}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default function TriageFigure() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (still || document.visibilityState !== 'visible' || window.location.hash) return undefined;
    const box = el.getBoundingClientRect();
    if (box.top > window.innerHeight * 0.85 || box.bottom < 0) return undefined;

    el.classList.add('is-playing');
    let done = false;
    let io = null;
    const finish = () => {
      if (done) return;
      done = true;
      el.classList.remove('is-playing');
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('hashchange', finish);
      io?.disconnect();
    };
    const onHidden = () => {
      if (document.visibilityState !== 'visible') finish();
    };
    const timer = window.setTimeout(finish, PLAY_MS);
    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('hashchange', finish);
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        if (entries.some((e) => !e.isIntersecting)) finish();
      });
      io.observe(el);
    }
    return finish;
  }, []);

  return (
    <figure className="triage-figure" ref={ref} aria-labelledby="fig1-caption">
      <Panel kind="wide" active={active} onPick={setActive} />
      <Panel kind="tall" active={active} onPick={setActive} />
      <figcaption id="fig1-caption">
        <span className="fig-no">Fig. 1.</span> How Right Hand reads an inbox. The Interpreter groups mail into
        situations; the Chief of Staff narrows 100+ of them to the 5 for today. Schematic, counts illustrative.
      </figcaption>
      <p className="fig-status mono" aria-live="polite">
        <span className="fig-status-k">{active + 1} of 5</span> {PICK_N[active]} related emails → one situation →
        one recommended next step. <span className="fig-hint">Hover or tap a number to trace another.</span>
      </p>
    </figure>
  );
}
