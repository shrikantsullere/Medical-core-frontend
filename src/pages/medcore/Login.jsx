import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../data/mockData';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate tech loading delay for premium feel
    setTimeout(() => {
      if (email === 'superadmin@gmail.com' && password === '123456') {
        login(ROLES.SUPER_ADMIN);
        navigate('/dashboard');
      } else {
        setError('Acceso denegado. Verifique sus credenciales.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-wrapper">
      {/* Dynamic Background Elements */}
      <div className="nebula-blob blob-1"></div>
      <div className="nebula-blob blob-2"></div>
      <div className="nebula-blob blob-3"></div>

      <div className="login-glass-card">
        <div className="login-main-section">
          {/* Brand Header */}
          <div className="brand-header">
            <div className="ef-premium-logo">
              <div className="logo-pulse"></div>
              <ShieldCheck className="logo-shield" size={40} />
            </div>
            <div className="brand-name-group">
              <h1 className="brand-title">
                eFactura<span>x</span>
              </h1>
              <p className="brand-tagline">Inteligencia Operativa Médica</p>
            </div>
          </div>

          <div className="login-form-area">
            <div className="welcome-text">
              <h2>Bienvenido de nuevo</h2>
              <p>Ingrese sus credenciales para acceder al panel</p>
            </div>

            <form onSubmit={handleLogin} className="modern-form">
              {error && (
                <div className="error-banner">
                  <span className="error-icon">!</span>
                  {error}
                </div>
              )}

              <div className="input-field-group">
                <label>Correo Electrónico</label>
                <div className="input-with-icon">
                  <Mail className="field-icon" size={18} />
                  <input
                    type="email"
                    placeholder="ejemplo@medcore.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-field-group">
                <div className="label-row">
                  <label>Contraseña</label>
                  <a href="#" className="text-link">¿Olvidó su contraseña?</a>
                </div>
                <div className="input-with-icon">
                  <Lock className="field-icon" size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={`premium-login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                {loading ? (
                  <span className="loader-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                ) : (
                  <>
                    AUTENTICAR ACCESO <ArrowRight className="btn-arrow" size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="login-footer">
            <p>¿No tiene una cuenta? <a href="#" className="register-text">Solicite una demostración</a></p>
          </div>
        </div>
      </div>

      <div className="system-status-indicator">
        <div className="status-dot"></div>
        <span>Sistemas Operativos • Latencia 24ms</span>
      </div>
    </div>
  );
};


export default Login;
