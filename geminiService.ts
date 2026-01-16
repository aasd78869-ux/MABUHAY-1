/**
 * Fail-Safe Gemini Service
 * - NEVER crashes the app
 * - Runs only when API key is available
 * - Safe for Google AI Studio, Vercel, and browser
 */

const SYSTEM_INSTRUCTION = `
You are Mabuhay Assistant, an expert in Philippines tourism.
Always start with "Mabuhay!". Be friendly and guide users to the booking form.
`;

function getApiKey(): string | null {
  // Vercel / Vite
  const viteKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;
  if (viteKey) return viteKey;

  // Google AI Studio / browser testing
  if (typeof window !== "undefined" && (window as any).GEMINI_API_KEY) {
    return (window as any).GEMINI_API_KEY;
  }

  return null;
}

export const getChatbotResponse = async (userMessage: string) => {
  try {
    const apiKey = getApiKey();

    if (!apiKey) {
      console.warn("[Gemini] API key missing — AI disabled");
      return "مابوهاي! عذراً، خدمة المساعد الذكي غير متاحة حالياً. يرجى استخدام نموذج الحجز للتواصل معنا.";
    }

    // Lazy-load SDK ONLY when needed
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response?.response?.text() ||
      "مابوهاي! كيف يمكنني مساعدتك اليوم؟";
  } catch (error) {
    console.error("[Gemini] Runtime error:", error);
    return "مابوهاي! نواجه صعوبة في معالجة طلبك، يرجى التواصل معنا عبر الواتساب مباشرة.";
  }
};
