import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThresholdSlider } from './Common';

const ThresholdModal = ({ selectedMachine, setSelectedMachine, locationData, setLocationData }) => {
  return (
    <AnimatePresence>
      {selectedMachine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedMachine(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            style={{
              width: '100%',
              maxWidth: '500px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '2rem',
              padding: '2rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ margin: 0 }}>{selectedMachine.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>Maintenance Threshold Settings</p>
              </div>
              <button
                onClick={() => setSelectedMachine(null)}
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-primary)', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <ThresholdSlider
                label="Load Threshold"
                value={selectedMachine.maintenanceLimits.load}
                unit="%"
                onChange={(val) => {
                  const newData = [...locationData];
                  selectedMachine.maintenanceLimits.load = val;
                  setLocationData(newData);
                }}
                color="var(--color-primary)"
              />
              <ThresholdSlider
                label="Temperature Threshold"
                value={selectedMachine.maintenanceLimits.temp}
                unit="°C"
                onChange={(val) => {
                  const newData = [...locationData];
                  selectedMachine.maintenanceLimits.temp = val;
                  setLocationData(newData);
                }}
                color="var(--color-secondary)"
              />
              <ThresholdSlider
                label="Mismatch Threshold"
                value={Math.round(selectedMachine.maintenanceLimits.mismatch * 100)}
                unit="%"
                onChange={(val) => {
                  const newData = [...locationData];
                  selectedMachine.maintenanceLimits.mismatch = val / 100;
                  setLocationData(newData);
                }}
                color="var(--color-accent)"
              />
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setSelectedMachine(null)}>
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThresholdModal;
