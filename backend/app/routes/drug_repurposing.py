from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from app.schemas.drug_repurposing import RepurposingRequest, RepurposingResponse
from app.workflows.drug_repurposing_graph import execute_repurposing_analysis
from app.database import db

router = APIRouter(prefix="/drug-repurposing", tags=["Drug Repurposing"])

@router.get("/diseases")
def get_supported_diseases():
    """Returns curated demo diseases and example research queries."""
    diseases = db.repurposing_data.get("diseases", [])
    return {
        "count": len(diseases),
        "diseases": [
            {
                "id": d["id"],
                "name": d["name"],
                "mesh_id": d.get("mesh_id"),
                "summary": d.get("summary"),
                "candidate_count": len(d.get("candidates", []))
            }
            for d in diseases
        ],
        "example_queries": [
            "Alzheimer's disease",
            "Parkinson's disease",
            "Glioblastoma Multiforme",
            "Diabetic Nephropathy / Type 2 Diabetes"
        ]
    }

@router.post("/analyze", response_model=RepurposingResponse)
def analyze_repurposing(payload: RepurposingRequest):
    if not payload.query or len(payload.query.strip()) < 2:
        raise HTTPException(status_code=400, detail="Query must be at least 2 characters.")
    
    result = execute_repurposing_analysis(payload.query)
    return result

@router.get("/{analysis_id}")
def get_repurposing_result(analysis_id: str):
    record = db.get_analysis(analysis_id)
    if not record or record.get("type") != "repurposing":
        raise HTTPException(status_code=404, detail="Analysis result not found.")
    return record["data"]
