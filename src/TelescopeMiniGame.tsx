import { useState, useEffect } from "react"

export const TelescopeMiniGame = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: { clientX: any; clientY: any }) => {
            setPosition({
                x: event.clientX,
                y: event.clientY
            })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div className="cursor-none relative w-screen h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url("./beach.png")' }}>
            <div
                className="absolute inset-0 bg-black"
                style={{
                    maskImage: `radial-gradient(circle at ${position.x}px ${position.y}px, transparent 100px, black 150px)`
                }}
            />
        </div>
    )
}
