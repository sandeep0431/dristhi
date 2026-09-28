import React from 'react';
import {
  Activity, AlertTriangle, ArrowRight, ShieldCheck,
  TrendingDown, Compass, GitCompare, Gauge,
  Clock, Zap, CheckCircle2, ChevronRight
} from 'lucide-react';
import { SimulationState, Well, Formation } from '../types';

interface DashboardPageProps {
  state: SimulationState;
  wells: Well[];
  formations: Formation[];
  onNavigate: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  state,
  wells,
  formations,
  onNavigate
}) => {
  const telemetry = state.telemetry;
  const anomaly = state.anomaly;
  const horizon = state.risk_horizon;
  const isAnomaly = anomaly.is_anomaly;
  const isCritical = horizon.risk_level === 'CRITICAL';

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Active Well Header Banner */}
      <div className="rounded-2xl bg-[#071226]/80 border border-white/[0.08] p-5 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#42D6A4] animate-pulse" />
            <h1 className="font-display text-xl font-bold text-white tracking-wide">
              Operations Overview • Well X01
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-[#7CC4FF] border border-blue-500/20">
              8-1/2" Production Hole
            </span>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Upper Assam Basin — Barail Trend | Spud Depth: 0m | Target TD: 3,450m | Operator: Demo (Simulated)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-right">
            <div className="text-[10px] text-[#8C9AB5] uppercase font-mono">FORMATION</div>
            <div className="text-xs font-bold text-white">Barail Sandstone (Upper)</div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-right">
            <div className="text-[10px] text-[#8C9AB5] uppercase font-mono">SIMULATION STATUS</div>
            <div className="text-xs font-bold text-[#42D6A4] uppercase font-mono">
              {state.scenario.replace('_', ' ')}
            </div>
          </div>
        </div>
      </div>

      {/* Main 8 Telemetry Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* Depth */}
        <div className="p-3.5 rounded-2xl bg-[#071226]/60 border border-white/[0.08] hover:border-[#4DA3FF]/40 transition-all">
          <div className="text-[10px] font-mono text-[#8C9AB5] uppercase">DEPTH</div>
          <div className="font-mono text-xl font-bold text-white mt-1">{telemetry.depth.toFixed(1)}</div>
          <div className="text-[10px] text-[#7CC4FF] mt-0.5">m MD (+12 m/hr)</div>
        </div>

        {/* Torque */}
        <div className={`p-3.5 rounded-2xl bg-[#071226]/60 border transition-all ${
          anomaly.features_flagged.includes('torque')
            ? 'border-[#FF5D67] bg-[#FF5D67]/10 shadow-glow-danger'
            : 'border-white/[0.08] hover:border-[#4DA3FF]/40'
        }`}>
          <div className="text-[10px] font-mono text-[#8C9AB5] uppercase flex justify-between items-center">
            <span>TORQUE</span>
            {anomaly.features_flagged.includes('torque') && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5D67] animate-ping" />
            )}
          </div>
          <div className={`font-mono text-xl font-bold mt-1 ${
            anomaly.features_flagged.includes('torque') ? 'text-[#FF5D67]' : 'text-white'
          }`}>
            {telemetry.torque.toFixed(1)}
          </div>
          <div className="text-[10px] text-[#8C9AB5] mt-0.5">kN·m (Norm: 42.5)</div>
        </div>

        {/* ROP */}
        <div className={`p-3.5 rounded-2xl bg-[#071226]/60 border transition-all ${
          anomaly.features_flagged.includes('rop')
            ? 'border-[#F5B942] bg-[#F5B942]/10 shadow-glow-warning'
            : 'border-white/[0.08] hover:border-[#4DA3FF]/40'
        }`}>
          <div className="text-[10px] font-mono text-[#8C9AB5] uppercase">ROP</div>
          <div className={`font-mono text-xl font-bold mt-1 ${
            anomaly.features_flagged.includes('rop') ? 'text-[#F5B942]' : 'text-white'
          }`}>
            {telemetry.rop.toFixed(1)}
          </div>
          <div className="text-[10px] text-[#8C9AB5] mt-0.5">m/hr</div>
        </div>

        {/* WOB */}
        <div className="p-3.5 rounded-2xl bg-[#071226]/60 border border-white/[0.08] hover:border-[#4DA3FF]/40 transition-all">
          <div className="text-[10px] font-mono text-[#8C9AB5] uppercase">WOB</div>
          <div className="font-mono text-xl font-bold text-white mt-1">{telemetry.wob.toFixed(1)}</div>
          <div className="text-[10px] text-[#8C9AB5] mt-0.5">klbf (14.2)</div>
        </div>

        {/* RPM */}
        <div className="p-3.5 rounded-2xl bg-[#071226]/60 border border-white/[0.08] hover:border-[#4DA3FF]/40 transition-all">
          <div className="text-[10px] font-mono text-[#8C9AB5] uppercase">RPM</div>
          <div className="font-mono text-xl font-bold text-white mt-1">{telemetry.rpm.toFixed(0)}</div>
          <div className="text-[10px] text-[#8C9AB5] mt-0.5">rotary rpm</div>
        </div>

        {/* Mud Weight */}
        <div className="p-3.5 rounded-2xl bg-[#071226]/60 border border-white/[0.08] hover:border-[#4DA3FF]/40 transition-all">
          <div className="text-[10px] font-mono text-[#8C9AB5] uppercase">MUD WT</div>
          <div className="font-mono text-xl font-bold text-white mt-1">{telemetry.mud_weight.toFixed(2)}</div>
          <div className="text-[10px] text-[#8C9AB5] mt-0.5">SG (KCL-Poly)</div>
        </div>

        {/* Standpipe Pressure */}
        <div className={`p-3.5 rounded-2xl bg-[#071226]/60 border transition-all ${
          anomaly.features_flagged.includes('pressure')
            ? 'border-[#FF5D67] bg-[#FF5D67]/10'
            : 'border-white/[0.08] hover:border-[#4DA3FF]/40'
        }`}>
          <div className="text-[10px] font-mono text-[#8C9AB5] uppercase">PRESSURE</div>
          <div className={`font-mono text-xl font-bold mt-1 ${
            anomaly.features_flagged.includes('pressure') ? 'text-[#FF5D67]' : 'text-white'
          }`}>
            {telemetry.pressure.toFixed(0)}
          </div>
          <div className="text-[10px] text-[#8C9AB5] mt-0.5">psi (SPP)</div>
        </div>

        {/* Flow Rate */}
        <div className="p-3.5 rounded-2xl bg-[#071226]/60 border border-white/[0.08] hover:border-[#4DA3FF]/40 transition-all">
          <div className="text-[10px] font-mono text-[#8C9AB5] uppercase">FLOW</div>
          <div className="font-mono text-xl font-bold text-white mt-1">{telemetry.flow_rate.toFixed(0)}</div>
          <div className="text-[10px] text-[#8C9AB5] mt-0.5">L/min</div>
        </div>
      </div>

      {/* Main Mid Section: Large Feature Risk Card + Anomaly Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Feature Risk Card (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className={`w-5 h-5 ${isCritical ? 'text-[#FF5D67]' : 'text-[#F5B942]'}`} />
                <span className="text-xs font-mono uppercase tracking-wider text-[#8C9AB5]">
                  ADAPTIVE RISK HORIZON ALERT
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase ${
                isCritical
                  ? 'bg-[#FF5D67]/20 text-[#FF5D67] border border-[#FF5D67]/40 shadow-glow-danger animate-pulse'
                  : horizon.risk_level === 'HIGH' || isAnomaly
                  ? 'bg-[#F5B942]/20 text-[#F5B942] border border-[#F5B942]/40 shadow-glow-warning'
                  : 'bg-[#42D6A4]/20 text-[#42D6A4] border border-[#42D6A4]/40'
              }`}>
                {horizon.risk_level} RISK
              </span>
            </div>

            <div className="flex items-baseline space-x-3 mb-2">
              <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white">
                2,850 — 2,910 m
              </h2>
              <span className="text-xs text-[#8C9AB5]">Upcoming Risk Interval</span>
            </div>

            <p className="text-sm text-[#F5F8FF] leading-relaxed mb-6 font-medium">
              {horizon.summary}
            </p>

            {/* Depth Progress to Risk Gauge */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-[#8C9AB5]">Current Bit: {telemetry.depth.toFixed(1)}m</span>
                <span className="text-[#7CC4FF]">Thief Zone Target: 2,850m</span>
              </div>
              <div className="h-2 w-full bg-[#030817] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#4DA3FF] via-[#F5B942] to-[#FF5D67] transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(5, ((telemetry.depth - 2800) / 110) * 100))}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#8C9AB5] mt-2">
                <span>Distance to risk: <strong className="text-white font-mono">{horizon.distance_to_risk.toFixed(1)} m</strong></span>
                <span>Contributing Wells: <strong className="text-[#7CC4FF] font-mono">X04, X07, X11</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <div className="text-xs text-[#8C9AB5]">
              Ground-Truth Corroboration: <span className="text-white font-semibold">3 Historical DDR Incidents</span>
            </div>
            <button
              onClick={() => onNavigate('/risk')}
              className="flex items-center space-x-1 text-xs font-semibold text-[#4DA3FF] hover:text-[#7CC4FF] transition-colors"
            >
              <span>Explore Horizon</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Anomaly & Physical Signatures Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-[#4DA3FF]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#8C9AB5]">
                  ISOLATION FOREST ANOMALY STATUS
                </span>
              </div>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                isAnomaly ? 'bg-[#FF5D67]/20 text-[#FF5D67] font-bold' : 'bg-[#42D6A4]/20 text-[#42D6A4]'
              }`}>
                {anomaly.status}
              </span>
            </div>

            <h3 className="font-display text-lg font-bold text-white mb-2">
              Physical Telemetry Diagnosis
            </h3>

            <div className="space-y-2 mb-4">
              {anomaly.explanations.map((exp, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#F5F8FF] flex items-start space-x-2">
                  <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${isAnomaly ? 'bg-[#FF5D67]' : 'bg-[#42D6A4]'}`} />
                  <span className="leading-relaxed">{exp}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#030817] border border-white/[0.06] text-xs">
              <div>
                <span className="text-[#8C9AB5]">Confidence:</span>
                <span className="ml-1.5 font-mono font-bold text-white">{anomaly.confidence.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-[#8C9AB5]">Score:</span>
                <span className="ml-1.5 font-mono font-bold text-white">{anomaly.anomaly_score.toFixed(3)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[11px] text-[#8C9AB5]">Correlated with Well X04 pre-stuck signature</span>
            <button
              onClick={() => onNavigate('/live')}
              className="text-xs font-semibold text-[#4DA3FF] hover:text-[#7CC4FF] flex items-center space-x-1"
            >
              <span>Live Monitor</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: WellTwins + Safety Quick Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WellTwin Quick Panel */}
        <div className="rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GitCompare className="w-5 h-5 text-[#4DA3FF]" />
              <h3 className="font-display font-bold text-white">Top Correlated WellTwin</h3>
            </div>
            <button
              onClick={() => onNavigate('/welltwin')}
              className="text-xs text-[#4DA3FF] hover:text-[#7CC4FF]"
            >
              View All 15 Twins
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#4DA3FF]/30 flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-bold text-white text-base">Well X04</span>
                <span className="text-xs font-mono text-[#8C9AB5]">(4.2 km offset)</span>
              </div>
              <p className="text-xs text-[#8C9AB5] mt-1">
                Same Barail Sandstone formation. Experienced Mud Loss @ 2850m and Stuck Pipe @ 2910m (6.5h NPT).
              </p>
            </div>
            <div className="text-right shrink-0 ml-4">
              <div className="font-mono text-3xl font-extrabold text-[#7CC4FF] glow-text-blue">
                91%
              </div>
              <div className="text-[10px] uppercase font-mono text-[#8C9AB5]">TWIN MATCH</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-[#030817] text-center border border-white/[0.04]">
              <div className="text-[#8C9AB5]">Formation</div>
              <div className="font-bold text-white">95%</div>
            </div>
            <div className="p-2 rounded-lg bg-[#030817] text-center border border-white/[0.04]">
              <div className="text-[#8C9AB5]">Depth</div>
              <div className="font-bold text-white">92%</div>
            </div>
            <div className="p-2 rounded-lg bg-[#030817] text-center border border-white/[0.04]">
              <div className="text-[#8C9AB5]">Parameters</div>
              <div className="font-bold text-white">89%</div>
            </div>
          </div>
        </div>

        {/* Safety Context Quick Panel */}
        <div className="rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#42D6A4]" />
                <h3 className="font-display font-bold text-white">Safety & Regulatory Guidance</h3>
              </div>
              <button
                onClick={() => onNavigate('/safety')}
                className="text-xs text-[#4DA3FF] hover:text-[#7CC4FF]"
              >
                Full Checklist
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#030817] border border-white/[0.08] mb-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold text-[#F5B942]">IADC-SPP-04 / OISD-STD-174</span>
                <span className="text-[10px] text-[#8C9AB5]">ENGINEER REVIEW REQUIRED</span>
              </div>
              <p className="text-xs text-[#F5F8FF] leading-relaxed">
                Stuck Pipe Mitigation in Permeable Barail Sandstone: Maximum stationary pipe duration limit is <strong>3 minutes</strong>. Keep string reciprocating and rotating during connection survey intervals.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] text-xs text-[#8C9AB5]">
            <span>Decision Support Only — Does not automate drill control</span>
            <button
              onClick={() => onNavigate('/assistant')}
              className="text-[#7CC4FF] hover:underline flex items-center space-x-1"
            >
              <span>Ask AI Copilot</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
