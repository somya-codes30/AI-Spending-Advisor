function MonthlyAnalytics({
  income,
  expenses,
  balance,
}) {
  const savingsRate =
    income > 0
      ? ((balance / income) * 100).toFixed(1)
      : 0;

  let status = "Needs Improvement 😐";

  if (savingsRate >= 80)
    status = "Excellent ⭐⭐⭐⭐⭐";
  else if (savingsRate >= 60)
    status = "Very Good ⭐⭐⭐⭐";
  else if (savingsRate >= 40)
    status = "Good ⭐⭐⭐";
  else if (savingsRate >= 20)
    status = "Average ⭐⭐";

  return (
    <div className="analytics-card">
      <h2>📊 Monthly Analytics</h2>

      <div className="analytics-item">
        <span>💰 Total Income</span>
        <strong>₹{income.toLocaleString()}</strong>
      </div>

      <div className="analytics-item">
        <span>💸 Total Expense</span>
        <strong>₹{expenses.toLocaleString()}</strong>
      </div>

      <div className="analytics-item">
        <span>🏦 Current Balance</span>
        <strong>₹{balance.toLocaleString()}</strong>
      </div>

      <div className="analytics-item">
        <span>📈 Savings Rate</span>
        <strong>{savingsRate}%</strong>
      </div>

      <hr />

      <h3>{status}</h3>
    </div>
  );
}

export default MonthlyAnalytics;