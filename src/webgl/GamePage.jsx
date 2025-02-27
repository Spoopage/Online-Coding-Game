import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function GamePage() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "build/webgl/tester_game.loader.js",
        dataUrl: "build/webgl/tester_game.data.unityweb",
        frameworkUrl: "build/webgl/tester_game.framework.js.unityweb",
        codeUrl: "build/webgl/tester_game.wasm.unityweb",
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