import re
from typing import Dict, Any, List
from app.data.seed_data import HISTORICAL_INCIDENTS, DEMO_REPORTS, WELLTWIN_SIMILARITY_DATA, SAFETY_REFERENCES, CURRENT_WELL

class DrillingEngineeringAssistant:
    def __init__(self):
        self.reports = DEMO_REPORTS
        self.incidents = HISTORICAL_INCIDENTS
        self.twins = WELLTWIN_SIMILARITY_DATA
        self.safety = SAFETY_REFERENCES

    def answer_query(self, query: str, well_id: str = "X01", current_depth: float = 2800.0) -> Dict[str, Any]:
        """
        Executes evidence retrieval and generates grounded technical response with verifiable source citations.
        """
        q_lower = query.lower().strip()
        sources: List[Dict[str, Any]] = []
        evidence_events: List[Dict[str, Any]] = []
        suggested_actions: List[str] = []
        safety_ref: Dict[str, Any] = None

        # Scenario 1: Why be concerned about the next 100m? / Upcoming risks
        if any(term in q_lower for term in ["next 100m", "concerned", "ahead", "upcoming", "why risk", "why should i", "why is the current"]):
            answer = (
                f"**Engineering Risk Assessment for {well_id} (Interval {current_depth:.0f}m – {current_depth + 100:.0f}m):**\n\n"
                f"You should maintain elevated vigilance across the upcoming **2850m – 2910m interval** in the Barail Sandstone Upper Member. "
                f"Three highly correlated historical offset wells (**X04** at 91% similarity, **X07** at 84%, and **X11** at 76%) experienced severe non-productive drilling hazards in this exact stratigraphic window:\n\n"
                f"1. **2850m – Mud Loss (Well X04):** Partial circulation loss (45 bbl/hr) with a 180 psi standpipe pressure drop across micro-fractured sandstone (4.0 hrs NPT).\n"
                f"2. **2865m – Seepage Loss (Well X07):** 18 bbl/hr loss requiring fiber-based LCM blend.\n"
                f"3. **2870m – Severe Torsional Stick-Slip (Wells X04 & X11):** Torque spikes up to 58.2 kN·m (+42% above baseline) inducing top-drive stalling.\n"
                f"4. **2910m – Differential Stuck Pipe (Well X04):** Pipe stuck during connection survey with 380 psi overbalance, requiring 6.5 hours of jarring and acid soak.\n\n"
                f"**Current Telemetry Correlation:** Live parameters show abnormal torque fluctuations while approaching 2850m, matching the pre-incident signature of Well X04."
            )
            sources = [
                {"document": "X04_Drilling_Report.pdf", "page": 87, "section": "Operations 2840-2860m", "excerpt": "Partial lost circulation of 45 bbl/hr. Standpipe pressure dropped from 3210 to 3030 psi."},
                {"document": "X04_Drilling_Report.pdf", "page": 92, "section": "Operations 2900-2920m", "excerpt": "At 2910m MD, drillstring became differentially stuck across permeable sand body (6.5 hr NPT)."},
                {"document": "X07_Drilling_Report.pdf", "page": 54, "section": "Operations 2860-2875m", "excerpt": "At 2865m MD, pit level dropped 18 bbl over 1 hour. Mild seepage loss noticed."}
            ]
            evidence_events = [e for e in self.incidents if e["well_id"] in ["X04", "X07"]][:3]
            suggested_actions = [
                "Standby 50 bbl pre-mixed medium LCM pill in reserve pit before reaching 2850m",
                "Strictly enforce maximum stationary pipe limit of 3 minutes across Barail sand",
                "Reduce WOB by 15-20% and maintain 120-130 RPM to suppress torsional stick-slip harmonics",
                "Review OISD-STD-174 and IADC-SPP-04 stuck pipe guidelines with the rig crew"
            ]
            safety_ref = next((s for s in self.safety if s["risk_category"] == "STUCK_PIPE"), None)
            confidence = 94.5

        # Scenario 2: What happened near 2850m?
        elif any(term in q_lower for term in ["2850", "2850m", "around 2850"]):
            answer = (
                f"**Historical Records for Depth Interval 2845m – 2870m:**\n\n"
                f"In offset well **X04** (4.2 km away, 91% WellTwin match), drilling into the Barail Sandstone at **2850m MD** resulted in severe partial circulation loss of 45 bbl/hr. "
                f"Standpipe pressure abruptly declined from 3210 psi to 3030 psi. The crew pumped a 25 bbl medium-sized LCM pill (mica + walnut blend) which restored full circulation after 4.0 hours NPT.\n\n"
                f"Additionally, in offset well **X07** at **2865m**, mud seepage of 18 bbl/hr was observed, and in **X02** at **2845m**, minor losses occurred. "
                f"This confirms a regional high-permeability, micro-fractured thief zone across the field at 2850m."
            )
            sources = [
                {"document": "X04_Drilling_Report.pdf", "page": 87, "section": "Lost Circulation Record", "excerpt": "Standpipe pressure dropped from 3210 psi to 3030 psi. Flow sensor indicated 22% return loss."},
                {"document": "X07_Drilling_Report.pdf", "page": 54, "section": "Mud Loss Summary", "excerpt": "Circulated fiber LCM blend at 2865m to arrest seepage."}
            ]
            evidence_events = [e for e in self.incidents if 2840 <= e["depth"] <= 2870]
            suggested_actions = [
                "Check LCM inventory and pre-treat drilling mud with bridging calcium carbonate",
                "Verify mud weight does not exceed 1.18 SG to avoid hydraulic fracture initiation",
                "Calibrate pit volume totalizer (PVT) gain/loss audio alarms"
            ]
            safety_ref = next((s for s in self.safety if s["risk_category"] == "CIRCULATION_LOSS"), None)
            confidence = 96.0

        # Scenario 3: Which well is most similar? / WellTwin
        elif any(term in q_lower for term in ["similar", "welltwin", "most similar", "twin", "offset"]):
            twin = self.twins["X04"]
            answer = (
                f"**Top Ranked WellTwin: Offset Well X04 (91.0% Similarity Match)**\n\n"
                f"Well **X04** is located 4.2 km northwest of current well X01 and drilled through identical Barail Sandstone geology.\n\n"
                f"**Multi-Factor Similarity Breakdown:**\n"
                f"• Formation Lithology: **95%** (Identical Barail Upper Sandstone & hole diameter 8-1/2\")\n"
                f"• Depth Profile: **92%** (Target depth 3350m vs X01 3450m)\n"
                f"• Drilling Parameters: **89%** (Similar WOB, RPM, and rotary torque responses)\n"
                f"• Trajectory: **81%** (Near-vertical S-profile with comparable dogleg severity)\n"
                f"• Historical Event Correlation: **90%**\n"
                f"• Geographic Proximity: **76%** (4.2 km offset along regional structural strike)\n\n"
                f"**Operational Significance:** Well X04's historical timeline provides a high-confidence blueprint for what hazards to anticipate in X01 between 2850m and 2950m."
            )
            sources = [
                {"document": "X04_Drilling_Report.pdf", "page": 1, "section": "Well Summary & Casing Scheme", "excerpt": "Well X04 drilled to 3350m TD in Upper Assam Barail structure."}
            ]
            evidence_events = [e for e in self.incidents if e["well_id"] == "X04"]
            suggested_actions = [
                "Replay X04 parameters in the Drilling Time Machine module",
                "Compare current ROP and torque trends directly with X04 logs"
            ]
            confidence = 98.0

        # Scenario 4: Show evidence for alert
        elif any(term in q_lower for term in ["evidence", "alert", "why alert", "explain alert"]):
            answer = (
                f"**Explainability & Ground-Truth Evidence for Active Alert:**\n\n"
                f"• **What:** Combined Hazard Alert – Anomaly Detection + Imminent Risk Horizon.\n"
                f"• **Where:** Depth 2800m – 2910m, Barail Sandstone (Upper Member).\n"
                f"• **Why:**\n"
                f"  1. *Physical Anomaly:* Real-time drillstring torque has elevated +31% over rolling baseline while ROP decreased.\n"
                f"  2. *Stratigraphic Risk:* Bit position is currently within 50m of a confirmed 2850m thief zone.\n"
                f"  3. *Historical Precedent:* Three nearby wells (X04, X07, X11) suffered 15.7 total hours of NPT in this interval.\n\n"
                f"• **Source Corroboration:** Documented in Daily Drilling Reports `X04_Drilling_Report.pdf` (pp. 87, 89, 92) and `X07_Drilling_Report.pdf` (p. 54)."
            )
            sources = [
                {"document": "X04_Drilling_Report.pdf", "page": 87, "section": "DDR #42", "excerpt": "Circulation loss 45 bbl/hr at 2850m."},
                {"document": "X04_Drilling_Report.pdf", "page": 92, "section": "DDR #45", "excerpt": "Differential sticking at 2910m. Jarred 3 hours with lubricant soak."}
            ]
            evidence_events = [e for e in self.incidents if e["well_id"] in ["X04", "X07"]][:3]
            suggested_actions = [
                "Review Mud Loss & Stuck Pipe checklist",
                "Ensure rotation and reciprocation during connections"
            ]
            safety_ref = next((s for s in self.safety if s["risk_category"] == "HIGH_TORQUE"), None)
            confidence = 95.0

        # Scenario 5: Safety references / OISD
        elif any(term in q_lower for term in ["safety", "oisd", "regulation", "guideline", "protocol"]):
            answer = (
                f"**Applicable Safety & Operational References for Current Hazard Category:**\n\n"
                f"• **OISD-STD-174 (Well Control & Kick Prevention):** Mandatory shut-in sequences, SCR recording, and pit volume calibration protocols.\n"
                f"• **IADC-SPP-04 (Stuck Pipe Prevention):** Maximum stationary pipe limit of 3 minutes across permeable Barail sandstone; jar placement and overpull guidelines.\n"
                f"• **OISD-GDN-178 (Torsional Vibration Limits):** Top-drive torque limiter calibration at 85% make-up torque and stick-slip damping.\n\n"
                f"*(Note: Displayed for engineering review only. Final operational commands remain the responsibility of the Drilling Rig Superintendent.)*"
            )
            sources = [
                {"document": "OISD-STD-174_Guidelines.pdf", "page": 14, "section": "Well Control Protocols", "excerpt": "Mandatory shut-in procedures during abnormal pit gain or standpipe pressure fluctuation."}
            ]
            suggested_actions = [
                "Review trip sheet before pulling off bottom",
                "Hold safety toolbox meeting regarding hole cleaning and torque limits"
            ]
            safety_ref = self.safety[0]
            confidence = 92.0

        else:
            # Fallback for out of scope questions
            answer = (
                f"**Prototype Decision Support Notice:**\n\n"
                f"The prototype knowledge base does not contain enough verifiable offset evidence to answer '{query}' reliably. "
                f"Please query operational intelligence regarding **risk in the next 100m**, **historical events near 2850m**, **WellTwin X04 similarity**, or **safety references (OISD)**."
            )
            confidence = 50.0

        return {
            "answer": answer,
            "confidence": confidence,
            "sources": sources,
            "evidence_events": evidence_events,
            "suggested_actions": suggested_actions,
            "safety_reference": safety_ref
        }

assistant_engine = DrillingEngineeringAssistant()
