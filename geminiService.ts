
import { GoogleGenAI } from "@google/genai";

/**
 * Gemini Service for Mabuhay Assistant
 * Strictly follows @google/genai guidelines
 */

const SYSTEM_INSTRUCTION = `
أنت "مساعد مابوهاي الذكي"، خبير في سياحة الفلبين.
ابدأ دائماً بكلمة "مابوهاي!". كن ودوداً ووجه المستخدمين دائماً لنموذج الحجز.
`;

export const getChatbotResponse = async (userMessage: string) => {
  try {
    // GUIDELINE: Always use named parameter for apiKey and obtain it from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // GUIDELINE: Use ai.models.generateContent directly with model name and prompt
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // GUIDELINE: Access .text property directly
    return response.text || "مابوهاي! كيف يمكنني مساعدتك اليوم؟";
  } catch (error) {
    console.error("[Gemini] Service Runtime Error:", error);
    return "مابوهاي! عذراً، خدمة المساعد الذكي غير متاحة حالياً. يرجى استخدام نموذج الحجز للتواصل معنا.";
  }
};
