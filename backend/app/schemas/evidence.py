from typing import List, Optional
from pydantic import BaseModel

class EvidenceRecord(BaseModel):
    id: str
    pmid: Optional[str] = None
    title: str
    authors: Optional[str] = ""
    journal: str
    year: int
    doi: Optional[str] = None
    source: str
    drug: str
    disease: str
    evidence_type: str
    evidence_strength: str
    relevance_score: float
    abstract_snippet: str
    citation: str
    link: Optional[str] = None

class EvidenceSearchResponse(BaseModel):
    total: int
    query: Optional[str] = ""
    results: List[EvidenceRecord]
    available_sources: List[str]
    available_evidence_types: List[str]
