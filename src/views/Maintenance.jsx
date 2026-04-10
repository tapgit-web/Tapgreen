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
      <div className="mb-2 page-header">
        <h1 className="page-title">Predictive Maintenance Alerts</h1>
        <p className="page-subtitle">AI-driven insights based on real-time consumption vs production mismatch and threshold limits.</p>
      </div>

      {alerts.length === 0 ? (
        <div className="glass-card text-center" style={{ padding: '3rem' }}>
          <Bell size={48} color="var(--color-primary)" className="mb-1" style={{ opacity: 0.5 }} />
          <h3>All Systems Optimal</h3>
          <p className="text-secondary">No predictive maintenance alerts detected at this time.</p>
        </div>
      ) : (
        <div className="flex-col gap-1">
          {alerts.map(alert => (
            <div key={alert.id} className="glass-card card-padding flex-align-center gap-15" style={{
              borderLeft: `6px solid ${alert.severity === 'critical' ? 'var(--color-danger)' : alert.severity === 'high' ? 'var(--color-accent)' : 'var(--color-secondary)'}`
            }}>
              <div className="br-md bg-transparent-05 flex-center" style={{ width: 48, height: 48 }}>
                {alert.type === 'mismatch' ? <Activity size={24} color="var(--color-accent)" /> :
                  alert.type === 'load' ? <Zap size={24} color="var(--color-danger)" /> :
                    <Droplet size={24} color="var(--color-secondary)" />}
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                  <h4 className="text-lg m-0">{alert.machine} - {alert.location}</h4>
                  <span className="text-xs text-muted">{alert.timestamp}</span>
                </div>
                <p className="text-secondary m-0 mt-05">{alert.message}</p>
              </div>
              <button className="btn-primary text-sm" style={{ padding: '0.5rem 1rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
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
