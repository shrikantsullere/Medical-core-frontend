import React, { useState } from 'react';
import { Eye, Edit, FileText, UserPlus, Search, Filter, Phone, Mail, MapPin, Calendar, Activity, Receipt, ClipboardList, Plus, Trash2 } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS, MOCK_INVOICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Patients = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewType, setViewType] = useState('add'); // add, view
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');

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

  const filteredPatients = MOCK_PATIENTS.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mobile.includes(searchTerm);
    const matchesGender = genderFilter === 'All' || patient.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  const handleAddPatient = () => {
    setViewType('add');
    setSelectedPatient(null);
    setIsDrawerOpen(true);
  };

  const handleViewPatient = (patient) => {
    setViewType('view');
    setSelectedPatient(patient);
    setActiveTab('info');
    setIsDrawerOpen(true);
  };

  return (
    <div className="fade-in">
      <SectionHeader
        title="Pacientes"
        desc="Gestione todos los registros e historiales de los pacientes."
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
              style={{ ...inputStyle, paddingLeft: '2.8rem', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
            />
          </div>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            style={{ padding: '0 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', height: '44px' }}
          >
            <option value="All">Todos los Géneros</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Other">Otro</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID del Paciente</th>
              <th>Nombre del Paciente</th>
              <th>Móvil</th>
              <th>Género</th>
              <th>Última Visita</th>
              <th>Monto Adeudado</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td data-label="ID del Paciente"><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{patient.patientId}</span></td>
                <td data-label="Nombre del Paciente"><b>{patient.name}</b></td>
                <td data-label="Móvil">{patient.mobile}</td>
                <td data-label="Género">{patient.gender === 'Male' ? 'Masculino' : patient.gender === 'Female' ? 'Femenino' : patient.gender}</td>
                <td data-label="Última Visita">{patient.lastVisit}</td>
                <td data-label="Monto Adeudado" style={{ color: patient.dueAmount !== '₹ 0' ? 'var(--danger)' : 'var(--accent)', fontWeight: 700 }}>{patient.dueAmount}</td>
                <td data-label="Estado">
                  <span className={`badge ${patient.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {patient.status === 'Active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td data-label="Acciones">
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" onClick={() => handleViewPatient(patient)} title="Ver Perfil" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Editar" style={{ backgroundColor: 'var(--bg-sidebar)' }} onClick={() => { setViewType('add'); setSelectedPatient(patient); setIsDrawerOpen(true); }}><Edit size={18} color="var(--secondary)" /></button>
                    <button className="action-btn" title="Crear Factura" style={{ backgroundColor: 'var(--bg-sidebar)' }} onClick={() => alert('Abriendo el generador de facturas para ' + patient.name)}><FileText size={18} color="#10b981" /></button>
                    <button className="action-btn" title="Eliminar" style={{ backgroundColor: 'var(--bg-sidebar)' }} onClick={() => confirm('¿Estás seguro?') && alert('Registro del paciente eliminado')}><Trash2 size={18} color="var(--danger)" /></button>
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
                <input type="text" placeholder="Ingrese el nombre completo del paciente" style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Número de Móvil *</label>
                <input type="tel" placeholder="00000 00000" style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Correo Electrónico</label>
                <input type="email" placeholder="paciente@ejemplo.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Género</label>
                <select style={inputStyle}>
                  <option value="Male">Masculino</option>
                  <option value="Female">Femenino</option>
                  <option value="Other">Otro</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Fecha de Nacimiento / Edad</label>
                <input type="text" placeholder="ej. 25" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Grupo Sanguíneo</label>
                <select style={inputStyle}>
                  <option>Seleccionar</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div style={{ gridColumn: 'span 2', marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Credenciales de Acceso</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Correo de Acceso *</label>
                    <input type="email" placeholder="login@email.com" style={inputStyle} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Contraseña *</label>
                    <input type="password" placeholder="Crear Contraseña" style={inputStyle} required />
                  </div>
                </div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Dirección</label>
                <textarea placeholder="Dirección Completa" style={{ ...inputStyle, height: '60px', resize: 'none' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Nombre de Contacto de Emergencia</label>
                <input type="text" placeholder="Nombre del Contacto" style={inputStyle} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Número de Contacto de Emergencia</label>
                <input type="tel" placeholder="Número del Contacto" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none' }}>Guardar</button>
              <button className="btn-secondary" style={{ flex: 1, backgroundColor: 'var(--bg-sidebar)', color: 'var(--primary)', padding: '1rem', borderRadius: '12px', fontWeight: 600, border: '1px solid var(--primary)' }}>Guardar y Reservar Cita</button>
              <button type="button" onClick={() => setIsDrawerOpen(false)} style={{ backgroundColor: 'transparent', color: 'var(--danger)', padding: '1rem', borderRadius: '12px', fontWeight: 600, border: '1px solid var(--danger)' }}>Cancelar</button>
            </div>
          </form>
        ) : selectedPatient && (
          <div style={{ padding: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '20px', backgroundColor: 'var(--bg-header)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--heading)' }}>{selectedPatient.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{selectedPatient.patientId}</p>
              </div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              {[
                { id: 'info', label: 'Info Personal' },
                { id: 'history', label: 'Historial de Citas' },
                { id: 'bills', label: 'Facturas y Pagos' },
                { id: 'rx', label: 'Recetas' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '1rem 1.25rem',
                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: `2px solid ${activeTab === tab.id ? 'var(--primary)' : 'transparent'}`,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    backgroundColor: 'transparent'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ minHeight: '300px' }}>
              {activeTab === 'info' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div><label style={labelStyle}>Género</label><p style={{ color: 'var(--text-main)' }}>{selectedPatient.gender === 'Male' ? 'Masculino' : selectedPatient.gender === 'Female' ? 'Femenino' : selectedPatient.gender}</p></div>
                  <div><label style={labelStyle}>Edad</label><p style={{ color: 'var(--text-main)' }}>{selectedPatient.age} años</p></div>
                  <div><label style={labelStyle}>Grupo Sanguíneo</label><p style={{ color: 'var(--text-main)' }}>{selectedPatient.bloodGroup}</p></div>
                  <div><label style={labelStyle}>Móvil</label><p style={{ color: 'var(--text-main)' }}>{selectedPatient.mobile}</p></div>
                  <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Dirección</label><p style={{ color: 'var(--text-main)' }}>Calle 123, Área Médica, Ciudad de México</p></div>
                </div>
              )}
              {activeTab === 'history' && (
                <div>
                  {MOCK_APPOINTMENTS.map((app, i) => (
                    <div key={i} style={{ padding: '1rem', border: '1px solid #f1f5f9', borderRadius: '12px', marginBottom: '0.75rem' }}>
                      <p style={{ fontWeight: 700 }}>{app.date} • {app.time}</p>
                      <p style={{ color: '#64748b' }}>{app.doctor} • {app.type}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'bills' && (
                <div>
                  {MOCK_INVOICES.map((inv, i) => (
                    <div key={i} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--bg-main)' }}>
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--heading)' }}>{inv.invId}</p>
                        <p style={{ color: 'var(--text-muted)' }}>{inv.date}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 800, color: 'var(--primary)' }}>{inv.total}</p>
                        <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{inv.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'rx' && <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>No se encontraron recetas.</p>}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Patients;
