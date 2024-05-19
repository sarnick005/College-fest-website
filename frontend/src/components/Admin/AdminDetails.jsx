import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from "../Auth/Logout";
import PublishPost from "../PublishPost/PublishPost";
import { useAuth } from "../utils/AuthContext"; // Adjust the path accordingly

const AdminDetails = () => {
  const { setIsLoggedIn } = useAuth();
  const [adminDetails, setAdminDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get("/api/v1/admin/current-admin");
        if (response.data.success) {
          setAdminDetails(response.data.data);
          setIsLoggedIn(true); // Update login state
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to fetch admin details", error);
        setIsLoggedIn(false);
      }
    };

    fetchAdminDetails();
  }, [setIsLoggedIn]);

  const handleNavigateHome = () => {
    navigate("/");
  };

  if (!adminDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Details</h1>
      <p>
        <strong>ID:</strong> {adminDetails._id}
      </p>
      <p>
        <strong>Name:</strong> {adminDetails.adminName}
      </p>
      <p>
        <strong>Email:</strong> {adminDetails.email}
      </p>
      <p>
        <strong>Profile Picture:</strong>{" "}
        {adminDetails.profilePicture && (
          <img
            src={adminDetails.profilePicture}
            alt="Profile"
            style={{ maxWidth: "200px" }}
          />
        )}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(adminDetails.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(adminDetails.updatedAt).toLocaleString()}{" "}
      </p>
      <Logout />
      <h1>Publish a post</h1>
      <PublishPost />
      <button onClick={handleNavigateHome}>Go to Home Page</button>{" "}
    </div>
  );
};

export default AdminDetails;
