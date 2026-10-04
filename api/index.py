"""
Vercel Python Serverless Entry Point for CureNova Backend.
Vercel auto-discovers any file in /api/ and deploys it as a serverless function.
"""
import sys
import os

# Make backend/app importable from repo root
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.main import app
