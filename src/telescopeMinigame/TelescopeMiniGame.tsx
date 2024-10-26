import { useEffect, useRef, useState } from "react"
import { useAudio } from "../audio/AudioProvider.tsx"
import { TelescopeGrid } from "./telescopeGrid.tsx"

const AUDIO_FIND_ISLAND = "telescope/find-island"

export const TelescopeMiniGame = () => {
    const [checkingMap, setCheckingMap] = useState(false)

    return (
        <div>
            <button onClick={() => setCheckingMap(!checkingMap)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                {checkingMap ? "Check Telescope" : "Check legend"}
            </button>
            {checkingMap ? <UseMap /> : <UseTelescopeMiniGame />}
        </div>
    )
}
const UseMap = () => {
    return (
        //todo make the daily reset get a different island to find
        <div className="flex flex-col items-center justify-center ">
            <img src="./islandTwo.png" alt="map" className="h-1/3 w-1/3" />
        </div>
    )
}

const UseTelescopeMiniGame = () => {
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

        const handlerMouseDown = () => {
            // if (islandDetected) {
            //     audio.playEffect(AUDIO_FIND_ISLAND)
            // }
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mousedown", handlerMouseDown)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mousedown", handlerMouseDown)
        }
    }, [audio])

    return (
        <div className="cursor-none relative w-screen h-screen bg-cover bg-center overflow-hidden">
            <div>
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <TelescopeGrid />
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
