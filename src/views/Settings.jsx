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
      <div className="mb-2 page-header">
        <h1 className="page-title">Machine Threshold Management</h1>
        <p className="page-subtitle">Granular control over maintenance limits for every machine in the global network.</p>
      </div>

      <div className="flex-col gap-2">
        {locationData.map(loc => (
          <div key={loc.id} className="glass-card card-padding-lg">
            <div className="flex-align-center mb-15" style={{ gap: '0.75rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              <MapPin size={24} color="var(--color-primary)" />
              <h2 className="m-0">{loc.name}</h2>
            </div>

            <div className="flex-col gap-15">
              {loc.units.map(unit => (
                <div key={unit.id}>
                  <h4 className="flex-align-center text-muted uppercase text-sm mb-1 gap-05">
                    <Activity size={14} /> {unit.name}
                  </h4>
                  <div className="grid-auto-fill-lg">
                    {unit.machines.map(m => (
                      <div key={m.id} className="glass-card card-padding bg-transparent-02">
                        <div className="flex-between mb-15">
                          <span className="font-bold text-base">{m.name}</span>
                          <span className="badge badge-neutral text-xs">{m.energyType}</span>
                        </div>

                        <div className="flex-col gap-1">
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
