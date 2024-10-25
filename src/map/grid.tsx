import { useGameState } from "../game-state"
import { cn } from "../util"

export const Grid = () => {
    const width = 4
    const height = 10
    return (
        <div className="flex flex-col grow">
            {new Array(height).fill(1).map((_, y) => (
                <div className="flex flex-row">
                    {new Array(width).fill(1).map((_, x) => {
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
                "size-24 items-center justify-center border border-red hover:bg-zinc-50",
                isCurrentCell && "border-yellow-900",
                canMoveToCell && "hover:bg-green-200"
            )}
        >
            {isCurrentCell && <span>🚀</span>}
        </div>
    )
}
