function AIInsights({ transactions }) {

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  let message = "";

  if (totalExpenses > 5000) {
    message =
      "⚠️ Your expenses are quite high this month. Try reducing unnecessary spending.";
  } else if (totalExpenses > 2000) {
    message =
      "🙂 Your spending is moderate. Keep tracking your expenses.";
  } else {
    message =
      "🎉 Great job! Your expenses are well under control.";
  }

  return (
    <div className="ai-card">
      <h2>🤖 AI Spending Insights</h2>

      <p>{message}</p>

      <h3>Total Expenses</h3>

      <h2>₹{totalExpenses}</h2>
    </div>
  );
}

export default AIInsights;