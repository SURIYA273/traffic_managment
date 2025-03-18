import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Loader as Road } from 'lucide-react';
import TrafficMonitoring from './pages/TrafficMonitoring';
import EmergencyResponse from './pages/EmergencyResponse';
import VictimInformation from './pages/VictimInformation';
import HighwayAlerts from './pages/HighwayAlerts';
import { AppProvider } from './context/AppContext';

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header with Logo */}
      <header className="p-6 border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50"></div>
              <div className="relative flex items-center">
                <span className="text-6xl font-bold text-white">A</span>
                <Road className="w-12 h-12 text-blue-400 absolute -right-6 top-1/2 -translate-y-1/2 transform rotate-45" />
              </div>
            </div>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link 
                  to="/" 
                  className="text-slate-300 hover:text-white transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
                >
                  Traffic Monitoring
                </Link>
              </li>
              <li>
                <Link 
                  to="/emergency" 
                  className="text-slate-300 hover:text-white transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
                >
                  Emergency Response
                </Link>
              </li>
              <li>
                <Link 
                  to="/victim" 
                  className="text-slate-300 hover:text-white transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
                >
                  Victim Information
                </Link>
              </li>
              <li>
                <Link 
                  to="/highway-alerts" 
                  className="text-slate-300 hover:text-white transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
                >
                  Highway Alerts
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<TrafficMonitoring />} />
          <Route path="/emergency" element={<EmergencyResponse />} />
          <Route path="/victim" element={<VictimInformation />} />
          <Route path="/highway-alerts" element={<HighwayAlerts />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;