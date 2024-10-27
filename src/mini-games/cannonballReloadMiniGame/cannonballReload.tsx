import { useState, useEffect } from "react"
import { useGameState } from "../../game-state"

export const CannonballReload = () => {
    const { activeSpeechBubble, completeGame } = useGameState()
    const fireMessage = "Cannon fired! Click and hold to reload the cannon and release to fire at the enemy ship."

    const [charging, setCharging] = useState(false)
    const [reloadLevel, setreloadLevel] = useState(0)
    const [cannonFired, setCannonFired] = useState(false)
    const [enemyHealth, setEnemyHealth] = useState(100)
    const MAX_reload = 100
    const SUCCESS_THRESHOLD = 35

    useEffect(() => {
        let reloadInterval: number | undefined
        let indicatorInterval: number | undefined

        if (charging) {
            reloadInterval = setInterval(() => {
                setreloadLevel(prevLevel => Math.min(prevLevel + 1, MAX_reload))
            }, 100)
        }

        return () => {
            clearInterval(reloadInterval)
            clearInterval(indicatorInterval)
        }
    }, [charging])

    const handleMouseDown = () => {
        setCharging(true)
        setCannonFired(false)
        setreloadLevel(0)
        activeSpeechBubble.set("Reload the cannon quick mi laddeh!")
    }

    const handleMouseUp = () => {
        setCharging(false)
        if (reloadLevel < SUCCESS_THRESHOLD) {
            activeSpeechBubble.set("Missed! The shot was too weak.")
            return
        }

        const damage = Math.round(reloadLevel / 2 + Math.random() * 10)
        setEnemyHealth(prevHealth => Math.max(prevHealth - damage, 0))
        setCannonFired(true)

        activeSpeechBubble.set(`Hit! Dealt ${damage} damage!`)

        if (enemyHealth <= damage) {
            activeSpeechBubble.set("You sunk the enemy ship!")
            completeGame()
        }
    }

    const offset = charging ? Math.max((reloadLevel - 40) / 10, 0) : 0

    return (
        <div className="flex flex-col items-center justify-center h-full bg-blue-200 ">
            <style>
                {`
          @keyframes vibrate {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-${offset}px); }
            40% { transform: translateX(${offset}px); }
            60% { transform: translateX(-${offset}px); }
            80% { transform: translateX(${offset}px); }
          }
        `}
            </style>
            <div className="flex flex-col mt-20 items-center">
                <h1 className="text-2xl font-bold mb-4 ">Reload the Cannon!</h1>
                <div
                    className="relative w-64 h-32 border border-black rounded-lg overflow-hidden"
                    style={{
                        animation: `vibrate 0.1s ease-in-out infinite`
                    }}
                >
                    <div className={`absolute bottom-0 left-0 bg-red-600 h-full z-10`} style={{ width: `${reloadLevel}%`, transition: "width 0.1s" }}></div>
                    <div className="absolute left-1/2  bg-green-600 h-full w-full z-0 "></div>
                </div>
                <button
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseUp}
                    onMouseUp={handleMouseUp}
                    className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                    {charging ? "Charging..." : "Hold to reload"}
                </button>
                {cannonFired && <div className="mt-4 text-lg">{fireMessage}</div>}
                <div className="mt-4">
                    <p className="text-lg">Enemy Ship Health: {enemyHealth}</p>
                </div>
            </div>
        </div>
    )
}
