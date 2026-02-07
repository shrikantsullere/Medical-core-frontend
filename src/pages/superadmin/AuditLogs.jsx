import React, { useState } from 'react';
import { History, Search, Filter, Download, Eye, ShieldCheck, Terminal } from 'lucide-react';
import { SectionHeader } from '../../components/DashboardElements';
import { RECENT_LOGS } from '../../data/mockData';
import Drawer from '../../components/Drawer.jsx';

const AuditLogs = () => {
  const [selectedLog, setSelectedLog] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = RECENT_LOGS.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewLog = (log) => {
    setSelectedLog(log);
    setIsDrawerOpen(true);
  };

  return (
    <div className="fade-in">
      <SectionHeader
        title="Registros de Auditoría"
        desc="Rastree todas las actividades del sistema y eventos de seguridad."
        actionLabel="Exportar Registros"
        onAction={() => alert('Exportando registros a CSV...')}
      />

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar registros por usuario, acción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)' }}
            />
          </div>
          <button style={{ height: '44px', padding: '0 1rem', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
            <Filter size={18} /> Filtros
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Rol</th>
              <th>Acción</th>
              <th>Módulo</th>
              <th>Fecha y Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td data-label="Nombre de Usuario"><b>{log.user}</b></td>
                <td data-label="Rol"><span className="badge badge-blue">{log.role}</span></td>
                <td data-label="Acción">{log.action}</td>
                <td data-label="Módulo">{log.module}</td>
                <td data-label="Fecha" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{log.date}</td>
                <td data-label="Acciones">
                  <button className="action-btn" title="Ver Detalle" onClick={() => { handleViewLog(log); }} style={{ backgroundColor: 'var(--bg-sidebar)' }}><Eye size={18} color="var(--primary)" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Detalles del Registro de Auditoría">
        {selectedLog && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '20px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <ShieldCheck size={24} color="var(--primary)" />
                <h3 style={{ fontSize: '1.1rem', color: 'var(--heading)' }}>Evento de Seguridad</h3>
              </div>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--heading)' }}>{selectedLog.action}</p>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Realizado por {selectedLog.user} en el módulo {selectedLog.module}.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Marca de Tiempo</label>
                <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedLog.date}</p>
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dirección IP</label>
                <p style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-main)' }}>{selectedLog.ip || '192.168.1.5'}</p>
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rol de Usuario</label>
                <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedLog.role}</p>
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estado</label>
                <p style={{ color: 'var(--accent)', fontWeight: 700 }}>ÉXITO</p>
              </div>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: '#1e293b', borderRadius: '16px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f8fafc', marginBottom: '0.75rem' }}>
                <Terminal size={16} />
                <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>RASTREADOR DE DATOS SIN PROCESAR</span>
              </div>
              <pre style={{ margin: 0, fontSize: '0.75rem', overflowX: 'auto' }}>
                {JSON.stringify({
                  action: selectedLog.action,
                  module: selectedLog.module,
                  userId: "USR-00" + (Math.floor(Math.random() * 9) + 1),
                  timestamp: new Date().getTime(),
                  securityToken: "sha256:7a92b..."
                }, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AuditLogs;
