import React, { useState } from 'react';
import { User, Shield, Save, LogOut, KeyRound, Mail, Phone } from 'lucide-react';
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
      <SectionHeader title="Tu Perfil" desc="Administre su información personal de contador y la seguridad." />

      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{ padding: '1rem', color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: `2px solid ${activeTab === 'profile' ? 'var(--primary)' : 'transparent'}`, fontWeight: 600, backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          Perfil del Contador
        </button>
        <button
          onClick={() => setActiveTab('security')}
          style={{ padding: '1rem', color: activeTab === 'security' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: `2px solid ${activeTab === 'security' ? 'var(--primary)' : 'transparent'}`, fontWeight: 600, backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          Configuración de la Cuenta
        </button>
      </div>

      <div style={{ maxWidth: '600px' }}>
        {activeTab === 'profile' ? (
          <div className="card fade-in" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--heading)' }}><User size={20} /> Información Básica</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Nombre Completo</label>
                <input type="text" defaultValue="Kushal Dev" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Correo Electrónico</label>
                  <input type="email" defaultValue="kushal@clinic.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Número de Móvil</label>
                  <input type="tel" defaultValue="9898989800" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Rol Profesional (Solo lectura)</label>
                <div style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={16} /> Contador y Jefe Financiero
                </div>
              </div>
              <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', border: 'none', cursor: 'pointer' }}>
                <Save size={18} /> Guardar Perfil
              </button>
            </div>
          </div>
        ) : (
          <div className="card fade-in" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--heading)' }}><KeyRound size={20} /> Cambiar Contraseña</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Contraseña Actual</label>
                <input type="password" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Nueva Contraseña</label>
                <input type="password" style={inputStyle} />
              </div>
              <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, marginTop: '0.5rem', border: 'none', cursor: 'pointer' }}>
                Actualizar Contraseña
              </button>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />

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
