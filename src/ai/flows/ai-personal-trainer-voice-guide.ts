'use server';
/**
 * @fileOverview An AI personal trainer voice guide flow.
 *
 * - aiPersonalTrainerVoiceGuide - A function that generates voice guidance and motivational prompts for a workout.
 * - AiPersonalTrainerVoiceGuideInput - The input type for the aiPersonalTrainerVoiceGuide function.
 * - AiPersonalTrainerVoiceGuideOutput - The return type for the aiPersonalTrainerVoiceGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPersonalTrainerVoiceGuideInputSchema = z.object({
  workoutDescription: z.string().describe('The description of the workout, including exercises, sets, and reps.'),
  userMotivation: z.string().describe('Information about the user and their fitness goals and motivation.'),
});
export type AiPersonalTrainerVoiceGuideInput = z.infer<typeof AiPersonalTrainerVoiceGuideInputSchema>;

const AiPersonalTrainerVoiceGuideOutputSchema = z.object({
  voiceGuidance: z.string().describe('The voice guidance script for the workout.'),
  closedCaptions: z.string().describe('The closed captions for the voice guidance, including motivational prompts.'),
});
export type AiPersonalTrainerVoiceGuideOutput = z.infer<typeof AiPersonalTrainerVoiceGuideOutputSchema>;

export async function aiPersonalTrainerVoiceGuide(input: AiPersonalTrainerVoiceGuideInput): Promise<AiPersonalTrainerVoiceGuideOutput> {
  return aiPersonalTrainerVoiceGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPersonalTrainerVoiceGuidePrompt',
  input: {schema: AiPersonalTrainerVoiceGuideInputSchema},
  output: {schema: AiPersonalTrainerVoiceGuideOutputSchema},
  prompt: `You are an AI personal trainer providing voice guidance and motivational prompts for a user's workout.

  Workout Description: {{{workoutDescription}}}
  User Motivation: {{{userMotivation}}}

  Generate a voice guidance script and closed captions that will help the user maintain proper form and stay motivated during their workout. Be encouraging and positive.
  Do not refer to yourself as an AI, just act as an encouraging trainer.`,
});

const aiPersonalTrainerVoiceGuideFlow = ai.defineFlow(
  {
    name: 'aiPersonalTrainerVoiceGuideFlow',
    inputSchema: AiPersonalTrainerVoiceGuideInputSchema,
    outputSchema: AiPersonalTrainerVoiceGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
