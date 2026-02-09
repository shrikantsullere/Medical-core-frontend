import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Lock, ArrowRight, CheckCircle2, CreditCard, Search, Info, Loader2, AlertCircle } from 'lucide-react';

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
    'Coverage Selection',
    'Validate rules',
    'Check prices',
    'Pay'
  ];

  const handleContinue = () => {
    if (currentStep === 1 && (!formData.insurance || !formData.affiliateCode)) {
      alert('Please fill in all fields before continuing.');
      return;
    }

    if (currentStep === 2 && formData.selectedCoverages.length === 0) {
      alert('Please select at least one service.');
      return;
    }

    if (currentStep < 5) {
      if (currentStep === 2) {
        // Simulate validation when moving from Selection to Rules
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep(currentStep + 1);
        }, 1500);
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          <Loader2 className="animate-spin" size={48} color="var(--med-orange)" />
          <p style={{ marginTop: '1rem', fontWeight: '600', color: '#64748B' }}>Validating coverage rules against insurance policy...</p>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="form-section">
            <div className="form-group">
              <label>Insurance</label>
              <select
                className="custom-select"
                value={formData.insurance}
                onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
              >
                <option value="">Choosing an insurance company ...</option>
                <option value="Humano">Humano</option>
                <option value="Senasa">Senasa</option>
                <option value="Universal">Universal</option>
                <option value="Mapfre">Mapfre</option>
              </select>
            </div>

            <div className="form-group">
              <label>Affiliate Code</label>
              <input
                type="text"
                className="custom-input"
                placeholder="Membership Card Number"
                value={formData.affiliateCode}
                onChange={(e) => setFormData({ ...formData, affiliateCode: e.target.value })}
              />
            </div>

            <div style={{ flex: 1, padding: '1rem', border: '1px solid #E2E8F0', borderRadius: '4px', backgroundColor: '#F8FAFC', display: 'flex', gap: '1rem', height: 'fit-content' }}>
              <Info color="#3B82F6" size={24} style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Validation Info</h4>
                <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.4' }}>
                  Please enter the affiliate code exactly as it appears on the insurance card to avoid authorization delays.
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="search-container" style={{ maxWidth: '500px', margin: 0 }}>
                <div className="search-label">Service Search</div>
                <div className="search-input-wrapper">
                  <input type="text" className="search-input" placeholder="Search by name or code..." />
                  <div className="search-icons">
                    <button className="search-icon-btn"><Search size={18} /></button>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--med-orange)' }}>
                {formData.selectedCoverages.length} Services Selected
              </div>
            </div>

            <div className="coverage-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {mockCoverages.map(coverage => (
                <div
                  key={coverage.id}
                  className={`coverage-card ${formData.selectedCoverages.find(c => c.id === coverage.id) ? 'selected' : ''}`}
                  onClick={() => toggleCoverage(coverage)}
                  style={{
                    padding: '1.2rem',
                    border: '2px solid',
                    borderRadius: '8px',
                    backgroundColor: formData.selectedCoverages.find(c => c.id === coverage.id) ? '#FDF2E7' : 'white',
                    borderColor: formData.selectedCoverages.find(c => c.id === coverage.id) ? 'var(--med-orange)' : 'var(--med-border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    boxShadow: formData.selectedCoverages.find(c => c.id === coverage.id) ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                  }}
                >
                  {formData.selectedCoverages.find(c => c.id === coverage.id) && (
                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'var(--med-orange)', borderRadius: '50%', color: 'white', padding: '2px' }}>
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                  <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.3rem', color: '#1F2937' }}>{coverage.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', display: 'flex', gap: '1rem' }}>
                    <span>Code: <span style={{ fontWeight: '600' }}>{coverage.code}</span></span>
                    <span>Category: <span style={{ fontWeight: '600' }}>{coverage.category}</span></span>
                  </div>
                  <div style={{ marginTop: '0.8rem', fontWeight: '700', color: 'var(--med-orange)' }}>${coverage.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: '#10B981', padding: '0.5rem', borderRadius: '8px' }}>
                <CheckCircle2 color="white" size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>Rules Verification</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>All services have been cross-checked with the insurance policy.</p>
              </div>
            </div>

            <div className="validation-grid" style={{ display: 'grid', gap: '1rem' }}>
              {formData.selectedCoverages.map((coverage, idx) => (
                <div key={coverage.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.2rem',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{coverage.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Eligibility confirmed • No prior authorization required</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: '700' }}>VALID</span>
                  </div>
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
          <div className="step-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Pricing & Coverage Breakdown</h3>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--med-border)', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div className="maint-table-container">
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px' }}>
                  <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                    <tr>
                      <th style={{ padding: '1.2rem', fontSize: '0.75rem', fontWeight: '800', color: '#374151' }}>DESCRIPTION</th>
                      <th style={{ padding: '1.2rem', fontSize: '0.75rem', fontWeight: '800', color: '#374151', textAlign: 'right' }}>BASE PRICE</th>
                      <th style={{ padding: '1.2rem', fontSize: '0.75rem', fontWeight: '800', color: '#374151', textAlign: 'right' }}>COV (80%)</th>
                      <th style={{ padding: '1.2rem', fontSize: '0.75rem', fontWeight: '800', color: '#374151', textAlign: 'right' }}>CO-PAY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.selectedCoverages.map(coverage => (
                      <tr key={coverage.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '1.2rem', fontSize: '0.9rem', fontWeight: '600' }}>{coverage.name}</td>
                        <td style={{ padding: '1.2rem', fontSize: '0.9rem', textAlign: 'right', color: '#6B7280' }}>${coverage.price.toFixed(2)}</td>
                        <td style={{ padding: '1.2rem', fontSize: '0.9rem', textAlign: 'right', color: '#10B981' }}>-${(coverage.price * 0.8).toFixed(2)}</td>
                        <td style={{ padding: '1.2rem', fontSize: '0.9rem', textAlign: 'right', fontWeight: '700' }}>${(coverage.price * 0.2).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: '2rem', backgroundColor: '#F8FAFC', borderTop: '2px solid #E5E7EB' }}>
                <div style={{ maxWidth: '300px', marginLeft: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#6B7280' }}>Gross Amount:</span>
                    <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#6B7280' }}>Insurance Coverage:</span>
                    <span style={{ fontWeight: '600', color: '#10B981' }}>-${insuranceCoverage.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                    <span style={{ fontWeight: '800', fontSize: '1rem' }}>Total To Pay:</span>
                    <span style={{ fontWeight: '900', color: 'var(--med-orange)', fontSize: '1.2rem' }}>${patientPays.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        const finalAmount = formData.selectedCoverages.reduce((sum, c) => sum + (c.price * 0.2), 0);
        return (
          <div className="step-content auth-flex-container">
            <div className="auth-flex-item" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--med-border)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Billing Information</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="form-group" style={{ maxWidth: '100%' }}>
                  <label>Credit/Debit Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" className="custom-input" placeholder="0000 0000 0000 0000" />
                    <CreditCard size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Expiry Date</label>
                    <input type="text" className="custom-input" placeholder="MM/YY" />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>CVV</label>
                    <input type="text" className="custom-input" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>

            <div className="auth-summary-card" style={{ backgroundColor: '#1F2937', color: 'white', padding: '2rem', borderRadius: '12px', height: 'fit-content' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#F8A359' }}>Order Summary</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#9CA3AF' }}>Policy Holder</span>
                  <span>MARIA RODRIGUEZ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#9CA3AF' }}>Insurance Corp</span>
                  <span>{formData.insurance}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#9CA3AF' }}>Total Items</span>
                  <span>{formData.selectedCoverages.length}</span>
                </div>
                <div style={{ margin: '1rem 0', padding: '1rem 0', borderTop: '1px solid #374151', borderBottom: '1px solid #374151' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700' }}>Total Amount</span>
                    <span style={{ fontWeight: '900', color: '#F8A359', fontSize: '1.4rem' }}>${finalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#9CA3AF' }}>
                  <Lock size={12} />
                  Secure Encrypted Payment
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
      <div className="page-header">
        <h2 className="page-title">Affiliate Validation</h2>
        <div className="action-buttons">
          {currentStep === 1 && (
            <button className="btn-validate">
              <Lock size={16} />
              VALIDATE
            </button>
          )}
          {currentStep < 5 ? (
            <button
              className="btn-continue"
              onClick={handleContinue}
              disabled={isProcessing}
              style={{ opacity: isProcessing ? 0.7 : 1 }}
            >
              {isProcessing ? 'Verifying...' : 'CONTINUE'}
              {!isProcessing && <ArrowRight size={18} />}
            </button>
          ) : (
            <button className="btn-continue" style={{ backgroundColor: '#10B981' }} onClick={() => alert('Authorization Completed Successfully!')}>
              COMPLETE PAYMENT
              <CheckCircle2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Chevron-style Progress Bar */}
      <div className="step-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${currentStep === index + 1 ? 'active' : ''}`}
            onClick={() => index + 1 < currentStep && setCurrentStep(index + 1)}
            style={{ cursor: index + 1 < currentStep ? 'pointer' : 'default' }}
          >
            {step}
          </div>
        ))}
      </div>

      <div style={{ minHeight: '400px' }}>
        {renderStepContent()}
      </div>

      {currentStep > 1 && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          style={{
            marginTop: '2rem',
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Back to Previous Step
        </button>
      )}
    </DashboardLayout>
  );
};

export default Authorizations;
