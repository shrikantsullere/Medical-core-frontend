import React, { useEffect } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import { FileText, Download, CheckCircle2, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';

const UserManual = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let cursorY = 20;

    const checkPageBreak = (heightNeeded) => {
      if (cursorY + heightNeeded > pageHeight - 20) {
        doc.addPage();
        cursorY = 20;
        return true;
      }
      return false;
    };

    const addTitle = (text) => {
      checkPageBreak(15);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(13, 148, 136);
      doc.text(text, margin, cursorY);
      cursorY += 12;
    };

    const addSectionHeader = (text, color = [13, 148, 136]) => {
      checkPageBreak(12);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(text, margin, cursorY);
      cursorY += 10;
    };

    const addSubHeader = (text) => {
      checkPageBreak(10);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.text(text, margin, cursorY);
      cursorY += 8;
    };

    const addBodyText = (text, isItalic = false) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', isItalic ? 'italic' : 'normal');
      doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
      checkPageBreak(lines.length * 6);
      lines.forEach(line => {
        doc.text(line, margin, cursorY);
        cursorY += 6;
      });
      cursorY += 2;
    };

    // --- PDF CONSTRUCTION ---
    addTitle('DMU-MANUAL DE REFERENCIA DE USUARIO');
    addSectionHeader('GENERAL', [0, 0, 0]);
    addBodyText('Implementación MedCare EMR');
    addBodyText('AUTOR: Cruz Guzman');
    addBodyText('FECHA CREACIÓN: 13-ene-15');
    addBodyText('FECHA ÚLTIMA ACTUALIZACIÓN: 13-ene-15');
    addBodyText('VERSIÓN DEL DOCUMENTO: 2.0');
    cursorY += 10;

    addSectionHeader('Información de Control del Documento');
    addSubHeader('Registro de Cambios al Documento');
    addBodyText('25-sep-14 | Cruz Guzman | 1.0 | Creación de Documento.');
    addBodyText('13-ene-15 | Cruz Guzman | 2.0 | Actualizacion del Documento.');
    cursorY += 5;

    addSubHeader('Personas que Revisan el Documento');
    addBodyText('Wanda Casilla - ITPD-IT Practice Director');
    addBodyText('Ramiro Ramos - Director, Quality Assurance and Strategies');
    addBodyText('Ángel Castillo - IT Manager');
    cursorY += 5;

    addSubHeader('Lugar de Ubicación de Copias del Documento');
    addBodyText('1. DOC LIBRARY 1015 Pan-American Life New Orleans, USA');
    addBodyText('2. Simétrica Documents Oficinas Simétrica, Santo Domingo, RD');
    addBodyText('3. Version Control Repository: C:\\IT_CONSULTING\\Pan_AmericanLife\\...');
    cursorY += 10;

    addSectionHeader('MedCare EMR', [13, 148, 136]);
    addBodyText('Este capítulo trata del proceso que debe seguir el Usuario de MedCare EMR para poder crear nuevos pacientes, citas, y facturar según sus requerimientos. Se explicará con un ejemplo el flujo de MedCare EMR, los botones más usados y la utilidad de cada campo.');
    cursorY += 5;

    addSectionHeader('Condiciones Generales de la Aplicación');
    addSubHeader('Visualización General (Campos de Pantalla)');
    addBodyText('Usuario: Correo de la persona que desea accesar al sistema.');
    addBodyText('Contrasena: Contrasena del usuario para accesar.');
    addBodyText('Registrate aquí: permite registrar un nuevo usuario.');
    cursorY += 5;

    addSubHeader('Campos de Registro');
    addBodyText('Nombre, Apellido, Email, Password, Confirm, Especialidad.');
    cursorY += 10;

    addSectionHeader('Navegación y Herramientas');
    addBodyText('1. Barra de título: Presenta el nombre de la Aplicación.');
    addBodyText('2. Barra de Navegación: Tareas principales.');
    addBodyText('3. Pestaña de Citas: Muestra citas pendientes actuales.');
    addBodyText('4. Eventos: Programación diaria.');
    cursorY += 5;

    addSubHeader('Barra de Herramientas');
    addBodyText('Refrescar Datos, Crear Cita, Guardar, Cancelar Cita, Agenda.');
    cursorY += 10;

    addSectionHeader('Módulo de Operación');
    addBodyText('Sala de Espera: Coloca pacientes en espera.');
    addBodyText('Historia Clínica: Guarda información clínica del paciente.');
    addBodyText('Historia Clínica: Guarda información clínica del paciente.');
    addBodyText('Validar: Verifica ARS y Cobertura.');
    addBodyText('Consultar: Formularios y cuestionarios.');
    addBodyText('Facturar: Pantalla de servicios y cobro.');
    cursorY += 10;

    addSectionHeader('Reportes y Configuración');
    addBodyText('Reportes: Detalles de facturas, cuadre por forma de pago.');
    addBodyText('Configuración: Registro de Doctores, Licencias, Especialidades, Centros Médicos y Coberturas.');

    doc.save('Manual_Referencia_MedCareEMR.pdf');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generatePDF();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="manual-download-page" style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.6s ease-out' }}>

        <div className="card" style={{ maxWidth: '700px', width: '100%', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #E2E8F0', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)', borderRadius: '32px', backgroundColor: 'white' }}>
          <div className="loader-container" style={{ position: 'relative', marginBottom: '3rem' }}>
            <div style={{ width: '140px', height: '140px', backgroundColor: '#F0FDFA', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-5deg)', border: '1px solid #CCFBF1', boxShadow: '0 10px 15px -3px rgba(13, 148, 136, 0.1)' }}>
              <FileText size={72} color="#0D9488" />
            </div>
            <div className="spinning-ring" style={{ position: 'absolute', top: '-15px', left: '-15px', width: '170px', height: '170px', border: '3px solid transparent', borderTopColor: '#0D9488', borderBottomColor: '#0D9488', borderRadius: '50%', opacity: 0.2 }}></div>
          </div>

          <h1 style={{ fontSize: '2.8rem', color: '#1E293B', marginBottom: '1.25rem', fontWeight: '900', letterSpacing: '-0.025em' }}>Accessing <span style={{ color: '#0D9488' }}>Repository</span></h1>
          <p style={{ color: '#64748B', fontSize: '1.15rem', maxWidth: '500px', lineHeight: '1.8', marginBottom: '3.5rem', fontWeight: '500' }}>
            The <span style={{ color: '#1E293B', fontWeight: '800' }}>MedCare Intelligence Protocol (v2.0)</span> is being synthesized for extraction. Your download will initiate momentarily.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0D9488', background: '#F0FDFA', padding: '1rem 2rem', borderRadius: '16px', fontWeight: '800', fontSize: '0.9rem', border: '1px solid #CCFBF1', letterSpacing: '0.05em' }}>
              <CheckCircle2 size={24} />
              <span>VALIDATED SCHEMA READY</span>
            </div>

            <button
              onClick={generatePDF}
              className="btn-primary hover-scale"
              style={{ height: '60px', padding: '0 2.5rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', letterSpacing: '0.025em' }}
            >
              <Download size={22} /> EXTRACT PROTOCOL
            </button>
          </div>

          <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1.5px solid #F1F5F9', width: '100%', color: '#94A3B8', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>USA-305-016-0400</span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E2E8F0' }}></div>
            <span>INTEL-EMR-CORE</span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E2E8F0' }}></div>
            <span>MASTER ARCHIVE</span>
          </div>
        </div>
      </div>

      <style>{`
        .spinning-ring { animation: spin 4s linear infinite; }
        .hover-scale { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-scale:hover { transform: translateY(-4px); box-shadow: 0 12px 20px -5px rgba(13, 148, 136, 0.4); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 768px) {
          .manual-grid { grid-template-columns: 1fr !important; }
          .page-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default UserManual;
