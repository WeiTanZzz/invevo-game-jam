import { useEffect, useRef, useState } from "react"
import { useAudio } from "../../audio/AudioProvider.tsx"
import { useGameState } from "../../game-state.tsx"
import { GamesCompletedState } from "../../types/games-completed-state.ts"
import { IslandState } from "../../types/islands-state.ts"
import { TelescopeGrid } from "./telescopeGrid.tsx"

const AUDIO_FIND_ISLAND = "telescope/find-island"

export const TelescopeMiniGame = () => {
    const [checkingMap, setCheckingMap] = useState(false)
    const { islandToFind, gamesCompleted } = useGameState()

    return (
        <div>
            <button onClick={() => setCheckingMap(!checkingMap)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                {checkingMap ? "Check Telescope" : "Check legend"}
            </button>
            {checkingMap ? <UseMap islandToFind={islandToFind} /> : <UseTelescopeMiniGame gamesCompleted={gamesCompleted} islandToFind={islandToFind} />}
        </div>
    )
}
const UseMap = ({ islandToFind }: { islandToFind: IslandState }) => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <img src={islandToFind.path} alt="map" className="h-1/3 w-1/3" />
        </div>
    )
}

const UseTelescopeMiniGame = ({
    islandToFind,
    gamesCompleted
}: {
    islandToFind: IslandState
    gamesCompleted: {
        get: GamesCompletedState[]
        set: (items: GamesCompletedState[]) => void
    }
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const audio = useAudio()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        audio.addEffect(AUDIO_FIND_ISLAND, "/audio/effect/find-island.mp3")

        const handleMouseMove = (event: MouseEvent) => {
            setPosition({
                x: event.clientX,
                y: event.clientY
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mousedown", function (event) {
            const targetElement = event.target || event.srcElement
            if (targetElement instanceof Element) {
                if (targetElement.tagName === "IMG") {
                    const src = (targetElement as HTMLImageElement).alt
                    if (src === islandToFind.path) {
                        audio.playEffect(AUDIO_FIND_ISLAND)
                        const currentFinishedGames = gamesCompleted.get
                        console.log("currentFinishedGames", currentFinishedGames)
                        gamesCompleted.set([...currentFinishedGames, { "Telescope Mini Game": { completed: true } }])
                    } else {
                        //todo add some effect for wrong answer
                    }
                }
            }
        })

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div>
            <div className="cursor-none pointer-events-none relative w-screen h-screen bg-cover bg-center overflow-hidden">
                <TelescopeGrid />
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <div
                    className="absolute inset-0 bg-black"
                    style={{
                        maskImage: `radial-gradient(circle at ${position.x}px ${position.y}px, transparent 50px, black 75px)`
                    }}
                />
            </div>
        </div>
    )
}
