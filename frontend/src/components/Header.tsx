import React from 'react';
import { Compass, Play, RotateCcw, Home, ArrowLeft } from 'lucide-react';
import { SimulationState } from '../types';

interface HeaderProps {
  simulationState: SimulationState;
  onOpenTour: () => void;
  onReset: () => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  simulationState,
  onOpenTour,
  onReset,
  currentRoute,
  onNavigate
}) => {
  const isAnomaly = simulationState.anomaly.is_anomaly;
  const isCritical = simulationState.risk_horizon.risk_level === 'CRITICAL';

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#030817]/95 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-6 flex items-center justify-between">
      {/* Brand Identity / Return to Home */}
      <div
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={() => onNavigate('/')}
        title="Click to return to DRISHTI Landing Page"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#7CC4FF] p-[1.5px] flex items-center justify-center shadow-glow-blue group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#030817] rounded-[10px] flex items-center justify-center">
            <Compass className="w-5 h-5 text-[#4DA3FF] animate-pulse-slow" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-[#7CC4FF] transition-colors">
              DRISHTI<span className="text-[#4DA3FF]">-NWIS</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-[#7CC4FF] border border-blue-500/20">
              SIH 2026
            </span>
          </div>
          <p className="text-[11px] text-[#8C9AB5] hidden md:block leading-none">
            Nearby Wells Intelligence & Decision Support
          </p>
        </div>
      </div>

      {/* Active Well Status Bar */}
      <div className="hidden lg:flex items-center space-x-3 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex items-center space-x-2 border-r border-white/10 pr-3">
          <span className="w-2 h-2 rounded-full bg-[#42D6A4] animate-ping" />
          <span className="text-xs font-mono font-medium text-white">WELL X01</span>
          <span className="text-[11px] text-[#8C9AB5]">(Active Borehole)</span>
        </div>
        <div className="flex items-center space-x-2 border-r border-white/10 pr-3">
          <span className="text-[11px] text-[#8C9AB5]">DEPTH:</span>
          <span className="font-mono text-xs font-bold text-[#7CC4FF]">{simulationState.depth.toFixed(1)} m</span>
        </div>
        <div className="flex items-center space-x-2 border-r border-white/10 pr-3">
          <span className="text-[11px] text-[#8C9AB5]">FORMATION:</span>
          <span className="text-xs text-white">Barail Sandstone (Upper)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="text-[11px] text-[#8C9AB5]">RISK:</span>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            isCritical
              ? 'bg-[#FF5D67]/20 text-[#FF5D67] border border-[#FF5D67]/40 shadow-glow-danger'
              : isAnomaly || simulationState.risk_horizon.risk_level === 'HIGH'
              ? 'bg-[#F5B942]/20 text-[#F5B942] border border-[#F5B942]/40 shadow-glow-warning'
              : 'bg-[#42D6A4]/20 text-[#42D6A4] border border-[#42D6A4]/40'
          }`}>
            {simulationState.risk_horizon.risk_level}
          </span>
        </div>
      </div>

      {/* Action Buttons & Explicit Return to Landing Button */}
      <div className="flex items-center space-x-2.5">
        {/* Prominent Return to Landing Button */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-[#4DA3FF]/20 text-white hover:text-[#7CC4FF] border border-white/15 hover:border-[#4DA3FF]/40 transition-all shadow-sm cursor-pointer"
          title="Return to DRISHTI Landing Page"
        >
          <Home className="w-3.5 h-3.5 text-[#4DA3FF]" />
          <span>Landing Page</span>
        </button>

        <button
          onClick={onOpenTour}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-[#4DA3FF]/20 to-[#38BDF8]/20 text-[#7CC4FF] border border-[#4DA3FF]/30 hover:border-[#4DA3FF] transition-all shadow-glow-blue cursor-pointer"
          title="Step-by-step SIH Judge Presentation Guide"
        >
          <Play className="w-3.5 h-3.5 text-[#4DA3FF]" />
          <span className="font-semibold hidden sm:inline">SIH Demo Script</span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white/[0.04] text-[#8C9AB5] hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          title="Reset Simulation to Initial State (2800m Normal)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </header>
  );
};
