'use server';
/**
 * @fileOverview A flow to generate an image from a text prompt.
 * - generateImage - A function that generates an image.
 * - GenerateImageInput - The input type for the function.
 * - GenerateImageOutput - The return type for the function.
 */

import { ai } from '../genkit';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('A descriptive prompt for image generation.'),
});

export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});

export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Create a serene and inspiring digital painting with a minimalist and symbolic style, suitable for a spiritual learning app. The art style should be clean, with soft colors and a gentle feel. Prompt: A symbolic representation of "${input.prompt}"`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
           {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE',
          },
        ],
      },
    });
    if (!media) {
      throw new Error('Image generation failed.');
    }
    return { imageDataUri: media.url };
  }
); 