import React, { useState } from 'react';
import { Eye, Download, Search, ClipboardList, User, Calendar, Droplets, Info } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_PRESCRIPTIONS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Prescriptions = () => {
  const [selectedRx, setSelectedRx] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewRx = (rx) => {
    setSelectedRx(rx);
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
      <SectionHeader title="Recetas" desc="Acceda a sus recetas digitales y recomendaciones médicas." />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Receta</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PRESCRIPTIONS.map(rx => (
              <tr key={rx.id}>
                <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{rx.rxId}</span></td>
                <td><b style={{ color: 'var(--heading)' }}>Dr. Sameer Khan</b></td>
                <td style={{ color: 'var(--text-main)' }}>{rx.date}</td>
                <td><span className="badge badge-blue">{rx.status === 'Active' ? 'Activa' : rx.status === 'Completed' ? 'Completada' : rx.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" onClick={() => handleViewRx(rx)} title="Ver Receta" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Descargar PDF" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Download size={18} color="var(--accent)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Detalles de la Receta">
        {selectedRx && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header info */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--heading)' }}>Dr. Sameer Khan</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Especialistas en Cardiología • City Dental Clinic</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Diagnóstico</label>
                <div style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--heading)' }}>Hipertensión Leve y Ansiedad</div>
              </div>
              <div>
                <label style={labelStyle}>Próxima Cita</label>
                <div style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>05 Abril 2024</div>
              </div>
            </div>

            {/* Medicines */}
            <div>
              <label style={labelStyle}>Medicamentos y Dosis</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { name: 'Telmisartan 40mg', dose: '1-0-0', duration: '30 Días', instruction: 'Antes de Comer' },
                  { name: 'Paracetamol 650mg', dose: '1-1-1', duration: '5 Días', instruction: 'Después de Comer' }
                ].map((med, i) => (
                  <div key={i} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-main)' }}>
                    <div>
                      <p style={{ fontWeight: 700, color: 'var(--heading)' }}>{med.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{med.instruction}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: 'var(--primary)', padding: '0.25rem 0.6rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>{med.dose}</span>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{med.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advice */}
            <div style={{ backgroundColor: 'rgba(14, 165, 233, 0.05)', border: '1px solid var(--border)', padding: '1.25rem', borderRadius: '14px' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Info size={18} /> Recomendaciones Médicas</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                Evite comidas grasas y el consumo de sal. Haga ejercicio durante 30 minutos al día. Tome abundante agua.
              </p>
            </div>

            <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', border: 'none', cursor: 'pointer' }}>
              <Download size={18} /> Descargar Copia Digital (PDF)
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Prescriptions;
