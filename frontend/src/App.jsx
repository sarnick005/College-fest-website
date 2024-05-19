import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/utils/AuthContext"; // Adjust the path accordingly
import Login from "./components/Auth/Login";
import HomePage from "./pages/HomePage";
import AdminDetails from "./components/Admin/AdminDetails";
import Events from "./components/Posts/Events/Events";
import Members from "./components/Posts/Members/Members";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<AdminDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
