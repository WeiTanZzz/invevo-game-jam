import { useGameState } from "../game-state"

export const DaySummary = () => {
    const { nextDay } = useGameState()

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
            <div>Day Summary</div>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700" onClick={nextDay}>
                Next Day
            </button>
        </div>
    )
}
