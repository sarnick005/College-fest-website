import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; // Adjust the path accordingly
import axios from "axios";
const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate("/login");
  };

  const handleLogoutButton = async () => {
    try {
      await axios.post("/api/v1/admin/logout");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <button onClick={handleLogoutButton}>Logout</button>
        ) : (
          <button onClick={handleLoginButton}>Admin Login</button>
        )}
      </nav>
    </div>
  );
};

export default Header;
