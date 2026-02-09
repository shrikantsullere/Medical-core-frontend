import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, Plus, Download, Upload, RotateCcw, Check, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

const Fee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [fees, setFees] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newFee, setNewFee] = useState({
    doctor: '',
    ars: '',
    coverage: '',
    price: '',
    typeOfFee: '',
    feeValue: ''
  });

  const handleAddRow = () => {
    setIsAdding(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFee(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (newFee.doctor.trim() && newFee.price.trim()) {
      setFees([...fees, { ...newFee, id: Date.now() }]);
      setNewFee({ doctor: '', ars: '', coverage: '', price: '', typeOfFee: '', feeValue: '' });
      setIsAdding(false);
    }
  };

  const handleReset = () => {
    setNewFee({ doctor: '', ars: '', coverage: '', price: '', typeOfFee: '', feeValue: '' });
    setIsAdding(false);
  };

  return (
    <DashboardLayout>
      <div className="fee-container">
        {/* Header Section */}
        <div className="fee-header">
          <h1 className="main-title">Fee</h1>
          <div className="breadcrumb">
            <LayoutGrid size={16} />
            <span>Fee maintenance</span>
          </div>
          <div className="orange-divider"></div>
        </div>

        {/* Action Card */}
        <div className="fee-card">
          <div className="top-action-bar">
            <div className="search-group">
              <div className="input-with-icon">
                <label>Look for:</label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search size={18} className="search-icon-accent" />
                </div>
              </div>

              <div className="input-with-icon">
                <label>Doctor:</label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    value={doctorSearch}
                    onChange={(e) => setDoctorSearch(e.target.value)}
                    placeholder="Select..."
                  />
                  <Search size={18} className="search-icon-accent" />
                </div>
              </div>
            </div>

            <div className="button-group">
              <button className="btn-text-icon">
                <Download size={18} color="#F28C28" />
                <span>DOWNLOAD</span>
              </button>
              <button className="btn-text-icon" onClick={() => window.location.href = '/medcore/upload-excel'}>
                <Upload size={18} color="#F28C28" />
                <span>CARRY</span>
              </button>
              <button className="btn-add-orange" onClick={handleAddRow}>
                <Plus size={18} />
                <span>ADD</span>
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="fee-table">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Doctor</th>
                  <th style={{ width: '15%' }}>ARS</th>
                  <th style={{ width: '20%' }}>Coverage</th>
                  <th style={{ width: '15%' }}>Price</th>
                  <th style={{ width: '15%' }}>Type of Fee</th>
                  <th style={{ width: '15%' }}>Fee Value</th>
                  <th style={{ width: '80px' }}></th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr className="edit-row">
                    <td>
                      <input type="text" name="doctor" className="table-input" value={newFee.doctor} onChange={handleInputChange} />
                    </td>
                    <td>
                      <input type="text" name="ars" className="table-input" value={newFee.ars} onChange={handleInputChange} />
                    </td>
                    <td>
                      <input type="text" name="coverage" className="table-input" value={newFee.coverage} onChange={handleInputChange} />
                    </td>
                    <td>
                      <input type="text" name="price" className="table-input" value={newFee.price} onChange={handleInputChange} />
                    </td>
                    <td>
                      <select name="typeOfFee" className="table-select-plain" value={newFee.typeOfFee} onChange={handleInputChange}>
                        <option value="">Select...</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Percentage">Percentage</option>
                      </select>
                    </td>
                    <td>
                      <input type="text" name="feeValue" className="table-input" value={newFee.feeValue} onChange={handleInputChange} />
                    </td>
                    <td>
                      <div className="row-actions">
                        <button className="btn-action-reset" onClick={handleReset}><RotateCcw size={14} /></button>
                        <button className="btn-action-check" onClick={handleSave}><Check size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )}

                {fees.length === 0 && !isAdding && (
                  <tr>
                    <td colSpan="7" className="empty-msg">There are no fees available for this doctor</td>
                  </tr>
                )}

                {fees.map(fee => (
                  <tr key={fee.id}>
                    <td>{fee.doctor}</td>
                    <td>{fee.ars}</td>
                    <td>{fee.coverage}</td>
                    <td>{fee.price}</td>
                    <td>{fee.typeOfFee}</td>
                    <td>{fee.feeValue}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-group">
            <div className="pagination-box">
              <ChevronLeft size={16} className="pag-icon" />
              <span>1/0</span>
              <ChevronRight size={16} className="pag-icon" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fee-container {
          padding: 1rem 2rem;
        }
        .fee-header {
          margin-bottom: 2.5rem;
        }
        .main-title {
          font-size: 2.2rem;
          color: #333;
          margin-bottom: 0.8rem;
          font-weight: 500;
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #555;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }
        .orange-divider {
          width: 100%;
          height: 1px;
          background-color: #F28C28;
        }
        .fee-card {
          background-color: white;
          border-radius: 4px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          min-height: 400px;
        }
        .top-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .search-group {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .input-with-icon {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .input-with-icon label {
          color: #666;
          font-size: 1rem;
          white-space: nowrap;
        }
        .search-input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .search-input-wrapper input {
          border: 1px solid #C4C4C4;
          outline: none;
          padding: 0.5rem 0.8rem;
          font-size: 0.95rem;
          width: 150px;
          border-radius: 4px;
        }
        .search-icon-accent {
          color: #F28C28;
          cursor: pointer;
        }
        .button-group {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .btn-text-icon {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #444;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-text-icon:hover { opacity: 0.7; }
        .btn-add-orange {
          background-color: #F28C28;
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 4px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          text-transform: uppercase;
        }
        .table-wrapper {
          margin-bottom: 2rem;
          overflow-x: auto;
        }
        .fee-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }
        .fee-table th {
          background-color: #0B3B3C;
          color: white;
          text-align: left;
          padding: 1.2rem 1rem;
          font-size: 0.95rem;
          font-weight: 600;
        }
        .fee-table td {
          padding: 1rem;
          border-bottom: 1px solid #f1f1f1;
          color: #333;
          font-size: 0.95rem;
        }
        .empty-msg {
          text-align: center;
          padding: 3rem !important;
          color: #333;
          font-weight: 500;
        }
        .edit-row td { background-color: #fcfcfc; }
        .table-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .table-select-plain {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .row-actions { display: flex; gap: 0.5rem; }
        .btn-action-reset { background-color: #E5E7EB; border: none; padding: 0.4rem; border-radius: 4px; cursor: pointer; }
        .btn-action-check { background-color: #F28C28; color: white; border: none; padding: 0.4rem; border-radius: 4px; cursor: pointer; }
        .pagination-group {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
        .pagination-box {
          display: flex;
          align-items: center;
          gap: 2rem;
          background-color: white;
          padding: 0.6rem 1.5rem;
          border: 1px solid #efefef;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          border-radius: 8px;
          color: #444;
        }
        .pag-icon { color: #F28C28; cursor: pointer; opacity: 0.8; }
        .pag-icon:hover { opacity: 1; }
      `}</style>
    </DashboardLayout>
  );
};

export default Fee;
