import React, { useState } from 'react';
import { Eye, Clock, Calendar, Search, Filter, Plus, Printer, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_APPOINTMENTS, MOCK_PATIENTS, MOCK_DOCTORS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Appointments = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('Todos los Médicos');

  const filteredAppointments = MOCK_APPOINTMENTS.filter(appt => {
    const matchesSearch = appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.appId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDoctor = doctorFilter === 'Todos los Médicos' || appt.doctor === doctorFilter;
    return matchesSearch && matchesDoctor;
  });

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '0.3rem'
  };

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

  return (
    <div className="fade-in">
      <SectionHeader
        title="Citas"
        desc="Programe visitas y realice el seguimiento de la llegada de pacientes."
        actionLabel="Reservar Cita"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-sidebar)' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar por nombre de paciente o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '2.8rem', backgroundColor: 'var(--bg-main)' }}
            />
          </div>
          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            style={{ padding: '0 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', height: '44px', cursor: 'pointer' }}
          >
            <option>Todos los Médicos</option>
            {MOCK_DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Cita</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appt => (
              <tr key={appt.id}>
                <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{appt.appId}</span></td>
                <td><b style={{ color: 'var(--heading)' }}>{appt.patient}</b></td>
                <td style={{ color: 'var(--text-main)' }}>{appt.doctor}</td>
                <td style={{ color: 'var(--text-main)' }}>{appt.date}</td>
                <td style={{ color: 'var(--text-main)' }}>{appt.time}</td>
                <td><span className="badge badge-blue">{appt.type === 'New Visit' ? 'Nueva Visita' : appt.type === 'Follow-up' ? 'Seguimiento' : appt.type}</span></td>
                <td>
                  <span className={`badge ${appt.status === 'Completed' ? 'badge-success' : appt.status === 'Confirmed' ? 'badge-blue' : 'badge-warning'}`}>
                    {appt.status === 'Completed' ? 'Completado' : appt.status === 'Confirmed' ? 'Confirmado' : appt.status === 'Pending' ? 'Pendiente' : appt.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={16} color="var(--primary)" /></button>
                    <button className="action-btn" title="Marcar Llegada" style={{ backgroundColor: 'var(--bg-sidebar)' }}><CheckCircle size={16} color="var(--accent)" /></button>
                    <button className="action-btn" title="Cancelar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><XCircle size={16} color="var(--danger)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Reservar Cita">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Paciente (Buscar / Agregar Nuevo)</label>
            <select style={inputStyle}>
              <option>Buscar Paciente...</option>
              {MOCK_PATIENTS.map(p => <option key={p.id}>{p.name} ({p.patientId})</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Médico</label>
            <select style={inputStyle}>
              {MOCK_DOCTORS.map(d => <option key={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Fecha de la Cita</label>
              <input type="date" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Horario</label>
              <input type="time" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Tipo de Visita</label>
            <select style={inputStyle}>
              <option>Nueva Visita</option>
              <option>Seguimiento</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Notas</label>
            <textarea placeholder="Motivo de la cita..." style={{ ...inputStyle, height: '80px' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Guardar Cita</button>
            <button className="btn-secondary" style={{ flex: 1, backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}>
              <Printer size={18} /> Guardar e Imprimir Ficha
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Appointments;
