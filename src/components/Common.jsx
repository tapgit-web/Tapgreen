import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const StatCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
  <div className="glass-card card-padding-sm">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <div style={{ width: 44, height: 44, background: `${color}15`, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={24} color={color} />
      </div>
      <span style={{
        fontSize: '0.8rem',
        fontWeight: 700,
        color: change?.startsWith('+') ? 'var(--color-danger)' : 'var(--color-primary)'
      }}>
        {change}
      </span>
    </div>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{title}</p>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>{value}</h2>
      {subtitle && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{subtitle}</span>}
    </div>
  </div>
);

export const TimelineItem = ({ year, title, desc, status }) => (
  <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
    <div style={{
      position: 'absolute',
      left: -33,
      top: 0,
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: status === 'Complete' ? 'var(--color-primary)' : status === 'In Progress' ? 'var(--color-secondary)' : 'var(--bg-tertiary)',
      border: '4px solid var(--bg-primary)',
      zIndex: 1
    }}></div>
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)' }}>{year}</span>
      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.65rem', fontWeight: 700, background: 'rgba(255,255,255,0.05)', textTransform: 'uppercase' }}>{status}</span>
    </div>
    <h4 style={{ margin: '0 0 0.25rem 0' }}>{title}</h4>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '500px' }}>{desc}</p>
  </div>
);

export const ThresholdSlider = ({ label, value, unit, onChange, color }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{label}</label>
      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{value}{unit}</span>
    </div>
    <input
      type="range"
      min={label.includes('Temp') ? 0 : 0}
      max={label.includes('Temp') ? 100 : 100}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      style={{ width: '100%', accentColor: color }}
    />
  </div>
);

export const TelemetryCard = ({ label, value, unit }) => (
  <div className="glass-card card-padding-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <h2 style={{ margin: 0 }}>{value}</h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{unit}</span>
      </div>
    </div>
    <ArrowUpRight color="var(--color-primary)" size={24} />
  </div>
);
