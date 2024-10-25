import { useEffect, useRef, useState } from "react"
import { useAudio } from "./audio/AudioProvider.tsx"

const AUDIO_FIND_ISLAND = "telescope/find-island"

export const TelescopeMiniGame = () => {
    const audio = useAudio()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [islandDetected, setIslandDetected] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        audio.addEffect(AUDIO_FIND_ISLAND, "/audio/effect/shoot.mp3")

        const handlerIslandFound = (event: MouseEvent) => {
            const canvas = canvasRef.current
            if (!canvas) return
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            const radius = 50
            canvas.width = document.body.clientWidth
            canvas.height = document.body.clientHeight
            const x = event.clientX
            const y = event.clientY
            const backgroundImg = new Image()
            backgroundImg.src = "./beach.png"
            backgroundImg.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
                const imageData = ctx.getImageData(x - radius, y - radius, radius * 2, radius * 2).data
                let isLandFound = false
                for (let i = 0; i < imageData.length; i += 4) {
                    const r = imageData[i]
                    const g = imageData[i + 1]
                    const b = imageData[i + 2]
                    if (r > 200 && g > 200 && b < 100) {
                        isLandFound = true
                        break
                    }
                }
                setIslandDetected(isLandFound)
            }
        }

        const handleMouseMove = (event: MouseEvent) => {
            setPosition({
                x: event.clientX,
                y: event.clientY
            })

            handlerIslandFound(event)
        }

        const handlerMouseDown = () => {
            if (islandDetected) {
                audio.playEffect(AUDIO_FIND_ISLAND)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mousedown", handlerMouseDown)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mousedown", handlerMouseDown)
        }
    }, [audio, islandDetected])

    return (
        <div className="cursor-none relative w-screen h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url("./beach.png")' }}>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div
                className="absolute inset-0 bg-black"
                style={{
                    maskImage: `radial-gradient(circle at ${position.x}px ${position.y}px, transparent 50px, black 75px)`
                }}
            />
        </div>
    )
}
