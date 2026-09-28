import time
import math
from typing import Dict, Any, List
from app.data.seed_data import CURRENT_WELL
from app.ml.anomaly import anomaly_engine
from app.services.risk_horizon import RiskHorizonService

class SimulationEngine:
    def __init__(self):
        self.well_id = CURRENT_WELL["well_id"]
        self.current_depth = 2800.0
        self.start_depth = 2800.0
        self.scenario = "normal"  # normal, torque_anomaly, risk_zone, combined
        self.is_running = False
        self.step_count = 0
        
        # Base nominal parameters
        self.base_telemetry = {
            "well_id": self.well_id,
            "depth": 2800.0,
            "rop": 18.2,
            "rpm": 118.0,
            "torque": 42.5,
            "wob": 14.2,
            "mud_weight": 1.18,
            "pressure": 3210.0,
            "flow_rate": 2200.0,
            "standpipe_pressure": 3210.0,
            "diff_pressure": 310.0
        }
        self.current_telemetry = dict(self.base_telemetry)
        
    def set_scenario(self, scenario: str, target_depth: float = None):
        valid_scenarios = ["normal", "torque_anomaly", "risk_zone", "combined"]
        if scenario in valid_scenarios:
            self.scenario = scenario
            if target_depth is not None:
                self.current_depth = float(target_depth)
            self._update_telemetry()
        return self.get_state()

    def set_depth(self, depth: float):
        self.current_depth = max(2700.0, min(3300.0, float(depth)))
        self._update_telemetry()
        return self.get_state()

    def reset(self):
        self.current_depth = self.start_depth
        self.scenario = "normal"
        self.step_count = 0
        self.is_running = False
        self.current_telemetry = dict(self.base_telemetry)
        return self.get_state()

    def start(self):
        self.is_running = True
        return self.get_state()

    def pause(self):
        self.is_running = False
        return self.get_state()

    def step(self):
        """Advances simulation forward by one operational time-step."""
        self.step_count += 1
        
        # In risk_zone or combined scenarios, advance bit depth
        if self.scenario in ["risk_zone", "combined"]:
            # Increment depth by 5m per step up to 2920m
            if self.current_depth < 2920.0:
                self.current_depth += 5.0
            else:
                self.current_depth = 2800.0  # Loop back for demonstration
        elif self.scenario == "normal":
            # Very slow depth creeping
            self.current_depth = round(self.current_depth + 0.5, 1)
            if self.current_depth > 2815.0:
                self.current_depth = 2800.0
                
        self._update_telemetry()
        return self.get_state()

    def _update_telemetry(self):
        depth = self.current_depth
        depth_offset = depth - 2800.0
        
        if self.scenario == "normal":
            # Small realistic random flutter
            flutter = math.sin(self.step_count * 0.4)
            self.current_telemetry = {
                "well_id": self.well_id,
                "depth": round(depth, 1),
                "rop": round(18.2 + flutter * 0.4, 1),
                "rpm": round(118.0 + flutter * 1.5, 0),
                "torque": round(42.5 + flutter * 0.8, 1),
                "wob": round(14.2 + flutter * 0.2, 1),
                "mud_weight": 1.18,
                "pressure": round(3210.0 + flutter * 15.0, 0),
                "flow_rate": round(2200.0 + flutter * 10.0, 0),
                "standpipe_pressure": round(3210.0 + flutter * 15.0, 0)
            }
            
        elif self.scenario == "torque_anomaly":
            # Progressive torque rise and ROP drop (mimicking bit-wear / tight hole)
            progress = min(1.0, (self.step_count % 15) / 10.0)
            added_torque = progress * 21.0  # Reaches ~63.5 kN·m
            dropped_rop = progress * 7.5    # Drops to ~10.7 m/hr
            self.current_telemetry = {
                "well_id": self.well_id,
                "depth": round(depth, 1),
                "rop": round(max(9.0, 18.2 - dropped_rop), 1),
                "rpm": 118.0,
                "torque": round(42.5 + added_torque, 1),
                "wob": round(14.2 + progress * 2.0, 1),
                "mud_weight": 1.18,
                "pressure": round(3210.0 + progress * 80.0, 0),
                "flow_rate": 2200.0,
                "standpipe_pressure": round(3210.0 + progress * 80.0, 0)
            }
            
        elif self.scenario == "risk_zone":
            # Parameters start changing as bit approaches 2850m
            if depth < 2840.0:
                t_val = 42.5
                rop_val = 18.2
                p_val = 3210.0
            elif depth < 2860.0:
                # Mud loss zone entry at 2850m
                t_val = 46.0
                rop_val = 19.5
                p_val = 3030.0 # Pressure drops
            elif depth < 2885.0:
                # High torque zone at 2870m
                t_val = 56.5
                rop_val = 13.0
                p_val = 3280.0
            else:
                # Stuck pipe risk at 2910m
                t_val = 65.0
                rop_val = 2.0
                p_val = 3380.0
                
            self.current_telemetry = {
                "well_id": self.well_id,
                "depth": round(depth, 1),
                "rop": round(rop_val, 1),
                "rpm": 118.0,
                "torque": round(t_val, 1),
                "wob": 14.5,
                "mud_weight": 1.18,
                "pressure": round(p_val, 0),
                "flow_rate": 2200.0,
                "standpipe_pressure": round(p_val, 0)
            }
            
        elif self.scenario == "combined":
            # The Main SIH Demo Scenario:
            # Depth moves from 2800m towards 2850-2910m AND torque rises sharply!
            if depth < 2835.0:
                step_ratio = (depth - 2800.0) / 35.0
                t_val = 42.5 + step_ratio * 12.0 # 42.5 -> 54.5
                rop_val = 18.2 - step_ratio * 4.0 # 18.2 -> 14.2
                p_val = 3210.0 - step_ratio * 40.0
            elif depth < 2865.0:
                # Entering mud loss & torque anomaly
                step_ratio = (depth - 2835.0) / 30.0
                t_val = 54.5 + step_ratio * 8.0 # 54.5 -> 62.5
                rop_val = 14.2 - step_ratio * 3.5 # 14.2 -> 10.7
                p_val = 3030.0 + step_ratio * 120.0
            elif depth < 2895.0:
                step_ratio = (depth - 2865.0) / 30.0
                t_val = 62.5 + step_ratio * 6.0 # 62.5 -> 68.5
                rop_val = 10.7 - step_ratio * 7.0 # 10.7 -> 3.7
                p_val = 3280.0 + step_ratio * 80.0
            else:
                t_val = 71.0
                rop_val = 0.5
                p_val = 3450.0
                
            self.current_telemetry = {
                "well_id": self.well_id,
                "depth": round(depth, 1),
                "rop": round(rop_val, 1),
                "rpm": 115.0,
                "torque": round(t_val, 1),
                "wob": 15.0,
                "mud_weight": 1.18,
                "pressure": round(p_val, 0),
                "flow_rate": 2180.0,
                "standpipe_pressure": round(p_val, 0)
            }

    def get_state(self) -> Dict[str, Any]:
        anomaly = anomaly_engine.evaluate(self.current_telemetry)
        risk = RiskHorizonService.calculate_horizon(
            self.current_depth, 
            is_anomaly_active=anomaly["is_anomaly"]
        )
        return {
            "current_well_id": self.well_id,
            "scenario": self.scenario,
            "is_running": self.is_running,
            "depth": round(self.current_depth, 1),
            "step_count": self.step_count,
            "telemetry": self.current_telemetry,
            "anomaly": anomaly,
            "risk_horizon": risk
        }

# Global singleton simulator
simulator = SimulationEngine()
