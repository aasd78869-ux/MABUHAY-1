
/**
 * Fail-Safe Gemini Service
 * Only loads if API_KEY is present, never crashes the app.
 */

const SYSTEM_INSTRUCTION = `
You are Mabuhay Assistant, an expert in Philippines tourism.
Always start with "Mabuhay!". Be friendly and guide users to the booking form.
`;

export const getChatbotResponse = async (userMessage: string) => {
  try {
    // Robust API key detection across local/vercel/studio
    const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) || 
                   (import.meta as any).env?.VITE_GEMINI_API_KEY || 
                   "";

    if (!apiKey) {
      console.warn("AI Service unavailable: Missing API Key");
      return "مابوهاي! عذراً، خدمة المساعد الذكي غير متاحة حالياً. يرجى استخدام نموذج الحجز للتواصل معنا.";
    }

    // Dynamic import to prevent build-time crashes if SDK is missing
    const { GoogleGenAI } = await import("@google/genai");
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "مابوهاي! كيف يمكنني مساعدتك اليوم؟";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "مابوهاي! نواجه صعوبة في معالجة طلبك، يرجى التواصل معنا عبر الواتساب مباشرة.";
  }
};
