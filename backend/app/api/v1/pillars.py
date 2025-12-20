"""
WAF Pillars API endpoints
"""
from fastapi import APIRouter, Depends
from typing import List

from app.core.security import get_current_user

router = APIRouter()

# Static pillar data (would come from Firestore in production)
PILLARS = [
    {
        "id": "security",
        "name": "Security",
        "description": "Protect your data, systems, and assets with cloud security best practices.",
        "icon": "ShieldCheck",
        "color": "orange",
        "controls_count": 5,
    },
    {
        "id": "reliability",
        "name": "Reliability",
        "description": "Ensure your workloads perform their intended functions correctly and consistently.",
        "icon": "PanelsTopLeft",
        "color": "blue",
        "controls_count": 5,
    },
    {
        "id": "performance-efficiency",
        "name": "Performance Efficiency",
        "description": "Use computing resources efficiently to meet system requirements.",
        "icon": "Gauge",
        "color": "green",
        "controls_count": 5,
    },
    {
        "id": "cost-optimization",
        "name": "Cost Optimization",
        "description": "Achieve business objectives while minimizing costs.",
        "icon": "PiggyBank",
        "color": "yellow",
        "controls_count": 5,
    },
    {
        "id": "operational-excellence",
        "name": "Operational Excellence",
        "description": "Run and monitor systems to deliver business value.",
        "icon": "Crosshair",
        "color": "red",
        "controls_count": 5,
    },
]


@router.get("/")
async def list_pillars() -> List[dict]:
    """List all WAF pillars"""
    return PILLARS


@router.get("/{pillar_id}")
async def get_pillar(pillar_id: str) -> dict:
    """Get a specific pillar by ID"""
    for pillar in PILLARS:
        if pillar["id"] == pillar_id:
            return pillar
    return {"error": "Pillar not found"}


@router.get("/{pillar_id}/controls")
async def get_pillar_controls(
    pillar_id: str,
    current_user: dict = Depends(get_current_user),
) -> List[dict]:
    """Get controls for a specific pillar (requires auth)"""
    # In production, fetch from Firestore
    controls = {
        "security": [
            {"id": "sec-1", "name": "Identity and Access Management", "status": "compliant"},
            {"id": "sec-2", "name": "Data Protection", "status": "partial"},
            {"id": "sec-3", "name": "Infrastructure Protection", "status": "action-required"},
            {"id": "sec-4", "name": "Incident Response", "status": "partial"},
            {"id": "sec-5", "name": "Key Management", "status": "compliant"},
        ],
        "reliability": [
            {"id": "rel-1", "name": "Fault Tolerance", "status": "compliant"},
            {"id": "rel-2", "name": "High Availability", "status": "compliant"},
            {"id": "rel-3", "name": "Disaster Recovery", "status": "partial"},
            {"id": "rel-4", "name": "Data Backup", "status": "compliant"},
            {"id": "rel-5", "name": "Change Management", "status": "partial"},
        ],
    }
    return controls.get(pillar_id, [])
