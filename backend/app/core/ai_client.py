"""
Gemini AI client for WAF recommendations and analysis
"""
import google.generativeai as genai
from typing import List, Optional

from app.core.config import settings


class AIClient:
    """Client for Gemini AI interactions"""
    
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
    
    async def analyze_assessment(
        self,
        pillar: str,
        responses: List[dict],
    ) -> dict:
        """
        Analyze assessment responses and generate recommendations.
        
        Args:
            pillar: WAF pillar name (e.g., "security", "reliability")
            responses: List of assessment question responses
            
        Returns:
            dict with score, recommendations, and priorities
        """
        prompt = f"""You are a cloud architecture expert specializing in the Well-Architected Framework.

Analyze the following {pillar.upper()} pillar assessment responses and provide:
1. An overall score (0-100)
2. Top 3 prioritized recommendations
3. Quick wins that can be implemented immediately
4. Long-term strategic improvements

Assessment Responses:
{responses}

Respond in JSON format:
{{
    "score": <number>,
    "summary": "<brief summary>",
    "recommendations": [
        {{
            "priority": "high|medium|low",
            "title": "<recommendation title>",
            "description": "<detailed description>",
            "effort": "low|medium|high",
            "impact": "low|medium|high"
        }}
    ],
    "quick_wins": ["<quick win 1>", "<quick win 2>"],
    "strategic_improvements": ["<improvement 1>", "<improvement 2>"]
}}
"""
        
        response = self.model.generate_content(prompt)
        
        # Parse the response (in production, add proper JSON parsing with error handling)
        return {
            "raw_response": response.text,
            "pillar": pillar,
        }
    
    async def generate_remediation_steps(
        self,
        control: str,
        current_state: str,
        cloud_provider: str = "gcp",
    ) -> dict:
        """
        Generate step-by-step remediation guidance for a specific control.
        
        Args:
            control: The control to remediate
            current_state: Description of current implementation
            cloud_provider: Target cloud provider
            
        Returns:
            dict with remediation steps and code snippets
        """
        prompt = f"""You are a cloud security expert. Generate step-by-step remediation guidance for:

Control: {control}
Current State: {current_state}
Cloud Provider: {cloud_provider.upper()}

Provide:
1. Step-by-step remediation instructions
2. Relevant CLI commands or IaC snippets
3. Verification steps to confirm the fix
4. Estimated time to implement

Respond in a structured format suitable for a technical audience.
"""
        
        response = self.model.generate_content(prompt)
        
        return {
            "control": control,
            "cloud_provider": cloud_provider,
            "remediation": response.text,
        }
    
    async def chat(self, message: str, context: Optional[str] = None) -> str:
        """
        General chat interface for WAF-related questions.
        
        Args:
            message: User's question
            context: Optional context about current assessment
            
        Returns:
            AI response string
        """
        system_context = """You are a helpful cloud architecture assistant specializing in the 
Well-Architected Framework. Help users understand best practices across Security, Reliability, 
Performance Efficiency, Cost Optimization, and Operational Excellence pillars."""
        
        full_prompt = f"{system_context}\n\n"
        if context:
            full_prompt += f"Context: {context}\n\n"
        full_prompt += f"User: {message}"
        
        response = self.model.generate_content(full_prompt)
        return response.text


# Singleton instance
ai_client = AIClient()
