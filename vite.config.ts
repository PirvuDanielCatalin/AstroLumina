import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    historyApiFallback: true,
  },
  build: {
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom', 'react-router-dom'],
          'i18n': ['i18next', 'react-i18next', 'i18next-http-backend'],
          'ui-libs': ['react-select', 'react-datetime', 'react-datepicker', 'react-flatpickr'],
          'utils': ['moment', 'axios', 'countries-and-timezones', 'country-state-city']
        }
      },
      treeshake: 'recommended'
    },
    modulePreload: {
      polyfill: true
    },
    sourcemap: true,
    minify: 'esbuild',
    cssMinify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'i18next',
      'react-i18next'
    ]
  },
  esbuild: {
    target: 'es2020',
    legalComments: 'none',
    treeShaking: true
  }
});