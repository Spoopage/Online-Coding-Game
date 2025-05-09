import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function GamePage() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "build/webgl/Build.loader.js",
        dataUrl: "build/webgl/Build.data.unityweb",
        frameworkUrl: "build/webgl/Build.framework.js.unityweb",
        codeUrl: "build/webgl/Build.wasm.unityweb",
    });

    return (
        <div style={{ width: "100vw", height: "100vh", backgroundColor: "#fff" }}>
            <h1 style={{ textAlign: "center", marginTop: "1rem" }}>This is game page</h1>

            <div
                style={{
                    width: 1280,
                    height: 720,
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#000", // optional, biar kontras
                }}
            >
                <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
            </div>
        </div>
    );
}
export default GamePage;