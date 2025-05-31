'use server';

import { aiPersonalTrainerVoiceGuide, type AiPersonalTrainerVoiceGuideInput, type AiPersonalTrainerVoiceGuideOutput } from '@/ai/flows/ai-personal-trainer-voice-guide';

export async function getAiTrainerGuidance(input: AiPersonalTrainerVoiceGuideInput): Promise<AiPersonalTrainerVoiceGuideOutput> {
  try {
    // Ensure inputs are valid strings and not undefined/null before calling the AI flow
    const validatedInput: AiPersonalTrainerVoiceGuideInput = {
      workoutDescription: input.workoutDescription || "No workout description provided.",
      userMotivation: input.userMotivation || "General fitness motivation.",
    };
    const result = await aiPersonalTrainerVoiceGuide(validatedInput);
    return result;
  } catch (error) {
    console.error("Error getting AI trainer guidance:", error);
    // It's better to throw a new error with a generic message for the client
    // or return a structured error response.
    throw new Error("Failed to get AI trainer guidance. Please try again.");
  }
}
