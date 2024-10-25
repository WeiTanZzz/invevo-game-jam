import { useState } from "react"
import { TelescopeMiniGame } from "./TelescopeMiniGame"
import BackgroundMusic from "./audio/BackgroundMusic.tsx"
import { GameStateProvider } from "./game-state"
import { Grid } from "./map/grid"

function App() {
    const [inTelescopeMiniGame, setInTelescopeMiniGame] = useState(false)
    return (
        <GameStateProvider>
            <>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => setInTelescopeMiniGame(!inTelescopeMiniGame)}
                >
                    {inTelescopeMiniGame ? "exit telescop mini game" : "enter Telescope Mini Game "}
                </button>
                {inTelescopeMiniGame ? (
                    <TelescopeMiniGame />
                ) : (
                    <>
                        <BackgroundMusic />
                        <Grid />
                    </>
                )}
            </>
        </GameStateProvider>
    )
}

export default App
