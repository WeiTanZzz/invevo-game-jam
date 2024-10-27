import { useState, useEffect } from "react"
import { useGameState } from "../../game-state"

export const CannonballReload = () => {
    const { activeSpeechBubble, completeGame } = useGameState()

    const [charging, setCharging] = useState(false)
    const [reloadLevel, setreloadLevel] = useState(0)
    const [enemyHealth, setEnemyHealth] = useState(100)
    const MAX_reload = 100
    const SUCCESS_THRESHOLD = 50

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
        setreloadLevel(0)
        activeSpeechBubble.set("Reload the cannon, ye scurvy laddeh, and be quick about it! We’ve got fightin’ to do!")
    }

    const handleMouseUp = () => {
        setCharging(false)
        if (reloadLevel < SUCCESS_THRESHOLD) {
            activeSpeechBubble.set("Ye missed, ye bilge rat! That shot was weaker than a landlubber’s handshake!")
            return
        }

        const damage = Math.round(reloadLevel / 2 + Math.random() * 10)
        setEnemyHealth(prevHealth => Math.max(prevHealth - damage, 0))

        activeSpeechBubble.set(`Hit! Aye, ye dealt ${damage} damage! That’ll teach 'em to cross paths with a true buccaneer!`)

        if (enemyHealth <= damage) {
            activeSpeechBubble.set("Ye’ve sent the enemy ship to the depths! Down to Davy Jones' locker with 'em!")
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
                <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                    {charging ? "Fillin wi' grapeshot" : "Hold to reload, ye scallywag!"}
                </button>
                <div className="mt-4 w-64 bg-gray-300 rounded-lg overflow-hidden border border-black">
                    <div className="bg-red-500 h-6 transition-all duration-200 ease-linear" style={{ width: `${enemyHealth}%` }}></div>
                </div>
                <p className="text-lg mt-2">Enemy Ship Status: {enemyHealth > 75 ? 'Barely Scratched' : enemyHealth > 50 ? 'Leakin’ Like a Sieve' : enemyHealth > 25 ? 'Burnin’ and Battered' : 'On Death’s Door'}!</p>            </div>
        </div>
    )
}
