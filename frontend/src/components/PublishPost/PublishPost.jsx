import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import "./PublishPost.css";

const PublishPost = () => {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    year: "",
    day: "",
    contentFile: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "contentFile") {
      const selectedFile = files[0];
      if (selectedFile) {
        if (selectedFile.type.startsWith("image/")) {
          if (selectedFile.size > 10 * 1024 * 1024) {
            alert("Image file size should be less than 10MB");
            e.target.value = null;
            return;
          }
        } else if (selectedFile.type.startsWith("video/")) {
          if (selectedFile.size > 100 * 1024 * 1024) {
            alert("Video file size should be less than 100MB");
            e.target.value = null;
            return;
          }
        }
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: selectedFile,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("description", formData.description);
      postData.append("category", formData.category);
      postData.append("year", formData.year);
      postData.append("day", formData.day);
      postData.append("content", formData.contentFile);

      const response = await axios.post("/api/v1/posts", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Post created successfully:", response.data);
      setIsSubmitted(true);
      setTimeout(() => navigate("/profile"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Post created successfully!</h2>
        <p>Redirecting to profile...</p>
      </div>
    );
  }

  return (
    <div className="publish-post-container">
      <h2>Publish Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="student performance">Student Performance</option>
            <option value="freshers">Freshers</option>
            <option value="sponsor">Sponsor</option>
            <option value="band performance">Band Performance</option>
            <option value="member">Member</option>
            <option value="poster">Poster</option>
            <option value="student gallery">Student Gallery</option>
          </select>
        </div>
        <div>
          <label>Year:</label>
          <input
            required
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Day:</label>
          <select
            required
            name="day"
            value={formData.day}
            onChange={handleChange}
          >
            <option value="">Select Day</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div>
          <label>Content (Image/Video):</label>
          <input
            required
            type="file"
            name="contentFile"
            accept="image/*, video/*"
            onChange={handleChange}
          />
        </div>
        <div className="buttons-container">
          <button type="submit">Publish Post</button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishPost;
