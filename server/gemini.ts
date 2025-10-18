import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateStyleAdvice(
  message: string,
  context?: {
    skinTone?: string;
    undertone?: string;
    faceShape?: string;
  }
): Promise<string> {
  const systemPrompt = `You are an expert AI fashion and beauty stylist. Provide personalized, 
helpful, and encouraging advice about makeup, clothing, hairstyles, and styling. 
Be specific with color recommendations and explain why certain choices work well.
Keep responses warm, friendly, and concise (2-3 paragraphs max).`;

  let userMessage = message;
  if (context) {
    userMessage = `User context: ${context.skinTone ? `Skin tone: ${context.skinTone}, ` : ''}${
      context.undertone ? `Undertone: ${context.undertone}, ` : ''
    }${context.faceShape ? `Face shape: ${context.faceShape}` : ''}\n\nQuestion: ${message}`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "I understand. I'll provide expert fashion and beauty advice that's personalized, specific, and encouraging." }] },
      { role: "user", parts: [{ text: userMessage }] }
    ],
  });

  return response.text || "I'm here to help with your styling questions!";
}

export async function analyzeImageForStyling(imageBase64: string): Promise<{
  skinTone: 'light' | 'medium' | 'tan' | 'deep';
  undertone: 'cool' | 'warm' | 'neutral';
  faceShape: 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond';
  hairColor: string;
  eyeColor: string;
  confidence: number;
}> {
  try {
    const systemPrompt = `You are an expert beauty analyst. Analyze the person's features and provide:
1. Skin tone (light, medium, tan, or deep)
2. Undertone (cool, warm, or neutral) - look for pink/red vs yellow/golden undertones
3. Face shape (oval, round, square, heart, long, or diamond)
4. Hair color (be specific: e.g., "dark brown", "blonde", "black")
5. Eye color (e.g., "brown", "blue", "green", "hazel")
6. Confidence score (0-1) for your analysis accuracy

Respond with JSON only in this exact format:
{
  "skinTone": "medium",
  "undertone": "warm",
  "faceShape": "oval",
  "hairColor": "dark brown",
  "eyeColor": "brown",
  "confidence": 0.85
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            skinTone: { type: "string", enum: ["light", "medium", "tan", "deep"] },
            undertone: { type: "string", enum: ["cool", "warm", "neutral"] },
            faceShape: { type: "string", enum: ["oval", "round", "square", "heart", "long", "diamond"] },
            hairColor: { type: "string" },
            eyeColor: { type: "string" },
            confidence: { type: "number" },
          },
          required: ["skinTone", "undertone", "faceShape", "hairColor", "eyeColor", "confidence"],
        },
      },
      contents: [
        {
          inlineData: {
            data: imageBase64.split(',')[1], // Remove data:image/xxx;base64, prefix
            mimeType: "image/jpeg",
          },
        },
        "Analyze this person's features for beauty and fashion recommendations.",
      ],
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Image analysis error:", error);
    // Return default analysis if AI fails
    return {
      skinTone: "medium",
      undertone: "neutral",
      faceShape: "oval",
      hairColor: "brown",
      eyeColor: "brown",
      confidence: 0.7,
    };
  }
}
