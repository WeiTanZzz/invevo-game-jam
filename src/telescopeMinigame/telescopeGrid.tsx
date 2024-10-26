import { useGameState } from "../game-state"
import { cn } from "../util"

const width = 20
const height = 9

export const TelescopeGrid = () => {
    const { islands } = useGameState()

    return (
        <div className="flex flex-col grow pointer-events-auto">
            {new Array(height).fill(1).map((_, y) => (
                <div className="flex flex-row">
                    {new Array(width).fill(1).map((_, x) => {
                        const island = islands.get.find(island => island.gridPosition.x === x && island.gridPosition.y === y)
                        if (island) {
                            return <Cell imageToRender={island.island} />
                        } else {
                            return <div className="size-24 bg-blue-600 items-center justify-center" />
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

const Cell = ({ imageToRender }: { imageToRender: string }) => {
    return (
        <div className={cn("size-24 bg-blue-600 items-center justify-center")}>
            {
                <span>
                    <img className="bg-cover bg-" src={imageToRender} alt={imageToRender} />
                </span>
            }
        </div>
    )
}
