import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: '../src/manifest.webmanifest', dest: '.' },
        { src: '../src/worker.js', dest: '.' },
      ],
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api/': {
        target: 'http://localhost:1337',
        changeOrigin: true,
      },
    },
  },
});
