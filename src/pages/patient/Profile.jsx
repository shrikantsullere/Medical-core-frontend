import React, { useState } from 'react';
import { User, Phone, Mail, Home, Shield, Lock, LogOut, Save, Calendar } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '0.4rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-main)'
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Perfil y Configuración" desc="Gestione su perfil de salud personal y la seguridad de su cuenta." />

      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{ padding: '1rem', color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: `2px solid ${activeTab === 'profile' ? 'var(--primary)' : 'transparent'}`, fontWeight: 600, backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          Mi Perfil
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          style={{ padding: '1rem', color: activeTab === 'settings' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: `2px solid ${activeTab === 'settings' ? 'var(--primary)' : 'transparent'}`, fontWeight: 600, backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          Configuración de la Cuenta
        </button>
      </div>

      <div style={{ maxWidth: '700px' }}>
        {activeTab === 'profile' ? (
          <div className="fade-in">
            <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-sidebar)' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--heading)' }}>Información Personal</h3>
              <div className="grid-responsive">
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Nombre Completo</label>
                  <input type="text" defaultValue="Deepak Verma" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Número de Móvil</label>
                  <input type="tel" defaultValue="9898989898" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Correo Electrónico</label>
                  <input type="email" defaultValue="deepak@demo.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Género</label>
                  <select style={inputStyle} defaultValue="Male">
                    <option value="Male">Masculino</option>
                    <option value="Female">Femenino</option>
                    <option value="Other">Otro</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Fecha de Nac. / Edad</label>
                  <input type="text" defaultValue="15-05-1990 (34 años)" style={inputStyle} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Dirección Residencial</label>
                  <textarea defaultValue="123, Health Enclave, New Delhi - 110001" style={{ ...inputStyle, height: '80px' }} />
                </div>
              </div>
            </div>
            <button style={{ width: '100%', backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
              <Save size={18} /> Actualizar Mi Perfil
            </button>
          </div>
        ) : (
          <div className="fade-in">
            <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-sidebar)' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--heading)' }}>Cambiar Contraseña de la Cuenta</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Contraseña Actual</label>
                  <input type="password" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nueva Contraseña</label>
                  <input type="password" style={inputStyle} />
                </div>
                <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.8rem', borderRadius: '10px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                  Cambiar Contraseña
                </button>
              </div>
            </div>

            <div className="card" style={{ border: '1px solid var(--danger)', backgroundColor: 'var(--bg-sidebar)' }}>
              <h3 style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '1.1rem' }}>Opciones de Cierre de Sesión</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Proteja sus datos de salud cerrando sesión desde dispositivos públicos.</p>
              <button style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--danger)', cursor: 'pointer' }}>
                <LogOut size={18} /> Cerrar sesión en todos los dispositivos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
