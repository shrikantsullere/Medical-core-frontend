import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, UserPlus, Download, ArrowLeft, RotateCcw, Check, Plus, FileText, FileSpreadsheet } from 'lucide-react';

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

  const [linkedDoctors, setLinkedDoctors] = useState([]);
  const [assignedRoles, setAssignedRoles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addDoctorRow = () => {
    setLinkedDoctors([...linkedDoctors, { id: Date.now(), doctorId: '' }]);
  };

  const addRoleRow = () => {
    setAssignedRoles([...assignedRoles, { id: Date.now(), roleId: '' }]);
  };

  const removeDoctorRow = (id) => {
    setLinkedDoctors(linkedDoctors.filter(d => d.id !== id));
  };

  const removeRoleRow = (id) => {
    setAssignedRoles(assignedRoles.filter(r => r.id !== id));
  };

  const handleDoctorChange = (id, value) => {
    setLinkedDoctors(linkedDoctors.map(d => d.id === id ? { ...d, doctorId: value } : d));
  };

  const handleRoleChange = (id, value) => {
    setAssignedRoles(assignedRoles.map(r => r.id === id ? { ...r, roleId: value } : r));
  };

  const handleSave = () => {
    const finalData = { ...formData, linkedDoctors, assignedRoles };
    alert('Saving Employee: ' + JSON.stringify(finalData));
    setView('list');
  };

  const handleNewEmployee = () => {
    setFormData({
      name: '', lastName: '', email: '', pin: '',
      appointmentView1: '', appointmentView2: '',
      representative: false, asset: false,
      printSignature: false, printStamp: false
    });
    setLinkedDoctors([]);
    setAssignedRoles([]);
    setView('add');
  };

  return (
    <DashboardLayout>
      {view === 'list' && (
        <>
          <div className="page-header bordered">
            <div className="title-section">
              <h2 className="page-title">List of Employees</h2>
              <span className="breadcrumb-sub">
                <FileText size={16} /> List of Employees
              </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-upload-text" onClick={() => window.location.href = '/medcore/upload-excel'}>
                <FileSpreadsheet size={16} /> UPLOAD EXCEL
              </button>
              <button className="btn-new-doctor" onClick={handleNewEmployee}>
                <UserPlus size={16} />
                NEW EMPLOYEE
              </button>
            </div>
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
                  <button className="search-icon-btn" title="Upload from Excel" onClick={() => window.location.href = '/medcore/upload-excel'}>
                    <FileSpreadsheet size={20} strokeWidth={2.5} />
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
        <div className="maintenance-view">
          <div className="maint-header">
            <div className="maint-title-group">
              <h2 className="maint-title">Employee Maintenance</h2>
              <span className="maint-subtitle">Add an Employee</span>
            </div>
            <div className="maint-actions">
              <button className="maint-btn-text" onClick={() => setView('list')}>
                <ArrowLeft size={14} /> GO BACK
              </button>
              <button className="maint-btn-text" onClick={handleNewEmployee}>
                <UserPlus size={14} /> NEW EMPLOYEE
              </button>
              <button className="maint-btn-text" onClick={() => alert('Reset Password!')}>
                <RotateCcw size={14} /> RESET PASSWORD
              </button>
              <button className="maint-btn-primary" onClick={handleSave}>
                <Check size={14} /> KEEP
              </button>
            </div>
          </div>

          <div className="maint-form-content">
            <div className="form-grid">
              <div className="form-row">
                <label className="required-label">Name:</label>
                <div className="input-col">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="maint-input" />
                </div>
              </div>

              <div className="form-row">
                <label className="required-label">Last name:</label>
                <div className="input-col">
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="maint-input" />
                </div>
              </div>

              <div className="form-row">
                <label className="required-label">Email:</label>
                <div className="input-col">
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="me@ejemplo.com" className="maint-input" />
                </div>
              </div>

              <div className="form-row">
                <label>PIN:</label>
                <div className="input-col">
                  <input type="text" name="pin" value={formData.pin} onChange={handleInputChange} disabled className="maint-input disabled" />
                </div>
              </div>

              <div className="form-row">
                <label>Appointment view:</label>
                <div className="input-col split-inputs">
                  <select name="appointmentView1" value={formData.appointmentView1} onChange={handleInputChange} className="maint-select">
                    <option value="">Choosing an insurance company ...</option>
                  </select>
                  <select name="appointmentView2" value={formData.appointmentView2} onChange={handleInputChange} className="maint-select">
                    <option value="">Choosing an insurance company ...</option>
                  </select>
                </div>
              </div>

              <div className="form-row checkbox-row">
                <label>Representative:</label>
                <div className="input-col">
                  <input type="checkbox" name="representative" checked={formData.representative} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row checkbox-row">
                <label>Asset:</label>
                <div className="input-col">
                  <input type="checkbox" name="asset" checked={formData.asset} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <label>Digital Signature and Seal:</label>
                <div className="input-col horizontal-group">
                  <button className="btn-view-add" onClick={() => alert('View/Add Signature')}>VIEW / ADD +</button>
                  <div className="checkbox-group">
                    <label><input type="checkbox" name="printSignature" checked={formData.printSignature} onChange={handleInputChange} /> Print Signature</label>
                    <label><input type="checkbox" name="printStamp" checked={formData.printStamp} onChange={handleInputChange} /> Print Stamp</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="sub-sections-container">
              <div className="maint-sub-section">
                <div className="section-header-bar">
                  <span>Doctor</span>
                  <button className="btn-add-section" onClick={addDoctorRow}>+ ADD</button>
                </div>
                <div className="section-content-table">
                  <table className="maint-inner-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th style={{ width: '50px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {linkedDoctors.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="empty-table-msg">No existe información para mostrar</td>
                        </tr>
                      ) : (
                        linkedDoctors.map(doctor => (
                          <tr key={doctor.id}>
                            <td>
                              <select
                                className="table-select-clean"
                                value={doctor.doctorId}
                                onChange={(e) => handleDoctorChange(doctor.id, e.target.value)}
                              >
                                <option value="">Choosing a doctor...</option>
                                <option value="1">Dr. Juan Perez</option>
                                <option value="2">Dra. Maria Garcia</option>
                              </select>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button className="btn-remove-row" onClick={() => removeDoctorRow(doctor.id)}>×</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="maint-sub-section">
                <div className="section-header-bar">
                  <span>Role</span>
                  <button className="btn-add-section" onClick={addRoleRow}>+ ADD</button>
                </div>
                <div className="section-content-table">
                  <table className="maint-inner-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th style={{ width: '50px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedRoles.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="empty-table-msg">No existe información para mostrar</td>
                        </tr>
                      ) : (
                        assignedRoles.map(role => (
                          <tr key={role.id}>
                            <td>
                              <select
                                className="table-select-clean"
                                value={role.roleId}
                                onChange={(e) => handleRoleChange(role.id, e.target.value)}
                              >
                                <option value="">Choosing a role...</option>
                                <option value="1">Admin</option>
                                <option value="2">Receptionist</option>
                              </select>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button className="btn-remove-row" onClick={() => removeRoleRow(role.id)}>×</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .breadcrumb-sub { font-size: 0.8rem; color: #666; display: flex; align-items: center; gap: 0.5rem; margin-top: 0.3rem; }
        .maint-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; border-bottom: 1.5px solid #F28C28; padding-bottom: 0.8rem; flex-wrap: wrap; gap: 1rem; }
        .btn-upload-text { background: none; border: none; color: #F28C28; font-weight: 700; font-size: 0.95rem; cursor: pointer; text-transform: uppercase; display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem; transition: opacity 0.2s; }
        .btn-upload-text:hover { opacity: 0.8; }
        .maint-title { font-size: 1.5rem; color: #1F2937; margin: 0; font-weight: 600; }
        .maint-subtitle { font-size: 0.85rem; color: #6B7280; }
        .maint-actions { display: flex; gap: 1.2rem; align-items: center; flex-wrap: wrap; }
        .maint-btn-text { background: none; border: none; color: #F28C28; font-weight: 700; font-size: 0.75rem; cursor: pointer; text-transform: uppercase; display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem; transition: opacity 0.2s; }
        .maint-btn-text:hover { opacity: 0.8; }
        .maint-btn-primary { background-color: #F28C28; border: none; color: white; font-weight: 700; font-size: 0.75rem; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; text-transform: uppercase; display: flex; align-items: center; gap: 0.4rem; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .maint-form-content { max-width: 900px; }
        .form-row { display: flex; margin-bottom: 1.2rem; align-items: center; min-height: 40px; }
        .form-row label { width: 220px; text-align: right; padding-right: 2rem; font-size: 0.85rem; font-weight: 700; color: #374151; }
        .form-row label.required-label { color: #DC2626; }
        .input-col { flex: 1; display: flex; align-items: center; }
        .maint-input, .maint-select { width: 100%; border: 1px solid #D1D5DB; padding: 0.5rem 0.8rem; border-radius: 4px; font-size: 0.9rem; outline: none; transition: border-color 0.2s; }
        .maint-input:focus, .maint-select:focus { border-color: #F28C28; }
        .maint-input.disabled { background-color: #F9FAFB; border-color: #E5E7EB; color: #9CA3AF; cursor: not-allowed; }
        .split-inputs { gap: 1rem; }
        .horizontal-group { gap: 2rem; }
        .btn-view-add { background-color: #F8A359; color: white; border: none; padding: 0.4rem 1.2rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; cursor: pointer; text-transform: uppercase; }
        .checkbox-group { display: flex; gap: 1.5rem; }
        .checkbox-group label { width: auto; font-weight: 600; font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .sub-sections-container { margin-top: 3rem; display: grid; gap: 2.5rem; }
        .section-header-bar { background-color: #0B3B3C; color: white; padding: 0.6rem 1.2rem; display: flex; justify-content: space-between; align-items: center; border-radius: 4px 4px 0 0; font-weight: 700; font-size: 0.9rem; }
        .btn-add-section { background-color: #F8A359; border: none; color: white; font-size: 0.7rem; font-weight: 800; padding: 0.3rem 0.8rem; border-radius: 2px; cursor: pointer; transition: background 0.2s; }
        .btn-add-section:hover { background-color: #f28c28; }
        .section-content-table { border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 4px 4px; overflow: hidden; }
        .maint-inner-table { width: 100%; border-collapse: collapse; background-color: white; }
        .maint-inner-table th { background-color: #F9FAFB; border-bottom: 2px solid #E5E7EB; padding: 0.8rem 1.2rem; text-align: left; font-size: 0.75rem; color: #4B5563; text-transform: uppercase; letter-spacing: 0.025em; }
        .maint-inner-table td { padding: 0.6rem 1.2rem; border-bottom: 1px solid #F1F5F9; }
        .empty-table-msg { text-align: center; color: #9CA3AF; padding: 2.5rem !important; font-size: 0.95rem; font-style: italic; }
        .table-select-clean { width: 100%; border: none; background: none; font-size: 0.9rem; color: #4B5563; padding: 0.4rem 0; outline: none; }
        .btn-remove-row { background: none; border: none; color: #EF4444; font-size: 1.5rem; cursor: pointer; line-height: 1; padding: 0 0.5rem; transition: transform 0.1s; }
        .btn-remove-row:hover { transform: scale(1.2); }
        @media (max-width: 768px) {
          .form-row { flex-direction: column; align-items: flex-start; gap: 0.4rem; height: auto; }
          .form-row label { width: 100%; text-align: left; padding-right: 0; }
          .horizontal-group { flex-direction: column; align-items: flex-start; gap: 1rem; width: 100%; }
          .split-inputs { flex-direction: column; width: 100%; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Employees;
