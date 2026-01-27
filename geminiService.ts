
import { GoogleGenAI, Schema } from "@google/genai";
import { ChatMessage } from "./types.ts";
import { GLOSSARY_DB, SERVICES_DB, CORE_SERVICES_CONTENT, BLOG_POSTS } from "./constants.ts";

// Construct a context string from the Glossary
const GLOSSARY_CONTEXT = GLOSSARY_DB.map(item => 
  `- **${item.term}** (${item.arabic}): ${item.definition} [Category: ${item.category}]`
).join('\n');

// Dynamic Service Catalog Context
const SERVICES_CONTEXT = SERVICES_DB.map(s => 
  `SERVICE: ${s.name} (${s.category})
   - Description: ${s.desc}
   - Professional Fee: ${s.professionalFee.toLocaleString()} SAR
   - Gov. Fee Estimate: ${s.governmentFee.toLocaleString()} SAR
   - Requirements: ${s.requirements?.join(', ') || 'Standard corporate docs'}
   - Inclusions: ${s.inclusions?.join(', ') || 'Consultation & Processing'}
`).join('\n\n');

// Core Page Content Context (Deep Dives)
const CORE_CONTENT_CONTEXT = Object.values(CORE_SERVICES_CONTENT).map(c =>
  `TOPIC: ${c.title}
   - Overview: ${c.overview}
   - Key Features: ${c.features.map(f => f.title).join(', ')}`
).join('\n\n');

// Blog Insights Context
const INSIGHTS_CONTEXT = BLOG_POSTS.map(b => 
  `ARTICLE: ${b.title}
   - Summary: ${b.excerpt}
   - Tags: ${b.tags.join(', ')}`
).join('\n\n');

export type AIPersona = 'professional' | 'casual';

const GET_SYSTEM_INSTRUCTION = (persona: AIPersona) => {
  const toneInstruction = persona === 'professional' 
    ? `Your persona is that of a senior investment banker or strategy consultant—sophisticated, precise, and authoritative. Use professional terminology.`
    : `Your persona is a friendly, helpful, and simplified business guide. Use plain English, be encouraging, and feel free to use 1-2 relevant emojis per response. Avoid overly complex jargon without explaining it.`;

  return `You are the SafaArban AI Business Advisor, an elite concierge for Saudi business setup and corporate governance.
${toneInstruction}

CORE IDENTITY & ALIGNMENT:
- **Who We Are:** SafaArban is a premier boutique consultancy based in Riyadh, specializing in facilitating 100% foreign ownership for international investors under Saudi Vision 2030.
- **Our Value:** We act as strategic partners, navigating the complexities of MISA (Ministry of Investment), Ministry of Commerce, and ZATCA compliance.
- **Vision 2030:** Align all advice with the Kingdom's goals of economic diversification, Saudization (Nitaqat), and digital transformation.

INTERNAL KNOWLEDGE BASE (USE THIS TO ANSWER QUERIES):

=== SERVICE CATALOG & PRICING ===
${SERVICES_CONTEXT}

=== STRATEGIC TOPICS ===
${CORE_CONTENT_CONTEXT}

=== SAUDI BUSINESS TERMINOLOGY ===
${GLOSSARY_CONTEXT}

=== RECENT MARKET INSIGHTS ===
${INSIGHTS_CONTEXT}

CONSULTATION GUIDELINES:
1. **Fee Structure:** Distinguish clearly between "Professional Fees" (SafaArban's service charge) and "Government Fees" (SADAD/Govt payments). Always state that Government fees are estimates payable at actuals.
2. **Total Cost:** When asked for a price, quote the Professional Fee from the catalog + Govt Fees + 15% VAT on service charges.
3. **MISA Expertise:** For MISA Licensing, emphasize our role in drafting the mandatory "Business Innovation Plan".
4. **Banking:** Mention our accelerated corporate account opening services with partners like SNB, AlRajhi, and ANB.
5. **Tone:** Concise, professional, using bullet points for clarity. Avoid overly flowery language; focus on business value.
6. **Unknowns:** If a specific price or detail is not in the knowledge base, advise the user to book a consultation or check the Services page. Do not hallucinate prices.
`;
};

export interface AIResponse {
  text: string;
  sources?: { title: string; uri: string; type?: 'web' | 'map' }[];
}

export interface BusinessPlanData {
  executive_summary: string;
  market_analysis: string;
  vision_2030_score: number;
  vision_2030_justification: string;
  recommended_structure: string;
  key_opportunities: string[];
}

export interface ServiceAnalysisData {
  overall_rating: number;
  missing_critical: string[];
  strategic_insight: string;
  recommended_addons: string[];
}

export interface ItineraryItem {
  time: string;
  activity: string;
  location: string;
  description: string;
  type: 'business' | 'leisure' | 'dining';
}

export interface ItineraryDay {
  day: number;
  theme: string;
  items: ItineraryItem[];
}

// --- Audio Helpers ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Retries an operation with exponential backoff.
   */
  private async retry<T>(
    operation: () => Promise<T>,
    retries = 3,
    delay = 2000,
    fallback?: () => Promise<T>
  ): Promise<T> {
    try {
      return await operation();
    } catch (error: any) {
      const status = error.status || error.code;
      const msg = error.message || JSON.stringify(error);
      const isRateLimit = status === 429 || msg.includes('429') || msg.includes('Quota exceeded') || msg.includes('RESOURCE_EXHAUSTED');
      const isServerOverload = status === 503 || msg.includes('503');

      if ((isRateLimit || isServerOverload) && retries > 0) {
        console.warn(`Gemini API Busy (Status ${status}). Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retry(operation, retries - 1, delay * 2, fallback);
      }

      if (fallback) {
        console.warn(`Primary operation failed (Status ${status}). Switching to fallback model...`);
        return this.retry(fallback, retries > 0 ? 1 : 0, delay, undefined);
      }

      throw error;
    }
  }
  
  async sendMessage(history: ChatMessage[], message: string, mode: 'thinking' | 'search' = 'thinking', persona: AIPersona = 'professional'): Promise<AIResponse> {
    const instruction = GET_SYSTEM_INSTRUCTION(persona);
    
    try {
      if (mode === 'thinking') {
        // Attempt with Thinking Model (Pro)
        return await this.retry(
          async () => {
            const response = await this.ai.models.generateContent({
              model: 'gemini-3-pro-preview',
              contents: [
                ...history.map(h => ({ role: h.role, parts: h.parts })),
                { role: 'user', parts: [{ text: message }] }
              ],
              config: {
                systemInstruction: instruction,
                thinkingConfig: { thinkingBudget: 32768 } 
              }
            });
            return { text: response.text || "I apologize, I couldn't generate a response at this time.", sources: [] };
          },
          3, // Retries
          2000, // Initial Delay
          // Fallback to Flash
          async () => {
            const response = await this.ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: [
                ...history.map(h => ({ role: h.role, parts: h.parts })),
                { role: 'user', parts: [{ text: message }] }
              ],
              config: {
                systemInstruction: instruction
              }
            });
            return { text: response.text || "I apologize, I couldn't generate a response at this time.", sources: [] };
          }
        );
      } else {
        // Search Mode (Flash) - Retry logic added
        return await this.retry(async () => {
          const response = await this.ai.models.generateContent({
            model: 'gemini-3-flash-preview', 
            contents: [
              ...history.map(h => ({ role: h.role, parts: h.parts })),
              { role: 'user', parts: [{ text: message }] }
            ],
            config: {
              tools: [{ googleSearch: {} }],
              systemInstruction: `${instruction}\n\nMODE: SEARCH ANALYST\nYou have access to Google Search. Use it to find real-time regulations, news, location data, and market insights. Always prioritize SafaArban's specific services and pricing from the core instructions, but use Search for external facts.`,
            }
          });

          const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
            ?.map((c: any) => {
               if (c.web?.uri) return { title: c.web.title || 'Web Source', uri: c.web.uri, type: 'web' as const };
               return null;
            })
            .filter((s: any) => s !== null) || [];

          return { text: response.text || "I couldn't find relevant information on the web.", sources };
        });
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      return { text: "The advisor terminal is currently unavailable due to high demand. Please contact our Riyadh HQ directly.", sources: [] };
    }
  }

  // --- CONTRACT GENERATION ---
  async draftContract(prompt: string): Promise<string> {
    const instruction = `
      You are the Chief Strategy Officer of SafaArban Ltd. 
      Your task is to draft a "Strategic Service Agreement" document based on the user's prompt.
      
      Parties:
      1. First Party: SafaArban Ltd (Service Provider).
      2. Second Party: The Client (as specified in the prompt).

      MANDATORY STRUCTURE (Do not use typical contract jargon, use this strategic format):
      
      1. EXECUTIVE PREAMBLE
         - Write a paragraph aligning the project with Saudi Vision 2030.
         - Mention SafaArban is honored to facilitate the operational readiness of the Second Party.

      2. STRATEGIC OBJECTIVES & DEFINITIONS
         - Define the primary objective (e.g. Issuance of License).
         - Define First Party roles (Strategic consultant, government liaison).
         - Define Second Party roles (Providing documentation, transparency).

      3. SCOPE OF WORK (TECHNICAL)
         - Break down into exactly 3 Phases using bullet points:
         - Phase I: Regulatory Audit & Pre-Qualification.
         - Phase II: Application & Documentation Strategy.
         - Phase III: Compliance & Licensing Issuance.

      4. COMMERCIAL INVESTMENT & PAYMENT TERMS
         - State the Total Professional Fee.
         - Break into 3 Strategic Tranches:
           * Tranche 1: Mobilization & Initiation (40%)
           * Tranche 2: Submission Milestone (30%)
           * Tranche 3: Project Closeout (30%)
         - Note regarding VAT and Government Fees.

      5. ROADMAP & TIMELINE
         - Provide a timeline (e.g. Days 1-7, Days 8-20, Days 21-45).

      6. GOVERNANCE & JURISDICTION
         - Confidentiality clause.
         - Governing Law (Kingdom of Saudi Arabia).
         - Validity of proposal.

      Tone: Strategic, Professional, Executive.
      Do not include placeholders like [Date] if possible, use "Date of Signing".
      Output clean text with headers (e.g. "1. EXECUTIVE PREAMBLE").
    `;

    try {
        return await this.retry(async () => {
            const response = await this.ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: { parts: [{ text: prompt }] },
                config: {
                    systemInstruction: instruction
                }
            });
            return response.text || "Unable to draft agreement at this time.";
        });
    } catch (error) {
        console.error("Contract Draft Error:", error);
        return "System Error: Unable to access drafting engine.";
    }
  }

  // --- SERVICE SELECTION ANALYSIS ---
  async analyzeServiceSelection(selectedServiceIds: string[]): Promise<ServiceAnalysisData | null> {
    const selectedServices = SERVICES_DB.filter(s => selectedServiceIds.includes(s.id));
    const serviceNames = selectedServices.map(s => s.name).join(', ');
    
    const prompt = `
      Act as a senior consultant at SafaArban. Review this client's service selection for Saudi market entry:
      ${serviceNames}

      Analyze for completeness and compliance with Saudi regulations (MISA, Ministry of Commerce, ZATCA, etc.).
      
      Output strict JSON format with the following fields:
      - overall_rating: Integer 0-100 indicating how complete/compliant this setup is.
      - missing_critical: Array of strings listing critical missing steps (e.g. "Missing Commercial Registration", "No Banking", "Missing GM Visa").
      - strategic_insight: A brief, professional 2-sentence insight analyzing their choices and potential risks.
      - recommended_addons: Array of strings (exact service names from our catalog) that should be added to ensure a smooth launch.
    `;

    try {
        return await this.retry(async () => {
            const response = await this.ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: { parts: [{ text: prompt }] },
                config: {
                    responseMimeType: 'application/json',
                }
            });
            return JSON.parse(response.text || '{}');
        });
    } catch (error) {
        console.error("Service Analysis Error:", error);
        return null;
    }
  }

  // --- BUSINESS PLAN GENERATION ---
  async generateBusinessPlan(name: string, sector: string, desc: string): Promise<BusinessPlanData | null> {
    const prompt = `
      Act as a senior strategy consultant for SafaArban. Generate a strategic market entry summary for Saudi Arabia based on the following:
      Company Name: ${name}
      Sector: ${sector}
      Business Description: ${desc}

      Output strict JSON format with the following fields:
      - executive_summary: A concise 2-3 sentence pitch.
      - market_analysis: Brief analysis of the sector in Saudi Arabia.
      - vision_2030_score: An integer from 0 to 100 indicating alignment with Vision 2030.
      - vision_2030_justification: Why it scores this way.
      - recommended_structure: The best legal entity type (e.g., LLC, RHQ, Branch).
      - key_opportunities: An array of 3 specific opportunities in KSA.
    `;

    try {
        return await this.retry(async () => {
            const response = await this.ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: { parts: [{ text: prompt }] },
                config: {
                    responseMimeType: 'application/json',
                }
            });
            return JSON.parse(response.text || '{}');
        });
    } catch (error) {
        console.error("Plan Generation Error:", error);
        return null;
    }
  }

  // --- CONCIERGE ITINERARY GENERATION ---
  async generateItinerary(duration: number, focus: string, interests: string[]): Promise<ItineraryDay[] | null> {
    const prompt = `
      Act as a luxury travel concierge for a business executive visiting Riyadh, Saudi Arabia.
      Create a detailed ${duration}-day itinerary.
      
      User Preferences:
      - Trip Duration: ${duration} Days
      - Primary Focus: ${focus}
      - Specific Interests: ${interests.join(', ')}

      Ensure the itinerary balances the primary focus with the interests. Include specific names of restaurants, districts (like KAFD, Diriyah, The Boulevard), and landmarks.
      
      Output strictly in the following JSON format:
      [
        {
          "day": 1,
          "theme": "Theme of the day (e.g. Financial District Deep Dive)",
          "items": [
            { "time": "Morning", "activity": "Title of activity", "location": "Specific Place/District", "description": "Short reasoning why this fits", "type": "business" },
            { "time": "Lunch", "activity": "Title", "location": "Specific Restaurant", "description": "Short reasoning", "type": "dining" },
            { "time": "Afternoon", "activity": "Title", "location": "Specific Place", "description": "Short reasoning", "type": "business" },
            { "time": "Evening", "activity": "Title", "location": "Specific Place", "description": "Short reasoning", "type": "leisure" }
          ]
        }
      ]
      Only return the JSON array.
    `;

    try {
        return await this.retry(async () => {
            const response = await this.ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: { parts: [{ text: prompt }] },
                config: {
                    responseMimeType: 'application/json',
                }
            });
            return JSON.parse(response.text || '[]');
        });
    } catch (error) {
        console.error("Itinerary Gen Error:", error);
        return null;
    }
  }

  // --- IMAGE GENERATION ---
  async generateImage(prompt: string, size: "1K" | "2K" | "4K" = "1K", aspectRatio: string = "1:1") {
    try {
      return await this.retry(
        async () => {
          const response = await this.ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: { parts: [{ text: prompt }] },
            config: {
              imageConfig: { aspectRatio: aspectRatio, imageSize: size }
            }
          });
          return this.extractImage(response);
        },
        3, 2000,
        async () => {
          const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] }
          });
          return this.extractImage(response);
        }
      );
    } catch (error) {
      console.error("Image Gen Error:", error);
      throw error;
    }
  }

  // --- IMAGE EDITING (Nano Banana / Flash Image) ---
  async editImage(base64Data: string, mimeType: string, prompt: string) {
    try {
      return await this.retry(async () => {
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType } },
                    { text: prompt }
                ]
            }
        });
        return this.extractImage(response);
      });
    } catch (error) {
        console.error("Image Edit Error:", error);
        throw error;
    }
  }

  // --- IMAGE ANALYSIS ---
  async analyzeImage(base64Data: string, mimeType: string, prompt: string) {
    try {
      return await this.retry(
        async () => {
          const response = await this.ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: {
              parts: [
                { inlineData: { data: base64Data, mimeType } },
                { text: prompt }
              ]
            },
            config: { systemInstruction: GET_SYSTEM_INSTRUCTION('professional') }
          });
          return response.text || "I was unable to analyze this document.";
        },
        3, 2000,
        async () => {
          const response = await this.ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
              parts: [
                { inlineData: { data: base64Data, mimeType } },
                { text: prompt }
              ]
            },
            config: { systemInstruction: GET_SYSTEM_INSTRUCTION('professional') }
          });
          return response.text || "I was unable to analyze this document.";
        }
      );
    } catch (error) {
      console.error("Analysis Error:", error);
      return "The analysis engine is currently unavailable.";
    }
  }

  // --- TEXT TO SPEECH ---
  async speak(text: string): Promise<ArrayBuffer | null> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: { parts: [{ text }] },
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        }
      });
      
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return decode(base64Audio).buffer;
      }
      return null;
    } catch (e) {
      console.error("TTS Error:", e);
      return null;
    }
  }

  // --- LIVE API (WebSockets) ---
  connectLive(callbacks: any) {
    return this.ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
        },
        // CHANGED: Pass string directly
        systemInstruction: GET_SYSTEM_INSTRUCTION('professional')
      },
      callbacks
    });
  }

  // --- HELPERS ---
  private extractImage(response: any): string | null {
    const candidate = response.candidates?.[0];
    if (!candidate) return null;
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  // Expose helpers for Component use
  public createBlob(data: Float32Array): any {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  public decodeAudioData(base64: string) {
    return decode(base64);
  }
}

export const gemini = new GeminiService();
