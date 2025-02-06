import './lib/polyfills';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PlanetPositions from './pages/PlanetPositions.tsx';
import NotFound from './pages/NotFound.tsx';
import './styles/starry-theme.css';
import 'flatpickr/dist/themes/material_blue.css';
import { LoadingProvider } from './contexts/LoadingContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Initialize Sentry
Sentry.init({
  dsn: "vom_adauga_dsn_ul_mai_tarziu",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Log error to console as well
    console.error('Error caught by Sentry:', event);
    return event;
  },
});

// Add global error boundary
const ErrorFallback = ({ error }) => {
  console.error('Error in ErrorBoundary:', error);
  return (
    <div className="error-container" style={{
      padding: '20px',
      margin: '20px',
      border: '1px solid red',
      borderRadius: '8px',
      backgroundColor: '#fff'
    }}>
      <h2>Something went wrong</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      <button onClick={() => window.location.reload()} 
              style={{
                padding: '10px 20px',
                backgroundColor: '#007AFF',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                marginTop: '10px'
              }}>
        Refresh Page
      </button>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <Sentry.ErrorBoundary fallback={ErrorFallback}>
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