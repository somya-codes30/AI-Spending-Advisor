import { useState, useEffect } from "react";
import "./App.css";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaPiggyBank,
} from "react-icons/fa";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BalanceCard from "./components/BalanceCard";
import TransactionList from "./components/TransactionList";
import AddExpense from "./components/AddExpense";
import AIInsights from "./components/AIInsights";
import AIChat from "./components/AIChat";
import SavingsGoal from "./components/SavingsGoal";
import CategorySummary from "./components/CategorySummary";
import CategoryPieChart from "./components/CategoryPieChart";
import BudgetAlert from "./components/BudgetAlert";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  // Transactions
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [
          {
            name: "Food",
            amount: 500,
            type: "expense",
            category: "Food",
          },
          {
            name: "Travel",
            amount: 250,
            type: "expense",
            category: "Travel",
          },
          {
            name: "Salary",
            amount: 70000,
            type: "income",
          },
        ];
  });

  // Theme
  const [darkMode, setDarkMode] = useState(true);

  // User name
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  // Save transactions
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // Save user name
  const saveName = () => {
    if (userName.trim() !== "") {
      localStorage.setItem("userName", userName);
      window.location.reload();
    }
  };
  const changeUser = () => {
  localStorage.removeItem("userName");
  window.location.reload();
};

  // Add transaction
  const addTransaction = (newTransaction) => {
    setTransactions([
      ...transactions,
      newTransaction,
    ]);
  };

  // Delete transaction
  const deleteTransaction = (indexToDelete) => {
    setTransactions(
      transactions.filter(
        (_, index) => index !== indexToDelete
      )
    );
  };

  // Calculations
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce(
      (total, item) => total + item.amount,
      0
    );

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce(
      (total, item) => total + item.amount,
      0
    );

  const balance = income - expenses;

 return (
  <div
    className={`app-container ${
      darkMode ? "dark-theme" : "light-theme"
    }`}
  >
    <ThemeToggle
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />

    <button
      className="change-user-btn"
      onClick={changeUser}
    >
      👤 Change User
    </button>

    {/* Ask Name Only Once */}
    {!localStorage.getItem("userName") && (
      <div className="ai-card">
        <h2>Welcome 👋</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) =>
            setUserName(e.target.value)
          }
        />

        <button onClick={saveName}>
          Continue
        </button>
      </div>
    )}

    <Navbar />

    <Hero userName={userName} />

    {/* Dashboard Cards */}
    <div className="dashboard-grid">
      <BalanceCard
        balance={balance}
        income={income}
        expenses={expenses}
      />

      <SavingsGoal balance={balance} />

      <BudgetAlert expenses={expenses} />

      <CategorySummary
        transactions={transactions}
      />
    </div>

    {/* Add Expense Form */}
    <AddExpense
      addTransaction={addTransaction}
    />

    {/* Transactions */}
    <TransactionList
      transactions={transactions}
      deleteTransaction={deleteTransaction}
    />

    {/* Analytics Section */}
    <div className="analytics-grid">
      <CategoryPieChart
        transactions={transactions}
      />

      <AIInsights
        transactions={transactions}
      />
    </div>

    {/* AI Assistant */}
    <AIChat
      transactions={transactions}
    />
  </div>
);
}
export default App;