import { Fragment } from 'react';
import { Figures, Row, Section, Stack } from './Layout.jsx';
import TriageFigure from './TriageFigure.jsx';
import {
  earlier,
  education,
  glance,
  links,
  now,
  openSource,
  otherProjects,
  person,
  projects,
  skills,
} from '../content.js';

function Elsewhere({ label = 'Elsewhere' }) {
  return (
    <ul className="link-line mono" aria-label={label}>
      <li>
        <a href={`mailto:${links.email}`}>{links.email}</a>
      </li>
      <li>
        <a href={links.github}>GitHub</a>
      </li>
      <li>
        <a href={links.linkedin}>LinkedIn</a>
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
      <Row
        className="intro-row"
        aside={
          <dl className="glance" aria-label="At a glance">
            {glance.map((g) => (
              <div key={g.label}>
                <dt className="mono">{g.label}</dt>
                {g.lines.map((l) => (
                  <dd key={l}>{l}</dd>
                ))}
              </div>
            ))}
          </dl>
        }
      >
        <h1>{person.name}</h1>
        <p className="roles">
          {person.roles.map((r, i) => (
            <Fragment key={r}>
              {i > 0 && ' · '}
              <span className="nowrap">{r}</span>
            </Fragment>
          ))}
        </p>
        <p className="lede">{person.positioning}</p>
        {person.about.map((p) => (
          <p key={p.slice(0, 24)} className="about">
            {p}
          </p>
        ))}
        <Elsewhere />
      </Row>
      <TriageFigure />
    </div>
  );
}

export function Now() {
  return (
    <Section id="now" number="1" title="Now">
      <Row className="now-row" aside={<Figures items={now.figures} />}>
        <p className="meta mono">
          {now.role}, <a href={now.companyUrl}>{now.company}</a> · {now.dates} · {now.place}
        </p>
        <h3 className="case-title">{now.project}</h3>
        <p className="dek">{now.dek}</p>
        <p className="dropcap">{now.summary}</p>

        <h4 className="run-in">Three agents</h4>
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

        <details className="more">
          <summary className="mono">
            <span className="more-open">Read the full case study</span>
            <span className="more-close">Close the case study</span>
          </summary>
          <div className="more-body">
            {now.details.map((d) => (
              <Fragment key={d.heading}>
                <h4 className="run-in">{d.heading}</h4>
                <p>{d.text}</p>
              </Fragment>
            ))}
          </div>
        </details>
        <Stack items={now.stack} />
      </Row>
    </Section>
  );
}

export function OpenSource() {
  return (
    <Section id="open-source" number="2" title="Open source">
      <Row aside={<Figures items={[openSource.figure]} />}>
        <p className="meta mono">
          {openSource.org} · {openSource.orgNote}
        </p>
        <p className="headline">
          Code Reviewer for kubeflow/mcp-server, listed in OWNERS after{' '}
          <a href={openSource.reviewerUrl}>the maintainers nominated me</a>.{' '}
          <a href={openSource.memberUrl}>Official member</a> of the Kubeflow organization.
        </p>
        <dl className="themes">
          {openSource.themes.map((t) => (
            <div key={t.label}>
              <dt className="mono">{t.label}</dt>
              <dd>
                {t.items.map((item) => (
                  <Fragment key={item.text}>
                    {item.text}{' '}
                    {item.refs.map((r) => (
                      <a
                        key={r.n}
                        className="pr mono"
                        href={r.url}
                        aria-label={`kubeflow/${r.repo} pull request ${r.n}`}
                      >
                        {r.repo === 'sdk' ? 'sdk' : ''}#{r.n}
                      </a>
                    ))}
                    {'. '}
                  </Fragment>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Row>
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
                      {p.name}<span className="kind mono">{p.kind}</span>
                    </span>
                    <span className="project-dek">{p.dek}</span>
                  </span>
                  <span className="aside project-fig">
                    <span className="fig">{p.figure.fig}</span>
                    <span className="fig-cap mono">{p.figure.cap}</span>
                  </span>
                  <span className="toggle mono" aria-hidden="true">
                    <span className="more-open">Details</span>
                    <span className="more-close">Close</span>
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
      <Row className="also">
        <h3 className="run-in">Also</h3>
        <ul className="also-list">
          {otherProjects.map((p) => (
            <li key={p.name}>
              <a href={p.url}>{p.name}</a>. {p.text}
            </li>
          ))}
        </ul>
      </Row>
    </Section>
  );
}

export function Background() {
  return (
    <Section id="background" number="4" title="Background">
      <Row className="bg-row">
        {earlier.map((e) => (
          <div className="entry" key={e.role}>
            <p className="meta mono">{e.dates}</p>
            <h3 className="item-title">{e.role}</h3>
            <p>{e.text}</p>
            <Stack items={e.stack} />
          </div>
        ))}
        <div className="entry">
          <p className="meta mono">{education.dates}</p>
          <h3 className="item-title">{education.degree}</h3>
          <p>
            {education.school}. {education.note}
          </p>
        </div>
      </Row>
      <div className="row tools-row">
        <div className="body wide">
          <h3 className="run-in">Tools</h3>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.label}>
                <dt className="mono">{s.label}</dt>
                <dd>{s.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" number="5" title="Contact">
      <Row aside={<p className="mono aside-note">{person.location}</p>}>
        <p className="contact-line">
          Email is the best way to reach me: <a href={`mailto:${links.email}`}>{links.email}</a>.
        </p>
        <ul className="link-line mono" aria-label="Elsewhere">
          <li>
            <a href={links.github}>github.com/priyank766</a>
          </li>
          <li>
            <a href={links.linkedin}>linkedin.com/in/priyank766</a>
          </li>
          <li>
            <a href={links.x}>X · x.com/priyank766</a>
          </li>
        </ul>
      </Row>
    </Section>
  );
}
