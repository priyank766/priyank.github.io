// Layout primitives. Each row is a reading column plus a right-hand margin
// that carries figures and notes, like sidenotes in a book.

export function Section({ id, number, title, children }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <header className="section-head">
        <h2 id={headingId} className="label">
          <span className="label-n mono" aria-hidden="true">
            §&thinsp;{number}
          </span>
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

export function Row({ aside, className = '', children }) {
  return (
    <div className={`row ${className}`.trim()}>
      <div className="body">{children}</div>
      {aside ? <aside className="aside">{aside}</aside> : null}
    </div>
  );
}

export function Figures({ items }) {
  return (
    <dl className="figures">
      {items.map((f) => (
        <div key={f.fig}>
          <dt className="fig">{f.fig}</dt>
          <dd className="mono">{f.cap}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Stack({ items }) {
  if (!items?.length) return null;
  return (
    <p className="stack mono">
      <span className="visually-hidden">Built with: </span>
      {items.join(' · ')}
    </p>
  );
}
