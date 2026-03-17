import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: set base to your repo name, e.g. base: '/Web-Project/'
  // so assets load correctly. Using HashRouter means routes still work without this.
  base: '/',
});
