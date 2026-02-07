import React, { useState } from 'react';
import { Eye, History, Search, Filter, User, Info, FileText, Wallet } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS, MOCK_PRESCRIPTIONS, MOCK_INVOICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Personal Info');

  const handleViewProfile = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('Personal Info');
    setIsDrawerOpen(true);
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: '0.4rem'
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Sus Pacientes" desc="Lista de pacientes asignados a usted para consulta." />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre del Paciente</th>
              <th>Móvil</th>
              <th>Última Visita</th>
              <th>Visitas Totales</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PATIENTS.map(patient => (
              <tr key={patient.id}>
                <td data-label="Patient Name">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-header)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{patient.name.charAt(0)}</div>
                    <b>{patient.name}</b>
                  </div>
                </td>
                <td data-label="Mobile">{patient.mobile}</td>
                <td data-label="Última Visita">{patient.lastVisit}</td>
                <td data-label="Visitas"><span className="badge badge-blue">{patient.totalVisits} visitas</span></td>
                <td data-label="Acciones">
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" onClick={() => handleViewProfile(patient)} title="Ver Perfil" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Ver Historial" style={{ backgroundColor: 'var(--bg-sidebar)' }}><History size={18} color="var(--secondary)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Perfil del Paciente">
        {selectedPatient && (
          <div>
            {/* Header Brief */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '20px', backgroundColor: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 800 }}>
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--heading)' }}>{selectedPatient.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>ID: {selectedPatient.patientId} • {selectedPatient.gender === 'Male' ? 'Masculino' : selectedPatient.gender === 'Female' ? 'Femenino' : selectedPatient.gender}, {selectedPatient.age} años</p>
              </div>
            </div>

            {/* Read-only Tabs */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              {[
                { id: 'Personal Info', label: 'Información Personal' },
                { id: 'Visit History', label: 'Historial de Visitas' },
                { id: 'Prescriptions', label: 'Recetas' },
                { id: 'Bills', label: 'Facturas' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.75rem 0.5rem',
                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: `2px solid ${activeTab === tab.id ? 'var(--primary)' : 'transparent'}`,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ minHeight: '300px' }}>
              {activeTab === 'Personal Info' && (
                <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div><label style={labelStyle}>Grupo Sanguíneo</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedPatient.bloodGroup}</p></div>
                  <div><label style={labelStyle}>Correo Electrónico</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>sneha@example.com</p></div>
                  <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Dirección Permanente</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>Calle Jardín 402, Apt. Vista al Valle, CDMX, México</p></div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Contacto de Emergencia</label>
                    <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>Ricardo Pérez (Esposo) - 9898989898</p>
                  </div>
                </div>
              )}

              {activeTab === 'Visit History' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {MOCK_APPOINTMENTS.map(app => (
                    <div key={app.id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg-main)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{app.date}</span>
                        <span className="badge badge-success">Completado</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Motivo: Chequeo Regular • Tipo: {app.type === 'Follow-up' ? 'Seguimiento' : 'Consulta'}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Prescriptions' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {MOCK_PRESCRIPTIONS.map(rx => (
                    <div key={rx.id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)' }}>
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--text-main)' }}>{rx.rxId}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rx.date}</p>
                      </div>
                      <button className="action-btn" title="Ver PDF" style={{ backgroundColor: 'var(--bg-sidebar)' }}><FileText size={16} color="var(--primary)" /></button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Bills' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {MOCK_INVOICES.map(inv => (
                    <div key={inv.id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)' }}>
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--text-main)' }}>{inv.invId}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inv.date}</p>
                      </div>
                      <p style={{ fontWeight: 800, color: 'var(--accent)' }}>{inv.total}</p>
                    </div>
                  ))}
                  <p style={{ fontSize: '0.75rem', color: 'var(--danger)', textAlign: 'center', marginTop: '1rem' }}>Aviso: Los detalles de facturación son de solo lectura para los médicos.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Patients;
