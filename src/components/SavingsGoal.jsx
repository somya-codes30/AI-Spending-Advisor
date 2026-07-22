function SavingsGoal({ balance }) {
  const goal = 100000;

  const progress = Math.min(
    (balance / goal) * 100,
    100
  );

  return (
    <div className="savings-goal">
      <h2>🎯 Savings Goal</h2>

      <p>
        Goal: ₹{goal.toLocaleString()}
      </p>

      <p>
        Current Savings: ₹{balance.toLocaleString()}
      </p>

      <p>
        {progress.toFixed(0)}% Completed
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default SavingsGoal;