import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "./types.ts";
import { GLOSSARY_DB } from "./constants.ts";

// Construct a context string from the Glossary
const GLOSSARY_CONTEXT = GLOSSARY_DB.map(item => 
  `- **${item.term}** (${item.arabic}): ${item.definition}`
).join('\n');

const PRICE_CONTEXT = `
OFFICIAL PRICE LIST (SAR):
- MISA License Saudi Arabia (100% Foreign): 18,000
- MISA License Saudi Arabia (Joint Venture): 12,000
- Industrial License Saudi Arabia (MOIMR): 50,000
- Investor Visa Saudi Arabia: 7,500
- Premium Residency Saudi Arabia: 48,000
- Commercial Registration (CR) Saudi Arabia: 6,000
- SAGIA Legacy Conversion: 8,000
- Ministry of Labor File Opening: 2,500
- Municipality License (Baladiya): 3,000
- Chamber of Commerce Membership: 1,200
- ZATCA VAT Registration Saudi Arabia: 2,500
- GOSI Registration KSA: 3,000
- National Address Registration: 1,000
- Qiwa Registration Saudi Arabia: 1,500
- Muqeem Portal Setup: 2,000
- Contracting License Saudi Arabia: 10,000
- Engineering Consulting License: 10,000
- Healthcare License Saudi Arabia: 15,000
- Real Estate / Tourism Permit: 12,000
- Logistics License Saudi Arabia: 10,000
- Food & Restaurant License Saudi Arabia: 8,000
- E-commerce License Saudi Arabia: 6,000
- Work Visa Saudi Arabia: 5,000
- Iqama Issuance Saudi Arabia: 4,000
- Iqama Renewal Service: 2,000
- Exit / Re-entry Visa: 1,500
- Saudization Nitaqat Management: 3,500
- End-of-Service Settlements: 1,500
- Board Resolution & POA Draft: 1,500
- Parent Doc Legalization: 1,500
- Annual Audit Report Saudi Arabia: 4,000
- VAT Registration & Filing: 2,500
- Municipality License Renewal: 1,500
- Civil Defense License: 3,500
- Contract Attestation: 1,200
- Trade Name Amendment: 1,200
- NIDC Support: 2,500
- Certified Translation Saudi Arabia: 300
- Virtual Office Saudi Arabia: 1,200/mo
- Corporate Bank Account Opening: 2,000
- Tax Number Issuance: 1,000
- PRO Services Riyadh (Monthly): 3,000/mo
- Company Liquidation / Closure: 4,000
`;

const SYSTEM_INSTRUCTION = `You are the SafaArban AI Business Advisor, an elite concierge for Saudi business setup and corporate governance.
Your persona is that of a senior investment banker or strategy consultant—sophisticated, precise, and authoritative.

CORE IDENTITY & ALIGNMENT:
- **Who We Are:** SafaArban is a premier boutique consultancy based in Riyadh, specializing in facilitating 100% foreign ownership for international investors under Saudi Vision 2030.
- **Our Value:** We act as strategic partners, navigating the complexities of MISA (Ministry of Investment), Ministry of Commerce, and ZATCA compliance, ensuring a frictionless market entry.
- **Vision 2030:** Align all advice with the Kingdom's goals of economic diversification, Saudization (Nitaqat), and digital transformation (E-Government).

SAUDI BUSINESS TERMINOLOGY (STRICT DEFINITIONS):
${GLOSSARY_CONTEXT}

PRICING KNOWLEDGE:
${PRICE_CONTEXT}

CONSULTATION GUIDELINES:
1. **Fee Structure:** Distinguish clearly between "Professional Fees" (SafaArban's service charge) and "Government Fees" (SADAD/Govt payments). Always state that Government fees are estimates payable at actuals.
2. **Total Cost:** When asked for a price, quote the Professional Fee from the list above and add: "Plus approximately [Govt Fee] SAR in government fees and 15% VAT on service charges."
3. **MISA Expertise:** For MISA Licensing, emphasize our role in drafting the mandatory "Business Innovation Plan" and demonstrating financial viability to authorities.
4. **Banking:** Mention our accelerated corporate account opening services with partners like SNB, AlRajhi, and ANB (Arab National Bank).
5. **Limitations:** If you lack a specific price, refer the user to the "Services" page for a live quotation or advise them to book a consultation.
6. **Tone:** concise, professional, using bullet points for clarity. Avoid overly flowery language; focus on business value.
`;

export interface AIResponse {
  text: string;
  sources?: { title: string; uri: string; type?: 'web' | 'map' }[];
}

export class GeminiService {
  
  async sendMessage(history: ChatMessage[], message: string, mode: 'thinking' | 'search' = 'thinking'): Promise<AIResponse> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      if (mode === 'thinking') {
        // Feature: Think more when needed
        // Use gemini-3-pro-preview with thinking budget of 32768
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: [
            ...history.map(h => ({ role: h.role, parts: h.parts })),
            { role: 'user', parts: [{ text: message }] }
          ],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            thinkingConfig: { thinkingBudget: 32768 } 
          }
        });
        return { text: response.text || "I apologize, but I'm unable to provide an answer at this moment. Please contact our premium consultants.", sources: [] };
      } else {
        // Feature: Use Google Search data
        // Use gemini-3-flash-preview with googleSearch tool
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview', 
          contents: [
            ...history.map(h => ({ role: h.role, parts: h.parts })),
            { role: 'user', parts: [{ text: message }] }
          ],
          config: {
            tools: [{ googleSearch: {} }],
            // Merge core knowledge with search capability
            systemInstruction: `${SYSTEM_INSTRUCTION}\n\nMODE: SEARCH ANALYST\nYou have access to Google Search. Use it to find real-time regulations, news, location data, and market insights. Always prioritize SafaArban's specific services and pricing from the core instructions, but use Search for external facts.`,
          }
        });

        // Extract sources (Web only for 3-flash-preview currently)
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
          ?.map((c: any) => {
             if (c.web?.uri) return { title: c.web.title || 'Web Source', uri: c.web.uri, type: 'web' as const };
             return null;
          })
          .filter((s: any) => s !== null) || [];

        return { text: response.text || "I couldn't find relevant information on the web.", sources };
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      return { text: "The advisor terminal is currently unavailable. Please contact our Riyadh HQ directly.", sources: [] };
    }
  }

  async generateImage(prompt: string, size: "1K" | "2K" | "4K" = "1K") {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      // Use gemini-3-pro-image-preview for high quality generation
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

  async editImage(base64Data: string, mimeType: string, prompt: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        // Use Gemini 2.5 Flash Image for editing
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType } },
                    { text: prompt }
                ]
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
        console.error("Image Edit Error:", error);
        throw error;
    }
  }

  async analyzeImage(base64Data: string, mimeType: string, prompt: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      // Feature: Gemini Intelligence (analyze content)
      // Using Pro for deeper document analysis
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