// NOTE: This file has been temporarily stubbed out due to incompatible Google AI SDK usage.
// The original code was written for a different/experimental version of the SDK.
// This needs to be refactored to use the official @google/generative-ai package correctly.
//
// To fix: Use GoogleGenerativeAI class properly:
// const model = ai.getGenerativeModel({ model: "gemini-pro" });
// const result = await model.generateContent(prompt);

import { GoogleGenerativeAI, Schema } from "@google/generative-ai";
import { ChatMessage } from "./types";
import { GLOSSARY_DB, SERVICES_DB, CORE_SERVICES_CONTENT, BLOG_POSTS } from "./constants";

export type AIPersona = 'professional' | 'casual';

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

export class GeminiService {
  private ai: GoogleGenerativeAI;

  constructor() {
    this.ai = new GoogleGenerativeAI(process.env.API_KEY || '');
  }

  async sendMessage(
    history: ChatMessage[],
    message: string,
    mode: 'thinking' | 'search' | 'fast' | 'maps' = 'thinking',
    persona: AIPersona = 'professional'
  ): Promise<AIResponse> {
    // TODO: Implement with correct Google Generative AI SDK
    console.warn('GeminiService.sendMessage is stubbed - needs implementation');
    return { text: "AI Assistant is currently unavailable.", sources: [] };
  }

  async generateVideo(prompt: string, imageBase64?: string): Promise<string | null> {
    console.warn('GeminiService.generateVideo is stubbed - needs implementation');
    return null;
  }

  async pollVideoOperation(operationId: string, maxRetries?: number, delayMs?: number): Promise<string | null> {
    console.warn('GeminiService.pollVideoOperation is stubbed - needs implementation');
    return null;
  }

  async generateAudio(prompt: string, voice?: string): Promise<Float32Array | null> {
    console.warn('GeminiService.generateAudio is stubbed - needs implementation');
    return null;
  }

  async generateBusinessPlan(prompt: string): Promise<BusinessPlanData | null> {
    console.warn('GeminiService.generateBusinessPlan is stubbed - needs implementation');
    return null;
  }

  async analyzeServiceSelection(selectedServiceIds: string[]): Promise<ServiceAnalysisData | null> {
    console.warn('GeminiService.analyzeServiceSelection is stubbed - needs implementation');
    return null;
  }

  async generateAgreementText(prompt: string): Promise<string> {
    console.warn('GeminiService.generateAgreementText is stubbed - needs implementation');
    return "Agreement generation is currently unavailable.";
  }

  async generateItinerary(days: number, preferences: string): Promise<ItineraryDay[]> {
    console.warn('GeminiService.generateItinerary is stubbed - needs implementation');
    return [];
  }

  public createBlob(data: Float32Array): any {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    const bytes = new Uint8Array(int16.buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return {
      data: btoa(binary),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  public decodeAudioData(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}

export const gemini = new GeminiService();
