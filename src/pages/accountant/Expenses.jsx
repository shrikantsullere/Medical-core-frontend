import React, { useState } from 'react';
import { Wallet, Plus, Search, Filter, Edit, Trash2, Eye, Calendar, Upload, Save } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_EXPENSES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Expenses = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        title="Gestión de Gastos"
        desc="Seguimiento de costos fijos, salarios y facturas de servicios públicos."
        actionLabel="Agregar Gasto"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Modo</th>
              <th>Agregado Por</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_EXPENSES.map(exp => (
              <tr key={exp.id}>
                <td style={{ color: 'var(--text-main)' }}>{exp.date}</td>
                <td><span className="badge badge-blue">{exp.category === 'Rent' ? 'Alquiler' : exp.category === 'Salary' ? 'Salario' : exp.category === 'Utilities' ? 'Servicios' : exp.category === 'Supplies' ? 'Suministros' : exp.category}</span></td>
                <td style={{ color: 'var(--text-main)' }}>{exp.description}</td>
                <td style={{ fontWeight: 700, color: 'var(--danger)' }}>{exp.amount}</td>
                <td style={{ color: 'var(--text-main)' }}>{exp.mode}</td>
                <td><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{exp.addedBy}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver Factura" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={16} color="var(--primary)" /></button>
                    <button className="action-btn" title="Editar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Edit size={16} color="var(--warning)" /></button>
                    <button className="action-btn" title="Eliminar" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Trash2 size={16} color="var(--danger)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Agregar Gasto">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Categoría de Gasto *</label>
              <select style={inputStyle} required>
                <option value="Rent">Alquiler</option>
                <option value="Salary">Salario</option>
                <option value="Utilities">Servicios Públicos</option>
                <option value="Supplies">Suministros</option>
                <option value="Other">Otro</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Fecha de Gasto *</label>
              <input type="date" style={inputStyle} defaultValue={new Date().toISOString().split('T')[0]} required />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Descripción *</label>
            <input type="text" placeholder="ej. Factura de electricidad de marzo" style={inputStyle} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Monto ($) *</label>
              <input type="number" placeholder="0.00" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Modo de Pago</label>
              <select style={inputStyle}>
                <option value="Online">En Línea</option>
                <option value="Bank Transfer">Transferencia Bancaria</option>
                <option value="UPI">UPI (Transferencia Móvil)</option>
                <option value="Cash">Efectivo</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Adjunto (Subir Factura)</label>
            <div style={{ border: '2px dashed var(--border)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Upload size={24} style={{ marginBottom: '0.5rem' }} />
              <p style={{ fontSize: '0.8rem' }}>Arrastre o haga clic para subir el recibo</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
              <Save size={18} /> Guardar Gasto
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

export default Expenses;
