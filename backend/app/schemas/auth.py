from pydantic import BaseModel
from typing import Optional, Literal

RoleType = Literal["doctor", "researcher", "patient"]

class LoginRequest(BaseModel):
    email: str
    password: str
    role: Optional[RoleType] = None

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: RoleType
    organization: Optional[str] = ""


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    organization: Optional[str] = ""

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
