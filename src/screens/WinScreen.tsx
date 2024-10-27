import { useGameState } from "../game-state"

const WinScreen = () => {
    const { gamePlayingState } = useGameState()

    const resetGame = () => {
        gamePlayingState.set("Playing")
    }

    return (
        <div className="flex flex-col items-center justify-center h-full bg-green-500 text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Congratulations, Mateyy!</h1>
            <p className="text-lg mb-6">You've successfully navigated the ship on your adventure!</p>
            <button
                onClick={resetGame}
                className="px-6 py-2 bg-yellow-700 text-white font-bold rounded-lg border-4 border-yellow-900 hover:bg-yellow-800 hover:border-yellow-700 shadow-lg"
            >
                Play Again
            </button>
        </div>
    )
}

export default WinScreen
