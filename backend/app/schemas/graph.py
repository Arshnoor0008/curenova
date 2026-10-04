from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class GraphNode(BaseModel):
    id: str
    label: str
    type: str  # "Drug", "Disease", "Protein", "Gene", "Pathway", "Paper", "ClinicalTrial", "SafetySignal"
    category: Optional[str] = None
    properties: Dict[str, Any] = {}

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    relationship: str
    evidence: Optional[str] = None
    confidence: Optional[float] = None

class KnowledgeGraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    stats: Dict[str, int]
    query_entity: Optional[str] = None
