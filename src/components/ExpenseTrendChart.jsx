import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ExpenseTrendChart({ transactions }) {
  const expenses = transactions.filter(
    (t) => t.type === "expense"
  );

  const chartData = expenses.map((item, index) => ({
    name: `Expense ${index + 1}`,
    amount: item.amount,
  }));

  return (
    <div className="chart-card">
      <h2>📈 Expense Trends</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#00c6ff"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseTrendChart;