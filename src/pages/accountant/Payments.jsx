import React, { useState } from 'react';
import { Eye, Printer, Search, Plus, Save, Calendar, FileText, CreditCard } from 'lucide-react';
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
        title="Cobros de Pagos"
        desc="Registre y ajuste los pagos de los pacientes en todos los modos."
        actionLabel="Agregar / Ajustar Pago"
        onAction={() => setIsDrawerOpen(true)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nro. Recibo</th>
              <th>Nro. Factura</th>
              <th>Nombre del Paciente</th>
              <th>Monto</th>
              <th>Modo</th>
              <th>Ref / ID de TXN</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYMENTS.map(p => (
              <tr key={p.id}>
                <td><span style={{ fontWeight: 600, color: 'var(--primary)' }}>{p.txId}</span></td>
                <td><span style={{ color: 'var(--text-muted)' }}>{p.invId}</span></td>
                <td><b style={{ color: 'var(--heading)' }}>{p.clinic}</b></td>
                <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{p.amount}</td>
                <td><span className="badge badge-blue">{p.mode === 'Cash' ? 'Efectivo' : p.mode === 'Card' ? 'Tarjeta' : p.mode === 'Online' ? 'En Línea' : p.mode}</span></td>
                <td><code style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TXN_987654</code></td>
                <td style={{ color: 'var(--text-main)' }}>{p.date}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver Recibo" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={16} color="var(--primary)" /></button>
                    <button className="action-btn" title="Imprimir" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Printer size={16} color="var(--text-muted)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Agregar / Ajustar Pago">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Número de Factura *</label>
            <select style={inputStyle} required>
              <option value="">Seleccionar Factura</option>
              {MOCK_INVOICES.map(inv => <option key={inv.id}>{inv.invId} - {inv.patient} ({inv.total})</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Monto del Pago ($) *</label>
            <input type="number" placeholder="Ingrese el Monto" style={inputStyle} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Modo de Pago *</label>
              <select style={inputStyle} required>
                <option value="Cash">Efectivo</option>
                <option value="UPI">UPI (Transferencia Móvil)</option>
                <option value="Card">Tarjeta</option>
                <option value="Online">En Línea</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Fecha de Pago</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>ID de Transacción / Nro. de Referencia</label>
            <input type="text" placeholder="ej. UPI-ID, Ref. Bancaria" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Observaciones del Contador</label>
            <textarea placeholder="ej. Pago parcial ajustado..." style={{ ...inputStyle, height: '80px' }} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
              <Save size={18} /> Guardar Pago
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

export default Payments;
