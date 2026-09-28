import React, { useState } from 'react';
import {
  Compass, ArrowRight, ShieldCheck, Activity,
  GitCompare, TrendingDown, Network, History,
  Wifi, Users, Satellite, Settings, Volume2,
  Sliders, Play, Layers, ChevronRight, User, Utensils, Wine,
  Drill, Droplets
} from 'lucide-react';
import { EarthCanvas } from '../components/EarthCanvas';

interface LandingPageProps {
  onOpenOperations: () => void;
  onExploreFeature: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenOperations,
  onExploreFeature
}) => {
  const [timelineProgress, setTimelineProgress] = useState(42); // 42% progress

  return (
    <div className="min-h-screen bg-[#030817] text-[#F5F8FF] selection:bg-[#4DA3FF]/30 relative overflow-x-hidden font-sans">
      {/* Real NASA Satellite 3D Earth Globe Canvas with Atmospheric Halo & Trajectory */}
      <EarthCanvas />

      {/* Top Floating Luxury In-Flight HUD Bar (Directly from User Reference) */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        {/* Left Side: "Menu" Pill + "Media Stream" Pill */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenOperations}
            className="px-5 py-2 rounded-2xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 backdrop-blur-xl text-xs font-semibold text-white transition-all shadow-lg cursor-pointer"
          >
            Menu
          </button>

          <div
            onClick={onOpenOperations}
            className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl text-xs font-mono text-white shadow-xl cursor-pointer hover:border-[#4DA3FF]/40 transition-colors"
          >
            <div className="w-5 h-5 rounded bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#42D6A4] animate-pulse" />
            </div>
            <span className="font-semibold text-white">Well X01 Live Stream</span>
            <span className="text-[#8C9AB5] text-[11px]">-00:03:50</span>
            <Play className="w-3.5 h-3.5 text-[#4DA3FF] fill-current" />
          </div>
        </div>

        {/* Right Side: Round Icon Buttons (Wifi, Passengers/Crew, Drone/Uplink, Profile, Settings, Audio) */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md flex items-center justify-center text-[#42D6A4] shadow-md" title="Satellite Uplink 100%">
            <Wifi className="w-3.5 h-3.5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md flex items-center justify-center text-[#42D6A4] shadow-md" title="Rig Crew Active">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md flex items-center justify-center text-[#7CC4FF] shadow-md" title="Real-time Subsurface Telemetry">
            <Satellite className="w-3.5 h-3.5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md flex items-center justify-center text-[#8C9AB5] shadow-md">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md flex items-center justify-center text-[#8C9AB5] shadow-md">
            <Settings className="w-3.5 h-3.5" />
          </div>
          <button
            onClick={onOpenOperations}
            className="w-8 h-8 rounded-full bg-[#4DA3FF]/25 border border-[#4DA3FF]/50 backdrop-blur-md flex items-center justify-center text-[#7CC4FF] shadow-glow-blue hover:scale-105 transition-transform cursor-pointer"
            title="Open Operations Dashboard"
          >
            <Compass className="w-4 h-4 text-[#4DA3FF]" />
          </button>
        </div>
      </header>

      {/* Hero Center Display (Matching User Reference: "Enjoy your journey" + "Hong Kong" + "Explore map ->") */}
      <section className="relative z-20 max-w-5xl mx-auto px-6 pt-16 pb-8 sm:pt-20 sm:pb-12 text-center flex flex-col items-center">
        {/* "Enjoy your journey" Subtitle */}
        <div className="text-xs sm:text-sm font-sans text-[#8C9AB5] tracking-wide mb-2">
          DRILLING INTELLIGENCE PLATFORM
        </div>

        {/* Big Clean White Destination Heading */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-6">
          DRISHTI
        </h1>

        <div className="text-xs sm:text-sm font-mono text-[#7CC4FF] bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full mb-6">
          DRISHTI-NWIS • AI-POWERED OFFSET WELL INTELLIGENCE
        </div>

        {/* "Explore map ->" Circular Pill CTA (Exact Match from Reference) */}
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={onOpenOperations}
            className="group flex items-center space-x-3 px-6 py-3 rounded-full bg-black/40 hover:bg-white/[0.15] border border-white/20 backdrop-blur-xl text-white font-medium text-sm transition-all shadow-2xl hover:border-[#4DA3FF]/60 cursor-pointer"
          >
            <span className="font-sans">Enter Operations </span>
            <div className="w-7 h-7 rounded-full bg-white text-[#030817] flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Space gap to admire the real rotating 3D Earth horizon */}
        <div className="h-32 sm:h-52 w-full pointer-events-none" />

      {/* Bottom Horizon Borehole Timeline Overlay */}
<div className="w-full max-w-4xl bg-black/65 border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-2xl text-left relative mt-2">

  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">

    {/* Current Well Info - Left */}
    <div>
      <div className="font-display font-bold text-white text-base sm:text-lg">
        Well X01
      </div>

      <div className="text-xs text-[#8C9AB5] font-sans">
        Drilling at 2,800 m
      </div>
    </div>


    {/* Middle Telemetry / Drilling Services */}
    <div className="flex items-center space-x-5 text-xs text-[#8C9AB5] px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] w-fit">

      {/* Live Telemetry */}
      <span title="Live Telemetry">
        <Wifi className="w-3.5 h-3.5 text-[#42D6A4]" />
      </span>

      {/* Drilling Rig */}
      <span title="Drilling Operations">
        <Drill className="w-3.5 h-3.5 text-white/70" />
      </span>

      {/* Mud System */}
      <span title="Mud System">
        <Droplets className="w-3.5 h-3.5 text-white/70" />
      </span>

      {/* Separator */}
      <span className="text-white/20">
        |
      </span>

      {/* Current Depth */}
      <span className="font-mono text-[11px] text-[#7CC4FF]">
        X01 @ 2,800m
      </span>

    </div>


    {/* Upcoming Risk - Right */}
    <div className="sm:text-right">

      <div className="font-display font-bold text-white text-base sm:text-lg">
        Risk Horizon
      </div>

      <div className="text-xs text-[#8C9AB5] font-sans">
        Next risk zone in 50 m
      </div>

    </div>

  </div>


  {/* Borehole Timeline */}
  <div className="relative mt-5 px-1">

    {/* Main Timeline */}
    <div className="relative h-2 rounded-full bg-white/15 overflow-visible">

      {/* Progress */}
      <div
        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#42D6A4] to-[#4DA3FF]"
        style={{ width: "38%" }}
      />

      {/* Current Depth Marker */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: "38%" }}
      >
        <div className="w-6 h-6 rounded-full bg-[#071226] border border-[#7CC4FF] flex items-center justify-center shadow-[0_0_20px_rgba(77,163,255,0.45)]">
          <div className="w-2 h-2 rounded-full bg-[#7CC4FF] animate-pulse" />
        </div>
      </div>


      {/* Historical Risk Marker 1 */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: "52%" }}
      >
        <div
          className="w-3 h-3 rounded-full bg-[#F5B942] shadow-[0_0_14px_rgba(245,185,66,0.7)]"
          title="Historical Torque Event"
        />
      </div>


      {/* Historical Risk Marker 2 */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: "65%" }}
      >
        <div
          className="w-3 h-3 rounded-full bg-[#FF5D67] shadow-[0_0_14px_rgba(255,93,103,0.7)]"
          title="Historical Mud Loss"
        />
      </div>


      {/* Historical Risk Marker 3 */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: "78%" }}
      >
        <div
          className="w-3 h-3 rounded-full bg-[#FF5D67] shadow-[0_0_14px_rgba(255,93,103,0.7)]"
          title="Historical Stuck Pipe"
        />
      </div>

    </div>


    {/* Depth Labels */}
    <div className="flex justify-between mt-4 text-[10px] font-mono text-[#64748B]">

      <span>2,600m</span>

      <span className="text-[#7CC4FF]">
        2,800m
      </span>

      <span className="text-[#F5B942]">
        2,850m
      </span>

      <span className="text-[#FF5D67]">
        2,910m
      </span>

      <span>3,200m</span>

    </div>

  </div>


  {/* Bottom Information */}
  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5 pt-4 border-t border-white/[0.06]">

    <div className="flex items-center gap-2">

      <span className="w-2 h-2 rounded-full bg-[#42D6A4] animate-pulse" />

      <span className="text-xs text-[#8C9AB5]">
        Live drilling simulation
      </span>

    </div>


    <div className="text-xs text-[#8C9AB5]">

      <span className="text-[#F5B942]">
        1 warning
      </span>

      <span className="mx-2 text-white/20">
        •
      </span>

      <span className="text-[#FF5D67]">
        2 historical risk events
      </span>

    </div>


    <button
      onClick={() => onExploreFeature('/risk')}
      className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-xs text-white hover:bg-white/[0.1] transition cursor-pointer"
    >
      Explore Risk Horizon →
    </button>

  </div>

</div>
      </section>

      {/* Operational Pipeline Section */}
      <section className="relative z-20 border-y border-white/[0.08] bg-[#071226]/85 backdrop-blur-2xl py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#4DA3FF]">OPERATIONAL PIPELINE</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              From historical memory to drilling foresight.
            </h2>
            <p className="text-sm text-[#8C9AB5] mt-2">
              Every drilled well contains operational knowledge. DRISHTI connects that knowledge with the current well to surface relevant patterns before they become surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Historical Wells', desc: '15 offset wells with DDR reports, logs & NPT records' },
              { step: '02', title: 'Current Well (X01)', desc: 'Live simulated telemetry stream & formation lithology' },
              { step: '03', title: 'AI Correlation', desc: 'WellTwin multi-factor similarity + Isolation Forest' },
              { step: '04', title: 'Risk Horizon', desc: 'Look-ahead lookahead zone with ground-truth evidence' },
              { step: '05', title: 'Engineer Decision', desc: 'OISD safety references & RAG AI copilot support' },
            ].map((p, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#030817]/90 border border-white/[0.08] hover:border-[#4DA3FF]/40 transition-all group">
                <div className="text-xs font-mono font-bold text-[#4DA3FF] mb-2">{p.step}</div>
                <h3 className="font-display font-semibold text-white text-sm mb-1 group-hover:text-[#7CC4FF] transition-colors">{p.title}</h3>
                <p className="text-xs text-[#8C9AB5] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Intelligence Feature Cards */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-[#4DA3FF]">CORE CAPABILITIES</span>
          <h2 className="font-display text-3xl font-bold text-white mt-1">
            Engineered for Offshore & Onshore Drilling Operations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: WellTwin */}
          <div
            onClick={() => onExploreFeature('/welltwin')}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#4DA3FF]/40 hover:bg-white/[0.06] backdrop-blur-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:shadow-glow-blue transition-all">
              <GitCompare className="w-6 h-6 text-[#4DA3FF]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#7CC4FF]">WellTwin Finder</h3>
            <p className="text-xs text-[#8C9AB5] leading-relaxed mb-4">
              Find the well that behaved like yours. Weighted similarity evaluates lithology, depth, parameters, and historical hazards.
            </p>
            <div className="text-xs font-mono text-[#4DA3FF] flex items-center space-x-1">
              <span>Well X04: 91% Match</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Risk Horizon */}
          <div
            onClick={() => onExploreFeature('/risk')}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#4DA3FF]/40 hover:bg-white/[0.06] backdrop-blur-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:shadow-glow-warning transition-all">
              <TrendingDown className="w-6 h-6 text-[#F5B942]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#F5B942]">Adaptive Risk Horizon</h3>
            <p className="text-xs text-[#8C9AB5] leading-relaxed mb-4">
              See what lies ahead before entering the zone. Dynamic look-ahead horizon alerts engineers 50m to 150m in advance.
            </p>
            <div className="text-xs font-mono text-[#F5B942] flex items-center space-x-1">
              <span>Interval: 2850–2910m</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Incident Graph */}
          <div
            onClick={() => onExploreFeature('/graph')}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#4DA3FF]/40 hover:bg-white/[0.06] backdrop-blur-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:shadow-purple-500/30 transition-all">
              <Network className="w-6 h-6 text-[#A855F7]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#C084FC]">Incident Knowledge Graph</h3>
            <p className="text-xs text-[#8C9AB5] leading-relaxed mb-4">
              Connect conditions to outcomes. Multi-relational network maps Well → Formation → Anomaly → Incident → NPT → Reports.
            </p>
            <div className="text-xs font-mono text-[#A855F7] flex items-center space-x-1">
              <span>Inspect Ontologies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Time Machine */}
          <div
            onClick={() => onExploreFeature('/time-machine')}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#4DA3FF]/40 hover:bg-white/[0.06] backdrop-blur-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:shadow-emerald-500/30 transition-all">
              <History className="w-6 h-6 text-[#42D6A4]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#42D6A4]">Drilling Time Machine</h3>
            <p className="text-xs text-[#8C9AB5] leading-relaxed mb-4">
              Replay historical drilling stories. Scrub across depths to overlay telemetry signatures of Well X01 against historical X04.
            </p>
            <div className="text-xs font-mono text-[#42D6A4] flex items-center space-x-1">
              <span>Dual Depth Replay</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/[0.08] bg-[#071226]/90 py-8 px-6 text-center text-xs text-[#8C9AB5]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-display font-semibold text-white">DRISHTI-NWIS</span> — Drilling Risk Intelligence & Safety History Interface
          </div>
          <div className="font-mono text-[11px] text-[#4DA3FF]">
            Prototype • Smart India Hackathon 2026
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#8C9AB5]">
            DEMONSTRATION ENVIRONMENT
          </div>
        </div>
      </footer>
    </div>
  );
};
