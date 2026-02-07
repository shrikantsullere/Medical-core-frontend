import React from 'react';
import { StatCard, SectionHeader } from '../../components/DashboardElements';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { DollarSign, Wallet, FileText, TrendingUp, Landmark, PieChart } from 'lucide-react';

const Dashboard = () => {
  const collectionData = [
    { name: 'Lun', collection: 4000 },
    { name: 'Mar', collection: 3000 },
    { name: 'Mié', collection: 2000 },
    { name: 'Jue', collection: 2780 },
    { name: 'Vie', collection: 1890 },
    { name: 'Sáb', collection: 2390 },
    { name: 'Dom', collection: 3490 },
  ];

  const revenueExpenseData = [
    { name: 'Ene', revenue: 4000, expense: 2400 },
    { name: 'Feb', revenue: 3000, expense: 1398 },
    { name: 'Mar', revenue: 2000, expense: 9800 },
    { name: 'Abr', revenue: 2780, expense: 3908 },
  ];

  const quickActions = [
    { label: 'Ver Facturas Pendientes', icon: FileText, color: 'var(--primary)', bg: 'rgba(59, 130, 246, 0.1)' },
    { label: 'Agregar Gasto', icon: Wallet, color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.1)' },
    { label: 'Generar Informe', icon: PieChart, color: 'var(--primary)', bg: 'rgba(124, 58, 237, 0.1)' },
  ];

  return (
    <div className="fade-in">
      <SectionHeader title="Panel del Contador" desc="Bienvenido de nuevo, Kushal Dev. Gestione las finanzas y los pagos de la clínica." />

      {/* UI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard title="Recaudación de Hoy" value="$ 12,400" color="var(--primary)" icon={DollarSign} />
        <StatCard title="Ingresos Mensuales" value="$ 42.5K" color="var(--accent)" icon={TrendingUp} />
        <StatCard title="Saldos Pendientes" value="$ 11.5K" color="var(--warning)" icon={FileText} />
        <StatCard title="Gastos Totales" value="$ 65,000" color="var(--danger)" icon={Wallet} />
        <StatCard title="Pago a Médicos" value="$ 45,800" color="var(--primary)" icon={Landmark} />
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

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Collection Chart */}
        <div className="card" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--heading)' }}>Recaudación (Por día)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={collectionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-sidebar)', borderColor: 'var(--border)', color: 'var(--text-main)' }} />
                <Area type="monotone" dataKey="collection" stroke="var(--primary)" fill="rgba(124, 58, 237, 0.2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses vs Revenue Chart */}
        <div className="card" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--heading)' }}>Gastos vs Ingresos</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueExpenseData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-sidebar)', borderColor: 'var(--border)', color: 'var(--text-main)' }} />
                <Legend formatter={(value) => (
                  <span style={{ color: 'var(--text-main)' }}>
                    {value === 'revenue' ? 'Ingresos' : 'Gastos'}
                  </span>
                )} />
                <Bar dataKey="revenue" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="var(--danger)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
