import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { ClipboardList, Filter, Download } from 'lucide-react';

const AuthorizationReport = () => {
  const [filters, setFilters] = useState({
    serviceType: '',
    doctor: '',
    dateRange: ''
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    alert('System synchronization active: Filtering by ' + JSON.stringify(filters));
  };

  return (
    <DashboardLayout>
      <div className="authorization-report-page" style={{ padding: '2rem 3rem', animation: 'fadeIn 0.4s ease-out' }}>
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 className="page-title" style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.025em' }}>Authorization <span style={{ color: '#0D9488' }}>Analytics</span></h2>
            <p style={{ color: '#64748B', margin: '0.5rem 0 0', fontSize: '1.1rem', fontWeight: '500' }}>Monitor medical authorization throughput, systemic verification metrics, and status distribution.</p>
          </div>
          <button
            onClick={() => alert('Exporting analytics core...')}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: '52px', padding: '0 2rem', fontWeight: '900', borderRadius: '14px' }}>
            <Download size={22} /> EXPORT ANALYTICS
          </button>
        </div>

        <div className="card" style={{ padding: '2.5rem', marginBottom: '3.5rem', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'flex-end' }}>
            <div className="filter-group">
              <label className="filter-label">PROCEDURE TYPE</label>
              <select className="custom-select" value={filters.serviceType} onChange={(e) => handleFilterChange('serviceType', e.target.value)} style={{ width: '100%', height: '56px', fontWeight: '700' }}>
                <option value="">All Procedures & Services</option>
                <option value="consult">Clinical Consultation</option>
                <option value="lab">Laboratory Analysis</option>
                <option value="surgery">Surgical Intervention</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">ATTENDING PRACTITIONER</label>
              <select className="custom-select" value={filters.doctor} onChange={(e) => handleFilterChange('doctor', e.target.value)} style={{ width: '100%', height: '56px', fontWeight: '700' }}>
                <option value="">All Medical Professionals</option>
                <option value="dr_smith">Dr. Michael Smith</option>
                <option value="dr_ross">Dr. Sarah Ross</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">REPORTING PERIOD</label>
              <input type="date" className="custom-input" value={filters.dateRange} onChange={(e) => handleFilterChange('dateRange', e.target.value)} style={{ width: '100%', height: '56px', fontWeight: '700' }} />
            </div>
            <button className="btn-primary" style={{ height: '56px', padding: '0 2rem', fontWeight: '900', borderRadius: '14px' }} onClick={handleApplyFilters}>
              <Filter size={22} /> GENERATE REPORT
            </button>
          </div>
        </div>

        <div className="card" style={{ overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
          <div className="maint-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>REFERENCE ID</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>PATIENT MASTER</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>REQUESTING DOCTOR</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>VERIFICATION STATE</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'right', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>NET VALUATION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'AUTH-9421', patient: 'Jonathan Reed', doctor: 'Dr. Mike Varshavski', status: 'Approved', amount: 450.00 },
                  { id: 'AUTH-8820', patient: 'Samantha Collins', doctor: 'Dr. Sarah Ross', status: 'In Review', amount: 1200.00 },
                  { id: 'AUTH-7041', patient: 'Maria Garcia', doctor: 'Dr. Gregory House', status: 'Approved', amount: 850.50 },
                  { id: 'AUTH-6102', patient: 'Robert Chen', doctor: 'Dr. Meredith Grey', status: 'Denied', amount: 300.00 },
                  { id: 'AUTH-5203', patient: 'Eleanor Vance', doctor: 'Dr. Shaun Murphy', status: 'Approved', amount: 2100.00 },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: idx % 2 === 0 ? 'white' : '#F9FAFB', transition: 'background-color 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '1.5rem 2rem' }}>
                      <span style={{ color: '#0D9488', fontWeight: '900', fontSize: '0.9rem', fontFamily: 'monospace', letterSpacing: '0.05em', backgroundColor: '#F0FDFA', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #CCFBF1' }}>{row.id}</span>
                    </td>
                    <td style={{ padding: '1.5rem 2rem' }}>
                      <div style={{ fontWeight: '900', color: '#1E293B', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{row.patient}</div>
                    </td>
                    <td style={{ padding: '1.5rem 2rem', color: '#64748B', fontWeight: '700', fontSize: '1rem' }}>{row.doctor}</td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                      <span style={{
                        backgroundColor: row.status === 'Approved' ? '#F0FDFA' : row.status === 'In Review' ? '#FFFBEB' : '#FEF2F2',
                        color: row.status === 'Approved' ? '#0D9488' : row.status === 'In Review' ? '#D97706' : '#EF4444',
                        padding: '0.5rem 1.25rem',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: '900',
                        letterSpacing: '0.05em',
                        border: '1.5px solid currentColor',
                        display: 'inline-block',
                        minWidth: '120px'
                      }}>
                        {row.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                      <span style={{ fontWeight: '900', color: '#1E293B', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
                        ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .filter-label { display: block; fontSize: 0.8rem; fontWeight: 900; color: #64748B; marginBottom: 0.75rem; letterSpacing: 0.1em; }
        .custom-input, .custom-select { padding: 0.75rem 1.25rem; border: 1.5px solid #E2E8F0; border-radius: 14px; font-size: 1rem; outline: none; transition: all 0.3s ease; color: #1E293B; }
        .custom-input:focus, .custom-select:focus { border-color: #0D9488; box-shadow: 0 0 0 5px rgba(13, 148, 136, 0.1); }
        .table-row-hover:hover td { background-color: #F0FDFA !important; cursor: default; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 768px) {
          .filters-card > div { flex-direction: column !important; gap: 1rem !important; }
          .filters-grid { grid-template-columns: 1fr !important; }
          .page-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AuthorizationReport;
