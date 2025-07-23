import {genkit} from 'genkit';
import {openAI} from 'genkitx-openai';

// Expose the Azure OpenAI configuration via environment variables. This allows the app
// to run locally or in production without hard-coding credentials.
const azureApiKey = process.env.AZURE_OPENAI_API_KEY;
const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o-mini';

// Export the model name for use in other files
export const AZURE_MODEL_NAME = `openai/${deploymentName}`;

if (!azureApiKey || !azureEndpoint) {
  console.warn('Warning: No Azure OpenAI credentials found. AI features will be disabled.');
  console.warn('Please set AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT in your environment variables.');
}

export const ai = genkit({
  plugins: [
    openAI({
      apiKey: azureApiKey,
      baseURL: `${azureEndpoint}openai/deployments/${deploymentName}`,
      defaultQuery: { 'api-version': '2024-12-01-preview' },
    })
  ],
  model: AZURE_MODEL_NAME,
});
