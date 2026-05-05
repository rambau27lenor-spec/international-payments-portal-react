import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    id: "",
    account: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // RegEx validation
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const accountRegex = /^[0-9]{8,20}$/;

    if (!nameRegex.test(form.name)) {
      setError("Invalid name");
      return;
    }

    if (!emailRegex.test(form.email)) {
      setError("Invalid email");
      return;
    }

    if (!accountRegex.test(form.account)) {
      setError("Invalid account number");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    try {
  await createUserWithEmailAndPassword(
    auth,
    form.email,
    form.password
  );

  setError("");
  alert("Registration successful (Firebase)");

  setForm({
    name: "",
    email: "",
    id: "",
    account: "",
    password: "",
  });

} catch (err) {
  setError(err.message);
}
    setForm({
  name: "",
  email: "",
  id: "",
  account: "",
  password: "",
});
  };

  return (
    <div>
      <h2>Customer Registration</h2>
      <p>Register to access the bank international payments portal.</p>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <br /><br />

        <input name="email" placeholder="Email Address" onChange={handleChange} />
        <br /><br />

        <input name="id" placeholder="ID Number" onChange={handleChange} />
        <br /><br />

        <input name="account" placeholder="Account Number" onChange={handleChange} />
        <br /><br />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <br /><br />

        <button type="submit">Register</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;