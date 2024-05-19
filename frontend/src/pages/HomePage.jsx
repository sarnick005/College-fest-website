import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Poster from "../components/HomePagePoster/Poster";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import Timer from "../components/Timer/Timer";
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
      <div id="page2" data-scroll data-scroll-speed="-1">
        <div className="page2_heading">SHADES OF ENTHUZEA' 24</div>
        <div className="poster_section">
          <Poster />
        </div>
      </div>
      <Header isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  );
};

export default HomePage;
