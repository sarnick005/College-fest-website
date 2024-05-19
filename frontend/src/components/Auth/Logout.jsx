import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; // Adjust the path accordingly

const Logout = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

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
      <button onClick={handleLogoutButton}>Logout</button>
    </div>
  );
};

export default Logout;
