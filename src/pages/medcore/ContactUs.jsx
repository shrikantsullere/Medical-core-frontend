import React from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { User, X, Phone, Printer, Mail, MapPin, ExternalLink } from 'lucide-react';

const ContactUs = () => {
  return (
    <DashboardLayout>
      <div className="contact-page-wrapper" style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 'calc(100vh - 100px)', backgroundColor: '#F8FAFC', animation: 'fadeIn 0.5s ease-out' }}>
        <div className="card" style={{ width: '100%', maxWidth: '1100px', overflow: 'hidden', padding: 0, border: '1px solid #E2E8F0', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)', borderRadius: '32px' }}>
          {/* Main Header Integration */}
          <div style={{ backgroundColor: '#0B3B3C', color: 'white', padding: '2.5rem 3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(13, 148, 136, 0.1))', pointerEvents: 'none' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 1 }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Mail size={32} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.025em' }}>Communication <span style={{ color: '#0D9488' }}>Matrix</span></h2>
                <p style={{ margin: '0.2rem 0 0', fontSize: '1rem', opacity: 0.7, fontWeight: '500' }}>Direct synchronization with our global support division.</p>
              </div>
            </div>
            <button onClick={() => window.history.back()} style={{ backgroundColor: 'white', border: 'none', color: '#0B3B3C', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 1 }} className="hover-rotate">
              <X size={24} />
            </button>
          </div>

          <div style={{ padding: '4rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', marginBottom: '5rem', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '3rem', color: '#1E293B', marginBottom: '1.5rem', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: '1.1' }}>Support <span style={{ color: '#0D9488' }}>Intelligence</span> <br />Network</h1>
                <p style={{ color: '#64748B', fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '3.5rem', fontWeight: '500' }}>Our specialized personnel are operational 24/7 to ensure clinical performance optimization and infrastructure stability.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="contact-info-card">
                    <div style={{ color: '#0D9488', backgroundColor: '#F0FDFA', padding: '0.85rem', borderRadius: '14px', width: 'fit-content', border: '1.5px solid #CCFBF1' }}>
                      <Phone size={24} />
                    </div>
                    <div style={{ marginTop: '1.25rem' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Voice Channel</p>
                      <p style={{ margin: '0.25rem 0 0', fontSize: '1.1rem', fontWeight: '800', color: '#1E293B' }}>+1 (888) 456-7890</p>
                    </div>
                  </div>

                  <div className="contact-info-card">
                    <div style={{ color: '#0D9488', backgroundColor: '#F0FDFA', padding: '0.85rem', borderRadius: '14px', width: 'fit-content', border: '1.5px solid #CCFBF1' }}>
                      <Mail size={24} />
                    </div>
                    <div style={{ marginTop: '1.25rem' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Digital Inquiry</p>
                      <a href="mailto:support@medcareemr.com" style={{ margin: '0.25rem 0 0', fontSize: '1.1rem', fontWeight: '800', color: '#0D9488', textDecoration: 'none', display: 'block' }}>support@medcare.io</a>
                    </div>
                  </div>

                  <div className="contact-info-card" style={{ gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ color: '#0D9488', backgroundColor: '#F0FDFA', padding: '0.85rem', borderRadius: '14px', width: 'fit-content', border: '1.5px solid #CCFBF1' }}>
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Protocol Headquarters</p>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '1rem', fontWeight: '700', color: '#475569', lineHeight: '1.5' }}>742 Evergreen Terrace, Suite 500, Springfield, IL 62704, US</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', borderRadius: '32px', padding: '4rem 3rem', border: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', backgroundColor: '#0D9488', opacity: 0.1, borderRadius: '50%', filter: 'blur(40px)' }}></div>
                <div style={{ textAlign: 'center', zIndex: 1 }}>
                  <div style={{ backgroundColor: '#0B3B3C', color: 'white', width: '90px', height: '90px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', fontWeight: '900', margin: '0 auto 2rem', boxShadow: '0 25px 50px -12px rgba(11, 59, 60, 0.3)', border: '2px solid #0D9488' }}>+</div>
                  <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.025em' }}>MedCore <span style={{ color: '#0D9488' }}>EMR</span></h2>
                  <p style={{ margin: '0.75rem 0 0', fontSize: '0.85rem', color: '#0D9488', fontWeight: '800', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Central Intelligence</p>
                </div>
              </div>
            </div>

            {/* Strategy Hub Visualization */}
            <div style={{ paddingTop: '5rem', borderTop: '2.5px solid #F1F5F9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.02em' }}>Geographic <span style={{ color: '#0D9488' }}>Synchronization</span></h3>
                  <p style={{ margin: '0.5rem 0 0', color: '#64748B', fontSize: '1.1rem', fontWeight: '500' }}>Strategic operations center serving our global clinical community.</p>
                </div>
                <button style={{ backgroundColor: 'white', border: '1.5px solid #E2E8F0', color: '#1E293B', padding: '1rem 2rem', borderRadius: '16px', fontWeight: '800', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }} className="hover-teal-border">
                  <ExternalLink size={20} /> INTERFACE GOOGLE MAPS
                </button>
              </div>

              <div style={{ position: 'relative', height: '450px', borderRadius: '32px', overflow: 'hidden', background: '#F8FAFC', border: '1.5px solid #E2E8F0', boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '100%', height: '100%', backgroundImage: 'radial-gradient(#E2E8F0 1.5px, transparent 1.5px)', backgroundSize: '32px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="map-marker-container" style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', backgroundColor: 'rgba(13, 148, 136, 0.1)', borderRadius: '50%', animation: 'ping-custom 2.5s infinite cubic-bezier(0, 0, 0.2, 1)' }}></div>
                    <MapPin size={64} color="#0D9488" fill="#0D9488" style={{ position: 'relative', filter: 'drop-shadow(0 15px 25px rgba(13, 148, 136, 0.3))' }} />
                  </div>
                </div>

                <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', backgroundColor: 'white', padding: '1.75rem', borderRadius: '20px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0', maxWidth: '300px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.01em' }}>EMR GLOBAL COMMAND</h4>
                  <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem', color: '#64748B', lineHeight: '1.5', fontWeight: '500' }}>Corporate Operations Hub & Decentralized Data Foundry</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .contact-info-card { padding: 2rem; border-radius: 20px; border: 1.5px solid #F1F5F9; background-color: white; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .contact-info-card:hover { border-color: #0D9488; transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(0,0,0,0.05); }
          .hover-teal-border:hover { border-color: #0D9488 !important; color: #0D9488 !important; transform: translateY(-2px); }
          .hover-rotate:hover { transform: rotate(90deg); background-color: #0D9488 !important; color: white !important; }
          
          @keyframes ping-custom {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
          }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          
          @media (max-width: 900px) {
            div[style*="gridTemplateColumns: '1.2fr 0.8fr'"] {
              grid-template-columns: 1fr !important;
              gap: 3rem !important;
            }
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default ContactUs;
