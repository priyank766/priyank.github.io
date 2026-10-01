// Layout primitives. Every row on the page is a two-column grid:
// a narrow margin for dates and labels, and a single reading column.

export function Section({ id, number, title, children }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <header className="row section-head">
        <span className="margin mono" aria-hidden="true">
          §&thinsp;{number}
        </span>
        <h2 id={headingId} className="label">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

export function Row({ margin, className = '', children }) {
  return (
    <div className={`row ${className}`.trim()}>
      <div className="margin mono">{margin}</div>
      <div className="body">{children}</div>
    </div>
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
