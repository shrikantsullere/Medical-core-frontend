import React, { useState } from 'react';
import { Eye, CreditCard, Download, Printer, Search, Building, User, FileText } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_INVOICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Billing = () => {
  const [selectedInv, setSelectedInv] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewInvoice = (inv) => {
    setSelectedInv(inv);
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
      <SectionHeader title="Facturas y Pagos" desc="Vea sus facturas y pague los honorarios de la clínica de forma segura." />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nro. Factura</th>
              <th>Clínica</th>
              <th>Fecha</th>
              <th>Monto Total</th>
              <th>Monto Pagado</th>
              <th>Monto Adeudado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVOICES.map(inv => (
              <tr key={inv.id}>
                <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{inv.invId}</span></td>
                <td style={{ color: 'var(--text-main)' }}>City Dental Clinic</td>
                <td style={{ color: 'var(--text-main)' }}>{inv.date}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{inv.total}</td>
                <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{inv.paid}</td>
                <td style={{ color: inv.due !== '₹ 0' ? 'var(--danger)' : 'var(--text-muted)', fontWeight: 700 }}>{inv.due}</td>
                <td>
                  <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : inv.status === 'Partial' ? 'badge-warning' : 'badge-danger'}`}>
                    {inv.status === 'Paid' ? 'Pagado' : inv.status === 'Partial' ? 'Parcial' : inv.status === 'Unpaid' ? 'No Pagado' : inv.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" onClick={() => handleViewInvoice(inv)} title="Ver Factura" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    {inv.status !== 'Paid' && (
                      <button className="action-btn" title="Pagar Ahora" style={{ backgroundColor: 'var(--bg-sidebar)' }}><CreditCard size={18} color="var(--accent)" /></button>
                    )}
                    <button className="action-btn" title="Descargar PDF" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Download size={18} color="var(--text-muted)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Detalles de la Factura">
        {selectedInv && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Clinic & Doctor Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--heading)' }}>City Dental Clinic</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>123 Clinic St, Medical Area, New Delhi</p>
                <p style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '0.5rem' }}>Atendido por: {selectedInv.doctor}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading)' }}>{selectedInv.invId}</p>
                <p style={{ color: 'var(--text-muted)' }}>{selectedInv.date}</p>
              </div>
            </div>

            {/* Breakdown */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: 'var(--heading)' }}>Servicios y Cargos</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '16px', backgroundColor: 'var(--bg-main)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
                  <span style={{ fontWeight: 600 }}>Consulta General</span>
                  <span>₹ 500.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
                  <span style={{ fontWeight: 600 }}>Radiografía Digital</span>
                  <span>₹ 800.00</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--border)', margin: '0.5rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Impuesto (IVA 5%)</span>
                  <span>₹ 65.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Descuento</span>
                  <span>- ₹ 0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading)', marginTop: '0.5rem' }}>
                  <span>Total a Pagar</span>
                  <span style={{ color: 'var(--primary)' }}>{selectedInv.total}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {selectedInv.status !== 'Paid' && (
                <button style={{ flex: 2, backgroundColor: 'var(--accent)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                  <CreditCard size={18} /> Pagar en Línea Ahora
                </button>
              )}
              <button style={{ flex: 1, backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}>
                <Download size={18} /> PDF
              </button>
              <button style={{ flex: 1, backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}>
                <Printer size={18} /> Imprimir
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Billing;
