import React, { useState } from 'react';
import { Plus, Search, Tag, DollarSign, Edit, Ban } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_SERVICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Services = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return (
    <div className="fade-in">
      <SectionHeader
        title="Servicios y Cargos"
        desc="Gestione los servicios de la clínica y sus precios."
        actionLabel="Agregar Servicio"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre del Servicio</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_SERVICES.map(service => (
              <tr key={service.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Tag size={16} />
                    </div>
                    <b>{service.name}</b>
                  </div>
                </td>
                <td style={{ fontWeight: 700, color: 'var(--heading)' }}>{service.price}</td>
                <td>
                  <span className={`badge ${service.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {service.status === 'Active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Editar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Edit size={16} color="var(--primary)" /></button>
                    <button className="action-btn" title="Desactivar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Ban size={16} color="var(--danger)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Agregar Servicio">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Nombre del Servicio *</label>
            <input type="text" placeholder="ej. Consulta General" style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Descripción</label>
            <textarea placeholder="Detalles del servicio..." style={{ ...inputStyle, height: '80px', resize: 'none' }} />
          </div>
          <div>
            <label style={labelStyle}>Precio por Defecto ($) *</label>
            <input type="number" placeholder="500" style={inputStyle} required />
          </div>

          <button className="btn-primary" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, marginTop: '1rem', border: 'none' }}>Guardar</button>
        </form>
      </Drawer>
    </div>
  );
};

export default Services;
