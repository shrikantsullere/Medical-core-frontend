import React from 'react';
import { Plus, Activity } from 'lucide-react';

export const StatCard = ({ title, value, color, icon: Icon, trend }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
    <div style={{ padding: '1rem', background: `${color}15`, color: color, borderRadius: '16px' }}>
      <Icon size={24} />
    </div>
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{title}</p>
      <h3 style={{ fontSize: '1.5rem', margin: '0.25rem 0' }}>{value}</h3>
      {trend && <span style={{ fontSize: '0.75rem', color: trend > 0 ? 'var(--accent)' : 'var(--danger)', fontWeight: 600 }}>
        {trend > 0 ? '+' : ''}{trend}% desde el mes pasado
      </span>}
    </div>
  </div>
);

export const SectionHeader = ({ title, desc, actionLabel, onAction }) => (
  <div className="flex-responsive" style={{ marginBottom: '2rem' }}>
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.2rem' }}>{title}</h1>
      <p style={{ color: 'var(--text-muted)' }}>{desc}</p>
    </div>
    {actionLabel && (
      <button
        onClick={onAction}
        style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        <Plus size={20} /> {actionLabel}
      </button>
    )}
  </div>
);

export const EmptyState = ({ message, desc }) => (
  <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed var(--border)', background: 'none' }}>
    <div style={{ width: '64px', height: '64px', background: 'var(--bg-header)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
      <Activity size={32} color="var(--primary)" />
    </div>
    <h3 style={{ color: 'var(--heading)' }}>{message || 'No hay datos disponibles'}</h3>
    <p style={{ color: 'var(--text-muted)' }}>{desc || "No pudimos encontrar ningún registro para mostrar aquí."}</p>
  </div>
);
