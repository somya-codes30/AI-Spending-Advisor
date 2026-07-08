import { useState } from "react";
import { askGemini } from "../services/gemini";

function AIChat({ transactions }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (question.trim() === "") {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);

 const prompt = `
You are an Indian financial advisor.

All amounts are in Indian Rupees (₹).

User Financial Data:
${JSON.stringify(transactions, null, 2)}

User Question:
${question}

Based on the user's financial data:

1. Give a short financial analysis.
2. Mention the biggest expense.
3. Suggest ways to save more money.
4. Suggest whether the user should invest.
5. Use ₹ instead of $.
6. Do NOT use markdown symbols like **, ##, or bullet markdown.
7. Keep the response short and easy to understand.
`;

    const response = await askGemini(prompt);

    setAnswer(response);
    setLoading(false);
  };

  return (
    <div className="ai-card">
      <h2>💬 Ask AI</h2>

      <textarea
        rows="4"
        placeholder="Example: How can I save more money this month?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAskAI}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <>
          <hr />
          <h3>🤖 AI Response</h3>
          <p>{answer}</p>
        </>
      )}
    </div>
  );
}

export default AIChat;