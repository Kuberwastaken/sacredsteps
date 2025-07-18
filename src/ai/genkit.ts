import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Expose the Google AI API key via environment variable. This allows the app
// to run locally or in production without hard-coding credentials.
const googleApiKey = process.env.GOOGLE_AI_API_KEY ?? process.env.GOOGLE_GENAI_API_KEY;

export const ai = genkit({
  plugins: [googleAI({apiKey: googleApiKey})],
  model: 'googleai/gemini-2.0-flash-exp',
});
