import dotenv from "dotenv";

dotenv.config();

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["AZURE_OPENAI_API_KEY"];

async function main() {
  console.log("== Get chat completions Sample ==");

  if (!endpoint || !azureApiKey) return;

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "pocketrocketdev";
  const result = await client.getChatCompletions(deploymentId, [
    {
      role: "system",
      name: "AI",
      content: "You are a chatbot. I am a human. Let's chat",
    },
    {
      role: "user",
      name: "Human",
      content: "When was Microsoft founded?",
    },
  ]);

  for (const choice of result.choices) {
    console.log(choice);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
