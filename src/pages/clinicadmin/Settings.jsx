import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Eye, Save, Globe, Landmark, FileText, CreditCard, Upload } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('clinic');

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-main)',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
  };

  const cardStyle = {
    backgroundColor: 'var(--bg-sidebar)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-md)'
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Configuración" desc="Configure el perfil y las preferencias de su clínica." />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { id: 'clinic', label: 'Configuración Clínica', icon: Landmark },
          { id: 'tax', label: 'Impuestos / IVA', icon: FileText },
          { id: 'invoice', label: 'Plantilla de Factura', icon: CreditCard },
          { id: 'gateway', label: 'Pasarela de Pago', icon: Shield },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.8rem 1.5rem',
              borderRadius: '12px',
              backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-sidebar)',
              color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
              fontWeight: 600,
              border: activeTab === tab.id ? 'none' : '1px solid var(--border)',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '800px' }}>
        {activeTab === 'clinic' && (
          <div className="fade-in" style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--heading)' }}><Landmark /> Información del Perfil</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Nombre de la Clínica</label>
                <input type="text" defaultValue="Clínica Dental de la Ciudad" style={inputStyle} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Dirección Completa</label>
                <textarea defaultValue="Calle 123, Área Médica, Ciudad de México" style={{ ...inputStyle, height: '80px' }} />
              </div>
              <div>
                <label style={labelStyle}>Email de Contacto</label>
                <input type="email" defaultValue="admin@clinicadental.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Número de Contacto</label>
                <input type="tel" defaultValue="9876543210" style={inputStyle} />
              </div>
              <button style={{ gridColumn: 'span 2', backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', border: 'none', cursor: 'pointer' }}>
                <Save size={18} /> Guardar Perfil
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tax' && (
          <div className="fade-in" style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--heading)' }}><FileText /> Configuración de Impuestos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Número de Identificación Fiscal</label>
                <input type="text" placeholder="RFC / NIF..." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Porcentaje de Impuesto (%)</label>
                <input type="number" defaultValue="16" style={inputStyle} />
              </div>
              <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, marginTop: '1rem', border: 'none', cursor: 'pointer' }}>
                Guardar Configuración
              </button>
            </div>
          </div>
        )}

        {activeTab === 'invoice' && (
          <div className="fade-in" style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--heading)' }}><CreditCard /> Identidad y Plantilla de Factura</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Logo de la Clínica</label>
                <div style={{ border: '2px dashed var(--border)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Upload size={24} style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontSize: '0.85rem' }}>Actualizar Logo</p>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Texto de Cabecera</label>
                <input type="text" placeholder="ej. Su salud es nuestra prioridad" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Texto de Pie de Página</label>
                <input type="text" placeholder="ej. Gracias por su confianza" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Términos y Condiciones</label>
                <textarea placeholder="1. Honorarios no reembolsables..." style={{ ...inputStyle, height: '100px' }} />
              </div>
              <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                Guardar Plantilla
              </button>
            </div>
          </div>
        )}

        {activeTab === 'gateway' && (
          <div className="fade-in" style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--heading)' }}><Shield /> Pagos en Línea</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: 'var(--heading)' }}>Habilitar Pagos en Línea</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Permitir que los pacientes paguen facturas vía Tarjeta/Transferencia.</p>
                </div>
                <input type="checkbox" style={{ width: '40px', height: '20px', cursor: 'pointer' }} defaultChecked />
              </div>
              <div>
                <label style={labelStyle}>Claves API (Bloqueado por Super Admin)</label>
                <input type="text" value="************************" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', cursor: 'not-allowed', color: 'var(--text-muted)' }} readOnly />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--danger)', backgroundColor: 'var(--bg-sidebar)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--danger)' }}>
                Nota: Solo el Super Administrador puede actualizar las credenciales de la pasarela de pago para su seguridad.
              </p>
              <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Guardar Cambios</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
