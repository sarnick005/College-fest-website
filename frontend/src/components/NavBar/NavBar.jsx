import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Panel = () => {
  const [activeId, setActiveId] = useState(3); // Set activeId to 1 initially
  const navigate = useNavigate();

  const onClick = (id) => {
    setActiveId(id === activeId ? null : id);
  };

  const handleEventsButton = async () => {
    navigate("/events");
  };

  const handleMembersButton = async () => {
    navigate("/members");
  };

  const handleMemoriesButton = async () => {
    // Add the logic for handling the "Memories" button
  };

  const handleStudentGalleryButton = async () => {
    navigate("/student-gallery");
  };

  return (
    <div className="navbar-container">
      <div
        className={`panel ${activeId === 1 ? "active" : ""}`}
        onClick={() => onClick(1)}
        style={{
          backgroundImage: 'url("https://th.wallhaven.cc/small/72/72yzje.jpg")',
        }}
      >
        <button className="centered-button" onClick={handleEventsButton}>
          Events
        </button>
      </div>
      <div
        className={`panel ${activeId === 2 ? "active" : ""}`}
        onClick={() => onClick(2)}
        style={{
          backgroundImage: 'url("https://th.wallhaven.cc/small/72/72yzje.jpg")',
        }}
      >
        <button className="centered-button" onClick={handleMembersButton}>
          Members
        </button>
      </div>
      <div
        className={`panel ${activeId === 3 ? "active" : ""}`}
        onClick={() => onClick(3)}
        style={{
          backgroundImage: 'url("https://th.wallhaven.cc/small/72/72yzje.jpg")',
        }}
      >
        <button className="centered-button" onClick={handleMemoriesButton}>
          Memories
        </button>
      </div>
      <div
        className={`panel ${activeId === 4 ? "active" : ""}`}
        onClick={() => onClick(4)}
        style={{
          backgroundImage: 'url("https://th.wallhaven.cc/small/72/72yzje.jpg")',
        }}
      >
        <button
          className="centered-button"
          onClick={handleStudentGalleryButton}
        >
          Gallery
        </button>
      </div>
    </div>
  );
};

export default Panel;
