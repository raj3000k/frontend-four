import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileScreen from "../components/ProfileScreen";
import CommentsDashboard from "../components/CommentsDashboard";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CommentsDashboard />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
