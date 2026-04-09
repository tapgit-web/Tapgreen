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
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Transportation Fleet</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Logistics and EV management for {location.name}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {location.vehicles.map(v => (
          <div key={v.id} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div style={{ 
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
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  padding: '0.3rem 0.75rem', 
                  borderRadius: '2rem', 
                  fontSize: '0.8rem', 
                  fontWeight: 700,
                  background: 'rgba(255,255,255,0.05)'
                }}>
                  {v.type}
                </span>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)' }}>{v.status}</p>
              </div>
            </div>

            <h3 style={{ marginBottom: '1.25rem' }}>{v.name}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Navigation size={18} color="var(--text-muted)" />
                  <div>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Trips today</p>
                    <p style={{ margin: 0, fontWeight: 700 }}>{v.trips}</p>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={18} color="var(--text-muted)" />
                  <div>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Last Sync</p>
                    <p style={{ margin: 0, fontWeight: 700 }}>2m ago</p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Shield size={18} color="var(--color-primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Estimated CO2e</span>
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
