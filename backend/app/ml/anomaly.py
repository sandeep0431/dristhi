import numpy as np
from sklearn.ensemble import IsolationForest
from typing import Dict, Any, List, Tuple

class DrillingAnomalyDetector:
    def __init__(self):
        # Baseline normal drilling parameter statistics (Barail Sandstone drilling)
        self.baseline = {
            "depth": 2800.0,
            "rop": 18.2,       # m/hr
            "rpm": 118.0,      # RPM
            "torque": 42.5,    # kN·m
            "wob": 14.2,       # klbf
            "mud_weight": 1.18,# SG
            "pressure": 3210.0,# psi
            "flow_rate": 2200.0# L/min
        }
        
        # Train Isolation Forest on synthetic normal drilling distribution
        np.random.seed(42)
        n_samples = 400
        normal_data = np.zeros((n_samples, 7))
        # [rop, rpm, torque, wob, mud_weight, pressure, flow_rate]
        normal_data[:, 0] = np.random.normal(18.2, 1.2, n_samples)  # ROP
        normal_data[:, 1] = np.random.normal(118.0, 3.0, n_samples) # RPM
        normal_data[:, 2] = np.random.normal(42.5, 2.5, n_samples)  # Torque
        normal_data[:, 3] = np.random.normal(14.2, 1.0, n_samples)  # WOB
        normal_data[:, 4] = np.random.normal(1.18, 0.01, n_samples) # Mud Weight
        normal_data[:, 5] = np.random.normal(3210.0, 45.0, n_samples) # Pressure
        normal_data[:, 6] = np.random.normal(2200.0, 30.0, n_samples) # Flow Rate
        
        self.model = IsolationForest(
            n_estimators=100,
            contamination=0.05,
            random_state=42
        )
        self.model.fit(normal_data)

    def evaluate(self, telemetry: Dict[str, Any]) -> Dict[str, Any]:
        """
        Evaluates drilling telemetry using Isolation Forest ML + Rule-based physical limits.
        Returns explainable engineering diagnosis.
        """
        rop = float(telemetry.get("rop", self.baseline["rop"]))
        rpm = float(telemetry.get("rpm", self.baseline["rpm"]))
        torque = float(telemetry.get("torque", self.baseline["torque"]))
        wob = float(telemetry.get("wob", self.baseline["wob"]))
        mud_weight = float(telemetry.get("mud_weight", self.baseline["mud_weight"]))
        pressure = float(telemetry.get("pressure", self.baseline["pressure"]))
        flow_rate = float(telemetry.get("flow_rate", self.baseline["flow_rate"]))
        
        sample = np.array([[rop, rpm, torque, wob, mud_weight, pressure, flow_rate]])
        
        # Isolation Forest prediction: -1 = outlier/anomaly, 1 = normal
        ml_prediction = self.model.predict(sample)[0]
        # Raw decision score: lower values indicate more abnormal behavior
        raw_score = float(self.model.decision_function(sample)[0])
        
        # Rule-based delta checks against rolling baseline
        explanations: List[str] = []
        flagged_features: List[str] = []
        
        torque_pct = ((torque - self.baseline["torque"]) / self.baseline["torque"]) * 100.0
        rop_pct = ((rop - self.baseline["rop"]) / self.baseline["rop"]) * 100.0
        pressure_delta = pressure - self.baseline["pressure"]
        
        is_rule_anomaly = False
        
        if torque_pct > 20.0:
            is_rule_anomaly = True
            flagged_features.append("torque")
            explanations.append(f"Torque +{torque_pct:.1f}% above rolling baseline (Current: {torque:.1f} kN·m vs Normal: {self.baseline['torque']} kN·m)")
            
        if rop_pct < -18.0:
            is_rule_anomaly = True
            flagged_features.append("rop")
            explanations.append(f"ROP dropped {abs(rop_pct):.1f}% below formation expectation (Current: {rop:.1f} m/hr)")
            
        if abs(pressure_delta) > 120.0:
            is_rule_anomaly = True
            flagged_features.append("pressure")
            if pressure_delta < 0:
                explanations.append(f"Standpipe pressure dropped by {abs(pressure_delta):.0f} psi (potential loss of returns/mud seepage)")
            else:
                explanations.append(f"Standpipe pressure surged by +{pressure_delta:.0f} psi (potential annular pack-off restriction)")
                
        is_anomaly = (ml_prediction == -1) or is_rule_anomaly
        
        # Compute normalized confidence score (0 to 100)
        confidence = 0.0
        if is_anomaly:
            # Map raw score and rule deviations into a clean percentage
            score_factor = max(0.0, min(1.0, (0.15 - raw_score) * 4.0))
            rule_factor = min(1.0, (abs(torque_pct) + abs(rop_pct)) / 60.0)
            confidence = round(min(98.5, max(65.0, (score_factor * 0.4 + rule_factor * 0.6) * 100.0)), 1)
            status = "CRITICAL_ANOMALY" if (torque_pct > 35.0 or (torque_pct > 20.0 and rop_pct < -20.0)) else "ELEVATED_ANOMALY"
        else:
            status = "NORMAL"
            confidence = round(max(92.0, min(99.0, 95.0 + raw_score * 20.0)), 1)
            explanations.append("All mechanical & hydraulic parameters within nominal Barail baseline tolerances")

        return {
            "is_anomaly": is_anomaly,
            "status": status,
            "anomaly_score": round(raw_score, 4),
            "confidence": confidence,
            "explanations": explanations,
            "features_flagged": flagged_features
        }

# Singleton instance
anomaly_engine = DrillingAnomalyDetector()
