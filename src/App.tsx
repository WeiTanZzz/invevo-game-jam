import { useState } from "react"
import { TelescopeMiniGame } from "./TelescopeMiniGame"
import { useAudio } from "./audio/AudioProvider.tsx"
import { DragAndDropProvider } from "./drag-and-drop-provider.tsx"
import { GameStateProvider } from "./game-state"
import { Inventory } from "./inventory/inventory.tsx"
import { Map } from "./map/map.tsx"

function App() {
    const audioManager = useAudio()
    const [inTelescopeMiniGame, setInTelescopeMiniGame] = useState(false)

    return (
        <GameStateProvider>
            <DragAndDropProvider>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                        if (!inTelescopeMiniGame) {
                            audioManager.setBGM("/audio/bg/sailing.mp3")
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
                        <Map />
                        <Inventory id="chest-one" width={1} height={4} colour="bg-blue-300" />
                        <Inventory id="player-inventory" width={2} height={4} colour="bg-orange-300" />
                        <Inventory id="chest-two" width={2} height={2} colour="bg-blue-300" />
                    </>
                )}
            </DragAndDropProvider>
        </GameStateProvider>
    )
}

export default App
