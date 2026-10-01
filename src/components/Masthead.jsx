import { useTheme } from '../context/ThemeContext.jsx';

const nav = [
  { href: '#now', label: 'Now' },
  { href: '#open-source', label: 'Open source' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Masthead() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <header className="row masthead mono">
      <div className="margin">
        <a className="monogram" href="#main" aria-label="Priyank Patel, back to top">
          P.P.
        </a>
      </div>
      <div className="body masthead-body">
        <nav aria-label="Sections">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${next} theme`}
        >
          {next === 'dark' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
}
