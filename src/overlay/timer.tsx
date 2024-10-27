import { useEffect } from "react"
import { useGameState } from "../game-state"

export const Timer = () => {
    const { gamePlayingState, timeLeft, currentDay, gamesCompleted } = useGameState()

    const numberOfTasksRemaning = currentDay.minigames.length - gamesCompleted.get.length

    useEffect(() => {
        if (timeLeft.get <= 0) {
            gamePlayingState.set("Game over")
            return
        }

        const timerId = setInterval(() => {
            timeLeft.set(Math.max(timeLeft.get - 1, 0))
        }, 1000)

        return () => clearInterval(timerId)
    })

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="relative w-64 h-36 bg-brown-800 rounded-lg border-4 border-yellow-600 shadow-lg p-4">
            <div className="absolute inset-0 bg-yellow-900 opacity-75 flex flex-col justify-center items-center rounded-lg p-4">
                <h2 className="text-2xl font-bold text-yellow-200">Day: {currentDay.day}</h2>
                <h2 className="text-2xl font-bold text-yellow-200">Tasks Left: {numberOfTasksRemaning}</h2>
                <div className="text-2xl font-mono text-white">Time Left:</div>
                <div className={`text-2xl font-mono ${timeLeft.get > 30 ? "text-white" : "text-red-500"}`}>{formatTime(timeLeft.get)}</div>
            </div>

            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-600 rounded-t-lg"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-600 rounded-b-lg"></div>
            <div className="absolute left-0 top-0 h-full w-1 bg-yellow-600 rounded-l-lg"></div>
            <div className="absolute right-0 top-0 h-full w-1 bg-yellow-600 rounded-r-lg"></div>
        </div>
    )
}

export default Timer
