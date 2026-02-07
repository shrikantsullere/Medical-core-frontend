import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Lock, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { label: 'AUTHORIZATIONS', path: '/authorizations' },
    { label: 'DOCTORS', path: '/doctors' },
    { label: 'EMPLOYEES', path: '/employees' },
    { label: 'ROLES', path: '/roles' },
    { label: 'ARS REPORT', path: '/ars-report' },
    { label: 'CONFIGURATION', path: '/configuration' },
    { label: 'BRANCHES', path: '/branches' },
    { label: 'UPLOAD VIA EXCEL', path: '/upload-excel' },
    { label: 'AUTHORIZATION REPORT', path: '/authorization-report' },
    { label: 'USAGE REPORT', path: '/usage-report' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <h1>+MedicalCore</h1>
      </div>

      <div className="sidebar-profile">
        <div className="profile-img"></div>
        <div className="profile-info">
          <h3>Lopez Medical Center</h3>
          <h3 style={{ fontSize: '0.7rem' }}>and Associates</h3>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
            onClick={() => window.innerWidth < 768 && toggleSidebar()}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={16} />
          LOGOUT
        </button>
      </div>
    </aside >
  );
};

const Header = ({ toggleSidebar }) => {
  return (
    <header className="top-header">
      <div className="hamburger" onClick={toggleSidebar}>
        <Menu size={24} />
      </div>
      {/* Other header elements like user profile or notifications could go here */}
      <div style={{ color: '#F28B27' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>
    </header>
  );
};

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <main className="workspace">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
