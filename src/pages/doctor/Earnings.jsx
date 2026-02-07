import React from 'react';
import { DollarSign, Download, Filter, FileBarChart, TrendingUp, Calendar } from 'lucide-react';
import { StatCard, SectionHeader } from '../../components/DashboardElements';
import { MOCK_EARNINGS } from '../../data/mockData';

const Earnings = () => {
  return (
    <div className="fade-in">
      <SectionHeader title="Mis Ganancias" desc="Informes transparentes de sus consultas y comisiones." />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Ganancias de Hoy" value="$ 4,500" color="var(--accent)" icon={DollarSign} />
        <StatCard title="Ganancias Mensuales" value="$ 125,000" color="var(--primary)" icon={TrendingUp} />
        <StatCard title="Ganancias Totales" value="$ 145K" color="#8b5cf6" icon={FileBarChart} />
      </div>

      {/* Filters & Export */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-sidebar)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Calendar size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="Rango de Fechas" style={{ padding: '0.6rem 1rem 0.6rem 2.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none', fontSize: '0.9rem', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }} onFocus={(e) => e.target.type = 'date'} />
            </div>
            <select style={{ padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none', fontSize: '0.9rem', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', cursor: 'pointer' }}>
              <option>Clínica Aplicada (Propia)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{ height: '40px', padding: '0 1rem', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--danger)', cursor: 'pointer' }}>
              <Download size={18} /> PDF
            </button>
            <button style={{ height: '40px', padding: '0 1rem', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--accent)', cursor: 'pointer' }}>
              <Download size={18} /> Excel
            </button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Paciente</th>
              <th>Servicio</th>
              <th>Monto ($)</th>
              <th>Comisión %</th>
              <th>Parte del Médico ($)</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_EARNINGS.map(item => (
              <tr key={item.id}>
                <td style={{ color: 'var(--text-main)' }}>{item.date}</td>
                <td><b style={{ color: 'var(--heading)' }}>{item.patient}</b></td>
                <td><span className="badge badge-blue">{item.service === 'Consultation' ? 'Consulta' : item.service}</span></td>
                <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.amount}</td>
                <td style={{ color: 'var(--text-main)' }}>{item.commission}%</td>
                <td style={{ fontWeight: 800, color: 'var(--accent)' }}>$ {item.share}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Earnings;
