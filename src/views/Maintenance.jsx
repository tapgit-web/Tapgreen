import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Activity, Zap, Droplet } from 'lucide-react';

const Maintenance = ({ alerts }) => {
  return (
    <motion.div
      key="maintenance"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Predictive Maintenance Alerts</h1>
        <p style={{ color: 'var(--text-secondary)' }}>AI-driven insights based on real-time consumption vs production mismatch and threshold limits.</p>
      </div>

      {alerts.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <Bell size={48} color="var(--color-primary)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>All Systems Optimal</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No predictive maintenance alerts detected at this time.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          {alerts.map(alert => (
            <div key={alert.id} className="glass-card" style={{
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              borderLeft: `6px solid ${alert.severity === 'critical' ? 'var(--color-danger)' : alert.severity === 'high' ? 'var(--color-accent)' : 'var(--color-secondary)'}`
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {alert.type === 'mismatch' ? <Activity size={24} color="var(--color-accent)" /> :
                  alert.type === 'load' ? <Zap size={24} color="var(--color-danger)" /> :
                    <Droplet size={24} color="var(--color-secondary)" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{alert.machine} - {alert.location}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alert.timestamp}</span>
                </div>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>{alert.message}</p>
              </div>
              <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                Investigate
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Maintenance;
