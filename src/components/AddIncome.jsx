import { useState } from "react";

function AddIncome({ addTransaction }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddIncome = () => {
    if (name === "" || amount === "") {
      alert("Please fill all fields");
      return;
    }

    const newIncome = {
      name: name,
      amount: Number(amount),
      type: "income",
    };

    addTransaction(newIncome);

    setName("");
    setAmount("");
  };

  return (
    <div className="expense-form">
      <h2>Add New Income</h2>

      <input
        type="text"
        placeholder="Income Source"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleAddIncome}>
        Add Income
      </button>
    </div>
  );
}

export default AddIncome;