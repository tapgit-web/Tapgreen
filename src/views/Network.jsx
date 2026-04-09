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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>Global Operational Network</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Site reliability and efficiency tracking across all regions</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-primary)' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>12 Sites Online</span>
          </div>
          <button className="btn-primary" style={{ height: '44px' }}><MapPin size={18} /> Plot New Site</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                  <h3 style={{ margin: 0 }}>{loc.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>Region: South Asia</span>
                    <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>Hub: Logistics</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
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
                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Uptime: 99.98%</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Efficiency</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--color-primary)' }}>{loc.efficiency}%</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Units / Nodes</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                  {loc.units.length} / {loc.units.reduce((acc, unit) => acc + unit.machines.length, 0)}
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Energy Total</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--color-secondary)' }}>
                  {(loc.units.reduce((acc, unit) => acc + unit.machines.reduce((m_acc, m) => m_acc + m.energy, 0), 0) / 1000).toFixed(1)} MWh
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Fleets</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{loc.vehicles.length}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '0.5rem' }}>Infrastructure Mix:</span>
                <Truck size={16} color="var(--color-primary)" style={{ opacity: 0.6 }} />
                <Activity size={16} color="var(--color-secondary)" style={{ opacity: 0.6 }} />
                <Zap size={16} color="var(--color-accent)" style={{ opacity: 0.6 }} />
                <div style={{ display: 'flex', gap: '0.25rem', marginLeft: '0.5rem' }}>
                  {Array.from(new Set(loc.units.flatMap(u => u.machines.map(m => m.energyType)))).map(type => (
                    <span key={type} style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>{type}</span>
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
