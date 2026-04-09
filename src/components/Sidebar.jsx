import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Menu, ChevronRight, MapPin, 
  LayoutDashboard, Activity, Bell, Navigation, Target, Settings, Truck 
} from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = ({ 
  isSidebarOpen, setIsSidebarOpen, locationData, userRole 
}) => {
  const adminItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { id: 'monitoring', icon: Activity, label: 'Telemetry', path: '/monitoring' },
    { id: 'maintenance', icon: Bell, label: 'Predictive Alert', path: '/maintenance' },
    { id: 'network', icon: Navigation, label: 'Global Network', path: '/network' },
    { id: 'strategy', icon: Target, label: 'NetZero Strategy', path: '/strategy' },
    { id: 'settings', icon: Settings, label: 'Alert Limits', path: '/settings' },
  ];

  return (
    <aside style={{
      width: isSidebarOpen ? '280px' : '88px',
      borderRight: '1px solid var(--glass-border)',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      background: 'var(--bg-secondary)',
      transition: 'var(--transition)',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', marginBottom: '1rem', width: '100%' }}>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <div style={{ width: 32, height: 32, borderRadius: '0.5rem', overflow: 'hidden' }}>
              <img src={logo} alt="TAP Green" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2 className="gradient-text" style={{ fontSize: '1.5rem', margin: 0 }}>TAP Green</h2>
          </motion.div>
        )}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: 'var(--text-primary)',
            padding: '0.6rem',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {userRole === 'admin' ? (
          <>
            {isSidebarOpen && <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginLeft: '1rem', marginTop: '1rem' }}>Global Admin</p>}
            {adminItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  title={!isSidebarOpen ? item.label : ''}
                  style={{
                    textDecoration: 'none',
                    justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                    padding: isSidebarOpen ? '1rem' : '1rem 0'
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={20} />
                      {isSidebarOpen && <span style={{ fontWeight: isActive ? 600 : 400, whiteSpace: 'nowrap' }}>{item.label}</span>}
                      {isActive && isSidebarOpen && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
                    </>
                  )}
                </NavLink>
              );
            })}
          </>
        ) : (
            <>
                {isSidebarOpen && <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginLeft: '1rem', marginTop: '1rem' }}>Local Portal</p>}
                {locationData.map((loc) => (
                    <React.Fragment key={loc.id}>
                        <NavLink
                            to={`/portal/${loc.id}`}
                            end
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            style={{ textDecoration: 'none', justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '1rem' : '1rem 0' }}
                        >
                            {({ isActive }) => (
                                <>
                                    <LayoutDashboard size={20} />
                                    {isSidebarOpen && <span style={{ fontWeight: isActive ? 600 : 400, whiteSpace: 'nowrap' }}>Site Overview</span>}
                                </>
                            )}
                        </NavLink>
                        
                        <NavLink
                            to={`/portal/${loc.id}/units`}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            style={{ textDecoration: 'none', justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '1rem' : '1rem 0' }}
                        >
                            <Activity size={20} />
                            {isSidebarOpen && <span style={{ fontSize: '0.9rem' }}>Operational Units</span>}
                        </NavLink>
                        
                        <NavLink
                            to={`/portal/${loc.id}/fleet`}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            style={{ textDecoration: 'none', justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '1rem' : '1rem 0' }}
                        >
                            <Truck size={20} />
                            {isSidebarOpen && <span style={{ fontSize: '0.9rem' }}>Transportation Fleet</span>}
                        </NavLink>

                        <NavLink
                            to={`/portal/${loc.id}/settings`}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            style={{ textDecoration: 'none', justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '1rem' : '1rem 0' }}
                        >
                            <Settings size={20} />
                            {isSidebarOpen && <span style={{ fontSize: '0.9rem' }}>Site Settings</span>}
                        </NavLink>
                    </React.Fragment>
                ))}
            </>
        )}

        {userRole === 'admin' && (
            <>
                {isSidebarOpen && <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginLeft: '1rem', marginTop: '2rem', marginBottom: '0.5rem' }}>Operational Hubs</p>}
                {locationData.map((loc) => (
                <NavLink
                    key={loc.id}
                    to={`/locations/${loc.id}`}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    title={!isSidebarOpen ? loc.name : ''}
                    style={{
                    textDecoration: 'none',
                    justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                    padding: '0.8rem 1rem'
                    }}
                >
                    {({ isActive }) => (
                    <>
                        <MapPin size={18} />
                        {isSidebarOpen && <span style={{ fontSize: '0.9rem', fontWeight: isActive ? 600 : 400, whiteSpace: 'nowrap' }}>{loc.name}</span>}
                    </>
                    )}
                </NavLink>
                ))}
            </>
        )}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <div className="glass-card" style={{ padding: isSidebarOpen ? '1rem' : '0.75rem', background: 'var(--bg-tertiary)', textAlign: isSidebarOpen ? 'left' : 'center' }}>
          {isSidebarOpen ? (
            <>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Site Health Score</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ flex: 1, height: '6px', background: 'var(--glass-border)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', background: 'var(--color-primary)' }}></div>
                </div>
                <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>92%</span>
              </div>
            </>
          ) : (
            <span style={{ fontWeight: '800', color: 'var(--color-primary)', fontSize: '0.75rem' }}>92%</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
