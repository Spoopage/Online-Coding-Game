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
import { supabase } from './supabaseClient';

function App() {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  // // Local DB
  // useEffect(() => {
  //   fetch("http://localhost:5000/user")
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setProfile(data);
  //     })
  //     .catch((err) => console.error("Fetch error:", err))
  //     .finally(() => setIsLoading(false));
  // }, []);

  useEffect(() => {
    if (profile.length > 0) {
      setDataFetched(true);
    }
  }, [profile]);

  // Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('games').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Data:', data);
      }
    };

    fetchData();
  }, []);

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
