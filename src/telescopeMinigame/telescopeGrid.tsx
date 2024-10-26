import { useGameState } from "../game-state"
import { cn } from "../util"

const width = 20
const height = 9

export const TelescopeGrid = () => {
    const { islands, islandToFind } = useGameState()

    return (
        <div className="flex flex-col grow">
            {new Array(height).fill(1).map((_, y) => (
                <div className="flex flex-row">
                    {new Array(width).fill(1).map((_, x) => {
                        const island = islands.get.find(island => island.gridPosition.x === x && island.gridPosition.y === y)
                        if (island) {
                            console.log(island, "island")
                            return <Cell isIslandToFind={islandToFind} imageToRender={island.island} />
                        } else {
                            return <div className="size-24 bg-blue-600 items-center justify-center" />
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

const Cell = ({ imageToRender }: { imageToRender: string; isIslandToFind: string }) => {
    const onClickCell = () => {
        console.log("clicked")
    }

    return (
        <div onClick={onClickCell} className={cn("size-24 bg-blue-600 items-center justify-center")}>
            {
                <span>
                    <img className="bg-cover bg-" src={imageToRender} alt="cell image" />
                </span>
            }
        </div>
    )
}
// export const TelescopeGrid = () => {
//     return (
//         <div className="flex flex-col grow bg-blue-600">
//             <div className="flex flex-row">
//                 <Grid gridSize={20} />
//             </div>
//         </div>
//     )
// }

// export const TelescopeGrid = () => {
//     const gridWidth = 20
//     const gridHeight = 10
//     const [islandPosition, setIslandPosition] = useState<number | null>(null)

//     useEffect(() => {
//         // Set a random position for the island when the component mounts
//         setIslandPosition(randomPosition)
//     }, [gridWidth, gridHeight])

//     const Cell = ({ isIsland }: { isIsland: boolean }) => (
//         <div className={cn("size-24 items-center justify-center border border-red hover:bg-zinc-50")}>
//             {isIsland && <img src="./island To Find.png" alt="map" />}
//         </div>
//     )

//     return (
//         <div className="flex flex-col grow bg-blue-600">
//             <div className="flex flex-row">
//                 <div
//                     className="grid"
//                     style={{
//                         display: "grid",
//                         gridTemplateColumns: `repeat(${gridWidth + gridHeight}, 1fr)`,
//                         gap: "5px"
//                     }}
//                 >
//                     {Array.from({ length: gridWidth * gridHeight }).map((_, index) => (
//                         <Cell key={index} isIsland={index === islandPosition} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
