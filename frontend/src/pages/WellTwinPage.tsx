import React, { useState } from 'react';
import {
  GitCompare, ArrowRight, CheckCircle2, AlertTriangle,
  Info, History, FileText, ChevronRight, Layers
} from 'lucide-react';
import { WellTwinResult } from '../types';

interface WellTwinPageProps {
  twins: WellTwinResult[];
  onNavigate: (route: string) => void;
}

export const WellTwinPage: React.FC<WellTwinPageProps> = ({
  twins,
  onNavigate
}) => {
  const [selectedTwinId, setSelectedTwinId] = useState<string>('X04');

  const selectedTwin = twins.find((t) => t.well_id === selectedTwinId) || twins[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <GitCompare className="w-6 h-6 text-[#4DA3FF]" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wide">
              WellTwin Finder Engine
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-blue-500/10 text-[#7CC4FF] border border-blue-500/20">
              Prototype Similarity Model
            </span>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Ranks historical offset wells by multi-factor behavioral similarity rather than simple geographic proximity
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#8C9AB5]">
          FORMULA: 25% Formation + 20% Depth + 20% Params + 15% Traj + 10% Events + 10% Spatial
        </div>
      </div>

      {/* Main Grid: Dominant Top Twin Feature (7 cols) + Ranked Twin Cards (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dominant Selected Twin Deep-Dive (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#4DA3FF] bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                BEHAVIORAL DIGITAL TWIN
              </span>
              <span className="text-xs font-mono text-[#8C9AB5]">Offset Distance: {selectedTwin.distance_km} km</span>
            </div>

            {/* Well Name & Dominant Match Score */}
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <h2 className="font-display text-3xl font-extrabold text-white">
                  Well {selectedTwin.well_id}
                </h2>
                <p className="text-xs text-[#8C9AB5] mt-0.5">{selectedTwin.name} • {selectedTwin.formation}</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-5xl font-black text-[#7CC4FF] glow-text-blue">
                  {selectedTwin.similarity.toFixed(0)}%
                </span>
                <div className="text-[10px] font-mono text-[#8C9AB5] uppercase">SIMILARITY MATCH</div>
              </div>
            </div>

            {/* Evidence Notes */}
            <p className="text-sm text-[#F5F8FF] leading-relaxed mb-6 font-medium">
              {selectedTwin.evidence_notes}
            </p>

            {/* 6 Multi-Factor Sliders / Bars */}
            <div className="p-5 rounded-2xl bg-[#030817] border border-white/[0.06] space-y-3.5 mb-6">
              <div className="text-xs font-mono uppercase tracking-wider text-[#8C9AB5] mb-1">
                Multi-Factor Similarity Breakdown
              </div>

              {[
                { label: 'Formation Lithology', val: selectedTwin.factors.formation, weight: '25%' },
                { label: 'Depth Interval Match', val: selectedTwin.factors.depth, weight: '20%' },
                { label: 'Drilling Telemetry Parameters', val: selectedTwin.factors.parameters, weight: '20%' },
                { label: 'Wellbore Trajectory Profile', val: selectedTwin.factors.trajectory, weight: '15%' },
                { label: 'Historical Event Correlation', val: selectedTwin.factors.events, weight: '10%' },
                { label: 'Geographic / Spatial Proximity', val: selectedTwin.factors.spatial, weight: '10%' },
              ].map((f, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">
                      {f.label} <span className="text-[10px] text-[#8C9AB5]">({f.weight})</span>
                    </span>
                    <span className="font-mono font-bold text-[#7CC4FF]">{f.val.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#4DA3FF] to-[#38BDF8] rounded-full"
                      style={{ width: `${f.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Documented Historical Hazards for this Twin */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#8C9AB5]">Documented Hazards on this Twin</span>
              <div className="flex flex-wrap gap-2">
                {selectedTwin.primary_risks.map((risk, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[#FF5D67]/15 text-[#FF5D67] border border-[#FF5D67]/30"
                  >
                    ⚠ {risk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between">
            <button
              onClick={() => onNavigate('/time-machine')}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#4DA3FF] text-[#030817] hover:bg-[#7CC4FF] transition-all shadow-glow-blue"
            >
              <History className="w-3.5 h-3.5" />
              <span>Replay in Time Machine</span>
            </button>

            <button
              onClick={() => onNavigate('/graph')}
              className="text-xs font-semibold text-[#8C9AB5] hover:text-white flex items-center space-x-1"
            >
              <span>View Incident Graph</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ranked Twin List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-white text-base">Ranked Offset Candidates</h3>
            <span className="text-xs text-[#8C9AB5]">Current Reference: Well X01</span>
          </div>

          <div className="space-y-3">
            {twins.map((twin) => {
              const isSelected = twin.well_id === selectedTwinId;
              return (
                <div
                  key={twin.well_id}
                  onClick={() => setSelectedTwinId(twin.well_id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-500/10 border-[#4DA3FF] shadow-glow-blue'
                      : 'bg-[#071226]/80 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-display font-bold text-white text-base">Well {twin.well_id}</span>
                        <span className="text-xs font-mono text-[#8C9AB5]">{twin.distance_km} km offset</span>
                      </div>
                      <div className="text-xs text-[#8C9AB5] mt-0.5">{twin.formation}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-mono text-2xl font-black ${isSelected ? 'text-[#7CC4FF]' : 'text-white'}`}>
                        {twin.similarity.toFixed(0)}%
                      </div>
                      <div className="text-[9px] uppercase font-mono text-[#8C9AB5]">MATCH</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono mt-3 pt-3 border-t border-white/[0.06]">
                    <div>
                      <span className="text-[#8C9AB5]">Lithology: </span>
                      <span className="text-white">{twin.factors.formation}%</span>
                    </div>
                    <div>
                      <span className="text-[#8C9AB5]">Depth: </span>
                      <span className="text-white">{twin.factors.depth}%</span>
                    </div>
                    <div>
                      <span className="text-[#8C9AB5]">Events: </span>
                      <span className="text-[#FF5D67]">{twin.events_count} Incidents</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
