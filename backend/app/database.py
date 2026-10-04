import json
import logging
import hashlib
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any, List, Optional
from app.config import settings

logger = logging.getLogger("curenova.database")

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

class InMemoryDatabase:
    def __init__(self):
        self.users: Dict[str, Dict[str, Any]] = {}
        self.analyses: Dict[str, Dict[str, Any]] = {}
        self.audit_logs: List[Dict[str, Any]] = []
        self.repurposing_data: Dict[str, Any] = {}
        self.polypharmacy_data: Dict[str, Any] = {}
        self.graph_data: Dict[str, Any] = {}
        self.evidence_data: List[Dict[str, Any]] = []
        self.is_loaded: bool = False

    def load_demo_data(self):
        demo_dir = settings.DATA_PATH / "demo"
        
        # Load Drug Repurposing data
        repurposing_file = demo_dir / "drug_repurposing_demo.json"
        if repurposing_file.exists():
            with open(repurposing_file, "r", encoding="utf-8") as f:
                self.repurposing_data = json.load(f)
                logger.info(f"Loaded {len(self.repurposing_data.get('diseases', []))} repurposing disease profiles.")
        else:
            logger.warning(f"File not found: {repurposing_file}")

        # Load Polypharmacy data
        polypharmacy_file = demo_dir / "polypharmacy_demo.json"
        if polypharmacy_file.exists():
            with open(polypharmacy_file, "r", encoding="utf-8") as f:
                self.polypharmacy_data = json.load(f)
                logger.info(f"Loaded {len(self.polypharmacy_data.get('drug_catalog', []))} drugs and {len(self.polypharmacy_data.get('pairwise_interactions', []))} interaction pairs.")
        else:
            logger.warning(f"File not found: {polypharmacy_file}")

        # Load Knowledge Graph data
        graph_file = demo_dir / "knowledge_graph_demo.json"
        if graph_file.exists():
            with open(graph_file, "r", encoding="utf-8") as f:
                self.graph_data = json.load(f)
                logger.info(f"Loaded {len(self.graph_data.get('nodes', []))} nodes and {len(self.graph_data.get('edges', []))} edges in knowledge graph.")
        else:
            logger.warning(f"File not found: {graph_file}")

        # Load Biomedical Evidence data
        evidence_file = demo_dir / "biomedical_evidence.json"
        if evidence_file.exists():
            with open(evidence_file, "r", encoding="utf-8") as f:
                raw_evidence = json.load(f)
                self.evidence_data = raw_evidence.get("evidence_records", [])
                logger.info(f"Loaded {len(self.evidence_data)} biomedical evidence records.")
        else:
            logger.warning(f"File not found: {evidence_file}")

        # Seed standard demo accounts (NO ADMIN)
        self.seed_demo_users()
        self.is_loaded = True

    def seed_demo_users(self):
        default_users = [
            {
                "id": "usr-doctor-01",
                "email": "doctor@curenova.ai",
                "name": "Dr. Sarah Chen, MD, FACC",
                "password_hash": hash_password("doctor123"),
                "role": "doctor",
                "organization": "Academic Medical Center",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": "usr-researcher-01",
                "email": "researcher@curenova.ai",
                "name": "Dr. Marcus Vance, PhD",
                "password_hash": hash_password("researcher123"),
                "role": "researcher",
                "organization": "Institute for Translational Therapeutics",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": "usr-patient-01",
                "email": "patient@curenova.ai",
                "name": "Eleanor Jenkins",
                "password_hash": hash_password("patient123"),
                "role": "patient",
                "organization": "Self",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        for u in default_users:
            self.users[u["email"]] = u

    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        return self.users.get(email.lower().strip())

    def create_user(self, email: str, name: str, password: str, role: str, organization: str = "") -> Dict[str, Any]:
        email_clean = email.lower().strip()
        if email_clean in self.users:
            raise ValueError("User with this email already exists.")
        if role not in ("doctor", "researcher", "patient"):
            raise ValueError("Role must be one of: doctor, researcher, patient (no admin).")
        
        user_id = f"usr-{role}-{len(self.users) + 1:03d}"
        new_user = {
            "id": user_id,
            "email": email_clean,
            "name": name,
            "password_hash": hash_password(password),
            "role": role,
            "organization": organization,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        self.users[email_clean] = new_user
        return new_user

    def save_analysis(self, analysis_id: str, data: Dict[str, Any]):
        self.analyses[analysis_id] = data
        self.audit_logs.append({
            "action": "SAVE_ANALYSIS",
            "analysis_id": analysis_id,
            "type": data.get("type"),
            "timestamp": datetime.now(timezone.utc).isoformat()
        })

    def get_analysis(self, analysis_id: str) -> Optional[Dict[str, Any]]:
        return self.analyses.get(analysis_id)

db = InMemoryDatabase()
