import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleEventsButton = async () => {
    navigate("/events");
  };

  const handleMembersButton = async () => {
    navigate("/members");
  };
  const handleStudentGalleryButton = async () => {
    navigate("/student-gallery");
  };

  return (
    <div>
      <p>Navbar</p>
      <button onClick={handleEventsButton}>Events</button>
      <button onClick={handleMembersButton}>Members/faculty</button>
      <button>Memories</button>
      <button onClick={handleStudentGalleryButton}>Student Gallery</button>
    </div>
  );
};

export default NavBar;
