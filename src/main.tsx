import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PlanetPositions from './pages/PlanetPositions.tsx';
import Login from './pages/Login.tsx';
import ResetPassword from './pages/ResetPassword.tsx';
import UpdatePassword from './pages/UpdatePassword.tsx';
import EditProfile from './pages/EditProfile.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <LoadingProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/planet-positions" element={<PlanetPositions />} />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              /> */}
            </Routes>
          </Router>
        </LoadingProvider>
      </AuthProvider>
    </I18nextProvider>
  </StrictMode>
);