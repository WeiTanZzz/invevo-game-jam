import { useEffect, useRef, useState } from "react"
import { useAudio } from "../../audio/AudioProvider.tsx"
import { useGameState } from "../../game-state.tsx"
import { IslandState } from "../../types/islands-state.ts"
import { TelescopeGrid } from "./telescopeGrid.tsx"

export const AUDIO_FIND_ISLAND = "telescope/find-island"

export const TelescopeMiniGame = () => {
    const [checkingMap, setCheckingMap] = useState(false)
    const { currentDay } = useGameState()

    return (
        <div>
            <button onClick={() => setCheckingMap(!checkingMap)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                {checkingMap ? "Check Telescope" : "Check legend"}
            </button>
            {checkingMap ? <TelescopeMap islandToFind={currentDay.islandToFind} /> : <TelescopeMiniGameContent />}
        </div>
    )
}

const TelescopeMap = ({ islandToFind }: { islandToFind: IslandState }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-[#f4e4c1] text-[#4a2c0a] font-serif rounded-lg shadow-lg border-2 border-[#d2b48c] relative overflow-hidden">
            <p className="text-lg">Ahoy! This be {islandToFind.name}</p>
            <img src={islandToFind.path} alt="map" className="h-1/3 w-1/3" />
        </div>
    )
}

const TelescopeMiniGameContent = () => {
    const { currentDay, activeSpeechBubble } = useGameState()
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const audio = useAudio()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        activeSpeechBubble.set(`Use your telescope to find ${currentDay.islandToFind.name}, use the legend for assistance.`)

        audio.addEffect(AUDIO_FIND_ISLAND, "/audio/effect/find-island.mp3")
        audio.setBGM("/audio/bgm/sailing.mp3")

        const handleMouseMove = (event: MouseEvent) => {
            setPosition({
                x: event.clientX,
                y: event.clientY
            })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            audio.toggleBackgroundPlayPause()
        }
    }, [])

    return (
        <div>
            <div className="cursor-none pointer-events-none relative w-screen h-screen bg-cover bg-center overflow-hidden">
                <TelescopeGrid />
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <div
                    style={{
                        maskImage: `radial-gradient(circle at ${position.x}px ${position.y}px, transparent 50px, black 75px)`
                    }}
                />
            </div>
        </div>
    )
}
