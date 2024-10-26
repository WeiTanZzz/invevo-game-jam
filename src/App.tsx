import React, { useState } from "react"
import { TelescopeMiniGame } from "./TelescopeMiniGame"
import { useAudio } from "./audio/AudioProvider.tsx"
import { DragAndDropProvider } from "./drag-and-drop-provider.tsx"
import { GameStateProvider } from "./game-state"
import { Inventory } from "./inventory/inventory.tsx"
import { Map } from "./map/map.tsx"
import SingToCrewsMiniGame from "./sing-to-crews/sing-to-crews-mini-game.tsx"

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

    return (
        <GameStateProvider>
            <DragAndDropProvider>
                <div>
                    {GAMES.map(game => (
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
                    ))}
                </div>
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
        </GameStateProvider>
    )
}

export default App
