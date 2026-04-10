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
      <div className="mb-2 page-header">
        <h1 className="m-0 page-title">Operational Units</h1>
        <p className="page-subtitle">Detailed node monitoring for {location.name}</p>
      </div>

      <div className="flex-col gap-2">
        {location.units.map(unit => (
          <div key={unit.id} className="glass-card card-padding-lg">
            <div className="flex-between mb-2 pb-1" style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <div className="flex-align-center gap-1">
                <div className="br-md flex-center" style={{ width: 48, height: 48, background: 'rgba(74, 222, 128, 0.1)' }}>
                  <Activity color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="m-0">{unit.name}</h3>
                  <p className="m-0 text-sm text-muted">{unit.machines.length} Total Nodes</p>
                </div>
              </div>
              <div className="text-right">
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

            <div className="grid-3 gap-15">
              {unit.machines.map(m => (
                <div key={m.id} 
                  onClick={() => setSelectedMachine(m)}
                  className="glass-card card-padding bg-transparent-02" 
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex-between mb-15">
                    <h4 className="m-0">{m.name}</h4>
                    <Zap size={18} color="var(--color-secondary)" />
                  </div>
                  
                  <div className="flex-col gap-1">
                    <div className="flex-between">
                      <span className="text-sm text-muted">Load Factor</span>
                      <span className="text-sm font-bold">{m.load}%</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                      <div style={{ width: `${m.load}%`, height: '100%', background: m.load > 90 ? 'var(--color-danger)' : 'var(--color-primary)', borderRadius: 3 }}></div>
                    </div>
                    
                    <div className="grid-2 gap-1 mt-05">
                      <div className="flex-align-center gap-05">
                        <Thermometer size={14} color="var(--color-accent)" />
                        <span className="text-sm">{m.temp}°C</span>
                      </div>
                      <div className="flex-align-center gap-05">
                        <Cpu size={14} color="var(--color-secondary)" />
                        <span className="text-sm">{m.energy} kWh</span>
                      </div>
                    </div>

                    <div className="flex-between mt-05 card-padding-sm" style={{ background: 'rgba(74, 222, 128, 0.05)', borderRadius: '0.5rem' }}>
                      <span className="text-xs font-semibold text-primary">Emissions</span>
                      <span className="text-sm font-extrabold text-primary">{calculateMachineCarbon(m)}kg CO2e</span>
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
