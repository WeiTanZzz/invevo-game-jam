import React, { useState } from "react"
import { useAudio } from "./audio/AudioProvider.tsx"
import { DragAndDropProvider } from "./drag-and-drop-provider.tsx"
import { useGameState } from "./game-state"
import { Inventory } from "./inventory/inventory.tsx"
import { Map } from "./map/map.tsx"
import { GAMES } from "./mini-games/games.tsx"
import { Overlay } from "./overlay/overlay.tsx"
import { Speech } from "./overlay/speech.tsx"

type GameButtonProps = {
    changeGameHandler: () => void
    text: string
}

const GameButton = ({ changeGameHandler, text }: GameButtonProps) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={changeGameHandler}>
            {text}
        </button>
    )
}

function App() {
    const audioManager = useAudio()
    const [playingMiniGame, setPlayingMiniGame] = useState(false)
    const [miniGame, setMiniGame] = useState<React.ReactNode>(GAMES[0].component)
    const { gamesCompleted } = useGameState()

    return (
        <DragAndDropProvider>
            <div>
                {GAMES.map(game => {
                    if (gamesCompleted.get.find(gameCompleted => gameCompleted[game.name])?.completed) {
                        setPlayingMiniGame(false)
                        return null
                    } else {
                        return (
                            <GameButton
                                key={game.name}
                                changeGameHandler={() => {
                                    if (!playingMiniGame) {
                                        audioManager.setBGM(game.bgm)
                                        setMiniGame(game.component)
                                    } else {
                                        audioManager.toggleBackgroundPlayPause()
                                    }

                                    setPlayingMiniGame(!playingMiniGame)
                                }}
                                text={game.name}
                            />
                        )
                    }
                })}
            </div>
            <Overlay>
                <Speech />
            </Overlay>
            {playingMiniGame ? (
                <>{miniGame}</>
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
