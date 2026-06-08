import { useState } from "react";

function EmployeeLogin({ goDashboard }) {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const employees = [
    {
      employeeId: "EMP001",
      name: "Bank Employee",
      password: "Employee@123",
      role: "Verifier",
    },
    {
      employeeId: "EMP002",
      name: "Bank Manager",
      password: "Manager@123",
      role: "Manager",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const employee = employees.find(
      (emp) => emp.employeeId === employeeId && emp.password === password
    );

    if (employee) {
      localStorage.setItem("employeeLoggedIn", "true");
      localStorage.setItem("employeeName", employee.name);
      localStorage.setItem("employeeRole", employee.role);
      goDashboard();
    } else {
      setError("Invalid employee ID or password.");
    }
  };

  return (
    <div>
      <h2>Employee Login</h2>
      <p>No employee registration is available. Employees are pre-created by the bank.</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Employee Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login as Employee</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

    </div>
  );
}

export default EmployeeLogin;