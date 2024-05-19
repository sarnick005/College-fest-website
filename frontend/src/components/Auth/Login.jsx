import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/admin/login", {
        adminName,
        email,
        password,
      });
      if (response.data.success) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Login</h1>
      {" "}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          {" "}
          
          <input
            type="text"
            name="adminName"
            placeholder="Admin Name"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>
        <div className="form-group">
          {" "}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          {" "}
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          {" "}

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
