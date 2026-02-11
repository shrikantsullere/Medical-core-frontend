import React, { useState } from 'react';
import { DollarSign, Printer, Save, Plus } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_PAYMENTS, MOCK_INVOICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Payments = () => {
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
        title="Pagos"
        desc="Rastree los cobros y recibos de los pacientes."
        actionLabel="Registrar Pago"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No. de Recibo</th>
              <th>No. de Factura</th>
              <th>Paciente</th>
              <th>Monto</th>
              <th>Método de Pago</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYMENTS.map(pay => (
              <tr key={pay.id}>
                <td data-label="No. de Recibo"><span style={{ fontWeight: 600, color: 'var(--primary)' }}>{pay.txId}</span></td>
                <td data-label="No. de Factura"><span style={{ color: 'var(--text-muted)' }}>{pay.invId}</span></td>
                <td data-label="Paciente"><b style={{ color: 'var(--heading)' }}>{pay.clinic}</b></td>
                <td data-label="Monto" style={{ fontWeight: 700, color: 'var(--accent)' }}>{pay.amount}</td>
                <td data-label="Método de Pago"><span className="badge badge-blue">{pay.mode === 'Cash' ? 'Efectivo' : pay.mode === 'Card' ? 'Tarjeta' : pay.mode}</span></td>
                <td data-label="Fecha" style={{ color: 'var(--text-main)' }}>{pay.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Registrar Pago">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>No. de Factura *</label>
            <select style={inputStyle} required>
              <option value="">Seleccionar Factura</option>
              {MOCK_INVOICES.filter(inv => inv.status !== 'Paid').map(inv => (
                <option key={inv.id}>{inv.invId} - {inv.patient} ({inv.total})</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Monto a Cobrar ($) *</label>
            <input type="number" placeholder="500" style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Método de Pago *</label>
            <select style={inputStyle} required>
              <option value="Cash">Efectivo</option>
              <option value="UPI">Transferencia (UPI)</option>
              <option value="Card">Tarjeta</option>
              <option value="Online">En Línea</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>ID de Transacción / No. Referencia</label>
            <input type="text" placeholder="TXN12345..." style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Fecha de Pago</label>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={inputStyle} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none' }}>Guardar Pago</button>
            <button type="button" style={{ flex: 1, backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-muted)', padding: '1rem', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--border)' }}>
              <Printer size={18} /> Imprimir Recibo
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Payments;
