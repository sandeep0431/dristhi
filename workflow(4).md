# DRISHTI-NWIS --- WORKFLOW

## 1. Project Goal

DRISHTI-NWIS is a prototype of an AI-powered Nearby Wells Intelligence
and decision-support platform for drilling operations.

The prototype must demonstrate the complete proposed workflow:

**Current Well → Live/Simulated Drilling Data → Nearby/Relevant Wells →
Historical Intelligence → WellTwin Matching → Anomaly Detection →
Adaptive Risk Horizon → Incident Evidence → Safety Context → Engineer
Decision Support**

The prototype is a demonstration system. It must clearly separate: -
**Real/implemented prototype functionality** - **Simulated
drilling/eRTMAC data** - **Representative/demo historical well data** -
**Production integrations proposed for future deployment**

Never claim that demo data is Oil India operational data.

------------------------------------------------------------------------

# 2. Primary User

### Drilling Engineer

The engineer should be able to: 1. Select a current well. 2. Monitor its
simulated live drilling parameters. 3. View relevant nearby/offset
wells. 4. Inspect historical events. 5. Find the most behaviorally
similar historical wells. 6. See upcoming risk zones along the current
depth. 7. Understand why a risk was raised. 8. Replay a historical well
against the current well. 9. Inspect source evidence. 10. Ask the
engineering AI assistant questions. 11. View relevant safety/OISD
references for review.

The system is decision support only. It must not automatically control
drilling operations or claim regulatory compliance.

------------------------------------------------------------------------

# 3. Main Application Flow

``` text
LANDING PAGE
    ↓
OPEN DRISHTI
    ↓
OPERATIONS DASHBOARD
    ↓
SELECT CURRENT WELL
    ↓
LIVE WELL MONITOR
    ↓
NEARBY / RELEVANT WELL MAP
    ↓
WELLTWIN FINDER
    ↓
HISTORICAL EVENT CORRELATION
    ↓
RISK HORIZON
    ↓
ANOMALY DETECTION
    ↓
EXPLAINABLE ALERT
    ↓
INCIDENT GRAPH / EVIDENCE
    ↓
DRILLING TIME MACHINE
    ↓
SAFETY CONTEXT
    ↓
AI ENGINEERING ASSISTANT
```

------------------------------------------------------------------------

# 4. Landing Page Workflow

The landing page is a product introduction, not the operational
dashboard.

It should contain:

-   DRISHTI logo/name
-   Short statement: **"Learn from every well. Anticipate the next
    risk."**
-   Petroleum/drilling visual language
-   Short explanation of the platform
-   Key capabilities
-   A small animated drilling/risk visualization
-   CTA: **Open Operations**
-   Secondary CTA: **Explore Intelligence**

The landing page must immediately communicate: **oil & gas + industrial
AI + safety + intelligence**.

------------------------------------------------------------------------

# 5. Operations Dashboard

## Purpose

Give the engineer a single operational overview.

## Display

### Current Well

-   Well ID
-   Current depth
-   Formation
-   Hole section
-   Well status

### Live Parameters

-   Depth
-   ROP
-   RPM
-   Torque
-   WOB
-   Mud weight
-   Standpipe pressure
-   Flow rate

### Risk Summary

-   Current risk state
-   Risk score
-   Confidence/evidence strength
-   Upcoming risk interval

### Quick Panels

-   Relevant WellTwins
-   Recent anomalies
-   Upcoming events
-   Safety context

------------------------------------------------------------------------

# 6. Simulated Live Data Workflow

Because actual eRTMAC access is not available for the prototype,
implement a simulation.

The simulator should update values every few seconds.

Example:

``` text
Depth:
2800 → 2805 → 2810 → 2815 ...

Torque:
42 → 43 → 45 → 48 → 53 ...

ROP:
18.5 → 18.2 → 17.8 → 16.9 ...
```

The system should intentionally create a few scenarios:

### Scenario A --- Normal

Stable parameters, low risk.

### Scenario B --- Torque anomaly

Torque rises while ROP decreases.

### Scenario C --- Upcoming historical risk

Current depth approaches a known historical event zone.

### Scenario D --- Combined risk

A live anomaly occurs while approaching a historical risk zone.

Scenario D should be the main SIH demo.

------------------------------------------------------------------------

# 7. Nearby Wells Workflow

When the engineer selects the current well:

``` text
Current Well
    ↓
Coordinates
    ↓
PostGIS spatial query
    ↓
Candidate offset wells
```

Show them on a map.

Each well should have: - distance - formation - total depth - historical
event count - relevance score

The map should visually distinguish: - Current well - Relevant wells -
Other nearby wells - High-risk historical wells

------------------------------------------------------------------------

# 8. WellTwin Finder Workflow

This is a core innovation.

Do not rank wells only by geographic distance.

Calculate a prototype similarity score using:

``` text
Geographic relevance
Depth similarity
Formation similarity
Trajectory similarity
Drilling-parameter similarity
Historical-event similarity
```

Example:

``` text
Well X04     91%
Well X07     84%
Well X11     76%
```

When the engineer opens a WellTwin:

Show:

``` text
Formation similarity      95%
Depth similarity          92%
Parameter similarity      89%
Trajectory similarity     81%
Spatial relevance         76%
```

Also show the underlying evidence.

------------------------------------------------------------------------

# 9. Historical Intelligence Workflow

Historical reports are processed into structured events.

Example source text:

``` text
Partial loss of circulation was observed at 2850m
while drilling Formation XYZ.
```

Extract:

``` json
{
  "well_id": "X04",
  "depth": 2850,
  "event_type": "MUD_LOSS",
  "formation": "XYZ",
  "severity": "HIGH"
}
```

The prototype can use: - representative PDFs - CSV records - synthetic
reports - manually prepared structured data

For scanned reports, OCR can be demonstrated using a sample document.

------------------------------------------------------------------------

# 10. Incident Knowledge Graph Workflow

Represent relationships between:

``` text
Well
 ↓
Formation
 ↓
Depth
 ↓
Parameter pattern
 ↓
Anomaly
 ↓
Incident
 ↓
Historical response
 ↓
NPT
 ↓
Source document
```

Example:

``` text
Formation XYZ
    ↓
High Torque
    ↓
Abnormal trend
    ↓
Stuck Pipe
    ↓
6.5 hr NPT
```

The graph should be inspectable from the UI.

Clicking a node should show the underlying record/source.

------------------------------------------------------------------------

# 11. Adaptive Risk Horizon Workflow

The Risk Horizon is the primary visual feature.

Example:

``` text
CURRENT 2800m
      ↓
2800 ─── 2850 ─── 2870 ─── 2910 ───── 3300
          🔴          🟠          🔴
        Mud Loss    Torque      Stuck Pipe
```

The system should consider:

-   distance from current depth
-   historical event frequency
-   formation similarity
-   WellTwin similarity
-   current anomaly state

The horizon must update when the simulated depth changes.

Example:

``` text
At 2800m:
2850–2910 = elevated historical risk

At 2840m:
Current well is 10m from the first event

At 2860m:
Current well is inside the historical risk zone
```

------------------------------------------------------------------------

# 12. Anomaly Detection Workflow

Prototype anomaly detection can use: - Isolation Forest - rule-based
thresholds - moving-window trends

Example:

``` text
Torque baseline: 35–45
Current:
47 → 51 → 56 → 62
```

Detect:

**Abnormal torque trend**

Then correlate it with historical data.

``` text
Current anomaly
    ↓
Find historical matching signatures
    ↓
Well X04
    ↓
Similar trend preceded Stuck Pipe
```

The UI must explain that this is a historical pattern match, not a
guaranteed prediction.

------------------------------------------------------------------------

# 13. Explainable Risk Workflow

Every alert must answer:

### What?

What risk/event category was detected?

### Why?

What evidence caused the alert?

### Where?

Which depth/formation?

### Which wells?

Which historical wells support it?

### How strong?

Confidence/evidence strength.

### Source?

Which report/record supports the claim?

Example:

``` text
HIGH RISK

Why:
✓ 3 relevant offset wells
✓ Same formation
✓ Historical events within 60m
✓ Current torque anomaly
✓ Similar WellTwin behaviour

Evidence:
X04 → Mud Loss @ 2850m
X07 → Mud Loss @ 2865m
X11 → High Torque @ 2870m
```

------------------------------------------------------------------------

# 14. Drilling Time Machine Workflow

Select a historical WellTwin.

Display a depth slider.

``` text
2700 ─── 2800 ─── 2850 ─── 2910
                     ▲
                  CURRENT
```

Replay historical: - depth - torque - ROP - RPM - pressure

Compare against current well.

The user should be able to: - play - pause - move the depth slider -
toggle current/historical - inspect the event that occurred at a given
depth

------------------------------------------------------------------------

# 15. Safety Context Workflow

When a risk is detected:

``` text
Risk category
    ↓
Safety category
    ↓
Relevant official reference
    ↓
Engineer review
```

Example:

``` text
Potential well-control concern

Relevant safety domain:
Well Control

Reference:
Applicable OISD material

Status:
Review required
```

The system must not: - claim certification - claim legal compliance -
automatically issue operational instructions - invent OISD requirements

------------------------------------------------------------------------

# 16. AI Engineering Assistant Workflow

The assistant must use retrieved project data.

Example questions:

-   "Why is the current well at elevated risk?"
-   "What happened around 2850m in nearby wells?"
-   "Which historical well is most similar?"
-   "Show evidence for the current alert."
-   "Compare the current well with X04."
-   "What safety reference should I review for this risk category?"

Pipeline:

``` text
User Question
    ↓
Intent Detection
    ↓
Retrieve structured data
    ↓
Retrieve relevant report chunks
    ↓
Build evidence context
    ↓
LLM response
    ↓
Citations/source records
```

The assistant should refuse to invent missing evidence and say when the
prototype dataset does not contain the requested information.

------------------------------------------------------------------------

# 17. Prototype Data

Create representative data for:

-   1 current well
-   10--20 historical wells
-   4--6 formations
-   50--100 historical incidents
-   drilling parameter sequences
-   well coordinates
-   trajectories
-   NPT records
-   sample drilling reports
-   safety-reference metadata

The demo data should be internally consistent.

------------------------------------------------------------------------

# 18. Main Demo Scenario

Use one carefully designed scenario.

### Starting state

``` text
Current Well: X01
Depth: 2800m
Formation: XYZ
Risk: LOW/MODERATE
```

### Step 1

Live stream begins.

### Step 2

Torque starts increasing.

### Step 3

Anomaly detector triggers.

### Step 4

WellTwin Finder identifies X04 with 91% similarity.

### Step 5

X04 has historical Mud Loss at 2850m and Stuck Pipe at 2910m.

### Step 6

Risk Horizon highlights 2850--2910m.

### Step 7

Explainability panel shows evidence.

### Step 8

Open Time Machine and replay X04.

### Step 9

Open Incident Graph.

### Step 10

Open Safety Context.

### Step 11

Ask the AI assistant: **"Why should I be concerned about the next
100m?"**

This should be the complete SIH demonstration.

------------------------------------------------------------------------

# 19. Prototype Boundary

## Implemented

-   Interactive dashboard
-   Simulated live data
-   Map
-   Spatial search
-   Historical well database
-   WellTwin similarity
-   Risk Horizon
-   Anomaly detection
-   Incident graph
-   Time Machine
-   Evidence panel
-   RAG assistant
-   Safety reference layer

## Simulated

-   eRTMAC stream
-   Oil India operational data
-   Historical Oil India reports
-   Actual drilling telemetry

## Production extension

-   Secure eRTMAC integration
-   Enterprise data lake
-   real field telemetry
-   validated ML models
-   role-based access
-   audit logging
-   enterprise deployment
-   integration with existing Oil India systems

------------------------------------------------------------------------

# 20. Definition of Done

The prototype is complete when a judge can:

1.  Open the landing page.
2.  Enter the operations dashboard.
3.  Select a current well.
4.  See live parameters changing.
5.  View nearby wells on a map.
6.  Find the most similar historical well.
7.  Inspect historical events.
8.  See the Risk Horizon update with depth.
9.  Trigger an anomaly.
10. Receive an explainable alert.
11. View evidence and source records.
12. Replay the historical WellTwin.
13. Inspect the incident graph.
14. View safety context.
15. Ask the AI assistant a question and receive an evidence-grounded
    answer.
