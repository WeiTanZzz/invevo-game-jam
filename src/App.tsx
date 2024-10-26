import React, { useState } from "react"
import { useAudio } from "./audio/AudioProvider.tsx"
import { DragAndDropProvider } from "./drag-and-drop-provider.tsx"
import { GameStateProvider, useGameState } from "./game-state"
import { Inventory } from "./inventory/inventory.tsx"
import { Map } from "./map/map.tsx"
import { Overlay } from "./overlay/overlay.tsx"
import { Speech } from "./overlay/speech.tsx"
import SingToCrewsMiniGame from "./sing-to-crews/sing-to-crews-mini-game.tsx"
import { TelescopeMiniGame } from "./telescopeMinigame/TelescopeMiniGame.tsx"

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

const GAMES: {
    name: string
    component: React.ReactNode
    bgm: string
}[] = [
    {
        name: "Telescope Mini Game",
        component: <TelescopeMiniGame />,
        bgm: "/audio/bgm/sailing.mp3"
    },
    {
        name: "Sing to Crews",
        component: <SingToCrewsMiniGame />,
        bgm: "/audio/bgm/board.mp3"
    }
]

function App() {
    const audioManager = useAudio()
    const [playingMiniGame, setPlayingMiniGame] = useState(false)
    const [miniGame, setMiniGame] = useState<React.ReactNode>(<TelescopeMiniGame />)
    const { gamesCompleted } = useGameState()

    return (
        <DragAndDropProvider>
            <div>
                {GAMES.map(game =>
                    gamesCompleted.get.find(gameCompleted => gameCompleted.name === game.name)?.completed ? null : (
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
                )}
            </div>
            <Overlay>
                <Speech />
            </Overlay>
            {playingMiniGame ? (
                <>{miniGame}</>
            ) : (
                <>
                    <Map />
                    <Inventory id="chest-one" width={1} height={4} colour="bg-blue-300" />
                    <Inventory id="player-inventory" width={2} height={4} colour="bg-orange-300" />
                    <Inventory id="chest-two" width={2} height={2} colour="bg-blue-300" />
                </>
            )}
        </DragAndDropProvider>
    )
}

export default App
