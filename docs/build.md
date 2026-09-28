# DRISHTI-NWIS --- BUILD.md

## 1. Build Objective

Build a polished, fully interactive SIH prototype of DRISHTI-NWIS.

The target is not production Oil India infrastructure. The target is a
convincing end-to-end demonstration of the proposed industry workflow.

The prototype should feel like a professional oil & gas operations
product, not a college CRUD dashboard.

------------------------------------------------------------------------

# 2. Recommended Stack

## Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   shadcn/ui
-   Lucide React
-   React Query
-   React Router
-   Recharts
-   React-Leaflet / Leaflet

## Backend

-   Python
-   FastAPI
-   Pydantic
-   SQLAlchemy

## Database

-   PostgreSQL
-   PostGIS

## AI / ML

-   scikit-learn
-   pandas
-   numpy
-   optional XGBoost
-   Isolation Forest for anomaly detection

## Documents

-   PyMuPDF
-   optional OCR using PaddleOCR/Tesseract

## RAG

-   FAISS or Chroma
-   embeddings
-   LLM API

## Knowledge Graph

-   Neo4j for the prototype

## Infrastructure

-   Docker / Docker Compose
-   `.env` for secrets

------------------------------------------------------------------------

# 3. Repository Structure

``` text
drishti-nwis/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── data/
│   │   ├── types/
│   │   └── lib/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── ml/
│   │   ├── rag/
│   │   ├── graph/
│   │   ├── safety/
│   │   └── main.py
│   ├── data/
│   ├── reports/
│   ├── requirements.txt
│   └── Dockerfile
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── knowledge/
│   ├── reports/
│   ├── safety/
│   └── vector_store/
│
├── docs/
│   ├── workflow.md
│   ├── build.md
│   └── design.md
│
├── docker-compose.yml
├── README.md
└── .env.example
```

------------------------------------------------------------------------

# 4. Build Order

Do not build the AI first.

Build in this order:

## Phase 1 --- Foundation

1.  Create React app.
2.  Create FastAPI service.
3.  Configure PostgreSQL.
4.  Configure PostGIS.
5.  Create base layout.
6.  Create routing.
7.  Seed demo wells.

Deliverable:

**Dashboard + database + navigation.**

------------------------------------------------------------------------

# 5. Phase 2 --- Well Data

Create tables:

### wells

``` text
id
well_id
name
latitude
longitude
total_depth
formation
status
operator
```

### drilling_parameters

``` text
id
well_id
timestamp
depth
rop
rpm
torque
wob
mud_weight
pressure
flow_rate
```

### formations

``` text
id
well_id
name
top_depth
bottom_depth
```

### incidents

``` text
id
well_id
depth
event_type
formation
severity
description
npt_hours
source_document
source_page
```

### trajectories

``` text
id
well_id
measured_depth
latitude
longitude
inclination
azimuth
```

Deliverable:

**Well map + well details + historical events.**

------------------------------------------------------------------------

# 6. Phase 3 --- Live Simulation

Create a backend simulator.

Example:

``` python
{
    "well_id": "X01",
    "depth": 2800,
    "rop": 18.2,
    "rpm": 118,
    "torque": 43,
    "wob": 14.2,
    "mud_weight": 1.18,
    "pressure": 3210
}
```

Every few seconds update the values.

Create scenarios:

### normal

Stable parameters.

### torque_anomaly

``` text
Torque rises
ROP falls
```

### risk_zone

Depth approaches historical incident.

### combined

Torque anomaly + historical risk zone.

Use WebSocket or polling.

For the prototype, WebSocket is preferred.

------------------------------------------------------------------------

# 7. Phase 4 --- Nearby Well Engine

Use PostGIS.

Input:

``` text
current_well_id
radius_km
```

Return nearby wells.

Example endpoint:

``` text
GET /api/wells/{well_id}/nearby?radius=10
```

Also calculate:

-   distance
-   formation match
-   event count

------------------------------------------------------------------------

# 8. Phase 5 --- WellTwin Engine

Create a weighted similarity model.

Example prototype formula:

``` text
similarity =
    0.25 * formation_similarity +
    0.20 * depth_similarity +
    0.15 * trajectory_similarity +
    0.20 * parameter_similarity +
    0.10 * event_similarity +
    0.10 * spatial_relevance
```

Normalize to 0--100.

Do not present these weights as scientifically validated production
weights.

Label:

**Prototype similarity model**

Return:

``` json
{
  "well_id": "X04",
  "similarity": 91,
  "factors": {
    "formation": 95,
    "depth": 92,
    "trajectory": 81,
    "parameters": 89,
    "events": 90,
    "spatial": 76
  }
}
```

------------------------------------------------------------------------

# 9. Phase 6 --- Risk Horizon

For each historical incident:

``` text
depth_difference = event_depth - current_depth
```

Create an upcoming zone when:

``` text
0 < depth_difference <= horizon_distance
```

Combine with:

-   event frequency
-   WellTwin similarity
-   formation similarity
-   current anomaly

Return:

``` json
{
  "risk_level": "HIGH",
  "start_depth": 2850,
  "end_depth": 2910,
  "events": [...]
}
```

The frontend visualizes this as the Risk Horizon.

------------------------------------------------------------------------

# 10. Phase 7 --- Anomaly Detection

Start with a simple hybrid engine.

### Rules

Examples:

``` text
Torque > baseline + threshold
ROP decreases significantly
Pressure deviates from rolling baseline
```

### ML

Use Isolation Forest on:

``` text
ROP
RPM
Torque
WOB
Pressure
Mud Weight
Flow Rate
```

Output:

``` text
NORMAL
or
ANOMALY
```

Then create an explanation:

``` text
Torque +31% above rolling baseline
ROP -22% from baseline
```

------------------------------------------------------------------------

# 11. Phase 8 --- Incident Graph

Create Neo4j relationships:

``` text
(WELL)-[:HAS_FORMATION]->(FORMATION)
(WELL)-[:HAS_EVENT]->(EVENT)
(EVENT)-[:OCCURRED_AT]->(DEPTH)
(EVENT)-[:ASSOCIATED_WITH]->(PARAMETER_PATTERN)
(EVENT)-[:HAS_SOURCE]->(DOCUMENT)
(EVENT)-[:CAUSED_NPT]->(NPT)
```

For the prototype, keep the graph small and visually understandable.

------------------------------------------------------------------------

# 12. Phase 9 --- Historical Documents

Create 5--10 representative demo reports.

Each report should contain believable but clearly synthetic data.

Pipeline:

``` text
PDF
 ↓
PyMuPDF
 ↓
Text
 ↓
Extraction
 ↓
Structured event
 ↓
Database
```

If using LLM extraction, validate the returned fields before inserting
them.

Never blindly trust generated structured data.

------------------------------------------------------------------------

# 13. Phase 10 --- RAG Assistant

Index report chunks.

Metadata should include:

``` text
well_id
depth
formation
event_type
source_document
source_page
```

Retrieval query example:

``` text
"What happened near 2850m?"
```

Retrieve: - incident records - report chunks - relevant well data

Then generate the response.

Every response should show:

**Sources**

``` text
X04_Drilling_Report.pdf — p.87
X07_Drilling_Report.pdf — p.54
```

If evidence isn't found:

> "The prototype knowledge base does not contain enough evidence to
> answer this reliably."

------------------------------------------------------------------------

# 14. Phase 11 --- Safety Context

Create a small structured safety-reference dataset.

Fields:

``` text
risk_category
safety_domain
reference_title
reference_id
description
source
```

Example:

``` text
WELL_CONTROL
Well Control
OISD reference
...
```

The UI should display:

**Reference for engineer review**

not an automatic instruction.

------------------------------------------------------------------------

# 15. Phase 12 --- Time Machine

Frontend:

-   depth slider
-   play/pause
-   historical parameter charts
-   current vs historical toggle

At every slider position:

``` text
historical_depth
historical_parameters
historical_event
current_depth
current_parameters
```

Overlay them visually.

------------------------------------------------------------------------

# 16. API Plan

### Wells

``` text
GET /api/wells
GET /api/wells/{id}
GET /api/wells/{id}/nearby
GET /api/wells/{id}/events
```

### Live

``` text
GET /api/live/{well_id}
WS  /api/live/{well_id}/stream
POST /api/simulation/scenario
```

### Intelligence

``` text
GET /api/welltwin/{well_id}
GET /api/risk/{well_id}
GET /api/risk-horizon/{well_id}
GET /api/anomalies/{well_id}
```

### Graph

``` text
GET /api/graph/well/{id}
GET /api/graph/event/{id}
```

### Reports

``` text
POST /api/reports/upload
POST /api/reports/process
GET /api/reports/{id}
```

### AI

``` text
POST /api/assistant/query
```

### Safety

``` text
GET /api/safety/{risk_category}
```

------------------------------------------------------------------------

# 17. Frontend Routes

``` text
/
               Landing

/dashboard
               Operations Overview

/live
               Current Well Monitoring

/wells
               Well Explorer

/wells/:id
               Well Intelligence

/welltwin/:id
               WellTwin analysis

/risk/:id
               Risk Horizon

/time-machine/:id
               Historical replay

/incidents
               Incident explorer

/graph/:id
               Knowledge graph

/safety
               Safety context

/assistant
               Engineering AI assistant
```

------------------------------------------------------------------------

# 18. Demo Controls

Add a small **Demo Control** panel that is visible only in
prototype/demo mode.

Controls:

``` text
Scenario:
[ Normal ]
[ Torque Anomaly ]
[ Historical Risk ]
[ Combined Risk ]

Depth:
[ 2800m ] ───────

Simulation:
▶ Start
⏸ Pause
↻ Reset
```

This makes the SIH demo deterministic.

------------------------------------------------------------------------

# 19. Demo Script

Use this exact sequence:

1.  Open DRISHTI landing page.
2.  Click **Open Operations**.
3.  Show X01 at 2800m.
4.  Start live simulation.
5.  Torque starts rising.
6.  Show anomaly.
7.  Open WellTwin.
8.  Show X04 = 91% similarity.
9.  Open Risk Horizon.
10. Show 2850--2910m risk zone.
11. Click "Why?"
12. Show three historical events.
13. Open Time Machine.
14. Replay X04.
15. Open Incident Graph.
16. Open Safety Context.
17. Ask AI: **"Why should I be concerned about the next 100m?"**
18. Show evidence-backed response.
19. Return to dashboard.

Target demo time:

**4--6 minutes.**

------------------------------------------------------------------------

# 20. Quality Requirements

The prototype must:

-   load quickly
-   avoid broken navigation
-   show loading states
-   show empty states
-   show error states
-   work on laptop screens
-   maintain consistent terminology
-   never show fake "real-time Oil India data"
-   clearly label simulated data
-   show source/evidence for AI claims
-   avoid hallucinated safety instructions

------------------------------------------------------------------------

# 21. Final Build Priority

If time becomes limited:

### Must have

1.  Dashboard
2.  Live simulation
3.  Well map
4.  Historical events
5.  WellTwin
6.  Risk Horizon
7.  Explainability
8.  Time Machine
9.  AI assistant

### Next

10. Incident graph
11. Document upload
12. Safety context

### Later

13. Advanced ML
14. Advanced OCR
15. Production deployment
16. Enterprise authentication

The prototype should prioritize a coherent demo over technical
complexity.
