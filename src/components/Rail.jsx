import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

// Section index. A sticky rail in the left margin on wide screens,
// a compact sticky bar on narrow ones. The current section is marked.
export const sections = [
  { id: 'now', n: '1', label: 'Now' },
  { id: 'open-source', n: '2', label: 'Open source' },
  { id: 'projects', n: '3', label: 'Projects' },
  { id: 'background', n: '4', label: 'Background', optional: true },
  { id: 'contact', n: '5', label: 'Contact' },
];

function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const current = sections.find((s) => visible.get(s.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Rail() {
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <header className="rail mono">
      <a className="rail-name" href="#top">
        Priyank Patel
      </a>
      <nav aria-label="Sections">
        <ol>
          {sections.map((s) => (
            <li key={s.id} className={s.optional ? 'is-optional' : undefined}>
              <a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
                <span className="rail-n" aria-hidden="true">
                  §&thinsp;{s.n}
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${next} theme`}>
        {next === 'dark' ? 'Dark' : 'Light'}
      </button>
    </header>
  );
}
