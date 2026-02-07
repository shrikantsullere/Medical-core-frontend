import React, { useState } from 'react';
import DashboardLayout from '../../components/medcore/DashboardLayout';
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
  const [positions, setPositions] = useState([]);

  // State for Estados de cita
  const [appointmentStates, setAppointmentStates] = useState([
    { id: 1, section: 'Agenda', description: 'Pendiente por confirmar', tipo: 'agenda', color: 'Platino', hex: '#E5E7EB' },
    { id: 2, section: 'Agenda', description: 'Confirmada', tipo: 'agenda', color: 'Verde', hex: '#22C55E' },
    // ... abbreviated for brevity, same as previous
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
      'Perfil del Paciente', 'Eventos/Actividades', 'Programas de Seguimiento',
      'Historial', 'Historial de Cobros', 'Cuestionario Inicial', 'Odontograma',
      'Presupuesto', 'Preautorización', 'Consultas', 'Plan Prenatal', 'Recetarios',
      'Mensajería', 'Receso', 'Indicaciones', 'Resultados', 'Adjuntar Archivos',
      'Procedimientos', 'Prescripción de gafas', 'Vacunas', 'Casos',
      'Exámenes Previos', 'Cuestionarios de seguimiento', 'Procedimiento Quirúrgico',
      'Checkout', 'Separador', 'Carta de Referencia', 'Licencia Médica',
      'Certificado Médico', 'Plan de Tratamiento'
    ],
    selected: []
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
  const [selectedRole, setSelectedRole] = useState('');
  const [permissionItems, setPermissionItems] = useState({
    available: [
      'Perfil del Paciente', 'Eventos/Actividades', 'Programas de Seguimiento',
      'Historial', 'Historial de Cobros', 'Cuestionario Inicial', 'Odontograma',
      'Presupuesto', 'Preautorización', 'Consultas', 'Plan Prenatal', 'Recetarios',
      'Mensajería', 'Receso', 'Indicaciones', 'Resultados', 'Adjuntar Archivos',
      'Procedimientos', 'Prescripción de gafas', 'Vacunas', 'Casos',
      'Exámenes Previos', 'Cuestionarios de seguimiento', 'Procedimiento Quirúrgico',
      'Checkout', 'Separador', 'Carta de Referencia', 'Licencia Médica',
      'Certificado Médico', 'Plan de Tratamiento'
    ],
    selected: []
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
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '100px'
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '600px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#F97316', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit2 size={18} /> Creación de Sección
              </h3>
              <button onClick={handleCloseSectionModal} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>✕</span>
              </button>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.5rem' }}>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={sectionFormData.nombre}
                  onChange={handleSectionFormChange}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
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
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px' }}
                >
                  <option value="">Buscar...</option>
                  <option value="user">User</option>
                  <option value="clipboard">Clipboard</option>
                  <option value="activity">Activity</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  onClick={handleSaveSection}
                  style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Check size={16} /> GUARDAR
                </button>
                <button
                  onClick={handleCloseSectionModal}
                  style={{ backgroundColor: 'white', color: '#4B5563', border: 'none', padding: '0.5rem 1rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>✕</span> CERRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Service Creation */}
      {isServiceModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '50px'
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '700px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#F97316', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Creación de servicio
              </h3>
              <button onClick={handleCloseServiceModal} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '2rem' }}>
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
                  style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
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
            <div style={{ backgroundColor: '#F97316', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
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
                  <button style={{ color: '#F97316', background: 'none', border: 'none', cursor: 'pointer' }}>
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
                  <X size={16} color="#F97316" /> CANCELAR
                </button>
                <button
                  onClick={() => { alert("Servicios guardados"); handleCloseSpecialtyModal(); }}
                  style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
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
            <div style={{ backgroundColor: '#F97316', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
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
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #D9534F', borderRadius: '3px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#D9534F', marginBottom: '0.3rem' }}>Type:</label>
                  <select
                    name="type"
                    value={indicationFormData.type}
                    onChange={handleIndicationFormChange}
                    className="custom-select"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #D9534F', borderRadius: '3px' }}
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
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#D9534F', marginBottom: '0.3rem' }}>Result Type:</label>
                  <select
                    name="resultType"
                    value={indicationFormData.resultType}
                    onChange={handleIndicationFormChange}
                    className="custom-select"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #D9534F', borderRadius: '3px' }}
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
                  style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}
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
            <div style={{ backgroundColor: '#F97316', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
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
                  style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}
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
            <div style={{ backgroundColor: '#F97316', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
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
                  <X size={14} color="#F97316" /> CANCEL
                </button>
                <button
                  onClick={handleSaveTemplate}
                  style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}
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
            <div style={{ backgroundColor: '#F97316', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
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
                  style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Check size={16} /> GUARDAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', minHeight: '100%', alignItems: 'stretch' }}>

        {/* Configuration Sidebar */}
        <div style={{ width: '250px', backgroundColor: 'white', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Profile Placeholder */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'white' }}>
              <User size={40} />
            </div>
            <h3 style={{ fontSize: '0.85rem', textAlign: 'center', color: '#6B7280', margin: 0 }}>Centro Medico Lopez y Asoc</h3>
          </div>

          {/* Menu List */}
          <div style={{ padding: '1rem 0' }}>
            {menuItems.map(item => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  if (item !== 'Plan de Indicadores') setPlanViewMode('list'); // Reset sub-view when changing tabs
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.8rem 1.5rem',
                  background: activeTab === item ? '#F28C28' : 'white',
                  color: activeTab === item ? 'white' : '#1F2937',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === item ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: '2rem', backgroundColor: '#F9FAFB', overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>

          {/* Conditional Header for Perfil General */}
          {activeTab === 'Perfil General' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '500', color: '#1F2937', margin: '0 0 0.5rem 0' }}>Perfil Centro Médico</h2>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lock size={12} /> Aquí puedes modificar las configuraciones de la cuenta.
                </p>
              </div>
              <button
                onClick={() => alert('Saved Settings: ' + JSON.stringify(formData))}
                style={{
                  backgroundColor: '#F8A359',
                  color: 'white',
                  border: 'none',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase'
                }}>
                <Check size={16} /> GUARDAR
              </button>
            </div>
          )}

          {/* --- PERFIL GENERAL VIEW --- */}
          {activeTab === 'Perfil General' && (
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: '1rem' }}>
                      <label style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 'bold', color: '#4B5563' }}>{field.label}</label>
                      {field.type === 'select' ? (
                        <select className="custom-select" name={field.name} value={formData[field.name]} onChange={handleInputChange}>
                          {field.options && field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          className="custom-input"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder || ''}
                        />
                      )}
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: '1rem' }}>
                    <label style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 'bold', color: '#4B5563' }}>Horario Agenda</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.7rem', color: '#666' }}>Desde</label>
                        <input type="time" className="custom-input" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.7rem', color: '#666' }}>Hasta</label>
                        <input type="time" className="custom-input" />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <label style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 'bold', color: '#4B5563' }}>Sello Digital</label>
                    <button style={{ width: 'fit-content', backgroundColor: '#F8A359', color: 'white', border: 'none', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase' }}>
                      CARGA SELLO +
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
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
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#4B5563' }} />
                      <label style={{ fontSize: '0.8rem', color: '#4B5563' }}>{label}</label>
                    </div>
                  ))}
                </div>
              </div>
              {['Impresiones personalizadas', 'Recordatorios', 'Casos', 'Información adicional', 'Historial de Pacientes'].map((section, idx) => (
                <div key={idx} style={{ marginTop: '3rem' }}>
                  <h4 style={{ fontSize: '1rem', color: '#374151', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {section === 'Impresiones personalizadas' && <span style={{ fontWeight: 'bold' }}>🖨️</span>}
                    {section === 'Recordatorios' && <span style={{ fontWeight: 'bold' }}>🔔</span>}
                    {section === 'Casos' && <span style={{ fontWeight: 'bold' }}>✒️</span>}
                    {section === 'Información adicional' && <span style={{ fontWeight: 'bold' }}>ℹ️</span>}
                    {section === 'Historial de Pacientes' && <span style={{ fontWeight: 'bold' }}>ℹ️</span>}
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
                  <h4 style={{ fontSize: '1rem', color: '#374151', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {section === 'Teléfonos' ? '📞' : '📍'} {section}
                  </h4>
                  <div style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
                    <button style={{ backgroundColor: '#FF5722', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>+ AGREGAR</button>
                  </div>
                  <div style={{ backgroundColor: '#0B3B3C', color: 'white', padding: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {section === 'Teléfonos' ? 'Tipo / Teléfono' : 'País / Provincia / Sector / Dirección'}
                  </div>
                  <div style={{ padding: '2rem', border: '1px solid #eee', textAlign: 'center', color: '#ccc', fontSize: '0.8rem' }}>
                    No entries found
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- PROGRAMAS VIEW --- */}
          {activeTab === 'Programas' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid #eee' }}>Programas</h2>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', backgroundColor: 'white', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: '600px' }}>
                  <label style={{ fontSize: '0.9rem', color: '#666', marginRight: '1rem' }}>Buscar:</label>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      style={{ flex: 1, border: '1px solid #ddd', padding: '0.5rem', fontSize: '0.9rem', borderRight: 'none', borderRadius: '2px 0 0 2px' }}
                    />
                    <button style={{ backgroundColor: 'white', border: '1px solid #ddd', borderLeft: 'none', padding: '0.5rem', cursor: 'pointer', color: '#F28C28' }}>
                      <Search size={18} />
                    </button>
                  </div>
                </div>
                <button style={{ backgroundColor: '#FF5722', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase' }}>
                  + AGREGAR
                </button>
              </div>
              <div style={{ backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 100px', backgroundColor: '#0B3B3C', color: 'white', padding: '0.8rem 1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  <div>Código</div>
                  <div>Programa</div>
                  <div>Descripción</div>
                  <div style={{ textAlign: 'right' }}>Acción</div>
                </div>
                <div style={{ padding: '4rem', textAlign: 'center', color: '#ccc' }}>
                  No programs found
                </div>
              </div>
            </div>
          )}

          {/* --- POSICIONES DE TRABAJO VIEW --- */}
          {activeTab === 'Posiciones de trabajo' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Mantenimiento de puestos de trabajo</h2>
              </div>
              <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <button
                  onClick={handleAddPosition}
                  style={{ backgroundColor: '#FF5722', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  + AGREGAR
                </button>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.5fr 3fr 1.5fr 150px', backgroundColor: '#0B3B3C', color: 'white', padding: '0.8rem 1rem', fontSize: '0.85rem', fontWeight: 'bold', alignItems: 'center' }}>
                  <div>Puesto</div>
                  <div>Alias</div>
                  <div>Rol</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Consultorio <Info size={14} /></div>
                  <div></div>
                </div>

                {positions.map(pos => (
                  <div key={pos.id} style={{ display: 'grid', gridTemplateColumns: '3fr 1.5fr 3fr 1.5fr 150px', padding: '1rem', borderBottom: '1px solid #eee', alignItems: 'center', gap: '1rem' }}>
                    <input type="text" placeholder="" className="custom-input" style={{ width: '100%', borderRadius: '2px' }} />
                    <input type="text" placeholder="" className="custom-input" style={{ width: '100%', borderRadius: '2px' }} />
                    <div style={{ position: 'relative' }}>
                      <select className="custom-select" style={{ width: '100%', borderRadius: '2px', paddingRight: '20px' }}>
                        <option>SELECCIONAR</option>
                        <option>Doctor</option>
                        <option>Assistant</option>
                        <option>Receptionist</option>
                      </select>
                    </div>
                    <div></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleRemovePosition(pos.id)} style={{ backgroundColor: '#EF4444', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '2px', cursor: 'pointer', display: 'flex' }}><RotateCcw size={14} /></button>
                      <button style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '2px', cursor: 'pointer', display: 'flex' }}><Check size={14} /></button>
                      <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#333' }} />
                    </div>
                  </div>
                ))}

                {positions.length === 0 && (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>
                    No entries. Click <span style={{ fontWeight: 'bold', color: '#FF5722' }}>+ AGREGAR</span> to add a new position.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- ESTADOS DE CITA VIEW --- */}
          {activeTab === 'Estados de cita' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Mantenimiento de estado</h2>
              </div>
              <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <button
                  onClick={handleAddState}
                  style={{ backgroundColor: '#FF5722', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  + AGREGAR
                </button>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1.5fr) 1fr 1fr 100px', backgroundColor: '#0B3B3C', color: 'white', padding: '0.8rem 1rem', fontSize: '0.85rem', fontWeight: 'bold', alignItems: 'center' }}>
                  <div>Description</div>
                  <div>Tipo</div>
                  <div>Color</div>
                  <div></div>
                </div>

                {/* Dynamic Input Rows for New States */}
                {newStates.map(state => (
                  <div key={state.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1.5fr) 1fr 1fr 100px', padding: '1rem', borderBottom: '1px solid #eee', alignItems: 'center', gap: '1rem', backgroundColor: '#F0F9FF' }}>
                    <input type="text" className="custom-input" style={{ width: '100%' }} />
                    <select className="custom-select" style={{ width: '100%' }}><option>Select...</option></select>
                    <select className="custom-select" style={{ width: '100%' }}><option>Select...</option></select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleRemoveNewState(state.id)} style={{ backgroundColor: '#EF4444', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '2px', cursor: 'pointer', display: 'flex' }}><RotateCcw size={14} /></button>
                      <button style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '2px', cursor: 'pointer', display: 'flex' }}><Check size={14} /></button>
                    </div>
                  </div>
                ))}

                {/* Existing States Grouped by Section */}
                {Object.keys(groupedStates).map(section => (
                  <React.Fragment key={section}>
                    <div style={{ backgroundColor: '#14B8A6', color: 'white', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {section}
                    </div>
                    {groupedStates[section].map(state => (
                      <div key={state.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1.5fr) 1fr 1fr 100px', padding: '0.8rem 1rem', borderBottom: '1px solid #eee', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
                        <div>{state.description}</div>
                        <div>{state.tipo}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {state.color}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: state.hex, border: '1px solid #ddd' }}></div>
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}><Edit2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* --- PLAN DE INDICADORES VIEW --- */}
          {activeTab === 'Plan de Indicadores' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              {planViewMode === 'list' ? (
                <>
                  {/* List View Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Listado de Plan de Indicaciones</h2>
                      <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: '500' }}>📄 Lista de Plan de Indicaciones</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <ArrowLeft size={14} /> REGRESAR
                      </button>
                      <button
                        onClick={() => setPlanViewMode('create')}
                        style={{ backgroundColor: '#FF8A3D', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <Plus size={16} /> NUEVO PLAN
                      </button>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
                      <label style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '0',
                        backgroundColor: '#FF8A3D',
                        color: 'white',
                        fontSize: '0.65rem',
                        padding: '2px 6px',
                        fontWeight: 'bold',
                        borderRadius: '2px'
                      }}>BUSCAR:</label>
                      <input
                        type="text"
                        placeholder="Buscar"
                        value={planSearch}
                        onChange={(e) => setPlanSearch(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '2px', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                    <Search size={18} color="#FF8A3D" style={{ cursor: 'pointer' }} />
                    <Search size={18} color="#FF8A3D" style={{ cursor: 'pointer' }} />
                  </div>

                  {/* Empty State */}
                  <div style={{ textAlign: 'center', padding: '4rem', color: '#666', fontSize: '0.9rem' }}>
                    No existe información para mostrar
                  </div>
                </>
              ) : (
                <>
                  {/* Create View Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Mantenimiento de Plan de Indicaciones</h2>
                      <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: '500' }}>📄 Creación de Plan de Indicaciones.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setPlanViewMode('list')}
                        style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                      >
                        <ArrowLeft size={14} /> REGRESAR
                      </button>
                      <button
                        onClick={() => alert("Plan Saved!")}
                        style={{ backgroundColor: '#FFBB75', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <Save size={16} /> GUARDAR
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2rem' }}>

                    {/* Left Form Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 'bold', color: '#D9534F' }}>Nombre:</label>
                        <input
                          type="text"
                          placeholder="Nombre del plan"
                          className="custom-input"
                          style={{ width: '100%', borderColor: '#D9534F' }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 'bold', color: '#D9534F' }}>Tipo:</label>
                        <select className="custom-select" style={{ width: '100%', borderColor: '#D9534F' }}>
                          <option></option>
                        </select>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 'bold', color: '#D9534F' }}>Depende de la edad de:</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          {['PACIENTE', 'EMBARAZO', 'NINGUNO'].map(opt => (
                            <label key={opt} style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              {opt}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search & List Section */}
                  <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                    <div>
                      <input type="text" placeholder="Buscar" className="custom-input" style={{ width: '100%', marginBottom: '1rem' }} />

                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Procedimientos Disponibles <span style={{ backgroundColor: '#F28C28', color: 'white', padding: '1px 5px', borderRadius: '2px', fontSize: '0.7rem' }}>1892</span>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: '#333', borderLeft: '3px solid #ddd', paddingLeft: '1rem' }}>
                        <div style={{ padding: '0.5rem 0', cursor: 'pointer' }}>› EXTRACCION DE DISPOSITIVO IMPLANTADO EN CODO POR ARTROTOMIA</div>
                        <div style={{ padding: '0.5rem 0', cursor: 'pointer' }}>› EXTRACCION DE DISPOSITIVO IMPLANTADO EN COLUMNA VERTEBRAL, VIA POSTERIOR+</div>
                        <div style={{ padding: '0.5rem 0', cursor: 'pointer' }}>› CRANEOTOMIA SUB OCCIPITAL, EXTIRPACION DE AMIGDALAS CEREBELOSA</div>
                        <div style={{ padding: '0.5rem 0', cursor: 'pointer' }}>› TENOSINOVECTOMIA</div>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Grupos</div>
                      <button style={{ color: '#1E90FF', background: 'none', border: 'none', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>
                        + Nuevo Grupo
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* --- DASHBOARD PACIENTES VIEW --- */}
          {activeTab === 'Dashboard Pacientes' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Dashboard Pacientes</h2>
                <button
                  onClick={() => alert("Dashboard Settings Saved!")}
                  style={{
                    backgroundColor: '#FF5722',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '2px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  GUARDAR
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Available Options */}
                <div style={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#374151' }}>
                    Opciones a seleccionar
                  </div>
                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {dashboardItems.available.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleDashboardItem(item, true)}
                        style={{
                          padding: '0.8rem 1rem',
                          borderBottom: '1px solid #f3f4f6',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          fontSize: '0.85rem',
                          color: '#4B5563'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        {item}
                        <Plus size={16} color="#F28C28" />
                      </div>
                    ))}
                    {dashboardItems.available.length === 0 && (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.85rem' }}>
                        No hay más opciones disponibles.
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Options */}
                <div style={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#374151' }}>
                    Opciones seleccionadas
                  </div>
                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {dashboardItems.selected.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleDashboardItem(item, false)}
                        style={{
                          padding: '0.8rem 1rem',
                          borderBottom: '1px solid #f3f4f6',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          fontSize: '0.85rem',
                          color: '#111827',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        {item}
                        <RotateCcw size={14} color="#EF4444" />
                      </div>
                    ))}
                    {dashboardItems.selected.length === 0 && (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.85rem' }}>
                        Selecciona opciones de la lista izquierda.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- PERMISOS DASHBOARD PACIENTES VIEW --- */}
          {activeTab === 'Permisos Dashboard Pacientes' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Permisos del dashboard de paciente</h2>
                  <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Info size={12} /> Configuración de los permisos al dashboard de paciente.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <select
                    className="custom-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    style={{ minWidth: '200px', padding: '0.4rem', fontSize: '0.85rem' }}
                  >
                    <option value="">Seleccionar Rol</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Enfermera">Enfermera</option>
                    <option value="Recepcionista">Recepcionista</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  <button
                    onClick={() => alert("Permissions Saved!")}
                    style={{
                      backgroundColor: '#F8A359',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '2px',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Check size={16} /> GUARDAR
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Available Options */}
                <div style={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#374151' }}>
                    Opciones a seleccionar
                  </div>
                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {permissionItems.available.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => togglePermissionItem(item, true)}
                        style={{
                          padding: '0.8rem 1rem',
                          borderBottom: '1px solid #f3f4f6',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          fontSize: '0.85rem',
                          color: '#4B5563'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        {item}
                        <Plus size={16} color="#F28C28" />
                      </div>
                    ))}
                    {permissionItems.available.length === 0 && (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.85rem' }}>
                        No hay más opciones disponibles.
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Options */}
                <div style={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#374151' }}>
                    Opciones seleccionadas
                  </div>
                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {permissionItems.selected.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => togglePermissionItem(item, false)}
                        style={{
                          padding: '0.8rem 1rem',
                          borderBottom: '1px solid #f3f4f6',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          fontSize: '0.85rem',
                          color: '#111827',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        {item}
                        <RotateCcw size={14} color="#EF4444" />
                      </div>
                    ))}
                    {permissionItems.selected.length === 0 && (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.85rem' }}>
                        Selecciona opciones de la lista izquierda.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- FLUJO DE OPERACION VIEW --- */}
          {activeTab === 'Flujo de Operación' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>
                  Flujo de Operaciones <span style={{ fontSize: '0.9rem', color: '#9CA3AF', fontWeight: 'normal' }}>DEL CENTRO MEDICO</span>
                </h2>
                <button
                  onClick={() => alert("Flow Saved!")}
                  style={{
                    backgroundColor: '#F97316',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '2px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Save size={16} /> GUARDAR
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.5fr)', gap: '4rem' }}>
                {/* Available Options (Left) */}
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '1rem', fontWeight: '500' }}>Opciones a seleccionar</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {flowItems.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'stretch',
                          border: '1px solid #F97316',
                          borderRadius: '2px',
                          backgroundColor: 'white',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{
                          backgroundColor: '#F97316',
                          width: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          cursor: 'grab'
                        }}>
                          <span style={{ fontSize: '1.2rem', lineHeight: '10px' }}>⋮⋮</span>
                        </div>
                        <div style={{ padding: '0.8rem 1rem', flex: 1, color: '#374151', fontSize: '0.9rem', fontWeight: '500' }}>
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Sections (Right) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#374151', margin: 0, fontWeight: '500' }}>Opciones seleccionadas</h3>
                    <button
                      onClick={handleOpenSectionModal}
                      style={{
                        backgroundColor: '#22C55E',
                        color: 'white',
                        border: 'none',
                        padding: '0.4rem 1rem',
                        borderRadius: '2px',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Plus size={16} /> NUEVA SECCION
                    </button>
                  </div>

                  {flowSections.length === 0 ? (
                    <div style={{
                      backgroundColor: '#E5E7EB',
                      padding: '2rem',
                      textAlign: 'center',
                      color: '#4B5563',
                      fontSize: '0.9rem',
                      borderRadius: '2px',
                      border: '1px solid #D1D5DB'
                    }}>
                      Crea una nueva sección para iniciar sus opciones.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {flowSections.map(section => (
                        <div key={section.id} style={{ border: '1px solid #E5E7EB', borderRadius: '4px', backgroundColor: 'white', overflow: 'hidden' }}>
                          <div style={{ backgroundColor: '#F3F4F6', padding: '0.8rem 1rem', borderBottom: '1px solid #E5E7EB', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {section.nombre}
                            <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 'normal' }}>{section.descripcion}</span>
                          </div>
                          <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.85rem', borderStyle: 'dashed', borderWidth: '2px', borderColor: '#E5E7EB', margin: '1rem' }}>
                            Arrastra opciones aquí
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* --- SERVICIOS VIEW --- */}
          {activeTab === 'Servicios' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>≡</span> Servicios Listado de Servicios
                </h2>
                <button
                  onClick={handleOpenServiceModal}
                  style={{
                    backgroundColor: '#F97316',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '2px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Plus size={16} /> NUEVO SERVICIO
                </button>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
                  <label style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '0',
                    backgroundColor: '#F97316',
                    color: 'white',
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    fontWeight: 'bold',
                    borderRadius: '2px'
                  }}>BUSCAR:</label>
                  <input
                    type="text"
                    placeholder="Buscar"
                    value={servicesSearch}
                    onChange={(e) => setServicesSearch(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '2px', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <Search size={18} color="#F97316" style={{ cursor: 'pointer' }} />
                <Download size={18} color="#F97316" style={{ cursor: 'pointer' }} />
              </div>

              {services.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#333', fontSize: '0.9rem' }}>
                  No existe información para mostrar
                </div>
              ) : (
                <div style={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 100px', backgroundColor: '#374151', color: 'white', padding: '0.8rem 1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    <div>Descripción</div>
                    <div>Duración</div>
                    <div>Tipo</div>
                    <div></div>
                  </div>
                  {services.map(service => (
                    <div key={service.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 100px', padding: '0.8rem 1rem', borderBottom: '1px solid #eee', alignItems: 'center', fontSize: '0.85rem', color: '#374151' }}>
                      <div>{service.descripcion}</div>
                      <div>{service.duracion}</div>
                      <div>{service.tipoServicio}</div>
                      <div style={{ textAlign: 'center' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* --- ESPECIALIDADES VIEW --- */}
          {activeTab === 'Especialidades' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Especialidades</h2>
                <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <List size={12} /> Listado de Especialidades
                </span>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <label style={{ fontSize: '0.9rem', color: '#555' }}>Buscar:</label>
                  <input
                    type="text"
                    className="custom-input"
                    value={specialtiesSearch}
                    onChange={(e) => setSpecialtiesSearch(e.target.value)}
                    style={{ maxWidth: '400px', width: '100%' }}
                  />
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Search size={18} color="#F97316" />
                  </button>
                </div>
                <button
                  style={{ color: '#F97316', background: 'none', border: 'none', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  <Plus size={16} /> NUEVO
                </button>
              </div>

              <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                {/* Table Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px', backgroundColor: '#0B3B3C', color: 'white', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  <div>Codigo</div>
                  <div>Descripción</div>
                  <div></div>
                </div>

                {/* Inline Add Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px', padding: '0.5rem 1rem', borderBottom: '1px solid #eee', backgroundColor: '#fafafa', alignItems: 'center' }}>
                  <div></div>
                  <div>
                    <input
                      type="text"
                      value={newSpecialtyName}
                      onChange={(e) => setNewSpecialtyName(e.target.value)}
                      style={{ width: '100%', padding: '0.4rem', border: '1px solid #ddd', borderRadius: '2px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={handleAddSpecialty} style={{ backgroundColor: '#EF4444', color: 'white', border: 'none', padding: '0.3rem', borderRadius: '2px', cursor: 'pointer' }}>
                      <X size={14} />
                    </button>
                    <button style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.3rem', borderRadius: '2px', cursor: 'pointer' }}>
                      <Save size={14} />
                    </button>
                  </div>
                </div>

                {/* List of Specialties */}
                {specialties
                  .filter(s => s.name.toLowerCase().includes(specialtiesSearch.toLowerCase()))
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map(specialty => (
                    <div key={specialty.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px', padding: '0.6rem 1rem', borderBottom: '1px solid #eee', alignItems: 'center', fontSize: '0.85rem' }}>
                      <div style={{ color: '#333' }}>{specialty.code}</div>
                      <div>
                        {editingSpecialtyId === specialty.id ? (
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                              type="text"
                              value={editingSpecialtyName}
                              onChange={(e) => setEditingSpecialtyName(e.target.value)}
                              style={{ flex: 1, padding: '0.3rem', border: '1px solid #F97316', borderRadius: '2px' }}
                            />
                            <button onClick={saveEditingSpecialty} style={{ border: 'none', background: 'none', color: '#22C55E', cursor: 'pointer' }}><Check size={16} /></button>
                            <button onClick={() => setEditingSpecialtyId(null)} style={{ border: 'none', background: 'none', color: '#EF4444', cursor: 'pointer' }}><X size={16} /></button>
                          </div>
                        ) : (
                          <div style={{ border: '1px solid #e5e7eb', padding: '0.4rem', borderRadius: '2px', color: '#555' }}>
                            {specialty.name}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
                        <button onClick={() => handleOpenSpecialtyModal(specialty)} style={{ border: 'none', background: 'none', color: '#F97316', cursor: 'pointer' }} title="Servicios">
                          <List size={16} />
                        </button>
                        <button onClick={() => startEditingSpecialty(specialty)} style={{ border: 'none', background: 'none', color: '#F97316', cursor: 'pointer' }} title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDeleteSpecialty(specialty.id)} style={{ border: 'none', background: 'none', color: '#F97316', cursor: 'pointer' }} title="Eliminar">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Pagination footer */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    style={{ border: 'none', background: 'none', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: '#F97316', padding: '0.2rem' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span style={{ margin: '0 0.5rem', fontSize: '0.85rem', color: '#555', fontWeight: 'bold' }}>
                    {currentPage}/{Math.ceil(specialties.length / itemsPerPage)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(Math.ceil(specialties.length / itemsPerPage), currentPage + 1))}
                    disabled={currentPage === Math.ceil(specialties.length / itemsPerPage)}
                    style={{ border: 'none', background: 'none', cursor: currentPage === Math.ceil(specialties.length / itemsPerPage) ? 'not-allowed' : 'pointer', color: '#F97316', padding: '0.2rem' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- CORREOS VIEW --- */}
          {activeTab === 'Correos' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              {emailViewMode === 'list' ? (
                <>
                  <div style={{ marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Correos Personales</h2>
                    <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <List size={12} /> Configuración de correos personales
                    </span>
                  </div>

                  <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={handleAddEmail}
                      style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <Plus size={16} /> AGREGAR
                    </button>
                  </div>

                  <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', borderRadius: '4px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', backgroundColor: '#0B3B3C', color: 'white', padding: '0.8rem 1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      <div>Descripción</div>
                      <div>Tipo</div>
                    </div>

                    {emails.length === 0 ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>
                        No hay correos configurados.
                      </div>
                    ) : (
                      emails.map(email => (
                        <div key={email.id} style={{ display: 'grid', gridTemplateColumns: '1fr 150px', padding: '1rem', borderBottom: '1px solid #eee', alignItems: 'center', fontSize: '0.85rem', color: '#374151' }}>
                          <div>{email.asunto}</div>
                          <div>{email.tipo}</div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.2rem', color: '#333', margin: 0 }}>Correos Personalizados</h2>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        VISTA PREVIA
                      </button>
                      <button
                        onClick={handleSaveEmail}
                        style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <Save size={16} /> GUARDAR
                      </button>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.5rem' }}>Tipo:</label>
                      <select
                        name="tipo"
                        value={emailFormData.tipo}
                        onChange={handleEmailFormChange}
                        className="custom-select"
                        style={{ width: '100%', maxWidth: '400px', borderColor: '#D1D5DB' }}
                      >
                        <option value="">Seleccionar...</option>
                        <option value="Bienvenida">Bienvenida</option>
                        <option value="Recordatorio">Recordatorio</option>
                        <option value="Factura">Factura</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.5rem' }}>Asunto</label>
                      <input
                        type="text"
                        name="asunto"
                        value={emailFormData.asunto}
                        onChange={handleEmailFormChange}
                        className="custom-input"
                        style={{ width: '100%', borderColor: '#D1D5DB' }}
                      />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', marginBottom: '0.5rem' }}>Cuerpo</label>
                      <textarea
                        name="cuerpo"
                        value={emailFormData.cuerpo}
                        onChange={handleEmailFormChange}
                        rows={10}
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '3px', resize: 'vertical' }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* --- SERVICIOS QUIRURGICOS VIEW --- */}
          {activeTab === 'Servicios Quirúrgicos' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Procedimientos Quirúrgicos</h2>
                <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <List size={12} /> Creación de Procedimientos Quirúrgicos
                </span>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '1rem' }}>
                  <label style={{ fontSize: '0.9rem', color: '#666' }}>Buscar:</label>
                  <div style={{ position: 'relative', flex: 1, maxWidth: '400px', display: 'flex' }}>
                    <input
                      type="text"
                      value={surgicalSearch}
                      onChange={(e) => setSurgicalSearch(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '2px', outline: 'none' }}
                    />
                    <button style={{ border: '1px solid #ddd', borderLeft: 'none', backgroundColor: 'white', padding: '0 0.5rem', cursor: 'pointer' }}>
                      <Search size={16} color="#F97316" />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{ color: '#EF4444', background: 'none', border: 'none', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <X size={14} /> ELIMINAR
                  </button>
                  <button
                    onClick={handleOpenSurgicalModal}
                    style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Plus size={16} /> AGREGAR
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', borderRadius: '4px', minHeight: '300px' }}>
                <div style={{ backgroundColor: '#0B3B3C', color: 'white', padding: '0.8rem 1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  Descripción
                </div>

                {surgicalServices.length === 0 ? (
                  <div style={{ padding: '4rem', textAlign: 'center', color: '#CCC' }}>
                    No hay procedimientos registrados
                  </div>
                ) : (
                  surgicalServices
                    .filter(s => s.descripcion.toLowerCase().includes(surgicalSearch.toLowerCase()))
                    .map(service => (
                      <div key={service.id} style={{ padding: '1rem', borderBottom: '1px solid #eee', fontSize: '0.85rem', color: '#374151' }}>
                        {service.descripcion}
                      </div>
                    ))
                )}
              </div>

              {/* Pagination Mockup */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', gap: '1rem', color: '#9CA3AF', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  <span style={{ cursor: 'pointer' }}>«</span>
                  <span>{surgicalPage}/1</span>
                  <span style={{ cursor: 'pointer' }}>»</span>
                </div>
              </div>
            </div>
          )}

          {/* --- INDICACIONES VIEW --- */}
          {activeTab === 'Indicaciones' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              {/* Top Navigation for Indicaciones */}
              <div style={{ backgroundColor: '#00897B', display: 'flex', padding: '0 1rem', marginBottom: '1rem' }}>
                {['Maintenance of Indications', 'Category', 'Template'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setIndicationsSubTab(tab === 'Maintenance of Indications' ? 'Maintenance' : tab)}
                    style={{
                      padding: '1rem 1.5rem',
                      backgroundColor: indicationsSubTab === (tab === 'Maintenance of Indications' ? 'Maintenance' : tab) ? '#00796B' : 'transparent',
                      color: 'white',
                      border: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Maintenance Sub-tab */}
              {indicationsSubTab === 'Maintenance' && (
                <>
                  <div style={{ marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Maintenance of Indications</h2>
                    <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <List size={12} /> Instructions
                    </span>
                  </div>

                  <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <label style={{ fontSize: '0.9rem', color: '#666' }}>Look for:</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '300px' }}>
                        <input
                          type="text"
                          value={indicationsSearch}
                          onChange={(e) => setIndicationsSearch(e.target.value)}
                          style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '2px' }}
                        />
                        <Search size={18} color="#F97316" />
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={handleOpenIndicationModal}
                        style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <Plus size={16} /> ADD
                      </button>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', borderRadius: '4px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', backgroundColor: '#0B3B3C', color: 'white', padding: '0.8rem 1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      <div>Description</div>
                      <div>Type</div>
                      <div>Result Type</div>
                    </div>
                    {indications.map(ind => (
                      <div key={ind.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '0.8rem 1rem', borderBottom: '1px solid #eee', fontSize: '0.85rem', color: '#374151' }}>
                        <div>{ind.description}</div>
                        <div>{ind.type}</div>
                        <div>{ind.resultType}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', gap: '1rem', color: '#9CA3AF', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      <span style={{ cursor: 'pointer' }}>«</span>
                      <span>1/1</span>
                      <span style={{ cursor: 'pointer' }}>»</span>
                    </div>
                  </div>
                </>
              )}

              {/* Category Sub-tab */}
              {indicationsSubTab === 'Category' && (
                <>
                  <div style={{ marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Maintenance of Indications</h2>
                    <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <List size={12} /> Instructions
                    </span>
                  </div>

                  <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <label style={{ fontSize: '0.9rem', color: '#666' }}>Look for:</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '300px' }}>
                        <input
                          type="text"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '2px' }}
                        />
                        <Search size={18} color="#F97316" />
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          const name = prompt("Enter Category Description:");
                          if (name) setCategories([...categories, { id: Date.now(), description: name }]);
                        }}
                        style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <Plus size={16} /> ADD
                      </button>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', borderRadius: '4px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', backgroundColor: '#0B3B3C', color: 'white', padding: '0.8rem 1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      <div>#</div>
                      <div>Description</div>
                    </div>
                    {categories.length > 0 ? categories.map((cat, idx) => (
                      <div key={cat.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr', padding: '0.8rem 1rem', borderBottom: '1px solid #eee', fontSize: '0.85rem', color: '#374151' }}>
                        <div>{idx + 1}</div>
                        <div>{cat.description}</div>
                      </div>
                    )) : (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF' }}>No categories found</div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', gap: '1rem', color: '#9CA3AF', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      <span style={{ cursor: 'pointer' }}>«</span>
                      <span>1/1</span>
                      <span style={{ cursor: 'pointer' }}>»</span>
                    </div>
                  </div>
                </>
              )}

              {/* Template Sub-tab */}
              {indicationsSubTab === 'Template' && (
                <>
                  <div style={{ marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Instructions Template</h2>
                    <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <List size={12} /> Instructions Template
                    </span>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '1rem', fontWeight: '500' }}>Options to select</h3>
                      <div style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '4px', minHeight: '100px', backgroundColor: 'white' }}>
                        {/* Drag source area */}
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.1rem', color: '#374151', margin: 0, fontWeight: '500' }}>Selected options</h3>
                        <button
                          onClick={handleOpenTemplateModal}
                          style={{ backgroundColor: '#22C55E', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <Plus size={16} /> NEW SECTION
                        </button>
                      </div>
                      <div style={{ backgroundColor: '#E5E7EB', padding: '2rem', textAlign: 'center', color: '#374151', fontSize: '0.9rem', borderRadius: '2px' }}>
                        Create a new section to start your options.
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>
          )}

          {/* --- BRANCHES (SUCURSALES) VIEW --- */}
          {activeTab === 'Sucursales' && (
            <div style={{ backgroundColor: '#F9FAFB', minHeight: '500px' }}>
              <div style={{ marginBottom: '1rem', borderBottom: '1px solid #F28C28', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>Branch Maintenance</h2>
                <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <List size={12} /> Branches
                </span>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <label style={{ fontSize: '0.9rem', color: '#666' }}>Look for:</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '300px' }}>
                    <input
                      type="text"
                      value={branchSearch}
                      onChange={(e) => setBranchSearch(e.target.value)}
                      style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '2px' }}
                    />
                    <Search size={18} color="#F97316" />
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleOpenBranchModal}
                    style={{ backgroundColor: '#F97316', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Plus size={16} /> ADD
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', borderRadius: '4px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', backgroundColor: '#0B3B3C', color: 'white', padding: '0.8rem 1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  <div>Name</div>
                  <div>Address</div>
                  <div style={{ textAlign: 'center' }}>Principal</div>
                  <div style={{ textAlign: 'center' }}>Status</div>
                </div>
                {branches.length > 0 ? branches.map(branch => (
                  <div key={branch.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', padding: '0.8rem 1rem', borderBottom: '1px solid #eee', fontSize: '0.85rem', color: '#374151', alignItems: 'center' }}>
                    <div>{branch.name}</div>
                    <div>{branch.address}</div>
                    <div style={{ textAlign: 'center' }}>
                      {branch.principal && <Check size={16} color="#22C55E" />}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{
                        backgroundColor: branch.status ? '#DCFCE7' : '#F3F4F6',
                        color: branch.status ? '#166534' : '#6B7280',
                        padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold'
                      }}>
                        {branch.status ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF' }}>No branches found</div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', gap: '1rem', color: '#9CA3AF', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  <span style={{ cursor: 'pointer' }}>«</span>
                  <span>1/1</span>
                  <span style={{ cursor: 'pointer' }}>»</span>
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
    </DashboardLayout>
  );
};

export default Configuration;
