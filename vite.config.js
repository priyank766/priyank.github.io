import { defineConfig } from 'vite';

// Single static page. Vite copies public/ (CNAME, icons) into dist/.
export default defineConfig({
  base: '/',
});
