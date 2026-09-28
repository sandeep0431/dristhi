import React from 'react';
import { Play, Pause, RotateCcw, StepForward, Sliders, AlertTriangle } from 'lucide-react';
import { SimulationState } from '../types';

interface DemoControlsProps {
  state: SimulationState;
  onScenarioChange: (scenario: 'normal' | 'torque_anomaly' | 'risk_zone' | 'combined') => void;
  onDepthChange: (depth: number) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStep: () => void;
}

export const DemoControls: React.FC<DemoControlsProps> = ({
  state,
  onScenarioChange,
  onDepthChange,
  onStart,
  onPause,
  onReset,
  onStep
}) => {
  const scenarios: Array<{ id: 'normal' | 'torque_anomaly' | 'risk_zone' | 'combined'; label: string; desc: string }> = [
    { id: 'normal', label: '1. Normal', desc: 'Stable parameters, 2800m nominal baseline' },
    { id: 'torque_anomaly', label: '2. Torque Anomaly', desc: 'Torque rises +31%, ROP falls -22%' },
    { id: 'risk_zone', label: '3. Historical Risk', desc: 'Depth advances to 2850m thief zone' },
    { id: 'combined', label: '4. Combined (SIH)', desc: 'Torque anomaly + approaching 2850m hazard' }
  ];

  return (
    <div className="bg-[#071226]/90 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Scenario Selection */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-[#8C9AB5] shrink-0">
            <Sliders className="w-3.5 h-3.5 text-[#4DA3FF]" />
            <span>DEMO SCENARIO:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {scenarios.map((sc) => {
              const active = state.scenario === sc.id;
              const isCombined = sc.id === 'combined';
              return (
                <button
                  key={sc.id}
                  onClick={() => onScenarioChange(sc.id)}
                  title={sc.desc}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? isCombined
                        ? 'bg-gradient-to-r from-[#FF5D67] to-[#F5B942] text-[#030817] font-bold shadow-glow-danger'
                        : 'bg-[#4DA3FF] text-[#030817] font-bold shadow-glow-blue'
                      : 'bg-white/[0.04] text-[#8C9AB5] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {sc.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Depth Scrubber */}
        <div className="flex items-center space-x-3 w-full lg:w-72 bg-white/[0.02] px-3 py-1.5 rounded-xl border border-white/[0.06]">
          <span className="text-xs font-mono text-[#8C9AB5] shrink-0">DEPTH:</span>
          <input
            type="range"
            min="2750"
            max="2950"
            step="1"
            value={state.depth}
            onChange={(e) => onDepthChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#030817] rounded-lg appearance-none cursor-pointer accent-[#4DA3FF]"
          />
          <span className="text-xs font-mono font-bold text-[#7CC4FF] shrink-0 w-16 text-right">
            {state.depth.toFixed(0)} m
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {state.is_running ? (
            <button
              onClick={onPause}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F5B942] text-[#030817] hover:bg-[#F5B942]/90 shadow-glow-warning"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onStart}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#42D6A4] text-[#030817] hover:bg-[#42D6A4]/90"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start</span>
            </button>
          )}

          <button
            onClick={onStep}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] text-white hover:bg-white/10 border border-white/10"
            title="Advance 1 simulation step"
          >
            <StepForward className="w-3.5 h-3.5" />
            <span>Step</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] text-[#8C9AB5] hover:text-white border border-white/10"
            title="Reset to 2800m normal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
