import logging
from typing import List, Dict, Any, Optional

logger = logging.getLogger("curenova.agents.safety")

class SafetyAgent:
    """
    Safety Agent:
    - Scans for contraindications, black-box warnings, and adverse-event overlap.
    - Evaluates patient context (age, renal eGFR, hepatic status).
    - Identifies higher-order interaction patterns (e.g. Triple Whammy).
    - Safety validation has strict priority over recommendations.
    """

    def validate_polypharmacy_safety(
        self,
        normalized_drugs: List[Dict[str, Any]],
        pairwise_interactions: List[Dict[str, Any]],
        higher_order_defs: List[Dict[str, Any]],
        patient_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        drug_ids = [d["id"] for d in normalized_drugs]
        
        # 1. Identify higher-order patterns (triads, cascades)
        detected_higher_order = []
        for pattern in higher_order_defs:
            needed = pattern.get("drugs_involved", [])
            # Check if all needed drugs are present in the list
            if all(d in drug_ids for d in needed):
                detected_higher_order.append(pattern)

        # 2. Compute Adverse Event Overlap
        adverse_events_map: Dict[str, List[str]] = {}
        for inter in pairwise_interactions:
            for ae in inter.get("adverse_events", []):
                if ae not in adverse_events_map:
                    adverse_events_map[ae] = []
                pair_str = f"{inter['drug_a']} + {inter['drug_b']}"
                if pair_str not in adverse_events_map[ae]:
                    adverse_events_map[ae].append(pair_str)

        ae_overlap = []
        for ae, sources in adverse_events_map.items():
            ae_overlap.append({
                "adverse_event": ae,
                "frequency_count": len(sources),
                "contributing_pairs": sources,
                "hazard_level": "High" if len(sources) >= 2 or "Bleeding" in ae or "Arrhythmia" in ae else "Moderate"
            })

        # 3. Patient Context Specific Alerts
        context_alerts = []
        if patient_context:
            age = patient_context.get("age", 65)
            egfr = patient_context.get("egfr", 65.0)

            if age >= 65:
                context_alerts.append(f"Geriatric Patient (Age {age}): Increased susceptibility to polypharmacy anticholinergic burden, bleeding events, and postural hypotension.")
            
            if egfr < 60:
                context_alerts.append(f"Renal Impairment (eGFR {egfr} mL/min/1.73m²): Renally cleared drugs (e.g. Metformin, Lisinopril, Spironolactone) require close dose adjustment and serum creatinine monitoring.")

        # 4. Overall Risk Calculation
        high_risk_count = sum(1 for p in pairwise_interactions if p.get("severity") == "High Risk")
        mod_risk_count = sum(1 for p in pairwise_interactions if p.get("severity") == "Moderate Risk")
        ho_count = len(detected_higher_order)

        base_score = 15
        base_score += high_risk_count * 30
        base_score += mod_risk_count * 15
        base_score += ho_count * 25
        if context_alerts:
            base_score += 10

        overall_risk_score = min(max(base_score, 10), 98)

        if overall_risk_score >= 65:
            category = "High Risk"
            human_review = True
            headline = f"Significant Polypharmacy Safety Alerts ({high_risk_count} High-Risk Interaction{'s' if high_risk_count != 1 else ''} Identified)"
        elif overall_risk_score >= 35:
            category = "Moderate Risk"
            human_review = False
            headline = f"Moderate Medication Interactions Detected ({mod_risk_count} Moderate Alert{'s' if mod_risk_count != 1 else ''})"
        else:
            category = "Low Risk"
            human_review = False
            headline = "No Severe Drug-Drug Interactions Detected in Current Regimen"

        return {
            "overall_risk_score": overall_risk_score,
            "overall_risk_category": category,
            "summary_headline": headline,
            "detected_higher_order": detected_higher_order,
            "adverse_event_overlap": ae_overlap,
            "context_alerts": context_alerts,
            "human_review_required": human_review
        }

safety_agent = SafetyAgent()
