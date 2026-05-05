import { useState } from "react";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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

    setError("");
    alert("International payment submitted for employee verification");
  };

  return (
    <div>
      <h2>International Payment Request</h2>
      <p>Submit a payment for bank employee verification before SWIFT processing.</p>

      <form onSubmit={handleSubmit}>
        <input name="customerName" placeholder="Customer Full Name" onChange={handleChange} />
        <br /><br />

        <input name="sourceAccount" placeholder="Your Bank Account Number" onChange={handleChange} />
        <br /><br />

        <input name="destinationAccount" placeholder="Payee Account / IBAN" onChange={handleChange} />
        <br /><br />

        <input name="swiftCode" placeholder="SWIFT Code e.g. FIRNZAJJ" onChange={handleChange} />
        <br /><br />

        <select name="currency" onChange={handleChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ZAR">ZAR</option>
        </select>
        <br /><br />

        <input name="amount" placeholder="Amount" onChange={handleChange} />
        <br /><br />

        <textarea name="reason" placeholder="Payment Reason" onChange={handleChange}></textarea>
        <br /><br />

        <button type="submit">Submit Payment</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Payment;