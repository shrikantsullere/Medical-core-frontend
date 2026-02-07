import React from 'react';
import { Calendar, Users, DollarSign, ClipboardList, Clock, TrendingUp, UserPlus } from 'lucide-react';
import { StatCard, SectionHeader } from '../../components/DashboardElements';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const chartData = [
    { name: 'Lun', citas: 12, ingresos: 4500 },
    { name: 'Mar', citas: 15, ingresos: 5200 },
    { name: 'Mié', citas: 10, ingresos: 3800 },
    { name: 'Jue', citas: 18, ingresos: 6000 },
    { name: 'Vie', citas: 14, ingresos: 4800 },
    { name: 'Sáb', citas: 22, ingresos: 8500 },
    { name: 'Dom', citas: 5, ingresos: 2000 },
  ];

  return (
    <div className="fade-in">
      <SectionHeader title="Panel del Médico" desc="Buenos días, Dr. Sameer. Aquí está el resumen de su práctica para hoy." />

      {/* UI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard title="Citas de Hoy" value="18" color="var(--primary)" icon={Clock} />
        <StatCard title="Pacientes Totales" value="842" color="var(--primary)" icon={Users} />
        <StatCard title="Ingresos de Hoy" value="$ 4,500" color="var(--accent)" icon={DollarSign} />
        <StatCard title="Ingresos Mensuales" value="$ 12.5K" color="#0ea5e9" icon={TrendingUp} />
        <StatCard title="RX Pendientes" value="4" color="var(--danger)" icon={ClipboardList} />
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', color: 'var(--heading)' }}>Acciones Rápidas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <button style={{ height: '60px', borderRadius: '14px', backgroundColor: 'var(--bg-sidebar)', color: 'var(--primary)', border: '1px solid var(--border)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s', cursor: 'pointer' }}>
            <Calendar size={20} /> Citas de Hoy
          </button>
          <button style={{ height: '60px', borderRadius: '14px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s', cursor: 'pointer' }}>
            <ClipboardList size={20} /> Crear Receta
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1.5fr 1fr',
        gap: '1.5rem'
      }}>
        {/* Earnings Chart */}
        <div className="card" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--heading)' }}>Ingresos (Semanales)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-sidebar)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', color: 'var(--text-main)' }} />
                <Area type="monotone" dataKey="ingresos" stroke="var(--accent)" fillOpacity={1} fill="url(#colorEarn)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointments Chart */}
        <div className="card" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--heading)' }}>Citas (Por semana)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-sidebar)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', color: 'var(--text-main)' }} />
                <Bar dataKey="citas" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
