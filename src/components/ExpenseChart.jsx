import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ transactions }) {
  const expenseData = transactions
    .filter((item) => item.type === "expense")
    .map((item) => ({
      name: item.name,
      value: item.amount,
    }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A855F7",
    "#EF4444",
  ];

  return (
    <div className="chart-card">
      <h2>📊 Expense Distribution</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {expenseData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;