import { Fragment } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { Figures, Row, Stack } from './Layout.jsx';
import { now, person } from '../content.js';

// The full Right Hand case study, on its own page at /right-hand/.
export default function CasePage() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <div className="case-page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="case-bar mono">
        <a href="/">← {person.name}</a>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${next} theme`}>
          {next === 'dark' ? 'Dark' : 'Light'}
        </button>
      </header>
      <main id="main" className="case-main">
        <article>
          <Row aside={<Figures items={now.figures} />} className="now-row">
            <p className="meta mono">
              Case study · {now.role}, <a href={now.companyUrl}>{now.company}</a> · {now.dates}
            </p>
            <h1 className="case-h1">{now.project}</h1>
            <p className="dek">{now.dek}</p>
            <p className="dropcap">{now.summary}</p>

            <h2 className="run-in">Three agents</h2>
            <dl className="agents">
              {now.agents.map((a) => (
                <div key={a.name}>
                  <dt>{a.name}</dt>
                  <dd>{a.text}</dd>
                </div>
              ))}
            </dl>

            <blockquote className="pull">
              <p>{now.pull}</p>
            </blockquote>

            {now.details.map((d) => (
              <Fragment key={d.heading}>
                <h2 className="run-in">{d.heading}</h2>
                <p>{d.text}</p>
              </Fragment>
            ))}
            <Stack items={now.stack} />
            <p className="read-more back">
              <a href="/#now">← Back to the home page</a>
            </p>
          </Row>
        </article>
      </main>
      <footer className="colophon mono">
        <p>
          © {new Date().getFullYear()} {person.name}. Set in Newsreader and IBM Plex Mono.
        </p>
      </footer>
    </div>
  );
}
