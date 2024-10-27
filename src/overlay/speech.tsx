import { useGameState } from "../game-state"

export const Speech = () => {
    const { activeSpeechBubble } = useGameState()

    return (
        <div className="flex flex-row">
            <div className="mr-4 flex flex-col items-center text-center">
                <img src="./spooky_captain.png" className="w-28 h-28" alt="Captain" />
                <span className=" text-lg font-serif italic text-orange-600 mt-2 block">Captain Ghost Beard</span>
            </div>
            <div className="flex h-fit bg-[#f4e4c1] p-4 text-[#4a2c0a] font-serif rounded-lg shadow-lg border-2 border-[#d2b48c] relative overflow-hidden">
                <p className="text-xl text-wrap font-medium text-gray-800">{activeSpeechBubble.get}</p>
            </div>
        </div>
    )
}
