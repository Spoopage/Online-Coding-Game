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
import AuthForm from './pages/auth/AuthForm';
import { useSessionAndRole } from './pages/auth/useSessionAndRole';

function App() {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const { session, role } = useSessionAndRole();

  // if (!session) return (
  //   <Router>
  //     {/* <Login /> */}
  //     <Signup />
  //   </Router>
  // );

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
        {/* Supabase Auth Testing */}
        {/* <div>
          <h1>Halo, {session.user.email}</h1>
          <p>Role kamu: {role}</p>

          {role === 'admin' && <button onClick={() => alert("Admin-only feature here!")}>Fitur Admin</button>}

          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>   */}
      <Routes>
        {/* Kalau belum login */}
        {!session && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          </>
        )}

        {/* Kalau sudah login */}
        {session && (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/submit" element={<SubmitGamePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
