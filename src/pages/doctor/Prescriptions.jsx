import React, { useState } from 'react';
import { FileText, Printer, Edit, Eye, Download, Plus, Trash2, Save, User, Activity } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_PRESCRIPTIONS, MOCK_PATIENTS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Prescriptions = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // list or form
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleCreateNew = () => {
    setMedicines([{ name: '', dosage: '', frequency: '', duration: '' }]);
    setViewMode('form');
    setIsDrawerOpen(true);
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: '0.3rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '0.9rem',
    outline: 'none',
  };

  return (
    <div className="fade-in">
      <SectionHeader
        title="Recetas"
        desc="Registros digitales de medicamentos y consejos para pacientes."
        actionLabel="Crear Receta"
        onAction={handleCreateNew}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Receta</th>
              <th>Nombre del Paciente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PRESCRIPTIONS.map(rx => (
              <tr key={rx.id}>
                <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{rx.rxId}</span></td>
                <td><b style={{ color: 'var(--heading)' }}>{rx.patient}</b></td>
                <td style={{ color: 'var(--text-main)' }}>{rx.date}</td>
                <td><span className="badge badge-success">{rx.status === 'Active' ? 'Activa' : 'Inactiva'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Editar (Solo mismo día)" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Edit size={18} color="var(--secondary)" /></button>
                    <button className="action-btn" title="Imprimir / Descargar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Download size={18} color="var(--accent)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Crear Nueva Receta">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Patient Details (Shared Context Mock) */}
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Nombre del Paciente</label>
                <select style={{ ...inputStyle, backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
                  <option>Seleccionar Paciente</option>
                  {MOCK_PATIENTS.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>Edad</label><input type="text" defaultValue="34" style={{ ...inputStyle, backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)', border: '1px solid var(--border)' }} readOnly /></div>
              <div><label style={labelStyle}>Género</label><input type="text" defaultValue="Masculino" style={{ ...inputStyle, backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)', border: '1px solid var(--border)' }} readOnly /></div>
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} /> Diagnóstico y Notas</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Síntomas</label>
                <textarea placeholder="ej. Fiebre, Tos, Dolor Torácico" style={{ ...inputStyle, height: '60px', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
              <div>
                <label style={labelStyle}>Notas de Diagnóstico</label>
                <textarea placeholder="Observación y notas clínicas" style={{ ...inputStyle, height: '60px', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
              </div>
            </div>
          </div>

          {/* Medicines (Repeater) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--heading)' }}>Medicamentos</h4>
              <button type="button" onClick={addMedicine} style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Plus size={14} /> Agregar Medicamento
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {medicines.map((med, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 0.4fr', gap: '0.5rem', alignItems: 'center', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--bg-main)' }}>
                  <input placeholder="Nombre del Medicamento" style={{ ...inputStyle, padding: '0.5rem', backgroundColor: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                  <input placeholder="Dosis" style={{ ...inputStyle, padding: '0.5rem', backgroundColor: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                  <input placeholder="Frec" style={{ ...inputStyle, padding: '0.5rem', backgroundColor: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                  <input placeholder="Dur" style={{ ...inputStyle, padding: '0.5rem', backgroundColor: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
                  {index > 0 && <button type="button" onClick={() => removeMedicine(index)} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>}
                </div>
              ))}
            </div>
          </div>

          {/* Advice */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Instrucciones Generales / Recomendaciones</label>
              <textarea placeholder="ej. Reposo en cama durante 2 días, Beber agua tibia" style={{ ...inputStyle, height: '60px', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
            </div>
            <div>
              <label style={labelStyle}>Fecha de Seguimiento</label>
              <input type="date" style={{ ...inputStyle, backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }} />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
              <Save size={20} /> Guardar Receta
            </button>
            <button className="btn-secondary" style={{ flex: 1, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', padding: '1rem', borderRadius: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--accent)', cursor: 'pointer' }}>
              <Printer size={20} /> Guardar e Imprimir
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Prescriptions;
