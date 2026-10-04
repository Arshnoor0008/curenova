from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas.auth import LoginRequest, RegisterRequest, AuthResponse, UserResponse
from app.database import db, verify_password
from app.auth import create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest):
    user = db.get_user_by_email(payload.email)
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. For demo mode, try doctor@curenova.ai / doctor123",
        )
    
    # If a specific role was requested in login, verify role matches
    if payload.role and payload.role != user["role"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"This account is registered as '{user['role']}', not '{payload.role}'.",
        )
        
    token = create_access_token({"email": user["email"], "role": user["role"], "name": user["name"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "organization": user.get("organization", "")
        }
    }

@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest):
    if payload.role not in ("doctor", "researcher", "patient"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be one of: doctor, researcher, patient (no admin).",
        )
    try:
        user = db.create_user(
            email=payload.email,
            name=payload.name,
            password=payload.password,
            role=payload.role,
            organization=payload.organization or ""
        )
        token = create_access_token({"email": user["email"], "role": user["role"], "name": user["name"]})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "role": user["role"],
                "organization": user.get("organization", "")
            }
        }
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get("/me", response_model=UserResponse)
def get_me(current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return {
        "id": current_user["id"],
        "name": current_user["name"],
        "email": current_user["email"],
        "role": current_user["role"],
        "organization": current_user.get("organization", "")
    }
