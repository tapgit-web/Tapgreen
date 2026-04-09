import React from 'react';
import { motion } from 'framer-motion';
import { TelemetryCard } from '../components/Common';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const Monitoring = ({ energyData }) => {
  return (
    <motion.div
      key="monitoring"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <h1 style={{ marginBottom: '2rem' }}>Sensor Telemetry</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        <TelemetryCard label="Avg Power Factor" value="0.94" unit="cos phi" />
        <TelemetryCard label="Total Carbon Intensity" value="0.28" unit="kgCO2e/kWh" />
      </div>

      <div className="glass-card" style={{ marginTop: '1.5rem', padding: '2rem' }}>
        <h3>Real-time Load Balancing</h3>
        <div style={{ width: '100%', height: '400px', marginTop: '1.5rem' }}>
          <ResponsiveContainer>
            <AreaChart data={energyData}>
              <defs>
                <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--text-primary)' }} />
              <Area type="monotone" dataKey="electricity" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorElectricity)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default Monitoring;
