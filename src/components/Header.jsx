import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, Bell, User, LogOut } from 'lucide-react';

const Header = ({ 
  searchQuery, setSearchQuery, theme, toggleTheme, alerts, onLogout, userRole 
}) => {
  const navigate = useNavigate();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
      <div style={{ position: 'relative', width: '400px' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search monitor data, locations..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          onClick={toggleTheme}
          className="glass-card"
          style={{ padding: '0.6rem', background: 'var(--bg-secondary)', cursor: 'pointer', border: 'none' }}
        >
          {theme === 'dark' ? <Sun size={20} color="var(--text-primary)" /> : <Moon size={20} color="var(--text-primary)" />}
        </button>
        {userRole === 'admin' && (
            <button
                onClick={() => navigate('/maintenance')}
                className="glass-card"
                style={{ padding: '0.6rem', background: 'var(--bg-secondary)', position: 'relative', border: 'none', cursor: 'pointer' }}
            >
                <Bell size={20} color="var(--text-primary)" />
                {alerts.length > 0 && (
                <div style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: 'var(--color-danger)', borderRadius: '50%' }}></div>
                )}
            </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-secondary)', padding: '0.4rem 1rem 0.4rem 0.4rem', borderRadius: '2rem', border: '1px solid var(--glass-border)' }}>
          <div style={{ width: 32, height: 32, background: 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={18} color="var(--text-primary)" />
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{userRole === 'admin' ? 'Admin Portal' : 'Site Manager'}</span>
          <button 
            onClick={onLogout}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.2rem'
            }}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
