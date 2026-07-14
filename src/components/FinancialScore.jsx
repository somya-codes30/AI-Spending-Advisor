function FinancialScore({ income, expenses }) {
  const savingsRate =
    income > 0
      ? ((income - expenses) / income) * 100
      : 0;

  return (
    <div className="score-card">
      <h3>💳 Financial Health</h3>
      <h1>{savingsRate.toFixed(0)}/100</h1>
      <p>
        Savings Rate: {savingsRate.toFixed(1)}%
      </p>
    </div>
  );
}

export default FinancialScore;