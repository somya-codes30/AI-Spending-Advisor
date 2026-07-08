import { useState } from "react";

function AddExpense({ addTransaction }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleAddExpense = () => {
    // Prevent empty inputs
    if (name === "" || amount === "") {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
  name: name,
  amount: Number(amount),
  category: category,
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
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option>Food</option>
  <option>Travel</option>
  <option>Shopping</option>
  <option>Entertainment</option>
  <option>Bills</option>
  <option>Others</option>
</select>
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