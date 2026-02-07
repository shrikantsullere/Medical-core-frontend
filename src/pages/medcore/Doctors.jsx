import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, UserPlus, Download, X, Save } from 'lucide-react';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialty: '',
    license: '',
    phone: '',
    email: ''
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Doctor Saved: ' + JSON.stringify(formData));
    setIsModalOpen(false);
    setFormData({ firstName: '', lastName: '', specialty: '', license: '', phone: '', email: '' });
  };

  return (
    <DashboardLayout>
      <div className="page-header bordered">
        <h2 className="page-title">Doctor Maintenance</h2>
        <button className="btn-new-doctor" onClick={handleOpenModal}>
          <UserPlus size={16} />
          NEW DOCTOR
        </button>
      </div>

      <div className="card" style={{ padding: '2rem', height: '500px', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
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
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '6px',
            width: '90%',
            maxWidth: '600px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, color: '#1F2937', fontSize: '1.25rem' }}>New Doctor</h3>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="custom-input"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="custom-input"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Specialty</label>
                  <select
                    name="specialty"
                    className="custom-select"
                    value={formData.specialty}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Specialty</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="General">General Practice</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>License/ID</label>
                  <input
                    type="text"
                    name="license"
                    className="custom-input"
                    value={formData.license}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="custom-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="custom-input"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '4px',
                    border: '1px solid #D1D5DB',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontWeight: '600',
                    color: '#374151'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#F28C28',
                    cursor: 'pointer',
                    fontWeight: '600',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Save size={18} />
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Doctors;
