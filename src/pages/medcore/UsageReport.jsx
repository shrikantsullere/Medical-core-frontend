import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Undo2, FileSpreadsheet, Search, Calendar } from 'lucide-react';

const UsageReport = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    from: '09/02/2026',
    until: '09/02/2026',
    userType: 'CentroMedico',
    centerName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout>
      <div className="usage-report-container">

        {/* Header Section */}
        <div className="report-header">
          <h1 className="report-title">Usage reports</h1>
          <div className="header-actions">
            <button className="header-btn" onClick={() => navigate(-1)}>
              <Undo2 size={18} /> GO TO HOME
            </button>
            <button className="header-btn">
              <FileSpreadsheet size={18} color="#F28C28" /> EXPORT TO EXCEL
            </button>
            <button className="header-btn">
              <Search size={18} color="#F28C28" /> <span style={{ fontWeight: '500' }}>LOOK FOR</span>
            </button>
          </div>
        </div>

        <div className="orange-line"></div>

        {/* Filters Section */}
        <div className="filters-bar">
          <div className="filter-group">
            <label style={{ fontSize: '1.1rem', color: '#555' }}>From:</label>
            <div className="date-input-container">
              <input
                type="text"
                name="from"
                value={filters.from}
                onChange={handleInputChange}
                style={{ width: '130px', padding: '0.6rem 0.8rem' }}
              />
              <button className="calendar-btn">
                <Calendar size={18} />
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label style={{ fontSize: '1.1rem', color: '#555' }}>Until:</label>
            <div className="date-input-container">
              <input
                type="text"
                name="until"
                value={filters.until}
                onChange={handleInputChange}
                style={{ width: '130px', padding: '0.6rem 0.8rem' }}
              />
              <button className="calendar-btn">
                <Calendar size={18} />
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label style={{ fontSize: '1.1rem', color: '#333' }}>User Type:</label>
            <div style={{ position: 'relative' }}>
              <select
                name="userType"
                value={filters.userType}
                onChange={handleInputChange}
                style={{ appearance: 'none', border: '1px solid #C4C4C4', borderRadius: '4px', padding: '0.6rem 3rem 0.6rem 1rem', fontSize: '1rem' }}
              >
                <option value="CentroMedico">CentroMedico</option>
              </select>
              <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#666' }}>▼</div>
            </div>
          </div>

          <div className="filter-group">
            <label style={{ fontSize: '1.1rem', color: '#333' }}>Center Name:</label>
            <div style={{ position: 'relative' }}>
              <select
                name="centerName"
                value={filters.centerName}
                onChange={handleInputChange}
                style={{ appearance: 'none', border: '1px solid #C4C4C4', borderRadius: '4px', padding: '0.6rem 3rem 0.6rem 1rem', fontSize: '1rem', width: '180px' }}
              >
                <option value="">Select...</option>
              </select>
              <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#666' }}>▼</div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="report-content-card">
          <p className="empty-state-text">
            <strong>There is no data to display.</strong> Please enter new search parameters.
          </p>
        </div>

      </div>

      <style>{`
        .usage-report-container {
          padding: 1.5rem 2.5rem;
          background-color: #fcfcfc;
          min-height: calc(100vh - 80px);
        }
        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }
        .report-title {
          font-size: 2.2rem;
          color: #333;
          font-weight: 400;
          margin: 0;
        }
        .header-actions {
          display: flex;
          gap: 2rem;
        }
        .header-btn {
          background: none;
          border: none;
          color: #333;
          font-weight: 500;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .header-btn:hover {
          opacity: 0.7;
        }
        .orange-line {
          width: 100%;
          height: 1px;
          background-color: #F28C28;
          margin-bottom: 2rem;
        }
        .filters-bar {
          display: flex;
          gap: 3.5rem;
          align-items: center;
          padding: 0 0 2rem 0;
          flex-wrap: wrap;
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }
        .date-input-container {
          display: flex;
          align-items: center;
          border: 1px solid #C4C4C4;
          border-radius: 4px;
          background-color: white;
        }
        .date-input-container input {
          border: none;
          outline: none;
          color: #333;
        }
        .calendar-btn {
          background-color: #F28C28;
          border: none;
          color: white;
          padding: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .report-content-card {
          background-color: white;
          border-top: 1px solid #efefef;
          padding: 3rem 0;
          min-height: 500px;
        }
        .empty-state-text {
          color: #333;
          font-size: 1rem;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default UsageReport;
