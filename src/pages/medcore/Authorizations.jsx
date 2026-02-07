import React from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { Lock, ArrowRight } from 'lucide-react';

const Authorizations = () => {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h2 className="page-title">Affiliate Validation</h2>
        <div className="action-buttons">
          <button className="btn-validate">
            <Lock size={16} />
            VALIDATE
          </button>
          <button className="btn-continue">
            CONTINUE
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Chevron-style Progress Bar */}
      <div className="step-bar">
        <div className="step active">Validation</div>
        <div className="step">Coverage Selection</div>
        <div className="step">Validate rules</div>
        <div className="step">Check prices</div>
        <div className="step">Pay</div>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label>Insurance</label>
          <select className="custom-select">
            <option>Choosing an insurance company ...</option>
            <option>Humano</option>
            <option>Senasa</option>
            <option>Universal</option>
          </select>
        </div>

        <div className="form-group">
          <label>Affiliate Code</label>
          <input
            type="text"
            className="custom-input"
            placeholder="Membership Card"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Authorizations;
