import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Lock, Activity, Save } from 'lucide-react';

const LocalSettings = ({ location }) => {
  if (!location) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Site Settings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Configurations for {location.name} Hub</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <Bell color="var(--color-primary)" />
              <h3 style={{ margin: 0 }}>Notification Rules</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Critical Thresholds</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Alert on >95% Load</p>
                </div>
                <div style={{ width: 44, height: 24, background: 'var(--color-primary)', borderRadius: 12, position: 'relative' }}>
                    <div style={{ position: 'absolute', right: 2, top: 2, width: 20, height: 20, background: 'white', borderRadius: '50%' }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Daily Summary</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email at 8 PM local time</p>
                </div>
                <div style={{ width: 44, height: 24, background: 'rgba(255,255,255,0.1)', borderRadius: 12, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 2, top: 2, width: 20, height: 20, background: 'white', borderRadius: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <Lock color="var(--color-secondary)" />
              <h3 style={{ margin: 0 }}>Access Control</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Managed by Global Admin. Contact HQ to change local access levels.</p>
            <button className="nav-item" style={{ background: 'rgba(255,255,255,0.05)', justifyContent: 'center' }}>Request Access Sync</button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <Activity color="var(--color-accent)" />
                <h3 style={{ margin: 0 }}>Threshold Management</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>Default Load Warning (%)</label>
                    <input type="range" style={{ width: '100%', accentColor: 'var(--color-primary)' }} defaultValue={80} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Safe: 60%</span>
                        <span>Current: 80%</span>
                        <span>Danger: 95%</span>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>Thermal Limit (°C)</label>
                    <input type="range" style={{ width: '100%', accentColor: 'var(--color-accent)' }} defaultValue={35} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Safe: 20°C</span>
                        <span>Current: 35°C</span>
                        <span>Danger: 50°C</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'rgba(74, 222, 128, 0.05)', borderRadius: '1rem', border: '1px solid rgba(74, 222, 128, 0.1)' }}>
                    <Settings size={20} color="var(--color-primary)" />
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>These settings apply to all nodes in **{location.name}** unless overridden per machine.</p>
                </div>

                <button className="btn-primary" style={{ marginTop: '1rem', width: '200px', alignSelf: 'flex-end' }}>
                    <Save size={18} /> Save Settings
                </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocalSettings;
