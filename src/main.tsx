import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PlanetPositions from './pages/PlanetPositions.tsx';
import './styles/starry-theme.css';
import 'flatpickr/dist/themes/material_blue.css';
import { LoadingProvider } from './contexts/LoadingContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <LoadingProvider>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/planet-positions" element={<PlanetPositions />} />
          </Routes>
        </Router>
      </I18nextProvider>
    </LoadingProvider>
  </StrictMode>
);