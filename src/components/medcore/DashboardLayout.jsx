import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Lock, ArrowRight, LogOut, Sun, CloudSun, TrendingUp, Moon, Settings, User, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { label: 'Autorizaciones', path: '/authorizations' },
    { label: 'Doctores', path: '/doctors' },
    { label: 'Empleados', path: '/employees' },
    { label: 'Roles', path: '/roles' },
    { label: 'Reporte ARS', path: '/ars-report' },
    { label: 'Configuración', path: '/configuration' },
    { label: 'Sucursales', path: '/branches' },
    { label: 'Cargar Excel', path: '/upload-excel' },
    { label: 'Reporte de Autorizaciones', path: '/authorization-report' },
    { label: 'Reporte de Uso', path: '/usage-report' },
    { label: 'Tarifas', path: '/fee' },
    { label: 'Preguntas', path: '/questions' },
    { label: 'Manual de Usuario', path: '/user-manual' },
    { label: 'Contáctenos', path: '/contact-us' },
  ];

  return (
    <aside className={`sidebar-premium ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo-premium">
        <div className="ef-logo-container">
          <div className="ef-logo-icon-premium">
            <div className="logo-pulse-small"></div>
            <Lock size={18} color="white" />
          </div>
          <div className="brand-info" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="ef-logo-text-premium">
              eFactura<span>x</span>
            </div>
            <div className="ef-logo-tagline-premium">Medical Core Suite</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-menu-premium">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `menu-item-premium ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (window.innerWidth <= 1024) toggleSidebar();
            }}
          >
            <div className="menu-active-indicator"></div>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside >
  );
};

const Header = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="top-header-premium">
      <div className="header-left">
        <button className="hamburger-premium" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      <div className="header-right">
        {/* Language Switcher Removed */}

        <div className="profile-section-wrapper">
          <div className="profile-trigger" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="profile-text-group">
              <span className="profile-name">eFacturaX Admin</span>
              <span className="profile-role">Centro de Operaciones</span>
            </div>
            <div className="premium-avatar">
              <div className="avatar-ring"></div>
              <img src="https://ui-avatars.com/api/?name=Admin&background=0D9488&color=fff" alt="Avatar" />
            </div>
          </div>

          {isProfileOpen && (
            <>
              <div className="dropdown-overlay" onClick={() => setIsProfileOpen(false)}></div>
              <div className="premium-dropdown profile-dropdown">
                <div className="dropdown-header">
                  <p className="user-email">admin@medcore.com</p>
                </div>
                <button className="dropdown-item">
                  <User size={16} /> Ver Perfil
                </button>
                <button className="dropdown-item">
                  <Settings size={16} /> Configuración
                </button>
                <div className="dropdown-separator"></div>
                <button onClick={handleLogout} className="dropdown-item logout-item">
                  <LogOut size={16} /> Cerrar Sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  const [time, setTime] = useState(new Date());
  const [exchangeRate, setExchangeRate] = useState(57.36);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setExchangeRate(prev => {
        const move = (Math.random() - 0.5) * 0.02;
        return parseFloat((prev + move).toFixed(2));
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toUpperCase();
  };

  return (
    <footer className="status-bar-premium">
      <div className="footer-group">
        <div className="status-indicator">
          <div className="status-dot pulse"></div>
          <span>Conectado</span>
        </div>
        <div className="footer-divider"></div>
        <div className="rate-info">
          <img src="https://flagcdn.com/w20/do.png" alt="DR Flag" className="footer-flag" />
          <span className="rate-label">Tasa de Cambio</span>
          <span className="rate-value">{exchangeRate.toFixed(2)}</span>
        </div>
      </div>

      <div className="footer-group">
        <div className="time-info">
          <span className="current-time">{formatTime(time)}</span>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-icons">
          <TrendingUp size={14} className="footer-icon" />
          <CloudSun size={14} className="footer-icon" />
          <Settings size={14} className="footer-icon" />
        </div>
      </div>
    </footer>
  );
};

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container-premium">


      {isSidebarOpen && window.innerWidth <= 1024 && (
        <div className="sidebar-overlay-premium" onClick={closeSidebar}></div>
      )}

      <div className="layout-content-premium">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="main-stage-premium">
          <Header toggleSidebar={toggleSidebar} />
          <main className="content-scroll-premium">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
