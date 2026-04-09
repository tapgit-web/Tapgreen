import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/Common';
import { Zap, Flame, Droplet, Bell, Truck, Leaf, MapPin } from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell
} from 'recharts';

const Dashboard = ({ 
  energyData, alerts, locationData, calculateLocationCarbon, pieData 
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Good Afternoon, Global Lead</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back to your NetZero monitoring command center.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Electricity" value="1.42 MWh" change="+12%" icon={Zap} color="var(--color-primary)" />
        <StatCard title="Natural Gas" value="842 m³" change="-4%" icon={Flame} color="var(--color-secondary)" />
        <StatCard title="Fuel Usage" value="2.1k L" change="+2%" icon={Droplet} color="var(--color-accent)" />
        <StatCard title="Maintenance" value={alerts.length} subtitle="Active Alerts" icon={Bell} color={alerts.length > 0 ? "var(--color-danger)" : "var(--color-primary)"} />
        <StatCard title="Fleet Eff." value="92.4%" subtitle="Trips: 42" icon={Truck} color="var(--color-primary)" />
        <StatCard title="Carbon" value={`${(locationData.reduce((acc, loc) => acc + calculateLocationCarbon(loc).total, 0) / 1000).toFixed(2)}t`} change="-8%" icon={Leaf} color="var(--color-primary)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', minHeight: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>Energy Consumption Trends</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Real-time usage across all primary sources.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Export PDF</button>
            </div>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}
                  itemStyle={{ fontSize: '0.8rem' }}
                />
                <Line type="monotone" dataKey="electricity" stroke="var(--color-primary)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="gas" stroke="var(--color-secondary)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="fuel" stroke="var(--color-accent)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Carbon Breakdown</h3>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {pieData.map((item) => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }}></div>
                  <span style={{ fontSize: '0.85rem' }}>{item.name}</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>Top Performing Locations</h3>
          <button onClick={() => navigate('/network')} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>View All Locations</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {locationData.slice(0, 4).map(loc => (
            <div key={loc.id} onClick={() => navigate(`/locations/${loc.id}`)} className="glass-card" style={{ padding: '1.25rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={20} />
                </div>
                <span style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  background: loc.status === 'Optimal' ? 'rgba(74, 222, 128, 0.1)' : loc.status === 'Warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: loc.status === 'Optimal' ? 'var(--color-primary)' : loc.status === 'Warning' ? 'var(--color-accent)' : 'var(--color-danger)'
                }}>
                  {loc.status}
                </span>
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{loc.name}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Efficiency: {loc.efficiency}%</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 700, margin: 0 }}>{calculateLocationCarbon(loc).total} kg CO2e</p>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                <div style={{ width: `${loc.efficiency}%`, height: '100%', background: loc.efficiency > 90 ? 'var(--color-primary)' : loc.efficiency > 70 ? 'var(--color-accent)' : 'var(--color-danger)', borderRadius: 2 }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
