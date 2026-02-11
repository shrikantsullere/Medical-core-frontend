import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, Plus, RotateCcw, Check, ChevronLeft, ChevronRight, LayoutGrid, FileSpreadsheet, X } from 'lucide-react';

const Branches = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [branches, setBranches] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    principal: false,
    status: 'Active'
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
      setNewBranch({ name: '', address: '', principal: false, status: 'Active' });
      setIsAdding(false);
    }
  };

  const handleReset = () => {
    setNewBranch({ name: '', address: '', principal: false, status: 'Active' });
    setIsAdding(false);
  };

  return (
    <DashboardLayout>
      <div className="branches-maintenance-page" style={{ padding: '2rem 3rem', animation: 'fadeIn 0.4s ease-out' }}>
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 className="page-title" style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.025em' }}>Network <span style={{ color: '#0D9488' }}>Branches</span></h2>
            <p style={{ color: '#64748B', margin: '0.4rem 0 0', fontSize: '1.1rem', fontWeight: '500' }}>Maintain clinical infrastructure, satellite offices, and administrative hubs.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <button className="btn-secondary" onClick={() => navigate('/upload-excel')} style={{ height: '52px', padding: '0 1.5rem', borderRadius: '14px', fontWeight: '700' }}>
              <FileSpreadsheet size={20} /> CARRY DATA
            </button>
            <button className="btn-primary" onClick={handleAddRow} style={{ height: '52px', padding: '0 2rem', borderRadius: '14px', fontWeight: '900' }}>
              <Plus size={22} /> INITIALIZE BRANCH
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: '2.5rem', marginBottom: '3rem', border: '1px solid #E2E8F0', borderRadius: '32px' }}>
          <div style={{ maxWidth: '700px', position: 'relative' }}>
            <label style={{ position: 'absolute', top: '-11px', left: '16px', backgroundColor: '#0D9488', color: 'white', padding: '0 12px', fontSize: '0.75rem', fontWeight: '900', borderRadius: '6px', zIndex: 1, letterSpacing: '0.1em' }}>LOCATION SEARCH</label>
            <div style={{ position: 'relative' }}>
              <input type="text" className="custom-input" placeholder="Search by clinical name, physical address, or hub identifier..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', paddingLeft: '3rem', height: '56px', fontSize: '1rem' }} />
              <Search size={22} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            </div>
          </div>
        </div>

        <div className="card" style={{ overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
          <div className="maint-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>BRANCH IDENTITY</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>PHYSICAL COORDINATES</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>CLASSIFICATION</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>OPERATIONAL STATUS</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'right', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>MANAGEMENT</th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <tr style={{ backgroundColor: '#F8FAFC', animation: 'slideInDown 0.3s ease-out', borderBottom: '2px solid #0D9488' }}>
                    <td style={{ padding: '1rem 2rem' }}><input type="text" name="name" value={newBranch.name} onChange={handleInputChange} className="custom-input" style={{ width: '100%', height: '48px', fontWeight: '700' }} placeholder="Identify branch..." /></td>
                    <td style={{ padding: '1rem 2rem' }}><input type="text" name="address" value={newBranch.address} onChange={handleInputChange} className="custom-input" style={{ width: '100%', height: '48px' }} placeholder="Specify physical address..." /></td>
                    <td style={{ padding: '1rem 2rem', textAlign: 'center' }}>
                      <label className="checkbox-label" style={{ justifyContent: 'center' }}>
                        <input type="checkbox" name="principal" checked={newBranch.principal} onChange={(e) => setNewBranch(p => ({ ...p, principal: e.target.checked }))} className="custom-checkbox" /> HEAD HUB
                      </label>
                    </td>
                    <td style={{ padding: '1rem 2rem' }}>
                      <select name="status" value={newBranch.status} onChange={handleInputChange} className="custom-select" style={{ width: '100%', height: '48px', fontWeight: '700' }}>
                        <option value="Active">ONLINE / ACTIVE</option>
                        <option value="Inactive">OFFLINE / INACTIVE</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem 2rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                        <button onClick={handleReset} style={{ backgroundColor: '#EF4444', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Cancel Installation"><X size={20} /></button>
                        <button onClick={handleSave} style={{ backgroundColor: '#0D9488', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Save Protocol"><Check size={20} /></button>
                      </div>
                    </td>
                  </tr>
                )}

                {[
                  { id: 1, name: 'Principal Office', address: 'Av. Winston Churchill #123, Santo Domingo', principal: true, status: 'Active' },
                  { id: 2, name: 'Santiago Branch', address: 'Calle del Sol #45, Santiago de los Caballeros', principal: false, status: 'Active' },
                  { id: 3, name: 'Punta Cana Clinic', address: 'Blvd. Turístico del Este, Punta Cana', principal: false, status: 'Active' },
                  { id: 4, name: 'La Romana Health', address: 'Av. Santa Rosa #22, La Romana', principal: false, status: 'Inactive' },
                  ...branches
                ].filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase())).map((branch, idx) => (
                  <tr key={branch.id} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: idx % 2 === 0 ? 'white' : '#F9FAFB', transition: 'all 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '1.5rem 2rem' }}>
                      <div style={{ fontWeight: '900', color: '#1E293B', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{branch.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', marginTop: '0.2rem' }}>ID: BR-{branch.id.toString().slice(-4)}</div>
                    </td>
                    <td style={{ padding: '1.5rem 2rem', color: '#64748B', fontSize: '1rem', fontWeight: '500' }}>{branch.address}</td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                      <span style={{
                        backgroundColor: branch.principal ? '#0B3B3C' : '#F1F5F9',
                        color: branch.principal ? 'white' : '#64748B',
                        padding: '0.4rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '900',
                        letterSpacing: '0.05em',
                        border: branch.principal ? 'none' : '1px solid #E2E8F0'
                      }}>
                        {branch.principal ? 'HEADQUARTERS' : 'SATELLITE HUB'}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem 2rem' }}>
                      <span style={{
                        backgroundColor: branch.status === 'Active' ? '#F0FDFA' : '#FEF2F2',
                        color: branch.status === 'Active' ? '#0D9488' : '#EF4444',
                        padding: '0.4rem 1rem',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: '900',
                        border: '1.5px solid currentColor',
                        letterSpacing: '0.02em'
                      }}>
                        {branch.status === 'Active' ? 'OPERATIONAL' : 'OFFLINE'}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button style={{ background: 'none', border: '1.5px solid #F1F5F9', color: '#64748B', cursor: 'pointer', padding: '0.6rem', borderRadius: '12px', transition: 'all 0.2s' }} className="action-btn">
                          <Plus size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0.75rem 2.5rem', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '100px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }}>
            <button style={{ border: 'none', background: 'none', color: '#0D9488', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} className="page-nav-btn"><ChevronLeft size={24} /></button>
            <span style={{ fontWeight: '900', color: '#1E293B', fontSize: '0.95rem', letterSpacing: '0.05em' }}>PAGE <span style={{ color: '#0D9488' }}>01</span> / 01</span>
            <button style={{ border: 'none', background: 'none', color: '#0D9488', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} className="page-nav-btn"><ChevronRight size={24} /></button>
          </div>
        </div>
      </div>

      <style>{`
        .filter-label { display: block; fontSize: 0.8rem; fontWeight: 900; color: #64748B; marginBottom: 0.75rem; letterSpacing: 0.1em; }
        .custom-input, .custom-select { padding: 0.75rem 1.25rem; border: 1.5px solid #E2E8F0; border-radius: 14px; font-size: 1rem; outline: none; transition: all 0.3s ease; color: #1E293B; }
        .custom-input:focus, .custom-select:focus { border-color: #0D9488; box-shadow: 0 0 0 5px rgba(13, 148, 136, 0.1); }
        .checkbox-label { display: flex; align-items: center; gap: 0.85rem; cursor: pointer; font-size: 0.95rem; color: #475569; font-weight: 800; }
        .custom-checkbox { width: 22px; height: 22px; accent-color: #0D9488; border-radius: 6px; }
        .table-row-hover:hover { background-color: #F0FDFA !important; }
        .action-btn:hover { color: #0D9488 !important; border-color: #0D9488 !important; background-color: #F0FDFA !important; transform: scale(1.05); }
        .page-nav-btn:hover { transform: scale(1.2); color: #0D9488 !important; }
        
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 768px) {
          .page-header { flex-direction: column !items: flex-start; gap: 1.5rem; }
          .action-buttons { width: 100%; }
          .action-buttons button { width: 100%; justify-content: center; }
          .search-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Branches;
