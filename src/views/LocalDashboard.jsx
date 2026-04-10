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
      <div className="flex-between flex-align-end" style={{ marginBottom: '2.5rem' }}>
        <div>
          <div className="flex-align-center gap-05 text-primary mb-05">
            <MapPin size={18} />
            <span className="text-sm font-extrabold uppercase">Site Hub Portal</span>
          </div>
          <h1 className="m-0">{location.name}</h1>
          <p className="text-secondary mt-05">Local Unit & Fleet Monitoring</p>
        </div>
        <div className="flex gap-1">
          <div className="glass-card" style={{ padding: '0.5rem 1rem', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
            <span className="text-primary font-bold">{location.efficiency}% Operational Efficiency</span>
          </div>
        </div>
      </div>

      <div className="grid-4">
        <StatCard title="Site Carbon" value={`${carbon.total}kg`} change="-5%" icon={Leaf} color="var(--color-primary)" />
        <StatCard title="Active Units" value={location.units.length} subtitle="Online" icon={Activity} color="var(--color-secondary)" />
        <StatCard title="Fleet Status" value={location.vehicles.length} subtitle="Active" icon={Truck} color="var(--color-accent)" />
        <StatCard title="Power Grid" value="Active" subtitle="Current Source" icon={Zap} color="var(--color-primary)" />
      </div>

      <div className="grid-2">
        <div className="glass-card card-padding-lg">
          <h3 className="mb-15">Site Power Consumption</h3>
          <div className="chart-container-md">
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

        <div className="glass-card card-padding-lg">
          <h3 className="mb-15">Emissions Breakdown</h3>
          <div className="chart-container-md">
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

      <div className="grid-2" style={{ marginBottom: 0 }}>
        {/* Unit-wise View */}
        <div>
          <div className="flex-align-center mb-15" style={{ gap: '0.75rem' }}>
            <Activity size={24} color="var(--color-primary)" />
            <h2 className="m-0">Operational Units</h2>
          </div>
          <div className="flex-col gap-1">
            {location.units.map(unit => (
              <div key={unit.id} className="glass-card card-padding">
                <div className="flex-between mb-1">
                  <h4 className="text-lg m-0">{unit.name}</h4>
                  <span className={`badge ${unit.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {unit.status}
                  </span>
                </div>
                <div className="grid-2 mb-1" style={{ gap: '1rem' }}>
                  <div className="bg-transparent-02 br-md" style={{ padding: '0.75rem' }}>
                    <p className="text-xs text-muted m-0">Consumption</p>
                    <p className="font-bold m-0">{unit.machines.reduce((acc, m) => acc + m.energy, 0)} kWh</p>
                  </div>
                  <div className="bg-transparent-02 br-md" style={{ padding: '0.75rem' }}>
                    <p className="text-xs text-muted m-0">Nodes</p>
                    <p className="font-bold m-0">{unit.machines.length} Active</p>
                  </div>
                </div>
                <button className="nav-item flex-center text-sm bg-transparent-05" style={{ padding: '0.5rem' }}>
                  View Unit Details <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle (Fleet) View */}
        <div>
          <div className="flex-align-center mb-15" style={{ gap: '0.75rem' }}>
            <Truck size={24} color="var(--color-secondary)" />
            <h2 className="m-0">Transportation Fleet</h2>
          </div>
          <div className="grid-2" style={{ margin: 0, gap: '1rem' }}>
            {location.vehicles.map(v => (
              <div key={v.id} className="glass-card card-padding-sm">
                <div className="flex-between mb-1">
                  <div className="bg-transparent-05 br-md flex-center" style={{ width: 36, height: 36 }}>
                    {v.type === 'Electric' ? <Zap size={18} color="var(--color-secondary)" /> : <Truck size={18} color="var(--color-accent)" />}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold m-0">{v.level}%</p>
                    <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '2px' }}>
                      <div style={{ width: `${v.level}%`, height: '100%', background: v.level > 20 ? 'var(--color-primary)' : 'var(--color-danger)', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                </div>
                <h4 className="m-0 mb-05" style={{ fontSize: '0.95rem' }}>{v.name}</h4>
                <p className="text-xs text-secondary m-0">Status: {v.status}</p>
                <div className="flex-between" style={{ marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '0.75rem' }}>
                    <span className="text-xs text-muted">Daily Trips</span>
                    <span className="text-xs font-bold">{v.trips}</span>
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
