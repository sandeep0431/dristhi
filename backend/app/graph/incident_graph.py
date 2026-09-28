from typing import Dict, Any, List
from app.data.seed_data import HISTORICAL_INCIDENTS, DEMO_REPORTS

class IncidentGraphService:
    @staticmethod
    def get_graph(well_id: str = "X04") -> Dict[str, Any]:
        """
        Builds a multi-relational knowledge graph connecting:
        Well -> Formation -> Depth -> Parameter Pattern -> Incident -> NPT -> Source Document
        """
        # Filter incidents for this well or entire risk interval
        incidents = [e for e in HISTORICAL_INCIDENTS if e["well_id"].upper() == well_id.upper()]
        if not incidents:
            incidents = HISTORICAL_INCIDENTS[:3]
            
        nodes = []
        edges = []
        node_ids = set()
        
        def add_node(nid: str, label: str, group: str, details: Dict[str, Any]):
            if nid not in node_ids:
                node_ids.add(nid)
                nodes.append({
                    "id": nid,
                    "label": label,
                    "group": group,
                    "details": details
                })
                
        def add_edge(source: str, target: str, label: str):
            edges.append({
                "id": f"{source}->{target}",
                "source": source,
                "target": target,
                "label": label
            })
            
        # Root Well Node
        well_nid = f"well-{well_id}"
        add_node(well_nid, f"Well {well_id}", "well", {
            "title": f"Offset Well {well_id}",
            "type": "Offset Well Record",
            "field": "Upper Assam Basin",
            "similarity": "91% WellTwin match with Current Well X01",
            "formation": "Barail Sandstone (Upper Member)"
        })
        
        # Formation Node
        formation_nid = "form-barail-upper"
        add_node(formation_nid, "Barail Sandstone", "formation", {
            "title": "Barail Sandstone (Upper Member)",
            "type": "Geological Formation",
            "depth_range": "2400m - 2950m",
            "lithology": "Fractured Quartzitic Sandstone",
            "risk_profile": "Prone to severe differential sticking and mud loss"
        })
        add_edge(well_nid, formation_nid, "HAS_FORMATION")
        
        for inc in incidents:
            event_nid = f"event-{inc['id']}"
            depth_nid = f"depth-{int(inc['depth'])}m"
            pattern_nid = f"pattern-{inc['id']}"
            npt_nid = f"npt-{inc['id']}"
            doc_nid = f"doc-{inc['source_document']}"
            
            # Event Node
            add_node(event_nid, f"{inc['event_type']} @ {int(inc['depth'])}m", "incident", {
                "title": f"{inc['event_type']} Hazard",
                "severity": inc["severity"],
                "depth": f"{inc['depth']} m",
                "description": inc["description"],
                "recommendation": inc["recommendation"]
            })
            add_edge(well_nid, event_nid, "HAS_EVENT")
            add_edge(formation_nid, event_nid, "CONTAINED_IN")
            
            # Depth Node
            add_node(depth_nid, f"{int(inc['depth'])} m", "depth", {
                "title": f"Depth Interval: {int(inc['depth'])}m",
                "type": "Stratigraphic Depth Marker",
                "delta_from_x01": f"{inc['depth'] - 2800:.0f}m below current bit depth"
            })
            add_edge(event_nid, depth_nid, "OCCURRED_AT")
            
            # Parameter Pattern Node
            pattern_desc = "Pressure drop -180 psi, loss of returns" if inc["event_type"] == "MUD_LOSS" else (
                "Torque +42%, rotary stall" if inc["event_type"] == "HIGH_TORQUE" else "Zero ROP, stationary pipe 12min"
            )
            add_node(pattern_nid, f"Signature: {inc['event_type']}", "pattern", {
                "title": "Drilling Telemetry Signature",
                "description": pattern_desc,
                "recorded_snapshot": inc.get("parameters_snapshot", {})
            })
            add_edge(event_nid, pattern_nid, "ASSOCIATED_WITH")
            
            # NPT Node
            add_node(npt_nid, f"NPT: {inc['npt_hours']}h", "npt", {
                "title": "Non-Productive Time (NPT)",
                "hours": f"{inc['npt_hours']} hours",
                "operational_delay": f"Standby & Remediation cost: ~${inc['npt_hours'] * 12500:,.0f} USD"
            })
            add_edge(event_nid, npt_nid, "CAUSED_NPT")
            
            # Source Document Node
            add_node(doc_nid, inc["source_document"], "document", {
                "title": f"Daily Drilling Report: {inc['source_document']}",
                "page": f"Page {inc['source_page']}",
                "verification_status": "Verified Ground-Truth Archive"
            })
            add_edge(event_nid, doc_nid, "HAS_SOURCE")
            
        return {
            "well_id": well_id,
            "nodes": nodes,
            "edges": edges,
            "metadata": {
                "total_nodes": len(nodes),
                "total_edges": len(edges),
                "ontology": "Well-Formation-Incident-Telemetry-Document Graph"
            }
        }
