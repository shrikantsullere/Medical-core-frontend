import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, UserPlus, Download, ArrowLeft, RotateCcw, Check, Plus, FileSpreadsheet, X } from 'lucide-react';

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
    asset: true,
    printSignature: false,
    printStamp: false
  });

  const [linkedDoctors, setLinkedDoctors] = useState([]);
  const [assignedRoles, setAssignedRoles] = useState([]);

  const navigate = useNavigate();

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
    alert('Synchronizing Personnel Data: ' + JSON.stringify(finalData));
    setView('list');
  };

  const handleNewEmployee = () => {
    setFormData({
      name: '', lastName: '', email: '', pin: '',
      appointmentView1: '', appointmentView2: '',
      representative: false, asset: true,
      printSignature: false, printStamp: false
    });
    setLinkedDoctors([]);
    setAssignedRoles([]);
    setView('add');
  };

  const renderListView = () => (
    <div className="employees-list-view" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h2 className="page-title" style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.025em' }}>Staff <span style={{ color: '#0D9488' }}>Intelligence</span></h2>
          <p style={{ color: '#64748B', margin: '0.5rem 0 0', fontSize: '1.1rem', fontWeight: '500' }}>Manage clinical personnel, access permissions, and operational hierarchies.</p>
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => navigate('/upload-excel')} style={{ height: '52px', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
            <FileSpreadsheet size={20} /> BATCH TRANSFER
          </button>
          <button className="btn-primary" onClick={handleNewEmployee} style={{ height: '52px', padding: '0 2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '900', borderRadius: '14px' }}>
            <UserPlus size={22} /> ONBOARD STAFF
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '2.5rem', marginBottom: '3rem', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)' }}>
        <div style={{ position: 'relative', maxWidth: '700px' }}>
          <label style={{ position: 'absolute', top: '-11px', left: '16px', backgroundColor: '#0D9488', color: 'white', padding: '0 12px', fontSize: '0.75rem', fontWeight: '900', borderRadius: '6px', zIndex: 1, letterSpacing: '0.1em' }}>UNIVERSAL SEARCH</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input type="text" className="custom-input" placeholder="Search by name, email identity, or staff ID..." style={{ width: '100%', paddingLeft: '3rem', height: '56px', fontSize: '1rem' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <Search size={22} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <button className="btn-secondary" style={{ width: '56px', height: '56px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }} title="Synchronize Directory">
              <Download size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
        <div className="maint-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>PERSONNEL IDENTITY</th>
                <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>ELECTRONIC MAIL</th>
                <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>LAST SYNCHRONIZATION</th>
                <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em' }}>OPERATIONAL STATE</th>
                <th style={{ padding: '1.5rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.05em', width: '160px' }}>MANAGEMENT</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: 'Juan Perez', email: 'juan.perez@medcore.com', activity: 'Today, 10:24 AM', status: 'Active' },
                { id: 2, name: 'Maria Garcia', email: 'm.garcia@medcore.com', activity: 'Yesterday', status: 'Active' },
                { id: 3, name: 'Carlos Rodriguez', email: 'c.rod@medcore.com', activity: 'Feb 08, 2026', status: 'Inactive' },
                { id: 4, name: 'Ana Martinez', email: 'ana.m@medcore.com', activity: 'Today, 09:15 AM', status: 'Active' },
                { id: 5, name: 'Luis Hernandez', email: 'l.hernandez@medcore.com', activity: 'Feb 05, 2026', status: 'Active' },
              ].filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase())).map((emp, idx) => (
                <tr key={emp.id} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: idx % 2 === 0 ? 'white' : '#F9FAFB', transition: 'all 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '18px', background: 'linear-gradient(135deg, #0D9488 0%, #065F46 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: '900', boxShadow: '0 8px 16px rgba(13, 148, 136, 0.2)' }}>
                        {emp.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: '900', color: '#1E293B', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{emp.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', marginTop: '0.2rem' }}>ID: EMP-{emp.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', color: '#64748B', fontSize: '1rem', fontWeight: '700' }}>{emp.email}</td>
                  <td style={{ padding: '1.5rem 2rem', color: '#94A3B8', fontSize: '0.9rem', fontWeight: '600' }}>{emp.activity}</td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                    <span style={{
                      backgroundColor: emp.status === 'Active' ? '#F0FDFA' : '#FEF2F2',
                      color: emp.status === 'Active' ? '#0D9488' : '#EF4444',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '100px',
                      fontSize: '0.75rem',
                      fontWeight: '900',
                      letterSpacing: '0.05em',
                      border: '1.5px solid currentColor'
                    }}>
                      {emp.status === 'Active' ? 'OPERATIONAL' : 'OFFLINE'}
                    </span>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                      <button onClick={() => setView('add')} title="Configure Protocol" style={{ background: 'none', border: '1.5px solid #E2E8F0', color: '#64748B', cursor: 'pointer', padding: '0.6rem', borderRadius: '12px', transition: 'all 0.2s' }} className="action-btn">
                        <Plus size={20} />
                      </button>
                      <button title="Execute Audit" style={{ background: 'none', border: '1.5px solid #E2E8F0', color: '#64748B', cursor: 'pointer', padding: '0.6rem', borderRadius: '12px', transition: 'all 0.2s' }} className="action-btn">
                        <Search size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceView = () => (
    <div className="maintenance-container" style={{ maxWidth: '1400px', margin: '0 auto', animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button onClick={() => setView('list')} style={{ backgroundColor: 'white', border: '1.5px solid #E2E8F0', width: '52px', height: '52px', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', transition: 'all 0.2s' }} className="back-link">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1E293B', margin: 0, letterSpacing: '-0.025em' }}>Staff <span style={{ color: '#0D9488' }}>Credentials</span></h2>
            <p style={{ color: '#64748B', margin: '0.5rem 0 0', fontSize: '1.1rem', fontWeight: '500' }}>Comprehensive management of organizational access and personnel matrix.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ height: '52px', padding: '0 1.5rem', fontWeight: '700' }} onClick={() => alert('Security override protocol initialized...')}>
            <RotateCcw size={20} /> RESET AUTHENTICATION
          </button>
          <button className="btn-primary" style={{ height: '52px', padding: '0 2.5rem', fontWeight: '900', borderRadius: '14px' }} onClick={handleSave}>
            <Check size={24} /> SYNCHRONIZE DATA
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '3.5rem', marginBottom: '3rem', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#1E293B', marginBottom: '3.5rem', fontWeight: '900', borderBottom: '2px solid #F1F5F9', paddingBottom: '1.5rem', letterSpacing: '-0.01em' }}>IDENTITY & <span style={{ color: '#0D9488' }}>SECURITY MATRIX</span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="form-group-row">
              <label className="required">GIVEN NAME:</label>
              <input type="text" name="name" className="custom-input" value={formData.name} onChange={handleInputChange} placeholder="Required Field" />
            </div>
            <div className="form-group-row">
              <label className="required">LEGAL SURNAME:</label>
              <input type="text" name="lastName" className="custom-input" value={formData.lastName} onChange={handleInputChange} placeholder="Required Field" />
            </div>
            <div className="form-group-row">
              <label className="required">SECURE EMAIL:</label>
              <input type="email" name="email" className="custom-input" value={formData.email} onChange={handleInputChange} placeholder="staff.identity@medcore.com" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="form-group-row">
              <label>SYSTEM PIN:</label>
              <div style={{ position: 'relative', flex: 1 }}>
                <input type="text" name="pin" className="custom-input disabled" value={formData.pin} readOnly placeholder="ENCRYPTED" style={{ backgroundColor: '#F8FAFC', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '0.1em' }} />
                <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', color: '#94A3B8', fontWeight: '900' }}>READ-ONLY</span>
              </div>
            </div>
            <div className="form-group-row">
              <label>VISIBILITY SCHEMA:</label>
              <div style={{ display: 'flex', gap: '1.25rem', flex: 1 }}>
                <select name="appointmentView1" className="custom-select" value={formData.appointmentView1} onChange={handleInputChange} style={{ fontWeight: '700' }}>
                  <option value="">Primary Filter...</option>
                </select>
                <select name="appointmentView2" className="custom-select" value={formData.appointmentView2} onChange={handleInputChange} style={{ fontWeight: '700' }}>
                  <option value="">Secondary Filter...</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '3.5rem', marginTop: '0.5rem', paddingLeft: '280px' }}>
              <label className="checkbox-standard">
                <input type="checkbox" name="representative" checked={formData.representative} onChange={handleInputChange} className="custom-checkbox" /> SALES REP
              </label>
              <label className="checkbox-active">
                <input type="checkbox" name="asset" checked={formData.asset} onChange={handleInputChange} className="custom-checkbox" /> ACTIVE PERSONNEL
              </label>
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.4rem', color: '#1E293B', marginTop: '6rem', marginBottom: '3.5rem', fontWeight: '900', borderBottom: '2px solid #F1F5F9', paddingBottom: '1.5rem', letterSpacing: '-0.01em' }}>VALIDATION & <span style={{ color: '#0D9488' }}>SIGNATURES</span></h3>
        <div style={{ maxWidth: '700px' }}>
          <div className="form-group-row" style={{ alignItems: 'flex-start' }}>
            <label>DIGITAL ASSETS:</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
              <button className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', borderStyle: 'dashed', borderWidth: '2.5px', padding: '1.75rem', borderRadius: '20px', fontSize: '0.95rem', fontWeight: '900' }}>
                <Plus size={24} /> UPLOAD VERIFIED BIOMETRIC SIGNATURE / STAMP
              </button>
              <div style={{ display: 'flex', gap: '3.5rem' }}>
                <label className="checkbox-standard">
                  <input type="checkbox" name="printSignature" checked={formData.printSignature} onChange={handleInputChange} className="custom-checkbox" /> PRINT SIGNATURE
                </label>
                <label className="checkbox-standard">
                  <input type="checkbox" name="printStamp" checked={formData.printStamp} onChange={handleInputChange} className="custom-checkbox" /> PRINT STAMP
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', marginBottom: '6rem' }}>
        <div className="card" style={{ padding: '2.5rem', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#1E293B', margin: 0, fontWeight: '900', letterSpacing: '-0.01em' }}>ASSOCIATED <span style={{ color: '#0D9488' }}>PRACTITIONERS</span></h3>
            <button className="btn-primary" style={{ height: '40px', padding: '0 1.25rem', fontSize: '0.8rem', fontWeight: '900', borderRadius: '100px' }} onClick={addDoctorRow}>
              <Plus size={18} /> LINK DOCTOR
            </button>
          </div>
          <div className="maint-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                  <th style={{ padding: '1.25rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.05em' }}>DOCTOR IDENTITY</th>
                  <th style={{ padding: '1.25rem', textAlign: 'center', fontSize: '0.85rem', width: '120px', fontWeight: '800', letterSpacing: '0.05em' }}>REVOKE</th>
                </tr>
              </thead>
              <tbody>
                {linkedDoctors.length === 0 ? (
                  <tr>
                    <td colSpan="2" style={{ padding: '5rem 1.25rem', textAlign: 'center', color: '#94A3B8', fontSize: '1rem', fontWeight: '600' }}>No practitioners currently associated.</td>
                  </tr>
                ) : (
                  linkedDoctors.map(doctor => (
                    <tr key={doctor.id} style={{ borderBottom: '1px solid #F1F5F9' }} className="table-row-hover">
                      <td style={{ padding: '1.25rem' }}>
                        <select className="custom-select" value={doctor.doctorId} onChange={(e) => handleDoctorChange(doctor.id, e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', fontWeight: '900', fontSize: '1.05rem', color: '#1E293B' }}>
                          <option value="">Choosing a doctor...</option>
                          <option value="1">Dr. Juan Perez</option>
                          <option value="2">Dra. Maria Garcia</option>
                        </select>
                      </td>
                      <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                        <button style={{ background: 'none', border: '1.5px solid #F1F5F9', color: '#EF4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '10px' }} onClick={() => removeDoctorRow(doctor.id)} className="action-btn-danger">
                          <X size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ padding: '2.5rem', border: '1px solid #E2E8F0', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#1E293B', margin: 0, fontWeight: '900', letterSpacing: '-0.01em' }}>ASSIGNED <span style={{ color: '#0D9488' }}>ROLES</span></h3>
            <button className="btn-primary" style={{ height: '40px', padding: '0 1.25rem', fontSize: '0.8rem', fontWeight: '900', borderRadius: '100px' }} onClick={addRoleRow}>
              <Plus size={18} /> ADD ROLE
            </button>
          </div>
          <div className="maint-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                  <th style={{ padding: '1.25rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.05em' }}>ROLE IDENTITY</th>
                  <th style={{ padding: '1.25rem', textAlign: 'center', fontSize: '0.85rem', width: '120px', fontWeight: '800', letterSpacing: '0.05em' }}>REVOKE</th>
                </tr>
              </thead>
              <tbody>
                {assignedRoles.length === 0 ? (
                  <tr>
                    <td colSpan="2" style={{ padding: '5rem 1.25rem', textAlign: 'center', color: '#94A3B8', fontSize: '1rem', fontWeight: '600' }}>No administrative roles assigned.</td>
                  </tr>
                ) : (
                  assignedRoles.map(role => (
                    <tr key={role.id} style={{ borderBottom: '1px solid #F1F5F9' }} className="table-row-hover">
                      <td style={{ padding: '1.25rem' }}>
                        <select className="custom-select" value={role.roleId} onChange={(e) => handleRoleChange(role.id, e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', fontWeight: '900', fontSize: '1.05rem', color: '#1E293B' }}>
                          <option value="">Choosing a role...</option>
                          <option value="1">System Administrator</option>
                          <option value="2">Clinical Receptionist</option>
                        </select>
                      </td>
                      <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                        <button style={{ background: 'none', border: '1.5px solid #F1F5F9', color: '#EF4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '10px' }} onClick={() => removeRoleRow(role.id)} className="action-btn-danger">
                          <X size={20} />
                        </button>
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
  );

  return (
    <DashboardLayout>
      {view === 'list' ? renderListView() : renderMaintenanceView()}
      <style>{`
        .form-group-row { display: flex; align-items: center; gap: 2.5rem; min-height: 56px; }
        .form-group-row label { width: 280px; text-align: right; font-size: 0.85rem; font-weight: 900; color: #64748B; letter-spacing: 0.1em; }
        .form-group-row label.required:after { content: '*'; color: #0D9488; margin-left: 8px; }
        
        .custom-input, .custom-select { flex: 1; padding: 0.85rem 1.5rem; border: 1.5px solid #E2E8F0; border-radius: 14px; font-size: 1rem; font-weight: 900; color: #1E293B; outline: none; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-input:focus, .custom-select:focus { border-color: #0D9488; box-shadow: 0 0 0 5px rgba(13, 148, 136, 0.1); transform: translateY(-1px); }
        .custom-input::placeholder { color: #CBD5E1; font-weight: 500; }
        
        .checkbox-standard { display: flex; align-items: center; gap: 0.85rem; cursor: pointer; font-size: 0.95rem; color: #475569; font-weight: 900; }
        .checkbox-active { display: flex; align-items: center; gap: 0.85rem; cursor: pointer; font-size: 0.95rem; color: #0D9488; font-weight: 900; }
        .custom-checkbox { width: 22px; height: 22px; accent-color: #0D9488; border-radius: 6px; }
        
        .table-row-hover:hover { background-color: #F0FDFA !important; }
        .action-btn:hover { color: #0D9488 !important; border-color: #0D9488 !important; background-color: #F0FDFA !important; transform: scale(1.1); }
        .action-btn-danger:hover { color: #EF4444 !important; border-color: #EF4444 !important; background-color: #FEF2F2 !important; transform: scale(1.1); }
        .back-link:hover { transform: translateX(-5px); color: #0D9488 !important; border-color: #0D9488 !important; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 1024px) {
          .form-group-row { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .form-group-row label { width: 100%; text-align: left; }
          .maintenance-container { padding: 0 1.5rem; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Employees;
