import os
from pathlib import Path
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"

class Settings(BaseModel):
    PROJECT_NAME: str = "CureNova"
    PROJECT_TAGLINE: str = "AI-Powered Medication Intelligence for Safer, Evidence-Grounded Healthcare"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    DEMO_MODE: bool = os.getenv("DEMO_MODE", "true").lower() in ("true", "1", "yes")
    APP_ENV: str = os.getenv("APP_ENV", "development")
    
    JWT_SECRET: str = os.getenv("JWT_SECRET", "curenova_super_secret_jwt_key_med_ai_2026")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./curenova.db")
    NEO4J_URI: str = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USERNAME: str = os.getenv("NEO4J_USERNAME", "neo4j")
    NEO4J_PASSWORD: str = os.getenv("NEO4J_PASSWORD", "curenova_secret")
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "mock")
    LLM_API_KEY: str = os.getenv("LLM_API_KEY", "")
    
    # Path to curated demo data
    DATA_PATH: Path = DATA_DIR

settings = Settings()
