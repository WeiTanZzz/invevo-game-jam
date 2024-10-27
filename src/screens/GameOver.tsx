import { useGameState } from "../game-state"

export const GameOver = () => {
    const { gamePlayingState, reset } = useGameState()
    const resetGame = () => {
        reset()
        gamePlayingState.set("Start game")
    }

    return (
        <div className="flex flex-col items-center justify-center h-full bg-red-500 text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-lg mb-6">The sails have fallen! Better luck next time, First Mate!</p>
            <button
                onClick={resetGame}
                className="px-6 py-2 bg-yellow-700 text-white font-bold rounded-lg border-4 border-yellow-900 hover:bg-yellow-800 hover:border-yellow-700 shadow-lg"
            >
                Play Again
            </button>
        </div>
    )
}

export default GameOver
