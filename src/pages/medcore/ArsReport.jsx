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
        // Dummy results can be added here if needed, or left empty to show standard table
        { id: 1, date: '2023-10-01', ars: 'Humano', amount: 1500, status: 'Paid' },
        { id: 2, date: '2023-10-05', ars: 'Universal', amount: 2300, status: 'Pending' }
      ]);
    }, 1500);
  };

  const handleExport = () => {
    if (!reportData) return alert('No data to export. Please search first.');
    alert('Exporting report to Excel...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      {/* Header with Actions */}
      <div className="page-header" style={{ marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem', alignItems: 'flex-end' }}>
        <h2 className="page-title">ARS Invoice Report</h2>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button
            onClick={handleClean}
            className="btn-text-action"
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#555', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <Eraser size={16} />
            CLEAN
          </button>
          <button
            onClick={handleSearch}
            className="btn-text-action"
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#F28C28', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <Search size={16} />
            LOOK FOR
          </button>
          <button
            onClick={handleExport}
            className="btn-text-action"
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#F28C28', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.7 }}>
            <FileSpreadsheet size={16} />
            EXPORT TO EXCEL
          </button>
          <button
            onClick={handlePrint}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#F8A359', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <Printer size={16} />
            PRINT
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="card" style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '3px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#666' }}>From:</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleInputChange('dateFrom', e.target.value)}
              style={{ border: '1px solid #ddd', padding: '0.3rem', borderRadius: '2px', color: '#555' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#666' }}>Until:</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleInputChange('dateTo', e.target.value)}
              style={{ border: '1px solid #ddd', padding: '0.3rem', borderRadius: '2px', color: '#555' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px' }}>
            <label style={{ fontSize: '0.8rem', color: '#666' }}>ARS</label>
            <select
              value={filters.ars}
              onChange={(e) => handleInputChange('ars', e.target.value)}
              style={{ flex: 1, border: '1px solid #ddd', padding: '0.3rem', borderRadius: '2px', color: '#555' }}
            >
              <option value="">Show All</option>
              <option value="humano">Humano</option>
              <option value="universal">Universal</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '150px' }}>
            <label style={{ fontSize: '0.8rem', color: '#666' }}>State</label>
            <select
              value={filters.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              style={{ flex: 1, border: '1px solid #ddd', padding: '0.3rem', borderRadius: '2px', color: '#555' }}
            >
              <option value="">Show All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            id="details"
            checked={filters.showDetails}
            onChange={(e) => handleInputChange('showDetails', e.target.checked)}
            style={{ accentColor: '#4CAF50' }}
          />
          <label htmlFor="details" style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#333' }}>Show Additional Details</label>
        </div>
      </div>

      {/* Results / Loading Area */}
      <div style={{ marginTop: '2rem' }}>
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>
            <Loader2 className="spin-animation" size={18} />
            Charging...
          </div>
        )}

        {!isLoading && reportData && (
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '3px', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #eee' }}>
                <tr>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>ARS</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map(row => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>{row.date}</td>
                    <td style={{ padding: '0.5rem' }}>{row.ars}</td>
                    <td style={{ padding: '0.5rem' }}>{row.status}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>${row.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
                .spin-animation {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}
      </style>
    </DashboardLayout>
  );
};

export default ArsReport;
