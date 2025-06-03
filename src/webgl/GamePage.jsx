import { useParams } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { getPublicUrl } from '../utils/getPublicUrl';

function GamePage() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [unityConfig, setUnityConfig] = useState({
        loaderUrl: "",
        dataUrl: "",
        frameworkUrl: "",
        codeUrl: "",
    });

    const { unityProvider, isLoaded } = useUnityContext(unityConfig);

    useEffect(() => {
        const fetchGame = async () => {
            if (!gameId) {
                console.error("gameId is undefined");
                return;
            }

            const { data, error } = await supabase
                .from("games")
                .select("*")
                .eq("id", gameId)
                .single();

            if (error || !data) {
                console.error("Gagal ambil data game:", error?.message || "Game tidak ditemukan");
                return;
            }

            setGame(data);

            const basePath = `${data.id}/Build`;

            const newConfig = {
                loaderUrl: getPublicUrl(`${basePath}/${data.loader_file}`),
                dataUrl: getPublicUrl(`${basePath}/${data.data_file}`),
                frameworkUrl: getPublicUrl(`${basePath}/${data.framework_file}`),
                codeUrl: getPublicUrl(`${basePath}/${data.code_file}`),
            };

            console.log("Unity config generated:", newConfig); // debug
            console.log("✅ Final Unity file URLs:");
            console.log("Loader:", newConfig.loaderUrl);
            console.log("Framework:", newConfig.frameworkUrl);
            console.log("Data:", newConfig.dataUrl);
            console.log("Code:", newConfig.codeUrl);

            setUnityConfig(newConfig);
        };

        fetchGame();
    }, [gameId]);

    if (!game) return <p style={{ padding: "2rem" }}>Game tidak ditemukan atau sedang dimuat...</p>;

    return (
        <div>
            <h1>{game.title}</h1>
            {!isLoaded && <p>Memuat Unity game...</p>}
            <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
        </div>
    );
}

export default GamePage;
