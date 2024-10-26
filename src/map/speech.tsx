import { useGameState } from "../game-state";

export const Speech = () => {
    const { islandToFind } = useGameState()
    

    return (
        <div className="text-left absolute w-full h-full mt-32 ml-10 flex items-start">
            <div className="mr-4 text-center">
                <img src="./captain.png" className="w-50 h-20" alt="Captain" />
                <span className="text-lg font-serif italic text-blue-900 mt-2 block">
                    Captain Ghost Beard
                </span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 border-2 border-gray-300 relative">
                <p className="text-xl font-medium text-gray-800">
                    "Listen up, crew! Today, we're setting sail for {islandToFind.name}. It's going to be a rough journey, but the treasure awaits those who dare!"
                </p>
                {/* Speech Bubble Tail */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-300"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white"></div>
            </div>
        </div>
    );
}
