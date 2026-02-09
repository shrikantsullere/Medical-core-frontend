import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// MedCore Pages
import Login from './pages/medcore/Login';
const Authorizations = lazy(() => import('./pages/medcore/Authorizations'));
const Doctors = lazy(() => import('./pages/medcore/Doctors'));
const Employees = lazy(() => import('./pages/medcore/Employees'));
const Roles = lazy(() => import('./pages/medcore/Roles'));
const ArsReport = lazy(() => import('./pages/medcore/ArsReport'));
const Branches = lazy(() => import('./pages/medcore/Branches'));
const UploadExcel = lazy(() => import('./pages/medcore/UploadExcel'));
const AuthorizationReport = lazy(() => import('./pages/medcore/AuthorizationReport'));
const UsageReport = lazy(() => import('./pages/medcore/UsageReport'));
const Configuration = lazy(() => import('./pages/medcore/Configuration'));
const Fee = lazy(() => import('./pages/medcore/Fee'));
const Questions = lazy(() => import('./pages/medcore/Questions'));
const UserManual = lazy(() => import('./pages/medcore/UserManual'));
const ContactUs = lazy(() => import('./pages/medcore/ContactUs'));

// Simulated Protected Route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>;
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Cargando Módulo...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route path="/dashboard" element={<ProtectedRoute><Navigate to="/authorizations" /></ProtectedRoute>} />
              <Route path="/authorizations" element={<ProtectedRoute><Authorizations /></ProtectedRoute>} />
              <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
              <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
              <Route path="/roles" element={<ProtectedRoute><Roles /></ProtectedRoute>} />
              <Route path="/ars-report" element={<ProtectedRoute><ArsReport /></ProtectedRoute>} />
              <Route path="/branches" element={<ProtectedRoute><Branches /></ProtectedRoute>} />
              <Route path="/upload-excel" element={<ProtectedRoute><UploadExcel /></ProtectedRoute>} />
              <Route path="/authorization-report" element={<ProtectedRoute><AuthorizationReport /></ProtectedRoute>} />
              <Route path="/usage-report" element={<ProtectedRoute><UsageReport /></ProtectedRoute>} />
              <Route path="/configuration" element={<ProtectedRoute><Configuration /></ProtectedRoute>} />
              <Route path="/fee" element={<ProtectedRoute><Fee /></ProtectedRoute>} />
              <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
              <Route path="/user-manual" element={<ProtectedRoute><UserManual /></ProtectedRoute>} />
              <Route path="/contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
