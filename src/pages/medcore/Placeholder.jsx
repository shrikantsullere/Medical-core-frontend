import React from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';

const PlaceholderPage = ({ title }) => (
  <DashboardLayout>
    <div className="page-header">
      <h2 className="page-title">{title}</h2>
    </div>
    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #E5E7EB' }}>
      <p style={{ color: '#64748B' }}>Contenido de {title} próximamente...</p>
    </div>
  </DashboardLayout>
);

export default PlaceholderPage;
