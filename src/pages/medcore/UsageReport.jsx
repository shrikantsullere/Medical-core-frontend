import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Undo2, FileSpreadsheet, Search, Calendar } from 'lucide-react';

const UsageReport = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    from: '2026-02-09',
    until: '2026-02-09',
    userType: 'CentroMedico',
    centerName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout>
      <div className="usage-report-page" style={{ padding: '2rem 3rem', animation: 'fadeIn 0.4s ease-out' }}>
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 className="page-title" style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.025em' }}>Usage <span style={{ color: '#0D9488' }}>Intelligence</span></h2>
            <p style={{ color: '#64748B', margin: '0.5rem 0 0', fontSize: '1.1rem', fontWeight: '500' }}>Analyze clinical utilization, systemic patient volume, and revenue metrics across the infrastructure.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button onClick={() => navigate(-1)} className="btn-secondary" style={{ height: '52px', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
              <Undo2 size={20} /> SYNC BACK
            </button>
            <button className="btn-secondary" style={{ height: '52px', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0D9488', fontWeight: '700' }}>
              <FileSpreadsheet size={20} /> EXCEL EXPORT
            </button>
            <button className="btn-primary" style={{ height: '52px', padding: '0 2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '900' }}>
              <Search size={22} /> EXECUTE ANALYSIS
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: '3rem', marginBottom: '3rem', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', alignItems: 'flex-end' }}>
            <div className="filter-group">
              <label className="filter-label">TEMPORAL START</label>
              <div style={{ position: 'relative' }}>
                <input type="date" name="from" className="custom-input" value={filters.from} onChange={handleInputChange} style={{ width: '100%', height: '56px', fontWeight: '700' }} />
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label">TEMPORAL END</label>
              <div style={{ position: 'relative' }}>
                <input type="date" name="until" className="custom-input" value={filters.until} onChange={handleInputChange} style={{ width: '100%', height: '56px', fontWeight: '700' }} />
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label">ENTITY CLASSIFICATION</label>
              <select name="userType" className="custom-select" value={filters.userType} onChange={handleInputChange} style={{ width: '100%', height: '56px', fontWeight: '700' }}>
                <option value="CentroMedico">Medical Center Hub</option>
                <option value="Doctor">Private Clinical Practice</option>
                <option value="Clinic">Public Clinical Network</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">FACILITY SELECTOR</label>
              <select name="centerName" className="custom-select" value={filters.centerName} onChange={handleInputChange} style={{ width: '100%', height: '56px', fontWeight: '700' }}>
                <option value="">Full Infrastructure Sync</option>
                <option value="1">MedCare Center SD</option>
                <option value="2">Santiago Medical Plaza</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card" style={{ overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
          <div className="maint-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>FACILITY IDENTITY</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>CONSULTATIONS</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>LABORATORY LOAD</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>SURGICAL PROTOCOLS</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'right', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>GROSS REVENUE VALUATION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'MedCare Center SD', consults: 142, labs: 89, surgery: 12, revenue: 154200.00 },
                  { name: 'Santiago Medical Plaza', consults: 98, labs: 45, surgery: 8, revenue: 82500.00 },
                  { name: 'Punta Cana Clinic', consults: 110, labs: 67, surgery: 5, revenue: 112000.00 },
                  { name: 'La Romana Health', consults: 45, labs: 21, surgery: 2, revenue: 34100.00 },
                  { name: 'Bavaro Specialty', consults: 67, labs: 34, surgery: 4, revenue: 58900.00 },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: idx % 2 === 0 ? 'white' : '#F9FAFB', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '1.5rem 2rem', fontWeight: '900', color: '#1E293B', fontSize: '1.1rem' }}>{row.name}</td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                      <span style={{ backgroundColor: '#F0FDFA', color: '#0D9488', padding: '0.5rem 1rem', borderRadius: '100px', fontWeight: '900', fontSize: '0.8rem', border: '1.5px solid currentColor' }}>{row.consults} UNITS</span>
                    </td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'center', color: '#64748B', fontWeight: '700', fontSize: '1rem' }}>{row.labs} units</td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'center', color: '#64748B', fontWeight: '700', fontSize: '1rem' }}>{row.surgery} cases</td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right', fontWeight: '900', color: '#1E293B', fontSize: '1.1rem' }}>
                      ${row.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot style={{ backgroundColor: '#F8FAFC' }}>
                <tr style={{ fontWeight: '900', color: '#0B3B3C', borderTop: '2px solid #E2E8F0' }}>
                  <td style={{ padding: '2rem' }}>AGGREGATE DATA VALUATION</td>
                  <td style={{ padding: '2rem', textAlign: 'center', color: '#0D9488', fontSize: '1.1rem' }}>462 TOTAL</td>
                  <td style={{ padding: '2rem', textAlign: 'center' }}>256 Units</td>
                  <td style={{ padding: '2rem', textAlign: 'center' }}>31 Cases</td>
                  <td style={{ padding: '2rem', textAlign: 'right', fontSize: '1.4rem', color: '#0D9488', letterSpacing: '-0.02em' }}>$441,700.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .filter-label { display: block; fontSize: 0.8rem; fontWeight: 900; color: #64748B; marginBottom: 0.75rem; letterSpacing: 0.1em; }
        .custom-input, .custom-select { padding: 0.75rem 1.25rem; border: 1.5px solid #E2E8F0; border-radius: 14px; font-size: 1rem; outline: none; transition: all 0.3s ease; color: #1E293B; }
        .custom-input:focus, .custom-select:focus { border-color: #0D9488; box-shadow: 0 0 0 5px rgba(13, 148, 136, 0.1); }
        tr:hover td { background-color: #F0FDFA; cursor: default; }
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

export default UsageReport;
