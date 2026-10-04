from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.database import db

router = APIRouter(tags=["Drugs & Diseases Metadata"])

@router.get("/drugs/search")
def search_drugs(q: str = Query(..., min_length=1)):
    catalog = db.polypharmacy_data.get("drug_catalog", [])
    ql = q.lower()
    matches = []

    for drug in catalog:
        aliases = [a.lower() for a in drug.get("aliases", [])]
        if ql in drug["id"] or ql in drug["canonical_name"].lower() or any(ql in a for a in aliases):
            matches.append(drug)

    return {"count": len(matches), "results": matches}

@router.get("/drugs/{drug_id}")
def get_drug_details(drug_id: str):
    catalog = db.polypharmacy_data.get("drug_catalog", [])
    target = next((d for d in catalog if d["id"].lower() == drug_id.lower() or d["canonical_name"].lower() == drug_id.lower()), None)
    if not target:
        raise HTTPException(status_code=404, detail="Drug not found in catalog.")
    return target

@router.get("/diseases/{disease_id}")
def get_disease_details(disease_id: str):
    diseases = db.repurposing_data.get("diseases", [])
    target = next((d for d in diseases if d["id"].lower() == disease_id.lower() or d["name"].lower() == disease_id.lower()), None)
    if not target:
        raise HTTPException(status_code=404, detail="Disease not found.")
    return target
