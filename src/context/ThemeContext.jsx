import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// The reader's explicit choice is stored; otherwise the OS preference wins.
// index.html applies the stored choice before first paint to avoid a flash.
const STORAGE_KEY = 'pp-theme-choice';
const query = '(prefers-color-scheme: dark)';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function systemTheme() {
  return typeof window !== 'undefined' && window.matchMedia?.(query).matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [choice, setChoice] = useState(readStored);
  const [system, setSystem] = useState(systemTheme);

  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return undefined;
    const onChange = () => setSystem(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (choice) root.setAttribute('data-theme', choice);
    else root.removeAttribute('data-theme');
  }, [choice]);

  const theme = choice ?? system;

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setChoice(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the choice lasts for this visit only */
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
