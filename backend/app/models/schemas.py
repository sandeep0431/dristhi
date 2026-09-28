from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class TelemetryData(BaseModel):
    well_id: str = "X01"
    depth: float = 2800.0
    rop: float = 18.2
    rpm: float = 118.0
    torque: float = 42.5
    wob: float = 14.2
    mud_weight: float = 1.18
    pressure: float = 3210.0
    flow_rate: float = 2200.0
    timestamp: Optional[str] = None
    standpipe_pressure: Optional[float] = 3210.0

class AnomalyResult(BaseModel):
    is_anomaly: bool
    status: str
    anomaly_score: float
    confidence: float
    explanations: List[str]
    features_flagged: List[str]

class Formation(BaseModel):
    id: str
    name: str
    top_depth: float
    bottom_depth: float
    lithology: str
    risk_level: str
    color: str

class IncidentEvent(BaseModel):
    id: str
    well_id: str
    depth: float
    event_type: str
    formation: str
    severity: str
    description: str
    npt_hours: float
    source_document: str
    source_page: int
    recommendation: Optional[str] = None

class Well(BaseModel):
    id: str
    well_id: str
    name: str
    operator: str
    field: str
    latitude: float
    longitude: float
    total_depth: float
    formation: str
    hole_section: str
    status: str
    distance_km: Optional[float] = 0.0
    similarity_score: Optional[float] = None
    historical_event_count: int = 0
    current_depth: Optional[float] = None

class WellTwinFactor(BaseModel):
    formation: float
    depth: float
    trajectory: float
    parameters: float
    events: float
    spatial: float

class WellTwinResult(BaseModel):
    well_id: str
    name: str
    similarity: float
    distance_km: float
    total_depth: float
    formation: str
    factors: WellTwinFactor
    events_count: int
    primary_risks: List[str]
    evidence_notes: str

class RiskHorizonZone(BaseModel):
    risk_level: str
    start_depth: float
    end_depth: float
    distance_to_risk: float
    is_inside_zone: bool
    summary: str
    contributing_wells: List[str]
    events: List[IncidentEvent]
    factors: Dict[str, Any]

class ScenarioRequest(BaseModel):
    scenario: str
    target_depth: Optional[float] = None

class SimulationState(BaseModel):
    current_well_id: str
    scenario: str
    is_running: bool
    depth: float
    step_count: int
    telemetry: TelemetryData
    anomaly: AnomalyResult
    risk_horizon: RiskHorizonZone

class AssistantQueryRequest(BaseModel):
    query: str
    well_id: Optional[str] = "X01"
    current_depth: Optional[float] = 2800.0

class AssistantQueryResponse(BaseModel):
    answer: str
    confidence: float
    sources: List[Dict[str, Any]]
    evidence_events: List[Dict[str, Any]]
    suggested_actions: List[str]
    safety_reference: Optional[Dict[str, Any]] = None

class SafetyReference(BaseModel):
    reference_id: str
    risk_category: str
    safety_domain: str
    reference_title: str
    source: str
    guideline_summary: str
    mandatory_checks: List[str]
    engineering_disclaimer: str
