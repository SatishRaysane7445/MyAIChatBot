// server.js (Adding a root route)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from "url";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing in .env file");
  process.exit(1);
}

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
console.log("Serving static files from:", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

// New: Serve chatbot.html when the root URL is accessed
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chatbot.html"));
});

// Initialize the Generative Model client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    if (text) {
      return res.json({ reply: text });
    } else {
      console.error(
        "Full Gemini API response for debugging (using library):",
        JSON.stringify(response, null, 2)
      );
      return res.status(500).json({ error: "Invalid Gemini response" });
    }
  } catch (error) {
    console.error("Something went wrong:", error.message);
    console.error("Error details:", error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Gemini Flash server running on http://localhost:${PORT}`);
});
