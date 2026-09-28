import asyncio
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any

from app.models.schemas import (
    TelemetryData, AnomalyResult, Well, WellTwinResult,
    RiskHorizonZone, ScenarioRequest, AssistantQueryRequest,
    AssistantQueryResponse
)
from app.data.seed_data import (
    CURRENT_WELL, OFFSET_WELLS, FORMATIONS, HISTORICAL_INCIDENTS,
    SAFETY_REFERENCES, DEMO_REPORTS, TM_PROFILE_X01, TM_PROFILE_X04
)
from app.services.simulation import simulator
from app.services.welltwin import WellTwinService
from app.services.risk_horizon import RiskHorizonService
from app.graph.incident_graph import IncidentGraphService
from app.rag.assistant import assistant_engine
from app.ml.anomaly import anomaly_engine

app = FastAPI(
    title="DRISHTI-NWIS API",
    description="Drilling Risk Intelligence & Safety History Interface Backend",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- WELLS ENDPOINTS -----------------

@app.get("/api/wells")
def list_wells():
    """Returns all wells including current active well and offset historical wells."""
    all_wells = []
    # Current active well
    all_wells.append({
        **CURRENT_WELL,
        "is_current": True,
        "similarity_score": 100.0,
        "distance_km": 0.0
    })
    # Offset wells
    twins = {t["well_id"]: t["similarity"] for t in WellTwinService.get_twins()}
    for w in OFFSET_WELLS:
        all_wells.append({
            **w,
            "is_current": False,
            "similarity_score": twins.get(w["well_id"], 50.0)
        })
    return all_wells

@app.get("/api/wells/{well_id}")
def get_well(well_id: str):
    """Returns details for a specific well."""
    if well_id.upper() == "X01" or well_id.upper() == CURRENT_WELL["id"].upper():
        state = simulator.get_state()
        return {
            **CURRENT_WELL,
            "is_current": True,
            "current_depth": state["depth"],
            "live_telemetry": state["telemetry"],
            "anomaly": state["anomaly"],
            "risk_horizon": state["risk_horizon"]
        }
    for w in OFFSET_WELLS:
        if w["well_id"].upper() == well_id.upper() or w["id"].upper() == well_id.upper():
            twin_info = WellTwinService.get_twin_detail(w["well_id"])
            events = [e for e in HISTORICAL_INCIDENTS if e["well_id"] == w["well_id"]]
            return {
                **w,
                "is_current": False,
                "twin_factors": twin_info.get("factors"),
                "similarity_score": twin_info.get("similarity"),
                "events": events
            }
    raise HTTPException(status_code=404, detail="Well not found")

@app.get("/api/wells/{well_id}/nearby")
def get_nearby_wells(well_id: str, radius: float = Query(15.0, description="Radius in km")):
    """Returns nearby offset wells within given radius."""
    nearby = [w for w in OFFSET_WELLS if w.get("distance_km", 999.0) <= radius]
    twins = {t["well_id"]: t["similarity"] for t in WellTwinService.get_twins()}
    for w in nearby:
        w["similarity_score"] = twins.get(w["well_id"], 50.0)
    nearby.sort(key=lambda x: x["distance_km"])
    return nearby

@app.get("/api/wells/{well_id}/events")
def get_well_events(well_id: str):
    """Returns historical incidents for the well."""
    events = [e for e in HISTORICAL_INCIDENTS if e["well_id"].upper() == well_id.upper()]
    return events

@app.get("/api/formations")
def list_formations():
    """Returns basin stratigraphic formation columns."""
    return FORMATIONS

@app.get("/api/incidents")
def list_incidents():
    """Returns all historical incidents in the field."""
    return HISTORICAL_INCIDENTS

# ----------------- SIMULATION & LIVE MONITORING -----------------

@app.get("/api/live/{well_id}")
def get_live_data(well_id: str):
    """Returns current live telemetry and risk status for the current active well."""
    return simulator.get_state()

@app.get("/api/simulation/state")
def get_simulation_state():
    return simulator.get_state()

@app.post("/api/simulation/scenario")
def set_scenario(req: ScenarioRequest):
    return simulator.set_scenario(req.scenario, req.target_depth)

@app.post("/api/simulation/depth")
def set_depth(payload: Dict[str, float]):
    depth = payload.get("depth", 2800.0)
    return simulator.set_depth(depth)

@app.post("/api/simulation/step")
def step_simulation():
    return simulator.step()

@app.post("/api/simulation/start")
def start_simulation():
    return simulator.start()

@app.post("/api/simulation/pause")
def pause_simulation():
    return simulator.pause()

@app.post("/api/simulation/reset")
def reset_simulation():
    return simulator.reset()

# ----------------- WELLTWIN INTELLIGENCE -----------------

@app.get("/api/welltwin/{well_id}")
def get_well_twins(well_id: str):
    """Returns ranked WellTwin similarity results."""
    return WellTwinService.get_twins(well_id)

@app.get("/api/welltwin/{well_id}/detail")
def get_twin_detail(well_id: str):
    return WellTwinService.get_twin_detail(well_id)

# ----------------- RISK HORIZON & ANOMALIES -----------------

@app.get("/api/risk/{well_id}")
@app.get("/api/risk-horizon/{well_id}")
def get_risk_horizon(well_id: str):
    state = simulator.get_state()
    return state["risk_horizon"]

@app.get("/api/anomalies/{well_id}")
def get_anomalies(well_id: str):
    state = simulator.get_state()
    return state["anomaly"]

# ----------------- INCIDENT GRAPH -----------------

@app.get("/api/graph/{well_id}")
def get_incident_graph(well_id: str = "X04"):
    return IncidentGraphService.get_graph(well_id)

# ----------------- DRILLING TIME MACHINE -----------------

@app.get("/api/timemachine/{well_id}")
def get_time_machine_logs(well_id: str = "X04"):
    """Returns synchronous depth profiles for current well X01 vs historical WellTwin X04."""
    return {
        "current_well_id": "X01",
        "historical_well_id": "X04",
        "current_profile": TM_PROFILE_X01,
        "historical_profile": TM_PROFILE_X04,
        "depth_range": {"min": 2750, "max": 2950},
        "critical_depths": [2850, 2870, 2910]
    }

# ----------------- SAFETY CONTEXT -----------------

@app.get("/api/safety")
def list_safety_references():
    return SAFETY_REFERENCES

@app.get("/api/safety/{risk_category}")
def get_safety_by_category(risk_category: str):
    for s in SAFETY_REFERENCES:
        if s["risk_category"].upper() == risk_category.upper():
            return s
    return SAFETY_REFERENCES[0]

# ----------------- DEMO REPORTS & DOCUMENTS -----------------

@app.get("/api/reports")
def list_reports():
    return DEMO_REPORTS

@app.get("/api/reports/{report_id}")
def get_report(report_id: str):
    for r in DEMO_REPORTS:
        if r["id"] == report_id or r["filename"] == report_id:
            return r
    raise HTTPException(status_code=404, detail="Report not found")

# ----------------- RAG ENGINEERING ASSISTANT -----------------

@app.post("/api/assistant/query", response_model=AssistantQueryResponse)
def query_assistant(req: AssistantQueryRequest):
    result = assistant_engine.answer_query(
        query=req.query,
        well_id=req.well_id or "X01",
        current_depth=req.current_depth or simulator.current_depth
    )
    return result

# ----------------- WEBSOCKET STREAM -----------------

@app.websocket("/api/live/{well_id}/stream")
async def websocket_stream(websocket: WebSocket, well_id: str):
    await websocket.accept()
    try:
        while True:
            # If simulation is marked running, advance a step
            if simulator.is_running:
                simulator.step()
            state = simulator.get_state()
            await websocket.send_text(json.dumps(state))
            await asyncio.sleep(1.5)
    except WebSocketDisconnect:
        pass
    except Exception:
        pass
