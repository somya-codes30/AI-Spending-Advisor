
import { GoogleGenerativeAI } from "@google/generative-ai";
//console.log(import.meta.env.VITE_GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function askGemini(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return "Sorry, AI is currently unavailable.";
  }
}