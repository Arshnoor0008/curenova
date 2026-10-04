from fastapi import APIRouter, Query
from typing import Optional, List
from app.schemas.evidence import EvidenceSearchResponse, EvidenceRecord
from app.database import db

router = APIRouter(prefix="/evidence", tags=["Biomedical Evidence Explorer"])

@router.get("/search", response_model=EvidenceSearchResponse)
def search_evidence(
    q: Optional[str] = Query(None, description="Search term across title, abstract, drug, or disease"),
    source: Optional[str] = Query(None, description="Filter by source (PubMed, openFDA, ClinicalTrials.gov, etc.)"),
    drug: Optional[str] = Query(None, description="Filter by drug"),
    disease: Optional[str] = Query(None, description="Filter by disease"),
    evidence_type: Optional[str] = Query(None, description="Filter by study design"),
    min_year: Optional[int] = Query(None, description="Minimum publication year")
):
    records = db.evidence_data
    filtered = []

    for r in records:
        # Keyword search
        if q:
            ql = q.lower()
            text_corpus = f"{r.get('title', '')} {r.get('abstract_snippet', '')} {r.get('drug', '')} {r.get('disease', '')}".lower()
            if ql not in text_corpus:
                continue

        # Source filter
        if source and source.lower() != "all":
            if r.get("source", "").lower() != source.lower():
                continue

        # Drug filter
        if drug and drug.lower() != "all":
            if drug.lower() not in r.get("drug", "").lower():
                continue

        # Disease filter
        if disease and disease.lower() != "all":
            if disease.lower() not in r.get("disease", "").lower():
                continue

        # Evidence type filter
        if evidence_type and evidence_type.lower() != "all":
            if evidence_type.lower() not in r.get("evidence_type", "").lower():
                continue

        # Min year filter
        if min_year and r.get("year", 2000) < min_year:
            continue

        filtered.append(r)

    # Collect available metadata lists
    all_sources = sorted(list({r.get("source") for r in records if r.get("source")}))
    all_types = sorted(list({r.get("evidence_type") for r in records if r.get("evidence_type")}))

    return {
        "total": len(filtered),
        "query": q or "",
        "results": filtered,
        "available_sources": all_sources,
        "available_evidence_types": all_types
    }
