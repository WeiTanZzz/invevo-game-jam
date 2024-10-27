const WinScreen = () => {
    const resetGame = () => {
        window.location.reload()
    }

    return (
        <div className="h-screen bg-green-500 flex items-center justify-center  flex-co text-white p-8 flex-col">
            <h1 className="text-4xl font-bold mb-4 mt-20">Congratulations, Mateyy!</h1>
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
