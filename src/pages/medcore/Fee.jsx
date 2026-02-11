import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, Plus, Download, Upload, RotateCcw, Check, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

const Fee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [fees, setFees] = useState([
    { id: 1, doctor: 'Dr. Juan Perez', ars: 'Senasa', coverage: 'Plan Básico', price: 'RD$ 2,500.00', typeOfFee: 'Percentage', feeValue: '10%' },
    { id: 2, doctor: 'Dra. Maria Garcia', ars: 'Humano', coverage: 'Plan Max', price: 'RD$ 3,200.00', typeOfFee: 'Fixed', feeValue: 'RD$ 500.00' },
    { id: 3, doctor: 'Dr. Carlos Rodriguez', ars: 'Universal', coverage: 'Plan Platinum', price: 'RD$ 4,500.00', typeOfFee: 'Percentage', feeValue: '15%' },
    { id: 4, doctor: 'Dra. Ana Martinez', ars: 'Palic', coverage: 'Plan Gold', price: 'RD$ 3,800.00', typeOfFee: 'Fixed', feeValue: 'RD$ 600.00' },
  ]);
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
      <div className="fee-maintenance-page" style={{ padding: '1.5rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 className="page-title" style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.025em' }}>Fee <span style={{ color: 'var(--primary)' }}>Management</span></h2>
            <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.9rem', fontWeight: '500' }}>Maintain professional fees and clinical pricing.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }} className="action-buttons">
            <button className="btn-secondary" onClick={() => window.location.href = '/medcore/upload-excel'}>
              <Upload size={18} /> CARRY DATA
            </button>
            <button className="btn-primary" onClick={handleAddRow}>
              <Plus size={18} /> NEW FEE ENTRY
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', alignItems: 'flex-end' }}>
            <div className="filter-group">
              <label className="filter-label" style={{ marginBottom: '0.5rem', display: 'block' }}>SEARCH BY DOCTOR</label>
              <div style={{ position: 'relative' }}>
                <input type="text" className="custom-input" placeholder="Search medical staff..." value={doctorSearch} onChange={(e) => setDoctorSearch(e.target.value)} style={{ width: '100%', paddingLeft: '2.5rem' }} />
                <Search size={18} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label" style={{ marginBottom: '0.5rem', display: 'block' }}>GENERAL KEYWORD</label>
              <div style={{ position: 'relative' }}>
                <input type="text" className="custom-input" placeholder="Filter by keyword..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', paddingLeft: '2.5rem' }} />
                <Search size={18} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <Download size={18} /> EXPORT TABLE
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container" style={{ margin: 0, border: 'none' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-sidebar)', color: 'white' }}>
                  <th style={{ padding: '1rem 1.5rem', color: 'white', fontWeight: '700' }}>DOCTOR</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'white', fontWeight: '700' }}>ARS ENTITY</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'white', fontWeight: '700' }}>COVERAGE</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'white', fontWeight: '700' }}>BASE PRICE</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'white', fontWeight: '700' }}>FEE TYPE</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'white', fontWeight: '700' }}>FEE VALUE</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'white', fontWeight: '700', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr style={{ backgroundColor: 'var(--primary-light)', animation: 'fadeIn 0.3s ease-out' }}>
                    <td style={{ padding: '0.75rem 1.5rem' }} data-label="DOCTOR"><input type="text" name="doctor" value={newFee.doctor} onChange={handleInputChange} className="custom-input" style={{ width: '100%', height: '36px' }} placeholder="Dr. Name" /></td>
                    <td style={{ padding: '0.75rem 1.5rem' }} data-label="ARS ENTITY"><input type="text" name="ars" value={newFee.ars} onChange={handleInputChange} className="custom-input" style={{ width: '100%', height: '36px' }} placeholder="ARS" /></td>
                    <td style={{ padding: '0.75rem 1.5rem' }} data-label="COVERAGE"><input type="text" name="coverage" value={newFee.coverage} onChange={handleInputChange} className="custom-input" style={{ width: '100%', height: '36px' }} placeholder="Plan" /></td>
                    <td style={{ padding: '0.75rem 1.5rem' }} data-label="BASE PRICE"><input type="text" name="price" value={newFee.price} onChange={handleInputChange} className="custom-input" style={{ width: '100%', height: '36px' }} placeholder="Price" /></td>
                    <td style={{ padding: '0.75rem 1.5rem' }} data-label="FEE TYPE">
                      <select name="typeOfFee" value={newFee.typeOfFee} onChange={handleInputChange} className="custom-select" style={{ width: '100%', height: '36px' }}>
                        <option value="">Select...</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Percentage">Percentage</option>
                      </select>
                    </td>
                    <td style={{ padding: '0.75rem 1.5rem' }} data-label="FEE VALUE"><input type="text" name="feeValue" value={newFee.feeValue} onChange={handleInputChange} className="custom-input" style={{ width: '100%', height: '36px' }} placeholder="Value" /></td>
                    <td style={{ padding: '0.75rem 1.5rem', textAlign: 'right' }} data-label="ACTIONS">
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', width: '100%' }}>
                        <button onClick={handleReset} style={{ backgroundColor: '#EF4444', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={16} style={{ transform: 'rotate(45deg)' }} /></button>
                        <button onClick={handleSave} style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={16} /></button>
                      </div>
                    </td>
                  </tr>
                )}

                {fees.filter(fee => fee.doctor.toLowerCase().includes(doctorSearch.toLowerCase())).map((fee, idx) => (
                  <tr key={fee.id} style={{ borderBottom: '1px solid var(--border)', backgroundColor: idx % 2 === 0 ? 'white' : 'var(--bg-main)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-main)' }} data-label="DOCTOR">{fee.doctor}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }} data-label="ARS ENTITY">{fee.ars}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }} data-label="COVERAGE">{fee.coverage}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-main)', fontWeight: '700' }} data-label="BASE PRICE">{fee.price}</td>
                    <td style={{ padding: '1rem 1.5rem' }} data-label="FEE TYPE">
                      <span style={{ backgroundColor: 'white', color: 'var(--text-secondary)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', border: '1px solid var(--border)' }}>
                        {fee.typeOfFee.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--primary)', fontWeight: '700' }} data-label="FEE VALUE">{fee.feeValue}</td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }} data-label="ACTIONS">
                      <button style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', opacity: 0.8, padding: '0.25rem' }} className="hover-scale"><Plus size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1.5rem', backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '100px', boxShadow: 'var(--shadow-sm)' }}>
            <button style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronLeft size={18} /></button>
            <span style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.85rem' }}>PAGE 1 OF 1</span>
            <button style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      <style>{`
        .hover-scale:hover { transform: scale(1.1); opacity: 1 !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 768px) {
          .fee-maintenance-page { 
            padding: 1rem !important; 
            width: 100% !important;
            box-sizing: border-box !important;
          }
          
          .page-header { 
            flex-direction: column !important; 
            align-items: flex-start !important; 
            gap: 1.5rem !important; 
            margin-bottom: 1.5rem !important;
          }
          
          .action-buttons { 
            width: 100% !important; 
            flex-direction: column !important; 
            gap: 1rem !important;
          }
          
          .action-buttons button { 
            width: 100% !important; 
            justify-content: center !important; 
          }

          .filter-group {
            width: 100% !important;
          }

          /* Force card content to stack */
          .card > div {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          /* Table Responsive Card View */
          table, thead, tbody, th, td, tr { 
            display: block !important; 
          }
          
          thead tr { 
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
          }
          
          tr { 
            margin-bottom: 1rem !important; 
            border: 1px solid var(--border) !important;
            border-radius: var(--radius-md) !important;
            background-color: white !important;
            padding: 1rem !important;
            box-shadow: var(--shadow-sm) !important;
          }
          
          td { 
            border: none !important;
            border-bottom: 1px dashed var(--border) !important; 
            position: relative !important;
            padding: 0.75rem 0 !important;
            padding-left: 0 !important;
            text-align: right !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
          }

          td:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
            justify-content: flex-end !important;
          }
          
          td:before { 
            content: attr(data-label);
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.75rem;
            color: var(--text-muted);
            text-align: left;
            margin-right: 1rem;
          }

          /* Input fields in mobile table */
          td input, td select {
            text-align: right;
            border: 1px solid var(--border);
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            font-size: 0.9rem;
            width: 60% !important; /* Limit width */
          }
          
          /* Actions cell adjustments */
          td[data-label="ACTIONS"] > div {
             justify-content: flex-end !important;
             width: auto !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Fee;
