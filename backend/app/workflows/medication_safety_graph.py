import time
import uuid
import logging
from typing import TypedDict, List, Dict, Any, Optional
from datetime import datetime, timezone
from langgraph.graph import StateGraph, END

from app.agents.retrieval_agent import retrieval_agent
from app.agents.reasoning_agent import reasoning_agent
from app.agents.safety_agent import safety_agent
from app.agents.recommendation_agent import recommendation_agent
from app.database import db

logger = logging.getLogger("curenova.workflow.safety")

class MedicationSafetyWorkflowState(TypedDict):
    analysis_id: str
    medications: List[str]
    patient_context: Optional[Dict[str, Any]]
    role_view: str
    timestamp: str
    normalized_drugs: List[Dict[str, Any]]
    pairwise_interactions: List[Dict[str, Any]]
    higher_order_patterns: List[Dict[str, Any]]
    interaction_matrix: List[Dict[str, Any]]
    safety_results: Dict[str, Any]
    clinician_discussion_points: List[str]
    patient_friendly_summary: List[Dict[str, Any]]
    patient_questions_for_doctor: List[str]
    overall_risk_score: int
    overall_risk_category: str
    summary_headline: str
    human_review_required: bool
    safety_disclaimer: str

# Node 1: Medication Normalization & Retrieval
def node_normalization_retrieval(state: MedicationSafetyWorkflowState) -> Dict[str, Any]:
    meds = state["medications"]
    retrieval_res = retrieval_agent.retrieve_medication_data(meds)
    return {
        "normalized_drugs": retrieval_res["normalized_drugs"]
    }

# Node 2: Pairwise Interaction Analysis
def node_pairwise_analysis(state: MedicationSafetyWorkflowState) -> Dict[str, Any]:
    normalized_drugs = state["normalized_drugs"]
    known_interactions = db.polypharmacy_data.get("pairwise_interactions", [])
    
    pairwise = reasoning_agent.analyze_pairwise_connections(normalized_drugs, known_interactions)
    
    # Build Interaction Matrix for all N x N drug pairs
    matrix_cells = []
    canonical_names = [d["canonical_name"] for d in normalized_drugs]
    
    for r in canonical_names:
        for c in canonical_names:
            if r == c:
                matrix_cells.append({
                    "drug_row": r,
                    "drug_col": c,
                    "severity": "None",
                    "has_interaction": False,
                    "summary": "Self"
                })
            else:
                inter = next((p for p in pairwise if (p["drug_a"] == r and p["drug_b"] == c) or (p["drug_a"] == c and p["drug_b"] == r)), None)
                if inter:
                    matrix_cells.append({
                        "drug_row": r,
                        "drug_col": c,
                        "severity": inter["severity"],
                        "has_interaction": True,
                        "summary": inter["mechanism"][:90] + "..."
                    })
                else:
                    matrix_cells.append({
                        "drug_row": r,
                        "drug_col": c,
                        "severity": "None",
                        "has_interaction": False,
                        "summary": "No documented direct pharmacokinetic conflict"
                    })
                    
    return {
        "pairwise_interactions": pairwise,
        "interaction_matrix": matrix_cells
    }

# Node 3: Safety Agent Deep Validation
def node_safety_validation(state: MedicationSafetyWorkflowState) -> Dict[str, Any]:
    normalized_drugs = state["normalized_drugs"]
    pairwise = state["pairwise_interactions"]
    ho_patterns = db.polypharmacy_data.get("higher_order_patterns", [])
    patient_context = state.get("patient_context")
    
    safety_eval = safety_agent.validate_polypharmacy_safety(
        normalized_drugs=normalized_drugs,
        pairwise_interactions=pairwise,
        higher_order_defs=ho_patterns,
        patient_context=patient_context
    )
    
    return {
        "safety_results": safety_eval,
        "higher_order_patterns": safety_eval.get("detected_higher_order", []),
        "overall_risk_score": safety_eval["overall_risk_score"],
        "overall_risk_category": safety_eval["overall_risk_category"],
        "summary_headline": safety_eval["summary_headline"],
        "human_review_required": safety_eval["human_review_required"]
    }

# Node 4: Recommendation Agent (Clinical vs Patient View Synthesis)
def node_recommendation_synthesis(state: MedicationSafetyWorkflowState) -> Dict[str, Any]:
    pairwise = state["pairwise_interactions"]
    higher_order = state["higher_order_patterns"]
    safety_res = state["safety_results"]
    context_alerts = safety_res.get("context_alerts", [])
    
    doctor_points = recommendation_agent.generate_doctor_discussion_points(
        pairwise_interactions=pairwise,
        higher_order=higher_order,
        context_alerts=context_alerts
    )
    
    patient_summary = recommendation_agent.generate_patient_friendly_summary(
        pairwise_interactions=pairwise,
        higher_order=higher_order
    )
    
    patient_questions = recommendation_agent.generate_patient_questions(pairwise)
    
    disclaimer = (
        "CureNova is a clinical and research decision-support prototype. "
        "It does not diagnose, prescribe, or replace professional medical judgment. "
        "Patients should never alter, discontinue, or start medications without consulting their licensed healthcare professional."
    )
    
    return {
        "clinician_discussion_points": doctor_points,
        "patient_friendly_summary": patient_summary,
        "patient_questions_for_doctor": patient_questions,
        "safety_disclaimer": disclaimer
    }

def build_medication_safety_graph():
    builder = StateGraph(MedicationSafetyWorkflowState)
    builder.add_node("normalization_retrieval", node_normalization_retrieval)
    builder.add_node("pairwise_analysis", node_pairwise_analysis)
    builder.add_node("safety_validation", node_safety_validation)
    builder.add_node("recommendation_synthesis", node_recommendation_synthesis)
    
    builder.set_entry_point("normalization_retrieval")
    builder.add_edge("normalization_retrieval", "pairwise_analysis")
    builder.add_edge("pairwise_analysis", "safety_validation")
    builder.add_edge("safety_validation", "recommendation_synthesis")
    builder.add_edge("recommendation_synthesis", END)
    
    return builder.compile()

medication_safety_graph = build_medication_safety_graph()

def execute_medication_safety_analysis(
    medications: List[str],
    patient_context: Optional[Dict[str, Any]] = None,
    role_view: str = "doctor"
) -> Dict[str, Any]:
    analysis_id = f"ana-med-{uuid.uuid4().hex[:8]}"
    initial_state: MedicationSafetyWorkflowState = {
        "analysis_id": analysis_id,
        "medications": medications,
        "patient_context": patient_context,
        "role_view": role_view,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "normalized_drugs": [],
        "pairwise_interactions": [],
        "higher_order_patterns": [],
        "interaction_matrix": [],
        "safety_results": {},
        "clinician_discussion_points": [],
        "patient_friendly_summary": [],
        "patient_questions_for_doctor": [],
        "overall_risk_score": 0,
        "overall_risk_category": "Low Risk",
        "summary_headline": "",
        "human_review_required": False,
        "safety_disclaimer": ""
    }
    
    final_state = medication_safety_graph.invoke(initial_state)
    
    # Save into DB
    db.save_analysis(analysis_id, {
        "type": "medication_safety",
        "data": final_state
    })
    
    return final_state

def simulate_digital_twin(
    baseline_meds: List[str],
    candidate_added_drugs: List[str],
    candidate_removed_drugs: List[str],
    patient_context: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    sim_id = f"sim-twin-{uuid.uuid4().hex[:8]}"
    
    # 1. Run baseline
    baseline_result = execute_medication_safety_analysis(baseline_meds, patient_context, role_view="doctor")
    
    # 2. Formulate scenario regimen
    scenario_meds = [m for m in baseline_meds if m.lower() not in [r.lower() for r in candidate_removed_drugs]]
    for add_drug in candidate_added_drugs:
        if add_drug.lower() not in [m.lower() for m in scenario_meds]:
            scenario_meds.append(add_drug)
            
    scenario_result = execute_medication_safety_analysis(scenario_meds, patient_context, role_view="doctor")
    
    delta = scenario_result["overall_risk_score"] - baseline_result["overall_risk_score"]
    if delta > 15:
        change_label = f"+{delta} (Significant Hazard Escalation)"
        assessment = "Adding the specified medication(s) introduces critical synergistic pharmacodynamic or pharmacokinetic risk factors."
    elif delta > 0:
        change_label = f"+{delta} (Mild Risk Increase)"
        assessment = "Minor interaction increase detected; manageable with routine clinical monitoring."
    elif delta < 0:
        change_label = f"{delta} (Risk Reduction Achieved)"
        assessment = "Simulated scenario successfully eliminates previous competitive interaction or high-risk triad."
    else:
        change_label = "0 (Neutral Profile)"
        assessment = "No net alteration to quantified interaction risk profile."

    # Compare interactions
    baseline_pairs = {(p["drug_a"], p["drug_b"]) for p in baseline_result["pairwise_interactions"]}
    scenario_pairs = {(p["drug_a"], p["drug_b"]) for p in scenario_result["pairwise_interactions"]}
    
    triggered_new = [p for p in scenario_result["pairwise_interactions"] if (p["drug_a"], p["drug_b"]) not in baseline_pairs]
    resolved = [p for p in baseline_result["pairwise_interactions"] if (p["drug_a"], p["drug_b"]) not in scenario_pairs]

    return {
        "simulation_id": sim_id,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "baseline_medications": baseline_meds,
        "scenario_medications": scenario_meds,
        "baseline_risk_score": baseline_result["overall_risk_score"],
        "scenario_risk_score": scenario_result["overall_risk_score"],
        "risk_delta": delta,
        "risk_change_label": change_label,
        "triggered_new_interactions": triggered_new,
        "resolved_interactions": resolved,
        "simulation_assessment": assessment,
        "disclaimer": "Scenario simulation is an investigational decision-support model. Always verify medication changes with a qualified physician."
    }
