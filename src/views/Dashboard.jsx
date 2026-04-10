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
      <div className="mb-2">
        <h1 className="page-title">Good Afternoon, Global Lead</h1>
        <p className="page-subtitle">Welcome back to your NetZero monitoring command center.</p>
      </div>

      <div className="grid-6">
        <StatCard title="Electricity" value="1.42 MWh" change="+12%" icon={Zap} color="var(--color-primary)" />
        <StatCard title="Natural Gas" value="842 m³" change="-4%" icon={Flame} color="var(--color-secondary)" />
        <StatCard title="Fuel Usage" value="2.1k L" change="+2%" icon={Droplet} color="var(--color-accent)" />
        <StatCard title="Maintenance" value={alerts.length} subtitle="Active Alerts" icon={Bell} color={alerts.length > 0 ? "var(--color-danger)" : "var(--color-primary)"} />
        <StatCard title="Fleet Eff." value="92.4%" subtitle="Trips: 42" icon={Truck} color="var(--color-primary)" />
        <StatCard title="Carbon" value={`${(locationData.reduce((acc, loc) => acc + calculateLocationCarbon(loc).total, 0) / 1000).toFixed(2)}t`} change="-8%" icon={Leaf} color="var(--color-primary)" />
      </div>

      <div className="grid-2-1">
        <div className="glass-card resizable-card card-padding" style={{ minHeight: '400px' }}>
          <div className="flex-between mb-15">
            <div>
              <h3 className="m-0">Energy Consumption Trends</h3>
              <p className="text-sm text-secondary">Real-time usage across all primary sources.</p>
            </div>
            <div className="flex gap-05">
              <button className="btn-primary text-sm" style={{ padding: '0.4rem 0.8rem' }}>Export PDF</button>
            </div>
          </div>
          <div className="chart-container-lg">
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

        <div className="glass-card resizable-card card-padding">
          <h3 className="mb-15">Carbon Breakdown</h3>
          <div className="chart-container-sm">
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
          <div className="flex-col mt-1" style={{ gap: '0.75rem' }}>
            {pieData.map((item) => (
              <div key={item.name} className="flex-between">
                <div className="flex-align-center gap-05">
                  <div className="br-full" style={{ width: 10, height: 10, background: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex-between mb-1">
          <h3 className="m-0">Top Performing Locations</h3>
          <button className="text-primary text-sm" onClick={() => navigate('/network')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>View All Locations</button>
        </div>
        <div className="grid-auto-fill">
          {locationData.slice(0, 4).map(loc => (
            <div key={loc.id} onClick={() => navigate(`/locations/${loc.id}`)} className="glass-card card-padding-sm" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div className="bg-transparent-05 br-md flex-center" style={{ width: 40, height: 40 }}>
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
              <h4 className="text-base m-0 mb-05">{loc.name}</h4>
              <div className="flex-between mb-1">
                <p className="text-sm text-secondary m-0">Efficiency: {loc.efficiency}%</p>
                <p className="text-sm text-primary font-bold m-0">{calculateLocationCarbon(loc).total} kg CO2e</p>
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
