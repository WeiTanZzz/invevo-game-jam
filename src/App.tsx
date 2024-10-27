import { DragAndDropProvider } from "./drag-and-drop-provider.tsx"
import { useGameState } from "./game-state"
import { Inventory } from "./inventory/inventory.tsx"
import { Map } from "./map/map.tsx"
import { GAMES } from "./mini-games/games.tsx"
import { Overlay } from "./overlay/overlay.tsx"
import { Speech } from "./overlay/speech.tsx"
import Timer from "./overlay/timer.tsx"
import GameOver from "./screens/GameOver.tsx"
import StartGame from "./screens/StartGame.tsx"

function App() {
    const { activeMiniGame, gamePlayingState } = useGameState()

    // need to create a different scene for each gameplayingstate
    return (
        <div>
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
                            <Inventory id="chest-one" width={1} height={4} colour="bg-blue-300" />
                            <Inventory id="player-inventory" width={2} height={4} colour="bg-orange-300" />
                            <Inventory id="chest-two" width={2} height={2} colour="bg-blue-300" />
                        </>
                    )}
                </DragAndDropProvider>
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
