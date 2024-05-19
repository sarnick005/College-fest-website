import React, { useState, useEffect } from "react";
import Events from "../../components/Posts/Events/Events";
import "./EventsPage.css"; // Import the CSS file
import Loader from "../../components/Loader/Loader";

const EventsPage = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="select-container">
      <label className="select-label">Select Year:</label>
      <select
        className="select-dropdown"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="">Select Year</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>

      {loading && <Loader />}

      {selectedYear && !loading && <Events year={selectedYear} />}
    </div>
  );
};

export default EventsPage;
