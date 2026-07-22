import { useEffect, useState } from "react";
import { askGemini } from "../services/gemini";

function AIChat({ transactions }) {
  const [message, setMessage] = useState("");
const [chatHistory, setChatHistory] = useState(() => {
  const savedChat = localStorage.getItem("chatHistory");

  return savedChat ? JSON.parse(savedChat) : [];
});
  const [loading, setLoading] = useState(false);
useEffect(() => {
  localStorage.setItem(
    "chatHistory",
    JSON.stringify(chatHistory)
  );
}, [chatHistory]);
  const handleAskAI = async () => {
    if (!message.trim()) return;

    setLoading(true);
   

    const prompt = `
You are a helpful personal finance AI assistant.

Here are the user's financial transactions:

${JSON.stringify(transactions)}

The user asks:
"${message}"

Answer the user's question based only on their transaction data.

Rules:
- Give practical and personalized financial advice.
- Use Indian Rupees (₹) for money.
- Keep the answer simple and easy to understand.
- If there is not enough transaction data, clearly mention that.
- Do not make up financial information.
`;

    const answer = await askGemini(prompt);

setChatHistory((prev) => [
  ...prev,
  {
    question: message,
    answer: answer,
  },
]);

setMessage("");
setLoading(false);
  };

  return (
    <div className="ai-card ai-chat">
      <h2>💬 AI Financial Assistant</h2>
<button
  className="clear-chat-btn"
  onClick={() => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  }}
>
  🗑️ Clear Chat
</button>
      <p>
        Ask me anything about your spending and finances.
      </p>
<div className="quick-questions">
  <button
    onClick={() => setMessage("Where am I spending the most?")}
  >
    📊 Where am I spending the most?
  </button>

  <button
    onClick={() => setMessage("How can I save more money?")}
  >
    💰 How can I save more?
  </button>

  <button
    onClick={() =>
      setMessage("Give me 3 tips to reduce my expenses.")
    }
  >
    💡 Reduce my expenses
  </button>
</div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="e.g. Where am I spending the most?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAskAI();
            }
          }}
        />

        <button
          onClick={handleAskAI}
          disabled={loading}
        >
          {loading ? "🤖 Thinking..." : "Ask AI"}
        </button>
      </div>

     {chatHistory.length > 0 && (
  <div className="chat-history">
    {chatHistory.map((chat, index) => (
      <div className="chat-message" key={index}>
        
        <div className="user-message">
          <strong>👤 You:</strong>
          <p>{chat.question}</p>
        </div>

        <div className="ai-message">
          <strong>🤖 AI:</strong>

          {chat.answer.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
         </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIChat;