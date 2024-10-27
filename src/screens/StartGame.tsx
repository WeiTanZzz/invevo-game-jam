export const StartGame = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-blue-300 text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome, Captain!</h1>
            <p className="text-lg mb-6">Prepare to raise the sails and set sail on a grand adventure!</p>
            <button className="px-6 py-2 bg-yellow-700 text-white font-bold rounded-lg border-4 border-yellow-900 hover:bg-yellow-800 hover:border-yellow-700 shadow-lg">
                Start Game
            </button>
        </div>
    )
}

export default StartGame
