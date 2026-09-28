import React, { useState } from 'react';
import {
  ShieldCheck, AlertTriangle, FileText, CheckCircle2,
  ExternalLink, ChevronRight, Info
} from 'lucide-react';
import { fallbackSafety } from '../services/fallbackData';
import { SafetyReference } from '../types';

interface SafetyContextPageProps {
  onNavigate: (route: string) => void;
}

export const SafetyContextPage: React.FC<SafetyContextPageProps> = ({ onNavigate }) => {
  const [selectedCat, setSelectedCat] = useState<string>('ALL');

  const filtered = selectedCat === 'ALL'
    ? fallbackSafety
    : fallbackSafety.filter((s) => s.risk_category === selectedCat);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-[#42D6A4]" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wide">
              Safety & Regulatory Context
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-emerald-500/10 text-[#42D6A4] border border-emerald-500/20">
              OISD / INDUSTRY STANDARDS
            </span>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Standard operating procedures and safety standards for active engineering hazard review
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.08]">
          {['ALL', 'STUCK_PIPE', 'CIRCULATION_LOSS', 'WELL_CONTROL', 'HIGH_TORQUE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                selectedCat === cat
                  ? 'bg-[#4DA3FF] text-[#030817] font-bold shadow-glow-blue'
                  : 'text-[#8C9AB5] hover:text-white'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Engineering Review Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-[#F5B942] shrink-0 mt-0.5" />
        <div className="text-xs text-[#F5F8FF] leading-relaxed">
          <strong className="text-[#F5B942]">Operational Decision Support Notice: </strong>
          The guidelines below are presented as an advisory reference for the Wellsite Drilling Engineer and Rig Superintendent.
          DRISHTI-NWIS does not automatically issue operational rig commands or claim statutory regulatory certification.
        </div>
      </div>

      {/* Safety Standards Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((sec) => (
          <div
            key={sec.reference_id}
            className="rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono font-bold text-[#7CC4FF]">
                  {sec.reference_id}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.04] text-[#8C9AB5]">
                  {sec.risk_category}
                </span>
              </div>

              <h3 className="font-display font-bold text-white text-base mb-1">
                {sec.reference_title}
              </h3>
              <div className="text-xs text-[#4DA3FF] font-mono mb-3">{sec.source}</div>

              <p className="text-xs text-[#8C9AB5] leading-relaxed mb-4">
                {sec.guideline_summary}
              </p>

              {/* Mandatory Checklist Items */}
              <div className="space-y-2 mb-4">
                <div className="text-[11px] font-mono uppercase text-white font-semibold">
                  Mandatory Operational Verification Checks:
                </div>
                {sec.mandatory_checks.map((check, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#030817] border border-white/[0.04] text-xs text-[#F5F8FF] flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#42D6A4] shrink-0 mt-0.5" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#8C9AB5]">
              <span className="italic">{sec.engineering_disclaimer}</span>
              <button
                onClick={() => onNavigate('/assistant')}
                className="text-[#4DA3FF] hover:underline shrink-0 ml-2"
              >
                Query in Copilot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
