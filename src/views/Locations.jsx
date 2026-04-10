import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Leaf, Navigation, MapPin, Truck, Zap, ChevronRight, Droplet 
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis 
} from 'recharts';

import { useNavigate } from 'react-router-dom';

const LocationsView = ({ 
  selectedLocation, calculateLocationCarbon, calculateUnitCarbon, 
  calculateMachineCarbon, setSelectedMachine, energyData, calculateFleetCarbon, 
  calculateVehicleCarbon 
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      key="locations"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
    >
      <div key="unit-view">
        <div className="flex-between flex-align-end mb-25">
          <div>
            <div className="flex-align-center gap-05 text-primary mb-05">
              <Activity size={18} />
              <span className="text-sm font-extrabold uppercase" style={{ letterSpacing: '1px' }}>Local Node Monitoring</span>
            </div>
            <h1 className="m-0">{selectedLocation.name}</h1>
          </div>
          <div className="flex gap-1">
            <div className="glass-card" style={{ padding: '0.5rem 1rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{calculateLocationCarbon(selectedLocation).total} kg CO2e</span>
            </div>
            <div className="glass-card" style={{ padding: '0.5rem 1rem', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{selectedLocation.status} Status</span>
            </div>
            <button 
              onClick={() => navigate(`/portal/${selectedLocation.id}`)}
              className="btn-primary" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Site Portal <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Location Overview Section */}
        <div className="grid-4 mb-25">
          <div className="glass-card card-padding bg-transparent-02">
            <p className="text-xs text-muted m-0 mb-05">Overall Efficiency</p>
            <div className="flex flex-align-end gap-05">
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>{selectedLocation.efficiency}%</span>
              <span className="text-sm text-primary" style={{ opacity: 0.6, marginBottom: '0.3rem' }}>Optimal</span>
            </div>
          </div>
          <div className="glass-card card-padding bg-transparent-02">
            <p className="text-xs text-muted m-0 mb-05">Total Units</p>
            <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{selectedLocation.units.length}</span>
            <span className="text-sm text-muted" style={{ marginLeft: '0.5rem' }}>Operational</span>
          </div>
          <div className="glass-card card-padding bg-transparent-02">
            <p className="text-xs text-muted m-0 mb-05">Machine Count</p>
            <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {selectedLocation.units.reduce((acc, unit) => acc + unit.machines.length, 0)}
            </span>
            <span className="text-sm text-muted" style={{ marginLeft: '0.5rem' }}>Nodes</span>
          </div>
          <div className="glass-card card-padding bg-transparent-02">
            <p className="text-xs text-muted m-0 mb-05">Location Energy</p>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
              {(selectedLocation.units.reduce((acc, unit) => acc + unit.machines.reduce((m_acc, m) => m_acc + m.energy, 0), 0) / 1000).toFixed(1)}
            </span>
            <span className="text-base font-semibold" style={{ marginLeft: '0.5rem' }}>MWh</span>
          </div>
        </div>

        <div className="grid-2-1 gap-15" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
          <div className="flex-col gap-15">
            {selectedLocation.units.map(unit => (
              <div key={unit.id} className="glass-card card-padding">
                <div className="flex-between mb-15 pb-1" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <div className="flex-align-center gap-05">
                    <Activity size={20} color="var(--color-primary)" />
                    <h3 className="m-0">{unit.name}</h3>
                  </div>
                  <div className="flex-align-center gap-1">
                    <div className="text-right">
                      <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>Emissions</p>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                        {calculateUnitCarbon(unit)} kg CO2e
                      </p>
                    </div>
                    <div style={{ width: 1, height: '24px', background: 'var(--glass-border)' }}></div>
                    <div className="text-right">
                      <p className="m-0 text-xs text-muted uppercase">Consumpt.</p>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                        {unit.machines.reduce((acc, m) => acc + m.energy, 0) || 0} kWh
                      </p>
                      <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.2rem' }}>
                        {Array.from(new Set(unit.machines.map(m => m.energyType))).map(type => (
                          <span key={type} style={{ fontSize: '0.55rem', padding: '0.1rem 0.3rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{type}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: unit.status === 'Active' ? 'var(--color-primary)' : unit.status === 'High Load' ? 'var(--color-danger)' : 'var(--color-accent)' }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{unit.status}</span>
                  </div>
                </div>

                <div className="flex-col gap-1">
                  {unit.machines.map(m => (
                    <div key={m.id}
                      onClick={() => setSelectedMachine(m)}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--glass-border)',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{m.name}</span>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '0.4rem',
                          background: m.status === 'Active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: m.status === 'Active' ? 'var(--color-primary)' : 'var(--color-accent)'
                        }}>{m.status}</span>
                      </div>
                      <div className="grid-3 gap-1">
                        <div>
                          <p className="text-xs text-muted m-0 mb-05">Type</p>
                          <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600 }}>{m.energyType}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0 0 0.1rem 0' }}>Carbon Footprint</p>
                          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                            {calculateMachineCarbon(m)} kg CO2e
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0 0 0.1rem 0' }}>Energy</p>
                          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                            {m.energy}{m.energyType === 'Electricity' ? 'kW' : m.energyType === 'Gas' ? 'm³' : 'L'}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0 0 0.1rem 0' }}>Load</p>
                          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>{m.load}%</p>
                        </div>
                      </div>
                      <div style={{ marginTop: '0.75rem', height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                        <div style={{ width: `${m.load}%`, height: '100%', background: m.load > 90 ? 'var(--color-danger)' : 'var(--color-primary)', borderRadius: 2 }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-col gap-15">
            <div className="glass-card card-padding">
              <div className="flex-between mb-15">
                <h3 className="m-0">Carbon Footprint Breakdown</h3>
                <Leaf size={20} color="var(--color-primary)" />
              </div>

              {(() => {
                const carbon = calculateLocationCarbon(selectedLocation);
                const data = [
                  { name: 'Grid Electricity', value: carbon.electricity, color: 'var(--color-primary)' },
                  { name: 'Thermal (Gas)', value: carbon.gas, color: 'var(--color-secondary)' },
                  { name: 'Back-up/Tools (Fuel)', value: carbon.fuel, color: 'var(--color-accent)' },
                  { name: 'Transport Fleet', value: carbon.transport, color: '#A78BFA' }
                ].filter(d => d.value > 0);

                return (
                  <>
                    <div style={{ height: '220px', width: '100%' }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                      {data.map(item => (
                        <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }}></div>
                            <span style={{ fontSize: '0.85rem' }}>{item.name}</span>
                          </div>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.value} kg CO2e</span>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Location Telemetry</h3>
              <div style={{ height: '200px' }}>
                <ResponsiveContainer>
                  <AreaChart data={energyData}>
                    <XAxis dataKey="name" stroke="var(--text-muted)" hide />
                    <YAxis stroke="var(--text-muted)" hide />
                    <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'var(--text-primary)' }} />
                    <Area type="monotone" dataKey="electricity" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="gas" stroke="var(--color-secondary)" fill="var(--color-secondary)" fillOpacity={0.05} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Insight:</span> This location's carbon intensity is {(calculateLocationCarbon(selectedLocation).total / selectedLocation.efficiency).toFixed(1)} units.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Section */}
        <div className="mt-25">
          <div className="flex-between mb-15">
            <div className="flex-align-center gap-05">
              <Truck size={24} color="var(--color-primary)" />
              <h2 className="m-0">Transportation Fleet</h2>
            </div>
            <div className="glass-card" style={{ padding: '0.5rem 1rem', background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
              <span style={{ color: '#A78BFA', fontWeight: 700, fontSize: '0.9rem' }}>
                Fleet Total: {calculateFleetCarbon(selectedLocation.vehicles)} kg CO2e
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {selectedLocation.vehicles.map(v => (
              <div key={v.id} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    background: v.type === 'Electric' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {v.type === 'Electric' ? <Zap size={20} color="var(--color-secondary)" /> : <Truck size={20} color="var(--color-accent)" />}
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(255,255,255,0.05)'
                  }}>
                    {v.type}
                  </span>
                </div>

                <h4 style={{ margin: '0 0 0.25rem 0' }}>{v.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>{v.status}</p>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                    <span>{v.type === 'Electric' ? 'Battery' : 'Fuel Level'}</span>
                    <span style={{ fontWeight: 700 }}>{v.level}%</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                    <div style={{
                      width: `${v.level}%`,
                      height: '100%',
                      background: v.level < 20 ? 'var(--color-danger)' : v.type === 'Electric' ? 'var(--color-secondary)' : 'var(--color-accent)',
                      borderRadius: 2
                    }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily Trips</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{v.trips}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.6rem 0.8rem', borderRadius: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>Emissions</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)' }}>{calculateVehicleCarbon(v)} kg CO2e</span>
                </div>
              </div>
            ))}

            <button className="glass-card" style={{
              border: '2px dashed var(--glass-border)',
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              padding: '1.5rem',
              opacity: 0.6,
              transition: 'var(--transition)'
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
            >
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Navigation size={20} />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Assign Vehicle</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationsView;
