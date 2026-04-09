import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '../components/Common';
import { Zap, Flame, Droplet, Bell, Leaf, MapPin, Activity, Truck, ChevronRight, Settings } from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const LocalDashboard = ({ 
  location, energyData, calculateLocationCarbon, pieData 
}) => {
  if (!location) return null;

  const carbon = calculateLocationCarbon(location);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
            <MapPin size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>Site Hub Portal</span>
          </div>
          <h1 style={{ margin: 0 }}>{location.name}</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Local Unit & Fleet Monitoring</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '0.5rem 1rem', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{location.efficiency}% Operational Efficiency</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard title="Site Carbon" value={`${carbon.total}kg`} change="-5%" icon={Leaf} color="var(--color-primary)" />
        <StatCard title="Active Units" value={location.units.length} subtitle="Online" icon={Activity} color="var(--color-secondary)" />
        <StatCard title="Fleet Status" value={location.vehicles.length} subtitle="Active" icon={Truck} color="var(--color-accent)" />
        <StatCard title="Power Grid" value="Active" subtitle="Current Source" icon={Zap} color="var(--color-primary)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Site Power Consumption</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer>
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="localGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '1rem' }}
                />
                <Area type="monotone" dataKey="electricity" stroke="var(--color-primary)" strokeWidth={3} fill="url(#localGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Emissions Breakdown</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Electricity', value: carbon.electricity, color: 'var(--color-primary)' },
                    { name: 'Natural Gas', value: carbon.gas, color: 'var(--color-secondary)' },
                    { name: 'Fuel', value: carbon.fuel, color: 'var(--color-accent)' },
                    { name: 'Transport', value: carbon.transport, color: '#A78BFA' }
                  ]}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {[
                    'var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', '#A78BFA'
                  ].map((color, index) => <Cell key={index} fill={color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Unit-wise View */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Activity size={24} color="var(--color-primary)" />
            <h2 style={{ margin: 0 }}>Operational Units</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {location.units.map(unit => (
              <div key={unit.id} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{unit.name}</h4>
                  <span style={{ 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '0.5rem', 
                    fontSize: '0.75rem', 
                    fontWeight: 700,
                    background: unit.status === 'Active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: unit.status === 'Active' ? 'var(--color-primary)' : 'var(--color-danger)'
                  }}>
                    {unit.status}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Consumption</p>
                    <p style={{ margin: 0, fontWeight: 700 }}>{unit.machines.reduce((acc, m) => acc + m.energy, 0)} kWh</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Nodes</p>
                    <p style={{ margin: 0, fontWeight: 700 }}>{unit.machines.length} Active</p>
                  </div>
                </div>
                <button className="nav-item" style={{ padding: '0.5rem', justifyContent: 'center', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)' }}>
                  View Unit Details <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle (Fleet) View */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Truck size={24} color="var(--color-secondary)" />
            <h2 style={{ margin: 0 }}>Transportation Fleet</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {location.vehicles.map(v => (
              <div key={v.id} className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {v.type === 'Electric' ? <Zap size={18} color="var(--color-secondary)" /> : <Truck size={18} color="var(--color-accent)" />}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>{v.level}%</p>
                    <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '2px' }}>
                      <div style={{ width: `${v.level}%`, height: '100%', background: v.level > 20 ? 'var(--color-primary)' : 'var(--color-danger)', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                </div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>{v.name}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status: {v.status}</p>
                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Daily Trips</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{v.trips}</span>
                </div>
              </div>
            ))}
            <button className="glass-card" style={{ border: '2px dashed var(--glass-border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+ Add Vehicle</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocalDashboard;
