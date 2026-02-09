import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, UserPlus, Download, RotateCcw, Check, ArrowLeft, Plus, FileText, FileSpreadsheet } from 'lucide-react';

const Doctors = () => {
  const [view, setView] = useState('list'); // 'list' or 'maintenance'
  const [activeTab, setActiveTab] = useState('General Profile');
  const [ncfTab, setNcfTab] = useState('NCF Types');
  const [ncfView, setNcfView] = useState('list');

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
    colorInAgenda: '',
    idUniversal: '',
    printSignature: false,
    printStamp: false,
    asset: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const renderGeneralProfile = () => (
    <div style={{ flex: 1 }}>
      <div className="form-grid" style={{ display: 'grid', gap: '1rem' }}>
        <div className="form-row">
          <label className="required">Name:</label>
          <input type="text" name="name" className="maint-input" value={formData.name} onChange={handleInputChange} placeholder="Enter Name" />
        </div>

        <div className="form-row">
          <label className="required">Last name:</label>
          <input type="text" name="lastName" className="maint-input" value={formData.lastName} onChange={handleInputChange} placeholder="Enter your last name" />
        </div>

        <div className="form-row">
          <label className="required">Genre:</label>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <input type="radio" name="genre" value="Masculine" checked={formData.genre === 'Masculine'} onChange={handleInputChange} /> Masculine
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <input type="radio" name="genre" value="Female" checked={formData.genre === 'Female'} onChange={handleInputChange} /> Female
            </label>
          </div>
        </div>

        <div className="form-row">
          <label>Birthdate:</label>
          <div style={{ position: 'relative', width: '200px' }}>
            <input type="date" name="birthdate" className="maint-input" value={formData.birthdate} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <label>Type of Identification:</label>
          <select name="idType" className="maint-select" value={formData.idType} onChange={handleInputChange}>
            <option value="Cédula">Cédula</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="RNC">RNC</option>
          </select>
        </div>

        <div className="form-row">
          <label className="required">Document No.:</label>
          <input type="text" name="documentNo" className="maint-input required-input" value={formData.documentNo} onChange={handleInputChange} placeholder="___-_______-_" />
        </div>

        <div className="form-row">
          <label>Executed:</label>
          <input type="text" name="executed" className="maint-input" value={formData.executed} onChange={handleInputChange} />
        </div>

        <div style={{ borderTop: '1px solid #E5E7EB', margin: '1rem 0' }}></div>

        <div className="form-row">
          <label>Country:</label>
          <select name="country" className="maint-select" value={formData.country} onChange={handleInputChange}>
            <option value="República Dominicana">República Dominicana</option>
            <option value="USA">USA</option>
            <option value="Spain">Spain</option>
          </select>
        </div>

        <div className="form-row">
          <label>Province:</label>
          <select name="province" className="maint-select" value={formData.province} onChange={handleInputChange}>
            <option value="">Choosing a province...</option>
            <option value="Santo Domingo">Santo Domingo</option>
            <option value="Santiago">Santiago</option>
          </select>
        </div>

        <div className="form-row">
          <label>Sector:</label>
          <select name="sector" className="maint-select" value={formData.sector} onChange={handleInputChange}>
            <option value="">Choosing a sector...</option>
          </select>
        </div>

        <div className="form-row">
          <label>Address:</label>
          <textarea name="address" className="maint-input" style={{ height: '60px', padding: '0.5rem' }} value={formData.address} onChange={handleInputChange} placeholder="Enter the Address" />
        </div>

        <div className="form-row">
          <label>Telephone:</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input type="text" name="telephone" className="maint-input" style={{ width: '200px' }} value={formData.telephone} onChange={handleInputChange} placeholder="___-_______-_" />
            <select name="phoneType" className="maint-select" style={{ width: '100px' }} value={formData.phoneType} onChange={handleInputChange}>
              <option value="Mobile">Mobile</option>
              <option value="Office">Office</option>
            </select>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #E5E7EB', margin: '1rem 0' }}></div>

        <div className="form-row">
          <label className="required">Email:</label>
          <input type="email" name="email" className="maint-input required-input" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" />
        </div>

        <div className="form-row">
          <label>Specialty:</label>
          <select name="specialty" className="maint-select" value={formData.specialty} onChange={handleInputChange}>
            <option value="">Choosing a specialty...</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
        </div>

        <div className="form-row">
          <label>Default fees:</label>
          <input type="text" name="defaultFees" className="maint-input" style={{ width: '120px' }} value={formData.defaultFees} onChange={handleInputChange} placeholder="Percentage%" />
        </div>

        <div className="form-row">
          <label>Visit Duration (minutes):</label>
          <select name="visitDuration" className="maint-select" value={formData.visitDuration} onChange={handleInputChange}>
            <option value="Importar de centro medico">Importar de centro medico</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
          </select>
        </div>

        <div className="form-row">
          <label>Color in Agenda:</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select name="colorInAgenda" className="maint-select" value={formData.colorInAgenda} onChange={handleInputChange}>
              <option value="">Select Color</option>
              <option value="#F28C28">Orange</option>
              <option value="#3B82F6">Blue</option>
            </select>
            <div style={{ width: '60px', height: '34px', backgroundColor: formData.colorInAgenda || '#FFF', border: '1px solid #E5E7EB', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div className="form-row">
          <label>Id Universal:</label>
          <input type="text" name="idUniversal" className="maint-input" value={formData.idUniversal} onChange={handleInputChange} placeholder="Enter the Universal ID" />
        </div>

        <div className="form-row">
          <label>Digital Signature and Seal:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button className="btn-action secondary" style={{ backgroundColor: '#F8A359', color: 'white', border: 'none' }}>VIEW / ADD +</button>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              Print Signature <input type="checkbox" name="printSignature" checked={formData.printSignature} onChange={handleInputChange} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              Print Stamp <input type="checkbox" name="printStamp" checked={formData.printStamp} onChange={handleInputChange} />
            </label>
          </div>
        </div>

        <div className="form-row">
          <label>Asset:</label>
          <input type="checkbox" name="asset" checked={formData.asset} onChange={handleInputChange} />
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '500', marginBottom: '1rem', color: '#1F2937' }}>Monitoring programs</h3>
        <div className="maint-table-container">
          <table className="maint-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Name</th>
                <th style={{ width: '30%' }}>State</th>
                <th style={{ width: '30%' }}>Services</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select className="table-select"><option>Choose a program ...</option></select>
                </td>
                <td></td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-add-table"><Plus size={14} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '2rem', marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '500', marginBottom: '1rem', color: '#1F2937' }}>Roles</h3>
        <div className="maint-table-container">
          <table className="maint-table">
            <thead>
              <tr>
                <th style={{ width: '100%' }}>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select className="table-select"><option>Choosing a role...</option></select>
                </td>
              </tr>
              <tr style={{ borderTop: 'none' }}>
                <td style={{ textAlign: 'right', padding: '0.5rem' }}>
                  <button className="btn-add-table"><Plus size={14} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderNCFTypes = () => {
    if (ncfView === 'create') {
      return (
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#1F2937', margin: 0 }}>Type NCF</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button className="btn-cancel" onClick={() => setNcfView('list')}>CANCEL</button>
              <button className="btn-keep"><Check size={16} /> KEEP</button>
            </div>
          </div>
          <div className="form-grid" style={{ display: 'grid', gap: '1.2rem', maxWidth: '500px' }}>
            <div className="form-row">
              <label>Code:</label>
              <input type="text" className="maint-input" placeholder="NCF Code" />
            </div>
            <div className="form-row">
              <label>Name:</label>
              <input type="text" className="maint-input" placeholder="NCF Name" />
            </div>
            <div className="form-row">
              <label>Document type:</label>
              <select className="maint-select">
                <option value=""></option>
              </select>
            </div>
            <div className="form-row">
              <label>Sequential:</label>
              <input type="text" className="maint-input" />
            </div>
            <div className="form-row">
              <label>Expire:</label>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#1F2937', margin: 0 }}>Types of NCF</h3>
          <button className="btn-new-ncf" onClick={() => setNcfView('create')}>
            <Plus size={16} color="#F28C28" /> NEW TYPE OF NCF
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
          <FileText size={16} /> List of NCF types
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label className="search-label" style={{ backgroundColor: '#F28C28', color: 'white', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '2px 2px 0 0' }}>LOOK FOR:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input type="text" placeholder="Look for" style={{ width: '300px', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '0 2px 2px 2px' }} />
            <Search size={20} color="#F28C28" />
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748B', fontSize: '1.2rem' }}>
          There is no information to display.
        </div>
      </div>
    );
  };

  const renderNCFSequences = () => {
    if (ncfView === 'create') {
      return (
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#1F2937', margin: 0 }}>NCF Sequence</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button className="btn-cancel" onClick={() => setNcfView('list')}>CANCEL</button>
              <button className="btn-keep"><Check size={16} /> KEEP</button>
            </div>
          </div>
          <div className="form-grid" style={{ display: 'grid', gap: '1.2rem', maxWidth: '500px' }}>
            <div className="form-row">
              <label>NCF Type:</label>
              <select className="maint-select">
                <option value=""></option>
              </select>
            </div>
            <div className="form-row">
              <label>Range:</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" className="maint-input" placeholder="From" style={{ maxWidth: '100px' }} />
                <input type="text" className="maint-input" placeholder="Until" style={{ maxWidth: '100px' }} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#1F2937', margin: 0 }}>NCF sequences</h3>
          <button className="btn-new-ncf" onClick={() => setNcfView('create')}>
            <Plus size={16} color="#F28C28" /> NEW NCF SEQUENCE
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
          <FileText size={16} /> NCF sequence list
        </div>

        <div className="maint-table-container">
          <table className="maint-table">
            <thead>
              <tr>
                <th>Type NCF</th>
                <th>Next NCF Available</th>
                <th>Available NCF Quantity</th>
                <th>Date of creation</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderNCFTab = () => (
    <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '4px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
      <div style={{ display: 'flex', backgroundColor: '#139487' }}>
        <div
          onClick={() => { setNcfTab('NCF Types'); setNcfView('list'); }}
          style={{
            padding: '0.8rem 1.5rem',
            color: 'white',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            backgroundColor: ncfTab === 'NCF Types' ? 'rgba(255,255,255,0.1)' : 'transparent',
            borderRight: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          NCF Types
        </div>
        <div
          onClick={() => { setNcfTab('NCF sequences'); setNcfView('list'); }}
          style={{
            padding: '0.8rem 1.5rem',
            color: 'white',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            backgroundColor: ncfTab === 'NCF sequences' ? 'rgba(255,255,255,0.1)' : 'transparent'
          }}
        >
          NCF sequences
        </div>
      </div>
      {ncfTab === 'NCF Types' ? renderNCFTypes() : renderNCFSequences()}
    </div>
  );

  const renderMaintenanceView = () => (
    <div className="maintenance-container">
      <div className="page-header bordered" style={{ paddingBottom: '1rem', borderBottom: '2px solid #E5E7EB' }}>
        <h2 className="page-title" style={{ fontSize: '1.4rem', color: '#1F2937' }}>Doctor Maintenance</h2>
        <div className="action-buttons">
          <button className="btn-action secondary" onClick={() => setView('list')}>
            <ArrowLeft size={16} /> GO BACK
          </button>
          <button className="btn-action secondary">
            <UserPlus size={16} /> NEW DOCTOR
          </button>
          <button className="btn-action secondary">
            <RotateCcw size={16} /> RESET PASSWORD
          </button>
          <button className="btn-action primary">
            <Check size={16} /> KEEP
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }} className="maint-layout">
        <div style={{ width: '220px', flexShrink: 0 }} className="maint-sidebar">
          <div style={{ backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
            {tabs.map(tab => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1rem 1.5rem',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: activeTab === tab ? 'white' : '#64748B',
                  backgroundColor: activeTab === tab ? '#F28C28' : 'transparent',
                  borderBottom: '1px solid #F1F5F9',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                {tab}
                {activeTab === tab && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    borderRight: '10px solid white'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        {activeTab === 'General Profile' && renderGeneralProfile()}
        {activeTab === 'Time' && <div style={{ flex: 1, padding: '2rem', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #E5E7EB' }}>Time Management Settings</div>}
        {activeTab === 'NCF' && renderNCFTab()}
      </div>

      <style>{`
        .maintenance-container { max-width: 1200px; margin: 0 auto; }
        .form-row { display: flex; align-items: center; gap: 1.5rem; min-height: 42px; }
        .form-row label { width: 200px; text-align: right; font-size: 0.85rem; font-weight: 600; color: #4B5563; }
        .form-row label.required { color: #DC2626; }
        .maint-input, .maint-select { flex: 1; padding: 0.5rem 0.8rem; border: 1px solid #D1D5DB; border-radius: 4px; font-size: 0.9rem; outline: none; transition: border-color 0.2s; }
        .maint-input:focus, .maint-select:focus { border-color: #F28C28; }
        .required-input { border-color: #FCA5A5; }
        .btn-action { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 4px; font-weight: 700; font-size: 0.75rem; cursor: pointer; text-transform: uppercase; transition: all 0.2s; }
        .btn-action.primary { background-color: #F28C28; color: white; border: none; }
        .btn-action.secondary { background-color: transparent; color: #F28C28; border: none; }
        .btn-action:hover { filter: brightness(0.95); }
        .btn-upload-text { background: none; border: none; color: #F28C28; font-weight: 700; font-size: 0.9rem; cursor: pointer; text-transform: uppercase; display: flex; align-items: center; gap: 0.5rem; transition: opacity 0.2s; }
        .btn-upload-text:hover { opacity: 0.8; }
        .btn-cancel { background: none; border: none; color: #64748B; font-weight: 700; font-size: 0.8rem; cursor: pointer; }
        .btn-keep { background-color: #F28C28; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-weight: 700; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .btn-new-ncf { background: none; border: none; color: #1F2937; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .maint-table-container { background-color: white; border: 1px solid #E5E7EB; border-radius: 4px; overflow: hidden; }
        .maint-table { width: 100%; border-collapse: collapse; }
        .maint-table th { background-color: #0B3B3C; color: white; text-align: left; padding: 0.8rem 1rem; font-size: 0.8rem; font-weight: 600; }
        .maint-table td { padding: 0.8rem 1rem; border-top: 1px solid #F1F5F9; }
        .table-select { width: 100%; border: none; background: none; font-size: 0.85rem; color: #64748B; outline: none; }
        .btn-add-table { background-color: #F8A359; color: white; border: none; padding: 4px; border-radius: 2px; cursor: pointer; }
        @media (max-width: 768px) {
          .maint-layout { flex-direction: column; }
          .maint-sidebar { width: 100% !important; }
          .form-row { flex-direction: column; align-items: flex-start; gap: 0.2rem; }
          .form-row label { width: 100%; text-align: left; }
        }
      `}</style>
    </div>
  );

  const renderListView = () => (
    <>
      <div className="page-header bordered">
        <h2 className="page-title">Doctor Maintenance</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-upload-text" onClick={() => window.location.href = '/medcore/upload-excel'}>
            <FileSpreadsheet size={16} /> UPLOAD EXCEL
          </button>
          <button className="btn-new-doctor" onClick={() => setView('maintenance')}>
            <UserPlus size={16} />
            NEW DOCTOR
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '2rem', height: '500px', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <div className="search-container">
          <label className="search-label">LOOK FOR:</label>
          <div className="search-input-wrapper">
            <input type="text" placeholder="Look for" className="search-input" />
            <div className="search-icons">
              <button className="search-icon-btn" title="Upload from Excel" onClick={() => window.location.href = '/medcore/upload-excel'}>
                <FileSpreadsheet size={20} strokeWidth={2.5} />
              </button>
              <button className="search-icon-btn" title="Export/Download"><Download size={20} strokeWidth={2.5} /></button>
            </div>
          </div>
        </div>
        <div className="empty-state">No existe información para mostrar</div>
      </div>
    </>
  );

  return (
    <DashboardLayout>
      {view === 'list' ? renderListView() : renderMaintenanceView()}
    </DashboardLayout>
  );
};

export default Doctors;
