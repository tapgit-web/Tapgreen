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
      <div className="mb-2 page-header">
        <h1 className="m-0">Site Settings</h1>
        <p className="text-secondary mt-05">Configurations for {location.name} Hub</p>
      </div>

      <div className="grid-1-2 gap-2">
        <div className="flex-col gap-15">
          <div className="glass-card card-padding-lg">
            <div className="flex-align-center gap-1 mb-2">
              <Bell color="var(--color-primary)" />
              <h3 className="m-0">Notification Rules</h3>
            </div>
            
            <div className="flex-col gap-15">
              <div className="flex-between">
                <div>
                  <p className="m-0 font-semibold">Critical Thresholds</p>
                  <p className="m-0 text-sm text-muted">Alert on &gt;95% Load</p>
                </div>
                <div style={{ width: 44, height: 24, background: 'var(--color-primary)', borderRadius: 12, position: 'relative' }}>
                    <div style={{ position: 'absolute', right: 2, top: 2, width: 20, height: 20, background: 'white', borderRadius: '50%' }}></div>
                </div>
              </div>
              
              <div className="flex-between">
                <div>
                  <p className="m-0 font-semibold">Daily Summary</p>
                  <p className="m-0 text-sm text-muted">Email at 8 PM local time</p>
                </div>
                <div style={{ width: 44, height: 24, background: 'rgba(255,255,255,0.1)', borderRadius: 12, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 2, top: 2, width: 20, height: 20, background: 'white', borderRadius: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card card-padding-lg">
            <div className="flex-align-center gap-1 mb-2">
              <Lock color="var(--color-secondary)" />
              <h3 className="m-0">Access Control</h3>
            </div>
            <p className="text-sm text-secondary mb-15">Managed by Global Admin. Contact HQ to change local access levels.</p>
            <button className="nav-item bg-transparent-05 flex-center">Request Access Sync</button>
          </div>
        </div>

        <div className="glass-card card-padding-lg">
            <div className="flex-align-center gap-1 mb-2">
                <Activity color="var(--color-accent)" />
                <h3 className="m-0">Threshold Management</h3>
            </div>

            <div className="flex-col gap-2">
                <div>
                    <label className="font-semibold mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Default Load Warning (%)</label>
                    <input type="range" style={{ width: '100%', accentColor: 'var(--color-primary)' }} defaultValue={80} />
                    <div className="flex-between mt-05 text-xs text-muted">
                        <span>Safe: 60%</span>
                        <span>Current: 80%</span>
                        <span>Danger: 95%</span>
                    </div>
                </div>

                <div>
                    <label className="font-semibold mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Thermal Limit (°C)</label>
                    <input type="range" style={{ width: '100%', accentColor: 'var(--color-accent)' }} defaultValue={35} />
                    <div className="flex-between mt-05 text-xs text-muted">
                        <span>Safe: 20°C</span>
                        <span>Current: 35°C</span>
                        <span>Danger: 50°C</span>
                    </div>
                </div>

                <div className="flex-align-center gap-1 card-padding-sm" style={{ background: 'rgba(74, 222, 128, 0.05)', borderRadius: '1rem', border: '1px solid rgba(74, 222, 128, 0.1)' }}>
                    <Settings size={20} color="var(--color-primary)" />
                    <p className="m-0 text-sm text-secondary">These settings apply to all nodes in **{location.name}** unless overridden per machine.</p>
                </div>

                <button className="btn-primary mt-1" style={{ width: '200px', alignSelf: 'flex-end' }}>
                    <Save size={18} /> Save Settings
                </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocalSettings;
