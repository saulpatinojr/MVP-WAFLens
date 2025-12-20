"""
AI-powered endpoints for WAF analysis and recommendations
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional

from app.core.security import get_current_user
from app.core.ai_client import ai_client

router = APIRouter()


class AnalyzeRequest(BaseModel):
    """Request model for assessment analysis"""
    pillar: str
    responses: List[dict]


class ChatRequest(BaseModel):
    """Request model for chat"""
    message: str
    context: Optional[str] = None


class RemediationRequest(BaseModel):
    """Request model for remediation guidance"""
    control: str
    current_state: str
    cloud_provider: str = "gcp"


@router.post("/analyze")
async def analyze_assessment(
    request: AnalyzeRequest,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """
    Analyze assessment responses using AI and generate recommendations.
    """
    try:
        result = await ai_client.analyze_assessment(
            pillar=request.pillar,
            responses=request.responses,
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI analysis failed: {str(e)}",
        )


@router.post("/chat")
async def chat(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """
    Chat with the AI assistant about WAF best practices.
    """
    try:
        response = await ai_client.chat(
            message=request.message,
            context=request.context,
        )
        return {
            "response": response,
            "user_message": request.message,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chat failed: {str(e)}",
        )


@router.post("/remediation")
async def generate_remediation(
    request: RemediationRequest,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """
    Generate step-by-step remediation guidance for a control.
    """
    try:
        result = await ai_client.generate_remediation_steps(
            control=request.control,
            current_state=request.current_state,
            cloud_provider=request.cloud_provider,
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Remediation generation failed: {str(e)}",
        )
