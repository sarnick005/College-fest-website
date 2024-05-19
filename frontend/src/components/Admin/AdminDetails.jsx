import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from "../Auth/Logout";
import PublishPost from "../PublishPost/PublishPost";
import { useAuth } from "../utils/AuthContext"; // Adjust the path accordingly
import GoToHome from "../Home/GoToHome";

const AdminDetails = () => {
  const { setIsLoggedIn } = useAuth();
  const [adminDetails, setAdminDetails] = useState(null);
  const [isPublishPostClicked, setIsPublishPostClicked] = useState(false); // State to track if Publish Post button is clicked
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

  const handlePublishPostClick = () => {
    setIsPublishPostClicked(true);
  };

  const handleCancelClick = () => {
    setIsPublishPostClicked(false); // Reset state
  };

  if (!adminDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <GoToHome/>
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
      
      <Logout />
      <h1>Publish a post</h1>
      {!isPublishPostClicked && (
        <button onClick={handlePublishPostClick}>Publish Post</button>
      )}{" "}
      {isPublishPostClicked && (
        <>
          <PublishPost />
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      )}
      
    </div>
  );
};

export default AdminDetails;
