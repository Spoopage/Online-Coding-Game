import { Unity, useUnityContext } from "react-unity-webgl";

function UnityPlayer({ game }) {
  const base = `https://xqdoichemmpgqcdfixqn.supabase.co/storage/v1/object/public/games/${game.base_path}`;

  const { unityProvider, isLoaded } = useUnityContext({
    loaderUrl: `${base}/${game.loader_file}`,
    dataUrl: `${base}/${game.data_file}`,
    frameworkUrl: `${base}/${game.framework_file}`,
    codeUrl: `${base}/${game.code_file}`,
  });

  return (
    <div>
      {!isLoaded && <p>Loading Unity game...</p>}
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "600px", background: "#000" }}
      />
    </div>
  );
}

export default UnityPlayer;
