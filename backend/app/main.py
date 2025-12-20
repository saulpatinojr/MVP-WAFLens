"""
WAFLens API - FastAPI Backend
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import pillars, assessments, recommendations, ai
from app.core.config import settings

app = FastAPI(
    title="WAFLens API",
    description="Well-Architected Framework Assessment Platform API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(pillars.router, prefix="/api/v1/pillars", tags=["Pillars"])
app.include_router(assessments.router, prefix="/api/v1/assessments", tags=["Assessments"])
app.include_router(recommendations.router, prefix="/api/v1/recommendations", tags=["Recommendations"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI"])


@app.get("/", tags=["Health"])
async def root():
    """Root endpoint - health check"""
    return {"status": "healthy", "service": "waflens-api", "version": "1.0.0"}


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint for Cloud Run"""
    return {"status": "healthy"}
