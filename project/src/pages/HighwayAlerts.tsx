import React from 'react';
import { 
  PhoneCall, 
  Building2, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  MapPin,
  Car,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HighwayAlerts() {
  const { incidents } = useApp();
  
  const tollGates = [
    { id: 'TG1', name: 'City East Toll Plaza', distance: '5.2 km' },
    { id: 'TG2', name: 'Highway Junction Toll', distance: '8.7 km' },
    { id: 'TG3', name: 'Western Express Toll', distance: '12.3 km' }
  ];

  const helplineCenters = [
    { id: 'NH1', name: 'National Highway Control Room', number: '1033' },
    { id: 'NH2', name: 'Regional Traffic Control', number: '112' },
    { id: 'NH3', name: 'Road Safety Patrol', number: '1073' }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Emergency Contact Centers */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <PhoneCall className="w-8 h-8 text-green-400" />
          <h2 className="text-2xl font-semibold">Highway Emergency Centers</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {helplineCenters.map(center => (
            <div key={center.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">{center.name}</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-3 text-green-400">
                  <PhoneCall className="w-5 h-5" />
                  <span className="text-xl font-bold">{center.number}</span>
                </div>
                <button className="mt-4 w-full py-2 px-4 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 flex items-center justify-center gap-2 transition-colors">
                  <Send className="w-4 h-4" />
                  Quick Alert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Toll Gates */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Building2 className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-semibold">Nearby Toll Gates</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tollGates.map(gate => (
            <div key={gate.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">{gate.name}</span>
                  <span className="text-sm text-blue-400">{gate.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Highway NH-48</span>
                </div>
                <button className="w-full py-2 px-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 flex items-center justify-center gap-2 transition-colors">
                  <Send className="w-4 h-4" />
                  Send Alert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Incident Alerts */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <AlertTriangle className="w-8 h-8 text-orange-400" />
          <h2 className="text-2xl font-semibold">Active Incident Alerts</h2>
        </div>
        <div className="space-y-6">
          {incidents.map(incident => (
            <div key={incident.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-orange-400" />
                    <h3 className="font-semibold">{incident.type} Alert</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    incident.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    incident.severity === 'Moderate' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {incident.severity}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>{incident.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>{incident.location.description}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Car className="w-4 h-4 text-blue-400" />
                      <span>{incident.vehicleInfo?.type} - {incident.vehicleInfo?.numberPlate}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-white flex items-center justify-center gap-2 transition-colors">
                      <Send className="w-4 h-4" />
                      Alert All Centers
                    </button>
                    <div className="flex items-center justify-between text-sm text-slate-400 mt-2">
                      <span>Status:</span>
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Alerts Sent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alert Progress */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-slate-400">Toll Gates Notified</span>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-slate-400">Highway Control Informed</span>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-slate-400">Response Units Deployed</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {incidents.length === 0 && (
            <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-slate-400">No active incidents to report</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}