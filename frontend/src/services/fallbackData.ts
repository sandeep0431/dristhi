import {
  Well, Formation, IncidentEvent, WellTwinResult,
  SafetyReference, IncidentGraphData, SimulationState
} from '../types';

export const fallbackWells: Well[] = [
  {
    id: "W-X01",
    well_id: "X01",
    name: "Drishti Pioneer X01",
    operator: "Demo Field Operator (Simulated)",
    field: "Upper Assam Basin - Barail Trend",
    latitude: 27.4728,
    longitude: 94.9120,
    total_depth: 3450.0,
    formation: "Barail Sandstone (Upper Member)",
    hole_section: "8-1/2\" Production Section",
    status: "DRILLING_ACTIVE",
    is_current: true,
    current_depth: 2800.0,
    similarity_score: 100.0,
    historical_event_count: 0
  },
  {
    id: "W-X04",
    well_id: "X04",
    name: "Barail Offset X04",
    operator: "Regional Operator (Historical)",
    field: "Upper Assam Basin",
    latitude: 27.4985,
    longitude: 94.9420,
    total_depth: 3350.0,
    formation: "Barail Sandstone (Upper Member)",
    hole_section: "8-1/2\" Production Section",
    status: "COMPLETED_PRODUCING",
    distance_km: 4.2,
    similarity_score: 91.0,
    historical_event_count: 3,
    drill_year: 2021
  },
  {
    id: "W-X07",
    well_id: "X07",
    name: "Borholla Trend X07",
    operator: "Regional Operator (Historical)",
    field: "Upper Assam Basin",
    latitude: 27.4350,
    longitude: 94.8680,
    total_depth: 3220.0,
    formation: "Barail Sandstone (Upper Member)",
    hole_section: "8-1/2\" Production Section",
    status: "COMPLETED_SUSPENDED",
    distance_km: 6.8,
    similarity_score: 84.0,
    historical_event_count: 2,
    drill_year: 2022
  },
  {
    id: "W-X11",
    well_id: "X11",
    name: "Khoraghat South X11",
    operator: "Regional Operator (Historical)",
    field: "Upper Assam Basin",
    latitude: 27.5280,
    longitude: 94.9650,
    total_depth: 3120.0,
    formation: "Barail Sandstone (Upper Member)",
    hole_section: "8-1/2\" Production Section",
    status: "ABANDONED_PLUGGED",
    distance_km: 8.1,
    similarity_score: 76.0,
    historical_event_count: 2,
    drill_year: 2019
  },
  {
    id: "W-X02",
    well_id: "X02",
    name: "Moran Flank X02",
    operator: "Regional Operator (Historical)",
    field: "Upper Assam Basin",
    latitude: 27.4580,
    longitude: 94.9350,
    total_depth: 3410.0,
    formation: "Barail Sandstone (Upper Member)",
    hole_section: "8-1/2\" Production Section",
    status: "COMPLETED_PRODUCING",
    distance_km: 2.9,
    similarity_score: 73.0,
    historical_event_count: 1,
    drill_year: 2023
  },
  {
    id: "W-X05",
    well_id: "X05",
    name: "Nahorkatiya North X05",
    operator: "Regional Operator (Historical)",
    field: "Upper Assam Basin",
    latitude: 27.4200,
    longitude: 94.9450,
    total_depth: 3280.0,
    formation: "Girujan Clay / Barail",
    hole_section: "8-1/2\" Production Section",
    status: "COMPLETED_PRODUCING",
    distance_km: 6.7,
    similarity_score: 68.0,
    historical_event_count: 1,
    drill_year: 2020
  },
  {
    id: "W-X08",
    well_id: "X08",
    name: "Dikom Deep X08",
    operator: "Regional Operator (Historical)",
    field: "Upper Assam Basin",
    latitude: 27.5120,
    longitude: 94.8500,
    total_depth: 3520.0,
    formation: "Barail Coal-Shale Member",
    hole_section: "8-1/2\" Production Section",
    status: "COMPLETED_PRODUCING",
    distance_km: 7.5,
    similarity_score: 65.0,
    historical_event_count: 2,
    drill_year: 2021
  }
];

export const fallbackFormations: Formation[] = [
  { id: "F-01", name: "Alluvial / Dhekiajuli", top_depth: 0, bottom_depth: 450, lithology: "Unconsolidated Sand & Gravel", risk_level: "LOW", color: "#64748B" },
  { id: "F-02", name: "Tipam Sandstone", top_depth: 450, bottom_depth: 1650, lithology: "Medium to Coarse Sandstone", risk_level: "LOW", color: "#3B82F6" },
  { id: "F-03", name: "Girujan Clay", top_depth: 1650, bottom_depth: 2400, lithology: "Mottled Claystone & Siltstone", risk_level: "MODERATE", color: "#8B5CF6" },
  { id: "F-04", name: "Barail Sandstone (Upper)", top_depth: 2400, bottom_depth: 2950, lithology: "Fractured Quartzitic Sandstone", risk_level: "HIGH", color: "#F59E0B" },
  { id: "F-05", name: "Barail Coal-Shale Member", top_depth: 2950, bottom_depth: 3200, lithology: "Sub-bituminous Coal streaks with Sloughing Shale", risk_level: "HIGH", color: "#EF4444" },
  { id: "F-06", name: "Kopili Shale", top_depth: 3200, bottom_depth: 3500, lithology: "Hard Calcareous Marine Shale", risk_level: "MODERATE", color: "#10B981" }
];

export const fallbackIncidents: IncidentEvent[] = [
  {
    id: "INC-X04-01",
    well_id: "X04",
    well_name: "Barail Offset X04",
    depth: 2850.0,
    event_type: "MUD_LOSS",
    formation: "Barail Sandstone (Upper Member)",
    severity: "HIGH",
    description: "Partial loss of circulation (45 bbl/hr) observed during drilling fractured sand horizon. Standpipe pressure dropped 180 psi.",
    npt_hours: 4.0,
    source_document: "X04_Drilling_Report.pdf",
    source_page: 87,
    recommendation: "Pump 25 bbl medium-sized LCM pill (mica + nutshell), monitor pit level continuously."
  },
  {
    id: "INC-X04-02",
    well_id: "X04",
    well_name: "Barail Offset X04",
    depth: 2870.0,
    event_type: "HIGH_TORQUE",
    formation: "Barail Sandstone (Upper Member)",
    severity: "MODERATE",
    description: "Severe torque spikes and drag (+42% above baseline) experienced with high rotary vibration during BHA rotation.",
    npt_hours: 2.5,
    source_document: "X04_Drilling_Report.pdf",
    source_page: 89,
    recommendation: "Short wiper trip, pump high-viscosity pill, adjust RPM to bypass resonance."
  },
  {
    id: "INC-X04-03",
    well_id: "X04",
    well_name: "Barail Offset X04",
    depth: 2910.0,
    event_type: "STUCK_PIPE",
    formation: "Barail Sandstone (Upper Member)",
    severity: "CRITICAL",
    description: "Differential sticking encountered after connection while bit was stationary for 12 minutes across high-permeability sand.",
    npt_hours: 6.5,
    source_document: "X04_Drilling_Report.pdf",
    source_page: 92,
    recommendation: "Deploy hydraulic drilling jars upward, spot lubricant soak pill, reduce overbalance."
  },
  {
    id: "INC-X07-01",
    well_id: "X07",
    well_name: "Borholla Trend X07",
    depth: 2865.0,
    event_type: "MUD_LOSS",
    formation: "Barail Sandstone (Upper Member)",
    severity: "MODERATE",
    description: "Sub-surface seepage and mud loss of 18 bbl/hr entering micro-fractured sandstone face.",
    npt_hours: 2.5,
    source_document: "X07_Drilling_Report.pdf",
    source_page: 54,
    recommendation: "Circulate homogenous fiber-based LCM blend, control flow rate below 2100 L/min."
  },
  {
    id: "INC-X07-02",
    well_id: "X07",
    well_name: "Borholla Trend X07",
    depth: 2900.0,
    event_type: "TIGHT_HOLE",
    formation: "Barail Sandstone (Upper Member)",
    severity: "HIGH",
    description: "Severe overpull of 65 klbf while pulling off bottom across sand-shale boundary.",
    npt_hours: 4.0,
    source_document: "X07_Drilling_Report.pdf",
    source_page: 58,
    recommendation: "Back-ream with low rotary speed and circulation, verify mud rheology."
  },
  {
    id: "INC-X11-01",
    well_id: "X11",
    well_name: "Khoraghat South X11",
    depth: 2870.0,
    event_type: "HIGH_TORQUE",
    formation: "Barail Sandstone (Upper Member)",
    severity: "HIGH",
    description: "Erratic torsional slip-stick vibration, top-drive torque cycling between 32 and 59 kN·m.",
    npt_hours: 3.0,
    source_document: "X11_Drilling_Report.pdf",
    source_page: 41,
    recommendation: "Reduce WOB by 4 klbf, increase rotary speed to 135 RPM."
  },
  {
    id: "INC-X11-02",
    well_id: "X11",
    well_name: "Khoraghat South X11",
    depth: 2925.0,
    event_type: "PACK_OFF",
    formation: "Barail Coal-Shale Member",
    severity: "HIGH",
    description: "Annular pack-off caused by sloughing brittle shale cavings, standpipe pressure surged to 3650 psi.",
    npt_hours: 5.2,
    source_document: "X11_Drilling_Report.pdf",
    source_page: 45,
    recommendation: "Discontinue drilling, work string dynamically, circulate sweeps."
  }
];

export const fallbackTwinResults: WellTwinResult[] = [
  {
    well_id: "X04",
    name: "Barail Offset X04",
    similarity: 91.0,
    distance_km: 4.2,
    total_depth: 3350.0,
    formation: "Barail Sandstone (Upper Member)",
    factors: {
      formation: 95.0,
      depth: 92.0,
      trajectory: 81.0,
      parameters: 89.0,
      events: 90.0,
      spatial: 76.0
    },
    events_count: 3,
    primary_risks: ["MUD_LOSS (2850m)", "HIGH_TORQUE (2870m)", "STUCK_PIPE (2910m)"],
    evidence_notes: "X04 matches X01 in formation lithology (95%), hole section diameter (8-1/2\"), and depth interval. At 2850m-2910m, X04 experienced severe mud loss followed by differential sticking causing 6.5 hr NPT."
  },
  {
    well_id: "X07",
    name: "Borholla Trend X07",
    similarity: 84.0,
    distance_km: 6.8,
    total_depth: 3220.0,
    formation: "Barail Sandstone (Upper Member)",
    factors: {
      formation: 92.0,
      depth: 88.0,
      trajectory: 75.0,
      parameters: 82.0,
      events: 85.0,
      spatial: 68.0
    },
    events_count: 2,
    primary_risks: ["MUD_LOSS (2865m)", "TIGHT_HOLE (2900m)"],
    evidence_notes: "X07 drilled the same sandstone sequence with high shale intercalation. Experienced seepage loss at 2865m and 65 klbf overpull on trip at 2900m."
  },
  {
    well_id: "X11",
    name: "Khoraghat South X11",
    similarity: 76.0,
    distance_km: 8.1,
    total_depth: 3120.0,
    formation: "Barail Sandstone (Upper Member)",
    factors: {
      formation: 88.0,
      depth: 79.0,
      trajectory: 70.0,
      parameters: 75.0,
      events: 78.0,
      spatial: 62.0
    },
    events_count: 2,
    primary_risks: ["HIGH_TORQUE (2870m)", "PACK_OFF (2925m)"],
    evidence_notes: "X11 exhibited torsional resonance at 2870m leading to hole degradation and pack-off at 2925m."
  },
  {
    well_id: "X02",
    name: "Moran Flank X02",
    similarity: 73.0,
    distance_km: 2.9,
    total_depth: 3410.0,
    formation: "Barail Sandstone (Upper Member)",
    factors: {
      formation: 85.0,
      depth: 80.0,
      trajectory: 68.0,
      parameters: 71.0,
      events: 64.0,
      spatial: 92.0
    },
    events_count: 1,
    primary_risks: ["MUD_LOSS (2845m)"],
    evidence_notes: "Geographically closest well (2.9km). Mild seepage at 2845m controlled with bridging agents."
  }
];

export const fallbackSafety: SafetyReference[] = [
  {
    reference_id: "OISD-STD-174",
    risk_category: "WELL_CONTROL",
    safety_domain: "Well Control & Blowout Prevention",
    reference_title: "OISD Standard 174: Well Control Equipment & Operational Guidelines",
    source: "Oil Industry Safety Directorate (OISD) / MoPNG",
    guideline_summary: "Establishes mandatory procedures for kick detection, pit volume monitoring, shut-in sequences, and secondary barrier integrity verification.",
    mandatory_checks: [
      "Continuous pit volume totalizer (PVT) calibration check within ±0.5 bbl tolerance",
      "Trip sheet verification during all pipe movements and connection intervals",
      "Immediate crew call to stations upon 5+ bbl rapid pit gain or 50 psi pump pressure drop",
      "Slow circulation rate (SCR) recording at shift handover and after mud weight change"
    ],
    engineering_disclaimer: "Reference for operational engineering review only. Final drilling decisions rest with Rig Superintendent and Wellsite Drilling Engineer."
  },
  {
    reference_id: "IADC-SPP-04",
    risk_category: "STUCK_PIPE",
    safety_domain: "Borehole Stability & Mechanical Sticking Prevention",
    reference_title: "IADC / OISD Best Practice Guidelines for Stuck Pipe Risk Mitigation",
    source: "IADC Drilling Safety Manual & Field Procedures",
    guideline_summary: "Specifies rotational limits, overpull thresholds, mud lubricity parameters, and stationary pipe limits across depleted permeable sandstone horizons.",
    mandatory_checks: [
      "Never leave drillstring stationary on bottom or across permeable sand for > 3 minutes",
      "Monitor hookload trends on connection and check for drag exceeding 25 klbf",
      "Ensure drilling jar placement calculations account for neutral point at maximum anticipated WOB",
      "Maintain mud cake thickness below 2/32\" across Barail fractured sandstone intervals"
    ],
    engineering_disclaimer: "Reference for operational engineering review only. Field parameters must be validated against wellbore hydraulics model."
  },
  {
    reference_id: "API-RP-13B",
    risk_category: "CIRCULATION_LOSS",
    safety_domain: "Drilling Fluid Hydraulics & Lost Circulation Control",
    reference_title: "API Recommended Practice 13B-1 / OISD Loss Circulation Protocol",
    source: "API / Industry Drilling Fluid Standardization",
    guideline_summary: "Guidance on Equivalent Circulating Density (ECD) management, LCM pill design, and surge/swab pressure minimization.",
    mandatory_checks: [
      "Maintain pre-mixed 50 bbl LCM pill on standby in active reserve slug pit",
      "Restrict annular pump rate to keep ECD below fracture gradient (estimated 1.28 SG equivalent)",
      "Perform immediate flow check on any sudden standpipe pressure drop (>100 psi)",
      "Log cumulative volume lost and notify base operations center when total loss exceeds 20 bbl"
    ],
    engineering_disclaimer: "Reference for operational engineering review only. LCM additives must be verified compatible with BHA MWD tools."
  },
  {
    reference_id: "OISD-GDN-178",
    risk_category: "HIGH_TORQUE",
    safety_domain: "Drillstring Vibration & Drill-Off Protocols",
    reference_title: "OISD-GDN-178 Guidelines on Drilling Rig Power Transmission & Torsional Safety",
    source: "OISD Rig Safety Standards",
    guideline_summary: "Standards for top-drive torque limiters, stick-slip mitigation, and rotary RPM adjustment in abrasive sandstone.",
    mandatory_checks: [
      "Verify top-drive electrical torque limit is set to 85% of connection make-up torque",
      "If torque oscillations exceed ±30% baseline for >60 seconds, back off WOB by 50%",
      "Check standpipe pressure transducer for pressure pulsations indicative of bit nozzle plugging",
      "Ream hole at 50% rotary speed with full circulation before resuming on-bottom drilling"
    ],
    engineering_disclaimer: "Reference for operational engineering review only. Torque values depend on BHA design and hole angle."
  }
];

export const fallbackGraph: IncidentGraphData = {
  well_id: "X04",
  nodes: [
    { id: "well-X04", label: "Well X04", group: "well", details: { title: "Offset Well X04", similarity: "91% WellTwin match with X01", formation: "Barail Sandstone" } },
    { id: "form-barail", label: "Barail Sandstone", group: "formation", details: { title: "Barail Sandstone (Upper)", depth: "2400m - 2950m", lithology: "Fractured Sandstone" } },
    { id: "event-mudloss", label: "MUD LOSS @ 2850m", group: "incident", details: { title: "Lost Circulation", severity: "HIGH", description: "Partial loss 45 bbl/hr with 180 psi drop", npt: "4.0 hrs" } },
    { id: "event-torque", label: "HIGH TORQUE @ 2870m", group: "incident", details: { title: "Severe Torsional Spike", severity: "MODERATE", description: "Torque reached 58.2 kN·m (+42%)", npt: "2.5 hrs" } },
    { id: "event-stuckpipe", label: "STUCK PIPE @ 2910m", group: "incident", details: { title: "Differential Sticking", severity: "CRITICAL", description: "Pipe stuck during connection, jarred with acid soak", npt: "6.5 hrs" } },
    { id: "depth-2850", label: "2850 m", group: "depth", details: { title: "Depth 2850m", note: "Thief zone boundary" } },
    { id: "depth-2870", label: "2870 m", group: "depth", details: { title: "Depth 2870m", note: "Resonance depth" } },
    { id: "depth-2910", label: "2910 m", group: "depth", details: { title: "Depth 2910m", note: "Permeable sand contact" } },
    { id: "pattern-pressure", label: "Pressure Loss: -180 psi", group: "pattern", details: { title: "Hydraulic Telemetry Signature", description: "Returns fell 22%" } },
    { id: "pattern-stickslip", label: "Stick-Slip +42%", group: "pattern", details: { title: "Torsional Telemetry Signature", description: "Top drive stalled twice" } },
    { id: "pattern-stationary", label: "Stationary Pipe 12min", group: "pattern", details: { title: "Operational Factor", description: "Differential pressure 380 psi overbalance" } },
    { id: "npt-total", label: "Total NPT: 13.0 hrs", group: "npt", details: { title: "Financial Impact", npt: "13.0 hours ($162,500 USD)" } },
    { id: "doc-ddr42", label: "X04_Report p.87", group: "document", details: { title: "Daily Drilling Report #42", document: "X04_Drilling_Report.pdf", page: 87 } }
  ],
  edges: [
    { id: "e1", source: "well-X04", target: "form-barail", label: "HAS_FORMATION" },
    { id: "e2", source: "well-X04", target: "event-mudloss", label: "HAS_EVENT" },
    { id: "e3", source: "well-X04", target: "event-torque", label: "HAS_EVENT" },
    { id: "e4", source: "well-X04", target: "event-stuckpipe", label: "HAS_EVENT" },
    { id: "e5", source: "event-mudloss", target: "depth-2850", label: "OCCURRED_AT" },
    { id: "e6", source: "event-torque", target: "depth-2870", label: "OCCURRED_AT" },
    { id: "e7", source: "event-stuckpipe", target: "depth-2910", label: "OCCURRED_AT" },
    { id: "e8", source: "event-mudloss", target: "pattern-pressure", label: "ASSOCIATED_WITH" },
    { id: "e9", source: "event-torque", target: "pattern-stickslip", label: "ASSOCIATED_WITH" },
    { id: "e10", source: "event-stuckpipe", target: "pattern-stationary", label: "ASSOCIATED_WITH" },
    { id: "e11", source: "event-stuckpipe", target: "npt-total", label: "CAUSED_NPT" },
    { id: "e12", source: "event-mudloss", target: "doc-ddr42", label: "HAS_SOURCE" }
  ],
  metadata: {
    total_nodes: 13,
    total_edges: 12,
    ontology: "Well-Formation-Incident-Telemetry-Document Graph"
  }
};

export const fallbackTimeMachine = {
  current_well_id: "X01",
  historical_well_id: "X04",
  depth_range: { min: 2750, max: 2950 },
  critical_depths: [2850, 2870, 2910],
  current_profile: [
    { depth: 2750, torque: 42.0, rop: 18.2, pressure: 3210, event: null },
    { depth: 2780, torque: 42.5, rop: 18.2, pressure: 3210, event: null },
    { depth: 2800, torque: 42.5, rop: 18.2, pressure: 3210, event: "Current Bit Position (2800m)" },
    { depth: 2820, torque: 47.0, rop: 16.5, pressure: 3200, event: null },
    { depth: 2840, torque: 52.5, rop: 15.0, pressure: 3180, event: null },
    { depth: 2850, torque: 54.5, rop: 14.2, pressure: 3030, event: "Projected Thief Zone Entry" },
    { depth: 2870, torque: 62.5, rop: 11.0, pressure: 3280, event: null },
    { depth: 2910, torque: 71.0, rop: 1.0, pressure: 3450, event: "Projected High Risk Sand Contact" }
  ],
  historical_profile: [
    { depth: 2750, torque: 41.0, rop: 18.0, pressure: 3200, event: null },
    { depth: 2780, torque: 41.8, rop: 17.5, pressure: 3210, event: null },
    { depth: 2800, torque: 42.0, rop: 17.8, pressure: 3210, event: null },
    { depth: 2820, torque: 43.0, rop: 17.5, pressure: 3215, event: null },
    { depth: 2845, torque: 44.5, rop: 18.0, pressure: 3190, event: null },
    { depth: 2850, torque: 46.0, rop: 19.5, pressure: 3030, event: "MUD_LOSS: 45 bbl/hr circulation loss" },
    { depth: 2870, torque: 58.2, rop: 13.5, pressure: 3280, event: "HIGH_TORQUE: Torsional stick-slip spike 58.2 kN·m" },
    { depth: 2890, torque: 52.0, rop: 14.0, pressure: 3290, event: null },
    { depth: 2910, torque: 66.0, rop: 0.0, pressure: 3350, event: "STUCK_PIPE: Differential sticking, 6.5 hr NPT" },
    { depth: 2930, torque: 45.0, rop: 15.0, pressure: 3240, event: "Freed with acid pill" }
  ]
};

export const initialSimulationState: SimulationState = {
  current_well_id: "X01",
  scenario: "normal",
  is_running: false,
  depth: 2800.0,
  step_count: 0,
  telemetry: {
    well_id: "X01",
    depth: 2800.0,
    rop: 18.2,
    rpm: 118.0,
    torque: 42.5,
    wob: 14.2,
    mud_weight: 1.18,
    pressure: 3210.0,
    flow_rate: 2200.0,
    standpipe_pressure: 3210.0
  },
  anomaly: {
    is_anomaly: false,
    status: "NORMAL",
    anomaly_score: 0.08,
    confidence: 98.0,
    explanations: ["All parameters within nominal Barail baseline tolerances"],
    features_flagged: []
  },
  risk_horizon: {
    risk_level: "LOW",
    start_depth: 2850.0,
    end_depth: 2910.0,
    distance_to_risk: 50.0,
    is_inside_zone: false,
    summary: "Approaching Barail Sandstone risk interval. 3 historical offset incidents documented at 2850-2910m.",
    contributing_wells: ["X04", "X07", "X11"],
    events: fallbackIncidents.slice(0, 3),
    factors: {
      offset_wells_count: 3,
      top_twin_similarity: 91.0,
      formation_match: "Barail Sandstone (Upper)",
      historical_npt_hours: 15.7,
      is_anomaly_amplified: false
    }
  }
};
