import { useState, useEffect } from "react"
import { useGameState } from "../../game-state"

export const RaiseSailClicker = () => {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const { activeSpeechBubble, completeGame } = useGameState()
    activeSpeechBubble.set("Ahoy! Click that button and raise the sail. The faster ye click, the sooner we’ll be off... and there be things in the dark that follow close, hungry for those who linger too long...")

    const handleClick = () => {
        setProgress(prev => Math.min(prev + 1, 50))

        if (progress + 1 >= 50) {
            setIsComplete(true)
            activeSpeechBubble.set("Sail’s up! About time, matey! Now let’s catch the wind and see where the dark seas take us...")
            completeGame()
        }
    }

    useEffect(() => {
        if (isComplete) return

        const decayInterval = setInterval(() => {
            setProgress(prev => Math.max(prev - 0.004, 0))
        }, 100)

        return () => clearInterval(decayInterval)
    }, [isComplete])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
            <div className="relative w-48 h-64 bg-gray-800 rounded-lg overflow-hidden">
                <img
                    src="./spooky_captain.png"
                    alt="Sail"
                    className="absolute bottom-0 w-full h-full transition-transform bg-white duration-300"
                    style={{
                        transform: `translateY(${100 - (progress / 50) * 100}%)`
                    }}
                />
            </div>

            <div className="mt-4 text-lg font-bold">{isComplete ? "Sail Raised!" : `Progress: ${Math.round((progress / 50) * 100)}%`}</div>

            <button
                onClick={handleClick}
                className="mt-4 px-6 py-2 bg-yellow-700 text-white font-bold rounded-lg border-4 border-yellow-900
             hover:bg-yellow-800 hover:border-yellow-700 shadow-lg transform hover:scale-105 transition-all
             relative before:absolute before:-inset-1 before:bg-black before:opacity-25 before:rounded-lg"
            >
                Click to Hoist the Sail, ye scurvy dog!
            </button>
        </div>
    )
}
