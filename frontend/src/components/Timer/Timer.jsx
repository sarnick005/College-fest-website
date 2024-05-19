import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = ({ selectedDateTime }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = Date.now();
      const difference = selectedDateTime - currentDateTime;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown("Date must be after today");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDateTime]);

  
  const handleAnimation = () => {
    const secondsElement = document.querySelector(".seconds");
    if (secondsElement) {
      secondsElement.classList.add("animate");
      setTimeout(() => {
        secondsElement.classList.remove("animate");
      }, 500); 
    }
  };

  useEffect(() => {
    handleAnimation(); 
  }, [countdown.seconds]); 

  return (
    <div className="timer-container">
      {typeof countdown === "object" && (
        <div className="countdown">
          <span className="timer-element">{countdown.days}d</span>
          <span className="timer-element">{countdown.hours}h</span>
          <span className="timer-element">{countdown.minutes}m</span>
          <span className="timer-element seconds">{countdown.seconds}s</span>
        </div>
      )}
      {typeof countdown === "string" && (
        <div className="countdown">{countdown}</div>
      )}
    </div>
  );
};

export default Timer;
