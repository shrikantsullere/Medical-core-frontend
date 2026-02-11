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
      <div className="upload-excel-page" style={{ padding: '2rem', animation: 'fadeIn 0.4s ease-out', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 className="page-title" style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.025em' }}>Intelligence <span style={{ color: 'var(--primary)' }}>Synchronization</span></h2>
            <p style={{ color: 'var(--text-muted)', margin: '0.4rem 0 0', fontSize: '0.95rem', fontWeight: '500' }}>Streamline clinical database management.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn-secondary" onClick={() => window.history.back()}>
              <X size={18} /> ABORT
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Main Upload Card */}
          <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {uploadStatus === 'success' ? (
              <div className="success-state" style={{ animation: 'modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)', width: '100%' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '4px solid white', boxShadow: 'var(--shadow-md)' }}>
                  <CheckCircle2 size={40} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Synchronization Complete</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}><strong>{file?.name}</strong> successfully integrated.</p>

                <div style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700' }}>RECORDS COMMITTED</span>
                    <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1rem' }}>142</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700' }}>With Errors</span>
                    <span style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '1rem' }}>0</span>
                  </div>
                </div>

                <button className="btn-primary btn-lg" style={{ width: '100%' }} onClick={resetUpload}>
                  INITIALIZE NEW UPLOAD
                </button>
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <div style={{ width: '70px', height: '70px', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--border)' }}>
                  {uploadStatus === 'uploading' ? <RotateCcw size={28} className="spinning" /> : <Upload size={28} />}
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {uploadStatus === 'uploading' ? 'Analyzing Dataset...' : 'Select Source Material'}
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>Select a structured Excel or CSV schema.</p>

                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx, .csv" style={{ display: 'none' }} />

                {!file ? (
                  <div onClick={handleUploadClick} style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)', padding: '3rem 1.5rem', backgroundColor: 'var(--bg-main)', marginBottom: '2rem', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="hover-upload-zone">
                    <FileSpreadsheet size={48} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} className="icon-pulse" />
                    <span style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1.1rem' }}>Click to Browse Repository</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Supports .XLSX, .CSV</span>
                  </div>
                ) : (
                  <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', backgroundColor: 'white', marginBottom: '2rem', position: 'relative', boxShadow: 'var(--shadow-sm)' }}>
                    {uploadStatus === 'idle' && (
                      <button onClick={resetUpload} style={{ position: 'absolute', top: '12px', right: '12px', border: 'none', background: 'var(--bg-main)', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }} className="hover-scale">
                        <X size={16} />
                      </button>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: uploadStatus === 'uploading' ? '1.5rem' : '0' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FileCheck size={24} />
                      </div>
                      <div style={{ textAlign: 'left', minWidth: 0 }}>
                        <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', margin: 0, wordBreak: 'break-all' }}>{file.name}</p>
                        <p style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', marginTop: '0.2rem' }}>{(file.size / 1024).toFixed(2)} KB • VALIDATED</p>
                      </div>
                    </div>

                    {uploadStatus === 'uploading' && (
                      <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-main)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--primary)', transition: 'width 0.4s ease', borderRadius: '100px' }}></div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  className="btn-primary"
                  style={{ width: '100%', height: '52px', fontSize: '1rem', fontWeight: '800', pointerEvents: !file || uploadStatus === 'uploading' ? 'none' : 'auto', opacity: !file || uploadStatus === 'uploading' ? 0.5 : 1 }}
                  onClick={startImport}
                  disabled={!file || uploadStatus === 'uploading'}
                >
                  {uploadStatus === 'uploading' ? 'PROCESSING...' : 'EXECUTE SYNCHRONIZATION'}
                </button>
              </div>
            )}
          </div>

          {/* Guidelines and Templates Card */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}><AlertCircle size={20} color="var(--primary)" /></div>
              Operational Guidelines
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: 'var(--primary-dark)', color: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700', flexShrink: 0 }}>01</div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--text-main)', fontWeight: '700' }}>Prepare Schema</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Acquire standard templates to ensure headers synchronize with system architecture.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: 'var(--primary-dark)', color: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700', flexShrink: 0 }}>02</div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--text-main)', fontWeight: '700' }}>Protocol Validation</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Incorporate all mandatory clinical metadata. Our engine validates entry schemas.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: 'var(--primary-dark)', color: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700', flexShrink: 0 }}>03</div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--text-main)', fontWeight: '700' }}>Batch Integration</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Initiate the finalized dataset synchronization. Validated records are indexed.</p>
                </div>
              </div>
            </div>

            <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Standard Architectural Templates</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <button className="template-row"><Download size={18} /> PERSONNEL MASTER SCHEMA</button>
              <button className="template-row"><Download size={18} /> PATIENT IDENTITY LEDGER</button>
              <button className="template-row"><Download size={18} /> INFRASTRUCTURE TOPOLOGY</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-upload-zone:hover { border-color: var(--primary) !important; background-color: var(--primary-light) !important; }
        .hover-upload-zone:hover .icon-pulse { transform: scale(1.1) rotate(5deg); color: var(--primary) !important; }
        .template-row { width: 100%; display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background-color: white; border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); cursor: pointer; transition: all 0.2s ease; }
        .template-row:hover { border-color: var(--primary); color: var(--primary); transform: translateX(4px); background-color: var(--primary-light); }
        .spinning { animation: spin 2s linear infinite; }
        .hover-scale:hover { transform: scale(1.1); }
        .icon-pulse { transition: all 0.4s ease; }
        @keyframes spin { 100% { transform: rotate(-360deg); } }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(50px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 768px) {
          .upload-excel-page { 
            padding: 1rem !important; 
            overflow-x: hidden !important; 
            width: 100% !important; 
            max-width: 100vw !important;
            margin: 0 !important;
          }
          
          /* Force grid to single column and control spacing */
          div[style*="gridTemplateColumns"] { 
            grid-template-columns: 1fr !important; 
            gap: 1.5rem !important;
            width: 100% !important;
            margin: 0 !important;
          }
          
          /* Header Adjustments */
          .page-header { 
            flex-direction: column !important; 
            align-items: center !important; 
            gap: 1rem !important; 
            margin-bottom: 2rem !important; 
            text-align: center;
            width: 100% !important;
          }
          .page-header > div { width: 100% !important; }
          
          /* Typography Resizing */
          .page-title { fontSize: 1.5rem !important; line-height: 1.2; }
          
          /* Card Adjustments */
          .card { 
            padding: 1.5rem !important; 
            border-radius: var(--radius-lg) !important;
            width: 100% !important;
            margin: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important; /* Center content */
          }
          
          /* Upload Zone Adjustments - Center everything */
          .hover-upload-zone { 
            padding: 3rem 1rem !important; 
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }
          
          /* Ensure buttons and inputs don't overflow */
          .btn-secondary, .btn-primary, .custom-input, select, .template-row { 
            width: 100% !important; 
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          
          /* Template Row Adjustments */
          .template-row { 
            padding: 0.9rem !important; 
            font-size: 0.85rem !important;
            flex-direction: row !important; /* Keep side-by-side if possible */
            justify-content: flex-start !important;
            text-align: left !important;
          }

          /* Global Safety for this page */
          * { 
            max-width: 100% !important; 
            box-sizing: border-box !important; 
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default UploadExcel;
