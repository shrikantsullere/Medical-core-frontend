import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, Download, Plus, Pencil, X, Check, List, Eye, ArrowLeft } from 'lucide-react';

const Questions = () => {
  const [view, setView] = useState('list'); // 'list' | 'create'
  const [searchTerm, setSearchTerm] = useState('');

  const questionsData = [
    { id: 1, description: 'General Health Assessment', keyword: 'health_assess_01', type: 'TEXT EDITOR', instructions: 'Detailed description of patient state.' },
    { id: 2, description: 'Duration of Symptoms', keyword: 'symptom_days', type: 'NUMBER', instructions: 'Numeric value in days.' },
    { id: 3, description: 'Frequency of Episodes', keyword: 'episode_freq', type: 'NUMBER', instructions: 'Occurrences per week.' },
    { id: 4, description: 'Height (cm)', keyword: 'p_height_cm', type: 'NUMBER', instructions: 'Measure without shoes.' },
    { id: 5, description: 'Weight (oz)', keyword: 'p_weight_oz', type: 'NUMBER', instructions: 'Infant weight measurement.' },
    { id: 6, description: 'Birth Weight (lb) - Neo', keyword: 'neo_weight_lb', type: 'NUMBER', instructions: 'Neonatal unit record.' },
    { id: 7, description: 'Gestational Age (Weeks)', keyword: 'gest_age_wks', type: 'NUMBER', instructions: 'Calculated from LMP.' },
    { id: 8, description: 'Head Circumference (cm)', keyword: 'hc_measure_cm', type: 'NUMBER', instructions: 'Maximum circumference.' },
    { id: 9, description: 'Body Length (cm)', keyword: 'p_length_cm', type: 'NUMBER', instructions: 'Measured in supine position.' },
    { id: 10, description: 'Primary Diagnosis', keyword: 'diag_primary', type: 'SELECT', instructions: 'Choose from established codes.' },
  ];

  const renderListView = () => (
    <div className="questions-list-view" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h2 className="page-title" style={{ margin: 0, fontSize: '2.2rem', fontWeight: '900', color: '#1E293B', letterSpacing: '-0.025em' }}>Diagnostic <span style={{ color: '#0D9488' }}>Database</span></h2>
          <p style={{ color: '#64748B', margin: '0.4rem 0 0', fontSize: '1rem', fontWeight: '500' }}>Maintain clinical assessment protocols and diagnostic field definitions.</p>
        </div>
        <button className="btn-primary" onClick={() => setView('create')} style={{ height: '48px', padding: '0 2rem', fontWeight: '800' }}>
          <Plus size={20} /> INITIALIZE PROTOCOL
        </button>
      </div>

      <div className="card" style={{ padding: '2.5rem', marginBottom: '3rem', border: '1px solid #E2E8F0' }}>
        <div style={{ position: 'relative', maxWidth: '600px' }}>
          <label style={{ position: 'absolute', top: '-11px', left: '16px', backgroundColor: '#0D9488', color: 'white', padding: '0 12px', fontSize: '0.7rem', fontWeight: '900', borderRadius: '6px', zIndex: 1, letterSpacing: '0.1em' }}>UNIVERSAL SEARCH</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input type="text" className="custom-input" placeholder="Search by clinical description or keyword..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', paddingLeft: '3rem', height: '52px', fontSize: '1rem' }} />
              <Search size={20} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <button className="btn-secondary" style={{ width: '52px', height: '52px', padding: 0 }} title="Export Schema">
              <Download size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden', border: '1px solid #E2E8F0' }}>
        <div className="maint-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1100px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.05em' }}>PROTOCOL DESCRIPTION</th>
                <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.05em' }}>META KEYWORD</th>
                <th style={{ padding: '1.5rem', textAlign: 'center', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.05em' }}>DATA SCHEMA</th>
                <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.05em' }}>CLINICAL GUIDELINES</th>
                <th style={{ padding: '1.5rem', textAlign: 'right', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.05em', width: '160px' }}>MANAGEMENT</th>
              </tr>
            </thead>
            <tbody>
              {questionsData.filter(q => q.description.toLowerCase().includes(searchTerm.toLowerCase()) || q.keyword.toLowerCase().includes(searchTerm.toLowerCase())).map((q, idx) => (
                <tr key={q.id} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: idx % 2 === 0 ? 'white' : '#F9FAFB', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1.5rem' }}>
                    <span style={{ fontWeight: '800', color: '#1E293B', fontSize: '1.05rem' }}>{q.description}</span>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <code style={{ backgroundColor: '#F1F5F9', padding: '0.5rem 0.8rem', borderRadius: '10px', color: '#0F766E', fontSize: '0.85rem', fontWeight: '800', border: '1px solid #E2E8F0' }}>{q.keyword}</code>
                  </td>
                  <td style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <span style={{ backgroundColor: '#F0FDFA', color: '#0D9488', padding: '0.5rem 1rem', borderRadius: '100px', fontWeight: '900', fontSize: '0.7rem', border: '1px solid currentColor', letterSpacing: '0.05em' }}>{q.type}</span>
                  </td>
                  <td style={{ padding: '1.5rem', color: '#64748B', fontSize: '0.9rem', fontWeight: '500' }}>{q.instructions}</td>
                  <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <button style={{ background: 'none', border: '1px solid #E2E8F0', color: '#64748B', cursor: 'pointer', padding: '0.5rem', borderRadius: '10px' }} className="hover-teal" onClick={() => setView('create')}>
                        <Pencil size={18} />
                      </button>
                      <button style={{ background: 'none', border: '1px solid #E2E8F0', color: '#EF4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '10px' }} className="hover-red">
                        <X size={20} />
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

  const renderCreateView = () => (
    <div className="question-create-view" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <button className="btn-secondary" onClick={() => setView('list')} style={{ marginBottom: '1.25rem', fontSize: '0.85rem', padding: '0.5rem 1.25rem', borderRadius: '100px', color: '#0D9488', border: '1.5px solid #0D9488' }}>
            <ArrowLeft size={16} /> RETURN TO DATABASE
          </button>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#1E293B', margin: 0, letterSpacing: '-0.025em' }}>Protocol <span style={{ color: '#0D9488' }}>Configuration</span></h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ backgroundColor: 'white', height: '52px', padding: '0 1.5rem', fontWeight: '700' }} onClick={() => setView('list')}>
            DISCARD
          </button>
          <button className="btn-primary" style={{ backgroundColor: '#22C55E', borderColor: '#22C55E', height: '52px', padding: '0 1.5rem', fontWeight: '800' }}>
            <Eye size={20} /> PREVIEW PROTOCOL
          </button>
          <button className="btn-primary" style={{ height: '52px', padding: '0 2.5rem', fontWeight: '900' }}>
            <Check size={24} /> KEEP CHANGES
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '3.5rem', marginBottom: '3rem', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#1E293B', marginBottom: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '8px', height: '24px', backgroundColor: '#0D9488', borderRadius: '4px' }}></div>
          Definitions Registry
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="form-group-row">
              <label className="required">PROTOCOL IDENTITY</label>
              <input type="text" className="custom-input" placeholder="e.g. Systemic Arterial Tension" style={{ width: '100%', height: '52px', fontWeight: '700' }} />
            </div>
            <div className="form-group-row">
              <label>CLINICAL SPECIALTY</label>
              <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                <input type="text" className="custom-input" placeholder="Assign target clinical scope..." style={{ flex: 1, height: '52px' }} />
                <button className="btn-secondary" style={{ width: '52px', height: '52px', padding: 0 }}><Search size={22} /></button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '235px' }}>
              <label className="checkbox-label">
                <input type="checkbox" className="custom-checkbox" /> Allow Multiple Clinical Instances
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="custom-checkbox" /> Persistent Inheritance from History
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="custom-checkbox" defaultChecked /> Display Header in Operational Form
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="form-group-row">
              <label className="required">SCHEMA CONTROL</label>
              <select className="custom-select" style={{ width: '100%', height: '52px', fontWeight: '700' }}>
                <option value="TEXT">SIMPLE TEXT FIELD</option>
                <option value="REACH_TEXT">ADVANCED EDITOR SCHEMA</option>
                <option value="NUMBER">NUMERIC QUANTIFICATION</option>
                <option value="SELECT">PICKLIST / ENUMERATION</option>
                <option value="DATE">TEMPORAL DATE PICKER</option>
              </select>
            </div>
            <div className="form-group-row" style={{ alignItems: 'flex-start' }}>
              <label style={{ marginTop: '0.85rem' }}>CLINICAL GUIDELINES</label>
              <textarea className="custom-input" placeholder="Describe operational guidelines for clinical personnel synchronization..." style={{ height: '120px', width: '100%', resize: 'none', padding: '1rem' }}></textarea>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', paddingLeft: '235px' }}>
              <label className="checkbox-label"><input type="checkbox" className="custom-checkbox" /> Conditional execution</label>
              <label className="checkbox-label"><input type="checkbox" className="custom-checkbox" /> Audit path enabled</label>
              <label className="checkbox-label" style={{ color: '#EF4444' }}><input type="checkbox" className="custom-checkbox" /> Protocol disabled</label>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '3rem', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
        <div style={{ backgroundColor: '#22C55E', color: 'white', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Check size={24} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900', letterSpacing: '0.075em' }}>DATA VALIDATION SCHEMAS</h3>
        </div>
        <div className="maint-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                <th style={{ padding: '1rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.8rem', width: '30%' }}>VALIDATION PROTOCOL</th>
                <th style={{ padding: '1rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.8rem', width: '20%' }}>VALUATION THRESHOLD</th>
                <th style={{ padding: '1rem 2rem', textAlign: 'left', fontWeight: '800', fontSize: '0.8rem' }}>FAILURE DISCRIPTOR</th>
                <th style={{ padding: '1rem 2rem', textAlign: 'center', fontWeight: '800', fontSize: '0.8rem', width: '100px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1.5rem 2rem' }}>
                  <select className="custom-select" style={{ width: '100%', border: '1.5px solid #F1F5F9' }}><option value="">Select Validation Matrix...</option></select>
                </td>
                <td style={{ padding: '1.5rem 2rem' }}>
                  <input type="text" className="custom-input" style={{ width: '100%', backgroundColor: '#F8FAFC' }} placeholder="Value" />
                </td>
                <td style={{ padding: '1.5rem 2rem' }}>
                  <input type="text" className="custom-input" style={{ width: '100%', backgroundColor: '#F8FAFC' }} placeholder="Synchronization error message" />
                </td>
                <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                  <button style={{ backgroundColor: '#0D9488', border: 'none', color: 'white', width: '44px', height: '44px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <Plus size={24} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '5rem', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
        <div style={{ backgroundColor: '#3B82F6', color: 'white', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <List size={24} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900', letterSpacing: '0.075em' }}>PROTOCOL DEFAULT SYNCHRONIZATION</h3>
        </div>
        <div style={{ padding: '5rem', textAlign: 'center', backgroundColor: '#F8FAFC' }}>
          <div style={{ backgroundColor: '#E0F2FE', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '1px solid #BAE6FD' }}>
            <List size={40} color="#0284C7" />
          </div>
          <h4 style={{ margin: '0 0 0.75rem', color: '#1E293B', fontSize: '1.3rem', fontWeight: '900', letterSpacing: '-0.01em' }}>Empty Synchronization Matrix</h4>
          <p style={{ color: '#64748B', maxWidth: '450px', margin: '0 auto', fontSize: '1rem', fontWeight: '500', lineHeight: '1.6' }}>Static defaults are only applicable for enumeration, temporal, and boolean protocols. Numeric valuations should be governed by validation parameters.</p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      {view === 'list' ? renderListView() : renderCreateView()}
      <style>{`
        .form-group-row { display: flex; align-items: center; gap: 2rem; min-height: 52px; }
        .form-group-row label { width: 220px; text-align: right; font-size: 0.8rem; font-weight: 800; color: #64748B; letterSpacing: 0.05em; }
        .form-group-row label.required:after { content: '*'; color: #DC2626; margin-left: 6px; }
        .custom-input, .custom-select { flex: 1; padding: 0.75rem 1rem; border: 1.5px solid #E2E8F0; border-radius: 12px; font-size: 0.95rem; outline: none; transition: all 0.2s; color: #1E293B; fontWeight: 600; }
        .custom-input:focus, .custom-select:focus { border-color: #0D9488; box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1); }
        .checkbox-label { display: flex; align-items: center; gap: 0.85rem; cursor: pointer; font-size: 0.95rem; color: #475569; font-weight: 800; }
        .custom-checkbox { width: 22px; height: 22px; accent-color: #0D9488; border-radius: 6px; }
        .hover-teal:hover { color: #0D9488 !important; border-color: #0D9488 !important; background-color: #F0FDFA !important; }
        .hover-red:hover { color: #EF4444 !important; border-color: #EF4444 !important; background-color: #FEF2F2 !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) {
          .form-group-row { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .form-group-row label { width: 100%; text-align: left; }
          div[style*="paddingLeft: '235px'"] { padding-left: 0 !important; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Questions;
