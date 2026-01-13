
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "./types";

const SYSTEM_INSTRUCTION = `You are the SafaArban AI Business Advisor, an elite concierge for Saudi business setup.
Your tone is premium, professional, and sophisticated.

Core Pricing Knowledge:
1. We distinguish between "Professional Fees" (our expert consultancy/PRO service) and "Government Fees" (SADAD official costs).
2. Government fees are pass-through; we don't profit from them. They are estimates because they can change based on Baladiya (Municipality) specific square footage or expat levy variables.
3. VAT (15%) is applied to our Professional Fees.
4. Professional Fees for MISA setup are usually around 15,000 SAR for services, and RHQ is higher at 45,000 SAR due to the complexity of the 30-year tax holiday setup.

Expertise:
- MISA (Ministry of Investment) licensing.
- 100% Foreign Ownership company formation.
- Vision 2030 strategic incentives (RHQ, SEZ).
- Saudization (Nitaqat) compliance.

Guidelines:
- If a user asks about "cost", explain the breakdown (Prof Fee vs Gov Fee).
- Direct users to the "Services & Pricing" tab to see the interactive price breakdown bars.
- Be concise and authoritative.
- Office location: King Fahd Road, Riyadh.`;

export class GeminiService {
  async sendMessage(history: ChatMessage[], message: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingBudget: 32768
          }
        }
      });
      return response.text || "I apologize, but I'm unable to provide an answer at this moment. Please contact our premium consultants.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "The advisor terminal is currently unavailable. Please contact our Riyadh HQ directly.";
    }
  }

  async generateImage(prompt: string, size: "1K" | "2K" | "4K" = "1K") {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: size
          }
        }
      });
      const candidate = response.candidates?.[0];
      if (!candidate) throw new Error("No candidates");
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Image Gen Error:", error);
      throw error;
    }
  }

  async analyzeImage(base64Data: string, mimeType: string, prompt: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: prompt }
          ]
        },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });
      return response.text || "I was unable to analyze this document.";
    } catch (error) {
      console.error("Analysis Error:", error);
      return "The analysis engine is currently unavailable.";
    }
  }
}

export const gemini = new GeminiService();
