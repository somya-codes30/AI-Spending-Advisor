import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function CategoryPieChart({ transactions }) {
  const expenses = transactions.filter(
    (item) => item.type === "expense"
  );

  const categoryTotals = {};

  expenses.forEach((item) => {
    const category = item.category || "Others";
    categoryTotals[category] =
      (categoryTotals[category] || 0) + item.amount;
  });

  const data = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
  ];

  return (
    <div className="ai-card">
      <h2>📊 Expense Breakdown</h2>

      {data.length === 0 ? (
        <p>No expense data available.</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx={200}
            cy={150}
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default CategoryPieChart;