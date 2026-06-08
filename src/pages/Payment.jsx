import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Payment() {
  const [form, setForm] = useState({
    customerName: "",
    sourceAccount: "",
    destinationAccount: "",
    swiftCode: "",
    currency: "USD",
    amount: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    const accountRegex = /^[0-9]{8,20}$/;
    const swiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    const amountRegex = /^[1-9][0-9]*(\.[0-9]{1,2})?$/;

    if (!nameRegex.test(form.customerName)) {
      setError("Invalid customer name");
      return;
    }

    if (!accountRegex.test(form.sourceAccount)) {
      setError("Invalid source account number");
      return;
    }

    if (!accountRegex.test(form.destinationAccount)) {
      setError("Invalid destination account number");
      return;
    }

    if (!swiftRegex.test(form.swiftCode)) {
      setError("Invalid SWIFT code");
      return;
    }

    if (!amountRegex.test(form.amount)) {
      setError("Invalid payment amount");
      return;
    }

    try {
      await addDoc(collection(db, "transactions"), {
        customerName: form.customerName,
        sourceAccount: form.sourceAccount,
        destinationAccount: form.destinationAccount,
        swiftCode: form.swiftCode.toUpperCase(),
        currency: form.currency,
        amount: form.amount,
        reason: form.reason,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      setError("");
      setSuccess("International payment submitted for employee verification.");

      setForm({
        customerName: "",
        sourceAccount: "",
        destinationAccount: "",
        swiftCode: "",
        currency: "USD",
        amount: "",
        reason: "",
      });
    } catch (err) {
      console.error(err);
      setError("Payment could not be submitted. Please try again."+ err.message);
    }
  };

  return (
    <div>
      <h2>International Payment Request</h2>
      <p>Submit a payment for bank employee verification before SWIFT processing.</p>

      <form onSubmit={handleSubmit}>
        <input
          name="customerName"
          placeholder="Customer Full Name"
          value={form.customerName}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="sourceAccount"
          placeholder="Your Bank Account Number"
          value={form.sourceAccount}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="destinationAccount"
          placeholder="Payee Account / IBAN"
          value={form.destinationAccount}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="swiftCode"
          placeholder="SWIFT Code e.g. FIRNZAJJ"
          value={form.swiftCode}
          onChange={handleChange}
        />
        <br /><br />

        <select name="currency" value={form.currency} onChange={handleChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ZAR">ZAR</option>
        </select>
        <br /><br />

        <input
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="reason"
          placeholder="Payment Reason"
          value={form.reason}
          onChange={handleChange}
        ></textarea>
        <br /><br />

        <button type="submit">Pay Now</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Payment;
