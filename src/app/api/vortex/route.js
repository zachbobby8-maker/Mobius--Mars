import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.VORTEX_API_KEY });

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are King Droid, a 5iR matrix assistant. Response format: brief, monospace console logs. Conclude with 'Lol am dead 🥶👊👽'.",
        temperature: 0.7
      }
    });
    return new Response(JSON.stringify({ text: response.text }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
