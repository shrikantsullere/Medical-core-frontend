import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Eraser, Search, FileSpreadsheet, Printer, Loader2 } from 'lucide-react';

const ArsReport = () => {
  // Filter States
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    ars: '',
    state: '',
    showDetails: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Handlers
  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClean = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      ars: '',
      state: '',
      showDetails: false
    });
    setReportData(null);
    setIsLoading(false);
  };

  const handleSearch = () => {
    setIsLoading(true);
    setReportData(null);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      setReportData([
        { name: 'Senasa Contributivo', invoices: 24, pending: 5, paid: 125000.00, total: 148500.00 },
        { name: 'ARS Humano', invoices: 18, pending: 3, paid: 89000.00, total: 104200.00 },
        { name: 'Universal', invoices: 12, pending: 2, paid: 54000.00, total: 62000.00 },
        { name: 'Palic', invoices: 15, pending: 4, paid: 72000.00, total: 85500.00 },
        { name: 'Mapfre', invoices: 8, pending: 1, paid: 35000.00, total: 39800.00 },
      ]);
    }, 1500);
  };

  const handleExport = () => {
    if (!reportData) return alert('No protocol data to synchronize. Please initialize search.');
    alert('Synchronizing analytics core to local disk...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="ars-report-page" style={{ padding: '2rem 3rem', animation: 'fadeIn 0.4s ease-out' }}>
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 className="page-title" style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.025em' }}>ARS Invoice <span style={{ color: '#0D9488' }}>Intelligence</span></h2>
            <p style={{ color: '#64748B', margin: '0.5rem 0 0', fontSize: '1.1rem', fontWeight: '500' }}>Comprehensive financial reconciliation and systemic billing performance metrics.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <button className="btn-secondary" onClick={handleClean} style={{ height: '52px', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
              <Eraser size={20} /> CLEAR PROTOCOL
            </button>
            <button className="btn-primary" onClick={handlePrint} style={{ height: '52px', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '900', borderRadius: '14px' }}>
              <Printer size={22} /> PRINT ANALYSIS
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: '3rem', marginBottom: '3.5rem', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', alignItems: 'flex-end' }}>
            <div className="filter-group">
              <label className="filter-label">TEMPORAL START</label>
              <input type="date" className="custom-input" value={filters.dateFrom} onChange={(e) => handleInputChange('dateFrom', e.target.value)} style={{ width: '100%', height: '56px', fontWeight: '700' }} />
            </div>
            <div className="filter-group">
              <label className="filter-label">TEMPORAL END</label>
              <input type="date" className="custom-input" value={filters.dateTo} onChange={(e) => handleInputChange('dateTo', e.target.value)} style={{ width: '100%', height: '56px', fontWeight: '700' }} />
            </div>
            <div className="filter-group">
              <label className="filter-label">INSURANCE CARRIER</label>
              <select className="custom-select" value={filters.ars} onChange={(e) => handleInputChange('ars', e.target.value)} style={{ width: '100%', height: '56px', fontWeight: '700' }}>
                <option value="">Full Carrier Search</option>
                <option value="humano">ARS Humano</option>
                <option value="universal">Universal</option>
                <option value="senasa">Senasa</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">SETTLEMENT STATE</label>
              <select className="custom-select" value={filters.state} onChange={(e) => handleInputChange('state', e.target.value)} style={{ width: '100%', height: '56px', fontWeight: '700' }}>
                <option value="">Comprehensive State View</option>
                <option value="paid">Fully Settled</option>
                <option value="pending">Pending Settlement</option>
              </select>
            </div>
            <div>
              <button className="btn-primary" style={{ width: '100%', height: '56px', padding: '0 2rem', fontWeight: '900', borderRadius: '14px' }} onClick={handleSearch} disabled={isLoading}>
                {isLoading ? <Loader2 size={24} className="spin-animation" /> : <Search size={24} />}
                {isLoading ? 'ANALYZING...' : 'INITIALIZE'}
              </button>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', backgroundColor: '#F8FAFC', borderRadius: '18px', border: '1.5px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s' }} className="checkbox-wrapper" onClick={() => handleInputChange('showDetails', !filters.showDetails)}>
            <input type="checkbox" id="details" className="custom-checkbox" checked={filters.showDetails} onChange={(e) => handleInputChange('showDetails', e.target.checked)} style={{ width: '22px', height: '22px', accentColor: '#0D9488' }} />
            <label htmlFor="details" style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1E293B', cursor: 'pointer', userSelect: 'none' }}>INCLUDE GRANULAR TRANSACTION-LEVEL DEPTH IN ANALYSIS OUTPUT</label>
          </div>
        </div>

        {reportData && (
          <div className="card" style={{ overflow: 'hidden', animation: 'fadeIn 0.5s ease-out', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '2rem 3rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.02em' }}>Intelligence <span style={{ color: '#0D9488' }}>Synchronization</span></h3>
              <button onClick={handleExport} style={{ background: 'none', border: 'none', color: '#0D9488', fontSize: '0.95rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', borderRadius: '100px', transition: 'all 0.2s' }} className="export-link">
                <FileSpreadsheet size={22} /> EXCEL PROTOCOL
              </button>
            </div>
            <div className="maint-table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                    <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>CARRIER IDENTITY</th>
                    <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>VOLUME</th>
                    <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>PENDING LOAD</th>
                    <th style={{ padding: '1.5rem 2rem', textAlign: 'right', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>SETTLED VALUATION</th>
                    <th style={{ padding: '1.5rem 2rem', textAlign: 'right', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>TOTAL SYSTEM VALUATION</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: idx % 2 === 0 ? 'white' : '#F9FAFB', transition: 'background-color 0.2s' }} className="table-row-hover">
                      <td style={{ padding: '1.5rem 2rem' }}>
                        <div style={{ fontWeight: '900', color: '#1E293B', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{row.name}</div>
                      </td>
                      <td style={{ padding: '1.5rem 2rem', textAlign: 'center', color: '#64748B', fontWeight: '900', fontSize: '1rem' }}>{row.invoices} INVOICES</td>
                      <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                        <span style={{ color: '#EF4444', fontWeight: '900', backgroundColor: '#FEF2F2', padding: '0.5rem 1.25rem', borderRadius: '10px', fontSize: '0.85rem', border: '1.5px solid currentColor', display: 'inline-block', minWidth: '80px' }}>{row.pending} REVIEWS</span>
                      </td>
                      <td style={{ padding: '1.5rem 2rem', textAlign: 'right', color: '#0D9488', fontWeight: '900', fontSize: '1.1rem' }}>${row.paid.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '1.5rem 2rem', textAlign: 'right', fontWeight: '900', color: '#1E293B', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>${row.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot style={{ backgroundColor: '#0B3B3C', color: 'white', borderTop: '4px solid #0D9488' }}>
                  <tr>
                    <td style={{ padding: '2.5rem 2rem', fontWeight: '900', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>AGGREGATE PERFORMANCE DATA</td>
                    <td style={{ padding: '2.5rem 2rem', textAlign: 'center', fontWeight: '900', fontSize: '1.2rem' }}>77 TOTAL</td>
                    <td style={{ padding: '2.5rem 2rem', textAlign: 'center', fontWeight: '900', fontSize: '1.2rem', color: '#FECACA' }}>15 PENDING</td>
                    <td style={{ padding: '2.5rem 2rem', textAlign: 'right', fontWeight: '900', fontSize: '1.3rem' }}>$375,000.00</td>
                    <td style={{ padding: '2.5rem 2rem', textAlign: 'right', fontWeight: '900', fontSize: '1.6rem', letterSpacing: '-0.03em' }}>$440,000.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {!reportData && !isLoading && (
          <div style={{ textAlign: 'center', padding: '10rem 2rem', color: '#94A3B8', animation: 'fadeIn 0.5s ease-out' }}>
            <FileSpreadsheet size={100} style={{ marginBottom: '2.5rem', opacity: 0.05 }} />
            <h3 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '900', color: '#CBD5E1', letterSpacing: '-0.02em' }}>Awaiting Parameters</h3>
            <p style={{ marginTop: '0.75rem', fontSize: '1.2rem', fontWeight: '500' }}>Configure systemic filters above to synchronize analytics protocol.</p>
          </div>
        )}
      </div>

      <style>{`
        .filter-label { display: block; fontSize: 0.8rem; fontWeight: 900; color: #64748B; marginBottom: 0.75rem; letterSpacing: 0.1em; }
        .custom-input, .custom-select { padding: 0.75rem 1.25rem; border: 1.5px solid #E2E8F0; border-radius: 14px; font-size: 1rem; outline: none; transition: all 0.3s ease; color: #1E293B; }
        .custom-input:focus, .custom-select:focus { border-color: #0D9488; box-shadow: 0 0 0 5px rgba(13, 148, 136, 0.1); }
        .checkbox-wrapper:hover { background-color: #F1F5F9 !important; transform: scale(1.01); }
        .table-row-hover:hover td { background-color: #F0FDFA !important; cursor: default; }
        .export-link:hover { background-color: #F0FDFA; transform: translateY(-2px); }
        .spin-animation { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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

export default ArsReport;
