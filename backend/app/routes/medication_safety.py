from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from app.schemas.medication_safety import (
    MedicationSafetyRequest,
    MedicationSafetyResponse,
    DigitalTwinSimRequest,
    DigitalTwinSimResponse
)
from app.workflows.medication_safety_graph import execute_medication_safety_analysis, simulate_digital_twin
from app.database import db

router = APIRouter(prefix="/medication-safety", tags=["Medication Safety / Polypharmacy"])

@router.get("/catalog")
def get_medication_catalog():
    """Returns curated medications for auto-suggest and demo tests."""
    catalog = db.polypharmacy_data.get("drug_catalog", [])
    demo_scenarios = db.polypharmacy_data.get("scenario_digital_twin_samples", [])
    return {
        "catalog": catalog,
        "sample_regimens": [
            {
                "label": "Cardiology Dual Antiplatelet + Anticoagulant (High Bleeding Alert)",
                "medications": ["Aspirin", "Warfarin", "Metformin"]
            },
            {
                "label": "Post-PCI Stent + PPI Loss-of-Activation Alert",
                "medications": ["Clopidogrel", "Omeprazole", "Aspirin"]
            },
            {
                "label": "Triple Whammy Acute Renal Syndrome Alert",
                "medications": ["Lisinopril", "Spironolactone", "Ibuprofen"]
            },
            {
                "label": "Neuro-Psych Serotonin Syndrome Alert",
                "medications": ["Sertraline", "Tramadol", "Amlodipine"]
            },
            {
                "label": "Cardiovascular Standard Low-Risk Regimen",
                "medications": ["Atorvastatin", "Amlodipine"]
            }
        ],
        "demo_scenarios": demo_scenarios
    }

@router.post("/analyze", response_model=MedicationSafetyResponse)
def analyze_medication_safety(payload: MedicationSafetyRequest):
    if not payload.medications or len(payload.medications) == 0:
        raise HTTPException(status_code=400, detail="Please provide at least one medication.")
    
    role = payload.role_view if payload.role_view in ("doctor", "patient") else "doctor"
    patient_context_dict = payload.patient_context.model_dump() if payload.patient_context else None
    
    result = execute_medication_safety_analysis(
        medications=payload.medications,
        patient_context=patient_context_dict,
        role_view=role
    )
    return result

@router.get("/{analysis_id}")
def get_medication_safety_result(analysis_id: str):
    record = db.get_analysis(analysis_id)
    if not record or record.get("type") != "medication_safety":
        raise HTTPException(status_code=404, detail="Medication analysis record not found.")
    return record["data"]

@router.post("/simulate-twin", response_model=DigitalTwinSimResponse)
def simulate_patient_twin(payload: DigitalTwinSimRequest):
    if not payload.baseline_medications:
        raise HTTPException(status_code=400, detail="Baseline medication list is required for simulation.")
    
    patient_context_dict = payload.patient_context.model_dump() if payload.patient_context else None
    
    result = simulate_digital_twin(
        baseline_meds=payload.baseline_medications,
        candidate_added_drugs=payload.candidate_added_drugs,
        candidate_removed_drugs=payload.candidate_removed_drugs,
        patient_context=patient_context_dict
    )
    return result
