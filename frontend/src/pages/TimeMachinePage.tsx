import React, { useState, useEffect } from 'react';
import {
  History, Play, Pause, RotateCcw, ChevronRight,
  AlertTriangle, FileText, CheckCircle2, GitCompare
} from 'lucide-react';
import { fallbackTimeMachine } from '../services/fallbackData';

interface TimeMachinePageProps {
  onNavigate: (route: string) => void;
}

export const TimeMachinePage: React.FC<TimeMachinePageProps> = ({ onNavigate }) => {
  const [sliderDepth, setSliderDepth] = useState<number>(2800);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeParam, setActiveParam] = useState<'torque' | 'rop' | 'pressure'>('torque');

  const { current_profile, historical_profile } = fallbackTimeMachine;

  // Auto-play effect
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setSliderDepth((prev) => {
          if (prev >= 2930) {
            setIsPlaying(false);
            return 2750;
          }
          return prev + 2;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Find closest point in current and historical profiles
  const findClosest = (profile: any[], d: number) => {
    return profile.reduce((prev, curr) =>
      Math.abs(curr.depth - d) < Math.abs(prev.depth - d) ? curr : prev
    );
  };

  const curPoint = findClosest(current_profile, sliderDepth);
  const histPoint = findClosest(historical_profile, sliderDepth);

  // Active historical event trigger
  const activeEvent =
    sliderDepth >= 2848 && sliderDepth <= 2855
      ? { title: 'MUD LOSS ENCOUNTERED (45 bbl/hr)', desc: 'X04 Standpipe pressure dropped 180 psi. Lost circulation across micro-fractured sand.', severity: 'HIGH' }
      : sliderDepth >= 2868 && sliderDepth <= 2875
      ? { title: 'TORSIONAL STICK-SLIP (58.2 kN·m)', desc: 'Severe torque spikes (+42% baseline) stalled top drive twice. Wiper trip initiated.', severity: 'HIGH' }
      : sliderDepth >= 2908 && sliderDepth <= 2915
      ? { title: 'DIFFERENTIAL STUCK PIPE (6.5h NPT)', desc: 'Pipe stationary 12 min during connection across high permeability sand. Jarred free with acid pill.', severity: 'CRITICAL' }
      : null;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-[#42D6A4]" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wide">
              Drilling Time Machine
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-emerald-500/10 text-[#42D6A4] border border-emerald-500/20">
              DUAL REPLAY ENGINE
            </span>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Synchronously replay historical offset well telemetry against current well behavior at identical stratigraphic depths
          </p>
        </div>

        {/* Parameter switcher pills */}
        <div className="flex items-center space-x-2 bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.08]">
          <span className="text-xs font-mono text-[#8C9AB5] px-2">OVERLAY:</span>
          {(['torque', 'rop', 'pressure'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setActiveParam(p)}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                activeParam === p
                  ? 'bg-[#4DA3FF] text-[#030817] font-bold shadow-glow-blue'
                  : 'text-[#8C9AB5] hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Cinematic Depth Timeline Bar */}
      <div className="rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#4DA3FF] to-[#38BDF8] text-[#030817] flex items-center justify-center font-bold shadow-glow-blue hover:opacity-90 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setSliderDepth(2800);
              }}
              className="p-2.5 rounded-xl bg-white/[0.04] text-[#8C9AB5] hover:text-white border border-white/10"
              title="Reset to 2800m"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div>
              <div className="text-[10px] font-mono text-[#8C9AB5] uppercase">REPLAY DEPTH POSITION</div>
              <div className="font-mono text-2xl font-black text-white">{sliderDepth.toFixed(0)} m MD</div>
            </div>
          </div>

          {/* Quick jump depth buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-[#8C9AB5]">QUICK JUMP:</span>
            {[
              { d: 2800, l: '2800m Baseline' },
              { d: 2850, l: '2850m Mud Loss' },
              { d: 2870, l: '2870m Torque' },
              { d: 2910, l: '2910m Stuck Pipe' },
            ].map((btn) => (
              <button
                key={btn.d}
                onClick={() => setSliderDepth(btn.d)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  sliderDepth === btn.d
                    ? 'bg-[#7CC4FF] text-[#030817] font-bold'
                    : 'bg-white/[0.04] text-[#8C9AB5] hover:text-white border border-white/[0.06]'
                }`}
              >
                {btn.l}
              </button>
            ))}
          </div>
        </div>

        {/* Scrubbing Range Input */}
        <div className="space-y-2 pt-2">
          <input
            type="range"
            min="2750"
            max="2930"
            step="1"
            value={sliderDepth}
            onChange={(e) => setSliderDepth(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-[#030817] rounded-lg appearance-none cursor-pointer accent-[#4DA3FF]"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#8C9AB5]">
            <span>2,750 m (Upper Sand)</span>
            <span className="text-[#F5B942]">2,850 m (Thief Zone)</span>
            <span className="text-[#FF5D67]">2,910 m (Stuck Pipe Contact)</span>
            <span>2,950 m (Formation Base)</span>
          </div>
        </div>
      </div>

      {/* Trigger Event Banner (when scrubber reaches an incident depth) */}
      {activeEvent && (
        <div className="p-4 rounded-2xl bg-[#FF5D67]/15 border border-[#FF5D67]/50 shadow-glow-danger flex items-start space-x-3 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-[#FF5D67] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-white text-sm">
                Historical Event Replay Alert: {activeEvent.title}
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF5D67]/20 text-[#FF5D67] font-bold">
                {activeEvent.severity}
              </span>
            </div>
            <p className="text-xs text-[#F5F8FF] mt-1">{activeEvent.desc}</p>
          </div>
        </div>
      )}

      {/* Dual Comparison Cards: Current Well X01 vs Historical Twin X04 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Well X01 Card */}
        <div className="rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF] animate-pulse" />
              <h3 className="font-display font-bold text-white text-base">Current Well: X01</h3>
            </div>
            <span className="text-xs font-mono text-[#7CC4FF]">ACTIVE DRILLING</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-[#030817] border border-white/[0.04]">
              <div className="text-[10px] font-mono text-[#8C9AB5]">TORQUE</div>
              <div className="font-mono text-xl font-bold text-white mt-1">{curPoint.torque}</div>
              <div className="text-[10px] text-[#8C9AB5]">kN·m</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#030817] border border-white/[0.04]">
              <div className="text-[10px] font-mono text-[#8C9AB5]">ROP</div>
              <div className="font-mono text-xl font-bold text-white mt-1">{curPoint.rop}</div>
              <div className="text-[10px] text-[#8C9AB5]">m/hr</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#030817] border border-white/[0.04]">
              <div className="text-[10px] font-mono text-[#8C9AB5]">PRESSURE</div>
              <div className="font-mono text-xl font-bold text-white mt-1">{curPoint.pressure}</div>
              <div className="text-[10px] text-[#8C9AB5]">psi</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#8C9AB5]">
            Stratum: Barail Sandstone (Upper) • 8-1/2" Section • Projected trajectory
          </div>
        </div>

        {/* Historical Well X04 Card */}
        <div className="rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#42D6A4]" />
              <h3 className="font-display font-bold text-white text-base">Historical WellTwin: X04</h3>
            </div>
            <span className="text-xs font-mono text-[#42D6A4] font-bold">91% MATCH • YEAR 2021</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className={`p-3.5 rounded-xl bg-[#030817] border ${
              histPoint.torque > 50 ? 'border-[#FF5D67]' : 'border-white/[0.04]'
            }`}>
              <div className="text-[10px] font-mono text-[#8C9AB5]">TORQUE</div>
              <div className={`font-mono text-xl font-bold mt-1 ${histPoint.torque > 50 ? 'text-[#FF5D67]' : 'text-white'}`}>
                {histPoint.torque}
              </div>
              <div className="text-[10px] text-[#8C9AB5]">kN·m</div>
            </div>
            <div className={`p-3.5 rounded-xl bg-[#030817] border ${
              histPoint.rop < 10 ? 'border-[#F5B942]' : 'border-white/[0.04]'
            }`}>
              <div className="text-[10px] font-mono text-[#8C9AB5]">ROP</div>
              <div className={`font-mono text-xl font-bold mt-1 ${histPoint.rop < 10 ? 'text-[#F5B942]' : 'text-white'}`}>
                {histPoint.rop}
              </div>
              <div className="text-[10px] text-[#8C9AB5]">m/hr</div>
            </div>
            <div className={`p-3.5 rounded-xl bg-[#030817] border ${
              histPoint.pressure < 3100 ? 'border-[#FF5D67]' : 'border-white/[0.04]'
            }`}>
              <div className="text-[10px] font-mono text-[#8C9AB5]">PRESSURE</div>
              <div className={`font-mono text-xl font-bold mt-1 ${histPoint.pressure < 3100 ? 'text-[#FF5D67]' : 'text-white'}`}>
                {histPoint.pressure}
              </div>
              <div className="text-[10px] text-[#8C9AB5]">psi</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#8C9AB5]">
            Historical Log: {histPoint.event || 'Steady drilling in sandstone face'}
          </div>
        </div>
      </div>
    </div>
  );
};
