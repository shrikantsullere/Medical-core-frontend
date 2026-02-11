import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ROLES } from '../data/mockData';
import {
  Menu, X, LogOut, ChevronRight, LayoutDashboard,
  Users, Landmark, ClipboardList, Settings,
  FileBox, UserCircle, Activity, Calendar,
  Wallet, FileText, Bell, Search, History,
  ShieldCheck, Package, CreditCard, UserCog, BarChart3,
  Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
        setMobileMenuOpen(false);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMenu = (role) => {
    switch (role) {
      case ROLES.SUPER_ADMIN:
        return [
          { label: 'Panel de Control', path: '/dashboard', icon: LayoutDashboard },
          { label: 'Clínicas', path: '/clinics', icon: Landmark },
          { label: 'Planes', path: '/plans', icon: Package },
          { label: 'Usuarios', path: '/users', icon: UserCog },
          { label: 'Pagos', path: '/payments', icon: Wallet },
          { label: 'Configuración', path: '/settings', icon: Settings },
          { label: 'Informes', path: '/reports', icon: FileText },
          { label: 'Registros', path: '/logs', icon: History },
        ];
      case ROLES.CLINIC_ADMIN:
        return [
          { label: 'Panel de Control', path: '/dashboard', icon: LayoutDashboard },
          { label: 'Pacientes', path: '/patients', icon: Users },
          { label: 'Médicos', path: '/doctors', icon: UserCircle },
          { label: 'Citas', path: '/appointments', icon: Calendar },
          { label: 'Servicios y Cargos', path: '/services', icon: Activity },
          { label: 'Facturación y Facturas', path: '/billing', icon: Wallet },
          { label: 'Pagos', path: '/payments', icon: CreditCard },
          { label: 'Personal y Roles', path: '/staff', icon: UserCog },
          { label: 'Informes', path: '/reports', icon: FileText },
          { label: 'Configuración', path: '/settings', icon: Settings },
        ];
      case ROLES.DOCTOR:
        return [
          { label: 'Panel de Control', path: '/dashboard', icon: LayoutDashboard },
          { label: 'Citas', path: '/appointments', icon: Calendar },
          { label: 'Pacientes', path: '/patients', icon: Users },
          { label: 'Recetas', path: '/prescriptions', icon: ClipboardList },
          { label: 'Ganancias', path: '/earnings', icon: Wallet },
          { label: 'Perfil y Configuración', path: '/settings', icon: UserCircle },
        ];
      case ROLES.RECEPTIONIST:
        return [
          { label: 'Panel de Control', path: '/dashboard', icon: LayoutDashboard },
          { label: 'Pacientes', path: '/patients', icon: Users },
          { label: 'Citas', path: '/appointments', icon: Calendar },
          { label: 'Facturación', path: '/billing', icon: Wallet },
          { label: 'Pagos', path: '/payments', icon: CreditCard },
          { label: 'Perfil', path: '/profile', icon: UserCircle },
        ];
      case ROLES.ACCOUNTANT:
        return [
          { label: 'Panel de Control', path: '/dashboard', icon: LayoutDashboard },
          { label: 'Facturas', path: '/invoices', icon: FileText },
          { label: 'Pagos', path: '/payments', icon: CreditCard },
          { label: 'Gastos', path: '/expenses', icon: Wallet },
          { label: 'Pagos a Médicos', path: '/payouts', icon: Landmark },
          { label: 'Informes', path: '/reports', icon: BarChart3 },
          { label: 'Perfil', path: '/profile', icon: UserCircle },
        ];
      case ROLES.PATIENT:
        return [
          { label: 'Panel de Control', path: '/dashboard', icon: LayoutDashboard },
          { label: 'Mis Citas', path: '/appointments', icon: Calendar },
          { label: 'Mis Recetas', path: '/prescriptions', icon: ClipboardList },
          { label: 'Mis Facturas', path: '/billing', icon: Wallet },
          { label: 'Perfil y Salud', path: '/profile', icon: UserCircle },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenu(user.role);

  const SidebarContent = () => (
    <>
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: (sidebarOpen || mobileMenuOpen) ? 'space-between' : 'center' }}>
        {(sidebarOpen || mobileMenuOpen) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Activity size={22} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--heading)' }}>MedCare</span>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hide-on-laptop"
          style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: 'var(--bg-header)', color: 'var(--primary)', border: 'none', cursor: 'pointer' }}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="show-on-laptop"
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--bg-header)',
            color: 'var(--primary)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>
      </div>

      <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => { if (window.innerWidth < 1024) setMobileMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.9rem',
                borderRadius: '12px',
                color: isActive ? '#ffffff' : 'var(--text-main)',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                justifyContent: (sidebarOpen || mobileMenuOpen) ? 'flex-start' : 'center',
                boxShadow: isActive ? '0 8px 16px -4px rgba(139, 92, 246, 0.4)' : 'none',
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-sidebar-active)'; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} style={{ color: isActive ? '#ffffff' : 'var(--primary)' }} />
              {(sidebarOpen || mobileMenuOpen) && (
                <span style={{ fontWeight: isActive ? 700 : 500, fontSize: '0.95rem' }}>{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.9rem',
            borderRadius: '12px',
            color: 'var(--danger)',
            backgroundColor: '#fee2e2',
            justifyContent: (sidebarOpen || mobileMenuOpen) ? 'flex-start' : 'center',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <LogOut size={20} />
          {(sidebarOpen || mobileMenuOpen) && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-main)' }}>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? '280px' : '80px' }}
        className="hide-on-laptop"
        style={{
          backgroundColor: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border)',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 50,
          boxShadow: '4px 0 10px rgba(76, 29, 149, 0.05)',
          display: 'flex'
        }}
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar / Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, backdropFilter: 'blur(4px)' }}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: '280px', background: 'var(--bg-sidebar)', zIndex: 101, display: 'flex', flexDirection: 'column' }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <header style={{
          height: '72px',
          backgroundColor: 'var(--bg-header)',
          borderBottom: '1px solid var(--border)',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="show-on-laptop"
              style={{ padding: '0.5rem', borderRadius: '10px', background: 'var(--bg-sidebar)', color: 'var(--primary)', border: '1px solid var(--border)' }}
            >
              <Menu size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-sidebar)',
                color: 'var(--primary)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div style={{ position: 'relative', padding: '0.6rem', borderRadius: '12px', backgroundColor: 'var(--bg-sidebar)', color: 'var(--primary)', border: '1px solid var(--border)' }} className="hide-mobile">
              <Bell size={20} />
              <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--bg-sidebar)' }}></div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--bg-sidebar)', padding: '0.4rem 0.6rem', borderRadius: '14px', border: '1px solid var(--border)' }}>
              <div className="desktop-only" style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--heading)' }}>{user.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{user.role}</p>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, boxShadow: '0 4px 10px rgba(139, 92, 246, 0.4)' }}>
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: window.innerWidth < 768 ? '1rem' : '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
