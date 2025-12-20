"""
Firebase Admin SDK initialization and authentication utilities
"""
import firebase_admin
from firebase_admin import auth, credentials, firestore
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.config import settings

# Initialize Firebase Admin SDK
_firebase_app = None
_db = None


def get_firebase_app():
    """Get or initialize Firebase Admin SDK"""
    global _firebase_app
    if _firebase_app is None:
        if settings.FIREBASE_CREDENTIALS_PATH:
            cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
            _firebase_app = firebase_admin.initialize_app(cred)
        else:
            # Use Application Default Credentials (ADC) in Cloud Run
            _firebase_app = firebase_admin.initialize_app()
    return _firebase_app


def get_firestore_client():
    """Get Firestore client"""
    global _db
    if _db is None:
        get_firebase_app()
        _db = firestore.client()
    return _db


# Security scheme for JWT tokens
security = HTTPBearer()


async def verify_firebase_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """
    Verify Firebase ID token from Authorization header.
    Returns the decoded token if valid, raises HTTPException otherwise.
    """
    try:
        get_firebase_app()
        decoded_token = auth.verify_id_token(credentials.credentials)
        return decoded_token
    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
        )
    except auth.ExpiredIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}",
        )


async def get_current_user(token: dict = Depends(verify_firebase_token)) -> dict:
    """Get the current authenticated user from the token"""
    return {
        "uid": token.get("uid"),
        "email": token.get("email"),
        "name": token.get("name"),
        "picture": token.get("picture"),
    }
