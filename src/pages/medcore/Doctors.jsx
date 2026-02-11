import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, UserPlus, Download, RotateCcw, Check, ArrowLeft, Plus, FileText, FileSpreadsheet } from 'lucide-react';

const Doctors = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // 'list' or 'maintenance'
  const [activeTab, setActiveTab] = useState('General Profile');
  const [ncfTab, setNcfTab] = useState('NCF Types');
  const [ncfView, setNcfView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = ['General Profile', 'Time', 'NCF'];

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    genre: 'Masculine',
    birthdate: '',
    idType: 'Cédula',
    documentNo: '',
    executed: '',
    country: 'República Dominicana',
    province: '',
    sector: '',
    address: '',
    telephone: '',
    phoneType: 'Mobile',
    email: '',
    specialty: '',
    defaultFees: '',
    visitDuration: 'Importar de centro medico',
    colorInAgenda: '#0D9488',
    idUniversal: '',
    printSignature: false,
    printStamp: false,
    asset: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const renderGeneralProfile = () => (
    <div style={{ flex: 1, animation: 'fadeIn 0.4s ease-out' }}>
      <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#1E293B', marginBottom: '2.5rem', fontWeight: '800', borderBottom: '2px solid #F1F5F9', paddingBottom: '1rem', letterSpacing: '-0.02em' }}>
          PRIMARY <span style={{ color: '#0D9488' }}>PRACTITIONER DATA</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group-row">
              <label className="required">LEGAL NAME:</label>
              <input type="text" name="name" className="custom-input" value={formData.name} onChange={handleInputChange} placeholder="First Name" style={{ width: '100%' }} />
            </div>
            <div className="form-group-row">
              <label className="required">SURNAME:</label>
              <input type="text" name="lastName" className="custom-input" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" style={{ width: '100%' }} />
            </div>
            <div className="form-group-row">
              <label className="required">BIOLOGICAL GENRE:</label>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.85rem', color: '#475569', fontWeight: '700' }}>
                  <input type="radio" name="genre" value="Masculine" checked={formData.genre === 'Masculine'} onChange={handleInputChange} style={{ width: '18px', height: '18px', accentColor: '#0D9488' }} /> MASCULINE
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.85rem', color: '#475569', fontWeight: '700' }}>
                  <input type="radio" name="genre" value="Female" checked={formData.genre === 'Female'} onChange={handleInputChange} style={{ width: '18px', height: '18px', accentColor: '#0D9488' }} /> FEMALE
                </label>
              </div>
            </div>
            <div className="form-group-row">
              <label>DATE OF BIRTH:</label>
              <input type="date" name="birthdate" className="custom-input" value={formData.birthdate} onChange={handleInputChange} style={{ width: '100%' }} />
            </div>
            <div className="form-group-row">
              <label>GOV IDENTIFICATION:</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <select name="idType" className="custom-select" value={formData.idType} onChange={handleInputChange} style={{ width: '140px' }}>
                  <option value="Cédula">ID CARD (CED)</option>
                  <option value="Pasaporte">PASSPORT</option>
                </select>
                <input type="text" name="documentNo" className="custom-input" value={formData.documentNo} onChange={handleInputChange} placeholder="000-0000000-0" style={{ flex: 1 }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group-row">
              <label>MEDICAL SPECIALTY:</label>
              <select name="specialty" className="custom-select" value={formData.specialty} onChange={handleInputChange} style={{ width: '100%' }}>
                <option value="">Select Specialty...</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General Medicine">General Medicine</option>
              </select>
            </div>
            <div className="form-group-row">
              <label>EMAIL ADDRESS:</label>
              <input type="email" name="email" className="custom-input" value={formData.email} onChange={handleInputChange} placeholder="doctor.name@clinic.com" style={{ width: '100%' }} />
            </div>
            <div className="form-group-row">
              <label>CONTACT PHONE:</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input type="text" name="telephone" className="custom-input" value={formData.telephone} onChange={handleInputChange} placeholder="809-000-0000" style={{ flex: 1 }} />
                <select name="phoneType" className="custom-select" value={formData.phoneType} onChange={handleInputChange} style={{ width: '120px' }}>
                  <option value="Mobile">MOBILE</option>
                  <option value="Office">OFFICE</option>
                </select>
              </div>
            </div>
            <div className="form-group-row">
              <label>CALENDAR COLOR:</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="color" name="colorInAgenda" value={formData.colorInAgenda} onChange={handleInputChange} style={{ width: '50px', height: '50px', border: '2px solid #E2E8F0', borderRadius: '12px', cursor: 'pointer', padding: '2px', backgroundColor: 'white' }} />
                <span style={{ fontSize: '0.85rem', color: '#1E293B', fontWeight: '800', fontFamily: 'monospace' }}>{formData.colorInAgenda.toUpperCase()}</span>
              </div>
            </div>
            <div className="form-group-row">
              <label>ACCOUNT STATUS:</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem', color: '#0D9488' }}>
                <input type="checkbox" name="asset" checked={formData.asset} onChange={handleInputChange} style={{ width: '20px', height: '20px', accentColor: '#0D9488' }} /> ACTIVE RECRUITMENT
              </label>
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.25rem', color: '#1E293B', marginTop: '4rem', marginBottom: '2.5rem', fontWeight: '800', borderBottom: '2px solid #F1F5F9', paddingBottom: '1rem', letterSpacing: '-0.02em' }}>
          LOCALIZATION & <span style={{ color: '#0D9488' }}>SIGNATURES</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group-row">
              <label>PRACTICE ADDRESS:</label>
              <textarea name="address" className="custom-input" style={{ height: '100px', padding: '1rem', width: '100%', resize: 'none', lineHeight: '1.6' }} value={formData.address} onChange={handleInputChange} placeholder="Enter the full physical location of the doctor's practice..." />
            </div>
            <div className="form-group-row">
              <label>REGIONAL PROVINCE:</label>
              <select name="province" className="custom-select" value={formData.province} onChange={handleInputChange} style={{ width: '100%' }}>
                <option value="">Select Province...</option>
                <option value="Santo Domingo">Santo Domingo</option>
                <option value="Santiago">Santiago</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group-row">
              <label>VALIDATION ASSETS:</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <button className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', borderStyle: 'dashed', borderWidth: '2px', padding: '1rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                  <Plus size={20} /> UPLOAD DIGITAL SIGNATURE / STAMP
                </button>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.8rem', color: '#475569', fontWeight: '700' }}>
                    <input type="checkbox" name="printSignature" checked={formData.printSignature} onChange={handleInputChange} style={{ width: '18px', height: '18px', accentColor: '#0D9488' }} /> PRINT SIGNATURE
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.8rem', color: '#475569', fontWeight: '700' }}>
                    <input type="checkbox" name="printStamp" checked={formData.printStamp} onChange={handleInputChange} style={{ width: '18px', height: '18px', accentColor: '#0D9488' }} /> PRINT STAMP
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '4rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#1E293B', margin: 0, fontWeight: '800' }}>MONITORING PROGRAMS</h3>
            <button style={{ backgroundColor: '#F0FDFA', color: '#0D9488', border: '1px solid currentColor', padding: '0.4rem 1rem', borderRadius: '100px', fontWeight: '800', fontSize: '0.7rem', cursor: 'pointer' }}>
              <Plus size={14} style={{ marginRight: '4px' }} /> ENROLL
            </button>
          </div>
          <div className="maint-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600' }}>PROGRAM NAME</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600' }}>CURRENT STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="2" style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem', fontWeight: '500' }}>No monitoring programs currently assigned.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#1E293B', margin: 0, fontWeight: '800' }}>SYSTEM PERMISSIONS</h3>
            <button style={{ backgroundColor: '#F0FDFA', color: '#0D9488', border: '1px solid currentColor', padding: '0.4rem 1rem', borderRadius: '100px', fontWeight: '800', fontSize: '0.7rem', cursor: 'pointer' }}>
              <Plus size={14} style={{ marginRight: '4px' }} /> ASSIGN ROLE
            </button>
          </div>
          <div className="maint-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600' }}>ROLE IDENTITY</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.8rem', width: '80px', fontWeight: '600' }}>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  <td style={{ padding: '1.25rem', fontSize: '0.9rem', color: '#1E293B', fontWeight: '700' }}>DOCTOR_ROLE</td>
                  <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                    <button style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', opacity: 0.7 }} className="hover-opacity-100"><Check size={20} style={{ transform: 'rotate(45deg)' }} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNCFTypes = () => {
    if (ncfView === 'create') {
      return (
        <div style={{ padding: '2.5rem', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#1E293B', margin: 0, fontWeight: '800' }}>CREATE <span style={{ color: '#0D9488' }}>NCF TYPE</span></h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setNcfView('list')}>DISCARD</button>
              <button className="btn-primary"><Check size={18} /> SAVE NCF TYPE</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="filter-group">
              <label className="filter-label">REGULATORY CODE</label>
              <input type="text" className="custom-input" placeholder="e.g., B01" style={{ width: '100%' }} />
            </div>
            <div className="filter-group">
              <label className="filter-label">DESCRIPTION / IDENTITY</label>
              <input type="text" className="custom-input" placeholder="e.g., Factura de Crédito Fiscal" style={{ width: '100%' }} />
            </div>
            <div className="filter-group">
              <label className="filter-label">DOCUMENT CATEGORY</label>
              <select className="custom-select" style={{ width: '100%' }}>
                <option value="">Select Category...</option>
                <option value="Invoice">Medical Invoice</option>
                <option value="Receipt">Payment Receipt</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2.5rem', padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: '800', fontSize: '0.8rem', color: '#475569' }}>
              <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#0D9488' }} /> SEQUENTIAL GENERATION
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: '800', fontSize: '0.8rem', color: '#475569' }}>
              <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#0D9488' }} /> EXPIRATION TRACKING
            </label>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', color: '#1E293B', margin: 0, fontWeight: '800' }}>NCF Classifications</h3>
            <p style={{ margin: '0.25rem 0 0', color: '#64748B', fontSize: '0.9rem' }}>Government-regulated tax receipt schemas and configurations.</p>
          </div>
          <button className="btn-primary" onClick={() => setNcfView('create')}>
            <Plus size={18} /> DEFINE NEW TYPE
          </button>
        </div>

        <div className="maint-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem' }}>NCF CODE</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem' }}>NAME / DESCRIPTION</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem' }}>DOC TYPE</th>
                <th style={{ padding: '1.25rem', textAlign: 'center', fontWeight: '600', fontSize: '0.85rem' }}>SEQUENTIAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" style={{ padding: '5rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', color: '#94A3B8' }}>
                    <FileText size={64} style={{ opacity: 0.1 }} />
                    <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>No NCF types have been defined for this practitioner.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderNCFSequences = () => {
    if (ncfView === 'create') {
      return (
        <div style={{ padding: '2.5rem', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#1E293B', margin: 0, fontWeight: '800' }}>ACTIVATE <span style={{ color: '#0D9488' }}>NCF SEQUENCE</span></h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setNcfView('list')}>CANCEL</button>
              <button className="btn-primary"><Check size={18} /> CONFIRM ACTIVATION</button>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '600px' }}>
            <div className="filter-group">
              <label className="filter-label">TARGET NCF CLASSIFICATION</label>
              <select className="custom-select" style={{ width: '100%' }}>
                <option value="">Choosing an NCF Type...</option>
                <option value="1">B01 - Crédito Fiscal</option>
                <option value="2">B02 - Consumo</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="filter-group">
                <label className="filter-label">STARTING INDEX</label>
                <input type="text" className="custom-input" placeholder="00000001" style={{ width: '100%', fontFamily: 'monospace', fontWeight: '700' }} />
              </div>
              <div className="filter-group">
                <label className="filter-label">TERMINAL INDEX</label>
                <input type="text" className="custom-input" placeholder="00010000" style={{ width: '100%', fontFamily: 'monospace', fontWeight: '700' }} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', color: '#1E293B', margin: 0, fontWeight: '800' }}>Active Sequences</h3>
            <p style={{ margin: '0.25rem 0 0', color: '#64748B', fontSize: '0.9rem' }}>Live allocation tracking for NCF number ranges.</p>
          </div>
          <button className="btn-primary" onClick={() => setNcfView('create')}>
            <Plus size={18} /> GENERATE RANGE
          </button>
        </div>

        <div className="maint-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem' }}>NCF TYPE</th>
                <th style={{ padding: '1.25rem', textAlign: 'center', fontWeight: '600', fontSize: '0.85rem' }}>NEXT IN LINE</th>
                <th style={{ padding: '1.25rem', textAlign: 'center', fontWeight: '600', fontSize: '0.85rem' }}>AVAILABILITY</th>
                <th style={{ padding: '1.25rem', textAlign: 'right', fontWeight: '600', fontSize: '0.85rem' }}>EXPIRATION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" style={{ padding: '5rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', color: '#94A3B8' }}>
                    <RotateCcw size={64} style={{ opacity: 0.1 }} />
                    <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>No active tax sequences found for this practitioner.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderNCFTab = () => (
    <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', backgroundColor: '#0B3B3C', padding: '0.5rem' }}>
        <div
          onClick={() => { setNcfTab('NCF Types'); setNcfView('list'); }}
          style={{
            padding: '0.75rem 1.5rem',
            color: ncfTab === 'NCF Types' ? 'white' : 'rgba(255,255,255,0.6)',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer',
            backgroundColor: ncfTab === 'NCF Types' ? 'rgba(255,255,255,0.1)' : 'transparent',
            borderRadius: '8px',
            transition: 'all 0.2s'
          }}
        >
          NCF Types
        </div>
        <div
          onClick={() => { setNcfTab('NCF sequences'); setNcfView('list'); }}
          style={{
            padding: '0.75rem 1.5rem',
            color: ncfTab === 'NCF sequences' ? 'white' : 'rgba(255,255,255,0.6)',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer',
            backgroundColor: ncfTab === 'NCF sequences' ? 'rgba(255,255,255,0.1)' : 'transparent',
            borderRadius: '8px',
            transition: 'all 0.2s',
            marginLeft: '0.5rem'
          }}
        >
          NCF Sequences
        </div>
      </div>
      {ncfTab === 'NCF Types' ? renderNCFTypes() : renderNCFSequences()}
    </div>
  );

  const renderMaintenanceView = () => (
    <div className="maintenance-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => setView('list')} style={{ backgroundColor: 'white', border: '1px solid #E2E8F0', padding: '0.6rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', transition: 'all 0.2s' }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1E293B', margin: 0 }}>Practitioner <span style={{ color: '#0D9488' }}>Profile</span></h2>
            <p style={{ color: '#64748B', margin: '0.25rem 0 0', fontSize: '0.9rem', fontWeight: '500' }}>Comprehensive management of clinical credentials and operational settings.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ padding: '0.85rem 1.5rem' }}>
            <RotateCcw size={18} /> RESET PASSWORD
          </button>
          <button className="btn-primary" style={{ padding: '0.85rem 2.5rem' }}>
            <Check size={20} /> COMMIT CHANGES
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '3rem' }} className="maint-layout">
        <div style={{ width: '300px', flexShrink: 0 }}>
          <div className="card" style={{ padding: '1rem', position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab;
              return (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '1.25rem 1.75rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '900',
                    color: isActive ? 'white' : '#64748B',
                    backgroundColor: isActive ? '#0D9488' : 'transparent',
                    borderRadius: '16px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isActive ? '0 10px 15px -3px rgba(13, 148, 136, 0.15)' : 'none',
                    transform: isActive ? 'translateX(5px)' : 'none'
                  }}
                >
                  <span>{tab.toUpperCase()}</span>
                  {isActive && <Check size={18} />}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {activeTab === 'General Profile' && renderGeneralProfile()}
          {activeTab === 'Time' && (
            <div className="card" style={{ padding: '5rem 3rem', textAlign: 'center', animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ backgroundColor: '#F0FDFA', width: '100px', height: '100px', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', border: '1px solid #CCFBF1', transform: 'rotate(-5deg)' }}>
                <RotateCcw size={48} color="#0D9488" />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: '#1E293B', fontWeight: '800', letterSpacing: '-0.02em' }}>Calendar <span style={{ color: '#0D9488' }}>Orchestration</span></h3>
              <p style={{ color: '#64748B', maxWidth: '550px', margin: '1rem auto 2.5rem', lineHeight: '1.8', fontSize: '1rem', fontWeight: '500' }}>Synchronize clinical availability, consultation cadences, and automated scheduling logic for high-efficiency patient flow.</p>
              <button className="btn-primary" style={{ padding: '1rem 3rem' }}>LOAD CALENDAR ENGINE</button>
            </div>
          )}
          {activeTab === 'NCF' && renderNCFTab()}
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="doctors-list-view" style={{ padding: '2rem' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h2 className="page-title" style={{ margin: 0, fontSize: '2rem', fontWeight: '800', color: '#1E293B' }}>Doctor <span style={{ color: '#0D9488' }}>Management</span></h2>
          <p style={{ color: '#64748B', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>Maintain professional medical staff, specialties, and clinical permissions.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => navigate('/upload-excel')}>
            <FileSpreadsheet size={18} /> CARRY DATA
          </button>
          <button className="btn-primary" onClick={() => setView('maintenance')}>
            <UserPlus size={18} /> NEW DOCTOR ENTRY
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ maxWidth: '600px' }}>
          <div className="filter-group">
            <label className="filter-label">SEARCH PRACTITIONERS</label>
            <div style={{ position: 'relative' }}>
              <input type="text" className="custom-input" placeholder="Search by name, specialty, or identification number..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', paddingLeft: '2.5rem' }} />
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="maint-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem' }}>PRACTITIONER IDENTITY</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem' }}>SPECIALIZATION</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem' }}>IDENTIFICATION</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem' }}>CONTACT INFO</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1.25rem', textAlign: 'center', fontWeight: '600', fontSize: '0.85rem', width: '100px' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: 'Dr. Juan Perez', specialty: 'Cardiology', iden: '001-0000000-1', phone: '809-555-0101', status: 'Active' },
                { id: 2, name: 'Dra. Maria Garcia', specialty: 'Pediatrics', iden: '001-0000000-2', phone: '809-555-0102', status: 'Active' },
                { id: 3, name: 'Dr. Carlos Rodriguez', specialty: 'General Medicine', iden: '001-0000000-3', phone: '809-555-0103', status: 'On Leave' },
                { id: 4, name: 'Dra. Ana Martinez', specialty: 'Dermatology', iden: '001-0000000-4', phone: '809-555-0104', status: 'Active' },
                { id: 5, name: 'Dr. Luis Hernandez', specialty: 'Neurology', iden: '001-0000000-5', phone: '809-555-0105', status: 'Active' },
              ].filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())).map((doc, idx) => (
                <tr key={doc.id} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: idx % 2 === 0 ? 'white' : '#F9FAFB' }}>
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', boxShadow: '0 4px 6px -1px rgba(13, 148, 136, 0.2)' }}>
                        {doc.name.split(' ').filter(n => !n.includes('.')).map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '0.95rem' }}>{doc.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem' }}>
                    <span style={{ backgroundColor: '#F0FDFA', color: '#0D9488', padding: '0.3rem 0.8rem', borderRadius: '4px', fontWeight: '800', fontSize: '0.7rem', border: '1px solid currentColor' }}>{doc.specialty.toUpperCase()}</span>
                  </td>
                  <td style={{ padding: '1.25rem', color: '#64748B', fontSize: '0.85rem', fontWeight: '600' }}>{doc.iden}</td>
                  <td style={{ padding: '1.25rem', color: '#64748B', fontSize: '0.85rem', fontWeight: '600' }}>{doc.phone}</td>
                  <td style={{ padding: '1.25rem' }}>
                    <span style={{
                      backgroundColor: doc.status === 'Active' ? '#F0FDFA' : '#FFFBEB',
                      color: doc.status === 'Active' ? '#0D9488' : '#D97706',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '100px',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      border: '1px solid currentColor'
                    }}>
                      {doc.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                      <button onClick={() => setView('maintenance')} style={{ background: 'none', border: 'none', color: '#0D9488', cursor: 'pointer', opacity: 0.6 }} className="hover-opacity-100">
                        <UserPlus size={20} />
                      </button>
                      <button style={{ background: 'none', border: 'none', color: '#0D9488', cursor: 'pointer', opacity: 0.6 }} className="hover-opacity-100">
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

  return (
    <DashboardLayout>
      {view === 'list' ? renderListView() : renderMaintenanceView()}
      <style>{`
        .filter-label { display: block; fontSize: 0.75rem; fontWeight: 800; color: #64748B; marginBottom: 0.5rem; letterSpacing: 0.05em; }
        .custom-input, .custom-select { padding: 0.6rem 0.8rem; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 0.9rem; outline: none; transition: all 0.2s; }
        .custom-input:focus, .custom-select:focus { border-color: #0D9488; box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1); }
        .required::after { content: " *"; color: #EF4444; }
        .form-group-row { display: grid; grid-template-columns: 140px 1fr; gap: 1rem; align-items: center; }
        .form-group-row label { font-size: 0.85rem; fontWeight: 700; color: #475569; }
        .hover-opacity-100:hover { opacity: 1 !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 768px) {
          .form-group-row { grid-template-columns: 1fr; gap: 0.5rem; }
          .specialty-pill-container { flex-direction: column !important; }
          .form-grid-stack { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Doctors;
