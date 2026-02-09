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
      doc.setTextColor(11, 59, 60);
      doc.text(text, margin, cursorY);
      cursorY += 12;
    };

    const addSectionHeader = (text, color = [242, 140, 40]) => {
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

    // Title Page
    addTitle('DMU-MANUAL DE REFERENCIA DE USUARIO');
    addSectionHeader('GENERAL', [0, 0, 0]);
    addBodyText('Implementación MedicalCore');
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

    // Introduction
    addSectionHeader('Medical Core', [11, 59, 60]);
    addBodyText('Este capítulo trata del proceso que debe seguir el Usuario de MedicalCore para poder crear nuevos pacientes, citas, y facturar según sus requerimientos. Se explicará con un ejemplo el flujo de MedicalCore, los botones más usados y la utilidad de cada campo.');
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

    // Navigation & Tools
    addSectionHeader('Navegación y Herramientas');
    addBodyText('1. Barra de título: Presenta el nombre de la Aplicación.');
    addBodyText('2. Barra de Navegación: Tareas principales.');
    addBodyText('3. Pestaña de Citas: Muestra citas pendientes actuales.');
    addBodyText('4. Eventos: Programación diaria.');
    cursorY += 5;

    addSubHeader('Barra de Herramientas');
    addBodyText('Refrescar Datos, Crear Cita, Guardar, Cancelar Cita, Agenda.');
    cursorY += 10;

    // Modules
    addSectionHeader('Módulo de Operación');
    addBodyText('Sala de Espera: Coloca pacientes en espera.');
    addBodyText('Historia Clínica: Guarda información clínica del paciente.');
    addBodyText('Validar: Verifica ARS y Cobertura.');
    addBodyText('Consultar: Formularios y cuestionarios.');
    addBodyText('Facturar: Pantalla de servicios y cobro.');
    cursorY += 10;

    addSectionHeader('Reportes y Configuración');
    addBodyText('Reportes: Detalles de facturas, cuadre por forma de pago.');
    addBodyText('Configuración: Registro de Doctores, Licencias, Especialidades, Centros Médicos y Coberturas.');

    doc.save('Manual_Referencia_MedicalCore.pdf');
  };

  useEffect(() => {
    // Immediate download logic
    const timer = setTimeout(() => {
      generatePDF();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="manual-download-page" style={{ padding: '3rem', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>

        <div className="loader-container" style={{ position: 'relative', marginBottom: '2.5rem' }}>
          <div style={{ width: '120px', height: '120px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={60} color="#0284c7" />
          </div>
          <Loader2 size={130} color="#0284c7" className="spinning-ring" style={{ position: 'absolute', top: '-5px', left: '-5px', opacity: 0.3 }} />
        </div>

        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem', fontWeight: '700' }}>Starting Download...</h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '550px', lineHeight: '1.7', marginBottom: '3rem' }}>
          The <strong>User Reference Manual for MedicalCore (v2.0)</strong> is being generated. Your download will begin in a moment.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#059669', background: '#ecfdf5', padding: '0.8rem 1.5rem', borderRadius: '50px', fontWeight: '600', fontSize: '0.95rem' }}>
            <CheckCircle2 size={20} />
            <span>PDF Ready</span>
          </div>

          <button
            onClick={generatePDF}
            style={{ backgroundColor: '#F28C28', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', boxShadow: '0 4px 12px rgba(242, 140, 40, 0.3)', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <Download size={20} /> DOWNLOAD AGAIN
          </button>
        </div>

        <div style={{ marginTop: '4rem', padding: '1.5rem', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '0.85rem' }}>
          Document Reference: USA-305-016-0400_SaludCore_Implementation
        </div>
      </div>

      <style>{`
        .spinning-ring {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default UserManual;
