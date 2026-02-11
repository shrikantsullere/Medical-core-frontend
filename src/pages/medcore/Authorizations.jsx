import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Lock, ArrowRight, CheckCircle2, CreditCard, Search, Info, Loader2, AlertCircle, ChevronLeft } from 'lucide-react';

const Authorizations = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    insurance: '',
    affiliateCode: '',
    selectedCoverages: [],
  });

  const steps = [
    'Validation',
    'Selection',
    'Verification',
    'Financials',
    'Settlement'
  ];

  const handleContinue = () => {
    if (currentStep === 1 && (!formData.insurance || !formData.affiliateCode)) {
      alert('Initialization failure: All validation parameters must be populated.');
      return;
    }

    if (currentStep === 2 && formData.selectedCoverages.length === 0) {
      alert('Protocol error: No clinical services selected for synchronization.');
      return;
    }

    if (currentStep < 5) {
      if (currentStep === 2) {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep(currentStep + 1);
        }, 1800);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const mockCoverages = [
    { id: 1, name: 'Consultant Clinical Visit', code: 'C-102', category: 'Medical', price: 1200 },
    { id: 2, name: 'Complete Blood Count (CBC)', code: 'L-501', category: 'Laboratory', price: 850 },
    { id: 3, name: 'Chest X-Ray PA View', code: 'R-202', category: 'Radiology', price: 1500 },
    { id: 4, name: 'Urine Analysis', code: 'L-302', category: 'Laboratory', price: 400 },
    { id: 5, name: 'Physical Therapy Session', code: 'M-808', category: 'Therapy', price: 2200 },
    { id: 6, name: 'Electrocardiogram (ECG)', code: 'C-404', category: 'Medical', price: 1800 },
  ];

  const toggleCoverage = (coverage) => {
    const isSelected = formData.selectedCoverages.find(c => c.id === coverage.id);
    if (isSelected) {
      setFormData({
        ...formData,
        selectedCoverages: formData.selectedCoverages.filter(c => c.id !== coverage.id)
      });
    } else {
      setFormData({
        ...formData,
        selectedCoverages: [...formData.selectedCoverages, coverage]
      });
    }
  };

  const renderStepContent = () => {
    if (isProcessing) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '280px', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', animation: 'fadeIn 0.4s ease-out' }}>
          <div className="loader-container" style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <Loader2 className="spin-animation" size={40} color="var(--primary)" />
            <div className="pulse-ring" style={{ position: 'absolute', top: '-8px', left: '-8px', right: '-8px', bottom: '-8px', borderRadius: '50%', border: '2px solid var(--primary)', opacity: 0.2 }}></div>
          </div>
          <p style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Synthesizing Policy Rules</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>Synchronizing with insurance protocol...</p>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="card auth-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="auth-grid-2">
              <div className="filter-group">
                <label className="filter-label">INSURANCE PROVIDER</label>
                <select className="custom-select" value={formData.insurance} onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}>
                  <option value="">Select Provider...</option>
                  <option value="Humano">Humano</option>
                  <option value="Senasa">Senasa</option>
                  <option value="Universal">Universal</option>
                  <option value="Mapfre">Mapfre</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">AFFILIATE IDENTITY CODE</label>
                <input type="text" className="custom-input" placeholder="Membership Serial Number" value={formData.affiliateCode} onChange={(e) => setFormData({ ...formData, affiliateCode: e.target.value })} />
              </div>
            </div>
            <div className="info-box">
              <Info size={18} color="#0284C7" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.15rem', color: '#0369A1' }}>PROTOCOL SPECIFICATION</h4>
                <p style={{ fontSize: '0.8rem', color: '#0369A1', lineHeight: '1.4', margin: 0 }}>
                  Ensure the affiliate identity is absolute. Mismatched protocols will result in transaction rejection.
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="card auth-card" style={{ padding: '1.5rem' }}>
            <div className="auth-header-actions">
              <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
                <input type="text" className="custom-input" placeholder="Search protocol..." style={{ paddingLeft: '2.25rem', fontSize: '0.85rem' }} />
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <div className="selected-badge">
                {formData.selectedCoverages.length} SELECTED
              </div>
            </div>
            <div className="auth-grid-fill">
              {mockCoverages.map(coverage => {
                const isSelected = formData.selectedCoverages.find(c => c.id === coverage.id);
                return (
                  <div
                    key={coverage.id}
                    onClick={() => toggleCoverage(coverage)}
                    className={`coverage-card ${isSelected ? 'selected' : ''}`}
                  >
                    {isSelected && <div className="check-icon"><CheckCircle2 size={18} /></div>}
                    <div>
                      <div className="coverage-title">{coverage.name}</div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span className="coverage-tag code">{coverage.code}</span>
                        <span className="coverage-tag category">{coverage.category.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="coverage-price">${coverage.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="card auth-card" style={{ padding: '1.5rem' }}>
            <div className="verification-header">
              <div style={{ backgroundColor: '#22C55E', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'white', display: 'flex' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: '#166534' }}>Verification <span style={{ color: '#22C55E' }}>SECURED</span></h3>
                <p style={{ fontSize: '0.8rem', color: '#166534', margin: '0.1rem 0 0', fontWeight: '500', opacity: 0.9 }}>Protocols established and validated.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {formData.selectedCoverages.map((coverage) => (
                <div key={coverage.id} className="verified-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="status-indicator"></div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>{coverage.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IDENTITY VALIDATED</div>
                    </div>
                  </div>
                  <span className="status-badge">PASSED</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        const subtotal = formData.selectedCoverages.reduce((sum, c) => sum + c.price, 0);
        const insuranceCoverage = subtotal * 0.8;
        const patientPays = subtotal - insuranceCoverage;
        return (
          <div className="card auth-card" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>Financial <span style={{ color: 'var(--primary)' }}>Matrix</span></h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.15rem' }}>Structural analysis of clinical participation.</p>
            </div>
            <div className="maint-table-container" style={{ padding: '0', margin: 0, width: '100%' }}>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F1F5F9', color: 'var(--text-secondary)' }}>
                    <th style={{ fontSize: '0.75rem', padding: '0.75rem 1.25rem' }}>SERVICE</th>
                    <th style={{ textAlign: 'right', fontSize: '0.75rem', padding: '0.75rem 1.25rem' }}>BASE</th>
                    <th style={{ textAlign: 'right', fontSize: '0.75rem', padding: '0.75rem 1.25rem' }}>PROVIDER (80%)</th>
                    <th style={{ textAlign: 'right', fontSize: '0.75rem', padding: '0.75rem 1.25rem' }}>MEMBER</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.selectedCoverages.map((coverage, idx) => (
                    <tr key={coverage.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td data-label="SERVICE" style={{ fontWeight: '600', fontSize: '0.85rem', padding: '0.75rem 1.25rem' }}>{coverage.name}</td>
                      <td data-label="BASE" style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0.75rem 1.25rem' }}>${coverage.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td data-label="PROVIDER (80%)" style={{ textAlign: 'right', color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', padding: '0.75rem 1.25rem' }}>-${(coverage.price * 0.8).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td data-label="MEMBER" style={{ textAlign: 'right', fontWeight: '700', fontSize: '0.85rem', padding: '0.75rem 1.25rem' }}>${(coverage.price * 0.2).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white' }}>
                <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Gross Total:</span>
                    <span style={{ fontWeight: '600' }}>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Coverage:</span>
                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>-${insuranceCoverage.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0.25rem 0' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>Final Settlement:</span>
                    <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.5rem', lineHeight: '1' }}>${patientPays.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        const finalAmount = formData.selectedCoverages.reduce((sum, c) => sum + (c.price * 0.2), 0);
        return (
          <div className="auth-grid-2" style={{ animation: 'scaleUp 0.3s ease' }}>
            <div className="card auth-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)', display: 'flex' }}>
                  <CreditCard size={18} />
                </div>
                PAYMENT DETAILS
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div className="filter-group">
                  <label className="filter-label">COMMANDER NAME</label>
                  <input type="text" className="custom-input" placeholder="Name on Card" />
                </div>
                <div className="filter-group">
                  <label className="filter-label">CREDENTIAL NUMBER</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" className="custom-input" placeholder="0000 0000 0000 0000" style={{ paddingRight: '3rem', letterSpacing: '0.05em' }} />
                    <CreditCard size={16} color="var(--text-muted)" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>
                <div className="auth-grid-2" style={{ gap: '1.25rem' }}>
                  <div className="filter-group">
                    <label className="filter-label">EXPIRATION</label>
                    <input type="text" className="custom-input" placeholder="MM/YY" />
                  </div>
                  <div className="filter-group">
                    <label className="filter-label">CVV</label>
                    <input type="password" className="custom-input" placeholder="***" />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--primary-dark)', color: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden', border: '1px solid var(--primary)' }}>
               <h3 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '1.5rem', color: '#2DD4BF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Validation Summary</h3>
               <div style={{ display: 'grid', gap: '1.25rem' }}>
                 <div className="summary-row">
                   <span className="summary-label">PROVIDER HUB</span>
                   <span className="summary-value">{formData.insurance.toUpperCase() || 'N/A'}</span>
                 </div>
                 <div className="summary-row">
                   <span className="summary-label">MEMBER PROTOCOL</span>
                   <span className="summary-value">{formData.affiliateCode || 'PENDING'}</span>
                 </div>
                 <div className="summary-row">
                   <span className="summary-label">SYNCHRONIZED CORE</span>
                   <span className="summary-value">{formData.selectedCoverages.length} Services</span>
                 </div>
                 <div style={{ margin: '0.75rem 0 1.5rem', padding: '1.25rem', backgroundColor: 'rgba(13, 148, 136, 0.15)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(13, 148, 136, 0.3)', textAlign: 'center' }}>
                   <span style={{ display: 'block', color: '#94A3B8', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.25rem', letterSpacing: '0.1em' }}>TOTAL SETTLEMENT</span>
                   <span style={{ display: 'block', fontWeight: '800', color: '#2DD4BF', fontSize: '2rem', lineHeight: '1' }}>${finalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: '#94A3B8', justifyContent: 'center', fontWeight: '600' }}>
                   <Lock size={14} color="#2DD4BF" />
                   <span>SECURE QUANTUM ENCRYPTION ACTIVE</span>
                 </div>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="authorization-page" style={{ padding: '1.5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="page-header">
          <div className="page-header-left">
            {currentStep > 1 && (
              <button onClick={() => setCurrentStep(currentStep - 1)} className="back-btn">
                <ChevronLeft size={18} />
              </button>
            )}
            <div>
              <h2 className="page-title">Affiliate <span style={{ color: 'var(--primary)' }}>Validation</span></h2>
              <p className="page-subtitle">Real-time systemic eligibility synchronization.</p>
            </div>
          </div>
          <div className="page-header-actions">
            {currentStep < 5 ? (
              <button className="btn-primary btn-lg compact-btn" onClick={handleContinue} disabled={isProcessing}>
                {isProcessing ? 'SYNCHRONIZING...' : 'PROCEED'}
                {!isProcessing && <ArrowRight size={16} />}
              </button>
            ) : (
              <button className="btn-primary btn-lg compact-btn" style={{ backgroundColor: '#10B981', border: 'none' }} onClick={() => alert('Authorized!')}>
                FINALIZE
                <CheckCircle2 size={16} style={{ marginLeft: '0.5rem' }} />
              </button>
            )}
          </div>
        </div>

        {/* Improved Progress Tracker - Refined */}
        <div className="progress-container">
          {steps.map((step, index) => {
            const isActive = currentStep === index + 1;
            const isCompleted = currentStep > index + 1;
            return (
              <div
                key={index}
                onClick={() => isCompleted && setCurrentStep(index + 1)}
                className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                style={{
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? 'white' : isCompleted ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: isCompleted ? 'pointer' : 'default',
                }}
              >
                <div className={`step-indicator ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  {isCompleted ? <CheckCircle2 size={10} /> : index + 1}
                </div>
                <span className="step-label">{step.toUpperCase()}</span>
              </div>
            );
          })}
        </div>

        <div style={{ minHeight: '380px' }}>
          {renderStepContent()}
        </div>
      </div>

      <style>{`
        .spin-animation { animation: spin 1s linear infinite; }
        
        .back-btn {
          background-color: white;
          border: 1px solid var(--border);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .back-btn:hover { border-color: var(--primary); color: var(--primary); transform: translateX(-2px); }

        .page-title {
           margin: 0;
           font-size: 1.5rem;
           font-weight: 800;
           color: var(--text-main);
           letter-spacing: -0.03em;
           line-height: 1.1;
        }

        .page-subtitle {
           color: var(--text-muted);
           margin: 0.15rem 0 0;
           font-size: 0.85rem;
           font-weight: 500;
        }

        .compact-btn {
           height: 40px !important;
           padding: 0 1.25rem !important;
           font-size: 0.9rem !important;
           font-weight: 700 !important;
        }
        
        .coverage-card {
           padding: 1.25rem;
           border-radius: var(--radius-lg);
           background-color: white;
           cursor: pointer;
           transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
           position: relative;
           display: flex;
           flex-direction: column;
           gap: 0.75rem;
           border: 1px solid var(--border);
        }

        .coverage-card:hover { 
           border-color: var(--primary); 
           transform: translateY(-2px); 
           box-shadow: var(--shadow-sm); 
        }

        .coverage-card.selected {
           border: 2px solid var(--primary);
           background-color: var(--primary-light);
           box-shadow: var(--shadow-sm);
        }

        .check-icon {
           position: absolute;
           top: 0.75rem;
           right: 0.75rem;
           color: var(--primary);
           animation: scaleIn 0.2s ease;
        }

        .coverage-title {
           font-weight: 700;
           font-size: 0.95rem;
           color: var(--text-main);
           margin-bottom: 0.35rem;
           padding-right: 1.5rem;
           line-height: 1.3;
        }

        .coverage-tag {
           font-size: 0.65rem;
           padding: 0.2rem 0.5rem;
           border-radius: var(--radius-sm);
           border: 1px solid;
           font-weight: 600;
        }

        .coverage-tag.code {
           background-color: var(--bg-main);
           color: var(--text-muted);
           border-color: var(--border);
        }

        .coverage-tag.category {
           background-color: var(--bg-main);
           color: var(--primary);
           border-color: #CCFBF1;
        }

        .coverage-price {
           font-weight: 800;
           color: var(--primary);
           font-size: 1.1rem;
        }
        
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
        
        .pulse-ring { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        /* Layout Classes */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .page-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .page-header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .auth-grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .auth-grid-fill {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
        }

        .auth-header-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .selected-badge {
          background-color: var(--primary-light);
          color: var(--primary);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.75rem;
          border: 1px solid #CCFBF1;
        }

        .verification-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1rem 1.25rem;
          background-color: #F0FDF4;
          border-radius: var(--radius-lg);
          border: 1px solid #DCFCE7;
        }

        .verified-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background-color: white;
          flex-wrap: wrap;
          gap: 0.75rem;
          transition: border-color 0.2s;
        }
        
        .verified-item:hover {
            border-color: var(--primary);
        }

        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #22C55E;
        }

        .status-badge {
          background-color: #F0FDF4;
          color: #166534;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
          font-weight: 800;
          border: 1px solid #DCFCE7;
          letter-spacing: 0.05em;
        }

        .progress-container {
          margin-bottom: 2.5rem;
          display: flex;
          gap: 0.35rem;
          background-color: var(--bg-main);
          padding: 0.35rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          max-width: 900px;
          margin: 0 auto 2.5rem;
          overflow-x: auto;
        }

        .progress-step {
          flex: 1;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          white-space: nowrap;
          cursor: default;
          min-width: 100px;
        }
        
        .step-indicator {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          background-color: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .step-indicator.active {
            background-color: rgba(255,255,255,0.25);
            color: white;
        }

        .step-indicator.completed {
            background-color: var(--primary-light);
            color: var(--primary);
        }

        .step-label {
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.03em;
        }

        .info-box {
            padding: 1rem;
            border: 1px solid #BAE6FD;
            border-radius: var(--radius-md);
            background-color: #F0F9FF;
            display: flex;
            gap: 0.75rem;
            align-items: flex-start;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 0.6rem;
        }

        .summary-label {
            color: #94A3B8;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.02em;
        }

        .summary-value {
             font-weight: 700;
             font-size: 0.9rem;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .authorization-page { padding: 1rem !important; }
          
          .page-header { 
            flex-direction: column; 
            align-items: stretch; 
            gap: 1.25rem; 
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .page-header-left {
            flex-direction: column;
            width: 100%;
            align-items: center;
            gap: 0.75rem;
          }

          .page-header-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .page-title { fontSize: 1.35rem !important; }
          
          .btn-primary { width: 100% !important; justify-content: center; }

          .auth-card { padding: 1.25rem !important; }

          .auth-grid-2, .auth-grid-fill {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          
          /* Step Progress Scroll */
          .progress-container {
            justify-content: flex-start;
          }
          
          .progress-step {
            min-width: 110px;
            padding: 0.5rem;
          }

          .verification-header {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
            padding: 1rem;
          }

          .verified-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .verified-item > div {
            width: 100%;
          }
          
          .status-badge {
            align-self: flex-start;
          }

          .maint-table-container {
             padding: 0 !important;
          }

          /* Force stack for complex grids */
          div[style*="grid-template-columns: 1fr 1fr"] {
             grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Authorizations;
