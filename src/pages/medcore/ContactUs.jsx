import React from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { User, X, Phone, Printer, Mail, MapPin, ExternalLink } from 'lucide-react';

const ContactUs = () => {
  return (
    <DashboardLayout>
      <div className="contact-page-wrapper">
        <div className="contact-card">
          {/* Header */}
          <div className="contact-header">
            <div className="header-left">
              <User size={20} fill="white" />
              <span>Contact us</span>
            </div>
            <X size={20} className="close-icon" onClick={() => window.history.back()} />
          </div>

          {/* Content Area */}
          <div className="contact-body">
            <div className="info-section">
              <div className="text-info">
                <h2 className="company-name">MedicalCore Support Systems</h2>

                <div className="contact-item">
                  <Phone size={18} />
                  <span>+1 (888) 456-7890 Ext. 101, 102</span>
                </div>

                <div className="contact-item">
                  <Printer size={18} />
                  <span>+1 (888) 456-7891</span>
                </div>

                <div className="contact-item">
                  <Mail size={18} />
                  <a href="mailto:support@medicalcore.io">support@medicalcore.io</a>
                </div>

                <div className="address-block">
                  <p>742 Evergreen Terrace, Suite 500</p>
                  <p>Springfield, IL 62704, United States</p>
                </div>
              </div>

              <div className="logo-placeholder">
                <div className="mock-logo">
                  <div className="logo-symbol">+</div>
                  <div className="logo-text">
                    <span className="bold">Medical</span>Core
                    <br />
                    <span className="small">Technologies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="office-section">
              <h3 className="section-title">Our office</h3>
              <div className="map-container">
                <div className="map-overlay">
                  <div className="map-info-box">
                    <strong>MedicalCore HQ</strong>
                    <button className="view-map-btn">View larger map</button>
                  </div>
                </div>
                {/* Mock Map Background */}
                <div className="mock-map-bg">
                  <MapPin size={40} color="#EF4444" fill="#EF4444" className="map-marker" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-page-wrapper {
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: calc(100vh - 100px);
          background-color: #f3f4f6;
        }
        .contact-card {
          width: 100%;
          max-width: 900px;
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .contact-header {
          background-color: #F28C28;
          color: white;
          padding: 0.8rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-weight: 600;
          font-size: 1.1rem;
        }
        .close-icon {
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .close-icon:hover { opacity: 1; }

        .contact-body {
          padding: 3rem;
        }
        .info-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3rem;
        }
        .company-name {
          font-size: 1.8rem;
          color: #374151;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.8rem;
          color: #4B5563;
        }
        .contact-item a {
          color: #2563EB;
          text-decoration: none;
        }
        .contact-item a:hover { text-decoration: underline; }
        .address-block {
          margin-top: 2rem;
          color: #6B7280;
          line-height: 1.6;
        }

        /* Mock Logo */
        .mock-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .logo-symbol {
          background-color: #F28C28;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
        }
        .logo-text {
          color: #0B3B3C;
          line-height: 1.1;
          font-size: 1.4rem;
        }
        .logo-text .bold { font-weight: 800; }
        .logo-text .small { font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: #F28C28; }

        /* Office/Map Section */
        .office-section {
          border-top: 1px solid #E5E7EB;
          padding-top: 2rem;
        }
        .section-title {
          font-size: 1.2rem;
          color: #4B5563;
          margin-bottom: 1.5rem;
          font-weight: 400;
        }
        .map-container {
          position: relative;
          height: 350px;
          border-radius: 4px;
          overflow: hidden;
          background-color: #f0f0f0;
          border: 1px solid #E5E7EB;
        }
        .mock-map-bg {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(#d1d5db 1px, transparent 1px);
          background-size: 20px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .map-overlay {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
        }
        .map-info-box {
          background: white;
          padding: 1rem;
          border-radius: 2px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .view-map-btn {
          background: none;
          border: none;
          color: #2563EB;
          padding: 0;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .map-marker {
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default ContactUs;
