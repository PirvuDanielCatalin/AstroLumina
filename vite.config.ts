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
          react: ['react', 'react-dom'],
        },
      },
    },
    modulePreload: {
      polyfill: true,
    },
    sourcemap: true,
    minify: 'esbuild'
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  esbuild: {
    target: 'es2020'
  }
});
