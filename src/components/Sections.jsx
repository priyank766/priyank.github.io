import { Fragment } from 'react';
import { Row, Section, Stack } from './Layout.jsx';
import {
  earlier,
  education,
  links,
  now,
  openSource,
  otherProjects,
  person,
  projects,
  skills,
} from '../content.js';

const host = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function Intro() {
  return (
    <div className="row intro">
      <div className="margin mono" />
      <div className="body">
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
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        <ul className="link-line mono" aria-label="Elsewhere">
          <li>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </li>
          <li>
            <a href={links.github}>GitHub</a>
          </li>
          <li>
            <a href={links.linkedin}>LinkedIn</a>
          </li>
          <li>{person.location}</li>
        </ul>
      </div>
    </div>
  );
}

export function Now() {
  return (
    <Section id="now" number="1" title="Now">
      <Row
        margin={
          <>
            <span>{now.dates}</span>
            <span>{now.place}</span>
          </>
        }
      >
        <p className="position">
          {now.role}, <a href={now.companyUrl}>{now.company}</a>
        </p>
        <h3 className="case-title">{now.project}</h3>
        <p className="dek">{now.dek}</p>
        {now.intro.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        {now.sections.map((s) => (
          <Fragment key={s.heading}>
            <h4 className="run-in">{s.heading}</h4>
            {s.paragraphs?.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            {s.agents && (
              <dl className="agents">
                {s.agents.map((a) => (
                  <div key={a.name}>
                    <dt>{a.name}</dt>
                    <dd>{a.text}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Fragment>
        ))}
        <Stack items={now.stack} />
      </Row>
    </Section>
  );
}

export function OpenSource() {
  return (
    <Section id="open-source" number="2" title="Open source">
      <Row margin={<span>{openSource.orgNote}</span>}>
        <h3 className="item-title">{openSource.org}</h3>
        <p>
          I’m a code reviewer for kubeflow/mcp-server, listed in its OWNERS file after{' '}
          <a href={openSource.intro.reviewerUrl}>the maintainers nominated me</a>. I’m also an{' '}
          <a href={openSource.intro.memberUrl}>official member</a> of the Kubeflow organization.
        </p>
      </Row>
      {openSource.repos.map((repo) => (
        <Row key={repo.name} className="pr-group">
          <h4 className="repo mono">
            <a href={repo.url}>{repo.name}</a>
          </h4>
          <ol className="prs">
            {repo.prs.map((pr) => (
              <li key={pr.n}>
                <a className="mono pr-num" href={pr.url} aria-label={`${repo.name} pull request ${pr.n}`}>
                  #{pr.n}
                </a>
                <span>{pr.text}</span>
              </li>
            ))}
          </ol>
        </Row>
      ))}
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects" number="3" title="Selected projects">
      {projects.map((p) => (
        <Row key={p.name} className="project" margin={<span>{p.kind}</span>}>
          <h3 className="item-title">{p.url ? <a href={p.url}>{p.name}</a> : p.name}</h3>
          <p className="dek">{p.dek}</p>
          {p.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <Stack items={p.stack} />
          {p.url && (
            <p className="mono project-link">
              <a href={p.url}>{p.urlLabel ?? host(p.url)}</a>
            </p>
          )}
        </Row>
      ))}
      <Row className="also" margin={<span>Also</span>}>
        <h3 className="visually-hidden">Other projects</h3>
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
      {earlier.map((e) => (
        <Row key={e.role} margin={<span>{e.dates}</span>}>
          <h3 className="item-title small">{e.role}</h3>
          <p>{e.text}</p>
          <Stack items={e.stack} />
        </Row>
      ))}
      <Row margin={<span>{education.dates}</span>}>
        <h3 className="item-title small">{education.degree}</h3>
        <p>
          {education.school}. {education.note}
        </p>
      </Row>
      <Row margin={<span>Tools</span>}>
        <h3 className="visually-hidden">Skills</h3>
        <dl className="skills">
          {skills.map((s) => (
            <div key={s.label}>
              <dt className="mono">{s.label}</dt>
              <dd>{s.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Row>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" number="5" title="Contact">
      <Row>
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
        </ul>
      </Row>
    </Section>
  );
}
