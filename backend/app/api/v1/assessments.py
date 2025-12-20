"""
Assessments API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from app.core.security import get_current_user, get_firestore_client

router = APIRouter()


class AssessmentCreate(BaseModel):
    """Request model for creating an assessment"""
    pillar_id: str
    responses: List[dict]


class AssessmentResponse(BaseModel):
    """Response model for assessment"""
    id: str
    pillar_id: str
    user_id: str
    score: Optional[int] = None
    status: str
    created_at: str
    updated_at: str


@router.get("/")
async def list_assessments(
    current_user: dict = Depends(get_current_user),
) -> List[dict]:
    """List all assessments for the current user"""
    db = get_firestore_client()
    assessments_ref = db.collection("assessments")
    query = assessments_ref.where("userId", "==", current_user["uid"]).order_by(
        "createdAt", direction="DESCENDING"
    )
    
    assessments = []
    for doc in query.stream():
        assessment = doc.to_dict()
        assessment["id"] = doc.id
        assessments.append(assessment)
    
    return assessments


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_assessment(
    assessment: AssessmentCreate,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Create a new assessment"""
    db = get_firestore_client()
    
    now = datetime.utcnow().isoformat()
    assessment_data = {
        "pillarId": assessment.pillar_id,
        "userId": current_user["uid"],
        "responses": assessment.responses,
        "status": "in_progress",
        "score": None,
        "createdAt": now,
        "updatedAt": now,
    }
    
    doc_ref = db.collection("assessments").add(assessment_data)
    
    return {
        "id": doc_ref[1].id,
        "message": "Assessment created successfully",
        **assessment_data,
    }


@router.get("/{assessment_id}")
async def get_assessment(
    assessment_id: str,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Get a specific assessment"""
    db = get_firestore_client()
    doc_ref = db.collection("assessments").document(assessment_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )
    
    assessment = doc.to_dict()
    
    # Check ownership
    if assessment.get("userId") != current_user["uid"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this assessment",
        )
    
    assessment["id"] = doc.id
    return assessment


@router.patch("/{assessment_id}")
async def update_assessment(
    assessment_id: str,
    updates: dict,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Update an assessment"""
    db = get_firestore_client()
    doc_ref = db.collection("assessments").document(assessment_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )
    
    assessment = doc.to_dict()
    
    if assessment.get("userId") != current_user["uid"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this assessment",
        )
    
    updates["updatedAt"] = datetime.utcnow().isoformat()
    doc_ref.update(updates)
    
    return {"message": "Assessment updated successfully", "id": assessment_id}
