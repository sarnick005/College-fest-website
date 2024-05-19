import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/utils/AuthContext"; 
import Login from "./components/Auth/Login";
import HomePage from "./pages/HomePage";
import AdminDetails from "./components/Admin/AdminDetails";
// import Events from "./components/Posts/Events/Events";
import Members from "./components/Posts/Members/Members";
import EventsPage from "./pages/EventsPage/EventsPage";
import StudentGallery from "./components/StudentGallery/StudentGallery"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<AdminDetails />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/members" element={<Members />} />
          <Route path="/student-gallery" element={<StudentGallery />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
