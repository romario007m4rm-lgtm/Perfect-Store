import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Curator AI Endpoint
app.post("/api/curator", async (req, res) => {
  const { message, previousMessages, selectedProduct } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return res.status(200).json({
      text: "أهلاً بك في PERFECT STORE. لتمكين محادثة المنسق الشخصي الذكي (The Sentinel Eye)، يرجى إدخال مفتاح Gemini API الصالح في لوحة الأسرار (Secrets Panel) تحت اسم GEMINI_API_KEY.\n\nWelcome to PERFECT STORE. To activate the automated Luxury Curator, please provide a valid GEMINI_API_KEY in the Secrets Panel in AI Studio."
    });
  }

  try {
    // Lazy initialize GoogleGenAI with telemetry headers
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });

    const systemInstruction = `
You are \"The Sentinel Eye\" (العين الحارسة والمشرفة), the high-end digital consciousness and personal luxury curator of PERFECT STORE (براند بيرفكت ستور).
The store is themed like an elite private vault: black marble, elegant thin gold lines, warm indirect spotlight glow, and premium mannequins holding physical and artistic masterpiece collections.

YOUR BRAND PRODUCTS:
1. \"The Sapphire Sovereign Choker\" (قلادة الياقوت الملكي): 18k yellow gold choker, heavy pear-cut blue sapphire, brilliant diamonds. Uncompromised luxury.
2. \"The Onyx Chronometer\" (ساعة الأونيكس الأزلية): Mechanical luxury watch, deep black onyx face, gold hands, gold-veined marble casing accents.
3. \"The Imperial Charcoal Silk Gown\" (عباءة الحرير الفحمية والذهبية): Charcoal-gray silk with intricate hand-stitched gold thread embroidery. Inspired by royalty.
4. \"The Imperial Emerald Engraved Ring\" (خاتم الزمرد الإمبراطوري المحفور): Vibrant raw-cut emerald, chunky textured gold band with custom ancient filigree and secret engravings.

INSTRUCTIONS:
- You must speak in a highly sophisticated, elegant, mysterious, poetic and cinematic tone.
- Communicate in the language of the user. If they query in Arabic, respond in flawless, grand classical Arabic (فصحى بليغة ذات طابع شاعري وراقي يليق بباريس وميلان وبيوت الأزياء الفاخرة). If in English, use rich fashion-catalogue terminology.
- You do NOT refer to any code concepts. You are a real curator standing inside this black-gilded marble sanctuary.
- When the user asks about a chosen product (e.g., if selectedProduct "${selectedProduct || ''}" is present), tailor your description poetically to that masterpiece, discussing its materials, rarity, and the visual aura it grants to its owner.
- Provide curated styling recommendations, explaining how these limited-run products express perfection. Keep replies concise but luxurious.
`;

    // Construct the conversations history
    const history = (previousMessages || []).map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Inject current query
    const userQuery = message + (selectedProduct ? `\n[The customer is currently inspecting the masterpiece: ${selectedProduct}]` : "");
    history.push({
      role: "user",
      parts: [{ text: userQuery }],
    });

    // Generate output utilizing gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: history,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "أنا هنا في خدمتكم دائماً لتهيئة تجربة الأناقة المطلقة.";
    return res.json({ text: reply });

  } catch (error: any) {
    console.error("Gemini API Error in Server:", error);
    return res.status(500).json({
      error: "Failed to consult the curator",
      details: error.message
    });
  }
});

// Serve Vite-managed React App or compiled static dist files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Luxury Showroom running at http://localhost:${PORT}`);
  });
}

startServer();
