import React from 'react';
import { useParams } from 'react-router-dom';
import { Download, Printer, CreditCard, Building, User } from 'lucide-react';
import { MOCK_INVOICES } from '../data/mockData';

const PublicInvoice = () => {
  const { id } = useParams();
  const inv = MOCK_INVOICES.find(i => i.invId === id) || MOCK_INVOICES[0];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 1rem', display: 'flex', justifyContent: 'center' }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#7c3aed', fontWeight: 800 }}>CLINICAL EMR</h1>
          <p style={{ color: '#64748b' }}>Acceso Seguro a Factura Digital</p>
        </div>

        <div className="card" style={{ padding: '3rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #f1f5f9', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', color: '#1e293b', marginBottom: '0.5rem' }}>Clínica Dental Ciudad</h2>
              <p style={{ color: '#64748b' }}>Calle Clínica 123, Área Médica, México</p>
              <p style={{ color: '#64748b' }}>NIF/CIF: B12345678</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '1rem', padding: '0.5rem 1.5rem' }}>{inv.status === 'Paid' ? 'Pagado' : 'Pendiente'}</span>
              <p style={{ marginTop: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>{inv.invId}</p>
              <p style={{ color: '#64748b' }}>{inv.date}</p>
            </div>
          </div>

          {/* Info Sections */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Datos del Paciente</label>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem' }}>{inv.patient}</p>
              <p style={{ color: '#64748b' }}>+34 987 654 321</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Médico Tratante</label>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem' }}>{inv.doctor}</p>
              <p style={{ color: '#64748b' }}>Depto. de Cardiología</p>
            </div>
          </div>

          {/* Table */}
          <div style={{ marginBottom: '2.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                  <th style={{ padding: '1rem 0', color: '#64748b', fontSize: '0.85rem' }}>DESCRIPCIÓN</th>
                  <th style={{ padding: '1rem 0', color: '#64748b', fontSize: '0.85rem', textAlign: 'right' }}>MONTO</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '1.25rem 0', fontWeight: 600 }}>Consulta General</td>
                  <td style={{ padding: '1.25rem 0', textAlign: 'right' }}>$ 500.00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '1.25rem 0', fontWeight: 600 }}>Servicios de Diagnóstico (Rayos X)</td>
                  <td style={{ padding: '1.25rem 0', textAlign: 'right' }}>$ 800.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Calculation */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b' }}>
                <span>Descuento</span><span>- $ 0.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b' }}>
                <span>Impuestos (IVA 5%)</span><span>$ 65.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 800, color: '#7c3aed', marginTop: '1rem', borderTop: '2px solid #f1f5f9', paddingTop: '1rem' }}>
                <span>TOTAL</span><span>{inv.total}</span>
              </div>
            </div>
          </div>

          {/* Public Actions */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
            {inv.status !== 'Paid' && (
              <button className="btn-primary" style={{ flex: 2, backgroundColor: '#10b981', color: 'white', padding: '1.25rem', borderRadius: '14px', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', border: 'none', cursor: 'pointer' }}>
                <CreditCard size={22} /> Pagar de Forma Segura
              </button>
            )}
            <button style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#475569', padding: '1.25rem', borderRadius: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
              <Download size={20} /> PDF
            </button>
            <button style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#475569', padding: '1.25rem', borderRadius: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
              <Printer size={20} /> Imprimir
            </button>
          </div>

          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', marginTop: '3rem' }}>
            Este es un documento generado por computadora. No se requiere firma.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicInvoice;
