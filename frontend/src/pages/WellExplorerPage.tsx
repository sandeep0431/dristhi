import React, { useState } from 'react';
import {
  MapPin, Filter, Search, Compass, GitCompare,
  AlertTriangle, CheckCircle2, ChevronRight, Layers
} from 'lucide-react';
import { Well } from '../types';

interface WellExplorerPageProps {
  wells: Well[];
  onSelectWell: (wellId: string) => void;
  onNavigate: (route: string) => void;
}

export const WellExplorerPage: React.FC<WellExplorerPageProps> = ({
  wells,
  onSelectWell,
  onNavigate
}) => {
  const [selectedRadius, setSelectedRadius] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeWellHover, setActiveWellHover] = useState<Well | null>(null);

  const filteredWells = wells.filter((w) => {
    const dist = w.distance_km ?? 0;
    const matchRadius = dist <= selectedRadius;
    const matchSearch =
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.well_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.formation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRadius && matchSearch;
  });

  // Assam field bounds for SVG projection
  // Lat: ~27.35 to 27.60, Long: ~94.80 to 95.05
  const minLat = 27.35;
  const maxLat = 27.60;
  const minLon = 94.80;
  const maxLon = 95.06;

  const project = (lat: number, lon: number) => {
    const x = ((lon - minLon) / (maxLon - minLon)) * 600;
    // Invert y because SVG y goes downwards
    const y = 400 - ((lat - minLat) / (maxLat - minLat)) * 400;
    return { x, y };
  };

  const currentWell = wells.find((w) => w.is_current) || wells[0];
  const currentPos = project(currentWell.latitude, currentWell.longitude);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-[#4DA3FF]" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wide">
              Well Explorer & Spatial Intelligence
            </h1>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Geographic distribution of 15 historical offset wells in Upper Assam Basin relative to active borehole X01
          </p>
        </div>

        {/* Radius filter pills */}
        <div className="flex items-center space-x-2 bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.08]">
          <span className="text-xs font-mono text-[#8C9AB5] px-2">RADIUS:</span>
          {[5, 10, 15].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRadius(r)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedRadius === r
                  ? 'bg-[#4DA3FF] text-[#030817] font-bold shadow-glow-blue'
                  : 'text-[#8C9AB5] hover:text-white'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map (8 cols) + Selected Well Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map View */}
        <div className="lg:col-span-8 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-[#7CC4FF]" />
              <span className="text-xs font-mono text-white font-semibold">
                SECTOR IV BASIN MAP (27.47°N, 94.91°E)
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] font-mono">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF] shadow-glow-blue" />
                <span className="text-white font-bold">X01 Current</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7CC4FF]" />
                <span className="text-[#8C9AB5]">Offset Twin</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5D67]" />
                <span className="text-[#8C9AB5]">High-Risk</span>
              </span>
            </div>
          </div>

          {/* Dark Geological SVG Basin Map */}
          <div className="relative w-full h-[440px] bg-[#030817] rounded-2xl border border-white/[0.06] overflow-hidden">
            {/* Seismic grid texture */}
            <div className="absolute inset-0 seismic-grid opacity-25 pointer-events-none" />

            <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="radiusGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0.01" />
                </radialGradient>
              </defs>

              {/* Spatial Radius Range Ring */}
              <circle
                cx={currentPos.x}
                cy={currentPos.y}
                r={selectedRadius * 16}
                fill="url(#radiusGradient)"
                stroke="#4DA3FF"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.4"
              />

              {/* Connecting offset strike lines to Top Twins (X04, X07, X11) */}
              {filteredWells.map((w) => {
                if (w.is_current) return null;
                const pos = project(w.latitude, w.longitude);
                const isHighSim = (w.similarity_score ?? 0) >= 75;
                if (!isHighSim) return null;

                return (
                  <line
                    key={`line-${w.id}`}
                    x1={currentPos.x}
                    y1={currentPos.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="#4DA3FF"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    strokeOpacity="0.3"
                  />
                );
              })}

              {/* Offset Wells Markers */}
              {filteredWells.map((w) => {
                const pos = project(w.latitude, w.longitude);
                const isCur = w.is_current;
                const isTwinX04 = w.well_id === 'X04';
                const hasIncidents = w.historical_event_count > 1;

                if (isCur) {
                  return (
                    <g key={w.id} className="cursor-pointer" onClick={() => setActiveWellHover(w)}>
                      <circle cx={pos.x} cy={pos.y} r="18" fill="#4DA3FF" fillOpacity="0.2" className="animate-ping" />
                      <circle cx={pos.x} cy={pos.y} r="8" fill="#4DA3FF" stroke="#ffffff" strokeWidth="2.5" />
                      <text x={pos.x + 12} y={pos.y + 4} fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        X01 (ACTIVE)
                      </text>
                    </g>
                  );
                }

                return (
                  <g
                    key={w.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => {
                      setActiveWellHover(w);
                      onSelectWell(w.well_id);
                    }}
                    onMouseEnter={() => setActiveWellHover(w)}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isTwinX04 ? "7" : "5"}
                      fill={hasIncidents ? "#FF5D67" : "#7CC4FF"}
                      stroke="#030817"
                      strokeWidth="1.5"
                    />
                    <text
                      x={pos.x + 9}
                      y={pos.y + 3}
                      fill={isTwinX04 ? "#7CC4FF" : "#8C9AB5"}
                      fontSize={isTwinX04 ? "10" : "9"}
                      fontWeight={isTwinX04 ? "bold" : "normal"}
                      fontFamily="monospace"
                    >
                      {w.well_id} {isTwinX04 ? '(91%)' : ''}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#8C9AB5]">
            <span>Click any marker to inspect offset well telemetry and drilling logs</span>
            <span>Showing {filteredWells.length} wells within {selectedRadius}km</span>
          </div>
        </div>

        {/* Selected Well Inspector (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-5 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#4DA3FF]">WELL INSPECTOR</span>
              <span className="text-xs font-mono text-[#8C9AB5]">
                {activeWellHover ? activeWellHover.well_id : 'Select a Well'}
              </span>
            </div>

            {activeWellHover ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-display font-bold text-lg text-white">
                      {activeWellHover.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#8C9AB5] mt-1">{activeWellHover.field}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#030817] border border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8C9AB5]">Distance from X01:</span>
                    <span className="font-mono font-bold text-white">
                      {activeWellHover.distance_km ? `${activeWellHover.distance_km.toFixed(1)} km` : '0 km (Current)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C9AB5]">WellTwin Match:</span>
                    <span className="font-mono font-bold text-[#7CC4FF]">
                      {activeWellHover.similarity_score ? `${activeWellHover.similarity_score.toFixed(0)}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C9AB5]">Total Depth (TD):</span>
                    <span className="font-mono text-white">{activeWellHover.total_depth} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C9AB5]">Formation:</span>
                    <span className="text-white">{activeWellHover.formation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C9AB5]">Historical Incidents:</span>
                    <span className={`font-mono font-bold ${activeWellHover.historical_event_count > 0 ? 'text-[#FF5D67]' : 'text-[#42D6A4]'}`}>
                      {activeWellHover.historical_event_count} Events
                    </span>
                  </div>
                </div>

                {activeWellHover.well_id === 'X04' && (
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-[#F5F8FF]">
                    <span className="font-bold text-[#7CC4FF]">Primary Demonstration Twin:</span>
                    <p className="text-[#8C9AB5] mt-1">
                      X04 is the top behavioral match for X01. Encountered Mud Loss at 2850m and Stuck Pipe at 2910m.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center text-[#8C9AB5]">
                <MapPin className="w-8 h-8 text-white/20 mb-2" />
                <p className="text-xs">Hover or click on any well marker on the basin map to inspect details</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={() => onNavigate('/welltwin')}
              className="text-xs font-semibold text-[#4DA3FF] hover:text-[#7CC4FF] flex items-center space-x-1"
            >
              <span>Explore in WellTwin</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/time-machine')}
              className="text-xs text-[#8C9AB5] hover:text-white"
            >
              Time Machine Replay
            </button>
          </div>
        </div>
      </div>

      {/* Filterable Wells Table */}
      <div className="rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h3 className="font-display font-bold text-white text-base">Offset Wells Knowledge Repository</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#8C9AB5] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search wells, formation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#030817] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#8C9AB5] focus:outline-none focus:border-[#4DA3FF]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-[#8C9AB5] font-mono uppercase">
                <th className="pb-3 pl-2">Well ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Distance</th>
                <th className="pb-3">WellTwin Match</th>
                <th className="pb-3">Formation</th>
                <th className="pb-3">Total Depth</th>
                <th className="pb-3">Hazards</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredWells.map((w) => (
                <tr
                  key={w.id}
                  onClick={() => {
                    setActiveWellHover(w);
                    onSelectWell(w.well_id);
                  }}
                  className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="py-3 pl-2 font-mono font-bold text-white">
                    {w.well_id} {w.is_current ? '(Current)' : ''}
                  </td>
                  <td className="py-3 text-white">{w.name}</td>
                  <td className="py-3 font-mono text-[#8C9AB5]">
                    {w.distance_km ? `${w.distance_km.toFixed(1)} km` : '0 km'}
                  </td>
                  <td className="py-3 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      (w.similarity_score ?? 0) >= 85
                        ? 'bg-blue-500/20 text-[#7CC4FF]'
                        : (w.similarity_score ?? 0) >= 70
                        ? 'bg-emerald-500/20 text-[#42D6A4]'
                        : 'bg-white/[0.04] text-[#8C9AB5]'
                    }`}>
                      {w.similarity_score ? `${w.similarity_score.toFixed(0)}%` : '—'}
                    </span>
                  </td>
                  <td className="py-3 text-[#8C9AB5]">{w.formation}</td>
                  <td className="py-3 font-mono text-white">{w.total_depth} m</td>
                  <td className="py-3">
                    <span className={`text-[11px] font-mono ${w.historical_event_count > 0 ? 'text-[#FF5D67]' : 'text-[#8C9AB5]'}`}>
                      {w.historical_event_count} Incidents
                    </span>
                  </td>
                  <td className="py-3 pr-2 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('/welltwin');
                      }}
                      className="text-xs text-[#4DA3FF] hover:underline"
                    >
                      Compare
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
