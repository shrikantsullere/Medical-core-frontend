import React, { useState } from 'react';
import { User, Shield, Bell, Save, LogOut, Clock, Calendar, CheckCircle } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '0.9rem',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#475569',
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Perfil y Configuración" desc="Gestione su información personal y preferencias de cuenta." />

      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
        <button onClick={() => setActiveTab('profile')} style={{ padding: '1rem', color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: `2px solid ${activeTab === 'profile' ? 'var(--primary)' : 'transparent'}`, fontWeight: 600, backgroundColor: 'transparent', cursor: 'pointer', border: 'none' }}>
          Perfil del Médico
        </button>
        <button onClick={() => setActiveTab('account')} style={{ padding: '1rem', color: activeTab === 'account' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: `2px solid ${activeTab === 'account' ? 'var(--primary)' : 'transparent'}`, fontWeight: 600, backgroundColor: 'transparent', cursor: 'pointer', border: 'none' }}>
          Configuración de cuenta
        </button>
      </div>

      <div style={{ maxWidth: '800px' }}>
        {activeTab === 'profile' ? (
          <div className="fade-in">
            <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-sidebar)' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--heading)' }}>Información Básica</h3>
              <div className="grid-responsive">
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ ...labelStyle, color: 'var(--text-muted)' }}>Nombre Completo</label>
                  <input type="text" defaultValue="Dr. Sameer Khan" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ ...labelStyle, color: 'var(--text-muted)' }}>Correo Electrónico</label>
                  <input type="email" defaultValue="sameer@clinic.com" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ ...labelStyle, color: 'var(--text-muted)' }}>Móvil</label>
                  <input type="tel" defaultValue="9191919191" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ ...labelStyle, color: 'var(--text-muted)' }}>Especialidad</label>
                  <input type="text" defaultValue="Cardiología y Medicina Interna" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                </div>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-sidebar)' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--heading)' }}><Clock size={20} /> Disponibilidad</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ ...labelStyle, color: 'var(--text-muted)' }}>Días Disponibles</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                      <div key={day} style={{ padding: '0.5rem 1rem', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', border: '1px solid var(--accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle size={14} /> {day}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ ...labelStyle, color: 'var(--text-muted)' }}>Horarios de Consulta</label>
                  <div className="grid-responsive" style={{ gap: '1rem' }}>
                    <input type="time" defaultValue="10:00" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                    <input type="time" defaultValue="18:00" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                  </div>
                </div>
              </div>
            </div>

            <button style={{ width: '100%', backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
              <Save size={18} /> Guardar Cambios del Perfil
            </button>
          </div>
        ) : (
          <div className="fade-in">
            <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-sidebar)' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--heading)' }}>Cambiar Contraseña</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div><label style={{ ...labelStyle, color: 'var(--text-muted)' }}>Contraseña Actual</label><input type="password" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} /></div>
                <div><label style={{ ...labelStyle, color: 'var(--text-muted)' }}>Nueva Contraseña</label><input type="password" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} /></div>
                <div><label style={{ ...labelStyle, color: 'var(--text-muted)' }}>Confirmar Nueva Contraseña</label><input type="password" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} /></div>
                <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.8rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Actualizar Contraseña</button>
              </div>
            </div>

            <div className="card" style={{ border: '1px solid var(--danger)', backgroundColor: 'var(--bg-sidebar)' }}>
              <h3 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Zona de Peligro</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Cerrar sesión en todos los dispositivos finalizará su sesión actual en todas partes excepto en este dispositivo.</p>
              <button style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <LogOut size={18} /> Cerrar sesión en todos los dispositivos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
