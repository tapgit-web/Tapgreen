import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Thermometer, Cpu, ChevronRight } from 'lucide-react';

const LocalUnits = ({ location, setSelectedMachine, calculateMachineCarbon }) => {
  if (!location) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Operational Units</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Detailed node monitoring for {location.name}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {location.units.map(unit => (
          <div key={unit.id} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 48, height: 48, background: 'rgba(74, 222, 128, 0.1)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity color="var(--color-primary)" />
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{unit.name}</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{unit.machines.length} Total Nodes</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  padding: '0.4rem 1rem', 
                  borderRadius: '2rem', 
                  fontSize: '0.85rem', 
                  fontWeight: 700,
                  background: unit.status === 'Active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: unit.status === 'Active' ? 'var(--color-primary)' : 'var(--color-danger)'
                }}>
                  {unit.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {unit.machines.map(m => (
                <div key={m.id} 
                  onClick={() => setSelectedMachine(m)}
                  className="glass-card" 
                  style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <h4 style={{ margin: 0 }}>{m.name}</h4>
                    <Zap size={18} color="var(--color-secondary)" />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Load Factor</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{m.load}%</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                      <div style={{ width: `${m.load}%`, height: '100%', background: m.load > 90 ? 'var(--color-danger)' : 'var(--color-primary)', borderRadius: 3 }}></div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Thermometer size={14} color="var(--color-accent)" />
                        <span style={{ fontSize: '0.85rem' }}>{m.temp}°C</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Cpu size={14} color="var(--color-secondary)" />
                        <span style={{ fontSize: '0.85rem' }}>{m.energy} kWh</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.5rem', background: 'rgba(74, 222, 128, 0.05)', padding: '0.6rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)' }}>Emissions</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)' }}>{calculateMachineCarbon(m)}kg CO2e</span>
                    </div>
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

export default LocalUnits;
