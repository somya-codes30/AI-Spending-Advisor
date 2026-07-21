import { useState, useEffect } from "react";
import "./App.css";

import TransactionList from "./components/TransactionList";
import AddExpense from "./components/AddExpense";
import AIInsights from "./components/AIInsights";
import AIChat from "./components/AIChat";
import SavingsGoal from "./components/SavingsGoal";
import CategoryPieChart from "./components/CategoryPieChart";
import ThemeToggle from "./components/ThemeToggle";
import Sidebar from "./components/Sidebar";
import QuickActions from "./components/QuickActions";
import FinancialScore from "./components/FinancialScore";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import ExpenseTrendChart from "./components/ExpenseTrendChart";
import MonthlyAnalytics from "./components/MonthlyAnalytics";
import AddIncome from "./components/AddIncome";

function App() {
  // Transactions
  // Transactions
const [transactions, setTransactions] =
  useState(() => {
    const savedTransactions =
      localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });
  useEffect(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}, [transactions]);

  // Theme
  const [darkMode, setDarkMode] =
    useState(true);

  // User
  const [userName, setUserName] =
    useState(
      localStorage.getItem("userName") || ""
    );
useEffect(() => {
  localStorage.setItem("userName", userName);
}, [userName]);
  const [inputName, setInputName] =
    useState("");

  const saveName = () => {
    if (!inputName.trim()) return;

    localStorage.setItem(
      "userName",
      inputName
    );

    setUserName(inputName);
    setInputName("");
  };

  const changeUser = () => {
    localStorage.removeItem("userName");
    setUserName("");
    setInputName("");
  };

  // Save transactions
 useEffect(() => {
  if (userName) {
    localStorage.setItem(
      `transactions_${userName}`,
      JSON.stringify(transactions)
    );
  }
}, [transactions, userName]);
useEffect(() => {
  if (!userName) return;

  const saved =
    localStorage.getItem(
      `transactions_${userName}`
    );

  if (saved) {
    setTransactions(JSON.parse(saved));
  } else {
    setTransactions([
      {
        name: "Salary",
        amount: 70000,
        type: "income",
      },
    ]);
  }
}, [userName]);

  // Add transaction
  const addTransaction = (
    newTransaction
  ) => {
    setTransactions([
      ...transactions,
      newTransaction,
    ]);
  };

  // Delete transaction
  const deleteTransaction = (
    indexToDelete
  ) => {
    setTransactions(
      transactions.filter(
        (_, index) =>
          index !== indexToDelete
      )
    );
  };

  // Calculations
  const income = transactions
    .filter(
      (item) => item.type === "income"
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );

  const expenses = transactions
    .filter(
      (item) => item.type === "expense"
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );

  const balance = income - expenses;

  return (
    <div className="main-layout">
      <Sidebar />

      <div
        className={`app-container ${
          darkMode
            ? "dark-theme"
            : "light-theme"
        }`}
      >
        <div className="top-bar">
          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <button
            onClick={changeUser}
          >
            👤 Change User
          </button>
        </div>

        {!userName && (
          <div className="ai-card">
            <h2>Welcome 👋</h2>

            <input
              type="text"
              placeholder="Enter your name"
              value={inputName}
              onChange={(e) =>
                setInputName(
                  e.target.value
                )
              }
            />

            <button
              onClick={saveName}
            >
              Continue
            </button>
          </div>
        )}

        {userName && (
          <>
            <DashboardHeader
              userName={userName}
            />

            <div className="stats-grid">
              <StatsCards
                balance={balance}
                income={income}
                expenses={expenses}
              />

              <FinancialScore
                income={income}
                expenses={expenses}
              />

              <SavingsGoal
                balance={balance}
              />

              <QuickActions />
            </div>

            <div className="expense-section">
<div className="expense-card">
    <AddExpense
      addTransaction={addTransaction}
    />
  </div>
  <div className="expense-card income-card">
  <AddIncome
    addTransaction={addTransaction}
  />
</div>

 
  <div className="transaction-card">
    <TransactionList
      transactions={transactions}
      deleteTransaction={deleteTransaction}
    />
  </div>

</div>


            <div className="bottom-grid">
  <CategoryPieChart
    transactions={transactions}
  />

  <ExpenseTrendChart
    transactions={transactions}
  />

  <MonthlyAnalytics
    income={income}
    expenses={expenses}
    balance={balance}
  />

  <AIInsights
    transactions={transactions}
  />
</div>

            <AIChat
              transactions={
                transactions
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;