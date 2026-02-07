import React, { useState } from 'react';
import { UserPlus, Edit, KeyRound, Ban, CheckCircle } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_STAFF } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Staff = () => {
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
        title="Personal y Roles"
        desc="Gestione a los empleados de la clínica y sus permisos."
        actionLabel="Agregar Personal"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre del Personal</th>
              <th>Rol</th>
              <th>Móvil</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STAFF.map(staff => (
              <tr key={staff.id}>
                <td data-label="Nombre del Personal"><b>{staff.name}</b></td>
                <td data-label="Rol"><span className="badge badge-blue">{staff.role === 'Receptionist' ? 'Recepcionista' : staff.role === 'Accountant' ? 'Contador' : staff.role}</span></td>
                <td data-label="Móvil" style={{ color: 'var(--text-main)' }}>{staff.mobile}</td>
                <td data-label="Estado">
                  <span className={`badge ${staff.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {staff.status === 'Active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td data-label="Acciones">
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Editar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Edit size={16} color="var(--primary)" /></button>

                    <button className="action-btn" title="Bloquear" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Ban size={16} color="var(--danger)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Agregar Miembro del Personal">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Nombre Completo *</label>
            <input type="text" placeholder="Nombre del Personal" style={inputStyle} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Correo Electrónico (Usuario) *</label>
              <input type="email" placeholder="personal@clinica.com" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Contraseña de Acceso *</label>
              <input type="password" placeholder="Establecer Contraseña" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Móvil *</label>
              <input type="tel" placeholder="00000 00000" style={inputStyle} required />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Rol *</label>
            <select style={inputStyle} required>
              <option value="Receptionist">Recepcionista</option>
              <option value="Accountant">Contador</option>
              <option value="Nurse / Staff">Enfermero/a / Personal</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Permisos</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
              {['Gestionar Pacientes', 'Crear Citas', 'Acceso a Facturación', 'Acceso a Informes', 'Anulación de Emergencia'].map(p => (
                <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <input type="checkbox" /> {p}
                </label>
              ))}
            </div>
          </div>
          <button className="btn-primary" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, marginTop: '1rem', border: 'none' }}>Guardar</button>
        </form>
      </Drawer>
    </div>
  );
};

export default Staff;
