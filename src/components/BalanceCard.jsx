function BalanceCard({ balance, income, expenses }) {
  return (
    <div className="balance-card">
      <h3>Current Balance</h3>

      <h1>₹{balance}</h1>

      <div>
        <h3>Income</h3>
        <p>₹{income}</p>

        <h3>Expenses</h3>
        <p>₹{expenses}</p>
      </div>
    </div>
  );
}

export default BalanceCard;