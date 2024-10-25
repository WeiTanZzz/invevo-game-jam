import { useState, useEffect } from "react"

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
        <div className="flex flex-col items-center justify-center ">
            <img src="./island To Find.png" alt="map" className="h-1/3 w-1/3" />
        </div>
    )
}

const UseTelescopeMiniGame = () => {
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
                    maskImage: `radial-gradient(circle at ${position.x}px ${position.y}px, transparent 50px, black 75px)`
                }}
            />
        </div>
    )
}
