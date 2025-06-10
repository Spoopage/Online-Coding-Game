import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import UnityPlayer from "./UnityPlayer"; // ⬅️ Komponen baru kita buat

function GamePage() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", gameId)
        .single();

      if (error) {
        console.error("❌ Failed to fetch game:", error);
      } else {
        setGame(data);
      }
    };

    if (gameId) fetchGame();
  }, [gameId]);

  if (!game) return <p style={{ padding: "2rem" }}>Loading game...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{game.title}</h2>
      <p>{game.description}</p>

      {game.submit_type === "upload" && (
        <UnityPlayer game={game} />
      )}

      {game.submit_type === "url" && game.external_url && (
        <iframe
          src={game.external_url}
          title={game.title}
          width="100%"
          height="600px"
          frameBorder="0"
          allowFullScreen
        />
      )}

      {game.submit_type === "iframe" && game.iframe_embed && (
        <div
          dangerouslySetInnerHTML={{ __html: game.iframe_embed }}
          style={{ width: "100%", minHeight: "600px" }}
        />
      )}
    </div>
  );
}

export default GamePage;