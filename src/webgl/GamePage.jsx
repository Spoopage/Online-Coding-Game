import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { supabase } from "../supabaseClient";

function GamePlayer({ game }) {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: `https://xqdoichemmpgqcdfixqn.supabase.co/storage/v1/object/public/games/${game.base_path}/${game.loader_file}`,
    dataUrl: `https://xqdoichemmpgqcdfixqn.supabase.co/storage/v1/object/public/games/${game.base_path}/${game.data_file}`,
    frameworkUrl: `https://xqdoichemmpgqcdfixqn.supabase.co/storage/v1/object/public/games/${game.base_path}/${game.framework_file}`,
    codeUrl: `https://xqdoichemmpgqcdfixqn.supabase.co/storage/v1/object/public/games/${game.base_path}/${game.code_file}`,
  });

  return (
    <div>
      <h2>{game.title}</h2>
      {!isLoaded && (
        <p style={{ padding: "1rem" }}>
          Loading Unity... {Math.round(loadingProgression * 100)}%
        </p>
      )}
      <Unity unityProvider={unityProvider} style={{ width: "100%", height: "600px" }} />
    </div>
  );
}

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
        console.error("Failed to fetch game:", error);
      } else {
        setGame(data);
      }
    };

    if (gameId) fetchGame();
  }, [gameId]);

  if (!game) return <p style={{ padding: "2rem" }}>Loading game data...</p>;

  return <GamePlayer game={game} />;
}

export default GamePage;
