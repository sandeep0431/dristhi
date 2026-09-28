from typing import Dict, Any, List
from app.data.seed_data import WELLTWIN_SIMILARITY_DATA, OFFSET_WELLS, HISTORICAL_INCIDENTS

class WellTwinService:
    @staticmethod
    def get_twins(current_well_id: str = "X01") -> List[Dict[str, Any]]:
        """
        Returns ranked list of historical WellTwins for the current well
        using the weighted prototype similarity model:
        0.25 * formation + 0.20 * depth + 0.15 * trajectory + 0.20 * parameters + 0.10 * events + 0.10 * spatial
        """
        results = []
        for well in OFFSET_WELLS:
            wid = well["well_id"]
            if wid in WELLTWIN_SIMILARITY_DATA:
                twin_data = WELLTWIN_SIMILARITY_DATA[wid]
                results.append({
                    "well_id": wid,
                    "name": well["name"],
                    "similarity": twin_data["similarity"],
                    "distance_km": twin_data["distance_km"],
                    "total_depth": twin_data["total_depth"],
                    "formation": twin_data["formation"],
                    "factors": twin_data["factors"],
                    "events_count": twin_data["events_count"],
                    "primary_risks": twin_data["primary_risks"],
                    "evidence_notes": twin_data["evidence_notes"],
                    "latitude": well["latitude"],
                    "longitude": well["longitude"]
                })
            else:
                # Dynamic calculation for remaining offset wells
                # Spatial score drops with distance
                dist = well.get("distance_km", 10.0)
                spatial_score = max(20.0, 100.0 - dist * 4.5)
                # Formation score
                is_same_formation = "Barail" in well.get("formation", "")
                formation_score = 85.0 if is_same_formation else 45.0
                depth_diff = abs(well.get("total_depth", 3300) - 3400)
                depth_score = max(30.0, 100.0 - (depth_diff / 10.0))
                param_score = 65.0 if is_same_formation else 40.0
                events = [e for e in HISTORICAL_INCIDENTS if e["well_id"] == wid]
                events_score = min(90.0, 50.0 + len(events) * 20.0)
                traj_score = 70.0
                
                sim = (
                    0.25 * formation_score +
                    0.20 * depth_score +
                    0.15 * traj_score +
                    0.20 * param_score +
                    0.10 * events_score +
                    0.10 * spatial_score
                )
                
                results.append({
                    "well_id": wid,
                    "name": well["name"],
                    "similarity": round(sim, 1),
                    "distance_km": round(dist, 1),
                    "total_depth": well["total_depth"],
                    "formation": well["formation"],
                    "factors": {
                        "formation": round(formation_score, 1),
                        "depth": round(depth_score, 1),
                        "trajectory": round(traj_score, 1),
                        "parameters": round(param_score, 1),
                        "events": round(events_score, 1),
                        "spatial": round(spatial_score, 1)
                    },
                    "events_count": len(events),
                    "primary_risks": [e["event_type"] for e in events[:2]],
                    "evidence_notes": f"Offset well {wid} at {dist:.1f}km. Historical data matches regional structural strike.",
                    "latitude": well["latitude"],
                    "longitude": well["longitude"]
                })
                
        # Sort descending by similarity score
        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results

    @staticmethod
    def get_twin_detail(well_id: str) -> Dict[str, Any]:
        twins = WellTwinService.get_twins()
        for t in twins:
            if t["well_id"].upper() == well_id.upper():
                # Add historical events details
                events = [e for e in HISTORICAL_INCIDENTS if e["well_id"] == t["well_id"]]
                return {**t, "incident_details": events}
        return twins[0] # Fallback to top twin (X04)
