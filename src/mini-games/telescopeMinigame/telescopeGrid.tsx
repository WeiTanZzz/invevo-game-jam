import { useGameState } from "../../game-state"
import { cn } from "../../util"

const width = 20
const height = 9

export const TelescopeGrid = () => {
    const { islands } = useGameState()

    return (
        <div className="flex pointer-events-auto flex-1 flex-col items-center justify-center">
            {new Array(height).fill(1).map((_, y) => (
                <div className="flex flex-row flex-1 grow w-full">
                    {new Array(width).fill(1).map((_, x) => {
                        const island = islands.get.find(island => island.gridPosition.x === x && island.gridPosition.y === y)
                        if (island) {
                            return <Cell imageToRender={island.path} />
                        } else {
                            return <div className="bg-blue-600 w-1/12 grow aspect-square items-center justify-center " />
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

const Cell = ({ imageToRender }: { imageToRender: string }) => {
    return (
        <div className={cn("bg-blue-600 w-1/12 grow aspect-square items-center justify-center")}>
            {
                <span>
                    <img className="bg-cover bg-" src={imageToRender} alt={imageToRender} />
                </span>
            }
        </div>
    )
}
