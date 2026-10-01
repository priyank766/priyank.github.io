import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Two pages: the home page and the Right Hand case study at /right-hand/.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rightHand: resolve(__dirname, 'right-hand/index.html'),
      },
    },
  },
});
