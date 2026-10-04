# CureNova — AI-Powered Medication Intelligence Platform

> **"AI-Powered Medication Intelligence for Safer, Evidence-Grounded Healthcare"**

CureNova is a clinical and research decision-support platform designed to transform fragmented biomedical knowledge across PubMed, ChEMBL, openFDA, Reactome, and ClinicalTrials.gov into connected, explainable intelligence.

---

## ⚠️ Regulatory & Clinical Decision Support Notice

**CureNova is NOT:**
- A diagnostic system
- An automated prescription or dose-ordering tool
- A replacement for a licensed physician or pharmacist
- An advisory instructing patients to start, stop, or alter medications
- Claiming AI has discovered a clinically approved cure

**CureNova IS:**
- A clinical and research decision-support prototype
- An evidence aggregation, relationship-mapping, and safety analysis platform
- A drug-repurposing translational research assistant
- An explainable polypharmacy intelligence engine with Patient Medication Digital Twin simulation

---

## 👥 Three Specialized Roles (NO ADMIN)

CureNova dynamically adapts its presentation, metrics, and decision-support guidance for three distinct healthcare stakeholders:

| Role | Target Persona | Core Capabilities & Workflows |
|---|---|---|
| **Doctor / Clinician** | MDs, Specialists, Pharmacists | Pairwise interaction matrix, higher-order hazard syndromes (e.g. *Triple Whammy*), adverse event overlap, organ clearance surveillance (eGFR, hepatic), clinical guidance, and printable clinical reports. |
| **Researcher** | Translational Biologists, Computational Pharmacologists | Target-disease biological congruence, Reactome pathway mapping, CureNova Evidence Ranking, PubMed & ClinicalTrials.gov evidence dossiers, and hypothesis ranking. |
| **Patient / Consumer** | Health consumers, Family Caregivers | Plain-language explanations, non-jargon risk warnings, emergency symptoms guidance, questions to ask the doctor, and a printable Doctor Discussion Sheet. |

---

## 🧠 Core Differentiators & Multi-Agent Architecture

```
User Query / Regimen
        ↓
FastAPI Backend (JWT Auth / Role-Based Access Control)
        ↓
LangGraph Multi-Agent Orchestrator
        ├── 1. Retrieval Agent   (Harvests PubMed, ChEMBL, openFDA, Reactome data with citations)
        ├── 2. Reasoning Agent   (Maps Drug ↔ Target ↔ Pathway ↔ Disease & calculates Evidence Ranking)
        ├── 3. Safety Agent      (Contraindications, higher-order triads & adverse event overlap)
        └── 4. Recommendation   (Non-prescribing clinical discussion points & research questions)
        ↓
Role-Specific Explainable Intelligence Dashboard
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Python 3.10+ (Tested on Python 3.14)
- Node.js 18+ (Tested on Node 24)

### 1. Backend Setup
```bash
cd backend
# Create and activate virtual environment
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server on port 8000
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The API documentation is accessible at `http://localhost:8000/docs`.

### 2. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Start Vite development server on port 5173
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🔑 Demo Mode & Instant 1-Click Evaluation Logins

CureNova operates out of the box with `DEMO_MODE=true` using realistic, curated biomedical datasets (Alzheimer's disease, Parkinson's, Glioblastoma, Type 2 Diabetes, and Polypharmacy combinations).

Pre-seeded evaluation credentials:
- **Doctor:** `doctor@curenova.ai` / `doctor123`
- **Researcher:** `researcher@curenova.ai` / `researcher123`
- **Patient:** `patient@curenova.ai` / `patient123`

You can also switch personas instantly from anywhere in the application using the **Demo Role** dropdown in the navigation header.

---

## 🐳 Docker Deployment

To spin up the entire application along with optional supporting services (PostgreSQL, Neo4j, Qdrant):
```bash
docker-compose up --build
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- Neo4j Browser: `http://localhost:7474`
- Qdrant Dashboard: `http://localhost:6333`

---

## 📡 API Endpoints

- `GET /api/health` — System status, active agents, and loaded biomedical record counts
- `POST /api/auth/login` — JWT authentication and role validation
- `POST /api/auth/register` — User onboarding (Doctor, Researcher, Patient)
- `POST /api/drug-repurposing/analyze` — LangGraph drug repurposing workflow
- `GET /api/drug-repurposing/diseases` — Supported disease profiles
- `POST /api/medication-safety/analyze` — Polypharmacy interaction analysis
- `POST /api/medication-safety/simulate-twin` — Digital Twin "what-if" scenario simulation
- `GET /api/medication-safety/catalog` — Recognizable drug catalog and presets
- `GET /api/evidence/search` — Filterable biomedical literature explorer
- `GET /api/graph/overview` — Interactive Knowledge Graph nodes and edges
- `GET /api/graph/{entity_id}` — Subgraph neighbourhood query
- `GET /api/drugs/{drug_id}` — Drug pharmacokinetics and targets

---

## 🛡️ License & Ethical Standards
Developed for clinical and research decision-support prototype evaluation. All scientific citations correspond to verified peer-reviewed publications and public clinical trial registries.
