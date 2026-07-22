import { useEffect, useState } from "react";
import { askGemini } from "../services/gemini";
function AIInsights({ transactions }) {
const [aiAdvice, setAiAdvice] = useState(
  localStorage.getItem("aiAdvice") || ""
);
useEffect(() => {
  localStorage.setItem("aiAdvice", aiAdvice);
}, [aiAdvice]);
const [loading, setLoading] = useState(false);
const [lastAnalyzedTransactions, setLastAnalyzedTransactions] =
  useState(
    localStorage.getItem("lastAnalyzedTransactions") || ""
  );
const getAIAdvice = async () => {
  if (transactions.length === 0) {
    setAiAdvice("Add some transactions to get personalized AI advice.");
    return;
  }

  setLoading(true);
const prompt = `
You are an intelligent personal finance advisor.

Analyze the user's financial transactions below:

${JSON.stringify(transactions)}

Give the user a personalized financial analysis.

Structure your response exactly using these sections:

📊 Spending Summary
Briefly explain the user's overall spending pattern.

💰 Savings Health
Explain whether the user's current savings behavior is healthy.

⚠️ Areas to Improve
Mention the main financial areas where the user should be careful.

💡 Smart Recommendations
Give exactly 3 practical and personalized recommendations.

Rules:
- Use simple and friendly language.
- Use Indian Rupees (₹) for money amounts.
- Base your analysis only on the provided transaction data.
- Do not make up transaction values.
- Keep the response concise and easy to read.
`;


  const advice = await askGemini(prompt);

  setAiAdvice(advice);
  const transactionSnapshot = JSON.stringify(transactions);

setLastAnalyzedTransactions(transactionSnapshot);

localStorage.setItem(
  "lastAnalyzedTransactions",
  transactionSnapshot
);
  setLoading(false);
};
  // Calculate Income
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  // Calculate Expenses
  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  // Calculate Savings
  const savings = income - expenses;

  // Calculate Savings Rate
  const savingsRate =
    income > 0 ? ((savings / income) * 100).toFixed(1) : 0;

  // Find Highest Expense
  const expenseTransactions = transactions.filter(
    (item) => item.type === "expense"
  );

  let highestExpense = null;

  if (expenseTransactions.length > 0) {
    highestExpense = expenseTransactions.reduce((max, item) =>
      item.amount > max.amount ? item : max
    );
  }

 
  // Predicted Savings
  const predictedSavings = savings;

  let savingLevel = "";

if (savingsRate >= 50) {
  savingLevel = "⭐⭐ Excellent Saving Habit";
} else if (savingsRate >= 20) {
  savingLevel = "⭐ Good Saving Habit";
} else {
  savingLevel = "⚠️ Try to save more each month";
}
const currentTransactionSnapshot =
  JSON.stringify(transactions);

const transactionsChanged =
  lastAnalyzedTransactions &&
  lastAnalyzedTransactions !== currentTransactionSnapshot;
  return (
    <div className="ai-card">
      <h2>🤖 AI Spending Advisor</h2>

      <h3>📊 Financial Summary</h3>

      <p>💰 Income: ₹{income}</p>

      <p>💸 Expenses: ₹{expenses}</p>

      <p>🏦 Savings: ₹{savings}</p>

      <p>📈 Savings Rate: {savingsRate}%</p>

      <hr />

      <h3>💡 AI Recommendations</h3>
      {transactionsChanged && (
  <p>
    🔄 Your transactions have changed.
    Get new AI advice for the latest analysis.
  </p>
)}
<button onClick={getAIAdvice} disabled={loading}>
  {loading ? "🤖 Analyzing..." : "✨ Get AI Advice"}
</button>

{aiAdvice && (
  <div className="ai-advice">
    <h4>🤖 AI Financial Analysis</h4>

    <div className="ai-response">
      {aiAdvice.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  </div>
)}
      {highestExpense && (
        <p>
          📌 Biggest Expense:
          <strong> {highestExpense.name}</strong> (₹
          {highestExpense.amount})
        </p>
      )}

     

      <hr />

      <h3>🎯 Predicted Monthly Savings</h3>

      <p>
        At your current spending, you can save approximately:
      </p>

      <h2>₹{predictedSavings}/month</h2>

      <p>{savingLevel}</p>
    </div>
  );
}

export default AIInsights;