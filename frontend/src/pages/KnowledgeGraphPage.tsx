import React, { useState } from 'react';
import { Network, Info, FileText, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { fallbackGraph } from '../services/fallbackData';
import { GraphNode } from '../types';

interface KnowledgeGraphPageProps {
  onNavigate: (route: string) => void;
}

export const KnowledgeGraphPage: React.FC<KnowledgeGraphPageProps> = ({ onNavigate }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(fallbackGraph.nodes[2]); // Default to Mud Loss node

  const nodes = fallbackGraph.nodes;
  const edges = fallbackGraph.edges;

  // Visual layout coordinates for the knowledge graph nodes
  const nodePositions: Record<string, { x: number; y: number; color: string }> = {
    'well-X04': { x: 70, y: 190, color: '#4DA3FF' },
    'form-barail': { x: 220, y: 70, color: '#38BDF8' },
    'event-mudloss': { x: 250, y: 160, color: '#F5B942' },
    'event-torque': { x: 250, y: 240, color: '#F5B942' },
    'event-stuckpipe': { x: 250, y: 320, color: '#FF5D67' },
    'depth-2850': { x: 420, y: 90, color: '#7CC4FF' },
    'depth-2870': { x: 420, y: 150, color: '#7CC4FF' },
    'depth-2910': { x: 420, y: 210, color: '#7CC4FF' },
    'pattern-pressure': { x: 440, y: 270, color: '#A855F7' },
    'pattern-stickslip': { x: 440, y: 330, color: '#A855F7' },
    'pattern-stationary': { x: 440, y: 380, color: '#A855F7' },
    'npt-total': { x: 570, y: 220, color: '#FF5D67' },
    'doc-ddr42': { x: 570, y: 120, color: '#42D6A4' }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="w-6 h-6 text-[#A855F7]" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wide">
              Incident Knowledge Graph
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-purple-500/10 text-[#C084FC] border border-purple-500/20">
              ONTOLOGY VISUALIZER
            </span>
          </div>
          <p className="text-xs text-[#8C9AB5] mt-1">
            Multi-relational graph linking wells, formations, depth thresholds, telemetry signatures, incidents, NPT, and source reports
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono bg-white/[0.03] p-2 rounded-xl border border-white/[0.08]">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF]" />
            <span className="text-white">Well</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
            <span className="text-white">Formation</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5B942]" />
            <span className="text-white">Incident</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
            <span className="text-white">Telemetry</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#42D6A4]" />
            <span className="text-white">DDR Document</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Network Canvas (8 cols) + Node Inspector Card (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-8 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#8C9AB5]">
              GRAPH SCOPE: OFFSET WELL X04 HAZARD CASCADE
            </span>
            <span className="text-xs font-mono text-[#4DA3FF]">13 Nodes • 12 Relations</span>
          </div>

          {/* Dark Graph Canvas */}
          <div className="w-full h-[450px] bg-[#030817] rounded-2xl border border-white/[0.06] relative overflow-hidden">
            <div className="absolute inset-0 seismic-grid opacity-20 pointer-events-none" />

            <svg className="w-full h-full" viewBox="0 0 680 430" preserveAspectRatio="xMidYMid meet">
              {/* Edges */}
              {edges.map((e) => {
                const s = nodePositions[e.source];
                const t = nodePositions[e.target];
                if (!s || !t) return null;

                const isConnected =
                  selectedNode &&
                  (selectedNode.id === e.source || selectedNode.id === e.target);

                return (
                  <g key={e.id}>
                    <line
                      x1={s.x}
                      y1={s.y}
                      x2={t.x}
                      y2={t.y}
                      stroke={isConnected ? '#7CC4FF' : '#ffffff'}
                      strokeWidth={isConnected ? '2' : '1'}
                      strokeOpacity={isConnected ? 0.8 : 0.15}
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const pos = nodePositions[node.id] || { x: 300, y: 200, color: '#4DA3FF' };
                const isSelected = selectedNode && selectedNode.id === node.id;

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    {isSelected && (
                      <circle cx={pos.x} cy={pos.y} r="22" fill={pos.color} fillOpacity="0.25" className="animate-ping" />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '14' : '10'}
                      fill={pos.color}
                      stroke="#030817"
                      strokeWidth="2.5"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 15}
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#8C9AB5'}
                      fontSize={isSelected ? '11' : '10'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="monospace"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#8C9AB5]">
            <span>Click any node to inspect semantic properties, telemetry values, and citations</span>
            <span className="font-mono text-[#7CC4FF]">Neo4j Prototype Model</span>
          </div>
        </div>

        {/* Node Inspector Card (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-[#071226]/80 border border-white/[0.08] p-5 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A855F7]">NODE INSPECTOR</span>
              <span className="text-xs font-mono text-white bg-white/[0.04] px-2 py-0.5 rounded">
                {selectedNode ? selectedNode.group.toUpperCase() : ''}
              </span>
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {selectedNode.details.title || selectedNode.label}
                  </h3>
                  <p className="text-xs text-[#8C9AB5] mt-1">
                    Node ID: <span className="font-mono text-[#7CC4FF]">{selectedNode.id}</span>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#030817] border border-white/[0.06] space-y-2 text-xs">
                  {Object.entries(selectedNode.details).map(([key, val]) => {
                    if (key === 'title') return null;
                    return (
                      <div key={key} className="flex justify-between border-b border-white/[0.04] pb-1.5 last:border-0 last:pb-0">
                        <span className="text-[#8C9AB5] uppercase font-mono">{key.replace('_', ' ')}:</span>
                        <span className="text-white text-right font-medium max-w-[200px] truncate">
                          {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {selectedNode.details.recommendation && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-[#F5F8FF]">
                    <span className="font-bold text-[#F5B942]">Mitigation: </span>
                    <span className="text-[#8C9AB5]">{selectedNode.details.recommendation}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center text-[#8C9AB5]">
                <Info className="w-8 h-8 text-white/20 mb-2" />
                <p className="text-xs">Select any node on the graph canvas to view details</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={() => onNavigate('/reports')}
              className="text-xs font-semibold text-[#4DA3FF] hover:text-[#7CC4FF] flex items-center space-x-1"
            >
              <span>View Source Reports</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/assistant')}
              className="text-xs text-[#8C9AB5] hover:text-white"
            >
              Ask AI Copilot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
