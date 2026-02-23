import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL && process.env.SUPABASE_URL !== "Secret value" 
  ? process.env.SUPABASE_URL 
  : "https://dummy-project.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY !== "Secret value"
  ? process.env.SUPABASE_SERVICE_ROLE_KEY
  : "dummy-key";

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch {
  console.warn("Supabase client could not be initialized, using mock.");
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: [], error: null }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    }
  };
}

// const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
console.log("AI Engine initialized with key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");

// --- API Routes ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/ai/recommendations", async (req, res) => {
  try {
    const staticRecommendations = [
      {
        careerTitle: "AI Solutions Architect",
        whyItMatches: "Your background in Computer Science and interest in AI makes you a perfect fit for designing complex AI systems.",
        requiredSkills: ["Machine Learning", "Cloud Architecture", "Python", "System Design"],
        estimatedSalaryRange: "$150k - $220k",
        educationalResources: "Coursera AI Specialization, AWS Certified Solutions Architect"
      },
      {
        careerTitle: "Full Stack Product Engineer",
        whyItMatches: "Combining your React/Node.js skills with UI design interests allows you to own features from end-to-end.",
        requiredSkills: ["TypeScript", "Next.js", "PostgreSQL", "Figma"],
        estimatedSalaryRange: "$130k - $190k",
        educationalResources: "Full Stack Open, Frontend Masters"
      },
      {
        careerTitle: "EdTech Innovation Lead",
        whyItMatches: "Your interest in Education and technical skills position you well to lead digital transformation in learning.",
        requiredSkills: ["Product Management", "LMS Systems", "Stakeholder Management"],
        estimatedSalaryRange: "$120k - $170k",
        educationalResources: "Product School, EdTech Strategy Certification"
      }
    ];
    await new Promise(resolve => setTimeout(resolve, 800));
    res.json(staticRecommendations);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
});

app.post("/api/counselors/match", async (req, res) => {
  try {
    const { userInterests } = req.body;
    const { data: counselors, error } = await supabase.from("counselors").select("*");
    if (error) throw error;
    const matches = counselors.map(c => {
      const overlap = c.expertise.filter((skill) => userInterests.includes(skill)).length;
      return { ...c, matchScore: overlap };
    }).sort((a, b) => b.matchScore - a.matchScore);
    res.json(matches.slice(0, 5));
  } catch {
    res.status(500).json({ error: "Failed to match counselors" });
  }
});

app.get("/api/jobs", async (req, res) => {
  const mockJobs = [
    { id: 1, title: "Senior Frontend Engineer", company: "Vercel", location: "Remote", salary: "$160k - $210k", type: "Full-time" },
    { id: 2, title: "AI Product Manager", company: "OpenAI", location: "San Francisco, CA", salary: "$180k - $250k", type: "Full-time" },
    { id: 3, title: "UX/UI Designer", company: "Airbnb", location: "Remote", salary: "$140k - $190k", type: "Full-time" },
    { id: 4, title: "Data Engineer", company: "Snowflake", location: "Bozeman, MT", salary: "$150k - $200k", type: "Full-time" },
    { id: 5, title: "DevOps Specialist", company: "Stripe", location: "Dublin, IE", salary: "$130k - $180k", type: "Contract" },
    { id: 6, title: "Full Stack Developer", company: "Supabase", location: "Remote", salary: "$120k - $170k", type: "Full-time" },
  ];
  res.json(mockJobs);
});

// --- Vite Integration ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      configFile: path.resolve(__dirname, "../client/vite.config.js"),
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "../dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
