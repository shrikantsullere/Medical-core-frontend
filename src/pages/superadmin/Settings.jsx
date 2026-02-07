import React, { useState } from 'react';
import { Mail, MessageSquare, FileText, Save, Send, Eye, ShieldCheck, Globe } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('email');

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
    color: 'var(--text-muted)',
    marginBottom: '0.5rem',
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
      <SectionHeader title="Ajustes del Sistema" desc="Configure los parámetros globales del sistema, las integraciones y la marca." />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { id: 'email', label: 'Correo (SMTP)', icon: Mail },
          { id: 'sms', label: 'Pasarela SMS', icon: MessageSquare },
          { id: 'invoice', label: 'Diseño de Factura', icon: FileText },
          { id: 'general', label: 'General', icon: Globe },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
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

      {activeTab === 'email' && (
        <div className="fade-in" style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--heading)' }}><Mail /> Configuración SMTP</h3>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <Send size={16} /> Enviar Correo de Prueba
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Servidor SMTP</label>
                  <input type="text" defaultValue="smtp.gmail.com" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={labelStyle}>Puerto SMTP</label>
                  <input type="text" defaultValue="587" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Nombre de Usuario</label>
                <input type="text" defaultValue="notificaciones@medcare.com" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <div>
                <label style={labelStyle}>Contraseña</label>
                <input type="password" defaultValue="********" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <div>
                <label style={labelStyle}>Dirección de Correo del Remitente</label>
                <input type="email" defaultValue="soporte@medcare.com" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <button style={{ alignSelf: 'flex-start', backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem 2rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                <Save size={18} /> Guardar Ajustes
              </button>
            </div>
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Instrucciones</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Asegúrese de que su servidor SMTP permita conexiones desde esta IP. Si usa Gmail, es posible que deba generar una <b>Contraseña de Aplicación</b>.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sms' && (
        <div className="fade-in" style={cardStyle}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--heading)' }}><MessageSquare /> Pasarela SMS</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
            <div>
              <label style={labelStyle}>Proveedor</label>
              <select style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
                <option>Twilio</option>
                <option>AWS SNS</option>
                <option>TextLocal</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Clave API</label>
              <input type="text" placeholder="Ingrese la Clave API" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
            </div>
            <div>
              <label style={labelStyle}>ID del Remitente</label>
              <input type="text" placeholder="MEDCAR" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="smsEnabled" style={{ width: '18px', height: '18px' }} />
              <label htmlFor="smsEnabled" style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Habilitar servicio de SMS en todo el sistema</label>
            </div>
            <button style={{ alignSelf: 'flex-start', backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem 2rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Guardar Configuraciones</button>
          </div>
        </div>
      )}

      {activeTab === 'invoice' && (
        <div className="fade-in" style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--heading)' }}><FileText /> Imagen de Marca en Facturas</h3>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'transparent', cursor: 'pointer' }}>
              <Eye size={16} /> Vista Previa PDF
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Texto de Cabecera de Factura</label>
                <input type="text" placeholder="ej. MedCare Professional Clinic Solutions" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <div>
                <label style={labelStyle}>Texto de Pie de Página</label>
                <textarea placeholder="ej. Esta es una factura generada por computadora." style={{ ...inputStyle, height: '80px', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <div>
                <label style={labelStyle}>Términos y Condiciones</label>
                <textarea placeholder="ej. 1. No hay reembolsos en suscripciones." style={{ ...inputStyle, height: '120px', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <button style={{ alignSelf: 'flex-start', backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem 2rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Guardar Plantilla</button>
            </div>
            <div style={{ border: '2px dashed var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifySelf: 'center', width: '100%', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ margin: '0 auto' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--bg-main)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <ShieldCheck size={40} color="var(--primary)" />
                </div>
                <p style={{ fontWeight: 600, color: 'var(--heading)' }}>Plantilla Predeterminada del Sistema</p>
                <p style={{ fontSize: '0.8rem' }}>Cargue etiquetas dinámicas como {`{invoice_id}`} en su editor de plantillas.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
