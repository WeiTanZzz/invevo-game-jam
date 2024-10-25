import { useLayoutEffect } from "react"
import { useGameState } from "../game-state"
import { cn } from "../util"

export const GRID_WIDTH = 10
export const GRID_HEIGHT = 5

export const Grid = () => {
    const { grid } = useGameState()

    const onKeyPress = (e: KeyboardEvent) => {
        if (e.key === "a") grid.x.increment(-1)
        if (e.key === "d") grid.x.increment(1)
        if (e.key === "w") grid.y.increment(-1)
        if (e.key === "s") grid.y.increment(1)
    }

    useLayoutEffect(() => {
        window.addEventListener("keydown", onKeyPress)
        return () => window.removeEventListener("keydown", onKeyPress)
    }, [])

    return (
        <div className="flex flex-col grow items-center justify-center">
            {new Array(GRID_HEIGHT).fill(1).map((_, y) => (
                <div className="flex flex-row">
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
    const xDist = Math.abs(grid.x.get - x)
    const yDist = Math.abs(grid.y.get - y)
    const canMoveToCell = !isCurrentCell && xDist <= 1 && yDist <= 1

    const onClickCell = () => {
        if (!canMoveToCell) return
        grid.x.set(x)
        grid.y.set(y)
    }

    return (
        <div
            onClick={onClickCell}
            className={cn(
                "size-20 items-center justify-center border",
                isCurrentCell && "border-yellow-500",
                canMoveToCell ? "hover:border-green-500" : !isCurrentCell && "hover:border-red-500"
            )}
        >
            {isCurrentCell && <span>🚀</span>}
        </div>
    )
}
