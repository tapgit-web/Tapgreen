import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, Activity, Zap, ChevronRight } from 'lucide-react';

const Network = ({ locationData }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key="network"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
    >
      <div className="flex-between page-header mb-2">
        <div>
          <h1 className="m-0">Global Operational Network</h1>
          <p className="text-secondary mt-05">Site reliability and efficiency tracking across all regions</p>
        </div>
        <div className="flex gap-1">
          <div className="glass-card flex-align-center" style={{ padding: '0.75rem 1.25rem', gap: '0.75rem' }}>
            <div className="br-full" style={{ width: 12, height: 12, background: 'var(--color-primary)' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>12 Sites Online</span>
          </div>
          <button className="btn-primary" style={{ height: '44px' }}><MapPin size={18} /> Plot New Site</button>
        </div>
      </div>

      <div className="grid-2">
        {locationData.map(loc => (
          <div
            key={loc.id}
            className="glass-card"
            onClick={() => navigate(`/locations/${loc.id}`)}
            style={{
              padding: '1.5rem',
              border: `1px solid ${loc.status === 'Critical' ? 'var(--color-danger)' : 'var(--glass-border)'}`,
              cursor: 'pointer',
              transition: 'transform 0.2s, border-color 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = loc.status === 'Critical' ? 'var(--color-danger)' : 'var(--glass-border)'; }}
          >
            <div className="flex-between mb-15">
              <div className="flex-align-center gap-1">
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '1rem',
                  background: `${loc.status === 'Optimal' ? 'var(--color-primary)' : loc.status === 'Warning' ? 'var(--color-secondary)' : 'var(--color-danger)'}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={28} color={loc.status === 'Optimal' ? 'var(--color-primary)' : loc.status === 'Warning' ? 'var(--color-secondary)' : 'var(--color-danger)'} />
                </div>
                <div>
                  <h3 className="m-0">{loc.name}</h3>
                  <div className="flex gap-05 mt-05">
                    <span className="badge badge-neutral text-xs">Region: South Asia</span>
                    <span className="badge badge-neutral text-xs">Hub: Logistics</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '2rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: loc.status === 'Optimal' ? 'rgba(74, 222, 128, 0.1)' : loc.status === 'Warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: loc.status === 'Optimal' ? 'var(--color-primary)' : loc.status === 'Warning' ? 'var(--color-accent)' : 'var(--color-danger)'
                }}>
                  {loc.status}
                </div>
                <p className="text-xs text-muted mt-05 m-0">Uptime: 99.98%</p>
              </div>
            </div>

            <div className="grid-4 mb-15">
              <div className="bg-transparent-02 br-lg" style={{ padding: '1rem', border: '1px solid var(--glass-border)' }}>
                <p className="text-xs text-muted mb-05 m-0">Efficiency</p>
                <p className="text-lg font-extrabold text-primary m-0">{loc.efficiency}%</p>
              </div>
              <div className="bg-transparent-02 br-lg" style={{ padding: '1rem', border: '1px solid var(--glass-border)' }}>
                <p className="text-xs text-muted mb-05 m-0">Units / Nodes</p>
                <p className="text-lg font-extrabold m-0">
                  {loc.units.length} / {loc.units.reduce((acc, unit) => acc + unit.machines.length, 0)}
                </p>
              </div>
              <div className="bg-transparent-02 br-lg" style={{ padding: '1rem', border: '1px solid var(--glass-border)' }}>
                <p className="text-xs text-muted mb-05 m-0">Energy Total</p>
                <p className="text-lg font-extrabold text-secondary m-0">
                  {(loc.units.reduce((acc, unit) => acc + unit.machines.reduce((m_acc, m) => m_acc + m.energy, 0), 0) / 1000).toFixed(1)} MWh
                </p>
              </div>
              <div className="bg-transparent-02 br-lg" style={{ padding: '1rem', border: '1px solid var(--glass-border)' }}>
                <p className="text-xs text-muted mb-05 m-0">Fleets</p>
                <p className="text-lg font-extrabold m-0">{loc.vehicles.length}</p>
              </div>
            </div>

            <div className="flex-between" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
              <div className="flex-align-center gap-05">
                <span className="text-xs text-muted uppercase" style={{ marginRight: '0.5rem' }}>Infrastructure Mix:</span>
                <Truck size={16} color="var(--color-primary)" style={{ opacity: 0.6 }} />
                <Activity size={16} color="var(--color-secondary)" style={{ opacity: 0.6 }} />
                <Zap size={16} color="var(--color-accent)" style={{ opacity: 0.6 }} />
                <div className="flex" style={{ gap: '0.25rem', marginLeft: '0.5rem' }}>
                  {Array.from(new Set(loc.units.flatMap(u => u.machines.map(m => m.energyType)))).map(type => (
                    <span key={type} className="badge badge-neutral text-xs" style={{ border: '1px solid var(--glass-border)' }}>{type}</span>
                  ))}
                </div>
              </div>
              <div
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}
              >
                Open Remote View <ChevronRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Network;
