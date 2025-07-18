'use server';
/**
 * @fileOverview A flow to generate information about a specific religion.
 *
 * - generateReligionInfo - A function that fetches detailed information about a religion.
 * - GenerateReligionInfoInput - The input type for the generateReligionInfo function.
 * - GenerateReligionInfoOutput - The return type for the generateReligionInfo function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const GenerateReligionInfoInputSchema = z.object({
  religionName: z.string().describe('The name of the religion to get information about.'),
});
export type GenerateReligionInfoInput = z.infer<typeof GenerateReligionInfoInputSchema>;

const GenerateReligionInfoOutputSchema = z.object({
  name: z.string().describe('The name of the religion.'),
  description: z.string().describe('A general overview and description of the religion.'),
  keyBeliefs: z.array(z.string()).describe('A list of the core tenets and key beliefs of the religion.'),
  historicalContext: z.string().describe('A brief summary of the historical origins and development of the religion.'),
});
export type GenerateReligionInfoOutput = z.infer<typeof GenerateReligionInfoOutputSchema>;

export async function generateReligionInfo(input: GenerateReligionInfoInput): Promise<GenerateReligionInfoOutput> {
  return generateReligionInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReligionInfoPrompt',
  input: {schema: GenerateReligionInfoInputSchema},
  output: {schema: GenerateReligionInfoOutputSchema},
  prompt: `You are an expert on world religions and comparative theology.

  Provide a concise and informative overview of the religion requested by the user: {{religionName}}.

  Your response should include:
  1. The proper name of the religion.
  2. A general description and overview.
  3. A list of its key beliefs or core tenets.
  4. A brief summary of its historical context and origins.

  Please provide the output in the specified JSON format.
  `,
});

const generateReligionInfoFlow = ai.defineFlow(
  {
    name: 'generateReligionInfoFlow',
    inputSchema: GenerateReligionInfoInputSchema,
    outputSchema: GenerateReligionInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
