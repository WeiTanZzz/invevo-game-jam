import { useGameState } from "../../game-state"

export const CheckTheIslandMiniGame = () => {
    const { minigames, completeGame, activeSpeechBubble } = useGameState()

    const handleClick = () => {
        completeGame()
    }
    activeSpeechBubble.set(`Ahoy! This be ${minigames.telescope.islandToFind.name}, Take a good look and remeber it well!`)

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-blue-600 text-[#4a2c0a] font-serif rounded-lg shadow-lg border-2 border-[#d2b48c] relative overflow-hidden">
            <p className="text-lg"></p>
            <img src={minigames.telescope.islandToFind.path} alt="map" className=" w-1/3 mt-20 " />

            <button
                onClick={handleClick}
                className="mt-4 px-6 py-2 bg-yellow-700 text-white font-bold rounded-lg border-4 border-yellow-900
             hover:bg-yellow-800 hover:border-yellow-700 shadow-lg transform hover:scale-105 transition-all
             relative before:absolute before:-inset-1 before:bg-black before:opacity-25 before:rounded-lg"
            >
                Let me know when you're ready to set sail!
            </button>
        </div>
    )
}
