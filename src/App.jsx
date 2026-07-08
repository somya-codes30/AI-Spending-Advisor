
import { useState, useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

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
function App() {

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    
    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [
          {
            name: "Food",
            amount: 500,
            type: "expense",
          },
          {
            name: "Travel",
            amount: 250,
            type: "expense",
          },
          {
            name: "Salary",
            amount: 70000,
            type: "income",
          },
        ];
  });
const [darkMode, setDarkMode] = useState(true);
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (indexToDelete) => {
    setTransactions(
      transactions.filter((_, index) => index !== indexToDelete)
    );
  };

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expenses;

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

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
      <Navbar />

      <Hero />

      <BalanceCard
        balance={balance}
        income={income}
        expenses={expenses}
      />

      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />

      <AddExpense addTransaction={addTransaction} />

      <AIInsights transactions={transactions} />
      <SavingsGoal balance={balance} />
      <CategorySummary transactions={transactions} />
      <CategoryPieChart transactions={transactions} />
      <BudgetAlert expenses={expenses} />
      <AIChat transactions={transactions} />
    </div>
  );
}

export default App;