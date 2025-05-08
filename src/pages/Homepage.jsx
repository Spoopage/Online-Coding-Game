import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="homepage-container">
      <div className="game-scroll-section">
        <button className="scroll-btn" onClick={scrollLeft}>←</button>
        <div className="game-carousel" ref={scrollRef}>
          {[1, 2, 3].map((_, i) => (
            <div className="game-card" key={i}>
              <h3>Game {i + 1}</h3>
              <Link to="/game">
                <div className="game-thumbnail">
                  <p>Unity Game Preview</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button className="scroll-btn" onClick={scrollRight}>→</button>
      </div>
    </div>
  );
}

export default Homepage;
