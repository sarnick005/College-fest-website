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
    <div className="form-body">
      <div className="form-container">
        <h1>Admin Login</h1>
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="adminName">Admin Name</label>
            <input
              type="text"
              name="adminName"
              id="adminName"
              placeholder="Admin Name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
