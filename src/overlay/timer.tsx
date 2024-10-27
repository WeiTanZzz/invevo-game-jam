import { useState, useEffect } from "react"
import { useGameState } from "../game-state"

export const Timer = () => {
    const { currentDay } = useGameState()
    const [timeLeft, setTimeLeft] = useState(currentDay.timer)

    useEffect(() => {
        if (timeLeft <= 0) {
            //todo you have failed the game, show game over screen and button to reset the game
            return
        }

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => Math.max(prevTime - 1, 0))
        }, 1000)

        return () => clearInterval(timerId)
    }, [timeLeft])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="relative w-64 h-32 bg-brown-800 rounded-lg border-4 border-yellow-600 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-yellow-900 opacity-75 flex items-center justify-center rounded-lg">
                <div className="text-3xl font-mono text-white">Time Left:</div>
                {timeLeft > 30 ? (
                    <div className="text-3xl font-mono text-white">{formatTime(timeLeft)}</div>
                ) : (
                    <div className="text-3xl font-mono text-red-500">{formatTime(timeLeft)}</div>
                )}
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-600"></div>
            <div className="absolute top-0 right-0 w-full h-1 bg-yellow-600"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-600"></div>
            <div className="absolute bottom-0 right-0 w-full h-1 bg-yellow-600"></div>
        </div>
    )
}

export default Timer
