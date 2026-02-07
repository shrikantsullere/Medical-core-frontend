import React from 'react';
import { Download, FileText, TrendingUp, Users, Calendar, Filter, Briefcase } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';

const Reports = () => {
  const [dateFilter, setDateFilter] = React.useState('');
  const [doctorFilter, setDoctorFilter] = React.useState('Todos los Médicos');

  const allReports = [
    { title: 'Informe de Recaudación Diaria', desc: 'Resumen de todas las facturas y cobros del día.', icon: TrendingUp, forDoctor: false },
    { title: 'Ingresos por Médico', desc: 'Informes detallados de ganancias y comisiones por médico.', icon: Users, forDoctor: true },
    { title: 'Informe de Deudas Pendientes', desc: 'Lista de pacientes con saldos pendientes.', icon: Briefcase, forDoctor: false },
    { title: 'Análisis de Visitas de Pacientes', desc: 'Datos estadísticos sobre pacientes nuevos vs recurentes.', icon: Calendar, forDoctor: false },
  ];

  const filteredReports = doctorFilter === 'Todos los Médicos'
    ? allReports
    : allReports.filter(r => r.forDoctor || r.title === 'Informe de Recaudación Diaria');

  const inputStyle = {
    padding: '0.6rem 1rem',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: 'var(--bg-sidebar)',
    color: 'var(--text-main)'
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Informes de la Clínica" desc="Analice el desempeño financiero y operativo de su clínica." />

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Rango de Fechas</label>
            <input type="date" style={inputStyle} value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Médico</label>
            <select style={inputStyle} value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)}>
              <option>Todos los Médicos</option>
              <option>Dr. Sameer Khan</option>
              <option>Dr. Anjali Rao</option>
            </select>
          </div>
          <button style={{ height: '42px', backgroundColor: 'var(--primary)', color: 'white', padding: '0 1.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            <Filter size={18} /> Aplicar Filtros
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredReports.map((r, i) => (
          <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'var(--bg-main)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <r.icon size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--heading)' }}>{r.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{r.desc}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className="action-btn" title="Descargar PDF" style={{ backgroundColor: 'var(--bg-sidebar)' }}><FileText size={18} color="var(--danger)" /></button>
              <button className="action-btn" title="Exportar Excel" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Briefcase size={18} color="var(--accent)" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
