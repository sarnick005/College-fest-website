import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Poster from "../components/HomePagePoster/Poster";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import Timer from "../components/Timer/Timer";
import Panel from "../components/NavBar/NavBar";
import "./HomePage.css";

const checkLoginStatus = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const loggedIn = false;
      resolve(loggedIn);
    }, 1000);
  });
};

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const selectedDateTime = new Date("2024-05-24T10:00:00").getTime(); //yyyy-mm-dd T HH-MM-SS  24-hour format (12:00:00 PM or noon).

  useEffect(() => {
    const verifyLoginStatus = async () => {
      const loggedIn = await checkLoginStatus();
      setIsLoggedIn(loggedIn);
    };

    verifyLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div id="main-container">
      <div id="page1">
        <div className="heading">SWAMI VIVEKANANDA INSTITUTE OF TECHNOLOGY</div>
        <div className="text">PRESENTS</div>
        <div className="event_name">ENTHUZEA' 24</div>
      </div>
      <div className="timer">
        <Timer selectedDateTime={selectedDateTime} />
      </div>
      <div id="page2">
        <div className="page2_heading">SHADES OF ENTHUZEA' 24</div>
        <div className="poster_section">
          <Poster />
        </div>
      </div>
      <div id="page3">
        <div className="page3_heading">EXPLORE YOUR INTERESTS</div>
        <Panel />
      </div>
      <div id="page4">
        <h3>
          YOU MIGHT BE
          <br /> THINKING WHAT IS
        </h3>
        <h1>
          ENTHUZEA' 24 <p>?</p>{" "}
        </h1>
        <p>
          The moon cast a silver glow over the quiet town as the night wrapped
          its arms around the world. In the distance, the faint sound of
          crickets chirping echoed through the air, adding to the peaceful
          ambiance. Shadows danced playfully along the walls of the old
          buildings, creating an enchanting scene. Underneath the starry sky,
          two lovers strolled hand in hand, lost in their own world of whispered
          secrets and shared dreams. It was a moment frozen in time, a fleeting
          glimpse of pure serenity amidst the chaos of life
        </p>
      </div>
      <Header isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  );
};

export default HomePage;
