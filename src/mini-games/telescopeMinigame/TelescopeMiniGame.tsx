import { useEffect, useRef, useState } from "react"
import { useAudio } from "../../audio/AudioProvider.tsx"
import { useGameState } from "../../game-state.tsx"
import { TelescopeGrid } from "./telescopeGrid.tsx"

export const AUDIO_FIND_ISLAND = "telescope/find-island"

export const TelescopeMiniGame = () => {
    const { minigames, activeSpeechBubble } = useGameState()
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const audio = useAudio()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        activeSpeechBubble.set(`Use your telescope to find ${minigames.telescope.islandToFind.name}, use the legend for assistance.`)

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
            <div className="cursor-none pointer-events-none relative w-11/12 bg-cover bg-center overflow-hidden">
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
