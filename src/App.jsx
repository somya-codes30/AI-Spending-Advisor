import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BalanceCard from "./components/BalanceCard";
import TransactionList from "./components/TransactionList";
import AddExpense from "./components/AddExpense";
import AIInsights from "./components/AIInsights";
import AIChat from "./components/AIChat";
import SavingsGoal from "./components/SavingsGoal";

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
    <>
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
      <AIChat transactions={transactions} />
      <SavingsGoal balance={balance} />
    </>
  );
}

export default App;