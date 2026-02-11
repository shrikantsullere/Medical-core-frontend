import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { X, Plus, Check, User, CreditCard } from 'lucide-react';

const Roles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleName, setRoleName] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoleName('');
  };

  const handleKeep = () => {
    if (roleName.trim()) {
      alert(`Access Protocol "${roleName}" established in the master grid!`);
      handleCloseModal();
    } else {
      alert('Initialization failure: Identity protocol requires a valid architectural descriptor.');
    }
  };

  return (
    <DashboardLayout>
      <div className="roles-page" style={{ padding: '2rem 3rem', animation: 'fadeIn 0.4s ease-out' }}>
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 className="page-title" style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.025em' }}>Access <span style={{ color: '#0D9488' }}>Architect</span></h2>
            <p style={{ color: '#64748B', margin: '0.5rem 0 0', fontSize: '1.1rem', fontWeight: '500' }}>Define operational protocols and authorization hierarchies for systemic personnel.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <button className="btn-secondary" style={{ color: '#EF4444', height: '52px', padding: '0 1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => alert('Revocation protocol initiated across all nodes...')}>
              <X size={20} /> REVOKE PROTOCOL
            </button>
            <button className="btn-primary" onClick={handleOpenModal} style={{ height: '52px', padding: '0 2.5rem', fontWeight: '900', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Plus size={22} /> DEFINE NEW ROLE
            </button>
          </div>
        </div>

        <div className="card" style={{ overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
          <div className="maint-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>AUTHORIZATION IDENTITY</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>OPERATIONAL SCOPE</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>ACCESS TOKEN</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>ACTIVE PERSONNEL</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'right', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em', width: '200px' }}>MANAGEMENT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'System Administrator', desc: 'Unrestricted environmental access and systemic configuration control.', perms: 'ALL_ACCESS', users: 3 },
                  { id: 2, name: 'Clinical Practitioner', desc: 'Secure patient management, EMR synchronization, and pharmacy protocols.', perms: 'MEDICAL_ACCESS', users: 12 },
                  { id: 3, name: 'Administrative Secretary', desc: 'Scheduling architecture and fiscal billing gateway oversight.', perms: 'SCHEDULING_VIEW', users: 5 },
                  { id: 4, name: 'Nursing Supervisor', desc: 'Patient telemetry synchronization and limited clinical assistance.', perms: 'CLINICAL_LIMITED', users: 8 },
                  { id: 5, name: 'Financial Auditor', desc: 'Comprehensive fiscal reporting and revenue cycle management.', perms: 'FINANCIAL_READ', users: 2 },
                ].map((role, idx) => (
                  <tr key={role.id} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: idx % 2 === 0 ? 'white' : '#F9FAFB', transition: 'all 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '1.5rem 2rem' }}>
                      <div style={{ fontWeight: '900', color: '#1E293B', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{role.name}</div>
                    </td>
                    <td style={{ padding: '1.5rem 2rem', color: '#64748B', fontSize: '0.95rem', fontWeight: '500', maxWidth: '400px', lineHeight: '1.5' }}>{role.desc}</td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                      <span style={{ backgroundColor: '#F0FDFA', color: '#0D9488', padding: '0.5rem 1.25rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.05em', border: '1.5px solid currentColor', display: 'inline-block' }}>
                        {role.perms}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: '#1E293B', fontWeight: '900', fontSize: '1rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                          <User size={18} color="#0D9488" />
                        </div>
                        {role.users} Members
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button style={{ background: 'none', border: '1.5px solid #E2E8F0', color: '#64748B', cursor: 'pointer', padding: '0.6rem', borderRadius: '12px', transition: 'all 0.2s' }} className="action-btn"><Plus size={20} /></button>
                        <button style={{ background: 'none', border: '1.5px solid #E2E8F0', color: '#EF4444', cursor: 'pointer', padding: '0.6rem', borderRadius: '12px', transition: 'all 0.2s' }} className="action-btn-danger"><X size={20} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
          <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '600px', boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5)', borderRadius: '32px', overflow: 'hidden', animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ backgroundColor: '#0B3B3C', padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                  <CreditCard size={28} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900', letterSpacing: '-0.02em' }}>Protocol Definition</h3>
                  <p style={{ margin: '0.3rem 0 0', opacity: 0.7, fontSize: '0.95rem', fontWeight: '500' }}>Initialize new identity authorization schema.</p>
                </div>
              </div>
              <button onClick={handleCloseModal} style={{ background: 'white', border: 'none', cursor: 'pointer', color: '#0B3B3C', width: '44px', height: '44px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} className="action-btn">
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '3.5rem' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Architectural Descriptor</label>
                <input
                  type="text"
                  className="custom-input"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g. Lead Medical Informatics Chief"
                  style={{ width: '100%', height: '64px', fontSize: '1.2rem', padding: '0 1.75rem', borderRadius: '16px' }}
                  autoFocus
                />
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '1.75rem', borderRadius: '20px', border: '1.5px solid #E2E8F0', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ color: '#0D9488', backgroundColor: '#F0FDFA', padding: '0.5rem', borderRadius: '10px' }}>
                  <Check size={24} />
                </div>
                <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: '1.6', margin: 0, fontWeight: '600' }}>
                  Define a unique architectural identifier. Granular functional permissions can be mapped once the protocol is synchronized with the master maintenance grid.
                </p>
              </div>
            </div>

            <div style={{ padding: '2.5rem 3.5rem', backgroundColor: '#F8FAFC', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end', gap: '1.25rem' }}>
              <button onClick={handleCloseModal} style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: '14px', height: '52px', padding: '0 2rem', fontWeight: '800', color: '#64748B', cursor: 'pointer', transition: 'all 0.2s' }} className="back-link">
                TERMINATE
              </button>
              <button onClick={handleKeep} className="btn-primary" style={{ height: '52px', padding: '0 3rem', fontWeight: '900', borderRadius: '14px', boxShadow: '0 10px 15px -3px rgba(13, 148, 136, 0.3)' }}>
                ESTABLISH PROTOCOL
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(50px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .custom-input { border: 1.5px solid #E2E8F0; border-radius: 12px; font-weight: 900; color: #1E293B; outline: none; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-input:focus { border-color: #0D9488; box-shadow: 0 0 0 5px rgba(13, 148, 136, 0.1); transform: translateY(-1px); }
        .custom-input::placeholder { color: #CBD5E1; font-weight: 500; }

        .table-row-hover:hover td { background-color: #F0FDFA !important; cursor: default; }
        
        .action-btn:hover { color: #0D9488 !important; border-color: #0D9488 !important; background-color: #F0FDFA !important; transform: scale(1.1) rotate(5deg); }
        .action-btn-danger:hover { color: #EF4444 !important; border-color: #EF4444 !important; background-color: #FEF2F2 !important; transform: scale(1.1) rotate(-5deg); }
        .back-link:hover { transform: translateX(-5px); color: #0D9488 !important; border-color: #0D9488 !important; }
        
        @media (max-width: 768px) {
          .page-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .action-buttons { width: 100%; }
          .action-buttons button { width: 100%; justify-content: center; }
          .roles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Roles;
