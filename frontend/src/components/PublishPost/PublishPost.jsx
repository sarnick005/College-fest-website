import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

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
const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.name === "contentFile") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
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
      navigate("/profile");
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };

  return (
    <div>
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
        {/* Dropdown for day field */}
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
        {/* Input field for file upload */}
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
        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
};

export default PublishPost;
