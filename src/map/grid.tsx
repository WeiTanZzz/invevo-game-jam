import { useMemo } from "react"
import { useGameState } from "../game-state"
import { cn } from "../util"
import { Coordinate, GRID_HEIGHT, GRID_WIDTH, hiddenCells, triggerCells } from "./cells"

export const Grid = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            {new Array(GRID_HEIGHT).fill(1).map((_, y) => (
                <div className="flex flex-row flex-1 grow w-full">
                    {new Array(GRID_WIDTH).fill(1).map((_, x) => {
                        const xCord = x + 1
                        const yCord = y + 1
                        const idx = xCord * yCord
                        return <Cell key={idx} x={xCord} y={yCord} />
                    })}
                </div>
            ))}
        </div>
    )
}

const Cell = ({ x, y }: Coordinate) => {
    const { grid, gamesCompleted, currentDay } = useGameState()

    const isCellHidden = hiddenCells.some(cell => cell.x === x && cell.y === y)

    const isCurrentCell = grid.x === x && grid.y === y
    const xDist = grid.x - x
    const yDist = grid.y - y
    const canMoveToCell = !isCellHidden && !isCurrentCell && Math.abs(xDist) <= 1 && Math.abs(yDist) <= 1

    const onClickCell = () => {
        if (!canMoveToCell) return
        if (xDist < 0) grid.move("right")
        if (xDist > 0) grid.move("left")
        if (yDist < 0) grid.move("down")
        if (yDist > 0) grid.move("up")
    }

    const isNextGame = useMemo(() => {
        const trigger = triggerCells.find(cell => cell.x === x && cell.y === y && !gamesCompleted.get.some(game => game === cell.name))
        const nextGame = currentDay.minigames[gamesCompleted.get.length]
        return nextGame !== undefined && (nextGame === trigger?.name || (trigger?.name === "Check the island" && nextGame === "Telescope Mini Game"))
    }, [currentDay, gamesCompleted, x, y])

    return (
        <div
            onClick={onClickCell}
            className={cn(
                "w-1/12 grow aspect-square items-center justify-center shadow-cell-base",
                isCurrentCell && "shadow-cell-current",
                isNextGame && "shadow-cell-trigger",
                canMoveToCell ? "hover:shadow-cell-available" : !isCurrentCell && "hover:shadow-cell-unavailable",
                isCellHidden && "shadow-none hover:shadow-none",
                isCurrentCell && grid.lastMove === "up" && "-rotate-90",
                isCurrentCell && grid.lastMove === "right" && "rotate-0",
                isCurrentCell && grid.lastMove === "down" && "rotate-90",
                isCurrentCell && grid.lastMove === "left" && "scale-x-[-1]"
            )}
        >
            {isCurrentCell && <img src="./bandana.png" />}
        </div>
    )
}
