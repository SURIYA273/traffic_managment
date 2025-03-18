import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface JunctionData {
  id: string;
  flowRate: number;
  status: 'Normal' | 'Heavy' | 'Light';
  waitTime: number;
}

interface EmergencyIncident {
  id: string;
  type: 'Accident' | 'Breakdown';
  severity: 'Critical' | 'Moderate' | 'Minor';
  location: {
    coordinates: string;
    description: string;
  };
  timestamp: Date;
  vehicleInfo?: {
    type: string;
    numberPlate: string;
  };
  status: 'Detected' | 'Responding' | 'At Scene' | 'Resolved';
  familyNotified?: boolean;
}

interface EmergencyService {
  id: string;
  type: 'Ambulance' | 'Police' | 'Hospital';
  name: string;
  distance: number;
  eta: number;
  status: 'Available' | 'Responding' | 'Busy';
}

interface SystemMetrics {
  aiCore: { status: string; load: number };
  sensors: { status: string; count: number };
  network: { status: string; latency: number };
  database: { status: string; queryTime: number };
}

interface AppContextType {
  junctions: JunctionData[];
  incidents: EmergencyIncident[];
  emergencyServices: EmergencyService[];
  systemMetrics: SystemMetrics;
  addIncident: (incident: EmergencyIncident) => void;
  notifyFamily: (incidentId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [junctions, setJunctions] = useState<JunctionData[]>([
    { id: 'A1', flowRate: 75, status: 'Normal', waitTime: 45 },
    { id: 'B2', flowRate: 90, status: 'Heavy', waitTime: 120 },
    { id: 'C3', flowRate: 30, status: 'Light', waitTime: 20 },
  ]);

  const [incidents, setIncidents] = useState<EmergencyIncident[]>([]);
  const [emergencyServices, setEmergencyServices] = useState<EmergencyService[]>([
    {
      id: 'AMB001',
      type: 'Ambulance',
      name: 'City General Ambulance 1',
      distance: 2.5,
      eta: 5,
      status: 'Available'
    },
    {
      id: 'POL001',
      type: 'Police',
      name: 'Central Police Station',
      distance: 3.2,
      eta: 7,
      status: 'Available'
    },
    {
      id: 'HOSP001',
      type: 'Hospital',
      name: 'City General Hospital',
      distance: 4.1,
      eta: 0,
      status: 'Available'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    aiCore: { status: 'Operational', load: 78 },
    sensors: { status: 'Active', count: 24 },
    network: { status: 'Online', latency: 45 },
    database: { status: 'Connected', queryTime: 0.8 }
  });

  const addIncident = (incident: EmergencyIncident) => {
    setIncidents(prev => [...prev, { ...incident, familyNotified: false }]);
    navigate('/emergency');
  };

  const notifyFamily = (incidentId: string) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId 
        ? { ...incident, familyNotified: true }
        : incident
    ));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Update junctions and detect potential incidents
      setJunctions(prev => {
        const updated = prev.map(junction => {
          const newFlowRate = Math.min(100, Math.max(0, junction.flowRate + (Math.random() * 20 - 10)));
          const newWaitTime = Math.max(0, junction.waitTime + (Math.random() * 30 - 15));
          
          // Detect potential incidents based on traffic conditions
          if (newFlowRate > 95 && newWaitTime > 180 && Math.random() > 0.7) {
            const incident: EmergencyIncident = {
              id: `INC${Date.now()}`,
              type: Math.random() > 0.5 ? 'Accident' : 'Breakdown',
              severity: 'Critical',
              location: {
                coordinates: '12.9716° N, 77.5946° E',
                description: `Highway NH-48, Near Junction ${junction.id}`
              },
              timestamp: new Date(),
              vehicleInfo: {
                type: 'Two Wheeler',
                numberPlate: `KA-${Math.floor(Math.random() * 99)}-AB-${Math.floor(Math.random() * 9999)}`
              },
              status: 'Detected',
              familyNotified: false
            };
            addIncident(incident);
          }

          return {
            ...junction,
            flowRate: newFlowRate,
            waitTime: newWaitTime,
            status: newFlowRate > 85 ? 'Heavy' : newFlowRate < 40 ? 'Light' : 'Normal'
          };
        });
        return updated;
      });

      // Update system metrics
      setSystemMetrics(prev => ({
        ...prev,
        aiCore: { ...prev.aiCore, load: Math.min(100, Math.max(0, prev.aiCore.load + (Math.random() * 10 - 5))) },
        sensors: { ...prev.sensors, count: Math.max(20, Math.min(30, prev.sensors.count + (Math.random() > 0.5 ? 1 : -1))) }
      }));

      // Update emergency services
      setEmergencyServices(prev => prev.map(service => ({
        ...service,
        distance: service.status === 'Responding' ? 
          Math.max(0, service.distance - 0.5) : service.distance,
        eta: service.status === 'Responding' ? 
          Math.max(0, service.eta - 1) : service.eta
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{ 
      junctions, 
      incidents, 
      emergencyServices, 
      systemMetrics,
      addIncident,
      notifyFamily
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}