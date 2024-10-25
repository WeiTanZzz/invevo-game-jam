import { useState } from "react"
import { TelescopeMiniGame } from "./TelescopeMiniGame"
import { useAudio } from "./audio/AudioProvider.tsx"
import { GameStateProvider } from "./game-state"
import { Grid } from "./map/grid"

function App() {
    const audioManager = useAudio()
    const [inTelescopeMiniGame, setInTelescopeMiniGame] = useState(false)

    return (
        <GameStateProvider>
            <>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                        if (!inTelescopeMiniGame) {
                            audioManager.setBGM("/audio/bg/007.mp3")
                        } else {
                            audioManager.toggleBackgroundPlayPause()
                        }

                        setInTelescopeMiniGame(!inTelescopeMiniGame)
                    }}
                >
                    {inTelescopeMiniGame ? "exit telescop mini game" : "enter Telescope Mini Game "}
                </button>
                {inTelescopeMiniGame ? (
                    <TelescopeMiniGame />
                ) : (
                    <>
                        <Grid />
                    </>
                )}
            </>
        </GameStateProvider>
    )
}

export default App
