import React, { useRef } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { FileSpreadsheet, Upload, Download } from 'lucide-react';

const UploadExcel = () => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}. Starting upload process...`);
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2 className="page-title">Bulk Upload (Excel)</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '3rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#FFF7ED', color: '#F28C28', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Upload size={32} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0B3B3C', marginBottom: '0.5rem' }}>Upload File</h2>
          <p style={{ color: '#6B7280', marginBottom: '2rem', fontSize: '0.9rem' }}>Drag and drop your Excel file here or click to browse</p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx, .csv"
            style={{ display: 'none' }}
          />

          <div
            onClick={handleUploadClick}
            style={{ border: '2px dashed #E5E7EB', borderRadius: '12px', padding: '2rem', backgroundColor: '#F9FAFB', marginBottom: '2rem', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <FileSpreadsheet size={48} style={{ margin: '0 auto 1rem', color: '#D1D5DB' }} />
            <span style={{ color: '#0B3B3C', fontWeight: '700', display: 'block' }}>Select .xlsx or .csv</span>
          </div>

          <button className="btn-continue" style={{ width: '100%', justifyContent: 'center' }} onClick={handleUploadClick}>
            <Upload size={18} />
            START IMPORT
          </button>
        </div>

        <div className="card" style={{ padding: '3rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0B3B3C', marginBottom: '1rem' }}>Instructions & Templates</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#4B5563' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#0B3B3C', color: 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '700' }}>1</div>
              <p>Download the standard template for the type of data you wish to upload.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#0B3B3C', color: 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '700' }}>2</div>
              <p>Fill in all required fields marked with an asterisk (*).</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#0B3B3C', color: 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '700' }}>3</div>
              <p>Ensure date formats match DD/MM/YYYY.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{ width: '100%', backgroundColor: 'white', border: '1px solid #E5E7EB', color: '#0B3B3C', padding: '0.8rem', borderRadius: '4px', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <Download size={16} />
              Download Doctor Template
            </button>
            <button style={{ width: '100%', backgroundColor: 'white', border: '1px solid #E5E7EB', color: '#0B3B3C', padding: '0.8rem', borderRadius: '4px', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <Download size={16} />
              Download Patient Template
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadExcel;
