from fastapi import APIRouter, HTTPException, Query
from typing import Optional, Dict, Any, List
from app.schemas.graph import KnowledgeGraphResponse, GraphNode, GraphEdge
from app.database import db

router = APIRouter(prefix="/graph", tags=["Biomedical Knowledge Graph"])

@router.get("/overview", response_model=KnowledgeGraphResponse)
def get_graph_overview(
    entity_type: Optional[str] = Query(None, description="Filter by node type: Drug, Disease, Target, Pathway, Paper, etc."),
    max_nodes: Optional[int] = Query(50, description="Max nodes to return")
):
    nodes = db.graph_data.get("nodes", [])
    edges = db.graph_data.get("edges", [])

    if entity_type and entity_type.lower() != "all":
        filtered_nodes = [n for n in nodes if n.get("type", "").lower() == entity_type.lower()]
        node_ids = {n["id"] for n in filtered_nodes}
        filtered_edges = [e for e in edges if e["source"] in node_ids or e["target"] in node_ids]
    else:
        filtered_nodes = nodes[:max_nodes]
        node_ids = {n["id"] for n in filtered_nodes}
        filtered_edges = [e for e in edges if e["source"] in node_ids and e["target"] in node_ids]

    # Calculate statistics
    stats: Dict[str, int] = {}
    for n in nodes:
        t = n.get("type", "Other")
        stats[t] = stats.get(t, 0) + 1

    return {
        "nodes": filtered_nodes,
        "edges": filtered_edges,
        "stats": stats,
        "query_entity": entity_type
    }

@router.get("/{entity_id}")
def get_node_subgraph(entity_id: str):
    nodes = db.graph_data.get("nodes", [])
    edges = db.graph_data.get("edges", [])

    target_node = next((n for n in nodes if n["id"].lower() == entity_id.lower() or n["label"].lower() == entity_id.lower()), None)
    if not target_node:
        raise HTTPException(status_code=404, detail=f"Entity '{entity_id}' not found in Knowledge Graph.")

    tid = target_node["id"]
    # 1-hop connected edges
    connected_edges = [e for e in edges if e["source"] == tid or e["target"] == tid]
    connected_node_ids = {e["source"] for e in connected_edges} | {e["target"] for e in connected_edges} | {tid}
    subgraph_nodes = [n for n in nodes if n["id"] in connected_node_ids]

    return {
        "focused_node": target_node,
        "connected_nodes": subgraph_nodes,
        "connected_edges": connected_edges,
        "neighbor_count": len(subgraph_nodes) - 1
    }
