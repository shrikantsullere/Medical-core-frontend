import React from 'react';
import { StatCard, SectionHeader } from '../../components/DashboardElements';
import { Calendar, History, Wallet, ClipboardList, Plus, CreditCard, Eye } from 'lucide-react';

const Dashboard = () => {
  const quickActions = [
    { label: 'Reservar Cita', icon: Plus, color: 'var(--primary)', bg: 'rgba(14, 165, 233, 0.1)' },
    { label: 'Pagar Factura', icon: CreditCard, color: 'var(--accent)', bg: 'rgba(16, 185, 129, 0.1)' },
    { label: 'Ver Receta', icon: ClipboardList, color: 'var(--primary)', bg: 'rgba(124, 58, 237, 0.1)' },
  ];

  return (
    <div className="fade-in">
      <SectionHeader title="¡Bienvenido de nuevo, Deepak!" desc="Gestione sus registros de salud y próximas visitas a la clínica." />

      {/* UI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard title="Próxima Cita" value="25 Marzo" color="var(--primary)" icon={Calendar} />
        <StatCard title="Visitas Totales" value="12" color="var(--primary)" icon={History} />
        <StatCard title="Facturas Pendientes" value="$ 500" color="var(--danger)" icon={Wallet} />
        <StatCard title="Última Receta" value="20 Marzo" color="var(--accent)" icon={ClipboardList} />
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {quickActions.map((action, index) => (
          <button
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '1.25rem',
              borderRadius: '16px',
              backgroundColor: action.bg,
              color: action.color,
              border: `1px solid ${action.color}33`,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <action.icon size={22} />
            {action.label}
          </button>
        ))}
      </div>
      <div className="card" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--heading)' }}>Detalles de la Próxima Cita</h3>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '15px', backgroundColor: 'var(--bg-sidebar)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
              <Calendar color="#3b82f6" size={30} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--heading)' }}>Dr. Sameer Khan</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>City Dental Clinic • 10:30 AM • 25 Marzo 2024</p>
            </div>
          </div>
          <button style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}>Ver Detalles</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
