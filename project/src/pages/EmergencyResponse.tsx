import React from 'react';
import { AlertTriangle, Ambulance, Shield, Guitar as Hospital, PhoneCall, Car, MapPin, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EmergencyResponse() {
  const { incidents, emergencyServices } = useApp();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500/20 text-red-400';
      case 'Moderate': return 'bg-orange-500/20 text-orange-400';
      case 'Minor': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-400';
      case 'Responding': return 'text-blue-400';
      case 'Busy': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Active Incidents */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-semibold">Active Emergency Incidents</h2>
        </div>
        <div className="grid gap-6">
          {incidents.map(incident => (
            <div key={incident.id} className="bg-slate-800/50 p-6 rounded-xl border border-red-700/30 animate-pulse">
              <div className="flex flex-wrap gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(incident.severity)}`}>
                  {incident.severity}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400">
                  {incident.type}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400">
                  {incident.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{incident.location.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">
                      {incident.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {incident.vehicleInfo && (
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">
                        {incident.vehicleInfo.type} - {incident.vehicleInfo.numberPlate}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Emergency Response</span>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="p-3 bg-slate-700/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ambulance Dispatched</span>
                      <PhoneCall className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Police Notified</span>
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Hospital Alerted</span>
                      <Hospital className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {incidents.length === 0 && (
            <div className="bg-slate-800/50 p-6 rounded-xl text-center">
              <p className="text-slate-400">No active incidents</p>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Services */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <Ambulance className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold">Emergency Services Status</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {emergencyServices.map(service => (
            <div key={service.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">{service.name}</span>
                <span className={`${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Distance</span>
                  <span>{service.distance.toFixed(1)} km</span>
                </div>
                {service.eta > 0 && (
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>ETA</span>
                    <span>{service.eta} min</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}