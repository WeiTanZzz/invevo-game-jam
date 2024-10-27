import { DragAndDropProvider } from "./drag-and-drop-provider.tsx"
import { useGameState } from "./game-state"
import { Inventory } from "./inventory/inventory.tsx"
import { Map } from "./map/map.tsx"
import { GAMES } from "./mini-games/games.tsx"
import { Overlay } from "./overlay/overlay.tsx"
import { Speech } from "./overlay/speech.tsx"
import Timer from "./overlay/timer.tsx"
import { DaySummary } from "./screens/DaySummary.tsx"
import GameOver from "./screens/GameOver.tsx"
import StartGame from "./screens/StartGame.tsx"

function App() {
    const { activeMiniGame, gamePlayingState } = useGameState()

    return (
        <div className="w-full h-full">
            {gamePlayingState.get === "Game over" && <GameOver />}
            {gamePlayingState.get === "Start game" && (
                <span>
                    <Overlay>
                        <Speech />
                    </Overlay>
                    <StartGame />
                </span>
            )}
            {/* {gamePlayingState.get === "Win" && <GameOver />} */}
            {gamePlayingState.get === "Playing" && (
                <DragAndDropProvider>
                    <Overlay>
                        <Speech />
                        <span className="ml-2">
                            <Timer />
                        </span>
                    </Overlay>
                    {activeMiniGame.get !== undefined ? (
                        <div className="bg-blue-800">{GAMES.find(g => activeMiniGame.get === g.name)?.component}</div>
                    ) : (
                        <>
                            <Map />
                            <Pos />
                        </>
                    )}
                </DragAndDropProvider>
            )}
            {gamePlayingState.get === "Day over" && (
                <>
                    <Overlay>
                        <Speech />
                        <span className="ml-2">
                            <Timer />
                        </span>
                    </Overlay>
                    <DaySummary />
                </>
            )}
        </div>
    )
}

export default App

const Pos = () => {
    const { grid } = useGameState()
    return (
        <span>
            {grid.x}, {grid.y}
        </span>
    )
}
