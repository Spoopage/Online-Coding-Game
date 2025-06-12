import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { getPublicUrl } from "../utils/getPublicUrl";
import "./Homepage.css";

function Homepage() {
  const scrollRef = useRef();
  const [games, setGames] = useState([]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching games:", error);
      } else {
        setGames(data);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="homepage-container">
      <h2 className="section-title">Latest Games</h2>
      <div className="game-scroll-section">
        <button className="scroll-btn" onClick={scrollLeft} aria-label="Scroll left">
          ←
        </button>
        <div className="game-carousel" ref={scrollRef}>
          {games?.length > 0 &&
            games
              .filter((game) => !!game?.id && !!game?.title)
              .map((game) => {
                const thumbnail = getPublicUrl(`${game.id}/thumbnail.png`);
                return (
                  <div className="game-card" key={game.id}>
                    <Link to={`/game/${game.id}`}>
                      <div className="game-thumbnail">
                        <img
                          src={thumbnail || "/placeholder.png"}
                          alt={game.title}
                          className="thumbnail-image"
                          onError={(e) => {
                            e.target.src = "/placeholder.png";
                          }}
                        />
                      </div>
                    </Link>
                    <h3>{game.title}</h3>
                    <p>{game.author}</p>
                  </div>
                );
              })}
        </div>
        <button className="scroll-btn" onClick={scrollRight} aria-label="Scroll right">
          →
        </button>
      </div>
    </div>
  );
}

export default Homepage;