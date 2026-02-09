import React, { useRef, useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { FileSpreadsheet, Upload, Download, CheckCircle2, AlertCircle, X, FileCheck, RotateCcw, Check } from 'lucide-react';

const UploadExcel = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle | uploading | success | error
  const [progress, setProgress] = useState(0);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus('idle');
      setProgress(0);
    }
  };

  const startImport = () => {
    if (!file) return;

    setUploadStatus('uploading');
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 30;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setUploadStatus('success');
      }
      setProgress(currentProgress);
    }, 400);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus('idle');
    setProgress(0);
  };

  return (
    <DashboardLayout>
      <div className="branch-header" style={{ padding: '1rem 2rem' }}>
        <h1 className="main-title">Bulk Data Import</h1>
        <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555', fontSize: '0.9rem' }}>
          <FileSpreadsheet size={16} />
          <span>Import Management / Excel Upload</span>
        </div>
        <div className="orange-divider" style={{ width: '100%', height: '1px', backgroundColor: '#F28C28', marginTop: '1rem' }}></div>
      </div>

      <div className="card-container" style={{ padding: '0 2rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {/* Upload Card */}
        <div className="branch-card" style={{ textAlign: 'center', padding: '3rem' }}>
          {uploadStatus === 'success' ? (
            <div className="success-view bounce-in">
              <div style={{ width: '80px', height: '80px', backgroundColor: '#ECFDF5', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <CheckCircle2 size={40} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0B3B3C', marginBottom: '0.5rem' }}>Import Complete!</h2>
              <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Your file <strong>{file?.name}</strong> has been successfully processed.</p>

              <div style={{ backgroundColor: '#F9FAFB', borderRadius: '8px', padding: '1.2rem', textAlign: 'left', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#4B5563' }}>Records Processed:</span>
                  <span style={{ fontWeight: '700', color: '#0B3B3C' }}>142</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: '#4B5563' }}>Errors Found:</span>
                  <span style={{ fontWeight: '700', color: '#10B981' }}>0</span>
                </div>
              </div>

              <button className="btn-add-orange" style={{ width: '100%', justifyContent: 'center' }} onClick={resetUpload}>
                UPLOAD ANOTHER FILE
              </button>
            </div>
          ) : (
            <>
              <div style={{ width: '80px', height: '80px', backgroundColor: uploadStatus === 'uploading' ? '#EFF6FF' : '#FFF7ED', color: uploadStatus === 'uploading' ? '#3B82F6' : '#F28C28', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                {uploadStatus === 'uploading' ? <RotateCcw className="spinning" size={32} /> : <Upload size={32} />}
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0B3B3C', marginBottom: '0.5rem' }}>
                {uploadStatus === 'uploading' ? 'Importing Data...' : 'Upload Excel File'}
              </h2>
              <p style={{ color: '#6B7280', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                Quickly add multiple records to your database.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx, .csv"
                style={{ display: 'none' }}
              />

              {!file ? (
                <div
                  onClick={handleUploadClick}
                  className="upload-dropzone"
                  style={{ border: '2px dashed #D1D5DB', borderRadius: '12px', padding: '3rem 2rem', backgroundColor: '#F9FAFB', marginBottom: '2.5rem', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <FileSpreadsheet size={50} style={{ marginBottom: '1rem', color: '#9CA3AF' }} />
                  <span style={{ color: '#374151', fontWeight: '700', fontSize: '1rem' }}>Click or Drag File Here</span>
                  <span style={{ color: '#9CA3AF', fontSize: '0.8rem', marginTop: '0.5rem' }}>Supports .xlsx, .xls and .csv</span>
                </div>
              ) : (
                <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#FDFCFB', marginBottom: '2.5rem', position: 'relative' }}>
                  {uploadStatus === 'idle' && (
                    <button onClick={resetUpload} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                      <X size={18} />
                    </button>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: uploadStatus === 'uploading' ? '1rem' : '0' }}>
                    <div style={{ width: '45px', height: '45px', backgroundColor: '#F28C28', color: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileCheck size={24} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0B3B3C', margin: 0, wordBreak: 'break-all' }}>{file.name}</p>
                      <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0 }}>{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>

                  {uploadStatus === 'uploading' && (
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#F28C28', transition: 'width 0.3s' }}></div>
                    </div>
                  )}
                </div>
              )}

              <button
                className="btn-add-orange"
                style={{ width: '100%', justifyContent: 'center', height: '50px', opacity: !file || uploadStatus === 'uploading' ? 0.6 : 1, cursor: !file || uploadStatus === 'uploading' ? 'not-allowed' : 'pointer' }}
                onClick={startImport}
                disabled={!file || uploadStatus === 'uploading'}
              >
                {uploadStatus === 'uploading' ? 'PROCESSING...' : (
                  <>
                    <Check size={20} /> START IMPORT PROCESS
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Info Card */}
        <div className="branch-card" style={{ padding: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0B3B3C', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <AlertCircle color="#F28C28" /> Guidelines
          </h2>

          <div className="guide-steps" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem', color: '#4B5563', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="step-num">1</div>
              <div>
                <strong style={{ display: 'block', color: '#0B3B3C' }}>Select Category</strong>
                <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}>Choose the type of data you want to import to download the correct template.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="step-num">2</div>
              <div>
                <strong style={{ display: 'block', color: '#0B3B3C' }}>Fill the Template</strong>
                <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}>Required fields are marked in the header. Do not change the column order.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="step-num">3</div>
              <div>
                <strong style={{ display: 'block', color: '#0B3B3C' }}>Verify & Upload</strong>
                <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}>Upload the saved file and wait for our system to validate the entries.</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0B3B3C', marginBottom: '0.5rem' }}>Download Templates</h3>
            <button className="template-btn">
              <Download size={18} /> Doctor Import Template
            </button>
            <button className="template-btn">
              <Download size={18} /> Patient Import Template
            </button>
            <button className="template-btn">
              <Download size={18} /> Branch Import Template
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .main-title { font-size: 2.2rem; color: #333; font-weight: 500; margin-bottom: 0.5rem; }
        .branch-card { background-color: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); }
        .upload-dropzone:hover { border-color: #F28C28 !important; background-color: #FFF7ED !important; }
        .btn-add-orange { background-color: #F28C28; color: white; border: none; padding: 0.8rem 1.8rem; border-radius: 4px; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; text-transform: uppercase; font-size: 0.95rem; }
        .btn-add-orange:hover:not(:disabled) { background-color: #e07b1c; transform: translateY(-1px); }
        .step-num { width: 28px; height: 28px; background-color: #0B3B3C; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; }
        .template-btn { width: 100%; text-align: left; background-color: #F9FAFB; border: 1px solid #E5E7EB; color: #374151; padding: 1rem; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 1rem; transition: background 0.2s; }
        .template-btn:hover { background-color: #F3F4F6; }
        .spinning { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(-360deg); } }
        .bounce-in { animation: bounceIn 0.8s ease; }
        @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); } }
      `}</style>
    </DashboardLayout>
  );
};

export default UploadExcel;
