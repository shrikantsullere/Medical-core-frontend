import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Search, Download, Plus, Pencil, X, Check, List, Eye, ArrowLeft } from 'lucide-react';

const Questions = () => {
  const [view, setView] = useState('list'); // 'list' | 'create'
  const [searchTerm, setSearchTerm] = useState('');

  const questionsData = [
    { id: 1, description: 'Description: - Gastro and nutrition', keyword: 'description___gatro_y_nutri', type: 'TEXT EDITOR', instructions: '' },
    { id: 2, description: 'Days', keyword: 'days_1', type: 'NUMBER', instructions: '' },
    { id: 3, description: 'Weeks', keyword: 'weeks_1', type: 'NUMBER', instructions: '' },
    { id: 4, description: 'In centimeters', keyword: 'in centimeters', type: 'NUMBER', instructions: '' },
    { id: 5, description: 'Ounces', keyword: 'ounces', type: 'NUMBER', instructions: '' },
    { id: 6, description: 'Libras -Neo', keyword: 'pounds__neo', type: 'NUMBER', instructions: '' },
    { id: 7, description: 'Gestational age at birth-Neo', keyword: 'gestational_age_at_birth_1', type: 'NUMBER', instructions: 'Weeks' },
    { id: 8, description: 'Circunferencia cefalica al nacer (Cm)-Neo', keyword: 'circunferencia_cefalica_al_nacer__cm__neo', type: 'NUMBER', instructions: '' },
    { id: 9, description: 'Birth size (cm) - Neo', keyword: 'birth_size___cm___neo', type: 'NUMBER', instructions: '' },
    { id: 10, description: 'Birth weight (lb)-Neo', keyword: 'birth_weight__lb__neo', type: 'NUMBER', instructions: '' },
  ];

  const renderListView = () => (
    <div className="questions-list-view">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #F28C28', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#333', margin: 0, fontWeight: '400' }}>List of Questions</h2>
        <button className="btn-new-question" onClick={() => setView('create')}>
          <Plus size={18} /> NEW QUESTION
        </button>
      </div>

      <div className="search-box-container" style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <label style={{ position: 'absolute', top: '-10px', left: '0', backgroundColor: '#F28C28', color: 'white', padding: '0 8px', fontSize: '0.75rem', fontWeight: 'bold', zIndex: 1 }}>LOOK FOR:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Look for"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #C4C4C4', borderRadius: '4px', outline: 'none' }}
            />
            <Search size={22} color="#F28C28" cursor="pointer" />
            <Download size={22} color="#D2691E" cursor="pointer" />
          </div>
        </div>
      </div>

      <div className="table-container" style={{ backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
              <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '500' }}>Description <span style={{ fontSize: '0.7rem' }}>▲</span></th>
              <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '500' }}>Keyword <span style={{ fontSize: '0.7rem' }}>▲</span></th>
              <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '500' }}>Type <span style={{ fontSize: '0.7rem' }}>▲</span></th>
              <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '500' }}>Instructions <span style={{ fontSize: '0.7rem' }}>▲</span></th>
              <th style={{ textAlign: 'center', padding: '1rem' }}></th>
            </tr>
          </thead>
          <tbody>
            {questionsData.map(q => (
              <tr key={q.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{q.description}</td>
                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{q.keyword}</td>
                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{q.type}</td>
                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{q.instructions}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <Pencil size={18} color="#555" cursor="pointer" />
                    <X size={20} color="#333" cursor="pointer" strokeWidth={3} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCreateView = () => (
    <div className="question-create-view">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #F28C28', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#333', margin: 0, fontWeight: '400' }}>Question Creation</h2>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button className="btn-cancel-q" onClick={() => setView('list')}><List size={16} /> CANCEL</button>
          <button className="btn-preview-q"><Eye size={16} /> PREVIEW</button>
          <button className="btn-keep-q"><Check size={16} /> KEEP</button>
        </div>
      </div>

      <div className="maint-card">
        <h3 style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem', fontWeight: '400' }}>General Information</h3>

        <div className="q-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div className="q-column">
            <div className="q-row">
              <label className="q-label required">Ask:</label>
              <input type="text" className="q-input" />
            </div>
            <div className="q-row">
              <label className="q-label">Specialties:</label>
              <input type="text" className="q-input" placeholder="Search for a specialty..." />
            </div>
            <div className="q-row checkbox-align">
              <label className="q-label">Multiple Instances:</label>
              <input type="checkbox" />
            </div>
            <div className="q-row checkbox-align">
              <label className="q-label">Take from History:</label>
              <input type="checkbox" />
            </div>
            <div className="q-row checkbox-align">
              <label className="q-label">Visible title:</label>
              <input type="checkbox" defaultChecked style={{ accentColor: '#34A853' }} />
            </div>
            <div className="q-row">
              <label className="q-label">Save As:</label>
              <select className="q-input">
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="q-column">
            <div className="q-row">
              <label className="q-label">Type:</label>
              <select className="q-input">
                <option value=""></option>
              </select>
            </div>
            <div className="q-row" style={{ alignItems: 'flex-start' }}>
              <label className="q-label">Instructions:</label>
              <textarea className="q-input" style={{ height: '80px', padding: '0.5rem' }}></textarea>
            </div>
            <div style={{ display: 'flex', gap: '4rem' }}>
              <div className="q-row checkbox-align">
                <label className="q-label">Dependent:</label>
                <input type="checkbox" />
              </div>
              <div className="q-row checkbox-align">
                <label className="q-label">Statistical data:</label>
                <input type="checkbox" />
              </div>
            </div>
            <div className="q-row checkbox-align">
              <label className="q-label">Disabled:</label>
              <input type="checkbox" />
            </div>
          </div>
        </div>

        {/* Validations Section */}
        <div className="section-maint" style={{ marginTop: '3rem' }}>
          <div style={{ backgroundColor: '#2E7D32', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px 4px 0 0', fontWeight: '500' }}>Validations</div>
          <div style={{ border: '1px solid #E5E7EB', borderTop: 'none', padding: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#0B3B3C', color: 'white' }}>
                  <th style={{ textAlign: 'left', padding: '0.8rem', fontSize: '0.9rem' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '0.8rem', fontSize: '0.9rem' }}>Value</th>
                  <th style={{ textAlign: 'left', padding: '0.8rem', fontSize: '0.9rem' }}>Message</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', borderTop: '1px solid #E5E7EB' }}>
                    <select className="q-input" style={{ width: '100%' }}><option value=""></option></select>
                  </td>
                  <td style={{ padding: '1rem', borderTop: '1px solid #E5E7EB' }}></td>
                  <td style={{ padding: '1rem', borderTop: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <input type="text" className="q-input" style={{ flex: 1 }} />
                      <button style={{ backgroundColor: '#F8A359', border: 'none', color: 'white', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Default Value Section */}
        <div className="section-maint" style={{ marginTop: '3rem', marginBottom: '4rem' }}>
          <div style={{ backgroundColor: '#2488E0', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px 4px 0 0', fontWeight: '500' }}>Default value</div>
          <div style={{ border: '1px solid #E5E7EB', borderTop: 'none', padding: '3rem' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', padding: '2rem 0', borderTop: '1px dotted #CCC' }}>
          <button className="btn-cancel-q" onClick={() => setView('list')}><List size={16} /> CANCEL</button>
          <button className="btn-preview-q"><Eye size={16} /> PREVIEW</button>
          <button className="btn-keep-q"><Check size={16} /> KEEP</button>
        </div>
      </div>

      <style>{`
        .btn-new-question { 
          background-color: #F28C28; 
          color: white; 
          border: none; 
          padding: 0.6rem 1.5rem; 
          border-radius: 4px; 
          font-weight: bold; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
          cursor: pointer; 
          text-transform: uppercase;
          font-size: 0.9rem;
        }
        .btn-cancel-q { background: none; border: none; color: #555; display: flex; align-items: center; gap: 0.4rem; font-weight: bold; font-size: 0.85rem; cursor: pointer; text-transform: uppercase; }
        .btn-preview-q { background-color: #34A853; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; display: flex; align-items: center; gap: 0.4rem; font-weight: bold; font-size: 0.85rem; cursor: pointer; text-transform: uppercase; }
        .btn-keep-q { background-color: #F8A359; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; display: flex; align-items: center; gap: 0.4rem; font-weight: bold; font-size: 0.85rem; cursor: pointer; text-transform: uppercase; }
        
        .maint-card { background-color: white; padding: 2rem; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .q-row { display: flex; margin-bottom: 1rem; align-items: center; }
        .q-label { width: 150px; text-align: right; padding-right: 1.5rem; font-size: 0.85rem; font-weight: bold; color: #555; }
        .q-label.required { color: #DC2626; }
        .checkbox-align { justify-content: flex-start; }
        .checkbox-align .q-label { width: 170px; }
        .q-input { flex: 1; border: 1px solid #DEDEDE; padding: 0.6rem; border-radius: 4px; outline: none; font-size: 0.9rem; }
        .q-input:focus { border-color: #F28C28; }
      `}</style>
    </div>
  );

  return (
    <DashboardLayout>
      {view === 'list' ? renderListView() : renderCreateView()}
    </DashboardLayout>
  );
};

export default Questions;
