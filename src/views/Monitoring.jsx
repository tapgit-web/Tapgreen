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
      <h1 className="mb-2 page-title">Sensor Telemetry</h1>
      <div className="grid-2">
        <TelemetryCard label="Avg Power Factor" value="0.94" unit="cos phi" />
        <TelemetryCard label="Total Carbon Intensity" value="0.28" unit="kgCO2e/kWh" />
      </div>

      <div className="glass-card card-padding-lg mt-15">
        <h3>Real-time Load Balancing</h3>
        <div className="w-full mt-15" style={{ height: '400px' }}>
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
