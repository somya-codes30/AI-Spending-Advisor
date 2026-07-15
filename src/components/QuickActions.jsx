function QuickActions() {
  const scrollToExpense = () => {
    const expenseSection =
      document.querySelector(
        ".expense-card"
      );

    if (expenseSection) {
      expenseSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      alert("Expense section not found!");
    }
  };

 const scrollToGoal = () => {
  alert(
    "Current goal is ₹1,00,000"
  );
};

const showIncome = () => {
  alert(
    "Income feature will be added from the Add Expense form for now."
  );
};

  const showReport = () => {
  window.print();
};

  return (
    <div className="quick-actions">
      <button onClick={scrollToExpense}>
        ➕ Add Expense
      </button>

      <button onClick={showIncome}>
        💰 Add Income
      </button>

      <button onClick={showReport}>
        📄 Report
      </button>

      <button onClick={scrollToGoal}>
        🎯 Goal
      </button>
    </div>
  );
}

export default QuickActions;