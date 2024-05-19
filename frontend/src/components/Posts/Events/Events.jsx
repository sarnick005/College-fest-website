import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaPlayer from "../../utils/MediaPlayer";
import "./Events.css";
import NavBar from "../../NavBar/NavBar";

const Events = () => {
  const [posterDetails, setPosterDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosterDetails = async () => {
      try {
        const response = await axios.get("/api/v1/posts/");
        if (response.data.success && response.data.data.allPosts) {
          const posters = response.data.data.allPosts.filter(
            (post) =>
              post.category === "freshers" ||
              post.category === "students performance"
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

    if (posterDetails.length === 0) {
      fetchPosterDetails();
    }
  }, [posterDetails]);

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
            {/* <p>
              <strong>ID:</strong> {post._id}
            </p>
            <p>
              <strong>Admin ID:</strong> {post.adminId}
            </p> */}
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
            </div>
            {/* <p>
              <strong>Description:</strong> {post.description}
            </p>
            <p>
              <strong>Category:</strong> {post.category}
            </p>
            <p>
              <strong>Year:</strong> {post.year}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(post.updatedAt).toLocaleString()}
            </p> */}
          </div>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default Events;
