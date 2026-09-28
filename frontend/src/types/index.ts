export interface TelemetryData {
  well_id: string;
  depth: number;
  rop: number;
  rpm: number;
  torque: number;
  wob: number;
  mud_weight: number;
  pressure: number;
  flow_rate: number;
  standpipe_pressure?: number;
  diff_pressure?: number;
  timestamp?: string;
}

export interface AnomalyResult {
  is_anomaly: boolean;
  status: 'NORMAL' | 'ELEVATED_ANOMALY' | 'CRITICAL_ANOMALY';
  anomaly_score: number;
  confidence: number;
  explanations: string[];
  features_flagged: string[];
}

export interface Formation {
  id: string;
  name: string;
  top_depth: number;
  bottom_depth: number;
  lithology: string;
  risk_level: string;
  color: string;
}

export interface IncidentEvent {
  id: string;
  well_id: string;
  well_name?: string;
  depth: number;
  event_type: 'MUD_LOSS' | 'HIGH_TORQUE' | 'STUCK_PIPE' | 'TIGHT_HOLE' | 'PACK_OFF' | 'GAS_INFLUX';
  formation: string;
  severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  description: string;
  npt_hours: number;
  source_document: string;
  source_page: number;
  recommendation?: string;
  parameters_snapshot?: {
    depth?: number;
    torque?: number;
    rop?: number;
    mud_weight?: number;
    pressure?: number;
  };
  depth_diff?: number;
  well_similarity?: number;
}

export interface Well {
  id: string;
  well_id: string;
  name: string;
  operator: string;
  field: string;
  latitude: number;
  longitude: number;
  total_depth: number;
  formation: string;
  hole_section: string;
  status: string;
  distance_km?: number;
  similarity_score?: number;
  historical_event_count: number;
  is_current?: boolean;
  current_depth?: number;
  drill_year?: number;
  live_telemetry?: TelemetryData;
  anomaly?: AnomalyResult;
  risk_horizon?: RiskHorizonZone;
  twin_factors?: WellTwinFactor;
  events?: IncidentEvent[];
}

export interface WellTwinFactor {
  formation: number;
  depth: number;
  trajectory: number;
  parameters: number;
  events: number;
  spatial: number;
}

export interface WellTwinResult {
  well_id: string;
  name: string;
  similarity: number;
  distance_km: number;
  total_depth: number;
  formation: string;
  factors: WellTwinFactor;
  events_count: number;
  primary_risks: string[];
  evidence_notes: string;
  latitude?: number;
  longitude?: number;
  incident_details?: IncidentEvent[];
}

export interface RiskHorizonZone {
  risk_level: 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
  start_depth: number;
  end_depth: number;
  distance_to_risk: number;
  is_inside_zone: boolean;
  summary: string;
  contributing_wells: string[];
  events: IncidentEvent[];
  factors: {
    offset_wells_count: number;
    top_twin_similarity: number;
    formation_match: string;
    historical_npt_hours: number;
    is_anomaly_amplified: boolean;
  };
}

export interface SimulationState {
  current_well_id: string;
  scenario: 'normal' | 'torque_anomaly' | 'risk_zone' | 'combined';
  is_running: boolean;
  depth: number;
  step_count: number;
  telemetry: TelemetryData;
  anomaly: AnomalyResult;
  risk_horizon: RiskHorizonZone;
}

export interface SafetyReference {
  reference_id: string;
  risk_category: string;
  safety_domain: string;
  reference_title: string;
  source: string;
  guideline_summary: string;
  mandatory_checks: string[];
  engineering_disclaimer: string;
}

export interface AssistantResponse {
  answer: string;
  confidence: number;
  sources: Array<{
    document: string;
    page: number;
    section: string;
    excerpt: string;
  }>;
  evidence_events: IncidentEvent[];
  suggested_actions: string[];
  safety_reference?: SafetyReference | null;
}

export interface GraphNode {
  id: string;
  label: string;
  group: 'well' | 'formation' | 'depth' | 'incident' | 'pattern' | 'npt' | 'document';
  details: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface IncidentGraphData {
  well_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata: {
    total_nodes: number;
    total_edges: number;
    ontology: string;
  };
}
