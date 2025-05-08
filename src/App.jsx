import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GamePage from "./webgl/GamePage";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SubmitGamePage from "./pages/SubmitGamePage";
import Navbar from "./components/Navbar";

function App() {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (profile.length > 0) {
      setDataFetched(true);
    }
  }, [profile]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/submit" element={<SubmitGamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
