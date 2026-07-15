function StatsCards({
  balance,
  income,
  expenses,
}) {
  return (
    <div className="stats-cards">
      <div className="stat-card">
        <h4>💰 Balance</h4>
        <h2>₹{balance}</h2>
      </div>

      <div className="stat-card">
        <h4>📈 Income</h4>
        <h2>₹{income}</h2>
      </div>

      <div className="stat-card">
        <h4>📉 Expenses</h4>
        <h2>₹{expenses}</h2>
      </div>

      <div className="stat-card">
        <h4>🎯 Savings</h4>
        <h2>₹{income - expenses}</h2>
      </div>
    </div>
  );
}

export default StatsCards;