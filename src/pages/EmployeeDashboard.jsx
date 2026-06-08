import { useState } from "react";

function EmployeeDashboard() {
  const employeeName = localStorage.getItem("employeeName");
  const employeeRole = localStorage.getItem("employeeRole");

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      customerName: "John Smith",
      accountNumber: "1234567890",
      amount: "2500.00",
      currency: "USD",
      provider: "SWIFT",
      swiftCode: "ABSAZAJJ",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Mary Johnson",
      accountNumber: "9876543210",
      amount: "1800.00",
      currency: "EUR",
      provider: "SWIFT",
      swiftCode: "FIRNZAJJ",
      status: "Pending",
    },
  ]);

  const verifyTransaction = (id) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, status: "Verified" }
        : transaction
    );

    setTransactions(updatedTransactions);
  };

  const submitToSwift = (id) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, status: "Submitted to SWIFT" }
        : transaction
    );

    setTransactions(updatedTransactions);
  };

  return (
    <div>
      <h2>Employee International Payments Portal</h2>

      <p>
        Logged in as: <strong>{employeeName}</strong> ({employeeRole})
      </p>

      <p>
        Employees verify the customer's payee account number and SWIFT code
        before submitting the transaction to SWIFT.
      </p>

      <table border="1" cellPadding="10" style={{ margin: "20px auto" }}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Provider</th>
            <th>SWIFT Code</th>
            <th>Status</th>
            <th>Verify</th>
            <th>Submit to SWIFT</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.customerName}</td>
              <td>{transaction.accountNumber}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.provider}</td>
              <td>{transaction.swiftCode}</td>
              <td>{transaction.status}</td>

              <td>
                <button
                  onClick={() => verifyTransaction(transaction.id)}
                  disabled={transaction.status !== "Pending"}
                >
                  Verify
                </button>
              </td>

              <td>
                <button
                  onClick={() => submitToSwift(transaction.id)}
                  disabled={transaction.status !== "Verified"}
                >
                  Submit to SWIFT
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Workflow Evidence</h4>
      <p>Pending → Verified → Submitted to SWIFT</p>
    </div>
  );
}

export default EmployeeDashboard;