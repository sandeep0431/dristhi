import React, { useState, useEffect } from 'react';
import {
  Activity, AlertTriangle, ShieldAlert, Play, Pause,
  RotateCcw, ChevronRight, FileText, CheckCircle2,
  TrendingDown, Gauge, Zap
} from 'lucide-react';
import { SimulationState, IncidentEvent } from '../types';

interface LiveMonitorPageProps {
  state: SimulationState;
  onNavigate: (route: string) => void;
  onScenarioChange: (scenario: 'normal' | 'torque_anomaly' | 'risk_zone' | 'combined') => void;
  onDepthChange: (depth: number) => void;
}

export const LiveMonitorPage: React.FC<LiveMonitorPageProps> = ({
  state,
  onNavigate,
  onScenarioChange,
  onDepthChange
}) => {
  const telemetry = state.telemetry;
  const anomaly = state.anomaly;
  const horizon = state.risk_horizon;
  const isAnomaly = anomaly.is_anomaly;

  // History buffer for sparkline charts
  const [history, setHistory] = useState<Array<{ depth: number; torque: number; rop: number; pressure: number }>>([]);

  useEffect(() => {
    setHistory((prev) => {
      const next = [...prev, {
        depth: telemetry.depth,
        torque: telemetry.torque,
        rop: telemetry.rop,
        pressure: telemetry.pressure
      }];
      if (next.length > 20) return next.slice(next.length - 20);
      return next;
    });
  }, [telemetry.depth, telemetry.torque]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Live Status Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#42D6A4] animate-ping" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wide">
              Live Well Telemetry Monitor
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-blue-500/10 text-[#7CC4FF] border border-blue-500/20">
              WELL X01 • STREAM ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Simulated high-frequency downhole sensor telemetry stream • Updated every 1.5s
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#8C9AB5]">Active Scenario:</span>
          <span className="text-xs font-mono font-bold text-white uppercase px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10">
            {state.scenario.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Anomaly Explainable Alert Banner (if anomaly triggered) */}
      {isAnomaly && (
        <div className="rounded-2xl bg-[#FF5D67]/10 border border-[#FF5D67]/40 p-5 shadow-glow-danger animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF5D67]/20 border border-[#FF5D67]/40 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#FF5D67]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-display font-bold text-base text-white">
                    Explainable Hazard Alert: {anomaly.status.replace('_', ' ')}
                  </h3>
                  <span className="text-xs font-mono bg-[#FF5D67]/20 text-[#FF5D67] px-2 py-0.5 rounded">
                    Confidence: {anomaly.confidence.toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs text-[#F5F8FF] mt-1 space-y-0.5">
                  {anomaly.explanations.map((exp, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5D67]" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => onNavigate('/assistant')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#4DA3FF] text-[#030817] hover:bg-[#7CC4FF] transition-all shadow-glow-blue"
              >
                Ask AI Assistant
              </button>
              <button
                onClick={() => onNavigate('/welltwin')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white/[0.06] text-white hover:bg-white/10 border border-white/10"
              >
                Inspect WellTwin X04
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Telemetry Gauge Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gauge 1: Torque */}
        <div className={`p-5 rounded-2xl bg-[#071226]/80 border transition-all ${
          telemetry.torque > 48 ? 'border-[#FF5D67] shadow-glow-danger' : 'border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between text-xs text-[#8C9AB5] mb-2 font-mono">
            <span>ROTARY TORQUE</span>
            <span>LIMIT: 65 kN·m</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-3xl font-extrabold text-white">{telemetry.torque.toFixed(1)}</span>
            <span className="text-xs text-[#8C9AB5]">kN·m</span>
          </div>
          <div className="mt-3 h-2 w-full bg-[#030817] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                telemetry.torque > 55 ? 'bg-[#FF5D67]' : telemetry.torque > 45 ? 'bg-[#F5B942]' : 'bg-[#42D6A4]'
              }`}
              style={{ width: `${Math.min(100, (telemetry.torque / 75) * 100)}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-[#8C9AB5] flex justify-between">
            <span>Baseline: 42.5 kN·m</span>
            <span className={telemetry.torque > 48 ? 'text-[#FF5D67] font-bold' : 'text-[#42D6A4]'}>
              {telemetry.torque > 48 ? `+${(((telemetry.torque - 42.5) / 42.5) * 100).toFixed(0)}% DELTA` : 'NOMINAL'}
            </span>
          </div>
        </div>

        {/* Gauge 2: ROP */}
        <div className={`p-5 rounded-2xl bg-[#071226]/80 border transition-all ${
          telemetry.rop < 14 ? 'border-[#F5B942] shadow-glow-warning' : 'border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between text-xs text-[#8C9AB5] mb-2 font-mono">
            <span>RATE OF PENETRATION</span>
            <span>EXP: 18 m/hr</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-3xl font-extrabold text-white">{telemetry.rop.toFixed(1)}</span>
            <span className="text-xs text-[#8C9AB5]">m/hr</span>
          </div>
          <div className="mt-3 h-2 w-full bg-[#030817] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4DA3FF] to-[#38BDF8] transition-all duration-300"
              style={{ width: `${Math.min(100, (telemetry.rop / 25) * 100)}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-[#8C9AB5] flex justify-between">
            <span>Status:</span>
            <span className={telemetry.rop < 14 ? 'text-[#F5B942] font-bold' : 'text-[#42D6A4]'}>
              {telemetry.rop < 14 ? 'DRILL-OFF RESTRICTION' : 'STABLE DRILLING'}
            </span>
          </div>
        </div>

        {/* Gauge 3: Standpipe Pressure */}
        <div className={`p-5 rounded-2xl bg-[#071226]/80 border transition-all ${
          telemetry.pressure < 3100 || telemetry.pressure > 3350 ? 'border-[#FF5D67]' : 'border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between text-xs text-[#8C9AB5] mb-2 font-mono">
            <span>STANDPIPE PRESSURE</span>
            <span>HYDRAULICS</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-3xl font-extrabold text-white">{telemetry.pressure.toFixed(0)}</span>
            <span className="text-xs text-[#8C9AB5]">psi</span>
          </div>
          <div className="mt-3 h-2 w-full bg-[#030817] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#38BDF8] transition-all duration-300"
              style={{ width: `${Math.min(100, (telemetry.pressure / 4000) * 100)}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-[#8C9AB5] flex justify-between">
            <span>Target: 3,210 psi</span>
            <span className={telemetry.pressure < 3100 ? 'text-[#FF5D67] font-bold' : 'text-white'}>
              {telemetry.pressure < 3100 ? 'CIRCULATION LOSS' : 'NORMAL'}
            </span>
          </div>
        </div>

        {/* Gauge 4: Current Depth & Horizon */}
        <div className="p-5 rounded-2xl bg-[#071226]/80 border border-white/[0.08]">
          <div className="flex items-center justify-between text-xs text-[#8C9AB5] mb-2 font-mono">
            <span>BIT POSITION</span>
            <span>NEXT RISK: 2,850m</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-3xl font-extrabold text-[#7CC4FF]">{telemetry.depth.toFixed(1)}</span>
            <span className="text-xs text-[#8C9AB5]">m MD</span>
          </div>
          <div className="mt-3 h-2 w-full bg-[#030817] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#42D6A4] via-[#F5B942] to-[#FF5D67]"
              style={{ width: `${Math.min(100, Math.max(0, ((telemetry.depth - 2800) / 110) * 100))}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-[#8C9AB5] flex justify-between">
            <span>Delta to hazard:</span>
            <span className="text-[#FF5D67] font-bold font-mono">
              {Math.max(0, 2850 - telemetry.depth).toFixed(1)} m
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section: Real-time Telemetry Trend Graph & Ground-Truth Evidence Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Trend Graph (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Real-Time Drilling Dynamics (Torque vs ROP)
              </h3>
              <p className="text-xs text-[#8C9AB5]">Rolling 20-step telemetry memory window</p>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF]" />
                <span className="text-[#8C9AB5]">Torque</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#42D6A4]" />
                <span className="text-[#8C9AB5]">ROP</span>
              </div>
            </div>
          </div>

          {/* SVG Sparkline Graph */}
          <div className="h-60 w-full bg-[#030817] rounded-2xl p-4 border border-white/[0.04] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 seismic-grid opacity-15 pointer-events-none" />

            {/* SVG Path rendering */}
            <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
              {/* Torque Curve (Blue) */}
              <polyline
                fill="none"
                stroke="#4DA3FF"
                strokeWidth="2.5"
                points={history
                  .map((pt, i) => {
                    const x = (i / Math.max(1, history.length - 1)) * 400;
                    // Map torque 35-75 to y 110-10
                    const y = 110 - ((pt.torque - 35) / 40) * 100;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />

              {/* ROP Curve (Green) */}
              <polyline
                fill="none"
                stroke="#42D6A4"
                strokeWidth="2"
                strokeDasharray="4 2"
                points={history
                  .map((pt, i) => {
                    const x = (i / Math.max(1, history.length - 1)) * 400;
                    // Map rop 0-25 to y 110-10
                    const y = 110 - (pt.rop / 25) * 100;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
            </svg>

            <div className="flex justify-between text-[10px] font-mono text-[#8C9AB5] border-t border-white/[0.08] pt-2">
              <span>T - 20 Steps</span>
              <span>T - 10 Steps</span>
              <span className="text-[#7CC4FF] font-bold">Live Bit (Depth: {telemetry.depth.toFixed(1)}m)</span>
            </div>
          </div>
        </div>

        {/* Right: Explainable Evidence Card (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-5 h-5 text-[#4DA3FF]" />
              <h3 className="font-display font-bold text-white text-base">
                Ground-Truth Evidence Engine
              </h3>
            </div>
            <p className="text-xs text-[#8C9AB5] leading-relaxed mb-4">
              DRISHTI links every anomaly directly to historical offset well records to verify if current behavior has historical precedent.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#030817] border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-white">Well X04 (Offset 4.2 km)</span>
                  <span className="text-[10px] font-mono text-[#4DA3FF] bg-blue-500/10 px-1.5 py-0.5 rounded">91% WellTwin</span>
                </div>
                <p className="text-xs text-[#8C9AB5]">
                  At 2850m, experienced severe Mud Loss (45 bbl/hr) followed by torque spike at 2870m and Differential Sticking at 2910m.
                </p>
                <div className="text-[10px] font-mono text-[#7CC4FF] mt-2">
                  Source: Daily Drilling Report #42 — Page 87
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#030817] border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-white">Well X07 (Offset 6.8 km)</span>
                  <span className="text-[10px] font-mono text-[#4DA3FF] bg-blue-500/10 px-1.5 py-0.5 rounded">84% WellTwin</span>
                </div>
                <p className="text-xs text-[#8C9AB5]">
                  Seepage loss at 2865m followed by 65 klbf overpull tight hole at 2900m during wiper trip.
                </p>
                <div className="text-[10px] font-mono text-[#7CC4FF] mt-2">
                  Source: Daily Drilling Report #38 — Page 54
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={() => onNavigate('/time-machine')}
              className="text-xs font-semibold text-[#4DA3FF] hover:text-[#7CC4FF] flex items-center space-x-1"
            >
              <span>Replay X04 in Time Machine</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/assistant')}
              className="text-xs text-[#8C9AB5] hover:text-white"
            >
              Consult Copilot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
