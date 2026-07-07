function AIInsights({ transactions }) {
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

  // AI Tips
  const tips = [];

  if (savingsRate >= 50) {
    tips.push("✅ Excellent! You are saving more than 50% of your income.");
  }

  if (expenses < 5000) {
    tips.push("🎉 Your spending is well under control.");
  }

  if (expenses > income * 0.7) {
    tips.push("⚠️ Your expenses are very high compared to your income.");
  }

  // Predicted Savings
  const predictedSavings = savings;

  let savingLevel = "";

  if (predictedSavings >= 50000) {
    savingLevel = "⭐⭐ Excellent Saving Habit";
  } else if (predictedSavings >= 20000) {
    savingLevel = "⭐ Good Saving Habit";
  } else {
    savingLevel = "⚠️ Try to save more each month";
  }

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

      {highestExpense && (
        <p>
          📌 Biggest Expense:
          <strong> {highestExpense.name}</strong> (₹
          {highestExpense.amount})
        </p>
      )}

      {tips.map((tip, index) => (
        <p key={index}>{tip}</p>
      ))}

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