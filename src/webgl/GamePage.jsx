import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function GamePage() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "build/myunityapp.loader.js",
        dataUrl: "build/myunityapp.data",
        frameworkUrl: "build/myunityapp.framework.js",
        codeUrl: "build/myunityapp.wasm",
    });
    
    return (
        <>
            <div>
                <h1>This is game page </h1>
            </div>
            <div>
                <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
            </div>
        </>
    );
}

export default GamePage;