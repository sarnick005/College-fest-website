import React, { useState } from "react";
import Events from "../components/Posts/Events/Events";

const EventsPage = () => {
  const [selectedYear, setSelectedYear] = useState(""); 

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      {selectedYear ? (
        <div>
          <label>Select Year: </label>
          <select value={selectedYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <Events year={selectedYear} />
        </div>
      ) : (
        <div>
          <label>Select Year: </label>
          <select value={selectedYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
