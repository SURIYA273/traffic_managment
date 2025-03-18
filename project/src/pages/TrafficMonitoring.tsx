import React from 'react';
import { Signal as TrafficSignal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TrafficMonitoring() {
  const { junctions, systemMetrics } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Heavy': return 'text-red-400';
      case 'Light': return 'text-green-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Traffic Analysis Card */}
        <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
          <div className="flex items-center gap-4 mb-6">
            <TrafficSignal className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold">Traffic Flow Analysis</h2>
          </div>
          <div className="space-y-4">
            {junctions.map(junction => (
              <div key={junction.id} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Junction {junction.id}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(junction.status)}`}>
                    {junction.status}
                  </span>
                </div>
                <div className="w-full bg-slate-600/50 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${junction.flowRate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Flow Rate: {Math.round(junction.flowRate)}%</span>
                  <span>Wait Time: {Math.round(junction.waitTime)}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Predictions */}
        <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
          <h2 className="text-xl font-semibold mb-6">AI Traffic Predictions</h2>
          <div className="space-y-4">
            {junctions.map(junction => (
              <div key={junction.id} className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    Junction {junction.id}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(junction.status)}`}>
                    {junction.status}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  {junction.flowRate > 85 
                    ? "High risk of incidents due to heavy traffic"
                    : junction.flowRate < 40
                    ? "Low traffic, minimal risk of incidents"
                    : "Normal traffic flow, moderate risk"
                  }
                </p>
                <div className="mt-2 w-full bg-slate-600/50 rounded-full h-1">
                  <div 
                    className="bg-blue-400 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${junction.flowRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
        <h2 className="text-xl font-semibold mb-6">System Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">AI Core</span>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="text-sm text-slate-400">
              Load: {Math.round(systemMetrics.aiCore.load)}%
            </div>
            <div className="mt-2 w-full bg-slate-600/50 rounded-full h-1">
              <div 
                className="bg-green-400 h-1 rounded-full transition-all duration-500"
                style={{ width: `${systemMetrics.aiCore.load}%` }}
              ></div>
            </div>
          </div>
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Sensors</span>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="text-sm text-slate-400">
              Active: {systemMetrics.sensors.count}
            </div>
            <div className="mt-2 text-xs text-slate-500">
              All systems operational
            </div>
          </div>
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Network</span>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="text-sm text-slate-400">
              Status: {systemMetrics.network.status}
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Latency: {systemMetrics.network.latency}ms
            </div>
          </div>
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Database</span>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="text-sm text-slate-400">
              Status: {systemMetrics.database.status}
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Query time: {systemMetrics.database.queryTime}ms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}