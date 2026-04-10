import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ThresholdModal from './components/ThresholdModal';

// Views
import Dashboard from './views/Dashboard';
import Monitoring from './views/Monitoring';
import Maintenance from './views/Maintenance';
import Network from './views/Network';
import Strategy from './views/Strategy';
import SettingsView from './views/Settings';
import LocationsView from './views/Locations';
import Login from './views/Login';
import LocalDashboard from './views/LocalDashboard';
import LocalUnits from './views/LocalUnits';
import LocalFleet from './views/LocalFleet';
import LocalSettings from './views/LocalSettings';

// Load Data
import db from './data/dashboardData.json';

const App = () => {
  const [user, setUser] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [theme, setTheme] = useState('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  
  // States initialized from JSON
  const [locationData, setLocationData] = useState(db.locations);
  const [energyData, setEnergyData] = useState(db.energyData);
  const [carbonFactors, setCarbonFactors] = useState(db.carbonFactors);
  const [pieData, setPieData] = useState(db.pieData);
  
  const [alerts, setAlerts] = useState([]);
  const path = useLocation();
  const navigate = useNavigate();

  // Alert generation logic based on locationData
  useEffect(() => {
    const newAlerts = [];
    locationData.forEach(loc => {
      loc.units.forEach(unit => {
        unit.machines.forEach(m => {
          const limits = m.maintenanceLimits;
          const mismatch = (m.energy - m.production) / (m.production || 1);
          if (m.energy > m.production && mismatch > limits.mismatch) {
            newAlerts.push({
              id: `alert-${m.id}-mismatch`,
              type: 'mismatch',
              severity: 'high',
              machine: m.name,
              location: loc.name,
              message: `High Consumption Mismatch: ${Math.round(mismatch * 100)}% over production.`,
              timestamp: new Date().toLocaleTimeString()
            });
          }
          if (m.load > limits.load) {
            newAlerts.push({
              id: `alert-${m.id}-load`,
              type: 'load',
              severity: 'critical',
              machine: m.name,
              location: loc.name,
              message: `Load Threshold Exceeded: ${m.load}% (Limit: ${limits.load}%)`,
              timestamp: new Date().toLocaleTimeString()
            });
          }
          if (m.temp > limits.temp) {
            newAlerts.push({
              id: `alert-${m.id}-temp`,
              type: 'temp',
              severity: 'medium',
              machine: m.name,
              location: loc.name,
              message: `Unusual Temperature Rise: ${m.temp}°C (Limit: ${limits.temp}°C)`,
              timestamp: new Date().toLocaleTimeString()
            });
          }
        });
      });
    });
    setAlerts(newAlerts);
  }, [locationData]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Helper Functions for Carbon Calculations (using carbonFactors state)
  const calculateMachineCarbon = (m) => {
    if (m.energyType === 'Electricity') return Math.round(m.energy * carbonFactors.Electricity);
    if (m.energyType === 'Gas') return Math.round(m.energy * carbonFactors.Gas);
    if (m.energyType === 'Fuel') return Math.round(m.energy * carbonFactors.Fuel);
    return 0;
  };

  const calculateUnitCarbon = (unit) => {
    return unit.machines.reduce((acc, m) => acc + calculateMachineCarbon(m), 0);
  };

  const calculateVehicleCarbon = (v) => {
    if (v.type === 'Electric') return Math.round(v.trips * carbonFactors.EV_Trip);
    if (v.type === 'Diesel') return Math.round(v.trips * carbonFactors.Diesel_Trip);
    if (v.type === 'CNG') return Math.round(v.trips * carbonFactors.CNG_Trip);
    return 0;
  };

  const calculateFleetCarbon = (vehicles) => {
    return vehicles.reduce((acc, v) => acc + calculateVehicleCarbon(v), 0);
  };

  const calculateLocationCarbon = (loc) => {
    let e_carbon = 0;
    let g_carbon = 0;
    let f_carbon = 0;
    let t_carbon = calculateFleetCarbon(loc.vehicles);

    loc.units.forEach(unit => {
      unit.machines.forEach(m => {
        if (m.energyType === 'Electricity') e_carbon += m.energy * carbonFactors.Electricity;
        if (m.energyType === 'Gas') g_carbon += m.energy * carbonFactors.Gas;
        if (m.energyType === 'Fuel') f_carbon += m.energy * carbonFactors.Fuel;
      });
    });

    return {
      electricity: Math.round(e_carbon),
      gas: Math.round(g_carbon),
      fuel: Math.round(f_carbon),
      transport: Math.round(t_carbon),
      total: Math.round(e_carbon + g_carbon + f_carbon + t_carbon)
    };
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === 'manager') {
      navigate(`/portal/${userData.assignedLocationId}`);
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const LocationRouteWrapper = ({ locationData, ...props }) => {
    const { id } = useParams();
    const location = locationData.find(loc => loc.id === parseInt(id));
    if (!location) return <Navigate to="/dashboard" />;
    return <LocationsView selectedLocation={location} {...props} />;
  };

  const LocalDashboardWrapper = ({ locationData, view, ...props }) => {
      const { id } = useParams();
      const location = locationData.find(loc => loc.id === parseInt(id));
      if (!location) return <Navigate to="/dashboard" />;
      
      if (view === 'units') return <LocalUnits location={location} {...props} />;
      if (view === 'fleet') return <LocalFleet location={location} {...props} />;
      if (view === 'settings') return <LocalSettings location={location} {...props} />;
      
      return <LocalDashboard location={location} {...props} />;
  };

  if (!user) {
    return <Login onLogin={handleLogin} users={db.users} />;
  }

  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        locationData={user.role === 'admin' ? locationData : locationData.filter(l => l.id === user.assignedLocationId)}
        userRole={user.role}
      />

      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', maxHeight: '100vh', transition: 'var(--transition)' }}>
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          toggleTheme={toggleTheme}
          alerts={alerts}
          onLogout={handleLogout}
          userRole={user.role}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <AnimatePresence mode="wait">
          <Routes location={path} key={path.pathname}>
            {user.role === 'admin' ? (
              <>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={
                  <Dashboard 
                    energyData={energyData}
                    alerts={alerts}
                    locationData={locationData}
                    calculateLocationCarbon={calculateLocationCarbon}
                    pieData={pieData}
                  />
                } />
                <Route path="/monitoring" element={<Monitoring energyData={energyData} />} />
                <Route path="/maintenance" element={<Maintenance alerts={alerts} />} />
                <Route path="/network" element={<Network locationData={locationData} />} />
                <Route path="/strategy" element={<Strategy />} />
                <Route path="/settings" element={<SettingsView locationData={locationData} setLocationData={setLocationData} />} />
                <Route path="/locations/:id" element={
                  <LocationRouteWrapper 
                    locationData={locationData}
                    calculateLocationCarbon={calculateLocationCarbon}
                    calculateUnitCarbon={calculateUnitCarbon}
                    calculateMachineCarbon={calculateMachineCarbon}
                    setSelectedMachine={setSelectedMachine}
                    energyData={energyData}
                    calculateFleetCarbon={calculateFleetCarbon}
                    calculateVehicleCarbon={calculateVehicleCarbon}
                  />
                } />
              </>
            ) : (
                <>
                    <Route path="/" element={<Navigate to={`/portal/${user.assignedLocationId}`} replace />} />
                </>
            )}
            
            <Route path="/portal/:id" element={
                <LocalDashboardWrapper 
                    locationData={locationData}
                    energyData={energyData}
                    calculateLocationCarbon={calculateLocationCarbon}
                    pieData={pieData}
                />
            } />
            <Route path="/portal/:id/units" element={
                <LocalDashboardWrapper 
                    locationData={locationData}
                    view="units"
                    setSelectedMachine={setSelectedMachine}
                    calculateMachineCarbon={calculateMachineCarbon}
                />
            } />
            <Route path="/portal/:id/fleet" element={
                <LocalDashboardWrapper 
                    locationData={locationData}
                    view="fleet"
                    calculateVehicleCarbon={calculateVehicleCarbon}
                />
            } />
            <Route path="/portal/:id/settings" element={
                <LocalDashboardWrapper 
                    locationData={locationData}
                    view="settings"
                />
            } />
            
            <Route path="*" element={<Navigate to={user.role === 'admin' ? "/dashboard" : `/portal/${user.assignedLocationId}`} replace />} />
          </Routes>
        </AnimatePresence>

        <ThresholdModal 
          selectedMachine={selectedMachine}
          setSelectedMachine={setSelectedMachine}
          locationData={locationData}
          setLocationData={setLocationData}
        />
      </main>
    </div>
  );
};

export default App;
