import { useLayoutEffect, useMemo, useRef } from 'react';

// Fig. 1: a schematic of how Right Hand reads an inbox.
// Panel a is incoming mail, b is the open situations the Interpreter builds
// from it, and c is the five the Chief of Staff picks for today.
// It draws itself once when it scrolls into view and then stays still.
// With prefers-reduced-motion it renders in its final state immediately.

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

function layout(kind) {
  const wide = kind === 'wide';
  const r = rng(wide ? 7 : 11);
  const g = wide
    ? {
        w: 960,
        h: 282,
        a: { x: 0, y: 54, w: 350, rows: 18, step: 12.4 },
        b: { x: 410, y: 54, w: 280, h: 222 },
        c: { x: 762, y: 62, step: 44 },
        labels: [
          { x: 0, y: 12, t: 'a · Incoming mail', s: 'pulled from Microsoft Graph' },
          { x: 410, y: 12, t: 'b · 100+ open situations', s: 'grouped by the Interpreter' },
          { x: 762, y: 12, t: 'c · 5 for today', s: 'chosen by the Chief of Staff' },
        ],
      }
    : {
        w: 340,
        h: 540,
        a: { x: 0, y: 50, w: 340, rows: 8, step: 11.5 },
        b: { x: 0, y: 192, w: 340, h: 176 },
        c: { x: 0, y: 432, step: 26 },
        labels: [
          { x: 0, y: 12, t: 'a · Incoming mail', s: 'pulled from Microsoft Graph' },
          { x: 0, y: 154, t: 'b · 100+ open situations', s: 'grouped by the Interpreter' },
          { x: 0, y: 394, t: 'c · 5 for today', s: 'chosen by the Chief of Staff' },
        ],
      };

  // a: lines of dashes, like subject lines on a page
  const dashes = [];
  for (let row = 0; row < g.a.rows; row++) {
    let x = g.a.x + (row % 3 === 0 ? 0 : r() * 6);
    const y = g.a.y + row * g.a.step;
    while (true) {
      const len = 6 + r() * 26;
      if (x + len > g.a.x + g.a.w) break;
      dashes.push({ x1: x, x2: x + len, y });
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
    const n = 1 + Math.floor(r() * 4);
    const bw = cw * (0.5 + r() * 0.2);
    const x = g.b.x + c * cw;
    const y = g.b.y + rr * ch + (ch - (n - 1) * 3.6) / 2 - 2;
    const lines = Array.from({ length: n }, (_, j) => ({ x1: x, x2: x + bw * (j === 0 ? 1 : 0.55 + r() * 0.4), y: y + j * 3.6 }));
    bundles.push({ i, lines, x, y, bw, n, picked: PICKS.includes(i) });
  }

  // c: five rows, each a situation and its recommended next step
  const today = PICKS.map((p, k) => {
    const y = g.c.y + k * g.c.step;
    const x = g.c.x + (wide ? 22 : 20);
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

  // Wide: leader lines from each picked bundle to its row in c.
  // Tall: leaders would cross the grid, so picked bundles get a small numeral instead.
  const leaders = !wide
    ? []
    : PICKS.map((p, k) => {
        const b = bundles[p];
        const t = today[k];
        const sx = b.x + b.bw + 3;
        const sy = b.y;
        const ex = t.nx - 6;
        const ey = t.y - 4;
        const mx = sx + (ex - sx) * 0.55;
        const f = (n) => n.toFixed(1);
        return { k, path: `M${f(sx)},${f(sy)} C${f(mx)},${f(sy)} ${f(mx)},${f(ey)} ${f(ex)},${f(ey)}`, d: 2250 + k * 90 };
      });

  const pickNums = PICKS.map((p, k) => {
    const b = bundles[p];
    return { k, x: b.x + b.bw + 4, y: b.y + 4, d: 2250 + k * 90 };
  });

  return { g, dashes, bundles, today, leaders, pickNums: wide ? [] : pickNums };
}

function Panel({ kind, labelledBy }) {
  const { g, dashes, bundles, today, leaders, pickNums } = useMemo(() => layout(kind), [kind]);
  return (
    <svg
      className={`triage triage--${kind}`}
      viewBox={`0 0 ${g.w} ${g.h}`}
      role="img"
      aria-labelledby={labelledBy}
      focusable="false"
    >
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
      {/* Whole groups animate, not individual marks, to keep this cheap on phones. */}
      <g className="t-mail">
        <path d={dashes.map((s) => `M${s.x1.toFixed(1)},${s.y}H${s.x2.toFixed(1)}`).join('')} />
      </g>
      <g className="t-rest">
        <path
          d={bundles
            .filter((b) => !b.picked)
            .flatMap((b) => b.lines.map((l) => `M${l.x1.toFixed(1)},${l.y.toFixed(1)}H${l.x2.toFixed(1)}`))
            .join('')}
        />
      </g>
      <g className="t-picked">
        <path
          d={bundles
            .filter((b) => b.picked)
            .flatMap((b) => b.lines.map((l) => `M${l.x1.toFixed(1)},${l.y.toFixed(1)}H${l.x2.toFixed(1)}`))
            .join('')}
        />
      </g>
      <g className="t-leaders">
        {leaders.map((l) => (
          <path key={l.k} d={l.path} pathLength="1" style={{ '--d': `${l.d}ms` }} />
        ))}
      </g>
      <g className="t-picknums">
        {pickNums.map((n) => (
          <text key={n.k} x={n.x} y={n.y} className="t-picknum" style={{ '--d': `${n.d}ms` }}>
            {n.k + 1}
          </text>
        ))}
      </g>
      <g className="t-today">
        {today.map((t) => (
          <g key={t.k} className="t-row" style={{ '--d': `${t.d}ms` }}>
            <text x={t.nx} y={t.y + 4} className="t-num">
              {t.k + 1}
            </text>
            <line className="t-item" x1={t.x1} x2={t.x2} y1={t.y} y2={t.y} />
            <line className="t-step" x1={t.x1} x2={t.sx2} y1={t.y + 8} y2={t.y + 8} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function TriageFigure() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (still || !('IntersectionObserver' in window)) return undefined;
    el.classList.add('is-armed');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add('is-playing');
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="triage-figure" ref={ref}>
      <Panel kind="wide" labelledBy="fig1-caption" />
      <Panel kind="tall" labelledBy="fig1-caption" />
      <figcaption id="fig1-caption">
        <span className="fig-no">Fig. 1.</span> How Right Hand reads an inbox. The Interpreter groups related mail
        into situations. The Chief of Staff narrows 100+ open situations to the 5 that need action today and
        recommends a next step for each. Schematic; counts are illustrative.
      </figcaption>
    </figure>
  );
}
