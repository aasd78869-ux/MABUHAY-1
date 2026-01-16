
/**
 * Safe Gemini Service Wrapper
 * Handles dynamic loading and environment variable checks to prevent crashes.
 */

const SYSTEM_INSTRUCTION = `
أنت "مساعد مابوهاي الذكي" (Mabuhay Smart Assistant)، الخبير الأول في سياحة الفلبين للمسافرين العرب.
مهمتك: الإجابة على جميع تساؤلات الزوار حول السفر إلى الفلبين وتقديم توصيات مخصصة.

تعليماتك الصارمة:
1. ابدأ دائماً بكلمة "مابوهاي" (Mabuhay) بكل ود.
2. أنت خبير في الجزر، مانيلا، التسوق، والمطاعم العربية الحلال.
3. وجه الزوار دائماً لنموذج الحجز في الموقع للتواصل مع فريقنا البشري عبر الواتساب.
`;

export const getChatbotResponse = async (userMessage: string) => {
  // Safe extraction of API Key from multiple potential environments
  const apiKey = (typeof process !== 'undefined' ? process.env?.API_KEY : null) || 
                 (import.meta as any).env?.VITE_GEMINI_API_KEY || "";

  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features are disabled.");
    return "مابوهاي! عذراً، خدمة المساعد الذكي غير مفعلة حالياً. يمكنك التواصل معنا مباشرة عبر الواتساب.";
  }

  try {
    // Dynamic import to prevent top-level crashes if SDK is unavailable
    const { GoogleGenAI } = await import("@google/genai");
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "مابوهاي! أنا هنا لخدمتك، كيف يمكنني مساعدتك اليوم؟";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "نعتذر، واجهنا مشكلة تقنية في الاتصال بالمساعد الذكي. فريقنا متاح لخدمتك عبر الواتساب.";
  }
};
