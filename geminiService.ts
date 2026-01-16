
/**
 * Fail-Safe Gemini Service
 * - NEVER crashes the app
 * - Runs only when API key is available
 * - Safe for Google AI Studio, Vercel, and browser
 */

const SYSTEM_INSTRUCTION = `
أنت "مساعد مابوهاي الذكي"، خبير في سياحة الفلبين.
ابدأ دائماً بكلمة "مابوهاي!". كن ودوداً ووجه المستخدمين دائماً لنموذج الحجز.
`;

function getApiKey(): string | null {
  try {
    // 1. Check process.env (Standard in Vercel/Production)
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      return process.env.API_KEY;
    }
    
    // 2. Check import.meta.env (Vite standard)
    const viteKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;
    if (viteKey) return viteKey;

    // 3. Check browser global (AI Studio or manual testing)
    if (typeof window !== "undefined" && (window as any).GEMINI_API_KEY) {
      return (window as any).GEMINI_API_KEY;
    }
  } catch (e) {
    console.warn("[Gemini] API Key detection error:", e);
  }
  return null;
}

export const getChatbotResponse = async (userMessage: string) => {
  try {
    const apiKey = getApiKey();

    if (!apiKey) {
      console.warn("[Gemini] AI Service disabled: Missing API Key");
      return "مابوهاي! عذراً، خدمة المساعد الذكي غير متاحة حالياً. يرجى استخدام نموذج الحجز للتواصل معنا.";
    }

    // Lazy-load SDK to prevent top-level import issues in browser-only environments
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // CORRECT: Use .text property directly, not as a function.
    // GUIDELINE: response.text is the correct way to extract content.
    return response.text || "مابوهاي! كيف يمكنني مساعدتك اليوم؟";
  } catch (error) {
    console.error("[Gemini] Service Runtime Error:", error);
    return "مابوهاي! نواجه صعوبة في معالجة طلبك حالياً، يرجى التواصل معنا عبر الواتساب مباشرة.";
  }
};
