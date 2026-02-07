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
    alert('Filters applied: ' + JSON.stringify(filters));
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2 className="page-title">Authorization Report</h2>
        <button
          onClick={() => alert('Exporting results...')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', backgroundColor: '#15803d', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
          <Download size={16} />
          EXPORT RESULTS
        </button>
      </div>

      <div className="card" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <div className="form-section flex-col md:flex-row" style={{ marginTop: 0, alignItems: 'flex-end', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Service Type</label>
            <select
              className="custom-select"
              value={filters.serviceType}
              onChange={(e) => handleFilterChange('serviceType', e.target.value)}
            >
              <option value="">All Services</option>
              <option value="consult">Consultation</option>
              <option value="lab">Laboratory</option>
              <option value="surgery">Surgery</option>
            </select>
          </div>
          <div className="form-group">
            <label>Doctor</label>
            <select
              className="custom-select"
              value={filters.doctor}
              onChange={(e) => handleFilterChange('doctor', e.target.value)}
            >
              <option value="">All Doctors</option>
              <option value="dr_smith">Dr. Smith</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date Range</label>
            <input
              type="date"
              className="custom-input"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            />
          </div>
          <button className="btn-continue" style={{ height: '42px', marginBottom: '2px' }} onClick={handleApplyFilters}>
            <Filter size={18} />
            APPLY
          </button>
        </div>
      </div>

      <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB', color: '#9CA3AF' }}>
        <ClipboardList size={64} style={{ marginBottom: '1rem', opacity: 0.2 }} />
        <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#4B5563' }}>Report list is empty</p>
        <p style={{ fontSize: '0.9rem' }}>Please use the filter to see authorization results</p>
      </div>
    </DashboardLayout>
  );
};

export default AuthorizationReport;
