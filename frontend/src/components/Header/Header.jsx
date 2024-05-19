import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import Timer from "../Timer/Timer";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const selectedDateTime = new Date("2024-05-24T10:00:00").getTime(); //yyyy-mm-dd T HH-MM-SS  24-hour format (12:00:00 PM or noon).
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
        <p>Header</p>
        {isLoggedIn ? (
          <div>
            <button onClick={handleLogoutButton}>Logout</button> <br />
            <br />
            <button onClick={handleProfileButton}>Profile</button>
          </div>
        ) : (
          <button onClick={handleLoginButton}>Admin Login</button>
        )}
      </nav>
      <Timer selectedDateTime={selectedDateTime} />
    </div>
  );
};

export default Header;
