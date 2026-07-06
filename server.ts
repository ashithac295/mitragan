import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized  Client
let aiClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is not defined. Please add it to your secrets or .env file.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// API endpoint for the Mitragan AI Project Architect
app.post("/api/architect", async (req, res) => {
  try {
    const { idea, sector, budget, timeline, additionalDetails } = req.body;

    if (!idea) {
      return res.status(400).json({ error: "Please provide a project idea." });
    }

    let client;
    try {
      client = getClient();
    } catch (keyErr: any) {
      return res.status(500).json({
        error: keyErr.message || "API key is missing. Please configure API_KEY."
      });
    }

    const systemPrompt = `You are the lead Project Architect at Mitragan, an elite digital engineering and design studio. 
Your tone is deeply professional, visionary, highly analytical, and premium.
You must construct a comprehensive, structured system architecture and implementation proposal for the client's project idea.

The output must be returned in highly elegant JSON with the following schema:
{
  "proposalTitle": "A bold, compelling project title",
  "visionStatement": "A high-end 2-3 sentence strategic description of the solution",
  "recommendedTechStack": [
    { "category": "Frontend / Interface", "tech": "React with Tailwind CSS & Motion", "justification": "Why this fits" },
    { "category": "Backend / Services", "tech": "...", "justification": "..." },
    { "category": "Database / Persistence", "tech": "...", "justification": "..." }
  ],
  "systemArchitecture": [
    { "component": "Core Component Name", "description": "What it does", "engineeringHighlight": "A technical edge or performance consideration" }
  ],
  "timelinePhases": [
    { "phase": "Phase 1: Title", "duration": "Duration in weeks", "milestones": ["Milestone A", "Milestone B"] }
  ],
  "riskAnalysis": [
    { "risk": "Identified technical or architectural risk", "mitigation": "Strategic mitigation play" }
  ],
  "mitraganEdge": "A short, premium paragraph explaining how Mitragan's precision engineering methodology specifically elevates this specific solution."
}

Do not include any Markdown wrap like \`\`\`json. Return ONLY the raw JSON string.`;

    const userPrompt = `Construct a Mitragan architectural proposal for:
- Project Idea: "${idea}"
- Target Sector/Category: "${sector || "General Digital Product"}"
- Budget Tier: "${budget || "Professional Studio"}"
- Expected Timeline: "${timeline || "Flexibly planned"}"
- Special considerations: "${additionalDetails || "None specified"}"`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from the AI model.");
    }

    // Try parsing the returned text as JSON to make sure it's valid
    const parsedData = JSON.parse(text.trim());
    return res.json(parsedData);

  } catch (err: any) {
    console.error("AI Architect endpoint error:", err);
    return res.status(500).json({
      error: "Failed to generate proposal due to an internal system error.",
      details: err.message
    });
  }
});

// Configure Vite or production static file serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR disabled...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mitragan server active at http://0.0.0.0:${PORT}`);
  });
}

setupServer();
