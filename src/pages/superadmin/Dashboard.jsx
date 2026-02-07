import React, { useState } from 'react';
import { Landmark, Users, DollarSign, Ban, ShieldCheck, Clock, History, Eye, ArrowUpRight, TrendingUp } from 'lucide-react';
import { StatCard, SectionHeader } from '../../components/DashboardElements';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { RECENT_LOGS, MOCK_CLINICS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const chartData = [
    { name: 'Ene', revenue: 42000, clinics: 4 },
    { name: 'Feb', revenue: 38000, clinics: 6 },
    { name: 'Mar', revenue: 55000, clinics: 10 },
    { name: 'Abr', revenue: 48000, clinics: 12 },
    { name: 'May', revenue: 62000, clinics: 15 },
    { name: 'Jun', revenue: 75000, clinics: 20 },
  ];

  const handleViewClinic = (clinic) => {
    setSelectedClinic(clinic);
    setIsDrawerOpen(true);
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Panel de Super Administrador" desc="Vista general del sistema y seguimiento del rendimiento global." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard title="Total de Clínicas" value="48" color="var(--primary)" icon={Landmark} />
        <StatCard title="Clínicas Activas" value="42" color="#10b981" icon={Users} />
        <StatCard title="Clínicas Bloqueadas" value="6" color="var(--danger)" icon={Ban} />
        <StatCard title="Ingresos Totales" value="$ 12.4K" color="#3b82f6" icon={DollarSign} />
        <StatCard title="Planes Activos" value="12" color="var(--primary)" icon={ShieldCheck} />
        <StatCard title="Planes por Vencer" value="4" color="var(--warning)" icon={Clock} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1.5fr 1fr',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Resumen de Ingresos (Mensual)</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.6rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
              <TrendingUp size={14} /> +12%
            </div>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)' }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3>Crecimiento de Clínicas</h3>
          <div style={{ height: '300px', marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)' }} />
                <Bar dataKey="clinics" fill="#10b981" radius={[6, 6, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--bg-header)', borderRadius: '16px', padding: '1.5rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--heading)', fontWeight: 800, fontSize: '1.25rem' }}>Clínicas Recientes</h3>
          <button style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Ver Todo</button>
        </div>

        <div style={{ backgroundColor: 'var(--bg-sidebar)', borderRadius: '12px', padding: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div className="table-container" style={{ margin: 0, border: 'none', boxShadow: 'none', background: 'transparent' }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
              <thead style={{ backgroundColor: 'var(--bg-main)' }}>
                <tr>
                  <th style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Nombre de la Clínica</th>
                  <th style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Plan</th>
                  <th style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Estado</th>
                  <th style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Fecha de Creación</th>
                  <th style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', textAlign: 'center' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CLINICS.slice(0, 5).map(clinic => (
                  <tr key={clinic.id} style={{ boxShadow: 'none', borderBottom: '1px solid var(--border)' }}>
                    <td data-label="Nombre de la Clínica" style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--heading)' }}>{clinic.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{clinic.clinicId}</div>
                    </td>
                    <td data-label="Plan" style={{ padding: '1rem' }}>
                      <span style={{ backgroundColor: 'var(--bg-header)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>{clinic.plan}</span>
                    </td>
                    <td data-label="Estado" style={{ padding: '1rem' }}>
                      <span className={`badge ${clinic.status === 'Active' ? 'badge-success' : 'badge-danger'}`} style={{ borderRadius: '6px' }}>
                        {clinic.status === 'Active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td data-label="Fecha de Creación" style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: 500 }}>{clinic.date}</td>
                    <td data-label="Acción" style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          border: '1px solid var(--border)',
                          backgroundColor: 'var(--bg-sidebar)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          margin: '0 auto'
                        }}
                        title="Ver Detalles"
                        onClick={() => handleViewClinic(clinic)}
                      >
                        <Eye size={16} color="var(--primary)" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Resumen de la Clínica (Vista Rápida)">
        {selectedClinic && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{selectedClinic.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{selectedClinic.clinicId}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'var(--bg-sidebar)' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Administrador</label>
                <p style={{ fontWeight: 600, color: 'var(--heading)' }}>{selectedClinic.admin}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedClinic.email}</p>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', backgroundColor: 'var(--bg-sidebar)' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Plan Actual</label>
                <p style={{ fontWeight: 600, color: 'var(--primary)' }}>{selectedClinic.plan}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Activo hasta {selectedClinic.expiry}</p>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/clinics'}
              style={{ width: '100%', padding: '1rem', backgroundColor: '#7C3AED', color: 'white', borderRadius: '12px', fontWeight: 700, border: 'none' }}
            >
              Ir al Menú de Clínicas para Gestión Completa
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Dashboard;
