import React from 'react';
import { Calendar, Users, Wallet, CheckCircle, UserPlus, Clock, CreditCard } from 'lucide-react';
import { StatCard, SectionHeader } from '../../components/DashboardElements';

const Dashboard = () => {
  const quickActions = [
    { label: 'Agregar Paciente', icon: UserPlus, color: 'var(--primary)', bg: 'rgba(124, 58, 237, 0.1)' },
    { label: 'Reservar Cita', icon: Calendar, color: 'var(--primary)', bg: 'rgba(14, 165, 233, 0.1)' },
    { label: 'Cobrar Pago', icon: CreditCard, color: 'var(--accent)', bg: 'rgba(16, 185, 129, 0.1)' },
  ];

  return (
    <div className="fade-in">
      <SectionHeader title="Panel de Recepción" desc="¡Bienvenido de nuevo! Aquí está el resumen de recepción para hoy." />

      {/* UI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard title="Citas de Hoy" value="32" color="var(--primary)" icon={Calendar} />
        <StatCard title="Pacientes Sin Cita" value="12" color="var(--primary)" icon={UserPlus} />
        <StatCard title="Pagos Pendientes" value="$ 12,400" color="var(--danger)" icon={Wallet} />
        <StatCard title="Registros Totales" value="28" color="var(--accent)" icon={CheckCircle} />
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
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--heading)' }}>Pacientes que Llegan Hoy</h3>
        <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Hora</th>
                <th>Tipo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b style={{ color: 'var(--heading)' }}>Deepak Verma</b></td>
                <td style={{ color: 'var(--text-main)' }}>Dr. Sameer Khan</td>
                <td style={{ color: 'var(--text-main)' }}>10:30 AM</td>
                <td><span className="badge badge-blue">Nueva Visita</span></td>
                <td><span className="badge badge-warning">Pendiente</span></td>
              </tr>
              <tr>
                <td><b style={{ color: 'var(--heading)' }}>Sneha Patel</b></td>
                <td style={{ color: 'var(--text-main)' }}>Dr. Anjali Rao</td>
                <td style={{ color: 'var(--text-main)' }}>11:45 AM</td>
                <td><span className="badge badge-blue">Seguimiento</span></td>
                <td><span className="badge badge-success">Completado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
