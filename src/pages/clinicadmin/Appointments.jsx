import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_APPOINTMENTS, MOCK_PATIENTS, MOCK_DOCTORS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Appointments = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState('Week'); // Day, Week, Month
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAppointments = MOCK_APPOINTMENTS.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        title="Citas"
        desc="Programe y monitoree las visitas de los pacientes."
        actionLabel="Nueva Cita"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Buscar por paciente o médico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.8rem' }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '0 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)', outline: 'none' }}
        >
          <option value="All">Todos los Estados</option>
          <option value="Confirmed">Confirmada</option>
          <option value="Pending">Pendiente</option>
          <option value="Cancelled">Cancelada</option>
        </select>
      </div>

      {/* Calendar Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: 'var(--bg-sidebar)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['Day', 'Week', 'Month'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.9rem',
                backgroundColor: viewMode === mode ? 'var(--primary)' : 'transparent',
                color: viewMode === mode ? 'white' : 'var(--text-muted)'
              }}
            >
              Vista {mode === 'Day' ? 'Diaria' : mode === 'Week' ? 'Semanal' : 'Mensual'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="action-btn" style={{ backgroundColor: 'var(--bg-sidebar)' }}><ChevronLeft size={20} /></button>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--heading)' }}>20 - 26 de Marzo 2024</span>
          <button className="action-btn" style={{ backgroundColor: 'var(--bg-sidebar)' }}><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Fecha y Hora</th>
              <th>Tipo de Visita</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(apt => (
              <tr key={apt.id}>
                <td data-label="Patient"><b>{apt.patient}</b></td>
                <td data-label="Doctor">{apt.doctor}</td>
                <td data-label="Date & Time">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CalendarIcon size={14} color="var(--text-muted)" />
                    <span>{apt.date}</span>
                    <Clock size={14} color="var(--text-muted)" style={{ marginLeft: '0.5rem' }} />
                    <span>{apt.time}</span>
                  </div>
                </td>
                <td data-label="Tipo de Visita"><span className="badge badge-blue">{apt.type === 'New Visit' ? 'Nueva Visita' : 'Seguimiento'}</span></td>
                <td data-label="Estado"><span className={`badge ${apt.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>{apt.status === 'Confirmed' ? 'Confirmada' : apt.status === 'Pending' ? 'Pendiente' : 'Cancelada'}</span></td>
                <td data-label="Acción">
                  <button className="action-btn" title="Editar Cita" style={{ backgroundColor: 'var(--bg-sidebar)' }}><EditIcon size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Nueva Cita">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Paciente *</label>
            <select style={inputStyle} required>
              <option value="">Seleccionar Paciente</option>
              {MOCK_PATIENTS.map(p => <option key={p.id} value={p.name}>{p.name} ({p.patientId})</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Médico *</label>
            <select style={inputStyle} required>
              <option value="">Seleccionar Médico</option>
              {MOCK_DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Fecha de Cita *</label>
              <input type="date" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Horario *</label>
              <input type="time" style={inputStyle} required />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Tipo de Visita</label>
            <select style={inputStyle}>
              <option value="New Visit">Nueva Visita</option>
              <option value="Follow-up">Seguimiento</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Notas</label>
            <textarea placeholder="Motivo de la visita, síntomas, etc." style={{ ...inputStyle, height: '80px' }} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none' }}>Guardar</button>
            <button className="btn-secondary" style={{ flex: 1, backgroundColor: 'var(--bg-sidebar)', color: 'var(--primary)', padding: '1rem', borderRadius: '12px', fontWeight: 600, border: '1px solid var(--primary)' }}>Guardar y Crear Factura</button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

const EditIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;

export default Appointments;
