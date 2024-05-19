import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaPlayer from "../utils/MediaPlayer";
import "./Poster.css";
import NavBar from "../NavBar/NavBar";
import { useAuth } from "../utils/AuthContext";

const Poster = () => {
  const [posterDetails, setPosterDetails] = useState([]);
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosterDetails = async () => {
      try {
        const response = await axios.get("/api/v1/posts/");
        if (response.data.success && response.data.data.allPosts) {
          const posters = response.data.data.allPosts.filter(
            (post) => post.category === "poster"
          );
          setPosterDetails(posters);
        } else {
          setError("Data format is incorrect or no data received");
        }
      } catch (error) {
        setError("Failed to fetch poster details");
      } finally {
        setLoading(false);
      }
    };

    fetchPosterDetails();
  }, []);

  const handleDeletePoster = async (posterId) => {
    try {
      await axios.delete(`/api/v1/posts/delete/${posterId}`);
      setPosterDetails((prevPosters) =>
        prevPosters.filter((poster) => poster._id !== posterId)
      );
    } catch (error) {
      console.error("Error deleting poster:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="posters-container">
      <h1>Posters</h1>
      <div className="posters">
        {posterDetails.map((post) => (
          <div key={post._id} className="poster-item">
            <div className="content">
              {post.contentType === "image" ? (
                <img
                  className="poster-img"
                  src={post.content}
                  alt="Post content"
                />
              ) : (
                <MediaPlayer
                  content={post.content}
                  description={post.description}
                />
              )}
              <br />
              <span>{post.title}</span>
              {isLoggedIn && (
                <button onClick={() => handleDeletePoster(post._id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div> <br /><br /><br />
      <NavBar />
    </div>
  );
};

export default Poster;
