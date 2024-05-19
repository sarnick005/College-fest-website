import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
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

  const handleProfileButton = () => {
    navigate("/profile");
  };
  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            <button onClick={handleLogoutButton}>Logout</button> <br /><br />
            <button onClick={handleProfileButton}>Profile</button>
          </div>
        ) : (
          <button onClick={handleLoginButton}>Admin Login</button>
        )}
      </nav>
    </div>
  );
};

export default Header;
