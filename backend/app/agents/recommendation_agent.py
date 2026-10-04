import logging
from typing import List, Dict, Any

logger = logging.getLogger("curenova.agents.recommendation")

class RecommendationAgent:
    """
    Recommendation Agent:
    - Generates RESEARCH and EVIDENCE recommendations (NEVER medical prescriptions).
    - Produces clinician discussion points for doctors.
    - Produces plain-language, non-prescriptive talking points for patients.
    - Formulates prioritized translational hypotheses for researchers.
    """

    def generate_doctor_discussion_points(
        self,
        pairwise_interactions: List[Dict[str, Any]],
        higher_order: List[Dict[str, Any]],
        context_alerts: List[str]
    ) -> List[str]:
        points = []

        for p in pairwise_interactions:
            if p.get("severity") == "High Risk":
                points.append(
                    f"Evaluate clinical indication for co-prescribing {p['drug_a']} and {p['drug_b']}. {p.get('doctor_guidance', '')}"
                )
            elif p.get("severity") == "Moderate Risk":
                points.append(
                    f"Consider laboratory or therapeutic monitoring for {p['drug_a']} + {p['drug_b']}: {p.get('mechanism', '')[:100]}..."
                )

        for ho in higher_order:
            points.append(
                f"High-Order Alert [{ho['name']}]: {ho.get('clinical_recommendation', '')}"
            )

        if not points:
            points.append("Standard periodic medication reconciliation recommended; no acute interaction contraindications flagged.")

        return points

    def generate_patient_friendly_summary(
        self,
        pairwise_interactions: List[Dict[str, Any]],
        higher_order: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        patient_items = []

        for p in pairwise_interactions:
            patient_items.append({
                "medications_involved": f"{p['drug_a']} and {p['drug_b']}",
                "severity_badge": p["severity"],
                "what_was_detected": f"A potential interaction was noted between {p['drug_a']} and {p['drug_b']}.",
                "why_it_matters": p.get("patient_explanation", "These medications may interact and require medical oversight."),
                "recommended_action": "Do NOT change your medicine on your own. Discuss this combination with your doctor or pharmacist at your next visit."
            })

        for ho in higher_order:
            patient_items.append({
                "medications_involved": ", ".join([d.title() for d in ho.get("drugs_involved", [])]),
                "severity_badge": ho["severity"],
                "what_was_detected": f"Combined effect detected: {ho['name']}",
                "why_it_matters": ho.get("patient_summary", "Taking these medicines together can place extra stress on your body."),
                "recommended_action": "Bring this complete medication list to your prescribing clinician for a safety review."
            })

        if not patient_items:
            patient_items.append({
                "medications_involved": "Current Medication List",
                "severity_badge": "Low Risk",
                "what_was_detected": "No major adverse interactions detected among your entered medicines.",
                "why_it_matters": "Your current entered medicines do not have documented severe conflict signals in our database.",
                "recommended_action": "Continue following your prescribing doctor's instructions."
            })

        return patient_items

    def generate_patient_questions(self, pairwise_interactions: List[Dict[str, Any]]) -> List[str]:
        questions = [
            "Are all of these medicines still necessary for my current health goals?",
            "Do I need any routine blood tests to check my kidney function, liver, or electrolyte levels?",
            "Are there any specific symptoms or warning signs I should watch out for while taking these together?"
        ]
        if any(p.get("severity") == "High Risk" for p in pairwise_interactions):
            questions.append("Is there an alternative medication with a lower interaction risk that we could consider?")
        return questions

recommendation_agent = RecommendationAgent()
