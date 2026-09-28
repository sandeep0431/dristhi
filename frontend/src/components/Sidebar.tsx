import React from 'react';
import {
  LayoutDashboard, Activity, MapPin, GitCompare,
  TrendingDown, History, Network,
  ShieldCheck, Bot, FileText, Home
} from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isAnomalyActive?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isAnomalyActive
}) => {
  const navItems = [
    { id: '/', label: 'Landing Page', icon: Home, badge: 'Home' },
    { id: '/dashboard', label: 'Operations Overview', icon: LayoutDashboard, badge: null },
    { id: '/live', label: 'Live Well Monitor', icon: Activity, badge: isAnomalyActive ? 'ALERT' : 'LIVE' },
    { id: '/wells', label: 'Well Explorer & Map', icon: MapPin, badge: '15' },
    { id: '/welltwin', label: 'WellTwin Finder', icon: GitCompare, badge: '91% Twin' },
    { id: '/risk', label: 'Risk Horizon', icon: TrendingDown, badge: 'Adaptive' },
    { id: '/time-machine', label: 'Time Machine', icon: History, badge: 'Dual Replay' },
    { id: '/graph', label: 'Incident Graph', icon: Network, badge: 'Graph' },
    { id: '/safety', label: 'Safety Context', icon: ShieldCheck, badge: 'OISD' },
    { id: '/assistant', label: 'AI Copilot', icon: Bot, badge: 'RAG' },
    { id: '/reports', label: 'Drilling Reports', icon: FileText, badge: null }
  ];

  return (
    <aside className="w-64 border-r border-white/[0.08] bg-[#030817]/95 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 select-none overflow-y-auto">
      {/* Navigation List */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#8C9AB5]">
          Operations & Intelligence
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          const isHome = item.id === '/';
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#4DA3FF]/15 text-[#7CC4FF] border border-[#4DA3FF]/30 shadow-glow-blue font-semibold'
                  : isHome
                  ? 'text-white hover:text-[#7CC4FF] hover:bg-white/[0.06] border border-white/[0.04]'
                  : 'text-[#8C9AB5] hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#4DA3FF]' : isHome ? 'text-[#7CC4FF]' : 'text-[#8C9AB5]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  item.badge === 'ALERT'
                    ? 'bg-[#FF5D67]/20 text-[#FF5D67] border border-[#FF5D67]/30 animate-pulse'
                    : item.badge === 'LIVE'
                    ? 'bg-[#42D6A4]/20 text-[#42D6A4] border border-[#42D6A4]/30'
                    : isHome
                    ? 'bg-blue-500/10 text-[#7CC4FF]'
                    : isActive
                    ? 'bg-[#4DA3FF]/20 text-[#7CC4FF]'
                    : 'bg-white/[0.06] text-[#8C9AB5]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-4 border-t border-white/[0.08] bg-[#071226]/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#42D6A4]" />
            <span className="text-[11px] font-mono text-[#F5F8FF] font-semibold">SYSTEM ONLINE</span>
          </div>
          <span className="text-[10px] font-mono text-[#8C9AB5]">v1.0.0</span>
        </div>
        <p className="text-[10px] text-[#8C9AB5] leading-relaxed">
          Prototype Environment • SIH 2026<br />
          Simulated Telemetry Engine Active
        </p>
      </div>
    </aside>
  );
};
