import React, { useState } from 'react';
import { Eye, KeyRound, Ban, LogOut, CheckCircle, Search, Filter, Shield, Mail, Calendar, User } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_USERS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Users = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Usuarios del Sistema" desc="Gestione a todos los administradores de clínicas y usuarios del sistema." />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Nombre de la Clínica</th>
              <th>Último Inicio de Sesión</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map(u => (
              <tr key={u.id}>
                <td data-label="Nombre"><b>{u.name}</b></td>
                <td data-label="Email">{u.email}</td>
                <td data-label="Nombre de la Clínica">{u.clinic}</td>
                <td data-label="Último Inicio de Sesión"><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{u.lastLogin}</span></td>
                <td data-label="Estado">
                  <span className={`badge ${u.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {u.status === 'Active' ? 'Activo' : 'Bloqueado'}
                  </span>
                </td>
                <td data-label="Acciones">
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver Detalles" onClick={() => handleViewUser(u)} style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>

                    <button className="action-btn" title={u.status === 'Active' ? 'Bloquear' : 'Desbloquear'} onClick={() => confirm(`¿Está seguro de que desea ${u.status === 'Active' ? 'bloquear' : 'desbloquear'} a este usuario?`) && alert('Estado del usuario actualizado.')} style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                      {u.status === 'Active' ? <Ban size={18} color="var(--danger)" /> : <CheckCircle size={18} color="var(--accent)" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Detalles del Usuario">
        {selectedUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-header)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, margin: '0 auto 1rem' }}>
                {selectedUser.name.charAt(0)}
              </div>
              <h3>{selectedUser.name}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{selectedUser.email}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-main)' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Clínica Asociada</label>
                <p style={{ fontWeight: 600, marginTop: '0.25rem', color: 'var(--heading)' }}>{selectedUser.clinic}</p>
              </div>
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-main)' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estado de la Cuenta</label>
                <p style={{ fontWeight: 600, marginTop: '0.25rem', color: 'var(--heading)' }}>{selectedUser.status === 'Active' ? 'Activo' : 'Bloqueado'}</p>
              </div>
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-main)' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Último Inicio de Sesión</label>
                <p style={{ fontWeight: 600, marginTop: '0.25rem', color: 'var(--heading)' }}>{selectedUser.lastLogin}</p>
              </div>
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-main)' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rol</label>
                <p style={{ fontWeight: 600, marginTop: '0.25rem', color: 'var(--heading)' }}>Administrador de Clínica</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '0.8rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                <KeyRound size={18} /> Restablecer Contraseña
              </button>
              <button style={{ flex: 1, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.8rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--danger)', cursor: 'pointer' }}>
                <Ban size={18} /> Bloquear Usuario
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Users;
