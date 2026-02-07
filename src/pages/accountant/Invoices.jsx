import React, { useState } from 'react';
import { Eye, Download, Send, Search, Filter, Printer, FileText, User, Building } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_INVOICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Invoices = () => {
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
      <SectionHeader title="Facturas Financieras" desc="Supervise la facturación de pacientes, los montos adeudados y el estado de la recaudación." />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nro. Factura</th>
              <th>Paciente</th>
              <th>Médico</th>
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
                <td><b style={{ color: 'var(--heading)' }}>{inv.patient}</b></td>
                <td style={{ color: 'var(--text-main)' }}>{inv.doctor}</td>
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
                    <button className="action-btn" onClick={() => handleViewInvoice(inv)} title="Ver Detalle" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Descargar PDF" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Download size={18} color="var(--accent)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Detalle de la Factura">
        {selectedInv && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header / Meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--heading)' }}>{selectedInv.invId}</h3>
                <p style={{ color: 'var(--text-muted)' }}>Fecha: {selectedInv.date}</p>
              </div>
              <span className={`badge ${selectedInv.status === 'Paid' ? 'badge-success' : 'badge-warning'}`} style={{ padding: '0.5rem 1rem' }}>
                {selectedInv.status === 'Paid' ? 'Pagado' : selectedInv.status === 'Partial' ? 'Parcial' : selectedInv.status === 'Unpaid' ? 'No Pagado' : selectedInv.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                <label style={labelStyle}><Building size={14} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} /> Info de la Clínica</label>
                <p style={{ fontWeight: 800, color: 'var(--heading)' }}>City Dental Clinic</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>123 Clinic St, Medical Area, New Delhi</p>
              </div>
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                <label style={labelStyle}><User size={14} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} /> Info del Paciente</label>
                <p style={{ fontWeight: 800, color: 'var(--heading)' }}>{selectedInv.patient}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>+91 98765 43210</p>
              </div>
            </div>

            {/* Breakdown */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: 'var(--heading)' }}>Desglose de Montos</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'var(--bg-sidebar)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}><span>Consulta General</span><span>₹ 500.00</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}><span>Prueba de Sangre (CBC)</span><span>₹ 500.00</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}><span>Medicamentos</span><span>₹ 500.00</span></div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--border)', margin: '0.5rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}><span>Descuento</span><span>- ₹ 0.00</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}><span>Impuesto (IVA 18%)</span><span>₹ 270.00</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.5rem' }}>
                  <span>Monto Neto</span><span>{selectedInv.total}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                <Printer size={18} /> Imprimir Factura
              </button>
              <button style={{ flex: 1, backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}>
                <Download size={18} /> Descargar PDF
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Invoices;
