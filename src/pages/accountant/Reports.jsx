import React from 'react';
import { Download, FileText, TrendingUp, Users, Wallet, Filter, Calendar, Briefcase, BarChart3 } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';

const Reports = () => {
  const reports = [
    { title: 'Informe de Recaudación Diaria', desc: 'Resumen de todas las facturas y cobros de hoy.', icon: TrendingUp },
    { title: 'Informe de Ingresos Mensuales', desc: 'Rendimiento financiero detallado mes a mes.', icon: BarChart3 },
    { title: 'Informe de Deudas Pendientes', desc: 'Lista de pacientes y seguros con deudas pendientes.', icon: Briefcase },
    { title: 'Informe de Gastos', desc: 'Desglose de los gastos operativos de la clínica.', icon: Wallet },
    { title: 'Informe de Comisión de Médicos', desc: 'Pagos y participación en los ingresos por médico.', icon: Users },
    { title: 'Informe de IVA', desc: 'Resumen del IVA recaudado para la presentación de impuestos.', icon: FileText },
  ];

  const inputStyle = {
    padding: '0.6rem 1rem',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-main)'
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Informes Financieros" desc="Exporte auditorías detalladas y resúmenes financieros." />

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: 'var(--bg-sidebar)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Rango de Fechas</label>
            <input type="date" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Médico</label>
            <select style={inputStyle}>
              <option value="All">Todos los Médicos</option>
              <option>Dr. Sameer Khan</option>
              <option>Dr. Anjali Rao</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Modo</label>
            <select style={inputStyle}>
              <option value="All">Todos los Modos</option>
              <option value="Cash">Efectivo</option>
              <option value="UPI">UPI</option>
              <option value="Online">En Línea</option>
            </select>
          </div>
          <button style={{ height: '42px', backgroundColor: 'var(--primary)', color: 'white', padding: '0 1.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            <Filter size={18} /> Aplicar Filtros
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {reports.map((r, i) => (
          <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s', cursor: 'pointer', backgroundColor: 'var(--bg-sidebar)' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'var(--bg-main)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <r.icon size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--heading)' }}>{r.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{r.desc}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="action-btn" title="Descargar PDF" style={{ backgroundColor: 'var(--bg-main)' }}><Download size={18} color="var(--danger)" /></button>
              <button className="action-btn" title="Exportar Excel" style={{ backgroundColor: 'var(--bg-main)' }}><Briefcase size={18} color="var(--accent)" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
