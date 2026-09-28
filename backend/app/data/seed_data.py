import math
from typing import List, Dict, Any

# Current Active Well
CURRENT_WELL = {
    "id": "W-X01",
    "well_id": "X01",
    "name": "Drishti Pioneer X01",
    "operator": "Demo Field Operator (Simulated)",
    "field": "Upper Assam Basin - Barail Trend",
    "latitude": 27.4728,
    "longitude": 94.9120,
    "current_depth": 2800.0,
    "total_depth": 3450.0,
    "formation": "Barail Sandstone (Upper Member)",
    "hole_section": "8-1/2\" Production Section",
    "status": "DRILLING_ACTIVE",
    "drill_bit": "8-1/2\" PDC Bit with 6 Blades",
    "mud_type": "KCL-Polymer High Inhibition Mud",
    "target_formation": "Barail Main Pay",
    "spud_date": "2026-08-15",
    "historical_event_count": 0
}

# Formation Stratigraphy for the Basin
FORMATIONS: List[Dict[str, Any]] = [
    {
        "id": "F-01",
        "name": "Alluvial / Dhekiajuli",
        "top_depth": 0.0,
        "bottom_depth": 450.0,
        "lithology": "Unconsolidated Sand & Gravel",
        "risk_level": "LOW",
        "color": "#64748B"
    },
    {
        "id": "F-02",
        "name": "Tipam Sandstone",
        "top_depth": 450.0,
        "bottom_depth": 1650.0,
        "lithology": "Medium to Coarse Sandstone with Clay interbeds",
        "risk_level": "LOW",
        "color": "#3B82F6"
    },
    {
        "id": "F-03",
        "name": "Girujan Clay",
        "top_depth": 1650.0,
        "bottom_depth": 2400.0,
        "lithology": "Mottled Claystone & Siltstone",
        "risk_level": "MODERATE",
        "color": "#8B5CF6"
    },
    {
        "id": "F-04",
        "name": "Barail Sandstone (Upper)",
        "top_depth": 2400.0,
        "bottom_depth": 2950.0,
        "lithology": "Fractured Quartzitic Sandstone & Carbonaceous Shale",
        "risk_level": "HIGH",
        "color": "#F59E0B"
    },
    {
        "id": "F-05",
        "name": "Barail Coal-Shale Member",
        "top_depth": 2950.0,
        "bottom_depth": 3200.0,
        "lithology": "Sub-bituminous Coal streaks with Sloughing Shale",
        "risk_level": "HIGH",
        "color": "#EF4444"
    },
    {
        "id": "F-06",
        "name": "Kopili Shale",
        "top_depth": 3200.0,
        "bottom_depth": 3500.0,
        "lithology": "Hard Calcareous Marine Shale",
        "risk_level": "MODERATE",
        "color": "#10B981"
    }
]

# 15 Historical Offset Wells
OFFSET_WELLS: List[Dict[str, Any]] = [
    {
        "id": "W-X04",
        "well_id": "X04",
        "name": "Barail Offset X04",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.4985,
        "longitude": 94.9420,
        "total_depth": 3350.0,
        "formation": "Barail Sandstone (Upper Member)",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 4.2,
        "similarity_score": 91.0,
        "historical_event_count": 3,
        "drill_year": 2021
    },
    {
        "id": "W-X07",
        "well_id": "X07",
        "name": "Borholla Trend X07",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.4350,
        "longitude": 94.8680,
        "total_depth": 3220.0,
        "formation": "Barail Sandstone (Upper Member)",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_SUSPENDED",
        "distance_km": 6.8,
        "similarity_score": 84.0,
        "historical_event_count": 2,
        "drill_year": 2022
    },
    {
        "id": "W-X11",
        "well_id": "X11",
        "name": "Khoraghat South X11",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.5280,
        "longitude": 94.9650,
        "total_depth": 3120.0,
        "formation": "Barail Sandstone (Upper Member)",
        "hole_section": "8-1/2\" Production Section",
        "status": "ABANDONED_PLUGGED",
        "distance_km": 8.1,
        "similarity_score": 76.0,
        "historical_event_count": 2,
        "drill_year": 2019
    },
    {
        "id": "W-X02",
        "well_id": "X02",
        "name": "Moran Flank X02",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.4580,
        "longitude": 94.9350,
        "total_depth": 3410.0,
        "formation": "Barail Sandstone (Upper Member)",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 2.9,
        "similarity_score": 73.0,
        "historical_event_count": 1,
        "drill_year": 2023
    },
    {
        "id": "W-X05",
        "well_id": "X05",
        "name": "Nahorkatiya North X05",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.4200,
        "longitude": 94.9450,
        "total_depth": 3280.0,
        "formation": "Girujan Clay / Barail",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 6.7,
        "similarity_score": 68.0,
        "historical_event_count": 1,
        "drill_year": 2020
    },
    {
        "id": "W-X08",
        "well_id": "X08",
        "name": "Dikom Deep X08",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.5120,
        "longitude": 94.8500,
        "total_depth": 3520.0,
        "formation": "Barail Coal-Shale Member",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 7.5,
        "similarity_score": 65.0,
        "historical_event_count": 2,
        "drill_year": 2021
    },
    {
        "id": "W-X03",
        "well_id": "X03",
        "name": "Hapjan Structure X03",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.4900,
        "longitude": 94.8400,
        "total_depth": 3150.0,
        "formation": "Tipam Sandstone",
        "hole_section": "12-1/4\" Intermediate",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 7.4,
        "similarity_score": 58.0,
        "historical_event_count": 0,
        "drill_year": 2022
    },
    {
        "id": "W-X09",
        "well_id": "X09",
        "name": "Shalmari Updip X09",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.4100,
        "longitude": 94.9800,
        "total_depth": 3390.0,
        "formation": "Barail Sandstone (Upper Member)",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 9.8,
        "similarity_score": 62.0,
        "historical_event_count": 1,
        "drill_year": 2020
    },
    {
        "id": "W-X10",
        "well_id": "X10",
        "name": "Tengakhat East X10",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.5450,
        "longitude": 94.8850,
        "total_depth": 3440.0,
        "formation": "Kopili Shale",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 8.5,
        "similarity_score": 54.0,
        "historical_event_count": 1,
        "drill_year": 2018
    },
    {
        "id": "W-X12",
        "well_id": "X12",
        "name": "Kathaloni Crest X12",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.3850,
        "longitude": 94.8950,
        "total_depth": 3290.0,
        "formation": "Girujan Clay",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 10.1,
        "similarity_score": 49.0,
        "historical_event_count": 0,
        "drill_year": 2024
    },
    {
        "id": "W-X14",
        "well_id": "X14",
        "name": "Bhogpara South X14",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.5600,
        "longitude": 94.9850,
        "total_depth": 3600.0,
        "formation": "Disang Group",
        "hole_section": "6\" Slimhole Section",
        "status": "ABANDONED_DRY",
        "distance_km": 12.0,
        "similarity_score": 42.0,
        "historical_event_count": 2,
        "drill_year": 2017
    },
    {
        "id": "W-X15",
        "well_id": "X15",
        "name": "Deohal Exploration X15",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.3600,
        "longitude": 94.9500,
        "total_depth": 3450.0,
        "formation": "Barail Coal-Shale Member",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 13.1,
        "similarity_score": 46.0,
        "historical_event_count": 1,
        "drill_year": 2021
    },
    {
        "id": "W-X18",
        "well_id": "X18",
        "name": "Makum Faulted Block X18",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.4200,
        "longitude": 95.0450,
        "total_depth": 3500.0,
        "formation": "Barail Sandstone (Upper Member)",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 14.3,
        "similarity_score": 51.0,
        "historical_event_count": 1,
        "drill_year": 2019
    },
    {
        "id": "W-X20",
        "well_id": "X20",
        "name": "Heera Stepout X20",
        "operator": "Regional Operator (Historical)",
        "field": "Upper Assam Basin",
        "latitude": 27.5750,
        "longitude": 94.8100,
        "total_depth": 3310.0,
        "formation": "Tipam Sandstone",
        "hole_section": "8-1/2\" Production Section",
        "status": "COMPLETED_PRODUCING",
        "distance_km": 15.2,
        "similarity_score": 38.0,
        "historical_event_count": 0,
        "drill_year": 2023
    }
]

# Historical Incidents / Events in the Field
HISTORICAL_INCIDENTS: List[Dict[str, Any]] = [
    {
        "id": "INC-X04-01",
        "well_id": "X04",
        "well_name": "Barail Offset X04",
        "depth": 2850.0,
        "event_type": "MUD_LOSS",
        "formation": "Barail Sandstone (Upper Member)",
        "severity": "HIGH",
        "description": "Partial loss of circulation (45 bbl/hr) observed during drilling fractured sand horizon. Standpipe pressure dropped by 180 psi with loss of returns.",
        "npt_hours": 4.0,
        "source_document": "X04_Drilling_Report.pdf",
        "source_page": 87,
        "parameters_snapshot": {
            "depth": 2850.0,
            "torque": 46.0,
            "rop": 17.5,
            "mud_weight": 1.18,
            "pressure": 3030.0
        },
        "recommendation": "Pump 25 bbl medium-sized LCM pill (mica + nutshell), reduce mud weight slightly to 1.16 SG, monitor pit gain/loss."
    },
    {
        "id": "INC-X04-02",
        "well_id": "X04",
        "well_name": "Barail Offset X04",
        "depth": 2870.0,
        "event_type": "HIGH_TORQUE",
        "formation": "Barail Sandstone (Upper Member)",
        "severity": "MODERATE",
        "description": "Severe torque spikes and drag (+42% above rolling baseline) experienced with high rotary vibration during bottom hole assembly rotation.",
        "npt_hours": 2.5,
        "source_document": "X04_Drilling_Report.pdf",
        "source_page": 89,
        "parameters_snapshot": {
            "depth": 2870.0,
            "torque": 58.2,
            "rop": 14.1,
            "mud_weight": 1.18,
            "pressure": 3280.0
        },
        "recommendation": "Perform short wiper trip, pump high-viscosity pill, adjust RPM to bypass harmonic resonance, ream with care."
    },
    {
        "id": "INC-X04-03",
        "well_id": "X04",
        "well_name": "Barail Offset X04",
        "depth": 2910.0,
        "event_type": "STUCK_PIPE",
        "formation": "Barail Sandstone (Upper Member)",
        "severity": "CRITICAL",
        "description": "Differential sticking encountered after connection while bit was stationary for 12 minutes across high-permeability depleted sand zone.",
        "npt_hours": 6.5,
        "source_document": "X04_Drilling_Report.pdf",
        "source_page": 92,
        "parameters_snapshot": {
            "depth": 2910.0,
            "torque": 66.0,
            "rop": 0.0,
            "mud_weight": 1.19,
            "pressure": 3350.0
        },
        "recommendation": "Deploy hydraulic drilling jars upward with maximum allowable pull, spot lubricant soak pill, reduce overbalance pressure."
    },
    {
        "id": "INC-X07-01",
        "well_id": "X07",
        "well_name": "Borholla Trend X07",
        "depth": 2865.0,
        "event_type": "MUD_LOSS",
        "formation": "Barail Sandstone (Upper Member)",
        "severity": "MODERATE",
        "description": "Sub-surface seepage and mud loss of 18 bbl/hr entering micro-fractured sandstone face. Standpipe pressure fluctuation.",
        "npt_hours": 2.5,
        "source_document": "X07_Drilling_Report.pdf",
        "source_page": 54,
        "parameters_snapshot": {
            "depth": 2865.0,
            "torque": 47.0,
            "rop": 16.2,
            "mud_weight": 1.17,
            "pressure": 3120.0
        },
        "recommendation": "Circulate homogenous fiber-based LCM blend, control flow rate below 2100 L/min to minimize ECD."
    },
    {
        "id": "INC-X07-02",
        "well_id": "X07",
        "well_name": "Borholla Trend X07",
        "depth": 2900.0,
        "event_type": "TIGHT_HOLE",
        "formation": "Barail Sandstone (Upper Member)",
        "severity": "HIGH",
        "description": "Severe overpull of 65 klbf while pulling off bottom across sand-shale boundary. Hole pack-off tendency noticed.",
        "npt_hours": 4.0,
        "source_document": "X07_Drilling_Report.pdf",
        "source_page": 58,
        "parameters_snapshot": {
            "depth": 2900.0,
            "torque": 54.0,
            "rop": 13.5,
            "mud_weight": 1.18,
            "pressure": 3290.0
        },
        "recommendation": "Back-ream with low rotary speed and circulation, inspect mud rheology for adequate hole cleaning."
    },
    {
        "id": "INC-X11-01",
        "well_id": "X11",
        "well_name": "Khoraghat South X11",
        "depth": 2870.0,
        "event_type": "HIGH_TORQUE",
        "formation": "Barail Sandstone (Upper Member)",
        "severity": "HIGH",
        "description": "Erratic torsional slip-stick vibration, top-drive torque cycling between 32 and 59 kN·m. ROP fell drastically.",
        "npt_hours": 3.0,
        "source_document": "X11_Drilling_Report.pdf",
        "source_page": 41,
        "parameters_snapshot": {
            "depth": 2870.0,
            "torque": 59.0,
            "rop": 11.5,
            "mud_weight": 1.18,
            "pressure": 3250.0
        },
        "recommendation": "Reduce WOB by 4 klbf, increase rotary speed to 135 RPM to break torsional resonance harmonic."
    },
    {
        "id": "INC-X11-02",
        "well_id": "X11",
        "well_name": "Khoraghat South X11",
        "depth": 2925.0,
        "event_type": "PACK_OFF",
        "formation": "Barail Coal-Shale Member",
        "severity": "HIGH",
        "description": "Annular pack-off caused by sloughing brittle shale cavings, standpipe pressure spiked to 3650 psi.",
        "npt_hours": 5.2,
        "source_document": "X11_Drilling_Report.pdf",
        "source_page": 45,
        "parameters_snapshot": {
            "depth": 2925.0,
            "torque": 61.5,
            "rop": 8.0,
            "mud_weight": 1.19,
            "pressure": 3650.0
        },
        "recommendation": "Discontinue drilling, work string dynamically, circulate sweeps to clear annular restriction."
    },
    {
        "id": "INC-X02-01",
        "well_id": "X02",
        "well_name": "Moran Flank X02",
        "depth": 2845.0,
        "event_type": "MUD_LOSS",
        "formation": "Barail Sandstone (Upper Member)",
        "severity": "LOW",
        "description": "Minor seepage (10 bbl/hr) on entering porous sandstone layer. Healed naturally after conditioning.",
        "npt_hours": 1.0,
        "source_document": "X02_Drilling_Report.pdf",
        "source_page": 32,
        "parameters_snapshot": {
            "depth": 2845.0,
            "torque": 43.5,
            "rop": 18.0,
            "mud_weight": 1.17,
            "pressure": 3190.0
        },
        "recommendation": "Add fine calcium carbonate bridge agent, continue normal drilling parameters."
    },
    {
        "id": "INC-X08-01",
        "well_id": "X08",
        "well_name": "Dikom Deep X08",
        "depth": 3180.0,
        "event_type": "GAS_INFLUX",
        "formation": "Barail Coal-Shale Member",
        "severity": "CRITICAL",
        "description": "Pit gain of 12 bbl detected after drilling coal streak, gas units increased from 15 to 480 units. Shut-in procedure enacted.",
        "npt_hours": 8.0,
        "source_document": "X08_Drilling_Report.pdf",
        "source_page": 112,
        "parameters_snapshot": {
            "depth": 3180.0,
            "torque": 44.0,
            "rop": 24.0,
            "mud_weight": 1.18,
            "pressure": 3480.0
        },
        "recommendation": "Shut in well via annular BOP, record SIDPP and SICP, calculate kill mud weight per standard well control sheet."
    }
]

# WellTwin Precomputed Similarity Factors for X01
WELLTWIN_SIMILARITY_DATA: Dict[str, Dict[str, Any]] = {
    "X04": {
        "well_id": "X04",
        "name": "Barail Offset X04",
        "similarity": 91.0,
        "distance_km": 4.2,
        "total_depth": 3350.0,
        "formation": "Barail Sandstone (Upper Member)",
        "factors": {
            "formation": 95.0,
            "depth": 92.0,
            "trajectory": 81.0,
            "parameters": 89.0,
            "events": 90.0,
            "spatial": 76.0
        },
        "events_count": 3,
        "primary_risks": ["MUD_LOSS (2850m)", "HIGH_TORQUE (2870m)", "STUCK_PIPE (2910m)"],
        "evidence_notes": "X04 matches X01 in formation lithology (95%), hole section diameter (8-1/2\"), and depth interval. At 2850m-2910m, X04 experienced severe mud loss followed by differential sticking causing 6.5 hr NPT."
    },
    "X07": {
        "well_id": "X07",
        "name": "Borholla Trend X07",
        "similarity": 84.0,
        "distance_km": 6.8,
        "total_depth": 3220.0,
        "formation": "Barail Sandstone (Upper Member)",
        "factors": {
            "formation": 92.0,
            "depth": 88.0,
            "trajectory": 75.0,
            "parameters": 82.0,
            "events": 85.0,
            "spatial": 68.0
        },
        "events_count": 2,
        "primary_risks": ["MUD_LOSS (2865m)", "TIGHT_HOLE (2900m)"],
        "evidence_notes": "X07 drilled the same sandstone sequence with high shale intercalation. Experienced seepage loss at 2865m and 65 klbf overpull on trip at 2900m."
    },
    "X11": {
        "well_id": "X11",
        "name": "Khoraghat South X11",
        "similarity": 76.0,
        "distance_km": 8.1,
        "total_depth": 3120.0,
        "formation": "Barail Sandstone (Upper Member)",
        "factors": {
            "formation": 88.0,
            "depth": 79.0,
            "trajectory": 70.0,
            "parameters": 75.0,
            "events": 78.0,
            "spatial": 62.0
        },
        "events_count": 2,
        "primary_risks": ["HIGH_TORQUE (2870m)", "PACK_OFF (2925m)"],
        "evidence_notes": "X11 exhibited torsional resonance at 2870m leading to hole degradation and pack-off at 2925m."
    },
    "X02": {
        "well_id": "X02",
        "name": "Moran Flank X02",
        "similarity": 73.0,
        "distance_km": 2.9,
        "total_depth": 3410.0,
        "formation": "Barail Sandstone (Upper Member)",
        "factors": {
            "formation": 85.0,
            "depth": 80.0,
            "trajectory": 68.0,
            "parameters": 71.0,
            "events": 64.0,
            "spatial": 92.0
        },
        "events_count": 1,
        "primary_risks": ["MUD_LOSS (2845m)"],
        "evidence_notes": "Geographically closest well (2.9km). Mild seepage at 2845m controlled with low-concentration bridging agents."
    },
    "X05": {
        "well_id": "X05",
        "name": "Nahorkatiya North X05",
        "similarity": 68.0,
        "distance_km": 6.7,
        "total_depth": 3280.0,
        "formation": "Girujan Clay / Barail",
        "factors": {
            "formation": 74.0,
            "depth": 76.0,
            "trajectory": 65.0,
            "parameters": 66.0,
            "events": 60.0,
            "spatial": 69.0
        },
        "events_count": 1,
        "primary_risks": ["TIGHT_HOLE (2780m)"],
        "evidence_notes": "Slightly shifted fault block. Tight hole encountered in upper section during connection."
    }
}

# Safety Guidelines and Standard Industry References
SAFETY_REFERENCES: List[Dict[str, Any]] = [
    {
        "reference_id": "OISD-STD-174",
        "risk_category": "WELL_CONTROL",
        "safety_domain": "Well Control & Blowout Prevention",
        "reference_title": "OISD Standard 174: Well Control Equipment & Operational Guidelines",
        "source": "Oil Industry Safety Directorate (OISD) / MoPNG",
        "guideline_summary": "Establishes mandatory procedures for kick detection, pit volume monitoring, shut-in sequences, and secondary barrier integrity verification.",
        "mandatory_checks": [
            "Continuous pit volume totalizer (PVT) calibration check within ±0.5 bbl tolerance",
            "Trip sheet verification during all pipe movements and connection intervals",
            "Immediate crew call to stations upon 5+ bbl rapid pit gain or 50 psi pump pressure drop",
            "Slow circulation rate (SCR) recording at shift handover and after mud weight change"
        ],
        "engineering_disclaimer": "Reference for operational engineering review only. Final drilling decisions rest with Rig Superintendent and Wellsite Drilling Engineer."
    },
    {
        "reference_id": "IADC-SPP-04",
        "risk_category": "STUCK_PIPE",
        "safety_domain": "Borehole Stability & Mechanical Sticking Prevention",
        "reference_title": "IADC / OISD Best Practice Guidelines for Stuck Pipe Risk Mitigation",
        "source": "IADC Drilling Safety Manual & Field Procedures",
        "guideline_summary": "Specifies rotational limits, overpull thresholds, mud lubricity parameters, and stationary pipe limits across depleted permeable sandstone horizons.",
        "mandatory_checks": [
            "Never leave drillstring stationary on bottom or across permeable sand for > 3 minutes",
            "Monitor hookload trends on connection and check for drag exceeding 25 klbf",
            "Ensure drilling jar placement calculations account for neutral point at maximum anticipated WOB",
            "Maintain mud cake thickness below 2/32\" across Barail fractured sandstone intervals"
        ],
        "engineering_disclaimer": "Reference for operational engineering review only. Field parameters must be validated against wellbore hydraulics model."
    },
    {
        "reference_id": "API-RP-13B",
        "risk_category": "CIRCULATION_LOSS",
        "safety_domain": "Drilling Fluid Hydraulics & Lost Circulation Control",
        "reference_title": "API Recommended Practice 13B-1 / OISD Loss Circulation Protocol",
        "source": "API / Industry Drilling Fluid Standardization",
        "guideline_summary": "Guidance on Equivalent Circulating Density (ECD) management, LCM pill design, and surge/swab pressure minimization.",
        "mandatory_checks": [
            "Maintain pre-mixed 50 bbl LCM pill on standby in active reserve slug pit",
            "Restrict annular pump rate to keep ECD below fracture gradient (estimated 1.28 SG equivalent)",
            "Perform immediate flow check on any sudden standpipe pressure drop (>100 psi)",
            "Log cumulative volume lost and notify base operations center when total loss exceeds 20 bbl"
        ],
        "engineering_disclaimer": "Reference for operational engineering review only. LCM additives must be verified compatible with BHA MWD tools."
    },
    {
        "reference_id": "OISD-GDN-178",
        "risk_category": "HIGH_TORQUE",
        "safety_domain": "Drillstring Vibration & Drill-Off Protocols",
        "reference_title": "OISD-GDN-178 Guidelines on Drilling Rig Power Transmission & Torsional Safety",
        "source": "OISD Rig Safety Standards",
        "guideline_summary": "Standards for top-drive torque limiters, stick-slip mitigation, and rotary RPM adjustment in abrasive sandstone.",
        "mandatory_checks": [
            "Verify top-drive electrical torque limit is set to 85% of connection make-up torque",
            "If torque oscillations exceed ±30% baseline for >60 seconds, back off WOB by 50%",
            "Check standpipe pressure transducer for pressure pulsations indicative of bit nozzle plugging",
            "Ream hole at 50% rotary speed with full circulation before resuming on-bottom drilling"
        ],
        "engineering_disclaimer": "Reference for operational engineering review only. Torque values depend on BHA design and hole angle."
    }
]

# Demo Reports / PDF Text Chunks for Knowledge Graph and RAG Assistant
DEMO_REPORTS = [
    {
        "id": "REP-X04",
        "filename": "X04_Drilling_Report.pdf",
        "well_id": "X04",
        "title": "Offset Well X04 Daily Drilling Report & End of Section Summary",
        "year": 2021,
        "pages_count": 142,
        "content_chunks": [
            {
                "page": 87,
                "section": "Operations 2840m - 2860m",
                "text": "At 2850m MD while drilling into upper fractured Barail Sandstone, rig observed partial lost circulation of 45 bbl/hr. Standpipe pressure dropped from 3210 psi to 3030 psi. Flow sensor indicated 22% return loss. Pumped 25 bbl medium-sized LCM pill (mica + walnut blend). Well healed after 4.0 hours NPT.",
                "event_id": "INC-X04-01"
            },
            {
                "page": 89,
                "section": "Operations 2860m - 2880m",
                "text": "Drilling resumed from 2860m. At 2870m MD, experienced erratic torque spikes reaching 58.2 kN·m (+42% over baseline). Top-drive stalled twice. Significant slip-stick vibration detected by MWD sub. Conducted short wiper trip to 2790m and adjusted RPM to 130 to break resonance. 2.5 hours NPT.",
                "event_id": "INC-X04-02"
            },
            {
                "page": 92,
                "section": "Operations 2900m - 2920m",
                "text": "At 2910m MD, drillstring became differentially stuck during survey connection across depleted sand body. Overbalance calculated at 380 psi. Rig jarred up with 90 klbf overpull for 3 hours. Spotted pipe-release acid and lubricant soak pill. Drillstring freed after 6.5 hours total NPT.",
                "event_id": "INC-X04-03"
            }
        ]
    },
    {
        "id": "REP-X07",
        "filename": "X07_Drilling_Report.pdf",
        "well_id": "X07",
        "title": "Offset Well X07 Intermediate Section Drilling Summary",
        "year": 2022,
        "pages_count": 98,
        "content_chunks": [
            {
                "page": 54,
                "section": "Operations 2860m - 2875m",
                "text": "At 2865m MD in Barail Sandstone, mud pit level dropped 18 bbl over 1 hour. Mild seepage loss noticed. Mud weight was 1.17 SG. Mixed and pumped 15 bbl fiber blend. Circulated bottoms up. 2.5 hr NPT.",
                "event_id": "INC-X07-01"
            },
            {
                "page": 58,
                "section": "Operations 2895m - 2910m",
                "text": "At 2900m MD, tight hole condition encountered while attempting wiper trip off bottom. String pulled with 65 klbf overpull. Reamed tight section with 60 RPM and low pump rate. 4.0 hr NPT.",
                "event_id": "INC-X07-02"
            }
        ]
    },
    {
        "id": "REP-X11",
        "filename": "X11_Drilling_Report.pdf",
        "well_id": "X11",
        "title": "Offset Well X11 Operational Case History & Incident Review",
        "year": 2019,
        "pages_count": 115,
        "content_chunks": [
            {
                "page": 41,
                "section": "Operations 2865m - 2885m",
                "text": "At 2870m MD, severe torsional stick-slip vibration commenced. Torque swung between 32 and 59 kN·m. Bit penetration dropped from 17 m/hr to 11.5 m/hr. Hole cleaning sweep pumped. 3.0 hr NPT.",
                "event_id": "INC-X11-01"
            },
            {
                "page": 45,
                "section": "Operations 2920m - 2935m",
                "text": "At 2925m MD, transition into Barail Coal-Shale Member caused shale sloughing and pack-off. Pump pressure surged to 3650 psi. Worked string actively until pressure normalized. 5.2 hr NPT.",
                "event_id": "INC-X11-02"
            }
        ]
    }
]

# Time Machine Baseline Drilling Profiles for X01 and X04
def generate_time_machine_profile(well_id: str = "X04"):
    """Generates continuous depth-indexed telemetry data points from 2750m to 2950m for Time Machine playback."""
    points = []
    for d in range(2750, 2955, 5):
        depth = float(d)
        if well_id == "X04":
            # Normal baseline
            torque = 41.0 + (d - 2750) * 0.02
            rop = 18.0 - (d - 2750) * 0.015
            pressure = 3200.0 + (d - 2750) * 0.2
            event = None
            
            # Mud loss spike around 2850m
            if 2845 <= d <= 2855:
                pressure -= 180.0
                rop += 2.0
                if d == 2850:
                    event = "MUD_LOSS: 45 bbl/hr circulation loss"
            
            # Torque anomaly around 2865-2880m
            if 2865 <= d <= 2880:
                torque += 16.5 + math.sin((d - 2865) * 0.5) * 4.0
                rop -= 4.5
                if d == 2870:
                    event = "HIGH_TORQUE: Torsional stick-slip spike 58.2 kN·m"
                    
            # Stuck pipe at 2910m
            if d >= 2905 and d <= 2920:
                torque += 24.0
                rop = max(0.0, rop - 12.0)
                if d == 2910:
                    event = "STUCK_PIPE: Differential sticking, 6.5 hr NPT"

            points.append({
                "depth": depth,
                "torque": round(torque, 1),
                "rop": round(rop, 1),
                "rpm": 118,
                "wob": 14.5,
                "mud_weight": 1.18,
                "pressure": round(pressure, 0),
                "event": event
            })
        else: # X01 Current Well
            torque = 42.0 + (d - 2750) * 0.015
            rop = 18.2
            pressure = 3210.0
            event = None
            if d > 2800:
                # Simulated projection
                torque = 42.0 + (d - 2800) * 0.35
                rop = max(10.0, 18.2 - (d - 2800) * 0.15)
                pressure = 3210.0 + (d - 2800) * 0.8
            points.append({
                "depth": depth,
                "torque": round(torque, 1),
                "rop": round(rop, 1),
                "rpm": 118,
                "wob": 14.2,
                "mud_weight": 1.18,
                "pressure": round(pressure, 0),
                "event": event
            })
    return points

TM_PROFILE_X04 = generate_time_machine_profile("X04")
TM_PROFILE_X01 = generate_time_machine_profile("X01")
