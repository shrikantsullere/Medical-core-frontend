import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Check, Play, Square, Circle, Shield, Star, DollarSign, Users } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_PLANS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Plans = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [viewType, setViewType] = useState('add');

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '0.9rem',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  };

  const handleViewPlan = (plan) => {
    setSelectedPlan(plan);
    setViewType('view');
    setIsDrawerOpen(true);
  };

  return (
    <div className="fade-in">
      <SectionHeader
        title="Planes de Suscripción"
        desc="Cree y gestione los paquetes de suscripción para las clínicas."
        actionLabel="Crear Plan"
        onAction={() => { setViewType('add'); setSelectedPlan(null); setIsDrawerOpen(true); }}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre del Plan</th>
              <th>Ciclo</th>
              <th>Precio</th>
              <th>Médicos</th>
              <th>Personal</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PLANS.map(plan => (
              <tr key={plan.id}>
                <td data-label="Nombre del Plan"><b>{plan.name}</b></td>
                <td data-label="Ciclo">{plan.cycle === 'Monthly' ? 'Mensual' : 'Anual'}</td>
                <td data-label="Precio">{plan.price}</td>
                <td data-label="Médicos">{plan.doctors}</td>
                <td data-label="Personal">{plan.staff}</td>
                <td data-label="Estado">
                  <span className={`badge ${plan.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {plan.status === 'Active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td data-label="Acciones">
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver Características" onClick={() => handleViewPlan(plan)} style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Editar" onClick={() => { setSelectedPlan(plan); setViewType('add'); setIsDrawerOpen(true); }} style={{ backgroundColor: 'var(--bg-sidebar)' }}><Edit size={18} color="var(--secondary)" /></button>
                    <button className="action-btn" title={plan.status === 'Active' ? 'Desactivar' : 'Activar'} onClick={() => confirm(`¿Está seguro de que desea ${plan.status === 'Active' ? 'desactivar' : 'activar'} este plan?`) && alert('Estado del plan actualizado.')} style={{ backgroundColor: 'var(--bg-sidebar)' }}>
                      {plan.status === 'Active' ? <Square size={16} color="var(--danger)" /> : <Play size={16} color="var(--accent)" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={viewType === 'add' ? "Nuevo Plan de Suscripción" : "Características del Plan"}>
        {viewType === 'add' ? (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Nombre del Plan</label>
              <input type="text" placeholder="ej. Estándar Mensual" style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Ciclo de Facturación</label>
                <select style={inputStyle}>
                  <option value="Monthly">Mensual</option>
                  <option value="Yearly">Anual</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Precio ($)</label>
                <input type="text" placeholder="5000" style={inputStyle} />
              </div>
            </div>
            {/* ... rest of add form ... */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none' }}>Guardar Plan</button>
              <button type="button" onClick={() => setIsDrawerOpen(false)} style={{ padding: '1rem 1.5rem', borderRadius: '12px', color: 'var(--danger)', border: '1px solid var(--danger)', backgroundColor: 'transparent' }}>Cancelar</button>
            </div>
          </form>
        ) : selectedPlan && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--bg-header)', padding: '2rem', borderRadius: '24px', textAlign: 'center' }}>
              <Star size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.75rem' }}>{selectedPlan.name}</h2>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.5rem' }}>{selectedPlan.price} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/{selectedPlan.cycle}</span></p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}>
                <Users size={20} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>MÉDICOS</label>
                <p style={{ fontWeight: 800, color: 'var(--heading)' }}>Límite: {selectedPlan.doctors}</p>
              </div>
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}>
                <Shield size={20} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>PERSONAL</label>
                <p style={{ fontWeight: 800, color: 'var(--heading)' }}>Límite: {selectedPlan.staff}</p>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '1rem', color: 'var(--heading)' }}>Funciones Incluidas</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Facturación en Línea', 'Registros de Pacientes (EMR)', 'Gestión de Prescripciones', 'Portal de Recepcionista', 'Informes Financieros'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '12px', background: 'var(--bg-main)' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700 }}>Editar Características del Plan</button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Plans;
