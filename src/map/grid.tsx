import { useLayoutEffect } from "react"
import { useGameState } from "../game-state"
import { cn } from "../util"

export const GRID_WIDTH = 31
export const GRID_HEIGHT = 11

export const Grid = () => {
    const { grid } = useGameState()

    const onKeyPress = (e: KeyboardEvent) => {
        if (e.key === "a") grid.move("left")
        if (e.key === "d") grid.move("right")
        if (e.key === "w") grid.move("up")
        if (e.key === "s") grid.move("down")
    }

    useLayoutEffect(() => {
        window.addEventListener("keydown", onKeyPress)
        return () => window.removeEventListener("keydown", onKeyPress)
    }, [])

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

const Cell = ({ x, y }: { x: number; y: number }) => {
    const { grid } = useGameState()

    const isCurrentCell = grid.x.get === x && grid.y.get === y
    const xDist = grid.x.get - x
    const yDist = grid.y.get - y
    const canMoveToCell = !isCurrentCell && Math.abs(xDist) <= 1 && Math.abs(yDist) <= 1

    const onClickCell = () => {
        if (!canMoveToCell) return
        if (xDist < 0) grid.move("right")
        if (xDist > 0) grid.move("left")
        if (yDist < 0) grid.move("down")
        if (yDist > 0) grid.move("up")
    }

    return (
        <div
            onClick={onClickCell}
            className={cn(
                "w-1/12 grow aspect-square items-center justify-center border",
                isCurrentCell && "border-yellow-500",
                canMoveToCell ? "hover:border-green-500" : !isCurrentCell && "hover:border-red-500",
                isCurrentCell && grid.lastMove === "right" && "rotate-90",
                isCurrentCell && grid.lastMove === "down" && "rotate-180",
                isCurrentCell && grid.lastMove === "left" && "-rotate-90"
            )}
        >
            {isCurrentCell && <span>🚀</span>}
        </div>
    )
}
