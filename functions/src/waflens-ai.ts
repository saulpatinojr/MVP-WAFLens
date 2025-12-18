// Import the Genkit core libraries and plugins.
import { genkit, z } from "genkit";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";

// Cloud Functions for Firebase supports Genkit natively.
import { onCallGenkit } from "firebase-functions/https";

// Define the API key secret
import { defineSecret } from "firebase-functions/params";
const apiKey = defineSecret("GOOGLE_GENAI_API_KEY");

import { enableFirebaseTelemetry } from "@genkit-ai/firebase";
enableFirebaseTelemetry();

const ai = genkit({
  plugins: [
    googleAI(),
  ],
});

// Define the WAFLens AI flow
export const waflensAiFlow = ai.defineFlow(
  {
    name: "waflensAiFlow",
    inputSchema: z.object({
      prompt: z.string().describe("The user's question or prompt about the architecture."),
      // Add more context fields here later (e.g., pillar scores, specific resource data)
    }),
    outputSchema: z.object({
      response: z.string().describe("The AI's response to the user."),
      sources: z.array(z.string()).optional().describe("Sources or references used."),
    }),
  },
  async (input) => {
    // Construct the prompt for the LLM
    // In a real implementation, we would fetch context from the database (Pillars, Action Items) here.
    const llmPrompt = `
      You are an expert Cloud Architect and an assistant for the "WAFLens" application (Well-Architected Framework Lens).
      Your goal is to help users improve their cloud architecture based on the 5 pillars:
      1. Operational Excellence
      2. Security
      3. Reliability
      4. Performance Efficiency
      5. Cost Optimization

      User Prompt: ${input.prompt}

      Provide a helpful, professional, and concise answer.
    `;

    const result = await ai.generate({
      model: gemini20Flash,
      prompt: llmPrompt,
      config: {
        temperature: 0.7,
      },
    });

    return {
      response: result.text,
      sources: [], // Placeholder for now
    };
  },
);

// Export the callable function
export const askWaflensAi = onCallGenkit({
  secrets: [apiKey],
  // enforceAppCheck: true, // Uncomment when App Check is set up
  // authPolicy: ... // Add auth policy later
}, waflensAiFlow);
