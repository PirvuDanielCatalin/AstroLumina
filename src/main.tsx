import './lib/polyfills';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './styles/starry-theme.css';
import 'flatpickr/dist/themes/material_blue.css';
import { LoadingProvider } from './contexts/LoadingContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';
import PlanetPositions from './pages/PlanetPositions.tsx';
import NotFound from './pages/NotFound.tsx';
import * as Sentry from "@sentry/react";

// Initialize Sentry
Sentry.init({
  dsn: "https://55f378ef29cb906438317cd13705730f@o4508774232948736.ingest.de.sentry.io/4508776705622096",
  environment: import.meta.env.MODE, // 'development' sau 'production'
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.2, // Sample rate mai mare în development
  tracePropagationTargets: [
    "localhost",
    "astrolumina.netlify.app"
  ],
  // Session Replay
  replaysSessionSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
  replaysOnErrorSampleRate: 1.0,
  // Error Handling
  beforeSend(event) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Sentry error:', event);
    }
    return event;
  },
  // Browser
  enabled: true,
  debug: import.meta.env.DEV,
  ignoreErrors: [
    // Ignoră erori comune care nu sunt relevante
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    /^Network request failed/,
  ],
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={({ error }) => (
        <div className="error-container p-4 m-4 border border-red-500 rounded-lg bg-white">
          <h2 className="text-xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded">
            {error.message}
          </pre>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
            <button
              onClick={() => {
                const errors = localStorage.getItem('app_errors');
                if (errors) {
                  const blob = new Blob([errors], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'app-errors.json';
                  a.click();
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Download Error Log
            </button>
          </div>
        </div>
      )}
    >
      <LoadingProvider>
        <I18nextProvider i18n={i18n}>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/planet-positions" element={<PlanetPositions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </I18nextProvider>
      </LoadingProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);

// Add unhandled rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  Sentry.captureException(event.reason);
});

// Add error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  Sentry.captureException(event.error);
});