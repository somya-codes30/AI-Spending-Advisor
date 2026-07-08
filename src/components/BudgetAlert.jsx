function BudgetAlert({ expenses }) {
  const budget = 10000;

  const percentage = (expenses / budget) * 100;

  return (
    <div className="ai-card">
      <h2>🎯 Monthly Budget</h2>

      <p>Budget: ₹{budget}</p>
      <p>Spent: ₹{expenses}</p>

      <p>{percentage.toFixed(0)}% of budget used.</p>

      {expenses > budget ? (
        <p style={{ color: "red" }}>
          ⚠️ Warning! You have exceeded your monthly budget.
        </p>
      ) : percentage >= 80 ? (
        <p style={{ color: "orange" }}>
          ⚠️ You are close to your budget limit.
        </p>
      ) : (
        <p style={{ color: "green" }}>
          ✅ You are within your budget.
        </p>
      )}
    </div>
  );
}

export default BudgetAlert;