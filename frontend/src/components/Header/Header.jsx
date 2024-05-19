import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import logo from "../../../public/logo/logo.png";
import "./Header.css";

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
    <div className="header-container">
      <img src={logo} alt="Logo" className="logo" /> {/* Add this line */}
      {isLoggedIn ? (
        <div className="loggedin-state">
          <div>
            <button className="btn" onClick={handleLogoutButton}>
              Logout
            </button>
          </div>
          <div>
            <button className="btn" onClick={handleProfileButton}>
              Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="loggedout-state">
          <button className="btn" onClick={handleLoginButton}>
            Admin Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
