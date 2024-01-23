import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import vercel from 'vite-plugin-vercel';

import { resolve } from 'path';
const src = resolve(__dirname, './src');
const _public = resolve(__dirname, './public');

export default defineConfig({
  // base: '',
  plugins: [
    react(),
    legacy({ targets: ['IE >= 11'] }),
    vercel(),
  ],
  server: { port: 3030 },
  build: { minify: true },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/vars.scss";
          @import "@/styles/mixins.scss";
        `
      }
    },
    // postcss: { plugins: [autoprefixer()] }
  },
  resolve: {
    alias: {
      '@': resolve(src),
      '@scripts': resolve(src, 'scripts'),
      '@styles': resolve(src, 'styles'),
      '@store': resolve(src, 'store'),
      // assets
      '@images': resolve(src, 'assets/images'),
      '@icons': resolve(src, 'assets/icons'),
      '@fonts': resolve(src, 'assets/fonts'),
      '@sounds': resolve(src, 'assets/sounds'),
      '@data': resolve(src, 'assets/data'),
      // react
      '@pages': resolve(src, 'pages'),
      '@components': resolve(src, 'components'),
      '@hooks': resolve(src, 'hooks'),
      '@contexts': resolve(src, 'contexts'),
      '@ui': resolve(src, 'ui'),
    }
  }
})