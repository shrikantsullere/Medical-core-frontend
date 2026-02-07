import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Plus, Search } from 'lucide-react';

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy Data
  const branches = [
    { id: 1, name: 'Principal - Santo Domingo', address: 'Av. Winston Churchill', phone: '809-555-0001' },
    { id: 2, name: 'Santiago - Norte', address: 'Calle del Sol', phone: '809-555-0002' },
    { id: 3, name: 'Punta Cana - East', address: 'Bulevar Turístico', phone: '809-555-0003' },
  ];

  const filteredBranches = branches.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2 className="page-title">Branches</h2>
        <button className="btn-continue" onClick={() => alert('New Branch modal')}>
          <Plus size={18} />
          NEW BRANCH
        </button>
      </div>

      <div className="card" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={18} />
          <input
            type="text"
            placeholder="Search branches..."
            className="custom-input"
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Branch Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Address</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Phone</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch) => (
                <tr key={branch.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '1rem', fontWeight: '600', color: '#1F2937' }}>{branch.name}</td>
                  <td style={{ padding: '1rem', color: '#6B7280' }}>{branch.address}</td>
                  <td style={{ padding: '1rem', color: '#6B7280' }}>{branch.phone}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button style={{ color: '#F28C28', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Branches;
