from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class PatientContext(BaseModel):
    age: Optional[int] = 65
    egfr: Optional[float] = 65.0  # mL/min/1.73m^2
    hepatic_status: Optional[str] = "Normal"
    conditions: Optional[List[str]] = Field(default_factory=list)

class MedicationSafetyRequest(BaseModel):
    medications: List[str] = Field(..., min_length=1, description="List of medication names or brands")
    patient_context: Optional[PatientContext] = None
    role_view: Optional[str] = "doctor"  # "doctor" or "patient"

class NormalizedDrug(BaseModel):
    raw_input: str
    canonical_name: str
    rxcui: Optional[str] = None
    atc_code: Optional[str] = None
    drug_class: str
    target: str

class PairwiseInteraction(BaseModel):
    drug_a: str
    drug_b: str
    severity: str  # "High Risk", "Moderate Risk", "Low Risk"
    risk_level: str  # "severe", "moderate", "mild"
    interaction_type: str
    mechanism: str
    adverse_events: List[str]
    evidence_level: str
    confidence_score: float
    citations: List[Dict[str, Any]]
    doctor_guidance: str
    patient_explanation: str
    uncertainty: str

class HigherOrderPattern(BaseModel):
    id: str
    name: str
    drugs_involved: List[str]
    severity: str
    pattern_description: str
    adverse_effects: List[str]
    clinical_recommendation: str
    patient_summary: str

class InteractionMatrixCell(BaseModel):
    drug_row: str
    drug_col: str
    severity: str
    has_interaction: bool
    summary: str

class MedicationSafetyResponse(BaseModel):
    analysis_id: str
    timestamp: str
    role_view: str
    normalized_drugs: List[NormalizedDrug]
    overall_risk_score: int  # 0 to 100
    overall_risk_category: str  # "High Risk", "Moderate Risk", "Low Risk"
    summary_headline: str
    
    # Doctor specific details
    pairwise_interactions: List[PairwiseInteraction]
    higher_order_patterns: List[HigherOrderPattern]
    interaction_matrix: List[InteractionMatrixCell]
    adverse_event_overlap: List[Dict[str, Any]]
    clinician_discussion_points: List[str]
    patient_context_considerations: List[str]
    
    # Patient specific details
    patient_friendly_summary: List[Dict[str, Any]]
    patient_questions_for_doctor: List[str]
    
    safety_disclaimer: str
    human_review_required: bool = False

class DigitalTwinSimRequest(BaseModel):
    baseline_medications: List[str]
    candidate_added_drugs: List[str] = Field(default_factory=list)
    candidate_removed_drugs: List[str] = Field(default_factory=list)
    patient_context: Optional[PatientContext] = None

class DigitalTwinSimResponse(BaseModel):
    simulation_id: str
    timestamp: str
    baseline_medications: List[str]
    scenario_medications: List[str]
    baseline_risk_score: int
    scenario_risk_score: int
    risk_delta: int
    risk_change_label: str
    triggered_new_interactions: List[PairwiseInteraction]
    resolved_interactions: List[PairwiseInteraction]
    simulation_assessment: str
    disclaimer: str
