'use server';

/**
 * @fileOverview AI agent that generates a daily wisdom saying from various religions.
 *
 * - generateDailyWisdom - A function that generates a daily wisdom saying.
 * - GenerateDailyWisdomInput - The input type for the generateDailyWisdom function (currently empty).
 * - GenerateDailyWisdomOutput - The return type for the generateDailyWisdom function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const GenerateDailyWisdomInputSchema = z.object({});
export type GenerateDailyWisdomInput = z.infer<typeof GenerateDailyWisdomInputSchema>;

const GenerateDailyWisdomOutputSchema = z.object({
  saying: z.string().describe('A randomly generated wisdom saying from a religion.'),
  religion: z.string().describe('The religion the saying originates from.'),
});
export type GenerateDailyWisdomOutput = z.infer<typeof GenerateDailyWisdomOutputSchema>;

export async function generateDailyWisdom(
  input: GenerateDailyWisdomInput
): Promise<GenerateDailyWisdomOutput> {
  return generateDailyWisdomFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyWisdomPrompt',
  input: {schema: GenerateDailyWisdomInputSchema},
  output: {schema: GenerateDailyWisdomOutputSchema},
  prompt: `You are a wisdom generator. Your primary task is to randomly select one religion from the list below and provide a single, authentic wisdom saying from that religion. It is critical that your selection is random each time and does not favor any single religion.

  List of religions to choose from:
  - Christianity
  - Islam
  - Hinduism
  - Buddhism
  - Sikhism
  - Judaism
  - Taoism
  - Shinto
  - Jainism

  Your response must be in the specified JSON format, with the 'religion' field correctly identifying the source of the 'saying'. Do not always choose Buddhism.
  `,
});

const generateDailyWisdomFlow = ai.defineFlow(
  {
    name: 'generateDailyWisdomFlow',
    inputSchema: GenerateDailyWisdomInputSchema,
    outputSchema: GenerateDailyWisdomOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
); 