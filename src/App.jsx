import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  const [page, setPage] = useState("register");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>International Payments Portal</h1>

      <button onClick={() => setPage("register")}>Register</button>
      <button onClick={() => setPage("login")}>Login</button>
      <button onClick={() => setPage("payment")}>Payment</button>
      <button onClick={() => setPage("employeeLogin")}>Employee Login</button>

      {page === "register" && <Register />}
      {page === "login" && <Login />}
      {page === "payment" && <Payment />}
      {page === "employeeLogin" && (
        <EmployeeLogin goDashboard={() => setPage("employeeDashboard")} />
      )}
      {page === "employeeDashboard" && <EmployeeDashboard />}
    </div>
  );
}

export default App;

