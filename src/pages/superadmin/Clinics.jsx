import React, { useState } from 'react';
import { Eye, Edit, Trash2, LogIn, RefreshCcw, Ban, CheckCircle, Plus, Upload, Mail, Phone, MapPin, Shield, Calendar, UserCog, Landmark, Search } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_CLINICS, MOCK_PLANS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Clinics = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [viewType, setViewType] = useState('list'); // list, add
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.025em'
  };

  const formSectionStyle = {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: 'var(--bg-main)',
    borderRadius: '16px',
    border: '1px solid var(--border)'
  };

  const filteredClinics = MOCK_CLINICS.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.clinicId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || clinic.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddClinic = () => {
    setViewType('add');
    setIsDrawerOpen(true);
  };

  return (
    <div className="fade-in">
      <SectionHeader
        title="Gestión de Clínicas"
        desc="Supervise todas las clínicas, gestione suscripciones y controle el acceso."
        actionLabel="Agregar Clínica"
        onAction={handleAddClinic}
      />

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar por nombre de clínica, ID o administrador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)' }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)', outline: 'none' }}
          >
            <option value="All">Todos los Estados</option>
            <option value="Active">Activa</option>
            <option value="Inactive">Inactiva</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID de Clínica</th>
              <th>Nombre de la Clínica</th>
              <th>Nombre del Admin</th>
              <th>Contacto</th>
              <th>Plan</th>
              <th>Vencimiento</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredClinics.map(clinic => (
              <tr key={clinic.id}>
                <td data-label="Clinic ID"><span style={{ fontWeight: 600, color: '#64748b' }}>{clinic.clinicId}</span></td>
                <td data-label="Clinic Name"><b>{clinic.name}</b></td>
                <td data-label="Admin Name">{clinic.admin}</td>
                <td data-label="Contact">
                  <div style={{ fontSize: '0.85rem' }}>{clinic.email}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{clinic.mobile}</div>
                </td>
                <td data-label="Plan"><span className="badge badge-blue">{clinic.plan}</span></td>
                <td data-label="Expiry">{clinic.expiry}</td>
                <td data-label="Estado">
                  <span className={`badge ${clinic.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {clinic.status === 'Active' ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td data-label="Acción">
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="action-btn" title="Ver Detalles" onClick={() => { setViewType('view'); setSelectedClinic(clinic); setIsDrawerOpen(true); }}><Eye size={16} color="var(--primary)" /></button>
                    <button className="action-btn" title="Editar" onClick={() => { setViewType('edit'); setSelectedClinic(clinic); setIsDrawerOpen(true); }}><Edit size={16} color="var(--secondary)" /></button>

                    <button className="action-btn" title="Eliminar" onClick={() => confirm('¿Está seguro de que desea eliminar esta clínica? Esta acción no se puede deshacer.') && alert('Clínica eliminada con éxito.')}><Trash2 size={16} color="var(--danger)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={viewType === 'add' ? "Registro - Nueva Clínica" : viewType === 'view' ? "Detalles de la Clínica (Modo Vista)" : "Editar Información de la Clínica"}
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* A. Detalles de la Clínica */}
          <div style={formSectionStyle}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--heading)' }}>
              <Landmark size={18} /> A. Detalles de la Clínica
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Nombre de la Clínica *</label>
                <input type="text" defaultValue={selectedClinic?.name || ''} placeholder="Ingrese el nombre completo de la clínica" style={inputStyle} required readOnly={viewType === 'view'} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Logotipo de la Clínica</label>
                <div style={{ border: '2px dashed #e2e8f0', borderRadius: '12px', padding: '1rem', textAlign: 'center', color: '#94a3b8', cursor: 'pointer' }}>
                  <Upload size={24} style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontSize: '0.75rem' }}>Haga clic para cargar o arrastre el logotipo</p>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Correo de la Clínica</label>
                <input type="email" placeholder="clinica@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Teléfono de la Clínica</label>
                <input type="tel" placeholder="+91 00000 00000" style={inputStyle} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Dirección Completa</label>
                <textarea placeholder="Calle 1, Calle 2..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Ciudad</label>
                <input type="text" placeholder="Madrid" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Estado / Provincia</label>
                <input type="text" placeholder="Madrid" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* B. Cuenta de Administrador */}
          <div style={formSectionStyle}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--heading)' }}>
              <UserCog size={18} /> B. Cuenta de Administrador
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Nombre del Administrador *</label>
                <input type="text" defaultValue={selectedClinic?.admin || ''} placeholder="Nombre del administrador principal" style={inputStyle} required readOnly={viewType === 'view'} />
              </div>
              <div>
                <label style={labelStyle}>Correo del Administrador *</label>
                <input type="email" defaultValue={selectedClinic?.email || ''} placeholder="admin@clinica.com" style={inputStyle} required readOnly={viewType === 'view'} />
              </div>
              <div>
                <label style={labelStyle}>Contraseña del Administrador *</label>
                <input type="password" placeholder="Crear Contraseña" style={inputStyle} required={viewType === 'add'} readOnly={viewType === 'view'} />
              </div>
              <div>
                <label style={labelStyle}>Móvil del Administrador</label>
                <input type="tel" placeholder="+91 99999 99999" style={inputStyle} />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="sendEmail" style={{ width: '16px', height: '16px' }} defaultChecked />
                <label htmlFor="sendEmail" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>Enviar detalles de inicio de sesión por correo</label>
              </div>
            </div>
          </div>

          {/* C. Suscripción */}
          <div style={formSectionStyle}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--heading)' }}>
              <Shield size={18} /> C. Suscripción
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Seleccionar Plan</label>
                <select style={inputStyle}>
                  {MOCK_PLANS.map(p => <option key={p.id}>{p.name} ({p.price})</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Fecha de Inicio</label>
                <input type="date" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Fecha de Vencimiento</label>
                <input type="date" style={inputStyle} disabled />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none' }}>Guardar y Activar</button>
            <button type="button" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', padding: '1rem 1.5rem', borderRadius: '12px', fontWeight: 600, border: 'none' }}>Guardar Borrador</button>
            <button type="button" onClick={() => setIsDrawerOpen(false)} style={{ backgroundColor: 'transparent', color: 'var(--danger)', padding: '1rem 1.5rem', borderRadius: '12px', fontWeight: 600, border: '1px solid var(--danger)' }}>Cancelar</button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Clinics;
