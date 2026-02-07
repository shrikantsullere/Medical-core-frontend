import React, { useState } from 'react';
import { Eye, Printer, CreditCard, Search, Calendar } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_PAYMENTS, MOCK_INVOICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Payments = () => {
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
        title="Pagos"
        desc="Cobre y realice el seguimiento de los pagos de pacientes."
        actionLabel="Cobrar Pago"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nro. Recibo</th>
              <th>Nro. Factura</th>
              <th>Paciente</th>
              <th>Monto</th>
              <th>Modo</th>
              <th>Fecha</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYMENTS.map(p => (
              <tr key={p.id}>
                <td><span style={{ fontWeight: 600, color: 'var(--primary)' }}>{p.txId}</span></td>
                <td style={{ color: 'var(--text-main)' }}>{p.invId}</td>
                <td><b style={{ color: 'var(--heading)' }}>{p.clinic}</b></td>
                <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{p.amount}</td>
                <td><span className="badge badge-blue">{p.mode === 'Cash' ? 'Efectivo' : p.mode === 'Card' ? 'Tarjeta' : p.mode}</span></td>
                <td style={{ color: 'var(--text-main)' }}>{p.date}</td>
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

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Cobrar Pago">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Número de Factura *</label>
            <select style={inputStyle}>
              <option>Buscar Factura...</option>
              {MOCK_INVOICES.map(inv => <option key={inv.id}>{inv.invId} - {inv.patient} ({inv.total})</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Monto a Cobrar ($) *</label>
            <input type="number" placeholder="0.00" style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Modo de Pago *</label>
            <select style={inputStyle}>
              <option>Efectivo</option>
              <option>UPI</option>
              <option>Tarjeta</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>ID de Transacción (Opcional)</label>
            <input type="text" placeholder="TXN12345678" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Fecha de Pago</label>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Guardar Pago</button>
            <button type="button" style={{ flex: 1, backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}>
              <Printer size={18} /> Imprimir Recibo
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Payments;
