"""
Recommendations API endpoints
"""
from fastapi import APIRouter, Depends
from typing import List

from app.core.security import get_current_user

router = APIRouter()


@router.get("/")
async def list_recommendations(
    pillar_id: str = None,
    status: str = None,
    current_user: dict = Depends(get_current_user),
) -> List[dict]:
    """List recommendations, optionally filtered by pillar or status"""
    # In production, fetch from Firestore or generate via AI
    recommendations = [
        {
            "id": "rec-1",
            "pillar_id": "security",
            "control_id": "sec-3",
            "title": "Enable VPC Service Controls",
            "description": "Implement VPC Service Controls to create a security perimeter around GCP resources.",
            "priority": "high",
            "effort": "medium",
            "impact": "high",
            "status": "pending",
        },
        {
            "id": "rec-2",
            "pillar_id": "security",
            "control_id": "sec-2",
            "title": "Enable Customer-Managed Encryption Keys",
            "description": "Use CMEK for sensitive data to maintain control over encryption keys.",
            "priority": "medium",
            "effort": "low",
            "impact": "high",
            "status": "pending",
        },
        {
            "id": "rec-3",
            "pillar_id": "cost-optimization",
            "control_id": "cost-3",
            "title": "Remove Unused Persistent Disks",
            "description": "Identify and delete unattached persistent disks to reduce costs.",
            "priority": "high",
            "effort": "low",
            "impact": "medium",
            "status": "pending",
        },
    ]
    
    # Apply filters
    if pillar_id:
        recommendations = [r for r in recommendations if r["pillar_id"] == pillar_id]
    if status:
        recommendations = [r for r in recommendations if r["status"] == status]
    
    return recommendations


@router.get("/{recommendation_id}")
async def get_recommendation(
    recommendation_id: str,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Get a specific recommendation with full details"""
    # In production, fetch from Firestore
    return {
        "id": recommendation_id,
        "pillar_id": "security",
        "control_id": "sec-3",
        "title": "Enable VPC Service Controls",
        "description": "Implement VPC Service Controls to create a security perimeter around GCP resources.",
        "priority": "high",
        "effort": "medium",
        "impact": "high",
        "status": "pending",
        "remediation_steps": [
            "Define the service perimeter scope",
            "Create an access policy",
            "Configure allowed services",
            "Test with dry-run mode",
            "Enable enforcement",
        ],
        "resources": [
            "https://cloud.google.com/vpc-service-controls/docs/overview",
        ],
    }


@router.patch("/{recommendation_id}/status")
async def update_recommendation_status(
    recommendation_id: str,
    status: str,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Update the status of a recommendation"""
    valid_statuses = ["pending", "in_progress", "completed", "dismissed"]
    if status not in valid_statuses:
        return {"error": f"Invalid status. Must be one of: {valid_statuses}"}
    
    # In production, update Firestore
    return {
        "id": recommendation_id,
        "status": status,
        "message": "Status updated successfully",
    }
