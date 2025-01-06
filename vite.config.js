import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: 'electron/main.js',
        onstart: (options) => options.startup(),
      },
      {
        entry: 'electron/preload.mjs',
        vite: {
          build: {
            rollupOptions: {
              output: {
                entryFileNames: '[name].mjs', // Ensures .mjs extension
              },
            },
          },
        },
      },
    ]),
    renderer(),
  ],
  build: {
    rollupOptions: {
      output: {
        dir: 'dist-electron',
      },
    },
  },
});