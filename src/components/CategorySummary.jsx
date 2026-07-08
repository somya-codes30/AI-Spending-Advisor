function CategorySummary({ transactions }) {
  const expenses = transactions.filter(
    (item) => item.type === "expense"
  );

  const categoryTotals = {};

  expenses.forEach((item) => {
    const category = item.category || "Others";

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      item.amount;
  });

  return (
    <div className="ai-card">
      <h2>📊 Expense Categories</h2>

      {Object.entries(categoryTotals).map(
        ([category, amount]) => (
          <p key={category}>
            {category}: ₹{amount}
          </p>
        )
      )}
    </div>
  );
}

export default CategorySummary;