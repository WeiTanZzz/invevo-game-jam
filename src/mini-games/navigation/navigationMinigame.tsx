import { useGameState } from "../../game-state"
import { cn } from "../../util"

export const NavigationMinigame = () => {
    const { minigames, activeSpeechBubble } = useGameState()
    const grid = minigames.navigation.grid
    activeSpeechBubble.set(`Ye be the navigator now, matey! Plot a course to ${minigames.navigation.islandToFind.name} and we’ll set sail. But beware, the seas be treacherous and the winds be fickle...`)
    return (
        <div className="flex grow bg-contain h-full w-full bg-no-repeat bg-center items-center justify-center bg-blue-200 overflow-hidden">
            <div className="w-full h-full py-[11%] ps-[10%] pe-[22%]">
                <div className="flex flex-1 flex-col items-center justify-center">
                    {new Array(grid[0].length).fill(1).map((_, y) => (
                        <div className="flex flex-row flex-1 grow w-full">
                            {new Array(grid.length).fill(1).map((_, x) => {
                                return (
                                    <div className={cn("w-1/12 grow aspect-square items-center justify-center shadow-cell-base")}>
                                        <img src={grid[x][y].type === "goal" ? minigames.navigation.islandToFind.path : grid[x][y].path} />
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
