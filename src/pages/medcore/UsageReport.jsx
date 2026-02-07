import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { BarChart3, Filter, PieChart } from 'lucide-react';

const UsageReport = () => {
  const [period, setPeriod] = useState('monthly');

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2 className="page-title">Usage Statistics</h2>
      </div>

      <div className="card" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setPeriod('daily')}
            style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: '700', color: period === 'daily' ? '#0B3B3C' : '#6B7280', borderBottom: period === 'daily' ? '2px solid #0B3B3C' : 'none' }}>
            Daily
          </button>
          <button
            onClick={() => setPeriod('weekly')}
            style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: '700', color: period === 'weekly' ? '#0B3B3C' : '#6B7280', borderBottom: period === 'weekly' ? '2px solid #0B3B3C' : 'none' }}>
            Weekly
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: '700', color: period === 'monthly' ? '#0B3B3C' : '#6B7280', borderBottom: period === 'monthly' ? '2px solid #0B3B3C' : 'none' }}>
            Monthly
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1F2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={18} />
              Total Consultations
            </h3>
            <div style={{ height: '200px', backgroundColor: '#F9FAFB', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>
              [Bar Chart Placeholder]
            </div>
          </div>

          <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1F2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PieChart size={18} />
              Service Distribution
            </h3>
            <div style={{ height: '200px', backgroundColor: '#F9FAFB', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>
              [Pie Chart Placeholder]
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsageReport;
