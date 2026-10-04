import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import db
from app.routes.auth import router as auth_router
from app.routes.drug_repurposing import router as repurposing_router
from app.routes.medication_safety import router as safety_router
from app.routes.evidence import router as evidence_router
from app.routes.graph import router as graph_router
from app.routes.drugs import router as drugs_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("curenova.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing CureNova platform services...")
    # Load curated demo data and seed accounts
    db.load_demo_data()
    logger.info("CureNova startup sequence completed successfully. Platform ready.")
    yield
    logger.info("Shutting down CureNova platform.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-Powered Medication Intelligence for Safer, Evidence-Grounded Healthcare",
    version=settings.VERSION,
    lifespan=lifespan
)

# Enable CORS for frontend development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routers
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(repurposing_router, prefix=settings.API_PREFIX)
app.include_router(safety_router, prefix=settings.API_PREFIX)
app.include_router(evidence_router, prefix=settings.API_PREFIX)
app.include_router(graph_router, prefix=settings.API_PREFIX)
app.include_router(drugs_router, prefix=settings.API_PREFIX)

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "platform": settings.PROJECT_NAME,
        "tagline": settings.PROJECT_TAGLINE,
        "version": settings.VERSION,
        "demo_mode": settings.DEMO_MODE,
        "data_loaded": db.is_loaded,
        "curated_records": {
            "diseases": len(db.repurposing_data.get("diseases", [])),
            "drugs_catalog": len(db.polypharmacy_data.get("drug_catalog", [])),
            "pairwise_interactions": len(db.polypharmacy_data.get("pairwise_interactions", [])),
            "knowledge_graph_nodes": len(db.graph_data.get("nodes", [])),
            "evidence_records": len(db.evidence_data)
        }
    }

@app.get("/")
def root():
    return {
        "platform": "CureNova Med-AI Platform",
        "docs_url": "/docs",
        "health_check": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
