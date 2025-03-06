import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import GamePage from "./webgl/GamePage";
import UserTable from "./pages/UserTable"; // Import komponen tabel

function App() {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setProfile(data);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (profile.length > 0) {
      setDataFetched(true);
      console.log("Updated profile:", profile);
    }
  }, [profile]);

  return (
    <>
      <UserTable profile={profile} isLoading={isLoading} dataFetched={dataFetched} />
      <br />
      <div className="App">
        <GamePage />
      </div>
    </>
  );
}

export default App;
