import {
  SimulationState, Well, Formation, IncidentEvent,
  WellTwinResult, SafetyReference, AssistantResponse,
  IncidentGraphData
} from '../types';

const API_BASE = 'http://localhost:8000/api';

// Fallback seed data in case backend server is starting or offline
import {
  fallbackWells, fallbackFormations, fallbackIncidents,
  fallbackSafety, fallbackTwinResults, fallbackGraph,
  fallbackTimeMachine, initialSimulationState
} from './fallbackData';

class ApiService {
  private isOnline = false;

  constructor() {
    this.checkHealth();
  }

  private async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/simulation/state`, { signal: AbortSignal.timeout(2000) });
      this.isOnline = res.ok;
    } catch {
      this.isOnline = false;
    }
  }

  async getSimulationState(): Promise<SimulationState> {
    try {
      const res = await fetch(`${API_BASE}/simulation/state`);
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }
    return localSimulator.getState();
  }

  async setScenario(scenario: string, targetDepth?: number): Promise<SimulationState> {
    try {
      const res = await fetch(`${API_BASE}/simulation/scenario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario, target_depth: targetDepth })
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localSimulator.setScenario(scenario, targetDepth);
  }

  async setDepth(depth: number): Promise<SimulationState> {
    try {
      const res = await fetch(`${API_BASE}/simulation/depth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ depth })
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localSimulator.setDepth(depth);
  }

  async stepSimulation(): Promise<SimulationState> {
    try {
      const res = await fetch(`${API_BASE}/simulation/step`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localSimulator.step();
  }

  async startSimulation(): Promise<SimulationState> {
    try {
      const res = await fetch(`${API_BASE}/simulation/start`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localSimulator.start();
  }

  async pauseSimulation(): Promise<SimulationState> {
    try {
      const res = await fetch(`${API_BASE}/simulation/pause`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localSimulator.pause();
  }

  async resetSimulation(): Promise<SimulationState> {
    try {
      const res = await fetch(`${API_BASE}/simulation/reset`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localSimulator.reset();
  }

  async getWells(): Promise<Well[]> {
    try {
      const res = await fetch(`${API_BASE}/wells`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return fallbackWells;
  }

  async getWell(id: string): Promise<Well> {
    try {
      const res = await fetch(`${API_BASE}/wells/${id}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const found = fallbackWells.find(w => w.well_id.toUpperCase() === id.toUpperCase() || w.id.toUpperCase() === id.toUpperCase());
    return found || fallbackWells[0];
  }

  async getFormations(): Promise<Formation[]> {
    try {
      const res = await fetch(`${API_BASE}/formations`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return fallbackFormations;
  }

  async getIncidents(): Promise<IncidentEvent[]> {
    try {
      const res = await fetch(`${API_BASE}/incidents`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return fallbackIncidents;
  }

  async getWellTwins(wellId: string = 'X01'): Promise<WellTwinResult[]> {
    try {
      const res = await fetch(`${API_BASE}/welltwin/${wellId}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return fallbackTwinResults;
  }

  async getGraph(wellId: string = 'X04'): Promise<IncidentGraphData> {
    try {
      const res = await fetch(`${API_BASE}/graph/${wellId}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return fallbackGraph;
  }

  async getTimeMachineLogs(wellId: string = 'X04'): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/timemachine/${wellId}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return fallbackTimeMachine;
  }

  async getSafety(): Promise<SafetyReference[]> {
    try {
      const res = await fetch(`${API_BASE}/safety`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return fallbackSafety;
  }

  async queryAssistant(query: string, wellId: string = 'X01', currentDepth: number = 2800): Promise<AssistantResponse> {
    try {
      const res = await fetch(`${API_BASE}/assistant/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, well_id: wellId, current_depth: currentDepth })
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localAssistantQuery(query, currentDepth);
  }
}

// Local simulation fallback engine for guaranteed 100% uptime in UI
class LocalSimulator {
  private state: SimulationState = JSON.parse(JSON.stringify(initialSimulationState));

  getState(): SimulationState {
    return this.state;
  }

  setScenario(scenario: any, targetDepth?: number): SimulationState {
    this.state.scenario = scenario;
    if (targetDepth) this.state.depth = targetDepth;
    this.updateCalculations();
    return this.state;
  }

  setDepth(depth: number): SimulationState {
    this.state.depth = Math.max(2700, Math.min(3200, depth));
    this.updateCalculations();
    return this.state;
  }

  start(): SimulationState {
    this.state.is_running = true;
    return this.state;
  }

  pause(): SimulationState {
    this.state.is_running = false;
    return this.state;
  }

  reset(): SimulationState {
    this.state = JSON.parse(JSON.stringify(initialSimulationState));
    return this.state;
  }

  step(): SimulationState {
    this.state.step_count += 1;
    if (this.state.scenario === 'combined' || this.state.scenario === 'risk_zone') {
      if (this.state.depth < 2920) this.state.depth += 5;
      else this.state.depth = 2800;
    } else {
      this.state.depth = Number((this.state.depth + 0.5).toFixed(1));
      if (this.state.depth > 2815) this.state.depth = 2800;
    }
    this.updateCalculations();
    return this.state;
  }

  private updateCalculations() {
    const depth = this.state.depth;
    let torque = 42.5;
    let rop = 18.2;
    let pressure = 3210;
    
    if (this.state.scenario === 'torque_anomaly') {
      torque = 58.4;
      rop = 13.1;
      pressure = 3280;
    } else if (this.state.scenario === 'combined') {
      if (depth < 2835) {
        const ratio = (depth - 2800) / 35;
        torque = 42.5 + ratio * 12;
        rop = 18.2 - ratio * 4;
        pressure = 3210 - ratio * 40;
      } else if (depth < 2865) {
        const ratio = (depth - 2835) / 30;
        torque = 54.5 + ratio * 8;
        rop = 14.2 - ratio * 3.5;
        pressure = 3030 + ratio * 120;
      } else if (depth < 2895) {
        const ratio = (depth - 2865) / 30;
        torque = 62.5 + ratio * 6;
        rop = 10.7 - ratio * 7;
        pressure = 3280 + ratio * 80;
      } else {
        torque = 71;
        rop = 0.5;
        pressure = 3450;
      }
    } else if (this.state.scenario === 'risk_zone') {
      if (depth >= 2850 && depth < 2865) {
        pressure = 3030;
        torque = 46;
      } else if (depth >= 2865 && depth < 2890) {
        torque = 58.2;
        rop = 12.5;
      } else if (depth >= 2890) {
        torque = 66;
        rop = 1.0;
      }
    }

    this.state.telemetry = {
      well_id: 'X01',
      depth: Number(depth.toFixed(1)),
      rop: Number(rop.toFixed(1)),
      rpm: 118,
      torque: Number(torque.toFixed(1)),
      wob: 14.2,
      mud_weight: 1.18,
      pressure: Math.round(pressure),
      flow_rate: 2200,
      standpipe_pressure: Math.round(pressure)
    };

    const isAnomaly = torque > 48 || rop < 14 || pressure < 3100 || pressure > 3300;
    const explanations: string[] = [];
    const flagged: string[] = [];

    if (torque > 48) {
      flagged.push('torque');
      const pct = (((torque - 42.5) / 42.5) * 100).toFixed(1);
      explanations.push(`Torque +${pct}% above rolling baseline (${torque.toFixed(1)} kN·m)`);
    }
    if (rop < 14) {
      flagged.push('rop');
      explanations.push(`ROP dropped to ${rop.toFixed(1)} m/hr`);
    }
    if (pressure < 3100) {
      flagged.push('pressure');
      explanations.push(`Standpipe pressure loss: -${3210 - pressure} psi (mud loss indication)`);
    }

    this.state.anomaly = {
      is_anomaly: isAnomaly,
      status: isAnomaly ? (torque > 60 ? 'CRITICAL_ANOMALY' : 'ELEVATED_ANOMALY') : 'NORMAL',
      anomaly_score: isAnomaly ? -0.18 : 0.08,
      confidence: isAnomaly ? 95.5 : 98.0,
      explanations: explanations.length > 0 ? explanations : ['All parameters within nominal Barail baseline tolerances'],
      features_flagged: flagged
    };

    const distToRisk = Math.max(0, 2850 - depth);
    const isInside = depth >= 2850 && depth <= 2910;
    let riskLevel: any = 'LOW';
    let summary = 'Nominal formation interval.';

    if (isInside) {
      riskLevel = 'CRITICAL';
      summary = `BIT INSIDE HISTORICAL INCIDENT ZONE (${depth.toFixed(0)}m). Active Mud Loss & Differential Sticking hazards.`;
    } else if (distToRisk <= 25) {
      riskLevel = isAnomaly ? 'CRITICAL' : 'HIGH';
      summary = `IMMINENT RISK: Only ${distToRisk.toFixed(0)}m to historical severe incident cluster (2850m - 2910m).`;
    } else if (distToRisk <= 70) {
      riskLevel = isAnomaly ? 'HIGH' : 'ELEVATED';
      summary = `ELEVATED RISK ZONE ahead: Approaching 2850m-2910m interval with 3 historical offset incidents.`;
    }

    this.state.risk_horizon = {
      risk_level: riskLevel,
      start_depth: 2850,
      end_depth: 2910,
      distance_to_risk: Number(distToRisk.toFixed(1)),
      is_inside_zone: isInside,
      summary,
      contributing_wells: ['X04', 'X07', 'X11'],
      events: fallbackIncidents.filter(e => ['X04', 'X07', 'X11'].includes(e.well_id)),
      factors: {
        offset_wells_count: 3,
        top_twin_similarity: 91.0,
        formation_match: 'Barail Sandstone (Upper)',
        historical_npt_hours: 15.7,
        is_anomaly_amplified: isAnomaly
      }
    };
  }
}

const localSimulator = new LocalSimulator();

function localAssistantQuery(query: string, depth: number): AssistantResponse {
  const q = query.toLowerCase();
  if (q.includes('next 100m') || q.includes('concerned') || q.includes('ahead') || q.includes('why risk')) {
    return {
      answer: `**Engineering Risk Assessment for X01 (Interval ${depth.toFixed(0)}m – ${(depth + 100).toFixed(0)}m):**\n\nYou should maintain elevated vigilance across the upcoming **2850m – 2910m interval** in the Barail Sandstone Upper Member.\n\nThree highly correlated historical offset wells (**X04** at 91% similarity, **X07** at 84%, and **X11** at 76%) experienced severe non-productive drilling hazards in this exact stratigraphic window:\n\n1. **2850m – Mud Loss (Well X04):** Partial circulation loss (45 bbl/hr) with a 180 psi standpipe pressure drop across micro-fractured sandstone (4.0 hrs NPT).\n2. **2865m – Seepage Loss (Well X07):** 18 bbl/hr loss requiring fiber-based LCM blend.\n3. **2870m – Severe Torsional Stick-Slip (Wells X04 & X11):** Torque spikes up to 58.2 kN·m (+42% above baseline) inducing top-drive stalling.\n4. **2910m – Differential Stuck Pipe (Well X04):** Pipe stuck during connection survey with 380 psi overbalance, requiring 6.5 hours of jarring and acid soak.\n\n**Current Telemetry Correlation:** Live parameters show abnormal torque fluctuations while approaching 2850m, matching the pre-incident signature of Well X04.`,
      confidence: 94.5,
      sources: [
        { document: 'X04_Drilling_Report.pdf', page: 87, section: 'Operations 2840-2860m', excerpt: 'Partial lost circulation of 45 bbl/hr. Standpipe pressure dropped from 3210 to 3030 psi.' },
        { document: 'X04_Drilling_Report.pdf', page: 92, section: 'Operations 2900-2920m', excerpt: 'At 2910m MD, drillstring became differentially stuck across permeable sand body (6.5 hr NPT).' },
        { document: 'X07_Drilling_Report.pdf', page: 54, section: 'Operations 2860-2875m', excerpt: 'At 2865m MD, pit level dropped 18 bbl over 1 hour. Mild seepage loss noticed.' }
      ],
      evidence_events: fallbackIncidents.slice(0, 3),
      suggested_actions: [
        'Standby 50 bbl pre-mixed medium LCM pill in reserve pit before reaching 2850m',
        'Strictly enforce maximum stationary pipe limit of 3 minutes across Barail sand',
        'Reduce WOB by 15-20% and maintain 120-130 RPM to suppress torsional stick-slip harmonics',
        'Review OISD-STD-174 and IADC-SPP-04 stuck pipe guidelines with the rig crew'
      ],
      safety_reference: fallbackSafety[1]
    };
  } else if (q.includes('2850')) {
    return {
      answer: `**Historical Records for Depth Interval 2845m – 2870m:**\n\nIn offset well **X04** (4.2 km away, 91% WellTwin match), drilling into the Barail Sandstone at **2850m MD** resulted in severe partial circulation loss of 45 bbl/hr. Standpipe pressure declined from 3210 psi to 3030 psi. Crew pumped a 25 bbl medium-sized LCM pill (mica + walnut blend) restoring full returns after 4.0 hours NPT.\n\nAdditionally, Well **X07** at **2865m** observed 18 bbl/hr seepage loss, confirming a regional micro-fractured thief zone across the field at 2850m.`,
      confidence: 96.0,
      sources: [
        { document: 'X04_Drilling_Report.pdf', page: 87, section: 'Lost Circulation Record', excerpt: 'Standpipe pressure dropped from 3210 psi to 3030 psi. Flow sensor indicated 22% return loss.' }
      ],
      evidence_events: fallbackIncidents.filter(e => e.depth >= 2845 && e.depth <= 2870),
      suggested_actions: [
        'Check LCM inventory and pre-treat mud with bridging calcium carbonate',
        'Verify mud weight does not exceed 1.18 SG',
        'Calibrate pit volume totalizer alarms'
      ],
      safety_reference: fallbackSafety[2]
    };
  } else if (q.includes('similar') || q.includes('welltwin') || q.includes('twin')) {
    return {
      answer: `**Top Ranked WellTwin: Offset Well X04 (91.0% Similarity Match)**\n\nWell **X04** is located 4.2 km northwest of current well X01 and drilled through identical Barail Sandstone geology.\n\n**Multi-Factor Similarity Breakdown:**\n• Formation Lithology: **95%** (Identical Barail Upper Sandstone & hole diameter 8-1/2\")\n• Depth Profile: **92%** (Target depth 3350m vs X01 3450m)\n• Drilling Parameters: **89%** (Similar WOB, RPM, and rotary torque responses)\n• Trajectory: **81%** (Near-vertical S-profile with comparable dogleg severity)\n• Historical Event Correlation: **90%**\n• Geographic Proximity: **76%** (4.2 km offset along regional structural strike)\n\n**Operational Significance:** Well X04's historical timeline provides a high-confidence blueprint for what hazards to anticipate in X01 between 2850m and 2950m.`,
      confidence: 98.0,
      sources: [
        { document: 'X04_Drilling_Report.pdf', page: 1, section: 'Well Summary & Casing Scheme', excerpt: 'Well X04 drilled to 3350m TD in Upper Assam Barail structure.' }
      ],
      evidence_events: fallbackIncidents.filter(e => e.well_id === 'X04'),
      suggested_actions: [
        'Replay X04 parameters in the Drilling Time Machine module',
        'Compare current ROP and torque trends directly with X04 logs'
      ],
      safety_reference: fallbackSafety[1]
    };
  } else {
    return {
      answer: `**Operational Intelligence for Active Alert:**\n\n• **Risk State:** ELEVATED/CRITICAL – Bit approaching 2850m-2910m hazard zone.\n• **Physical Signature:** Torque elevated above rolling baseline with reduced ROP.\n• **Offset Corroboration:** Wells X04, X07, and X11 logged circulation loss, torsional vibration, and pipe sticking in this formation interval.`,
      confidence: 92.0,
      sources: [
        { document: 'X04_Drilling_Report.pdf', page: 87, section: 'DDR #42', excerpt: 'Circulation loss 45 bbl/hr at 2850m.' }
      ],
      evidence_events: fallbackIncidents.slice(0, 2),
      suggested_actions: ['Review stuck pipe prevention guidelines (IADC-SPP-04)', 'Ensure rotation and reciprocation during connections'],
      safety_reference: fallbackSafety[0]
    };
  }
}

export const api = new ApiService();
