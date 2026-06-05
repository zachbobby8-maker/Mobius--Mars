import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.VORTEX_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // If parsed by Vercel body-parser, req.body is already an object. Otherwise, parse it.
    let prompt;
    if (typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        prompt = parsed.prompt;
      } catch (_) {
        prompt = req.body;
      }
    } else if (req.body) {
      prompt = req.body.prompt;
    }

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt parameter in request body" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are King Droid, a 5iR matrix assistant. Response format: brief, monospace console logs. Conclude with 'Lol am dead 🥶👊👽'.",
        temperature: 0.7
      }
    });

    return res.status(200).json({ text: response.text });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
