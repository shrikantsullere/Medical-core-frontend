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
      alert(`Role "${roleName}" saved!`);
      handleCloseModal();
    } else {
      alert('Please enter a role name.');
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header bordered" style={{ alignItems: 'flex-end', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
        <div>
          <h2 className="page-title">Role Maintenance</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
            <CreditCard size={14} color="#666" />
            <span style={{ fontSize: '0.8rem', color: '#666' }}>Role Creation</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button
            onClick={() => alert('Remove Role clicked')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#EA580C', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}
          >
            <X size={14} strokeWidth={3} />
            REMOVE ROLE
          </button>
          <button
            onClick={handleOpenModal}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#F28C28', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}
          >
            <Plus size={14} strokeWidth={3} />
            NEW ROLE
          </button>
          <button
            onClick={() => alert('Changes Saved!')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#F28C28', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}
          >
            <Check size={14} strokeWidth={3} />
            KEEP
          </button>
        </div>
      </div>

      {/* Content Area - Empty as shown in screenshot */}
      <div style={{ padding: '0 2rem' }}>
        {/* Content would go here */}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'baseline',
          paddingTop: '100px',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            width: '90%',
            maxWidth: '600px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              backgroundColor: '#F28C28',
              padding: '0.8rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1rem' }}>
                <User size={18} fill="white" />
                Add Roles
              </div>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex' }}>
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem 1.5rem', paddingBottom: '3rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem' }}>
                Role name:
              </label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Name of the role to add"
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '2px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1rem',
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1.5rem',
              alignItems: 'center'
            }}>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#555',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <X size={14} color="#F28C28" strokeWidth={3} />
                CLOSE
              </button>
              <button
                onClick={handleKeep}
                style={{
                  backgroundColor: '#F28C28',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textTransform: 'uppercase'
                }}
              >
                <Check size={14} strokeWidth={3} />
                KEEP
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Roles;
