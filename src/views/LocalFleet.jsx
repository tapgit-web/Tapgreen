import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Zap, Navigation, Clock, Shield } from 'lucide-react';

const LocalFleet = ({ location, calculateVehicleCarbon }) => {
  if (!location) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="mb-2 page-header">
        <h1 className="m-0">Transportation Fleet</h1>
        <p className="page-subtitle">Logistics and EV management for {location.name}</p>
      </div>

      <div className="grid-3 gap-15">
        {location.vehicles.map(v => (
          <div key={v.id} className="glass-card card-padding-lg">
            <div className="flex-between mb-2">
              <div className="flex-center" style={{ 
                width: 54, 
                height: 54, 
                background: v.type === 'Electric' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                borderRadius: '1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {v.type === 'Electric' ? <Zap color="var(--color-secondary)" size={28} /> : <Truck color="var(--color-accent)" size={28} />}
              </div>
              <div className="text-right">
                <span style={{ 
                  padding: '0.3rem 0.75rem', 
                  borderRadius: '2rem', 
                  fontSize: '0.8rem', 
                  fontWeight: 700,
                  background: 'rgba(255,255,255,0.05)'
                }}>
                  {v.type}
                </span>
                <p className="m-0 mt-05 text-sm font-semibold text-primary">{v.status}</p>
              </div>
            </div>

            <h3 className="mb-15">{v.name}</h3>

            <div className="flex-col gap-15">
              <div>
                <div className="flex-between mb-05" style={{ fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{v.type === 'Electric' ? 'Battery Integrity' : 'Fuel Capacity'}</span>
                  <span style={{ fontWeight: 800 }}>{v.level}%</span>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>
                  <div style={{ 
                    width: `${v.level}%`, 
                    height: '100%', 
                    background: v.level > 20 ? 'var(--color-primary)' : 'var(--color-danger)', 
                    borderRadius: 4,
                    boxShadow: v.level > 20 ? '0 0 10px rgba(74, 222, 128, 0.3)' : 'none'
                  }}></div>
                </div>
              </div>

              <div className="grid-2 gap-1">
                <div className="flex-align-center gap-05 bg-transparent-02 br-md" style={{ padding: '1rem' }}>
                  <Navigation size={18} color="var(--text-muted)" />
                  <div>
                    <p className="m-0 text-xs text-muted">Trips today</p>
                    <p className="m-0 font-bold">{v.trips}</p>
                  </div>
                </div>
                <div className="flex-align-center gap-05 bg-transparent-02 br-md" style={{ padding: '1rem' }}>
                  <Clock size={18} color="var(--text-muted)" />
                  <div>
                    <p className="m-0 text-xs text-muted">Last Sync</p>
                    <p className="m-0 font-bold">2m ago</p>
                  </div>
                </div>
              </div>

              <div className="flex-between br-md" style={{ background: 'var(--bg-tertiary)', padding: '1.25rem' }}>
                <div className="flex-align-center gap-05">
                  <Shield size={18} color="var(--color-primary)" />
                  <span className="text-sm font-semibold">Estimated CO2e</span>
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)' }}>{calculateVehicleCarbon(v)}kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LocalFleet;
