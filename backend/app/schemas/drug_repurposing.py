from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class RepurposingRequest(BaseModel):
    query: str = Field(..., description="Target disease, drug, gene, or biomedical research query")
    include_safety_signals: bool = True
    min_evidence_strength: Optional[str] = "all"

class SupportingPaper(BaseModel):
    pmid: Optional[str] = None
    title: str
    journal: str
    year: int
    doi: Optional[str] = None
    study_type: str
    citation: str

class ClinicalTrial(BaseModel):
    nct_id: str
    title: str
    phase: str
    status: str
    enrollment: Optional[int] = None

class EvidenceBreakdown(BaseModel):
    literature_volume: int
    target_congruence: float
    clinical_trial_support: float
    biological_plausibility: float
    consistency_score: float

class RepurposingCandidate(BaseModel):
    id: str
    drug_name: str
    original_indication: str
    status_label: str = "Potential Repurposing Candidate"
    evidence_strength: str
    confidence_score: float
    curenova_ranking: float
    mechanism: str
    targets: List[str]
    pathways: List[str]
    evidence_breakdown: EvidenceBreakdown
    supporting_papers: List[SupportingPaper]
    clinical_trials: List[ClinicalTrial]
    safety_signals: List[str]
    limitations: List[str]
    human_review_recommended: bool = False
    why_ranked: List[str] = Field(default_factory=list)

class PipelineStep(BaseModel):
    id: str
    label: str
    status: str  # "completed", "in_progress", "pending"
    duration_ms: Optional[int] = None

class RepurposingResponse(BaseModel):
    analysis_id: str
    query: str
    timestamp: str
    disease_detected: str
    summary: str
    pipeline_steps: List[PipelineStep]
    candidates: List[RepurposingCandidate]
    safety_disclaimer: str
    total_evidence_count: int
