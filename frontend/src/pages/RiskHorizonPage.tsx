import React, { useState } from 'react';
import {
  TrendingDown, AlertTriangle, ChevronRight, HelpCircle,
  ShieldCheck, FileText, CheckCircle2, History, Compass
} from 'lucide-react';
import { SimulationState, IncidentEvent } from '../types';

interface RiskHorizonPageProps {
  state: SimulationState;
  onNavigate: (route: string) => void;
  onDepthChange: (depth: number) => void;
}

export const RiskHorizonPage: React.FC<RiskHorizonPageProps> = ({
  state,
  onNavigate,
  onDepthChange
}) => {
  const [showWhyModal, setShowWhyModal] = useState<boolean>(true);
  const horizon = state.risk_horizon;
  const currentDepth = state.depth;
  const isInside = horizon.is_inside_zone;
  const dist = horizon.distance_to_risk;

  // Horizon depth markers for visualization
  const depthMarkers = [
    { depth: 2800, label: 'Nominal Baseline Start', type: 'base' },
    { depth: 2850, label: 'Thief Sand Face • MUD LOSS (X04)', type: 'hazard', severity: 'HIGH', npt: '4.0h', ref: 'X04 p.87' },
    { depth: 2865, label: 'Micro-fractures • SEEPAGE (X07)', type: 'hazard', severity: 'MODERATE', npt: '2.5h', ref: 'X07 p.54' },
    { depth: 2870, label: 'Torsional Resonance • HIGH TORQUE (X11)', type: 'hazard', severity: 'HIGH', npt: '3.0h', ref: 'X11 p.41' },
    { depth: 2900, label: 'Sand-Shale Boundary • TIGHT HOLE (X07)', type: 'hazard', severity: 'HIGH', npt: '4.0h', ref: 'X07 p.58' },
    { depth: 2910, label: 'Depleted Sand Contact • STUCK PIPE (X04)', type: 'hazard', severity: 'CRITICAL', npt: '6.5h', ref: 'X04 p.92' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingDown className={`w-6 h-6 ${isInside ? 'text-[#FF5D67]' : 'text-[#F5B942]'}`} />
            <h1 className="font-display text-2xl font-bold text-white tracking-wide">
              Adaptive Risk Horizon
            </h1>
            <span className={`text-xs font-mono uppercase px-2.5 py-0.5 rounded font-bold ${
              isInside ? 'bg-[#FF5D67]/20 text-[#FF5D67]' : 'bg-[#F5B942]/20 text-[#F5B942]'
            }`}>
              {horizon.risk_level} ALERT
            </span>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Dynamic look-ahead prediction calculated from offset event frequency, depth distance, and WellTwin correlations
          </p>
        </div>

        <button
          onClick={() => setShowWhyModal(!showWhyModal)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#4DA3FF]/20 text-[#7CC4FF] border border-[#4DA3FF]/30 hover:border-[#4DA3FF] transition-all shadow-glow-blue"
        >
          <HelpCircle className="w-4 h-4 text-[#4DA3FF]" />
          <span>{showWhyModal ? 'Hide Evidence "Why?"' : 'Why was this alert raised?'}</span>
        </button>
      </div>

      {/* Main Stratigraphic Depth Column & Horizon Visualization */}
      <div className="rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-xs font-mono text-[#8C9AB5] uppercase">FORMATION STRATIGRAPHY</span>
            <h3 className="font-display font-bold text-white text-lg">
              Barail Sandstone (Upper Member) • 2,800m – 2,950m
            </h3>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#8C9AB5]">Distance to first hazard:</div>
            <div className="font-mono text-2xl font-black text-[#7CC4FF] glow-text-blue">
              {dist.toFixed(1)} m
            </div>
          </div>
        </div>

        {/* Vertical Depth Trajectory with glowing Bit indicator */}
        <div className="relative py-8 pl-8 pr-4">
          {/* Stratigraphic Track Background */}
          <div className="absolute left-14 top-4 bottom-4 w-3 bg-gradient-to-b from-blue-900/30 via-amber-900/30 to-red-900/40 rounded-full border border-white/[0.06]" />

          {/* Current Bit Marker (Dynamically Positioned) */}
          <div
            className="absolute left-11 z-30 transition-all duration-500 flex items-center"
            style={{
              top: `${Math.min(92, Math.max(4, ((currentDepth - 2790) / 140) * 100))}%`
            }}
          >
            <div className="w-9 h-9 rounded-full bg-[#4DA3FF] border-2 border-white shadow-glow-cyan flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 rounded-full bg-[#030817]" />
            </div>
            <div className="ml-4 px-3 py-1.5 rounded-xl bg-[#030817] border border-[#4DA3FF] shadow-2xl flex items-center space-x-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#4DA3FF] animate-ping" />
              <span className="font-mono text-xs font-bold text-white">LIVE BIT: {currentDepth.toFixed(1)} m</span>
              <span className="text-[10px] text-[#7CC4FF] uppercase font-mono">
                {isInside ? '● INSIDE RISK ZONE' : `● ${dist.toFixed(0)}m TO RISK`}
              </span>
            </div>
          </div>

          {/* Depth Milestones and Historical Hazard Nodes */}
          <div className="space-y-8 relative z-10 pl-16">
            {depthMarkers.map((m, idx) => {
              const isPast = currentDepth >= m.depth;
              const isNear = Math.abs(currentDepth - m.depth) < 15;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isNear
                      ? 'bg-amber-500/15 border-[#F5B942] shadow-glow-warning'
                      : isPast
                      ? 'bg-white/[0.02] border-white/[0.06] opacity-60'
                      : 'bg-[#030817]/90 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="font-mono text-base font-bold text-[#7CC4FF] w-20 shrink-0">
                        {m.depth} m
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-white text-sm">
                          {m.label}
                        </h4>
                        {m.ref && (
                          <div className="text-[11px] font-mono text-[#8C9AB5] mt-0.5">
                            Corroborating Source: <span className="text-[#4DA3FF]">{m.ref}</span> • NPT: <span className="text-[#FF5D67]">{m.npt}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {m.severity && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 ${
                        m.severity === 'CRITICAL'
                          ? 'bg-[#FF5D67]/20 text-[#FF5D67] border border-[#FF5D67]/40'
                          : 'bg-[#F5B942]/20 text-[#F5B942] border border-[#F5B942]/40'
                      }`}>
                        {m.severity}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Depth Scrubber Inside Horizon View */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8C9AB5]">
            Drag slider to test how the Adaptive Risk Horizon responds as the drill-bit deepens:
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-80">
            <span className="text-xs font-mono text-[#8C9AB5]">2800m</span>
            <input
              type="range"
              min="2800"
              max="2930"
              step="1"
              value={currentDepth}
              onChange={(e) => onDepthChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#030817] rounded-lg appearance-none cursor-pointer accent-[#4DA3FF]"
            />
            <span className="text-xs font-mono font-bold text-[#7CC4FF] w-16 text-right">
              {currentDepth.toFixed(0)}m
            </span>
          </div>
        </div>
      </div>

      {/* "Why was this alert raised?" Explainability Drawer */}
      {showWhyModal && (
        <div className="rounded-3xl bg-[#071226]/90 border border-[#4DA3FF]/40 p-6 backdrop-blur-xl shadow-glow-blue animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-[#4DA3FF]" />
              <h3 className="font-display font-bold text-white text-base">
                Explainability Dossier: Why was this risk alert raised?
              </h3>
            </div>
            <span className="text-xs font-mono text-[#42D6A4] bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              Confidence: 95.5% (High Reliability)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-[#030817] border border-white/[0.06]">
              <div className="text-xs font-mono text-[#8C9AB5] mb-1">1. OFFSET PRECEDENT</div>
              <div className="font-bold text-white text-sm">3 Correlated Offset Wells</div>
              <p className="text-xs text-[#8C9AB5] mt-1">Wells X04, X07, and X11 logged severe non-productive incidents in this exact stratum.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#030817] border border-white/[0.06]">
              <div className="text-xs font-mono text-[#8C9AB5] mb-1">2. FORMATION MATCH</div>
              <div className="font-bold text-white text-sm">Barail Sandstone (Upper)</div>
              <p className="text-xs text-[#8C9AB5] mt-1">High-permeability, fractured sandstone prone to thief-zone losses and differential sticking.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#030817] border border-white/[0.06]">
              <div className="text-xs font-mono text-[#8C9AB5] mb-1">3. PHYSICAL TELEMETRY</div>
              <div className="font-bold text-white text-sm">Active Torque Rise (+31%)</div>
              <p className="text-xs text-[#8C9AB5] mt-1">Real-time parameters mirror the pre-stuck signature documented on Well X04 at 2870m.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#030817] border border-white/[0.06]">
              <div className="text-xs font-mono text-[#8C9AB5] mb-1">4. COST OF INACTION</div>
              <div className="font-bold text-[#FF5D67] text-sm">15.7 Hours Total NPT</div>
              <p className="text-xs text-[#8C9AB5] mt-1">Historical rig downtime cost offset operators an estimated $196,000 USD in this 60m interval.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <div className="text-xs text-[#8C9AB5]">
              Document Evidence: <strong className="text-white">X04_Drilling_Report.pdf (p.87, p.92)</strong> & <strong className="text-white">X07_Drilling_Report.pdf (p.54)</strong>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onNavigate('/assistant')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#4DA3FF] text-[#030817] hover:bg-[#7CC4FF]"
              >
                Ask Copilot for Mitigation Plan
              </button>
              <button
                onClick={() => onNavigate('/safety')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white/[0.05] text-white hover:bg-white/10"
              >
                Review OISD Standards
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
