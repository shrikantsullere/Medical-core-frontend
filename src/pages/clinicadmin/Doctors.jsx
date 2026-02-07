import React, { useState } from 'react';
import { Edit, Ban, CheckCircle, UserPlus, Phone, Mail, Clock, Calendar, Eye, Search } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_DOCTORS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Doctors = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = MOCK_DOCTORS.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: 'var(--bg-sidebar)',
    color: 'var(--text-main)'
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
        title="Médicos"
        desc="Gestione a los profesionales médicos de su clínica."
        actionLabel="Agregar Médico"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-sidebar)' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Buscar por nombre o especialidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.8rem', backgroundColor: 'var(--bg-main)' }}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre del Médico</th>
              <th>Especialidad</th>
              <th>Móvil</th>
              <th>Tarifa de Consulta</th>
              <th>Comisión %</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map(doc => (
              <tr key={doc.id}>
                <td data-label="Doctor Name">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--bg-main)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {doc.name.split(' ').pop().charAt(0)}
                    </div>
                    <b style={{ color: 'var(--heading)' }}>{doc.name}</b>
                  </div>
                </td>
                <td data-label="Specialization"><span className="badge badge-blue">{doc.specialty}</span></td>
                <td data-label="Mobile" style={{ color: 'var(--text-main)' }}>{doc.mobile}</td>
                <td data-label="Fee" style={{ fontWeight: 600, color: 'var(--heading)' }}>$ {doc.fee}</td>
                <td data-label="Commission" style={{ color: 'var(--text-main)' }}>{doc.commission}%</td>
                <td data-label="Status">
                  <span className={`badge ${doc.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {doc.status}
                  </span>
                </td>
                <td data-label="Acciones">
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver Horario" style={{ backgroundColor: 'var(--bg-sidebar)' }} onClick={() => alert('Ver horario de ' + doc.name)}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Editar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Edit size={18} color="var(--secondary)" /></button>
                    <button className="action-btn" title={doc.status === 'Active' ? 'Bloquear' : 'Desbloquear'} style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                      {doc.status === 'Active' ? <Ban size={18} color="var(--danger)" /> : <CheckCircle size={18} color="var(--accent)" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Agregar Médico">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Nombre Completo del Médico *</label>
              <input type="text" placeholder="Dr. Nombre" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Correo Electrónico (Usuario) *</label>
              <input type="email" placeholder="medico@clinica.com" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Contraseña de Acceso *</label>
              <input type="password" placeholder="Establecer Contraseña" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Móvil *</label>
              <input type="tel" placeholder="00000 00000" style={inputStyle} required />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Especialidad *</label>
              <input type="text" placeholder="ej. Cardiólogo" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Tarifa de Consulta ($) *</label>
              <input type="number" placeholder="500" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Comisión % *</label>
              <input type="number" placeholder="20" style={inputStyle} required />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Días Disponibles</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                  <label key={day} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', cursor: 'pointer', padding: '0.4rem 0.75rem', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)' }}>
                    <input type="checkbox" /> {day}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Horarios</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input type="time" defaultValue="09:00" style={inputStyle} />
                <input type="time" defaultValue="17:00" style={inputStyle} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none' }}>Guardar</button>
            <button type="button" onClick={() => setIsDrawerOpen(false)} style={{ backgroundColor: 'transparent', color: 'var(--danger)', padding: '1rem', borderRadius: '12px', fontWeight: 600, border: '1px solid var(--danger)' }}>Cancelar</button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Doctors;
