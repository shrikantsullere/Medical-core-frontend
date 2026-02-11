import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
import './Configuration.css';

import { User, Check, Plus, Camera, Lock, Search, RotateCcw, Info, Edit2, ArrowLeft, Save, Download, X, Printer, List, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

const Configuration = () => {
  const [activeTab, setActiveTab] = useState('Perfil General');
  // Sub-view state for Plan de Indicadores
  const [planViewMode, setPlanViewMode] = useState('list'); // 'list' or 'create'

  // Sidebar menu items
  const menuItems = [
    'Perfil General', 'Programas', 'Posiciones de trabajo', 'Estados de cita',
    'Plan de Indicadores', 'Dashboard Pacientes', 'Permisos Dashboard Pacientes',
    'Flujo de Operación', 'Orden de Categorias', 'Servicios', 'Especialidades',
    'Correos', 'Servicios Quirúrgicos', 'Indicaciones', 'Sucursales'
  ];

  // Form State for Perfil General
  const [formData, setFormData] = useState({
    nombre: 'Centro Medico Lopez y Asoc',
    rnc: '131411871',
    moneda: 'peso dominicano',
    email: 'theiofang@gmail.com',
    zonaHoraria: '(GMT-04:00) Santo Domingo',
    facturacion: false,
    doctoresIndependientes: false,
    compartirPacientes: false,
    ordenLlegada: false
  });

  // State for Posiciones de trabajo
  const [positions, setPositions] = useState([
    { id: 1, puesto: 'Médico General', alias: 'MG', rol: 'Doctor' },
    { id: 2, puesto: 'Enfermera Triaje', alias: 'ET', rol: 'Enfermera' },
    { id: 3, puesto: 'Secretaria Recepción', alias: 'SR', rol: 'Recepcionista' },
  ]);

  // State for Estados de cita
  const [appointmentStates, setAppointmentStates] = useState([
    { id: 1, section: 'Agenda', description: 'Pendiente por confirmar', tipo: 'agenda', color: 'Platino', hex: '#E5E7EB' },
    { id: 2, section: 'Agenda', description: 'Confirmada', tipo: 'agenda', color: 'Verde', hex: '#22C55E' },
    { id: 3, section: 'Agenda', description: 'Sala de espera', tipo: 'agenda', color: 'Amarillo', hex: '#EAB308' },
    { id: 4, section: 'Agenda', description: 'Validar', tipo: 'agenda', color: 'Azul Claro', hex: '#3B82F6' },
    { id: 5, section: 'Agenda', description: 'Cancelada', tipo: 'agenda', color: 'Orquidea', hex: '#DA70D6' },
    { id: 6, section: 'Operacion', description: 'En turno', tipo: 'operacion', color: 'En turno', hex: '#FCA5A5' },
    { id: 7, section: 'Operacion', description: 'Historial Medico', tipo: 'operacion', color: 'Historial Medico', hex: '#FDE047' },
  ]);
  const [newStates, setNewStates] = useState([]);

  // State for Plan de Indicadores
  const [planSearch, setPlanSearch] = useState('');
  const [planData, setPlanData] = useState({
    nombre: '',
    tipo: '',
    dependeEdad: [] // 'PACIENTE', 'EMBARAZO', 'NINGUNO'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // State for Dashboard Pacientes option selection
  const [dashboardItems, setDashboardItems] = useState({
    available: [
      'Presupuesto', 'Preautorización', 'Plan Prenatal', 'Recetarios',
      'Mensajería', 'Receso', 'Indicaciones', 'Resultados', 'Adjuntar Archivos',
      'Procedimientos', 'Prescripción de gafas', 'Vacunas', 'Casos',
      'Exámenes Previos', 'Cuestionarios de seguimiento', 'Procedimiento Quirúrgico',
      'Checkout', 'Separador', 'Carta de Referencia', 'Licencia Médica',
      'Certificado Médico', 'Plan de Tratamiento'
    ],
    selected: [
      'Perfil del Paciente', 'Eventos/Actividades', 'Programas de Seguimiento',
      'Historial', 'Historial de Cobros', 'Cuestionario Inicial', 'Odontograma',
      'Consultas'
    ]
  });

  const toggleDashboardItem = (item, isAdding) => {
    setDashboardItems(prev => {
      if (isAdding) {
        return {
          available: prev.available.filter(i => i !== item),
          selected: [...prev.selected, item]
        };
      } else {
        return {
          available: [item, ...prev.available],
          selected: prev.selected.filter(i => i !== item)
        };
      }
    });
  };

  // State for Permisos Dashboard Pacientes
  const [selectedRole, setSelectedRole] = useState('Doctor');
  const [permissionItems, setPermissionItems] = useState({
    available: [
      'Presupuesto', 'Preautorización', 'Recetarios',
      'Mensajería', 'Receso', 'Indicaciones', 'Resultados', 'Adjuntar Archivos',
      'Procedimientos', 'Prescripción de gafas', 'Vacunas', 'Casos',
      'Exámenes Previos', 'Cuestionarios de seguimiento', 'Procedimiento Quirúrgico',
      'Checkout', 'Separador', 'Carta de Referencia', 'Licencia Médica',
      'Certificado Médico', 'Plan de Tratamiento'
    ],
    selected: [
      'Perfil del Paciente', 'Eventos/Actividades', 'Programas de Seguimiento',
      'Historial', 'Historial de Cobros', 'Cuestionario Inicial', 'Odontograma',
      'Consultas', 'Plan Prenatal'
    ]
  });

  const togglePermissionItem = (item, isAdding) => {
    setPermissionItems(prev => {
      if (isAdding) {
        return {
          available: prev.available.filter(i => i !== item),
          selected: [...prev.selected, item]
        };
      } else {
        return {
          available: [item, ...prev.available],
          selected: prev.selected.filter(i => i !== item)
        };
      }
    });
  };

  const handleAddPosition = () => {
    setPositions([...positions, { id: Date.now(), puesto: '', alias: '', rol: '' }]);
  };

  const handleRemovePosition = (id) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  const handleAddState = () => {
    setNewStates([...newStates, { id: Date.now(), description: '', tipo: '', color: '' }]);
  };

  const handleRemoveNewState = (id) => {
    setNewStates(newStates.filter(s => s.id !== id));
  };

  const groupedStates = appointmentStates.reduce((acc, state) => {
    if (!acc[state.section]) acc[state.section] = [];
    acc[state.section].push(state);
    return acc;
  }, {});


  /* --- STATE FOR FLUJO DE OPERACION --- */
  const [flowItems, setFlowItems] = useState([
    'En Turno', 'Historia Clínica', 'Validar', 'Consultar', 'Facturación',
    'Pagar', 'Checkout', 'Espera de Consulta', 'Espera Facturación'
  ]);
  const [flowSections, setFlowSections] = useState([]);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [sectionFormData, setSectionFormData] = useState({
    nombre: '',
    descripcion: '',
    icono: ''
  });

  const handleOpenSectionModal = () => {
    setSectionFormData({ nombre: '', descripcion: '', icono: '' });
    setIsSectionModalOpen(true);
  };

  const handleCloseSectionModal = () => {
    setIsSectionModalOpen(false);
  };

  const handleSaveSection = () => {
    if (sectionFormData.nombre.trim()) {
      setFlowSections([...flowSections, { ...sectionFormData, id: Date.now(), items: [] }]);
      handleCloseSectionModal();
    } else {
      alert("Por favor ingrese un nombre para la sección.");
    }
  };

  const handleSectionFormChange = (e) => {
    const { name, value } = e.target;
    setSectionFormData(prev => ({ ...prev, [name]: value }));
  };


  /* --- STATE FOR SERVICIOS --- */
  const [servicesSearch, setServicesSearch] = useState('');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceFormData, setServiceFormData] = useState({
    descripcion: '',
    duracion: '',
    tipoServicio: '',
    porDefecto: false,
    primeraConsulta: false,
    tipoRango: '',
    desde: '',
    hasta: ''
  });

  const handleOpenServiceModal = () => {
    setServiceFormData({
      descripcion: '',
      duracion: '',
      tipoServicio: '',
      porDefecto: false,
      primeraConsulta: false,
      tipoRango: '',
      desde: '',
      hasta: ''
    });
    setIsServiceModalOpen(true);
  };

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
  };

  const handleServiceFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveService = () => {
    if (serviceFormData.descripcion.trim()) {
      setServices([...services, { ...serviceFormData, id: Date.now() }]);
      handleCloseServiceModal();
      alert("Servicio Guardado!");
    } else {
      alert("Por favor ingrese una descripción.");
    }
  };





  /* --- STATE FOR ESPECIALIDADES --- */
  const [specialtiesSearch, setSpecialtiesSearch] = useState('');
  const [specialties, setSpecialties] = useState([
    { id: 52, code: 52, name: 'ACUPUNTURISTA' },
    { id: 4, code: 4, name: 'ALERGISTA' },
    { id: 5, code: 5, name: 'ANESTESIOLOGO' },
    { id: 27, code: 27, name: 'ANGIOLOGO' },
    { id: 6, code: 6, name: 'CARDIOLOGIA' },
    { id: 66, code: 66, name: 'CIRUGIA' },
    { id: 69, code: 69, name: 'CIRUGIA MAXILOFACIAL' },
    { id: 7, code: 7, name: 'CIRUJANO CARDIOVASCULAR' },
    { id: 8, code: 8, name: 'CIRUJANO GENERAL' },
    { id: 9, code: 9, name: 'CIRUJANO MAXILO FACIAL' },
  ]);
  const [newSpecialtyName, setNewSpecialtyName] = useState('');
  const [editingSpecialtyId, setEditingSpecialtyId] = useState(null);
  const [editingSpecialtyName, setEditingSpecialtyName] = useState('');

  // Pagination for Specialties
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State for Specialties Services
  const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(false);
  const [currentSpecialtyForModal, setCurrentSpecialtyForModal] = useState(null);
  const [selectedServiceForSpecialty, setSelectedServiceForSpecialty] = useState('');

  const handleAddSpecialty = () => {
    if (newSpecialtyName.trim()) {
      const newId = Math.max(...specialties.map(s => s.code), 0) + 1;
      setSpecialties([{ id: newId, code: newId, name: newSpecialtyName.toUpperCase() }, ...specialties]);
      setNewSpecialtyName('');
    } else {
      alert("Ingrese el nombre de la especialidad");
    }
  };

  const handleDeleteSpecialty = (id) => {
    if (window.confirm("¿Seguro que desea eliminar esta especialidad?")) {
      setSpecialties(specialties.filter(s => s.id !== id));
    }
  };

  const startEditingSpecialty = (specialty) => {
    setEditingSpecialtyId(specialty.id);
    setEditingSpecialtyName(specialty.name);
  };

  const saveEditingSpecialty = () => {
    setSpecialties(specialties.map(s => s.id === editingSpecialtyId ? { ...s, name: editingSpecialtyName.toUpperCase() } : s));
    setEditingSpecialtyId(null);
    setEditingSpecialtyName('');
  };

  const handleOpenSpecialtyModal = (specialty) => {
    setCurrentSpecialtyForModal(specialty);
    setIsSpecialtyModalOpen(true);
  };

  const handleCloseSpecialtyModal = () => {
    setIsSpecialtyModalOpen(false);
    setCurrentSpecialtyForModal(null);
  };


  /* --- STATE FOR CORREOS --- */
  const [emailViewMode, setEmailViewMode] = useState('list'); // 'list', 'create'
  const [emails, setEmails] = useState([]); // Array of email objects
  const [emailFormData, setEmailFormData] = useState({
    tipo: '',
    asunto: '',
    cuerpo: ''
  });

  const handleAddEmail = () => {
    setEmailFormData({ tipo: '', asunto: '', cuerpo: '' });
    setEmailViewMode('create');
  };

  const handleSaveEmail = () => {
    if (emailFormData.asunto && emailFormData.tipo) {
      setEmails([...emails, { ...emailFormData, id: Date.now() }]);
      setEmailViewMode('list');
      alert("Correo Guardado!");
    } else {
      alert("Complete los campos requeridos");
    }
  };

  const handleEmailFormChange = (e) => {
    const { name, value } = e.target;
    setEmailFormData(prev => ({ ...prev, [name]: value }));
  };

  /* --- STATE FOR SERVICIOS QUIRURGICOS --- */
  const [surgicalSearch, setSurgicalSearch] = useState('');
  const [surgicalServices, setSurgicalServices] = useState([]);
  const [isSurgicalModalOpen, setIsSurgicalModalOpen] = useState(false);
  const [surgicalFormData, setSurgicalFormData] = useState({
    codigo: '',
    descripcion: ''
  });
  const [surgicalPage, setSurgicalPage] = useState(1);

  const handleOpenSurgicalModal = () => {
    setSurgicalFormData({ codigo: '', descripcion: '' });
    setIsSurgicalModalOpen(true);
  };

  const handleCloseSurgicalModal = () => {
    setIsSurgicalModalOpen(false);
  };

  const handleSaveSurgical = () => {
    if (surgicalFormData.descripcion) {
      setSurgicalServices([...surgicalServices, { ...surgicalFormData, id: Date.now() }]);
      handleCloseSurgicalModal();
      alert("Procedimiento Guardado!");
    } else {
      alert("Ingrese una descripción");
    }
  };

  const handleSurgicalFormChange = (e) => {
    const { name, value } = e.target;
    setSurgicalFormData(prev => ({ ...prev, [name]: value }));
  };

  /* --- STATE FOR INDICACIONES --- */
  const [indicationsSubTab, setIndicationsSubTab] = useState('Maintenance'); // 'Maintenance', 'Category', 'Template'

  // Maintenance Sub-tab State
  const [indicationsSearch, setIndicationsSearch] = useState('');
  const [indications, setIndications] = useState([
    { id: 1, description: 'Tomography', type: 'STUDIES', resultType: '' },
    { id: 2, description: 'SONOGRAPHY', type: 'STUDIES', resultType: '' },
    { id: 3, description: 'Coprological', type: 'LABORATORY', resultType: '' },
    { id: 4, description: 'PCR', type: 'LABORATORY', resultType: '' },
  ]);
  const [isIndicationModalOpen, setIsIndicationModalOpen] = useState(false);
  const [indicationFormData, setIndicationFormData] = useState({
    description: '',
    type: '',
    resultType: '',
    resultTitle: ''
  });

  // Category Sub-tab State
  const [categorySearch, setCategorySearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // Reuse simple modal logic or new one
  const [categoryName, setCategoryName] = useState('');

  // Template Sub-tab State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [templateFormData, setTemplateFormData] = useState({
    category: '',
    type: ''
  });

  /* Handlers for Indications */
  const handleOpenIndicationModal = () => {
    setIndicationFormData({ description: '', type: '', resultType: '', resultTitle: '' });
    setIsIndicationModalOpen(true);
  };

  const handleSaveIndication = () => {
    if (indicationFormData.description) {
      setIndications([...indications, { ...indicationFormData, id: Date.now() }]);
      setIsIndicationModalOpen(false);
      alert("Indicación Guardada!");
    } else {
      alert("Ingrese una descripción");
    }
  };

  const handleIndicationFormChange = (e) => {
    const { name, value } = e.target;
    setIndicationFormData(prev => ({ ...prev, [name]: value }));
  };

  /* Handlers for Category */
  const handleSaveCategory = () => {
    if (categoryName) {
      setCategories([...categories, { id: Date.now(), description: categoryName }]);
      setCategoryName('');
      // Logic to close modal if separate modal used
      alert("Categoría Guardada!");
    }
  };

  /* Handlers for Template */
  const handleOpenTemplateModal = () => {
    setTemplateFormData({ category: '', type: '' });
    setIsTemplateModalOpen(true);
  };

  const handleSaveTemplate = () => {
    setIsTemplateModalOpen(false);
    alert("Template Section Created!");
  };

  /* --- STATE FOR SUCURSALES (BRANCHES) --- */
  const [branchSearch, setBranchSearch] = useState('');
  const [branches, setBranches] = useState([]);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [branchFormData, setBranchFormData] = useState({
    name: '',
    address: '',
    principal: false,
    status: true // true = Active, false = Inactive
  });

  const handleOpenBranchModal = () => {
    setBranchFormData({ name: '', address: '', principal: false, status: true });
    setIsBranchModalOpen(true);
  };

  const handleSaveBranch = () => {
    if (branchFormData.name) {
      setBranches([...branches, { ...branchFormData, id: Date.now() }]);
      setIsBranchModalOpen(false);
      alert("Sucursal Guardada!");
    } else {
      alert("Ingrese el nombre de la sucursal");
    }
  };

  const handleBranchFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBranchFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <DashboardLayout>
      {/* Modal for Section Creation */}
      {isSectionModalOpen && (
        <div className="med-modal-overlay">
          <div className="med-modal-container">
            <div className="med-modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit2 size={18} /> Creación de Sección
              </h3>
              <button onClick={handleCloseSectionModal} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div className="med-modal-body">
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.5rem' }}>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={sectionFormData.nombre}
                  onChange={handleSectionFormChange}
                  className="maint-input"
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.5rem' }}>Descripción</label>
                <textarea
                  name="descripcion"
                  value={sectionFormData.descripcion}
                  onChange={handleSectionFormChange}
                  rows={4}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px', resize: 'vertical' }}
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.5rem' }}>Icono</label>
                <select
                  name="icono"
                  value={sectionFormData.icono}
                  onChange={handleSectionFormChange}
                  className="maint-select"
                >
                  <option value="">Buscar...</option>
                  <option value="user">User</option>
                  <option value="clipboard">Clipboard</option>
                  <option value="activity">Activity</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button onClick={handleSaveSection} className="maint-btn-primary">
                  <Check size={16} /> GUARDAR
                </button>
                <button onClick={handleCloseSectionModal} className="maint-btn-text">
                  <X size={16} /> CERRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Service Creation */}
      {isServiceModalOpen && (
        <div className="med-modal-overlay">
          <div className="med-modal-container">
            <div className="med-modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Creación de servicio
              </h3>
              <button onClick={handleCloseServiceModal} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div className="med-modal-body">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={serviceFormData.descripcion}
                  onChange={handleServiceFormChange}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Duración</label>
                <select
                  name="duracion"
                  value={serviceFormData.duracion}
                  onChange={handleServiceFormChange}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                >
                  <option value="">Seleccionar...</option>
                  <option value="15 min">15 min</option>
                  <option value="30 min">30 min</option>
                  <option value="45 min">45 min</option>
                  <option value="60 min">60 min</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Tipo de servicio</label>
                <select
                  name="tipoServicio"
                  value={serviceFormData.tipoServicio}
                  onChange={handleServiceFormChange}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Consulta">Consulta</option>
                  <option value="Procedimiento">Procedimiento</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  name="porDefecto"
                  checked={serviceFormData.porDefecto}
                  onChange={handleServiceFormChange}
                  style={{ width: '18px', height: '18px' }}
                />
                <label style={{ fontSize: '0.9rem', color: '#374151' }}>Por defecto</label>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#374151', margin: '0 0 0.5rem 0' }}>Condición de asignación en agenda</h4>
              </div>

              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  name="primeraConsulta"
                  checked={serviceFormData.primeraConsulta}
                  onChange={handleServiceFormChange}
                  style={{ width: '18px', height: '18px' }}
                />
                <label style={{ fontSize: '0.9rem', color: '#374151' }}>Primera Consulta</label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '2rem', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Tipo de rango</label>
                  <select
                    name="tipoRango"
                    value={serviceFormData.tipoRango}
                    onChange={handleServiceFormChange}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Edad">Edad</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Desde</label>
                  <input
                    type="text"
                    name="desde"
                    value={serviceFormData.desde}
                    onChange={handleServiceFormChange}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px', backgroundColor: '#F3F4F6' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Hasta</label>
                  <input
                    type="text"
                    name="hasta"
                    value={serviceFormData.hasta}
                    onChange={handleServiceFormChange}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px', backgroundColor: '#F3F4F6' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  onClick={handleSaveService}
                  style={{ backgroundColor: '#0D9488', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Check size={16} /> GUARDAR
                </button>
                <button
                  onClick={handleCloseServiceModal}
                  style={{ background: 'none', color: '#4B5563', border: 'none', padding: '0.5rem 1rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <X size={16} /> CERRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Modal for Specialty Services */}
      {isSpecialtyModalOpen && currentSpecialtyForModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '600px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#0D9488', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} /> Servicios
              </h3>
              <button onClick={handleCloseSpecialtyModal} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#333', marginBottom: '0.3rem' }}>Especialidad:</label>
                <div style={{ padding: '0.5rem', backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '3px', color: '#374151' }}>
                  {currentSpecialtyForModal.name}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#333', marginBottom: '0.3rem' }}>Servicios:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    value={selectedServiceForSpecialty}
                    onChange={(e) => setSelectedServiceForSpecialty(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Consulta General">Consulta General</option>
                    <option value="Cirugía Menor">Cirugía Menor</option>
                  </select>
                  <button style={{ color: '#0D9488', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Check size={20} />
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#333', marginBottom: '0.3rem' }}>Servicios de la especialidad:</label>
                {/* List of services can go here */}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                <button
                  onClick={handleCloseSpecialtyModal}
                  style={{ color: '#666', background: 'none', border: 'none', padding: '0.5rem 1rem', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <X size={16} color="#0D9488" /> CANCELAR
                </button>
                <button
                  onClick={() => { alert("Servicios guardados"); handleCloseSpecialtyModal(); }}
                  style={{ backgroundColor: '#0D9488', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Check size={16} /> GUARDAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Indications (Maintenance) */}
      {isIndicationModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '100px'
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '600px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#0D9488', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Create/Modify Procedure
              </h3>
              <button onClick={() => setIsIndicationModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={indicationFormData.description}
                    onChange={handleIndicationFormChange}
                    placeholder="Description"
                    className="custom-input"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #0D9488', borderRadius: '3px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#0D9488', marginBottom: '0.3rem' }}>Type:</label>
                  <select
                    name="type"
                    value={indicationFormData.type}
                    onChange={handleIndicationFormChange}
                    className="custom-select"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #0D9488', borderRadius: '3px' }}
                  >
                    <option value="">Select...</option>
                    <option value="STUDIES">STUDIES</option>
                    <option value="LABORATORY">LABORATORY</option>
                    <option value="OTHERS">OTHERS</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#0D9488', marginBottom: '0.3rem' }}>Result Type:</label>
                  <select
                    name="resultType"
                    value={indicationFormData.resultType}
                    onChange={handleIndicationFormChange}
                    className="custom-select"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #0D9488', borderRadius: '3px' }}
                  >
                    <option value="">Select...</option>
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Result title:</label>
                  <input
                    type="text"
                    name="resultTitle"
                    value={indicationFormData.resultTitle}
                    onChange={handleIndicationFormChange}
                    className="custom-input"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  onClick={() => setIsIndicationModalOpen(false)}
                  style={{ background: 'none', color: '#666', border: 'none', padding: '0.5rem 1rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSaveIndication}
                  style={{ backgroundColor: '#0D9488', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}
                >
                  KEEP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Branch Creation */}
      {isBranchModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '100px'
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '500px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#0D9488', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Create/Modify Branch
              </h3>
              <button onClick={() => setIsBranchModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={branchFormData.name}
                  onChange={handleBranchFormChange}
                  className="custom-input"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={branchFormData.address}
                  onChange={handleBranchFormChange}
                  className="custom-input"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="principal"
                    checked={branchFormData.principal}
                    onChange={handleBranchFormChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label style={{ fontSize: '0.9rem', color: '#374151' }}>Principal</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 'bold' }}>Status:</label>
                  <div
                    onClick={() => setBranchFormData(prev => ({ ...prev, status: !prev.status }))}
                    style={{
                      width: '40px', height: '20px', backgroundColor: branchFormData.status ? '#22C55E' : '#9CA3AF',
                      borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s'
                    }}
                  >
                    <div style={{
                      width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%',
                      position: 'absolute', top: '2px', left: branchFormData.status ? '22px' : '2px', transition: 'left 0.2s'
                    }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: branchFormData.status ? '#22C55E' : '#9CA3AF' }}>{branchFormData.status ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  onClick={() => setIsBranchModalOpen(false)}
                  style={{ background: 'none', color: '#666', border: 'none', padding: '0.5rem 1rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSaveBranch}
                  style={{ backgroundColor: '#0D9488', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}
                >
                  <Save size={16} /> SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Template */}
      {isTemplateModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '100px'
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '600px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#0D9488', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <List size={18} /> Instructions template
              </h3>
              <button onClick={() => setIsTemplateModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Category</label>
                  <input
                    type="text"
                    value={templateFormData.category}
                    onChange={(e) => setTemplateFormData({ ...templateFormData, category: e.target.value })}
                    placeholder="Choose category"
                    className="custom-input"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Type</label>
                  <select
                    value={templateFormData.type}
                    onChange={(e) => setTemplateFormData({ ...templateFormData, type: e.target.value })}
                    className="custom-select"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #F3F4F6', borderRadius: '3px' }}
                  >
                    <option value="">Choosing a type of study</option>
                    <option value="Type 1">Type 1</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  onClick={() => setIsTemplateModalOpen(false)}
                  style={{ background: 'none', color: '#666', border: 'none', padding: '0.5rem 1rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  <X size={14} color="#0D9488" /> CANCEL
                </button>
                <button
                  onClick={handleSaveTemplate}
                  style={{ backgroundColor: '#0D9488', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}
                >
                  <Save size={16} /> KEEP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Surgical Service Creation */}
      {isSurgicalModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '100px'
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '500px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#0D9488', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Nuevo Procedimiento
              </h3>
              <button onClick={handleCloseSurgicalModal} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Código (Opcional)</label>
                <input
                  type="text"
                  name="codigo"
                  value={surgicalFormData.codigo}
                  onChange={handleSurgicalFormChange}
                  className="custom-input"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.3rem' }}>Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={surgicalFormData.descripcion}
                  onChange={handleSurgicalFormChange}
                  className="custom-input"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  onClick={handleCloseSurgicalModal}
                  style={{ background: 'none', color: '#666', border: 'none', padding: '0.5rem 1rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  CANCELAR
                </button>
                <button
                  onClick={handleSaveSurgical}
                  style={{ backgroundColor: '#0D9488', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Check size={16} /> GUARDAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="config-page-container">

        {/* Configuration Sidebar */}
        <div className="config-sidebar-wrapper">
          {/* Profile Placeholder */}
          <div className="config-profile-header">
            <div className="config-avatar-circle">
              <User size={32} />
            </div>
            <h3 className="config-profile-name">Centro Medico Lopez y Asoc</h3>
          </div>

          {/* Menu List */}
          <div className="config-menu-list">
            {menuItems.map(item => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  if (item !== 'Plan de Indicadores') setPlanViewMode('list');
                }}
                className={`config-menu-btn ${activeTab === item ? 'active' : ''}`}
              >
                {/* Optional: Add icons based on item name here if desired */}
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="config-content-wrapper">

          {/* Conditional Header for Perfil General */}
          {activeTab === 'Perfil General' && (
            <div className="config-header-row">
              <div className="config-title-box">
                <h2>Perfil Centro Médico</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <Lock size={14} /> Aquí puedes modificar las configuraciones de la cuenta.
                </p>
              </div>
              <button
                onClick={() => alert('Saved Settings: ' + JSON.stringify(formData))}
                className="btn-primary"
                style={{ height: '40px', gap: '0.5rem' }}
              >
                <Check size={16} /> GUARDAR
              </button>
            </div>
          )}

          {/* --- PERFIL GENERAL VIEW --- */}
          {activeTab === 'Perfil General' && (
            <div className="config-card-main">
              <div className="config-form-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { label: 'Nombre', name: 'nombre', type: 'text' },
                    { label: 'RNC', name: 'rnc', type: 'text' },
                    { label: 'Moneda', name: 'moneda', type: 'select', options: ['peso dominicano', 'usd'] },
                    { label: 'Correo', name: 'email', type: 'email' },
                    { label: 'Correo de Recepción de mensajes', name: 'receptionEmail', type: 'text', placeholder: 'Correo' },
                    { label: 'Duración de Visita', name: 'visitDuration', type: 'select', options: ['15 min', '30 min'] },
                    { label: 'Tipo de Proveedor', name: 'providerType', type: 'select', options: ['General', 'Specialist'] },
                    { label: 'Porcentaje Monto Retenido', name: 'retention', type: 'text' },
                    { label: 'Zona horaria', name: 'zonaHoraria', type: 'select', options: ['(GMT-04:00) Santo Domingo'] },
                  ].map((field, idx) => (
                    <div key={idx} className="config-field-row">
                      <label>{field.label}</label>
                      {field.type === 'select' ? (
                        <select className="maint-select" name={field.name} value={formData[field.name]} onChange={handleInputChange}>
                          {field.options && field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          className="maint-input"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder || ''}
                        />
                      )}
                    </div>
                  ))}
                  <div className="config-field-row">
                    <label>Horario Agenda</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Desde</span>
                        <input type="time" className="maint-input" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Hasta</span>
                        <input type="time" className="maint-input" />
                      </div>
                    </div>
                  </div>
                  <div className="config-field-row" style={{ marginTop: '1rem' }}>
                    <label>Sello Digital</label>
                    <button className="btn-secondary" style={{ width: 'fit-content', fontSize: '0.75rem', padding: '0 1rem' }}>
                      CARGA SELLO +
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    'Centro Médico responsable para la facturación',
                    'Facturar procedimientos doctores independientes',
                    'Compartir pacientes entre doctores',
                    'Vistas en orden de llegada',
                    'Hace internamientos',
                    'Enviar recordatorio de vacunas',
                    'Enviar Historia Clínica por correo',
                    'Sucursales',
                    'Cajas',
                    'Correos Personalizados',
                    'Habilitar campo abierto de doctores',
                    'Utilizar cuestionarios del centro',
                    'Compartir Colecciones',
                    'Habilitar Finanzas'
                  ].map((label, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.25rem 0' }}>
                      <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }} />
                      <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {['Impresiones personalizadas', 'Recordatorios', 'Casos', 'Información adicional', 'Historial de Pacientes'].map((section, idx) => (
                <div key={idx} style={{ marginTop: '3rem' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
                    {section === 'Impresiones personalizadas' && <span>🖨️</span>}
                    {section === 'Recordatorios' && <span>🔔</span>}
                    {section === 'Casos' && <span>✒️</span>}
                    {section === 'Información adicional' && <span>ℹ️</span>}
                    {section === 'Historial de Pacientes' && <span>ℹ️</span>}
                    {section}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><input type="checkbox" /><label style={{ fontSize: '0.8rem' }}>Item 1</label></div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><input type="checkbox" /><label style={{ fontSize: '0.8rem' }}>Item 2</label></div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><input type="checkbox" /><label style={{ fontSize: '0.8rem' }}>Item 3</label></div>
                  </div>
                </div>
              ))}
              {['Teléfonos', 'Direcciones'].map((section, idx) => (
                <div key={idx} style={{ marginTop: '3rem' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', fontWeight: '700' }}>
                    <span>{section === 'Teléfonos' ? '📞' : '📍'} {section}</span>
                    <button className="btn-primary" style={{ height: '32px', fontSize: '0.75rem', padding: '0 1rem' }}>+ AGREGAR</button>
                  </h4>
                  <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <div style={{ backgroundColor: 'var(--bg-sidebar)', color: 'white', padding: '0.6rem 1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {section === 'Teléfonos' ? 'Tipo / Teléfono' : 'País / Provincia / Sector / Dirección'}
                    </div>
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      No entries found
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- PROGRAMAS VIEW --- */}
          {activeTab === 'Programas' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Programas</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gestiona los programas disponibles.</p>
                </div>
                <button className="btn-primary" style={{ gap: '0.5rem' }}>
                  <Plus size={16} /> AGREGAR
                </button>
              </div>

              <div className="config-card-main" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', marginBottom: '1.5rem', gap: '1rem' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      className="maint-input"
                      placeholder="Buscar programas..."
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>

                <div className="maint-table-container">
                  <div className="maint-table-header" style={{ gridTemplateColumns: '100px 1fr 1fr 100px' }}>
                    <div>Código</div>
                    <div>Programa</div>
                    <div>Descripción</div>
                    <div style={{ textAlign: 'right' }}>Acción</div>
                  </div>
                  <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No programs found
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- POSICIONES DE TRABAJO VIEW --- */}
          {/* --- POSICIONES DE TRABAJO VIEW --- */}
          {activeTab === 'Posiciones de trabajo' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Posiciones de Trabajo</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Define los roles y puestos del personal.</p>
                </div>
                <button onClick={handleAddPosition} className="btn-primary" style={{ gap: '0.5rem' }}>
                  <Plus size={16} /> NUEVO PUESTO
                </button>
              </div>

              <div className="maint-table-container">
                <div className="maint-table-header" style={{ gridTemplateColumns: '1.5fr 1fr 1.5fr 1fr 150px' }}>
                  <div>Puesto</div>
                  <div>Alias</div>
                  <div>Rol</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Consultorio <Info size={14} /></div>
                  <div style={{ textAlign: 'right' }}>Acciones</div>
                </div>

                {positions.map(pos => (
                  <div key={pos.id} className="maint-table-row" style={{ gridTemplateColumns: '1.5fr 1fr 1.5fr 1fr 150px', gap: '1rem' }}>
                    <div data-label="Puesto">
                      <input type="text" placeholder="Ej. Médico" className="maint-input" style={{ width: '100%' }} />
                    </div>
                    <div data-label="Alias">
                      <input type="text" placeholder="Alias" className="maint-input" style={{ width: '100%' }} />
                    </div>
                    <div data-label="Rol">
                      <select className="maint-select" style={{ width: '100%' }}>
                        <option>SELECCIONAR</option>
                        <option>Doctor</option>
                        <option>Assistant</option>
                        <option>Receptionist</option>
                      </select>
                    </div>
                    <div data-label="Consultorio" style={{ textAlign: 'center' }}>
                      <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                    </div>
                    <div data-label="Acciones" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleRemovePosition(pos.id)} className="btn-secondary" style={{ padding: '0.4rem', color: '#EF4444' }} title="Remove"><Trash2 size={16} /></button>
                      <button className="btn-primary" style={{ padding: '0.4rem' }} title="Save"><Check size={16} /></button>
                    </div>
                  </div>
                ))}

                {positions.length === 0 && (
                  <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    No hay puestos registrados. Haga clic en <span style={{ fontWeight: '700', color: 'var(--primary)' }}>+ NUEVO PUESTO</span> para iniciar.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- ESTADOS DE CITA VIEW --- */}
          {activeTab === 'Estados de cita' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Mantenimiento de Estado</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gestiona los estados de las citas.</p>
                </div>
                <button
                  onClick={handleAddState}
                  className="btn-primary"
                  style={{ gap: '0.5rem' }}
                >
                  <Plus size={16} /> AGREGAR ESTADO
                </button>
              </div>

              <div className="maint-table-container">
                <div className="maint-table-header" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 120px' }}>
                  <div>Descripción</div>
                  <div>Tipo</div>
                  <div>Color</div>
                  <div style={{ textAlign: 'right' }}>Acciones</div>
                </div>

                {/* Dynamic Input Rows for New States */}
                {newStates.map(state => (
                  <div key={state.id} className="maint-table-row" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 120px', gap: '1rem', backgroundColor: 'var(--primary-light)' }}>
                    <div data-label="Descripción">
                      <input type="text" className="maint-input" placeholder="Nueva descripción" style={{ width: '100%' }} />
                    </div>
                    <div data-label="Tipo">
                      <select className="maint-select" style={{ width: '100%' }}>
                        <option>Seleccionar...</option>
                        <option value="agenda">Agenda</option>
                        <option value="operacion">Operación</option>
                      </select>
                    </div>
                    <div data-label="Color">
                      <select className="maint-select" style={{ width: '100%' }}>
                        <option>Seleccionar...</option>
                        <option value="Platino">Platino</option>
                        <option value="Verde">Verde</option>
                        <option value="Amarillo">Amarillo</option>
                      </select>
                    </div>
                    <div data-label="Acciones" style={{ textAlign: 'right' }}>
                      <button onClick={() => handleRemoveNewState(state.id)} className="btn-secondary" style={{ padding: '0.4rem', color: '#EF4444' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Grouped Existing States */}
                {Object.entries(groupedStates).map(([section, states]) => (
                  <div key={section} style={{ borderTop: '1px solid var(--border)' }}>
                    <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-main)', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {section}
                    </div>
                    {states.map(state => (
                      <div key={state.id} className="maint-table-row" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 120px', gap: '1rem' }}>
                        <div data-label="Descripción" style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: state.hex }}></div>
                          {state.description}
                        </div>
                        <div data-label="Tipo" style={{ color: 'var(--text-muted)' }}>{state.tipo}</div>
                        <div data-label="Color" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.85rem' }}>{state.color}</span>
                        </div>
                        <div data-label="Acciones" style={{ textAlign: 'right' }}>
                          <button className="btn-secondary" style={{ padding: '0.4rem' }}><Edit2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- PLAN DE INDICADORES VIEW --- */}
          {/* --- PLAN DE INDICADORES VIEW --- */}
          {activeTab === 'Plan de Indicadores' && (
            <div style={{ minHeight: '500px' }}>
              {planViewMode === 'list' ? (
                <>
                  <div className="config-header-row">
                    <div className="config-title-box">
                      <h2>Listado de Plan de Indicaciones</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>📄 Lista de Plan de Indicaciones</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary" style={{ gap: '0.5rem' }}>
                        <ArrowLeft size={16} /> REGRESAR
                      </button>
                      <button
                        onClick={() => setPlanViewMode('create')}
                        className="btn-primary"
                        style={{ gap: '0.5rem' }}
                      >
                        <Plus size={16} /> NUEVO PLAN
                      </button>
                    </div>
                  </div>

                  <div className="config-card-main" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                      <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
                        <span style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '10px',
                          backgroundColor: 'var(--bg-card)',
                          color: 'var(--primary)',
                          fontSize: '0.75rem',
                          padding: '0 4px',
                          fontWeight: 'bold',
                          zIndex: 1
                        }}>BUSCAR:</span>
                        <input
                          type="text"
                          placeholder="Buscar..."
                          className="maint-input"
                          value={planSearch}
                          onChange={(e) => setPlanSearch(e.target.value)}
                          style={{ width: '100%', borderColor: 'var(--primary)' }}
                        />
                      </div>
                      <button className="btn-secondary" style={{ color: 'var(--primary)' }}>
                        <Search size={18} />
                      </button>
                    </div>

                    <div className="maint-table-container" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                      No existe información para mostrar
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="config-header-row">
                    <div className="config-title-box">
                      <h2>Mantenimiento de Plan de Indicaciones</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>📄 Creación de Plan de Indicaciones.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setPlanViewMode('list')}
                        className="btn-secondary"
                        style={{ gap: '0.5rem' }}
                      >
                        <ArrowLeft size={16} /> REGRESAR
                      </button>
                      <button
                        onClick={() => alert("Plan Saved!")}
                        className="btn-primary"
                        style={{ gap: '0.5rem' }}
                      >
                        <Save size={16} /> GUARDAR
                      </button>
                    </div>
                  </div>

                  <div className="config-card-main">
                    <div className="config-form-grid" style={{ gridTemplateColumns: 'minmax(300px, 450px) 1fr', gap: '3rem' }}>
                      {/* Left Form Section */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="config-field-row">
                          <label>Nombre:</label>
                          <input
                            type="text"
                            placeholder="Nombre del plan"
                            className="maint-input"
                            value={planData.nombre}
                            onChange={(e) => setPlanData({ ...planData, nombre: e.target.value })}
                          />
                        </div>
                        <div className="config-field-row">
                          <label>Tipo:</label>
                          <select className="maint-select">
                            <option>Seleccionar...</option>
                          </select>
                        </div>
                        <div className="config-field-row">
                          <label>Depende de la edad de:</label>
                          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {['PACIENTE', 'EMBARAZO', 'NINGUNO'].map(opt => (
                              <label key={opt} style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                                <input type="radio" name="edadCheck" style={{ accentColor: 'var(--primary)' }} />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Items */}
                      <div style={{ backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                          <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Items del Plan</h4>
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                          Configure items once type is selected.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="config-card-main" style={{ marginTop: '2rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', height: '400px' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Procedimientos Disponibles <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1px 6px', borderRadius: '4px', fontSize: '0.75rem', marginLeft: '0.5rem' }}>1892</span></h4>
                        <input type="text" placeholder="Filtrar procedimientos..." className="maint-input" style={{ marginBottom: '1rem' }} />
                        <div style={{ flex: 1, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.5rem' }}>
                          {/* Mock List */}
                          <div style={{ padding: '0.5rem', borderBottom: '1px dashed var(--border)', cursor: 'pointer' }}>› EXTRACCION DE DISPOSITIVO IMPLANTADO</div>
                          <div style={{ padding: '0.5rem', borderBottom: '1px dashed var(--border)', cursor: 'pointer' }}>› CRANEOTOMIA SUB OCCIPITAL</div>
                          <div style={{ padding: '0.5rem', borderBottom: '1px dashed var(--border)', cursor: 'pointer' }}>› TENOSINOVECTOMIA</div>
                        </div>
                      </div>
                      <div style={{ width: '1px', backgroundColor: 'var(--border)' }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h4 style={{ fontSize: '1rem', margin: 0 }}>Grupos</h4>
                          <button className="btn-ghost" style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>+ Nuevo Grupo</button>
                        </div>
                        <div style={{ border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', height: 'calc(100% - 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                          Seleccione items para agrupar
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* --- DASHBOARD PACIENTES VIEW --- */}
          {activeTab === 'Dashboard Pacientes' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Dashboard Pacientes</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Personaliza las opciones visibles en el dashboard de pacientes.</p>
                </div>
                <button
                  onClick={() => alert("Dashboard Settings Saved!")}
                  className="btn-primary"
                >
                  GUARDAR CAMBIOS
                </button>
              </div>

              <div className="config-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Available Options */}
                <div className="config-card-main" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', fontWeight: '700', color: 'var(--text-secondary)' }}>
                    Opciones Disponibles
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
                    {dashboardItems.available.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleDashboardItem(item, true)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderBottom: '1px solid var(--border)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)'
                        }}
                        className="hover-bg-light"
                      >
                        {item}
                        <button className="btn-icon-small" style={{ color: 'var(--primary)' }}><Plus size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Options */}
                <div className="config-card-main" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column', borderColor: 'var(--primary)' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--primary-light)', fontWeight: '700', color: 'var(--primary)' }}>
                    Opciones Seleccionadas
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
                    {dashboardItems.selected.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleDashboardItem(item, false)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderBottom: '1px solid var(--border)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          color: 'var(--text-main)',
                        }}
                        className="hover-bg-light"
                      >
                        {item}
                        <button className="btn-icon-small" style={{ color: 'var(--accent)' }}><RotateCcw size={14} /></button>
                      </div>
                    ))}
                    {dashboardItems.selected.length === 0 && (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Ninguna opción seleccionada.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- PERMISOS DASHBOARD PACIENTES VIEW --- */}
          {activeTab === 'Permisos Dashboard Pacientes' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Permisos Dashboard</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Info size={14} /> Configura el acceso por rol.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <select
                    className="maint-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    style={{ minWidth: '200px' }}
                  >
                    <option value="">Seleccionar Rol...</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Enfermera">Enfermera</option>
                    <option value="Recepcionista">Recepcionista</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  <button
                    onClick={() => alert("Permissions Saved!")}
                    className="btn-primary"
                    style={{ gap: '0.5rem' }}
                  >
                    <Check size={16} /> GUARDAR
                  </button>
                </div>
              </div>

              <div className="config-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Available Options */}
                <div className="config-card-main" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', fontWeight: '700', color: 'var(--text-secondary)' }}>
                    Opciones Disponibles
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    {permissionItems.available.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => togglePermissionItem(item, true)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderBottom: '1px solid var(--border)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)'
                        }}
                        className="hover-bg-light"
                      >
                        {item}
                        <button className="btn-icon-small" style={{ color: 'var(--primary)' }}><Plus size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Options */}
                <div className="config-card-main" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column', borderColor: 'var(--primary)' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--primary-light)', fontWeight: '700', color: 'var(--primary)' }}>
                    Permisos Asignados ({selectedRole || 'Ninguno'})
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    {permissionItems.selected.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => togglePermissionItem(item, false)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderBottom: '1px solid var(--border)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          color: 'var(--text-main)',
                        }}
                        className="hover-bg-light"
                      >
                        {item}
                        <button className="btn-icon-small" style={{ color: 'var(--accent)' }}><RotateCcw size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- FLUJO DE OPERACION VIEW --- */}
          {/* --- FLUJO DE OPERACION VIEW --- */}
          {activeTab === 'Flujo de Operación' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Flujo de Operaciones</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>DEL CENTRO MEDICO</p>
                </div>
                <button
                  onClick={() => alert("Flow Saved!")}
                  className="btn-primary"
                  style={{ gap: '0.5rem' }}
                >
                  <Save size={16} /> GUARDAR
                </button>
              </div>

              <div className="config-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Available Options (Left) */}
                <div className="config-card-main" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', fontWeight: '700', color: 'var(--text-secondary)' }}>
                    Opciones a seleccionar
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {flowItems.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'stretch',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'white',
                          overflow: 'hidden',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <div style={{
                          backgroundColor: 'var(--primary)',
                          width: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          cursor: 'grab'
                        }}>
                          <span style={{ fontSize: '1rem', lineHeight: '10px' }}>⋮⋮</span>
                        </div>
                        <div style={{ padding: '0.6rem 1rem', flex: 1, color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: '500' }}>
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Sections (Right) */}
                <div className="config-card-main" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column', borderColor: 'var(--primary)' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--primary-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', color: 'var(--primary)' }}>Opciones Seleccionadas</span>
                    <button
                      onClick={handleOpenSectionModal}
                      className="btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', height: 'auto' }}
                    >
                      <Plus size={14} /> NUEVA SECCION
                    </button>
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {flowSections.length === 0 ? (
                      <div style={{
                        backgroundColor: 'var(--bg-main)',
                        padding: '2rem',
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px dashed var(--border)'
                      }}>
                        Crea una nueva sección para iniciar sus opciones.
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {flowSections.map(section => (
                          <div key={section.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'white', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.6rem 1rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: 'var(--text-main)' }}>{section.nombre}</span>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{section.descripcion}</span>
                            </div>
                            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', border: '1px dashed var(--border)', margin: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                              Arrastra opciones aquí
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- SERVICIOS VIEW --- */}
          {activeTab === 'Servicios' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Listado de Servicios</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gestión de servicios ofrecidos.</p>
                </div>
                <button
                  onClick={handleOpenServiceModal}
                  className="btn-primary"
                  style={{ gap: '0.5rem' }}
                >
                  <Plus size={16} /> NUEVO SERVICIO
                </button>
              </div>

              <div className="config-card-main" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ position: 'relative', flex: 1, maxWidth: '500px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label className="maint-label" style={{ whiteSpace: 'nowrap' }}>BUSCAR:</label>
                    <input
                      type="text"
                      placeholder="Buscar servicios..."
                      value={servicesSearch}
                      onChange={(e) => setServicesSearch(e.target.value)}
                      className="maint-input"
                    />
                  </div>
                  <button className="btn-secondary" style={{ color: 'var(--primary)' }}>
                    <Search size={18} />
                  </button>
                  <button className="btn-secondary" style={{ color: 'var(--primary)' }}>
                    <Download size={18} />
                  </button>
                </div>

                {services.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No existe información para mostrar
                  </div>
                ) : (
                  <div className="maint-table-container">
                    <div className="maint-table-header" style={{ gridTemplateColumns: '2fr 1fr 1fr 100px' }}>
                      <div>Descripción</div>
                      <div>Duración</div>
                      <div>Tipo</div>
                      <div style={{ textAlign: 'center' }}>Acciones</div>
                    </div>
                    {services.map(service => (
                      <div key={service.id} className="maint-table-row" style={{ gridTemplateColumns: '2fr 1fr 1fr 100px', gap: '1rem' }}>
                        <div data-label="Descripción" style={{ fontWeight: '500' }}>{service.descripcion}</div>
                        <div data-label="Duración" style={{ color: 'var(--text-secondary)' }}>{service.duracion}</div>
                        <div data-label="Tipo" style={{ color: 'var(--text-secondary)' }}>{service.tipoServicio}</div>
                        <div data-label="Acciones" style={{ display: 'flex', justifyContent: 'center' }}>
                          <button className="btn-secondary" style={{ padding: '0.4rem' }}>
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- ESPECIALIDADES VIEW --- */}
          {activeTab === 'Especialidades' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Especialidades</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <List size={12} /> Listado de Especialidades
                  </p>
                </div>
              </div>

              <div className="config-card-main" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Buscar:</label>
                    <input
                      type="text"
                      className="maint-input"
                      value={specialtiesSearch}
                      onChange={(e) => setSpecialtiesSearch(e.target.value)}
                      style={{ maxWidth: '400px' }}
                      placeholder="Buscar especialidad..."
                    />
                    <button className="btn-ghost" style={{ color: 'var(--primary)' }}>
                      <Search size={18} />
                    </button>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ gap: '0.5rem', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    <Plus size={16} /> NUEVO
                  </button>
                </div>

                <div className="maint-table-container">
                  {/* Table Header */}
                  <div className="maint-table-header" style={{ gridTemplateColumns: '80px 1fr 150px' }}>
                    <div>Codigo</div>
                    <div>Descripción</div>
                    <div style={{ textAlign: 'center' }}>Acciones</div>
                  </div>

                  {/* Inline Add Row */}
                  <div className="maint-table-row" style={{ gridTemplateColumns: '80px 1fr 150px', gap: '1rem', backgroundColor: 'var(--bg-main)' }}>
                    <div></div>
                    <div data-label="Descripción">
                      <input
                        type="text"
                        value={newSpecialtyName}
                        onChange={(e) => setNewSpecialtyName(e.target.value)}
                        className="maint-input"
                        placeholder="Nueva Especialidad"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div data-label="Acciones" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                      <button onClick={handleAddSpecialty} className="btn-secondary" style={{ color: 'var(--error)' }}>
                        <X size={14} />
                      </button>
                      <button className="btn-primary" style={{ padding: '0.4rem' }}>
                        <Save size={14} />
                      </button>
                    </div>
                  </div>

                  {/* List of Specialties */}
                  {specialties
                    .filter(s => s.name.toLowerCase().includes(specialtiesSearch.toLowerCase()))
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map(specialty => (
                      <div key={specialty.id} className="maint-table-row" style={{ gridTemplateColumns: '80px 1fr 150px', gap: '1rem' }}>
                        <div data-label="Codigo" style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>{specialty.code}</div>
                        <div data-label="Descripción">
                          {editingSpecialtyId === specialty.id ? (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <input
                                type="text"
                                value={editingSpecialtyName}
                                onChange={(e) => setEditingSpecialtyName(e.target.value)}
                                className="maint-input"
                                style={{ flex: 1 }}
                              />
                              <button onClick={saveEditingSpecialty} className="btn-ghost" style={{ color: 'var(--success)' }}><Check size={18} /></button>
                              <button onClick={() => setEditingSpecialtyId(null)} className="btn-ghost" style={{ color: 'var(--error)' }}><X size={18} /></button>
                            </div>
                          ) : (
                            <div style={{ color: 'var(--text-main)', fontWeight: '500' }}>
                              {specialty.name}
                            </div>
                          )}
                        </div>
                        <div data-label="Acciones" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                          <button onClick={() => handleOpenSpecialtyModal(specialty)} className="btn-secondary" title="Servicios">
                            <List size={16} />
                          </button>
                          <button onClick={() => startEditingSpecialty(specialty)} className="btn-secondary" title="Editar">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDeleteSpecialty(specialty.id)} className="btn-secondary" style={{ color: 'var(--error)' }} title="Eliminar">
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Pagination footer */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0.2rem', gap: '0.5rem' }}>
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="btn-secondary"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span style={{ margin: '0 0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                      {currentPage}/{Math.ceil(specialties.length / itemsPerPage)}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(Math.ceil(specialties.length / itemsPerPage), currentPage + 1))}
                      disabled={currentPage === Math.ceil(specialties.length / itemsPerPage)}
                      className="btn-secondary"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- CORREOS VIEW --- */}
          {/* --- CORREOS VIEW --- */}
          {activeTab === 'Correos' && (
            <div style={{ minHeight: '500px' }}>
              {emailViewMode === 'list' ? (
                <>
                  <div className="config-header-row">
                    <div className="config-title-box">
                      <h2>Correos Personales</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <List size={12} /> Configuración de correos personales
                      </p>
                    </div>
                    <button
                      onClick={handleAddEmail}
                      className="btn-primary"
                      style={{ gap: '0.5rem' }}
                    >
                      <Plus size={16} /> AGREGAR
                    </button>
                  </div>

                  <div className="config-card-main" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="maint-table-header" style={{ gridTemplateColumns: '1fr 150px' }}>
                      <div>Descripción</div>
                      <div>Tipo</div>
                    </div>

                    {emails.length === 0 ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        No hay correos configurados.
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {emails.map(email => (
                          <div key={email.id} className="maint-table-row" style={{ gridTemplateColumns: '1fr 150px' }}>
                            <div data-label="Descripción" style={{ fontWeight: '500' }}>{email.asunto}</div>
                            <div data-label="Tipo" style={{ color: 'var(--text-secondary)' }}>{email.tipo}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="config-header-row">
                    <div className="config-title-box">
                      <h2>Correos Personalizados</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Editar plantilla de correo.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary" style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
                        VISTA PREVIA
                      </button>
                      <button
                        onClick={handleSaveEmail}
                        className="btn-primary"
                        style={{ gap: '0.5rem' }}
                      >
                        <Save size={16} /> GUARDAR
                      </button>
                    </div>
                  </div>

                  <div className="config-card-main" style={{ padding: '2rem' }}>
                    <div className="config-form-grid" style={{ gridTemplateColumns: '1fr' }}>
                      <div className="config-field-row">
                        <label>Tipo:</label>
                        <select
                          name="tipo"
                          value={emailFormData.tipo}
                          onChange={handleEmailFormChange}
                          className="maint-select"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="Bienvenida">Bienvenida</option>
                          <option value="Recordatorio">Recordatorio</option>
                          <option value="Factura">Factura</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>

                      <div className="config-field-row">
                        <label>Asunto:</label>
                        <input
                          type="text"
                          name="asunto"
                          value={emailFormData.asunto}
                          onChange={handleEmailFormChange}
                          className="maint-input"
                        />
                      </div>

                      <div className="config-field-row">
                        <label>Cuerpo:</label>
                        <textarea
                          name="cuerpo"
                          value={emailFormData.cuerpo}
                          onChange={handleEmailFormChange}
                          rows={12}
                          className="maint-input"
                          style={{ resize: 'vertical', minHeight: '200px', lineHeight: '1.5' }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* --- SERVICIOS QUIRURGICOS VIEW --- */}
          {activeTab === 'Servicios Quirúrgicos' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Procedimientos Quirúrgicos</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <List size={12} /> Creación de Procedimientos Quirúrgicos
                  </p>
                </div>
              </div>

              <div className="config-card-main" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '1rem' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Buscar:</label>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px', display: 'flex' }}>
                      <input
                        type="text"
                        value={surgicalSearch}
                        onChange={(e) => setSurgicalSearch(e.target.value)}
                        className="maint-input"
                        style={{ paddingRight: '2rem' }}
                      />
                      <div style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }}>
                        <Search size={16} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" style={{ color: 'var(--error)', gap: '0.3rem' }}>
                      <X size={14} /> ELIMINAR
                    </button>
                    <button
                      onClick={handleOpenSurgicalModal}
                      className="btn-primary"
                      style={{ gap: '0.5rem' }}
                    >
                      <Plus size={16} /> AGREGAR
                    </button>
                  </div>
                </div>

                <div className="maint-table-container">
                  <div className="maint-table-header" style={{ gridTemplateColumns: '1fr' }}>
                    <div>Descripción</div>
                  </div>

                  {surgicalServices.length === 0 ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No hay procedimientos registrados
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {surgicalServices
                        .filter(s => s.descripcion.toLowerCase().includes(surgicalSearch.toLowerCase()))
                        .map(service => (
                          <div key={service.id} className="maint-table-row" style={{ gridTemplateColumns: '1fr' }}>
                            <div data-label="Descripción" style={{ color: 'var(--text-main)' }}>{service.descripcion}</div>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>

                {/* Pagination Mockup */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn-secondary"><ChevronLeft size={16} /></button>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>{surgicalPage}/1</span>
                    <button className="btn-secondary"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- INDICACIONES VIEW --- */}
          {/* --- INDICACIONES VIEW --- */}
          {activeTab === 'Indicaciones' && (
            <div style={{ minHeight: '500px' }}>
              {/* Top Navigation for Indicaciones */}
              <div style={{
                display: 'flex',
                gap: '1px',
                backgroundColor: 'var(--bg-main)',
                borderBottom: '1px solid var(--border)',
                marginBottom: '1.5rem',
                borderTopLeftRadius: 'var(--radius-md)',
                borderTopRightRadius: 'var(--radius-md)',
                overflow: 'hidden'
              }}>
                {['Maintenance of Indications', 'Category', 'Template'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setIndicationsSubTab(tab === 'Maintenance of Indications' ? 'Maintenance' : tab)}
                    style={{
                      padding: '1rem 1.5rem',
                      backgroundColor: indicationsSubTab === (tab === 'Maintenance of Indications' ? 'Maintenance' : tab) ? 'white' : 'var(--bg-card)',
                      color: indicationsSubTab === (tab === 'Maintenance of Indications' ? 'Maintenance' : tab) ? 'var(--primary)' : 'var(--text-muted)',
                      border: 'none',
                      borderBottom: indicationsSubTab === (tab === 'Maintenance of Indications' ? 'Maintenance' : tab) ? '2px solid var(--primary)' : 'none',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      flex: 1,
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Maintenance Sub-tab */}
              {indicationsSubTab === 'Maintenance' && (
                <>
                  <div className="config-header-row">
                    <div className="config-title-box">
                      <h2>Maintenance of Indications</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <List size={12} /> Instructions
                      </p>
                    </div>
                  </div>

                  <div className="config-card-main" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Look for:</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '300px' }}>
                          <input
                            type="text"
                            value={indicationsSearch}
                            onChange={(e) => setIndicationsSearch(e.target.value)}
                            className="maint-input"
                            style={{ flex: 1 }}
                          />
                          <button className="btn-ghost" style={{ color: 'var(--primary)' }}>
                            <Search size={18} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={handleOpenIndicationModal}
                          className="btn-primary"
                          style={{ gap: '0.5rem' }}
                        >
                          <Plus size={16} /> ADD
                        </button>
                      </div>
                    </div>

                    <div className="maint-table-container">
                      <div className="maint-table-header" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
                        <div>Description</div>
                        <div>Type</div>
                        <div>Result Type</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {indications.map(ind => (
                          <div key={ind.id} className="maint-table-row" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
                            <div data-label="Description" style={{ color: 'var(--text-main)', fontWeight: '500' }}>{ind.description}</div>
                            <div data-label="Type" style={{ color: 'var(--text-secondary)' }}>{ind.type}</div>
                            <div data-label="Result Type" style={{ color: 'var(--text-secondary)' }}>{ind.resultType}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="btn-secondary"><ChevronLeft size={16} /></button>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>1/1</span>
                        <button className="btn-secondary"><ChevronRight size={16} /></button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Category Sub-tab */}
              {indicationsSubTab === 'Category' && (
                <>
                  <div className="config-header-row">
                    <div className="config-title-box">
                      <h2>Maintenance of Indications</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <List size={12} /> Instructions
                      </p>
                    </div>
                  </div>

                  <div className="config-card-main" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Look for:</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '300px' }}>
                          <input
                            type="text"
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            className="maint-input"
                            style={{ flex: 1 }}
                          />
                          <button className="btn-ghost" style={{ color: 'var(--primary)' }}>
                            <Search size={18} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            const name = prompt("Enter Category Description:");
                            if (name) setCategories([...categories, { id: Date.now(), description: name }]);
                          }}
                          className="btn-primary"
                          style={{ gap: '0.5rem' }}
                        >
                          <Plus size={16} /> ADD
                        </button>
                      </div>
                    </div>

                    <div className="maint-table-container">
                      <div className="maint-table-header" style={{ gridTemplateColumns: '50px 1fr' }}>
                        <div>#</div>
                        <div>Description</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {categories.length > 0 ? categories.map((cat, idx) => (
                          <div key={cat.id} className="maint-table-row" style={{ gridTemplateColumns: '50px 1fr' }}>
                            <div data-label="#" style={{ color: 'var(--text-muted)' }}>{idx + 1}</div>
                            <div data-label="Description" style={{ color: 'var(--text-main)', fontWeight: '500' }}>{cat.description}</div>
                          </div>
                        )) : (
                          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No categories found</div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="btn-secondary"><ChevronLeft size={16} /></button>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>1/1</span>
                        <button className="btn-secondary"><ChevronRight size={16} /></button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Template Sub-tab */}
              {indicationsSubTab === 'Template' && (
                <>
                  <div className="config-header-row">
                    <div className="config-title-box">
                      <h2>Instructions Template</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <List size={12} /> Instructions Template
                      </p>
                    </div>
                  </div>

                  <div className="config-grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    <div className="config-card-main" style={{ height: '500px' }}>
                      <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: '600', textTransform: 'uppercase' }}>Options to select</h3>
                      <div style={{ padding: '2rem', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)', minHeight: '100px', backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)', textAlign: 'center' }}>
                        {/* Drag source area */}
                        Drag items here
                      </div>
                    </div>
                    <div className="config-card-main" style={{ height: '500px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0, fontWeight: '600', textTransform: 'uppercase' }}>Selected options</h3>
                        <button
                          onClick={handleOpenTemplateModal}
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', height: 'auto' }}
                        >
                          <Plus size={14} /> NEW SECTION
                        </button>
                      </div>
                      <div style={{ backgroundColor: 'var(--bg-main)', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Create a new section to start your options.
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>
          )}

          {/* --- BRANCHES (SUCURSALES) VIEW --- */}
          {/* --- BRANCHES (SUCURSALES) VIEW --- */}
          {activeTab === 'Sucursales' && (
            <div style={{ minHeight: '500px' }}>
              <div className="config-header-row">
                <div className="config-title-box">
                  <h2>Branch Maintenance</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <List size={12} /> Branches
                  </p>
                </div>
              </div>

              <div className="config-card-main" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Look for:</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '300px' }}>
                      <input
                        type="text"
                        value={branchSearch}
                        onChange={(e) => setBranchSearch(e.target.value)}
                        className="maint-input"
                        style={{ flex: 1 }}
                      />
                      <button className="btn-ghost" style={{ color: 'var(--primary)' }}>
                        <Search size={18} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleOpenBranchModal}
                      className="btn-primary"
                      style={{ gap: '0.5rem' }}
                    >
                      <Plus size={16} /> ADD
                    </button>
                  </div>
                </div>

                <div className="maint-table-container">
                  <div className="maint-table-header" style={{ gridTemplateColumns: '2fr 2fr 100px 100px' }}>
                    <div>Name</div>
                    <div>Address</div>
                    <div style={{ textAlign: 'center' }}>Principal</div>
                    <div style={{ textAlign: 'center' }}>Status</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {branches.length > 0 ? branches.map(branch => (
                      <div key={branch.id} className="maint-table-row" style={{ gridTemplateColumns: '2fr 2fr 100px 100px' }}>
                        <div data-label="Name" style={{ fontWeight: '600', color: 'var(--text-main)' }}>{branch.name}</div>
                        <div data-label="Address" style={{ color: 'var(--text-secondary)' }}>{branch.address}</div>
                        <div data-label="Principal" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                          {branch.principal && <Check size={18} color="var(--success)" />}
                        </div>
                        <div data-label="Status" style={{ textAlign: 'center' }}>
                          <span style={{
                            backgroundColor: branch.status ? 'var(--bg-success)' : 'var(--bg-secondary)',
                            color: branch.status ? 'var(--success)' : 'var(--text-muted)',
                            padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.05em'
                          }}>
                            {branch.status ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </div>
                      </div>
                    )) : (
                      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>No branches found</div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn-secondary"><ChevronLeft size={16} /></button>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>1/1</span>
                    <button className="btn-secondary"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- PLACEHOLDER FOR OTHER TABS --- */}
          {!['Perfil General', 'Programas', 'Posiciones de trabajo', 'Estados de cita', 'Plan de Indicadores', 'Dashboard Pacientes', 'Permisos Dashboard Pacientes', 'Flujo de Operación', 'Servicios', 'Especialidades', 'Correos', 'Servicios Quirúrgicos', 'Indicaciones', 'Sucursales'].includes(activeTab) && (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#9CA3AF' }}>
              Section "{activeTab}" under construction
            </div>
          )}
        </div>
      </div>
    </DashboardLayout >
  );
};

export default Configuration;
