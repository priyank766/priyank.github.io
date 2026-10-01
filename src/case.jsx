import React from 'react';
import ReactDOM from 'react-dom/client';
import CasePage from './components/CasePage.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CasePage />
    </ThemeProvider>
  </React.StrictMode>,
);
