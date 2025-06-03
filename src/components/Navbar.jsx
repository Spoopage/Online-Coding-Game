import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-title">
        <Link to="/" className="nav-link">O C G</Link>
      </div>
      <div className="nav-buttons">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/submit" className="nav-link">Submit</Link>
      </div>
    </nav>
  );
}

export default Navbar;
