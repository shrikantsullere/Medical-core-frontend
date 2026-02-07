import React, { useState } from 'react';
import { Eye, Printer, Send, Search, Plus, Trash2 } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_INVOICES, MOCK_PATIENTS, MOCK_DOCTORS, MOCK_SERVICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Billing = () => {
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
        title="Facturación y Facturas"
        desc="Genere facturas y gestione los recibos de la clínica."
        actionLabel="Crear Factura"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nro. Factura</th>
              <th>Nombre del Paciente</th>
              <th>Fecha</th>
              <th>Monto Total</th>
              <th>Monto Pagado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVOICES.map(inv => (
              <tr key={inv.id}>
                <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{inv.invId}</span></td>
                <td><b style={{ color: 'var(--heading)' }}>{inv.patient}</b></td>
                <td style={{ color: 'var(--text-main)' }}>{inv.date}</td>
                <td style={{ color: 'var(--text-main)' }}>{inv.total}</td>
                <td style={{ color: 'var(--accent)', fontWeight: 700 }}>{inv.paid}</td>
                <td><span className={`badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{inv.status === 'Paid' ? 'Pagado' : inv.status === 'Partial' ? 'Parcial' : inv.status === 'Unpaid' ? 'No Pagado' : inv.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={16} color="var(--primary)" /></button>
                    <button className="action-btn" title="Imprimir" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Printer size={16} color="var(--text-muted)" /></button>
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
              <select style={inputStyle}>
                <option>Seleccionar Paciente</option>
                {MOCK_PATIENTS.map(p => <option key={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Médico *</label>
              <select style={inputStyle}>
                {MOCK_DOCTORS.map(d => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Servicios / Artículos</label>
            <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.5fr', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <span>SERVICIO</span><span>PRECIO</span><span>CANT</span><span></span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.5fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <select style={{ ...inputStyle, padding: '0.4rem', border: '1px solid var(--border)' }}>{MOCK_SERVICES.map(s => <option key={s.id}>{s.name}</option>)}</select>
                <input type="number" defaultValue="500" style={{ ...inputStyle, padding: '0.4rem', border: '1px solid var(--border)' }} />
                <input type="number" defaultValue="1" style={{ ...inputStyle, padding: '0.4rem', border: '1px solid var(--border)' }} />
                <button type="button" style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
              <button style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Plus size={14} /> Agregar otro artículo
              </button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div><label style={labelStyle}>Descuento ($)</label><input type="number" defaultValue="0" style={{ ...inputStyle, border: '1px solid var(--border)' }} /></div>
            <div><label style={labelStyle}>Impuesto (IVA %)</label><input type="number" defaultValue="18" style={{ ...inputStyle, border: '1px solid var(--border)' }} /></div>
          </div>
          <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', padding: '1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Monto Final</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>$ 590.00</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Guardar Factura</button>
            <button className="btn-secondary" style={{ flex: 1, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--accent)', cursor: 'pointer' }}>
              <Printer size={18} /> Guardar e Imprimir
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Billing;
