import { useGameState } from "../game-state"

export const Speech = () => {
    const { activeSpeechBubble } = useGameState()

    return (
        <>
            <div className="mr-4 text-center">
                <img src="./captain.png" className="w-50 h-20" alt="Captain" />
                <span className="text-lg font-serif italic text-blue-900 mt-2 block">Captain Ghost Beard</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 border-2 border-gray-300 relative">
                <p className="text-xl font-medium text-gray-800">{activeSpeechBubble.get}</p>
            </div>
        </>
    )
}
