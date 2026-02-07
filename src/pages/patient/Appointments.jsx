import React, { useState } from 'react';
import { Eye, XCircle, RefreshCw, Calendar as CalendarIcon, Clock, Search, Plus } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_APPOINTMENTS, MOCK_DOCTORS, MOCK_CLINICS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Appointments = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);

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
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-main)'
  };

  return (
    <div className="fade-in">
      <SectionHeader
        title="Mis Citas"
        desc="Realice el seguimiento de sus visitas clínicas próximas y anteriores."
        actionLabel="Reservar Cita"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Cita</th>
              <th>Médico</th>
              <th>Clínica</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Tipo de Visita</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_APPOINTMENTS.map(appt => (
              <tr key={appt.id}>
                <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{appt.appId}</span></td>
                <td><b style={{ color: 'var(--heading)' }}>{appt.doctor}</b></td>
                <td style={{ color: 'var(--text-main)' }}>City Dental Clinic</td>
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
                    <button className="action-btn" title="Ver Detalles" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    {appt.status !== 'Completed' && (
                      <button className="action-btn" title="Cancelar Cita" style={{ backgroundColor: 'var(--bg-sidebar)' }}><XCircle size={18} color="var(--danger)" /></button>
                    )}
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
            <label style={labelStyle}>Seleccionar Clínica</label>
            <select style={inputStyle}>
              {MOCK_CLINICS.map(c => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Seleccionar Médico</label>
            <select style={inputStyle}>
              {MOCK_DOCTORS.map(d => <option key={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Fecha de Cita</label>
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
            <label style={labelStyle}>Descripción del Problema (Opcional)</label>
            <textarea placeholder="Cuéntenos sus síntomas o el motivo de su visita..." style={{ ...inputStyle, height: '100px' }} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '14px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              Reservar Cita
            </button>
            <button type="button" onClick={() => setIsDrawerOpen(false)} style={{ flex: 1, backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: '1px solid var(--border)', cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Appointments;
