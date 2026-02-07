import React from 'react';
import { FileText, Download, Calendar, Filter, PieChart, TrendingUp, Briefcase } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { PieChart as RPieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip, Legend } from 'recharts';

const Reports = () => {
  const data = [
    { name: 'Clínicas Activas', value: 42, color: '#10b981' },
    { name: 'Clínicas Bloqueadas', value: 6, color: '#ef4444' },
  ];

  const planData = [
    { name: 'Premium', value: 25, color: '#7c3aed' },
    { name: 'Standard', value: 15, color: '#3b82f6' },
    { name: 'Basic', value: 8, color: '#6366f1' },
  ];

  const reportFiles = [
    { name: 'Ingresos por Clínica', type: 'Sistema', date: 'Feb 2024' },
    { name: 'Informe de Vencimiento de Suscripción', type: 'Renovación', date: 'Próximos 30 Días' },
    { name: 'Auditoría de Activos vs Bloqueados', type: 'Cumplimiento', date: 'Anual 2024' },
    { name: 'Análisis de Crecimiento de Clínicas', type: 'Crecimiento', date: 'T1 2024' },
  ];

  return (
    <div className="fade-in">
      <SectionHeader title="Informes del Sistema" desc="Genere y descargue informes analíticos del rendimiento del sistema." />

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: 'var(--bg-sidebar)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Rango de Fechas</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem 1rem', backgroundColor: 'var(--bg-main)' }}>
              <Calendar size={18} color="var(--text-muted)" />
              <input type="text" placeholder="Seleccionar fechas..." style={{ border: 'none', outline: 'none', fontSize: '0.9rem', width: '100%', background: 'none', color: 'var(--text-main)' }} />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Clínica</label>
            <select style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
              <option>Todas las Clínicas</option>
              <option>Clínica Dental Ciudad</option>
              <option>Centro Grace Heart</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Tipo de Plan</label>
            <select style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
              <option>Todos los Planes</option>
              <option>Premium</option>
              <option>Estándar</option>
              <option>Básico</option>
            </select>
          </div>
          <button style={{ height: '46px', backgroundColor: 'var(--primary)', color: 'white', padding: '0 1.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            <Filter size={18} /> Aplicar Filtros
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ height: '400px' }}>
          <h3 style={{ color: 'var(--heading)' }}>Distribución del Estado de las Clínicas</h3>
          <ResponsiveContainer width="100%" height="80%">
            <RPieChart>
              <Pie data={data} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <RTooltip />
              <Legend />
            </RPieChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ height: '400px' }}>
          <h3 style={{ color: 'var(--heading)' }}>Distribución de Suscripciones</h3>
          <ResponsiveContainer width="100%" height="80%">
            <RPieChart>
              <Pie data={planData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {planData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <RTooltip />
              <Legend />
            </RPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--heading)' }}>Informes Disponibles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {reportFiles.map((report, i) => (
            <div key={i} style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--bg-header)', color: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--heading)' }}>{report.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{report.type} • {report.date}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="action-btn" title="Descargar PDF" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Download size={18} color="var(--danger)" /></button>
                <button className="action-btn" title="Exportar Excel" style={{ backgroundColor: 'var(--bg-sidebar)' }}><Briefcase size={18} color="var(--accent)" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
