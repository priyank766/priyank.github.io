import Rail from './components/Rail.jsx';
import { Background, Contact, Intro, Now, OpenSource, Projects } from './components/Sections.jsx';
import { person } from './content.js';

export default function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Rail />
      <div className="content">
        <main id="main">
          <Intro />
          <Now />
          <OpenSource />
          <Projects />
          <Background />
          <Contact />
        </main>
        <footer className="colophon mono">
          <p>
            © {new Date().getFullYear()} {person.name}. Set in Newsreader and IBM Plex Mono.
          </p>
        </footer>
      </div>
    </div>
  );
}
