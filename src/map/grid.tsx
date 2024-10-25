import { useGameState } from "../game-state"

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
                        return <Cell key={idx} x={xCord} y={yCord} index={idx} />
                    })}
                </div>
            ))}
        </div>
    )
}

const Cell = ({ x, y, index }: { x: number; y: number; index: number }) => {
    const { grid } = useGameState()

    const onClickCell = () => {
        grid.x.set(x)
        grid.y.set(y)
    }

    return (
        <div onClick={onClickCell} className="size-24 bg-red border border-red hover:bg-zinc-50">
            This is a cell
        </div>
    )
}
