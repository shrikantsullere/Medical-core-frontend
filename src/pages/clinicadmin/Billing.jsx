import React, { useState } from 'react';
import { FileText, Plus, Search, Download, Eye, Send, Trash2 } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_INVOICES, MOCK_PATIENTS, MOCK_DOCTORS, MOCK_SERVICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Billing = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return (
    <div className="fade-in">
      <SectionHeader
        title="Facturación y Facturas"
        desc="Gestione la facturación y cobranzas de los pacientes."
        actionLabel="Crear Factura"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No. de Factura</th>
              <th>Nombre del Paciente</th>
              <th>Fecha de Factura</th>
              <th>Monto Total</th>
              <th>Monto Pagado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVOICES.map(inv => (
              <tr key={inv.id}>
                <td data-label="No. de Factura"><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{inv.invId}</span></td>
                <td data-label="Nombre del Paciente"><b>{inv.patient}</b></td>
                <td data-label="Fecha de Factura">{inv.date}</td>
                <td data-label="Monto Total" style={{ fontWeight: 700, color: 'var(--heading)' }}>{inv.total}</td>
                <td data-label="Monto Pagado" style={{ fontWeight: 700, color: 'var(--accent)' }}>{inv.paid}</td>
                <td data-label="Estado">
                  <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : inv.status === 'Partial' ? 'badge-warning' : 'badge-danger'}`}>
                    {inv.status === 'Paid' ? 'Pagado' : inv.status === 'Partial' ? 'Parcial' : 'No Pagado'}
                  </span>
                </td>
                <td data-label="Acciones">
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="action-btn" title="Ver Factura" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={16} color="var(--primary)" /></button>
                    <button className="action-btn" title="Descargar PDF" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Download size={16} color="var(--secondary)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Crear Factura">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Paciente *</label>
              <select style={inputStyle} required>
                <option value="">Seleccionar Paciente</option>
                {MOCK_PATIENTS.map(p => <option key={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Médico *</label>
              <select style={inputStyle} required>
                <option value="">Seleccionar Médico</option>
                {MOCK_DOCTORS.map(d => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Servicios / Cargos *</label>
            <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.5fr', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <span>SERVICIO</span>
                <span>PRECIO</span>
                <span>CANT</span>
                <span></span>
              </div>
              {/* Mock Item Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.5fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <select style={{ ...inputStyle, padding: '0.4rem' }}>
                  {MOCK_SERVICES.map(s => <option key={s.id}>{s.name}</option>)}
                </select>
                <input type="number" defaultValue="500" style={{ ...inputStyle, padding: '0.4rem' }} />
                <input type="number" defaultValue="1" style={{ ...inputStyle, padding: '0.4rem' }} />
                <button type="button" style={{ color: 'var(--danger)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
              <button type="button" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Plus size={14} /> Agregar otro concepto
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Descuento ($)</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Impuesto (IVA %)</label>
              <input type="number" defaultValue="16" style={inputStyle} />
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>Monto Final</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>$ 590.00</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none' }}>Guardar Factura</button>
            <button className="btn-secondary" style={{ flex: 1, backgroundColor: 'var(--bg-sidebar)', color: 'var(--secondary)', padding: '1rem', borderRadius: '12px', fontWeight: 600, border: '1px solid var(--secondary)' }}>Guardar y Enviar</button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Billing;
