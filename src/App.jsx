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
import ExpenseTrendChart from "./components/ExpenseTrendChart";
import Sidebar from "./components/Sidebar";
import QuickActions from "./components/QuickActions";
import FinancialScore from "./components/FinancialScore";
import DashboardHeader from "./components/DashboardHeader";
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
  <div className="main-layout">
  <Sidebar />

  <div
    className={`app-container ${
      darkMode ? "dark-theme" : "light-theme"
    }`}
  >
    <div className="top-bar">
      <ThemeToggle
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <button onClick={changeUser}>
        👤 Change User
      </button>
    </div>

    <Hero userName={userName} />

    <div className="stats-grid">
      <BalanceCard
        balance={balance}
        income={income}
        expenses={expenses}
      />

      <FinancialScore
        income={income}
        expenses={expenses}
      />

      <SavingsGoal balance={balance} />

      <QuickActions />
    </div>

    <div className="middle-grid">
      <AddExpense
        addTransaction={addTransaction}
      />

      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </div>

    <div className="bottom-grid">
      <CategoryPieChart
        transactions={transactions}
      />

      <AIInsights
        transactions={transactions}
      />
    </div>

    <AIChat transactions={transactions} />
  </div>
</div>
);
}
export default App;