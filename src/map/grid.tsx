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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

type Coordinate = { x: number; y: number }

const Cell = ({ x, y }: Coordinate) => {
    const { grid } = useGameState()

    const isCellHidden = hiddenCells.some(cell => cell.x === x && cell.y === y)

    const isCurrentCell = grid.x.get === x && grid.y.get === y
    const xDist = grid.x.get - x
    const yDist = grid.y.get - y
    const canMoveToCell = !isCellHidden && !isCurrentCell && Math.abs(xDist) <= 1 && Math.abs(yDist) <= 1

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
                "w-1/12 grow aspect-square items-center justify-center shadow-cell-base",
                isCurrentCell && "shadow-cell-current",
                canMoveToCell ? "hover:shadow-cell-available" : !isCurrentCell && "hover:shadow-cell-unavailable",
                isCellHidden && "shadow-none hover:shadow-none",
                isCurrentCell && grid.lastMove === "right" && "rotate-90",
                isCurrentCell && grid.lastMove === "down" && "rotate-180",
                isCurrentCell && grid.lastMove === "left" && "-rotate-90"
            )}
        >
            {isCurrentCell && <span>🚀</span>}
        </div>
    )
}

const hiddenCells: Coordinate[] = [
    ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: 1 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: 2 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: GRID_WIDTH - i, y: 1 })),
    ...Array.from({ length: 3 }, (_, i) => ({ x: GRID_WIDTH - i, y: 2 })),
    ...Array.from({ length: 2 }, (_, i) => ({ x: GRID_WIDTH - i, y: 3 })),
    ...Array.from({ length: 2 }, (_, i) => ({ x: GRID_WIDTH - i, y: GRID_HEIGHT - 2 })),
    ...Array.from({ length: 3 }, (_, i) => ({ x: GRID_WIDTH - i, y: GRID_HEIGHT - 1 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: GRID_WIDTH - i, y: GRID_HEIGHT })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: GRID_WIDTH, y: GRID_HEIGHT - i - 3 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: GRID_HEIGHT - 1 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: GRID_HEIGHT }))
] as const
