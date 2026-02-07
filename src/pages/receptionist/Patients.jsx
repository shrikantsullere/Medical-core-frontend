import React, { useState } from 'react';
import { Eye, Edit, Search, Filter, Calendar, FileText, UserPlus, Phone, Mail, MapPin } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS, MOCK_INVOICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewType, setViewType] = useState('list'); // list, add, view
  const [activeTab, setActiveTab] = useState('Información Personal');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredPatients = MOCK_PATIENTS.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mobile.includes(searchTerm);
    const matchesStatus = statusFilter === 'Todos' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPatient = () => {
    setViewType('add');
    setSelectedPatient(null);
    setIsDrawerOpen(true);
  };

  const handleViewProfile = (patient) => {
    setViewType('view');
    setSelectedPatient(patient);
    setActiveTab('Información Personal');
    setIsDrawerOpen(true);
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '0.4rem'
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
        title="Pacientes"
        desc="Gestione los registros y altas de pacientes."
        actionLabel="Agregar Paciente"
        onAction={handleAddPatient}
      />

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-sidebar)' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar por nombre, ID o móvil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '2.8rem', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', height: '44px', cursor: 'pointer' }}
          >
            <option value="Todos">Todos los Estados</option>
            <option value="Active">Activo</option>
            <option value="Inactive">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Paciente</th>
              <th>Nombre del Paciente</th>
              <th>Móvil</th>
              <th>Género</th>
              <th>Última Visita</th>
              <th>Vencimiento</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td><span style={{ fontWeight: 600, color: '#64748b' }}>{patient.patientId}</span></td>
                <td><b>{patient.name}</b></td>
                <td style={{ color: 'var(--text-main)' }}>{patient.mobile}</td>
                <td style={{ color: 'var(--text-main)' }}>{patient.gender === 'Male' ? 'Masculino' : patient.gender === 'Female' ? 'Femenino' : patient.gender}</td>
                <td style={{ color: 'var(--text-main)' }}>{patient.lastVisit}</td>
                <td style={{ color: patient.dueAmount !== '$ 0' ? 'var(--danger)' : 'var(--accent)', fontWeight: 700 }}>{patient.dueAmount}</td>
                <td>
                  <span className={`badge ${patient.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {patient.status === 'Active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" onClick={() => handleViewProfile(patient)} title="Ver Perfil" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Editar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Edit size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Reservar Cita" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Calendar size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Crear Factura" style={{ backgroundColor: 'var(--bg-sidebar)' }}><FileText size={18} color="var(--accent)" /></button>
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
        title={viewType === 'add' ? "Agregar Paciente" : "Perfil del Paciente"}
      >
        {viewType === 'add' ? (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Nombre Completo *</label>
                <input type="text" placeholder="Nombre Completo" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} required />
              </div>
              <div>
                <label style={labelStyle}>Número de Móvil *</label>
                <input type="tel" placeholder="Número de Móvil" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} required />
              </div>
              <div>
                <label style={labelStyle}>Correo Electrónico</label>
                <input type="email" placeholder="Correo Electrónico" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <div>
                <label style={labelStyle}>Género</label>
                <select style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Otro</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Fecha de Nac. / Edad</label>
                <input type="text" placeholder="Fecha o Edad" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Dirección</label>
                <textarea placeholder="Dirección Completa" style={{ ...inputStyle, height: '60px', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Nombre de Contacto de Emergencia</label>
                <input type="text" placeholder="Nombre del Contacto" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Número de Contacto de Emergencia</label>
                <input type="tel" placeholder="Número del Contacto" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Guardar</button>
              <button className="btn-secondary" style={{ flex: 1, backgroundColor: 'rgba(124, 58, 237, 0.1)', color: 'var(--primary)', padding: '1rem', borderRadius: '12px', fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer' }}>Guardar y Reservar Cita</button>
              <button type="button" onClick={() => setIsDrawerOpen(false)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '12px', fontWeight: 600, border: '1px solid var(--danger)', cursor: 'pointer' }}>Cancelar</button>
            </div>
          </form>
        ) : selectedPatient && (
          <div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '20px', backgroundColor: 'var(--bg-header)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 800 }}>
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--heading)' }}>{selectedPatient.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>ID: {selectedPatient.patientId}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              {['Información Personal', 'Historial de Citas', 'Facturas y Pagos'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '0.75rem 0.5rem',
                    color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: `2px solid ${activeTab === tab ? 'var(--primary)' : 'transparent'}`,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div>
              {activeTab === 'Información Personal' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div><label style={labelStyle}>Género</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedPatient.gender === 'Male' ? 'Masculino' : selectedPatient.gender === 'Female' ? 'Femenino' : selectedPatient.gender}</p></div>
                  <div><label style={labelStyle}>Edad</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedPatient.age} años</p></div>
                  <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Dirección</label><p style={{ fontWeight: 600, color: 'var(--text-main)' }}>Medical Area, New Delhi</p></div>
                </div>
              )}
              {activeTab === 'Historial de Citas' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {MOCK_APPOINTMENTS.map(app => (
                    <div key={app.id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'var(--bg-main)' }}>
                      <p style={{ fontWeight: 700, color: 'var(--heading)' }}>{app.date} • {app.time}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{app.doctor} • {app.type === 'New Visit' ? 'Nueva Visita' : app.type === 'Follow-up' ? 'Seguimiento' : app.type}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'Facturas y Pagos' && (
                <div>
                  {MOCK_INVOICES.map(inv => (
                    <div key={inv.id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--bg-main)' }}>
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--heading)' }}>{inv.invId}</p>
                        <p style={{ color: 'var(--text-muted)' }}>{inv.date}</p>
                      </div>
                      <p style={{ fontWeight: 800, color: 'var(--accent)' }}>{inv.total}</p>
                    </div>
                  ))}
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
