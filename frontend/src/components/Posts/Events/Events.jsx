import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaPlayer from "../../utils/MediaPlayer";
import "./Events.css";
import NavBar from "../../NavBar/NavBar";
import { useAuth } from "../../utils/AuthContext";
import GoToHome from "../../Home/GoToHome";
import Loader from "../../Loader/Loader";

const Events = ({ year }) => {
  const [posterDetails, setPosterDetails] = useState([]);
  const { isLoggedIn } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosterDetails = async () => {
      try {
        const response = await axios.get("/api/v1/posts/");
        if (response.data.success && response.data.data.allPosts) {
          const posters = response.data.data.allPosts.filter(
            (post) =>
              (post.category === "freshers" ||
                post.category === "student performance" ||
                post.category === "band performance") &&
              post.year === year
          );
          setPosterDetails(posters);
        } else {
          setError("Data format is incorrect or no data received");
        }
      } catch (error) {
        setError("Failed to fetch poster details");
      } finally {
        
  
      }
    };

    fetchPosterDetails();
  }, [year]);

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


  const groupedPosters = posterDetails.reduce((acc, post) => {
    const day = post.day;
    const category = post.category;
    if (!acc[day]) {
      acc[day] = {};
    }
    if (!acc[day][category]) {
      acc[day][category] = [];
    }
    acc[day][category].push(post);
    return acc;
  }, {});

  const categoryOrder = ["freshers", "student performance", "band performance"];

  return (
    <div className="posters-container">
      <GoToHome />
      <h1 className="year">Events of {year}</h1>
      {Object.keys(groupedPosters).map((day) => (
        <div key={day}>
          <h2 className="day">Day {day}</h2>
          {categoryOrder.map(
            (category) =>
              groupedPosters[day][category] && (
                <div key={category}>
                  <h3>Category: {category}</h3>
                  <div className="posters">
                    {groupedPosters[day][category].map((post) => (
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
                            <button
                              onClick={() => handleDeletePoster(post._id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default Events;
