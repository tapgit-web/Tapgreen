import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Activity } from 'lucide-react';
import { ThresholdSlider } from '../components/Common';

const SettingsView = ({ locationData, setLocationData }) => {
  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Machine Threshold Management</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Granular control over maintenance limits for every machine in the global network.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {locationData.map(loc => (
          <div key={loc.id} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              <MapPin size={24} color="var(--color-primary)" />
              <h2 style={{ margin: 0 }}>{loc.name}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              {loc.units.map(unit => (
                <div key={unit.id}>
                  <h4 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Activity size={14} /> {unit.name}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                    {unit.machines.map(m => (
                      <div key={m.id} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '1rem' }}>{m.name}</span>
                          <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{m.energyType}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <ThresholdSlider
                            label="Load Threshold"
                            value={m.maintenanceLimits.load}
                            unit="%"
                            onChange={(val) => {
                              const newData = [...locationData];
                              m.maintenanceLimits.load = val;
                              setLocationData(newData);
                            }}
                            color="var(--color-primary)"
                          />
                          <ThresholdSlider
                            label="Temp Threshold"
                            value={m.maintenanceLimits.temp}
                            unit="°C"
                            onChange={(val) => {
                              const newData = [...locationData];
                              m.maintenanceLimits.temp = val;
                              setLocationData(newData);
                            }}
                            color="var(--color-secondary)"
                          />
                          <ThresholdSlider
                            label="Mismatch Threshold"
                            value={Math.round(m.maintenanceLimits.mismatch * 100)}
                            unit="%"
                            onChange={(val) => {
                              const newData = [...locationData];
                              m.maintenanceLimits.mismatch = val / 100;
                              setLocationData(newData);
                            }}
                            color="var(--color-accent)"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SettingsView;
