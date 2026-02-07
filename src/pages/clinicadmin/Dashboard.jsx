import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Wallet, Activity, Plus, FileText, UserPlus, Clock } from 'lucide-react';
import { StatCard, SectionHeader } from '../../components/DashboardElements';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MOCK_INVOICES } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');

  const chartData = [
    { name: 'Lun', revenue: 4200, appointments: 8 },
    { name: 'Mar', revenue: 3800, appointments: 12 },
    { name: 'Mié', revenue: 5500, appointments: 10 },
    { name: 'Jue', revenue: 4800, appointments: 15 },
    { name: 'Vie', revenue: 6200, appointments: 18 },
    { name: 'Sáb', revenue: 7500, appointments: 22 },
    { name: 'Dom', revenue: 2000, appointments: 5 },
  ];

  const handleQuickAction = (action) => {
    setDrawerTitle(action);
    setIsDrawerOpen(true);
  };

  const quickActions = [
    { label: 'Agregar Paciente', icon: UserPlus, color: 'var(--primary)', bg: 'var(--bg-main)' },
    { label: 'Nueva Cita', icon: Calendar, color: '#0ea5e9', bg: 'var(--bg-main)' },
    { label: 'Crear Factura', icon: FileText, color: '#10b981', bg: 'var(--bg-main)' },
  ];

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-main)',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Panel de la Clínica" desc="Resumen diario de las operaciones de su clínica." />

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard title="Citas de Hoy" value="24" color="#3b82f6" icon={Calendar} />
        <StatCard title="Pacientes Totales" value="1,240" color="var(--primary)" icon={Users} />
        <StatCard title="Ingresos Mensuales" value="$ 42K" color="#10b981" icon={DollarSign} />
        <StatCard title="Pagos Pendientes" value="$ 45k" color="var(--danger)" icon={Wallet} />
        <StatCard title="Médicos Activos" value="12" color="#0ea5e9" icon={Activity} />
      </div>

      {/* Quick Actions */}

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1.5fr 1fr',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        {/* Revenue Chart */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Resumen de Ingresos (Semanal)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointments Chart */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Citas (Por día)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)' }} />
                <Bar dataKey="appointments" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={drawerTitle}>
        {drawerTitle === 'Agregar Paciente' && (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Nombre del Paciente</label>
              <input type="text" placeholder="Nombre Completo" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Móvil</label>
              <input type="tel" placeholder="00000 00000" style={inputStyle} />
            </div>
            <button className="btn-primary" style={{ padding: '1rem' }}>Agregar Paciente</button>
          </form>
        )}
        {drawerTitle === 'Nueva Cita' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn-primary" style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', border: 'none' }}>
              <Plus size={20} /> Reservar Nueva Cita
            </button>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Seleccione un espacio del calendario...</p>
          </div>
        )}
        {drawerTitle === 'Crear Factura' && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <FileText size={48} color="var(--primary)" style={{ opacity: 0.5 }} />
            <p style={{ marginTop: '1rem', color: 'var(--text-main)' }}>Módulo de generación de facturas...</p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Dashboard;
