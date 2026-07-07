import { useState } from "react";

function AddExpense({ addTransaction }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = () => {
    // Prevent empty inputs
    if (name === "" || amount === "") {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      name: name,
      amount: Number(amount),
      type: "expense",
    };

    addTransaction(newExpense);

    // Clear inputs
    setName("");
    setAmount("");
  };

  return (
    <div className="expense-form">
      <h2>Add New Expense</h2>

      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleAddExpense}>
        Add Expense
      </button>
    </div>
  );
}

export default AddExpense;