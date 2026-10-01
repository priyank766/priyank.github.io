import { Fragment } from 'react';
import { Figures, Row, Section, Stack } from './Layout.jsx';
import TriageFigure from './TriageFigure.jsx';
import {
  earlier,
  education,
  hero,
  links,
  now,
  openSource,
  otherProjects,
  person,
  projects,
  skills,
} from '../content.js';

export const CASE_URL = '/right-hand/';

export function Elsewhere({ label = 'Elsewhere', full = false }) {
  return (
    <ul className="link-line mono" aria-label={label}>
      <li>
        <a href={`mailto:${links.email}`}>{links.email}</a>
      </li>
      <li>
        <a href={links.github}>{full ? 'github.com/priyank766' : 'GitHub'}</a>
      </li>
      <li>
        <a href={links.linkedin}>{full ? 'linkedin.com/in/priyank766' : 'LinkedIn'}</a>
      </li>
      <li>
        <a href={links.x}>X</a>
      </li>
    </ul>
  );
}

export function Intro() {
  return (
    <div className="intro" id="top">
      <header className="hero">
        <div className="hero-top">
          <h1>
            {person.name}
            <span className="roles">
              {person.roles.map((r, i) => (
                <Fragment key={r}>
                  {i > 0 && ' · '}
                  <span className="nowrap">{r}</span>
                </Fragment>
              ))}
            </span>
          </h1>
          <Elsewhere />
        </div>
        <p className="statement">
          {hero.statement.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <p className="hero-lede">{hero.lede}</p>
      </header>
      <TriageFigure />
    </div>
  );
}

export function Now() {
  return (
    <Section id="now" number="1" title="Now">
      <Row>
        <p className="meta mono">
          {now.role}, <a href={now.companyUrl}>{now.company}</a> · {now.dates} · {now.place}
        </p>
        <div className="now-head">
          <h3 className="case-title">{now.project}</h3>
          <p className="one-line">{now.line}</p>
        </div>
      </Row>
      <div className="figure-strip">
        <Figures items={now.homeFigures} />
      </div>
      <p className="read-more">
        <a href={CASE_URL}>Read the case study →</a>
      </p>
    </Section>
  );
}

export function OpenSource() {
  return (
    <Section id="open-source" number="2" title="Open source">
      <div className="wide-block">
        <p className="one-line">
          Code Reviewer for kubeflow/mcp-server, <a href={openSource.reviewerUrl}>nominated by the maintainers</a>, and
          an <a href={openSource.memberUrl}>official member</a> of the Kubeflow organization.
        </p>
        <dl className="themes">
          {openSource.themes.map((t) => (
            <div key={t.label}>
              <dt className="mono">{t.label}</dt>
              <dd>{t.short}</dd>
            </div>
          ))}
        </dl>
        <p className="mono quiet-link">
          <a href={openSource.contributionsUrl}>See my contributions on GitHub</a>
        </p>
      </div>
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects" number="3" title="Selected projects">
      <ol className="project-index">
        {projects.map((p) => (
          <li key={p.name}>
            <details className="project">
              <summary>
                <span className="row">
                  <span className="body">
                    <span className="project-name">
                      {p.name}
                      <span className="kind mono">{p.kind}</span>
                    </span>
                    <span className="project-dek">
                      {p.dek}{' '}
                      <span className="toggle mono" aria-hidden="true">
                        <span className="more-open">More</span>
                        <span className="more-close">Less</span>
                      </span>
                    </span>
                  </span>
                  <span className="aside project-fig">
                    <span className="fig">{p.figure.fig}</span>
                    <span className="fig-cap mono">{p.figure.cap}</span>
                  </span>
                </span>
              </summary>
              <div className="row project-detail">
                <div className="body">
                  {p.body.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                  <Stack items={p.stack} />
                  {p.url && (
                    <p className="mono project-link">
                      <a href={p.url}>{p.urlLabel}</a>
                    </p>
                  )}
                </div>
              </div>
            </details>
          </li>
        ))}
      </ol>
      <p className="also-line">
        <span className="mono also-label">Also</span>
        {otherProjects.map((p, i) => (
          <Fragment key={p.name}>
            {i > 0 && (i === otherProjects.length - 1 ? ', and ' : ', ')}
            <a href={p.url} title={p.text}>
              {p.name}
            </a>
          </Fragment>
        ))}
        .
      </p>
    </Section>
  );
}

export function Background() {
  const e = earlier[0];
  return (
    <Section id="background" number="4" title="Background">
      <dl className="ledger">
        <div>
          <dt className="mono">{e.dates}</dt>
          <dd>{e.short}</dd>
        </div>
        <div>
          <dt className="mono">{education.dates}</dt>
          <dd>
            B.E. in AI &amp; ML, L.D. College of Engineering, Ahmedabad (GTU). CGPA 8.43.
          </dd>
        </div>
        <div>
          <dt className="mono">Tools</dt>
          <dd>
            <details className="more tools">
              <summary className="mono">
                <span className="more-open">Python, TypeScript, Go, Anthropic SDK, LangGraph, and more</span>
                <span className="more-close">Close</span>
              </summary>
              <dl className="skills">
                {skills.map((s) => (
                  <div key={s.label}>
                    <dt className="mono">{s.label}</dt>
                    <dd>{s.items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </dd>
        </div>
      </dl>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" number="5" title="Contact">
      <p className="contact-line">
        Write to me at <a href={`mailto:${links.email}`}>{links.email}</a>, or find me on{' '}
        <a href={links.github}>GitHub</a>, <a href={links.linkedin}>LinkedIn</a>, and <a href={links.x}>X</a>.
      </p>
    </Section>
  );
}
