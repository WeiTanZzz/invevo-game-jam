import { DragAndDropProvider } from "./drag-and-drop-provider.tsx"
import { useGameState } from "./game-state"
import { Map } from "./map/map.tsx"
import { GAMES } from "./mini-games/games.tsx"
import { Overlay } from "./overlay/overlay.tsx"
import { Speech } from "./overlay/speech.tsx"
import Timer from "./overlay/timer.tsx"
import GameOver from "./screens/GameOver.tsx"
import StartGame from "./screens/StartGame.tsx"
import WinScreen from "./screens/WinScreen.tsx"

function App() {
    const { activeMiniGame, gamePlayingState } = useGameState()

    return (
        <div className="w-full h-full">
            {gamePlayingState.get === "Game over" && (
                <span>
                    <Overlay>
                        <Speech />
                    </Overlay>
                    <GameOver />
                </span>
            )}
            {gamePlayingState.get === "Start game" && (
                <span>
                    <Overlay>
                        <Speech />
                    </Overlay>
                    <StartGame />
                </span>
            )}
            {gamePlayingState.get === "Win" && (
                <span>
                    <Overlay>
                        <Speech />
                    </Overlay>
                    <WinScreen />
                </span>
            )}
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
                        </>
                    )}
                </DragAndDropProvider>
            )}
        </div>
    )
}

export default App
