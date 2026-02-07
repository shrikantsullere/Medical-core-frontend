import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Lock, User, ChevronRight, Github, Chrome, ShieldCheck, Landmark, Activity, Users, Wallet, UserCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import loginIllustration from '../assets/login_illustration.png';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickLogin = (role) => {
    login(role);
    navigate('/dashboard');
  };

  const demoRoles = [
    { role: ROLES.SUPER_ADMIN, label: 'Super Administrador', icon: ShieldCheck, color: '#4C1D95' },
    { role: ROLES.CLINIC_ADMIN, label: 'Admin de Clínica', icon: Landmark, color: '#4C1D95' },
    { role: ROLES.DOCTOR, label: 'Médico', icon: Activity, color: '#4C1D95' },
    { role: ROLES.RECEPTIONIST, label: 'Recepcionista', icon: Users, color: '#4C1D95' },
    { role: ROLES.ACCOUNTANT, label: 'Contador', icon: Wallet, color: '#4C1D95' },
    { role: ROLES.PATIENT, label: 'Paciente', icon: UserCircle, color: '#4C1D95' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-main)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: '100%',
          maxWidth: '1000px',
          backgroundColor: 'white',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(76, 29, 149, 0.1)',
          display: 'flex',
          flexDirection: window.innerWidth < 1024 ? 'column' : 'row'
        }}
      >
        {/* Left Section - Hero */}
        <div style={{
          flex: 1,
          backgroundColor: 'var(--bg-header)',
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--primary)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 1rem' }}>
              <Activity size={32} />
            </div>
            <h1 style={{ fontSize: '2rem', color: 'var(--heading)' }}>MedCare EMR</h1>
            <p style={{ color: 'var(--text-main)', fontWeight: 500 }}>El Futuro de la Gestión Hospitalaria</p>
          </div>
          <img src={loginIllustration} alt="Health" style={{ width: '100%', maxWidth: '400px', height: 'auto', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} />
        </div>

        {/* Right Section - Login */}
        <div style={{ flex: 1, padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Inicio de Sesión</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 500 }}>Acceda de forma segura a su panel médico.</p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }} onSubmit={(e) => { e.preventDefault(); handleQuickLogin(ROLES.SUPER_ADMIN); }}>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '14px', border: '1px solid var(--border)', outline: 'none', fontSize: '0.95rem' }}
                required
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '14px', border: '1px solid var(--border)', outline: 'none', fontSize: '0.95rem' }}
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '1rem', fontSize: '1rem' }}>
              Iniciar Sesión
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Paneles de Demostración</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {demoRoles.map(demo => (
              <button
                key={demo.role}
                onClick={() => handleQuickLogin(demo.role)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-main)',
                  color: 'var(--heading)',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                <demo.icon size={18} color="var(--primary)" />
                {demo.label}
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            ¿No tienes una cuenta? <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Contactar al Administrador</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
