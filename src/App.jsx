import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Payment from "./pages/Payment";

function App() {
  const [page, setPage] = useState("register");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>International Payments Portal</h1>

      <button onClick={() => setPage("register")}>Register</button>
      <button onClick={() => setPage("login")}>Login</button>
      <button onClick={() => setPage("payment")}>Payment</button>

      {page === "register" && <Register />}
      {page === "login" && <Login />}
      {page === "payment" && <Payment />}
    </div>
  );
}

export default App;

