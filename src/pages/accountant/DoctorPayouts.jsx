import React, { useState } from 'react';
import { Eye, CheckCircle, Download, Search, Filter, Landmark, User, FileText, Calendar } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { MOCK_DOCTOR_PAYOUTS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const DoctorPayouts = () => {
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewDetails = (payout) => {
    setSelectedPayout(payout);
    setIsDrawerOpen(true);
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '0.3rem'
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Pagos a Médicos" desc="Calcule y gestione la liquidación de comisiones para los médicos." />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre del Médico</th>
              <th>Ingresos Totales</th>
              <th>% Com.</th>
              <th>Parte del Médico</th>
              <th>Monto Pagado</th>
              <th>Saldo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DOCTOR_PAYOUTS.map(p => (
              <tr key={p.id}>
                <td><b style={{ color: 'var(--heading)' }}>{p.name}</b></td>
                <td style={{ color: 'var(--text-main)' }}>{p.revenue}</td>
                <td style={{ color: 'var(--text-main)' }}>{p.commission}</td>
                <td style={{ fontWeight: 700, color: 'var(--heading)' }}>{p.share}</td>
                <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{p.paid}</td>
                <td style={{ color: p.balance !== '₹ 0' ? 'var(--danger)' : 'var(--text-muted)', fontWeight: 700 }}>{p.balance}</td>
                <td>
                  <span className={`badge ${p.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                    {p.status === 'Paid' ? 'Pagado' : p.status === 'Pending' ? 'Pendiente' : p.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn" title="Ver Detalles" onClick={() => handleViewDetails(p)} style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                    <button className="action-btn" title="Marcar como Pagado" style={{ backgroundColor: 'var(--bg-sidebar)' }}><CheckCircle size={18} color="var(--accent)" /></button>
                    <button className="action-btn" title="Descargar Estado de Cuenta" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Download size={18} color="var(--text-muted)" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Estado de Liquidación">
        {selectedPayout && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '15px', backgroundColor: 'var(--bg-sidebar)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <User size={30} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--heading)' }}>{selectedPayout.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Periodo: 01 Marzo - 31 Marzo 2024</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-sidebar)' }}>
                <label style={labelStyle}>Consultas Totales</label>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading)' }}>48</p>
              </div>
              <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-sidebar)' }}>
                <label style={labelStyle}>Ingresos Totales</label>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading)' }}>{selectedPayout.revenue}</p>
              </div>
              <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-sidebar)' }}>
                <label style={labelStyle}>% Comision</label>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading)' }}>{selectedPayout.commission}</p>
              </div>
              <div className="card" style={{ padding: '1rem', backgroundColor: 'rgba(124, 58, 237, 0.1)', border: '1px solid var(--primary)' }}>
                <label style={{ ...labelStyle, color: 'var(--primary)' }}>Neto por Pagar</label>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{selectedPayout.share}</p>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '1rem', color: 'var(--heading)' }}>Facturas Vinculadas</h4>
              <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', backgroundColor: 'var(--bg-sidebar)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                  <span>INV-5001 (Deepak Verma)</span><span>₹ 500.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                  <span>INV-5003 (Raj Kumar)</span><span>₹ 1,200.00</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px dashed var(--border)', margin: '0.5rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--heading)' }}>
                  <span>Parte del Sub-Total</span><span>{selectedPayout.share}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ flex: 1, backgroundColor: 'var(--accent)', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                <CheckCircle size={18} /> Marcar como Pagado
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

export default DoctorPayouts;
