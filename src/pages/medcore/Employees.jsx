import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, UserPlus, Download, Undo, RotateCcw, Check, Plus } from 'lucide-react';

const Employees = () => {
  const [view, setView] = useState('list'); // 'list' | 'add'
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    pin: '',
    appointmentView1: '',
    appointmentView2: '',
    representative: false,
    asset: false,
    printSignature: false,
    printStamp: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    alert('Saving Employee: ' + JSON.stringify(formData));
    setView('list');
  };

  const handleNewEmployee = () => {
    setFormData({
      name: '', lastName: '', email: '', pin: '',
      appointmentView1: '', appointmentView2: '',
      representative: false, asset: false,
      printSignature: false, printStamp: false
    });
    setView('add');
  };

  return (
    <DashboardLayout>
      {view === 'list' && (
        <>
          <div className="page-header bordered">
            <div>
              <h2 className="page-title">List of Employees</h2>
              <span style={{ fontSize: '0.8rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1rem' }}>📄</span> List of Employees
              </span>
            </div>
            <button className="btn-new-doctor" onClick={handleNewEmployee}>
              <UserPlus size={16} />
              NEW EMPLOYEE
            </button>
          </div>

          <div className="card" style={{ padding: '2rem', minHeight: '500px', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <div className="search-container">
              <label className="search-label">LOOK FOR:</label>
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Look for"
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="search-icons">
                  <button className="search-icon-btn" title="Search">
                    <Search size={20} strokeWidth={2.5} />
                  </button>
                  <button className="search-icon-btn" title="Export/Download">
                    <Download size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            <div className="empty-state">
              No existe información para mostrar
            </div>
          </div>
        </>
      )}

      {view === 'add' && (
        <div style={{ backgroundColor: 'white', padding: '1rem', minHeight: '100%' }}>
          {/* Maintenance Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Employee Maintenance</h2>
              <span style={{ fontSize: '0.8rem', color: '#555' }}>Add an Employee</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setView('list')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', color: '#F28C28', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase' }}>
                <Undo size={14} /> GO BACK
              </button>
              <button onClick={handleNewEmployee} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', color: '#F28C28', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase' }}>
                <UserPlus size={14} /> NEW EMPLOYEE
              </button>
              <button onClick={() => alert('Reset Password!')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', color: '#F28C28', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase' }}>
                <RotateCcw size={14} /> RESET PASSWORD
              </button>
              <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#F28C28', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '0.75rem', padding: '0.4rem 0.8rem', borderRadius: '2px', cursor: 'pointer', textTransform: 'uppercase' }}>
                <Check size={14} /> KEEP
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div style={{ maxWidth: '800px' }}>
            {/* Field Row */}
            <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#D32F2F' }}>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ flex: 1, border: '1px solid #ccc', padding: '0.4rem', borderRadius: '2px' }} />
            </div>

            <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#D32F2F' }}>Last name:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={{ flex: 1, border: '1px solid #ccc', padding: '0.4rem', borderRadius: '2px' }} />
            </div>

            <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#D32F2F' }}>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="me@ejemplo.com" style={{ flex: 1, border: '1px solid #ccc', padding: '0.4rem', borderRadius: '2px' }} />
            </div>

            <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#333' }}>PIN:</label>
              <input type="text" name="pin" value={formData.pin} onChange={handleInputChange} disabled style={{ flex: 1, border: '1px solid #eee', backgroundColor: '#f5f5f5', padding: '0.4rem', borderRadius: '2px', height: '30px' }} />
            </div>

            <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#333' }}>Appointment view:</label>
              <div style={{ flex: 1, display: 'flex', gap: '1rem' }}>
                <select name="appointmentView1" value={formData.appointmentView1} onChange={handleInputChange} style={{ flex: 1, border: '1px solid #ccc', padding: '0.4rem' }}><option value="">Select...</option></select>
                <select name="appointmentView2" value={formData.appointmentView2} onChange={handleInputChange} style={{ flex: 1, border: '1px solid #ccc', padding: '0.4rem' }}><option value="">Select...</option></select>
              </div>
            </div>

            <div style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#333' }}>Representative:</label>
              <input type="checkbox" name="representative" checked={formData.representative} onChange={handleInputChange} />
            </div>

            <div style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#333' }}>Asset:</label>
              <input type="checkbox" name="asset" checked={formData.asset} onChange={handleInputChange} />
            </div>

            <div style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#333' }}>Digital Signature and Seal:</label>
              <button onClick={() => alert('View/Add Signature')} style={{ backgroundColor: '#F28C28', color: 'white', border: 'none', padding: '0.3rem 1rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>VIEW / ADD +</button>
            </div>

            <div style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#333' }}>Print Signature:</label>
              <input type="checkbox" name="printSignature" checked={formData.printSignature} onChange={handleInputChange} />
            </div>

            <div style={{ display: 'flex', marginBottom: '2rem', alignItems: 'center' }}>
              <label style={{ width: '180px', textAlign: 'right', paddingRight: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#333' }}>Print Stamp:</label>
              <input type="checkbox" name="printStamp" checked={formData.printStamp} onChange={handleInputChange} />
            </div>
          </div>

          {/* Sub Sections */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ backgroundColor: '#0B3B3C', color: 'white', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>Doctor</span>
              <button onClick={() => alert('Add Doctor Link')} style={{ backgroundColor: '#F28C28', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', cursor: 'pointer' }}>+ ADD</button>
            </div>
            <div style={{ padding: '2rem', textAlign: 'center', border: '1px solid #eee', color: '#ccc' }}>No doctors linked</div>
          </div>

          <div>
            <div style={{ backgroundColor: '#0B3B3C', color: 'white', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>Role</span>
              <button onClick={() => alert('Add Role')} style={{ backgroundColor: '#F28C28', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', cursor: 'pointer' }}>+ ADD</button>
            </div>
            <div style={{ padding: '2rem', textAlign: 'center', border: '1px solid #eee', color: '#ccc' }}>No roles assigned</div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Employees;
