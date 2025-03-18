import React, { useState } from 'react';
import { 
  Car, 
  User, 
  Phone, 
  Users, 
  Bell, 
  AlertCircle, 
  CheckCircle2, 
  Search,
  Heart,
  Clock,
  MapPin,
  Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function VictimInformation() {
  const { incidents, notifyFamily } = useApp();
  const [searchPlate, setSearchPlate] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleSearch = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Vehicle Scanner */}
      <div className="mb-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <Car className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-semibold">Vehicle Scanner</h2>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter vehicle number plate..."
              value={searchPlate}
              onChange={(e) => setSearchPlate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Search className="w-5 h-5" />
            Scan
          </button>
        </div>
        {scanning && (
          <div className="animate-pulse flex items-center gap-3 text-blue-400">
            <AlertCircle className="w-5 h-5" />
            <span>Scanning vehicle information...</span>
          </div>
        )}
      </div>

      {/* Victim Information Cards */}
      <div className="grid gap-8">
        {incidents.map(incident => (
          <div key={incident.id} className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700">
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-semibold">Accident Victim Information</h3>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm ${
                  incident.status === 'Resolved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {incident.status}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Incident Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{incident.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{incident.location.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">Severity: {incident.severity}</span>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Car className="w-4 h-4 text-blue-400" />
                      <span className="font-medium">Vehicle Details</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>Type: {incident.vehicleInfo?.type}</p>
                      <p>Plate: {incident.vehicleInfo?.numberPlate}</p>
                    </div>
                  </div>
                </div>

                {/* Owner Information */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-blue-400" />
                      <span className="font-medium">Owner Details</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-400" />
                        <span>+1234567890</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span>Emergency Contact: +1987654321</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Notification Status */}
              <div className="mt-6 p-4 bg-slate-700/30 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">Family Notification Status</span>
                  </div>
                  {incident.familyNotified ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Family Notified</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => notifyFamily(incident.id)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Bell className="w-4 h-4" />
                      Notify Family
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {incidents.length === 0 && (
          <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No active incidents found</p>
          </div>
        )}
      </div>
    </div>
  );
}