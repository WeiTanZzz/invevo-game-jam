import { useGameState } from "../game-state"

export const StartGame = () => {
    const { gamePlayingState } = useGameState()

    const startGame = () => {
        gamePlayingState.set("Playing")
    }

    return (
        <div className="h-screen bg-blue-200 flex items-center justify-center  flex-co text-white p-8 ">
            <button
                onClick={startGame}
                className="mt-20 px-6 py-2 bg-yellow-700 text-white font-bold rounded-lg border-4 border-yellow-900 hover:bg-yellow-800 hover:border-yellow-700 shadow-lg"
            >
                Start Game
            </button>
        </div>
    )
}

export default StartGame
