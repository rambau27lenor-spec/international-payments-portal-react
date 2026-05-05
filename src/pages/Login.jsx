import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await signInWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    setError("");
    alert("Login successful (Firebase)");

  } catch (err) {
    setError("Invalid email or password");
  }
};

  return (
    <div>
      <h2>Customer Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <br /><br />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;