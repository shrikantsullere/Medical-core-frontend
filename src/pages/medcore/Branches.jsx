import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, Plus, RotateCcw, Check, ChevronLeft, ChevronRight, LayoutGrid, FileSpreadsheet } from 'lucide-react';

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branches, setBranches] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    principal: false,
    status: ''
  });

  const handleAddRow = () => {
    setIsAdding(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBranch(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (newBranch.name.trim() && newBranch.address.trim()) {
      setBranches([...branches, { ...newBranch, id: Date.now() }]);
      setNewBranch({ name: '', address: '', principal: false, status: '' });
      setIsAdding(false);
    }
  };

  const handleReset = () => {
    setNewBranch({ name: '', address: '', principal: false, status: '' });
    setIsAdding(false);
  };

  return (
    <DashboardLayout>
      <div className="branch-container">
        {/* Header Section */}
        <div className="branch-header">
          <h1 className="main-title">Branch Maintenance</h1>
          <div className="breadcrumb">
            <LayoutGrid size={16} />
            <span>Branches</span>
          </div>
          <div className="orange-divider"></div>
        </div>

        {/* Action Card */}
        <div className="branch-card">
          <div className="top-action-bar">
            <div className="search-group">
              <label>Look for:</label>
              <div className="search-input-wrapper">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Seach here..."
                />
                <Search size={18} className="search-icon-accent" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-upload-text" onClick={() => window.location.href = '/medcore/upload-excel'}>
                <FileSpreadsheet size={18} /> UPLOAD EXCEL
              </button>
              <button className="btn-add-orange" onClick={handleAddRow}>
                <Plus size={18} /> ADD
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="branch-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Name</th>
                  <th style={{ width: '40%' }}>Address</th>
                  <th style={{ width: '15%' }}>Principal</th>
                  <th style={{ width: '20%' }}>Status</th>
                  <th style={{ width: '100px' }}></th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr className="edit-row">
                    <td>
                      <input
                        type="text"
                        name="name"
                        className="table-input"
                        value={newBranch.name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="address"
                        className="table-input"
                        value={newBranch.address}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>{/* Principal column empty in image for add mode */}</td>
                    <td>
                      <div className="select-wrapper">
                        <select
                          name="status"
                          className="table-select"
                          value={newBranch.status}
                          onChange={handleInputChange}
                        >
                          <option value="">Choose Status...</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button className="btn-action-reset" onClick={handleReset}>
                          <RotateCcw size={16} />
                        </button>
                        <button className="btn-action-check" onClick={handleSave}>
                          <Check size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {branches.length === 0 && !isAdding && (
                  <tr>
                    <td colSpan="5" className="empty-msg">No branches found. Click ADD to create one.</td>
                  </tr>
                )}

                {branches.map(branch => (
                  <tr key={branch.id}>
                    <td>{branch.name}</td>
                    <td>{branch.address}</td>
                    <td>{branch.principal ? 'Yes' : ''}</td>
                    <td>{branch.status}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-group">
            <div className="pagination-box">
              <ChevronLeft size={16} className="pag-icon" />
              <span>1/1</span>
              <ChevronRight size={16} className="pag-icon" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .branch-container {
          padding: 1rem 2rem;
        }
        .branch-header {
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
        .branch-card {
          background-color: white;
          border-radius: 4px;
          padding: 2.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          min-height: 400px;
        }
        .top-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }
        .search-group {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }
        .search-group label {
          color: #555;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .search-input-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid #C4C4C4;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          background: white;
        }
        .search-input-wrapper input {
          border: none;
          outline: none;
          padding: 0.6rem 0.4rem;
          font-size: 1rem;
          width: 200px;
        }
        .search-icon-accent {
          color: #F28C28;
          cursor: pointer;
        }
        .btn-add-orange {
          background-color: #F28C28;
          color: white;
          border: none;
          padding: 0.8rem 1.8rem;
          border-radius: 4px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.95rem;
          text-transform: uppercase;
          transition: transform 0.2s, background 0.2s;
        }
        .btn-add-orange:hover {
          background-color: #e07b1c;
          transform: translateY(-1px);
        }
        .btn-upload-text {
          background: none;
          border: none;
          color: #F28C28;
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-upload-text:hover { opacity: 0.8; }
        .table-wrapper {
          margin-bottom: 2.5rem;
        }
        .branch-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        .branch-table th {
          background-color: #0B3B3C;
          color: white;
          text-align: left;
          padding: 1.2rem 1rem;
          font-size: 1rem;
          font-weight: 600;
        }
        .branch-table td {
          padding: 1rem;
          border-bottom: 1px solid #f1f1f1;
          color: #333;
          font-size: 1rem;
        }
        .edit-row td {
          background-color: #F9F9F9;
          padding-top: 1.2rem;
          padding-bottom: 1.2rem;
        }
        .table-input {
          width: 90%;
          padding: 0.8rem;
          border: 1px solid #DEDEDE;
          border-radius: 4px;
          outline: none;
          font-size: 1rem;
          background-color: #F9F9F9;
        }
        .table-input:focus {
          border-color: #F28C28;
          background-color: white;
        }
        .select-wrapper {
          position: relative;
          width: 95%;
        }
        .table-select {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #DEDEDE;
          border-radius: 4px;
          appearance: none;
          background-color: #F9F9F9;
          color: #666;
          outline: none;
          font-size: 0.95rem;
        }
        .select-wrapper::after {
          content: '▼';
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #F28C28;
          font-size: 0.8rem;
          pointer-events: none;
        }
        .row-actions {
          display: flex;
          gap: 0.8rem;
          justify-content: flex-end;
        }
        .btn-action-reset {
          background-color: #E55353;
          color: white;
          border: none;
          padding: 0.6rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-action-check {
          background-color: #F28C28;
          color: white;
          border: none;
          padding: 0.6rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
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
          padding: 0.8rem 1.5rem;
          border: 1px solid #efefef;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          border-radius: 8px;
          color: #444;
          font-size: 1rem;
          font-weight: 500;
        }
        .pag-icon {
          color: #F28C28;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .pag-icon:hover {
          opacity: 1;
        }
        .empty-msg {
          text-align: center;
          padding: 5rem !important;
          color: #BBB;
          font-style: italic;
          font-size: 1.1rem;
        }
        @media (max-width: 992px) {
          .branch-card { padding: 1.5rem; }
          .search-group label { display: none; }
          .search-input-wrapper input { width: 140px; }
        }
        @media (max-width: 768px) {
          .top-action-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
          }
          .search-input-wrapper {
            width: 100%;
          }
          .search-input-wrapper input {
            flex: 1;
            width: 100%;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Branches;
