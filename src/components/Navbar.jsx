import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { supabase } from "../supabaseClient";
import { useSessionAndRole } from "../pages/auth/useSessionAndRole";

function Navbar() {
  const { session } = useSessionAndRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-title">
        <Link to="/" className="nav-link">O C G</Link>
      </div>
      <div className="nav-buttons">
        <Link to="/submit" className="nav-link">Submit</Link>
        {!session ? (
          <Link to="/login" className="nav-link">Login</Link>
        ) : (
          <button onClick={handleLogout} className="nav-link logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;