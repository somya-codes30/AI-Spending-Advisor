import "../styles/TransactionList.css";
function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="transactions">
      <h2>Recent Transactions</h2>
      {transactions.map((item, index) => (
        <div className="transaction" key={index}>
          <span>{item.name}</span>
          <span>
            {item.type === "expense" ? "-" : "+"} ₹{item.amount}
          </span>
          <button 
            onClick={() => deleteTransaction(index)} 
            style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;