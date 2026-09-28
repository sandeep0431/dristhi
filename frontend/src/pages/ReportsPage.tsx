import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, ChevronRight, Search, BookOpen } from 'lucide-react';

interface ReportsPageProps {
  onNavigate: (route: string) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onNavigate }) => {
  const [selectedReportId, setSelectedReportId] = useState<string>('REP-X04');

  const reports = [
    {
      id: 'REP-X04',
      filename: 'X04_Drilling_Report.pdf',
      title: 'Offset Well X04 Daily Drilling Report & End of Section Summary',
      well: 'Well X04',
      pages: 142,
      year: 2021,
      chunks: [
        {
          page: 87,
          section: 'Operations 2840m - 2860m (DDR #42)',
          text: 'At 2850m MD while drilling into upper fractured Barail Sandstone, rig observed partial lost circulation of 45 bbl/hr. Standpipe pressure dropped from 3210 psi to 3030 psi. Flow sensor indicated 22% return loss. Pumped 25 bbl medium-sized LCM pill (mica + walnut blend). Well healed after 4.0 hours NPT.',
          hazard: 'MUD_LOSS @ 2850m'
        },
        {
          page: 89,
          section: 'Operations 2860m - 2880m (DDR #43)',
          text: 'Drilling resumed from 2860m. At 2870m MD, experienced erratic torque spikes reaching 58.2 kN·m (+42% over baseline). Top-drive stalled twice. Significant slip-stick vibration detected by MWD sub. Conducted short wiper trip to 2790m and adjusted RPM to 130 to break resonance. 2.5 hours NPT.',
          hazard: 'HIGH_TORQUE @ 2870m'
        },
        {
          page: 92,
          section: 'Operations 2900m - 2920m (DDR #45)',
          text: 'At 2910m MD, drillstring became differentially stuck during survey connection across depleted sand body. Overbalance calculated at 380 psi. Rig jarred up with 90 klbf overpull for 3 hours. Spotted pipe-release acid and lubricant soak pill. Drillstring freed after 6.5 hours total NPT.',
          hazard: 'STUCK_PIPE @ 2910m'
        }
      ]
    },
    {
      id: 'REP-X07',
      filename: 'X07_Drilling_Report.pdf',
      title: 'Offset Well X07 Intermediate Section Drilling Summary',
      well: 'Well X07',
      pages: 98,
      year: 2022,
      chunks: [
        {
          page: 54,
          section: 'Operations 2860m - 2875m (DDR #38)',
          text: 'At 2865m MD in Barail Sandstone, mud pit level dropped 18 bbl over 1 hour. Mild seepage loss noticed. Mud weight was 1.17 SG. Mixed and pumped 15 bbl fiber blend. Circulated bottoms up. 2.5 hr NPT.',
          hazard: 'MUD_LOSS @ 2865m'
        },
        {
          page: 58,
          section: 'Operations 2895m - 2910m (DDR #40)',
          text: 'At 2900m MD, tight hole condition encountered while attempting wiper trip off bottom. String pulled with 65 klbf overpull. Reamed tight section with 60 RPM and low pump rate. 4.0 hr NPT.',
          hazard: 'TIGHT_HOLE @ 2900m'
        }
      ]
    },
    {
      id: 'REP-X11',
      filename: 'X11_Drilling_Report.pdf',
      title: 'Offset Well X11 Operational Case History & Incident Review',
      well: 'Well X11',
      pages: 115,
      year: 2019,
      chunks: [
        {
          page: 41,
          section: 'Operations 2865m - 2885m (DDR #29)',
          text: 'At 2870m MD, severe torsional stick-slip vibration commenced. Torque swung between 32 and 59 kN·m. Bit penetration dropped from 17 m/hr to 11.5 m/hr. Hole cleaning sweep pumped. 3.0 hr NPT.',
          hazard: 'HIGH_TORQUE @ 2870m'
        },
        {
          page: 45,
          section: 'Operations 2920m - 2935m (DDR #32)',
          text: 'At 2925m MD, transition into Barail Coal-Shale Member caused shale sloughing and pack-off. Pump pressure surged to 3650 psi. Worked string actively until pressure normalized. 5.2 hr NPT.',
          hazard: 'PACK_OFF @ 2925m'
        }
      ]
    }
  ];

  const currentReport = reports.find((r) => r.id === selectedReportId) || reports[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-[#4DA3FF]" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wide">
              Drilling Reports & Document Chunks
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-blue-500/10 text-[#7CC4FF] border border-blue-500/20">
              RAG VECTOR ARCHIVE
            </span>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Ground-truth Daily Drilling Reports (DDR) parsed and indexed for verifiable evidence extraction
          </p>
        </div>

        <button
          onClick={() => onNavigate('/assistant')}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#4DA3FF] text-[#030817] hover:bg-[#7CC4FF] shadow-glow-blue"
        >
          Query Reports in Copilot
        </button>
      </div>

      {/* Grid: Document List (4 cols) + Chunk Inspector (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-mono uppercase text-[#8C9AB5]">Indexed Document Archive</span>
          {reports.map((rep) => {
            const isSel = rep.id === selectedReportId;
            return (
              <div
                key={rep.id}
                onClick={() => setSelectedReportId(rep.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSel
                    ? 'bg-blue-500/10 border-[#4DA3FF] shadow-glow-blue'
                    : 'bg-[#071226]/80 border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-white">{rep.filename}</span>
                  <span className="text-[10px] font-mono text-[#8C9AB5]">{rep.pages} Pages</span>
                </div>
                <h4 className="font-display font-semibold text-xs text-[#F5F8FF] leading-relaxed">
                  {rep.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8C9AB5] mt-3 pt-2 border-t border-white/[0.04]">
                  <span>{rep.well}</span>
                  <span className="text-[#42D6A4]">Indexed & Grounded</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chunk Inspector */}
        <div className="lg:col-span-8 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3">
            <div>
              <span className="text-xs font-mono text-[#8C9AB5] uppercase">DOCUMENT INSPECTOR</span>
              <h3 className="font-display font-bold text-white text-base mt-0.5">
                {currentReport.title}
              </h3>
            </div>
            <span className="text-xs font-mono text-[#7CC4FF] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              {currentReport.chunks.length} Incident Passages
            </span>
          </div>

          <div className="space-y-4">
            {currentReport.chunks.map((chk, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#030817] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#7CC4FF]">
                    {currentReport.filename} — Page {chk.page} ({chk.section})
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF5D67]/15 text-[#FF5D67]">
                    {chk.hazard}
                  </span>
                </div>
                <p className="text-xs text-[#F5F8FF] leading-relaxed italic bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                  "{chk.text}"
                </p>
                <div className="text-[10px] font-mono text-[#42D6A4] flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified ground truth passage referenced by RAG Assistant</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
