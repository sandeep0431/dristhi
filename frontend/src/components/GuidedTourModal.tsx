import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Play, ExternalLink } from 'lucide-react';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onTriggerScenario: (scenario: 'normal' | 'torque_anomaly' | 'risk_zone' | 'combined', depth?: number) => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onTriggerScenario
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: "1. Open DRISHTI Landing Page",
      desc: "Introduce DRISHTI-NWIS petroleum visual language, borehole digital twin, and 'Learn from every well. Anticipate the next risk.'",
      route: "/",
      actionName: "Go to Landing Page",
      action: () => onNavigate("/")
    },
    {
      num: 2,
      title: "2. Enter Operations Dashboard",
      desc: "Show primary operations center layout with active well X01 at 2800m, live parameter gauges, and status overview.",
      route: "/dashboard",
      actionName: "Open Operations",
      action: () => {
        onTriggerScenario('normal', 2800);
        onNavigate('/dashboard');
      }
    },
    {
      num: 3,
      title: "3. Show X01 at 2800m Baseline",
      desc: "Highlight current parameters: Depth 2800m, ROP 18.2 m/hr, RPM 118, Torque 42.5 kN·m, Mud Weight 1.18 SG, Pressure 3210 psi in Barail Sandstone.",
      route: "/dashboard",
      actionName: "Inspect Telemetry Baseline",
      action: () => {
        onTriggerScenario('normal', 2800);
        onNavigate('/dashboard');
      }
    },
    {
      num: 4,
      title: "4. Start Live Simulation",
      desc: "Switch to Live Well Monitor and activate telemetry stream. Notice parameters updating in real-time.",
      route: "/live",
      actionName: "Open Live Monitor",
      action: () => onNavigate('/live')
    },
    {
      num: 5,
      title: "5. Trigger Torque Anomaly (or Combined Risk)",
      desc: "Activate Scenario: Torque begins rising from 42.5 to 58+ kN·m while ROP drops from 18.2 to 12 m/hr.",
      route: "/live",
      actionName: "Simulate Torque Spike",
      action: () => {
        onTriggerScenario('combined', 2825);
        onNavigate('/live');
      }
    },
    {
      num: 6,
      title: "6. Show Anomaly Alert & Explainability",
      desc: "Demonstrate Isolation Forest ML + physics rule diagnosis: 'Torque +31% above baseline', status turns ELEVATED/CRITICAL.",
      route: "/live",
      actionName: "View Anomaly Diagnosis",
      action: () => {
        onTriggerScenario('combined', 2840);
        onNavigate('/live');
      }
    },
    {
      num: 7,
      title: "7. Open WellTwin Finder",
      desc: "Show that DRISHTI does not just find closest wells geographically; it evaluates multi-factor behavioral similarity.",
      route: "/welltwin",
      actionName: "Open WellTwin Finder",
      action: () => onNavigate('/welltwin')
    },
    {
      num: 8,
      title: "8. Show Well X04 = 91% Similarity",
      desc: "Highlight X04 breakdown: Formation 95%, Depth 92%, Trajectory 81%, Parameters 89%, Events 90%, Spatial 76%.",
      route: "/welltwin",
      actionName: "Inspect X04 Twin Factors",
      action: () => onNavigate('/welltwin')
    },
    {
      num: 9,
      title: "9. Open Adaptive Risk Horizon",
      desc: "Show the primary visual feature: Upcoming 2850m - 2910m hazard zone ahead of current bit position.",
      route: "/risk",
      actionName: "Open Risk Horizon",
      action: () => {
        onTriggerScenario('combined', 2835);
        onNavigate('/risk');
      }
    },
    {
      num: 10,
      title: "10. Advance Bit Towards Risk Zone",
      desc: "Show the dynamic horizon updating: At 2845m bit is 5m away; at 2855m bit enters active hazard zone.",
      route: "/risk",
      actionName: "Move Bit into 2850m Zone",
      action: () => {
        onTriggerScenario('combined', 2855);
        onNavigate('/risk');
      }
    },
    {
      num: 11,
      title: "11. Inspect 'Why was this alert raised?'",
      desc: "Expand the evidence drawer showing 3 offset wells (X04, X07, X11) with historical Mud Loss, Torque, and Stuck Pipe.",
      route: "/risk",
      actionName: "Show Ground-Truth Evidence",
      action: () => onNavigate('/risk')
    },
    {
      num: 12,
      title: "12. Open Offset Well Map",
      desc: "Show spatial distribution in Upper Assam Basin: Current well X01 (electric blue) surrounded by X04, X07, X11.",
      route: "/wells",
      actionName: "View Well Map",
      action: () => onNavigate('/wells')
    },
    {
      num: 13,
      title: "13. Open Drilling Time Machine",
      desc: "Cinematic depth replay comparing Current Well X01 vs Historical Well X04 at identical depths.",
      route: "/time-machine",
      actionName: "Open Time Machine",
      action: () => onNavigate('/time-machine')
    },
    {
      num: 14,
      title: "14. Replay Historical X04 Incident",
      desc: "Scrub slider to 2850m (Mud Loss) and 2910m (Differential Stuck Pipe) to observe identical pre-incident signatures.",
      route: "/time-machine",
      actionName: "Replay at 2850m",
      action: () => onNavigate('/time-machine')
    },
    {
      num: 15,
      title: "15. Open Incident Knowledge Graph",
      desc: "Inspect multi-relational graph: Well -> Formation -> Depth -> Telemetry Pattern -> Incident -> NPT -> Source Report.",
      route: "/graph",
      actionName: "Open Incident Graph",
      action: () => onNavigate('/graph')
    },
    {
      num: 16,
      title: "16. Open Safety Context (OISD / Industry)",
      desc: "Show restrained warning guidelines for Well Control (OISD-174) and Stuck Pipe Prevention (IADC-SPP-04).",
      route: "/safety",
      actionName: "Open Safety Context",
      action: () => onNavigate('/safety')
    },
    {
      num: 17,
      title: "17. Ask AI Engineering Copilot",
      desc: "Submit query: 'Why should I be concerned about the next 100m?' to demonstrate evidence-grounded RAG.",
      route: "/assistant",
      actionName: "Open AI Copilot",
      action: () => onNavigate('/assistant')
    },
    {
      num: 18,
      title: "18. Show Evidence-Backed Response",
      desc: "Highlight specific citations: X04_Drilling_Report.pdf p.87, p.92 and exact suggested mitigations.",
      route: "/assistant",
      actionName: "Review Citations & Evidence",
      action: () => onNavigate('/assistant')
    },
    {
      num: 19,
      title: "19. Return to Operations Dashboard",
      desc: "Conclude presentation: DRISHTI turns historical offset memory into actionable drilling foresight.",
      route: "/dashboard",
      actionName: "Return to Operations",
      action: () => onNavigate('/dashboard')
    }
  ];

  const currentStep = steps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#071226] border border-[#4DA3FF]/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-blue-500/10">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#030817]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF] animate-pulse" />
            <h3 className="font-display font-bold text-white text-base tracking-wide">
              DRISHTI-NWIS • SIH Judge Demonstration Walkthrough
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8C9AB5] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#4DA3FF] bg-[#4DA3FF]/10 px-2.5 py-1 rounded-full border border-[#4DA3FF]/20">
              Step {currentStep.num} of {steps.length}
            </span>
            <span className="text-xs font-mono text-[#8C9AB5]">Target Demo: 4 – 6 Minutes</span>
          </div>

          <h2 className="text-xl font-display font-bold text-white mb-2">
            {currentStep.title}
          </h2>

          <p className="text-sm text-[#8C9AB5] leading-relaxed mb-6">
            {currentStep.desc}
          </p>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-6 flex items-center justify-between">
            <div className="text-xs text-white">
              <span className="text-[#8C9AB5]">Target Screen: </span>
              <span className="font-mono text-[#7CC4FF]">{currentStep.route}</span>
            </div>
            <button
              onClick={() => {
                currentStep.action();
                onClose();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#4DA3FF] text-[#030817] hover:bg-[#7CC4FF] transition-all shadow-glow-blue"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{currentStep.actionName}</span>
            </button>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center space-x-1.5 mb-2 overflow-x-auto py-2">
            {steps.map((st, idx) => (
              <button
                key={st.num}
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-[#4DA3FF] shadow-glow-blue'
                    : idx < currentStepIndex
                    ? 'bg-[#42D6A4]'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                title={`Step ${st.num}`}
              />
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-white/10 bg-[#030817] flex items-center justify-between">
          <button
            onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[#8C9AB5] hover:text-white disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <button
            onClick={() => {
              currentStep.action();
              if (currentStepIndex < steps.length - 1) {
                setCurrentStepIndex(currentStepIndex + 1);
              }
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#4DA3FF] to-[#38BDF8] text-[#030817] hover:opacity-90 shadow-glow-blue"
          >
            <span>Execute & Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
