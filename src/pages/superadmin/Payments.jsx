import React, { useState } from 'react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_PAYMENTS } from '../../data/mockData';
import { FileText, Download, Eye, CreditCard, Calendar, Building, CheckCircle } from 'lucide-react';
import Drawer from '../../components/Drawer.jsx';
import jsPDF from 'jspdf';

const Payments = () => {
  const [selectedPay, setSelectedPay] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewDetails = (pay) => {
    setSelectedPay(pay);
    setIsDrawerOpen(true);
  };

  const handleDownloadInvoice = (pay) => {
    const doc = new jsPDF();

    // Brand / Title
    doc.setFontSize(24);
    doc.setTextColor(33, 33, 33);
    doc.text("Recibo de Pago", 105, 20, { align: "center" });

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Date Info
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 190, 35, { align: "right" });

    // Payment Info Section
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);

    // Left Column
    doc.setFont("helvetica", "bold");
    doc.text("Detalles del Pagador:", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(pay.clinic, 20, 60);

    // Right Column
    doc.setFont("helvetica", "bold");
    doc.text("Información del Pago:", 120, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`ID de Transacción: ${pay.txId}`, 120, 60);
    doc.text(`Fecha: ${pay.date}`, 120, 68);
    doc.text(`Método: ${pay.mode === 'Card' ? 'Tarjeta' : pay.mode}`, 120, 76);
    doc.text(`Estado: ${pay.status === 'Success' ? 'Éxito' : 'Pendiente'}`, 120, 84);

    // Amount Box
    doc.setFillColor(240, 253, 244); // Light green bg
    doc.setDrawColor(220, 252, 231);
    doc.rect(20, 100, 170, 50, 'FD'); // Fill and Draw

    doc.setFontSize(14);
    doc.setTextColor(21, 128, 61); // Green text
    doc.text("Monto Total Pagado", 105, 115, { align: "center" });

    doc.setFontSize(30);
    doc.setFont("helvetica", "bold");
    doc.text(pay.amount, 105, 135, { align: "center" });

    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text("Gracias por su preferencia.", 105, 180, { align: "center" });
    doc.text("Sistema de Gestión Clínica", 105, 186, { align: "center" });

    // Save
    doc.save(`Recibo_${pay.txId}.pdf`);
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
      <SectionHeader title="Pagos del Sistema" desc="Vea y rastree todos los pagos de suscripción en todo el sistema." />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID de Transacción</th>
              <th>Nombre de la Clínica</th>
              <th>Monto</th>
              <th>Método</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYMENTS.map(pay => (
              <tr key={pay.id}>
                <td data-label="ID de Transacción"><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{pay.txId}</span></td>
                <td data-label="Nombre de la Clínica"><b>{pay.clinic}</b></td>
                <td data-label="Monto" style={{ fontWeight: 700, color: 'var(--primary)' }}>{pay.amount}</td>
                <td data-label="Método">{pay.mode === 'Card' ? 'Tarjeta' : pay.mode}</td>
                <td data-label="Estado">
                  <span className={`badge ${pay.status === 'Success' ? 'badge-success' : 'badge-warning'}`}>
                    {pay.status === 'Success' ? 'Éxito' : 'Pendiente'}
                  </span>
                </td>
                <td data-label="Fecha">{pay.date}</td>
                <td data-label="Acción">
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver Transacción" onClick={() => handleViewDetails(pay)} style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Descargar Recibo" onClick={() => handleDownloadInvoice(pay)} style={{ backgroundColor: 'var(--bg-sidebar)' }}><Download size={18} color="var(--secondary)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Detalles de la Transacción de Pago">
        {selectedPay && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <CheckCircle size={48} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '2rem', color: '#10b981' }}>{selectedPay.amount}</h2>
              <p style={{ fontWeight: 700, color: '#10b981', marginTop: '0.5rem' }}>Pago Exitoso</p>
              <p style={{ fontSize: '0.85rem', color: '#10b981', opacity: 0.8 }}>ID TXN: {selectedPay.txId}</p>
            </div>

            <div className="card" style={{ background: 'var(--bg-sidebar)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--bg-main)' }}><Building size={20} color="var(--primary)" /></div>
                <div>
                  <label style={labelStyle}>Clínica Pagadora</label>
                  <p style={{ fontWeight: 700, color: 'var(--heading)' }}>{selectedPay.clinic}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--bg-main)' }}><CreditCard size={20} color="var(--primary)" /></div>
                <div>
                  <label style={labelStyle}>Método de Pago</label>
                  <p style={{ fontWeight: 700, color: 'var(--heading)' }}>{selectedPay.mode === 'Card' ? 'Tarjeta' : selectedPay.mode}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--bg-main)' }}><Calendar size={20} color="var(--primary)" /></div>
                <div>
                  <label style={labelStyle}>Fecha de Transacción</label>
                  <p style={{ fontWeight: 700, color: 'var(--heading)' }}>{selectedPay.date}</p>
                </div>
              </div>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-main)' }}>
              <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--heading)' }}><FileText size={18} /> Nota</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Este pago fue recibido a través de la integración con Stripe. La liquidación se procesará en 2-3 días hábiles.</p>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleDownloadInvoice(selectedPay)}>
              <Download size={20} /> Descargar Recibo PDF
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Payments;
