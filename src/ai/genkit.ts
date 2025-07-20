import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Expose the Google AI API key via environment variable. This allows the app
// to run locally or in production without hard-coding credentials.
const googleApiKey = process.env.GOOGLE_AI_API_KEY ?? process.env.GOOGLE_GENAI_API_KEY;

if (!googleApiKey) {
  console.warn('Warning: No Google AI API key found. AI features will be disabled.');
  console.warn('Please set GOOGLE_AI_API_KEY or GOOGLE_GENAI_API_KEY in your environment variables.');
}

export const ai = genkit({
  plugins: [googleAI({apiKey: googleApiKey})],
  model: 'googleai/gemini-2.0-flash-exp',
});
