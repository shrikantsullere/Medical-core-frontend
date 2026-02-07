import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../data/mockData';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Specific credentials as requested by user
    if (email === 'superadmin@gmail.com' && password === '123456') {
      login(ROLES.SUPER_ADMIN);
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas. Use superadmin@gmail.com / 123456');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header Block */}
        <div className="login-header">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 10V40H10V60H40V90H60V60H90V40H60V10H40Z" fill="white" />
            <path d="M40 10H50L40 40H40V10Z" fill="#D1D3D4" />
            <path d="M50 80L60 90V60H50L50 80Z" fill="#D1D3D4" />
            <path d="M10 50L20 60H40V50H10Z" fill="#D1D3D4" />
            <path d="M80 50L90 40H60V50H80Z" fill="#D1D3D4" />
            <path d="M50 10V20L60 10H50Z" fill="#E6E7E8" />
            <path d="M40 80L50 90V80H40Z" fill="#E6E7E8" />
            <path d="M10 40V50L20 40H10Z" fill="#E6E7E8" />
            <path d="M80 60L90 50V60H80Z" fill="#E6E7E8" />
          </svg>
          <h1 className="login-logo-text">MedicalCore</h1>
        </div>

        {/* Form Body */}
        <div className="login-form-container">
          <form onSubmit={handleLogin}>
            {error && (
              <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>
                {error}
              </div>
            )}
            <div className="login-input-group">
              <input
                type="email"
                placeholder="Usuario (Email)"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-input-group">
              <input
                type="password"
                placeholder="Contraseña"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <a href="#" className="forgot-password">
              ¿Olvidó su contraseña?
            </a>

            <button
              type="submit"
              className="login-button"
            >
              ENTRAR
            </button>
          </form>

          {/* Registration Section */}
          <div className="registration-section">
            <p className="not-registered-text">¿No estás registrado?</p>
            <a href="#" className="register-link">
              ¡Regístrate aquí!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
