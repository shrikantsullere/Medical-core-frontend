import React, { useState } from 'react';
import { Eye, CheckCircle, XCircle, Play, ClipboardList, History, Phone, User, Calendar as CalendarIcon, Clock, Search, Filter } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_APPOINTMENTS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Appointments = () => {
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAppointments = MOCK_APPOINTMENTS.filter(appt => {
    const matchesSearch = appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.appId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || appt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (appt) => {
    setSelectedAppt(appt);
    setIsDrawerOpen(true);
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '0.25rem'
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Citas" desc="Gestione su horario de consultas y visitas de pacientes." />

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-sidebar)' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar por nombre de paciente o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', height: '44px', cursor: 'pointer' }}
          >
            <option value="All">Todos los Estados</option>
            <option value="Confirmed">Confirmado</option>
            <option value="Completed">Completado</option>
            <option value="Cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Cita</th>
              <th>Nombre del Paciente</th>
              <th>Edad / Género</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Tipo de Visita</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appt => (
              <tr key={appt.id}>
                <td data-label="ID Cita"><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{appt.appId}</span></td>
                <td data-label="Nombre del Paciente"><b style={{ color: 'var(--heading)' }}>{appt.patient}</b></td>
                <td data-label="Edad / Género" style={{ color: 'var(--text-main)' }}>{appt.age} / {appt.gender === 'Male' ? 'Masculino' : appt.gender === 'Female' ? 'Femenino' : appt.gender}</td>
                <td data-label="Fecha" style={{ color: 'var(--text-main)' }}>{appt.date}</td>
                <td data-label="Horario"><div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)' }}><Clock size={14} color="var(--text-muted)" /> {appt.time}</div></td>
                <td data-label="Tipo de Visita"><span className="badge badge-blue">{appt.type === 'Follow-up' ? 'Seguimiento' : appt.type === 'Consultation' ? 'Consulta' : appt.type}</span></td>
                <td data-label="Estado">
                  <span className={`badge ${appt.status === 'Completed' ? 'badge-success' : appt.status === 'Confirmed' ? 'badge-blue' : 'badge-warning'}`}>
                    {appt.status === 'Completed' ? 'Completado' : appt.status === 'Confirmed' ? 'Confirmado' : 'Cancelado'}
                  </span>
                </td>
                <td data-label="Acciones">
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver Detalles" onClick={() => handleViewDetails(appt)} style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>

                    <button className="action-btn" title="Marcar como Completado" style={{ backgroundColor: 'var(--bg-sidebar)' }}><CheckCircle size={18} color="var(--accent)" /></button>
                    <button className="action-btn" title="Cancelar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><XCircle size={18} color="var(--danger)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Detalles de la Cita">
        {selectedAppt && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Patient Info Section */}
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--heading)' }}><User size={18} /> Información del Paciente</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={labelStyle}>Nombre del Paciente</label><p style={{ fontWeight: 600, color: 'var(--heading)' }}>{selectedAppt.patient}</p></div>
                <div><label style={labelStyle}>Móvil</label><p style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)' }}><Phone size={14} /> 9876543210</p></div>
                <div><label style={labelStyle}>Edad</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedAppt.age} años</p></div>
                <div><label style={labelStyle}>Género</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedAppt.gender === 'Male' ? 'Masculino' : selectedAppt.gender === 'Female' ? 'Femenino' : selectedAppt.gender}</p></div>
              </div>
            </div>

            {/* Appointment Info */}
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--heading)' }}><CalendarIcon size={18} /> Información de la Cita</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div><label style={labelStyle}>Fecha</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedAppt.date}</p></div>
                <div><label style={labelStyle}>Horario</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedAppt.time}</p></div>
                <div><label style={labelStyle}>Tipo de Visita</label><p><span className="badge badge-blue">{selectedAppt.type === 'Follow-up' ? 'Seguimiento' : selectedAppt.type === 'Consultation' ? 'Consulta' : selectedAppt.type}</span></p></div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Notas del Médico</label>
                  <p style={{ color: 'var(--text-muted)' }}>El paciente se quejó de dolor torácico intenso y dificultad para respirar. Antecedentes previos de presión arterial documentados.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                <ClipboardList size={20} /> Crear Receta
              </button>
              <button style={{ flex: 1, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', padding: '1rem', borderRadius: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}>
                <History size={20} /> Ver Historial del Paciente
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Appointments;
