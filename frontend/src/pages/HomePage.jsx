import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Poster from "../components/HomePagePoster/Poster";

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

  useEffect(() => {
    const verifyLoginStatus = async () => {
      const loggedIn = await checkLoginStatus();
      setIsLoggedIn(loggedIn);
    };

    verifyLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Poster />
    </div>
  );
};

export default HomePage;
